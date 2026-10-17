// ══════════════════════════════════════════════════════════════════
//  test-sprint-40-accessibility.js — Forensic Unit & Integration Suite
//  Sprint 40: Accessibility, Screen Reader Semantics & ARIA Landmarks
//  Tickets T-216 to T-220
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
console.log('♿ RUNNING SPRINT 40 TEST SUITE: ACCESSIBILITY, ARIA & A11Y');
console.log('=============================================================\n');

const ROOT_DIR = path.resolve(__dirname, '..');

// ── T-216: Universal Modal Focus Trap & Keyboard Escape Hook ──
test('T-216: useFocusTrap handles Tab cycling, Escape dismissal, focus restore, and modal integration', () => {
  const trapPath = path.join(ROOT_DIR, 'src/hooks/useFocusTrap.ts');
  assert(fs.existsSync(trapPath), 'useFocusTrap.ts must exist');
  const trapCode = fs.readFileSync(trapPath, 'utf8');

  // Verify cycling logic
  assert(trapCode.includes('e.shiftKey') && trapCode.includes('firstEl.focus()'), 'useFocusTrap must handle forward tab wrapping');
  assert(trapCode.includes('lastEl.focus()'), 'useFocusTrap must handle reverse shift-tab wrapping');
  assert(trapCode.includes("e.key === 'Escape'"), 'useFocusTrap must handle Escape dismissal');
  assert(trapCode.includes('previousActiveElement.current'), 'useFocusTrap must cache and restore previous active focus');

  // Verify inclusion across modals
  const modalFiles = [
    'src/components/kana/KanaChartModal.tsx',
    'src/components/ui/DetailModal.tsx',
    'src/components/grammar/ConjugationModal.tsx',
    'src/components/grammar/NuanceCompareModal.tsx',
    'src/components/kotowaza/KotowazaModal.tsx',
    'src/components/tools/StudyToolboxModal.tsx',
    'src/components/cat/CatPlacementModal.tsx',
    'src/components/ui/PatchNotesModal.tsx',
    'src/components/ui/KeyboardShortcutsModal.tsx',
    'src/components/ui/FeatureGuideModal.tsx',
    'src/components/ui/ReportIssueModal.tsx',
  ];

  for (const modalFile of modalFiles) {
    const code = fs.readFileSync(path.join(ROOT_DIR, modalFile), 'utf8');
    assert(
      code.includes('useFocusTrap'),
      `${modalFile} must integrate useFocusTrap`
    );
    assert(
      code.includes('ref={containerRef}') || 
      code.includes('ref={modalRef}') || 
      code.includes('ref={paletteRef}') || 
      code.includes('ref={focusTrapRef}'),
      `${modalFile} must attach focus trap ref`
    );
  }
});

// ── T-217: Semantic Interactive Elements Normalization ──
test('T-217: Non-semantic interactive divs normalized to native button or role="button" with tabIndex and keydown', () => {
  // Header drawer button
  const headerCode = fs.readFileSync(path.join(ROOT_DIR, 'src/components/layout/Header.tsx'), 'utf8');
  assert(headerCode.includes('onClick={onOpenMobileDrawer}') && headerCode.includes('<button'), 'Header drawer trigger must be a semantic <button>');
  assert(headerCode.includes('aria-label="Buka Menu Navigasi Lengkap"'), 'Header drawer trigger must have descriptive aria-label');

  // AboutPage patch notes card
  const aboutCode = fs.readFileSync(path.join(ROOT_DIR, 'src/pages/AboutPage.tsx'), 'utf8');
  assert(aboutCode.includes('<button') && aboutCode.includes('onClick={openPatchNotes}'), 'AboutPage patch notes trigger must be a semantic <button>');

  // SearchPalette results
  const searchCode = fs.readFileSync(path.join(ROOT_DIR, 'src/components/ui/SearchPalette.tsx'), 'utf8');
  assert(searchCode.includes('role="button"') && searchCode.includes('tabIndex={0}'), 'SearchPalette items must be keyboard accessible with role="button"');

  // MateriHubPage cards
  const materiCode = fs.readFileSync(path.join(ROOT_DIR, 'src/pages/MateriHubPage.tsx'), 'utf8');
  assert(materiCode.includes('role="button"') && materiCode.includes('tabIndex={0}'), 'MateriHubPage cards must declare role="button" and tabIndex={0}');
  assert(materiCode.includes("e.key === 'Enter' || e.key === ' '"), 'MateriHubPage cards must handle Enter and Space key activation');
});

