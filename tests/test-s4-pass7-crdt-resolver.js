// ══════════════════════════════════════════════════════════════════
//  test-s4-pass7-crdt-resolver.js — Forensic Unit & Regression Suite
//  Siklus IV Pass 7: CRDT Conflict-Free Vector Clock Reconciler
//  Validates monotonic mastery progression, score high-water mark,
//  and zero-data-loss practice session log deduplication.
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT_DIR = path.resolve(__dirname, '..');
const resolverPath = path.join(ROOT_DIR, 'src/lib/sync/conflictResolver.ts');

console.log('🧪 Running Siklus IV Pass 7: CRDT Conflict-Free Reconciler Test...');

// 1. Static contract verification
console.log('  🔍 Check 1: Validating Exported Functions & Type Signatures...');
assert(fs.existsSync(resolverPath), 'conflictResolver.ts must exist');
const resolverSrc = fs.readFileSync(resolverPath, 'utf8');

assert(
  resolverSrc.includes('export function resolveKanjiMasteryConflict'),
  'Must export resolveKanjiMasteryConflict'
);
assert(
  resolverSrc.includes('export function resolveKanjiPracticeLogsConflict'),
  'Must export resolveKanjiPracticeLogsConflict'
);
console.log('  ✅ Check 1 Passed: Function signatures exported correctly');

// Dynamically require or evaluate conflictResolver
const {
  resolveKanjiMasteryConflict,
  resolveKanjiPracticeLogsConflict,
} = require('../src/lib/sync/conflictResolver.ts');

// 2. Monotonic mastery level lattice
console.log('  🔍 Check 2: Validating Mastery Level Monotonic Lattice (No Downgrades)...');

const localLearning = {
  character: '日',
  total_attempts: 2,
  successful_writes: 0,
  average_score: 65,
  last_practiced: 1700000000000,
  mastery_level: 'learning',
  updated_at: 1700000000000,
};

const remotePracticed = {
  character: '日',
  total_attempts: 4,
  successful_writes: 2,
  average_score: 85,
  last_practiced: 1700000500000,
  mastery_level: 'practiced',
  updated_at: 1700000500000,
};

const merged1 = resolveKanjiMasteryConflict(localLearning, remotePracticed);
assert.strictEqual(merged1.character, '日');
assert.strictEqual(merged1.mastery_level, 'practiced', 'Learning merged with practiced must result in practiced');
assert.strictEqual(merged1.total_attempts, 4);
assert.strictEqual(merged1.successful_writes, 2);
assert.strictEqual(merged1.average_score, 85);
assert.strictEqual(merged1.last_practiced, 1700000500000);

// Even if local has newer updated_at but lower mastery level, mastery must NEVER regress
const localOutdatedMastered = {
  character: '日',
  total_attempts: 6,
  successful_writes: 3,
  average_score: 92,
  last_practiced: 1700000100000,
  mastery_level: 'mastered',
  updated_at: 1700000100000,
};

const remoteNewerLearning = {
  character: '日',
  total_attempts: 1,
  successful_writes: 0,
  average_score: 70,
  last_practiced: 1700000900000,
  mastery_level: 'learning',
  updated_at: 1700000900000,
};

const merged2 = resolveKanjiMasteryConflict(localOutdatedMastered, remoteNewerLearning);
assert.strictEqual(merged2.mastery_level, 'mastered', 'Mastered state must never degrade to learning');
assert.strictEqual(merged2.successful_writes, 3, 'Successful writes must preserve max');
assert.strictEqual(merged2.average_score, 92, 'Accuracy must preserve high-water mark');
console.log('  ✅ Check 2 Passed: Monotonic lattice guarantees zero regression');

// 3. Auto-promotion based on successful writes threshold
console.log('  🔍 Check 3: Validating Auto-Promotion Thresholds...');

const rowWith3Successes = {
  character: '月',
  total_attempts: 3,
  successful_writes: 3,
  average_score: 88,
  last_practiced: 1700000000000,
  mastery_level: 'learning', // Stored as learning by obsolete client
  updated_at: 1700000000000,
};

const merged3 = resolveKanjiMasteryConflict(rowWith3Successes, rowWith3Successes);
assert.strictEqual(merged3.mastery_level, 'mastered', '>=3 successful writes must auto-promote to mastered');
console.log('  ✅ Check 3 Passed: Auto-promotion thresholds verified');

// 4. Practice Log Deduplication & Union (Zero Data Loss)
console.log('  🔍 Check 4: Validating Practice Log Merging & Deduplication...');

const localLogs = [
  { session_id: 's_001', character: '日', score: 85, is_complete: true, practiced_at: 1000 },
  { session_id: 's_002', character: '日', score: 92, is_complete: true, practiced_at: 2000 },
];

const remoteLogs = [
  { session_id: 's_002', character: '日', score: 95, is_complete: true, practiced_at: 2000 }, // Concurrent update with higher score
  { session_id: 's_003', character: '日', score: 78, is_complete: false, practiced_at: 3000 },
];

const mergedLogs = resolveKanjiPracticeLogsConflict(localLogs, remoteLogs);
assert.strictEqual(mergedLogs.length, 3, 'Must produce union of 3 unique sessions');
// Descending sort order
assert.strictEqual(mergedLogs[0].session_id, 's_003');
assert.strictEqual(mergedLogs[1].session_id, 's_002');
assert.strictEqual(mergedLogs[2].session_id, 's_001');
// Duplicate session_id resolution took higher score
assert.strictEqual(mergedLogs[1].score, 95);
console.log('  ✅ Check 4 Passed: Zero-data-loss log union and deduplication certified');

console.log('\n🎉 PASS 7 VERIFIED: CRDT Conflict-Free Reconciler certified 100% compliant!\n');
process.exit(0);
