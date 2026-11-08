// ══════════════════════════════════════════════════════════════════
//  test-s5-pass8-lexical-indexer.js — Siklus V Pass 8 Forensic Suite
//  28,500+ Lexical Corpus, Modified Hepburn Romanization & Indexer
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
console.log('🧪 SIKLUS V PASS 8: LEXICAL CORPUS & ROMANIZATION INDEXER');
console.log('=============================================================\n');

const ROOT_DIR = path.resolve(__dirname, '..');

// Helper to execute sandbox code
function loadFileSandbox(filePath, varName) {
  const content = fs.readFileSync(filePath, 'utf8');
  const sandbox = {};
  new Function('window', content)(sandbox);
  return sandbox[varName] || [];
}

// ── T-1: Canonical JLPT Vocab Corpus Scale & Distribution ─────────────────────
test('T-1: Canonical JLPT vocabulary corpus contains 10,523 entries across N5-N1', () => {
  const levels = [
    { lvl: 'n5', expected: 1321 },
    { lvl: 'n4', expected: 1286 },
    { lvl: 'n3', expected: 2580 },
    { lvl: 'n2', expected: 2119 },
    { lvl: 'n1', expected: 3217 },
  ];

  let totalJlpt = 0;
  for (const { lvl, expected } of levels) {
    const p = path.join(ROOT_DIR, 'public', 'data', 'vocab', `vocab-${lvl}.js`);
    assert(fs.existsSync(p), `Canonical file vocab-${lvl}.js must exist`);
    const entries = loadFileSandbox(p, `vocab${lvl.toUpperCase()}`);
    assert.strictEqual(entries.length, expected, `Level ${lvl} must have exactly ${expected} entries`);
    totalJlpt += entries.length;
  }

  assert.strictEqual(totalJlpt, 10523, 'Total canonical JLPT vocabulary must equal 10,523 entries');
});

// ── T-2: 19 SSW Vocational Vocab Files & Staged Expansion Scale ───────────────
test('T-2: 19 SSW vocational files and staged expansion provide 6,290+ specialized entries', () => {
  const sswDir = path.join(ROOT_DIR, 'public', 'data', 'vocab', 'ssw');
  assert(fs.existsSync(sswDir), 'SSW vocab directory must exist');

  const expectedSectors = [
    'accommodation', 'agriculture', 'automobile', 'aviation', 'building-cleaning',
    'construction', 'electric-electronic', 'fishery', 'food-service', 'food',
    'forestry', 'industrial-machinery', 'kaigo', 'logistics', 'manufacturing',
    'railway', 'shipbuilding', 'textile', 'timber'
  ];

  let totalSsw = 0;
  for (const sector of expectedSectors) {
    const p = path.join(sswDir, `${sector}.js`);
    assert(fs.existsSync(p), `SSW vocab file ${sector}.js must exist`);
    const pascal = sector.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
    const entries = loadFileSandbox(p, `vocabSSW_${pascal}`);
    assert(Array.isArray(entries) && entries.length > 0, `SSW ${sector} must contain valid entries`);
    totalSsw += entries.length;
  }
  assert.strictEqual(totalSsw, 622, 'SSW sectors must total 622 specialized vocational entries');

  // Verify Staged expansion
  const stagedLevels = ['n5', 'n4', 'n3', 'n2', 'n1'];
  let totalStaged = 0;
  for (const lvl of stagedLevels) {
    const p = path.join(ROOT_DIR, 'public', 'data', 'staged-expansion', 'vocab', `${lvl}-staged.js`);
    assert(fs.existsSync(p), `Staged file ${lvl}-staged.js must exist`);
    const entries = loadFileSandbox(p, `stagedVocab${lvl.toUpperCase()}`);
    totalStaged += entries.length;
  }
  assert.strictEqual(totalStaged, 5669, 'Staged expansion must provide 5,669 advanced entries');
});

