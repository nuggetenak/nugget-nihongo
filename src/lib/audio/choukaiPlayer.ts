// ══════════════════════════════════════════════════════════════════
//  choukaiPlayer.ts — asbplayer-Inspired Sentence-Aligned Choukai Engine
//  Supports Condensed Playback, Auto-Pause Shadowing Loops, & Subtitles
//  Zero-Deadlock Auto-Pause Resume, Speed Cycling & Headless Simulation
// ══════════════════════════════════════════════════════════════════

export interface AudioSentenceSegment {
  id: string;
  startSec: number;
  endSec: number;
  textJapanese: string;
  textIndonesian?: string;
  speaker?: string;
  romaji?: string;
}

export type ChoukaiPlaybackState = 'idle' | 'playing' | 'paused' | 'ended';

export type ChoukaiStateListener = (
  state: ChoukaiPlaybackState,
  currentIndex: number,
  currentSegment: AudioSentenceSegment | null
) => void;

/**
 * Converts raw JSON sentence format (with startMs/endMs) to standard AudioSentenceSegment[]
 */
export function convertJsonSentencesToSegments(sentences: any[] = []): AudioSentenceSegment[] {
  if (!Array.isArray(sentences)) return [];
  return sentences.map((s, idx) => {
    const startSec = typeof s.startSec === 'number' ? s.startSec : (s.startMs || 0) / 1000;
    const endSec = typeof s.endSec === 'number' ? s.endSec : (s.endMs || (s.startMs || 0) + 3000) / 1000;
    return {
      id: s.id || `seg-${idx + 1}`,
      startSec: Math.max(0, startSec),
      endSec: Math.max(startSec + 0.1, endSec),
      textJapanese: s.text || s.textJapanese || '',
      textIndonesian: s.translation || s.textIndonesian || '',
      speaker: s.speaker || '',
      romaji: s.romaji || '',
    };
  }).sort((a, b) => a.startSec - b.startSec);
}

export class ChoukaiDrillPlayer {
  private audio: HTMLAudioElement | null = null;
  private audioSrc: string;
  private segments: AudioSentenceSegment[];
  private currentIndex: number = 0;
  private isAutoPauseEnabled: boolean = true;
  private isCondensedMode: boolean = false;
  private isAutoPaused: boolean = false;
  private playbackRate: number = 1.0;
  private simulatedCurrentTime: number = 0;
  private state: ChoukaiPlaybackState = 'idle';
  private listeners: Set<ChoukaiStateListener> = new Set();
  private timeUpdateBound: (() => void) | null = null;
  private endedBound: (() => void) | null = null;

  constructor(audioSrc: string, segments: AudioSentenceSegment[] = []) {
    this.audioSrc = audioSrc;
    this.segments = [...segments].sort((a, b) => a.startSec - b.startSec);
    this.initAudio();
  }

  private initAudio() {
    if (typeof Audio === 'undefined') return;
    try {
      this.audio = new Audio(this.audioSrc);
      this.audio.preload = 'auto';
      this.audio.playbackRate = this.playbackRate;

      this.timeUpdateBound = () => this.handleTimeUpdate();
      this.endedBound = () => this.handleEnded();

      this.audio.addEventListener('timeupdate', this.timeUpdateBound);
      this.audio.addEventListener('ended', this.endedBound);
    } catch {
      this.audio = null;
    }
  }

  private handleTimeUpdate() {
    const current = this.audio ? this.audio.currentTime : this.simulatedCurrentTime;
    const currentSegment = this.segments[this.currentIndex];

    if (!currentSegment) return;

    if (current >= currentSegment.endSec) {
      if (this.isAutoPauseEnabled) {
        this.isAutoPaused = true;
        this.pause();
      } else if (this.isCondensedMode && this.segments[this.currentIndex + 1]) {
        // Skip dead-air between dialogue turns immediately
        this.currentIndex++;
        const nextStart = this.segments[this.currentIndex].startSec;
        if (this.audio) {
          this.audio.currentTime = nextStart;
        } else {
          this.simulatedCurrentTime = nextStart;
        }
        this.notifyListeners();
      } else if (this.segments[this.currentIndex + 1] && current >= this.segments[this.currentIndex + 1].startSec) {
        this.currentIndex++;
        this.notifyListeners();
      }
    }
  }

  private handleEnded() {
    this.state = 'ended';
    this.notifyListeners();
  }

  private notifyListeners() {
    const curSeg = this.segments[this.currentIndex] || null;
    this.listeners.forEach((fn) => fn(this.state, this.currentIndex, curSeg));
  }

  public play(): Promise<void> {
    // Zero-deadlock auto-pause resume: if paused at sentence end, advance to next segment
    if (this.isAutoPaused) {
      if (this.segments[this.currentIndex + 1]) {
        this.currentIndex++;
        const nextStart = this.segments[this.currentIndex].startSec;
        if (this.audio) {
          this.audio.currentTime = nextStart;
        } else {
          this.simulatedCurrentTime = nextStart;
        }
      }
      this.isAutoPaused = false;
    }

    this.state = 'playing';
    this.notifyListeners();

    if (!this.audio) {
      return Promise.resolve();
    }

    return this.audio.play().catch((err) => {
      this.state = 'paused';
      this.notifyListeners();
      throw err;
    });
  }

