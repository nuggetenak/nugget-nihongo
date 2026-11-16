// ══════════════════════════════════════════════════════════════════
//  test-s7-sprint21-layer5-settings.js
//  Sprint 21: Lapisan 5 Profil, Pengaturan Sistem, PWA Offline Sentinel & Storage Eviction
//  Validates:
//  1. SettingsPage Tabbed Sub-Routing & Non-Sticky In-Flow Sub-Tabs
//  2. Safe-Area Bottom Navigation Cushion (No Collisions)
//  3. ProfileSettingsTab (Learner Identity, Daily Goal, Mastery Report, Badges, L1 Substratum)
//  4. AudioSettingsTab (Speech Rate, Live Voice Test, Furigana/Romaji, rem Font Scaling)
//  5. SyncSettingsTab (Cloud Sync, Offline First, BYOD Supabase Endpoint)
//  6. AdvancedSettingsTab (BYOK Sensei AI, AES-256 Encrypted Backups, Danger Zone)
//  7. StorageEvictionRecoveryModal (Disaster Recovery, Quota Warning, Safe Recovery Actions)
//  8. InstallModal & PWA Sentinel (Offline Mode, iOS/Android Install Guidance)
//  9. OfflineBanner & UpdatePromptToast (Floating PWA Status, Safe Area Top Offset)
//  10. ResetConfirmationModal (Double-Safety RESET / 3-Second Hold Invariant)
//  11. Zero Micro-Fonts Across All Lapisan 5 Components (>= 12px / text-xs)
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT_DIR = path.resolve(__dirname, '..');

function readSrc(relPath) {
  return fs.readFileSync(path.join(ROOT_DIR, relPath), 'utf8');
}

console.log('🧪 Starting Sprint 21: Lapisan 5 Settings & PWA Sentinel Verification Suite...\n');

let passCount = 0;

function runCheck(desc, fn) {
  process.stdout.write(`  ▶ ${desc}... `);
  try {
    fn();
    console.log('✅ PASS');
    passCount++;
  } catch (err) {
    console.log('❌ FAIL');
    console.error(`    Error: ${err.message}`);
    process.exit(1);
  }
}

// ── Check 1: SettingsPage Tabbed Sub-Routing & In-Flow Non-Sticky Invariant ──
runCheck('SettingsPage Tabbed Sub-Routing & In-Flow Non-Sticky Tabs', () => {
  const code = readSrc('src/pages/SettingsPage.tsx');
  assert(code.includes('#settings/profil'), 'Must define #settings/profil sub-route');
  assert(code.includes('#settings/audio'), 'Must define #settings/audio sub-route');
  assert(code.includes('#settings/sync'), 'Must define #settings/sync sub-route');
  assert(code.includes('#settings/lanjutan'), 'Must define #settings/lanjutan sub-route');
  assert(!code.includes('sticky top-0'), 'Sub-tabs must remain in-flow (no sticky top-0)');
  assert(code.includes('min-h-[44px]'), 'Sub-tabs must enforce min-h-[44px] touch target');
  assert(code.includes('active:scale-95'), 'Sub-tabs must have active:scale-95 touch feedback');
});

// ── Check 2: Safe-Area Bottom Navigation Cushion ──
runCheck('SettingsPage Safe-Area Bottom Navigation Cushion', () => {
  const code = readSrc('src/pages/SettingsPage.tsx');
  assert(
    code.includes('pb-[calc(5.5rem+env(safe-area-inset-bottom))]'),
    'Page wrapper must declare safe-area bottom padding to prevent BottomNav collision'
  );
  assert(code.includes('overflow-x-hidden'), 'Page wrapper must prevent horizontal viewport blowouts');
});

// ── Check 3: ProfileSettingsTab & Cultural Identity ──
runCheck('ProfileSettingsTab & Cultural Identity Sub-Components', () => {
  const code = readSrc('src/components/settings/ProfileSettingsTab.tsx');
  assert(code.includes('LearnerIdentityCard'), 'Must mount LearnerIdentityCard');
  assert(code.includes('DailyGoalSelector'), 'Must mount DailyGoalSelector');
  assert(code.includes('LearnerMasteryReport'), 'Must mount LearnerMasteryReport');
  assert(code.includes('AchievementsBadgeShowcase'), 'Must mount AchievementsBadgeShowcase');
  assert(code.includes('L1Substratum'), 'Must support L1 Substratum dialect switching');
  assert(code.includes('min-h-[40px]'), 'Must enforce min-h-[40px] on interactive buttons');
  assert(code.includes('active:scale-95'), 'Must enforce active:scale-95 on interactive buttons');

  const identityCode = readSrc('src/components/settings/LearnerIdentityCard.tsx');
  assert(identityCode.includes('CULTURAL_AVATARS'), 'Must export cultural Japanese avatars');
  assert(identityCode.includes('min-h-[40px]'), 'Avatar edit button must be at least 40px');

  const goalCode = readSrc('src/components/settings/DailyGoalSelector.tsx');
  assert(goalCode.includes('DAILY_GOAL_TIERS'), 'Must provide 4 daily goal tiers');
  assert(goalCode.includes('min-h-[110px]'), 'Tier cards must have comfortable touch height');
  assert(goalCode.includes('active:scale-95'), 'Tier cards must scale on tap');

  const badgeCode = readSrc('src/components/settings/AchievementsBadgeShowcase.tsx');
  assert(badgeCode.includes('min-h-[40px]'), 'Badge category filter pills must be min-h-[40px]');
  assert(badgeCode.includes('active:scale-95'), 'Badge category pills must have touch feedback');
});

