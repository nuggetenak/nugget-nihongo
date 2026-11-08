// ══════════════════════════════════════════════════════════════════
//  test-s2-pass13-star-scramble-drills.js
//  Verification Suite: Siklus II — Pass 13
//  Authentic Drill Mechanics, Star Scramble Token Synchronization,
//  Z-Index Layering & Ergonomic Touch Dimensions
// ══════════════════════════════════════════════════════════════════

import fs from 'fs';
import path from 'path';
import assert from 'assert';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

console.log('🧪 [Siklus II — Pass 13] Testing Star Scramble, Authentic Drills & Sentence Reordering...');

// ─────────────────────────────────────────────────────────────
// Check 13.1: StarScrambleWidget High-Contrast WCAG Tokens
// ─────────────────────────────────────────────────────────────
console.log('  ▸ Check 13.1: StarScrambleWidget High-Contrast Dual-Theme Tokens');
{
  const widgetPath = path.join(ROOT, 'src/components/exercise/StarScrambleWidget.tsx');
  const widgetCode = fs.readFileSync(widgetPath, 'utf8');

  // Verify header text contrast
  assert(
    widgetCode.includes('text-amber-800 dark:text-amber-400 font-bold'),
    'StarScrambleWidget must use high-contrast dual-theme amber token in header'
  );

  // Verify selected token indicator contrast
  assert(
    widgetCode.includes('text-amber-800 dark:text-amber-400 font-mono font-bold'),
    'StarScrambleWidget must use high-contrast token for selected slot indicator'
  );

  // Verify selected radio option contrast
  assert(
    widgetCode.includes('text-amber-900 dark:text-amber-300 font-bold'),
    'StarScrambleWidget must use high-contrast text-amber-900 dark:text-amber-300 font-bold for selected option'
  );

  // Ensure raw low-contrast text-amber-300 is eliminated from options text
  assert(
    !widgetCode.includes("text-amber-300 shadow-sm"),
    'Must eliminate raw low-contrast text-amber-300 from option button'
  );

  console.log('    ✓ Check 13.1 Passed: StarScrambleWidget WCAG AA contrast tokens verified.');
}

// ─────────────────────────────────────────────────────────────
// Check 13.2: Star Slot Deselection & Clear Sync Architecture
// ─────────────────────────────────────────────────────────────
console.log('  ▸ Check 13.2: Star Slot Deselection & Empty State Sync');
{
  const widgetPath = path.join(ROOT, 'src/components/exercise/StarScrambleWidget.tsx');
  const storePath = path.join(ROOT, 'src/store/useExerciseStore.ts');
  const widgetCode = fs.readFileSync(widgetPath, 'utf8');
  const storeCode = fs.readFileSync(storePath, 'utf8');

  // Widget must clear selection when star slot is emptied
  assert(
    widgetCode.includes('onSelectOption(-1)'),
    'StarScrambleWidget must call onSelectOption(-1) when star slot is cleared or reset'
  );

  // Store must handle optionIndex < 0 by deleting answer
  assert(
    storeCode.includes('if (optionIndex < 0)') && storeCode.includes('delete newAnswers[questionIndex]'),
    'useExerciseStore must delete answer key when optionIndex < 0'
  );

  // updateStarScramble must clear selection if star token is empty
  assert(
    storeCode.includes("get().selectOption(questionIndex, -1)"),
    'updateStarScramble must clear selection when tokenAtStar is null'
  );

  console.log('    ✓ Check 13.2 Passed: Star slot clearing and option deselection sync verified.');
}

// ─────────────────────────────────────────────────────────────
// Check 13.3: CbtRunnerScreen Z-Index & Body Scroll Lock
// ─────────────────────────────────────────────────────────────
console.log('  ▸ Check 13.3: CbtRunnerScreen Z-Index Integrity & Body Scroll Lock');
{
  const runnerPath = path.join(ROOT, 'src/components/exercise/CbtRunnerScreen.tsx');
  const runnerCode = fs.readFileSync(runnerPath, 'utf8');

  // Verify extreme z-indexes eliminated
  assert(!runnerCode.includes('z-[9999]'), 'CbtRunnerScreen must eliminate z-[9999]');
  assert(!runnerCode.includes('z-[99999]'), 'CbtRunnerScreen must eliminate z-[99999]');

  // Verify body scroll lock is imported and invoked
  assert(runnerCode.includes('useBodyScrollLock'), 'CbtRunnerScreen must import useBodyScrollLock');
  assert(runnerCode.includes('useBodyScrollLock(true)'), 'CbtRunnerScreen must lock body scroll during test session');

  // Verify high contrast tokens in header & options
  assert(
    runnerCode.includes('text-amber-800 dark:text-amber-400 font-bold truncate'),
    'CbtRunnerScreen must use high-contrast token in set title header'
  );
  assert(
    runnerCode.includes('text-amber-900 dark:text-amber-300 font-bold shadow-sm'),
    'CbtRunnerScreen must use high-contrast text-amber-900 dark:text-amber-300 font-bold in multiple choice options'
  );

  console.log('    ✓ Check 13.3 Passed: CbtRunnerScreen z-index layering and scroll lock verified.');
}

