// ══════════════════════════════════════════════════════════════════
//  test-sprint-24-kanji-canvas.js — Forensic Unit & Integration Suite
//  Sprint 24: Interactive Kanji Canvas, Stroke Order SVG Animation & KanjiVG Engine
//  (Tickets T-133 to T-138)
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const assert = require('assert');

let passedTests = 0;
let totalTests = 0;

function test(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✅ [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ [FAIL] ${name}`);
    console.error(`     Error: ${err.message}`);
  }
}

console.log('\n=============================================================');
console.log('🖌️ RUNNING SPRINT 24 VERIFICATION SUITE: KANJI STROKE CANVAS');
console.log('=============================================================\n');

const ROOT_DIR = path.resolve(__dirname, '..');

// ── T-133: KanjiVG SVG Parser & Stroke Animation Timeline ──
test('T-133: kanjiVgParser.ts parses SVG XML paths, stroke numbers, and generates timeline', () => {
  const {
    parseKanjiVgSvg,
    generateStrokeAnimationTimeline,
  } = require('../src/lib/kanji/kanjiVgParser.ts');

  // Simulated KanjiVG SVG markup for 日 (Sun)
  const sampleSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="109" height="109" viewBox="0 0 109 109">
      <g id="kvg:StrokePaths_065e5" kvg:element="日" kvg:radical="general">
        <path id="kvg:065e5-s1" kvg:type="㇑" d="M25.75,21.84c0.88,0.88,1.44,2.2,1.44,3.41c0,0.88-0.07,43.24-0.1,61.75"/>
        <path id="kvg:065e5-s2" kvg:type="㇕a" d="M28.08,23.34c6.17-0.72,42.54-3.84,48.06-4.34c2.86-0.26,5.36,1,5.36,4"/>
        <path id="kvg:065e5-s3" kvg:type="㇐a" d="M28.33,52.5c9.92-0.88,43.42-3.25,51.92-3.5"/>
        <path id="kvg:065e5-s4" kvg:type="㇐a" d="M28.25,83.75c12-0.75,40.75-2.25,51.75-2.5"/>
      </g>
      <g id="kvg:StrokeNumbers_065e5">
        <text transform="matrix(1 0 0 1 18.5 30.5)">1</text>
        <text transform="matrix(1 0 0 1 30.5 19.5)">2</text>
        <text transform="matrix(1 0 0 1 33.5 48.5)">3</text>
        <text transform="matrix(1 0 0 1 33.5 80.5)">4</text>
      </g>
    </svg>
  `;

  const parsed = parseKanjiVgSvg(sampleSvg, '日');
  assert.strictEqual(parsed.character, '日');
  assert.strictEqual(parsed.strokes, 4);
  assert.strictEqual(parsed.paths.length, 4);
  assert.strictEqual(parsed.strokeNumbers.length, 4);
  assert(parsed.radicals.includes('日'));

  const timeline = generateStrokeAnimationTimeline([100, 150, 80, 85], 500, 1.0);
  assert.strictEqual(timeline.length, 4);
  assert(timeline[1].delayMs > timeline[0].delayMs, 'Timeline delays must be strictly sequential');
});

