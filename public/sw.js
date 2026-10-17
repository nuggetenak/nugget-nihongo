// ══════════════════════════════════════
//  Nugget — Nihongo · Service Worker (Modern PWA & Offline Engine)
//  Hybrid cache strategy:
//  - Cache-first with dynamic caching for static assets, fonts, & data
//  - Network-first with offline fallback for HTML navigation
//  - Network-first for dynamic API endpoints (Supabase / Cloudflare Workers)
// ══════════════════════════════════════

const CACHE = 'nihongo-v20.0.0';

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

  // ── Kurikulum Orisinal & SSW Vokasional ───────────────
  '/data/curriculum/curriculum-n5.js',
  '/data/curriculum/curriculum-n4.js',
  '/data/curriculum/curriculum-n3.js',
  '/data/curriculum/curriculum-n2.js',
  '/data/curriculum/curriculum-n1.js',
  '/data/curriculum/curriculum-jft-a1.js',
  '/data/curriculum/curriculum-jft-a2.js',
  '/data/curriculum/curriculum-seikatsu.js',
  '/data/curriculum/curriculum-ssw-kaigo.js',
  '/data/curriculum/curriculum-ssw-food.js',
  '/data/curriculum/curriculum-ssw-food-service.js',
  '/data/curriculum/curriculum-ssw-construction.js',
  '/data/curriculum/curriculum-ssw-agriculture.js',
  '/data/curriculum/curriculum-ssw-automobile.js',
  '/data/curriculum/curriculum-ssw-aviation.js',
  '/data/curriculum/curriculum-ssw-building-cleaning.js',
  '/data/curriculum/curriculum-ssw-electric-electronic.js',
  '/data/curriculum/curriculum-ssw-fishery.js',
  '/data/curriculum/curriculum-ssw-forestry.js',
  '/data/curriculum/curriculum-ssw-industrial-machinery.js',
  '/data/curriculum/curriculum-ssw-logistics.js',
  '/data/curriculum/curriculum-ssw-manufacturing.js',
  '/data/curriculum/curriculum-ssw-railway.js',
  '/data/curriculum/curriculum-ssw-shipbuilding.js',
  '/data/curriculum/curriculum-ssw-textile.js',
  '/data/curriculum/curriculum-ssw-timber.js',
  '/data/curriculum/curriculum-ssw-accommodation.js',

  // ── Inventaris Diagnostik L1 ────────────────────────────
  '/data/confusion-pairs.js',

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

  // ── Manifests & Fallback Drills ───────────────────────
  '/manifest.json',
  '/manifest.webmanifest',
  '/favicon.svg',
  '/favicon.ico',
  '/apple-touch-icon.png',
  '/audio/choukai/choukai-n5-01.json',
  '/audio/choukai/choukai-jft-01.json',
  '/data/fallback/grammar-drills.json',
  '/data/fallback/vocab-drills.json',
  '/data/fallback/quiz-drills.json',

  // ── Pitch Accent & Linguistic Nuance Datasets ─────────
  '/data/pitch/pitch-accent-index.json',
  '/data/nuance-notes/particles.json',
  '/data/nuance-notes/connectives.json',
  '/data/nuance-notes/syntax.json',
  '/data/nuance-notes/counters.json',
  '/data/nuance-notes/giongo_and_gitaigo.json'
];

// Purged dead assets from legacy vanilla branch to eliminate 404 cache pollution
const LEGACY_OPTIONAL_ASSETS = [];

const ALL_PRECACHE = [...CORE_ASSETS];

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
      // 1. Core assets: log diagnostic warnings if any are missing
      await Promise.allSettled(
        CORE_ASSETS.map(url =>
          cache.add(url).catch(err => {
            console.warn(`[SW] Core precache asset missing or failed to fetch: ${url}`, err);
          })
        )
      );
      // 2. Optional legacy assets: safe to ignore without noise
      await Promise.allSettled(
        LEGACY_OPTIONAL_ASSETS.map(url =>
          cache.add(url).catch(() => {})
        )
      );
    })
  );
  // Ticket T-01: Removed unconditional skipWaiting invocation to prevent in-flight session hijacking
});

