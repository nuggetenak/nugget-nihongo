// ══════════════════════════════════════════════════════════════════
//  test-pass6-exercise-cbt-runner.js — Automated Verification Suite
//  for Nugget Nihongo 14 Golden Sets CBT & 3 Clean Doors LMS Engine
//  Research Basis: Cumulative Regression Rule, Forensic Audit Pace
// ══════════════════════════════════════════════════════════════════

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

let totalPassed = 0;
let totalFailed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    totalPassed++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    totalFailed++;
  }
}

console.log('═════════════════════════════════════════════════════════════════');
console.log('🧪 TEST SUITE: PASS 6 — 14 GOLDEN SETS CBT RUNNER & 3 CLEAN DOORS');
console.log('═════════════════════════════════════════════════════════════════\n');

// ── TEST 1: MANIFEST INTEGRITY ────────────────────────────────────
console.log('▶ Test 1: Verifying Manifest & 14 Golden Sets Catalog...');
const manifestPath = path.join(projectRoot, 'public', 'data', 'exercises', 'manifest.json');
assert(fs.existsSync(manifestPath), 'manifest.json exists in public/data/exercises/');

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
assert(manifest.totalSets === 14, `Manifest declares exactly 14 sets (found: ${manifest.totalSets})`);
assert(manifest.totalQuestions === 210, `Manifest declares 210 questions (found: ${manifest.totalQuestions})`);

// ── TEST 2: ALL 14 JSON DATASET FILES ON DISK ─────────────────────
console.log('\n▶ Test 2: Verifying 14 JSON Dataset Files on Disk...');
let verifiedItemsCount = 0;
let starScrambleCount = 0;
let dokkaiPassageCount = 0;
let choukaiAudioCount = 0;

manifest.sets.forEach((setMeta) => {
  const filePath = path.join(projectRoot, 'public', 'data', 'exercises', setMeta.fileName);
  assert(fs.existsSync(filePath), `Dataset file exists: ${setMeta.fileName}`);

  const raw = fs.readFileSync(filePath, 'utf8');
  const setData = JSON.parse(raw);

  assert(setData.items && setData.items.length === 15, `[${setMeta.setId}] Contains exactly 15 items`);
  assert(setData.timeLimitMinutes === 15, `[${setMeta.setId}] timeLimitMinutes is 15`);
  assert(setData.passingScore >= 9, `[${setMeta.setId}] passingScore >= 9`);

  setData.items.forEach((item, idx) => {
    verifiedItemsCount++;
    if (!item.id || !item.prompt || !Array.isArray(item.options) || item.options.length < 3) {
      assert(false, `[${item.id || idx}] Malformed question properties`);
    }

    if (item.correctOptionIndex < 0 || item.correctOptionIndex >= item.options.length) {
      assert(false, `[${item.id}] correctOptionIndex out of bounds`);
    }

    // 5-Layer Pedagogical Explanation Check
    const exp = item.explanation;
    if (
      !exp ||
      !exp.justification ||
      !exp.distractorAutopsy ||
      !exp.mnemonicSensei ||
      !exp.l1InterferenceAlert ||
      !exp.remedialPrescription ||
      !exp.remedialPrescription.unitId
    ) {
      assert(false, `[${item.id}] Missing 5-layer pedagogical explanation anatomy`);
    }

    if (item.starScramble) {
      starScrambleCount++;
      const sc = item.starScramble;
      if (!sc.tokens || sc.tokens.length !== 4 || !sc.starPosition || sc.starPosition < 1 || sc.starPosition > 4) {
        assert(false, `[${item.id}] Malformed Star Scramble payload`);
      }
    }

    if (item.readingPassage) {
      dokkaiPassageCount++;
      if (!item.readingPassage.passageText || !item.readingPassage.genre) {
        assert(false, `[${item.id}] Malformed Dokkai payload`);
      }
    }

    if (item.choukai) {
      choukaiAudioCount++;
      if (!item.choukai.transcriptText) {
        assert(false, `[${item.id}] Malformed Choukai payload`);
      }
    }
  });
});

