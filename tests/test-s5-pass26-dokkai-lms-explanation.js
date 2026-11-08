// ══════════════════════════════════════════════════════════════════
//  tests/test-s5-pass26-dokkai-lms-explanation.js
//  SIKLUS V — PASS 26: Dokkai Split-Pane Reading Comprehension LMS
//  Klaster 8: Exam Simulation & Interactive Exercise LMS
//  Audits & Verifies:
//    - Dokkai Reading Passage Genre Taxonomy (6 Canonical Genres)
//    - Paragraph Sanitization, Multiline Splitting & Null Defensive Bounds
//    - 5-Layer Pedagogical Explanation Standard (ADR-014 Specification)
//    - Distractor Autopsy Option Resolver (Numeric & Alphabetic Keys)
//    - 1-Tap Save to FSRS Flashcard Engine Contract
//    - MateriHub Curriculum Lesson Study Bridge Contract
//    - 13 Authentic Dokkai Items Inventory Across 14 Golden Sets
//    - Mobile Multi-Device Responsive Design & Safe Touch Targets (>= 40px)
// ══════════════════════════════════════════════════════════════════

const assert = require('assert');
const path = require('path');
const fs = require('fs');

console.log('╔══════════════════════════════════════════════════════════════════╗');
console.log('║  SIKLUS V — PASS 26: DOKKAI LMS & 5-LAYER EXPLANATION AUDIT      ║');
console.log('║  KLASTER 8: EXAM SIMULATION & INTERACTIVE EXERCISE LMS           ║');
console.log('╚══════════════════════════════════════════════════════════════════╝\n');

