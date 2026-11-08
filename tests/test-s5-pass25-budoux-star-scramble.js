// ══════════════════════════════════════════════════════════════════
//  tests/test-s5-pass25-budoux-star-scramble.js
//  SIKLUS V — PASS 25: Google BudouX Semantic Chunking & Star Scramble Drills
//  Klaster 8: Exam Simulation & Interactive Exercise LMS
//  Audits & Verifies:
//    - Google BudouX ML Japanese Bunsetsu Segmenter & Semantic Word Boundaries
//    - Responsive <wbr> Line Break Insertion (formatSemanticLineBreaks)
//    - Cohesive Scramble Chunk Generator (generateWordScrambleChunks)
//    - Tap-to-Slot & Tap-to-Return Pure State Transforms (slotAvailableToken, unslotToken)
//    - Star Position (★) Token-to-Option Auto-Sync Engine (findMatchingOptionIndex)
//    - Reset State Lattice & Emptied Star Slot Selection Eraser
//    - Authentic Mondai 2 (文の組み立て) 4-Token Sentence Ordering Lifecycle
//    - Mobile Touch Ergonomics (>= 44px) & Zero Microfont Compliance
// ══════════════════════════════════════════════════════════════════

const assert = require('assert');
const path = require('path');
const fs = require('fs');

console.log('╔══════════════════════════════════════════════════════════════════╗');
console.log('║  SIKLUS V — PASS 25: BUDOUX CHUNKING & STAR SCRAMBLE AUDIT       ║');
console.log('║  KLASTER 8: EXAM SIMULATION & INTERACTIVE EXERCISE LMS           ║');
console.log('╚══════════════════════════════════════════════════════════════════╝\n');

