# ADR-003: Affective Filter Lowering, "Malu" Social Anxiety Mitigation, and Zero-Timer UI

## Status
**APPROVED / ACTIVE** (Implemented in Nugget Nihongo Core v16.0)

## Context & Problem Statement
Mayoritas aplikasi bahasa populer mengandalkan mekanisme gamifikasi agresif:
1. **Papan Peringkat Publik (*Public Leaderboards*):** Membandingkan skor antarpengguna secara terbuka.
2. **Penghitung Mundur (*Ticking Countdown Timers*):** Bar waktu merah yang menyusut saat menjawab kartu.
3. **Penghapusan Streak Kejam (*Punitive Streak Reset*):** Kehilangan seluruh rekor belajar 100 hari karena absen 1 hari kerja lembur.

Dalam psikologi pembelajar Indonesia (budaya kolektivistik interdependen), mekanisme ini memicu sindrom **Malu** (*interdependent social shame / loss-of-face*). Ketika berhadapan dengan timer atau peringkat publik, pembelajar mengalami lonjakan Foreign Language Classroom Anxiety (FLCA) dan mengaktifkan saringan afektif (*affective filter*) Krashen. Akibatnya, alih-alih termotivasi, pengguna merasa terintimidasi, menghindari latihan output, dan akhirnya menghapus aplikasi (*churn*).

## Empirical SLA & Cross-Cultural Psychology Grounding
- **Horwitz, Horwitz, & Cope (1986) [ID-01] & MacIntyre & Gardner (1994) [ID-03]:** Kecemasan berbahasa asing secara langsung melumpuhkan kapasitas pemrosesan memori kerja verbal (*phonological loop*), mengurangi efisiensi penarikan leksikal hingga 40%.
- **Zhang (2019) [ID-07] & Woodrow (2006) [ID-09]:** Pembelajar Asia Tenggara menunjukkan korelasi negatif yang kuat antara pengawasan sosial publik dengan kemauan berkomunikasi (*willingness to communicate*).
- **Markus & Kitayama (1991) [CC-01] & Hofstede (2011) [CC-03]:** Budaya interdependen Indonesia memandang kegagalan publik sebagai ancaman terhadap keharmonisan relasional (*social face*). Lingkungan belajar privat yang aman (*psychological safety*) adalah prasyarat mutlak eksplorasi gramatikal.
- **Deci & Ryan (2000) [SDT-01]:** Motivasi intrinsik bertahan lama hanya jika didukung oleh tiga kebutuhan psikologis dasar: Otonomi (*autonomy*), Kompetensi (*competence*), dan Keterhubungan (*relatedness*). Tekanan evaluasi eksternal merusak otonomi.

## Decision Drivers & Decisions
1. **Penghapusan Total Timer pada Mode Belajar Formatif:**
   - Seluruh kartu flashcard, kuis pengenalan kata, dan latihan tata bahasa standar **DILARANG** menggunakan bar waktu berdetak atau hitung mundur yang memicu stres visual.
   - Pengecualian: Mode *Speed Comprehension Blast* opsional (hanya diakses setelah materi matang $S \ge 14\text{ hari}$) dengan framing positif ("Latihan Refleks", bukan "Kamu Kehabisan Waktu").
2. **Ketiadaan Papan Peringkat Publik (Default Private Mode):**
   - Nugget Nihongo tidak menyediakan leaderboard kompetitif publik yang mempermalukan pembelajar dengan skor rendah.
   - Metrik kemajuan difokuskan secara personal: Pohon di *Kebun Kata*, jumlah kartu matang, dan akumulasi kosakata aktif.
3. **Buku Catatan Kesalahan Privat (*Private Mistake Notebook*):**
   - Kartu yang salah tidak diberi tanda silang merah mencolok yang menghukum (*punitive buzzer*), melainkan diberi label "Jebakan Terdeteksi" dan dimasukkan secara senyap ke daftar ulas privat.
4. **Resep Pengampunan Absen Belajar (*Forgiving Habit System*):**
   - Absen 1 hari tidak mereset streak menjadi nol, melainkan memberikan opsi "Cairkan Hari Libur / Pulihkan Kebun" untuk menghargai realitas jam kerja fisik pekerja migran.

## Consequences & Verification
- **Positif:** Mengurangi drop-off pemelajar dewasa, meningkatkan keberanian mencoba menjawab soal cloze dan terjemahan aktif tanpa rasa takut dinilai orang lain.
- **Pemetaan Design Decision:** DD-91, DD-92, DD-93, DD-94, DD-95, DD-96, DD-97.
