// ══════════════════════════════════════════════════════════════════
//  test-s7-sprint22-layer6-institutional.js
//  Sprint 22: Lapisan 6 / Layer Terakhir: Two-Wing Institutional Architecture & Community Gateway
//  Validates:
//  1. AboutPage Two-Wing Institutional Architecture & Humanized Philosophy
//  2. MethodologyPage Epistemic Boundaries, FSRS v4.5 Visualizer & Persona Matrix
//  3. CommunityHubModal Study Lounge, Daily Kanji Challenge & Official Portals
//  4. PatchNotesModal Release Notes & Dual Mode (Friendly / Technical)
//  5. ModalErrorBoundary Modal Crash Guard Architecture
//  6. ReportIssueModal In-App Content Error Feedback & Data Scrubbing
//  7. KeyboardShortcutsModal Desktop Productivity Accelerators
//  8. LicenseAttributionModal Statutory Open-Source Legal Attribution
//  9. Universal Multi-Device Ergonomics & Mobile Safe-Area Cushions
//  10. Zero Micro-Fonts Invariant Across All Lapisan 6 Components (>= 12px / text-xs)
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT_DIR = path.resolve(__dirname, '..');

function readSrc(relPath) {
  return fs.readFileSync(path.join(ROOT_DIR, relPath), 'utf8');
}

console.log('🧪 Starting Sprint 22: Lapisan 6 Institutional Architecture & Community Gateway Suite...\n');

let passCount = 0;

function runCheck(desc, fn) {
  process.stdout.write(`  ▶ ${desc}... `);
  try {
    fn();
    console.log('✅ PASS');
    passCount++;
  } catch (err) {
    console.log('❌ FAIL');
    console.error(`    Error: ${err.message}`);
    process.exit(1);
  }
}

// ── Check 1: AboutPage Two-Wing Institutional Architecture ──
runCheck('AboutPage Two-Wing Institutional Architecture & Ergonomics', () => {
  const code = readSrc('src/pages/AboutPage.tsx');
  assert(code.includes('APP_VERSION'), 'Must declare APP_VERSION');
  assert(code.includes('APP_RELEASE_NAME'), 'Must declare APP_RELEASE_NAME');
  assert(code.includes('openOnboarding'), 'Must have onboarding tour trigger');
  assert(code.includes('openFeatureGuide'), 'Must have feature guide trigger');
  assert(code.includes('openPatchNotes'), 'Must have patch notes trigger');
  assert(code.includes('min-h-[44px]'), 'Primary buttons must be min-h-[44px]');
  assert(code.includes('FAQ_LIST'), 'Must provide comprehensive FAQ list');
  assert(code.includes('min-h-[40px]'), 'FAQ category pills must enforce min-h-[40px]');
  assert(code.includes('active:scale-95'), 'FAQ buttons must have touch feedback');
  assert(code.includes('LicenseAttributionModal'), 'Must mount LicenseAttributionModal');
  assert(code.includes('pb-[calc(5.5rem+env(safe-area-inset-bottom))]'), 'Must cushion safe area bottom');
});

// ── Check 2: MethodologyPage Epistemic Boundaries & Research Rigor ──
runCheck('MethodologyPage Epistemic Boundaries & FSRS Visualizer', () => {
  const code = readSrc('src/pages/MethodologyPage.tsx');
  assert(code.includes('CONFLICT_RESOLUTIONS'), 'Must define theoretical conflict resolutions (CONF-01 to CONF-04)');
  assert(code.includes('SAMPLE_PERSONAS'), 'Must provide 200 personas sample matrix');
  assert(code.includes('BIBTEX_CODE'), 'Must provide official BibTeX citation');
  assert(code.includes('copyBibtex'), 'Must support one-click BibTeX copying');
  assert(code.includes('fsrsStabilityDays'), 'Must feature interactive FSRS stability simulator');
  assert(code.includes('fsrsElapsedDays'), 'Must feature interactive FSRS elapsed days slider');
  assert(code.includes('retrievabilityPercent'), 'Must compute live retrievability percentage');
  assert(code.includes('min-h-[40px]'), 'Pillar filters and copy button must enforce min-h-[40px]');
  assert(code.includes('active:scale-95'), 'Buttons must feature active:scale-95 touch feedback');
  assert(code.includes('pb-[calc(5.5rem+env(safe-area-inset-bottom))]'), 'Must maintain safe-area bottom cushion');
});

