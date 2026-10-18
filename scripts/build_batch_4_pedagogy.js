const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../corpus/pedagogy/ssw');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// =========================================================================
// 1. SSW-10 CROP AGRICULTURE
// =========================================================================
const ssw10Content = `# Cetak Biru Pedagogis & Kurikulum Kejuruan SSW · Sektor 10: Pertanian Tanaman Pangan & Hortikultura (Crop Agriculture)

> **Kode Dokumen:** \`SSW-PEDAGOGY-10-CROP-AGRICULTURE\`  
> **Versi:** 4.1.0-BIAS-FREE-FOUNDATION  
> **Sektor:** Pertanian Tanaman Pangan & Sayur-Buah (Crop Farming / 耕種農業分野)  
> **Kementerian Pembina:** Kementerian Pertanian, Kehutanan, dan Perikanan Jepang (MAFF / 農林水産省)  
> **Badan Pelaksana Uji:** Badan Kamar Pertanian Nasional Jepang (National Chamber of Agriculture / 全国農業会議所) & Prometric  
> **Status Bias Lingkungan:** 100% Lahan Sawah, Kebun Terbuka & Rumah Kaca Hortikultura (*Nōjō / Hatake / Onshitsu Hausu*); Bebas Total dari Bias Konstruksi Proyek (*Zero Genba Bias*)  
> **Sumber Kurasi Primer:**
> - \`reference-books/ssw/03_nougyou_agriculture/Agriculture_Crop_Text_JA.pdf\` & \`reference-books/ssw/03_nougyou_agriculture/Agriculture_Crop_Text_ID.pdf\` (Budidaya Padi, Sayuran Lapang, Buah Greenhouse & Mekanisasi Traktor)
> - \`reference-books/ssw/03_nougyou_agriculture/Agriculture_Crop_Sample_Exam_JA.pdf\` & \`reference-books/ssw/03_nougyou_agriculture/Agriculture_Crop_Sample_Exam_ID.pdf\`
> **Landasan Teori & Riset:**
> - National Chamber of Agriculture Standard (National Chamber of Agriculture 2024 [VS-47])
> - Needs Analysis & Technical Lexicon (Nation & Hwang 1995 [VS-09]; Chung & Nation 2003 [VS-10])
> - Agricultural Machinery Safety & Chemical SDS (JNIOSH 2020 [VS-39])
> - Cross-Cultural Communication & Anti-Inpei in Agriculture (Mustaqim & Priventa 2026 [VS-31])
> - Testing Effect & Retrieval Practice (Roediger & Karpicke 2006 [TE-01])
> - Morpheme-First Compound Kanji Chunking (Matsunaga 1999 [OD-20])

---

## Bab 1: Ekosistem Tempat Kerja & Hierarki Komunikasi Otentik

### 1.1 Struktur Usaha Tani & Peran Industri (Nōjō / Hatake / Onshitsu)
Tempat kerja pertanian tanaman di Jepang adalah **Nōjō (農場 - Lahan Usaha Tani)** yang dikelola oleh keluarga petani (*Kano / 農家*) atau korporasi pertanian (*Nōgyō Hōjin*).
Hierarki operasional:
1. **Enshū / Nōka no Oyakata (園主 / 親方 - Pemilik Kebun / Kepala Keluarga Petani)**: Memutuskan varietas bibit, jadwal tanam, dan strategi pemupukan.
2. **Nōgyō Kikai Kanrisha (農業機械管理者 - Penanggung Jawab Traktor & Mesin Tani)**.
3. **Nōgyō Jūjisha (農業従事者 - Pekerja Tani Berketerampilan Spesifik)**: Mengoperasikan traktor roda ganjil (*torakutā*), memasang mulsa plastik (*maruchi*), menyemprot pestisida (*nōyaku sanpu*), memanen (*shūkaku*), dan menyortir mutu (*senbetsu*).

### 1.2 Register Bahasa Otentik & Sapaan Kehangatan Petani
Pertanian Jepang memiliki budaya kerja kekeluargaan yang erat:
- Di pagi hari: \`「おはようございます！今日もよろしくお願いします！」\` (*Ohayō gozaimasu! Kyō mo yoroshiku onegai shimasu!*).
- Aba-aba penyemprotan bahan kimia pertanian:
  - \`「農薬散布入ります！風下注意！」\` (*Nōyaku sanpu hairimasu! Kazashimo chūi!* — Semprot pestisida dimulai! Perhatikan arah hembusan angin!).

### 1.3 Protokol Intervensi Krisis & K3 Traktor Terguling (Torakutā Ōten)
- **Bahaya Fatal Terguling Traktor di Pematang Sawah**: Membawa traktor melintasi pematang sawah (*azemiche*) atau lereng miring berisiko traktor terbalik menimpa pengemudi. Wajib memasang rangka pelindung kabin anti-terbalik (**ROPS - Roll-Over Protective Structure**) dan memakai sabuk pengaman erat.
- **Anti-Inpei Kerusakan Alat Penyortir**: Jika ada buah tomat atau persik yang lecet terjepit konveyor pemilah (*senbetsuki*), segera laporkan dan bersihkan sebelum getah buah merusak komponen optik kamera pemilah.

---

## Bab 2: Analisis Kritis Kons & Kegagalan Hafalan Buta

### 2.1 Kegagalan Sistemik Hafalan Buta pada Sektor Pertanian
1. **Ketiadaan Pemahaman Rasio Pengenceran Pestisida (Dilution Math Trap)**: Menghafal kanji \`農薬\` (nōyaku - pestisida) tanpa bisa menghitung pengenceran $1:1000$ (mis. $20\text{ mL}$ cairan obat dilarutkan ke dalam $20\text{ Liter}$ air); larutan yang terlalu pekat membakar daun tanaman hingga mati kering dan meninggalkan residu kimia beracun yang melanggar UU Mutu Pangan.
2. **Kebutaan Simbol Unsur Hara Pupuk (NPK)**: Siswa tidak memahami perbandingan Nitrogen ($N$ untuk daun), Fosfor ($P$ untuk akar/bunga), dan Kalium ($K$ untuk buah); salah mencampur pupuk menyebabkan tanaman kerdil atau rebah batang.

---

## Bab 3: Pemetaan Hambatan Kognitif, Linguistik & Budaya Siswa Indonesia

### 3.1 Tiga Persona Pembelajar Indonesia
1. **Persona A (Anak Petani / Lulusan SMK Pertanian di Indonesia)**: Sangat terbiasa dengan cangkul dan tanah, namun belum terbiasa dengan greenhouse berteknologi sensor komputer dan traktor modern Jepang.
2. **Persona B (Ex-Magang Pabrik Manufaktur / Konstruksi)**: Terbiasa dengan disiplin jam kerja, namun kaget dengan ritme kerja mengikuti siklus cuaca alam.
3. **Persona C (Kandidat Fresh Non-Pertanian LPK)**: Mudah lemas saat terkena panas rumah kaca plastik ($35^\circ\text{C}$); takut terhadap ulat dan serangga tanaman.

### 3.2 Matriks Besaran, Metrik & Satuan Pengukuran Kritis Pertanian

\`\`\`
┌────────────────────────────────────────────────────────────────────────┐
│             MATRIKS PENGUKURAN & SATUAN TEKNIS SEKTOR PERTANIAN        │
├───────────────────────┬──────────────┬─────────────────────────────────┤
│ Parameter Operasional │ Satuan Resmi │ Nilai Standar & Tindakan Teknis │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 1. Rasio Pengenceran  │ 倍率 (Bairitsu)│ • Pestisida Insektisida:       │
│    Pestisida Kimia    │ (x-kali encer│   1 : 1,000 – 1 : 2,000         │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 2. Suhu Rumah Kaca    │ °C           │ • Siang Hari: 22°C – 28°C       │
│    (温室管理温度)     │ (Derajat Cel)│ • Malam Hari: 12°C – 15°C       │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 3. Kecepatan Putaran  │ RPM          │ • Standar Putaran PTO: 540 RPM  │
│    Poros PTO Traktor  │ (Putaran/mnt)│   (Mencegah as mesin patah)     │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 4. Derajat Keasaman   │ pH           │ • pH Tanah Ideal: 6.0 – 6.8     │
│    Tanah Pertanian    │ (0 – 14)     │   (Kapur pertanian untuk asam)  │
└───────────────────────┴──────────────┴─────────────────────────────────┘
\`\`\`

---

## Bab 4: Arsitektur Kurikulum Fase 1 — Maksimalkan Peluang Lulus Ujian CBT

### 4.1 Struktur Ujian Resmi Prometric CBT Pertanian Tanaman
30 butir soal pilihan ganda teori fisiologi tanaman, pemupukan, K3 traktor, dan praktik visual penanganan hama penyakit dalam 60 menit. Ambang kelulusan: $\ge 60\%$ (National Chamber of Agriculture 2024 [VS-47]).

### 4.2 Dekonstruksi Lima Jebakan Distractor Utama Pertanian
1. **Jebakan Melawan Arah Angin Saat Menyemprot Pestisida**: Pilihan menyemprot melawan arah angin (*kazakami*) adalah LETHAL ERROR (racun terhirup pengemudi); wajib menyemprot searah hembusan angin (*kazashimo*) memakai masker karbon aktif.
2. **Jebakan Membersihkan Pisau Rotary Traktor Saat Mesin Menyala**: Pilihan membersihkan lilitan rumput pada pisau traktor tanpa mematikan mesin dan mencabut kunci kontak adalah jebakan salah fatal (*makikomi*).
3. **Jebakan Panen Tanpa Memperhatikan Masa Tunggu Pestisida**: Pilihan memanen tanaman langsung sehari setelah disemprot pestisida tanpa mematuhi batas aman hari panen (*shūkamai kikan*) adalah pelanggaran hukum berat.

---

## Bab 5: Arsitektur Kurikulum Fase 2 — Kesiapan Kerja Operasional Spesifik Sektor

### 5.1 Progressive SNR Audio & Onomatopoeia Pertanian
- Audio instruksi di tengah hembusan angin ladang, suara mesin traktor diesel, dan deru blower greenhouse.
- Onomatopoeia pertanian tanaman:
  - \`サラサラ (sara-sara)\`: Kondisi tanah gembur kering yang ideal untuk penyemaian benih.
  - \`ビッシリ (bisshiri)\`: Bunga atau buah yang lebat menutupi tangkai pohon.
  - \`シャキシャキ (shaki-shaki)\`: Kesegaran renyah daun selada kubis saat dipanen pagi hari.

### 5.2 Protokol Intervensi Krisis & Kualifikasi SSW-2
- **Tangga Promosi Kualifikasi Menuju SSW-2**:
  - Lisensi Mengemudi Traktor Pertanian Jalan Raya (O-gata Tokushu Menkyo)
  - Lisensi Petugas Aplikasi Pestisida Terdaftar (**Bōjo-shi - 防除士**)
  - Ujian Evaluasi Tokutei Ginō 2-gō Sektor Pertanian (Tingkat Manajer Perkebunan) $\rightarrow$ Hak tinggal tanpa batas, membawa keluarga, dan jalur **Eijūken**.

---

## Bab 6: 4 Modalitas Latihan Otentik, Scaffolding & Taksonomi Remedial

### 6.1 Empat Modalitas Latihan Otentik
1. **Visual**: Identifikasi gejala penyakit tanaman (jamur tepung *udonko-byō*, busuk daun *ekibyo*) pada foto daun.
2. **Auditori**: Mengidentifikasi perintah sortir ukuran panen (*M-saizu senbetsu*) di tengah bising mesin konveyor.
3. **Skenario**: Menangani kenaikan suhu ekstrem di dalam rumah kaca saat ventilasi otomatis macet.
4. **Prosedural**: Menghitung kebutuhan pupuk: luas lahan $10\text{ are} \times$ dosis rekomendasi $15\text{ kg N/are} = 150\text{ kg N}$.

### 6.2 Matriks Taksonomi Remedial (4 Tipe Eror)
- **Tipe L**: Tertukar istilah *Shōdoku* (desinfeksi tanah) vs *Hiryō* (pupuk tanaman).
- **Tipe C**: Mengira semua serangga di kebun adalah hama yang harus dibunuh (lebah penyerbuk buah wajib dilindungi).
- **Tipe M**: Salah menghitung dosis pestisida 1:1000 menjadi 1:100.
- **Tipe P**: Menghidupkan traktor sebelum memeriksa apakah tuas perseneling berada di posisi netral.

### 6.3 Tabel Parameter Desain Kurikuler Pertanian Tanaman
\`\`\`
┌────────────────────────────────────────────────────────────────────────┐
│             PARAMETER DESAIN KURIKULER RESMI NUGGET NIHONGO            │
│                 SEKTOR 10: PERTANIAN TANAMAN (CROP AG)                 │
├───────────────────────────────────┬────────────────────────────────────┤
│ Parameter Kurikulum               │ Nilai Standar Statuter             │
├───────────────────────────────────┼────────────────────────────────────┤
│ Total Jam Belajar Rekomendasi     │ 140 Jam Pelajaran (7 Minggu @20j)  │
│ Rasio Fase 1 (CBT) vs Fase 2 (K3) │ 45% CBT Ujian : 55% Operasional    │
│ Target Bank Soal Prometric CBT    │ 500 Butir Soal Teori & Visual      │
│ Rasio Latihan Audio Noise (SNR)   │ Minimal 40% (Suara Traktor Ladang) │
│ Kuota Wajib K3 Traktor & Pestisida│ Lulus 100% Modul Tanpa Cacat Eror  │
│ Ambang Kelulusan Simulasi Ujian   │ 80% (Di atas standar resmi 60%)    │
│ Frekuensi Review SRS FSRS         │ Target retensi 90% parameter adaptif│
└───────────────────────────────────┴────────────────────────────────────┘
\`\`\`
`;

fs.writeFileSync(path.join(targetDir, 'SSW-10-CROP-AGRICULTURE-PEDAGOGICAL-FOUNDATION.md'), ssw10Content, 'utf8');
console.log('Successfully written SSW-10 Crop Agriculture Foundation.');

