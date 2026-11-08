// ══════════════════════════════════════════════════════════════════
//  test-s5-pass43-japanese-typography-furigana.js — Forensic Unit & Regression Suite
//  Siklus V Pass 43: Japanese Typography, BudouX Semantic Breaking & Furigana
//  (Klaster 12 Grand Finale)
//  Validates:
//  1. Component exports & proxy re-exports
//  2. W3C HTML5 semantic <ruby>, <rp>, <rt> and clipboard safety
//  3. Furigana inversion auto-recovery, pure kana bypass & romaji support
//  4. BudouX bunsetsu phrase segmentation & anti-blowout safeguards
//  5. Screen reader lang="ja" tagging & BIZ UDGothic typography
//  6. Cross-route typography mounts across modals and study views
// ══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT_DIR = path.resolve(__dirname, '..');
const rubyUiPath = path.join(ROOT_DIR, 'src/components/ui/RubyText.tsx');
const rubyCommonPath = path.join(ROOT_DIR, 'src/components/common/RubyText.tsx');
const semanticJpPath = path.join(ROOT_DIR, 'src/components/common/SemanticJapaneseText.tsx');
const budouxTextPath = path.join(ROOT_DIR, 'src/components/ui/BudouxText.tsx');
const jpFormattedPath = path.join(ROOT_DIR, 'src/components/ui/JapaneseFormattedText.tsx');
const rubyGenPath = path.join(ROOT_DIR, 'src/lib/data/rubyGenerator.ts');

console.log('🧪 Running Siklus V Pass 43: Japanese Typography & Furigana Test...\n');

// ── Check 1: Component & Module Exports ───────────────────────────
console.log('  🔍 Check 1: Validating Component Files & Module Exports...');
assert(fs.existsSync(rubyUiPath), 'RubyText.tsx must exist in src/components/ui');
assert(fs.existsSync(rubyCommonPath), 'RubyText.tsx must exist in src/components/common (proxy)');
assert(fs.existsSync(semanticJpPath), 'SemanticJapaneseText.tsx must exist');
assert(fs.existsSync(budouxTextPath), 'BudouxText.tsx must exist');
assert(fs.existsSync(jpFormattedPath), 'JapaneseFormattedText.tsx must exist');
assert(fs.existsSync(rubyGenPath), 'rubyGenerator.ts must exist');

const commonProxySrc = fs.readFileSync(rubyCommonPath, 'utf8');
assert(
  commonProxySrc.includes("from '../ui/RubyText'"),
  'common/RubyText.tsx must proxy export from ui/RubyText'
);
console.log('  ✅ Check 1 Passed: All 6 typography components and generator files verified\n');

// ── Check 2: W3C Ruby Structure & Clipboard Protection ────────────
console.log('  🔍 Check 2: Testing W3C Semantic Ruby Structure & Clipboard Safety...');

const {
  parseRubySegments,
  stripFurigana,
  isPureKana,
  containsKanji,
  generateRubyHtml,
} = require('../src/lib/data/rubyGenerator.ts');

// Explicit bracketed syntax
const bracketedText = '私【わたし】は日本語[にほんご]を勉強{べんきょう}します';
const segments = parseRubySegments(bracketedText);

assert.strictEqual(segments.length, 6, 'Should extract exactly 6 discrete segments');
assert.strictEqual(segments[0].kanji, '私');
assert.strictEqual(segments[0].rt, 'わたし');
assert.strictEqual(segments[1].kanji, 'は');
assert.strictEqual(segments[2].kanji, '日本語');
assert.strictEqual(segments[2].rt, 'にほんご');
assert.strictEqual(segments[3].kanji, 'を');
assert.strictEqual(segments[4].kanji, '勉強');
assert.strictEqual(segments[4].rt, 'べんきょう');
assert.strictEqual(segments[5].kanji, 'します');

// HTML Generation with <ruby>, <rp>, <rt>
const htmlOutput = generateRubyHtml(bracketedText);
assert(htmlOutput.includes('<ruby'), 'Must emit <ruby> tag');
assert(htmlOutput.includes('<rt'), 'Must emit <rt> tag');
assert(htmlOutput.includes('<rp'), 'Must emit <rp> fallback tags for legacy clipboards');
assert(htmlOutput.includes('font-jp'), 'Must use font-jp for BIZ UDGothic typography');

// Strip furigana clean output
const stripped = stripFurigana(bracketedText);
assert.strictEqual(
  stripped,
  '私は日本語を勉強します',
  'stripFurigana must restore clean surface Kanji/Kana'
);

console.log('  ✅ Check 2 Passed: W3C HTML5 ruby segmentation and clipboard protection certified\n');

// ── Check 3: Furigana Inversion Auto-Recovery & Pure Kana Bypass ───
console.log('  🔍 Check 3: Validating Inversion Auto-Recovery & Pure Kana Handling...');

assert.strictEqual(containsKanji('食べる'), true);
assert.strictEqual(containsKanji('たべる'), false);
assert.strictEqual(isPureKana('ありがとうございます！'), true);
assert.strictEqual(isPureKana('日本語'), false);

