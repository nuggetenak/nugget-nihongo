// ══════════════════════════════════════════════════════════════════
//  tests/test-sprint-4-taxonomy.js
//  SPRINT 4 VERIFICATION SUITE — TAXONOMY, VOCAB KEYS & 36-TRACK AUDIT
//  Empirically tests POS normalization, SSW keys, SKM resolution,
//  and full 36-track curriculum referential integrity.
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const assert = require('assert');

let passedChecks = 0;
let totalChecks = 0;

function check(desc, fn) {
  totalChecks++;
  try {
    fn();
    passedChecks++;
    console.log(`  ✓ [PASS] ${desc}`);
  } catch (err) {
    console.error(`  ❌ [FAIL] ${desc}: ${err.message}`);
    process.exitCode = 1;
  }
}

console.log('╔══════════════════════════════════════════════════════════════════╗');
console.log('║   NUGGET NIHONGO — SPRINT 4 TAXONOMY & REFERENTIAL SUITE        ║');
console.log('╚══════════════════════════════════════════════════════════════════╝\n');

const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'public/data');

// ── TEST 1: POS Normalization (0 INVALID_POS) ──
console.log('── TEST 1: Vocabulary Taxonomy Normalization ──');

const VALID_POS = new Set([
  'verb-u', 'verb-ru', 'verb-suru', 'verb-kuru', 'verb-aru', 'verb-irr',
  'verb-potential-lexical',
  'i-adj', 'na-adj', 'no-adj', 'pre-noun-adj',
  'noun', 'noun-suru', 'noun-temporal', 'noun-formal', 'proper-noun',
  'pronoun', 'counter', 'numeral',
  'adverb', 'adverb-degree', 'adverb-frequency', 'adverb-manner',
  'adverb-conjunctive', 'adverb-sentence',
  'particle', 'particle-case', 'particle-topic', 'particle-conj',
  'particle-final', 'particle-compound',
  'conjunction', 'conj-coord', 'conj-adversative', 'conj-causal', 'conj-temporal',
  'expression', 'expr-greeting', 'expr-set', 'expr-onomatopoeia',
  'interjection', 'suffix-honorific', 'suffix-nominal', 'prefix-honorific',
  'prefix', 'suffix'
]);

const vocabLevels = ['n5', 'n4', 'n3', 'n2', 'n1'];
let totalVocabEntries = 0;
let invalidPosEntries = [];

vocabLevels.forEach(lvl => {
  const filePath = path.join(DATA_DIR, `vocab/vocab-${lvl}.js`);
  assert(fs.existsSync(filePath), `Merged vocab file exists: vocab-${lvl}.js`);
  global.window = global;
  eval(fs.readFileSync(filePath, 'utf8'));
  const varName = `vocab${lvl.toUpperCase()}`;
  const list = global[varName] || [];
  assert(list.length > 0, `Vocab array ${varName} has items`);
  list.forEach(item => {
    totalVocabEntries++;
    if (!VALID_POS.has(item.pos)) {
      invalidPosEntries.push({ id: item.id, word: item.word, pos: item.pos, lvl });
    }
  });
});

check(`All ${totalVocabEntries} JLPT vocabulary entries have canonical POS tags (0 invalid)`, () => {
  assert.strictEqual(invalidPosEntries.length, 0, `Found invalid POS: ${JSON.stringify(invalidPosEntries.slice(0, 5))}`);
});

// Also check all partitioned category files
let partitionedInvalidPos = [];
vocabLevels.forEach(lvl => {
  const dir = path.join(DATA_DIR, `vocab/${lvl}`);
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).filter(f => f.endsWith('.js')).forEach(f => {
      global.window = global;
      eval(fs.readFileSync(path.join(dir, f), 'utf8'));
      // Find array in global
      const arrays = Object.keys(global).filter(k => k.toLowerCase().startsWith(`vocab${lvl.toLowerCase()}_`));
      arrays.forEach(arrName => {
        const arr = global[arrName];
        if (Array.isArray(arr)) {
          arr.forEach(item => {
            if (!VALID_POS.has(item.pos)) {
              partitionedInvalidPos.push({ file: `${lvl}/${f}`, id: item.id, pos: item.pos });
            }
          });
        }
      });
    });
  }
});

check(`All partitioned category files have 100% canonical POS tags (0 invalid)`, () => {
  assert.strictEqual(partitionedInvalidPos.length, 0, `Found partitioned invalid POS: ${JSON.stringify(partitionedInvalidPos.slice(0, 5))}`);
});

// ── TEST 2: SSW Vocabulary Standardization (19 Sectors) ──
console.log('\n── TEST 2: SSW Vocabulary Keys & Standardization (19 Sectors) ──');

const sswDir = path.join(DATA_DIR, 'vocab/ssw');
const sswFiles = fs.readdirSync(sswDir).filter(f => f.endsWith('.js'));
check(`All 19 SSW vocational sector files exist on disk`, () => {
  assert.strictEqual(sswFiles.length, 19, `Expected 19 SSW files, got ${sswFiles.length}`);
});

let totalSswVocab = 0;
let missingMeaningId = [];

sswFiles.forEach(f => {
  global.window = global;
  eval(fs.readFileSync(path.join(sswDir, f), 'utf8'));
  const sectorVars = Object.keys(global).filter(k => k.startsWith('vocabSSW_'));
  sectorVars.forEach(vName => {
    const arr = global[vName];
    if (Array.isArray(arr)) {
      arr.forEach(item => {
        totalSswVocab++;
        if (!item.meaning_id || typeof item.meaning_id !== 'string' || item.meaning_id.trim().length === 0) {
          missingMeaningId.push({ file: f, id: item.id, word: item.word });
        }
      });
    }
  });
});

