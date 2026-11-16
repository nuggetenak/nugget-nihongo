// ══════════════════════════════════════════════════════════════════
//  test-s8-pass6-kanji-stroke-frechet-canvas.js
//  Siklus VIII Pass 6 (Sprint 52 / Suite 193):
//  Kana Canvas, Stroke Order Animations, Discrete Fréchet Distance & Handwriting Engine
// ══════════════════════════════════════════════════════════════════

import assert from 'assert';
import fs from 'fs';
import path from 'path';
import {
  discreteFrechetDistance,
  euclideanDistance,
  calculateAngularSimilarity,
  validateStrokeWithFrechet,
  resampleStrokePoints,
  getStrokeTrajectoryLength,
} from '../src/lib/kanji/strokeValidator.ts';
import { samplePointsFromPath, parseKanjiVgSvg } from '../src/lib/kanji/kanjiVgParser.ts';

console.log('⚡ Running Suite 193: Siklus VIII Pass 6 (Sprint 52): Kana Canvas, Stroke Animations, Fréchet & Handwriting...');

const ROOT = process.cwd().includes('nugget-nihongo')
  ? process.cwd()
  : path.join(process.cwd(), 'nugget-nihongo');

// ── Check 1: KanjiCanvas Source Contracts & Array Safety ─────────────────
console.log('  Check 52.1: Verifying KanjiCanvas.tsx handle contracts, pointer lifecycle & array safety...');
const canvasPath = path.join(ROOT, 'src', 'components', 'kanji', 'KanjiCanvas.tsx');
assert(fs.existsSync(canvasPath), 'KanjiCanvas.tsx must exist');
const canvasContent = fs.readFileSync(canvasPath, 'utf8');

assert(
  canvasContent.includes('if (!points || !Array.isArray(points) || points.length === 0) return;'),
  'KanjiCanvas drawStroke must defensively guard against non-array or empty points payload'
);

assert(
  canvasContent.includes('const dpr = typeof window !== \'undefined\' ? window.devicePixelRatio || 1 : 1;') &&
  canvasContent.includes('ctx.scale(dpr, dpr);'),
  'KanjiCanvas must provide syncDpi with retina scaling'
);

assert(
  canvasContent.includes('canvas.setPointerCapture') &&
  canvasContent.includes('canvas.releasePointerCapture') &&
  canvasContent.includes('touchAction: \'none\''),
  'KanjiCanvas must maintain unified pointer capture and scroll suppression'
);
console.log('  ✅ Check 52.1 passed: KanjiCanvas source contracts and array safety verified.');

// ── Check 2: Discrete Fréchet Distance Metric Axioms & Robustness ─────────
console.log('  Check 52.2: Verifying Discrete Fréchet Distance metric properties and edge cases...');

// Metric Axiom 1: Identity DFD(P, P) = 0
const curveA = [
  { x: 10, y: 10 },
  { x: 20, y: 30 },
  { x: 40, y: 60 },
  { x: 80, y: 90 },
];
const distSelf = discreteFrechetDistance(curveA, curveA);
assert.strictEqual(distSelf, 0, 'Discrete Fréchet Distance of curve with itself must be 0');

// Metric Axiom 2: Symmetry DFD(P, Q) = DFD(Q, P)
const curveB = [
  { x: 12, y: 11 },
  { x: 22, y: 32 },
  { x: 41, y: 58 },
  { x: 82, y: 88 },
];
const distAB = discreteFrechetDistance(curveA, curveB);
const distBA = discreteFrechetDistance(curveB, curveA);
assert(Math.abs(distAB - distBA) < 1e-9, `Fréchet distance must be symmetric: ${distAB} vs ${distBA}`);
assert(distAB > 0 && distAB < 5, 'Similar curves must yield small finite Fréchet distance');

// Metric Axiom 3: Non-negativity and empty input handling
assert(distAB >= 0, 'Fréchet distance must be non-negative');
assert.strictEqual(discreteFrechetDistance([], curveB), Infinity, 'Empty curve must return Infinity');
assert.strictEqual(discreteFrechetDistance(curveA, []), Infinity, 'Empty curve must return Infinity');
assert.strictEqual(discreteFrechetDistance(null, curveB), Infinity, 'Null curve must return Infinity');

console.log('  ✅ Check 52.2 passed: Discrete Fréchet Distance metric axioms and edge cases verified.');

// ── Check 3: Multi-Segment Angular Similarity & Backwards Drawing ────────
console.log('  Check 52.3: Verifying angular similarity and backwards-drawing detection...');

