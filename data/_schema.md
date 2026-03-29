# Data Schemas — Nugget Nihongo
> Single source of truth untuk shape semua data grammar, bank soal, dan runtime.
> Dikelola oleh Agent 4 — Batter 🌾
> Versi schema ini: Arsitektur Dua Tier (Plan A, v15.0.0)

---

## ARSITEKTUR DUA TIER

```
Tier 1 — Grammar Global (N1–N5)
  Source: standar JLPT umum, independen dari buku manapun
  File  : grammar-n5.js … grammar-n1.js
  Sifat : single source of truth untuk grammar standar

Tier 2 — Grammar per Buku (verbatim → UI)
  Source: 100% verbatim dari buku masing-masing, kemudian diadaptasi ke UI
  File  : grammar-soumatome-n5.js … grammar-irodori-a2-2.js
  Sifat : berdiri sendiri per buku — tidak menunjuk ke Tier 1 grammar IDs
```

---

## Tier 1 — GrammarCard Global (grammar-n5.js … grammar-n1.js)

### ID Format

```
g{level}-{4digit}
Contoh : gn5-0001, gn4-0042, gn3-0128
level  : n5 | n4 | n3 | n2 | n1
4digit : zero-padded, 0001–9999 per level

IMMUTABLE setelah Plan B mulai dikerjakan.
Konsisten dengan vocab ID convention: vg-{level}-{4digit} (A2 Juicy)
```

### Schema

```js
{
  // ── IDENTITAS ──────────────────────────────────────────────────────────
  id         : 'gn3-0001',     // format: g{level}-{4digit}. IMMUTABLE setelah publish.
  level      : 'n3',           // 'n1' | 'n2' | 'n3' | 'n4' | 'n5'

  // ── POLA GRAMMAR ───────────────────────────────────────────────────────
  pattern    : '〜られている', // grammar pattern — tulis sesuai standar JLPT
  reading    : '〜rarete iru', // romaji dari pattern
  meaning    : 'sedang di-...',// makna dalam Bahasa Indonesia (singkat, 1 baris)

  // ── KLASIFIKASI ────────────────────────────────────────────────────────
  cat        : 'pasif',        // grammar category — lihat daftar nilai di bawah
  connection : 'V受身形＋ている', // bentuk konjugasi yang dipakai

  // ── PENJELASAN ─────────────────────────────────────────────────────────
  desc       : '',             // penjelasan pemakaian dalam Bahasa Indonesia
                               // boleh mengandung <b>, <strong> untuk emphasis
  nuance     : '',             // nuansa pemakaian — konteks / kapan dipakai

  // ── CONTOH KALIMAT ─────────────────────────────────────────────────────
  // Minimal 1, idealnya 2–3 contoh per entry.
  examples   : [
    {
      jp   : '彼はずっと見られている。', // Bahasa Jepang (boleh ada <b> untuk highlight)
      id   : 'Dia terus-terusan diperhatikan.',
      level: 'n3',                       // level kalimat (opsional, bisa beda dari level entry)
      tags : ['pasif','kasual'],          // tags konteks (opsional)
    }
  ],

  // ── RELASI ─────────────────────────────────────────────────────────────
  see_also_grammar : [],       // id GrammarCard lain yang terkait — boleh []
                               // referensikan id global g{level}-{4digit}
  see_also_vocab   : [],       // id VocabEntry terkait — boleh []
                               // referensikan id vocab vg-{level}-{4digit}

  // ── ADVANCED (OPSIONAL — terutama untuk N1/N2) ─────────────────────────
  register   : null,           // 'formal' | 'written' | 'spoken' | 'literary' | null
                               // null = netral / tidak register-specific
  exceptions : null,           // string | null — pengecualian/irregular yang perlu dicatat
  notes      : null,           // string | null — catatan tambahan untuk nuance tingkat lanjut
}
```

### Window Variables

```js
window.grammarN5   // grammar-n5.js   — Grammar JLPT N5 standar
window.grammarN4   // grammar-n4.js   — Grammar JLPT N4 standar
window.grammarN3   // grammar-n3.js   — Grammar JLPT N3 standar
window.grammarN2   // grammar-n2.js   — Grammar JLPT N2 standar (placeholder awal)
window.grammarN1   // grammar-n1.js   — Grammar JLPT N1 standar (placeholder awal)
```

### Cat (Grammar Category) Values

Daftar 82 nilai cat yang valid: lihat PATCH-NOTES TASK-GRM-6 (di-merge sebelum Plan A).
Field `cat` tetap dipertahankan dari schema lama — nilainya tidak berubah.

---

## Tier 2 — GrammarBookEntry (grammar-soumatome-n5.js … grammar-irodori-a2-2.js)

### ID Format

