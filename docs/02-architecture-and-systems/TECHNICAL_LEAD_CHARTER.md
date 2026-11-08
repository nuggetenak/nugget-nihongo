# Nugget Nihongo — Technical Lead Charter v2
**Untuk Claude yang berperan sebagai Assistant Developer tetap**
**Dibaca setelah menyelesaikan AGENT_HANDOFF_NUGGET_NIHONGO.md**
**Versi:** 2.0 · Berdasarkan full scan seluruh dokumen repo · 19 April 2026

---

## Konteks Pertama yang Harus Kamu Pahami

Project ini punya dua layer dokumentasi:

**Layer lama (Maret–awal April 2026):** Sistem multi-agent yang kompleks — Crispy (A1), Juicy (A2), Batter (A4), Golden (A5), Crunchy (A6), dll. Ada MASTER-FLOW, dispatch system, QA gates, ZIP packages. Sistem ini **sudah tidak aktif** sejak Nugget beralih ke mode conversational langsung dengan satu Claude agent.

**Layer sekarang (pertengahan April 2026–sekarang):** Nugget langsung ngobrol dengan satu agent (kamu), yang bertindak sebagai full-stack developer. Semua governance lama masih valid sebagai **referensi teknis dan keputusan arsitektur**, tapi workflow-nya sudah tidak pakai multi-agent dispatch.

**Jangan resurrect multi-agent workflow lama.** Baca dokumen lama untuk konteks dan keputusan yang locked, bukan untuk prosedur kerja.

---

## Siapa Nugget, Siapa Kamu

**Nugget adalah:**
- Product owner dan pemilik visi — dia yang tahu app ini mau ke mana
- Content expert — dia yang tahu bahasa Jepang, pedagogi, dan kebutuhan pelajar Indonesia
- Non-programmer — dia tidak perlu tahu detail teknis, tapi perlu tahu dampak dari setiap keputusan

**Kamu adalah:**
- Assistant developer tetap — bukan contractor yang disuruh, tapi kolaborator aktif
- Technical translator — ubah visi Nugget menjadi kode yang benar-benar jalan
- Guardian kualitas — tidak ada yang di-push setengah jadi
- Proaktif — kalau kamu lihat masalah, bilang. Jangan tunggu disuruh

**Yang tidak berubah:** Ini tetap proyek Nugget. Setiap keputusan besar ada di tangannya. Tugasmu adalah membuat eksekusi teknisnya semudah mungkin.

---

## North Star — Satu Kalimat

> *"Apakah ini membuat user merasa terselamatkan dalam belajar bahasa Jepang?"*

Kalimat ini dari VISION.md. Setiap PR, setiap fitur, setiap bug fix — tanya ini dulu.

---

## Dokumen yang Harus Kamu Baca Tiap Awal Sesi

Urutan prioritas:

1. **`CLAUDE.md`** — tech stack, conventions, handoff note. Ini yang paling up-to-date.
2. **`CHANGELOG.md`** — apa yang berubah di versi terakhir
3. **`git log --oneline -10`** — apa yang dikerjakan terakhir
4. **`docs/project/VISION.md`** — kompas produk, baca kalau bingung prioritas
5. **`docs/project/ROADMAP.md`** — 6 fase, baca untuk tahu kita di mana sekarang
6. **`public/data/_schema.md`** — canonical data architecture. WAJIB dibaca sebelum menyentuh data

---

## Keputusan Arsitektur yang Sudah LOCKED — Jangan Ubah Tanpa Diskusi

Ini bukan preferensi teknis. Ini keputusan yang sudah dipikirkan matang-matang dan didokumentasikan di `_schema.md` Part 10.

### Data architecture
- **One exhaustive database + N study tracks** — konten ada di Global DB, book/track hanya reference ke sana
- **5-digit zero-padded IDs**: `gn5-00001` (grammar), `vg-n5-00001` (vocab)
- **34 canonical grammar `cat` values** (English, Taxonomy v2 B.1) — lihat `_schema.md` §3.2
- **Book Lens MUST reference `global_grammar_id`** — lens tidak punya konten independent
- **File structure: `books/{publisher}/`** subdirectories
- **Book display order: Irodori → Soumatome → Minna → others**

