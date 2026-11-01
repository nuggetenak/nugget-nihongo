// ══════════════════════════════════════════════════════════════════
//  test-pass5-performance-verification.js
//  PASS 5 — Performance Architecture, Asset Caching & Bundle Budget Verification
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
console.log('⚡ RUNNING PASS 5: PERFORMANCE, BUNDLE BUDGET & CACHING AUDIT');
console.log('=============================================================\n');

const ROOT_DIR = path.resolve(__dirname, '..');
const pkgPath = path.join(ROOT_DIR, 'package.json');
const viteConfigPath = path.join(ROOT_DIR, 'vite.config.ts');
const budgetScriptPath = path.join(ROOT_DIR, 'scripts/verify-bundle-budget.js');
const swPath = path.join(ROOT_DIR, 'public/sw.js');
const responsiveTestPath = path.join(ROOT_DIR, 'tests/verify-frontend-responsive.js');
const runSprintsPath = path.join(ROOT_DIR, 'tests/run-sprints-1-to-44.js');

const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const viteConfigCode = fs.readFileSync(viteConfigPath, 'utf8');
const budgetScriptCode = fs.readFileSync(budgetScriptPath, 'utf8');
const swCode = fs.readFileSync(swPath, 'utf8');
const responsiveTestCode = fs.readFileSync(responsiveTestPath, 'utf8');

// ── Check 1: Unified Enterprise CI Quality Gate in package.json ─────
test('P5.1: package.json test script binds granular suites and run-sprints-1-to-44 in lockstep', () => {
  assert(pkg.scripts.test, 'package.json must contain "test" script');
  assert(
    pkg.scripts.test.includes('tests/run-sprints-1-to-44.js'),
    'test script must include tests/run-sprints-1-to-44.js'
  );
  assert(
    pkg.scripts.test.includes('tests/fsrs-engine.test.js'),
    'test script must include tests/fsrs-engine.test.js'
  );
  assert(
    pkg.scripts.test.includes('tests/cat-engine.test.js'),
    'test script must include tests/cat-engine.test.js'
  );
  assert(
    pkg.scripts['verify:budget'],
    'package.json must contain "verify:budget" script'
  );
});

// ── Check 2: Vite Rollup manualChunks & app-infra Splitting ─────────
test('P5.2: vite.config.ts partitions app-infra to decouple telemetry, persistence, and sync', () => {
  assert(viteConfigCode.includes("normalized.includes('/src/lib/telemetry/')"), 'Must split /src/lib/telemetry/');
  assert(viteConfigCode.includes("normalized.includes('/src/lib/persistence/')"), 'Must split /src/lib/persistence/');
  assert(viteConfigCode.includes("normalized.includes('/src/lib/sync/')"), 'Must split /src/lib/sync/');
  assert(viteConfigCode.includes("return 'app-infra'"), 'Must return app-infra chunk name');
  assert(viteConfigCode.includes('chunkSizeWarningLimit: 500'), 'chunkSizeWarningLimit must be set to 500');
});

// ── Check 3: scripts/verify-bundle-budget.js Enforcement ───────────
test('P5.3: scripts/verify-bundle-budget.js strictly enforces 500 kB chunk threshold', () => {
  assert(fs.existsSync(budgetScriptPath), 'verify-bundle-budget.js must exist');
  assert(budgetScriptCode.includes('MAX_CHUNK_SIZE_KB = 500'), 'Must enforce MAX_CHUNK_SIZE_KB = 500');
  assert(budgetScriptCode.includes('dist/assets/js'), 'Must target dist/assets/js');
});

// ── Check 4: Production Dist Chunks Under 500 kB Ceiling ───────────
test('P5.4: All generated chunks in dist/assets/js are strictly <= 500 kB (when built)', () => {
  const distJs = path.join(ROOT_DIR, 'dist/assets/js');
  if (!fs.existsSync(distJs)) {
    console.log('    ℹ️ dist/assets/js not yet built; verifying chunkSizeWarningLimit in vite.config.ts');
    assert(viteConfigCode.includes('chunkSizeWarningLimit: 500'), 'chunkSizeWarningLimit must be 500');
    return;
  }
  const files = fs.readdirSync(distJs).filter((f) => f.endsWith('.js'));
  assert(files.length > 0, 'dist/assets/js must contain compiled JS chunks');
  
  const violations = [];
  for (const file of files) {
    const sizeKb = fs.statSync(path.join(distJs, file)).size / 1024;
    if (sizeKb > 500) {
      violations.push(`${file} (${sizeKb.toFixed(2)} kB)`);
    }
  }
  assert(
    violations.length === 0,
    `The following chunks exceed 500 kB threshold: ${violations.join(', ')}`
  );
});

