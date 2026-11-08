// ══════════════════════════════════════════════════════════════════
//  syntheticAudioFallback.ts — Web Audio Oscillator Synthesis Fallback
//  Generates zero-asset pitch accent contours & feedback tones
//  Includes automated Web Audio Node Garbage Collection & Disconnect
// ══════════════════════════════════════════════════════════════════

/**
 * Schedule disconnect on gain and oscillator nodes after sound finishes to prevent Web Audio memory leaks
 */
function scheduleCleanup(gain: GainNode, oscillators: OscillatorNode[], stopTime: number, ctx: AudioContext) {
  let cleaned = false;
  const doCleanup = () => {
    if (cleaned) return;
    cleaned = true;
    try {
      oscillators.forEach((o) => {
        try { o.disconnect(); } catch {}
      });
      gain.disconnect();
    } catch {}
  };

  const lastOsc = oscillators[oscillators.length - 1];
  if (lastOsc) {
    lastOsc.onended = doCleanup;
  }

  const delayMs = Math.max(10, Math.ceil((stopTime - ctx.currentTime) * 1000) + 60);
  setTimeout(doCleanup, delayMs);
}

class SyntheticAudioService {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  /**
   * Plays a single mora syllable tone with subtle exponential gain decay
   */
  public playMoraTone(frequencyHz: number = 440, durationMs: number = 180): void {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequencyHz, ctx.currentTime);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durationMs / 1000);

      osc.connect(gain);
      gain.connect(ctx.destination);

      const stopTime = ctx.currentTime + durationMs / 1000;
      osc.start();
      osc.stop(stopTime);
      scheduleCleanup(gain, [osc], stopTime, ctx);
    } catch (err) {
      console.warn('[syntheticAudio] Mora tone synthesis error:', err);
    }
  }

  /**
   * Plays a pitch accent mora sequence (e.g. Heiban, Atamadaka, Nakadaka)
   * High pitch = 523.25 Hz (C5), Low pitch = 392.00 Hz (G4)
   */
  public async playPitchContour(pattern: Array<'H' | 'L'>): Promise<void> {
    if (!pattern || pattern.length === 0) return;

    for (let i = 0; i < pattern.length; i++) {
      const mora = pattern[i];
      const freq = mora === 'H' ? 523.25 : 392.00;
      this.playMoraTone(freq, 160);
      await new Promise((res) => setTimeout(res, 200));
    }
  }

  /**
   * Generates auditory comprehension ping when audio assets cannot be streamed
   */
  public playComprehensionBeep(isCorrect: boolean): void {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (isCorrect) {
        // High pleasant dual chime
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1); // A5
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        const stopTime = ctx.currentTime + 0.35;
        osc.start();
        osc.stop(stopTime);
        scheduleCleanup(gain, [osc], stopTime, ctx);
      } else {
        // Low warm reminder beep
        osc.type = 'sine';
        osc.frequency.setValueAtTime(261.63, ctx.currentTime); // C4
        osc.frequency.setValueAtTime(220.00, ctx.currentTime + 0.12); // A3
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        const stopTime = ctx.currentTime + 0.3;
        osc.start();
        osc.stop(stopTime);
        scheduleCleanup(gain, [osc], stopTime, ctx);
      }
    } catch (err) {
      console.warn('[syntheticAudio] Comprehension beep error:', err);
    }
  }
}

export const syntheticAudio = new SyntheticAudioService();
