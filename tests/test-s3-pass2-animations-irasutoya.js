// ══════════════════════════════════════════════════════════════════
//  test-s3-pass2-animations-irasutoya.js — Siklus III Pass 2 Test Suite
//  End-to-End Micro-Animation Engine & Irasutoya Illustration Architecture
// ══════════════════════════════════════════════════════════════════

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');

console.log('🧪 [Siklus III — Pass 2] Testing Micro-Animations & Irasutoya Visual Architecture...\n');

let passCount = 0;
const totalChecks = 5;

function assert(condition, message) {
  if (!condition) {
    console.error(`  ❌ Assertion Failed: ${message}`);
    process.exit(1);
  }
}

// ──────────────────────────────────────────────────────────────────
// Check 2.1: CSS Keyframes, Animation Utilities & Reduced Motion Kill-Switch
// ──────────────────────────────────────────────────────────────────
console.log('  ▸ Check 2.1: CSS Keyframes, Animation Utilities & Reduced Motion Kill-Switch');

const tailwindConfigPath = path.join(ROOT, 'tailwind.config.js');
const indexCssPath = path.join(ROOT, 'src/index.css');

assert(fs.existsSync(tailwindConfigPath), 'tailwind.config.js must exist');
assert(fs.existsSync(indexCssPath), 'src/index.css must exist');

const tailwindContent = fs.readFileSync(tailwindConfigPath, 'utf8');
const indexCssContent = fs.readFileSync(indexCssPath, 'utf8');

assert(tailwindContent.includes('float-gentle'), 'tailwind.config.js must define float-gentle animation');
assert(tailwindContent.includes('bounce-pop'), 'tailwind.config.js must define bounce-pop animation');
assert(tailwindContent.includes('slot-snap'), 'tailwind.config.js must define slot-snap animation');
assert(tailwindContent.includes('petal-bloom'), 'tailwind.config.js must define petal-bloom animation');
assert(tailwindContent.includes('page-enter'), 'tailwind.config.js must define page-enter animation');
assert(tailwindContent.includes('pulse-subtle'), 'tailwind.config.js must define pulse-subtle animation');

assert(indexCssContent.includes('.card-interactive-lift'), 'src/index.css must define .card-interactive-lift class');
assert(indexCssContent.includes('@media (prefers-reduced-motion: reduce)'), 'src/index.css must define prefers-reduced-motion media query');
assert(indexCssContent.includes('animation-duration: 0.01ms !important'), 'src/index.css must neutralize animation durations in reduced-motion mode');

console.log('    ✓ Check 2.1 Passed: Animation keyframes, classes, and reduced motion kill-switch verified.');
passCount++;

// ──────────────────────────────────────────────────────────────────
// Check 2.2: Authoritative Irasutoya Catalog Architecture
// ──────────────────────────────────────────────────────────────────
console.log('  ▸ Check 2.2: Authoritative Irasutoya Catalog Architecture');

const catalogPath = path.join(ROOT, 'src/lib/assets/irasutoyaCatalog.ts');
assert(fs.existsSync(catalogPath), 'src/lib/assets/irasutoyaCatalog.ts must exist');

const catalogContent = fs.readFileSync(catalogPath, 'utf8');

assert(catalogContent.includes('export const IRASUTOYA_CATALOG'), 'Must export IRASUTOYA_CATALOG');
assert(catalogContent.includes('sensei_teaching'), 'Must define sensei_teaching mascot');
assert(catalogContent.includes('sensei_praise'), 'Must define sensei_praise mascot');
assert(catalogContent.includes('jlpt_n5'), 'Must define jlpt_n5 track asset');
assert(catalogContent.includes('jlpt_n1'), 'Must define jlpt_n1 track asset');
assert(catalogContent.includes('ssw_kaigo'), 'Must define ssw_kaigo sector illustration');
assert(catalogContent.includes('ssw_food_service'), 'Must define ssw_food_service sector illustration');
assert(catalogContent.includes('ssw_construction'), 'Must define ssw_construction sector illustration');
assert(catalogContent.includes('garden_bloom'), 'Must define garden_bloom gamification asset');
assert(catalogContent.includes('daruma_recovery'), 'Must define daruma_recovery asset');
assert(catalogContent.includes('hanko_excellent'), 'Must define hanko_excellent celebration asset');
assert(catalogContent.includes('celebration_kusudama'), 'Must define celebration_kusudama asset');
assert(catalogContent.includes('export function getIrasutoyaAsset'), 'Must export getIrasutoyaAsset resolver function');

console.log('    ✓ Check 2.2 Passed: Irasutoya catalog architecture and taxonomy verified.');
passCount++;

// ──────────────────────────────────────────────────────────────────
// Check 2.3: IrasutoyaImage.tsx Component Resilience & Fallbacks
// ──────────────────────────────────────────────────────────────────
console.log('  ▸ Check 2.3: IrasutoyaImage.tsx Component Resilience & Fallbacks');

const componentPath = path.join(ROOT, 'src/components/common/IrasutoyaImage.tsx');
assert(fs.existsSync(componentPath), 'src/components/common/IrasutoyaImage.tsx must exist');

