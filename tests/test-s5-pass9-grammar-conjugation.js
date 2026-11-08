// ══════════════════════════════════════════════════════════════════
//  test-s5-pass9-grammar-conjugation.js — Siklus V Pass 9 Forensic Suite
//  870+ Grammar Corpus, Conjugation Matrix & Yomitan De-Inflector Engine
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
console.log('🧪 SIKLUS V PASS 9: GRAMMAR POINTS & CONJUGATION ENGINE');
console.log('=============================================================\n');

const ROOT_DIR = path.resolve(__dirname, '..');

function loadFileSandbox(filePath, varName) {
  const content = fs.readFileSync(filePath, 'utf8');
  const sandbox = {};
  new Function('window', content)(sandbox);
  return sandbox[varName] || [];
}

// ── T-1: Canonical JLPT Grammar Corpus Scale & Completeness ───────────────────
test('T-1: Canonical JLPT grammar corpus contains exactly 876 points across N5-N1 with 100% examples', () => {
  const levels = [
    { lvl: 'n5', expected: 94 },
    { lvl: 'n4', expected: 92 },
    { lvl: 'n3', expected: 180 },
    { lvl: 'n2', expected: 310 },
    { lvl: 'n1', expected: 200 },
  ];

  let totalGrammar = 0;
  for (const { lvl, expected } of levels) {
    const p = path.join(ROOT_DIR, 'public', 'data', 'grammar', `grammar-${lvl}.js`);
    assert(fs.existsSync(p), `Canonical file grammar-${lvl}.js must exist`);
    const entries = loadFileSandbox(p, `grammar${lvl.toUpperCase()}`);
    assert.strictEqual(entries.length, expected, `Level ${lvl} must have exactly ${expected} grammar points`);
    totalGrammar += entries.length;

    for (const item of entries) {
      assert(item.id && typeof item.id === 'string', 'Grammar item must have id');
      const pattern = item.pattern || item.grammar || item.title;
      assert(pattern && typeof pattern === 'string', `Grammar ${item.id} must have pattern`);
      const meaning = item.meaning || item.desc || item.meaning_id;
      assert(meaning && typeof meaning === 'string', `Grammar ${item.id} must have meaning`);
      assert(Array.isArray(item.examples) && item.examples.length > 0, `Grammar ${item.id} must have example sentences`);
      assert(item.examples[0].jp && item.examples[0].id, `Grammar ${item.id} example must have jp and id`);
    }
  }

  assert.strictEqual(totalGrammar, 876, 'Total canonical JLPT grammar must equal 876 points');
});

