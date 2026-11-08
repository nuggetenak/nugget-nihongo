// ══════════════════════════════════════════════════════════════════
//  tests/test-s5-pass27-lesson-study-stages.js
//  Siklus V — Pass 27: Interactive Lesson Study 4-Stage Player & Anti-Exploit Guard
// ══════════════════════════════════════════════════════════════════

import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

console.log('\n🧪 [Siklus V — Pass 27] Interactive Lesson Study 4-Stage Player & Anti-Exploit Guard Verification...\n');

let passCount = 0;
const totalChecks = 6;

// ──────────────────────────────────────────────────────────────────
// Check 1: Stage Sequence, Metadata & Progress Percentages
// ──────────────────────────────────────────────────────────────────
console.log('📋 Check 1: Lesson Study 4-Stage Sequence & Metadata Specification');
try {
  const engineModule = await import('../src/lib/curriculum/lessonStageEngine.ts');
  const { LESSON_STAGES, LESSON_PASSING_THRESHOLD, getStageMetadata } = engineModule;

  assert.strictEqual(LESSON_PASSING_THRESHOLD, 80, 'Passing threshold must be 80%');
  assert.strictEqual(LESSON_STAGES.length, 4, 'Must define exactly 4 linear study stages');

  const stageIds = LESSON_STAGES.map((s) => s.id);
  assert.deepStrictEqual(stageIds, ['dialogue', 'explanation', 'drills', 'cando'], 'Stage sequence must be dialogue -> explanation -> drills -> cando');

  // Assert strictly ascending progress percentages: 25 -> 50 -> 75 -> 100
  for (let i = 0; i < LESSON_STAGES.length; i++) {
    const stage = LESSON_STAGES[i];
    assert.strictEqual(stage.order, i + 1, `Stage ${stage.id} must have order ${i + 1}`);
    assert.ok(stage.label && stage.shortLabel, `Stage ${stage.id} must define label and shortLabel`);
    assert.ok(stage.description, `Stage ${stage.id} must define pedagogical description`);
  }

  assert.strictEqual(getStageMetadata('dialogue').progressPercent, 25);
  assert.strictEqual(getStageMetadata('explanation').progressPercent, 50);
  assert.strictEqual(getStageMetadata('drills').progressPercent, 75);
  assert.strictEqual(getStageMetadata('cando').progressPercent, 100);

  console.log('  ✅ Check 1 Passed: 4-stage sequence, order, and progress geometry fully verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 1 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 2: Anti-Exploit Stage 4 Lock & Navigation Guard Math
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 2: Anti-Exploit Stage 4 Lock & Navigation Guard Invariants');
try {
  const engineModule = await import('../src/lib/curriculum/lessonStageEngine.ts');
  const { isStage4Locked, canNavigateToStage } = engineModule;

  // Rule A: Completed lessons are always unlocked
  assert.strictEqual(isStage4Locked(null, true), false, 'Completed lesson must unlock stage 4 even if score is null');
  assert.strictEqual(isStage4Locked(0, true), false, 'Completed lesson must unlock stage 4 even if score is 0');
  assert.strictEqual(isStage4Locked(79, true), false, 'Completed lesson must unlock stage 4 even if score is 79');

  // Rule B: Uncompleted lessons are locked if score is null, NaN, undefined, or < 80
  assert.strictEqual(isStage4Locked(null, false), true, 'Uncompleted lesson with null score must be locked');
  assert.strictEqual(isStage4Locked(undefined, false), true, 'Uncompleted lesson with undefined score must be locked');
  assert.strictEqual(isStage4Locked(NaN, false), true, 'Uncompleted lesson with NaN score must be locked');
  assert.strictEqual(isStage4Locked(0, false), true, 'Uncompleted lesson with 0 score must be locked');
  assert.strictEqual(isStage4Locked(79, false), true, 'Uncompleted lesson with 79 score must be locked');

  // Rule C: Uncompleted lessons unlock at >= 80%
  assert.strictEqual(isStage4Locked(80, false), false, 'Uncompleted lesson with 80 score must unlock');
  assert.strictEqual(isStage4Locked(95, false), false, 'Uncompleted lesson with 95 score must unlock');
  assert.strictEqual(isStage4Locked(100, false), false, 'Uncompleted lesson with 100 score must unlock');

  // Navigation Guard checks
  const lockedNav = canNavigateToStage('cando', 'dialogue', null, false);
  assert.strictEqual(lockedNav.allowed, false, 'Premature skip to cando must be denied');
  assert.ok(lockedNav.reason && lockedNav.reason.includes('Tahap 4 Terkunci'), 'Denied nav must state reason');

  const unlockedNav = canNavigateToStage('cando', 'drills', 85, false);
  assert.strictEqual(unlockedNav.allowed, true, 'Nav to cando must be permitted at score 85');

  const backwardsNav = canNavigateToStage('dialogue', 'drills', 40, false);
  assert.strictEqual(backwardsNav.allowed, true, 'Reviewing previous stages must always be permitted');

  console.log('  ✅ Check 2 Passed: Stage 4 anti-exploit lock and navigation rules verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 2 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 3: Linear Progression & Step Advancement Helpers
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 3: Linear Progression & Step Traversal Transitions');
try {
  const engineModule = await import('../src/lib/curriculum/lessonStageEngine.ts');
  const { getNextStage, getPreviousStage } = engineModule;

  // Forward traversal
  assert.strictEqual(getNextStage('dialogue', null, false), 'explanation');
  assert.strictEqual(getNextStage('explanation', null, false), 'drills');
  assert.strictEqual(getNextStage('drills', null, false), null, 'drills cannot advance if score is null');
  assert.strictEqual(getNextStage('drills', 79, false), null, 'drills cannot advance if score is 79');
  assert.strictEqual(getNextStage('drills', 80, false), 'cando', 'drills advances to cando at 80');
  assert.strictEqual(getNextStage('drills', null, true), 'cando', 'drills advances to cando if lesson previously done');
  assert.strictEqual(getNextStage('cando', 100, false), null, 'cando has no next stage (completion reached)');

  // Backward traversal
  assert.strictEqual(getPreviousStage('cando'), 'drills');
  assert.strictEqual(getPreviousStage('drills'), 'explanation');
  assert.strictEqual(getPreviousStage('explanation'), 'dialogue');
  assert.strictEqual(getPreviousStage('dialogue'), null, 'dialogue is the first stage');

  console.log('  ✅ Check 3 Passed: Forward and backward stage traversal transitions strictly verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 3 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 4: MicroDrill Scoring Math & Divide-by-Zero Defense
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 4: MicroDrill Scoring Math & Extreme Boundary Invariants');
try {
  const engineModule = await import('../src/lib/curriculum/lessonStageEngine.ts');
  const { calculateDrillScore, formatCompletionBadgeText } = engineModule;

  // Normal calculations
  assert.strictEqual(calculateDrillScore(5, 5), 100);
  assert.strictEqual(calculateDrillScore(5, 4), 80);
  assert.strictEqual(calculateDrillScore(5, 3), 60);
  assert.strictEqual(calculateDrillScore(5, 0), 0);

  // Divide-by-zero defense
  assert.strictEqual(calculateDrillScore(0, 0), 100, 'Zero drills must yield 100% without NaN');
  assert.strictEqual(calculateDrillScore(-1, 5), 100, 'Negative drills must yield 100% without NaN');
  assert.strictEqual(calculateDrillScore(NaN, 2), 100, 'NaN drills must yield 100% without NaN');

  // Input clamping
  assert.strictEqual(calculateDrillScore(5, -2), 0, 'Negative correct count clamped to 0');
  assert.strictEqual(calculateDrillScore(5, 10), 100, 'Excess correct count clamped to 100');

  // Badge formatter
  assert.strictEqual(formatCompletionBadgeText(null), 'Tuntas (100%)');
  assert.strictEqual(formatCompletionBadgeText(85.4), 'Tuntas (85%)');
  assert.strictEqual(formatCompletionBadgeText(NaN), 'Tuntas (100%)');

  console.log('  ✅ Check 4 Passed: Drill score math, zero-division, and formatting defense verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 4 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 5: Mobile Ergonomics & Viewport Safety Contracts
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 5: Mobile Ergonomics, Viewport Safety & WCAG AA Tokens');
try {
  const pageSource = fs.readFileSync(path.join(projectRoot, 'src/pages/LessonStudyPage.tsx'), 'utf8');

  // Mobile bottom padding cushion
  assert.ok(
    pageSource.includes('pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12'),
    'LessonStudyPage must maintain safe area padding cushion'
  );

  // Container overflow protection
  assert.ok(
    pageSource.includes('min-w-0 overflow-x-hidden'),
    'LessonStudyPage must prevent horizontal scroll leaks'
  );

  // Stepper touch targets
  assert.ok(
    pageSource.includes('min-h-[44px]'),
    'LessonStudyPage stepper and action buttons must maintain touch targets >= 44px'
  );

  // Dual-theme contrast tokens
  assert.ok(
    pageSource.includes('text-amber-800 dark:text-amber-300'),
    'LessonStudyPage must enforce WCAG AA amber contrast tokens'
  );
  assert.ok(
    pageSource.includes('text-emerald-800 dark:text-emerald-300'),
    'LessonStudyPage must enforce WCAG AA emerald contrast tokens'
  );

  console.log('  ✅ Check 5 Passed: Mobile ergonomics, safe-area padding, and contrast verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 5 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 6: Audio Lifecycle, Stage Subcomponents & SFX Invariants
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 6: Audio Lifecycle, Unmount Cleanup & Stage SFX Invariants');
try {
  const dialogueSource = fs.readFileSync(path.join(projectRoot, 'src/components/curriculum/player/DialogueStage.tsx'), 'utf8');
  const drillSource = fs.readFileSync(path.join(projectRoot, 'src/components/curriculum/player/MicroDrillStage.tsx'), 'utf8');
  const canDoSource = fs.readFileSync(path.join(projectRoot, 'src/components/curriculum/player/CanDoCompletionStage.tsx'), 'utf8');

  // DialogueStage unmount cleanup
  assert.ok(
    dialogueSource.includes('stopPlayingAllRef.current = true;') &&
    dialogueSource.includes('speechSynthesis.cancel()'),
    'DialogueStage must cancel speech synthesis and set stopPlayingAllRef on unmount'
  );

  // MicroDrillStage SFX and retry
  assert.ok(
    drillSource.includes('playSuccessSfx()') && drillSource.includes('playErrorSfx()'),
    'MicroDrillStage must trigger auditory SFX feedback'
  );
  assert.ok(
    drillSource.includes('Latih Ulang Soal Cek Pemahaman'),
    'MicroDrillStage must provide remedial retry button for scores < 80%'
  );

  // CanDoCompletionStage locked state and Irasutoya
  assert.ok(
    canDoSource.includes('Tahap 4 Terkunci') && canDoSource.includes('assetId="senpai_studying"'),
    'CanDoCompletionStage must render Senpai in locked view'
  );
  assert.ok(
    canDoSource.includes('hanko_excellent') && canDoSource.includes('daruma_recovery'),
    'CanDoCompletionStage must render Hanko and Daruma based on evaluation score'
  );

  console.log('  ✅ Check 6 Passed: Audio cleanup, micro-drill SFX, and Can-Do completion verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 6 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Master Verification Summary
// ──────────────────────────────────────────────────────────────────
console.log(`\n📊 Siklus V Pass 27 Result: ${passCount}/${totalChecks} checks passed.`);
if (passCount === totalChecks) {
  console.log('🎉 Siklus V Pass 27 PASSED 100% GREEN!\n');
  process.exit(0);
} else {
  console.error(`❌ Siklus V Pass 27 FAILED with ${totalChecks - passCount} errors.\n`);
  process.exit(1);
}
