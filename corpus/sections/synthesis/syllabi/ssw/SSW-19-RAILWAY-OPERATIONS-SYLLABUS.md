# SILABUS KEJURUAN RESMI NUGGET NIHONGO · SEKTOR 19: RAILWAY OPERATIONS & ROLLING STOCK (鉄道業 / INDUSTRI PERKERETAAPIAN: SARANA KERETA & OPERASIONAL STASIUN)
**Kode Sektor:** `SSW-RAIL-01` · **Versi:** v2.0 (Corpus v30 Canonical Revision)  
**Status:** AUTHORITATIVE & EXHAUSTIVE SECTOR SYLLABUS  
**Kementerian Pembina:** Kementerian Pertanahan, Infrastruktur, Transportasi dan Pariwisata Jepang - Biro Kereta Api (MLIT Railway Bureau / 国土交通省鉄道局)  
**Badan Pelaksana Uji:** Asosiasi Teknologi Mesin Kereta Api Jepang (RMA / 日本鉄道車両機械技術協会), Asosiasi Subway Jepang (JTOA / 日本地下鉄協会), & Prometric  
**Dasar Kurasi Primer:**
- `reference-books/ssw/13_new_sectors_transport_rail_forestry/Railway_Rolling_Stock_Theory_Sample_JA.pdf` (Bank Soal Resmi Teori Sarana Kereta RMA)
- `reference-books/ssw/13_new_sectors_transport_rail_forestry/Railway_Rolling_Stock_Practical_Sample_JA.pdf` (Bank Soal Ujian Praktik Sarana Kereta RMA)
- `reference-books/ssw/13_new_sectors_transport_rail_forestry/Transport_Taxi_Driver_Sample_Exam_JA.pdf` (Dokumen Asli Ujian Praktik Operasional Stasiun & Keselamatan JTOA)
- Standar Ekspansi Sektor Baru Kabinet Jepang (Cabinet Decision 2024 Expansion)
- Standar Keselamatan Operasi Kereta Api Jepang (Railway Operation Act & Shiteki Koshou)
**Landasan Teoretis & Empiris:**
- Needs Analysis & Technical Lexicon (Nation & Hwang 1995 [VS-09]; Chung & Nation 2003 [VS-10])
- Cross-Cultural Communication in Railway Depots & Platform HOU-REN-SO (Mustaqim & Priventa 2026 [VS-31]; Supriatnaningsih et al. 2024 [VS-33])
- Origin of Point-and-Call (指差し呼称 - Shiteki Koshou) in Japanese Railways (JNIOSH 2020 [VS-39]; RMA 2024)
- Platform Safety, Train Clearances & Rolling Stock Inspection Acoustic Precision (Husna & Febriyanti 2022 [EA-25])
- Railway Safety & Operations Operationalization Standards (MLIT 2024 [VS-53])

---

## 1. SPESIFIKASI UJIAN RESMI RMA / JTOA PROMETRIC CBT (STANDAR MLIT)

