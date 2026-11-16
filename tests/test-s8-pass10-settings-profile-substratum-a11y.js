// ══════════════════════════════════════════════════════════════════
//  test-s8-pass10-settings-profile-substratum-a11y.js
//  Siklus VIII Pass 10 (Sprint 56 / Suite 197):
//  Settings, Learner Profile, L1 Substratum Matrix & High-Contrast A11y Theme Switcher
// ══════════════════════════════════════════════════════════════════

import assert from 'assert';
import fs from 'fs';
import path from 'path';

console.log('⚡ Running Suite 197: Siklus VIII Pass 10 (Sprint 56): Settings, Learner Profile & L1 Substratum Matrix...');

const ROOT = process.cwd().includes('nugget-nihongo')
  ? process.cwd()
  : path.join(process.cwd(), 'nugget-nihongo');

// ── Check 1: SettingsPage 4 Structured Sub-Tabs & Non-Destructive Font Scaling ──
console.log('  Check 56.1: Verifying SettingsPage sub-tabs, hash routing & non-destructive rem scaling...');
const settingsPagePath = path.join(ROOT, 'src', 'pages', 'SettingsPage.tsx');
assert(fs.existsSync(settingsPagePath), 'SettingsPage.tsx must exist');
const settingsContent = fs.readFileSync(settingsPagePath, 'utf8');

assert(
  settingsContent.includes('#settings/profil') &&
  settingsContent.includes('#settings/audio') &&
  settingsContent.includes('#settings/sync') &&
  settingsContent.includes('#settings/lanjutan'),
  'SettingsPage must implement 4 structured hash routes (#settings/profil, audio, sync, lanjutan)'
);

assert(
  settingsContent.includes("document.documentElement.style.fontSize = '93.75%'") &&
  settingsContent.includes("document.documentElement.style.fontSize = '109.375%'") &&
  settingsContent.includes("document.documentElement.setAttribute('data-text-size'"),
  'SettingsPage must use non-destructive rem scaling to preserve user browser accessibility base font size'
);

assert(
  settingsContent.includes('min-h-[44px]'),
  'SettingsPage tabs and controls must meet >=44px touch target standards'
);

console.log('  ✅ Check 56.1 passed: SettingsPage sub-tabs and non-destructive font scaling verified.');

// ── Check 2: Learner Identity & 9 Cultural Japanese Avatars ───────────────────
console.log('  Check 56.2: Verifying LearnerIdentityCard cultural Japanese avatars & identity fallbacks...');
const identityCardPath = path.join(ROOT, 'src', 'components', 'settings', 'LearnerIdentityCard.tsx');
assert(fs.existsSync(identityCardPath), 'LearnerIdentityCard.tsx must exist');
const identityContent = fs.readFileSync(identityCardPath, 'utf8');

assert(
  identityContent.includes('CULTURAL_AVATARS') &&
  identityContent.includes("'daruma'") &&
  identityContent.includes("'manekineko'") &&
  identityContent.includes("'samurai'") &&
  identityContent.includes("'sakura'") &&
  identityContent.includes("'fuji'") &&
  identityContent.includes("'origami'") &&
  identityContent.includes("'tanuki'") &&
  identityContent.includes("'kitsune'") &&
  identityContent.includes("'shinkansen'"),
  'LearnerIdentityCard must declare all 9 cultural Japanese avatars'
);

assert(
  identityContent.includes('customDisplayName ||') &&
  identityContent.includes('user?.user_metadata?.full_name ||') &&
  identityContent.includes('user?.user_metadata?.display_name ||') &&
  identityContent.includes("'Pembelajar Nugget'"),
  'LearnerIdentityCard must implement resilient fallback display name resolution'
);

console.log('  ✅ Check 56.2 passed: Learner identity and 9 cultural avatars verified.');

// ── Check 3: L1 Substratum Dialect Adaptation Matrix ──────────────────────────
console.log('  Check 56.3: Verifying L1 Substratum dialect adaptation matrix & pedagogical nuances...');
const profileTabPath = path.join(ROOT, 'src', 'components', 'settings', 'ProfileSettingsTab.tsx');
assert(fs.existsSync(profileTabPath), 'ProfileSettingsTab.tsx must exist');
const profileContent = fs.readFileSync(profileTabPath, 'utf8');

