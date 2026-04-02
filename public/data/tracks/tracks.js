// ══════════════════════════════════════════════════════
//  tracks.js — Nugget Nihongo Study Tracks
//  Architecture v3 — v15.3.2
//  Study tracks are curated, ordered paths through the Global Database.
//  Load AFTER grammar-index.js and vocab-index.js and all lens files.
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
    // Curated survival-first ordering: greetings > self-intro > demonstratives > existence > verbs > adj > counting
    items   : [
      {type:'grammar', id:'gn5-00059'}, // sumimasen
      {type:'grammar', id:'gn5-00001'}, // wa desu (X is Y)
      {type:'grammar', id:'gn5-00002'}, // wa janai desu (X is not Y)
      {type:'grammar', id:'gn5-00004'}, // wa desu ka (question)
      {type:'grammar', id:'gn5-00005'}, // kore/sore/are
      {type:'grammar', id:'gn5-00006'}, // kono/sono/ano
      {type:'grammar', id:'gn5-00007'}, // ga arimasu
      {type:'grammar', id:'gn5-00008'}, // ga imasu
      {type:'grammar', id:'gn5-00010'}, // ni (location)
      {type:'grammar', id:'gn5-00011'}, // de (place of action)
      {type:'grammar', id:'gn5-00013'}, // ni (time)
      {type:'grammar', id:'gn5-00016'}, // masu
      {type:'grammar', id:'gn5-00017'}, // mashita
      {type:'grammar', id:'gn5-00018'}, // masen
      {type:'grammar', id:'gn5-00019'}, // masen deshita
      {type:'grammar', id:'gn5-00025'}, // te kudasai
      {type:'grammar', id:'gn5-00027'}, // tai desu
      {type:'grammar', id:'gn5-00030'}, // i-adjective
      {type:'grammar', id:'gn5-00031'}, // na-adjective
      {type:'grammar', id:'gn5-00040'}, // counter tsu
      {type:'grammar', id:'gn5-00051'}, // wo kudasai
    ],
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
    dynamic : true,
    filter  : { jlpt: 'n5' },
    items   : [],
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
    dynamic : true,
    filter  : { jlpt: 'n4' },
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
    dynamic : true,
    filter  : { jlpt: 'n3' },
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
    dynamic : true,
    filter  : { jlpt: 'n2' },
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
    dynamic : true,
    filter  : { jlpt: 'n1' },
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
    items      : [],  // Needs vocab lens with new IDs
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

  // ── BOOK: Soumatome N4 ────────────────────────────────
  'trk-book-sm-n4': {
    id         : 'trk-book-sm-n4',
    name       : 'Sou Matome N4',
    name_id    : 'Jalur Sou Matome N4 Bunpou',
    desc       : 'Ikuti urutan Sou Matome N4 Bunpou — 6 minggu, 102 pola.',
    target     : 'n4',
    icon       : '📙',
    book_source: 'soumatome-n4',
    lens_ref   : 'grammarLensSoumatomeN4',
    dynamic_lens: true,
    items      : [],
  },

  // ── BOOK: Soumatome N3 ────────────────────────────────
  'trk-book-sm-n3': {
    id         : 'trk-book-sm-n3',
    name       : 'Sou Matome N3',
    name_id    : 'Jalur Sou Matome N3 Bunpou',
    desc       : 'Ikuti urutan Sou Matome N3 Bunpou — 6 minggu, 132 pola.',
    target     : 'n3',
    icon       : '📙',
    book_source: 'soumatome-n3',
    lens_ref   : 'grammarLensSoumatomeN3',
    dynamic_lens: true,
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

// ── RUNTIME POPULATION ───────────────────────────────────────
(function populateTracks() {
  var tracks = window.studyTracks;
  var grammarDB = window.grammarDB || [];
  var vocabDBs = {
    n5: window.vocabN5 || [],
    n4: window.vocabN4 || [],
    n3: window.vocabN3 || [],
    n2: window.vocabN2 || [],
    n1: window.vocabN1 || [],
  };

  // Auto-populate JLPT tracks from global DB
  Object.values(tracks).forEach(function(trk) {
    if (!trk.dynamic || !trk.filter) return;
    var level = trk.filter.jlpt;
    var grammar = grammarDB.filter(function(g) { return g.level === level; });
    var vocab = vocabDBs[level] || [];
    trk.items = grammar.map(function(g) { return {type:'grammar', id:g.id}; })
      .concat(vocab.map(function(v) { return {type:'vocab', id:v.id}; }));
    trk._count = trk.items.length;
  });

  // Auto-populate Soumatome lens tracks
  Object.values(tracks).forEach(function(trk) {
    if (!trk.dynamic_lens || !trk.lens_ref) return;
    var lens = window[trk.lens_ref];
    if (!lens || !lens.entries) return;
    trk.items = lens.entries.map(function(e) {
      return {
        type    : 'grammar',
        id      : e.global_grammar_id || null,
        lens_id : e.id,
        week    : e.week,
        day     : e.day,
      };
    });
    trk._count = trk.items.length;
  });

  // Log
  var populated = Object.values(tracks).filter(function(t) { return t.items.length > 0; });
  var totalItems = populated.reduce(function(s, t) { return s + t.items.length; }, 0);
  console.log('[tracks] Study tracks loaded:', Object.keys(tracks).length, 'tracks,',
    populated.length, 'populated,', totalItems, 'total items');
})();
