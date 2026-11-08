// ══════════════════════════════════════════════════════════════════
//  test-s5-pass40-crdt-conflict-reconciler.js — Forensic Unit & Regression Suite
//  Siklus V Pass 40: CRDT Conflict-Free Vector Clock Reconciler
//  Validates:
//  1. Static type signatures and function exports
//  2. Defensive null/undefined/NaN edge case resiliency
//  3. Monotonic kanji mastery lattice & score high-water mark
//  4. FSRS multi-device memory card reconciliation invariants
//  5. Zero-data-loss practice log session deduplication
//  6. Vector clock causality analysis & concurrent divergence resolution
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT_DIR = path.resolve(__dirname, '..');
const resolverPath = path.join(ROOT_DIR, 'src/lib/sync/conflictResolver.ts');

console.log('🧪 Running Siklus V Pass 40: CRDT Conflict-Free Vector Clock Reconciler Test...\n');

// ── Check 1: Static Module & Function Exports ─────────────────────
console.log('  🔍 Check 1: Validating Exported Signatures & Functions...');
assert(fs.existsSync(resolverPath), 'conflictResolver.ts must exist');
const resolverSrc = fs.readFileSync(resolverPath, 'utf8');

const requiredExports = [
  'resolveLWW',
  'resolveFSRSCardConflict',
  'resolveCourseProgressConflict',
  'resolveUserSettingsConflict',
  'resolveKanjiMasteryConflict',
  'resolveKanjiPracticeLogsConflict',
  'compareVectorClocks',
  'mergeVectorClocks',
  'incrementVectorClock',
  'resolveVectorClockConflict',
];

for (const exp of requiredExports) {
  assert(
    resolverSrc.includes(`export function ${exp}`),
    `conflictResolver.ts must export function ${exp}`
  );
}
console.log('  ✅ Check 1 Passed: All 10 reconciler and vector clock functions exported\n');

// Dynamically require conflictResolver
const {
  resolveLWW,
  resolveFSRSCardConflict,
  resolveCourseProgressConflict,
  resolveUserSettingsConflict,
  resolveKanjiMasteryConflict,
  resolveKanjiPracticeLogsConflict,
  compareVectorClocks,
  mergeVectorClocks,
  incrementVectorClock,
  resolveVectorClockConflict,
} = require('../src/lib/sync/conflictResolver.ts');

// ── Check 2: Defensive Edge Case Resiliency (Null, NaN, Malformed) ──
console.log('  🔍 Check 2: Testing Defensive Resiliency Against Null/Undefined/NaN Inputs...');

// Null inputs across all APIs
assert.doesNotThrow(() => resolveLWW(null, undefined), 'resolveLWW must not crash on null/undefined');
assert.doesNotThrow(() => resolveFSRSCardConflict(null, null), 'resolveFSRSCardConflict must not crash on null');
assert.doesNotThrow(() => resolveCourseProgressConflict(null, null), 'resolveCourseProgressConflict must not crash');
assert.doesNotThrow(() => resolveUserSettingsConflict(null, null), 'resolveUserSettingsConflict must not crash');
assert.doesNotThrow(() => resolveKanjiMasteryConflict(null, null), 'resolveKanjiMasteryConflict must not crash');
assert.doesNotThrow(() => resolveKanjiPracticeLogsConflict(null, null), 'resolveKanjiPracticeLogsConflict must not crash');

// LWW fallback with one-sided null
const validItem = { id: 'x1', value: 'hello', updated_at: 1000 };
assert.strictEqual(resolveLWW(validItem, null).value, 'hello', 'LWW must return valid local when remote is null');
assert.strictEqual(resolveLWW(null, validItem).value, 'hello', 'LWW must return valid remote when local is null');

// LWW invalid date / NaN handling
const invalidDateLocal = { id: 'a', value: 'old', updated_at: 'invalid-date' };
const validDateRemote = { id: 'b', value: 'new', updated_at: '2026-10-15T12:00:00Z' };
assert.strictEqual(
  resolveLWW(invalidDateLocal, validDateRemote).value,
  'new',
  'Valid date must win over invalid date string'
);

// LWW deterministic tie-breaker on identical timestamp
const tieA = { id: 'item_a', value: 'apple', updated_at: 5000 };
const tieB = { id: 'item_z', value: 'zebra', updated_at: 5000 };
const winner1 = resolveLWW(tieA, tieB);
const winner2 = resolveLWW(tieB, tieA);
assert.strictEqual(winner1.id, winner2.id, 'Deterministic tie-breaking must yield symmetric result');

// Course progress null tolerance
const emptyCourse = resolveCourseProgressConflict(undefined, undefined);
assert.strictEqual(emptyCourse.current_index, 0);
assert.strictEqual(emptyCourse.completed, false);
assert(typeof emptyCourse.updated_at === 'string');

console.log('  ✅ Check 2 Passed: Resilient defensive boundaries against all malformed inputs\n');

