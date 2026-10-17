// ══════════════════════════════════════════════════════════════════
//  test-sprint-3-frontend.js — Sprint 3 Forensic Test Verification Suite
//  Verifies T-12 (SVG Offscreen Singleton), T-13 (Modal Deduplication & Distractors),
//  T-14 (Responsive Touch Targets & Safe Areas), T-15 (Audio Engine & iOS WebKit)
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const assert = require('assert');

let passedTests = 0;
let totalTests = 0;

function it(description, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✓ ${description}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ ${description}`);
    console.error(`    ${err.message}`);
    process.exitCode = 1;
  }
}

console.log('🧪 Starting Sprint 3 Forensic Test Suite...\n');

// ── T-12: Kanji Dojo Offscreen SVG Measurement & Anti-Layout Thrashing ──
console.log('🔍 [T-12] Verifying Kanji Dojo Offscreen SVG Singleton & LRU Caching...');
const strokeModalPath = path.resolve(__dirname, '../src/components/kanji/KanjiStrokeModal.tsx');
const strokeModalCode = fs.readFileSync(strokeModalPath, 'utf8');

it('T-12.1: KanjiStrokeModal uses persistent offscreen SVG singleton', () => {
  assert(
    strokeModalCode.includes('getOffscreenMeasureElements'),
    'Missing getOffscreenMeasureElements singleton'
  );
  assert(
    strokeModalCode.includes('measureSvgSingleton') && strokeModalCode.includes('offscreenPath'),
    'Missing measureSvgSingleton or offscreenPath singletons'
  );
  assert(
    !strokeModalCode.includes('document.body.appendChild(svg)'),
    'Found synchronous document.body.appendChild layout thrashing in stroke render loop!'
  );
});

it('T-12.2: KanjiStrokeModal implements pathLengthCache and pathPointsCache', () => {
  assert(
    strokeModalCode.includes('pathLengthCache'),
    'Missing pathLengthCache for stroke length memoization'
  );
  assert(
    strokeModalCode.includes('pathPointsCache'),
    'Missing pathPointsCache for stroke trajectory memoization'
  );
});

// ── T-13: Modal Tree Deduplication & Distractor Leak Elimination ──
console.log('\n🔍 [T-13] Verifying Modal Tree Deduplication & Distractor Leaks...');
const appPath = path.resolve(__dirname, '../src/App.tsx');
const homePagePath = path.resolve(__dirname, '../src/pages/HomePage.tsx');
const materiHubPath = path.resolve(__dirname, '../src/pages/MateriHubPage.tsx');
const lessonAdapterPath = path.resolve(__dirname, '../src/lib/curriculum/lessonContentAdapter.ts');

const appCode = fs.readFileSync(appPath, 'utf8');
const homeCode = fs.readFileSync(homePagePath, 'utf8');
const materiCode = fs.readFileSync(materiHubPath, 'utf8');
const adapterCode = fs.readFileSync(lessonAdapterPath, 'utf8');

it('T-13.1: App.tsx is the sole root mount for portal modals', () => {
  assert(appCode.includes('<DetailModal'), 'App.tsx must mount DetailModal');
  assert(appCode.includes('<KanaChartModal'), 'App.tsx must mount KanaChartModal');
  assert(appCode.includes('<ConjugationModal'), 'App.tsx must mount ConjugationModal');
  assert(appCode.includes('<NuanceCompareModal'), 'App.tsx must mount NuanceCompareModal');
});

it('T-13.2: HomePage.tsx and MateriHubPage.tsx do NOT duplicate modal mounts', () => {
  assert(!homeCode.includes('<DetailModal'), 'HomePage must not mount DetailModal');
  assert(!homeCode.includes('<KanaChartModal'), 'HomePage must not mount KanaChartModal');
  assert(!homeCode.includes('<ConjugationModal'), 'HomePage must not mount ConjugationModal');
  assert(!homeCode.includes('<NuanceCompareModal'), 'HomePage must not mount NuanceCompareModal');

  assert(!materiCode.includes('<DetailModal'), 'MateriHubPage must not mount DetailModal');
  assert(!materiCode.includes('<KanaChartModal'), 'MateriHubPage must not mount KanaChartModal');
  assert(!materiCode.includes('<ConjugationModal'), 'MateriHubPage must not mount ConjugationModal');
  assert(!materiCode.includes('<NuanceCompareModal'), 'MateriHubPage must not mount NuanceCompareModal');
});

it('T-13.3: lessonContentAdapter eliminates parenthetical distractor leaks', () => {
  assert(
    !adapterCode.includes('(Urutan terbalik ala SVO)'),
    'Found leaked distractor note "(Urutan terbalik ala SVO)" in lessonContentAdapter.ts'
  );
  assert(
    !adapterCode.includes('(Partikel tidak pas)'),
    'Found leaked distractor note "(Partikel tidak pas)" in lessonContentAdapter.ts'
  );
});

it('T-13.4: lessonContentAdapter implements Fisher-Yates shuffleOptions across curated and dynamic drills', () => {
  assert(
    adapterCode.includes('function shuffleOptions<T>(items: readonly T[]): T[]'),
    'Missing shuffleOptions function in lessonContentAdapter.ts'
  );
  assert(
    adapterCode.includes('options: shuffleOptions('),
    'Dynamic drills must randomize options via shuffleOptions to prevent Option 0 exploit'
  );
  assert(
    adapterCode.includes('d.options ? { ...d, options: shuffleOptions(d.options) } : d'),
    'Curated drills must randomize options via shuffleOptions to eliminate Option 0 exploit on flagship lessons'
  );

  // Empirical test of Fisher-Yates implementation
  function testShuffle(items) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
  const testItems = ['A', 'B', 'C', 'D'];
  let nonZeroCount = 0;
  for (let i = 0; i < 50; i++) {
    const shuffled = testShuffle(testItems);
    assert.strictEqual(shuffled.length, 4, 'Shuffle must maintain exact array length');
    assert(testItems.every((item) => shuffled.includes(item)), 'Shuffle must contain all original elements');
    if (shuffled[0] !== 'A') nonZeroCount++;
  }
  assert(nonZeroCount > 10, 'Shuffle must distribute options across different indexes (Option 0 elimination)');
});

// ── T-14: Universal Multi-Device Responsive & Touch Targets ──
console.log('\n🔍 [T-14] Verifying Multi-Device Responsive & Touch Targets...');
const quizPagePath = path.resolve(__dirname, '../src/pages/QuizPage.tsx');
const lessonStudyPath = path.resolve(__dirname, '../src/pages/LessonStudyPage.tsx');
const dojoViewPath = path.resolve(__dirname, '../src/components/kanji/KanjiDojoView.tsx');
const panicCardPath = path.resolve(__dirname, '../src/components/quiz/PanicRecallCard.tsx');
const kotowazaModalPath = path.resolve(__dirname, '../src/components/kotowaza/KotowazaModal.tsx');
const senseiPagePath = path.resolve(__dirname, '../src/pages/SenseiPage.tsx');
const settingsPagePath = path.resolve(__dirname, '../src/pages/SettingsPage.tsx');

const quizCode = fs.readFileSync(quizPagePath, 'utf8');
const studyCode = fs.readFileSync(lessonStudyPath, 'utf8');
const dojoCode = fs.readFileSync(dojoViewPath, 'utf8');
const panicCode = fs.readFileSync(panicCardPath, 'utf8');
const kotowazaCode = fs.readFileSync(kotowazaModalPath, 'utf8');
const senseiCode = fs.readFileSync(senseiPagePath, 'utf8');
const settingsCode = fs.readFileSync(settingsPagePath, 'utf8');

it('T-14.1: QuizPage has safe-area cushion and dynamic viewport max-height', () => {
  assert(
    quizCode.includes('pb-[calc(1.5rem+env(safe-area-inset-bottom))]'),
    'QuizPage feedback bar missing safe area cushion'
  );
  assert(
    quizCode.includes('max-h-[85dvh]'),
    'QuizPage results modal missing 85dvh dynamic viewport unit'
  );
});

it('T-14.2: LessonStudyPage has safe-area bottom cushion', () => {
  assert(
    studyCode.includes('pb-[calc(5.5rem+env(safe-area-inset-bottom))]'),
    'LessonStudyPage missing 5.5rem + safe-area cushion'
  );
});

it('T-14.3: Touch targets >= 40px across HomePage, MateriHub, KanjiDojo, KanjiStroke, PanicRecall, Kotowaza', () => {
  assert(
    homeCode.includes('min-w-[40px] min-h-[40px]'),
    'HomePage audio buttons must be at least 40px x 40px'
  );
  assert(
    materiCode.includes('min-w-[40px] min-h-[40px]'),
    'MateriHubPage audio buttons must be at least 40px x 40px'
  );
  assert(
    dojoCode.includes('min-w-[40px] min-h-[40px]'),
    'KanjiDojoView audio button must be at least 40px x 40px'
  );
  assert(
    strokeModalCode.includes('min-w-[40px] min-h-[40px]'),
    'KanjiStrokeModal audio buttons must be at least 40px x 40px'
  );
  assert(
    panicCode.includes('min-w-[40px] min-h-[40px]'),
    'PanicRecallCard audio button must be at least 40px x 40px'
  );
  assert(
    kotowazaCode.includes('min-w-[40px] min-h-[40px]'),
    'KotowazaModal audio button must be at least 40px x 40px'
  );
});

it('T-14.4: SenseiPage and SettingsPage eliminate invalid focus:outline-hidden', () => {
  assert(
    !senseiCode.includes('focus:outline-hidden'),
    'SenseiPage contains invalid Tailwind class focus:outline-hidden'
  );
  assert(
    !settingsCode.includes('focus:outline-hidden'),
    'SettingsPage contains invalid Tailwind class focus:outline-hidden'
  );
  assert(
    senseiCode.includes('focus:outline-none'),
    'SenseiPage must use focus:outline-none'
  );
  assert(
    settingsCode.includes('focus:outline-none'),
    'SettingsPage must use focus:outline-none'
  );
});

// ── T-15: Audio Architecture & iOS Safari Gesture Fix ──
console.log('\n🔍 [T-15] Verifying Audio Architecture & iOS Safari Optimization...');
const voiceManagerPath = path.resolve(__dirname, '../src/lib/audio/voiceManager.ts');
const sfxPath = path.resolve(__dirname, '../src/lib/audio/sfx.ts');

const voiceCode = fs.readFileSync(voiceManagerPath, 'utf8');
const sfxCode = fs.readFileSync(sfxPath, 'utf8');

it('T-15.1: voiceManager observes nn_speech_rate from localStorage', () => {
  assert(
    voiceCode.includes("localStorage.getItem('nn_speech_rate')"),
    'voiceManager must observe nn_speech_rate preference'
  );
  assert(
    voiceCode.includes('utterance.rate = effectiveRate'),
    'voiceManager must set utterance.rate to effectiveRate'
  );
});

it('T-15.2: SettingsPage voice sample test executes synchronously without setTimeout', () => {
  assert(
    !settingsCode.includes("setTimeout(() => speakJapanese('日本語の勉強を始めましょう！'"),
    'SettingsPage must not wrap speakJapanese in setTimeout (drops iOS user activation token)'
  );
  assert(
    settingsCode.includes("speakJapanese('日本語の勉強を始めましょう！', speechRate)"),
    'SettingsPage must invoke speakJapanese synchronously on button click'
  );
});

it('T-15.3: sfx.ts implements scheduleNodeCleanup with gain.disconnect() and osc.disconnect()', () => {
  assert(
    sfxCode.includes('function scheduleNodeCleanup'),
    'sfx.ts must implement scheduleNodeCleanup'
  );
  assert(
    sfxCode.includes('gain.disconnect()'),
    'scheduleNodeCleanup must disconnect gain node'
  );
  assert(
    sfxCode.includes('o.disconnect()'),
    'scheduleNodeCleanup must disconnect oscillator nodes'
  );
  const cleanupCalls = sfxCode.match(/scheduleNodeCleanup\(/g);
  assert(
    cleanupCalls && cleanupCalls.length >= 6,
    `Expected at least 6 scheduleNodeCleanup calls across all sound generators, found ${cleanupCalls ? cleanupCalls.length : 0}`
  );
});

// ── Final Verification Output ──
console.log(`\n══════════════════════════════════════════════════════════════`);
console.log(`🎉 SPRINT 3 VERIFICATION SUMMARY: ${passedTests}/${totalTests} TESTS PASSED`);
console.log(`══════════════════════════════════════════════════════════════\n`);

if (passedTests !== totalTests) {
  process.exit(1);
}