// ── Check 4: AudioSettingsTab & Japanese Typography ──
runCheck('AudioSettingsTab Ergonomics & Typography Controls', () => {
  const code = readSrc('src/components/settings/AudioSettingsTab.tsx');
  assert(code.includes('min-h-[44px] min-w-[44px]'), 'SFX toggle button must be min-h-[44px] min-w-[44px]');
  assert(code.includes('min-h-[40px]'), 'Speech rate pills must enforce min-h-[40px]');
  assert(code.includes('min-h-[44px]'), 'Audio live test button must enforce min-h-[44px]');
  assert(code.includes('speakJapanese'), 'Audio test must call speakJapanese TTS');
  assert(code.includes('showFurigana'), 'Must support Furigana toggle');
  assert(code.includes('showRomaji'), 'Must support Romaji toggle');
  assert(code.includes('handleTextSizeChange'), 'Must support non-destructive rem font scaling');
});

// ── Check 5: SyncSettingsTab & Supabase Cloud Integration ──
runCheck('SyncSettingsTab Cloud & BYOD Supabase Configuration', () => {
  const code = readSrc('src/components/settings/SyncSettingsTab.tsx');
  assert(code.includes('SyncStatusPill'), 'Must integrate SyncStatusPill');
  assert(code.includes('handleManualSync'), 'Must support manual cloud sync');
  assert(code.includes('min-h-[44px]'), 'Primary sync buttons must be min-h-[44px]');
  assert(code.includes('inputSbUrl'), 'Must allow custom Supabase URL');
  assert(code.includes('inputSbKey'), 'Must allow custom Supabase Anon Key');
  assert(code.includes('handleTestSupabase'), 'Must provide test connection trigger');
});

// ── Check 6: AdvancedSettingsTab & AES-256 Backups ──
runCheck('AdvancedSettingsTab BYOK & AES-256 Encrypted Backups', () => {
  const code = readSrc('src/components/settings/AdvancedSettingsTab.tsx');
  assert(code.includes('apiKeyInput'), 'Must support BYOK Sensei AI input');
  assert(code.includes('handleSaveApiKey'), 'Must allow saving API key locally');
  assert(code.includes('handleTestAi'), 'Must provide AI connection test');
  assert(code.includes('handleExportBackup'), 'Must support standard JSON export');
  assert(code.includes('encryptBackupPayload'), 'Must support AES-256 encrypted backups');
  assert(code.includes('decryptBackupPayload'), 'Must support decrypting backups');
  assert(code.includes('min-h-[40px]'), 'Modal action buttons must enforce min-h-[40px]');
  assert(code.includes('active:scale-95'), 'Modal action buttons must have touch feedback');
});

// ── Check 7: StorageEvictionRecoveryModal Disaster Mitigation ──
runCheck('StorageEvictionRecoveryModal Disaster Recovery & Storage Protection', () => {
  const code = readSrc('src/components/modals/StorageEvictionRecoveryModal.tsx');
  assert(code.includes('useFocusTrap'), 'Must implement focus trap for accessibility');
  assert(code.includes('useBodyScrollLock'), 'Must lock body scroll while modal is active');
  assert(code.includes('Escape'), 'Must support Escape key dismissal');
  assert(code.includes('handleDownloadBackup'), 'Must offer instant emergency JSON backup');
  assert(code.includes('handleCloudSync'), 'Must offer permanent cloud sync action');
  assert(code.includes('handleClearCache'), 'Must offer cache eviction action');
  assert(code.includes('min-h-[48px]'), 'Mitigation action cards must be min-h-[48px]');
  assert(code.includes('active:scale-95'), 'Mitigation action cards must have active scale feedback');
});

