// ══════════════════════════════════════════════════════
//  math.ts — Nugget Nihongo FSRS Math Utilities
//  Research basis:
//    - Ye et al. (2022) — FSRS memory model (KDD)
//    - Matsunaga (1999) — non-kanji-background learners need 2.3× exposures
// ══════════════════════════════════════════════════════
import type { FSRSCard, FSRSRating } from '../../types/fsrs.ts';

export const DECAY = 0.5;
export const FACTOR = 19 / 81; // (1/DECAY - 1)
export const MATSUNAGA_MULTIPLIER = 2.3;

/**
 * Forgetting Curve: R(t, S) = (1 + FACTOR * t / S) ^ (-DECAY)
 * Stability S is defined as the elapsed time in days for R to decay to 0.9.
 * When t = S, R(S, S) = (1 + 19/81)^(-0.5) = (100/81)^(-0.5) = 9/10 = 0.9.
 *
 * Mathematically hardened against clock skew, negative elapsed days, and non-finite values.
 *
 * @param elapsedDays Days elapsed since last review
 * @param stability Memory stability S
 * @returns Retrievability R in [0, 1]
 */
export function fsrsForgettingCurve(elapsedDays: number, stability: number): number {
  if (!Number.isFinite(stability) || stability <= 0) return 0;
  if (!Number.isFinite(elapsedDays) || elapsedDays <= 0) return 1.0;
  elapsedDays = Math.max(0, elapsedDays);
  const retrievability = Math.pow(1 + FACTOR * (elapsedDays / stability), -DECAY);
  return Number.isFinite(retrievability) ? Math.min(1.0, Math.max(0, retrievability)) : 0;
}

/**
 * Next Interval from Target Retention: t = S / FACTOR * (R^(-1/DECAY) - 1)
 * Mathematical inverse of the forgetting curve.
 * For target retention R = 0.9: R^(-1/0.5) - 1 = 0.9^(-2) - 1 = 19/81 = FACTOR, giving t = S.
 *
 * @param stability Memory stability S
 * @param requestRetention Desired retention rate (e.g. 0.9)
 * @returns Scheduled interval in days
 */
export function fsrsNextInterval(stability: number, requestRetention: number): number {
  if (!Number.isFinite(stability) || stability <= 0) return 0;
  if (!Number.isFinite(requestRetention) || requestRetention <= 0 || requestRetention >= 1) return 0;
  const interval = (stability / FACTOR) * (Math.pow(requestRetention, -1 / DECAY) - 1);
  return Number.isFinite(interval) ? Math.max(0, interval) : 0;
}

/**
 * Retrievability percentage formatted for UI meters, garden health, and analytics.
 * Returns an integer percentage bounded between 1% and 100%.
 */
export function fsrsRetrievabilityPercent(elapsedDays: number, stability: number): number {
  const r = fsrsForgettingCurve(elapsedDays, stability);
  return Math.max(1, Math.min(100, Math.round(r * 100)));
}

/**
 * Determines whether an FSRS card is due for review based on due timestamp or lapsed state.
 */
export function fsrsIsCardDue(card?: Partial<FSRSCard> | null, nowMs = Date.now()): boolean {
  if (!card) return false;
  if (!card.due) return true;
  const dueTime = new Date(card.due).getTime();
  return Number.isNaN(dueTime) || dueTime <= nowMs;
}

/**
 * Counts how many FSRS cards are due for review in a collection.
 */
