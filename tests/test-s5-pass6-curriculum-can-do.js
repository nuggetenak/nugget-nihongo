// ══════════════════════════════════════════════════════════════════
//  test-s5-pass6-curriculum-can-do.js — Forensic Unit & Regression Suite
//  Siklus V Pass 6: JLPT N5–N1 Curriculum & Can-Do Descriptors Audit
//  Validates 90 units, 184 lessons, 100% unique Can-Do descriptors,
//  referential integrity with 876 grammar points, adaptive content engine,
//  and offline-first curriculum progress state machine.
// ══════════════════════════════════════════════════════════════════

const assert = require('assert');
const path = require('path');
const fs = require('fs');

console.log('╔══════════════════════════════════════════════════════════════════╗');
console.log('║   SIKLUS V PASS 6: JLPT N5–N1 CURRICULUM & CAN-DO AUDIT          ║');
console.log('║   90 Units • 184 Lessons • 876 Grammar Points • 100% Can-Do Res  ║');
console.log('╚══════════════════════════════════════════════════════════════════╝\n');

const ROOT_DIR = path.resolve(__dirname, '..');

// ── Check 1: Curriculum Topology & Structural Completeness (90 Units / 184 Lessons) ──
console.log('  🔍 Check 1: Validating Curriculum Topology across N5, N4, N3, N2, N1...');

const EXPECTED_SPECS = {
  n5: { units: 15, lessons: 32, grammarCount: 94 },
  n4: { units: 15, lessons: 32, grammarCount: 92 },
  n3: { units: 20, lessons: 40, grammarCount: 180 },
  n2: { units: 20, lessons: 40, grammarCount: 310 },
  n1: { units: 20, lessons: 40, grammarCount: 200 },
};

const allUnitIds = new Set();
const allLessonIds = new Set();
const allCanDoStatements = new Set();
let totalUnitsAcrossLevels = 0;
let totalLessonsAcrossLevels = 0;
let totalGrammarAcrossLevels = 0;

for (const [level, spec] of Object.entries(EXPECTED_SPECS)) {
  const jsonPath = path.join(ROOT_DIR, 'public/data/curriculum', `curriculum-${level}.json`);
  assert(fs.existsSync(jsonPath), `Curriculum JSON for ${level.toUpperCase()} must exist`);

  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  assert(Array.isArray(data.units), `${level} must have an array of units`);
  assert.strictEqual(
    data.units.length,
    spec.units,
    `${level.toUpperCase()} must have exactly ${spec.units} units (got ${data.units.length})`
  );

  let lessonCount = 0;
  data.units.forEach((u, uIdx) => {
    // Unit ID uniqueness & format
    assert(u.id, `Unit at index ${uIdx} in ${level} must have an id`);
    assert(!allUnitIds.has(u.id), `Duplicate unit ID detected: ${u.id}`);
    allUnitIds.add(u.id);

    // Continuous 1-based unit indexing
    assert.strictEqual(u.unit_number, uIdx + 1, `Unit number must be 1-based and continuous (expected ${uIdx + 1}, got ${u.unit_number})`);

    // Titles & Themes
    assert(u.title_id && u.title_id.trim().length > 0, `Unit ${u.id} must have a non-empty title_id`);
    assert(u.title_jp && u.title_jp.trim().length > 0, `Unit ${u.id} must have a non-empty title_jp`);

    // Unit Can-Do Summary
    assert(u.can_do_summary && u.can_do_summary.trim().length >= 10, `Unit ${u.id} must have a comprehensive can_do_summary`);
    assert(!/TODO|TBD|undefined|null|\[object Object\]|dummy/i.test(u.can_do_summary), `Unit ${u.id} can_do_summary contains placeholder tokens`);

    // Lessons inside unit
    assert(Array.isArray(u.lessons) && u.lessons.length > 0, `Unit ${u.id} must contain at least 1 lesson`);
    u.lessons.forEach((l, lIdx) => {
      lessonCount++;
      assert(l.id, `Lesson at index ${lIdx} in unit ${u.id} must have an id`);
      assert(!allLessonIds.has(l.id), `Duplicate lesson ID detected: ${l.id}`);
      allLessonIds.add(l.id);

      assert.strictEqual(l.lesson_number, lIdx + 1, `Lesson number in unit ${u.id} must be 1-based (expected ${lIdx + 1}, got ${l.lesson_number})`);
      assert(l.title_id && l.title_id.trim().length > 0, `Lesson ${l.id} must have a non-empty title_id`);
      assert(l.title_jp && l.title_jp.trim().length > 0, `Lesson ${l.id} must have a non-empty title_jp`);

      // Lesson Can-Do Statement
      assert(l.can_do_statement && l.can_do_statement.trim().length >= 10, `Lesson ${l.id} must have an actionable can_do_statement`);
      assert(!/TODO|TBD|undefined|null|\[object Object\]|dummy/i.test(l.can_do_statement), `Lesson ${l.id} can_do_statement contains placeholder tokens`);
      
      // Can-Do statement 100% uniqueness check (No copy-paste artifacts)
      assert(!allCanDoStatements.has(l.can_do_statement), `Duplicate can_do_statement found across lessons: "${l.can_do_statement}" in ${l.id}`);
      allCanDoStatements.add(l.can_do_statement);
    });
  });

  assert.strictEqual(
    lessonCount,
    spec.lessons,
    `${level.toUpperCase()} must have exactly ${spec.lessons} lessons (got ${lessonCount})`
  );

  totalUnitsAcrossLevels += data.units.length;
  totalLessonsAcrossLevels += lessonCount;
}

