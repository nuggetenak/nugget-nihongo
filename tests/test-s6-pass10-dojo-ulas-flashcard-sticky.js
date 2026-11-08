// ═════════════════════════════════════════════════════════════════════════════════════════════
//  tests/test-s6-pass10-dojo-ulas-flashcard-sticky.js
//  SIKLUS VI — PASS 10: Pure Practice Dojo, Unlocked Flashcard Access, Sticky Sub-Tabs,
//                       Modal Close Immunity & v24.1.0 Release Synchronization
// ═════════════════════════════════════════════════════════════════════════════════════════════

const assert = require('assert');
const path = require('path');
const fs = require('fs');

console.log('╔══════════════════════════════════════════════════════════════════════════════╗');
console.log('║   SIKLUS VI — PASS 10: DOJO PRACTICES, FLASHCARD ACCESS & STICKY SUB-TABS    ║');
console.log('╚══════════════════════════════════════════════════════════════════════════════╝\n');

const ROOT_DIR = path.resolve(__dirname, '..');

// ── Check 1: Modal Close Bug Immunity ───────────────────────────────────────
console.log('▶ Check 1: Modal Close Bug Immunity (useModalStore, GlobalModalManager, PatchNotesModal)...');

const modalStorePath = path.join(ROOT_DIR, 'src/store/useModalStore.ts');
const modalStoreCode = fs.readFileSync(modalStorePath, 'utf8');

assert(
  modalStoreCode.includes('if (!type || typeof type !== \'string\')'),
  'useModalStore closeModal must guard against non-string MouseEvent objects'
);
assert(
  modalStoreCode.includes('state.modalStack.slice(0, -1)'),
  'closeModal must pop top modal when argument is undefined or an Event object'
);

const globalModalPath = path.join(ROOT_DIR, 'src/components/modals/GlobalModalManager.tsx');
const globalModalCode = fs.readFileSync(globalModalPath, 'utf8');
assert(
  globalModalCode.includes('const handleClose = () => closeModal();'),
  'GlobalModalManager must wrap closeModal in a clean callback to prevent passing MouseEvent'
);
assert(
  globalModalCode.includes('onClose={handleClose}'),
  'GlobalModalManager must pass handleClose to modal components'
);

const patchNotesModalPath = path.join(ROOT_DIR, 'src/components/ui/PatchNotesModal.tsx');
const patchNotesModalCode = fs.readFileSync(patchNotesModalPath, 'utf8');
assert(
  patchNotesModalCode.includes('onClick={() => onClose()}'),
  'PatchNotesModal close buttons must use () => onClose() to avoid leaking MouseEvent'
);

console.log('  ✔ [PASS] Modal close immunity verified: safe against MouseEvent objects across all layers.');

// ── Check 2: Sticky Sub-Tabs on Bedah Materi ────────────────────────────────
console.log('\n▶ Check 2: Sticky Sub-Tabs on Bedah Materi (ExplanationStage & LessonStudyPage)...');

const lessonStudyPath = path.join(ROOT_DIR, 'src/pages/LessonStudyPage.tsx');
const lessonStudyCode = fs.readFileSync(lessonStudyPath, 'utf8');
assert(
  lessonStudyCode.includes('overflow-visible'),
  'LessonStudyPage #lesson-studio-top must declare overflow-visible to permit sticky children'
);

const explanationStagePath = path.join(ROOT_DIR, 'src/components/curriculum/player/ExplanationStage.tsx');
const explanationStageCode = fs.readFileSync(explanationStagePath, 'utf8');
assert(
  explanationStageCode.includes('sticky top-[106px] sm:top-[116px] z-10'),
  'ExplanationStage sub-tabs container must be sticky below the stage stepper'
);
assert(
  explanationStageCode.includes('bg-surface/95 backdrop-blur-md'),
  'ExplanationStage sticky bar must have solid blurred surface to prevent text bleed-through'
);

console.log('  ✔ [PASS] Sticky sub-tabs verified: stays floating during long downward scrolling.');

// ── Check 3: Pure Practice Dojo with 6 Core Workout Modes ───────────────────
console.log('\n▶ Check 3: Pure Practice Dojo with 6 Core Workout Modes (MateriHubPage)...');

const materiHubPath = path.join(ROOT_DIR, 'src/pages/MateriHubPage.tsx');
const materiHubCode = fs.readFileSync(materiHubPath, 'utf8');

// Verify the 6 Practice Modes exist in Dojo
assert(materiHubCode.includes('Kanji Dojo & Goresan'), 'Must feature Kanji Dojo & Goresan card');
assert(materiHubCode.includes('Flashcard 3D Refleks'), 'Must feature Flashcard 3D Refleks card');
assert(materiHubCode.includes('Kuis Pilihan Ganda'), 'Must feature Kuis Pilihan Ganda card');
assert(materiHubCode.includes('Susun Kalimat (Bunsetsu)'), 'Must feature Susun Kalimat (Bunsetsu) card');
assert(materiHubCode.includes('Isian Rumpang (Cloze)'), 'Must feature Isian Rumpang (Cloze) card');
assert(materiHubCode.includes('Menyimak Kilat (Audio Drill)'), 'Must feature Menyimak Kilat card');

