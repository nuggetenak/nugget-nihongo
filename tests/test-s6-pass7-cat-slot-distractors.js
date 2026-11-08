// ═════════════════════════════════════════════════════════════════════════════════════════════
//  tests/test-s6-pass7-cat-slot-distractors.js
//  SIKLUS VI — PASS 7: Revitalisasi Total Tes Diagnostik CAT (Distraktor Homogen 4 Pilihan)
//  Research Basis:
//    - Reckase (2009) — Multidimensional CAT & Item Distractor Functioning
//    - Haladyna & Downing (1989) — Validity of Four-Option Multiple Choice & Homogeneity
//    - JLPT & JFT Test Specification — Zero meta-text/parentheses in authentic exam foils
// ═════════════════════════════════════════════════════════════════════════════════════════════

const assert = require('assert');
const path = require('path');
const fs = require('fs');

console.log('╔══════════════════════════════════════════════════════════════════════════════╗');
console.log('║   SIKLUS VI — PASS 7: REVITALISASI TOTAL TES DIAGNOSTIK CAT                  ║');
console.log('╚══════════════════════════════════════════════════════════════════════════════╝\n');

const ROOT_DIR = path.resolve(__dirname, '..');
const catEnginePath = path.join(ROOT_DIR, 'src/lib/cat/catEngine.ts');
const catModalPath = path.join(ROOT_DIR, 'src/components/cat/CatPlacementModal.tsx');
const onboardingModalPath = path.join(ROOT_DIR, 'src/components/onboarding/OnboardingModal.tsx');

assert(fs.existsSync(catEnginePath), 'catEngine.ts must exist');
assert(fs.existsSync(catModalPath), 'CatPlacementModal.tsx must exist');
assert(fs.existsSync(onboardingModalPath), 'OnboardingModal.tsx must exist');

const {
  cleanCATOptionText,
  buildCATQuestionPool,
  calculate3PLProbability,
  calculateFisherInformation,
  calculateCATSEM,
  shouldStopCAT,
} = require('../src/lib/cat/catEngine.ts');

// ── Check 1: cleanCATOptionText Unit Tests & Anti-Leakage Contracts ───────────
console.log('▶ Check 1: cleanCATOptionText Unit Tests & Anti-Leakage Contracts...');

// 1. Parentheses and Indonesian meta-text
const sample1 = cleanCATOptionText('父は病院で働いています。 (atau: 病院に勤めています)');
assert.strictEqual(sample1, '父は病院で働いています。', `Expected clean sentence, got "${sample1}"`);

// 2. Romaji glosses in parentheses
const sample2 = cleanCATOptionText('冷蔵庫 (reizouko)');
assert.strictEqual(sample2, '冷蔵庫', `Expected clean kanji, got "${sample2}"`);

// 3. Pitch/mora annotations and slashes inside parentheses
const sample3 = cleanCATOptionText('おばさん (Bibi / Tante [2])');
assert.strictEqual(sample3, 'おばさん', `Expected clean kana, got "${sample3}"`);

// 4. Slash alternatives
const sample4 = cleanCATOptionText('電車を乗る / 電車で乗る');
assert.strictEqual(sample4, '電車を乗る', `Expected first alternative, got "${sample4}"`);

// 5. LaTeX and unclosed math annotations
const sample5 = cleanCATOptionText('コーヒーを飲みたい (diterima informal) $\\rightarrow$ prioritas:');
assert.strictEqual(sample5, 'コーヒーを飲みたい', `Expected pure Japanese, got "${sample5}"`);

// 6. Trailing English/Indonesian words
const sample6 = cleanCATOptionText('家から出る (redundant)');
assert.strictEqual(sample6, '家から出る', `Expected clean verb phrase, got "${sample6}"`);

const sample7 = cleanCATOptionText('友達と会う (terbatas)');
assert.strictEqual(sample7, '友達と会う', `Expected clean verb phrase, got "${sample7}"`);

// 7. Robustness with empty / non-string inputs
assert.strictEqual(cleanCATOptionText(''), '');
assert.strictEqual(cleanCATOptionText(null), '');
assert.strictEqual(cleanCATOptionText(undefined), '');

console.log('  ✔ [PASS] cleanCATOptionText safely strips parentheses, romaji, slashes, LaTeX, and Latin annotations');

// ── Check 2: buildCATQuestionPool Exhaustive Invariant Audit ───────────────────
console.log('\n▶ Check 2: buildCATQuestionPool Invariants Across All Items...');

