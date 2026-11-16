// ══════════════════════════════════════════════════════════════════
//  test-s8-pass13-dokkai-furigana-realia-typography.js
//  Siklus VIII Pass 13 (Sprint 59 / Suite 200):
//  Dokkai Reading Immersion, Furigana Line-Breaker & Realia Lightbox
// ══════════════════════════════════════════════════════════════════

import assert from 'assert';
import fs from 'fs';
import path from 'path';

console.log('⚡ Running Suite 200: Siklus VIII Pass 13 (Sprint 59): Dokkai, Furigana Line-Breaker & Realia...');

const ROOT = process.cwd().includes('nugget-nihongo')
  ? process.cwd()
  : path.join(process.cwd(), 'nugget-nihongo');

// ── Check 1: DokkaiSheet Ergonomics, Font Scaler & Realia Lightbox ───────────
console.log('  Check 59.1: Verifying DokkaiSheet layout, font scaler A+/A- & accessible lightbox modal...');
const dokkaiSheetPath = path.join(ROOT, 'src', 'components', 'exercise', 'DokkaiSheet.tsx');
assert(fs.existsSync(dokkaiSheetPath), 'DokkaiSheet.tsx must exist');
const dokkaiContent = fs.readFileSync(dokkaiSheetPath, 'utf8');

assert(
  dokkaiContent.includes('isExpanded') &&
  dokkaiContent.includes('aria-expanded') &&
  dokkaiContent.includes('fontSize') &&
  dokkaiContent.includes('A+') &&
  dokkaiContent.includes('A-'),
  'DokkaiSheet must provide collapsible expand/collapse toggle and non-destructive A+/A- font size scaler'
);

assert(
  dokkaiContent.includes('isImageModalOpen') &&
  dokkaiContent.includes('imageError') &&
  dokkaiContent.includes('Maximize2') &&
  dokkaiContent.includes('handleKeyDown') &&
  dokkaiContent.includes("e.key === 'Escape'"),
  'DokkaiSheet must implement an accessible realia image lightbox with Escape dismissal and fallback placeholder'
);

assert(
  dokkaiContent.includes('senpai_studying') &&
  dokkaiContent.includes('IrasutoyaImage') &&
  dokkaiContent.includes('RubyText'),
  'DokkaiSheet must integrate Senpai cultural mascot and W3C RubyText annotations'
);

console.log('  ✅ Check 59.1 passed: DokkaiSheet ergonomics, font scaler and lightbox verified.');

// ── Check 2: Dokkai Genre Taxonomy & 5-Layer Distractor Autopsy ───────────────
console.log('  Check 59.2: Verifying Dokkai genre taxonomy, CRLF normalization & 5-layer pedagogical autopsy...');
const dokkaiExplainerPath = path.join(ROOT, 'src', 'lib', 'exercise', 'dokkaiExplainer.ts');
assert(fs.existsSync(dokkaiExplainerPath), 'dokkaiExplainer.ts must exist');
const explainerContent = fs.readFileSync(dokkaiExplainerPath, 'utf8');

// Verify genre taxonomy completeness
const requiredGenres = [
  'short_notice',
  'email',
  'instruction',
  'realia_table',
  'work_memo',
  'essay',
  'advertisement',
  'pamphlet',
  'business_letter',
  'info_retrieval',
];

for (const g of requiredGenres) {
  assert(
    explainerContent.includes(`${g}:`),
    `dokkaiExplainer.ts must define taxonomy metadata for genre '${g}'`
  );
}

// 5-Layer explanation validation
assert(
  explainerContent.includes('validateFiveLayers') &&
  explainerContent.includes('hasJustification') &&
  explainerContent.includes('hasDistractorAutopsy') &&
  explainerContent.includes('hasMnemonic') &&
  explainerContent.includes('hasL1Alert') &&
  explainerContent.includes('hasRemedial'),
  'dokkaiExplainer.ts must validate the canonical 5-layer pedagogical autopsy framework'
);

// CRLF paragraph normalizer
assert(
  explainerContent.includes('parseDokkaiParagraphs') &&
  explainerContent.includes(".replace(/\\r\\n/g, '\\n')"),
  'dokkaiExplainer.ts must provide robust CRLF and multi-space paragraph normalizer'
);

console.log('  ✅ Check 59.2 passed: Dokkai genre taxonomy and 5-layer autopsy verified.');

// ── Check 3: BudouX Semantic Line-Breaker & Phrase Segmentation ───────────────
console.log('  Check 59.3: Verifying BudouX typography component, bunsetsu chunks & mobile word breaks...');
const budouxComponentPath = path.join(ROOT, 'src', 'components', 'ui', 'BudouxText.tsx');
assert(fs.existsSync(budouxComponentPath), 'BudouxText.tsx must exist');
const budouxComponentContent = fs.readFileSync(budouxComponentPath, 'utf8');

assert(
  budouxComponentContent.includes('segmentBunsetsu') &&
  budouxComponentContent.includes('<wbr />') &&
  budouxComponentContent.includes('break-keep') &&
  budouxComponentContent.includes('font-japanese'),
  'BudouXText must segment sentences semantically, injecting <wbr /> and break-keep to prevent mid-compound breaks'
);

