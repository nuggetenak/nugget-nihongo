// ══════════════════════════════════════════════════════════════════
//  tests/test-s2-pass6-lesson-study-stages.js
//  Siklus II — Pass 6: Studio Belajar, Can-Do Stages & Micro-Drill Interactive Lifecycles
// ══════════════════════════════════════════════════════════════════

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

console.log('🧪 Starting Siklus II — Pass 6: Studio Belajar, Can-Do Stages & Micro-Drill Interactive Lifecycles Verification...\n');

let failedTests = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ ${message}`);
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failedTests++;
  }
}

// ──────────────────────────────────────────────────────────────────
// Check 6.1: LessonStudyPage Header Contrast & Safe-Area Padding
// ──────────────────────────────────────────────────────────────────
console.log('📋 Check 6.1: LessonStudyPage Contrast & Safe Area Layout');
const lessonStudyPath = path.join(ROOT_DIR, 'src', 'pages', 'LessonStudyPage.tsx');
assert(fs.existsSync(lessonStudyPath), 'src/pages/LessonStudyPage.tsx exists');
const lessonStudyContent = fs.readFileSync(lessonStudyPath, 'utf8');

assert(
  (lessonStudyContent.includes('text-emerald-700 dark:text-emerald-400') || lessonStudyContent.includes('text-emerald-800 dark:text-emerald-300')) &&
  lessonStudyContent.includes('Tuntas ({drillScore ?? 100}%)'),
  'LessonStudyPage completion badge employs WCAG AA dual-theme contrast tokens (text-emerald-700/800 dark:text-emerald-400/300 font-extrabold)'
);

assert(
  lessonStudyContent.includes('pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12'),
  'LessonStudyPage layout cushions mobile viewport with safe-area padding pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12'
);

assert(
  lessonStudyContent.includes("isCanDoLocked = st.id === 'cando' && !isLessonDone && (drillScore === null || drillScore < 80)"),
  'LessonStudyPage strictly gates Stage 4 (Can-Do) with passing drill score >= 80% contract'
);

// ──────────────────────────────────────────────────────────────────
// Check 6.2: CanDoCompletionStage High-Contrast Tokens & Touch Targets
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 6.2: CanDoCompletionStage Contrast & 40px Touch Target');
const canDoPath = path.join(ROOT_DIR, 'src', 'components', 'curriculum', 'player', 'CanDoCompletionStage.tsx');
assert(fs.existsSync(canDoPath), 'src/components/curriculum/player/CanDoCompletionStage.tsx exists');
const canDoContent = fs.readFileSync(canDoPath, 'utf8');

assert(
  canDoContent.includes('min-h-[40px]') && canDoContent.includes('setShowPocketSummary(!showPocketSummary)'),
  'CanDoCompletionStage pocket summary toggle button enforces touch target >= 40px (min-h-[40px])'
);

assert(
  canDoContent.includes('text-emerald-700 dark:text-emerald-400') &&
  canDoContent.includes('Target Kemampuan Nyata'),
  'CanDoCompletionStage target capability header uses dual-theme high contrast tokens'
);

assert(
  (canDoContent.includes('text-amber-900 dark:text-amber-200') || canDoContent.includes('text-amber-950 dark:text-amber-200')) &&
  canDoContent.includes('Etika Komunikasi:'),
  'CanDoCompletionStage cultural etiquette box uses legible dark/light contrast tokens (text-amber-900/950 dark:text-amber-200)'
);

assert(
  (canDoContent.includes('text-rose-900 dark:text-rose-300') || canDoContent.includes('text-rose-950 dark:text-rose-200')) &&
  (canDoContent.includes('text-rose-700 dark:text-rose-400 block') || canDoContent.includes('text-rose-800 dark:text-rose-300 block')) &&
  canDoContent.includes('Waspada Utama:'),
  'CanDoCompletionStage core warning box uses dual-theme WCAG AA tokens (text-rose-900/950 dark:text-rose-300/200)'
);

// ──────────────────────────────────────────────────────────────────
// Check 6.3: CanDoCompletionStage Deduplicated XP & FSRS Scheduling
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 6.3: CanDoCompletionStage Anti-Exploit XP Contract');
assert(
  canDoContent.includes('if (isPassed && lesson?.id && !awardedSet.has(lesson.id)) {') &&
  canDoContent.includes('completeLesson(lesson.id, lesson.grammar_ids || [], lesson.vocab_ids || []);'),
  'CanDoCompletionStage maintains deduplicated lesson completion preventing multiple XP dispatches'
);

// ──────────────────────────────────────────────────────────────────
// Check 6.4: MicroDrillStage Progressive Ladder Badges & Instant Feedback
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 6.4: MicroDrillStage Dual-Theme High Contrast Tokens');
const microDrillPath = path.join(ROOT_DIR, 'src', 'components', 'curriculum', 'player', 'MicroDrillStage.tsx');
assert(fs.existsSync(microDrillPath), 'src/components/curriculum/player/MicroDrillStage.tsx exists');
const microDrillContent = fs.readFileSync(microDrillPath, 'utf8');

assert(
  microDrillContent.includes('text-blue-700 dark:text-blue-400 font-bold') &&
  microDrillContent.includes('text-rose-700 dark:text-rose-400 font-bold') &&
  microDrillContent.includes('text-amber-700 dark:text-amber-300 font-bold') &&
  microDrillContent.includes('text-emerald-700 dark:text-emerald-400 font-bold'),
  'MicroDrillStage badge labels provide WCAG AA contrast for all drill types (blue, rose, amber, emerald)'
);

assert(
  microDrillContent.includes('text-emerald-900 dark:text-emerald-300') &&
  microDrillContent.includes('text-rose-900 dark:text-rose-300'),
  'MicroDrillStage diagnostic instant feedback container uses high-contrast text tokens across light and dark themes'
);

// ──────────────────────────────────────────────────────────────────
// Check 6.5: ExplanationStage Audio Buttons Touch Targets (Zero Sub-40px)
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 6.5: ExplanationStage Audio Touch Targets (>= 40px)');
const explanationPath = path.join(ROOT_DIR, 'src', 'components', 'curriculum', 'player', 'ExplanationStage.tsx');
assert(fs.existsSync(explanationPath), 'src/components/curriculum/player/ExplanationStage.tsx exists');
const explanationContent = fs.readFileSync(explanationPath, 'utf8');

assert(
  !explanationContent.includes('min-h-[36px] min-w-[36px]') &&
  !explanationContent.includes('min-h-[32px] min-w-[32px]'),
  'ExplanationStage has completely eliminated sub-40px audio buttons (min-h-[36px] and min-h-[32px])'
);

assert(
  explanationContent.includes('min-h-[40px] min-w-[40px] p-2 rounded-xl bg-surface border border-accent/20 text-accent hover:bg-surface-3 transition-colors shrink-0 flex items-center justify-center active:scale-95'),
  'ExplanationStage example sentence audio button is elevated to >= 40x40px with active:scale-95'
);

// ──────────────────────────────────────────────────────────────────
// Summary & Verdict
// ──────────────────────────────────────────────────────────────────
console.log('\n' + '─'.repeat(60));
if (failedTests > 0) {
  console.error(`❌ FAILED: ${failedTests} assertion(s) failed in Siklus II — Pass 6.`);
  process.exit(1);
} else {
  console.log('🎉 PASSED: All 5 checks in Siklus II — Pass 6 verified 100% GREEN (Exit Code 0)!');
  process.exit(0);
}
