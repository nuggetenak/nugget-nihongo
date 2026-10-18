const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../corpus/pedagogy/ssw');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// =========================================================================
// 1. SSW-15 FOOD SERVICE & RESTAURANT
// =========================================================================
const ssw15Content = `# Cetak Biru Pedagogis & Kurikulum Kejuruan SSW · Sektor 15: Industri Restoran & Pelayanan Makanan (Food Service)

> **Kode Dokumen:** \`SSW-PEDAGOGY-15-FOOD-SERVICE\`  
> **Versi:** 4.1.0-BIAS-FREE-FOUNDATION  
> **Sektor:** Industri Restoran & Pelayanan Makanan (Food Service / 外食業分野)  
> **Kementerian Pembina:** Kementerian Pertanian, Kehutanan, dan Perikanan Jepang (MAFF / 農林水産省)  
> **Badan Pelaksana Uji:** Organisasi Kualitas & Keamanan Pangan Jepang (OTAFF / 一般社団法人 外国人食品産業技能評価機構) & Prometric  
> **Status Bias Lingkungan:** 100% Restoran Komersial, Dapur Kuliner & Area Pelayanan Tamu (*Tenpo / Chōriba / Hōru*); Bebas Total dari Bias Konstruksi Luar Ruangan (*Zero Genba Bias*)  
> **Sumber Kurasi Primer:**
> - \`reference-books/ssw/10_gaishoku_food_service/Food_Service_Hygiene_Text_JA.pdf\` & \`reference-books/ssw/10_gaishoku_food_service/Food_Service_Hygiene_Text_ID.pdf\` (Manajemen Sanitasi & Pencegahan Keracunan Makanan HACCP)
> - \`reference-books/ssw/10_gaishoku_food_service/Food_Service_Cooking_Text_JA.pdf\` & \`reference-books/ssw/10_gaishoku_food_service/Food_Service_Cooking_Text_ID.pdf\` (Teknik Pengolahan Bahan Pangan & Alat Masak Komersial)
> - \`reference-books/ssw/10_gaishoku_food_service/Food_Service_Customer_Service_Text_JA.pdf\` & \`reference-books/ssw/10_gaishoku_food_service/Food_Service_Customer_Service_Text_ID.pdf\` (Pelayanan Pelanggan Omotenashi & 7 Kata Ajaib Restoran)
> - \`reference-books/ssw/10_gaishoku_food_service/Food_Service_Sample_Exam_JA.pdf\` (Spesifikasi Resmi CBT Prometric)
> **Landasan Teori & Riset:**
> - Needs Analysis in Hospitality & Food Service (Wijayanti & Septipani 2025 [VS-42])
> - Statutory Implementation Standard for Food Industry (OTAFF 2024 [VS-43])
> - Institutionalized HACCP & Pathogen Controls (MHLW & MAFF 2021 [VS-44])
> - Omotenashi Registers & Politeness (Sari & Kastuti 2023 [VS-34]; Pratama & Srimulyani 2024 [VS-30])
> - Cross-Cultural Communication & Anti-Inpei in Food Safety (Mustaqim & Priventa 2026 [VS-31])
> - Testing Effect & Retrieval Practice (Roediger & Karpicke 2006 [TE-01])
> - Morpheme-First Compound Kanji Chunking (Matsunaga 1999 [OD-20])

---

## Bab 1: Ekosistem Tempat Kerja & Hierarki Komunikasi Otentik

### 1.1 Struktur Restoran & Peran Industri (Tenpo / Chōriba / Hōru)
Tempat kerja restoran di Jepang adalah **Tenpo (店舗 - Gerai Restoran)** yang terbagi secara tegas menjadi dua area operasional:
1. **Chōriba (調理場 - Dapur Belakang / Kitchen / Back of House)**.
2. **Hōru (ホール - Area Tamu / Front of House)**.
Hierarki operasional:
1. **Tenchō (店長 - Manajer Restoran / Store Manager)**: Bertanggung jawab atas penjualan harian, kepuasan tamu, dan kepatuhan hukum sanitasi.
2. **Chōrishichō / Rīdan / Chef (調理師長 / リーダー - Kepala Koki Dapur)**: Mengawasi standar rasa, suhu piring saji, dan sanitasi HACCP.
3. **Shokuhin Eisei Sekininsha (食品衛生責任者 - Penanggung Jawab Higiene Pangan)**: Pemegang lisensi statuter pencegahan keracunan makanan berdasarkan UU Sanitasi Pangan (*Shokuhin Eisei-hō*).
4. **Hōru Sutaffu (ホールスタッフ - Pramusaji Restoran)**: Menyambut tamu (*irasshaimase*), menerima pesanan (*chūmon*), menyajikan makanan (*haitatsu/kyūji*), dan menangani pembayaran kasir (*kaikei*).
5. **Kitchin Sutaffu (キッチンスタッフ - Juru Masak Dapur)**: Memotong sayur, menggoreng (*agemono*), merebus (*yudemono*), dan mencuci piring (*dasshoku*).

### 1.2 Register Bahasa Otentik: Tujuh Kalimat Wajib Layanan (7-Daigo) & Aba-Aba Dapur
Pramusaji dan staf restoran wajib menguasai **Tujuh Kalimat Wajib Pelayanan (接客 7大用語 - Sekkyaku 7-Dai Yōgo)**:
1. \`「いらっしゃいませ」\` (*Irasshaimase* — Selamat datang).
2. \`「かしこまりました」\` (*Kashikomarimashita* — Baik, saya mengerti / pesanan dimengerti).
3. \`「少々お待ちくださいませ」\` (*Shōshō omachi kudasai mase* — Mohon tunggu sebentar).
4. \`「大変お待たせいたしました」\` (*Taihen omatase itashimashita* — Terima kasih telah berkenan menunggu lama).
5. \`「申し訳ございません」\` (*Mōshiwake gozaimasen* — Mohon maaf sebesar-besarnya).
6. \`「恐れ入ります」\` (*Osoreirimasu* — Mohon permisi / maaf merepotkan).
7. \`「ありがとうございました。またお越しくださいませ」\` (*Arigatō gozaimashita. Mata okoshi kudasai mase* — Terima kasih banyak, kami menantikan kunjungan Anda kembali).

**Seruan Aba-Aba Sinkronisasi Dapur (Calling Order)**:
- Saat pelayan membawa tiket pesanan ke dapur: \`「オーダー入ります！ラーメン一丁！」\` (*Ōdā hairimasu! Rāmen itchō!* — Pesanan masuk! Ramen 1 porsi!)
- Respon juru masak dapur: \`「喜んで！」\` (*Yorokonde!* — Dengan senang hati!)

### 1.3 Protokol Interaksi Wajib: Hōrensō, Hak Menahan Makanan & Anti-Inpei
- **Hak & Kewajiban Menahan Makanan (Halt Order at the Pass)**: Jika pelayan melihat adanya rambut, serangga, atau mencurigai piring tercemar alergen (mis. kacang atau telur yang diminta dihilangkan oleh pelanggan), pelayan **MEMILIKI HAK DAN KEWAJIBAN MUTLAK UNTUK MENAHAN PIRING TERSEBUT** di meja pass dan melarang piring disajikan ke meja tamu!
- **Anti-Inpei Keracunan Makanan (Shokuchūdoku Inpei Kinshi)**: Jika staf mengalami demam, diare (*geri*), muntah (*ōto*), atau memiliki luka bernanah di jari (*kaso kizu*), **DILARANG KERAS MASUK KE AREA DAPUR!** Budaya sungkan Indonesia tidak boleh diterapkan; wajib lapor ke Tenchō seketika (Mustaqim & Priventa 2026 [VS-31]; MHLW & MAFF 2021 [VS-44]).

---

## Bab 2: Analisis Kritis Kons & Kegagalan Hafalan Buta

### 2.1 Kegagalan Sistemik Hafalan Buta pada Sektor Restoran
1. **Ketiadaan Pemahaman Reaksi Alergi Maut (Anaphylaxis Trap)**: Menghafal kanji \`食物アレルギー\` (shokumotsu arerugī - alergi makanan) tanpa memahami 7 alergen statuter wajib (*tokutei genzairyō*: telur, susu, gandum, soba, kacang tanah, udang, kepiting); menyajikan piring yang terkontaminasi minyak bekas gorengan udang kepada penderita alergi udang dapat memicu syok anafilaktik fatal dan kematian dalam 15 menit.
2. **Kebutaan Parameter Termal HACCP**: Menghafal kata *kanetsu* (memanaskan) tanpa mengukur suhu inti daging dengan termometer tusuk jarum ($75^\circ\text{C}$ selama minimal 1 menit); daging ayam mentah yang kurang matang menyebarkan bakteri *Campylobacter* yang menyebabkan kelumpuhan saraf sindrom Guillain-Barré.

---

## Bab 3: Pemetaan Hambatan Kognitif, Linguistik & Budaya Siswa Indonesia

### 3.1 Tiga Persona Pembelajar Indonesia
1. **Persona A (Lulusan Tata Boga / SMK Perhotelan Indonesia)**: Sangat terampil memotong dan memasak, namun belum terbiasa dengan bahasa sopan Keigo perhotelan Jepang dan regulasi kimia sanitasi klorin.
2. **Persona B (Ex-Pekerja Restoran Cepat Saji di Indonesia)**: Terbiasa dengan kecepatan pesanan, namun kebiasaan bahasa lisan terlalu santai (*tameguchi*); rentan melakukan kesalahan partikel pada kalimat penawaran menu.
3. **Persona C (Kandidat Fresh Non-Kuliner LPK)**: Ragu-ragu berbicara di depan tamu Jepang; cemas saat menghadapi komplain pelanggan (*kuremu*).

### 3.2 Matriks Besaran, Metrik & Satuan Pengukuran Kritis Restoran

\`\`\`
┌────────────────────────────────────────────────────────────────────────┐
│             MATRIKS PENGUKURAN & SATUAN TEKNIS SEKTOR RESTORAN         │
├───────────────────────┬──────────────┬─────────────────────────────────┤
│ Parameter Operasional │ Satuan Resmi │ Nilai Standar & Tindakan Teknis │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 1. Suhu Pemanasan Inti│ °C           │ • Umum: ≥ 75°C selama ≥ 1 menit │
│    (中心温度)         │ (Derajat Cel)│ • Norovirus: 85°–90°C, ≥ 90 dtk │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 2. Zona Bahaya Suhu   │ °C           │ • Zona Bahaya Bakteri: 10°–60°C │
│    Bakteri (Danger)   │              │   (Bakteri membelah tiap 20 mnt)│
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 3. Suhu Penyimpanan   │ °C           │ • Kulkas Chiller: < 10°C        │
│    (冷蔵・冷凍温度)   │              │ • Freezer Beku: < -15°C         │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 4. Konsentrasi Klorin │ ppm          │ • Cuci Sayur: 100 – 200 ppm     │
│    (次亜塩素酸Na)     │ (Part/Million│ • Desinfeksi Muntahan: 1,000 ppm│
└───────────────────────┴──────────────┴─────────────────────────────────┘
\`\`\`

---

## Bab 4: Arsitektur Kurikulum Fase 1 — Maksimalkan Peluang Lulus Ujian CBT

### 4.1 Struktur Ujian Resmi Prometric CBT OTAFF Restoran
Ujian mencakup 45 soal pilihan ganda teori higiene HACCP, teknik memasak, dan pelayanan pelanggan dalam 80 menit.
Ambang kelulusan: $\ge 60\%$ (OTAFF 2024 [VS-43]).

### 4.2 Dekonstruksi Lima Jebakan Distractor Utama Restoran
1. **Jebakan Suhu Luar Daging vs Suhu Inti**: Pilihan yang menyebutkan warna luar daging yang sudah kecokelatan menandakan masakan sudah matang sempurna adalah SALAH FATAL; wajib mengukur suhu inti tengah terdalam (**chūshin ondo**).
2. **Jebakan Pisau Talenan Campuran**: Memakai talenan yang sama untuk memotong daging mentah lalu langsung memotong tomat salad adalah LETHAL ERROR (kontaminasi silang bakteri). Talenan wajib dipisahkan warnanya (merah untuk daging, hijau untuk sayur, biru untuk ikan).
3. **Jebakan Melayani Tamu Alergi dengan Asumsi Sendiri**: Pelayan yang menjawab sendiri pertanyaan tamu *"Apakah saus ini mengandung kacang?"* tanpa memeriksa lembar spesifikasi resep koki adalah jawaban salah pada soal CBT.

---

## Bab 5: Arsitektur Kurikulum Fase 2 — Kesiapan Kerja Operasional Spesifik Sektor

### 5.1 Progressive SNR Audio & Onomatopoeia Dapur Restoran
- Audio pesanan tamu di tengah desis minyak mendidih, gemerincing piring mesin dishwasher, dan teriakan calling order.
- Onomatopoeia kuliner Jepang:
  - \`ジュージュー (jū-jū)\`: Suara daging mendesis di atas wajan panggangan panas.
  - \`サクサク (saku-saku)\`: Tekstur renyah garing tempura atau tonkatsu saat digigit.
  - \`グツグツ (gutsu-gutsu)\`: Kuah sup ramen atau kari yang mendidih bergolak di panci besar.

### 5.2 Protokol Intervensi Krisis & Kualifikasi SSW-2
- **Penanganan Muntahan Tamu di Area Restoran (Norovirus Protocol)**: Kenakan celemek plastik sekali pakai, sarung tangan ganda, dan masker; tutupi muntahan dengan tisu kertas basah; siram larutan klorin $1,000\text{ ppm}$; usap ke arah dalam; buang ke kantong biohazard tertutup rapat.
- **Kualifikasi Menuju SSW-2**:
  - Sertifikasi Penanggung Jawab Higiene Pangan (**Shokuhin Eisei Sekininsha - 食品衛生責任者**)
  - Ujian Evaluasi Tokutei Ginō 2-gō Sektor Restoran (Tingkat Supervisor / Tenchō) $\rightarrow$ Hak tinggal tanpa batas, membawa keluarga, dan jalur menuju Permanent Resident (**Eijūken**).

---

## Bab 6: 4 Modalitas Latihan Otentik, Scaffolding & Taksonomi Remedial

### 6.1 Empat Modalitas Latihan Otentik
1. **Visual**: Identifikasi 7 bahan alergen statuter pada label kemasan makanan Jepang.
2. **Auditori**: Mengidentifikasi detail pesanan tamu (*chūmon*) di tengah suara riuh restoran.
3. **Skenario**: Menangani komplain tamu yang menemukan benda asing di dalam mangkuk sup.
4. **Prosedural**: Menghitung pengenceran klorin 1,000 ppm dari konsentrat pemutih 6%: Rumus takaran air dan natrium hipoklorit.

### 6.2 Matriks Taksonomi Remedial (4 Tipe Eror)
- **Tipe L**: Tertukar antara *Irasshaimase* (selamat datang) vs *Kashikomarimashita* (dimengerti).
- **Tipe C**: Mengira pemanasan microwave membunuh spora bakteri *Bacillus cereus* tahan panas.
- **Tipe M**: Menghitung 100 ppm menjadi 1000 ppm pada pencucian selada sayur.
- **Tipe P**: Menyajikan makanan alergen sebelum mencuci tangan dan mengganti penjepit makanan (*tongs*).

### 6.3 Tabel Parameter Desain Kurikuler Restoran
\`\`\`
┌────────────────────────────────────────────────────────────────────────┐
│             PARAMETER DESAIN KURIKULER RESMI NUGGET NIHONGO            │
│                 SEKTOR 15: INDUSTRI RESTORAN (FOOD SERVICE)            │
├───────────────────────────────────┬────────────────────────────────────┤
│ Parameter Kurikulum               │ Nilai Standar Statuter             │
├───────────────────────────────────┼────────────────────────────────────┤
│ Total Jam Belajar Rekomendasi     │ 140 Jam Pelajaran (7 Minggu @20j)  │
│ Rasio Fase 1 (CBT) vs Fase 2 (K3) │ 50% CBT Ujian : 50% Operasional    │
│ Target Bank Soal Prometric CBT    │ 550 Butir Soal Teori & Visual      │
│ Rasio Latihan Audio Noise (SNR)   │ Minimal 40% (Suara Riuh Restoran)  │
│ Kuota Wajib HACCP & 7 Alergen     │ Lulus 100% Modul Tanpa Cacat Eror  │
│ Ambang Kelulusan Simulasi Ujian   │ 80% (Di atas standar resmi 60%)    │
│ Frekuensi Review SRS FSRS         │ Target retensi 90% parameter adaptif│
└───────────────────────────────────┴────────────────────────────────────┘
\`\`\`
`;

