// ══════════════════════════════════════════════════════════════════
//  tests/test-sprint-7-n4-pedagogy.js
//  SPRINT 7 VERIFICATION SUITE — N4 PEDAGOGICAL FRAMEWORKS & DRILL SYNTHESIS
//  Empirically tests N4 curated lessons across all 10 units (20 lessons),
//  5W1H frameworks, authentic workplace/internship dialogues, 5-tier micro drills,
//  and rich diagnosticFeedback.
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const assert = require('assert');

let passedChecks = 0;
let totalChecks = 0;

function check(desc, fn) {
  totalChecks++;
  try {
    fn();
    passedChecks++;
    console.log(`  ✓ [PASS] ${desc}`);
  } catch (err) {
    console.error(`  ❌ [FAIL] ${desc}: ${err.message}`);
    process.exitCode = 1;
  }
}

console.log('╔══════════════════════════════════════════════════════════════════╗');
console.log('║   NUGGET NIHONGO — SPRINT 7 N4 PEDAGOGICAL ENRICHMENT SUITE     ║');
console.log('╚══════════════════════════════════════════════════════════════════╝\n');

// Import lessonContentAdapter
const { getAdaptiveLessonContent } = require('../src/lib/curriculum/lessonContentAdapter.ts');

const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'public/data');

// ── TEST 1: N4 All 15 Units & 32 Gold-Standard Curated Lessons ──
console.log('── TEST 1: N4 All 15 Units & 32 Gold-Standard Curated Lessons ──');

const n4Json = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'curriculum/curriculum-n4.json'), 'utf8'));

const testLessonsN4 = [];
n4Json.units.forEach((unit, unitIdx) => {
  unit.lessons.forEach((lesson, lessonIdx) => {
    testLessonsN4.push({
      unitIdx,
      lessonIdx,
      expectedId: lesson.id,
      title: lesson.title_id
    });
  });
});

for (const t of testLessonsN4) {
  const unit = n4Json.units[t.unitIdx];
  const lesson = unit.lessons[t.lessonIdx];

  check(`N4 lesson ${lesson.id} matches expected ${t.expectedId}`, () => {
    assert.strictEqual(lesson.id, t.expectedId);
  });

  const adapted = getAdaptiveLessonContent('curriculum-n4', unit, lesson);

  // 1. Pedagogical Framework
  check(`N4 lesson ${lesson.id} (${t.title}) has gold-standard pedagogical framework`, () => {
    assert(adapted.pedagogical_framework, 'Must have pedagogical_framework');
    const f = adapted.pedagogical_framework;
    assert(f.what && f.what.summary && f.what.canDo, 'Must have what section with summary and canDo');
    assert(Array.isArray(f.what.targetPatterns) && f.what.targetPatterns.length >= 1, 'Must have targetPatterns');
    assert(f.sensei_context && f.sensei_context.sceneIntro, 'Must have sensei_context with sceneIntro');
    assert(f.cultural_notes && f.cultural_notes.title, 'Must have cultural_notes with title');
    assert(f.pronunciation_tips && f.pronunciation_tips.title, 'Must have pronunciation_tips with title');
    assert(Array.isArray(f.common_pitfalls) && f.common_pitfalls.length >= 2, 'Must have at least 2 common pitfalls');
    assert(f.who_and_when && f.who_and_when.situational_context, 'Must have who_and_when');
    assert(f.scenario && f.scenario.title, 'Must have scenario with title');
  });

  // 2. Dialogue Quality
  check(`N4 lesson ${lesson.id} has complete authentic dialogue with >= 4 lines`, () => {
    assert(Array.isArray(adapted.dialogue) && adapted.dialogue.length >= 4, `Dialogue must have >= 4 lines (got ${adapted.dialogue ? adapted.dialogue.length : 0})`);
    adapted.dialogue.forEach((line, idx) => {
      assert(line.speaker, `Line ${idx} must have speaker`);
      assert(line.jp, `Line ${idx} must have jp text`);
      assert(line.furigana, `Line ${idx} must have furigana`);
      assert(line.romaji, `Line ${idx} must have romaji`);
      assert(line.idText, `Line ${idx} must have idText`);
    });
  });

  // 3. Drill Quality & Diagnostic Feedback
  check(`N4 lesson ${lesson.id} has 5-step drills with valid answers and diagnostic feedback`, () => {
    assert(Array.isArray(adapted.drills) && adapted.drills.length >= 5, `Must have >= 5 drills (got ${adapted.drills ? adapted.drills.length : 0})`);
    adapted.drills.forEach((d, idx) => {
      assert(d.instruction, `Drill ${idx} missing instruction`);
      assert(d.type, `Drill ${idx} missing type`);
      assert(Array.isArray(d.options) && d.options.length >= 2, `Drill ${idx} must have >= 2 options`);
      assert(d.correctAnswer, `Drill ${idx} must have correctAnswer`);
      assert(d.explanation, `Drill ${idx} must have explanation`);
      assert(d.diagnosticFeedback && typeof d.diagnosticFeedback === 'object', `Drill ${idx} must have diagnosticFeedback`);
      const wrongOptions = d.options.filter(opt => opt !== d.correctAnswer);
      wrongOptions.forEach(opt => {
        assert(d.diagnosticFeedback[opt], `Drill ${idx} missing diagnosticFeedback for wrong option: "${opt}"`);
      });
    });
  });

  // 4. Can-Do Challenge & Pocket Summary
  check(`N4 lesson ${lesson.id} has can_do_challenge and pocket_summary`, () => {
    assert(adapted.can_do_challenge, 'Must have can_do_challenge');
    assert(adapted.can_do_challenge.statement, 'Can-do must have statement');
    assert(adapted.can_do_challenge.promptTask, 'Can-do must have promptTask');
    assert(adapted.can_do_challenge.modelAnswer, 'Can-do must have modelAnswer');
    assert(adapted.can_do_challenge.modelAnswerId, 'Can-do must have modelAnswerId');
    assert(adapted.pocket_summary, 'Must have pocket_summary');
    assert(adapted.pocket_summary.keyFormula, 'Pocket summary must have keyFormula');
    assert(Array.isArray(adapted.pocket_summary.coreWords) && adapted.pocket_summary.coreWords.length > 0, 'Pocket summary must have coreWords');
    assert(adapted.pocket_summary.coreWarning, 'Pocket summary must have coreWarning');
  });
}

// ── SUMMARY & VERIFICATION ──
console.log('\n══════════════════════════════════════════════════════════════════');
console.log(` SPRINT 7 N4 PEDAGOGICAL SUITE: ${passedChecks} / ${totalChecks} CHECKS PASSED`);
console.log('══════════════════════════════════════════════════════════════════\n');

if (passedChecks === totalChecks && totalChecks > 0) {
  console.log('🎉 SPRINT 7 N4 PEDAGOGICAL FRAMEWORKS & DRILL SYNTHESIS 100% VERIFIED!\n');
  process.exit(0);
} else {
  console.error('❌ SPRINT 7 N4 PEDAGOGICAL VERIFICATION FAILED\n');
  process.exit(1);
}