// ── Check 3: CommunityHubModal Official Gateway & Daily Kanji ──
runCheck('CommunityHubModal Official Gateway & Daily Kanji Challenge', () => {
  const code = readSrc('src/components/community/CommunityHubModal.tsx');
  assert(code.includes('useFocusTrap'), 'Must trap keyboard focus');
  assert(code.includes('useBodyScrollLock'), 'Must lock body scroll');
  assert(code.includes('DAILY_KANJI'), 'Must provide daily kanji challenge rotation');
  assert(code.includes('handleShareChallenge'), 'Must support Web Share API and clipboard copy');
  assert(code.includes('@NuggetNihongo'), 'Must link to official X @NuggetNihongo');
  assert(code.includes('trakteer.id/nugget-nihongo'), 'Must link to official Trakteer support');
  assert(code.includes('nuggetnihongo@gmail.com'), 'Must provide official email link');
  assert(code.includes('handleToggleUpvote'), 'Must support local mnemonic bookmarking / upvoting');
  assert(code.includes('min-h-[40px]'), 'Action buttons must enforce min-h-[40px]');
});

// ── Check 4: PatchNotesModal Versioning Transparency ──
runCheck('PatchNotesModal Versioning Transparency & Dual Mode', () => {
  const code = readSrc('src/components/ui/PatchNotesModal.tsx');
  assert(code.includes('useFocusTrap'), 'Must trap focus');
  assert(code.includes('useBodyScrollLock'), 'Must lock body scroll');
  assert(code.includes('PATCH_NOTES_HISTORY'), 'Must import patch notes history');
  assert(code.includes('showTechnical'), 'Must support toggle between friendly and technical dev notes');
  assert(code.includes('min-h-[40px]'), 'Filter pills must enforce min-h-[40px]');
  assert(code.includes('active:scale-95'), 'Interactive elements must feature active scale feedback');
});

// ── Check 5: ModalErrorBoundary Modal Crash Guard ──
runCheck('ModalErrorBoundary Portal Crash Guard Architecture', () => {
  const code = readSrc('src/components/ui/ModalErrorBoundary.tsx');
  assert(code.includes('getDerivedStateFromError'), 'Must implement React Error Boundary lifecycle');
  assert(code.includes('componentDidCatch'), 'Must catch and report modal exceptions');
  assert(code.includes('errorReporter'), 'Must report to telemetry errorReporter');
  assert(code.includes('diagnostics'), 'Must write to diagnostics logger');
  assert(code.includes('lockBodyScroll'), 'Must manage body scroll on crash');
  assert(code.includes('min-h-[44px]'), 'Dismiss button must be min-h-[44px]');
  assert(code.includes('active:scale-95'), 'Dismiss button must have active scale feedback');
});

// ── Check 6: ReportIssueModal In-App Content Error Reporting ──
runCheck('ReportIssueModal Content Error Feedback & Data Scrubbing', () => {
  const code = readSrc('src/components/ui/ReportIssueModal.tsx');
  assert(code.includes('useFocusTrap'), 'Must trap focus');
  assert(code.includes('useBodyScrollLock'), 'Must lock body scroll');
  assert(code.includes('CATEGORIES'), 'Must provide 6 error categories');
  assert(code.includes('scrubSensitiveData'), 'Must scrub sensitive data before submitting report');
  assert(code.includes('min-h-[44px]'), 'Submit and cancel buttons must enforce min-h-[44px]');
  assert(code.includes('active:scale-95'), 'Action buttons must have active scale feedback');
});

// ── Check 7: KeyboardShortcutsModal Desktop Accelerators ──
runCheck('KeyboardShortcutsModal Desktop Productivity Accelerators', () => {
  const code = readSrc('src/components/ui/KeyboardShortcutsModal.tsx');
  assert(code.includes('useFocusTrap'), 'Must trap focus');
  assert(code.includes('shortcutGroups'), 'Must organize shortcuts into logical groups');
  assert(code.includes('min-h-[40px]'), 'Action buttons must enforce min-h-[40px]');
  assert(code.includes('active:scale-95'), 'Action buttons must have active scale feedback');
});

