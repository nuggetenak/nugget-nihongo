// ══════════════════════════════════════════════════════════════════
//  tests/test-s5-pass15-irodori-soumatome.js
//  SIKLUS V — PASS 15: Irodori A1, A2-1, A2-2 & Sou Matome N4–N3 Grammar Lens
//  Klaster 5: Jalur 9 Buku Teks Pendamping (Latent Module)
//  Audits & Verifies:
//    - Irodori 54 Lessons across 3 Volumes (A1, A2-1, A2-2)
//    - Irodori 188 Can-Do Grammar Lens Entries (100% resolution to canonical)
//    - Sou Matome 234 Grammar Points across N4 & N3 6-Week Schedules
//    - Granular Week/Day Scheduling & Resolvers
//    - Universal FSRS Flashcard Generation for all Textbook Tracks
// ══════════════════════════════════════════════════════════════════

const assert = require('assert');
const path = require('path');
const fs = require('fs');

console.log('╔══════════════════════════════════════════════════════════════════╗');
console.log('║   SIKLUS V — PASS 15: IRODORI & SOU MATOME GRAMMAR LENS MATRIX   ║');
console.log('╚══════════════════════════════════════════════════════════════════╝\n');

const {
  loadIrodoriBook,
  loadIrodoriGrammarLens,
  getAllIrodoriLessons,
  resolveIrodoriGrammarEntries,
  getIrodoriCanDoMetrics,
  loadSoumatomeGrammarLens,
  getSoumatomeWeeklySchedule,
  resolveSoumatomeGrammarEntries,
  getSoumatomeCoverageStats,
  generateBookFsrsCards,
} = require('../src/lib/data/bookAdapter.ts');

const { BOOK_PEDAGOGY_REGISTRY } = require('../src/lib/data/bookPedagogyMatrix.ts');

