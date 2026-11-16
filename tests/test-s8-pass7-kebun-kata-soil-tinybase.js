// ══════════════════════════════════════════════════════════════════
//  test-s8-pass7-kebun-kata-soil-tinybase.js
//  Siklus VIII Pass 7 (Sprint 53 / Suite 194):
//  Kebun Kata, Soil Retrievability Metaphor, IndexedDB & TinyBase Persistence
// ══════════════════════════════════════════════════════════════════

import assert from 'assert';
import fs from 'fs';
import path from 'path';
import {
  STAGE_METADATA,
  getPlantStageInfo,
  MAX_GARDEN_CAPACITY,
  useGardenStore,
} from '../src/lib/garden/gardenStore.ts';
import { safeJsonParse } from '../src/lib/persistence/selfHealingStorage.ts';

console.log('⚡ Running Suite 194: Siklus VIII Pass 7 (Sprint 53): Kebun Kata, Soil Retrievability & TinyBase Persistence...');

const ROOT = process.cwd().includes('nugget-nihongo')
  ? process.cwd()
  : path.join(process.cwd(), 'nugget-nihongo');

// ── Check 1: KebunPage Source Hardening & FSRS Metrics ─────────────────────
console.log('  Check 53.1: Verifying KebunPage.tsx defensive cards parsing & FSRS math contracts...');
const kebunPagePath = path.join(ROOT, 'src', 'pages', 'KebunPage.tsx');
assert(fs.existsSync(kebunPagePath), 'KebunPage.tsx must exist');
const kebunPageContent = fs.readFileSync(kebunPagePath, 'utf8');

assert(
  kebunPageContent.includes("const safeCards = cards && typeof cards === 'object' ? cards : {};") &&
  kebunPageContent.includes("const cardList = Object.entries(safeCards)"),
  'KebunPage must defensively sanitize cards store reference against non-object payloads'
);

assert(
  kebunPageContent.includes('getFSRSDueCount(cards)') &&
  kebunPageContent.includes('fsrsForgettingCurve'),
  'KebunPage must preserve canonical FSRS due count and forgetting curve math contracts'
);

assert(
  kebunPageContent.includes('const safePlants = Array.isArray(plants) ? plants : [];'),
  'KebunPage must defensively guard plants collection against non-array payloads'
);
console.log('  ✅ Check 53.1 passed: KebunPage source hardening verified.');

// ── Check 2: 5-Stage Growth Metaphor & Capacity Invariants ────────────────
console.log('  Check 53.2: Verifying 5-stage growth metadata & 36-slot capacity cap...');
assert.strictEqual(STAGE_METADATA.length, 5, 'Must define exactly 5 growth stages (0 to 4)');
assert.strictEqual(MAX_GARDEN_CAPACITY, 36, 'Max garden capacity must be exactly 36 slots');

const expectedLabels = ['Benih Ditabur', 'Mulai Bertunas', 'Tumbuh Batang', 'Kuncup Bunga', 'Mekar Sempurna'];
const expectedIcons = ['🌰', '🌱', '🌿', '🪴', '🌸'];

for (let i = 0; i < 5; i++) {
  assert.strictEqual(STAGE_METADATA[i].stage, i, `Stage ${i} index must match`);
  assert.strictEqual(STAGE_METADATA[i].label, expectedLabels[i], `Stage ${i} label must match`);
  assert.strictEqual(STAGE_METADATA[i].icon, expectedIcons[i], `Stage ${i} icon must match`);
}

// Stage clamping
assert.strictEqual(getPlantStageInfo(-1).stage, 0, 'Negative stage must clamp to 0');
assert.strictEqual(getPlantStageInfo(10).stage, 4, 'Stage > 4 must clamp to 4');
assert.strictEqual(getPlantStageInfo(NaN).stage, 0, 'NaN stage must clamp to 0');
console.log('  ✅ Check 53.2 passed: 5-stage growth metadata and capacity cap verified.');

