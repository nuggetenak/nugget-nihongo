// ══════════════════════════════════════════════════════════════════
//  tests/test-s7-sprint38-dokkai-realia-typography.js
//  SIKLUS VII — SPRINT 38: Dokkai Reading Ergonomics, Realia Lightbox
//                          & Japanese Typography Hardening
//  Audits:
//    - Full-width （） and half-width () Japanese parentheses furigana parsing
//    - RubyText semantic W3C ruby markup, baseline alignment, and contrast
//    - DokkaiSheet font scaler (A+/A-), realia image lightbox & error fallback
//    - Dokkai genre registry expansion & paragraph CRLF normalization
//    - Keyboard accessibility (aria-expanded, button role)
// ══════════════════════════════════════════════════════════════════

const assert = require('assert');
const path = require('path');
const fs = require('fs');

console.log('╔══════════════════════════════════════════════════════════════════╗');
console.log('║  SIKLUS VII — SPRINT 38: DOKKAI REALIA & TYPOGRAPHY FORENSICS    ║');
console.log('║  KLASTER 8: EXAM SIMULATION, REALIA STIMULI & ACCESSIBLE RUBY    ║');
console.log('╚══════════════════════════════════════════════════════════════════╝\n');

async function runSprint38Tests() {
  const ROOT_DIR = path.resolve(__dirname, '..');

  // ── [T-1] Japanese Parentheses Furigana Parsing in rubyGenerator.ts ──
  console.log('--- [T-1] Japanese Parentheses Furigana Parsing in rubyGenerator.ts ---');
  const {
    parseRubySegments,
    stripFurigana,
    extractFuriganaOnly,
    containsKanji,
    isPureKana,
    generateRubyHtml,
  } = await import('../src/lib/data/rubyGenerator.ts');

  // Half-width and full-width Japanese parentheses
  const testPhrase = '契約（けいやく）と書類(しょるい)を提出【ていしゅつ】する';
  const segments = parseRubySegments(testPhrase);

  assert(Array.isArray(segments), 'parseRubySegments must return an array');
  assert.strictEqual(segments[0].kanji, '契約');
  assert.strictEqual(segments[0].rt, 'けいやく');
  assert.strictEqual(segments[1].kanji, 'と');
  assert.strictEqual(segments[2].kanji, '書類');
  assert.strictEqual(segments[2].rt, 'しょるい');
  assert.strictEqual(segments[3].kanji, 'を');
  assert.strictEqual(segments[4].kanji, '提出');
  assert.strictEqual(segments[4].rt, 'ていしゅつ');
  assert.strictEqual(segments[5].kanji, 'する');

  // Strip furigana preserves clean kanji/kana
  const stripped = stripFurigana(testPhrase);
  assert.strictEqual(stripped, '契約と書類を提出する', 'stripFurigana must cleanly strip both （） and ()');

  // Extract furigana only
  const readings = extractFuriganaOnly(testPhrase);
  assert.strictEqual(readings, 'けいやくとしょるいをとていしゅつする'.replace('をと', 'を'), 'extractFuriganaOnly must extract readings');

  // Historical contract: Lenticular brackets and square brackets
  const histSeg = parseRubySegments('私【わたし】は学生[がくせい]です');
  assert.strictEqual(histSeg[0].kanji, '私');
  assert.strictEqual(histSeg[0].rt, 'わたし');
  assert.strictEqual(histSeg[2].kanji, '学生');
  assert.strictEqual(histSeg[2].rt, 'がくせい');

  // Defensive checks
  assert.deepStrictEqual(parseRubySegments(''), []);
  assert.deepStrictEqual(parseRubySegments(null), []);
  assert.deepStrictEqual(parseRubySegments(undefined), []);

  console.log('  ✔ Full-width and half-width Japanese parentheses furigana parser certified.\n');

  // ── [T-2] Dokkai Genre Registry & Paragraph Normalization ──
  console.log('--- [T-2] Dokkai Genre Registry & Paragraph Normalization ---');
  const {
    parseDokkaiParagraphs,
    getDokkaiGenreMeta,
    DOKKAI_GENRE_REGISTRY,
    validateFiveLayers,
    resolveDistractorLabel,
  } = await import('../src/lib/exercise/dokkaiExplainer.ts');

  // All 6 canonical genres must be preserved
  const canonical = ['short_notice', 'email', 'instruction', 'realia_table', 'work_memo', 'essay'];
  canonical.forEach((g) => {
    assert(DOKKAI_GENRE_REGISTRY[g], `Canonical genre ${g} must exist in registry`);
  });

  // Extended realia genres
  const extended = ['advertisement', 'pamphlet', 'business_letter', 'info_retrieval'];
  extended.forEach((g) => {
    assert(DOKKAI_GENRE_REGISTRY[g], `Extended genre ${g} must exist in registry`);
    const meta = DOKKAI_GENRE_REGISTRY[g];
    assert(meta.label && meta.icon && meta.color);
  });

  // CRLF and multi-space normalization in paragraphs
  const rawWindowsText = "第一段落です。\r\n\r\n第二段落です。\r\n第三段落です。\r\n";
  const paras = parseDokkaiParagraphs(rawWindowsText);
  assert.strictEqual(paras.length, 3, `Expected 3 paragraphs, got ${paras.length}`);
  assert.strictEqual(paras[0], '第一段落です。');
  assert.strictEqual(paras[1], '第二段落です。');
  assert.strictEqual(paras[2], '第三段落です。');

  // Fallback for unknown genre
  const fallback = getDokkaiGenreMeta('unknown_custom_genre');
  assert.strictEqual(fallback.label, 'Wacana Membaca (Dokkai)');

  console.log('  ✔ Dokkai genre registry and paragraph CRLF normalization certified.\n');

  // ── [T-3] Static AST & Accessibility of RubyText.tsx ──
  console.log('--- [T-3] Static AST & Accessibility of RubyText.tsx ---');
  const rubyPath = path.join(ROOT_DIR, 'src/components/ui/RubyText.tsx');
  assert(fs.existsSync(rubyPath), 'RubyText.tsx must exist');
  const rubySrc = fs.readFileSync(rubyPath, 'utf8');

  // Semantic ruby tags and W3C standard
  assert(rubySrc.includes('<ruby'), 'RubyText must emit <ruby>');
  assert(rubySrc.includes('<rt'), 'RubyText must emit <rt>');
  assert(rubySrc.includes('<rp'), 'RubyText must emit <rp>');
  assert(rubySrc.includes('align-baseline'), 'RubyText must preserve align-baseline');
  assert(rubySrc.includes('lang="ja"'), 'RubyText must declare lang="ja"');
  assert(rubySrc.includes('text-amber-900 dark:text-amber-300'), 'RubyText must use dual-theme contrast tokens');

  // Safe non-string casting
  assert(rubySrc.includes('text == null') || rubySrc.includes('String(text)'), 'RubyText must handle non-string values safely');

  console.log('  ✔ RubyText semantic W3C tags, contrast, and baseline alignment verified.\n');

  // ── [T-4] Static AST & Mobile Ergonomics of DokkaiSheet.tsx ──
  console.log('--- [T-4] Static AST & Mobile Ergonomics of DokkaiSheet.tsx ---');
  const sheetPath = path.join(ROOT_DIR, 'src/components/exercise/DokkaiSheet.tsx');
  assert(fs.existsSync(sheetPath), 'DokkaiSheet.tsx must exist');
  const sheetSrc = fs.readFileSync(sheetPath, 'utf8');

  // Font size scaler controls
  assert(sheetSrc.includes('fontSize'), 'DokkaiSheet must support fontSize state');
  assert(sheetSrc.includes('A+') && sheetSrc.includes('A-'), 'DokkaiSheet must provide A+/A- font scaler button');

  // Realia document image lightbox
  assert(sheetSrc.includes('isImageModalOpen'), 'DokkaiSheet must manage isImageModalOpen');
  assert(sheetSrc.includes('imageError'), 'DokkaiSheet must handle imageError fallback');
  assert(sheetSrc.includes('Maximize2') || sheetSrc.includes('ZoomIn'), 'DokkaiSheet must feature zoom icon');

  // Accessibility: Button role & aria-expanded for collapsed banner
  assert(sheetSrc.includes('<button') && sheetSrc.includes('aria-expanded'), 'Collapsed banner must be an accessible button');

  // Historical invariants
  assert(sheetSrc.includes('IrasutoyaImage') && sheetSrc.includes('senpai_studying') && sheetSrc.includes('animateFloat'), 'DokkaiSheet must retain Senpai mascot anchor');
  assert(sheetSrc.includes('max-h-[360px] sm:max-h-[450px] overflow-y-auto scrollbar-thin'), 'DokkaiSheet must retain scroll container constraints');
  assert(sheetSrc.includes('min-h-[40px] px-3.5 py-2'), 'DokkaiSheet expand button must meet touch target');
  assert(sheetSrc.includes('card-interactive-lift'), 'DokkaiSheet must use card-interactive-lift');
  assert(sheetSrc.includes('RubyText'), 'DokkaiSheet must render RubyText');

  console.log('  ✔ DokkaiSheet ergonomics, font scaler, realia lightbox & a11y verified.\n');

  // ── [T-5] Golden Dataset Dokkai Reading Manifest Verification ──
  console.log('--- [T-5] Golden Dataset Dokkai Reading Manifest Verification ---');
  const manifestPath = path.join(ROOT_DIR, 'public/data/exercises/manifest.json');
  assert(fs.existsSync(manifestPath), 'manifest.json must exist');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  let verifiedDokkaiCount = 0;
  manifest.sets.forEach((setEntry) => {
    const setPath = path.join(ROOT_DIR, 'public', setEntry.publicPath.replace(/^\//, ''));
    if (fs.existsSync(setPath)) {
      const data = JSON.parse(fs.readFileSync(setPath, 'utf8'));
      data.items.forEach((item) => {
        if (item.readingPassage) {
          verifiedDokkaiCount++;
          assert(item.readingPassage.passageText.length > 10, `Item ${item.id} readingPassage must have text`);
          assert(item.readingPassage.genre in DOKKAI_GENRE_REGISTRY, `Item ${item.id} genre must be in registry`);
        }
      });
    }
  });

  assert(verifiedDokkaiCount >= 13, `Must find at least 13 Dokkai items (found: ${verifiedDokkaiCount})`);
  console.log(`  ✔ Verified ${verifiedDokkaiCount} authentic Dokkai reading items across exercise sets.\n`);

  console.log('╔══════════════════════════════════════════════════════════════════╗');
  console.log('║  🎉 ALL SIKLUS VII SPRINT 38 VERIFICATION SUITES PASSED (5/5)    ║');
  console.log('║  🏆 DOKKAI REALIA & TYPOGRAPHY PROTOCOL CERTIFIED 100% GREEN!    ║');
  console.log('╚══════════════════════════════════════════════════════════════════╝');
}

runSprint38Tests().catch((err) => {
  console.error('\n❌ SIKLUS VII SPRINT 38 FAILED:', err);
  process.exit(1);
});
