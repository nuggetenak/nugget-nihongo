// ══════════════════════════════════════════════════════════════════
//  test-s3-pass7-utility-companion-modals.js — Siklus III Pass 7 Verification
//  Utility & Companion Modals, Legal Portals & Ergonomic Safeguards
// ══════════════════════════════════════════════════════════════════

import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('🛠️ [SIKLUS III PASS 7] Starting Utility & Companion Modals Verification...\n');

const ROOT = process.cwd();

// Helper to read file safely
function readFile(relPath) {
  const fullPath = path.join(ROOT, relPath);
  assert(fs.existsSync(fullPath), `Target file must exist: ${relPath}`);
  return fs.readFileSync(fullPath, 'utf8');
}

// ──────────────────────────────────────────────────────────────────
// Check 7.1: KeyboardShortcutsModal & SearchPalette Ergonomics, Lift & Irasutoya
// ──────────────────────────────────────────────────────────────────
{
  const shortcutsCode = readFile('src/components/ui/KeyboardShortcutsModal.tsx');
  const searchCode = readFile('src/components/ui/SearchPalette.tsx');

  // Shortcuts checks
  assert(shortcutsCode.includes('IrasutoyaImage'), 'Check 7.1: KeyboardShortcutsModal must import IrasutoyaImage');
  assert(shortcutsCode.includes('assetId="senpai_studying"'), 'Check 7.1: KeyboardShortcutsModal must embed senpai_studying avatar');
  assert(shortcutsCode.includes('animateFloat'), 'Check 7.1: KeyboardShortcutsModal senpai avatar must animate float');
  assert(shortcutsCode.includes('card-interactive-lift'), 'Check 7.1: KeyboardShortcutsModal shortcut cards must use card-interactive-lift');
  assert(shortcutsCode.includes('min-w-[44px] min-h-[44px]'), 'Check 7.1: KeyboardShortcutsModal close button must satisfy >= 40x40px touch rule');
  assert(shortcutsCode.includes('min-h-[40px]'), 'Check 7.1: KeyboardShortcutsModal Mengerti button must satisfy >= 40px touch rule');
  assert(shortcutsCode.includes('text-amber-800 dark:text-amber-400'), 'Check 7.1: KeyboardShortcutsModal group title must use high-contrast tokens');

  // SearchPalette checks
  assert(searchCode.includes('IrasutoyaImage'), 'Check 7.1: SearchPalette must import IrasutoyaImage');
  assert(searchCode.includes('assetId="senpai_studying"'), 'Check 7.1: SearchPalette must embed senpai_studying on empty prompt');
  assert(searchCode.includes('assetId="daruma_recovery"'), 'Check 7.1: SearchPalette must embed daruma_recovery on zero results');
  assert(searchCode.includes('card-interactive-lift p-3 rounded-2xl'), 'Check 7.1: SearchPalette result cards must use card-interactive-lift');
  assert(searchCode.includes('min-w-[40px] min-h-[40px]'), 'Check 7.1: SearchPalette volume button must have min-w-[40px] min-h-[40px]');

  console.log('✅ PASS [1/5]: KeyboardShortcutsModal & SearchPalette integrate Irasutoya, card-interactive-lift, and touch ergonomics');
}

// ──────────────────────────────────────────────────────────────────
// Check 7.2: DetailModal Dynamic JLPT Irasutoya, Audio Cushion & Lift
// ──────────────────────────────────────────────────────────────────
{
  const code = readFile('src/components/ui/DetailModal.tsx');

  assert(code.includes('IrasutoyaImage'), 'Check 7.2: DetailModal must import IrasutoyaImage');
  assert(code.includes('jlptAsset'), 'Check 7.2: DetailModal must compute dynamic JLPT level asset');
  assert(code.includes('jlpt_n1') && code.includes('jlpt_n5'), 'Check 7.2: DetailModal must map JLPT levels n1..n5 to assets');
  assert(code.includes('card-interactive-lift bg-surface-2 rounded-2xl'), 'Check 7.2: Meaning box must have card-interactive-lift');
  assert(code.includes('card-interactive-lift bg-surface-2/70'), 'Check 7.2: Example sentence cards must have card-interactive-lift');
  assert(code.includes('min-w-[40px] min-h-[40px]'), 'Check 7.2: Example sentence audio button must have min-w-[40px] min-h-[40px]');
  assert(code.includes('min-h-[44px] py-2.5 px-4 rounded-xl bg-accent'), 'Check 7.2: Arena kuis action button must satisfy min-h-[44px]');
  assert(code.includes('min-h-[40px] py-2 px-3'), 'Check 7.2: Report issue action button must satisfy min-h-[40px]');

  console.log('✅ PASS [2/5]: DetailModal integrates dynamic JLPT Irasutoya badge, card-interactive-lift, and audio touch cushions');
}

