// ═════════════════════════════════════════════════════════════════════════════════════════════
//  tests/test-s5-pass4-cat-irt-engine.js
//  SIKLUS V — PASS 4: CAT / IRT 3PL Adaptive Diagnostic Engine
//  Research Basis:
//    - Birnbaum (1968), Lord (1980) — 3-Parameter Logistic (3PL) Item Response Theory
//    - Reckase (2009) — Multidimensional Computer Adaptive Testing & Information Functions
//    - Nugget Nihongo Adaptive Diagnostic Specification — 10-12 questions, SEM <= 0.35
// ═════════════════════════════════════════════════════════════════════════════════════════════

const assert = require('assert');
const path = require('path');
const fs = require('fs');

console.log('╔══════════════════════════════════════════════════════════════════════════════╗');
console.log('║   SIKLUS V — PASS 4: CAT / IRT 3PL ADAPTIVE DIAGNOSTIC ENGINE                ║');
console.log('╚══════════════════════════════════════════════════════════════════════════════╝\n');

const ROOT_DIR = path.resolve(__dirname, '..');
const catPath = path.join(ROOT_DIR, 'src/lib/cat/catEngine.ts');
assert(fs.existsSync(catPath), 'catEngine.ts must exist at src/lib/cat/catEngine.ts');

const {
  calculate3PLProbability,
  calculateFisherInformation,
  calculateCATSEM,
  shouldStopCAT,
  selectNextCATQuestion,
  updateThetaEstimate,
  finalizeCATResult,
  mapThetaToJLPTLevel,
  CAT_TARGET_SEM,
  CAT_MIN_QUESTIONS,
  CAT_MAX_QUESTIONS,
} = require('../src/lib/cat/catEngine.ts');

// ── Check 1: 3PL Probability Function Mathematical Contract ───────────────────
console.log('▶ Check 1: 3PL Item Response Probability Mathematical S-Curve...');

// Asymptotic boundaries
const pPlusInf = calculate3PLProbability(100.0, 0.0, 1.25, 0.25);
const pMinusInf = calculate3PLProbability(-100.0, 0.0, 1.25, 0.25);
assert(pPlusInf >= 0.999, `Upper asymptote must approach 1.0, got ${pPlusInf}`);
assert(Math.abs(pMinusInf - 0.25) < 1e-4, `Lower asymptote must approach c=0.25, got ${pMinusInf}`);

// At difficulty threshold theta = b, P(b) = c + (1-c)/2 = 0.25 + 0.375 = 0.625
const pAtB = calculate3PLProbability(0.5, 0.5, 1.25, 0.25);
assert(Math.abs(pAtB - 0.625) < 1e-4, `P(b) must equal 0.625, got ${pAtB}`);

// Strict monotonic increase with ability theta
const p1 = calculate3PLProbability(-1.5, 0.0);
const p2 = calculate3PLProbability(-0.5, 0.0);
const p3 = calculate3PLProbability(0.5, 0.0);
const p4 = calculate3PLProbability(1.5, 0.0);
assert(p1 < p2 && p2 < p3 && p3 < p4, `Strict monotonic probability increase failed: ${p1} < ${p2} < ${p3} < ${p4}`);

// Robustness against NaN/infinite values
const pNaN = calculate3PLProbability(NaN, 0.0);
assert(Number.isFinite(pNaN) && pNaN >= 0.25 && pNaN <= 1.0, 'NaN input must return valid probability');
console.log(`  ✔ [PASS] 3PL S-curve verified: P(-inf)=${pMinusInf.toFixed(3)} -> P(b)=${pAtB.toFixed(3)} -> P(+inf)=${pPlusInf.toFixed(3)}; monotonic order confirmed`);

// ── Check 2: Fisher Information Function & Peak Targeting ──────────────────────
console.log('\n▶ Check 2: Fisher Information Function & Optimal Targeting...');

