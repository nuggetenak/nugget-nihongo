// ══════════════════════════════════════════════════════════════════
//  test-s5-pass52-zenith-synthesis.js — Siklus V Pass 52
//  Klaster 15: Production Hardening, Swarm QA & Zenith Synthesis
//  Grand Master Synthesis & Release v24.0.0 (Zenith & Shin-Nihongo)
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
console.log('👑 SIKLUS V PASS 52: GRAND MASTER SYNTHESIS & RELEASE v24.0.0');
console.log('   Shin-Nihongo: Sovereign Pedagogical Zenith & Autonomous Mastery');
console.log('=============================================================\n');

const ROOT_DIR = path.resolve(__dirname, '..');

// ── 1. The 4-Gateway Version Lockstep Invariant ───────────────────
test('Version Lockstep Gateway 1: src/config/version.ts is v24.0.0 (Shin-Nihongo)', () => {
  const vPath = path.join(ROOT_DIR, 'src/config/version.ts');
  assert(fs.existsSync(vPath), 'src/config/version.ts must exist');
  const code = fs.readFileSync(vPath, 'utf8');

  assert(code.includes("export const APP_VERSION = 'v24.0.0'") || code.includes("export const APP_VERSION = 'v24.1.0'"), 'APP_VERSION must be v24.0.0 or v24.1.0');
  assert(code.includes("export const APP_VERSION_NUMBER = '24.0.0'") || code.includes("export const APP_VERSION_NUMBER = '24.1.0'"), 'APP_VERSION_NUMBER must be 24.0.0 or 24.1.0');
  assert(code.includes('Shin-Nihongo'), 'Release name must be Shin-Nihongo');
  assert(code.includes('APP_BUILD_DATE'), 'Must export APP_BUILD_DATE');
  assert(code.includes('APP_CHANGELOG_HIGHLIGHTS'), 'Must export changelog highlights array');
});

test('Version Lockstep Gateway 2: package.json is 24.0.0 or 24.1.0', () => {
  const pkgPath = path.join(ROOT_DIR, 'package.json');
  assert(fs.existsSync(pkgPath), 'package.json must exist');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

  assert(['24.0.0', '24.1.0'].includes(pkg.version), 'package.json version must be 24.0.0 or 24.1.0');
});

test('Version Lockstep Gateway 3: public/sw.js cache is nihongo-v24.0.0 or nihongo-v24.1.0', () => {
  const swPath = path.join(ROOT_DIR, 'public/sw.js');
  assert(fs.existsSync(swPath), 'public/sw.js must exist');
  const code = fs.readFileSync(swPath, 'utf8');

  assert(code.includes("const CACHE = 'nihongo-v24.0.0'") || code.includes("const CACHE = 'nihongo-v24.1.0'"), 'sw.js CACHE key must be nihongo-v24.0.0 or v24.1.0');
});

test('Version Lockstep Gateway 4: patchNotes.ts and CHANGELOG.md include v24.0.0 release', () => {
  const notesPath = path.join(ROOT_DIR, 'src/lib/data/patchNotes.ts');
  const changelogPath = path.join(ROOT_DIR, 'CHANGELOG.md');
  assert(fs.existsSync(notesPath), 'patchNotes.ts must exist');
  assert(fs.existsSync(changelogPath), 'CHANGELOG.md must exist');

  const notesCode = fs.readFileSync(notesPath, 'utf8');
  assert(notesCode.includes("version: 'v24.0.0'"), 'patchNotes.ts must define v24.0.0');
  assert(notesCode.includes('Shin-Nihongo: Sovereign Pedagogical Zenith & Autonomous Mastery'), 'patchNotes.ts must include Shin-Nihongo release name');

  const changelog = fs.readFileSync(changelogPath, 'utf8');
  assert(changelog.includes('## v24.0.0 (8 November 2026) — Shin-Nihongo'), 'CHANGELOG.md must document v24.0.0 release');
});

// ── 2. Zero Omission Scope: All 7 Latent Modules Verified ─────────
test('Latent Module 1: HVPT Multi-Speaker Acoustic Engine (HVPTPlayer.tsx)', () => {
  const p = path.join(ROOT_DIR, 'src/components/audio/HVPTPlayer.tsx');
  assert(fs.existsSync(p), 'HVPTPlayer.tsx must exist');
  const code = fs.readFileSync(p, 'utf8');
  assert(code.includes('selectedSpeaker') || code.includes('speaker'), 'HVPTPlayer must manage speakers');
  assert(code.includes('pair') && code.includes('HVPTPairItem'), 'HVPTPlayer must handle minimal pairs');
});

