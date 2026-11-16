// ══════════════════════════════════════════════════════════════════
//  test-s7-sprint5-home-cockpit.js
//  Sprint 5: Tab 1 Belajar — Sovereign Single-Action Home Cockpit Test
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT = path.resolve(__dirname, '..');

console.log('🧪 Starting Sprint 5: Tab 1 Belajar — Sovereign Home Cockpit Test...');

// Check 1: HomePage.tsx - Sovereign Hero Cockpit & Primary CTA
console.log('  Check 5.1: HomePage.tsx single-action primary hero CTA...');
const homePath = path.join(ROOT, 'src', 'pages', 'HomePage.tsx');
assert(fs.existsSync(homePath), 'src/pages/HomePage.tsx must exist');
const homeContent = fs.readFileSync(homePath, 'utf8');

assert(
  homeContent.includes('min-h-[48px]') && homeContent.includes('shadow-glow') && homeContent.includes('active:scale-95'),
  'Hero learning cockpit must feature prominent primary CTA with >=48px height, shadow-glow, and active scale'
);
assert(
  homeContent.includes('openLessonStudy('),
  'Primary CTA must directly invoke openLessonStudy'
);
assert(
  homeContent.includes('Lanjut Belajar · Unit') && homeContent.includes('Mulai Belajar · Unit'),
  'Primary CTA must dynamically reflect next uncompleted lesson state'
);
console.log('  ✅ Check 5.1 passed: Sovereign Hero Cockpit & primary CTA verified.');

// Check 2: Status & Metric Indicators
console.log('  Check 5.2: Streak, XP momentum & friendly FSRS counters...');
assert(
  homeContent.includes('tabular-nums') && homeContent.includes('font-mono'),
  'Streak counter must use tabular-nums and font-mono for zero jitter'
);
assert(
  homeContent.includes('Kata Perlu Diulas'),
  'FSRS counter must use humanized phrasing "Kata Perlu Diulas"'
);
assert(
  homeContent.includes('<SyncStatusPill />'),
  'Hero cockpit must include SyncStatusPill for real-time offline status'
);
console.log('  ✅ Check 5.2 passed: Status and metric indicators validated.');

// Check 3: Pathway-First Curriculum Roadmap
console.log('  Check 5.3: Guided curriculum roadmap & CurriculumTrackBrowser...');
assert(
  homeContent.includes('roadmapViewMode') &&
  homeContent.includes("'focus'") &&
  homeContent.includes("'all'"),
  'HomePage must support focused active unit view and full syllabus roadmap view'
);
assert(
  homeContent.includes('CurriculumTrackBrowser'),
  'HomePage must embed CurriculumTrackBrowser for full syllabus exploration'
);
console.log('  ✅ Check 5.3 passed: Curriculum roadmap and view modes verified.');

// Check 4: Mobile Ergonomics & Zero Microfonts
console.log('  Check 5.4: Mobile viewport constraints & microfont elimination...');
assert(
  homeContent.includes('pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12'),
  'HomePage must maintain safe bottom navigation padding'
);
assert(
  homeContent.includes('overflow-x-hidden'),
  'HomePage wrapper must enforce horizontal overflow defense'
);

const microfontRegex = /text-\[(10|11|10\.5|11\.5|9)px\]/;
assert(
  !microfontRegex.test(homeContent),
  'HomePage must not leak microfonts below text-xs (12px)'
);
console.log('  ✅ Check 5.4 passed: Mobile ergonomics and typography verified.');

console.log('🎉 ALL SPRINT 5 HOME COCKPIT CHECKS PASSED (4/4)!');
