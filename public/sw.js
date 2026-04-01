// ══════════════════════════════════════
//  Nugget — Nihongo · Service Worker
//  Cache-first strategy for offline use
// ══════════════════════════════════════

const CACHE = 'nihongo-v15.0.0';
const ASSETS = [
  // NOTE: data/qa-tests.js TIDAK di-cache — intentional, dev-only tool (DEC-009).
  //       Digunakan Crispy di browser sebelum merge sebagai referential integrity check.
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './styles/app.css',
  './fonts/dm-sans.woff2',
  './fonts/biz-udgothic.woff2',
  './js/core/version.js',
  './js/core/state.js',
  './js/core/router.js',
  './js/core/theme.js',
  './js/core/install.js',
  './js/core/grammar-query.js',
  './js/streak.js',
  './js/swipe.js',
  './js/quiz-generator.js',
  './js/quiz-vocab.js',
  './js/quiz-mixed.js',
  './js/daily-word.js',
  './js/browse-vocab.js',
  './js/vocab-detail.js',
  './js/global-search.js',
  './js/error-boundary.js',
  './js/app.js',
  './js/browse.js',
  './js/quiz.js',
  './js/fillin.js',
  './js/conjugation.js',
  './js/translation.js',
  './js/errorfind.js',
  './js/multichoice.js',
  './js/lang/lang-core.js',
  './js/conjugation-engine.js',
  './js/quiz-feedback.js',
  './js/quiz-typetr.js',
  './js/detail.js',
  './js/srs.js',
  './data/grammar/n3-w1.js',
  './data/grammar/n3-w2.js',
  './data/grammar/n3-w3.js',
  './data/grammar/n3-w4.js',
  './data/grammar/n3-w5.js',
  './data/grammar/n3-w6.js',
  './data/grammar/n4-w1.js',
  './data/grammar/n4-w2.js',
  './data/grammar/n4-w3.js',
  './data/grammar/n4-w4.js',
  './data/grammar/n4-w5.js',
  './data/grammar/n4-w6.js',
  './data/grammar/dummy.js',
  // ── Grammar DB ───────────────────────────────────────
  './data/grammar/grammar-n5.js',
  './data/grammar/grammar-n4.js',
  './data/grammar/grammar-n3.js',
  './data/grammar/grammar-n2.js',  // stub — 0 entries, belum ada data
  './data/grammar/grammar-n1.js',  // stub — 0 entries, belum ada data
  './data/grammar/bank-soal.js',
  './data/grammar/bank-soal-n4.js',
  './data/grammar/bank-soal-quiz4.js',
  // ── Vocab DB ─────────────────────────────────────────
  // Unified per RESTRUKTURISASI-B v14.9.0
  './data/vocab/vocab-n5.js',              // 711 entries — aktif v14.9.0
  './data/vocab/vocab-n4.js',              // 720 entries — aktif v14.9.0
  // ── Vocab DB (additional) ────────────────────────────
  // vocab-n1, n2, n3: belum ada data tapi di-cache untuk konsistensi
  './data/vocab/vocab-n3.js',
  './data/vocab/vocab-n2.js',
  './data/vocab/vocab-n1.js',
  './data/vocab/vocab-index.js',

  // ── Book Index ───────────────────────────────────────
  // (uncomment saat file sudah berisi data)
  './data/books/book-minna-1.js',
  './data/books/book-minna-2.js',
  './data/books/book-irodori-a1.js',
  './data/books/book-irodori-a2-1.js',
  './data/books/book-irodori-a2-2.js',
  './data/grammar/index.js',
  './data/books/sources.js',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
