// ══════════════════════════════════════════════════════
//  tracks.js — Nugget Nihongo Study Tracks
//  Architecture v3 — 1 April 2026
//  Study tracks are curated, ordered paths through the Global Database.
//  Load AFTER grammar-index.js and vocab-index.js
// ══════════════════════════════════════════════════════

window.studyTracks = {

  // ── FREEWAY ────────────────────────────────────────────
  'trk-freeway': {
    id      : 'trk-freeway',
    name    : 'Freeway',
    name_id : 'Jalur Cepat',
    desc    : 'Survival Japanese — hal pertama yang kamu butuhkan untuk berkomunikasi.',
    target  : 'absolute-beginner',
    icon    : '🛣️',
    curation: { strategy: 'survival-utility', max_items: 200 },
    items   : [],  // TODO: curate — survival-first ordering of N5 grammar + vocab
  },

  // ── JLPT N5 ────────────────────────────────────────────
  'trk-jlpt-n5': {
    id      : 'trk-jlpt-n5',
    name    : 'JLPT N5',
    name_id : 'JLPT N5 — Dasar',
    desc    : 'Semua grammar dan vocab level N5 — urutan standar.',
    target  : 'n5',
    icon    : '🏷️',
    curation: { strategy: 'jlpt-systematic' },
    items   : [],  // Auto-populated from grammarDB + vocabDB where jlpt=n5
  },

  // ── JLPT N4 ────────────────────────────────────────────
  'trk-jlpt-n4': {
    id      : 'trk-jlpt-n4',
    name    : 'JLPT N4',
    name_id : 'JLPT N4 — Dasar Menengah',
    desc    : 'Semua grammar dan vocab level N4.',
    target  : 'n4',
    icon    : '🏷️',
    curation: { strategy: 'jlpt-systematic' },
    items   : [],
  },

  // ── JLPT N3 ────────────────────────────────────────────
  'trk-jlpt-n3': {
    id      : 'trk-jlpt-n3',
    name    : 'JLPT N3',
    name_id : 'JLPT N3 — Menengah',
    desc    : 'Semua grammar dan vocab level N3.',
    target  : 'n3',
    icon    : '🏷️',
    curation: { strategy: 'jlpt-systematic' },
    items   : [],
  },

  // ── JLPT N2 ────────────────────────────────────────────
  'trk-jlpt-n2': {
    id      : 'trk-jlpt-n2',
    name    : 'JLPT N2',
    name_id : 'JLPT N2 — Mahir',
    desc    : 'Semua grammar dan vocab level N2.',
    target  : 'n2',
    icon    : '🏷️',
    curation: { strategy: 'jlpt-systematic' },
    items   : [],
  },

  // ── JLPT N1 ────────────────────────────────────────────
  'trk-jlpt-n1': {
    id      : 'trk-jlpt-n1',
    name    : 'JLPT N1',
    name_id : 'JLPT N1 — Mahir Tinggi',
    desc    : 'Semua grammar dan vocab level N1.',
    target  : 'n1',
    icon    : '🏷️',
    curation: { strategy: 'jlpt-systematic' },
    items   : [],
  },

  // ── BOOK: Irodori A1 ──────────────────────────────────
  'trk-book-irodori-a1': {
    id         : 'trk-book-irodori-a1',
    name       : 'Irodori A1',
    name_id    : 'Jalur Irodori A1',
    desc       : 'Ikuti urutan Irodori A1 — Unit 1 sampai 18.',
    target     : 'n5',
    icon       : '📗',
    book_source: 'irodori-a1',
    items      : [],  // Auto-generated from vocab-lens + grammar-lens
  },

  // ── BOOK: Irodori A2-1 ────────────────────────────────
  'trk-book-irodori-a2-1': {
    id         : 'trk-book-irodori-a2-1',
    name       : 'Irodori A2-1',
    name_id    : 'Jalur Irodori A2-1',
    desc       : 'Ikuti urutan Irodori A2-1.',
    target     : 'n4',
    icon       : '📗',
    book_source: 'irodori-a2-1',
    items      : [],
  },

  // ── BOOK: Irodori A2-2 ────────────────────────────────
  'trk-book-irodori-a2-2': {
    id         : 'trk-book-irodori-a2-2',
    name       : 'Irodori A2-2',
    name_id    : 'Jalur Irodori A2-2',
    desc       : 'Ikuti urutan Irodori A2-2.',
    target     : 'n4',
    icon       : '📗',
    book_source: 'irodori-a2-2',
    items      : [],
  },

  // ── BOOK: Soumatome N5 ────────────────────────────────
  'trk-book-sm-n5': {
    id         : 'trk-book-sm-n5',
    name       : 'Sou Matome N5',
    name_id    : 'Jalur Sou Matome N5',
    desc       : 'Ikuti urutan Sou Matome N5 — 6 minggu.',
    target     : 'n5',
    icon       : '📙',
    book_source: 'soumatome-n5',
    items      : [],
  },

  // ── BOOK: Soumatome N4 ────────────────────────────────
  'trk-book-sm-n4': {
    id         : 'trk-book-sm-n4',
    name       : 'Sou Matome N4',
    name_id    : 'Jalur Sou Matome N4',
    desc       : 'Ikuti urutan Sou Matome N4 Bunpou — 6 minggu.',
    target     : 'n4',
    icon       : '📙',
    book_source: 'soumatome-n4',
    items      : [],
  },

  // ── BOOK: Soumatome N3 ────────────────────────────────
  'trk-book-sm-n3': {
    id         : 'trk-book-sm-n3',
    name       : 'Sou Matome N3',
    name_id    : 'Jalur Sou Matome N3',
    desc       : 'Ikuti urutan Sou Matome N3 Bunpou — 6 minggu.',
    target     : 'n3',
    icon       : '📙',
    book_source: 'soumatome-n3',
    items      : [],
  },

  // ── BOOK: Minna no Nihongo I ──────────────────────────
  'trk-book-mn-1': {
    id         : 'trk-book-mn-1',
    name       : 'Minna no Nihongo I',
    name_id    : 'Jalur Minna I',
    desc       : 'Ikuti urutan Minna no Nihongo Shokyu I — 25 bab.',
    target     : 'n5',
    icon       : '📘',
    book_source: 'minna-1',
    items      : [],
  },

  // ── BOOK: Minna no Nihongo II ─────────────────────────
  'trk-book-mn-2': {
    id         : 'trk-book-mn-2',
    name       : 'Minna no Nihongo II',
    name_id    : 'Jalur Minna II',
    desc       : 'Ikuti urutan Minna no Nihongo Shokyu II — 25 bab.',
    target     : 'n4',
    icon       : '📘',
    book_source: 'minna-2',
    items      : [],
  },

  // ── BEYOND ─────────────────────────────────────────────
  'trk-beyond': {
    id      : 'trk-beyond',
    name    : 'Beyond JLPT',
    name_id : 'Di Luar JLPT',
    desc    : 'Classical Japanese, advanced keigo, morphological patterns.',
    target  : 'beyond',
    icon    : '🎓',
    curation: { strategy: 'advanced' },
    items   : [],
  },

};

console.log('[tracks] Study tracks loaded:', Object.keys(window.studyTracks).length, 'tracks');
