/**
 * test-s3-pass9-gamification-network-banners.js
 * Verification suite for Siklus III — Pass 9:
 * Gamification Rewards, Streak Rescue, Dynamic Badges & PWA Network Banners
 */

import fs from 'fs';
import path from 'path';
import assert from 'assert';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

console.log('--- RUNNING SIKLUS III PASS 9: GAMIFICATION & NETWORK BANNERS TEST SUITE ---');

// Check 9.1: BadgesModal.tsx - Irasutoya hanko_excellent, card-interactive-lift, touch targets
{
  const filePath = path.join(projectRoot, 'src/components/gamification/BadgesModal.tsx');
  const code = fs.readFileSync(filePath, 'utf8');

  assert(code.includes('IrasutoyaImage'), 'Check 9.1 Failed: BadgesModal must import IrasutoyaImage');
  assert(code.includes('assetId="hanko_excellent"'), 'Check 9.1 Failed: BadgesModal must render hanko_excellent asset');
  assert(code.includes('animatePop'), 'Check 9.1 Failed: BadgesModal must apply animatePop animation to Hanko stamp');
  assert(code.includes('card-interactive-lift'), 'Check 9.1 Failed: BadgesModal must apply card-interactive-lift on badge items');
  assert(code.includes('min-h-[44px]') && code.includes('min-w-[44px]'), 'Check 9.1 Failed: BadgesModal close button must satisfy >= 40px touch targets');
  console.log('✅ Check 9.1 Passed: BadgesModal contains Irasutoya Hanko stamp, card-interactive-lift, and ergonomic touch targets.');
}

// Check 9.2: StreakBrokenModal.tsx - card-interactive-lift, touch targets >= 44px, WCAG AA contrast tokens
{
  const filePath = path.join(projectRoot, 'src/components/gamification/StreakBrokenModal.tsx');
  const code = fs.readFileSync(filePath, 'utf8');

  assert(code.includes('card-interactive-lift'), 'Check 9.2 Failed: StreakBrokenModal must apply card-interactive-lift on tip quote card');
  assert(code.includes('min-h-[44px]') && code.includes('active:scale-95'), 'Check 9.2 Failed: StreakBrokenModal CTA must satisfy >= 44px touch targets with active:scale-95');
  assert(code.includes('text-amber-900 dark:text-amber-200'), 'Check 9.2 Failed: StreakBrokenModal must enforce WCAG AA dual-theme contrast tokens');
  console.log('✅ Check 9.2 Passed: StreakBrokenModal has card-interactive-lift, high-contrast tip callout, and >= 44px CTA button.');
}

// Check 9.3: HeatmapCalendar.tsx - Irasutoya senpai_studying, card-interactive-lift, WCAG AA contrast tokens
{
  const filePath = path.join(projectRoot, 'src/components/gamification/HeatmapCalendar.tsx');
  const code = fs.readFileSync(filePath, 'utf8');

  assert(code.includes('IrasutoyaImage'), 'Check 9.3 Failed: HeatmapCalendar must import IrasutoyaImage');
  assert(code.includes('assetId="senpai_studying"'), 'Check 9.3 Failed: HeatmapCalendar must render senpai_studying asset');
  assert(code.includes('animateFloat'), 'Check 9.3 Failed: HeatmapCalendar must animate senpai_studying asset');
  assert(code.includes('card-interactive-lift'), 'Check 9.3 Failed: HeatmapCalendar must apply card-interactive-lift');
  assert(code.includes('text-amber-800 dark:text-amber-400') && code.includes('font-extrabold'), 'Check 9.3 Failed: HeatmapCalendar active days count must use high-contrast tokens');
  console.log('✅ Check 9.3 Passed: HeatmapCalendar has Irasutoya study senpai, card-interactive-lift, and high-contrast counters.');
}

// Check 9.4: OfflineBanner.tsx - Irasutoya daruma_recovery & hanko_excellent, card-interactive-lift, WCAG AA dual-theme contrast
{
  const filePath = path.join(projectRoot, 'src/components/ui/OfflineBanner.tsx');
  const code = fs.readFileSync(filePath, 'utf8');

  assert(code.includes('IrasutoyaImage'), 'Check 9.4 Failed: OfflineBanner must import IrasutoyaImage');
  assert(code.includes('assetId="daruma_recovery"'), 'Check 9.4 Failed: OfflineBanner must render daruma_recovery asset on offline warning');
  assert(code.includes('assetId="hanko_excellent"'), 'Check 9.4 Failed: OfflineBanner must render hanko_excellent asset on online toast');
  assert(code.includes('card-interactive-lift'), 'Check 9.4 Failed: OfflineBanner must apply card-interactive-lift on banners');
  assert(code.includes('text-amber-950 dark:text-amber-300'), 'Check 9.4 Failed: OfflineBanner must use WCAG AA contrast tokens for offline state');
  assert(code.includes('text-emerald-950 dark:text-emerald-300'), 'Check 9.4 Failed: OfflineBanner must use WCAG AA contrast tokens for online state');
  console.log('✅ Check 9.4 Passed: OfflineBanner renders authentic Daruma/Hanko assets, card-interactive-lift, and WCAG AA contrast tokens.');
}

// Check 9.5: UpdatePromptToast.tsx & SyncStatusPill.tsx - Irasutoya senpai_studying, card-interactive-lift, touch ergonomics
{
  const updatePromptPath = path.join(projectRoot, 'src/components/ui/UpdatePromptToast.tsx');
  const updateCode = fs.readFileSync(updatePromptPath, 'utf8');
  assert(updateCode.includes('IrasutoyaImage'), 'Check 9.5 Failed: UpdatePromptToast must import IrasutoyaImage');
  assert(updateCode.includes('assetId="senpai_studying"'), 'Check 9.5 Failed: UpdatePromptToast must render senpai_studying asset');
  assert(updateCode.includes('card-interactive-lift'), 'Check 9.5 Failed: UpdatePromptToast must apply card-interactive-lift');
  assert(updateCode.includes('min-h-[40px]') && updateCode.includes('active:scale-95'), 'Check 9.5 Failed: UpdatePromptToast action button must satisfy >= 40px touch targets');

  const syncPillPath = path.join(projectRoot, 'src/components/ui/SyncStatusPill.tsx');
  const syncCode = fs.readFileSync(syncPillPath, 'utf8');
  assert(syncCode.includes('IrasutoyaImage'), 'Check 9.5 Failed: SyncStatusPill must import IrasutoyaImage');
  assert(syncCode.includes('assetId="senpai_studying"'), 'Check 9.5 Failed: SyncStatusPill modal must render senpai_studying asset');
  assert(syncCode.includes('card-interactive-lift'), 'Check 9.5 Failed: SyncStatusPill modal must apply card-interactive-lift on telemetry cards');
  assert(syncCode.includes('min-h-[44px]') && syncCode.includes('active:scale-95'), 'Check 9.5 Failed: SyncStatusPill modal buttons must satisfy >= 44px touch targets');
  console.log('✅ Check 9.5 Passed: UpdatePromptToast and SyncStatusPill have card-interactive-lift, Irasutoya study senpai, and touch targets >= 40px.');
}

console.log('🎉 ALL SIKLUS III PASS 9 CHECKS PASSED (5/5)!');
