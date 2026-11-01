// ══════════════════════════════════════════════════════════════════
//  test-pass3-modal-lifecycle-verification.js
//  PASS 3 — Modal Lifecycle & State Consolidation Forensic Verification
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
console.log('🏛️ RUNNING PASS 3: MODAL LIFECYCLE & STATE CONSOLIDATION AUDIT');
console.log('=============================================================\n');

const ROOT_DIR = path.resolve(__dirname, '..');
const appPath = path.join(ROOT_DIR, 'src/App.tsx');
const gmmPath = path.join(ROOT_DIR, 'src/components/modals/GlobalModalManager.tsx');
const modalStorePath = path.join(ROOT_DIR, 'src/store/useModalStore.ts');
const appStorePath = path.join(ROOT_DIR, 'src/store/useAppStore.ts');
const authStorePath = path.join(ROOT_DIR, 'src/lib/supabase/authStore.ts');
const pwaStorePath = path.join(ROOT_DIR, 'src/lib/pwa/pwaStore.ts');
const materiHubPath = path.join(ROOT_DIR, 'src/pages/MateriHubPage.tsx');
const detailModalPath = path.join(ROOT_DIR, 'src/components/ui/DetailModal.tsx');
const onboardingPath = path.join(ROOT_DIR, 'src/components/onboarding/OnboardingModal.tsx');

const appCode = fs.readFileSync(appPath, 'utf8');
const gmmCode = fs.readFileSync(gmmPath, 'utf8');
const modalStoreCode = fs.readFileSync(modalStorePath, 'utf8');
const appStoreCode = fs.readFileSync(appStorePath, 'utf8');
const authStoreCode = fs.readFileSync(authStorePath, 'utf8');
const pwaStoreCode = fs.readFileSync(pwaStorePath, 'utf8');
const materiCode = fs.readFileSync(materiHubPath, 'utf8');
const detailCode = fs.readFileSync(detailModalPath, 'utf8');
const onboardingCode = fs.readFileSync(onboardingPath, 'utf8');

// ── Test 1: GlobalModalManager is Single Source of Truth for Root Modal JSX ──
test('P3.1: App.tsx has unmounted static duplicate modal declarations in favor of GlobalModalManager', () => {
  assert(!appCode.includes('<InstallModal />') && !appCode.includes('<InstallModal '), 'App.tsx must not mount static <InstallModal />');
  assert(!appCode.includes('<StreakBrokenModal />') && !appCode.includes('<StreakBrokenModal '), 'App.tsx must not mount static <StreakBrokenModal />');
  assert(!appCode.includes('<AuthModal />') && !appCode.includes('<AuthModal '), 'App.tsx must not mount static <AuthModal />');
  assert(!appCode.includes('<OnboardingModal />') && !appCode.includes('<OnboardingModal '), 'App.tsx must not mount static <OnboardingModal />');
  assert(!appCode.includes('<FeatureGuideModal'), 'App.tsx must not mount static <FeatureGuideModal />');
  assert(!appCode.includes('<KeyboardShortcutsModal'), 'App.tsx must not mount static <KeyboardShortcutsModal />');
  assert(!appCode.includes('<KanaChartModal '), 'App.tsx must not mount static <KanaChartModal />');
  assert(!appCode.includes('<ConjugationModal '), 'App.tsx must not mount static <ConjugationModal />');
  assert(!appCode.includes('<NuanceCompareModal '), 'App.tsx must not mount static <NuanceCompareModal />');
  assert(!appCode.includes('<KotowazaModal '), 'App.tsx must not mount static <KotowazaModal />');
  assert(!appCode.includes('<StudyToolboxModal '), 'App.tsx must not mount static <StudyToolboxModal />');
  assert(!appCode.includes('<CatPlacementModal '), 'App.tsx must not mount static <CatPlacementModal />');
  assert(appCode.includes('<GlobalModalManager />'), 'App.tsx must mount GlobalModalManager');
});

// ── Test 2: GlobalModalManager Modal Registration & Body Scroll Lock ──
test('P3.2: GlobalModalManager registers all 18 modal types, handles onOpenPitch, and locks body scroll', () => {
  const expectedModals = [
    'detail', 'kana', 'conjugation', 'nuance', 'shortcuts',
    'patchNotes', 'kotowaza', 'toolbox', 'catPlacement', 'keigo',
    'counters', 'pitch', 'featureGuide', 'reportIssue', 'auth',
    'install', 'streakBroken', 'onboarding'
  ];
  for (const m of expectedModals) {
    assert(gmmCode.includes(`case '${m}':`), `GlobalModalManager must handle case '${m}'`);
  }
  assert(gmmCode.includes("onOpenPitch={() => openModal('pitch')}"), 'StudyToolboxModal must be wired with onOpenPitch');
  assert(gmmCode.includes('useBodyScrollLock(modalStack.length > 0)'), 'GlobalModalManager must enforce useBodyScrollLock');
});

