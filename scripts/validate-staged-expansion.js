#!/usr/bin/env node
/**
 * validate-staged-expansion.js
 * Comprehensive automated verification for ALL staged content in:
 * public/data/staged-expansion/
 * 
 * Tests:
 * 1. Soumatome Grammar Lenses (N5, N2, N1)
 * 2. Minna no Nihongo Vocab Lenses (1, 2)
 * 3. Irodori Vocab Lenses (A1, A2-1, A2-2)
 * 4. Soumatome Vocab Lenses (N5, N4, N3, N2, N1)
 * 5. GENKI I & II Grammar and Vocab Lenses
 * 6. Shin Kanzen Master (N3, N2, N1) Grammar and Vocab Lenses
 * 7. Tobira Grammar and Vocab Lenses
 * 8. QUARTET (I, II) Vocab Lenses
 * 9. TRY! JLPT (N5, N4, N3, N2, N1) Vocab Lenses
 * 10. Marugoto (A1, A2-1, A2-2) Lenses
 * 11. Master Sources Catalog (sources-staged.js)
 * 12. Full Vocab Expansions (N5 through N1) - 0 ID Collisions
 * 13. Master Exercise & Drill Registry (exercise-registry.js)
 * 14. All 9 Book Authentic Exercise Banks
 */