fs.writeFileSync(path.join(targetDir, 'SSW-15-FOOD-SERVICE-PEDAGOGICAL-FOUNDATION.md'), ssw15Content, 'utf8');
console.log('Successfully written SSW-15 Food Service Foundation.');

// =========================================================================
// 2. SSW-16 FOOD MANUFACTURING
// =========================================================================
const ssw16Content = `# Cetak Biru Pedagogis & Kurikulum Kejuruan SSW · Sektor 16: Pengolahan Makanan & Minuman (Food Manufacturing)

> **Kode Dokumen:** \`SSW-PEDAGOGY-16-FOOD-MFG\`  
> **Versi:** 4.1.0-BIAS-FREE-FOUNDATION  
> **Sektor:** Manufaktur Makanan & Minuman (Food & Beverage Manufacturing / 飲食料品製造業分野)  
> **Kementerian Pembina:** Kementerian Pertanian, Kehutanan, dan Perikanan Jepang (MAFF / 農林水産省)  
> **Badan Pelaksana Uji:** Organisasi Kualitas & Keamanan Pangan Jepang (OTAFF / 一般社団法人 外国人食品産業技能評価機構) & Prometric  
> **Status Bias Lingkungan:** 100% Pabrik Pengolahan Makanan Berskala Industri (*Shokuhin Kōjō*); Bebas Total dari Bias Konstruksi Luar Ruangan (*Zero Genba Bias*)  
> **Sumber Kurasi Primer:**
> - \`reference-books/ssw/09_inshokuryouhin_food_mfg/Food_Manufacturing_Common_Text_JA.pdf\` & \`reference-books/ssw/09_inshokuryouhin_food_mfg/Food_Manufacturing_Common_Text_ID.pdf\` (Standar Sanitasi Higiene Pabrik Pangan & 7 Lini Manufaktur)
> - \`reference-books/ssw/09_inshokuryouhin_food_mfg/Food_Manufacturing_Sample_Exam_JA.pdf\` (Spesifikasi Resmi CBT Prometric)
> **Landasan Teori & Riset:**
> - Statutory Implementation Standard for Food Industry (OTAFF 2024 [VS-43])
> - Institutionalized HACCP & Factory Sanitation Controls (MHLW & MAFF 2021 [VS-44])
> - Needs Analysis in Food Industry (Wijayanti & Septipani 2025 [VS-42])
> - Cross-Cultural Communication & Anti-Inpei in Manufacturing (Mustaqim & Priventa 2026 [VS-31]; Supriatnaningsih et al. 2024 [VS-33])
> - Industrial Safety Standards & Pointing-and-Calling (JNIOSH 2020 [VS-39])
> - Testing Effect & Retrieval Practice (Roediger & Karpicke 2006 [TE-01])
> - Morpheme-First Compound Kanji Chunking (Matsunaga 1999 [OD-20])

---

## Bab 1: Ekosistem Tempat Kerja & Hierarki Komunikasi Otentik

### 1.1 Struktur Pabrik Pengolahan Makanan & Peran Industri (Shokuhin Kōjō)
Tempat kerja pengolahan makanan adalah **Shokuhin Kōjō (食品工場 - Pabrik Pangan Higienis)** yang memproduksi bento supermarket, roti pabrik, daging olahan, dan makanan beku.
Hierarki operasional:
1. **Kōjōchō (工場長 - Kepala Pabrik Pangan)**: Menjamin keamanan higienis ribuan ton produk makanan yang didistribusikan ke jaringan ritel nasional.
2. **HACCP Sekininsha / Hinshitsu Kanribuchō (品質管理部長 - Manajer Pengendalian Mutu & HACCP)**: Memantau titik kendali kritis (*CCP / Jūyō Kanriten*), detektor logam, dan uji mikrobiologi.
3. **Seizō Rin Rīdā (製造ラインリーダー - Leader Lini Produksi)**: Mengatur kecepatan konveyor perakitan, memeriksa suhu ruangan produksi ($< 15^\circ\text{C}$), dan mengawasi pergantian produk (*kirikae*).
4. **Rin Operētā (ラインオペレーター - Operator Lini Pangan)**: Menimbang bahan (*keiryō*), menata lauk bento (*moritsuke*), mengemas (*pakkēji*), dan memeriksa kebocoran kemasan.

### 1.2 Register Bahasa Otentik & Protokol Masuk Ruang Produksi
Sebelum diizinkan menginjakkan kaki di lantai pabrik pangan, setiap pekerja melewati prosedur sanitasi steril yang ketat:
- **Pembersihan Rambut dengan Rol Perekat (Nenchaku Rōrā - 粘着ローラー)**:
  - Dua pekerja saling membersihkan pakaian kerja steril putih (*kuriin sūtsu*) dari atas ke bawah: kepala, pundak, punggung, lengan, pinggang, kaki (minimal 3 menit).
  - \`「背中ローラーお願いします！」\` (*Senaka rōrā onegai shimasu!*) $\rightarrow$ \`「異物なし、よし！ヨシ！」\` (*Ibutsu nashi, yoshi! Yoshi!* JNIOSH 2020 [VS-39]).
- **Air Shower (Eashawā - エアーシャワー)**: Berdiri di dalam bilik semprotan angin bertekanan tinggi selama 15–20 detik sambil berputar $360^\circ$ dan mengangkat kedua tangan.
- **Cuci Tangan Bedah (Kisei Tearai)**: Mencuci tangan dengan sabun cair antibakteri, menyikat kuku dengan sikat steril (*tsumeburashi*), membilas air mengalir, mengeringkan dengan handuk kertas, dan menyemprot alkohol $70\%$.

### 1.3 Protokol Intervensi Krisis & Pencegahan Benda Asing (Ibutsu Konnyū)
- **Anti-Inpei Penemuan Benda Asing (Ibutsu Inpei Kinshi)**: Menemukan serpihan plastik biru, kawat pembersih, atau serangga di atas konveyor makanan **WAJIB SEGERA DIHENTIKAN KONVEYORNYA** dan melapor ke Leader. Dilarang membuang serpihan diam-diam dan membiarkan produk lanjut berjalan (Mustaqim & Priventa 2026 [VS-31]; OTAFF 2024 [VS-43]).

---

## Bab 2: Analisis Kritis Kons & Kegagalan Hafalan Buta

### 2.1 Kegagalan Sistemik Hafalan Buta pada Pabrik Pangan
1. **Ketiadaan Pemahaman Titik Kendali Kritis HACCP (CCP Blindness)**: Menghafal singkatan HACCP tanpa memahami cara memvalidasi batas kritis (*kanri kijun*); membiarkan konveyor berjalan saat suhu minyak penggorengan donat turun di bawah batas kritis membahayakan konsumen keracunan bakteri.
2. **Kebutaan Pengujian Detektor Logam (Metal Detector Testing)**: Menghafal kata *kinzoku kanchiki* tanpa memahami prosedur uji benda uji standar ($Fe$ besi 1.2 mm dan $SUS$ baja tahan karat 1.5 mm); jika mesin detektor lolos tanpa mendeteksi benda uji uji coba di awal shift, seluruh batch produk wajib ditahan (*hōrudo*).

---

## Bab 3: Pemetaan Hambatan Kognitif, Linguistik & Budaya Siswa Indonesia

### 3.1 Tiga Persona Pembelajar Indonesia
1. **Persona A (Ex-Magang Pabrik Pengolahan Makanan / Bento)**: Terbiasa dengan dinginnya suhu ruangan pabrik ($12^\circ\text{C}$), namun kesulitan dalam menjawab soal teori mikrobiologi bakteri patogen.
2. **Persona B (Lulusan SMK Teknologi Hasil Pertanian / THP)**: Memahami prinsip pengawetan dan sterilisasi, namun belum terbiasa dengan kecepatan kerja lini konveyor bento Jepang.
3. **Persona C (Kandidat Fresh Non-Pangan LPK)**: Sering kedinginan saat bekerja berjam-jam di ruang berpendingin; ceroboh dalam memakai masker penutup hidung sempurna.

### 3.2 Matriks Besaran, Metrik & Satuan Pengukuran Kritis Pabrik Pangan

\`\`\`
┌────────────────────────────────────────────────────────────────────────┐
│             MATRIKS PENGUKURAN & SATUAN TEKNIS PABRIK PANGAN           │
├───────────────────────┬──────────────┬─────────────────────────────────┤
│ Parameter Operasional │ Satuan Resmi │ Nilai Standar & Tindakan Teknis │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 1. Suhu Ruangan Kerja │ °C           │ • Ruang Pengolahan Higienis:    │
│    (室温管理)         │ (Derajat Cel)│   ≤ 15°C (Menekan mikroba)      │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 2. Uji Detektor Logam │ mm           │ • Test Piece Besi (Fe): 1.2 mm  │
│    (金属検出機テスト) │ (Milimeter)  │ • Test Piece SUS: 1.5 mm        │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 3. Waktu Cuci Tangan  │ Detik (s)    │ • Sabun berbusa: ≥ 20 detik     │
│    (手洗い時間)       │              │ • Sikat kuku: Masing-masing 10s │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 4. Tekanan Udara Ruang│ Pa           │ • Ruang Bersih: Tekanan Positif │
│    (陽圧管理 - Yōatsu)│ (Pascal)     │   (Mencegah debu luar tersedot) │
└───────────────────────┴──────────────┴─────────────────────────────────┘
\`\`\`

---

## Bab 4: Arsitektur Kurikulum Fase 1 — Maksimalkan Peluang Lulus Ujian CBT

### 4.1 Struktur Ujian Resmi Prometric CBT OTAFF Pengolahan Pangan
Ujian mencakup 40 butir soal pilihan ganda teori K3 pabrik pangan, 7 lini manufaktur, dan sistem HACCP dalam 80 menit.
Ambang kelulusan: $\ge 60\%$ (OTAFF 2024 [VS-43]).

### 4.2 Dekonstruksi Jebakan Distractor Utama Pabrik Pangan
1. **Jebakan Masuk Ruang Produksi Tanpa Melepas Jam Tangan**: Pilihan yang mengizinkan memakai jam tangan atau cincin kawin di dalam pabrik bento adalah SALAH MUTLAK (perhiasan adalah sumber akumulasi bakteri dan risiko jatuh ke adonan).
2. **Jebakan Melanjutkan Produksi Saat Detektor Logam Error**: Pilihan membiarkan konveyor berjalan saat alat pendeteksi logam berbunyi terus menerus adalah LETHAL ERROR.
3. **Jebakan Mengeringkan Tangan pada Baju Steril**: Pilihan mengelap tangan basah ke pakaian kerja setelah cuci tangan adalah jawaban salah; pakaian kerja luar tidak steril.

---

## Bab 5: Arsitektur Kurikulum Fase 2 — Kesiapan Kerja Operasional Spesifik Sektor

### 5.1 Progressive SNR Audio & Onomatopoeia Pabrik Pangan
- Audio instruksi supervisor di tengah deru konveyor berjalan, mesin packaging thermoforming, dan dengung pendingin ruangan.
- Onomatopoeia taktil industri makanan:
  - \`コロコロ (koro-koro)\`: Gerakan memutar rol perekat bulu rambut pada pakaian kerja.
  - \`カタカタ (kata-kata)\`: Gerakan getaran feeder penimbang otomatis (*weigher*).
  - \`ピッピッ (pi'-pi')\`: Bunyi alarm sensor detektor logam saat menemukan partikel asing.

### 5.2 Protokol Intervensi Krisis & Kualifikasi SSW-2
- **Tombol Henti Darurat Lini (Emergency Line Stop)**: Menekan tombol darurat saat tangan tersangkut di rol pembagi adonan atau saat ada botol kaca pecah (*ippan hasan*).
- **Kualifikasi Menuju SSW-2**:
  - Sertifikasi Penanggung Jawab Kualitas Higiene Pangan Pabrik
  - Ujian Evaluasi Tokutei Ginō 2-gō Sektor Pengolahan Pangan (Tingkat Supervisor Lini Pabrik) $\rightarrow$ Hak tinggal permanen tanpa batas, membawa keluarga, dan jalur **Eijūken**.

---

## Bab 6: 4 Modalitas Latihan Otentik, Scaffolding & Taksonomi Remedial

### 6.1 Empat Modalitas Latihan Otentik
1. **Visual**: Identifikasi titik-titik rawan akumulasi debu/rambut pada pakaian kerja steril.
2. **Auditori**: Mengidentifikasi pengumuman pergantian batch produk (*Kirikae jikan!*) di tengah kebisingan mesin pengemas.
3. **Skenario**: Menangani situasi ditemukannya serpihan plastik transparan pada wadah bento.
4. **Prosedural**: Menghitung batas toleransi timbangan porsi bento: $200\text{ g} \pm 5\text{ g}$ (memisahkan produk over/underweight).

### 6.2 Matriks Taksonomi Remedial (4 Tipe Eror)
- **Tipe L**: Tertukar istilah *Shōmi Kigen* (best before - batas kualitas terbaik) vs *Shōhi Kigen* (expiry date - batas aman konsumsi).
- **Tipe C**: Mengira pendinginan makanan yang matang boleh dibiarkan perlahan di suhu ruangan $25^\circ\text{C}$.
- **Tipe M**: Menghitung selisih timbangan bento gram ke kilogram.
- **Tipe P**: Melewati air shower kurang dari durasi waktu timer otomatis 15 detik.

### 6.3 Tabel Parameter Desain Kurikuler Pabrik Pangan
\`\`\`
┌────────────────────────────────────────────────────────────────────────┐
│             PARAMETER DESAIN KURIKULER RESMI NUGGET NIHONGO            │
│                 SEKTOR 16: PABRIK PANGAN (FOOD MANUFACTURING)          │
├───────────────────────────────────┬────────────────────────────────────┤
│ Parameter Kurikulum               │ Nilai Standar Statuter             │
├───────────────────────────────────┼────────────────────────────────────┤
│ Total Jam Belajar Rekomendasi     │ 140 Jam Pelajaran (7 Minggu @20j)  │
│ Rasio Fase 1 (CBT) vs Fase 2 (K3) │ 45% CBT Ujian : 55% Operasional    │
│ Target Bank Soal Prometric CBT    │ 550 Butir Soal Teori & Visual      │
│ Rasio Latihan Audio Noise (SNR)   │ Minimal 40% (Deru Konveyor Mesin)  │
│ Kuota Wajib Higiene Steril Pabrik │ Lulus 100% Modul Tanpa Cacat Eror  │
│ Ambang Kelulusan Simulasi Ujian   │ 80% (Di atas standar resmi 60%)    │
│ Frekuensi Review SRS FSRS         │ Target retensi 90% parameter adaptif│
└───────────────────────────────────┴────────────────────────────────────┘
\`\`\`
`;

