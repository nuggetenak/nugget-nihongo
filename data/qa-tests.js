// QA-TESTS.JS — Referential Integrity & Data Quality Tests
// Dikelola oleh: Agent 6 — Crunchy 🦷
// Jalankan di console browser atau Node.js setelah semua data scripts di-load
//
// CARA PAKAI:
//   Di browser: buka DevTools → Console → paste seluruh isi file ini
//   Di Node.js: belum support (butuh window globals)
//
// OUTPUT: ringkasan pass/fail per kategori

window.runQATests = function() {
  const results = { pass: 0, fail: 0, warnings: [], errors: [] };

  function pass(msg) { results.pass++; console.log('✅', msg); }
  function fail(msg) { results.fail++; results.errors.push(msg); console.error('❌', msg); }
  function warn(msg) { results.warnings.push(msg); console.warn('⚠️', msg); }

  // ─────────────────────────────────────────────
  // TEST 1: REFERENTIAL INTEGRITY — grammarId
  // Semua grammarId di bank soal harus punya padanan di grammar files
  // ─────────────────────────────────────────────
  console.group('TEST 1: grammarId Referential Integrity');

  const allGrammarIds = new Set();
  const grammarSources = [
    window.N4_W1, window.N4_W2, window.N4_W3, window.N4_W4,
    window.N4_W5, window.N4_W6,
    window.N3_W1, window.N3_W2, window.N3_W3,
    window.N3_W4, window.N3_W5, window.N3_W6
  ];

  grammarSources.forEach(src => {
    if (!src) return;
    src.forEach(entry => { if (entry.id) allGrammarIds.add(entry.id); });
  });

  const bankSoalSources = [
    window.bankSoal, window.bankSoalN4, window.bankSoalQuiz4
  ];

  let brokenRefs = 0;
  bankSoalSources.forEach(bank => {
    if (!bank) return;
    bank.forEach(soal => {
      const refs = [];
      if (soal.grammarId) refs.push(soal.grammarId);
      if (soal.grammarIds) refs.push(...soal.grammarIds);
      refs.forEach(ref => {
        if (!allGrammarIds.has(ref)) {
          warn(`Broken grammarId: "${ref}" di soal id="${soal.id}"`);
          brokenRefs++;
        }
      });
    });
  });

  if (brokenRefs === 0) pass(`Semua grammarId valid (${allGrammarIds.size} grammar cards, 0 broken refs)`);
  else fail(`${brokenRefs} broken grammarId references ditemukan`);

  console.groupEnd();

  // ─────────────────────────────────────────────
  // TEST 2: DUPLICATE ID CHECK
  // Tidak boleh ada ID duplikat di grammar files maupun bank soal
  // ─────────────────────────────────────────────
  console.group('TEST 2: Duplicate ID Check');

  const seenGrammar = {};
  let grammarDupes = 0;
  grammarSources.forEach(src => {
    if (!src) return;
    src.forEach(entry => {
      if (!entry.id) return;
      if (seenGrammar[entry.id]) {
        warn(`Duplikat grammar ID: "${entry.id}"`);
        grammarDupes++;
      }
      seenGrammar[entry.id] = true;
    });
  });
  if (grammarDupes === 0) pass('Tidak ada duplikat grammar ID');
  else fail(`${grammarDupes} duplikat grammar ID ditemukan`);

  const seenSoal = {};
  let soalDupes = 0;
  bankSoalSources.forEach(bank => {
    if (!bank) return;
    bank.forEach(soal => {
      if (!soal.id) return;
      if (seenSoal[soal.id]) {
        warn(`Duplikat bank soal ID: "${soal.id}"`);
        soalDupes++;
      }
      seenSoal[soal.id] = true;
    });
  });
  if (soalDupes === 0) pass('Tidak ada duplikat bank soal ID');
  else fail(`${soalDupes} duplikat bank soal ID ditemukan`);

  console.groupEnd();

  // ─────────────────────────────────────────────
  // TEST 3: VOCAB ID REFERENTIAL INTEGRITY
  // vocab_ids di book index harus ada di vocabDB
  // ─────────────────────────────────────────────
  console.group('TEST 3: Book Index vocab_id Integrity');

  if (window.vocabDB && window.bookMinna1) {
    const vocabIdSet = new Set(window.vocabDB.map(v => v.id));
    const bookSources = [
      window.bookMinna1, window.bookMinna2,
      window.bookIrodoriA1, window.bookIrodoriA21, window.bookIrodoriA22
    ];
    let brokenVocabRefs = 0;
    bookSources.forEach(book => {
      if (!book) return;
      book.forEach(chapter => {
        (chapter.vocab_ids || []).forEach(vid => {
          if (!vocabIdSet.has(vid)) {
            warn(`Broken vocab_id: "${vid}" di chapter "${chapter.chapter || chapter.unit}"`);
            brokenVocabRefs++;
          }
        });
      });
    });
    if (brokenVocabRefs === 0) pass('Semua vocab_id di book index valid');
    else fail(`${brokenVocabRefs} broken vocab_id di book index`);
  } else {
    warn('TEST 3 SKIPPED: vocabDB atau book data belum di-load');
  }

  console.groupEnd();

  // ─────────────────────────────────────────────
  // TEST 4: POS VALUES VALIDITY (Vocab)
  // ─────────────────────────────────────────────
  console.group('TEST 4: POS Values Validity');

  const VALID_POS = new Set([
    'noun', 'verb', 'verb-u', 'verb-ru', 'verb-suru', 'verb-kuru',
    'i-adj', 'na-adj', 'adverb', 'expr', 'particle', 'conj',
    'prefix', 'suffix', 'counter'
  ]);

  if (window.vocabDB) {
    let invalidPos = 0;
    window.vocabDB.forEach(entry => {
      if (entry.pos && !VALID_POS.has(entry.pos)) {
        warn(`Invalid POS: "${entry.pos}" di vocab id="${entry.id}" (${entry.word})`);
        invalidPos++;
      }
    });
    if (invalidPos === 0) pass(`Semua POS valid (${window.vocabDB.length} entries diperiksa)`);
    else fail(`${invalidPos} entry dengan POS tidak valid`);
  } else {
    warn('TEST 4 SKIPPED: vocabDB belum di-load');
  }

  console.groupEnd();

  // ─────────────────────────────────────────────
  // SUMMARY
  // ─────────────────────────────────────────────
  console.group('═══ QA TESTS SUMMARY ═══');
  console.log(`Total: ${results.pass + results.fail} tests`);
  console.log(`✅ PASS: ${results.pass}`);
  console.log(`❌ FAIL: ${results.fail}`);
  console.log(`⚠️  WARNINGS: ${results.warnings.length}`);
  if (results.errors.length) {
    console.error('FAILED TESTS:');
    results.errors.forEach(e => console.error(' -', e));
  }
  console.groupEnd();

  return results;
};

// Auto-run jika di-load langsung
// window.runQATests();
