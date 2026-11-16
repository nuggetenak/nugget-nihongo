// ══════════════════════════════════════════════════════════════════
//  test-s7-sprint6-curriculum-browser.js
//  Sprint 6: Tab 1 Belajar — Modularizing CurriculumTrackBrowser Test
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT = path.resolve(__dirname, '..');

console.log('🧪 Starting Sprint 6: Tab 1 Belajar — Modularizing CurriculumTrackBrowser Test...');

// Check 1: Modular Sub-Components Existence & Exports
console.log('  Check 6.1: Domain sub-components in src/components/materi/curriculum/...');
const curriculumDir = path.join(ROOT, 'src', 'components', 'materi', 'curriculum');
assert(fs.existsSync(curriculumDir), 'curriculum sub-components directory must exist');

const lessonNodePath = path.join(curriculumDir, 'LessonRowNode.tsx');
const filterPath = path.join(curriculumDir, 'TrackCategoryFilter.tsx');
const unitCardPath = path.join(curriculumDir, 'UnitAccordionCard.tsx');
const indexPath = path.join(curriculumDir, 'index.ts');

assert(fs.existsSync(lessonNodePath), 'LessonRowNode.tsx must exist');
assert(fs.existsSync(filterPath), 'TrackCategoryFilter.tsx must exist');
assert(fs.existsSync(unitCardPath), 'UnitAccordionCard.tsx must exist');
assert(fs.existsSync(indexPath), 'index.ts must exist');

const lessonNodeContent = fs.readFileSync(lessonNodePath, 'utf8');
const filterContent = fs.readFileSync(filterPath, 'utf8');
const unitCardContent = fs.readFileSync(unitCardPath, 'utf8');
const indexContent = fs.readFileSync(indexPath, 'utf8');

assert(lessonNodeContent.includes('export const LessonRowNode'), 'LessonRowNode must be exported');
assert(lessonNodeContent.includes('min-h-[44px]') && lessonNodeContent.includes('active:scale-95'), 'LessonRowNode must enforce >= 44px touch targets');

assert(filterContent.includes('export const TrackCategoryFilter'), 'TrackCategoryFilter must be exported');
assert(filterContent.includes('export const CATEGORIES'), 'CATEGORIES must be exported');
assert(filterContent.includes('min-h-[40px]') && filterContent.includes('active:scale-95'), 'Filter pills must enforce >= 40px touch targets');

assert(unitCardContent.includes('export const UnitAccordionCard'), 'UnitAccordionCard must be exported');
assert(unitCardContent.includes('min-h-[44px]') && unitCardContent.includes('active:scale-98'), 'Unit card accordion header must meet touch ergonomics');

assert(indexContent.includes('export * from \'./LessonRowNode\''), 'index.ts must export LessonRowNode');
assert(indexContent.includes('export * from \'./TrackCategoryFilter\''), 'index.ts must export TrackCategoryFilter');
assert(indexContent.includes('export * from \'./UnitAccordionCard\''), 'index.ts must export UnitAccordionCard');

console.log('  ✅ Check 6.1 passed: Sub-components and exports validated.');

// Check 2: CurriculumTrackBrowser Integrity & Historical Contracts
console.log('  Check 6.2: CurriculumTrackBrowser facade and behavioral contracts...');
const browserPath = path.join(ROOT, 'src', 'components', 'materi', 'CurriculumTrackBrowser.tsx');
assert(fs.existsSync(browserPath), 'CurriculumTrackBrowser.tsx must exist');
const browserContent = fs.readFileSync(browserPath, 'utf8');

assert(
  browserContent.includes('setExpandedUnitIds') &&
  browserContent.includes('toggleUnit'),
  'CurriculumTrackBrowser must maintain single-accordion toggleUnit contract'
);
assert(
  browserContent.includes('effectiveGrammarList') &&
  browserContent.includes('trackGrammars'),
  'CurriculumTrackBrowser must maintain dynamic effectiveGrammarList mapping'
);
assert(
  browserContent.includes('text-emerald-700 dark:text-emerald-400'),
  'CurriculumTrackBrowser must satisfy WCAG AA contrast tokens'
);
console.log('  ✅ Check 6.2 passed: CurriculumTrackBrowser historical behavioral contracts verified.');

console.log('🎉 ALL SPRINT 6 CURRICULUM BROWSER MODULARIZATION CHECKS PASSED (2/2)!');