// ── Check 8: LicenseAttributionModal Statutory Open-Source Attribution ──
runCheck('LicenseAttributionModal Statutory Legal Attribution', () => {
  const code = readSrc('src/components/ui/LicenseAttributionModal.tsx');
  assert(code.includes('useFocusTrap'), 'Must trap focus');
  assert(code.includes('useBodyScrollLock'), 'Must lock body scroll');
  assert(code.includes('ATTRIBUTIONS'), 'Must declare full statutory attribution entries');
  assert(code.includes('Irasutoya by Takashi Mifune'), 'Must credit Irasutoya by Takashi Mifune');
  assert(code.includes('EDRDG'), 'Must credit EDRDG JMdict/KANJIDIC2');
  assert(code.includes('KanjiVG'), 'Must credit Ulrich Apel KanjiVG');
  assert(code.includes('Tatoeba'), 'Must credit Tatoeba');
  assert(code.includes('OJAD'), 'Must credit OJAD / Wadoku');
  assert(code.includes('Google BudouX'), 'Must credit Google BudouX');
  assert(code.includes('Kuromoji.js'), 'Must credit Kuromoji.js');
  assert(code.includes('FSRS Engine'), 'Must credit Jarrett Ye & FSRS');
  assert(code.includes('min-h-[44px]'), 'Close button must enforce min-h-[44px]');
});

// ── Check 9: Universal Multi-Device Ergonomics & Mobile Safe Areas ──
runCheck('Universal Multi-Device Ergonomics & Safe Area Padding', () => {
  const aboutCode = readSrc('src/pages/AboutPage.tsx');
  assert(aboutCode.includes('pb-[calc(5.5rem+env(safe-area-inset-bottom))]'), 'AboutPage safe area bottom cushion');

  const methodologyCode = readSrc('src/pages/MethodologyPage.tsx');
  assert(methodologyCode.includes('pb-[calc(5.5rem+env(safe-area-inset-bottom))]'), 'MethodologyPage safe area bottom cushion');

  const communityCode = readSrc('src/components/community/CommunityHubModal.tsx');
  assert(communityCode.includes('max-h-[90dvh]'), 'Community modal must respect mobile max height');
  assert(communityCode.includes('pb-[calc(2rem+env(safe-area-inset-bottom))]'), 'Community modal safe area bottom cushion');

  const patchCode = readSrc('src/components/ui/PatchNotesModal.tsx');
  assert(patchCode.includes('max-h-[90dvh]'), 'Patch notes modal must respect mobile max height');

  const reportCode = readSrc('src/components/ui/ReportIssueModal.tsx');
  assert(reportCode.includes('max-h-[88dvh]'), 'Report modal must respect mobile max height');

  const licenseCode = readSrc('src/components/ui/LicenseAttributionModal.tsx');
  assert(licenseCode.includes('max-h-[88dvh]'), 'License modal must respect mobile max height');
});

// ── Check 10: Zero Micro-Fonts Invariant Across All Lapisan 6 Components ──
runCheck('Zero Micro-Fonts Across All Lapisan 6 Components (>= 12px / text-xs)', () => {
  const targetFiles = [
    'src/pages/AboutPage.tsx',
    'src/pages/MethodologyPage.tsx',
    'src/components/community/CommunityHubModal.tsx',
    'src/components/ui/PatchNotesModal.tsx',
    'src/components/ui/ReportIssueModal.tsx',
    'src/components/ui/ModalErrorBoundary.tsx',
    'src/components/ui/KeyboardShortcutsModal.tsx',
    'src/components/ui/LicenseAttributionModal.tsx',
  ];

  const microFontRegex = /text-\[(?:[1-9]|1[0-1])(?:\.[0-9]+)?px\]/g;
  const violations = [];

  for (const relFile of targetFiles) {
    const code = readSrc(relFile);
    const matches = code.match(microFontRegex);
    if (matches) {
      violations.push(`${relFile}: found micro-font classes: ${matches.join(', ')}`);
    }
  }

  assert(
    violations.length === 0,
    `Micro-font invariant violated in Lapisan 6:\n${violations.join('\n')}`
  );
});

console.log(`\n🎉 ALL ${passCount} SPRINT 22 CHECKS PASSED 100% GREEN! LAPISAN 6 IS FULLY VERIFIED!\n`);
