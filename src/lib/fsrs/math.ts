// ══════════════════════════════════════════════════════
//  math.ts — Nugget Nihongo FSRS Math Utilities
//  Research basis:
//    - Ye et al. (2022) — FSRS memory model (KDD)
//    - Matsunaga (1999) — non-kanji-background learners need 2.3× exposures
import { FSRSCard, FSRSRating } from '../../types/fsrs';

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

// Standard FSRS v4 model weights (Ye et al., 2022)
export const DEFAULT_FSRS_WEIGHTS = [
  0.4, 0.6, 2.4, 5.8, // w[0..3]: initial stabilities for Again(1), Hard(2), Good(3), Easy(4)
  4.93, 0.94,         // w[4..5]: initial difficulty
  0.86, 0.01,         // w[6..7]: difficulty update & mean reversion
  1.49, 0.14, 0.94,   // w[8..10]: recall stability factor
  2.18, 0.05, 0.34, 1.26, // w[11..14]: forget stability factor
  0.29, 2.61,         // w[15..16]: hard penalty, easy bonus
];

/**
 * Calculates updated FSRSCard metrics after a user review rating (1: Again, 2: Hard, 3: Good, 4: Easy).
 * Mathematically derived from the Ye et al. (2022) FSRS memory model.
 */
export function calculateFSRSReview(
  existingCard: FSRSCard,
  rating: FSRSRating,
  requestRetention = 0.9
): FSRSCard {
  const now = new Date();
  const lastReviewTime = existingCard.last_review
    ? new Date(existingCard.last_review).getTime()
    : now.getTime();
  const elapsedDays = Math.max(0, (now.getTime() - lastReviewTime) / 86400000);

  // Retrievability
  const r =
    existingCard.stability > 0 && elapsedDays > 0
      ? fsrsForgettingCurve(elapsedDays, existingCard.stability)
      : 1.0;

  let nextStability: number;
  let nextDifficulty: number;

  const isInitial = existingCard.reps === 0 || existingCard.stability <= 0;

  if (isInitial) {
    // Initial stability & difficulty
    nextStability = DEFAULT_FSRS_WEIGHTS[rating - 1] || 1.0;
    nextDifficulty = Math.min(
      10,
      Math.max(1, DEFAULT_FSRS_WEIGHTS[4] - (rating - 3) * DEFAULT_FSRS_WEIGHTS[5])
    );
  } else {
    // Update difficulty with mean reversion
    const dPrime = existingCard.difficulty - DEFAULT_FSRS_WEIGHTS[6] * (rating - 3);
    const dReverted =
      DEFAULT_FSRS_WEIGHTS[7] * DEFAULT_FSRS_WEIGHTS[4] + (1 - DEFAULT_FSRS_WEIGHTS[7]) * dPrime;
    nextDifficulty = Math.min(10, Math.max(1, dReverted));

    if (rating === 1) {
      // Lapse (Again)
      const sForget =
        DEFAULT_FSRS_WEIGHTS[11] *
        Math.pow(nextDifficulty, -DEFAULT_FSRS_WEIGHTS[12]) *
        (Math.pow(existingCard.stability + 1, DEFAULT_FSRS_WEIGHTS[13]) - 1) *
        Math.exp(DEFAULT_FSRS_WEIGHTS[14] * (1 - r));
      nextStability = Math.max(0.1, sForget);
    } else {
      // Successful recall (Hard, Good, Easy)
      const hardPenalty = rating === 2 ? DEFAULT_FSRS_WEIGHTS[15] : 1.0;
      const easyBonus = rating === 4 ? DEFAULT_FSRS_WEIGHTS[16] : 1.0;
      const sRecall =
        existingCard.stability *
        (1 +
          Math.exp(DEFAULT_FSRS_WEIGHTS[8]) *
            (11 - nextDifficulty) *
            Math.pow(existingCard.stability, -DEFAULT_FSRS_WEIGHTS[9]) *
            (Math.exp(DEFAULT_FSRS_WEIGHTS[10] * (1 - r)) - 1) *
            hardPenalty *
            easyBonus);
      nextStability = Math.max(0.1, sRecall);
    }
  }

  // Calculate next interval
  let nextIntervalDays = Math.max(1, Math.round(fsrsNextInterval(nextStability, requestRetention)));
  if (rating === 1) {
    nextIntervalDays = 1;
  }
  // Cap at 365 days
  nextIntervalDays = Math.min(365, nextIntervalDays);

  const nextDueDate = new Date(now.getTime() + nextIntervalDays * 86400000).toISOString();

  return {
    due: nextDueDate,
    stability: Math.round(nextStability * 100) / 100,
    difficulty: Math.round(nextDifficulty * 100) / 100,
    elapsed_days: Math.round(elapsedDays),
    scheduled_days: nextIntervalDays,
    reps: existingCard.reps + 1,
    lapses: rating === 1 ? existingCard.lapses + 1 : existingCard.lapses,
    state: rating === 1 ? 3 : 2,
    last_review: now.toISOString(),
  };
}

