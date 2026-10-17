// ══════════════════════════════════════════════════════════════════
//  test-sprint-21-a11y.js — Forensic Unit & Integration Suite
//  Sprint 21: Accessibility Audit, ARIA Landmark Semantics & Keyboard Flow
//  (Tickets T-115 to T-120)
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
console.log('♿ RUNNING SPRINT 21 VERIFICATION SUITE: ACCESSIBILITY & A11Y');
console.log('=============================================================\n');

const ROOT_DIR = path.resolve(__dirname, '..');

// ── T-115: ARIA Landmark Semantics & Skip Link ──
test('T-115: ARIA Landmark semantics & skip-to-content bypass link are fully implemented', () => {
  const appPath = path.join(ROOT_DIR, 'src/App.tsx');
  const appCode = fs.readFileSync(appPath, 'utf8');

  // Verify bypass skip-to-content link
  assert(
    appCode.includes('href="#main-content"') && appCode.includes('sr-only focus:not-sr-only'),
    'App.tsx must include skip-to-content bypass link'
  );

  // Verify main landmark
  assert(
    appCode.includes('id="main-content"') && appCode.includes('role="main"'),
    'App.tsx main element must have id="main-content" and role="main"'
  );

  // Verify Header banner role
  const headerCode = fs.readFileSync(path.join(ROOT_DIR, 'src/components/layout/Header.tsx'), 'utf8');
  assert(headerCode.includes('role="banner"'), 'Header.tsx must have role="banner"');

  // Verify Sidebar landmark and navigation roles
  const sidebarCode = fs.readFileSync(path.join(ROOT_DIR, 'src/components/layout/Sidebar.tsx'), 'utf8');
  assert(sidebarCode.includes('role="complementary"'), 'Sidebar.tsx must have role="complementary"');
  assert(sidebarCode.includes('role="navigation"'), 'Sidebar.tsx must have role="navigation"');
  assert(sidebarCode.includes('aria-current={isActive ? \'page\' : undefined}'), 'Sidebar.tsx must mark active page');

  // Verify BottomNav landmark
  const bottomNavCode = fs.readFileSync(path.join(ROOT_DIR, 'src/components/layout/BottomNav.tsx'), 'utf8');
  assert(bottomNavCode.includes('role="navigation"'), 'BottomNav.tsx must have role="navigation"');
  assert(bottomNavCode.includes('aria-current={isActive ? \'page\' : undefined}'), 'BottomNav.tsx must mark active page');
});

// ── T-116: High-Visibility Focus Outline & Keyboard Navigation ──
test('T-116: Focus-visible high-contrast outlines and keyboard styling are enforced', () => {
  const cssCode = fs.readFileSync(path.join(ROOT_DIR, 'src/index.css'), 'utf8');
  assert(cssCode.includes(':focus-visible'), 'index.css must define global :focus-visible rules');
  assert(cssCode.includes('outline: 2px solid var(--accent)'), 'index.css must use accent outline');
  assert(cssCode.includes('outline-offset: 2px'), 'index.css must specify outline offset');

  // Verify Header and BottomNav buttons include focus-visible classes
  const headerCode = fs.readFileSync(path.join(ROOT_DIR, 'src/components/layout/Header.tsx'), 'utf8');
  assert(headerCode.includes('focus-visible:ring-2 focus-visible:ring-accent'), 'Header buttons must enforce focus-visible rings');

  const bottomNavCode = fs.readFileSync(path.join(ROOT_DIR, 'src/components/layout/BottomNav.tsx'), 'utf8');
  assert(bottomNavCode.includes('focus-visible:ring-2 focus-visible:ring-accent'), 'BottomNav buttons must enforce focus-visible rings');
});