// ── Test 3: MateriHubPage Exclusive Dispatching ──
test('P3.3: MateriHubPage handleOpenTool dispatches exclusively to useModalStore without dual-store flags', () => {
  assert(materiCode.includes("useModalStore.getState().openModal('pitch')"), 'MateriHubPage must dispatch pitch to useModalStore');
  assert(materiCode.includes("useModalStore.getState().openModal('catPlacement')"), 'MateriHubPage must dispatch catPlacement to useModalStore');
  assert(materiCode.includes("useModalStore.getState().openModal('keigo')"), 'MateriHubPage must dispatch keigo to useModalStore');
  assert(materiCode.includes("useModalStore.getState().openModal('counters')"), 'MateriHubPage must dispatch counters to useModalStore');
  assert(materiCode.includes("useModalStore.getState().openModal('conjugation')"), 'MateriHubPage must dispatch conjugation to useModalStore');
  assert(materiCode.includes("useModalStore.getState().openModal('nuance')"), 'MateriHubPage must dispatch nuance to useModalStore');
  assert(materiCode.includes("useModalStore.getState().openModal('kotowaza')"), 'MateriHubPage must dispatch kotowaza to useModalStore');
  assert(materiCode.includes("useModalStore.getState().openModal('kana')"), 'MateriHubPage must dispatch kana to useModalStore');

  // Verify that legacy boolean selectors are eliminated from MateriHubPage
  assert(!materiCode.includes('openCatPlacement,'), 'MateriHubPage must not consume legacy openCatPlacement selector');
  assert(!materiCode.includes('openKotowaza,'), 'MateriHubPage must not consume legacy openKotowaza selector');
  assert(!materiCode.includes('openKana,'), 'MateriHubPage must not consume legacy openKana selector');
  assert(!materiCode.includes('openConjugation,'), 'MateriHubPage must not consume legacy openConjugation selector');
  assert(!materiCode.includes('openNuance,'), 'MateriHubPage must not consume legacy openNuance selector');
});

// ── Test 4: useAppStore Legacy Wrapper Routing ──
test('P3.4: useAppStore safely routes legacy modal actions directly to useModalStore with target typing', () => {
  assert(appStoreCode.includes("useModalStore.getState().openModal('onboarding')"), 'openOnboarding must route to useModalStore');
  assert(appStoreCode.includes("useModalStore.getState().closeModal('onboarding')"), 'closeOnboarding must target onboarding');
  assert(appStoreCode.includes("useModalStore.getState().openModal('featureGuide')"), 'openFeatureGuide must route to useModalStore');
  assert(appStoreCode.includes("useModalStore.getState().closeModal('featureGuide')"), 'closeFeatureGuide must target featureGuide');
  assert(appStoreCode.includes("useModalStore.getState().openModal('patchNotes')"), 'openPatchNotes must route to useModalStore');
  assert(appStoreCode.includes("useModalStore.getState().closeModal('patchNotes')"), 'closePatchNotes must target patchNotes');
  assert(appStoreCode.includes("useModalStore.getState().openModal('kotowaza')"), 'openKotowaza must route to useModalStore');
  assert(appStoreCode.includes("useModalStore.getState().closeModal('kotowaza')"), 'closeKotowaza must target kotowaza');
  assert(appStoreCode.includes("useModalStore.getState().openModal('toolbox')"), 'openToolbox must route to useModalStore');
  assert(appStoreCode.includes("useModalStore.getState().closeModal('toolbox')"), 'closeToolbox must target toolbox');
  assert(appStoreCode.includes("useModalStore.getState().openModal('catPlacement')"), 'openCatPlacement must route to useModalStore');
  assert(appStoreCode.includes("useModalStore.getState().closeModal('catPlacement')"), 'closeCatPlacement must target catPlacement');
  assert(appStoreCode.includes("useModalStore.getState().openModal('kana')"), 'openKana must route to useModalStore');
  assert(appStoreCode.includes("useModalStore.getState().closeModal('kana')"), 'closeKana must target kana');
  assert(appStoreCode.includes("useModalStore.getState().openModal('conjugation')"), 'openConjugation must route to useModalStore');
  assert(appStoreCode.includes("useModalStore.getState().closeModal('conjugation')"), 'closeConjugation must target conjugation');
  assert(appStoreCode.includes("useModalStore.getState().openModal('nuance')"), 'openNuance must route to useModalStore');
  assert(appStoreCode.includes("useModalStore.getState().closeModal('nuance')"), 'closeNuance must target nuance');
  assert(appStoreCode.includes("useModalStore.getState().openModal('detail'"), 'openDetailModal must route to useModalStore');
  assert(appStoreCode.includes("useModalStore.getState().closeModal('detail')"), 'closeDetailModal must target detail');
  assert(appStoreCode.includes("useModalStore.getState().openModal('streakBroken')"), 'streak break must route to useModalStore');
});

