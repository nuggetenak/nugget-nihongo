// ══════════════════════════════════════════════════════════════════
//  test-pass5-modals-error-boundaries.js — Phase 5 Regression Suite
//  Verifies Central GlobalModalManager, Error Boundaries, Dialogs & WCAG AA
//  Defects #85, #91, #109, #110, #111, #112, #113, #114, #115
// ══════════════════════════════════════════════════════════════════

import fs from 'fs';
import path from 'path';
import assert from 'assert';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

console.log('\n🛡️  [Phase 5 Verification] GlobalModalManager, Error Boundaries & WCAG AA...\n');

// ── Check 1: ResetConfirmationModal hold-to-confirm & semantic styling ────────
console.log('  Testing Check 1: ResetConfirmationModal hold timer & colors...');
const resetModalSource = fs.readFileSync(path.join(projectRoot, 'src/components/modals/ResetConfirmationModal.tsx'), 'utf8');

assert(
  resetModalSource.includes('holdCompleted') &&
  resetModalSource.includes('setHoldCompleted(true)') &&
  !resetModalSource.includes('bg-red-950/40'),
  'FAIL Check 1: ResetConfirmationModal must preserve hold completion state and remove dark-island classes'
);
console.log('  ✔ [PASS] Check 1: ResetConfirmationModal hold timer & semantic styling verified');

// ── Check 2: InteractiveSentence dead state removal & scroll lock ─────────────
console.log('  Testing Check 2: InteractiveSentence ergonomics & dead state cleanup...');
const interactiveSource = fs.readFileSync(path.join(projectRoot, 'src/components/common/InteractiveSentence.tsx'), 'utf8');

assert(
  !interactiveSource.includes('popoverPos') &&
  !interactiveSource.includes('ExternalLink') &&
  interactiveSource.includes('useBodyScrollLock(!!selectedToken)') &&
  interactiveSource.includes('before:-inset-1'),
  'FAIL Check 2: InteractiveSentence must eliminate popoverPos, lock scroll, and expand touch bounds'
);
console.log('  ✔ [PASS] Check 2: InteractiveSentence ergonomics & cleanup verified');

// ── Check 3: DetailModal scroll lock & valid Tailwind classes ─────────────────
console.log('  Testing Check 3: DetailModal scroll lock & CSS validation...');
const detailModalSource = fs.readFileSync(path.join(projectRoot, 'src/components/ui/DetailModal.tsx'), 'utf8');

assert(
  detailModalSource.includes('useBodyScrollLock(!!item)') &&
  detailModalSource.includes('pb-[calc(1.5rem+env(safe-area-inset-bottom))]') &&
  !detailModalSource.includes('py-0.2') &&
  detailModalSource.includes('py-0.5'),
  'FAIL Check 3: DetailModal must implement body scroll lock, safe-area padding, and valid py-0.5'
);
console.log('  ✔ [PASS] Check 3: DetailModal scroll lock & CSS validation verified');

// ── Check 4: ModalErrorBoundary auto-pop on close & valid classes ─────────────
console.log('  Testing Check 4: ModalErrorBoundary crash loop guard & classes...');
const modalErrorSource = fs.readFileSync(path.join(projectRoot, 'src/components/ui/ModalErrorBoundary.tsx'), 'utf8');

assert(
  modalErrorSource.includes('useModalStore.getState().closeModal()') &&
  modalErrorSource.includes('text-appText-bright') &&
  modalErrorSource.includes('text-appText-muted') &&
  !modalErrorSource.includes('text-text-dim'),
  'FAIL Check 4: ModalErrorBoundary must pop modal on close and use standard appText classes'
);
console.log('  ✔ [PASS] Check 4: ModalErrorBoundary crash loop guard verified');

// ── Check 5: RouteErrorBoundary store tab reset & semantic colors ─────────────
console.log('  Testing Check 5: RouteErrorBoundary activeTab reset & contrast...');
const routeErrorSource = fs.readFileSync(path.join(projectRoot, 'src/components/ui/RouteErrorBoundary.tsx'), 'utf8');

assert(
  routeErrorSource.includes("useAppStore.getState().setActiveTab('home')") &&
  !routeErrorSource.includes('bg-red-950/60') &&
  routeErrorSource.includes('text-accent-hot'),
  'FAIL Check 5: RouteErrorBoundary must reset activeTab to home and use semantic tokens'
);
console.log('  ✔ [PASS] Check 5: RouteErrorBoundary reset & contrast verified');

