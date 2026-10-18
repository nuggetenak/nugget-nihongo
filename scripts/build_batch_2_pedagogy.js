const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../corpus/pedagogy/ssw');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// =========================================================================
// 1. SSW-09 CONSTRUCTION INDUSTRY
// =========================================================================
const ssw09Content = `# Cetak Biru Pedagogis & Kurikulum Kejuruan SSW · Sektor 09: Industri Konstruksi (Construction)

> **Kode Dokumen:** \`SSW-PEDAGOGY-09-CONSTRUCTION\`  
> **Versi:** 4.1.0-BIAS-FREE-FOUNDATION  
> **Sektor:** Industri Konstruksi (Construction Industry / 建設分野 - 3 Divisi Terpadu)  
> **Kementerian Pembina:** Kementerian Pertanahan, Infrastruktur, Transportasi dan Pariwisata Jepang (MLIT / 国土交通省)  
> **Badan Pelaksana Uji:** Organisasi SDM Keterampilan Konstruksi Jepang (JAC / 一般社団法人 建設技能人材機構) & Prometric  
> **Status Bias Lingkungan:** Pusat Referensi Otentik Konstruksi (*Kensetsu Genba*); Dikelola Secara Khusus Tanpa Mencemari Sektor Layanan, Pangan, atau Manufaktur Lainnya  
> **Sumber Kurasi Primer:**
> - \`reference-books/ssw/07_kensetsu_construction/Construction_Common_Safety_Text2_JA.pdf\` (Keselamatan Umum, K3 & Budaya Kerja Proyek, 18 halaman)
> - \`reference-books/ssw/07_kensetsu_construction/Construction_Civil_Theory_Text1d_JA.pdf\` & \`reference-books/ssw/07_kensetsu_construction/Construction_Civil_Theory_Text14d_ID.pdf\` & \`reference-books/ssw/07_kensetsu_construction/Construction_Civil_Practical_Text57d_ID.pdf\` (Teknik Sipil / 土木)
> - \`reference-books/ssw/07_kensetsu_construction/Construction_Building_Theory_Text1k_JA.pdf\` & \`reference-books/ssw/07_kensetsu_construction/Construction_Building_Theory_Text14k_ID.pdf\` & \`reference-books/ssw/07_kensetsu_construction/Construction_Building_Practical_Text57k_ID.pdf\` (Arsitektur Gedung / 建築)
> - \`reference-books/ssw/07_kensetsu_construction/Construction_Lifeline_Theory_Text1l_JA.pdf\` & \`reference-books/ssw/07_kensetsu_construction/Construction_Lifeline_Theory_Text14l_ID.pdf\` & \`reference-books/ssw/07_kensetsu_construction/Construction_Lifeline_Practical_Text57l_ID.pdf\` (Fasilitas & Jalur Kehidupan / 設備)
> - \`reference-books/ssw/07_kensetsu_construction/Construction_Theory_Sample_JA.pdf\` & \`reference-books/ssw/07_kensetsu_construction/Construction_Theory_Sample_ID.pdf\`
> - \`reference-books/ssw/07_kensetsu_construction/Construction_Civil_Practical_Sample_ID.pdf\`, \`reference-books/ssw/07_kensetsu_construction/Construction_Building_Practical_Sample_ID.pdf\`, \`reference-books/ssw/07_kensetsu_construction/Construction_Lifeline_Practical_Sample_ID.pdf\`
> **Landasan Teori & Riset:**
> - Needs Analysis & Technical Lexicon (Nation & Hwang 1995 [VS-09]; Chung & Nation 2003 [VS-10])
> - Cross-Cultural Communication in Construction Gemba & HOU-REN-SO (Mustaqim & Priventa 2026 [VS-31]; Supriatnaningsih et al. 2024 [VS-33])
> - Geminate Acoustic Intelligibility in High-Noise Construction Sites (Husna & Febriyanti 2022 [EA-25])
> - Construction Safety Training & 3-Division Standards (JNIOSH 2020 [VS-39]; JAC 2024 [VS-41])
> - Testing Effect & Retrieval Practice (Roediger & Karpicke 2006 [TE-01])
> - Morpheme-First Compound Kanji Chunking (Matsunaga 1999 [OD-20])

---

## Bab 1: Ekosistem Tempat Kerja & Hierarki Komunikasi Otentik

### 1.1 Struktur Proyek & Peran Industri (Kensetsu Genba)
Tempat kerja konstruksi di Jepang adalah **Kensetsu Genba (建設現場 - Lokasi Proyek Konstruksi)** yang melibatkan koordinasi multi-kontraktor di bawah kontraktor utama (*General Contractor / Zenekon*).
Struktur hierarki otoritas lapangan:
1. **Genba Kantoku / Shominin (現場監督 / 所長 - Site Manager / Kepala Proyek)**: Penanggung jawab utama jadwal, mutu, dan legalitas izin proyek dari MLIT.
2. **Kōji Shuninginōsha / Sagyo Shuninsha (作業主任者 - Safety & Task Supervisor)**: Pemegang lisensi statuter penanggung jawab perancahan (*Ashiba*), penggalian tanah (*Dokō*), atau pekerjaan bekisting (*Katawaku*).
3. **Shokuchō (職長 - Foreman / Mandor Utama)**: Memimpin apel keselamatan pagi (*Chōrei*), membagikan surat perintah kerja (*Sagyo Shijisho*), dan mengawasi KYK (*Kiken Yochi Katsudō*).
4. **Tamakake Ginōsha (玉掛け技能者 - Operator Tali Pengikat Sling Kran)**: Pemegang lisensi resmi pengikatan beban material pada kran angkat.
5. **Shokunin / Ginōsha (職人 / 技能実習・特定技能 - Tukang Ahli & Pekerja Teknis)**: Teknisi spesialis pemasangan rebar, perancah, perpipaan, atau bekisting.

### 1.2 Register Bahasa Otentik: Seruan Lapangan, Aba-Aba Crane & KYK
Komunikasi proyek konstruksi bersifat direktif, cepat, bernada tegas, dan mengandalkan volume suara tinggi:
- **Apel Pagi (Chōrei) & Taisō**: Pukul 08:00 pagi seluruh pekerja berkumpul melakukan senam pemanasan (*Rajio Taisō*), ikrar keselamatan (*Anzen Kōdō Sengen*), dan simulasi bahaya KYK.
- **Seruan Aba-Aba Crane (Tamakake no Aizu)**:
  - Mengangkat beban: \`「巻き上げー！（まきあげー！）」\` (*Makiage-!*)
  - Menurunkan beban: \`「巻き下げー！（まきさげー！）」\` (*Makisage-!*)
  - Hentikan gerakan: \`「ストップ！（または、止まれー！）」\` (*Sutoppu! / Tomare-!*)
  - Boom ke kanan/kiri: \`「右旋回ー！」\` (*Migi senkai-!*) / \`「左旋回ー！」\` (*Hidari senkai-!*)
- **Pointing and Calling (Shishi Koshō - 指差呼称)**:
  - Sebelum melangkah ke perancah: \`「足場よし！安全帯よし！ヨシ！」\` (*Ashiba yoshi! Anzentai yoshi! Yoshi!* JNIOSH 2020 [VS-39]).

### 1.3 Protokol Interaksi Wajib: Hōrensō, Sagyō Teishi Ken & Anti-Inpei
- **Hak Menghentikan Pekerjaan Seketika (Sagyō Teishi Ken - 作業停止権)**: Berdasarkan standar JAC 2024 [VS-41], setiap pekerja memiliki hak dan kewajiban hukum untuk menghentikan pekerjaan dan meneriakkan bahaya jika melihat retakan tebing galian, tali sling kran yang aus berserabut, atau perancah tanpa pagar pengaman.
- **Anti-Inpei (Pencegahan Penyembunyian Insiden)**: Jatuhnya perkakas kecil (seperti kunci pas/kunci ratchet) dari ketinggian perancah wajib dilaporkan seketika kepada Shokuchō meskipun tidak mengenai orang di bawah. Menyembunyikan insiden nyaris celaka (*Hiyari-Hatto*) dilarang keras (Mustaqim & Priventa 2026 [VS-31]).

---

## Bab 2: Analisis Kritis Kons & Kegagalan Hafalan Buta

### 2.1 Kegagalan Sistemik Hafalan Buta pada Sektor Konstruksi
1. **Ketiadaan Pemahaman Beban Statis & Titik Berat (Gravity Trap)**: Menghafal kata *tamakake* (mengikat beban sling) tanpa memahami fisika sudut tali ($60^\circ$ meningkatkan tegangan tali drastis dibanding $30^\circ$) berakibat fatal: tali sling putus dan beban beton/baja menimpa pekerja di bawah.
2. **Kebutaan Simbol Gambar Kerja (Zumen Blindness)**: Menghafal kanji tanpa bisa membaca cetak biru arsitektur ($mm$, simbol las, garis elevasi kontur tanah) membuat pekerja tidak dapat memotong besi tulangan atau memasang bekisting secara presisi.
3. **Ketidaksiapan Menghadapi Kebisingan Proyek**: Di bawah suara palu hidrolik pile-driver ($95\text{ dB}$) dan mesin kompresor, pekerja Indonesia yang hanya mendengar audio studio gagal menangkap aba-aba peringatan darurat konsonan ganda (Husna & Febriyanti 2022 [EA-25]).

### 2.2 Poin Titik Kritis Gegar Budaya & Kompetensi di Lapangan Proyek
- **Gegar Disiplin Alat Pelindung Diri (Full Harness Shock)**: Di Indonesia, pekerja kerap memakai sandal atau tali pengaman satu titik pinggang (*dōberuto*). Di Jepang sejak 2022, regulasi mewajibkan pemakaian sabuk penahan jatuh seluruh tubuh (**Furu Hānesu-gata / フルハーネス型安全帯**) untuk ketinggian di atas $2.0\text{ m}$. Pelanggaran mengaitkan kait ganda (*2-chō kake*) berakibat pengusiran langsung dari area proyek.
- **Ketahanan Fisik Cuaca Ekstrem**: Terik panas musim panas proyek luar ruangan ($38^\circ\text{C}$ dengan seragam kerja panjang tebal) memicu sengatan panas (*Netchūshō*); sebaliknya, angin beku musim dingin membuat jemari mati rasa saat memegang baja beku.

---

## Bab 3: Pemetaan Hambatan Kognitif, Linguistik & Budaya Siswa Indonesia

### 3.1 Tiga Persona Pembelajar Indonesia
1. **Persona A (Ex-Magang Konstruksi / Sokeizai)**: Memiliki stamina tinggi dan terbiasa dengan nada keras atasan proyek, namun lemah dalam ujian teori membaca simbol spesifikasi teknis JIS.
2. **Persona B (Lulusan SMK Teknik Sipil / Bangunan / Pengelasan)**: Cepat memahami gambar teknik dan kalkulasi beban, namun kemampuan tata bahasa lisan N4 belum terbiasa dengan dialek kasar mandor (*genba kotoba*).
3. **Persona C (Kandidat Fresh Non-Teknis LPK)**: Tidak memiliki latar belakang bangunan; rentan mengalami cedera pinggang saat mengangkat material dan panik saat berada di atas perancah tinggi.

### 3.2 Interferensi Tipologi Bahasa: Konvensi Pengukuran Milimeter & Direktif Spasial
- **Konvensi Mutlak Milimeter (mm)**: Pada proyek konstruksi Jepang, ukuran TIDAK PERNAH dinyatakan dalam sentimeter ($cm$). Ukuran $1.5\text{ meter}$ selalu ditulis dan diucapkan: \`1500 (Sen go-hyaku miri)\`. Pembelajar Indonesia yang menyebutkan $150\text{ cm}$ akan membingungkan rekan kerja Jepang.
- **Direktif Arah Spasial Lapangan**:
  - \`Tsurazura (面面 / つらづら)\`: Permukaan rata sejajar tanpa tonjolan.
  - \`Kane (矩 / かね)\`: Sudut siku-siku tepat $90^\circ$.
  - \`Nige (逃げ)\`: Jarak celah toleransi ekspansi pergerakan material.
  - \`Sumi (墨 / すみ)\`: Garis tanda tinta panduan pemasangan (*sumidashi*).

### 3.3 Jebakan Katakana & Wasei-Eigo Konstruksi
- **Kurasu (クレーン)**: Mobile crane / tower crane.
- **Supana / Rachetto (スパナ / ラチェット)**: Kunci pas dan kunci ring ratchet untuk baut perancah.
- **Sando Burasutā (サンドブラスター)**: Alat semprot pasir pembersih karat besi.
- **Bakkuhō (バックホウ)**: Excavator hidrolik pengeruk tanah (*backhoe*).

### 3.4 Matriks Besaran, Metrik & Satuan Pengukuran Kritis Konstruksi

\`\`\`
┌────────────────────────────────────────────────────────────────────────┐
│             MATRIKS PENGUKURAN & SATUAN TEKNIS SEKTOR KONSTRUKSI       │
├───────────────────────┬──────────────┬─────────────────────────────────┤
│ Parameter Operasional │ Satuan Resmi │ Nilai Standar & Tindakan Teknis │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 1. Dimensi Panjang    │ mm           │ • Gambar teknik 100% dalam mm   │
│    (寸法 - Sunpō)     │ (Milimeter)  │ • Toleransi besi tulangan: ±5mm │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 2. Ketinggian Wajib   │ Meter (m)    │ • Wajib Full Harness: ≥ 2.0 m   │
│    Full Harness       │              │ • Pagar pengaman perancah:      │
│    (フルハーネス着用) │              │   Tinggi minimal 85 cm          │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 3. Sudut Kemiringan   │ Rasio / °    │ • Kemiringan galian tanah: 1:1.5│
│    Galian & Tangga    │              │ • Sudut aman tangga perancah:75°│
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 4. Torsi Baut Baja    │ N·m          │ • Pengencangan baut mutu tinggi │
│    (締付トルク)       │ (Newton-m)   │   (Torque wrench bersuara klik) │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 5. Sudut Sling Angkat │ Derajat (°)  │ • Sudut optimal tali sling: ≤60°│
│    (吊り角度)         │              │ • DILARANG sudut tumpul > 60°   │
└───────────────────────┴──────────────┴─────────────────────────────────┘
\`\`\`

---

## Bab 4: Arsitektur Kurikulum Fase 1 — Maksimalkan Peluang Lulus Ujian CBT

### 4.1 Struktur Ujian Resmi Prometric CBT JAC Konstruksi
Ujian Evaluasi Tokutei Ginō Konstruksi mencakup 30 soal pilihan ganda teori dan skenario visual terpadu dalam 60 menit.
Ambang kelulusan: $\ge 60\%$ (18 dari 30 soal).

### 4.2 Dekonstruksi Pola Kalimat Soal & Lima Jebakan Distractor JAC
1. **Jebakan Penggunaan Sabuk Pinggang di Ketinggian Ekstrem (The Body Belt Trap)**:
   - *Pilihan Jebakan*: "Pada pekerjaan perancah lantai 5, cukup gunakan sabuk pinggang biasa (*dōberuto*) asalkan dikaitkan erat."
   - *Prinsip Benar*: SALAH FATAL. Pekerjaan di atas 2 meter (terutama perancah gantung) wajib menggunakan sabuk seluruh tubuh (**Furu Hānesu**).
2. **Jebakan Masuk ke Bawah Beban Gantung Kran (The Suspended Load Trap)**:
   - *Pilihan Jebakan*: "Pekerja boleh berdiri di bawah muatan kran yang sedang terangkat untuk memegang dan menstabilkan beban dengan tangan."
   - *Prinsip Benar*: LETHAL ERROR. Dilarang keras berada di bawah beban gantung (*tsurini no shita tachiiri kinshi*). Beban harus dikendalikan menggunakan tali pemandu (*kaishinawa*).
3. **Jebakan Penggalian Parit Tanpa Dinding Penahan (The Trench Shoring Trap)**:
   - *Pilihan Jebakan*: "Untuk galian tanah sedalam 2 meter pada tanah pasir, penggalian tegak lurus dapat dilakukan tanpa memasang turap penahan tanah."
   - *Prinsip Benar*: SALAH FATAL. Galian di atas 1.5 meter wajib dipasang turap penahan (*yamadome shichū*) atau dibuat lereng kemiringan aman untuk mencegah longsor menimbun pekerja.
4. **Jebakan Modifikasi Perancah Sembarangan (The Unauthorized Scaffolding Trap)**:
   - *Pilihan Jebakan*: "Pekerja boleh melepas sendiri palang silang (*sujikai*) atau lantai pijakan perancah jika menghalangi jalur pipa."
   - *Prinsip Benar*: SALAH MUTLAK. Pembongkaran atau modifikasi bagian perancah HANYA boleh dilakukan atas instruksi dan pengawasan langsung Penanggung Jawab Perancah (*Ashiba no Sagyō Shuninsha*).
5. **Jebakan Satu Kait Sabuk Pengaman (The Single Hook Trap)**:
   - *Pilihan Jebakan*: "Saat berpindah dari satu pipa perancah ke pipa lain, lepas kait sabuk pengaman lalu berjalan cepat ke titik berikutnya."
   - *Prinsip Benar*: SALAH. Wajib menggunakan teknik **Kait Ganda (2-chō kake - ２丁掛け)**: kait kedua harus dikaitkan ke struktur kokoh sebelum kait pertama dilepas, sehingga tidak ada momen sedetik pun pekerja tanpa perlindungan jatuh.

---

## Bab 5: Arsitektur Kurikulum Fase 2 — Kesiapan Kerja Operasional Spesifik Sektor

### 5.1 Progressive SNR Audio & Dialek Lapangan
- Melatih pendengaran instruksi mandor di tengah deru kompresor dan gergaji beton.
- Menguasai seruan khas Kanto vs Kansai:
  - Kanto: \`「急げ！片付けろ！」\` (*Isoge! Katadukero!*)
  - Kansai: \`「早よせえ！なおしとき！」\` (*Hayo see! Naoshitoki!*)

### 5.2 Penjangkaran Sensori-Kinestetik & Onomatopoeia Taktil
- \`ガタガタ (gata-gata)\`: Perancah goyang tidak stabil $\rightarrow$ periksa klem pengunci (*kuranpu*).
- \`グラッ (gura')\`: Tanah galian bergerak retak $\rightarrow$ evakuasi seketika!
- \`カチッ (kachi')\`: Bunyi klik kunci momen ratchet yang menandakan torsi pengencangan tercapai.
- \`ピンと張る (pin to haru)\`: Tali kran tegang lurus siap mengangkat beban.

### 5.3 Protokol Intervensi Krisis & Peta Kualifikasi SSW-2
- **Protokol Sengatan Panas (Netchūshō Emergency)**: Pindahkan korban ke tempat teduh berangin, longgarkan pakaian, kompres es di leher, ketiak, dan selangkangan; berikan oral rehydration salts (ORS/Pocari) jika sadar; hubungi 119 jika disorientasi.
- **Tangga Promosi Kualifikasi Menuju SSW-2**:
  - Lisensi Tamagake (吊り上げ荷重1t以上)
  - Lisensi Kendaraan Konstruksi (車両系建設機械)
  - Kualifikasi Pengawas Konstruksi Nasional (**Kenchiku / Doboku Sekō Kanri Gishi 2-kyū - 施工管理技士**) $\rightarrow$ Konversi ke **Tokutei Ginō 2-gō** (Bisa membawa keluarga dan menuju Permanent Resident / Eijūken).

---

## Bab 6: 4 Modalitas Latihan Otentik, Scaffolding & Taksonomi Remedial

### 6.1 Empat Modalitas Latihan Otentik
1. **Visual**: Identifikasi kerusakan alat sling kran (kawat putus berserabut, kawat gepeng terpuntir) pada gambar foto resolusi tinggi.
2. **Auditori**: Mengidentifikasi aba-aba kran (*Makiage, Makisage, Tomare*) di tengah bising mesin.
3. **Skenario**: Menangani situasi tanah galian merekah saat hujan gerimis.
4. **Prosedural**: Menghitung beban angkat: volume beton $2\text{ m}^3 \times 2.4\text{ ton/m}^3 = 4.8\text{ ton} \rightarrow$ memilih kapasitas kran dan sling yang sesuai.

### 6.2 Matriks Taksonomi Remedial (4 Tipe Eror)
- **Tipe L**: Tertukar istilah *Tekkin* (besi beton tulangan) vs *Tekkotsu* (rangka baja H-beam).
- **Tipe C**: Mengira tali sling sudut $90^\circ$ lebih kuat daripada $30^\circ$.
- **Tipe M**: Menghitung $150\text{ cm}$ bukan $1500\text{ mm}$ pada pemotongan pipa.
- **Tipe P**: Membuka kait sabuk pengaman sebelum mengaitkan kait cadangan saat pindah pijakan.

### 6.3 Tabel Parameter Desain Kurikuler Konstruksi
\`\`\`
┌────────────────────────────────────────────────────────────────────────┐
│             PARAMETER DESAIN KURIKULER RESMI NUGGET NIHONGO            │
│                 SEKTOR 09: INDUSTRI KONSTRUKSI (CONSTRUCTION)          │
├───────────────────────────────────┬────────────────────────────────────┤
│ Parameter Kurikulum               │ Nilai Standar Statuter             │
├───────────────────────────────────┼────────────────────────────────────┤
│ Total Jam Belajar Rekomendasi     │ 140 Jam Pelajaran (7 Minggu @20j)  │
│ Rasio Fase 1 (CBT) vs Fase 2 (K3) │ 40% CBT Ujian : 60% Operasional    │
│ Target Bank Soal Prometric CBT    │ 550 Butir Soal Teori & Visual      │
│ Rasio Latihan Audio Noise (SNR)   │ Minimal 45% (Simulasi Deru Proyek) │
│ Kuota Wajib K3 Full Harness & KYK │ Lulus 100% Modul Tanpa Cacat Eror  │
│ Ambang Kelulusan Simulasi Ujian   │ 80% (Di atas standar resmi 60%)    │
│ Frekuensi Review SRS FSRS         │ Target retensi 90% parameter adaptif│
└───────────────────────────────────┴────────────────────────────────────┘
\`\`\`
`;

