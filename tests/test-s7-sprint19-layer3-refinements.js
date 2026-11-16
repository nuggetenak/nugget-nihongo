// ══════════════════════════════════════════════════════════════════
//  test-s7-sprint19-layer3-refinements.js
//  Sprint 19: Lapisan 3 Dojo Latihan, Simulator CBT & Pusat Retensi FSRS
// ══════════════════════════════════════════════════════════════════

import assert from 'assert';
import fs from 'fs';
import path from 'path';

console.log('⚡ Running Suite 160: Lapisan 3 Dojo, CBT & FSRS Retention Refinements...');

const ROOT = process.cwd().includes('nugget-nihongo')
  ? process.cwd()
  : path.join(process.cwd(), 'nugget-nihongo');

// ── Check 1: App.tsx Dual-Format Hash Sub-Routing ─────────────────────
console.log('  Check 19.1: Verifying App.tsx dual-format hash sub-routing for Dojo...');
const appPath = path.join(ROOT, 'src', 'App.tsx');
assert(fs.existsSync(appPath), 'App.tsx must exist');
const appContent = fs.readFileSync(appPath, 'utf8');

assert(
  appContent.includes("rootSegment.startsWith('dojo-')") &&
  appContent.includes("subSegment = rootSegment.substring(5)"),
  'App.tsx must parse kebab-case hash sub-routing (e.g. #dojo-drills, #dojo-kamus, #dojo-pustaka, #dojo-cbt)'
);
assert(
  appContent.includes("subSegment === 'pustaka'") &&
  appContent.includes("setDojoTab('alat')"),
  'App.tsx must map pustaka/reference sub-routes to alat tab'
);
console.log('  ✅ Check 19.1 passed: Dual-format hash sub-routing verified.');

// ── Check 2: CanDoCompletionStage Interconnection Bridges ─────────────
console.log('  Check 19.2: Verifying CanDoCompletionStage interconnection bridges...');
const canDoPath = path.join(ROOT, 'src', 'components', 'curriculum', 'player', 'CanDoCompletionStage.tsx');
assert(fs.existsSync(canDoPath), 'CanDoCompletionStage.tsx must exist');
const canDoContent = fs.readFileSync(canDoPath, 'utf8');

assert(
  canDoContent.includes("setDojoTab('latihan')") &&
  canDoContent.includes("setActiveTab('materi')") &&
  canDoContent.includes('Latih Refleks di Dojo'),
  'CanDoCompletionStage must bridge completed lesson to Dojo Reflex Drills'
);
assert(
  canDoContent.includes("setActiveTab('kebun')") &&
  canDoContent.includes('Ulas di Kebun Memori'),
  'CanDoCompletionStage must bridge completed lesson to Kebun Memori / FSRS Retention'
);
console.log('  ✅ Check 19.2 passed: Interconnection bridges verified.');

// ── Check 3: ReflexDrillsPillar Touch Targets ─────────────────────────
console.log('  Check 19.3: Verifying ReflexDrillsPillar touch targets...');
const reflexPath = path.join(ROOT, 'src', 'features', 'dojo', 'pillars', 'ReflexDrillsPillar.tsx');
assert(fs.existsSync(reflexPath), 'ReflexDrillsPillar.tsx must exist');
const reflexContent = fs.readFileSync(reflexPath, 'utf8');

assert(
  reflexContent.includes('min-h-[40px]') && reflexContent.includes('active:scale-95'),
  'ReflexDrillsPillar level buttons must meet >= 40px touch ergonomics with active:scale-95 feedback'
);
console.log('  ✅ Check 19.3 passed: ReflexDrillsPillar touch ergonomics verified.');

// ── Check 4: DictionaryPillar Touch Targets & Filters ──────────────────
console.log('  Check 19.4: Verifying DictionaryPillar ergonomics & filter chips...');
const dictPath = path.join(ROOT, 'src', 'features', 'dojo', 'pillars', 'DictionaryPillar.tsx');
assert(fs.existsSync(dictPath), 'DictionaryPillar.tsx must exist');
const dictContent = fs.readFileSync(dictPath, 'utf8');

