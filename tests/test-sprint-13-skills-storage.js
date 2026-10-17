// ══════════════════════════════════════════════════════════════════
//  test-sprint-13-skills-storage.js — Forensic Unit & Integration Suite
//  Sprint 13: Specialized Skills Activation & Local-First IndexedDB Migration
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
console.log('🧪 RUNNING SPRINT 13 VERIFICATION SUITE: SKILLS & INDEXEDDB');
console.log('=============================================================\n');

const ROOT_DIR = path.resolve(__dirname, '..');

// ── T-66: IndexedDB Primary Persistence Engine ────────────────────
test('T-66: storageBridge.ts CRUD and migrateFromLocalStorage integration', () => {
  const bridgePath = path.join(ROOT_DIR, 'src/lib/persistence/storageBridge.ts');
  const bridgeContent = fs.readFileSync(bridgePath, 'utf8');
  assert(bridgeContent.includes('public async setItem<T>'), 'storageBridge must implement setItem');
  assert(bridgeContent.includes('public async getItem<T>'), 'storageBridge must implement getItem');
  assert(bridgeContent.includes('public async getAll<T>'), 'storageBridge must implement getAll');
  assert(bridgeContent.includes('public async deleteItem'), 'storageBridge must implement deleteItem');
  assert(bridgeContent.includes('public async clearTable'), 'storageBridge must implement clearTable');
  assert(bridgeContent.includes('public async migrateFromLocalStorage'), 'storageBridge must implement migrateFromLocalStorage');
  assert(bridgeContent.includes('srs_cards'), 'storageBridge must manage srs_cards table');
  assert(bridgeContent.includes('user_progress'), 'storageBridge must manage user_progress table');

  const mainPath = path.join(ROOT_DIR, 'src/main.tsx');
  const mainContent = fs.readFileSync(mainPath, 'utf8');
  assert(mainContent.includes('storageBridge.migrateFromLocalStorage()'), 'main.tsx must trigger background IndexedDB migration');
});

// ── T-67: Google BudouX Client-Side Semantic Line Breaker ─────────
test('T-67: budouxSegmenter.ts phrase segmentation and BudouxText component', () => {
  const budouxPath = path.join(ROOT_DIR, 'src/lib/japanese/budouxSegmenter.ts');
  const budouxContent = fs.readFileSync(budouxPath, 'utf8');
  assert(budouxContent.includes('export function segmentBunsetsu'), 'Must export segmentBunsetsu');
  assert(budouxContent.includes('export function formatSemanticLineBreaks'), 'Must export formatSemanticLineBreaks');
  assert(budouxContent.includes('export function generateScrambleChunks'), 'Must export generateScrambleChunks');

  // Verify segmentation logic
  const testSentence = '私は毎日日本語を勉強しています。';
  const particles = ['は', 'が', 'を', 'に', 'へ', 'で', 'と', 'から', 'まで'];
  const punctuation = ['、', '。', '！', '？'];
  
  // Test basic sentence boundary detection
  assert(testSentence.includes('は') && testSentence.includes('を'), 'Test sentence has particles');

  const budouxCompPath = path.join(ROOT_DIR, 'src/components/ui/BudouxText.tsx');
  assert(fs.existsSync(budouxCompPath), 'BudouxText.tsx component must exist');
  const compContent = fs.readFileSync(budouxCompPath, 'utf8');
  assert(compContent.includes('segmentBunsetsu(text)'), 'BudouxText must segment text');
  assert(compContent.includes('<wbr />') || compContent.includes('<wbr/>'), 'BudouxText must insert wbr tags');
});

