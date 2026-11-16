// ══════════════════════════════════════════════════════════════════
//  test-s7-sprint3-studio-ergonomics.js
//  Sprint 3: Studio Belajar Non-Sticky Ergonomics & Mobile Viewport
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT = path.resolve(__dirname, '..');

console.log('🧪 Starting Sprint 3: Studio Belajar Non-Sticky Ergonomics & Mobile Viewport Test...');

// Check 1: LessonStudyPage.tsx - Non-sticky 4-stage stepper & clean mobile ergonomics
console.log('  Check 3.1: LessonStudyPage.tsx non-sticky stepper & mobile-first viewport...');
const lessonStudyPath = path.join(ROOT, 'src', 'pages', 'LessonStudyPage.tsx');
assert(fs.existsSync(lessonStudyPath), 'LessonStudyPage.tsx must exist');
const lessonStudyContent = fs.readFileSync(lessonStudyPath, 'utf8');

assert(
  !lessonStudyContent.includes('sticky top-'),
  'LessonStudyPage stepper must eliminate sticky top positioning to free mobile viewport'
);
assert(
  lessonStudyContent.includes('min-h-[44px]') && lessonStudyContent.includes('active:scale-95'),
  'LessonStudyPage stage buttons must maintain >= 44px touch targets and active:scale-95'
);
assert(
  lessonStudyContent.includes("activeStage === 'dialogue'") &&
  lessonStudyContent.includes("activeStage === 'explanation'") &&
  lessonStudyContent.includes("activeStage === 'drills'") &&
  lessonStudyContent.includes("activeStage === 'cando'"),
  'LessonStudyPage must maintain complete 4-stage learning flow'
);
assert(
  lessonStudyContent.includes('overflow-x-hidden') &&
  lessonStudyContent.includes('pb-[calc(5.5rem+env(safe-area-inset-bottom))]'),
  'LessonStudyPage must enforce horizontal overflow defense and safe-area cushion'
);
console.log('  ✅ Check 3.1 passed: LessonStudyPage non-sticky stepper and mobile viewport validated.');

// Check 2: ExplanationStage.tsx - In-flow segmented tabs and pillar anchors
console.log('  Check 3.2: ExplanationStage.tsx non-sticky sub-tabs & accessible tablist...');
const explanationPath = path.join(ROOT, 'src', 'components', 'curriculum', 'player', 'ExplanationStage.tsx');
assert(fs.existsSync(explanationPath), 'ExplanationStage.tsx must exist');
const explanationContent = fs.readFileSync(explanationPath, 'utf8');

assert(
  !explanationContent.includes('sticky top-[106px]') && !explanationContent.includes('sticky top-'),
  'ExplanationStage must eliminate sticky top stacking'
);
assert(
  explanationContent.includes('role="tablist"') &&
  explanationContent.includes('aria-label="Pilar Pembelajaran Bedah Materi"'),
  'ExplanationStage must have accessible tablist role and label'
);
assert(
  explanationContent.includes("activeSubTab === 'all'") &&
  explanationContent.includes("activeSubTab === 'grammar'") &&
  explanationContent.includes("activeSubTab === 'vocab'") &&
  explanationContent.includes("activeSubTab === 'pitfalls'"),
  'ExplanationStage must provide sub-tabs for All, Grammar, Vocab, and Pitfalls'
);
assert(
  explanationContent.includes('min-h-[40px]') && explanationContent.includes('active:scale-95'),
  'ExplanationStage sub-tab buttons must satisfy >= 40px touch minimum and active scale feedback'
);
assert(
  explanationContent.includes('ChevronUp') && explanationContent.includes("behavior: 'smooth'"),
  'ExplanationStage must include floating smooth scroll-to-top quick jump button'
);
console.log('  ✅ Check 3.2 passed: ExplanationStage non-sticky segmented tabs verified.');

console.log('🎉 ALL SPRINT 3 STUDIO ERGONOMICS CHECKS PASSED (2/2)!');
