# 🍙 AGENT HANDOFF — Nugget Nihongo
**Senior Frontend Engineer + Backend Engineer**
**Pick up from v15.12.3 — complete, test, fix**

---

## 0. SIAPA KAMU & MISI

Kamu adalah senior full-stack engineer yang di-assign ke project **Nugget Nihongo** — aplikasi belajar bahasa Jepang (PWA) untuk pelajar Indonesia, target JLPT N5→N1. Stack: **Vanilla JS, CSS custom tokens, Cloudflare Pages + Workers, Supabase**.

Tugas kamu:
1. **Clone repo, baca semua kode, audit menyeluruh**
2. **Fix semua bug dan gap yang kamu temukan**
3. **Wire up fitur yang sudah draft tapi belum aktif**
4. **Implement fitur yang jelas kurang tapi belum ada**
5. **Backend fixes** (setelah frontend selesai)

**Prioritas: Frontend dulu. Backend belakangan.**

---

## 1. AKSES

```
Repo:    https://github.com/nuggetenak/nugget-nihongo
Token:   ghp_REDACTED_ASK_NUGGET
Live:    https://nugget-nihongo.pages.dev
Branch:  develop → main (Cloudflare auto-deploy dari main)
```

**Clone:**
```bash
git clone https://ghp_REDACTED_ASK_NUGGET@github.com/nuggetenak/nugget-nihongo.git
cd nugget-nihongo
git checkout develop
```

**Workflow commit:**
```bash
git add -A && git commit -m "feat/fix: description vX.X.X"
git push origin develop
git checkout main && git merge develop --no-ff -m "release: vX.X.X"
git push origin main   # triggers Cloudflare deploy (~60 detik)
git checkout develop
```

---

## 2. KONTEKS PROYEK

### App overview
- **PWA offline-first** — Service Worker cache-first strategy
- **Target user:** Pelajar Indonesia yang belajar Jepang (level N5→N1), banyak untuk keperluan kerja SSW/TKI
- **5 tab utama:** Materi (Browse) · Latihan (Quiz) · Sensei (AI Tutor) · Progress (Analytics) · Lainnya (Settings)
- **SRS:** FSRS (ts-fsrs via CDN), data di localStorage + IndexedDB, sync ke Supabase saat online

### Tech stack detail
```
Frontend:  Vanilla JS (no framework), CSS custom properties (dark amber theme)
Data:      window.grammarDB, window.vocabDB — loaded via <script> tags
SRS:       window.srsData = { [id]: { card: FSRSCard, history: [], source: 'grammar'|'vocab' } }
           KRITIS: FSRS data NESTED — field ada di .card.xxx bukan langsung di root
Auth:      Supabase email + Google OAuth
Hosting:   Cloudflare Pages (main branch)
AI:        Cloudflare Workers proxy → Anthropic API (Sensei Nugget chat)
```

### Versi saat ini: **v15.12.3**
CHANGELOG lengkap ada di `CHANGELOG.md` di root repo.

---

## 3. APA YANG SUDAH SELESAI (JANGAN REDO)

Audit menyeluruh sudah dilakukan di v15.11.x–v15.12.x. **28 bug sudah di-fix.** Highlights:

### Peel cards (Browse tab)
- Tap Peek = reveal permanen, hold Peek = peek sementara (via pointer events)
- Accordion: max 1 kartu terbuka sekaligus
- ☆ bookmark + ⋯ detail: sudah pakai `addEventListener` (bukan `onclick` attr)
- **Detail modal CSS sudah ada** (§31 di app.css) — modal muncul dengan benar

### SRS / FSRS
- `updateProgressPanel` sudah baca `c.card.reps`, `c.card.scheduled_days`, `c.card.due` (ISO string) — bukan SM-2 fields lagi
- `srsDueToday` sudah benar
- `recordQuizStat(mode, correct, total)` — semua 9 quiz mode sudah memanggil ini

