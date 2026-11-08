import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();

// 1. Update package.json
const pkgPath = path.join(rootDir, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
pkg.version = '24.2.0';
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
console.log('✅ Updated package.json to 24.2.0');

// 2. Update package-lock.json
const pkgLockPath = path.join(rootDir, 'package-lock.json');
if (fs.existsSync(pkgLockPath)) {
  const pkgLock = JSON.parse(fs.readFileSync(pkgLockPath, 'utf8'));
  pkgLock.version = '24.2.0';
  if (pkgLock.packages && pkgLock.packages['']) {
    pkgLock.packages[''].version = '24.2.0';
  }
  fs.writeFileSync(pkgLockPath, JSON.stringify(pkgLock, null, 2) + '\n', 'utf8');
  console.log('✅ Updated package-lock.json to 24.2.0');
}

// 3. Update src/config/version.ts
const versionTsPath = path.join(rootDir, 'src', 'config', 'version.ts');
let versionTs = fs.readFileSync(versionTsPath, 'utf8');
versionTs = versionTs.replace(/APP_VERSION = 'v[^']+'/, "APP_VERSION = 'v24.2.0'");
versionTs = versionTs.replace(/APP_VERSION_NUMBER = '[^']+'/, "APP_VERSION_NUMBER = '24.2.0'");
versionTs = versionTs.replace(/APP_RELEASE_NAME = '[^']+'/, "APP_RELEASE_NAME = 'Shin-Nihongo: Dojo 4-Pillars & Clean Studio Ergonomics'");
versionTs = versionTs.replace(/APP_BUILD_DATE = '[^']+'/, "APP_BUILD_DATE = '2026-11-09'");
fs.writeFileSync(versionTsPath, versionTs, 'utf8');
console.log('✅ Updated src/config/version.ts to v24.2.0');

// 4. Update public/js/core/version.js
const versionJsPath = path.join(rootDir, 'public', 'js', 'core', 'version.js');
fs.writeFileSync(versionJsPath, "window.APP_VERSION = 'v24.2.0';\n", 'utf8');
console.log('✅ Updated public/js/core/version.js to v24.2.0');

// 5. Update public/sw.js
const swJsPath = path.join(rootDir, 'public', 'sw.js');
let swJs = fs.readFileSync(swJsPath, 'utf8');
swJs = swJs.replace(/const CACHE = 'nihongo-v[^']+';/, "const CACHE = 'nihongo-v24.2.0';");
fs.writeFileSync(swJsPath, swJs, 'utf8');
console.log('✅ Updated public/sw.js to nihongo-v24.2.0');

// 6. Prepend v24.2.0 to src/lib/data/patchNotes.ts
const patchNotesPath = path.join(rootDir, 'src', 'lib', 'data', 'patchNotes.ts');
let patchNotes = fs.readFileSync(patchNotesPath, 'utf8');

const newPatchNote = `  {
    version: 'v24.2.0',
    releaseName: 'Shin-Nihongo: Dojo 4-Pillars & Clean Studio Ergonomics',
    date: '9 November 2026',
    type: 'minor',
    friendlySummary: 'Pembaruan v24.2.0 merestrukturisasi total ruang Dojo menjadi 4 pilar yang intuitif dan terarah: 🥋 Latihan & Kuis (Sasana Drill Refleks 6 Mode), 📖 Kamus & Indeks (10.500+ kosakata dan 850+ pola tata bahasa), 🧰 Alat Bantu & Pustaka Referensi (8 instrumen tata bahasa & eksplorasi 9 buku teks), serta 🎯 Simulator Ujian CBT (Pusat Simulasi Ujian Resmi JLPT N5–N1, JFT-Basic, Prometric Tokutei Ginou SSW 19 Sektor, Menyimak Choukai 163 Soal, dan Tes CAT). Navigasi samping (Drawer) kini tersambung langsung ke tab Latihan & Kuis di Dojo tanpa halaman terisolasi. Selain itu, tampilan Bedah Materi di Studio Belajar disempurnakan dengan menghilangkan tab bertumpuk di layar ponsel dan menghadirkan tombol melayang "Kembali ke Atas" yang halus.',
    highlights: [
      'Pilar 1 — Restrukturisasi 4 Tombol Pilihan Dojo & Materi Hub: Pemisahan bersih antara Latihan & Kuis, Kamus & Indeks, Alat Bantu & Referensi, dan Simulator Ujian CBT.',
      'Pilar 2 — Pusat Simulasi Ujian CBT Resmi Terintegrasi: Tersedia 14 Set Ujian Lengkap JLPT CBT N5–N1, JFT-Basic A1/A2, Prometric Tokutei Ginou SSW (19 Sektor), Simulator Menyimak Choukai (163 soal), dan Tes Adaptif CAT.',
      'Pilar 3 — Harmonisasi Navigasi Menu Samping & Arena Kuis: Menekan Arena Kuis di menu samping langsung membuka sasana latihan di Dojo tanpa memuat halaman terpisah yang membingungkan.',
      'Pilar 4 — Ergonomi Bersih Studio Belajar (Bebas Sticky Bertumpuk): Sub-tab Bedah Materi tidak lagi menumpuk atau menutupi bacaan di ponsel, dilengkapi tombol melayang "Atas" saat scroll materi panjang.',
      'Pilar 5 — Pustaka Alat Bantu & 9 Seri Buku Teks: Bagan Kana, Matriks Konjugasi, Komparasi Nuansa, Pelatih Keigo, Pelatih Bilangan, Kotowaza, Pitch Accent, dan 9 Buku Teks Resmi tersusun rapi di tab Alat Bantu.',
    ],
    details: [
      {
        category: 'Pilar 1 — Restrukturisasi 4 Tombol Pilihan Dojo & Materi Hub',
        items: [
          'Pengenalan 4 tab navigasi utama berlabel jelas: Latihan & Kuis, Kamus & Indeks, Alat & Referensi, dan Simulator Ujian CBT.',
          'Sinkronisasi status tab aktif dengan useAppStore.dojoTab dan useAppStore.setDojoTab.',
          'Pembersihan tata letak dasbor agar tidak mencampuradukkan latihan mandiri dengan simulator ujian resmi.',
        ],
      },
      {
        category: 'Pilar 2 — Pusat Simulasi Ujian CBT Resmi Terintegrasi (Tab 4)',
        items: [
          'Penyediaan 5 kartu simulator ujian standar internasional dengan timer resmi dan lembar jawaban.',
          'Penyatuan modul 14 Set Latihan JLPT CBT, JFT-Basic, dan 19 Sektor Prometric SSW (ExamLmsHub) langsung di dalam tab Simulator Ujian.',
          'Integrasi Simulator Menyimak Choukai (163 Soal) dan Tes Penempatan Adaptif CAT (IRT 3PL).',
        ],
      },
      {
        category: 'Pilar 3 — Harmonisasi Navigasi Menu Samping (Drawer & Sidebar)',
        items: [
          'Navigasi tombol Arena Kuis di MobileDrawer dan Sidebar kini mengarahkan pemelajar ke Dojo pada tab Latihan & Kuis.',
          'Penyelarasan App.tsx agar rute /quiz secara cerdas membuka Latihan & Kuis jika tidak ada sesi kuis aktif.',
        ],
      },
      {
        category: 'Pilar 4 — Ergonomi Bersih Studio Belajar (ExplanationStage)',
        items: [
          'Penghapusan penumpukan sticky bar sub-tab di bawah stepper tahapan belajar untuk membebaskan ruang vertikal layar ponsel.',
          'Penambahan tombol melayang (floating pill) "Atas" dengan transisi scroll halus saat membaca penjelasan materi panjang.',
          'Penambahan ID jangkar (pilar-tata-bahasa, pilar-kosakata, pilar-jebakan) untuk navigasi cepat.',
        ],
      },
      {
        category: 'Pilar 5 — Pustaka Alat Bantu & Laboratorium Bahasa (Tab 3)',
        items: [
          'Pengelompokan 8 instrumen referensi bahasa Jepang: Bagan Kana, Konjugasi 9 Bentuk Verba, Komparasi Nuansa, Pelatih Keigo Bisnis, Pelatih Bilangan (Counters), Pustaka 9 Seri Buku Teks, Kotowaza, dan Pitch Accent Studio.',
          'Penyaringan kategori alat dengan tombol pill responsif dan akses instan.',
        ],
      },
    ],
  },`;

if (!patchNotes.includes("version: 'v24.2.0'")) {
  patchNotes = patchNotes.replace(
    'export const PATCH_NOTES_HISTORY: PatchNote[] = [\n',
    `export const PATCH_NOTES_HISTORY: PatchNote[] = [\n${newPatchNote}\n`
  );
  fs.writeFileSync(patchNotesPath, patchNotes, 'utf8');
  console.log('✅ Prepend v24.2.0 to src/lib/data/patchNotes.ts');
}
