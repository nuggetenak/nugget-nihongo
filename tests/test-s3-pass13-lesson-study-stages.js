import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🧪 Running Siklus III Pass 13: Lesson Study Stages & Stage 4 Anti-Exploit UI Polish Suite...');

let passCount = 0;
const totalChecks = 5;

// Check 1: LessonStudyPage Irasutoya Senpai anchor, interactive lock feedback & WCAG AA contrast tokens
try {
  const filePath = path.join(rootDir, 'src', 'pages', 'LessonStudyPage.tsx');
  const content = fs.readFileSync(filePath, 'utf8');

  const hasIrasutoyaSenpai = content.includes('IrasutoyaImage') && content.includes('senpai_studying') && content.includes('animateFloat');
  const hasInteractiveLockFeedback = content.includes('isCanDoLocked') && content.includes('showToast') && content.includes('Tahap 4 Terkunci');
  const hasWcagContrast = content.includes('text-amber-800 dark:text-amber-300') &&
                          content.includes('text-emerald-800 dark:text-emerald-300');

  if (hasIrasutoyaSenpai && hasInteractiveLockFeedback && hasWcagContrast) {
    console.log('  ✅ Check 1 Passed: LessonStudyPage features Irasutoya Senpai anchor, interactive lock toast feedback, and WCAG AA contrast tokens');
    passCount++;
  } else {
    console.error('  ❌ Check 1 Failed: LessonStudyPage missing Senpai anchor, interactive lock feedback, or WCAG AA contrast tokens', {
      hasIrasutoyaSenpai,
      hasInteractiveLockFeedback,
      hasWcagContrast
    });
  }
} catch (e) {
  console.error('  ❌ Check 1 Exception:', e.message);
}

// Check 2: LessonStudyPage .card-interactive-lift across header, stage container & footer actions
try {
  const filePath = path.join(rootDir, 'src', 'pages', 'LessonStudyPage.tsx');
  const content = fs.readFileSync(filePath, 'utf8');

  const liftMatches = (content.match(/card-interactive-lift/g) || []).length;
  const hasHeaderLift = content.includes('bg-surface border border-accent/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 shadow-sm card-interactive-lift');
  const hasStageLift = content.includes('id="lesson-studio-top"') && content.includes('card-interactive-lift');

  if (liftMatches >= 4 && (hasHeaderLift || hasStageLift)) {
    console.log(`  ✅ Check 2 Passed: LessonStudyPage integrates ${liftMatches} .card-interactive-lift micro-interactions across header, stage container, and actions`);
    passCount++;
  } else {
    console.error('  ❌ Check 2 Failed: LessonStudyPage missing .card-interactive-lift micro-interactions', {
      liftMatches,
      hasHeaderLift,
      hasStageLift
    });
  }
} catch (e) {
  console.error('  ❌ Check 2 Exception:', e.message);
}

// Check 3: CanDoCompletionStage Irasutoya Hanko of Excellence, Daruma Recovery & Senpai in Locked View
try {
  const filePath = path.join(rootDir, 'src', 'components', 'curriculum', 'player', 'CanDoCompletionStage.tsx');
  const content = fs.readFileSync(filePath, 'utf8');

  const hasHankoOrDaruma = content.includes('IrasutoyaImage') &&
                           content.includes('hanko_excellent') &&
                           content.includes('daruma_recovery') &&
                           content.includes('animatePop');
  const hasLockedSenpai = content.includes('assetId="senpai_studying"') &&
                          content.includes('animateFloat');

  if (hasHankoOrDaruma && hasLockedSenpai) {
    console.log('  ✅ Check 3 Passed: CanDoCompletionStage incorporates authentic Irasutoya anchors (Hanko excellence / Daruma recovery in evaluation banner, Senpai in locked view)');
    passCount++;
  } else {
    console.error('  ❌ Check 3 Failed: CanDoCompletionStage missing Irasutoya cultural anchors', {
      hasHankoOrDaruma,
      hasLockedSenpai
    });
  }
} catch (e) {
  console.error('  ❌ Check 3 Exception:', e.message);
}

// Check 4: CanDoCompletionStage .card-interactive-lift & WCAG AA contrast tokens across all subcomponents
try {
  const filePath = path.join(rootDir, 'src', 'components', 'curriculum', 'player', 'CanDoCompletionStage.tsx');
  const content = fs.readFileSync(filePath, 'utf8');

  const liftMatches = (content.match(/card-interactive-lift/g) || []).length;
  const hasContrastTokens = content.includes('text-amber-800 dark:text-amber-300') &&
                            content.includes('text-rose-800 dark:text-rose-300');

  if (liftMatches >= 8 && hasContrastTokens) {
    console.log(`  ✅ Check 4 Passed: CanDoCompletionStage applies ${liftMatches} .card-interactive-lift micro-interactions and enforces WCAG AA contrast tokens`);
    passCount++;
  } else {
    console.error('  ❌ Check 4 Failed: CanDoCompletionStage missing lift micro-interactions or contrast tokens', {
      liftMatches,
      hasContrastTokens
    });
  }
} catch (e) {
  console.error('  ❌ Check 4 Exception:', e.message);
}

// Check 5: MicroDrillStage & DialogueStage cultural anchors & interactive lift
try {
  const drillPath = path.join(rootDir, 'src', 'components', 'curriculum', 'player', 'MicroDrillStage.tsx');
  const dialoguePath = path.join(rootDir, 'src', 'components', 'curriculum', 'player', 'DialogueStage.tsx');
  const drillContent = fs.readFileSync(drillPath, 'utf8');
  const dialogueContent = fs.readFileSync(dialoguePath, 'utf8');

  const hasDrillIrasutoya = drillContent.includes('IrasutoyaImage') &&
                            drillContent.includes('hanko_excellent') &&
                            drillContent.includes('daruma_recovery');
  const hasDrillLift = drillContent.includes('card-interactive-lift');
  const hasDialogueLift = dialogueContent.includes('card-interactive-lift');

  if (hasDrillIrasutoya && hasDrillLift && hasDialogueLift) {
    console.log('  ✅ Check 5 Passed: MicroDrillStage features Irasutoya completion anchors and DialogueStage incorporates .card-interactive-lift');
    passCount++;
  } else {
    console.error('  ❌ Check 5 Failed: MicroDrillStage or DialogueStage missing cultural anchors or lift', {
      hasDrillIrasutoya,
      hasDrillLift,
      hasDialogueLift
    });
  }
} catch (e) {
  console.error('  ❌ Check 5 Exception:', e.message);
}

// Final Summary
console.log(`\n📊 Siklus III Pass 13 Result: ${passCount}/${totalChecks} checks passed.`);
if (passCount === totalChecks) {
  console.log('🎉 Siklus III Pass 13 PASSED 100% GREEN!\n');
  process.exit(0);
} else {
  console.error('❌ Siklus III Pass 13 FAILED.');
  process.exit(1);
}