### Analytics (Progress tab)
- Streak stat sudah baca `streakData.current` (bukan `.count`)
- `_renderWeakPoints` tidak duplikat lagi
- "Perlu Perhatian" section: 1 tombol "Latihan N pola lemah", tiap baris ada state label

### Lainnya
- Theme key unified: `bunpou-theme` (bukan `nn_theme`)
- `loadTheme()` null-guarded, auto-migrate legacy key
- `showStreakBroken()` wired ke gamification.js
- SW cache: semua page JS + fallback JSONs di-cache
- URL hash routing: refresh halaman = stay di tab yang sama

---

## 4. YANG SUDAH DRAFT TAPI BELUM AKTIF — WIRE UP DULU

### 4A. Kebun Mastery (Priority: HIGH)
Draft selesai, belum di-wire ke app.

**File yang sudah ada:**
- `public/js/kebun-mastery.js` — logic lengkap
- `docs/kebun-mastery/kebun-snippet.html` — HTML yang harus di-paste ke statsPage
- `docs/kebun-mastery/kebun-styles.css` — CSS yang harus di-append ke app.css

**Checklist wire-up** (ada juga di `docs/kebun-mastery/README.md`):
```
[ ] Tambah <script src="./js/kebun-mastery.js"></script> di index.html (setelah detail.js)
[ ] Tambah './js/kebun-mastery.js' ke SW ASSETS di sw.js
[ ] Paste kebun-snippet.html ke dalam #statsPage (sebelum #weakPointsSection)
[ ] Append kebun-styles.css ke app.css (§32)
[ ] Panggil window.initKebunMastery() dari _analyticsOnTabShow di analytics.js
[ ] Test: empty state, tap plant → openDetail, filter N-level, toggle Grammar/Vocab
```

**Konsep visual:** Grid tanaman SVG — tiap tanaman = 1 grammar/vocab card, state = FSRS state:
- 🌱 unseen, 🌿 learning, 🌻 young, 🌳 mature, 🥀 lapsing

---

## 5. GAP FRONTEND YANG HARUS DIISI

Ini adalah fitur/UX yang jelas kurang berdasarkan analisis codebase. Implement semuanya:

### 5A. Quiz modes — "fill-coming-soon" masih ada di 7 tempat
Saat level tertentu dipilih dan tidak ada soal, 7 quiz mode menampilkan `<div class="fill-coming-soon">` kosong. User lihat layar blank.

**File yang affected:**
- `public/js/fillin.js` (2x) — Fill In mode
- `public/js/conjugation.js` — Konjugasi mode
- `public/js/translation.js` — Terjemahan mode
- `public/js/errorfind.js` — Cari Kesalahan mode
- `public/js/multichoice.js` — Pilihan Ganda mode
- `public/js/quiz-vocab.js` — Vocab flash mode

**Yang perlu dibuat:** Proper empty state UI dengan pesan yang helpful + tombol untuk pilih level lain atau mulai dengan kartu yang ada. Jangan biarkan layar blank.

### 5B. Book browse chapter pills — navigasi antar chapter
Sudah di-implement di `materi-hub.js` tapi perlu diverifikasi:
- Saat user masuk ke book chapter, N-level pills harusnya hilang → chapter pill strip muncul (M1·H1, M1·H2, L1, L2, dll)
- Test dengan Sou Matome N4, Irodori A1, A2-1, A2-2
- Cek CSS `.book-chapter-pills` sudah ada di app.css

### 5C. Minna no Nihongo — lens data missing
Di `SERIES` registry di materi-hub.js:
```js
{ id: 'minna-1', lensVar: null, available: false, comingSoon: true }
{ id: 'minna-2', lensVar: null, available: false, comingSoon: true }
```
File `book-minna-1.js` dan `book-minna-2.js` ada di disk tapi belum punya lens data.
**Buat grammar lens untuk Minna no Nihongo 1 & 2** dengan format sama seperti lens Irodori/Sou Matome yang sudah ada. Set `available: true` setelah lens selesai.

