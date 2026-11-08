// ══════════════════════════════════════════════════════════════════
//  test-s5-pass51-bundle-pwa-cache.js — Siklus V Pass 51
//  Klaster 15: Production Hardening, Swarm QA & Zenith Synthesis
//  Production Vite Bundle Optimization & PWA Service Worker Cache
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
console.log('⚡ SIKLUS V PASS 51: PRODUCTION VITE BUNDLE & PWA SERVICE WORKER');
console.log('=============================================================\n');

const ROOT_DIR = path.resolve(__dirname, '..');

// ── 1. Vite Build Configuration & Manual Chunking ─────────────────
test('vite.config.ts configures vendor manualChunks, modular curriculum splits, and asset hashing', () => {
  const configPath = path.join(ROOT_DIR, 'vite.config.ts');
  assert(fs.existsSync(configPath), 'vite.config.ts must exist');
  const code = fs.readFileSync(configPath, 'utf8');

  // Vendor chunk assertions
  assert(code.includes("'vendor-react'"), 'Must declare vendor-react chunk');
  assert(code.includes("'vendor-supabase'"), 'Must declare vendor-supabase chunk');
  assert(code.includes("'vendor-icons'"), 'Must declare vendor-icons chunk');
  assert(code.includes("'vendor-state'"), 'Must declare vendor-state chunk');
  assert(code.includes("'vendor-budoux'"), 'Must declare vendor-budoux chunk');
  assert(code.includes("'vendor-tinybase'"), 'Must declare vendor-tinybase chunk');
  assert(code.includes("'app-infra'"), 'Must declare app-infra chunk');

  // Modular curriculum chunk assertions
  assert(code.includes('curriculum-n5-p1'), 'Must modularize N5 curriculum');
  assert(code.includes('curriculum-n4-p1'), 'Must modularize N4 curriculum');
  assert(code.includes('curriculum-n3-p1'), 'Must modularize N3 curriculum');
  assert(code.includes('curriculum-n2-p1'), 'Must modularize N2 curriculum');
  assert(code.includes('curriculum-n1-p1'), 'Must modularize N1 curriculum');

  // Build flags & asset hashing
  assert(code.includes('cssCodeSplit: true'), 'Must enable cssCodeSplit');
  assert(code.includes('chunkSizeWarningLimit: 500'), 'Must cap chunk warning limit at 500kB');
  assert(code.includes("minify: 'esbuild'"), 'Must use esbuild minifier');
  assert(code.includes("chunkFileNames: 'assets/js/[name]-[hash].js'"), 'Must organize chunk naming with contenthash');
  assert(code.includes("assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'"), 'Must organize assets into typed folders');
});

// ── 2. Service Worker Offline Engine & Caching Strategy ───────────
test('public/sw.js precaches CORE_ASSETS, handles range audio streaming, and manages prompt updates', () => {
  const swPath = path.join(ROOT_DIR, 'public/sw.js');
  assert(fs.existsSync(swPath), 'public/sw.js must exist');
  const code = fs.readFileSync(swPath, 'utf8');

  // Cache version & core precache
  assert(code.includes('const CACHE ='), 'Must declare CACHE version');
  assert(code.includes('const CORE_ASSETS = ['), 'Must define CORE_ASSETS precache array');
  assert(code.includes("'/manifest.webmanifest'"), 'CORE_ASSETS must precache webmanifest');
  assert(code.includes("'/fonts/dm-sans.woff2'"), 'CORE_ASSETS must precache UI fonts');
  assert(code.includes("'/data/grammar/grammar-index.js'"), 'CORE_ASSETS must precache grammar index');
  assert(code.includes("'/data/vocab/vocab-index.js'"), 'CORE_ASSETS must precache vocab index');
  assert(code.includes("'/data/fallback/quiz-drills.json'"), 'CORE_ASSETS must precache offline fallback quiz drills');

  // Audio Range Streaming (HTTP 206 fix for iOS Safari)
  assert(code.includes('async function handleRangeRequest'), 'Must implement handleRangeRequest');
  assert(code.includes("'Content-Range'"), 'Must construct Content-Range headers');
  assert(code.includes('status: 206'), 'Must return HTTP 206 Partial Content');

  // Stale-While-Revalidate caching pattern for /data/
  assert(code.includes("url.pathname.startsWith('/data/')"), 'Must handle /data/ requests');

  // Prompt update flow: only skip waiting when confirmed
  assert(code.includes("e.data.type === 'SKIP_WAITING'"), 'Must handle SKIP_WAITING postMessage');

  // Background sync for telemetry
  assert(code.includes("event.tag === 'sync-review-telemetry'"), 'Must listen for review telemetry sync');
});

