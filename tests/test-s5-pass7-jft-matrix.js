// ══════════════════════════════════════════════════════════════════
//  test-s5-pass7-jft-matrix.js — Forensic Unit & Regression Suite
//  Siklus V Pass 7: JFT-Basic A1 & A2 Daily Living Situational Matrix Audit
//  Validates Japan Foundation (JF) Standard Competencies, 4 CBT Sections,
//  Official 250-Point / 200-Pass Threshold, Seikatsu Survival Guide,
//  and JFT-A2 Exercise Datasets Referential Mapping.
// ══════════════════════════════════════════════════════════════════

const assert = require('assert');
const path = require('path');
const fs = require('fs');

console.log('╔══════════════════════════════════════════════════════════════════╗');
console.log('║   SIKLUS V PASS 7: JFT-BASIC A1/A2 & SEIKATSU MATRIX AUDIT       ║');
console.log('║   JF Standard Can-Do • 4 CBT Sections • 250-Pt Scale • Living Guide║');
console.log('╚══════════════════════════════════════════════════════════════════╝\n');

const ROOT_DIR = path.resolve(__dirname, '..');

// Helper to load grammar
function loadGrammarCatalog(level) {
  const grammarPath = path.join(ROOT_DIR, `public/data/grammar/grammar-${level}.js`);
  const win = {};
  const fn = new Function('window', 'module', 'exports', fs.readFileSync(grammarPath, 'utf8'));
  const dummyModule = { exports: {} };
  fn(win, dummyModule, dummyModule.exports);
  const list = win[`grammar${level.toUpperCase()}`] || dummyModule.exports[`grammar${level.toUpperCase()}`] || [];
  return new Set(list.map(g => g.id));
}

// Helper to load vocab
function loadVocabCatalog(level) {
  const vocabPath = path.join(ROOT_DIR, `public/data/vocab/vocab-${level}.js`);
  const win = {};
  const fn = new Function('window', 'module', 'exports', fs.readFileSync(vocabPath, 'utf8'));
  const dummyModule = { exports: {} };
  fn(win, dummyModule, dummyModule.exports);
  const list = win[`vocab${level.toUpperCase()}`] || dummyModule.exports[`vocab${level.toUpperCase()}`] || [];
  return new Set(list.map(v => v.id));
}

const gN5 = loadGrammarCatalog('n5');
const gN4 = loadGrammarCatalog('n4');
const vN5 = loadVocabCatalog('n5');
const vN4 = loadVocabCatalog('n4');

// ── Check 1: JFT A1, A2, and Seikatsu Curriculum Topology ──
console.log('  🔍 Check 1: Validating JFT A1, A2, & Seikatsu Curriculum Topology...');

const TRACK_SPECS = [
  { id: 'jft-a1', file: 'curriculum-jft-a1.json', units: 4, lessons: 4, grammarSet: gN5, vocabSet: vN5 },
  { id: 'jft-a2', file: 'curriculum-jft-a2.json', units: 4, lessons: 4, grammarSet: gN4, vocabSet: vN4 },
  { id: 'seikatsu', file: 'curriculum-seikatsu.json', units: 4, lessons: 4, grammarSet: gN5, vocabSet: vN5 },
];

let totalJftUnits = 0;
let totalJftLessons = 0;

TRACK_SPECS.forEach(trk => {
  const filePath = path.join(ROOT_DIR, 'public/data/curriculum', trk.file);
  assert(fs.existsSync(filePath), `${trk.file} must exist`);

  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  assert.strictEqual(data.units.length, trk.units, `${trk.id} must have ${trk.units} units`);

  let lCount = 0;
  data.units.forEach((u, uIdx) => {
    assert(u.id, `Unit ${uIdx + 1} in ${trk.id} must have an ID`);
    assert.strictEqual(u.unit_number, uIdx + 1, `Unit number must match index + 1`);
    assert(u.title_id && u.title_id.length > 5, `Unit ${u.id} must have title_id`);
    assert(u.title_jp && u.title_jp.length > 2, `Unit ${u.id} must have title_jp`);
    assert(u.can_do_summary && u.can_do_summary.length >= 10, `Unit ${u.id} must have can_do_summary`);

    // Verify grammar references
    (u.grammar_ids || []).forEach(gid => {
      assert(trk.grammarSet.has(gid) || gN5.has(gid) || gN4.has(gid), `Grammar ${gid} in ${u.id} not found in catalog`);
    });

    // Verify vocab references
    (u.vocab_ids || []).forEach(vid => {
      assert(trk.vocabSet.has(vid) || vN5.has(vid) || vN4.has(vid), `Vocab ${vid} in ${u.id} not found in catalog`);
    });

    // Verify lessons
    assert(Array.isArray(u.lessons) && u.lessons.length > 0, `Unit ${u.id} must have lessons`);
    u.lessons.forEach((l, lIdx) => {
      lCount++;
      assert(l.id, `Lesson ${lIdx + 1} in ${u.id} must have an ID`);
      assert.strictEqual(l.lesson_number, lIdx + 1, `Lesson number must match index + 1`);
      assert(l.title_id && l.title_id.length > 5, `Lesson ${l.id} must have title_id`);
      assert(l.can_do_statement && l.can_do_statement.length >= 10, `Lesson ${l.id} must have can_do_statement`);
      assert(!/TODO|TBD|undefined|null/i.test(l.can_do_statement), `Lesson ${l.id} has placeholder token`);
    });
  });

  assert.strictEqual(lCount, trk.lessons, `${trk.id} must have ${trk.lessons} lessons`);
  totalJftUnits += data.units.length;
  totalJftLessons += lCount;
});