Kandidat visa *Tokutei Ginou 1-gō* bidang Perkeretaapian menempuh ujian Computer-Based Testing (CBT) pada salah satu dari dua jalur:

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                        RMA / JTOA RAILWAY INDUSTRY EXAM MATRIX (ROLLING STOCK & STATION)               │
├─────────────────────────┬────────────────────────────────────────┬─────────────┬───────────┬───────────┤
│ Komponen Ujian          │ Cakupan Ranah Pengujian                │ Jumlah Soal │ Durasi    │ Ambang    │
├─────────────────────────┼────────────────────────────────────────┼─────────────┼───────────┼───────────┤
│ 1. Ujian Teori          │ Hukum keselamatan kereta api, struktur │ 30 Soal     │ 60 Menit  │ $\ge 60\%$│
│    (学科試験 - Gakka)   │ bogie & rem pneumatik, pantograf &     │ (Format     │           │ (18 / 30) │
│                         │ tegangan tinggi 1.500V DC/20kV AC,     │  Pilihan    │           │           │
│                         │ keamanan peron stasiun, sinyal blok ATC│  Ganda CBT) │           │           │
├─────────────────────────┼────────────────────────────────────────┼─────────────┼───────────┼───────────┤
│ 2. Ujian Praktik Layar  │ • Jalur Sarana: Diagnosis suara ketukan│ 10-15       │ 30 Menit  │ $\ge 60\%$│
│    (実技試験 - Jitsugi) │   palu (dashin), pengukuran aus roda,   │ Butir Soal  │           │ (Evaluasi │
│                         │   penggantian bantalan rem komposit    │ Simulasi    │           │  Visual & │
│                         │ • Jalur Stasiun: Pengoperasian tombol  │ Layar CBT   │           │   Audio)  │
│                         │   darurat peron, jembatan kursi roda   │             │           │           │
└─────────────────────────┴────────────────────────────────────────┴─────────────┴───────────┴───────────┘
```

> **Ketentuan Kelulusan Ganda:** Peserta wajib lulus **KEDUA-DUANYA** (Teori $\ge 60\%$ dan Praktik $\ge 60\%$).

> **Klarifikasi Provenans Dokumen Primer (Provenance Note):**  
> Dokumen dengan nama file fisik `Transport_Taxi_Driver_Sample_Exam_JA.pdf` yang tersimpan di repositori adalah **100% naskah asli lembar soal ujian resmi Asosiasi Subway Jepang (JTOA / 日本地下鉄協会)** untuk kualifikasi Staf Stasiun & Penanganan Operasional Kereta Api (*Un'yu Kakariin / 運輸係員*). Terlepas dari anomali penamaan file "Taxi_Driver" pada rilis awal kementerian, isi materi naskah ini sepenuhnya memuat uji penanganan tombol darurat peron (*ressha hijou teishi botan*), evakuasi penumpang jatuh ke rel, pengoperasian jembatan kursi roda, penanganan gate tiket otomatis, dan protokol keselamatan peron kereta api.

---

## 2. JALUR OPERASIONAL SUB-BIDANG PERKERETAAPIAN (2 DUAL-TRACKS MLIT)

Sektor Perkeretaapian mengoperasikan dua jalur profesi berintegritas keselamatan tertinggi:
1. **Jalur Pemeliharaan Sarana Kereta Api (鉄道車両整備 - Rolling Stock Maintenance):**
   - Pemeriksaan harian depo (*retsusha kensa*): Pengecekan pantograf, lampu kabin, AC, pintu geser kereta.
   - Pemeriksaan bogie dan roda (*daisha kensa / juuyoubu kensa*): Uji ketukan palu (*dashin*) pada baut penyambung bogie, pengukuran keausan profil flens roda menggunakan wheel caliper (*rinji sokuteiki*).
   - Sistem pengereman udara: Kompresor udara (*air compressor*), katup rem elektrik pneumatik (ECB), penggantian kampas rem blok komposit sintetis.
   - Sistem penggerak traksi: Motor traksi induksi AC (VVVF inverter), transformator utama, sistem pendingin oli.
2. **Jalur Pelayanan Stasiun & Operasional Angkutan (運輸係員・駅務 - Station Staff & Operations):**
   - Pengawasan keselamatan peron (*hoomu anzen*): Pengoperasian pintu pagar peron otomatis (*platform screen doors*), pemantauan celah antara peron dan lantai kereta (*sukima*).
   - Penanganan darurat peron: Penekanan tombol penghenti darurat kereta (*resha teishi botan*) saat ada penumpang atau barang terjatuh ke rel.
   - Layanan asistensi aksesibilitas: Pemasangan jembatan lipat portabel (*suroupu-ban*) untuk pengguna kursi roda dan tunanetra.
   - Layanan tiket dan gate: Operasional gerbang tiket otomatis (IC Card / Suica / Pasmo) dan loket stasiun.

---

## 3. MODUL PEMBELAJARAN KURIKULUM (PEDAGOGICAL MODULES)

### MODUL 1: TEKNIK INSPEKSI KETUK PALU AKUSTIK (打音検査 - DASHIN TENKEN)
- **Topik 1.1: Asal Usul Yubisashi Kosho & Prinsip Akustik Kereta Api:**
  - **Topik 1.1.1: Sejarah & Efektivitas Shiteki Koshou di Depo Kereta:** Sejarah penemuan Point-and-Call di jawatan kereta api nasional Jepang (Kokutetsu 1913) yang terbukti memangkas angka kecelakaan manusia hingga 85%.
  - **Topik 1.1.2: Metodologi Ayunan Palu Uji (Tesuto Hanmaa):** Teknik memegang palu ketuk bergagang panjang 1/4 pon dan irama pengetukan kepala baut suspensi bogie secara ritmis teratur.
- **Topik 1.2: Pembedaan Frekuensi Nada Suara Ketukan:**
  - **Topik 1.2.1: Analisis Resonansi Bersih (Seijou-on):** Identifikasi nada tinggi jernih berdering tajam (*kiiiin* / *kan-kan*) dan sensasi pantulan pegas tegas di telapak tangan mekanik yang menandakan baut terkencang sempurna.
  - **Topik 1.2.2: Deteksi Suara Retak & Longgar (Kondaku-on / Ijou-on):** Pengenalan nada rendah teredam berat (*boko-boko* / *pot-pot*) dan hilangnya daya pantul palu yang mengindikasikan kelonggaran ulir baut atau retakan internal mikro pada logam rangka.

---

### MODUL 2: BOGIE KERETA, RODA & SISTEM PENGEREMAN UDARA
- **Topik 2.1: Geometri Roda Kereta & Keausan Flens (車輪踏面・フランジ摩耗):**
  - **Topik 2.1.1: Profil Tirus Tapak Roda & Peredaman Hunting Motion:** Kemiringan tirus tapak roda (*touba*) rasio 1/20 atau 1/40 penjamin gerak sentrasi alami di tikungan rel kereta (*hunting motion damping*).
  - **Topik 2.1.2: Batas Toleransi Keausan Flens Roda:** Pengukuran ketebalan dan sudut tegak flens roda dengan wheel caliper; penarikan gerbong jika keausan mendekati ambang batas bahaya anjlok (*datsusen boushi*).
- **Topik 2.2: Sistem Pengereman Udara Tekan Kereta (空気ブレーキ):**
  - **Topik 2.2.1: Tekanan Pipa Udara Utama & Katup ECB:** Pemantauan tekanan tabung udara utama (*main reservoir pipe* 0.7–0.88 MPa) dan respons katup pneumatik rem listrik proporsional.
  - **Topik 2.2.2: Mekanisme Pembuangan Darurat Katup Rem:** Prosedur saat katup rem darurat (*hijou bureeki barubu*) membuang seluruh isi udara pipa ke atmosfer dan mencengkeram blok rem komposit ke tapak roda seketika.

---

### MODUL 3: KELISTRIKAN TEGANGAN TINGGI & PANTOGRAF
- **Topik 3.1: Jalur Arus Tegangan Tinggi (架線・集電装置):**
  - **Topik 3.1.1: Karakteristik Kawat Troli Atas DC 1500V & AC 25kV:** Bahaya busur api mematikan pada sistem elektrifikasi rel komuter (DC 1.500V) dan Shinkansen (AC 25.000V).
  - **Topik 3.1.2: Prosedur Pentanahan Aman Kawat Troli (Secchi-bou):** Pemasangan tongkat pentanahan arde (*earthing rod*) ke kawat troli sebelum mekanik diizinkan naik ke atap gerbong.
  - **Topik 3.1.3: Pengukuran Aus Pelat Gesek Pantograf (Shuudenshou):** Pengecekan ketebalan sisa karbon kontak pantograf terhadap keausan friksi gesekan kawat listrik.

---

### MODUL 4: KESELAMATAN PERON STASIUN & PROTOKOL DARURAT PENUMPANG
- **Topik 4.1: Prosedur Penekanan Tombol Penghenti Darurat Kereta (列車非常停止ボタン):**
  - **Topik 4.1.1: Tindakan Instan Saat Penumpang / Objek Terjatuh ke Rel:** Kewajiban menekan tombol darurat merah seketika tanpa perlu meminta izin atasan saat melihat orang/barang jatuh ke lintasan rel.
  - **Topik 4.1.2: Aktivasi Radio Peringatan Kereta & Lampu Sinyal Peron:** Pemahaman sistem interlocking darurat di mana penekanan tombol memicu suar lampu merah berputar di ujung peron dan transmisi sinyal rem darurat ke masinis kereta terdekat.
- **Topik 4.2: Asistensi Kursi Roda di Celah Peron (スロープ板介助):**
  - **Topik 4.2.1: SOP Pemasangan Jembatan Ram Lipat Portabel:** Membawa jembatan papan lipat aluminium ke pintu gerbong yang ditentukan, mengaitkan lidah papan ke bibir pintu kereta, dan memastikan stabilitas pijakan.
  - **Topik 4.2.2: Komunikasi Pelayanan Santun & Pemanduan Kursi Roda:** Etika menyapa pengguna kursi roda, memandu roda mundur perlahan saat menurunkan penumpang dari kereta demi keselamatan gravitasi.
- **Topik 4.3: HOU-REN-SO Saat Penumpang Terjatuh ke Rel / Gangguan Sinyal:**
  - **Topik 4.3.1: Protokol Evakuasi Korban & Koordinasi dengan Ruang Kendali Operasi (OCC):** Komunikasi darurat radio stasiun untuk mengamankan aliran listrik kawat atas sebelum personel turun ke jalur rel.
  - **Topik 4.3.2: Format Pelaporan Darurat Radio ke Kepala Stasiun:**  
    *「駅長！2番線ホームで線路内転落が発生しました！直ちに非常停止ボタンを押し、接近中の上り電車を非常停車させました！救助に向かいます！」*

---

## 4. KOSAKATA TEKNIS LAYER 2 (RMA/JTOA OFFICIAL RAILWAY LEXICON)

| No | Kanji | Kana | Romaji | Indonesian Gloss | High-Stakes Risk Category |
|---|---|---|---|---|---|
| 1 | 列車非常停止ボタン | れっしゃひじょうていし... | *ressha hijou teishi...* | Tombol darurat peron penghenti kereta mendekat | Life-or-Death Platform Rescue |
| 2 | ホーム転落事故 | ほーむてんらくじこ | *hoomu tenraku jiko* | Penumpang terjatuh dari peron ke atas rel kereta | Fatal Train Collision |
| 3 | 打音検査（テストハンマー） | だおんけんさ | *daon kensa* | Uji ketukan palu akustik pendeteksi baut kendor | Derailment / Mechanical Loss |
| 4 | 台車枠亀裂 | だいしゃわくきれつ | *daishawaku kiretsu* | Retakan mikro pada rangka baja bogie kereta | Catastrophic Derailment Hazard |
| 5 | パンタグラフ集電舟 | ぱんたぐらふしゅうでんしゅう | *pantagurafu...* | Sepatu gesek karbon penerima arus listrik 1500V | High Voltage Arc Flash Hazard |
| 6 | ホームドア挟まり | ほーむどあはさまり | *hoomu doa hasamari* | Penumpang/pakaian terjepit pintu pagar peron | Dragging Accident Hazard |
| 7 | スロープ板介助 | すろーぷばんかいじょ | *suroupu-ban kaijo* | Pemasangan jembatan lipat asistensi kursi roda | Fall into Platform Gap Risk |
| 8 | フランジ摩耗 | ふらんじまもう | *furanji mamou* | Keausan bibir flens penuntun roda kereta api | Flange Climb Derailment |
| 9 | 触車事故（列車接触） | しょくしゃじこ | *shokusha jiko* | Pekerja/orang tertabrak badan kereta yang melintas | Instant Fatal Impact |
| 10 | 軌道内立ち入り禁止 | きどうないたちいりきんし | *kidounai...* | Larangan keras masuk ke dalam area jalur rel | Statutory Severe Hazard Zone |
| 11 | 発車合図（乗降終了） | はっしゃあいず | *hassha aizu* | Sinyal komando pintu tertutup dan kereta siap jalan | Passenger Door Trap Prevention |
| 12 | 混濁音（異常打音） | こんだくおん | *kondaku-on* | Suara ketukan palu redup tanda kelonggaran baut | Hidden Fastener Failure |
| 13 | 架線接地棒（アース棒） | かせんせっちぼう | *kasen secchibou* | Tongkat arde pentanahan kawat troli listrik atap | Electrocution / Arc Hazard |
| 14 | 空気バネ（エアサス） | くうきばね | *kuuki bane* | Balon suspensi udara penopang keempukan gerbong | Uneven Carbody Tilt Hazard |
| 15 | 出発指示合図 | しゅっぱつしじあいず | *shuppatsu shiji aizu* | Sinyal lampu hijau konfirmasi berangkat masinis | Signal Passed at Danger (SPAD) |
| 16 | 指差呼称（シテキコショウ） | しさこしょう | *shisa koshou* | Protokol tunjuk dan sebut verifikasi keselamatan | 85% Human Error Reduction |
| 17 | 踏面清掃装置 | とうめんせいそうそうち | *toumen seisou souchi* | Perangkat pembersih kotoran tapak roda kereta | Loss of Wheel-Rail Adhesion |
| 18 | 車輪踏面剥離 | しゃりんとうめんはくり | *sharin toumen hakuri* | Pengelupasan logam tapak roda akibat gesekan rem | Vibration & Bearing Damage |
| 19 | 車軸軸受（ジャーナル） | しゃじくじくうけ | *shajiku jikuuke* | Bantalan poros roda penahan putaran kecepatan tinggi | Axle Seizure / Hot Box Risk |
| 20 | 制御弁（電磁弁） | せいぎょべん | *seigyoben* | Katup solenoid pengendali aliran udara rem kompresi | Air Brake Failure |
| 21 | 主電動機（トラクションモータ） | しゅでんどうき | *shudendouki* | Motor listrik utama penggerak gandar roda kereta | Traction Power Loss Hazard |
| 22 | 断路器（ディスコン） | だんろき | *danroki* | Sakelar isolator pemutus arus listrik daya atap kereta | High-Voltage Maintenance Arc |
| 23 | 避雷器（アレスター） | ひらいき | *hiraiki* | Alat penangkal lonjakan petir pelindung sirkuit kereta | Lightning Surge Equipment Blast |
| 24 | 自動列車停止装置（ATS） | じどうれっしゃていし... | *jidou ressha teishi...* | Sistem otomatis penghenti kereta saat langgar sinyal | Over-speed / Collision Prevention |
| 25 | 自動列車制御装置（ATC） | じどうれっしゃせいぎょ... | *jidou ressha seigyo...* | Sistem otomatis pembatas kecepatan di kabin masinis | Signal Disregard Catastrophe |
| 26 | 転てつ器（ポイント） | てんてつき | *tentetsuki* | Alat wesel pengalih persilangan jalur rel kereta | Switch Misalignment Derailment |
| 27 | 隙間転落防止ゴム | すきまてんらくぼうし... | *sukima tenraku...* | Karet penutup celah antara lantai kereta dan peron | Platform Gap Passenger Fall |
| 28 | 自動改札機障害 | じどうかいさつきしょうがい | *jidou kaisatsuki...* | Gangguan mekanis tiket/kartu tersangkut di gerbang | Platform Concourse Congestion |
| 29 | 非常通報装置（車内SOS） | ひじょうつうほうそうち | *hijou tsuuhou souchi* | Tombol intercom darurat penumpang di dalam gerbong | In-Car Fire / Crime Alert |
| 30 | 車両基地・留置線 | しゃりょうきち | *sharyou kichi* | Depo bengkel sarana perawatan dan parkir kereta | Gemba Shunting Collision Hazard |
| 31 | 誘導無線（防護無線） | ゆうどうむせん | *yuudou musen* | Radio darurat pemancar peringatan henti serentak | Multi-Train Secondary Collision |
| 32 | レール摩耗・波状摩耗 | れーるまもう | *reeru mamou* | Keausan bergelombang pada permukaan baja rel | Excessive Vibration & Noise |
| 33 | 建築限界測定 | けんちくげんかいそくてい | *kenchiku genkai sokutei* | Pengukuran batas ruang bebas kereta dari tiang/dinding | Clearance Obstacle Collision |
| 34 | 絶縁手袋・保護具 | ぜつえんてぶくろ | *zetsuen tebukuro* | Sarung tangan karet isolasi listrik tegangan tinggi | High-Voltage Electric Shock |
| 35 | 乗務員引継ぎ | じょうむいんひきつぎ | *joumuin hikitsugi* | Serah terima operan tugas masinis & kondektur kereta | Operational Oversight Risk |
| 36 | 構内入換作業 | こうないいれかえさぎょう | *kounai irekae sagyou* | Manuver pemindahan gerbong kereta di dalam area depo | Shunting Squeeze & Crushing Risk |

---

## 5. DIRECTIVES K3 DARURAT & FORMULA YUBISASHI KOSHO

### Teriakan Darurat Spontan di Stasiun & Depo Kereta (> 95 dB):
- *「非常ボタンを押せ！線路に人が落ちた！」* (*Hijou botan wo ose! Senro ni hito ga ochita!* — Tekan tombol darurat! Ada orang jatuh ke rel!)
- *「電車来るぞ！黄色い線の内側に下がれ！」* (*Densha kuru zo! Kiiroi sen no uchigawa ni sagare!* — Kereta datang! Mundur ke dalam garis kuning!)
- *「パンタ触るな！架線アース取ったか！？」* (*Panta sawaru na! Kasen aasu totta ka!?* — Jangan sentuh pantograf! Sudah pasang grounding kawat atas?!)

### Formula Point-and-Call (指差し呼称):
1. **Pengecekan Baut Rangka Bogie dengan Palu Dashin:** *「台車取付ボルト、打音清澄、緩みなしヨシ！」*
2. **Pengecekan Keamanan Penumpang di Peron Sebelum Pintu Tutup:** *「ホーム柵・点字ブロック、旅客挟まりなし、乗降終了ヨシ！」*
3. **Pengecekan Sinyal Berangkat Jalur Kereta:** *「第1出発信号機、進行現示（青）、ヨシ！出発進行！」*
4. **Pengecekan Pemasangan Jembatan Kursi Roda:** *「スロープ板フック噛み合い、ガタツキなし、段差クリア、ヨシ！」*

---

## 6. BANK SOAL UJIAN CBT BADAN PERKERETAAPIAN RESMI

### Contoh Soal Ujian Teori (学科試験 - Pilihan Ganda):
> **Soal 1:** 鉄道車両の定期検査において実施される「打音検査（テストハンマーによる検査）」に関する記述として、**最も適切なもの**を次の中から選びなさい。  
> A. ボルトやナットが適正に締め付けられている場合、ハンマーで叩いた時に「鈍く濁った低い音（混濁音）」が響く。  
> B. ボルトやナットに緩みや内部亀裂が存在する場合、適正な締結状態と比べて「高く澄んだ金属音（清澄音）」が発生する。  
> C. 打音検査は、ハンマーで打撃した際の「音の高低・音色の濁り」や「手に伝わる反発の感触」によって締結部の緩みや亀裂を感知する検査手法である。  
> D. 打音検査を行う際は、ボルトの頭部を叩くのではなく、必ず周囲のゴムパッキンを強く叩いて確認する。  
> **Kunci Jawaban:** **C** (Benar. Uji ketuk palu memanfaatkan kombinasi nada resonansi jernih vs redup dan pantulan getaran di tangan mekanik untuk mendeteksi kelonggaran baut).

> **Soal 2:** 駅のホーム上で旅客案内および監視業務を行う駅務員が、旅客がホームから線路内へ転落したのを目撃した際、**最初に行うべき最優先の行動**として正しいものを選びなさい。  
> A. 接近してくる列車を直ちに停止させるため、躊躇することなく最寄りの「列車非常停止ボタン（ホーム非常ボタン）」を押す。  
> B. 駅事務室に戻り、事故報告書を作成してから警察に電話連絡する。  
> C. 転落した旅客の荷物を拾い集めるため、自分も直ちに線路へ飛び降りる。  
> D. 列車が通り過ぎるまでホーム上で大声を出さずに静かに待機する。  
> **Kunci Jawaban:** **A** (Benar. Menekan tombol darurat peron adalah tindakan paling kritis nomor satu tanpa jeda untuk memicu sinyal penghenti darurat otomatis kereta yang mendekat).