### 5D. Progress tab — section "Penguasaan JLPT" selalu kosong
`_renderSummaryCards()` di analytics.js membaca `statStreakVal` dan `statXpVal` dari HTML — cek apakah elemen-elemen ini exist di `#statsPage` HTML. Jika tidak, tambahkan.

### 5E. Quiz result screen — SRS hint logic
Di `quiz.js` `showResult()`, hint "kartu berikutnya X hari lagi" sudah diperbaiki tapi:
- Test apakah benar-benar muncul setelah quiz selesai
- Verifikasi `srsDueToday()` returns data yang benar

### 5F. Settings page — beberapa bind tidak berfungsi
Di `pages/settings.js`, cek:
- `_bindCardTarget()` — dropdown target kartu harian (apakah tersimpan dan terbaca oleh quiz?)
- `_bindResetConvo()` — reset riwayat Sensei (apakah benar-benar clear sessionStorage?)
- `_bindClearData()` — hapus semua data lokal (apakah konfirmasi dialog muncul dan berfungsi?)

### 5G. Global search (🔍 di header)
`global-search.js` ada tapi perlu diverifikasi:
- Apakah search bar di header berfungsi?
- Apakah hasil search bisa di-tap untuk membuka detail?
- Apakah mencakup grammar + vocab?

### 5H. Onboarding — level selection tersimpan
`pages/onboarding.js` menyimpan `nn_starting_level` ke localStorage. Cek apakah ini **dibaca** oleh browse.js atau quiz.js untuk pre-select level yang sesuai. Kalau tidak dibaca = data mubazir.

### 5I. Daily word di welcome banner
`daily-word.js` ada (`window.initDailyWord()`). Cek apakah welcome banner menampilkan kata harian dengan benar. Kalau belum, wire up.

### 5J. Swipe gesture di quiz
`swipe.js` sudah ada untuk quiz card swipe. Verifikasi:
- Swipe kanan = Hafal, swipe kiri = Lupa — apakah benar dan konsisten?
- Apakah swipe juga trigger `saveProgress()` dan `markStudyActivity()`?

---

## 6. POLA KODING YANG WAJIB DIIKUTI

### FSRS data structure — KRITIS
```js
// SALAH (SM-2 lama):
srs[id].reps         // undefined
srs[id].interval     // undefined
srs[id].due          // undefined (atau integer epoch)

// BENAR (FSRS sekarang):
srs[id].card.reps           // number
srs[id].card.scheduled_days // number (interval)
new Date(srs[id].card.due)  // ISO string → Date
srs[id].card.state          // 0=New, 1=Learning, 2=Review, 3=Relearning
srs[id].card.stability      // float
srs[id].card.lapses         // number
srs[id].history             // array
srs[id].source              // 'grammar' | 'vocab'
```

### Event handling di mobile
```js
// JANGAN pakai inline onclick= di dalam innerHTML yang di-generate
// JANGAN pakai touchstart/touchend (block scroll, triple-fire dengan click)
// PAKAI addEventListener('click') + addEventListener('pointerdown/up') untuk hold
// TAMBAH touch-action: manipulation di CSS untuk semua interactive elements
```

### Namespace — semua public functions harus window.*
```js
// Semua function yang dipanggil dari HTML atau file lain:
window.myFunction = function() { ... };
// Bukan: function myFunction() { ... } kecuali kalau di non-IIFE file
```

