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
console.log('[1/7] Validating Soumatome Grammar Lenses (N5, N2, N1)...');
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
console.log('\n[2/7] Validating Core Vocab Lenses (Minna, Irodori, Soumatome)...');
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
console.log('\n[3/7] Validating GENKI I & II Grammar and Vocab Lenses...');
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
console.log('\n[4/7] Validating Shin Kanzen Master (N3, N2, N1) Lenses...');
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
console.log('\n[5/7] Validating Tobira, QUARTET, TRY!, Marugoto Lenses...');
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
console.log('\n[6/7] Validating Master Sources Catalog (sources-staged.js)...');
const sourcesFile = 'books/sources-staged.js';
assert(fs.existsSync(path.join(STAGED_DIR, sourcesFile)), `File exists: ${sourcesFile}`);
const sourcesData = parseWindowVar(sourcesFile, 'nuggetSourcesStaged');
assert(sourcesData && sourcesData.books && sourcesData.books.length === 9, `sources-staged.js registers exactly 9 major book series (Found: ${sourcesData ? sourcesData.books.length : 0})`);
assert(sourcesData && sourcesData.legal_framework && sourcesData.legal_framework.doctrine, `sources-staged.js includes formal legal attribution & doctrine statement`);

// ── 7. VOCAB EXPANSION & ZERO ID COLLISIONS ────────────────────
console.log('\n[7/7] Validating Vocab Expansions (N5, N4, N3, N2, N1)...');
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

// ── SUMMARY REPORT ────────────────────────────────────────────
console.log('\n════════════════════════════════════════════════════════════');
console.log(` RESULTS: Total Tests: ${totalTests} | Passed: ${passedTests} | Failed: ${failedTests}`);
console.log('════════════════════════════════════════════════════════════\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('🎉 100% of all 9 book series and staged expansion content passed validation!');
  process.exit(0);
}