// ── T-218: WCAG 2.1 AA Contrast Ratios & Visual Focus Rings ──
test('T-218: CSS tokens elevate light mode contrast >= 4.5:1 AA and enforce universal :focus-visible rings', () => {
  const cssCode = fs.readFileSync(path.join(ROOT_DIR, 'src/index.css'), 'utf8');

  // Verify elevated contrast tokens
  assert(cssCode.includes('--text-muted: rgba(45, 35, 25, 0.82)'), 'Light mode text-muted contrast token must be elevated');
  assert(cssCode.includes('--text-dim: rgba(45, 35, 25, 0.65)'), 'Light mode text-dim contrast token must be elevated');
  assert(cssCode.includes('--accent: #B45309'), 'Light mode accent token must meet AA 4.5:1 contrast');
  assert(cssCode.includes('--accent-hot: #92400E'), 'Light mode accent-hot token must meet AA contrast');

  // Verify universal :focus-visible rules
  assert(cssCode.includes(':focus-visible') && cssCode.includes('*:focus-visible'), 'index.css must include universal *:focus-visible selector');
  assert(cssCode.includes('outline: 2px solid var(--accent)'), 'focus-visible outline must be 2px accent');
  assert(cssCode.includes('outline-offset: 2px'), 'focus-visible outline offset must be 2px');
});

// ── T-219: Screen Reader Semantics & Japanese Language Tagging (lang="ja") ──
test('T-219: Screen reader semantics, landmarks, and lang="ja" tags are embedded across Japanese text', () => {
  // Japanese text components
  const jpFormatCode = fs.readFileSync(path.join(ROOT_DIR, 'src/components/ui/JapaneseFormattedText.tsx'), 'utf8');
  assert(jpFormatCode.includes('lang="ja"'), 'JapaneseFormattedText must declare lang="ja"');

  const rubyCode = fs.readFileSync(path.join(ROOT_DIR, 'src/components/ui/RubyText.tsx'), 'utf8');
  assert(rubyCode.includes('lang="ja"'), 'RubyText must declare lang="ja"');

  const kanaCode = fs.readFileSync(path.join(ROOT_DIR, 'src/components/kana/KanaChartModal.tsx'), 'utf8');
  assert(kanaCode.includes('lang="ja"'), 'KanaChartModal must declare lang="ja" on kana cards');

  const nuanceCode = fs.readFileSync(path.join(ROOT_DIR, 'src/components/grammar/NuanceCompareModal.tsx'), 'utf8');
  assert(nuanceCode.includes('lang="ja"'), 'NuanceCompareModal must declare lang="ja"');

  const kotowazaCode = fs.readFileSync(path.join(ROOT_DIR, 'src/components/kotowaza/KotowazaModal.tsx'), 'utf8');
  assert(kotowazaCode.includes('lang="ja"'), 'KotowazaModal must declare lang="ja"');

  const sidebarCode = fs.readFileSync(path.join(ROOT_DIR, 'src/components/layout/Sidebar.tsx'), 'utf8');
  assert(sidebarCode.includes('lang="ja"'), 'Sidebar Japanese labels must declare lang="ja"');

  // Verify ARIA modal and dialog declarations
  assert(nuanceCode.includes('role="dialog"') && nuanceCode.includes('aria-modal="true"'), 'NuanceCompareModal must declare role="dialog" aria-modal="true"');
  assert(kotowazaCode.includes('role="dialog"') && kotowazaCode.includes('aria-modal="true"'), 'KotowazaModal must declare role="dialog" aria-modal="true"');
  const catCode = fs.readFileSync(path.join(ROOT_DIR, 'src/components/cat/CatPlacementModal.tsx'), 'utf8');
  assert(catCode.includes('role="dialog"') && catCode.includes('aria-modal="true"'), 'CatPlacementModal must declare role="dialog" aria-modal="true"');
});