// ── Test 5: External Stores (Auth & PWA) Integration ──
test('P3.5: useAuthStore and usePwaStore synchronize with useModalStore', () => {
  assert(authStoreCode.includes("useModalStore.getState().openModal('auth')"), 'openAuthModal must route to useModalStore');
  assert(authStoreCode.includes("useModalStore.getState().closeModal('auth')"), 'closeAuthModal must route to useModalStore');
  assert(pwaStoreCode.includes("useModalStore.getState().openModal('install')"), 'setShowInstallModal(true) must route to useModalStore');
  assert(pwaStoreCode.includes("useModalStore.getState().closeModal('install')"), 'setShowInstallModal(false) must route to useModalStore');
});

// ── Test 6: App.tsx Route Hydration & PopState Cleanliness ──
test('P3.6: App.tsx decouples initial route hydration from popstate dismiss to protect onboarding mount', () => {
  assert(appCode.includes('const syncRouteFromHash = () => {'), 'App.tsx must define dedicated syncRouteFromHash');
  assert(appCode.includes('syncRouteFromHash();'), 'Initial mount must invoke syncRouteFromHash without popping modals');
  assert(appCode.includes("e.key === 'Escape' && !e.defaultPrevented"), 'Global Escape must respect defaultPrevented');
});

// ── Test 7: Child Modal Keyboard Isolation & Escape preventDefault ──
test('P3.7: Child modals prevent double-pop on Escape', () => {
  assert(detailCode.includes('e.preventDefault()'), 'DetailModal must call e.preventDefault() on Escape');
  assert(onboardingCode.includes('e.preventDefault()'), 'OnboardingModal must call e.preventDefault() on Escape');
  assert(onboardingCode.includes("localStorage.setItem('nn_onboarding_completed'"), 'OnboardingModal must persist completion to localStorage');
});

// ── Test 8: useModalStore Stack Semantics Simulation ──
test('P3.8: useModalStore stack semantics simulate correct multi-tier stacking and popping', () => {
  // Pure JavaScript simulation of useModalStore state operations
  let stack = [];
  const openModal = (type, props) => {
    const top = stack[stack.length - 1];
    if (top && top.type === type) {
      stack = [...stack.slice(0, -1), { type, props }];
      return;
    }
    stack = [...stack, { type, props }];
  };
  const closeModal = (type) => {
    if (!type) {
      stack = stack.slice(0, -1);
      return;
    }
    const lastIndex = stack.map(m => m.type).lastIndexOf(type);
    if (lastIndex === -1) return;
    stack = stack.filter((_, idx) => idx !== lastIndex);
  };

  // 1. Open toolbox
  openModal('toolbox');
  assert.strictEqual(stack.length, 1);
  assert.strictEqual(stack[0].type, 'toolbox');

  // 2. Prevent consecutive duplicates
  openModal('toolbox');
  assert.strictEqual(stack.length, 1, 'Duplicate consecutive modal must not be added');

  // 3. Open pitch on top of toolbox
  openModal('pitch');
  assert.strictEqual(stack.length, 2);
  assert.strictEqual(stack[1].type, 'pitch');

  // 4. Open detail on top of pitch
  openModal('detail', { item: { id: 'test' }, type: 'vocab' });
  assert.strictEqual(stack.length, 3);
  assert.strictEqual(stack[2].type, 'detail');

  // 5. Pop top modal (detail)
  closeModal();
  assert.strictEqual(stack.length, 2);
  assert.strictEqual(stack[stack.length - 1].type, 'pitch');

  // 6. Targeted close of toolbox while pitch is active
  closeModal('toolbox');
  assert.strictEqual(stack.length, 1);
  assert.strictEqual(stack[0].type, 'pitch', 'Targeted close must remove specified modal without disturbing active top');

  // 7. Pop remaining modal
  closeModal();
  assert.strictEqual(stack.length, 0);
});

console.log('\n=============================================================');
if (passedTests === totalTests) {
  console.log(`🏆 ALL ${passedTests}/${totalTests} PASS 3 MODAL LIFECYCLE AUDIT CHECKS PASSED (100%)!`);
} else {
  console.log(`⚠️ ${passedTests}/${totalTests} tests passed.`);
  process.exit(1);
}
console.log('=============================================================\n');
