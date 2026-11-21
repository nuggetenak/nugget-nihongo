// ══════════════════════════════════════════════════════════════════
//  test-s9-pass3-e2e-kebun-fsrs.js
//  Siklus IX Pass 3: Kebun Memori & FSRS v4.5 Flashcard Review Suite
//  Verifies FSRS forgetting curve math, Matsunaga 2.3x multiplier,
//  due queue synchronization, garden botanical lifecycle, and UI detox.
// ══════════════════════════════════════════════════════════════════

import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

console.log('╔══════════════════════════════════════════════════════════════════╗');
console.log('║   SIKLUS IX PASS 3: KEBUN MEMORI & FSRS v4.5 VERIFICATION       ║');
console.log('║   Suite 205 | Mathematical Retention, Garden Metaphor & UI Detox ║');
console.log('╚══════════════════════════════════════════════════════════════════╝\n');

let passCount = 0;
const totalChecks = 6;

// ── Check 1: FSRS Memory Retrievability, Inverse Interval Math & Defense ────
console.log('📋 Check 1: FSRS Forgetting Curve & Inverse Interval Retention Math');
{
  const mathPath = path.join(ROOT, 'src/lib/fsrs/math.ts');
  assert(fs.existsSync(mathPath), 'math.ts must exist');

  const {
    fsrsForgettingCurve,
    fsrsNextInterval,
    calculateFSRSReview,
    fsrsIsCardDue,
  } = await import('../src/lib/fsrs/math.ts');

  // Mathematical definition: at elapsed t = 0, R = 1.0 (100%)
  assert.strictEqual(fsrsForgettingCurve(0, 10), 1.0, 'R(0, S) must equal 1.0');

  // Mathematical definition: at elapsed t = S, R = 0.9 (90% target retention)
  const rAtS = fsrsForgettingCurve(10, 10);
  assert.ok(
    Math.abs(rAtS - 0.9) < 0.001,
    `R(S, S) must equal 0.9 within float tolerance, got ${rAtS}`
  );

  // Inverse relationship: interval for requestRetention 0.9 must equal S
  const intervalAt09 = fsrsNextInterval(10, 0.9);
  assert.ok(
    Math.abs(intervalAt09 - 10) < 0.01,
    `Next interval for R=0.9 must equal stability S (10), got ${intervalAt09}`
  );

  // Hardened boundary tests: negative or NaN elapsed days must return 1.0
  assert.strictEqual(fsrsForgettingCurve(-5, 10), 1.0, 'Negative elapsed days must yield 1.0');
  assert.strictEqual(fsrsForgettingCurve(NaN, 10), 1.0, 'NaN elapsed days must yield 1.0');
  assert.strictEqual(fsrsForgettingCurve(5, 0), 0, 'Zero or negative stability must yield 0');

  // Defensive execution of calculateFSRSReview with undefined/null card
  const safeReview = calculateFSRSReview(undefined, 3);
  assert.ok(Number.isFinite(safeReview.stability), 'Stability must be finite for undefined card');
  assert.ok(Number.isFinite(safeReview.difficulty), 'Difficulty must be finite for undefined card');
  assert.strictEqual(safeReview.reps, 1, 'Reps must increment to 1');

  // fsrsIsCardDue checks
  assert.strictEqual(fsrsIsCardDue(null), false, 'Null card is not due');
  assert.strictEqual(fsrsIsCardDue({}), true, 'Card without due timestamp is immediately due');
  assert.strictEqual(
    fsrsIsCardDue({ due: new Date(Date.now() - 10000).toISOString() }),
    true,
    'Past due date is due'
  );
  assert.strictEqual(
    fsrsIsCardDue({ due: new Date(Date.now() + 86400000 * 5).toISOString() }),
    false,
    'Future due date is not due'
  );

  console.log('  ✅ Check 1 Passed: Forgetting curve R(t, S), inverse interval & null defense verified.');
  passCount++;
}

// ── Check 2: Matsunaga 2.3x Kanji Exposure Scaling & Sleep Invariant ─────────
console.log('\n📋 Check 2: Matsunaga 2.3x Kanji Prior & Sleep-Consolidation Invariant');
{
  const { calculateFSRSReview, MATSUNAGA_MULTIPLIER } = await import('../src/lib/fsrs/math.ts');

  assert.strictEqual(MATSUNAGA_MULTIPLIER, 2.3, 'Matsunaga multiplier must be exactly 2.3');

  const baseCard = {
    due: new Date().toISOString(),
    stability: 8.0,
    difficulty: 5.0,
    elapsed_days: 0,
    scheduled_days: 8,
    reps: 3,
    lapses: 0,
    state: 2,
    last_review: new Date(Date.now() - 86400000 * 8).toISOString(),
  };

  const kanaReview = calculateFSRSReview(baseCard, 3, { isKanji: false });
  const kanjiReview = calculateFSRSReview(baseCard, 3, { isKanji: true });

  assert.ok(
    kanjiReview.stability < kanaReview.stability,
    `Kanji stability (${kanjiReview.stability}) must be dampened relative to kana (${kanaReview.stability})`
  );

  // Lapse and intra-session relearning
  const lapseCard = calculateFSRSReview(baseCard, 1);
  assert.strictEqual(lapseCard.state, 3, 'Lapse on established card must enter Relearning state 3');
  assert.strictEqual(lapseCard.scheduled_days, 1, 'Lapse scheduled_days must reset to 1 day');

  // Immediate intra-session retry (elapsed < 1)
  const intraSession = calculateFSRSReview(lapseCard, 3);
  assert.strictEqual(intraSession.state, 2, 'Graduated back to Review state 2');
  assert.strictEqual(
    intraSession.scheduled_days,
    1,
    'Intra-session same-day rehearsal must remain at 1 day for sleep consolidation'
  );

  console.log('  ✅ Check 2 Passed: Matsunaga 2.3x exposure scaling & sleep-consolidation invariant verified.');
  passCount++;
}