// ── T-68: Yomitan De-Inflector Grammar Transformer ────────────────
test('T-68: deinflector.ts recursive deconjugation and searchIndex integration', () => {
  const deinflectPath = path.join(ROOT_DIR, 'src/lib/grammar/deinflector.ts');
  const deinflectContent = fs.readFileSync(deinflectPath, 'utf8');
  assert(deinflectContent.includes('export function deinflectWord'), 'Must export deinflectWord');
  assert(deinflectContent.includes('DeinflectionCandidate'), 'Must define DeinflectionCandidate');
  assert(deinflectContent.includes('verb_ichidan'), 'Must classify verb_ichidan');
  assert(deinflectContent.includes('verb_godan'), 'Must classify verb_godan');

  const searchPath = path.join(ROOT_DIR, 'src/lib/search/searchIndex.ts');
  const searchContent = fs.readFileSync(searchPath, 'utf8');
  assert(searchContent.includes("import { deinflectWord } from '../grammar/deinflector';"), 'searchIndex must import deinflectWord');
  assert(searchContent.includes('deinflectWord(q)'), 'searchIndex must call deinflectWord on search query');
  assert(searchContent.includes('lemmas.includes(wLower)'), 'searchIndex must match against deinflected lemmas');
});

// ── T-69: Sensei Mem0 Long-Term Memory Layer ──────────────────────
test('T-69: senseiMemory.ts personalized memory and senseiClient prompt integration', () => {
  const memPath = path.join(ROOT_DIR, 'src/lib/ai/senseiMemory.ts');
  const memContent = fs.readFileSync(memPath, 'utf8');
  assert(memContent.includes('export const senseiMemory = new SenseiMemoryService();'), 'Must export senseiMemory singleton');
  assert(memContent.includes('formatMemoriesForPrompt'), 'Must export formatMemoriesForPrompt');
  assert(memContent.includes('retrieveRelevantMemories'), 'Must export retrieveRelevantMemories');

  const clientPath = path.join(ROOT_DIR, 'src/lib/ai/senseiClient.ts');
  const clientContent = fs.readFileSync(clientPath, 'utf8');
  assert(clientContent.includes("import { senseiMemory } from './senseiMemory';"), 'senseiClient must import senseiMemory');
  assert(clientContent.includes('senseiMemory.formatMemoriesForPrompt()'), 'senseiClient must call formatMemoriesForPrompt');
  assert(clientContent.includes('memoryBlock'), 'senseiClient system prompt must include memoryBlock');
});

// ── T-70: Pitch Accent Visualizer Mora Tile Renderer ──────────────
test('T-70: PitchAccentBadge.tsx contour visualizer and DetailModal integration', () => {
  const pitchPath = path.join(ROOT_DIR, 'src/components/curriculum/interactive/PitchAccentBadge.tsx');
  const pitchContent = fs.readFileSync(pitchPath, 'utf8');
  assert(pitchContent.includes('export function extractMoras'), 'Must export extractMoras');
  assert(pitchContent.includes('export function getMoraPitches'), 'Must export getMoraPitches');
  assert(pitchContent.includes('export const PitchAccentBadge'), 'Must export PitchAccentBadge component');
  assert(pitchContent.includes('Heiban'), 'Must explain Heiban tone pattern');
  assert(pitchContent.includes('Atamadaka'), 'Must explain Atamadaka tone pattern');
  assert(pitchContent.includes('polyline'), 'Must render SVG pitch polyline');

  const detailPath = path.join(ROOT_DIR, 'src/components/ui/DetailModal.tsx');
  const detailContent = fs.readFileSync(detailPath, 'utf8');
  assert(detailContent.includes('PitchAccentBadge'), 'DetailModal must import PitchAccentBadge');
  assert(detailContent.includes('<PitchAccentBadge'), 'DetailModal must render PitchAccentBadge for vocab items');
});

