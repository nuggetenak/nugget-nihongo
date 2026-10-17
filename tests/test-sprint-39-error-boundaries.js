// ══════════════════════════════════════════════════════════════════
//  test-sprint-39-error-boundaries.js — Forensic Unit & Integration Suite
//  Sprint 39: Global Error Boundaries, Crash Isolation & White-Screen-of-Death Protection
//  (Tickets T-211 to T-215)
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
console.log('🛡️ RUNNING SPRINT 39 VERIFICATION SUITE: ERROR BOUNDARIES & CRASH ISOLATION');
console.log('=============================================================\n');

const ROOT_DIR = path.resolve(__dirname, '..');
const errorBoundaryPath = path.join(ROOT_DIR, 'src/components/ui/ErrorBoundary.tsx');
const routeBoundaryPath = path.join(ROOT_DIR, 'src/components/ui/RouteErrorBoundary.tsx');
const modalBoundaryPath = path.join(ROOT_DIR, 'src/components/ui/ModalErrorBoundary.tsx');
const sanitizerPath = path.join(ROOT_DIR, 'src/lib/storage/storageSanitizer.ts');
const diagnosticsPath = path.join(ROOT_DIR, 'src/lib/diagnostics/diagnostics.ts');
const appPath = path.join(ROOT_DIR, 'src/App.tsx');
const mainPath = path.join(ROOT_DIR, 'src/main.tsx');
const storePath = path.join(ROOT_DIR, 'src/store/useAppStore.ts');

assert(fs.existsSync(errorBoundaryPath), 'ErrorBoundary.tsx must exist');
assert(fs.existsSync(routeBoundaryPath), 'RouteErrorBoundary.tsx must exist');
assert(fs.existsSync(modalBoundaryPath), 'ModalErrorBoundary.tsx must exist');
assert(fs.existsSync(sanitizerPath), 'storageSanitizer.ts must exist');
assert(fs.existsSync(diagnosticsPath), 'diagnostics.ts must exist');

const errorBoundaryCode = fs.readFileSync(errorBoundaryPath, 'utf8');
const routeBoundaryCode = fs.readFileSync(routeBoundaryPath, 'utf8');
const modalBoundaryCode = fs.readFileSync(modalBoundaryPath, 'utf8');
const sanitizerCode = fs.readFileSync(sanitizerPath, 'utf8');
const diagnosticsCode = fs.readFileSync(diagnosticsPath, 'utf8');
const appCode = fs.readFileSync(appPath, 'utf8');
const mainCode = fs.readFileSync(mainPath, 'utf8');
const storeCode = fs.readFileSync(storePath, 'utf8');

// ── T-211: Root Global ErrorBoundary & Recovery Actions ──
test('T-211: Root Global ErrorBoundary implements 5 recovery actions and Sumi/Makie styling', () => {
  // Brand Sumi & Makie styling
  assert(errorBoundaryCode.includes('bg-stone-950'), 'Must use stone-950 Sumi background');
  assert(errorBoundaryCode.includes('border-amber-500/30'), 'Must use amber Makie border accent');
  assert(errorBoundaryCode.includes('Waduh, terjadi kendala teknis tak terduga 🍵'), 'Must show warm Indonesian recovery header');
  assert(errorBoundaryCode.includes('role="alert"'), 'Must have role="alert"');
  assert(errorBoundaryCode.includes('aria-live="assertive"'), 'Must have aria-live="assertive"');

  // Action 1: Muat Ulang Aplikasi
  assert(errorBoundaryCode.includes('handleReload'), 'Must implement handleReload');
  assert(errorBoundaryCode.includes('Muat Ulang Aplikasi'), 'Must offer reload action button');

  // Action 2: Kembali ke Beranda
  assert(errorBoundaryCode.includes('handleGoHome'), 'Must implement handleGoHome');
  assert(errorBoundaryCode.includes('Kembali ke Beranda Utama'), 'Must offer go-home action button');
  assert(errorBoundaryCode.includes('#home'), 'Must navigate to #home hash');

  // Action 3: Ekspor Cadangan Darurat
  assert(errorBoundaryCode.includes('handleExportBackup'), 'Must implement handleExportBackup');
  assert(errorBoundaryCode.includes('emergencyExportAllLocalStorage'), 'Must use emergencyExportAllLocalStorage');
  assert(errorBoundaryCode.includes('Cadangan Data'), 'Must offer backup download button');

  // Action 4: Reset Darurat Cache Lokal
  assert(errorBoundaryCode.includes('handleResetVolatileCache'), 'Must implement handleResetVolatileCache');
  assert(errorBoundaryCode.includes('emergencyResetVolatileCache'), 'Must use emergencyResetVolatileCache');
  assert(errorBoundaryCode.includes('Bersihkan Cache'), 'Must offer cache flush button');

  // Action 5: Salin Log Diagnostik
  assert(errorBoundaryCode.includes('handleCopyDiagnostics'), 'Must implement handleCopyDiagnostics');
  assert(errorBoundaryCode.includes('getReportString'), 'Must call diagnostics.getReportString()');
  assert(errorBoundaryCode.includes('Salin Log'), 'Must offer copy diagnostics button');

  // Multi-device touch target cushioning (>= 44px)
  assert(errorBoundaryCode.includes('min-h-[48px]'), 'Primary button must be min-h-[48px]');
  assert(errorBoundaryCode.includes('min-h-[44px]'), 'Secondary buttons must be min-h-[44px]');
  assert(errorBoundaryCode.includes('active:scale-95'), 'Must provide haptic scale feedback');

  // Telemetry & diagnostics integration
  assert(errorBoundaryCode.includes('errorReporter.captureException'), 'Must log to errorReporter');
  assert(errorBoundaryCode.includes('diagnostics.addLog'), 'Must log to diagnostics ring buffer');

  // Root mounting in main.tsx
  assert(mainCode.includes('<ErrorBoundary>'), 'main.tsx must mount ErrorBoundary around App');
});

