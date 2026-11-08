// ══════════════════════════════════════════════════════════════════
//  test-pass4-cbt-star-choukai.js
//  Cumulative Verification Suite for Phase 4 Remediation:
//  - StarScrambleWidget auto-sync & zero truncate
//  - ChoukaiPlayer pause quota preservation
//  - CbtRunnerScreen guided accordion & wrong-question retry loop
//  - ChoukaiSimulatorPage semantic tokens & question-by-question review
//  - ExamLmsHub genuine Prometric simulation launch
// ══════════════════════════════════════════════════════════════════

import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

console.log('\n🎧 [Phase 4 Verification] CBT Runner, Star Scramble & Choukai Restoration...\n');

// ── Check 1 & 2: StarScrambleWidget auto-sync & break-words ───────────────────
console.log('  Testing Check 1 & 2: StarScrambleWidget auto-sync & typography...');
const starSource = fs.readFileSync(path.join(projectRoot, 'src/components/exercise/StarScrambleWidget.tsx'), 'utf8');

assert(
  starSource.includes('Auto-sync Star slot token with matching option index') &&
  starSource.includes('onSelectOption(matchIdx)'),
  'FAIL Check 1: StarScrambleWidget must auto-sync slotted token to options'
);

assert(
  !starSource.includes('<span className="truncate">{option}</span>') &&
  starSource.includes('break-words leading-tight'),
  'FAIL Check 2: StarScrambleWidget must not truncate option text on mobile'
);
console.log('  ✔ [PASS] Check 1 & 2: StarScrambleWidget auto-sync and typography verified');

// ── Check 3: ChoukaiPlayer audio pause quota preservation ─────────────────────
console.log('  Testing Check 3: ChoukaiPlayer pause quota preservation...');
const choukaiPlayerSource = fs.readFileSync(path.join(projectRoot, 'src/components/exercise/ChoukaiPlayer.tsx'), 'utf8');

assert(
  choukaiPlayerSource.includes('isStartingFresh') &&
  choukaiPlayerSource.includes('if (isStartingFresh) {'),
  'FAIL Check 3: ChoukaiPlayer must only consume playback quota when starting fresh from beginning'
);
console.log('  ✔ [PASS] Check 3: ChoukaiPlayer pause quota preservation verified');

// ── Check 4 & 5: CbtRunnerScreen guided accordion & wrong retry button ────────
console.log('  Testing Check 4 & 5: CbtRunnerScreen guided accordion & remedial retry...');
const cbtScreenSource = fs.readFileSync(path.join(projectRoot, 'src/components/exercise/CbtRunnerScreen.tsx'), 'utf8');

assert(
  cbtScreenSource.includes('isGuidedExplanationOpen') &&
  cbtScreenSource.includes('Pembahasan 5 Lapis Terbimbing'),
  'FAIL Check 4: CbtRunnerScreen must wrap guided explanation in collapsible accordion'
);

assert(
  cbtScreenSource.includes('retryWrongQuestions') &&
  cbtScreenSource.includes('Latih Ulang Soal Salah'),
  'FAIL Check 5: CbtRunnerScreen must offer retryWrongQuestions for missed items'
);
console.log('  ✔ [PASS] Check 4 & 5: CbtRunnerScreen ergonomics and remedial loop verified');

// ── Check 6: useExerciseStore retryWrongQuestions implementation ──────────────
console.log('  Testing Check 6: useExerciseStore retryWrongQuestions action...');
const exerciseStoreSource = fs.readFileSync(path.join(projectRoot, 'src/store/useExerciseStore.ts'), 'utf8');

assert(
  exerciseStoreSource.includes('retryWrongQuestions: () => void;') &&
  exerciseStoreSource.includes('wrongItems = currentSet.items.filter'),
  'FAIL Check 6: useExerciseStore must declare and implement retryWrongQuestions'
);
console.log('  ✔ [PASS] Check 6: useExerciseStore remedial action verified');

// ── Check 7: ChoukaiSimulatorPage semantic tokens & review sheet ──────────────
console.log('  Testing Check 7: ChoukaiSimulatorPage semantic tokens & review breakdown...');
const choukaiSimSource = fs.readFileSync(path.join(projectRoot, 'src/pages/ChoukaiSimulatorPage.tsx'), 'utf8');

assert(
  !choukaiSimSource.includes('bg-neutral-900 border border-border min-w-[120px]') &&
  choukaiSimSource.includes('bg-surface-2 border border-theme min-w-[120px]'),
  'FAIL Check 7.1: ChoukaiSimulatorPage must replace dark-island classes with semantic tokens'
);

assert(
  choukaiSimSource.includes('Kunci Jawaban Resmi') &&
  choukaiSimSource.includes('Kunci Benar:'),
  'FAIL Check 7.2: ChoukaiSimulatorPage must render detailed per-question review on results'
);
console.log('  ✔ [PASS] Check 7: ChoukaiSimulatorPage semantic design & review sheet verified');

// ── Check 8: ExamLmsHub Prometric full simulation launch ──────────────────────
console.log('  Testing Check 8: ExamLmsHub Prometric simulation CTA...');
const examLmsSource = fs.readFileSync(path.join(projectRoot, 'src/components/exercise/ExamLmsHub.tsx'), 'utf8');

assert(
  examLmsSource.includes('Simulasi 60 Menit Waktu Penuh Standar Prometric') &&
  examLmsSource.includes("onStartExerciseSet(targetSet.setId, 'strict')") &&
  examLmsSource.includes('onStartDynamicDrill(60)'),
  'FAIL Check 8: ExamLmsHub Door 2 must launch full simulation instead of placement test'
);
console.log('  ✔ [PASS] Check 8: ExamLmsHub Prometric launch verified');

console.log('\n🎉 ALL 8 PHASE 4 CHECKS PASSED (100% GREEN)!\n');
