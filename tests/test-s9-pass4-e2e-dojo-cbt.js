// ══════════════════════════════════════════════════════════════════
//  test-s9-pass4-e2e-dojo-cbt.js
//  Siklus IX Pass 4: Dojo Reflex Drills & Exam CBT Simulator Suite
//  Verifies 3 Clean Doors LMS portal, 15-minute Prometric CBT runner,
//  ADHD smart pause, 15-question review drawer, Choukai simulator,
//  and full-cycle scoring / remedial wrong-item retry engine.
// ══════════════════════════════════════════════════════════════════

import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

console.log('╔══════════════════════════════════════════════════════════════════╗');
console.log('║   SIKLUS IX PASS 4: DOJO REFLEX & CBT SIMULATOR VERIFICATION    ║');
console.log('║   Suite 206 | 3 Clean Doors, Prometric CBT & Remedial Engine     ║');
console.log('╚══════════════════════════════════════════════════════════════════╝\n');

let passCount = 0;
const totalChecks = 6;

// ── Check 1: ExamLmsHub "The 3 Clean Doors" Portal Architecture & Visual Detox ──
console.log('📋 Check 1: ExamLmsHub The 3 Clean Doors & Scaffolding Modes');
{
  const hubPath = path.join(ROOT, 'src/components/exercise/ExamLmsHub.tsx');
  assert(fs.existsSync(hubPath), 'ExamLmsHub.tsx must exist');
  const hubContent = fs.readFileSync(hubPath, 'utf8');

  // Verify The 3 Clean Doors are present and explicitly labeled
  assert(hubContent.includes('Pintu 1') && hubContent.includes('Pusat Ujian JLPT'), 'Door 1 (JLPT) must be declared');
  assert(hubContent.includes('Pintu 2') && hubContent.includes('Pusat Tokutei Ginou'), 'Door 2 (SSW/JFT) must be declared');
  assert(hubContent.includes('Pintu 3') && hubContent.includes('Latihan Cepat & Review'), 'Door 3 (Rapid Drill) must be declared');

  // Verify crash recovery session banner for uncompleted CBT exams
  assert(hubContent.includes('savedSessionAvailable'), 'Must check savedSessionAvailable from useExerciseStore');
  assert(hubContent.includes('restoreSavedSession'), 'Must provide restoreSavedSession trigger');
  assert(hubContent.includes('discardSavedSession'), 'Must provide discardSavedSession trigger');

  // Verify Washi & Sumi visual detox: no shadow-glow on primary CTA buttons
  assert(!hubContent.includes('shadow-glow'), 'ExamLmsHub must eliminate neon shadow-glow on buttons');

  // Verify pre-test scaffolding modal with authentic Irasutoya anchor
  assert(hubContent.includes('selectedSetForPretest'), 'Must support set selection for pre-test modal');
  assert(hubContent.includes('Konfigurasi Mode Pengerjaan'), 'Must declare Pre-Test modal heading');
  assert(hubContent.includes('senpai_studying') && hubContent.includes('animateFloat'), 'Must render Senpai Studying anchor in pre-test modal');
  assert(hubContent.includes("setPretestMode('strict')") && hubContent.includes("setPretestMode('guided')"), 'Must allow switching between strict and guided modes');

  // Verify responsive touch targets (minimum 40px)
  assert(hubContent.includes('min-h-[40px]') || hubContent.includes('min-h-[44px]'), 'Must enforce mobile touch targets');

  passCount++;
  console.log('  ✔ ExamLmsHub 3-door architecture, crash recovery, and pre-test modal verified.\n');
}