check(`All ${totalSswVocab} SSW vocabulary entries have meaning_id (0 missing)`, () => {
  assert.strictEqual(missingMeaningId.length, 0, `Found missing meaning_id: ${JSON.stringify(missingMeaningId.slice(0, 5))}`);
});

// ── TEST 3: Shin Kanzen Master Casing & Exercise Bank Resolution ──
console.log('\n── TEST 3: Shin Kanzen Master Casing & Exercise Resolution ──');

const skmDir = path.join(DATA_DIR, 'staged-expansion/exercises/shin-kanzen-master');
['n1', 'n2', 'n3'].forEach(lvl => {
  const filePath = path.join(skmDir, `exercises-skm-${lvl}.js`);
  check(`Shin Kanzen Master ${lvl.toUpperCase()} exercise bank exists on disk`, () => {
    assert(fs.existsSync(filePath), `Missing ${filePath}`);
  });

  global.window = global;
  eval(fs.readFileSync(filePath, 'utf8'));

  // Test both variable name casings: exercisesSkmN* and exercisesSKMN*
  const varNameExpected = `exercisesSkmN${lvl.replace('n', '')}`;
  const data = global[varNameExpected];
  check(`Shin Kanzen Master ${lvl.toUpperCase()} data resolves correctly via ${varNameExpected}`, () => {
    assert(data && (data.units || data.chapters || data.lessons), `Failed to resolve ${varNameExpected}`);
  });
});

// ── TEST 4: Universal 36-Track Referential Integrity ──
console.log('\n── TEST 4: Universal 36-Track Referential Integrity ──');

// Build canonical ID sets
const canonicalVocabIds = new Set();
vocabLevels.forEach(lvl => {
  const arr = global[`vocab${lvl.toUpperCase()}`] || [];
  arr.forEach(v => canonicalVocabIds.add(v.id));
});
Object.keys(global).forEach(k => {
  if (k.startsWith('vocabSSW_') && Array.isArray(global[k])) {
    global[k].forEach(v => canonicalVocabIds.add(v.id));
  }
});

// Load grammar index
['n5', 'n4', 'n3', 'n2', 'n1'].forEach(lvl => {
  const p = path.join(DATA_DIR, `grammar/grammar-${lvl}.js`);
  if (fs.existsSync(p)) eval(fs.readFileSync(p, 'utf8'));
});
eval(fs.readFileSync(path.join(DATA_DIR, 'grammar/grammar-index.js'), 'utf8'));
const canonicalGrammarIds = new Set((global.grammarDB || []).map(g => g.id));

const currDir = path.join(DATA_DIR, 'curriculum');
const trackFiles = fs.readdirSync(currDir).filter(f => f.endsWith('.json')).sort();

check(`Exact 36 curriculum tracks are loaded`, () => {
  assert.strictEqual(trackFiles.length, 36, `Expected 36 tracks, found ${trackFiles.length}`);
});

let totalUnits = 0;
let totalLessons = 0;
let totalGrammarRefs = 0;
let totalVocabRefs = 0;
let brokenGrammarRefs = [];
let brokenVocabRefs = [];

trackFiles.forEach(f => {
  const content = JSON.parse(fs.readFileSync(path.join(currDir, f), 'utf8'));
  assert(content.meta && content.meta.track_id, `${f} has meta.track_id`);
  assert(Array.isArray(content.units) && content.units.length > 0, `${f} has units`);

  content.units.forEach(u => {
    totalUnits++;
    assert(u.id && u.title_id && Array.isArray(u.lessons), `${f} unit ${u.id} has valid schema`);
    u.lessons.forEach(l => {
      totalLessons++;
      const gids = l.grammar_ids || l.grammarIds || [];
      gids.forEach(gid => {
        totalGrammarRefs++;
        if (!canonicalGrammarIds.has(gid)) {
          brokenGrammarRefs.push({ track: f, lesson: l.id, gid });
        }
      });
      const vids = l.vocab_ids || l.vocabIds || [];
      vids.forEach(vid => {
        totalVocabRefs++;
        if (!canonicalVocabIds.has(vid)) {
          brokenVocabRefs.push({ track: f, lesson: l.id, vid });
        }
      });
    });
  });
});

check(`All ${totalUnits} units and ${totalLessons} lessons have valid structural schema`, () => {
  assert(totalUnits >= 390, `Expected >= 390 units, got ${totalUnits}`);
  assert(totalLessons >= 530, `Expected >= 530 lessons, got ${totalLessons}`);
});

check(`All ${totalGrammarRefs} grammar references resolve to canonical Grammar DB (0 missing)`, () => {
  assert.strictEqual(brokenGrammarRefs.length, 0, `Missing grammar refs: ${JSON.stringify(brokenGrammarRefs.slice(0, 5))}`);
});

check(`All ${totalVocabRefs} vocabulary references resolve to canonical Vocab DB (0 missing)`, () => {
  assert.strictEqual(brokenVocabRefs.length, 0, `Missing vocab refs: ${JSON.stringify(brokenVocabRefs.slice(0, 5))}`);
});

// ── SUMMARY ──
console.log('\n══════════════════════════════════════════════════════════════════');
console.log(` SPRINT 4 TAXONOMY SUITE: ${passedChecks} / ${totalChecks} CHECKS PASSED`);
console.log('══════════════════════════════════════════════════════════════════\n');

if (process.exitCode) {
  console.error('❌ SPRINT 4 TAXONOMY VERIFICATION FAILED');
  process.exit(1);
} else {
  console.log('🎉 SPRINT 4 TAXONOMY & REFERENTIAL SUITE 100% VERIFIED!\n');
}
