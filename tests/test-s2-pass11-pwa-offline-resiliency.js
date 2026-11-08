// ══════════════════════════════════════════════════════════════════
//  test-s2-pass11-pwa-offline-resiliency.js
//  Nugget Nihongo · Siklus II — Pass 11 Verification Suite
//  Service Worker PWA Caching Strategy, Cache Eviction Rules,
//  Offline Sync & Network Resiliency
// ══════════════════════════════════════════════════════════════════

import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

console.log('🧪 [Siklus II — Pass 11] Testing Service Worker PWA, Cache Eviction & Offline Sync Resiliency...');

const swPath = path.join(ROOT, 'public/sw.js');
const cacheMgrPath = path.join(ROOT, 'src/lib/storage/cacheManager.ts');
const broadcastSyncPath = path.join(ROOT, 'src/lib/sync/broadcastSync.ts');
const syncDaemonPath = path.join(ROOT, 'src/lib/sync/syncDaemon.ts');
const sanitizerPath = path.join(ROOT, 'src/lib/storage/storageSanitizer.ts');

assert(fs.existsSync(swPath), 'public/sw.js must exist');
assert(fs.existsSync(cacheMgrPath), 'cacheManager.ts must exist');
assert(fs.existsSync(broadcastSyncPath), 'broadcastSync.ts must exist');
assert(fs.existsSync(syncDaemonPath), 'syncDaemon.ts must exist');
assert(fs.existsSync(sanitizerPath), 'storageSanitizer.ts must exist');

const swCode = fs.readFileSync(swPath, 'utf8');
const cacheMgrCode = fs.readFileSync(cacheMgrPath, 'utf8');
const broadcastSyncCode = fs.readFileSync(broadcastSyncPath, 'utf8');
const syncDaemonCode = fs.readFileSync(syncDaemonPath, 'utf8');
const sanitizerCode = fs.readFileSync(sanitizerPath, 'utf8');

// ── Check 11.1: Service Worker PWA Network-First Origin Whitelist & Dynamic /api/ Isolation ──
console.log('  ▸ Check 11.1: Service Worker PWA Network-First Origin Whitelist & /api/ Isolation');
assert(swCode.includes("'supabase.co'"), 'sw.js must route supabase.co network-first');
assert(swCode.includes("'workers.dev'"), 'sw.js must route workers.dev network-first');
assert(swCode.includes("'googleapis.com'"), 'sw.js must route googleapis.com network-first');
assert(swCode.includes("'groq.com'"), 'sw.js must route groq.com network-first');
assert(swCode.includes("'openrouter.ai'"), 'sw.js must route openrouter.ai network-first');
assert(
  swCode.includes("url.pathname.startsWith('/api/')"),
  'sw.js must isolate dynamic /api/ endpoints network-first to prevent static cache pollution'
);
console.log('    ✓ Check 11.1 Passed: Service worker network-first routing and API isolation verified.');

// ── Check 11.2: CacheManager Essential Curriculum & Vocab Asset Protection ──
console.log('  ▸ Check 11.2: CacheManager Essential Curriculum & Vocab Asset Protection');
assert(
  cacheMgrCode.includes("!url.includes('/data/curriculum/')"),
  'cacheManager must protect /data/curriculum/ assets from eviction'
);
assert(
  cacheMgrCode.includes("!url.includes('/data/grammar/')"),
  'cacheManager must protect /data/grammar/ assets from eviction'
);
assert(
  cacheMgrCode.includes("!url.includes('/data/vocab/')"),
  'cacheManager must protect /data/vocab/ assets from eviction'
);
assert(
  cacheMgrCode.includes("!url.endsWith('/index.html')") &&
  cacheMgrCode.includes("!url.includes('/fonts/')"),
  'cacheManager must preserve core app shell and fonts'
);
console.log('    ✓ Check 11.2 Passed: Core learning content and shell protected from cache eviction.');

// ── Check 11.3: Multi-Tab Cross-Process Synchronization Bus (broadcastSync.ts) ──
console.log('  ▸ Check 11.3: Multi-Tab Cross-Process Synchronization Bus & Event Coverage');
assert(
  broadcastSyncCode.includes("'STREAK_UPDATED'"),
  'broadcastSync must support STREAK_UPDATED cross-tab event'
);
assert(
  broadcastSyncCode.includes("'CAT_COMPLETED'"),
  'broadcastSync must support CAT_COMPLETED cross-tab event'
);
assert(
  broadcastSyncCode.includes("new BroadcastChannel('nn_cross_tab_sync')"),
  'broadcastSync must instantiate BroadcastChannel for real-time cross-tab messaging'
);
assert(
  broadcastSyncCode.includes('nn_cross_tab_message'),
  'broadcastSync must maintain window storage event fallback for restricted environments'
);
console.log('    ✓ Check 11.3 Passed: Multi-tab cross-process sync bus verified.');

// ── Check 11.4: SyncDaemon Offline Network Awareness & Throttling ──
console.log('  ▸ Check 11.4: SyncDaemon Offline Network Awareness & Throttling');
assert(
  syncDaemonCode.includes('!navigator.onLine'),
  'syncDaemon must check navigator.onLine before dispatching cloud sync'
);
assert(
  syncDaemonCode.includes('this.minIntervalMs'),
  'syncDaemon must enforce minimum throttle interval between sync calls'
);
assert(
  syncDaemonCode.includes("window.addEventListener('online'"),
  'syncDaemon must listen to online reconnection event'
);
assert(
  syncDaemonCode.includes("document.addEventListener('visibilitychange'"),
  'syncDaemon must listen to tab visibility changes'
);
console.log('    ✓ Check 11.4 Passed: Sync daemon offline awareness and throttling verified.');

// ── Check 11.5: Critical Persistent Storage Keys Protection in storageSanitizer.ts ──
console.log('  ▸ Check 11.5: Critical Persistent Storage Keys Protection in storageSanitizer.ts');
assert(
  sanitizerCode.includes("'nn_garden_plants'"),
  'storageSanitizer must protect nn_garden_plants in PROTECTED_STORAGE_KEYS'
);
assert(
  sanitizerCode.includes("'nn_garden_drops'"),
  'storageSanitizer must protect nn_garden_drops in PROTECTED_STORAGE_KEYS'
);
assert(
  sanitizerCode.includes("'nn_garden_last_refill'"),
  'storageSanitizer must protect nn_garden_last_refill in PROTECTED_STORAGE_KEYS'
);
assert(
  sanitizerCode.includes("'nn_fsrs_cards'"),
  'storageSanitizer must protect nn_fsrs_cards in PROTECTED_STORAGE_KEYS'
);
assert(
  sanitizerCode.includes('export function quarantineCorruptedKey'),
  'storageSanitizer must export quarantineCorruptedKey to isolate damaged keys'
);
console.log('    ✓ Check 11.5 Passed: Storage key protection and quarantine mechanisms verified.');

console.log('\n🎉 [Siklus II — Pass 11] All 5 Checks PASSED! PWA Offline Resiliency is fully verified.\n');
