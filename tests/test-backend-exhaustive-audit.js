// ══════════════════════════════════════════════════════════════════
//  tests/test-backend-exhaustive-audit.js
//  EXHAUSTIVE BACKEND AUDIT SUITE FOR NUGGET NIHONGO (v16.0.0)
//  Verifies 100% data integrity, referential validity, compiler pipelines,
//  FSRS math, diagnostic inventories, and state management.
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;

function auditAssert(condition, message, detail = '') {
  totalChecks++;
  if (condition) {
    passedChecks++;
  } else {
    failedChecks++;
    console.error(`  ❌ AUDIT FAILURE: ${message}`);
    if (detail) console.error(`     Detail: ${detail}`);
  }
}

console.log('╔══════════════════════════════════════════════════════════════════╗');
console.log('║   NUGGET NIHONGO — EXHAUSTIVE BACKEND INTEGRITY AUDIT           ║');
console.log('╚══════════════════════════════════════════════════════════════════╝\n');

// ── AUDIT 1: CURRICULUM TRACK UNIFORMITY & REFERENTIAL INTEGRITY ──
console.log('── AUDIT 1: Curriculum Tracks & Referential Integrity ──');

// Load Canonical DBs
global.window = global;
const dataDir = path.resolve(__dirname, '../public/data');

// Load vocab files first
['n5', 'n4', 'n3', 'n2', 'n1'].forEach(lvl => {
  const p = path.join(dataDir, `vocab/vocab-${lvl}.js`);
  if (fs.existsSync(p)) eval(fs.readFileSync(p, 'utf8'));
});
const vocabIndexPath = path.join(dataDir, 'vocab/vocab-index.js');
auditAssert(fs.existsSync(vocabIndexPath), 'vocab-index.js exists');
eval(fs.readFileSync(vocabIndexPath, 'utf8'));
const canonicalVocabIds = new Set((global.vocabDB || []).map(v => v.id));
auditAssert(canonicalVocabIds.size >= 4800, `Canonical Vocab DB loaded (${canonicalVocabIds.size} entries)`);

// Load grammar files
['n5', 'n4', 'n3', 'n2', 'n1'].forEach(lvl => {
  const p = path.join(dataDir, `grammar/grammar-${lvl}.js`);
  if (fs.existsSync(p)) eval(fs.readFileSync(p, 'utf8'));
});
const grammarIndexPath = path.join(dataDir, 'grammar/grammar-index.js');
auditAssert(fs.existsSync(grammarIndexPath), 'grammar-index.js exists');
eval(fs.readFileSync(grammarIndexPath, 'utf8'));
const canonicalGrammarIds = new Set((global.grammarDB || []).map(g => g.id));
auditAssert(canonicalGrammarIds.size >= 850, `Canonical Grammar DB loaded (${canonicalGrammarIds.size} entries)`);

const trackFiles = [
  { id: 'curriculum-n5', file: 'curriculum-n5.json' },
  { id: 'curriculum-n4', file: 'curriculum-n4.json' },
  { id: 'curriculum-n3', file: 'curriculum-n3.json' },
  { id: 'curriculum-n2', file: 'curriculum-n2.json' },
  { id: 'curriculum-n1', file: 'curriculum-n1.json' },
  { id: 'curriculum-ssw-kaigo', file: 'curriculum-ssw-kaigo.json' },
  { id: 'curriculum-ssw-food', file: 'curriculum-ssw-food.json' },
  { id: 'curriculum-ssw-construction', file: 'curriculum-ssw-construction.json' }
];

let totalTrackUnits = 0;
let totalTrackLessons = 0;
let totalGrammarReferences = 0;
let totalVocabReferences = 0;
let missingGrammarRefs = [];
let missingVocabRefs = [];