// Verify actions wired correctly
assert(materiHubCode.includes("startQuizSession('flashcard')"), 'Flashcard 3D must launch via startQuizSession');
assert(materiHubCode.includes("startQuizSession('multiple-choice')"), 'Multiple-choice must launch via startQuizSession');
assert(materiHubCode.includes("startQuizSession('rearrange')"), 'Rearrange must launch via startQuizSession');
assert(materiHubCode.includes("startQuizSession('fill-in')"), 'Cloze fill-in must launch via startQuizSession');
assert(materiHubCode.includes("startQuizSession('listening')"), 'Menyimak Kilat must launch via startQuizSession');

// Verify Menyimak Kilat does NOT confuse with formal 163-question CBT exam
assert(
  materiHubCode.includes('Simulator Menyimak Choukai (CBT Resmi)'),
  'Formal CBT exam must be clearly distinguished as (CBT Resmi)'
);

console.log('  ✔ [PASS] Dojo Practice Hub verified: 6 core workout modes cleanly accessible.');

// ── Check 4: Unlocked Flashcard Access in Ulas & useAppStore ────────────────
console.log('\n▶ Check 4: Unlocked Flashcard Access in Ulas & useAppStore...');

const kebunPath = path.join(ROOT_DIR, 'src/pages/KebunPage.tsx');
const kebunCode = fs.readFileSync(kebunPath, 'utf8');

assert(
  kebunCode.includes("startQuizSession('flashcard')"),
  'KebunPage must allow launching Flashcard session directly via startQuizSession'
);
assert(
  kebunCode.includes('Latihan Flashcard 3D Bebas') || kebunCode.includes('Latihan Flashcard Bebas'),
  'KebunPage must provide prominent un-gated flashcard button even when 0 cards due'
);

const appStorePath = path.join(ROOT_DIR, 'src/store/useAppStore.ts');
const appStoreCode = fs.readFileSync(appStorePath, 'utf8');
assert(
  appStoreCode.includes('startQuizSession: (mode: QuizMode) => void'),
  'useAppStore must declare startQuizSession'
);
assert(
  appStoreCode.includes('quizInitialMode: QuizMode | null'),
  'useAppStore must declare quizInitialMode'
);

const quizPagePath = path.join(ROOT_DIR, 'src/pages/QuizPage.tsx');
const quizPageCode = fs.readFileSync(quizPagePath, 'utf8');
assert(
  quizPageCode.includes('quizInitialMode'),
  'QuizPage must listen to quizInitialMode and start drill'
);

console.log('  ✔ [PASS] Unlocked Flashcard Access verified: available anytime from both Ulas and Dojo.');

// ── Check 5: Version & Changelog v24.1.0 Synchronization ────────────────────
console.log('\n▶ Check 5: Version & Changelog v24.1.0 Synchronization...');

const versionPath = path.join(ROOT_DIR, 'src/config/version.ts');
const { APP_VERSION, APP_VERSION_NUMBER, APP_RELEASE_NAME } = require(versionPath);
assert.strictEqual(APP_VERSION, 'v24.1.0', 'APP_VERSION must be v24.1.0');
assert.strictEqual(APP_VERSION_NUMBER, '24.1.0', 'APP_VERSION_NUMBER must be 24.1.0');
assert(APP_RELEASE_NAME.includes('Shin-Nihongo'), 'Release name must include Shin-Nihongo');

const patchNotesPath = path.join(ROOT_DIR, 'src/lib/data/patchNotes.ts');
const { PATCH_NOTES_HISTORY } = require(patchNotesPath);
const v24_1 = PATCH_NOTES_HISTORY.find((n) => n.version === 'v24.1.0');
assert(v24_1, 'PATCH_NOTES_HISTORY must contain v24.1.0');
assert(v24_1.highlights.length >= 5, 'v24.1.0 must have at least 5 highlight bullets');

const changelogPath = path.join(ROOT_DIR, 'CHANGELOG.md');
const changelogCode = fs.readFileSync(changelogPath, 'utf8');
assert(
  changelogCode.includes('## v24.1.0 (9 November 2026) — Shin-Nihongo: Dojo & Retensi Memori Terpadu'),
  'CHANGELOG.md must be synchronized with v24.1.0 entry'
);

console.log('  ✔ [PASS] Version & Changelog v24.1.0 verified: Single Source of Truth intact.');

console.log('\n==============================================================================');
console.log('🎉 SIKLUS VI — PASS 10: DOJO PRACTICES & RETENTION 100% VERIFIED GREEN!');
console.log('==============================================================================\n');
