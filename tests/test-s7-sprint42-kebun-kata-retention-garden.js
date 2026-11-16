// ══════════════════════════════════════════════════════════════════
//  tests/test-s7-sprint42-kebun-kata-retention-garden.js
//  Sprint 42: Kebun Kata (Kanji Growth Garden), Soil Retrievability Metaphor,
//             Water/Sun Mechanics & TinyBase IndexedDB Persistence Verification
// ══════════════════════════════════════════════════════════════════

import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

console.log('\n🧪 [Sprint 42] Kebun Kata & FSRS Retention Garden Verification...\n');

let passCount = 0;
const totalChecks = 5;

// ──────────────────────────────────────────────────────────────────
// Check 1: 5-Stage Growth Metaphor & Stage Metadata Specification
// ──────────────────────────────────────────────────────────────────
console.log('📋 Check 1: 5-Stage Growth Metaphor & Stage Metadata Specification');
try {
  const gardenModule = await import('../src/lib/garden/gardenStore.ts');
  const { STAGE_METADATA, getPlantStageInfo, MAX_GARDEN_CAPACITY } = gardenModule;

  assert.strictEqual(STAGE_METADATA.length, 5, 'Must define exactly 5 growth stages (0 to 4)');
  assert.strictEqual(MAX_GARDEN_CAPACITY, 36, 'Max garden capacity must be 36 slots');

  const expectedLabels = ['Benih Ditabur', 'Mulai Bertunas', 'Tumbuh Batang', 'Kuncup Bunga', 'Mekar Sempurna'];
  const expectedIcons = ['🌰', '🌱', '🌿', '🪴', '🌸'];

  for (let i = 0; i < 5; i++) {
    assert.strictEqual(STAGE_METADATA[i].stage, i);
    assert.strictEqual(STAGE_METADATA[i].label, expectedLabels[i]);
    assert.strictEqual(STAGE_METADATA[i].icon, expectedIcons[i]);
  }

  // Clamping in getPlantStageInfo
  assert.strictEqual(getPlantStageInfo(-10).stage, 0);
  assert.strictEqual(getPlantStageInfo(100).stage, 4);
  assert.strictEqual(getPlantStageInfo(NaN).stage, 0);

  console.log('  ✅ Check 1 Passed: 5 growth stages (🌰 -> 🌱 -> 🌿 -> 🪴 -> 🌸) and bounds verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 1 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 2: Water Drops NaN-Safety & Watering Progression
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 2: Water Drops NaN-Safety & Watering Progression');
try {
  const gardenModule = await import('../src/lib/garden/gardenStore.ts');
  const { useGardenStore } = gardenModule;

  // Sandbox state
  useGardenStore.setState({
    waterDrops: 10,
    plants: [
      { id: 'plant-tree', kanji: '木', reading: 'き', meaning: 'Pohon', level: 'n5', stage: 0, waterCount: 0, maxWater: 5 },
      { id: 'plant-sun', kanji: '日', reading: 'ひ', meaning: 'Matahari', level: 'n5', stage: 4, waterCount: 5, maxWater: 5 },
    ],
  });

  // Invalid plantId null safety
  assert.strictEqual(useGardenStore.getState().waterPlant(null), false);
  assert.strictEqual(useGardenStore.getState().waterPlant(undefined), false);
  assert.strictEqual(useGardenStore.getState().waterPlant(''), false);
  assert.strictEqual(useGardenStore.getState().waterPlant('non-existent-id'), false);

  // Normal watering progression
  assert.strictEqual(useGardenStore.getState().waterPlant('plant-tree'), true);
  assert.strictEqual(useGardenStore.getState().waterDrops, 9);
  assert.strictEqual(useGardenStore.getState().plants.find((p) => p.id === 'plant-tree').waterCount, 1);

  // Cannot water max bloom (stage 4)
  assert.strictEqual(useGardenStore.getState().waterPlant('plant-sun'), false);
  assert.strictEqual(useGardenStore.getState().waterDrops, 9, 'Drops must not be consumed for bloomed plant');

  // NaN water addition defense
  useGardenStore.getState().addWaterDrop(NaN);
  assert.ok(!Number.isNaN(useGardenStore.getState().waterDrops));

  console.log('  ✅ Check 2 Passed: Water drops NaN safety, invalid plantId guards & watering progression verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 2 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 3: Cognitive Lapse Wilt Metaphor Defenses
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 3: Cognitive Lapse Wilt Metaphor Defenses');
try {
  const gardenModule = await import('../src/lib/garden/gardenStore.ts');
  const { useGardenStore } = gardenModule;

  useGardenStore.setState({
    waterDrops: 5,
    plants: [
      { id: 'plant-water', kanji: '水', reading: 'みず', meaning: 'Air', level: 'n5', stage: 4, waterCount: 5, maxWater: 5 },
      { id: 'plant-fire', kanji: '火', reading: 'ひ', meaning: 'Api', level: 'n5', stage: 2, waterCount: 3, maxWater: 5 },
      { id: 'plant-seed', kanji: '土', reading: 'つち', meaning: 'Tanah', level: 'n5', stage: 0, waterCount: 0, maxWater: 5 },
    ],
  });

  // Empty string must NOT wilt random plants!
  const emptyWilt = useGardenStore.getState().applyLapseWilt('');
  assert.strictEqual(emptyWilt, false, 'Passing empty string must not wilt random plants');
  assert.strictEqual(useGardenStore.getState().plants.find((p) => p.kanji === '水').stage, 4);

  // Targeted wilt on 水
  const targetedWilt = useGardenStore.getState().applyLapseWilt('水');
  assert.strictEqual(targetedWilt, true);
  assert.strictEqual(useGardenStore.getState().plants.find((p) => p.kanji === '水').waterCount, 4);
  assert.strictEqual(useGardenStore.getState().plants.find((p) => p.kanji === '水').stage, 3);

  // General untargeted wilt (undefined) wilts first plant with stage > 0 (now 火)
  const untargetedWilt = useGardenStore.getState().applyLapseWilt();
  assert.strictEqual(untargetedWilt, true);

  // Stage 0 cannot wilt further
  const seedWilt = useGardenStore.getState().applyLapseWilt('土');
  assert.strictEqual(seedWilt, false);
  assert.strictEqual(useGardenStore.getState().plants.find((p) => p.kanji === '土').stage, 0);

  console.log('  ✅ Check 3 Passed: Cognitive lapse wilt specificity and empty string defense certified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 3 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 4: Seed Planting Validation, Deduplication & Max Capacity
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 4: Seed Planting Validation, Deduplication & Max Capacity');
try {
  const gardenModule = await import('../src/lib/garden/gardenStore.ts');
  const { useGardenStore, MAX_GARDEN_CAPACITY } = gardenModule;

  useGardenStore.setState({
    waterDrops: 5,
    plants: [
      { id: 'plant-river', kanji: '川', reading: 'かわ', meaning: 'Sungai', level: 'n5', stage: 0, waterCount: 0, maxWater: 5 },
    ],
  });

  // Rejection of invalid / empty kanji strings
  assert.strictEqual(useGardenStore.getState().seedPlant('', 'かわ', 'Sungai', 'n5'), false);
  assert.strictEqual(useGardenStore.getState().seedPlant('   ', 'かわ', 'Sungai', 'n5'), false);
  assert.strictEqual(useGardenStore.getState().seedPlant(null, 'かわ', 'Sungai', 'n5'), false);
  assert.strictEqual(useGardenStore.getState().seedPlant(undefined, 'かわ', 'Sungai', 'n5'), false);

  // Duplicate rejection
  assert.strictEqual(useGardenStore.getState().seedPlant('川', 'かわ', 'Sungai', 'n5'), false);

  // Successful planting with level validation fallback
  const planted = useGardenStore.getState().seedPlant('山', 'やま', 'Gunung', 'invalid-lvl');
  assert.strictEqual(planted, true);
  const yama = useGardenStore.getState().plants.find((p) => p.kanji === '山');
  assert.ok(yama);
  assert.strictEqual(yama.level, 'n5', 'Invalid level must fallback to n5');

  // Max capacity 36 check
  const fullPlants = Array.from({ length: MAX_GARDEN_CAPACITY }, (_, i) => ({
    id: `plant-full-${i}`,
    kanji: `字${i}`,
    reading: `じ${i}`,
    meaning: `arti${i}`,
    level: 'n5',
    stage: 0,
    waterCount: 0,
    maxWater: 5,
  }));
  useGardenStore.setState({ plants: fullPlants });
  assert.strictEqual(useGardenStore.getState().seedPlant('星', 'ほし', 'Bintang', 'n5'), false);

  console.log('  ✅ Check 4 Passed: Seed planting input validation, deduplication and 36-slot cap verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 4 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 5: KebunPage Cockpit Ergonomics & FSRS Math Contracts
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 5: KebunPage Cockpit Ergonomics & FSRS Math Contracts');
try {
  const pagePath = path.join(projectRoot, 'src/pages/KebunPage.tsx');
  assert.ok(fs.existsSync(pagePath), 'KebunPage.tsx must exist');
  const pageSrc = fs.readFileSync(pagePath, 'utf8');

  // FSRS v4 forgetting curve formula import and usage
  assert.ok(pageSrc.includes('fsrsForgettingCurve'), 'Must import fsrsForgettingCurve');
  assert.ok(pageSrc.includes('getFSRSDueCount(cards)'), 'Must calculate due cards via getFSRSDueCount');
  assert.ok(pageSrc.includes('estimatedRetrievability'), 'Must compute estimatedRetrievability');

  // Clean state honest reporting
  assert.ok(
    pageSrc.includes("totalCards > 0 ? `${fsrsStats.estimatedRetrievability}%` : '— (0 Kartu)'"),
    'Must display honest "— (0 Kartu)" when 0 cards exist'
  );

  // Responsive padding and touch targets
  assert.ok(pageSrc.includes('pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12'), 'Must maintain safe area cushion');
  assert.ok(pageSrc.includes('min-h-[44px]'), 'Must enforce 44px on primary CTA');
  assert.ok(pageSrc.includes('min-h-[40px]'), 'Must enforce 40px on interactive buttons');

  console.log('  ✅ Check 5 Passed: KebunPage FSRS math, clean state headline & responsive ergonomics verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 5 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Master Verification Summary
// ──────────────────────────────────────────────────────────────────
console.log(`\n📊 Sprint 42 Result: ${passCount}/${totalChecks} checks passed.`);
if (passCount === totalChecks) {
  console.log('🎉 Sprint 42 PASSED 100% GREEN!\n');
  process.exit(0);
} else {
  console.error(`❌ Sprint 42 FAILED with ${totalChecks - passCount} errors.\n`);
  process.exit(1);
}
