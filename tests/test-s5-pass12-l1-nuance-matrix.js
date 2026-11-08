// ══════════════════════════════════════════════════════════════════
//  tests/test-s5-pass12-l1-nuance-matrix.js
//  SIKLUS V — PASS 12: 300+ L1 Indonesian Contrastive Nuance Matrix
//  Research Basis:
//    - Prihantoro et al. (2024), Husna & Febriyanti (2022) — Indonesian L1 Negative Transfer
//    - Corpus v30 Canonical Diagnostic Confusion Pairs (300 compiled items)
//    - Pomax Linguistic Analysis & Wasei-Eigo Semantic Shift
// ══════════════════════════════════════════════════════════════════

const assert = require('assert');
const path = require('path');
const fs = require('fs');
const vm = require('vm');

console.log('╔══════════════════════════════════════════════════════════════════╗');
console.log('║   SIKLUS V — PASS 12: 300+ L1 CONTRASTIVE NUANCE MATRIX          ║');
console.log('╚══════════════════════════════════════════════════════════════════╝\n');

const ROOT_DIR = path.resolve(__dirname, '..');

// Import nuanceDb module
const {
  CANONICAL_NUANCE_PAIRS,
  getNuancePairById,
  getNuancePairsByCategory,
  getNuancePairsByLevel,
  searchNuanceMatrix,
  getL1InterferenceStats,
} = require('../src/lib/data/nuanceDb.ts');

// ── T-1: Canonical L1 Interference & Contrastive Matrix Integrity ──
console.log('--- [T-1] Canonical Contrastive Nuance Pairs Integrity ---');

assert(Array.isArray(CANONICAL_NUANCE_PAIRS), 'CANONICAL_NUANCE_PAIRS must be an array');
assert(CANONICAL_NUANCE_PAIRS.length >= 15, `Must have >= 15 canonical pairs, got ${CANONICAL_NUANCE_PAIRS.length}`);

const validCategories = ['l1_interference', 'transitivity', 'false_friends', 'particles', 'jlpt_grammar'];

CANONICAL_NUANCE_PAIRS.forEach((p, idx) => {
  assert(p.id && typeof p.id === 'string', `Pair at index ${idx} must have string id`);
  assert(p.title && typeof p.title === 'string', `Pair ${p.id} must have title`);
  assert(p.level && typeof p.level === 'string', `Pair ${p.id} must have level`);
  assert(validCategories.includes(p.category), `Pair ${p.id} invalid category: ${p.category}`);
  assert(p.domain && typeof p.domain === 'string', `Pair ${p.id} must have domain`);

  // Pattern A
  assert(p.patternA && typeof p.patternA === 'object', `Pair ${p.id} must have patternA`);
  assert(p.patternA.pattern, `Pair ${p.id} patternA missing pattern`);
  assert(p.patternA.reading, `Pair ${p.id} patternA missing reading`);
  assert(p.patternA.meaning, `Pair ${p.id} patternA missing meaning`);
  assert(p.patternA.nuance, `Pair ${p.id} patternA missing nuance`);
  assert(p.patternA.example && p.patternA.example.jp && p.patternA.example.id, `Pair ${p.id} patternA invalid example`);

  // Pattern B
  assert(p.patternB && typeof p.patternB === 'object', `Pair ${p.id} must have patternB`);
  assert(p.patternB.pattern, `Pair ${p.id} patternB missing pattern`);
  assert(p.patternB.reading, `Pair ${p.id} patternB missing reading`);
  assert(p.patternB.meaning, `Pair ${p.id} patternB missing meaning`);
  assert(p.patternB.nuance, `Pair ${p.id} patternB missing nuance`);
  assert(p.patternB.example && p.patternB.example.jp && p.patternB.example.id, `Pair ${p.id} patternB invalid example`);

  // Key difference & trap warning
  assert(p.keyDifference && p.keyDifference.length >= 15, `Pair ${p.id} keyDifference too short`);
  assert(p.trapWarning && p.trapWarning.length >= 15, `Pair ${p.id} trapWarning too short`);
});

console.log(`✅ [PASS] T-1: All ${CANONICAL_NUANCE_PAIRS.length} canonical comparison pairs verified with complete schemas.\n`);

// ── T-2: Indonesian L1 Specific Error Autopsies & Copula "Adalah" ──
console.log('--- [T-2] Indonesian L1 Specific Error Autopsies & Copula "Adalah" ---');