assert(
  dictContent.includes('min-h-[40px]') && dictContent.includes('px-3.5 py-2'),
  'DictionaryPillar sub-track & sub-tab buttons must meet >= 40px touch targets'
);
assert(
  dictContent.includes('min-h-[40px] min-w-[40px]'),
  'DictionaryPillar view mode switcher button must meet >= 40px touch target'
);
assert(
  dictContent.includes('min-h-[40px]') && dictContent.includes('px-3 py-2'),
  'DictionaryPillar POS and particle filter chips must meet >= 40px touch targets'
);
console.log('  ✅ Check 19.4 passed: DictionaryPillar touch ergonomics verified.');

// ── Check 5: DokkaiSheet Furigana Toggle & RubyText ────────────────────
console.log('  Check 19.5: Verifying DokkaiSheet Furigana toggle & RubyText rendering...');
const dokkaiPath = path.join(ROOT, 'src', 'components', 'exercise', 'DokkaiSheet.tsx');
assert(fs.existsSync(dokkaiPath), 'DokkaiSheet.tsx must exist');
const dokkaiContent = fs.readFileSync(dokkaiPath, 'utf8');

assert(
  dokkaiContent.includes('RubyText') &&
  dokkaiContent.includes('showFurigana') &&
  dokkaiContent.includes('setShowFurigana'),
  'DokkaiSheet must support Furigana toggle with RubyText rendering'
);
assert(
  dokkaiContent.includes('min-h-[40px]') && dokkaiContent.includes('active:scale-95'),
  'DokkaiSheet furigana toggle button must meet >= 40px touch target'
);
console.log('  ✅ Check 19.5 passed: DokkaiSheet Furigana toggle verified.');

// ── Check 6: QuizPage Bilingual FSRS Grading & Thumb Ergonomics ────────
console.log('  Check 19.6: Verifying QuizPage FSRS grading buttons & thumb targets...');
const quizPath = path.join(ROOT, 'src', 'pages', 'QuizPage.tsx');
assert(fs.existsSync(quizPath), 'QuizPage.tsx must exist');
const quizContent = fs.readFileSync(quizPath, 'utf8');

assert(
  quizContent.includes('Again') &&
  quizContent.includes('Lupa') &&
  quizContent.includes('Hard') &&
  quizContent.includes('Ragu') &&
  quizContent.includes('Good') &&
  quizContent.includes('Ingat') &&
  quizContent.includes('Easy') &&
  quizContent.includes('Mudah'),
  'QuizPage must provide bilingual FSRS rating labels'
);
assert(
  quizContent.includes('min-h-[50px] sm:min-h-[54px]'),
  'QuizPage FSRS rating buttons must provide comfortable thumb ergonomics >= 50px'
);
assert(
  quizContent.includes('min-h-[40px] min-w-[40px]'),
  'QuizPage micro-actions (Flag & Volume) must meet >= 40px touch targets'
);
console.log('  ✅ Check 19.6 passed: QuizPage FSRS grading & thumb ergonomics verified.');

// ── Check 7: KebunPage Streak Resilience & Milestone XP Visualizer ─────
console.log('  Check 19.7: Verifying KebunPage Streak Resilience & Milestone XP Visualizer...');
const kebunPath = path.join(ROOT, 'src', 'pages', 'KebunPage.tsx');
assert(fs.existsSync(kebunPath), 'KebunPage.tsx must exist');
const kebunContent = fs.readFileSync(kebunPath, 'utf8');