const itemEasy = { difficulty: -1.2, discrimination: 1.5, guessing: 0.25 };
const itemHard = { difficulty: 1.5, discrimination: 1.5, guessing: 0.25 };

// Information for itemEasy must be much higher at theta = -1.2 than at theta = +1.5
const infoEasyAtEasy = calculateFisherInformation(itemEasy, -1.2);
const infoEasyAtHard = calculateFisherInformation(itemEasy, 1.5);
assert(infoEasyAtEasy > infoEasyAtHard, `Item info must peak near difficulty: ${infoEasyAtEasy} > ${infoEasyAtHard}`);

// Information for itemHard must be much higher at theta = +1.5 than at theta = -1.2
const infoHardAtHard = calculateFisherInformation(itemHard, 1.5);
const infoHardAtEasy = calculateFisherInformation(itemHard, -1.2);
assert(infoHardAtHard > infoHardAtEasy, `Item info must peak near difficulty: ${infoHardAtHard} > ${infoHardAtEasy}`);

// Higher discrimination must yield strictly higher peak Fisher Information
const itemHighA = { difficulty: 0.0, discrimination: 2.0, guessing: 0.25 };
const itemLowA = { difficulty: 0.0, discrimination: 0.8, guessing: 0.25 };
const infoHigh = calculateFisherInformation(itemHighA, 0.0);
const infoLow = calculateFisherInformation(itemLowA, 0.0);
assert(infoHigh > infoLow, `Higher discrimination must yield higher information: a=2.0 (${infoHigh.toFixed(3)}) > a=0.8 (${infoLow.toFixed(3)})`);

// Non-zero boundary protection
const infoExtreme = calculateFisherInformation({ difficulty: 100.0 }, -100.0);
assert(infoExtreme >= 0.0001, 'Fisher information must never drop below 0.0001');
console.log(`  ✔ [PASS] Fisher Information peaks near item difficulty; higher discrimination a=2.0 (${infoHigh.toFixed(3)}) > a=0.8 (${infoLow.toFixed(3)})`);

// ── Check 3: Standard Error of Measurement (SEM) & Dynamic Stopping ────────────
console.log('\n▶ Check 3: SEM Monotonic Reduction & Dynamic Stopping Criteria...');

const answeredList = [];
let prevSEM = calculateCATSEM(answeredList, 0.0);
assert(Math.abs(prevSEM - 1.0) < 1e-4, `Prior SEM with 0 questions must equal 1.0, got ${prevSEM}`);

// Administer 10 items matched to theta = 0.0
for (let i = 1; i <= 10; i++) {
  answeredList.push({ question: { difficulty: 0.0, discrimination: 1.4, guessing: 0.25 } });
  const currentSEM = calculateCATSEM(answeredList, 0.0);
  assert(currentSEM < prevSEM, `SEM must strictly decrease monotonically at question ${i}: ${currentSEM} < ${prevSEM}`);
  prevSEM = currentSEM;
}

// Stopping rule enforcement:
// 1. Never stop before min questions (6) even if SEM is low
assert.strictEqual(shouldStopCAT(5, 0.30), false, 'Must not stop before 6 questions');
// 2. Stop when SEM <= 0.35 at or after 6 questions
assert.strictEqual(shouldStopCAT(6, 0.34), true, 'Must stop at 6 questions when SEM <= 0.35');
assert.strictEqual(shouldStopCAT(8, 0.38), false, 'Must not stop if SEM > 0.35 before max questions');
// 3. Always stop when max questions (12) reached
assert.strictEqual(shouldStopCAT(12, 0.42), true, 'Must stop at 12 questions unconditionally');
console.log(`  ✔ [PASS] SEM decreases monotonically: 1.000 -> ${prevSEM.toFixed(3)}; stopping rules (min 6, SEM <= 0.35, max 12) strictly enforced`);

// ── Check 4: Bayesian Ability Update Theta Trajectory ───────────────────────────
console.log('\n▶ Check 4: Bayesian Ability Update Theta Trajectory...');

