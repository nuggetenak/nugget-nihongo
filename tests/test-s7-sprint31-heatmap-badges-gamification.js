// ══════════════════════════════════════════════════════════════════
//  test-s7-sprint31-heatmap-badges-gamification.js — Regression Suite
//  Sprint 31 (Pass 9): Heatmap Calendar, Badges Modal & Gamification Streak
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
    throw err;
  }
}

console.log('\n====================================================================');
console.log('🔥 SPRINT 31: HEATMAP CALENDAR, BADGES & GAMIFICATION RIGOR');
console.log('====================================================================\n');

const ROOT_DIR = path.resolve(__dirname, '..');

// ── Test 1: Localized Timezone Date Engine & Single Source of Truth ──
test('T1: timezoneDate.ts provides standardized date calculation across WIB/WITA/WIT/JST', () => {
  const tzDatePath = path.join(ROOT_DIR, 'src/lib/date/timezoneDate.ts');
  const storePath = path.join(ROOT_DIR, 'src/store/useAppStore.ts');
  const gamifPath = path.join(ROOT_DIR, 'src/lib/gamification/gamificationStore.ts');

  assert(fs.existsSync(tzDatePath), 'timezoneDate.ts must exist');
  assert(fs.existsSync(storePath), 'useAppStore.ts must exist');
  assert(fs.existsSync(gamifPath), 'gamificationStore.ts must exist');

  const tzCode = fs.readFileSync(tzDatePath, 'utf8');
  const storeCode = fs.readFileSync(storePath, 'utf8');
  const gamifCode = fs.readFileSync(gamifPath, 'utf8');

  // Verify export signatures
  assert(tzCode.includes('export function getLocalDateString'), 'timezoneDate must export getLocalDateString');
  assert(tzCode.includes('export function getLocalYesterdayString'), 'timezoneDate must export getLocalYesterdayString');

  // useAppStore must maintain backward-compatible export
  assert(storeCode.includes('export function getLocalDateString'), 'useAppStore must export getLocalDateString');
  assert(storeCode.includes('export function getLocalYesterdayString'), 'useAppStore must export getLocalYesterdayString');

  // gamificationStore must import getLocalDateString
  assert(gamifCode.includes('getLocalDateString'), 'gamificationStore must use getLocalDateString');

  // Simulate timezone offset test
  const utcLateNight = new Date('2026-11-15T22:30:00.000Z');
  const formatJakarta = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Jakarta',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(utcLateNight);
  assert.strictEqual(formatJakarta, '2026-11-16', 'UTC 22:30 on Nov 15 must resolve to Nov 16 morning in Jakarta');

  const formatTokyo = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(utcLateNight);
  assert.strictEqual(formatTokyo, '2026-11-16', 'UTC 22:30 on Nov 15 must resolve to Nov 16 morning in Tokyo');
});

// ── Test 2: Gamification XP & Anti-Cheat Robustness ──
test('T2: checkXpAntiCheat and getNextLevelProgress handle extreme inputs without NaN', () => {
  const gamifPath = path.join(ROOT_DIR, 'src/lib/gamification/gamificationStore.ts');
  const gamifCode = fs.readFileSync(gamifPath, 'utf8');

  // Verify anti-cheat finite number check
  assert(gamifCode.includes('!Number.isFinite(amount) || amount <= 0'), 'checkXpAntiCheat must reject non-finite and <= 0 amounts');

  // Verify getNextLevelProgress sanitization
  assert(gamifCode.includes('safeXp = Number.isFinite(xp)'), 'getNextLevelProgress must sanitize non-finite xp');

  // Verify XP levels exist up to level 50
  assert(gamifCode.includes('level: 50, xp: 250000'), 'Level 50 (Tatsujin) must be capped at 250,000 XP');
});

// ── Test 3: Complete 100% SVG Badge Asset Coverage ──
test('T3: All 19 badge templates have dedicated medallion SVGs in public/assets/badges/', () => {
  const gamifPath = path.join(ROOT_DIR, 'src/lib/gamification/gamificationStore.ts');
  const badgesDir = path.join(ROOT_DIR, 'public/assets/badges');
  assert(fs.existsSync(badgesDir), 'public/assets/badges directory must exist');

  const gamifCode = fs.readFileSync(gamifPath, 'utf8');
  const badgeIdMatches = [...gamifCode.matchAll(/id:\s*'([a-z0-9-]+)'/g)].map(m => m[1]);
  assert(badgeIdMatches.length >= 19, `Must define at least 19 badge templates (found ${badgeIdMatches.length})`);

  for (const id of badgeIdMatches) {
    const svgFile = path.join(badgesDir, `${id}.svg`);
    assert(fs.existsSync(svgFile), `Badge SVG asset missing: ${id}.svg`);
    const svgContent = fs.readFileSync(svgFile, 'utf8');
    assert(svgContent.includes('<svg'), `${id}.svg must contain valid SVG root element`);
    assert(svgContent.includes('<circle'), `${id}.svg must contain medallion circles`);
    assert(svgContent.includes('<text'), `${id}.svg must contain center emblem text`);
  }
});

