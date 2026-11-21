// ══════════════════════════════════════════════════════════════════
//  test-s11-pass2-card-flattening-editorial-hierarchy.js
//  Nugget Nihongo Siklus XI Pass 2 — Nested Card Flattening & Editorial Hierarchy
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT_DIR = path.resolve(__dirname, '..');

console.log('--- Siklus XI Pass 2: Nested Card Flattening & Editorial Hierarchy ---');

// 1. Verify HomePage.tsx lesson list flattening
const homePath = path.join(ROOT_DIR, 'src/pages/HomePage.tsx');
assert(fs.existsSync(homePath), 'HomePage.tsx must exist');
const homeContent = fs.readFileSync(homePath, 'utf8');

assert(
  !homeContent.includes('divide-y divide-border rounded-xl border border-border overflow-hidden bg-surface'),
  'HomePage lesson container must not nest an unnecessary rounded-xl border card inside the unit card'
);
assert(
  homeContent.includes('divide-y divide-border border-t border-border overflow-hidden'),
  'HomePage lesson list must integrate via clean border-t divide-y editorial hairlines'
);
console.log('✓ HomePage lesson list flattened into clean editorial divide-y hairlines');

// 2. Verify KebunPage.tsx secondary drill tiles flattening
const kebunPath = path.join(ROOT_DIR, 'src/pages/KebunPage.tsx');
assert(fs.existsSync(kebunPath), 'KebunPage.tsx must exist');
const kebunContent = fs.readFileSync(kebunPath, 'utf8');

assert(
  !kebunContent.includes('rounded-2xl bg-surface-2 border border-border hover:border-accent/30 transition-all flex flex-col justify-between space-y-4'),
  'KebunPage secondary drill items must not nest redundant rounded-2xl bordered cards inside the drills section'
);
assert(
  kebunContent.includes('rounded-xl bg-surface-2/40 hover:bg-surface-2/80 transition-all flex flex-col justify-between space-y-4'),
  'KebunPage secondary drill items must use subtle rounded-xl bg-surface-2/40 tiles'
);
console.log('✓ KebunPage secondary drill items flattened into subtle editorial tiles');

// 3. Verify LearnerMasteryReport.tsx FSRS visualizer and callout flattening
const masteryPath = path.join(ROOT_DIR, 'src/components/settings/LearnerMasteryReport.tsx');
assert(fs.existsSync(masteryPath), 'LearnerMasteryReport.tsx must exist');
const masteryContent = fs.readFileSync(masteryPath, 'utf8');

assert(
  !masteryContent.includes('p-4 sm:p-5 rounded-2xl bg-surface-2/70 border border-accent/20 space-y-3'),
  'LearnerMasteryReport must not double-box FSRS visualizer with redundant border-accent/20'
);
assert(
  masteryContent.includes('p-4 sm:p-5 rounded-xl bg-surface-2/40 space-y-3'),
  'LearnerMasteryReport must flatten FSRS visualizer into clean rounded-xl bg-surface-2/40'
);
assert(
  masteryContent.includes('border-l-4 border-amber-500 space-y-3'),
  'LearnerMasteryReport streak banner must employ clean editorial border-l callout'
);
console.log('✓ LearnerMasteryReport flattened into clean editorial callouts');

// 4. Verify LearnerIdentityCard.tsx drawer and banner flattening
const identityPath = path.join(ROOT_DIR, 'src/components/settings/LearnerIdentityCard.tsx');
assert(fs.existsSync(identityPath), 'LearnerIdentityCard.tsx must exist');
const identityContent = fs.readFileSync(identityPath, 'utf8');

assert(
  !identityContent.includes('p-4 sm:p-5 rounded-2xl bg-surface-2/80 border border-accent/20 space-y-4'),
  'LearnerIdentityCard must not wrap avatar drawer in redundant rounded-2xl border'
);
assert(
  identityContent.includes('p-4 sm:p-5 rounded-xl bg-surface-2/40 border-t border-border space-y-4') ||
  identityContent.includes('p-4 sm:p-5 bg-surface-2/40 border-t border-border space-y-4'),
  'LearnerIdentityCard avatar drawer must integrate with clean border-t separator'
);
assert(
  identityContent.includes('p-4 rounded-xl bg-surface-2/40 border-t border-border flex flex-col') ||
  identityContent.includes('p-4 bg-surface-2/40 border-t border-border flex flex-col') ||
  identityContent.includes('p-4 border-t border-border flex flex-col'),
  'LearnerIdentityCard proficiency banner must integrate with clean border-t separator'
);
console.log('✓ LearnerIdentityCard drawers flattened into clean border-t sections');

console.log('🎉 Siklus XI Pass 2 Verification Complete: All assertions green!\n');
process.exit(0);
