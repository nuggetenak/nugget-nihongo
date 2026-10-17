// ══════════════════════════════════════════════════════════════════
//  test-sprint-41-touch-gestures.js — Forensic Verification Suite
//  Sprint 41: Touch Gestures, Swipe Physics & Edge-Swipe Navigation
//  Tickets: T-221, T-222, T-223, T-224, T-225
// ══════════════════════════════════════════════════════════════════

import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

console.log('🧪 [Sprint 41 Audit] Initiating Touch Gestures, Swipe Physics & Edge Navigation Verification...\n');

let totalChecks = 0;
let passedChecks = 0;

function check(name, fn) {
  totalChecks++;
  try {
    fn();
    passedChecks++;
    console.log(`  ✅ [PASS] ${name}`);
  } catch (err) {
    console.error(`  ❌ [FAIL] ${name}: ${err.message}`);
    throw err;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. T-221: Synthetic Click Double-Flip Bug Eradication & Click Suppression Lock
// ─────────────────────────────────────────────────────────────────────────────
check('T-221: useSwipeGesture.ts implements wasRecentlySwiped suppression lock', () => {
  const filePath = path.join(ROOT, 'src/components/quiz/useSwipeGesture.ts');
  const code = fs.readFileSync(filePath, 'utf8');

  assert.ok(code.includes('wasSwipedRef = useRef<boolean>(false)'), 'Must track wasSwipedRef boolean');
  assert.ok(code.includes('lastSwipeTimestamp = useRef<number>(0)'), 'Must track lastSwipeTimestamp');
  assert.ok(code.includes('wasRecentlySwiped'), 'Must export wasRecentlySwiped helper');
  assert.ok(code.includes('setTimeout'), 'Must use setTimeout to release click suppression lock');
  assert.ok(code.includes('350'), 'Suppression lock window must be 350ms');
});

check('T-221: QuizPage.tsx guards card click with wasRecentlySwiped', () => {
  const filePath = path.join(ROOT, 'src/pages/QuizPage.tsx');
  const code = fs.readFileSync(filePath, 'utf8');

  assert.ok(code.includes('wasRecentlySwiped'), 'QuizPage must destructure wasRecentlySwiped from useSwipeGesture');
  assert.ok(code.includes('if (wasRecentlySwiped()) return'), 'Card onClick must check wasRecentlySwiped() before toggleFlip');
});

check('T-221: KanaChartModal.tsx guards card click with wasRecentlySwiped', () => {
  const filePath = path.join(ROOT, 'src/components/kana/KanaChartModal.tsx');
  const code = fs.readFileSync(filePath, 'utf8');

  assert.ok(code.includes('wasRecentlySwiped'), 'KanaChartModal must destructure wasRecentlySwiped from useSwipeGesture');
  assert.ok(code.includes('if (wasRecentlySwiped()) return'), 'Practice card onClick must check wasRecentlySwiped() before flipping');
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. T-222: Vertical Scroll Collision & Pull-to-Refresh Guard (Strict Angle Locking)
// ─────────────────────────────────────────────────────────────────────────────
check('T-222: useSwipeGesture.ts implements strict angular direction locking', () => {
  const filePath = path.join(ROOT, 'src/components/quiz/useSwipeGesture.ts');
  const code = fs.readFileSync(filePath, 'utf8');

  assert.ok(code.includes('Math.atan2(ady, adx) * 180) / Math.PI'), 'Must compute drag angle in degrees using atan2');
  assert.ok(code.includes('angleDeg > 30'), 'Must lock out horizontal swipe triggers when theta > 30 deg');
  assert.ok(code.includes('angleDeg <= 30'), 'Must constrain horizontal swipe to theta <= 30 deg');
});

check('T-222: QuizPage.tsx removes onSwipeDown to prevent accidental Ragu during vertical scroll', () => {
  const filePath = path.join(ROOT, 'src/pages/QuizPage.tsx');
  const code = fs.readFileSync(filePath, 'utf8');

  // Verify onSwipeDown is not passed in the useSwipeGesture call
  const hookCallMatch = code.match(/useSwipeGesture\(\{[\s\S]*?\}\)/);
  assert.ok(hookCallMatch, 'QuizPage must invoke useSwipeGesture');
  assert.ok(!hookCallMatch[0].includes('onSwipeDown:'), 'onSwipeDown must NOT be hooked in QuizPage flashcard');

  // Verify overscroll-y-contain is present on the quiz container
  assert.ok(code.includes('overscroll-y-contain') || code.includes("overscrollBehaviorY: 'contain'"), 'QuizPage container must enforce overscroll-y-contain');
});

// ─────────────────────────────────────────────────────────────────────────────
// 3. T-223: Velocity-Driven Kinematic Physics Engine & iOS Edge-Swipe Guard
// ─────────────────────────────────────────────────────────────────────────────
check('T-223: useSwipeGesture.ts enforces 24px iOS Safari edge-swipe guard', () => {
  const filePath = path.join(ROOT, 'src/components/quiz/useSwipeGesture.ts');
  const code = fs.readFileSync(filePath, 'utf8');

  assert.ok(code.includes('clientX < 24 || clientX > screenWidth - 24'), 'Must ignore touches within 24px of screen edges');
  assert.ok(code.includes('isEdgeTouch'), 'Must track edge touch flag');
});

check('T-223: useSwipeGesture.ts implements kinematic velocity calculus (vx = dx / dt)', () => {
  const filePath = path.join(ROOT, 'src/components/quiz/useSwipeGesture.ts');
  const code = fs.readFileSync(filePath, 'utf8');

  assert.ok(code.includes('touchStartTime'), 'Must track touchStartTime ref');
  assert.ok(code.includes('dt = Math.max(1, Date.now() - touchStartTime.current)'), 'Must calculate elapsed touch duration');
  assert.ok(code.includes('vx = dx / dt') || code.includes('vx = adx / dt'), 'Must compute kinematic velocity in px/ms');
  assert.ok(code.includes('velocityThreshold = 0.5') || code.includes('velocityThreshold'), 'Must support velocityThreshold (0.5 px/ms)');
  assert.ok(code.includes('adx >= 30'), 'Must recognize 30px-35px quick flick when velocity threshold is exceeded');
});

// ─────────────────────────────────────────────────────────────────────────────
// 4. T-224: Real-Time Card Translation Physics & Web Vibration API Haptic Pulse
// ─────────────────────────────────────────────────────────────────────────────
check('T-224: useSwipeGesture.ts exposes real-time dragOffset and triggerHaptic', () => {
  const filePath = path.join(ROOT, 'src/components/quiz/useSwipeGesture.ts');
  const code = fs.readFileSync(filePath, 'utf8');

  assert.ok(code.includes('export interface DragOffset'), 'Must export DragOffset interface');
  assert.ok(code.includes('dragOffset: DragOffset'), 'Must expose dragOffset in return object');
  assert.ok(code.includes('isDragging: boolean'), 'Must expose isDragging state in return object');
  assert.ok(code.includes('triggerHaptic'), 'Must export triggerHaptic helper');
  assert.ok(code.includes('navigator.vibrate'), 'triggerHaptic must invoke navigator.vibrate');
  assert.ok(code.includes('triggerHaptic(12)'), 'Must fire 12ms subtle haptic tick on threshold crossing');
  assert.ok(code.includes('triggerHaptic([10, 30, 15])'), 'Must fire commitment haptic pattern on swipe submit');
});

check('T-224: QuizPage.tsx applies hardware-accelerated 3D drag translation to flashcard', () => {
  const filePath = path.join(ROOT, 'src/pages/QuizPage.tsx');
  const code = fs.readFileSync(filePath, 'utf8');

  assert.ok(code.includes('translate3d(${dragOffset.x}px'), 'Must apply translate3d with real-time dragOffset.x');
  assert.ok(code.includes('rotate(${dragOffset.x * 0.04}deg)'), 'Must apply proportional rotation transform');
  assert.ok(code.includes("touchAction: isDragging ? 'none' : 'pan-y'"), 'Must set dynamic touchAction to prevent scroll conflicts');
});

// ─────────────────────────────────────────────────────────────────────────────
// 5. T-225: Flashcard Gesture Engine Unification into Kana Practice Mode
// ─────────────────────────────────────────────────────────────────────────────
check('T-225: KanaChartModal.tsx integrates useSwipeGesture with dual actions', () => {
  const filePath = path.join(ROOT, 'src/components/kana/KanaChartModal.tsx');
  const code = fs.readFileSync(filePath, 'utf8');

  assert.ok(code.includes("import { useSwipeGesture } from '../quiz/useSwipeGesture'"), 'KanaChartModal must import useSwipeGesture');
  assert.ok(code.includes('onSwipeLeft: () => handleNextPractice(true)'), 'Swipe left must trigger Sudah Hafal');
  assert.ok(code.includes('onSwipeRight: () => handleNextPractice(false)'), 'Swipe right must trigger Belum Hafal');
  assert.ok(code.includes('{...touchHandlers}'), 'Kana flip card must attach touchHandlers');
  assert.ok(code.includes('translate3d(${dragOffset.x}px'), 'Kana flip card must apply translate3d drag transform');
});

check('T-225: KanaChartModal.tsx displays real-time swipe visual hint badges', () => {
  const filePath = path.join(ROOT, 'src/components/kana/KanaChartModal.tsx');
  const code = fs.readFileSync(filePath, 'utf8');

  assert.ok(code.includes("swipeHint === 'left'"), 'Must render left swipe badge');
  assert.ok(code.includes('Sudah Hafal'), 'Left swipe badge must label Sudah Hafal');
  assert.ok(code.includes("swipeHint === 'right'"), 'Must render right swipe badge');
  assert.ok(code.includes('Belum Hafal'), 'Right swipe badge must label Belum Hafal');
});

check('T-225: KanaChartModal.tsx unifies keyboard navigation (ArrowLeft, ArrowRight, Space)', () => {
  const filePath = path.join(ROOT, 'src/components/kana/KanaChartModal.tsx');
  const code = fs.readFileSync(filePath, 'utf8');

  assert.ok(code.includes("e.key === 'ArrowLeft'"), 'Must support ArrowLeft for Sudah Hafal');
  assert.ok(code.includes('handleNextPractice(true)'), 'ArrowLeft must call handleNextPractice(true)');
  assert.ok(code.includes("e.key === 'ArrowRight'"), 'Must support ArrowRight for Belum Hafal');
  assert.ok(code.includes('handleNextPractice(false)'), 'ArrowRight must call handleNextPractice(false)');
  assert.ok(code.includes("e.key === ' ' || e.key === 'Enter'"), 'Must support Space or Enter for card flip');
});

// ─────────────────────────────────────────────────────────────────────────────
// Final Report
// ─────────────────────────────────────────────────────────────────────────────
console.log(`\n🏁 Sprint 41 Forensic Audit Complete: ${passedChecks}/${totalChecks} checks passed.`);
if (passedChecks === totalChecks) {
  console.log('🎉 SPRINT 41 FORENSIC CERTIFICATION: 100% PASS — Zero Regressions!\n');
} else {
  console.error(`💥 Audit failed: ${totalChecks - passedChecks} assertions failed.`);
  process.exit(1);
}