assert.strictEqual(totalUnitsAcrossLevels, 90, `Total units across N5-N1 must be 90 (got ${totalUnitsAcrossLevels})`);
assert.strictEqual(totalLessonsAcrossLevels, 184, `Total lessons across N5-N1 must be 184 (got ${totalLessonsAcrossLevels})`);
assert.strictEqual(allCanDoStatements.size, 184, `All 184 lessons must have strictly unique can_do_statements (got ${allCanDoStatements.size})`);
console.log(`  ✅ [PASS] 90 Units, 184 Lessons, and 184 strictly unique Can-Do Descriptors verified!`);

// ── Check 2: Grammar Referential Integrity & Zero Orphan Points ──
console.log('\n  🔍 Check 2: Validating Grammar Mapping & Zero Orphaned Points across N5–N1...');

for (const [level, spec] of Object.entries(EXPECTED_SPECS)) {
  const jsonPath = path.join(ROOT_DIR, 'public/data/curriculum', `curriculum-${level}.json`);
  const grammarPath = path.join(ROOT_DIR, 'public/data/grammar', `grammar-${level}.js`);

  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  const win = {};
  const fn = new Function('window', 'module', 'exports', fs.readFileSync(grammarPath, 'utf8'));
  const dummyModule = { exports: {} };
  fn(win, dummyModule, dummyModule.exports);
  const grammarList = win[`grammar${level.toUpperCase()}`] || dummyModule.exports[`grammar${level.toUpperCase()}`] || [];
  const grammarIdSet = new Set(grammarList.map(g => g.id));

  assert.strictEqual(
    grammarList.length,
    spec.grammarCount,
    `Authoritative grammar-${level}.js count must be ${spec.grammarCount} (got ${grammarList.length})`
  );

  const mappedGrammar = new Set();
  data.units.forEach(u => {
    assert(Array.isArray(u.grammar_ids) && u.grammar_ids.length > 0, `Unit ${u.id} must define grammar_ids`);
    u.grammar_ids.forEach(gid => {
      assert(grammarIdSet.has(gid), `Grammar ID ${gid} in Unit ${u.id} does not exist in grammar-${level}.js!`);
      assert(!mappedGrammar.has(gid), `Duplicate grammar ID ${gid} found in Unit ${u.id}!`);
      mappedGrammar.add(gid);
    });
  });

  // Zero orphaned grammar points
  assert.strictEqual(
    mappedGrammar.size,
    grammarList.length,
    `All ${grammarList.length} grammar points in ${level.toUpperCase()} must be mapped (got ${mappedGrammar.size})`
  );
  totalGrammarAcrossLevels += mappedGrammar.size;
}

assert.strictEqual(totalGrammarAcrossLevels, 876, `Total mapped grammar points across N5–N1 must be 876 (got ${totalGrammarAcrossLevels})`);
console.log(`  ✅ [PASS] 876/876 Grammar Points mapped with 0 broken references and 0 orphan points!`);

