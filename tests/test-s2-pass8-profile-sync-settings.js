// ══════════════════════════════════════════════════════════════════
//  tests/test-s2-pass8-profile-sync-settings.js
//  Siklus II — Pass 8: User Profile, FSRS Kebun Sync, Export/Import & Settings
// ══════════════════════════════════════════════════════════════════

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

console.log('🧪 Starting Siklus II — Pass 8: User Profile, FSRS Kebun Sync & Settings Verification...\n');

let failedTests = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ ${message}`);
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failedTests++;
  }
}

// ──────────────────────────────────────────────────────────────────
// Check 8.1: LearnerMasteryReport Clean-State FSRS Retention Integrity
// ──────────────────────────────────────────────────────────────────
console.log('📋 Check 8.1: LearnerMasteryReport Ghost 90% Retention Eradication');
const reportPath = path.join(ROOT_DIR, 'src', 'components', 'settings', 'LearnerMasteryReport.tsx');
assert(fs.existsSync(reportPath), 'src/components/settings/LearnerMasteryReport.tsx exists');
const reportContent = fs.readFileSync(reportPath, 'utf8');

assert(
  reportContent.includes('const hasData = cardCountWithStability > 0;') &&
  reportContent.includes(': 0;') &&
  reportContent.includes("status = 'Belum Ada Kartu';") &&
  reportContent.includes("badgeClass = 'bg-surface-3 text-appText-muted border-accent/15';"),
  'LearnerMasteryReport cleanly sets retention = 0 and status = "Belum Ada Kartu" when cardCountWithStability === 0'
);

assert(
  reportContent.includes('{totalCards > 0 && cardCountWithStability > 0 ? `${avgRetentionRate}% · ${healthStatus}` : healthStatus}'),
  'LearnerMasteryReport only displays percentage numbers when cards with stability exist'
);

// ──────────────────────────────────────────────────────────────────
// Check 8.2: LearnerMasteryReport Streak & Badge Contrast Tokens
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 8.2: LearnerMasteryReport WCAG AA Contrast Tokens');
assert(
  reportContent.includes('text-amber-800 dark:text-amber-400 border-amber-500/30 font-bold') &&
  reportContent.includes('text-blue-800 dark:text-blue-400 border-blue-500/30 font-bold'),
  'LearnerMasteryReport streak badges employ high-contrast dual-theme tokens'
);

// ──────────────────────────────────────────────────────────────────
// Check 8.3: AdvancedSettingsTab useBodyScrollLock Integration
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 8.3: AdvancedSettingsTab Background Body Scroll Lock');
const advPath = path.join(ROOT_DIR, 'src', 'components', 'settings', 'AdvancedSettingsTab.tsx');
assert(fs.existsSync(advPath), 'src/components/settings/AdvancedSettingsTab.tsx exists');
const advContent = fs.readFileSync(advPath, 'utf8');

assert(
  advContent.includes("import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';") &&
  advContent.includes('useBodyScrollLock(showExportModal || decryptModalOpen || showClearCacheConfirm);'),
  'AdvancedSettingsTab locks background body scroll when internal dialogs are open'
);

// ──────────────────────────────────────────────────────────────────
// Check 8.4: Touch Target Dimensions (>= 40px) on Dismiss and Expand
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 8.4: Touch Targets (>= 40px) on Modal Dismiss & Expanders');
assert(
  advContent.includes('min-h-[40px] min-w-[40px] rounded-xl flex items-center justify-center text-appText-muted hover:text-appText-bright active:scale-95 transition-all'),
  'AdvancedSettingsTab close buttons meet >= 40x40px touch minimum'
);

const syncPath = path.join(ROOT_DIR, 'src', 'components', 'settings', 'SyncSettingsTab.tsx');
assert(fs.existsSync(syncPath), 'src/components/settings/SyncSettingsTab.tsx exists');
const syncContent = fs.readFileSync(syncPath, 'utf8');

assert(
  syncContent.includes('min-h-[40px] min-w-[40px] rounded-xl hover:bg-surface-2 text-appText-muted transition-all flex items-center justify-center active:scale-95'),
  'SyncSettingsTab accordion expander button enforces >= 40px touch minimum'
);

// ──────────────────────────────────────────────────────────────────
// Check 8.5: SettingsPage Ergonomics & Safe Area Padding Cushion
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 8.5: SettingsPage Safe Area Padding & Sub-Tabs Ergonomics');
const settingsPath = path.join(ROOT_DIR, 'src', 'pages', 'SettingsPage.tsx');
assert(fs.existsSync(settingsPath), 'src/pages/SettingsPage.tsx exists');
const settingsContent = fs.readFileSync(settingsPath, 'utf8');

assert(
  settingsContent.includes('pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12') &&
  settingsContent.includes('overflow-x-hidden'),
  'SettingsPage maintains safe-area bottom cushion and horizontal overflow constraints'
);

assert(
  settingsContent.includes('min-h-[44px] rounded-xl text-xs sm:text-sm font-bold transition-all active:scale-95'),
  'SettingsPage sub-navigation tabs enforce 44px ergonomic touch targets'
);

// ──────────────────────────────────────────────────────────────────
// Summary & Verdict
// ──────────────────────────────────────────────────────────────────
console.log('\n' + '─'.repeat(60));
if (failedTests > 0) {
  console.error(`❌ FAILED: ${failedTests} assertion(s) failed in Siklus II — Pass 8.`);
  process.exit(1);
} else {
  console.log('🎉 PASSED: All 5 checks in Siklus II — Pass 8 verified 100% GREEN (Exit Code 0)!');
  process.exit(0);
}
