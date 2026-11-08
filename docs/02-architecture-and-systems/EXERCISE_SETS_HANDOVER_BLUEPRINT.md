# 🌟 Nugget Nihongo - Exercise Sets Handover Blueprint
**Document Version**: `1.0.0 (Production Handover Specification)`  
**Scope**: Data Curation, Typings, Verification Suite & LMS Implementation Blueprint  
**Target Environment**: Nugget Nihongo LMS (React 18 + TypeScript + Vite + Tailwind CSS + Zustand + IndexedDB)

---

## 1. Executive Summary & Purpose

This handover blueprint provides the complete architectural contract, data dictionary, payload schemas, and UI/UX integration guidelines for the **14 Golden Exercise Sets (Set 01)** curated for Nugget Nihongo.

### Key Metrics
- **Total Tracks Covered**: 14 Distinct Academic & Vocational Learning Tracks
- **Total Authentic Questions**: 210 Questions (exactly 15 questions per set)
- **Pedagogical Depth**: Strict **5-Layer Pedagogical Explanations** on 100% of items:
  1. *Lapis 1: Justification (Alasan Kunci Benar)*
  2. *Lapis 2: Distractor Autopsy (Bedah Opsi Salah A, B, C, D)*
  3. *Lapis 3: Sensei Mnemonic (Jembatan Ingatan & Analogi Budaya Indonesia)*
  4. *Lapis 4: L1 Interference Alert (Peringatan Pola Pikir & Interferensi Bahasa Indonesia)*
  5. *Lapis 5: Remedial Prescription (Rujukan Kurikulum MateriHub & Langkah Tindakan)*
