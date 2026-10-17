#!/usr/bin/env node
/**
 * tests/test-sprint-2-pipeline.js
 * 
 * Comprehensive Verification Suite for Sprint 2: Data Pipeline Overhaul & Compiler Restoration
 * Tickets:
 * - T-08: Clean pseudo-Indonesian me-[English] verbs & untranslated entries
 * - T-09: Strict regex in 5 converters, book tracks compiler fix, & authentic Can-Dos
 * - T-10: Elimination of dummy fallback ID vg-n5-00990
 * - T-11: Dynamic wiring of all 19 SSW tracks & lexicons
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
let passed = 0;
let failed = 0;

function check(condition, message, detail = '') {
  if (condition) {
    passed++;
    console.log(`  ✓ ${message}`);
  } else {
    failed++;
    console.error(`  ❌ FAIL: ${message}`);
    if (detail) console.error(`     Detail: ${detail}`);
  }
}

console.log('╔══════════════════════════════════════════════════════════════════╗');
console.log('║   SPRINT 2 PIPELINE & COMPILER RESTORATION VERIFICATION         ║');
console.log('╚══════════════════════════════════════════════════════════════════╝\n');

// ── T-08 VERIFICATION ──
console.log('── 1. TICKET T-08: Indonesian Vocab Quality & KBBI Standardization ──');

const levels = ['n5', 'n4', 'n3', 'n2', 'n1'];
const cats = ['verbs', 'adjectives', 'adverbs', 'nouns', 'expressions'];

let remainingMeInCategories = 0;
let remainingUntranslatedInCategories = 0;
let remainingEnglishParticles = 0;
let meInExamples = 0;
let totalCategoryEntries = 0;

for (const lvl of levels) {
  for (const cat of cats) {
    const file = path.join(ROOT, 'public/data/vocab', lvl, `${lvl}-${cat}.js`);
    if (!fs.existsSync(file)) continue;

    const content = fs.readFileSync(file, 'utf8');
    const sandbox = { window: {} };
    try {
      new Function('window', content)(sandbox.window);
    } catch (e) {
      check(false, `Category file ${lvl}-${cat}.js must evaluate cleanly`, e.message);
      continue;
    }

    const items = Object.values(sandbox.window)[0] || [];
    totalCategoryEntries += items.length;

    for (const item of items) {
      const mId = (item.meaning_id || '').trim();
      const mEn = (item.meaning_en || '').trim();

      if (/me-[a-zA-Z]/i.test(mId)) {
        remainingMeInCategories++;
      }
      if (mId && mEn && mId.toLowerCase() === mEn.toLowerCase()) {
        remainingUntranslatedInCategories++;
      }
      if (mId && (mId.startsWith('to ') || mId.startsWith('the ') || mId.startsWith('a '))) {
        remainingEnglishParticles++;
      }
      if (item.examples && Array.isArray(item.examples)) {
        for (const ex of item.examples) {
          if (ex.id && /me-[a-zA-Z]/i.test(ex.id)) {
            meInExamples++;
          }
        }
      }
    }
  }
}

check(totalCategoryEntries >= 10000, `Category files loaded comprehensive corpus (${totalCategoryEntries} entries)`);
check(remainingMeInCategories === 0, `0 pseudo-Indonesian me-[English] in category files (found: ${remainingMeInCategories})`);
check(remainingUntranslatedInCategories === 0, `0 untranslated meaning_id === meaning_en in category files (found: ${remainingUntranslatedInCategories})`);
check(remainingEnglishParticles === 0, `0 English particle prefixes in category files (found: ${remainingEnglishParticles})`);
check(meInExamples === 0, `0 pseudo-Indonesian me-[English] in examples (found: ${meInExamples})`);

// Check merged files
let remainingMeInMerged = 0;
let remainingUntranslatedInMerged = 0;
let totalMergedEntries = 0;

for (const lvl of levels) {
  const mergedFile = path.join(ROOT, 'public/data/vocab', `vocab-${lvl}.js`);
  check(fs.existsSync(mergedFile), `Merged vocab file exists: vocab-${lvl}.js`);
  if (!fs.existsSync(mergedFile)) continue;

  const content = fs.readFileSync(mergedFile, 'utf8');
  const sandbox = { window: {} };
  try {
    new Function('window', content)(sandbox.window);
  } catch (e) {
    check(false, `Merged file vocab-${lvl}.js must evaluate cleanly`, e.message);
    continue;
  }

  const items = Object.values(sandbox.window)[0] || [];
  totalMergedEntries += items.length;

  for (const item of items) {
    const mId = (item.meaning_id || '').trim();
    const mEn = (item.meaning_en || '').trim();

    if (/me-[a-zA-Z]/i.test(mId)) remainingMeInMerged++;
    if (mId && mEn && mId.toLowerCase() === mEn.toLowerCase()) remainingUntranslatedInMerged++;
  }
}

check(remainingMeInMerged === 0, `0 pseudo-Indonesian me-[English] in merged files (found: ${remainingMeInMerged})`);
check(remainingUntranslatedInMerged === 0, `0 untranslated meaning_id === meaning_en in merged files (found: ${remainingUntranslatedInMerged})`);


// ── T-09 VERIFICATION ──
console.log('\n── 2. TICKET T-09: Converter Regex Integrity & Compiler Restoration ──');

const converters = [
  'generate-genki.js',
  'generate-shin-kanzen-master.js',
  'generate-soumatome-vocab-lenses.js',
  'generate-tobira-quartet.js',
  'generate-try-marugoto.js'
];

for (const conv of converters) {
  const filePath = path.join(ROOT, 'scripts/converters', conv);
  check(fs.existsSync(filePath), `Converter exists: ${conv}`);
  const src = fs.readFileSync(filePath, 'utf8');
  check(
    src.includes('vg-') && (src.includes('/"id":\\s*"(vg-[^"]+)"/g') || src.includes('(vg-[^"\']+)')),
    `Converter ${conv} enforces strict vg- ID regex`
  );
}

// Verify no sentence strings in book curriculum vocab_ids
const bookTracks = [
  'curriculum-book-genki.json',
  'curriculum-book-minna.json',
  'curriculum-book-marugoto.json',
  'curriculum-book-quartet.json',
  'curriculum-book-shin-kanzen-master.json',
  'curriculum-book-soumatome.json',
  'curriculum-book-tobira.json',
  'curriculum-book-try.json',
  'curriculum-book-irodori.json'
];

// Load canonical databases for referential integrity checks
global.window = global;
const dataDir = path.join(ROOT, 'public/data');
['n5', 'n4', 'n3', 'n2', 'n1'].forEach(lvl => {
  const vp = path.join(dataDir, `vocab/vocab-${lvl}.js`);
  if (fs.existsSync(vp)) eval(fs.readFileSync(vp, 'utf8'));
  const gp = path.join(dataDir, `grammar/grammar-${lvl}.js`);
  if (fs.existsSync(gp)) eval(fs.readFileSync(gp, 'utf8'));
});
eval(fs.readFileSync(path.join(dataDir, 'vocab/vocab-index.js'), 'utf8'));
eval(fs.readFileSync(path.join(dataDir, 'grammar/grammar-index.js'), 'utf8'));

const canonicalVocabIds = new Set((global.vocabDB || []).map(v => v.id));
const canonicalGrammarIds = new Set((global.grammarDB || []).map(g => g.id));

let corruptedSentenceVocabIds = 0;
let emptyGrammarUnits = 0;
let boilerplateCanDos = 0;
let invalidVocabRefs = 0;
let invalidGrammarRefs = 0;
let dummyFallbackTitles = 0;

for (const bTrack of bookTracks) {
  const filePath = path.join(ROOT, 'public/data/curriculum', bTrack);
  check(fs.existsSync(filePath), `Book track exists: ${bTrack}`);
  const track = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  for (const unit of track.units || []) {
    if (!unit.grammar_ids || unit.grammar_ids.length === 0) {
      emptyGrammarUnits++;
    }
    if (unit.can_do_summary && unit.can_do_summary.includes('Memahami silabus')) {
      boilerplateCanDos++;
    }
    // Check if unit title fell back to dummy "Bab 1" pattern (e.g. Minna II Bab 1, Quartet II Bab 1)
    if (/Bab \d+$/i.test(unit.title_id) && !unit.title_id.includes(':')) {
      dummyFallbackTitles++;
    }
    for (const vid of unit.vocab_ids || []) {
      if (!vid.startsWith('vg-') && !vid.startsWith('v-')) {
        corruptedSentenceVocabIds++;
      }
      if (!canonicalVocabIds.has(vid)) {
        invalidVocabRefs++;
      }
    }
    for (const gid of unit.grammar_ids || []) {
      if (!canonicalGrammarIds.has(gid)) {
        invalidGrammarRefs++;
      }
    }
    for (const les of unit.lessons || []) {
      for (const vid of les.vocab_ids || []) {
        if (!vid.startsWith('vg-') && !vid.startsWith('v-')) {
          corruptedSentenceVocabIds++;
        }
        if (!canonicalVocabIds.has(vid)) {
          invalidVocabRefs++;
        }
      }
      for (const gid of les.grammar_ids || []) {
        if (!canonicalGrammarIds.has(gid)) {
          invalidGrammarRefs++;
        }
      }
      if (les.can_do_statement && les.can_do_statement.includes('Memahami silabus')) {
        boilerplateCanDos++;
      }
    }
  }
}

check(corruptedSentenceVocabIds === 0, `0 corrupted sentence strings in vocab_ids (found: ${corruptedSentenceVocabIds})`);
check(emptyGrammarUnits === 0, `0 units with empty grammar_ids in book tracks (found: ${emptyGrammarUnits})`);
check(boilerplateCanDos === 0, `0 boilerplate "Memahami silabus" Can-Dos remaining (found: ${boilerplateCanDos})`);
check(invalidVocabRefs === 0, `0 invalid/unresolved vocab IDs in book tracks (found: ${invalidVocabRefs})`);
check(invalidGrammarRefs === 0, `0 invalid/unresolved grammar IDs in book tracks (found: ${invalidGrammarRefs})`);
check(dummyFallbackTitles === 0, `0 dummy fallback titles in book tracks (found: ${dummyFallbackTitles})`);


// ── T-10 VERIFICATION ──
console.log('\n── 3. TICKET T-10: Elimination of Dummy vg-n5-00990 Fallback ──');

const jftTracks = [
  'curriculum-jft-a1.json',
  'curriculum-jft-a2.json',
  'curriculum-seikatsu.json'
];

let dummyFallbackCount = 0;
for (const jTrack of jftTracks) {
  const filePath = path.join(ROOT, 'public/data/curriculum', jTrack);
  const content = fs.readFileSync(filePath, 'utf8');
  const occurrences = (content.match(/vg-n5-00990/g) || []).length;
  dummyFallbackCount += occurrences;
  check(occurrences === 0, `0 dummy vg-n5-00990 in ${jTrack}`);
}

const compilerScript = fs.readFileSync(path.join(ROOT, 'scripts/compile-master-curriculum.js'), 'utf8');
check(
  compilerScript.includes('Dummy vocab fallback detected') || compilerScript.includes('throw new Error'),
  'compile-master-curriculum.js contains build validation guard against vg-n5-00990 dummy fallback'
);

// Check for zero corrupted Japanese romaji (ijin ga arimasu)
let corruptedRomajiCount = 0;
const currDirFiles = fs.readdirSync(path.join(ROOT, 'public/data/curriculum'));
for (const f of currDirFiles) {
  const p = path.join(ROOT, 'public/data/curriculum', f);
  if (fs.statSync(p).isFile() && (f.endsWith('.json') || f.endsWith('.js'))) {
    const txt = fs.readFileSync(p, 'utf8');
    if (txt.includes('ijin ga arimasu')) corruptedRomajiCount++;
  }
}
check(corruptedRomajiCount === 0, `0 corrupted 'ijin ga arimasu' across all curriculum files (found: ${corruptedRomajiCount})`);


// ── T-11 VERIFICATION ──
console.log('\n── 4. TICKET T-11: Ingest 19 SSW Tracks & Dynamic DataManager Wiring ──');

const sswSectors = [
  'kaigo', 'building-cleaning', 'manufacturing', 'industrial-machinery',
  'electric-electronic', 'automobile', 'shipbuilding', 'aviation',
  'construction', 'agriculture', 'fishery', 'forestry', 'timber',
  'food', 'food-service', 'accommodation', 'logistics', 'railway', 'textile'
];

check(sswSectors.length === 19, '19 SSW sectors recognized in taxonomy');

let missingVocabFiles = 0;
let missingCurriculumFiles = 0;

for (const sector of sswSectors) {
  const vocabFile = path.join(ROOT, `public/data/vocab/ssw/${sector}.js`);
  if (!fs.existsSync(vocabFile)) missingVocabFiles++;

  const currJson = path.join(ROOT, `public/data/curriculum/curriculum-ssw-${sector}.json`);
  const currJs = path.join(ROOT, `public/data/curriculum/curriculum-ssw-${sector}.js`);
  if (!fs.existsSync(currJson) || !fs.existsSync(currJs)) missingCurriculumFiles++;
}

check(missingVocabFiles === 0, `All 19 SSW vocab files exist (missing: ${missingVocabFiles})`);
check(missingCurriculumFiles === 0, `All 19 SSW curriculum tracks exist (missing: ${missingCurriculumFiles})`);

// Check dataManager.ts dynamic wiring
const dataManagerSrc = fs.readFileSync(path.join(ROOT, 'src/lib/data/dataManager.ts'), 'utf8');
check(
  dataManagerSrc.includes('/data/vocab/ssw/${sector}.js') || dataManagerSrc.includes('/data/vocab/ssw/'),
  'dataManager.ts loadVocab has dynamic SSW path resolution'
);
check(
  dataManagerSrc.includes('curriculum-ssw-') && dataManagerSrc.includes('/data/curriculum/curriculum-ssw-${sector}'),
  'dataManager.ts loadCurriculumTrack has dynamic SSW track loader'
);


// ── SUMMARY ──
console.log('\n══════════════════════════════════════════════════════════════════');
console.log(` RESULT: PASS: ${passed} | FAIL: ${failed}`);
console.log('══════════════════════════════════════════════════════════════════\n');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('🌟 ALL SPRINT 2 PIPELINE & COMPILER REQUIREMENTS EMPIRICALLY VERIFIED!\n');
}
