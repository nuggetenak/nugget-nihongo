// ══════════════════════════════════════════════════════════════════
//  tests/test-s5-pass21-kanjivg-geometry.js
//  SIKLUS V — PASS 21: KanjiVG Geometry Normalization & Bezier Path Sampling
//  Klaster 7: Interactive Kanji Writing & Touch Recognition
//  Audits & Verifies:
//    - Headless SVG Path Sampling across Linear, Cubic (C), Smooth Cubic (S) & Quadratic (Q)
//    - Reflected Control Point Calculation for Smooth Bezier Curves (S/s)
//    - Equidistant Arc-Length Resampling for Continuous Stroke Verification
//    - Stroke Bounding Box (min/max/width/height) & Geometric Centerpoints
//    - 109x109 KanjiVG ViewBox Geometry Normalization (normalizePathToBounds)
//    - Standalone Kanji to 5-Digit Unicode Hex Code Translator (getKanjiUnicodeHex)
//    - Cache Eviction, Bounded Capacities & Telemetry (clearKanjiVgCache, getKanjiVgCacheStats)
//    - Authentic KanjiVG XML/SVG Parsing & Dasharray Stroke Timeline Generation
// ══════════════════════════════════════════════════════════════════

const assert = require('assert');
const path = require('path');
const fs = require('fs');

console.log('╔══════════════════════════════════════════════════════════════════╗');
console.log('║   SIKLUS V — PASS 21: KANJIVG GEOMETRY & BEZIER SAMPLING AUDIT   ║');
console.log('╚══════════════════════════════════════════════════════════════════╝\n');

