// ══════════════════════════════════════════════════════════════════
//  test-m1-navigation-tab1.js — Milestone 1 Navigation & Tab 1 Verification
//  Tests:
//  - getNextUncompletedLesson dynamic traversal and fallback
//  - BottomNav 5-tab architecture & legacy contracts
//  - Sidebar 5-tab architecture & accessibility attributes
//  - Header active track switcher presence & non-destructive modal
//  - HomePage pathway-first Tab 1 rendering & test contracts
// ══════════════════════════════════════════════════════════════════

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

console.log('🧪 Starting Milestone 1 Navigation & Tab 1 Verification Suite...\n');

// ── 1. Unit Test: getNextUncompletedLesson helper ───────────────────
console.log('📦 Test 1: getNextUncompletedLesson Dynamic Traversal & Real Production Execution');

// Register TypeScript transpile hook for direct CommonJS require of TypeScript modules
const ts = require('typescript');
if (!require.extensions['.ts']) {
  require.extensions['.ts'] = function(module, filename) {
    const content = fs.readFileSync(filename, 'utf8');
    const compiled = ts.transpileModule(content, {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    }).outputText;
    module._compile(compiled, filename);
  };
}

// Read source file to ensure helper exists and contains real logic
const helperPath = path.join(ROOT, 'src/lib/curriculum/curriculumProgressHelper.ts');
assert(fs.existsSync(helperPath), 'curriculumProgressHelper.ts must exist');
const helperCode = fs.readFileSync(helperPath, 'utf8');
assert(helperCode.includes('export function getNextUncompletedLesson'), 'Must export getNextUncompletedLesson');
assert(helperCode.includes('completedSet.has'), 'Must check completion using Set lookup');

// Directly require genuine production helper — zero toy simulation
const { getNextUncompletedLesson } = require('../src/lib/curriculum/curriculumProgressHelper.ts');
assert.strictEqual(typeof getNextUncompletedLesson, 'function', 'getNextUncompletedLesson must be a callable function');

const mockTrackData = {
  meta: { track_id: 'n5', version: '1.0.0', total_units: 2, authoritative: true },
  units: [
    {
      id: 'n5-u1',
      unit_number: 1,
      title_id: 'Unit 1: Perkenalan Diri',
      can_do_summary: 'Mampu memperkenalkan diri dan asal negara.',
      lessons: [
        { id: 'n5-l1', lesson_number: 1, title_id: 'Pelajaran 1: Salam', can_do_statement: 'Bisa mengucap salam dasar' },
        { id: 'n5-l2', lesson_number: 2, title_id: 'Pelajaran 2: Watashi wa', can_do_statement: 'Bisa menyebut nama sendiri' },
      ],
    },
    {
      id: 'n5-u2',
      unit_number: 2,
      title_id: 'Unit 2: Di Restoran',
      can_do_summary: 'Mampu memesan makanan di kedai.',
      lessons: [
        { id: 'n5-l3', lesson_number: 1, title_id: 'Pelajaran 3: Menu', can_do_statement: 'Bisa membaca menu sederhana' },
      ],
    },
  ],
};

// Case A: Fresh track (0 completed) -> points to lesson 1
const resA = getNextUncompletedLesson('n5', mockTrackData, { completedUnits: [], completedLessons: [] });
assert.strictEqual(resA.lessonId, 'n5-l1');
assert.strictEqual(resA.unitId, 'n5-u1');
assert.strictEqual(resA.unitNumber, 1);
assert.strictEqual(resA.lessonNumber, 1);
assert.strictEqual(resA.isAllCompleted, false);
assert.strictEqual(resA.totalLessons, 3);
assert.strictEqual(resA.completedLessonsCount, 0);

// Case B: Lesson 1 finished -> points dynamically to lesson 2
const resB = getNextUncompletedLesson('n5', mockTrackData, { completedUnits: [], completedLessons: ['n5-l1'] });
assert.strictEqual(resB.lessonId, 'n5-l2');
assert.strictEqual(resB.unitId, 'n5-u1');
assert.strictEqual(resB.unitNumber, 1);
assert.strictEqual(resB.lessonNumber, 2);
assert.strictEqual(resB.isAllCompleted, false);
assert.strictEqual(resB.totalLessons, 3);
assert.strictEqual(resB.completedLessonsCount, 1);

