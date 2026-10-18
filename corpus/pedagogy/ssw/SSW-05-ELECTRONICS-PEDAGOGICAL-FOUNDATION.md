# Cetak Biru Pedagogis & Kurikulum Kejuruan SSW · Sektor 05: Listrik, Elektronika & Informasi (Electrical & Electronics)

> **Kode Dokumen:** `SSW-PEDAGOGY-05-ELECTRONICS`  
> **Versi:** 4.1.0-BIAS-FREE-FOUNDATION  
> **Sektor:** Industri Listrik, Elektronika & Informasi (Electrical, Electronics & Information / 電気電子情報関連製造業)  
> **Kementerian Pembina:** Kementerian Ekonomi, Perdagangan, dan Industri Jepang (METI / 経済産業省)  
> **Badan Pelaksana Uji:** Organisasi Penerimaan Tenaga Kerja Manufaktur Jepang (JAIM / 一般社団法人 製造業外国人材受入機構) & Prometric  
> **Status Bias Lingkungan:** 100% Ruang Bersih (Cleanroom) & Lini SMT Elektronika Presisi (*Kurīn Rūmu / Kōjō*); Bebas dari Bias Konstruksi Luar Ruangan (*Zero Genba Bias*)  
> **Sumber Kurasi Primer:**
> - `reference-books/ssw/02_seizou_manufacturing/Manufacturing_Electronic_Equipment_Assembly_Theory_JA.pdf` (Teori Perakitan Peralatan Elektronika & Soldering)
> - `reference-books/ssw/02_seizou_manufacturing/Manufacturing_Printed_Wiring_Board_Theory_JA.pdf` (Pembuatan Papan Rangkaian Tercetak / PCB)
> - `reference-books/ssw/02_seizou_manufacturing/Manufacturing_Sample_Exam_2024_JA.pdf` (Spesifikasi Resmi CBT Prometric 2024)
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
  - Sebelum menyentuh papan PCB: `「アース線よし！静電気チェッカーよし！ヨシ！」` (*Āsusen yoshi! Seidenki chekkā yoshi! Yoshi!* JNIOSH 2020 [VS-39]).

### 1.3 Protokol Interaksi Wajib: Hōrensō, Anti-Inpei & Perlindungan ESD
- **Bahaya Tersembunyi Listrik Statis (Seidenki Hakai / ESD)**: Sengatan listrik statis sekecil $100	ext{ V}$ tidak terasa oleh kulit manusia, namun mampu menghancurkan gerbang semikonduktor IC secara permanen. Menyembunyikan komponen yang terjatuh ke lantai tanpa diuji ulang (*inpei*) dilarang keras (Mustaqim & Priventa 2026 [VS-31]).

---

## Bab 2: Analisis Kritis Kons & Kegagalan Hafalan Buta

