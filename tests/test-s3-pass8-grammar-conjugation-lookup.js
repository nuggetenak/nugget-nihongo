// ══════════════════════════════════════════════════════════════════
//  test-s3-pass8-grammar-conjugation-lookup.js — Siklus III Pass 8 Verification
//  Interactive Grammar, Inflection Matrix, Yomitan Lookup & Reset Dialog
// ══════════════════════════════════════════════════════════════════

import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('📖 [SIKLUS III PASS 8] Starting Grammar, Conjugation & Lookup Verification...\n');

const ROOT = process.cwd();

// Helper to read file safely
function readFile(relPath) {
  const fullPath = path.join(ROOT, relPath);
  assert(fs.existsSync(fullPath), `Target file must exist: ${relPath}`);
  return fs.readFileSync(fullPath, 'utf8');
}

// ──────────────────────────────────────────────────────────────────
// Check 8.1: ConjugationModal Irasutoya, Audio Padding & Lift
// ──────────────────────────────────────────────────────────────────
{
  const code = readFile('src/components/grammar/ConjugationModal.tsx');

  assert(code.includes('IrasutoyaImage'), 'Check 8.1: ConjugationModal must import IrasutoyaImage');
  assert(code.includes('assetId="senpai_studying"'), 'Check 8.1: ConjugationModal must embed senpai_studying avatar');
  assert(code.includes('animateFloat'), 'Check 8.1: Senpai avatar must animate float');
  assert(code.includes('card-interactive-lift p-3 sm:p-3.5 rounded-xl'), 'Check 8.1: Inflection rows must have card-interactive-lift');
  assert(code.includes('w-10 h-10 min-w-[40px] min-h-[40px]'), 'Check 8.1: Conjugation audio buttons must have min-w-[40px] min-h-[40px]');
  assert(code.includes('min-h-[40px] rounded-xl bg-accent'), 'Check 8.1: Cek Konjugasi button must have min-h-[40px]');
  assert(code.includes('text-amber-800 dark:text-amber-400'), 'Check 8.1: Row labels must use high-contrast tokens');

  console.log('✅ PASS [1/5]: ConjugationModal integrates Irasutoya senpai, card-interactive-lift, and audio touch ergonomics');
}

// ──────────────────────────────────────────────────────────────────
// Check 8.2: NuanceCompareModal Irasutoya, Elimination of py-0.2 & Lift
// ──────────────────────────────────────────────────────────────────
{
  const code = readFile('src/components/grammar/NuanceCompareModal.tsx');

  assert(code.includes('IrasutoyaImage'), 'Check 8.2: NuanceCompareModal must import IrasutoyaImage');
  assert(code.includes('assetId="sensei_teaching"'), 'Check 8.2: NuanceCompareModal must embed sensei_teaching avatar');
  assert(!code.includes('py-0.2'), 'Check 8.2: NuanceCompareModal must NOT contain illegal Tailwind py-0.2');
  assert(code.includes('py-0.5'), 'Check 8.2: NuanceCompareModal level badge must use valid py-0.5');
  assert(code.includes('card-interactive-lift bg-surface-2 border border-accent/25'), 'Check 8.2: Pattern A/B boxes must have card-interactive-lift');
  assert(code.includes('w-10 h-10 min-w-[40px] min-h-[40px]'), 'Check 8.2: Example sentence audio buttons must satisfy universal >= 40x40px touch rule');

  console.log('✅ PASS [2/5]: NuanceCompareModal embeds Irasutoya Sensei, purges py-0.2, and enforces universal touch padding');
}

