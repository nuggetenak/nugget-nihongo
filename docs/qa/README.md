# 🏛️ Nugget Nihongo — QA & Testing Architecture Hub

Selamat datang di repositori dokumentasi Quality Assurance (QA), Reliability Engineering, dan Data Quality Assurance untuk **Nugget Nihongo**.

Dokumen ini disusun sesuai mandat eksekutif di [`MASTER_ENGINEERING_DIRECTIVE.md`](./MASTER_ENGINEERING_DIRECTIVE.md) dan mencakup 16 disiplin pengujian perangkat lunak modern serta penjaminan mutu data linguistik bahasa Jepang.

---

## 📚 Indeks Dokumentasi QA

| Dokumen | Deskripsi | Status |
|---|---|:---:|
| [**MASTER_ENGINEERING_DIRECTIVE.md**](./MASTER_ENGINEERING_DIRECTIVE.md) | Arahan utama, mandat 16 disiplin QA, dan batasan operasional non-negosiasi. | 🔒 Locked |
| [**REPOSITORY_TESTING_INVENTORY.md**](./REPOSITORY_TESTING_INVENTORY.md) | Inventaris lengkap 198 berkas uji, 157 suite regresi orkestrasi, dan script pendukung. | ✅ Verified |
| [**TEST_QUALITY_AUDIT.md**](./TEST_QUALITY_AUDIT.md) | Audit keandalan, eliminasi string matcher rapuh, dan evolusi ke behavioral contracts. | ✅ Verified |
| [**FEATURE_TEST_TRACEABILITY.md**](./FEATURE_TEST_TRACEABILITY.md) | Matriks ketertelusuran fitur (Requirements ➔ Implementasi ➔ Suite Uji). | ✅ Verified |
| [**QA_ARCHITECTURE.md**](./QA_ARCHITECTURE.md) | Arsitektur pengujian piramida multi-lapisan, orchestrator, dan CI gates. | ✅ Verified |
| [**DATA_QUALITY_STANDARDS.md**](./DATA_QUALITY_STANDARDS.md) | Standar mutu data JLPT, JFT, SSW 19 Sektor, kanji stroke, fonetik HVPT, dan furigana. | ✅ Verified |
| [**TEST_EXECUTION_GUIDE.md**](./TEST_EXECUTION_GUIDE.md) | Panduan eksekusi perintah pengujian lokal, multi-platform PowerShell/Bash, dan CI. | ✅ Verified |
| [**REGRESSION_POLICY.md**](./REGRESSION_POLICY.md) | Kebijakan regresi kumulatif: Invariant zero-disabling, backward-compatibility, dan gate exit 0. | ✅ Verified |
| [**RELEASE_READINESS.md**](./RELEASE_READINESS.md) | Kriteria rilis siap produksi (Production Release Gate) berbasis bukti empiris. | ✅ Verified |
| [**QA_BACKLOG.md**](./QA_BACKLOG.md) | Daftar backlog pemeliharaan jangka panjang dan peningkatan cakupan pengujian. | ✅ Verified |
| [**reports/MASTER_FINAL_EXECUTION_REPORT.md**](./reports/MASTER_FINAL_EXECUTION_REPORT.md) | Laporan eksekusi final 157/157 suite regresi 100% GREEN dan simulasi 200 Persona. | 🌟 Complete |

---

## ⚡ Ringkasan Perintah Uji Cepat

```bash
# 1. Jalankan Seluruh Master Regression Orchestrator (157 Suites, Exit 0)
node tests/master-regression-orchestrator.js

# 2. Jalankan Simulasi 200 Persona Pemelajar Indonesia
npm run test:personas

# 3. Jalankan Kompilasi Data & Validasi Kurikulum
npm run build:curriculum

# 4. Validasi Build Produksi & Audit Chunk Budget (<= 500 kB per chunk)
npm run build
```

---

## 🛡️ Prinsip Utama Rekayasa QA Nugget Nihongo

1. **Behavioral Contracts Over Literal String Matchers**:
   - Memvalidasi perilaku runtime nyata, AST, skema data, dan output komputasi daripada mencocokkan string literal regex yang rapuh terhadap file konfigurasi atau kode UI.
2. **Zero Disabling & Additive Invariants**:
   - Dilarang keras menonaktifkan, mem-bypass, atau meng-comment test masa lalu demi meloloskan fitur baru. Seluruh 157 suite regresi wajib berjalan 100% hijau secara berkesinambungan.
3. **Pemberdayaan Pemelajar Nyata (Human-First)**:
   - Pengujian diverifikasi melintasi spektrum 200 persona pemelajar Indonesia dengan berbagai perangkat: mulai dari Android entry-level 320px, jaringan lemot/offline, hingga tablet dan workstation.