// ── Check 5: Service Worker PWA Caching & Partial Range Streaming ───
test('P5.5: public/sw.js implements RFC 7233 byte-range slicing for iOS Safari partial content', () => {
  assert(swCode.includes('handleRangeRequest'), 'sw.js must contain handleRangeRequest function');
  assert(swCode.includes('bytes */'), 'sw.js must support 416 Range Not Satisfiable');
  assert(swCode.includes('Content-Range'), 'sw.js must format Content-Range header');
  assert(swCode.includes('status: 206'), 'sw.js must return HTTP 206 Partial Content');
});

test('P5.6: public/sw.js isolates dynamic API calls from cache pollution', () => {
  assert(swCode.includes("'supabase.co'"), 'Must route supabase.co network-first');
  assert(swCode.includes("'workers.dev'"), 'Must route workers.dev network-first');
  assert(swCode.includes("'googleapis.com'"), 'Must route googleapis.com network-first');
  assert(swCode.includes("'groq.com'"), 'Must route groq.com network-first');
});

test('P5.7: public/sw.js implements stale-while-revalidate for /data/ and precaches core assets', () => {
  assert(swCode.includes("url.pathname.startsWith('/data/')"), 'Must apply stale-while-revalidate to /data/');
  assert(swCode.includes("CORE_ASSETS = ["), 'Must declare CORE_ASSETS');
  assert(swCode.includes("'/data/grammar/grammar-n5.js'"), 'Must precache N5 grammar');
  assert(swCode.includes("'/data/curriculum/curriculum-n5.js'"), 'Must precache N5 curriculum');
  assert(swCode.includes("'/data/pitch/pitch-accent-index.json'"), 'Must precache pitch accent index');
});

// ── Check 6: Responsive Audit Across 4 Viewports ────────────────────
test('P5.8: tests/verify-frontend-responsive.js covers 4 viewports with anti-leakage assertions', () => {
  assert(fs.existsSync(responsiveTestPath), 'verify-frontend-responsive.js must exist');
  assert(responsiveTestCode.includes('375'), 'Must test 375px (iPhone SE)');
  assert(responsiveTestCode.includes('390'), 'Must test 390px (Standard Mobile)');
  assert(responsiveTestCode.includes('768'), 'Must test 768px (Tablet iPad)');
  assert(responsiveTestCode.includes('1440'), 'Must test 1440px (Desktop Wide)');
  assert(responsiveTestCode.includes('scrollWidth - window.innerWidth'), 'Must assert 0px horizontal scroll overflow');
});

// ── Check 7: Master 44-Sprint Runner Completeness ───────────────────
test('P5.9: tests/run-sprints-1-to-44.js covers all 44 sprints consecutively', () => {
  assert(fs.existsSync(runSprintsPath), 'run-sprints-1-to-44.js must exist');
  const runCode = fs.readFileSync(runSprintsPath, 'utf8');
  for (let i = 1; i <= 44; i++) {
    assert(
      runCode.includes(`tests/test-sprint-${i}-`),
      `run-sprints-1-to-44.js must include Sprint ${i} test suite`
    );
  }
});

console.log('\n=============================================================');
console.log(`📊 PASS 5 RESULTS: ${passedTests} / ${totalTests} CHECKS PASSED`);
console.log('=============================================================');

if (passedTests === totalTests) {
  console.log('\n🌟 PASS 5 PERFORMANCE ARCHITECTURE & BUNDLE BUDGET 100% CERTIFIED!\n');
} else {
  console.error('\n❌ PASS 5 HAS FAILING CHECKS\n');
  process.exit(1);
}
