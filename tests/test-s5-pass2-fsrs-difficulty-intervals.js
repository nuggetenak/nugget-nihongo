// ═════════════════════════════════════════════════════════════════════════════════════════════
//  tests/test-s5-pass2-fsrs-difficulty-intervals.js
//  SIKLUS V — PASS 2: FSRS Stability, Difficulty Adaptation & Interval Invariants ($1 \le D \le 10$)
//  Research Basis:
//    - Ye et al. (2022) — FSRS v4 memory model & mean reversion dynamics
//    - DeKeyser (2015) — Proceduralization latency modulation
//    - Matsunaga (1999) — 2.3x exposure scaling for non-kanji learners
// ═════════════════════════════════════════════════════════════════════════════════════════════

const assert = require('assert');
const path = require('path');
const fs = require('fs');

console.log('╔══════════════════════════════════════════════════════════════════════════════╗');
console.log('║   SIKLUS V — PASS 2: FSRS DIFFICULTY, STABILITY & INTERVAL INVARIANTS       ║');
console.log('╚══════════════════════════════════════════════════════════════════════════════╝\n');

const ROOT_DIR = path.resolve(__dirname, '..');
const mathPath = path.join(ROOT_DIR, 'src/lib/fsrs/math.ts');
assert(fs.existsSync(mathPath), 'math.ts must exist at src/lib/fsrs/math.ts');

const {
  fsrsForgettingCurve,
  fsrsNextInterval,
  fsrsRetrievabilityPercent,
  fsrsNextDifficulty,
  fsrsIsCardDue,
  fsrsCountDueCards,
  calculateFSRSReview,
  calculateLatencyFactor,
  calculateDualTrackStability,
  applyInterferencePenalty,
  DEFAULT_FSRS_WEIGHTS,
  INDONESIAN_CALIBRATED_FSRS_WEIGHTS,
  MATSUNAGA_MULTIPLIER,
} = require('../src/lib/fsrs/math.ts');

// ── Check 1: Difficulty Bounds Invariant [1.0, 10.0] & Mean Reversion ───────────
console.log('▶ Check 1: Difficulty Bounds Invariant [1.0, 10.0] & Mean Reversion...');

// Initial cards: Monotonicity D_0(Again) > D_0(Hard) > D_0(Good) > D_0(Easy)
const baseNew = {
  due: new Date().toISOString(),
  stability: 0,
  difficulty: 0,
  elapsed_days: 0,
  scheduled_days: 0,
  reps: 0,
  lapses: 0,
  state: 0,
};

const d1 = calculateFSRSReview(baseNew, 1).difficulty;
const d2 = calculateFSRSReview(baseNew, 2).difficulty;
const d3 = calculateFSRSReview(baseNew, 3).difficulty;
const d4 = calculateFSRSReview(baseNew, 4).difficulty;

assert(d1 >= 1.0 && d1 <= 10.0, `Initial D(Again) must be in [1.0, 10.0], got ${d1}`);
assert(d2 >= 1.0 && d2 <= 10.0, `Initial D(Hard) must be in [1.0, 10.0], got ${d2}`);
assert(d3 >= 1.0 && d3 <= 10.0, `Initial D(Good) must be in [1.0, 10.0], got ${d3}`);
assert(d4 >= 1.0 && d4 <= 10.0, `Initial D(Easy) must be in [1.0, 10.0], got ${d4}`);
assert(d1 > d2 && d2 > d3 && d3 > d4, `Strict difficulty monotonic order failed: ${d1} > ${d2} > ${d3} > ${d4}`);
console.log(`  ✔ [PASS] Initial difficulties strictly monotonic: Again(${d1}) > Hard(${d2}) > Good(${d3}) > Easy(${d4})`);

// Clamping of runaway/corrupted difficulty
const runawayCard = {
  ...baseNew,
  reps: 5,
  stability: 10,
  difficulty: 99.9, // corrupted extreme difficulty
};
const reviewedRunaway = calculateFSRSReview(runawayCard, 1);
assert.strictEqual(reviewedRunaway.difficulty, 10.0, 'Corrupted difficulty must clamp to 10.0');

const negativeDiffCard = {
  ...baseNew,
  reps: 5,
  stability: 10,
  difficulty: -5.0, // corrupted negative difficulty
};
const reviewedNegative = calculateFSRSReview(negativeDiffCard, 4);
assert(reviewedNegative.difficulty >= 1.0, 'Corrupted negative difficulty must clamp to >= 1.0');
console.log('  ✔ [PASS] Extreme difficulty inputs clamp to [1.0, 10.0]');

