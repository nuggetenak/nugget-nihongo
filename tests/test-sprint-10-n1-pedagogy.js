// ══════════════════════════════════════════════════════════════════
//  tests/test-sprint-10-n1-pedagogy.js
//  SPRINT 10 VERIFICATION SUITE — N1 MASTERY TRACK PEDAGOGICAL INTEGRITY
//  Empirically tests N1 curated lessons across all 20 units (40 lessons),
//  5W1H frameworks, authentic executive dialogues, 5-tier micro drills,
//  rich diagnostic feedback, and cross-lesson diversity invariants.
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
console.log('║   NUGGET NIHONGO — SPRINT 10 N1 PEDAGOGICAL INTEGRITY SUITE      ║');
console.log('╚══════════════════════════════════════════════════════════════════╝\n');

const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'public/data');

// Import N1 Curated Lessons directly
const { n1CuratedLessons } = require('../src/lib/curriculum/lessons/n1/index.ts');

// ── TEST 1: N1 All 20 Units & 40 Gold-Standard Curated Lessons ──
console.log('── TEST 1: N1 All 20 Units & 40 Gold-Standard Curated Lessons ──');

const n1JsonPath = path.join(DATA_DIR, 'curriculum/curriculum-n1.json');
assert(fs.existsSync(n1JsonPath), `Curriculum N1 JSON must exist at ${n1JsonPath}`);
const n1Json = JSON.parse(fs.readFileSync(n1JsonPath, 'utf8'));

check('N1 curriculum has exactly 20 thematic units', () => {
  assert.strictEqual(n1Json.units.length, 20);
});

check('N1 curriculum metadata matches master specifications', () => {
  assert.strictEqual(n1Json.meta.track_id, 'curriculum-n1');
  assert.strictEqual(n1Json.meta.level, 'n1');
  assert.strictEqual(n1Json.meta.total_units, 20);
  assert.strictEqual(n1Json.meta.total_lessons, 40);
  assert.strictEqual(n1Json.meta.total_grammar_points, 200);
});

const testLessonsN1 = [];
n1Json.units.forEach((unit, unitIdx) => {
  unit.lessons.forEach((lesson, lessonIdx) => {
    testLessonsN1.push({
      unitIdx,
      lessonIdx,
      expectedId: lesson.id,
      title: lesson.title_id
    });
  });
});

check('N1 curriculum has exactly 40 lessons', () => {
  assert.strictEqual(testLessonsN1.length, 40);
});

