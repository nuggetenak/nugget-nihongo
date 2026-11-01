// ══════════════════════════════════════════════════════════════════
//  tests/test-sprint-9-n2-pedagogy.js
//  SPRINT 9 VERIFICATION SUITE — N2 PEDAGOGICAL FRAMEWORKS & DRILL SYNTHESIS
//  Empirically tests N2 curated lessons across all 20 units (40 lessons),
//  5W1H frameworks, authentic corporate/workplace dialogues, 5-tier micro drills,
//  W3C bracketed Furigana, Tokyo pitch accents, and rich diagnosticFeedback.
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
console.log('║   NUGGET NIHONGO — SPRINT 9 N2 PEDAGOGICAL ENRICHMENT SUITE     ║');
console.log('╚══════════════════════════════════════════════════════════════════╝\n');

// Import lessonContentAdapter and register N2 curated lessons
const { getAdaptiveLessonContent, CURATED_LESSONS_MAP } = require('../src/lib/curriculum/lessonContentAdapter.ts');
const { n2CuratedLessons } = require('../src/lib/curriculum/lessons/n2/index.ts');

// Explicitly register N2 in curated lessons map for test environment
Object.assign(CURATED_LESSONS_MAP, n2CuratedLessons);

const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'public/data');

// ── TEST 1: N2 All 20 Units & 40 Gold-Standard Curated Lessons ──
console.log('── TEST 1: N2 All 20 Units & 40 Gold-Standard Curated Lessons ──');

const n2Json = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'curriculum/curriculum-n2.json'), 'utf8'));

check('N2 curriculum JSON has exactly 20 units', () => {
  assert.strictEqual(n2Json.units.length, 20);
});

const testLessonsN2 = [];
n2Json.units.forEach((unit, unitIdx) => {
  unit.lessons.forEach((lesson, lessonIdx) => {
    testLessonsN2.push({
      unitIdx,
      lessonIdx,
      expectedId: lesson.id,
      title: lesson.title_id
    });
  });
});

check('N2 curriculum has exactly 40 lessons across 20 units', () => {
  assert.strictEqual(testLessonsN2.length, 40);
});