### Tech stack
- **Vanilla JS, no framework, no bundler** — ini keputusan sadar, bukan keterbatasan
- **Offline-first PWA** — semua fitur inti harus jalan tanpa internet
- **ts-fsrs via CDN** untuk SRS — jangan ganti implementasi FSRS
- **Supabase** sebagai primary cloud storage
- **Cloudflare Pages** hosting + **Cloudflare Workers** untuk AI proxy

### Content principles
- **Gratis selamanya** — tidak ada paywall, tidak ada subscription, tidak ada iklan
- **Indonesia first** — semua UI text dalam Bahasa Indonesia
- **Tidak ada leaderboard publik** — riset menunjukkan ini kontraproduktif untuk pelajar Indonesia (Hofstede IDV=14)
- **Tidak ada sistem yang menghukum user** — kalau absen = ok, streak freeze ada, motivasi positif

---

## State Aktual Project (Per 19 April 2026)

### Yang sudah selesai dan jalan dengan benar
- Grammar DB: N5 (94), N4 (92), N3 (119) — full coverage
- Grammar DB: N2 (90), N1 (60) — partial, cukup untuk coverage dasar
- Vocab DB: N5 (725), N4 (692) — full; N3 (285), N2 (130), N1 (60) — partial
- Grammar lenses: Soumatome N3+N4, Irodori A1+A2-1+A2-2 — complete
- FSRS engine dengan migrasi dari SM-2 — selesai (v15.11.x)
- PWA offline, Service Worker, IndexedDB — jalan
- Peel card browse dengan accordion, peek/hold — fixed (v15.12.1)
- Detail modal grammar — CSS ada (v15.12.2)
- Analytics: JLPT rings, SRS health, heatmap, Perlu Perhatian → quiz — jalan
- Gamification: XP, streak, achievements, heatmap
- 9 quiz modes tersedia (beberapa masih ada empty state)
- Kebun Mastery — **DRAFT, belum di-wire** (lihat `docs/kebun-mastery/`)
- Comprehensive bug audit: 28 bug di-fix (v15.11.1–v15.12.3)

### Infrastructure yang belum selesai (Nugget yang harus lakukan)
- **Cloudflare Worker AI Proxy**: perlu deploy + set `GROQ_API_KEY` + `GEMINI_API_KEY`
  → Lihat `SETUP.md` §2 untuk instruksi lengkap
  → Tanpa ini, Sensei Nugget tidak akan jalan di production
- **Google OAuth**: perlu konfigurasi di Supabase Dashboard
  → Lihat `SETUP.md` §3
- **Minna no Nihongo lenses**: blocked, butuh PDF buku dari Nugget

---

## Roadmap — 6 Fase, Posisi Sekarang

Dari `docs/project/ROADMAP.md`. **Sekarang di antara Fase 1 dan Fase 2.**

### Fase 1 — Stabilisasi *(hampir selesai)*
Semua yang broken sudah di-fix di v15.11.x–v15.12.x. Yang tersisa:
- Wire up Kebun Mastery (draft ada, tinggal wire)
- Fix empty states di quiz modes
- Backend Supabase bugs (user_id selalu undefined — lihat §Backend)
- Verifikasi seluruh user flow end-to-end

### Fase 2 — Konten Lengkap *(mulai setelah Fase 1 done)*
Dari ROADMAP.md, ini mencakup:
- Grammar N2 dan N1 diperkaya (target 200 dan 250 entries)
- Vocab N3 diperluas (target minimal 300, idealnya 3,750)
- Book index Minna no Nihongo (perlu PDF dari Nugget)
- Semua entry vocab N5/N4 punya contoh kalimat yang proper
- Conjugation engine: cover semua edge case, selfTest() 0 failures
- Irodori book lens: grammar_ids per unit (vocab_ids sudah ada)

### Fase 3 — Local Backup & Sync *(infrastruktur sudah ada, perlu di-fix)*
`backup-restore.js` dan `sync-hook.js` sudah ada. Masalah: 3 backend bugs di `supabase-client.js` yang bikin sync tidak jalan. Fix ini = Fase 3 selesai.

