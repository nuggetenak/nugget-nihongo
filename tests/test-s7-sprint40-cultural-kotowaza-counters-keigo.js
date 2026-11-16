// ══════════════════════════════════════════════════════════════════
//  tests/test-s7-sprint40-cultural-kotowaza-counters-keigo.js
//  Sprint 40: Kotowaza Cultural Idioms, Japanese Counters Taxonomy &
//             Keigo Sociopragmatic Analyzer Verification Suite
// ══════════════════════════════════════════════════════════════════

import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

console.log('\n🧪 [Sprint 40] Kotowaza, Counters & Keigo Sociopragmatic Verification...\n');

let passCount = 0;
const totalChecks = 5;

// ──────────────────────────────────────────────────────────────────
// Check 1: Japanese Counters Special Forms & Dynamic Sound Shifts
// ──────────────────────────────────────────────────────────────────
console.log('📋 Check 1: Japanese Counters Special Forms & Dynamic Sound Shifts');
try {
  const counterData = await import('../src/lib/counters/counterData.ts');
  const counterEngine = await import('../src/lib/counters/counterEngine.ts');

  const { MASTER_COUNTERS } = counterData;
  const { calculateCounterReading } = counterEngine;

  const nichiCounter = MASTER_COUNTERS.find((c) => c.id === 'nichi');
  assert.ok(nichiCounter, 'nichi counter must exist in MASTER_COUNTERS');

  // Test 20日 = はつか (hatsuka) special calendar exception
  const reading20 = calculateCounterReading(nichiCounter, 20);
  assert.strictEqual(reading20.number, 20);
  assert.strictEqual(reading20.kanji, '20日');
  assert.strictEqual(reading20.kana, 'はつか', '20日 must be はつか (hatsuka)');
  assert.strictEqual(reading20.romaji, 'hatsuka');
  assert.strictEqual(reading20.hasSoundChange, true);
  assert.ok(
    reading20.phoneticExplanation.includes('hatsuka') || reading20.phoneticExplanation.includes('Wago'),
    'Phonetic explanation must explain hatsuka Wago exception'
  );

  // Test 14日 and 24日 compound special days
  const reading14 = calculateCounterReading(nichiCounter, 14);
  assert.strictEqual(reading14.kana, 'じゅうよっか', '14日 must be じゅうよっか');

  const reading24 = calculateCounterReading(nichiCounter, 24);
  assert.strictEqual(reading24.kana, 'にじゅうよっか', '24日 must be にじゅうよっか');

  // Test 100 onbin shifts
  const honCounter = MASTER_COUNTERS.find((c) => c.id === 'hon');
  const hikiCounter = MASTER_COUNTERS.find((c) => c.id === 'hiki');
  const maiCounter = MASTER_COUNTERS.find((c) => c.id === 'mai');

  assert.strictEqual(calculateCounterReading(honCounter, 100).kana, 'ひゃっぽん', '100本 must be ひゃっぽん');
  assert.strictEqual(calculateCounterReading(hikiCounter, 100).kana, 'ひゃっぴき', '100匹 must be ひゃっぴき');
  assert.strictEqual(calculateCounterReading(maiCounter, 100).kana, 'ひゃくまい', '100枚 must be ひゃくまい');

  // Compound 23 and 48本
  assert.strictEqual(calculateCounterReading(honCounter, 23).kana, 'にじゅうさんぼん');
  assert.strictEqual(calculateCounterReading(honCounter, 48).kana, 'よんじゅうはっぽん');

  // Boundary clamping
  const clampedLow = calculateCounterReading(honCounter, 0);
  assert.strictEqual(clampedLow.number, 1);
  const clampedHigh = calculateCounterReading(honCounter, 999);
  assert.strictEqual(clampedHigh.number, 100);

  console.log('  ✅ Check 1 Passed: 20日=はつか, 14/24日, 100本/匹 onbin, and boundary clamping verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 1 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 2: Keigo Sociopragmatic Engine & Null-Safe Input Grader
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 2: Keigo Sociopragmatic Engine & Null-Safe Input Grader');
try {
  const keigoEngine = await import('../src/lib/keigo/keigoEngine.ts');
  const {
    gradeKeigoInput,
    currentDecisionStep,
    deriveRegister,
    explainDecisionPath,
    searchKeigoVerbs,
    searchKeigoNouns,
  } = keigoEngine;

  const keigoData = await import('../src/lib/keigo/keigoData.ts');
  const { KEIGO_VERB_BANK } = keigoData;

  const ikuVerb = KEIGO_VERB_BANK.find((v) => v.id === 'iku'); // 行く
  assert.ok(ikuVerb, 'iku (行く) must exist in KEIGO_VERB_BANK');

  // 1. Null / Undefined / Empty Input Safety
  const nullResult = gradeKeigoInput(ikuVerb, 'sonkeigo', null);
  assert.strictEqual(nullResult.isCorrect, false);
  assert.strictEqual(nullResult.score, 0);

  const undefinedResult = gradeKeigoInput(ikuVerb, 'sonkeigo', undefined);
  assert.strictEqual(undefinedResult.isCorrect, false);

  const emptyResult = gradeKeigoInput(ikuVerb, 'sonkeigo', '   ');
  assert.strictEqual(emptyResult.isCorrect, false);

  // 2. Correct sonkeigo input grading
  const correctResult = gradeKeigoInput(ikuVerb, 'sonkeigo', 'いらっしゃる');
  assert.strictEqual(correctResult.isCorrect, true);
  assert.strictEqual(correctResult.score, 100);

  // Alternate answer acceptance
  const altResult = gradeKeigoInput(ikuVerb, 'sonkeigo', 'おいでになる');
  assert.strictEqual(altResult.isCorrect, true);
  assert.strictEqual(altResult.score, 100);

  // 3. Double-keigo detection (二重敬語)
  const taberuVerb = KEIGO_VERB_BANK.find((v) => v.id === 'taberu'); // 食べる (召し上がる)
  assert.ok(taberuVerb, 'taberu (食べる) must exist');
  const doubleKeigoResult = gradeKeigoInput(taberuVerb, 'sonkeigo', 'お召し上がりになる');
  assert.strictEqual(doubleKeigoResult.isCorrect, false);
  assert.strictEqual(doubleKeigoResult.score, 50);
  assert.ok(
    doubleKeigoResult.feedback.includes('二重敬語') || doubleKeigoResult.feedback.includes('Double Keigo'),
    'Must diagnose double keigo error specifically'
  );

  // 4. Null safety across search and tree derivation
  assert.ok(Array.isArray(searchKeigoVerbs(null)));
  assert.ok(Array.isArray(searchKeigoNouns(undefined)));
  assert.strictEqual(currentDecisionStep(null), 'actor');
  assert.strictEqual(deriveRegister(null), null);
  assert.strictEqual(explainDecisionPath(null), '');

  console.log('  ✅ Check 2 Passed: Keigo input grading, double-keigo trap detection & null safety verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 2 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 3: Kotowaza Encyclopedia Cultural Integrity & ID Bridge
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 3: Kotowaza Encyclopedia Cultural Integrity & ID Bridge');
try {
  const kotowazaData = await import('../src/lib/data/kotowaza.ts');
  const { KOTOWAZA_COLLECTION, getDailyKotowaza, searchKotowaza } = kotowazaData;

  assert.strictEqual(KOTOWAZA_COLLECTION.length, 376, 'Must provide 376 kotowaza entries');

  // Verify entries with indonesianEquivalent
  const withIdEq = KOTOWAZA_COLLECTION.filter((k) => k.indonesianEquivalent && k.indonesianEquivalent.length > 0);
  assert.ok(withIdEq.length >= 1, 'Must contain entries with indonesianEquivalent');

  const ktw3 = KOTOWAZA_COLLECTION.find((k) => k.id === 'ktw-003');
  assert.ok(ktw3, 'ktw-003 must exist');
  assert.strictEqual(ktw3.indonesianEquivalent, 'Sedikit-sedikit lama-lama jadi bukit');

  // Multi-field search
  const found = searchKotowaza('bukit');
  assert.ok(found.some((k) => k.id === 'ktw-003'), 'searchKotowaza must locate proverbs by indonesian meaning/wisdom');

  console.log(`  ✅ Check 3 Passed: 376 proverbs verified with Indonesian cultural proverb equivalencies`);
  passCount++;
} catch (err) {
  console.error('  ❌ Check 3 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 4: Modal Accessibility & Component Architectural Contract
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 4: Modal Accessibility & Component Architectural Contract');
try {
  const modalPath = path.join(projectRoot, 'src/components/kotowaza/KotowazaModal.tsx');
  const modalSource = fs.readFileSync(modalPath, 'utf8');

  // Focus trap and scroll lock
  assert.ok(modalSource.includes('useFocusTrap<HTMLDivElement>(isOpen, onClose)'), 'Must integrate useFocusTrap');
  assert.ok(modalSource.includes('useBodyScrollLock(isOpen)'), 'Must integrate useBodyScrollLock');

  // Speech cleanup on unmount
  assert.ok(modalSource.includes('window.speechSynthesis.cancel()'), 'Must clean up speech synthesis');

  // Clipboard copy with catch handler
  assert.ok(modalSource.includes('navigator.clipboard.writeText(textToCopy)'), 'Must use clipboard writeText');
  assert.ok(modalSource.includes('.catch('), 'Must handle clipboard errors');

  // Indonesian proverb bridge rendered in UI
  assert.ok(modalSource.includes('dailyItem.indonesianEquivalent'), 'Spotlight must render indonesianEquivalent');
  assert.ok(modalSource.includes('item.indonesianEquivalent'), 'Card grid must render indonesianEquivalent');

  // Touch targets >= 40px
  assert.ok(modalSource.includes('min-h-[44px]'), 'Close button touch target >= 44px');
  assert.ok(modalSource.includes('min-h-[40px]'), 'Interactive buttons touch target >= 40px');

  console.log('  ✅ Check 4 Passed: Focus trap, scroll lock, audio cleanup, touch targets & ID bridge verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 4 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 5: Cross-Module Integration Contract
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 5: Cross-Module Integration Contract');
try {
  const counterModalPath = path.join(projectRoot, 'src/components/counters/CounterTrainerModal.tsx');
  const keigoModalPath = path.join(projectRoot, 'src/components/keigo/KeigoTrainerModal.tsx');

  assert.ok(fs.existsSync(counterModalPath), 'CounterTrainerModal.tsx must exist');
  assert.ok(fs.existsSync(keigoModalPath), 'KeigoTrainerModal.tsx must exist');

  const counterModalSource = fs.readFileSync(counterModalPath, 'utf8');
  const keigoModalSource = fs.readFileSync(keigoModalPath, 'utf8');

  // CounterTrainerModal contracts
  assert.ok(counterModalSource.includes('calculateCounterReading'), 'Counter modal must use calculateCounterReading');
  assert.ok(counterModalSource.includes('useFocusTrap'), 'Counter modal must manage focus');
  assert.ok(counterModalSource.includes('useBodyScrollLock'), 'Counter modal must lock body scroll');

  // KeigoTrainerModal contracts
  assert.ok(keigoModalSource.includes('currentDecisionStep'), 'Keigo modal must use currentDecisionStep');
  assert.ok(keigoModalSource.includes('deriveRegister'), 'Keigo modal must use deriveRegister');
  assert.ok(keigoModalSource.includes('explainDecisionPath'), 'Keigo modal must use explainDecisionPath');
  assert.ok(keigoModalSource.includes('searchKeigoVerbs'), 'Keigo modal must use searchKeigoVerbs');
  assert.ok(keigoModalSource.includes('searchKeigoNouns'), 'Keigo modal must use searchKeigoNouns');
  assert.ok(keigoModalSource.includes('useFocusTrap'), 'Keigo modal must manage focus');
  assert.ok(keigoModalSource.includes('useBodyScrollLock'), 'Keigo modal must lock body scroll');

  console.log('  ✅ Check 5 Passed: CounterTrainerModal and KeigoTrainerModal integration contracts verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 5 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Master Verification Summary
// ──────────────────────────────────────────────────────────────────
console.log(`\n📊 Sprint 40 Result: ${passCount}/${totalChecks} checks passed.`);
if (passCount === totalChecks) {
  console.log('🎉 Sprint 40 PASSED 100% GREEN!\n');
  process.exit(0);
} else {
  console.error(`❌ Sprint 40 FAILED with ${totalChecks - passCount} errors.\n`);
  process.exit(1);
}