// =========================================================================
// 2. SSW-11 LIVESTOCK AGRICULTURE
// =========================================================================
const ssw11Content = `# Cetak Biru Pedagogis & Kurikulum Kejuruan SSW · Sektor 11: Peternakan & Pengelolaan Ternak (Livestock)

> **Kode Dokumen:** \`SSW-PEDAGOGY-11-LIVESTOCK\`  
> **Versi:** 4.1.0-BIAS-FREE-FOUNDATION  
> **Sektor:** Industri Peternakan (Livestock Farming / 畜産農業分野)  
> **Kementerian Pembina:** Kementerian Pertanian, Kehutanan, dan Perikanan Jepang (MAFF / 農林水産省)  
> **Badan Pelaksana Uji:** Badan Kamar Pertanian Nasional Jepang (National Chamber of Agriculture / 全国農業会議所) & Prometric  
> **Status Bias Lingkungan:** 100% Peternakan Sapi Perah, Sapi Potong, Babi & Ayam (*Chikusansha / Bokujō*); Bebas Total dari Bias Konstruksi Luar Ruangan (*Zero Genba Bias*)  
> **Sumber Kurasi Primer:**
> - \`reference-books/ssw/03_nougyou_agriculture/Agriculture_Livestock_Text_JA.pdf\` & \`reference-books/ssw/03_nougyou_agriculture/Agriculture_Livestock_Text_ID.pdf\` (Manajemen Sapi Perah, Pemeliharaan Babi, Unggas & Biosekuriti)
> - \`reference-books/ssw/03_nougyou_agriculture/Agriculture_Livestock_Sample_Exam_JA.pdf\` & \`reference-books/ssw/03_nougyou_agriculture/Agriculture_Livestock_Sample_Exam_ID.pdf\`
> **Landasan Teori & Riset:**
> - National Chamber of Agriculture Standard (National Chamber of Agriculture 2024 [VS-47])
> - Needs Analysis & Technical Lexicon (Nation & Hwang 1995 [VS-09]; Chung & Nation 2003 [VS-10])
> - Biosecurity Protocols & Animal Welfare (JNIOSH 2020 [VS-39])
> - Cross-Cultural Communication & Anti-Inpei in Livestock Health (Mustaqim & Priventa 2026 [VS-31])
> - Testing Effect & Retrieval Practice (Roediger & Karpicke 2006 [TE-01])
> - Morpheme-First Compound Kanji Chunking (Matsunaga 1999 [OD-20])

---

## Bab 1: Ekosistem Tempat Kerja & Hierarki Komunikasi Otentik

### 1.1 Struktur Peternakan & Peran Industri (Chikusansha / Bokujō)
Tempat kerja peternakan adalah **Bokujō / Chikusansha (牧場 / 畜産舎 - Peternakan Hewan)** dengan pembagian kandang sapi perah (*rakunō*), sapi potong (*nikugyū*), babi (*yōton*), dan ayam petelur/pedaging (*yōkei*).
Hierarki operasional:
1. **Bokujōchō (牧場長 - Kepala Peternakan)**: Mengatur program inseminasi buatan, rasio ransum pakan, dan pencegahan wabah penyakit hewan.
2. **Jūishi (獣医師 - Dokter Hewan Jaga)**: Pemegang otoritas diagnosa medis ternak, pemberian antibiotik, dan penanganan kelahiran anak sapi (*bunben*).
3. **Chikusan Gishi (畜産技師 - Petugas Teknis Kandang)**: Melakukan pemerahan susu (*sakunyū*), pemberian pakan konsentrat (*kyūji*), pembersihan feses kandang (*kyūji josen*), dan desinfeksi biosekuriti.

### 1.2 Register Bahasa Otentik & Sikap Terhadap Hewan Ternak
Hewan ternak berbobot 600–800 kg mudah terkejut oleh gerakan tiba-tiba atau suara keras:
- Aba-aba suara lembut menenangkan sapi:
  - \`「おーし、おーし、いい子だ」\` (*Ōshi, ōshi, ii ko da* — Tenang, tenang, anak pintar).
  - Berjalan mendekati sapi dari sudut pandang depan samping mata sapi; DILARANG mendekati sapi dari belakang tanpa menyapa karena memicu reflek tendangan maut (*ketobashi*).

### 1.3 Protokol Intervensi Krisis & Kepatuhan Biosekuriti Nasional
- **Biosekuriti Pencegahan Wabah Flu Burung & Demam Babi**: Wabah infeksi virus ternak dapat memusnahkan seluruh peternakan dalam semalam (pemusnahan massal jutaan ekor ayam/babi).
  - Wajib mengganti pakaian dan sepatu bot di ruang steril (*chōji-shitsu*).
  - Wajib melewati karpet desinfeksi dan penyemprotan kendaraan desinfektan di gerbang utama peternakan.
- **Anti-Inpei Ternak Sakit**: Menemukan sapi yang nafsu makannya turun drastis atau ayam yang mati lemas wajib dilaporkan seketika kepada Bokujōchō untuk dites antigen virus (Mustaqim & Priventa 2026 [VS-31]; National Chamber of Agriculture 2024 [VS-47]).

---

## Bab 2: Analisis Kritis Kons & Kegagalan Hafalan Buta

### 2.1 Kegagalan Sistemik Hafalan Buta pada Sektor Peternakan
1. **Ketiadaan Pemahaman Anatomi & Mastitis Susu**: Menghafal kanji \`搾乳\` (sakunyū - memerah susu) tanpa memahami prosedur uji celup puting (*dipping*) dan deteksi radang kelenjar susu (*nyūben'en / mastitis*); susu yang tercemar nanah mastitis merusak ribuan liter susu tangki pendingin (*kūrā*).
2. **Kebutaan Bahaya Gas Beracun Bak Limbah (Slurry Pit Anoxia)**: Menghafal pembuangan kotoran sapi tanpa memahami akumulasi gas hidrogen sulfida ($H_2S$) beracun di dalam bak penampung limbah kotoran; masuk ke dalam bak penampung feses tertutup tanpa alat pernapasan memicu kematian seketika.

---

## Bab 3: Pemetaan Hambatan Kognitif, Linguistik & Budaya Siswa Indonesia

### 3.1 Tiga Persona Pembelajar Indonesia
1. **Persona A (Lulusan Peternakan / Dokter Hewan D3/S1)**: Menguasai nutrisi pakan dan anatomi, namun belum terbiasa dengan sistem otomasi mesin robot pemerahan susu (*milking robot*) Jepang.
2. **Persona B (Ex-Pekerja Kandang di Indonesia)**: Terbiasa dengan bau dan kotoran ternak, namun terbiasa dengan metode penanganan kasar yang melanggar standar kesejahteraan hewan (*Animal Welfare*) Jepang.
3. **Persona C (Kandidat Fresh Non-Peternakan LPK)**: Takut terhadap ukuran tubuh sapi yang besar; jijik membersihkan tumpukan kotoran feses basah.

### 3.2 Matriks Besaran, Metrik & Satuan Pengukuran Kritis Peternakan

\`\`\`
┌────────────────────────────────────────────────────────────────────────┐
│             MATRIKS PENGUKURAN & SATUAN TEKNIS SEKTOR PETERNAKAN       │
├───────────────────────┬──────────────┬─────────────────────────────────┤
│ Parameter Operasional │ Satuan Resmi │ Nilai Standar & Tindakan Teknis │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 1. Suhu Tangki Susu   │ °C           │ • Suhu Milk Cooler: ≤ 4°C       │
│    (バルククーラー温度)│ (Derajat Cel)│   (Mencegah proliferasi kuman)  │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 2. Waktu Pemerahan    │ Menit        │ • Waktu Mesin Memerah: 4 – 6 mnt│
│    Susu per Ekor Sapi │              │   (Mencegah over-milking luka)  │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 3. pH Silase Pakan    │ pH           │ • Silase Berkualitas Baik:      │
│    Fermentasi Hijauan │ (0 – 14)     │   pH 3.8 – 4.2 (Asam laktat)    │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 4. Konsentrasi Amonia │ ppm          │ • Udara Kandang Aman: < 20 ppm  │
│    Udara Kandang      │ (Part/Million│   (Ventilasi kipas berkala)     │
└───────────────────────┴──────────────┴─────────────────────────────────┘
\`\`\`

---

## Bab 4: Arsitektur Kurikulum Fase 1 — Maksimalkan Peluang Lulus Ujian CBT

### 4.1 Struktur Ujian Resmi Prometric CBT Peternakan
30 butir soal pilihan ganda teori manajemen sapi/babi/unggas, nutrisi pakan, biosekuriti, dan sanitasi kandang dalam 60 menit. Ambang kelulusan: $\ge 60\%$ (National Chamber of Agriculture 2024 [VS-47]).

### 4.2 Dekonstruksi Lima Jebakan Distractor Utama Peternakan
1. **Jebakan Mendekati Sapi Tanpa Sapaan**: Pilihan berjalan langsung di belakang pantat sapi tanpa menyapa suara (*koe-kake*) adalah LETHAL ERROR (sapi refleks menendang mematahkan rusuk).
2. **Jebakan Mencampur Susu Sapi Sakit ke Tangki Utama**: Pilihan menuangkan susu dari sapi yang sedang diberi antibiotik ke dalam tangki pendingin (*bulk cooler*) adalah salah fatal; susu wajib dibuang terpisah.
3. **Jebakan Memasuki Peternakan Lain Tanpa Karantina**: Pilihan berkunjung ke peternakan babi/ayam lain di hari libur lalu langsung masuk kerja keesokan harinya tanpa karantina pakaian melanggar aturan biosekuriti nasional.

---

## Bab 5: Arsitektur Kurikulum Fase 2 — Kesiapan Kerja Operasional Spesifik Sektor

### 5.1 Progressive SNR Audio & Onomatopoeia Peternakan
- Audio suara dengungan kipas angin kandang, desau mesin pemerah susu pneumatik, dan lenguhan ternak.
- Onomatopoeia peternakan:
  - \`モー (mō)\`: Lenguhan normal sapi yang tenang saat diberi makan.
  - \`ゴクゴク (goku-goku)\`: Suara anak sapi (*koushi*) menyusu botol dengan lahap.
  - \`バタバタ (bata-bata)\`: Gerakan gelisah kawanan ayam saat suhu kandang terlalu panas.

### 5.2 Protokol Intervensi Krisis & Kualifikasi SSW-2
- **Tangga Promosi Kualifikasi Menuju SSW-2**:
  - Sertifikasi Inseminasi Buatan Ternak (**Kachiku Jinkō Juseishi - 家畜人工授精師**)
  - Ujian Evaluasi Tokutei Ginō 2-gō Sektor Peternakan $\rightarrow$ Hak tinggal tanpa batas, membawa keluarga, dan jalur **Eijūken**.

---

## Bab 6: 4 Modalitas Latihan Otentik, Scaffolding & Taksonomi Remedial

### 6.1 Empat Modalitas Latihan Otentik
1. **Visual**: Identifikasi strip uji CMT (California Mastitis Test) untuk mendeteksi radang puting susu pada foto.
2. **Auditori**: Mengidentifikasi suara nafas batuk sapi (*seki*) yang menandakan radang paru di kandang.
3. **Skenario**: Menangani kelahiran mendadak anak sapi pada shift malam (*bunben kaijo*).
4. **Prosedural**: Menghitung formulasi pakan konsentrat berbasis bobot badan ternak harian.

### 6.2 Matriks Taksonomi Remedial (4 Tipe Eror)
- **Tipe L**: Tertukar istilah *Bunben* (melahirkan) vs *Hatsujō* (masa birahi ternak).
- **Tipe C**: Mengira anak sapi yang baru lahir boleh tidak diberi kolostrum susu pertama (*hatsunyū*).
- **Tipe M**: Menghitung suhu tangki pendingin susu di atas 4°C.
- **Tipe P**: Mengabaikan langkah dipping puting dengan cairan antiseptik iodin setelah memerah susu.

### 6.3 Tabel Parameter Desain Kurikuler Peternakan
\`\`\`
┌────────────────────────────────────────────────────────────────────────┐
│             PARAMETER DESAIN KURIKULER RESMI NUGGET NIHONGO            │
│                 SEKTOR 11: PETERNAKAN (LIVESTOCK)                      │
├───────────────────────────────────┬────────────────────────────────────┤
│ Parameter Kurikulum               │ Nilai Standar Statuter             │
├───────────────────────────────────┼────────────────────────────────────┤
│ Total Jam Belajar Rekomendasi     │ 140 Jam Pelajaran (7 Minggu @20j)  │
│ Rasio Fase 1 (CBT) vs Fase 2 (K3) │ 45% CBT Ujian : 55% Operasional    │
│ Target Bank Soal Prometric CBT    │ 500 Butir Soal Teori & Visual      │
│ Rasio Latihan Audio Noise (SNR)   │ Minimal 40% (Suara Mesin Kandang)  │
│ Kuota Wajib Biosekuriti Wabah     │ Lulus 100% Modul Tanpa Cacat Eror  │
│ Ambang Kelulusan Simulasi Ujian   │ 80% (Di atas standar resmi 60%)    │
│ Frekuensi Review SRS FSRS         │ Target retensi 90% parameter adaptif│
└───────────────────────────────────┴────────────────────────────────────┘
\`\`\`
`;

fs.writeFileSync(path.join(targetDir, 'SSW-11-LIVESTOCK-AGRICULTURE-PEDAGOGICAL-FOUNDATION.md'), ssw11Content, 'utf8');
console.log('Successfully written SSW-11 Livestock Agriculture Foundation.');