// ── Check 3: Monotonic Mastery Lattice & High-Water Mark Score ─────
console.log('  🔍 Check 3: Validating Monotonic Kanji Mastery Lattice & High-Water Mark...');

const apprenticeLocal = {
  character: '漢',
  total_attempts: 5,
  successful_writes: 1,
  average_score: 72.4,
  last_practiced: 1700000100000,
  mastery_level: 'practiced',
  updated_at: 1700000100000,
};

const obsoleteMasteredRemote = {
  character: '漢',
  total_attempts: 8,
  successful_writes: 4,
  average_score: 95.8,
  last_practiced: 1700000000000,
  mastery_level: 'mastered',
  updated_at: 1700000000000,
};

const mergedMastery = resolveKanjiMasteryConflict(apprenticeLocal, obsoleteMasteredRemote);
assert.strictEqual(mergedMastery.character, '漢');
assert.strictEqual(mergedMastery.mastery_level, 'mastered', 'Mastered status must never regress');
assert.strictEqual(mergedMastery.total_attempts, 8, 'Total attempts must be monotonic max');
assert.strictEqual(mergedMastery.successful_writes, 4, 'Successful writes must be monotonic max');
assert.strictEqual(mergedMastery.average_score, 95.8, 'High-water mark average score must be preserved');
assert.strictEqual(mergedMastery.last_practiced, 1700000100000, 'Latest practice timestamp must be preserved');

// Auto-promotion on successful writes >= 3
const candidateRow = {
  character: '字',
  total_attempts: 3,
  successful_writes: 3,
  average_score: 89.2,
  last_practiced: 1700000200000,
  mastery_level: 'learning',
  updated_at: 1700000200000,
};
const promoted = resolveKanjiMasteryConflict(candidateRow, candidateRow);
assert.strictEqual(promoted.mastery_level, 'mastered', '3 successful writes must auto-promote to mastered');

console.log('  ✅ Check 3 Passed: Monotonic lattice guarantees no regression across devices\n');

// ── Check 4: FSRS Memory Card Reconciliation Invariants ───────────
console.log('  🔍 Check 4: Validating FSRS Multi-Device Card Synchronization...');

// Scenario A: Intra-day concurrent reviews (< 12 hours)
const cardPhone = {
  card_id: 'card_101',
  item_type: 'vocab',
  item_id: 'v_taberu',
  stability: 5.4,
  difficulty: 4.2,
  elapsed_days: 3,
  scheduled_days: 7,
  reps: 6,
  lapses: 1,
  state: 2,
  due: '2026-11-01T00:00:00Z',
  last_review: '2026-10-25T10:00:00Z',
};

const cardLaptop = {
  card_id: 'card_101',
  item_type: 'vocab',
  item_id: 'v_taberu',
  stability: 6.8,
  difficulty: 3.8,
  elapsed_days: 3,
  scheduled_days: 9,
  reps: 7,
  lapses: 1,
  state: 2,
  due: '2026-11-03T00:00:00Z',
  last_review: '2026-10-25T14:30:00Z',
};

const resolvedIntraDay = resolveFSRSCardConflict(cardPhone, cardLaptop);
assert.strictEqual(resolvedIntraDay.stability, 6.8, 'Must keep higher stability');
assert.strictEqual(resolvedIntraDay.reps, 7, 'Reps must be non-decreasing');
assert.strictEqual(resolvedIntraDay.lapses, 1, 'Lapses must be preserved');
assert.strictEqual(resolvedIntraDay.difficulty, 4.0, 'Difficulty must be safely smoothed ((4.2 + 3.8) / 2)');
assert.strictEqual(resolvedIntraDay.due, '2026-11-03T00:00:00Z', 'Due date must be further horizon');
assert.strictEqual(resolvedIntraDay.last_review, '2026-10-25T14:30:00Z', 'Latest review time retained');

// Scenario B: Distinct review sessions (> 12 hours apart)
const cardMorning = {
  card_id: 'card_102',
  stability: 2.0,
  reps: 2,
  lapses: 0,
  due: '2026-10-25T00:00:00Z',
  last_review: '2026-10-24T06:00:00Z',
};

const cardNextNight = {
  card_id: 'card_102',
  stability: 4.5,
  reps: 3,
  lapses: 0,
  due: '2026-10-28T00:00:00Z',
  last_review: '2026-10-25T22:00:00Z', // 40 hours later
};

const resolvedInterDay = resolveFSRSCardConflict(cardMorning, cardNextNight);
assert.strictEqual(resolvedInterDay.stability, 4.5, 'Newer session parameters must win');
assert(resolvedInterDay.reps >= 3, 'Reps must not regress');
assert.strictEqual(resolvedInterDay.last_review, '2026-10-25T22:00:00Z');

console.log('  ✅ Check 4 Passed: FSRS card reconciliation verified across temporal horizons\n');

// ── Check 5: Practice Log Union & Deduplication ───────────────────
console.log('  🔍 Check 5: Validating Zero-Data-Loss Practice Log Union & Deduplication...');

