// ══════════════════════════════════════════════════════════════════
//  test-s7-sprint2-pwa-sentinel.js
//  Sprint 2: Top-Pill PWA Sentinel & Service Worker Lifecycle Test
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT = path.resolve(__dirname, '..');

console.log('🧪 Starting Sprint 2: Top-Pill PWA Sentinel & Service Worker Lifecycle Test...');

// Check 1: pwaStore.ts - Background update checks & sentinel hooks
console.log('  Check 2.1: pwaStore.ts sentinel listeners (visibilitychange, focus, reg.update)...');
const pwaStorePath = path.join(ROOT, 'src', 'lib', 'pwa', 'pwaStore.ts');
assert(fs.existsSync(pwaStorePath), 'pwaStore.ts must exist');
const pwaStoreContent = fs.readFileSync(pwaStorePath, 'utf8');

assert(
  pwaStoreContent.includes('registration: ServiceWorkerRegistration | null'),
  'pwaStore must store ServiceWorkerRegistration reference'
);
assert(
  pwaStoreContent.includes('checkForUpdate: () => Promise<void>'),
  'pwaStore must declare checkForUpdate method in PwaState'
);
assert(
  pwaStoreContent.includes("visibilitychange"),
  'pwaStore must listen for visibilitychange events'
);
assert(
  pwaStoreContent.includes("window.addEventListener('focus'"),
  'pwaStore must listen for window focus events'
);
assert(
  pwaStoreContent.includes('reg.update()'),
  'pwaStore must invoke reg.update() on resume or trigger'
);
assert(
  pwaStoreContent.includes("waitingWorker.postMessage({ type: 'SKIP_WAITING' })"),
  'applyUpdate must postMessage SKIP_WAITING to waiting worker'
);
console.log('  ✅ Check 2.1 passed: pwaStore.ts includes complete update sentinel lifecycle.');

// Check 2: UpdatePromptToast.tsx - Top pill ergonomics & UX copy
console.log('  Check 2.2: UpdatePromptToast.tsx top-pill layout & 1-tap refresh button...');
const toastPath = path.join(ROOT, 'src', 'components', 'ui', 'UpdatePromptToast.tsx');
assert(fs.existsSync(toastPath), 'UpdatePromptToast.tsx must exist');
const toastContent = fs.readFileSync(toastPath, 'utf8');

assert(
  toastContent.includes('top-3.5') || toastContent.includes('top-3') || toastContent.includes('slide-in-from-top-4'),
  'UpdatePromptToast must use top floating placement (not bottom obscuring BottomNav)'
);
assert(
  toastContent.includes('Versi Baru Telah Siap') || toastContent.includes('Versi Baru Tersedia'),
  'UpdatePromptToast must have clear version readiness copy'
);
assert(
  toastContent.includes('applyUpdate'),
  'UpdatePromptToast must bind action button to applyUpdate'
);
assert(
  toastContent.includes('min-h-[40px]') && toastContent.includes('active:scale-95'),
  'Action buttons in UpdatePromptToast must maintain >=40px touch targets and active scale'
);
assert(
  toastContent.includes('role="alert"') && toastContent.includes('aria-live="polite"'),
  'UpdatePromptToast must have accessible ARIA alert semantics'
);
console.log('  ✅ Check 2.2 passed: UpdatePromptToast top-pill design and UX ergonomics verified.');

// Check 3: sw.js SKIP_WAITING listener alignment
console.log('  Check 2.3: public/sw.js message handler for SKIP_WAITING...');
const swPath = path.join(ROOT, 'public', 'sw.js');
assert(fs.existsSync(swPath), 'public/sw.js must exist');
const swContent = fs.readFileSync(swPath, 'utf8');

assert(
  swContent.includes('SKIP_WAITING') && swContent.includes('skipWaiting()'),
  'public/sw.js must handle SKIP_WAITING message and execute self.skipWaiting()'
);
console.log('  ✅ Check 2.3 passed: Service worker handles prompt-based SKIP_WAITING activation.');

console.log('🎉 ALL SPRINT 2 PWA SENTINEL CHECKS PASSED (3/3)!');
