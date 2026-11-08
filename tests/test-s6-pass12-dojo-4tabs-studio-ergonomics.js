// ══════════════════════════════════════════════════════════════════
//  test-s6-pass12-dojo-4tabs-studio-ergonomics.js
//  Siklus VI Pass 12: Dojo 4-Pillar Unified Architecture,
//                     Drawer Routing Harmonization, & Studio Belajar Ergonomics
// ══════════════════════════════════════════════════════════════════

import assert from 'assert';
import fs from 'fs';
import path from 'path';

console.log('⚡ Running Suite 141: Dojo 4-Pillars & Studio Ergonomics Verification...');

const rootDir = process.cwd().includes('nugget-nihongo')
  ? process.cwd()
  : path.join(process.cwd(), 'nugget-nihongo');

// ── Test 1: MateriHubPage 4 Dedicated Tabs Switcher ─────────────────
console.log('\nChecking Test 1: Dojo 4 Dedicated Tab Switcher (Latihan, Kamus, Alat, CBT)...');
const materiHubContent = fs.readFileSync(path.join(rootDir, 'src', 'pages', 'MateriHubPage.tsx'), 'utf8');

assert(
  materiHubContent.includes("dojoTab === 'latihan'") &&
  materiHubContent.includes("dojoTab === 'kamus'") &&
  materiHubContent.includes("dojoTab === 'alat'") &&
  materiHubContent.includes("dojoTab === 'cbt'"),
  'MateriHubPage must provide discrete views for all 4 Dojo pillars: latihan, kamus, alat, cbt'
);

assert(
  materiHubContent.includes('role="tablist"') &&
  materiHubContent.includes('Mode Navigasi Dojo & Materi Hub'),
  'MateriHubPage must feature accessible tablist for the 4 Dojo pillars'
);

assert(
  materiHubContent.includes('Latihan & Kuis') &&
  materiHubContent.includes('Kamus & Indeks') &&
  materiHubContent.includes('Alat & Referensi') &&
  materiHubContent.includes('Simulator Ujian'),
  'MateriHubPage mode switcher must render clear, intuitive labels for all 4 pillars'
);
console.log('✅ Test 1 Passed: 4-Pillar Dojo Mode Switcher verified.');

// ── Test 2: Tab 4 CBT Exam Simulator Suite & Embedded ExamLmsHub ───
console.log('\nChecking Test 2: Tab 4 CBT Exam Simulators & Embedded ExamLmsHub...');
assert(
  materiHubContent.includes('Simulator Ujian CBT Resmi & Standar Internasional') &&
  materiHubContent.includes('Simulasi Lengkap JLPT CBT (N5–N1)') &&
  materiHubContent.includes('Simulasi JFT-Basic CBT (A1/A2)') &&
  materiHubContent.includes('Simulasi Prometric Tokutei Ginou (SSW)') &&
  materiHubContent.includes('Simulator Menyimak Choukai (CBT Resmi)') &&
  materiHubContent.includes('Tes Penempatan Adaptif CAT'),
  'Tab 4 must house the 5 official exam simulators (JLPT, JFT, Prometric SSW, Choukai, CAT)'
);

assert(
  materiHubContent.includes('<ExamLmsHub') &&
  materiHubContent.includes('onStartExerciseSet={handleStartExerciseSet}'),
  'Tab 4 must embed ExamLmsHub with direct CBT set launch handler'
);
console.log('✅ Test 2 Passed: Tab 4 CBT Exam Suite and ExamLmsHub integration verified.');

// ── Test 3: Navigation Harmonization (Arena Kuis -> Dojo Tab 1) ─────
console.log('\nChecking Test 3: Drawer & Sidebar Navigation Harmonization...');
const drawerContent = fs.readFileSync(path.join(rootDir, 'src', 'components', 'layout', 'MobileDrawer.tsx'), 'utf8');
const sidebarContent = fs.readFileSync(path.join(rootDir, 'src', 'components', 'layout', 'Sidebar.tsx'), 'utf8');
const appContent = fs.readFileSync(path.join(rootDir, 'src', 'App.tsx'), 'utf8');

assert(
  drawerContent.includes("tab === 'quiz'") &&
  drawerContent.includes("setDojoTab('latihan')") &&
  drawerContent.includes("transitionTabChange('materi', setActiveTab)"),
  'MobileDrawer Arena Kuis must set dojoTab to latihan and transition to materi'
);

assert(
  sidebarContent.includes("id === 'quiz'") &&
  sidebarContent.includes("setDojoTab('latihan')") &&
  sidebarContent.includes("transitionTabChange('materi', setActiveTab)"),
  'Sidebar Arena Kuis must set dojoTab to latihan and transition to materi'
);

assert(
  appContent.includes("case 'quiz':") &&
  appContent.includes('<MateriHubPage initialTab="latihan" />'),
  'App.tsx case quiz must mount MateriHubPage initialTab="latihan" when no active drill is running'
);
console.log('✅ Test 3 Passed: Navigation harmonization connects Arena Kuis directly to Dojo.');

// ── Test 4: Studio Belajar Clean Ergonomics (ExplanationStage) ───────
console.log('\nChecking Test 4: ExplanationStage In-Flow Sub-Tabs & Quick Jump Pill...');
const explanationContent = fs.readFileSync(path.join(rootDir, 'src', 'components', 'curriculum', 'player', 'ExplanationStage.tsx'), 'utf8');

assert(
  !explanationContent.includes('sticky top-[106px]'),
  'ExplanationStage must eliminate top-[106px] sticky stacking to avoid viewport clutter on mobile'
);

assert(
  explanationContent.includes('id="pilar-tata-bahasa"') &&
  explanationContent.includes('id="pilar-kosakata"') &&
  explanationContent.includes('id="pilar-jebakan"'),
  'ExplanationStage must establish distinct section anchor IDs for all 3 pedagogical pillars'
);

assert(
  explanationContent.includes('showScrollTop') &&
  explanationContent.includes('ChevronUp') &&
  explanationContent.includes('window.scrollTo({ top: 0, behavior: \'smooth\' })'),
  'ExplanationStage must provide a floating smooth quick-jump button when scrolled down'
);
console.log('✅ Test 4 Passed: ExplanationStage in-flow tabs and smooth quick-jump verified.');

// ── Test 5: Version Bump v24.2.0 Across Core Manifests ──────────────
console.log('\nChecking Test 5: Release Synchronization v24.2.0...');
const pkg = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'));
const versionTs = fs.readFileSync(path.join(rootDir, 'src', 'config', 'version.ts'), 'utf8');
const versionJs = fs.readFileSync(path.join(rootDir, 'public', 'js', 'core', 'version.js'), 'utf8');
const swJs = fs.readFileSync(path.join(rootDir, 'public', 'sw.js'), 'utf8');

assert.strictEqual(pkg.version, '24.2.0', 'package.json must declare 24.2.0');
assert(versionTs.includes('v24.2.0'), 'version.ts must declare v24.2.0');
assert(versionJs.includes('v24.2.0'), 'version.js must declare v24.2.0');
assert(swJs.includes('v24.2.0'), 'sw.js cache name must declare v24.2.0');

console.log('✅ Test 5 Passed: Single Source of Truth version v24.2.0 synchronized.');

console.log('\n══════════════════════════════════════════════════════════════════════');
console.log('🎉 ALL 5 CONTRACTS IN SUITE 141 (DOJO 4-TABS & STUDIO ERGONOMICS) 100% GREEN!');
console.log('══════════════════════════════════════════════════════════════════════\n');
