# ADR-006: Canonical Global Database, Book Lens Mapping, and Track Independence

## Status
**APPROVED / ACTIVE** (Implemented in Nugget Nihongo Core v16.0)

## Context & Problem Statement
Sebelum konsolidasi arsitektur data v3, platform pembelajaran bahasa menghadapi fragmentasi struktural yang serius:
1. **Redundansi Butir Pembelajaran:** Pola tata bahasa seperti `〜てはいけません` (larangan) diajarkan di Minna no Nihongo Bab 15, Irodori A2, Genki Bab 6, dan persiapan JLPT N5. Jika setiap jalur atau buku teks memiliki kartu dan database independen, pembelajar yang berganti kurikulum harus mempelajari dan menghafal kartu yang sama berkali-kali.
2. **Riwayat Memori Terpisah:** Progres FSRS pembelajar di buku Minna no Nihongo tidak terbaca ketika mereka berlatih di mode kuis JLPT Track, mematahkan kesinambungan kurva retensi Spaced Repetition.
3. **Inkoneksitas Antar-Tingkatan:** Kosakata dan tata bahasa tidak saling terindeks, sehingga sistem tidak dapat secara otomatis mengecek apakah kalimat contoh untuk tata bahasa N5 hanya memuat kosakata yang sudah dipelajari pembelajar.

## Empirical SLA & Curriculum Architecture Grounding
- **Nation (2007) [CA-01]:** *Curriculum Design Architecture* menekankan bahwa perbendaharaan leksiko-gramatikal harus diatur dalam satu kerangka kerja terpadu (*coherent unified framework*). Pengulangan materi harus bersifat kumulatif dan memperdalam penguasaan (*vocabulary depth*), bukan sekadar replikasi data dangkal.
- **Webb (2007) [VD-05]:** Pengetahuan kosakata bertambah melalui paparan berulang dalam konteks sintaktis yang bervariasi. Memisahkan riwayat kata per buku teks menghancurkan akumulasi pematangan leksikal longitudinal.
- **Pienemann (1998) [GA-01]:** *Processability Theory* menuntut hierarki akuisisi pemrosesan yang stabil terlepas dari buku teks mana yang digunakan oleh sekolah atau pembelajar.

## Decision Drivers & Decisions
Nugget Nihongo menetapkan arsitektur data **One Canonical Global Database, Many Curated Lenses**:

```
┌─────────────────────────────────────────────────────────┐
│              GLOBAL DATABASE (Source of Truth)          │
│   • Vocab Global:   vg-{level}-{5digit}                 │
│   • Grammar Global: gn{level}-{5digit}                  │
└───────────────────────────┬─────────────────────────────┘
                            │
               ┌────────────┴────────────┐
               ▼                         ▼
      ┌─────────────────┐       ┌─────────────────┐
      │   BOOK LENSES   │       │  STUDY TRACKS   │
      │ • Minna (mn)    │       │ • Freeway Track │
      │ • Irodori (ir)  │       │ • JLPT Highway  │
      │ • SouMatome(sm) │       │ • SSW Vocations │
      └─────────────────┘       └─────────────────┘
```

1. **Satu Database Kanonikal Tunggal (*Source of Truth*):**
   - Seluruh konten tata bahasa dan kosakata didefinisikan secara unik di berkas global:
     - `public/data/vocab/vocab-{level}.js` (ID: `vg-n5-00001` s.d. `vg-n1-00190`)
     - `public/data/grammar/grammar-{level}.js` (ID: `gn5-00001` s.d. `gn1-00200`)
   - Menggunakan ID zero-padded 5-digit kanonikal.
2. **Lensa Buku Teks (*Book Lenses*):**
   - Buku teks (`book-minna-1.js`, `book-irodori-a1.js`, dll.) **TIDAK MEMILIKI DATABASE KATA SENDIRI**.
   - Setiap bab dalam buku teks hanyalah peta kurasi (*curated lens*) yang memetakan bab ke susunan ID global:
     `units: { 1: { vocab_ids: ['vg-n5-00001', ...], grammar_ids: ['gn5-00001', ...] } }`
   - Lensa buku hanya memiliki metadata pedagogis khas buku tersebut (misal: nuansa khas atau nomor halaman).
3. **Jalur Belajar Fleksibel (*Study Tracks*):**
   - *Freeway Track (Survival 20 Pola):* Memilih 21 ID tata bahasa esensial dari N5 untuk pemula absolut yang butuh berkomunikasi cepat.
   - *JLPT Track (Standard N5→N1):* Progresi komprehensif mengikuti silabus hirarkis.
   - *SSW Vocational Tracks:* Kurasi modul fungsional tempat kerja industri.
4. **Riwayat FSRS Terpadu:**
   - Karena semua kartu merujuk ke ID global yang sama, memori belajar pengguna tetap terakumulasi dan berkesinambungan tanpa peduli dari jalur mana mereka belajar.

## Consequences & Verification
- **Positif:** Menghemat ukuran bundel PWA, menghilangkan duplikasi data, dan memungkinkan cross-navigation instan antara kurikulum buku dan kurikulum JLPT.
- **Pemetaan Design Decision:** DD-103, DD-104, DD-105, DD-106, DD-107, DD-108.
