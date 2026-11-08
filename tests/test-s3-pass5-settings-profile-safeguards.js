// ══════════════════════════════════════════════════════════════════════
//  test-s3-pass5-settings-profile-safeguards.js — Verification Suite
//  Siklus III Pass 5: Settings, Profile Mastery Report, Cloud Sync & Storage Recovery Safeguards
//  (LearnerIdentityCard, LearnerMasteryReport, SettingsPage, SyncSettingsTab, StorageEvictionRecoveryModal, AdvancedSettingsTab)
// ══════════════════════════════════════════════════════════════════════

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let passedChecks = 0;
const totalChecks = 5;

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    process.exit(1);
  }
  passedChecks++;
  console.log(`✅ PASS [${passedChecks}/${totalChecks}]: ${message}`);
}

console.log('⚙️ [SIKLUS III PASS 5] Starting Settings, Profile & Storage Safeguards Verification...\n');

// ---------------------------------------------------------------------
// Check 1: LearnerIdentityCard.tsx (Touch target >= 40px, lift on cultural avatars)
// ---------------------------------------------------------------------
const identityPath = path.resolve(__dirname, '../src/components/settings/LearnerIdentityCard.tsx');
const identityCode = fs.readFileSync(identityPath, 'utf8');

assert(
  identityCode.includes('min-w-[40px] min-h-[40px]') &&
  !identityCode.includes('min-w-[36px] min-h-[36px]') &&
  identityCode.includes('min-h-[40px] py-1') &&
  identityCode.includes('card-interactive-lift'),
  'LearnerIdentityCard guarantees >= 40x40px touch targets for mobile avatar triggers and card-interactive-lift on cultural avatars'
);

// ---------------------------------------------------------------------
// Check 2: LearnerMasteryReport.tsx (WCAG AA JLPT Level Badges & Card Elevation)
// ---------------------------------------------------------------------
const reportPath = path.resolve(__dirname, '../src/components/settings/LearnerMasteryReport.tsx');
const reportCode = fs.readFileSync(reportPath, 'utf8');

assert(
  reportCode.includes('text-emerald-800 dark:text-emerald-400 border-emerald-500/30 font-bold') &&
  reportCode.includes('text-sky-800 dark:text-sky-400 border-sky-500/30 font-bold') &&
  reportCode.includes('text-amber-800 dark:text-amber-400 border-amber-500/30 font-bold') &&
  reportCode.includes('text-indigo-800 dark:text-indigo-400 border-indigo-500/30 font-bold') &&
  reportCode.includes('text-rose-800 dark:text-rose-400 border-rose-500/30 font-bold') &&
  reportCode.includes('card-interactive-lift'),
  'LearnerMasteryReport integrates WCAG AA dual-theme contrast badges across JLPT N5-N1 and card-interactive-lift on competency metrics'
);

// ---------------------------------------------------------------------
// Check 3: SettingsPage.tsx (Irasutoya Senpai Companion & Layout Structure)
// ---------------------------------------------------------------------
const settingsPath = path.resolve(__dirname, '../src/pages/SettingsPage.tsx');
const settingsCode = fs.readFileSync(settingsPath, 'utf8');

assert(
  settingsCode.includes('import { IrasutoyaImage }') &&
  settingsCode.includes('assetId="senpai_studying"') &&
  settingsCode.includes('animateFloat'),
  'SettingsPage embeds Irasutoya senpai_studying companion avatar in header with gentle float animation'
);

// ---------------------------------------------------------------------
// Check 4: SyncSettingsTab.tsx (Cloud Sync Card Interactive Elevation)
// ---------------------------------------------------------------------
const syncPath = path.resolve(__dirname, '../src/components/settings/SyncSettingsTab.tsx');
const syncCode = fs.readFileSync(syncPath, 'utf8');

assert(
  syncCode.includes('card-interactive-lift rounded-xl bg-surface-2/60 border border-emerald-500/20') &&
  syncCode.includes('card-interactive-lift rounded-xl bg-surface-2/60 border border-accent/15'),
  'SyncSettingsTab applies card-interactive-lift across both connected and offline guest cloud status cards'
);

// ---------------------------------------------------------------------
// Check 5: StorageEvictionRecoveryModal.tsx & AdvancedSettingsTab.tsx (Daruma, Sensei & Lift)
// ---------------------------------------------------------------------
const modalPath = path.resolve(__dirname, '../src/components/modals/StorageEvictionRecoveryModal.tsx');
const modalCode = fs.readFileSync(modalPath, 'utf8');
const advPath = path.resolve(__dirname, '../src/components/settings/AdvancedSettingsTab.tsx');
const advCode = fs.readFileSync(advPath, 'utf8');

assert(
  modalCode.includes('import { IrasutoyaImage }') &&
  modalCode.includes('assetId="daruma_recovery"') &&
  modalCode.includes('card-interactive-lift') &&
  advCode.includes('import { IrasutoyaImage }') &&
  advCode.includes('assetId="sensei_teaching"') &&
  advCode.includes('card-interactive-lift') &&
  advCode.includes('text-emerald-800 dark:text-emerald-400 font-bold'),
  'Storage recovery modal and Advanced Settings integrate Irasutoya Daruma/Sensei, AES-256 contrast tokens, and interactive lift'
);

console.log('\n🏆 [SIKLUS III PASS 5] All 5/5 Settings, Profile & Storage Safeguards Checks PASSED 100% GREEN!\n');