// ── T-117: Screen Reader Live Region Announcer ──
test('T-117: Screen reader announcer singleton & live region component dispatch status updates', () => {
  const { announcer } = require('../src/lib/a11y/announcer.ts');
  assert(typeof announcer.announce === 'function', 'announcer must export announce method');
  assert(typeof announcer.subscribe === 'function', 'announcer must export subscribe method');

  let receivedMessage = null;
  let receivedMode = null;
  const unsubscribe = announcer.subscribe((ann) => {
    receivedMessage = ann.message;
    receivedMode = ann.mode;
  });

  announcer.announce('Ujian berhasil diselesaikan', 'polite');
  assert.strictEqual(receivedMessage, 'Ujian berhasil diselesaikan');
  assert.strictEqual(receivedMode, 'polite');

  announcer.announce('Peringatan darurat K3!', 'assertive');
  assert.strictEqual(receivedMessage, 'Peringatan darurat K3!');
  assert.strictEqual(receivedMode, 'assertive');

  unsubscribe();

  // Verify A11yAnnouncer component contains polite and assertive regions
  const announcerCompCode = fs.readFileSync(path.join(ROOT_DIR, 'src/components/ui/A11yAnnouncer.tsx'), 'utf8');
  assert(announcerCompCode.includes('aria-live="polite"'), 'A11yAnnouncer must render polite region');
  assert(announcerCompCode.includes('aria-live="assertive"'), 'A11yAnnouncer must render assertive region');

  // Verify App.tsx mounts A11yAnnouncer
  const appCode = fs.readFileSync(path.join(ROOT_DIR, 'src/App.tsx'), 'utf8');
  assert(appCode.includes('<A11yAnnouncer />'), 'App.tsx must mount A11yAnnouncer component');

  // Verify store broadcasts to announcer
  const storeCode = fs.readFileSync(path.join(ROOT_DIR, 'src/store/useAppStore.ts'), 'utf8');
  assert(storeCode.includes("announcer.announce(text, 'polite')"), 'showToast must dispatch to announcer');
  assert(storeCode.includes('announcer.announce(`Membuka tab ${activeTab}`'), 'setActiveTab must dispatch to announcer');
});

// ── T-118: Reduced Motion Support & WCAG 2.1 AA Contrast ──
test('T-118: Prefers-reduced-motion media query and contrast token hygiene are established', () => {
  const cssCode = fs.readFileSync(path.join(ROOT_DIR, 'src/index.css'), 'utf8');
  assert(
    cssCode.includes('@media (prefers-reduced-motion: reduce)'),
    'index.css must include prefers-reduced-motion media query'
  );
  assert(
    cssCode.includes('animation-duration: 0.01ms !important'),
    'prefers-reduced-motion must suppress long running animations'
  );
  assert(
    cssCode.includes('transition-duration: 0.01ms !important'),
    'prefers-reduced-motion must suppress transition delays'
  );

  // Contrast tokens check: verify dark and light surface/text definitions exist
  assert(cssCode.includes('--bg: #FDFBF7') && cssCode.includes('--text: #2D2319'), 'Light mode tokens must be defined');
  assert(cssCode.includes('--bg: #121110') && cssCode.includes('--text: #F5EFE6'), 'Dark mode tokens must be defined');
});

// ── T-119: Form Control Accessibility & Modal Dialog Semantics ──
test('T-119: Form controls, switches, and modal dialogs adhere to WAI-ARIA authoring practices', () => {
  const settingsCode = fs.readFileSync(path.join(ROOT_DIR, 'src/pages/SettingsPage.tsx'), 'utf8');
  assert(settingsCode.includes('htmlFor="custom-api-key"'), 'SettingsPage must bind label to custom-api-key');
  assert(settingsCode.includes('id="custom-api-key"'), 'SettingsPage must give API key input id="custom-api-key"');
  assert(settingsCode.includes('aria-describedby="api-key-desc"'), 'SettingsPage must provide aria-describedby');
  assert(settingsCode.includes('role="switch"'), 'SettingsPage must use role="switch" for toggles');
  assert(settingsCode.includes('aria-checked={showFurigana}'), 'Furigana toggle must have aria-checked');

  const searchCode = fs.readFileSync(path.join(ROOT_DIR, 'src/components/ui/SearchPalette.tsx'), 'utf8');
  assert(searchCode.includes('role="dialog"'), 'SearchPalette must declare role="dialog"');
  assert(searchCode.includes('aria-modal="true"'), 'SearchPalette must declare aria-modal="true"');
  assert(searchCode.includes('role="combobox"'), 'SearchPalette input must declare role="combobox"');

  const authCode = fs.readFileSync(path.join(ROOT_DIR, 'src/components/auth/AuthModal.tsx'), 'utf8');
  assert(authCode.includes('role="dialog"'), 'AuthModal must declare role="dialog"');
  assert(authCode.includes('aria-modal="true"'), 'AuthModal must declare aria-modal="true"');
  assert(authCode.includes('aria-labelledby="auth-modal-title"'), 'AuthModal must link aria-labelledby');
  assert(authCode.includes('role="alert"'), 'AuthModal error banner must declare role="alert"');
});

// ── Print Summary ──
console.log('\n=============================================================');
console.log(`📊 SPRINT 21 TEST RESULTS: ${passedTests}/${totalTests} TESTS PASSED`);
console.log('=============================================================\n');

if (passedTests !== totalTests) {
  process.exit(1);
}
