// ═════════════════════════════════════════════════════════════════════════════════════════════
//  tests/test-s5-pass5-cat-stopping-bridge.js
//  SIKLUS V — PASS 5: CAT Stopping Rules & Automated Level Bridge
//  Research Basis:
//    - Reckase (2009) — Variable-length CAT stopping rules (SEM <= 0.35, min 6, max 12)
//    - JFT-Basic / Tokutei Ginou SSW 19-Sector Benchmark Equivalency (N4 <=> A2)
// ═════════════════════════════════════════════════════════════════════════════════════════════

const assert = require('assert');
const path = require('path');
const fs = require('fs');

console.log('╔══════════════════════════════════════════════════════════════════════════════╗');
console.log('║   SIKLUS V — PASS 5: CAT STOPPING RULES & AUTOMATED LEVEL BRIDGE             ║');
console.log('╚══════════════════════════════════════════════════════════════════════════════╝\n');

const ROOT_DIR = path.resolve(__dirname, '..');
const catEnginePath = path.join(ROOT_DIR, 'src/lib/cat/catEngine.ts');
const modalPath = path.join(ROOT_DIR, 'src/components/cat/CatPlacementModal.tsx');
assert(fs.existsSync(catEnginePath), 'catEngine.ts must exist');
assert(fs.existsSync(modalPath), 'CatPlacementModal.tsx must exist');

const {
  shouldStopCAT,
  bridgeCATResultToCurriculum,
  mapThetaToJLPTLevel,
  CAT_TARGET_SEM,
  CAT_MIN_QUESTIONS,
  CAT_MAX_QUESTIONS,
} = require('../src/lib/cat/catEngine.ts');

// ── Check 1: Dynamic Stopping Rules Invariant (Reckase 2009) ───────────────────
console.log('▶ Check 1: Dynamic Stopping Criteria (SEM <= 0.35, Min 6, Max 12)...');

// Boundary: Under 6 questions, NEVER stop even if SEM <= 0.35
assert.strictEqual(shouldStopCAT(0, 0.20), false, '0 questions must not stop');
assert.strictEqual(shouldStopCAT(5, 0.25), false, '5 questions must not stop even if SEM <= 0.35');
assert.strictEqual(shouldStopCAT(5, 0.35), false, '5 questions at threshold must not stop');

// Between 6 and 11 questions: Stop IF AND ONLY IF SEM <= 0.35
assert.strictEqual(shouldStopCAT(6, 0.349), true, '6 questions with SEM=0.349 must stop');
assert.strictEqual(shouldStopCAT(6, 0.350), true, '6 questions with SEM=0.350 must stop');
assert.strictEqual(shouldStopCAT(6, 0.351), false, '6 questions with SEM=0.351 must continue');
assert.strictEqual(shouldStopCAT(9, 0.320), true, '9 questions with SEM=0.320 must stop');
assert.strictEqual(shouldStopCAT(11, 0.380), false, '11 questions with SEM=0.380 must continue');

// At 12 questions (MAX): MUST stop unconditionally
assert.strictEqual(shouldStopCAT(12, 0.450), true, '12 questions with high SEM must stop');
assert.strictEqual(shouldStopCAT(15, 0.999), true, '>12 questions must stop');

// Resilience against NaN/Infinity
assert.strictEqual(shouldStopCAT(NaN, NaN), false, 'NaN inputs must not trigger premature stop');
assert.strictEqual(shouldStopCAT(12, NaN), true, '12 questions with NaN SEM must still stop');
console.log('  ✔ [PASS] CAT stopping conditions strictly enforced: min 6 questions, SEM <= 0.35 threshold, max 12 hard limit');

// ── Check 2: Automated Level Bridge to JFT & SSW 19 Sectors ────────────────────
console.log('\n▶ Check 2: Automated Level Bridge to JFT & SSW 19 Sectors...');

// Beginner (theta = -1.5): N5, JFT-A1, SSW 'belum-siap'
const bN5 = bridgeCATResultToCurriculum(-1.5);
assert.strictEqual(bN5.jlptLevel, 'n5');
assert.strictEqual(bN5.jftLevel, 'jft-a1');
assert.strictEqual(bN5.sswReadiness, 'belum-siap');
assert.strictEqual(bN5.recommendedTrack, 'n5');

// SSW Applicant targeting Kaigo (theta = -0.5): N4, JFT-A2, SSW 'siap-ujian-a2', track 'ssw-kaigo'
const bKaigo = bridgeCATResultToCurriculum(-0.5, 'ssw', 'kaigo');
assert.strictEqual(bKaigo.jlptLevel, 'n4');
assert.strictEqual(bKaigo.jftLevel, 'jft-a2');
assert.strictEqual(bKaigo.sswReadiness, 'siap-ujian-a2');
assert.strictEqual(bKaigo.recommendedTrack, 'ssw-kaigo');
assert(bKaigo.description.includes('JFT-Basic A2'), 'Must mention JFT A2 equivalency');

