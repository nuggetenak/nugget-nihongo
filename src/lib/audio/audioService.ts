// ══════════════════════════════════════════════════════════════════
//  audioService.ts — Authoritative Unified Audio & Speech Engine
//  Research Basis: Ticket T-47, Web Speech API & Web Audio API Synthesis
// ══════════════════════════════════════════════════════════════════

import { isSfxEnabled, playSuccessSfx as rawPlaySuccess, playErrorSfx as rawPlayError, playFlipSfx as rawPlayFlip, playFanfareSfx as rawPlayFanfare, playWaterSfx as rawPlayWater } from './sfx';
import { resolveOptimalAudioUrl, configureAudioElement } from './audioCodecResolver';
import { audioPreloader } from './audioPreloader';
import { audioCacheBudget } from './audioCacheBudget';
import { syntheticAudio } from './syntheticAudioFallback';

class AudioService {
  private jaVoice: SpeechSynthesisVoice | null = null;

  constructor() {
    this.initVoice();
  }

  private initVoice(): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    this.resolveJaVoice();
    window.speechSynthesis.onvoiceschanged = () => {
      this.jaVoice = null;
      this.resolveJaVoice();
    };
  }

  private resolveJaVoice(): SpeechSynthesisVoice | null {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
    if (this.jaVoice) return this.jaVoice;

    const voices = window.speechSynthesis.getVoices();
    this.jaVoice = voices.find((v) => v.lang === 'ja-JP' || v.lang.startsWith('ja')) || null;
    return this.jaVoice;
  }

  /**
   * Sanitizes text before speech synthesis by removing furigana annotations,
   * bracketed notes, and HTML markup.
   */
  public cleanText(text: string): string {
    if (!text || typeof text !== 'string') return '';
    let clean = text.replace(/<[^>]*>/g, '').trim();
    const stripped = clean
      .replace(/\{[^}]*\}/g, '')
      .replace(/【[^】]*】/g, '')
      .replace(/〔[^〕]*〕/g, '')
      .replace(/（[^）]*）/g, '')
      .replace(/\([^)]*\)/g, '')
      .replace(/\[[^\]]*\]/g, '')
      .trim();

    return stripped || clean.replace(/[{}\[\]【】〔〕（）\(\)]/g, '').trim();
  }

  /**
   * Reads user's preferred speech playback rate from localStorage (default: 1.0)
   */
  public getSpeechRate(): number {
    if (typeof window === 'undefined') return 1.0;
    try {
      const stored = localStorage.getItem('nn_speech_rate');
      if (stored) {
        const parsed = parseFloat(stored);
        if (!isNaN(parsed) && parsed >= 0.5 && parsed <= 1.5) {
          return parsed;
        }
      }
    } catch {}
    return 1.0;
  }

  /**
   * Speaks Japanese text using native Web Speech API with automatic rate & cleanup
   */
  public speak(text: string, customRate?: number): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('[audioService] Web Speech API not supported on this device. Using synthetic tone fallback.');
      syntheticAudio.playMoraTone(523.25, 200);
      return;
    }

    const clean = this.cleanText(text);
    if (!clean) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = 'ja-JP';
    utterance.rate = customRate || this.getSpeechRate();

    const voice = this.resolveJaVoice();
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onerror = () => {
      // Graceful fallback to synthetic mora tone on voice synthesis failures
      syntheticAudio.playMoraTone(440, 180);
    };

    window.speechSynthesis.speak(utterance);
  }

  /**
   * Plays a pre-recorded audio clip with pitch preservation and codec negotiation
   */
  public async playAudioClip(rawUrl: string, customRate?: number): Promise<void> {
    if (typeof window === 'undefined') return;
    const targetUrl = resolveOptimalAudioUrl(rawUrl);
    const rate = customRate || this.getSpeechRate();

    // Check preloader pool first for zero-latency playback
    let audio = audioPreloader.getPreloadedAudio(targetUrl);
    if (!audio) {
      audio = new Audio(targetUrl);
    }

    configureAudioElement(audio, rate);
    audioCacheBudget.recordAudioAccess(targetUrl);

    try {
      await audio.play();
    } catch (err) {
      console.warn('[audioService] Clip playback error, falling back to synthetic audio:', err);
      syntheticAudio.playMoraTone(440, 200);
    }
  }

  /**
   * Plays a pitch accent contour sequence (H / L) using Web Audio synthesis
   */
  public async playPitchContour(pattern: Array<'H' | 'L'>): Promise<void> {
    return syntheticAudio.playPitchContour(pattern);
  }

  // Web Audio SFX Delegation with setting enforcement
  public playSuccess(): void {
    if (isSfxEnabled()) rawPlaySuccess();
  }

  public playError(): void {
    if (isSfxEnabled()) rawPlayError();
  }

  public playFlip(): void {
    if (isSfxEnabled()) rawPlayFlip();
  }

  public playFanfare(): void {
    if (isSfxEnabled()) rawPlayFanfare();
  }

  public playChime(): void {
    if (isSfxEnabled()) rawPlayWater();
  }
}

export const audioService = new AudioService();
export const speakJapanese = (text: string, customRate?: number) => audioService.speak(text, customRate);
export const cleanJapaneseTextForSpeech = (text: string) => audioService.cleanText(text);

