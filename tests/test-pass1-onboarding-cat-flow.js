// ══════════════════════════════════════════════════════════════════
//  test-pass1-onboarding-cat-flow.js
//  Verification Suite for Phase 1: Onboarding 3-Step Wizard & Embedded CAT
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
console.log('🍙 RUNNING PHASE 1: ONBOARDING WIZARD & EMBEDDED CAT VERIFICATION');
console.log('=============================================================\n');

const ROOT_DIR = path.resolve(__dirname, '..');
const onboardingPath = path.join(ROOT_DIR, 'src/components/onboarding/OnboardingModal.tsx');
const catModalPath = path.join(ROOT_DIR, 'src/components/cat/CatPlacementModal.tsx');
const appPath = path.join(ROOT_DIR, 'src/App.tsx');

const onboardingCode = fs.readFileSync(onboardingPath, 'utf8');
const catCode = fs.readFileSync(catModalPath, 'utf8');
const appCode = fs.readFileSync(appPath, 'utf8');

// ── Test 1: OnboardingModal 3-Step Structure ──
test('P1.1: OnboardingModal implements 3-step wizard structure', () => {
  assert(onboardingCode.includes('type OnboardingStep = 1 | 2 | 3;'), 'Must define 3-step wizard type');
  assert(onboardingCode.includes('LANGKAH 1: FILOSOFI & SAMBUTAN'), 'Must render Step 1 Welcome & Philosophy');
  assert(onboardingCode.includes('LANGKAH 2: PENENTUAN LEVEL & CAT'), 'Must render Step 2 Goal & Level Placement');
  assert(onboardingCode.includes('LANGKAH 3: TARGET HARIAN & PREFERENSI'), 'Must render Step 3 Daily Goals & Preferences');
});

// ── Test 2: In-Modal Embedded CAT IRT Engine ──
test('P1.2: OnboardingModal embeds CAT IRT diagnostic engine directly in Step 2', () => {
  assert(onboardingCode.includes('buildCATQuestionPool'), 'Must import buildCATQuestionPool');
  assert(onboardingCode.includes('selectNextCATQuestion'), 'Must import selectNextCATQuestion');
  assert(onboardingCode.includes('updateThetaEstimate'), 'Must import updateThetaEstimate');
  assert(onboardingCode.includes('finalizeCATResult'), 'Must import finalizeCATResult');
  assert(onboardingCode.includes('shouldStopCAT'), 'Must import shouldStopCAT');
  assert(onboardingCode.includes('addPlacementResult('), 'Must record CAT result in diagnostic store');
  assert(onboardingCode.includes('playFanfareSfx()'), 'Must play fanfare SFX on CAT completion');
});

// ── Test 3: Onboarding Accessibility & Scroll Lock Contracts ──
test('P1.3: OnboardingModal satisfies accessibility, scroll lock, and Escape contracts', () => {
  assert(onboardingCode.includes('useFocusTrap'), 'Must import and use useFocusTrap');
  assert(onboardingCode.includes('useBodyScrollLock(modalOpen)'), 'Must enforce useBodyScrollLock');
  assert(onboardingCode.includes('role="dialog"'), 'Must specify role="dialog"');
  assert(onboardingCode.includes('aria-modal="true"'), 'Must specify aria-modal="true"');
  assert(onboardingCode.includes('e.preventDefault()'), 'Must call e.preventDefault() on Escape');
  assert(onboardingCode.includes("localStorage.setItem('nn_onboarding_completed'"), 'Must persist completion');
});

// ── Test 4: Daily XP & Preferences Setup ──
test('P1.4: Step 3 configures Daily XP targets (20/50/100) and furigana/romaji toggles', () => {
  assert(onboardingCode.includes('chosenDailyXp === 20') || onboardingCode.includes('xp: 20'), 'Must support 20 XP Santai');
  assert(onboardingCode.includes('chosenDailyXp === 50') || onboardingCode.includes('xp: 50'), 'Must support 50 XP Standar');
  assert(onboardingCode.includes('chosenDailyXp === 100') || onboardingCode.includes('xp: 100'), 'Must support 100 XP Intensif');
  assert(onboardingCode.includes('setDailyGoalXP('), 'Must set dailyGoalXP in store');
  assert(onboardingCode.includes('setShowRomaji('), 'Must set showRomaji in store');
  assert(onboardingCode.includes('setShowFurigana('), 'Must set showFurigana in store');
});

// ── Test 5: CatPlacementModal Fixes (Defects #33-#36) ──
test('P1.5: CatPlacementModal fixes option truncation, routes to home, and shows JLPT projection', () => {
  assert(catCode.includes("setActiveTab('home');"), 'CatPlacementModal must route to home upon apply, not materi');
  assert(!catCode.includes("setActiveTab('materi');"), 'CatPlacementModal must not route to materi');
  assert(catCode.includes('break-words whitespace-normal leading-snug'), 'Option text must not be truncated');
  assert(catCode.includes('Adaptif: 6–12 Soal'), 'Header must indicate adaptive range');
  assert(catCode.includes('Proyeksi JLPT'), 'Must show official JLPT projection');
  assert(catCode.includes('/ 180'), 'Must project on official 180 scale');
});

// ── Test 6: App.tsx Deep Link Guard (Defect #17) ──
test('P1.6: App.tsx guards Onboarding auto-open against deep-links (#study, #materi, etc.)', () => {
  assert(appCode.includes('isRootOrHome'), 'App.tsx must evaluate whether user opened root or home');
  assert(appCode.includes('!hash || hash === \'#\' || hash === \'#home\' || hash === \'#belajar\''), 'Must only open on root/home');
});

console.log(`\n=============================================================`);
console.log(`📊 PHASE 1 RESULTS: ${passedTests} / ${totalTests} CHECKS PASSED`);
console.log(`=============================================================\n`);

if (passedTests !== totalTests) {
  process.exit(1);
}
