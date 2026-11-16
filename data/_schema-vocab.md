# Vocab DB Schema — Nugget Nihongo
> Single source of truth untuk semua vocab entry N1–N5.
> Diupdate: RESTRUKTURISASI-A-JUICY (Plan A, 16 Maret 2026)
> Versi schema ini berlaku mulai v15.0.0 (setelah Plan A merge)
>
> ⚠️ ARSITEKTUR BARU — DUA TIER:
>   Tier 1 — VocabGlobal: entry kata independen dari buku manapun
>   Tier 2 — BookVocabLens: mapping chapter → vocab_ids (ada di book-*.js)
>
> ID BARU bersifat IMMUTABLE setelah Plan B merge — tidak boleh diubah.

---

## TIER 1 — VocabGlobal

Schema untuk semua vocab entry N1–N5 yang bersifat global dan independen.
File: `vocab-n5.js`, `vocab-n4.js`, `vocab-n3.js`, `vocab-n2.js`, `vocab-n1.js`

```js
{
  // ── IDENTITAS ──────────────────────────────────────────────────────────
  id          : 'vg-n3-0001',          // FORMAT BARU: vg-{level}-{4digit}
                                        // Prefix 'vg' = vocab global.
                                        // Contoh: vg-n5-0001, vg-n4-0042, vg-n3-0001
                                        // IMMUTABLE setelah Plan B merge.
                                        // 🚫 Jangan pakai format lama v-{level}-{4digit}
  word        : '諦める',              // kanji (display utama)
  reading     : 'あきらめる',          // hiragana reading
  romaji      : 'akirameru',           // romaji (untuk input/search)
  meaning_id  : 'menyerah, berhenti berusaha', // terjemahan Indonesia
  meaning_en  : 'to give up',          // terjemahan Inggris (opsional, untuk future)

  // ── KLASIFIKASI ────────────────────────────────────────────────────────
  jlpt        : 'n3',                  // 'n1'|'n2'|'n3'|'n4'|'n5'
  pos         : 'verb-ru',             // lihat POS LIST di bawah
  common      : true,                  // apakah termasuk kosakata umum/frekuensi tinggi

  // ── GRAMMAR LINK ───────────────────────────────────────────────────────
  // Referensi ke grammar global (grammar-n*.js), bukan grammar per buku.
  related_grammar : ['gn3-0005'],      // array cardId dari global grammarData
                                        // Format ID grammar global: gn{level}-{4digit}
                                        // Boleh [] jika tidak ada relasi grammar

  // ── KONTEKS & NUANSA ───────────────────────────────────────────────────
  formalitas  : 2,                     // 0=超カジュアル … 5=最高敬語 (sama dgn engine)
  domain      : ['emosi','keputusan'], // lihat DOMAIN LIST
  register    : 'neutral',            // 'formal'|'neutral'|'casual'|'written'|'spoken'
  lawan_bicara: ['teman','diri-sendiri'], // konteks bicara dengan siapa
  nuance      : 'Konotasi negatif — menyerah setelah berusaha keras.', // 1 kalimat

  // ── CONJUGATION HINT ───────────────────────────────────────────────────
  // Dipakai langsung oleh conjugation-engine.js — tidak perlu lookup manual.
  conj_type   : 'ichidan',            // 'godan'|'ichidan'|'suru'|'kuru'|'adj-i'|'adj-na'|null

  // ── CONTOH KALIMAT ─────────────────────────────────────────────────────
  // Min 2, idealnya 3-4. Tiap entry bisa dipakai sebagai soal quiz.
  // vocab_id di tiap example merujuk ke ID vocab global lain jika dipakai.
  examples    : [
    {
      jp   : '夢を諦めたくない。',
      id   : 'Aku tidak mau menyerah pada impianku.',
      level: 'n3',                    // level kalimat (bisa beda dari level vocab)
      tags : ['emosi','motivasi'],
    },
    {
      jp   : '彼女はやっと諦めた。',
      id   : 'Akhirnya dia menyerah.',
      level: 'n3',
      tags : ['emosi','kasual'],
    },
  ],

  // ── RELASI ANTAR VOCAB ─────────────────────────────────────────────────
  // Semua referensi menggunakan ID vocab global (vg-{level}-{4digit}).
  synonyms    : ['vg-n3-0088'],        // id vocab lain — boleh []
  antonyms    : ['vg-n3-0041'],        // id vocab lain — boleh []
  see_also    : [],                    // vocab terkait tapi bukan syn/ant — boleh []

  // ── METADATA ───────────────────────────────────────────────────────────
  added_v     : 'v15',                 // versi project saat entry ditambahkan
                                        // Entry lama hasil migrasi Plan B: tulis 'v15-migrated'

  // ── FIELD DEPRECATED (Plan A) ──────────────────────────────────────────
  // Field di bawah ini ADA di schema lama dan di file vocab-n*-*.js yang masih aktif.
  // Setelah Plan B merge, field ini DIHAPUS dari semua entry global.
  // Jangan tambahkan ke entry baru.
  //
  // source_tags  : DEPRECATED — tag sumber buku (misal 'week1','day1').
  //                Informasi ini sekarang ada di BookVocabLens (book-*.js).
  //                Jangan pakai di VocabGlobal.
  //
  // sources      : DEPRECATED — array { book, chapter } dari buku asal.
  //                Informasi ini sekarang ada di BookVocabLens (book-*.js).
  //                Jangan pakai di VocabGlobal.
}
```