// =========================================================================
// 3. SSW-12 FISHERIES & AQUACULTURE
// =========================================================================
const ssw12Content = `# Cetak Biru Pedagogis & Kurikulum Kejuruan SSW · Sektor 12: Perikanan & Budidaya Perairan (Fisheries)

> **Kode Dokumen:** \`SSW-PEDAGOGY-12-FISHERIES\`  
> **Versi:** 4.1.0-BIAS-FREE-FOUNDATION  
> **Sektor:** Industri Perikanan & Budidaya Laut (Fisheries & Aquaculture / 漁業・養殖業分野)  
> **Kementerian Pembina:** Badan Perikanan Jepang (Fisheries Agency / 水産庁 / MAFF)  
> **Badan Pelaksana Uji:** Asosiasi Perikanan Seluruh Jepang (Dainihon Suisankai / 一般社団法人 大日本水産会) & Prometric  
> **Status Bias Lingkungan:** 100% Geladak Kapal Penangkap Ikan & Keramba Apung Pesisir (*Gyosen / Yōshokujō*); Bebas Total dari Bias Konstruksi Bangunan Sipil (*Zero Genba Bias*)  
> **Sumber Kurasi Primer:**
> - \`reference-books/ssw/04_gyogyou_fishery/Fishery_Text_JA.pdf\` & \`reference-books/ssw/04_gyogyou_fishery/Fishery_Text_ID.pdf\` (Operasional Penangkapan Jaring Pukat, Rawai, Cumi & Budidaya Ikan/Rumput Laut)
> - \`reference-books/ssw/04_gyogyou_fishery/Fishery_Sample_Exam_JA.pdf\` (Spesifikasi Resmi CBT Prometric)
> **Landasan Teori & Riset:**
> - Fisheries Agency & Japan Fisheries Association Standard (Fisheries Agency & Japan Fisheries Association 2024 [VS-48])
> - Needs Analysis & Technical Lexicon (Nation & Hwang 1995 [VS-09]; Chung & Nation 2003 [VS-10])
> - Marine Occupational Safety & Life Jacket Protocols (JNIOSH 2020 [VS-39])
> - Cross-Cultural Communication & Anti-Inpei in Maritime Operations (Mustaqim & Priventa 2026 [VS-31])
> - Testing Effect & Retrieval Practice (Roediger & Karpicke 2006 [TE-01])
> - Morpheme-First Compound Kanji Chunking (Matsunaga 1999 [OD-20])

---

## Bab 1: Ekosistem Tempat Kerja & Hierarki Komunikasi Otentik

### 1.1 Struktur Kapal Ikan & Peran Industri (Gyosen / Yōshokujō)
Tempat kerja perikanan di Jepang adalah **Gyosen (漁船 - Kapal Ikan Laut Lepas)** atau **Yōshokujō (養殖場 - Keramba Budidaya Teluk)**.
Hierarki operasional kapal:
1. **Sendō / Senchō (船頭 / 船長 - Nahkoda Kapal Ikan / Master Fisherman)**: Otoritas mutlak navigasi kapal, membaca sonar gerombolan ikan (*gyotan*), dan keselamatan awak kapal di laut lepas.
2. **Kikanchō (機関長 - Kepala Kamar Mesin Kapal)**: Bertanggung jawab atas mesin diesel kapal, generator listrik, dan sistem refrigerasi pendingin ikan palka.
3. **Kōro Gakari (甲板長 - Bosun / Kepala Geladak)**: Memimpin operasi penarikan jaring pukat (*amimaki*), pengikatan tali labuh kapal, dan pembongkaran muatan ikan.
4. **Gyosen Kōin (漁船甲板員 - Awak Geladak Kapal Ikan)**: Mengoperasikan mesin katrol jaring (*net hauler*), menyortir ikan segar (*senbetsu*), menusuk saraf ikan (*shinkei-jime*), dan menabur es palka.

### 1.2 Register Bahasa Otentik & Seruan Arah Maritim Geladak
Komunikasi di atas geladak kapal yang diterjang ombak laut dan angin badai mengutamakan seruan arah lambung kapal:
- **Arah Kapal Resmi**:
  - Haluan depan: \`「Omote (表 / おもて)」\`
  - Buritan belakang: \`「Tomo (艫 / とも)」\`
  - Lambung kanan: \`「Ugen (右舷 / うげん)」\`
  - Lambung kiri: \`「Sagen (左舷 / さげん)」\`
- **Aba-Aba Menarik Jaring**:
  - \`「網巻き上げ開始！（あみまきあげかいし！）」\` (*Ami makiage kaishi!*)
  - \`「ロープ引っ張れー！」\` (*Rōpu hippare-!*)

### 1.3 Protokol Intervensi Krisis & Bahaya Jatuh ke Laut (Rakusui Jiko)
- **Kewajiban Mutlak Rompi Pelampung (Raifujaketto Chakuyō)**:
  - DILARANG KERAS melangkah ke geladak kapal tanpa memakai rompi pelampung otomatis berstandar MLIT Tipe A (*Sakura Māku*).
- **Protokol Orang Jatuh ke Laut (Man Overboard)**:
  - Siapa pun yang melihat orang jatuh ke laut segera meneriakkan sekuat tenaga: \`「落水！右舷！（らくすい！うげん！）」\` (*Rakusui! Ugen!* — Ada orang jatuh di lambung kanan!), lemparkan ban pelampung berlampu, dan jangan alihkan pandangan mata dari korban!

---

## Bab 2: Analisis Kritis Kons & Kegagalan Hafalan Buta

### 2.1 Kegagalan Sistemik Hafalan Buta pada Sektor Perikanan
1. **Ketiadaan Pemahaman Hipotermia Air Laut**: Menghafal kata *samui* (dingin) tanpa memahami bahwa jatuh ke air laut bersuhu $5^\circ\text{C}$ menyebabkan kram otot melumpuhkan dalam 2 menit dan kematian hipotermia dalam 15 menit jika tidak memakai pakaian pelindung termal.
2. **Kebutaan Bahaya Terbelit Mesin Katrol Jaring (Net Hauler Trap)**: Siswa tidak memahami bahwa tali tambang basah yang berputar di capstan winch dapat mencengkeram sarung tangan dan menarik tubuh operator hingga tergilas ke drum mesin.

---

## Bab 3: Pemetaan Hambatan Kognitif, Linguistik & Budaya Siswa Indonesia

### 3.1 Tiga Persona Pembelajar Indonesia
1. **Persona A (Nelayan Pesisir Tradisional Indonesia)**: Memiliki ketahanan mabuk laut tinggi dan paham jaring, namun belum terbiasa dengan sonar digital dan regulasi kuota tangkap perikanan Jepang.
2. **Persona B (Lulusan SMK Perikanan / Nautika)**: Memahami kompas dan navigasi, namun belum terbiasa dengan kecepatan kerja pemrosesan ikan di atas kapal badai.
3. **Persona C (Kandidat Fresh Non-Nelayan LPK)**: Mengalami mabuk laut parah (*funayoi*) pada minggu-minggu pertama; takut melangkah di geladak yang basah licin terombang-ambing.

### 3.2 Matriks Besaran, Metrik & Satuan Pengukuran Kritis Perikanan

\`\`\`
┌────────────────────────────────────────────────────────────────────────┐
│             MATRIKS PENGUKURAN & SATUAN TEKNIS SEKTOR PERIKANAN        │
├───────────────────────┬──────────────┬─────────────────────────────────┤
│ Parameter Operasional │ Satuan Resmi │ Nilai Standar & Tindakan Teknis │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 1. Suhu Palka Es Ikan │ °C           │ • Air Laut Es (Shiori): -1°C–0°C│
│    (魚艙冷却温度)     │ (Derajat Cel)│ • Freezer Tuna: -50°C – -60°C   │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 2. Daya Apung Rompi   │ Newton (N)   │ • Standar Pelampung Tipe A:     │
│    (救命胴衣浮力)     │ (Newton / kg)│   Minimal 7.5 kgf / 24 jam      │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 3. Kecepatan Angin    │ m/s          │ • Waspada Badai: ≥ 10 m/s       │
│    Operasi Kapal      │ (Meter/detik)│ • Larangan Melaut: ≥ 15 m/s     │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 4. Salinitas Air Laut │ ‰            │ • Air Laut Standar: 33 – 35 ‰   │
│    Budaya Ikan        │ (Permil)     │   (Diukur dengan refraktometer) │
└───────────────────────┴──────────────┴─────────────────────────────────┘
\`\`\`

---

## Bab 4: Arsitektur Kurikulum Fase 1 — Maksimalkan Peluang Lulus Ujian CBT

### 4.1 Struktur Ujian Resmi Prometric CBT Perikanan
30 butir soal pilihan ganda teori alat penangkap ikan, biologi ikan, K3 kelautan, dan penanganan mutu hasil tangkapan dalam 60 menit. Ambang kelulusan: $\ge 60\%$ (Fisheries Agency 2024 [VS-48]).

### 4.2 Dekonstruksi Lima Jebakan Distractor Utama Perikanan
1. **Jebakan Melangkah di Atas Tali yang Sedang Bergerak**: Pilihan menginjak atau melangkahi lingkaran tali tambang yang sedang ditarik kran adalah LETHAL ERROR (jika tali tersentak kencang, kaki terputus seketika).
2. **Jebakan Mematikan Lampu Pelampung di Malam Hari**: Pilihan mengabaikan pemeriksaan baterai lampu sinyal kedip pada rompi pelampung saat dinas malam adalah salah fatal.
3. **Jebakan Menunda Pembekuan Ikan Tangkapan**: Pilihan membiarkan ikan tangkapan terkena terik matahari geladak sebelum dimasukkan ke palka es adalah salah; mutu kesegaran ikan turun drastis dalam 30 menit.

---

## Bab 5: Arsitektur Kurikulum Fase 2 — Kesiapan Kerja Operasional Spesifik Sektor

### 5.1 Progressive SNR Audio & Onomatopoeia Kelautan
- Audio deru angin laut kencang, deburan ombak membentur lambung kapal, dan suara mesin diesel putaran tinggi.
- Onomatopoeia maritim nelayan:
  - \`ザブン (zabun)\`: Deburan ombak besar yang menghantam geladak kapal.
  - \`ピチピチ (pichi-pichi)\`: Gerakan ikan segar yang melompat-lompat hidup di atas geladak.
  - \`グルグル (guru-guru)\`: Putaran drum mesin penarik jaring (*net hauler*).

### 5.2 Protokol Intervensi Krisis & Kualifikasi SSW-2
- **Tangga Promosi Kualifikasi Menuju SSW-2**:
  - Lisensi Radio Komunikasi Maritim Khusus
  - Lisensi Perwira Kapal Ikan Kecil (**Kogata Senpaku Sōjūshi - 小型船舶操縦士**)
  - Ujian Evaluasi Tokutei Ginō 2-gō Sektor Perikanan $\rightarrow$ Hak tinggal tanpa batas, membawa keluarga, dan jalur **Eijūken**.

---

## Bab 6: 4 Modalitas Latihan Otentik, Scaffolding & Taksonomi Remedial

### 6.1 Empat Modalitas Latihan Otentik
1. **Visual**: Identifikasi jenis simpul tali temali kapal (*Hitch / Knot / Musubikata*) pada gambar diagram tali.
2. **Auditori**: Mengidentifikasi perintah nahkoda (*Omote e ike! Tomo wo tsunaide!*) di tengah deru angin laut.
3. **Skenario**: Menangani jaring pukat yang tersangkut di batu karang dasar laut (*Ne-gakari*).
4. **Prosedural**: Menghitung rasio es dan ikan di dalam palka: perbandingan berat $1:1$ (1 ton es untuk 1 ton ikan) untuk menjaga suhu $0^\circ\text{C}$.

### 6.2 Matriks Taksonomi Remedial (4 Tipe Eror)
- **Tipe L**: Tertukar istilah *Ugen* (kanan kapal) vs *Sagen* (kiri kapal).
- **Tipe C**: Mengira rompi pelampung boleh dilepas saat cuaca laut terlihat cerah.
- **Tipe M**: Salah menghitung suhu palka es ikan di atas 0°C.
- **Tipe P**: Mengoperasikan katrol tali tambang tanpa melepas sarung tangan yang basah longgar.

### 6.3 Tabel Parameter Desain Kurikuler Perikanan
\`\`\`
┌────────────────────────────────────────────────────────────────────────┐
│             PARAMETER DESAIN KURIKULER RESMI NUGGET NIHONGO            │
│                 SEKTOR 12: PERIKANAN & BUDIDAYA (FISHERIES)            │
├───────────────────────────────────┬────────────────────────────────────┤
│ Parameter Kurikulum               │ Nilai Standar Statuter             │
├───────────────────────────────────┼────────────────────────────────────┤
│ Total Jam Belajar Rekomendasi     │ 140 Jam Pelajaran (7 Minggu @20j)  │
│ Rasio Fase 1 (CBT) vs Fase 2 (K3) │ 40% CBT Ujian : 60% Operasional    │
│ Target Bank Soal Prometric CBT    │ 500 Butir Soal Teori & Visual      │
│ Rasio Latihan Audio Noise (SNR)   │ Minimal 45% (Deburan Ombak & Angin)│
│ Kuota Wajib K3 Pelampung & Laut   │ Lulus 100% Modul Tanpa Cacat Eror  │
│ Ambang Kelulusan Simulasi Ujian   │ 80% (Di atas standar resmi 60%)    │
│ Frekuensi Review SRS FSRS         │ Target retensi 90% parameter adaptif│
└───────────────────────────────────┴────────────────────────────────────┘
\`\`\`
`;

fs.writeFileSync(path.join(targetDir, 'SSW-12-FISHERIES-PEDAGOGICAL-FOUNDATION.md'), ssw12Content, 'utf8');
console.log('Successfully written SSW-12 Fisheries Foundation.');

