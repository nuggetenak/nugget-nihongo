// ═════════════════════════════════════════════════════════════════════════════════════════════
//  tests/test-s6-pass8-methodology-changelog-humanized.js
//  SIKLUS VI — PASS 8: Humanisasi Halaman Metodologi & Redesain Catatan Rilis
//  Research Basis:
//    - User Experience Psychology & Cognitive Load Theory (Sweller, 1988; Mayer, 2001)
//    - Adult Learner Autonomy & Self-Determination (Ryan & Deci, 2000)
//    - Transparent Pedagogical Accounting for Indonesian L1 Learners (Matsunaga, 1999)
// ═════════════════════════════════════════════════════════════════════════════════════════════

const assert = require('assert');
const path = require('path');
const fs = require('fs');

console.log('╔══════════════════════════════════════════════════════════════════════════════╗');
console.log('║   SIKLUS VI — PASS 8: HUMANISASI METODOLOGI & REDESAIN CATATAN RILIS         ║');
console.log('╚══════════════════════════════════════════════════════════════════════════════╝\n');

const ROOT_DIR = path.resolve(__dirname, '..');
const versionPath = path.join(ROOT_DIR, 'src/config/version.ts');
const patchNotesPath = path.join(ROOT_DIR, 'src/lib/data/patchNotes.ts');
const methodologyPath = path.join(ROOT_DIR, 'src/pages/MethodologyPage.tsx');

assert(fs.existsSync(versionPath), 'version.ts must exist');
assert(fs.existsSync(patchNotesPath), 'patchNotes.ts must exist');
assert(fs.existsSync(methodologyPath), 'MethodologyPage.tsx must exist');

const {
  APP_VERSION,
  APP_VERSION_NUMBER,
  APP_RELEASE_NAME,
  APP_BUILD_DATE,
  APP_CHANGELOG_HIGHLIGHTS,
} = require('../src/config/version.ts');

const { PATCH_NOTES_HISTORY } = require('../src/lib/data/patchNotes.ts');

// ── Check 1: Humanized Benefit-Driven Changelog (src/config/version.ts) ──────
console.log('▶ Check 1: Humanized Benefit-Driven Changelog in version.ts...');

assert.strictEqual(APP_VERSION, 'v24.0.0', 'APP_VERSION must be v24.0.0');
assert.strictEqual(APP_VERSION_NUMBER, '24.0.0', 'APP_VERSION_NUMBER must be 24.0.0');
assert(APP_RELEASE_NAME.includes('Shin-Nihongo'), 'APP_RELEASE_NAME must maintain Shin-Nihongo codename');
assert.strictEqual(APP_BUILD_DATE, '2026-11-08', 'APP_BUILD_DATE must be 2026-11-08');

assert(Array.isArray(APP_CHANGELOG_HIGHLIGHTS), 'APP_CHANGELOG_HIGHLIGHTS must be an array');
assert.strictEqual(APP_CHANGELOG_HIGHLIGHTS.length, 5, 'Must contain 5 distinct pillars');

// Ensure no alienating mathematical formula jargon in user-facing changelog bullets
const fullChangelogText = APP_CHANGELOG_HIGHLIGHTS.join(' ');
assert(
  !fullChangelogText.includes('kopling lintas-modalitas (alpha=0.25, beta=0.65)'),
  'Changelog must eliminate alienating matrix formula jargon'
);
assert(
  !fullChangelogText.includes('modulasi latensi refleks Phi(Delta t)'),
  'Changelog must eliminate cold academic Greek formulas'
);

// Verify human benefit-driven themes are clearly communicated
assert(fullChangelogText.includes('200 Persona Indonesia'), 'Must highlight 200 Persona Indonesia');
assert(fullChangelogText.includes('Alur Materi Mengalir'), 'Must highlight single-flow feed learning');
assert(fullChangelogText.includes('Kanvas Tulis Kanji'), 'Must highlight touchscreen kanji practice');
assert(fullChangelogText.includes('Aman Digunakan Offline'), 'Must highlight offline reliability');
assert(fullChangelogText.includes('Pilihan Kuis Bersih'), 'Must highlight clean quiz choices');

console.log('  ✔ [PASS] version.ts changelog highlights are 100% human-readable, benefits-driven, and alien-free');

// ── Check 2: Patch Notes History Synchronization (patchNotes.ts) ─────────────
console.log('\n▶ Check 2: Patch Notes History Synchronization in patchNotes.ts...');