### Catatan Migrasi (Plan B)
- Entry yang dimigrasikan dari vocab-n5-core.js / vocab-n5-soumatome.js / vocab-n4-*.js
  akan mendapatkan ID baru format `vg-{level}-{4digit}`.
- ID lama (`v-n5-xxxx`, `v-n4-xxxx`) di-retire bersama file lamanya.
- Field `source_tags` dan `sources` dihapus dari semua entry saat migrasi.
- Cross-reference `synonyms`, `antonyms`, `see_also`, `related_grammar` wajib diupdate
  ke ID format baru setelah migrasi selesai.

---

## TIER 2 — BookVocabLens

Schema untuk file book vocab lens. File berisi mapping chapter → vocab_ids.
**Tidak ada vocab data di sini** — semua data vocab ada di Tier 1 (VocabGlobal).
File: `book-soumatome-n5.js`, `book-minna-1.js`, `book-irodori-a1.js`, dll.

```js
// Contoh: book-minna-1.js
// window.bookMinna1 = [...]

[
  {
    chapter  : 1,                      // nomor chapter/unit sesuai buku (integer)
    title    : 'はじめまして',          // judul chapter dari buku (boleh string kosong '')
    vocab_ids: [                        // array ID vocab global dari Tier 1
      'vg-n5-0001',
      'vg-n5-0042',
      'vg-n4-0011',
    ],
  },
  {
    chapter  : 2,
    title    : 'これはなんですか',
    vocab_ids: [
      'vg-n5-0003',
      'vg-n5-0008',
    ],
  },
  // ... dst
]
```

### Aturan BookVocabLens
- Satu file per buku per level (atau per volume untuk buku multi-volume).
- `vocab_ids` HANYA boleh berisi ID yang sudah ada di VocabGlobal (Tier 1).
- Kalau vocab dari buku belum ada di global → tambahkan ke global dulu (Plan B),
  baru daftarkan ID-nya di lens ini.
- Tidak ada field vocab (word, reading, meaning, dll) di sini — pure referensi ID.
- `chapter` adalah integer (bukan string) — urut sesuai buku.
- `title` boleh string kosong `''` jika buku tidak punya judul per chapter.

---

## POS List (part of speech)

| pos | Keterangan | conj_type |
|---|---|---|
| `verb-ru` | Ichidan verb (一段動詞) | `ichidan` |
| `verb-u` | Godan verb (五段動詞) | `godan` |
| `verb-suru` | Suru compound (〜する) | `suru` |
| `verb-kuru` | Kuru (来る) | `kuru` |
| `verb-irr` | Irregular lain | `godan` or custom |
| `i-adj` | い形容詞 | `adj-i` |
| `na-adj` | な形容詞 | `adj-na` |
| `noun` | 名詞 (umum) | `null` |
| `noun-suru` | 名詞 yang bisa +する | `suru` |
| `adverb` | 副詞 | `null` |
| `conj` | 接続詞 (conjunction) | `null` |
| `particle` | 助詞 (particle) | `null` |
| `expr` | Expression / set phrase | `null` |
| `counter` | 助数詞 (counter) | `null` |