fs.writeFileSync(path.join(targetDir, 'SSW-09-CONSTRUCTION-PEDAGOGICAL-FOUNDATION.md'), ssw09Content, 'utf8');
console.log('Successfully written SSW-09 Construction Foundation.');

// =========================================================================
// 2. SSW-03 SOKEIZAI TOOLING & CASTING
// =========================================================================
const ssw03Content = `# Cetak Biru Pedagogis & Kurikulum Kejuruan SSW · Sektor 03: Pengecoran Logam & Cetakan (Sokeizai)

> **Kode Dokumen:** \`SSW-PEDAGOGY-03-SOKEIZAI\`  
> **Versi:** 4.1.0-BIAS-FREE-FOUNDATION  
> **Sektor:** Industri Bahan Cetak & Pengecoran (Sokeizai / 素形材産業 - 鋳造・鍛造・金型)  
> **Kementerian Pembina:** Kementerian Ekonomi, Perdagangan, dan Industri Jepang (METI / 経済産業省)  
> **Badan Pelaksana Uji:** Organisasi Penerimaan Tenaga Kerja Manufaktur Jepang (JAIM / 一般社団法人 製造業外国人材受入機構) & Prometric  
> **Status Bias Lingkungan:** 100% Pabrik Pengecoran & Cetakan Logam (*Imono Kōjō / Kōba*); Bebas dari Bias Konstruksi Luar Ruangan (*Zero Genba Bias*)  
> **Sumber Kurasi Primer:**
> - \`reference-books/ssw/02_seizou_manufacturing/Manufacturing_Cast_Metal_Theory_JA.pdf\` (Teori Pengecoran Logam Besi & Non-Besi)
> - \`reference-books/ssw/02_seizou_manufacturing/Manufacturing_Die_Casting_Theory_JA.pdf\` (Teknik Cetak Tekan Die-Casting)
> - \`reference-books/ssw/02_seizou_manufacturing/Manufacturing_Metallic_Mold_Theory_JA.pdf\` (Pembuatan Cetakan Logam Presisi / Kanagata)
> - \`reference-books/ssw/02_seizou_manufacturing/Manufacturing_Sample_Exam_2024_JA.pdf\` (Spesifikasi Resmi CBT Prometric 2024)
> **Landasan Teori & Riset:**
> - Needs Analysis & Technical Lexicon (Hutchinson & Waters 1987 [VS-01]; Nation & Hwang 1995 [VS-09]; Chung & Nation 2003 [VS-10])
> - Workplace Safety & HOU-REN-SO (Mustaqim & Priventa 2026 [VS-31]; Supriatnaningsih et al. 2024 [VS-33])
> - Thermal Trauma Onomatopoeia & Industrial Sensory Evaluation (Sakamoto et al. 2014 [VS-36]; JNIOSH 2020 [VS-39])
> - JAIM 17 Manufacturing Divisions Standard (JAIM 2024 [VS-40])
> - Retrieval Practice & Testing Effect (Roediger & Karpicke 2006 [TE-01])
> - Morpheme-First Kanji Chunking (Matsunaga 1999 [OD-20])

---

## Bab 1: Ekosistem Tempat Kerja & Hierarki Komunikasi Otentik

### 1.1 Struktur Pabrik & Peran Industri (Imono Kōjō / Sokeizai Kōba)
Tempat kerja Sokeizai adalah **Kōjō (工場 - Pabrik Pengolahan Logam Dasar)** di mana logam cair panas membara dituangkan ke dalam cetakan pasir atau cetakan baja bertekanan tinggi.
Hierarki operasional:
1. **Kōjōchō (工場長 - Kepala Pabrik)**: Penanggung jawab mutu produksi dan pemenuhan regulasi keselamatan industri METI.
2. **Yōkei Sagyō Shuninsha (溶融作業主任者 - Safety Supervisor Peleburan Logam)**: Pemegang lisensi statuter penanganan tungku peleburan logam cair (*Yōkairo*).
3. **Chīmu Rīdā / Han-chō (班長 - Leader Regu)**: Mengatur jadwal penuangan logam cair (*Chūtei*), memeriksa rasio pasir cetak, dan memimpin apel 5S (*Seiri, Seiton, Seisō, Seiketsu, Shitsuke*).
4. **Operētā (オペレーター - Operator Pengecoran & Die-Casting)**: Teknisi pengoperasian ladle penuang (*Yudoki*), pembersih kerak terak (*Noro*), dan pemeriksa rongga cacat cor (*Suana*).

### 1.2 Register Bahasa Otentik & Aba-Aba Penuangan Logam Panas
Komunikasi di dekat tungku peleburan logam cair mengutamakan kejelasan suku kata dan seruan lantang:
- **Aba-Aba Penuangan (Yutsugi no Aizu)**:
  - Siap menuang: \`「湯入れ始めます！（ゆいれはじめます！）」\` (*Yuire hajimemasu!*)
  - Awas percikan: \`「湯跳ね注意！（ゆばねちゅうい！）」\` (*Yubane chūi!*)
  - Penuangan selesai: \`「注湯完了！（ちゅうとうかんりょう！）」\` (*Chūtō kanryō!*)
- **Pointing and Calling (Shishi Koshō - 指差呼称)**:
  - Sebelum menyalakan pemanas ladle: \`「レードル乾燥よし！水分ゼロよし！ヨシ！」\` (*Rēdoru kansō yoshi! Suibun zero yoshi! Yoshi!* JNIOSH 2020 [VS-39]).

### 1.3 Protokol Interaksi Wajib: Hōrensō, Stop Panas & Anti-Inpei
- **Larangan Menyembunyikan Cacat Cor (Suana Inpei Kinshi)**: Cacat rongga udara di dalam coran (*suana*) atau retakan halus (*ware*) pada blok mesin kendaraan berisiko memicu kecelakaan fatal bagi konsumen akhir. Melaporkan cacat cor sejak dini adalah prinsip mutlak (Mustaqim & Priventa 2026 [VS-31]; JAIM 2024 [VS-40]).
- **Bahaya Ledakan Uap Air (Mizuage Bakuhatsu Bōshi)**: Jika ada setetes air di dalam ladle atau cetakan saat terkena logam cair $1,500^\circ\text{C}$, air akan memuai mendadak $1,700\text{ kali}$ lipat memicu ledakan uap air dahsyat. Setiap pekerja berhak menghentikan penuangan seketika jika melihat kelembapan.

---

## Bab 2: Analisis Kritis Kons & Kegagalan Hafalan Buta

### 2.1 Kegagalan Sistemik Hafalan Buta pada Sektor Pengecoran
1. **Ketiadaan Pemahaman Termodinamika & Reaksi Termal**: Menghafal kanji \`鋳造\` (chūzō - pengecoran) tanpa memahami titik lebur besi ($1,538^\circ\text{C}$) dan bahaya kontak kelembapan memicu luka bakar fatal.
2. **Kebutaan Simbol Toleransi Gambar Cetakan**: Gambar teknik cetakan (*kanagata*) menggunakan toleransi presisi mikron ($\pm 0.02\text{ mm}$). Siswa yang terbiasa dengan ukuran cm tidak mampu mengoperasikan mesin milling pembuat cetakan.
3. **Ketidaksiapan Mengidentifikasi Retak Suara (Acoustic Ring Test)**: Pemeriksaan produk cor dilakukan dengan memukul benda uji dengan palu kecil; suara berdenting jernih (*kin-kin*) menandakan logam padat, sedangkan suara mendem tumpul (*boko-boko*) menandakan adanya rongga keropos di dalam logam.

### 2.2 Poin Titik Kritis Gegar Budaya & Beban Panas di Pabrik Cor
- **Gegar Beban Panas Ekstrem (Radiant Heat Shock)**: Berdiri di depan tungku peleburan dengan radiasi panas membara memerlukan pakaian pelindung tahan panas berbobot berat, kacamata perisai inframerah, dan gaiter pelindung kaki (*gyātoru*).

---

## Bab 3: Pemetaan Hambatan Kognitif, Linguistik & Budaya Siswa Indonesia

### 3.1 Tiga Persona Pembelajar Indonesia
1. **Persona A (Ex-Magang Manufaktur Logam / Pengelasan)**: Terbiasa dengan suhu panas dan disiplin pabrik, namun kesulitan dalam menghafal istilah metalurgi dan kimia pasir pengikat (*bentonaito / furan jushi*).
2. **Persona B (Lulusan SMK Mesin / Otomotif)**: Memahami dasar mekanik, namun belum terbiasa dengan bahaya ledakan uap air dan etika pelaporan cacat cor.
3. **Persona C (Kandidat Fresh LPK Non-Teknis)**: Sangat terkejut dengan panas dan percikan api lelehan; rentan panik saat alarm tungku berbunyi.

### 3.2 Interferensi Tipologi Bahasa: Konsep Suhu & Tekanan Presisi
- **Konvensi Satuan Suhu & Tekanan Logam**:
  - Suhu besi cor: \`1450℃ (Sen yon-hyaku go-jū-do)\`.
  - Tekanan hidrolik die-casting: Dinyatakan dalam \`MPa (Mega-pasukaru)\`.
- **Diferensiasi Istilah Pasir & Cetakan**:
  - \`Ishi (石)\` vs \`Kisha (砂 - Pasir cor / Imono-suna)\`.
  - \`Hake (ハケ - Kuas pelapis)\` vs \`Kata (型 - Cetakan)\`.

### 3.3 Matriks Besaran, Metrik & Satuan Pengukuran Kritis Sokeizai

\`\`\`
┌────────────────────────────────────────────────────────────────────────┐
│             MATRIKS PENGUKURAN & SATUAN TEKNIS SEKTOR SOKEIZAI         │
├───────────────────────┬──────────────┬─────────────────────────────────┤
│ Parameter Operasional │ Satuan Resmi │ Nilai Standar & Tindakan Teknis │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 1. Suhu Logam Cair    │ °C           │ • Besi Cor (鋳鉄): 1,400–1,500°C│
│    (溶湯温度)         │ (Derajat Cel)│ • Aluminium: 650°C – 750°C      │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 2. Tekanan Injeksi    │ MPa          │ • Tekanan Die-Casting:          │
│    Die-Casting        │ (Mega Pascal)│   30 MPa – 100 MPa              │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 3. Toleransi Dimensi  │ mm / μm      │ • Toleransi Cetakan: ±0.01 mm   │
│    Cetakan Logam      │ (Mikrometer) │   (Wajib ukur dengan mikrometer)│
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 4. Kadar Kelembapan   │ %            │ • Kelembapan Ladle/Cetakan: 0%  │
│    Pasir Cor          │ (Persentase) │   (Bebas total dari butir air!) │
└───────────────────────┴──────────────┴─────────────────────────────────┘
\`\`\`

---

## Bab 4: Arsitektur Kurikulum Fase 1 — Maksimalkan Peluang Lulus Ujian CBT

### 4.1 Struktur Ujian Resmi Prometric CBT JAIM Sokeizai
Ujian CBT mencakup 30 soal pilihan ganda teori dan simulasi visual penuangan logam serta cacat cor dalam 60 menit.
Ambang kelulusan: $\ge 60\%$ (JAIM 2024 [VS-40]).

### 4.2 Dekonstruksi Jebakan Distractor Utama Sokeizai
1. **Jebakan Alat Basah di Depan Logam Cair**: Soal menjebak dengan menyebutkan mendinginkan ladle dengan mencelupkannya ke air sebelum menuang lelehan. Prinsip benar: SALAH FATAL, ladle harus 100% kering dan dipanaskan terlebih dahulu (*yoneki*).
2. **Jebakan Mengabaikan Perlindungan Mata Inframerah**: Soal menyebutkan cukup memakai kacamata baca biasa. Prinsip benar: Wajib memakai kacamata perisai filter cahaya dan penahan benturan (*Bōjin Megane / Shago Megane*).
3. **Jebakan Menumpahkan Terak Tanpa Peringatan**: Pilihan yang menuang terak (*slag/noro*) tanpa meneriakkan aba-aba awas percikan (*Yubane chūi*) adalah salah.

---

## Bab 5: Arsitektur Kurikulum Fase 2 — Kesiapan Kerja Operasional Spesifik Sektor

### 5.1 Progressive SNR Audio & Dialek Pabrik Manufaktur
- Audio instruksi supervisor di tengah deru tungku induksi dan dengung kompresor hidrolik.
- Menguasai seruan cepat: \`「湯が跳ねるぞ！離れろ！」\` (*Yu ga haneru zo! Hanarero!*).

### 5.2 Penjangkaran Sensori-Kinestetik & Onomatopoeia Taktil
- \`ドロドロ (doro-doro)\`: Logam cair kental panas membara siap tuang.
- \`バチバチ (bachi-bachi)\`: Percikan percikan bunga api lelehan logam saat proses deslagging.
- \`カンカン (kankan)\`: Dentingan palu periksa mutu coran yang menandakan struktur padat tanpa rongga.

### 5.3 Protokol Intervensi Krisis & Kualifikasi SSW-2
- **Tangga Promosi Kualifikasi Menuju SSW-2**:
  - Lisensi Operasi Crane & Tamagake Pabrik
  - Ujian Nasional Keterampilan Pengecoran Logam (**Chūzō Ginōshi 2-kyū / 1-kyū - 鋳造技能士**) $\rightarrow$ Konversi ke **Tokutei Ginō 2-gō** (Bawa keluarga dan jalur Permanent Resident / Eijūken).

---

## Bab 6: 4 Modalitas Latihan Otentik, Scaffolding & Taksonomi Remedial

### 6.1 Empat Modalitas Latihan Otentik
1. **Visual**: Identifikasi jenis-jenis cacat cor pada gambar produk (rongga udara *suana*, retak panas *karekizu*, permukaan kasar *hadare*).
2. **Auditori**: Mengidentifikasi aba-aba penuangan (*Yuire, Chūtō, Yubane*) di tengah bising tungku.
3. **Skenario**: Menangani situasi kebocoran cetakan pasir (*yumore*) saat penuangan berlangsung.
4. **Prosedural**: Menghitung berat tuang logam berdasarkan volume cetakan dan massa jenis besi ($7.2\text{ g/cm}^3$).

### 6.2 Matriks Taksonomi Remedial (4 Tipe Eror)
- **Tipe L**: Tertukar istilah *Chūzō* (cor logam) vs *Tanzō* (tempa logam presisi).
- **Tipe C**: Mengira cetakan pasir boleh mengandung uap air dingin.
- **Tipe M**: Salah konversi satuan tekanan MPa ke bar atau kgf/cm².
- **Tipe P**: Menuang logam tanpa melakukan pengecekan visual kekeringan ladle.

### 6.3 Tabel Parameter Desain Kurikuler Sokeizai
\`\`\`
┌────────────────────────────────────────────────────────────────────────┐
│             PARAMETER DESAIN KURIKULER RESMI NUGGET NIHONGO            │
│                 SEKTOR 03: PENGECORAN LOGAM (SOKEIZAI)                 │
├───────────────────────────────────┬────────────────────────────────────┤
│ Parameter Kurikulum               │ Nilai Standar Statuter             │
├───────────────────────────────────┼────────────────────────────────────┤
│ Total Jam Belajar Rekomendasi     │ 140 Jam Pelajaran (7 Minggu @20j)  │
│ Rasio Fase 1 (CBT) vs Fase 2 (K3) │ 45% CBT Ujian : 55% Operasional    │
│ Target Bank Soal Prometric CBT    │ 500 Butir Soal Teori & Visual      │
│ Rasio Latihan Audio Noise (SNR)   │ Minimal 40% (Deru Tungku & Mesin)  │
│ Kuota Wajib K3 Bahaya Logam Cair  │ Lulus 100% Modul Tanpa Cacat Eror  │
│ Ambang Kelulusan Simulasi Ujian   │ 80% (Di atas standar resmi 60%)    │
│ Frekuensi Review SRS FSRS         │ Target retensi 90% parameter adaptif│
└───────────────────────────────────┴────────────────────────────────────┘
\`\`\`
`;