assert.strictEqual(totalJftUnits, 12, 'Total JFT and Seikatsu units must be 12');
assert.strictEqual(totalJftLessons, 12, 'Total JFT and Seikatsu lessons must be 12');
console.log('  ✅ [PASS] 12 Units and 12 Lessons verified with 0 broken grammar/vocab references!');

// ── Check 2: JFT-Basic A2 Exercise Sets & Remedial Prescriptions ──
console.log('\n  🔍 Check 2: Validating JFT-Basic A2 Exercise Dataset (jft-basic-a2-set01.json)...');

const exercisePath = path.join(ROOT_DIR, 'public/data/exercises/jft-basic-a2-set01.json');
assert(fs.existsSync(exercisePath), 'jft-basic-a2-set01.json must exist');

const exData = JSON.parse(fs.readFileSync(exercisePath, 'utf8'));
assert.strictEqual(exData.trackType, 'jft', 'trackType must be jft');
assert.strictEqual(exData.totalItems, 15, 'totalItems must be 15');
assert.strictEqual(exData.items.length, 15, 'items length must be 15');
assert.strictEqual(exData.timeLimitMinutes, 15, 'timeLimitMinutes must be 15');
assert.strictEqual(exData.passingScore, 10, 'passingScore must be 10 (out of 15)');

// Verify every question item structure
exData.items.forEach((item, idx) => {
  assert(item.id, `Question ${idx + 1} must have an id`);
  assert(item.instructionJp && item.instructionId, `Question ${item.id} must have bilingual instructions`);
  assert(item.prompt && item.prompt.length > 5, `Question ${item.id} must have a prompt`);
  assert(Array.isArray(item.options) && item.options.length === 4, `Question ${item.id} must have 4 options`);
  assert(
    Number.isInteger(item.correctOptionIndex) && item.correctOptionIndex >= 0 && item.correctOptionIndex < 4,
    `Question ${item.id} must have valid correctOptionIndex`
  );

  // Check pedagogical autopsy and remedial prescription
  assert(item.explanation, `Question ${item.id} must have explanation`);
  assert(item.explanation.justification, `Question ${item.id} must have explanation.justification`);
  assert(item.explanation.distractorAutopsy, `Question ${item.id} must have distractorAutopsy`);
  assert(item.explanation.remedialPrescription, `Question ${item.id} must have remedialPrescription`);
  assert(item.explanation.remedialPrescription.unitId, `Question ${item.id} prescription must link unitId`);
  assert(item.curriculumRef && item.curriculumRef.trackId === 'curriculum-jft-a2', `Question ${item.id} must reference curriculum-jft-a2`);
});

console.log('  ✅ [PASS] 15/15 JFT-Basic A2 items verified with full distractor autopsies & remedial links!');

// ── Check 3: JFT-Basic CBT Simulator (JftBasicCbtModal.tsx) Math & Rules ──
console.log('\n  🔍 Check 3: Validating JFT CBT Engine 250-Point Math & Dual-Pass Scoring Rules...');

const modalPath = path.join(ROOT_DIR, 'src/components/quiz/JftBasicCbtModal.tsx');
assert(fs.existsSync(modalPath), 'JftBasicCbtModal.tsx must exist');

const modalCode = fs.readFileSync(modalPath, 'utf8');