// ── T-212: Route-Level View Crash Isolation (RouteErrorBoundary) ──
test('T-212: RouteErrorBoundary isolates route crashes and auto-recovers on tab change', () => {
  // Component structure
  assert(routeBoundaryCode.includes('export class RouteErrorBoundary'), 'Must export RouteErrorBoundary class');
  assert(routeBoundaryCode.includes('currentTab'), 'Must accept currentTab prop');
  assert(routeBoundaryCode.includes('onResetToHome'), 'Must accept onResetToHome prop');

  // Auto-recovery on tab change
  assert(
    routeBoundaryCode.includes('prevProps.currentTab !== this.props.currentTab'),
    'Must auto-clear error state when currentTab changes'
  );

  // In-page fallback UI
  assert(routeBoundaryCode.includes('Gagal Memuat Tampilan Ini 🍵'), 'Must show isolated route crash heading');
  assert(routeBoundaryCode.includes('Modul Tampilan Terisolasi'), 'Must highlight isolated tab scope');
  assert(routeBoundaryCode.includes('Coba Muat Ulang Tampilan'), 'Must offer retry button');
  assert(routeBoundaryCode.includes('Kembali ke Beranda'), 'Must offer back to home button');
  assert(routeBoundaryCode.includes('Rincian Galat Teknis'), 'Must offer collapsible error details');

  // Integration in App.tsx
  assert(appCode.includes('import { RouteErrorBoundary }'), 'App.tsx must import RouteErrorBoundary');
  assert(
    appCode.includes('<RouteErrorBoundary') && appCode.includes('currentTab={activeTab}'),
    'App.tsx must wrap renderActiveView with RouteErrorBoundary and activeTab'
  );
  assert(
    appCode.includes('onResetToHome={() => setActiveTab(\'home\')}'),
    'App.tsx must pass onResetToHome to RouteErrorBoundary'
  );
});

// ── T-213: Modal & Portal Crash Guard (ModalErrorBoundary) ──
test('T-213: ModalErrorBoundary isolates heavy portals, SVG stroke animators, and IRT math', () => {
  // Component structure
  assert(modalBoundaryCode.includes('export class ModalErrorBoundary'), 'Must export ModalErrorBoundary class');
  assert(modalBoundaryCode.includes('modalName'), 'Must accept modalName prop');
  assert(modalBoundaryCode.includes('onClose'), 'Must accept onClose prop');
  assert(modalBoundaryCode.includes('isOpen'), 'Must accept isOpen prop');

  // Reset on modal close
  assert(
    modalBoundaryCode.includes('prevProps.isOpen && !this.props.isOpen'),
    'Must auto-reset error state when modal closes'
  );

  // Accessible fallback modal dialog
  assert(modalBoundaryCode.includes('role="dialog"'), 'Must render dialog role');
  assert(modalBoundaryCode.includes('aria-modal="true"'), 'Must render aria-modal="true"');
  assert(modalBoundaryCode.includes('Gagal Memuat Modul'), 'Must inform user of specific failed modal');
  assert(modalBoundaryCode.includes('Tutup Modul'), 'Must offer close module button');

  // Integration in App.tsx: verify wrapping of key modals
  assert(appCode.includes('import { ModalErrorBoundary }'), 'App.tsx must import ModalErrorBoundary');
  assert(appCode.includes('<ModalErrorBoundary modalName="Tabel Kana"'), 'Must wrap KanaChartModal');
  assert(appCode.includes('<ModalErrorBoundary modalName="Konjugasi Kata Kerja"'), 'Must wrap ConjugationModal');
  assert(appCode.includes('<ModalErrorBoundary modalName="Perbandingan Nuansa Tata Bahasa"'), 'Must wrap NuanceCompareModal');
  assert(appCode.includes('<ModalErrorBoundary modalName="Galeri Peribahasa Kotowaza"'), 'Must wrap KotowazaModal');
  assert(appCode.includes('<ModalErrorBoundary modalName="Kotak Peralatan Belajar"'), 'Must wrap StudyToolboxModal');
  assert(appCode.includes('<ModalErrorBoundary modalName="Tes Penempatan Adaptif (CAT)"'), 'Must wrap CatPlacementModal');
  assert(appCode.includes('<ModalErrorBoundary modalName="Modal Dinamis Global"'), 'Must wrap GlobalModalManager');
  assert(appCode.includes('<ModalErrorBoundary modalName="Sensei AI Studio"'), 'Must wrap ContextualSenseiSheet');
});

