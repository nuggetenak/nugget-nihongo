// ══════════════════════════════════════════════════════════════════
//  tests/test-kotowaza-expansion.js — 366+ Kotowaza Gallery Test Suite
//  Validates Cumulative Regression Contract & Leap Year Uniqueness
// ══════════════════════════════════════════════════════════════════

const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('🧪 Starting 366+ Kotowaza Gallery Regression Test Suite...\n');

// 1. Read kotowaza.ts and extract data
const filePath = path.join(__dirname, '../src/lib/data/kotowaza.ts');
assert(fs.existsSync(filePath), 'kotowaza.ts file must exist');

const content = fs.readFileSync(filePath, 'utf8');
const match = content.match(/export const KOTOWAZA_COLLECTION: Kotowaza\[\] = (\[[\s\S]*?\]);/);
assert(match, 'KOTOWAZA_COLLECTION must be defined and exported');

const proverbs = eval(match[1]);

// ── Test 1: Minimum Count Requirement (366+ days) ──
console.log('Checking Test 1: Total count >= 366 for leap year...');
assert(
  proverbs.length >= 366,
  `Proverbs collection must have at least 366 entries for a full leap year, but got ${proverbs.length}`
);
console.log(`✅ Passed: Collection contains ${proverbs.length} proverbs (exceeds 366 days).\n`);

// ── Test 2: ID Uniqueness & Sequential Formatting ──
console.log('Checking Test 2: ID uniqueness & pattern...');
const idSet = new Set();
proverbs.forEach((item, idx) => {
  assert(item.id, `Item at index ${idx} must have an ID`);
  assert(!idSet.has(item.id), `Duplicate ID found: ${item.id}`);
  idSet.add(item.id);
  assert(
    /^ktw-\d{3}$/.test(item.id),
    `ID format must match 'ktw-XXX', got: ${item.id}`
  );
});
console.log(`✅ Passed: All ${idSet.size} IDs are unique and follow 'ktw-XXX' format.\n`);

// ── Test 3: Japanese Text (jp) Uniqueness ──
console.log('Checking Test 3: Japanese text (jp) uniqueness...');
const jpSet = new Set();
proverbs.forEach((item) => {
  assert(item.jp, `Item ${item.id} must have non-empty jp text`);
  assert(!jpSet.has(item.jp), `Duplicate Japanese proverb found: ${item.jp} (${item.id})`);
  jpSet.add(item.jp);
});
console.log(`✅ Passed: All ${jpSet.size} Japanese proverbs are completely unique.\n`);

// ── Test 4: Schema Completeness Contract ──
console.log('Checking Test 4: Schema completeness (reading, romaji, meaning, wisdom, category)...');
let withOriginCount = 0;
let withLiteralCount = 0;

proverbs.forEach((item) => {
  assert(typeof item.reading === 'string' && item.reading.trim().length > 0, `Missing reading on ${item.id}`);
  assert(typeof item.romaji === 'string' && item.romaji.trim().length > 0, `Missing romaji on ${item.id}`);
  assert(typeof item.meaning === 'string' && item.meaning.trim().length > 0, `Missing meaning on ${item.id}`);
  assert(typeof item.wisdom === 'string' && item.wisdom.trim().length > 0, `Missing wisdom on ${item.id}`);
  assert(typeof item.category === 'string' && item.category.trim().length > 0, `Missing category on ${item.id}`);
  if (item.origin) withOriginCount++;
  if (item.literal) withLiteralCount++;
});
console.log(`✅ Passed: 100% of ${proverbs.length} entries have all required fields.`);
console.log(`ℹ️ Entries with cultural origins: ${withOriginCount}/${proverbs.length}`);
console.log(`ℹ️ Entries with literal translations: ${withLiteralCount}/${proverbs.length}\n`);

// ── Test 5: Category Normalization & Distribution ──
console.log('Checking Test 5: Category distribution...');
const categoryMap = new Map();
proverbs.forEach((item) => {
  categoryMap.set(item.category, (categoryMap.get(item.category) || 0) + 1);
});

assert(categoryMap.size >= 10, `Expected at least 10 categories, got ${categoryMap.size}`);
for (const [cat, count] of categoryMap.entries()) {
  assert(count >= 3, `Category "${cat}" must have at least 3 entries, got ${count}`);
}
console.log(`✅ Passed: ${categoryMap.size} balanced categories found.`);
console.log('Category breakdown:', Object.fromEntries(categoryMap), '\n');

// ── Test 6: Deterministic Daily Proverb (366 Days Uniqueness) ──
console.log('Checking Test 6: 366-day daily proverb cycle coverage...');
const dailyProverbIdsAcrossYear = new Set();
const DAY_MS = 86400000;
const startEpoch = 1770000000000; // arbitrary base

for (let day = 0; day < 366; day++) {
  const currentEpoch = startEpoch + (day * DAY_MS);
  const dayIndex = Math.floor(currentEpoch / DAY_MS);
  const selected = proverbs[dayIndex % proverbs.length];
  assert(selected && selected.id, `Failed to select daily proverb for day ${day}`);
  dailyProverbIdsAcrossYear.add(selected.id);
}

assert.strictEqual(
  dailyProverbIdsAcrossYear.size,
  366,
  `Daily proverb must yield exactly 366 distinct proverbs across 366 consecutive days, but got ${dailyProverbIdsAcrossYear.size}`
);
console.log(`✅ Passed: Exactly 366 distinct proverbs generated across 366 consecutive days of a leap year!\n`);

// ── Test 7: Indonesian Keyword Search & Pedagogy Validation ──
console.log('Checking Test 7: Indonesian search keyword coverage...');
const sampleKeywords = ['tekun', 'burung', 'waktu', 'batu', 'kebaikan', 'usaha', 'hati', 'langkah'];
sampleKeywords.forEach((kw) => {
  const matches = proverbs.filter(
    (p) =>
      p.meaning.toLowerCase().includes(kw) ||
      p.wisdom.toLowerCase().includes(kw) ||
      (p.literal && p.literal.toLowerCase().includes(kw))
  );
  assert(matches.length > 0, `Search keyword "${kw}" should return at least one proverb`);
});
console.log(`✅ Passed: All pedagogical keyword searches return rich proverb matches.\n`);

console.log('🎉 ALL 366+ KOTOWAZA SUITE TESTS PASSED 100% GREEN!\n');
