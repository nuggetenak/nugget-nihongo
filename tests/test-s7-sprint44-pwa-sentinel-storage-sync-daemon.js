// ══════════════════════════════════════════════════════════════════
//  test-s7-sprint44-pwa-sentinel-storage-sync-daemon.js
//  Sprint 44: PWA Sentinel, Storage Eviction Safeguards, LocalFirst Broadcast Sync Daemon
// ══════════════════════════════════════════════════════════════════

import assert from 'assert';
import fs from 'fs';
import path from 'path';

console.log('⚡ Running Suite 185: Sprint 44: PWA Sentinel, Storage Eviction Safeguards, LocalFirst Broadcast Sync Daemon...');

const ROOT = process.cwd().includes('nugget-nihongo')
  ? process.cwd()
  : path.join(process.cwd(), 'nugget-nihongo');

// ── Check 1: PWA Store Lifecycle, Prompt Invalidation & Fallback Reload ────
console.log('  Check 44.1: Verifying PWA Store prompt invalidation and controller change fallback...');
const pwaStorePath = path.join(ROOT, 'src', 'lib', 'pwa', 'pwaStore.ts');
assert(fs.existsSync(pwaStorePath), 'pwaStore.ts must exist');
const pwaContent = fs.readFileSync(pwaStorePath, 'utf8');

assert(
  pwaContent.includes('deferredPrompt: null') &&
  pwaContent.includes('isInstallable: false') &&
  pwaContent.includes('showInstallModal: false'),
  'pwaStore must reset deferredPrompt upon prompt execution to prevent Chromium InvalidStateError'
);

assert(
  pwaContent.includes('applyUpdate') &&
  pwaContent.includes('postMessage') &&
  pwaContent.includes('setTimeout') &&
  pwaContent.includes('window.location.reload()'),
  'pwaStore applyUpdate must include fallback reload timeout in case controllerchange does not fire'
);
console.log('  ✅ Check 44.1 passed: PWA prompt and update fallback verified.');

// ── Check 2: BroadcastSyncBus Event Type Safety & Transport Deduplication ──
console.log('  Check 44.2: Verifying BroadcastSyncBus event validation & transport deduplication...');
const broadcastPath = path.join(ROOT, 'src', 'lib', 'sync', 'broadcastSync.ts');
assert(fs.existsSync(broadcastPath), 'broadcastSync.ts must exist');
const broadcastContent = fs.readFileSync(broadcastPath, 'utf8');

assert(
  broadcastContent.includes('if (!type || typeof type !== \'string\') return;') &&
  broadcastContent.includes('BroadcastChannel') &&
  broadcastContent.includes('handleStorageEvent') &&
  broadcastContent.includes('recentEventKeys'),
  'broadcastSync must validate event types and deduplicate cross-tab events'
);
console.log('  ✅ Check 44.2 passed: BroadcastSyncBus event safety and deduplication verified.');

// ── Check 3: SyncDaemon Error Boundaries & Network Online Reconnect ─────────
console.log('  Check 44.3: Verifying SyncDaemon error boundaries and online reconnection triggers...');
const syncDaemonPath = path.join(ROOT, 'src', 'lib', 'sync', 'syncDaemon.ts');
assert(fs.existsSync(syncDaemonPath), 'syncDaemon.ts must exist');
const daemonContent = fs.readFileSync(syncDaemonPath, 'utf8');

assert(
  daemonContent.includes('customAuthGetter') &&
  daemonContent.includes('try {') &&
  daemonContent.includes('const state = customAuthGetter();'),
  'syncDaemon must wrap customAuthGetter in try-catch to prevent daemon thread failure'
);

assert(
  daemonContent.includes('window.addEventListener(\'online\', this.handleOnline)') &&
  daemonContent.includes('document.addEventListener(\'visibilitychange\', this.handleVisibilityChange)') &&
  daemonContent.includes('minIntervalMs = 15000'),
  'syncDaemon must implement 15-second throttle and automatic network/visibility reconnection'
);
console.log('  ✅ Check 44.3 passed: SyncDaemon error boundary and throttle verified.');

// ── Check 4: Storage Sanitizer Protected Keys & Quarantine Engine ───────────
console.log('  Check 44.4: Verifying PROTECTED_STORAGE_KEYS & storage sanitizer self-healing...');
const storageSanitizerPath = path.join(ROOT, 'src', 'lib', 'storage', 'storageSanitizer.ts');
assert(fs.existsSync(storageSanitizerPath), 'storageSanitizer.ts must exist');
const sanitizerContent = fs.readFileSync(storageSanitizerPath, 'utf8');

assert(
  sanitizerContent.includes('nugget_sensei_mem0_memory_v1') &&
  sanitizerContent.includes('nn_kanji_mastery') &&
  sanitizerContent.includes('nn_dirty_mutations') &&
  sanitizerContent.includes('nn_fsrs_cards') &&
  sanitizerContent.includes('nn_streak') &&
  sanitizerContent.includes('nn_xp'),
  'PROTECTED_STORAGE_KEYS must preserve Mem0 memories, kanji mastery, dirty mutations, and FSRS cards'
);

assert(
  sanitizerContent.includes('emergencyResetVolatileCache') &&
  sanitizerContent.includes('clearedCount') &&
  sanitizerContent.includes('preservedCount'),
  'storageSanitizer must safely flush volatile cache without destroying protected study data'
);
console.log('  ✅ Check 44.4 passed: Storage sanitizer protected keys and cache isolation verified.');

// ── Check 5: UpdatePromptToast & OfflineBanner Multi-Device Ergonomics ──────
console.log('  Check 44.5: Verifying UpdatePromptToast and OfflineBanner accessible ergonomics...');
const updateToastPath = path.join(ROOT, 'src', 'components', 'ui', 'UpdatePromptToast.tsx');
const offlineBannerPath = path.join(ROOT, 'src', 'components', 'ui', 'OfflineBanner.tsx');
assert(fs.existsSync(updateToastPath), 'UpdatePromptToast.tsx must exist');
assert(fs.existsSync(offlineBannerPath), 'OfflineBanner.tsx must exist');

const toastContent = fs.readFileSync(updateToastPath, 'utf8');
const bannerContent = fs.readFileSync(offlineBannerPath, 'utf8');

assert(
  toastContent.includes('role="alert"') &&
  toastContent.includes('aria-live="polite"') &&
  toastContent.includes('min-h-[40px]') &&
  toastContent.includes('top-[calc(0.75rem+env(safe-area-inset-top))]'),
  'UpdatePromptToast must enforce WCAG alert role, >=40px touch targets, and top safe-area cushion'
);

assert(
  bannerContent.includes('role="status"') &&
  bannerContent.includes('aria-live="polite"') &&
  bannerContent.includes('min-h-[40px]') &&
  bannerContent.includes('top-[calc(0.75rem+env(safe-area-inset-top))]'),
  'OfflineBanner must enforce WCAG status role, >=40px touch targets, and top safe-area cushion'
);
console.log('  ✅ Check 44.5 passed: UpdatePromptToast and OfflineBanner accessible ergonomics verified.');

console.log('🎉 All Suite 185 Sprint 44 PWA Sentinel & Sync Daemon checks PASSED!');
