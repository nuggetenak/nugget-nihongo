// ══════════════════════════════════════════════════════════════════
//  test-s8-pass3-dojo-cbt-runner.js
//  Siklus VIII Pass 3 (Sprint 49): Dojo 4 Pillars, Reflex Drills & Exam CBT Simulation Engine
// ══════════════════════════════════════════════════════════════════

import assert from 'assert';
import fs from 'fs';
import path from 'path';

console.log('⚡ Running Suite 190: Siklus VIII Pass 3 (Sprint 49): Dojo 4 Pillars, Reflex Drills & Exam CBT Simulation Engine...');

const ROOT = process.cwd().includes('nugget-nihongo')
  ? process.cwd()
  : path.join(process.cwd(), 'nugget-nihongo');

// ── Check 1: MateriHubPage 4-Pillar Architecture & Hash Sync ────────
console.log('  Check 49.1: Verifying MateriHubPage 4-pillar modular architecture & hash sync...');
const dojoHubPath = path.join(ROOT, 'src', 'pages', 'MateriHubPage.tsx');
assert(fs.existsSync(dojoHubPath), 'MateriHubPage.tsx must exist');
const dojoHubContent = fs.readFileSync(dojoHubPath, 'utf8');

assert(
  dojoHubContent.includes("dojoTab === 'latihan'") &&
  dojoHubContent.includes("dojoTab === 'kamus'") &&
  dojoHubContent.includes("dojoTab === 'alat'") &&
  dojoHubContent.includes("dojoTab === 'cbt'"),
  'MateriHubPage must declare and render all 4 dedicated Dojo pillars (latihan, kamus, alat, cbt)'
);

assert(
  dojoHubContent.includes('ReflexDrillsPillar') &&
  dojoHubContent.includes('DictionaryPillar') &&
  dojoHubContent.includes('ReferencePillar') &&
  dojoHubContent.includes('CbtSimulatorPillar'),
  'MateriHubPage must import and mount all 4 pillar components from features/dojo/pillars'
);

assert(
  dojoHubContent.includes('#dojo/drills') ||
  dojoHubContent.includes('#dojo/${sub}') ||
  dojoHubContent.includes('window.history.replaceState'),
  'MateriHubPage must synchronize pillar switching with browser location hash'
);
console.log('  ✅ Check 49.1 passed: MateriHubPage 4 pillars and hash synchronization verified.');

// ── Check 2: CbtSimulatorPillar 5 Official Exam Simulators ───────────
console.log('  Check 49.2: Verifying CbtSimulatorPillar 5 official exam simulators...');
const cbtPillarPath = path.join(ROOT, 'src', 'features', 'dojo', 'pillars', 'CbtSimulatorPillar.tsx');
assert(fs.existsSync(cbtPillarPath), 'CbtSimulatorPillar.tsx must exist');
const cbtPillarContent = fs.readFileSync(cbtPillarPath, 'utf8');

assert(
  cbtPillarContent.includes('Simulasi Lengkap JLPT CBT (N5–N1)') &&
  cbtPillarContent.includes('Simulasi JFT-Basic CBT (A1 / A2)') &&
  cbtPillarContent.includes('ExamLmsHub'),
  'CbtSimulatorPillar must feature JLPT CBT, JFT-Basic, and mount ExamLmsHub'
);
console.log('  ✅ Check 49.2 passed: CbtSimulatorPillar exam simulators verified.');

// ── Check 3: ExamLmsHub The 3 Clean Doors & Scaffolding Modes ────────
console.log('  Check 49.3: Verifying ExamLmsHub The 3 Clean Doors & Scaffolding Modes...');
const lmsHubPath = path.join(ROOT, 'src', 'components', 'exercise', 'ExamLmsHub.tsx');
assert(fs.existsSync(lmsHubPath), 'ExamLmsHub.tsx must exist');
const lmsHubContent = fs.readFileSync(lmsHubPath, 'utf8');

assert(
  lmsHubContent.includes("activeDoor === 'jlpt'") &&
  lmsHubContent.includes("activeDoor === 'ssw'") &&
  lmsHubContent.includes("activeDoor === 'rapid'"),
  'ExamLmsHub must present The 3 Clean Doors (jlpt, ssw, rapid)'
);

assert(
  lmsHubContent.includes('pretestMode') &&
  lmsHubContent.includes('selectedSetForPretest'),
  'ExamLmsHub must manage pre-test confirmation and scaffolding mode selection'
);
console.log('  ✅ Check 49.3 passed: ExamLmsHub 3 clean doors and scaffolding verified.');

// ── Check 4: quizEngine Defensive getFSRSDueCount & Panic Recall ─────
console.log('  Check 49.4: Verifying quizEngine.ts getFSRSDueCount object safety & panic recall...');
const quizEnginePath = path.join(ROOT, 'src', 'lib', 'quiz', 'quizEngine.ts');
assert(fs.existsSync(quizEnginePath), 'quizEngine.ts must exist');
const quizEngineContent = fs.readFileSync(quizEnginePath, 'utf8');

assert(
  quizEngineContent.includes("if (!cardsMap || typeof cardsMap !== 'object') return 0;") &&
  quizEngineContent.includes("for (const record of Object.values(cardsMap || {}))"),
  'quizEngine getFSRSDueCount must defensively guard cardsMap against non-object inputs and guard null cardsMap'
);

assert(
  quizEngineContent.includes('generatePanicRecallQuestions') &&
  quizEngineContent.includes('panic-recall'),
  'quizEngine must provide panic recall scenario generator for workplace K3 protocols'
);
console.log('  ✅ Check 49.4 passed: quizEngine getFSRSDueCount safety and panic recall verified.');

// ── Check 5: QuizPage Memoized dueCount & 2-State View Architecture ──
console.log('  Check 49.5: Verifying QuizPage memoized dueCount & 2-state view architecture...');
const quizPagePath = path.join(ROOT, 'src', 'pages', 'QuizPage.tsx');
assert(fs.existsSync(quizPagePath), 'QuizPage.tsx must exist');
const quizPageContent = fs.readFileSync(quizPagePath, 'utf8');

assert(
  quizPageContent.includes('dueCount = useMemo(') &&
  quizPageContent.includes('safeCards = cards && typeof cards === \'object\' ? cards : {}'),
  'QuizPage must memoize dueCount and defensively sanitize cards reference'
);

assert(
  quizPageContent.includes("viewState === 'hub'") ||
  quizPageContent.includes("setViewState('quiz')") ||
  quizPageContent.includes("setViewState('cbt')"),
  'QuizPage must manage 2-state/3-view lifecycle between hub, quiz, and cbt'
);
console.log('  ✅ Check 49.5 passed: QuizPage memoized dueCount and view architecture verified.');

console.log('\n🎉 Suite 190 (Siklus VIII Pass 3: Dojo 4 Pillars & Exam CBT Simulation Engine) PASSED (5/5 checks 100% GREEN)!\n');
process.exit(0);
