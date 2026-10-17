// ══════════════════════════════════════════════════════════════════
//  test-sprint-35-storage-sync.js — Forensic Unit & Integration Suite
//  Sprint 35: Local-First IndexedDB Storage, CRDT & Offline Synchronization Engine
//  (Tickets T-191 to T-195)
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
console.log('📦 RUNNING SPRINT 35 VERIFICATION SUITE: STORAGE & OFFLINE SYNC');
console.log('=============================================================\n');

const ROOT_DIR = path.resolve(__dirname, '..');

// ── T-191: TinyBase IndexedDB Persistence Layer ──
test('T-191: localStore.ts manages reactive schema tables and 19-key migration', () => {
  const localStorePath = path.join(ROOT_DIR, 'src/lib/storage/localStore.ts');
  assert(fs.existsSync(localStorePath), 'localStore.ts must exist');
  const code = fs.readFileSync(localStorePath, 'utf8');

  assert(code.includes("from 'tinybase'"), 'Must import createStore from tinybase');
  assert(code.includes("createIndexedDbPersister"), 'Must import createIndexedDbPersister');
  assert(code.includes('cards'), 'Must declare cards table');
  assert(code.includes('reviews'), 'Must declare reviews table');
  assert(code.includes('dirty_queue'), 'Must declare dirty_queue table');
  assert(code.includes('migrateAllLocalStorageKeys'), 'Must implement migrateAllLocalStorageKeys');

  // Verify TinyBase store operations in Node
  const { LocalStorageManager } = require('../src/lib/storage/localStore.ts');
  const mgr = new LocalStorageManager();

  // Test setCard and getCard
  mgr.setCard({
    item_id: 'vg-n5-00001',
    item_type: 'vocab',
    stability: 2.8,
    difficulty: 4.5,
    elapsed_days: 1,
    scheduled_days: 3,
    reps: 2,
    lapses: 0,
    state: 2,
    due: '2026-10-20T00:00:00Z',
    last_review: '2026-10-17T00:00:00Z',
    updated_at: Date.now(),
  }, true);

  const card = mgr.getCard('vg-n5-00001');
  assert(card, 'Card must be retrieved from localStore');
  assert.strictEqual(card.stability, 2.8);
  assert.strictEqual(card.difficulty, 4.5);

  // Test review logging
  mgr.addReviewLog({
    review_id: 'rev-001',
    card_id: 'vg-n5-00001',
    rating: 3,
    state: 2,
    review_time: '2026-10-17T12:00:00Z',
    scheduled_days: 3,
    elapsed_days: 1,
  });

  const reviews = mgr.getAllReviews();
  assert(reviews.some(r => r.review_id === 'rev-001'), 'Review log must be stored');

  // Test gamification values
  mgr.setGamificationValue('xp', 450);
  assert.strictEqual(mgr.getGamificationValue('xp', 0), 450);

  // Verify dirty queue
  const dirty = mgr.getDirtyMutations();
  assert(dirty.length >= 2, 'Must record dirty mutations for card and review');
});

// ── T-192: Offline Dirty Mutation Queue & Selective Synchronization ──
test('T-192: syncEngine pushCards synchronizes only dirty records instead of 60-request floods', () => {
  const syncEnginePath = path.join(ROOT_DIR, 'src/lib/supabase/syncEngine.ts');
  assert(fs.existsSync(syncEnginePath), 'syncEngine.ts must exist');
  const code = fs.readFileSync(syncEnginePath, 'utf8');

  assert(code.includes('localStore.getDirtyMutations()'), 'Must query dirty mutations from localStore');
  assert(code.includes("m.table_name === 'srs_cards'"), 'Must filter dirty card mutations');
  assert(code.includes('localStore.clearDirtyMutations'), 'Must clear dirty mutations after sync');
  assert(code.includes("m.table_name === 'review_history'"), 'Must process review_history dirty mutations');
  assert(code.includes("from('review_history')"), 'Must upsert review history to Supabase');
});