### CSS variables yang tersedia
```css
/* Levels */
--n5: #C084FC; --n5-dim; --n5-border;
--n4: #FB923C; --n4-dim; --n4-border;
--n3: #38BDF8; --n3-dim; --n3-border;
--n2: #4ADE80; --n2-dim; --n2-border;
--n1: #FBBF24; --n1-dim; --n1-border;

/* Surfaces */
--surface; --surface-2; --surface-3; --surface-4;
--border; --border-2; --border-strong;

/* Text */
--text; --text-bright; --muted; --muted-2;

/* Accent (amber) */
--accent: #F59E0B; --accent-hot: #FBBF24; --gold: #FBBF24;

/* Typography */
--font-jp; --font-mono; --font-ui;
--text-xs: 0.68rem; --text-sm: 0.78rem; --text-base: 0.875rem;
--text-md: 0.95rem; --text-lg: 1.1rem;

/* Shadows */
--shadow-card; --shadow-md; --shadow-lg;
```

### Version bump wajib
Setiap commit yang berdampak ke user, bump versi di:
1. `public/js/core/version.js` → `window.APP_VERSION = 'vX.X.X'`
2. `public/sw.js` → `const CACHE = 'nihongo-vX.X.X'`

Format versi: `v{major}.{minor}.{patch}` — lanjut dari v15.12.3

### SW ASSETS — file baru wajib masuk
Setiap file JS baru yang dibuat, tambahkan ke `ASSETS` array di `public/sw.js` agar tersedia offline.

---

## 7. BACKEND FIXES (Kerjakan setelah frontend selesai)

Ada **3 critical bugs** di `public/js/supabase-client.js` yang menyebabkan semua Supabase writes gagal silently. Marker sudah ada sebagai komentar `// ⚠️ BACKEND BUG` di file tersebut.

### Bug 1: `sb.auth.getUser()` dipanggil synchronously
`getUser()` adalah async function (returns Promise), tapi dipanggil tanpa `await` di 6 tempat:
- `upsertCard()` line ~88
- `logReview()` line ~106
- `bulkSync()` line ~116
- `sbProgress.upsert()` line ~156
- `sbErrors.report()` line ~168
- `sbProfile.update()` line ~132

**Akibat:** `user_id` selalu `undefined` → Supabase RLS block semua writes → TIDAK ADA data yang tersimpan ke cloud.

**Fix:** Ubah semua fungsi ini jadi `async` dan tambah `await`:
```js
// SEBELUM (salah):
upsertCard: function (card) {
  return sb.from('srs_cards').upsert({
    user_id: (sb.auth.getUser()).data?.user?.id,  // undefined!
    ...
  });
}

// SETELAH (benar):
upsertCard: async function (card) {
  const { data } = await sb.auth.getUser();
  const userId = data?.user?.id;
  if (!userId) return Promise.reject('Not authenticated');
  return sb.from('srs_cards').upsert({ user_id: userId, ... });
}
```

### Bug 2: `bulkSync()` shape mismatch
`_syncProgress()` memanggil `sbSRS.bulkSync(cards)` dimana `cards` = object `{id: {card, history, source}}`.
`bulkSync` memanggil `cards.map(...)` → `TypeError: cards.map is not a function`.

**Fix:**
```js
bulkSync: async function (cards) {
  const { data } = await sb.auth.getUser();
  const userId = data?.user?.id;
  if (!userId) return Promise.reject('Not authenticated');

  // cards adalah object {id: entry}, bukan array
  const rows = Object.entries(cards).map(([id, entry]) => ({
    user_id:        userId,
    item_type:      entry.source || (id.startsWith('vg-') ? 'vocab' : 'grammar'),
    item_id:        id,
    stability:      entry.card?.stability      || 0,
    difficulty:     entry.card?.difficulty     || 0,
    elapsed_days:   entry.card?.elapsed_days   || 0,
    scheduled_days: entry.card?.scheduled_days || 0,
    reps:           entry.card?.reps           || 0,
    lapses:         entry.card?.lapses         || 0,
    state:          entry.card?.state          || 0,
    due:            entry.card?.due            || new Date().toISOString(),
    last_review:    entry.card?.last_review    || new Date().toISOString(),
  }));

  return sb.from('srs_cards').upsert(rows, { onConflict: 'user_id,item_type,item_id' });
}
```

