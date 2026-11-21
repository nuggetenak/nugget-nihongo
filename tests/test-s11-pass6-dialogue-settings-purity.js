// ══════════════════════════════════════════════════════════════════
//  test-s11-pass6-dialogue-settings-purity.js
//  Siklus XI — Pass 6: DialogueStage & Settings Purity Verification
// ══════════════════════════════════════════════════════════════════

import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ ${message}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failed++;
  }
}

console.log('🧪 Starting Siklus XI — Pass 6: DialogueStage & Settings Purity Verification...\n');

// ── Check 6.1: DialogueStage Utterances & Toolbar Flattening ──
console.log('📋 Check 6.1: DialogueStage Utterances & Toolbar Flattening');
const dialoguePath = resolve('src/components/curriculum/player/DialogueStage.tsx');
assert(existsSync(dialoguePath), 'DialogueStage.tsx exists');
const dialogueContent = readFileSync(dialoguePath, 'utf8');

assert(
  !dialogueContent.includes('flex flex-wrap items-center justify-between gap-2 p-3 rounded-2xl bg-surface border border-border text-xs shadow-xs'),
  'DialogueStage has eliminated rounded-2xl border container on audio control toolbar'
);
assert(
  dialogueContent.includes('flex flex-wrap items-center justify-between gap-2 p-2.5 sm:p-3 rounded-xl bg-surface-2/40 text-xs shadow-xs'),
  'DialogueStage toolbar uses sleek borderless surface-2 container'
);
assert(
  !dialogueContent.includes('flex items-start gap-3 p-4 sm:p-5 rounded-2xl border transition-all duration-200'),
  'DialogueStage has eliminated rounded-2xl border card container on speech utterances'
);
assert(
  dialogueContent.includes('flex items-start gap-3 p-3.5 sm:p-4 rounded-xl transition-all duration-200'),
  'DialogueStage speech utterances use native conversational rounded-xl layout'
);

// ── Check 6.2: LearnerIdentityCard Hairline Dividers ──
console.log('\n📋 Check 6.2: LearnerIdentityCard Hairline Dividers');
const identityPath = resolve('src/components/settings/LearnerIdentityCard.tsx');
assert(existsSync(identityPath), 'LearnerIdentityCard.tsx exists');
const identityContent = readFileSync(identityPath, 'utf8');

assert(
  !identityContent.includes('p-4 rounded-xl bg-surface-2/40 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4'),
  'LearnerIdentityCard has eliminated nested rounded-xl on Gelar Kemahiran banner'
);
assert(
  identityContent.includes('p-4 border-t border-border flex flex-col') ||
  identityContent.includes('p-4 bg-surface-2/40 border-t border-border flex flex-col'),
  'LearnerIdentityCard Gelar Kemahiran banner uses clean hairline border-t divider'
);
assert(
  !identityContent.includes('p-4 sm:p-5 rounded-xl bg-surface-2/40 border-t border-border space-y-4 animate-in fade-in duration-200'),
  'LearnerIdentityCard has eliminated nested rounded-xl on avatar picker drawer'
);
assert(
  identityContent.includes('p-4 sm:p-5 bg-surface-2/40 border-t border-border space-y-4 animate-in fade-in duration-200'),
  'LearnerIdentityCard avatar drawer uses clean hairline border-t divider'
);

// ── Check 6.3: ProfileSettingsTab Borderless Tiles ──
console.log('\n📋 Check 6.3: ProfileSettingsTab Borderless Tiles');
const profileTabPath = resolve('src/components/settings/ProfileSettingsTab.tsx');
assert(existsSync(profileTabPath), 'ProfileSettingsTab.tsx exists');
const profileTabContent = readFileSync(profileTabPath, 'utf8');

assert(
  !profileTabContent.includes('p-3.5 sm:p-4 rounded-xl bg-surface-2/60 border border-accent/15 space-y-2'),
  'ProfileSettingsTab has eliminated redundant border on language switcher tile'
);
assert(
  profileTabContent.includes('p-3.5 sm:p-4 rounded-xl bg-surface-2/60 space-y-2'),
  'ProfileSettingsTab language switcher uses borderless surface-2 tile'
);
assert(
  !profileTabContent.includes('p-3.5 sm:p-4 rounded-xl bg-surface-2/60 border border-accent/15 flex flex-col justify-center space-y-2'),
  'ProfileSettingsTab has eliminated redundant border on interactive guide tile'
);
assert(
  profileTabContent.includes('p-3.5 sm:p-4 rounded-xl bg-surface-2/60 flex flex-col justify-center space-y-2'),
  'ProfileSettingsTab interactive guide uses borderless surface-2 tile'
);

// ── Check 6.4: AboutPage & HomePage Purity ──
console.log('\n📋 Check 6.4: AboutPage & HomePage Purity');
const aboutPath = resolve('src/pages/AboutPage.tsx');
assert(existsSync(aboutPath), 'AboutPage.tsx exists');
const aboutContent = readFileSync(aboutPath, 'utf8');

assert(
  aboutContent.includes('divide-y divide-border rounded-xl overflow-hidden'),
  'AboutPage FAQ accordion uses pure borderless hairline divider'
);

const homePath = resolve('src/pages/HomePage.tsx');
assert(existsSync(homePath), 'HomePage.tsx exists');
const homeContent = readFileSync(homePath, 'utf8');

assert(
  homeContent.includes('p-3.5 rounded-r-lg bg-amber-500/10 border-l-4 border-accent text-xs space-y-1.5'),
  'HomePage Can-Do summary employs dedicated accent callout strip'
);

console.log('\n══════════════════════════════════════════════════════════════════');
if (failed === 0) {
  console.log(`🎉 PASSED: All ${passed} checks in Siklus XI — Pass 6 verified 100% GREEN (Exit Code 0)!`);
  process.exit(0);
} else {
  console.error(`💥 FAILED: ${failed} checks failed in Siklus XI — Pass 6!`);
  process.exit(1);
}