// =========================================================================
// 4. SSW-13 FORESTRY INDUSTRY
// =========================================================================
const ssw13Content = `# Cetak Biru Pedagogis & Kurikulum Kejuruan SSW · Sektor 13: Kehutanan & Penebangan Hutan (Forestry)

> **Kode Dokumen:** \`SSW-PEDAGOGY-13-FORESTRY\`  
> **Versi:** 4.1.0-BIAS-FREE-FOUNDATION  
> **Sektor:** Industri Kehutanan (Forestry Industry / 林業分野)  
> **Kementerian Pembina:** Badan Kehutanan Jepang (Forestry Agency / 林野庁 / MAFF)  
> **Badan Pelaksana Uji:** Dewan Pusat Pengamanan Tenaga Kerja Kehutanan Nasional (Zenkoku Ringyō / 全国林業労働力確保支援センター協議会) & Prometric  
> **Status Bias Lingkungan:** 100% Hutan Pegunungan Terjal, Lereng Rimba & Area Penebangan Batang Pohon (*Sanrin / Ringyō Genba*); Bebas Total dari Bias Konstruksi Bangunan Kota (*Zero Genba Bias*)  
> **Sumber Kurasi Primer:**
> - \`reference-books/ssw/12_ringyou_forestry/Forestry_Exam_Guide_JA.pdf\` & \`reference-books/ssw/12_ringyou_forestry/Forestry_Exam_Guide_ID.pdf\` (Operasional Chainsaw Penebangan Pohon, Mesin Kabel Tower Yarder & K3 Hutan)
> - \`reference-books/ssw/12_ringyou_forestry/Forestry_Sample_Exam_JA.pdf\` (Spesifikasi Resmi CBT Prometric)
> **Landasan Teori & Riset:**
> - Forestry Agency & Zenkoku Ringyo Standards (Forestry Agency & Zenkoku Ringyo 2024 [VS-52])
> - Needs Analysis & Technical Lexicon (Nation & Hwang 1995 [VS-09]; Chung & Nation 2003 [VS-10])
> - High-Vibration Chainsaw Pathology & Tree Felling Hazards (JNIOSH 2020 [VS-39])
> - Cross-Cultural Communication & Anti-Inpei in Forestry (Mustaqim & Priventa 2026 [VS-31])
> - Testing Effect & Retrieval Practice (Roediger & Karpicke 2006 [TE-01])
> - Morpheme-First Compound Kanji Chunking (Matsunaga 1999 [OD-20])

---

## Bab 1: Ekosistem Tempat Kerja & Hierarki Komunikasi Otentik

### 1.1 Struktur Rimba Kehutanan & Peran Industri (Sanrin / Ringyō Genba)
Tempat kerja kehutanan adalah **Sanrin (山林 - Hutan Rimba Pegunungan)** dengan sudut kemiringan lereng mencapai $30^\circ–45^\circ$.
Hierarki operasional:
1. **Ringyō Genba Sekininsha / Tōryō (森林作業責任者 / 棟梁 - Kepala Proyek Kehutanan / Master Logger)**: Menentukan rencana arah rebah penebangan pohon (*Bassai Keikaku*) dan keselamatan lereng jurang.
2. **Kariharai / Chēnsō Sagyō Shuninsha (伐木作業主任者 - Supervisor Penebangan Chainsaw Berlisensi)**.
3. **Kōsoku Sagyo Ginōsha (高性能林業機械オペレーター - Operator Mesin Harvester & Forwarder)**.
4. **Ringyō Sagyōsha (林業作業者 - Penebang Pohon Chainsaw & Penanam Bibit)**: Melakukan pembuatan takik rebah (*Ukenokuchi*), pemotongan dahan (*Eda-harai*), dan pemasangan kabel penarik kayu (*Waiyā rōpu*).

### 1.2 Register Bahasa Otentik & Sinyal Tiupan Peluit Penebangan
Suara deru gergaji mesin chainsaw ($105\text{ dB}$) membuat teriakan manusia tidak terdengar di tengah hutan; komunikasi mutlak menggunakan **Sinyal Peluit Baja (Fue no Aizu - 笛の合図)**:
- **Tiga Tiupan Panjang Peluit**: \`「ピー！ピー！ピー！」\` + Teriakan \`「倒れるぞー！（たおれるぞー！）」\` (*Taoreru zo-!* — Pohon tumbang!). Seluruh orang dalam radius $2\text{ kali tinggi pohon}$ wajib berlindung di titik aman!

### 1.3 Protokol Intervensi Krisis & K3 Celana Kevlar Chainsaw
- **Kewajiban Celana Proteksi Serat Aramid (Chēnsō Chaps / Bōgo-zubon)**:
  - DILARANG KERAS menyalakan chainsaw tanpa memakai celana pelindung berlapis serat aramid kevlar berstandar ISO 11393. Serat kain akan membelit dan mengunci rantai gergaji dalam $0.1\text{ detik}$ jika mata rantai menyentuh paha pekerja.
- **Bahaya Pohon Tersangkut (Kakari-ki no Kiken)**: Jika pohon yang ditebang tersangkut di tajuk pohon sebelahnya (*kakari-ki*), **DILARANG KERAS MEMOTONG POHON TEMPAT TERSANGKUTNYA!** Wajib ditarik menggunakan tali winch kawat baja dari jarak jauh.

---

## Bab 2: Analisis Kritis Kons & Kegagalan Hafalan Buta

### 2.1 Kegagalan Sistemik Hafalan Buta pada Sektor Kehutanan
1. **Ketiadaan Geometri Takik Penebangan (Felling Hinge Geometry Trap)**: Menghafal kanji \`伐木\` (matsuboku - penebangan) tanpa memahami geometri takik: Takik Rebah (*Ukenokuchi*) bersudut $30^\circ–45^\circ$ dengan kedalaman $1/4$ diameter pohon, serta engsel penahan arah (*Tsuru*) sebesar $1/10$ diameter pohon; memotong habis engsel kayu membuat pohon tumbang liar ke arah penebang dan meremukkan tubuh seketika.
2. **Kebutaan Bahaya Hentakan Balik Chainsaw (Kick-Back Danger)**: Ujung atas bilah pemandu (*guide bar nose*) menyentuh kayu keras memicu lonjakan gergaji berkecepatan tinggi ke arah kepala operator (*kikku bakku*).

---

## Bab 3: Pemetaan Hambatan Kognitif, Linguistik & Budaya Siswa Indonesia

### 3.1 Tiga Persona Pembelajar Indonesia
1. **Persona A (Lulusan Kehutanan SMK/D3 Indonesia)**: Memahami jenis kayu, namun belum terbiasa dengan medan pegunungan salju dan traktor kehutanan modern.
2. **Persona B (Ex-Magang Konstruksi/Pertanian)**: Memiliki stamina fisik kuat, namun terbiasa memotong kayu secara ceroboh tanpa APD lengkap.
3. **Persona C (Kandidat Fresh LPK Non-Kehutanan)**: Mengalami kelelahan fisik ekstrem saat mendaki gunung membawa gergaji seberat 7 kg; takut terhadap tawon vespa Jepang (*suzumebachi*).

### 3.2 Matriks Besaran, Metrik & Satuan Pengukuran Kritis Kehutanan

\`\`\`
┌────────────────────────────────────────────────────────────────────────┐
│             MATRIKS PENGUKURAN & SATUAN TEKNIS SEKTOR KEHUTANAN        │
├───────────────────────┬──────────────┬─────────────────────────────────┤
│ Parameter Operasional │ Satuan Resmi │ Nilai Standar & Tindakan Teknis │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 1. Sudut Takik Rebah  │ Derajat (°)  │ • Sudut Ukenokuchi: 30° – 45°   │
│    (受け口の角度)     │              │ • Kedalaman: 1/4 – 1/5 diameter │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 2. Lebar Engsel Kayu  │ Rasio        │ • Lebar Tsuru (ツル): 1/10 pohon│
│    (ツルの幅)         │              │   (Dilarang dipotong habis!)    │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 3. Zona Bahaya Rebah  │ Meter (m)    │ • Radius Evakuasi Aman: 2H      │
│    (立入禁止区域)     │              │   (2 kali lipat tinggi pohon)   │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 4. Jalur Evakuasi     │ Derajat (°)  │ • Arah Lari Penebang: 45° ke    │
│    Penebang (Taihiro) │              │   belakang arah rebah pohon     │
└───────────────────────┴──────────────┴─────────────────────────────────┘
\`\`\`

---

## Bab 4: Arsitektur Kurikulum Fase 1 — Maksimalkan Peluang Lulus Ujian CBT

### 4.1 Struktur Ujian Resmi Prometric CBT Zenkoku Ringyo Kehutanan
30 butir soal pilihan ganda teori anatomi kayu, teknik chainsaw, pemeliharaan mesin kabel, dan K3 lereng terjal dalam 60 menit. Ambang kelulusan: $\ge 60\%$ (Forestry Agency & Zenkoku Ringyo 2024 [VS-52]).

### 4.2 Dekonstruksi Lima Jebakan Distractor Utama Kehutanan
1. **Jebakan Memotong Engsel Tsuru Sampai Putus**: Pilihan yang menyebutkan memotong batang kayu sampai tembus tuntas tanpa menyisakan engsel penahan (*tsuru*) adalah LETHAL ERROR (pohon kehilangan arah kendali jatuh).
2. **Jebakan Melarikan Diri Sejajar Arah Rebah Pohon**: Pilihan melarikan diri ke arah depan rebah pohon atau tepat lurus ke belakang adalah salah; jalur evakuasi wajib $45^\circ$ serong ke belakang (*taihiro*).
3. **Jebakan Bekerja Sendirian di Hutan Rimba**: Pekerjaan penebangan pohon HANYA boleh dilakukan minimal 2 orang yang saling terlihat pandangan untuk pertolongan darurat.

---

## Bab 5: Arsitektur Kurikulum Fase 2 — Kesiapan Kerja Operasional Spesifik Sektor

### 5.1 Progressive SNR Audio & Onomatopoeia Kehutanan
- Audio deru putaran rantai gergaji mesin, derak pohon patah tumbang, dan suara desau angin kanopi hutan.
- Onomatopoeia kehutanan:
  - \`ブォーン (bwōn)\`: Raungan gas mesin chainsaw saat memotong batang kayu cedar (*sugi*).
  - \`メリメリ (meri-meri)\`: Suara serat kayu engsel tsuru yang meregang retak saat pohon mulai condong tumbang.
  - \`ドシーン (doshīn)\`: Dentuman batang pohon seberat 3 ton menghantam tanah.

### 5.2 Protokol Intervensi Krisis & Kualifikasi SSW-2
- **Tangga Promosi Kualifikasi Menuju SSW-2**:
  - Pelatihan Khusus Chainsaw Batang Pohon Besar (**Matsuboku tō Tokubetsu Kyōiku**)
  - Lisensi Mesin Kehutanan Berkinerja Tinggi (**Kōseinō Ringyō Kikai Ginō Kōshū**)
  - Ujian Evaluasi Tokutei Ginō 2-gō Sektor Kehutanan $\rightarrow$ Hak tinggal tanpa batas, membawa keluarga, dan jalur **Eijūken**.

---

## Bab 6: 4 Modalitas Latihan Otentik, Scaffolding & Taksonomi Remedial

### 6.1 Empat Modalitas Latihan Otentik
1. **Visual**: Identifikasi potongan takik rebah dan takik punggung (*Ukenokuchi, Oinokuchi, Tsuru*) pada gambar penampang batang.
2. **Auditori**: Mengidentifikasi bunyi peluit peringatan pohon tumbang di tengah deru chainsaw.
3. **Skenario**: Menangani rantai chainsaw yang terjepit di tengah batang kayu saat memotong.
4. **Prosedural**: Menghitung radius evakuasi aman: pohon setinggi 25 meter $\rightarrow$ radius bahaya $2 \times 25\text{ m} = 50\text{ meter}$.

### 6.2 Matriks Taksonomi Remedial (4 Tipe Eror)
- **Tipe L**: Tertukar istilah *Bassai* (penebangan) vs *Zōrin* (penanaman kembali hutan).
- **Tipe C**: Mengira celana jeans biasa cukup aman untuk menahan laju putaran rantai chainsaw.
- **Tipe M**: Salah menghitung sudut kemiringan takik rebah kurang dari 30°.
- **Tipe P**: Menghidupkan gergaji mesin tanpa mengunci tuas rem rantai (*chēn burēki*).

### 6.3 Tabel Parameter Desain Kurikuler Kehutanan
\`\`\`
┌────────────────────────────────────────────────────────────────────────┐
│             PARAMETER DESAIN KURIKULER RESMI NUGGET NIHONGO            │
│                 SEKTOR 13: KEHUTANAN (FORESTRY)                        │
├───────────────────────────────────┬────────────────────────────────────┤
│ Parameter Kurikulum               │ Nilai Standar Statuter             │
├───────────────────────────────────┼────────────────────────────────────┤
│ Total Jam Belajar Rekomendasi     │ 150 Jam Pelajaran (8 Minggu @20j)  │
│ Rasio Fase 1 (CBT) vs Fase 2 (K3) │ 40% CBT Ujian : 60% Operasional    │
│ Target Bank Soal Prometric CBT    │ 500 Butir Soal Teori & Visual      │
│ Rasio Latihan Audio Noise (SNR)   │ Minimal 45% (Suara Chainsaw Hutan) │
│ Kuota Wajib K3 Chainsaw & Tsuru   │ Lulus 100% Modul Tanpa Cacat Eror  │
│ Ambang Kelulusan Simulasi Ujian   │ 80% (Di atas standar resmi 60%)    │
│ Frekuensi Review SRS FSRS         │ Target retensi 90% parameter adaptif│
└───────────────────────────────────┴────────────────────────────────────┘
\`\`\`
`;

fs.writeFileSync(path.join(targetDir, 'SSW-13-FORESTRY-PEDAGOGICAL-FOUNDATION.md'), ssw13Content, 'utf8');
console.log('Successfully written SSW-13 Forestry Foundation.');