### Bug 3: `sbClient.supabaseKey` tidak ada di Supabase v2
`ai-proxy.js` mencoba: `window.sbClient.supabaseKey || ''`
Property ini tidak di-expose oleh Supabase JS v2 client. Akibatnya `_SUPABASE_ANON_KEY` selalu `''`.

**Fix:** Export konstanta dari `supabase-client.js` IIFE:
```js
// Di supabase-client.js, setelah IIFE:
window._SUPABASE_URL      = 'https://oxeuwkpgrtojjzhcboqz.supabase.co';
window._SUPABASE_ANON_KEY = 'eyJhbGci...'; // anon key yang sudah ada di file
```

### Backend lain yang perlu diperhatikan:
- **`sync-hook.js`** — flush loop sudah ada tapi perlu diverifikasi berfungsi: apakah `getPendingSync()` → push batch → `clearSynced()` jalan saat online event?
- **Supabase table schema** — verifikasi `srs_cards` table punya semua kolom: `user_id, item_type, item_id, stability, difficulty, elapsed_days, scheduled_days, reps, lapses, state, due, last_review`
- **RLS policies** — pastikan ada policy yang memungkinkan user upsert row dimana `user_id = auth.uid()`

---

## 8. STRUKTUR FILE PENTING

```
public/
├── index.html                    — semua HTML, 5 pages, 1700+ baris
├── sw.js                         — Service Worker, ASSETS list
├── manifest.webmanifest
├── styles/
│   └── app.css                   — 5000+ baris, §1–§31
├── js/
│   ├── core/
│   │   ├── router.js             — switchTab + hash routing
│   │   ├── state.js              — localStorage keys, saveProgress, toggleBookmark
│   │   ├── theme.js              — loadTheme, toggleTheme
│   │   ├── version.js            — APP_VERSION
│   │   └── install.js            — PWA install prompt
│   ├── pages/
│   │   ├── materi-hub.js         — Hub, Jalur JLPT, Jalur Buku, chapter browse
│   │   ├── settings.js           — Settings + Lainnya sheet
│   │   ├── onboarding.js         — First-run onboarding flow
│   │   └── about.js              — About page
│   ├── fsrs-engine.js            — FSRS SRS engine, srsData, srsDueToday
│   ├── gamification.js           — XP, streak, achievements, heatmap
│   ├── browse.js                 — Peel cards, filter, super-cats, progress panel
│   ├── browse-vocab.js           — Vocab browse tab
│   ├── analytics.js              — Progress tab rendering
│   ├── detail.js                 — Grammar detail modal
│   ├── vocab-detail.js           — Vocab detail modal
│   ├── quiz.js                   — Flip quiz (main mode)
│   ├── quiz-engine-v2.js         — Quiz question generator
│   ├── fillin.js                 — Fill-in + Rearrange quiz modes
│   ├── conjugation.js            — Konjugasi mode
│   ├── translation.js            — Terjemahan mode
│   ├── errorfind.js              — Cari kesalahan mode
│   ├── multichoice.js            — Pilihan ganda mode
│   ├── quiz-vocab.js             — Vocab quiz modes
│   ├── quiz-mixed.js             — Mixed grammar+vocab
│   ├── quiz-typetr.js            — Type translation mode
│   ├── ai-tutor.js               — Sensei Nugget chat
│   ├── supabase-client.js        — Auth + SRS sync (has ⚠️ BACKEND BUG markers)
│   ├── kebun-mastery.js          — DRAFT — belum di-wire!
│   └── ...
├── data/
│   ├── grammar/grammar-n1..n5.js — Grammar data (schema: id, pattern, level, cat, meaning, examples, nuance, connection, desc)
│   ├── vocab/vocab-n1..n5.js     — Vocab data
│   ├── books/                    — Book lens data (Irodori, Sou Matome, Minna)
│   └── fallback/                 — Offline AI fallback drills
└── docs/
    └── kebun-mastery/            — Kebun draft files
```