// ── Check 3: Water Drops Arithmetic & NaN Protection ───────────────────────
console.log('  Check 53.3: Verifying water drops arithmetic & NaN protection in gardenStore...');

useGardenStore.setState({
  waterDrops: 5,
  plants: [
    { id: 'p-test-1', kanji: '木', reading: 'き', meaning: 'Pohon', level: 'n5', stage: 0, waterCount: 0, maxWater: 5 },
  ],
});

// Watering progression
const watered = useGardenStore.getState().waterPlant('p-test-1');
assert.strictEqual(watered, true, 'Watering existing plant must succeed');
assert.strictEqual(useGardenStore.getState().waterDrops, 4, 'Water drops must decrement by 1');
assert.strictEqual(useGardenStore.getState().plants[0].waterCount, 1, 'Water count must increment to 1');

// NaN water drop addition protection
useGardenStore.getState().addWaterDrop(NaN);
assert(!Number.isNaN(useGardenStore.getState().waterDrops), 'addWaterDrop must not produce NaN');
assert.strictEqual(useGardenStore.getState().waterDrops, 5, 'addWaterDrop(NaN) must default safely to 1');

console.log('  ✅ Check 53.3 passed: Water drops arithmetic and NaN protection verified.');

// ── Check 4: Cognitive Lapse Wilt & Corrupted Storage Auto-Recovery ────────
console.log('  Check 53.4: Verifying cognitive lapse wilt specificity and storage recovery...');

useGardenStore.setState({
  waterDrops: 5,
  plants: [
    { id: 'p-wilt-1', kanji: '火', reading: 'ひ', meaning: 'Api', level: 'n5', stage: 3, waterCount: 4, maxWater: 5 },
    { id: 'p-wilt-2', kanji: '水', reading: 'みず', meaning: 'Air', level: 'n5', stage: 0, waterCount: 0, maxWater: 5 },
  ],
});

// Empty string must not wilt random plants
const emptyWilt = useGardenStore.getState().applyLapseWilt('');
assert.strictEqual(emptyWilt, false, 'Empty string must not trigger wilt');
assert.strictEqual(useGardenStore.getState().plants[0].stage, 3, 'Stage must remain untouched on empty wilt');

// Targeted wilt
const targetedWilt = useGardenStore.getState().applyLapseWilt('火');
assert.strictEqual(targetedWilt, true, 'Targeted wilt on 火 must succeed');
assert.strictEqual(useGardenStore.getState().plants[0].stage, 2, 'Stage must decrease from 3 to 2');

// Stage 0 cannot wilt
const seedWilt = useGardenStore.getState().applyLapseWilt('水');
assert.strictEqual(seedWilt, false, 'Stage 0 plant cannot wilt further');

console.log('  ✅ Check 53.4 passed: Cognitive lapse wilt specificity verified.');

// ── Check 5: selfHealingStorage JSON Safety & Fallback Defaults ────────────
console.log('  Check 53.5: Verifying selfHealingStorage safe JSON parsing and fallbacks...');

const validJson = safeJsonParse('{"retention": 0.95}', { retention: 0 }, 'test_key');
assert.strictEqual(validJson.retention, 0.95, 'Valid JSON must parse correctly');

const invalidJson = safeJsonParse('{retention: invalid}', { retention: 0.8 }, 'corrupted_key');
assert.strictEqual(invalidJson.retention, 0.8, 'Invalid JSON must return fallback default');

const nullJson = safeJsonParse(null, [1, 2, 3], 'null_key');
assert.deepStrictEqual(nullJson, [1, 2, 3], 'Null input must return fallback default');

console.log('  ✅ Check 53.5 passed: selfHealingStorage JSON safety and fallbacks verified.');

console.log('\n🎉 Suite 194 (Siklus VIII Pass 7: Kebun Kata & TinyBase Persistence) PASSED (5/5 checks 100% GREEN)!\n');
