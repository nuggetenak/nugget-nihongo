// ══════════════════════════════════════════════════════════════════
//  sfx.ts — Pure Web Audio API Sound Effects Synthesizer
//  Works 100% offline with ZERO external audio file dependencies
// ══════════════════════════════════════════════════════════════════

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function isSfxEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem('nn_sound_effects') !== '0';
  } catch {
    return true;
  }
}

/**
 * Play pleasant cheerful chime when answering correctly or watering
 */
export function playSuccessSfx() {
  if (!isSfxEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();

  osc1.type = 'sine';
  osc2.type = 'triangle';

  // Major third interval chime (C6 -> E6 -> G6)
  osc1.frequency.setValueAtTime(1046.5, now);
  osc1.frequency.exponentialRampToValueAtTime(1318.5, now + 0.08);

  osc2.frequency.setValueAtTime(1318.5, now);
  osc2.frequency.exponentialRampToValueAtTime(1567.98, now + 0.12);

  gain.gain.setValueAtTime(0.15, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(ctx.destination);

  osc1.start(now);
  osc2.start(now);
  osc1.stop(now + 0.36);
  osc2.stop(now + 0.36);
}

/**
 * Play gentle low tone on incorrect answer
 */
export function playErrorSfx() {
  if (!isSfxEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(220, now);
  osc.frequency.exponentialRampToValueAtTime(146.8, now + 0.18);

  gain.gain.setValueAtTime(0.12, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.26);
}

/**
 * Play gentle bubbling water droplet sound when watering plant
 */
export function playWaterSfx() {
  if (!isSfxEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(400, now);
  osc.frequency.exponentialRampToValueAtTime(900, now + 0.09);

  gain.gain.setValueAtTime(0.18, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.23);
}

/**
 * Play subtle crisp tap sound when flipping flashcard
 */
export function playFlipSfx() {
  if (!isSfxEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, now);
  osc.frequency.exponentialRampToValueAtTime(300, now + 0.06);

  gain.gain.setValueAtTime(0.1, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.08);
}

/**
 * Play celebratory ascending arpeggio when unlocking a badge or completing quiz
 */
export function playFanfareSfx() {
  if (!isSfxEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
  notes.forEach((freq, idx) => {
    const noteTime = ctx.currentTime + idx * 0.08;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, noteTime);

    gain.gain.setValueAtTime(0.12, noteTime);
    gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.28);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(noteTime);
    osc.stop(noteTime + 0.3);
  });
}
