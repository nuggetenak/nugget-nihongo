// ══════════════════════════════════════════════════════════════════
//  tests/test-s5-pass32-kana-chart-visualizer.js
//  Siklus V — Pass 32: Interactive Kana Chart & Touch Stroke Order Visualizer
//  Klaster 9 Grand Finale: Specialized Cultural & Pragmatic Dojo Modules
// ══════════════════════════════════════════════════════════════════

import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

console.log('\n🧪 [Siklus V — Pass 32] Interactive Kana Chart & Touch Stroke Order Visualizer Verification...\n');

let passCount = 0;
const totalChecks = 6;

// ──────────────────────────────────────────────────────────────────
// Check 1: 104 Complete Kana Dataset Integrity & Sound Groups
// ──────────────────────────────────────────────────────────────────
console.log('📋 Check 1: 104 Complete Kana Dataset Integrity & Sound Groups');
try {
  const dataModule = await import('../src/components/kana/kanaData.ts');
  const { GOJUON_KANA, DAKUON_KANA, YOON_KANA, ALL_KANA } = dataModule;

  assert.strictEqual(GOJUON_KANA.length, 46, 'Gojuon must contain exactly 46 base characters');
  assert.strictEqual(DAKUON_KANA.length, 25, 'Dakuon & Handakuon must contain exactly 25 voiced/semi-voiced characters');
  assert.strictEqual(YOON_KANA.length, 33, 'Yoon must contain 33 combination characters (11 sets x 3)');
  assert.strictEqual(ALL_KANA.length, 104, 'Total canonical Kana catalog must contain exactly 104 characters');

  // Verify ID uniqueness
  const idSet = new Set();
  for (const item of ALL_KANA) {
    assert.ok(item.id, 'Item must have an id');
    assert.ok(!idSet.has(item.id), `Duplicate ID found: ${item.id}`);
    idSet.add(item.id);
  }

  console.log(`  ✅ Check 1 Passed: 104 Kana characters across 3 sound groups verified (46 Gojūon, 25 Dakuon, 33 Yōon)`);
  passCount++;
} catch (err) {
  console.error('  ❌ Check 1 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 2: Bidirectional Hiragana <-> Katakana & Pedagogical Examples
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 2: Bidirectional Hiragana <-> Katakana & Pedagogical Examples');
try {
  const dataModule = await import('../src/components/kana/kanaData.ts');
  const { ALL_KANA } = dataModule;

  let withExamplesCount = 0;

  for (const item of ALL_KANA) {
    assert.ok(typeof item.hiragana === 'string' && item.hiragana.trim().length > 0, `Missing hiragana on ${item.id}`);
    assert.ok(typeof item.katakana === 'string' && item.katakana.trim().length > 0, `Missing katakana on ${item.id}`);
    assert.ok(typeof item.romaji === 'string' && item.romaji.trim().length > 0, `Missing romaji on ${item.id}`);
    assert.ok(item.group === 'gojuon' || item.group === 'dakuon' || item.group === 'handakuon' || item.group === 'yoon');

    if (item.example) {
      assert.ok(item.example.jp, `Example must have jp on ${item.id}`);
      assert.ok(item.example.reading, `Example must have reading on ${item.id}`);
      assert.ok(item.example.meaning, `Example must have meaning on ${item.id}`);
      withExamplesCount++;
    }
  }

  assert.strictEqual(withExamplesCount, ALL_KANA.length, '100% of kana entries must have authentic vocabulary examples');

  console.log(`  ✅ Check 2 Passed: 100% bidirectional Hiragana <-> Katakana pairs and vocabulary examples verified`);
  passCount++;
} catch (err) {
  console.error('  ❌ Check 2 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 3: Canonical Stroke Count Database & Order Metrics
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 3: Canonical Stroke Count Database & Order Metrics');
try {
  const dataModule = await import('../src/components/kana/kanaData.ts');
  const { getKanaStrokeCount, HIRAGANA_STROKE_COUNTS, KATAKANA_STROKE_COUNTS } = dataModule;

  assert.strictEqual(Object.keys(HIRAGANA_STROKE_COUNTS).length, 46, 'Must provide 46 hiragana stroke counts');
  assert.strictEqual(Object.keys(KATAKANA_STROKE_COUNTS).length, 46, 'Must provide 46 katakana stroke counts');

  // Spot-check canonical Hiragana strokes
  assert.strictEqual(getKanaStrokeCount('あ'), 3);
  assert.strictEqual(getKanaStrokeCount('い'), 2);
  assert.strictEqual(getKanaStrokeCount('し'), 1);
  assert.strictEqual(getKanaStrokeCount('た'), 4);
  assert.strictEqual(getKanaStrokeCount('ん'), 1);

  // Spot-check canonical Katakana strokes
  assert.strictEqual(getKanaStrokeCount('ア'), 2);
  assert.strictEqual(getKanaStrokeCount('ウ'), 3);
  assert.strictEqual(getKanaStrokeCount('ネ'), 4);
  assert.strictEqual(getKanaStrokeCount('レ'), 1);

  // Non-existent or empty
  assert.strictEqual(getKanaStrokeCount(''), 0);
  assert.strictEqual(getKanaStrokeCount('?'), 0);

  console.log('  ✅ Check 3 Passed: 92 canonical stroke counts and getKanaStrokeCount utility verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 3 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 4: Fast Pure Lookup Utilities (findKanaById, findKanaByChar, etc.)
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 4: Fast Pure Lookup Utilities (findKanaById, findKanaByChar, findKanaByRomaji)');
try {
  const dataModule = await import('../src/components/kana/kanaData.ts');
  const { findKanaById, findKanaByChar, findKanaByRomaji } = dataModule;

  // By ID
  const itemA = findKanaById('k-a');
  assert.ok(itemA);
  assert.strictEqual(itemA.hiragana, 'あ');
  assert.strictEqual(itemA.katakana, 'ア');
  assert.strictEqual(findKanaById('unknown-id'), undefined);

  // By Char (Hiragana or Katakana)
  const itemKa = findKanaByChar('か');
  assert.ok(itemKa);
  assert.strictEqual(itemKa.id, 'k-ka');
  const itemKaKatakana = findKanaByChar('カ');
  assert.strictEqual(itemKaKatakana.id, 'k-ka');
  assert.strictEqual(findKanaByChar(''), undefined);

  // By Romaji
  const itemShi = findKanaByRomaji('shi');
  assert.ok(itemShi);
  assert.strictEqual(itemShi.hiragana, 'し');

  const itemKya = findKanaByRomaji('kya');
  assert.ok(itemKya);
  assert.strictEqual(itemKya.hiragana, 'きゃ');

  console.log('  ✅ Check 4 Passed: findKanaById, findKanaByChar, and findKanaByRomaji verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 4 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 5: Touch Gestures & Practice Mode 3D Physics
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 5: Touch Gestures & Practice Mode 3D Physics');
try {
  const modalSource = fs.readFileSync(path.join(projectRoot, 'src/components/kana/KanaChartModal.tsx'), 'utf8');

  // Swipe gesture hook integration
  assert.ok(modalSource.includes('useSwipeGesture'), 'Must integrate useSwipeGesture');
  assert.ok(modalSource.includes('onSwipeLeft: () => handleNextPractice(false)'), 'Swipe left must map to Belum Hafal');
  assert.ok(modalSource.includes('onSwipeRight: () => handleNextPractice(true)'), 'Swipe right must map to Sudah Hafal');

  // 3D card physics & preserve-3d
  assert.ok(modalSource.includes('perspective-1000'), 'Must use 3D perspective container');
  assert.ok(modalSource.includes('rotate-y-180'), 'Must support 180-deg flip transition');
  assert.ok(modalSource.includes('card-preserve-3d'), 'Must preserve 3D transform hierarchy');

  // Keyboard navigation
  assert.ok(modalSource.includes("e.key === 'ArrowLeft'"), 'Must bind ArrowLeft to Belum Hafal');
  assert.ok(modalSource.includes("e.key === 'ArrowRight'"), 'Must bind ArrowRight to Sudah Hafal');
  assert.ok(modalSource.includes("e.key === ' ' || e.key === 'Enter'"), 'Must bind Space/Enter to flip');

  console.log('  ✅ Check 5 Passed: Unified swipe gesture physics, 3D flip card, and keyboard controls verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 5 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 6: Responsive Ergonomics, Safe Area & WCAG AA Contrast Tokens
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 6: Responsive Ergonomics, Safe Area & WCAG AA Contrast Tokens');
try {
  const modalSource = fs.readFileSync(path.join(projectRoot, 'src/components/kana/KanaChartModal.tsx'), 'utf8');

  // Focus trap & body scroll lock
  assert.ok(modalSource.includes('useFocusTrap<HTMLDivElement>(isOpen, onClose)'), 'Must integrate useFocusTrap');
  assert.ok(modalSource.includes('useBodyScrollLock(isOpen)'), 'Must integrate useBodyScrollLock');

  // Unmount speech cleanup
  assert.ok(modalSource.includes('window.speechSynthesis.cancel()'), 'Must clean up speech synthesis on unmount');

  // Mobile drag handle
  assert.ok(modalSource.includes('w-12 h-1.5 rounded-full bg-accent/25 mx-auto -mt-1 mb-2 sm:hidden'), 'Must provide mobile drag pill');

  // Touch targets >= 40px
  assert.ok(modalSource.includes('min-w-[44px] min-h-[44px]'), 'Must enforce 44px close button and tile targets');
  assert.ok(modalSource.includes('min-w-[40px] min-h-[40px]'), 'Must enforce 40px action buttons');

  // WCAG AA Tokens
  assert.ok(modalSource.includes('text-amber-800 dark:text-amber-300'), 'Must enforce WCAG AA amber contrast');
  assert.ok(modalSource.includes('text-red-600 dark:text-red-300'), 'Must enforce WCAG AA red contrast');
  assert.ok(modalSource.includes('text-green-600 dark:text-green-300'), 'Must enforce WCAG AA green contrast');

  console.log('  ✅ Check 6 Passed: Modal ergonomics, touch targets, speech cleanup, and WCAG AA contrast verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 6 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Master Verification Summary
// ──────────────────────────────────────────────────────────────────
console.log(`\n📊 Siklus V Pass 32 Result: ${passCount}/${totalChecks} checks passed.`);
if (passCount === totalChecks) {
  console.log('🎉 Siklus V Pass 32 PASSED 100% GREEN!\n');
  process.exit(0);
} else {
  console.error(`❌ Siklus V Pass 32 FAILED with ${totalChecks - passCount} errors.\n`);
  process.exit(1);
}