const adalahPair = getNuancePairById('adalah-insertion-copula');
assert(adalahPair, 'Must have adalah-insertion-copula pair');
assert(adalahPair.l1Pitfall, 'adalah-insertion-copula must contain l1Pitfall');
assert(adalahPair.l1Pitfall.indonesianMistake.includes('adalah'), 'Must mention Indonesian "adalah" mistake');
assert(adalahPair.l1Pitfall.rootCause.includes('SVO'), 'Must identify SVO syntactic transfer root cause');
assert(adalahPair.l1Pitfall.remedialMnemonic.length > 10, 'Must have mnemonic');

const waGaPair = getNuancePairById('wa-vs-ga-asymmetry');
assert(waGaPair, 'Must have wa-vs-ga-asymmetry pair');
assert(waGaPair.l1Pitfall, 'wa-vs-ga-asymmetry must contain l1Pitfall');
assert(waGaPair.keyDifference.includes('は') && waGaPair.keyDifference.includes('が'), 'Must contrast wa and ga clearly');

const niDePair = getNuancePairById('ni-vs-de-locative');
assert(niDePair, 'Must have ni-vs-de-locative pair');
assert(niDePair.trapWarning.includes('住む') || niDePair.trapWarning.includes('東京'), 'Must warn against *東京で住む');

const benefactivePair = getNuancePairById('ageru-kureru-morau-perspective');
assert(benefactivePair, 'Must have ageru-kureru-morau-perspective pair');
assert(benefactivePair.patternA.pattern.includes('あげる') && benefactivePair.patternB.pattern.includes('くれる'), 'Must contrast ageru and kureru');

console.log('✅ [PASS] T-2: Indonesian L1 copula "Adalah", Wa vs Ga, and Ni vs De autopsies verified.\n');

// ── T-3: Transitive (他動詞) vs Intransitive (自動詞) Structural Pairs ──
console.log('--- [T-3] Transitive (他動詞) vs Intransitive (自動詞) Pairs ---');

const transPairs = getNuancePairsByCategory('transitivity');
assert(transPairs.length >= 3, `Must have >= 3 transitivity pairs, got ${transPairs.length}`);

const akuAkeru = getNuancePairById('aku-vs-akeru');
assert(akuAkeru, 'Must have aku-vs-akeru');
assert(akuAkeru.patternA.pattern.includes('開く') && akuAkeru.patternA.pattern.includes('が'), '開く must use partikel が');
assert(akuAkeru.patternB.pattern.includes('開ける') && akuAkeru.patternB.pattern.includes('を'), '開ける must use partikel を');

const kieruKesu = getNuancePairById('kieru-vs-kesu');
assert(kieruKesu, 'Must have kieru-vs-kesu');
assert(kieruKesu.patternA.pattern.includes('消える') && kieruKesu.patternB.pattern.includes('消す'));

const ochiruOtosu = getNuancePairById('ochiru-vs-otosu');
assert(ochiruOtosu, 'Must have ochiru-vs-otosu');
assert(ochiruOtosu.patternA.pattern.includes('落ちる') && ochiruOtosu.patternB.pattern.includes('落とす'));

console.log('✅ [PASS] T-3: Transitive vs Intransitive ergative pairs strictly verified (が自動詞 vs を他動詞).\n');

// ── T-4: False Friends & Wasei-Eigo Traps ──
console.log('--- [T-4] False Friends & Wasei-Eigo Loanword Traps ---');

const falseFriends = getNuancePairsByCategory('false_friends');
assert(falseFriends.length >= 4, `Must have >= 4 false friends pairs, got ${falseFriends.length}`);

const mansion = getNuancePairById('false-friend-mansion');
assert(mansion, 'Must have false-friend-mansion');
assert(mansion.patternA.meaning.includes('Apartemen') || mansion.patternA.meaning.includes('beton'), 'Mansion must mean concrete apartment in Japan');
assert(mansion.patternB.pattern.includes('豪邸'), 'Contrasting pattern must cite Goutei (豪邸)');

const cunning = getNuancePairById('false-friend-cunning');
assert(cunning, 'Must have false-friend-cunning');
assert(cunning.patternA.meaning.includes('contek') || cunning.patternA.meaning.includes('curang'), 'Cunning must mean cheating in exam in Japan');

const smart = getNuancePairById('false-friend-smart');
assert(smart, 'Must have false-friend-smart');
assert(smart.patternA.meaning.includes('langsing') || smart.patternA.meaning.includes('ramping'), 'Smart must mean slender/stylish in Japan');

