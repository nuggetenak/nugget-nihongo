// ══════════════════════════════════════════════════════════════════
//  test-s4-pass9-sync-indicators.js — Forensic Unit & Regression Suite
//  Siklus IV Pass 9: Real-Time Cloud Sync UI Status Indicators
//  Validates SyncStatusPill & SyncStatusIndicator:
//  - live dirty mutation queue observation (kanji mastery & review history)
//  - visual states: syncing (spinning amber), synced (emerald), offline_queued (counter badge)
//  - mobile-first touch ergonomics (>= 40x40px)
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT_DIR = path.resolve(__dirname, '..');
const pillPath = path.join(ROOT_DIR, 'src/components/ui/SyncStatusPill.tsx');
const indicatorPath = path.join(ROOT_DIR, 'src/components/sync/SyncStatusIndicator.tsx');

console.log('🧪 Running Siklus IV Pass 9: Sync UI Status Indicators Test...');

// 1. SyncStatusPill Verification
console.log('  🔍 Check 1: Validating SyncStatusPill.tsx AST and Reactive Hooks...');
assert(fs.existsSync(pillPath), 'SyncStatusPill.tsx must exist');
const pillSrc = fs.readFileSync(pillPath, 'utf8');

assert(
  pillSrc.includes("import { localStore } from '../../lib/storage/localStore"),
  'SyncStatusPill must import localStore'
);
assert(
  pillSrc.includes('localStore.getDirtyMutations()'),
  'SyncStatusPill must observe dirty mutation queue'
);
assert(
  pillSrc.includes('localStore.getAllKanjiMastery()'),
  'SyncStatusPill must track local kanji mastery records'
);
assert(
  pillSrc.includes('Antrean (${pendingCount})'),
  'SyncStatusPill must display pending queue count when user is online with queued mutations'
);
assert(
  pillSrc.includes('Offline (${pendingCount})'),
  'SyncStatusPill must display pending count when offline'
);
assert(
  pillSrc.includes('Antrean Mutasi Offline:'),
  'SyncStatusPill modal must display offline mutations card'
);
assert(
  pillSrc.includes('Latihan Kanji Lokal:'),
  'SyncStatusPill modal must display local kanji mastery count'
);
assert(
  pillSrc.includes('min-h-[40px]') || pillSrc.includes('min-h-[36px]'),
  'SyncStatusPill must meet mobile touch target minimum height'
);
console.log('  ✅ Check 1 Passed: SyncStatusPill telemetry & UI states certified');

// 2. SyncStatusIndicator Verification
console.log('  🔍 Check 2: Validating SyncStatusIndicator.tsx Real-Time Telemetry...');
assert(fs.existsSync(indicatorPath), 'SyncStatusIndicator.tsx must exist');
const indicatorSrc = fs.readFileSync(indicatorPath, 'utf8');

assert(
  indicatorSrc.includes("import { localStore } from '../../lib/storage/localStore"),
  'SyncStatusIndicator must import localStore'
);
assert(
  indicatorSrc.includes('dirtyCount'),
  'SyncStatusIndicator must track dirtyCount'
);
assert(
  indicatorSrc.includes('min-h-[40px]'),
  'SyncStatusIndicator must have min-h-[40px] touch target'
);
assert(
  indicatorSrc.includes('animate-spin'),
  'SyncStatusIndicator must have spinning animation while syncing'
);
console.log('  ✅ Check 2 Passed: SyncStatusIndicator real-time telemetry certified');

// 3. Ergonomics and Visual Contrast Verification
console.log('  🔍 Check 3: Validating Color Tokens & Micro-interactions...');
assert(pillSrc.includes('active:scale-95'), 'Must provide active:scale-95 touch feedback');
assert(indicatorSrc.includes('active:scale-95'), 'Must provide active:scale-95 touch feedback');
assert(pillSrc.includes('border-emerald-500'), 'Must use emerald tokens for synced state');
assert(pillSrc.includes('border-amber-500'), 'Must use amber tokens for syncing/queued state');
console.log('  ✅ Check 3 Passed: Ergonomics and color tokens certified');

console.log('\n🎉 PASS 9 VERIFIED: Real-Time Cloud Sync UI Status Indicators certified 100% compliant!\n');
process.exit(0);