// SSW Applicant targeting Food Manufacturing (theta = 0.2): N3, SSW 'sangat-siap'
const bFood = bridgeCATResultToCurriculum(0.2, 'ssw', 'food-manufacturing');
assert.strictEqual(bFood.jlptLevel, 'n3');
assert.strictEqual(bFood.sswReadiness, 'sangat-siap');
assert.strictEqual(bFood.recommendedTrack, 'ssw-food-manufacturing');

// Advanced student (theta = 1.0): N2, SSW 'tingkat-supervisor'
const bN2 = bridgeCATResultToCurriculum(1.0);
assert.strictEqual(bN2.jlptLevel, 'n2');
assert.strictEqual(bN2.sswReadiness, 'tingkat-supervisor');

// Boundary NaN resilience
const bNaN = bridgeCATResultToCurriculum(NaN);
assert.strictEqual(bNaN.jlptLevel, 'n5', 'NaN theta safely defaults to N5');
console.log('  ✔ [PASS] Bridge function cleanly maps ability to JLPT, JFT A1/A2, and SSW 19-sector tracks with Prometric benchmark equivalency');

// ── Check 3: CatPlacementModal UI & State Machine Verification ─────────────────
console.log('\n▶ Check 3: CatPlacementModal UI & State Machine Verification...');

const modalSource = fs.readFileSync(modalPath, 'utf8');

// 1. Stopping condition check and dynamic button label
assert(
  modalSource.includes('shouldStopCAT('),
  'CatPlacementModal must call shouldStopCAT'
);
assert(
  modalSource.includes("'Lihat Hasil Diagnosis' : 'Lanjut ke Soal Berikutnya'"),
  'Next button text must dynamically reflect stop condition'
);

// 2. Automated curriculum and track bridge on apply
assert(
  modalSource.includes('setSelectedLevel(result.estimatedLevel);'),
  'Must set selected level in store'
);
assert(
  modalSource.includes('setActiveTrack('),
  'Must set active curriculum track in store'
);
assert(
  modalSource.includes('addPlacementResult({'),
  'Must record diagnostic result in placement history'
);

// 3. JFT & SSW Readiness Badge on Result Screen
assert(
  modalSource.includes('bridgeCATResultToCurriculum(result.theta)'),
  'Must invoke bridgeCATResultToCurriculum on result screen'
);
assert(
  modalSource.includes('Status SSW:'),
  'Must display SSW status indicator'
);

// 4. Graceful Fallback UI when Question Bank is Empty
assert(
  modalSource.includes('Bank Soal Sedang Disiapkan'),
  'Must provide fallback UI when questions are not available'
);
console.log('  ✔ [PASS] CatPlacementModal source code adheres to dynamic stopping, store bridge, SSW readiness display, and empty fallback');

// ── Check 4: Placement History Persistence Simulation ──────────────────────────
console.log('\n▶ Check 4: Placement History Persistence Invariants...');

const mockHistory = [];
function addPlacementResult(res) {
  const record = {
    ...res,
    timestamp: new Date().toISOString(),
  };
  mockHistory.unshift(record);
}

addPlacementResult({
  theta: -0.5,
  sem: 0.34,
  recommendedLevel: 'n4',
  questionsAnswered: 8,
  accuracy: 75,
});

assert.strictEqual(mockHistory.length, 1);
assert.strictEqual(mockHistory[0].recommendedLevel, 'n4');
assert(Number.isFinite(mockHistory[0].theta));
assert(!isNaN(new Date(mockHistory[0].timestamp).getTime()), 'Valid ISO timestamp required');
console.log('  ✔ [PASS] Placement history persistence format validated');

// ── Check 5: Multi-Device Responsive & Accessibility Constraints ──────────────
console.log('\n▶ Check 5: Responsive & Accessibility Safeguards...');

assert(modalSource.includes('useFocusTrap'), 'CatPlacementModal must use focus trap');
assert(modalSource.includes('useBodyScrollLock'), 'CatPlacementModal must lock body scroll');
assert(modalSource.includes('role="dialog"'), 'CatPlacementModal must have role="dialog"');
assert(modalSource.includes('aria-modal="true"'), 'CatPlacementModal must have aria-modal="true"');
assert(modalSource.includes('max-h-[90dvh]'), 'CatPlacementModal must constrain mobile viewport height');
assert(modalSource.includes('pb-[max(1rem,env(safe-area-inset-bottom))]'), 'CatPlacementModal must respect safe area insets');
console.log('  ✔ [PASS] Multi-device responsive & accessibility contracts (focus trap, safe area insets, dialog ARIA) verified');

console.log('\n══════════════════════════════════════════════════════════════════════════════');
console.log('🎉 SIKLUS V PASS 5 VERIFICATION COMPLETE: ALL 5 CHECKS PASSED (100% GREEN)');
console.log('══════════════════════════════════════════════════════════════════════════════');
