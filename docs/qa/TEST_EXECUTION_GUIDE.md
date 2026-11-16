# ⚙️ Test Execution Guide — Nugget Nihongo

Panduan komprehensif menjalankan rangkaian pengujian di berbagai platform (Windows PowerShell, Command Prompt, macOS, Linux).

---

## 1. Menjalankan Master Regression Orchestrator (157 Suites)

### Windows PowerShell:
```powershell
cd nugget-nihongo
node tests/master-regression-orchestrator.js
```

### Linux / macOS:
```bash
cd nugget-nihongo
node tests/master-regression-orchestrator.js
```

> [!NOTE]
> Seluruh 157 suite pengujian regresi dijalankan secara berurutan dengan output warna, penghitungan durasi per-suite, dan exit code `0` untuk kelulusan 100%.

---

## 2. Menjalankan Simulasi 200 Persona Pemelajar Indonesia

```bash
cd nugget-nihongo
npm run test:personas
```
Perintah ini mengeksekusi simulasi 200 persona pemelajar dengan perangkat beragam (Android entry-level 320px, tablet, workstation) melintasi 4 pilar kurikulum.

---

## 3. Menjalankan Kompilasi Data & Pemeriksaan Korpus

```bash
cd nugget-nihongo
npm run build:curriculum
```
Mengkompilasi seluruh dataset kurikulum N5, N4, N3, N2, N1, kosakata terpadu, dan inventaris diagnostik L1.

---

## 4. Menjalankan Kompilasi Bundle Produksi & Verifikasi Budget

```bash
cd nugget-nihongo
npm run build
```
Menjalankan sinkronisasi changelog, pengujian pra-build, kompilasi Vite production, dan verifikasi batas ukuran chunk (`<= 500 kB`).

---

## 5. Menjalankan Pengujian Spesifik Secara Mandiri

Setiap file di `tests/` dapat dijalankan secara langsung tanpa ketergantungan:
```bash
# Contoh: Menguji FSRS Engine murni
node tests/test-fsrs.js

# Contoh: Menguji Siklus V Pass 45 Ergonomi Multi-Device
node tests/test-s5-pass45-ergonomics-targets.js

# Contoh: Menguji Sprint 16 Release Readiness
node tests/test-s7-sprint16-release-readiness.js
```
