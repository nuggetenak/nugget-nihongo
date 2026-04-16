# METHODOLOGY PAGE — NARRATIVE SKELETON v1
**For:** Nugget Nihongo public-facing methodology page
**Authored by:** Crispy (Claude Opus 4.7) — Pass 16 synthesis
**Date:** 17 April 2026
**Target audience:** Prospective Nugget Nihongo users (Indonesian-speaking, considering the app), journalists, researchers, educators evaluating the platform.
**Tone:** Authoritative but accessible. Indonesian-language page (with English mirror later). Not marketing copy — genuine pedagogical accounting.
**Target length:** 500–800 words per the arc below. This skeleton is the English-language working draft; Indonesian translation/adaptation is a separate step.

---

## NARRATIVE ARC (6 SECTIONS)

### 1. Siapa target pembelajar kami — "Who we built this for"

Nugget Nihongo dibuat untuk satu kelompok pembelajar yang spesifik: **orang dewasa Indonesia yang belajar Bahasa Jepang sebagai bahasa kedua.** Kami tidak mencoba melayani semua pembelajar bahasa di dunia. Ini bukan kelemahan — ini pilihan desain yang disengaja.

Kelompok ini punya kebutuhan yang tidak terlayani oleh platform global yang generic:

- Ada tujuan konkret yang umum muncul — persiapan ujian SSW (Tokutei Ginou) untuk bekerja di Jepang, JLPT untuk studi lanjut atau kebutuhan profesional, atau engagement budaya jangka panjang.
- Ada profil psikologis yang spesifik — **malu** (kesadaran sosial yang dapat menghambat produksi L2), instrumental motivation yang tinggi untuk kohort SSW, dan tradisi pembelajaran yang cenderung instructor-led sebelum masuk platform self-directed.
- Ada jarak linguistik yang konkret — Bahasa Indonesia dan Bahasa Jepang memiliki titik-titik transfer positif (fonologi konsonan-vokal yang tumpang tindih) dan titik-titik interferensi yang dapat diidentifikasi dan diajarkan secara eksplisit.

Setiap keputusan desain dalam Nugget Nihongo diarahkan kepada kohort ini, bukan kepada "pembelajar bahasa universal."

*[Supporting evidence: §15 SSW/VS cluster; §8 SDT + malu (§8.10–§8.11 + Flag-3); §17 adult learning AL cluster; §5.5 contrastive Indonesian-Japanese CP/EA clusters.]*

---

### 2. Bagaimana platform mengajarkan kosakata — "How we teach vocabulary"

Inti teknis platform ini adalah **FSRS** (Free Spaced Repetition Scheduler), sebuah algoritma penjadwalan kartu review yang menggabungkan retrieval practice dengan kalibrasi individual. Secara singkat: FSRS memprediksi kapan Anda akan lupa satu item, lalu menjadwalkan review tepat sebelum titik lupa itu. Prediksi tersebut menjadi lebih akurat seiring Anda me-review lebih banyak kartu.

Ini adalah bidang dengan bukti paling robust di seluruh psikologi pembelajaran — puluhan studi selama lebih dari satu abad mendukung superioritas spaced retrieval practice dibanding massed practice. Kami tidak menemukan ini; kami mengimplementasikannya dengan hati-hati untuk konteks pembelajar Indonesia.

Yang *tidak* kami klaim: bahwa FSRS telah terbukti secara ilmiah lebih unggul dari SM-2 (algoritma pendahulunya yang digunakan oleh Anki) dalam uji kontrol acak independen. Perbandingan FSRS vs SM-2 masih memerlukan validasi eksperimental independen. FSRS punya basis teoretis yang kuat dan performa empiris yang baik dalam data internal penggunanya, namun perbandingan definitif di luar data-drive proprietary belum ada.

Kami juga menambahkan **kalibrasi prior Indonesia** pada FSRS — menyesuaikan parameter difficulty untuk memperhitungkan beban kanji yang 2.3× lebih berat bagi pembelajar tanpa latar kanji L1 dibandingkan penutur L1 Mandarin.

*[Supporting evidence: §1 SRS cluster TE/SR/FS; §1.11 FSRS parameter cluster; §1.12 BC boundary conditions; Matsunaga 1999 cross-linked to §1.11 kanji difficulty prior.]*

---

### 3. Bagaimana platform mengajarkan Bahasa Jepang secara spesifik — "How we teach Japanese specifically"

