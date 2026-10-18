# Cetak Biru Pedagogis & Kurikulum Kejuruan SSW · Sektor 19: Operasional & Pemeliharaan Perkeretaapian (Railway)

> **Kode Dokumen:** `SSW-PEDAGOGY-19-RAILWAY`  
> **Versi:** 4.1.0-BIAS-FREE-FOUNDATION  
> **Sektor:** Industri Perkeretaapian (Railway Operations / 鉄道業分野 - 線路保全・電気・車両)  
> **Kementerian Pembina:** Kementerian Pertanahan, Infrastruktur, Transportasi dan Pariwisata Jepang (MLIT / 国土交通省)  
> **Badan Pelaksana Uji:** Biro Perkeretaapian MLIT & Asosiasi Operasional Kereta Api Jepang (JTOA)  
> **Status Bias Lingkungan:** 100% Jalur Rel Komuter Aktif, Gardu Traksi Listrik Aliran Atas & Dipo Shinkansen (*Kisen / Eki / Shasoko*); Bebas Total dari Bias Konstruksi Gedung Sipil (*Zero Genba Bias*)  
> **Sumber Kurasi Primer:**
> - `reference-books/ssw/15_tetsudou_railway/Railway_Track_Maintenance_Sample_Exam_JA.pdf` (Ujian Evaluasi Pemeliharaan Jalur Rel / 線路保守)
> - `reference-books/ssw/15_tetsudou_railway/Railway_Rolling_Stock_Sample_Exam_JA.pdf` (Ujian Evaluasi Pemeliharaan Rangkaian Kereta / 車両電気)
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
Di atas jalur rel aktif, satu detik kelalaian berakibat tertabrak kereta yang melaju hening $120	ext{ km/jam}$ (*ressha shokusho jiko*):
- **Aba-Aba Sinyal Terompet Pemantau Kereta (Kanshi'in no Aizu)**:
  - Terompet dibunyikan panjang: `「プォーーー！」`
  - Seruan lantang petugas: `「上り列車接近！線路外待避！（のぼりれっしゃせっきん！せんろがいたいひ！）」` (*Nobori ressha sekkin! Senrogai taihi!* — Kereta jalur hulu mendekat! Seluruhnya evakuasi keluar rel!) (Husna & Febriyanti 2022 [EA-25]; MLIT 2024 [VS-53]).
  - Respon seluruh pekerja di parit pengaman: `「待避よし！ヨシ！」` (*Taihi yoshi! Yoshi!* JNIOSH 2020 [VS-39]).

### 1.3 Protokol Intervensi Krisis & K3 Tegangan Tinggi Katener (25,000V)
- **Bahaya Sengatan Kawat Listrik Aliran Atas (Kasen Kanden Bōshi)**: Kawat troli katener di atas rel bertegangan $1,500	ext{ V}$ DC (jalur biasa) hingga $25,000	ext{ V}$ AC (Shinkansen). Dilarang membawa pipa baja atau tiang pengukur berdiri tegak ke atas yang mendekati radius $2	ext{ meter}$ dari kawat listrik.
- **Anti-Inpei Kerikil di Celah Wesel Rel (Point Shutsugen)**: Menemukan kerikil atau benda logam terjepit di antara lidah wesel pemindah jalur kereta (*tsuidōki*) wajib dibersihkan dan dilaporkan seketika; kerikil yang mengganjal wesel berakibat Shinkansen anjlok terguling.

---

## Bab 2: Analisis Kritis Kons & Kegagalan Hafalan Buta

### 2.1 Kegagalan Sistemik Hafalan Buta pada Sektor Perkeretaapian
1. **Ketiadaan Pemahaman Geometri Rel Milimeter (Track Geometry Distortion Trap)**: Menghafal kata *senro* (rel) tanpa memahami parameter milimeter: Lebar sepur (*Kidō kyōgaku* $1,067	ext{ mm} pm 2	ext{ mm}$), Peninggian rel luar tikungan (*Kanto*), dan Kerataan membujur (*Kōshō*); deviasi $3	ext{ mm}$ pada kecepatan tinggi memicu anjlokan roda kereta (*datsusen jiko*).
2. **Kebutaan Prosedur Penutupan Jalur Kereta (Track Possession)**: Memulai pekerjaan perbaikan rel sebelum menerima surat konfirmasi penutupan jalur resmi dari dispatcher CTC adalah pelanggaran keselamatan paling fatal di dunia perkeretaapian.

---

## Bab 3: Pemetaan Hambatan Kognitif, Linguistik & Budaya Siswa Indonesia

### 3.1 Tiga Persona Pembelajar Indonesia
1. **Persona A (Lulusan D3/S1 Perkeretaapian / Ex-Teknisi KAI Indonesia)**: Memahami istilah sepur dan bantalan, namun kaget dengan disiplin presisi milimeter dan jadwal kerja malam buta (*yakan sagyo*) Jepang.
2. **Persona B (Ex-Magang Konstruksi Sipil)**: Terbiasa dengan perkakas berat dan batu ballast, namun lemah dalam prosedur komunikasi radio nirkabel terstandarisasi.
3. **Persona C (Kandidat Fresh Non-Rel LPK)**: Sangat takut berada di jalur rel malam hari; rentan mengalami disorientasi arah jalur hulu (*nobori*) vs hilir (*kudari*).

### 3.2 Matriks Besaran, Metrik & Satuan Pengukuran Kritis Perkeretaapian

```
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
```

---

## Bab 4: Arsitektur Kurikulum Fase 1 — Maksimalkan Peluang Lulus Ujian CBT

### 4.1 Struktur Ujian Resmi Prometric CBT MLIT Perkeretaapian
30 butir soal pilihan ganda teori geometri rel, K3 listrik aliran atas, pemeliharaan wesel, dan prosedur evakuasi darurat dalam 60 menit. Ambang kelulusan: $ge 60%$ (MLIT 2024 [VS-53]).

### 4.2 Dekonstruksi Lima Jebakan Distractor Utama Perkeretaapian
1. **Jebakan Masuk ke Jalur Rel Tanpa Kanshi'in**: Pilihan melakukan inspeksi rel di jalur aktif tanpa didampingi Petugas Pemantau Kereta (*Ressha Kanshi'in*) adalah SALAH MUTLAK.
2. **Jebakan Membawa Batang Logam Vertikal di Bawah Kawat Listrik**: Pilihan memikul batang besi pengukur rel secara tegak lurus di bawah kawat katener listrik $25,000	ext{ V}$ adalah LETHAL ERROR (sengatan loncatan listrik tegangan tinggi).
3. **Jebakan Mengabaikan Waktu Habis Jendela Kerja**: Pilihan melanjutkan perbaikan rel melewati batas jam penutupan jalur malam hari (melebihi pukul 04:30) adalah pelanggaran jadwal berat yang melumpuhkan sistem transportasi nasional.

