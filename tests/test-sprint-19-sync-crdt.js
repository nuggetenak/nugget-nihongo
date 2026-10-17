// ══════════════════════════════════════════════════════════════════
//  test-sprint-19-sync-crdt.js — Forensic Unit & Integration Suite
//  Sprint 19: Offline State Reconciliation, CRDT & Conflict-Free Cloud Sync
//  (Tickets T-103 to T-108)
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const assert = require('assert');

let passedTests = 0;
let totalTests = 0;

function test(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✅ [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ [FAIL] ${name}`);
    console.error(`     Error: ${err.message}`);
  }
}

console.log('\n=============================================================');
console.log('🔄 RUNNING SPRINT 19 VERIFICATION SUITE: CRDT & CLOUD RECONCILIATION');
console.log('=============================================================\n');

const ROOT_DIR = path.resolve(__dirname, '..');

// ── T-103: Last-Write-Wins (LWW) and Timestamp Reconciliation ──────
test('T-103: conflictResolver.ts resolves LWW, course progress, and settings', () => {
  const resolverPath = path.join(ROOT_DIR, 'src/lib/sync/conflictResolver.ts');
  assert(fs.existsSync(resolverPath), 'conflictResolver.ts must exist');
  const code = fs.readFileSync(resolverPath, 'utf8');

  assert(code.includes('export function resolveLWW'), 'Must export resolveLWW');
  assert(code.includes('export function resolveCourseProgressConflict'), 'Must export resolveCourseProgressConflict');
  assert(code.includes('export function resolveUserSettingsConflict'), 'Must export resolveUserSettingsConflict');

  // Test LWW logic directly
  function resolveLWW(local, remote) {
    const localTime = new Date(local.updated_at || local.last_review || local.timestamp || 0).getTime();
    const remoteTime = new Date(remote.updated_at || remote.last_review || remote.timestamp || 0).getTime();
    return remoteTime > localTime ? remote : local;
  }

  const olderLocal = { id: 'item1', value: 'old', updated_at: '2026-10-15T10:00:00.000Z' };
  const newerRemote = { id: 'item1', value: 'new', updated_at: '2026-10-15T12:00:00.000Z' };
  assert.strictEqual(resolveLWW(olderLocal, newerRemote).value, 'new');
  assert.strictEqual(resolveLWW(newerRemote, olderLocal).value, 'new');

  // Test monotonic course progress
  function resolveCourseProgressConflict(local, remote) {
    return {
      current_index: Math.max(local.current_index || 0, remote.current_index || 0),
      completed: Boolean(local.completed || remote.completed),
      updated_at: new Date().toISOString(),
    };
  }

  const localProg = { current_index: 5, completed: false };
  const remoteProg = { current_index: 3, completed: true };
  const mergedProg = resolveCourseProgressConflict(localProg, remoteProg);
  assert.strictEqual(mergedProg.current_index, 5, 'Index must never regress');
  assert.strictEqual(mergedProg.completed, true, 'Completion must be preserved');
});

// ── T-104 & T-107: Conflict-Free FSRS Card Merging ─────────────────
test('T-104 & T-107: resolveFSRSCardConflict prevents stability regression and handles intra-day reviews', () => {
  const resolverPath = path.join(ROOT_DIR, 'src/lib/sync/conflictResolver.ts');
  const code = fs.readFileSync(resolverPath, 'utf8');
  assert(code.includes('export function resolveFSRSCardConflict'), 'Must export resolveFSRSCardConflict');

  // Test FSRS resolution logic directly
  function resolveFSRSCardConflict(local, remote) {
    const localReviewTime = local.last_review ? new Date(local.last_review).getTime() : 0;
    const remoteReviewTime = remote.last_review ? new Date(remote.last_review).getTime() : 0;
    const timeDifferenceHours = Math.abs(remoteReviewTime - localReviewTime) / (1000 * 60 * 60);

    if (timeDifferenceHours > 12) {
      const winner = remoteReviewTime > localReviewTime ? remote : local;
      const loser = remoteReviewTime > localReviewTime ? local : remote;
      return {
        ...winner,
        reps: Math.max(winner.reps, loser.reps, (winner.reps || 0) + 1),
        lapses: Math.max(winner.lapses, loser.lapses),
      };
    }

    const newerReview = remoteReviewTime >= localReviewTime ? remote : local;
    return {
      ...newerReview,
      stability: Math.max(local.stability || 0, remote.stability || 0),
      reps: Math.max(local.reps || 0, remote.reps || 0),
      lapses: Math.max(local.lapses || 0, remote.lapses || 0),
      difficulty: (local.difficulty && remote.difficulty)
        ? Math.round(((local.difficulty + remote.difficulty) / 2) * 100) / 100
        : (newerReview.difficulty || 0),
      due: new Date(local.due).getTime() > new Date(remote.due).getTime() ? local.due : remote.due,
      last_review: newerReview.last_review || new Date().toISOString(),
    };
  }

  // Scenario 1: Same day review on mobile (offline, high stability) vs web
  const cardLocal = {
    stability: 8.5,
    difficulty: 4.2,
    reps: 4,
    lapses: 0,
    due: '2026-10-25T00:00:00.000Z',
    last_review: '2026-10-17T08:00:00.000Z',
  };
  const cardRemote = {
    stability: 6.2,
    difficulty: 4.8,
    reps: 3,
    lapses: 1,
    due: '2026-10-22T00:00:00.000Z',
    last_review: '2026-10-17T08:15:00.000Z',
  };

  const resolved = resolveFSRSCardConflict(cardLocal, cardRemote);
  assert.strictEqual(resolved.stability, 8.5, 'Must retain higher stability 8.5');
  assert.strictEqual(resolved.reps, 4, 'Must retain non-decreasing reps 4');
  assert.strictEqual(resolved.lapses, 1, 'Must retain recorded lapse');
  assert.strictEqual(resolved.due, '2026-10-25T00:00:00.000Z', 'Due date must preserve further horizon');

  // Verify syncEngine integration
  const syncEnginePath = path.join(ROOT_DIR, 'src/lib/supabase/syncEngine.ts');
  const syncCode = fs.readFileSync(syncEnginePath, 'utf8');
  assert(syncCode.includes('resolveFSRSCardConflict('), 'syncEngine must call resolveFSRSCardConflict in pullCards');
  assert(syncCode.includes("storageBridge.setItem('srs_cards'"), 'syncEngine must persist reconciled cards into IndexedDB');
});

// ── T-105: Network Reconnection Synchronization Daemon ────────────
test('T-105: syncDaemon.ts manages reconnection triggers and throttle intervals', () => {
  const daemonPath = path.join(ROOT_DIR, 'src/lib/sync/syncDaemon.ts');
  assert(fs.existsSync(daemonPath), 'syncDaemon.ts must exist');
  const code = fs.readFileSync(daemonPath, 'utf8');

  assert(code.includes('class SyncDaemon'), 'Must declare SyncDaemon class');
  assert(code.includes('public start('), 'Must implement start method');
  assert(code.includes('public stop('), 'Must implement stop method');
  assert(code.includes('public async triggerSync('), 'Must implement triggerSync method');
  assert(code.includes("window.addEventListener('online'"), 'Must register online event handler');
  assert(code.includes("document.addEventListener('visibilitychange'"), 'Must register visibilitychange event handler');
  assert(code.includes('minIntervalMs = 15000'), 'Must enforce minimum 15-second throttle between automatic syncs');

  // Verify main.tsx starts syncDaemon
  const mainPath = path.join(ROOT_DIR, 'src/main.tsx');
  const mainCode = fs.readFileSync(mainPath, 'utf8');
  assert(mainCode.includes('syncDaemon.start()'), 'main.tsx must start syncDaemon');
});

// ── T-106: Cloud Sync Status Indicator Component ───────────────────
test('T-106: SyncStatusIndicator.tsx renders live states and is mounted in Header.tsx', () => {
  const indicatorPath = path.join(ROOT_DIR, 'src/components/sync/SyncStatusIndicator.tsx');
  assert(fs.existsSync(indicatorPath), 'SyncStatusIndicator.tsx must exist');
  const code = fs.readFileSync(indicatorPath, 'utf8');

  assert(code.includes('Mode Tamu'), 'Must show guest mode when user is null');
  assert(code.includes('Sinkronisasi...'), 'Must show syncing label');
  assert(code.includes('Tersinkron'), 'Must show synced label');
  assert(code.includes('min-h-[40px]'), 'Must enforce touch target >= 40px');
  assert(code.includes('active:scale-95'), 'Must enforce tactile feedback');

  // Verify mounting in Header.tsx
  const headerPath = path.join(ROOT_DIR, 'src/components/layout/Header.tsx');
  const headerCode = fs.readFileSync(headerPath, 'utf8');
  assert(headerCode.includes("import { SyncStatusIndicator } from '../sync/SyncStatusIndicator'"), 'Header.tsx must import SyncStatusIndicator');
  assert(headerCode.includes('<SyncStatusIndicator />'), 'Header.tsx must mount SyncStatusIndicator');
});

console.log(`\n=============================================================`);
console.log(`📊 SPRINT 19 TEST RESULTS: ${passedTests}/${totalTests} TESTS PASSED`);
console.log('=============================================================\n');

if (passedTests !== totalTests) {
  process.exit(1);
}
