// ══════════════════════════════════════════════════════════════════
//  tests/test-s5-pass30-keigo-sociopragmatic.js
//  Siklus V — Pass 30: Keigo Sociopragmatic Analyzer (Sonkeigo, Kenjougo, Teineigo)
// ══════════════════════════════════════════════════════════════════

import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

console.log('\n🧪 [Siklus V — Pass 30] Keigo Sociopragmatic Analyzer & Uchi-Soto Engine Verification...\n');

let passCount = 0;
const totalChecks = 6;

// ──────────────────────────────────────────────────────────────────
// Check 1: 15 Core Irregular Keigo Verbs Matrix & Bidirectional Forms
// ──────────────────────────────────────────────────────────────────
console.log('📋 Check 1: 15 Core Irregular Keigo Verbs Matrix Specification');
try {
  const dataModule = await import('../src/lib/keigo/keigoData.ts');
  const { KEIGO_VERB_BANK } = dataModule;

  assert.ok(Array.isArray(KEIGO_VERB_BANK) && KEIGO_VERB_BANK.length >= 15, 'Must declare at least 15 keigo verbs');

  const IRREGULAR_15 = [
    '行く', '来る', 'いる', 'する', '言う',
    '見る', '食べる', '飲む', '知る', 'くれる',
    'あげる', 'もらう', '会う', '聞く', '寝る'
  ];

  const dictForms = KEIGO_VERB_BANK.map((v) => v.dictionaryForm);
  for (const exp of IRREGULAR_15) {
    assert.ok(dictForms.includes(exp), `KEIGO_VERB_BANK must include irregular verb '${exp}'`);
  }

  // Key irregular mappings
  const taberu = KEIGO_VERB_BANK.find((v) => v.dictionaryForm === '食べる');
  assert.strictEqual(taberu.sonkeigo, '召し上がる');
  assert.strictEqual(taberu.kenjougo, 'いただく');

  const iu = KEIGO_VERB_BANK.find((v) => v.dictionaryForm === '言う');
  assert.strictEqual(iu.sonkeigo, 'おっしゃる');
  assert.strictEqual(iu.kenjougo, '申す');
  assert.ok(iu.alternateKenjougo.includes('申し上げる'));

  const miru = KEIGO_VERB_BANK.find((v) => v.dictionaryForm === '見る');
  assert.strictEqual(miru.sonkeigo, 'ご覧になる');
  assert.strictEqual(miru.kenjougo, '拝見する');

  const iku = KEIGO_VERB_BANK.find((v) => v.dictionaryForm === '行く');
  assert.strictEqual(iku.sonkeigo, 'いらっしゃる');
  assert.strictEqual(iku.kenjougo, '参る');

  console.log('  ✅ Check 1 Passed: 15 core irregular keigo verbs and flagship honorific pairs verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 1 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 2: Uchi-Soto Noun Matrix & Business Honorific Pronouns
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 2: Uchi-Soto Noun Matrix & Corporate Honorific Pairs');
try {
  const dataModule = await import('../src/lib/keigo/keigoData.ts');
  const { KEIGO_NOUN_BANK } = dataModule;

  assert.ok(Array.isArray(KEIGO_NOUN_BANK) && KEIGO_NOUN_BANK.length >= 8);

  // Corporate entity pairs
  const kaisha = KEIGO_NOUN_BANK.find((n) => n.plain === '会社');
  assert.ok(kaisha, 'Noun 会社 must exist');
  assert.ok(kaisha.sonkeigo.includes('御社') && kaisha.sonkeigo.includes('貴社'));
  assert.ok(kaisha.kenjougo.includes('弊社') && kaisha.kenjougo.includes('当社'));
  assert.ok(kaisha.alternateSonkeigo.includes('貴社 (きしゃ)'));
  assert.ok(kaisha.alternateSonkeigo.includes('御社 (おんしゃ)'));
  assert.ok(kaisha.alternateKenjougo.includes('弊社 (へいしゃ)'));
  assert.ok(kaisha.alternateKenjougo.includes('当社 (とうしゃ)'));

  // Person pairs: 方 vs 者
  const hito = KEIGO_NOUN_BANK.find((n) => n.plain === '人');
  assert.strictEqual(hito.sonkeigo, '方 (かた)');
  assert.strictEqual(hito.kenjougo, '者 (もの)');

  // Name pairs: お名前
  const namae = KEIGO_NOUN_BANK.find((n) => n.plain === '名前');
  assert.strictEqual(namae.sonkeigo, 'お名前');

  console.log('  ✅ Check 2 Passed: Uchi-Soto noun bank (御社/弊社, 方/者, dll.) verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 2 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 3: 3-Step Sociopragmatic Uchi-Soto Decision Tree
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 3: 3-Step Sociopragmatic Uchi-Soto Decision Tree Engine');
try {
  const engineModule = await import('../src/lib/keigo/keigoEngine.ts');
  const { currentDecisionStep, deriveRegister, explainDecisionPath } = engineModule;

  // Step progression
  assert.strictEqual(currentDecisionStep({}), 'actor');
  assert.strictEqual(currentDecisionStep({ actor: 'self' }), 'result');
  assert.strictEqual(currentDecisionStep({ actor: 'other' }), 'addressee');
  assert.strictEqual(currentDecisionStep({ actor: 'other', addressee: 'direct' }), 'result');
  assert.strictEqual(currentDecisionStep({ actor: 'other', addressee: 'third-party' }), 'group');
  assert.strictEqual(currentDecisionStep({ actor: 'other', addressee: 'third-party', group: 'own-group' }), 'result');

  // Register derivation rules
  assert.strictEqual(deriveRegister({ actor: 'self' }), 'kenjougo', 'Self action must derive Kenjougo');
  assert.strictEqual(deriveRegister({ actor: 'other', addressee: 'direct' }), 'sonkeigo', 'Direct other action must derive Sonkeigo');
  assert.strictEqual(
    deriveRegister({ actor: 'other', addressee: 'third-party', group: 'own-group' }),
    'kenjougo',
    'Uchi-Soto Flip: Atasan sendiri di depan klien harus Kenjougo'
  );
  assert.strictEqual(
    deriveRegister({ actor: 'other', addressee: 'third-party', group: 'outsider' }),
    'sonkeigo',
    'Outsider action must derive Sonkeigo'
  );

  // Pedagogical explanations
  const uchiExplanation = explainDecisionPath({ actor: 'other', addressee: 'third-party', group: 'own-group' });
  assert.ok(uchiExplanation.includes('JEBAKAN UCHI-SOTO'), 'Must explain Uchi-Soto flip warning');

  console.log('  ✅ Check 3 Passed: 3-step decision tree logic and Uchi-Soto flip verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 3 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 4: 4-Tier Business Request Ladder & Cushioned Patterns
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 4: 4-Tier Business Request Ladder Specification');
try {
  const dataModule = await import('../src/lib/keigo/keigoData.ts');
  const { REQUEST_LADDER } = dataModule;

  assert.strictEqual(REQUEST_LADDER.length, 4, 'Must define exactly 4 request tiers');

  const tiers = REQUEST_LADDER.map((r) => r.tier);
  assert.deepStrictEqual(tiers, ['casual', 'polite', 'formal', 'supreme']);

  // Level 1: 〜てください
  assert.ok(REQUEST_LADDER[0].pattern.includes('〜てください'));

  // Level 2: 〜ていただけますか
  assert.ok(REQUEST_LADDER[1].pattern.includes('〜ていただけますか'));

  // Level 3: 〜ていただけますでしょうか (Cushioned)
  assert.ok(REQUEST_LADDER[2].pattern.includes('〜ていただけますでしょうか'));

  // Level 4: 〜のほどよろしくお願い申し上げます (Supreme formal)
  assert.ok(REQUEST_LADDER[3].pattern.includes('〜のほどよろしくお願い申し上げます'));

  console.log('  ✅ Check 4 Passed: 4-tier request ladder from casual to supreme formal verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 4 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 5: Input Grader & Double-Keigo / Regular Trap Detection
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 5: Input Grader & Double-Keigo / Regular Mistake Detection');
try {
  const engineModule = await import('../src/lib/keigo/keigoEngine.ts');
  const dataModule = await import('../src/lib/keigo/keigoData.ts');
  const { gradeKeigoInput } = engineModule;
  const { KEIGO_VERB_BANK } = dataModule;

  const taberu = KEIGO_VERB_BANK.find((v) => v.dictionaryForm === '食べる');
  const iu = KEIGO_VERB_BANK.find((v) => v.dictionaryForm === '言う');

  // Exact correct answer
  const correctGrade = gradeKeigoInput(taberu, 'sonkeigo', '召し上がる');
  assert.strictEqual(correctGrade.isCorrect, true);
  assert.strictEqual(correctGrade.score, 100);

  // Alternate answer
  const altGrade = gradeKeigoInput(iu, 'kenjougo', '申し上げる');
  assert.strictEqual(altGrade.isCorrect, true);
  assert.strictEqual(altGrade.score, 100);

  // Regular pattern mistake trap on irregular verb (お食べになる)
  const regularTrapGrade = gradeKeigoInput(taberu, 'sonkeigo', 'お食べになる');
  assert.strictEqual(regularTrapGrade.isCorrect, false);
  assert.strictEqual(regularTrapGrade.score, 40);
  assert.ok(regularTrapGrade.feedback.includes('TAK BERATURAN KHUSUS'));

  // Double-Keigo (二重敬語) trap detection: お召し上がりになる
  const doubleKeigoGrade1 = gradeKeigoInput(taberu, 'sonkeigo', 'お召し上がりになる');
  assert.strictEqual(doubleKeigoGrade1.isCorrect, false);
  assert.strictEqual(doubleKeigoGrade1.score, 50);
  assert.ok(doubleKeigoGrade1.feedback.includes('Double Keigo'));

  // Double-Keigo (二重敬語) trap detection: おっしゃられる
  const doubleKeigoGrade2 = gradeKeigoInput(iu, 'sonkeigo', 'おっしゃられる');
  assert.strictEqual(doubleKeigoGrade2.isCorrect, false);
  assert.strictEqual(doubleKeigoGrade2.score, 50);
  assert.ok(doubleKeigoGrade2.feedback.includes('Double Keigo'));

  console.log('  ✅ Check 5 Passed: Grader trap detection (Double-Keigo & regular pattern) verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 5 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 6: Responsive Modal Ergonomics, Focus Trap & WCAG AA Tokens
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 6: Responsive Modal Ergonomics, Focus Trap & WCAG AA Tokens');
try {
  const modalSource = fs.readFileSync(path.join(projectRoot, 'src/components/keigo/KeigoTrainerModal.tsx'), 'utf8');

  // Focus trap & body scroll lock
  assert.ok(modalSource.includes('useFocusTrap<HTMLDivElement>(isOpen, onClose)'), 'Must integrate useFocusTrap');
  assert.ok(modalSource.includes('useBodyScrollLock(isOpen)'), 'Must integrate useBodyScrollLock');

  // Mobile drag indicator
  assert.ok(modalSource.includes('flex sm:hidden justify-center pt-2.5 pb-1'), 'Must provide mobile bottom-sheet drag handle');

  // Safe area bottom padding
  assert.ok(modalSource.includes('pb-[max(1rem,env(safe-area-inset-bottom))]'), 'Must maintain safe area inset cushion');

  // 40px touch targets
  assert.ok(modalSource.includes('min-h-[44px]') && modalSource.includes('min-w-[44px]'), 'Close button must enforce 44px touch target');
  assert.ok(modalSource.includes('min-h-[40px]'), 'Navigation tabs must enforce 40px touch height');

  // WCAG AA Dual-Theme Contrast Tokens
  assert.ok(
    modalSource.includes('text-emerald-800 dark:text-emerald-300') &&
    modalSource.includes('text-amber-800 dark:text-amber-300'),
    'Must enforce WCAG AA dual-theme contrast tokens in etiquette boxes'
  );

  console.log('  ✅ Check 6 Passed: Modal ergonomics, touch targets, and WCAG AA contrast verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 6 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Master Verification Summary
// ──────────────────────────────────────────────────────────────────
console.log(`\n📊 Siklus V Pass 30 Result: ${passCount}/${totalChecks} checks passed.`);
if (passCount === totalChecks) {
  console.log('🎉 Siklus V Pass 30 PASSED 100% GREEN!\n');
  process.exit(0);
} else {
  console.error(`❌ Siklus V Pass 30 FAILED with ${totalChecks - passCount} errors.\n`);
  process.exit(1);
}
