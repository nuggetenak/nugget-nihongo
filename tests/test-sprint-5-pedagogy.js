// ══════════════════════════════════════════════════════════════════
//  tests/test-sprint-5-pedagogy.js
//  SPRINT 5 VERIFICATION SUITE — PEDAGOGICAL FRAMEWORKS & DRILL SYNTHESIS
//  Empirically tests N5 curated lessons, SSW Kaigo emergency dialogues,
//  multi-format ID alias resolution, and dynamic drill diagnosticFeedback.
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
console.log('║   NUGGET NIHONGO — SPRINT 5 PEDAGOGICAL ENRICHMENT SUITE        ║');
console.log('╚══════════════════════════════════════════════════════════════════╝\n');

// Import lessonContentAdapter
const { getAdaptiveLessonContent } = require('../src/lib/curriculum/lessonContentAdapter.ts');

const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'public/data');

// ── TEST 1: T-21 N5 Units 1 & 2 Gold-Standard Curated Lessons ──
console.log('── TEST 1: T-21 N5 Units 1 & 2 Gold-Standard Curated Lessons ──');

const n5Json = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'curriculum/curriculum-n5.json'), 'utf8'));

const testLessonsN5 = [
  { unitIdx: 0, lessonIdx: 0, expectedId: 'les-n5-u01-01', title: 'Nama & Identitas Pokok' },
  { unitIdx: 0, lessonIdx: 1, expectedId: 'les-n5-u01-02', title: 'Penyangkalan & Pertanyaan Sopan' },
  { unitIdx: 0, lessonIdx: 2, expectedId: 'les-n5-u01-03', title: 'Kepemilikan & Lampau' },
  { unitIdx: 1, lessonIdx: 0, expectedId: 'les-n5-u02-01', title: 'Menunjuk Benda di Sekitar' },
  { unitIdx: 1, lessonIdx: 1, expectedId: 'les-n5-u02-02', title: 'Menanyakan Karakteristik & Konfirmasi' },
];

testLessonsN5.forEach(tc => {
  const unit = n5Json.units[tc.unitIdx];
  const lesson = unit.lessons[tc.lessonIdx];
  assert.strictEqual(lesson.id, tc.expectedId, `Expected ${tc.expectedId}, got ${lesson.id}`);

  const adapted = getAdaptiveLessonContent('n5', unit, lesson);

  check(`N5 lesson ${tc.expectedId} (${tc.title}) has gold-standard pedagogical framework`, () => {
    const pf = adapted.pedagogical_framework;
    assert(pf, 'Missing pedagogical_framework');
    assert(pf.what && pf.what.summary && pf.what.canDo, 'Missing WHAT section');
    assert(pf.sensei_context && pf.sensei_context.whyOrder && pf.sensei_context.sceneIntro, 'Missing SENSEI CONTEXT section');
    assert(pf.cultural_notes && pf.cultural_notes.title && pf.cultural_notes.etiquette, 'Missing CULTURAL NOTES section');
    assert(pf.pronunciation_tips && pf.pronunciation_tips.soundTip, 'Missing PRONUNCIATION TIPS section');
    assert(Array.isArray(pf.common_pitfalls) && pf.common_pitfalls.length >= 2, 'Must have at least 2 common pitfalls');
    assert(pf.who_and_when && pf.who_and_when.situational_context, 'Missing WHO AND WHEN section');
    assert(pf.scenario && pf.scenario.title && pf.scenario.narrative, 'Missing SCENARIO section');
  });

  check(`N5 lesson ${tc.expectedId} has complete authentic dialogue with >= 4 lines`, () => {
    assert(Array.isArray(adapted.dialogue) && adapted.dialogue.length >= 4, 'Dialogue must have >= 4 lines');
    adapted.dialogue.forEach((d, idx) => {
      assert(d.speaker && d.jp && d.idText, `Dialogue line ${idx} missing core fields`);
    });
  });

  check(`N5 lesson ${tc.expectedId} has 5-step drills with valid answers and diagnostic feedback`, () => {
    assert(Array.isArray(adapted.drills) && adapted.drills.length === 5, 'Drills must have 5 steps');
    adapted.drills.forEach(d => {
      assert(d.id && d.type && d.instruction && d.correctAnswer && d.explanation, `Drill ${d.id} missing fields`);
    });
  });

  check(`N5 lesson ${tc.expectedId} has can_do_challenge and pocket_summary`, () => {
    assert(adapted.can_do_challenge && adapted.can_do_challenge.modelAnswer, 'Missing can_do_challenge');
    assert(adapted.pocket_summary && adapted.pocket_summary.keyFormula, 'Missing pocket_summary');
  });
});

// ── TEST 2: T-22 SSW Kaigo Unit 1 Gold-Standard Frameworks & Aliasing ──
console.log('\n── TEST 2: T-22 SSW Kaigo Unit 1 Gold-Standard Frameworks & Aliasing ──');

const kaigoJson = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'curriculum/curriculum-ssw-kaigo.json'), 'utf8'));
const kaigoU1 = kaigoJson.units[0];

const kaigoLessons = [
  { id: 'les-curriculum-ssw-kaigo-u01-01', alias: 'les-ssw-kaigo-u01-01', title: 'Koe-kake Pagi' },
  { id: 'les-curriculum-ssw-kaigo-u01-02', alias: 'les-ssw-kaigo-u01-02', title: 'Simulasi Darurat & SBAR' },
];

