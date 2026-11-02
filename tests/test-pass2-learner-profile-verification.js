// ══════════════════════════════════════════════════════════════════
//  test-pass2-learner-profile-verification.js
//  PASS 2 Forensic Verification Suite: "Pusat Rapor Pembelajar" & Settings Subsystem
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

const ROOT_DIR = path.resolve(__dirname, '..');

function main() {
  console.log('\n=============================================================');
  console.log('🏛️  RUNNING PASS 2: PUSAT RAPOR PEMBELAJAR & SETTINGS AUDIT');
  console.log('=============================================================\n');

  const settingsPagePath = path.join(ROOT_DIR, 'src/pages/SettingsPage.tsx');
  const profileTabPath = path.join(ROOT_DIR, 'src/components/settings/ProfileSettingsTab.tsx');
  const identityCardPath = path.join(ROOT_DIR, 'src/components/settings/LearnerIdentityCard.tsx');
  const goalSelectorPath = path.join(ROOT_DIR, 'src/components/settings/DailyGoalSelector.tsx');
  const masteryReportPath = path.join(ROOT_DIR, 'src/components/settings/LearnerMasteryReport.tsx');
  const badgeShowcasePath = path.join(ROOT_DIR, 'src/components/settings/AchievementsBadgeShowcase.tsx');
  const authStorePath = path.join(ROOT_DIR, 'src/lib/supabase/authStore.ts');
  const backupManagerPath = path.join(ROOT_DIR, 'src/lib/storage/backupManager.ts');

  const settingsCode = fs.readFileSync(settingsPagePath, 'utf8');
  const profileCode = fs.readFileSync(profileTabPath, 'utf8');
  const identityCode = fs.readFileSync(identityCardPath, 'utf8');
  const goalCode = fs.readFileSync(goalSelectorPath, 'utf8');
  const reportCode = fs.readFileSync(masteryReportPath, 'utf8');
  const badgeCode = fs.readFileSync(badgeShowcasePath, 'utf8');
  const authCode = fs.readFileSync(authStorePath, 'utf8');
  const backupCode = fs.readFileSync(backupManagerPath, 'utf8');

  // ── 1. Learner Identity & Custom Avatar ──
  test('P2.1: LearnerIdentityCard supports custom display name editing and cultural avatars', () => {
    assert(fs.existsSync(identityCardPath), 'LearnerIdentityCard.tsx must exist');
    assert(identityCode.includes('isEditingName'), 'Must support name editing mode');
    assert(identityCode.includes('onSaveDisplayName'), 'Must support onSaveDisplayName handler');
    assert(identityCode.includes('Gelar Kemahiran'), 'Must display Gelar Kemahiran');
    assert(identityCode.includes('nextLevelProgress.percent'), 'Must render next level progress bar');
    assert(identityCode.includes('CULTURAL_AVATARS'), 'Must export CULTURAL_AVATARS array');

    // Verify all 9 cultural avatars
    const requiredAvatars = ['daruma', 'manekineko', 'samurai', 'sakura', 'fuji', 'origami', 'tanuki', 'kitsune', 'shinkansen'];
    for (const a of requiredAvatars) {
      assert(identityCode.includes(`id: '${a}'`), `Must include cultural avatar '${a}'`);
    }

    // Verify custom emoji/URL support
    assert(identityCode.includes('customUrlInput'), 'Must support custom avatar URL/emoji input');
  });

  test('P2.2: authStore and backupManager persist custom display name and avatar', () => {
    assert(authCode.includes('customDisplayName'), 'authStore must have customDisplayName');
    assert(authCode.includes('customAvatar'), 'authStore must have customAvatar');
    assert(authCode.includes('setCustomDisplayName'), 'authStore must have setCustomDisplayName');
    assert(authCode.includes('setCustomAvatar'), 'authStore must have setCustomAvatar');
    assert(authCode.includes("'nn_display_name'"), 'authStore must persist to nn_display_name');
    assert(authCode.includes("'nn_custom_avatar'"), 'authStore must persist to nn_custom_avatar');

    assert(backupCode.includes("'nn_display_name'"), 'backupManager must whitelist nn_display_name');
    assert(backupCode.includes("'nn_custom_avatar'"), 'backupManager must whitelist nn_custom_avatar');
  });

  // ── 2. Customizable Daily XP Target ──
  test('P2.3: DailyGoalSelector supports 4 preset tiers (Santai, Standar, Serius, Intensif) and binds to dailyGoalXP', () => {
    assert(fs.existsSync(goalSelectorPath), 'DailyGoalSelector.tsx must exist');
    assert(goalCode.includes('DAILY_GOAL_TIERS'), 'Must declare DAILY_GOAL_TIERS');
    assert(goalCode.includes('xp: 30'), 'Must include 30 XP Santai tier');
    assert(goalCode.includes('xp: 50'), 'Must include 50 XP Standar tier');
    assert(goalCode.includes('xp: 100'), 'Must include 100 XP Serius tier');
    assert(goalCode.includes('xp: 200'), 'Must include 200 XP Intensif tier');
    assert(goalCode.includes('onSelectGoal'), 'Must support onSelectGoal trigger');
    assert(profileCode.includes('<DailyGoalSelector'), 'ProfileSettingsTab must render DailyGoalSelector');
  });

  // ── 3. Visual Learner Mastery Report (Rapor Kemahiran Visual) ──
  test('P2.4: LearnerMasteryReport visualizes JLPT N5-N1, SSW vocab, Kanji, Bunpou, and FSRS retention health', () => {
    assert(fs.existsSync(masteryReportPath), 'LearnerMasteryReport.tsx must exist');
    assert(reportCode.includes('JLPT Kemajuan') || reportCode.includes('Kemajuan Kurikulum JLPT') || reportCode.includes('jlptLevelsData'), 'Must render JLPT level progression');
    assert(reportCode.includes('sswVocabCount'), 'Must compute SSW vocational vocab count');
    assert(reportCode.includes('kanjiCardsCount'), 'Must compute total kanji count');
    assert(reportCode.includes('grammarCardsCount'), 'Must compute grammar patterns count');
    assert(reportCode.includes('fsrsForgettingCurve'), 'Must calculate FSRS retention with fsrsForgettingCurve');
    assert(reportCode.includes('avgRetentionRate'), 'Must display average retention rate');
    assert(reportCode.includes('Grace Window (36h)') || reportCode.includes('Perlindungan 36 Jam'), 'Must display 36-hour grace window status');
    assert(profileCode.includes('<LearnerMasteryReport'), 'ProfileSettingsTab must render LearnerMasteryReport');
  });

  // ── 4. Milestone Achievements & Badges Showcase ──
  test('P2.5: AchievementsBadgeShowcase renders categories and explicit unlocking criteria', () => {
    assert(fs.existsSync(badgeShowcasePath), 'AchievementsBadgeShowcase.tsx must exist');
    assert(badgeCode.includes('selectedCategory'), 'Must support category filtering');
    assert(badgeCode.includes('Terkunci'), 'Must render locked badge state');
    assert(badgeCode.includes('Terbuka'), 'Must render unlocked badge state');
    assert(badgeCode.includes('earnedCount'), 'Must compute earned badges count');
    assert(profileCode.includes('<AchievementsBadgeShowcase'), 'ProfileSettingsTab must render AchievementsBadgeShowcase');
  });

  // ── 5. Settings Sub-Navigation Cleanse & Hash Routing ──
  test('P2.6: SettingsPage.tsx provides clean sub-navigation tabs and dialek hash routing', () => {
    assert(settingsCode.includes("label: 'Rapor & Profil'"), "Tab 1 must be labeled 'Rapor & Profil'");
    assert(settingsCode.includes("label: 'Audio & Fonetik'"), "Tab 2 must be labeled 'Audio & Fonetik'");
    assert(settingsCode.includes("label: 'Akun & Cloud'"), "Tab 3 must be labeled 'Akun & Cloud'");
    assert(settingsCode.includes("label: 'Lanjutan'"), "Tab 4 must be labeled 'Lanjutan'");
    assert(settingsCode.includes("hash.includes('dialek')"), 'SettingsPage must support #settings/dialek hash route');
    assert(settingsCode.includes("type SettingsTab = 'profil' | 'audio' | 'sync' | 'lanjutan';"), 'Preserves SettingsTab contract');

    const lineCount = settingsCode.split('\n').length;
    assert(lineCount < 600, `SettingsPage.tsx must stay < 600 lines, currently ${lineCount} lines`);
  });

  // ── 6. Anti-Microfont & Legibility Verification ──
  test('P2.7: Purged all text-[10px] and text-[11px] microfonts across settings subsystem', () => {
    const filesToAudit = [
      settingsPagePath,
      profileTabPath,
      identityCardPath,
      goalSelectorPath,
      masteryReportPath,
      badgeShowcasePath,
      path.join(ROOT_DIR, 'src/components/settings/AudioSettingsTab.tsx'),
      path.join(ROOT_DIR, 'src/components/settings/SyncSettingsTab.tsx'),
      path.join(ROOT_DIR, 'src/components/settings/AdvancedSettingsTab.tsx'),
    ];

    for (const f of filesToAudit) {
      const code = fs.readFileSync(f, 'utf8');
      assert(!code.includes('text-[10px]'), `${path.basename(f)} must not contain text-[10px]`);
      assert(!code.includes('text-[11px]'), `${path.basename(f)} must not contain text-[11px]`);
    }
  });

  console.log('\n-------------------------------------------------------------');
  console.log(`📊 PASS 2 AUDIT RESULTS: ${passedTests} / ${totalTests} CHECKS PASSED`);
  console.log('-------------------------------------------------------------\n');

  if (passedTests === totalTests) {
    console.log('🌟 PASS 2 "PUSAT RAPOR PEMBELAJAR" 100% VERIFIED!\n');
    process.exit(0);
  } else {
    console.error('💥 PASS 2 VERIFICATION FAILED!\n');
    process.exit(1);
  }
}

main();
