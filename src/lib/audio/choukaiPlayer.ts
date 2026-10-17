// ══════════════════════════════════════════════════════════════════
//  choukaiPlayer.ts — asbplayer-Inspired Sentence-Aligned Choukai Engine
//  Supports Condensed Playback, Auto-Pause Shadowing Loops, & Subtitles
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

export class ChoukaiDrillPlayer {
  private audio: HTMLAudioElement | null = null;
  private audioSrc: string;
  private segments: AudioSentenceSegment[];
  private currentIndex: number = 0;
  private isAutoPauseEnabled: boolean = true;
  private isCondensedMode: boolean = false;
  private playbackRate: number = 1.0;
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
    this.audio = new Audio(this.audioSrc);
    this.audio.preload = 'auto';
    this.audio.playbackRate = this.playbackRate;

    this.timeUpdateBound = () => this.handleTimeUpdate();
    this.endedBound = () => this.handleEnded();

    this.audio.addEventListener('timeupdate', this.timeUpdateBound);
    this.audio.addEventListener('ended', this.endedBound);
  }

  private handleTimeUpdate() {
    if (!this.audio) return;
    const current = this.audio.currentTime;
    const currentSegment = this.segments[this.currentIndex];

    if (!currentSegment) return;

    if (current >= currentSegment.endSec) {
      if (this.isAutoPauseEnabled) {
        this.pause();
      } else if (this.isCondensedMode && this.segments[this.currentIndex + 1]) {
        // Skip dead-air between dialogue turns immediately
        this.currentIndex++;
        this.audio.currentTime = this.segments[this.currentIndex].startSec;
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
    if (!this.audio) {
      this.state = 'playing';
      this.notifyListeners();
      return Promise.resolve();
    }
    this.state = 'playing';
    this.notifyListeners();
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
    this.currentIndex = 0;
    this.state = 'idle';
    this.notifyListeners();
  }

  public playSegment(index: number): Promise<void> {
    if (index < 0 || index >= this.segments.length) return Promise.resolve();
    this.currentIndex = index;
    const seg = this.segments[index];
    if (this.audio) {
      this.audio.currentTime = seg.startSec;
    }
    return this.play();
  }

  public repeatCurrentSegment(): Promise<void> {
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

  public setAutoPause(enabled: boolean): void {
    this.isAutoPauseEnabled = enabled;
  }

  public getAutoPause(): boolean {
    return this.isAutoPauseEnabled;
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
    return this.audio ? this.audio.currentTime : 0;
  }

  public getDuration(): number {
    return this.audio ? this.audio.duration : 0;
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
      this.audio = null;
    }
    this.listeners.clear();
  }
}