export function fsrsCountDueCards(
  cardsMap?: Record<string, { card?: Partial<FSRSCard> | null }> | null,
  nowMs = Date.now()
): number {
  if (!cardsMap) return 0;
  let count = 0;
  for (const record of Object.values(cardsMap)) {
    if (record?.card && fsrsIsCardDue(record.card, nowMs)) {
      count++;
    }
  }
  return count;
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
 * 19 Calibrated Indonesian FSRS Weights (APP-DEVELOPMENT-SYNTHESIS-SPEC-v1.md)
 * Calibrated for Indonesian native speakers acquiring Japanese as L2 without kanji background.
 * Matsunaga (1999) 2.3x exposure prior, orthographic L1 transfer, and retention dampeners.
 */
export const INDONESIAN_CALIBRATED_FSRS_WEIGHTS: number[] = [
  0.4072,  // w0: Initial stability for Again
  1.1823,  // w1: Initial stability for Hard
  3.1262,  // w2: Initial stability for Good
  15.4722, // w3: Initial stability for Easy
  7.2102,  // w4: Initial difficulty
  0.5316,  // w5: Initial difficulty delta
  1.0918,  // w6: Difficulty update step
  0.0382,  // w7: Mean reversion weight
  1.6420,  // w8: Stability increase base
  0.1345,  // w9: Stability exponent
  1.0118,  // w10: Retrievability dampener
  2.1005,  // w11: Post-lapse base stability
  0.0842,  // w12: Post-lapse difficulty penalty
  0.3124,  // w13: Prior stability memory retention
  0.2281,  // w14: Retrievability lapse sensitivity
  0.2512,  // w15: Hard stability penalty factor (< 1.0)
  2.9421,  // w16: Easy stability bonus factor (> 1.0)
  0.5812,  // w17: Short-term stability factor
  0.3211   // w18: Same-day review decay
];

/**
 * Proceduralization Efficiency Factor Phi(Delta t)
 * DeKeyser (2015) Skill Acquisition Theory:
 * Rapid reflex recall signals proceduralized knowledge (up to 1.2x stability bonus),
 * while prolonged hesitation signals cognitive strain (down to 0.4x stability dampening).
 */
export function calculateLatencyFactor(latencyMs?: number, targetLatencyMs = 2500): number {
  if (latencyMs === undefined || !Number.isFinite(latencyMs) || latencyMs <= 0) return 1.0;
  const safeTarget = Number.isFinite(targetLatencyMs) && targetLatencyMs > 0 ? targetLatencyMs : 2500;
  const ratio = latencyMs / safeTarget;
  if (ratio <= 0.6) {
    return 1.20; // Native Reflex (< 1500ms on 2500ms target)
  }
  if (ratio <= 1.0) {
    return 1.00; // Fluid
  }
  if (ratio <= 1.8) {
    return 0.75; // Hesitant
  }
  return 0.40; // Severe Strain (> 4500ms on 2500ms target)
}

/**
 * Applies catastrophic L1 interference penalty spike when an Indonesian learner falls into
 * a native-transfer trap (e.g. SVO word order, wa vs ga focus, false cognate).
 *
 * Research basis: DD-57, Prihantoro et al. (2024).
 * Spikes difficulty: D' = min(10.0, D + 1.8)
 * Penalizes stability: S' = max(0.2, S * 0.20) if catastrophic, or S * 0.70 if standard
 */
export function applyInterferencePenalty(
  card: FSRSCard,
  isCatastrophic = false
): { stability: number; difficulty: number; scheduled_days: number } {
  const penaltyFactor = isCatastrophic ? 0.20 : 0.70;
  const difficultySurge = isCatastrophic ? 1.8 : 1.5;

  const rawDiff = Number.isFinite(card.difficulty) ? card.difficulty : 5.0;
  const currentDiff = Math.min(10.0, Math.max(1.0, rawDiff));
  const currentStab = Number.isFinite(card.stability) && card.stability > 0 ? card.stability : 1.0;

  const nextDifficulty = Math.min(10.0, Math.round((currentDiff + difficultySurge) * 100) / 100);
  const nextStability = Math.max(0.2, Math.round(currentStab * penaltyFactor * 100) / 100);
  const scheduledDays = 1; // Force immediate next-day contrastive variation review

  return {
    stability: nextStability,
    difficulty: nextDifficulty,
    scheduled_days: scheduledDays,
  };
}

/**
 * Updates the dual-track stability vector S_i = [S_ortho, S_audio]^T
 * Cross-modal coefficients:
 * - Visual review: updates S_ortho directly, propagates to S_audio with alpha_cross = 0.25
 * - Audio review: updates S_audio directly, propagates to S_ortho with beta_cross = 0.65
 */
export function calculateDualTrackStability(
  currentOrthoStability: number,
  currentAudioStability: number,
  modality: 'ortho' | 'audio',
  newStability: number,
  alphaCross = 0.25,
  betaCross = 0.65
): { stabilityOrtho: number; stabilityAudio: number } {
  const ortho = Number.isFinite(currentOrthoStability) && currentOrthoStability > 0 ? currentOrthoStability : 1.0;
  const audio = Number.isFinite(currentAudioStability) && currentAudioStability > 0 ? currentAudioStability : 1.0;
  const target = Number.isFinite(newStability) && newStability > 0 ? newStability : 1.0;
  const safeAlpha = Number.isFinite(alphaCross) && alphaCross >= 0 ? alphaCross : 0.25;
  const safeBeta = Number.isFinite(betaCross) && betaCross >= 0 ? betaCross : 0.65;

  if (modality === 'ortho') {
    const delta = Math.max(0, target - ortho);
    return {
      stabilityOrtho: Math.round(target * 100) / 100,
      stabilityAudio: Math.round((audio + delta * safeAlpha) * 100) / 100,
    };
  } else {
    const delta = Math.max(0, target - audio);
    return {
      stabilityOrtho: Math.round((ortho + delta * safeBeta) * 100) / 100,
      stabilityAudio: Math.round(target * 100) / 100,
    };
  }
}

/**
 * Computes next FSRS difficulty D' in [1.0, 10.0] with mean reversion to initial difficulty D_0(Good).
 * Formula: D' = D - w_6 * (rating - 3)
 * Mean reversion: D_new = w_7 * w_4 + (1 - w_7) * D'
 */
export function fsrsNextDifficulty(
  currentDifficulty: number,
  rating: FSRSRating,
  weights: number[] = DEFAULT_FSRS_WEIGHTS
): number {
  const safeD = Math.min(10.0, Math.max(1.0, Number.isFinite(currentDifficulty) ? currentDifficulty : weights[4]));
  const dPrime = safeD - weights[6] * (rating - 3);
  const dReverted = weights[7] * weights[4] + (1 - weights[7]) * dPrime;
  const clamped = Math.min(10.0, Math.max(1.0, dReverted));
  return Math.round(clamped * 100) / 100;
}

/**
 * Calculates post-lapse stability and parameters for cards that failed active recall.
 * Ye et al. (2022) FSRS v4.5 lapse recovery formula:
 * S'_forget = w_11 * D^(-w_12) * ((S + 1)^w_13 - 1) * exp(w_14 * (1 - R))
 *
 * ADR-009 Fatigue-Aware Dampening:
 * If fatigued, stability is multiplied by 1.2 to buffer against acute tiredness.
 */
export function fsrsPostLapseStability(
  currentStability: number,
  nextDifficulty: number,
  retrievability: number,
  isFatigued = false,
  weights: number[] = DEFAULT_FSRS_WEIGHTS
): number {
  const safeS = Number.isFinite(currentStability) && currentStability > 0 ? currentStability : 0;
  const safeD = Math.min(10.0, Math.max(1.0, Number.isFinite(nextDifficulty) ? nextDifficulty : 5.0));
  const safeR = Number.isFinite(retrievability) ? Math.min(1.0, Math.max(0, retrievability)) : 1.0;

  const sForget =
    weights[11] *
    Math.pow(safeD, -weights[12]) *
    (Math.pow(safeS + 1, weights[13]) - 1) *
    Math.exp(weights[14] * (1 - safeR));

  const finalS = Math.max(0.1, isFatigued ? sForget * 1.2 : sForget);
  return Math.round(finalS * 100) / 100;
}

/**
 * Identifies whether a card has become a memory "leech" (recurrent lapse threshold >= 4).
 * Such items benefit from mnemonic hooks, visual stroke breakdowns, or L1 contrastive diagnostics.
 */
export function fsrsIsLeech(card?: Partial<FSRSCard> | null, lapseThreshold = 4): boolean {
  if (!card || !Number.isFinite(card.lapses)) return false;
  return (card.lapses ?? 0) >= lapseThreshold;
}

export interface FSRSReviewOptions {
  requestRetention?: number;
  isFatigued?: boolean;
  currentHour?: number;
  sessionMinutes?: number;
  latencyMs?: number;
  targetLatencyMs?: number;
  weights?: number[];
  useIndonesianWeights?: boolean;
  isL1Trap?: boolean;
  isCatastrophicTrap?: boolean;
  isKanji?: boolean;
  matsunagaMultiplier?: number;
}

/**
 * Checks whether user is currently in a cognitive fatigue state (late night or prolonged session).
 */
export function isFatigueCondition(options?: { currentHour?: number; sessionMinutes?: number }): boolean {
  if (!options) return false;
  const hour = options.currentHour !== undefined ? options.currentHour : new Date().getHours();
  const session = options.sessionMinutes || 0;
  return hour >= 21 || hour < 5 || session > 45;
}

/**
 * Calculates updated FSRSCard metrics after a user review rating (1: Again, 2: Hard, 3: Good, 4: Easy).
 * Mathematically derived from the Ye et al. (2022) FSRS memory model with ADR-009 fatigue calibration.
 * Hardened against NaN, clock skew, negative elapsed days, and non-finite boundary inputs.
 */
export function calculateFSRSReview(
  existingCard: FSRSCard,
  rating: FSRSRating,
  requestRetentionOrOptions: number | FSRSReviewOptions = 0.9
): FSRSCard {
  const options: FSRSReviewOptions =
    typeof requestRetentionOrOptions === 'number'
      ? { requestRetention: requestRetentionOrOptions }
      : requestRetentionOrOptions || {};

  const requestRetention = options.requestRetention ?? 0.9;
  const isFatigued =
    options.isFatigued ?? isFatigueCondition({ currentHour: options.currentHour, sessionMinutes: options.sessionMinutes });

  const now = new Date();
  const lastReviewTime = existingCard.last_review
    ? new Date(existingCard.last_review).getTime()
    : now.getTime();
  const rawElapsed = (now.getTime() - lastReviewTime) / 86400000;
  const elapsedDays = Math.max(0, Number.isFinite(rawElapsed) ? rawElapsed : 0);

  const safeStability = Number.isFinite(existingCard.stability) && existingCard.stability > 0 ? existingCard.stability : 0;
  const rawDifficulty = Number.isFinite(existingCard.difficulty) && existingCard.difficulty > 0 ? existingCard.difficulty : 5.0;
  const safeDifficulty = Math.min(10.0, Math.max(1.0, rawDifficulty));

  const safeReps = Number.isFinite(existingCard.reps) && existingCard.reps >= 0 ? existingCard.reps : 0;
  const safeLapses = Number.isFinite(existingCard.lapses) && existingCard.lapses >= 0 ? existingCard.lapses : 0;

  // Retrievability
  const r =
    safeStability > 0 && elapsedDays > 0
      ? fsrsForgettingCurve(elapsedDays, safeStability)
      : 1.0;

  let nextStability: number;
  let nextDifficulty: number;

  const weights = options.weights || (options.useIndonesianWeights ? INDONESIAN_CALIBRATED_FSRS_WEIGHTS : DEFAULT_FSRS_WEIGHTS);

  // If L1 trap failed on Again rating, apply catastrophic/standard interference penalty spike
  if (options.isL1Trap && rating === 1 && safeReps > 0) {
    const penalized = applyInterferencePenalty(
      { ...existingCard, stability: safeStability, difficulty: safeDifficulty },
      options.isCatastrophicTrap
    );
    nextStability = penalized.stability;
    nextDifficulty = penalized.difficulty;
  } else {
    const isInitial = safeReps === 0 || safeStability <= 0;

    if (isInitial) {
      // Initial stability & difficulty
      nextStability = weights[rating - 1] || 1.0;
      nextDifficulty = Math.min(
        10,
        Math.max(1, weights[4] - (rating - 3) * weights[5])
      );
    } else {
      // Update difficulty with mean reversion
      const dPrime = safeDifficulty - weights[6] * (rating - 3);
      const dReverted =
        weights[7] * weights[4] + (1 - weights[7]) * dPrime;
      nextDifficulty = Math.min(10, Math.max(1, dReverted));

      if (rating === 1) {
        // Lapse (Again)
        // ADR-009 Fatigue-Aware Dampening: if fatigued, cap difficulty surge to prevent punishment spiral
        if (isFatigued) {
          nextDifficulty = Math.min(nextDifficulty, safeDifficulty + 0.4);
        }
        const sForget =
          weights[11] *
          Math.pow(nextDifficulty, -weights[12]) *
          (Math.pow(safeStability + 1, weights[13]) - 1) *
          Math.exp(weights[14] * (1 - r));
        nextStability = Math.max(0.1, isFatigued ? sForget * 1.2 : sForget);
      } else {
        // Successful recall (Hard, Good, Easy)
        const hardPenalty = rating === 2 ? weights[15] : 1.0;
        const easyBonus = rating === 4 ? weights[16] : 1.0;
        const sBase = Math.max(0.1, safeStability);
        const sRecall =
          sBase *
          (1 +
            Math.exp(weights[8]) *
              (11 - nextDifficulty) *
              Math.pow(sBase, -weights[9]) *
              (Math.exp(weights[10] * (1 - r)) - 1) *
              hardPenalty *
              easyBonus);

        // Proceduralization Efficiency Latency Modulation Phi(Delta t)
        const latencyMod = calculateLatencyFactor(options.latencyMs, options.targetLatencyMs);
        nextStability = Math.max(0.1, sRecall * latencyMod);
      }
    }
  }

  // Apply Matsunaga 2.3x exposure scaling for non-kanji background learners (Ticket T-54 / Matsunaga 1999)
  if (options.isKanji) {
    const mult = options.matsunagaMultiplier || MATSUNAGA_MULTIPLIER;
    nextStability = Math.max(0.1, nextStability / mult);
  }

  // Numerical Safety Sanitization against NaN, Infinity, or negative boundaries
  if (!Number.isFinite(nextStability) || nextStability < 0.1) nextStability = 0.1;
  if (!Number.isFinite(nextDifficulty) || nextDifficulty < 1.0) nextDifficulty = 1.0;
  if (nextDifficulty > 10.0) nextDifficulty = 10.0;

  // Calculate next interval
  const rawInterval = fsrsNextInterval(nextStability, requestRetention);
  let nextIntervalDays = Math.max(1, Math.round(Number.isFinite(rawInterval) ? rawInterval : 1));
  if (rating === 1) {
    nextIntervalDays = 1;
  } else if (existingCard.state === 3 && elapsedDays < 1) {
    // Intra-session / same-day relearning graduation invariant:
    // After a lapse on the same day, successful immediate rehearsal confirms working memory
    // but long-term memory requires sleep consolidation; schedule for Day 1 (tomorrow).
    nextIntervalDays = 1;
  }
  // Cap at 365 days
  nextIntervalDays = Math.min(365, Math.max(1, nextIntervalDays));

  const nextDueDate = new Date(now.getTime() + nextIntervalDays * 86400000).toISOString();
  const nextState = rating === 1 ? (safeReps === 0 ? 1 : 3) : 2;

  return {
    due: nextDueDate,
    stability: Math.round(nextStability * 100) / 100,
    difficulty: Math.round(nextDifficulty * 100) / 100,
    elapsed_days: Math.round(elapsedDays),
    scheduled_days: nextIntervalDays,
    reps: safeReps + 1,
    lapses: rating === 1 ? safeLapses + 1 : safeLapses,
    state: nextState,
    last_review: now.toISOString(),
  };
}