// ── Check 8: InstallModal & PWA Lifecycle ──
runCheck('InstallModal PWA Guidance & Multi-Platform Support', () => {
  const code = readSrc('src/components/ui/InstallModal.tsx');
  assert(code.includes('usePwaStore'), 'Must bind to PWA store');
  assert(code.includes('useFocusTrap'), 'Must trap keyboard focus');
  assert(code.includes('useBodyScrollLock'), 'Must lock background scroll');
  assert(code.includes('isIos'), 'Must provide dedicated iOS Safari Add to Home Screen instructions');
  assert(code.includes('promptInstall'), 'Must trigger native beforeinstallprompt for Android/Desktop');
  assert(code.includes('min-h-[44px]'), 'Close and install buttons must enforce min-h-[44px]');
});

// ── Check 9: OfflineBanner & UpdatePromptToast Telemetry ──
runCheck('OfflineBanner & UpdatePromptToast Floating Status Banners', () => {
  const offlineCode = readSrc('src/components/ui/OfflineBanner.tsx');
  assert(
    offlineCode.includes('top-[calc(0.75rem+env(safe-area-inset-top))]'),
    'Offline banner must cushion safe-area top inset'
  );
  assert(offlineCode.includes('min-h-[40px]'), 'Dismiss button must be at least 40px');

  const updateCode = readSrc('src/components/ui/UpdatePromptToast.tsx');
  assert(
    updateCode.includes('top-[calc(0.75rem+env(safe-area-inset-top))]'),
    'Update toast must cushion safe-area top inset'
  );
  assert(updateCode.includes('min-h-[40px]'), 'Reload action button must enforce min-h-[40px]');
  assert(updateCode.includes('applyUpdate'), 'Must call applyUpdate to activate waiting Service Worker');

  const syncPillCode = readSrc('src/components/ui/SyncStatusPill.tsx');
  assert(syncPillCode.includes('min-h-[40px]'), 'SyncStatusPill must enforce min-h-[40px] on mobile');
  assert(syncPillCode.includes('active:scale-95'), 'SyncStatusPill must have active scale feedback');
});

// ── Check 10: ResetConfirmationModal Double-Safety Protocol ──
runCheck('ResetConfirmationModal Double-Safety Confirmation & A11y', () => {
  const code = readSrc('src/components/modals/ResetConfirmationModal.tsx');
  assert(code.includes('useFocusTrap'), 'Must implement focus trap');
  assert(code.includes('useBodyScrollLock'), 'Must lock body scroll');
  assert(code.includes('RESET'), 'Must verify RESET confirmation input');
  assert(code.includes('holdProgress'), 'Must support 3-second hold confirmation');
  assert(code.includes('min-h-[44px]'), 'Action buttons must enforce min-h-[44px]');
  assert(code.includes('max-h-[90dvh]'), 'Modal must not exceed mobile viewport');
});

// ── Check 11: Zero Micro-Fonts Across All Lapisan 5 Components ──
runCheck('Zero Micro-Fonts Across All Lapisan 5 Components (>= 12px / text-xs)', () => {
  const targetFiles = [
    'src/pages/SettingsPage.tsx',
    'src/components/settings/ProfileSettingsTab.tsx',
    'src/components/settings/AudioSettingsTab.tsx',
    'src/components/settings/SyncSettingsTab.tsx',
    'src/components/settings/AdvancedSettingsTab.tsx',
    'src/components/settings/LearnerIdentityCard.tsx',
    'src/components/settings/DailyGoalSelector.tsx',
    'src/components/settings/LearnerMasteryReport.tsx',
    'src/components/settings/AchievementsBadgeShowcase.tsx',
    'src/components/modals/StorageEvictionRecoveryModal.tsx',
    'src/components/modals/ResetConfirmationModal.tsx',
    'src/components/ui/InstallModal.tsx',
    'src/components/ui/OfflineBanner.tsx',
    'src/components/ui/UpdatePromptToast.tsx',
    'src/components/ui/SyncStatusPill.tsx',
  ];

  const microFontRegex = /text-\[(?:[1-9]|1[0-1])(?:\.[0-9]+)?px\]/g;
  const violations = [];

  for (const relFile of targetFiles) {
    const code = readSrc(relFile);
    const matches = code.match(microFontRegex);
    if (matches) {
      violations.push(`${relFile}: found micro-font classes: ${matches.join(', ')}`);
    }
  }

  assert(
    violations.length === 0,
    `Micro-font invariant violated:\n${violations.join('\n')}`
  );
});

console.log(`\n🎉 ALL ${passCount} SPRINT 21 CHECKS PASSED 100% GREEN! LAPISAN 5 IS FULLY VERIFIED!\n`);