for (const t of testLessonsN1) {
  const unit = n1Json.units[t.unitIdx];
  const lesson = unit.lessons[t.lessonIdx];

  check(`N1 lesson ${lesson.id} matches expected ${t.expectedId}`, () => {
    assert.strictEqual(lesson.id, t.expectedId);
  });

  const adapted = n1CuratedLessons[lesson.id];
  assert(adapted, `Curated lesson content must exist for ${lesson.id}`);

  // 1. Pedagogical Framework
  check(`N1 lesson ${lesson.id} (${t.title}) has gold-standard pedagogical framework`, () => {
    assert(adapted.pedagogical_framework, 'Must have pedagogical_framework');
    const f = adapted.pedagogical_framework;
    assert(f.what && f.what.summary && f.what.canDo, 'Must have what section with summary and canDo');
    assert(Array.isArray(f.what.targetPatterns) && f.what.targetPatterns.length >= 1, 'Must have targetPatterns');
    assert(Array.isArray(f.what.coreVocabSample) && f.what.coreVocabSample.length >= 1, 'Must have coreVocabSample');
    assert(f.sensei_context && f.sensei_context.sceneIntro && f.sensei_context.dailyMission && f.sensei_context.whyOrder, 'Must have complete sensei_context');
    assert(f.cultural_notes && f.cultural_notes.title && f.cultural_notes.etiquette && f.cultural_notes.taboos, 'Must have cultural_notes with title, etiquette, taboos');
    assert(f.pronunciation_tips && f.pronunciation_tips.title && f.pronunciation_tips.moraNote && f.pronunciation_tips.soundTip, 'Must have pronunciation_tips');
    assert(Array.isArray(f.common_pitfalls) && f.common_pitfalls.length >= 2, 'Must have at least 2 common pitfalls');
    f.common_pitfalls.forEach((pit, pIdx) => {
      assert(pit.title && pit.caseScenario && pit.pitfallWarning && pit.rightSolution && pit.explanation, `Pitfall ${pIdx} missing required fields`);
    });
    assert(f.who_and_when && f.who_and_when.situational_context && f.who_and_when.social_relations && f.who_and_when.when_not_to_use, 'Must have complete who_and_when');
    assert(f.scenario && f.scenario.title && f.scenario.setting && f.scenario.narrative, 'Must have scenario with title, setting, narrative');
  });

  // 2. Dialogue Quality
  check(`N1 lesson ${lesson.id} has complete authentic dialogue with >= 4 lines and furigana brackets`, () => {
    assert(Array.isArray(adapted.dialogue) && adapted.dialogue.length >= 4, `Dialogue must have >= 4 lines (got ${adapted.dialogue ? adapted.dialogue.length : 0})`);
    adapted.dialogue.forEach((line, idx) => {
      assert(line.speaker, `Line ${idx} must have speaker`);
      assert(line.jp, `Line ${idx} must have jp text`);
      assert(line.furigana, `Line ${idx} must have furigana`);
      assert(line.romaji, `Line ${idx} must have romaji`);
      assert(line.idText, `Line ${idx} must have idText`);
    });
  });

  // 3. Vocab Breakdown Quality
  check(`N1 lesson ${lesson.id} has rich vocab_breakdown with example sentences and nuances`, () => {
    assert(Array.isArray(adapted.vocab_breakdown) && adapted.vocab_breakdown.length >= 4, `Vocab breakdown must have >= 4 items`);
    adapted.vocab_breakdown.forEach((vb, vIdx) => {
      assert(vb.id && vb.word && vb.reading && vb.meaning && vb.pos && vb.nuance, `Vocab ${vIdx} missing core fields`);
      assert(vb.exampleSentence && vb.exampleSentence.jp && vb.exampleSentence.idText, `Vocab ${vIdx} missing exampleSentence`);
    });
  });

  // 4. Drill Quality & Diagnostic Feedback
  check(`N1 lesson ${lesson.id} has 5-step drills with valid answers and diagnostic feedback`, () => {
    assert(Array.isArray(adapted.drills) && adapted.drills.length === 5, `Must have exactly 5 drills (got ${adapted.drills ? adapted.drills.length : 0})`);
    const expectedTypes = ['vocab_context', 'cloze', 'trap_detect', 'reorder', 'response'];
    adapted.drills.forEach((d, idx) => {
      assert.strictEqual(d.type, expectedTypes[idx], `Drill ${idx} expected type ${expectedTypes[idx]}, got ${d.type}`);
      assert(d.instruction, `Drill ${idx} missing instruction`);
      assert(Array.isArray(d.options) && d.options.length === 4, `Drill ${idx} must have exactly 4 options`);
      assert(d.correctAnswer, `Drill ${idx} missing correctAnswer`);
      assert(d.options.includes(d.correctAnswer), `Drill ${idx} options must contain correctAnswer "${d.correctAnswer}"`);
      assert.strictEqual(new Set(d.options).size, d.options.length, `Drill ${idx} options must not have duplicates`);
      assert(d.explanation, `Drill ${idx} must have explanation`);
      assert(d.diagnosticFeedback && typeof d.diagnosticFeedback === 'object', `Drill ${idx} must have diagnosticFeedback`);
      
      // Strict anti-placeholder verification
      const placeholderRegex = /jebakan\s*\d|kalimat\s*jebakan|dummy\s*option/i;
      d.options.forEach(opt => {
        assert(!placeholderRegex.test(opt), `Drill ${idx} option "${opt}" contains placeholder text`);
      });
      assert(!placeholderRegex.test(d.explanation), `Drill ${idx} explanation contains placeholder text`);

      const wrongOptions = d.options.filter(opt => opt !== d.correctAnswer);
      assert.strictEqual(wrongOptions.length, 3, `Must have exactly 3 wrong options for Drill ${idx}`);
      wrongOptions.forEach(opt => {
        assert(d.diagnosticFeedback[opt], `Drill ${idx} missing diagnosticFeedback for wrong option: "${opt}"`);
        assert(!placeholderRegex.test(d.diagnosticFeedback[opt]), `Drill ${idx} feedback for "${opt}" contains placeholder text`);
      });

      // Extra verification for reorder drill
      if (d.type === 'reorder') {
        assert(Array.isArray(d.tokens) && d.tokens.length === 4, `Reorder drill must have 4 tokens`);
        assert(Array.isArray(d.correctOrder) && d.correctOrder.length === 4, `Reorder drill must have 4 correctOrder indices`);
      }
    });
  });

  // 5. Can-Do Challenge & Pocket Summary
  check(`N1 lesson ${lesson.id} has can_do_challenge and pocket_summary`, () => {
    assert(adapted.can_do_challenge, 'Must have can_do_challenge');
    assert(adapted.can_do_challenge.statement, 'Can-do must have statement');
    assert(adapted.can_do_challenge.situation, 'Can-do must have situation');
    assert(adapted.can_do_challenge.promptTask, 'Can-do must have promptTask');
    assert(adapted.can_do_challenge.modelAnswer, 'Can-do must have modelAnswer');
    assert(adapted.can_do_challenge.modelAnswerId, 'Can-do must have modelAnswerId');
    assert(Array.isArray(adapted.can_do_challenge.skillUnlocked) && adapted.can_do_challenge.skillUnlocked.length >= 2, 'Can-do must have skillUnlocked');
    assert(adapted.pocket_summary, 'Must have pocket_summary');
    assert(adapted.pocket_summary.keyFormula, 'Pocket summary must have keyFormula');
    assert(Array.isArray(adapted.pocket_summary.coreWords) && adapted.pocket_summary.coreWords.length > 0, 'Pocket summary must have coreWords');
    assert(adapted.pocket_summary.coreWarning, 'Pocket summary must have coreWarning');
    assert(adapted.pocket_summary.quickDialogue, 'Pocket summary must have quickDialogue');
  });
}

