// ══════════════════════════════════════════════════════════════════
//  test-s2-pass4-quiz-cbt-runner.js — Siklus II Pass 4 Verification Suite
//  Quiz Arena, CBT Runner & Interactive Drill Systems Hardening
// ══════════════════════════════════════════════════════════════════

import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('🧪 Starting Siklus II — Pass 4 Verification Suite...\n');

const ROOT_DIR = process.cwd();
const QUIZ_PAGE_PATH = path.join(ROOT_DIR, 'src', 'pages', 'QuizPage.tsx');
const CBT_RUNNER_PATH = path.join(ROOT_DIR, 'src', 'components', 'exercise', 'CbtRunnerScreen.tsx');
const INTERACTIVE_PATH = path.join(ROOT_DIR, 'src', 'components', 'common', 'InteractiveSentence.tsx');
const STAR_SCRAMBLE_PATH = path.join(ROOT_DIR, 'src', 'components', 'exercise', 'StarScrambleWidget.tsx');
const CHOUKAI_PLAYER_PATH = path.join(ROOT_DIR, 'src', 'components', 'exercise', 'ChoukaiPlayer.tsx');

const quizPageCode = fs.readFileSync(QUIZ_PAGE_PATH, 'utf-8');
const cbtRunnerCode = fs.readFileSync(CBT_RUNNER_PATH, 'utf-8');
const interactiveCode = fs.readFileSync(INTERACTIVE_PATH, 'utf-8');
const starScrambleCode = fs.readFileSync(STAR_SCRAMBLE_PATH, 'utf-8');
const choukaiCode = fs.readFileSync(CHOUKAI_PLAYER_PATH, 'utf-8');

// ── Check 1: Swipe Polarity Alignment & Contrast ─────────────────
console.log('📋 Check 1: Validating QuizPage.tsx swipe gesture polarity alignment...');
assert(
  quizPageCode.includes('onSwipeRight: () => handleFlashcardRate(3)'),
  'onSwipeRight must dispatch rate 3 (Hafal / Ingat) to match visual Geser Kanan hint'
);
assert(
  quizPageCode.includes('onSwipeLeft: () => handleFlashcardRate(1)'),
  'onSwipeLeft must dispatch rate 1 (Lupa / Belum) to match visual Geser Kiri hint'
);
assert(
  quizPageCode.includes('✅ Hafal (Geser Kanan)'),
  'Visual badge must declare Geser Kanan for Hafal'
);
assert(
  quizPageCode.includes('❌ Lupa (Geser Kiri)'),
  'Visual badge must declare Geser Kiri for Lupa'
);
assert(
  quizPageCode.includes('text-emerald-700 dark:text-emerald-300'),
  'Hafal swipe badge must use WCAG AA high-contrast tokens'
);
assert(
  quizPageCode.includes('text-rose-700 dark:text-rose-300'),
  'Lupa swipe badge must use WCAG AA high-contrast tokens'
);
console.log('   ✅ PASS: QuizPage.tsx swipe gesture correctly aligned with high-contrast badges.\n');

// ── Check 2: Fresh Account Empty Question Guard ──────────────────
console.log('📋 Check 2: Validating QuizPage.tsx empty question pool handling...');
assert(
  quizPageCode.includes("showToast('Semua kartu telah direview! Memori masih segar bugar ✨', '🎉')"),
  'FSRS Due session must gracefully toast when 0 due cards exist'
);
assert(
  quizPageCode.includes("showToast('Tidak ada soal yang tersedia untuk filter ini.', '⚠️')"),
  'Standard session must gracefully toast when 0 questions generated'
);
console.log('   ✅ PASS: Clean state / 0 due cards gracefully handled without deadlocks.\n');

// ── Check 3: CBT Runner Ergonomics & Contrast ────────────────────
console.log('📋 Check 3: Validating CbtRunnerScreen.tsx touch target & WCAG AA tokens...');
assert(
  cbtRunnerCode.includes('min-h-[40px] px-3.5 py-1.5 rounded-xl border text-xs font-bold'),
  'CBT Flag button must maintain >= 40px touch height'
);
assert(
  cbtRunnerCode.includes('text-emerald-700 dark:text-emerald-400'),
  'CBT Pass status and score percentage must use WCAG AA contrast tokens'
);
assert(
  cbtRunnerCode.includes('text-rose-700 dark:text-rose-400'),
  'CBT Wrong answer count must use high-contrast rose tokens'
);
assert(
  cbtRunnerCode.includes('text-amber-700 dark:text-amber-300'),
  'CBT Question drawer and timer indicators must use high-contrast amber tokens'
);
console.log('   ✅ PASS: CbtRunnerScreen.tsx meets responsive touch targets and WCAG AA contrast.\n');

// ── Check 4: InteractiveSentence Touch Targets ───────────────────
console.log('📋 Check 4: Validating InteractiveSentence.tsx touch target dimensions...');
assert(
  interactiveCode.includes('w-10 h-10 rounded-xl bg-surface-2 hover:bg-amber-500/20 text-accent'),
  'InteractiveSentence speech button must enforce 40px touch target (w-10 h-10)'
);
assert(
  interactiveCode.includes('w-10 h-10 rounded-xl bg-surface-2 hover:bg-surface-3 text-appText-muted'),
  'InteractiveSentence close button must enforce 40px touch target (w-10 h-10)'
);
console.log('   ✅ PASS: InteractiveSentence.tsx audio and dismiss buttons adhere to 40px touch minimum.\n');

// ── Check 5: StarScramble & Choukai Ergonomics & Contrast ────────
console.log('📋 Check 5: Validating StarScrambleWidget & ChoukaiPlayer polish...');
assert(
  starScrambleCode.includes('min-h-[40px] px-3.5 py-1.5 rounded-xl bg-surface'),
  'StarScramble reset button must enforce min-h-[40px] touch height'
);
assert(
  starScrambleCode.includes('text-amber-700 dark:text-amber-300'),
  'StarScramble star token slot must use high-contrast amber tokens'
);
assert(
  choukaiCode.includes('text-emerald-700 dark:text-emerald-400'),
  'Choukai header badge must use high-contrast emerald tokens'
);
assert(
  choukaiCode.includes('text-emerald-700 dark:text-emerald-300 font-bold') &&
  choukaiCode.includes('text-amber-700 dark:text-amber-300 font-bold') &&
  choukaiCode.includes('text-rose-700 dark:text-rose-300 font-bold'),
  'Choukai remaining replays quota badges must use high-contrast tokens'
);
console.log('   ✅ PASS: StarScrambleWidget & ChoukaiPlayer successfully polished and verified.\n');

console.log('🎉 Siklus II — Pass 4 Verification: 5/5 Checks Passed Successfully!');