assert(
  kebunContent.includes('Freeze Shield: 36 Jam') &&
  kebunContent.includes('Streak Resilience & Anti-Burnout'),
  'KebunPage must display 36-hour freeze shield status and streak resilience indicator'
);
assert(
  kebunContent.includes('Kata Sensei:') &&
  kebunContent.includes('streakCoachingQuote'),
  'KebunPage must display Sensei coaching tip for streak motivation'
);
assert(
  kebunContent.includes('getLevelForXp') &&
  kebunContent.includes('getNextLevelProgress'),
  'KebunPage must calculate and display milestone XP progression'
);
assert(
  kebunContent.includes('Progress Menuju Level') &&
  kebunContent.includes('progressPercent'),
  'KebunPage must visualize level progress bar'
);
assert(
  kebunContent.includes('Antrean Kartu FSRS Due') &&
  kebunContent.includes('fsrsStats.dueCards'),
  'KebunPage must render FSRS Due queue preview in metrics view'
);
assert(
  kebunContent.includes("activeView === 'garden'") &&
  kebunContent.includes("activeView === 'metrics'"),
  'KebunPage must strictly preserve dual-view contract'
);
assert(
  kebunContent.includes('min-h-[40px]') && kebunContent.includes('handleWaterSingle'),
  'KebunPage single water button and filter buttons must enforce min-h-[40px]'
);
console.log('  ✅ Check 19.7 passed: KebunPage Streak Resilience & Milestone XP verified.');

// ── Check 8: MateriHubPage 4-Pillar Mode Switcher Ergonomics ───────────
console.log('  Check 19.8: Verifying MateriHubPage 4-pillar mode switcher ergonomics...');
const hubPath = path.join(ROOT, 'src', 'pages', 'MateriHubPage.tsx');
assert(fs.existsSync(hubPath), 'MateriHubPage.tsx must exist');
const hubContent = fs.readFileSync(hubPath, 'utf8');

assert(
  hubContent.includes("dojoTab === 'latihan'") &&
  hubContent.includes("dojoTab === 'kamus'") &&
  hubContent.includes("dojoTab === 'alat'") &&
  hubContent.includes("dojoTab === 'cbt'"),
  'MateriHubPage must declare 4 distinct dojo pillars'
);
assert(
  hubContent.includes('min-h-[40px]') && hubContent.includes('handleSelectDojoTab'),
  'MateriHubPage 4-pillar buttons must meet >= 40px touch ergonomics'
);
console.log('  ✅ Check 19.8 passed: MateriHubPage 4-pillar switcher verified.');

// ── Check 9: Reference & CBT Simulator Pillars ─────────────────────────
console.log('  Check 19.9: Verifying Reference & CBT Simulator Pillars...');
const refPath = path.join(ROOT, 'src', 'features', 'dojo', 'pillars', 'ReferencePillar.tsx');
assert(fs.existsSync(refPath), 'ReferencePillar.tsx must exist');
const refContent = fs.readFileSync(refPath, 'utf8');

assert(
  refContent.includes('min-h-[40px]') && refContent.includes('selectedCategoryFilter'),
  'ReferencePillar category filter pills must enforce min-h-[40px]'
);
assert(
  refContent.includes('min-h-[220px]') && refContent.includes('renderDojoToolCard'),
  'ReferencePillar cards must declare min-h-[220px] for consistent breathing room'
);

const cbtPath = path.join(ROOT, 'src', 'features', 'dojo', 'pillars', 'CbtSimulatorPillar.tsx');
assert(fs.existsSync(cbtPath), 'CbtSimulatorPillar.tsx must exist');
const cbtContent = fs.readFileSync(cbtPath, 'utf8');

assert(
  cbtContent.includes('Simulasi Lengkap JLPT CBT') &&
  cbtContent.includes('Simulasi JFT-Basic CBT') &&
  cbtContent.includes('Simulasi Prometric Tokutei Ginou'),
  'CbtSimulatorPillar must render 3 official international CBT exam types'
);
assert(
  cbtContent.includes('min-h-[220px]'),
  'CbtSimulatorPillar exam cards must declare min-h-[220px]'
);
console.log('  ✅ Check 19.9 passed: Reference & CBT Simulator Pillars verified.');

