# Nugget Nihongo — Developer & Contributor Guide (`CONTRIBUTING.md`)

Selamat datang di repositori resmi **Nugget Nihongo** (ナゲット日本語) — platform pembelajaran bahasa Jepang berbasis FSRS v4.5, mikrolearning kontekstual, dan kurikulum ganda JLPT N5–N1 & SSW Tokutei Ginou 19 Sektor yang dirancang khusus untuk penutur asli Bahasa Indonesia (*L1 Indonesian Learners*).

Dokumen ini memuat panduan, tata kelola arsitektur, standar penulisan kode, serta alur verifikasi mutu untuk seluruh perekayasa perangkat lunak (*human engineers*), kontributor *open source*, dan agen kecerdasan buatan (*AI pair-programming agents*) yang berkontribusi pada repositori ini.

---

## 1. Persyaratan Awal & Setup Lingkungan Pengembang

### Spesifikasi Runtime & Alat
- **Node.js**: `v20.x` atau `v22.x LTS` (direkomendasikan Node.js v22).
- **Package Manager**: `npm` versi 10+ dengan flag wajib `legacy-peer-deps=true`.
- **Operating System**: Lintas platform (Windows 10/11 x64, macOS Sonoma/Sequoia, Linux Ubuntu 22.04+).
- **Git**: Versi 2.40+.

### Prosedur Instalasi & Bootstrap
1. **Kloning Repositori**:
   ```bash
   git clone https://github.com/nugget-nihongo/nugget-nihongo.git
   cd nugget-nihongo
   ```

2. **Periksa Konfigurasi `.npmrc`**:
   Repositori ini mewajibkan keberadaan berkas `.npmrc` di root proyek yang memuat:
   ```ini
   legacy-peer-deps=true
   ```
   > [!IMPORTANT]
   > Jangan menghapus atau mengubah `.npmrc`. Beberapa dependensi pedagogis dan grafik CJK memerlukan resolusi peer dependencies yang fleksibel.

3. **Instal Dependensi**:
   ```bash
   npm install --legacy-peer-deps
   ```

4. **Jalankan Server Pengembangan (Dev Server)**:
   ```bash
   npm run dev
   ```
   Aplikasi akan aktif di `http://localhost:5173`.

---

## 2. Navigasi Struktur Repositori & Dokumentasi SSOT

Repositori ini menerapkan standar **Docs-as-Code** berskala Enterprise dengan 7 Pilar Pengetahuan (*Knowledge Base*) di dalam direktori `docs/`. Anda **tidak perlu** membaca ratusan ribu baris kode secara manual untuk memahami arsitektur sistem.

- **Peta Navigasi Arsitektur**: [`docs/PROJECT_ARCHITECTURE_MAP.md`](./docs/PROJECT_ARCHITECTURE_MAP.md) (Daftar direktori, modul inti, dan dependensi).
- **Indeks Utama Dokumentasi**: [`docs/INDEX.md`](./docs/INDEX.md) (Pusat navigasi 7 Pilar).
- **Rapor & Audit Mutu**: [`docs/06-qa-and-verification-contracts/`](./docs/06-qa-and-verification-contracts/).
- **Keputusan Arsitektur (ADR)**: [`docs/07-architecture-decisions-adr/`](./docs/07-architecture-decisions-adr/) (ADR-001 hingga ADR-011).

```
nugget-nihongo/
├── .github/workflows/       # CI/CD GitHub Actions (validate.yml)
├── docs/                    # 7 Pilar Enterprise Knowledge Base
│   ├── 01-product-and-mission/
│   ├── 02-architecture-and-systems/
│   ├── 03-pedagogy-and-curriculum/
│   ├── 04-design-system-and-brand/
│   ├── 05-data-corpus-and-schemas/
│   ├── 06-qa-and-verification-contracts/
│   └── 07-architecture-decisions-adr/
├── public/                  # Aset statis, Service Worker (sw.js), Web App Manifest
├── src/
│   ├── components/          # Komponen UI modular (common, exercise, onboarding, dll.)
│   ├── config/              # Konfigurasi aplikasi & versi (version.ts)
│   ├── lib/                 # Core engines (FSRS, CAT/IRT, audio, curriculum, storage)
│   ├── pages/               # Halaman utama aplikasi (Home, Dojo, Kebun, LMS, dll.)
│   ├── store/               # Zustand global state store (useAppStore.ts)
│   └── types/               # Definisi tipe TypeScript
└── tests/                   # Master cumulative test suite (Siklus I-III, Sprint 1-44)
```

