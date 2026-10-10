// ══════════════════════════════════════
//  Nugget — Nihongo · Service Worker (Modern PWA & Offline Engine)
//  Hybrid cache strategy:
//  - Cache-first with dynamic caching for static assets, fonts, & data
//  - Network-first with offline fallback for HTML navigation
//  - Network-first for dynamic API endpoints (Supabase / Cloudflare Workers)
// ══════════════════════════════════════

const CACHE = 'nihongo-v18.0.0';

const CORE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/fonts/dm-sans.woff2',
  '/fonts/biz-udgothic.woff2',

  // ── Grammar DB ──────────────────────────────────────────
  '/data/grammar/grammar-n5.js',
  '/data/grammar/grammar-n4.js',
  '/data/grammar/grammar-n3.js',
  '/data/grammar/grammar-n2.js',
  '/data/grammar/grammar-n1.js',
  '/data/grammar/grammar-index.js',

  // ── Vocab DB ────────────────────────────────────────────
  '/data/vocab/vocab-n5.js',
  '/data/vocab/vocab-n4.js',
  '/data/vocab/vocab-n3.js',
  '/data/vocab/vocab-n2.js',
  '/data/vocab/vocab-n1.js',
  '/data/vocab/vocab-index.js',

  // ── Kurikulum Orisinal 8 Jalur (N5–N1 & SSW) ──────────────
  '/data/curriculum/curriculum-n5.js',
  '/data/curriculum/curriculum-n4.js',
  '/data/curriculum/curriculum-n3.js',
  '/data/curriculum/curriculum-n2.js',
  '/data/curriculum/curriculum-n1.js',
  '/data/curriculum/curriculum-ssw-kaigo.js',
  '/data/curriculum/curriculum-ssw-food.js',
  '/data/curriculum/curriculum-ssw-construction.js',

  // ── Inventaris Diagnostik L1 ────────────────────────────
  '/data/diagnostics/confusion-pairs.js',

  // ── Books & Tracks ──────────────────────────────────────
  '/data/books/sources.js',
  '/data/tracks/tracks.js',
  '/data/books/book-irodori-a1.js',
  '/data/books/book-irodori-a2-1.js',
  '/data/books/book-irodori-a2-2.js',
  '/data/books/book-minna-1.js',
  '/data/books/book-minna-2.js',
  '/data/books/irodori/grammar-lens-ir-a1.js',
  '/data/books/irodori/grammar-lens-ir-a2-1.js',
  '/data/books/irodori/grammar-lens-ir-a2-2.js',
  '/data/books/soumatome/grammar-lens-sm-n3.js',
  '/data/books/soumatome/grammar-lens-sm-n4.js',

  // ── Fallback Drills ─────────────────────────────────────
  '/data/fallback/grammar-drills.json',
  '/data/fallback/vocab-drills.json',
  '/data/fallback/quiz-drills.json'
];

// Legacy assets kept for backward compatibility with vanilla branch
const LEGACY_OPTIONAL_ASSETS = [
  '/styles/app.css',
  '/styles/layout/shell.css',
  '/styles/onboarding.css',
  '/styles/settings.css',
  '/styles/home-dashboard.css',
  '/js/core/version.js',
  '/js/core/state.js',
  '/js/core/router.js',
  '/js/core/theme.js',
  '/js/core/install.js',
  '/js/local-state.js',
  '/js/fsrs-engine.js',
  '/js/fsrs-math.js',
  '/js/gamification.js',
  '/js/streak.js',
  '/js/backup-restore.js',
  '/js/app.js'
];

const ALL_PRECACHE = [...CORE_ASSETS, ...LEGACY_OPTIONAL_ASSETS];

// Network-first origins — never cache Supabase / Worker API calls
const NETWORK_FIRST = [
  'supabase.co',
  'workers.dev',
  'googleapis.com',
  'groq.com'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(async cache => {
      // Use Promise.allSettled so missing legacy assets do NOT block modern PWA installation
      await Promise.allSettled(
        ALL_PRECACHE.map(url =>
          cache.add(url).catch(err => {
            // Optional asset missing in modern bundle; safe to ignore
          })
        )
      );
    })
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
  const req = e.request;
  const url = new URL(req.url);

  // Only handle GET requests
  if (req.method !== 'GET') return;

  // 1. API endpoints -> Network first
  if (NETWORK_FIRST.some(h => url.hostname.includes(h))) {
    e.respondWith(
      fetch(req).catch(() => caches.match(req))
    );
    return;
  }

  // 2. Navigation requests (HTML documents) -> Network first, fallback to cached index.html
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then(res => {
          if (res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE).then(c => c.put(req, copy));
          }
          return res;
        })
        .catch(async () => {
          return (
            (await caches.match(req)) ||
            (await caches.match('/index.html')) ||
            (await caches.match('/'))
          );
        })
    );
    return;
  }

  // 3. Static assets, fonts, icons, data scripts, and Vite chunks
  e.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req)
        .then(res => {
          if (
            res.status === 200 &&
            (url.origin === self.location.origin || url.hostname.includes('fonts.g'))
          ) {
            const copy = res.clone();
            caches.open(CACHE).then(c => c.put(req, copy));
          }
          return res;
        })
        .catch(() => {
          return cached;
        });
    })
  );
});