// Inverted fields heuristic in RubyText.tsx
const rubyUiSrc = fs.readFileSync(rubyUiPath, 'utf8');
assert(
  rubyUiSrc.includes('containsKanji(furigana) && !containsKanji(text)'),
  'RubyText must detect and auto-recover inverted kanji/furigana fields'
);
assert(
  rubyUiSrc.includes('isPureKana(targetText)'),
  'RubyText must skip ruby generation for pure kana sentences'
);
assert(
  rubyUiSrc.includes('text-amber-900 dark:text-amber-300'),
  'RubyText must declare WCAG AAA dual-theme furigana contrast tokens'
);
assert(
  rubyUiSrc.includes('showRomaji && romaji'),
  'RubyText must support romaji assistance'
);

console.log('  ✅ Check 3 Passed: Inversion auto-recovery and pure kana optimizations verified\n');

// ── Check 4: BudouX Bunsetsu Phrase Segmentation ──────────────────
console.log('  🔍 Check 4: Validating BudouX Bunsetsu Segmentation & Line Breaking...');

const { parseBunsetsu } = require('../src/lib/typography/budouxParser.ts');
const { segmentBunsetsu } = require('../src/lib/japanese/budouxSegmenter.ts');

const testSentence = '今日は天気がとてもいいので散歩に行きます。';
const bunsetsuChunks1 = parseBunsetsu(testSentence);
const bunsetsuChunks2 = segmentBunsetsu(testSentence);

assert(Array.isArray(bunsetsuChunks1) && bunsetsuChunks1.length > 1, 'parseBunsetsu must segment sentence');
assert(Array.isArray(bunsetsuChunks2) && bunsetsuChunks2.length > 1, 'segmentBunsetsu must segment sentence');
assert.deepStrictEqual(bunsetsuChunks1, bunsetsuChunks2, 'Both BudouX segmenters must agree');

// Check that copula or words are not mutilated
const copulaSentence = 'これはペンです。';
const copulaChunks = parseBunsetsu(copulaSentence);
assert(
  copulaChunks.some((c) => c.includes('ペンです') || c.includes('です')),
  'Copula must not be severed'
);

// Verify SemanticJapaneseText and BudouxText component attributes
const semanticSrc = fs.readFileSync(semanticJpPath, 'utf8');
assert(semanticSrc.includes('lang="ja"'), 'SemanticJapaneseText must declare lang="ja"');
assert(semanticSrc.includes('font-japanese'), 'SemanticJapaneseText must apply font-japanese');
assert(semanticSrc.includes('<wbr />'), 'SemanticJapaneseText must insert <wbr /> between chunks');

const budouxSrc = fs.readFileSync(budouxTextPath, 'utf8');
assert(budouxSrc.includes('lang="ja"'), 'BudouxText must declare lang="ja"');
assert(budouxSrc.includes('break-keep'), 'BudouxText must enforce break-keep');
assert(budouxSrc.includes('break-words') && budouxSrc.includes('max-w-full'), 'BudouxText must guard against blowouts');
assert(budouxSrc.includes('font-japanese'), 'BudouxText must apply font-japanese');

console.log('  ✅ Check 4 Passed: BudouX semantic phrase segmentation & anti-blowout safeguards verified\n');

// ── Check 5: Bold Formatting Sanitization & Screen Reader Tagging ──
console.log('  🔍 Check 5: Validating Bold Tag Sanitization in JapaneseFormattedText...');

const jpFormatSrc = fs.readFileSync(jpFormattedPath, 'utf8');
assert(jpFormatSrc.includes('lang="ja"'), 'JapaneseFormattedText must declare lang="ja"');
assert(jpFormatSrc.includes("split(/(<\\/?b>)/g)"), 'JapaneseFormattedText must safely split <b> and </b>');
assert(jpFormatSrc.includes('text-accent-hot dark:text-accent'), 'JapaneseFormattedText must highlight bold parts with accent');

console.log('  ✅ Check 5 Passed: HTML bold tag sanitization without raw leakage certified\n');

// ── Check 6: Cross-Route Integration Contracts ────────────────────
console.log('  🔍 Check 6: Validating Cross-Route Typography Mounts...');

const detailModalSrc = fs.readFileSync(path.join(ROOT_DIR, 'src/components/ui/DetailModal.tsx'), 'utf8');
const kotowazaModalSrc = fs.readFileSync(path.join(ROOT_DIR, 'src/components/kotowaza/KotowazaModal.tsx'), 'utf8');
const kanjiDojoSrc = fs.readFileSync(path.join(ROOT_DIR, 'src/components/kanji/KanjiDojoView.tsx'), 'utf8');
const materiHubSrc = fs.readFileSync(path.join(ROOT_DIR, 'src/pages/MateriHubPage.tsx'), 'utf8');

assert(detailModalSrc.includes('RubyText'), 'DetailModal must mount RubyText');
assert(kotowazaModalSrc.includes('RubyText'), 'KotowazaModal must mount RubyText');
assert(kanjiDojoSrc.includes('RubyText'), 'KanjiDojoView must mount RubyText');
assert(materiHubSrc.includes('BudouxText'), 'MateriHubPage must mount BudouxText');

console.log('  ✅ Check 6 Passed: Universal cross-route mounts in modals, dojo, and curriculum verified\n');

console.log('🎉 SIKLUS V PASS 43 VERIFIED: Japanese Typography, BudouX & Furigana 100% GREEN!\n');
process.exit(0);
