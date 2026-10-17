// ══════════════════════════════════════════════════════════════════
//  test-sprint-14-pwa-caching.js — Forensic Unit & Integration Suite
//  Sprint 14: Offline-First Service Worker, PWA & Audio Asset Caching
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
console.log('🧪 RUNNING SPRINT 14 VERIFICATION SUITE: PWA & CACHING ENGINE');
console.log('=============================================================\n');

const ROOT_DIR = path.resolve(__dirname, '..');

// ── T-73: Service Worker Precache Configuration ───────────────────
test('T-73: public/sw.js CORE_ASSETS precache and range audio streaming', () => {
  const swPath = path.join(ROOT_DIR, 'public/sw.js');
  assert(fs.existsSync(swPath), 'public/sw.js must exist');
  const swContent = fs.readFileSync(swPath, 'utf8');

  assert(swContent.includes("'/manifest.json'"), 'CORE_ASSETS must include /manifest.json');
  assert(swContent.includes("'/manifest.webmanifest'"), 'CORE_ASSETS must include /manifest.webmanifest');
  assert(swContent.includes("'/data/fallback/grammar-drills.json'"), 'Must precache grammar-drills.json');
  assert(swContent.includes("'/data/fallback/vocab-drills.json'"), 'Must precache vocab-drills.json');
  assert(swContent.includes("'/data/fallback/quiz-drills.json'"), 'Must precache quiz-drills.json');
  assert(swContent.includes('handleRangeRequest'), 'Must implement handleRangeRequest for HTTP 206 streaming');
});

// ── T-74: Stale-While-Revalidate Data Caching Strategy ─────────────
test('T-74: public/sw.js Stale-While-Revalidate caching pattern for /data/', () => {
  const swPath = path.join(ROOT_DIR, 'public/sw.js');
  const swContent = fs.readFileSync(swPath, 'utf8');

  assert(swContent.includes("url.pathname.startsWith('/data/')"), 'SW must check /data/ pathname');
  assert(swContent.includes('cachedResponse || fetchPromise'), 'SW must return cached response immediately while revalidating');
  assert(swContent.includes('cache.put(req, networkResponse.clone())'), 'SW must update cache with network response');
});

// ── T-75: Web App Manifest Specifications ─────────────────────────
test('T-75: public/manifest.json and manifest.webmanifest PWA compliance', () => {
  const jsonPath = path.join(ROOT_DIR, 'public/manifest.json');
  const webPath = path.join(ROOT_DIR, 'public/manifest.webmanifest');

  assert(fs.existsSync(jsonPath), 'public/manifest.json must exist');
  assert(fs.existsSync(webPath), 'public/manifest.webmanifest must exist');

  const jsonContent = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const webContent = JSON.parse(fs.readFileSync(webPath, 'utf8'));

  for (const manifest of [jsonContent, webContent]) {
    assert.strictEqual(manifest.display, 'standalone', 'PWA display mode must be standalone');
    assert.strictEqual(manifest.start_url, '/', 'start_url must be /');
    assert(manifest.icons && manifest.icons.length >= 4, 'Must define at least 4 icons');

    const has192Maskable = manifest.icons.some(i => i.sizes === '192x192' && i.purpose === 'maskable');
    const has512Maskable = manifest.icons.some(i => i.sizes === '512x512' && i.purpose === 'maskable');
    assert(has192Maskable, 'Must provide 192x192 maskable icon');
    assert(has512Maskable, 'Must provide 512x512 maskable icon');

    assert(manifest.shortcuts && manifest.shortcuts.length >= 3, 'Must define app shortcuts');
  }
});

