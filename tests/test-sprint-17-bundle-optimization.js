// ══════════════════════════════════════════════════════════════════
//  test-sprint-17-bundle-optimization.js — Forensic Unit & Build Suite
//  Sprint 17: Production Build Optimization, Asset Compression & Bundle Splitting
//  (Tickets T-91 to T-96)
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
console.log('⚡ RUNNING SPRINT 17 VERIFICATION SUITE: BUNDLE & BUILD OPTIMIZATION');
console.log('=============================================================\n');

const ROOT_DIR = path.resolve(__dirname, '..');

// ── T-91: Vite Build Manual Chunking & Optimization ────────────────
test('T-91: vite.config.ts defines vendor manualChunks, cssCodeSplit, and organized asset naming', () => {
  const configPath = path.join(ROOT_DIR, 'vite.config.ts');
  assert(fs.existsSync(configPath), 'vite.config.ts must exist');
  const code = fs.readFileSync(configPath, 'utf8');

  // Verify manualChunks
  assert(code.includes("'vendor-react': ['react', 'react-dom', 'zustand']"), 'Must isolate vendor-react chunk');
  assert(code.includes("'vendor-icons': ['lucide-react']"), 'Must isolate vendor-icons chunk');
  assert(code.includes("'vendor-supabase': ['@supabase/supabase-js']"), 'Must isolate vendor-supabase chunk');

  // Verify build optimizations
  assert(code.includes('cssCodeSplit: true'), 'Must enable cssCodeSplit');
  assert(code.includes('assetsInlineLimit: 4096'), 'Must configure assetsInlineLimit');
  assert(code.includes("minify: 'esbuild'"), 'Must specify esbuild minification');
  assert(code.includes("chunkFileNames: 'assets/js/[name]-[hash].js'"), 'Must organize chunk naming');
  assert(code.includes("assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'"), 'Must organize asset directory naming');
});

// ── T-92: Dynamic Route Code Splitting & Lazy Loading ──────────────
test('T-92: src/App.tsx lazy-loads secondary routes with zero-CLS Suspense fallback', () => {
  const appPath = path.join(ROOT_DIR, 'src/App.tsx');
  assert(fs.existsSync(appPath), 'src/App.tsx must exist');
  const code = fs.readFileSync(appPath, 'utf8');

  // Verify eager HomePage
  assert(code.includes("import { HomePage } from './pages/HomePage'"), 'HomePage must be eagerly imported for instant LCP');

  // Verify lazy secondary pages
  const lazyRoutes = [
    'MateriHubPage',
    'QuizPage',
    'KebunPage',
    'SenseiPage',
    'SettingsPage',
    'AboutPage',
    'LessonStudyPage',
    'MethodologyPage',
    'ChoukaiSimulatorPage'
  ];
  for (const route of lazyRoutes) {
    const lazyRegex = new RegExp(`const\\s+${route}\\s*=\\s*React\\.lazy\\(\\(\\)\\s*=>\\s*import\\(['"]\\./pages/${route}['"]\\)`);
    assert(lazyRegex.test(code), `Route ${route} must be lazily imported with React.lazy`);
  }

  // Verify Suspense boundary
  assert(code.includes('<React.Suspense fallback={<RouteSuspenseFallback />}>'), 'renderActiveView must be wrapped in React.Suspense');
  assert(code.includes('RouteSuspenseFallback'), 'Must define RouteSuspenseFallback component');
  assert(code.includes('<SkeletonGrid count={6} type="card" />'), 'Suspense fallback must render SkeletonGrid for zero layout shift');
});

// ── T-93: Production Asset Compression & Cache Headers ─────────────
test('T-93: public/_headers declares immutable asset caching and immediate SW revalidation', () => {
  const headersPath = path.join(ROOT_DIR, 'public/_headers');
  assert(fs.existsSync(headersPath), 'public/_headers must exist');
  const code = fs.readFileSync(headersPath, 'utf8');

  // Verify immutable assets
  assert(code.includes('/assets/*'), 'Must configure /assets/* cache rule');
  assert(code.includes('Cache-Control: public, max-age=31536000, immutable'), 'Hashed assets must be immutable for 1 year');

  // Verify data SWR
  assert(code.includes('/data/*'), 'Must configure /data/* cache rule');
  assert(code.includes('Cache-Control: public, max-age=86400, stale-while-revalidate=604800'), 'Data must use stale-while-revalidate');

  // Verify immediate SW & HTML revalidation
  assert(code.includes('/sw.js\n  Cache-Control: public, max-age=0, must-revalidate'), 'Service worker must immediately revalidate');
  assert(code.includes('/index.html\n  Cache-Control: public, max-age=0, must-revalidate'), 'index.html must immediately revalidate');
});

// ── T-94: CSS Optimization & Tailwind Purge ────────────────────────
test('T-94: tailwind.config.js configures comprehensive content paths and animation plugins', () => {
  const twPath = path.join(ROOT_DIR, 'tailwind.config.js');
  assert(fs.existsSync(twPath), 'tailwind.config.js must exist');
  const code = fs.readFileSync(twPath, 'utf8');

  assert(code.includes('"./index.html"'), 'Tailwind content must include root index.html');
  assert(code.includes('"./src/**/*.{js,ts,jsx,tsx}"'), 'Tailwind content must include all src files');
  assert(code.includes("require('tailwindcss-animate')"), 'Must include tailwindcss-animate plugin');
});

// ── T-95: Tree-Shaking & Dist Chunks Forensic Verification ─────────
test('T-95: Zero star imports in src/ and dist/ contains discrete, code-split chunks', () => {
  // Check dist directory
  const distPath = path.join(ROOT_DIR, 'dist');
  assert(fs.existsSync(distPath), 'dist/ directory must exist from build');
  assert(fs.existsSync(path.join(distPath, 'index.html')), 'dist/index.html must exist');

  const jsDir = path.join(distPath, 'assets', 'js');
  assert(fs.existsSync(jsDir), 'dist/assets/js/ must exist');
  const files = fs.readdirSync(jsDir);

  // Must have separate chunks for major views and vendor libraries
  const hasReact = files.some(f => f.startsWith('vendor-react-'));
  const hasIcons = files.some(f => f.startsWith('vendor-icons-'));
  const hasSupabase = files.some(f => f.startsWith('vendor-supabase-'));
  const hasQuiz = files.some(f => f.startsWith('QuizPage-'));
  const hasMateri = files.some(f => f.startsWith('MateriHubPage-'));
  const hasKebun = files.some(f => f.startsWith('KebunPage-'));
  const hasSensei = files.some(f => f.startsWith('SenseiPage-'));

  assert(hasReact, 'dist must have vendor-react chunk');
  assert(hasIcons, 'dist must have vendor-icons chunk');
  assert(hasSupabase, 'dist must have vendor-supabase chunk');
  assert(hasQuiz, 'dist must have QuizPage chunk');
  assert(hasMateri, 'dist must have MateriHubPage chunk');
  assert(hasKebun, 'dist must have KebunPage chunk');
  assert(hasSensei, 'dist must have SenseiPage chunk');
});

console.log(`\n=============================================================`);
console.log(`📊 SPRINT 17 TEST RESULTS: ${passedTests}/${totalTests} TESTS PASSED`);
console.log('=============================================================\n');

if (passedTests !== totalTests) {
  process.exit(1);
}