// Mean reversion convergence over repeated 'Good' reviews (w7 = 0.01 mean reversion rate)
let simulatedD = 9.5;
const initialD = simulatedD;
for (let i = 0; i < 50; i++) {
  simulatedD = fsrsNextDifficulty(simulatedD, 3);
}
assert(simulatedD < initialD, `Difficulty must decrease towards w4, started ${initialD}, got ${simulatedD}`);
for (let i = 50; i < 300; i++) {
  simulatedD = fsrsNextDifficulty(simulatedD, 3);
}
assert(Math.abs(simulatedD - DEFAULT_FSRS_WEIGHTS[4]) < 0.5, `Difficulty must asymptotically reach w4 (${DEFAULT_FSRS_WEIGHTS[4]}), got ${simulatedD}`);
console.log(`  ✔ [PASS] Mean reversion smoothly converges towards baseline w4: 9.50 -> ${simulatedD.toFixed(2)}`);

// ── Check 2: Scheduled Interval Monotonicity across Ratings ─────────────────────
console.log('\n▶ Check 2: Interval Monotonicity Invariant across Ratings I(1) <= I(2) <= I(3) <= I(4)...');

const testStabilities = [0.5, 2.0, 10.0, 30.0, 90.0];

for (const s of testStabilities) {
  const card = {
    due: new Date().toISOString(),
    stability: s,
    difficulty: 5.0,
    elapsed_days: Math.round(s),
    scheduled_days: Math.round(s),
    reps: 3,
    lapses: 0,
    state: 2,
  };

  const resAgain = calculateFSRSReview(card, 1);
  const resHard = calculateFSRSReview(card, 2);
  const resGood = calculateFSRSReview(card, 3);
  const resEasy = calculateFSRSReview(card, 4);

  assert.strictEqual(resAgain.scheduled_days, 1, `Again rating must always schedule interval 1 day (got ${resAgain.scheduled_days})`);
  assert(
    resAgain.scheduled_days <= resHard.scheduled_days &&
    resHard.scheduled_days <= resGood.scheduled_days &&
    resGood.scheduled_days <= resEasy.scheduled_days,
    `Interval monotonicity violated at S=${s}: [Again=${resAgain.scheduled_days}, Hard=${resHard.scheduled_days}, Good=${resGood.scheduled_days}, Easy=${resEasy.scheduled_days}]`
  );
  assert(resEasy.scheduled_days <= 365, 'Scheduled interval must never exceed 365 days');
}
console.log('  ✔ [PASS] Interval monotonicity I(Again) <= I(Hard) <= I(Good) <= I(Easy) holds across all stability levels');

// ── Check 3: State Machine Transitions (New -> Learning/Review, Lapse -> Relearning)
console.log('\n▶ Check 3: State Machine Transitions...');

// Brand new card rated Again -> Learning (1)
const newLapsed = calculateFSRSReview(baseNew, 1);
assert.strictEqual(newLapsed.state, 1, `Brand new card rated Again must enter state 1 (Learning), got ${newLapsed.state}`);

// Brand new card rated Good -> Review (2)
const newGood = calculateFSRSReview(baseNew, 3);
assert.strictEqual(newGood.state, 2, `Brand new card rated Good must enter state 2 (Review), got ${newGood.state}`);

// Established review card rated Again -> Relearning (3)
const reviewCard = {
  ...baseNew,
  reps: 4,
  stability: 15,
  difficulty: 4.5,
  state: 2,
};
const reviewLapsed = calculateFSRSReview(reviewCard, 1);
assert.strictEqual(reviewLapsed.state, 3, `Review card rated Again must enter state 3 (Relearning), got ${reviewLapsed.state}`);
assert.strictEqual(reviewLapsed.lapses, 1, 'Lapse counter must increment by 1');

// Relearning card rated Good -> Review (2)
const relearnCard = {
  ...reviewCard,
  state: 3,
};
const relearnGood = calculateFSRSReview(relearnCard, 3);
assert.strictEqual(relearnGood.state, 2, `Relearning card rated Good must return to state 2 (Review), got ${relearnGood.state}`);
console.log('  ✔ [PASS] FSRS state machine transitions verified: New(0)->Learning(1) / Review(2), Lapse->Relearning(3)');

// ── Check 4: Latency Factor & Cognitive Strain Sanitization ─────────────────────
console.log('\n▶ Check 4: Latency Factor & Cognitive Strain Sanitization...');

assert.strictEqual(calculateLatencyFactor(1000, 2500), 1.20, 'Rapid reflex (<1500ms) gives 1.20x bonus');
assert.strictEqual(calculateLatencyFactor(2000, 2500), 1.00, 'Fluid response (2000ms) gives 1.00x');
assert.strictEqual(calculateLatencyFactor(3500, 2500), 0.75, 'Hesitant response (3500ms) gives 0.75x');
assert.strictEqual(calculateLatencyFactor(5000, 2500), 0.40, 'Severe cognitive strain (>4500ms) gives 0.40x');

