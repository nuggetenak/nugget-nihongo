// ══════════════════════════════════════════════════════════════════
//  pitchEngine.ts — Japanese Pitch Accent Phonology & Sound Engine
//  Tokenizes moras, calculates Tokyo pitch contours, and plays tones
// ══════════════════════════════════════════════════════════════════

export type PitchCategory = 'heiban' | 'atamadaka' | 'nakadaka' | 'odaka';

export interface MoraUnit {
  mora: string;       // e.g. 'きょ', 'う', 'し', 'つ'
  isHigh: boolean;     // true if high pitch (H), false if low (L)
  hasDrop: boolean;    // true if pitch drops immediately after this mora
  index: number;       // 0-indexed mora position
}

export interface PitchContourResult {
  moras: MoraUnit[];
  category: PitchCategory;
  categoryLabel: string;
  categoryBadgeColor: string;
  particlePitch: 'high' | 'low';
}

import { splitIntoMoras } from '../audio/moraTokenizer.ts';
import { getAudioContext, isSfxEnabled } from '../audio/sfx.ts';
import { lookupPitch, type PitchAccentEntry } from '../data/pitchAccentManager.ts';

export { splitIntoMoras };

/**
 * Calculate pitch level (High / Low) for each mora according to Standard Tokyo Japanese phonology rules.
 * Pitch number indicates downstep location:
 * - 0 = Heiban (平板): L H H... [H] (No downstep, stays high into particle)
 * - 1 = Atamadaka (頭高): H L L... [L] (Drops after 1st mora)
 * - 2..N-1 = Nakadaka (中高): L H... drops after mora N [L]
 * - N = Odaka (尾高): L H H... (Drops on the particle) [L]
 */
export function calculatePitchContour(kana: string, pitchNumber: number): PitchContourResult {
  const moraStrings = splitIntoMoras(kana || '');
  const totalMoras = moraStrings.length;

  if (totalMoras === 0) {
    return {
      moras: [],
      category: 'heiban',
      categoryLabel: 'Heiban (平板 - Datar)',
      categoryBadgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      particlePitch: 'high',
    };
  }

  // Defensive normalization for pitchNumber: must be non-negative integer <= totalMoras
  let safePitch = typeof pitchNumber === 'number' && !isNaN(pitchNumber) ? Math.floor(pitchNumber) : 0;
  if (safePitch < 0) safePitch = 0;
  if (safePitch > totalMoras) safePitch = totalMoras;

  // Determine category
  let category: PitchCategory = 'heiban';
  let categoryLabel = 'Heiban (平板 - Datar)';
  let categoryBadgeColor = 'bg-blue-500/20 text-blue-400 border-blue-500/30';
  let particlePitch: 'high' | 'low' = 'high';

  if (safePitch === 0) {
    category = 'heiban';
    categoryLabel = 'Heiban (平板 - Datar)';
    categoryBadgeColor = 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    particlePitch = 'high';
  } else if (safePitch === 1) {
    category = 'atamadaka';
    categoryLabel = 'Atamadaka (頭高 - Jatuh Awal)';
    categoryBadgeColor = 'bg-rose-500/20 text-rose-400 border-rose-500/30';
    particlePitch = 'low';
  } else if (safePitch === totalMoras) {
    category = 'odaka';
    categoryLabel = 'Odaka (尾高 - Jatuh Partikel)';
    categoryBadgeColor = 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    particlePitch = 'low';
  } else {
    category = 'nakadaka';
    categoryLabel = 'Nakadaka (中高 - Jatuh Tengah)';
    categoryBadgeColor = 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    particlePitch = 'low';
  }

  const moras: MoraUnit[] = moraStrings.map((mora, idx) => {
    let isHigh = false;
    let hasDrop = false;

    if (totalMoras === 1) {
      // Single mora word: e.g. 歯 (ha - 1, atamadaka)
      isHigh = safePitch === 1;
      hasDrop = safePitch === 1;
    } else {
      if (safePitch === 0) {
        // Heiban: 1st mora low, 2nd onwards high
        isHigh = idx > 0;
        hasDrop = false;
      } else if (safePitch === 1) {
        // Atamadaka: 1st mora high, drops immediately
        isHigh = idx === 0;
        hasDrop = idx === 0;
      } else {
        // Nakadaka or Odaka: 1st mora low, rises to high, drops after pitchNumber
        if (idx === 0) {
          isHigh = false;
        } else if (idx < safePitch) {
          isHigh = true;
          if (idx === safePitch - 1) {
            hasDrop = true;
          }
        } else {
          isHigh = false;
        }
      }
    }

    return {
      mora,
      isHigh,
      hasDrop,
      index: idx,
    };
  });

  return {
    moras,
    category,
    categoryLabel,
    categoryBadgeColor,
    particlePitch,
  };
}

/**
 * Automatically looks up Tokyo pitch accent entry and calculates contour
 */
export function getPitchContourForWord(word: string, reading?: string): (PitchContourResult & { entry: PitchAccentEntry }) | null {
  const entry = lookupPitch(word, reading);
  if (!entry) return null;
  const kana = reading || word;
  const contour = calculatePitchContour(kana, entry.pattern);
  return {
    ...contour,
    entry,
  };
}

// ══════════════════════════════════════════════════════════════════
//  Web Audio Procedural Tone Synthesizer
//  Plays exact High (554.37 Hz) and Low (440.00 Hz) sine wave pitch contours
// ══════════════════════════════════════════════════════════════════

const HIGH_FREQ = 554.37; // C#5
const LOW_FREQ = 440.00;  // A4
const MORA_DURATION_SEC = 0.18;
const GAP_DURATION_SEC = 0.02;

/**
 * Play procedural melody tone beeps representing the pitch contour.
 * Guaranteed to work offline on all mobile and desktop browsers.
 */
export function playPitchToneMelody(moras: MoraUnit[], particlePitch?: 'high' | 'low'): void {
  if (!isSfxEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }

  const now = ctx.currentTime;
  const unitsToPlay = [...moras];

  if (particlePitch) {
    unitsToPlay.push({
      mora: 'ga',
      isHigh: particlePitch === 'high',
      hasDrop: false,
      index: unitsToPlay.length,
    });
  }

  const oscillators: OscillatorNode[] = [];
  const gains: GainNode[] = [];
  let maxStopTime = now;

  unitsToPlay.forEach((unit, i) => {
    const startTime = now + i * (MORA_DURATION_SEC + GAP_DURATION_SEC);
    const stopTime = startTime + MORA_DURATION_SEC;
    if (stopTime > maxStopTime) maxStopTime = stopTime;
    const freq = unit.isHigh ? HIGH_FREQ : LOW_FREQ;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    // Smooth envelope attack / decay to eliminate audio clicks
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.18, startTime + 0.02);
    gain.gain.setValueAtTime(0.18, stopTime - 0.03);
    gain.gain.linearRampToValueAtTime(0, stopTime);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(stopTime);

    oscillators.push(osc);
    gains.push(gain);
  });

  // Scheduled node disconnection to eliminate Web Audio leaks
  const cleanupDelay = Math.max(50, Math.ceil((maxStopTime - ctx.currentTime) * 1000) + 100);
  setTimeout(() => {
    oscillators.forEach((o) => {
      try { o.disconnect(); } catch {}
    });
    gains.forEach((g) => {
      try { g.disconnect(); } catch {}
    });
  }, cleanupDelay);
}
