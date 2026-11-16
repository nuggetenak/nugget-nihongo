// ══════════════════════════════════════════════════════════════════
//  tests/test-s7-sprint41-kana-canvas-stroke-frechet.js
//  Sprint 41: Kana Canvas, KanjiVG Geometry Parsing, Stroke Order Animations
//             & Discrete Fréchet Drawing Verification Suite
// ══════════════════════════════════════════════════════════════════

import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

console.log('\n🧪 [Sprint 41] Kana Canvas, Stroke Order Animations & Fréchet Verification...\n');

let passCount = 0;
const totalChecks = 5;

// ──────────────────────────────────────────────────────────────────
// Check 1: KanjiCanvas Handle Contracts & Guideline Buffer Rendering
// ──────────────────────────────────────────────────────────────────
console.log('📋 Check 1: KanjiCanvas Handle Contracts & Guideline Buffer Rendering');
try {
  const canvasPath = path.join(projectRoot, 'src/components/kanji/KanjiCanvas.tsx');
  assert.ok(fs.existsSync(canvasPath), 'KanjiCanvas.tsx must exist');
  const canvasSrc = fs.readFileSync(canvasPath, 'utf8');

  // Verify all 9 imperative handle methods
  const requiredHandleMethods = [
    'clear',
    'getCurrentStrokePoints',
    'toDataURL',
    'drawDab',
    'drawLine',
    'drawStroke',
    'syncDpi',
    'getCanvasElement',
    'drawGridGuidelines',
  ];

  for (const method of requiredHandleMethods) {
    assert.ok(
      canvasSrc.includes(`${method}:`) || canvasSrc.includes(`${method},`),
      `KanjiCanvasHandle must declare ${method}`
    );
  }

  // Pointer event capture & scroll suppression
  assert.ok(canvasSrc.includes('canvas.setPointerCapture('), 'Must claim pointer capture');
  assert.ok(canvasSrc.includes('canvas.releasePointerCapture('), 'Must release pointer capture');
  assert.ok(canvasSrc.includes('canvas.hasPointerCapture('), 'Must preserve stroke during boundary departure');
  assert.ok(canvasSrc.includes("touchAction: 'none'"), 'Must enforce touch-action none');
  assert.ok(canvasSrc.includes('role="application"'), 'Must specify role="application"');

  console.log('  ✅ Check 1 Passed: All 9 imperative handle methods, pointer capture & scroll suppression verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 1 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 2: Audio Engine Module Resolution & Cross-Platform ESM Execution
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 2: Audio Engine Module Resolution & Cross-Platform ESM Execution');
try {
  const audioModule = await import('../src/lib/audio/audioService.ts');
  const { audioService } = audioModule;

  assert.ok(audioService, 'audioService instance must be exported');
  assert.strictEqual(typeof audioService.cleanText, 'function');
  assert.strictEqual(typeof audioService.getSpeechRate, 'function');
  assert.strictEqual(typeof audioService.speak, 'function');
  assert.strictEqual(typeof audioService.stop, 'function');

  // Furigana and brackets cleaning
  const rawWithFurigana = '私{わたし}は日本語【にほんご】を（べんきょう）[benkyou]します';
  const cleaned = audioService.cleanText(rawWithFurigana);
  assert.strictEqual(cleaned, '私は日本語をします', 'cleanText must strip all bracketed phonetic guides');

  // Null / empty text safety
  assert.strictEqual(audioService.cleanText(null), '');
  assert.strictEqual(audioService.cleanText(undefined), '');
  assert.strictEqual(audioService.cleanText(''), '');

  // Default speech rate
  const rate = audioService.getSpeechRate();
  assert.ok(rate >= 0.5 && rate <= 1.5, 'Speech rate must be bounded between 0.5 and 1.5');

  console.log('  ✅ Check 2 Passed: AudioService ESM imports, bracket stripping & bounds verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 2 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 3: KanjiVG Geometry Normalization & Bezier Curve Interpolation
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 3: KanjiVG Geometry Normalization & Bezier Curve Interpolation');
try {
  const kanjiVg = await import('../src/lib/kanji/kanjiVgParser.ts');
  const {
    samplePointsFromPath,
    getPathLength,
    getStrokeStartPoint,
    getStrokeEndPoint,
    getStrokeBoundingBox,
    normalizePathToBounds,
    getKanjiUnicodeHex,
    parseKanjiVgSvg,
  } = kanjiVg;

  // 1. Unicode Hex conversion
  assert.strictEqual(getKanjiUnicodeHex('日'), '065e5', '日 must map to 065e5');
  assert.strictEqual(getKanjiUnicodeHex('本'), '0672c', '本 must map to 0672c');
  assert.strictEqual(getKanjiUnicodeHex(''), '');

  // 2. Bezier sampling for cubic and quadratic paths
  const testCubic = 'M 10 10 C 20 40 40 40 50 10';
  const cubicSampled = samplePointsFromPath(testCubic, 20);
  assert.strictEqual(cubicSampled.length, 21);
  assert.strictEqual(Math.round(cubicSampled[0].x), 10);
  assert.strictEqual(Math.round(cubicSampled[20].x), 50);

  // 3. Start & End points
  const startPt = getStrokeStartPoint(testCubic);
  const endPt = getStrokeEndPoint(testCubic);
  assert.strictEqual(Math.round(startPt.x), 10);
  assert.strictEqual(Math.round(endPt.x), 50);

  // 4. Bounding box
  const bbox = getStrokeBoundingBox(cubicSampled);
  assert.ok(bbox.width > 35 && bbox.width <= 45);
  assert.ok(bbox.height >= 0);

  // 5. Normalization
  const scaled = normalizePathToBounds('M 10 20 L 50 60', 100, 200);
  assert.ok(scaled.includes('20') && scaled.includes('100') && scaled.includes('120'));

  console.log('  ✅ Check 3 Passed: KanjiVG unicode hex, Bezier sampling, start/end & normalization verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 3 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 4: Discrete Fréchet Distance & Directional Vector Scoring
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 4: Discrete Fréchet Distance & Directional Vector Scoring');
try {
  const validator = await import('../src/lib/kanji/strokeValidator.ts');
  const {
    euclideanDistance,
    discreteFrechetDistance,
    calculateAngularSimilarity,
    validateStrokeWithFrechet,
  } = validator;

  // Target horizontal stroke: (10, 50) -> (90, 50)
  const targetStroke = [
    { x: 10, y: 50 },
    { x: 30, y: 50 },
    { x: 50, y: 50 },
    { x: 70, y: 50 },
    { x: 90, y: 50 },
  ];

  // 1. Identical stroke -> Valid, high score
  const perfectResult = validateStrokeWithFrechet(targetStroke, targetStroke);
  assert.strictEqual(perfectResult.isValid, true);
  assert.ok(perfectResult.score >= 90);
  assert.strictEqual(perfectResult.frechetDistance, 0);

  // 2. Backwards stroke: (90, 50) -> (10, 50)
  const backwardsStroke = [...targetStroke].reverse();
  const backwardsResult = validateStrokeWithFrechet(backwardsStroke, targetStroke);
  assert.strictEqual(backwardsResult.isValid, false);
  // Starts too far from (10, 50) since backwards starts at (90, 50)
  assert.ok(backwardsResult.feedback === 'too_far' || backwardsResult.feedback === 'wrong_direction');

  // Backwards stroke starting near target start point but moving wrong direction
  const reversedDirectionStroke = [
    { x: 10, y: 50 },
    { x: 5, y: 50 },
    { x: 0, y: 50 },
  ];
  const wrongDirResult = validateStrokeWithFrechet(reversedDirectionStroke, targetStroke);
  assert.strictEqual(wrongDirResult.isValid, false);
  assert.strictEqual(wrongDirResult.feedback, 'wrong_direction');

  // 3. Prematurely truncated stroke
  const shortStroke = [
    { x: 10, y: 50 },
    { x: 20, y: 50 },
    { x: 25, y: 50 },
  ];
  const shortResult = validateStrokeWithFrechet(shortStroke, targetStroke);
  assert.strictEqual(shortResult.isValid, false);
  assert.strictEqual(shortResult.feedback, 'too_short');

  console.log('  ✅ Check 4 Passed: Discrete Fréchet, directional vector alignment & feedback tiers certified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 4 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 5: Kanji Mastery Tracker & Kangxi Radical Extraction Resilience
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 5: Kanji Mastery Tracker & Kangxi Radical Extraction Resilience');
try {
  const masteryModule = await import('../src/lib/kanji/kanjiMasteryStore.ts');
  const { kanjiMasteryStore } = masteryModule;

  // Defensive input handling
  const nullRecord = kanjiMasteryStore.recordPractice(null, 100, true);
  assert.strictEqual(nullRecord.character, '');

  const nanScoreRecord = kanjiMasteryStore.recordPractice('一', NaN, true);
  assert.strictEqual(nanScoreRecord.character, '一');
  assert.strictEqual(nanScoreRecord.averageScore, 0);

  // Progression tracking
  kanjiMasteryStore.recordPractice('日', 95, true);
  kanjiMasteryStore.recordPractice('日', 90, true);
  const m3 = kanjiMasteryStore.recordPractice('日', 88, true);
  assert.strictEqual(m3.masteryLevel, 'mastered', '3 completions >= 80 score must advance to mastered');

  // Kangxi Radical Extractor
  const radicalModule = await import('../src/lib/kanji/kanjiRadicalExtractor.ts');
  const { getRadicalInfo, decomposeRadicals } = radicalModule;

  const mizuRadical = getRadicalInfo('氵');
  assert.strictEqual(mizuRadical.nameId, 'Air (Sisi Kiri)');
  assert.strictEqual(mizuRadical.kangxiNumber, 85);

  const kiRadical = getRadicalInfo('木');
  assert.strictEqual(kiRadical.nameId, 'Pohon / Kayu');

  // Defensive unknown/null handling
  const nullRadical = getRadicalInfo(null);
  assert.strictEqual(nullRadical.nameJa, '不明');

  const decomposed = decomposeRadicals(['木', '氵', '口']);
  assert.strictEqual(decomposed.length, 3);
  assert.strictEqual(decomposed[2].nameId, 'Mulut');

  console.log('  ✅ Check 5 Passed: Kanji mastery store and Kangxi radical extraction resilience certified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 5 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Master Verification Summary
// ──────────────────────────────────────────────────────────────────
console.log(`\n📊 Sprint 41 Result: ${passCount}/${totalChecks} checks passed.`);
if (passCount === totalChecks) {
  console.log('🎉 Sprint 41 PASSED 100% GREEN!\n');
  process.exit(0);
} else {
  console.error(`❌ Sprint 41 FAILED with ${totalChecks - passCount} errors.\n`);
  process.exit(1);
}