// ── Check 10: CbtRunnerScreen Distraction-Free Controls ────────────────
console.log('  Check 19.10: Verifying CbtRunnerScreen distraction-free controls...');
const runnerPath = path.join(ROOT, 'src', 'components', 'exercise', 'CbtRunnerScreen.tsx');
assert(fs.existsSync(runnerPath), 'CbtRunnerScreen.tsx must exist');
const runnerContent = fs.readFileSync(runnerPath, 'utf8');

assert(
  runnerContent.includes('min-h-[44px]') &&
  runnerContent.includes('nextQuestion') &&
  runnerContent.includes('prevQuestion'),
  'CbtRunnerScreen must enforce min-h-[44px] for Prev/Next navigation buttons'
);
assert(
  runnerContent.includes('min-h-[40px]') && runnerContent.includes('setIsDrawerOpen(true)'),
  'CbtRunnerScreen review drawer button must meet >= 40px touch target'
);
assert(
  runnerContent.includes('min-h-[40px]') && runnerContent.includes('toggleFlag'),
  'CbtRunnerScreen question flag button must meet >= 40px touch target'
);
assert(
  runnerContent.includes('min-h-[56px]') && runnerContent.includes('handleOptionClick'),
  'CbtRunnerScreen 4 option buttons must provide generous min-h-[56px] touch area'
);
console.log('  ✅ Check 19.10 passed: CbtRunnerScreen distraction-free controls verified.');

// ── Check 11: BookTrackBrowser Zero Micro-Fonts & Touch Targets ───────
console.log('  Check 19.11: Verifying BookTrackBrowser zero micro-fonts & touch targets...');
const bookPath = path.join(ROOT, 'src', 'components', 'materi', 'BookTrackBrowser.tsx');
assert(fs.existsSync(bookPath), 'BookTrackBrowser.tsx must exist');
const bookContent = fs.readFileSync(bookPath, 'utf8');

assert(
  !bookContent.includes('text-[9.5px]') && !bookContent.includes('text-[9px]'),
  'BookTrackBrowser must not contain micro-fonts < 12px'
);
assert(
  bookContent.includes('min-h-[40px]') && bookContent.includes('setSelectedTrackFilter'),
  'BookTrackBrowser track category filter buttons must meet >= 40px touch targets'
);
assert(
  bookContent.includes('min-h-[44px]') && bookContent.includes('setIsDrillModalOpen(true)'),
  'BookTrackBrowser authentic drill launch button must meet >= 44px primary action target'
);
console.log('  ✅ Check 19.11 passed: BookTrackBrowser verified.');

// ── Check 12: PanicRecallCard & MoraPacingCard Reflex Drills Ergonomics
console.log('  Check 19.12: Verifying PanicRecallCard & MoraPacingCard ergonomics...');
const panicPath = path.join(ROOT, 'src', 'components', 'quiz', 'PanicRecallCard.tsx');
assert(fs.existsSync(panicPath), 'PanicRecallCard.tsx must exist');
const panicContent = fs.readFileSync(panicPath, 'utf8');

assert(
  panicContent.includes('min-h-[44px]') && panicContent.includes('handleManualReveal'),
  'PanicRecallCard manual reveal button must meet >= 44px touch target'
);
assert(
  panicContent.includes('min-h-[50px] sm:min-h-[54px]') && panicContent.includes('onRateSelf'),
  'PanicRecallCard 3 self-rating buttons must provide >= 50px thumb ergonomics'
);

const moraPath = path.join(ROOT, 'src', 'components', 'quiz', 'MoraPacingCard.tsx');
assert(fs.existsSync(moraPath), 'MoraPacingCard.tsx must exist');
const moraContent = fs.readFileSync(moraPath, 'utf8');

assert(
  moraContent.includes('min-h-[40px] min-w-[40px]') && moraContent.includes('handleSpeak'),
  'MoraPacingCard audio play button must meet >= 40px touch target'
);
assert(
  moraContent.includes('min-h-[40px]') && moraContent.includes('toggleMetronome'),
  'MoraPacingCard metronome toggle button must meet >= 40px touch target'
);
console.log('  ✅ Check 19.12 passed: PanicRecallCard & MoraPacingCard verified.');