// ── Check 3: KebunPage FSRS Due Synchronization & Urgency Ordering ──────────
console.log('\n📋 Check 3: KebunPage FSRS Due Synchronization & Urgency Ordering');
{
  const kebunPath = path.join(ROOT, 'src/pages/KebunPage.tsx');
  assert(fs.existsSync(kebunPath), 'KebunPage.tsx must exist');
  const code = fs.readFileSync(kebunPath, 'utf8');

  // Must import fsrsIsCardDue for accurate due synchronization
  assert.ok(
    code.includes('fsrsIsCardDue'),
    'KebunPage must import and use fsrsIsCardDue for reliable due detection'
  );

  // Must calculate isDue with fsrsIsCardDue
  assert.ok(
    code.includes('const isDue = fsrsIsCardDue(c, now);'),
    'KebunPage must check card due status using canonical fsrsIsCardDue'
  );

  // Must sort dueCards by urgency
  assert.ok(
    code.includes('dueCards.sort') && code.includes('timeA - timeB'),
    'KebunPage must sort due cards queue by earliest due date urgency'
  );

  // Must preserve accessibility and test contract strings
  assert.ok(code.includes('<span className="sr-only">Due</span>'), 'Must preserve sr-only Due contract');
  assert.ok(code.includes('<span className="sr-only">Kartu Due</span>'), 'Must preserve sr-only Kartu Due contract');
  assert.ok(code.includes('pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12'), 'Must maintain safe area cushion');

  console.log('  ✅ Check 3 Passed: Due cards synchronization, urgency sorting & test contracts verified.');
  passCount++;
}

// ── Check 4: Kanji Garden Botanical Metaphor & Capacity Invariants ──────────
console.log('\n📋 Check 4: Kanji Garden Botanical Metaphor & Capacity Invariants');
{
  const gardenPath = path.join(ROOT, 'src/lib/garden/gardenStore.ts');
  assert(fs.existsSync(gardenPath), 'gardenStore.ts must exist');

  const {
    STAGE_METADATA,
    MAX_GARDEN_CAPACITY,
    getPlantStageInfo,
    useGardenStore,
  } = await import('../src/lib/garden/gardenStore.ts');

  assert.strictEqual(STAGE_METADATA.length, 5, 'Garden must have 5 stages (0-4)');
  assert.strictEqual(MAX_GARDEN_CAPACITY, 36, 'Max garden capacity must be exactly 36');

  // Verify botanical stage progressions
  assert.strictEqual(getPlantStageInfo(0).label, 'Benih Ditabur');
  assert.strictEqual(getPlantStageInfo(1).label, 'Mulai Bertunas');
  assert.strictEqual(getPlantStageInfo(2).label, 'Tumbuh Batang');
  assert.strictEqual(getPlantStageInfo(3).label, 'Kuncup Bunga');
  assert.strictEqual(getPlantStageInfo(4).label, 'Mekar Sempurna');

  // Check store operations
  const store = useGardenStore.getState();
  assert.strictEqual(typeof store.waterDrops, 'number', 'waterDrops must be numeric');
  assert.ok(Array.isArray(store.plants), 'plants must be an array');
  assert.strictEqual(typeof store.checkDailyRefill, 'function', 'checkDailyRefill must be exposed');

  // Verify plant cards in KebunPage have card-interactive-lift and anti-blowout truncation
  const kebunCode = fs.readFileSync(path.join(ROOT, 'src/pages/KebunPage.tsx'), 'utf8');
  assert.ok(
    kebunCode.includes('card-interactive-lift') && kebunCode.includes('truncate max-w-full'),
    'Plant cards must apply card-interactive-lift and truncate max-w-full'
  );

  console.log('  ✅ Check 4 Passed: 5-stage botanical metaphor, 36 capacity cap & layout truncation verified.');
  passCount++;
}

