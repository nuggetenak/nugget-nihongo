// ══════════════════════════════════════════════════════════════════
//  tests/test-s5-pass13-confusion-dialects.js
//  SIKLUS V — PASS 13: 300 Diagnostic Confusion Pairs & Regional Dialect Adaptation
//  Audits & Verifies:
//    - 300 compiled items (150 L1 interference + 150 phonological minimal pairs)
//    - Regional substratum dialect diagnostics (Javanese, Sundanese, Batak/Eastern, General)
//    - Tokyo Pitch Accent categories (Heiban, Atamadaka, Nakadaka, Odaka)
//    - 42 Clinical Pain Onomatopoeia emergency protocols (Kaigo / Gemba safety)
// ══════════════════════════════════════════════════════════════════

const assert = require('assert');
const path = require('path');
const fs = require('fs');

console.log('╔══════════════════════════════════════════════════════════════════╗');
console.log('║   SIKLUS V — PASS 13: 300 DIAGNOSTIC PAIRS & DIALECT MATRIX     ║');
console.log('╚══════════════════════════════════════════════════════════════════╝\n');

const {
  loadDiagnosticPairs,
  getDiagnosticPairsByLevel,
  getDiagnosticPairsByArchetype,
  getDiagnosticPairsByDomain,
  getDiagnosticPairsBySubstratum,
  getDiagnosticPairsByPitchAccent,
  getRandomDiagnosticPair,
  getDialectInterferenceReport,
  getOnomatopoeiaByPhysiologicalCluster,
  getOnomatopoeiaByEmergencyLevel,
  searchOnomatopoeia,
} = require('../src/lib/data/diagnosticManager.ts');

const {
  CANONICAL_PAIN_ONOMATOPOEIA,
} = require('../src/lib/data/painOnomatopoeiaManager.ts');

