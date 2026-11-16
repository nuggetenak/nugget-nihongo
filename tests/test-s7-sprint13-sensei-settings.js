// ══════════════════════════════════════════════════════════════════
//  test-s7-sprint13-sensei-settings.js
//  Sprint 13: Tab 4 Sensei AI & Tab 5 Settings Modularization
// ══════════════════════════════════════════════════════════════════

import assert from 'assert';
import fs from 'fs';
import path from 'path';

console.log('⚡ Running Suite 154: Tab 4 Sensei AI & Tab 5 Settings Modularization Verification...');

const ROOT = process.cwd().includes('nugget-nihongo')
  ? process.cwd()
  : path.join(process.cwd(), 'nugget-nihongo');

// ── Check 13.1: SenseiPage AI Architecture & Multi-Persona Engine ─────
console.log('  Check 13.1: Verifying SenseiPage AI Architecture & Persona Engine...');
const senseiPath = path.join(ROOT, 'src', 'pages', 'SenseiPage.tsx');
assert(fs.existsSync(senseiPath), 'SenseiPage.tsx must exist');
const senseiContent = fs.readFileSync(senseiPath, 'utf8');

assert(
  senseiContent.includes('export const SenseiPage'),
  'SenseiPage.tsx must export SenseiPage component'
);
assert(
  senseiContent.includes('sensei_nugget') && senseiContent.includes('senpai_aoi'),
  'SenseiPage must support multiple personas (Sensei Nugget and Senpai Aoi)'
);
assert(
  senseiContent.includes("'explain'") && senseiContent.includes("'roleplay'") && senseiContent.includes("'correct'"),
  'SenseiPage must support 3 distinct interaction modes: explain, roleplay, correct'
);
assert(
  senseiContent.includes('ROLEPLAY_SCENARIOS') &&
  senseiContent.includes('EXPLAIN_PROMPTS') &&
  senseiContent.includes('CORRECT_PROMPTS'),
  'SenseiPage must provide pre-configured quick starter prompts and roleplay scenarios'
);
console.log('  ✅ Check 13.1 passed: SenseiPage multi-persona engine verified.');

// ── Check 13.2: Voice Manager, Audio Pronunciation & Clear Dialog ────
console.log('  Check 13.2: Verifying Voice Manager, Pronunciation & Modal Safety...');
assert(
  senseiContent.includes('speakPersona') && senseiContent.includes('stopPersonaVoice'),
  'SenseiPage must integrate speakPersona and stopPersonaVoice for authentic pronunciation'
);
assert(
  senseiContent.includes('useBodyScrollLock'),
  'SenseiPage must lock body scroll when clear confirmation modal is open'
);
assert(
  senseiContent.includes("e.key === 'Escape'"),
  'SenseiPage must close confirmation dialog on Escape key for a11y'
);
assert(
  senseiContent.includes('pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12'),
  'SenseiPage must provide safe-area padding for bottom navigation'
);
console.log('  ✅ Check 13.2 passed: Audio voice manager and accessible modal verified.');

// ── Check 13.3: SettingsPage Architecture & Hash Sub-Routing ─────────
console.log('  Check 13.3: Verifying SettingsPage Sub-Routing & Tabbed Architecture...');
const settingsPath = path.join(ROOT, 'src', 'pages', 'SettingsPage.tsx');
assert(fs.existsSync(settingsPath), 'SettingsPage.tsx must exist');
const settingsContent = fs.readFileSync(settingsPath, 'utf8');

assert(
  settingsContent.includes('export const SettingsPage'),
  'SettingsPage.tsx must export SettingsPage component'
);
assert(
  settingsContent.includes('#settings/profil') &&
  settingsContent.includes('#settings/audio') &&
  settingsContent.includes('#settings/sync') &&
  settingsContent.includes('#settings/lanjutan'),
  'SettingsPage must wire URL hash sub-routing for 4 sub-tabs'
);
assert(
  settingsContent.includes('window.addEventListener(\'hashchange\', handleHash)'),
  'SettingsPage must listen to hashchange events for browser back/forward ergonomics'
);
assert(
  settingsContent.includes('document.documentElement.style.fontSize ='),
  'SettingsPage must implement non-destructive rem text scaling'
);
console.log('  ✅ Check 13.3 passed: SettingsPage hash sub-routing verified.');

// ── Check 13.4: Modular Settings Sub-Tabs Decomposition ───────────────
console.log('  Check 13.4: Verifying Modular Settings Sub-Tabs Decomposition...');
const settingsTabsDir = path.join(ROOT, 'src', 'components', 'settings');
assert(fs.existsSync(settingsTabsDir), 'src/components/settings directory must exist');

const requiredTabs = [
  'ProfileSettingsTab.tsx',
  'AudioSettingsTab.tsx',
  'SyncSettingsTab.tsx',
  'AdvancedSettingsTab.tsx',
];

for (const tabFile of requiredTabs) {
  const filePath = path.join(settingsTabsDir, tabFile);
  assert(fs.existsSync(filePath), `${tabFile} must exist in src/components/settings`);
  const content = fs.readFileSync(filePath, 'utf8');
  const compName = tabFile.replace('.tsx', '');
  assert(
    content.includes(`export const ${compName}`),
    `${tabFile} must export ${compName}`
  );
}

// Verify ResetConfirmationModal exists
const resetModalPath = path.join(ROOT, 'src', 'components', 'modals', 'ResetConfirmationModal.tsx');
assert(fs.existsSync(resetModalPath), 'ResetConfirmationModal.tsx must exist');
const resetModalContent = fs.readFileSync(resetModalPath, 'utf8');
assert(
  resetModalContent.includes('export const ResetConfirmationModal'),
  'ResetConfirmationModal must export ResetConfirmationModal component'
);

console.log('  ✅ Check 13.4 passed: All 4 Settings sub-tabs and reset modal verified.');

console.log('🎉 Suite 154: Tab 4 Sensei AI & Tab 5 Settings Modularization 100% GREEN!\n');
process.exit(0);
