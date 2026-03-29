// ══════════════════════════════════════════════════════
//  sources.js — Nugget Nihongo Source & Credit Data
//  Dibuat oleh: Agent 3 (Book Index Agent)
//  Digunakan oleh: Agent 5 (UI) untuk credit/about page
// ══════════════════════════════════════════════════════

window.nuggetSources = {

  books: [
    {
      id          : 'irodori',
      title       : 'Irodori: Japanese for Life in Japan',
      title_ja    : 'いろどり　生活の日本語',
      publisher   : 'Japan Foundation',
      publisher_ja: '国際交流基金',
      url         : 'https://www.irodori.jpf.go.jp/',
      license     : 'free',         // gratis, tersedia online
      levels      : ['A1', 'A2'],
      jlpt        : ['n5', 'n4'],
      volumes: [
        { label: 'A1',   file: 'book-irodori-a1.js',   units: 18, status: 'done' },
        { label: 'A2-1', file: 'book-irodori-a2-1.js', units: 18, status: 'done' },
        { label: 'A2-2', file: 'book-irodori-a2-2.js', units: 18, status: 'done' },
      ],
      credit_text : 'Konten berdasarkan Irodori oleh Japan Foundation',
      credit_short: 'Irodori (Japan Foundation)',
    },
    {
      id          : 'minna',
      title       : 'Minna no Nihongo Shokyuu',
      title_ja    : 'みんなの日本語 初級',
      publisher   : '3A Corporation',
      publisher_ja: 'スリーエーネットワーク',
      url         : 'https://www.3anet.co.jp/np/books/3600/',
      license     : 'commercial',   // buku berbayar — hanya referensi urutan
      levels      : ['Shokyuu I', 'Shokyuu II'],
      jlpt        : ['n5', 'n4'],
      volumes: [
        { label: 'Shokyuu I',  file: 'book-minna-1.js', chapters: 25, status: 'done' },
        { label: 'Shokyuu II', file: 'book-minna-2.js', chapters: 25, status: 'done' },
      ],
      credit_text : 'Diorganisir berdasarkan kurikulum Minna no Nihongo (3A Corporation)',
      credit_short: 'Minna no Nihongo (3A Corp.)',
      legal_note  : 'Hanya referensi urutan pelajaran — bukan reproduksi konten buku',
    },
  ],

  vocab_sources: [
    {
      id          : 'soumatome',
      title       : 'Nihongo Sou Matome',
      title_ja    : '日本語総まとめ',
      publisher   : 'ASK Publishing',
      publisher_ja: 'アスク出版',
      url         : 'https://www.ask-books.com/jp/somatome/',
      license     : 'commercial',
      levels: [
        { jlpt: 'n5', file: 'vocab-n5-soumatome.js', entries: 416,  status: 'done'    },
        { jlpt: 'n4', file: 'vocab-n4-soumatome.js', entries: null, status: 'done'    },
        { jlpt: 'n3', file: 'vocab-n3-soumatome.js', entries: null, status: 'stub'    },
        { jlpt: 'n2', file: 'vocab-n2-soumatome.js', entries: null, status: 'pending' },
        { jlpt: 'n1', file: 'vocab-n1-soumatome.js', entries: null, status: 'pending' },
      ],
      credit_text : 'Urutan pembelajaran mengacu pada Nihongo Sou Matome (ASK Publishing)',
      credit_short: 'Sou Matome (ASK Publishing)',
      legal_note  : 'Hanya referensi urutan/kelompok vocab — bukan reproduksi teks buku',
    },
    {
      id          : 'jlpt-corpus',
      title       : 'JLPT Vocabulary Corpus',
      title_ja    : null,
      publisher   : 'Nugget Nihongo (kurasi internal)',
      publisher_ja: null,
      url         : null,
      license     : 'original',     // kurasi sendiri
      levels: [
        { jlpt: 'n5', file: 'vocab-n5-core.js', entries: 413,  status: 'done'    },
        { jlpt: 'n4', file: 'vocab-n4-core.js', entries: 36,   status: 'done'    },
        { jlpt: 'n3', file: 'vocab-n3-core.js', entries: null, status: 'pending' },
        { jlpt: 'n2', file: 'vocab-n2-core.js', entries: null, status: 'pending' },
        { jlpt: 'n1', file: 'vocab-n1-core.js', entries: null, status: 'pending' },
      ],
      credit_text : 'Kurasi vocab JLPT oleh tim Nugget Nihongo',
      credit_short: 'Nugget Nihongo Corpus',
    },
  ],

  // Template teks credit untuk UI (Agent 5 bisa pakai langsung)
  ui_credit: {
    id          : 'about-sources',
    heading     : 'Sumber Materi',
    disclaimer  : 'Nugget Nihongo adalah proyek mandiri dan tidak berafiliasi dengan penerbit di atas.',
    entries: [
      {
        emoji  : '📗',
        name   : 'Irodori: Japanese for Life in Japan',
        by     : 'Japan Foundation',
        note   : 'Tersedia gratis di irodori.jpf.go.jp',
        url    : 'https://www.irodori.jpf.go.jp/',
        is_free: true,
      },
      {
        emoji  : '📘',
        name   : 'Minna no Nihongo (みんなの日本語)',
        by     : '3A Corporation',
        note   : 'Konten diorganisir berdasarkan kurikulum Minna no Nihongo',
        url    : 'https://www.3anet.co.jp/np/books/3600/',
        is_free: false,
      },
      {
        emoji  : '📙',
        name   : 'Nihongo Sou Matome (日本語総まとめ)',
        by     : 'ASK Publishing',
        note   : 'Urutan pembelajaran mengacu pada seri Sou Matome',
        url    : 'https://www.ask-books.com/jp/somatome/',
        is_free: false,
      },
      {
        emoji  : '📖',
        name   : 'JLPT Vocabulary Corpus',
        by     : 'Nugget Nihongo',
        note   : 'Kurasi vocab JLPT oleh tim Nugget Nihongo',
        url    : null,
        is_free: true,
      },
    ],
  },

};
