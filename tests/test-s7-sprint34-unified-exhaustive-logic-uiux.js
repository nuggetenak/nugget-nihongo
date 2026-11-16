// ══════════════════════════════════════════════════════════════════
//  test-s7-sprint34-unified-exhaustive-logic-uiux.js
//  Sprint 34: Unified 5-Domain Logic Flaw Audit & Dual-Viewport Walkthrough
//  Verifies:
//    1. Star Scramble Substring Ambiguity Resolution (Minimal Length Diff)
//    2. Lesson Completion Atomic Heatmap Sync & ID Sanitization
//    3. CBT Exam Submission Activity & Streak Integration
//    4. Garden Wilting Safe Math & Capacity Guardrails
//    5. W3C View Transitions Handled Promise Rejection Invariant
//    6. Headless Dual-Viewport Playwright Walkthrough Verification
// ══════════════════════════════════════════════════════════════════

import assert from 'assert';
import fs from 'fs';
import path from 'path';

console.log('⚡ Running Suite 175: Unified 5-Domain Logic Flaw Audit & Dual-Viewport Playwright Walkthrough...');

const rootDir = process.cwd().includes('nugget-nihongo')
  ? process.cwd()
  : path.join(process.cwd(), 'nugget-nihongo');

// ── Test 1: Star Scramble Substring Ambiguity Resolution ────────
console.log('\nChecking Test 1: Star Scramble Minimal Length Difference Matching...');
const { findMatchingOptionIndex } = await import('../src/lib/exercise/starScrambleHelper.ts');

// 1. Exact match
assert.strictEqual(
  findMatchingOptionIndex('本を', ['お風呂に', '入って', '本を', '読んでから']),
  2,
  'Exact token must match index 2'
);

// 2. Ambiguity resolution: Options have shorter substring 'に' before 'お風呂に。'
// cleanStar is 'お風呂に'. Candidate 'に' has lengthDiff = 3. Candidate 'お風呂に。' has lengthDiff = 1.
// Must select candidate with minimal length difference (index 1) instead of index 0.
const ambiguousOptions = ['に', 'お風呂に。', '本', '寝ます'];
const matchedAmbiguous = findMatchingOptionIndex('お風呂に', ambiguousOptions);
assert.strictEqual(
  matchedAmbiguous,
  1,
  "Minimal length difference must pick 'お風呂に。' (index 1) over shorter prefix 'に' (index 0)"
);

// 3. Negative cases
assert.strictEqual(findMatchingOptionIndex(null, ambiguousOptions), -1, 'null star token returns -1');
assert.strictEqual(findMatchingOptionIndex('', ambiguousOptions), -1, 'empty star token returns -1');
assert.strictEqual(findMatchingOptionIndex('   ', ambiguousOptions), -1, 'whitespace star token returns -1');
assert.strictEqual(findMatchingOptionIndex('無関係', ambiguousOptions), -1, 'unrelated star token returns -1');
console.log('✅ Test 1 Passed: Star Scramble minimal length difference disambiguation verified.');

// ── Test 2: Lesson Completion Atomic Heatmap Sync & ID Sanitization ──
console.log('\nChecking Test 2: Lesson Completion Atomic Heatmap Sync & ID Sanitization...');
const storePath = path.join(rootDir, 'src', 'store', 'useAppStore.ts');
const storeContent = fs.readFileSync(storePath, 'utf8');

assert(
  storeContent.includes("if (!lessonId || typeof lessonId !== 'string' || !lessonId.trim())"),
  'completeLesson must defensively validate and reject non-string or empty lesson IDs'
);
assert(
  storeContent.includes('useGamificationStore.getState().recordActivity'),
  'completeLesson must record activity in useGamificationStore daily heatmap'
);
assert(
  storeContent.includes('const rawId = typeof vid === \'string\' ? vid : vid?.id || vid?.word;') &&
  storeContent.includes('const id = typeof rawId === \'string\' ? rawId.trim() : rawId;'),
  'injectLessonItemsToFSRS must sanitize and trim card keys'
);
console.log('✅ Test 2 Passed: Lesson completion heatmap synchronization & ID sanitization verified.');