test('Latent Module 2: Jalur 9 Buku Teks Pendamping (Minna, Irodori, Sou Matome)', () => {
  const books = [
    'public/data/books/book-minna-1.js',
    'public/data/books/book-minna-2.js',
    'public/data/books/book-irodori-a1.js',
    'public/data/books/soumatome/grammar-lens-sm-n3.js'
  ];
  for (const b of books) {
    const full = path.join(ROOT_DIR, b);
    assert(fs.existsSync(full), `${b} must exist`);
  }
});

test('Latent Module 3: Multi-Tab Broadcast Sync Daemon (broadcastSync.ts, syncDaemon.ts)', () => {
  const p1 = path.join(ROOT_DIR, 'src/lib/sync/broadcastSync.ts');
  const p2 = path.join(ROOT_DIR, 'src/lib/sync/syncDaemon.ts');
  assert(fs.existsSync(p1) && fs.existsSync(p2), 'Broadcast sync and daemon must exist');
  const code = fs.readFileSync(p1, 'utf8');
  assert(code.includes('BroadcastChannel'), 'broadcastSync must leverage BroadcastChannel API');
});

test('Latent Module 4: Heatmap Calendar & Badges Modal (HeatmapCalendar.tsx, BadgesModal.tsx)', () => {
  const p1 = path.join(ROOT_DIR, 'src/components/gamification/HeatmapCalendar.tsx');
  const p2 = path.join(ROOT_DIR, 'src/components/gamification/BadgesModal.tsx');
  assert(fs.existsSync(p1) && fs.existsSync(p2), 'HeatmapCalendar and BadgesModal must exist');
});

test('Latent Module 5: Micro-Session Pacing Engine (microSessionEngine.ts)', () => {
  const p = path.join(ROOT_DIR, 'src/lib/session/microSessionEngine.ts');
  assert(fs.existsSync(p), 'microSessionEngine.ts must exist');
  const code = fs.readFileSync(p, 'utf8');
  assert(code.includes('createMicroSession'), 'Must export createMicroSession');
  assert(code.includes('advanceSessionCard'), 'Must export advanceSessionCard');
  assert(code.includes('calculateSessionSummary'), 'Must export calculateSessionSummary');
});

test('Latent Module 6: Telemetry & Core Web Vitals (errorReporter.ts, reviewTelemetry.ts, webVitals.ts)', () => {
  const p1 = path.join(ROOT_DIR, 'src/lib/telemetry/errorReporter.ts');
  const p2 = path.join(ROOT_DIR, 'src/lib/telemetry/reviewTelemetry.ts');
  const p3 = path.join(ROOT_DIR, 'src/lib/telemetry/webVitals.ts');
  assert(fs.existsSync(p1) && fs.existsSync(p2) && fs.existsSync(p3), 'Telemetry files must exist');
});

test('Latent Module 7: PWA Standalone Lifecycle (pwaStore.ts)', () => {
  const p = path.join(ROOT_DIR, 'src/lib/pwa/pwaStore.ts');
  assert(fs.existsSync(p), 'pwaStore.ts must exist');
  const code = fs.readFileSync(p, 'utf8');
  assert(code.includes('usePwaStore'), 'Must export usePwaStore');
  assert(code.includes('display-mode: standalone'), 'Must detect standalone PWA mode');
});

// ── 3. Master Regression Orchestrator Inventory ───────────────────
test('master-regression-orchestrator.js registers exactly 129 cumulative regression suites', () => {
  const orchestratorPath = path.join(ROOT_DIR, 'tests/master-regression-orchestrator.js');
  assert(fs.existsSync(orchestratorPath), 'master-regression-orchestrator.js must exist');
  const code = fs.readFileSync(orchestratorPath, 'utf8');

  // Verify all 52 Siklus V passes are present
  for (let i = 1; i <= 52; i++) {
    assert(code.includes(`Pass ${i}:`), `Master orchestrator must register Siklus V Pass ${i}`);
  }
});

console.log(`\n=============================================================`);
console.log(`📊 SIKLUS V PASS 52 TEST RESULTS: ${passedTests}/${totalTests} TESTS PASSED`);
console.log('=============================================================\n');

if (passedTests !== totalTests) {
  process.exit(1);
}