// Case C: Unit 1 all finished -> advances across unit boundary to Unit 2 Lesson 3
const resC = getNextUncompletedLesson('n5', mockTrackData, { completedUnits: ['n5-u1'], completedLessons: ['n5-l1', 'n5-l2'] });
assert.strictEqual(resC.lessonId, 'n5-l3');
assert.strictEqual(resC.unitId, 'n5-u2');
assert.strictEqual(resC.unitNumber, 2);
assert.strictEqual(resC.lessonNumber, 1);
assert.strictEqual(resC.isAllCompleted, false);
assert.strictEqual(resC.totalLessons, 3);
assert.strictEqual(resC.completedLessonsCount, 2);

// Case D: All finished -> marks isAllCompleted: true on final lesson
const resD = getNextUncompletedLesson('n5', mockTrackData, { completedUnits: ['n5-u1', 'n5-u2'], completedLessons: ['n5-l1', 'n5-l2', 'n5-l3'] });
assert.strictEqual(resD.lessonId, 'n5-l3');
assert.strictEqual(resD.unitId, 'n5-u2');
assert.strictEqual(resD.isAllCompleted, true);
assert.strictEqual(resD.totalLessons, 3);
assert.strictEqual(resD.completedLessonsCount, 3);

// Case E: Non-sequential completed lessons (skipping l2) -> finds earliest uncompleted l2
const resE = getNextUncompletedLesson('n5', mockTrackData, { completedUnits: [], completedLessons: ['n5-l1', 'n5-l3'] });
assert.strictEqual(resE.lessonId, 'n5-l2', 'Must find earliest uncompleted lesson rather than advancing to end');
assert.strictEqual(resE.unitId, 'n5-u1');
assert.strictEqual(resE.isAllCompleted, false);
assert.strictEqual(resE.completedLessonsCount, 2);

// Case F: Normalization of store record dictionary: Record<TrackId, TrackProgressState>
const resF = getNextUncompletedLesson('n5', mockTrackData, {
  n5: { completedUnits: [], completedLessons: ['n5-l1'] },
  n4: { completedUnits: [], completedLessons: ['n4-l1', 'n4-l2'] },
});
assert.strictEqual(resF.lessonId, 'n5-l2');
assert.strictEqual(resF.completedLessonsCount, 1);

// Case G: Resilient to undefined, null, or empty progress states
const resG1 = getNextUncompletedLesson('n5', mockTrackData, undefined);
assert.strictEqual(resG1.lessonId, 'n5-l1');
assert.strictEqual(resG1.isAllCompleted, false);

const resG2 = getNextUncompletedLesson('n5', mockTrackData, null);
assert.strictEqual(resG2.lessonId, 'n5-l1');

const resG3 = getNextUncompletedLesson('n5', mockTrackData, {});
assert.strictEqual(resG3.lessonId, 'n5-l1');

// Case H: Hydration fallback when trackData is null, undefined, or empty units
const resH1 = getNextUncompletedLesson('ssw-kaigo', null, {});
assert.strictEqual(resH1.trackId, 'ssw-kaigo');
assert.strictEqual(resH1.lessonId, 'ssw-kaigo-l1');
assert.strictEqual(resH1.isAllCompleted, false);

const resH2 = getNextUncompletedLesson('book-genki', undefined, undefined);
assert.strictEqual(resH2.trackId, 'book-genki');

const resH3 = getNextUncompletedLesson('jft-a1', { units: [] }, {});
assert.strictEqual(resH3.trackId, 'jft-a1');

// Case I: Malformed unit and lesson resilience (verifying VULN-M1-01 and VULN-M1-02 defense)
const resMalformedLessons = getNextUncompletedLesson('n5', { units: [{ id: 'u1', lessons: 'not_an_array' }] }, {});
assert(resMalformedLessons === null || typeof resMalformedLessons === 'object');

