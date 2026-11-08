# ADR-009: Pedagogical Consolidation, Critique Mitigation, and Multi-Substratum Architecture

## Status
**APPROVED / ACTIVE** (Implemented in Nugget Nihongo Core v16.1 / Consolidation Sprint)

## Context & Problem Statement
Sintesis kurikulum operasional Nugget Nihongo (JLPT N5–N1 dan 3 sektor vokasional SSW: Kaigo, Food, Construction) telah berhasil diwujudkan dalam format ganda (Syllabus Markdown + Executable Runtime JSON/JS). Namun, audit kritis internal (*internal critical review*) mengidentifikasi lima kerentanan teoretis dan pedagogis yang harus dimitigasi agar sistem tidak mengalami degradasi efektivitas saat digunakan di dunia nyata:

1. **Validasi Teoretis vs Lapangan (*Ex-Ante vs Ex-Post*):** Kurikulum dirancang berdasarkan literatur SLA, namun belum memiliki protokol uji coba empiris terstandar dengan Lembaga Pelatihan Kerja (LPK) serta kalibrasi kelelahan fisik (*fatigue*) pekerja migran pasca-shift kerja.
2. **Washback Effect Layar Ponsel (*Recognition vs Production*):** Format pilihan ganda berisiko melahirkan ilusi pemahaman di mana pembelajar mahir mengetuk opsi di layar tetapi mengalami *speech blockage* saat menghadapi situasi panik di lapangan kerja.
3. **Asumsi Bahasa Indonesia Monolitik:** Menggeneralisasi seluruh pembelajar ke dalam satu profil transfer mengabaikan interferensi fonologis spesifik bahasa daerah (misal: penutur Sunda `/f/` vs `/p/`, penutur Jawa dengan konsonan berat/murmur dan letup glotal, penutur Batak/Timur dengan stres suku kata akhir).
4. **Penurunan Granularitas Wacana N2–N1:** Tingkat mahir N2–N1 menuntut pemahaman wacana makro (*macro-discourse*), pergeseran register formal, dan nuansa kolokasi antarpola, yang tidak memadai jika hanya dilatih menggunakan kalimat lepas (*sentence-level snippets*).
5. **Ketiadaan Pelatihan Aksen Nada (*Pitch Accent*):** Ketiadaan notasi intonasi membuat pembelajar bersuara datar dan rentan salah tafsir pada pasangan homofon kritis (*hashi*, *ame*, *kiki*).

## Empirical SLA & Architecture Grounding
- **Pienemann (1998) & Ellis (2008):** Processability Theory dan instructed SLA menekankan transisi bertahap dari pemrosesan formulaik reseptif menuju produksi mandiri terkontrol.
- **Sweller (2011) Cognitive Load Theory:** Kelelahan kognitif pasca-kerja fisik menurunkan kapasitas memori kerja (*working memory capacity*); kurva retensi FSRS harus mampu mendeteksi dan memitigasi *fatigue penalty*.
- **Tarone (1988) & Odlin (1989):** Language Transfer & Substratum Effects membuktikan bahwa pembelajar L2 dipengaruhi oleh sistem fonologi bahasa pertama primer (L1a daerah) meskipun berkomunikasi formal dalam bahasa nasional (L1b Indonesia).
- **NHK Hatsuon Daijiten (2016):** Standardisasi 4 kontur aksen nada Tokyo (*Heiban [⓪]*, *Atamadaka [①]*, *Nakadaka [②/③]*, *Odaka [④]*) untuk disambiguasi homofon.
- **Sakamoto et al. (2014) & JNIOSH (2020):** Tanggap darurat tempat kerja menuntut refleks verbal <5 detik tanpa bantuan stimulus tertulis (*fading cues*).

## Decision Drivers & Decisions

### 1. Protokol Uji Validasi Pilot LPK & Fatigue-Aware Decay FSRS
- **Kemitraan LPK:** Merumuskan framework uji komparatif 12 minggu antara kohort buku konvensional vs kohort Nugget Nihongo dengan metrik $\Delta$-score pra vs pasca pada diskriminasi fonologi, waktu reaksi K3, dan skor Prometric CBT.
- **Fatigue-Aware Decay:** Memodifikasi kalkulasi FSRS `calculateFSRSReview()` dengan parameter waktu/kelelahan (`isFatigued` atau sesi malam >21:00). Pada kondisi lelah, penalti stabilitas pada rating *Again* diredam dengan faktor redaman $\lambda_{fatigue} = 0.85$ guna mencegah keputusasaan dan efek *malu* (Anti-Malu SLA).

### 2. Panic Simulator Engine & Visual Mora Metronome
- **Cover-Recall-Check (Fading Cues):** Menghilangkan tombol pilihan ganda pada kuis simulasi darurat K3/SBAR. Pembelajar diberi hitungan mundur 5 detik untuk melafalkan tindakan/ujaran secara lantang sebelum membuka kunci jawaban untuk evaluasi mandiri (*Lancar / Ragu / Gagal*).
- **Mora Pacing Guide:** Menyediakan ketukan metronom mora visual (240–300 mora/menit) untuk menstabilkan ritme tuturan tanpa terburu-buru.

### 3. Matriks Substratum Daerah pada Database Diagnostik
- Mengembangkan skema `DiagnosticPair` dengan atribut `l1_substratum`:
  - `sundanese`: Fokus pada distingsi `/f/` vs `/p/` (cth: *fooku* vs *pooku*) dan netralisasi vokal tengah `/u/` vs `/ɤ/`.
  - `javanese`: Fokus pada penekanan konsonan bersuara `[b, d, g]` berat dan pencegahan glottal stop.
  - `batak_eastern`: Fokus pada de-eskalasi stres suku kata akhir menuju durasi mora merata.
  - `general_indonesian`: Transfer sintaksis dan partikel umum (*adalah-copula*, *arimasu-imasu*, *ni-de*).

### 4. Mesin Dekonstruksi Wacana Makro & Matriks Kolokasi N2–N1
- **Choubun Discourse Dissector:** Teks bacaan wacana N2–N1 dipecah ke dalam segmen fungsional teranotasi: *premis*, *antitesis*, *bukti/elaborasi*, dan *kesimpulan/resolusi*.
- **Collocation Nuance Matrix:** Menyediakan perbandingan tabel kontras makna dan syarat distribusi gramatikal untuk pola-pola yang bertetangga dekat.

### 5. Notasi Visual Kontur Nada & Pasangan Homofon Aksen
- Memasukkan notasi kontur nada standar `[⓪, ①, ②, ③, ④]` pada leksikon inti.
- Menambahkan kategori kuis `pitch-accent` khusus untuk pasangan homofon pembeda makna keselamatan dan kehidupan harian.

## Consequences & Verification
- **Positif:** Mengeliminasi lima titik kerentanan kritis, menjamin ketahanan psikologis pembelajar lelah, memperluas akurasi diagnostik hingga ke dialek daerah, dan memperkuat kompetensi lisan nyata.
- **Kompatibilitas:** Seluruh penambahan bersifat aditif (*non-breaking*), mempertahankan 100% kelulusan unit test dan zero-bundle bloat pada arsitektur offline PWA.
- **Pemetaan Keputusan:** Melengkapi Master Design Decisions DD-001 s.d. DD-123.
