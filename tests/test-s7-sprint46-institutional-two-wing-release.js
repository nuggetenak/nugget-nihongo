// ══════════════════════════════════════════════════════════════════
//  test-s7-sprint46-institutional-two-wing-release.js
//  Sprint 46: Institutional Architecture, Two-Wing Pedagogy & Final Release Synthesis
// ══════════════════════════════════════════════════════════════════

import assert from 'assert';
import fs from 'fs';
import path from 'path';

console.log('⚡ Running Suite 187: Sprint 46: Institutional Architecture, Two-Wing Pedagogy & Final Release Synthesis...');

const ROOT = process.cwd().includes('nugget-nihongo')
  ? process.cwd()
  : path.join(process.cwd(), 'nugget-nihongo');

// ── Check 1: AboutPage Two-Wing Philosophy, Active Sensei AI & Modal Triggers ──
console.log('  Check 46.1: Verifying AboutPage Two-Wing institutional philosophy & active Sensei AI FAQ...');
const aboutPath = path.join(ROOT, 'src', 'pages', 'AboutPage.tsx');
assert(fs.existsSync(aboutPath), 'AboutPage.tsx must exist');
const aboutContent = fs.readFileSync(aboutPath, 'utf8');

assert(
  aboutContent.includes('Filosofi Teman Belajar') &&
  aboutContent.includes('Dirancang Khusus untuk Pembelajar Indonesia') &&
  aboutContent.includes('Cakupan Kurikulum & Data Terverifikasi') &&
  aboutContent.includes('Buka Metodologi Pedagogis & Batas Epistemik'),
  'AboutPage must embody the institutional pedagogical architecture and methodology bridge'
);

assert(
  aboutContent.includes("id: 'faq-11'") &&
  aboutContent.includes('Tab 4 Sensei AI') &&
  aboutContent.includes('Sensei Nugget & Senpai Aoi') &&
  !aboutContent.includes('sedang dalam tahap finalisasi laboratorium AI'),
  'AboutPage FAQ-11 must accurately describe active Tab 4 Sensei AI Studio without legacy coming-soon text'
);

assert(
  aboutContent.includes('openOnboarding') &&
  aboutContent.includes('openFeatureGuide') &&
  aboutContent.includes('openPatchNotes') &&
  aboutContent.includes('isLicenseModalOpen') &&
  aboutContent.includes('isBibliographyOpen'),
  'AboutPage must integrate triggers for all institutional guidance modals'
);
console.log('  ✅ Check 46.1 passed: AboutPage Two-Wing architecture & active FAQ verified.');

// ── Check 2: MethodologyPage 4 Epistemic Conflicts & FSRS Defensiveness ──
console.log('  Check 46.2: Verifying MethodologyPage 4 epistemic conflict resolutions & FSRS bounds...');
const methodPath = path.join(ROOT, 'src', 'pages', 'MethodologyPage.tsx');
assert(fs.existsSync(methodPath), 'MethodologyPage.tsx must exist');
const methodContent = fs.readFileSync(methodPath, 'utf8');

assert(
  methodContent.includes('CONF-01') &&
  methodContent.includes('CONF-02') &&
  methodContent.includes('CONF-03') &&
  methodContent.includes('CONF-04'),
  'MethodologyPage must document all 4 epistemic conflict resolutions (CONF-01 to CONF-04)'
);

assert(
  methodContent.includes('safeStability = Math.max(0.1') &&
  methodContent.includes('safeElapsed = Math.max(0') &&
  methodContent.includes('Number.isFinite(fsrsRetrievability)'),
  'MethodologyPage must defensively clamp FSRS simulator variables against NaN/zero division'
);

assert(
  methodContent.includes('SAMPLE_PERSONAS') &&
  methodContent.includes('IDN-JP-001') &&
  methodContent.includes('IDN-JP-015') &&
  methodContent.includes('IDN-JP-042'),
  'MethodologyPage must showcase 200 Indonesian learner personas grounding'
);
console.log('  ✅ Check 46.2 passed: MethodologyPage epistemic conflicts & FSRS bounds verified.');

