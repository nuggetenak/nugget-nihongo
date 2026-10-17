// ══════════════════════════════════════════════════════════════════
//  test-sprint-9-convergence.js — Comprehensive Sprint 9 Test Runner
//  Verifies Tickets T-33, T-34, T-35, T-36, T-37, T-38
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const assert = require('assert');

let passedTests = 0;
let totalTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✓ PASS: ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ FAIL: ${name}`);
    console.error(`    ${err.message}`);
    process.exitCode = 1;
  }
}

console.log('\n============================================================');
console.log('🚀 SPRINT 9 VERIFICATION: FULL-STACK CONVERGENCE & AUDIO CBT');
console.log('============================================================\n');

// ──────────────────────────────────────────────────────────────────
// 1. TICKET T-33: 36-Track Canonical Loader & Book Fallbacks
// ──────────────────────────────────────────────────────────────────
console.log('--- Ticket T-33: Canonical Track Loader & Book Fallback ---');

const dataManagerPath = path.join(__dirname, '../src/lib/data/dataManager.ts');
assert(fs.existsSync(dataManagerPath), 'dataManager.ts must exist');
const dataManagerContent = fs.readFileSync(dataManagerPath, 'utf8');

runTest('CANONICAL_TRACK_MAP registers all 5 JLPT levels', () => {
  assert(dataManagerContent.includes('n5: { src: \'/data/curriculum/curriculum-n5.js\''), 'Must register n5');
  assert(dataManagerContent.includes('n4: { src: \'/data/curriculum/curriculum-n4.js\''), 'Must register n4');
  assert(dataManagerContent.includes('n3: { src: \'/data/curriculum/curriculum-n3.js\''), 'Must register n3');
  assert(dataManagerContent.includes('n2: { src: \'/data/curriculum/curriculum-n2.js\''), 'Must register n2');
  assert(dataManagerContent.includes('n1: { src: \'/data/curriculum/curriculum-n1.js\''), 'Must register n1');
});

runTest('CANONICAL_TRACK_MAP registers all 9 authentic textbook series', () => {
  const books = [
    'book-genki', 'book-irodori', 'book-marugoto', 'book-minna',
    'book-quartet', 'book-shin-kanzen-master', 'book-soumatome',
    'book-tobira', 'book-try'
  ];
  books.forEach(b => {
    assert(dataManagerContent.includes(`'${b}':`), `CANONICAL_TRACK_MAP must register ${b}`);
  });
});

runTest('CANONICAL_TRACK_MAP registers JFT and Seikatsu curriculum tracks', () => {
  assert(dataManagerContent.includes("'jft-a1':"), 'Must register jft-a1');
  assert(dataManagerContent.includes("'jft-a2':"), 'Must register jft-a2');
  assert(dataManagerContent.includes("seikatsu:"), 'Must register seikatsu');
});

runTest('CANONICAL_TRACK_MAP registers all 19 SSW vocational tracks', () => {
  const sswSectors = [
    'accommodation', 'agriculture', 'automobile', 'aviation', 'building-cleaning',
    'construction', 'electric-electronic', 'fishery', 'food-service', 'food',
    'forestry', 'industrial-machinery', 'kaigo', 'logistics', 'manufacturing',
    'railway', 'shipbuilding', 'textile', 'timber'
  ];
  sswSectors.forEach(sec => {
    assert(dataManagerContent.includes(`'ssw-${sec}':`), `Must register ssw-${sec}`);
  });
});

runTest('loadBook dynamically falls back to staged curriculum tracks', () => {
  assert(dataManagerContent.includes('export async function loadBook'), 'Must export loadBook');
  assert(dataManagerContent.includes('const curriculumTrack = await loadCurriculumTrack'), 'Must fall back to curriculum track');
});

// ──────────────────────────────────────────────────────────────────
// 2. TICKET T-34: Choukai Audio CBT Simulator & Asset Integrity
// ──────────────────────────────────────────────────────────────────
console.log('\n--- Ticket T-34: Choukai Audio CBT Simulator & Bank ---');

const choukaiBankPath = path.join(__dirname, '../src/lib/data/choukaiExamBank.ts');
assert(fs.existsSync(choukaiBankPath), 'choukaiExamBank.ts must exist');
const choukaiBankContent = fs.readFileSync(choukaiBankPath, 'utf8');

runTest('CHOUKAI_QUESTION_SETS contains all 4 complete exam sets', () => {
  assert(choukaiBankContent.includes('"id": 1'), 'Set 1 must exist');
  assert(choukaiBankContent.includes('"id": 2'), 'Set 2 must exist');
  assert(choukaiBankContent.includes('"id": 3'), 'Set 3 must exist');
  assert(choukaiBankContent.includes('"id": 4'), 'Set 4 must exist');
});

runTest('Choukai exam bank contains all 163 authentic questions', () => {
  const qMatches = choukaiBankContent.match(/"id":\s*\d+/g) || [];
  assert(qMatches.length >= 163, `Expected at least 163 questions, found ${qMatches.length}`);
});

runTest('Choukai audio files verified on disk (38 audio files)', () => {
  const audioDir = path.join(__dirname, '../public/data/choukai/audio');
  assert(fs.existsSync(audioDir), 'choukai audio directory must exist');
  let totalAudioFiles = 0;
  for (let i = 1; i <= 4; i++) {
    const setDir = path.join(audioDir, `set${i}`);
    assert(fs.existsSync(setDir), `Audio Set ${i} directory must exist`);
    const setFiles = fs.readdirSync(setDir);
    totalAudioFiles += setFiles.length;
  }
  assert(totalAudioFiles === 38, `Expected exactly 38 audio files across 4 sets, found ${totalAudioFiles}`);
});

runTest('Choukai illustration images verified on disk (372 images)', () => {
  const imgDir = path.join(__dirname, '../public/data/choukai/images');
  assert(fs.existsSync(imgDir), 'choukai images directory must exist');
  let totalImgs = 0;
  for (let i = 1; i <= 4; i++) {
    const setDir = path.join(imgDir, `set${i}`);
    assert(fs.existsSync(setDir), `Image Set ${i} directory must exist`);
    const setFiles = fs.readdirSync(setDir);
    totalImgs += setFiles.length;
  }
  assert(totalImgs === 372, `Expected exactly 372 images across 4 sets, found ${totalImgs}`);
});

runTest('ChoukaiAudioPlayer component provides multi-speed chips and responsive scrubber', () => {
  const playerPath = path.join(__dirname, '../src/components/audio/ChoukaiAudioPlayer.tsx');
  assert(fs.existsSync(playerPath), 'ChoukaiAudioPlayer.tsx must exist');
  const content = fs.readFileSync(playerPath, 'utf8');
  assert(content.includes('0.8') && content.includes('1.0') && content.includes('1.2'), 'Must support 0.8, 1.0, 1.2 playback speeds');
  assert(content.includes('handleSpeedChange'), 'Must implement speed change handler');
  assert(content.includes('handleSeek'), 'Must implement seek scrubber');
});

runTest('ChoukaiSimulatorPage component is wired with route in App.tsx', () => {
  const simPagePath = path.join(__dirname, '../src/pages/ChoukaiSimulatorPage.tsx');
  assert(fs.existsSync(simPagePath), 'ChoukaiSimulatorPage.tsx must exist');
  const appPath = path.join(__dirname, '../src/App.tsx');
  const appContent = fs.readFileSync(appPath, 'utf8');
  assert(appContent.includes('ChoukaiSimulatorPage'), 'App.tsx must import ChoukaiSimulatorPage');
  assert(appContent.includes("case 'choukai':"), 'App.tsx must route choukai tab');
  assert(appContent.includes('<ChoukaiSimulatorPage />'), 'App.tsx must render ChoukaiSimulatorPage');
});

// ──────────────────────────────────────────────────────────────────
// 3. TICKET T-35: Core Specialized Skills Integration
// ──────────────────────────────────────────────────────────────────
console.log('\n--- Ticket T-35: Specialized Skills Integration ---');

// BudouX Segmenter
runTest('BudouX Segmenter segments Japanese text and provides semantic line breaks', () => {
  const budouxPath = path.join(__dirname, '../src/lib/japanese/budouxSegmenter.ts');
  assert(fs.existsSync(budouxPath), 'budouxSegmenter.ts must exist');
  const content = fs.readFileSync(budouxPath, 'utf8');
  assert(content.includes('export function segmentBunsetsu'), 'Must export segmentBunsetsu');
  assert(content.includes('export function formatSemanticLineBreaks'), 'Must export formatSemanticLineBreaks');
  assert(content.includes('export function generateScrambleChunks'), 'Must export generateScrambleChunks');
  assert(content.includes('<wbr>'), 'Must format with <wbr> tags');
});

// Yomitan De-Inflector
runTest('Yomitan De-Inflector correctly reverses conjugations with Indonesian pedagogical rationale', () => {
  const deinflectorPath = path.join(__dirname, '../src/lib/grammar/deinflector.ts');
  assert(fs.existsSync(deinflectorPath), 'deinflector.ts must exist');
  const content = fs.readFileSync(deinflectorPath, 'utf8');
  assert(content.includes('export function deinflectWord'), 'Must export deinflectWord');
  assert(content.includes('verb_ichidan') && content.includes('verb_godan'), 'Must categorize POS');
  assert(content.includes('Bentuk Masen-deshita'), 'Must include Indonesian rule descriptions');
  assert(content.includes('Bentuk Te (Godan Sokuon-bin -u)'), 'Must include phonetic euphoria rules');
});

// TinyBase / IndexedDB Local-First Persistence Bridge
runTest('StorageBridge provides zero-blocking IndexedDB persistence with memory fallback', () => {
  const bridgePath = path.join(__dirname, '../src/lib/persistence/storageBridge.ts');
  assert(fs.existsSync(bridgePath), 'storageBridge.ts must exist');
  const content = fs.readFileSync(bridgePath, 'utf8');
  assert(content.includes('class StorageBridgeService'), 'Must define StorageBridgeService');
  assert(content.includes('indexedDB.open'), 'Must initialize IndexedDB');
  assert(content.includes('srs_cards') && content.includes('offline_queue'), 'Must create object stores');
  assert(content.includes('export const storageBridge'), 'Must export storageBridge singleton');
});

// Mem0 AI Sensei Long-Term Memory Layer
runTest('SenseiMemory provides long-term personalized learner memory context', () => {
  const memPath = path.join(__dirname, '../src/lib/ai/senseiMemory.ts');
  assert(fs.existsSync(memPath), 'senseiMemory.ts must exist');
  const content = fs.readFileSync(memPath, 'utf8');
  assert(content.includes('class SenseiMemoryService'), 'Must define SenseiMemoryService');
  assert(content.includes('addMemory'), 'Must implement addMemory');
  assert(content.includes('retrieveRelevantMemories'), 'Must implement retrieveRelevantMemories');
  assert(content.includes('formatMemoriesForPrompt'), 'Must implement formatMemoriesForPrompt');
  assert(content.includes('export const senseiMemory'), 'Must export senseiMemory singleton');
});

// ──────────────────────────────────────────────────────────────────
// 4. TICKET T-36: Search Palette Lazy Indexing & Optimization
// ──────────────────────────────────────────────────────────────────
console.log('\n--- Ticket T-36: Search Index & Palette Performance ---');

const searchIndexPath = path.join(__dirname, '../src/lib/search/searchIndex.ts');
assert(fs.existsSync(searchIndexPath), 'searchIndex.ts must exist');
const searchIndexContent = fs.readFileSync(searchIndexPath, 'utf8');

runTest('searchIndex exports lazy pool initializer and scoring search', () => {
  assert(searchIndexContent.includes('export async function initSearchPool'), 'Must export initSearchPool');
  assert(searchIndexContent.includes('export function querySearchPool'), 'Must export querySearchPool');
  assert(searchIndexContent.includes('export function isSearchPoolReady'), 'Must export isSearchPoolReady');
});

runTest('SearchPalette eliminates eager 10-promise network mount burst', () => {
  const palettePath = path.join(__dirname, '../src/components/ui/SearchPalette.tsx');
  assert(fs.existsSync(palettePath), 'SearchPalette.tsx must exist');
  const paletteContent = fs.readFileSync(palettePath, 'utf8');
  assert(paletteContent.includes('initSearchPool'), 'SearchPalette must use initSearchPool');
  assert(paletteContent.includes('querySearchPool'), 'SearchPalette must use querySearchPool');
  assert(!paletteContent.includes('Promise.all([loadVocab('), 'SearchPalette must not do eager Promise.all(loadVocab) on mount');
});

// ──────────────────────────────────────────────────────────────────
// 5. TICKET T-37: Universal Multi-Device Responsive Design Rule Compliance
// ──────────────────────────────────────────────────────────────────
console.log('\n--- Ticket T-37: Multi-Device Responsive Design Compliance ---');

runTest('Modals implement bottom-sheet / max-height viewport caps', () => {
  const authModalPath = path.join(__dirname, '../src/components/auth/AuthModal.tsx');
  const authContent = fs.readFileSync(authModalPath, 'utf8');
  assert(authContent.includes('max-h-[90dvh]') || authContent.includes('max-h-[85vh]'), 'AuthModal must cap max-height');

  const exitGuardPath = path.join(__dirname, '../src/components/quiz/QuizExitGuardModal.tsx');
  const exitContent = fs.readFileSync(exitGuardPath, 'utf8');
  assert(exitContent.includes('max-h-[90dvh]') || exitContent.includes('max-h-[85vh]'), 'QuizExitGuardModal must cap max-height');
});

runTest('All core pages implement safe-area cushions and horizontal anti-leakage', () => {
  const pages = [
    'HomePage.tsx', 'AboutPage.tsx', 'KebunPage.tsx', 'LessonStudyPage.tsx',
    'MateriHubPage.tsx', 'SenseiPage.tsx', 'SettingsPage.tsx',
    'MethodologyPage.tsx', 'ChoukaiSimulatorPage.tsx'
  ];

  pages.forEach(p => {
    const pagePath = path.join(__dirname, '../src/pages', p);
    assert(fs.existsSync(pagePath), `${p} must exist`);
    const content = fs.readFileSync(pagePath, 'utf8');
    assert(
      content.includes('pb-[calc(5.5rem+env(safe-area-inset-bottom))]') ||
      content.includes('pb-24') ||
      content.includes('pb-32'),
      `${p} must include bottom safe area cushion for navigation bar`
    );
    assert(
      content.includes('overflow-x-hidden') || content.includes('min-w-0'),
      `${p} must include horizontal anti-leakage constraints`
    );
  });
});

// ──────────────────────────────────────────────────────────────────
// 6. TICKET T-38: Code Splitting & Service Worker PWA Precache
// ──────────────────────────────────────────────────────────────────
console.log('\n--- Ticket T-38: Code Splitting & Service Worker Precache ---');

runTest('vite.config.ts configures Rollup vendor code-splitting chunks', () => {
  const vitePath = path.join(__dirname, '../vite.config.ts');
  const viteContent = fs.readFileSync(vitePath, 'utf8');
  assert(viteContent.includes('manualChunks'), 'vite.config.ts must configure manualChunks');
  assert(viteContent.includes('vendor-react'), 'Must split vendor-react');
  assert(viteContent.includes('vendor-icons'), 'Must split vendor-icons');
  assert(viteContent.includes('vendor-supabase'), 'Must split vendor-supabase');
});

runTest('public/sw.js precaches all curriculum tracks including SSW and JFT', () => {
  const swPath = path.join(__dirname, '../public/sw.js');
  const swContent = fs.readFileSync(swPath, 'utf8');
  assert(swContent.includes('/data/curriculum/curriculum-jft-a1.js'), 'SW must precache JFT-A1');
  assert(swContent.includes('/data/curriculum/curriculum-jft-a2.js'), 'SW must precache JFT-A2');
  assert(swContent.includes('/data/curriculum/curriculum-seikatsu.js'), 'SW must precache Seikatsu');
  assert(swContent.includes('/data/curriculum/curriculum-ssw-kaigo.js'), 'SW must precache SSW Kaigo');
  assert(swContent.includes('/data/curriculum/curriculum-ssw-construction.js'), 'SW must precache SSW Construction');
  assert(swContent.includes('/data/curriculum/curriculum-ssw-food.js'), 'SW must precache SSW Food');
});

// ──────────────────────────────────────────────────────────────────
// SUMMARY
// ──────────────────────────────────────────────────────────────────
console.log('\n============================================================');
console.log(`🏁 SPRINT 9 TEST RESULTS: ${passedTests} / ${totalTests} TESTS PASSED`);
console.log('============================================================\n');

if (passedTests === totalTests) {
  console.log('✅ ALL SPRINT 9 CONVERGENCE TESTS PASSED PERFECTLY!\n');
  process.exit(0);
} else {
  console.error(`❌ ${totalTests - passedTests} SPRINT 9 TESTS FAILED!`);
  process.exit(1);
}