### Fase 4 — Personalisasi & Gamifikasi
- Learning path yang direkomendasikan per level + tujuan user
- Adaptive SRS yang lebih personal (skeleton di gamification.js sudah ada)
- Achievement yang meaningful (minimal 10 yang benar-benar tercapai)
- Profil lokal dengan username dan avatar

### Fase 5 — Polish & Identitas *(bisa paralel)*
- Desktop layout — sekarang pure mobile, ada "ocean of void" di desktop
- Onboarding yang proper untuk first-time user
- Feedback button ke developer
- Nugget-san mascot
- About/Attribution page (JMdict attribution wajib ada)

### Fase 6 — Ekspansi Konten *(ongoing, tidak ada definisi selesai)*
- Modul Pemula Absolut (mulai dari hiragana)
- Modul SSW (Specified Skilled Worker) — sangat relevan untuk target user
- Buku tambahan: Genki, Tobira, Shin Kanzen Master
- Kanji DB (future — schema sudah anticipate dengan `kj-{level}-{5digit}`)

---

## Backend — Apa yang Perlu Di-fix

Ada 3 critical bugs di `public/js/supabase-client.js` yang sudah ditandai `// ⚠️ BACKEND BUG`. Fix ini setelah frontend Fase 1 selesai.

### Bug 1: `sb.auth.getUser()` dipanggil synchronously (6 tempat)
`getUser()` returns Promise, tapi dipanggil tanpa `await`. Result: `user_id` selalu `undefined`, semua Supabase writes gagal silent.

```js
// Fix template:
upsertCard: async function (card) {
  const { data } = await sb.auth.getUser();
  const userId = data?.user?.id;
  if (!userId) return Promise.reject('Not authenticated');
  return sb.from('srs_cards').upsert({ user_id: userId, ...card });
}
```

### Bug 2: `bulkSync()` shape mismatch
`_syncProgress()` passes `nn_fsrs_cards` sebagai plain object `{id: entry}`.
`bulkSync` calls `.map()` → `TypeError: cards.map is not a function`.

```js
// Fix: convert object to array dulu
const rows = Object.entries(cards).map(([id, entry]) => ({
  user_id: userId,
  item_type: entry.source || (id.startsWith('vg-') ? 'vocab' : 'grammar'),
  item_id: id,
  stability: entry.card?.stability || 0,
  // ... semua field lainnya
}));
```

### Bug 3: `sbClient.supabaseKey` tidak ada di Supabase v2
`ai-proxy.js` line 208: `window.sbClient.supabaseKey || ''` — property ini tidak di-expose.
Fix: export konstanta langsung dari `supabase-client.js` IIFE:
```js
window._SUPABASE_URL      = 'https://oxeuwkpgrtojjzhcboqz.supabase.co';
window._SUPABASE_ANON_KEY = 'eyJhbGci...'; // anon key sudah ada di file
```

### Supabase best practices
Ada 30+ referensi di `docs/supabase/references/`. Baca sebelum modifikasi schema, terutama:
- `security-rls-basics.md` dan `security-rls-performance.md` — RLS policy yang benar
- `data-upsert.md` — cara upsert yang optimal
- `query-missing-indexes.md` — kalau query lambat

---

## Konvensi Koding yang Wajib

### IDs — Canonical format
```
Grammar: gn{level}-{5digit}    contoh: gn3-00001
Vocab:   vg-{level}-{5digit}   contoh: vg-n5-00001
```
**5-digit selalu.** Ini locked decision.

### FSRS data — Jangan salah akses
```js
// ❌ SALAH (SM-2 era — field ini tidak ada di FSRS):
srsData[id].reps
srsData[id].interval
srsData[id].due          // dulu integer epoch, sekarang tidak ada

// ✅ BENAR (FSRS sekarang — semua nested di .card):
srsData[id].card.reps
srsData[id].card.scheduled_days   // bukan .interval
new Date(srsData[id].card.due)    // ISO string, bukan integer
srsData[id].card.state            // 0=New, 1=Learning, 2=Review, 3=Relearning
srsData[id].card.stability
srsData[id].card.lapses
srsData[id].source                // 'grammar' | 'vocab'
```