// ── Check 2: CbtRunnerScreen Distraction-Free Layout, Timer & Emergency Recovery ──
console.log('📋 Check 2: CbtRunnerScreen Fullscreen Distraction-Free Runner & Timer');
{
  const runnerPath = path.join(ROOT, 'src/components/exercise/CbtRunnerScreen.tsx');
  assert(fs.existsSync(runnerPath), 'CbtRunnerScreen.tsx must exist');
  const runnerContent = fs.readFileSync(runnerPath, 'utf8');

  // Verify body scroll lock during CBT examination
  assert(runnerContent.includes('useBodyScrollLock(true)'), 'Must lock body scroll during CBT exam');

  // Verify zero slop: no shadow-glow, no extreme z-indices
  assert(!runnerContent.includes('shadow-glow'), 'CbtRunnerScreen must eliminate shadow-glow');
  assert(!runnerContent.includes('z-[9999]') && !runnerContent.includes('z-[99999]'), 'Must not use extreme z-indices');

  // Verify background-sleep recovery via visibilitychange
  assert(runnerContent.includes('visibilitychange'), 'Must attach visibilitychange listener');
  assert(runnerContent.includes('tickTimer('), 'Must call tickTimer with elapsed seconds delta');

  // Verify ADHD smart pause overlay
  assert(runnerContent.includes('isPaused'), 'Must support pause state');
  assert(runnerContent.includes('assetId="senpai_studying"') && runnerContent.includes('Sesi Latihan Dijeda'), 'Must render Senpai anchor on pause overlay');

  // Verify exit guard confirmation dialog with local persistence reassurance
  assert(runnerContent.includes('isExitGuardOpen'), 'Must support accidental exit guard modal');
  assert(runnerContent.includes('assetId="daruma_recovery"') && runnerContent.includes('Konfirmasi Keluar'), 'Must render Daruma recovery anchor in exit guard');

  passCount++;
  console.log('  ✔ CbtRunnerScreen distraction-free layout, timer recovery, and pause/exit guards verified.\n');
}

// ── Check 3: 15-Question Review Drawer & Question State Transitions ──
console.log('📋 Check 3: 15-Question Review Drawer & Touch Ergonomics');
{
  const runnerContent = fs.readFileSync(path.join(ROOT, 'src/components/exercise/CbtRunnerScreen.tsx'), 'utf8');

  // Verify 15-question review drawer
  assert(runnerContent.includes('isDrawerOpen'), 'Must support review drawer open/close');
  assert(runnerContent.includes('Navigasi 15 Nomor Soal'), 'Must display 15-question navigation drawer header');
  assert(runnerContent.includes('grid-cols-5'), 'Must render 5-column grid for 15 question tiles');

  // Verify question state indicators: answered, flagged, and current
  assert(runnerContent.includes('isAnswered'), 'Must track answered state per tile');
  assert(runnerContent.includes('isFlagged'), 'Must track flagged state per tile');
  assert(runnerContent.includes('isCurrent'), 'Must highlight current question tile');

  // Verify option button dimensions for mobile touch targets
  assert(runnerContent.includes('min-h-[56px]'), 'Multiple choice options must provide >= 56px touch target');
  assert(runnerContent.includes('min-h-[44px]'), 'Control navigation buttons must provide >= 44px touch target');

  // Verify high-contrast dual-theme color tokens
  assert(runnerContent.includes('text-amber-900 dark:text-amber-300 font-bold'), 'Option selection must use high-contrast dual-theme text');

  passCount++;
  console.log('  ✔ 15-question review drawer, tile states, and mobile touch targets verified.\n');
}