// =========================================================================
// 5. SSW-14 TIMBER & WOOD PROCESSING
// =========================================================================
const ssw14Content = `# Cetak Biru Pedagogis & Kurikulum Kejuruan SSW · Sektor 14: Pengolahan Kayu & Plywood (Timber Processing)

> **Kode Dokumen:** \`SSW-PEDAGOGY-14-WOOD-INDUSTRY\`  
> **Versi:** 4.1.0-BIAS-FREE-FOUNDATION  
> **Sektor:** Industri Pengolahan Kayu & Kayu Lapis (Wood & Timber Processing / 木材産業分野)  
> **Kementerian Pembina:** Badan Kehutanan Jepang (Forestry Agency / 林野庁 / MAFF)  
> **Badan Pelaksana Uji:** Pusat Informasi Kayu Jepang (JAWIC / 一般社団法人 日本木材総合情報センター) & Prometric  
> **Status Bias Lingkungan:** 100% Pabrik Penggergajian Kayu Gelondongan & Pabrik Plywood (*Seizai Kōjō / Gōhan Kōjō*); Bebas Total dari Bias Konstruksi Bangunan Sipil (*Zero Genba Bias*)  
> **Sumber Kurasi Primer:**
> - \`reference-books/ssw/13_mokuzai_timber/Timber_Processing_Exam_Guide_JA.pdf\` & \`reference-books/ssw/13_mokuzai_timber/Timber_Processing_Exam_Guide_ID.pdf\` (Teknik Penggergajian Kayu Balok, Pengupasan Veneer, Pengepresan Plywood & K3 Pabrik Kayu)
> - \`reference-books/ssw/13_mokuzai_timber/Timber_Processing_Sample_Exam_JA.pdf\` (Spesifikasi Resmi CBT Prometric)
> **Landasan Teori & Riset:**
> - JAWIC & Forestry Agency Statutory Standard (JAWIC & Forestry Agency 2024 [VS-49])
> - Needs Analysis & Technical Lexicon (Nation & Hwang 1995 [VS-09]; Chung & Nation 2003 [VS-10])
> - Circular Saw Kickback Safety & Dust Extraction (JNIOSH 2020 [VS-39])
> - Cross-Cultural Communication & Anti-Inpei in Timber Processing (Mustaqim & Priventa 2026 [VS-31])
> - Testing Effect & Retrieval Practice (Roediger & Karpicke 2006 [TE-01])
> - Morpheme-First Compound Kanji Chunking (Matsunaga 1999 [OD-20])

---

## Bab 1: Ekosistem Tempat Kerja & Hierarki Komunikasi Otentik

### 1.1 Struktur Pabrik Pengolahan Kayu & Peran Industri (Seizai / Gōhan Kōjō)
Tempat kerja pengolahan kayu adalah **Seizai Kōjō (製材工場 - Pabrik Penggergajian Balok)** dan **Gōhan Kōjō (合板工場 - Pabrik Kayu Lapis Plywood)**.
Hierarki operasional:
1. **Kōjōchō (工場長 - Kepala Pabrik Pengolahan Kayu)**.
2. **Kizai Kakō Sagyō Shuninsha (木材加工用機械作業主任者 - Safety Supervisor Mesin Pemotong Kayu)**: Memastikan pisau belah anti-kickback dan penutup pengaman terpasang pada gergaji pita/lingkar.
3. **Kensa Gishi (検査技師 - Petugas Kendali Mutu Standar JAS)**: Mengukur kadar kelembapan air kayu (*gansuiritsu*) dan kekuatan rekat lem kayu lapis.
4. **Kikai Operētā (機械オペレーター - Operator Gergaji Pita & Rotary Lathe)**: Mengoperasikan mesin pembelah log kayu besar, pengupas lembaran veneer, dan mesin hot-press.

### 1.2 Register Bahasa Otentik & Aba-Aba Konveyor Log Kayu
- **Aba-Aba Masuk Log Kayu Gelondongan**:
  - \`「丸太投入します！周囲よし！」\` (*Maruta tōnyū shimasu! Shūi yoshi!* — Kayu gelondongan dimasukkan! Sekitar aman!).
  - Saat mengoperasikan gergaji lingkar: \`「送り出しよし！押し棒使用よし！ヨシ！」\` (*Okuridashi yoshi! Oshibō shiyō yoshi! Yoshi!* JNIOSH 2020 [VS-39]).

### 1.3 Protokol Intervensi Krisis & Bahaya Hentakan Balik (Kick-Back)
- **Bahaya Hentakan Balik Gergaji Lingkar (Kikku-bakku)**: Bilah gergaji bundar putaran tinggi dapat menjepit kayu dan melontarkan potongan balok kayu ke arah dada operator seperti peluru. Wajib memasang pisau belah pembagi (*wari-ba*) di belakang bilah gergaji dan selalu menggunakan balok pendorong kayu (**Oshi-bō - 押し棒**) untuk potongan pendek.

---

## Bab 2: Analisis Kritis Kons & Kegagalan Hafalan Buta

### 2.1 Kegagalan Sistemik Hafalan Buta pada Sektor Pengolahan Kayu
1. **Ketiadaan Pemahaman Kadar Air Kayu (Moisture Content Trap)**: Menghafal kata *kanso* (pengeringan) tanpa memahami batas kadar air standar JAS ($\le 15\%$ untuk kayu struktural konstruksi); balok kayu yang belum kering oven sempurna akan melintir melengkung (*kurui*) setelah dipasang pada rumah kayu Jepang, meruntuhkan struktur atap.
2. **Kebutaan Bahaya Debu Serbuk Kayu (Wood Dust Explosion)**: Akumulasi serbuk gergaji halus melayang di udara pabrik berisiko memicu ledakan debu dahsyat (*funjin bakuhatsu*) jika terkena percikan api listrik.

---

## Bab 3: Pemetaan Hambatan Kognitif, Linguistik & Budaya Siswa Indonesia

### 3.1 Tiga Persona Pembelajar Indonesia
1. **Persona A (Ex-Pekerja Penggergajian Kayu / Mebel Indonesia)**: Terbiasa memotong kayu, namun belum terbiasa dengan standar keselamatan sensor mesin otomatis Jepang.
2. **Persona B (Lulusan SMK Kehutanan / Kriya Kayu)**: Menguasai sambungan kayu, namun belum terbiasa dengan mesin pengerik rotary peeling veneer raksasa.
3. **Persona C (Kandidat Fresh Non-Kayu LPK)**: Takut terhadap suara dengung gergaji pita; ceroboh dalam memakai masker respirator penahan debu serbuk kayu.

### 3.2 Matriks Besaran, Metrik & Satuan Pengukuran Kritis Pengolahan Kayu

\`\`\`
┌────────────────────────────────────────────────────────────────────────┐
│             MATRIKS PENGUKURAN & SATUAN TEKNIS PENGOLAHAN KAYU         │
├───────────────────────┬──────────────┬─────────────────────────────────┤
│ Parameter Operasional │ Satuan Resmi │ Nilai Standar & Tindakan Teknis │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 1. Kadar Air Kayu     │ %            │ • Kayu Struktur Standar JAS:    │
│    (含水率 - Gansui)  │ (Persentase) │   ≤ 15% – 20% (Kering oven)     │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 2. Ketebalan Lembaran │ mm           │ • Lembaran Veneer Plywood:      │
│    Veneer (単板厚さ)  │ (Milimeter)  │   0.5 mm – 3.0 mm (Rotary lathe)│
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 3. Tekanan Pengepresan│ MPa          │ • Hot-Press Lembaran Plywood:   │
│    (熱圧圧力)         │ (Mega Pascal)│   0.8 MPa – 1.5 MPa (Suhu 120°C)│
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 4. Jarak Pisau Belah  │ mm           │ • Celah Wari-ba ke Bilah:       │
│    Gergaji (割刃隙間) │ (Milimeter)  │   ≤ 12 mm (Anti-Kickback)       │
└───────────────────────┴──────────────┴─────────────────────────────────┘
\`\`\`

---

## Bab 4: Arsitektur Kurikulum Fase 1 — Maksimalkan Peluang Lulus Ujian CBT

### 4.1 Struktur Ujian Resmi Prometric CBT JAWIC Pengolahan Kayu
30 butir soal pilihan ganda teori sifat fisis kayu, mesin gergaji pita/lingkar, pembuatan plywood, dan K3 pabrik dalam 60 menit. Ambang kelulusan: $\ge 60\%$ (JAWIC & Forestry Agency 2024 [VS-49]).

### 4.2 Dekonstruksi Lima Jebakan Distractor Utama Pengolahan Kayu
1. **Jebakan Mendorong Kayu Pendek dengan Jari Tangan**: Pilihan mendorong kayu berukuran di bawah 30 cm mendekati mata gergaji bundar tanpa balok pendorong (*oshibō*) adalah SALAH FATAL (*yubasetsudan*).
2. **Jebakan Memakai Sarung Tangan Longgar di Mesin Rol**: Pilihan memakai sarung tangan kain longgar saat memasukkan kayu ke mesin rol pengetam (*planner*) adalah pelanggaran keselamatan berat (*makikomi*).
3. **Jebakan Mengabaikan Pengukur Kadar Air Kayu**: Pilihan menilai kekeringan balok kayu hanya dari berat tangan atau ketukan tanpa alat moisture meter digital adalah jawaban salah pada soal CBT.

---

## Bab 5: Arsitektur Kurikulum Fase 2 — Kesiapan Kerja Operasional Spesifik Sektor

### 5.1 Progressive SNR Audio & Onomatopoeia Pengolahan Kayu
- Audio lengkingan bilah gergaji membelah kayu log, derit rol konveyor, dan desau pipa pengisap serbuk kayu (*cyclone dust collector*).
- Onomatopoeia pengolahan kayu:
  - \`ギャーン (gyān)\`: Lengkingan tajam gergaji pita saat memotong kayu keras ek (*nara*).
  - \`ツルツル (tsuru-tsuru)\`: Permukaan papan kayu yang halus licin setelah melewati mesin amplas sanda.
  - \`パキッ (paki')\`: Retakan serat kayu saat proses pengeringan oven terlalu cepat.

### 5.2 Protokol Intervensi Krisis & Kualifikasi SSW-2
- **Tangga Promosi Kualifikasi Menuju SSW-2**:
  - Lisensi Supervisor Mesin Pengolahan Kayu (**Mokuzai Kakōyō Kikai Sagyō Shuninsha**)
  - Ujian Nasional Keterampilan Pengolahan Kayu (**Seizai / Gōhan Ginōshi 2-kyū**)
  - Ujian Evaluasi Tokutei Ginō 2-gō Sektor Industri Kayu $\rightarrow$ Hak tinggal tanpa batas, membawa keluarga, dan jalur **Eijūken**.

---

## Bab 6: 4 Modalitas Latihan Otentik, Scaffolding & Taksonomi Remedial

### 6.1 Empat Modalitas Latihan Otentik
1. **Visual**: Identifikasi arah serat kayu (*Kigokoro / Kinome*) dan cacat mata kayu (*Fushi*) pada gambar potongan kayu.
2. **Auditori**: Mengidentifikasi bunyi kelainan getaran bilah gergaji pita di tengah bising pabrik.
3. **Skenario**: Menangani penumpukan serbuk gergaji yang menyumbat saluran blower hisap.
4. **Prosedural**: Menghitung volume kayu gelondongan: rumus silinder log $V = D^2 \times L \times 10^{-4}\text{ m}^3$.

### 6.2 Matriks Taksonomi Remedial (4 Tipe Eror)
- **Tipe L**: Tertukar istilah *Seizai* (penggergajian kayu) vs *Gōhan* (kayu lapis plywood).
- **Tipe C**: Mengira balok kayu basah boleh langsung dilem hot-press.
- **Tipe M**: Salah membaca nilai kadar kelembapan air digital di atas 20%.
- **Tipe P**: Mengoperasikan mesin gergaji bundar tanpa memasang pisau belah pembagi (*wariba*).

### 6.3 Tabel Parameter Desain Kurikuler Pengolahan Kayu
\`\`\`
┌────────────────────────────────────────────────────────────────────────┐
│             PARAMETER DESAIN KURIKULER RESMI NUGGET NIHONGO            │
│                 SEKTOR 14: INDUSTRI PENGOLAHAN KAYU (WOOD)             │
├───────────────────────────────────┬────────────────────────────────────┤
│ Parameter Kurikulum               │ Nilai Standar Statuter             │
├───────────────────────────────────┼────────────────────────────────────┤
│ Total Jam Belajar Rekomendasi     │ 140 Jam Pelajaran (7 Minggu @20j)  │
│ Rasio Fase 1 (CBT) vs Fase 2 (K3) │ 45% CBT Ujian : 55% Operasional    │
│ Target Bank Soal Prometric CBT    │ 500 Butir Soal Teori & Visual      │
│ Rasio Latihan Audio Noise (SNR)   │ Minimal 40% (Deru Gergaji Pabrik)  │
│ Kuota Wajib K3 Anti-Kickback      │ Lulus 100% Modul Tanpa Cacat Eror  │
│ Ambang Kelulusan Simulasi Ujian   │ 80% (Di atas standar resmi 60%)    │
│ Frekuensi Review SRS FSRS         │ Target retensi 90% parameter adaptif│
└───────────────────────────────────┴────────────────────────────────────┘
\`\`\`
`;

fs.writeFileSync(path.join(targetDir, 'SSW-14-WOOD-INDUSTRY-PEDAGOGICAL-FOUNDATION.md'), ssw14Content, 'utf8');
console.log('Successfully written SSW-14 Wood Industry Foundation.');