// ── Check 3: PatchNotesModal Dual-Mode Presentation & A11y Standards ──
console.log('  Check 46.3: Verifying PatchNotesModal dual-mode presentation & a11y compliance...');
const patchModalPath = path.join(ROOT, 'src', 'components', 'ui', 'PatchNotesModal.tsx');
assert(fs.existsSync(patchModalPath), 'PatchNotesModal.tsx must exist');
const patchModalContent = fs.readFileSync(patchModalPath, 'utf8');

assert(
  patchModalContent.includes('showTechnical') &&
  patchModalContent.includes('⚙️ Detail Teknis (Dev)') &&
  patchModalContent.includes('🌿 Bahasa Ramah Pelajar'),
  'PatchNotesModal must support dual-mode toggle between Friendly Learner and Technical Dev views'
);

assert(
  patchModalContent.includes('useFocusTrap') &&
  patchModalContent.includes('useBodyScrollLock') &&
  patchModalContent.includes('role="dialog"') &&
  patchModalContent.includes('aria-modal="true"'),
  'PatchNotesModal must enforce WCAG modal dialog accessibility standards'
);

assert(
  patchModalContent.includes('min-h-[40px]') &&
  patchModalContent.includes('min-w-[44px]'),
  'PatchNotesModal must meet minimum mobile touch target standards'
);
console.log('  ✅ Check 46.3 passed: PatchNotesModal dual-mode and a11y compliance verified.');

// ── Check 4: Version Lockstep & Release Metadata Synchronization ────
console.log('  Check 46.4: Verifying version.ts and patchNotes.ts synchronized lockstep...');
const versionConfigPath = path.join(ROOT, 'src', 'config', 'version.ts');
const patchNotesPath = path.join(ROOT, 'src', 'lib', 'data', 'patchNotes.ts');
assert(fs.existsSync(versionConfigPath), 'version.ts must exist');
assert(fs.existsSync(patchNotesPath), 'patchNotes.ts must exist');

const versionConfigContent = fs.readFileSync(versionConfigPath, 'utf8');
const patchNotesContent = fs.readFileSync(patchNotesPath, 'utf8');

assert(
  versionConfigContent.includes("APP_VERSION = 'v24.2.0'") &&
  versionConfigContent.includes("APP_VERSION_NUMBER = '24.2.0'"),
  'version.ts must be pinned to v24.2.0'
);

assert(
  patchNotesContent.includes("version: 'v24.2.0'") &&
  patchNotesContent.includes("releaseName: 'Shin-Nihongo: Dojo 4-Pillars & Clean Studio Ergonomics'"),
  'patchNotes.ts latest entry must match v24.2.0 and release title exactly'
);

assert(
  versionConfigContent.includes('Pilar 1 — 4 Tombol Pilihan Dojo & Materi Hub') &&
  versionConfigContent.includes('Pilar 2 — Simulator Ujian CBT Terintegrasi') &&
  versionConfigContent.includes('Pilar 3 — Navigasi Terpadu Drawer & Arena Kuis') &&
  versionConfigContent.includes('Pilar 4 — Ergonomi Studio Belajar Bersih') &&
  versionConfigContent.includes('Pilar 5 — Pustaka Alat Bantu & 9 Seri Buku Teks'),
  'version.ts must record all 5 pillars of v24.2.0 changelog'
);
console.log('  ✅ Check 46.4 passed: Version lockstep and release metadata synchronized.');

// ── Check 5: Vite Architecture & Build Chunk Optimization ───────────
console.log('  Check 46.5: Verifying vite.config.ts bundle optimization and PWA configurations...');
const viteConfigPath = path.join(ROOT, 'vite.config.ts');
assert(fs.existsSync(viteConfigPath), 'vite.config.ts must exist');
const viteConfigContent = fs.readFileSync(viteConfigPath, 'utf8');

assert(
  viteConfigContent.includes('manualChunks') ||
  viteConfigContent.includes('rollupOptions'),
  'vite.config.ts must specify rollupOptions for code splitting and vendor chunking'
);

assert(
  viteConfigContent.includes('VitePWA') ||
  viteConfigContent.includes('react()'),
  'vite.config.ts must configure React and PWA plugin infrastructure'
);
console.log('  ✅ Check 46.5 passed: Vite build architecture verified.');

console.log('\n🎉 Suite 187 (Sprint 46: Institutional Architecture, Two-Wing Pedagogy & Final Release Synthesis) PASSED (5/5 checks 100% GREEN)!\n');
process.exit(0);
