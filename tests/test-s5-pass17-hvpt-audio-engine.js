// ══════════════════════════════════════════════════════════════════
//  tests/test-s5-pass17-hvpt-audio-engine.js
//  SIKLUS V — PASS 17: HVPT (High-Variability Phonetic Training) Minimal Pairs
//  Klaster 6: Audio, Phonetics & Listening Immersion (Latent Module)
//  Audits & Verifies:
//    - 150 Phonological Contrast Items across 6 Distinct Domains
//    - Domain Partitioning: Pitch Accent, Chouon, Sokuon, Nasal, R/L, Gemba
//    - 4-Speaker Acoustic Contrast Matrix: Gender (M/F) & Age (Young/Senior)
//    - Randomized Perceptual Discrimination Sessions & Stopping Criteria
//    - Multi-Speaker Trial Evaluation & Aggregated Statistical Metrics
//    - Web Audio / TTS Non-Throwing Offline Resiliency
//    - Complete UI/Modal Architecture Integration (GlobalModalManager, StudyToolbox)
// ══════════════════════════════════════════════════════════════════

const assert = require('assert');
const path = require('path');
const fs = require('fs');

console.log('╔══════════════════════════════════════════════════════════════════╗');
console.log('║   SIKLUS V — PASS 17: HVPT MULTI-SPEAKER ACOUSTIC ENGINE AUDIT   ║');
console.log('╚══════════════════════════════════════════════════════════════════╝\n');