// =========================================================================
// 6. SSW-18 AUTOMOBILE TRANSPORT
// =========================================================================
const ssw18Content = `# Cetak Biru Pedagogis & Kurikulum Kejuruan SSW · Sektor 18: Transportasi Mobil & Logistik (Automobile Transport)

> **Kode Dokumen:** \`SSW-PEDAGOGY-18-AUTOMOBILE-TRANSPORT\`  
> **Versi:** 4.1.0-BIAS-FREE-FOUNDATION  
> **Sektor:** Industri Pengemudi Transportasi Darat (Automobile Transport / 自動車運送業分野 - トラック・バス・タクシー)  
> **Kementerian Pembina:** Kementerian Pertanahan, Infrastruktur, Transportasi dan Pariwisata Jepang (MLIT / 国土交通省)  
> **Badan Pelaksana Uji:** Badan Keselamatan Transportasi Kendaraan Jepang (NASVA / 自動車事故対策機構) & MLIT Prometric  
> **Status Regulasi Pengemudi:** Mengemudi di Bawah Lisensi Komersial Kelas 2 (*Dai-ni-shu Menkyo*) untuk Taksi/Bus, dan Lisensi Standar Truk Logistik (*Chūgata/Ōgata Menkyo*)  
> **Status Bias Lingkungan:** 100% Kokpit Kendaraan, Depo Logistik, Terminal Kargo & Jalan Tol Nasional (*Torakku Yādo / Kōsoku Dōro*); Bebas Total dari Bias Konstruksi Bangunan Sipil (*Zero Genba Bias*)  
> **Sumber Kurasi Primer:**
> - \`reference-books/ssw/14_jidousha_unsou_transport/Transport_Truck_Driver_Sample_Exam_JA.pdf\` (Spesifikasi Ujian Tertulis Pengemudi Truk Kargo Logistik)
> **Landasan Teori & Riset:**
> - MLIT Statutory Transport Guidelines (MLIT 2024 [VS-45])
> - NASVA Roll-Call Alcohol Inspection Manual (NASVA 2023 [VS-46])
> - Needs Analysis & Technical Lexicon (Nation & Hwang 1995 [VS-09]; Chung & Nation 2003 [VS-10])
> - Professional Driving Fatigue & Pointing-and-Calling (JNIOSH 2020 [VS-39])
> - Cross-Cultural Communication & Anti-Inpei in Transport (Mustaqim & Priventa 2026 [VS-31])
> - Testing Effect & Retrieval Practice (Roediger & Karpicke 2006 [TE-01])
> - Morpheme-First Compound Kanji Chunking (Matsunaga 1999 [OD-20])

---

## Bab 1: Ekosistem Tempat Kerja & Hierarki Komunikasi Otentik

### 1.1 Struktur Depo Transportasi & Peran Industri (Torakku Yādo / Eigyōsho)
Tempat kerja pengemudi transportasi adalah **Eigyōsho / Torakku Yādo (営業所 / トラックヤード - Kantor Operasional & Depo Truk Logistik)**.
Hierarki operasional:
1. **Unkou Kanrisha (運行管理者 - Manajer Pengendali Operasional Perjalanan)**: Memegang lisensi statuter MLIT yang bertanggung jawab memimpin apel wajib sebelum/sesudah dinas (*Tenko*), menguji kadar alkohol, dan memantau GPS kendaraan.
2. **Seibi Kanrisha (整備管理者 - Manajer Pemeliharaan Truk)**: Memastikan kelaikan harian ban, rem, dan lampu sebelum truk diizinkan keluar depo.
3. **Puro Doraibā (プロドライバー - Pengemudi Profesional Truk/Bus/Taksi)**: Melakukan pemuatan kargo (*tsumikomi*), mengikat tali pengaman muatan (*torafikku rōpu*), mengemudikan truk antarkota, dan menyerahkan dokumen tanda terima kiriman (*denpyō*).

### 1.2 Register Bahasa Otentik & Apel Wajib Roll-Call (Tenko)
Sebelum memutar kunci kontak dan setelah selesai bertugas, pengemudi wajib menjalani pemeriksaan tatap muka langsung:
- **Apel Roll-Call Sebelum Berangkat (Jōsha-mae Tenko - 乗車前点呼)**:
  - Uji Tiup Alkohol Digital: \`「アルコールチェック0.000 mg/L確認！酒気帯びなし！」\` (*Arukōru chekku zero-ten zero-zero-zero yoshi! Shuki-obi nashi!* NASVA 2023 [VS-46]).
  - Laporan Fisik: \`「体調良好！睡眠時間7時間！運行計画よし！」\` (*Taichō ryōkō! Suimin jikan 7-jikan! Unkō keikaku yoshi!*).
- **Pointing and Calling di Kursi Pengemudi (Untenseki Shishi Koshō)**:
  - Sebelum berbelok ke kiri di persimpangan jalan: \`「左巻き込みよし！歩行者よし！一時停止よし！ヨシ！」\` (*Hidari makikomi yoshi! Hokōsha yoshi! Ichiji teishi yoshi! Yoshi!* JNIOSH 2020 [VS-39]).

### 1.3 Protokol Intervensi Krisis: Toleransi Nol Alkohol (0.000 mg/L)
- **Aturan Statuter Nol Toleransi Alkohol (Shuki-obi Unten Kinshi)**: Di Jepang, batas toleransi alkohol bagi pengemudi transportasi komersial adalah **$0.000\text{ mg/L}$ MUTLAK**. Terdeteksi $0.001\text{ mg/L}$ saja berakibat pemecatan seketika, pencabutan lisensi seumur hidup, dan ancaman pidana kurungan. Meminum minuman beralkohol pada malam sebelum dinas dilarang keras.
- **Anti-Inpei Microsleep / Mengantuk Saat Mengemudi**: Jika merasakan kantuk tak tertahankan di jalan tol, pengemudi wajib berhenti di rest area (*SA / PA*) terdekat untuk tidur sejenak 15 menit. Menyembunyikan rasa kantuk (*inpei*) demi mengejar target waktu berakibat tabrakan maut (Mustaqim & Priventa 2026 [VS-31]).

---

## Bab 2: Analisis Kritis Kons & Kegagalan Hafalan Buta

### 2.1 Kegagalan Sistemik Hafalan Buta pada Sektor Transportasi
1. **Ketiadaan Pemahaman Titik Buta & Radius Putar Truk (Inner Wheel Radius Blindness)**: Menghafal kanji \`内輪差\` (naarinsa - perbedaan radius roda depan dan belakang) tanpa memahami bahwa saat truk panjang berbelok ke kiri, ban belakang memotong jalur trotoar lebih rapat hingga 2 meter; kelalaian melihat spion bawah kiri melindas pengendara sepeda atau pejalan kaki yang berhenti di lampu merah (*makikomi jiko*).
2. **Kebutaan Regulasi Jam Mengemudi Statuter**: Siswa tidak memahami batas maksimal mengemudi terus-menerus (maksimal 4 jam berturut-turut, wajib diselingi istirahat akumulatif minimal 30 menit).

---

## Bab 3: Pemetaan Hambatan Kognitif, Linguistik & Budaya Siswa Indonesia

### 3.1 Tiga Persona Pembelajar Indonesia
1. **Persona A (Mantan Sopir Truk / Bus Antarkota Indonesia)**: Memiliki keterampilan menyetir yang handal, namun terbiasa dengan gaya mengemudi agresif di Indonesia; kaget dengan kepatuhan mutlak marka jalan dan batas kecepatan ketat jalan tol Jepang ($80\text{ km/jam}$ untuk truk).
2. **Persona B (Pemegang SIM A/C Indonesia yang Mengikuti Pelatihan LPK)**: Penguasaan bahasa Jepang baik, namun belum terbiasa mengendalikan truk kargo seberat 8–10 ton di jalanan sempit kota Jepang.
3. **Persona C (Ex-Magang Manufaktur yang Pindah Jalur)**: Terbiasa dengan bahasa instruksi pabrik, namun cemas saat harus berhadapan langsung dengan staf logistik gudang saat serah terima barang.

### 3.2 Matriks Besaran, Metrik & Satuan Pengukuran Kritis Transportasi

\`\`\`
┌────────────────────────────────────────────────────────────────────────┐
│             MATRIKS PENGUKURAN & SATUAN TEKNIS SEKTOR TRANSPORTASI     │
├───────────────────────┬──────────────┬─────────────────────────────────┤
│ Parameter Operasional │ Satuan Resmi │ Nilai Standar & Tindakan Teknis │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 1. Kadar Alkohol Tiup │ mg/L         │ • Standar Wajib: 0.000 mg/L     │
│    (呼気中アルコール) │ (Miligram/L) │   (Toleransi Nol Mutlak NASVA)  │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 2. Jam Kemudi Maksimal│ Jam (h)      │ • Maksimal Terus-Menerus: 4 Jam │
│    (連続運転時間)     │              │ • Istirahat Wajib: ≥ 30 Menit   │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 3. Jarak Istirahat    │ Jam (h)      │ • Jeda Antar Shift (Kyūsoku):   │
│    Antar Dinas Kerja  │              │   Minimal 9 – 11 Jam Berturut   │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 4. Batas Kecepatan Tol│ km/h         │ • Truk Kargo Berat: 80 km/h     │
│    (高速道路最高速度) │ (Kilometer/j)│ • Speed Limiter Terpasang: 90km/h
└───────────────────────┴──────────────┴─────────────────────────────────┘
\`\`\`

---

## Bab 4: Arsitektur Kurikulum Fase 1 — Maksimalkan Peluang Lulus Ujian CBT

### 4.1 Struktur Ujian Resmi Prometric CBT MLIT Transportasi
Ujian mencakup 30 soal pilihan ganda peraturan lalu lintas, UU Standar Pengemudi Truk, K3 pengikatan muatan, dan etika operasional dalam 60 menit. Ambang kelulusan: $\ge 60\%$ (MLIT 2024 [VS-45]).

### 4.2 Dekonstruksi Lima Jebakan Distractor Utama Transportasi
1. **Jebakan Mengemudi Melebihi 4 Jam Berturut-turut**: Pilihan yang mengizinkan mengemudi 5 jam tanpa istirahat asalkan kondisi fisik terasa segar adalah SALAH MUTLAK (pelanggaran regulasi statuter MLIT).
2. **Jebakan Minum Alkohol Sedikit di Malam Hari**: Pilihan minum bir 1 kaleng kecil pada jam 22:00 saat shift pagi dimulai pukul 05:00 adalah LETHAL ERROR (alkohol belum terurai tuntas di hati, sensor mendeteksi residu).
3. **Jebakan Berhenti di Bahu Jalan Tol Tanpa Rambu Darurat**: Pilihan berhenti darurat di bahu jalan tol tanpa menyalakan lampu hazard dan tanpa memasang segitiga pengaman (*Hatsukōtō / Teishiban*) adalah salah fatal.

---

## Bab 5: Arsitektur Kurikulum Fase 2 — Kesiapan Kerja Operasional Spesifik Sektor

### 5.1 Progressive SNR Audio & Onomatopoeia Transportasi
- Audio radio navigasi GPS dan suara komunikasi dispatch kantor di tengah deru angin kecepatan tinggi jalan tol dan gemuruh mesin diesel.
- Onomatopoeia transportasi:
  - \`スリップ (surippu)\`: Ban selip licin akibat fenomena lapisan es tipis jalanan (*Black Ice / Ketsu-hyō*).
  - \`ガタッ (gata')\`: Muatan barang di bak belakang bergeser akibat ikatan tali kendor.
  - \`シュー (shū)\`: Suara pelepasan tekanan rem angin (*air brake*).

### 5.2 Protokol Intervensi Krisis & Kualifikasi SSW-2
- **Tangga Promosi Kualifikasi Menuju SSW-2**:
  - Lisensi Mengemudi Kendaraan Berat Jepang (**Ōgata Menkyo / 大型免許**)
  - Lisensi Komersial Penumpang Kelas 2 (**Dai-ni-shu Menkyo / 第二種免許**)
  - Ujian Evaluasi Tokutei Ginō 2-gō Sektor Transportasi $\rightarrow$ Hak tinggal tanpa batas, membawa keluarga, dan jalur **Eijūken**.

---

## Bab 6: 4 Modalitas Latihan Otentik, Scaffolding & Taksonomi Remedial

### 6.1 Empat Modalitas Latihan Otentik
1. **Visual**: Identifikasi blind spot truk dan rambu larangan muatan berlebih (*Kasekiya Kinshi*) pada gambar.
2. **Auditori**: Mengidentifikasi instruksi rute pengiriman dari radio dispatch logistik.
3. **Skenario**: Menangani pecah ban di jalan tol (*pan-ku*) dan evakuasi di belakang pagar pembatas (*gādorēru no soto*).
4. **Prosedural**: Menghitung beban sumbu gandar: memastikan berat per sumbu tidak melebihi 10 ton.

### 6.2 Matriks Taksonomi Remedial (4 Tipe Eror)
- **Tipe L**: Tertukar istilah *Nitsukumi* (memuat kargo) vs *Nioroshi* (membongkar kargo).
- **Tipe C**: Mengira batas kadar alkohol tiup di Jepang sama dengan negara yang memberi toleransi 0.05%.
- **Tipe M**: Salah menghitung waktu istirahat 30 menit per 4 jam mengemudi.
- **Tipe P**: Mengemudikan truk keluar depo sebelum menyelesaikan prosedur apel Tenko.

### 6.3 Tabel Parameter Desain Kurikuler Transportasi
\`\`\`
┌────────────────────────────────────────────────────────────────────────┐
│             PARAMETER DESAIN KURIKULER RESMI NUGGET NIHONGO            │
│                 SEKTOR 18: TRANSPORTASI MOBIL (AUTOMOBILE TRANSPORT)   │
├───────────────────────────────────┬────────────────────────────────────┤
│ Parameter Kurikulum               │ Nilai Standar Statuter             │
├───────────────────────────────────┼────────────────────────────────────┤
│ Total Jam Belajar Rekomendasi     │ 150 Jam Pelajaran (8 Minggu @20j)  │
│ Rasio Fase 1 (CBT) vs Fase 2 (K3) │ 40% CBT Ujian : 60% Operasional    │
│ Target Bank Soal Prometric CBT    │ 550 Butir Soal Teori & Visual      │
│ Rasio Latihan Audio Noise (SNR)   │ Minimal 40% (Deru Angin Jalan Tol) │
│ Kuota Wajib K3 Alkohol & Jam Kerja│ Lulus 100% Modul Tanpa Cacat Eror  │
│ Ambang Kelulusan Simulasi Ujian   │ 80% (Di atas standar resmi 60%)    │
│ Frekuensi Review SRS FSRS         │ Target retensi 90% parameter adaptif│
└───────────────────────────────────┴────────────────────────────────────┘
\`\`\`
`;

fs.writeFileSync(path.join(targetDir, 'SSW-18-AUTOMOBILE-TRANSPORT-PEDAGOGICAL-FOUNDATION.md'), ssw18Content, 'utf8');
console.log('Successfully written SSW-18 Automobile Transport Foundation.');