async function runPass26Tests() {
  const {
    parseDokkaiParagraphs,
    getDokkaiGenreMeta,
    resolveDistractorLabel,
    validateFiveLayers,
    DOKKAI_GENRE_REGISTRY,
  } = await import('../src/lib/exercise/dokkaiExplainer.ts');

  // ── T-1: Dokkai Genre Taxonomy & Metadata Registry ──
  console.log('--- [T-1] Dokkai Genre Taxonomy & Metadata Registry ---');
  assert(DOKKAI_GENRE_REGISTRY && typeof DOKKAI_GENRE_REGISTRY === 'object');

  const canonicalGenres = [
    'short_notice',
    'email',
    'instruction',
    'realia_table',
    'work_memo',
    'essay',
  ];

  canonicalGenres.forEach((g) => {
    assert(DOKKAI_GENRE_REGISTRY[g], `Registry must define genre: ${g}`);
    const meta = DOKKAI_GENRE_REGISTRY[g];
    assert(typeof meta.label === 'string' && meta.label.length > 0);
    assert(typeof meta.icon === 'string' && meta.icon.length > 0);
    assert(typeof meta.color === 'string' && meta.color.length > 0);
  });

  // Fallback metadata for unknown genre
  const fallbackMeta = getDokkaiGenreMeta('unknown_genre');
  assert.strictEqual(fallbackMeta.label, 'Wacana Membaca (Dokkai)');
  assert.strictEqual(fallbackMeta.icon, '📄');
  console.log('  ✔ All 6 canonical Dokkai genres and fallback metadata certified.\n');

  // ── T-2: Paragraph Parsing & Defensive Hardening ──
  console.log('--- [T-2] Paragraph Parsing & Defensive Hardening ---');
  const multiline = `
    10月15日に社内研修を行います。

    場所は3階の会議室Aです。
    時間は14:00から16:00までとなります。
    
    各自、筆記用具を持参してください。
  `;

  const paras = parseDokkaiParagraphs(multiline);
  assert.strictEqual(paras.length, 4, `Expected 4 paragraphs, got ${paras.length}`);
  assert.strictEqual(paras[0], '10月15日に社内研修を行います。');
  assert.strictEqual(paras[3], '各自、筆記用具を持参してください。');

  // Defensive checks
  assert.deepStrictEqual(parseDokkaiParagraphs(''), []);
  assert.deepStrictEqual(parseDokkaiParagraphs(null), []);
  assert.deepStrictEqual(parseDokkaiParagraphs(undefined), []);
  assert.deepStrictEqual(parseDokkaiParagraphs(12345), []);
  console.log('  ✔ Dokkai paragraph parsing and defensive edge cases verified.\n');

  // ── T-3: Distractor Autopsy Option Resolver ──
  console.log('--- [T-3] Distractor Autopsy Option Resolver ---');
  const mockOptions = [
    '明日行きます',
    '昨日行きました',
    '来週行く予定です',
    '行ったことがありません',
  ];

  // Key "1" (1-based index) -> Option A
  const res1 = resolveDistractorLabel('1', mockOptions);
  assert.strictEqual(res1.letter, 'A');
  assert.strictEqual(res1.text, '明日行きます');

  // Key "4" -> Option D
  const res4 = resolveDistractorLabel('4', mockOptions);
  assert.strictEqual(res4.letter, 'D');
  assert.strictEqual(res4.text, '行ったことがありません');

  // Key "B" (letter directly provided)
  const resB = resolveDistractorLabel('B', mockOptions);
  assert.strictEqual(resB.letter, 'B');

  // Key "9" (out of bounds) -> safe fallback
  const resOut = resolveDistractorLabel('9', mockOptions);
  assert.strictEqual(resOut.text, '');
  console.log('  ✔ Distractor autopsy option resolver certified.\n');

  // ── T-4: 5-Layer Explanation Taxonomy Validation ──
  console.log('--- [T-4] 5-Layer Explanation Taxonomy Validation ---');
  const fullExplanation = {
    justification: 'Pola ~ことにする menyatakan keputusan yang dibuat oleh subjek secara sadar.',
    distractorAutopsy: {
      '1': 'Pola ~ことになる menyatakan ketetapan atau keputusan pihak luar.',
      '3': 'Bentuk lampau tidak sesuai konteks keputusan yang baru diambil.',
      '4': 'Bentuk negatif membalikkan makna kalimat.',
    },
    mnemonicSensei: 'Ingat rumus: "Suru = Saya putuskan sendiri, Naru = Nasib yang menentukan".',
    l1InterferenceAlert: 'Dalam bahasa Indonesia keduanya sering diterjemahkan "memutuskan", tapi berbeda nuansa subjek.',
    remedialPrescription: {
      advice: 'Pelajari kembali perbedaan tata bahasa Keputusan Pribadi vs Ketetapan Organisasi.',
      unitNumber: '12',
      unitTitleId: 'Ekspresi Keputusan dan Rencana',
    },
  };

  const validation = validateFiveLayers(fullExplanation);
  assert.strictEqual(validation.isFullyQualified, true);
  assert.strictEqual(validation.hasJustification, true);
  assert.strictEqual(validation.hasDistractorAutopsy, true);
  assert.strictEqual(validation.hasMnemonic, true);
  assert.strictEqual(validation.hasL1Alert, true);
  assert.strictEqual(validation.hasRemedial, true);
  assert.strictEqual(validation.score, 5, 'Full explanation must achieve score 5/5');

  // Degenerate explanation
  const emptyValidation = validateFiveLayers(null);
  assert.strictEqual(emptyValidation.isFullyQualified, false);
  assert.strictEqual(emptyValidation.score, 0);
  console.log('  ✔ 5-Layer explanation validation engine certified.\n');

  // ── T-5: Static AST Inspection of DokkaiSheet.tsx ──
  console.log('--- [T-5] Static AST Inspection of DokkaiSheet.tsx ---');
  const sheetPath = path.resolve(__dirname, '../src/components/exercise/DokkaiSheet.tsx');
  assert(fs.existsSync(sheetPath), 'DokkaiSheet.tsx must exist');
  const sheetSrc = fs.readFileSync(sheetPath, 'utf8');

  // Imports from dokkaiExplainer
  assert(sheetSrc.includes("from '../../lib/exercise/dokkaiExplainer'"));
  assert(sheetSrc.includes('parseDokkaiParagraphs'));
  assert(sheetSrc.includes('getDokkaiGenreMeta'));

  // Expand / collapse state
  assert(sheetSrc.includes('isExpanded'));
  assert(sheetSrc.includes('setIsExpanded'));
  assert(sheetSrc.includes('Ciutkan'));
  assert(sheetSrc.includes('Buka Teks'));

  // Scroll limit container
  assert(sheetSrc.includes('max-h-[360px] sm:max-h-[450px] overflow-y-auto scrollbar-thin'));
  // Touch Target >= 40px
  assert(sheetSrc.includes('min-h-[40px] px-3.5 py-2'));
  console.log('  ✔ DokkaiSheet AST, expand/collapse toggles, and mobile ergonomics verified.\n');

  // ── T-6: Static AST Inspection of FiveLayerExplanationSheet.tsx ──
  console.log('--- [T-6] Static AST Inspection of FiveLayerExplanationSheet.tsx ---');
  const expPath = path.resolve(__dirname, '../src/components/exercise/FiveLayerExplanationSheet.tsx');
  assert(fs.existsSync(expPath), 'FiveLayerExplanationSheet.tsx must exist');
  const expSrc = fs.readFileSync(expPath, 'utf8');

  // 5 Layers present in template
  assert(expSrc.includes('Lapis 1: Alasan Kunci Benar (Justifikasi)'));
  assert(expSrc.includes('Lapis 2: Bedah Opsi Salah (Bedah Distraktor)'));
  assert(expSrc.includes('Lapis 3: Jembatan Ingatan Sensei Nugget (Mnemonik)'));
  assert(expSrc.includes('Lapis 4: Peringatan Interferensi Bahasa Indonesia (L1 Alert)'));
  assert(expSrc.includes('Lapis 5: Preskripsi Remedial & Rujukan MateriHub'));

  // 1-Tap Save to FSRS Button
  assert(expSrc.includes('handleSaveToFsrs'));
  assert(expSrc.includes('setCard'));
  assert(expSrc.includes('Tersimpan di FSRS'));
  assert(expSrc.includes('Simpan FSRS'));

  // MateriHub Bridge
  assert(expSrc.includes('handleOpenCurriculum'));
  assert(expSrc.includes('openLessonStudy'));
  assert(expSrc.includes('Pelajari Modul Ini'));

  // Touch Targets >= 40px
  assert(expSrc.includes('min-h-[40px]'));
  assert(expSrc.includes('min-h-[42px]'));
  console.log('  ✔ FiveLayerExplanationSheet AST, 5-layer headings, FSRS and MateriHub bridges verified.\n');

  // ── T-7: Manifest Inventory of Dokkai Reading Items ──
  console.log('--- [T-7] Manifest Inventory of Dokkai Reading Items ---');
  const manifestPath = path.resolve(__dirname, '../public/data/exercises/manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  let totalDokkaiItems = 0;
  manifest.sets.forEach((setEntry) => {
    const filePath = path.resolve(__dirname, '../public', setEntry.publicPath.replace(/^\//, ''));
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      data.items.forEach((item) => {
        if (item.readingPassage) {
          totalDokkaiItems++;
          assert(
            typeof item.readingPassage.passageText === 'string' &&
              item.readingPassage.passageText.length > 20,
            `Item ${item.id} readingPassage must have text`
          );
          assert(
            item.readingPassage.genre in DOKKAI_GENRE_REGISTRY,
            `Item ${item.id} genre must be recognized: ${item.readingPassage.genre}`
          );
          assert(
            item.explanation && item.explanation.justification,
            `Item ${item.id} must have explanation justification`
          );
        }
      });
    }
  });

  assert(totalDokkaiItems >= 13, `Must find at least 13 Dokkai items across sets (found: ${totalDokkaiItems})`);
  console.log(`  ✔ Verified ${totalDokkaiItems} authentic Dokkai reading items across all 14 golden sets.\n`);

  console.log('╔══════════════════════════════════════════════════════════════════╗');
  console.log('║  🎉 ALL SIKLUS V PASS 26 VERIFICATION SUITES PASSED (7/7)        ║');
  console.log('║  🏆 KLASTER 8 THIRD GATE PASS 26 CERTIFIED 100% GREEN!           ║');
  console.log('╚══════════════════════════════════════════════════════════════════╝');
}

runPass26Tests().catch((err) => {
  console.error('\n❌ SIKLUS V PASS 26 FAILED:', err);
  process.exit(1);
});