// ──────────────────────────────────────────────────────────────────
// Check 8.3: NuanceCompareModal WCAG AA Dual-Theme Contrast Tokens
// ──────────────────────────────────────────────────────────────────
{
  const code = readFile('src/components/grammar/NuanceCompareModal.tsx');

  assert(code.includes('text-blue-800 dark:text-blue-300'), 'Check 8.3: Pattern A badge must use WCAG AA dual-theme contrast tokens');
  assert(code.includes('text-emerald-800 dark:text-emerald-300'), 'Check 8.3: Pattern B badge must use WCAG AA dual-theme contrast tokens');
  assert(code.includes('text-amber-800 dark:text-amber-400') && code.includes('font-extrabold'), 'Check 8.3: Core Distinction header must use high contrast tokens');
  assert(code.includes('text-rose-800 dark:text-rose-300') && code.includes('font-extrabold'), 'Check 8.3: JLPT Trap Warning header must use high contrast tokens');

  console.log('✅ PASS [3/5]: NuanceCompareModal enforces WCAG AA dual-theme contrast tokens across Pattern A/B, Core & Traps');
}

// ──────────────────────────────────────────────────────────────────
// Check 8.4: WordLookupSheet Irasutoya, Touch Ergonomics & Card Lift
// ──────────────────────────────────────────────────────────────────
{
  const code = readFile('src/components/modals/WordLookupSheet.tsx');

  assert(code.includes('IrasutoyaImage'), 'Check 8.4: WordLookupSheet must import IrasutoyaImage');
  assert(code.includes('assetId="senpai_studying"'), 'Check 8.4: WordLookupSheet must embed senpai_studying in header');
  assert(code.includes('assetId="daruma_recovery"'), 'Check 8.4: WordLookupSheet must embed daruma_recovery in empty state');
  assert(code.includes('card-interactive-lift bg-surface-2 rounded-2xl'), 'Check 8.4: Exact match card must have card-interactive-lift');
  assert(code.includes('card-interactive-lift p-3.5 rounded-xl bg-amber-500/10'), 'Check 8.4: Yomitan deinflection cards must have card-interactive-lift');
  assert(code.includes('min-w-[40px] min-h-[40px]'), 'Check 8.4: Word audio trigger must guarantee min-w-[40px] min-h-[40px]');
  assert(code.includes('min-w-[44px] min-h-[44px]'), 'Check 8.4: Close button must satisfy min-w-[44px] min-h-[44px]');

  console.log('✅ PASS [4/5]: WordLookupSheet integrates Irasutoya Senpai/Daruma, card-interactive-lift, and touch padding');
}

// ──────────────────────────────────────────────────────────────────
// Check 8.5: ResetConfirmationModal Daruma Anchor, Close Cushion & Lift
// ──────────────────────────────────────────────────────────────────
{
  const code = readFile('src/components/modals/ResetConfirmationModal.tsx');

  assert(code.includes('IrasutoyaImage'), 'Check 8.5: ResetConfirmationModal must import IrasutoyaImage');
  assert(code.includes('assetId="daruma_recovery"'), 'Check 8.5: ResetConfirmationModal must embed daruma_recovery avatar');
  assert(code.includes('animatePop'), 'Check 8.5: Daruma recovery avatar must animatePop');
  assert(code.includes('w-10 h-10 min-w-[40px] min-h-[40px]'), 'Check 8.5: Close button must be upgraded to min-w-[40px] min-h-[40px]');
  assert(code.includes('text-rose-700 dark:text-rose-400') && code.includes('font-black'), 'Check 8.5: Modal title must use high contrast rose tokens');
  assert(code.includes('card-interactive-lift p-3.5 rounded-xl bg-red-500/15'), 'Check 8.5: Warning callout card must use card-interactive-lift');
  assert(code.includes('min-h-[44px]'), 'Check 8.5: Action buttons must guarantee min-h-[44px]');

  console.log('✅ PASS [5/5]: ResetConfirmationModal embeds Irasutoya Daruma, >= 40px close button, card lift, and contrast tokens');
}

console.log('\n🏆 [SIKLUS III PASS 8] All 5/5 Grammar, Conjugation & Lookup Checks PASSED 100% GREEN!\n');
