// ═════════════════════════════════════════════════════════════════════════════════════════════
//  tests/test-s5-pass3-fsrs-lapse-recovery.js
//  SIKLUS V — PASS 3: FSRS Lapse Recovery & Relearning Invariants
//  Research Basis:
//    - Ye et al. (2022) — Post-lapse stability recovery & prior memory trace retention
//    - ADR-009 — Cognitive Fatigue-Aware Dampening & Anti-Punishment Spiral Protection
//    - Ebbinghaus & DeKeyser — Intra-Session Relearning Sleep Consolidation Invariant
// ═════════════════════════════════════════════════════════════════════════════════════════════

const assert = require('assert');
const path = require('path');
const fs = require('fs');

console.log('╔══════════════════════════════════════════════════════════════════════════════╗');
console.log('║   SIKLUS V — PASS 3: FSRS LAPSE RECOVERY & RELEARNING INVARIANTS             ║');
console.log('╚══════════════════════════════════════════════════════════════════════════════╝\n');

const ROOT_DIR = path.resolve(__dirname, '..');
const mathPath = path.join(ROOT_DIR, 'src/lib/fsrs/math.ts');
assert(fs.existsSync(mathPath), 'math.ts must exist at src/lib/fsrs/math.ts');

const {
  fsrsForgettingCurve,
  fsrsNextInterval,
  fsrsPostLapseStability,
  fsrsIsLeech,
  calculateFSRSReview,
  isFatigueCondition,
  DEFAULT_FSRS_WEIGHTS,
  INDONESIAN_CALIBRATED_FSRS_WEIGHTS,
} = require('../src/lib/fsrs/math.ts');

// ── Check 1: Post-Lapse Stability Memory Retention Invariant ────────────────────
console.log('▶ Check 1: Post-Lapse Stability Memory Retention Invariant...');

// Cards with high prior stability must retain more memory trace post-lapse than low stability cards
const stabLow = fsrsPostLapseStability(2.0, 5.0, 0.90);
const stabHigh = fsrsPostLapseStability(60.0, 5.0, 0.90);
assert(stabHigh > stabLow, `High prior stability must yield higher post-lapse stability: ${stabHigh} > ${stabLow}`);
assert(stabLow >= 0.1 && stabHigh >= 0.1, 'Post-lapse stability must be at least 0.1 days');

// Overdue lapse (R = 0.25) must retain higher stability than on-time lapse (R = 0.90) due to exp(w14*(1-R))
const stabOnTime = fsrsPostLapseStability(30.0, 5.0, 0.90);
const stabOverdue = fsrsPostLapseStability(30.0, 5.0, 0.25);
assert(stabOverdue > stabOnTime, `Overdue lapse must retain higher stability: overdue(${stabOverdue}) > onTime(${stabOnTime})`);
console.log(`  ✔ [PASS] Memory trace retention verified: S(60)=${stabHigh.toFixed(2)}d > S(2)=${stabLow.toFixed(2)}d; overdue S=${stabOverdue.toFixed(2)}d > onTime S=${stabOnTime.toFixed(2)}d`);

// ── Check 2: ADR-009 Fatigue-Aware Dampening & Anti-Punishment Spiral ───────────
console.log('\n▶ Check 2: ADR-009 Cognitive Fatigue Dampening...');

// Verify fatigue condition detection
assert.strictEqual(isFatigueCondition({ currentHour: 14, sessionMinutes: 20 }), false, 'Midday 20m is not fatigued');
assert.strictEqual(isFatigueCondition({ currentHour: 22, sessionMinutes: 10 }), true, '10 PM is fatigued');
assert.strictEqual(isFatigueCondition({ currentHour: 3, sessionMinutes: 10 }), true, '3 AM is fatigued');
assert.strictEqual(isFatigueCondition({ currentHour: 14, sessionMinutes: 50 }), true, '50m session is fatigued');

// Compare review lapse under normal vs fatigued conditions
const establishedCard = {
  due: new Date().toISOString(),
  stability: 20.0,
  difficulty: 4.0,
  elapsed_days: 20,
  scheduled_days: 20,
  reps: 5,
  lapses: 0,
  state: 2,
};

