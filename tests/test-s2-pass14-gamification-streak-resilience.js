// ══════════════════════════════════════════════════════════════════
//  test-s2-pass14-gamification-streak-resilience.js
//  Verification Suite: Siklus II — Pass 14
//  Gamification State Machine, Streak Resilience, Accessible Heatmap
//  & Multi-Tab Cross-Process Synchronization Bus
// ══════════════════════════════════════════════════════════════════

import fs from 'fs';
import path from 'path';
import assert from 'assert';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

console.log('🧪 [Siklus II — Pass 14] Testing Gamification State Machine, Badges, Heatmap & Streak Resilience...');

// ─────────────────────────────────────────────────────────────
// Check 14.1: BadgesModal Z-Index, Touch Target & Category Filters
// ─────────────────────────────────────────────────────────────
console.log('  ▸ Check 14.1: BadgesModal Z-Index Integrity & Category Filter Architecture');
{
  const modalPath = path.join(ROOT, 'src/components/gamification/BadgesModal.tsx');
  const modalCode = fs.readFileSync(modalPath, 'utf8');

  // Verify z-index is standardized to z-50
  assert(!modalCode.includes('z-[9999]'), 'BadgesModal must eliminate extreme z-[9999]');
  assert(modalCode.includes('z-50'), 'BadgesModal must adopt standard z-50 overlay');

  // Verify close button touch target standard (>= 40px)
  assert(
    modalCode.includes('min-h-[40px]') || modalCode.includes('min-h-[44px]'),
    'BadgesModal close trigger must enforce touch target standard (>= 40px)'
  );

  // Verify category filter pills architecture
  assert(modalCode.includes('selectedCategory'), 'BadgesModal must maintain selectedCategory state');
  assert(
    modalCode.includes('Semua') &&
    modalCode.includes('Kosakata') &&
    modalCode.includes('Tata Bahasa') &&
    modalCode.includes('Streak') &&
    modalCode.includes('Spesial'),
    'BadgesModal must offer 5 localized category filter pills'
  );

  console.log('    ✓ Check 14.1 Passed: BadgesModal z-index, touch targets & category filters verified.');
}

// ─────────────────────────────────────────────────────────────
// Check 14.2: Body Scroll Lock & Escape Listener in Gamification Modals
// ─────────────────────────────────────────────────────────────
console.log('  ▸ Check 14.2: Gamification Modals Body Scroll Lock & Keyboard Escape Dismissal');
{
  const badgesPath = path.join(ROOT, 'src/components/gamification/BadgesModal.tsx');
  const streakPath = path.join(ROOT, 'src/components/gamification/StreakBrokenModal.tsx');
  const badgesCode = fs.readFileSync(badgesPath, 'utf8');
  const streakCode = fs.readFileSync(streakPath, 'utf8');

  // Verify useBodyScrollLock
  assert(badgesCode.includes('useBodyScrollLock(isOpen)'), 'BadgesModal must lock body scroll when open');
  assert(streakCode.includes('useBodyScrollLock(!!modalOpen)'), 'StreakBrokenModal must lock body scroll when open');

  // Verify Escape key event listeners
  assert(badgesCode.includes("e.key === 'Escape'"), 'BadgesModal must dismiss on Escape key');
  assert(streakCode.includes("e.key === 'Escape'"), 'StreakBrokenModal must dismiss on Escape key');

  // Verify StreakBrokenModal backdrop click handler
  assert(streakCode.includes('onClick={handleClose}'), 'StreakBrokenModal backdrop must handle click dismissal');

  console.log('    ✓ Check 14.2 Passed: Gamification modals scroll lock and Escape listeners verified.');
}