```
{book-abbrev}-{level-or-vol}-{seq3}
Contoh : sm-n5-001, mn-1-001, ir-a1-001
Sifat  : lokal per file — tidak masuk namespace global, tidak perlu unik lintas file

Book abbreviations:
  sm   = Sou Matome (soumatome)
  mn   = Minna no Nihongo
  ir   = Irodori

Level/vol:
  n5, n4, n3, n2, n1   untuk Sou Matome
  1, 2                  untuk Minna no Nihongo (nomor buku)
  a1, a2-1, a2-2        untuk Irodori (kode volume)

seq  : 3-digit zero-padded, 001–999 per file
```

### Schema

```js
{
  // ── IDENTITAS ──────────────────────────────────────────────────────────
  id         : 'sm-n5-001',    // ID lokal dalam file ini — format: {abbrev}-{level}-{seq3}

  // ── POLA GRAMMAR ───────────────────────────────────────────────────────
  pattern    : '〜ている',     // grammar pattern dari buku

  // ── VERBATIM SOURCE (IMMUTABLE setelah diisi) ──────────────────────────
  raw        : '',             // teks VERBATIM dari buku — word by word, line by line
                               // TIDAK boleh diedit setelah diisi
                               // ini adalah unit data source of truth per buku

  // ── VERSI UI (DIADAPTASI) ──────────────────────────────────────────────
  desc       : '',             // penjelasan diadaptasi ke UI dalam Bahasa Indonesia
                               // boleh beda dari raw — ini yang ditampilkan di app

  // ── CONTOH KALIMAT ─────────────────────────────────────────────────────
  // Minimal 1, idealnya 2–3. Ambil dari buku — boleh diadaptasi readability-nya.
  examples   : [
    {
      jp : '毎日練習している。',  // Bahasa Jepang
      id : 'Setiap hari berlatih.',
    }
  ],

  // ── METADATA BUKU (OPSIONAL) ───────────────────────────────────────────
  // Tidak diperlukan kalau sudah tersirat dari nama file dan posisi array.
  // Tambahkan hanya kalau ada informasi tambahan yang berguna.
  chapter    : null,           // number | null — bab/chapter asal dalam buku
  page       : null,           // number | null — halaman asal dalam buku (untuk verifikasi)
}
```

### Catatan Arsitektur Tier 2

- Grammar per buku **tidak menunjuk** ke grammar global (Tier 1) — berdiri sendiri
- `raw` adalah source of truth — harus diisi terlebih dahulu sebelum `desc` boleh diisi
- `desc` adalah adaptasi UI — boleh direvisi, raw tidak boleh
- Field `cat` tidak ada di Tier 2 — kategori grammar hanya di Tier 1 (standar)
- Tidak ada mekanisme sync antara Tier 2 dan Tier 1 — ini desain yang disengaja

### Window Variables (Tier 2)

```js
window.grammarSoumatomeN5    // grammar-soumatome-n5.js
window.grammarSoumatomeN4    // grammar-soumatome-n4.js
window.grammarSoumatomeN3    // grammar-soumatome-n3.js
window.grammarSoumatomeN2    // grammar-soumatome-n2.js
window.grammarSoumatomeN1    // grammar-soumatome-n1.js
window.grammarMinna1         // grammar-minna-1.js
window.grammarMinna2         // grammar-minna-2.js
window.grammarIrodoriA1      // grammar-irodori-a1.js
window.grammarIrodoriA2_1    // grammar-irodori-a2-1.js
window.grammarIrodoriA2_2    // grammar-irodori-a2-2.js
```

---

## BankSoalEntry — fill_in type (bank-soal.js, bank-soal-n4.js)

> Evaluasi Plan A: **Schema bank soal tidak berubah secara struktural.**
> Field `grammarId` dan `grammarIds` akan tetap ada — hanya nilai referensi ID-nya
> yang berubah ke format baru (`gn3-0001`, dst) saat bank soal di-redo total di Plan B.

```js
{
  id          : 'bs-n3-w1-01',  // ID lama — akan diganti format baru di Plan B
  level       : 'n3',           // 'n3' | 'n4'
  week        : 1,
  day?        : 1,              // opsional
  type        : 'fill_in',
  sentence    : '',             // kalimat Jepang dengan ▢ sebagai blank
  choices     : [],             // 4 pilihan jawaban
  answer      : 0,              // 0-based index jawaban benar
  grammarId   : 'gn3-0001',    // ← Plan B: referensikan ID format baru g{level}-{4digit}
  explanation : ''              // penjelasan Bahasa Indonesia
}
```

## BankSoalEntry — rearrange type (bank-soal.js)

```js
{
  id          : string,
  level       : string,
  week        : number,
  day?        : number,
  type        : 'rearrange',
  sentence    : string,         // kalimat dengan ★ di posisi kunci
  parts       : string[],       // 4 potongan kata (diacak)
  answer      : number[],       // urutan benar sebagai 0-based indices
  star_pos    : number,         // posisi ★ di answer[] — selalu 2
  grammarIds  : string[],       // ← Plan B: referensikan ID format baru g{level}-{4digit}
  explanation : string
}
```

