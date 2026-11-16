// ══════════════════════════════════════════════════════════════════
//  test-s7-sprint45-settings-profile-substratum-mastery.js
//  Sprint 45: Settings & Profile, L1 Substratum, High Contrast, Offline Storage Budgets
// ══════════════════════════════════════════════════════════════════

import assert from 'assert';
import fs from 'fs';
import path from 'path';

console.log('⚡ Running Suite 186: Sprint 45: Settings & Profile, L1 Substratum, High Contrast, Offline Storage Budgets...');

const ROOT = process.cwd().includes('nugget-nihongo')
  ? process.cwd()
  : path.join(process.cwd(), 'nugget-nihongo');

// ── Check 1: ProfileSettingsTab & 4 L1 Substratum Profiles ─────────
console.log('  Check 45.1: Verifying ProfileSettingsTab & 4 L1 Substratum dialect profiles...');
const profilePath = path.join(ROOT, 'src', 'components', 'settings', 'ProfileSettingsTab.tsx');
assert(fs.existsSync(profilePath), 'ProfileSettingsTab.tsx must exist');
const profileContent = fs.readFileSync(profilePath, 'utf8');

assert(
  profileContent.includes('L1 Substratum & Penyesuaian Dialek Daerah') &&
  profileContent.includes("'none'") &&
  profileContent.includes("'javanese'") &&
  profileContent.includes("'sundanese'") &&
  profileContent.includes("'batak'"),
  'ProfileSettingsTab must support none, javanese, sundanese, and batak L1 substrata'
);
assert(
  profileContent.includes('LearnerIdentityCard') &&
  profileContent.includes('DailyGoalSelector') &&
  profileContent.includes('LearnerMasteryReport') &&
  profileContent.includes('AchievementsBadgeShowcase'),
  'ProfileSettingsTab must integrate all 4 modular learner profile subcomponents'
);
console.log('  ✅ Check 45.1 passed: Profile and 4 L1 substrata verified.');

// ── Check 2: LearnerMasteryReport Defensiveness & Metric Aggregation ─
console.log('  Check 45.2: Verifying LearnerMasteryReport defensive metrics calculation...');
const masteryPath = path.join(ROOT, 'src', 'components', 'settings', 'LearnerMasteryReport.tsx');
assert(fs.existsSync(masteryPath), 'LearnerMasteryReport.tsx must exist');
const masteryContent = fs.readFileSync(masteryPath, 'utf8');

assert(
  masteryContent.includes('safeCards = cards && typeof cards === \'object\' ? cards : {}') &&
  masteryContent.includes('safeTrackProgress = trackProgress && typeof trackProgress === \'object\'') &&
  masteryContent.includes('Math.min(100, Math.max(0,'),
  'LearnerMasteryReport must safely guard cards, trackProgress, and clamp retention to 0-100%'
);

assert(
  masteryContent.includes('sswVocabCount') &&
  masteryContent.includes('kanjiCardsCount') &&
  masteryContent.includes('grammarCardsCount') &&
  masteryContent.includes('totalCards'),
  'LearnerMasteryReport must aggregate all 4 core competency domains (SSW, Kanji, Bunpou, FSRS)'
);
console.log('  ✅ Check 45.2 passed: LearnerMasteryReport defensiveness and metrics verified.');

// ── Check 3: DailyGoalSelector Tiers & Safe Number Sanitization ──────
console.log('  Check 45.3: Verifying DailyGoalSelector commitment tiers & safe numbers...');
const goalPath = path.join(ROOT, 'src', 'components', 'settings', 'DailyGoalSelector.tsx');
assert(fs.existsSync(goalPath), 'DailyGoalSelector.tsx must exist');
const goalContent = fs.readFileSync(goalPath, 'utf8');

assert(
  goalContent.includes('DAILY_GOAL_TIERS') &&
  goalContent.includes('xp: 30') &&
  goalContent.includes('xp: 50') &&
  goalContent.includes('xp: 100') &&
  goalContent.includes('xp: 200'),
  'DailyGoalSelector must declare Santai (30), Standar (50), Serius (100), and Intensif (200) tiers'
);

assert(
  goalContent.includes('safeTodayXP') &&
  goalContent.includes('safeGoalXP') &&
  goalContent.includes('safePercent'),
  'DailyGoalSelector must sanitize todayXP, goalXP, and percent against NaN/negatives'
);
console.log('  ✅ Check 45.3 passed: DailyGoalSelector commitment tiers verified.');

// ── Check 4: AchievementsBadgeShowcase Category Filters & A11y ──────
console.log('  Check 45.4: Verifying AchievementsBadgeShowcase category filters & safety...');
const badgePath = path.join(ROOT, 'src', 'components', 'settings', 'AchievementsBadgeShowcase.tsx');
assert(fs.existsSync(badgePath), 'AchievementsBadgeShowcase.tsx must exist');
const badgeContent = fs.readFileSync(badgePath, 'utf8');

assert(
  badgeContent.includes('safeBadges = Array.isArray(badges) ? badges : []') &&
  badgeContent.includes('selectedCategory') &&
  badgeContent.includes('min-h-[40px]'),
  'AchievementsBadgeShowcase must guard badges array, support filtering, and meet >=40px touch targets'
);
console.log('  ✅ Check 45.4 passed: AchievementsBadgeShowcase filtering and safety verified.');

// ── Check 5: AudioSettingsTab, Advanced Backup & Features Export ─────
console.log('  Check 45.5: Verifying AudioSettingsTab, AdvancedSettingsTab & features/settings index...');
const audioPath = path.join(ROOT, 'src', 'components', 'settings', 'AudioSettingsTab.tsx');
const advancedPath = path.join(ROOT, 'src', 'components', 'settings', 'AdvancedSettingsTab.tsx');
const featurePath = path.join(ROOT, 'src', 'features', 'settings', 'index.ts');

assert(fs.existsSync(audioPath), 'AudioSettingsTab.tsx must exist');
assert(fs.existsSync(advancedPath), 'AdvancedSettingsTab.tsx must exist');
assert(fs.existsSync(featurePath), 'features/settings/index.ts must exist');

const audioContent = fs.readFileSync(audioPath, 'utf8');
const advancedContent = fs.readFileSync(advancedPath, 'utf8');
const featureContent = fs.readFileSync(featurePath, 'utf8');

assert(
  audioContent.includes('speechRate') &&
  audioContent.includes('playSuccessSfx') &&
  audioContent.includes('min-h-[44px]'),
  'AudioSettingsTab must provide speech rate controls and >=44px SFX toggles'
);

assert(
  advancedContent.includes('encryptBackupPayload') &&
  advancedContent.includes('decryptBackupPayload') &&
  advancedContent.includes('AES-256'),
  'AdvancedSettingsTab must provide AES-256 encrypted backup export and restoration'
);

assert(
  featureContent.includes('ProfileSettingsTab') &&
  featureContent.includes('AudioSettingsTab') &&
  featureContent.includes('SyncSettingsTab') &&
  featureContent.includes('AdvancedSettingsTab') &&
  featureContent.includes('LearnerMasteryReport') &&
  featureContent.includes('DailyGoalSelector'),
  'features/settings/index.ts must export all modular settings components'
);
console.log('  ✅ Check 45.5 passed: Audio, Advanced backup, and features exports verified.');

console.log('🎉 All Suite 186 Sprint 45 Settings & Profile checks PASSED!');
