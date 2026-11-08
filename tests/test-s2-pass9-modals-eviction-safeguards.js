// ══════════════════════════════════════════════════════════════════
//  tests/test-s2-pass9-modals-eviction-safeguards.js
//  Siklus II — Pass 9: Global Modal Error Recovery, Toast Floating Mechanics & Storage Eviction
// ══════════════════════════════════════════════════════════════════

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

console.log('🧪 Starting Siklus II — Pass 9: Global Modal Recovery, Floating Toasts & Eviction Safeguards Verification...\n');

let failedTests = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ ${message}`);
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failedTests++;
  }
}

// ──────────────────────────────────────────────────────────────────
// Check 9.1: Centralized Modal Store & GlobalModalManager Wiring
// ──────────────────────────────────────────────────────────────────
console.log('📋 Check 9.1: StorageEviction Registration in useModalStore & GlobalModalManager');
const modalStorePath = path.join(ROOT_DIR, 'src', 'store', 'useModalStore.ts');
assert(fs.existsSync(modalStorePath), 'src/store/useModalStore.ts exists');
const modalStoreContent = fs.readFileSync(modalStorePath, 'utf8');

assert(
  modalStoreContent.includes("'storageEviction'") &&
  modalStoreContent.includes('storageEviction: { storageUsageMb?: number; storageQuotaMb?: number };'),
  'useModalStore defines storageEviction in ModalType and ModalPropsMap'
);

const globalModalPath = path.join(ROOT_DIR, 'src', 'components', 'modals', 'GlobalModalManager.tsx');
assert(fs.existsSync(globalModalPath), 'src/components/modals/GlobalModalManager.tsx exists');
const globalModalContent = fs.readFileSync(globalModalPath, 'utf8');

assert(
  globalModalContent.includes("const StorageEvictionRecoveryModal = React.lazy(() => import('./StorageEvictionRecoveryModal')") &&
  globalModalContent.includes("case 'storageEviction':") &&
  globalModalContent.includes('modalName="Pemulihan Penyimpanan"'),
  'GlobalModalManager wires StorageEvictionRecoveryModal with lazy chunk loading & ModalErrorBoundary'
);

// ──────────────────────────────────────────────────────────────────
// Check 9.2: StorageEvictionRecoveryModal Polish & Body Scroll Lock
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 9.2: StorageEvictionRecoveryModal Contrast & Scroll Lock');
const evictionModalPath = path.join(ROOT_DIR, 'src', 'components', 'modals', 'StorageEvictionRecoveryModal.tsx');
assert(fs.existsSync(evictionModalPath), 'src/components/modals/StorageEvictionRecoveryModal.tsx exists');
const evictionModalContent = fs.readFileSync(evictionModalPath, 'utf8');

assert(
  evictionModalContent.includes("import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';") &&
  evictionModalContent.includes('useBodyScrollLock(isOpen);'),
  'StorageEvictionRecoveryModal activates useBodyScrollLock(isOpen)'
);

assert(
  evictionModalContent.includes('min-h-[40px] min-w-[40px] rounded-xl hover:bg-surface-2 text-appText-muted hover:text-appText-bright transition-all flex items-center justify-center active:scale-95'),
  'StorageEvictionRecoveryModal close button meets >= 40x40px touch minimum'
);

assert(
  evictionModalContent.includes('text-rose-700 dark:text-rose-400 font-bold shrink-0') &&
  evictionModalContent.includes('text-emerald-700 dark:text-emerald-400 font-bold') &&
  evictionModalContent.includes('text-amber-800 dark:text-amber-400 font-bold'),
  'StorageEvictionRecoveryModal applies WCAG AA dual-theme contrast tokens'
);

// ──────────────────────────────────────────────────────────────────
// Check 9.3: ReportIssueModal Scroll Lock & Ergonomics
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 9.3: ReportIssueModal Scroll Lock & 44px Action Targets');
const reportModalPath = path.join(ROOT_DIR, 'src', 'components', 'ui', 'ReportIssueModal.tsx');
assert(fs.existsSync(reportModalPath), 'src/components/ui/ReportIssueModal.tsx exists');
const reportModalContent = fs.readFileSync(reportModalPath, 'utf8');

assert(
  reportModalContent.includes("import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';") &&
  reportModalContent.includes('useBodyScrollLock(isOpen);'),
  'ReportIssueModal integrates useBodyScrollLock(isOpen)'
);

assert(
  reportModalContent.includes('min-h-[44px]') &&
  reportModalContent.includes('text-rose-600 dark:text-rose-400 font-bold'),
  'ReportIssueModal enforces 44px action buttons and high-contrast required indicators'
);

// ──────────────────────────────────────────────────────────────────
// Check 9.4: UpdatePromptToast Safe-Area Cushion & Touch Minimum
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 9.4: UpdatePromptToast Safe-Area Cushion & Height');
const toastPath = path.join(ROOT_DIR, 'src', 'components', 'ui', 'UpdatePromptToast.tsx');
assert(fs.existsSync(toastPath), 'src/components/ui/UpdatePromptToast.tsx exists');
const toastContent = fs.readFileSync(toastPath, 'utf8');

assert(
  toastContent.includes('bottom-[calc(5.5rem+env(safe-area-inset-bottom))]') &&
  toastContent.includes('min-h-[40px]'),
  'UpdatePromptToast maintains bottom safe-area cushion and 40px button height'
);

// ──────────────────────────────────────────────────────────────────
// Check 9.5: 3-Tier Disaster Recovery Eviction Mitigation Contract
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 9.5: 3-Tier Disaster Eviction Mitigation Invariant');
assert(
  evictionModalContent.includes('createBackupPayload()') &&
  evictionModalContent.includes('cacheManager.evictOldestCache(undefined, 20);') &&
  evictionModalContent.includes('syncNow()') &&
  evictionModalContent.includes('openAuthModal('),
  'StorageEvictionRecoveryModal provides 3-tier disaster recovery actions (JSON backup, cloud sync, cache evict)'
);

// ──────────────────────────────────────────────────────────────────
// Summary & Verdict
// ──────────────────────────────────────────────────────────────────
console.log('\n' + '─'.repeat(60));
if (failedTests > 0) {
  console.error(`❌ FAILED: ${failedTests} assertion(s) failed in Siklus II — Pass 9.`);
  process.exit(1);
} else {
  console.log('🎉 PASSED: All 5 checks in Siklus II — Pass 9 verified 100% GREEN (Exit Code 0)!');
  process.exit(0);
}