// High-performing student (10 consecutive correct answers)
let highTheta = 0.0;
for (let q = 1; q <= 10; q++) {
  const nextTheta = updateThetaEstimate(highTheta, true, 0.5, q, 12);
  if (highTheta < 2.2) {
    assert(nextTheta > highTheta, `Correct answer must increase theta at question ${q}: ${nextTheta} > ${highTheta}`);
  } else {
    assert.strictEqual(nextTheta, 2.2, 'Theta must clamp at +2.2');
  }
  highTheta = nextTheta;
}
assert(highTheta > 1.2, `High-performing trajectory must reach high theta (> 1.2), got ${highTheta}`);

// Struggling student (10 consecutive incorrect answers)
let lowTheta = 0.0;
for (let q = 1; q <= 10; q++) {
  const nextTheta = updateThetaEstimate(lowTheta, false, -0.5, q, 12);
  if (lowTheta > -2.2) {
    assert(nextTheta < lowTheta, `Incorrect answer must decrease theta at question ${q}: ${nextTheta} < ${lowTheta}`);
  } else {
    assert.strictEqual(nextTheta, -2.2, 'Theta must clamp at -2.2');
  }
  lowTheta = nextTheta;
}
assert(lowTheta < -1.2, `Struggling trajectory must reach low theta (< -1.2), got ${lowTheta}`);

// Clamp invariant within [-2.2, +2.2]
const extremePositive = updateThetaEstimate(2.2, true, -2.0, 1, 12);
assert(extremePositive <= 2.2, `Theta must be clamped at +2.2, got ${extremePositive}`);
const extremeNegative = updateThetaEstimate(-2.2, false, 2.0, 1, 12);
assert(extremeNegative >= -2.2, `Theta must be clamped at -2.2, got ${extremeNegative}`);

// NaN resilience
const nanRecovery = updateThetaEstimate(NaN, true, NaN, NaN, NaN);
assert(Number.isFinite(nanRecovery), 'updateThetaEstimate must safely recover from NaN');
console.log(`  ✔ [PASS] Ability updates strictly directional: correct trajectory theta=${highTheta.toFixed(2)}, incorrect theta=${lowTheta.toFixed(2)}; bounded in [-2.2, 2.2]`);

// ── Check 5: Theta to JLPT Level Mapping Invariant ──────────────────────────────
console.log('\n▶ Check 5: Theta to JLPT Proficiency Level Classification...');

assert.strictEqual(mapThetaToJLPTLevel(-1.5), 'n5', 'theta -1.5 -> N5');
assert.strictEqual(mapThetaToJLPTLevel(-0.86), 'n5', 'theta -0.86 -> N5');
assert.strictEqual(mapThetaToJLPTLevel(-0.84), 'n4', 'theta -0.84 -> N4');
assert.strictEqual(mapThetaToJLPTLevel(-0.5), 'n4', 'theta -0.5 -> N4');
assert.strictEqual(mapThetaToJLPTLevel(-0.09), 'n3', 'theta -0.09 -> N3');
assert.strictEqual(mapThetaToJLPTLevel(0.3), 'n3', 'theta +0.3 -> N3');
assert.strictEqual(mapThetaToJLPTLevel(0.66), 'n2', 'theta +0.66 -> N2');
assert.strictEqual(mapThetaToJLPTLevel(1.0), 'n2', 'theta +1.0 -> N2');
assert.strictEqual(mapThetaToJLPTLevel(1.36), 'n1', 'theta +1.36 -> N1');
assert.strictEqual(mapThetaToJLPTLevel(2.0), 'n1', 'theta +2.0 -> N1');
assert.strictEqual(mapThetaToJLPTLevel(NaN), 'n5', 'theta NaN safely defaults to n5');
console.log('  ✔ [PASS] Discrete level thresholds verified: N5 (< -0.85), N4 (< -0.1), N3 (< 0.65), N2 (< 1.35), N1 (>= 1.35)');