const normalLapse = calculateFSRSReview(establishedCard, 1, { isFatigued: false });
const fatiguedLapse = calculateFSRSReview(establishedCard, 1, { isFatigued: true });

// Fatigue dampening guarantees difficulty surge is capped at safeDifficulty + 0.4
assert(fatiguedLapse.difficulty <= establishedCard.difficulty + 0.41, `Fatigued difficulty capped at D+0.4: got ${fatiguedLapse.difficulty}`);
assert(normalLapse.difficulty > fatiguedLapse.difficulty, `Normal difficulty surge (${normalLapse.difficulty}) must be higher than fatigued surge (${fatiguedLapse.difficulty})`);

// Fatigue dampening guarantees 1.2x stability protection
assert(fatiguedLapse.stability > normalLapse.stability, `Fatigued stability (${fatiguedLapse.stability}) must be buffered 1.2x over normal (${normalLapse.stability})`);
console.log(`  ✔ [PASS] ADR-009 fatigue protection active: normal D=${normalLapse.difficulty}, S=${normalLapse.stability}d vs fatigued D=${fatiguedLapse.difficulty}, S=${fatiguedLapse.stability}d`);

// ── Check 3: Intra-Session Relearning Sleep-Consolidation Invariant ─────────────
console.log('\n▶ Check 3: Intra-Session Relearning Sleep-Consolidation Invariant...');

// Step 1: Established card lapses today
const lapseCard = calculateFSRSReview(establishedCard, 1);
assert.strictEqual(lapseCard.state, 3, 'Lapsed card must be in Relearning state (3)');
assert.strictEqual(lapseCard.scheduled_days, 1, 'Lapsed card must be scheduled for Day 1');

// Step 2: Immediate intra-session retry (elapsedDays = 0) answered Good (3)
// Working memory is warm, but sleep consolidation is required; interval MUST stay at 1 day
const intraSessionReview = calculateFSRSReview(lapseCard, 3);
assert.strictEqual(intraSessionReview.state, 2, 'Graduated from Relearning back to Review state (2)');
assert.strictEqual(intraSessionReview.scheduled_days, 1, 'Intra-session same-day relearning must remain at 1 day for tomorrow sleep check');

// Step 3: Next day review (elapsedDays >= 1) after sleep consolidation
const nextDayCard = {
  ...intraSessionReview,
  last_review: new Date(Date.now() - 86400000 * 1.5).toISOString(), // 1.5 days ago
};
const consolidatedReview = calculateFSRSReview(nextDayCard, 3);
assert.strictEqual(consolidatedReview.state, 2, 'Remains in Review state (2)');
assert(consolidatedReview.scheduled_days >= 2, `After 1-day sleep consolidation, interval must expand: got ${consolidatedReview.scheduled_days} days`);
console.log(`  ✔ [PASS] Sleep-consolidation invariant verified: intra-session Day=${intraSessionReview.scheduled_days}d -> next-day post-sleep Day=${consolidatedReview.scheduled_days}d`);

// ── Check 4: Consecutive Lapse Monotonic Decay & Leech Detection ────────────────
console.log('\n▶ Check 4: Consecutive Lapse Decay & Leech Threshold Invariant...');

let leechSimCard = {
  due: new Date().toISOString(),
  stability: 10.0,
  difficulty: 5.0,
  elapsed_days: 10,
  scheduled_days: 10,
  reps: 2,
  lapses: 0,
  state: 2,
};

assert.strictEqual(fsrsIsLeech(leechSimCard), false, 'Card with 0 lapses is not a leech');

for (let i = 1; i <= 4; i++) {
  leechSimCard = calculateFSRSReview(leechSimCard, 1);
  assert.strictEqual(leechSimCard.lapses, i, `Lapse count must equal ${i}`);
  assert(leechSimCard.stability >= 0.1, 'Stability must remain finite and >= 0.1');
  assert.strictEqual(leechSimCard.scheduled_days, 1, 'Interval must stay 1 day on consecutive lapses');
}

