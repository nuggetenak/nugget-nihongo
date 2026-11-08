// ══════════════════════════════════════════════════════════════════
//  tests/test-s5-pass33-kebun-kata-garden.js
//  Siklus V — Pass 33: Kebun Kata (Kanji Growth Garden) Visual Retrievability Metaphor
// ══════════════════════════════════════════════════════════════════

import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

console.log('\n🧪 [Siklus V — Pass 33] Kebun Kata (Kanji Growth Garden) Visual Retrievability Metaphor Verification...\n');

let passCount = 0;
const totalChecks = 6;

// ──────────────────────────────────────────────────────────────────
// Check 1: 5-Stage Growth Metaphor & Stage Metadata Specification
// ──────────────────────────────────────────────────────────────────
console.log('📋 Check 1: 5-Stage Growth Metaphor & Stage Metadata Specification');
try {
  const gardenModule = await import('../src/lib/garden/gardenStore.ts');
  const { STAGE_METADATA, getPlantStageInfo } = gardenModule;

  assert.ok(Array.isArray(STAGE_METADATA) && STAGE_METADATA.length === 5, 'Must define exactly 5 growth stages (0 to 4)');

  const expectedStages = [
    { stage: 0, label: 'Benih Ditabur', icon: '🌰' },
    { stage: 1, label: 'Mulai Bertunas', icon: '🌱' },
    { stage: 2, label: 'Tumbuh Batang', icon: '🌿' },
    { stage: 3, label: 'Kuncup Bunga', icon: '🪴' },
    { stage: 4, label: 'Mekar Sempurna', icon: '🌸' },
  ];

  for (let i = 0; i < 5; i++) {
    assert.strictEqual(STAGE_METADATA[i].stage, expectedStages[i].stage);
    assert.strictEqual(STAGE_METADATA[i].label, expectedStages[i].label);
    assert.strictEqual(STAGE_METADATA[i].icon, expectedStages[i].icon);
    assert.ok(typeof STAGE_METADATA[i].desc === 'string' && STAGE_METADATA[i].desc.length > 0);
  }

  // Pure helper getPlantStageInfo
  assert.strictEqual(getPlantStageInfo(0).label, 'Benih Ditabur');
  assert.strictEqual(getPlantStageInfo(4).label, 'Mekar Sempurna');
  assert.strictEqual(getPlantStageInfo(-2).stage, 0, 'Out-of-bounds negative must clamp to 0');
  assert.strictEqual(getPlantStageInfo(99).stage, 4, 'Out-of-bounds high must clamp to 4');

  console.log('  ✅ Check 1 Passed: 5 discrete growth stages (🌰 -> 🌱 -> 🌿 -> 🪴 -> 🌸) and pure helper verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 1 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 2: Initial Garden Store Inventory & State Specifications
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 2: Initial Garden Store Inventory & State Specifications');
try {
  const gardenModule = await import('../src/lib/garden/gardenStore.ts');
  const { useGardenStore, MAX_GARDEN_CAPACITY } = gardenModule;

  assert.strictEqual(MAX_GARDEN_CAPACITY, 36, 'Max garden capacity must be 36 slots');

  const state = useGardenStore.getState();
  assert.ok(Array.isArray(state.plants), 'plants must be an array');
  assert.ok(state.plants.length >= 8, 'Initial inventory must contain at least 8 plants');

  // Verify representative starter kanji
  const kanjiList = state.plants.map((p) => p.kanji);
  assert.ok(kanjiList.includes('日'), 'Starter plants must include 日');
  assert.ok(kanjiList.includes('本'), 'Starter plants must include 本');
  assert.ok(kanjiList.includes('語'), 'Starter plants must include 語');
  assert.ok(kanjiList.includes('心'), 'Starter plants must include 心');

  // Schema verification on all plants
  for (const plant of state.plants) {
    assert.ok(plant.id && typeof plant.id === 'string');
    assert.ok(plant.kanji && typeof plant.kanji === 'string');
    assert.ok(plant.reading && typeof plant.reading === 'string');
    assert.ok(plant.meaning && typeof plant.meaning === 'string');
    assert.ok(['n5', 'n4', 'n3', 'n2', 'n1'].includes(plant.level));
    assert.strictEqual(typeof plant.stage, 'number');
    assert.strictEqual(typeof plant.waterCount, 'number');
    assert.strictEqual(typeof plant.maxWater, 'number');
  }

  console.log(`  ✅ Check 2 Passed: Garden inventory (${state.plants.length} starter plants, 36 max capacity) verified`);
  passCount++;
} catch (err) {
  console.error('  ❌ Check 2 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 3: Watering Lifecycle & Stage Advancement Mathematics
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 3: Watering Lifecycle & Stage Advancement Mathematics');
try {
  const gardenModule = await import('../src/lib/garden/gardenStore.ts');
  const { useGardenStore } = gardenModule;

  // Set predictable sandbox state
  useGardenStore.setState({
    waterDrops: 10,
    plants: [
      { id: 'test-plant-1', kanji: '木', reading: 'き', meaning: 'Pohon', level: 'n5', stage: 0, waterCount: 0, maxWater: 5 },
      { id: 'test-plant-2', kanji: '火', reading: 'ひ', meaning: 'Api', level: 'n5', stage: 4, waterCount: 5, maxWater: 5 },
    ],
  });

  const state1 = useGardenStore.getState();
  assert.strictEqual(state1.waterDrops, 10);

  // Water plant 1 (from stage 0 to stage 0 -> 1/5 -> stage 0)
  const watered1 = state1.waterPlant('test-plant-1');
  assert.strictEqual(watered1, true);
  assert.strictEqual(useGardenStore.getState().waterDrops, 9);
  const p1 = useGardenStore.getState().plants.find((p) => p.id === 'test-plant-1');
  assert.strictEqual(p1.waterCount, 1);
  assert.strictEqual(p1.stage, 0); // Math.floor((1/5)*4) = 0

  // Water plant 2 (already max bloom: stage 4)
  const watered2 = useGardenStore.getState().waterPlant('test-plant-2');
  assert.strictEqual(watered2, false, 'Cannot water already bloomed plant');
  assert.strictEqual(useGardenStore.getState().waterDrops, 9, 'Water drops must not be consumed for bloomed plant');

  // Progressive watering up to bloom
  useGardenStore.getState().waterPlant('test-plant-1'); // count 2 -> stage 1
  assert.strictEqual(useGardenStore.getState().plants.find((p) => p.id === 'test-plant-1').stage, 1); // floor((2/5)*4) = 1

  useGardenStore.getState().waterPlant('test-plant-1'); // count 3 -> stage 2
  assert.strictEqual(useGardenStore.getState().plants.find((p) => p.id === 'test-plant-1').stage, 2); // floor((3/5)*4) = 2

  useGardenStore.getState().waterPlant('test-plant-1'); // count 4 -> stage 3
  assert.strictEqual(useGardenStore.getState().plants.find((p) => p.id === 'test-plant-1').stage, 3); // floor((4/5)*4) = 3

  useGardenStore.getState().waterPlant('test-plant-1'); // count 5 -> stage 4
  assert.strictEqual(useGardenStore.getState().plants.find((p) => p.id === 'test-plant-1').stage, 4); // floor((5/5)*4) = 4

  // Next water must fail because it reached max bloom
  assert.strictEqual(useGardenStore.getState().waterPlant('test-plant-1'), false);

  console.log('  ✅ Check 3 Passed: Discrete stage progression (0 -> 1 -> 2 -> 3 -> 4) and max bloom guard verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 3 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 4: Cognitive Lapse Wilt Metaphor (applyLapseWilt)
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 4: Cognitive Lapse Wilt Metaphor (applyLapseWilt)');
try {
  const gardenModule = await import('../src/lib/garden/gardenStore.ts');
  const { useGardenStore } = gardenModule;

  useGardenStore.setState({
    waterDrops: 5,
    plants: [
      { id: 'wilt-test-1', kanji: '水', reading: 'みず', meaning: 'Air', level: 'n5', stage: 4, waterCount: 5, maxWater: 5 },
      { id: 'wilt-test-2', kanji: '山', reading: 'やま', meaning: 'Gunung', level: 'n5', stage: 0, waterCount: 0, maxWater: 5 },
    ],
  });

  // Targeted lapse wilt on 水 (stage 4 -> stage 3)
  const wilted = useGardenStore.getState().applyLapseWilt('水');
  assert.strictEqual(wilted, true);

  const mizu = useGardenStore.getState().plants.find((p) => p.kanji === '水');
  assert.strictEqual(mizu.waterCount, 4);
  assert.strictEqual(mizu.stage, 3, 'Water count 4/5 must drop stage to 3 (Kuncup Bunga)');

  // Stage 0 plant cannot wilt further
  const yamaWilted = useGardenStore.getState().applyLapseWilt('山');
  assert.strictEqual(yamaWilted, false, 'Plant at stage 0 cannot wilt further');
  const yama = useGardenStore.getState().plants.find((p) => p.kanji === '山');
  assert.strictEqual(yama.waterCount, 0);
  assert.strictEqual(yama.stage, 0);

  console.log('  ✅ Check 4 Passed: Cognitive lapse wilting (stage 4 -> stage 3) and zero floor bound verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 4 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 5: Seed Planting Capacity & Duplicate Prevention (seedPlant)
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 5: Seed Planting Capacity & Duplicate Prevention (seedPlant)');
try {
  const gardenModule = await import('../src/lib/garden/gardenStore.ts');
  const { useGardenStore, MAX_GARDEN_CAPACITY } = gardenModule;

  useGardenStore.setState({
    waterDrops: 5,
    plants: [
      { id: 'seed-p1', kanji: '川', reading: 'かわ', meaning: 'Sungai', level: 'n5', stage: 0, waterCount: 0, maxWater: 5 },
    ],
  });

  // Successful planting of new kanji
  const planted = useGardenStore.getState().seedPlant('空', 'そら', 'Langit', 'n5');
  assert.strictEqual(planted, true);
  assert.strictEqual(useGardenStore.getState().plants.length, 2);
  const sora = useGardenStore.getState().plants.find((p) => p.kanji === '空');
  assert.ok(sora);
  assert.strictEqual(sora.stage, 0);
  assert.strictEqual(sora.waterCount, 0);

  // Duplicate planting rejection
  const dupPlanted = useGardenStore.getState().seedPlant('空', 'そら', 'Langit', 'n5');
  assert.strictEqual(dupPlanted, false, 'Must reject duplicate kanji planting');
  assert.strictEqual(useGardenStore.getState().plants.length, 2);

  // Full garden capacity rejection
  const fullPlants = Array.from({ length: MAX_GARDEN_CAPACITY }, (_, i) => ({
    id: `fill-${i}`,
    kanji: `字${i}`,
    reading: `じ${i}`,
    meaning: `arti${i}`,
    level: 'n5',
    stage: 0,
    waterCount: 0,
    maxWater: 5,
  }));
  useGardenStore.setState({ plants: fullPlants });

  const overflowPlanted = useGardenStore.getState().seedPlant('星', 'ほし', 'Bintang', 'n4');
  assert.strictEqual(overflowPlanted, false, 'Must reject planting when garden reaches capacity 36');

  console.log('  ✅ Check 5 Passed: seedPlant success, deduplication, and 36 capacity limit verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 5 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Check 6: Responsive Ergonomics & FSRS Math Cockpit in KebunPage.tsx
// ──────────────────────────────────────────────────────────────────
console.log('\n📋 Check 6: Responsive Ergonomics & FSRS Math Cockpit in KebunPage.tsx');
try {
  const pageSource = fs.readFileSync(path.join(projectRoot, 'src/pages/KebunPage.tsx'), 'utf8');

  // True FSRS v4 forgetting curve formula documentation & import
  assert.ok(pageSource.includes('fsrsForgettingCurve'), 'Must import fsrsForgettingCurve from math.ts');
  assert.ok(pageSource.includes('getFSRSDueCount(cards)'), 'Must calculate due cards via getFSRSDueCount');
  assert.ok(pageSource.includes('estimatedRetrievability'), 'Must compute estimatedRetrievability');

  // Segmented view controller
  assert.ok(pageSource.includes("setActiveView('garden')"), 'Must provide garden view switch');
  assert.ok(pageSource.includes("setActiveView('metrics')"), 'Must provide metrics view switch');

  // Safe area padding & anti-leakage
  assert.ok(pageSource.includes('pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12'), 'Must maintain safe area cushion');
  assert.ok(pageSource.includes('min-w-0 overflow-x-hidden'), 'Must enforce anti-overflow layout wrapper');

  // Touch target dimensions
  assert.ok(pageSource.includes('min-h-[44px]'), 'CTA review and primary actions must enforce 44px');
  assert.ok(pageSource.includes('min-h-[40px]'), 'Water single and category filter pills must enforce 40px');

  // Shared stage metadata integration
  assert.ok(pageSource.includes('STAGE_METADATA'), 'Must import canonical STAGE_METADATA from gardenStore');

  console.log('  ✅ Check 6 Passed: FSRS v4 math integration, responsive cockpit, and touch targets verified');
  passCount++;
} catch (err) {
  console.error('  ❌ Check 6 Failed:', err.message);
}

// ──────────────────────────────────────────────────────────────────
// Master Verification Summary
// ──────────────────────────────────────────────────────────────────
console.log(`\n📊 Siklus V Pass 33 Result: ${passCount}/${totalChecks} checks passed.`);
if (passCount === totalChecks) {
  console.log('🎉 Siklus V Pass 33 PASSED 100% GREEN!\n');
  process.exit(0);
} else {
  console.error(`❌ Siklus V Pass 33 FAILED with ${totalChecks - passCount} errors.\n`);
  process.exit(1);
}