// ── Check 6: Adaptive Question Selection & Result Synthesis ────────────────────
console.log('\n▶ Check 6: Question Selection & Final Diagnostic Result Synthesis...');

const mockPool = [
  { id: 'q1', stimulus: 'P1', targetJapanese: 'A1', options: ['A1', 'B1', 'C1', 'D1'], correctIndex: 0, level: 'n5', difficulty: -1.5, discrimination: 1.5, explanation: '', patterns: ['Partikel wa'], rootCause: '' },
  { id: 'q2', stimulus: 'P2', targetJapanese: 'A2', options: ['A2', 'B2', 'C2', 'D2'], correctIndex: 0, level: 'n4', difficulty: -0.6, discrimination: 1.5, explanation: '', patterns: ['Bentuk Te'], rootCause: '' },
  { id: 'q3', stimulus: 'P3', targetJapanese: 'A3', options: ['A3', 'B3', 'C3', 'D3'], correctIndex: 0, level: 'n3', difficulty: 0.2, discrimination: 1.5, explanation: '', patterns: ['Keigo Sonkeigo'], rootCause: '' },
  { id: 'q5', stimulus: 'P5', targetJapanese: 'A5', options: ['A5', 'B5', 'C5', 'D5'], correctIndex: 0, level: 'n2', difficulty: 0.9, discrimination: 1.5, explanation: '', patterns: ['Dokkai N2'], rootCause: '' },
  { id: 'q4', stimulus: 'P4', targetJapanese: 'A4', options: ['A4', 'B4', 'C4', 'D4'], correctIndex: 0, level: 'n1', difficulty: 1.6, discrimination: 1.5, explanation: '', patterns: ['Dokkai N1'], rootCause: '' },
];

// When theta is low (-1.5), selectNextCATQuestion should select from low difficulty items
const selectedLow = selectNextCATQuestion(mockPool, new Set(), -1.5);
assert(selectedLow !== null, 'Must select question');
assert(selectedLow.difficulty <= 0.2, `At low theta (-1.5), selected item must be easy: got b=${selectedLow.difficulty}`);

// When theta is high (+1.6), selectNextCATQuestion should select from high difficulty items
const selectedHigh = selectNextCATQuestion(mockPool, new Set(), 1.6);
assert(selectedHigh !== null, 'Must select question');
assert(selectedHigh.difficulty >= 0.0, `At high theta (+1.6), selected item must be challenging: got b=${selectedHigh.difficulty}`);

// Final result generation resilience
const mockAnswered = [
  { question: mockPool[0], isCorrect: true },
  { question: mockPool[1], isCorrect: true },
  { question: mockPool[2], isCorrect: false },
];
const result = finalizeCATResult(mockAnswered, 0.1);
assert.strictEqual(result.estimatedLevel, 'n3', 'Final theta 0.1 must yield N3');
assert.strictEqual(result.correctCount, 2, '2 correct answers');
assert.strictEqual(result.totalCount, 3, '3 total answers');
assert(result.sem > 0 && result.sem <= 1.0, 'Valid SEM');
assert(result.strengths.length > 0, 'Strengths populated');
assert(result.weaknesses.length > 0, 'Weaknesses populated');

// Null/empty resilience
const emptyResult = finalizeCATResult([], NaN);
assert.strictEqual(emptyResult.estimatedLevel, 'n5', 'Empty answered with NaN theta defaults safely to N5');
console.log(`  ✔ [PASS] Adaptive question selection matches ability, and finalizeCATResult synthesizes strengths, weaknesses, and track recommendation`);

console.log('\n══════════════════════════════════════════════════════════════════════════════');
console.log('🎉 SIKLUS V PASS 4 VERIFICATION COMPLETE: ALL 6 CHECKS PASSED (100% GREEN)');
console.log('══════════════════════════════════════════════════════════════════════════════');