const componentContent = fs.readFileSync(componentPath, 'utf8');

assert(componentContent.includes('export const IrasutoyaImage'), 'Must export IrasutoyaImage component');
assert(componentContent.includes('loading="lazy"'), 'Must specify lazy loading on images');
assert(componentContent.includes('decoding="async"'), 'Must specify async decoding on images');
assert(componentContent.includes('animate-float-gentle'), 'Must map animateFloat prop to CSS float');
assert(componentContent.includes('animate-bounce-pop'), 'Must map animatePop prop to CSS bounce-pop');
assert(componentContent.includes('role="img"'), 'Must provide semantic role on offline fallback container');
assert(componentContent.includes('aria-label='), 'Must provide accessible aria-label on offline fallback');

console.log('    ✓ Check 2.3 Passed: IrasutoyaImage resilience, accessibility and offline fallbacks verified.');
passCount++;

// ──────────────────────────────────────────────────────────────────
// Check 2.4: End-to-End Page Transitions, Hero & Gamification Integration
// ──────────────────────────────────────────────────────────────────
console.log('  ▸ Check 2.4: End-to-End Page Transitions, Hero & Gamification Integration');

const appTsx = fs.readFileSync(path.join(ROOT, 'src/App.tsx'), 'utf8');
const homePage = fs.readFileSync(path.join(ROOT, 'src/pages/HomePage.tsx'), 'utf8');
const onboardingModal = fs.readFileSync(path.join(ROOT, 'src/components/onboarding/OnboardingModal.tsx'), 'utf8');
const streakModal = fs.readFileSync(path.join(ROOT, 'src/components/gamification/StreakBrokenModal.tsx'), 'utf8');
const starWidget = fs.readFileSync(path.join(ROOT, 'src/components/exercise/StarScrambleWidget.tsx'), 'utf8');

assert(appTsx.includes('animate-page-enter'), 'App.tsx must wrap active tab transitions with animate-page-enter');
assert(homePage.includes('IrasutoyaImage') && homePage.includes('sensei_teaching'), 'HomePage.tsx must integrate sensei_teaching Irasutoya illustration');
assert(homePage.includes('card-interactive-lift'), 'HomePage.tsx must integrate .card-interactive-lift micro-interactions');
assert(onboardingModal.includes('IrasutoyaImage') && onboardingModal.includes('sensei_teaching'), 'OnboardingModal.tsx must integrate Irasutoya sensei illustration');
assert(streakModal.includes('IrasutoyaImage') && streakModal.includes('daruma_recovery'), 'StreakBrokenModal.tsx must integrate daruma_recovery Irasutoya illustration');
assert(starWidget.includes('animate-slot-snap'), 'StarScrambleWidget.tsx must apply animate-slot-snap on slotted tokens');

console.log('    ✓ Check 2.4 Passed: Page enter, hero mascot, streak daruma, and slot-snap animations verified.');
passCount++;

// ──────────────────────────────────────────────────────────────────
// Check 2.5: Kebun Garden & Quiz Celebration Cultural Warmth
// ──────────────────────────────────────────────────────────────────
console.log('  ▸ Check 2.5: Kebun Garden & Quiz Celebration Cultural Warmth');

const kebunPage = fs.readFileSync(path.join(ROOT, 'src/pages/KebunPage.tsx'), 'utf8');
const quizPage = fs.readFileSync(path.join(ROOT, 'src/pages/QuizPage.tsx'), 'utf8');
const quizResultView = fs.readFileSync(path.join(ROOT, 'src/components/quiz/QuizResultView.tsx'), 'utf8');

assert(kebunPage.includes('IrasutoyaImage') && kebunPage.includes('garden_watering'), 'KebunPage.tsx must integrate garden_watering illustration');
assert(kebunPage.includes('garden_bloom') || kebunPage.includes('garden_sprout'), 'KebunPage.tsx must integrate garden bloom/sprout stage illustrations');
assert(kebunPage.includes('card-interactive-lift'), 'KebunPage.tsx must apply card-interactive-lift on plant cards');
assert(quizPage.includes('IrasutoyaImage') && quizPage.includes('hanko_excellent'), 'QuizPage.tsx must display hanko_excellent celebration stamp on correct answer');
assert(quizResultView.includes('IrasutoyaImage'), 'QuizResultView.tsx must integrate IrasutoyaImage for dynamic completion celebrations');
assert(quizResultView.includes('celebration_kusudama') && quizResultView.includes('daruma_recovery'), 'QuizResultView.tsx must feature kusudama and daruma based on score percentage');

console.log('    ✓ Check 2.5 Passed: Kebun garden and Quiz celebration visual warmth verified.');
passCount++;

// ──────────────────────────────────────────────────────────────────
// Final Validation
// ──────────────────────────────────────────────────────────────────
if (passCount === totalChecks) {
  console.log('\n🎉 [Siklus III — Pass 2] All 5 Checks PASSED! Micro-animations & Irasutoya integration fully verified.\n');
  process.exit(0);
} else {
  console.error(`\n❌ [Siklus III — Pass 2] Only ${passCount}/${totalChecks} checks passed.\n`);
  process.exit(1);
}