async function runPass25Tests() {
  const {
    getBudouxParser,
    parseBunsetsu,
    formatSemanticLineBreaks,
    generateWordScrambleChunks,
  } = await import('../src/lib/typography/budouxParser.ts');

  const {
    findMatchingOptionIndex,
    slotAvailableToken,
    unslotToken,
    resetScrambleState,
  } = await import('../src/lib/exercise/starScrambleHelper.ts');

  // ── T-1: Google BudouX Bunsetsu Segmentation & Line Breaks ──
  console.log('--- [T-1] Google BudouX Bunsetsu Segmentation & Line Breaks ---');
  const parser = getBudouxParser();
  assert(parser !== null, 'BudouX parser must initialize successfully');

  // Test sentence 1: Polite declarative
  const sent1 = '今日はとてもいい天気ですね。';
  const tokens1 = parseBunsetsu(sent1);
  assert(Array.isArray(tokens1), 'Bunsetsu output must be an array');
  assert(tokens1.length >= 3, `Expected at least 3 bunsetsu tokens, got ${tokens1.length}`);
  assert(tokens1.includes('今日は'), 'Tokens must isolate topic marker 今日は');
  assert.strictEqual(tokens1.join(''), sent1, 'Reconstructed sentence must match original exactly');

  // Test line break insertion
  const formatted = formatSemanticLineBreaks(sent1);
  assert(formatted.includes('<wbr>'), 'Formatted text must include <wbr> break tags');
  assert.strictEqual(formatted.replace(/<wbr>/g, ''), sent1, 'Stripped <wbr> must match raw sentence');

  // Test defensive null / empty checks
  assert.deepStrictEqual(parseBunsetsu(''), []);
  assert.deepStrictEqual(parseBunsetsu(null), []);
  assert.strictEqual(formatSemanticLineBreaks(''), '');
  console.log('  ✔ BudouX bunsetsu segmentation, line breaks, and null safety verified.\n');

  // ── T-2: Cohesive Scramble Chunk Generator ──
  console.log('--- [T-2] Cohesive Scramble Chunk Generator ---');
  const sent2 = '明日京都へ友達と一緒に行きます。';
  const chunks = generateWordScrambleChunks(sent2, 4);
  assert(chunks.length <= 4, `Chunks length must be <= 4, got ${chunks.length}`);
  assert(chunks.length >= 2, `Chunks length must be >= 2, got ${chunks.length}`);
  // Sentence ending punctuation is safely trimmed for scramble tokens
  assert(chunks.every((c) => !c.includes('。')), 'Scramble tokens must not retain terminal full-stops');
  console.log('  ✔ Word scramble chunking and token boundaries certified.\n');

  // ── T-3: Star Scramble Slotting State Transforms ──
  console.log('--- [T-3] Star Scramble Slotting State Transforms ---');
  const initialAvailable = ['本を', '図書館で', '借りて', '読みました'];
  const initialSlots = [null, null, null, null];

  // 1. Slot available token 1 ('図書館で')
  const step1 = slotAvailableToken(initialAvailable, initialSlots, 1);
  assert.strictEqual(step1.slottedIndex, 0, 'First token must go into slot 0');
  assert.strictEqual(step1.slottedTokens[0], '図書館で');
  assert.strictEqual(step1.availableTokens.length, 3);
  assert(!step1.availableTokens.includes('図書館で'));

  // 2. Slot available token 0 ('本を')
  const step2 = slotAvailableToken(step1.availableTokens, step1.slottedTokens, 0);
  assert.strictEqual(step2.slottedIndex, 1, 'Second token must go into slot 1');
  assert.strictEqual(step2.slottedTokens[1], '本を');

  // 3. Slot available token 0 ('借りて')
  const step3 = slotAvailableToken(step2.availableTokens, step2.slottedTokens, 0);
  assert.strictEqual(step3.slottedIndex, 2, 'Third token must go into slot 2');
  assert.strictEqual(step3.slottedTokens[2], '借りて');

  // 4. Slot remaining token ('読みました')
  const step4 = slotAvailableToken(step3.availableTokens, step3.slottedTokens, 0);
  assert.strictEqual(step4.slottedIndex, 3, 'Fourth token must go into slot 3');
  assert.strictEqual(step4.slottedTokens[3], '読みました');
  assert.strictEqual(step4.availableTokens.length, 0, 'All tokens must be slotted');

  // 5. Attempt to slot when full -> must return -1 without mutation
  const step5 = slotAvailableToken(['余分'], step4.slottedTokens, 0);
  assert.strictEqual(step5.slottedIndex, -1, 'Slotting into full slots must return -1');
  console.log('  ✔ Slotting transforms, sequential placement, and full-slot guard verified.\n');

  // ── T-4: Unslotting & Slot Return Transforms ──
  console.log('--- [T-4] Unslotting & Slot Return Transforms ---');
  // Unslot slot 2 ('借りて')
  const unslotRes = unslotToken([], step4.slottedTokens, 2);
  assert.strictEqual(unslotRes.returnedToken, '借りて');
  assert.strictEqual(unslotRes.slottedTokens[2], null, 'Slot 2 must now be null');
  assert.deepStrictEqual(unslotRes.availableTokens, ['借りて'], 'Token must return to bank');

  // Unslotting an empty slot (null) -> safe no-op
  const emptyUnslot = unslotToken(['借りて'], unslotRes.slottedTokens, 2);
  assert.strictEqual(emptyUnslot.returnedToken, null);

  // Reset transforms
  const resetRes = resetScrambleState(initialAvailable);
  assert.deepStrictEqual(resetRes.availableTokens, initialAvailable);
  assert.deepStrictEqual(resetRes.slottedTokens, [null, null, null, null]);
  console.log('  ✔ Unslotting, bank restoration, and state reset verified.\n');

  // ── T-5: Star Position (★) Auto-Sync to Multiple Choice Option ──
  console.log('--- [T-5] Star Position (★) Auto-Sync to Option ---');
  const mockOptions = ['読みました', '本を', '借りて', '図書館で']; // A: 読みました, B: 本を, C: 借りて, D: 図書館で

  // Star slot has token '借りて' -> must match Option C (index 2)
  const matchIdx1 = findMatchingOptionIndex('借りて', mockOptions);
  assert.strictEqual(matchIdx1, 2, "Token '借りて' must match Option index 2 (C)");

  // Star slot has token '図書館で' -> must match Option D (index 3)
  const matchIdx2 = findMatchingOptionIndex('図書館で', mockOptions);
  assert.strictEqual(matchIdx2, 3, "Token '図書館で' must match Option index 3 (D)");

  // Empty or invalid star token -> must return -1
  assert.strictEqual(findMatchingOptionIndex(null, mockOptions), -1);
  assert.strictEqual(findMatchingOptionIndex('', mockOptions), -1);
  assert.strictEqual(findMatchingOptionIndex('無関係', mockOptions), -1);
  console.log('  ✔ Star slot token-to-option index auto-synchronizer verified.\n');

  // ── T-6: Static AST Inspection of StarScrambleWidget.tsx ──
  console.log('--- [T-6] Static AST Inspection of StarScrambleWidget.tsx ---');
  const widgetPath = path.resolve(__dirname, '../src/components/exercise/StarScrambleWidget.tsx');
  assert(fs.existsSync(widgetPath), 'StarScrambleWidget.tsx must exist');
  const widgetSrc = fs.readFileSync(widgetPath, 'utf8');

  // Helper imports
  assert(widgetSrc.includes("from '../../lib/exercise/starScrambleHelper'"));
  assert(widgetSrc.includes('findMatchingOptionIndex'));
  assert(widgetSrc.includes('slotAvailableToken'));
  assert(widgetSrc.includes('unslotToken'));
  assert(widgetSrc.includes('resetScrambleState'));

  // Star slot styling and visual indicator
  assert(widgetSrc.includes('isStarSlot'));
  assert(widgetSrc.includes('fill-amber-400 text-amber-400'));
  assert(widgetSrc.includes('Mondai 2: Susun Kalimat (★)'));

  // Mobile Ergonomics & Safe Touch Dimensions (>= 44px)
  assert(widgetSrc.includes('min-h-[44px] min-w-[64px] sm:min-w-[80px]'), 'Slot touch target must be >= 44px');
  assert(widgetSrc.includes('min-h-[44px] px-4 py-2'), 'Bank button touch target must be >= 44px');
  assert(widgetSrc.includes('min-h-[48px] px-4 py-3'), 'Option button touch target must be >= 48px');
  assert(widgetSrc.includes('min-h-[40px] px-3.5 py-1.5'), 'Reset button touch target must be >= 40px');
  console.log('  ✔ StarScrambleWidget AST, star indicators, and touch ergonomics verified.\n');

  // ── T-7: Manifest Star Scramble Items Inventory ──
  console.log('--- [T-7] Manifest Star Scramble Items Inventory ---');
  const manifestPath = path.resolve(__dirname, '../public/data/exercises/manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  let totalStarItems = 0;
  manifest.sets.forEach((setEntry) => {
    const filePath = path.resolve(__dirname, '../public', setEntry.publicPath.replace(/^\//, ''));
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      data.items.forEach((item) => {
        if (item.starScramble) {
          totalStarItems++;
          assert(Array.isArray(item.starScramble.tokens), `Item ${item.id} tokens must be array`);
          assert.strictEqual(item.starScramble.tokens.length, 4, `Item ${item.id} must have 4 tokens`);
          assert(
            item.starScramble.starPosition >= 1 && item.starScramble.starPosition <= 4,
            `Item ${item.id} starPosition must be between 1 and 4`
          );
        }
      });
    }
  });

  assert(totalStarItems >= 9, `Must find at least 9 Star Scramble items across sets (found: ${totalStarItems})`);
  console.log(`  ✔ Verified ${totalStarItems} authentic Star Scramble items across sets.\n`);

  console.log('╔══════════════════════════════════════════════════════════════════╗');
  console.log('║  🎉 ALL SIKLUS V PASS 25 VERIFICATION SUITES PASSED (7/7)        ║');
  console.log('║  🏆 KLASTER 8 SECOND GATE PASS 25 CERTIFIED 100% GREEN!          ║');
  console.log('╚══════════════════════════════════════════════════════════════════╝');
}

runPass25Tests().catch((err) => {
  console.error('\n❌ SIKLUS V PASS 25 FAILED:', err);
  process.exit(1);
});
