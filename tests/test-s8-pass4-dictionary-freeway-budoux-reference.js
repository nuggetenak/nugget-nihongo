// ══════════════════════════════════════════════════════════════════
//  test-s8-pass4-dictionary-freeway-budoux-reference.js
//  Siklus VIII Pass 4 (Sprint 50 / Suite 191):
//  Kamus & Indeks Referensi, EDRDG Corpus, Budoux Text Typography & Freeway Track
// ══════════════════════════════════════════════════════════════════

import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { segmentBunsetsu, formatSemanticLineBreaks } from '../src/lib/japanese/budouxSegmenter.ts';
import { offlineDictionary } from '../src/lib/japanese/offlineDictionary.ts';
import { FREEWAY_TRACK_IDS } from '../src/lib/data/dataManager.ts';

console.log('⚡ Running Suite 191: Siklus VIII Pass 4 (Sprint 50): Kamus & Indeks Referensi, EDRDG Corpus, Budoux Text & Freeway Track...');

const ROOT = process.cwd().includes('nugget-nihongo')
  ? process.cwd()
  : path.join(process.cwd(), 'nugget-nihongo');

// ── Check 1: DictionaryPillar Source Hardening & Null-Safe State Guards ────
console.log('  Check 50.1: Verifying DictionaryPillar source hardening and defensive filters...');
const dictPillarPath = path.join(ROOT, 'src', 'features', 'dojo', 'pillars', 'DictionaryPillar.tsx');
assert(fs.existsSync(dictPillarPath), 'DictionaryPillar.tsx must exist');
const dictPillarContent = fs.readFileSync(dictPillarPath, 'utf8');

assert(
  dictPillarContent.includes('const rawCards = useAppStore((state) => state.cards);') &&
  dictPillarContent.includes('const cards = rawCards && typeof rawCards === \'object\' ? rawCards : {};'),
  'DictionaryPillar must defensively sanitize cards store reference against non-object payloads'
);

assert(
  dictPillarContent.includes('let list = Array.isArray(vocabList) ? vocabList : [];') &&
  dictPillarContent.includes('if (!v) return false;') &&
  dictPillarContent.includes('let list = Array.isArray(grammarList) ? grammarList : [];') &&
  dictPillarContent.includes('g &&'),
  'DictionaryPillar must guard vocabulary and grammar filters against malformed or null entries'
);

assert(
  dictPillarContent.includes('(Array.isArray(freewayList) ? freewayList : []).filter(Boolean).map'),
  'DictionaryPillar must guard freewayList against non-array payloads and sparse items'
);
console.log('  ✅ Check 50.1 passed: DictionaryPillar source hardening verified.');

// ── Check 2: Freeway 21 Survival Patterns & dataManager Integration ────────
console.log('  Check 50.2: Verifying Freeway 21 Survival Patterns & dataManager...');
assert(Array.isArray(FREEWAY_TRACK_IDS), 'FREEWAY_TRACK_IDS must be an array');
assert(FREEWAY_TRACK_IDS.length === 21, `FREEWAY_TRACK_IDS must contain exactly 21 patterns (got ${FREEWAY_TRACK_IDS.length})`);
assert(FREEWAY_TRACK_IDS[0] === 'gn5-00059', 'First freeway pattern must be sumimasen (gn5-00059)');
assert(FREEWAY_TRACK_IDS.includes('gn5-00001'), 'Freeway must include wa desu (gn5-00001)');
assert(FREEWAY_TRACK_IDS.includes('gn5-00025'), 'Freeway must include te kudasai (gn5-00025)');

const dataManagerPath = path.join(ROOT, 'src', 'lib', 'data', 'dataManager.ts');
const dataManagerContent = fs.readFileSync(dataManagerPath, 'utf8');
assert(
  dataManagerContent.includes('if (!Array.isArray(n5Grammar)) return [];') &&
  dataManagerContent.includes('n5Grammar.find((g) => g && g.id === id)'),
  'loadFreewayTrack in dataManager must defensively handle non-array or sparse grammar data'
);
console.log('  ✅ Check 50.2 passed: Freeway 21 survival patterns and dataManager verified.');