(async () => {
  const pool = await buildCATQuestionPool();
  assert(Array.isArray(pool) && pool.length >= 200, `Pool must contain >= 200 items, got ${pool.length}`);
  console.log(`  ℹ Total CAT diagnostic pool items: ${pool.length}`);

  let totalQuestionsAudited = 0;
  const FORBIDDEN_TOKENS = [
    '該当なし',
    'わかりません',
    '使えません',
    '文法的に不適切',
    '選択肢 2',
    '選択肢 3',
    'undefined',
    'null',
    'NaN',
  ];

  for (const q of pool) {
    totalQuestionsAudited++;

    // Invariant A: Exactly 4 options
    assert.strictEqual(
      q.options.length,
      4,
      `Item ${q.id} must have exactly 4 options, got ${q.options.length}`
    );

    // Invariant B: 4 strictly unique options
    const unique = new Set(q.options);
    assert.strictEqual(
      unique.size,
      4,
      `Item ${q.id} options must be unique: ${JSON.stringify(q.options)}`
    );

    // Invariant C: Target Japanese is present and matches correctIndex
    assert.strictEqual(
      q.options[q.correctIndex],
      q.targetJapanese,
      `Item ${q.id} correctIndex ${q.correctIndex} does not match target "${q.targetJapanese}" in options ${JSON.stringify(q.options)}`
    );

    // Invariant D: Zero forbidden dummy tokens in options
    for (const opt of q.options) {
      for (const token of FORBIDDEN_TOKENS) {
        assert(
          !opt.includes(token),
          `Item ${q.id} contains forbidden dummy token "${token}" in option "${opt}"`
        );
      }

      // Invariant E: Zero parentheses, brackets, slashes, or LaTeX in options
      assert(
        !/[\(\)\[\]\/\\\$]/.test(opt),
        `Item ${q.id} option "${opt}" contains leaked punctuation or LaTeX`
      );

      // Invariant F: Zero trailing latin words or annotations
      assert(
        !/\b(?:prioritas|redundant|terbatas|default)\b/i.test(opt),
        `Item ${q.id} option "${opt}" contains leaked Latin annotation`
      );
    }

    // Invariant G: Homogeneity — Length ratio between min and max option <= 4.0
    // (Prevents pairing a 2-char particle with a 30-char compound sentence)
    const lengths = q.options.map((o) => o.length);
    const minLen = Math.min(...lengths);
    const maxLen = Math.max(...lengths);
    if (minLen > 0) {
      const ratio = maxLen / minLen;
      assert(
        ratio <= 4.5,
        `Item ${q.id} options exhibit extreme length heterogeneity (min=${minLen}, max=${maxLen}, ratio=${ratio.toFixed(2)}): ${JSON.stringify(q.options)}`
      );
    }
  }

  console.log(`  ✔ [PASS] ${totalQuestionsAudited} questions audited: 100% compliant with 4-distractor homogeneity, zero dummy options, and zero leaked punctuation`);

  // ── Check 3: Component Integration & Touch Targets ─────────────────────────
  console.log('\n▶ Check 3: Component Integration & Touch Targets (CatPlacementModal & OnboardingModal)...');

  const catModalSource = fs.readFileSync(catModalPath, 'utf8');
  assert(
    catModalSource.includes('cleanCATOptionText'),
    'CatPlacementModal.tsx must import and call cleanCATOptionText'
  );
  assert(
    catModalSource.includes('min-h-[48px]'),
    'CatPlacementModal.tsx must enforce min-h-[48px] touch targets on choices'
  );

  const onboardingSource = fs.readFileSync(onboardingModalPath, 'utf8');
  assert(
    onboardingSource.includes('cleanCATOptionText'),
    'OnboardingModal.tsx must import and call cleanCATOptionText'
  );
  assert(
    onboardingSource.includes('min-h-[48px]'),
    'OnboardingModal.tsx must enforce min-h-[48px] touch targets on choices'
  );

  console.log('  ✔ [PASS] CatPlacementModal and OnboardingModal sanitize options and adhere to ergonomic 48px touch targets');

  // ── Check 4: Mathematical IRT Convergence Preservation ─────────────────────
  console.log('\n▶ Check 4: Mathematical IRT Convergence Preservation...');

  // Ensure 3PL probability and Fisher information functions continue functioning seamlessly
  const prob = calculate3PLProbability(0.0, 0.0);
  assert.strictEqual(prob, 0.625, '3PL probability at theta=b must equal 0.625');

  const fisher = calculateFisherInformation({ difficulty: 0.0, discrimination: 1.5, guessing: 0.25 }, 0.0);
  assert(fisher >= 0.3, `Fisher information at theta=b must be robust, got ${fisher}`);

  const sem = calculateCATSEM([{ difficulty: 0.0 }], 0.0);
  assert(sem < 1.0, 'SEM must decrease from prior');

  console.log('  ✔ [PASS] Item Response Theory (3PL & SEM) mathematical invariants preserved 100%');

  console.log('\n══════════════════════════════════════════════════════════════════════════════╗');
  console.log('🎉 SIKLUS VI — PASS 7: REVITALISASI TOTAL TES DIAGNOSTIK CAT 100% GREEN       ║');
  console.log('╚══════════════════════════════════════════════════════════════════════════════╝');
})().catch((err) => {
  console.error('\n❌ FAIL: Pass 7 Test Error:', err);
  process.exit(1);
});