// ── Check 4: CBT Scoring Engine, Passing Threshold & Record Persistence ──
console.log('📋 Check 4: useExerciseStore Timer Math, Scoring & Record Persistence');
{
  const storePath = path.join(ROOT, 'src/store/useExerciseStore.ts');
  assert(fs.existsSync(storePath), 'useExerciseStore.ts must exist');

  const { useExerciseStore } = await import('../src/store/useExerciseStore.ts');
  const store = useExerciseStore.getState();

  // 1. Test timer ticking in strict mode (counts down)
  useExerciseStore.setState({
    mode: 'strict',
    remainingSeconds: 900,
    isPaused: false,
    isSubmitted: false,
  });
  useExerciseStore.getState().tickTimer(10);
  assert.strictEqual(useExerciseStore.getState().remainingSeconds, 890, 'Strict timer must count down by delta');

  // 2. Test timer ticking in guided mode (counts up)
  useExerciseStore.setState({
    mode: 'guided',
    remainingSeconds: 30,
    isPaused: false,
    isSubmitted: false,
  });
  useExerciseStore.getState().tickTimer(5);
  assert.strictEqual(useExerciseStore.getState().remainingSeconds, 35, 'Guided timer must count up by delta');

  // 3. Test pause toggle prevents timer tick
  useExerciseStore.setState({ isPaused: true, remainingSeconds: 35 });
  useExerciseStore.getState().tickTimer(10);
  assert.strictEqual(useExerciseStore.getState().remainingSeconds, 35, 'Paused timer must not change');
  useExerciseStore.getState().togglePause();
  assert.strictEqual(useExerciseStore.getState().isPaused, false, 'Pause toggle must resume session');

  // 4. Test question answering and flag toggle
  const mockSet = {
    setId: 'test-set-01',
    title: 'JLPT N5 Golden Set 01',
    trackType: 'jlpt',
    level: 'n5',
    targetUnits: 'Unit 1-5',
    timeLimitMinutes: 15,
    passingScore: 11, // 11/15 is passing threshold
    items: [
      { id: 'item-1', correctOptionIndex: 0, options: ['A', 'B', 'C', 'D'] },
      { id: 'item-2', correctOptionIndex: 1, options: ['A', 'B', 'C', 'D'] },
      { id: 'item-3', correctOptionIndex: 2, options: ['A', 'B', 'C', 'D'] },
      { id: 'item-4', correctOptionIndex: 3, options: ['A', 'B', 'C', 'D'] },
      { id: 'item-5', correctOptionIndex: 0, options: ['A', 'B', 'C', 'D'] },
    ],
  };

  useExerciseStore.setState({ currentSet: mockSet, userAnswers: {}, flaggedIndices: [], isSubmitted: false });
  useExerciseStore.getState().selectOption(0, 2);
  assert.strictEqual(useExerciseStore.getState().userAnswers[0], 2, 'Selected option must be recorded');
  useExerciseStore.getState().toggleFlag(0);
  assert(useExerciseStore.getState().flaggedIndices.includes(0), 'Question 0 must be flagged');
  useExerciseStore.getState().toggleFlag(0);
  assert(!useExerciseStore.getState().flaggedIndices.includes(0), 'Flag must be toggled off');

  // 5. Test audio replay consumption (strict mode enforces maximum 2 replays)
  useExerciseStore.setState({ mode: 'strict', audioReplays: {} });
  const play1 = useExerciseStore.getState().consumeAudioReplay(0);
  const play2 = useExerciseStore.getState().consumeAudioReplay(0);
  const play3 = useExerciseStore.getState().consumeAudioReplay(0);
  assert.strictEqual(play1, true, 'Replay 1 must be permitted');
  assert.strictEqual(play2, true, 'Replay 2 must be permitted');
  assert.strictEqual(play3, false, 'Replay 3 in strict mode must be rejected');

  // 6. Test submission score calculation & record saving
  useExerciseStore.setState({
    currentSet: mockSet,
    userAnswers: { 0: 0, 1: 1, 2: 2, 3: 0, 4: 0 }, // 4 correct, 1 wrong (item-4)
    mode: 'strict',
    remainingSeconds: 600,
    isSubmitted: false,
    sessionSummary: null,
  });

  const summary = useExerciseStore.getState().submitTest();
  assert(summary !== null, 'Submission summary must be generated');
  assert.strictEqual(summary.correctCount, 4, 'Correct count must equal 4');
  assert.strictEqual(summary.totalQuestions, 5, 'Total questions must equal 5');
  assert.strictEqual(summary.percentage, 80, 'Percentage must be 80%');
  assert.strictEqual(summary.wrongItemIds.length, 1, 'Exactly 1 wrong item ID must be captured');
  assert.strictEqual(summary.wrongItemIds[0], 'item-4', 'Wrong item ID must be item-4');

  // Verify defensive null checks on mistake items
  const mistakeIds = useExerciseStore.getState().getMistakeItemIdsForTrack('jlpt');
  assert(Array.isArray(mistakeIds), 'Mistake item IDs must be returned as array');

  passCount++;
  console.log('  ✔ useExerciseStore timer math, scoring, and mistake records verified.\n');
}