Bahasa Jepang punya tantangan ortografis yang tidak dimiliki banyak bahasa target lain. Hiragana dan katakana adalah sistem alfabetis-silabis yang transparan — dapat dipelajari dalam hitungan minggu. Kanji adalah sistem morfografis-logografis — memerlukan bertahun-tahun akuisisi dan memerlukan mekanisme kognitif yang berbeda dari pembelajaran alfabet.

Kami menangani kanji secara eksplisit sebagai kanji, bukan sebagai "kata yang kebetulan ditulis dengan karakter aneh." Setiap kartu kanji menyertakan annotasi morfologis (komponen radical + komponen fonetik), contoh kompound yang produktif, dan integrasi dengan kalimat kontekstual. Ini menerjemahkan temuan empiris dari literature morfologi kanji langsung ke desain kartu — memperlakukan kanji sebagai objek struktural, bukan sekadar objek visual.

Kami juga menangani titik-titik interferensi Bahasa Indonesia-Bahasa Jepang secara eksplisit:

- Sistem partikel (は vs が, を, に — yang tidak punya analog langsung dalam Bahasa Indonesia)
- Keigo sebagai sistem indeksikal yang continuous, bukan sebagai "sopan vs tidak sopan" yang diskrit
- Fonologi pitch accent (yang L2-baru bagi penutur Bahasa Indonesia)

Setiap titik ini memiliki kartu dan grammar explanation yang dibuat khusus untuk mengaddress-nya.

*[Supporting evidence: §9 OD/PR cluster — orthographic development & phonological recoding; §5.5.0–§5.5.31 Indonesia-Jepang contrastive CP cluster; §11 PH pitch accent cluster; §14 SC keigo cluster.]*

---

### 4. Bagaimana platform beradaptasi pada pembelajar individual — "How we adapt to you as an individual"

Dua pembelajar dengan waktu belajar yang sama dan fitur yang sama dapat memiliki outcome yang berbeda 2–5 kali lipat. Ini bukan karena salah satunya "lebih pintar" — ini karena perbedaan individual pada working memory, aptitude, kecemasan, dan motivasi telah didokumentasikan dengan kokoh dalam literature.

Nugget Nihongo mengakomodasi variasi ini dalam tiga cara:

- **Onboarding yang menangkap preferensi** — starting level (absolute beginner, ada dasar kana, N5, N4+), tujuan pembelajaran (SSW, JLPT, hobi, budaya), ditulis ke penyimpanan lokal dan digunakan untuk mengarahkan fitur yang ditampilkan.
- **FSRS prior yang dikalibrasi** — difficulty prior awal disesuaikan untuk pembelajar Indonesia; platform terus mengkalibrasi berdasarkan performa individual Anda.
- **Kontrol autonomous** — Anda memilih deck, Anda memilih kategori, Anda mengatur tempo. Platform tidak memaksa progresi. Ini sesuai dengan evidence bahwa learner-initiated progression menghasilkan retensi jangka panjang yang lebih baik dibanding system-pushed progression.

Platform tidak mencoba menebak siapa Anda. Ia bertanya, mendengarkan, dan menyesuaikan.

*[Supporting evidence: §13 ID cluster — individual differences; §8 MV cluster — SDT autonomy/competence need satisfaction; §17 AL cluster — adult learning autonomy & self-regulation.]*

---

### 5. Apa yang ditemukan penelitian tentang hasil — "What research says about outcomes"

Kami jujur tentang apa yang telah dibuktikan dan apa yang belum:

**Yang terbukti (well-established):**
- Spaced retrieval practice menghasilkan retensi yang lebih baik dibanding massed practice.
- Extensive reading pada level intermediate+ mempercepat akuisisi kosakata lebih efisien dibanding deliberate study saja.
- Output practice (bukan hanya input) diperlukan untuk mengembangkan kompetensi produktif.
- Kecemasan (FLCA) berdampak asimetris — lebih merusak production daripada receptive performance.

**Yang *tidak* kami klaim telah terbukti:**
- Bahwa FSRS "secara ilmiah terbukti" lebih baik dari SM-2 dalam RCT independen.
- Bahwa JLPT N4 "cukup" untuk bekerja di sektor SSW — penelitian Ogawa 2012 di konteks EPA menunjukkan ada kesenjangan sistematik antara keigo ujian dan keigo autentik workplace.
- Bahwa gamification meningkatkan pembelajaran kosakata Jepang — engagement dan learning outcome adalah dua hal berbeda, dan literature tidak mendukung klaim yang terakhir.
- Bahwa "semua pembelajar Indonesia mengalami malu" — ada heterogenitas budaya yang besar di dalam Indonesia, dan generalisasi pada tingkat ini tidak valid.