fs.writeFileSync(path.join(targetDir, 'SSW-03-FOUNDRY-PEDAGOGICAL-FOUNDATION.md'), ssw03Content, 'utf8');
console.log('Successfully written SSW-03 Foundry Foundation.');

// =========================================================================
// 3. SSW-04 INDUSTRIAL MACHINERY
// =========================================================================
const ssw04Content = `# Cetak Biru Pedagogis & Kurikulum Kejuruan SSW · Sektor 04: Permesinan Industri (Industrial Machinery)

> **Kode Dokumen:** \`SSW-PEDAGOGY-04-MACHINERY\`  
> **Versi:** 4.1.0-BIAS-FREE-FOUNDATION  
> **Sektor:** Manufaktur Mesin Industri (Industrial Machinery Manufacturing / 産業機械製造業 - 機械加工・仕上げ・検査)  
> **Kementerian Pembina:** Kementerian Ekonomi, Perdagangan, dan Industri Jepang (METI / 経済産業省)  
> **Badan Pelaksana Uji:** Organisasi Penerimaan Tenaga Kerja Manufaktur Jepang (JAIM / 一般社団法人 製造業外国人材受入機構) & Prometric  
> **Status Bias Lingkungan:** 100% Pabrik Permesinan Presisi & Perakitan (*Kōjō / Kakōba*); Bebas dari Bias Konstruksi Luar Ruangan (*Zero Genba Bias*)  
> **Sumber Kurasi Primer:**
> - \`reference-books/ssw/02_seizou_manufacturing/Manufacturing_Machining_Theory_JA.pdf\` (Teori Pemesinan Bubut, Frais & NC/CNC)
> - \`reference-books/ssw/02_seizou_manufacturing/Manufacturing_Finishing_Assembly_Theory_JA.pdf\` (Teknik Finishing, Pengikisan Manual & Perakitan)
> - \`reference-books/ssw/02_seizou_manufacturing/Manufacturing_Sample_Exam_2024_JA.pdf\` (Spesifikasi Resmi CBT Prometric 2024)
> **Landasan Teori & Riset:**
> - Needs Analysis & Technical Lexicon (Nation & Hwang 1995 [VS-09]; Chung & Nation 2003 [VS-10]; Coxhead 2018 [VS-11])
> - Mechanical Sensory & Vibration Onomatopoeia (Doizaki et al. 2015 [VS-37]; JNIOSH 2020 [VS-39])
> - Workplace Safety & HOU-REN-SO (Mustaqim & Priventa 2026 [VS-31]; Supriatnaningsih et al. 2024 [VS-33])
> - JAIM 17 Manufacturing Divisions Standard (JAIM 2024 [VS-40])
> - Testing Effect & Retrieval Practice (Roediger & Karpicke 2006 [TE-01])
> - Morpheme-First Kanji Chunking (Matsunaga 1999 [OD-20])

---

## Bab 1: Ekosistem Tempat Kerja & Hierarki Komunikasi Otentik

### 1.1 Struktur Pabrik Permesinan & Peran Industri (Kakōba / Seizō Kōjō)
Tempat kerja permesinan industri adalah **Kakōba (加工場 - Area Pemesinan)** di mana mesin bubut (*senban*), mesin frais (*furaiban*), mesin gerinda (*kenbansha*), dan mesin CNC beroperasi memotong logam menjadi komponen berpresisi tinggi.
Hierarki operasional:
1. **Seizō Buchō / Kōjōchō (製造部長 / 工場長 - Manajer Produksi / Kepala Pabrik)**.
2. **Kikai Hoken Sagyō Shuninsha (機械保全作業主任者 - Supervisor Pemeliharaan Mesin)**.
3. **Kōtei Han-chō (工程班長 - Kepala Regu Proses Pemesinan)**: Menentukan urutan pisau pahat (*kōgu*), kecepatan putar (*kaitensū*), dan memantau lembar kendali mutu.
4. **Kakō Operētā (加工オペレーター - Operator Mesin & Perakitan)**: Membaca gambar kerja, memasang benda kerja pada ragum (*manriki*) atau chuck, mengukur dimensi dengan mikrometer/jangka sorong, dan melakukan deburring (*baritori*).

### 1.2 Register Bahasa Otentik & Aba-Aba Pengoperasian Mesin
- **Pointing and Calling (Shishi Koshō - 指差呼称)**:
  - Sebelum menekan tombol start spindel: \`「チャックハンドル外しよし！非常停止ボタンよし！ヨシ！」\` (*Chakku handoru hazushi yoshi! Hijō teishi botan yoshi! Yoshi!* JNIOSH 2020 [VS-39]).
  - Kunci chuck bubut HARUS selalu dilepas dari spindel sebelum mesin dinyalakan untuk mencegah terlempar seperti peluru!
- **Aba-Aba Peringatan Pemotongan**:
  - \`「主軸回転スタート！」\` (*Shujiku kaiten sutāto!* — Putaran spindel utama mulai!)
  - \`「切削油出します！」\` (*Sessakuyu dashimasu!* — Cairan coolant dialirkan!)

### 1.3 Protokol Interaksi Wajib: Hōrensō, Anti-Inpei & Tombol Darurat
- **Larangan Keras Pemakaian Sarung Tangan Rajut (Gunte Kinshi)**:
  - DILARANG KERAS memakai sarung tangan rajut (*gunte*) saat mengoperasikan mesin bubut, bor duduk, atau frais putar. Serat sarung tangan yang terbelit putaran spindel akan menarik tangan dan menghancurkan tulang lengan (*makikomi jiko*).
- **Anti-Inpei Kerusakan Alat Pahat**: Pahat patah (*kōgu hason*) atau salah dimensi benda kerja (*sunpō furyō*) wajib dilaporkan seketika kepada Hanchō sebelum dipasang ke produk akhir (Mustaqim & Priventa 2026 [VS-31]).

---

## Bab 2: Analisis Kritis Kons & Kegagalan Hafalan Buta

### 2.1 Kegagalan Sistemik Hafalan Buta pada Sektor Permesinan
1. **Ketiadaan Pemahaman Geometri Pemotongan & Tatal (Chip Hazard)**: Menghafal kata *kiriko* (tatal sisa serutan logam) tanpa memahami bahaya tatal tajam melilit berputar; menarik tatal dengan tangan telanjang memutus urat jari. Wajib menggunakan kait penarik tatal (*kiriko kagi*).
2. **Kebutaan Pembacaan Skala Vernier & Mikrometer**: Siswa tidak bisa membaca nonius mikrometer putar (garis $0.01\text{ mm}$ dan $0.001\text{ mm}$); salah membaca skala berakibat produk masuk kategori reject (*furyōhin*).

---

## Bab 3: Pemetaan Hambatan Kognitif, Linguistik & Budaya Siswa Indonesia

### 3.1 Tiga Persona Pembelajar Indonesia
1. **Persona A (Lulusan SMK Jurusan Pemesinan / CNC)**: Sangat terbiasa dengan kode G/M dan jangka sorong, namun lemah dalam kanji instruksi perawatan harian mesin (*kyūyu, seibi*).
2. **Persona B (Ex-Magang Perakitan Manufaktur)**: Memiliki kebiasaan kerja cepat, namun kurang dalam ketelitian pengukuran presisi mikron.
3. **Persona C (Kandidat Fresh Non-Teknis LPK)**: Ragu-ragu memegang logam berat; takut terhadap cipratan cairan coolant dan suara bising pemotongan.

### 3.2 Matriks Besaran, Metrik & Satuan Pengukuran Kritis Permesinan Industri

\`\`\`
┌────────────────────────────────────────────────────────────────────────┐
│             MATRIKS PENGUKURAN & SATUAN TEKNIS MESIN INDUSTRI          │
├───────────────────────┬──────────────┬─────────────────────────────────┤
│ Parameter Operasional │ Satuan Resmi │ Nilai Standar & Tindakan Teknis │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 1. Dimensi Toleransi  │ mm / μm      │ • Toleransi umum: ±0.05 mm      │
│    Presisi Benda Kerja│              │ • Toleransi presisi: ±0.005 mm  │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 2. Kecepatan Spindel  │ RPM          │ • Putaran Spindel Bubut:        │
│    (主軸回転数)       │ (Putaran/mnt)│   500 – 3,000 RPM tergantung dia│
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 3. Kecepatan Pemakanan│ mm/min       │ • Feeding rate alat potong pahat│
│    (送り速度)         │              │   (Mencegah pahat aus/terbakar) │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 4. Torsi Pengencangan │ N·m          │ • Torsi ragum & baut pencekam   │
│    (締付トルク)       │ (Newton-m)   │   (Mencegah benda kerja terlepas│
└───────────────────────┴──────────────┴─────────────────────────────────┘
\`\`\`

---

## Bab 4: Arsitektur Kurikulum Fase 1 — Maksimalkan Peluang Lulus Ujian CBT

### 4.1 Struktur Ujian Resmi Prometric CBT JAIM Permesinan
30 butir soal teori dan analisis skenario visual pemesinan bubut, milling, finishing, dan inspeksi dimensi dalam 60 menit. Ambang kelulusan: $\ge 60\%$ (JAIM 2024 [VS-40]).

### 4.2 Dekonstruksi Jebakan Distractor Utama Permesinan
1. **Jebakan Sarung Tangan pada Mesin Putar**: Pilihan yang menyarankan memakai sarung tangan rajut agar tangan tidak kotor saat membubut adalah 100% SALAH FATAL (*makikomi*).
2. **Jebakan Menarik Tatal Logam dengan Tangan**: Pilihan membersihkan serutan tatal tajam menggunakan tangan atau tiupan mulut adalah salah; wajib memakai kuas (*burashi*) atau pengait (*kagi*).
3. **Jebakan Mengukur Saat Spindel Berputar**: Mencoba mengukur diameter benda kerja dengan jangka sorong saat mesin masih berputar adalah pelanggaran keselamatan mutlak; wajib matikan spindel hingga berhenti total.

---

## Bab 5: Arsitektur Kurikulum Fase 2 — Kesiapan Kerja Operasional Spesifik Sektor

### 5.1 Progressive SNR Audio & Onomatopoeia Taktil Pemesinan
- Melatih pendengaran instruksi di tengah deru perputaran mesin dan semprotan coolant.
- Onomatopoeia getaran dan suara alat (Doizaki et al. 2015 [VS-37]):
  - \`ビビり (bibiri)\`: Getaran abnormal pahat saat memotong $\rightarrow$ turunkan feeding rate atau kurangi over-hang pahat!
  - \`キーン (kīn)\`: Suara gesekan pahat tumpul yang aus terbakar.
  - \`カチッ (kachi')\`: Bunyi klik ratchet mikrometer saat mengunci ukuran presisi.

### 5.2 Protokol Intervensi Krisis & Kualifikasi SSW-2
- **Tombol Berhenti Darurat (Hijō Teishi Botan - 非常停止ボタン)**: Tombol jamur merah wajib ditekan tanpa ragu jika terjadi kelainan suara atau tatal tersangkut.
- **Kualifikasi Menuju SSW-2**:
  - Ujian Nasional Keterampilan Permesinan (**Kikai Kakō Ginōshi 2-kyū / 1-kyū - 機械加工技能士**) $\rightarrow$ Konversi ke **Tokutei Ginō 2-gō** (Membawa keluarga dan izin tinggal permanen).

---

## Bab 6: 4 Modalitas Latihan Otentik, Scaffolding & Taksonomi Remedial

### 6.1 Empat Modalitas Latihan Otentik
1. **Visual**: Membaca skala mikrometer dan jangka sorong dial gauge pada gambar latihan.
2. **Auditori**: Mengidentifikasi bunyi getaran pahat (*bibiri*) vs suara pemotongan normal.
3. **Skenario**: Menangani situasi benda kerja terlempar dari pencekam chuck.
4. **Prosedural**: Menghitung kecepatan putar spindel: $N = \frac{1000 \times V}{\pi \times D}$.

### 6.2 Matriks Taksonomi Remedial (4 Tipe Eror)
- **Tipe L**: Tertukar istilah *Senban* (mesin bubut) vs *Furaiban* (mesin frais/milling).
- **Tipe C**: Mengira memakai sarung tangan lebih aman di semua jenis pekerjaan.
- **Tipe M**: Salah membaca nilai 0.5 mm pada garis bawah laras mikrometer.
- **Tipe P**: Mengukur benda kerja sebelum spindel berhenti berputar.

### 6.3 Tabel Parameter Desain Kurikuler Permesinan Industri
\`\`\`
┌────────────────────────────────────────────────────────────────────────┐
│             PARAMETER DESAIN KURIKULER RESMI NUGGET NIHONGO            │
│                 SEKTOR 04: PERMESINAN INDUSTRI (MACHINERY)             │
├───────────────────────────────────┬────────────────────────────────────┤
│ Parameter Kurikulum               │ Nilai Standar Statuter             │
├───────────────────────────────────┼────────────────────────────────────┤
│ Total Jam Belajar Rekomendasi     │ 140 Jam Pelajaran (7 Minggu @20j)  │
│ Rasio Fase 1 (CBT) vs Fase 2 (K3) │ 45% CBT Ujian : 55% Operasional    │
│ Target Bank Soal Prometric CBT    │ 500 Butir Soal Teori & Visual      │
│ Rasio Latihan Audio Noise (SNR)   │ Minimal 40% (Deru Mesin Pemotong)  │
│ Kuota Wajib K3 Anti-Terbelit      │ Lulus 100% Modul Tanpa Cacat Eror  │
│ Ambang Kelulusan Simulasi Ujian   │ 80% (Di atas standar resmi 60%)    │
│ Frekuensi Review SRS FSRS         │ Target retensi 90% parameter adaptif│
└───────────────────────────────────┴────────────────────────────────────┘
\`\`\`
`;