---

## 9. CARA KERJA DETAIL YANG PERLU DIKETAHUI

### Grammar data schema
```js
{
  id: 'gn4-00123',
  level: 'n4',
  pattern: '〜ために',      // nama pola
  grammar: '〜ために',      // alias (di-set oleh grammar-index.js shim)
  reading: '〜tame ni',
  meaning: 'Untuk (tujuan)',
  cat: 'tujuan',
  connection: 'V辞書形・Nの + ために',
  desc: 'Menyatakan tujuan dari suatu tindakan...',
  examples: [{ jp: '...', id: '...' }],
  nuance: 'Tips pemakaian opsional',
}
```

### SRS data structure (HARUS HAFAL)
```js
window.srsData = {
  'gn4-00123': {
    card: {
      due: '2026-04-25T00:00:00.000Z',  // ISO string!
      stability: 12.5,
      difficulty: 4.2,
      elapsed_days: 3,
      scheduled_days: 12,
      reps: 5,
      lapses: 1,
      state: 2,  // 0=New, 1=Learning, 2=Review, 3=Relearning
      last_review: '2026-04-13T00:00:00.000Z',
    },
    history: [{ date: '...', rating: 3 }, ...],
    source: 'grammar',
  }
}
```

### localStorage keys penting
```
nn_fsrs_cards        — srsData (serialized)
nn_fsrs_settings     — FSRS settings
nn_xp                — { xp: number, history: [] }
nn_streak            — { current, longest, freezes, comebacks, lastDate }
nn_achievements      — array of earned badge IDs
nn_heatmap           — { 'YYYY-MM-DD': { reviews, xp, challenge } }
nn_quiz_stats        — { flip: { correct, total }, fill: {...}, ... }
nn_bookmarks         — serialized Set
bunpou_progress      — { [cardId]: 'know'|'unsure'|'forgot' }
bunpou-theme         — 'dark' | 'light'
nn_accent            — 'amber' | 'sakura' | 'matcha' | 'indigo'
nn_last_activity     — { type: 'book'|'jlpt', seriesId?, level? }
nn_ai_worker_url     — custom Cloudflare Worker URL
nn_ai_quota          — { date, used }
```

---

## 10. TESTING CHECKLIST

Setelah setiap batch perubahan, test di mobile browser (atau Chrome DevTools mobile):

```
MATERI TAB:
[ ] Hub landing: 3 door tampil (JLPT, Buku, 語 Jelajah Bebas)
[ ] JLPT door: tap N-level → browse dengan kartu yang benar
[ ] Buku door: accordion expand/collapse, tap volume → chapter view
[ ] Chapter view: chapter pills muncul, tap pill → navigate ke chapter itu
[ ] Peel card: tap Peek = reveal permanen, hold Peek = peek sementara
[ ] ⋯ detail button: modal muncul dengan header, grammar, contoh kalimat
[ ] ☆ bookmark: toggle visual, tersimpan ke bookmarks
[ ] Filter: Semua/N5/N4/N3/N2/N1, kategori super-cat, search
[ ] Scroll: kartu tidak memblokir scroll
[ ] Continue card: muncul kalau ada riwayat, tap → navigasi ke posisi terakhir

LATIHAN TAB:
[ ] Semua 9 mode bisa dimulai (Flip, Fill-in, Konjugasi, Terjemahan, Cari Salah, Pilihan Ganda, Vocab Flash, Vocab MC, Mixed)
[ ] Empty state proper (bukan layar blank) kalau tidak ada soal
[ ] Quiz selesai → result screen dengan score, confetti kalau bagus
[ ] "Ulangi yang salah" berfungsi
[ ] Quick review dari kartu SRS due

SENSEI TAB:
[ ] Chat bisa dikirim, respons AI muncul
[ ] Mode: Jelaskan / Tantang Aku / Ngobrol Bebas bisa dipilih
[ ] Quota counter turun setiap pesan

PROGRESS TAB:
[ ] JLPT rings render (SVG lingkaran per level)
[ ] SRS health bars muncul
[ ] Heatmap 52 minggu render
[ ] Perlu Perhatian: muncul kalau ada kartu lemah, tombol "Latihan N pola lemah" berfungsi
[ ] Kebun Mastery: grid tanaman muncul, tap → detail
[ ] Streak angka benar

LAINNYA TAB:
[ ] Theme toggle berfungsi dan persist after refresh
[ ] Font size berfungsi
[ ] Backup export menghasilkan file JSON yang bisa di-import
[ ] Import restore data dengan benar
[ ] Versi app tampil dengan benar (bukan hardcoded)
[ ] Hapus data: konfirmasi muncul dan berfungsi

GENERAL:
[ ] Refresh → stay di tab yang sama (URL hash #browse/#quiz/etc)
[ ] Offline mode: app masih bisa dipakai (SW cache)
[ ] Install PWA: prompt muncul di browser yang support
[ ] Auth: login/logout berfungsi
[ ] Setelah login: sync progress ke Supabase (verifikasi di Supabase dashboard)
```