// ─────────────────────────────────────────────────────────────
// Check 13.4: AuthenticDrillModal Ergonomics & Keyboard Accessibility
// ─────────────────────────────────────────────────────────────
console.log('  ▸ Check 13.4: AuthenticDrillModal Ergonomics & Keyboard Accessibility');
{
  const modalPath = path.join(ROOT, 'src/components/materi/AuthenticDrillModal.tsx');
  const modalCode = fs.readFileSync(modalPath, 'utf8');

  // Verify body scroll lock
  assert(modalCode.includes('useBodyScrollLock(isOpen)'), 'AuthenticDrillModal must lock body scroll when open');

  // Verify Escape key dismissal
  assert(modalCode.includes("e.key === 'Escape'"), 'AuthenticDrillModal must listen for Escape key to close');

  // Verify close button touch target standard (>= 40px)
  assert(
    modalCode.includes('min-h-[40px] min-w-[40px]'),
    'AuthenticDrillModal close button must satisfy min-h-[40px] min-w-[40px]'
  );

  // Verify high-contrast situational and option tokens
  assert(
    modalCode.includes('text-amber-800 dark:text-amber-300 font-bold'),
    'AuthenticDrillModal must use high-contrast text-amber-800 dark:text-amber-300 font-bold for situation'
  );
  assert(
    modalCode.includes('text-emerald-700 dark:text-emerald-300 font-bold'),
    'AuthenticDrillModal must use high-contrast emerald token for correct answers'
  );
  assert(
    modalCode.includes('text-rose-700 dark:text-rose-300 font-bold'),
    'AuthenticDrillModal must use high-contrast rose token for incorrect answers'
  );

  console.log('    ✓ Check 13.4 Passed: AuthenticDrillModal touch targets, Escape listener and tokens verified.');
}

// ─────────────────────────────────────────────────────────────
// Check 13.5: QuizPage Rearrange Ergonomics & Authentic Manager
// ─────────────────────────────────────────────────────────────
console.log('  ▸ Check 13.5: QuizPage Rearrange Ergonomics & Authentic Manager');
{
  const quizPath = path.join(ROOT, 'src/pages/QuizPage.tsx');
  const managerPath = path.join(ROOT, 'src/lib/data/authenticExerciseManager.ts');
  const quizCode = fs.readFileSync(quizPath, 'utf8');
  const managerCode = fs.readFileSync(managerPath, 'utf8');

  // Verify sentence rearrange report button touch target
  assert(
    quizCode.includes('w-10 h-10 min-h-[40px] min-w-[40px]') && quizCode.includes('Laporkan keanehan susunan kalimat'),
    'QuizPage sentence rearrange report trigger must enforce >= 40px touch target'
  );

  // Verify reset sentence button high contrast
  assert(
    quizCode.includes('text-amber-800 dark:text-amber-400 font-bold hover:text-accent'),
    'QuizPage sentence rearrange reset button must use high-contrast text-amber-800 dark:text-amber-400 font-bold'
  );

  // Verify authenticExerciseManager normalizes options from tokens/scrambled_tokens
  assert(
    managerCode.includes('d.scrambled_tokens && d.scrambled_tokens.length > 0'),
    'authenticExerciseManager must fall back to scrambled_tokens when options is missing'
  );

  console.log('    ✓ Check 13.5 Passed: QuizPage rearrange ergonomics and authentic exercise manager verified.');
}

console.log('\n🎉 [Siklus II — Pass 13] All 5 Checks PASSED! Authentic Drill & Star Scramble systems fully verified.\n');
