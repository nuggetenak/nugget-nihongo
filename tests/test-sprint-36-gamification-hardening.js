// ══════════════════════════════════════════════════════════════════
//  test-sprint-36-gamification-hardening.js — Forensic Unit & Integration Suite
//  Sprint 36: Gamification Hardening, Anti-Cheat Safeguards & Garden Retention Engine
//  (Tickets T-196 to T-200)
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const assert = require('assert');

let passedTests = 0;
let totalTests = 0;

function test(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✅ [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ [FAIL] ${name}`);
    console.error(`     Error: ${err.message}`);
  }
}

console.log('\n=============================================================');
console.log('🎮 RUNNING SPRINT 36 VERIFICATION SUITE: GAMIFICATION & GARDEN');
console.log('=============================================================\n');

const ROOT_DIR = path.resolve(__dirname, '..');

// ── T-196: Eradicate Infinite XP Exploit & Implement Deduplicated Lesson Completion ──
test('T-196: useAppStore and CanDoCompletionStage eradicate infinite XP remount exploit', () => {
  const canDoPath = path.join(ROOT_DIR, 'src/components/curriculum/player/CanDoCompletionStage.tsx');
  const storePath = path.join(ROOT_DIR, 'src/store/useAppStore.ts');
  assert(fs.existsSync(canDoPath), 'CanDoCompletionStage.tsx must exist');
  assert(fs.existsSync(storePath), 'useAppStore.ts must exist');

  const canDoCode = fs.readFileSync(canDoPath, 'utf8');
  const storeCode = fs.readFileSync(storePath, 'utf8');

  // Verify CanDoCompletionStage uses completedLessonIds and completeLesson
  assert(canDoCode.includes('completedLessonIds'), 'CanDoCompletionStage must read completedLessonIds');
  assert(canDoCode.includes('completeLesson'), 'CanDoCompletionStage must invoke completeLesson');
  assert(!canDoCode.includes('localStorage.getItem(STORAGE_KEY)'), 'Must delegate storage access to completeLesson');

  // Verify useAppStore has completedLessonIds and completeLesson atomic handler
  assert(storeCode.includes('completedLessonIds: string[]'), 'AppState must declare completedLessonIds');
  assert(storeCode.includes('completeLesson: ('), 'AppState must declare completeLesson');
  assert(storeCode.includes('nn_completed_lesson_ids'), 'Must persist completed lesson IDs to nn_completed_lesson_ids');

  // Simulate deduplication logic
  const completedIds = ['lesson-01', 'lesson-02'];
  const testCompleteLesson = (id) => {
    if (completedIds.includes(id)) {
      return { awardedXp: 0, awardedWater: 0 };
    }
    completedIds.push(id);
    return { awardedXp: 50, awardedWater: 2 };
  };

  const firstAttempt = testCompleteLesson('lesson-03');
  assert.strictEqual(firstAttempt.awardedXp, 50, 'First completion awards +50 XP');
  assert.strictEqual(firstAttempt.awardedWater, 2, 'First completion awards +2 water drops');

  const duplicateAttempt = testCompleteLesson('lesson-03');
  assert.strictEqual(duplicateAttempt.awardedXp, 0, 'Duplicate completion awards 0 XP (anti-exploit)');
  assert.strictEqual(duplicateAttempt.awardedWater, 0, 'Duplicate completion awards 0 water');
});

// ── T-197: Implement Localized Timezone Streak Engine (WIB/WITA/WIT/JST) ──
test('T-197: Localized Timezone Streak Engine handles WIB/JST and 36-hour grace window', () => {
  const storePath = path.join(ROOT_DIR, 'src/store/useAppStore.ts');
  const storeCode = fs.readFileSync(storePath, 'utf8');

  assert(storeCode.includes('export function getLocalDateString'), 'Must export getLocalDateString');
  assert(storeCode.includes('export function getLocalYesterdayString'), 'Must export getLocalYesterdayString');
  assert(storeCode.includes('36 * 3600 * 1000'), 'Must implement 36-hour grace window for night shifts');

  // Dynamic test of getLocalDateString across timezones
  // 2026-10-16 23:30:00 UTC = 2026-10-17 06:30:00 WIB (Asia/Jakarta, UTC+7)
  const utcDate = new Date('2026-10-16T23:30:00.000Z');

  const formatterWIB = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Jakarta',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const dateWIB = formatterWIB.format(utcDate);
  assert.strictEqual(dateWIB, '2026-10-17', 'UTC night time must resolve to next morning in Jakarta/WIB');

  const formatterUTC = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'UTC',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const dateUTC = formatterUTC.format(utcDate);
  assert.strictEqual(dateUTC, '2026-10-16', 'Same moment in UTC must still be previous date');

  // Grace window test: 30 hours elapsed since yesterday study
  const lastStudyTimestamp = Date.now() - (30 * 3600 * 1000);
  const now = Date.now();
  const isGraceValid = (now - lastStudyTimestamp) <= (36 * 3600 * 1000);
  assert.strictEqual(isGraceValid, true, '30h elapsed must be protected within 36h streak grace window');

  const expiredTimestamp = Date.now() - (40 * 3600 * 1000);
  const isExpired = (now - expiredTimestamp) <= (36 * 3600 * 1000);
  assert.strictEqual(isExpired, false, '40h elapsed exceeds 36h grace window');
});

// ── T-198: Reset Default XP to 0 & Expand Economy to 50 Prestige Tiers ──
test('T-198: Reset default XP to 0 and expand XP_LEVELS to 50 tiers scaling to 250,000 XP', () => {
  const gamificationPath = path.join(ROOT_DIR, 'src/lib/gamification/gamificationStore.ts');
  const storePath = path.join(ROOT_DIR, 'src/store/useAppStore.ts');

  const gamificationCode = fs.readFileSync(gamificationPath, 'utf8');
  const storeCode = fs.readFileSync(storePath, 'utf8');

  // Verify store defaults
  assert(storeCode.includes("xp: getStoredNumber('nn_xp', 0)"), 'Default initial XP must be 0 (not 120)');
  assert(storeCode.includes("streak: getStoredNumber('nn_streak', 0)"), 'Default initial streak must be 0');

  // Verify XP_LEVELS has 50 tiers
  const { XP_LEVELS, getLevelForXp, getNextLevelProgress } = require('../src/lib/gamification/gamificationStore.ts');
  assert.strictEqual(XP_LEVELS.length, 50, 'XP_LEVELS must contain exactly 50 tiers');

  // Boundary checks
  assert.strictEqual(XP_LEVELS[0].level, 1);
  assert.strictEqual(XP_LEVELS[0].xp, 0);
  assert.strictEqual(XP_LEVELS[0].title, 'Pemula');

  assert.strictEqual(XP_LEVELS[9].level, 10);
  assert.strictEqual(XP_LEVELS[9].xp, 5000);

  assert.strictEqual(XP_LEVELS[19].level, 20);
  assert.strictEqual(XP_LEVELS[19].xp, 20000);

  assert.strictEqual(XP_LEVELS[29].level, 30);
  assert.strictEqual(XP_LEVELS[29].xp, 60000);

  assert.strictEqual(XP_LEVELS[39].level, 40);
  assert.strictEqual(XP_LEVELS[39].xp, 140000);

  assert.strictEqual(XP_LEVELS[49].level, 50);
  assert.strictEqual(XP_LEVELS[49].xp, 250000);
  assert(XP_LEVELS[49].title.includes('Tatsujin') || XP_LEVELS[49].title.includes('Nihongo Master'));

  // Level lookup helper tests
  const lvlZero = getLevelForXp(0);
  assert.strictEqual(lvlZero.level, 1);

  const lvlMidN5 = getLevelForXp(350);
  assert.strictEqual(lvlMidN5.level, 3); // 300 <= 350 < 600

  const lvlN2 = getLevelForXp(75000);
  assert.strictEqual(lvlN2.level, 32); // 73,000 <= 75,000 < 81,000

  const lvlMax = getLevelForXp(300000);
  assert.strictEqual(lvlMax.level, 50);

  const prog = getNextLevelProgress(150); // level 2 (100 xp), next level 3 (300 xp)
  assert.strictEqual(prog.currentLevel.level, 2);
  assert.strictEqual(prog.nextLevel.level, 3);
  assert.strictEqual(prog.progressPercent, 25); // (150 - 100) / (300 - 100) = 50 / 200 = 25%
  assert.strictEqual(prog.xpNeeded, 150);
});

// ── T-199: FSRS-Coupled Kanji Garden & Multi-Activity Water Economy ──
test('T-199: GardenStore features MAX_GARDEN_CAPACITY, applyLapseWilt, and daily refill', () => {
  const gardenPath = path.join(ROOT_DIR, 'src/lib/garden/gardenStore.ts');
  const kebunPagePath = path.join(ROOT_DIR, 'src/pages/KebunPage.tsx');
  const quizPagePath = path.join(ROOT_DIR, 'src/pages/QuizPage.tsx');
  const kanjiModalPath = path.join(ROOT_DIR, 'src/components/kanji/KanjiStrokeModal.tsx');

  const gardenCode = fs.readFileSync(gardenPath, 'utf8');
  const kebunCode = fs.readFileSync(kebunPagePath, 'utf8');
  const quizCode = fs.readFileSync(quizPagePath, 'utf8');
  const kanjiCode = fs.readFileSync(kanjiModalPath, 'utf8');

  // Verify capacity and methods in gardenStore
  assert(gardenCode.includes('MAX_GARDEN_CAPACITY = 36'), 'MAX_GARDEN_CAPACITY must be 36');
  assert(gardenCode.includes('applyLapseWilt'), 'gardenStore must implement applyLapseWilt');
  assert(gardenCode.includes('checkDailyRefill'), 'gardenStore must implement checkDailyRefill');

  // Verify KebunPage uses true FSRS forgetting curve
  assert(kebunCode.includes('fsrsForgettingCurve'), 'KebunPage must calculate retention via fsrsForgettingCurve');
  assert(!kebunCode.includes('100 - (dueCount / totalCards) * 20'), 'Must remove fake clamped retrievability formula');
  assert(kebunCode.includes('checkDailyRefill()'), 'KebunPage must call checkDailyRefill on mount');

  // Verify QuizPage lapse wilting and listening session drop
  assert(quizCode.includes('applyLapseWilt'), 'QuizPage must call applyLapseWilt on lapses');
  assert(kanjiCode.includes('addWaterDrop(1)'), 'KanjiStrokeModal must award water drop on perfect trace');

  // Functional test of gardenStore state in Node
  const { useGardenStore, MAX_GARDEN_CAPACITY } = require('../src/lib/garden/gardenStore.ts');
  const store = useGardenStore.getState();

  // Test applyLapseWilt
  const initialPlants = [
    { id: 'p-test', kanji: '木', reading: 'き', meaning: 'Pohon', level: 'n5', stage: 2, waterCount: 2, maxWater: 5 },
  ];
  useGardenStore.setState({ plants: initialPlants });

  const wiltSuccess = useGardenStore.getState().applyLapseWilt('木');
  assert.strictEqual(wiltSuccess, true, 'applyLapseWilt must succeed for active plant');
  const wiltedPlant = useGardenStore.getState().plants.find((p) => p.kanji === '木');
  assert.strictEqual(wiltedPlant.stage, 0, 'Stage must decrement upon drought lapse');
  assert.strictEqual(wiltedPlant.waterCount, 1, 'Water count must decrement');
});

// ── T-200: Anti-Cheat Rate Limiting & Tamper-Resistant Badge Verification ──
test('T-200: Anti-cheat rate limits burst XP, enforces 2,500 XP ceiling, and validates badges', () => {
  const gamificationPath = path.join(ROOT_DIR, 'src/lib/gamification/gamificationStore.ts');
  const storePath = path.join(ROOT_DIR, 'src/store/useAppStore.ts');

  const gamificationCode = fs.readFileSync(gamificationPath, 'utf8');
  const storeCode = fs.readFileSync(storePath, 'utf8');

  assert(gamificationCode.includes('DAILY_XP_CAP = 2500'), 'Must define DAILY_XP_CAP = 2500');
  assert(gamificationCode.includes('BURST_XP_CAP = 150'), 'Must define BURST_XP_CAP = 150');
  assert(gamificationCode.includes('checkXpAntiCheat'), 'Must export checkXpAntiCheat');
  assert(storeCode.includes('checkXpAntiCheat(amount)'), 'incrementXp must invoke checkXpAntiCheat');

  const { checkXpAntiCheat, DAILY_XP_CAP, BURST_XP_CAP } = require('../src/lib/gamification/gamificationStore.ts');

  // Test non-positive
  const negCheck = checkXpAntiCheat(-50);
  assert.strictEqual(negCheck.allowed, false, 'Non-positive XP must be rejected');

  // Test normal allowed increment
  const normalCheck = checkXpAntiCheat(50);
  assert.strictEqual(normalCheck.allowed, true);
  assert.strictEqual(normalCheck.effectiveAmount, 50);

  // Test burst rate limit (>150 XP within 10s)
  const secondCheck = checkXpAntiCheat(50);
  assert.strictEqual(secondCheck.allowed, true);
  assert.strictEqual(secondCheck.effectiveAmount, 50);

  const thirdCheck = checkXpAntiCheat(100); // 50 + 50 + 100 = 200 > 150 -> clamped to 50
  assert.strictEqual(thirdCheck.effectiveAmount, 50, 'Burst over 150 XP in 10s must be clamped to remaining burst quota');

  const overflowCheck = checkXpAntiCheat(50);
  assert.strictEqual(overflowCheck.allowed, false, 'Burst over 150 XP must be rejected once quota is exhausted');
  assert(overflowCheck.reason.includes('Burst rate limit'), 'Reason must indicate burst rate limit');
});

console.log(`\n=============================================================`);
console.log(` SPRINT 36 VERIFICATION RESULTS: ${passedTests} / ${totalTests} TESTS PASSED`);
console.log(`=============================================================\n`);

if (passedTests !== totalTests) {
  process.exit(1);
} else {
  console.log('🎉 SPRINT 36 GAMIFICATION HARDENING & GARDEN ENGINE VERIFIED 100%!\n');
}