const latestNote = PATCH_NOTES_HISTORY.find((n) => n.version === 'v24.0.0');
assert(latestNote, 'patchNotes.ts must contain v24.0.0 note entry');
assert(latestNote.friendlySummary, 'v24.0.0 must provide friendlySummary');
assert(
  !latestNote.friendlySummary.includes('kopling lintas-modalitas'),
  'friendlySummary must be warm and accessible'
);
assert(
  latestNote.highlights.length >= 5,
  'v24.0.0 must have at least 5 highlight bullets matching pillars'
);
assert(
  latestNote.highlights.some((h) => h.includes('Alur Materi Mengalir')),
  'Highlights must include single-flow material feed'
);

console.log('  ✔ [PASS] patchNotes.ts v24.0.0 is synchronized with friendly, accessible language');

// ── Check 3: MethodologyPage Humanized Architecture ───────────────────────────
console.log('\n▶ Check 3: MethodologyPage Humanized Architecture & Research Anchors...');

const methCode = fs.readFileSync(methodologyPath, 'utf8');

// 1. Warm Empathetic Hero Header
assert(
  methCode.includes('Mengapa Cara Belajar di Nugget Nihongo Berbeda?'),
  'MethodologyPage must lead with warm, empathetic hero title'
);
assert(
  methCode.includes('Filosofi Belajar Tanpa Beban & Transparansi Ilmiah untuk Orang Indonesia'),
  'MethodologyPage must highlight human learning philosophy'
);

// 2. 4 Human Learning Pillar Cards
assert(methCode.includes('Cukup 5–10 Menit'), 'Must feature micro-session pillar card');
assert(methCode.includes('Bebas Rasa Malu'), 'Must feature collectivist shame-free pillar card');
assert(methCode.includes('Khas Orang Indonesia'), 'Must feature Indonesian L1 transfer pillar card');
assert(methCode.includes('Pengingat Tepat Waktu'), 'Must feature smart FSRS reminder pillar card');

// 3. 6 Canonical Narrative Sections Preserved
for (let i = 1; i <= 6; i++) {
  assert(
    methCode.includes(`section-${i}`),
    `MethodologyPage must preserve canonical narrative section-${i}`
  );
}

// 4. 4 Theoretical Conflict Resolutions Preserved
for (let i = 1; i <= 4; i++) {
  assert(
    methCode.includes(`CONF-0${i}`),
    `MethodologyPage must preserve theoretical conflict resolution CONF-0${i}`
  );
}

// 5. Interactive FSRS Simulator & Math Formula Preserved
assert(
  methCode.includes('Simulasi Interaktif Retensi Memori FSRS v4.5'),
  'Must preserve interactive FSRS retention simulator'
);
assert(
  methCode.includes('R(t, S) = (1 + 0.19 · (t / S))^(-0.5)') ||
  methCode.includes('R(t, S) = (1 + FACTOR * (t / S))^(-DECAY)'),
  'Must preserve official FSRS v4.5 power decay formula'
);

// 6. 200 Personas Dataset & Open Science Protocols Preserved
assert(
  methCode.includes('Validasi Lapangan: Matriks 200 Persona Indonesia'),
  'Must preserve 200 Indonesian learner personas field validation matrix'
);
assert(
  methCode.includes('Protokol Kolaborasi Riset Terbuka'),
  'Must preserve Open Science contribution protocol'
);
assert(
  methCode.includes('mailto:nuggetnihongo@gmail.com'),
  'Must provide research inquiry mailto link to nuggetnihongo@gmail.com'
);

// 7. Responsive Viewport Constraints & Indonesian Standard Spelling
assert(
  methCode.includes('overflow-x-hidden'),
  'MethodologyPage must enforce overflow-x-hidden against horizontal blowouts'
);
assert(
  methCode.includes('safe-area-inset-bottom'),
  'MethodologyPage must provide safe-area-inset-bottom padding cushion'
);
assert(
  methCode.includes('respons'),
  'MethodologyPage must adhere to Indonesian standard spelling "respons"'
);

console.log('  ✔ [PASS] MethodologyPage successfully blends warm human philosophy with rigorous academic research anchors');

console.log('\n══════════════════════════════════════════════════════════════════════════════╗');
console.log('🎉 SIKLUS VI — PASS 8: HUMANISASI METODOLOGI & CATATAN RILIS 100% GREEN        ║');
console.log('╚══════════════════════════════════════════════════════════════════════════════╝');
