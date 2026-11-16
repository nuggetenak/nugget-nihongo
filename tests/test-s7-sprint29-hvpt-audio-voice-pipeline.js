// ══════════════════════════════════════════════════════════════════
//  test-s7-sprint29-hvpt-audio-voice-pipeline.js
//  Sprint 29 (Pass 7): High-Variability Phonetic Training (HVPT), Audio Voice Pipeline & Pitch Accent Engine
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT = path.resolve(__dirname, '..');

console.log('🧪 Starting Sprint 29: HVPT Audio Pipeline & Phonetic Training Suite...\n');

async function runSprint29() {
  const {
    HVPT_SPEAKERS,
    loadAllHVPTPairs,
    getHVPTPairsByDomain,
    createHVPTSession,
    evaluateHVPTTrial,
    summarizeHVPTSession,
    playHVPTSpeaker,
    mapPhonologicalDomain,
  } = await import('../src/lib/audio/hvptManager.ts');

  const { splitIntoMoras } = await import('../src/lib/audio/moraTokenizer.ts');
  const { calculatePitchContour } = await import('../src/lib/pitch/pitchEngine.ts');

  // ── Check 1: 150 Phonological Contrast Pairs Across 6 Domains ──
  console.log('▶ Check 1: 150 Phonological Contrast Pairs Across 6 Domains...');
  const allPairs = await loadAllHVPTPairs();
  assert.strictEqual(allPairs.length, 150, `Expected 150 items in HVPT inventory, got ${allPairs.length}`);

  const domainMap = {
    pitch_accent: 45,
    chōon_vowel: 30,
    sokuon_stop: 30,
    geminate_nasal: 20,
    liquid_r_l: 10,
    devoicing: 15,
  };

  for (const [domain, expectedCount] of Object.entries(domainMap)) {
    const items = await getHVPTPairsByDomain(domain);
    assert.strictEqual(items.length, expectedCount, `Domain '${domain}' expected ${expectedCount}, got ${items.length}`);
  }
  console.log('  ✔ [PASS] All 150 phonological contrast items partitioned across 6 domains with 100% fidelity');

  // ── Check 2: 4-Speaker Multi-Acoustic Matrix ──
  console.log('\n▶ Check 2: 4-Speaker Multi-Acoustic Matrix...');
  assert.strictEqual(HVPT_SPEAKERS.length, 4, 'HVPT must register exactly 4 native speaker profiles');
  const [m1, f1, m2, f2] = HVPT_SPEAKERS;

  assert.strictEqual(m1.gender, 'M');
  assert.strictEqual(m1.age_group, 'young');
  assert.strictEqual(f1.gender, 'F');
  assert.strictEqual(f1.age_group, 'young');
  assert.strictEqual(m2.gender, 'M');
  assert.strictEqual(m2.age_group, 'senior');
  assert.strictEqual(f2.gender, 'F');
  assert.strictEqual(f2.age_group, 'senior');

  // Acoustic invariant: Female pitch higher than male, young rate faster than senior
  assert(f1.pitch > m1.pitch, 'Female pitch (F1) must be higher than male pitch (M1)');
  assert(f2.pitch > m2.pitch, 'Female pitch (F2) must be higher than male pitch (M2)');
  assert(m1.rate >= m2.rate, 'Young rate (M1) must be >= senior rate (M2)');
  console.log('  ✔ [PASS] 4-speaker acoustic matrix verified across gender and age dimensions');

  // ── Check 3: Randomized Session Generation & Trial Discrimination ──
  console.log('\n▶ Check 3: Randomized Session Generation & Trial Discrimination...');
  const session = await createHVPTSession('sokuon_stop', 5);
  assert(session.session_id.startsWith('hvpt-sess-'), 'Session ID must have valid prefix');
  assert.strictEqual(session.pairs.length, 5, 'Session must generate requested item count');

  session.pairs.forEach((p) => {
    assert(p.target_word === 'A' || p.target_word === 'B', 'Target word must be randomized to A or B');
    assert.strictEqual(p.phonological_contrast_domain, 'sokuon_stop');
  });

  const trialCorrect = {
    pair_id: 'test-1',
    selected: 'A',
    target: 'A',
    is_correct: true,
    reaction_time_ms: 850,
    speaker_id: 'speaker_m1',
    domain: 'sokuon_stop',
  };
  const trialIncorrect = {
    pair_id: 'test-2',
    selected: 'B',
    target: 'A',
    is_correct: false,
    reaction_time_ms: 1200,
    speaker_id: 'speaker_f1',
    domain: 'sokuon_stop',
  };

  assert.strictEqual(evaluateHVPTTrial(trialCorrect), true);
  assert.strictEqual(evaluateHVPTTrial(trialIncorrect), false);

  const summary = summarizeHVPTSession([trialCorrect, trialIncorrect]);
  assert.strictEqual(summary.total_trials, 2);
  assert.strictEqual(summary.correct_count, 1);
  assert.strictEqual(summary.accuracy_percent, 50);
  assert.strictEqual(summary.average_reaction_time_ms, 1025);
  assert.strictEqual(summary.speaker_breakdown.speaker_m1.accuracy, 100);
  assert.strictEqual(summary.speaker_breakdown.speaker_f1.accuracy, 0);
  console.log('  ✔ [PASS] Session generator, trial evaluation, and multi-speaker summary metrics verified');

  // ── Check 4: Mora Tokenizer & Pitch Contour Deconstruction ──
  console.log('\n▶ Check 4: Mora Tokenizer & Pitch Contour Deconstruction...');
  const moras = splitIntoMoras('きょうしつ');
  assert.deepStrictEqual(moras, ['きょ', 'う', 'し', 'つ'], 'Digraphs must be bound to single mora');

  const sokuonMoras = splitIntoMoras('きって');
  assert.deepStrictEqual(sokuonMoras, ['き', 'っ', 'て'], 'Sokuon geminate stop must form independent mora');

  const contour = calculatePitchContour('きって', 1);
  assert.strictEqual(contour.category, 'atamadaka');
  assert.strictEqual(contour.moras[0].isHigh, true);
  assert.strictEqual(contour.moras[1].isHigh, false);
  console.log('  ✔ [PASS] Mora tokenizer and pitch contour math correctly parse digraphs and sokuon stops');

  // ── Check 5: HVPTPlayer Source Code Architecture Contracts ──
  console.log('\n▶ Check 5: HVPTPlayer Source Code Architecture Contracts...');
  const playerPath = path.join(ROOT, 'src', 'components', 'audio', 'HVPTPlayer.tsx');
  assert(fs.existsSync(playerPath), 'HVPTPlayer.tsx must exist');
  const playerContent = fs.readFileSync(playerPath, 'utf8');

  assert(
    playerContent.includes('splitIntoMoras'),
    'HVPTPlayer must import splitIntoMoras for mora-level pitch step labeling'
  );
  assert(
    playerContent.includes('renderPitchContour(pair.word_a.pitch_pattern, pair.word_a.accent_type, pair.word_a.kana)'),
    'HVPTPlayer must pass word A kana into pitch contour visualizer'
  );
  assert(
    playerContent.includes('renderPitchContour(pair.word_b.pitch_pattern, pair.word_b.accent_type, pair.word_b.kana)'),
    'HVPTPlayer must pass word B kana into pitch contour visualizer'
  );
  assert(
    playerContent.includes('audio.onerror = () => setActivePlayback(null);'),
    'HVPTPlayer must handle audio errors gracefully without freezing playback state'
  );
  console.log('  ✔ [PASS] HVPTPlayer source code integrates mora labeling and resilient playback lifecycle');

  // ── Check 6: HVPTModal & Global Modal Architecture Integration ──
  console.log('\n▶ Check 6: HVPTModal & Global Modal Architecture Integration...');
  const modalPath = path.join(ROOT, 'src', 'components', 'audio', 'HVPTModal.tsx');
  assert(fs.existsSync(modalPath), 'HVPTModal.tsx must exist');
  const modalContent = fs.readFileSync(modalPath, 'utf8');

  assert(
    modalContent.includes('DOMAIN_TABS'),
    'HVPTModal must declare DOMAIN_TABS filter navigation'
  );
  assert(
    modalContent.includes('HVPTPlayer'),
    'HVPTModal must host HVPTPlayer active trial component'
  );
  assert(
    modalContent.includes('summary.speaker_breakdown'),
    'HVPTModal must display multi-speaker breakdown in results screen'
  );

  console.log('  ✔ [PASS] HVPTModal full integration across multi-speaker domain tabs and summary verified');

  console.log('\n══════════════════════════════════════════════════════════════════');
  console.log('🎉 ALL 6 SPRINT 29 HVPT AUDIO PIPELINE CONTRACTS PASSED 100% GREEN!');
  console.log('══════════════════════════════════════════════════════════════════\n');
}

runSprint29().catch((err) => {
  console.error('\n❌ Sprint 29 Suite Failed:', err);
  process.exit(1);
});
