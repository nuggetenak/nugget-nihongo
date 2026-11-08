// ══════════════════════════════════════════════════════════════════
//  tests/test-s5-pass28-arena-quiz-dispatcher.js
//  Siklus V — Pass 28: Arena Quiz Dynamic Question Dispatcher & Retention Scoring
// ══════════════════════════════════════════════════════════════════

import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

console.log('\n🧪 [Siklus V — Pass 28] Arena Quiz Dynamic Question Dispatcher & Retention Scoring Verification...\n');

let passCount = 0;
const totalChecks = 6;

// ──────────────────────────────────────────────────────────────────
// Check 1: Quiz Mode Registry & 14 Canonical Modes
// ──────────────────────────────────────────────────────────────────
console.log('📋 Check 1: Quiz Mode Registry & 14 Canonical Modes Specification');
try {
  const scoringModule = await import('../src/lib/quiz/retentionScoring.ts');
  const { QUIZ_MODE_REGISTRY, getQuizModeMeta } = scoringModule;

  assert.strictEqual(QUIZ_MODE_REGISTRY.length, 14, 'Must register exactly 14 canonical quiz modes');

  const registeredModes = QUIZ_MODE_REGISTRY.map((m) => m.mode);
  const expectedModes = [
    'flashcard',
    'multiple-choice',
    'panic-recall',
    'mora-pacing',
    'pitch-accent',
    'onomatopoeia',
    'listening',
    'fill-in',
    'rearrange',
    'conjugation',
    'translation',
    'error-find',
    'discourse-deconstruct',
    'collocation-matrix',
  ];

  for (const exp of expectedModes) {
    assert.ok(registeredModes.includes(exp), `Quiz mode '${exp}' must be declared in QUIZ_MODE_REGISTRY`);
  }

  // Verify getQuizModeMeta resolution
  const flashMeta = getQuizModeMeta('flashcard');
  assert.strictEqual(flashMeta.category, 'fast_challenge');
  assert.ok(flashMeta.title && flashMeta.description);

  const fallbackMeta = getQuizModeMeta('unknown-mode');
  assert.ok(fallbackMeta.title, 'Must provide fallback for unknown modes');

  console.log('  ✅ Check 1 Passed: 14 canonical quiz modes and metadata registry fully verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 1 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 2: Core Question Generation Dispatcher Contracts in quizEngine
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 2: Core Question Generation Dispatcher Contracts in quizEngine.ts');
try {
  const engineSource = fs.readFileSync(path.join(projectRoot, 'src/lib/quiz/quizEngine.ts'), 'utf8');

  // Verify core modes dispatched in generateQuizQuestions
  assert.ok(engineSource.includes("if (mode === 'flashcard')"), 'Must dispatch flashcard mode');
  assert.ok(engineSource.includes("if (mode === 'multiple-choice')"), 'Must dispatch multiple-choice mode');
  assert.ok(engineSource.includes("if (mode === 'listening')"), 'Must dispatch listening mode');
  assert.ok(engineSource.includes("if (mode === 'conjugation')"), 'Must dispatch conjugation mode');
  assert.ok(engineSource.includes("if (mode === 'rearrange')"), 'Must dispatch rearrange mode');
  assert.ok(engineSource.includes("if (mode === 'fill-in')"), 'Must dispatch fill-in mode');
  assert.ok(engineSource.includes("if (mode === 'translation')"), 'Must dispatch translation mode');
  assert.ok(engineSource.includes("if (mode === 'error-find')"), 'Must dispatch error-find mode');

  // Distractor sanitization
  assert.ok(
    engineSource.includes("v.meaning && v.meaning.trim() !== ''"),
    'getVocabDistractors must filter out empty or whitespace-only meaning strings'
  );

  // Bunsetsu chunking via BudouX
  assert.ok(
    engineSource.includes('generateWordScrambleChunks(sentence, 6)'),
    'splitIntoTokens must utilize BudouX generateWordScrambleChunks'
  );

  console.log('  ✅ Check 2 Passed: Core question generation contracts and BudouX integration verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 2 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 3: Specialized & Gemba Vocational Modes (Panic, Mora, Pitch)
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 3: Specialized & Gemba Vocational Modes (Panic, Mora, Pitch)');
try {
  const engineSource = fs.readFileSync(path.join(projectRoot, 'src/lib/quiz/quizEngine.ts'), 'utf8');

  // Panic Recall (K3 Gemba Emergency SBAR)
  assert.ok(
    engineSource.includes("generatePanicRecallQuestions") &&
    engineSource.includes("prompt: `[Simulasi Tanggap Darurat K3]"),
    'Panic recall must format K3 Gemba emergency simulation prompts'
  );
  assert.ok(
    engineSource.includes("panicTimeoutSeconds: s.timeoutSeconds || 5"),
    'Panic recall must specify timeout in seconds (default 5s)'
  );
  assert.ok(
    engineSource.includes("actionChecklist: s.actionChecklist"),
    'Panic recall must supply action checklist'
  );

  // Visual Mora Metronome
  assert.ok(
    engineSource.includes("generateMoraPacingQuestions") &&
    engineSource.includes("generatePhonologicalDistractors"),
    'Mora pacing must generate realistic phonological distractors'
  );

  // Tokyo Pitch Accent & Dynamic Odaka Labeling
  assert.ok(
    engineSource.includes("const odakaLabel = `[${moraCount}] Odaka"),
    'Pitch accent must dynamically calculate Odaka label based on moraCount'
  );
  assert.ok(
    engineSource.includes("generatePainOnomatopoeiaQuestions"),
    'Onomatopoeia mode must be dispatched to specialized generator'
  );

  console.log('  ✅ Check 3 Passed: Specialized & Gemba vocational drills (Panic, Mora, Pitch, Onomato) verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 3 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 4: FSRS Due Question Dispatcher & Mistake Notebook Retries
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 4: FSRS Due Question Dispatcher & Mistake Notebook Retries');
try {
  const scoringModule = await import('../src/lib/quiz/retentionScoring.ts');
  const { calculatePureFSRSDueCount } = scoringModule;
  const engineSource = fs.readFileSync(path.join(projectRoot, 'src/lib/quiz/quizEngine.ts'), 'utf8');

  const pastDate = new Date(Date.now() - 86400000).toISOString();
  const futureDate = new Date(Date.now() + 86400000).toISOString();

  const mockCards = {
    'v-taberu': { card: { due: pastDate, stability: 1, difficulty: 5, reps: 1, lapses: 0, state: 2, elapsed_days: 1, scheduled_days: 1 } },
    'v-nomu': { card: { due: futureDate, stability: 5, difficulty: 4, reps: 3, lapses: 0, state: 2, elapsed_days: 1, scheduled_days: 5 } },
    'v-hon': { card: { due: '', stability: 0, difficulty: 5, reps: 0, lapses: 0, state: 0, elapsed_days: 0, scheduled_days: 0 } },
  };

  const dueCount = calculatePureFSRSDueCount(mockCards);
  assert.strictEqual(dueCount, 2, 'Must calculate 2 due cards (past + new/empty)');

  // Empty cards returns 0 without crashing
  const zeroDue = calculatePureFSRSDueCount({});
  assert.strictEqual(zeroDue, 0);

  // Mistake Notebook generation contract
  assert.ok(
    engineSource.includes("generateMistakeQuestions") &&
    engineSource.includes("prompt: `[Ulangi Kesalahan] ${q.prompt}`"),
    'generateMistakeQuestions must prefix prompts with [Ulangi Kesalahan]'
  );

  console.log('  ✅ Check 4 Passed: FSRS due counting, due question dispatching & mistake retry verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 4 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 5: Retention Scoring Math, Water Drops & Grade Logic
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 5: Retention Accuracy Math, Water Drops & Grade Logic');
try {
  const scoringModule = await import('../src/lib/quiz/retentionScoring.ts');
  const {
    calculateRetentionAccuracy,
    calculateWaterDropsReward,
    calculateSessionXpReward,
    evaluateRetentionGrade,
  } = scoringModule;

  // Accuracy Math
  assert.strictEqual(calculateRetentionAccuracy(10, 10), 100);
  assert.strictEqual(calculateRetentionAccuracy(8, 10), 80);
  assert.strictEqual(calculateRetentionAccuracy(0, 10), 0);
  assert.strictEqual(calculateRetentionAccuracy(0, 0), 0, 'Zero questions must return 0%');
  assert.strictEqual(calculateRetentionAccuracy(-5, 10), 0, 'Negative correct clamped to 0');
  assert.strictEqual(calculateRetentionAccuracy(15, 10), 100, 'Overflow correct clamped to 100');

  // Water Drops Reward Formula (1 base + 1 per 3 correct + 1 bonus for 100% accuracy)
  assert.strictEqual(calculateWaterDropsReward(10, 10), 1 + 3 + 1, '10/10 must yield 5 drops');
  assert.strictEqual(calculateWaterDropsReward(9, 10), 1 + 3 + 0, '9/10 must yield 4 drops');
  assert.strictEqual(calculateWaterDropsReward(5, 10), 1 + 1 + 0, '5/10 must yield 2 drops');
  assert.strictEqual(calculateWaterDropsReward(0, 10), 1 + 0 + 0, '0/10 must yield 1 base drop');
  assert.strictEqual(calculateWaterDropsReward(0, 0), 0, '0 total questions must yield 0 drops');

  // XP Rewards
  assert.strictEqual(calculateSessionXpReward(8, 2, 'multiple-choice'), 8 * 10 + 2 * 2, '80 + 4 = 84 XP');
  assert.strictEqual(calculateSessionXpReward(5, 0, 'rearrange'), 5 * 15, '75 XP');

  // Grade Evaluation
  const gradeS = evaluateRetentionGrade(100);
  assert.strictEqual(gradeS.grade, 'S');
  assert.strictEqual(gradeS.passed, true);
  assert.strictEqual(gradeS.hankoAsset, 'hanko_excellent');

  const gradeA = evaluateRetentionGrade(85);
  assert.strictEqual(gradeA.grade, 'A');
  assert.strictEqual(gradeA.passed, true);
  assert.strictEqual(gradeA.hankoAsset, 'hanko_excellent');

  const gradeB = evaluateRetentionGrade(65);
  assert.strictEqual(gradeB.grade, 'B');
  assert.strictEqual(gradeB.passed, false);
  assert.strictEqual(gradeB.hankoAsset, 'daruma_recovery');

  const gradeD = evaluateRetentionGrade(20);
  assert.strictEqual(gradeD.grade, 'D');
  assert.strictEqual(gradeD.passed, false);
  assert.strictEqual(gradeD.hankoAsset, 'daruma_recovery');

  console.log('  ✅ Check 5 Passed: Retention accuracy, water drop formula & grading logic verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 5 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 6: Mobile Ergonomics & Regression Contract Invariants
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 6: Mobile Ergonomics, Swipe Gesture Polarity & Contract Invariants');
try {
  const quizPageSource = fs.readFileSync(path.join(projectRoot, 'src/pages/QuizPage.tsx'), 'utf8');

  // Swipe gesture polarity: right = 3 (Hafal), left = 1 (Lupa)
  assert.ok(
    quizPageSource.includes('onSwipeRight: () => handleFlashcardRate(3)'),
    'QuizPage must bind right swipe to rating 3 (Hafal)'
  );
  assert.ok(
    quizPageSource.includes('onSwipeLeft: () => handleFlashcardRate(1)'),
    'QuizPage must bind left swipe to rating 1 (Lupa)'
  );

  // High contrast tokens
  assert.ok(
    quizPageSource.includes('text-emerald-700 dark:text-emerald-300'),
    'QuizPage must maintain WCAG AA emerald tokens'
  );
  assert.ok(
    quizPageSource.includes('text-rose-700 dark:text-rose-300'),
    'QuizPage must maintain WCAG AA rose tokens'
  );

  // Anti-microfont compliance
  const microfontRegex = /text-\[(8|9|10|11|10\.5|11\.5)px\]/;
  assert.ok(
    !microfontRegex.test(quizPageSource),
    'QuizPage.tsx must not contain any micro-fonts below text-xs'
  );

  console.log('  ✅ Check 6 Passed: Swipe polarity, contrast tokens, and microfont compliance verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 6 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Master Verification Summary
// ──────────────────────────────────────────────────────────────────
console.log(`\n📊 Siklus V Pass 28 Result: ${passCount}/${totalChecks} checks passed.`);
if (passCount === totalChecks) {
  console.log('🎉 Siklus V Pass 28 PASSED 100% GREEN!\n');
  process.exit(0);
} else {
  console.error(`❌ Siklus V Pass 28 FAILED with ${totalChecks - passCount} errors.\n`);
  process.exit(1);
}