// ── T-76: Background Sync API Registration & Offline Queue ────────
test('T-76: reviewTelemetry.ts background sync and public/sw.js sync listener', () => {
  const telPath = path.join(ROOT_DIR, 'src/lib/telemetry/reviewTelemetry.ts');
  const telContent = fs.readFileSync(telPath, 'utf8');

  assert(telContent.includes('registerBackgroundSync(): Promise<boolean>'), 'Must declare registerBackgroundSync');
  assert(telContent.includes('flushOfflineQueue(): Promise<number>'), 'Must declare flushOfflineQueue');
  assert(telContent.includes("sync-review-telemetry"), 'Must register sync-review-telemetry tag');
  assert(telContent.includes("storageBridge.setItem('offline_queue'"), 'recordReview must write to offline_queue in IndexedDB');

  const swPath = path.join(ROOT_DIR, 'public/sw.js');
  const swContent = fs.readFileSync(swPath, 'utf8');
  assert(swContent.includes("self.addEventListener('sync'"), 'sw.js must add sync event listener');
  assert(swContent.includes("event.tag === 'sync-review-telemetry'"), 'sw.js must match sync-review-telemetry tag');
  assert(swContent.includes('SYNC_TELEMETRY_TRIGGER'), 'sw.js must post SYNC_TELEMETRY_TRIGGER message to clients');
});

// ── T-77: Offline Status Banner & Connectivity Feedback ───────────
test('T-77: OfflineBanner.tsx accessibility, events, and App.tsx mounting', () => {
  const bannerPath = path.join(ROOT_DIR, 'src/components/ui/OfflineBanner.tsx');
  assert(fs.existsSync(bannerPath), 'OfflineBanner.tsx must exist');
  const bannerContent = fs.readFileSync(bannerPath, 'utf8');

  assert(bannerContent.includes("window.addEventListener('offline'"), 'Must listen for offline event');
  assert(bannerContent.includes("window.addEventListener('online'"), 'Must listen for online event');
  assert(bannerContent.includes('role="status"'), 'Must have role=status for screen readers');
  assert(bannerContent.includes('aria-live="polite"'), 'Must have aria-live=polite');
  assert(bannerContent.includes('Mode Offline Aktif'), 'Must show offline title');
  assert(bannerContent.includes('Koneksi Pulih!'), 'Must show reconnection indicator');

  const appPath = path.join(ROOT_DIR, 'src/App.tsx');
  const appContent = fs.readFileSync(appPath, 'utf8');
  assert(appContent.includes("import { OfflineBanner } from './components/ui/OfflineBanner';"), 'App.tsx must import OfflineBanner');
  assert(appContent.includes('<OfflineBanner />'), 'App.tsx must mount OfflineBanner component');
});

// ── T-78: Cache Storage Quota Manager & LRU Eviction ──────────────
test('T-78: cacheManager.ts quota monitoring and eviction methods', () => {
  const cacheMgrPath = path.join(ROOT_DIR, 'src/lib/storage/cacheManager.ts');
  assert(fs.existsSync(cacheMgrPath), 'cacheManager.ts must exist');
  const cacheMgrContent = fs.readFileSync(cacheMgrPath, 'utf8');

  assert(cacheMgrContent.includes('getStorageQuotaStats(): Promise<StorageQuotaStats>'), 'Must implement getStorageQuotaStats');
  assert(cacheMgrContent.includes('evictOldestCache('), 'Must implement evictOldestCache');
  assert(cacheMgrContent.includes('clearAllCaches(): Promise<boolean>'), 'Must implement clearAllCaches');
  assert(cacheMgrContent.includes('isStorageLow(): Promise<boolean>'), 'Must implement isStorageLow');
  assert(cacheMgrContent.includes('navigator.storage.estimate'), 'Must check navigator.storage.estimate');
  assert(cacheMgrContent.includes('export const cacheManager = new CacheManagerService();'), 'Must export cacheManager singleton');
});

console.log('\n-------------------------------------------------------------');
console.log(`📊 SPRINT 14 VERIFICATION RESULTS: ${passedTests}/${totalTests} TESTS PASSED`);
console.log('-------------------------------------------------------------\n');

if (passedTests !== totalTests) {
  process.exit(1);
} else {
  process.exit(0);
}