- **Data Location**: Static JSON files hosted in [public/data/exercises/](file:///c:/Users/Timedoor/Downloads/nugget%20nihonggo%20project/nugget-nihongo/public/data/exercises/)
- **Catalog Manifest**: [`manifest.json`](file:///c:/Users/Timedoor/Downloads/nugget%20nihonggo%20project/nugget-nihongo/public/data/exercises/manifest.json)
- **Typings Contract**: [`src/types/exercise.ts`](file:///c:/Users/Timedoor/Downloads/nugget%20nihonggo%20project/nugget-nihongo/src/types/exercise.ts)
- **LMS Design & Roadmap Draft**: [`docs/DRAFT_LMS_CONSOLIDATION_AND_ROADMAP.md`](file:///c:/Users/Timedoor/Downloads/nugget%20nihonggo%20project/nugget-nihongo/docs/DRAFT_LMS_CONSOLIDATION_AND_ROADMAP.md) (The 3 Clean Doors & 7 Locked Systems)
- **Automated Verification**: [`tests/test-exercise-datasets-integrity.js`](file:///c:/Users/Timedoor/Downloads/nugget%20nihonggo%20project/nugget-nihongo/tests/test-exercise-datasets-integrity.js) (Continuous Green: 210/210 validated)

---

## 2. Comprehensive File Tree

```
nugget-nihongo/
├── public/
│   └── data/
│       └── exercises/
│           ├── manifest.json                        <-- Catalog of all 14 tracks & metadata
│           ├── jlpt-n5-set01.json                   <-- 15 items: N5 Fondasi Awal (Unit 1..5)
│           ├── jlpt-n4-set01.json                   <-- 15 items: N4 Transisi Kerja (Unit 1..5)
│           ├── jlpt-n3-set01.json                   <-- 15 items: N3 Kemandirian Percakapan
│           ├── jlpt-n2-set01.json                   <-- 15 items: N2 Bisnis & Dokumen Resmi
│           ├── jlpt-n1-set01.json                   <-- 15 items: N1 Tingkat Lanjut & Nuansa Halus
│           ├── jft-basic-a2-set01.json              <-- 15 items: JFT-Basic A2 Kehidupan Sehari-hari
│           ├── ssw-kaigo-set01.json                 <-- 15 items: SSW Keperawatan Lansia (MHLW)
│           ├── ssw-food-service-set01.json          <-- 15 items: SSW Restoran / Gaishoku (OTAFF)
│           ├── ssw-food-mfg-set01.json              <-- 15 items: SSW Pengolahan Makanan (OTAFF)
│           ├── ssw-kensetsu-doboku-set01.json       <-- 15 items: SSW Konstruksi - Sipil (JAC/MLIT)
│           ├── ssw-kensetsu-kenchiku-set01.json     <-- 15 items: SSW Konstruksi - Gedung (JAC/MLIT)
│           ├── ssw-kensetsu-lifeline-set01.json     <-- 15 items: SSW Konstruksi - Utilitas/MEP (JAC)
│           ├── ssw-agriculture-set01.json           <-- 15 items: SSW Pertanian & Peternakan (ASCA)
│           └── ssw-manufacturing-set01.json         <-- 15 items: SSW Manufaktur & Mesin (JAIM/METI)
├── scripts/
│   └── curation/
│       ├── orchestrator.cjs                         <-- Builds, validates & emits all 14 JSON files
│       ├── jlpt-n5.cjs                              <-- N5 curation generator
│       ├── jlpt-n4.cjs                              <-- N4 curation generator
│       ├── jlpt-n3.cjs                              <-- N3 curation generator
│       ├── jlpt-n2.cjs                              <-- N2 curation generator
│       ├── jlpt-n1.cjs                              <-- N1 curation generator
│       ├── jft-a2.cjs                               <-- JFT-Basic A2 curation generator
│       ├── ssw-kaigo.cjs                            <-- SSW Kaigo curation generator
│       ├── ssw-gaishoku.cjs                         <-- SSW Gaishoku curation generator
│       ├── ssw-food-mfg.cjs                         <-- SSW Food Mfg curation generator
│       ├── ssw-doboku.cjs                           <-- SSW Doboku curation generator
│       ├── ssw-kenchiku.cjs                         <-- SSW Kenchiku curation generator
│       ├── ssw-lifeline.cjs                         <-- SSW Lifeline curation generator
│       ├── ssw-agriculture.cjs                      <-- SSW Agriculture curation generator
│       └── ssw-manufacturing.cjs                   <-- SSW Manufacturing curation generator
├── src/
│   └── types/
│       └── exercise.ts                              <-- TypeScript data contracts & schemas
├── tests/
│   └── test-exercise-datasets-integrity.js          <-- Automated regression & integrity test suite
├── docs/
│   ├── DRAFT_LMS_CONSOLIDATION_AND_ROADMAP.md      <-- Dokumen Desain & Roadmap LMS (Decluttering & 7 Pilar)
│   └── EXERCISE_SETS_HANDOVER_BLUEPRINT.md         <-- Dokumen Serah Terima Teknis & Data Contracts (This file)
```

---

## 3. The 14 Golden Sets Catalog

| # | Set ID | Track / Sector | Official Curriculum Reference | Key Focus Areas |
|---|---|---|---|---|
| **01** | `jlpt-n5-set01` | JLPT N5 | JEES/JF Official Guidelines & Minna no Nihongo I (L1..12) | Moji-Goi (Kanji Angka & Arah), Partikel *ni/de/wo*, Star Scramble (Pola Waktu), Dokkai Brosur Toko |
| **02** | `jlpt-n4-set01` | JLPT N4 | JEES/JF Official Guidelines & Minna no Nihongo II (L26..38) | Kanji Transitif/Intransitif, Bentuk Syarat *tara/ba*, Kalimat Pasif/Kausatif, Dokkai Pengumuman Asrama |
| **03** | `jlpt-n3-set01` | JLPT N3 | JEES/JF Official Guidelines & Soumatome / Master N3 | Keigo Dasar (*o-ni naru/itashimasu*), Nuansa Konjungsi (*wake da / hazu da*), Dokkai Email Kantor |
| **04** | `jlpt-n2-set01` | JLPT N2 | JEES/JF Official Guidelines & Shin Kanzen Master N2 | Idiom Bisnis, Tata Bahasa Diskursus (*mono nara / ni kagiite*), Dokkai Editorial & Opini Kerja |
| **05** | `jlpt-n1-set01` | JLPT N1 | JEES/JF Official Guidelines & Shin Kanzen Master N1 | Yojijukugo, Tata Bahasa Filosofis/Sastra (*de are / taru mono*), Dokkai Abstrak & Esai Kritis |
| **06** | `jft-basic-a2-set01` | JFT-Basic A2 | The Japan Foundation *Irodori: Seikatsu no Nihongo* A2 | Can-Do Percakapan Toko & Restoran, Audio Choukai Pengumuman Stasiun, Dokkai Rambu Realia & Sampah |
| **07** | `ssw-kaigo-set01` | SSW Kaigo | MHLW (Kemenkes Jepang) Text: *Kaigo no Kotoba* & K3 | Anatomi Tubuh, Transfer Kursi Roda (*Ijou*), Pencegahan Tersedak, Ulkus Dekubitus, Komunikasi SBAR |
| **08** | `ssw-food-service-set01` | SSW Restoran | OTAFF & MAFF Official Food Service Guide | 7 Alergen Wajib, Sanitasi Suhu Kritis (75°C 1 menit), Pencegahan Norovirus, Omotenashi & Keluhan |
| **09** | `ssw-food-mfg-set01` | SSW Pabrik Makanan | OTAFF & MAFF Food Manufacturing Textbook | Prinsip 5S Pabrik, Air Shower & Zonasi Sanitasi, Metal Detector, Desinfeksi Klorin, Rantai Dingin |
| **10** | `ssw-kensetsu-doboku-set01` | SSW Konstruksi - Sipil | JAC & MLIT Civil Engineering Manual (土木) | Keselamatan Beko & Blind Spot, Penahan Tanah Galian (*Dodome*), Pemadatan Urukan, Sinyal Pemandu (*Yuudouin*) |
| **11** | `ssw-kensetsu-kenchiku-set01` | SSW Konstruksi - Gedung | JAC & MLIT Building Construction Manual (建築) | Perancah (*Ashiba* & *Habaki*), Full-Body Harness 2 Kait (*Nichougake*), Sudut Tangga 75°, Besi Rebar & Bekisting |
| **12** | `ssw-kensetsu-lifeline-set01` | SSW Konstruksi - Utilitas/MEP | JAC & MLIT Utilities & MEP Manual (ライフライン) | Uji Tekan Air (*Suiatsu Shiken*), Kendenki Listrik 0V, Pipa CD Oranye Cor Semen, Water Seal (*Fuusui*), Tanggap Darurat Gas |
| **13** | `ssw-agriculture-set01` | SSW Pertanian | MAFF & ASCA Agriculture Skills Assessment Test | Penyemprotan Pestisida Membelakangi Angin, Bahaya Poros PTO Traktor, Penjarangan Buah (*Tekika*), Biosekuriti Kandang |
| **14** | `ssw-manufacturing-set01` | SSW Manufaktur | METI & JAIM Industrial Machinery Textbook | Mesin Bubut & Larangan Sarung Tangan Kain (*Gunte Kinshi*), Jangka Sorong Nogisu & Mikrometer, E-Stop Jamur Merah, Kotak Merah NG |

---

## 4. TypeScript Schema Contracts Reference

The primary types are defined in [`src/types/exercise.ts`](file:///c:/Users/Timedoor/Downloads/nugget%20nihonggo%20project/nugget-nihongo/src/types/exercise.ts).

### Top-Level Set Container (`ExerciseSet`)
```typescript
export interface ExerciseSet {
  setId: string;              // e.g. "jlpt-n5-set01"
  trackType: 'jlpt' | 'jft' | 'ssw';
  level?: JLPTLevel;          // 'N5' | 'N4' | 'N3' | 'N2' | 'N1' | 'A2'
  sswSectorId?: SSWSectorId;  // e.g. 'ssw-kaigo', 'ssw-kensetsu-doboku'
  title: string;              // e.g. "Set Latihan SSW Kaigo - 01"
  description: string;
  targetUnits: string;        // e.g. "Unit 1 s/d 5: Fondasi Awal"
  totalItems: number;         // 15
  timeLimitMinutes: number;   // 15
  passingScore: number;       // 10 (dari 15)
  items: ExerciseItem[];
}
```

### Individual Question Item (`ExerciseItem`)
```typescript
export interface ExerciseItem {
  id: string;                 // e.g. "JLPT-N5-S01-Q01", "SSW-KG-S01-Q03"
  trackType: ExerciseTrackType;
  level?: JLPTLevel;
  sswSectorId?: SSWSectorId;
  mondaiNumber: number;       // e.g. 1 (Mondai 1)
  mondaiType: MondaiType;     // 'kanji_reading' | 'sentence_star' | 'jft_choukai_cbt' | etc.
  instructionJp: string;      // Petunjuk resmi dalam bahasa Jepang
  instructionId: string;      // Petunjuk ringkas bahasa Indonesia
  prompt: string;             // Kalimat soal
  promptFurigana?: string;    // Opsional: furigana untuk non-orthography questions
  targetWord?: string;        // Kata kunci yang diuji
  options: string[];          // Pilihan jawaban (3 atau 4 opsi)
  correctOptionIndex: number; // 0-based index kunci benar
  
  // Stimulus Khusus
  starScramble?: StarScramblePayload;
  readingPassage?: ReadingPassagePayload;
  choukai?: ChoukaiPayload;
  sswIllustrationUrl?: string;

  // 5-Layer Pedagogical Explanation
  explanation: ExerciseExplanation;
  
  // Linkage ke MateriHub
  curriculumRef: ExerciseCurriculumRef;
}
```

### The 5-Layer Explanation Schema (`ExerciseExplanation`)
```typescript
export interface ExerciseExplanation {
  /** Lapis 1: Rationale ilmiah & gramatikal mengapa opsi benar tepat */
  justification: string;
  
  /** Lapis 2: Bedah mendalam mengapa opsi 1, 2, 3, 4 salah */
  distractorAutopsy: Record<string, string>; // e.g. { "1": "...", "2": "...", ... }
  
  /** Lapis 3: Jembatan keledai / asosiasi lokal khas Sensei Nugget */
  mnemonicSensei: string;
  
  /** Lapis 4: Peringatan jebakan transfer bahasa Indonesia (false friends / asumsi kultural) */
  l1InterferenceAlert: string;
  
  /** Lapis 5: Tautan remedial terarah ke modul MateriHub */
  remedialPrescription: {
    unitId: string;
    unitNumber: number;
    unitTitleId: string;
    lessonId?: string;
    vocabId?: string;
    grammarId?: string;
    advice: string;
  };
  
  /** Khusus SSW: Tips keselamatan kerja lapangan K3 */
  safetyTip?: string;
}
```

---

## 5. UI/UX Interaction Design Guidelines for Front-End Developers

### A. Dual Scaffolding Modes
1. **Mode Latihan Mandiri (Guided Practice)**:
   - Waktu tidak dibatasi (untimed timer berjalan maju).
   - Umpan balik seketika (*instant feedback*) begitu opsi diklik atau tombol "Periksa" ditekan.
   - Penjelasan 5 lapis langsung terbuka di bawah kartu soal dengan animasi akordeon lembut.
   - Audio listening dapat diputar ulang tanpa batas untuk melatih telinga.
2. **Mode Ujian Resmi CBT (Strict Exam)**:
   - Penghitung waktu mundur 15:00 menit (*countdown timer*) yang berubah kuning di menit ke-3 dan merah di menit ke-1.
   - Umpan balik ditangguhkan (*delayed feedback*): lembar pembahasan baru muncul setelah sesi disubmit atau waktu habis.
   - Audio listening dibatasi maksimal **2x pemutaran** (indikator: `Pemutaran: 1/2`, `2/2`, lalu disable).
   - *Review Drawer* (laci navigasi 15 nomor) untuk melihat status soal: Terjawab (hijau), Ragu-ragu (kuning), Belum dijawab (abu-abu).

### B. Special Interactive Widgets
1. **Star Scramble (★ Susun Kalimat - Mondai 2)**:
   - Render 4 token kata acak di baris bank kata.
   - Sediakan 4 slot kosong bergaris di kalimat soal dengan slot berikon bintang (★) di posisi `starPosition`.
   - Dukung interaksi:
     - Klik token untuk memasukkan ke slot kosong berikutnya.
     - Klik slot terisi untuk mengembalikan token ke bank kata.
     - Drag-and-drop antar slot untuk menukar urutan.
   - Opsi jawaban A, B, C, D di bawahnya secara otomatis memilih kata yang berada tepat di slot bintang (★).
2. **Dokkai Passage (Mondai Dokkai / Realia)**:
   - Pada layar desktop/tablet: Layout split-screen berdampingan (kiri: teks bacaan/email/tabel realia; kanan: soal dan pilihan opsi).
   - Pada layar ponsel kecil: Teks bacaan ditampilkan dalam kartu yang bisa di-expand/collapse atau *sticky top preview* agar siswa tidak kehilangan konteks bacaan saat memilih opsi.
3. **Choukai Audio Player**:
   - Player audio minimalis dengan visualizer gelombang audio (waveform SVG).
   - Tombol Play/Pause besar (minimal 48px).
   - Badge kuota pemutaran (`2 pemutaran tersisa`).
   - Teks transkrip audio (script Ja/En/Id) **disembunyikan saat kuis berlangsung** dan hanya dibuka pada lembar pembahasan hasil evaluasi.
4. **Pembahasan 5 Lapis (Result & Explanations Accordion)**:
   - Pisahkan 5 lapis dalam tab atau kartu berikon warna khas:
     - 🟢 **Lapis 1 (Kunci Benar)**: Background hijau lembut (`bg-emerald-50 dark:bg-emerald-950/30`), teks emerald tebal.
     - 🔴 **Lapis 2 (Bedah Opsi Salah)**: Daftar bullet per opsi A, B, C, D dengan penanda silang merah.
     - 💡 **Lapis 3 (Mnemonik Sensei Nugget)**: Background amber/emas (`bg-amber-50 dark:bg-amber-950/30`) dengan avatar maskot Nugget.
     - ⚠️ **Lapis 4 (Peringatan L1 Indonesia)**: Banner peringatan oranye (`bg-orange-50 border-orange-300`) menjelaskan jebakan bahasa ibu.
     - 📘 **Lapis 5 (Preskripsi Remedial)**: Kartu biru dengan tombol aksi langsung: `Buka Materi: [Judul Unit] ->`.

---

## 6. Client-Side State & Storage Architecture

Front-end developers should maintain state using Zustand with IndexedDB persistence:

```typescript
// Proposed Store Structure in src/stores/exerciseStore.ts

interface ExerciseSessionState {
  currentSet: ExerciseSet | null;
  mode: 'guided' | 'strict';
  currentIndex: number; // 0..14
  answers: Record<number, number>; // questionIndex -> selectedOptionIndex
  flagged: Set<number>; // questionIndices marked for review
  remainingSeconds: number; // 900 -> 0
  audioReplaysLeft: Record<number, number>; // questionIndex -> 2..0
  isSubmitted: boolean;
  score: {
    correct: number;
    total: number;
    percentage: number;
    passed: boolean;
  } | null;
  
  // Actions
  loadSet: (setId: string, mode: 'guided' | 'strict') => Promise<void>;
  selectOption: (questionIndex: number, optionIndex: number) => void;
  toggleFlag: (questionIndex: number) => void;
  decrementTimer: () => void;
  consumeAudioReplay: (questionIndex: number) => boolean;
  submitSession: () => void;
  resetSession: () => void;
}
```

### IndexedDB Sync Contract
Upon submission:
- Simpan record hasil latihan ke object store `exercise_records`.
- Update best score, total attempt, dan tanggal pengerjaan terakhir.
- Catat ID soal yang salah (`wrongItemIds`) ke dalam bank review remedial agar Sensei Nugget tutor dapat merekomendasikan latihan ulang terarah.

---

## 7. Verification & Quality Assurance

To verify that all 14 datasets maintain schema and pedagogical integrity at any time, run:

```powershell
node tests/test-exercise-datasets-integrity.js
```

### Expected Output
```
===============================================================
🧪 TEST SUITE: 14 GOLDEN EXERCISE SETS DATASET INTEGRITY
===============================================================
✅ PASS 01: Manifest exists and confirms 14 sets with 210 authentic questions.
✅ PASS 02: [jlpt-n5-set01] Verified 15/15 items with complete 5-layer pedagogical explanations.
...
✅ PASS 15: [ssw-manufacturing-set01] Verified 15/15 items with complete 5-layer pedagogical explanations.
---------------------------------------------------------------
🎯 TOTAL ITEMS VERIFIED: 210 / 210
⭐ Star Scrambles Verified: 9
📖 Dokkai Passages Verified: 13
🎧 Choukai Audio Drills Verified: 4
🎉 ALL INTEGRITY CONTRACTS STRICTLY SATISFIED! ZERO ERRORS!
===============================================================
```

---

## 8. Handover Prompts for the Next Front-End Implementation Chat

When opening the new chat session to develop the UI/UX components and LMS integration, paste the following kick-off brief to resume immediately without context loss:

```markdown
Halo! Di sesi sebelumnya, kita sudah menyelesaikan seluruh kurasi data 14 Golden Sets (Set 01) untuk Nugget Nihongo:
- 210 soal otentik (JLPT N5..N1, JFT-Basic A2, dan 8 sektor SSW termasuk 3 peminatan Konstruksi).
- 100% soal memiliki penjelasan 5 lapis (Justifikasi, Bedah Opsi, Mnemonik Sensei, Interferensi L1 Indonesia, dan Preskripsi Remedial).
- Seluruh JSON sudah ter-generate di `nugget-nihongo/public/data/exercises/*.json` dan `manifest.json`.
- Typings TypeScript sudah verified di `nugget-nihongo/src/types/exercise.ts`.
- Dokumen desain & roadmap decluttering LMS ada di `nugget-nihongo/docs/DRAFT_LMS_CONSOLIDATION_AND_ROADMAP.md`.
- Blueprint handover teknis & data contracts ada di `nugget-nihongo/docs/EXERCISE_SETS_HANDOVER_BLUEPRINT.md`.

Tugas kita di sesi ini adalah:
1. Mengimplementasikan konsolidasi UI (The 3 Clean Doors) sesuai `DRAFT_LMS_CONSOLIDATION_AND_ROADMAP.md`.
2. Membangun halaman katalog/portal set latihan berdasarkan track (JLPT, JFT, SSW).
3. Membangun layar interaktif kuis (mendukung Guided Practice & Strict Exam 15 menit, Star Scramble susun kalimat, Dokkai split reading, dan Choukai audio limiter 2x).
4. Membangun lembar pembahasan akordeon 5 lapis dengan micro-interactions yang menarik.
5. Menghubungkan state pengerjaan ke Zustand & IndexedDB offline-first (7 pilar engine).

Mari kita mulai dari pembuatan komponen dan routing halaman latihannya!
```

---
*Blueprint ratified and verified for Nugget Nihongo LMS.*