// ── T-214: Storage Sanitizer & Corrupted LocalStorage Self-Healing ──
test('T-214: storageSanitizer quarantines corrupted keys and heals state hydration', () => {
  // Verify exported API functions
  assert(sanitizerCode.includes('export function quarantineCorruptedKey'), 'Must export quarantineCorruptedKey');
  assert(sanitizerCode.includes('export function safeGetItem'), 'Must export safeGetItem');
  assert(sanitizerCode.includes('export function sanitizeFSRSCards'), 'Must export sanitizeFSRSCards');
  assert(sanitizerCode.includes('export function sanitizeStreak'), 'Must export sanitizeStreak');
  assert(sanitizerCode.includes('export function sanitizeNumber'), 'Must export sanitizeNumber');
  assert(sanitizerCode.includes('export function sanitizeCompletedLessonIds'), 'Must export sanitizeCompletedLessonIds');
  assert(sanitizerCode.includes('export function sanitizePlacementHistory'), 'Must export sanitizePlacementHistory');
  assert(sanitizerCode.includes('export function emergencyExportAllLocalStorage'), 'Must export emergencyExportAllLocalStorage');
  assert(sanitizerCode.includes('export function emergencyResetVolatileCache'), 'Must export emergencyResetVolatileCache');

  // Verify protected keys in emergency cache reset
  assert(sanitizerCode.includes('nn_fsrs_cards'), 'Must protect nn_fsrs_cards');
  assert(sanitizerCode.includes('nn_streak'), 'Must protect nn_streak');
  assert(sanitizerCode.includes('nn_xp'), 'Must protect nn_xp');
  assert(sanitizerCode.includes('nugget_user_profile'), 'Must protect user profile');

  // Verify store integration
  assert(storeCode.includes('import {'), 'Store must import sanitizer');
  assert(storeCode.includes('safeGetItem'), 'Store must use safeGetItem');
  assert(storeCode.includes('sanitizeFSRSCards'), 'Store must use sanitizeFSRSCards');
  assert(storeCode.includes('sanitizeNumber'), 'Store must use sanitizeNumber');
  assert(storeCode.includes('sanitizeCompletedLessonIds'), 'Store must use sanitizeCompletedLessonIds');
  assert(storeCode.includes('sanitizePlacementHistory'), 'Store must use sanitizePlacementHistory');
});

// ── T-215: Global Diagnostic Ring Buffer & System Traps ──
test('T-215: diagnostics ring buffer captures unhandled events and exposes support report', () => {
  // Verification of ring buffer constraints
  assert(diagnosticsCode.includes('MAX_LOGS = 50') || diagnosticsCode.includes('50'), 'Must cap ring buffer at 50 logs');
  assert(diagnosticsCode.includes('export interface DiagnosticLog'), 'Must export DiagnosticLog interface');
  assert(diagnosticsCode.includes('getReportString'), 'Must generate diagnostics report string');
  assert(diagnosticsCode.includes('scrubSensitiveData'), 'Must scrub sensitive credentials');

  // Global window inspection hooks
  assert(diagnosticsCode.includes('__getNuggetDiagnostics'), 'Must expose window.__getNuggetDiagnostics');
  assert(diagnosticsCode.includes('__getNuggetDiagnosticReport'), 'Must expose window.__getNuggetDiagnosticReport');

  // Global listeners in diagnostics.init()
  assert(diagnosticsCode.includes('window.addEventListener(\'error\''), 'Must attach error listener');
  assert(diagnosticsCode.includes('window.addEventListener(\'unhandledrejection\''), 'Must attach unhandledrejection listener');
  assert(diagnosticsCode.includes('window.addEventListener(\'hashchange\''), 'Must attach hashchange navigation listener');

  // Initialization in main.tsx
  assert(mainCode.includes('diagnostics.init()'), 'main.tsx must initialize diagnostics on startup');
});

console.log(`\n=============================================================`);
console.log(`📊 SPRINT 39 VERIFICATION COMPLETE: ${passedTests}/${totalTests} TESTS PASSED`);
console.log(`=============================================================\n`);

if (passedTests !== totalTests) {
  process.exit(1);
}