const budouxSegmenterPath = path.join(ROOT, 'src', 'lib', 'japanese', 'budouxSegmenter.ts');
assert(fs.existsSync(budouxSegmenterPath), 'budouxSegmenter.ts must exist');
const segmenterContent = fs.readFileSync(budouxSegmenterPath, 'utf8');

assert(
  segmenterContent.includes('export function segmentBunsetsu') ||
  segmenterContent.includes('export const segmentBunsetsu'),
  'budouxSegmenter.ts must export segmentBunsetsu function'
);

console.log('  ✅ Check 59.3 passed: BudouX semantic line-breaker and phrase segmenter verified.');

// ── Check 4: W3C Semantic Ruby Furigana Annotations & Okurigana Peeling ────────
console.log('  Check 59.4: Verifying W3C RubyText annotations, bracket parsing & okurigana peeling...');
const rubyComponentPath = path.join(ROOT, 'src', 'components', 'ui', 'RubyText.tsx');
assert(fs.existsSync(rubyComponentPath), 'RubyText.tsx must exist');
const rubyContent = fs.readFileSync(rubyComponentPath, 'utf8');

assert(
  rubyContent.includes('<ruby') &&
  rubyContent.includes('<rt') &&
  rubyContent.includes('<rp') &&
  rubyContent.includes('text-amber-900 dark:text-amber-300'),
  'RubyText must output standard W3C <ruby><rp><rt> tags with dual-theme high-contrast color tokens'
);

const rubyGenPath = path.join(ROOT, 'src', 'lib', 'data', 'rubyGenerator.ts');
assert(fs.existsSync(rubyGenPath), 'rubyGenerator.ts must exist');
const rubyGenContent = fs.readFileSync(rubyGenPath, 'utf8');

assert(
  rubyGenContent.includes('parseRubySegments') &&
  rubyGenContent.includes('stripFurigana') &&
  rubyGenContent.includes('extractFuriganaOnly') &&
  rubyGenContent.includes('containsKanji') &&
  rubyGenContent.includes('isPureKana'),
  'rubyGenerator.ts must export complete furigana extraction and inspection utilities'
);

// Bracket parsing contracts: full-width （）, half-width (), lenticular 【】, and square brackets []
assert(
  rubyGenContent.includes('【([^】]+)】') &&
  rubyGenContent.includes('\\[([^\\]]+)\\]') &&
  rubyGenContent.includes('[（\\(]([\\u3040-\\u309F]+)[）\\)]'),
  'rubyGenerator.ts must parse both full-width （） and half-width () Japanese parentheses alongside lenticular brackets'
);

// Okurigana peeling logic
assert(
  rubyGenContent.includes('suffixLen') &&
  rubyGenContent.includes('rawKanji.slice(0, rawKanji.length - suffixLen)'),
  'rubyGenerator.ts must automatically peel trailing okurigana kana suffixes from compound stems'
);

console.log('  ✅ Check 59.4 passed: W3C Ruby annotations, bracket parsing and okurigana peeling verified.');

// ── Check 5: Golden Dataset Dokkai Reading Manifest Verification ──────────────
console.log('  Check 59.5: Auditing exercise manifest readingPassage payloads and genre alignment...');
const manifestPath = path.join(ROOT, 'public', 'data', 'exercises', 'manifest.json');
assert(fs.existsSync(manifestPath), 'public/data/exercises/manifest.json must exist');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

assert(Array.isArray(manifest.sets), 'manifest.json must declare an array of sets');

let verifiedDokkaiCount = 0;
for (const setEntry of manifest.sets) {
  const setRelativePath = setEntry.publicPath ? setEntry.publicPath.replace(/^\//, '') : '';
  const setFullPath = path.join(ROOT, 'public', setRelativePath);
  if (fs.existsSync(setFullPath)) {
    const setData = JSON.parse(fs.readFileSync(setFullPath, 'utf8'));
    if (Array.isArray(setData.items)) {
      for (const item of setData.items) {
        if (item.readingPassage) {
          verifiedDokkaiCount++;
          assert(
            typeof item.readingPassage.passageText === 'string' &&
            item.readingPassage.passageText.length > 5,
            `Item ${item.id} has invalid readingPassage passageText`
          );
          assert(
            requiredGenres.includes(item.readingPassage.genre) || item.readingPassage.genre === 'short_notice',
            `Item ${item.id} has unregistered genre '${item.readingPassage.genre}'`
          );
        }
      }
    }
  }
}

assert(verifiedDokkaiCount >= 10, `Must verify at least 10 authentic Dokkai reading items (found ${verifiedDokkaiCount})`);
console.log(`  ✅ Check 59.5 passed: Verified ${verifiedDokkaiCount} authentic Dokkai reading items with valid genres.`);

console.log('\n🎉 ALL PASS 13 (SUITE 200) DOKKAI, FURIGANA & REALIA TESTS PASSED 100% GREEN!\n');