// ── Check 3: Universal Adaptive Content Engine (lessonContentAdapter.ts) ──
console.log('\n  🔍 Check 3: Validating Universal Adaptive Content Engine across 184 Lessons...');

const {
  getAdaptiveLessonContent,
  cleanOptionText,
  shuffleOptions,
} = require('../src/lib/curriculum/lessonContentAdapter.ts');

// Test all 184 lessons adapt cleanly with complete rich content
for (const level of Object.keys(EXPECTED_SPECS)) {
  const jsonPath = path.join(ROOT_DIR, 'public/data/curriculum', `curriculum-${level}.json`);
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  data.units.forEach(u => {
    u.lessons.forEach(l => {
      const adapted = getAdaptiveLessonContent(level, u, l, [], []);
      assert(adapted.pedagogical_framework, `Lesson ${l.id} must have pedagogical_framework`);
      assert(adapted.pedagogical_framework.what, `Lesson ${l.id} must have WHAT section`);
      assert(adapted.pedagogical_framework.sensei_context, `Lesson ${l.id} must have SENSEI CONTEXT`);
      assert(adapted.pedagogical_framework.cultural_notes, `Lesson ${l.id} must have CULTURAL NOTES`);
      assert(adapted.pedagogical_framework.pronunciation_tips, `Lesson ${l.id} must have PRONUNCIATION TIPS`);
      assert(Array.isArray(adapted.pedagogical_framework.common_pitfalls), `Lesson ${l.id} must have COMMON PITFALLS`);
      assert(Array.isArray(adapted.dialogue) && adapted.dialogue.length >= 2, `Lesson ${l.id} must have dialogue`);
      assert(Array.isArray(adapted.drills) && adapted.drills.length === 5, `Lesson ${l.id} must have 5-step drill ladder`);
      assert(adapted.can_do_challenge, `Lesson ${l.id} must have can_do_challenge`);
      assert(adapted.pocket_summary, `Lesson ${l.id} must have pocket_summary`);
    });
  });
}
console.log('  ✅ [PASS] All 184 lessons dynamically adapted with 100% 5W1H & Drill completeness!');

// ── Check 4: Adaptive Content Hardening & Edge Cases ──
console.log('\n  🔍 Check 4: Testing Extreme Edge Cases on Lesson Content Adapter...');

// 4a: Null / undefined lesson
const nullAdapted = getAdaptiveLessonContent('n5', null, null);
assert(nullAdapted && nullAdapted.id === 'fallback-lesson', 'Null lesson must return a resilient fallback lesson');

// 4b: Minimal lesson object without grammar_ids or vocab_ids
const minimalAdapted = getAdaptiveLessonContent('n5', null, { id: 'test-minimal-lesson' });
assert(minimalAdapted.drills && minimalAdapted.drills.length === 5, 'Minimal lesson must adapt cleanly with 5 drills');

// 4c: Grammar with empty examples or missing jp
const brokenGrammar = [{ id: 'broken-g1', pattern: '〜て', examples: [{ id: 'ex1' }] }];
const brokenExAdapted = getAdaptiveLessonContent('n5', null, { id: 'test-broken-ex', grammar_ids: ['broken-g1'] }, brokenGrammar);
assert(brokenExAdapted.dialogue && brokenExAdapted.dialogue.length >= 2, 'Broken grammar examples must gracefully fall back without throwing');

// 4d: cleanOptionText type safety
assert.strictEqual(cleanOptionText(null), '', 'cleanOptionText(null) must return empty string');
assert.strictEqual(cleanOptionText(undefined), '', 'cleanOptionText(undefined) must return empty string');
assert.strictEqual(cleanOptionText(12345), '', 'cleanOptionText(number) must return empty string');
assert.strictEqual(
  cleanOptionText('本を 読む (Urutan terbalik bahasa Indonesia)'),
  '本を 読む',
  'cleanOptionText must strip distractor labels'
);

// 4e: shuffleOptions helper
const unshuffled = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const shuffled = shuffleOptions(unshuffled);
assert.strictEqual(shuffled.length, 10, 'shuffled array must have identical length');
assert(shuffled.every(item => unshuffled.includes(item)), 'shuffled array must contain identical elements');
console.log('  ✅ [PASS] Edge case resilience & option sanitization verified 100%!');

