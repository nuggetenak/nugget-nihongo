// ══════════════════════════════════════════════════════════════════
//  test-sprint-42-animations-motion.js — Forensic Unit & Integration Suite
//  Sprint 42: CSS Animation Engine, Layout Stability & Motion Physics (Tickets T-226 to T-230)
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
console.log('🧪 SPRINT 42 VERIFICATION: CSS ANIMATIONS, LAYOUT STABILITY & MOTION');
console.log('====================================================================\n');

// ── T-226: Native Zero-Dependency CSS Animation Engine ─────────────
console.log('📦 T-226: Native Animation Engine for 181 tailwindcss-animate Classes');

check('index.css declares @keyframes enterAnimation with hardware compositing variables', () => {
  const css = fs.readFileSync(path.join(ROOT, 'src/index.css'), 'utf8');
  assert(css.includes('@keyframes enterAnimation'), 'Must define enterAnimation keyframes');
  assert(css.includes('--tw-enter-opacity'), 'Must interpolate --tw-enter-opacity');
  assert(css.includes('--tw-enter-translate-x'), 'Must interpolate --tw-enter-translate-x');
  assert(css.includes('--tw-enter-translate-y'), 'Must interpolate --tw-enter-translate-y');
  assert(css.includes('--tw-enter-scale'), 'Must interpolate --tw-enter-scale');
  assert(css.includes('.animate-in {'), 'Must define .animate-in class');
});

check('index.css declares all animation utility classes and durations used in JSX', () => {
  const css = fs.readFileSync(path.join(ROOT, 'src/index.css'), 'utf8');
  const requiredClasses = [
    '.fade-in',
    '.zoom-in-95',
    '.slide-in-from-bottom',
    '.slide-in-from-bottom-2',
    '.slide-in-from-bottom-4',
    '.slide-in-from-bottom-6',
    '.slide-in-from-left',
    '.slide-in-from-right-4',
    '.slide-in-from-top-2',
    '.duration-150',
    '.duration-200',
    '.duration-300',
    '.duration-500',
  ];
  for (const cls of requiredClasses) {
    assert(css.includes(cls), `index.css must include ${cls}`);
  }
});

check('tailwind.config.js maps keyframes and animations canonically', () => {
  const tw = fs.readFileSync(path.join(ROOT, 'tailwind.config.js'), 'utf8');
  assert(tw.includes('fadeIn:'), 'tailwind.config.js must define fadeIn keyframes');
  assert(tw.includes('zoomIn95:'), 'tailwind.config.js must define zoomIn95 keyframes');
  assert(tw.includes("'fade-in':"), 'tailwind.config.js must define fade-in animation');
  assert(tw.includes("'zoom-in-95':"), 'tailwind.config.js must define zoom-in-95 animation');
});

// ── T-227: Layout Stability (CLS) & Fluid Stage Transitions ────────
console.log('\n📦 T-227: Study Studio Layout Stability & Fluid Stage Transitions');

check('LessonStudyPage has stable container with transition-[min-height] and auto-centering scroll', () => {
  const page = fs.readFileSync(path.join(ROOT, 'src/pages/LessonStudyPage.tsx'), 'utf8');
  assert(page.includes('id="lesson-studio-top"'), 'Stage container must have id="lesson-studio-top"');
  assert(page.includes('transition-[min-height]'), 'Container must have transition-[min-height]');
  assert(page.includes('min-h-[380px] sm:min-h-[420px]'), 'Container must reserve min-h-[380px] sm:min-h-[420px]');
  assert(page.includes("document.getElementById('lesson-studio-top')"), 'Must locate lesson-studio-top on stage change');
  assert(page.includes("scrollIntoView({ behavior: 'smooth', block: 'nearest' })"), 'Must scroll smoothly to studio top');
});

check('LessonStudyPage wraps active stage in keyed cross-fade container', () => {
  const page = fs.readFileSync(path.join(ROOT, 'src/pages/LessonStudyPage.tsx'), 'utf8');
  assert(page.includes('<div key={activeStage} className="animate-in fade-in duration-200">'), 'Stages must be wrapped in keyed cross-fade container');
});

// ── T-228: Native View Transitions API Engine ──────────────────────
console.log('\n📦 T-228: Native View Transitions API Engine for Route Swapping');

check('src/lib/ui/navigation.ts exists and exports transitionTabChange', () => {
  const navPath = path.join(ROOT, 'src/lib/ui/navigation.ts');
  assert(fs.existsSync(navPath), 'src/lib/ui/navigation.ts must exist');
  const code = fs.readFileSync(navPath, 'utf8');
  assert(code.includes('export function transitionTabChange'), 'Must export transitionTabChange');
  assert(code.includes('withViewTransition'), 'Must delegate to withViewTransition');
});

