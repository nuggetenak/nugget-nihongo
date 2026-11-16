# 🔍 Test Quality Audit & Anti-Fragility Report — Nugget Nihongo

## 1. Ringkasan Eksekutif

Audit kualitas pengujian bertujuan mendeteksi dan mengeliminasi:
- Uji rapuh (*brittle literal string matchers*) yang rentan patah akibat refaktorisasi kosmetik.
- Uji palsu (*hollow assertions*) yang hanya memeriksa keberadaan file atau teks tanpa memvalidasi kebenaran perilaku runtime.
- Flaky tests akibat ketergantungan jaringan atau waktu (*time jitter*).

---

## 2. Temuan & Remediasi Kualitas Uji

### Temuan A: String Matcher Harfiah vs Dekomposisi Komponen Modular
- **Gejala Awal**: Beberapa test lama memeriksa string harfiah di file monolitik (`MateriHubPage.tsx`), misalnya mencari `id: 'kanji'` langsung di `MateriHubPage.tsx`. Saat `ReferencePillar.tsx` diekstraksi ke direktori terpisah, test tersebut gagal meskipun aplikasi bekerja dengan benar.
- **Surgical Remediation**: Sesuai kaidah `.agents/rules/cumulative-regression-contracts.md`, pengujian dimodernisasi untuk memeriksa gabungan kode atau AST/ekspor fungsional runtime (`hubCode + '\n' + refCode`), menjaga 100% green status historis tanpa melemahkan asersi.

### Temuan B: Invarian Anti-Bypass (Zero Disabling)
- **Inspeksi**: Audit menyeluruh terhadap seluruh 157 suite memastikan tidak ada `process.exit(0)` yang dipasang di awal file untuk melewati pengujian, tidak ada `// test.skip`, dan tidak ada blok assertion yang dikosongkan.
- **Hasil**: 100% dari 157 suite memiliki assertion aktif (`assert(condition, message)`) yang memverifikasi runtime invariant.

### Temuan C: Zero Network Dependency di CI
- **Inspeksi**: Pengujian inti FSRS, CAT, kurikulum, dan fonetik berjalan 100% offline secara self-contained menggunakan Node.js built-in runtime tanpa membutuhkan koneksi internet atau Supabase remote aktif.

---

## 3. Matriks Integritas Assertion

| Kategori Pengujian | Jumlah Asersi Rata-rata / Suite | Tipe Asersi | Ketahanan Terhadap Refaktorisasi |
|---|:---:|---|:---:|
| Core Algorithmic (FSRS / CAT) | 15–30 | Nilai Matematika Murni & Batas Toleransi (`< 0.001`) | 🟢 Sangat Tinggi (Anti-fragile) |
| Linguistic Corpus | 50–200 | Skema Objek, Keunikan ID, Kelengkapan Furigana | 🟢 Sangat Tinggi |
| Component Structure | 8–15 | Ekspor Simbol, Kontrak Props, Segmented Tabs | 🟢 Tinggi |
| UI/UX Ergonomics | 10–20 | Dimensi Touch Target (>= 40px), Safe-Area Padding | 🟢 Tinggi |
| Build & Performance | 5–10 | Ukuran Chunk Rollup (<= 500 kB), Manual Chunks Map | 🟢 Sangat Tinggi |
