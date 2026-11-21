// ══════════════════════════════════════════════════════════════════
//  tests/test-s11-pass4-settings-choukai-kebun-flattening.js
//  Siklus XI — Pass 4: Settings Sub-Tabs, Choukai Player & Kebun FSRS Flattening
//  Quality Criteria:
//    - Eliminate residual nested card-in-card visual containers across Settings, Choukai, Kebun, and Dialogue
//    - Seamless borderless subtle tiles and hairline list dividers
//    - Zero regressions across historical suites (100% green contract)
// ══════════════════════════════════════════════════════════════════

const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('🧪 Running Suite 213: Siklus XI Pass 4 — Settings, Choukai & Kebun Container Flattening...');

const ROOT = process.cwd().includes('nugget-nihongo')
  ? process.cwd()
  : path.join(process.cwd(), 'nugget-nihongo');

// ── Check 1: AchievementsBadgeShowcase Badge List Items Flattening ───────────
console.log('  Check 213.1: Verifying AchievementsBadgeShowcase badge list items flattening...');
const badgeShowcasePath = path.join(ROOT, 'src', 'components', 'settings', 'AchievementsBadgeShowcase.tsx');
assert(fs.existsSync(badgeShowcasePath), 'AchievementsBadgeShowcase.tsx must exist');
const badgeContent = fs.readFileSync(badgeShowcasePath, 'utf8');

// Badges flattened without outer box borders
assert(
  badgeContent.includes('p-3.5 sm:p-4 rounded-xl transition-all flex items-start gap-3 relative overflow-hidden') &&
  badgeContent.includes('bg-surface-2/40 opacity-75 hover:bg-surface-2/60'),
  'AchievementsBadgeShowcase badge items must be flattened without nested border-in-border styling'
);
console.log('  ✅ Check 213.1 passed: AchievementsBadgeShowcase items flattened.');

// ── Check 2: LearnerMasteryReport JLPT Levels & Competency Metrics ───────────
console.log('  Check 213.2: Verifying LearnerMasteryReport JLPT level list items and competency cards...');
const masteryReportPath = path.join(ROOT, 'src', 'components', 'settings', 'LearnerMasteryReport.tsx');
assert(fs.existsSync(masteryReportPath), 'LearnerMasteryReport.tsx must exist');
const masteryContent = fs.readFileSync(masteryReportPath, 'utf8');

// JLPT levels flattened
assert(
  masteryContent.includes('p-3.5 sm:p-4 rounded-xl transition-all') &&
  masteryContent.includes('bg-surface-2/40 hover:bg-surface-2/70'),
  'LearnerMasteryReport JLPT level items must be flattened without redundant nested borders'
);

// Competency cards maintain elevation
assert(
  masteryContent.includes('card-interactive-lift'),
  'LearnerMasteryReport must retain card-interactive-lift on competency tiles'
);
console.log('  ✅ Check 213.2 passed: LearnerMasteryReport JLPT levels and metrics verified.');

// ── Check 3: ChoukaiAudioPlayer & ChoukaiSimulatorPage Container Flattening ─
console.log('  Check 213.3: Verifying ChoukaiAudioPlayer and ChoukaiSimulatorPage container flattening...');
const choukaiPlayerPath = path.join(ROOT, 'src', 'components', 'audio', 'ChoukaiAudioPlayer.tsx');
assert(fs.existsSync(choukaiPlayerPath), 'ChoukaiAudioPlayer.tsx must exist');
const playerContent = fs.readFileSync(choukaiPlayerPath, 'utf8');

// Audio player flattened
assert(
  playerContent.includes('bg-surface-2/40 rounded-xl p-4 overflow-x-hidden'),
  'ChoukaiAudioPlayer outer container must be flattened to subtle rounded-xl tile'
);

const choukaiPagePath = path.join(ROOT, 'src', 'pages', 'ChoukaiSimulatorPage.tsx');
assert(fs.existsSync(choukaiPagePath), 'ChoukaiSimulatorPage.tsx must exist');
const choukaiPageContent = fs.readFileSync(choukaiPagePath, 'utf8');

// Prompt image container flattened
assert(
  choukaiPageContent.includes('bg-surface-2/40 rounded-xl p-3'),
  'ChoukaiSimulatorPage prompt image container must be flattened without outer borders'
);
console.log('  ✅ Check 213.3 passed: Choukai audio player and simulator containers verified.');

// ── Check 4: KebunPage FSRS State Distribution & Queue Dividers ──────────────
console.log('  Check 213.4: Verifying KebunPage FSRS distribution tiles and queue dividers...');
const kebunPagePath = path.join(ROOT, 'src', 'pages', 'KebunPage.tsx');
assert(fs.existsSync(kebunPagePath), 'KebunPage.tsx must exist');
const kebunContent = fs.readFileSync(kebunPagePath, 'utf8');

// 4 FSRS state distribution tiles flattened
assert(
  kebunContent.includes('p-3 rounded-xl bg-surface-2/40 space-y-1'),
  'KebunPage FSRS status distribution tiles must be flattened without outer borders'
);

// Due queue list container uses clean hairline divide-y
assert(
  kebunContent.includes('divide-y divide-border border-t border-border overflow-hidden'),
  'KebunPage FSRS due queue must use seamless border-t divider without outer card box'
);
console.log('  ✅ Check 213.4 passed: KebunPage FSRS metrics and queue dividers verified.');

// ── Check 5: DialogueStage Speaker Avatar Flattening ─────────────────────────
console.log('  Check 213.5: Verifying DialogueStage speaker avatar container flattening...');
const dialogueStagePath = path.join(ROOT, 'src', 'components', 'curriculum', 'player', 'DialogueStage.tsx');
assert(fs.existsSync(dialogueStagePath), 'DialogueStage.tsx must exist');
const dialogueContent = fs.readFileSync(dialogueStagePath, 'utf8');

// Speaker avatar flattened
assert(
  dialogueContent.includes('w-11 h-11 rounded-xl bg-surface-2 flex items-center justify-center text-2xl shrink-0 select-none'),
  'DialogueStage speaker avatar container must be flattened to rounded-xl without nested border'
);
console.log('  ✅ Check 213.5 passed: DialogueStage speaker avatar verified.');

console.log('🎉 Suite 213: All Siklus XI Pass 4 container flattening checks PASSED successfully!\n');