// ── 3. PWA Store & Installation Lifecycle ─────────────────────────
test('src/lib/pwa/pwaStore.ts manages install prompts, standalone detection, and worker updates', () => {
  const pwaPath = path.join(ROOT_DIR, 'src/lib/pwa/pwaStore.ts');
  assert(fs.existsSync(pwaPath), 'pwaStore.ts must exist');
  const code = fs.readFileSync(pwaPath, 'utf8');

  assert(code.includes('export const usePwaStore = create<PwaState>'), 'Must export usePwaStore');
  assert(code.includes('promptInstall:'), 'Must implement promptInstall action');
  assert(code.includes('applyUpdate:'), 'Must implement applyUpdate action');
  assert(code.includes('initPwa:'), 'Must implement initPwa action');
  assert(code.includes("window.matchMedia('(display-mode: standalone)')"), 'Must detect standalone display mode');
  assert(code.includes("window.addEventListener('beforeinstallprompt'"), 'Must capture beforeinstallprompt event');
  assert(code.includes("window.addEventListener('appinstalled'"), 'Must handle appinstalled event');
  assert(code.includes("waitingWorker.postMessage({ type: 'SKIP_WAITING' })"), 'applyUpdate must post SKIP_WAITING to waiting worker');
});

// ── 4. Cache-Control Headers & Security Policies ──────────────────
test('public/_headers configures immutable assets, data SWR, and immediate SW revalidation', () => {
  const headersPath = path.join(ROOT_DIR, 'public/_headers');
  assert(fs.existsSync(headersPath), 'public/_headers must exist');
  const code = fs.readFileSync(headersPath, 'utf8');

  assert(code.includes('/assets/*'), 'Must configure /assets/* rule');
  assert(code.includes('max-age=31536000, immutable'), 'Hashed assets must be immutable');
  assert(code.includes('/data/*'), 'Must configure /data/* rule');
  assert(code.includes('stale-while-revalidate='), 'Data assets must use stale-while-revalidate');
  assert(code.includes('/sw.js\n  Cache-Control: public, max-age=0, must-revalidate'), 'Service worker must immediately revalidate');
  assert(code.includes('X-Frame-Options: DENY'), 'Must set X-Frame-Options DENY');
  assert(code.includes('X-Content-Type-Options: nosniff'), 'Must set X-Content-Type-Options nosniff');
});

// ── 5. PWA Manifest Compliance ────────────────────────────────────
test('public/manifest.json and public/manifest.webmanifest are valid and compliant', () => {
  const jsonPath = path.join(ROOT_DIR, 'public/manifest.json');
  const webmanifestPath = path.join(ROOT_DIR, 'public/manifest.webmanifest');
  assert(fs.existsSync(jsonPath), 'manifest.json must exist');
  assert(fs.existsSync(webmanifestPath), 'manifest.webmanifest must exist');

  const jsonManifest = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const webManifest = JSON.parse(fs.readFileSync(webmanifestPath, 'utf8'));

  for (const m of [jsonManifest, webManifest]) {
    assert(m.name.includes('Nugget'), 'Manifest name must identify Nugget Nihongo');
    assert(m.display === 'standalone', 'Display mode must be standalone');
    assert(m.start_url === '/', 'Start URL must be /');
    assert(Array.isArray(m.icons) && m.icons.length >= 2, 'Must provide at least 192px and 512px icons');
    assert(m.icons.some(i => i.purpose === 'maskable'), 'Must provide maskable icons for Android adaptivity');
    assert(Array.isArray(m.shortcuts) && m.shortcuts.length >= 3, 'Must define app shortcuts (Kuis, Materi, Kebun)');
  }
});

console.log(`\n=============================================================`);
console.log(`📊 SIKLUS V PASS 51 TEST RESULTS: ${passedTests}/${totalTests} TESTS PASSED`);
console.log('=============================================================\n');

if (passedTests !== totalTests) {
  process.exit(1);
}