> ⚠️ CATATAN PLAN B: `id` BankSoal juga akan di-reformat saat redo total.
> Format ID baru bank soal diputuskan oleh Crispy saat membuat Task Brief Plan B.

---

## VocabEntry

> Schema vocab (VocabEntry, POS List, Domain List, dll) ada di `data/_schema-vocab.md`
> Dikelola oleh Agent 2 — Juicy 💧.
>
> Cross-reference penting:
> · VocabEntry.related_grammar[] saat ini berisi ID lama (n3-w2-005).
>   Setelah Plan B, field ini harus referensikan ID baru g{level}-{4digit}.
>   → Perlu update _schema-vocab.md di Plan B (scope A2 Juicy).

---

## SRSCard (runtime — stored in localStorage 'bunpou_srs')

```js
{
  reps       : number,   // consecutive correct reviews
  interval   : number,   // days until next review
  ef         : number,   // ease factor (1.3–3.0, default 2.5)
  due        : number,   // days since epoch
  lastReview : number,   // days since epoch
  history    : [{ date: number, q: number }]  // last 20 reviews
}
```
quality mapping: know=4, unsure=2, forgot=0

---

## LevelMeta (data/index.js → window.levelMeta)

```js
{
  [level: string]: {
    label  : string,   // 'N3'
    name   : string,   // 'Menengah'
    total  : number,   // auto-calculated dari grammarData
    weeks  : [
      { w: number, theme: string, ready: boolean }
    ]
  }
}
```
> Domain A1 — Crispy. Batter tidak menyentuh file ini.

---

## FILE INDEX

### Grammar Global — Tier 1 (aktif setelah Plan B)

| File | Window Var | Status |
|------|-----------|--------|
| `grammar-n5.js` | `window.grammarN5` | 🆕 Akan dibuat di Plan B |
| `grammar-n4.js` | `window.grammarN4` | 🆕 Akan dibuat di Plan B |
| `grammar-n3.js` | `window.grammarN3` | 🆕 Akan dibuat di Plan B |
| `grammar-n2.js` | `window.grammarN2` | 🆕 Placeholder di Plan B |
| `grammar-n1.js` | `window.grammarN1` | 🆕 Placeholder di Plan B |

### Grammar per Buku — Tier 2 (aktif setelah Plan C)

| File | Window Var | Status |
|------|-----------|--------|
| `grammar-soumatome-n5.js` | `window.grammarSoumatomeN5` | 🆕 Akan dibuat di Plan C |
| `grammar-soumatome-n4.js` | `window.grammarSoumatomeN4` | 🆕 Akan dibuat di Plan C |
| `grammar-soumatome-n3.js` | `window.grammarSoumatomeN3` | 🆕 Akan dibuat di Plan C |
| `grammar-soumatome-n2.js` | `window.grammarSoumatomeN2` | 🆕 Akan dibuat di Plan C |
| `grammar-soumatome-n1.js` | `window.grammarSoumatomeN1` | 🆕 Akan dibuat di Plan C |
| `grammar-minna-1.js`      | `window.grammarMinna1`      | 🆕 Akan dibuat di Plan C |
| `grammar-minna-2.js`      | `window.grammarMinna2`      | 🆕 Akan dibuat di Plan C |
| `grammar-irodori-a1.js`   | `window.grammarIrodoriA1`   | 🆕 Akan dibuat di Plan C |
| `grammar-irodori-a2-1.js` | `window.grammarIrodoriA2_1` | 🆕 Akan dibuat di Plan C |
| `grammar-irodori-a2-2.js` | `window.grammarIrodoriA2_2` | 🆕 Akan dibuat di Plan C |

### File Lama — Akan Di-retire setelah Plan B

| File | Window Var | Status |
|------|-----------|--------|
| `n3-w1.js` | — | 🔒 RETIRED (Plan B) |
| `n3-w2.js` | — | 🔒 RETIRED (Plan B) |
| `n3-w3.js` | — | 🔒 RETIRED (Plan B) |
| `n3-w4.js` | — | 🔒 RETIRED (Plan B) |
| `n3-w5.js` | — | 🔒 RETIRED (Plan B) |
| `n3-w6.js` | — | 🔒 RETIRED (Plan B) |
| `n4-w1.js` | — | 🔒 RETIRED (Plan B) |
| `n4-w2.js` | — | 🔒 RETIRED (Plan B) |
| `n4-w3.js` | — | 🔒 RETIRED (Plan B) |
| `n4-w4.js` | — | 🔒 RETIRED (Plan B) |
| `n4-w5.js` | — | 🔒 RETIRED (Plan B) |
| `n4-w6.js` | — | 🔒 RETIRED (Plan B) |
| `bank-soal.js`     | — | 🔒 RETIRED (Plan B) — redo total |
| `bank-soal-n4.js`  | — | 🔒 RETIRED (Plan B) — redo total |
| `bank-soal-quiz4.js` | — | 🔒 RETIRED (Plan B) — redo total |