  public pause(): void {
    if (this.audio) {
      this.audio.pause();
    }
    this.state = 'paused';
    this.notifyListeners();
  }

  public stop(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = this.segments[0]?.startSec ?? 0;
    }
    this.simulatedCurrentTime = this.segments[0]?.startSec ?? 0;
    this.currentIndex = 0;
    this.isAutoPaused = false;
    this.state = 'idle';
    this.notifyListeners();
  }

  public playSegment(index: number): Promise<void> {
    if (index < 0 || index >= this.segments.length) return Promise.resolve();
    this.currentIndex = index;
    this.isAutoPaused = false;
    const seg = this.segments[index];
    if (this.audio) {
      this.audio.currentTime = seg.startSec;
    } else {
      this.simulatedCurrentTime = seg.startSec;
    }
    return this.play();
  }

  public repeatCurrentSegment(): Promise<void> {
    this.isAutoPaused = false;
    return this.playSegment(this.currentIndex);
  }

  public nextSegment(): Promise<void> {
    if (this.currentIndex + 1 < this.segments.length) {
      return this.playSegment(this.currentIndex + 1);
    }
    return Promise.resolve();
  }

  public prevSegment(): Promise<void> {
    if (this.currentIndex - 1 >= 0) {
      return this.playSegment(this.currentIndex - 1);
    }
    return Promise.resolve();
  }

  public seekTime(seconds: number): void {
    const safeSec = Math.max(0, seconds);
    if (this.audio) {
      this.audio.currentTime = safeSec;
    } else {
      this.simulatedCurrentTime = safeSec;
    }

    const foundIdx = this.segments.findIndex(
      (s) => safeSec >= s.startSec && safeSec <= s.endSec
    );
    if (foundIdx !== -1) {
      this.currentIndex = foundIdx;
    }
    this.handleTimeUpdate();
    this.notifyListeners();
  }

  public setAutoPause(enabled: boolean): void {
    this.isAutoPauseEnabled = enabled;
  }

  public getAutoPause(): boolean {
    return this.isAutoPauseEnabled;
  }

  public getIsAutoPaused(): boolean {
    return this.isAutoPaused;
  }

  public setCondensedMode(enabled: boolean): void {
    this.isCondensedMode = enabled;
  }

  public getCondensedMode(): boolean {
    return this.isCondensedMode;
  }

  public setPlaybackRate(rate: number): void {
    this.playbackRate = Math.max(0.5, Math.min(2.0, rate));
    if (this.audio) {
      this.audio.playbackRate = this.playbackRate;
    }
  }

  public getPlaybackRate(): number {
    return this.playbackRate;
  }

  public cyclePlaybackRate(): number {
    const speeds = [0.75, 1.0, 1.25];
    const curIdx = speeds.findIndex((s) => Math.abs(s - this.playbackRate) < 0.05);
    const nextIdx = (curIdx + 1) % speeds.length;
    const newRate = speeds[nextIdx];
    this.setPlaybackRate(newRate);
    return newRate;
  }

  public getCurrentSegment(): AudioSentenceSegment | null {
    return this.segments[this.currentIndex] || null;
  }

  public getCurrentIndex(): number {
    return this.currentIndex;
  }

  public getSegments(): AudioSentenceSegment[] {
    return [...this.segments];
  }

  public getPlaybackState(): ChoukaiPlaybackState {
    return this.state;
  }

  public getCurrentTime(): number {
    return this.audio ? this.audio.currentTime : this.simulatedCurrentTime;
  }

  public getDuration(): number {
    if (this.audio && !isNaN(this.audio.duration)) return this.audio.duration;
    const lastSeg = this.segments[this.segments.length - 1];
    return lastSeg ? lastSeg.endSec : 0;
  }

  public loadTrack(audioSrc: string, segments: AudioSentenceSegment[] = []): void {
    this.stop();
    this.audioSrc = audioSrc;
    this.segments = [...segments].sort((a, b) => a.startSec - b.startSec);
    this.currentIndex = 0;
    this.isAutoPaused = false;
    if (this.audio) {
      this.audio.src = audioSrc;
      this.audio.playbackRate = this.playbackRate;
      this.audio.load();
    }
    this.notifyListeners();
  }

  public subscribe(listener: ChoukaiStateListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public destroy(): void {
    if (this.audio) {
      this.audio.pause();
      if (this.timeUpdateBound) this.audio.removeEventListener('timeupdate', this.timeUpdateBound);
      if (this.endedBound) this.audio.removeEventListener('ended', this.endedBound);
      this.audio.src = '';
      this.audio = null;
    }
    this.listeners.clear();
  }
}