// ── TEST 2: Cross-Lesson Pedagogical Diversity & Uniqueness ──
console.log('\n── TEST 2: Cross-Lesson Pedagogical Diversity & Uniqueness ──');

check('N1 track has 40 distinct Drill 1 vocabulary targets across all lessons', () => {
  const d1Answers = new Set();
  n1Json.units.forEach(u => u.lessons.forEach(l => {
    const ad = n1CuratedLessons[l.id];
    d1Answers.add(ad.drills[0].correctAnswer);
  }));
  assert.strictEqual(d1Answers.size, 40, `Expected 40 unique Drill 1 answers, got ${d1Answers.size}`);
});

check('N1 track has 40 distinct Drill 2 grammar pattern targets across all lessons', () => {
  const d2Answers = new Set();
  n1Json.units.forEach(u => u.lessons.forEach(l => {
    const ad = n1CuratedLessons[l.id];
    d2Answers.add(ad.drills[1].correctAnswer);
  }));
  assert.strictEqual(d2Answers.size, 40, `Expected 40 unique Drill 2 answers, got ${d2Answers.size}`);
});

check('N1 track has distinct dialogue openings across all 40 lessons', () => {
  const dialogueOpenings = new Set();
  n1Json.units.forEach(u => u.lessons.forEach(l => {
    const ad = n1CuratedLessons[l.id];
    dialogueOpenings.add(ad.dialogue[0].jp);
  }));
  assert.strictEqual(dialogueOpenings.size, 40, `Expected 40 unique dialogue openings, got ${dialogueOpenings.size}`);
});

// ── TEST 3: Zero-Orphan Grammar Integrity Verification ──
console.log('\n── TEST 3: Zero-Orphan Grammar Integrity Verification ──');

const grammarPath = path.join(DATA_DIR, 'grammar/grammar-n1.js');
const win = {};
const fn = new Function('window', 'module', 'exports', fs.readFileSync(grammarPath, 'utf8'));
const dummyModule = { exports: {} };
fn(win, dummyModule, dummyModule.exports);
const grammarList = win.grammarN1 || dummyModule.exports.grammarN1 || [];
const grammarIdSet = new Set(grammarList.map(g => g.id));

check('All 200 grammar points from grammar-n1.js are mapped with 0 orphans and 0 duplicates', () => {
  const seenGrammar = new Set();
  let totalGrammarInUnits = 0;

  for (const unit of n1Json.units) {
    for (const gId of unit.grammar_ids) {
      assert(grammarIdSet.has(gId), `Grammar ID ${gId} in Unit ${unit.unit_number} not found in grammarN1!`);
      assert(!seenGrammar.has(gId), `Duplicate grammar ID ${gId} found in Unit ${unit.unit_number}!`);
      seenGrammar.add(gId);
      totalGrammarInUnits++;
    }
  }

  assert.strictEqual(totalGrammarInUnits, 200, `Expected 200 grammar points in units, got ${totalGrammarInUnits}`);
  assert.strictEqual(seenGrammar.size, grammarList.length, `Total mapped grammar points (${seenGrammar.size}) must match grammarN1 count (${grammarList.length})`);
});

// ── SUMMARY & VERIFICATION ──
console.log('\n══════════════════════════════════════════════════════════════════');
console.log(` SPRINT 10 N1 PEDAGOGICAL SUITE: ${passedChecks} / ${totalChecks} CHECKS PASSED`);
console.log('══════════════════════════════════════════════════════════════════\n');

if (passedChecks === totalChecks && totalChecks > 0) {
  console.log('🎉 SPRINT 10 N1 PEDAGOGICAL INTEGRITY & DRILL SYNTHESIS 100% VERIFIED!\n');
  process.exit(0);
} else {
  console.error('❌ SPRINT 10 N1 PEDAGOGICAL VERIFICATION FAILED\n');
  process.exit(1);
}