assert.strictEqual(fsrsIsLeech(leechSimCard), true, 'Card with 4 lapses must be flagged as Leech');
assert.strictEqual(fsrsIsLeech(null), false, 'Null card safe');
assert.strictEqual(fsrsIsLeech(undefined), false, 'Undefined card safe');
console.log(`  ✔ [PASS] Consecutive lapse decay and Leech detection (lapses=${leechSimCard.lapses}, stability=${leechSimCard.stability}d, isLeech=true) verified`);

// ── Check 5: Multi-Day Offline Elapsed Time Invariant ───────────────────────────
console.log('\n▶ Check 5: Multi-Day Offline Elapsed Time Invariant...');

const offlineCard = {
  due: new Date(Date.now() - 86400000 * 7).toISOString(), // 7 days overdue offline
  stability: 14.0,
  difficulty: 4.5,
  elapsed_days: 21,
  scheduled_days: 14,
  reps: 6,
  lapses: 1,
  state: 2,
  last_review: new Date(Date.now() - 86400000 * 21).toISOString(),
};

// Offline lapse: valid interval, no NaN, scheduled for tomorrow
const offlineLapse = calculateFSRSReview(offlineCard, 1);
assert.strictEqual(offlineLapse.scheduled_days, 1, 'Offline lapse schedules 1 day');
assert(Number.isFinite(offlineLapse.stability) && offlineLapse.stability >= 0.1, 'Offline stability must be finite');
assert(!isNaN(new Date(offlineLapse.due).getTime()), 'Due date must be valid ISO string');

// Offline successful recall: interval scales with stability
const offlineRecall = calculateFSRSReview(offlineCard, 3);
assert(offlineRecall.scheduled_days >= 14, 'Offline recall after 21 days must expand interval');
assert(offlineRecall.stability > offlineCard.stability, 'Successful recall after 21 days overdue must boost stability');
console.log(`  ✔ [PASS] Multi-day offline reviews resilient: offline lapse S=${offlineLapse.stability}d, recall S=${offlineRecall.stability}d (interval=${offlineRecall.scheduled_days}d)`);

// ── Check 6: Contrastive L1 Traps Penalty Invariant ────────────────────────────
console.log('\n▶ Check 6: Contrastive L1 Negative Transfer Traps (DD-57)...');

const trapCard = {
  due: new Date().toISOString(),
  stability: 8.0,
  difficulty: 4.0,
  elapsed_days: 8,
  scheduled_days: 8,
  reps: 3,
  lapses: 0,
  state: 2,
};

const standardTrap = calculateFSRSReview(trapCard, 1, { isL1Trap: true, isCatastrophicTrap: false });
const catastrophicTrap = calculateFSRSReview(trapCard, 1, { isL1Trap: true, isCatastrophicTrap: true });

assert.strictEqual(standardTrap.scheduled_days, 1, 'Standard trap schedules next-day review');
assert.strictEqual(catastrophicTrap.scheduled_days, 1, 'Catastrophic trap schedules next-day review');

// Standard: D' = min(10.0, D + 1.5) = 5.5, S' = max(0.2, S * 0.70) = 5.6
assert.strictEqual(standardTrap.difficulty, 5.5, 'Standard trap difficulty surge must be +1.5');
assert.strictEqual(standardTrap.stability, 5.6, 'Standard trap stability penalty must be 0.70x');

// Catastrophic: D' = min(10.0, D + 1.8) = 5.8, S' = max(0.2, S * 0.20) = 1.6
assert.strictEqual(catastrophicTrap.difficulty, 5.8, 'Catastrophic trap difficulty surge must be +1.8');
assert.strictEqual(catastrophicTrap.stability, 1.6, 'Catastrophic trap stability penalty must be 0.20x');

console.log(`  ✔ [PASS] L1 trap penalties verified: standard (D=${standardTrap.difficulty}, S=${standardTrap.stability}d) vs catastrophic (D=${catastrophicTrap.difficulty}, S=${catastrophicTrap.stability}d)`);

console.log('\n══════════════════════════════════════════════════════════════════════════════');
console.log('🎉 SIKLUS V PASS 3 VERIFICATION COMPLETE: ALL 6 CHECKS PASSED (100% GREEN)');
console.log('══════════════════════════════════════════════════════════════════════════════');