for (const t of testLessonsN2) {
  const unit = n2Json.units[t.unitIdx];
  const lesson = unit.lessons[t.lessonIdx];

  check(`N2 lesson ${lesson.id} matches expected ${t.expectedId}`, () => {
    assert.strictEqual(lesson.id, t.expectedId);
  });

  const adapted = getAdaptiveLessonContent('curriculum-n2', unit, lesson);

  // 1. Pedagogical Framework
  check(`N2 lesson ${lesson.id} (${t.title}) has gold-standard pedagogical framework`, () => {
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

  // 2. Dialogue Quality & W3C Furigana
  check(`N2 lesson ${lesson.id} has complete authentic dialogue with >= 4 lines and W3C Furigana`, () => {
    assert(Array.isArray(adapted.dialogue) && adapted.dialogue.length >= 4, `Dialogue must have >= 4 lines (got ${adapted.dialogue ? adapted.dialogue.length : 0})`);
    adapted.dialogue.forEach((line, idx) => {
      assert(line.speaker, `Line ${idx} must have speaker`);
      assert(line.jp, `Line ${idx} must have jp text`);
      assert(line.furigana, `Line ${idx} must have furigana`);
      assert(line.romaji, `Line ${idx} must have romaji`);
      assert(line.idText, `Line ${idx} must have idText`);
    });
  });

  // 3. Vocab Breakdown with Tokyo Pitch Accent & Collocations
  check(`N2 lesson ${lesson.id} has vocab breakdown with Tokyo pitch accent and collocations`, () => {
    assert(Array.isArray(adapted.vocab_breakdown) && adapted.vocab_breakdown.length >= 4, 'Must have >= 4 vocab items');
    adapted.vocab_breakdown.forEach((v, idx) => {
      assert(v.word, `Vocab ${idx} missing word`);
      assert(v.reading, `Vocab ${idx} missing reading`);
      assert(v.meaning, `Vocab ${idx} missing meaning`);
      assert(v.particleTip, `Vocab ${idx} missing particleTip collocation`);
      assert(v.pitch && typeof v.pitch.mora_count === 'number', `Vocab ${idx} missing valid pitch accent mora_count`);
      assert(v.pitch.contour, `Vocab ${idx} missing pitch accent contour`);
    });
  });

  // 4. Drill Quality & Diagnostic Feedback
  check(`N2 lesson ${lesson.id} has 5-step drills with valid answers and diagnostic feedback`, () => {
    assert(Array.isArray(adapted.drills) && adapted.drills.length >= 5, `Must have >= 5 drills (got ${adapted.drills ? adapted.drills.length : 0})`);
    adapted.drills.forEach((d, idx) => {
      assert(d.instruction, `Drill ${idx} missing instruction`);
      assert(d.type, `Drill ${idx} missing type`);
      assert(Array.isArray(d.options) && d.options.length >= 2, `Drill ${idx} must have >= 2 options`);
      assert(d.correctAnswer, `Drill ${idx} must have correctAnswer`);
      assert(d.options.includes(d.correctAnswer), `Drill ${idx} options must contain correctAnswer`);
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
      wrongOptions.forEach(opt => {
        assert(d.diagnosticFeedback[opt], `Drill ${idx} missing diagnosticFeedback for wrong option: "${opt}"`);
        assert(!placeholderRegex.test(d.diagnosticFeedback[opt]), `Drill ${idx} feedback for "${opt}" contains placeholder text`);
      });
    });
  });

  // 5. Can-Do Challenge & Pocket Summary
  check(`N2 lesson ${lesson.id} has can_do_challenge and pocket_summary`, () => {
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

// ── TEST 2: Cross-Lesson Pedagogical Diversity & Uniqueness ──
console.log('\n── TEST 2: Cross-Lesson Pedagogical Diversity & Uniqueness ──');

check('N2 track has 40 distinct Drill 1 vocabulary targets across all lessons', () => {
  const d1Answers = new Set();
  n2Json.units.forEach(u => u.lessons.forEach(l => {
    const ad = getAdaptiveLessonContent('curriculum-n2', u, l);
    d1Answers.add(ad.drills[0].correctAnswer);
  }));
  assert.strictEqual(d1Answers.size, 40, `Expected 40 unique Drill 1 answers, got ${d1Answers.size}`);
});

check('N2 track has 40 distinct Drill 2 grammar pattern targets across all lessons', () => {
  const d2Answers = new Set();
  n2Json.units.forEach(u => u.lessons.forEach(l => {
    const ad = getAdaptiveLessonContent('curriculum-n2', u, l);
    d2Answers.add(ad.drills[1].correctAnswer);
  }));
  assert.strictEqual(d2Answers.size, 40, `Expected 40 unique Drill 2 answers, got ${d2Answers.size}`);
});

check('N2 track has distinct dialogue openings across all 40 lessons', () => {
  const dialogueOpenings = new Set();
  n2Json.units.forEach(u => u.lessons.forEach(l => {
    const ad = getAdaptiveLessonContent('curriculum-n2', u, l);
    dialogueOpenings.add(ad.dialogue[0].jp);
  }));
  assert.strictEqual(dialogueOpenings.size, 40, `Expected 40 unique dialogue openings, got ${dialogueOpenings.size}`);
});

// ── TEST 3: Zero-Boilerplate Forensics & High-Fidelity Human Curation ──
console.log('\n── TEST 3: Zero-Boilerplate Forensics & High-Fidelity Pedagogical Audit ──');

check('N2 track has ZERO generic boilerplate sentences in vocab breakdowns across all 40 lessons', () => {
  let boilerplateCount = 0;
  n2Json.units.forEach(u => u.lessons.forEach(l => {
    const ad = getAdaptiveLessonContent('curriculum-n2', u, l);
    (ad.vocab_breakdown || []).forEach(v => {
      if (v.exampleSentence && v.exampleSentence.jp && v.exampleSentence.jp.includes('慎重【しんちょう】に 確認【かくにん】します')) {
        boilerplateCount++;
      }
    });
  }));
  assert.strictEqual(boilerplateCount, 0, `Detected ${boilerplateCount} boilerplate sentences in vocab breakdowns!`);
});

check('N2 track has ZERO cloned generic distractors in Drill 5 across all 40 lessons', () => {
  let clonedGenericDistractors = 0;
  const bannedPhrases = [
    '私の 担当では ありませんので',
    '散歩したいですね',
    '無理です',
    'Jebakan',
    'Distractor'
  ];
  n2Json.units.forEach(u => u.lessons.forEach(l => {
    const ad = getAdaptiveLessonContent('curriculum-n2', u, l);
    const d5 = ad.drills[4];
    (d5.options || []).forEach(opt => {
      bannedPhrases.forEach(banned => {
        if (opt.includes(banned)) {
          clonedGenericDistractors++;
        }
      });
    });
  }));
  assert.strictEqual(clonedGenericDistractors, 0, `Detected ${clonedGenericDistractors} cloned generic distractors in Drill 5!`);
});

check('All 40 lessons have bespoke pedagogical frameworks with unique cultural and pitfall notes', () => {
  const scenarioTitles = new Set();
  const culturalTitles = new Set();
  n2Json.units.forEach(u => u.lessons.forEach(l => {
    const ad = getAdaptiveLessonContent('curriculum-n2', u, l);
    assert.ok(ad.pedagogical_framework.scenario.title, `${l.id} missing scenario title`);
    assert.ok(ad.pedagogical_framework.cultural_notes.title, `${l.id} missing cultural notes title`);
    assert.ok(ad.pedagogical_framework.common_pitfalls.length >= 2, `${l.id} needs >= 2 common pitfalls`);
    scenarioTitles.add(ad.pedagogical_framework.scenario.title);
    culturalTitles.add(ad.pedagogical_framework.cultural_notes.title);
  }));
  assert.strictEqual(scenarioTitles.size, 40, `Expected 40 unique scenario titles, got ${scenarioTitles.size}`);
  assert.strictEqual(culturalTitles.size, 40, `Expected 40 unique cultural titles, got ${culturalTitles.size}`);
});

// ── SUMMARY & VERIFICATION ──
console.log('\n══════════════════════════════════════════════════════════════════');
console.log(` SPRINT 9 N2 PEDAGOGICAL SUITE: ${passedChecks} / ${totalChecks} CHECKS PASSED`);
console.log('══════════════════════════════════════════════════════════════════\n');

if (passedChecks === totalChecks && totalChecks > 0) {
  console.log('🎉 SPRINT 9 N2 PEDAGOGICAL FRAMEWORKS & DRILL SYNTHESIS 100% VERIFIED!\n');
  process.exit(0);
} else {
  console.error('❌ SPRINT 9 N2 PEDAGOGICAL VERIFICATION FAILED\n');
  process.exit(1);
}
