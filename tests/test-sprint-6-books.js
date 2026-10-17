// ══════════════════════════════════════════════════════════════════
//  tests/test-sprint-6-books.js
//  SPRINT 6 VERIFICATION SUITE — AUTHENTIC TEXTBOOK DRILLS & EXERCISE BANKS
//  Empirically tests all 9 textbook series, 26 volume files, 308 sections,
//  chapter offset mechanics, and authentic drill schema integrity.
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
console.log('║   NUGGET NIHONGO — SPRINT 6 TEXTBOOK & DRILL BANK SUITE         ║');
console.log('╚══════════════════════════════════════════════════════════════════╝\n');

const ROOT = path.resolve(__dirname, '..');
const EX_DIR = path.join(ROOT, 'public/data/staged-expansion/exercises');

global.window = global;

// ── TEST 1: T-26 Catalog Audit of All 9 Textbook Series & 26 Volume Files ──
console.log('── TEST 1: T-26 Catalog Audit of All 9 Textbook Series & 26 Volume Files ──');

const expectedBooks = [
  {
    id: 'genki',
    title: 'GENKI',
    volumes: [
      { file: 'genki/exercises-genki-1.js', varName: 'exercisesGenki1', minSections: 12 },
      { file: 'genki/exercises-genki-2.js', varName: 'exercisesGenki2', minSections: 11 },
    ],
  },
  {
    id: 'minna',
    title: 'Minna no Nihongo',
    volumes: [
      { file: 'minna/exercises-minna-1.js', varName: 'exercisesMinna1', minSections: 25 },
      { file: 'minna/exercises-minna-2.js', varName: 'exercisesMinna2', minSections: 25 },
    ],
  },
  {
    id: 'quartet',
    title: 'QUARTET',
    volumes: [
      { file: 'quartet/exercises-quartet-1.js', varName: 'exercisesQuartet1', minSections: 6 },
      { file: 'quartet/exercises-quartet-2.js', varName: 'exercisesQuartet2', minSections: 6 },
    ],
  },
  {
    id: 'irodori',
    title: 'Irodori',
    volumes: [
      { file: 'irodori/exercises-ir-a1.js', varName: 'exercisesIrodoriA1', minSections: 18 },
      { file: 'irodori/exercises-ir-a2-1.js', varName: 'exercisesIrodoriA2_1', minSections: 18 },
      { file: 'irodori/exercises-ir-a2-2.js', varName: 'exercisesIrodoriA2_2', minSections: 18 },
    ],
  },
  {
    id: 'marugoto',
    title: 'Marugoto',
    volumes: [
      { file: 'marugoto/exercises-marugoto-a1.js', varName: 'exercisesMarugotoA1', minSections: 9 },
      { file: 'marugoto/exercises-marugoto-a2-1.js', varName: 'exercisesMarugotoA2_1', minSections: 9 },
      { file: 'marugoto/exercises-marugoto-a2-2.js', varName: 'exercisesMarugotoA2_2', minSections: 9 },
    ],
  },
  {
    id: 'shin-kanzen-master',
    title: 'Shin Kanzen Master',
    volumes: [
      { file: 'shin-kanzen-master/exercises-skm-n1.js', varName: 'exercisesSkmN1', minSections: 15 },
      { file: 'shin-kanzen-master/exercises-skm-n2.js', varName: 'exercisesSkmN2', minSections: 14 },
      { file: 'shin-kanzen-master/exercises-skm-n3.js', varName: 'exercisesSkmN3', minSections: 12 },
    ],
  },
  {
    id: 'soumatome',
    title: 'Nihongo Sou Matome',
    volumes: [
      { file: 'soumatome/exercises-sm-n1.js', varName: 'exercisesSoumatomeN1', minSections: 8 },
      { file: 'soumatome/exercises-sm-n2.js', varName: 'exercisesSoumatomeN2', minSections: 8 },
      { file: 'soumatome/exercises-sm-n3.js', varName: 'exercisesSoumatomeN3', minSections: 6 },
      { file: 'soumatome/exercises-sm-n4.js', varName: 'exercisesSoumatomeN4', minSections: 6 },
      { file: 'soumatome/exercises-sm-n5.js', varName: 'exercisesSoumatomeN5', minSections: 6 },
    ],
  },
  {
    id: 'tobira',
    title: 'Tobira',
    volumes: [
      { file: 'tobira/exercises-tobira.js', varName: 'exercisesTobira', minSections: 15 },
    ],
  },
  {
    id: 'try',
    title: 'TRY! JLPT',
    volumes: [
      { file: 'try/exercises-try-n1.js', varName: 'exercisesTryN1', minSections: 10 },
      { file: 'try/exercises-try-n2.js', varName: 'exercisesTryN2', minSections: 12 },
      { file: 'try/exercises-try-n3.js', varName: 'exercisesTryN3', minSections: 11 },
      { file: 'try/exercises-try-n4.js', varName: 'exercisesTryN4', minSections: 10 },
      { file: 'try/exercises-try-n5.js', varName: 'exercisesTryN5', minSections: 9 },
    ],
  },
];

let totalLoadedVolumes = 0;
let totalSectionsFound = 0;
let totalDrillsFound = 0;

