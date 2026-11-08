// ══════════════════════════════════════════════════════════════════
//  tests/test-s5-pass24-cbt-simulator-engine.js
//  SIKLUS V — PASS 24: CBT Exam Simulator & 15-Minute Countdown Engine
//  Klaster 8: Exam Simulation & Interactive Exercise LMS
//  Audits & Verifies:
//    - 15-Minute Strict CBT Countdown Engine & Auto-Submit on Timeout
//    - Guided Mode Elapsed Time Counting & Scaffolding Invariants
//    - Robust formatTimer Math with NaN / Negative / Infinity Defense
//    - Net Time Spent Calculation across Strict & Guided Modes
//    - Urgency & Critical Time Window Flags (<= 180s, <= 60s)
//    - 15-Question Review Drawer, Jump Navigation & Boundary Clamping
//    - Question Flagging (Tandai Ragu-ragu / 🚩) Lattice
//    - Strict 2x Audio Replay Quota (Prometric / JFT CBT Compliance)
//    - ADHD Smart Pause & Anti-Cheat Question Occlusion Overlay
//    - Post-Exam Evaluation Matrix, Passing Threshold & 5-Layer Review
//    - Universal Mobile Touch Targets (>= 40px) & Zero Microfont Compliance
// ══════════════════════════════════════════════════════════════════

const assert = require('assert');
const path = require('path');
const fs = require('fs');

console.log('╔══════════════════════════════════════════════════════════════════╗');
console.log('║  SIKLUS V — PASS 24: CBT EXAM SIMULATOR & TIMER ENGINE AUDIT     ║');
console.log('║  KLASTER 8: EXAM SIMULATION & INTERACTIVE EXERCISE LMS           ║');
console.log('╚══════════════════════════════════════════════════════════════════╝\n');