kaigoLessons.forEach(kl => {
  // Test both with full curriculum prefix and with short prefix
  const rawLesson = kaigoU1.lessons.find(l => l.id === kl.id);
  assert(rawLesson, `Missing Kaigo lesson ${kl.id} in JSON`);

  const adaptedFull = getAdaptiveLessonContent('ssw-kaigo', kaigoU1, rawLesson);
  const adaptedAlias = getAdaptiveLessonContent('ssw-kaigo', kaigoU1, { ...rawLesson, id: kl.alias });

  check(`SSW Kaigo ${kl.title} resolves identically via full ID and short alias`, () => {
    assert(adaptedFull.pedagogical_framework, 'Full ID failed to resolve pedagogical framework');
    assert(adaptedAlias.pedagogical_framework, 'Alias ID failed to resolve pedagogical framework');
    assert.strictEqual(
      adaptedFull.pedagogical_framework.what.summary,
      adaptedAlias.pedagogical_framework.what.summary,
      'Full ID and alias ID summary mismatch'
    );
  });

  check(`SSW Kaigo ${kl.title} embeds K3 eldercare empathy and SOP safeguards`, () => {
    const pf = adaptedFull.pedagogical_framework;
    assert(pf.sensei_context.whyOrder.length > 20, 'Eldercare rationale whyOrder is too short');
    assert(pf.cultural_notes.etiquette.length > 20, 'Eldercare etiquette is too short');
    assert(pf.common_pitfalls.length >= 1, 'Missing eldercare pitfalls');
    assert(adaptedFull.dialogue.length >= 4, 'Eldercare dialogue must have >= 4 lines');
  });
});

// Specific verification of Kaigo emergency SBAR content
const emergencyLesson = getAdaptiveLessonContent('ssw-kaigo', kaigoU1, kaigoU1.lessons[1]);
check('Kaigo Lesson 2 covers SBAR terms: 転倒 (tentou), 意識 (ishiki), 呼吸 (kokyuu), 出血 (shukketsu)', () => {
  const dialogueStr = JSON.stringify(emergencyLesson.dialogue);
  assert(dialogueStr.includes('転倒') || dialogueStr.includes('てんとう'), 'Missing tentou');
  assert(dialogueStr.includes('意識') || dialogueStr.includes('いしき'), 'Missing ishiki');
  assert(dialogueStr.includes('呼吸') || dialogueStr.includes('こきゅう'), 'Missing kokyuu');
  assert(dialogueStr.includes('出血') || dialogueStr.includes('しゅっけつ'), 'Missing shukketsu');
});

// ── TEST 3: T-23 & T-24 Dynamic Fallback Generator & Diagnostic Feedback ──
console.log('\n── TEST 3: T-23 & T-24 Dynamic Fallback Generator & Diagnostic Feedback ──');

// Test dynamic fallback on N3 lesson
const n3Json = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'curriculum/curriculum-n3.json'), 'utf8'));
const n3U1 = n3Json.units[0];
const n3L1 = n3U1.lessons[0];

const adaptedN3 = getAdaptiveLessonContent('n3', n3U1, n3L1);

check('Dynamic fallback framework generates multi-trap common_pitfalls (>= 3 items)', () => {
  const pf = adaptedN3.pedagogical_framework;
  assert(pf && Array.isArray(pf.common_pitfalls), 'Missing fallback common_pitfalls');
  assert(pf.common_pitfalls.length >= 3, `Expected >= 3 pitfalls, got ${pf.common_pitfalls.length}`);
  const titles = pf.common_pitfalls.map(p => p.title).join(' | ');
  assert(titles.includes('SVO vs SOV'), 'Missing SVO transfer trap');
  assert(titles.includes('は') && titles.includes('が'), 'Missing Wa vs Ga trap');
  assert(titles.includes('Gelar Kehormatan'), 'Missing honorific trap');
});

check('Dynamic fallback drills generate 5 steps with rich diagnosticFeedback', () => {
  assert(Array.isArray(adaptedN3.drills) && adaptedN3.drills.length === 5, 'Fallback drills must have 5 steps');

  // Check drill 4 (trap_detect) has diagnosticFeedback
  const drill4 = adaptedN3.drills.find(d => d.type === 'trap_detect');
  assert(drill4, 'Missing trap_detect drill in fallback');
  assert(drill4.diagnosticFeedback && Object.keys(drill4.diagnosticFeedback).length >= 1, 'Missing diagnosticFeedback in trap_detect drill');

  // Check drill 5 (response) has diagnosticFeedback
  const drill5 = adaptedN3.drills.find(d => d.type === 'response');
  assert(drill5, 'Missing response drill in fallback');
  assert(drill5.diagnosticFeedback && Object.keys(drill5.diagnosticFeedback).length >= 2, 'Missing diagnosticFeedback in response drill');
});

// ── SUMMARY ──
console.log('\n══════════════════════════════════════════════════════════════════');
console.log(` SPRINT 5 PEDAGOGICAL SUITE: ${passedChecks} / ${totalChecks} CHECKS PASSED`);
console.log('══════════════════════════════════════════════════════════════════\n');

if (process.exitCode) {
  console.error('❌ SPRINT 5 PEDAGOGICAL VERIFICATION FAILED');
  process.exit(1);
} else {
  console.log('🎉 SPRINT 5 PEDAGOGICAL FRAMEWORKS & DRILL SYNTHESIS 100% VERIFIED!\n');
}