// ── Check 6: OfflineBanner timer ref cleanup & WCAG AA contrast ───────────────
console.log('  Testing Check 6: OfflineBanner timer leak cleanup & WCAG AA contrast...');
const offlineBannerSource = fs.readFileSync(path.join(projectRoot, 'src/components/ui/OfflineBanner.tsx'), 'utf8');

assert(
  offlineBannerSource.includes('reconnectTimerRef') &&
  (offlineBannerSource.includes('text-amber-900 dark:text-amber-400') || offlineBannerSource.includes('text-amber-950 dark:text-amber-300')) &&
  (offlineBannerSource.includes('text-emerald-900 dark:text-emerald-400') || offlineBannerSource.includes('text-emerald-950 dark:text-emerald-300')) &&
  offlineBannerSource.includes('min-w-[40px] min-h-[40px]'),
  'FAIL Check 6: OfflineBanner must clean up timer, guarantee AA contrast, and provide >=40px touch targets'
);
console.log('  ✔ [PASS] Check 6: OfflineBanner timer & WCAG AA contrast verified');

// ── Check 7: BudouxText, UpdatePromptToast & SyncStatusPill ───────────────────
console.log('  Testing Check 7: BudouxText, UpdatePromptToast & SyncStatusPill...');
const budouxSource = fs.readFileSync(path.join(projectRoot, 'src/components/ui/BudouxText.tsx'), 'utf8');
const updateToastSource = fs.readFileSync(path.join(projectRoot, 'src/components/ui/UpdatePromptToast.tsx'), 'utf8');
const syncPillSource = fs.readFileSync(path.join(projectRoot, 'src/components/ui/SyncStatusPill.tsx'), 'utf8');

assert(
  budouxSource.includes('break-keep') && !budouxSource.includes('word-break-keep-all'),
  'FAIL Check 7.1: BudouxText must use valid break-keep class'
);
assert(
  updateToastSource.includes('bottom-[calc(5.5rem+env(safe-area-inset-bottom))]'),
  'FAIL Check 7.2: UpdatePromptToast must maintain safe-area cushion above BottomNav'
);
assert(
  syncPillSource.includes('text-amber-800 dark:text-amber-300') &&
  syncPillSource.includes('min-w-[40px] min-h-[40px]'),
  'FAIL Check 7.3: SyncStatusPill must satisfy contrast and minimum 40px touch targets'
);
console.log('  ✔ [PASS] Check 7: Shared UI widgets verified');

// ── Check 8: GlobalModalManager initialTab forwarding ─────────────────────────
console.log('  Testing Check 8: GlobalModalManager initialTab forwarding...');
const globalModalSource = fs.readFileSync(path.join(projectRoot, 'src/components/modals/GlobalModalManager.tsx'), 'utf8');

assert(
  globalModalSource.includes('initialTab={entry.props?.initialTab}') &&
  globalModalSource.includes("modalName=\"Pelatih Keigo\"") &&
  globalModalSource.includes("modalName=\"Pelatih Kata Bantu Bilangan\""),
  'FAIL Check 8: GlobalModalManager must forward initialTab prop to Keigo and Counter trainers'
);
console.log('  ✔ [PASS] Check 8: GlobalModalManager prop forwarding verified');

// ── Check 9: KanaChartModal swipe & key alignment ─────────────────────────────
console.log('  Testing Check 9: KanaChartModal swipe & arrow alignment...');
const kanaChartSource = fs.readFileSync(path.join(projectRoot, 'src/components/kana/KanaChartModal.tsx'), 'utf8');

assert(
  kanaChartSource.includes('onSwipeLeft: () => handleNextPractice(false)') &&
  kanaChartSource.includes('onSwipeRight: () => handleNextPractice(true)') &&
  kanaChartSource.includes("ArrowLeft'") &&
  kanaChartSource.includes("ArrowRight'") &&
  kanaChartSource.includes('Belum Hafal (Panah Kiri ←)') &&
  kanaChartSource.includes('Sudah Hafal (Panah Kanan →)'),
  'FAIL Check 9: KanaChartModal must map Left/ArrowLeft to false (Belum) and Right/ArrowRight to true (Hafal)'
);
console.log('  ✔ [PASS] Check 9: KanaChartModal cognitive alignment verified');

console.log('\n🎉 ALL 9 PHASE 5 CHECKS PASSED (100% GREEN)!\n');