// ── T-2: Conjugation Engine Invariants (Godan, Ichidan, Suru, Kuru) ───────────
test('T-2: Conjugation engine correctly inflects Godan (9 endings + Iku), Ichidan, Suru, and Kuru', () => {
  const { conjugateVerb, inferType } = require(path.join(ROOT_DIR, 'src/lib/grammar/conjugation.ts'));

  const testMatrix = [
    // Ichidan
    { word: '食べる', type: 'ichidan', te: '食べて', masu: '食べます', nai: '食べない', ta: '食べた', potential: '食べられる', ba: '食べれば' },
    { word: '見る', type: 'ichidan', te: '見て', masu: '見ます', nai: '見ない', ta: '見た', potential: '見られる', ba: '見れば' },
    // Godan endings: u, ku, gu, su, tsu, nu, bu, mu, ru
    { word: '買う', type: 'godan', te: '買って', masu: '買います', nai: '買わない', ta: '買った', potential: '買える', ba: '買えば' },
    { word: '書く', type: 'godan', te: '書いて', masu: '書きます', nai: '書かない', ta: '書いた', potential: '書ける', ba: '書けば' },
    { word: '泳ぐ', type: 'godan', te: '泳いで', masu: '泳ぎます', nai: '泳がない', ta: '泳いだ', potential: '泳げる', ba: '泳げば' },
    { word: '話す', type: 'godan', te: '話して', masu: '話します', nai: '話さない', ta: '話した', potential: '話せる', ba: '話せば' },
    { word: '待つ', type: 'godan', te: '待って', masu: '待ちます', nai: '待たない', ta: '待った', potential: '待てる', ba: '待てば' },
    { word: '死ぬ', type: 'godan', te: '死んで', masu: '死にます', nai: '死なない', ta: '死んだ', potential: '死ねる', ba: '死ねば' },
    { word: '遊ぶ', type: 'godan', te: '遊んで', masu: '遊びます', nai: '遊ばない', ta: '遊んだ', potential: '遊べる', ba: '遊べば' },
    { word: '飲む', type: 'godan', te: '飲んで', masu: '飲みます', nai: '飲まない', ta: '飲んだ', potential: '飲める', ba: '飲めば' },
    { word: '走る', type: 'godan', te: '走って', masu: '走ります', nai: '走らない', ta: '走った', potential: '走れる', ba: '走れば' }, // Godan exception with -ru ending
    { word: '行く', type: 'godan', te: '行って', masu: '行きます', nai: '行かない', ta: '行った', potential: '行ける', ba: '行けば' }, // Special ku exception
    // Irregular Suru & Kuru
    { word: 'する', type: 'suru', te: 'して', masu: 'します', nai: 'しない', ta: 'した', potential: 'できる', ba: 'すれば' },
    { word: '来る', type: 'kuru', te: '来て', masu: '来ます', nai: '来ない', ta: '来た', potential: '来られる', ba: '来れば' },
  ];

  for (const item of testMatrix) {
    const inferred = inferType(item.word);
    assert.strictEqual(inferred, item.type, `Inferred type for ${item.word} must be ${item.type}`);
    for (const form of ['te', 'masu', 'nai', 'ta', 'potential', 'ba']) {
      const conjugated = conjugateVerb(item.word, form, item.type);
      assert.strictEqual(conjugated, item[form], `${item.word} [${form}] must be ${item[form]}`);
    }
  }
});

// ── T-3: Yomitan De-Inflector Transforms & Explanation Integrity ──────────────
test('T-3: Yomitan de-inflector deconstructs complex multi-suffix chains with Indonesian explanations', () => {
  const { deinflectWord } = require(path.join(ROOT_DIR, 'src/lib/grammar/deinflector.ts'));

  const testCases = [
    { inflected: '食べさせられた', expectedLemma: '食べる', expectedRuleSnippet: 'Kausatif-Pasif' },
    { inflected: '飲まない', expectedLemma: '飲む', expectedRuleSnippet: 'Negatif' },
    { inflected: '行かせる', expectedLemma: '行く', expectedRuleSnippet: 'Kausatif' },
    { inflected: '読まれた', expectedLemma: '読む', expectedRuleSnippet: 'Pasif' },
    { inflected: '書いている', expectedLemma: '書く', expectedRuleSnippet: 'Sedang Berlangsung' },
  ];

  for (const { inflected, expectedLemma, expectedRuleSnippet } of testCases) {
    const candidates = deinflectWord(inflected);
    assert(candidates.length > 0, `Must deinflect ${inflected}`);
    const found = candidates.find(c => c.lemma === expectedLemma);
    assert(found, `Expected lemma ${expectedLemma} for ${inflected}, got ${candidates.map(c => c.lemma).join(', ')}`);
    assert(found.steps.length > 0, 'Must provide transformation steps');
    assert(found.steps.some(s => s.explanationId.includes(expectedRuleSnippet)), `Step explanations must mention ${expectedRuleSnippet}`);
  }
});

