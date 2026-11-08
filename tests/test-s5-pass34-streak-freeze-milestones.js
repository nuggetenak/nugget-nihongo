// ══════════════════════════════════════════════════════════════════
//  tests/test-s5-pass34-streak-freeze-milestones.js
//  Siklus V — Pass 34: Streak Resilience, Freeze Shields & Milestone XP
// ══════════════════════════════════════════════════════════════════

import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

console.log('\n🧪 [Siklus V — Pass 34] Streak Resilience, Freeze Shields & Milestone XP Verification...\n');

let passCount = 0;
const totalChecks = 6;

// ──────────────────────────────────────────────────────────────────
// Check 1: 50-Level Milestone Architecture & Progression Mathematics
// ──────────────────────────────────────────────────────────────────
console.log('📋 Check 1: 50-Level Milestone Architecture & Progression Mathematics');
try {
  const gamifyModule = await import('../src/lib/gamification/gamificationStore.ts');
  const { XP_LEVELS, getLevelForXp, getNextLevelProgress } = gamifyModule;

  assert.strictEqual(XP_LEVELS.length, 50, 'Must define exactly 50 discrete levels');

  // Verify monotonic progression
  for (let i = 0; i < XP_LEVELS.length; i++) {
    assert.strictEqual(XP_LEVELS[i].level, i + 1, `Level numbering must match 1..50`);
    assert.ok(typeof XP_LEVELS[i].title === 'string' && XP_LEVELS[i].title.length > 0);
    assert.ok(typeof XP_LEVELS[i].titleJp === 'string' && XP_LEVELS[i].titleJp.length > 0);
    if (i > 0) {
      assert.ok(XP_LEVELS[i].xp > XP_LEVELS[i - 1].xp, `XP must strictly increase: level ${i + 1} > level ${i}`);
    }
  }

  // Anchor levels check
  assert.strictEqual(XP_LEVELS[0].xp, 0);
  assert.strictEqual(XP_LEVELS[0].title, 'Pemula');
  assert.strictEqual(XP_LEVELS[9].level, 10);
  assert.strictEqual(XP_LEVELS[9].title, 'Pejuang Dasar N5');
  assert.strictEqual(XP_LEVELS[19].level, 20);
  assert.strictEqual(XP_LEVELS[19].title, 'Penutur Seikatsu N4');
  assert.strictEqual(XP_LEVELS[29].level, 30);
  assert.strictEqual(XP_LEVELS[29].title, 'Jembatan Menengah N3');
  assert.strictEqual(XP_LEVELS[39].level, 40);
  assert.strictEqual(XP_LEVELS[39].title, 'Praktisi Mahir N2');
  assert.strictEqual(XP_LEVELS[49].level, 50);
  assert.strictEqual(XP_LEVELS[49].xp, 250000);
  assert.strictEqual(XP_LEVELS[49].title, 'Nihongo Master (Tatsujin)');

  // getLevelForXp lookups
  assert.strictEqual(getLevelForXp(0).level, 1);
  assert.strictEqual(getLevelForXp(150).level, 2);
  assert.strictEqual(getLevelForXp(5000).level, 10);
  assert.strictEqual(getLevelForXp(250000).level, 50);
  assert.strictEqual(getLevelForXp(999999).level, 50);

  // getNextLevelProgress calculation
  const p1 = getNextLevelProgress(50); // between 0 and 100
  assert.strictEqual(p1.currentLevel.level, 1);
  assert.strictEqual(p1.nextLevel.level, 2);
  assert.strictEqual(p1.progressPercent, 50);
  assert.strictEqual(p1.xpNeeded, 50);

  const pMax = getNextLevelProgress(300000); // capped at level 50
  assert.strictEqual(pMax.currentLevel.level, 50);
  assert.strictEqual(pMax.nextLevel, null);
  assert.strictEqual(pMax.progressPercent, 100);
  assert.strictEqual(pMax.xpNeeded, 0);

  console.log('  ✅ Check 1 Passed: 50-level milestone progression (N5 -> N1 Sage) and progress math verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 1 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 2: Anti-Cheat Ceiling & Burst Rate Limiting Engine
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 2: Anti-Cheat Ceiling & Burst Rate Limiting Engine');
try {
  const gamifyModule = await import('../src/lib/gamification/gamificationStore.ts');
  const { DAILY_XP_CAP, BURST_XP_CAP, BURST_WINDOW_MS, checkXpAntiCheat } = gamifyModule;

  assert.strictEqual(DAILY_XP_CAP, 2500, 'Daily XP cap must be 2500');
  assert.strictEqual(BURST_XP_CAP, 150, 'Burst XP cap must be 150');
  assert.strictEqual(BURST_WINDOW_MS, 10000, 'Burst window must be 10000ms');

  // Negative or zero rejection
  const zeroCheck = checkXpAntiCheat(0);
  assert.strictEqual(zeroCheck.allowed, false);
  const negCheck = checkXpAntiCheat(-25);
  assert.strictEqual(negCheck.allowed, false);

  // Valid increment within burst limit
  const validCheck = checkXpAntiCheat(25);
  assert.strictEqual(validCheck.allowed, true);
  assert.strictEqual(validCheck.effectiveAmount, 25);

  console.log('  ✅ Check 2 Passed: 2500 XP daily ceiling and 150 XP / 10s burst rate limit verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 2 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 3: Streak 36-Hour Grace Window & Anti-Breakdown Physics
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 3: Streak 36-Hour Grace Window & Anti-Breakdown Physics');
try {
  const appStoreSource = fs.readFileSync(path.join(projectRoot, 'src/store/useAppStore.ts'), 'utf8');

  // 36-hour grace window (Streak freeze for night shifts & lembur)
  assert.ok(
    appStoreSource.includes('36 * 3600 * 1000') || appStoreSource.includes('36 * 60 * 60 * 1000'),
    'Must enforce 36-hour grace window for shift workers'
  );
  assert.ok(appStoreSource.includes('isWithinGraceWindow'), 'Must calculate isWithinGraceWindow');

  // Soft streak reset to 1 instead of 0 (eliminating toxic despair)
  assert.ok(appStoreSource.includes('set({ streak: 1 })'), 'Broken streak must reset to 1, not 0');

  // Modal notification triggers
  assert.ok(appStoreSource.includes('openStreakBrokenModal()'), 'Must trigger openStreakBrokenModal on break');
  assert.ok(appStoreSource.includes("openModal('streakBroken')"), 'Must trigger GlobalModalManager streakBroken modal');

  // Monotonic increment when continuing streak
  assert.ok(appStoreSource.includes('nextStreak = Math.max(1, currentStreak + 1)'), 'Must increment streak on consecutive days');

  console.log('  ✅ Check 3 Passed: 36h streak freeze grace window and positive restart to 1 verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 3 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 4: Streak Milestone Badges & Contextual Evaluator
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 4: Streak Milestone Badges & Contextual Evaluator');
try {
  const gamifyModule = await import('../src/lib/gamification/gamificationStore.ts');
  const { useGamificationStore } = gamifyModule;

  const state = useGamificationStore.getState();
  const badges = state.badges;

  const streak3 = badges.find((b) => b.id === 'streak-3');
  assert.ok(streak3, 'Badge streak-3 must exist');
  assert.strictEqual(streak3.category, 'streak');

  const streak7 = badges.find((b) => b.id === 'streak-7');
  assert.ok(streak7, 'Badge streak-7 must exist');

  const streak30 = badges.find((b) => b.id === 'streak-30');
  assert.ok(streak30, 'Badge streak-30 must exist');

  // Award streak badges via checkAndAwardBadges
  const earned = useGamificationStore.getState().checkAndAwardBadges({ streak: 7 });
  const updatedBadges = useGamificationStore.getState().badges;
  const s3 = updatedBadges.find((b) => b.id === 'streak-3');
  const s7 = updatedBadges.find((b) => b.id === 'streak-7');
  assert.strictEqual(s3.earned, true);
  assert.strictEqual(s7.earned, true);

  console.log('  ✅ Check 4 Passed: Streak badges (3, 7, 30 days) and dynamic award evaluator verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 4 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 5: Positive Psychology Encouragement Engine (STREAK_TIPS)
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 5: Positive Psychology Encouragement Engine (STREAK_TIPS)');
try {
  const gamifyModule = await import('../src/lib/gamification/gamificationStore.ts');
  const { STREAK_TIPS } = gamifyModule;

  assert.ok(Array.isArray(STREAK_TIPS) && STREAK_TIPS.length >= 5, 'Must provide at least 5 streak recovery tips');

  // Verify non-toxic, empathetic phrasing
  for (const tip of STREAK_TIPS) {
    assert.ok(typeof tip === 'string' && tip.trim().length > 10, 'Each tip must be a supportive statement');
    assert.ok(
      tip.includes('Jangan nyerah') ||
      tip.includes('istirahat') ||
      tip.includes('Konsistensi') ||
      tip.includes('lebih baik') ||
      tip.includes('kesempatan baru'),
      `Tip should encourage perseverance without guilt: "${tip}"`
    );
  }

  console.log(`  ✅ Check 5 Passed: ${STREAK_TIPS.length} empathetic non-toxic recovery tips verified`);
  passCount++;
} catch (err) {
  console.error('  ❌ Check 5 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 6: Responsive Ergonomics & A11y in StreakBrokenModal.tsx
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 6: Responsive Ergonomics & A11y in StreakBrokenModal.tsx');
try {
  const modalSource = fs.readFileSync(path.join(projectRoot, 'src/components/gamification/StreakBrokenModal.tsx'), 'utf8');

  // Focus trap & body scroll lock
  assert.ok(modalSource.includes('useFocusTrap<HTMLDivElement>(!!modalOpen, handleClose)'), 'Must integrate useFocusTrap');
  assert.ok(modalSource.includes('useBodyScrollLock(!!modalOpen)'), 'Must integrate useBodyScrollLock');

  // Semantic accessibility roles
  assert.ok(modalSource.includes('role="dialog"'), 'Must have role="dialog"');
  assert.ok(modalSource.includes('aria-modal="true"'), 'Must have aria-modal="true"');

  // Touch targets >= 44px
  assert.ok(modalSource.includes('min-h-[44px] min-w-[44px]'), 'Close button must enforce 44px touch targets');
  assert.ok(modalSource.includes('min-h-[44px] py-3 px-4'), 'Study CTA button must enforce 44px touch targets');

  // WCAG AA Dual-Theme Contrast Tokens
  assert.ok(modalSource.includes('text-amber-900 dark:text-amber-200'), 'Must enforce WCAG AA dual-theme contrast tokens');

  // Cultural asset: Daruma recovery
  assert.ok(modalSource.includes('daruma_recovery'), 'Must render daruma_recovery Irasutoya artwork');

  console.log('  ✅ Check 6 Passed: Focus trap, body scroll lock, 44px touch targets, and WCAG AA tokens verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 6 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Master Verification Summary
// ──────────────────────────────────────────────────────────────────
console.log(`\n📊 Siklus V Pass 34 Result: ${passCount}/${totalChecks} checks passed.`);
if (passCount === totalChecks) {
  console.log('🎉 Siklus V Pass 34 PASSED 100% GREEN!\n');
  process.exit(0);
} else {
  console.error(`❌ Siklus V Pass 34 FAILED with ${totalChecks - passCount} errors.\n`);
  process.exit(1);
}
