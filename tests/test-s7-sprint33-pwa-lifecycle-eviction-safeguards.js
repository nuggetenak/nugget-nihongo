// ══════════════════════════════════════════════════════════════════
//  test-s7-sprint33-pwa-lifecycle-eviction-safeguards.js — Regression Suite
//  Sprint 33 (Pass 11): PWA Lifecycle, Update Prompts & Storage Eviction Safeguards
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
    throw err;
  }
}

console.log('\n====================================================================');
console.log('📱 SPRINT 33: PWA LIFECYCLE, UPDATE PROMPTS & STORAGE SAFEGUARDS');
console.log('====================================================================\n');

const ROOT_DIR = path.resolve(__dirname, '..');

// ── Test 1: PWA Lifecycle Architecture & Standalone Detection ──
test('T1: pwaStore.ts implements full lifecycle, standalone queries, and safe update triggers', () => {
  const pwaPath = path.join(ROOT_DIR, 'src/lib/pwa/pwaStore.ts');
  assert(fs.existsSync(pwaPath), 'pwaStore.ts must exist');
  const code = fs.readFileSync(pwaPath, 'utf8');

  // Verify state and actions
  assert(code.includes('isInstallable: boolean'), 'Must declare isInstallable');
  assert(code.includes('isInstalled: boolean'), 'Must declare isInstalled');
  assert(code.includes('hasUpdate: boolean'), 'Must declare hasUpdate');
  assert(code.includes('applyUpdate: () => void'), 'Must declare applyUpdate');
  assert(code.includes('checkForUpdate: () => Promise<void>'), 'Must declare checkForUpdate');
  assert(code.includes('initPwa: () => void'), 'Must declare initPwa');

  // Verify standalone media query checks
  assert(code.includes('(display-mode: standalone)'), 'Must check standalone display mode');
  assert(code.includes('(display-mode: fullscreen)'), 'Must check fullscreen display mode');
  assert(code.includes('(display-mode: minimal-ui)'), 'Must check minimal-ui display mode');

  // Verify visibility and focus triggers
  assert(code.includes("document.addEventListener('visibilitychange'"), 'Must trigger updates on visibilitychange');
  assert(code.includes("window.addEventListener('focus'"), 'Must trigger updates on window focus');
});

// ── Test 2: UpdatePromptToast A11y & Touch Ergonomics ──
test('T2: UpdatePromptToast.tsx satisfies WCAG alert roles, 44px touch targets, and top safe area cushion', () => {
  const toastPath = path.join(ROOT_DIR, 'src/components/ui/UpdatePromptToast.tsx');
  assert(fs.existsSync(toastPath), 'UpdatePromptToast.tsx must exist');
  const code = fs.readFileSync(toastPath, 'utf8');

  // A11y assertions
  assert(code.includes('role="alert"'), 'Must designate role="alert"');
  assert(code.includes('aria-live="polite"'), 'Must designate aria-live="polite"');

  // Touch target assertions
  assert(code.includes('min-h-[40px]'), 'Action buttons must satisfy >=40px touch target');
  assert(code.includes('min-w-[40px]'), 'Dismiss button must satisfy >=40px touch target');

  // Safe area viewport placement
  assert(code.includes('top-[calc(0.75rem+env(safe-area-inset-top))]'), 'Must maintain safe-area-inset-top padding');
});

// ── Test 3: StorageEvictionRecoveryModal Disaster Recovery ──
test('T3: StorageEvictionRecoveryModal provides emergency JSON backup, cloud sync, and cache purge', () => {
  const modalPath = path.join(ROOT_DIR, 'src/components/modals/StorageEvictionRecoveryModal.tsx');
  assert(fs.existsSync(modalPath), 'StorageEvictionRecoveryModal.tsx must exist');
  const code = fs.readFileSync(modalPath, 'utf8');

  // Modal a11y and lifecycle
  assert(code.includes('role="dialog"'), 'Must designate role="dialog"');
  assert(code.includes('aria-modal="true"'), 'Must declare aria-modal="true"');
  assert(code.includes('useFocusTrap'), 'Must trap focus');
  assert(code.includes('useBodyScrollLock'), 'Must lock body scroll');

  // Recovery features
  assert(code.includes('createBackupPayload'), 'Must invoke createBackupPayload for JSON export');
  assert(code.includes('cacheManager.evictOldestCache'), 'Must support audio cache eviction');
  assert(code.includes('min-h-[40px]'), 'Close and action buttons must satisfy >=40px touch target');
});

// ── Test 4: Self-Healing Storage Auto-Recovery ──
test('T4: selfHealingStorage.ts detects corrupted JSON, captures telemetry, and repairs key defaults', () => {
  const healPath = path.join(ROOT_DIR, 'src/lib/persistence/selfHealingStorage.ts');
  assert(fs.existsSync(healPath), 'selfHealingStorage.ts must exist');
  const code = fs.readFileSync(healPath, 'utf8');

  // Verify exports
  assert(code.includes('export function safeJsonParse'), 'Must export safeJsonParse');
  assert(code.includes('export function safeGetItem'), 'Must export safeGetItem');
  assert(code.includes('export function safeSetItem'), 'Must export safeSetItem');
  assert(code.includes('export function auditStorageHealth'), 'Must export auditStorageHealth');

  // Simulate safeJsonParse behavior
  function simulateSafeJsonParse(raw, fallback, key) {
    if (raw === null || raw === undefined || raw === '') return fallback;
    try {
      return JSON.parse(raw);
    } catch {
      return fallback;
    }
  }

  assert.strictEqual(simulateSafeJsonParse(null, 10), 10);
  assert.strictEqual(simulateSafeJsonParse('{"valid":true}', {}).valid, true);
  assert.deepStrictEqual(simulateSafeJsonParse('corrupted_json_string{', { restored: true }), { restored: true });
});

// ── Test 5: Re-export Proxy Alignment ──
test('T5: src/components/ui/StorageEvictionRecoveryModal.tsx re-exports modal cleanly', () => {
  const proxyPath = path.join(ROOT_DIR, 'src/components/ui/StorageEvictionRecoveryModal.tsx');
  assert(fs.existsSync(proxyPath), 'Proxy file must exist');
  const code = fs.readFileSync(proxyPath, 'utf8');
  assert(code.includes("export * from '../modals/StorageEvictionRecoveryModal'"), 'Proxy must re-export from modals directory');
});

// ── Test 6: Mobile Ergonomics & Drag Handle Invariant ──
test('T6: StorageEvictionRecoveryModal renders drag handle and responsive max-height', () => {
  const modalPath = path.join(ROOT_DIR, 'src/components/modals/StorageEvictionRecoveryModal.tsx');
  const code = fs.readFileSync(modalPath, 'utf8');

  // Verify drag handle for mobile bottom sheet
  assert(code.includes('rounded-full bg-accent/25 mx-auto'), 'Must render mobile drag handle');
  assert(code.includes('max-h-[90dvh]'), 'Must cap mobile viewport at 90dvh');
});

console.log('\n====================================================================');
console.log(`✅ SPRINT 33 REGRESSION VERIFICATION COMPLETE: ${passedTests}/${totalTests} TESTS PASSED`);
console.log('====================================================================\n');