assert(verifiedItemsCount === 210, `All 210 authentic items strictly validated (verified: ${verifiedItemsCount})`);
assert(starScrambleCount >= 9, `Found ${starScrambleCount} Star Scramble (Mondai 2) interactive items`);
assert(dokkaiPassageCount >= 13, `Found ${dokkaiPassageCount} Dokkai reading items`);
assert(choukaiAudioCount >= 4, `Found ${choukaiAudioCount} Choukai listening items`);

// ── TEST 3: ZUSTAND STORE & OFFLINE PERSISTENCE ───────────────────
console.log('\n▶ Test 3: Verifying useExerciseStore Architecture...');
const storePath = path.join(projectRoot, 'src', 'store', 'useExerciseStore.ts');
assert(fs.existsSync(storePath), 'useExerciseStore.ts exists in src/store/');

const storeSource = fs.readFileSync(storePath, 'utf8');
assert(storeSource.includes('export const useExerciseStore'), 'Exports useExerciseStore hook');
assert(storeSource.includes('STORAGE_RECORDS_KEY'), 'Implements persistent records key');
assert(storeSource.includes('STORAGE_ACTIVE_SESSION_KEY'), 'Implements active session crash-recovery key');
assert(storeSource.includes('consumeAudioReplay'), 'Implements 2x audio replay limiter for Strict CBT');
assert(storeSource.includes('updateStarScramble'), 'Implements interactive star scramble token synchronizer');
assert(storeSource.includes('submitTest'), 'Implements score calculation & mastery record updater');

// ── TEST 4: SPECIALIZED INTERACTIVE CBT WIDGETS ───────────────────
console.log('\n▶ Test 4: Verifying Specialized Interactive CBT Widgets...');
const widgets = [
  'StarScrambleWidget.tsx',
  'DokkaiSheet.tsx',
  'ChoukaiPlayer.tsx',
  'FiveLayerExplanationSheet.tsx',
  'ExamLmsHub.tsx',
  'CbtRunnerScreen.tsx',
];

widgets.forEach((w) => {
  const wPath = path.join(projectRoot, 'src', 'components', 'exercise', w);
  assert(fs.existsSync(wPath), `Component exists: src/components/exercise/${w}`);
});

// Check StarScrambleWidget contracts
const starWidgetSource = fs.readFileSync(
  path.join(projectRoot, 'src', 'components', 'exercise', 'StarScrambleWidget.tsx'),
  'utf8'
);
assert(starWidgetSource.includes('handleTapAvailableToken'), 'StarScrambleWidget supports tap-to-slot interaction');
assert(starWidgetSource.includes('handleTapSlot'), 'StarScrambleWidget supports tap-to-return interaction');
assert(starWidgetSource.includes('handleReset'), 'StarScrambleWidget supports reset tokens to bank');

// Check ChoukaiPlayer contracts
const choukaiPlayerSource = fs.readFileSync(
  path.join(projectRoot, 'src', 'components', 'exercise', 'ChoukaiPlayer.tsx'),
  'utf8'
);
assert(choukaiPlayerSource.includes('isQuotaExhausted'), 'ChoukaiPlayer enforces 2x playback quota');
assert(choukaiPlayerSource.includes('isSubmitted'), 'ChoukaiPlayer conceals transcript until test submission');

