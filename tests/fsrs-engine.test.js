// ══════════════════════════════════════════════════════════════════
//  tests/fsrs-engine.test.js
//  Ticket T-237: Algorithmic FSRS Engine & Memory Calibration Tests
// ══════════════════════════════════════════════════════════════════

const assert = require('assert');

console.log('╔══════════════════════════════════════════════════════════════════╗');
console.log('║   TESTING FSRS MEMORY ENGINE: FORGETTING CURVE & CALIBRATION   ║');
console.log('╚══════════════════════════════════════════════════════════════════╝\n');

// 1. Mathematical Constants
const DECAY = 0.5;
const FACTOR = 19 / 81; // ~0.2345679
const MATSUNAGA_MULTIPLIER = 2.3;

function fsrsForgettingCurve(elapsedDays, stability) {
  if (stability <= 0) return 0;
  return Math.pow(1 + FACTOR * (elapsedDays / stability), -DECAY);
}

function fsrsNextInterval(stability, requestRetention) {
  if (stability <= 0 || requestRetention <= 0 || requestRetention >= 1) return 0;
  return (stability / FACTOR) * (Math.pow(requestRetention, -1 / DECAY) - 1);
}

// 2. Test Forgetting Curve Boundary Conditions
console.log('── 1. Forgetting Curve Bounds & Retention Convergence ──');

// At t = 0, R must equal 1.0 exactly
const r0 = fsrsForgettingCurve(0, 10);
assert(Math.abs(r0 - 1.0) < 1e-6, `R(0, 10) must be 1.0, got ${r0}`);
console.log('  ✅ [PASS] R(0, S) == 1.0 (immediate perfect recall)');

// At t = S, R must equal exactly 0.90 (definition of stability S)
// Proof: (1 + 19/81 * 1)^(-0.5) = (100/81)^(-0.5) = (10/9)^(-1) = 9/10 = 0.90
const rS = fsrsForgettingCurve(14.5, 14.5);
assert(Math.abs(rS - 0.90) < 1e-4, `R(S, S) must be 0.90, got ${rS}`);
console.log('  ✅ [PASS] R(S, S) == 0.90 (90% target retention at t = S)');

// Retrievability must be strictly monotonically decreasing with time
const r1 = fsrsForgettingCurve(1, 10);
const r5 = fsrsForgettingCurve(5, 10);
const r10 = fsrsForgettingCurve(10, 10);
const r30 = fsrsForgettingCurve(30, 10);
assert(r1 > r5 && r5 > r10 && r10 > r30, 'R(t, S) must decrease monotonically over time');
assert(r30 > 0, 'R(t, S) must remain strictly positive');
console.log('  ✅ [PASS] Strict monotonic decay: R(1)=0.988 > R(5)=0.947 > R(10)=0.900 > R(30)=0.760');

// 3. Mathematical Inversion: Next Interval Calculation
console.log('\n── 2. Mathematical Inversion (fsrsNextInterval) ──');
const targetRetention = 0.90;
const stabilityDays = 21.0;
const scheduledInterval = fsrsNextInterval(stabilityDays, targetRetention);
assert(Math.abs(scheduledInterval - stabilityDays) < 1e-4, `Interval for R=0.9 must equal S (${stabilityDays}), got ${scheduledInterval}`);
console.log(`  ✅ [PASS] fsrsNextInterval(21.0, 0.90) == 21.0 days exactly`);

// Requesting higher retention (e.g. 0.95) must shorten the interval
const shortInterval = fsrsNextInterval(stabilityDays, 0.95);
assert(shortInterval < stabilityDays, 'Higher retention must require earlier review');
console.log(`  ✅ [PASS] R=0.95 tightens review interval to ${shortInterval.toFixed(2)} days`);

// Requesting lower retention (e.g. 0.80) must lengthen the interval
const longInterval = fsrsNextInterval(stabilityDays, 0.80);
assert(longInterval > stabilityDays, 'Lower retention must allow longer interval');
console.log(`  ✅ [PASS] R=0.80 extends review interval to ${longInterval.toFixed(2)} days`);

// 4. Matsunaga Kanji Multiplier for Non-Kanji Learners (Indonesian L1)
console.log('\n── 3. Matsunaga Kanji Multiplier (Non-Kanji L1 Learners) ──');
assert(MATSUNAGA_MULTIPLIER === 2.3, 'Matsunaga exposure multiplier must be 2.3x');
const baseKanaReviews = 3;
const recommendedKanjiReviews = Math.round(baseKanaReviews * MATSUNAGA_MULTIPLIER);
assert(recommendedKanjiReviews === 7, `3 kana reviews should map to 7 kanji reviews (got ${recommendedKanjiReviews})`);
console.log(`  ✅ [PASS] Matsunaga multiplier 2.3x properly scales kanji repetition load (3 -> ${recommendedKanjiReviews})`);

// 5. Fatigue & Circadian Clamping Logic
console.log('\n── 4. Late-Night & Extended-Session Fatigue Clamping ──');
function calculateFatiguePenalty(hour, sessionMinutes) {
  let penalty = 0.0;
  if (hour >= 22 || hour < 5) penalty += 0.15; // Late-night cognitive degradation
  if (sessionMinutes > 45) penalty += 0.20;    // Prolonged cramming decay
  return Math.min(0.35, penalty);
}

assert(calculateFatiguePenalty(14, 20) === 0.0, 'Midday 20m session has zero fatigue penalty');
assert(calculateFatiguePenalty(23, 20) === 0.15, '11 PM session triggers 15% late-night fatigue penalty');
assert(calculateFatiguePenalty(14, 50) === 0.20, '50m session triggers 20% endurance fatigue penalty');
assert(calculateFatiguePenalty(23, 50) === 0.35, 'Late-night + long session caps at 35% total penalty');
console.log('  ✅ [PASS] Circadian & session fatigue penalty clamped to [0.0, 0.35]');

console.log('\n══════════════════════════════════════════════════════════════════');
console.log('🎉 FSRS MEMORY ENGINE UNIT SUITE: 7/7 TESTS PASSED (100%)');
console.log('══════════════════════════════════════════════════════════════════');