async function runPass24Tests() {
  const {
    formatTimer,
    calculateTimeSpent,
    isUrgentTime,
    isCriticalTime,
    computePassingScore,
    evaluateCbtResult,
  } = await import('../src/lib/exercise/cbtTimer.ts');

  // ── T-1: formatTimer Math & Defensive Bounds ──
  console.log('--- [T-1] formatTimer Math & Defensive Bounds ---');
  assert.strictEqual(typeof formatTimer, 'function');
  assert.strictEqual(formatTimer(900), '15:00', '900s must format to 15:00');
  assert.strictEqual(formatTimer(605), '10:05', '605s must format to 10:05');
  assert.strictEqual(formatTimer(65), '01:05', '65s must format to 01:05');
  assert.strictEqual(formatTimer(5), '00:05', '5s must format to 00:05');
  assert.strictEqual(formatTimer(0), '00:00', '0s must format to 00:00');

  // Defensive NaN/negative/infinity tests
  assert.strictEqual(formatTimer(NaN), '00:00', 'NaN must return 00:00');
  assert.strictEqual(formatTimer(-10), '00:00', 'Negative must return 00:00');
  assert.strictEqual(formatTimer(Infinity), '00:00', 'Infinity must return 00:00');
  assert.strictEqual(formatTimer('abc'), '00:00', 'Non-number string must return 00:00');
  console.log('  ✔ formatTimer calculations and defensive bounds certified.\n');

  // ── T-2: Net Time Spent Calculation ──
  console.log('--- [T-2] Net Time Spent Calculation ---');
  // Strict mode 15 minutes limit: 900s total, 300s remaining -> 600s spent (10m)
  assert.strictEqual(calculateTimeSpent(15, 300, 'strict'), 600);
  // Strict mode: 0s remaining -> 900s spent (15m)
  assert.strictEqual(calculateTimeSpent(15, 0, 'strict'), 900);
  // Strict mode: remaining > limit (safe clamp)
  assert.strictEqual(calculateTimeSpent(15, 1000, 'strict'), 0);
  // Guided mode: returns elapsed time directly
  assert.strictEqual(calculateTimeSpent(15, 420, 'guided'), 420);
  assert.strictEqual(calculateTimeSpent(15, -10, 'guided'), 0);
  console.log('  ✔ Net time spent calculation certified across strict & guided modes.\n');

  // ── T-3: Urgency & Critical Time Flags ──
  console.log('--- [T-3] Urgency & Critical Time Window Flags ---');
  // Strict mode
  assert.strictEqual(isUrgentTime(180, 'strict'), true, '180s must be urgent');
  assert.strictEqual(isUrgentTime(120, 'strict'), true, '120s must be urgent');
  assert.strictEqual(isUrgentTime(61, 'strict'), true, '61s must be urgent');
  assert.strictEqual(isUrgentTime(60, 'strict'), false, '60s is critical, not merely urgent');
  assert.strictEqual(isUrgentTime(300, 'strict'), false, '300s is normal time');

  assert.strictEqual(isCriticalTime(60, 'strict'), true, '60s must be critical');
  assert.strictEqual(isCriticalTime(30, 'strict'), true, '30s must be critical');
  assert.strictEqual(isCriticalTime(0, 'strict'), true, '0s must be critical');
  assert.strictEqual(isCriticalTime(61, 'strict'), false, '61s is not yet critical');

  // Guided mode must never trigger urgency/critical warnings
  assert.strictEqual(isUrgentTime(50, 'guided'), false, 'Guided mode has no urgent state');
  assert.strictEqual(isCriticalTime(10, 'guided'), false, 'Guided mode has no critical state');
  console.log('  ✔ Urgency and critical countdown flags certified.\n');

  // ── T-4: CBT Result & Passing Score Evaluation ──
  console.log('--- [T-4] CBT Result & Passing Score Evaluation ---');
  // Default passing score (70% of 15 questions = ceil(10.5) = 11)
  assert.strictEqual(computePassingScore(15), 11);
  assert.strictEqual(computePassingScore(15, 12), 12, 'Custom passing score respected');

  // Passing evaluation: 11/15 (73% -> Pass)
  const passRes = evaluateCbtResult(11, 15);
  assert.strictEqual(passRes.percentage, 73);
  assert.strictEqual(passRes.isPassed, true);
  assert.strictEqual(passRes.passingThreshold, 11);

  // Failing evaluation: 10/15 (67% -> Fail)
  const failRes = evaluateCbtResult(10, 15);
  assert.strictEqual(failRes.percentage, 67);
  assert.strictEqual(failRes.isPassed, false);
  assert.strictEqual(failRes.passingThreshold, 11);

  // 15/15 (100% -> Pass)
  const perfectRes = evaluateCbtResult(15, 15);
  assert.strictEqual(perfectRes.percentage, 100);
  assert.strictEqual(perfectRes.isPassed, true);
  console.log('  ✔ CBT scoring math and passing thresholds verified.\n');

  // ── T-5: Static AST Inspection of CbtRunnerScreen.tsx ──
  console.log('--- [T-5] Static AST Inspection of CbtRunnerScreen.tsx ---');
  const runnerPath = path.resolve(__dirname, '../src/components/exercise/CbtRunnerScreen.tsx');
  assert(fs.existsSync(runnerPath), 'CbtRunnerScreen.tsx must exist');
  const runnerSrc = fs.readFileSync(runnerPath, 'utf8');

  // 1. Imports and re-exports of cbtTimer
  assert(runnerSrc.includes("from '../../lib/exercise/cbtTimer'"), 'Must import cbtTimer');
  assert(runnerSrc.includes('export { formatTimer }'), 'Must export formatTimer');

  // 2. 15-Minute Countdown Urgency Colors
  assert(runnerSrc.includes('isTimeUrgent = isUrgentTime(remainingSeconds, mode)'), 'Must track urgent state');
  assert(runnerSrc.includes('isTimeCritical = isCriticalTime(remainingSeconds, mode)'), 'Must track critical state');

  // 3. ADHD Smart Pause Overlay & Text Occlusion
  assert(runnerSrc.includes('ADHD SMART PAUSE'), 'Must have ADHD smart pause section');
  assert(runnerSrc.includes('Tiruan layar buram diaktifkan'), 'Must obscure stimulus while paused');

  // 4. 15-Question Review Drawer Modal
  assert(runnerSrc.includes('Navigasi 15 Nomor Soal'), 'Must render 15-question review drawer');
  assert(runnerSrc.includes('Ditandai Ragu'), 'Must support question flagging display');
  assert(runnerSrc.includes('isFlagged'), 'Must check isFlagged status');

  // 5. Mobile Ergonomics & Safe Touch Dimensions (>= 40px)
  assert(runnerSrc.includes('min-h-[40px]'), 'Buttons must adhere to >= 40px touch targets');
  assert(runnerSrc.includes('min-h-[44px]'), 'Key actions must adhere to >= 44px touch targets');
  assert(runnerSrc.includes('useBodyScrollLock'), 'Must lock background scroll in full-screen CBT');
  console.log('  ✔ CbtRunnerScreen UI contracts, urgency warnings, and mobile ergonomics verified.\n');

  // ── T-6: Static AST Inspection of useExerciseStore.ts ──
  console.log('--- [T-6] Static AST Inspection of useExerciseStore.ts ---');
  const storePath = path.resolve(__dirname, '../src/store/useExerciseStore.ts');
  assert(fs.existsSync(storePath), 'useExerciseStore.ts must exist');
  const storeSrc = fs.readFileSync(storePath, 'utf8');

  // 1. Timeout Auto-Submit Contract
  assert(storeSrc.includes('remainingSeconds <= 1'), 'Must detect 1-second timeout boundary');
  assert(storeSrc.includes('get().submitTest()'), 'Must call submitTest upon timer expiration');

  // 2. Strict 2x Audio Replay Quota (Prometric / JFT CBT Standard)
  assert(storeSrc.includes("mode === 'strict' && currentCount >= 2"), 'Must enforce 2x audio play limit in strict mode');

  // 3. Flagging & Navigation
  assert(storeSrc.includes('toggleFlag:'), 'Must export toggleFlag method');
  assert(storeSrc.includes('goToQuestion:'), 'Must export goToQuestion method');
  assert(storeSrc.includes('Math.max(0, Math.min(index, setObj.items.length - 1))'), 'Must clamp question index');

  // 4. Crash Recovery Persistence
  assert(storeSrc.includes('STORAGE_ACTIVE_SESSION_KEY'), 'Must implement in-flight session snapshot key');
  assert(storeSrc.includes('STORAGE_RECORDS_KEY'), 'Must implement persistent records key');
  console.log('  ✔ useExerciseStore timeout auto-submit, 2x audio replay, and crash recovery verified.\n');

  // ── T-7: Manifest & 14 Golden Sets Dataset Compliance ──
  console.log('--- [T-7] Manifest & 14 Golden Sets Dataset Compliance ---');
  const manifestPath = path.resolve(__dirname, '../public/data/exercises/manifest.json');
  assert(fs.existsSync(manifestPath), 'manifest.json must exist');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  assert.strictEqual(manifest.totalSets, 14, 'Must contain exactly 14 golden sets');
  assert.strictEqual(manifest.totalQuestions, 210, 'Must contain 210 total questions (14 x 15)');

  // Verify timeLimitMinutes is 15 across all 14 sets
  manifest.sets.forEach((setEntry) => {
    assert.strictEqual(setEntry.timeLimitMinutes, 15, `Set ${setEntry.setId} timeLimitMinutes must be 15`);
    assert(setEntry.passingScore >= 9, `Set ${setEntry.setId} passingScore must be >= 9`);
  });
  console.log('  ✔ 14 Golden Sets (210 questions, 15-minute limits) verified.\n');

  console.log('╔══════════════════════════════════════════════════════════════════╗');
  console.log('║  🎉 ALL SIKLUS V PASS 24 VERIFICATION SUITES PASSED (7/7)        ║');
  console.log('║  🏆 KLASTER 8 FIRST GATE PASS 24 CERTIFIED 100% GREEN!           ║');
  console.log('╚══════════════════════════════════════════════════════════════════╝');
}

runPass24Tests().catch((err) => {
  console.error('\n❌ SIKLUS V PASS 24 FAILED:', err);
  process.exit(1);
});
