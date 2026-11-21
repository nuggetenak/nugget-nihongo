// ══════════════════════════════════════════════════════════════════
//  tests/test-s11-pass3-subcard-editorial-refinement.js
//  Siklus XI — Pass 3: Sub-Card Editorial Hierarchy & Multi-Device Container Refinement
//  Quality Criteria:
//    - Zero nested card-in-card visual noise in AboutPage, Settings, and Methodology
//    - Seamless borderless subtle tiles (rounded-xl bg-surface-2/40)
//    - Universal viewport resilience and zero mobile title truncation
// ══════════════════════════════════════════════════════════════════

const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('🧪 Running Suite 212: Siklus XI Pass 3 — Sub-Card Editorial Hierarchy & Refinement...');

const ROOT = process.cwd().includes('nugget-nihongo')
  ? process.cwd()
  : path.join(process.cwd(), 'nugget-nihongo');

// ── Check 1: AboutPage Curriculum, Features & Community Links Flattening ────
console.log('  Check 212.1: Verifying AboutPage curriculum cards, features & contact links flattening...');
const aboutPagePath = path.join(ROOT, 'src', 'pages', 'AboutPage.tsx');
assert(fs.existsSync(aboutPagePath), 'AboutPage.tsx must exist');
const aboutContent = fs.readFileSync(aboutPagePath, 'utf8');

// Curriculum cards flattened
assert(
  aboutContent.includes('rounded-xl bg-surface-2/40 hover:bg-surface-2/80 transition-all'),
  'AboutPage curriculum cards must be flattened to subtle rounded-xl tiles'
);

// Community & creator support links flattened
assert(
  aboutContent.includes('p-3.5 rounded-xl bg-surface-2/40 hover:bg-surface-2/80 border border-border/40') ||
  aboutContent.includes('p-3.5 rounded-xl bg-surface-2/40 hover:bg-surface-2/80'),
  'AboutPage support channels must be flattened without heavy rounded-2xl enclosing boxes'
);

// Channel URLs remain intact
assert(
  aboutContent.includes('mailto:nuggetnihongo@gmail.com') &&
  aboutContent.includes('https://x.com/NuggetNihongo') &&
  aboutContent.includes('https://trakteer.id/nugget-nihongo'),
  'AboutPage must preserve all verified contact URLs'
);
console.log('  ✅ Check 212.1 passed: AboutPage sub-cards and links editorialized.');

// ── Check 2: AchievementsBadgeShowcase Icon Container Refinement ─────────────
console.log('  Check 212.2: Verifying AchievementsBadgeShowcase badge container refinement...');
const badgeShowcasePath = path.join(ROOT, 'src', 'components', 'settings', 'AchievementsBadgeShowcase.tsx');
assert(fs.existsSync(badgeShowcasePath), 'AchievementsBadgeShowcase.tsx must exist');
const badgeContent = fs.readFileSync(badgeShowcasePath, 'utf8');

// Icon container flattened from rounded-2xl border to rounded-xl
assert(
  badgeContent.includes('w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 select-none'),
  'AchievementsBadgeShowcase badge icon container must be flattened to rounded-xl without nested border'
);

// Touch target resilience
assert(
  badgeContent.includes('min-h-[44px]'),
  'AchievementsBadgeShowcase category filters must maintain 44px touch targets'
);
console.log('  ✅ Check 212.2 passed: AchievementsBadgeShowcase refined.');

// ── Check 3: LearnerMasteryReport Competency Metrics & JLPT Level Resilience ──
console.log('  Check 212.3: Verifying LearnerMasteryReport 4 core competency tiles and JLPT list...');
const masteryReportPath = path.join(ROOT, 'src', 'components', 'settings', 'LearnerMasteryReport.tsx');
assert(fs.existsSync(masteryReportPath), 'LearnerMasteryReport.tsx must exist');
const masteryContent = fs.readFileSync(masteryReportPath, 'utf8');

// 4 core competency metrics flattened
assert(
  masteryContent.includes('rounded-xl bg-surface-2/40 hover:bg-surface-2/70 transition-all flex flex-col justify-between space-y-1.5'),
  'LearnerMasteryReport competency cards must be flattened to subtle rounded-xl tiles'
);

// JLPT levels styled cleanly with break-words to avoid mobile clipping
assert(
  (masteryContent.includes('bg-surface-2/40 border-border/40 hover:bg-surface-2/70') || masteryContent.includes('bg-surface-2/40 hover:bg-surface-2/70')) &&
  masteryContent.includes('break-words block'),
  'LearnerMasteryReport JLPT levels must use break-words block to prevent mobile truncation'
);
console.log('  ✅ Check 212.3 passed: LearnerMasteryReport metrics and JLPT levels verified.');

// ── Check 4: MethodologyPage Editorial Hierarchy & Quote Aesthetics ─────────
console.log('  Check 212.4: Verifying MethodologyPage 4 pillars, FSRS calculator & 200 personas...');
const methodologyPagePath = path.join(ROOT, 'src', 'pages', 'MethodologyPage.tsx');
assert(fs.existsSync(methodologyPagePath), 'MethodologyPage.tsx must exist');
const methodologyContent = fs.readFileSync(methodologyPagePath, 'utf8');

// 4 pillars flattened
assert(
  methodologyContent.includes('p-3.5 rounded-xl bg-surface-2/40 hover:bg-surface-2/70 border border-border/40 transition-all space-y-1.5') ||
  methodologyContent.includes('p-3.5 rounded-xl bg-surface-2/40 hover:bg-surface-2/70 transition-all space-y-1.5'),
  'MethodologyPage 4 human learning pillars must be flattened to subtle rounded-xl tiles'
);

// FSRS calculation displays flattened
assert(
  methodologyContent.includes('p-4 rounded-xl bg-surface-2/40 border border-border/40 flex flex-col justify-between') ||
  methodologyContent.includes('p-4 rounded-xl bg-surface-2/40 flex flex-col justify-between'),
  'MethodologyPage FSRS inputs must be flattened to rounded-xl tiles'
);

// 200 personas quote styled as editorial border-l quote
assert(
  methodologyContent.includes('border-l-2 border-amber-500/40 pl-3'),
  'MethodologyPage persona quote must use editorial left-border quote style'
);

// Open Science collaboration cards flattened
assert(
  methodologyContent.includes('p-4 rounded-xl bg-surface-2/40 hover:bg-surface-2/80 border border-border/40 transition-all space-y-2') ||
  methodologyContent.includes('p-4 rounded-xl bg-surface-2/40 hover:bg-surface-2/80 transition-all space-y-2'),
  'MethodologyPage Open Science cards must be flattened to subtle rounded-xl tiles'
);
console.log('  ✅ Check 212.4 passed: MethodologyPage editorial hierarchy verified.');

console.log('🎉 Suite 212: All Siklus XI Pass 3 sub-card editorial refinement checks PASSED successfully!\n');