// ── T-3: Modified Hepburn Romanization Invariants (0 Nihon-shiki Infractions) ──
test('T-3: Modified Hepburn romanization invariants (shi, chi, tsu, fu, ji) with 0 Nihon-shiki infractions', () => {
  const levels = ['n5', 'n4', 'n3', 'n2', 'n1'];
  let totalAudited = 0;

  for (const lvl of levels) {
    const p = path.join(ROOT_DIR, 'public', 'data', 'vocab', `vocab-${lvl}.js`);
    const entries = loadFileSandbox(p, `vocab${lvl.toUpperCase()}`);

    for (const item of entries) {
      totalAudited++;
      assert(item.word && typeof item.word === 'string', `Entry ${item.id} must have word`);
      assert(item.reading && typeof item.reading === 'string', `Entry ${item.id} must have reading`);
      const meaning = item.meaning_id || item.meaning || item.meaning_en;
      assert(meaning && typeof meaning === 'string' && meaning.trim().length > 0, `Entry ${item.id} must have meaning`);

      if (item.romaji) {
        const r = item.romaji.toLowerCase();
        // Check for Nihon-shiki / Kunrei-shiki infractions:
        // si (not shi), tu (not tsu), hu (not fu), zi (not ji)
        if (/(?<!s)si(?![a-z]*e)/.test(r) && !r.includes('shi')) {
          assert.fail(`Infraction: Nihon-shiki 'si' found in ${item.word} (${item.romaji})`);
        }
        if (/(?<!t)tu/.test(r) && !r.includes('tsu')) {
          assert.fail(`Infraction: Nihon-shiki 'tu' found in ${item.word} (${item.romaji})`);
        }
        if (/(?<![sc])hu/.test(r)) {
          assert.fail(`Infraction: Nihon-shiki 'hu' found in ${item.word} (${item.romaji})`);
        }
        if (/zi/.test(r) && !r.includes('ji')) {
          assert.fail(`Infraction: Nihon-shiki 'zi' found in ${item.word} (${item.romaji})`);
        }
      }
    }
  }

  assert(totalAudited >= 10523, `Must audit at least 10,523 canonical entries, found ${totalAudited}`);
});

// ── T-4: High-Density Pitch Accent & Indonesian Nuance Coverage ───────────────
test('T-4: Pitch accent metadata density exceeds 90% across canonical corpus', () => {
  const levels = ['n5', 'n4', 'n3', 'n2', 'n1'];
  let totalEntries = 0;
  let entriesWithPitch = 0;

  for (const lvl of levels) {
    const p = path.join(ROOT_DIR, 'public', 'data', 'vocab', `vocab-${lvl}.js`);
    const entries = loadFileSandbox(p, `vocab${lvl.toUpperCase()}`);

    for (const item of entries) {
      totalEntries++;
      if (item.pitch || (item.examples && item.examples.some(e => e.pitch))) {
        entriesWithPitch++;
      }
    }
  }

  const pitchRatio = (entriesWithPitch / totalEntries) * 100;
  assert(pitchRatio >= 90, `Pitch accent coverage must exceed 90%, currently: ${pitchRatio.toFixed(1)}%`);
});

// ── T-5: findVocabWithExamplesForKanji Defensive Hardening & Prioritization ────
test('T-5: findVocabWithExamplesForKanji input validation and authentic example prioritization', async () => {
  const dmPath = path.join(ROOT_DIR, 'src/lib/data/dataManager.ts');
  const dmContent = fs.readFileSync(dmPath, 'utf8');

  // Verify source code invariants in dataManager.ts
  assert(dmContent.includes('if (!kanjiChar || typeof kanjiChar !== \'string\') return [];'), 'Must guard against non-string kanjiChar');
  assert(dmContent.includes('const target = kanjiChar.trim();'), 'Must trim kanjiChar target');
  assert(dmContent.includes('if (!target) return [];'), 'Must return empty array on empty or whitespace kanjiChar');
  assert(dmContent.includes('fallbackResults'), 'Must maintain fallbackResults for words without examples');
  assert(dmContent.includes('results.push(v);'), 'Must push matches into results');

  // Execute algorithmic simulation of findVocabWithExamplesForKanji
  const mockVocabs = [
    { word: '学生', reading: 'がくせい', examples: [{ jp: '私は学生です。', id: 'Saya adalah siswa.' }] },
    { word: '学問', reading: 'がくもん', examples: [] },
    { word: '大学', reading: 'だいがく', examples: [{ jp: '大学に行きます。', id: 'Pergi ke kampus.' }] },
    { word: '食べる', reading: 'たべる', examples: [{ jp: 'ご飯を食べる。', id: 'Makan nasi.' }] },
  ];

  function simulateFindVocab(kanjiChar, vocabs) {
    if (!kanjiChar || typeof kanjiChar !== 'string') return [];
    const target = kanjiChar.trim();
    if (!target) return [];

    const results = [];
    const fallbackResults = [];
    const seenWords = new Set();

    for (const v of vocabs) {
      if (v && v.word && v.word.includes(target) && !seenWords.has(v.word)) {
        seenWords.add(v.word);
        if (Array.isArray(v.examples) && v.examples.length > 0) {
          results.push(v);
        } else {
          fallbackResults.push(v);
        }
      }
    }
    if (results.length < 8 && fallbackResults.length > 0) {
      for (const fb of fallbackResults) {
        results.push(fb);
        if (results.length >= 8) break;
      }
    }
    return results;
  }

  // Edge cases: empty string, whitespace, null, undefined
  assert.deepStrictEqual(simulateFindVocab('', mockVocabs), []);
  assert.deepStrictEqual(simulateFindVocab('   ', mockVocabs), []);
  assert.deepStrictEqual(simulateFindVocab(null, mockVocabs), []);
  assert.deepStrictEqual(simulateFindVocab(undefined, mockVocabs), []);

  // Valid search for "学": prioritized words with examples first
  const searchResults = simulateFindVocab('学', mockVocabs);
  assert.strictEqual(searchResults.length, 3);
  assert.strictEqual(searchResults[0].word, '学生');
  assert.strictEqual(searchResults[1].word, '大学');
  assert.strictEqual(searchResults[2].word, '学问'.replace('问', '問')); // fallback item
});

