// ══════════════════════════════════════════════════════════════════
//  test-s7-sprint4-fsrs-damping.js
//  Sprint 4: FSRS Same-Day Review Damping & Dojo Practice Ripple Bridge
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT = path.resolve(__dirname, '..');

console.log('🧪 Starting Sprint 4: FSRS Same-Day Review Damping & Dojo Practice Ripple Bridge Test...');

// Check 1: math.ts - Same-Day Review Damping Invariant
console.log('  Check 4.1: math.ts same-day review damping (Delta S <= 0.05 * S)...');
const mathPath = path.join(ROOT, 'src', 'lib', 'fsrs', 'math.ts');
assert(fs.existsSync(mathPath), 'src/lib/fsrs/math.ts must exist');

// Import calculateFSRSReview dynamically or test mathematical implementation
const { calculateFSRSReview } = require(path.join(ROOT, 'src', 'lib', 'fsrs', 'math.ts'));

const establishedCard = {
  due: new Date().toISOString(),
  stability: 10.0,
  difficulty: 5.0,
  elapsed_days: 0,
  scheduled_days: 10,
  reps: 5,
  lapses: 0,
  state: 2,
  last_review: new Date().toISOString(), // Reviewed just now (elapsed = 0)
};

// Test 1: Immediate repeat without damping vs with damping
const normalNextDayCard = {
  ...establishedCard,
  last_review: new Date(Date.now() - 86400000 * 10).toISOString(), // 10 days ago
};
const scheduledReview = calculateFSRSReview(normalNextDayCard, 3);
assert(
  scheduledReview.stability > establishedCard.stability,
  `Scheduled review must expand stability: S=${scheduledReview.stability}`
);

// Test 2: Same-day unscheduled practice
const unscheduledReview = calculateFSRSReview(establishedCard, 3, {
  isUnscheduledPractice: true,
  sameDayDamping: true,
});

const deltaS = unscheduledReview.stability - establishedCard.stability;
const maxAllowedDelta = 0.05 * establishedCard.stability + 0.01; // With rounding tolerance

assert(
  deltaS <= maxAllowedDelta,
  `Unscheduled same-day review stability increase must be damped to Delta S <= 0.05 * S: got delta=${deltaS.toFixed(4)}, max=${maxAllowedDelta}`
);
assert(
  unscheduledReview.stability >= establishedCard.stability,
  'Stability must not decrease on successful Good rating'
);
assert(
  Number.isFinite(unscheduledReview.stability),
  'Stability must remain a finite number'
);
console.log(`  ✅ Check 4.1 passed: Same-day damping verified (Delta S = ${deltaS.toFixed(4)} <= ${maxAllowedDelta.toFixed(4)}).`);

// Check 2: curriculumStore.ts - Dojo practice ripple bridge
console.log('  Check 4.2: curriculumStore.ts recordDojoVocabReview bridge...');
const curriculumStorePath = path.join(ROOT, 'src', 'lib', 'curriculum', 'curriculumStore.ts');
assert(fs.existsSync(curriculumStorePath), 'curriculumStore.ts must exist');
const curriculumContent = fs.readFileSync(curriculumStorePath, 'utf8');

assert(
  curriculumContent.includes('dojoReviewsCount?: number;'),
  'TrackProgressState must include dojoReviewsCount'
);
assert(
  curriculumContent.includes('recordDojoVocabReview: (trackId: TrackId, count?: number) => void;'),
  'CurriculumStoreState must declare recordDojoVocabReview'
);
assert(
  curriculumContent.includes('dojoReviewsCount: (currentTrack.dojoReviewsCount || 0) + count'),
  'recordDojoVocabReview must increment dojoReviewsCount'
);
console.log('  ✅ Check 4.2 passed: curriculumStore exposes recordDojoVocabReview bridge.');

// Check 3: QuizPage.tsx - Integration bridge
console.log('  Check 4.3: QuizPage.tsx wires damping & curriculum ripple...');
const quizPagePath = path.join(ROOT, 'src', 'pages', 'QuizPage.tsx');
assert(fs.existsSync(quizPagePath), 'QuizPage.tsx must exist');
const quizContent = fs.readFileSync(quizPagePath, 'utf8');

assert(
  quizContent.includes('isUnscheduledPractice: activeMode === \'flashcard\''),
  'QuizPage must pass isUnscheduledPractice for flashcard mode'
);
assert(
  quizContent.includes('sameDayDamping: true'),
  'QuizPage must enable sameDayDamping on flashcards'
);
assert(
  quizContent.includes('recordDojoVocabReview'),
  'QuizPage must invoke recordDojoVocabReview on mastered vocab'
);
console.log('  ✅ Check 4.3 passed: QuizPage seamlessly bridges Dojo reviews into FSRS damping and curriculum stats.');

console.log('🎉 ALL SPRINT 4 FSRS DAMPING & RIPPLE CHECKS PASSED (3/3)!');