// ── Check 5: Gamification Modals & Design System CSS Detox ──────────────────
console.log('\n📋 Check 5: Gamification Modals & Design System CSS Detox');
{
  // 1. HeatmapCalendar.tsx
  const heatmapPath = path.join(ROOT, 'src/components/gamification/HeatmapCalendar.tsx');
  const heatCode = fs.readFileSync(heatmapPath, 'utf8');
  assert.ok(
    !heatCode.includes('border-border border-accent/20'),
    'HeatmapCalendar must not contain duplicate border classes'
  );
  assert.ok(
    heatCode.includes('text-amber-800 dark:text-amber-400') && heatCode.includes('font-extrabold'),
    'HeatmapCalendar must maintain high-contrast active days tokens'
  );

  // 2. StreakBrokenModal.tsx
  const streakPath = path.join(ROOT, 'src/components/gamification/StreakBrokenModal.tsx');
  const streakCode = fs.readFileSync(streakPath, 'utf8');
  assert.ok(
    !streakCode.includes('border-accent/25'),
    'StreakBrokenModal must not use border-accent/25 border slop'
  );
  assert.ok(
    !streakCode.includes('shadow-glow'),
    'StreakBrokenModal must eliminate shadow-glow'
  );
  assert.ok(
    streakCode.includes('text-stone-950 font-bold'),
    'StreakBrokenModal CTA must use high-contrast text-stone-950 font-bold'
  );

  // 3. BadgesModal.tsx
  const badgesPath = path.join(ROOT, 'src/components/gamification/BadgesModal.tsx');
  const badgesCode = fs.readFileSync(badgesPath, 'utf8');
  assert.ok(badgesCode.includes('role="dialog"'), 'BadgesModal must declare role="dialog"');
  assert.ok(badgesCode.includes('aria-modal="true"'), 'BadgesModal must declare aria-modal="true"');
  assert.ok(
    badgesCode.includes('min-h-[44px] min-w-[44px]'),
    'BadgesModal close button must satisfy 44px touch target'
  );

  console.log('  ✅ Check 5 Passed: CSS detox, hairline borders & high-contrast tokens verified.');
  passCount++;
}

// ── Check 6: Full-Stack FSRS Lifecycle Simulation ───────────────────────────
console.log('\n📋 Check 6: Full-Stack FSRS Lifecycle State Machine Simulation');
{
  const { calculateFSRSReview } = await import('../src/lib/fsrs/math.ts');

  // Step 1: Newly acquired card (state 0)
  const step0 = {
    due: new Date().toISOString(),
    stability: 0,
    difficulty: 5.0,
    elapsed_days: 0,
    scheduled_days: 0,
    reps: 0,
    lapses: 0,
    state: 0,
  };

  // Step 2: First successful review (Good = 3)
  const step1 = calculateFSRSReview(step0, 3);
  assert.strictEqual(step1.state, 2, 'New card rated Good transitions to Review state 2');
  assert.strictEqual(step1.reps, 1, 'Reps must equal 1');
  assert.ok(step1.stability >= 2.0, `Initial Good stability must be >= 2.0, got ${step1.stability}`);

  // Step 3: Card lapses 5 days later (Again = 1)
  const dueLapsedCard = {
    ...step1,
    last_review: new Date(Date.now() - 86400000 * 5).toISOString(),
  };
  const step2 = calculateFSRSReview(dueLapsedCard, 1);
  assert.strictEqual(step2.state, 3, 'Lapsed review card transitions to Relearning state 3');
  assert.strictEqual(step2.lapses, 1, 'Lapses count must increment to 1');
  assert.strictEqual(step2.scheduled_days, 1, 'Lapse interval must reset to 1 day');

  // Step 4: Intra-session retry on same day (Good = 3)
  const step3 = calculateFSRSReview(step2, 3);
  assert.strictEqual(step3.state, 2, 'Intra-session rehearsal graduates back to Review state 2');
  assert.strictEqual(step3.scheduled_days, 1, 'Same-day review interval must stay at 1 day');

  // Step 5: Next-day review after sleep consolidation (Good = 3)
  const nextDayCard = {
    ...step3,
    last_review: new Date(Date.now() - 86400000 * 1.5).toISOString(),
  };
  const step4 = calculateFSRSReview(nextDayCard, 3);
  assert.strictEqual(step4.state, 2, 'Consolidated card remains in Review state 2');
  assert.ok(step4.scheduled_days >= 2, `Post-sleep interval must expand >= 2 days, got ${step4.scheduled_days}`);

  console.log('  ✅ Check 6 Passed: Full-stack 5-step FSRS lifecycle simulation verified.');
  passCount++;
}

// ── Summary ─────────────────────────────────────────────────────────────────
console.log('\n──────────────────────────────────────────────────────────────────');
console.log(`🎉 SIKLUS IX PASS 3 AUDIT COMPLETE: ${passCount}/${totalChecks} CHECKS PASSED (100% GREEN)`);
console.log('──────────────────────────────────────────────────────────────────\n');
process.exit(0);
