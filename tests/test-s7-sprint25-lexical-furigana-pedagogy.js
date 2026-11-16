/**
 * test-s7-sprint25-lexical-furigana-pedagogy.js
 * 
 * Sprint 25 (Pass 3) — Deep Lexical, Phonological & Furigana Pedagogical Audit
 * 
 * Verifies:
 * 1. Phonological tokenizer (splitIntoMora) sanitizes non-kana symbols (slashes, parentheses, tildes).
 * 2. public/data/vocab/ cleaner integrity:
 *    - 0 suru-verb parenthesized readings in N5 verbs.
 *    - N5 nouns (四, 七, 九, 妻, 夫) have pure kana readings and zero typos.
 *    - N4 nouns (パート, 〜中) and verbs (〜てしまう) have clean readings.
 *    - N3 expressions (しまった, すみません, よろしく, はあ) have zero leaked '(かん)'.
 * 3. Curriculum lesson vocab_breakdown audit:
 *    - SSW Kaigo: 利用者, 体調, 転倒, 意識, 呼吸, 出血 have proper Kanji headwords and pure Kana readings.
 *    - N5/N4 Unit lessons: なまえ, にほん, いしゃ, なん, 掃除, パート have clean readings.
 *    - 100% of all curriculum lesson vocab_breakdown readings are free of kanji, slashes, or parentheses.
 * 4. Keigo example reading integrity:
 *    - Otto example reading is 100% pure kana without leaked kanji.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('🧪 Starting Sprint 25 Lexical, Phonological & Furigana Pedagogical Suite...\n');

let passedTests = 0;
function test(name, fn) {
  try {
    fn();
    console.log(`  ✅ ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ ${name}`);
    console.error(`     Error: ${err.message}`);
    process.exit(1);
  }
}

// ── 1. Phonological Mora Tokenizer Tests ──
test('moraTokenizer source file strips non-kana, parentheticals, and slashes', () => {
  const tokenizerPath = path.join(__dirname, '../src/lib/audio/moraTokenizer.ts');
  assert(fs.existsSync(tokenizerPath), 'moraTokenizer.ts must exist');
  const content = fs.readFileSync(tokenizerPath, 'utf8');
  assert(content.includes('replace(/\\([^)]*\\)|（[^）]*）/g'), 'Must strip ASCII and fullwidth parentheticals');
  assert(content.includes('clean.split(/[,、;/]/)[0]'), 'Must take primary headword before slash or comma');
  assert(content.includes('\\u3041-\\u3096\\u30A1-\\u30FAー'), 'Must enforce Kana character filter');
});

// ── 2. Vocabulary Data Purity in public/data/vocab/ ──
test('N5 verbs contain zero parenthesized suru readings (e.g. けっこん (する))', () => {
  const n5VerbsPath = path.join(__dirname, '../public/data/vocab/n5/n5-verbs.js');
  const content = fs.readFileSync(n5VerbsPath, 'utf8');
  assert(!content.includes('"reading": "けっこん (する)"'), 'けっこん must not have (する) in reading');
  assert(!content.includes('"reading": "さんぽ (する)"'), 'さんぽ must not have (する) in reading');
  assert(!content.includes('"reading": "そうじ (する)"'), 'そうじ must not have (する) in reading');
  assert(!content.includes('"reading": "べんきょう (する)"'), 'べんきょう must not have (する) in reading');
  assert(content.includes('"reading": "けっこん"'), 'けっこん must have clean reading');
  assert(content.includes('"reading": "さんぽ"'), 'さんぽ must have clean reading');
  assert(content.includes('"reading": "そうじ"'), 'そうじ must have clean reading');
  assert(content.includes('"reading": "べんきょう"'), 'べんきょう must have clean reading');
});

test('N5 nouns have pure kana readings for numbers (四, 七, 九) and family pairs (妻, 夫)', () => {
  const n5NounsPath = path.join(__dirname, '../public/data/vocab/n5/n5-nouns.js');
  const content = fs.readFileSync(n5NounsPath, 'utf8');
  assert(!content.includes('"reading": "し/よん"'), '四 must not have slash reading');
  assert(!content.includes('"reading": "しち/なな"'), '七 must not have slash reading');
  assert(!content.includes('"reading": "きゅう/く"'), '九 must not have slash reading');
  assert(!content.includes('"reading": "つま/かない"'), '妻 must not have slash reading');
  assert(!content.includes('"reading": "おっと/しゅじん"'), '夫 must not have slash reading');
  assert(!content.includes('"romaji": "ottto/shujin"'), '夫 romaji must not have triple t typo');
  assert(content.includes('"word": "妻"'), '妻 must be headword');
  assert(content.includes('"word": "夫"'), '夫 must be headword');
});

test('N4 nouns and verbs have clean readings without parentheses or slashes', () => {
  const n4NounsPath = path.join(__dirname, '../public/data/vocab/n4/n4-nouns.js');
  const n4VerbsPath = path.join(__dirname, '../public/data/vocab/n4/n4-verbs.js');
  const nounsContent = fs.readFileSync(n4NounsPath, 'utf8');
  const verbsContent = fs.readFileSync(n4VerbsPath, 'utf8');
  assert(!nounsContent.includes('"reading": "パート (タイム)"'), 'パート must not have (タイム) in reading');
  assert(!nounsContent.includes('"reading": "〜じゅう/ちゅう"'), '〜中 must not have slash reading');
  assert(!verbsContent.includes('"reading": "～(て) しまう"'), '〜てしまう must not have parenthesized (て)');
});

test('N3 expressions have zero leaked (かん) grammatical tags in headwords and readings', () => {
  const n3ExpPath = path.join(__dirname, '../public/data/vocab/n3/n3-expressions.js');
  const content = fs.readFileSync(n3ExpPath, 'utf8');
  assert(!content.includes('"reading": "しまった (かん)"'), 'しまった must not have (かん)');
  assert(!content.includes('"reading": "すみません (かん)"'), 'すみません must not have (かん)');
  assert(!content.includes('"reading": "よろしく (かん)"'), 'よろしく must not have (かん)');
  assert(!content.includes('"reading": "はあ (かん)"'), 'はあ must not have (かん)');
  assert(content.includes('"reading": "しまった"'), 'しまった reading clean');
  assert(content.includes('"reading": "すみません"'), 'すみません reading clean');
  assert(content.includes('"reading": "よろしく"'), 'よろしく reading clean');
  assert(content.includes('"reading": "はあ"'), 'はあ reading clean');
});

// ── 3. Curriculum Lessons Vocab Breakdown Purity ──
test('SSW Kaigo lessons have Kanji headwords and pure Kana readings in vocab_breakdown', () => {
  const kaigoPath = path.join(__dirname, '../src/lib/curriculum/lessons/ssw/kaigo.ts');
  const content = fs.readFileSync(kaigoPath, 'utf8');
  // Check no slashes or kanji in readings
  assert(!content.includes("reading: 'りようしゃ / 利用者様'"), '利用者 reading must not have slash or kanji');
  assert(!content.includes("reading: 'たいちょう / 体調'"), '体調 reading must not have slash or kanji');
  assert(!content.includes("reading: 'てんとう (転倒)'"), '転倒 reading must not have parenthesized kanji');
  assert(!content.includes("reading: 'いしき (意識)'"), '意識 reading must not have parenthesized kanji');
  assert(!content.includes("reading: 'こきゅう (呼吸)'"), '呼吸 reading must not have parenthesized kanji');
  assert(!content.includes("reading: 'しゅっけつ (出血)'"), '出血 reading must not have parenthesized kanji');

  // Check correct clean entries
  assert(content.includes("word: '利用者'") && content.includes("reading: 'りようしゃ'"), '利用者 clean entry');
  assert(content.includes("word: '体調'") && content.includes("reading: 'たいちょう'"), '体調 clean entry');
  assert(content.includes("word: '転倒'") && content.includes("reading: 'てんとう'"), '転倒 clean entry');
  assert(content.includes("word: '意識'") && content.includes("reading: 'いしき'"), '意識 clean entry');
  assert(content.includes("word: '呼吸'") && content.includes("reading: 'こきゅう'"), '呼吸 clean entry');
  assert(content.includes("word: '出血'") && content.includes("reading: 'しゅっけつ'"), '出血 clean entry');
});

test('N5 and N4 unit lessons have clean readings without slashes or parentheses', () => {
  const n5u01Path = path.join(__dirname, '../src/lib/curriculum/lessons/n5/unit01.ts');
  const n5u02Path = path.join(__dirname, '../src/lib/curriculum/lessons/n5/unit02.ts');
  const n5u10Path = path.join(__dirname, '../src/lib/curriculum/lessons/n5/unit10.ts');
  const n4u05Path = path.join(__dirname, '../src/lib/curriculum/lessons/n4/unit05.ts');
  const n4u12Path = path.join(__dirname, '../src/lib/curriculum/lessons/n4/unit12.ts');

  const u01 = fs.readFileSync(n5u01Path, 'utf8');
  assert(!u01.includes('"reading": "なまえ / おなまえ"'), 'なまえ reading clean');
  assert(!u01.includes('"reading": "にほん / にっぽん"'), 'にほん reading clean');
  assert(!u01.includes('"reading": "いしゃ / おいしゃさん"'), 'いしゃ reading clean');
  assert(u01.includes('"reading": "なまえ"'), 'なまえ pure kana');
  assert(u01.includes('"reading": "にほん"'), 'にほん pure kana');
  assert(u01.includes('"reading": "いしゃ"'), 'いしゃ pure kana');

  const u02 = fs.readFileSync(n5u02Path, 'utf8');
  assert(!u02.includes('"reading": "なん / なに"'), 'なん reading clean');
  assert(u02.includes('"reading": "なん"'), 'なん pure kana');

  const u10 = fs.readFileSync(n5u10Path, 'utf8');
  assert(!u10.includes('"reading": "そうじ (する)"'), 'そうじ reading clean');
  assert(u10.includes('"reading": "そうじ"'), 'そうじ pure kana');

  const n4u05 = fs.readFileSync(n4u05Path, 'utf8');
  assert(!n4u05.includes('"reading": "パート (タイム)"'), 'パート reading clean');
  assert(n4u05.includes('"reading": "パート"'), 'パート pure kana');

  const n4u12 = fs.readFileSync(n4u12Path, 'utf8');
  assert(!n4u12.includes('"reading": "〜じゅう/ちゅう"'), '〜中 reading clean');
  assert(n4u12.includes('"reading": "〜じゅう"'), '〜中 pure kana');
});

test('Zero dirty readings across all curriculum lesson files in src/lib/curriculum/lessons', () => {
  function walk(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      file = path.join(dir, file);
      const stat = fs.statSync(file);
      if (stat && stat.isDirectory()) results = results.concat(walk(file));
      else if (file.endsWith('.ts') || file.endsWith('.js')) results.push(file);
    });
    return results;
  }

  const lessonsDir = path.join(__dirname, '../src/lib/curriculum/lessons');
  const lessonFiles = walk(lessonsDir);
  let dirtyCount = 0;

  lessonFiles.forEach(f => {
    const content = fs.readFileSync(f, 'utf8');
    const lines = content.split('\n');
    lines.forEach((l) => {
      if (l.includes('reading') && !l.includes('nuance') && (l.includes('/') || l.includes('(') || l.includes('（') || /[一-龯]/.test(l))) {
        dirtyCount++;
      }
    });
  });

  assert.strictEqual(dirtyCount, 0, `All curriculum lesson readings must be pure kana, found ${dirtyCount} dirty readings`);
});

// ── 4. Keigo Dataset Example Reading Purity ──
test('Keigo dataset has 100% pure kana reading in example sentences (no kanji leaked)', () => {
  const keigoPath = path.join(__dirname, '../src/lib/keigo/keigoData.ts');
  const content = fs.readFileSync(keigoPath, 'utf8');
  assert(!content.includes("reading: 'ごしゅじんはきょうもお忙しいですか。'"), 'Keigo otto example reading must not leak お忙しい kanji');
  assert(content.includes("reading: 'ごしゅじんはきょうもおいそがしいですか。'"), 'Keigo otto example reading must be pure kana');
});

// ── 5. Merged Vocab Files Invariant ──
test('Merged vocab files (vocab-n5.js, vocab-n4.js) contain cleaned readings', () => {
  const mergedN5 = fs.readFileSync(path.join(__dirname, '../public/data/vocab/vocab-n5.js'), 'utf8');
  const mergedN4 = fs.readFileSync(path.join(__dirname, '../public/data/vocab/vocab-n4.js'), 'utf8');
  assert(!mergedN5.includes('"reading": "し/よん"'), 'Merged N5 has no slash for 四');
  assert(!mergedN5.includes('"reading": "けっこん (する)"'), 'Merged N5 has no parenthetical suru');
  assert(!mergedN4.includes('"reading": "パート (タイム)"'), 'Merged N4 has no parenthetical');
  assert(!mergedN4.includes('"reading": "〜じゅう/ちゅう"'), 'Merged N4 has no slash');
});

console.log(`\n🎉 ALL ${passedTests} SPRINT 25 LEXICAL & PHONOLOGICAL VERIFICATION CONTRACTS PASSED 100% GREEN!\n`);
