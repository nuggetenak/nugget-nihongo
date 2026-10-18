# Cetak Biru Pedagogis & Kurikulum Kejuruan SSW · Sektor 07: Perkapalan & Industri Maritim (Shipbuilding)

> **Kode Dokumen:** `SSW-PEDAGOGY-07-SHIPBUILDING`  
> **Versi:** 4.1.0-BIAS-FREE-FOUNDATION  
> **Sektor:** Pembuatan Kapal & Permesinan Kapal (Shipbuilding & Marine Industry / 造船・舶用工業分野)  
> **Kementerian Pembina:** Kementerian Pertanahan, Infrastruktur, Transportasi dan Pariwisata Jepang (MLIT / 国土交通省)  
> **Badan Pelaksana Uji:** Biro Klasifikasi Maritim Jepang (ClassNK / 一般財団法人 日本海事協会) & Prometric  
> **Status Bias Lingkungan:** 100% Galangan Kapal Laut, Dry Dock & Pabrik Perakitan Blok Raksasa (*Zōsenjo / Dokku*); Bebas dari Bias Konstruksi Bangunan Sipil Biasa (*Zero Genba Bias*)  
> **Sumber Kurasi Primer:**
> - `reference-books/ssw/08_zousen_shipbuilding/Shipbuilding_Welding_Theory_JA.pdf` (Teori Pengelasan Baja Maritim CO2 MAG & Pengujian NDT)
> - `reference-books/ssw/08_zousen_shipbuilding/Shipbuilding_Painting_Theory_JA.pdf` (Teknik Pengecatan Anti-Karat Lambung Kapal & Airless Spray)
> - `reference-books/ssw/08_zousen_shipbuilding/Shipbuilding_Sample_Exam_JA.pdf` (Spesifikasi Resmi CBT Prometric)
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
  - `「酸素濃度20.9％よし！可燃性ガスゼロよし！換気ファン稼働よし！ヨシ！」` (*Sanso nōdo ni-jū ten kyū pāsento yoshi! Kanensei gasu zero yoshi! Kanki fan kadō yoshi! Yoshi!* JNIOSH 2020 [VS-39]; ClassNK 2024 [VS-50]).
- **Aba-Aba Crane Raksasa Galangan (Goraiasu Kurēn)**:
  - `「ブロック吊り上げ開始！退避確認！」` (*Burokku tsuriage kaishi! Taihi kakunin!*).

### 1.3 Protokol Intervensi Krisis & Bahaya Mati Lemas (Anoxia / Sanso Ketsubō)
- **Bahaya Ruang Lambung Kurang Oksigen (Sanso Ketsubō)**: Pelat baja tangki yang tertutup rapat selama berbulan-bulan mengalami oksidasi karat yang menyerap seluruh oksigen di udara (kadar oksigen anjlok di bawah $18%$ hingga $10%$). Masuk ke dalam tangki tanpa ventilasi paksa menyebabkan **kehilangan kesadaran instan dalam satu tarikan napas pertama dan kematian dalam 3 menit**!
- **Larangan Menyelamatkan Korban Tanpa Alat Bantu Napas**: Jika rekan kerja pingsan di dalam tangki lambung, DILARANG KERAS langsung melompat masuk menolong. Wajib membunyikan alarm darurat, menyalakan blower ventilasi, dan memakai tabung oksigen bertekanan (*kūki kokyūki*) sebelum evakuasi.

---

## Bab 2: Analisis Kritis Kons & Kegagalan Hafalan Buta

### 2.1 Kegagalan Sistemik Hafalan Buta pada Sektor Perkapalan
1. **Ketiadaan Pemahaman Reaksi Ledakan Gas Akumulasi (Gas Explosion Trap)**: Menghafal kanji `溶接` (yōsetsu - las) tanpa memahami bahwa di ruang palka tertutup, kebocoran selang gas propana/asetilen yang lebih berat dari udara akan mengendap di dasar lantai palka; menyalakan pemantik api memicu ledakan lambung yang mematikan.
2. **Kebutaan Simbol Uji Cacat Las (Non-Destructive Testing)**: Tidak memahami standar pengujian radiografi (*RT*) dan ultrasonik (*UT*); pengelasan dengan cacat rongga udara (*blowhole*) atau kurang tembus (*fusoku*) pada pelat lambung kapal tanker minyak berisiko membelah kapal di tengah samudera.

---

## Bab 3: Pemetaan Hambatan Kognitif, Linguistik & Budaya Siswa Indonesia