const resNullLessonItem = getNextUncompletedLesson('n5', { units: [{ id: 'u1', lessons: [null] }] }, {});
assert(resNullLessonItem === null || typeof resNullLessonItem === 'object');

// Case J: Real Production Track Corpus Verification (curriculum-n5.json)
const n5JsonPath = path.join(ROOT, 'public/data/curriculum/curriculum-n5.json');
assert(fs.existsSync(n5JsonPath), 'curriculum-n5.json must exist');
const n5Data = JSON.parse(fs.readFileSync(n5JsonPath, 'utf8'));
const resProdFresh = getNextUncompletedLesson('n5', n5Data, {});
assert(resProdFresh !== null, 'Production N5 fresh traversal must return result');
assert.strictEqual(resProdFresh.lessonId, 'les-n5-u01-01');
assert.strictEqual(resProdFresh.isAllCompleted, false);
assert(resProdFresh.totalLessons > 0);

console.log('✅ Test 1 Passed: Genuine production getNextUncompletedLesson verified across fresh, mid, completed, and edge cases.');

// ── 2. Contract Test: BottomNav 5-Tab Architecture ─────────────────
console.log('\n📦 Test 2: BottomNav 5-Tab Architecture & Legacy Contracts');
const navPath = path.join(ROOT, 'src/components/layout/BottomNav.tsx');
const navContent = fs.readFileSync(navPath, 'utf8');

// 5 core tabs
assert(navContent.includes("id: 'home'"), 'BottomNav must include home (Belajar)');
assert(navContent.includes("id: 'kebun'"), 'BottomNav must include kebun (Review)');
assert(navContent.includes("id: 'materi'"), 'BottomNav must include materi (Dojo)');
assert(navContent.includes("id: 'sensei'"), 'BottomNav must include sensei (Sensei AI)');
assert(navContent.includes("id: 'settings'"), 'BottomNav must include settings (Profil)');

// Legacy sprint test contracts
assert(navContent.includes("id: 'quiz'"), 'BottomNav must retain literal quiz string for test contracts');
assert(navContent.includes('Sprout'), 'BottomNav must import and use Sprout icon');
assert(navContent.includes('active:scale-95'), 'BottomNav buttons must feature active tactile feedback');
assert(navContent.includes("if (activeTab === 'study')"), 'BottomNav must check activeTab === study');
assert(navContent.includes('return null;'), 'BottomNav must return null during study mode');
assert(navContent.includes('transitionTabChange(item.id, setActiveTab)'), 'BottomNav must use transitionTabChange');
assert(navContent.includes('role="navigation"'), 'BottomNav must have role="navigation"');
assert(navContent.includes("aria-current={isActive ? 'page' : undefined}"), 'BottomNav must mark active page');
console.log('✅ Test 2 Passed: BottomNav 5-tab architecture and test contracts verified.');

// ── 3. Contract Test: Sidebar Desktop Rail ─────────────────────────
console.log('\n📦 Test 3: Sidebar Desktop Navigation Rail');
const sidebarPath = path.join(ROOT, 'src/components/layout/Sidebar.tsx');
const sidebarContent = fs.readFileSync(sidebarPath, 'utf8');

assert(sidebarContent.includes('Pusat Retensi (Brankas FSRS)'), 'Sidebar must label Pusat Retensi (Brankas FSRS)');
assert(sidebarContent.includes('role="complementary"'), 'Sidebar must have role="complementary"');
assert(sidebarContent.includes('role="navigation"'), 'Sidebar must have role="navigation"');
assert(sidebarContent.includes("aria-current={isActive ? 'page' : undefined}"), 'Sidebar must mark active page');
assert(sidebarContent.includes('transitionTabChange(item.id, setActiveTab)'), 'Sidebar must use transitionTabChange');
assert(sidebarContent.includes('lang="ja"'), 'Sidebar must declare lang="ja" for Japanese labels');
console.log('✅ Test 3 Passed: Sidebar desktop navigation rail verified.');