// =========================================================================
// 7. SSW-19 RAILWAY OPERATIONS
// =========================================================================
const ssw19Content = `# Cetak Biru Pedagogis & Kurikulum Kejuruan SSW · Sektor 19: Operasional & Pemeliharaan Perkeretaapian (Railway)

> **Kode Dokumen:** \`SSW-PEDAGOGY-19-RAILWAY\`  
> **Versi:** 4.1.0-BIAS-FREE-FOUNDATION  
> **Sektor:** Industri Perkeretaapian (Railway Operations / 鉄道業分野 - 線路保全・電気・車両)  
> **Kementerian Pembina:** Kementerian Pertanahan, Infrastruktur, Transportasi dan Pariwisata Jepang (MLIT / 国土交通省)  
> **Badan Pelaksana Uji:** Biro Perkeretaapian MLIT & Asosiasi Operasional Kereta Api Jepang (JTOA)  
> **Status Bias Lingkungan:** 100% Jalur Rel Komuter Aktif, Gardu Traksi Listrik Aliran Atas & Dipo Shinkansen (*Kisen / Eki / Shasoko*); Bebas Total dari Bias Konstruksi Gedung Sipil (*Zero Genba Bias*)  
> **Sumber Kurasi Primer:**
> - \`reference-books/ssw/15_tetsudou_railway/Railway_Track_Maintenance_Sample_Exam_JA.pdf\` (Ujian Evaluasi Pemeliharaan Jalur Rel / 線路保守)
> - \`reference-books/ssw/15_tetsudou_railway/Railway_Rolling_Stock_Sample_Exam_JA.pdf\` (Ujian Evaluasi Pemeliharaan Rangkaian Kereta / 車両電気)
> **Landasan Teori & Riset:**
> - MLIT Railway Bureau Statutory Standard (MLIT 2024 [VS-53])
> - Pointing-and-Calling Cognitive Verification (JNIOSH 2020 [VS-39])
> - Needs Analysis & Technical Lexicon (Nation & Hwang 1995 [VS-09]; Chung & Nation 2003 [VS-10])
> - Geminate Acoustic Intelligibility in Shouted Railway Warnings (Husna & Febriyanti 2022 [EA-25])
> - Cross-Cultural Communication & Anti-Inpei in Track Safety (Mustaqim & Priventa 2026 [VS-31])
> - Testing Effect & Retrieval Practice (Roediger & Karpicke 2006 [TE-01])
> - Morpheme-First Compound Kanji Chunking (Matsunaga 1999 [OD-20])

---

## Bab 1: Ekosistem Tempat Kerja & Hierarki Komunikasi Otentik

### 1.1 Struktur Jalur Rel & Peran Industri (Kisen / Tetsudō Rosen)
Tempat kerja perkeretaapian di Jepang adalah **Kisen / Rosen (本線 / 路線 - Jalur Rel Aktif)** yang beroperasi di malam hari saat kereta berhenti dinas (jendela waktu kerja malam / *Maku-aida* antara pukul 01:00 hingga 04:30 pagi).
Hierarki operasional:
1. **Hosenku-chō / Senro Sekininsha (保線区長 / 線路作業責任者 - Kepala Distrik Pemeliharaan Rel)**: Memegang izin blokir jalur resmi (*Kikō Senkyū*) dari pusat kendali operasi (*CTC*).
2. **Ressha Kanshi'in (列車監視員 - Petugas Pemantau Kereta Berlisensi Mutlak)**: Berdiri di titik pandang bebas dengan memegang terompet sinyal dan bendera; tugas tunggalnya hanya memantau kedatangan kereta.
3. **Senro Hosen Kōin (線路保線工員 - Teknisi Pemeliharaan Geometri Rel)**: Mengoperasikan mesin tie tamper pemadat kerikil ballast, mengganti bantalan rel (*makuragi*), dan memeriksa kerataan rel.
4. **Sharyō Seibi Gishi (車両整備技師 - Teknisi Dipo Rangkaian Gerbong)**: Memeriksa keausan pantograf listrik, keausan roda baja (*rinshō*), dan sistem rem angin.

### 1.2 Register Bahasa Otentik & Seruan Sinyal Pemantau Kereta
Di atas jalur rel aktif, satu detik kelalaian berakibat tertabrak kereta yang melaju hening $120\text{ km/jam}$ (*ressha shokusho jiko*):
- **Aba-Aba Sinyal Terompet Pemantau Kereta (Kanshi'in no Aizu)**:
  - Terompet dibunyikan panjang: \`「プォーーー！」\`
  - Seruan lantang petugas: \`「上り列車接近！線路外待避！（のぼりれっしゃせっきん！せんろがいたいひ！）」\` (*Nobori ressha sekkin! Senrogai taihi!* — Kereta jalur hulu mendekat! Seluruhnya evakuasi keluar rel!) (Husna & Febriyanti 2022 [EA-25]; MLIT 2024 [VS-53]).
  - Respon seluruh pekerja di parit pengaman: \`「待避よし！ヨシ！」\` (*Taihi yoshi! Yoshi!* JNIOSH 2020 [VS-39]).

### 1.3 Protokol Intervensi Krisis & K3 Tegangan Tinggi Katener (25,000V)
- **Bahaya Sengatan Kawat Listrik Aliran Atas (Kasen Kanden Bōshi)**: Kawat troli katener di atas rel bertegangan $1,500\text{ V}$ DC (jalur biasa) hingga $25,000\text{ V}$ AC (Shinkansen). Dilarang membawa pipa baja atau tiang pengukur berdiri tegak ke atas yang mendekati radius $2\text{ meter}$ dari kawat listrik.
- **Anti-Inpei Kerikil di Celah Wesel Rel (Point Shutsugen)**: Menemukan kerikil atau benda logam terjepit di antara lidah wesel pemindah jalur kereta (*tsuidōki*) wajib dibersihkan dan dilaporkan seketika; kerikil yang mengganjal wesel berakibat Shinkansen anjlok terguling.

---

## Bab 2: Analisis Kritis Kons & Kegagalan Hafalan Buta

### 2.1 Kegagalan Sistemik Hafalan Buta pada Sektor Perkeretaapian
1. **Ketiadaan Pemahaman Geometri Rel Milimeter (Track Geometry Distortion Trap)**: Menghafal kata *senro* (rel) tanpa memahami parameter milimeter: Lebar sepur (*Kidō kyōgaku* $1,067\text{ mm} \pm 2\text{ mm}$), Peninggian rel luar tikungan (*Kanto*), dan Kerataan membujur (*Kōshō*); deviasi $3\text{ mm}$ pada kecepatan tinggi memicu anjlokan roda kereta (*datsusen jiko*).
2. **Kebutaan Prosedur Penutupan Jalur Kereta (Track Possession)**: Memulai pekerjaan perbaikan rel sebelum menerima surat konfirmasi penutupan jalur resmi dari dispatcher CTC adalah pelanggaran keselamatan paling fatal di dunia perkeretaapian.

---

## Bab 3: Pemetaan Hambatan Kognitif, Linguistik & Budaya Siswa Indonesia

### 3.1 Tiga Persona Pembelajar Indonesia
1. **Persona A (Lulusan D3/S1 Perkeretaapian / Ex-Teknisi KAI Indonesia)**: Memahami istilah sepur dan bantalan, namun kaget dengan disiplin presisi milimeter dan jadwal kerja malam buta (*yakan sagyo*) Jepang.
2. **Persona B (Ex-Magang Konstruksi Sipil)**: Terbiasa dengan perkakas berat dan batu ballast, namun lemah dalam prosedur komunikasi radio nirkabel terstandarisasi.
3. **Persona C (Kandidat Fresh Non-Rel LPK)**: Sangat takut berada di jalur rel malam hari; rentan mengalami disorientasi arah jalur hulu (*nobori*) vs hilir (*kudari*).

### 3.2 Matriks Besaran, Metrik & Satuan Pengukuran Kritis Perkeretaapian

\`\`\`
┌────────────────────────────────────────────────────────────────────────┐
│             MATRIKS PENGUKURAN & SATUAN TEKNIS SEKTOR PERKERETAAPIAN   │
├───────────────────────┬──────────────┬─────────────────────────────────┤
│ Parameter Operasional │ Satuan Resmi │ Nilai Standar & Tindakan Teknis │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 1. Lebar Sepur Jalur  │ mm           │ • Sepur Standar Sempit: 1,067 mm│
│    (軌間 - Kikan)     │ (Milimeter)  │ • Shinkansen: 1,435 mm (±2 mm)  │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 2. Tegangan Kawat LAA │ Volt (V)     │ • Kereta Biasa: 1,500 V DC      │
│    (架線電圧 - Kasen) │              │ • Shinkansen: 25,000 V AC       │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 3. Jarak Bebas Rel    │ Meter (m)    │ • Jarak Evakuasi: ≥ 2.0 m dari  │
│    (建築限界)         │              │   rel terluar ke titik aman     │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 4. Jendela Waktu Kerja│ Jam / Menit  │ • Waktu Malam: 01:00 – 04:30    │
│    (間合い - Ma-ai)   │              │   (Wajib bersih sebelum subuh!) │
└───────────────────────┴──────────────┴─────────────────────────────────┘
\`\`\`

---

## Bab 4: Arsitektur Kurikulum Fase 1 — Maksimalkan Peluang Lulus Ujian CBT

### 4.1 Struktur Ujian Resmi Prometric CBT MLIT Perkeretaapian
30 butir soal pilihan ganda teori geometri rel, K3 listrik aliran atas, pemeliharaan wesel, dan prosedur evakuasi darurat dalam 60 menit. Ambang kelulusan: $\ge 60\%$ (MLIT 2024 [VS-53]).

### 4.2 Dekonstruksi Lima Jebakan Distractor Utama Perkeretaapian
1. **Jebakan Masuk ke Jalur Rel Tanpa Kanshi'in**: Pilihan melakukan inspeksi rel di jalur aktif tanpa didampingi Petugas Pemantau Kereta (*Ressha Kanshi'in*) adalah SALAH MUTLAK.
2. **Jebakan Membawa Batang Logam Vertikal di Bawah Kawat Listrik**: Pilihan memikul batang besi pengukur rel secara tegak lurus di bawah kawat katener listrik $25,000\text{ V}$ adalah LETHAL ERROR (sengatan loncatan listrik tegangan tinggi).
3. **Jebakan Mengabaikan Waktu Habis Jendela Kerja**: Pilihan melanjutkan perbaikan rel melewati batas jam penutupan jalur malam hari (melebihi pukul 04:30) adalah pelanggaran jadwal berat yang melumpuhkan sistem transportasi nasional.

---

## Bab 5: Arsitektur Kurikulum Fase 2 — Kesiapan Kerja Operasional Spesifik Sektor

### 5.1 Progressive SNR Audio & Onomatopoeia Perkeretaapian
- Audio seruan terompet darurat di tengah derak roda baja melintas sambungan rel dan dengung transformator traksi gardu listrik.
- Onomatopoeia perkeretaapian:
  - \`ガタンゴトン (gatan-goton)\`: Bunyi benturan roda kereta saat melintasi celah sambungan rel (*tsugime*).
  - \`キーッ (kī')\`: Gesekan keras roda baja pada rel di tikungan tajam (*flange squeal*).
  - \`プォーン (pwōn)\`: Bunyi klakson peringatan masinis kereta dari kejauhan.

### 5.2 Protokol Intervensi Krisis & Kualifikasi SSW-2
- **Tombol Berhenti Darurat Kereta Api (Ressha Hijō Teishi Sōchi)**: Menekan tombol darurat di peron stasiun atau membakar sinyal suar darurat (*Hatsuentō*) di atas rel saat melihat rintangan longsor.
- **Kualifikasi Menuju SSW-2**:
  - Lisensi Petugas Pemantau Kereta Api Resmi (**Ressha Kanshi'in Menkyo**)
  - Ujian Evaluasi Tokutei Ginō 2-gō Sektor Perkeretaapian (Tingkat Kepala Regu Pemeliharaan Hosen) $\rightarrow$ Hak tinggal tanpa batas, membawa keluarga, dan jalur **Eijūken**.

---

## Bab 6: 4 Modalitas Latihan Otentik, Scaffolding & Taksonomi Remedial

### 6.1 Empat Modalitas Latihan Otentik
1. **Visual**: Identifikasi deviasi geometri rel (kelebaran sepur, peninggian rel kant) pada grafik rekaman kereta ukur track inspection car (*Doctor Yellow*).
2. **Auditori**: Mengidentifikasi bunyi seruan terompet pemantau kereta (*Kanshi'in*) di tengah bising mesin ballast tamper.
3. **Skenario**: Menangani situasi hilangnya sinyal konfirmasi penutupan jalur saat shift kerja malam.
4. **Prosedural**: Menghitung peninggian rel tikungan: $C = \frac{11.8 \times V^2}{R}\text{ mm}$.

### 6.2 Matriks Taksonomi Remedial (4 Tipe Eror)
- **Tipe L**: Tertukar istilah *Nobori* (kereta arah ibukota/hulu) vs *Kudari* (kereta arah daerah/hilir).
- **Tipe C**: Mengira kawat listrik rel tidak berbahaya jika tidak disentuh langsung (tegangan $25,000\text{ V}$ dapat meloncat di udara lembap).
- **Tipe M**: Salah membaca nilai deviasi lebar rel $\pm 2\text{ mm}$.
- **Tipe P**: Mengabaikan aba-aba evakuasi terompet pemantau kereta.

### 6.3 Tabel Parameter Desain Kurikuler Perkeretaapian
\`\`\`
┌────────────────────────────────────────────────────────────────────────┐
│             PARAMETER DESAIN KURIKULER RESMI NUGGET NIHONGO            │
│                 SEKTOR 19: OPERASIONAL KERETA API (RAILWAY)            │
├───────────────────────────────────┬────────────────────────────────────┤
│ Parameter Kurikulum               │ Nilai Standar Statuter             │
├───────────────────────────────────┼────────────────────────────────────┤
│ Total Jam Belajar Rekomendasi     │ 150 Jam Pelajaran (8 Minggu @20j)  │
│ Rasio Fase 1 (CBT) vs Fase 2 (K3) │ 40% CBT Ujian : 60% Operasional    │
│ Target Bank Soal Prometric CBT    │ 500 Butir Soal Teori & Visual      │
│ Rasio Latihan Audio Noise (SNR)   │ Minimal 45% (Suara Rel & Terompet) │
│ Kuota Wajib K3 Kanshi'in & Jalur  │ Lulus 100% Modul Tanpa Cacat Eror  │
│ Ambang Kelulusan Simulasi Ujian   │ 80% (Di atas standar resmi 60%)    │
│ Frekuensi Review SRS FSRS         │ Target retensi 90% parameter adaptif│
└───────────────────────────────────┴────────────────────────────────────┘
\`\`\`
`;

fs.writeFileSync(path.join(targetDir, 'SSW-19-RAILWAY-PEDAGOGICAL-FOUNDATION.md'), ssw19Content, 'utf8');
console.log('Successfully written SSW-19 Railway Foundation.');

