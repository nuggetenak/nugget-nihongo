// ══════════════════════════════════════════════════════════════════
//  tests/test-s5-pass29-japanese-counters.js
//  Siklus V — Pass 29: Japanese Counters Taxonomy (助数詞) & Euphonic Shifts
// ══════════════════════════════════════════════════════════════════

import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

console.log('\n🧪 [Siklus V — Pass 29] Japanese Counters Taxonomy (助数詞) & Euphonic Shifts Verification...\n');

let passCount = 0;
const totalChecks = 6;

// ──────────────────────────────────────────────────────────────────
// Check 1: Counter Taxonomy & 16 Essential Counters Integrity
// ──────────────────────────────────────────────────────────────────
console.log('📋 Check 1: Counter Taxonomy & 16 Essential Counters Specification');
try {
  const dataModule = await import('../src/lib/counters/counterData.ts');
  const { MASTER_COUNTERS } = dataModule;

  assert.ok(Array.isArray(MASTER_COUNTERS) && MASTER_COUNTERS.length >= 16, 'Must declare at least 16 master counters');

  const ESSENTIAL_16 = [
    '本', '枚', '匹', '頭', '羽', '冊', '台', '個',
    'つ', '人', '杯', '階', '回', '軒', '足', '日'
  ];

  const kanjiList = MASTER_COUNTERS.map((c) => c.kanji);
  for (const k of ESSENTIAL_16) {
    assert.ok(kanjiList.includes(k), `MASTER_COUNTERS must include essential counter '${k}'`);
  }

  // Verify schema completeness for every counter
  for (const c of MASTER_COUNTERS) {
    assert.ok(c.id && c.kanji && c.kana && c.romaji && c.nameId, `Counter ${c.kanji} missing basic metadata`);
    assert.ok(Array.isArray(c.targetObjects) && c.targetObjects.length > 0, `Counter ${c.kanji} missing targetObjects`);
    assert.ok(Array.isArray(c.targetObjectsId) && c.targetObjectsId.length > 0, `Counter ${c.kanji} missing targetObjectsId`);
    assert.strictEqual(c.readings1to10.length, 10, `Counter ${c.kanji} must have exactly 10 readings (1..10)`);
  }

  console.log(`  ✅ Check 1 Passed: Master counter taxonomy (${MASTER_COUNTERS.length} counters) verified`);
  passCount++;
} catch (err) {
  console.error('  ❌ Check 1 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 2: Phonetic Onbin Sound Shifts & Rendaku Invariants
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 2: Phonetic Onbin Sound Shifts & Rendaku Rules (本, 匹, 階, つ)');
try {
  const dataModule = await import('../src/lib/counters/counterData.ts');
  const { MASTER_COUNTERS } = dataModule;

  const hon = MASTER_COUNTERS.find((c) => c.id === 'hon');
  assert.ok(hon, 'Counter 本 must exist');

  // Verify H-row sound shifts for 本 (hon)
  const honMap = Object.fromEntries(hon.readings1to10.map((r) => [r.number, r.kana]));
  assert.strictEqual(honMap[1], 'いっぽん', '1本 must be sokuon (ippon)');
  assert.strictEqual(honMap[2], 'にほん', '2本 must be regular (nihon)');
  assert.strictEqual(honMap[3], 'さんぼん', '3本 must be rendaku (sanbon)');
  assert.strictEqual(honMap[6], 'ろっぽん', '6本 must be sokuon (roppon)');
  assert.strictEqual(honMap[8], 'はっぽん', '8本 must be sokuon (happon)');
  assert.strictEqual(honMap[10], 'じゅっぽん', '10本 must be sokuon (juppon)');
  assert.strictEqual(hon.questionWord.kana, 'なんぼん', '何本 must be rendaku (nanbon)');

  // Verify animal sound shifts for 匹 (hiki)
  const hiki = MASTER_COUNTERS.find((c) => c.id === 'hiki');
  assert.ok(hiki, 'Counter 匹 must exist');
  const hikiMap = Object.fromEntries(hiki.readings1to10.map((r) => [r.number, r.kana]));
  assert.strictEqual(hikiMap[1], 'いっぴき');
  assert.strictEqual(hikiMap[3], 'さんびき');
  assert.strictEqual(hikiMap[6], 'ろっぴき');
  assert.strictEqual(hikiMap[8], 'はっぴき');
  assert.strictEqual(hikiMap[10], 'じゅっぴき');

  // Verify Wago numerals for つ
  const tsu = MASTER_COUNTERS.find((c) => c.id === 'tsu');
  assert.ok(tsu, 'Counter つ must exist');
  const tsuMap = Object.fromEntries(tsu.readings1to10.map((r) => [r.number, r.kana]));
  assert.strictEqual(tsuMap[1], 'ひとつ');
  assert.strictEqual(tsuMap[2], 'ふたつ');
  assert.strictEqual(tsuMap[3], 'みっつ');
  assert.strictEqual(tsuMap[4], 'よっつ');
  assert.strictEqual(tsuMap[10], 'とお');

  console.log('  ✅ Check 2 Passed: Phonetic sound shifts (sokuon, rendaku, wago) verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 2 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 3: Exact Tens & Dynamic Compound Calculation Engine
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 3: Exact Tens & Dynamic Compound Calculation Engine (20本, 30本, 100本)');
try {
  const engineModule = await import('../src/lib/counters/counterEngine.ts');
  const { calculateCounterReading, getCounterById } = engineModule;

  const hon = getCounterById('hon');
  assert.ok(hon, 'Counter hon must be resolved');

  // Critical verification: Exact tens sokuon slice bug remediation
  const reading20 = calculateCounterReading(hon, 20);
  assert.strictEqual(reading20.kana, 'にじゅっぽん', '20本 must be にじゅっぽん (never にじゅっん)');
  assert.strictEqual(reading20.romaji, 'nijuppon', '20本 romaji must be nijuppon (never nijupon)');
  assert.strictEqual(reading20.hasSoundChange, true);

  const reading30 = calculateCounterReading(hon, 30);
  assert.strictEqual(reading30.kana, 'さんじゅっぽん', '30本 must be さんじゅっぽん');
  assert.strictEqual(reading30.romaji, 'sanjuppon');

  const reading50 = calculateCounterReading(hon, 50);
  assert.strictEqual(reading50.kana, 'ごじゅっぽん');

  const reading80 = calculateCounterReading(hon, 80);
  assert.strictEqual(reading80.kana, 'はちじゅっぽん');

  // Compound 23
  const reading23 = calculateCounterReading(hon, 23);
  assert.strictEqual(reading23.kana, 'にじゅうさんぼん', '23本 must be にじゅうさんぼん');
  assert.strictEqual(reading23.romaji, 'nijuusanbon');

  // Exact 100
  const reading100Hon = calculateCounterReading(hon, 100);
  assert.strictEqual(reading100Hon.kana, 'ひゃっぽん', '100本 must be ひゃっぽん');

  const hiki = getCounterById('hiki');
  const reading100Hiki = calculateCounterReading(hiki, 100);
  assert.strictEqual(reading100Hiki.kana, 'ひゃっぴき', '100匹 must be ひゃっぴき');

  // 20冊 (satsu) and 20個 (ko)
  const satsu = getCounterById('satsu');
  assert.strictEqual(calculateCounterReading(satsu, 20).kana, 'にじゅっさつ', '20冊 must be にじゅっさつ');

  const ko = getCounterById('ko');
  assert.strictEqual(calculateCounterReading(ko, 20).kana, 'にじゅっこ', '20個 must be にじゅっこ');

  console.log('  ✅ Check 3 Passed: Dynamic exact tens and compound calculations strictly verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 3 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 4: Intelligent Fuzzy Search & Category Filtering
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 4: Intelligent Fuzzy Search & Category Filtering');
try {
  const engineModule = await import('../src/lib/counters/counterEngine.ts');
  const { searchCounters, filterCountersByCategory } = engineModule;

  // Search by Indonesian countable object
  const searchPena = searchCounters('pena');
  assert.ok(searchPena.some((c) => c.id === 'hon'), 'Searching "pena" must return counter 本 (hon)');

  const searchBotol = searchCounters('botol');
  assert.ok(searchBotol.some((c) => c.id === 'hon'), 'Searching "botol" must return counter 本 (hon)');

  const searchKendaraan = searchCounters('mobil');
  assert.ok(searchKendaraan.some((c) => c.id === 'dai'), 'Searching "mobil" must return counter 台 (dai)');

  const searchHewan = searchCounters('kucing');
  assert.ok(searchHewan.some((c) => c.id === 'hiki'), 'Searching "kucing" must return counter 匹 (hiki)');

  // Empty query returns all
  const allCounters = searchCounters('');
  assert.ok(allCounters.length >= 16);

  // Category filter
  const bentukCategory = filterCountersByCategory('bentuk');
  assert.ok(bentukCategory.every((c) => c.category === 'bentuk'));

  console.log('  ✅ Check 4 Passed: Fuzzy search and category filtering verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 4 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 5: 6 Essential Counter Pitfalls & Cultural Insights
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 5: 6 Essential Counter Pitfalls & Cultural Insights');
try {
  const dataModule = await import('../src/lib/counters/counterData.ts');
  const { COUNTER_PITFALLS } = dataModule;

  assert.strictEqual(COUNTER_PITFALLS.length, 6, 'Must provide exactly 6 essential counter pitfall guides');

  for (const guide of COUNTER_PITFALLS) {
    assert.ok(guide.id && guide.title, 'Guide must have id and title');
    assert.ok(guide.trap && guide.trap.length > 5, 'Guide must document common trap');
    assert.ok(guide.correction && guide.correction.length > 5, 'Guide must document standard correction');
    assert.ok(guide.reason && guide.reason.length > 5, 'Guide must document cultural/historical rationale');
  }

  const titles = COUNTER_PITFALLS.map((g) => g.title);
  assert.ok(titles.some((t) => t.includes('Hon') && t.includes('Satsu')));
  assert.ok(titles.some((t) => t.includes('Hiki') && t.includes('Tou') && t.includes('Wa')));
  assert.ok(titles.some((t) => t.includes('4日') && t.includes('8日')));

  console.log('  ✅ Check 5 Passed: 6 essential counter pitfall guides verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 5 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 6: Responsive Modal Ergonomics, Focus Trap & WCAG AA Tokens
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 6: Responsive Modal Ergonomics, Focus Trap & WCAG AA Tokens');
try {
  const modalSource = fs.readFileSync(path.join(projectRoot, 'src/components/counters/CounterTrainerModal.tsx'), 'utf8');

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
    modalSource.includes('text-rose-900 dark:text-rose-200') &&
    modalSource.includes('text-emerald-900 dark:text-emerald-200'),
    'Must enforce WCAG AA dual-theme contrast tokens in pitfall explanation boxes'
  );

  console.log('  ✅ Check 6 Passed: Modal ergonomics, touch targets, and WCAG AA contrast verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 6 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Master Verification Summary
// ──────────────────────────────────────────────────────────────────
console.log(`\n📊 Siklus V Pass 29 Result: ${passCount}/${totalChecks} checks passed.`);
if (passCount === totalChecks) {
  console.log('🎉 Siklus V Pass 29 PASSED 100% GREEN!\n');
  process.exit(0);
} else {
  console.error(`❌ Siklus V Pass 29 FAILED with ${totalChecks - passCount} errors.\n`);
  process.exit(1);
}