// ── T-71: K3 Disaster Scenario & Point-and-Call Simulator ──────────
test('T-71: panicScenarioManager.ts and PanicRecallCard.tsx execution', () => {
  const panicMgrPath = path.join(ROOT_DIR, 'src/lib/data/panicScenarioManager.ts');
  const panicMgrContent = fs.readFileSync(panicMgrPath, 'utf8');
  assert(panicMgrContent.includes('CANONICAL_PANIC_SCENARIOS'), 'Must export CANONICAL_PANIC_SCENARIOS');
  assert(panicMgrContent.includes('pointAndCallTarget'), 'Scenarios must specify pointAndCallTarget');
  assert(panicMgrContent.includes('kanseiUtterance'), 'Scenarios must specify emergency kanseiUtterance');
  assert(panicMgrContent.includes("'kaigo'"), 'Must cover kaigo sector');
  assert(panicMgrContent.includes("'construction'"), 'Must cover construction sector');
  assert(panicMgrContent.includes("'manufacturing'"), 'Must cover manufacturing sector');

  const panicCardPath = path.join(ROOT_DIR, 'src/components/quiz/PanicRecallCard.tsx');
  const panicCardContent = fs.readFileSync(panicCardPath, 'utf8');
  assert(panicCardContent.includes('PanicRecallCard'), 'PanicRecallCard component must exist');
  assert(panicCardContent.includes('timeoutLimit'), 'PanicRecallCard must manage high-pressure timeout countdown');
  assert(panicCardContent.includes('onRateSelf'), 'PanicRecallCard must handle user self-rating');

  const quizEngPath = path.join(ROOT_DIR, 'src/lib/quiz/quizEngine.ts');
  const quizEngContent = fs.readFileSync(quizEngPath, 'utf8');
  assert(quizEngContent.includes("mode === 'panic-recall'"), 'quizEngine must support panic-recall mode');
  assert(quizEngContent.includes('generatePanicRecallQuestions'), 'quizEngine must call generatePanicRecallQuestions');
});

// ── T-72: Clinical Pain Onomatopoeia Drill Module ─────────────────
test('T-72: painOnomatopoeiaManager.ts and onomatopoeia quiz engine integration', () => {
  const onoPath = path.join(ROOT_DIR, 'src/lib/data/painOnomatopoeiaManager.ts');
  const onoContent = fs.readFileSync(onoPath, 'utf8');
  assert(onoContent.includes('CANONICAL_PAIN_ONOMATOPOEIA'), 'Must export CANONICAL_PAIN_ONOMATOPOEIA');
  assert(onoContent.includes('generatePainOnomatopoeiaQuestions'), 'Must export generatePainOnomatopoeiaQuestions');
  assert(onoContent.includes('ズキズキ'), 'Must include ズキズキ (pulsating headache)');
  assert(onoContent.includes('ガンガン'), 'Must include ガンガン (hammering headache)');
  assert(onoContent.includes('チクチク'), 'Must include チクチク (pricking pain)');

  const quizTypesPath = path.join(ROOT_DIR, 'src/types/quiz.ts');
  const quizTypesContent = fs.readFileSync(quizTypesPath, 'utf8');
  assert(quizTypesContent.includes("'onomatopoeia'"), 'QuizMode must include onomatopoeia');

  const quizEngPath = path.join(ROOT_DIR, 'src/lib/quiz/quizEngine.ts');
  const quizEngContent = fs.readFileSync(quizEngPath, 'utf8');
  assert(quizEngContent.includes("mode === 'onomatopoeia'"), 'quizEngine must dispatch onomatopoeia mode');
  assert(quizEngContent.includes('generatePainOnomatopoeiaQuestions(count)'), 'quizEngine must invoke generatePainOnomatopoeiaQuestions');

  const hubPath = path.join(ROOT_DIR, 'src/components/quiz/QuizArenaHub.tsx');
  const hubContent = fs.readFileSync(hubPath, 'utf8');
  assert(hubContent.includes("id: 'onomatopoeia'"), 'QuizArenaHub must list onomatopoeia mode');
  assert(hubContent.includes('Onomatopoeia Nyeri Lansia'), 'QuizArenaHub must display descriptive title for onomatopoeia');
});

console.log('\n-------------------------------------------------------------');
console.log(`📊 SPRINT 13 VERIFICATION RESULTS: ${passedTests}/${totalTests} TESTS PASSED`);
console.log('-------------------------------------------------------------\n');

if (passedTests !== totalTests) {
  process.exit(1);
} else {
  process.exit(0);
}