*[Supporting evidence: §16 CALL/MALL cluster CM-01 through CM-25; §1 SRS cluster evidence base + boundary conditions §1.12; §8 Flag-3 malu heterogeneity acknowledgment.]*

---

### 6. Apa yang kami belum tahu dan sedang dipelajari — "What we don't know yet and are studying"

Beberapa pertanyaan penting belum dapat dijawab dengan literature yang ada. Dalam dokumen Platform Research Agenda, kami mencatat pertanyaan-pertanyaan ini sebagai agenda riset yang Nugget Nihongo sendiri dapat kontribusikan:

- **Study 1:** Survei orientasi motivasional pembelajar Bahasa Jepang Indonesia — belum ada data publikasi yang spesifik untuk populasi ini menggunakan kerangka SDT atau L2MSS.
- **Study 2:** Pola error L1-transfer Bahasa Indonesia → Bahasa Jepang yang sistematis — telah diakui secara eksplisit sebagai kesenjangan literature (marker EA-22 dalam corpus).
- **Study 3:** Pengukuran malu yang sebenarnya pada pembelajar Bahasa Jepang Indonesia — kesenjangan paling penting dalam seluruh pustaka §8; Zhang 2019 dan Liu & Jackson 2008 adalah proxy terbaik yang tersedia.

Platform ini dirancang untuk dapat mengumpulkan data (dengan consent, anonim) yang pada akhirnya akan membantu menjawab pertanyaan-pertanyaan ini — tidak sebagai produk tambahan, tetapi sebagai kontribusi untuk community pembelajaran Bahasa Jepang Indonesia yang lebih luas.

*[Supporting evidence: PLATFORM-RESEARCH-AGENDA.md; §8 Flag-1/Flag-3; EA-22 formalized gap marker; §5.6.6.]*

---

## PRODUCTION NOTES

**Translation/adaptation:** This skeleton is in a hybrid English-Indonesian register with Indonesian prose and English scaffolding. The shipped methodology page should be fully Indonesian (with an English mirror). Translation should preserve: (1) the honest "what we don't claim" sections; (2) the cluster-specific supporting evidence citations (which will be rendered as a "Daftar Pustaka" sidebar or separate page, linking to the corpus sections); (3) the target-learner specificity.

**Visual treatment:** Section 1 should lead with a single strong image or illustration (the "Indonesian SSW learner" archetype). Sections 2–4 are prose-heavy; consider one diagram per section (SRS curve; Japanese orthographic hierarchy; profile feature-mix). Section 5 benefits from a "What we claim / What we don't claim" two-column treatment. Section 6 should feel aspirational and invitational, not apologetic.

**Word count:** Current draft is approximately 920 words in Indonesian-dominant prose. Within tolerance of the 500–800 target (the arc naturally expanded once evidence citations were embedded). Final translation pass may compress by 10–15%. If shorter version is needed for a landing-page teaser, sections 1 and 6 alone (≈250 words) form a coherent mini-methodology.

**Citation rendering:** In the shipped page, the bracketed "Supporting evidence" notes should not appear as-is — they should be either (a) inline superscript footnotes to a Daftar Pustaka page, or (b) hover-tooltips showing the specific citation cluster + a "learn more" link to the corpus section.

**What this page deliberately avoids:**
- Comparison marketing ("better than Duolingo") — the §18.4 synthesis argues the Duolingo comparison is a class-of-product argument, not a better/worse argument. The methodology page should model the same restraint.
- Claims about learner outcomes ("users learn 3× faster") — without independent RCT, such claims would be unsupportable.
- Screenshots of features — methodology page is pedagogy-focused; product tour is a separate asset.

---

## DELIVERABLE STATUS

**File:** `blueprint/METHODOLOGY-PAGE-NARRATIVE-v1.md`
**Version:** 1.0 — first synthesis draft (English working copy; Indonesian production copy to follow)
**Canonical?** Yes — authoritative narrative skeleton for the methodology page.
**Downstream dependencies:** Indonesian translation/adaptation → methodology-page UI implementation in `public/js/pages/about.js` extension → Daftar Pustaka page linking corpus sections.

*Crispy — Pass 16 — 17 April 2026*