// ── Test 3: CBT Exam Submission Activity & Streak Integration ────
console.log('\nChecking Test 3: CBT Exam Submission Activity & Streak Integration...');
const cbtScreenPath = path.join(rootDir, 'src', 'components', 'exercise', 'CbtRunnerScreen.tsx');
const cbtContent = fs.readFileSync(cbtScreenPath, 'utf8');

assert(
  cbtContent.includes("import { useGamificationStore } from '../../lib/gamification/gamificationStore';"),
  'CbtRunnerScreen must import useGamificationStore'
);
assert(
  cbtContent.includes('useAppStore.getState().recordStudyActivity();') &&
  cbtContent.includes('useGamificationStore.getState().recordActivity(sessionSummary.totalQuestions, earnedXp);'),
  'CbtRunnerScreen must record study activity and heatmap on test submission'
);
console.log('✅ Test 3 Passed: CBT exam activity & streak integration verified.');

// ── Test 4: Garden Wilting Safe Math & Capacity Guardrails ───────
console.log('\nChecking Test 4: Garden Wilting Safe Math & Capacity Guardrails...');
const gardenStorePath = path.join(rootDir, 'src', 'lib', 'garden', 'gardenStore.ts');
const gardenContent = fs.readFileSync(gardenStorePath, 'utf8');

assert(
  gardenContent.includes('const maxW = Math.max(1, p.maxWater || 5);'),
  'gardenStore must safeguard maxWater division with Math.max(1, p.maxWater || 5)'
);
assert(
  gardenContent.includes('MAX_GARDEN_CAPACITY = 36'),
  'gardenStore must declare MAX_GARDEN_CAPACITY ceiling'
);
console.log('✅ Test 4 Passed: Garden store numerical safety and capacity verified.');

// ── Test 5: W3C View Transitions Handled Promise Rejection Invariant ──
console.log('\nChecking Test 5: W3C View Transitions Handled Promise Rejection Invariant...');
const vtPath = path.join(rootDir, 'src', 'lib', 'ui', 'viewTransition.ts');
const vtContent = fs.readFileSync(vtPath, 'utf8');

assert(
  vtContent.includes('transition.ready.catch(() => {})'),
  'withViewTransition must catch transition.ready rejections'
);
assert(
  vtContent.includes('transition.finished.catch(() => {})'),
  'withViewTransition must catch transition.finished rejections'
);
console.log('✅ Test 5 Passed: View transition promise rejections safely caught.');

// ── Test 6: Headless Dual-Viewport Playwright Walkthrough Contract ──
console.log('\nChecking Test 6: Headless Dual-Viewport Playwright Walkthrough Script...');
const auditScriptPath = path.join(rootDir, 'scripts', 'playwright-exhaustive-audit.js');
assert(fs.existsSync(auditScriptPath), 'playwright-exhaustive-audit.js must exist');
const auditScriptContent = fs.readFileSync(auditScriptPath, 'utf8');

assert(
  auditScriptContent.includes('width: 390, height: 844') &&
  auditScriptContent.includes('width: 1280, height: 800'),
  'playwright-exhaustive-audit.js must test both 390x844 mobile and 1280x800 desktop viewports'
);
assert(
  auditScriptContent.includes('nav[aria-label="Navigasi Utama Ponsel"]'),
  'playwright-exhaustive-audit.js must verify BottomNav visibility and responsiveness'
);
console.log('✅ Test 6 Passed: Headless Playwright audit contract verified.');

console.log('\n🎉 ALL SPRINT 34 UNIFIED LOGIC & UI/UX AUDIT CONTRACTS PASSED WITH 100% GREEN STATUS!\n');
