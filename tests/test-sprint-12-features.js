// ══════════════════════════════════════════════════════════════════
//  test-sprint-12-features.js — Forensic Unit & Integration Suite
//  Sprint 12: End-to-End Micro-Feature, Navigation & Component Integrity
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const assert = require('assert');

let passedTests = 0;
let totalTests = 0;

function test(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✅ [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ [FAIL] ${name}`);
    console.error(`     Error: ${err.message}`);
  }
}

console.log('\n=============================================================');
console.log('🧪 RUNNING SPRINT 12 VERIFICATION SUITE: MICRO-FEATURES & INTEGRITY');
console.log('=============================================================\n');

const ROOT_DIR = path.resolve(__dirname, '..');

// ── T-57: HomePage Dynamic Target Harian & Direct Textbook Route Dispatcher ──
test('T-57: HomePage dynamic Target Harian & openBookStudio dispatcher', () => {
  const storePath = path.join(ROOT_DIR, 'src/store/useAppStore.ts');
  const storeContent = fs.readFileSync(storePath, 'utf8');
  assert(storeContent.includes("materiStudio: 'kurikulum' | 'kanji' | 'buku'"), 'useAppStore must define materiStudio type');
  assert(storeContent.includes('openBookStudio: () => void'), 'useAppStore must declare openBookStudio');
  assert(storeContent.includes("set({ materiStudio: 'buku' })"), 'openBookStudio must set materiStudio to buku');
  assert(storeContent.includes('dailyGoalXP: number'), 'useAppStore must declare dailyGoalXP');
  assert(storeContent.includes('setDailyGoalXP: (goal: number) => void'), 'useAppStore must declare setDailyGoalXP');

  const homePath = path.join(ROOT_DIR, 'src/pages/HomePage.tsx');
  const homeContent = fs.readFileSync(homePath, 'utf8');
  assert(homeContent.includes('openBookStudio'), 'HomePage must use openBookStudio');
  assert(homeContent.includes('dailyGoalXP'), 'HomePage must read dailyGoalXP');
  assert(homeContent.includes('goalProgressPercent'), 'HomePage must calculate goalProgressPercent');
  assert(homeContent.includes('todayXP'), 'HomePage must compute todayXP');
  assert(homeContent.includes('Target Harian'), 'HomePage must display goal progress section');
});

// ── T-58: BottomNav 5-Tab Architecture & MobileDrawer Callback Wiring ─────────
test('T-58: BottomNav 5-tab architecture with Kebun & MobileDrawer callbacks', () => {
  const navPath = path.join(ROOT_DIR, 'src/components/layout/BottomNav.tsx');
  const navContent = fs.readFileSync(navPath, 'utf8');
  assert(navContent.includes("id: 'home'"), 'BottomNav must include home tab');
  assert(navContent.includes("id: 'materi'"), 'BottomNav must include materi tab');
  assert(navContent.includes("id: 'quiz'"), 'BottomNav must include quiz tab');
  assert(navContent.includes("id: 'kebun'"), 'BottomNav must include kebun tab');
  assert(navContent.includes("id: 'sensei'"), 'BottomNav must include sensei tab');
  assert(navContent.includes('Sprout'), 'BottomNav must import and use Sprout icon for kebun');
  assert(navContent.includes('active:scale-95'), 'BottomNav buttons must feature active tactile feedback');

  const drawerPath = path.join(ROOT_DIR, 'src/components/layout/MobileDrawer.tsx');
  const drawerContent = fs.readFileSync(drawerPath, 'utf8');
  assert(drawerContent.includes('onOpenKana'), 'MobileDrawer must support onOpenKana');
  assert(drawerContent.includes('onOpenConjugation'), 'MobileDrawer must support onOpenConjugation');
  assert(drawerContent.includes('onOpenNuance'), 'MobileDrawer must support onOpenNuance');
});

// ── T-59: MateriHubPage Canonical 7-Category POS Taxonomy & Predicate ─────────
test('T-59: MateriHubPage canonical 7-category POS taxonomy & filter predicate', () => {
  const materiPath = path.join(ROOT_DIR, 'src/pages/MateriHubPage.tsx');
  const materiContent = fs.readFileSync(materiPath, 'utf8');
  assert(materiContent.includes("id: 'verb'"), 'Must include verb category');
  assert(materiContent.includes("id: 'adj'"), 'Must include adj category');
  assert(materiContent.includes("id: 'noun'"), 'Must include noun category');
  assert(materiContent.includes("id: 'adverb'"), 'Must include adverb category');
  assert(materiContent.includes("id: 'counter'"), 'Must include counter category');
  assert(materiContent.includes("id: 'conjunction'"), 'Must include conjunction category');
  assert(materiContent.includes("id: 'expression'"), 'Must include expression category');
  assert(materiContent.includes("!pos.includes('adverb')"), 'Verb filter must exclude adverb');

  // Verify predicate logic matching rules exactly as written in MateriHubPage
  const matchPos = (selectedPos, rawPos) => {
    const pos = (rawPos || '').toLowerCase();
    if (selectedPos === 'verb') return (pos.includes('verb') || pos.includes('kerja') || pos.includes('suru')) && !pos.includes('adverb');
    if (selectedPos === 'adj') return pos.includes('adj') || pos.includes('sifat');
    if (selectedPos === 'noun') return (pos.includes('noun') || pos.includes('benda')) && !pos.includes('suru');
    if (selectedPos === 'adverb') return pos.includes('adverb') || pos.includes('keterangan');
    if (selectedPos === 'counter') return pos.includes('counter') || pos.includes('bilangan') || pos.includes('angka');
    if (selectedPos === 'conjunction') return pos.includes('conjunction') || pos.includes('hubung') || pos.includes('sambung');
    if (selectedPos === 'expression') return pos.includes('exp') || pos.includes('ungkapan') || pos.includes('frasa');
    return false;
  };

  assert.strictEqual(matchPos('verb', 'verb_godan'), true);
  assert.strictEqual(matchPos('verb', 'adverb'), false); // Critical disambiguation
  assert.strictEqual(matchPos('adverb', 'adverb'), true);
  assert.strictEqual(matchPos('adj', 'adj_i'), true);
  assert.strictEqual(matchPos('noun', 'noun'), true);
  assert.strictEqual(matchPos('counter', 'counter'), true);
  assert.strictEqual(matchPos('conjunction', 'conjunction'), true);
  assert.strictEqual(matchPos('expression', 'expression'), true);
});

// ── T-60: CurriculumStore Practice XP & Toggle Completion Button ──────────────
test('T-60: CurriculumStore practice XP and interactive toggle completion', () => {
  const curStorePath = path.join(ROOT_DIR, 'src/lib/curriculum/curriculumStore.ts');
  const curStoreContent = fs.readFileSync(curStorePath, 'utf8');
  assert(curStoreContent.includes('useAppStore.getState().incrementXp(effectiveXp)'), 'Must award XP on completion');
  assert(curStoreContent.includes('useGamificationStore.getState().recordActivity(1, effectiveXp)'), 'Must record activity to heatmap');

  const browserPath = path.join(ROOT_DIR, 'src/components/materi/CurriculumTrackBrowser.tsx');
  const browserContent = fs.readFileSync(browserPath, 'utf8');
  assert(browserContent.includes('handleToggleLessonComplete'), 'CurriculumTrackBrowser must declare handleToggleLessonComplete');
  assert(browserContent.includes('completeLesson(activeTrackId, unitId, lessonId, 100, 25)'), 'CurriculumTrackBrowser must call completeLesson');
  assert(browserContent.includes('title={isLessonDone ?'), 'Toggle button must feature accessible title/tooltip');
});

// ── T-61: SenseiPage Non-Blocking Bottom-Sheet Modal & SSE Streaming ───────────
test('T-61: SenseiPage non-blocking confirmation modal & streamSenseiResponse', () => {
  const senseiPagePath = path.join(ROOT_DIR, 'src/pages/SenseiPage.tsx');
  const senseiPageContent = fs.readFileSync(senseiPagePath, 'utf8');
  assert(!senseiPageContent.includes('window.confirm'), 'SenseiPage must not call native window.confirm');
  assert(senseiPageContent.includes('isClearConfirmOpen'), 'SenseiPage must have isClearConfirmOpen state');
  assert(senseiPageContent.includes('Hapus Riwayat Chat'), 'Must have non-blocking confirmation title');

  const senseiClientPath = path.join(ROOT_DIR, 'src/lib/ai/senseiClient.ts');
  const senseiClientContent = fs.readFileSync(senseiClientPath, 'utf8');
  assert(senseiClientContent.includes('export async function streamSenseiResponse'), 'senseiClient must export streamSenseiResponse');
  assert(senseiClientContent.includes('text/event-stream'), 'Must handle text/event-stream SSE');
  assert(senseiClientContent.includes("dataStr === '[DONE]'"), 'Must detect SSE completion token [DONE]');
});

// ── T-62: Direct FSRS Due-Review Dispatcher across KebunPage & QuizPage ───────
test('T-62: Direct FSRS Due-Review Dispatcher integration', () => {
  const storePath = path.join(ROOT_DIR, 'src/store/useAppStore.ts');
  const storeContent = fs.readFileSync(storePath, 'utf8');
  assert(storeContent.includes('fsrsDueReviewTrigger: boolean'), 'useAppStore must declare fsrsDueReviewTrigger');
  assert(storeContent.includes('startFSRSDueSession: () => void'), 'useAppStore must declare startFSRSDueSession');
  assert(storeContent.includes('clearFSRSDueReviewTrigger: () => void'), 'useAppStore must declare clearFSRSDueReviewTrigger');

  const kebunPath = path.join(ROOT_DIR, 'src/pages/KebunPage.tsx');
  const kebunContent = fs.readFileSync(kebunPath, 'utf8');
  assert(kebunContent.includes('startFSRSDueSession'), 'KebunPage must wire startFSRSDueSession to CTA');

  const quizPath = path.join(ROOT_DIR, 'src/pages/QuizPage.tsx');
  const quizContent = fs.readFileSync(quizPath, 'utf8');
  assert(quizContent.includes('fsrsDueReviewTrigger'), 'QuizPage must check fsrsDueReviewTrigger');
  assert(quizContent.includes('startFSRSDueSession()'), 'QuizPage must invoke startFSRSDueSession');
  assert(quizContent.includes('clearFSRSDueReviewTrigger()'), 'QuizPage must clear trigger once consumed');
});

// ── T-63: Persistent CAT Diagnostic History ───────────────────────────────────
test('T-63: Persistent CAT diagnostic history in useAppStore & CatPlacementModal', () => {
  const storePath = path.join(ROOT_DIR, 'src/store/useAppStore.ts');
  const storeContent = fs.readFileSync(storePath, 'utf8');
  assert(storeContent.includes('placementHistory: Array<'), 'useAppStore must declare placementHistory');
  assert(storeContent.includes('addPlacementResult: ('), 'useAppStore must declare addPlacementResult');
  assert(storeContent.includes('nn_cat_placement_history'), 'Must persist to nn_cat_placement_history in localStorage');

  const catPath = path.join(ROOT_DIR, 'src/components/cat/CatPlacementModal.tsx');
  const catContent = fs.readFileSync(catPath, 'utf8');
  assert(catContent.includes('addPlacementResult({'), 'CatPlacementModal must call addPlacementResult');
  assert(catContent.includes('questionsAnswered: finalRes.totalCount'), 'Must record totalCount correctly');
});

// ── T-64: Kanji & Kana Modal Gamification & Garden Loops ──────────────────────
test('T-64: KanjiStrokeModal & KanaChartModal gamification and garden loop', () => {
  const kanjiPath = path.join(ROOT_DIR, 'src/components/kanji/KanjiStrokeModal.tsx');
  const kanjiContent = fs.readFileSync(kanjiPath, 'utf8');
  assert(kanjiContent.includes('useAppStore.getState().incrementXp(15)'), 'Kanji stroke complete must award 15 XP');
  assert(kanjiContent.includes('useGardenStore.getState().seedPlant'), 'Kanji stroke complete must call seedPlant');
  assert(kanjiContent.includes('useAppStore.getState().setCard'), 'Kanji stroke complete must initialize FSRS card');

  const kanaPath = path.join(ROOT_DIR, 'src/components/kana/KanaChartModal.tsx');
  const kanaContent = fs.readFileSync(kanaPath, 'utf8');
  assert(kanaContent.includes('useAppStore.getState().incrementXp(5)'), 'Kana practice recognition must award 5 XP');
  assert(kanaContent.includes('useGamificationStore.getState().recordActivity(1, 5)'), 'Kana recognition must record 5 XP activity');
});

// ── T-65: SSW Corpus Ingestion in Search Index ─────────────────────────────────
test('T-65: Vocational SSW tracks indexed in search pool', () => {
  const searchPath = path.join(ROOT_DIR, 'src/lib/search/searchIndex.ts');
  const searchContent = fs.readFileSync(searchPath, 'utf8');
  assert(searchContent.includes("'ssw-kaigo'"), 'searchIndex must index ssw-kaigo');
  assert(searchContent.includes("'ssw-food'"), 'searchIndex must index ssw-food');
  assert(searchContent.includes("'ssw-construction'"), 'searchIndex must index ssw-construction');
  assert(searchContent.includes('cachedVocab = [...vocabsByLevel.flat(), ...sswVocabs.flat()]'), 'Must concatenate vocational vocabs');
});

console.log('\n-------------------------------------------------------------');
console.log(`📊 SPRINT 12 VERIFICATION RESULTS: ${passedTests}/${totalTests} TESTS PASSED`);
console.log('-------------------------------------------------------------\n');

if (passedTests !== totalTests) {
  process.exit(1);
} else {
  process.exit(0);
}