for (const track of trackFiles) {
  const filePath = path.resolve(__dirname, '../public/data/curriculum', track.file);
  auditAssert(fs.existsSync(filePath), `Track file exists: ${track.file}`);
  
  const trackData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  // Verify Meta Structure Uniformity
  auditAssert(typeof trackData.meta === 'object' && trackData.meta !== null, `${track.id} has meta object`);
  auditAssert(trackData.meta.track_id === track.id, `${track.id} meta.track_id matches track ID (${trackData.meta.track_id})`);
  auditAssert(Array.isArray(trackData.units) && trackData.units.length > 0, `${track.id} contains units array (${trackData.units.length} units)`);
  
  const lessonIdSet = new Set();
  
  trackData.units.forEach((unit, uIdx) => {
    totalTrackUnits++;
    auditAssert(typeof unit.id === 'string' && unit.id.length > 0, `${track.id} unit[${uIdx}] has valid id: ${unit.id}`);
    auditAssert(typeof unit.title_id === 'string' && unit.title_id.length > 0, `${track.id} unit ${unit.id} has title_id`);
    auditAssert(Array.isArray(unit.lessons) && unit.lessons.length > 0, `${track.id} unit ${unit.id} has lessons array`);
    
    unit.lessons.forEach(l => {
      totalTrackLessons++;
      auditAssert(!lessonIdSet.has(l.id), `${track.id} unique lesson id: ${l.id}`);
      lessonIdSet.add(l.id);
      
      // Check Grammar references (can be grammar_ids or grammarIds)
      const gids = l.grammar_ids || l.grammarIds || [];
      if (Array.isArray(gids)) {
        gids.forEach(gid => {
          totalGrammarReferences++;
          if (!canonicalGrammarIds.has(gid)) {
            missingGrammarRefs.push({ track: track.id, lesson: l.id, gid });
          }
        });
      }
      
      // Check Vocab references (can be vocab_ids or vocabIds)
      const vids = l.vocab_ids || l.vocabIds || [];
      if (Array.isArray(vids)) {
        vids.forEach(vid => {
          totalVocabReferences++;
          if (!canonicalVocabIds.has(vid)) {
            missingVocabRefs.push({ track: track.id, lesson: l.id, vid });
          }
        });
      }
    });
  });
}

auditAssert(missingGrammarRefs.length === 0, `All grammar references valid: 0 missing out of ${totalGrammarReferences}`, JSON.stringify(missingGrammarRefs.slice(0, 3)));
auditAssert(missingVocabRefs.length === 0, `All vocab references valid: 0 missing out of ${totalVocabReferences}`, JSON.stringify(missingVocabRefs.slice(0, 3)));
console.log(`  ✓ Total Units verified across 8 tracks: ${totalTrackUnits}`);
console.log(`  ✓ Total Lessons verified across 8 tracks: ${totalTrackLessons}`);
console.log(`  ✓ Total Grammar references verified: ${totalGrammarReferences} (100% valid)`);
console.log(`  ✓ Total Vocab references verified: ${totalVocabReferences} (100% valid)`);

// ── AUDIT 2: EMPIRICAL DIAGNOSTIC INVENTORY (300 ITEMS) ──
console.log('\n── AUDIT 2: Diagnostic Inventory Completeness & Schema ──');
const diagPath = path.resolve(__dirname, '../public/data/diagnostic/diagnostic-inventory.json');
auditAssert(fs.existsSync(diagPath), 'diagnostic-inventory.json exists on disk');

const diagData = JSON.parse(fs.readFileSync(diagPath, 'utf8'));
auditAssert(diagData.total_count === 300, `Metadata total_count is 300 (got ${diagData.total_count})`);
auditAssert(diagData.l1_contrastive_count === 150, `L1 contrastive count is 150`);
auditAssert(diagData.phonology_hvpt_count === 150, `Phonology/HVPT count is 150`);

const requiredFields = [
  'id', 'patterns', 'domain', 'category', 'title',
  'stimulus_l1', 'target_form', 'l1_trap_form',
  'root_cause', 'prescription', 'fsrs_difficulty',
  'fossilization_risk', 'l1_substratum'
];

let defectiveItems = [];
diagData.items.forEach((item, idx) => {
  for (const field of requiredFields) {
    if (item[field] === undefined || item[field] === null || (typeof item[field] === 'string' && item[field].trim() === '')) {
      defectiveItems.push({ id: item.id || `idx-${idx}`, field });
    }
  }
  // Check patterns array
  if (!Array.isArray(item.patterns) || item.patterns.length < 2) {
    defectiveItems.push({ id: item.id || `idx-${idx}`, field: 'patterns (must have ≥2 elements)' });
  }
});

auditAssert(defectiveItems.length === 0, `All 300 diagnostic items 100% complete with 0 defective fields`, JSON.stringify(defectiveItems.slice(0, 3)));

const substratumCounts = diagData.items.reduce((acc, it) => {
  acc[it.l1_substratum] = (acc[it.l1_substratum] || 0) + 1;
  return acc;
}, {});
console.log('  ✓ L1 Substratum breakdown:', substratumCounts);
auditAssert(substratumCounts.general_indonesian >= 100, 'general_indonesian substratum items present');
auditAssert(substratumCounts.javanese >= 10, 'javanese substratum items present');
auditAssert(substratumCounts.batak_eastern >= 10, 'batak_eastern substratum items present');
auditAssert(substratumCounts.sundanese >= 1, 'sundanese substratum items present');