**POS lama yang TIDAK VALID (jangan dipakai):**
`adj-i`, `adj-na`, `adv`, `exp`, `prt`, `verb` (tanpa suffix)

---

## Domain List (tags konteks)

```
// Situasi / topik
'kerja'         // kantor, bisnis, profesi
'sekolah'       // pendidikan, belajar
'keluarga'      // hubungan keluarga
'perjalanan'    // transportasi, tempat
'belanja'       // transaksi, toko
'kesehatan'     // sakit, rumah sakit
'makanan'       // makan, masak, restoran
'teknologi'     // gadget, internet
'alam'          // cuaca, lingkungan
'olahraga'      // aktivitas fisik

// Nuansa / emosi
'emosi'         // perasaan subjektif
'keputusan'     // memilih, menetapkan
'motivasi'      // semangat, dorongan
'hubungan'      // interpersonal
'sopan-santun'  // etika sosial

// Register / gaya
'formal'        // surat, pidato, dokumen
'kasual'        // percakapan sehari-hari
'tertulis'      // buku, artikel
'lisan'         // spoken only
'slang'         // ekspresi sangat kasual
'keigo'         // ungkapan hormat
```

---

## Window Variable Naming Convention

### Vocab Global (Tier 1)
| File | Window Variable |
|------|----------------|
| `vocab-n5.js` | `window.vocabN5` |
| `vocab-n4.js` | `window.vocabN4` |
| `vocab-n3.js` | `window.vocabN3` |
| `vocab-n2.js` | `window.vocabN2` |
| `vocab-n1.js` | `window.vocabN1` |

### Book Vocab Lens (Tier 2)
| File | Window Variable |
|------|----------------|
| `book-soumatome-n5.js` | `window.bookSoumatomeN5` |
| `book-soumatome-n4.js` | `window.bookSoumatomeN4` |
| `book-soumatome-n3.js` | `window.bookSoumatomeN3` |
| `book-soumatome-n2.js` | `window.bookSoumatomeN2` |
| `book-soumatome-n1.js` | `window.bookSoumatomeN1` |
| `book-minna-1.js` | `window.bookMinna1` |
| `book-minna-2.js` | `window.bookMinna2` |
| `book-irodori-a1.js` | `window.bookIrodoriA1` |
| `book-irodori-a2-1.js` | `window.bookIrodoriA2_1` |
| `book-irodori-a2-2.js` | `window.bookIrodoriA2_2` |

---

## File Index

### Tier 1 — Vocab Global

```
── VOCAB GLOBAL (active setelah Plan B) ──────────────────────────────────────
data/
  vocab-n5.js   ← ~800 entries N5 (hasil merge Plan B)  window.vocabN5   🔒 Plan B
  vocab-n4.js   ← ~1.500 entries N4 (hasil merge Plan B) window.vocabN4  🔒 Plan B
  vocab-n3.js   ← placeholder kosong                     window.vocabN3  🔒 Plan B
  vocab-n2.js   ← placeholder kosong                     window.vocabN2  🔒 Plan B
  vocab-n1.js   ← placeholder kosong                     window.vocabN1  🔒 Plan B
```

### Tier 2 — Book Vocab Lens

```
── BOOK VOCAB LENS (active setelah Plan C) ───────────────────────────────────
data/
  book-soumatome-n5.js  ← Sou Matome N5 chapter→vocab_ids  window.bookSoumatomeN5  🔒 Plan C
  book-soumatome-n4.js  ← Sou Matome N4 chapter→vocab_ids  window.bookSoumatomeN4  🔒 Plan C
  book-soumatome-n3.js  ← Sou Matome N3 chapter→vocab_ids  window.bookSoumatomeN3  🔒 Plan C
  book-soumatome-n2.js  ← Sou Matome N2 chapter→vocab_ids  window.bookSoumatomeN2  🔒 Plan C
  book-soumatome-n1.js  ← Sou Matome N1 chapter→vocab_ids  window.bookSoumatomeN1  🔒 Plan C
  book-minna-1.js       ← Minna no Nihongo I (25 bab)       window.bookMinna1       🔒 Plan C
  book-minna-2.js       ← Minna no Nihongo II (25 bab)      window.bookMinna2       🔒 Plan C
  book-irodori-a1.js    ← Irodori A1 (18 unit)              window.bookIrodoriA1    🔒 Plan C
  book-irodori-a2-1.js  ← Irodori A2-1 (18 unit)            window.bookIrodoriA2_1  🔒 Plan C
  book-irodori-a2-2.js  ← Irodori A2-2 (18 unit)            window.bookIrodoriA2_2  🔒 Plan C
```