fs.writeFileSync(path.join(targetDir, 'SSW-04-MACHINERY-PEDAGOGICAL-FOUNDATION.md'), ssw04Content, 'utf8');
console.log('Successfully written SSW-04 Machinery Foundation.');

// =========================================================================
// 4. SSW-05 ELECTRICAL & ELECTRONICS
// =========================================================================
const ssw05Content = `# Cetak Biru Pedagogis & Kurikulum Kejuruan SSW · Sektor 05: Listrik, Elektronika & Informasi (Electrical & Electronics)

> **Kode Dokumen:** \`SSW-PEDAGOGY-05-ELECTRONICS\`  
> **Versi:** 4.1.0-BIAS-FREE-FOUNDATION  
> **Sektor:** Industri Listrik, Elektronika & Informasi (Electrical, Electronics & Information / 電気電子情報関連製造業)  
> **Kementerian Pembina:** Kementerian Ekonomi, Perdagangan, dan Industri Jepang (METI / 経済産業省)  
> **Badan Pelaksana Uji:** Organisasi Penerimaan Tenaga Kerja Manufaktur Jepang (JAIM / 一般社団法人 製造業外国人材受入機構) & Prometric  
> **Status Bias Lingkungan:** 100% Ruang Bersih (Cleanroom) & Lini SMT Elektronika Presisi (*Kurīn Rūmu / Kōjō*); Bebas dari Bias Konstruksi Luar Ruangan (*Zero Genba Bias*)  
> **Sumber Kurasi Primer:**
> - \`reference-books/ssw/02_seizou_manufacturing/Manufacturing_Electronic_Equipment_Assembly_Theory_JA.pdf\` (Teori Perakitan Peralatan Elektronika & Soldering)
> - \`reference-books/ssw/02_seizou_manufacturing/Manufacturing_Printed_Wiring_Board_Theory_JA.pdf\` (Pembuatan Papan Rangkaian Tercetak / PCB)
> - \`reference-books/ssw/02_seizou_manufacturing/Manufacturing_Sample_Exam_2024_JA.pdf\` (Spesifikasi Resmi CBT Prometric 2024)
> **Landasan Teori & Riset:**
> - Needs Analysis & Technical Lexicon (Basturkmen 2006 [VS-03]; Chung & Nation 2003 [VS-10])
> - Electrostatic Discharge & Cleanroom Protocols (JNIOSH 2020 [VS-39])
> - Workplace Safety & HOU-REN-SO (Mustaqim & Priventa 2026 [VS-31]; Supriatnaningsih et al. 2024 [VS-33])
> - JAIM 17 Manufacturing Divisions Standard (JAIM 2024 [VS-40])
> - Testing Effect & Retrieval Practice (Roediger & Karpicke 2006 [TE-01])
> - Morpheme-First Kanji Chunking (Matsunaga 1999 [OD-20])

---

## Bab 1: Ekosistem Tempat Kerja & Hierarki Komunikasi Otentik

### 1.1 Struktur Cleanroom & Peran Industri (Kurīn Rūmu / SMT Lini)
Tempat kerja elektronika di Jepang adalah **Kurīn Rūmu (クリーンルーム - Cleanroom Bebas Debu)** dan lini perakitan komponen mikroskopis.
Hierarki operasional:
1. **Kurīn Rūmu Kanrisha (クリーンルーム管理者 - Manajer Pengendali Kontaminasi Partikel)**.
2. **Kensa Shuninginōsha (検査主任技能者 - Supervisor Inspeksi Mutu PCB & Solder)**.
3. **Rin Chīmu Rīdā (ラインチームリーダー - Leader Lini Perakitan)**: Memantau sistem display status lini (*Andon / 行灯*), mengatur pergantian gulungan komponen SMT (*riru kōkan*), dan mengawasi temperatur solder.
4. **Kumitate Operētā (組立オペレーター - Operator Perakitan & Pematrian Solder)**: Mengenakan pakaian anti-statis lengkap (*mushitsufuku*), gelang ground ESD (*risutobando*), menggunakan mikroskop inspeksi visual cacat solder.

### 1.2 Register Bahasa Otentik & Sinyal Status Lini (Andon)
- **Sistem Andon (行灯 - Lampu Sinyal Masalah Lini)**:
  - Hijau: Produksi normal lancar (*Seijō*).
  - Kuning: Permintaan bantuan material / ada komponen macet (*Chōsei-chū*).
  - Merah: Lini terhenti darurat karena cacat kritis (*Kōtei teishi*).
- **Pointing and Calling (Shishi Koshō - 指差呼称)**:
  - Sebelum menyentuh papan PCB: \`「アース線よし！静電気チェッカーよし！ヨシ！」\` (*Āsusen yoshi! Seidenki chekkā yoshi! Yoshi!* JNIOSH 2020 [VS-39]).

### 1.3 Protokol Interaksi Wajib: Hōrensō, Anti-Inpei & Perlindungan ESD
- **Bahaya Tersembunyi Listrik Statis (Seidenki Hakai / ESD)**: Sengatan listrik statis sekecil $100\text{ V}$ tidak terasa oleh kulit manusia, namun mampu menghancurkan gerbang semikonduktor IC secara permanen. Menyembunyikan komponen yang terjatuh ke lantai tanpa diuji ulang (*inpei*) dilarang keras (Mustaqim & Priventa 2026 [VS-31]).

---

## Bab 2: Analisis Kritis Kons & Kegagalan Hafalan Buta

### 2.1 Kegagalan Sistemik Hafalan Buta pada Sektor Elektronika
1. **Ketiadaan Pemahaman Metalurgi Solder Bebas Timbal (Lead-Free Solder)**: Menghafal kanji \`半田\` (handa - timah solder) tanpa memahami bahwa industri Jepang menggunakan timah bebas timbal (*en'yu-furī handa*) yang memiliki titik lebur lebih tinggi ($217^\circ\text{C}$) dan memerlukan kontrol suhu setrika solder ketat ($350^\circ\text{C} \pm 10^\circ\text{C}$ selama tepat 3 detik). Memanaskan terlalu lama merusak jalur tembaga PCB (*patto hakuri*).
2. **Kebutaan Orientasi Komponen Polaritas**: Salah membedakan kutub anoda/katoda pada kapasitor atau dioda saat perakitan manual; kapasitor yang terpasang terbalik akan meledak saat dialiri tegangan listrik!

---

## Bab 3: Pemetaan Hambatan Kognitif, Linguistik & Budaya Siswa Indonesia

### 3.1 Tiga Persona Pembelajar Indonesia
1. **Persona A (Lulusan SMK Jurusan Elektronika / Mekatronika)**: Menguasai kode warna resistor dan membaca skema sirkuit, namun belum terbiasa dengan protokol steril cleanroom dan istilah kimia fluks solder.
2. **Persona B (Ex-Magang Manufaktur SMT)**: Sangat terampil mengganti reel komponen di mesin mounter, namun lemah dalam ujian tertulis regulasi statuter kelistrikan.
3. **Persona C (Kandidat Fresh Non-Teknis LPK)**: Tangan gemetar saat memegang pinset mikroskopis; rentan lupa mencolokkan kabel grounding anti-statis.

### 3.2 Matriks Besaran, Metrik & Satuan Pengukuran Kritis Elektronika

\`\`\`
┌────────────────────────────────────────────────────────────────────────┐
│             MATRIKS PENGUKURAN & SATUAN TEKNIS ELEKTRONIKA             │
├───────────────────────┬──────────────┬─────────────────────────────────┤
│ Parameter Operasional │ Satuan Resmi │ Nilai Standar & Tindakan Teknis │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 1. Suhu Pematrian     │ °C           │ • Suhu ujung solder:            │
│    (半田付け温度)     │ (Derajat Cel)│   340°C – 360°C (Lead-free)     │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 2. Waktu Pematrian    │ Detik (s)    │ • Waktu kontak: ≤ 3.0 detik     │
│    (加熱時間)         │              │   (Mencegah panas merusak IC)   │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 3. Tegangan Statis ESD│ Volt (V)     │ • Potensial tubuh aman: < 100V  │
│    (静電気帯電電圧)   │              │   (Diukur di gerbang masuk air shower)
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 4. Resistansi Ground  │ Ohm (Ω)      │ • Resistansi wrist strap:       │
│    (接地抵抗値)       │ (Mega Ohm)   │   1 MΩ – 10 MΩ (Standar JIS)   │
└───────────────────────┴──────────────┴─────────────────────────────────┘
\`\`\`

---

## Bab 4: Arsitektur Kurikulum Fase 1 — Maksimalkan Peluang Lulus Ujian CBT

### 4.1 Struktur Ujian Resmi Prometric CBT JAIM Elektronika
30 soal pilihan ganda teori komponen semikonduktor, teknik soldering, skema PCB, dan inspeksi visual cacat solder dalam 60 menit. Ambang kelulusan: $\ge 60\%$ (JAIM 2024 [VS-40]).

### 4.2 Dekonstruksi Jebakan Distractor Utama Elektronika
1. **Jebakan Cacat Solder Dingin (Imo-Handa Trap)**: Pilihan yang menyebutkan permukaan solder yang kusam dan tidak melekat sempurna sebagai sambungan yang kuat adalah salah. Sambungan ideal berbentuk kurva fillet cekung mengkilap (*tsuba-kata fillet*).
2. **Jebakan Membersihkan Ujung Solder Tanpa Spons Basah**: Pilihan mengelap ujung solder pada kain kering adalah salah; wajib memakai spons basah khusus atau kawat tembaga brass.
3. **Jebakan Membuka Pakaian Cleanroom di Dalam Ruang Produksi**: Larangan keras melepas masker atau tudung rambut di dalam cleanroom untuk mencegah rontokan ketombe atau debu mencemari wafer silikon.

---

## Bab 5: Arsitektur Kurikulum Fase 2 — Kesiapan Kerja Operasional Spesifik Sektor

### 5.1 Progressive SNR Audio & Onomatopoeia Taktil Elektronika
- Audio instruksi supervisor melalui sistem speaker interkom cleanroom di tengah deru kipas filter HEPA.
- Onomatopoeia taktil dan visual:
  - \`ジュッ (ju')\`: Bunyi mendesis cairan fluks saat ujung solder menyentuh bantalan pad tembaga.
  - \`パチッ (pachi')\`: Percikan pelepasan muatan listrik statis berbahaya saat menyentuh logam tanpa ground.
  - \`ピカッ (pika')\`: Kilauan permukaan solder sempurna setelah memadat.

### 5.2 Protokol Intervensi Krisis & Kualifikasi SSW-2
- **Tali Hentikan Lini (Andon Cord Pull)**: Hak setiap operator menarik tali Andon untuk menghentikan konveyor jika mendapati komponen salah pasang (*sakugo*) sebelum melaju ke proses berikutnya.
- **Kualifikasi Menuju SSW-2**:
  - Lisensi Pekerjaan Listrik Tegangan Rendah (**Teiatsu Denki Toriatsukai Tokubetsu Kyōiku**)
  - Ujian Nasional Keterampilan Perakitan Alat Elektronika (**Denshi Kiki Kumitate Ginōshi 2-kyū / 1-kyū - 電子機器組立て技能士**) $\rightarrow$ Konversi ke **Tokutei Ginō 2-gō** (Membawa keluarga dan izin tinggal tetap).

---

## Bab 6: 4 Modalitas Latihan Otentik, Scaffolding & Taksonomi Remedial

### 6.1 Empat Modalitas Latihan Otentik
1. **Visual**: Identifikasi cacat solder pada foto mikroskopis (jembatan solder *burijji*, solder dingin *imo-handa*, lubang jarum *pinhoru*).
2. **Auditori**: Mengidentifikasi pengumuman interkom Andon cleanroom (*Rin-A teishi, buhin kire*).
3. **Skenario**: Menangani komponen chip resistor ukuran $0.4 \times 0.2\text{ mm}$ yang terbalik kutubnya.
4. **Prosedural**: Menghitung hukum Ohm: $V = I \times R$ dan daya listrik $P = V \times I$.

### 6.2 Matriks Taksonomi Remedial (4 Tipe Eror)
- **Tipe L**: Tertukar istilah *Teikō* (resistor) vs *Kondensa* (kapasitor).
- **Tipe C**: Mengira pemanasan solder lebih lama akan membuat sambungan lebih kuat.
- **Tipe M**: Salah membaca nilai gelang warna resistor (toleransi emas 5% vs perak 10%).
- **Tipe P**: Menyentuh PCB sebelum menguji kontinuitas wrist strap anti-statis.

### 6.3 Tabel Parameter Desain Kurikuler Elektronika
\`\`\`
┌────────────────────────────────────────────────────────────────────────┐
│             PARAMETER DESAIN KURIKULER RESMI NUGGET NIHONGO            │
│                 SEKTOR 05: LISTRIK & ELEKTRONIKA (ELECTRONICS)         │
├───────────────────────────────────┬────────────────────────────────────┤
│ Parameter Kurikulum               │ Nilai Standar Statuter             │
├───────────────────────────────────┼────────────────────────────────────┤
│ Total Jam Belajar Rekomendasi     │ 140 Jam Pelajaran (7 Minggu @20j)  │
│ Rasio Fase 1 (CBT) vs Fase 2 (K3) │ 45% CBT Ujian : 55% Operasional    │
│ Target Bank Soal Prometric CBT    │ 500 Butir Soal Teori & Visual      │
│ Rasio Latihan Audio Noise (SNR)   │ Minimal 35% (Deru Filter HEPA)     │
│ Kuota Wajib K3 Anti-ESD & Solder  │ Lulus 100% Modul Tanpa Cacat Eror  │
│ Ambang Kelulusan Simulasi Ujian   │ 80% (Di atas standar resmi 60%)    │
│ Frekuensi Review SRS FSRS         │ Target retensi 90% parameter adaptif│
└───────────────────────────────────┴────────────────────────────────────┘
\`\`\`
`;