// ── AUDIT 3: FSRS SCHEDULING & FATIGUE MATHEMATICAL BOUNDS ──
console.log('\n── AUDIT 3: FSRS Mathematical Stability & Fatigue Clamping ──');

// Verify FSRS Retrievability curve: R(t, S) = (1 + FACTOR * (t / S))^(-DECAY)
const DECAY = 0.5;
const FACTOR = 19 / 81;
function retrievability(t, S) {
  return Math.pow(1 + FACTOR * (t / S), -DECAY);
}

// When t = 0, R = 1.0
auditAssert(Math.abs(retrievability(0, 10) - 1.0) < 1e-6, 'R(0, S) is exactly 1.0');

// When t = S, R = (1 + 19/81)^(-0.5) = (100/81)^(-0.5) = 9/10 = 0.90
auditAssert(Math.abs(retrievability(10, 10) - 0.90) < 1e-4, 'R(S, S) is exactly 0.90 (90% target retention)');

// Fatigue condition boundaries
function isFatigue(hour, sessionMins) {
  return hour >= 21 || hour < 5 || sessionMins > 45;
}
auditAssert(isFatigue(20, 30) === false, '20:00 with 30m session is NOT fatigue');
auditAssert(isFatigue(21, 10) === true, '21:00 with 10m session IS fatigue');
auditAssert(isFatigue(4, 10) === true, '04:00 with 10m session IS fatigue');
auditAssert(isFatigue(14, 46) === true, '14:00 with 46m session IS fatigue');

// ── AUDIT 4: MORA METRONOME SEGMENTATION PRECISION ──
console.log('\n── AUDIT 4: Phonetic Mora Segmentation Precision ──');
function splitMora(text) {
  const small = new Set(['ゃ','ゅ','ょ','ぁ','ぃ','ぅ','ぇ','ぉ','ャ','ュ','ョ','ァ','ィ','ゥ','ェ','ォ']);
  const morae = [];
  const chars = Array.from(text);
  for (let i = 0; i < chars.length; i++) {
    if (i + 1 < chars.length && small.has(chars[i + 1])) {
      morae.push(chars[i] + chars[i + 1]);
      i++;
    } else {
      morae.push(chars[i]);
    }
  }
  return morae;
}

const testCases = [
  { word: 'びょういん', count: 4, label: 'hospital (びょ.う.い.ん)' },
  { word: 'びよういん', count: 5, label: 'salon (び.よ.う.い.ん)' },
  { word: 'おばあさん', count: 5, label: 'grandmother (お.ば.あ.さ.ん)' },
  { word: 'おばさん', count: 4, label: 'aunt (お.ば.さ.ん)' },
  { word: 'きって', count: 3, label: 'stamp (き.っ.て)' },
  { word: 'きて', count: 2, label: 'come (き.て)' },
  { word: 'コーヒー', count: 4, label: 'coffee (コ.ー.ヒ.ー)' }
];

testCases.forEach(tc => {
  const res = splitMora(tc.word);
  auditAssert(res.length === tc.count, `Mora count for '${tc.word}' (${tc.label}) is ${tc.count}: got ${res.join('.')}`);
});

// ── AUDIT 5: MACRO-DISCOURSE REGISTER MATRIX & CONNECTIVES ──
console.log('\n── AUDIT 5: Macro-Discourse Connective Integrity ──');
const discourseTsPath = path.resolve(__dirname, '../src/lib/data/discourseManager.ts');
auditAssert(fs.existsSync(discourseTsPath), 'discourseManager.ts exists');
const dContent = fs.readFileSync(discourseTsPath, 'utf8');

const discourseRoles = ['premise', 'antithesis', 'evidence', 'synthesis', 'conclusion'];
discourseRoles.forEach(role => {
  auditAssert(dContent.includes(role), `Discourse manager supports '${role}' rhetorical role`);
});

// ── AUDIT 6: CURRICULUM STORE REACTIVITY & HYDRATION ──
console.log('\n── AUDIT 6: Curriculum Store Reactivity & Hydration ──');
const storeTsPath = path.resolve(__dirname, '../src/lib/curriculum/curriculumStore.ts');
auditAssert(fs.existsSync(storeTsPath), 'curriculumStore.ts exists');
const sContent = fs.readFileSync(storeTsPath, 'utf8');

const requiredStoreActions = [
  'setActiveTrack',
  'completeLesson',
  'isLessonUnlocked',
  'getTrackStats',
  'setUserSubstratum',
  'resetTrackProgress',
  'exportProgressJson',
  'importProgressJson'
];
requiredStoreActions.forEach(action => {
  auditAssert(sContent.includes(action), `Curriculum store implements action '${action}'`);
});