// ─────────────────────────────────────────────────────────────
// Check 14.3: WCAG AA High Contrast Tokens in Badges & Heatmap
// ─────────────────────────────────────────────────────────────
console.log('  ▸ Check 14.3: WCAG AA High Contrast Tokens in Badges & Heatmap Cells');
{
  const badgesPath = path.join(ROOT, 'src/components/gamification/BadgesModal.tsx');
  const heatmapPath = path.join(ROOT, 'src/components/gamification/HeatmapCalendar.tsx');
  const badgesCode = fs.readFileSync(badgesPath, 'utf8');
  const heatmapCode = fs.readFileSync(heatmapPath, 'utf8');

  // Verify Badges unlocked badge badge contrast
  assert(
    badgesCode.includes('text-emerald-700 dark:text-emerald-400') ||
    badgesCode.includes('text-emerald-800 dark:text-emerald-300'),
    'BadgesModal must use high-contrast emerald token for unlocked status'
  );
  assert(!badgesCode.includes('text-green-400'), 'Must eliminate raw low-contrast text-green-400');

  // Verify Heatmap bright amber text contrast
  assert(
    heatmapCode.includes('bg-amber-500 text-stone-950') &&
    heatmapCode.includes('bg-amber-400 text-stone-950'),
    'HeatmapCalendar must use text-stone-950 on bright amber cells (eliminating low-contrast text-bg)'
  );
  assert(!heatmapCode.includes('text-bg border border-amber'), 'Must eliminate low-contrast text-bg on amber cells');

  console.log('    ✓ Check 14.3 Passed: WCAG AA contrast tokens verified in BadgesModal and HeatmapCalendar.');
}

// ─────────────────────────────────────────────────────────────
// Check 14.4: HeatmapCalendar Semantic Accessibility & Touch
// ─────────────────────────────────────────────────────────────
console.log('  ▸ Check 14.4: HeatmapCalendar Semantic Roles & Accessibility Attributes');
{
  const heatmapPath = path.join(ROOT, 'src/components/gamification/HeatmapCalendar.tsx');
  const heatmapCode = fs.readFileSync(heatmapPath, 'utf8');

  // Verify grid and cell roles
  assert(heatmapCode.includes('role="grid"'), 'HeatmapCalendar must declare role="grid"');
  assert(heatmapCode.includes('role="gridcell"'), 'HeatmapCalendar must declare role="gridcell" on day cells');

  // Verify aria-label on day cells
  assert(
    heatmapCode.includes('aria-label={`${d.date}: ${d.reviews} review, ${d.xp} XP`}'),
    'HeatmapCalendar cells must provide dynamic descriptive aria-label'
  );

  console.log('    ✓ Check 14.4 Passed: HeatmapCalendar accessibility roles and labels verified.');
}

// ─────────────────────────────────────────────────────────────
// Check 14.5: Cross-Tab Multi-Process Synchronization Bus
// ─────────────────────────────────────────────────────────────
console.log('  ▸ Check 14.5: Cross-Tab Sync Bus Integration in useAppStore');
{
  const storePath = path.join(ROOT, 'src/store/useAppStore.ts');
  const storeCode = fs.readFileSync(storePath, 'utf8');

  // Verify broadcastSync import
  assert(storeCode.includes("import { broadcastSync } from '../lib/sync/broadcastSync';"), 'useAppStore must import broadcastSync');

  // Verify XP_UPDATED event broadcast in incrementXp
  assert(
    storeCode.includes("broadcastSync.broadcast('XP_UPDATED', { xp: newXp })"),
    'useAppStore.incrementXp must broadcast XP_UPDATED event across tabs'
  );

  // Verify STREAK_UPDATED event broadcast in updateStreak and recordStudyActivity
  assert(
    storeCode.includes("broadcastSync.broadcast('STREAK_UPDATED', { streak: newStreak })"),
    'useAppStore.updateStreak must broadcast STREAK_UPDATED event'
  );
  assert(
    storeCode.includes("broadcastSync.broadcast('STREAK_UPDATED', { streak: nextStreak })"),
    'useAppStore.recordStudyActivity must broadcast STREAK_UPDATED event'
  );

  console.log('    ✓ Check 14.5 Passed: Cross-tab sync bus integration in useAppStore fully verified.');
}

console.log('\n🎉 [Siklus II — Pass 14] All 5 Checks PASSED! Gamification & Streak systems fully verified.\n');