fs.writeFileSync(path.join(targetDir, 'SSW-05-ELECTRONICS-PEDAGOGICAL-FOUNDATION.md'), ssw05Content, 'utf8');
console.log('Successfully written SSW-05 Electronics Foundation.');

// =========================================================================
// 5. SSW-06 AUTOMOBILE REPAIR & MAINTENANCE
// =========================================================================
const ssw06Content = `# Cetak Biru Pedagogis & Kurikulum Kejuruan SSW · Sektor 06: Perbaikan & Perawatan Mobil (Automobile Repair)

> **Kode Dokumen:** \`SSW-PEDAGOGY-06-AUTO-REPAIR\`  
> **Versi:** 4.1.0-BIAS-FREE-FOUNDATION  
> **Sektor:** Pemeliharaan & Perbaikan Kendaraan Bermotor (Automobile Maintenance / 自動車整備分野)  
> **Kementerian Pembina:** Kementerian Pertanahan, Infrastruktur, Transportasi dan Pariwisata Jepang (MLIT / 国土交通省)  
> **Badan Pelaksana Uji:** Federasi Asosiasi Perawatan Mobil Jepang (JASPA / 日本自動車整備振興会連合会) & Prometric  
> **Status Bias Lingkungan:** 100% Bengkel Resmi Uji Kelaikan Shaken & Servis Kendaraan (*Jidōsha Seibikōjō*); Bebas dari Bias Konstruksi Luar Ruangan (*Zero Genba Bias*)  
> **Sumber Kurasi Primer:**
> - \`reference-books/ssw/06_jidousha_automobile/Automobile_Mechanic_Textbook1_JA.pdf\` (Teori Dasar Mesin, Sasis, Kelistrikan & Uji Berkala Shaken)
> - \`reference-books/ssw/06_jidousha_automobile/Automobile_Mechanic_Textbook2_JA.pdf\` (Teknik Pemeliharaan Preventif & Prosedur Praktik Bengkel)
> - \`reference-books/ssw/06_jidousha_automobile/Automobile_Mechanic_Sample_Exam_JA.pdf\` (Spesifikasi Resmi CBT Prometric)
> **Landasan Teori & Riset:**
> - Needs Analysis & Technical Lexicon (Nation & Hwang 1995 [VS-09]; Chung & Nation 2003 [VS-10])
> - High-Voltage Isolation & Hydraulic Safety Protocols (JNIOSH 2020 [VS-39])
> - Cross-Cultural Communication & Anti-Inpei (Mustaqim & Priventa 2026 [VS-31]; Supriatnaningsih et al. 2024 [VS-33])
> - JASPA & MLIT Statutory Automobile Standards (JASPA & MLIT 2024 [VS-54])
> - Testing Effect & Retrieval Practice (Roediger & Karpicke 2006 [TE-01])
> - Morpheme-First Kanji Chunking (Matsunaga 1999 [OD-20])

---

## Bab 1: Ekosistem Tempat Kerja & Hierarki Komunikasi Otentik

### 1.1 Struktur Bengkel & Peran Industri (Jidōsha Seibikōjō)
Tempat kerja pemeliharaan mobil di Jepang adalah **Jidōsha Seibikōjō (自動車整備工場 - Bengkel Resmi Servis Kendaraan)** yang berlisensi dari Biro Transportasi Darat MLIT untuk inspeksi berkala (*Shaken*).
Hierarki operasional:
1. **Kōjōchō / Seibi Shuninsha (工場長 / 整備主任者 - Kepala Bengkel / Supervisor Servis Bersertifikat)**: Memeriksa lembar uji kelaikan statuter (*Shaken Kensa Kirokubo*) dan memvalidasi stempel uji keselamatan.
2. **Kōtei Rīdā (工程リーダー - Kepala Regu Mekanik)**: Mengatur alokasi kendaraan di lift hidrolik (*rifuto*), memeriksa waktu pengerjaan, dan melakukan konfirmasi ganda pengencangan baut roda.
3. **Seibishi (整備士 - Teknisi Mekanik Mobil)**: Melakukan pembongkaran rem, penggantian oli, pengukuran tegangan baterai HEV/BEV, dan uji emisi gas buang.
4. **Furonto Sutaffu (フロントスタッフ - Resepsionis Servis)**: Menerima keluhan pelanggan pemilik kendaraan (*yūzā*) dan menjelaskan rincian penggantian suku cadang.

### 1.2 Register Bahasa Otentik & Konfirmasi Ganda Pengencangan Torsi
Di bengkel mobil Jepang, kelalaian mengencangkan satu baut roda atau rem berakibat kecelakaan maut di jalan tol. Oleh karena itu, komunikasi wajib mengandalkan **Konfirmasi Ganda (Daburu Chekku - ダブルチェック)**:
- Saat mengencangkan baut roda dengan kunci momen:
  - Mekanik 1: \`「右前輪ホイールナット、トルク103ニュートン確認！カチッ！」\` (*Migi zenrin hoīrunatto, toruku hyaku-san nyūton kakunin! Kachi'!*)
  - Mekanik 2 (Leader): \`「103ニュートン、締め付けよし！ヨシ！」\` (*Hyaku-san nyūton, shimetsuke yoshi! Yoshi!* JNIOSH 2020 [VS-39]; JASPA & MLIT 2024 [VS-54]).
- Seruan peringatan menaikkan mobil di lift hidrolik:
  - \`「リフトアップします！周囲よし！足元注意！」\` (*Rifuto appu shimasu! Shūi yoshi! Ashimoto chūi!*).

### 1.3 Protokol Interaksi Wajib: Hōrensō, Kunci Pengaman Lift & Anti-Inpei
- **Larangan Memasuki Kolong Mobil Sebelum Kunci Mekanis Terpasang**:
  - DILARANG KERAS merangkak ke kolong mobil saat mobil dinaikkan lift HANYA dengan tekanan hidrolik. Wajib menurunkan lift sedikit hingga kait pengaman baja mekanis berbunyi klik (*seifutī rokku kakunin*).
- **Anti-Inpei Baut Patah / Drat Rusak**: Jika baut saluran pembuangan oli (*doren boruto*) mengalami kerusakan drat (*nejiyama tsubure*) atau baut roda dol, larangan keras menyembunyikan hal tersebut dengan lem/sealant (Mustaqim & Priventa 2026 [VS-31]).

---

## Bab 2: Analisis Kritis Kons & Kegagalan Hafalan Buta

### 2.1 Kegagalan Sistemik Hafalan Buta pada Sektor Otomotif
1. **Ketiadaan Pemahaman Bahaya Tegangan Tinggi Mobil Hybrid (HEV/BEV Danger)**: Menghafal kata *baterī* (aki) tanpa membedakan aki 12V biasa dengan baterai traksi tegangan tinggi ($200\text{V}–650\text{V}$ DC berkabel oranye) berakibat kematian akibat sengatan listrik berdaya tinggi. Wajib menggunakan sarung tangan isolasi listrik tegangan tinggi ($600\text{V}$ tahan uji) dan mencabut colokan servis (*sābisu puragu*) serta menunggu 10 menit hingga kapasitor terdiscas tuntas.
2. **Kebutaan Prosedur Pembuangan Udara Rem (Air Bleeding Trap)**: Menghafal penggantian minyak rem tanpa melakukan prosedur pembuangan gelembung udara (*kūki-nuki*) membuat pedal rem menjadi ambles lembek (*vapor lock*) dan rem blong total saat mobil melaju kencang.

---

## Bab 3: Pemetaan Hambatan Kognitif, Linguistik & Budaya Siswa Indonesia

### 3.1 Tiga Persona Pembelajar Indonesia
1. **Persona A (Lulusan SMK Otomotif / Mekanik Bengkel Motor Indonesia)**: Sangat terbiasa dengan perkakas kunci dan ganti oli, namun terbiasa menggunakan feeling perkiraan torsi tanpa kunci momen; bingung dengan sistem injeksi OBD-II scanner Jepang.
2. **Persona B (Ex-Magang Perakitan Mobil)**: Terbiasa dengan kecepatan lini pabrik, namun belum pernah melakukan pembongkaran (*overhaul*) sistem rem dan transmisi.
3. **Persona C (Kandidat Fresh Non-Teknis LPK)**: Ragu-ragu saat mengangkat roda yang berat; kesulitan membaca skala jangka sorong ketebalan piringan rem.

### 3.2 Matriks Besaran, Metrik & Satuan Pengukuran Kritis Otomotif

\`\`\`
┌────────────────────────────────────────────────────────────────────────┐
│             MATRIKS PENGUKURAN & SATUAN TEKNIS SEKTOR OTOMOTIF         │
├───────────────────────┬──────────────┬─────────────────────────────────┤
│ Parameter Operasional │ Satuan Resmi │ Nilai Standar & Tindakan Teknis │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 1. Tekanan Angin Ban  │ kPa          │ • Standar Mobil Penumpang:      │
│    (タイヤ空気圧)     │ (Kilo Pascal)│   200 kPa – 250 kPa (Dingin)    │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 2. Ketebalan Kampas   │ mm           │ • Kampas Rem Baru: ~10 mm       │
│    Rem (ブレーキパッド)│ (Milimeter)  │ • Batas Aus Minimal: ≥ 1.0 mm   │
│                       │              │   (Di bawah 2.0 mm wajib ganti!)│
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 3. Berat Jenis Aki    │ Berat Jenis  │ • Standar BJ Elektrolit:        │
│    (バッテリー電解液) │ (比重 - Hijū)│   1.260 – 1.280 pada suhu 20°C  │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 4. Torsi Baut Roda    │ N·m          │ • Baut Roda Mobil Penumpang:    │
│    (ホイールナット)   │ (Newton-m)   │   103 N·m (Sesuai manual pabrik)│
└───────────────────────┴──────────────┴─────────────────────────────────┘
\`\`\`

---

## Bab 4: Arsitektur Kurikulum Fase 1 — Maksimalkan Peluang Lulus Ujian CBT

### 4.1 Struktur Ujian Resmi Prometric CBT JASPA Otomotif
30 soal pilihan ganda teori komponen mesin bensin/diesel, rem, suspensi, kelistrikan, dan uji kelaikan Shaken dalam 60 menit. Ambang kelulusan: $\ge 60\%$ (JASPA & MLIT 2024 [VS-54]).

### 4.2 Dekonstruksi Jebakan Distractor Utama Otomotif
1. **Jebakan Pengencangan Baut Roda Berurutan Melingkar**: Pilihan mengencangkan baut roda berurutan melingkar searah jarum jam adalah SALAH; wajib mengencangkan secara **diagonal menyilang (taikakusen)** secara bertahap 2–3 kali putaran.
2. **Jebakan Membuka Tutup Radiator Panas**: Pilihan langsung membuka tutup radiator saat mesin masih panas mendidih adalah LETHAL ERROR (air mendidih menyembur membakar wajah); wajib menunggu mesin dingin total.
3. **Jebakan Mengabaikan Kunci Pengaman Lift**: Pilihan membiarkan mobil bertumpu hanya pada pompa hidrolik tanpa memasang kait pengaman baja adalah salah mutlak.

---

## Bab 5: Arsitektur Kurikulum Fase 2 — Kesiapan Kerja Operasional Spesifik Sektor

### 5.1 Progressive SNR Audio & Onomatopoeia Kerusakan Mesin
- Audio suara mesin di tengah deru kompresor udara dan suara kunci impact (*inpakuto renchi*).
- Onomatopoeia bunyi gejala kerusakan mesin:
  - \`カタカタ (kata-kata)\`: Celah katup mesin longgar (*tappet noise*).
  - \`キーキー (kī-kī)\`: Kampas rem aus bergesekan besi dengan piringan cakram rotor (*brake squeal*).
  - \`キュルキュル (kyuru-kyuru)\`: Tali kipas v-belt alternator kendor berdecit.

### 5.2 Protokol Intervensi Krisis & Kualifikasi SSW-2
- **Tangga Promosi Kualifikasi Menuju SSW-2**:
  - Lisensi Mekanik Mobil Nasional Jepang Kelas 3 (**3-kyū Jidōsha Seibishi - 3級自動車整備士**)
  - Ujian Evaluasi Tokutei Ginō 2-gō Sektor Otomotif (Setara Mekanik Kelas 2 / **2-kyū Seibishi**) $\rightarrow$ Hak tinggal tanpa batas, membawa keluarga, dan jalur menuju Permanent Resident (**Eijūken**).

---

## Bab 6: 4 Modalitas Latihan Otentik, Scaffolding & Taksonomi Remedial

### 6.1 Empat Modalitas Latihan Otentik
1. **Visual**: Identifikasi pola keausan ban abnormal (aus tepi dalam *kata-beri*, aus tengah akibat over-pressure) pada foto.
2. **Auditori**: Mengidentifikasi bunyi kelainan mesin (*kata-kata, kī-kī, kyuru-kyuru*).
3. **Skenario**: Menangani kendaraan hybrid yang indikator lampu peringatan tegangan tingginya menyala di dasbor.
4. **Prosedural**: Menghitung kompensasi suhu berat jenis aki: $S_{20} = S_t + 0.0007 \times (t - 20)$.

### 6.2 Matriks Taksonomi Remedial (4 Tipe Eror)
- **Tipe L**: Tertukar istilah *Hatsudōki* (mesin engine) vs *Hatsudenki* (alternator/generator listrik).
- **Tipe C**: Mengira mobil hybrid bisa diperbaiki kabel oranyenya tanpa sarung tangan isolasi tinggi.
- **Tipe M**: Salah membaca nilai torsi $103\text{ N}\cdot\text{m}$ menjadi $10.3\text{ N}\cdot\text{m}$ pada skala kunci torsi.
- **Tipe P**: Mengencangkan baut roda secara melingkar bukan menyilang diagonal.

### 6.3 Tabel Parameter Desain Kurikuler Otomotif
\`\`\`
┌────────────────────────────────────────────────────────────────────────┐
│             PARAMETER DESAIN KURIKULER RESMI NUGGET NIHONGO            │
│                 SEKTOR 06: PERAWATAN MOBIL (AUTO REPAIR)               │
├───────────────────────────────────┬────────────────────────────────────┤
│ Parameter Kurikulum               │ Nilai Standar Statuter             │
├───────────────────────────────────┼────────────────────────────────────┤
│ Total Jam Belajar Rekomendasi     │ 150 Jam Pelajaran (8 Minggu @20j)  │
│ Rasio Fase 1 (CBT) vs Fase 2 (K3) │ 45% CBT Ujian : 55% Operasional    │
│ Target Bank Soal Prometric CBT    │ 550 Butir Soal Teori & Visual      │
│ Rasio Latihan Audio Noise (SNR)   │ Minimal 40% (Suara Impact & Mesin) │
│ Kuota Wajib K3 Lift & HEV 650V    │ Lulus 100% Modul Tanpa Cacat Eror  │
│ Ambang Kelulusan Simulasi Ujian   │ 80% (Di atas standar resmi 60%)    │
│ Frekuensi Review SRS FSRS         │ Target retensi 90% parameter adaptif│
└───────────────────────────────────┴────────────────────────────────────┘
\`\`\`
`;

