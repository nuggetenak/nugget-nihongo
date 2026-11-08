// ══════════════════════════════════════════════════════════════════
//  test-s5-pass10-ssw-lexicon.js — Siklus V Pass 10 Forensic Suite
//  SSW 19-Sector Gemba Lexicon, Workplace Slices & Prometric Matrix
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
console.log('🧪 SIKLUS V PASS 10: SSW 19-SECTOR GEMBA LEXICON & MATRIX');
console.log('=============================================================\n');

const ROOT_DIR = path.resolve(__dirname, '..');

function loadFileSandbox(filePath, varName) {
  const content = fs.readFileSync(filePath, 'utf8');
  const sandbox = {};
  new Function('window', content)(sandbox);
  return sandbox[varName] || [];
}

const OFFICIAL_19_SECTORS = [
  'accommodation', 'agriculture', 'automobile', 'aviation', 'building-cleaning',
  'construction', 'electric-electronic', 'fishery', 'food-service', 'food',
  'forestry', 'industrial-machinery', 'kaigo', 'logistics', 'manufacturing',
  'railway', 'shipbuilding', 'textile', 'timber'
];

const CANONICAL_ALIASES = [
  { alias: 'hospitality', target: 'accommodation' },
  { alias: 'crop-farming', target: 'agriculture' },
  { alias: 'livestock', target: 'agriculture' },
  { alias: 'restaurant', target: 'food-service' },
  { alias: 'food-manufacturing', target: 'food' },
  { alias: 'sokeizai', target: 'manufacturing' },
  { alias: 'automobile-transport', target: 'logistics' },
  { alias: 'electrical-electronics', target: 'electric-electronic' }
];

// ── T-1: 19 Official SSW Dictionaries Scale & Operational Nuance ──────────────
test('T-1: All 19 official SSW vocational files exist and aggregate 622 entries with rich nuance and SOP examples', () => {
  const sswDir = path.join(ROOT_DIR, 'public', 'data', 'vocab', 'ssw');
  assert(fs.existsSync(sswDir), 'SSW directory must exist');

  let grandTotal = 0;
  for (const sector of OFFICIAL_19_SECTORS) {
    const p = path.join(sswDir, `${sector}.js`);
    assert(fs.existsSync(p), `SSW vocab file ${sector}.js must exist`);
    const pascal = sector.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
    const entries = loadFileSandbox(p, `vocabSSW_${pascal}`);
    assert(Array.isArray(entries) && entries.length > 0, `Sector ${sector} must contain valid entries`);
    grandTotal += entries.length;

    for (const item of entries) {
      assert(item.id && typeof item.id === 'string', `Entry ${item.id} must have id`);
      assert(item.word && typeof item.word === 'string', `Entry ${item.id} must have word`);
      assert(item.reading && typeof item.reading === 'string', `Entry ${item.id} must have reading`);
      const meaning = item.meaning || item.meaning_id;
      assert(meaning && typeof meaning === 'string' && meaning.trim().length > 0, `Entry ${item.id} must have meaning`);
      assert(item.nuance && typeof item.nuance === 'string' && item.nuance.length > 5, `Entry ${item.id} must have operational workplace nuance`);
      assert(Array.isArray(item.examples) && item.examples.length > 0, `Entry ${item.id} must have authentic workplace examples`);
      assert(item.examples[0].jp && item.examples[0].id, `Entry ${item.id} example must have jp and id`);
    }
  }

  assert.strictEqual(grandTotal, 622, 'Total SSW vocabulary must equal 622 specialized entries');
});

// ── T-2: All 19 SSW Curriculum Specifications (.js and .json) ─────────────────
test('T-2: All 19 SSW sectors have authoritative JS and JSON curriculum tracks (38 files)', () => {
  const currDir = path.join(ROOT_DIR, 'public', 'data', 'curriculum');
  assert(fs.existsSync(currDir), 'Curriculum directory must exist');

  for (const sector of OFFICIAL_19_SECTORS) {
    const jsPath = path.join(currDir, `curriculum-ssw-${sector}.js`);
    const jsonPath = path.join(currDir, `curriculum-ssw-${sector}.json`);
    assert(fs.existsSync(jsPath), `Curriculum JS file must exist for ${sector}`);
    assert(fs.existsSync(jsonPath), `Curriculum JSON file must exist for ${sector}`);

    const rawJson = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    assert(rawJson.meta, `Track ${sector} must have meta`);
    assert(rawJson.meta.total_units > 0 || (rawJson.units && rawJson.units.length > 0), `Track ${sector} must have units`);
    assert(Array.isArray(rawJson.units) && rawJson.units.length > 0, `Track ${sector} units array must not be empty`);

    // Verify first unit has lessons and can-do statements
    const firstUnit = rawJson.units[0];
    assert(firstUnit.title_id && firstUnit.title_jp, `Unit must have bilingual titles`);
    assert(Array.isArray(firstUnit.lessons) && firstUnit.lessons.length > 0, `Unit must contain lessons`);
    assert(firstUnit.lessons[0].can_do_statement, `Lesson must have can-do statement`);
  }
});

