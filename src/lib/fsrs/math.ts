// ══════════════════════════════════════════════════════
//  math.ts — Nugget Nihongo FSRS Math Utilities
//  Research basis:
//    - Ye et al. (2022) — FSRS memory model (KDD)
//    - Matsunaga (1999) — non-kanji-background learners need 2.3× exposures
// ══════════════════════════════════════════════════════

export const DECAY = 0.5;
export const FACTOR = 19 / 81; // (1/DECAY - 1)
export const MATSUNAGA_MULTIPLIER = 2.3;

/**
 * Forgetting Curve: R(t, S) = (1 + FACTOR * t / S) ^ (-1/DECAY)
 * @param elapsedDays Days elapsed since last review
 * @param stability Memory stability S
 * @returns Retrievability R in [0, 1]
 */
export function fsrsForgettingCurve(elapsedDays: number, stability: number): number {
  if (stability <= 0) return 0;
  return Math.pow(1 + FACTOR * (elapsedDays / stability), -1 / DECAY);
}

/**
 * Next Interval from Target Retention: t = S / FACTOR * (R^(-DECAY) - 1)
 * @param stability Memory stability S
 * @param requestRetention Desired retention rate (e.g. 0.9)
 * @returns Scheduled interval in days
 */
export function fsrsNextInterval(stability: number, requestRetention: number): number {
  if (stability <= 0 || requestRetention <= 0 || requestRetention >= 1) return 0;
  return (stability / FACTOR) * (Math.pow(requestRetention, -DECAY) - 1);
}

export interface IndonesianPrior {
  kanji_difficulty_boost: number;
  kanji_stability_factor: number;
  matsunaga_multiplier: number;
  calibrated: boolean;
  note: string;
}

export function fsrsIndonesianPrior(): IndonesianPrior {
  return {
    kanji_difficulty_boost: 0,
    kanji_stability_factor: 1.0,
    matsunaga_multiplier: MATSUNAGA_MULTIPLIER,
    calibrated: false,
    note: 'Defaults. Calibrate after 10K+ kanji review events.',
  };
}