async function runPass13Tests() {
  // ── T-1: Load and Validate 300 Diagnostic Confusion Pairs ──
  console.log('--- [T-1] 300 Diagnostic Confusion Pairs Integrity & Schema ---');

  const allPairs = await loadDiagnosticPairs();
  assert(Array.isArray(allPairs), 'loadDiagnosticPairs must return an array');
  assert.strictEqual(allPairs.length, 300, `Expected exactly 300 compiled items, got ${allPairs.length}`);

  const validArchetypes = ['contrastive_pair_slot', 'audio_speed_gate', 'pitch_accent_contrast'];
  const validRisks = ['HIGH', 'CRITICAL', 'CRITICAL_SAFETY'];
  const validLevels = ['n5', 'n4', 'n3', 'n2', 'n1', 'N5', 'N4', 'N3', 'N2', 'N1'];

  allPairs.forEach((p, idx) => {
    assert(p.id && typeof p.id === 'string', `Item ${idx} missing string id`);
    assert(Array.isArray(p.patterns) && p.patterns.length > 0, `Item ${p.id} must have non-empty patterns`);
    assert(validLevels.includes(p.level), `Item ${p.id} has invalid level: ${p.level}`);
    assert(validArchetypes.includes(p.archetype), `Item ${p.id} has invalid archetype: ${p.archetype}`);
    assert(p.domain && typeof p.domain === 'string', `Item ${p.id} missing domain`);
    assert(p.category && typeof p.category === 'string', `Item ${p.id} missing category`);
    assert(p.title && typeof p.title === 'string', `Item ${p.id} missing title`);
    assert(p.stimulus_l1 && typeof p.stimulus_l1 === 'string', `Item ${p.id} missing stimulus_l1`);
    assert(p.target_form && typeof p.target_form === 'string', `Item ${p.id} missing target_form`);
    assert(p.l1_trap_form && typeof p.l1_trap_form === 'string', `Item ${p.id} missing l1_trap_form`);
    assert(p.root_cause && typeof p.root_cause === 'string', `Item ${p.id} missing root_cause`);
    assert(p.prescription && typeof p.prescription === 'string', `Item ${p.id} missing prescription`);
    assert(typeof p.fsrs_difficulty === 'number' && p.fsrs_difficulty >= 0, `Item ${p.id} invalid fsrs_difficulty`);
    assert(validRisks.includes(p.fossilization_risk), `Item ${p.id} invalid fossilization_risk: ${p.fossilization_risk}`);
  });

  console.log(`✅ [PASS] T-1: Verified all 300 diagnostic pairs across schemas, FSRS difficulty, and risk levels.\n`);

  // ── T-2: Split Verification: 150 L1 Interference & 150 Phonological Pairs ──
  console.log('--- [T-2] Split Verification: 150 L1 Contrastive & 150 Phonological Pairs ---');

  const l1InterferencePairs = allPairs.filter((p) => p.archetype === 'contrastive_pair_slot');
  const phonologicalPairs = allPairs.filter(
    (p) => p.archetype === 'pitch_accent_contrast' || p.archetype === 'audio_speed_gate'
  );

  assert.strictEqual(l1InterferencePairs.length, 150, `Expected 150 L1 interference pairs, got ${l1InterferencePairs.length}`);
  assert.strictEqual(phonologicalPairs.length, 150, `Expected 150 phonological pairs, got ${phonologicalPairs.length}`);

  // Test Pitch Accent pairs presence (45 pure pitch accent + 105 audio speed gate = 150 phonological)
  const pitchAccentArchetype = allPairs.filter((p) => p.archetype === 'pitch_accent_contrast');
  const speedGatePairs = allPairs.filter((p) => p.archetype === 'audio_speed_gate');
  const pitchAccentQuery = await getDiagnosticPairsByPitchAccent();

  assert.strictEqual(pitchAccentArchetype.length, 45, `Expected 45 pitch accent archetype items, got ${pitchAccentArchetype.length}`);
  assert.strictEqual(speedGatePairs.length, 105, `Expected 105 audio speed gate items, got ${speedGatePairs.length}`);
  assert.strictEqual(pitchAccentQuery.length, 47, `Expected 47 total pitch-annotated items, got ${pitchAccentQuery.length}`);

  console.log(`✅ [PASS] T-2: Validated exact split: 150 L1 contrastive pairs + 150 phonological pairs (45 pitch accent + 105 speed gate + 47 pitch-annotated).\n`);

  // ── T-3: Regional Substratum Dialect Diagnostics ──
  console.log('--- [T-3] Regional Substratum Dialect Diagnostics ---');

  const substrata = ['javanese', 'sundanese', 'batak_eastern', 'general_indonesian'];
  for (const sub of substrata) {
    const report = await getDialectInterferenceReport(sub);
    assert.strictEqual(report.substratum, sub, `Report substratum mismatch`);
    assert(typeof report.totalItems === 'number', `Report must have totalItems`);
    assert(typeof report.criticalSafetyItems === 'number', `Report must have criticalSafetyItems`);
    assert(typeof report.domains === 'object', `Report must have domains breakdown`);
    assert(Array.isArray(report.topTraps), `Report must have topTraps array`);
  }

  const javaneseItems = await getDiagnosticPairsBySubstratum('javanese');
  const sundaneseItems = await getDiagnosticPairsBySubstratum('sundanese');
  const batakItems = await getDiagnosticPairsBySubstratum('batak_eastern');

  assert(javaneseItems.length > 0, 'Must have Javanese dialect diagnostic pairs');
  assert(sundaneseItems.length > 0, 'Must have Sundanese dialect diagnostic pairs');
  assert(batakItems.length > 0, 'Must have Batak/Eastern dialect diagnostic pairs');

  console.log(`✅ [PASS] T-3: Dialect reports generated: Javanese (${javaneseItems.length}), Sundanese (${sundaneseItems.length}), Batak/Eastern (${batakItems.length}).\n`);

  // ── T-4: 42 Clinical Pain Onomatopoeia Emergency Protocol ──
  console.log('--- [T-4] 42 Clinical Pain Onomatopoeia Protocol ---');

  assert(Array.isArray(CANONICAL_PAIN_ONOMATOPOEIA), 'CANONICAL_PAIN_ONOMATOPOEIA must be an array');
  assert.strictEqual(CANONICAL_PAIN_ONOMATOPOEIA.length, 42, `Expected 42 canonical pain items, got ${CANONICAL_PAIN_ONOMATOPOEIA.length}`);

  const requiredClusters = [
    'menusuk_tajam',
    'panas_terbakar',
    'tumpul_berat',
    'gatal_menggigit',
    'kaku_terkunci',
    'pusing_disorientasi',
    'sesak_napas',
  ];

  const requiredEmergencyLevels = [
    'routine_observation',
    'urgent_consultation',
    'immediate_119_ambulance',
  ];

  CANONICAL_PAIN_ONOMATOPOEIA.forEach((item, idx) => {
    assert(typeof item.id === 'number', `Item ${idx} missing numeric id`);
    assert(item.onomatopoeia && typeof item.onomatopoeia === 'string', `Item ${item.id} missing onomatopoeia`);
    assert(item.romaji && typeof item.romaji === 'string', `Item ${item.id} missing romaji`);
    assert(requiredClusters.includes(item.physiological_cluster), `Item ${item.id} invalid cluster: ${item.physiological_cluster}`);
    assert(requiredEmergencyLevels.includes(item.emergency_level), `Item ${item.id} invalid emergency_level: ${item.emergency_level}`);
    assert(item.clinical_meaning_id && typeof item.clinical_meaning_id === 'string', `Item ${item.id} missing clinical_meaning_id`);
    assert(item.sample_elder_sentence && typeof item.sample_elder_sentence === 'string', `Item ${item.id} missing sample_elder_sentence`);
    if (item.action_guideline_id) {
      assert(typeof item.action_guideline_id === 'string', `Item ${item.id} invalid action_guideline_id`);
    }
  });

  // Test emergency level filtering
  const criticalAmbulance = getOnomatopoeiaByEmergencyLevel('immediate_119_ambulance');
  assert(criticalAmbulance.length > 0, 'Must have immediate_119_ambulance items');
  criticalAmbulance.forEach((item) => {
    assert.strictEqual(item.emergency_level, 'immediate_119_ambulance');
  });

  // Test physiological cluster filtering
  const sharpPain = getOnomatopoeiaByPhysiologicalCluster('menusuk_tajam');
  assert(sharpPain.length > 0, 'Must have menusuk_tajam items');

  // Test onomatopoeia search
  const zugukiSearch = searchOnomatopoeia('ズキズキ');
  assert(zugukiSearch.length >= 1, 'Search for ズキズキ must return results');
  assert(zugukiSearch[0].onomatopoeia.includes('ズキズキ'));

  console.log(`✅ [PASS] T-4: All 42 clinical pain items verified across emergency levels, somatic clusters, and triage action guidelines.\n`);

  // ── T-5: Filtering & Random Diagnostic Sampler ──
  console.log('--- [T-5] Multi-Dimensional Filtering & Random Diagnostic Sampler ---');

  const n5Pairs = await getDiagnosticPairsByLevel('N5');
  assert(n5Pairs.length > 0, 'Must have N5 pairs');
  n5Pairs.forEach((p) => assert.strictEqual(p.level.toLowerCase(), 'n5'));

  const domainPairs = await getDiagnosticPairsByDomain('gemba');
  assert(domainPairs.length > 0, 'Must have gemba domain pairs');

  const randomItem = await getRandomDiagnosticPair({ level: 'N5' });
  assert(randomItem !== null, 'getRandomDiagnosticPair must return an item');
  assert.strictEqual(randomItem.level.toLowerCase(), 'n5');

  const emptyFilter = await getRandomDiagnosticPair({
    level: 'N1',
    archetype: 'pitch_accent_contrast',
    substratum: 'sundanese', // specific intersection that does not exist
  });
  // Should safely return null or item without throwing
  assert(emptyFilter === null || typeof emptyFilter === 'object');

  console.log('✅ [PASS] T-5: Level, domain, archetype, and random sampling passed cleanly.\n');

  console.log('══════════════════════════════════════════════════════════════════');
  console.log('🎉 SIKLUS V — PASS 13 REGRESSION SUITE: 100% GREEN (5/5 PASS)');
  console.log('══════════════════════════════════════════════════════════════════\n');
}

runPass13Tests().catch((err) => {
  console.error('❌ [FAIL] Pass 13 Regression Suite Failed:', err);
  process.exit(1);
});