async function runPass15Tests() {
  // ── T-1: Irodori 54 Lessons across 3 Volumes (A1, A2-1, A2-2) ──
  console.log('--- [T-1] Irodori 54-Lesson Curricular Continuity & Metadata ---');

  const [bA1, bA21, bA22] = await Promise.all([
    loadIrodoriBook('a1'),
    loadIrodoriBook('a2-1'),
    loadIrodoriBook('a2-2'),
  ]);

  assert.strictEqual(bA1.meta.book, 'irodori-a1');
  assert.strictEqual(bA1.meta.publisher, 'Japan Foundation');
  assert.strictEqual(Object.keys(bA1.units).length, 18);

  assert.strictEqual(bA21.meta.book, 'irodori-a2-1');
  assert.strictEqual(bA21.meta.publisher, 'Japan Foundation');
  assert.strictEqual(Object.keys(bA21.units).length, 18);

  assert.strictEqual(bA22.meta.book, 'irodori-a2-2');
  assert.strictEqual(bA22.meta.publisher, 'Japan Foundation');
  assert.strictEqual(Object.keys(bA22.units).length, 18);

  const allLessons = await getAllIrodoriLessons();
  assert.strictEqual(allLessons.length, 54, `Expected 54 lessons (18 x 3), got ${allLessons.length}`);

  // Check structure of lessons
  allLessons.forEach((l) => {
    assert(l.lesson >= 1 && l.lesson <= 18, `Invalid lesson number: ${l.lesson}`);
    assert(['a1', 'a2-1', 'a2-2'].includes(l.volume), `Invalid volume: ${l.volume}`);
    assert(l.topic && typeof l.topic === 'string', `Lesson ${l.volume}-${l.lesson} missing topic`);
    assert(Array.isArray(l.vocab_ids), `Lesson ${l.volume}-${l.lesson} missing vocab_ids`);
    assert(Array.isArray(l.grammar_ids), `Lesson ${l.volume}-${l.lesson} missing grammar_ids`);
    assert(Array.isArray(l.grammar_entries), `Lesson ${l.volume}-${l.lesson} missing grammar_entries`);
  });

  console.log(`✅ [PASS] T-1: All 54 Irodori lessons verified across A1, A2-1, and A2-2 with topics and metadata.\n`);

  // ── T-2: Irodori 188 Can-Do Grammar Lens Points (100% Match) ──
  console.log('--- [T-2] Irodori Can-Do Grammar Lens Resolution (100% Target) ---');

  const metrics = await getIrodoriCanDoMetrics();
  assert.strictEqual(metrics.a1Entries, 61, `Expected 61 A1 entries, got ${metrics.a1Entries}`);
  assert.strictEqual(metrics.a21Entries, 65, `Expected 65 A2-1 entries, got ${metrics.a21Entries}`);
  assert.strictEqual(metrics.a22Entries, 62, `Expected 62 A2-2 entries, got ${metrics.a22Entries}`);
  assert.strictEqual(metrics.totalEntries, 188, `Expected 188 total entries, got ${metrics.totalEntries}`);
  assert.strictEqual(metrics.resolvedCount, 188, `Expected all 188 resolved, got ${metrics.resolvedCount}`);
  assert.strictEqual(metrics.resolutionRate, 100, `Expected 100% resolution rate, got ${metrics.resolutionRate}`);

  // Test lesson-specific grammar resolution
  const l3A1 = await resolveIrodoriGrammarEntries('a1', 3);
  assert(l3A1.length >= 3, 'Lesson 3 in A1 should have >= 3 grammar entries');
  l3A1.forEach((g) => {
    assert(g.id && g.pattern && g.meaning, `Resolved entry incomplete: ${JSON.stringify(g)}`);
    assert.strictEqual(g.isCanonicalLinked, true, `Entry ${g.id} must be canonically linked`);
  });

  console.log(`✅ [PASS] T-2: All 188 Irodori grammar entries resolved with 100% canonical linkage.\n`);

  // ── T-3: Sou Matome N4 & N3 6-Week Cramming Schedules ──
  console.log('--- [T-3] Sou Matome N4 & N3 6-Week Cramming Schedules ---');

  const smStats = await getSoumatomeCoverageStats();
  assert.strictEqual(smStats.n4Entries, 102, `Expected 102 N4 entries, got ${smStats.n4Entries}`);
  assert.strictEqual(smStats.n3Entries, 132, `Expected 132 N3 entries, got ${smStats.n3Entries}`);
  assert.strictEqual(smStats.totalEntries, 234, `Expected 234 total entries, got ${smStats.totalEntries}`);
  assert.strictEqual(smStats.totalWeeks, 12, 'Expected 12 total weeks (6 for N4 + 6 for N3)');
  assert.strictEqual(smStats.linkedGlobalCount, 226, 'Expected 226 globally linked entries');
  assert.strictEqual(smStats.selfContainedCount, 8, 'Expected 8 self-contained review entries');

  const n4Sched = await getSoumatomeWeeklySchedule('n4');
  assert.strictEqual(n4Sched.length, 6, 'N4 schedule must have 6 weeks');
  n4Sched.forEach((w) => {
    assert.strictEqual(typeof w.week, 'number');
    assert(Object.keys(w.days).length > 0, `Week ${w.week} must have days`);
  });

  const n3Sched = await getSoumatomeWeeklySchedule('n3');
  assert.strictEqual(n3Sched.length, 6, 'N3 schedule must have 6 weeks');
  n3Sched.forEach((w) => {
    assert.strictEqual(typeof w.week, 'number');
    assert(Object.keys(w.days).length > 0, `Week ${w.week} must have days`);
  });

  console.log(`✅ [PASS] T-3: Sou Matome 234 grammar points verified across 12 structured weekly schedules.\n`);

  // ── T-4: Granular Week & Day Resolvers for Sou Matome ──
  console.log('--- [T-4] Granular Week & Day Resolvers for Sou Matome ---');

  const n4W1D1 = await resolveSoumatomeGrammarEntries('n4', 1, 1);
  assert(n4W1D1.length >= 1, 'N4 W1D1 must have grammar entries');
  assert(n4W1D1.some((e) => e.pattern.includes('に')), 'N4 W1D1 must have frequency pattern');

  const n3W1D1 = await resolveSoumatomeGrammarEntries('n3', 1, 1);
  assert(n3W1D1.length >= 1, 'N3 W1D1 must have grammar entries');
  assert(n3W1D1.some((e) => e.pattern.includes('られている')), 'N3 W1D1 must have passive pattern');

  // Verify self-contained review entries return valid patterns and meanings
  const n4All = await resolveSoumatomeGrammarEntries('n4');
  const selfContainedN4 = n4All.filter((e) => !e.isCanonicalLinked);
  assert.strictEqual(selfContainedN4.length, 4, 'Must have 4 self-contained review entries in N4');
  selfContainedN4.forEach((e) => {
    assert(e.pattern && e.meaning, `Self-contained entry must have pattern and meaning: ${e.id}`);
  });

  console.log('✅ [PASS] T-4: Granular week/day resolvers verified for both canonical and self-contained entries.\n');

  // ── T-5: Cross-Track FSRS Flashcard Generation ──
  console.log('--- [T-5] Cross-Track FSRS Flashcard Generation ---');

  // Minna cards
  const minnaCards = await generateBookFsrsCards('minna', { chapterOrLesson: 1 });
  assert(minnaCards.length >= 10, 'Minna Chapter 1 must generate >= 10 flashcards');
  assert(minnaCards[0].tags.includes('minna'));
  assert(minnaCards[0].initialStability > 0 && minnaCards[0].initialDifficulty > 0);

  // Irodori cards
  const irodoriCards = await generateBookFsrsCards('irodori', { volume: 'a1', chapterOrLesson: 3 });
  assert(irodoriCards.length >= 3, 'Irodori Lesson 3 must generate >= 3 flashcards');
  assert(irodoriCards[0].tags.includes('can-do'));
  assert.strictEqual(irodoriCards[0].sourceBook, 'Irodori A1');

  // Sou Matome cards
  const smCards = await generateBookFsrsCards('soumatome', { level: 'n4', week: 1, day: 1 });
  assert(smCards.length >= 1, 'Sou Matome W1D1 must generate >= 1 flashcards');
  assert(smCards[0].tags.includes('exam-prep'));
  assert.strictEqual(smCards[0].sourceBook, 'Nihongo Sou Matome N4');

  console.log(`✅ [PASS] T-5: FSRS flashcards generated across Minna (${minnaCards.length}), Irodori (${irodoriCards.length}), and Sou Matome (${smCards.length}).\n`);

  console.log('══════════════════════════════════════════════════════════════════');
  console.log('🎉 SIKLUS V — PASS 15 REGRESSION SUITE: 100% GREEN (5/5 PASS)');
  console.log('══════════════════════════════════════════════════════════════════\n');
}

runPass15Tests().catch((err) => {
  console.error('❌ [FAIL] Pass 15 Regression Suite Failed:', err);
  process.exit(1);
});