// ── Check 13: QuizResultView Actions & Micro-Buttons ──────────────────
console.log('  Check 19.13: Verifying QuizResultView actions & micro-buttons...');
const resultViewPath = path.join(ROOT, 'src', 'components', 'quiz', 'QuizResultView.tsx');
assert(fs.existsSync(resultViewPath), 'QuizResultView.tsx must exist');
const resultViewContent = fs.readFileSync(resultViewPath, 'utf8');

assert(
  resultViewContent.includes('min-h-[44px]') && resultViewContent.includes('onRetryMistakes'),
  'QuizResultView mistake recovery button must meet >= 44px touch target'
);
assert(
  resultViewContent.includes('min-h-[44px]') && resultViewContent.includes('onGoToGarden'),
  'QuizResultView garden loop button must meet >= 44px touch target'
);
assert(
  resultViewContent.includes('min-h-[40px]') && resultViewContent.includes('onRestart'),
  'QuizResultView session restart button must meet >= 40px touch target'
);
assert(
  resultViewContent.includes('min-h-[36px] min-w-[36px]') && resultViewContent.includes('speakJapanese'),
  'QuizResultView audio & report micro-buttons must meet >= 36px touch targets'
);
console.log('  ✅ Check 19.13 passed: QuizResultView verified.');

// ── Check 14: Prometric & JFT-Basic CBT Simulator Official Modals ──────
console.log('  Check 19.14: Verifying Prometric & JFT-Basic CBT Simulator Official Modals...');
const prometricPath = path.join(ROOT, 'src', 'components', 'quiz', 'PrometricCbtModal.tsx');
assert(fs.existsSync(prometricPath), 'PrometricCbtModal.tsx must exist');
const prometricContent = fs.readFileSync(prometricPath, 'utf8');

assert(
  prometricContent.includes('min-h-[40px]') && prometricContent.includes('handleToggleFlag'),
  'PrometricCbtModal review flag button must meet >= 40px touch target'
);
assert(
  prometricContent.includes('min-w-[40px] min-h-[40px]') && prometricContent.includes('speakJapanese'),
  'PrometricCbtModal audio buttons must meet >= 40px touch targets'
);
assert(
  prometricContent.includes('min-h-[40px]') && prometricContent.includes('handleSubmitExam'),
  'PrometricCbtModal submission button must meet >= 40px touch target'
);

const jftPath = path.join(ROOT, 'src', 'components', 'quiz', 'JftBasicCbtModal.tsx');
assert(fs.existsSync(jftPath), 'JftBasicCbtModal.tsx must exist');
const jftContent = fs.readFileSync(jftPath, 'utf8');

assert(
  jftContent.includes('min-h-[40px]') && jftContent.includes('handleToggleFlag'),
  'JftBasicCbtModal review flag button must meet >= 40px touch target'
);
assert(
  jftContent.includes('min-w-[40px] min-h-[40px]') && jftContent.includes('speakJapanese'),
  'JftBasicCbtModal audio buttons must meet >= 40px touch targets'
);
assert(
  jftContent.includes('min-h-[44px]') && jftContent.includes('CANONICAL_JFT_QUESTIONS'),
  'JftBasicCbtModal navigation buttons must meet >= 44px touch targets'
);
console.log('  ✅ Check 19.14 passed: Prometric & JFT-Basic CBT Simulator Modals verified.');

// ── Check 15: Companion Tools & Modals Ergonomics ─────────────────────
console.log('  Check 19.15: Verifying Companion Tools & Modals ergonomics...');
const kotowazaPath = path.join(ROOT, 'src', 'components', 'kotowaza', 'KotowazaModal.tsx');
assert(fs.existsSync(kotowazaPath), 'KotowazaModal.tsx must exist');
const kotowazaContent = fs.readFileSync(kotowazaPath, 'utf8');
assert(
  kotowazaContent.includes('min-h-[40px]') && kotowazaContent.includes('setSelectedCategory'),
  'KotowazaModal category filter pills must meet >= 40px touch targets'
);