// =========================================================================
// 8. SSW-08 AVIATION GROUND HANDLING
// =========================================================================
const ssw08Content = `# Cetak Biru Pedagogis & Kurikulum Kejuruan SSW · Sektor 08: Ground Handling Penerbangan (Aviation)

> **Kode Dokumen:** \`SSW-PEDAGOGY-08-AVIATION\`  
> **Versi:** 4.1.0-BIAS-FREE-FOUNDATION  
> **Sektor:** Industri Pelayanan Darat Bandara (Aviation Ground Handling / 航空・空港グランドハンドリング分野)  
> **Kementerian Pembina:** Kementerian Pertanahan, Infrastruktur, Transportasi dan Pariwisata Jepang (MLIT / 国土交通省)  
> **Badan Pelaksana Uji:** Asosiasi Pelayanan Darat Penerbangan Jepang (JAGHA / 一般社団法人 日本航空専門学校・日本グランドハンドリング協会) & Prometric  
> **Status Bias Lingkungan:** 100% Pelataran Parkir Pesawat Apron, Jalur Taxiway & Terminal Kargo Bandara Internasional (*Kūkō Apron / Rampu Area*); Bebas Total dari Bias Konstruksi Bangunan Sipil (*Zero Genba Bias*)  
> **Sumber Kurasi Primer:**
> - \`reference-books/ssw/16_koukuu_aviation/Aviation_Ground_Handling_Exam_Guide_JA.pdf\` & \`reference-books/ssw/16_koukuu_aviation/Aviation_Ground_Handling_Exam_Guide_ID.pdf\` (Operasional Marshalling Pesawat, Towing Tractor, Muatan Kargo ULD & K3 Ramp)
> - \`reference-books/ssw/16_koukuu_aviation/Aviation_Ground_Handling_Sample_Exam_JA.pdf\` (Spesifikasi Resmi CBT Prometric)
> **Landasan Teori & Riset:**
> - Civil Aviation Bureau & JAGHA Statutory Standard (Civil Aviation Bureau MLIT & JAGHA 2024 [VS-51])
> - Pointing-and-Calling Cognitive Verification (JNIOSH 2020 [VS-39])
> - Needs Analysis & Technical Lexicon (Nation & Hwang 1995 [VS-09]; Chung & Nation 2003 [VS-10])
> - Geminate Acoustic Intelligibility in Jet Noise Environment (Husna & Febriyanti 2022 [EA-25])
> - Cross-Cultural Communication & Anti-Inpei in Aviation Safety (Mustaqim & Priventa 2026 [VS-31])
> - Testing Effect & Retrieval Practice (Roediger & Karpicke 2006 [TE-01])
> - Morpheme-First Compound Kanji Chunking (Matsunaga 1999 [OD-20])

---

## Bab 1: Ekosistem Tempat Kerja & Hierarki Komunikasi Otentik

### 1.1 Struktur Pelataran Bandara & Peran Industri (Apron / Rampu Area)
Tempat kerja ground handling penerbangan adalah **Kūkō Apron / Rampu Area (空港エプロン / ランプエリア - Pelataran Parkir Pesawat Udara)** di bandara internasional utama (Haneda, Narita, Kansai, Chubu).
Hierarki operasional:
1. **Rampu Rīdā / Bōdō (ランプリーダー / ロードマスター - Ramp Master / Pemimpin Operasi Ramp)**: Mengawasi pemuatan kargo, keseimbangan titik berat pesawat (*Weight and Balance*), dan jadwal keberangkatan tepat waktu (*On-Time Performance*).
2. **Māsharā (マーシャラー - Juru Pemandu Parkir Pesawat / Aircraft Marshaller)**: Memandu pilot mengarahkan roda hidung pesawat ke garis henti (*chokkosen*) menggunakan dua tongkat sinyal pemandu.
3. **Pusshubakku Operētā (プッシュバックオペレーター - Pengemudi Truk Pendorong Pesawat Towing Tractor)**: Menghubungkan batang penarik (*towbar*) ke roda pendarat depan pesawat jet raksasa seberat ratusan ton.
4. **Baggēji / Kāgo Sagyōsha (手荷物・貨物ハンドラー - Petugas Penanganan Bagasi & Peti Kemas ULD)**: Memuat kontainer kargo ke dalam palka perut pesawat (*bulk / lower deck*).

### 1.2 Register Bahasa Otentik & Sinyal Visual Tongkat Marshalling
Di pelataran apron, deru mesin turbofan pesawat jet mencapai $> 110\text{ dB}$, sehingga komunikasi verbal wajib menggunakan headset interkom antarkru dan **Sinyal Visual Tongkat Marshalling Standar ICAO**:
- **Sinyal Marshalling Standar**:
  - Maju lurus: Kedua tangan ditekuk ke atas secara berulang-ulang (*Straight Ahead*).
  - Belok kiri/kanan: Satu tangan mengarah ke samping, satu tangan memandu putaran.
  - Berhenti Darurat: Kedua tangan disilangkan membentuk huruf X di atas kepala (*Emergency Stop*).
- **Pointing and Calling di Apron Bandara**:
  - Sebelum roda pesawat mendekat: \`「チョークよし！エンジンスイッチオフよし！ヨシ！」\` (*Chōku yoshi! Enjin suitchi ofu yoshi! Yoshi!* JNIOSH 2020 [VS-39]; JAGHA 2024 [VS-51]).

### 1.3 Protokol Intervensi Krisis & Bahaya Terisap Turbin Mesin Jet (Ingestion Hazard)
- **Zona Bahaya Isap Mesin Turbofan Jet (Engine Ingestion Hazard Zone)**: Saat mesin pesawat jet menyala di darat (*idle power*), turbofan menghasilkan daya isap vakum dahsyat dalam radius $5–8\text{ meter}$ di depan mesin. Masuk ke dalam zona merah ini menyebabkan tubuh manusia terisap dan tercabik bilah turbin dalam $0.05\text{ detik}$.
- **Bahaya Hembusan Jet Panas (Jet Blast)**: Di belakang mesin jet, gas buang berkecepatan ratusan km/jam mampu menggulingkan mobil bagasi dan melempar pekerja ke dinding terminal.
- **Anti-Inpei Benda Asing Tertinggal (FOD - Foreign Object Debris)**: Menjatuhkan satu baut kecil, gembok koper, atau pulpen di pelataran apron wajib diambil seketika. Benda asing yang terisap ke mesin jet bernilai puluhan miliar rupiah merusak mesin dan memicu kebakaran saat lepas landas (Mustaqim & Priventa 2026 [VS-31]).

---

## Bab 2: Analisis Kritis Kons & Kegagalan Hafalan Buta

### 2.1 Kegagalan Sistemik Hafalan Buta pada Sektor Penerbangan
1. **Ketiadaan Pemahaman Titik Berat Muatan Pesawat (Weight & Balance Trap)**: Menghafal kanji \`積載\` (sekisai - memuat barang) tanpa memahami diagram pemuatan palka kargo; salah menata kontainer kargo berat di palka belakang menyebabkan ekor pesawat terjungkal ke tanah (*tail tip-up*) atau pesawat kehilangan daya angkat saat take-off.
2. **Kebutaan Kecepatan Kendaraan Apron (Apron Speed Limit Trap)**: Mengemudikan traktor penarik bagasi melebihi batas kecepatan ($30\text{ km/jam}$ di jalan servis, $15\text{ km/jam}$ di dekat badan pesawat) berisiko menabrak sayap pesawat komersial berharga triliunan yen.

---

## Bab 3: Pemetaan Hambatan Kognitif, Linguistik & Budaya Siswa Indonesia

### 3.1 Tiga Persona Pembelajar Indonesia
1. **Persona A (Lulusan Sekolah Penerbangan / Ex-Ground Handling di Indonesia)**: Memahami kode IATA tiga huruf (HND, NRT, CGK) dan sistem ULD kontainer, namun belum terbiasa dengan bahasa instruksi radio Keigo cepat staf bandara Jepang.
2. **Persona B (Ex-Magang Manufaktur / Otomotif)**: Memiliki SIM dan mahir mengoperasikan kendaraan traktor, namun belum terbiasa dengan protokol steril ramp bandara.
3. **Persona C (Kandidat Fresh LPK Non-Penerbangan)**: Mengalami disorientasi di apron bandara yang luas; takut dengan kebisingan deru mesin jet pesawat Boeing/Airbus.

### 3.2 Matriks Besaran, Metrik & Satuan Pengukuran Kritis Penerbangan

\`\`\`
┌────────────────────────────────────────────────────────────────────────┐
│             MATRIKS PENGUKURAN & STANDAR OPERASIONAL BANDARA           │
├───────────────────────┬──────────────┬─────────────────────────────────┤
│ Parameter Operasional │ Satuan Resmi │ Nilai Standar & Tindakan Teknis │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 1. Batas Kecepatan    │ km/h         │ • Jalan Servis Apron: ≤ 30 km/h │
│    Kendaraan Apron    │              │ • Dekat Badan Pesawat: ≤ 15 km/h│
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 2. Zona Bahaya Isap   │ Meter (m)    │ • Radius Depan Mesin Jet: 5–8 m │
│    Mesin Turbofan     │              │ • Zona Bahaya Belakang: ≥ 30 m  │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 3. Ambang Kebisingan  │ dB           │ • Kebisingan Apron: > 110 dB    │
│    (騒音レベル)       │ (Desibel)    │ • Wajib Headset Ear-Defender!   │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 4. Jarak Parkir Sayap │ Meter (m)    │ • Jarak Bebas Ujung Sayap: ≥ 7m │
│    (Wing-Tip Clear)   │              │   (Mencegah senggolan garbarata)│
└───────────────────────┴──────────────┴─────────────────────────────────┘
\`\`\`

---

## Bab 4: Arsitektur Kurikulum Fase 1 — Maksimalkan Peluang Lulus Ujian CBT

### 4.1 Struktur Ujian Resmi Prometric CBT JAGHA Penerbangan
30 butir soal pilihan ganda teori K3 bandara, sistem marshalling, penanganan bagasi, pengoperasian alat GSE (*Ground Support Equipment*), dan protokol FOD dalam 60 menit. Ambang kelulusan: $\ge 60\%$ (JAGHA 2024 [VS-51]).

### 4.2 Dekonstruksi Lima Jebakan Distractor Utama Penerbangan
1. **Jebakan Melintasi Bagian Depan Mesin Jet yang Masih Menyala**: Pilihan melintas di depan mesin jet saat lampu anti-tabrakan merah berkedip (*Beacon Light*) di punggung pesawat masih menyala adalah LETHAL ERROR (mesin masih berputar kencang).
2. **Jebakan Mengabaikan Benda Asing FOD di Aspal Apron**: Pilihan membiarkan botol plastik atau kantong kresek di aspal apron karena terburu-buru adalah salah fatal; wajib dipungut dan dibuang ke kotak khusus FOD.
3. **Jebakan Menarik Kontainer Kargo Tanpa Mengunci Pin Pengaman**: Pilihan mengoperasikan dolly kontainer tanpa memastikan kait kunci pengunci kontainer (*lock pin*) terkunci erat adalah salah; kontainer seberat 1.5 ton dapat tergelincir menabrak badan pesawat.

---

## Bab 5: Arsitektur Kurikulum Fase 2 — Kesiapan Kerja Operasional Spesifik Sektor

### 5.1 Progressive SNR Audio & Onomatopoeia Pelataran Bandara
- Audio instruksi interkom kokpit di tengah deru raungan mesin jet turbofan dan desing turbin APU (*Auxiliary Power Unit*).
- Onomatopoeia operasional bandara:
  - \`キーーーーン (kī-n)\`: Desing lengkingan frekuensi tinggi turbin mesin jet saat dinyalakan.
  - \`ガチャン (gachan)\`: Bunyi kait kunci kontainer ULD saat mengunci di lantai kargo pesawat.
  - \`ゴォォォ (gō)\`: Gemuruh hembusan jet blast saat pesawat mulai bergerak taxiing.

### 5.2 Protokol Intervensi Krisis & Kualifikasi SSW-2
- **Sinyal Silang Tangan Darurat Marshaller (Crossing Bats Emergency Stop)**: Jika traktor atau personel melintas di jalur parkir saat pesawat bergerak maju, marshaller segera menyilangkan kedua tongkat sinyal di atas kepala untuk memerintahkan pilot menginjak rem darurat seketika.
- **Tangga Promosi Kualifikasi Menuju SSW-2**:
  - Lisensi Pengemudi Khusus Apron Bandara (**Rampu Unten Menkyo**)
  - Sertifikasi Penanggung Jawab Pemuatan Pesawat (**Rōdo Masutā / Load Controller**)
  - Ujian Evaluasi Tokutei Ginō 2-gō Sektor Penerbangan (Tingkat Supervisor Apron Internasional) $\rightarrow$ Hak tinggal tanpa batas, membawa keluarga, dan jalur **Eijūken**.

---

## Bab 6: 4 Modalitas Latihan Otentik, Scaffolding & Taksonomi Remedial

### 6.1 Empat Modalitas Latihan Otentik
1. **Visual**: Identifikasi sinyal gestur tangan marshalling pesawat (lurus, belok, rem darurat) pada foto diagram ICAO.
2. **Auditori**: Mengidentifikasi perintah interkom ramp leader (*Chōku setto yoshi! Pawa kaburu hazuse!*) di tengah bising mesin jet.
3. **Skenario**: Menangani kebocoran bahan bakar avtur (*kerosene spill*) di bawah sayap pesawat saat proses pengisian bahan bakar.
4. **Prosedural**: Menghitung kapasitas muatan kompartemen kargo pesawat: batas berat maksimum palka kargo aft 2,000 kg.

### 6.2 Matriks Taksonomi Remedial (4 Tipe Eror)
- **Tipe L**: Tertukar istilah *Rampu* (pelataran parkir apron) vs *Kassōro* (landasan pacu pacu runway).
- **Tipe C**: Mengira boleh melintas di dekat sayap pesawat saat lampu beacon merah menyala.
- **Tipe M**: Mengemudikan kendaraan apron $35\text{ km/jam}$ (melebihi batas aman 30 km/jam).
- **Tipe P**: Mengoperasikan towing tractor sebelum melepas pin kemudi roda depan pesawat (*steering bypass pin*).

### 6.3 Tabel Parameter Desain Kurikuler Penerbangan
\`\`\`
┌────────────────────────────────────────────────────────────────────────┐
│             PARAMETER DESAIN KURIKULER RESMI NUGGET NIHONGO            │
│                 SEKTOR 08: PENERBANGAN (AVIATION GROUND HANDLING)      │
├───────────────────────────────────┬────────────────────────────────────┤
│ Parameter Kurikulum               │ Nilai Standar Statuter             │
├───────────────────────────────────┼────────────────────────────────────┤
│ Total Jam Belajar Rekomendasi     │ 150 Jam Pelajaran (8 Minggu @20j)  │
│ Rasio Fase 1 (CBT) vs Fase 2 (K3) │ 40% CBT Ujian : 60% Operasional    │
│ Target Bank Soal Prometric CBT    │ 550 Butir Soal Teori & Visual      │
│ Rasio Latihan Audio Noise (SNR)   │ Minimal 45% (Deru Mesin Jet Apron) │
│ Kuota Wajib K3 FOD & Ingestion    │ Lulus 100% Modul Tanpa Cacat Eror  │
│ Ambang Kelulusan Simulasi Ujian   │ 80% (Di atas standar resmi 60%)    │
│ Frekuensi Review SRS FSRS         │ Target retensi 90% parameter adaptif│
└───────────────────────────────────┴────────────────────────────────────┘
\`\`\`
`;

fs.writeFileSync(path.join(targetDir, 'SSW-08-AVIATION-PEDAGOGICAL-FOUNDATION.md'), ssw08Content, 'utf8');
console.log('Successfully written SSW-08 Aviation Foundation.');
console.log('=== Batch 4 Foundations Generation Completed Successfully ===');
