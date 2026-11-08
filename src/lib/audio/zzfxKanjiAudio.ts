// ══════════════════════════════════════════════════════════════════
//  zzfxKanjiAudio.ts — Procedural WebAudio Synthesizer for Kanji Practice
//  Zero-Asset Auditory Engine • Ascending Harmonic Stroke Chimes
//  Soft Corrective Tones • Japanese Pentatonic Mastery Fanfare
// ══════════════════════════════════════════════════════════════════

import { getAudioContext, isSfxEnabled } from './sfx.ts';

// Pentatonic scale frequencies for harmonic progression (C5 to C7)
const PROGRESSION_FREQUENCIES = [
  523.25,  // C5
  587.33,  // D5
  659.25,  // E5
  783.99,  // G5
  880.00,  // A5
  1046.50, // C6
  1174.66, // D6
  1318.51, // E6
  1567.98, // G6
  1760.00, // A6
  2093.00, // C7
];

/**
 * Schedule disconnect on gain and oscillator nodes after sound finishes
 */
function scheduleCleanup(
  gain: GainNode,
  oscillators: OscillatorNode[],
  stopTime: number,
  ctx: AudioContext
) {
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

/**
 * Procedural Audio Synthesizer Engine for Kanji Interactive Canvas
 */
export const zzfxKanjiAudio = {
  /**
   * Harmonically tuned chime when a stroke is drawn correctly.
   * Pitch gently ascends with stroke index progression (pentatonic scale).
   */
  playStrokeCorrect(strokeIndex: number = 0, totalStrokes: number = 5): void {
    if (!isSfxEnabled()) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    // Map stroke index to pentatonic note index
    const total = Math.max(1, totalStrokes);
    const progress = Math.min(1, Math.max(0, strokeIndex / total));
    const noteIdx = Math.min(
      PROGRESSION_FREQUENCIES.length - 2,
      Math.floor(progress * (PROGRESSION_FREQUENCIES.length - 2)) + 3 // Start around G5/C6
    );

    const baseFreq = PROGRESSION_FREQUENCIES[noteIdx];
    const overtoneFreq = PROGRESSION_FREQUENCIES[noteIdx + 1];

    osc1.type = 'sine';
    osc2.type = 'triangle';

    osc1.frequency.setValueAtTime(baseFreq, now);
    osc1.frequency.exponentialRampToValueAtTime(baseFreq * 1.04, now + 0.12);

    osc2.frequency.setValueAtTime(overtoneFreq, now);
    osc2.frequency.exponentialRampToValueAtTime(overtoneFreq * 1.02, now + 0.15);

    // Warm envelope
    gain.gain.setValueAtTime(0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.39);
    osc2.stop(now + 0.39);

    scheduleCleanup(gain, [osc1, osc2], now + 0.39, ctx);
  },

  /**
   * Soft, non-punitive corrective double-tone when a stroke is misdirected or outside corridor
   */
  playStrokeError(): void {
    if (!isSfxEnabled()) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    // Gentle downward pitch drop (220Hz -> 150Hz)
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.18);

    gain.gain.setValueAtTime(0.10, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.23);

    scheduleCleanup(gain, [osc], now + 0.23, ctx);
  },

  /**
   * Soft tactile whisper noise simulating sumi ink touching washi paper
   */
  playBrushInk(): void {
    if (!isSfxEnabled()) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(380, now);
    osc.frequency.exponentialRampToValueAtTime(240, now + 0.08);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.11);

    scheduleCleanup(gain, [osc], now + 0.11, ctx);
  },

  /**
   * Ascending 5-tone Japanese celebration fanfare when full kanji writing is mastered
   */
  playKanjiCompleteFanfare(): void {
    if (!isSfxEnabled()) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    // Japanese Yo-scale inspired cadence (D5 -> G5 -> A5 -> D6 -> G6)
    const melody = [587.33, 783.99, 880.00, 1174.66, 1567.98];
    const baseNow = ctx.currentTime;

    melody.forEach((freq, idx) => {
      const noteTime = baseNow + idx * 0.10;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = idx === melody.length - 1 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, noteTime);

      const isFinal = idx === melody.length - 1;
      const duration = isFinal ? 0.65 : 0.22;

      gain.gain.setValueAtTime(isFinal ? 0.20 : 0.14, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + duration + 0.02);

      scheduleCleanup(gain, [osc], noteTime + duration + 0.02, ctx);
    });
  },
};
