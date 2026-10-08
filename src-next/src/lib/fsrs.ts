import { FSRSCard, FSRSRating } from '@/types';

const DECAY = 0.5;
const FACTOR = 19 / 81; // 0.90^(-2) - 1
const DEFAULT_RETENTION = 0.90;
const MAX_INTERVAL = 36500; // 100 years

// Standard FSRS weights
const W = [
  0.40255, 1.18385, 3.173, 15.691,
  7.1949, 0.5345,
  1.4604, 0.0046,
  1.5457, 0.1492,
  1.0069, 1.9904, 0.1147, 0.2934,
  0.2215, 0.2615, 0.6058
];

export function createNewCard(id: string, type: 'vocab' | 'grammar'): FSRSCard {
  return {
    id,
    type,
    due: Date.now(),
    stability: 0,
    difficulty: 0,
    elapsed_days: 0,
    scheduled_days: 0,
    reps: 0,
    lapses: 0,
    state: 0, // 0 = New
    last_review: undefined,
  };
}

export function fsrsForgettingCurve(elapsedDays: number, stability: number): number {
  if (stability <= 0) return 0;
  if (elapsedDays <= 0) return 1.0;
  const r = Math.pow(1 + FACTOR * (elapsedDays / stability), -DECAY);
  return Math.max(0, Math.min(1, r));
}

export function fsrsNextInterval(stability: number, requestRetention = DEFAULT_RETENTION): number {
  if (stability <= 0) return 1;
  const interval = (stability / FACTOR) * (Math.pow(requestRetention, -1 / DECAY) - 1);
  return Math.max(1, Math.min(MAX_INTERVAL, Math.round(interval)));
}

export function reviewCard(card: FSRSCard, rating: FSRSRating, now = Date.now()): FSRSCard {
  const elapsedDays = card.last_review
    ? Math.max(0, (now - card.last_review) / (1000 * 60 * 60 * 24))
    : 0;

  let newStability: number;
  let newDifficulty: number;
  let newState: 0 | 1 | 2 | 3;
  let lapses = card.lapses;

  if (card.state === 0) {
    // First review
    newStability = W[rating - 1];
    newDifficulty = Math.max(1, Math.min(10, W[4] - Math.exp(W[5] * (rating - 1)) + 1));
    newState = rating === 1 ? 1 : 2; // Learning or Review
  } else {
    // Subsequent review
    const r = fsrsForgettingCurve(elapsedDays, card.stability);
    
    // Difficulty update
    const nextD = card.difficulty - W[6] * (rating - 3);
    newDifficulty = Math.max(1, Math.min(10, W[7] * (W[4] - Math.exp(W[5] * 2) + 1) + (1 - W[7]) * nextD));

    if (rating === 1) {
      // Lapse (Again)
      lapses += 1;
      newStability = W[10] * Math.pow(card.difficulty, -W[11]) * (Math.pow(card.stability + 1, W[12]) - 1) * Math.exp((1 - r) * W[13]);
      newState = 3; // Relearning
    } else {
      // Recall (Hard, Good, Easy)
      const hardPenalty = rating === 2 ? W[15] : 1;
      const easyBonus = rating === 4 ? W[16] : 1;
      newStability = card.stability * (1 + Math.exp(W[8]) * (11 - newDifficulty) * Math.pow(card.stability, -W[9]) * (Math.exp((1 - r) * W[14]) - 1) * hardPenalty * easyBonus);
      newState = 2; // Review
    }
  }

  const scheduledDays = fsrsNextInterval(newStability);
  const due = now + scheduledDays * 24 * 60 * 60 * 1000;

  return {
    ...card,
    due,
    stability: Math.round(newStability * 100) / 100,
    difficulty: Math.round(newDifficulty * 100) / 100,
    elapsed_days: Math.round(elapsedDays),
    scheduled_days: scheduledDays,
    reps: card.reps + 1,
    lapses,
    state: newState,
    last_review: now,
  };
}
