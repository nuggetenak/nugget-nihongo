// ══════════════════════════════════════════════════════════════════
//  test-s7-sprint24-typescript-integrity.js
//  Sprint 24: TypeScript Strict Compilation & Runtime Integrity QA
//  Verifies 100% zero-error TypeScript build, facade exports, state
//  store contracts, audio/pitch types, and TDZ hoisting guards.
// ══════════════════════════════════════════════════════════════════

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

console.log('🧪 Running Suite: Sprint 24 — TypeScript Strict Compilation & Runtime Integrity QA\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    throw new Error(message);
  }
  console.log(`✅ PASS: ${message}`);
  passedTests++;
}

async function runTests() {
  // ── 1. TypeScript Strict Compilation (Zero Diagnostic Errors) ──
  console.log('--- [Check 1] Strict TypeScript Compiler Gate (tsc --noEmit) ---');
  let tscOutput = '';
  let tscStatus = 0;
  try {
    tscOutput = execSync('npx tsc --noEmit', {
      cwd: ROOT_DIR,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    });
  } catch (err) {
    tscStatus = err.status || 1;
    tscOutput = (err.stdout || '') + '\n' + (err.stderr || '');
  }

  assert(tscStatus === 0, `tsc --noEmit must exit with code 0 (got code ${tscStatus})\n${tscOutput}`);
  assert(!tscOutput.includes('error TS'), 'TypeScript compiler output must contain zero TS errors');

  // ── 2. Learn Feature Facade Re-export Verification ──
  console.log('\n--- [Check 2] Learn Feature Facade & Component Re-exports ---');
  const learnIndexPath = path.join(ROOT_DIR, 'src', 'features', 'learn', 'index.ts');
  assert(fs.existsSync(learnIndexPath), 'features/learn/index.ts must exist');

  const learnIndexContent = fs.readFileSync(learnIndexPath, 'utf8');
  assert(
    learnIndexContent.includes("from '../../components/materi/CurriculumTrackBrowser'"),
    'features/learn/index.ts must import CurriculumTrackBrowser from components/materi'
  );
  assert(
    learnIndexContent.includes("from '../../components/materi/curriculum/LessonRowNode'"),
    'features/learn/index.ts must import LessonRowNode from components/materi/curriculum'
  );
  assert(
    learnIndexContent.includes("from '../../components/materi/curriculum/TrackCategoryFilter'"),
    'features/learn/index.ts must import TrackCategoryFilter from components/materi/curriculum'
  );
  assert(
    learnIndexContent.includes("from '../../components/materi/curriculum/UnitAccordionCard'"),
    'features/learn/index.ts must import UnitAccordionCard from components/materi/curriculum'
  );
  assert(
    !learnIndexContent.includes('../../components/curriculum/'),
    'features/learn/index.ts must not contain broken paths to components/curriculum'
  );

  // ── 3. App Store Types & Deduplicated Completion Contracts ──
  console.log('\n--- [Check 3] App Store State & FSRS Ingestion Types ---');
  const appStorePath = path.join(ROOT_DIR, 'src', 'store', 'useAppStore.ts');
  const appStoreContent = fs.readFileSync(appStorePath, 'utf8');

  assert(
    appStoreContent.includes('export type TabType = AppState[\'activeTab\'];'),
    'useAppStore.ts must export TabType type definition'
  );
  assert(
    appStoreContent.includes('injectLessonItemsToFSRS: (grammarIds: (string | any)[], vocabIds: (string | any)[]) => void;'),
    'injectLessonItemsToFSRS must support both primitive IDs and rich item objects'
  );
  assert(
    appStoreContent.includes('completeLesson: (lessonId: string, grammarIds: (string | any)[], vocabIds: (string | any)[])'),
    'completeLesson must accept heterogeneous item lists'
  );
  assert(
    !appStoreContent.includes("activeTab === 'study'") || appStoreContent.includes('activeTab: \'study\''),
    'App store must maintain proper study tab type discrimination'
  );

  // ── 4. React Component Hook Declaration Order (TDZ Prevention) ──
  console.log('\n--- [Check 4] Hook State Hoisting & TDZ Prevention in CBT Simulators ---');
  const jftModalPath = path.join(ROOT_DIR, 'src', 'components', 'quiz', 'JftBasicCbtModal.tsx');
  const jftContent = fs.readFileSync(jftModalPath, 'utf8');
  const jftStateIdx = jftContent.indexOf('const [examState, setExamState] = useState');
  const jftEffectIdx = jftContent.indexOf("window.addEventListener('keydown', handleKeyDown);");
  assert(jftStateIdx !== -1 && jftEffectIdx !== -1, 'JftBasicCbtModal must declare examState and keyboard effect');
  assert(jftStateIdx < jftEffectIdx, 'examState useState must be hoisted above useEffect in JftBasicCbtModal');

  const prometricModalPath = path.join(ROOT_DIR, 'src', 'components', 'quiz', 'PrometricCbtModal.tsx');
  const prometricContent = fs.readFileSync(prometricModalPath, 'utf8');
  const prometricStateIdx = prometricContent.indexOf('const [examState, setExamState] = useState');
  const prometricEffectIdx = prometricContent.indexOf("window.addEventListener('keydown', handleKeyDown);");
  assert(prometricStateIdx !== -1 && prometricEffectIdx !== -1, 'PrometricCbtModal must declare examState and keyboard effect');
  assert(prometricStateIdx < prometricEffectIdx, 'examState useState must be hoisted above useEffect in PrometricCbtModal');

  // ── 5. Pitch Accent Phonology & Sound Engine Types ──
  console.log('\n--- [Check 5] Pitch Accent Phonology Engine & Audio Types ---');
  const pitchEnginePath = path.join(ROOT_DIR, 'src', 'lib', 'pitch', 'pitchEngine.ts');
  const pitchEngineContent = fs.readFileSync(pitchEnginePath, 'utf8');
  assert(pitchEngineContent.includes('export interface MoraUnit'), 'pitchEngine.ts must export MoraUnit interface');
  assert(
    pitchEngineContent.includes("export function playPitchToneMelody(moras: MoraUnit[], particlePitch?: 'high' | 'low')"),
    'playPitchToneMelody signature must accept MoraUnit array and particle pitch'
  );

  const explanationStagePath = path.join(ROOT_DIR, 'src', 'components', 'curriculum', 'player', 'ExplanationStage.tsx');
  const explanationContent = fs.readFileSync(explanationStagePath, 'utf8');
  assert(
    explanationContent.includes('type MoraUnit'),
    'ExplanationStage.tsx must import MoraUnit from pitchEngine'
  );
  assert(
    explanationContent.includes("particlePitch === 'H' ? 'high' : particlePitch === 'L' ? 'low' : particlePitch"),
    'ExplanationStage.tsx must properly normalize particlePitch before passing to playPitchToneMelody'
  );

  // ── 6. UI Navigation & Store Dependency Resolution ──
  console.log('\n--- [Check 6] UI Component Store Dependency Resolution ---');
  const globalModalManagerPath = path.join(ROOT_DIR, 'src', 'components', 'modals', 'GlobalModalManager.tsx');
  const globalModalContent = fs.readFileSync(globalModalManagerPath, 'utf8');
  assert(
    globalModalContent.includes("import { useAppStore } from '../../store/useAppStore';"),
    'GlobalModalManager must import useAppStore cleanly'
  );

  const toastPath = path.join(ROOT_DIR, 'src', 'components', 'ui', 'Toast.tsx');
  const toastContent = fs.readFileSync(toastPath, 'utf8');
  assert(
    !toastContent.includes('activeCbtSession'),
    'Toast.tsx must not reference nonexistent activeCbtSession'
  );
  assert(
    toastContent.includes('activeLessonContext'),
    'Toast.tsx must properly reference activeLessonContext for toast offset calculations'
  );

  // ── 7. Quiz Engine Variable Scoping & Synthesis ──
  console.log('\n--- [Check 7] Quiz Engine Question Scoping & Synthetic Item Attributes ---');
  const quizEnginePath = path.join(ROOT_DIR, 'src', 'lib', 'quiz', 'quizEngine.ts');
  const quizEngineContent = fs.readFileSync(quizEnginePath, 'utf8');
  const questionsDeclIdx = quizEngineContent.indexOf('const questions: QuizQuestionItem[] = [];');
  const listeningBranchIdx = quizEngineContent.indexOf("if (mode === 'listening') {");
  assert(questionsDeclIdx !== -1 && listeningBranchIdx !== -1, 'quizEngine must declare questions and listening branch');
  assert(
    questionsDeclIdx < listeningBranchIdx,
    'questions array must be hoisted before listening questions generator'
  );
  assert(
    quizEngineContent.includes("romaji: record.itemData?.romaji || '',") && quizEngineContent.includes("pos: record.itemData?.pos || 'noun'"),
    'quizEngine must synthesize complete vocab objects with romaji and pos'
  );

  console.log('\n══════════════════════════════════════════════════════════════════');
  console.log(`🎉 SPRINT 24 AUDIT COMPLETE: ${passedTests}/${totalTests} TESTS PASSED 100% GREEN!`);
  console.log('══════════════════════════════════════════════════════════════════\n');
}

runTests().catch((err) => {
  console.error(err);
  process.exit(1);
});