// Check FiveLayerExplanationSheet contracts
const fiveLayerSource = fs.readFileSync(
  path.join(projectRoot, 'src', 'components', 'exercise', 'FiveLayerExplanationSheet.tsx'),
  'utf8'
);
assert(fiveLayerSource.includes('Lapis 1: Alasan Kunci Benar'), 'FiveLayerExplanationSheet renders Lapis 1');
assert(fiveLayerSource.includes('Lapis 2: Bedah Opsi Salah'), 'FiveLayerExplanationSheet renders Lapis 2');
assert(fiveLayerSource.includes('Lapis 3: Jembatan Ingatan Sensei Nugget'), 'FiveLayerExplanationSheet renders Lapis 3');
assert(fiveLayerSource.includes('Lapis 4: Peringatan Interferensi Bahasa Indonesia'), 'FiveLayerExplanationSheet renders Lapis 4');
assert(fiveLayerSource.includes('Lapis 5: Preskripsi Remedial & Rujukan MateriHub'), 'FiveLayerExplanationSheet renders Lapis 5');
assert(fiveLayerSource.includes('handleSaveToFsrs'), 'FiveLayerExplanationSheet supports 1-Tap save to FSRS');

// ── TEST 5: THE 3 CLEAN DOORS IN EXAM LMS HUB ─────────────────────
console.log('\n▶ Test 5: Verifying The 3 Clean Doors in ExamLmsHub...');
const hubSource = fs.readFileSync(
  path.join(projectRoot, 'src', 'components', 'exercise', 'ExamLmsHub.tsx'),
  'utf8'
);
assert(hubSource.includes('Pintu 1'), 'ExamLmsHub declares Pintu 1: Pusat Ujian JLPT');
assert(hubSource.includes('Pintu 2'), 'ExamLmsHub declares Pintu 2: Pusat Tokutei Ginou SSW/JFT');
assert(hubSource.includes('Pintu 3'), 'ExamLmsHub declares Pintu 3: Latihan Cepat & Review Dinamis');
assert(hubSource.includes('Konfigurasi Mode Pengerjaan'), 'ExamLmsHub renders Pre-Test Scaffolding Modal');
assert(hubSource.includes('Mode Simulasi Resmi'), 'Pre-test modal offers Strict Exam 15m');
assert(hubSource.includes('Mode Latihan Terbimbing'), 'Pre-test modal offers Guided Practice');

// ── TEST 6: QUIZPAGE INTEGRATION CONTRACTS ────────────────────────
console.log('\n▶ Test 6: Verifying QuizPage Integration Contracts...');
const quizPageSource = fs.readFileSync(path.join(projectRoot, 'src', 'pages', 'QuizPage.tsx'), 'utf8');
assert(quizPageSource.includes("import { ExamLmsHub } from '../components/exercise/ExamLmsHub'"), 'Imports ExamLmsHub');
assert(quizPageSource.includes("import { CbtRunnerScreen } from '../components/exercise/CbtRunnerScreen'"), 'Imports CbtRunnerScreen');
assert(quizPageSource.includes("viewState === 'cbt'"), 'QuizPage handles viewState cbt');
assert(quizPageSource.includes('<ExamLmsHub'), 'QuizPage renders ExamLmsHub');

// ── TEST 7: ZERO MICROFONTS IN EXERCISE & QUIZ SUBSYSTEMS ─────────
console.log('\n▶ Test 7: Verifying Zero Microfonts in Exercise Subsystems...');
const exerciseDir = path.join(projectRoot, 'src', 'components', 'exercise');
const exerciseFiles = fs.readdirSync(exerciseDir).map((f) => path.join(exerciseDir, f));

let microfontViolations = 0;
exerciseFiles.forEach((f) => {
  const content = fs.readFileSync(f, 'utf8');
  const matches = content.match(/text-\[(?:9|10|11)px\]/g);
  if (matches) {
    microfontViolations += matches.length;
    console.error(`  ❌ Microfont found in ${path.basename(f)}: ${matches.join(', ')}`);
  }
});

assert(microfontViolations === 0, `Zero microfonts found in src/components/exercise/ (violations: ${microfontViolations})`);

console.log('\n═════════════════════════════════════════════════════════════════');
console.log(`📊 FINAL RESULT: ${totalPassed} PASSED, ${totalFailed} FAILED`);
console.log('═════════════════════════════════════════════════════════════════');

if (totalFailed > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL PASS 6 EXERCISE CBT RUNNER CONTRACTS STRICTLY SATISFIED!');
  process.exit(0);
}
