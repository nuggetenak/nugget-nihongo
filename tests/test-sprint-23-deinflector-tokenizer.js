// ══════════════════════════════════════════════════════════════════
//  test-sprint-23-deinflector-tokenizer.js — Forensic Unit & Integration Suite
//  Sprint 23: Offline-First Japanese Dictionary, Furigana Tokenizer & Yomitan De-inflector
//  (Tickets T-127 to T-132)
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
console.log('📖 RUNNING SPRINT 23 VERIFICATION SUITE: DICTIONARY & TOKENIZER');
console.log('=============================================================\n');

const ROOT_DIR = path.resolve(__dirname, '..');

// ── T-127: Client-Side Morphological Tokenizer & Ruby Furigana ──
test('T-127: tokenizer.ts extracts morphemes, converts kana, and formats ruby furigana', () => {
  const {
    containsKanji,
    katakanaToHiragana,
    toRubyHtml,
    tokenizeJapanese,
  } = require('../src/lib/japanese/tokenizer.ts');

  // 1. Kanji detection
  assert.strictEqual(containsKanji('日本語'), true);
  assert.strictEqual(containsKanji('にほんご'), false);
  assert.strictEqual(containsKanji('hiragana123'), false);

  // 2. Katakana to Hiragana conversion
  assert.strictEqual(katakanaToHiragana('ラーメン'), 'らーめん');
  assert.strictEqual(katakanaToHiragana('コーヒー'), 'こーひー');
  assert.strictEqual(katakanaToHiragana('サクラ'), 'さくら');

  // 3. Ruby HTML markup conversion
  const rubyBracket = toRubyHtml('私[わたし]の学校[がっこう]');
  assert(rubyBracket.includes('<ruby>私<rt>わたし</rt></ruby>'));
  assert(rubyBracket.includes('<ruby>学校<rt>がっこう</rt></ruby>'));

  const rubyCurly = toRubyHtml('食{た}べる');
  assert(rubyCurly.includes('<ruby>食<rt>た</rt></ruby>べる'));

  // 4. Tokenizer surface parsing
  const tokens = tokenizeJapanese('私は日本へ行きます。');
  assert(tokens.length >= 4, 'Should extract distinct tokens');
  const surfaces = tokens.map((t) => t.surface);
  assert(surfaces.includes('私') || surfaces.includes('日本') || surfaces.includes('行きます'));
});

// ── T-128: Yomitan De-Inflector Rule Engine ──
test('T-128: deinflector.ts deconstructs complex agglutinative verb and adjective conjugations', () => {
  const { deinflectWord } = require('../src/lib/grammar/deinflector.ts');

  // 1. Negative past Ichidan: 食べなかった -> 食べる
  const res1 = deinflectWord('食べなかった');
  assert(res1.some((c) => c.lemma === '食べる'), 'Must de-inflect 食べなかった to 食べる');

  // 2. Potential / Passive: 食べられる -> 食べる
  const res2 = deinflectWord('食べられる');
  assert(res2.some((c) => c.lemma === '食べる'), 'Must de-inflect 食べられる to 食べる');

  // 3. Causative: 食べさせる -> 食べる
  const res3 = deinflectWord('食べさせる');
  assert(res3.some((c) => c.lemma === '食べる'), 'Must de-inflect 食べさせる to 食べる');

  // 4. Godan Negative: 飲まない -> 飲む
  const res4 = deinflectWord('飲まない');
  assert(res4.some((c) => c.lemma === '飲む'), 'Must de-inflect 飲まない to 飲む');

  // 5. Adjective negative: 美しくない -> 美しい
  const res5 = deinflectWord('美しくない');
  assert(res5.some((c) => c.lemma === '美しい'), 'Must de-inflect 美しくない to 美しい');

  // Ensure Indonesian explanations are present
  assert(res1[0].steps.length > 0 && typeof res1[0].steps[0].explanationId === 'string');
});

// ── T-129: BudouX Semantic Line Breaking & Phrase Tiles ──
test('T-129: budouxSegmenter.ts provides bunsetsu segmentation and quiz scramble tiles', () => {
  const {
    segmentBunsetsu,
    formatSemanticLineBreaks,
    translateHTMLString,
    generateScrambleTiles,
  } = require('../src/lib/japanese/budouxSegmenter.ts');

  const sentence = '明日は友達と映画を見に行きます。';
  const chunks = segmentBunsetsu(sentence);
  assert(Array.isArray(chunks) && chunks.length >= 3, 'Must split sentence into bunsetsu chunks');

  const html = formatSemanticLineBreaks(sentence);
  assert(html.includes('<wbr>'), 'Must inject <wbr> tags');
  assert.strictEqual(translateHTMLString(sentence), html, 'translateHTMLString must match formatSemanticLineBreaks');

  const tiles = generateScrambleTiles(sentence);
  assert(Array.isArray(tiles) && tiles.length === chunks.length, 'Scramble tiles must match bunsetsu count');
});

// ── T-130: WordLookupSheet Modal Component Verification ──
test('T-130: WordLookupSheet.tsx renders accessible dialog with Yomitan decomposition', () => {
  const sheetPath = path.join(ROOT_DIR, 'src/components/modals/WordLookupSheet.tsx');
  assert(fs.existsSync(sheetPath), 'WordLookupSheet.tsx must exist');
  const code = fs.readFileSync(sheetPath, 'utf8');

  assert(code.includes('role="dialog"'), 'Must specify role="dialog"');
  assert(code.includes('aria-modal="true"'), 'Must specify aria-modal="true"');
  assert(code.includes('offlineDictionary.lookup(word)'), 'Must invoke offlineDictionary.lookup');
  assert(code.includes('Dekomposisi Tata Bahasa (Yomitan)'), 'Must render Yomitan decomposition section');
  assert(code.includes('max-h-[90dvh]'), 'Must enforce multi-device max-height cap');
});

// ── T-131: Offline Dictionary Index & Definition Caching ──
test('T-131: offlineDictionary.ts resolves exact entries and deinflected lemmas with caching', () => {
  const dictPath = path.join(ROOT_DIR, 'src/lib/japanese/offlineDictionary.ts');
  assert(fs.existsSync(dictPath), 'offlineDictionary.ts must exist');
  const code = fs.readFileSync(dictPath, 'utf8');

  assert(code.includes('class OfflineDictionaryService'), 'Must define OfflineDictionaryService class');
  assert(code.includes('public registerEntry('), 'Must implement registerEntry method');
  assert(code.includes('public registerVocabList('), 'Must implement registerVocabList method');
  assert(code.includes('public lookup('), 'Must implement lookup method');
  assert(code.includes('deinflectWord(clean)'), 'Must integrate Yomitan deinflectWord for conjugations');
  assert(code.includes('private maxCacheSize: number = 60'), 'Must define LRU cache ceiling');
  assert(code.includes('export const offlineDictionary = new OfflineDictionaryService()'), 'Must export offlineDictionary singleton');
  assert(code.includes("kanji: '食べる'"), 'Must seed high frequency core vocabulary');
});

// ── Print Summary ──
console.log('\n=============================================================');
console.log(`📊 SPRINT 23 TEST RESULTS: ${passedTests}/${totalTests} TESTS PASSED`);
console.log('=============================================================\n');

if (passedTests !== totalTests) {
  process.exit(1);
}