// Non-finite & boundary latency sanity
assert.strictEqual(calculateLatencyFactor(undefined), 1.0, 'Undefined latency defaults to 1.0');
assert.strictEqual(calculateLatencyFactor(NaN), 1.0, 'NaN latency defaults to 1.0 (no spurious strain penalty)');
assert.strictEqual(calculateLatencyFactor(-500), 1.0, 'Negative latency defaults to 1.0');
assert.strictEqual(calculateLatencyFactor(1000, 0), 1.20, 'Zero targetLatency defaults safely without NaN/Infinity');
console.log('  ✔ [PASS] Latency modulation and NaN/zero boundary sanitization verified');

// ── Check 5: Dual-Track Stability Cross-Modal Propagation ──────────────────────
console.log('\n▶ Check 5: Dual-Track Stability & Cross-Modal Propagation...');

const orthoReview = calculateDualTrackStability(2.0, 1.5, 'ortho', 4.0, 0.25, 0.65);
assert.strictEqual(orthoReview.stabilityOrtho, 4.0, 'Visual stability must reach target');
// S_audio delta = 4.0 - 2.0 = 2.0; 2.0 * 0.25 = 0.50; 1.5 + 0.50 = 2.0
assert.strictEqual(orthoReview.stabilityAudio, 2.0, 'Audio stability must receive alpha_cross propagation');

const audioReview = calculateDualTrackStability(2.0, 1.5, 'audio', 3.5, 0.25, 0.65);
assert.strictEqual(audioReview.stabilityAudio, 3.5, 'Audio stability must reach target');
// S_ortho delta = 3.5 - 1.5 = 2.0; 2.0 * 0.65 = 1.30; 2.0 + 1.30 = 3.30
assert.strictEqual(audioReview.stabilityOrtho, 3.3, 'Visual stability must receive beta_cross propagation');

// Boundary resilience
const corruptedDual = calculateDualTrackStability(-5, NaN, 'ortho', -10);
assert(corruptedDual.stabilityOrtho >= 0.1, 'Corrupted ortho stability must clamp to >= 0.1');
assert(corruptedDual.stabilityAudio >= 0.1, 'Corrupted audio stability must clamp to >= 0.1');
console.log('  ✔ [PASS] Dual-track visual/audio cross-modal propagation verified');

// ── Check 6: Reps/Lapses Protection & Resilient Due Count ──────────────────────
console.log('\n▶ Check 6: Card Reps/Lapses Protection & Resilient Due Count...');

const uninitializedCard = {
  due: new Date().toISOString(),
  stability: 2.0,
  difficulty: 5.0,
  elapsed_days: 1,
  scheduled_days: 1,
  // reps and lapses are completely undefined
};

const fixedCard = calculateFSRSReview(uninitializedCard, 3);
assert.strictEqual(typeof fixedCard.reps, 'number', 'Reps must be a number');
assert.strictEqual(typeof fixedCard.lapses, 'number', 'Lapses must be a number');
assert.strictEqual(fixedCard.reps, 1, 'Undefined reps must safely increment from 0 to 1');
assert.strictEqual(fixedCard.lapses, 0, 'Undefined lapses must safely default to 0 on Good review');

// fsrsIsCardDue and fsrsCountDueCards resilience
assert.strictEqual(fsrsCountDueCards(null), 0, 'Null cards map returns 0 due count');
assert.strictEqual(fsrsCountDueCards(undefined), 0, 'Undefined cards map returns 0 due count');

const mixedCards = {
  c1: { card: { due: new Date(Date.now() - 3600000).toISOString() } }, // past due
  c2: { card: { due: new Date(Date.now() + 86400000).toISOString() } }, // future
  c3: { card: { due: 'corrupted-timestamp' } }, // corrupted date -> must treat as due for safety
  c4: { card: null }, // null card
  c5: { card: { due: undefined } }, // undefined due -> new card due immediately
};
const dueCount = fsrsCountDueCards(mixedCards);
assert.strictEqual(dueCount, 3, `Expected 3 due cards (past + corrupted + undefined), got ${dueCount}`);

// Verify quizEngine.ts source alignment with resilient due count
const quizEnginePath = path.join(ROOT_DIR, 'src/lib/quiz/quizEngine.ts');
const quizEngineSource = fs.readFileSync(quizEnginePath, 'utf8');
assert(quizEngineSource.includes('export function getFSRSDueCount'), 'quizEngine.ts must export getFSRSDueCount');
assert(quizEngineSource.includes('Object.values(cardsMap || {})'), 'getFSRSDueCount must guard null cardsMap');
console.log('  ✔ [PASS] Reps/lapses NaN protection and resilient due count verified');

console.log('\n══════════════════════════════════════════════════════════════════════════════');
console.log('🎉 SIKLUS V PASS 2 VERIFICATION COMPLETE: ALL 6 CHECKS PASSED (100% GREEN)');
console.log('══════════════════════════════════════════════════════════════════════════════');