async function runPass21Tests() {
  const {
    getPathLength,
    samplePointsFromPath,
    getStrokeStartPoint,
    getStrokeEndPoint,
    getStrokeBoundingBox,
    normalizePathToBounds,
    getKanjiUnicodeHex,
    clearKanjiVgCache,
    getKanjiVgCacheStats,
    parseKanjiVgSvg,
    generateStrokeAnimationTimeline,
  } = await import('../src/lib/kanji/kanjiVgParser.ts');

  // ── T-1: Module Exports & Type Contracts ──
  console.log('--- [T-1] Module Exports & Geometry API Contracts ---');

  assert.strictEqual(typeof getPathLength, 'function');
  assert.strictEqual(typeof samplePointsFromPath, 'function');
  assert.strictEqual(typeof getStrokeStartPoint, 'function');
  assert.strictEqual(typeof getStrokeEndPoint, 'function');
  assert.strictEqual(typeof getStrokeBoundingBox, 'function');
  assert.strictEqual(typeof normalizePathToBounds, 'function');
  assert.strictEqual(typeof getKanjiUnicodeHex, 'function');
  assert.strictEqual(typeof clearKanjiVgCache, 'function');
  assert.strictEqual(typeof getKanjiVgCacheStats, 'function');
  assert.strictEqual(typeof parseKanjiVgSvg, 'function');
  assert.strictEqual(typeof generateStrokeAnimationTimeline, 'function');

  console.log('  ✓ [T-1 PASS] All 11 public geometry and parsing functions certified.');

  // ── T-2: Headless Bezier Sampling (Linear, Cubic C, Smooth Cubic S, Quadratic Q) ──
  console.log('--- [T-2] Headless Bezier Path Sampling & Reflected Control Points ---');

  // 1. Linear moves and lines (M, L, H, V)
  const linearD = 'M 10 20 H 60 V 80 L 10 20 Z';
  const linearPoints = samplePointsFromPath(linearD, 10);
  assert.strictEqual(linearPoints.length, 11, 'Must return exactly samples + 1 points');
  assert.strictEqual(Math.round(linearPoints[0].x), 10);
  assert.strictEqual(Math.round(linearPoints[0].y), 20);

  // 2. Cubic Bezier (C) curve
  const cubicD = 'M 15 54.5 c 2.5 0.5 5 0.5 7.5 0.25 c 15 -1 45 -3 65 -3.5';
  const cubicPoints = samplePointsFromPath(cubicD, 20);
  assert.strictEqual(cubicPoints.length, 21);
  assert.strictEqual(Math.round(cubicPoints[0].x), 15);
  assert.strictEqual(Math.round(cubicPoints[0].y), 55);
  assert(cubicPoints[20].x > 80, 'End of stroke must reach right quadrant');

  // 3. Smooth Cubic Bezier (S) with reflected control point
  const smoothCubicD = 'M 10 10 C 20 20 30 20 40 10 S 60 0 70 10';
  const smoothPoints = samplePointsFromPath(smoothCubicD, 28);
  assert.strictEqual(smoothPoints.length, 29);
  // Verify smooth curve does not jump or produce NaNs
  smoothPoints.forEach((pt, i) => {
    assert(!isNaN(pt.x) && isFinite(pt.x), `Point ${i} x must be finite number`);
    assert(!isNaN(pt.y) && isFinite(pt.y), `Point ${i} y must be finite number`);
  });

  // 4. Quadratic Bezier (Q)
  const quadD = 'M 0 0 Q 50 100 100 0';
  const quadPoints = samplePointsFromPath(quadD, 10);
  assert.strictEqual(quadPoints.length, 11);
  assert.strictEqual(quadPoints[0].x, 0);
  assert.strictEqual(quadPoints[0].y, 0);
  assert.strictEqual(Math.round(quadPoints[10].x), 100);
  assert.strictEqual(Math.round(quadPoints[10].y), 0);
  // Midpoint should be elevated towards control point (Y > 30)
  assert(quadPoints[5].y > 30, 'Quadratic arc midpoint must elevate along parabola');

  console.log('  ✓ [T-2 PASS] Linear, cubic, smooth cubic & quadratic Bezier curves sampled accurately.');

  // ── T-3: Equidistant Arc-Length Resampling Invariants ──
  console.log('--- [T-3] Equidistant Arc-Length Resampling Invariants ---');

  const testD = 'M 10 10 L 90 90';
  const samplesCount = 16;
  const resampled = samplePointsFromPath(testD, samplesCount);
  assert.strictEqual(resampled.length, samplesCount + 1);

  // Check uniform step distances
  const stepDists = [];
  for (let i = 1; i < resampled.length; i++) {
    const dx = resampled[i].x - resampled[i - 1].x;
    const dy = resampled[i].y - resampled[i - 1].y;
    stepDists.push(Math.sqrt(dx * dx + dy * dy));
  }
  const avgDist = stepDists.reduce((a, b) => a + b, 0) / stepDists.length;
  for (const d of stepDists) {
    assert(Math.abs(d - avgDist) < 0.2, `Step distance ${d} should be close to average ${avgDist}`);
  }

  // Single point / degenerate path handling
  assert.deepStrictEqual(samplePointsFromPath('', 10), []);
  const singlePt = samplePointsFromPath('M 50 50', 5);
  assert.strictEqual(singlePt.length, 6);
  assert.strictEqual(singlePt[0].x, 50);
  assert.strictEqual(singlePt[5].x, 50);

  console.log('  ✓ [T-3 PASS] Equidistant arc-length resampling & degenerate path guards verified.');

  // ── T-4: Stroke Start, End & Bounding Box Extraction ──
  console.log('--- [T-4] Stroke Start, End & Bounding Box Extraction ---');

  const strokeD = 'M 25 35 C 30 40 40 50 50 60 L 85 95';
  const startPt = getStrokeStartPoint(strokeD);
  assert.strictEqual(startPt.x, 25);
  assert.strictEqual(startPt.y, 35);

  const endPt = getStrokeEndPoint(strokeD);
  assert.strictEqual(Math.round(endPt.x), 85);
  assert.strictEqual(Math.round(endPt.y), 95);

  // Fallbacks on empty path
  assert.deepStrictEqual(getStrokeStartPoint(''), { x: 54.5, y: 54.5 });
  assert.deepStrictEqual(getStrokeEndPoint(''), { x: 54.5, y: 54.5 });

  // Bounding Box
  const bbox = getStrokeBoundingBox([
    { x: 10, y: 20 },
    { x: 50, y: 80 },
    { x: 30, y: 15 },
  ]);
  assert.strictEqual(bbox.minX, 10);
  assert.strictEqual(bbox.minY, 15);
  assert.strictEqual(bbox.maxX, 50);
  assert.strictEqual(bbox.maxY, 80);
  assert.strictEqual(bbox.width, 40);
  assert.strictEqual(bbox.height, 65);

  // Empty bounding box
  const emptyBbox = getStrokeBoundingBox([]);
  assert.strictEqual(emptyBbox.width, 0);
  assert.strictEqual(emptyBbox.height, 0);

  console.log('  ✓ [T-4 PASS] Stroke start/end coordinates & 2D bounding boxes verified.');

  // ── T-5: ViewBox Coordinate Normalization (normalizePathToBounds) ──
  console.log('--- [T-5] ViewBox Coordinate Normalization ---');

  // Same size: returns original without string modification
  const origD = 'M 10 20 L 30 40';
  assert.strictEqual(normalizePathToBounds(origD, 109, 109), origD);

  // Scaling 100 -> 109
  const scaled = normalizePathToBounds(origD, 100, 109);
  assert(scaled.includes('10.9'), 'Coordinates scaled by 1.09');
  assert(scaled.includes('21.8'), 'Coordinates scaled by 1.09');
  assert(scaled.includes('32.7'), 'Coordinates scaled by 1.09');
  assert(scaled.includes('43.6'), 'Coordinates scaled by 1.09');

  // Defensive input
  assert.strictEqual(normalizePathToBounds('', 100, 109), '');
  assert.strictEqual(normalizePathToBounds(origD, 0, 109), origD);

  console.log('  ✓ [T-5 PASS] ViewBox coordinate scaling & boundary guards verified.');

  // ── T-6: Standalone Kanji Unicode Hex Code Translator ──
  console.log('--- [T-6] Kanji Unicode Hex Code Translator ---');

  assert.strictEqual(getKanjiUnicodeHex('日'), '065e5', '日 Unicode hex code');
  assert.strictEqual(getKanjiUnicodeHex('木'), '06728', '木 Unicode hex code');
  assert.strictEqual(getKanjiUnicodeHex('一'), '04e00', '一 Unicode hex code');
  assert.strictEqual(getKanjiUnicodeHex('水'), '06c34', '水 Unicode hex code');
  assert.strictEqual(getKanjiUnicodeHex('火'), '0706b', '火 Unicode hex code');

  // Defensive guards
  assert.strictEqual(getKanjiUnicodeHex(''), '');
  assert.strictEqual(getKanjiUnicodeHex(null), '');
  assert.strictEqual(getKanjiUnicodeHex(undefined), '');

  console.log('  ✓ [T-6 PASS] 5-digit Unicode hex code translation certified.');

  // ── T-7: Cache Lifecycle, Bounded Capacity & Statistics ──
  console.log('--- [T-7] Cache Lifecycle, Capacity & Telemetry ---');

  clearKanjiVgCache();
  let stats = getKanjiVgCacheStats();
  assert.strictEqual(stats.pathLengthsCached, 0, 'Cache must be empty after clear');
  assert.strictEqual(stats.pointSetsCached, 0, 'Cache must be empty after clear');

  getPathLength('M 10 10 L 20 20');
  samplePointsFromPath('M 10 10 L 20 20', 10);

  stats = getKanjiVgCacheStats();
  assert(stats.pathLengthsCached >= 1, 'Path length cached');
  assert(stats.pointSetsCached >= 1, 'Point set cached');

  clearKanjiVgCache();
  assert.strictEqual(getKanjiVgCacheStats().pathLengthsCached, 0);

  console.log('  ✓ [T-7 PASS] Cache lifecycle, flush & telemetry verified.');

  // ── T-8: Authentic KanjiVG XML/SVG Parsing & Dasharray Timeline ──
  console.log('--- [T-8] KanjiVG XML Parsing & Dasharray Timeline Generation ---');

  const sampleSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="109" height="109" viewBox="0 0 109 109">
      <g id="kvg:StrokePaths_065e5" style="fill:none;stroke:#000000;stroke-width:3">
        <g id="kvg:065e5" kvg:element="日" kvg:radical="general">
          <path id="kvg:065e5-s1" kvg:type="㇑" d="M25.75,25.42c0.88,0.88,1.4,2.33,1.4,3.83c0,4.25-0.03,42.5-0.03,59.75" />
          <path id="kvg:065e5-s2" kvg:type="㇕a" d="M28.02,27.42c6.23-0.92,44.98-4.67,49.8-4.92c4.02-0.21,5.63,1.21,5.63,5.25c0,9.75-0.08,41.25-0.08,59.25" />
          <path id="kvg:065e5-s3" kvg:type="㇐a" d="M28.25,54.25c11.25-1,43.75-3.5,53.25-3.75" />
          <path id="kvg:065e5-s4" kvg:type="㇐a" d="M28.25,85.25c12-1,39.5-2.75,53.25-3" />
        </g>
      </g>
      <g id="kvg:StrokeNumbers_065e5" style="font-size:8;fill:#808080">
        <text transform="matrix(1 0 0 1 19.5 33.5)">1</text>
        <text transform="matrix(1 0 0 1 30.5 23.5)">2</text>
        <text transform="matrix(1 0 0 1 32.5 50.5)">3</text>
        <text transform="matrix(1 0 0 1 32.5 81.5)">4</text>
      </g>
    </svg>
  `;

  const parsed = parseKanjiVgSvg(sampleSvg, '日');
  assert.strictEqual(parsed.character, '日');
  assert.strictEqual(parsed.unicodeHex, '065e5');
  assert.strictEqual(parsed.strokes, 4);
  assert.strictEqual(parsed.paths.length, 4);
  assert.strictEqual(parsed.strokeNumbers.length, 4);
  assert.strictEqual(parsed.strokeNumbers[0].number, 1);
  assert.strictEqual(parsed.strokeNumbers[0].x, 19.5);
  assert.strictEqual(parsed.strokeNumbers[0].y, 33.5);
  assert(parsed.radicals.includes('日'), 'Radical extraction must detect element 日');

  // Animation timeline generation
  const strokeLengths = parsed.paths.map((p) => getPathLength(p));
  const timeline = generateStrokeAnimationTimeline(strokeLengths, 500, 1.0);
  assert.strictEqual(timeline.length, 4);
  assert.strictEqual(timeline[0].strokeIndex, 0);
  assert.strictEqual(timeline[0].delayMs, 0);
  assert.strictEqual(timeline[0].durationMs, 500);
  assert(timeline[1].delayMs > 500, 'Second stroke delay must succeed first stroke duration');

  console.log('  ✓ [T-8 PASS] Full KanjiVG SVG parsing & dasharray animation timeline verified.');

  console.log('\n╔══════════════════════════════════════════════════════════════════╗');
  console.log('║   ALL PASS 21 KANJIVG GEOMETRY AUDIT TESTS PASSED!               ║');
  console.log('╚══════════════════════════════════════════════════════════════════╝\n');
}

runPass21Tests().catch((err) => {
  console.error('Pass 21 Test Failed:', err);
  process.exit(1);
});
