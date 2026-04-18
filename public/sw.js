// ══════════════════════════════════════
//  Nugget — Nihongo · Service Worker
//  Hybrid cache strategy: cache-first for static assets,
//  network-first for API calls (Supabase / Cloudflare Workers).
// ══════════════════════════════════════

const CACHE = 'nihongo-v15.11.6';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './styles/app.css',
  './fonts/dm-sans.woff2',
  './fonts/biz-udgothic.woff2',

  // ── Core JS ───────────────────────────────────────────
  './js/core/version.js',
  './js/core/state.js',
  './js/core/router.js',
  './js/core/theme.js',
  './js/core/install.js',
  // grammar-query.js removed — superseded by grammar-index.js

  // ── Local state + SRS ─────────────────────────────────
  './js/local-state.js',
  './js/fsrs-engine.js',
  './js/fsrs-math.js',
  './js/gamification.js',
  './js/streak.js',
  './js/backup-restore.js',
  './js/offline-ai-cache.js',

  // ── Supabase + AI layer ───────────────────────────────
  './js/supabase-client.js',
  './js/dna-summarizer.js',
  './js/ai-proxy.js',
  './js/ai-tutor.js',
  './js/sync-hook.js',
  './js/analytics.js',

  // ── Features ──────────────────────────────────────────
  './js/error-boundary.js',
  './js/swipe.js',
  './js/browse.js',
  './js/browse-vocab.js',
  './js/vocab-detail.js',
  './js/global-search.js',
  './js/conjugation-engine.js',
  './js/conjugation.js',
  './js/quiz.js',
  './js/quiz-engine-v2.js',
  './js/quiz-generator.js',
  './js/quiz-vocab.js',
  './js/quiz-mixed.js',
  './js/quiz-feedback.js',
  './js/quiz-typetr.js',
  './js/fillin.js',
  './js/translation.js',
  './js/errorfind.js',
  './js/multichoice.js',
  './js/detail.js',
  './js/daily-word.js',
  './js/lang/lang-core.js',
  './js/app.js',

  // ── Pages ─────────────────────────────────────────────
  './js/pages/materi-hub.js',
  './js/pages/onboarding.js',
  './js/pages/settings.js',
  './js/pages/about.js',
  './js/tweaks.js',

  // ── AI feature layer (non-critical offline, but cache for perf) ──
  './js/ai-validator.js',
  './js/ai-feedback.js',
  './js/ai-content-engine.js',
  './js/ai-quiz-mode.js',

  // ── Grammar DB (Architecture v3) ─────────────────────
  './data/grammar/grammar-n5.js',
  './data/grammar/grammar-n4.js',
  './data/grammar/grammar-n3.js',
  // grammar-n2.js and grammar-n1.js omitted — seed data only, not production-complete
  './data/grammar/grammar-index.js',

  // ── Vocab DB ──────────────────────────────────────────
  './data/vocab/vocab-n5.js',
  './data/vocab/vocab-n4.js',
  './data/vocab/vocab-n3.js',
  // vocab-n2.js and vocab-n1.js omitted — seed data only
  './data/vocab/vocab-index.js',

  // ── Book Lenses + Sources ─────────────────────────────
  './data/books/book-irodori-a1.js',
  './data/books/book-irodori-a2-1.js',
  './data/books/book-irodori-a2-2.js',
  './data/books/book-minna-1.js',
  './data/books/book-minna-2.js',
  './data/books/irodori/grammar-lens-ir-a1.js',
  './data/books/irodori/grammar-lens-ir-a2-1.js',
  './data/books/irodori/grammar-lens-ir-a2-2.js',
  './data/books/soumatome/grammar-lens-sm-n3.js',
  './data/books/soumatome/grammar-lens-sm-n4.js',
  './data/books/sources.js',
  './data/tracks/tracks.js',

  // ── Offline AI fallback drills ────────────────────────
  './data/fallback/grammar-drills.json',
  './data/fallback/vocab-drills.json',
  './data/fallback/quiz-drills.json',
];

// Network-first origins — never cache Supabase / Worker API calls
const NETWORK_FIRST = [
  'supabase.co',
  'workers.dev',
  'googleapis.com',
  'groq.com',
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
  const url = e.request.url;

  // Network-first for API endpoints
  if (NETWORK_FIRST.some(h => url.includes(h))) {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request))
    );
    return;
  }

  // Cache-first for static assets
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
