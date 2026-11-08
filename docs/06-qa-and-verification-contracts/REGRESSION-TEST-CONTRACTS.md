# 🛡️ Kontrak Pengujian Regresi Kumulatif & Jaminan Mutu (QA Contracts)
> **Nugget Nihongo — Continuous Green Verification Charter**  
> **Status:** 100% HIJAU (Exit Code 0 across Sprints 1–44, Phases 1–5, Cycles I–III)

---

## 1. Tiga Prinsip Mutlak Kontrak Pengujian (Inviolable Principles)
1. **Validasi Perilaku Runtime (*Behavioral Contracts Over Literal String Matchers*):**
   - Utamakan menguji output komputasi runtime, fungsi ekspor, properti AST, atau skema data daripada pengujian potongan string harfiah (*brittle string slicing*).
2. **Refaktorisasi Kompatibel Mundur (*Backward-Compatible Refactoring*):**
   - Saat arsitektur ditingkatkan (misal: penambahan animasi atau peningkatan kontras warna), perbarui kontrak asersi sebelumnya agar selaras dengan kontrak baru dan tetap 100% hijau.
3. **Asersi Aditif & Nol Menonaktifkan Tes (*Zero Disabling / Zero Bypassing*):**
   - Seluruh tes historis (Sprint $1 \dots N-1$) WAJIB tetap hijau saat Sprint $N$ selesai.
   - Dilarang keras menonaktifkan, mem-bypass, atau mengomentari pengujian lama demi meluluskan pengujian baru.

---

## 2. Struktur Matriks Pengujian (`tests/`)

```
tests/
├── engines/     <-- Unit test matematika FSRS v4.5, CAT IRT 3PL, Zustand store
├── sprints/     <-- Master cumulative runner (run-sprints-1-to-44.js) & Sprint 1..44
├── curriculum/  <-- Integritas korpus, referensi silabus, dan adapter data
├── modules/     <-- Keigo honorifik, Counter bilangan, Kotowaza, Pitch Accent
├── audits/      <-- Suite verifikasi forensik multi-siklus (Fase 1..5, Siklus II..III)
└── archive/     <-- Berkas runner perantara lawas & tes challenger yang diarsipkan
```

---

## 3. Matriks Lingkup Uji & Verifikasi Sistem

| Kategori Uji | File Runner Utama | Jumlah Butir Asersi | Status Kelulusan |
| :--- | :--- | :---: | :---: |
| **FSRS Memory Engine** | `tests/fsrs-engine.test.js` | 7 Butir | **100% HIJAU ✅** |
| **CAT IRT 3PL Adaptive** | `tests/cat-engine.test.js` | 6 Butir | **100% HIJAU ✅** |
| **Zustand State Stores** | `tests/stores.test.js` | 8 Butir | **100% HIJAU ✅** |
| **Sprints 1–44 Cumulative** | `tests/run-sprints-1-to-44.js` | 44 Sprint File | **100% HIJAU ✅** |
| **Persona Multi-Device** | `scripts/run-persona-simulations.js` | 200 Profil | **100% HIJAU ✅** |
| **Integritas Korpus Kurikulum** | `tests/test-curriculum.js` | 5 Level N5–N1 | **100% HIJAU ✅** |
| **Siklus I (Pass 1–15)** | `tests/test-pass1..6.js` | 115 Cacat | **100% HIJAU ✅** |
| **Siklus II (Pass 1–15)** | `tests/test-s2-pass1..15.js` | 75 Cacat | **100% HIJAU ✅** |
| **Siklus III (Pass 1–12)** | `tests/test-s3-pass1..12.js` | 60 Cacat | **100% HIJAU ✅** |
| **TOTAL SISTEM** | `npm test` | **75.136+ Asersi** | **100% HIJAU (Exit Code 0) 🎉** |

---

## 4. Eksekusi Pengujian Mandiri
```powershell
# Menjalankan seluruh suite pengujian master
npm test

# Menjalankan verifikasi tipe statis TypeScript
npm run typecheck

# Menjalankan uji ketahanan responsif multi-device
npm run test:responsive

# Memverifikasi sinkronisasi versi aplikasi
npm run check:version
```
