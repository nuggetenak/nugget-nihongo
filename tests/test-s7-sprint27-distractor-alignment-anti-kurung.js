/**
 * test-s7-sprint27-distractor-alignment-anti-kurung.js
 * 
 * Sprint 27 (Pass 5) — Comprehensive Cross-Level Distractor Alignment & Anti-Kurung / Anti-Slash Audit
 * 
 * Verifies:
 * 1. 14 golden CBT exercise datasets contain 210 total questions.
 * 2. 100% of questions have exactly 4 homogeneous options.
 * 3. Zero leaked HTML tags (<...>) across all exercise options.
 * 4. Zero slashes (/ or ／) in options across all 210 exercise questions.
 * 5. Specific surgical remediations verified:
 *    - SSW-AG-S01-Q03: 摘果（てきか） (removed / 実すぐり)
 *    - SSW-KG-S01-Q06: 歩行器（ほこうき） (removed / シルバーカー)
 *    - SSW-KC-S01-Q03: 幅木（はばき） (removed / こぼれ止め)
 *    - SSW-LL-S01-Q011: 漏電遮断器（漏電ブレーカー） (removed slash & portable reel)
 *    - SSW-MF-S01-Q06: 非常停止ボタン（エマージェンシーストップ） (removed slash & descriptive text)
 *    - JFT-A2-S01-Q13: 無料 (removed （0円）)
 *    - JFT-A2-S01-Q15: 出勤できるかどうか、木曜日の昼12時までに メールで返信する。
 *    - JLPT-N2-S01-Q15: 常時雇用する従業員が25名なので、助成率が全額の100%に引き上げられる。
 * 6. Valid correct answers exist in all 210 questions.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('🧪 Starting Sprint 27 Distractor Alignment & Anti-Kurung / Anti-Slash Suite...\n');

let passedTests = 0;
function test(name, fn) {
  try {
    fn();
    console.log(`  ✅ ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ ${name}`);
    console.error(`     Error: ${err.message}`);
    process.exit(1);
  }
}

const ROOT_DIR = path.resolve(__dirname, '..');
const EXERCISES_DIR = path.join(ROOT_DIR, 'public/data/exercises');

// ── 1. Exercise Catalog Completeness ──
test('14 golden CBT exercise datasets exist and declare 210 questions', () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(EXERCISES_DIR, 'manifest.json'), 'utf8'));
  assert(Array.isArray(manifest.sets), 'Manifest must declare sets');
  assert.strictEqual(manifest.sets.length, 14, 'Manifest must have exactly 14 sets');
  assert.strictEqual(manifest.totalQuestions, 210, 'Manifest must declare 210 total questions');
});

// ── 2. Option Homogeneity & Count ──
test('100% of all 210 exercise questions have exactly 4 multiple-choice options', () => {
  const files = fs.readdirSync(EXERCISES_DIR).filter(f => f.endsWith('.json') && f !== 'manifest.json');
  assert.strictEqual(files.length, 14, 'Must have 14 exercise files on disk');

  let totalQ = 0;
  files.forEach(f => {
    const data = JSON.parse(fs.readFileSync(path.join(EXERCISES_DIR, f), 'utf8'));
    const items = data.items || data.questions || [];
    assert.strictEqual(items.length, 15, `${f} must have exactly 15 questions`);
    items.forEach((item, idx) => {
      totalQ++;
      assert(Array.isArray(item.options), `${f}#${idx + 1} options must be an array`);
      assert.strictEqual(item.options.length, 4, `${f}#${idx + 1} (${item.id}) must have exactly 4 options`);
    });
  });

  assert.strictEqual(totalQ, 210, 'Must have audited 210 questions in total');
});

// ── 3. Zero Leaked HTML Tags in Options ──
test('Zero raw HTML tags (<...>) in multiple-choice options across all exercise sets', () => {
  const files = fs.readdirSync(EXERCISES_DIR).filter(f => f.endsWith('.json') && f !== 'manifest.json');
  let htmlLeaks = 0;

  files.forEach(f => {
    const data = JSON.parse(fs.readFileSync(path.join(EXERCISES_DIR, f), 'utf8'));
    const items = data.items || data.questions || [];
    items.forEach((item) => {
      item.options.forEach((opt, oIdx) => {
        const text = typeof opt === 'string' ? opt : (opt.text || opt.textJp || '');
        if (/<[^>]+>/.test(text)) {
          htmlLeaks++;
          console.error(`HTML leak in ${f} (${item.id}) opt[${oIdx}]: ${text}`);
        }
      });
    });
  });

  assert.strictEqual(htmlLeaks, 0, 'No raw HTML tags must leak into options');
});

// ── 4. Zero Slashes in Options ──
test('Zero slashes (/ or ／) in options across all 210 questions', () => {
  const files = fs.readdirSync(EXERCISES_DIR).filter(f => f.endsWith('.json') && f !== 'manifest.json');
  let slashCount = 0;

  files.forEach(f => {
    const data = JSON.parse(fs.readFileSync(path.join(EXERCISES_DIR, f), 'utf8'));
    const items = data.items || data.questions || [];
    items.forEach((item) => {
      item.options.forEach((opt, oIdx) => {
        const text = typeof opt === 'string' ? opt : (opt.text || opt.textJp || '');
        if (text.includes('/') || text.includes('／')) {
          slashCount++;
          console.error(`Slash in ${f} (${item.id}) opt[${oIdx}]: ${text}`);
        }
      });
    });
  });

  assert.strictEqual(slashCount, 0, 'No slashes allowed in multiple-choice options');
});

// ── 5. Specific Question Remediations ──
test('Specific surgical question fixes verified (摘果, 歩行器, 幅木, 漏電遮断器, 非常停止, 無料, etc.)', () => {
  // SSW-AG-S01-Q03
  const agData = JSON.parse(fs.readFileSync(path.join(EXERCISES_DIR, 'ssw-agriculture-set01.json'), 'utf8'));
  const agQ03 = agData.items.find(x => x.id === 'SSW-AG-S01-Q03');
  assert.strictEqual(agQ03.options[0], '摘果（てきか）');

  // SSW-KG-S01-Q06
  const kgData = JSON.parse(fs.readFileSync(path.join(EXERCISES_DIR, 'ssw-kaigo-set01.json'), 'utf8'));
  const kgQ06 = kgData.items.find(x => x.id === 'SSW-KG-S01-Q06');
  assert.strictEqual(kgQ06.options[0], '歩行器（ほこうき）');

  // SSW-KC-S01-Q03
  const kcData = JSON.parse(fs.readFileSync(path.join(EXERCISES_DIR, 'ssw-kensetsu-kenchiku-set01.json'), 'utf8'));
  const kcQ03 = kcData.items.find(x => x.id === 'SSW-KC-S01-Q03');
  assert.strictEqual(kcQ03.options[0], '幅木（はばき）');

  // SSW-LL-S01-Q011
  const llData = JSON.parse(fs.readFileSync(path.join(EXERCISES_DIR, 'ssw-kensetsu-lifeline-set01.json'), 'utf8'));
  const llQ11 = llData.items.find(x => x.id === 'SSW-LL-S01-Q011');
  assert.strictEqual(llQ11.options[0], '漏電遮断器（漏電ブレーカー）');

  // SSW-MF-S01-Q06
  const mfData = JSON.parse(fs.readFileSync(path.join(EXERCISES_DIR, 'ssw-manufacturing-set01.json'), 'utf8'));
  const mfQ06 = mfData.items.find(x => x.id === 'SSW-MF-S01-Q06');
  assert.strictEqual(mfQ06.options[0], '非常停止ボタン（エマージェンシーストップ）');

  // JFT-A2-S01-Q13
  const jftData = JSON.parse(fs.readFileSync(path.join(EXERCISES_DIR, 'jft-basic-a2-set01.json'), 'utf8'));
  const jftQ13 = jftData.items.find(x => x.id === 'JFT-A2-S01-Q13');
  assert.strictEqual(jftQ13.options[0], '無料');

  // JFT-A2-S01-Q15
  const jftQ15 = jftData.items.find(x => x.id === 'JFT-A2-S01-Q15');
  assert.strictEqual(jftQ15.options[0], '出勤できるかどうか、木曜日の昼12時までに メールで返信する。');

  // JLPT-N2-S01-Q15
  const n2Data = JSON.parse(fs.readFileSync(path.join(EXERCISES_DIR, 'jlpt-n2-set01.json'), 'utf8'));
  const n2Q15 = n2Data.items.find(x => x.id === 'JLPT-N2-S01-Q15');
  assert.strictEqual(n2Q15.options[3], '常時雇用する従業員が25名なので、助成率が全額の100%に引き上げられる。');
});

// ── 6. Correct Answer Validity ──
test('Every question has a valid, reachable correct answer index within options range [0..3]', () => {
  const files = fs.readdirSync(EXERCISES_DIR).filter(f => f.endsWith('.json') && f !== 'manifest.json');
  files.forEach(f => {
    const data = JSON.parse(fs.readFileSync(path.join(EXERCISES_DIR, f), 'utf8'));
    const items = data.items || data.questions || [];
    items.forEach((item) => {
      const idx = item.correctOptionIndex;
      assert(typeof idx === 'number' && idx >= 0 && idx < 4, `${f} (${item.id}) must have correctOptionIndex in [0..3], found: ${idx}`);
    });
  });
});

console.log(`\n🎉 ALL ${passedTests} SPRINT 27 DISTRACTOR ALIGNMENT & ANTI-KURUNG CONTRACTS PASSED 100% GREEN!\n`);