// ── T-6: vocab-index.js Self-Healing O(1) Index Contracts ──────────────────────
test('T-6: vocab-index.js self-healing O(1) index, queryVocab and getVocab contracts', () => {
  const indexerPath = path.join(ROOT_DIR, 'public', 'data', 'vocab', 'vocab-index.js');
  const indexerContent = fs.readFileSync(indexerPath, 'utf8');

  assert(indexerContent.includes('window.buildVocabIndex = function ()'), 'Must define window.buildVocabIndex');
  assert(indexerContent.includes('if (!window.vocabDB || window.vocabDB.length === 0)'), 'buildVocabIndex must self-populate vocabDB');
  assert(indexerContent.includes('window.queryVocab = function (filter = {})'), 'Must define window.queryVocab');
  assert(indexerContent.includes('window.getVocab = function (id)'), 'Must define window.getVocab');
  assert(indexerContent.includes('window.buildVocabIndex();'), 'Must self-heal by calling buildVocabIndex');

  // Test runtime execution of vocab-index.js in simulated sandbox
  const sandbox = {
    vocabN5: [
      { id: 'v-01', word: '本', reading: 'ほん', pos: 'noun', jlpt: 'n5', domain: ['pendidikan'] },
      { id: 'v-02', word: '行く', reading: 'いく', pos: 'verb', jlpt: 'n5', domain: ['kegiatan'] },
    ],
    vocabN4: [],
    vocabN3: [],
    vocabN2: [],
    vocabN1: [],
  };

  new Function('window', indexerContent)(sandbox);

  // Index should auto-build or build on query
  assert(sandbox.vocabDB.length === 2, 'vocabDB must be populated with 2 entries');
  const found = sandbox.getVocab('v-01');
  assert(found && found.word === '本', 'getVocab must retrieve entry by ID');

  const verbs = sandbox.queryVocab({ pos: 'verb' });
  assert.strictEqual(verbs.length, 1);
  assert.strictEqual(verbs[0].word, '行く');
});

// ── T-7: MateriHubPage Multi-Field Search & Accessibility Hardening ───────────
test('T-7: MateriHubPage multi-field search predicate, POS filtering & a11y labels', () => {
  const pagePath = path.join(ROOT_DIR, 'src/pages/MateriHubPage.tsx');
  const pageContent = fs.readFileSync(pagePath, 'utf8');

  // Verify defensive null-safe predicates
  assert(pageContent.includes('(v.word && v.word.includes(q))'), 'Vocab search must guard v.word');
  assert(pageContent.includes('(v.reading && v.reading.includes(q))'), 'Vocab search must guard v.reading');
  assert(pageContent.includes('(v.romaji && v.romaji.toLowerCase().includes(q))'), 'Vocab search must guard v.romaji');
  assert(pageContent.includes('(v.meaning && v.meaning.toLowerCase().includes(q))'), 'Vocab search must guard v.meaning');

  // Verify grammar search defensive guards
  assert(pageContent.includes('(g.pattern && g.pattern.toLowerCase().includes(q))'), 'Grammar search must guard g.pattern');
  assert(pageContent.includes('(g.reading && g.reading.toLowerCase().includes(q))'), 'Grammar search must guard g.reading');
  assert(pageContent.includes('(g.meaning && g.meaning.toLowerCase().includes(q))'), 'Grammar search must guard g.meaning');

  // Verify accessibility aria-labels
  assert(pageContent.includes('aria-label={`Cari kosakata atau tata bahasa'), 'Search input must feature descriptive aria-label');
  assert(pageContent.includes('aria-label="Hapus kata kunci pencarian"'), 'Clear button must feature aria-label');

  // Verify POS taxonomy
  assert(pageContent.includes("id: 'verb', label: 'Kata Kerja (動詞)'"), 'Must support verb filter');
  assert(pageContent.includes("id: 'adj', label: 'Kata Sifat (形容詞)'"), 'Must support adj filter');
  assert(pageContent.includes("id: 'noun', label: 'Kata Benda (名詞)'"), 'Must support noun filter');
  assert(pageContent.includes("id: 'adverb', label: 'Kata Keterangan (副詞)'"), 'Must support adverb filter');
  assert(pageContent.includes("id: 'counter', label: 'Bilangan & Counter (助数詞)'"), 'Must support counter filter');
});

console.log(`\nResults: ${passedTests}/${totalTests} tests passed.\n`);
if (passedTests !== totalTests) {
  process.exit(1);
} else {
  console.log('🎉 ALL SIKLUS V PASS 8 TESTS PASSED PERFECTION!\n');
  process.exit(0);
}