// ── T-3: dataManager.ts Dynamic SSW Loading & Alias Symmetric Routing ─────────
test('T-3: dataManager.ts loadVocab resolves all 19 sectors AND all 8 canonical aliases without 404', () => {
  const dmPath = path.join(ROOT_DIR, 'src/lib/data/dataManager.ts');
  const dmContent = fs.readFileSync(dmPath, 'utf8');

  // Verify SSW_SECTOR_ALIAS_MAP definition
  assert(dmContent.includes('const SSW_SECTOR_ALIAS_MAP: Record<string, string>'), 'Must define SSW_SECTOR_ALIAS_MAP in loadVocab');
  for (const { alias, target } of CANONICAL_ALIASES) {
    assert(dmContent.includes(`'${alias}': '${target}'`) || dmContent.includes(`${alias}: '${target}'`), `Must map alias ${alias} to ${target}`);
  }

  // Simulation test of loadVocab resolution algorithm
  const SSW_SECTOR_ALIAS_MAP = {
    hospitality: 'accommodation',
    'crop-farming': 'agriculture',
    livestock: 'agriculture',
    restaurant: 'food-service',
    'food-manufacturing': 'food',
    sokeizai: 'manufacturing',
    'automobile-transport': 'logistics',
    'electrical-electronics': 'electric-electronic',
  };

  function simulateResolveVocabSrc(level) {
    const isSSW = level.startsWith('ssw-') || level.startsWith('curriculum-ssw-');
    if (!isSSW) return null;
    const rawSector = level.replace(/^curriculum-/, '').replace(/^ssw-/, '');
    const sector = SSW_SECTOR_ALIAS_MAP[rawSector] || rawSector;
    const pascalSector = sector.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
    return {
      src: `/data/vocab/ssw/${sector}.js`,
      varName: `vocabSSW_${pascalSector}`,
    };
  }

  // Verify all 19 official sectors
  for (const sector of OFFICIAL_19_SECTORS) {
    const res = simulateResolveVocabSrc(`ssw-${sector}`);
    assert(res !== null, `Must resolve ssw-${sector}`);
    const filePath = path.join(ROOT_DIR, 'public', res.src);
    assert(fs.existsSync(filePath), `Resolved path must exist on disk: ${filePath}`);
    const content = fs.readFileSync(filePath, 'utf8');
    assert(content.includes(res.varName), `File must declare ${res.varName}`);
  }

  // Verify all 8 aliases
  for (const { alias, target } of CANONICAL_ALIASES) {
    const res = simulateResolveVocabSrc(`ssw-${alias}`);
    assert(res !== null, `Must resolve alias ssw-${alias}`);
    assert(res.src.includes(`${target}.js`), `Alias ${alias} must resolve to ${target}.js`);
    const filePath = path.join(ROOT_DIR, 'public', res.src);
    assert(fs.existsSync(filePath), `Resolved alias path must exist: ${filePath}`);
  }
});

// ── T-4: Kaigo Gemba Pedagogical Framework & Ethical Anti-Baby-Talk Invariants ─
test('T-4: Kaigo gemba lessons embody Koe-kake SOP, dignity protection, and anti-baby-talk taboos', () => {
  const kaigoLessonPath = path.join(ROOT_DIR, 'src/lib/curriculum/lessons/ssw/kaigo.ts');
  assert(fs.existsSync(kaigoLessonPath), 'Kaigo lesson file must exist');
  const kaigoContent = fs.readFileSync(kaigoLessonPath, 'utf8');

  // Verify Koe-kake SOP
  assert(kaigoContent.includes('Protokol Koe-kake'), 'Must instruct Koe-kake protocol');
  assert(kaigoContent.includes('〜てもよろしいですか'), 'Must teach permission pattern');

  // Verify anti-infantilization cultural taboos
  assert(kaigoContent.includes('Pantangan "Baby Talk"'), 'Must teach anti-baby-talk cultural note');
  assert(kaigoContent.includes('infantilization'), 'Must warn against infantilization');
  assert(kaigoContent.includes('山田様、おはようございます'), 'Must prescribe respectful family name + sama solution');
  assert(kaigoContent.includes('Dilarang keras langsung membuka tirai jendela'), 'Must teach physical privacy taboo');
});

// ── T-5: CurriculumTrackBrowser SSW 4-Cluster Filtering & Ministry Badges ─────
test('T-5: CurriculumTrackBrowser SSW 4-cluster filtering (care, mfg, infra, service) and ministerial standards', () => {
  const browserPath = path.join(ROOT_DIR, 'src/components/materi/CurriculumTrackBrowser.tsx');
  const browserContent = fs.readFileSync(browserPath, 'utf8');

  // Verify 4 SSW clusters
  assert(browserContent.includes("cluster: 'care'"), 'Must support care cluster (Kaigo, Cleaning)');
  assert(browserContent.includes("cluster: 'mfg'"), 'Must support mfg cluster (Machinery, Shipbuilding, Automobile, etc.)');
  assert(browserContent.includes("cluster: 'infra'"), 'Must support infra cluster (Construction)');
  assert(browserContent.includes("cluster: 'service'"), 'Must support service cluster (Food, Hospitality, etc.)');

  // Verify ministerial authority badges
  assert(browserContent.includes("ministry: 'MHLW'"), 'Must feature MHLW for Kaigo');
  assert(browserContent.includes("ministry: 'MLIT'"), 'Must feature MLIT for Construction, Transport, Cleaning');
  assert(browserContent.includes("ministry: 'METI'"), 'Must feature METI for Manufacturing, Electronics');
  assert(browserContent.includes("ministry: 'MAFF'"), 'Must feature MAFF for Agriculture, Fishery, Food');

  // Verify responsive touch targets on track pills
  assert(browserContent.includes('min-h-[40px]'), 'Category and track pills must maintain min-h-[40px]');
  assert(browserContent.includes('active:scale-95'), 'Interactive elements must feature active tactile feedback');
});

console.log(`\nResults: ${passedTests}/${totalTests} tests passed.\n`);
if (passedTests !== totalTests) {
  process.exit(1);
} else {
  console.log('🎉 ALL SIKLUS V PASS 10 TESTS PASSED PERFECTION!\n');
  process.exit(0);
}
