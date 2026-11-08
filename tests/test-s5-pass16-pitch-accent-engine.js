// ══════════════════════════════════════════════════════════════════
//  tests/test-s5-pass16-pitch-accent-engine.js
//  SIKLUS V — PASS 16: Tokyo Pitch Accent Contour & Mora Visualizer
//  Klaster 6: Audio, Phonetics & Listening Immersion (Latent Module)
//  Audits & Verifies:
//    - 4 Tokyo Pitch Accent Patterns: Heiban (0), Atamadaka (1), Nakadaka (2..N-1), Odaka (N)
//    - Phonological Precision: Digraph fusion (youon), geminate sokuon, chouonpu
//    - Defensive normalization: Out-of-bounds pitch, negative, NaN, empty strings
//    - OJAD & Wadoku Master Corpus: 56,721 entries loaded via universal loader
//    - Homophone Minimal Pairs: 16 curated pairs including Ame, Hashi, Haru
//    - Pitch Search Engine & Ear Training Quiz Questions
//    - Procedural Web Audio Synthesizer zero-crash resilience
// ══════════════════════════════════════════════════════════════════

const assert = require('assert');
const path = require('path');
const fs = require('fs');

console.log('╔══════════════════════════════════════════════════════════════════╗');
console.log('║   SIKLUS V — PASS 16: TOKYO PITCH ACCENT CONTOUR & MORA ENGINE   ║');
console.log('╚══════════════════════════════════════════════════════════════════╝\n');

