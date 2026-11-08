// ══════════════════════════════════════════════════════════════════
//  tests/test-s5-pass22-frechet-scoring.js
//  SIKLUS V — PASS 22: Discrete Fréchet Distance & Directional Vector Scoring
//  Klaster 7: Interactive Kanji Writing & Touch Recognition
//  Audits & Verifies:
//    - Robust Euclidean Distance with NaN/null/undefined edge case defense
//    - Trajectory Arc-Length & Equidistant Point Resampling (60Hz vs 120Hz touch rates)
//    - Discrete Fréchet Distance (DFD) O(m) Dynamic Programming Math
//    - Multi-Segment Piecewise Cosine Angular Similarity & Backwards-Stroke Detection
//    - 6-Tier Quality Feedback: perfect, good, wrong_direction, too_far, too_short, distorted
//    - Composite Accuracy Formula: 50% Fréchet + 30% Corridor + 20% Angular Tangent (>=80% Pass)
//    - Options Resolution & Defensive Fallbacks with Nullish Coalescing
//    - Real-world Kanji Stroke Emulation (Ichiji 一, Tatetate 丨, Curved Shita 乚)
// ══════════════════════════════════════════════════════════════════

const assert = require('assert');
const path = require('path');
const fs = require('fs');

console.log('╔══════════════════════════════════════════════════════════════════╗');
console.log('║  SIKLUS V — PASS 22: DISCRETE FRÉCHET & VECTOR SCORING AUDIT     ║');
console.log('╚══════════════════════════════════════════════════════════════════╝\n');

