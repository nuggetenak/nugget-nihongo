// ══════════════════════════════════════════════════════════════════
//  test-s2-pass5-dojo-tools-modals.js — Siklus II Pass 5 Verification Suite
//  Dojo 11-Alat & Specialized Modals Hardening & A11y Verification
// ══════════════════════════════════════════════════════════════════

import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('🧪 Starting Siklus II — Pass 5 Verification Suite...\n');

const ROOT_DIR = process.cwd();
const KEIGO_PATH = path.join(ROOT_DIR, 'src', 'components', 'keigo', 'KeigoTrainerModal.tsx');
const COUNTER_PATH = path.join(ROOT_DIR, 'src', 'components', 'counters', 'CounterTrainerModal.tsx');
const KOTOWAZA_PATH = path.join(ROOT_DIR, 'src', 'components', 'kotowaza', 'KotowazaModal.tsx');
const PITCH_PATH = path.join(ROOT_DIR, 'src', 'components', 'pitch', 'PitchAccentModal.tsx');
const KANA_PATH = path.join(ROOT_DIR, 'src', 'components', 'kana', 'KanaChartModal.tsx');

const keigoCode = fs.readFileSync(KEIGO_PATH, 'utf-8');
const counterCode = fs.readFileSync(COUNTER_PATH, 'utf-8');
const kotowazaCode = fs.readFileSync(KOTOWAZA_PATH, 'utf-8');
const pitchCode = fs.readFileSync(PITCH_PATH, 'utf-8');
const kanaCode = fs.readFileSync(KANA_PATH, 'utf-8');

// ── Check 1: useBodyScrollLock in All 5 Specialized Modals ───────
console.log('📋 Check 1: Validating useBodyScrollLock across all 5 specialized modals...');
assert(keigoCode.includes('useBodyScrollLock(isOpen)'), 'KeigoTrainerModal must call useBodyScrollLock(isOpen)');
assert(counterCode.includes('useBodyScrollLock(isOpen)'), 'CounterTrainerModal must call useBodyScrollLock(isOpen)');
assert(kotowazaCode.includes('useBodyScrollLock(isOpen)'), 'KotowazaModal must call useBodyScrollLock(isOpen)');
assert(pitchCode.includes('useBodyScrollLock(isOpen)'), 'PitchAccentModal must call useBodyScrollLock(isOpen)');
assert(kanaCode.includes('useBodyScrollLock(isOpen)'), 'KanaChartModal must call useBodyScrollLock(isOpen)');
console.log('   ✅ PASS: Background body scroll bleed eradicated across all 5 specialized modals.\n');

// ── Check 2: Eradication of Illegal Tailwind Classes (py-0.2) ────
console.log('📋 Check 2: Validating eradication of illegal Tailwind class py-0.2...');
assert(!keigoCode.includes('py-0.2'), 'KeigoTrainerModal must not contain illegal class py-0.2');
assert(!counterCode.includes('py-0.2'), 'CounterTrainerModal must not contain illegal class py-0.2');
assert(keigoCode.includes('py-0.5'), 'KeigoTrainerModal must use valid py-0.5');
assert(counterCode.includes('py-0.5'), 'CounterTrainerModal must use valid py-0.5');
console.log('   ✅ PASS: Illegal CSS token py-0.2 successfully replaced with py-0.5.\n');

// ── Check 3: Touch Target Dimensions (>= 40px) ───────────────────
console.log('📋 Check 3: Validating touch target ergonomics across modals...');
assert(
  keigoCode.includes('w-10 h-10 rounded-xl bg-surface hover:bg-accent'),
  'Keigo pronunciation audio button must enforce 40px touch target (w-10 h-10)'
);
assert(
  kanaCode.includes('min-w-[40px] min-h-[40px] rounded-xl bg-surface-2 border border-accent/20 text-accent'),
  'Kana character speech button must enforce min-w-[40px] min-h-[40px]'
);
assert(
  kanaCode.includes('min-w-[40px] min-h-[40px] rounded-xl text-appText-muted hover:text-accent'),
  'Kana example sentence speech button must enforce min-w-[40px] min-h-[40px]'
);
console.log('   ✅ PASS: All modal audio buttons adhere to Universal Touch Target (>= 40px).\n');

// ── Check 4: Pitch Accent Tokyo Pattern Contrast ─────────────────
console.log('📋 Check 4: Validating PitchAccentModal.tsx PATTERN_INFO contrast tokens...');
assert(
  pitchCode.includes('text-blue-700 dark:text-blue-400') &&
  pitchCode.includes('text-rose-700 dark:text-rose-400') &&
  pitchCode.includes('text-amber-700 dark:text-amber-400') &&
  pitchCode.includes('text-purple-700 dark:text-purple-400'),
  'PitchAccentModal PATTERN_INFO must use dual-theme WCAG AA contrast tokens'
);
console.log('   ✅ PASS: Pitch accent Tokyo 4-pattern badges satisfy WCAG AA contrast standards.\n');

// ── Check 5: Keigo, Counter & Kotowaza Contrast Polish ────────────
console.log('📋 Check 5: Validating Keigo, Counter, & Kotowaza contrast tokens...');
assert(
  keigoCode.includes('text-amber-700 dark:text-amber-300') &&
  keigoCode.includes('text-emerald-700 dark:text-emerald-300'),
  'Keigo irregular/regular badges must use WCAG AA contrast tokens'
);
assert(
  counterCode.includes('text-amber-700 dark:text-amber-300') &&
  counterCode.includes('text-cyan-700 dark:text-cyan-300'),
  'Counter guidance banner must use high-contrast amber and cyan tokens'
);
assert(
  kotowazaCode.includes('text-emerald-700 dark:text-emerald-400 font-bold'),
  'Kotowaza copy success checkmark must use high-contrast emerald tokens'
);
console.log('   ✅ PASS: Keigo, Counter, and Kotowaza contrast tokens certified.\n');

console.log('🎉 Siklus II — Pass 5 Verification: 5/5 Checks Passed Successfully!');