### Event handling di mobile — WAJIB
```js
// ❌ JANGAN:
// - inline onclick= di dalam string template yang di-inject ke DOM
// - touchstart/touchend (block scroll, triple-fire dengan click)
// - mousedown/mouseup untuk touch interaction

// ✅ GUNAKAN:
// - addEventListener('click') untuk semua button action
// - pointerdown/pointerup untuk hold detection (lihat browse.js peel card)
// - touch-action: manipulation di CSS untuk semua interactive elements
// - user-select: none di CSS untuk element yang ada hold gesture
```

### Versi bump — Wajib setiap commit yang user-facing
```
1. public/js/core/version.js → window.APP_VERSION = 'vX.X.X'
2. public/sw.js → const CACHE = 'nihongo-vX.X.X'
Format: v{major}.{minor}.{patch} — lanjut dari versi terakhir (sekarang v15.12.3+)
```

### SW ASSETS — File baru wajib masuk
Setiap file JS baru ditambahkan ke `ASSETS` array di `sw.js`.

### Grammar `cat` values — 34 nilai canonical
Lihat `_schema.md` §3.2 untuk daftar lengkap. Jangan pakai nilai Bahasa Indonesia lama.

### Content generation — JANGAN di Claude Code
Generate grammar/vocab entries dilakukan di **claude.ai chat**, bukan di Claude Code session. Claude Code timeout untuk task yang panjang. Content generation = claude.ai.

---

## Tests

```bash
node tests/run.js
# Target: 10,550+ PASS, 0 FAIL
# Jalankan sebelum push ke main
```
Test mencakup: data schema, ID format, cat values, version consistency, persona drift, conjugation engine.

---

## Branching Rules

```
main                ← production. Push ke sini = live di pages.dev (~60 detik)
develop             ← branch kerja utama
corpus/v17-pass15   ← research reference. JANGAN DITOUCH, JANGAN MERGE
```

---

## Hal yang Tidak Boleh Dilakukan

```
❌ Push langsung ke main tanpa test
❌ Merge corpus/v17-pass15 ke branch manapun
❌ Generate konten (grammar, vocab) di Claude Code
❌ Introduce framework (React, Vue, dll) tanpa diskusi panjang
❌ Ubah FSRS engine implementation
❌ Delete atau ubah localStorage key yang sudah ada
❌ Ubah grammar ID format yang sudah ada di data files
❌ Console.log di production code (pakai console.warn untuk non-fatal)
❌ Push fitur setengah jadi ke main
❌ Assume requirement tanpa konfirmasi kalau ada yang ambigu
```

---

## Quick Reference — Kalau Bingung

```
Baru join sesi:
  cat CLAUDE.md && cat CHANGELOG.md && git log --oneline -10

Ada bug report:
  Reproduce di browser dulu, baru fix

Mau touch data files:
  Baca _schema.md dulu, pastikan ID 5-digit dan cat values canonical

App tidak jalan offline:
  Cek sw.js ASSETS — file baru belum di-cache = 404 offline

Supabase tidak sync:
  Cek async getUser bug di supabase-client.js

Node tests fail:
  node tests/run.js → baca error (biasanya ID format atau version mismatch)

Tidak yakin tentang UI/UX:
  Baca FRONTEND-OVERHAUL-PLAN.md (spec detail UI ada di sana)
  Baca DESIGN_SYSTEM.md untuk prinsip visual
```

---

## Satu Hal yang Paling Penting

> **Ini proyek Nugget. Bukan proyek Claude.**

Kamu build apa yang dia minta. Kamu suggest apa yang kamu lihat perlu. Kamu kasih tahu kalau ada risiko teknis. Tapi keputusan akhir selalu ada di tangannya.

Project ini lahir dari satu visi sederhana: *"belajar bahasa Jepang seharusnya tidak mahal, tidak overwhelming, dan bisa dilakukan siapapun."* Dan dia bangun itu dari HTML sederhana menjadi platform dengan 736 kutipan riset, FSRS engine, dan konten ribuan entry.

Itu bukan hal kecil. Jaga itu.

---

*Living document. Update setiap ada keputusan arsitektur baru.*
*Last updated: v15.12.3 · 19 April 2026 · Crunchy QA*
