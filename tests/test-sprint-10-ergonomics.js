// ══════════════════════════════════════════════════════════════════
//  test-sprint-10-ergonomics.js — Comprehensive Sprint 10 Test Runner
//  Verifies Tickets T-42, T-43, T-44, T-45, T-46, T-47, T-48, T-49, T-50
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const assert = require('assert');

let passedTests = 0;
let totalTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✓ PASS: ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ FAIL: ${name}`);
    console.error(`    ${err.message}`);
    process.exitCode = 1;
  }
}

console.log('\n============================================================');
console.log('🚀 SPRINT 10 VERIFICATION: UI/UX ERGONOMICS, ACCESSIBILITY & SECURITY');
console.log('============================================================\n');

// ──────────────────────────────────────────────────────────────────
// 1. TICKET T-42: Centralized Modal Manager & Stacking Context
// ──────────────────────────────────────────────────────────────────
console.log('--- Ticket T-42: Centralized Modal Manager & Stacking ---');

const modalStorePath = path.join(__dirname, '../src/store/useModalStore.ts');
assert(fs.existsSync(modalStorePath), 'useModalStore.ts must exist');
const modalStoreContent = fs.readFileSync(modalStorePath, 'utf8');

runTest('useModalStore exports modal stack state, openModal, closeModal', () => {
  assert(modalStoreContent.includes('export const useModalStore'), 'Must export useModalStore');
  assert(modalStoreContent.includes('openModal:'), 'Must implement openModal');
  assert(modalStoreContent.includes('closeModal:'), 'Must implement closeModal');
  assert(modalStoreContent.includes('closeAllModals:'), 'Must implement closeAllModals');
  assert(modalStoreContent.includes('modalStack:'), 'Must track modalStack');
});

const globalManagerPath = path.join(__dirname, '../src/components/modals/GlobalModalManager.tsx');
assert(fs.existsSync(globalManagerPath), 'GlobalModalManager.tsx must exist');
const globalManagerContent = fs.readFileSync(globalManagerPath, 'utf8');

runTest('GlobalModalManager renders dynamic stack without portal nesting', () => {
  assert(globalManagerContent.includes('export const GlobalModalManager'), 'Must export GlobalModalManager');
  assert(globalManagerContent.includes('useModalStore()'), 'Must consume useModalStore');
  assert(globalManagerContent.includes('case \'detail\':'), 'Must handle detail modal');
  assert(globalManagerContent.includes('case \'conjugation\':'), 'Must handle conjugation modal');
  assert(globalManagerContent.includes('case \'reportIssue\':'), 'Must handle reportIssue modal');
});

const detailModalPath = path.join(__dirname, '../src/components/ui/DetailModal.tsx');
const detailModalContent = fs.readFileSync(detailModalPath, 'utf8');

runTest('DetailModal retires arbitrary z-[9999] in favor of standardized z-50', () => {
  assert(!detailModalContent.includes('z-[9999]'), 'Must eliminate arbitrary z-[9999]');
  assert(detailModalContent.includes('z-50'), 'Must use standardized z-50');
});

runTest('DetailModal removes nested child modal JSX and delegates to useModalStore', () => {
  assert(!detailModalContent.includes('<ConjugationModal'), 'Must not render <ConjugationModal> inside DetailModal');
  assert(!detailModalContent.includes('<ReportIssueModal'), 'Must not render <ReportIssueModal> inside DetailModal');
  assert(detailModalContent.includes('useModalStore.getState().openModal(\'conjugation\''), 'Must delegate conjugation to useModalStore');
  assert(detailModalContent.includes('useModalStore.getState().openModal(\'reportIssue\''), 'Must delegate reportIssue to useModalStore');
});

// ──────────────────────────────────────────────────────────────────
// 2. TICKET T-43: Browser History & Navigation Stack Overhaul
// ──────────────────────────────────────────────────────────────────
console.log('\n--- Ticket T-43: Browser History & Navigation Stack ---');

const appStorePath = path.join(__dirname, '../src/store/useAppStore.ts');
const appStoreContent = fs.readFileSync(appStorePath, 'utf8');

runTest('useAppStore uses standard history.pushState for tabs and study studio', () => {
  assert(appStoreContent.includes('history.pushState(null, \'\', targetHash)'), 'Must call history.pushState for tabs and study');
  assert(appStoreContent.includes('if (window.location.hash !== targetHash)'), 'Must avoid redundant history push if hash is unchanged');
});

const appPath = path.join(__dirname, '../src/App.tsx');
const appContent = fs.readFileSync(appPath, 'utf8');

runTest('App.tsx popstate listener gracefully dismisses top modal before navigating', () => {
  assert(appContent.includes('window.addEventListener(\'popstate\', handlePopState)'), 'Must listen to popstate events');
  assert(appContent.includes('useModalStore.getState().modalStack.length > 0'), 'Must inspect modalStack on back button');
  assert(appContent.includes('useModalStore.getState().closeModal()'), 'Must dismiss top modal on back navigation');
  assert(appContent.includes('<GlobalModalManager />'), 'App.tsx must mount GlobalModalManager');
});

// ──────────────────────────────────────────────────────────────────
// 3. TICKET T-44: Full-Stack React 18 ErrorBoundary Protection
// ──────────────────────────────────────────────────────────────────
console.log('\n--- Ticket T-44: React 18 ErrorBoundary Protection ---');

const errorBoundaryPath = path.join(__dirname, '../src/components/ui/ErrorBoundary.tsx');
assert(fs.existsSync(errorBoundaryPath), 'ErrorBoundary.tsx must exist');
const errorBoundaryContent = fs.readFileSync(errorBoundaryPath, 'utf8');

runTest('ErrorBoundary implements getDerivedStateFromError and componentDidCatch', () => {
  assert(errorBoundaryContent.includes('static getDerivedStateFromError'), 'Must implement getDerivedStateFromError');
  assert(errorBoundaryContent.includes('componentDidCatch'), 'Must implement componentDidCatch');
  assert(errorBoundaryContent.includes('Muat Ulang Halaman'), 'Must provide session reload button');
});

const mainPath = path.join(__dirname, '../src/main.tsx');
const mainContent = fs.readFileSync(mainPath, 'utf8');

runTest('main.tsx wraps root App component with ErrorBoundary', () => {
  assert(mainContent.includes('<ErrorBoundary>'), 'main.tsx must mount ErrorBoundary wrapper');
  assert(mainContent.includes('<App />'), 'App must be inside ErrorBoundary');
});

// ──────────────────────────────────────────────────────────────────
// 4. TICKET T-45: Universal Modal Accessibility (a11y) & Focus Traps
// ──────────────────────────────────────────────────────────────────
console.log('\n--- Ticket T-45: Modal Accessibility & Focus Traps ---');

const focusTrapPath = path.join(__dirname, '../src/hooks/useFocusTrap.ts');
assert(fs.existsSync(focusTrapPath), 'useFocusTrap.ts must exist');
const focusTrapContent = fs.readFileSync(focusTrapPath, 'utf8');

runTest('useFocusTrap traps Tab / Shift+Tab within active dialog', () => {
  assert(focusTrapContent.includes('export function useFocusTrap'), 'Must export useFocusTrap');
  assert(focusTrapContent.includes('e.key !== \'Tab\''), 'Must handle Tab key');
  assert(focusTrapContent.includes('previousActiveElement'), 'Must restore previous active element');
});

const scrollLockPath = path.join(__dirname, '../src/hooks/useBodyScrollLock.ts');
assert(fs.existsSync(scrollLockPath), 'useBodyScrollLock.ts must exist');
const scrollLockContent = fs.readFileSync(scrollLockPath, 'utf8');

runTest('useBodyScrollLock implements reference-counted scroll locking', () => {
  assert(scrollLockContent.includes('export function useBodyScrollLock'), 'Must export useBodyScrollLock');
  assert(scrollLockContent.includes('lockCount'), 'Must track lockCount');
  assert(scrollLockContent.includes('document.body.style.overflow = \'hidden\''), 'Must lock body scroll');
});

runTest('DetailModal includes accessible dialog semantics', () => {
  assert(detailModalContent.includes('role="dialog"'), 'DetailModal must declare role="dialog"');
  assert(detailModalContent.includes('aria-modal="true"'), 'DetailModal must declare aria-modal="true"');
  assert(detailModalContent.includes('aria-labelledby="detail-modal-title"'), 'DetailModal must declare aria-labelledby');
  assert(detailModalContent.includes('id="detail-modal-title"'), 'DetailModal must identify title element');
});

// ──────────────────────────────────────────────────────────────────
// 5. TICKET T-46: Mobile Touch Physics & BottomNav Occlusion
// ──────────────────────────────────────────────────────────────────
console.log('\n--- Ticket T-46: Mobile Touch Physics & Occlusion Fix ---');

const swipeGesturePath = path.join(__dirname, '../src/components/quiz/useSwipeGesture.ts');
const swipeGestureContent = fs.readFileSync(swipeGesturePath, 'utf8');

runTest('useSwipeGesture enforces 1.5x axis dominance decoupling', () => {
  assert(swipeGestureContent.includes('adx > ady * 1.5'), 'Horizontal swipe must require 1.5x vertical displacement');
  assert(swipeGestureContent.includes('ady > adx * 1.5'), 'Vertical swipe must require 1.5x horizontal displacement');
  assert(swipeGestureContent.includes('wasRecentlySwiped'), 'Must export wasRecentlySwiped for synthetic click suppression');
});

const bottomNavPath = path.join(__dirname, '../src/components/layout/BottomNav.tsx');
const bottomNavContent = fs.readFileSync(bottomNavPath, 'utf8');

runTest('BottomNav hides during dedicated study studio session', () => {
  assert(bottomNavContent.includes('if (activeTab === \'study\')'), 'Must check activeTab === study');
  assert(bottomNavContent.includes('return null;'), 'Must return null during study mode');
});

// ──────────────────────────────────────────────────────────────────
// 6. TICKET T-47: Authoritative AudioService Engine
// ──────────────────────────────────────────────────────────────────
console.log('\n--- Ticket T-47: Authoritative AudioService Engine ---');

const audioServicePath = path.join(__dirname, '../src/lib/audio/audioService.ts');
assert(fs.existsSync(audioServicePath), 'audioService.ts must exist');
const audioServiceContent = fs.readFileSync(audioServicePath, 'utf8');

runTest('AudioService provides clean text sanitization and rate reading', () => {
  assert(audioServiceContent.includes('export const audioService'), 'Must export audioService instance');
  assert(audioServiceContent.includes('public cleanText'), 'Must implement cleanText');
  assert(audioServiceContent.includes('public getSpeechRate'), 'Must implement getSpeechRate');
  assert(audioServiceContent.includes('localStorage.getItem(\'nn_speech_rate\')'), 'Must read user speech rate');
});

runTest('AudioService Web Audio SFX delegations enforce global setting check', () => {
  assert(audioServiceContent.includes('isSfxEnabled()'), 'Must enforce isSfxEnabled before playing sound');
  assert(audioServiceContent.includes('public playSuccess'), 'Must implement playSuccess');
  assert(audioServiceContent.includes('public playError'), 'Must implement playError');
  assert(audioServiceContent.includes('public playFlip'), 'Must implement playFlip');
  assert(audioServiceContent.includes('public playFanfare'), 'Must implement playFanfare');
});

// ──────────────────────────────────────────────────────────────────
// 7. TICKET T-48: Lesson Player Stepper & Infinite XP Elimination
// ──────────────────────────────────────────────────────────────────
console.log('\n--- Ticket T-48: Stepper Integrity & Infinite XP Elimination ---');

const canDoPath = path.join(__dirname, '../src/components/curriculum/player/CanDoCompletionStage.tsx');
const canDoContent = fs.readFileSync(canDoPath, 'utf8');

runTest('CanDoCompletionStage guards XP increment with persistent lesson registry', () => {
  assert(canDoContent.includes('nn_completed_lesson_xp_ids'), 'Must use persistent completed lessons registry');
  assert(canDoContent.includes('!awardedSet.has(lesson.id)'), 'Must check if lesson XP was already awarded');
  assert(canDoContent.includes('incrementXp(50)'), 'Must award 50 XP only once per lesson');
});

// ──────────────────────────────────────────────────────────────────
// 8. TICKET T-49: Settings Security Hardening & Safe Backup Engine
// ──────────────────────────────────────────────────────────────────
console.log('\n--- Ticket T-49: Settings Security Hardening & Backup ---');

const settingsPath = path.join(__dirname, '../src/pages/SettingsPage.tsx');
const settingsContent = fs.readFileSync(settingsPath, 'utf8');

runTest('SettingsPage purges hardcoded base64 OpenRouter and Gemini API keys', () => {
  assert(!settingsContent.includes('QVEuQWI4Uk42SnBjbVlnY1liNmVIX2JSYk9JMnBMU0RZZWpfMHB0ZmRZc2J5WUNqbTY5R1E='), 'Must purge base64 Gemini key');
  assert(!settingsContent.includes('c2stb3ItdjEtNTBhYjZjODkxZTYyNzhjOGNiZmNiMzQzOGUxZDY2ZGE4ZWZiYTg2NmQ2Y2M5NDJjOGI2OWJiOWNlMzZmNjAwMA=='), 'Must purge base64 OpenRouter key');
});

runTest('handleImportBackup validates JSON structure and key allowlist', () => {
  assert(settingsContent.includes('/^(nn_|bunpou_)/.test(k)'), 'Must enforce key allowlist on backup restoration');
  assert(settingsContent.includes('typeof v === \'string\''), 'Must validate string value types');
});

runTest('handleConfirmReset eliminates blocking window.confirm in favor of accessible UI', () => {
  assert(!settingsContent.includes('window.confirm('), 'Must eliminate blocking window.confirm');
  assert(settingsContent.includes('showResetConfirm'), 'Must use non-blocking confirmation state UI');
});

// ──────────────────────────────────────────────────────────────────
// 9. TICKET T-50: Empty State, CLS & Visual Stability Polish
// ──────────────────────────────────────────────────────────────────
console.log('\n--- Ticket T-50: Empty State & CLS Elimination ---');

const kebunPath = path.join(__dirname, '../src/pages/KebunPage.tsx');
const kebunContent = fs.readFileSync(kebunPath, 'utf8');

runTest('KebunPage presents welcoming start action when 0 cards exist', () => {
  assert(kebunContent.includes('fsrsStats.totalCards === 0'), 'Must check for zero total cards');
  assert(kebunContent.includes('Mulai Pelajaran Pertama di Materi Hub'), 'Must offer welcoming start action');
  assert(kebunContent.includes('Latihan Bebas (Semua Kartu Segar)'), 'Must offer free practice when no cards due');
});

const homePath = path.join(__dirname, '../src/pages/HomePage.tsx');
const homeContent = fs.readFileSync(homePath, 'utf8');

runTest('HomePage daily word card specifies min-height constraint to eliminate CLS', () => {
  assert(homeContent.includes('min-h-[180px]'), 'Daily word card container must have min-h-[180px] to prevent layout shift');
});

// ──────────────────────────────────────────────────────────────────
// SUMMARY
// ──────────────────────────────────────────────────────────────────
console.log('\n============================================================');
console.log(`🏁 SPRINT 10 TEST RESULTS: ${passedTests} / ${totalTests} TESTS PASSED`);
console.log('============================================================\n');

if (passedTests === totalTests) {
  console.log('✅ ALL SPRINT 10 ERGONOMICS & ACCESSIBILITY TESTS PASSED PERFECTLY!\n');
  process.exit(0);
} else {
  console.error(`❌ ${totalTests - passedTests} SPRINT 10 TESTS FAILED!`);
  process.exit(1);
}