// ── 4. Contract Test: Header Active Track Switcher ─────────────────
console.log('\n📦 Test 4: Header Active Track Switcher & Sheet Modal');
const headerPath = path.join(ROOT, 'src/components/layout/Header.tsx');
const headerContent = fs.readFileSync(headerPath, 'utf8');

assert(headerContent.includes('role="banner"'), 'Header must have role="banner"');
assert(headerContent.includes('SyncStatusIndicator'), 'Header must mount SyncStatusIndicator');
assert(headerContent.includes('useCurriculumStore'), 'Header must read useCurriculumStore');
assert(headerContent.includes('activeTrackId'), 'Header must read activeTrackId');
assert(headerContent.includes('setActiveTrack'), 'Header must call setActiveTrack');
assert(headerContent.includes('role="dialog"'), 'Track picker must have role="dialog"');
assert(headerContent.includes('aria-modal="true"'), 'Track picker must have aria-modal="true"');
assert(headerContent.includes('min-w-[44px] min-h-[44px]'), 'Header drawer trigger must be at least 44px');
assert(headerContent.includes('focus-visible:ring-2 focus-visible:ring-accent'), 'Header buttons must enforce focus-visible rings');
console.log('✅ Test 4 Passed: Header active track switcher button and modal verified.');

// ── 5. Contract Test: HomePage Pathway-First Tab 1 ─────────────────
console.log('\n📦 Test 5: HomePage Pathway-First Tab 1 & Test Contracts');
const homePath = path.join(ROOT, 'src/pages/HomePage.tsx');
const homeContent = fs.readFileSync(homePath, 'utf8');

assert(homeContent.includes('CurriculumTrackBrowser'), 'HomePage must embed CurriculumTrackBrowser');
assert(homeContent.includes('getNextUncompletedLesson'), 'HomePage must use getNextUncompletedLesson');
assert(homeContent.includes('Streak {streak} Hari Aktif'), 'HomePage must display Streak {streak} Hari Aktif');
assert(homeContent.includes('dueCount > 0'), 'HomePage must evaluate dueCount > 0');
assert(homeContent.includes('<SyncStatusPill />'), 'HomePage must mount SyncStatusPill');
assert(homeContent.includes('openBookStudio'), 'HomePage must use openBookStudio');
assert(homeContent.includes('dailyGoalXP'), 'HomePage must read dailyGoalXP');
assert(homeContent.includes('goalProgressPercent'), 'HomePage must calculate goalProgressPercent');
assert(homeContent.includes('todayXP'), 'HomePage must compute todayXP');
assert(homeContent.includes('Target Harian'), 'HomePage must display Target Harian');
assert(homeContent.includes("import { SkeletonCard } from '../components/ui/SkeletonCard';"), 'HomePage must import SkeletonCard');
assert(homeContent.includes('<SkeletonCard type="word"'), 'HomePage must render SkeletonCard when dailyWord is loading');
assert(homeContent.includes('min-h-[180px]'), 'HomePage daily word container must have min-h-[180px]');
assert(homeContent.includes('w-11 h-11') && (homeContent.includes('min-w-[44px] min-h-[44px]') || homeContent.includes('sm:min-w-[44px] sm:min-h-[44px]')), 'HomePage audio/detail buttons must be 44px');
assert(!homeContent.includes('<DetailModal'), 'HomePage must not duplicate DetailModal');
assert(!homeContent.includes('<KanaChartModal'), 'HomePage must not duplicate KanaChartModal');
assert(!homeContent.includes('<ConjugationModal'), 'HomePage must not duplicate ConjugationModal');
assert(!homeContent.includes('<NuanceCompareModal'), 'HomePage must not duplicate NuanceCompareModal');
assert(homeContent.includes('pb-[calc(5.5rem+env(safe-area-inset-bottom))]'), 'HomePage must maintain safe-area cushion');
console.log('✅ Test 5 Passed: HomePage pathway-first Tab 1 and test contracts verified.');

console.log('\n🎉 ALL MILESTONE 1 VERIFICATION CONTRACTS PASSED WITH 100% GREEN STATUS!');