// ──────────────────────────────────────────────────────────────────
// Check 7.3: InstallModal Irasutoya, Benefit Card Lift & WCAG AA Contrast
// ──────────────────────────────────────────────────────────────────
{
  const code = readFile('src/components/ui/InstallModal.tsx');

  assert(code.includes('IrasutoyaImage'), 'Check 7.3: InstallModal must import IrasutoyaImage');
  assert(code.includes('assetId="senpai_studying"'), 'Check 7.3: InstallModal must embed senpai_studying companion');
  assert(code.includes('card-interactive-lift flex items-center gap-2.5'), 'Check 7.3: Benefit pills must use card-interactive-lift');
  assert(code.includes('text-amber-950 dark:text-amber-100'), 'Check 7.3: Header title must use WCAG AA dual-theme contrast tokens');
  assert(code.includes('text-amber-800 dark:text-amber-300 font-medium'), 'Check 7.3: Subtitle must use WCAG AA dual-theme contrast tokens');
  assert(code.includes('min-h-[44px]') && code.includes('min-w-[44px]'), 'Check 7.3: Close and install buttons must guarantee >= 40x40px touch padding');

  console.log('✅ PASS [3/5]: InstallModal embeds Irasutoya senpai, card-interactive-lift on benefit cards, and WCAG AA contrast tokens');
}

// ──────────────────────────────────────────────────────────────────
// Check 7.4: PatchNotesModal Version Elevation, Irasutoya & Contrast Tokens
// ──────────────────────────────────────────────────────────────────
{
  const code = readFile('src/components/ui/PatchNotesModal.tsx');

  assert(code.includes('IrasutoyaImage'), 'Check 7.4: PatchNotesModal must import IrasutoyaImage');
  assert(code.includes('assetId="senpai_studying"'), 'Check 7.4: PatchNotesModal must embed senpai_studying header avatar');
  assert(code.includes('card-interactive-lift rounded-2xl border'), 'Check 7.4: Release version cards must use card-interactive-lift');
  assert(code.includes('text-emerald-800 dark:text-emerald-300'), 'Check 7.4: Current version badge must use high-contrast WCAG AA tokens');
  assert(code.includes('text-amber-800 dark:text-amber-400'), 'Check 7.4: Tech tags must use high-contrast WCAG AA tokens');
  assert(code.includes('min-h-[40px] rounded-xl bg-accent'), 'Check 7.4: Close notes button must satisfy min-h-[40px]');

  console.log('✅ PASS [4/5]: PatchNotesModal integrates Irasutoya senpai, card-interactive-lift on release notes, and WCAG AA badges');
}

// ──────────────────────────────────────────────────────────────────
// Check 7.5: ReportIssueModal & LicenseAttributionModal Statutory Irasutoya
// ──────────────────────────────────────────────────────────────────
{
  const reportCode = readFile('src/components/ui/ReportIssueModal.tsx');
  const licenseCode = readFile('src/components/ui/LicenseAttributionModal.tsx');

  // ReportIssueModal checks
  assert(reportCode.includes('IrasutoyaImage'), 'Check 7.5: ReportIssueModal must import IrasutoyaImage');
  assert(reportCode.includes('assetId="daruma_recovery"'), 'Check 7.5: ReportIssueModal must embed daruma_recovery avatar');
  assert(reportCode.includes('card-interactive-lift p-3 rounded-xl border'), 'Check 7.5: Category cards must use card-interactive-lift');
  assert(reportCode.includes('min-h-[44px] rounded-xl bg-accent'), 'Check 7.5: Submit report button must have min-h-[44px]');

  // LicenseAttributionModal checks
  assert(licenseCode.includes('IrasutoyaImage'), 'Check 7.5: LicenseAttributionModal must import IrasutoyaImage');
  assert(licenseCode.includes('assetId="zen_tatami"'), 'Check 7.5: LicenseAttributionModal must embed zen_tatami avatar');
  assert(licenseCode.includes('card-interactive-lift p-4 rounded-2xl'), 'Check 7.5: Attribution cards must use card-interactive-lift');
  assert(licenseCode.includes('https://www.irasutoya.com/'), 'Check 7.5: Statutory attribution must include Takashi Mifune Irasutoya URL');
  assert(licenseCode.includes('みふねたかし'), 'Check 7.5: Statutory attribution must recognize Takashi Mifune');
  assert(licenseCode.includes('min-h-[44px]'), 'Check 7.5: Close button must guarantee min-h-[44px]');

  console.log('✅ PASS [5/5]: ReportIssueModal & LicenseAttributionModal embed Irasutoya Daruma/Tatami, card lift, and statutory attribution');
}

console.log('\n🏆 [SIKLUS III PASS 7] All 5/5 Utility & Companion Modals Checks PASSED 100% GREEN!\n');