fs.writeFileSync(path.join(targetDir, 'SSW-06-AUTO-REPAIR-PEDAGOGICAL-FOUNDATION.md'), ssw06Content, 'utf8');
console.log('Successfully written SSW-06 Auto Repair Foundation.');

// =========================================================================
// 6. SSW-07 SHIPBUILDING & MARINE INDUSTRY
// =========================================================================
const ssw07Content = `# Cetak Biru Pedagogis & Kurikulum Kejuruan SSW · Sektor 07: Perkapalan & Industri Maritim (Shipbuilding)

> **Kode Dokumen:** \`SSW-PEDAGOGY-07-SHIPBUILDING\`  
> **Versi:** 4.1.0-BIAS-FREE-FOUNDATION  
> **Sektor:** Pembuatan Kapal & Permesinan Kapal (Shipbuilding & Marine Industry / 造船・舶用工業分野)  
> **Kementerian Pembina:** Kementerian Pertanahan, Infrastruktur, Transportasi dan Pariwisata Jepang (MLIT / 国土交通省)  
> **Badan Pelaksana Uji:** Biro Klasifikasi Maritim Jepang (ClassNK / 一般財団法人 日本海事協会) & Prometric  
> **Status Bias Lingkungan:** 100% Galangan Kapal Laut, Dry Dock & Pabrik Perakitan Blok Raksasa (*Zōsenjo / Dokku*); Bebas dari Bias Konstruksi Bangunan Sipil Biasa (*Zero Genba Bias*)  
> **Sumber Kurasi Primer:**
> - \`reference-books/ssw/08_zousen_shipbuilding/Shipbuilding_Welding_Theory_JA.pdf\` (Teori Pengelasan Baja Maritim CO2 MAG & Pengujian NDT)
> - \`reference-books/ssw/08_zousen_shipbuilding/Shipbuilding_Painting_Theory_JA.pdf\` (Teknik Pengecatan Anti-Karat Lambung Kapal & Airless Spray)
> - \`reference-books/ssw/08_zousen_shipbuilding/Shipbuilding_Sample_Exam_JA.pdf\` (Spesifikasi Resmi CBT Prometric)
> **Landasan Teori & Riset:**
> - Needs Analysis & Technical Lexicon (Nation & Hwang 1995 [VS-09]; Chung & Nation 2003 [VS-10])
> - Confined Space Anoxia & Atmospheric Gas Safety (JNIOSH 2020 [VS-39])
> - Geminate Acoustic Intelligibility in Shipyard Caverns (Husna & Febriyanti 2022 [EA-25])
> - ClassNK Shipbuilding & Marine Standards (ClassNK 2024 [VS-50])
> - Testing Effect & Retrieval Practice (Roediger & Karpicke 2006 [TE-01])
> - Morpheme-First Kanji Chunking (Matsunaga 1999 [OD-20])

---

## Bab 1: Ekosistem Tempat Kerja & Hierarki Komunikasi Otentik

### 1.1 Struktur Galangan Kapal & Peran Industri (Zōsenjo / Dokku)
Tempat kerja perkapalan di Jepang adalah **Zōsenjo (造船所 - Galangan Kapal Laut Raksasa)** yang mencakup dermaga kering (*kandokku*), slipway peluncuran (*funadokku*), dan ruang palka kapal tertutup (*senshitsu*).
Hierarki operasional:
1. **Zōsen Kantoku (造船監督 - Kepala Pengawas Pembangunan Kapal)**: Memastikan konstruksi lambung memenuhi standar konvensi IMO (*International Maritime Organization*) dan sertifikasi kelaikan laut ClassNK.
2. **Sanso Ketsubō / Yūgai Gasu Sagyō Shuninsha (酸素欠乏作業主任者 - Safety Supervisor Ruang Tertutup Kurang Oksigen)**: Menguji kadar atmosfer udara sebelum pekerja diizinkan memasuki lambung ganda (*daburu botomu*).
3. **Kōkaku Han-chō (船殻班長 - Kepala Regu Rangka Lambung)**: Mengatur urutan perakitan blok raksasa (*burokku tōsai*), pengelasan otomatis, dan pemotongan gas.
4. **Yōsetsu / Tosō Ginōsha (溶接・塗装技能者 - Teknisi Pengelas & Pengecat Maritim)**: Melakukan pengelasan butt joint pelat baja tebal 50 mm, pengecatan anti-fouling lambung bawah air, dan pengujian ultrasonik.

### 1.2 Register Bahasa Otentik & Aba-Aba Masuk Ruang Tertutup
Di dalam tangki lambung kapal yang bergaung dan gelap, komunikasi verbal harus singkat, lantang, dan didahului verifikasi oksigen:
- **Konfirmasi Oksigen Ruang Tertutup (Tanku Nai Kakunin)**:
  - \`「酸素濃度20.9％よし！可燃性ガスゼロよし！換気ファン稼働よし！ヨシ！」\` (*Sanso nōdo ni-jū ten kyū pāsento yoshi! Kanensei gasu zero yoshi! Kanki fan kadō yoshi! Yoshi!* JNIOSH 2020 [VS-39]; ClassNK 2024 [VS-50]).
- **Aba-Aba Crane Raksasa Galangan (Goraiasu Kurēn)**:
  - \`「ブロック吊り上げ開始！退避確認！」\` (*Burokku tsuriage kaishi! Taihi kakunin!*).

### 1.3 Protokol Intervensi Krisis & Bahaya Mati Lemas (Anoxia / Sanso Ketsubō)
- **Bahaya Ruang Lambung Kurang Oksigen (Sanso Ketsubō)**: Pelat baja tangki yang tertutup rapat selama berbulan-bulan mengalami oksidasi karat yang menyerap seluruh oksigen di udara (kadar oksigen anjlok di bawah $18\%$ hingga $10\%$). Masuk ke dalam tangki tanpa ventilasi paksa menyebabkan **kehilangan kesadaran instan dalam satu tarikan napas pertama dan kematian dalam 3 menit**!
- **Larangan Menyelamatkan Korban Tanpa Alat Bantu Napas**: Jika rekan kerja pingsan di dalam tangki lambung, DILARANG KERAS langsung melompat masuk menolong. Wajib membunyikan alarm darurat, menyalakan blower ventilasi, dan memakai tabung oksigen bertekanan (*kūki kokyūki*) sebelum evakuasi.

---

## Bab 2: Analisis Kritis Kons & Kegagalan Hafalan Buta

### 2.1 Kegagalan Sistemik Hafalan Buta pada Sektor Perkapalan
1. **Ketiadaan Pemahaman Reaksi Ledakan Gas Akumulasi (Gas Explosion Trap)**: Menghafal kanji \`溶接\` (yōsetsu - las) tanpa memahami bahwa di ruang palka tertutup, kebocoran selang gas propana/asetilen yang lebih berat dari udara akan mengendap di dasar lantai palka; menyalakan pemantik api memicu ledakan lambung yang mematikan.
2. **Kebutaan Simbol Uji Cacat Las (Non-Destructive Testing)**: Tidak memahami standar pengujian radiografi (*RT*) dan ultrasonik (*UT*); pengelasan dengan cacat rongga udara (*blowhole*) atau kurang tembus (*fusoku*) pada pelat lambung kapal tanker minyak berisiko membelah kapal di tengah samudera.

---

## Bab 3: Pemetaan Hambatan Kognitif, Linguistik & Budaya Siswa Indonesia

### 3.1 Tiga Persona Pembelajar Indonesia
1. **Persona A (Lulusan Teknik Pengelasan / Ex-Galangan Batam)**: Terbiasa dengan las CO2 dan pelat tebal, namun lemah dalam kanji regulasi maritim ClassNK.
2. **Persona B (Ex-Magang Manufaktur Sokeizai/Permesinan)**: Terbiasa dengan pabrik indoor, namun mengalami disorientasi di galangan kapal terbuka setinggi 40 meter.
3. **Persona C (Kandidat Fresh Non-Teknis LPK)**: Takut ketinggian saat naik perancah gantung lambung kapal (*funa-ashiba*); panik saat berada di lorong sempit lambung ganda.

### 3.2 Matriks Besaran, Metrik & Satuan Pengukuran Kritis Perkapalan

\`\`\`
┌────────────────────────────────────────────────────────────────────────┐
│             MATRIKS PENGUKURAN & SATUAN TEKNIS SEKTOR PERKAPALAN       │
├───────────────────────┬──────────────┬─────────────────────────────────┤
│ Parameter Operasional │ Satuan Resmi │ Nilai Standar & Tindakan Teknis │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 1. Konsentrasi        │ %            │ • Batas Aman Masuk: ≥ 18.0%     │
│    Oksigen Udara      │ (Persentase) │ • Konsentrasi Normal: 20.9%     │
│    (酸素濃度 - Sanso) │              │ • Bahaya Mati Lemas: < 18.0%    │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 2. Konsentrasi Gas    │ % LEL        │ • Ambang Batas Aman: < 10% LEL  │
│    Mudah Terbakar     │ (Batas Ledak)│   (Dilarang menyalakan api jika │
│    (可燃性ガス濃度)   │              │    melebihi batas)              │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 3. Ketebalan Pelat    │ mm           │ • Pelat Lambung Kapal:          │
│    Baja Kapal         │ (Milimeter)  │   12 mm – 50 mm (Baja Mutu JIS) │
├───────────────────────┼──────────────┼─────────────────────────────────┤
│ 4. Arus Pengelasan    │ Ampere (A)   │ • Pengelasan CO2 MAG:           │
│    (溶接電流)         │              │   200 A – 350 A (Tegangan 25-32V│
└───────────────────────┴──────────────┴─────────────────────────────────┘
\`\`\`

---

## Bab 4: Arsitektur Kurikulum Fase 1 — Maksimalkan Peluang Lulus Ujian CBT

### 4.1 Struktur Ujian Resmi Prometric CBT ClassNK Perkapalan
30 soal pilihan ganda teori pengelasan, pengecatan, perakitan struktur lambung kapal, dan K3 ruang tertutup maritim dalam 60 menit. Ambang kelulusan: $\ge 60\%$ (ClassNK 2024 [VS-50]).

### 4.2 Dekonstruksi Jebakan Distractor Utama Perkapalan
1. **Jebakan Masuk Tangki Tanpa Uji Gas**: Pilihan yang menyebutkan masuk ke tangki tertutup cukup dengan mengintip atau mencium baunya adalah LETHAL ERROR (gas anoksia tidak berbau); wajib uji dengan gas detector 3 titik (atas, tengah, bawah).
2. **Jebakan Mengelas Dekat Kaleng Cat**: Melakukan pekerjaan api terbuka (*hi-ki shiyō*) di dekat area aplikasi cat anti-karat airless spray berpelarut tiner mudah terbakar adalah pelanggaran mutlak.
3. **Jebakan Penggunaan Selang Gas Rusak**: Memakai selang gas oksigen/asetilen yang retak-retak getas adalah jawaban salah pada soal CBT.

---

## Bab 5: Arsitektur Kurikulum Fase 2 — Kesiapan Kerja Operasional Spesifik Sektor

### 5.1 Progressive SNR Audio & Onomatopoeia Galangan Kapal
- Audio seruan kerja di dalam rongga lambung baja yang bergema dengan kebisingan palu chipping dan desis las (Husna & Febriyanti 2022 [EA-25]).
- Onomatopoeia maritim:
  - \`バチバチ (bachi-bachi)\`: Busur nyala las CO2 stabil memercik spatter terkontrol.
  - \`ゴー (gō)\`: Deru blower ventilasi sirkulasi udara palka lambung kapal.
  - \`カンカン (kankan)\`: Suara palu pembersih kerak terak las (*chipping hammer*).

### 5.2 Protokol Intervensi Krisis & Kualifikasi SSW-2
- **Tangga Promosi Kualifikasi Menuju SSW-2**:
  - Lisensi Uji Oksigen & Gas Beracun (**Sanso Ketsubō / Ryūkasuiso Kiken Sagyō Shuninsha**)
  - Sertifikasi Juru Las Maritim Nasional ClassNK (**ClassNK Yōsetsu Ginō Kentei A-2F / A-2V / A-2H**)
  - Ujian Pengukuran Keterampilan Tokutei Ginō 2-gō Perkapalan $\rightarrow$ Visa **Tokutei Ginō 2-gō** (Izin tinggal permanen tanpa batas waktu, membawa keluarga).

---

## Bab 6: 4 Modalitas Latihan Otentik, Scaffolding & Taksonomi Remedial

### 6.1 Empat Modalitas Latihan Otentik
1. **Visual**: Identifikasi cacat las pada foto sinar X radiografi (retak *kurakku*, kurang tembus *yōkomi furyō*, terak terperangkap *suragu makikomi*).
2. **Auditori**: Mengidentifikasi aba-aba darurat evakuasi palka di tengah gaung pelat baja kapal (*Senshitsu taihi!*).
3. **Skenario**: Menangani pembacaan gas detector yang menunjukkan kadar oksigen turun ke $17.5\%$.
4. **Prosedural**: Menghitung volume sirkulasi blower ventilasi: volume tangki $100\text{ m}^3$ dengan blower $20\text{ m}^3/\text{menit} \rightarrow$ ventilasi minimal 15 menit sebelum masuk.

### 6.2 Matriks Taksonomi Remedial (4 Tipe Eror)
- **Tipe L**: Tertukar istilah *Funazoko* (dasar lambung kapal) vs *Funa-beri* (tepi lambung atas).
- **Tipe C**: Mengira udara di ruang palka tertutup aman jika tidak berbau busuk.
- **Tipe M**: Salah membaca nilai 18.0% pada layar digital gas detector.
- **Tipe P**: Menyalakan api las sebelum memeriksa ada/tidaknya sisa kaleng cat tiner di sekitar lokasi.

### 6.3 Tabel Parameter Desain Kurikuler Perkapalan
\`\`\`
┌────────────────────────────────────────────────────────────────────────┐
│             PARAMETER DESAIN KURIKULER RESMI NUGGET NIHONGO            │
│                 SEKTOR 07: PERKAPALAN & MARITIM (SHIPBUILDING)         │
├───────────────────────────────────┬────────────────────────────────────┤
│ Parameter Kurikulum               │ Nilai Standar Statuter             │
├───────────────────────────────────┼────────────────────────────────────┤
│ Total Jam Belajar Rekomendasi     │ 150 Jam Pelajaran (8 Minggu @20j)  │
│ Rasio Fase 1 (CBT) vs Fase 2 (K3) │ 40% CBT Ujian : 60% Operasional    │
│ Target Bank Soal Prometric CBT    │ 550 Butir Soal Teori & Visual      │
│ Rasio Latihan Audio Noise (SNR)   │ Minimal 45% (Gaung Lambung Baja)   │
│ Kuota Wajib K3 Ruang Anoksia O2   │ Lulus 100% Modul Tanpa Cacat Eror  │
│ Ambang Kelulusan Simulasi Ujian   │ 80% (Di atas standar resmi 60%)    │
│ Frekuensi Review SRS FSRS         │ Target retensi 90% parameter adaptif│
└───────────────────────────────────┴────────────────────────────────────┘
\`\`\`
`;

fs.writeFileSync(path.join(targetDir, 'SSW-07-SHIPBUILDING-PEDAGOGICAL-FOUNDATION.md'), ssw07Content, 'utf8');
console.log('Successfully written SSW-07 Shipbuilding Foundation.');
console.log('=== Batch 2 Foundations Generation Completed Successfully ===');