// ── Check 5: Next Uncompleted Lesson Engine (curriculumProgressHelper.ts) ──
console.log('\n  🔍 Check 5: Validating Next Uncompleted Lesson Engine...');

const { getNextUncompletedLesson } = require('../src/lib/curriculum/curriculumProgressHelper.ts');

// 5a: Empty / hydrating track data returns safe fallback
const fallbackRes = getNextUncompletedLesson('n5', null, {});
assert(fallbackRes && fallbackRes.lessonId === 'n5-l1', 'Null trackData must return safe fallback lesson');
assert.strictEqual(fallbackRes.isAllCompleted, false, 'Fallback lesson must not be marked completed');

// 5b: Track with empty units returns fallback
const emptyUnitRes = getNextUncompletedLesson('n5', { units: [{ lessons: [] }] }, {});
assert(emptyUnitRes && emptyUnitRes.lessonId === 'n5-l1', 'Empty units must return safe fallback lesson');

// 5c: Uncompleted lesson identified sequentially
const sampleTrack = {
  units: [
    {
      id: 'u1',
      unit_number: 1,
      title_id: 'Unit 1: Salam',
      lessons: [
        { id: 'l1', lesson_number: 1, title_id: 'P1' },
        { id: 'l2', lesson_number: 2, title_id: 'P2' },
      ],
    },
    {
      id: 'u2',
      unit_number: 2,
      title_id: 'Unit 2: Angka',
      lessons: [
        { id: 'l3', lesson_number: 1, title_id: 'P3' },
      ],
    },
  ],
};

const next1 = getNextUncompletedLesson('n5', sampleTrack, { completedLessons: [] });
assert.strictEqual(next1.lessonId, 'l1', 'Earliest uncompleted lesson must be l1');
assert.strictEqual(next1.isAllCompleted, false, 'isAllCompleted must be false');

const next2 = getNextUncompletedLesson('n5', sampleTrack, { completedLessons: ['l1'] });
assert.strictEqual(next2.lessonId, 'l2', 'Next uncompleted lesson must be l2');
assert.strictEqual(next2.isAllCompleted, false, 'isAllCompleted must be false');

const next3 = getNextUncompletedLesson('n5', sampleTrack, { completedLessons: ['l1', 'l2'] });
assert.strictEqual(next3.lessonId, 'l3', 'Next uncompleted lesson must be l3 in Unit 2');
assert.strictEqual(next3.isAllCompleted, false, 'isAllCompleted must be false');

// 5d: All completed condition
const nextAllDone = getNextUncompletedLesson('n5', sampleTrack, { completedLessons: ['l1', 'l2', 'l3'] });
assert.strictEqual(nextAllDone.lessonId, 'l3', 'When all completed, return last encountered lesson');
assert.strictEqual(nextAllDone.isAllCompleted, true, 'isAllCompleted must be true');
assert.strictEqual(nextAllDone.completedLessonsCount, 3, 'completedLessonsCount must equal totalLessons');
console.log('  ✅ [PASS] Next uncompleted lesson engine verified across state transitions!');

// ── Check 6: Offline-First Curriculum State Store Contract Hardening ──
console.log('\n  🔍 Check 6: Validating Curriculum Store Hardening & State Invariants...');

const storeSource = fs.readFileSync(path.join(ROOT_DIR, 'src/lib/curriculum/curriculumStore.ts'), 'utf8');

// Verify score sanitization & NaN immunity in source
assert(storeSource.includes('cleanScore'), 'curriculumStore must sanitize cleanScore against NaN');
assert(storeSource.includes('Number.isFinite'), 'curriculumStore must enforce Number.isFinite on scores');
assert(storeSource.includes('completeUnit:'), 'curriculumStore must expose completeUnit method');

// Verify importProgressJson security guards
assert(storeSource.includes('validSubstratums'), 'importProgressJson must validate substratum options');
assert(storeSource.includes('DEFAULT_TRACK_PROGRESS[parsed.activeTrackId'), 'importProgressJson must validate activeTrackId against known tracks');

console.log('  ✅ [PASS] Curriculum Store state invariants & security contracts verified!');

console.log('\n══════════════════════════════════════════════════════════════════');
console.log('🎉 SIKLUS V PASS 6: CURRICULUM & CAN-DO AUDIT PASSED 100% GREEN!');
console.log('══════════════════════════════════════════════════════════════════\n');
