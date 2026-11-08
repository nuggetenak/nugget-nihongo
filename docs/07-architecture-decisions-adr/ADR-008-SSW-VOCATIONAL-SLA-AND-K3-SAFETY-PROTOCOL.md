# ADR-008: SSW Vocational SLA, Gemba K3 Emergency Protocols, and SBAR Reporting

## Status
**APPROVED / ACTIVE** (Implemented in Nugget Nihongo Core v16.0 / Corpus v30)

## Context & Problem Statement
Silabus bahasa Jepang standar (seperti Minna no Nihongo atau materi persiapan JLPT akademik umum) dirancang untuk konteks turis, mahasiswa, atau pegawai kantor santai: memesan ramen, menceritakan hobi, atau membaca artikel opini.

Namun, ribuan pemelajar Indonesia belajar bahasa Jepang untuk bekerja di garda depan industri fisik di Jepang di bawah program visa **Specified Skilled Worker (SSW / Tokutei Ginou)** dan magang kerja:
- **Eldercare (Kaigo):** Berinteraksi dengan lansia panti yang mengalami demensia, membedakan 42 jenis onomatopoeia rasa sakit fisik, dan mengoperasikan pengangkatan transfer pasien.
- **Manufaktur (JAIM):** Berada di lantai pabrik berisik 85 dB di samping mesin cetak tekan (*press machine*) dan konveyor berputar, di mana kegagalan memahami aba-aba darurat bisa berakibat amputasi.
- **Konstruksi (JAC):** Bekerja di perancah lantai 4, galian tanah, dan pengoperasian crane dengan risiko fatal jatuh dari ketinggian (*tsuiraku*).
- **Pengolahan Makanan & Restoran:** Menjalankan standar HACCP, batas suhu CCP, dan protokol pencegahan Norovirus.

Penguasaan bahasa kejuruan di gemba adalah masalah **keselamatan jiwa dan hukum kerja (*life safety and legal compliance*)**, bukan sekadar kemampuan tata bahasa santai.

## Empirical SLA & Vocational Standards Grounding
- **Pramesti et al. (2019) [VS-29]:** Membuktikan secara empiris bahwa pekerja caregiver Indonesia di Jepang yang sukses berkomunikasi tidak menggunakan keigo kaku (*cold keigo*), melainkan melakukan *Speech Level Shift* (pergeseran ke bentuk santai hangat *tameguchi* + partikel empatik *ne/yo*) untuk membangun rasa aman dan kerja sama lansia.
- **Sakamoto et al. (2014) [VS-36] & Okuda (2018) [VS-38]:** Menguraikan bahwa lansia Jepang mengomunikasikan rasa sakit menggunakan kata onomatopoeia (seperti *chikuchiku*, *zukin-zukin*, *hiri-hiri*). Kegagalan staf asing membedakan onomatopoeia menyebabkan keterlambatan diagnosa klinis fatal.
- **JNIOSH (2020) [VS-39]:** Pedoman K3 Nasional Jepang menetapkan kewajiban protokol *pointing-and-calling* (*shiteki koshou*) dan seruan vokal keras (*kansei*) saat menghadapi anomali mesin.
- **JAIM (2024) [VS-40] & JAC (2024) [VS-41]:** Standar resmi METI dan MLIT untuk ujian evaluasi keterampilan teknis SSW Manufaktur dan Konstruksi.
- **Mustaqim & Priventa (2026) [VS-31]:** Meneliti friksi sosiopragmatis *HORENSO* pada pekerja Tokutei Ginou Indonesia yang cenderung menunda pelaporan kabar buruk (*bad news avoidance*) karena rasa *malu*.

## Decision Drivers & Decisions
1. **Pemisahan Jalur Akademik vs Jalur Kejuruan Gemba:**
   - Platform menyediakan modul kejuruan khusus terpisah dari silabus umum, langsung melatih terminologi Layer 2 dan skenario tempat kerja.
2. **Integrasi Kerangka Pelaporan SBAR:**
   - Setiap simulasi insiden K3 melatih pelaporan 4-langkah standar medis/industri internasional:
     - **S (Situation / Situasi):** Apa yang terjadi saat ini (lokasi, korban).
     - **B (Background / Latar Belakang):** Riwayat singkat kondisi sebelum insiden.
     - **A (Assessment / Penilaian):** Evaluasi tanda vital atau kerusakan mesin.
     - **R (Recommendation / Rekomendasi):** Permintaan tindakan segera (panggil ambulans 119, tekan tombol E-Stop).
3. **Register Seruan Akustik Darurat Gemba (*Kansei*):**
   - Melatih pemahaman seruan imperatif cepat lantai pabrik/proyek: `危ない！` (Awas!), `止まれ！` (Berhenti!), `触るな！` (Jangan sentuh!), `離れろ！` (Menjauh!).
4. **Matriks 42 Onomatopoeia Nyeri Kaigo:**
   - 42 butir onomatopoeia nyeri fisik dikelompokkan ke dalam 7 klaster fisiologis (menusuk, berdenyut, panas terbakar, tumpul dalam, mencengkeram, dll.) dengan visual diferensiasi sensoris.
5. **Protokol Eskalasi 4-Tingkat Kecelakaan Kerja (*Rousai*):**
   - Tier 1: Pertolongan pertama ringan (*keishou*).
   - Tier 2: Cedera memerlukan klinik (*hoshou*).
   - Tier 3: Cedera berat rawat inap / henti mesin (*kyuugyou*).
   - Tier 4: Insiden fatal / panggilan 119 darurat (*kinkyuu*).

## Consequences & Verification
- **Positif:** Calon pekerja memiliki kesiapan nyata lulus ujian Prometric SSW dan terlindung dari risiko kecelakaan fatal di Jepang.
- **Pemetaan Design Decision:** DD-113 s.d. DD-123.