const consent = getNuancePairById('false-friend-consent');
assert(consent, 'Must have false-friend-consent');
assert(consent.patternA.meaning.includes('Stopkontak') || consent.patternA.meaning.includes('Colokan'), 'Consent must mean electrical outlet');

console.log('✅ [PASS] T-4: Critical Wasei-Eigo loanword distortions (Mansion, Cunning, Smart, Consent) verified.\n');

// ── T-5: 300 Empirical Diagnostic Items (Corpus v30) Integration ──
console.log('--- [T-5] 300 Empirical Diagnostic Confusion Pairs (Corpus v30) ---');

const confusionFile = path.join(ROOT_DIR, 'public/data/confusion-pairs.js');
assert(fs.existsSync(confusionFile), 'public/data/confusion-pairs.js must exist');

const code = fs.readFileSync(confusionFile, 'utf8');
const sandbox = {};
vm.runInNewContext(code, sandbox);

assert(Array.isArray(sandbox.confusionPairs), 'confusionPairs must be an array');
assert.strictEqual(sandbox.confusionPairs.length, 300, 'Must contain exactly 300 compiled items in Corpus v30');

const l1Items = sandbox.confusionPairs.filter(p => p.id && p.id.startsWith('cp-l1-'));
const phonItems = sandbox.confusionPairs.filter(p => p.id && p.id.startsWith('cp-phon-'));

assert.strictEqual(l1Items.length, 150, 'Must have exactly 150 Indonesian L1 interference pairs');
assert.strictEqual(phonItems.length, 150, 'Must have exactly 150 Phonological minimal pairs');

// Validate L1 structure
l1Items.forEach((p, i) => {
  assert(p.domain && typeof p.domain === 'string', `cp-l1 item ${i} missing domain`);
  assert(p.category && typeof p.category === 'string', `cp-l1 item ${i} missing category`);
  assert(p.stimulus_l1 && typeof p.stimulus_l1 === 'string', `cp-l1 item ${i} missing stimulus_l1`);
  assert(p.target_form && typeof p.target_form === 'string', `cp-l1 item ${i} missing target_form`);
  assert(p.l1_trap_form && typeof p.l1_trap_form === 'string', `cp-l1 item ${i} missing l1_trap_form`);
  assert(p.root_cause && typeof p.root_cause === 'string', `cp-l1 item ${i} missing root_cause`);
  assert(p.prescription && typeof p.prescription === 'string', `cp-l1 item ${i} missing prescription`);
  assert(typeof p.fsrs_difficulty === 'number', `cp-l1 item ${i} missing fsrs_difficulty`);
});

console.log(`✅ [PASS] T-5: 300 Empirical Diagnostic Items verified (150 L1 interference + 150 minimal pairs).\n`);

// ── T-6: Nuance Query APIs & Search Filter Precision ──
console.log('--- [T-6] Nuance Query APIs & Search Filters ---');

// Case-insensitive ID lookup
assert.strictEqual(getNuancePairById('ADALAH-INSERTION-COPULA')?.id, 'adalah-insertion-copula');
assert.strictEqual(getNuancePairById('unknown-id'), undefined);

// Category filtering
const l1Category = getNuancePairsByCategory('l1_interference');
assert(l1Category.length >= 3, 'Must filter l1_interference');
l1Category.forEach(p => assert.strictEqual(p.category, 'l1_interference'));

// Search matrix
const searchWa = searchNuanceMatrix('wa');
assert(searchWa.some(p => p.id === 'wa-vs-ga-asymmetry'), 'Search "wa" must return wa-vs-ga');

const searchMansion = searchNuanceMatrix('mansion');
assert(searchMansion.some(p => p.id === 'false-friend-mansion'), 'Search "mansion" must return false-friend-mansion');

// Statistics
const stats = getL1InterferenceStats();
assert.strictEqual(stats.totalCanonicalPairs, CANONICAL_NUANCE_PAIRS.length);
assert(stats.l1InterferencePairs >= 10, 'Must have >= 10 L1-relevant pairs');

console.log('✅ [PASS] T-6: Search, filter, and statistics query APIs operate with 100% precision.\n');

console.log('Results: 6/6 tests passed.');
console.log('🎉 ALL SIKLUS V PASS 12 TESTS PASSED PERFECTION!\n');
process.exit(0);