### Index & Merger

```
── MERGER & INDEX ─────────────────────────────────────────────────────────────
data/
  vocab-index.js  ← merge semua vocab global → window.vocabDB + buildVocabIndex()
                    Index tersedia: byId, byJlpt, byPos, byDomain, byBook
                    (diupdate A1 saat Plan B selesai)
```

### File Lama — Status RETIRED (Plan B)

```
── FILE RETIRED SETELAH PLAN B ───────────────────────────────────────────────
data/
  vocab-n5-core.js         🔒 RETIRED (Plan B) — dimigrasikan ke vocab-n5.js
  vocab-n5-soumatome.js    🔒 RETIRED (Plan B) — dimigrasikan ke vocab-n5.js
  vocab-n4-soumatome.js    🔒 RETIRED (Plan B) — dimigrasikan ke vocab-n4.js
  vocab-n4-core.js         🔒 RETIRED (Plan B) — dimigrasikan ke vocab-n4.js
  vocab-n3-soumatome.js    🔒 RETIRED (Plan B) — stub, tidak dimigrasikan
  vocab-n3-core.js         🔒 RETIRED (Plan B) — empty, tidak dimigrasikan
  vocab-n2-soumatome.js    🔒 RETIRED (Plan B) — empty, tidak dimigrasikan
  vocab-n2-core.js         🔒 RETIRED (Plan B) — empty, tidak dimigrasikan
  vocab-n1-soumatome.js    🔒 RETIRED (Plan B) — empty, tidak dimigrasikan
  vocab-n1-core.js         🔒 RETIRED (Plan B) — empty, tidak dimigrasikan
  vocab-n4.js              ❌ RETIRED (v14.5.2) — JANGAN DISENTUH SAMA SEKALI
```

**Catatan retirement:** File-file di atas masih aktif sampai Plan B merge selesai.
Setelah Plan B approved oleh Crunchy dan di-merge oleh Crispy, semua file `vocab-n*-*.js`
dihapus fisik dari project. Tidak boleh ada yang membuka atau mengedit file retired.

---

## vocab-index.js API

```js
window.buildVocabIndex()             // build semua index — dipanggil dari app.js
window.queryVocab(filter)            // filter by jlpt, pos, domain, register, common
window.queryVocabByBook(book, ch)    // ambil vocab dari buku + chapter/unit tertentu
                                      // book: 'soumatome-n5'|'minna-1'|'irodori-a1'|dll
window.getVocab(id)                  // ambil satu entry by id (format: vg-{level}-{4digit})
window.sampleVocab(filter, n)        // ambil N random dari pool
window.listBooks()                   // daftar semua buku yang tersedia di index
```

---

## Integration Points

| Modul | Pakai field | Catatan |
|---|---|---|
| `conjugation-engine.js` | `conj_type`, `word`, `reading` | Tidak berubah |
| `quiz-generator.js` (future) | `pos`, `domain`, `examples`, `jlpt` | Tidak berubah |
| `lang-core.js` / TypeTr | `examples[]`, `meaning_id` | Tidak berubah |
| `detail.js` | `synonyms`, `antonyms`, `related_grammar`, `nuance` | ID format baru `vg-` dan `gn*-` |
| `browse.js` | `jlpt`, `domain`, `formalitas` | Tidak berubah |
| `srs.js` | `id` (sebagai cardId vocab) | ID format baru `vg-{level}-{4digit}` |
| `book-*.js` | `vocab_ids[]` | Semua referensi pakai ID `vg-` |

### Catatan untuk A4 (Batter) — Cross-Schema Consistency
Field `related_grammar` di VocabGlobal merujuk ke cardId grammar global.
Format yang ditetapkan di sisi vocab: **`gn{level}-{4digit}`** (contoh: `gn3-0005`).
A4 wajib memastikan format cardId di `_schema.md` (grammar global) konsisten dengan ini.

Sebaliknya, field `examples[]` di grammar global yang mereferensikan vocab
wajib menggunakan ID vocab global format **`vg-{level}-{4digit}`**.