async function runPass16Tests() {
  const {
    calculatePitchContour,
    getPitchContourForWord,
    playPitchToneMelody,
    splitIntoMoras,
  } = await import('../src/lib/pitch/pitchEngine.ts');

  const {
    loadPitchAccentIndex,
    lookupPitch,
    getPitchCategory,
    formatTokyoContour,
  } = await import('../src/lib/data/pitchAccentManager.ts');

  const {
    MINIMAL_PAIRS,
    getAllMinimalPairs,
    getMinimalPairById,
    searchMinimalPairs,
    getPatternWords,
    getPitchQuizQuestions,
  } = await import('../src/lib/pitch/pitchData.ts');

  // ── T-1: Phonology & 4 Tokyo Pitch Accent Categories ──
  console.log('--- [T-1] Phonology & 4 Tokyo Pitch Accent Categories ---');

  // 1. Heiban (0): Low 1st mora, High subsequent, High particle
  const heiban = calculatePitchContour('さくら', 0);
  assert.strictEqual(heiban.category, 'heiban');
  assert.strictEqual(heiban.particlePitch, 'high');
  assert.strictEqual(heiban.moras.length, 3);
  assert.strictEqual(heiban.moras[0].isHigh, false, 'Heiban 1st mora must be Low');
  assert.strictEqual(heiban.moras[1].isHigh, true, 'Heiban 2nd mora must be High');
  assert.strictEqual(heiban.moras[2].isHigh, true, 'Heiban 3rd mora must be High');
  assert.strictEqual(heiban.moras[0].hasDrop, false);
  assert.strictEqual(heiban.moras[1].hasDrop, false);
  assert.strictEqual(heiban.moras[2].hasDrop, false, 'Heiban has no drop');

  // 2. Atamadaka (1): High 1st mora with drop, Low subsequent, Low particle
  const atamadaka = calculatePitchContour('あめ', 1);
  assert.strictEqual(atamadaka.category, 'atamadaka');
  assert.strictEqual(atamadaka.particlePitch, 'low');
  assert.strictEqual(atamadaka.moras.length, 2);
  assert.strictEqual(atamadaka.moras[0].isHigh, true, 'Atamadaka 1st mora must be High');
  assert.strictEqual(atamadaka.moras[0].hasDrop, true, 'Atamadaka 1st mora must drop');
  assert.strictEqual(atamadaka.moras[1].isHigh, false, 'Atamadaka 2nd mora must be Low');
  assert.strictEqual(atamadaka.moras[1].hasDrop, false);

  // 3. Nakadaka (2 in 3-mora word): Low 1st, High 2nd with drop, Low 3rd, Low particle
  const nakadaka = calculatePitchContour('たまご', 2);
  assert.strictEqual(nakadaka.category, 'nakadaka');
  assert.strictEqual(nakadaka.particlePitch, 'low');
  assert.strictEqual(nakadaka.moras.length, 3);
  assert.strictEqual(nakadaka.moras[0].isHigh, false, 'Nakadaka 1st mora must be Low');
  assert.strictEqual(nakadaka.moras[1].isHigh, true, 'Nakadaka 2nd mora must be High');
  assert.strictEqual(nakadaka.moras[1].hasDrop, true, 'Nakadaka drop mora must drop');
  assert.strictEqual(nakadaka.moras[2].isHigh, false, 'Nakadaka 3rd mora must be Low');

  // 4. Odaka (N in N-mora word): Low 1st, High remainder, Low particle
  const odaka = calculatePitchContour('はな', 2);
  assert.strictEqual(odaka.category, 'odaka');
  assert.strictEqual(odaka.particlePitch, 'low');
  assert.strictEqual(odaka.moras.length, 2);
  assert.strictEqual(odaka.moras[0].isHigh, false, 'Odaka 1st mora Low');
  assert.strictEqual(odaka.moras[1].isHigh, true, 'Odaka 2nd mora High');
  assert.strictEqual(odaka.moras[1].hasDrop, true, 'Odaka drops onto particle');

  console.log('✅ [PASS] T-1: All 4 Tokyo pitch categories (Heiban, Atamadaka, Nakadaka, Odaka) verified.');

  // ── T-2: Mora Tokenization & Phonological Edge Cases ──
  console.log('--- [T-2] Mora Tokenization & Phonological Edge Cases ---');

  // Digraphs (youon) must fuse into a single mora
  assert.deepStrictEqual(splitIntoMoras('きょうしつ'), ['きょ', 'う', 'し', 'つ']);
  assert.deepStrictEqual(splitIntoMoras('びょういん'), ['びょ', 'う', 'い', 'ん']);
  assert.deepStrictEqual(splitIntoMoras('しゅくだい'), ['しゅ', 'く', 'だ', 'い']);

  // Geminate consonant (sokuon)
  assert.deepStrictEqual(splitIntoMoras('きって'), ['き', 'っ', 'て']);

  // Single mora word: e.g. ha (歯 1 vs 葉 0)
  const ha1 = calculatePitchContour('は', 1);
  assert.strictEqual(ha1.moras.length, 1);
  assert.strictEqual(ha1.moras[0].isHigh, true);
  assert.strictEqual(ha1.moras[0].hasDrop, true);

  const ha0 = calculatePitchContour('は', 0);
  assert.strictEqual(ha0.moras.length, 1);
  assert.strictEqual(ha0.category, 'heiban');
  assert.strictEqual(ha0.particlePitch, 'high');

  // Defensive handling of empty / invalid inputs
  const empty = calculatePitchContour('', 0);
  assert.strictEqual(empty.moras.length, 0);
  assert.strictEqual(empty.category, 'heiban');

  const negPitch = calculatePitchContour('ねこ', -5);
  assert.strictEqual(negPitch.category, 'heiban', 'Negative pitch clamped to 0');

  const overPitch = calculatePitchContour('ねこ', 999);
  assert.strictEqual(overPitch.category, 'odaka', 'Oversized pitch clamped to totalMoras');

  const nanPitch = calculatePitchContour('ねこ', NaN);
  assert.strictEqual(nanPitch.category, 'heiban', 'NaN pitch clamped to 0');

  console.log('✅ [PASS] T-2: Digraphs, sokuon, single-mora words, and defensive clamps verified.');

  // ── T-3: Master Corpus Index & Universal Loader (56,721 Entries) ──
  console.log('--- [T-3] Master Corpus Index & Universal Loader ---');

  const masterIndex = await loadPitchAccentIndex();
  const entryCount = Object.keys(masterIndex).length;
  assert(entryCount >= 56700, `Expected at least 56,700 entries, found ${entryCount}`);
  console.log(`  📊 Loaded ${entryCount} OJAD / Wadoku pitch accent entries.`);

  // Verify key minimal pair lookups
  const rain = lookupPitch('雨', 'あめ');
  assert(rain, 'Lookup 雨 should exist');
  assert.strictEqual(rain.pattern, 1);
  assert.strictEqual(rain.category, 'atamadaka');

  const candy = lookupPitch('飴', 'あめ');
  assert(candy, 'Lookup 飴 should exist');
  assert.strictEqual(candy.pattern, 0);
  assert.strictEqual(candy.category, 'heiban');

  const chopstick = lookupPitch('箸', 'はし');
  assert(chopstick, 'Lookup 箸 should exist');
  assert.strictEqual(chopstick.pattern, 1);
  assert.strictEqual(chopstick.category, 'atamadaka');

  const bridge = lookupPitch('橋', 'はし');
  assert(bridge, 'Lookup 橋 should exist');
  assert.strictEqual(bridge.pattern, 2);
  assert.strictEqual(bridge.category, 'odaka');

  const spring = lookupPitch('春', 'はる');
  assert(spring, 'Lookup 春 should exist');
  assert.strictEqual(spring.pattern, 1);

  const paste = lookupPitch('貼る', 'はる');
  assert(paste, 'Lookup 貼る should exist');
  assert.strictEqual(paste.pattern, 0);

  // Combined contour resolver
  const contourResult = getPitchContourForWord('雨', 'あめ');
  assert(contourResult, 'getPitchContourForWord should return result');
  assert.strictEqual(contourResult.category, 'atamadaka');
  assert.strictEqual(contourResult.entry.pattern, 1);
  assert.strictEqual(contourResult.moras[0].isHigh, true);

  console.log('✅ [PASS] T-3: Universal 56,721-entry loader and homophone lookups verified.');

  // ── T-4: Curated Minimal Pairs & Query Search Engine ──
  console.log('--- [T-4] Curated Minimal Pairs & Query Search Engine ---');

  const allPairs = getAllMinimalPairs();
  assert(allPairs.length >= 16, `Expected at least 16 minimal pairs, got ${allPairs.length}`);

  allPairs.forEach((pair, idx) => {
    assert(pair.id, `Pair #${idx} missing id`);
    assert(pair.title, `Pair #${idx} missing title`);
    assert(pair.reading, `Pair #${idx} missing reading`);
    assert(pair.blunderContext, `Pair #${idx} missing blunderContext`);
    assert(pair.wordA, `Pair #${idx} missing wordA`);
    assert(pair.wordB, `Pair #${idx} missing wordB`);
    assert(pair.mnemonicId, `Pair #${idx} missing mnemonicId`);

    // Verify wordA vs wordB have contrasting pitch categories or numbers
    assert(
      pair.wordA.pitchNumber !== pair.wordB.pitchNumber || pair.wordA.category !== pair.wordB.category,
      `Minimal pair ${pair.id} (${pair.title}) does not have contrasting pitch numbers or categories!`
    );
  });

  // Verify Haru minimal pair
  const haruPair = getMinimalPairById('mp-haru');
  assert(haruPair, 'Minimal pair mp-haru should exist');
  assert.strictEqual(haruPair.wordA.kanji, '春');
  assert.strictEqual(haruPair.wordA.pitchNumber, 1);
  assert.strictEqual(haruPair.wordB.kanji, '貼る');
  assert.strictEqual(haruPair.wordB.pitchNumber, 0);

  // Search helper verification
  const searchAme = searchMinimalPairs('hujan');
  assert(searchAme.some((p) => p.id === 'mp-ame'), 'Search "hujan" should find mp-ame');

  const searchHashi = searchMinimalPairs('sumpit');
  assert(searchHashi.some((p) => p.id === 'mp-hashi'), 'Search "sumpit" should find mp-hashi');

  const searchHaru = searchMinimalPairs('musim semi');
  assert(searchHaru.some((p) => p.id === 'mp-haru'), 'Search "musim semi" should find mp-haru');

  console.log('✅ [PASS] T-4: 16 minimal pairs and multi-query search engine verified.');

  // ── T-5: Pattern Exemplars, Ear Training Quiz & Procedural Audio Resilience ──
  console.log('--- [T-5] Pattern Exemplars, Ear Quiz & Procedural Audio Resilience ---');

  const categories = ['heiban', 'atamadaka', 'nakadaka', 'odaka'];
  categories.forEach((cat) => {
    const words = getPatternWords(cat);
    assert(words.length >= 4, `Category ${cat} should have at least 4 exemplar words, got ${words.length}`);
    words.forEach((w) => {
      assert.strictEqual(w.category, cat, `Word ${w.kanji} category mismatch: expected ${cat}, got ${w.category}`);
    });
  });

  const quiz = getPitchQuizQuestions();
  assert.strictEqual(quiz.length, 10, 'Expected 10 ear training quiz questions');
  quiz.forEach((q, idx) => {
    assert(q.id, `Quiz #${idx} missing id`);
    assert(q.question, `Quiz #${idx} missing question`);
    assert(q.options.length >= 2, `Quiz #${idx} must have at least 2 options`);
    const correctOpts = q.options.filter((o) => o.isCorrect);
    assert.strictEqual(correctOpts.length, 1, `Quiz #${idx} must have exactly 1 correct answer`);
    assert(correctOpts[0].explanation, `Quiz #${idx} correct answer must have explanation`);
  });

  // Test procedural tone synthesizer non-throwing resilience in Node.js
  assert.doesNotThrow(() => {
    playPitchToneMelody(heiban.moras, heiban.particlePitch);
    playPitchToneMelody(atamadaka.moras, atamadaka.particlePitch);
  }, 'playPitchToneMelody should safely fall back and never throw when Web Audio is unavailable');

  console.log('✅ [PASS] T-5: 4 pattern exemplars, 10 quiz questions, and zero-crash audio resilience verified.');

  console.log('\n══════════════════════════════════════════════════════════════════');
  console.log('🎉 SIKLUS V — PASS 16 REGRESSION SUITE: 100% GREEN (5/5 PASS)');
  console.log('══════════════════════════════════════════════════════════════════\n');
}

runPass16Tests().catch((err) => {
  console.error('\n❌ SIKLUS V — PASS 16 TEST FAILURE:');
  console.error(err);
  process.exit(1);
});