expectedBooks.forEach(b => {
  b.volumes.forEach(v => {
    const filePath = path.join(EX_DIR, v.file);
    check(`Volume file exists on disk: ${v.file}`, () => {
      assert(fs.existsSync(filePath), `File not found: ${filePath}`);
    });

    eval(fs.readFileSync(filePath, 'utf8'));
    const bank = global[v.varName];

    check(`Volume ${v.file} exports ${v.varName} with valid metadata`, () => {
      assert(bank && typeof bank === 'object', `Export ${v.varName} is missing or not an object`);
      assert(bank.meta && bank.meta.title, `Missing meta.title in ${v.varName}`);
    });

    const sub = bank.chapters || bank.units || bank.lessons || bank.weeks || bank.topics;
    const secKeys = Object.keys(sub || {});

    check(`Volume ${v.file} contains >= ${v.minSections} sections (got ${secKeys.length})`, () => {
      assert(secKeys.length >= v.minSections, `Expected >= ${v.minSections} sections, got ${secKeys.length}`);
    });

    totalLoadedVolumes++;
    totalSectionsFound += secKeys.length;

    secKeys.forEach(k => {
      const s = sub[k];
      if (s.drills && Array.isArray(s.drills)) {
        totalDrillsFound += s.drills.length;
        s.drills.forEach(d => {
          assert(d.id && d.instruction && d.correct_answer && d.explanation, `Drill ${d.id} missing core fields`);
          const options = d.options || d.tokens || d.scrambled_tokens || d.assessment_criteria || d.confusing_pair;
          assert(Array.isArray(options) && options.length >= 2, `Drill ${d.id} must have >= 2 options`);
        });
      }
    });
  });
});

check(`Total textbook volumes loaded is 26 across 9 series`, () => {
  assert.strictEqual(totalLoadedVolumes, 26, `Expected 26 volume files, got ${totalLoadedVolumes}`);
});

check(`Total sections across all books is 308 with 970 authentic drills`, () => {
  assert.strictEqual(totalSectionsFound, 308, `Expected 308 sections, got ${totalSectionsFound}`);
  assert.strictEqual(totalDrillsFound, 970, `Expected 970 drills, got ${totalDrillsFound}`);
});

// ── TEST 2: T-27 Multi-Volume Chapter Offset & Collision Handling ──
console.log('\n── TEST 2: T-27 Multi-Volume Chapter Offset & Collision Handling ──');

// Minna no Nihongo Volume 2 must span chapters 26 to 50
const minna2 = global.exercisesMinna2.chapters;
check('Minna no Nihongo Shokyuu II keys span chapters 26 through 50', () => {
  assert(minna2['26'], 'Missing chapter 26 in Minna 2');
  assert(minna2['50'], 'Missing chapter 50 in Minna 2');
  assert(!minna2['1'], 'Chapter 1 should not exist in Minna 2 (belongs to Minna 1)');
});

// Genki Volume 2 must span chapters 13 to 23
const genki2 = global.exercisesGenki2.chapters;
check('Genki II keys span chapters 13 through 23', () => {
  assert(genki2['13'], 'Missing chapter 13 in Genki 2');
  assert(genki2['23'], 'Missing chapter 23 in Genki 2');
  assert(!genki2['1'], 'Chapter 1 should not exist in Genki 2 (belongs to Genki 1)');
});

// Quartet Volume 2 must span lessons 7 to 12
const quartet2 = global.exercisesQuartet2.lessons;
check('QUARTET II keys span lessons 7 through 12', () => {
  assert(quartet2['7'], 'Missing lesson 7 in Quartet 2');
  assert(quartet2['12'], 'Missing lesson 12 in Quartet 2');
  assert(!quartet2['1'], 'Lesson 1 should not exist in Quartet 2 (belongs to Quartet 1)');
});

// ── TEST 3: T-28 Quartet Intermediate 4-Skills Mechanics ──
console.log('\n── TEST 3: T-28 Quartet Intermediate 4-Skills Mechanics ──');

const q1Drills = global.exercisesQuartet1.lessons['1'].drills;
check('QUARTET Lesson 1 incorporates 4skills_speaking_roleplay mechanic', () => {
  const speakingDrill = q1Drills.find(d => d.mechanic === '4skills_speaking_roleplay');
  assert(speakingDrill, 'Missing 4skills_speaking_roleplay drill');
  assert(speakingDrill.dialogue_scenario && speakingDrill.dialogue_scenario.length > 10, 'Missing dialogue_scenario');
  assert(speakingDrill.explanation.includes('QUARTET') || speakingDrill.explanation.includes('komunikasi'), 'Missing pedagogical explanation');
});

// ── TEST 4: T-29 Try! N5–N1 Can-Do Challenge Pairing ──
console.log('\n── TEST 4: T-29 Try! N5–N1 Can-Do Challenge Pairing ──');

['n5', 'n4', 'n3', 'n2', 'n1'].forEach(lvl => {
  const varName = `exercisesTry${lvl.toUpperCase()}`;
  const bank = global[varName];
  check(`TRY! ${lvl.toUpperCase()} (${varName}) has cando_check_cloze drills`, () => {
    assert(bank && bank.chapters, `Missing chapters in ${varName}`);
    const ch1 = bank.chapters['1'];
    assert(ch1 && Array.isArray(ch1.drills) && ch1.drills.length >= 2, `Chapter 1 must have drills`);
    const candoDrill = ch1.drills.find(d => d.mechanic === 'cando_check_cloze');
    assert(candoDrill, `Missing cando_check_cloze drill in ${varName}`);
  });
});

// ── SUMMARY ──
console.log('\n══════════════════════════════════════════════════════════════════');
console.log(` SPRINT 6 TEXTBOOK & DRILL SUITE: ${passedChecks} / ${totalChecks} CHECKS PASSED`);
console.log('══════════════════════════════════════════════════════════════════\n');

if (process.exitCode) {
  console.error('❌ SPRINT 6 TEXTBOOK VERIFICATION FAILED');
  process.exit(1);
} else {
  console.log('🎉 SPRINT 6 TEXTBOOK & DRILL BANK SUITE 100% VERIFIED!\n');
}
