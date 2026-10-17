// ══════════════════════════════════════════════════════════════════
//  test-sprint-43-performance-cwv.js — Forensic Unit & Integration Suite
//  Sprint 43: Web Performance, Core Web Vitals & Chunk Splitting (Tickets T-231 to T-235)
// ══════════════════════════════════════════════════════════════════

import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

let totalChecks = 0;
let passedChecks = 0;

function check(title, fn) {
  totalChecks++;
  try {
    fn();
    console.log(`  ✅ [PASS] ${title}`);
    passedChecks++;
  } catch (err) {
    console.error(`  ❌ [FAIL] ${title}`);
    console.error(`     Error: ${err.message}`);
  }
}

console.log('====================================================================');
console.log('🧪 SPRINT 43 VERIFICATION: WEB PERFORMANCE, CORE WEB VITALS & CHUNKS');
console.log('====================================================================\n');

// ── T-231: Rollup manualChunks Code-Splitting ──────────────────────
console.log('📦 T-231: Vite Rollup manualChunks Code-Splitting');

check('vite.config.ts configures vendor-react, vendor-supabase, vendor-icons, and vendor-state', () => {
  const config = fs.readFileSync(path.join(ROOT, 'vite.config.ts'), 'utf8');
  assert(config.includes("'vendor-react': ['react', 'react-dom', 'zustand']"), 'Must isolate vendor-react');
  assert(config.includes("'vendor-supabase': ['@supabase/supabase-js']"), 'Must isolate vendor-supabase');
  assert(config.includes("'vendor-icons': ['lucide-react']"), 'Must isolate vendor-icons');
  assert(config.includes("'vendor-state': ['clsx', 'tailwind-merge']"), 'Must isolate vendor-state');
});

// ── T-232: Route & Modal React.lazy() Architecture ─────────────────
console.log('\n📦 T-232: Route & Modal React.lazy() Architecture with Suspense');

check('App.tsx dynamically imports all heavy modals with React.lazy', () => {
  const app = fs.readFileSync(path.join(ROOT, 'src/App.tsx'), 'utf8');
  assert(app.includes("const KanaChartModal = React.lazy("), 'KanaChartModal must be lazy loaded');
  assert(app.includes("const CatPlacementModal = React.lazy("), 'CatPlacementModal must be lazy loaded');
  assert(app.includes("const KotowazaModal = React.lazy("), 'KotowazaModal must be lazy loaded');
  assert(app.includes("const ConjugationModal = React.lazy("), 'ConjugationModal must be lazy loaded');
  assert(app.includes("const NuanceCompareModal = React.lazy("), 'NuanceCompareModal must be lazy loaded');
  assert(app.includes("const StudyToolboxModal = React.lazy("), 'StudyToolboxModal must be lazy loaded');
  assert(app.includes("const PatchNotesModal = React.lazy("), 'PatchNotesModal must be lazy loaded');
});

check('GlobalModalManager.tsx dynamically imports heavy modals with React.lazy', () => {
  const gmm = fs.readFileSync(path.join(ROOT, 'src/components/modals/GlobalModalManager.tsx'), 'utf8');
  assert(gmm.includes("const KanaChartModal = React.lazy("), 'KanaChartModal must be lazy in GlobalModalManager');
  assert(gmm.includes("const CatPlacementModal = React.lazy("), 'CatPlacementModal must be lazy in GlobalModalManager');
  assert(gmm.includes("<React.Suspense"), 'GlobalModalManager must wrap modalStack in React.Suspense');
});

check('PageSkeleton.tsx exists and exports PageSkeleton and ModalSuspenseFallback', () => {
  const psk = path.join(ROOT, 'src/components/ui/PageSkeleton.tsx');
  assert(fs.existsSync(psk), 'PageSkeleton.tsx must exist');
  const code = fs.readFileSync(psk, 'utf8');
  assert(code.includes('export const PageSkeleton'), 'Must export PageSkeleton');
  assert(code.includes('export const ModalSuspenseFallback'), 'Must export ModalSuspenseFallback');
});

check('ModalErrorBoundary wraps children in React.Suspense', () => {
  const eb = fs.readFileSync(path.join(ROOT, 'src/components/ui/ModalErrorBoundary.tsx'), 'utf8');
  assert(eb.includes('<React.Suspense fallback={null}>'), 'ModalErrorBoundary must provide Suspense wrapper');
});

// ── T-233: Core Web Vitals LCP Optimization ────────────────────────
console.log('\n📦 T-233: Core Web Vitals LCP Optimization');

check('index.html establishes font preconnects and image preload for icon-192.png', () => {
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  assert(html.includes('rel="preconnect" href="https://fonts.googleapis.com"'), 'Must preconnect to Google fonts');
  assert(html.includes('rel="preconnect" href="https://fonts.gstatic.com" crossorigin'), 'Must preconnect to gstatic');
  assert(html.includes('rel="preload" as="image" href="/icons/icon-192.png"'), 'Must preload icon-192.png');
});

check('HomePage.tsx hero streak and target render synchronously from cached store state', () => {
  const home = fs.readFileSync(path.join(ROOT, 'src/pages/HomePage.tsx'), 'utf8');
  assert(home.includes('Streak {streak} Hari Aktif'), 'Hero must render cached streak synchronously');
  assert(home.includes('dueCount > 0'), 'Due count evaluated synchronously in useMemo');
});

// ── T-234: Main-Thread INP / TBT Freeze Mitigation ─────────────────
console.log('\n📦 T-234: Main-Thread INP / TBT Freeze Mitigation');

check('SearchPalette debounces search queries with a 150ms timer', () => {
  const sp = fs.readFileSync(path.join(ROOT, 'src/components/ui/SearchPalette.tsx'), 'utf8');
  assert(sp.includes('setTimeout('), 'Must debounce search');
  assert(sp.includes('150);'), 'Must debounce by 150ms');
});

check('searchIndex.ts maintains pre-indexed search keys and non-blocking async query', () => {
  const si = fs.readFileSync(path.join(ROOT, 'src/lib/search/searchIndex.ts'), 'utf8');
  assert(si.includes('searchKey:'), 'Must generate pre-indexed lowercase searchKey');
  assert(si.includes('export async function querySearchPoolAsync'), 'Must export querySearchPoolAsync');
  assert(si.includes('queueMicrotask'), 'Must utilize microtask queue for non-blocking scheduling');
});

// ── T-235: Performance Budget Enforcement (500 kB) ─────────────────
console.log('\n📦 T-235: Performance Budget Enforcement (500 kB)');

check('vite.config.ts enforces strict chunkSizeWarningLimit of 500 kB', () => {
  const config = fs.readFileSync(path.join(ROOT, 'vite.config.ts'), 'utf8');
  assert(config.includes('chunkSizeWarningLimit: 500,'), 'chunkSizeWarningLimit must be 500');
});

check('scripts/verify-bundle-budget.js exists and package.json wires verify:budget script', () => {
  const scriptPath = path.join(ROOT, 'scripts/verify-bundle-budget.js');
  assert(fs.existsSync(scriptPath), 'scripts/verify-bundle-budget.js must exist');

  const pkg = fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8');
  assert(pkg.includes('"verify:budget": "node scripts/verify-bundle-budget.js"'), 'package.json must declare verify:budget script');
});

console.log('\n====================================================================');
console.log(`📊 SPRINT 43 RESULTS: ${passedChecks}/${totalChecks} CHECKS PASSED`);
console.log('====================================================================');

if (passedChecks !== totalChecks) {
  process.exit(1);
}