fs.writeFileSync(path.join(targetDir, 'SSW-16-FOOD-MANUFACTURING-PEDAGOGICAL-FOUNDATION.md'), ssw16Content, 'utf8');
console.log('Successfully written SSW-16 Food Manufacturing Foundation.');

// =========================================================================
// 3. SSW-17 HOSPITALITY & ACCOMMODATION
// =========================================================================
const ssw17Content = `# Cetak Biru Pedagogis & Kurikulum Kejuruan SSW · Sektor 17: Perhotelan & Akomodasi (Hospitality)

> **Kode Dokumen:** \`SSW-PEDAGOGY-17-HOSPITALITY\`  
> **Versi:** 4.1.0-BIAS-FREE-FOUNDATION  
> **Sektor:** Industri Akomodasi & Perhotelan (Accommodation & Hospitality / 宿泊業分野)  
> **Kementerian Pembina:** Badan Pariwisata Jepang (Japan Tourism Agency / 観光庁 / MLIT)  
> **Badan Pelaksana Uji:** Pusat Pertukaran Pemuda Internasional (JICE / 一般財団法人 国際共生推進機構) & Prometric  
> **Status Bias Lingkungan:** 100% Hotel Internasional, Ryokan Tradisional & Fasilitas Resor Wisata (*Hoteru / Ryokan*); Bebas Total dari Bias Konstruksi Luar Ruangan (*Zero Genba Bias*)  
> **Sumber Kurasi Primer:**
> - \`reference-books/ssw/11_shukuhaku_hotel/Hospitality_Accommodation_Text_JA.pdf\` & \`reference-books/ssw/11_shukuhaku_hotel/Hospitality_Accommodation_Text_ID.pdf\` (Standar Operasional Resepsionis, Kamar Tamu, Perjamuan & Etika Omotenashi)
> - \`reference-books/ssw/11_shukuhaku_hotel/Hospitality_Accommodation_Sample_Exam_JA.pdf\` (Spesifikasi Resmi CBT Prometric)
> **Landasan Teori & Riset:**
> - Needs Analysis in Hotel & Hospitality Japanese (Pratama & Srimulyani 2024 [VS-30]; Sari & Kastuti 2023 [VS-34])
> - Honorific Speech-Level Asymmetry & Politeness (Cook 2008 [SC-05]; Niyekawa 1991 [VS-23])
> - Intercultural Adaptation & Customer Etiquette (Nurjaleka 2022 [VS-35])
> - Guest Safety, Evacuation & Privacy Protocols (JNIOSH 2020 [VS-39])
> - Testing Effect & Retrieval Practice (Roediger & Karpicke 2006 [TE-01])
> - Morpheme-First Compound Kanji Chunking (Matsunaga 1999 [OD-20])

---

## Bab 1: Ekosistem Tempat Kerja & Hierarki Komunikasi Otentik

### 1.1 Struktur Hotel & Peran Industri (Hoteru / Ryokan)
Tempat kerja perhotelan adalah **Shukuhaku Shisetsu (宿泊施設 - Fasilitas Akomodasi)** yang terbagi ke dalam empat divisi utama:
1. **Furonto / Rebyū (フロント / ロビー - Front Office / Meja Depan)**.
2. **Kyakushitsu / Haizukīpingu (客室 / ハウスキーピング - Housekeeping & Pemeliharaan Kamar)**.
3. **Resutoran / Enkai (レストラン / 宴会 - Restoran Makanan & Aula Perjamuan Banquet)**.
4. **Kikaku / Kanri (企画 / 管理 - Pemasaran & Manajemen)**.
Hierarki operasional:
1. **Sō-shihainin (総支配人 - General Manager / Pimpinan Tertinggi Hotel)**.
2. **Furonto Manējā / Shihainin (フロントマネージャー / 支配人 - Manajer Kantor Depan)**.
3. **Kyaku-shitsu Gakari / Nakai-san (客室係 / 仲居さん - Petugas Kamar Tamu & Pelayanan Tradisional Ryokan)**: Memandu tamu ke kamar tatami (*washitsu*), menyajikan teh hijau selamat datang, dan menata kasur futon.
4. **Furonto Sutaffu (フロントスタッフ - Resepsionis Front Desk)**: Melayani proses check-in, check-out, penitipan koper (*kurōku*), dan informasi wisata daerah.

### 1.2 Register Bahasa Otentik: Penguasaan Tiga Tingkat Keigo (Sonkeigo, Kenjōgo, Teineigo)
Staf perhotelan wajib menguasai asimetri tata bahasa kehormatan tingkat tinggi (Pratama & Srimulyani 2024 [VS-30]; Cook 2008 [SC-05]):
- **Sonkeigo (尊敬語 - Meninggikan Tindakan Tamu)**:
  - Mengganti \`「言いました」\` $\rightarrow$ \`「おっしゃいました」\` (*Oshaimashita* — Tamu bersabda).
  - Mengganti \`「見ました」\` $\rightarrow$ \`「ご覧になりました」\` (*Goran ni narimashita* — Tamu melihat).
  - Mengganti \`「知っています」\` $\rightarrow$ \`「ご存じです」\` (*Gozonji desu* — Tamu mengetahui).
- **Kenjōgo (謙譲語 - Merendahkan Tindakan Diri Sendiri di Hadapan Tamu)**:
  - Mengganti \`「言います」\` $\rightarrow$ \`「申します」\` (*Mōshimasu* — Nama saya adalah...).
  - Mengganti \`「見ます」\` $\rightarrow$ \`「拝見いたします」\` (*Haiken itashimasu* — Izinkan saya melihat paspor Anda).
  - Mengganti \`「行きます」\` $\rightarrow$ \`「伺います」\` (*Ukagaimasu* — Saya akan segera datang ke kamar Anda).

### 1.3 Protokol Interaksi Wajib: Perlindungan Privasi Tamu & Anti-Inpei
- **Kerahasiaan Data Tamu (Kojin Jōhō Hogo - 個人情報保護)**:
  - DILARANG KERAS menyebutkan nomor kamar tamu dengan suara keras di lobi depan saat menyerahkan kunci kamar (*"Ibu Tanaka kamar 802"* $\rightarrow$ SALAH!). Nomor kamar cukup ditunjukkan dengan jari di atas amplop kunci (*"Kamar Anda berada di lantai ini"*).
  - Dilarang membocorkan identitas tamu hotel kepada pihak luar yang menelepon tanpa izin tamu.
- **Anti-Inpei Kerusakan Barang Tamu**: Menjatuhkan atau menggores koper mahal tamu saat membawanya ke kamar wajib dilaporkan seketika kepada Manajer (Mustaqim & Priventa 2026 [VS-31]).

---

## Bab 2: Analisis Kritis Kons & Kegagalan Hafalan Buta

### 2.1 Kegagalan Sistemik Hafalan Buta pada Sektor Perhotelan
1. **Ketiadaan Fleksibilitas Pragmatik Terhadap Tamu Asing vs Jepang**: Menghafal naskah kaku Keigo perhotelan tanpa kepekaan situasi; saat tamu asing berbahasa Inggris bertanya dengan panik tentang gempa bumi, staf yang terpaku pada rumus naskah Jepang kaku memicu kebingungan fatal.
2. **Kebutaan Prosedur Pintu Kamar Tamu (Do Not Disturb Trap)**: Menghafal pembersihan kamar tanpa memahami tanda \`DND (Do Not Disturb / 起こさないでください)\`; mengetuk atau membuka kamar yang bertanda DND melanggar hukum privasi tamu.

---

## Bab 3: Pemetaan Hambatan Kognitif, Linguistik & Budaya Siswa Indonesia

### 3.1 Tiga Persona Pembelajar Indonesia
1. **Persona A (Lulusan D3/S1 Sastra Jepang / Pariwisata)**: Menguasai Keigo secara tertulis, namun gestur tubuh masih kaku dan gugup saat berbicara tatap muka langsung dengan tamu VVIP Jepang.
2. **Persona B (Ex-Staf Hotel di Bali / Indonesia)**: Memiliki keramahan senyum (*hospitality smile*) alami yang luar biasa, namun sering menggunakan Keigo yang salah kaprah (*Baito-keigo* yang tidak baku, seperti \`「〜のほう」\` atau \`「〜になります」\`).
3. **Persona C (Kandidat Fresh Non-Pariwisata LPK)**: Kesulitan membedakan kapan memakai Sonkeigo vs Kenjōgo; suara terlalu pelan di area lobi yang luas.

### 3.2 Matriks Besaran, Metrik & Satuan Pengukuran Kritis Perhotelan

\`\`\`
┌────────────────────────────────────────────────────────────────────────┐
│             MATRIKS PENGUKURAN & STANDAR OPERASIONAL HOTEL             │
├───────────────────────┬──────────────┬─────────────────────────────────┤
│ Parameter Operasional │ Satuan Resmi │ Nilai Standar & Tindakan Teknis │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 1. Durasi Check-in    │ Menit        │ • Standar Waktu per Tamu:       │
│    (チェックイン時間) │              │   2 – 3 Menit (Efisien & Ramah) │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 2. Derajat Membungkuk │ Derajat (°)  │ • Eshaku (Koridor): 15°         │
│    (お辞儀の角度)     │              │ • Keirei (Sapa Tamu): 30°       │
│                       │              │ • Saikeirei (Minta Maaf): 45°   │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 3. Waktu Pembersihan  │ Menit        │ • Standar Pembersihan Kamar:    │
│    Kamar Check-out    │              │   20 – 30 Menit per Kamar Twin  │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 4. Jarak Kontak Mata  │ Meter (m)    │ • Jarak Berdiri Sopan: 1.0 – 1.5m│
│    (パーソナルスペース│              │   (Menjaga zona nyaman tamu)    │
└───────────────────────┴──────────────┴─────────────────────────────────┘
\`\`\`

---

## Bab 4: Arsitektur Kurikulum Fase 1 — Maksimalkan Peluang Lulus Ujian CBT

### 4.1 Struktur Ujian Resmi Prometric CBT JICE Perhotelan
30 butir soal pilihan ganda teori operasional front office, housekeeping, perjamuan restoran hotel, dan etika komunikasi omotenashi dalam 60 menit.
Ambang kelulusan: $\ge 60\%$ (JICE 2024).

### 4.2 Dekonstruksi Lima Jebakan Distractor Utama Perhotelan
1. **Jebakan Penggunaan Sonkeigo untuk Diri Sendiri (Baito-Keigo Trap)**: Pilihan yang mengucapkan \`「私がご覧になります」\` (Saya yang melihat - salah memakai Sonkeigo) alih-alih \`「拝見いたします」\` (Kenjōgo) adalah jebakan klasik.
2. **Jebakan Menyentuh Pintu Kamar Tanpa Mengetuk**: Membuka pintu kamar tamu dengan kunci master tanpa mengetuk dan mengucapkan \`「ハウスキーピングでございます」\` (*Hauzuskīpingu de gozaimasu*) sebanyak 3 kali adalah salah mutlak.
3. **Jebakan Menerima Tip Uang Tunai di Hotel Jepang**: Di Jepang tidak ada budaya memberi tip uang tunai (*chippu*). Menerima tip uang kertas dan memasukkannya ke kantong pribadi adalah pelanggaran kode etik serius.

---

## Bab 5: Arsitektur Kurikulum Fase 2 — Kesiapan Kerja Operasional Spesifik Sektor

### 5.1 Progressive SNR Audio & Onomatopoeia Kenyamanan Hotel
- Audio percakapan tamu beraksen kedaerahan atau bahasa Inggris di tengah denting piano lobi dan suara langkah kaki.
- Onomatopoeia fasilitas hotel:
  - \`ピカピカ (pika-pika)\`: Cermin wastafel dan kran kamar mandi yang mengkilap tanpa noda air.
  - \`ふかふか (fuka-fuka)\`: Kasur futon atau bantal bulu angsa yang empuk mengembang.
  - \`ゆったり (yuttari)\`: Suasana santai relaksasi yang dirasakan tamu di pemandian air panas onsen ryokan.

### 5.2 Protokol Intervensi Krisis & Kualifikasi SSW-2
- **Panduan Evakuasi Bencana Tengah Malam (Emergency Evacuation)**: Jika terjadi gempa besar berkekuatan Shindo 5 ke atas pada malam hari, staf front desk segera memeriksa sistem proteksi kebakaran (*bōsai ban*), mengaktifkan siaran darurat hotel dalam dua bahasa (Jepang & Inggris), dan memandu tamu menuruni tangga darurat dengan membawa senter.
- **Kualifikasi Menuju SSW-2**:
  - Sertifikasi Ujian Nasional Industri Akomodasi (**Shukuhaku Gyōmu Kentei**)
  - Ujian Evaluasi Tokutei Ginō 2-gō Sektor Perhotelan (Tingkat Manajer Operasional Front Office) $\rightarrow$ Hak tinggal tanpa batas, membawa keluarga, dan jalur **Eijūken**.

---

## Bab 6: 4 Modalitas Latihan Otentik, Scaffolding & Taksonomi Remedial

### 6.1 Empat Modalitas Latihan Otentik
1. **Visual**: Identifikasi penataan alat makan formal banquet (*Table Setting*) pada foto jamuan perjamuan makan malam barat dan tradisional kaiseki ryokan.
2. **Auditori**: Mengidentifikasi permintaan khusus tamu (*Special Request*: kamar bebas asap rokok, alergi makanan) melalui telepon reservasi.
3. **Skenario**: Menangani situasi overbooking kamar atau komplain AC kamar yang tidak dingin.
4. **Prosedural**: Menghitung biaya pembatalan kamar (*Kanseru Ryō*): pembatalan H-1 dikenakan biaya 20%, pembatalan Hari-H dikenakan 80%, tanpa kabar (No Show) dikenakan 100%.

### 6.2 Matriks Taksonomi Remedial (4 Tipe Eror)
- **Tipe L**: Tertukar antara bentuk *Kenjōgo* (申す) vs *Sonkeigo* (おっしゃる).
- **Tipe C**: Mengira di Jepang boleh menerima uang tip tunai dari tamu asing.
- **Tipe M**: Menghitung persentase biaya pembatalan kamar pada tagihan tamu.
- **Tipe P**: Menyebutkan nomor kamar tamu secara terbuka di depan orang lain di lobi.

### 6.3 Tabel Parameter Desain Kurikuler Perhotelan
\`\`\`
┌────────────────────────────────────────────────────────────────────────┐
│             PARAMETER DESAIN KURIKULER RESMI NUGGET NIHONGO            │
│                 SEKTOR 17: PERHOTELAN (HOSPITALITY)                    │
├───────────────────────────────────┬────────────────────────────────────┤
│ Parameter Kurikulum               │ Nilai Standar Statuter             │
├───────────────────────────────────┼────────────────────────────────────┤
│ Total Jam Belajar Rekomendasi     │ 150 Jam Pelajaran (8 Minggu @20j)  │
│ Rasio Fase 1 (CBT) vs Fase 2 (K3) │ 50% CBT Ujian : 50% Operasional    │
│ Target Bank Soal Prometric CBT    │ 550 Butir Soal Teori & Visual      │
│ Rasio Latihan Audio Noise (SNR)   │ Minimal 35% (Lobi & Telepon Tamu)  │
│ Kuota Wajib Penguasaan Keigo 3-Lvl│ Lulus 100% Modul Tanpa Cacat Eror  │
│ Ambang Kelulusan Simulasi Ujian   │ 80% (Di atas standar resmi 60%)    │
│ Frekuensi Review SRS FSRS         │ Target retensi 90% parameter adaptif│
└───────────────────────────────────┴────────────────────────────────────┘
\`\`\`
`;

fs.writeFileSync(path.join(targetDir, 'SSW-17-HOSPITALITY-PEDAGOGICAL-FOUNDATION.md'), ssw17Content, 'utf8');
console.log('Successfully written SSW-17 Hospitality Foundation.');
console.log('=== Batch 3 Foundations Generation Completed Successfully ===');