check('index.css declares default View Transition cross-fade keyframes', () => {
  const css = fs.readFileSync(path.join(ROOT, 'src/index.css'), 'utf8');
  assert(css.includes('::view-transition-old(root)'), 'Must style ::view-transition-old(root)');
  assert(css.includes('::view-transition-new(root)'), 'Must style ::view-transition-new(root)');
  assert(css.includes('animation-duration: 200ms;'), 'View transition duration must be 200ms');
});

check('Sidebar, BottomNav, MobileDrawer, and App invoke transitionTabChange', () => {
  const sidebar = fs.readFileSync(path.join(ROOT, 'src/components/layout/Sidebar.tsx'), 'utf8');
  assert(sidebar.includes('transitionTabChange(item.id, setActiveTab)'), 'Sidebar must use transitionTabChange');

  const bottomNav = fs.readFileSync(path.join(ROOT, 'src/components/layout/BottomNav.tsx'), 'utf8');
  assert(bottomNav.includes('transitionTabChange(item.id, setActiveTab)'), 'BottomNav must use transitionTabChange');

  const drawer = fs.readFileSync(path.join(ROOT, 'src/components/layout/MobileDrawer.tsx'), 'utf8');
  assert(drawer.includes('transitionTabChange(tab, setActiveTab)'), 'MobileDrawer must use transitionTabChange');

  const app = fs.readFileSync(path.join(ROOT, 'src/App.tsx'), 'utf8');
  assert(app.includes('transitionTabChange(mapped as any, setActiveTab)'), 'App.tsx must use transitionTabChange in popstate handler');
});

// ── T-229: WCAG 2.1 SC 2.3.3 prefers-reduced-motion Overrides ──────
console.log('\n📦 T-229: WCAG 2.1 SC 2.3.3 prefers-reduced-motion Universal Accessibility');

check('index.css reduces animations and explicitly nullifies continuous decorative animations', () => {
  const css = fs.readFileSync(path.join(ROOT, 'src/index.css'), 'utf8');
  assert(css.includes('@media (prefers-reduced-motion: reduce)'), 'Must define prefers-reduced-motion media block');
  assert(css.includes('animation-duration: 0.01ms !important;'), 'Must collapse animation duration to 0.01ms');
  assert(css.includes('.animate-flame-pulse'), 'Must nullify flame pulse');
  assert(css.includes('.animate-guide-ring'), 'Must nullify guide ring');
  assert(css.includes('.animate-shimmer-flow'), 'Must nullify shimmer flow');
  assert(css.includes('.animate-water-pulse'), 'Must nullify water pulse');
  assert(css.includes('.animate-soft-shake'), 'Must nullify soft shake');
});

check('useAppStore exposes prefersReducedMotion state and setter', () => {
  const store = fs.readFileSync(path.join(ROOT, 'src/store/useAppStore.ts'), 'utf8');
  assert(store.includes('prefersReducedMotion: boolean;'), 'AppState must declare prefersReducedMotion');
  assert(store.includes('setPrefersReducedMotion: (enabled: boolean) => void;'), 'AppState must declare setPrefersReducedMotion');
  assert(store.includes('getInitialReducedMotion()'), 'Store must initialize with getInitialReducedMotion()');
});

check('confetti.ts guards canvas animation against prefers-reduced-motion', () => {
  const confetti = fs.readFileSync(path.join(ROOT, 'src/lib/ui/confetti.ts'), 'utf8');
  assert(confetti.includes("prefers-reduced-motion: reduce"), 'fireConfetti must check prefers-reduced-motion before creating canvas');
});

// ── T-230: GPU-Accelerated 3D Transform & Locked 60fps Flips ───────
console.log('\n📦 T-230: GPU-Accelerated 3D Transform & Locked 60fps Flashcard Flips');

check('index.css defines GPU layer promotion and 3D transform properties', () => {
  const css = fs.readFileSync(path.join(ROOT, 'src/index.css'), 'utf8');
  assert(css.includes('.card-preserve-3d'), 'Must define .card-preserve-3d class');
  assert(css.includes('will-change: transform;'), 'Must specify will-change: transform');
  assert(css.includes('transform: translateZ(0);'), 'Must promote layer to GPU compositor via translateZ(0)');
  assert(css.includes('-webkit-backface-visibility: hidden;'), 'Must specify -webkit-backface-visibility');
});

check('QuizPage and KanaChartModal apply card-preserve-3d for hardware acceleration', () => {
  const quiz = fs.readFileSync(path.join(ROOT, 'src/pages/QuizPage.tsx'), 'utf8');
  assert(quiz.includes('card-preserve-3d'), 'QuizPage flashcard must include card-preserve-3d');

  const kana = fs.readFileSync(path.join(ROOT, 'src/components/kana/KanaChartModal.tsx'), 'utf8');
  assert(kana.includes('card-preserve-3d'), 'KanaChartModal flashcard must include card-preserve-3d');
});

console.log('\n====================================================================');
console.log(`📊 SPRINT 42 RESULTS: ${passedChecks}/${totalChecks} CHECKS PASSED`);
console.log('====================================================================');

if (passedChecks !== totalChecks) {
  process.exit(1);
}