// ── T-220: Universal Touch Target Cushioning (>= 44px) ──
test('T-220: Universal touch targets >= 44px enforced across close buttons, audio triggers and drawer buttons', () => {
  const headerCode = fs.readFileSync(path.join(ROOT_DIR, 'src/components/layout/Header.tsx'), 'utf8');
  assert(headerCode.includes('min-w-[44px] min-h-[44px]'), 'Header drawer button must be at least 44px');

  const kanaCode = fs.readFileSync(path.join(ROOT_DIR, 'src/components/kana/KanaChartModal.tsx'), 'utf8');
  assert(kanaCode.includes('min-w-[44px] min-h-[44px]') && kanaCode.includes('w-11 h-11'), 'KanaChartModal close button must be at least 44px');

  const detailCode = fs.readFileSync(path.join(ROOT_DIR, 'src/components/ui/DetailModal.tsx'), 'utf8');
  assert(detailCode.includes('min-w-[44px] min-h-[44px]') && detailCode.includes('w-11 h-11'), 'DetailModal close button must be at least 44px');

  const conjCode = fs.readFileSync(path.join(ROOT_DIR, 'src/components/grammar/ConjugationModal.tsx'), 'utf8');
  assert(conjCode.includes('min-w-[44px] min-h-[44px]') && conjCode.includes('w-11 h-11'), 'ConjugationModal close button must be at least 44px');

  const nuanceCode = fs.readFileSync(path.join(ROOT_DIR, 'src/components/grammar/NuanceCompareModal.tsx'), 'utf8');
  assert(nuanceCode.includes('min-w-[44px] min-h-[44px]') && nuanceCode.includes('w-11 h-11'), 'NuanceCompareModal close button must be at least 44px');

  const kotowazaCode = fs.readFileSync(path.join(ROOT_DIR, 'src/components/kotowaza/KotowazaModal.tsx'), 'utf8');
  assert(kotowazaCode.includes('min-w-[44px] min-h-[44px]') && kotowazaCode.includes('w-11 h-11'), 'KotowazaModal close button must be at least 44px');

  const toolboxCode = fs.readFileSync(path.join(ROOT_DIR, 'src/components/tools/StudyToolboxModal.tsx'), 'utf8');
  assert(toolboxCode.includes('min-w-[44px] min-h-[44px]') && toolboxCode.includes('w-11 h-11'), 'StudyToolboxModal close button must be at least 44px');

  const patchCode = fs.readFileSync(path.join(ROOT_DIR, 'src/components/ui/PatchNotesModal.tsx'), 'utf8');
  assert(patchCode.includes('min-w-[44px] min-h-[44px]') && patchCode.includes('w-11 h-11'), 'PatchNotesModal close button must be at least 44px');

  const shortcutsCode = fs.readFileSync(path.join(ROOT_DIR, 'src/components/ui/KeyboardShortcutsModal.tsx'), 'utf8');
  assert(shortcutsCode.includes('min-w-[44px] min-h-[44px]') && shortcutsCode.includes('w-11 h-11'), 'KeyboardShortcutsModal close button must be at least 44px');

  const guideCode = fs.readFileSync(path.join(ROOT_DIR, 'src/components/ui/FeatureGuideModal.tsx'), 'utf8');
  assert(guideCode.includes('min-w-[44px] min-h-[44px]') && guideCode.includes('w-11 h-11'), 'FeatureGuideModal close button must be at least 44px');

  const reportCode = fs.readFileSync(path.join(ROOT_DIR, 'src/components/ui/ReportIssueModal.tsx'), 'utf8');
  assert(reportCode.includes('min-w-[44px] min-h-[44px]') && reportCode.includes('w-11 h-11'), 'ReportIssueModal close button must be at least 44px');

  const homeCode = fs.readFileSync(path.join(ROOT_DIR, 'src/pages/HomePage.tsx'), 'utf8');
  assert(
    homeCode.includes('w-11 h-11') && (homeCode.includes('min-w-[44px] min-h-[44px]') || homeCode.includes('sm:min-w-[44px] sm:min-h-[44px]')),
    'HomePage daily cards must have 44px audio/detail buttons'
  );

  const materiCode = fs.readFileSync(path.join(ROOT_DIR, 'src/pages/MateriHubPage.tsx'), 'utf8');
  assert(
    materiCode.includes('w-11 h-11') && (materiCode.includes('min-w-[44px] min-h-[44px]') || materiCode.includes('sm:min-w-[44px] sm:min-h-[44px]')),
    'MateriHubPage cards must have 44px audio buttons'
  );
});

// ── Summary Report ──
console.log('\n=============================================================');
console.log(`📊 SPRINT 40 TEST RESULTS: ${passedTests}/${totalTests} TESTS PASSED`);
console.log('=============================================================\n');

if (passedTests !== totalTests) {
  process.exit(1);
}