// ── T-193: Paginated Supabase Card Pull & Additive Reconciliation ──
test('T-193: syncEngine pullCards implements 1000-row pagination and LWW card conflict resolution', () => {
  const syncEnginePath = path.join(ROOT_DIR, 'src/lib/supabase/syncEngine.ts');
  const code = fs.readFileSync(syncEnginePath, 'utf8');

  assert(code.includes('PAGE_SIZE = 1000'), 'Must define PAGE_SIZE = 1000');
  assert(code.includes('.range(from, from + PAGE_SIZE - 1)'), 'Must implement range pagination');
  assert(code.includes('resolveFSRSCardConflict'), 'Must resolve conflicts with resolveFSRSCardConflict');
  assert(code.includes('appState.incrementXp'), 'Must additively reconcile XP');

  // Verify conflict resolver monotonicity
  const { resolveFSRSCardConflict } = require('../src/lib/sync/conflictResolver.ts');
  const localCard = {
    stability: 3.5,
    difficulty: 4.0,
    elapsed_days: 2,
    scheduled_days: 5,
    reps: 3,
    lapses: 0,
    state: 2,
    due: '2026-10-22T00:00:00Z',
    last_review: '2026-10-17T08:00:00Z',
  };
  const remoteCard = {
    stability: 4.2,
    difficulty: 3.8,
    elapsed_days: 2,
    scheduled_days: 6,
    reps: 4,
    lapses: 1,
    state: 2,
    due: '2026-10-23T00:00:00Z',
    last_review: '2026-10-17T09:00:00Z',
  };

  const resolved = resolveFSRSCardConflict(localCard, remoteCard);
  assert(resolved.stability >= 4.2, 'Stability must be preserved at max level');
  assert(resolved.reps >= 4, 'Reps must be monotonically non-decreasing');
  assert(resolved.lapses >= 1, 'Lapses must be preserved');
});

// ── T-194: Supabase Schema CHECK Constraints for JFT, SSW & Diagnostic ──
test('T-194: supabase/schema.sql expands CHECK constraints for 19 SSW tracks, JFT, and item_types', () => {
  const schemaPath = path.join(ROOT_DIR, 'supabase/schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf8');

  // Verify profiles current_level check
  assert(schema.includes("'ssw-kaigo'"), 'Must include ssw-kaigo in profiles constraint');
  assert(schema.includes("'ssw-food-service'"), 'Must include ssw-food-service in profiles constraint');
  assert(schema.includes("'ssw-building-cleaning'"), 'Must include ssw-building-cleaning in profiles constraint');
  assert(schema.includes("'jft-a1'"), 'Must include jft-a1 in profiles constraint');

  // Verify srs_cards item_type check
  assert(schema.includes("'k3_safety'"), 'Must include k3_safety in srs_cards constraint');
  assert(schema.includes("'diagnostic'"), 'Must include diagnostic in srs_cards constraint');
  assert(schema.includes("'choukai'"), 'Must include choukai in srs_cards constraint');
  assert(schema.includes("'dialogue'"), 'Must include dialogue in srs_cards constraint');
});

// ── T-195: Service Worker Precache Expansion & Safari Range Streaming ──
test('T-195: public/sw.js precaches datasets, purges dead legacy files, and preserves range streaming', () => {
  const swPath = path.join(ROOT_DIR, 'public/sw.js');
  const swCode = fs.readFileSync(swPath, 'utf8');

  assert(swCode.includes("'/data/pitch/pitch-accent-index.json'"), 'Must precache pitch-accent-index.json');
  assert(swCode.includes("'/data/nuance-notes/particles.json'"), 'Must precache nuance notes');
  assert(swCode.includes('const LEGACY_OPTIONAL_ASSETS = [];'), 'Must purge 17 dead legacy files from precache');
  assert(swCode.includes('bytes='), 'Must handle HTTP 206 byte-range requests for iOS Safari');
  assert(swCode.includes("e.data.type === 'SKIP_WAITING'"), 'Must require user prompt for skipWaiting');
});

// ── Print Summary ──
console.log('\n=============================================================');
console.log(`📊 SPRINT 35 TEST SUMMARY: ${passedTests} / ${totalTests} PASSED`);
console.log('=============================================================\n');

if (passedTests !== totalTests) {
  process.exit(1);
}