---

## 3. 4 Aturan Rekayasa Mutlak (*Inviolable Engineering Rules*)

Setiap baris kode yang masuk ke repositori Nugget Nihongo terikat secara hukum pada 4 aturan berikut:

### Rule 1: Cumulative Regression Test Contract
- **Kontrak Perilaku**: Pengujian memvalidasi keluaran runtime, fungsi tereskpor, atau skema AST, bukan pencocokan string harfiah (*literal string matching*) yang rapuh.
- **Dilarang Menonaktifkan Tes**: Seluruh test suite historis (Sprint 1 s.d. 44, Fase 1–5, Siklus II 1–15, Siklus III) **wajib tetap hijau (100% PASS, Exit Code 0)**. Dilarang keras mematikan (`skip`, `only`, komentar) pengujian sebelumnya.
- **Refactoring Kompatibel Mundur**: Jika ada peningkatan arsitektur, perbarui asersi lama dan baru agar berbagi kontrak terpadu.

### Rule 2: Forensic Audit Pace & Rigor
- **Satu Putaran, Satu Pass**: Pada audit forensik bertingkat, lakukan dan laporkan tepat **satu single-pass per turn**. Dilarang melompat atau menggabungkan multiple pass sekaligus.
- **Bukti Empiris Mikroskopis**: Cita jalur berkas lengkap, rentang baris kode, dan bukti eksekusi terminal nyata.

### Rule 3: Universal Multi-Device Responsive Design
- **Cakupan Resolusi**:
  - *Small Mobile*: 320px – 375px (iPhone SE, budget Android)
  - *Standard Mobile*: 390px – 430px (iPhone 13/14/15/16, Samsung Galaxy S)
  - *Tablet / Phablet*: 640px – 1024px (iPad mini, iPad, Surface, foldables)
  - *Desktop*: 1024px – 1920px+
- **Anti-Leakage**: Dilarang menggunakan lebar piksel kaku (`w-[500px]`, `min-w-[400px]`) pada elemen flex/grid horizontal tanpa `min-w-0` atau awalan responsif. Kontainer halaman wajib memiliki `w-full max-w-full overflow-x-hidden`.
- **Target Sentuh Aman**: Semua tombol, kartu interaktif, ubin kana, dan pemicu modal wajib memiliki dimensi target sentuh minimal **40px × 40px** (`min-w-[40px] min-h-[40px]`) dengan respons aktif kinestetik (`active:scale-95`).
- **Bantalan Navigasi Aman Mobile**: Semua kontainer konten halaman mobile wajib memiliki bantalan bawah: `pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12` agar tidak tertutup `BottomNav`.

### Rule 4: Windows PowerShell Command Chaining
- Di lingkungan terminal Windows PowerShell, dilarang menggunakan operator chaining POSIX harfiah `&&` secara langsung karena memicu galat sintaks. Gunakan pemisah `;` atau bungkus dengan `cmd /c "command1 && command2"`.

---

## 4. Alur Kerja Git & Standar Commit

### Model Percabangan (*Branching Strategy*)
- **Trunk-Based Development**: Cabang utama adalah `main`. Seluruh PR harus berasal dari cabang kerja berumur pendek (*short-lived feature branches*).
- **Penamaan Cabang**:
  - `feat/nama-fitur` (misal: `feat/kanji-radicals-explorer`)
  - `fix/nama-perbaikan` (misal: `fix/dokkai-touch-target-ios`)
  - `docs/nama-dokumentasi` (misal: `docs/adr-012-offline-queue`)
  - `perf/nama-optimasi` (misal: `perf/kuromoji-wasm-init`)

### Standar Pesan Commit (Conventional Commits)
Gunakan format commit semantik berstruktur:
```text
<type>(<scope>): <deskripsi singkat imperatif>

[badan pesan opsional menjelaskan latar belakang dan justifikasi]

Fixes #123 (jika terkait issue)
```
- **Tipe yang Diizinkan**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `revert`.
- **Contoh**:
  ```text
  feat(curriculum): tambahkan modul keselamatan kerja SSW pengelasan
  fix(dokkai): tingkatkan target sentuh tombol buka wacana ke 40px
  docs(adr): rekam ADR-011 standarisasi SSOT dokumentasi enterprise
  test(siklus3): tambahkan verifikasi pass 13 lesson study anti-exploit
  ```

---

## 5. Sinkronisasi Versi & Release Checklist