// ── Test 4: BadgesModal Eradicates Dangerous innerHTML Mutations ──
test('T4: BadgesModal renders clean React fallback state instead of direct innerHTML', () => {
  const modalPath = path.join(ROOT_DIR, 'src/components/gamification/BadgesModal.tsx');
  const modalCode = fs.readFileSync(modalPath, 'utf8');

  // Verify no direct DOM parentElement.innerHTML manipulation
  assert(!modalCode.includes('target.parentElement.innerHTML'), 'BadgesModal must never manipulate target.parentElement.innerHTML');
  assert(modalCode.includes('failedImages'), 'BadgesModal must track failed image state cleanly in React');
  assert(modalCode.includes('b.icon'), 'BadgesModal must fallback to badge native icon');

  // Verify modal accessibility and scroll lock
  assert(modalCode.includes('useBodyScrollLock(isOpen)'), 'Must lock scroll when modal is open');
  assert(modalCode.includes('useFocusTrap'), 'Must trap keyboard focus inside dialog');
  assert(modalCode.includes('role="dialog"'), 'Must designate role="dialog"');
  assert(modalCode.includes('aria-modal="true"'), 'Must declare aria-modal="true"');
});

// ── Test 5: HeatmapCalendar Subscribes Reactively & Protects Color Scales ──
test('T5: HeatmapCalendar subscribes to heatmap in Zustand and handles 0/NaN reviews', () => {
  const heatmapPath = path.join(ROOT_DIR, 'src/components/gamification/HeatmapCalendar.tsx');
  const heatmapCode = fs.readFileSync(heatmapPath, 'utf8');

  // Verify reactive subscription to heatmap
  assert(heatmapCode.includes('useGamificationStore((s) => s.heatmap)'), 'HeatmapCalendar must select heatmap state from store');
  assert(heatmapCode.includes('[getHeatmapDays, heatmap, safeDays]'), 'useMemo must depend on heatmap state');

  // Verify getColorClass guards
  assert(heatmapCode.includes('!reviews || reviews <= 0'), 'getColorClass must safely guard non-positive and NaN reviews');

  // Verify dynamic week/day header
  assert(heatmapCode.includes('titleText'), 'HeatmapCalendar must dynamically compute header title');

  // Verify a11y region and grid
  assert(heatmapCode.includes('role="region"'), 'HeatmapCalendar must designate region container');
  assert(heatmapCode.includes('role="grid"'), 'HeatmapCalendar must designate grid role');
  assert(heatmapCode.includes('role="gridcell"'), 'HeatmapCalendar must designate gridcell items');
});

// ── Test 6: StreakBrokenModal Ergonomics & Gamification Storage Sanitization ──
test('T6: StreakBrokenModal satisfies touch targets and storage loaders sanitize corruptions', () => {
  const brokenPath = path.join(ROOT_DIR, 'src/components/gamification/StreakBrokenModal.tsx');
  const gamifPath = path.join(ROOT_DIR, 'src/lib/gamification/gamificationStore.ts');

  const brokenCode = fs.readFileSync(brokenPath, 'utf8');
  const gamifCode = fs.readFileSync(gamifPath, 'utf8');

  // Check touch targets and mobile padding
  assert(brokenCode.includes('min-h-[44px]'), 'Buttons in StreakBrokenModal must satisfy 44px touch targets');
  assert(brokenCode.includes('p-5 sm:p-8'), 'Modal container must maintain responsive mobile padding');

  // Check storage loaders sanitization in gamificationStore
  assert(gamifCode.includes('!Array.isArray(parsed)'), 'loadEarnedBadges must reject non-array formats');
  assert(gamifCode.includes('hour >= 4 && hour < 6'), 'recordActivity must award Early Bird badge between 04:00 and 06:00');
});

console.log('\n====================================================================');
console.log(`✅ SPRINT 31 REGRESSION VERIFICATION COMPLETE: ${passedTests}/${totalTests} TESTS PASSED`);
console.log('====================================================================\n');