assert(
  profileContent.includes('L1 Substratum & Penyesuaian Dialek Daerah') &&
  profileContent.includes("'none'") &&
  profileContent.includes("'javanese'") &&
  profileContent.includes("'sundanese'") &&
  profileContent.includes("'batak'"),
  'ProfileSettingsTab must declare all 4 L1 substrata (none, javanese, sundanese, batak)'
);

assert(
  profileContent.includes('unggah-ungguh') &&
  profileContent.includes('krama inggil') &&
  profileContent.includes('undak-usuk basa') &&
  profileContent.includes('mah/teh'),
  'ProfileSettingsTab must document regional pedagogical contrasts for Indonesian native speakers'
);

console.log('  ✅ Check 56.3 passed: L1 Substratum adaptation matrix verified.');

// ── Check 4: DailyGoalSelector Commitment Tiers & Sanitization ───────────────
console.log('  Check 56.4: Verifying DailyGoalSelector commitment tiers & safe number sanitization...');
const goalSelectorPath = path.join(ROOT, 'src', 'components', 'settings', 'DailyGoalSelector.tsx');
assert(fs.existsSync(goalSelectorPath), 'DailyGoalSelector.tsx must exist');
const goalContent = fs.readFileSync(goalSelectorPath, 'utf8');

assert(
  goalContent.includes('DAILY_GOAL_TIERS') &&
  goalContent.includes('xp: 30') &&
  goalContent.includes('xp: 50') &&
  goalContent.includes('xp: 100') &&
  goalContent.includes('xp: 200'),
  'DailyGoalSelector must declare 4 daily commitment tiers (30, 50, 100, 200)'
);

assert(
  goalContent.includes('safeTodayXP = Math.max(0, Number.isFinite(todayXP) ? todayXP : 0)') &&
  goalContent.includes('safeGoalXP = Math.max(1, Number.isFinite(dailyGoalXP) ? dailyGoalXP : 50)') &&
  goalContent.includes('safePercent = Math.min(100, Math.max(0,'),
  'DailyGoalSelector must defensively sanitize live metrics against NaN, undefined and negatives'
);

console.log('  ✅ Check 56.4 passed: Daily goal commitment tiers verified.');

// ── Check 5: LearnerMasteryReport Domain Aggregation & FSRS Health ────────────
console.log('  Check 56.5: Verifying LearnerMasteryReport multi-domain aggregation & FSRS math...');
const masteryPath = path.join(ROOT, 'src', 'components', 'settings', 'LearnerMasteryReport.tsx');
assert(fs.existsSync(masteryPath), 'LearnerMasteryReport.tsx must exist');
const masteryContent = fs.readFileSync(masteryPath, 'utf8');

assert(
  masteryContent.includes("cards && typeof cards === 'object' ? cards : {}") &&
  masteryContent.includes("trackProgress && typeof trackProgress === 'object'") &&
  masteryContent.includes('fsrsForgettingCurve(card.elapsed_days || 0, card.stability)'),
  'LearnerMasteryReport must defensively guard data stores and compute canonical FSRS retrievability'
);

assert(
  masteryContent.includes('sswVocabCount') &&
  masteryContent.includes('kanjiCardsCount') &&
  masteryContent.includes('grammarCardsCount') &&
  masteryContent.includes('totalCards'),
  'LearnerMasteryReport must aggregate all 4 core competency domains'
);

const badgeShowcasePath = path.join(ROOT, 'src', 'components', 'settings', 'AchievementsBadgeShowcase.tsx');
assert(fs.existsSync(badgeShowcasePath), 'AchievementsBadgeShowcase.tsx must exist');
const badgeShowcaseContent = fs.readFileSync(badgeShowcasePath, 'utf8');
assert(
  badgeShowcaseContent.includes('safeBadges.length') &&
  badgeShowcaseContent.includes('Array.isArray(badges) ? badges : []'),
  'AchievementsBadgeShowcase must defensively reference safeBadges.length'
);

console.log('  ✅ Check 56.5 passed: LearnerMasteryReport domain aggregation and FSRS health verified.');

console.log('\n🎉 ALL PASS 10 (SUITE 197) SETTINGS & PROFILE TESTS PASSED 100% GREEN!\n');