Nugget Nihongo menerapkan kebijakan **Version Lockstep 4 Titik**. Setiap perubahan versi rilis **wajib disinkronkan serentak** di 4 berkas berikut:
1. `package.json` (`"version": "X.Y.Z"`)
2. `src/config/version.ts` (`export const APP_VERSION = 'X.Y.Z'`)
3. `public/js/core/version.js` (`window.APP_VERSION = 'X.Y.Z'`)
4. `public/sw.js` (`const CACHE_NAME = 'nugget-nihongo-vX.Y.Z'`)

Verifikasi keselarasan versi dilakukan dengan menjalankan:
```bash
npm run check:version
```

---

## 6. Daftar Periksa Wajib Sebelum Membuat Pull Request (PR)

Sebelum mengajukan Pull Request ke cabang `main`, setiap kontributor **wajib** mengeksekusi rangkaian verifikasi berikut secara lokal dan memastikan semuanya lolos tanpa peringatan (*Zero Errors, Zero Warnings*):

```bash
# 1. Validasi Master Test Suite (Seluruh Sprint & Siklus Wajib 100% HIJAU)
npm test

# 2. Pengecekan Keselarasan Versi 4 Berkas
npm run check:version

# 3. Pengecekan Tipe TypeScript (Strict Typecheck)
npx tsc --noEmit

# 4. Verifikasi Anggaran Ukuran Bundle Produksi
npm run verify:budget
```

Jika salah satu perintah di atas gagal, perbaiki terlebih dahulu sebelum melakukan `git push`. Pipeline CI GitHub Actions (`.github/workflows/validate.yml`) akan memblokir PR yang gagal pada salah satu pemeriksaan ini.

---

## 7. Standar Desain, Tipografi & Aset Budaya

### Palet Warna "Warm Editorial Hybrid" (ADR-010)
- **Tema Terang**: Kanvas Washi lembut (`#F7F4EE` / `bg-[#F7F4EE]`), kartu Milk-White (`#FFFFFF` / `bg-surface-card`), teks Utama Deep Sumi Charcoal (`#1F1D1A`).
- **Tema Gelap**: Kanvas Warm Sumi (`#121110`), kartu Charcoal hangat (`#1C1A18`), garis batas Makie Gold halus (`border-amber-500/15`).
- **Kepatuhan Kontras**: Seluruh teks dan lencana wajib memenuhi ambang batas kontras WCAG AA ($\ge 4.5:1$ untuk teks biasa, $\ge 3:1$ untuk teks tebal/besar). Gunakan pola dual-theme berpasangan: `text-emerald-800 dark:text-emerald-300 font-bold`.

### Tipografi Jepang
- Teks furigana `<ruby>` wajib menggunakan komponen `RubyText.tsx` atau utilitas `[ruby-position:over]` dengan perataan `align-baseline` dan teks furigana minimal `0.65em`.
- Kalimat Jepang bebas pemenggalan janggal wajib dibungkus dengan komponen `BudouxText.tsx` dengan atribut semantik `lang="ja"`.

### Lisensi Aset Ilustrasi Irasutoya (いらすとや)
Ilustrasi maskot dan elemen budaya Jepang di Nugget Nihongo bersumber dari karya **Takashi Mifune** ([irasutoya.com](https://www.irasutoya.com/)). 
- Penggunaan dalam Nugget Nihongo mematuhi lisensi resmi edukasi non-komersial (< 20 ilustrasi per kategori proyek).
- Komponen `IrasutoyaImage.tsx` wajib digunakan untuk memuat gambar Irasutoya guna menjamin ketersediaan fallback offline, *skeleton shimmer*, serta atribut aksesibilitas `role="img"` dan `aria-label`.

---

## 8. Bantuan & Komunikasi

Jika Anda menemukan celah keamanan atau memiliki pertanyaan seputar arsitektur sistem, silakan merujuk ke:
- [Peta Arsitektur Proyek](./docs/PROJECT_ARCHITECTURE_MAP.md)
- [Kebijakan Keamanan & Privasi Data](./docs/05-data-corpus-and-schemas/SECURITY-AND-DATA-PRIVACY.md)
- [Prosedur Pemulihan Bencana & Runbook Insiden](./docs/02-architecture-and-systems/DISASTER-RECOVERY-AND-INCIDENT-RUNBOOK.md)

*Terima kasih telah berkontribusi membangun platform belajar bahasa Jepang terbaik bagi generasi muda Indonesia!* 🇮🇩🤝🇯🇵