const logsDeviceA = [
  { session_id: 'sess_1', character: '水', score: 80, is_complete: true, practiced_at: 1000 },
  { session_id: 'sess_2', character: '水', score: 88, is_complete: false, practiced_at: 2000 },
  null, // Defensive test for corrupt row
];

const logsDeviceB = [
  { session_id: 'sess_2', character: '水', score: 94, is_complete: true, practiced_at: 2000 }, // Concurrent higher score
  { session_id: 'sess_3', character: '水', score: 75, is_complete: true, practiced_at: 3000 },
  { score: 50 }, // Missing session_id
];

const mergedPracticeLogs = resolveKanjiPracticeLogsConflict(logsDeviceA, logsDeviceB);
assert.strictEqual(mergedPracticeLogs.length, 3, 'Must produce union of exactly 3 valid sessions');
assert.strictEqual(mergedPracticeLogs[0].session_id, 'sess_3', 'Sorted descending by practiced_at');
assert.strictEqual(mergedPracticeLogs[1].session_id, 'sess_2');
assert.strictEqual(mergedPracticeLogs[2].session_id, 'sess_1');

// Verify duplicate resolution picked highest score and completion
assert.strictEqual(mergedPracticeLogs[1].score, 94);
assert.strictEqual(mergedPracticeLogs[1].is_complete, true);

console.log('  ✅ Check 5 Passed: Zero-data-loss log union and deduplication verified\n');

// ── Check 6: Vector Clock Causality & Divergence Resolution ───────
console.log('  🔍 Check 6: Validating Vector Clock Causality Tracking & CRDT Reconciler...');

// Incrementing
let vc1 = incrementVectorClock(null, 'device_A');
assert.deepStrictEqual(vc1, { device_A: 1 });
vc1 = incrementVectorClock(vc1, 'device_A');
assert.deepStrictEqual(vc1, { device_A: 2 });
vc1 = incrementVectorClock(vc1, 'device_B');
assert.deepStrictEqual(vc1, { device_A: 2, device_B: 1 });

// Clock comparisons
assert.strictEqual(compareVectorClocks({ A: 1, B: 2 }, { A: 1, B: 2 }), 'EQUAL');
assert.strictEqual(compareVectorClocks({ A: 1, B: 1 }, { A: 1, B: 2 }), 'BEFORE');
assert.strictEqual(compareVectorClocks({ A: 2, B: 3 }, { A: 2, B: 2 }), 'AFTER');
assert.strictEqual(compareVectorClocks({ A: 2, B: 1 }, { A: 1, B: 2 }), 'CONCURRENT');

// Clock merging (component-wise supremum)
const mergedVC = mergeVectorClocks({ A: 3, B: 1 }, { A: 2, B: 4, C: 1 });
assert.deepStrictEqual(mergedVC, { A: 3, B: 4, C: 1 });

// Vector clock conflict resolution
// 1. Dominant causality (BEFORE) -> remote wins
const entityLocalOld = { id: 'note1', text: 'draft', _vc: { dev1: 1 } };
const entityRemoteNew = { id: 'note1', text: 'published', _vc: { dev1: 2 } };
const resDominant = resolveVectorClockConflict(entityLocalOld, entityRemoteNew);
assert.strictEqual(resDominant.text, 'published', 'Causally dominant remote must win');
assert.deepStrictEqual(resDominant._vc, { dev1: 2 });

// 2. Concurrent divergence (CONCURRENT) with custom domain merger
const concurrentA = {
  character: '火',
  total_attempts: 3,
  successful_writes: 1,
  average_score: 70,
  last_practiced: 1000,
  mastery_level: 'practiced',
  updated_at: 1000,
  _vc: { phone: 2, laptop: 1 },
};

const concurrentB = {
  character: '火',
  total_attempts: 2,
  successful_writes: 2,
  average_score: 85,
  last_practiced: 1500,
  mastery_level: 'practiced',
  updated_at: 1500,
  _vc: { phone: 1, laptop: 2 },
};

const resolvedConcurrent = resolveVectorClockConflict(
  concurrentA,
  concurrentB,
  resolveKanjiMasteryConflict
);

assert.strictEqual(resolvedConcurrent.character, '火');
assert.strictEqual(resolvedConcurrent.total_attempts, 3, 'Attempts must be supremum');
assert.strictEqual(resolvedConcurrent.successful_writes, 2, 'Writes must be supremum');
assert.strictEqual(resolvedConcurrent.average_score, 85, 'Score must be high-water mark');
assert.deepStrictEqual(
  resolvedConcurrent._vc,
  { phone: 2, laptop: 2 },
  'Vector clock must be merged to supremum { phone: 2, laptop: 2 }'
);

console.log('  ✅ Check 6 Passed: Vector clock causality and concurrent CRDT resolution certified\n');

console.log('🎉 SIKLUS V PASS 40 VERIFIED: CRDT Conflict-Free Vector Clock Reconciler 100% GREEN!\n');
process.exit(0);