async function runPass17Tests() {
  const {
    HVPT_SPEAKERS,
    loadAllHVPTPairs,
    getHVPTPairsByDomain,
    getHVPTPairById,
    createHVPTSession,
    evaluateHVPTTrial,
    summarizeHVPTSession,
    playHVPTSpeaker,
    mapPhonologicalDomain,
  } = await import('../src/lib/audio/hvptManager.ts');

  // ── T-1: Phonological Domain Partitioning (150 Total Items) ──
  console.log('--- [T-1] Phonological Domain Partitioning (150 Total Items) ---');

  const allPairs = await loadAllHVPTPairs();
  assert.strictEqual(allPairs.length, 150, `Expected exactly 150 phonological contrast items, got ${allPairs.length}`);

  const [pitchPairs, vowelPairs, sokuonPairs, nasalPairs, rlPairs, gembaPairs] = await Promise.all([
    getHVPTPairsByDomain('pitch_accent'),
    getHVPTPairsByDomain('chōon_vowel'),
    getHVPTPairsByDomain('sokuon_stop'),
    getHVPTPairsByDomain('geminate_nasal'),
    getHVPTPairsByDomain('liquid_r_l'),
    getHVPTPairsByDomain('devoicing'),
  ]);

  assert.strictEqual(pitchPairs.length, 45, `Pitch Accent: expected 45 items, got ${pitchPairs.length}`);
  assert.strictEqual(vowelPairs.length, 30, `Chōon Vowel: expected 30 items, got ${vowelPairs.length}`);
  assert.strictEqual(sokuonPairs.length, 30, `Sokuon Stop: expected 30 items, got ${sokuonPairs.length}`);
  assert.strictEqual(nasalPairs.length, 20, `Geminate Nasal: expected 20 items, got ${nasalPairs.length}`);
  assert.strictEqual(rlPairs.length, 10, `Liquid R vs L: expected 10 items, got ${rlPairs.length}`);
  assert.strictEqual(gembaPairs.length, 15, `Gemba K3 Devoicing: expected 15 items, got ${gembaPairs.length}`);

  const totalSum = pitchPairs.length + vowelPairs.length + sokuonPairs.length + nasalPairs.length + rlPairs.length + gembaPairs.length;
  assert.strictEqual(totalSum, 150, `Sum of partitioned domains must equal 150, got ${totalSum}`);

  // Check item structure integrity
  allPairs.forEach((item, idx) => {
    assert(item.pair_id, `Item #${idx} missing pair_id`);
    assert(item.title, `Item #${idx} missing title`);
    assert(item.word_a, `Item #${idx} missing word_a`);
    assert(item.word_b, `Item #${idx} missing word_b`);
    assert(item.word_a.kana, `Item #${idx} word_a missing kana`);
    assert(item.word_b.kana, `Item #${idx} word_b missing kana`);
    assert(item.word_a.meaning_id, `Item #${idx} word_a missing meaning_id`);
    assert(item.word_b.meaning_id, `Item #${idx} word_b missing meaning_id`);
    assert(item.phonological_contrast_domain, `Item #${idx} missing phonological_contrast_domain`);
    assert(item.word_a.audio_tokens.length === 4, `Item #${idx} word_a must have 4 speaker tokens`);
    assert(item.word_b.audio_tokens.length === 4, `Item #${idx} word_b must have 4 speaker tokens`);
  });

  console.log('✅ [PASS] T-1: All 150 phonological contrast items partitioned with 100% domain coverage.');

  // ── T-2: 4-Speaker Acoustic Contrast Matrix ──
  console.log('--- [T-2] 4-Speaker Acoustic Contrast Matrix ---');

  assert.strictEqual(HVPT_SPEAKERS.length, 4, 'Must have exactly 4 native speaker profiles');

  const [m1, f1, m2, f2] = HVPT_SPEAKERS;
  assert.strictEqual(m1.key, 'speaker_m1');
  assert.strictEqual(m1.gender, 'M');
  assert.strictEqual(m1.age_group, 'young');

  assert.strictEqual(f1.key, 'speaker_f1');
  assert.strictEqual(f1.gender, 'F');
  assert.strictEqual(f1.age_group, 'young');

  assert.strictEqual(m2.key, 'speaker_m2');
  assert.strictEqual(m2.gender, 'M');
  assert.strictEqual(m2.age_group, 'senior');

  assert.strictEqual(f2.key, 'speaker_f2');
  assert.strictEqual(f2.gender, 'F');
  assert.strictEqual(f2.age_group, 'senior');

  // Invariant 1: Female voice pitch must be significantly higher than Male voice pitch
  assert(f1.pitch > m1.pitch, `F1 pitch (${f1.pitch}) must be higher than M1 pitch (${m1.pitch})`);
  assert(f2.pitch > m2.pitch, `F2 pitch (${f2.pitch}) must be higher than M2 pitch (${m2.pitch})`);

  // Invariant 2: Senior speakers have slower pacing (rate <= 0.90) than young speakers (rate = 1.0)
  assert(m2.rate < m1.rate, `Senior M2 rate (${m2.rate}) must be slower than young M1 rate (${m1.rate})`);
  assert(f2.rate < f1.rate, `Senior F2 rate (${f2.rate}) must be slower than young F1 rate (${f1.rate})`);

  console.log('✅ [PASS] T-2: 4-Speaker acoustic matrix (M1, F1, M2, F2) phonetically validated.');

  // ── T-3: Randomized Discrimination Session & Trial Evaluator ──
  console.log('--- [T-3] Randomized Discrimination Session & Trial Evaluator ---');

  const session = await createHVPTSession('sokuon_stop', 10);
  assert(session.session_id.startsWith('hvpt-sess-'), 'Session ID format valid');
  assert.strictEqual(session.pairs.length, 10, 'Session must produce exactly 10 randomized trials');

  session.pairs.forEach((p, idx) => {
    assert(p.target_word === 'A' || p.target_word === 'B', `Trial #${idx} target_word must be 'A' or 'B'`);
    assert.strictEqual(p.phonological_contrast_domain, 'sokuon_stop');
    assert.strictEqual(p.closure_ratio, 180, 'Sokuon stop closure ratio must be 180ms');
  });

  // Evaluate trials
  const trialCorrect = evaluateHVPTTrial({
    pair_id: 'cp-phon-080',
    selected: 'A',
    target: 'A',
    is_correct: true,
    reaction_time_ms: 850,
    speaker_id: 'speaker_m1',
    domain: 'sokuon_stop',
  });
  assert.strictEqual(trialCorrect, true);

  const trialWrong = evaluateHVPTTrial({
    pair_id: 'cp-phon-080',
    selected: 'B',
    target: 'A',
    is_correct: false,
    reaction_time_ms: 1200,
    speaker_id: 'speaker_f1',
    domain: 'sokuon_stop',
  });
  assert.strictEqual(trialWrong, false);

  // Aggregated Statistical Metrics
  const mockResults = [
    { pair_id: 'p1', selected: 'A', target: 'A', is_correct: true, reaction_time_ms: 800, speaker_id: 'speaker_m1', domain: 'sokuon_stop' },
    { pair_id: 'p2', selected: 'B', target: 'B', is_correct: true, reaction_time_ms: 900, speaker_id: 'speaker_f1', domain: 'sokuon_stop' },
    { pair_id: 'p3', selected: 'A', target: 'B', is_correct: false, reaction_time_ms: 1500, speaker_id: 'speaker_m2', domain: 'sokuon_stop' },
    { pair_id: 'p4', selected: 'A', target: 'A', is_correct: true, reaction_time_ms: 1000, speaker_id: 'speaker_f2', domain: 'sokuon_stop' },
  ];

  const summary = summarizeHVPTSession(mockResults);
  assert.strictEqual(summary.total_trials, 4);
  assert.strictEqual(summary.correct_count, 3);
  assert.strictEqual(summary.accuracy_percent, 75);
  assert.strictEqual(summary.average_reaction_time_ms, 1050);
  assert.strictEqual(summary.speaker_breakdown['speaker_m1'].accuracy, 100);
  assert.strictEqual(summary.speaker_breakdown['speaker_m2'].accuracy, 0);

  console.log('✅ [PASS] T-3: Session generator, randomized targets, and statistical summaries verified.');

  // ── T-4: Procedural TTS Synthesizer Non-Throwing Resilience ──
  console.log('--- [T-4] Procedural TTS Synthesizer Non-Throwing Resilience ---');

  await assert.doesNotReject(async () => {
    await playHVPTSpeaker('ぶか', 'speaker_m1');
    await playHVPTSpeaker('ぶっか', 'speaker_f1');
    await playHVPTSpeaker('おばさん', 'speaker_m2');
    await playHVPTSpeaker('おばあさん', 'speaker_f2');
  }, 'playHVPTSpeaker must execute gracefully in Node.js / SSR environment');

  console.log('✅ [PASS] T-4: Multi-speaker synthesis runs safely with zero crashes.');

  // ── T-5: Complete UI & Modal Architecture Integration ──
  console.log('--- [T-5] Complete UI & Modal Architecture Integration ---');

  // Verify file presence
  const hvptPlayerPath = path.join(__dirname, '../src/components/audio/HVPTPlayer.tsx');
  const hvptModalPath = path.join(__dirname, '../src/components/audio/HVPTModal.tsx');
  const modalStorePath = path.join(__dirname, '../src/store/useModalStore.ts');
  const gmmPath = path.join(__dirname, '../src/components/modals/GlobalModalManager.tsx');
  const toolboxPath = path.join(__dirname, '../src/components/tools/StudyToolboxModal.tsx');

  assert(fs.existsSync(hvptPlayerPath), 'HVPTPlayer.tsx must exist');
  assert(fs.existsSync(hvptModalPath), 'HVPTModal.tsx must exist');
  assert(fs.existsSync(modalStorePath), 'useModalStore.ts must exist');
  assert(fs.existsSync(gmmPath), 'GlobalModalManager.tsx must exist');
  assert(fs.existsSync(toolboxPath), 'StudyToolboxModal.tsx must exist');

  // Verify modal store wiring
  const modalStoreCode = fs.readFileSync(modalStorePath, 'utf8');
  assert(modalStoreCode.includes("'hvpt'"), "useModalStore must register 'hvpt' in ModalType");
  assert(modalStoreCode.includes('hvpt: Record<string, never>'), "useModalStore must register hvpt in ModalPropsMap");

  // Verify GlobalModalManager wiring
  const gmmCode = fs.readFileSync(gmmPath, 'utf8');
  assert(gmmCode.includes('HVPTModal'), 'GlobalModalManager must import HVPTModal');
  assert(gmmCode.includes("case 'hvpt':"), "GlobalModalManager must handle case 'hvpt'");
  assert(gmmCode.includes("onOpenHvpt={() => openModal('hvpt')}"), 'GlobalModalManager must wire onOpenHvpt');

  // Verify StudyToolboxModal wiring
  const toolboxCode = fs.readFileSync(toolboxPath, 'utf8');
  assert(toolboxCode.includes("id: 'hvpt'"), "StudyToolboxModal must include 'hvpt' card");
  assert(toolboxCode.includes('onOpenHvpt'), 'StudyToolboxModal must expose onOpenHvpt callback');
  assert(toolboxCode.includes('category: \'phonology\''), "'hvpt' card must be categorized under phonology");

  // Verify mobile touch targets
  const hvptPlayerCode = fs.readFileSync(hvptPlayerPath, 'utf8');
  assert(hvptPlayerCode.includes('min-h-[44px]'), 'HVPTPlayer buttons must enforce min-h-[44px] touch target');
  assert(hvptPlayerCode.includes('overflow-x-hidden'), 'HVPTPlayer container must enforce overflow-x-hidden');

  console.log('✅ [PASS] T-5: Architecture integration across ModalStore, GlobalModalManager & StudyToolbox verified.');

  console.log('\n══════════════════════════════════════════════════════════════════');
  console.log('🎉 SIKLUS V — PASS 17 REGRESSION SUITE: 100% GREEN (5/5 PASS)');
  console.log('══════════════════════════════════════════════════════════════════\n');
}

runPass17Tests().catch((err) => {
  console.error('\n❌ SIKLUS V — PASS 17 TEST FAILURE:');
  console.error(err);
  process.exit(1);
});
