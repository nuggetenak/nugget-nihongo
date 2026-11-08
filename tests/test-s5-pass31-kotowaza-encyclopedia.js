// ══════════════════════════════════════════════════════════════════
//  tests/test-s5-pass31-kotowaza-encyclopedia.js
//  Siklus V — Pass 31: Kotowaza Proverbs & Cultural Idioms Encyclopedia
// ══════════════════════════════════════════════════════════════════

import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

console.log('\n🧪 [Siklus V — Pass 31] Kotowaza Proverbs & Cultural Idioms Encyclopedia Verification...\n');

let passCount = 0;
const totalChecks = 6;

// ──────────────────────────────────────────────────────────────────
// Check 1: 376 Kotowaza Collection Integrity & Leap Year Guarantee
// ──────────────────────────────────────────────────────────────────
console.log('📋 Check 1: 376 Kotowaza Collection Integrity & Leap Year Guarantee');
try {
  const dataModule = await import('../src/lib/data/kotowaza.ts');
  const { KOTOWAZA_COLLECTION, KOTOWAZA_LIST } = dataModule;

  assert.ok(Array.isArray(KOTOWAZA_COLLECTION), 'KOTOWAZA_COLLECTION must be an array');
  assert.strictEqual(KOTOWAZA_COLLECTION, KOTOWAZA_LIST, 'KOTOWAZA_LIST must reference KOTOWAZA_COLLECTION');
  assert.ok(KOTOWAZA_COLLECTION.length >= 366, `Must provide >= 366 entries for leap year, got ${KOTOWAZA_COLLECTION.length}`);
  assert.strictEqual(KOTOWAZA_COLLECTION.length, 376, `Expected exactly 376 entries, got ${KOTOWAZA_COLLECTION.length}`);

  // Unique IDs formatted as ktw-XXX
  const idSet = new Set();
  const jpSet = new Set();
  for (const item of KOTOWAZA_COLLECTION) {
    assert.ok(item.id, 'Item must have an id');
    assert.ok(/^ktw-\d{3}$/.test(item.id), `ID format must be ktw-XXX, got: ${item.id}`);
    assert.ok(!idSet.has(item.id), `Duplicate ID found: ${item.id}`);
    idSet.add(item.id);

    assert.ok(item.jp, 'Item must have Japanese text');
    assert.ok(!jpSet.has(item.jp), `Duplicate Japanese text found: ${item.jp}`);
    jpSet.add(item.jp);
  }

  console.log(`  ✅ Check 1 Passed: ${KOTOWAZA_COLLECTION.length} unique proverbs, zero ID/JP duplicates, leap year guaranteed`);
  passCount++;
} catch (err) {
  console.error('  ❌ Check 1 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 2: Core Schema Completeness Contract & Cultural Origins
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 2: Core Schema Completeness Contract & Cultural Origins');
try {
  const dataModule = await import('../src/lib/data/kotowaza.ts');
  const { KOTOWAZA_COLLECTION } = dataModule;

  let originCount = 0;
  let literalCount = 0;

  for (const item of KOTOWAZA_COLLECTION) {
    assert.ok(typeof item.jp === 'string' && item.jp.trim().length > 0, `Missing jp on ${item.id}`);
    assert.ok(typeof item.reading === 'string' && item.reading.trim().length > 0, `Missing reading on ${item.id}`);
    assert.ok(typeof item.romaji === 'string' && item.romaji.trim().length > 0, `Missing romaji on ${item.id}`);
    assert.ok(typeof item.meaning === 'string' && item.meaning.trim().length > 0, `Missing meaning on ${item.id}`);
    assert.ok(typeof item.wisdom === 'string' && item.wisdom.trim().length > 0, `Missing wisdom on ${item.id}`);
    assert.ok(typeof item.category === 'string' && item.category.trim().length > 0, `Missing category on ${item.id}`);

    if (item.origin) originCount++;
    if (item.literal) literalCount++;
  }

  assert.strictEqual(originCount, KOTOWAZA_COLLECTION.length, '100% of proverbs must have cultural origin context');
  assert.ok(literalCount >= 40, 'At least 40 proverbs must have literal translations');

  console.log(`  ✅ Check 2 Passed: 100% schema completeness (${originCount}/${KOTOWAZA_COLLECTION.length} origins, ${literalCount} literals)`);
  passCount++;
} catch (err) {
  console.error('  ❌ Check 2 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 3: Deterministic Daily Proverb Engine & Defensive Bounds
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 3: Deterministic Daily Proverb Engine & Defensive Bounds');
try {
  const dataModule = await import('../src/lib/data/kotowaza.ts');
  const { getDailyKotowaza, KOTOWAZA_COLLECTION } = dataModule;

  // 1. Current daily proverb
  const today = getDailyKotowaza();
  assert.ok(today && today.id, 'getDailyKotowaza() must return a valid Kotowaza');

  // 2. 366 consecutive days uniqueness
  const dailySet = new Set();
  const DAY_MS = 86400000;
  const startEpoch = 1770000000000;

  for (let d = 0; d < 366; d++) {
    const item = getDailyKotowaza(startEpoch + d * DAY_MS);
    assert.ok(item && item.id, `Failed to get proverb for day ${d}`);
    dailySet.add(item.id);
  }
  assert.strictEqual(dailySet.size, 366, `Must yield exactly 366 distinct proverbs across 366 days, got ${dailySet.size}`);

  // 3. Defensive handling: negative timestamp, epoch 0, NaN fallback
  const negativeItem = getDailyKotowaza(-1000000000);
  assert.ok(negativeItem && negativeItem.id, 'Must handle negative epoch without error or out-of-bounds');

  const zeroItem = getDailyKotowaza(0);
  assert.strictEqual(zeroItem.id, KOTOWAZA_COLLECTION[0].id, 'Epoch 0 must yield index 0');

  const nanFallback = getDailyKotowaza(NaN);
  assert.ok(nanFallback && nanFallback.id, 'NaN argument must fallback safely to Date.now()');

  console.log('  ✅ Check 3 Passed: 366-day daily engine and negative/NaN defensive bounds verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 3 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 4: Multi-Field Search Engine & Category Filter
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 4: Multi-Field Search Engine & Category Filter');
try {
  const dataModule = await import('../src/lib/data/kotowaza.ts');
  const { searchKotowaza, getKotowazaCategories, KOTOWAZA_COLLECTION } = dataModule;

  // Categories
  const categories = getKotowazaCategories();
  assert.ok(categories.length >= 10, 'Must have at least 10 categories');
  assert.ok(categories.includes('Ketekunan & Tekad'));
  assert.ok(categories.includes('Konsistensi'));
  assert.ok(categories.includes('Kebijaksanaan'));

  // Search by Japanese kanji
  const darumaResults = searchKotowaza('七転び八起き');
  assert.ok(darumaResults.length >= 1, 'Must find 七転び八起き');
  assert.strictEqual(darumaResults[0].id, 'ktw-001');

  // Search by Hiragana reading
  const readingResults = searchKotowaza('ななころび');
  assert.ok(readingResults.some((k) => k.id === 'ktw-001'), 'Must match by reading');

  // Search by Romaji
  const romajiResults = searchKotowaza('ichigo ichie');
  assert.ok(romajiResults.some((k) => k.id === 'ktw-002'), 'Must match by romaji');

  // Search by Indonesian meaning / wisdom
  const stoneResults = searchKotowaza('batu');
  assert.ok(stoneResults.length >= 1, 'Must find proverbs mentioning batu (e.g. 雨垂れ石を穿つ or 石の上にも三年)');

  // Filter by category
  const konsistensiList = searchKotowaza('', 'Konsistensi');
  assert.ok(konsistensiList.length >= 5, 'Konsistensi category must have at least 5 entries');
  for (const item of konsistensiList) {
    assert.strictEqual(item.category, 'Konsistensi');
  }

  // Combined search and category
  const combined = searchKotowaza('gunung', 'Konsistensi');
  assert.ok(combined.some((k) => k.id === 'ktw-003'), 'Must match 塵も積もれば山となる');

  console.log('  ✅ Check 4 Passed: Multi-field search (kanji, reading, romaji, meaning, wisdom) verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 4 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 5: Fast ID Lookup Utility (getKotowazaById)
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 5: Fast ID Lookup Utility (getKotowazaById)');
try {
  const dataModule = await import('../src/lib/data/kotowaza.ts');
  const { getKotowazaById } = dataModule;

  assert.strictEqual(typeof getKotowazaById, 'function', 'getKotowazaById must be an exported function');

  // Existing entries
  const k1 = getKotowazaById('ktw-001');
  assert.ok(k1, 'ktw-001 must exist');
  assert.strictEqual(k1.jp, '七転び八起き');

  const k376 = getKotowazaById('ktw-376');
  assert.ok(k376, 'ktw-376 must exist');
  assert.strictEqual(k376.jp, '見るは法楽');

  // Non-existent or invalid inputs
  assert.strictEqual(getKotowazaById('ktw-999'), undefined, 'Invalid ID must return undefined');
  assert.strictEqual(getKotowazaById(''), undefined, 'Empty ID must return undefined');
  assert.strictEqual(getKotowazaById(null), undefined, 'Null ID must return undefined');

  console.log('  ✅ Check 5 Passed: getKotowazaById fast lookup and edge case handling verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 5 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 6: Responsive Modal Ergonomics, Safe Clipboard & Cleanup
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 6: Responsive Modal Ergonomics, Safe Clipboard & Cleanup');
try {
  const modalSource = fs.readFileSync(path.join(projectRoot, 'src/components/kotowaza/KotowazaModal.tsx'), 'utf8');

  // Focus trap & scroll lock
  assert.ok(modalSource.includes('useFocusTrap<HTMLDivElement>(isOpen, onClose)'), 'Must integrate useFocusTrap');
  assert.ok(modalSource.includes('useBodyScrollLock(isOpen)'), 'Must integrate useBodyScrollLock');

  // Unmount speech synthesis cleanup
  assert.ok(modalSource.includes('window.speechSynthesis.cancel()'), 'Must clean up active speech synthesis on unmount');

  // Safe clipboard handling with .catch()
  assert.ok(modalSource.includes('navigator.clipboard.writeText(textToCopy)'), 'Must use clipboard writeText');
  assert.ok(modalSource.includes('.catch('), 'Must handle clipboard writeText rejection');

  // Dynamic mobile count (not hardcoded 52)
  assert.ok(modalSource.includes('{KOTOWAZA_LIST.length} Koleksi Peribahasa'), 'Mobile footer must use dynamic KOTOWAZA_LIST.length');
  assert.ok(!modalSource.includes('52 Koleksi Peribahasa'), 'Must not contain hardcoded 52 proverbs count');

  // Touch targets >= 40px
  assert.ok(modalSource.includes('min-h-[44px]') && modalSource.includes('min-w-[44px]'), 'Close button must enforce 44px');
  assert.ok(modalSource.includes('min-h-[40px]'), 'Action and footer buttons must enforce 40px touch targets');

  // Mobile pull handle
  assert.ok(modalSource.includes('sm:hidden flex justify-center pt-2 pb-1 bg-surface-2/40'), 'Must provide mobile drag indicator');

  console.log('  ✅ Check 6 Passed: Modal ergonomics, speech cleanup, safe clipboard, and touch targets verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 6 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Master Verification Summary
// ──────────────────────────────────────────────────────────────────
console.log(`\n📊 Siklus V Pass 31 Result: ${passCount}/${totalChecks} checks passed.`);
if (passCount === totalChecks) {
  console.log('🎉 Siklus V Pass 31 PASSED 100% GREEN!\n');
  process.exit(0);
} else {
  console.error(`❌ Siklus V Pass 31 FAILED with ${totalChecks - passCount} errors.\n`);
  process.exit(1);
}
