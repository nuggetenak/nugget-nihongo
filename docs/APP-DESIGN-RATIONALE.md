# NUGGET NIHONGO — APP DESIGN & DEVELOPMENT RATIONALE HANDBOOK
## Master Architecture Decision Summary & Engineering Rationale (v16.0 / Corpus v30)

**Tujuan Dokumen:**  
Dokumen ini berfungsi sebagai buku panduan resmi arsitektur rekayasa perangkat lunak dan keputusan desain UX/UI Nugget Nihongo. Setiap komponen antarmuka, formula algoritma FSRS, struktur database, dan batasan sesi dalam aplikasi ditautkan secara langsung ke basis bukti ilmiah Second Language Acquisition (SLA), psikolinguistik, dan Cognitive Load Theory (CLT).

---

## 1. STRUKTUR ARSITEKTUR KEPUTUSAN (ADR INDEX)

Seluruh keputusan teknis dan pedagogis diorganisasikan ke dalam 8 Architecture Decision Records (ADR) modular:

| ADR ID | Judul Keputusan Arsitektur | Landasan Teoretis Utama | Domain Masalah yang Diselesaikan | Berkas Spesifikasi Detail |
|---|---|---|---|---|
| **ADR-001** | **Mobile PWA, Offline-First, & Low-Bandwidth** | Stockwell (2010), Kukulska-Hulme (2009), Burston (2014) | Keterbatasan sinyal asrama, kuota seluler, dan spesifikasi ponsel Android kelas bawah pekerja migran. | [`docs/adr/ADR-001-PWA-OFFLINE-FIRST-AND-LOW-BANDWIDTH.md`](file:///c:/Users/Timedoor/Downloads/nugget%20nihonggo%20project/nugget-nihongo/docs/adr/ADR-001-PWA-OFFLINE-FIRST-AND-LOW-BANDWIDTH.md) |
| **ADR-002** | **Dual-Track FSRS & Latency Confidence Weighting** | Ye et al. (2024), Vidal (2011), Mory (2004), Matsunaga (1999) | Disosiasi pengenalan visual kanji vs penguraian wicara alami, serta koreksi kecepatan reflek retrieval. | [`docs/adr/ADR-002-DUAL-TRACK-FSRS-AND-LATENCY-TUNING.md`](file:///c:/Users/Timedoor/Downloads/nugget%20nihonggo%20project/nugget-nihongo/docs/adr/ADR-002-DUAL-TRACK-FSRS-AND-LATENCY-TUNING.md) |
| **ADR-003** | **Affective Filter Lowering & "Malu" Mitigation** | Horwitz et al. (1986), Zhang (2019), Markus & Kitayama (1991) | Sindrom malu sosial, kecemasan timer kuis, dan keengganan mencoba akibat leaderboard publik. | [`docs/adr/ADR-003-AFFECTIVE-FILTER-AND-MALU-MITIGATION.md`](file:///c:/Users/Timedoor/Downloads/nugget%20nihonggo%20project/nugget-nihongo/docs/adr/ADR-003-AFFECTIVE-FILTER-AND-MALU-MITIGATION.md) |
| **ADR-004** | **Multimedia CLT & Content-Intrinsic Visuals** | Sweller (1988), Mayer (2021), Paivio (1986), Garner et al. (1989) | Beban kognitif berlebih (*seductive details*), split-attention gambar-teks, dan distraksi maskot. | [`docs/adr/ADR-004-MULTIMEDIA-CLT-AND-CONTENT-INTRINSIC-VISUALS.md`](file:///c:/Users/Timedoor/Downloads/nugget%20nihonggo%20project/nugget-nihongo/docs/adr/ADR-004-MULTIMEDIA-CLT-AND-CONTENT-INTRINSIC-VISUALS.md) |
| **ADR-005** | **Progressive Furigana Degradation & Orthography** | Chikamatsu (1996), Perfetti & Tan (1998), Carver (1994) | Ketergantungan kronis huruf romaji dan transisi mulus menuju pembacaan kanji otentik tanpa furigana. | [`docs/adr/ADR-005-PROGRESSIVE-FURIGANA-DEGRADATION.md`](file:///c:/Users/Timedoor/Downloads/nugget%20nihonggo%20project/nugget-nihongo/docs/adr/ADR-005-PROGRESSIVE-FURIGANA-DEGRADATION.md) |
| **ADR-006** | **Global Database & Curated Lens Architecture** | Nation (2007), Webb (2007), Pienemann (1998) | Fragmentasi progres belajar antara buku teks (Minna/Irodori) vs jalur JLPT dan duplikasi data. | [`docs/adr/ADR-006-GLOBAL-DATABASE-AND-LENS-ARCHITECTURE.md`](file:///c:/Users/Timedoor/Downloads/nugget%20nihonggo%20project/nugget-nihongo/docs/adr/ADR-006-GLOBAL-DATABASE-AND-LENS-ARCHITECTURE.md) |
| **ADR-007** | **Indonesian L1 Diagnostic Interference** | Maarif (2021, 2023), Alifah et al. (2020), Prihantoro et al. (2024) | Fosilisasi kesalahan transfer negatif khas Indonesia (kolisi に/で, が/を, kata pinjaman, klausa relatif). | [`docs/adr/ADR-007-INDONESIAN-L1-DIAGNOSTIC-INTERVENTION.md`](file:///c:/Users/Timedoor/Downloads/nugget%20nihonggo%20project/nugget-nihongo/docs/adr/ADR-007-INDONESIAN-L1-DIAGNOSTIC-INTERVENTION.md) |
| **ADR-008** | **SSW Vocational SLA & Gemba K3 Protocols** | Pramesti et al. (2019), Sakamoto et al. (2014), JNIOSH (2020) | Ketiadaan kesiapan komunikasi keselamatan kerja fisik industri (Kaigo, Manufaktur, Konstruksi, Makanan). | [`docs/adr/ADR-008-SSW-VOCATIONAL-SLA-AND-K3-SAFETY-PROTOCOL.md`](file:///c:/Users/Timedoor/Downloads/nugget%20nihonggo%20project/nugget-nihongo/docs/adr/ADR-008-SSW-VOCATIONAL-SLA-AND-K3-SAFETY-PROTOCOL.md) |
| **ADR-009** | **Pedagogical Consolidation & Critique Mitigation** | Pienemann (1998), Sweller (2011), Tarone (1988), NHK (2016) | Mitigasi washback layar ponsel, fatigue FSRS pasca-kerja, substratum bahasa daerah, wacana N2-N1, dan pitch accent. | [`docs/adr/ADR-009-PEDAGOGICAL-CONSOLIDATION-AND-CRITIQUE-MITIGATION.md`](file:///c:/Users/Timedoor/Downloads/nugget%20nihonggo%20project/nugget-nihongo/docs/adr/ADR-009-PEDAGOGICAL-CONSOLIDATION-AND-CRITIQUE-MITIGATION.md) |

---

## 2. PEMETAAN KOMPONEN FRONTEND KE KEPUTUSAN DESAIN

Tabel berikut memetakan komponen utama kode sumber aplikasi di `src/` ke prinsip arsitektur pendukungnya:

### 2.1 Halaman Utama (`src/pages/HomePage.tsx`)
- **Kebun Kata Widget:** Menggantikan leaderboard publik dengan visualisasi pertumbuhan organik (metafora tanaman yang disiram), mengeliminasi *social comparison anxiety* per ADR-003.
- **Daily Review Quick Pill:** Menampilkan kartu FSRS yang jatuh tempo hari ini secara presisi tanpa membebani pembelajar dengan angka ribuan kartu menumpuk (mencegah *backlog paralysis*).
- **Daily Kotowaza:** Memberikan paparan sosiokultural bermakna tinggi (Nation's Strand 1: *Meaning-focused Input*).

### 2.2 Pusat Pembelajaran (`src/pages/MateriHubPage.tsx` & `BookTrackBrowser.tsx`)
- **Segmented Track Switcher (Freeway / JLPT / Buku Teks):** Mengimplementasikan ADR-006 di mana buku teks (Minna no Nihongo, Irodori) berfungsi sebagai *lensa kurasi*, bukan database terpisah.
- **Level Badges & Category Filtering:** Diselaraskan dengan hierarki *Processability Theory* (Tahap 1 Lemma s.d. Tahap 5 Subordinat).

### 2.3 Mesin Kuis & Latihan (`src/lib/quiz/quizEngine.ts` & `src/pages/QuizPage.tsx`)
- **Mode Ujian Formatif Bebas Timer:** Menghilangkan hitung mundur per ADR-003 untuk melatih *deep retrieval processing*.
- **Integrasi Diagnostic Confusion Pairs:** Fungsi `generateDiagnosticQuestions()` mengambil dari 300 butir kanonikal di [`public/data/confusion-pairs.js`](file:///c:/Users/Timedoor/Downloads/nugget%20nihonggo%20project/nugget-nihongo/public/data/confusion-pairs.js) per ADR-007.
- **Penyelarasan Latensi:** Merekam selisih waktu respons milidetik ($\Delta t$) untuk menyesuaikan interval retensi per ADR-002.

### 2.4 Modal Rincian Kata & Tata Bahasa (`src/components/ui/DetailModal.tsx`)
- **Keterdekatan Spasial:** Menempatkan audio player, kanji, arti, nuansa L2d, dan kalimat contoh berdampingan tanpa tab tersembunyi per ADR-004.
- **Degradasi Furigana Adaptif:** Menyesuaikan visibilitas furigana sesuai jenjang aktif pengguna per ADR-005.

---

## 3. FORMULA DAN PARAMETER UTAMA SISTEM

### 3.1 Parameter Default FSRS v4 Adaptif
$$\text{Target Retrievability: } R_{\text{target}} = 0.90$$
$$\text{Prior Kesulitan Kanji Indonesia: } D_0(\text{kanji}) = 7.2 \quad (\text{vs default } 5.0)$$
$$\text{Interval Perdana Kanji: } S_0(\text{kanji}) = 1.2 \text{ hari}$$
$$\text{Penalti Latensi: } \Phi(\Delta t) = \max\left(0.5, \, 1.0 - \frac{\Delta t - 1200\text{ ms}}{3000\text{ ms}}\right)$$

### 3.2 Alokasi Empat Untaian Paul Nation (Per Sesi Mikro 7-Menit)
1. **Meaning-focused Input (25% / ~100s):** Paparan kalimat contoh kontekstual & audio alami.
2. **Language-focused Learning (25% / ~100s):** Analisis partikel kasus & dekonstruksi jebakan L1.
3. **Meaning-focused Output (25% / ~100s):** Produksi aktif (pengetikan cloze, susun frasa acak).
4. **Fluency Development (25% / ~100s):** Pengulangan retrieval cepat pada kartu matang ($R \ge 0.90$).

---

## 4. VERIFIKASI & GOVERNANCE
Dokumen ini diverifikasi bersama dengan rangkaian tes otomatis di `tests/run.js` (40.484 asserts lulus) dan sinkron dengan master penelitian di `nugget-nihongo-research/blueprint/DESIGN-DECISION-MASTER-v1.md`.