// Horizontal stroke drawn left-to-right (e.g. kanji stroke 一)
const targetStroke = [
  { x: 20, y: 50 },
  { x: 50, y: 50 },
  { x: 80, y: 50 },
];
// User draws left-to-right (correct)
const correctUserStroke = [
  { x: 21, y: 49 },
  { x: 51, y: 51 },
  { x: 81, y: 50 },
];
const correctSim = calculateAngularSimilarity(correctUserStroke, targetStroke);
assert(correctSim > 0.9, `Correct direction stroke must have high angular similarity (>0.9, got ${correctSim})`);

// User draws right-to-left (backwards!)
const backwardsUserStroke = [
  { x: 81, y: 50 },
  { x: 51, y: 51 },
  { x: 21, y: 49 },
];
const backwardsSim = calculateAngularSimilarity(backwardsUserStroke, targetStroke);
assert(backwardsSim < -0.2, `Backwards stroke must have negative angular similarity (<-0.2, got ${backwardsSim})`);

console.log('  ✅ Check 52.3 passed: Angular similarity and backwards-drawing detection verified.');

// ── Check 4: validateStrokeWithFrechet Composite Scoring & Feedback ───────
console.log('  Check 52.4: Verifying composite scoring (Fréchet + Corridor + Angle) & feedback taxonomy...');

// Perfect stroke validation
const perfectResult = validateStrokeWithFrechet(correctUserStroke, targetStroke);
assert(perfectResult.isValid, 'Correct stroke must validate as valid');
assert(perfectResult.score >= 80, `Score must be >= 80 (got ${perfectResult.score})`);
assert(perfectResult.feedback === 'perfect' || perfectResult.feedback === 'good', 'Feedback must be perfect or good');

// User starts at correct origin (20, 50) but draws in the opposite direction (leftwards instead of rightwards)
const wrongDirectionUserStroke = [
  { x: 20, y: 50 },
  { x: 10, y: 50 },
  { x: 0, y: 50 },
];
const backwardsResult = validateStrokeWithFrechet(wrongDirectionUserStroke, targetStroke);
assert(!backwardsResult.isValid, 'Backwards stroke must not be valid');
assert.strictEqual(backwardsResult.feedback, 'wrong_direction', 'Backwards stroke feedback must be wrong_direction');

// Too far starting point
const tooFarStroke = [
  { x: 90, y: 90 },
  { x: 100, y: 90 },
];
const tooFarResult = validateStrokeWithFrechet(tooFarStroke, targetStroke);
assert(!tooFarResult.isValid, 'Stroke starting too far must fail');
assert.strictEqual(tooFarResult.feedback, 'too_far', 'Feedback must be too_far');

// Empty or single-point input
const tooShortResult = validateStrokeWithFrechet([{ x: 20, y: 50 }], targetStroke);
assert(!tooShortResult.isValid, 'Single-point stroke must fail as too_short');
assert.strictEqual(tooShortResult.feedback, 'too_short', 'Feedback must be too_short');

console.log('  ✅ Check 52.4 passed: Composite scoring and feedback taxonomy verified.');

// ── Check 5: kanjiVgParser Headless Vector Sampling & Stroke Coordination ─
console.log('  Check 52.5: Verifying kanjiVgParser headless path sampling in 109x109 viewBox...');
const horizontalSvgPath = 'M 20,50 L 80,50';
const sampledPoints = samplePointsFromPath(horizontalSvgPath, 20);

assert(Array.isArray(sampledPoints), 'samplePointsFromPath must return an array of Point2D');
assert(sampledPoints.length === 21, `samplePointsFromPath must return samples + 1 points including start and end (expected 21, got ${sampledPoints.length})`);
assert(Math.abs(sampledPoints[0].x - 20) < 1, 'First sampled point X must be near 20');
assert(Math.abs(sampledPoints[20].x - 80) < 1, 'Last sampled point X must be near 80');

const trajectoryLen = getStrokeTrajectoryLength(sampledPoints);
assert(Math.abs(trajectoryLen - 60) < 2, `Trajectory length of (20,50)->(80,50) must be ~60 (got ${trajectoryLen})`);

console.log('  ✅ Check 52.5 passed: kanjiVgParser headless vector sampling verified.');

console.log('\n🎉 Suite 193 (Siklus VIII Pass 6: Kana Canvas, Fréchet & Handwriting) PASSED (5/5 checks 100% GREEN)!\n');
