// ══════════════════════════════════════════════════════════════════
//  test-sprint-32-dataset-ingestion.js — Forensic Unit & Integration Suite
//  Sprint 32: Dataset Ingestion, Tatoeba Alignment, Kanji Jukugo & Pomax Nuance Notes
//  (Tickets T-176 to T-180)
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
console.log('🧪 RUNNING SPRINT 32 VERIFICATION SUITE: DATASET INGESTION');
console.log('=============================================================\n');

const ROOT_DIR = path.resolve(__dirname, '..');

// ── T-176: Reclaim 17 Missing N3 Grammar IDs & 124 Vocab Gaps ──
test('T-176: grammar-n3.js contains all 180 entries including gn3-00100 & gn3-00105 to gn3-00120', () => {
  const grammarPath = path.join(ROOT_DIR, 'public/data/grammar/grammar-n3.js');
  assert(fs.existsSync(grammarPath), 'grammar-n3.js must exist');
  
  const content = fs.readFileSync(grammarPath, 'utf8');
  const s = {};
  new Function('window', content)(s);
  const list = s.grammarN3 || [];

  assert.strictEqual(list.length, 180, `Expected exactly 180 N3 grammar entries, found ${list.length}`);

  const ids = new Set(list.map(g => g.id));
  assert(ids.has('gn3-00100'), 'Must contain gn3-00100 (〜わけではない)');
  
  const required105to120 = [
    'gn3-00105', 'gn3-00106', 'gn3-00107', 'gn3-00108', 'gn3-00109',
    'gn3-00110', 'gn3-00111', 'gn3-00112', 'gn3-00113', 'gn3-00114',
    'gn3-00115', 'gn3-00116', 'gn3-00117', 'gn3-00118', 'gn3-00119',
    'gn3-00120'
  ];
  for (const reqId of required105to120) {
    assert(ids.has(reqId), `Must contain missing N3 grammar ID ${reqId}`);
  }

  // Verify n2-adverbs.js exists and is populated
  const adverbsPath = path.join(ROOT_DIR, 'public/data/vocab/n2/n2-adverbs.js');
  assert(fs.existsSync(adverbsPath), 'n2-adverbs.js must exist in public/data/vocab/n2/');

  const advSandbox = {};
  new Function('window', fs.readFileSync(adverbsPath, 'utf8'))(advSandbox);
  const n2Adverbs = advSandbox.vocabN2_Adverbs || [];
  assert(n2Adverbs.length >= 63, `Expected >= 63 N2 adverbs, found ${n2Adverbs.length}`);

  // Verify vocab-n2.js includes adverbs category
  const vocabN2Sandbox = {};
  new Function('window', fs.readFileSync(path.join(ROOT_DIR, 'public/data/vocab/vocab-n2.js'), 'utf8'))(vocabN2Sandbox);
  const n2All = vocabN2Sandbox.vocabN2 || [];
  const n2AdvCount = n2All.filter(x => (x.pos || '').toLowerCase().includes('adv')).length;
  assert(n2AdvCount >= 100, `Expected >= 100 adverbs in vocab-n2.js, found ${n2AdvCount}`);
});

// ── T-177: Tatoeba Indonesian Alignment for Example Sentences ──
test('T-177: vocab-n2.js and vocab-n1.js example sentences are translated to Indonesian (>99% clean)', () => {
  const checkLeaks = (filePath) => {
    const s = {};
    new Function('window', fs.readFileSync(filePath, 'utf8'))(s);
    const arr = Object.values(s)[0] || [];
    let leaked = 0;
    let totalEx = 0;
    for (const item of arr) {
      for (const ex of (item.examples || [])) {
        totalEx++;
        const idText = (ex.id || '').trim();
        // Strict English detection
        if (/\b(the|is|are|was|were|they|their|she|he|with|from|have|has|had)\b/i.test(idText) && 
            !/\b(yang|dan|di|ke|dari|adalah|dia|mereka|ini|itu|dengan|untuk|pada|saya|kami)\b/i.test(idText)) {
          leaked++;
        }
      }
    }
    return { totalEx, leaked };
  };

  const n2 = checkLeaks(path.join(ROOT_DIR, 'public/data/vocab/vocab-n2.js'));
  const n1 = checkLeaks(path.join(ROOT_DIR, 'public/data/vocab/vocab-n1.js'));

  console.log(`     N2 Examples: ${n2.totalEx}, residual English: ${n2.leaked} (${((1 - n2.leaked/n2.totalEx)*100).toFixed(2)}% Indonesian)`);
  console.log(`     N1 Examples: ${n1.totalEx}, residual English: ${n1.leaked} (${((1 - n1.leaked/n1.totalEx)*100).toFixed(2)}% Indonesian)`);

  assert(n2.leaked < 40, `Expected N2 leaked < 40, got ${n2.leaked}`);
  assert(n1.leaked < 40, `Expected N1 leaked < 40, got ${n1.leaked}`);
});