// ── T-4: conjugation.ts Defensive Hardening & Edge Cases ──────────────────────
test('T-4: conjugation.ts defensive guards against empty/null inputs and romaji transliteration', () => {
  const { conjugate, normalize, inferType } = require(path.join(ROOT_DIR, 'src/lib/grammar/conjugation.ts'));

  // Edge cases
  assert.strictEqual(inferType(''), null);
  assert.strictEqual(inferType('   '), null);
  assert.strictEqual(inferType(null), null);
  assert.strictEqual(inferType(undefined), null);

  assert.strictEqual(normalize(''), null);
  assert.strictEqual(normalize('   '), null);
  assert.strictEqual(normalize(null), null);
  assert.strictEqual(normalize(undefined), null);

  assert.strictEqual(conjugate('', 'te'), null);
  assert.strictEqual(conjugate(null, 'te'), null);
  assert.strictEqual(conjugate('食べる', ''), null);
  assert.strictEqual(conjugate('食べる', null), null);

  // Romaji normalization
  assert.strictEqual(conjugate('taberu', 'te'), 'たべて');
  assert.strictEqual(conjugate('nomu', 'masu'), 'のみます');
  assert.strictEqual(conjugate('iku', 'ta'), 'いった');
});

// ── T-5: grammar-index.js Self-Healing O(1) Index & Query Contracts ───────────
test('T-5: grammar-index.js self-healing O(1) index, safe queryGrammar with no args and getGrammar', () => {
  const indexerPath = path.join(ROOT_DIR, 'public', 'data', 'grammar', 'grammar-index.js');
  const indexerContent = fs.readFileSync(indexerPath, 'utf8');

  assert(indexerContent.includes('window.queryGrammar = function (filter)'), 'Must define window.queryGrammar');
  assert(indexerContent.includes('window.getGrammar = function (id)'), 'Must define window.getGrammar');
  assert(indexerContent.includes('ensureGrammarDB();'), 'Must self-heal with ensureGrammarDB');

  // Test runtime in sandbox
  const sandbox = {
    grammarN5: [
      { id: 'gn5-01', pattern: '〜は〜です', reading: 'wa desu', meaning: 'X adalah Y', level: 'n5', cat: 'dasar' },
      { id: 'gn5-02', pattern: '〜も', reading: 'mo', meaning: 'juga', level: 'n5', cat: 'partikel' },
    ],
    grammarN4: [],
    grammarN3: [],
    grammarN2: [],
    grammarN1: [],
  };

  new Function('window', indexerContent)(sandbox);

  // Calling queryGrammar without arguments must not throw TypeError
  const allGrammar = sandbox.queryGrammar();
  assert.strictEqual(allGrammar.length, 2, 'queryGrammar() with no arguments returns all items');

  // Filter by category
  const partikel = sandbox.queryGrammar({ cat: 'partikel' });
  assert.strictEqual(partikel.length, 1);
  assert.strictEqual(partikel[0].id, 'gn5-02');

  // getGrammar by ID
  const item = sandbox.getGrammar('gn5-01');
  assert(item && item.pattern === '〜は〜です', 'getGrammar must retrieve by ID');
});

// ── T-6: ConjugationModal.tsx Accessibility & Mobile Ergonomics ───────────────
test('T-6: ConjugationModal.tsx accessibility aria-labels, touch targets (>=40px) and bottom sheet ergonomics', () => {
  const modalPath = path.join(ROOT_DIR, 'src/components/grammar/ConjugationModal.tsx');
  const modalContent = fs.readFileSync(modalPath, 'utf8');

  assert(modalContent.includes('aria-label="Ketik kata kerja untuk mengecek konjugasi"'), 'Search input must have aria-label');
  assert(modalContent.includes('min-h-[40px]'), 'Preset and action buttons must maintain min-h-[40px]');
  assert(modalContent.includes('active:scale-95'), 'Interactive elements must feature active tactile feedback');
  assert(modalContent.includes('max-h-[90dvh]'), 'Modal must support dynamic viewport bottom sheet ergonomics');
  assert(modalContent.includes('aria-modal="true"'), 'Modal must declare aria-modal="true"');
  assert(modalContent.includes('aria-labelledby="conjugation-modal-title"'), 'Modal must link title with aria-labelledby');
});

console.log(`\nResults: ${passedTests}/${totalTests} tests passed.\n`);
if (passedTests !== totalTests) {
  process.exit(1);
} else {
  console.log('🎉 ALL SIKLUS V PASS 9 TESTS PASSED PERFECTION!\n');
  process.exit(0);
}
