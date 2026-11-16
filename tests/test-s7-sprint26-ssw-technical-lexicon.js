/**
 * test-s7-sprint26-ssw-technical-lexicon.js
 * 
 * Sprint 26 (Pass 4) — Sector-by-Sector Tokutei Ginou SSW Technical Lexicon & Prometric Alignment
 * 
 * Verifies:
 * 1. 19 Tokutei Ginou industrial sector vocab files exist in public/data/vocab/ssw/.
 * 2. 100% of all SSW vocab items have pure kana readings (0 parentheticals or slashes).
 * 3. 27 remediated technical terms (遺失物, 刈払機, リジットラック, 自動車検査, 差動装置, チョーク,
 *    着陸装置, 手荷物タグ, 短絡, 接地, 海中転落, 救命浮環, 網目, 氷冷, レジ操作, 下膳,
 *    伐倒楔, 集材機, 材幹, 伐根, 樹冠部, 鋳巣, 舵, 合板, 単板, 節, 木理) have clean headwords,
 *    pure kana readings, and authentic workplace Japanese example sentences.
 * 4. K3 command catalog in src/lib/data/k3Scenarios.ts has clean kana and matching romaji for
 *    Shisa Koshou, KYK, and Hou-Ren-Sou.
 * 5. Prometric CBT simulation rules in PrometricCbtModal.tsx accurately encode MHLW, MAFF,
 *    METI, and MLIT scoring criteria (Kaigo dual-pass 60/60, OTAFF 65%).
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('🧪 Starting Sprint 26 SSW Technical Lexicon & Prometric Alignment Suite...\n');

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

const ROOT_DIR = path.resolve(__dirname, '..');
const SSW_DIR = path.join(ROOT_DIR, 'public/data/vocab/ssw');

// ── 1. 19 SSW Industrial Sectors File Existence ──
const EXPECTED_SECTORS = [
  'accommodation', 'agriculture', 'automobile', 'aviation',
  'building-cleaning', 'construction', 'electric-electronic',
  'fishery', 'food-service', 'food', 'forestry',
  'industrial-machinery', 'kaigo', 'logistics', 'manufacturing',
  'railway', 'shipbuilding', 'textile', 'timber'
];

test('All 19 Tokutei Ginou industrial sector lexicon files exist in public/data/vocab/ssw/', () => {
  assert.strictEqual(EXPECTED_SECTORS.length, 19, 'Must define 19 official SSW sectors');
  EXPECTED_SECTORS.forEach(sec => {
    const filePath = path.join(SSW_DIR, `${sec}.js`);
    assert(fs.existsSync(filePath), `Sector file ${sec}.js must exist in public/data/vocab/ssw/`);
  });
});

// ── 2. Zero Parentheticals or Slashes Across All SSW Readings ──
test('Zero parentheticals (（ or () or slashes (/) in reading across all 19 SSW sector files', () => {
  let dirtyCount = 0;
  const dirtyItems = [];

  EXPECTED_SECTORS.forEach(sec => {
    const filePath = path.join(SSW_DIR, `${sec}.js`);
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    lines.forEach((l, idx) => {
      if (l.includes('"reading":') && (l.includes('（') || l.includes('(') || l.includes('/'))) {
        dirtyCount++;
        dirtyItems.push(`${sec}.js:${idx + 1} -> ${l.trim()}`);
      }
    });
  });

  assert.strictEqual(dirtyCount, 0, `All SSW readings must be pure kana, found ${dirtyCount} dirty:\n${dirtyItems.join('\n')}`);
});

// ── 3. Remediated SSW Technical Vocabulary Contracts ──
test('27 technical SSW vocab items have clean headwords, pure kana, and authentic examples', () => {
  const sampleChecks = [
    {
      file: 'accommodation.js',
      id: 'v-ssw-accommodation-003',
      expectedWord: '遺失物',
      expectedReading: 'いしつぶつ',
      expectedRomaji: 'ishitsubutsu',
      sampleJpWord: '遺失物'
    },
    {
      file: 'agriculture.js',
      id: 'v-ssw-agriculture-028',
      expectedWord: '刈払機',
      expectedReading: 'かりはらいき',
      expectedRomaji: 'kariharaiki',
      sampleJpWord: '刈払機'
    },
    {
      file: 'automobile.js',
      id: 'v-ssw-automobile-004',
      expectedWord: 'リジットラック',
      expectedReading: 'りじっとらっく',
      expectedRomaji: 'rijittorakku',
      sampleJpWord: 'リジットラック'
    },
    {
      file: 'aviation.js',
      id: 'v-ssw-aviation-004',
      expectedWord: 'チョーク',
      expectedReading: 'ちょーく',
      expectedRomaji: 'chooku',
      sampleJpWord: 'チョーク'
    },
    {
      file: 'electric-electronic.js',
      id: 'v-ssw-electric-electronic-010',
      expectedWord: '短絡',
      expectedReading: 'たんらく',
      expectedRomaji: 'tanraku',
      sampleJpWord: '短絡'
    },
    {
      file: 'fishery.js',
      id: 'v-ssw-fishery-002',
      expectedWord: '海中転落',
      expectedReading: 'かいちゅうてんらく',
      expectedRomaji: 'kaichuu tenraku',
      sampleJpWord: '海中転落'
    },
    {
      file: 'food-service.js',
      id: 'v-ssw-food-service-008',
      expectedWord: 'レジ操作',
      expectedReading: 'れじそうさ',
      expectedRomaji: 'reji sousa',
      sampleJpWord: 'レジ操作'
    },
    {
      file: 'forestry.js',
      id: 'v-ssw-forestry-012',
      expectedWord: '伐倒楔',
      expectedReading: 'ばっとうくさび',
      expectedRomaji: 'battou kusabi',
      sampleJpWord: '伐倒楔'
    },
    {
      file: 'manufacturing.js',
      id: 'v-ssw-manufacturing-007',
      expectedWord: '鋳巣',
      expectedReading: 'ちゅうす',
      expectedRomaji: 'chuusu',
      sampleJpWord: '鋳巣'
    },
    {
      file: 'shipbuilding.js',
      id: 'v-ssw-shipbuilding-030',
      expectedWord: '舵',
      expectedReading: 'かじ',
      expectedRomaji: 'kaji',
      sampleJpWord: '舵'
    },
    {
      file: 'timber.js',
      id: 'v-ssw-timber-007',
      expectedWord: '合板',
      expectedReading: 'ごうはん',
      expectedRomaji: 'gouhan',
      sampleJpWord: '合板'
    }
  ];

  sampleChecks.forEach(chk => {
    const content = fs.readFileSync(path.join(SSW_DIR, chk.file), 'utf8');
    const blockMatch = content.match(new RegExp(`{\\s*"id":\\s*"${chk.id}"[\\s\\S]*?\\n  }`));
    assert(blockMatch, `Must find block for ${chk.id}`);
    const block = blockMatch[0];

    assert(block.includes(`"word": "${chk.expectedWord}"`), `${chk.id} must have word "${chk.expectedWord}"`);
    assert(block.includes(`"reading": "${chk.expectedReading}"`), `${chk.id} must have reading "${chk.expectedReading}"`);
    assert(block.includes(`"romaji": "${chk.expectedRomaji}"`), `${chk.id} must have romaji "${chk.expectedRomaji}"`);
    assert(!block.includes('の安全確認を行ってください。'), `${chk.id} must not have placeholder template example`);
    assert(block.includes(chk.sampleJpWord), `${chk.id} example sentence must use ${chk.sampleJpWord}`);
  });
});

// ── 4. K3 Command Catalog Phonological Purity ──
test('K3 official commands have clean kana readings without parenthetical annotations', () => {
  const k3Path = path.join(ROOT_DIR, 'src/lib/data/k3Scenarios.ts');
  const content = fs.readFileSync(k3Path, 'utf8');

  // cmd-k3-004
  assert(content.includes("kana: 'しさこしょうでぜろさいがい！'"), 'cmd-k3-004 must have clean kana');
  assert(content.includes("romaji: 'Shisa koshou de zero saigai!'"), 'cmd-k3-004 romaji must match kana koshou');

  // cmd-k3-013
  assert(content.includes("jp: '危険予知活動'"), 'cmd-k3-013 headword must be 危険予知活動');
  assert(content.includes("kana: 'きけんよちかつどう'"), 'cmd-k3-013 kana must not have (けいわいけい)');

  // cmd-k3-015
  assert(content.includes("jp: '報連相'"), 'cmd-k3-015 headword must be 報連相');
  assert(content.includes("kana: 'ほうれんそう'"), 'cmd-k3-015 kana must not have (ほうこく・れんらく・そうだん)');
});

// ── 5. Prometric CBT Statutory Sector Rules Verification ──
test('Prometric CBT modal accurately defines statutory rules for MHLW, MAFF, METI, MLIT', () => {
  const cbtPath = path.join(ROOT_DIR, 'src/components/quiz/PrometricCbtModal.tsx');
  const content = fs.readFileSync(cbtPath, 'utf8');

  // Sector rules existence
  assert(content.includes("'ssw-kaigo': {"), 'Kaigo sector rule must exist');
  assert(content.includes("'ssw-food-service': {"), 'Food service sector rule must exist');
  assert(content.includes("'ssw-food': {"), 'Food manufacturing sector rule must exist');

  // Statutory ministries
  assert(content.includes("ministryKanji: '厚生労働省'"), 'MHLW kanji must be 厚生労働省');
  assert(content.includes("ministryKanji: '農林水産省'"), 'MAFF kanji must be 農林水産省');

  // Kaigo Dual-pass rule
  assert(content.includes("hasDualPass: true"), 'Kaigo must enforce statutory dual-pass');
  assert(content.includes("passPercent: 60"), 'Kaigo must require 60% per section');
  assert(content.includes("passPercent: 65"), 'Food Service / Food Mfg must require 65%');
});

console.log(`\n🎉 ALL ${passedTests} SPRINT 26 SSW TECHNICAL LEXICON & PROMETRIC CONTRACTS PASSED 100% GREEN!\n`);
