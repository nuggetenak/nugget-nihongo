# Cetak Biru Pedagogis & Kurikulum Kejuruan SSW · Sektor 06: Perbaikan & Perawatan Mobil (Automobile Repair)

> **Kode Dokumen:** `SSW-PEDAGOGY-06-AUTO-REPAIR`  
> **Versi:** 4.1.0-BIAS-FREE-FOUNDATION  
> **Sektor:** Pemeliharaan & Perbaikan Kendaraan Bermotor (Automobile Maintenance / 自動車整備分野)  
> **Kementerian Pembina:** Kementerian Pertanahan, Infrastruktur, Transportasi dan Pariwisata Jepang (MLIT / 国土交通省)  
> **Badan Pelaksana Uji:** Federasi Asosiasi Perawatan Mobil Jepang (JASPA / 日本自動車整備振興会連合会) & Prometric  
> **Status Bias Lingkungan:** 100% Bengkel Resmi Uji Kelaikan Shaken & Servis Kendaraan (*Jidōsha Seibikōjō*); Bebas dari Bias Konstruksi Luar Ruangan (*Zero Genba Bias*)  
> **Sumber Kurasi Primer:**
> - `reference-books/ssw/06_jidousha_automobile/Automobile_Mechanic_Textbook1_JA.pdf` (Teori Dasar Mesin, Sasis, Kelistrikan & Uji Berkala Shaken)
> - `reference-books/ssw/06_jidousha_automobile/Automobile_Mechanic_Textbook2_JA.pdf` (Teknik Pemeliharaan Preventif & Prosedur Praktik Bengkel)
> - `reference-books/ssw/06_jidousha_automobile/Automobile_Mechanic_Sample_Exam_JA.pdf` (Spesifikasi Resmi CBT Prometric)
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
  - Mekanik 1: `「右前輪ホイールナット、トルク103ニュートン確認！カチッ！」` (*Migi zenrin hoīrunatto, toruku hyaku-san nyūton kakunin! Kachi'!*)
  - Mekanik 2 (Leader): `「103ニュートン、締め付けよし！ヨシ！」` (*Hyaku-san nyūton, shimetsuke yoshi! Yoshi!* JNIOSH 2020 [VS-39]; JASPA & MLIT 2024 [VS-54]).
- Seruan peringatan menaikkan mobil di lift hidrolik:
  - `「リフトアップします！周囲よし！足元注意！」` (*Rifuto appu shimasu! Shūi yoshi! Ashimoto chūi!*).

### 1.3 Protokol Interaksi Wajib: Hōrensō, Kunci Pengaman Lift & Anti-Inpei
- **Larangan Memasuki Kolong Mobil Sebelum Kunci Mekanis Terpasang**:
  - DILARANG KERAS merangkak ke kolong mobil saat mobil dinaikkan lift HANYA dengan tekanan hidrolik. Wajib menurunkan lift sedikit hingga kait pengaman baja mekanis berbunyi klik (*seifutī rokku kakunin*).
- **Anti-Inpei Baut Patah / Drat Rusak**: Jika baut saluran pembuangan oli (*doren boruto*) mengalami kerusakan drat (*nejiyama tsubure*) atau baut roda dol, larangan keras menyembunyikan hal tersebut dengan lem/sealant (Mustaqim & Priventa 2026 [VS-31]).

---

## Bab 2: Analisis Kritis Kons & Kegagalan Hafalan Buta

### 2.1 Kegagalan Sistemik Hafalan Buta pada Sektor Otomotif
1. **Ketiadaan Pemahaman Bahaya Tegangan Tinggi Mobil Hybrid (HEV/BEV Danger)**: Menghafal kata *baterī* (aki) tanpa membedakan aki 12V biasa dengan baterai traksi tegangan tinggi ($200	ext{V}–650	ext{V}$ DC berkabel oranye) berakibat kematian akibat sengatan listrik berdaya tinggi. Wajib menggunakan sarung tangan isolasi listrik tegangan tinggi ($600	ext{V}$ tahan uji) dan mencabut colokan servis (*sābisu puragu*) serta menunggu 10 menit hingga kapasitor terdiscas tuntas.
2. **Kebutaan Prosedur Pembuangan Udara Rem (Air Bleeding Trap)**: Menghafal penggantian minyak rem tanpa melakukan prosedur pembuangan gelembung udara (*kūki-nuki*) membuat pedal rem menjadi ambles lembek (*vapor lock*) dan rem blong total saat mobil melaju kencang.

---

## Bab 3: Pemetaan Hambatan Kognitif, Linguistik & Budaya Siswa Indonesia

### 3.1 Tiga Persona Pembelajar Indonesia
1. **Persona A (Lulusan SMK Otomotif / Mekanik Bengkel Motor Indonesia)**: Sangat terbiasa dengan perkakas kunci dan ganti oli, namun terbiasa menggunakan feeling perkiraan torsi tanpa kunci momen; bingung dengan sistem injeksi OBD-II scanner Jepang.
2. **Persona B (Ex-Magang Perakitan Mobil)**: Terbiasa dengan kecepatan lini pabrik, namun belum pernah melakukan pembongkaran (*overhaul*) sistem rem dan transmisi.
3. **Persona C (Kandidat Fresh Non-Teknis LPK)**: Ragu-ragu saat mengangkat roda yang berat; kesulitan membaca skala jangka sorong ketebalan piringan rem.

### 3.2 Matriks Besaran, Metrik & Satuan Pengukuran Kritis Otomotif

```
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
```

---

## Bab 4: Arsitektur Kurikulum Fase 1 — Maksimalkan Peluang Lulus Ujian CBT

### 4.1 Struktur Ujian Resmi Prometric CBT JASPA Otomotif
30 soal pilihan ganda teori komponen mesin bensin/diesel, rem, suspensi, kelistrikan, dan uji kelaikan Shaken dalam 60 menit. Ambang kelulusan: $ge 60%$ (JASPA & MLIT 2024 [VS-54]).

### 4.2 Dekonstruksi Jebakan Distractor Utama Otomotif
1. **Jebakan Pengencangan Baut Roda Berurutan Melingkar**: Pilihan mengencangkan baut roda berurutan melingkar searah jarum jam adalah SALAH; wajib mengencangkan secara **diagonal menyilang (taikakusen)** secara bertahap 2–3 kali putaran.
2. **Jebakan Membuka Tutup Radiator Panas**: Pilihan langsung membuka tutup radiator saat mesin masih panas mendidih adalah LETHAL ERROR (air mendidih menyembur membakar wajah); wajib menunggu mesin dingin total.
3. **Jebakan Mengabaikan Kunci Pengaman Lift**: Pilihan membiarkan mobil bertumpu hanya pada pompa hidrolik tanpa memasang kait pengaman baja adalah salah mutlak.

---

## Bab 5: Arsitektur Kurikulum Fase 2 — Kesiapan Kerja Operasional Spesifik Sektor

### 5.1 Progressive SNR Audio & Onomatopoeia Kerusakan Mesin
- Audio suara mesin di tengah deru kompresor udara dan suara kunci impact (*inpakuto renchi*).
- Onomatopoeia bunyi gejala kerusakan mesin:
  - `カタカタ (kata-kata)`: Celah katup mesin longgar (*tappet noise*).
  - `キーキー (kī-kī)`: Kampas rem aus bergesekan besi dengan piringan cakram rotor (*brake squeal*).
  - `キュルキュル (kyuru-kyuru)`: Tali kipas v-belt alternator kendor berdecit.

### 5.2 Protokol Intervensi Krisis & Kualifikasi SSW-2
- **Tangga Promosi Kualifikasi Menuju SSW-2**:
  - Lisensi Mekanik Mobil Nasional Jepang Kelas 3 (**3-kyū Jidōsha Seibishi - 3級自動車整備士**)
  - Ujian Evaluasi Tokutei Ginō 2-gō Sektor Otomotif (Setara Mekanik Kelas 2 / **2-kyū Seibishi**) $ightarrow$ Hak tinggal tanpa batas, membawa keluarga, dan jalur menuju Permanent Resident (**Eijūken**).

---

## Bab 6: 4 Modalitas Latihan Otentik, Scaffolding & Taksonomi Remedial

### 6.1 Empat Modalitas Latihan Otentik
1. **Visual**: Identifikasi pola keausan ban abnormal (aus tepi dalam *kata-beri*, aus tengah akibat over-pressure) pada foto.
2. **Auditori**: Mengidentifikasi bunyi kelainan mesin (*kata-kata, kī-kī, kyuru-kyuru*).
3. **Skenario**: Menangani kendaraan hybrid yang indikator lampu peringatan tegangan tingginya menyala di dasbor.
4. **Prosedural**: Menghitung kompensasi suhu berat jenis aki: $S_{20} = S_t + 0.0007 	imes (t - 20)$.

### 6.2 Matriks Taksonomi Remedial (4 Tipe Eror)
- **Tipe L**: Tertukar istilah *Hatsudōki* (mesin engine) vs *Hatsudenki* (alternator/generator listrik).
- **Tipe C**: Mengira mobil hybrid bisa diperbaiki kabel oranyenya tanpa sarung tangan isolasi tinggi.
- **Tipe M**: Salah membaca nilai torsi $103	ext{ N}cdot	ext{m}$ menjadi $10.3	ext{ N}cdot	ext{m}$ pada skala kunci torsi.
- **Tipe P**: Mengencangkan baut roda secara melingkar bukan menyilang diagonal.

### 6.3 Tabel Parameter Desain Kurikuler Otomotif
```
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
```
