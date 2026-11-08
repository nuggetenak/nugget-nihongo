# ADR-011: Enterprise Documentation Single Source of Truth & Docs-as-Code Standard
> **Status:** APPROVED · **Tanggal:** 7 November 2026 · **Deciders:** Nugget Nihongo Core Team  
> **Kategori:** Engineering Governance, Knowledge Base, Architecture Documentation

---

## 1. Konteks & Permasalahan
Seiring evolusi Nugget Nihongo melintasi 44 Sprint dan 3 Siklus Audit Forensik (mengelola 10.508 kosakata, 859 tata bahasa, 19 sektor SSW, dan puluhan modal interaktif), dokumentasi teknis mengalami fragmentasi berat (*siloed documentation*):
1. **Peninggalan Claude yang Usang:** Berkas-berkas seperti `CLAUDE.md`, `CLAUDE-CODE-TASKS.md`, snapshot sesi Maret/April 2026, dan direktori `docs/agent-system/` sudah tidak mencerminkan runtime modern Antigravity.
2. **Kekayaan Riset Terkubur di Git Branch:** Cabang `research/curriculum-expansion` dan `research/curriculum-sla-matrix` menyimpan riset fonologi, minimal pairs, dan pedagogi SSW yang tidak tertaut ke dokumen utama.
3. **Ketiadaan Peta Navigasi Arsitektur:** Developer maupun agen AI harus membaca ribuan baris kode untuk mencari dependensi fitur atau letak modal tertentu.

---

## 2. Keputusan Arsitektur (*Decision*)
1. **Pengarsipan Total Jejak Claude:**
   - Seluruh berkas peninggalan era Claude dipindahkan secara terisolasi ke:  
     📁 `docs/archive/legacy-claude/`
   - Berkas sampah 0-byte (`_contributing.md`, `_sections.md`, `_template.md`) dan worker lawas di `.agents/teamwork/` dihapus bersih.
2. **Pembakuan Antigravity Engineering Standards:**
   - Menetapkan [`AGENTS.md`](../../AGENTS.md) sebagai piagam operasional native di root repositori.
3. **Penyatuan ke 7 Pilar Enterprise Knowledge Base (`docs/`):**
   - `01-product-and-mission/`: Piagam visi, misi, persona, dan roadmap.
   - `02-architecture-and-systems/`: Arsitektur PWA, Service Worker, FSRS v4.5, dan CAT 3PL.
   - `03-pedagogy-and-curriculum/`: Kurikulum N5..N1, silabus kanonikal, dan analisis L1.
   - `04-design-system-and-brand/`: Pedoman Warm Editorial Hybrid dan 8 Nippon Colors.
   - `05-data-corpus-and-schemas/`: Skema JSON kosakata, tata bahasa, kanji, dan Supabase.
   - `06-qa-and-verification-contracts/`: Kontrak pengujian 44 sprint dan regulasi multi-device.
   - `07-architecture-decisions-adr/`: Rekam jejak keputusan arsitektur (ADR-001 s/d ADR-011).
4. **Peta Navigasi Hierarki Tunggal:**
   - Menetapkan [`docs/PROJECT_ARCHITECTURE_MAP.md`](../PROJECT_ARCHITECTURE_MAP.md) sebagai acuan navigasi instan satu detik untuk seluruh modul, state store, modal portal, dan berkas pengujian.
5. **Rilis Flagship v22.0.0:**
   - Mengonsolidasikan 250 tiket audit forensik ke dalam Patch Notes resmi dan changelog otomatis.

---

## 3. Konsekuensi & Dampak
- **Positif:** Mengeliminasi 100% kebingungan navigasi kode, menjaga repositori bersih dan berstandar Enterprise Big Tech, serta memastikan riset pedagogis dan keputusan arsitektur tidak akan pernah terlupakan.
- **Kepatuhan:** Seluruh pengembang dan AI agent wajib merujuk ke `docs/PROJECT_ARCHITECTURE_MAP.md` dan mematuhi 4 aturan mutlak di `AGENTS.md`.