// ── T-134: Touch Drawing Validation Engine ──
test('T-134: strokeValidator.ts verifies start point, directionality, and progress coverage', () => {
  const { validateStrokeDrawing } = require('../src/lib/kanji/strokeValidator.ts');

  // Straight horizontal stroke from (20, 50) to (80, 50)
  const targetPoints = [
    { x: 20, y: 50 },
    { x: 40, y: 50 },
    { x: 60, y: 50 },
    { x: 80, y: 50 },
  ];

  // 1. Valid user stroke: close start, correct direction, covers full length
  const validUser = [
    { x: 22, y: 51 },
    { x: 41, y: 49 },
    { x: 62, y: 50 },
    { x: 79, y: 52 },
  ];
  const resValid = validateStrokeDrawing(validUser, targetPoints);
  assert.strictEqual(resValid.isValid, true);
  assert(resValid.score >= 80);

  // 2. Displaced start point (too far away)
  const farStart = [
    { x: 90, y: 10 },
    { x: 80, y: 50 },
  ];
  const resFar = validateStrokeDrawing(farStart, targetPoints);
  assert.strictEqual(resFar.isValid, false);
  assert.strictEqual(resFar.feedback, 'too_far');

  // 3. Reversed direction (drawn backwards from right to left)
  const reversed = [
    { x: 80, y: 50 },
    { x: 60, y: 50 },
    { x: 40, y: 50 },
    { x: 20, y: 50 },
  ];
  const resRev = validateStrokeDrawing(reversed, targetPoints);
  assert.strictEqual(resRev.isValid, false);
  assert(resRev.feedback === 'too_far' || resRev.feedback === 'wrong_direction');

  // 4. Too short (barely tapped start point)
  const tooShort = [
    { x: 20, y: 50 },
    { x: 22, y: 50 },
  ];
  const resShort = validateStrokeDrawing(tooShort, targetPoints);
  assert.strictEqual(resShort.isValid, false);
  assert.strictEqual(resShort.feedback, 'too_short');
});

// ── T-135: Kangxi Radical Taxonomy & Decomposition ──
test('T-135: kanjiRadicalExtractor.ts extracts Kangxi radicals with Indonesian explanations', () => {
  const { getRadicalInfo, decomposeRadicals } = require('../src/lib/kanji/kanjiRadicalExtractor.ts');

  const sunRadical = getRadicalInfo('日');
  assert.strictEqual(sunRadical.kangxiNumber, 72);
  assert.strictEqual(sunRadical.nameId, 'Matahari / Hari');
  assert(sunRadical.meaningId.includes('Matahari'));

  const treeRadical = getRadicalInfo('木');
  assert.strictEqual(treeRadical.nameId, 'Pohon / Kayu');

  const decomposed = decomposeRadicals(['日', '月']);
  assert.strictEqual(decomposed.length, 2);
  assert.strictEqual(decomposed[0].radical, '日');
  assert.strictEqual(decomposed[1].radical, '月');
});

// ── T-136 & T-137: Kanji Practice Audio Vocalization & Mastery Tracking ──
test('T-136 & T-137: kanjiMasteryStore tracks practice sessions and KanjiStrokeModal integrates audio', () => {
  const { kanjiMasteryStore } = require('../src/lib/kanji/kanjiMasteryStore.ts');

  kanjiMasteryStore.clearRecords();

  // Record first successful practice
  const r1 = kanjiMasteryStore.recordPractice('日', 95, true);
  assert.strictEqual(r1.totalAttempts, 1);
  assert.strictEqual(r1.successfulWrites, 1);
  assert.strictEqual(r1.masteryLevel, 'practiced');

  // Record 2 more successful practices to achieve 'mastered'
  kanjiMasteryStore.recordPractice('日', 90, true);
  const r3 = kanjiMasteryStore.recordPractice('日', 92, true);
  assert.strictEqual(r3.successfulWrites, 3);
  assert.strictEqual(r3.masteryLevel, 'mastered');

  const stats = kanjiMasteryStore.getMasteryStats();
  assert.strictEqual(stats.totalPracticed, 1);
  assert.strictEqual(stats.masteredCount, 1);
  assert(stats.averageAccuracy >= 90);

  // Verify KanjiStrokeModal.tsx integration
  const modalPath = path.join(ROOT_DIR, 'src/components/kanji/KanjiStrokeModal.tsx');
  const modalCode = fs.readFileSync(modalPath, 'utf8');
  assert(modalCode.includes('audioService.speak(kanji.character)'), 'Must vocalize kanji pronunciation on completion');
  assert(modalCode.includes('kanjiMasteryStore.recordPractice'), 'Must record practice to mastery store');
});

// ── Print Summary ──
console.log('\n=============================================================');
console.log(`📊 SPRINT 24 TEST RESULTS: ${passedTests}/${totalTests} TESTS PASSED`);
console.log('=============================================================\n');

if (passedTests !== totalTests) {
  process.exit(1);
}