const keigoPath = path.join(ROOT, 'src', 'components', 'keigo', 'KeigoTrainerModal.tsx');
assert(fs.existsSync(keigoPath), 'KeigoTrainerModal.tsx must exist');
const keigoContent = fs.readFileSync(keigoPath, 'utf8');
assert(
  keigoContent.includes('min-h-[40px]') && keigoContent.includes('setMatrixCategory'),
  'KeigoTrainerModal matrix category pills must meet >= 40px touch targets'
);

const counterPath = path.join(ROOT, 'src', 'components', 'counters', 'CounterTrainerModal.tsx');
assert(fs.existsSync(counterPath), 'CounterTrainerModal.tsx must exist');
const counterContent = fs.readFileSync(counterPath, 'utf8');
assert(
  counterContent.includes('min-h-[40px]') && counterContent.includes('setSelectedCategory'),
  'CounterTrainerModal category filter pills must meet >= 40px touch targets'
);

const pitchPath = path.join(ROOT, 'src', 'components', 'pitch', 'PitchAccentModal.tsx');
assert(fs.existsSync(pitchPath), 'PitchAccentModal.tsx must exist');
const pitchContent = fs.readFileSync(pitchPath, 'utf8');
assert(
  pitchContent.includes('min-h-[40px]') && pitchContent.includes('setActiveTab'),
  'PitchAccentModal 3-mode tabs must meet >= 40px touch targets'
);

const catPath = path.join(ROOT, 'src', 'components', 'cat', 'CatPlacementModal.tsx');
assert(fs.existsSync(catPath), 'CatPlacementModal.tsx must exist');
const catContent = fs.readFileSync(catPath, 'utf8');
assert(
  catContent.includes('min-h-[44px]') && catContent.includes('handleApplyResult'),
  'CatPlacementModal action buttons must meet >= 44px touch targets'
);

const toolboxPath = path.join(ROOT, 'src', 'components', 'tools', 'StudyToolboxModal.tsx');
assert(fs.existsSync(toolboxPath), 'StudyToolboxModal.tsx must exist');
const toolboxContent = fs.readFileSync(toolboxPath, 'utf8');
assert(
  toolboxContent.includes('min-h-[48px]') && toolboxContent.includes('tool.action'),
  'StudyToolboxModal tool buttons must meet >= 48px touch targets'
);
console.log('  ✅ Check 19.15 passed: Companion Tools & Modals verified.');

// ── Check 16: Zero Micro-Fonts Across All Layer 3 Components ───────────
console.log('  Check 19.16: Verifying Zero Micro-Fonts (<12px) Across Layer 3...');
const layer3FilesToCheck = [
  path.join(ROOT, 'src', 'components', 'materi', 'BookTrackBrowser.tsx'),
  path.join(ROOT, 'src', 'features', 'dojo', 'pillars', 'DictionaryPillar.tsx'),
  path.join(ROOT, 'src', 'components', 'kanji', 'KanjiStrokeModal.tsx'),
  path.join(ROOT, 'src', 'components', 'grammar', 'NuanceCompareModal.tsx'),
];

layer3FilesToCheck.forEach((fp) => {
  const content = fs.readFileSync(fp, 'utf8');
  assert(
    !content.includes('text-[8px]') &&
    !content.includes('text-[9px]') &&
    !content.includes('text-[9.5px]') &&
    !content.includes('text-[10px]') &&
    !content.includes('text-[10.5px]') &&
    !content.includes('text-[11px]'),
    `${path.basename(fp)} must not contain micro-fonts < 12px`
  );
});
console.log('  ✅ Check 19.16 passed: Zero micro-fonts across Layer 3 verified.');

console.log('🎉 All Suite 160 Lapisan 3 Refinement checks PASSED!');