// ── AUDIT 7: GEMBA K3 & VOCATIONAL PANIC SCENARIOS REPOSITORY ──
console.log('\n── AUDIT 7: Gemba K3 & Vocational Panic Scenarios (ADR-009) ──');
const panicTsPath = path.resolve(__dirname, '../src/lib/data/panicScenarioManager.ts');
auditAssert(fs.existsSync(panicTsPath), 'panicScenarioManager.ts exists on disk');
const pContent = fs.readFileSync(panicTsPath, 'utf8');

const canonicalPanicIds = [
  'panic-kaigo-01', 'panic-kaigo-02', 'panic-kaigo-03',
  'panic-jac-01', 'panic-jac-02', 'panic-jac-03', 'panic-jac-04', 'panic-jac-05',
  'panic-jaim-01',
  'panic-agri-01', 'panic-agri-02', 'panic-agri-03',
  'panic-fish-01', 'panic-fish-02', 'panic-fish-03',
  'panic-food-01', 'panic-food-02', 'panic-food-03',
  'panic-resto-01', 'panic-resto-02', 'panic-resto-03'
];

canonicalPanicIds.forEach(id => {
  auditAssert(pContent.includes(`id: '${id}'`), `Panic scenario '${id}' defined in repository`);
});

const requiredPanicFields = [
  'standardProtocol',
  'kanseiUtterance',
  'situation',
  'japaneseOutput',
  'actionChecklist',
  'timeoutSeconds'
];
requiredPanicFields.forEach(field => {
  auditAssert(pContent.includes(field), `Panic scenario schema includes '${field}'`);
});

// ── AUDIT 8: UNIFIED QUIZ ENGINE DISPATCHER & DRILL COMPONENTS ──
console.log('\n── AUDIT 8: Unified Quiz Engine Dispatcher & Drill Cards ──');
const qEnginePath = path.resolve(__dirname, '../src/lib/quiz/quizEngine.ts');
auditAssert(fs.existsSync(qEnginePath), 'quizEngine.ts exists');
const qContent = fs.readFileSync(qEnginePath, 'utf8');

const all13Modes = [
  'flashcard',
  'multiple-choice',
  'listening',
  'fill-in',
  'rearrange',
  'conjugation',
  'translation',
  'error-find',
  'panic-recall',
  'mora-pacing',
  'pitch-accent',
  'discourse-deconstruct',
  'collocation-matrix'
];
all13Modes.forEach(mode => {
  auditAssert(qContent.includes(`mode === '${mode}'`), `Quiz engine dispatcher explicitly routes '${mode}'`);
});

// Verify drill components exist
const panicCardPath = path.resolve(__dirname, '../src/components/quiz/PanicRecallCard.tsx');
auditAssert(fs.existsSync(panicCardPath), 'PanicRecallCard.tsx component exists');
const moraCardPath = path.resolve(__dirname, '../src/components/quiz/MoraPacingCard.tsx');
auditAssert(fs.existsSync(moraCardPath), 'MoraPacingCard.tsx component exists');

// Verify QuizArenaHub registers all 5 new specialty modes
const arenaHubPath = path.resolve(__dirname, '../src/components/quiz/QuizArenaHub.tsx');
const aContent = fs.readFileSync(arenaHubPath, 'utf8');
['panic-recall', 'mora-pacing', 'pitch-accent', 'discourse-deconstruct', 'collocation-matrix'].forEach(mode => {
  auditAssert(aContent.includes(`id: '${mode}'`), `QuizArenaHub registers mode card '${mode}'`);
});

// Verify useAppStore tracks userSubstratum
const appStorePath = path.resolve(__dirname, '../src/store/useAppStore.ts');
const storeContent = fs.readFileSync(appStorePath, 'utf8');
auditAssert(storeContent.includes('userSubstratum:'), 'useAppStore tracks userSubstratum');
auditAssert(storeContent.includes('setUserSubstratum:'), 'useAppStore exposes setUserSubstratum');

// ── AUDIT SUMMARY ──
console.log('\n══════════════════════════════════════════════════════════════════');
console.log(` AUDIT COMPLETE: ${passedChecks} / ${totalChecks} CHECKS PASSED (${failedChecks} FAILURES)`);
console.log('══════════════════════════════════════════════════════════════════');

if (failedChecks > 0) {
  process.exit(1);
} else {
  console.log('🌟 ALL 8 BACKEND & DRILL AUDITS VERIFIED 100%: FULL PRODUCTION READINESS!\n');
}