// ── Check 5: Choukai Simulator Engine & JFT-Basic Official Exam Bank ──
console.log('📋 Check 5: ChoukaiSimulatorPage Layout & Audio Player Integration');
{
  const choukaiPath = path.join(ROOT, 'src/pages/ChoukaiSimulatorPage.tsx');
  assert(fs.existsSync(choukaiPath), 'ChoukaiSimulatorPage.tsx must exist');
  const choukaiContent = fs.readFileSync(choukaiPath, 'utf8');

  // Verify safe-area bottom cushion and horizontal overflow anti-leakage
  assert(choukaiContent.includes('pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12'), 'Must preserve standalone bottom-nav clearance cushion');
  assert(choukaiContent.includes('overflow-x-hidden'), 'Must enforce horizontal overflow anti-leakage constraint');

  // Verify zero text-bg contrast defects
  assert(!choukaiContent.includes('text-bg'), 'Must eliminate light-mode text-bg contrast defects');
  assert(choukaiContent.includes('text-stone-950 font-bold'), 'Buttons must use high-contrast text-stone-950');

  // Verify JFT-Basic CBT simulator structure
  assert(choukaiContent.includes('JFT-Basic CBT Simulator'), 'Must declare JFT-Basic CBT simulator header');
  assert(choukaiContent.includes('CHOUKAI_QUESTION_SETS'), 'Must import official Choukai question sets');
  assert(choukaiContent.includes('ChoukaiAudioPlayer'), 'Must embed ChoukaiAudioPlayer component');

  // Verify authentic Irasutoya celebration anchors
  assert(choukaiContent.includes('celebration_kusudama'), 'Must render Kusudama anchor on high scores');
  assert(choukaiContent.includes('daruma_recovery'), 'Must render Daruma anchor on remedial scores');

  passCount++;
  console.log('  ✔ ChoukaiSimulatorPage viewport padding, audio player, and contrast verified.\n');
}

// ── Check 6: Full-Stack Dojo Integration & Remedial Retry Loop ──
console.log('📋 Check 6: Full-Stack Dojo Integration & Remedial Retry Loop');
{
  const quizPagePath = path.join(ROOT, 'src/pages/QuizPage.tsx');
  assert(fs.existsSync(quizPagePath), 'QuizPage.tsx must exist');
  const quizPageContent = fs.readFileSync(quizPagePath, 'utf8');

  // Verify QuizPage 3-state view navigation
  assert(quizPageContent.includes("viewState === 'hub'"), 'Must support hub view state');
  assert(quizPageContent.includes("viewState === 'cbt'"), 'Must support cbt view state');
  assert(quizPageContent.includes("viewState === 'quiz'"), 'Must support quiz view state');

  // Verify ExamLmsHub and CbtRunnerScreen mount points
  assert(quizPageContent.includes('<ExamLmsHub'), 'Must mount ExamLmsHub in hub view');
  assert(quizPageContent.includes('<CbtRunnerScreen'), 'Must mount CbtRunnerScreen in cbt view');

  // Verify remedial retry loop in useExerciseStore
  const { useExerciseStore } = await import('../src/store/useExerciseStore.ts');
  const mockSetWithWrong = {
    setId: 'set-remedial-test',
    title: 'Unit 1 Test',
    items: [
      { id: 'w-1', correctOptionIndex: 0, options: ['A', 'B'] },
      { id: 'w-2', correctOptionIndex: 1, options: ['A', 'B'] },
    ],
  };

  useExerciseStore.setState({
    currentSet: mockSetWithWrong,
    sessionSummary: {
      setId: 'set-remedial-test',
      trackType: 'jlpt',
      totalQuestions: 2,
      correctCount: 1,
      percentage: 50,
      isPassed: false,
      timeSpentSeconds: 120,
      wrongItemIds: ['w-2'],
      mode: 'strict',
      completedAt: new Date().toISOString(),
    },
    isSubmitted: true,
  });

  useExerciseStore.getState().retryWrongQuestions();
  const remediatedSet = useExerciseStore.getState().currentSet;
  assert(remediatedSet !== null, 'Remediated set must be loaded');
  assert.strictEqual(remediatedSet.items.length, 1, 'Only wrong items must be retained in remedial session');
  assert.strictEqual(remediatedSet.items[0].id, 'w-2', 'Remedial item must be w-2');
  assert.strictEqual(useExerciseStore.getState().mode, 'guided', 'Remedial session must switch to guided scaffolding');
  assert.strictEqual(useExerciseStore.getState().isSubmitted, false, 'isSubmitted must reset to false');

  passCount++;
  console.log('  ✔ Dojo view routing and remedial wrong-item retry engine verified.\n');
}

// ── Summary & Certification ──
console.log('══════════════════════════════════════════════════════════════════');
console.log(`🎉 ALL ${passCount}/${totalChecks} SIKLUS IX PASS 4 CHECKS PASSED (100% GREEN)`);
console.log('   Door 1 (JLPT), Door 2 (SSW), Door 3 (Rapid Drill), 15m Prometric CBT,');
console.log('   Choukai Simulator, and Remedial Retry Engine certified.');
console.log('══════════════════════════════════════════════════════════════════\n');