---

## Bab 5: Arsitektur Kurikulum Fase 2 — Kesiapan Kerja Operasional Spesifik Sektor

### 5.1 Progressive SNR Audio & Onomatopoeia Perkeretaapian
- Audio seruan terompet darurat di tengah derak roda baja melintas sambungan rel dan dengung transformator traksi gardu listrik.
- Onomatopoeia perkeretaapian:
  - `ガタンゴトン (gatan-goton)`: Bunyi benturan roda kereta saat melintasi celah sambungan rel (*tsugime*).
  - `キーッ (kī')`: Gesekan keras roda baja pada rel di tikungan tajam (*flange squeal*).
  - `プォーン (pwōn)`: Bunyi klakson peringatan masinis kereta dari kejauhan.

### 5.2 Protokol Intervensi Krisis & Kualifikasi SSW-2
- **Tombol Berhenti Darurat Kereta Api (Ressha Hijō Teishi Sōchi)**: Menekan tombol darurat di peron stasiun atau membakar sinyal suar darurat (*Hatsuentō*) di atas rel saat melihat rintangan longsor.
- **Kualifikasi Menuju SSW-2**:
  - Lisensi Petugas Pemantau Kereta Api Resmi (**Ressha Kanshi'in Menkyo**)
  - Ujian Evaluasi Tokutei Ginō 2-gō Sektor Perkeretaapian (Tingkat Kepala Regu Pemeliharaan Hosen) $ightarrow$ Hak tinggal tanpa batas, membawa keluarga, dan jalur **Eijūken**.

---

## Bab 6: 4 Modalitas Latihan Otentik, Scaffolding & Taksonomi Remedial

### 6.1 Empat Modalitas Latihan Otentik
1. **Visual**: Identifikasi deviasi geometri rel (kelebaran sepur, peninggian rel kant) pada grafik rekaman kereta ukur track inspection car (*Doctor Yellow*).
2. **Auditori**: Mengidentifikasi bunyi seruan terompet pemantau kereta (*Kanshi'in*) di tengah bising mesin ballast tamper.
3. **Skenario**: Menangani situasi hilangnya sinyal konfirmasi penutupan jalur saat shift kerja malam.
4. **Prosedural**: Menghitung peninggian rel tikungan: $C = rac{11.8 	imes V^2}{R}	ext{ mm}$.

### 6.2 Matriks Taksonomi Remedial (4 Tipe Eror)
- **Tipe L**: Tertukar istilah *Nobori* (kereta arah ibukota/hulu) vs *Kudari* (kereta arah daerah/hilir).
- **Tipe C**: Mengira kawat listrik rel tidak berbahaya jika tidak disentuh langsung (tegangan $25,000	ext{ V}$ dapat meloncat di udara lembap).
- **Tipe M**: Salah membaca nilai deviasi lebar rel $pm 2	ext{ mm}$.
- **Tipe P**: Mengabaikan aba-aba evakuasi terompet pemantau kereta.

### 6.3 Tabel Parameter Desain Kurikuler Perkeretaapian
```
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
```