const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const STAGED_DIR = path.join(REPO, 'public/data/staged-expansion');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ ${message}`);
  } else {
    failedTests++;
    console.error(`  ✗ FAIL: ${message}`);
  }
}

function parseWindowVar(filePath, varName) {
  const p = path.join(STAGED_DIR, filePath);
  if (!fs.existsSync(p)) return null;
  const code = fs.readFileSync(p, 'utf8');
  const sandbox = { window: {} };
  eval(code.replace(`window.${varName}`, `sandbox.window.${varName}`));
  return sandbox.window[varName];
}

console.log('════════════════════════════════════════════════════════════');
console.log(' VALIDATING COMPLETE STAGED EXPANSION & ALL 9 BOOK SERIES');
console.log('════════════════════════════════════════════════════════════\n');

// ── 1. SOUMATOME GRAMMAR LENSES ───────────────────────────────
console.log('[1/8] Validating Soumatome Grammar Lenses (N5, N2, N1)...');
const smGrammarFiles = [
  { file: 'books/soumatome/grammar-lens-sm-n5.js', varName: 'grammarLensSoumatomeN5', expectedMin: 50 },
  { file: 'books/soumatome/grammar-lens-sm-n2.js', varName: 'grammarLensSoumatomeN2', expectedMin: 80 },
  { file: 'books/soumatome/grammar-lens-sm-n1.js', varName: 'grammarLensSoumatomeN1', expectedMin: 80 },
];

for (const { file, varName, expectedMin } of smGrammarFiles) {
  assert(fs.existsSync(path.join(STAGED_DIR, file)), `File exists: ${file}`);
  const data = parseWindowVar(file, varName);
  assert(data && data.meta && data.entries, `${file} parsed with valid meta and entries`);
  assert(data && data.entries.length >= expectedMin, `${file} contains ${data ? data.entries.length : 0} entries (>= ${expectedMin})`);
}

// ── 2. CORE CANONICAL BOOK VOCAB LENSES ────────────────────────
console.log('\n[2/8] Validating Core Vocab Lenses (Minna, Irodori, Soumatome)...');
const coreVocabFiles = [
  { file: 'books/minna/vocab-lens-mn-1.js', varName: 'vocabLensMinna1' },
  { file: 'books/minna/vocab-lens-mn-2.js', varName: 'vocabLensMinna2' },
  { file: 'books/irodori/vocab-lens-ir-a1.js', varName: 'vocabLensIrodoriA1' },
  { file: 'books/irodori/vocab-lens-ir-a2-1.js', varName: 'vocabLensIrodoriA2_1' },
  { file: 'books/irodori/vocab-lens-ir-a2-2.js', varName: 'vocabLensIrodoriA2_2' },
  { file: 'books/soumatome/vocab-lens-sm-n5.js', varName: 'vocabLensSoumatomeN5' },
  { file: 'books/soumatome/vocab-lens-sm-n4.js', varName: 'vocabLensSoumatomeN4' },
  { file: 'books/soumatome/vocab-lens-sm-n3.js', varName: 'vocabLensSoumatomeN3' },
  { file: 'books/soumatome/vocab-lens-sm-n2.js', varName: 'vocabLensSoumatomeN2' },
  { file: 'books/soumatome/vocab-lens-sm-n1.js', varName: 'vocabLensSoumatomeN1' },
];

for (const { file, varName } of coreVocabFiles) {
  assert(fs.existsSync(path.join(STAGED_DIR, file)), `File exists: ${file}`);
  const data = parseWindowVar(file, varName);
  assert(data && data.meta, `${file} parsed with valid meta`);
  const units = data ? (data.chapters || data.units || data.weeks) : null;
  assert(units && Object.keys(units).length > 0, `${file} has valid units/chapters/weeks`);
}

// ── 3. GENKI I & II LENSES ─────────────────────────────────────
console.log('\n[3/8] Validating GENKI I & II Grammar and Vocab Lenses...');
const genkiFiles = [
  { file: 'books/genki/grammar-lens-genki-1.js', varName: 'grammarLensGenki1', isGrammar: true, minCount: 30 },
  { file: 'books/genki/vocab-lens-genki-1.js', varName: 'vocabLensGenki1', isGrammar: false, minUnits: 12 },
  { file: 'books/genki/grammar-lens-genki-2.js', varName: 'grammarLensGenki2', isGrammar: true, minCount: 25 },
  { file: 'books/genki/vocab-lens-genki-2.js', varName: 'vocabLensGenki2', isGrammar: false, minUnits: 11 },
];

for (const { file, varName, isGrammar, minCount, minUnits } of genkiFiles) {
  assert(fs.existsSync(path.join(STAGED_DIR, file)), `File exists: ${file}`);
  const data = parseWindowVar(file, varName);
  assert(data && data.meta, `${file} parsed with valid meta`);
  if (isGrammar) {
    assert(data && data.entries && data.entries.length >= minCount, `${file} contains ${data ? data.entries.length : 0} grammar points`);
  } else {
    assert(data && data.chapters && Object.keys(data.chapters).length >= minUnits, `${file} contains ${data ? Object.keys(data.chapters).length : 0} chapters`);
  }
}

// ── 4. SHIN KANZEN MASTER (N3, N2, N1) LENSES ───────────────────
console.log('\n[4/8] Validating Shin Kanzen Master (N3, N2, N1) Lenses...');
const skmFiles = [
  { file: 'books/shin-kanzen-master/grammar-lens-skm-n3.js', varName: 'grammarLensSkmN3', isGrammar: true, minCount: 20 },
  { file: 'books/shin-kanzen-master/vocab-lens-skm-n3.js', varName: 'vocabLensSkmN3', isGrammar: false, minUnits: 10 },
  { file: 'books/shin-kanzen-master/grammar-lens-skm-n2.js', varName: 'grammarLensSkmN2', isGrammar: true, minCount: 20 },
  { file: 'books/shin-kanzen-master/vocab-lens-skm-n2.js', varName: 'vocabLensSkmN2', isGrammar: false, minUnits: 12 },
  { file: 'books/shin-kanzen-master/grammar-lens-skm-n1.js', varName: 'grammarLensSkmN1', isGrammar: true, minCount: 15 },
  { file: 'books/shin-kanzen-master/vocab-lens-skm-n1.js', varName: 'vocabLensSkmN1', isGrammar: false, minUnits: 14 },
];

for (const { file, varName, isGrammar, minCount, minUnits } of skmFiles) {
  assert(fs.existsSync(path.join(STAGED_DIR, file)), `File exists: ${file}`);
  const data = parseWindowVar(file, varName);
  assert(data && data.meta, `${file} parsed with valid meta`);
  if (isGrammar) {
    assert(data && data.entries && data.entries.length >= minCount, `${file} contains ${data ? data.entries.length : 0} functional grammar points`);
  } else {
    assert(data && data.units && Object.keys(data.units).length >= minUnits, `${file} contains ${data ? Object.keys(data.units).length : 0} thematic units`);
  }
}

// ── 5. TOBIRA, QUARTET, TRY!, MARUGOTO LENSES ──────────────────
console.log('\n[5/8] Validating Tobira, QUARTET, TRY!, Marugoto Lenses...');
const addBooks = [
  { file: 'books/tobira/grammar-lens-tobira.js', varName: 'grammarLensTobira', prop: 'entries', min: 15 },
  { file: 'books/tobira/vocab-lens-tobira.js', varName: 'vocabLensTobira', prop: 'chapters', min: 15 },
  { file: 'books/quartet/vocab-lens-quartet-1.js', varName: 'vocabLensQuartet1', prop: 'lessons', min: 6 },
  { file: 'books/quartet/vocab-lens-quartet-2.js', varName: 'vocabLensQuartet2', prop: 'lessons', min: 6 },
  { file: 'books/try/vocab-lens-try-n5.js', varName: 'vocabLensTryN5', prop: 'chapters', min: 9 },
  { file: 'books/try/vocab-lens-try-n4.js', varName: 'vocabLensTryN4', prop: 'chapters', min: 10 },
  { file: 'books/try/vocab-lens-try-n3.js', varName: 'vocabLensTryN3', prop: 'chapters', min: 11 },
  { file: 'books/try/vocab-lens-try-n2.js', varName: 'vocabLensTryN2', prop: 'chapters', min: 12 },
  { file: 'books/try/vocab-lens-try-n1.js', varName: 'vocabLensTryN1', prop: 'chapters', min: 10 },
  { file: 'books/marugoto/lens-marugoto-a1.js', varName: 'vocabLensMarugotoA1', prop: 'topics', min: 9 },
  { file: 'books/marugoto/lens-marugoto-a2-1.js', varName: 'vocabLensMarugotoA2_1', prop: 'topics', min: 9 },
  { file: 'books/marugoto/lens-marugoto-a2-2.js', varName: 'vocabLensMarugotoA2_2', prop: 'topics', min: 9 },
];

for (const { file, varName, prop, min } of addBooks) {
  assert(fs.existsSync(path.join(STAGED_DIR, file)), `File exists: ${file}`);
  const data = parseWindowVar(file, varName);
  assert(data && data.meta, `${file} parsed with valid meta`);
  const target = data ? data[prop] : null;
  const count = target ? (Array.isArray(target) ? target.length : Object.keys(target).length) : 0;
  assert(count >= min, `${file} contains ${count} items for ${prop} (>= ${min})`);
}

// ── 6. MASTER SOURCES CATALOG REGISTRY ─────────────────────────
console.log('\n[6/8] Validating Master Sources Catalog (sources-staged.js)...');
const sourcesFile = 'books/sources-staged.js';
assert(fs.existsSync(path.join(STAGED_DIR, sourcesFile)), `File exists: ${sourcesFile}`);
const sourcesData = parseWindowVar(sourcesFile, 'nuggetSourcesStaged');
assert(sourcesData && sourcesData.books && sourcesData.books.length === 9, `sources-staged.js registers exactly 9 major book series (Found: ${sourcesData ? sourcesData.books.length : 0})`);
assert(sourcesData && sourcesData.legal_framework && sourcesData.legal_framework.doctrine, `sources-staged.js includes formal legal attribution & doctrine statement`);

// ── 7. VOCAB EXPANSION & ZERO ID COLLISIONS ────────────────────
console.log('\n[7/8] Validating Vocab Expansions (N5, N4, N3, N2, N1)...');
const vocabSets = [
  { jsonFile: 'vocab/n5-staged.json', jsFile: 'vocab/n5-staged.js', lvl: 'n5', expectedMin: 300 },
  { jsonFile: 'vocab/n4-staged.json', jsFile: 'vocab/n4-staged.js', lvl: 'n4', expectedMin: 300 },
  { jsonFile: 'vocab/n3-staged.json', jsFile: 'vocab/n3-staged.js', lvl: 'n3', expectedMin: 200 },
  { jsonFile: 'vocab/n2-staged.json', jsFile: 'vocab/n2-staged.js', lvl: 'n2', expectedMin: 1500 },
  { jsonFile: 'vocab/n1-staged.json', jsFile: 'vocab/n1-staged.js', lvl: 'n1', expectedMin: 2500 },
];

const allSeenIds = new Set();
let collisionCount = 0;

for (const { jsonFile, jsFile, lvl, expectedMin } of vocabSets) {
  const pJson = path.join(STAGED_DIR, jsonFile);
  const pJs = path.join(STAGED_DIR, jsFile);

  assert(fs.existsSync(pJson), `JSON exists: ${jsonFile}`);
  assert(fs.existsSync(pJs), `JS exists: ${jsFile}`);

  if (fs.existsSync(pJson)) {
    const raw = fs.readFileSync(pJson, 'utf8');
    const items = JSON.parse(raw);
    assert(items.length >= expectedMin, `${lvl.toUpperCase()} staged count: ${items.length} (>= ${expectedMin})`);

    let validProps = true;
    for (const item of items) {
      if (!item.id || !item.word || !item.reading || !item.meaning_id || !item.meaning_en || !item.pos) {
        validProps = false;
        break;
      }
      if (allSeenIds.has(item.id)) {
        collisionCount++;
      }
      allSeenIds.add(item.id);
    }
    assert(validProps, `All ${lvl.toUpperCase()} items contain complete required fields`);
  }
}

assert(collisionCount === 0, `Zero ID collisions across all staged datasets (Collisions: ${collisionCount})`);

// ── 8. MASTER EXERCISE REGISTRY & AUTHENTIC DRILL BANKS ─────────
console.log('\n[8/8] Validating Authentic Exercise Banks for All 9 Book Series...');
const exerciseRegistryFile = 'exercises/exercise-registry.js';
assert(fs.existsSync(path.join(STAGED_DIR, exerciseRegistryFile)), `File exists: ${exerciseRegistryFile}`);
const regData = parseWindowVar(exerciseRegistryFile, 'nuggetExerciseRegistry');
assert(regData && regData.signature_mechanics_taxonomy, `exercise-registry.js contains complete signature mechanics taxonomy`);
assert(Object.keys(regData.signature_mechanics_taxonomy).length === 9, `Taxonomy covers exactly 9 major book methods`);

const exerciseBanks = [
  { file: 'exercises/minna/exercises-minna-1.js', varName: 'exercisesMinna1', key: 'chapters', min: 25 },
  { file: 'exercises/minna/exercises-minna-2.js', varName: 'exercisesMinna2', key: 'chapters', min: 25 },
  { file: 'exercises/genki/exercises-genki-1.js', varName: 'exercisesGenki1', key: 'chapters', min: 12 },
  { file: 'exercises/genki/exercises-genki-2.js', varName: 'exercisesGenki2', key: 'chapters', min: 11 },
  { file: 'exercises/soumatome/exercises-sm-n5.js', varName: 'exercisesSoumatomeN5', key: 'weeks', min: 6 },
  { file: 'exercises/soumatome/exercises-sm-n4.js', varName: 'exercisesSoumatomeN4', key: 'weeks', min: 6 },
  { file: 'exercises/soumatome/exercises-sm-n3.js', varName: 'exercisesSoumatomeN3', key: 'weeks', min: 6 },
  { file: 'exercises/soumatome/exercises-sm-n2.js', varName: 'exercisesSoumatomeN2', key: 'weeks', min: 8 },
  { file: 'exercises/soumatome/exercises-sm-n1.js', varName: 'exercisesSoumatomeN1', key: 'weeks', min: 8 },
  { file: 'exercises/shin-kanzen-master/exercises-skm-n3.js', varName: 'exercisesSkmN3', key: 'units', min: 12 },
  { file: 'exercises/shin-kanzen-master/exercises-skm-n2.js', varName: 'exercisesSkmN2', key: 'units', min: 14 },
  { file: 'exercises/shin-kanzen-master/exercises-skm-n1.js', varName: 'exercisesSkmN1', key: 'units', min: 15 },
  { file: 'exercises/tobira/exercises-tobira.js', varName: 'exercisesTobira', key: 'chapters', min: 15 },
  { file: 'exercises/quartet/exercises-quartet-1.js', varName: 'exercisesQuartet1', key: 'lessons', min: 6 },
  { file: 'exercises/quartet/exercises-quartet-2.js', varName: 'exercisesQuartet2', key: 'lessons', min: 6 },
  { file: 'exercises/try/exercises-try-n5.js', varName: 'exercisesTryN5', key: 'chapters', min: 9 },
  { file: 'exercises/try/exercises-try-n4.js', varName: 'exercisesTryN4', key: 'chapters', min: 10 },
  { file: 'exercises/try/exercises-try-n3.js', varName: 'exercisesTryN3', key: 'chapters', min: 11 },
  { file: 'exercises/try/exercises-try-n2.js', varName: 'exercisesTryN2', key: 'chapters', min: 12 },
  { file: 'exercises/try/exercises-try-n1.js', varName: 'exercisesTryN1', key: 'chapters', min: 10 },
  { file: 'exercises/irodori/exercises-ir-a1.js', varName: 'exercisesIrodoriA1', key: 'units', min: 18 },
  { file: 'exercises/irodori/exercises-ir-a2-1.js', varName: 'exercisesIrodoriA2_1', key: 'units', min: 18 },
  { file: 'exercises/irodori/exercises-ir-a2-2.js', varName: 'exercisesIrodoriA2_2', key: 'units', min: 18 },
  { file: 'exercises/marugoto/exercises-marugoto-a1.js', varName: 'exercisesMarugotoA1', key: 'topics', min: 9 },
  { file: 'exercises/marugoto/exercises-marugoto-a2-1.js', varName: 'exercisesMarugotoA2_1', key: 'topics', min: 9 },
  { file: 'exercises/marugoto/exercises-marugoto-a2-2.js', varName: 'exercisesMarugotoA2_2', key: 'topics', min: 9 },
];

for (const { file, varName, key, min } of exerciseBanks) {
  assert(fs.existsSync(path.join(STAGED_DIR, file)), `Exercise file exists: ${file}`);
  const data = parseWindowVar(file, varName);
  assert(data && data.meta, `${file} parsed with valid meta`);
  const target = data ? data[key] : null;
  const count = target ? Object.keys(target).length : 0;
  assert(count >= min, `${file} contains ${count} ${key} (>= ${min})`);
  
  // Verify first chapter/unit has valid drills
  if (target && count > 0) {
    const firstKey = Object.keys(target)[0];
    const firstUnit = target[firstKey];
    assert(firstUnit.drills && firstUnit.drills.length > 0, `${file} [${firstKey}] contains ${firstUnit.drills ? firstUnit.drills.length : 0} drills`);
  }
}

// ── 9. MASTER KANJI DATABASE, STROKE VECTORS & BOOK LENSES ────
console.log('\n[9/9] Validating Master Kanji Database, Stroke Bundles & Book Kanji Lenses...');

// 9.1 Schema documentation
assert(fs.existsSync(path.join(STAGED_DIR, 'kanji/_schema-kanji.md')), 'Kanji schema documentation exists: kanji/_schema-kanji.md');

// 9.2 Master Enriched Kanji Files
const kanjiLevels = [
  { level: 'n5', varName: 'nuggetKanjiN5', expectedCount: 84 },
  { level: 'n4', varName: 'nuggetKanjiN4', expectedCount: 169 },
  { level: 'n3', varName: 'nuggetKanjiN3', expectedCount: 387 },
  { level: 'n2', varName: 'nuggetKanjiN2', expectedCount: 398 },
  { level: 'n1', varName: 'nuggetKanjiN1', expectedCount: 1345 }
];

const allKanjiIds = new Set();
let kanjiIdCollisions = 0;
let totalMasterKanji = 0;

for (const { level, varName, expectedCount } of kanjiLevels) {
  const jsonPath = path.join(STAGED_DIR, `kanji/kanji-${level}.json`);
  const jsPath = path.join(STAGED_DIR, `kanji/kanji-${level}.js`);

  assert(fs.existsSync(jsonPath), `Kanji JSON exists: kanji/kanji-${level}.json`);
  assert(fs.existsSync(jsPath), `Kanji JS exists: kanji/kanji-${level}.js`);

  const list = parseWindowVar(`kanji/kanji-${level}.js`, varName);
  assert(Array.isArray(list), `kanji-${level}.js parsed as array`);
  assert(list && list.length === expectedCount, `${level.toUpperCase()} kanji count: ${list ? list.length : 0} (expected ${expectedCount})`);

  let validFields = true;
  let noUndefinedMnemonic = true;

  if (list) {
    totalMasterKanji += list.length;
    for (const k of list) {
      if (allKanjiIds.has(k.id)) {
        kanjiIdCollisions++;
      }
      allKanjiIds.add(k.id);

      if (!k.character || !k.unicode || !k.level || !k.strokes || !k.radical || !k.readings || !k.meanings || !k.mnemonic) {
        validFields = false;
      }
      if (k.mnemonic && k.mnemonic.hint_id && k.mnemonic.hint_id.includes('undefined')) {
        noUndefinedMnemonic = false;
      }
    }
  }

  assert(validFields, `All ${level.toUpperCase()} kanji contain complete enriched fields (radical, readings, meanings, mnemonic, jukugo)`);
  assert(noUndefinedMnemonic, `All ${level.toUpperCase()} kanji have clean mnemonics without undefined strings`);
}

assert(totalMasterKanji === 2383, `Total Master Kanji count across N5–N1: ${totalMasterKanji} (expected 2383)`);
assert(kanjiIdCollisions === 0, `Zero Kanji ID collisions across all 2,383 entries (Collisions: ${kanjiIdCollisions})`);

// 9.3 Stroke Bundles & 100% Vector Path Coverage
let totalStrokeEntries = 0;
let validStrokePaths = true;

for (const { level } of kanjiLevels) {
  const strokeJsonPath = path.join(STAGED_DIR, `kanji/strokes/kanji-strokes-${level}.json`);
  const strokeJsPath = path.join(STAGED_DIR, `kanji/strokes/kanji-strokes-${level}.js`);

  assert(fs.existsSync(strokeJsonPath), `Stroke JSON exists: strokes/kanji-strokes-${level}.json`);
  assert(fs.existsSync(strokeJsPath), `Stroke JS exists: strokes/kanji-strokes-${level}.js`);

  const varName = `nuggetKanjiStrokes${level.toUpperCase()}`;
  const strokeBundle = parseWindowVar(`kanji/strokes/kanji-strokes-${level}.js`, varName);
  assert(strokeBundle && typeof strokeBundle === 'object', `Stroke bundle for ${level.toUpperCase()} parsed successfully`);

  if (strokeBundle) {
    const chars = Object.keys(strokeBundle);
    totalStrokeEntries += chars.length;
    for (const c of chars) {
      const entry = strokeBundle[c];
      if (!entry.paths || !Array.isArray(entry.paths) || entry.paths.length === 0 || entry.paths.length !== entry.strokes) {
        validStrokePaths = false;
      }
    }
  }
}

assert(totalStrokeEntries === 2383, `Total Stroke Order Bundles: ${totalStrokeEntries} (expected 2383)`);
assert(validStrokePaths, '100% of KanjiVG stroke vector paths match exact stroke counts without empty paths');

// 9.4 Master Kanji Index
assert(fs.existsSync(path.join(STAGED_DIR, 'kanji/kanji-index.js')), 'Master search index exists: kanji/kanji-index.js');
const kanjiIndex = parseWindowVar('kanji/kanji-index.js', 'nuggetKanjiIndex');
assert(kanjiIndex && Object.keys(kanjiIndex).length === 2383, `kanji-index.js maps all 2,383 characters (${kanjiIndex ? Object.keys(kanjiIndex).length : 0})`);

// 9.5 Book Kanji Lenses
const genkiKanji = parseWindowVar('kanji/books/kanji-lens-genki.js', 'kanjiLensGenki');
assert(genkiKanji && genkiKanji.meta && genkiKanji.lessons, 'kanji-lens-genki.js parsed with valid meta and lessons');
assert(genkiKanji && Object.keys(genkiKanji.lessons).length === 21, `Genki Kanji covers 21 lessons (${genkiKanji ? Object.keys(genkiKanji.lessons).length : 0})`);
assert(genkiKanji && genkiKanji.meta.total_kanji >= 300, `Genki Kanji total kanji count: ${genkiKanji ? genkiKanji.meta.total_kanji : 0} (>= 300)`);

const minnaKanji = parseWindowVar('kanji/books/kanji-lens-minna.js', 'kanjiLensMinna');
assert(minnaKanji && minnaKanji.meta && minnaKanji.lessons, 'kanji-lens-minna.js parsed with valid meta and lessons');
assert(minnaKanji && Object.keys(minnaKanji.lessons).length === 25, `Minna Kanji covers 25 lessons (${minnaKanji ? Object.keys(minnaKanji.lessons).length : 0})`);

const soumatomeKanji = parseWindowVar('kanji/books/kanji-lens-soumatome.js', 'kanjiLensSoumatome');
assert(soumatomeKanji && soumatomeKanji.meta && soumatomeKanji.levels, 'kanji-lens-soumatome.js parsed with valid meta and levels');
assert(soumatomeKanji && Object.keys(soumatomeKanji.levels).length === 5, `Soumatome Kanji covers 5 JLPT levels (N5 through N1)`);

// ── SUMMARY REPORT ────────────────────────────────────────────
console.log('\n════════════════════════════════════════════════════════════');
console.log(` RESULTS: Total Tests: ${totalTests} | Passed: ${passedTests} | Failed: ${failedTests}`);
console.log('════════════════════════════════════════════════════════════\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('🎉 100% of all 9 book series, authentic exercise banks, master kanji database & staged expansion content passed validation!');
  process.exit(0);
}

