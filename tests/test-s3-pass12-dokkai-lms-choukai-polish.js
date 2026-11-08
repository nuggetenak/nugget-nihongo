import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🧪 Running Siklus III Pass 12: Dokkai Reading Comprehension Sheet, Long-Passage Typography & LMS Polish...');

let passCount = 0;
const totalChecks = 5;

// Check 1: DokkaiSheet touch target & contrast & Senpai anchor
try {
  const dokkaiPath = path.join(rootDir, 'src', 'components', 'exercise', 'DokkaiSheet.tsx');
  const dokkaiContent = fs.readFileSync(dokkaiPath, 'utf8');

  const hasTouchTarget = dokkaiContent.includes('min-h-[40px]') && dokkaiContent.includes('active:scale-95');
  const hasIrasutoya = dokkaiContent.includes('IrasutoyaImage') && dokkaiContent.includes('senpai_studying') && dokkaiContent.includes('animateFloat');
  const hasWcagContrast = dokkaiContent.includes('text-amber-800 dark:text-amber-300') &&
                          dokkaiContent.includes('text-cyan-800 dark:text-cyan-300') &&
                          dokkaiContent.includes('text-emerald-800 dark:text-emerald-300') &&
                          dokkaiContent.includes('text-purple-800 dark:text-purple-300') &&
                          dokkaiContent.includes('text-rose-800 dark:text-rose-300');

  if (hasTouchTarget && hasIrasutoya && hasWcagContrast) {
    console.log('  ✅ Check 1 Passed: DokkaiSheet enforces min-h-[40px] touch target, Irasutoya Senpai anchor, and WCAG AA genre contrast tokens');
    passCount++;
  } else {
    console.error('  ❌ Check 1 Failed: DokkaiSheet missing touch target, Senpai anchor, or WCAG AA contrast tokens', {
      hasTouchTarget,
      hasIrasutoya,
      hasWcagContrast
    });
  }
} catch (e) {
  console.error('  ❌ Check 1 Exception:', e.message);
}

// Check 2: DokkaiSheet .card-interactive-lift
try {
  const dokkaiPath = path.join(rootDir, 'src', 'components', 'exercise', 'DokkaiSheet.tsx');
  const dokkaiContent = fs.readFileSync(dokkaiPath, 'utf8');

  const hasCardLift = dokkaiContent.includes('card-interactive-lift');
  const matches = (dokkaiContent.match(/card-interactive-lift/g) || []).length;

  if (hasCardLift && matches >= 2) {
    console.log(`  ✅ Check 2 Passed: DokkaiSheet contains ${matches} .card-interactive-lift micro-interactions`);
    passCount++;
  } else {
    console.error('  ❌ Check 2 Failed: DokkaiSheet missing sufficient .card-interactive-lift classes', { matches });
  }
} catch (e) {
  console.error('  ❌ Check 2 Exception:', e.message);
}

// Check 3: ExamLmsHub The 3 Clean Doors & Pre-test modal Irasutoya/lift
try {
  const lmsPath = path.join(rootDir, 'src', 'components', 'exercise', 'ExamLmsHub.tsx');
  const lmsContent = fs.readFileSync(lmsPath, 'utf8');

  const hasIrasutoya = lmsContent.includes('IrasutoyaImage') && lmsContent.includes('senpai_studying') && lmsContent.includes('animateFloat');
  const hasPretestCardLift = lmsContent.includes('card-interactive-lift cursor-pointer p-4 rounded-2xl border-2');

  if (hasIrasutoya && hasPretestCardLift) {
    console.log('  ✅ Check 3 Passed: ExamLmsHub Pre-test modal features Irasutoya Senpai anchor and interactive card lift');
    passCount++;
  } else {
    console.error('  ❌ Check 3 Failed: ExamLmsHub missing Pre-test Irasutoya anchor or card lift', {
      hasIrasutoya,
      hasPretestCardLift
    });
  }
} catch (e) {
  console.error('  ❌ Check 3 Exception:', e.message);
}

// Check 4: ExamLmsHub Door 3 tools .card-interactive-lift
try {
  const lmsPath = path.join(rootDir, 'src', 'components', 'exercise', 'ExamLmsHub.tsx');
  const lmsContent = fs.readFileSync(lmsPath, 'utf8');

  const totalLifts = (lmsContent.match(/card-interactive-lift/g) || []).length;
  // Golden set cards (3 doors tabs, items in Door 1, Door 2, Door 3 tools, and pretest options)
  const hasDoor3ToolsLift = totalLifts >= 8;

  if (hasDoor3ToolsLift) {
    console.log(`  ✅ Check 4 Passed: ExamLmsHub applies .card-interactive-lift across ${totalLifts} doors, tools, and cards`);
    passCount++;
  } else {
    console.error('  ❌ Check 4 Failed: ExamLmsHub missing sufficient card-interactive-lift', { totalLifts });
  }
} catch (e) {
  console.error('  ❌ Check 4 Exception:', e.message);
}

// Check 5: ChoukaiSimulatorPage options & review cards .card-interactive-lift
try {
  const choukaiPath = path.join(rootDir, 'src', 'pages', 'ChoukaiSimulatorPage.tsx');
  const choukaiContent = fs.readFileSync(choukaiPath, 'utf8');

  const totalChoukaiLifts = (choukaiContent.match(/card-interactive-lift/g) || []).length;
  const hasOptionLift = choukaiContent.includes('card-interactive-lift min-h-[50px] p-4 rounded-2xl');
  const hasReviewLift = choukaiContent.includes('card-interactive-lift p-4 rounded-2xl bg-surface-2 border border-theme space-y-2');

  if (totalChoukaiLifts >= 3 && hasOptionLift && hasReviewLift) {
    console.log(`  ✅ Check 5 Passed: ChoukaiSimulatorPage integrates .card-interactive-lift across options, review cards, and score banners (${totalChoukaiLifts} occurrences)`);
    passCount++;
  } else {
    console.error('  ❌ Check 5 Failed: ChoukaiSimulatorPage missing option or review card lifts', {
      totalChoukaiLifts,
      hasOptionLift,
      hasReviewLift
    });
  }
} catch (e) {
  console.error('  ❌ Check 5 Exception:', e.message);
}

console.log(`\n📊 Siklus III Pass 12 Result: ${passCount}/${totalChecks} checks passed.`);

if (passCount === totalChecks) {
  console.log('🎉 Siklus III Pass 12 PASSED 100% GREEN!\n');
  process.exit(0);
} else {
  console.error('💥 Siklus III Pass 12 FAILED.\n');
  process.exit(1);
}