// Prompt-based update flow: only skip waiting when user/app confirms update
self.addEventListener('message', e => {
  if (e.data && (e.data.type === 'SKIP_WAITING' || e.data === 'skipWaiting')) {
    self.skipWaiting();
  }
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

/**
 * Ticket T-02: iOS Safari / WebKit HTTP 206 Partial Content Audio Streaming Handler
 * Slices cached or fetched audio/video ArrayBuffers to satisfy Range: bytes=X-Y requests.
 */
async function handleRangeRequest(req) {
  const rangeHeader = req.headers.get('range');

  // If not a range request, fall back to standard fetch/cache
  if (!rangeHeader) {
    const cached = await caches.match(req);
    if (cached) return cached;
    const res = await fetch(req);
    if (res.status === 200) {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
    }
    return res;
  }

  // 1. Check if complete media file is in cache
  let response = await caches.match(req, { ignoreSearch: true });
  if (!response) {
    try {
      const netRes = await fetch(req);
      if (netRes.status === 206) {
        return netRes;
      }
      if (netRes.status === 200) {
        const copy = netRes.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        response = netRes;
      } else {
        return netRes;
      }
    } catch {
      return new Response('Audio Network Timeout', { status: 408, statusText: 'Request Timeout' });
    }
  }

  const arrayBuffer = await response.arrayBuffer();
  const totalLength = arrayBuffer.byteLength;
  const matches = /bytes\s*=\s*(\d*)\s*-\s*(\d*)/.exec(rangeHeader);

  if (!matches) {
    return new Response(arrayBuffer, {
      status: 200,
      headers: response.headers,
    });
  }

  let start;
  let end;

  const rawStart = matches[1];
  const rawEnd = matches[2];

  if (!rawStart && rawEnd) {
    // Suffix byte range: bytes=-N (request last N bytes, RFC 7233 §2.1)
    const suffixLength = parseInt(rawEnd, 10);
    if (isNaN(suffixLength) || suffixLength <= 0) {
      start = 0;
      end = totalLength - 1;
    } else {
      start = Math.max(0, totalLength - suffixLength);
      end = totalLength - 1;
    }
  } else if (rawStart && !rawEnd) {
    // Open-ended byte range: bytes=N- (from offset N to EOF)
    start = parseInt(rawStart, 10);
    end = totalLength - 1;
  } else if (rawStart && rawEnd) {
    // Explicit byte range: bytes=N-M
    start = parseInt(rawStart, 10);
    end = parseInt(rawEnd, 10);
  } else {
    // Malformed range bytes=-
    start = 0;
    end = totalLength - 1;
  }

  if (isNaN(start)) start = 0;
  if (isNaN(end) || end >= totalLength) end = totalLength - 1;

  if (start >= totalLength || end < start || totalLength === 0) {
    return new Response('', {
      status: 416,
      statusText: 'Range Not Satisfiable',
      headers: {
        'Content-Range': `bytes */${totalLength}`,
      },
    });
  }

  const slicedBuffer = arrayBuffer.slice(start, end + 1);
  const slicedLength = end - start + 1;

  const responseHeaders = new Headers(response.headers);
  responseHeaders.set('Content-Range', `bytes ${start}-${end}/${totalLength}`);
  responseHeaders.set('Content-Length', slicedLength.toString());
  responseHeaders.set('Accept-Ranges', 'bytes');
  // Sliced ArrayBuffer is raw uncompressed bytes; avoid decoding mismatch
  responseHeaders.delete('Content-Encoding');

  return new Response(slicedBuffer, {
    status: 206,
    statusText: 'Partial Content',
    headers: responseHeaders,
  });
}

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

  // 3. Audio & media range streaming (iOS Safari / WebKit HTTP 206 Partial Content fix)
  if (
    req.headers.has('range') ||
    req.destination === 'audio' ||
    req.destination === 'video' ||
    url.pathname.match(/\.(mp3|wav|ogg|m4a|aac|mp4|webm)$/i)
  ) {
    e.respondWith(handleRangeRequest(req));
    return;
  }

  // 4. Stale-While-Revalidate for curriculum, vocab, and grammar data
  if (url.pathname.startsWith('/data/') && (url.pathname.endsWith('.js') || url.pathname.endsWith('.json'))) {
    e.respondWith(
      caches.open(CACHE).then(cache => {
        return cache.match(req).then(cachedResponse => {
          const fetchPromise = fetch(req).then(networkResponse => {
            if (networkResponse.status === 200) {
              cache.put(req, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => cachedResponse);

          return cachedResponse || fetchPromise;
        });
      })
    );
    return;
  }

  // 5. Static assets, fonts, icons, data scripts, and Vite chunks
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

// ── Background Sync for Telemetry & Offline Reviews ─────────────────
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-review-telemetry') {
    event.waitUntil(
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          client.postMessage({ type: 'SYNC_TELEMETRY_TRIGGER' });
        });
      })
    );
  }
});