### 2.1 Kegagalan Sistemik Hafalan Buta pada Sektor Elektronika
1. **Ketiadaan Pemahaman Metalurgi Solder Bebas Timbal (Lead-Free Solder)**: Menghafal kanji `半田` (handa - timah solder) tanpa memahami bahwa industri Jepang menggunakan timah bebas timbal (*en'yu-furī handa*) yang memiliki titik lebur lebih tinggi ($217^circ	ext{C}$) dan memerlukan kontrol suhu setrika solder ketat ($350^circ	ext{C} pm 10^circ	ext{C}$ selama tepat 3 detik). Memanaskan terlalu lama merusak jalur tembaga PCB (*patto hakuri*).
2. **Kebutaan Orientasi Komponen Polaritas**: Salah membedakan kutub anoda/katoda pada kapasitor atau dioda saat perakitan manual; kapasitor yang terpasang terbalik akan meledak saat dialiri tegangan listrik!

---

## Bab 3: Pemetaan Hambatan Kognitif, Linguistik & Budaya Siswa Indonesia

### 3.1 Tiga Persona Pembelajar Indonesia
1. **Persona A (Lulusan SMK Jurusan Elektronika / Mekatronika)**: Menguasai kode warna resistor dan membaca skema sirkuit, namun belum terbiasa dengan protokol steril cleanroom dan istilah kimia fluks solder.
2. **Persona B (Ex-Magang Manufaktur SMT)**: Sangat terampil mengganti reel komponen di mesin mounter, namun lemah dalam ujian tertulis regulasi statuter kelistrikan.
3. **Persona C (Kandidat Fresh Non-Teknis LPK)**: Tangan gemetar saat memegang pinset mikroskopis; rentan lupa mencolokkan kabel grounding anti-statis.

### 3.2 Matriks Besaran, Metrik & Satuan Pengukuran Kritis Elektronika

```
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
```

---

## Bab 4: Arsitektur Kurikulum Fase 1 — Maksimalkan Peluang Lulus Ujian CBT

### 4.1 Struktur Ujian Resmi Prometric CBT JAIM Elektronika
30 soal pilihan ganda teori komponen semikonduktor, teknik soldering, skema PCB, dan inspeksi visual cacat solder dalam 60 menit. Ambang kelulusan: $ge 60%$ (JAIM 2024 [VS-40]).

### 4.2 Dekonstruksi Jebakan Distractor Utama Elektronika
1. **Jebakan Cacat Solder Dingin (Imo-Handa Trap)**: Pilihan yang menyebutkan permukaan solder yang kusam dan tidak melekat sempurna sebagai sambungan yang kuat adalah salah. Sambungan ideal berbentuk kurva fillet cekung mengkilap (*tsuba-kata fillet*).
2. **Jebakan Membersihkan Ujung Solder Tanpa Spons Basah**: Pilihan mengelap ujung solder pada kain kering adalah salah; wajib memakai spons basah khusus atau kawat tembaga brass.
3. **Jebakan Membuka Pakaian Cleanroom di Dalam Ruang Produksi**: Larangan keras melepas masker atau tudung rambut di dalam cleanroom untuk mencegah rontokan ketombe atau debu mencemari wafer silikon.

---

## Bab 5: Arsitektur Kurikulum Fase 2 — Kesiapan Kerja Operasional Spesifik Sektor

### 5.1 Progressive SNR Audio & Onomatopoeia Taktil Elektronika
- Audio instruksi supervisor melalui sistem speaker interkom cleanroom di tengah deru kipas filter HEPA.
- Onomatopoeia taktil dan visual:
  - `ジュッ (ju')`: Bunyi mendesis cairan fluks saat ujung solder menyentuh bantalan pad tembaga.
  - `パチッ (pachi')`: Percikan pelepasan muatan listrik statis berbahaya saat menyentuh logam tanpa ground.
  - `ピカッ (pika')`: Kilauan permukaan solder sempurna setelah memadat.

### 5.2 Protokol Intervensi Krisis & Kualifikasi SSW-2
- **Tali Hentikan Lini (Andon Cord Pull)**: Hak setiap operator menarik tali Andon untuk menghentikan konveyor jika mendapati komponen salah pasang (*sakugo*) sebelum melaju ke proses berikutnya.
- **Kualifikasi Menuju SSW-2**:
  - Lisensi Pekerjaan Listrik Tegangan Rendah (**Teiatsu Denki Toriatsukai Tokubetsu Kyōiku**)
  - Ujian Nasional Keterampilan Perakitan Alat Elektronika (**Denshi Kiki Kumitate Ginōshi 2-kyū / 1-kyū - 電子機器組立て技能士**) $ightarrow$ Konversi ke **Tokutei Ginō 2-gō** (Membawa keluarga dan izin tinggal tetap).

---

## Bab 6: 4 Modalitas Latihan Otentik, Scaffolding & Taksonomi Remedial

### 6.1 Empat Modalitas Latihan Otentik
1. **Visual**: Identifikasi cacat solder pada foto mikroskopis (jembatan solder *burijji*, solder dingin *imo-handa*, lubang jarum *pinhoru*).
2. **Auditori**: Mengidentifikasi pengumuman interkom Andon cleanroom (*Rin-A teishi, buhin kire*).
3. **Skenario**: Menangani komponen chip resistor ukuran $0.4 	imes 0.2	ext{ mm}$ yang terbalik kutubnya.
4. **Prosedural**: Menghitung hukum Ohm: $V = I 	imes R$ dan daya listrik $P = V 	imes I$.

### 6.2 Matriks Taksonomi Remedial (4 Tipe Eror)
- **Tipe L**: Tertukar istilah *Teikō* (resistor) vs *Kondensa* (kapasitor).
- **Tipe C**: Mengira pemanasan solder lebih lama akan membuat sambungan lebih kuat.
- **Tipe M**: Salah membaca nilai gelang warna resistor (toleransi emas 5% vs perak 10%).
- **Tipe P**: Menyentuh PCB sebelum menguji kontinuitas wrist strap anti-statis.

### 6.3 Tabel Parameter Desain Kurikuler Elektronika
```
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
```
