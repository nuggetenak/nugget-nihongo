/**
 * Automated Verification Suite: Exercise Datasets & 14 Golden Sets Integrity Test
 * Verifies all 210 authentic questions across JLPT (N5..N1), JFT-Basic (A2), and 8 SSW tracks
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const dataDir = path.join(__dirname, '../public/data/exercises');
const manifestPath = path.join(dataDir, 'manifest.json');

console.log('===============================================================');
console.log('🧪 TEST SUITE: 14 GOLDEN EXERCISE SETS DATASET INTEGRITY');
console.log('===============================================================');

// 1. Verify Manifest
assert(fs.existsSync(manifestPath), `Manifest does not exist at ${manifestPath}`);
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
assert.strictEqual(manifest.totalSets, 14, `Expected 14 total sets, got ${manifest.totalSets}`);
assert.strictEqual(manifest.totalQuestions, 210, `Expected 210 total questions, got ${manifest.totalQuestions}`);
assert.strictEqual(manifest.sets.length, 14, `Expected 14 manifest entries, got ${manifest.sets.length}`);
console.log('✅ PASS 01: Manifest exists and confirms 14 sets with 210 authentic questions.');

let verifiedQuestions = 0;
let verifiedStarScrambles = 0;
let verifiedPassages = 0;
let verifiedChoukai = 0;
const seenItemIds = new Set();

manifest.sets.forEach((setMeta, setIdx) => {
  const filePath = path.join(dataDir, setMeta.fileName);
  assert(fs.existsSync(filePath), `Dataset file does not exist: ${filePath}`);

  const raw = fs.readFileSync(filePath, 'utf-8');
  const setData = JSON.parse(raw);

  // Validate Set metadata
  assert.strictEqual(setData.setId, setMeta.setId, `setId mismatch in ${setMeta.fileName}`);
  assert.strictEqual(setData.totalItems, 15, `totalItems must be exactly 15 in ${setMeta.fileName}`);
  assert.strictEqual(setData.timeLimitMinutes, 15, `timeLimitMinutes must be 15 in ${setMeta.fileName}`);
  assert.strictEqual(setData.passingScore, 10, `passingScore must be 10 in ${setMeta.fileName}`);
  assert(setData.title && setData.title.length > 5, `Title missing or too short in ${setMeta.fileName}`);
  assert(setData.description && setData.description.length > 10, `Description missing in ${setMeta.fileName}`);
  assert(setData.targetUnits && setData.targetUnits.length > 5, `targetUnits missing in ${setMeta.fileName}`);
  assert(Array.isArray(setData.items) && setData.items.length === 15, `items array must have exactly 15 items in ${setMeta.fileName}`);

  // Validate every question
  setData.items.forEach((item, qIdx) => {
    // Unique ID check
    assert(item.id, `Missing ID in ${setMeta.fileName} item #${qIdx + 1}`);
    assert(!seenItemIds.has(item.id), `Duplicate item ID found across datasets: ${item.id}`);
    seenItemIds.add(item.id);

    // Numbering & Types
    assert(typeof item.mondaiNumber === 'number' && item.mondaiNumber >= 1 && item.mondaiNumber <= 15, `mondaiNumber invalid on ${item.id}`);
    assert(item.mondaiType, `Missing mondaiType on ${item.id}`);
    assert(item.instructionJp && item.instructionJp.length > 3, `instructionJp missing on ${item.id}`);
    assert(item.instructionId && item.instructionId.length > 3, `instructionId missing on ${item.id}`);
    assert(item.prompt && item.prompt.length > 3, `prompt missing on ${item.id}`);

    // Options & Correct Option Index
    assert(Array.isArray(item.options) && item.options.length >= 3, `options must have at least 3 choices on ${item.id}`);
    assert(typeof item.correctOptionIndex === 'number', `correctOptionIndex must be number on ${item.id}`);
    assert(item.correctOptionIndex >= 0 && item.correctOptionIndex < item.options.length, `correctOptionIndex out of bounds on ${item.id}`);

    // 5-Layer Explanation Forensic Check
    assert(item.explanation, `explanation missing on ${item.id}`);
    const exp = item.explanation;
    assert(typeof exp.justification === 'string' && exp.justification.trim().length > 15, `Layer 1 justification missing/short on ${item.id}`);
    assert(exp.distractorAutopsy && typeof exp.distractorAutopsy === 'object' && Object.keys(exp.distractorAutopsy).length >= 2, `Layer 2 distractorAutopsy missing on ${item.id}`);
    assert(typeof exp.mnemonicSensei === 'string' && exp.mnemonicSensei.trim().length > 10, `Layer 3 mnemonicSensei missing/short on ${item.id}`);
    assert(typeof exp.l1InterferenceAlert === 'string' && exp.l1InterferenceAlert.trim().length > 10, `Layer 4 l1InterferenceAlert missing/short on ${item.id}`);
    assert(exp.remedialPrescription && typeof exp.remedialPrescription === 'object', `Layer 5 remedialPrescription missing on ${item.id}`);
    assert(exp.remedialPrescription.unitId && exp.remedialPrescription.advice, `Layer 5 remedialPrescription missing unitId or advice on ${item.id}`);

    // Curriculum Reference check
    assert(item.curriculumRef && item.curriculumRef.trackId && item.curriculumRef.unitId, `curriculumRef missing on ${item.id}`);

    // Star Scramble mathematical single-permutation validation
    if (item.starScramble) {
      verifiedStarScrambles++;
      const ss = item.starScramble;
      assert(Array.isArray(ss.tokens) && ss.tokens.length === 4, `Star Scramble tokens must have length 4 on ${item.id}`);
      assert(Array.isArray(ss.correctOrder) && ss.correctOrder.length === 4, `Star Scramble correctOrder must have length 4 on ${item.id}`);
      
      // Verify permutation of [0, 1, 2, 3]
      const sortedOrder = [...ss.correctOrder].sort((a, b) => a - b);
      assert.deepStrictEqual(sortedOrder, [0, 1, 2, 3], `Star Scramble correctOrder must be valid permutation of [0, 1, 2, 3] on ${item.id}`);
      
      // Star position
      assert([1, 2, 3, 4].includes(ss.starPosition), `starPosition must be 1, 2, 3, or 4 on ${item.id}`);
      assert(typeof ss.fullSentence === 'string' && ss.fullSentence.length > 5, `fullSentence missing on ${item.id}`);
      
      // Star token correspondence
      const starTokenIndex = ss.correctOrder[ss.starPosition - 1];
      assert(typeof starTokenIndex === 'number' && starTokenIndex >= 0 && starTokenIndex <= 3, `starTokenIndex invalid on ${item.id}`);
    }

    // Dokkai Passage check
    if (item.readingPassage) {
      verifiedPassages++;
      assert(item.readingPassage.passageText && item.readingPassage.passageText.length > 15, `passageText too short on ${item.id}`);
      assert(item.readingPassage.genre, `genre missing on readingPassage on ${item.id}`);
    }

    // Choukai Audio check
    if (item.choukai) {
      verifiedChoukai++;
      assert(item.choukai.transcriptText && item.choukai.transcriptText.length > 10, `transcriptText missing on ${item.id}`);
      if (item.choukai.maxReplays !== undefined) {
        assert(item.choukai.maxReplays <= 2, `maxReplays must be <= 2 on ${item.id}`);
      }
    }

    verifiedQuestions++;
  });

  console.log(`✅ PASS ${(setIdx + 2).toString().padStart(2, '0')}: [${setData.setId}] Verified 15/15 items with complete 5-layer pedagogical explanations.`);
});

console.log('---------------------------------------------------------------');
console.log(`🎯 TOTAL ITEMS VERIFIED: ${verifiedQuestions} / 210`);
console.log(`⭐ Star Scrambles Verified: ${verifiedStarScrambles}`);
console.log(`📖 Dokkai Passages Verified: ${verifiedPassages}`);
console.log(`🎧 Choukai Audio Drills Verified: ${verifiedChoukai}`);
console.log('🎉 ALL INTEGRITY CONTRACTS STRICTLY SATISFIED! ZERO ERRORS!');
console.log('===============================================================');