### 3.1 Tiga Persona Pembelajar Indonesia
1. **Persona A (Lulusan Teknik Pengelasan / Ex-Galangan Batam)**: Terbiasa dengan las CO2 dan pelat tebal, namun lemah dalam kanji regulasi maritim ClassNK.
2. **Persona B (Ex-Magang Manufaktur Sokeizai/Permesinan)**: Terbiasa dengan pabrik indoor, namun mengalami disorientasi di galangan kapal terbuka setinggi 40 meter.
3. **Persona C (Kandidat Fresh Non-Teknis LPK)**: Takut ketinggian saat naik perancah gantung lambung kapal (*funa-ashiba*); panik saat berada di lorong sempit lambung ganda.

### 3.2 Matriks Besaran, Metrik & Satuan Pengukuran Kritis Perkapalan

```
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
```

---

## Bab 4: Arsitektur Kurikulum Fase 1 — Maksimalkan Peluang Lulus Ujian CBT

### 4.1 Struktur Ujian Resmi Prometric CBT ClassNK Perkapalan
30 soal pilihan ganda teori pengelasan, pengecatan, perakitan struktur lambung kapal, dan K3 ruang tertutup maritim dalam 60 menit. Ambang kelulusan: $ge 60%$ (ClassNK 2024 [VS-50]).

### 4.2 Dekonstruksi Jebakan Distractor Utama Perkapalan
1. **Jebakan Masuk Tangki Tanpa Uji Gas**: Pilihan yang menyebutkan masuk ke tangki tertutup cukup dengan mengintip atau mencium baunya adalah LETHAL ERROR (gas anoksia tidak berbau); wajib uji dengan gas detector 3 titik (atas, tengah, bawah).
2. **Jebakan Mengelas Dekat Kaleng Cat**: Melakukan pekerjaan api terbuka (*hi-ki shiyō*) di dekat area aplikasi cat anti-karat airless spray berpelarut tiner mudah terbakar adalah pelanggaran mutlak.
3. **Jebakan Penggunaan Selang Gas Rusak**: Memakai selang gas oksigen/asetilen yang retak-retak getas adalah jawaban salah pada soal CBT.

---

## Bab 5: Arsitektur Kurikulum Fase 2 — Kesiapan Kerja Operasional Spesifik Sektor

### 5.1 Progressive SNR Audio & Onomatopoeia Galangan Kapal
- Audio seruan kerja di dalam rongga lambung baja yang bergema dengan kebisingan palu chipping dan desis las (Husna & Febriyanti 2022 [EA-25]).
- Onomatopoeia maritim:
  - `バチバチ (bachi-bachi)`: Busur nyala las CO2 stabil memercik spatter terkontrol.
  - `ゴー (gō)`: Deru blower ventilasi sirkulasi udara palka lambung kapal.
  - `カンカン (kankan)`: Suara palu pembersih kerak terak las (*chipping hammer*).

### 5.2 Protokol Intervensi Krisis & Kualifikasi SSW-2
- **Tangga Promosi Kualifikasi Menuju SSW-2**:
  - Lisensi Uji Oksigen & Gas Beracun (**Sanso Ketsubō / Ryūkasuiso Kiken Sagyō Shuninsha**)
  - Sertifikasi Juru Las Maritim Nasional ClassNK (**ClassNK Yōsetsu Ginō Kentei A-2F / A-2V / A-2H**)
  - Ujian Pengukuran Keterampilan Tokutei Ginō 2-gō Perkapalan $ightarrow$ Visa **Tokutei Ginō 2-gō** (Izin tinggal permanen tanpa batas waktu, membawa keluarga).

---

## Bab 6: 4 Modalitas Latihan Otentik, Scaffolding & Taksonomi Remedial

### 6.1 Empat Modalitas Latihan Otentik
1. **Visual**: Identifikasi cacat las pada foto sinar X radiografi (retak *kurakku*, kurang tembus *yōkomi furyō*, terak terperangkap *suragu makikomi*).
2. **Auditori**: Mengidentifikasi aba-aba darurat evakuasi palka di tengah gaung pelat baja kapal (*Senshitsu taihi!*).
3. **Skenario**: Menangani pembacaan gas detector yang menunjukkan kadar oksigen turun ke $17.5%$.
4. **Prosedural**: Menghitung volume sirkulasi blower ventilasi: volume tangki $100	ext{ m}^3$ dengan blower $20	ext{ m}^3/	ext{menit} ightarrow$ ventilasi minimal 15 menit sebelum masuk.

### 6.2 Matriks Taksonomi Remedial (4 Tipe Eror)
- **Tipe L**: Tertukar istilah *Funazoko* (dasar lambung kapal) vs *Funa-beri* (tepi lambung atas).
- **Tipe C**: Mengira udara di ruang palka tertutup aman jika tidak berbau busuk.
- **Tipe M**: Salah membaca nilai 18.0% pada layar digital gas detector.
- **Tipe P**: Menyalakan api las sebelum memeriksa ada/tidaknya sisa kaleng cat tiner di sekitar lokasi.

### 6.3 Tabel Parameter Desain Kurikuler Perkapalan
```
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
```