---

## 11. JANGAN LAKUKAN INI

- ❌ Jangan ubah `window.srsData` structure — banyak kode depends on ini
- ❌ Jangan replace SRS engine (FSRS) — migrasi sudah selesai
- ❌ Jangan hapus localStorage key yang sudah ada — backward compat
- ❌ Jangan pakai framework (React, Vue, dll) — proyek ini intentional vanilla JS
- ❌ Jangan pakai `touchstart`/`touchend` untuk interaction — selalu blocks scroll di mobile
- ❌ Jangan pakai inline `onclick=` di dalam string template yang di-inject ke DOM — gunakan `addEventListener`
- ❌ Jangan commit langsung ke `main` — selalu lewat `develop` dulu

---

## 12. NOTES PENTING LAINNYA

- **grammar-query.js sudah dihapus** — sudah diganti sepenuhnya oleh `grammar-index.js`
- **`window.grammarData` = alias dari `window.grammarDB`** — kedua-duanya valid, prefer `grammarDB`
- **`d.grammar` = alias dari `d.pattern`** — di-set oleh grammar-index.js shim, kedua-duanya work
- **Minna no Nihongo** lensVar masih `null` di SERIES registry — buku ini "coming soon"
- **N1/N2 grammar dan vocab** — data files ada tapi belum production-complete, sengaja tidak di-cache SW
- **`confusion-pairs.js`** — file ada, kosong, belum dipakai. Skip untuk sekarang.
- **AI Worker URL** — default ke `nugget-nihongo-ai.nugrohopangestu85.workers.dev/chat`. Kalau tidak ada, Sensei tab akan disable gracefully.
- **Supabase URL + anon key** ada hardcoded di `supabase-client.js` (lines 14-15). Biarkan.

---

## 13. QUICK START FLOW YANG DIREKOMENDASIKAN

1. Clone repo, `cat CHANGELOG.md` untuk orientasi cepat
2. Baca `public/index.html` untuk memahami HTML structure
3. Baca `public/js/core/state.js`, `fsrs-engine.js`, `analytics.js` — ini fondasi
4. **Wire up Kebun Mastery dulu** (§4A) — sudah tinggal paste + wire
5. Audit semua `fill-coming-soon` dan buat proper empty states (§5A)
6. Test semua 9 quiz modes end-to-end
7. Verifikasi Perlu Perhatian, Progress bars, Streak di analytics
8. Fix backend bugs di supabase-client.js (§7)
9. Test full user flow: login → belajar → quiz → lihat progress → logout → login lagi → verify sync

---

**Semangat! 🍙**
Tanya ke user (Crunchy/Nugget) kalau ada yang tidak jelas soal product direction atau design decisions.