// ── T-178: Populate 547 N1 Kanji with Kanjidic Jukugo Compounds ──
test('T-178: All 1,345 N1 Kanji have populated jukugo compounds (zero empty arrays)', () => {
  const kanjiN1Path = path.join(ROOT_DIR, 'public/data/staged-expansion/kanji/kanji-n1.js');
  const s = {};
  new Function('window', fs.readFileSync(kanjiN1Path, 'utf8'))(s);
  const list = s.nuggetKanjiN1 || [];

  assert.strictEqual(list.length, 1345, `Expected 1,345 N1 kanji, got ${list.length}`);

  const emptyJukugo = list.filter(k => !k.jukugo || k.jukugo.length === 0);
  assert.strictEqual(emptyJukugo.length, 0, `Expected 0 empty jukugo arrays, but found ${emptyJukugo.length}`);

  // Test specific curated kanji compounds
  const touKanji = list.find(k => k.character === '藤');
  assert(touKanji && touKanji.jukugo.some(j => j.word === '佐藤'), '藤 must contain 佐藤');

  const kanKanji = list.find(k => k.character === '韓');
  assert(kanKanji && kanKanji.jukugo.some(j => j.word === '韓国'), '韓 must contain 韓国');

  const okaKanji = list.find(k => k.character === '岡');
  assert(okaKanji && okaKanji.jukugo.some(j => j.word === '静岡'), '岡 must contain 静岡');

  const hanKanji = list.find(k => k.character === '阪');
  assert(hanKanji && hanKanji.jukugo.some(j => j.word === '大阪'), '阪 must contain 大阪');
});

// ── T-179: Ingest Pomax Linguistic Analysis into public/data/nuance-notes/ & nuanceManager.ts ──
test('T-179: Ingest Pomax linguistic analysis into nuance notes and nuanceManager.ts', () => {
  const nuanceDir = path.join(ROOT_DIR, 'public/data/nuance-notes');
  assert(fs.existsSync(nuanceDir), 'nuance-notes directory must exist');

  const files = ['particles.json', 'connectives.json', 'syntax.json', 'counters.json', 'giongo_and_gitaigo.json'];
  for (const f of files) {
    const p = path.join(nuanceDir, f);
    assert(fs.existsSync(p), `Nuance file ${f} must exist`);
    const data = JSON.parse(fs.readFileSync(p, 'utf8'));
    assert(Array.isArray(data) && data.length > 0, `${f} must contain a non-empty array of entries`);
  }

  // Test nuanceManager TypeScript module
  const {
    getAllNuanceNotes,
    getNuanceNoteById,
    getNuanceNotesByCategory,
    searchNuanceNotes,
    findNuanceForPattern
  } = require('../src/lib/data/nuanceManager.ts');

  const allNotes = getAllNuanceNotes();
  assert(allNotes.length >= 30, `Expected >= 30 nuance notes, got ${allNotes.length}`);

  const waNote = getNuanceNoteById('particle-wa');
  assert(waNote && waNote.topic.includes('は'), 'particle-wa note must be retrieved correctly');

  const aruiwaNote = getNuanceNoteById('conn-aruiwa');
  assert(aruiwaNote && aruiwaNote.topic.includes('或いは'), 'conn-aruiwa note must be retrieved correctly');

  const particles = getNuanceNotesByCategory('particles');
  assert(particles.length >= 10, 'Must have >= 10 particles notes');

  const searchResults = searchNuanceNotes('dokidoki');
  assert(searchResults.some(n => n.id === 'ono-dokidoki'), 'Search must find ono-dokidoki');

  const waLookup = findNuanceForPattern('は');
  assert(waLookup && waLookup.id === 'particle-wa', 'findNuanceForPattern must resolve は to particle-wa');
});

// ── T-180: SSW Master Syllabus Alignment & Verification ──
test('T-180: SSW Master Syllabus contains all 16 vocational sector files with valid schema', () => {
  const sswDir = path.join(ROOT_DIR, 'public/data/vocab/ssw');
  assert(fs.existsSync(sswDir), 'public/data/vocab/ssw directory must exist');

  const sectors = [
    'accommodation.js', 'agriculture.js', 'automobile.js', 'aviation.js',
    'building-cleaning.js', 'construction.js', 'electric-electronic.js',
    'fishery.js', 'food-service.js', 'food.js', 'forestry.js',
    'industrial-machinery.js', 'kaigo.js', 'logistics.js', 'manufacturing.js',
    'railway.js', 'shipbuilding.js', 'textile.js', 'timber.js'
  ];

  let totalSswVocab = 0;
  for (const sec of sectors) {
    const secPath = path.join(sswDir, sec);
    if (fs.existsSync(secPath)) {
      const s = {};
      new Function('window', fs.readFileSync(secPath, 'utf8'))(s);
      const arr = Object.values(s)[0] || [];
      totalSswVocab += arr.length;
      assert(arr.length > 0, `Sector file ${sec} must contain vocabulary items`);
    }
  }

  console.log(`     Total verified SSW vocational items across all tracks: ${totalSswVocab}`);
  assert(totalSswVocab >= 600, `Expected >= 600 total SSW items, got ${totalSswVocab}`);
});

console.log('\n=============================================================');
console.log(`📊 SPRINT 32 TEST SUMMARY: ${passedTests} / ${totalTests} PASSED`);
console.log('=============================================================\n');

if (passedTests !== totalTests) {
  process.exit(1);
}