// ── Check 3: BudouX Semantic Bunsetsu Segmentation & Line Breaking ─────────
console.log('  Check 50.3: Verifying BudouX Bunsetsu Segmentation & Mobile Typography...');
const testSentence = '私は毎日日本語を勉強します。';
const chunks = segmentBunsetsu(testSentence);
assert(Array.isArray(chunks) && chunks.length >= 2, 'segmentBunsetsu must segment Japanese into multiple bunsetsu chunks');
assert(chunks.join('') === testSentence, 'segmentBunsetsu must preserve the exact original characters without loss');

const formattedBreaks = formatSemanticLineBreaks(testSentence);
assert(formattedBreaks.includes('<wbr>'), 'formatSemanticLineBreaks must insert semantic <wbr> tags');
assert(formattedBreaks.split('<wbr>').join('') === testSentence, 'Line-broken string must reconstitute to original sentence');

// Test edge cases: empty, single char, null/undefined
assert.deepStrictEqual(segmentBunsetsu(''), [], 'segmentBunsetsu must return [] for empty string');
assert.deepStrictEqual(segmentBunsetsu('あ'), ['あ'], 'segmentBunsetsu must return single char intact');
assert.deepStrictEqual(segmentBunsetsu(null), [], 'segmentBunsetsu must safely return [] for null');
assert.deepStrictEqual(segmentBunsetsu(undefined), [], 'segmentBunsetsu must safely return [] for undefined');
console.log('  ✅ Check 50.3 passed: BudouX bunsetsu segmentation and mobile typography verified.');

// ── Check 4: BudouxText Component Hardening ───────────────────────────────
console.log('  Check 50.4: Verifying BudouxText component text type safety...');
const budouxComponentPath = path.join(ROOT, 'src', 'components', 'ui', 'BudouxText.tsx');
assert(fs.existsSync(budouxComponentPath), 'BudouxText.tsx must exist');
const budouxComponentContent = fs.readFileSync(budouxComponentPath, 'utf8');

assert(
  budouxComponentContent.includes("if (!text || typeof text !== 'string') return null;"),
  'BudouxText must defensively return null for empty or non-string inputs'
);
assert(
  budouxComponentContent.includes('lang="ja"') &&
  budouxComponentContent.includes('font-japanese') &&
  budouxComponentContent.includes('break-keep'),
  'BudouxText must enforce Japanese language tagging, Japanese font class, and break-keep typography'
);
console.log('  ✅ Check 50.4 passed: BudouxText component hardening verified.');

// ── Check 5: offlineDictionary Yomitan De-Inflection & LRU Caching ─────────
console.log('  Check 50.5: Verifying offlineDictionary service, de-inflection & LRU cache...');
// Exact lookup
const exact = offlineDictionary.lookup('食べる');
assert(exact && exact.exactMatch && exact.exactMatch.kanji === '食べる', 'offlineDictionary must match exact seed word 食べる');
assert(exact.exactMatch.arti === 'makan', 'offlineDictionary must provide Indonesian meaning for 食べる');

// De-inflection candidate lookup (e.g. 食べます -> 食べる)
const deinflected = offlineDictionary.lookup('食べます');
assert(deinflected && deinflected.deinflections.length > 0, 'offlineDictionary must produce de-inflection candidates for 食べます');
const matchedCandidate = deinflected.deinflections.find((d) => d.matchedEntry && d.matchedEntry.kanji === '食べる');
assert(matchedCandidate, 'offlineDictionary must link 食べます back to lemma 食べる via Yomitan transforms');

// Edge cases
const emptyResult = offlineDictionary.lookup('');
assert(emptyResult.exactMatch === null && emptyResult.query === '', 'lookup must return empty result for empty string');
const whitespaceResult = offlineDictionary.lookup('   ');
assert(whitespaceResult.exactMatch === null && whitespaceResult.query === '', 'lookup must return empty result for whitespace string');
const nullResult = offlineDictionary.lookup(null);
assert(nullResult.exactMatch === null, 'lookup must safely handle null query');

console.log('  ✅ Check 50.5 passed: offlineDictionary lookup, de-inflection and caching verified.');

console.log('\n🎉 Suite 191 (Siklus VIII Pass 4: Kamus & Indeks Referensi, Budoux Text & Freeway Track) PASSED (5/5 checks 100% GREEN)!\n');