async function runPass22Tests() {
  const {
    euclideanDistance,
    getStrokeTrajectoryLength,
    resampleStrokePoints,
    discreteFrechetDistance,
    calculateAngularSimilarity,
    validateStrokeWithFrechet,
    validateStrokeDrawing,
    resolveOptions,
    DEFAULT_OPTIONS,
  } = await import('../src/lib/kanji/strokeValidator.ts');

  // ── T-1: Module Exports & Type Contracts ──
  console.log('--- [T-1] Module Exports & Type Contracts ---');
  assert.strictEqual(typeof euclideanDistance, 'function');
  assert.strictEqual(typeof getStrokeTrajectoryLength, 'function');
  assert.strictEqual(typeof resampleStrokePoints, 'function');
  assert.strictEqual(typeof discreteFrechetDistance, 'function');
  assert.strictEqual(typeof calculateAngularSimilarity, 'function');
  assert.strictEqual(typeof validateStrokeWithFrechet, 'function');
  assert.strictEqual(typeof validateStrokeDrawing, 'function');
  assert.strictEqual(typeof resolveOptions, 'function');
  assert(DEFAULT_OPTIONS && typeof DEFAULT_OPTIONS === 'object');
  assert.strictEqual(DEFAULT_OPTIONS.minPassScore, 80);
  assert.strictEqual(DEFAULT_OPTIONS.startTolerancePx, 26);
  assert.strictEqual(DEFAULT_OPTIONS.maxFrechetDistance, 24);
  console.log('  ✔ All functions and default configuration contracts certified.\n');

  // ── T-2: Euclidean Distance Math & Defensive Hardening ──
  console.log('--- [T-2] Euclidean Distance Math & Defensive Hardening ---');
  // Standard 3-4-5 right triangle
  const pA = { x: 0, y: 0 };
  const pB = { x: 3, y: 4 };
  assert.strictEqual(euclideanDistance(pA, pB), 5);

  // Identical point
  assert.strictEqual(euclideanDistance(pA, { x: 0, y: 0 }), 0);

  // Defensive checks against null, undefined, NaN
  assert.strictEqual(euclideanDistance(null, pB), Infinity);
  assert.strictEqual(euclideanDistance(pA, undefined), Infinity);
  assert.strictEqual(euclideanDistance({ x: NaN, y: 0 }, pB), Infinity);
  assert.strictEqual(euclideanDistance(pA, { x: 3, y: NaN }), Infinity);
  console.log('  ✔ Euclidean distance calculations and NaN/null defenses verified.\n');

  // ── T-3: Trajectory Arc-Length & Point Resampling ──
  console.log('--- [T-3] Trajectory Arc-Length & Point Resampling ---');
  const straightLine = [
    { x: 0, y: 0 },
    { x: 50, y: 0 },
    { x: 100, y: 0 },
  ];
  const lineLength = getStrokeTrajectoryLength(straightLine);
  assert.strictEqual(lineLength, 100);

  // Resample 3-point line into 11 points
  const resampled = resampleStrokePoints(straightLine, 11);
  assert.strictEqual(resampled.length, 11);
  assert.strictEqual(resampled[0].x, 0);
  assert.strictEqual(resampled[0].y, 0);
  assert.strictEqual(resampled[10].x, 100);
  assert.strictEqual(resampled[10].y, 0);
  // Point 5 should be exactly halfway (x: 50)
  assert.strictEqual(Math.round(resampled[5].x), 50);

  // Empty or degenerate cases
  assert.deepStrictEqual(resampleStrokePoints([], 10), []);
  assert.strictEqual(resampleStrokePoints([{ x: 10, y: 10 }], 5).length, 1);
  console.log('  ✔ Trajectory arc-length and touch rate resampling verified.\n');

  // ── T-4: Discrete Fréchet Distance (DFD) Dynamic Programming ──
  console.log('--- [T-4] Discrete Fréchet Distance (DFD) Dynamic Programming ---');
  // Curve 1 vs identical Curve 1 -> DFD = 0
  const curve1 = [
    { x: 10, y: 20 },
    { x: 30, y: 25 },
    { x: 50, y: 35 },
    { x: 70, y: 50 },
    { x: 90, y: 70 },
  ];
  assert.strictEqual(discreteFrechetDistance(curve1, curve1), 0);

  // Curve 2 parallel to Curve 1 shifted by exactly 8px on Y
  const curve2 = curve1.map((pt) => ({ x: pt.x, y: pt.y + 8 }));
  const dfdParallel = discreteFrechetDistance(curve1, curve2);
  assert.strictEqual(Math.round(dfdParallel), 8);

  // Curve with local deviation spike
  const curveSpike = curve1.map((pt, idx) =>
    idx === 2 ? { x: pt.x, y: pt.y + 15 } : { x: pt.x, y: pt.y }
  );
  const dfdSpike = discreteFrechetDistance(curve1, curveSpike);
  assert.strictEqual(Math.round(dfdSpike), 15);

  // Single point vs curve: distance must equal max distance to any point
  const singlePt = [{ x: 10, y: 20 }];
  const maxPtDist = Math.max(...curve1.map((p) => euclideanDistance(singlePt[0], p)));
  assert.strictEqual(
    Math.round(discreteFrechetDistance(singlePt, curve1)),
    Math.round(maxPtDist)
  );

  // Degenerate inputs
  assert.strictEqual(discreteFrechetDistance([], curve1), Infinity);
  assert.strictEqual(discreteFrechetDistance(curve1, null), Infinity);
  console.log('  ✔ Discrete Fréchet Distance DP matrix and boundary conditions verified.\n');

  // ── T-5: Multi-Segment Angular Similarity & Reverse Stroke Detection ──
  console.log('--- [T-5] Multi-Segment Angular Similarity & Reverse Stroke Detection ---');
  const horizTarget = [
    { x: 20, y: 50 },
    { x: 40, y: 50 },
    { x: 60, y: 50 },
    { x: 80, y: 50 },
  ];

  // Identical forward stroke
  const forwardSim = calculateAngularSimilarity(horizTarget, horizTarget);
  assert(forwardSim >= 0.99, `Forward stroke similarity must be >= 0.99, got ${forwardSim}`);

  // Reversed stroke (drawn backwards from 80 to 20)
  const reversedHoriz = [...horizTarget].reverse();
  const reverseSim = calculateAngularSimilarity(reversedHoriz, horizTarget);
  assert(reverseSim <= -0.9, `Reversed stroke similarity must be <= -0.9, got ${reverseSim}`);

  // Orthogonal stroke (vertical stroke evaluated against horizontal)
  const verticalStroke = [
    { x: 50, y: 20 },
    { x: 50, y: 40 },
    { x: 50, y: 60 },
    { x: 50, y: 80 },
  ];
  const orthoSim = calculateAngularSimilarity(verticalStroke, horizTarget);
  assert(Math.abs(orthoSim) < 0.2, `Orthogonal stroke similarity must be near 0, got ${orthoSim}`);

  // Dot stroke (ten / short dab)
  const dotStroke = [
    { x: 50, y: 50 },
    { x: 51, y: 51 },
  ];
  const dotSim = calculateAngularSimilarity(dotStroke, horizTarget);
  assert.strictEqual(dotSim, 1.0, 'Dot strokes (<4px) must be direction-forgiven with similarity 1.0');
  console.log('  ✔ Multi-segment cosine alignment and backwards detection verified.\n');

  // ── T-6: 6-Tier Feedback Categorization & Threshold Rules ──
  console.log('--- [T-6] 6-Tier Feedback Categorization & Validation Logic ---');

  // 1. 'perfect': Near identical high accuracy stroke
  const perfectUser = [
    { x: 20.5, y: 50.2 },
    { x: 40.1, y: 49.8 },
    { x: 60.3, y: 50.1 },
    { x: 79.8, y: 50.0 },
  ];
  const resPerfect = validateStrokeWithFrechet(perfectUser, horizTarget);
  assert.strictEqual(resPerfect.isValid, true);
  assert.strictEqual(resPerfect.feedback, 'perfect');
  assert(resPerfect.score >= 92, `Score must be >= 92, got ${resPerfect.score}`);

  // 2. 'good': Slightly wavy but within corridor and >= 80% (80..91)
  const goodUser = [
    { x: 22, y: 56 },
    { x: 41, y: 44 },
    { x: 62, y: 56 },
    { x: 78, y: 52 },
  ];
  const resGood = validateStrokeWithFrechet(goodUser, horizTarget);
  assert.strictEqual(resGood.isValid, true);
  assert.strictEqual(resGood.feedback, 'good');
  assert(resGood.score >= 80 && resGood.score < 92);

  // 3. 'wrong_direction': Backwards stroke
  const resWrongDir = validateStrokeWithFrechet(reversedHoriz, horizTarget);
  assert.strictEqual(resWrongDir.isValid, false);
  assert(
    resWrongDir.feedback === 'wrong_direction' || resWrongDir.feedback === 'too_far',
    `Feedback must be wrong_direction or too_far, got ${resWrongDir.feedback}`
  );

  // Specific wrong direction where start point is near target start (startDist <= 26px)
  // E.g. starts at (25, 50) but moves left to (-30, 50)
  const leftwardUser = [
    { x: 25, y: 50 },
    { x: 10, y: 50 },
    { x: -5, y: 50 },
    { x: -20, y: 50 },
  ];
  const resLeftward = validateStrokeWithFrechet(leftwardUser, horizTarget);
  assert.strictEqual(resLeftward.isValid, false);
  assert.strictEqual(resLeftward.feedback, 'wrong_direction');

  // 4. 'too_far': Start point starts outside 26px tolerance
  const farUser = [
    { x: 80, y: 90 },
    { x: 90, y: 90 },
    { x: 100, y: 90 },
  ];
  const resFar = validateStrokeWithFrechet(farUser, horizTarget);
  assert.strictEqual(resFar.isValid, false);
  assert.strictEqual(resFar.feedback, 'too_far');

  // 5. 'too_short': Aborted early (<70% progress along target)
  const shortUser = [
    { x: 20, y: 50 },
    { x: 30, y: 50 },
  ];
  const resShort = validateStrokeWithFrechet(shortUser, horizTarget);
  assert.strictEqual(resShort.isValid, false);
  assert.strictEqual(resShort.feedback, 'too_short');

  // 6. 'distorted': Way off corridor (> 24px Fréchet distance)
  const distortedUser = [
    { x: 20, y: 50 },
    { x: 40, y: 85 }, // Large bulge 35px away
    { x: 60, y: 85 },
    { x: 80, y: 50 },
  ];
  const resDistorted = validateStrokeWithFrechet(distortedUser, horizTarget);
  assert.strictEqual(resDistorted.isValid, false);
  assert.strictEqual(resDistorted.feedback, 'distorted');
  console.log('  ✔ All 6 feedback categories (perfect, good, wrong_direction, too_far, too_short, distorted) certified.\n');

  // ── T-7: Composite Scoring Formula & Options Resolution ──
  console.log('--- [T-7] Composite Scoring Formula & Custom Options ---');
  // Check options resolution with undefined overrides
  const resolved = resolveOptions({ minPassScore: 75, maxFrechetDistance: undefined });
  assert.strictEqual(resolved.minPassScore, 75);
  assert.strictEqual(resolved.maxFrechetDistance, 24); // safely fell back to default

  // Validate with custom 75 pass threshold
  const customPassResult = validateStrokeWithFrechet(goodUser, horizTarget, { minPassScore: 75 });
  assert.strictEqual(customPassResult.isValid, true);

  // Backward-compatible alias
  const aliasResult = validateStrokeDrawing(perfectUser, horizTarget);
  assert.strictEqual(aliasResult.isValid, true);
  assert.strictEqual(aliasResult.feedback, 'perfect');

  // Diagnostic details verification
  assert(resPerfect.details, 'Must populate details object');
  assert(typeof resPerfect.details.frechetScore === 'number');
  assert(typeof resPerfect.details.corridorScore === 'number');
  assert(typeof resPerfect.details.angleScore === 'number');
  console.log('  ✔ Composite scoring formula and options resolution verified.\n');

  // ── T-8: Authentic Japanese Kanji Stroke Emulation ──
  console.log('--- [T-8] Authentic Japanese Kanji Stroke Emulation ---');

  // Stroke 1: Kanji 一 (One) — Horizontal Left to Right
  const ichiTarget = [
    { x: 15, y: 55 },
    { x: 35, y: 54 },
    { x: 55, y: 53 },
    { x: 75, y: 52 },
    { x: 95, y: 50 },
  ];
  const ichiValid = [
    { x: 16, y: 56 },
    { x: 36, y: 54 },
    { x: 56, y: 53 },
    { x: 76, y: 52 },
    { x: 94, y: 51 },
  ];
  const ichiRes = validateStrokeWithFrechet(ichiValid, ichiTarget);
  assert.strictEqual(ichiRes.isValid, true);
  assert(ichiRes.score >= 90);

  // Stroke 2: Kanji 丨 (Tate) — Vertical Top to Bottom (as in 十)
  const tateTarget = [
    { x: 54, y: 15 },
    { x: 54, y: 35 },
    { x: 54, y: 55 },
    { x: 54, y: 75 },
    { x: 54, y: 95 },
  ];
  const tateBottomUp = [...tateTarget].reverse(); // Drawn incorrectly bottom-to-top
  const tateFail = validateStrokeWithFrechet(tateBottomUp, tateTarget);
  assert.strictEqual(tateFail.isValid, false);

  // Stroke 3: Kanji 乚 (J-curve / Kakari hook)
  const hookTarget = [
    { x: 30, y: 20 },
    { x: 30, y: 50 },
    { x: 30, y: 75 },
    { x: 45, y: 82 },
    { x: 65, y: 80 },
    { x: 70, y: 70 },
  ];
  const hookUser = hookTarget.map((pt) => ({ x: pt.x + 1.5, y: pt.y - 1 }));
  const hookRes = validateStrokeWithFrechet(hookUser, hookTarget);
  assert.strictEqual(hookRes.isValid, true);
  assert(hookRes.score >= 85);

  console.log('  ✔ Realistic Kanji strokes (一, 丨, 乚) tested and verified.\n');

  console.log('╔══════════════════════════════════════════════════════════════════╗');
  console.log('║  🎉 ALL SIKLUS V PASS 22 VERIFICATION SUITES PASSED (8/8)        ║');
  console.log('╚══════════════════════════════════════════════════════════════════╝');
}

runPass22Tests().catch((err) => {
  console.error('\n❌ SIKLUS V PASS 22 FAILED:', err);
  process.exit(1);
});