// Section max points contract: 60 + 60 + 65 + 65 = 250
const sec1Match = modalCode.match(/1:\s*\{[\s\S]*?maxPoints:\s*(\d+)/);
const sec2Match = modalCode.match(/2:\s*\{[\s\S]*?maxPoints:\s*(\d+)/);
const sec3Match = modalCode.match(/3:\s*\{[\s\S]*?maxPoints:\s*(\d+)/);
const sec4Match = modalCode.match(/4:\s*\{[\s\S]*?maxPoints:\s*(\d+)/);

assert(sec1Match && sec2Match && sec3Match && sec4Match, 'All 4 JFT sections must define maxPoints');
const s1Max = parseInt(sec1Match[1], 10);
const s2Max = parseInt(sec2Match[1], 10);
const s3Max = parseInt(sec3Match[1], 10);
const s4Max = parseInt(sec4Match[1], 10);

assert.strictEqual(s1Max, 60, 'Seksi 1 maxPoints must be 60');
assert.strictEqual(s2Max, 60, 'Seksi 2 maxPoints must be 60');
assert.strictEqual(s3Max, 65, 'Seksi 3 maxPoints must be 65');
assert.strictEqual(s4Max, 65, 'Seksi 4 maxPoints must be 65');
assert.strictEqual(s1Max + s2Max + s3Max + s4Max, 250, 'Total JFT maxPoints must equal 250 points');

// Pass mark >= 200 points (80% standard)
assert(modalCode.includes('totalScorePoints >= 200'), 'Pass mark condition must assert >= 200 points');
assert(modalCode.includes('timeRemainingSeconds') && modalCode.includes('3600'), 'Timer must be 3600 seconds (60 minutes)');

// Choukai audio play count limit (max 2 plays per JF standard)
assert(modalCode.includes('played >= 2') || modalCode.includes('audioPlayCount[currentQuestion.id] || 0) >= 2'), 'Audio limit must enforce max 2 plays');

console.log('  ✅ [PASS] JFT-Basic CBT 250-point scale (60/60/65/65), 200-pt pass mark, and 2x audio limit verified!');

// ── Check 4: Seikatsu Survival Guide (SeikatsuLivingGuideModal.tsx) ──
console.log('\n  🔍 Check 4: Validating Seikatsu Living Guide Survival Domains...');

const seikatsuModalPath = path.join(ROOT_DIR, 'src/components/materi/SeikatsuLivingGuideModal.tsx');
assert(fs.existsSync(seikatsuModalPath), 'SeikatsuLivingGuideModal.tsx must exist');

const seikatsuCode = fs.readFileSync(seikatsuModalPath, 'utf8');

// Verify 4 life domains
assert(seikatsuCode.includes('shiyakusho'), 'Must contain shiyakusho domain');
assert(seikatsuCode.includes('gomi'), 'Must contain gomi domain');
assert(seikatsuCode.includes('housing'), 'Must contain housing domain');
assert(seikatsuCode.includes('disaster'), 'Must contain disaster domain');

// Verify critical emergency hotlines and procedures
assert(seikatsuCode.includes('110'), 'Emergency police hotline 110 missing');
assert(seikatsuCode.includes('119'), 'Emergency ambulance/fire hotline 119 missing');
assert(seikatsuCode.includes('住民票') || seikatsuCode.includes('juuminhyou'), 'Juminhyo official document missing');
assert(seikatsuCode.includes('避難所') || seikatsuCode.includes('hinanjo'), 'Hinanjo evacuation site missing');

console.log('  ✅ [PASS] Seikatsu Living Survival Guide verified: Balai Kota, Sampah, Hunian, & Bencana (110/119)!');

// ── Check 5: Adaptive Lesson Content Engine for JFT Tracks ──
console.log('\n  🔍 Check 5: Validating Dynamic Lesson Content Adaptation for JFT & Seikatsu...');

const { getAdaptiveLessonContent } = require('../src/lib/curriculum/lessonContentAdapter.ts');

TRACK_SPECS.forEach(trk => {
  const filePath = path.join(ROOT_DIR, 'public/data/curriculum', trk.file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  data.units.forEach(u => {
    u.lessons.forEach(l => {
      const adapted = getAdaptiveLessonContent(trk.id, u, l, [], []);
      assert(adapted.pedagogical_framework, `${trk.id} ${l.id} must have pedagogical_framework`);
      assert(adapted.dialogue && adapted.dialogue.length >= 2, `${trk.id} ${l.id} must have dialogue`);
      assert(adapted.drills && adapted.drills.length === 5, `${trk.id} ${l.id} must have 5-step drill ladder`);
      assert(adapted.can_do_challenge, `${trk.id} ${l.id} must have can_do_challenge`);
    });
  });
});

console.log('  ✅ [PASS] All 12 JFT & Seikatsu lessons adapt with 100% 5W1H frameworks & 5-step drills!');

// ── Check 6: Responsive Multi-Device & Touch Targets Ergonomics ──
console.log('\n  🔍 Check 6: Validating Universal Touch Targets & Multi-Device Ergonomics...');

assert(modalCode.includes('min-h-[44px]'), 'CBT navigation buttons must have min-h-[44px]');
assert(modalCode.includes('min-w-[40px]') || modalCode.includes('min-h-[40px]'), 'Touch targets must be at least 40px/44px');
assert(modalCode.includes('max-h-[92dvh]') || modalCode.includes('max-h-[90dvh]'), 'Modal must enforce max-h-[92dvh]');

console.log('  ✅ [PASS] Universal multi-device responsive constraints & touch targets verified!');

console.log('\n══════════════════════════════════════════════════════════════════');
console.log('🎉 SIKLUS V PASS 7: JFT-BASIC & SEIKATSU AUDIT PASSED 100% GREEN!');
console.log('══════════════════════════════════════════════════════════════════\n');
