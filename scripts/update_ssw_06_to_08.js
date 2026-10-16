const fs = require("fs");
const path = require("path");

const sswDir = path.join(__dirname, "../corpus/sections/synthesis/syllabi/ssw");

// ==========================================
// SSW-06: AUTOMOBILE MAINTENANCE
// ==========================================
const ssw06Content = `# SILABUS KEJURUAN RESMI NUGGET NIHONGO · SEKTOR 06: AUTOMOBILE MAINTENANCE & REPAIR (PERAWATAN MOBIL)
**Kode Sektor:** \`SSW-AUTO-01\` · **Versi:** v2.0 (Corpus v30 Canonical Revision)  
**Status:** AUTHORITATIVE & EXHAUSTIVE SECTOR SYLLABUS  
**Kementerian Pembina:** Kementerian Pertanahan, Infrastruktur, Transportasi dan Pariwisata Jepang (MLIT / 国土交通省)  
**Badan Pelaksana Uji:** Federasi Promosi Servis Mobil Jepang (JASPA / 一般社団法人 日本自動車整備振興会連合会) & Prometric  
**Dasar Kurasi Primer:**
- \`reference-books/ssw/08_jidousha_automobile_repair/Automobile_Mechanic_Guidelines_MLIT.pdf\` (Pedoman Kurikulum Resmi MLIT Mekanik Mobil Asing, 45 halaman)
- \`reference-books/ssw/08_jidousha_automobile_repair/Automobile_Mechanic_Applicant_Guide_ID.pdf\` (Panduan Peserta Ujian JASPA Bahasa Indonesia)
- \`reference-books/ssw/08_jidousha_automobile_repair/Automobile_Theory_Sample_Exam_1_JA.pdf\` & \`reference-books/ssw/08_jidousha_automobile_repair/Automobile_Practical_Sample_Exam_1_JA.pdf\`
- \`reference-books/ssw/08_jidousha_automobile_repair/Automobile_Theory_Sample_Exam_2_JA.pdf\` & \`reference-books/ssw/08_jidousha_automobile_repair/Automobile_Theory_Exam_Answers_JA.pdf\`
**Landasan Teoretis & Empiris:**
- Needs Analysis & Technical Lexicon (Nation & Hwang 1995 [VS-09]; Chung & Nation 2003 [VS-10])
- Cross-Cultural Communication in Service Operations & HOU-REN-SO (Mustaqim & Priventa 2026 [VS-31]; Supriatnaningsih et al. 2024 [VS-33])
- Geminate Acoustic Intelligibility in Mechanical Warning Calls (Husna & Febriyanti 2022 [EA-25])
- Automotive Safety Standards & Shiteki Koshou (JNIOSH 2020 [VS-39]; JASPA & MLIT 2024 [VS-54])

---

## 1. SPESIFIKASI UJIAN RESMI PROMETRIC CBT (STANDAR JASPA / MLIT)

Kandidat visa *Tokutei Ginou 1-gō* bidang Perawatan Mobil menempuh ujian Computer-Based Testing (CBT) dengan spesifikasi regulasi resmi:

\`\`\`
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                              PROMETRIC CBT AUTOMOBILE MAINTENANCE EXAM MATRIX                          │
├─────────────────────────┬────────────────────────────────────────┬─────────────┬───────────┬───────────┤
│ Komponen Ujian          │ Cakupan Ranah Pengujian                │ Jumlah Soal │ Durasi    │ Ambang    │
├─────────────────────────┼────────────────────────────────────────┼─────────────┼───────────┼───────────┤
│ 1. Ujian Teori          │ Pengetahuan mesin bensin/diesel, sasis,│ 30 Soal     │ 60 Menit  │ $\\ge 60\\%$│
│    (学科試験 - Gakka)   │ sistem rem, kelistrikan bodi, regulasi │ (Format     │           │ (18 / 30) │
│                         │ Shaken, dan keselamatan bengkel K3     │  True/False │           │           │
│                         │                                        │  ○× CBT)    │           │           │
├─────────────────────────┼────────────────────────────────────────┼─────────────┼───────────┼───────────┤
│ 2. Ujian Praktik Layar  │ 3 set studi kasus diagnostik visual:   │ 3 Kasus     │ Terpadu   │ $\\ge 60\\%$│
│    (実技試験 - Jitsugi) │ Mesin, sasis kemudi, dan kelistrikan   │ (Simulasi   │ dalam sesi│ (Berdasarkan│
│                         │ dengan pembacaan multimeter/OBD-II     │  Visual CBT)│  CBT      │  rubrik)  │
└─────────────────────────┴────────────────────────────────────────┴─────────────┴───────────┴───────────┘
\`\`\`

> **Catatan Bahasa Ujian:** Teks soal disajikan dalam **Bahasa Jepang berfurigana**, dilengkapi padanan istilah teknis berbahasa Inggris berdampingan dengan Katakana (misal: エンジン / Engine, ブレーキ / Brake).

---

## 2. JALUR OPERASIONAL BENGKEL OTOMOTIF JEPANG

Kurikulum membedakan 4 domain kerja teknis bengkel (*Jidousha Seibikoujou*):
1. **Inspeksi Berkala & Uji Kelayakan Jalan (定期点検・車検整備 - Shaken):**
   - Pemeriksaan berkala 12 bulan dan 24 bulan wajib hukum (*Houtei Tenken*), uji emisi gas buang, uji efisiensi rem (*brake tester*), uji kelurusan roda depan (*side slip tester*).
2. **Perawatan & Overhaul Mesin (エンジン点検・分解整備):**
   - Penggantian oli mesin, penggantian saringan oli, penyetelan celah katup (*tappet clearance*), penggantian timing belt/rantai, perbaikan kebocoran gasket kepala silinder.
3. **Perawatan Sasis, Kemudi & Rem (シャシ・足回り・ブレーキ整備):**
   - Penggantian kampas rem cakram/tromol, pengurasan dan pembuangan angin minyak rem (*air bleeding / ea-nuki*), penggantian shock absorber, tie rod end, dan balancing roda.
4. **Sistem Kelistrikan, Diagnostik OBD-II & Kendaraan Elektrifikasi (電装・OBD・HV/EV):**
   - Pemindaian kode kerusakan diagnostik (*DTC*) dengan scanner OBD-II, pengujian baterai aki 12V, protokol isolasi keselamatan tegangan tinggi pada mobil hybrid (HEV) dan listrik murni (BEV).

---

## 3. MODUL PEMBELAJARAN KURIKULUM (PEDAGOGICAL MODULES)

### MODUL 1: MESIN BENSIN, DIESEL & SISTEM PENDINGIN (エンジン構造と冷却)
- **Topik 1.1: Prinsip Kerja Siklus 4-Tak & Bahan Bakar:**
  - **Topik 1.1.1: Empat Langkah Mesin Bensin (Hisap-Kompresi-Kerja-Buang):** Analisis kevakuman intake, rasio kompresi, pembakaran percikan busi (*tenka puragu*), dan langkah buang katup knalpot.
  - **Topik 1.1.2: Sistem Common Rail Mesin Diesel & Injeksi:** Pengabutan bahan bakar solar bertekanan ultra-tinggi (> 150 MPa), pemanasan awal busi pijar (*glow plug*), dan filter partikulat diesel (*DPF*).
- **Topik 1.2: Sistem Pelumasan & Sirkulasi Pendingin Mesin:**
  - **Topik 1.2.1: Sirkulasi Oli Mesin & Pompa Oli:** Pengukuran viskositas oli (SAE), fungsi katup relief bypass filter oli, dan pemeriksaan batang celup pengukur (*oil dipstick*).
  - **Topik 1.2.2: Termostat & Tutup Radiator Bertekanan:** Titik buka termostat (82°C–88°C), katup pelepas tekanan tutup radiator (0.9–1.1 bar), dan larangan keras membuka tutup radiator saat mesin mendidih panas!

---

### MODUL 2: SASIS, KEMUDI & SISTEM REM (シャシとブレーキ整備)
- **Topik 2.1: Mekanisme Rem Hidrolik Cakram & Tromol:**
  - **Topik 2.1.1: Rem Cakram (ディスクブレーキ - Disc Brake):** Pemeriksaan ketebalan kampas (*pad*), keausan permukaan piringan rotor, dan pelumasan pin kaliper floating.
  - **Topik 2.1.2: Rem Tromol (ドラムブレーキ - Drum Brake):** Pemeriksaan ketebalan kampas sepatu rem (*brake shoe*), silinder roda (*wheel cylinder*), dan penyetelan celah otomatis.
  - **Topik 2.1.3: Pembuangan Angin Minyak Rem (エア抜き - Air Bleeding):** Prosedur memompa pedal rem dan mengendurkan nipple bleeder hingga tidak ada gelembung udara dalam selang transparan.
- **Topik 2.2: Geometri Roda, Kemudi & Suspensi:**
  - **Topik 2.2.1: Sudut Alignment Roda (Camber, Caster, Toe-in):** Penyetelan sudut toe-in roda depan untuk menjamin stabilitas jalan lurus dan keausan ban merata.
  - **Topik 2.2.2: Pemeriksaan Keausan Ban & Tanda TWI (Tire Wear Indicator):** Batas minimal tapak ban legal Jepang ($1.6\text{ mm}$), pengukuran tekanan angin saat ban dingin.

---

### MODUL 3: KELISTRIKAN MOBIL & PEMINDAIAN OBD-II (電装品と故障診断)
- **Topik 3.1: Sistem Pengisian, Starter & Aki 12V:**
  - **Topik 3.1.1: Pengujian Alternator & Regulator Voltase:** Pengukuran tegangan pengisian alternator ($13.5\text{ V} - 14.5\text{ V}$) dan kekencangan sabuk penggerak (*fan belt*).
  - **Topik 3.1.2: Pemeriksaan Berat Jenis Baterai Aki (バッテリー比重):** Penggunaan hidrometer optik/refraktometer (standar berat jenis penuh: 1.26–1.28 pada suhu 20°C).
- **Topik 3.2: Diagnostik Komputer OBD-II & Mobil Listrik (HEV/BEV):**
  - **Topik 3.2.1: Pembacaan Kode Kerusakan DTC Scanner:** Penelusuran sensor O2, sensor posisi poros engkol (CKP), sensor aliran udara MAF, dan reset lampu indikator Check Engine.
  - **Topik 3.2.2: Prosedur Pelepasan Steker Servis Tegangan Tinggi (HV Service Plug):** SOP pemutusan baterai traksi HEV/BEV tegangan tinggi > 200V, pemakaian sarung tangan karet isolasi 1000V (*zetsuen tebukuro*), dan waktu tunggu discharge kapasitor 10 menit.

---

### MODUL 4: PERKAKAS PRESISI & K3 BENGKEL MOBIL (工具安全とリフトK3)
- **Topik 4.1: Penggunaan Perkakas Torsi Presisi (トルクレンチ):**
  - **Topik 4.1.1: Pengencangan Baut Roda Sesuai Nilai Spesifikasi:** Pengencangan pola bersilang bintang menggunakan kunci torsi (*toruku renchi*), bunyi klik konfirmasi, dan larangan mengencangkan baut roda hanya mengandalkan impact wrench!
- **Topik 4.2: K3 Pengoperasian Lift Hidrolik Mobil (リフト安全):**
  - **Topik 4.2.1: Posisi Titik Tumpu Angkat Sasis (Jack-up Points):** Pengecekan posisi bantalan karet lift tepat pada titik tumpu sasis pabrikan (*jakkiappu pointo*).
  - **Topik 4.2.2: Penguncian Mekanis Safety Lock Lift:** Penaikan mobil setinggi 10 cm untuk goyang uji stabilitas (*yusuri kakunin*), disusul penaikan penuh hingga safety lock mekanis berbunyi klik mengunci.
  - **Topik 4.2.3: Pemasangan Penyangga Pengaman Mekanis (Uma / Rigid Rack):** Larangan mutlak menyusup ke kolong mobil yang hanya ditopang dongkrak roda hidrolik tanpa ditopang safety stand rigid rack (*uma*)!

---

## 4. KOSAKATA TEKNIS LAYER 2 (JASPA OFFICIAL AUTOMOTIVE LEXICON)

| No | Kanji | Kana | Romaji | Indonesian Gloss | High-Stakes Risk Category |
|---|---|---|---|---|---|
| 1 | 点火プラグ | てんかぷらぐ | *tenka puragu* | Busi pemantik api ruang bakar mesin | Misfire & Engine Knocking |
| 2 | トルクレンチ | とるくれんち | *toruku renchi* | Kunci momen torsi pengencang baut presisi | Wheel Detachment / Hub Failure |
| 3 | エア抜き | えあぬき | *ea-nuki* | Pembuangan angin palsu hidrolik minyak rem | Brake Vapor Lock Failure |
| 4 | リジットラック（馬） | りじっとらっく（うま） | *rijittorakku (uma)* | Penyangga rigid pengaman kolong mobil | Crushed Under Falling Vehicle |
| 5 | バッテリー比重 | ばってりーひじゅう | *batterii hijuu* | Berat jenis elektrolit asam sulfat aki | Battery Explosion / Acid Burn |
| 6 | ディスクローター | でぃすくろーたー | *disuku rootaa* | Piringan rotor cakram gesek rem | Brake Fade / Cracking |
| 7 | ブレーキパッド | ぶれーきぱっど | *bureeki paddo* | Kampas gesek rem cakram roda | Metal-to-Metal Friction Loss |
| 8 | 自動車検査（車検） | じどうしゃけんさ（しゃけん） | *jidousha kensa (shaken)* | Uji kelaikan jalan kendaraan berkala resmi | Statutory Legal Operation |
| 9 | ２柱リフト | にちゅうりふと | *nichuu rifuto* | Lift hidrolik dua pilar pengangkat mobil | Vehicle Drop Hazard |
| 10 | 非常停止スイッチ | ひじょうていしすいっち | *hijou teishi suitchi* | Tombol pemutus darurat mesin/lift bengkel | Emergency Lifeline Action |
| 11 | インパクトレンチ | いんぱくとれんち | *inpakuto renchi* | Kunci pas bertenaga angin pemutar baut | Bolt Stripping & Over-Torque |
| 12 | タイロッドエンド | たいろっどえんど | *tai roddo endo* | Sendi engsel kemudi kemudi roda depan | Total Steering Control Loss |
| 13 | ドライブシャフト | どらいぶしゃふと | *doraibu shafuto* | Poros penggerak putaran roda transmisi | Drive Axle Detachment |
| 14 | サーモスタット | さーもすたっと | *saamosutatto* | Katup pengatur suhu cairan pendingin mesin | Catastrophic Engine Overheat |
| 15 | ラジエーターキャップ | らじえーたーきゃっぷ | *rajieetaa kyappu* | Tutup bertekanan pendingin radiator | Scalding Hot Coolant Eruption |
| 16 | オイルエレメント | おいるえれめんと | *oiru eremento* | Saringan penyaring kotoran oli pelumas | Oil Starvation & Engine Seizure |
| 17 | タイミングベルト | たいみんぐべると | *taimingu beruto* | Sabuk sinkronisasi poros engkol dan noken | Valve-Piston Collision Crash |
| 18 | ファンベルト | ふぁんべると | *fan beruto* | Sabuk pemutar alternator dan pompa pendingin | Overheating & Electrical Loss |
| 19 | 故障診断機（OBD） | こしょうしんだんき | *koshou shindanki (OBD)* | Scanner pemindai kode kerusakan sensor mobil | Misdiagnosis of Fault |
| 20 | 絶縁手袋 | ぜつえんてぶくろ | *zetsuen tebukuro* | Sarung tangan karet isolasi mekanik HV/EV | Fatal High Voltage Shock |
| 21 | サービスプラグ | さーびすぷらぐ | *saabisu puragu* | Steker pemutus sirkuit baterai traksi HEV | High Voltage Arc Flash |
| 22 | クランクシャフト | くらんくしゃふと | *kuranku shafuto* | Poros engkol pengubah gerak torak mesin | Major Mechanical Breakdown |
| 23 | シリンダーヘッドガスケット | しりんだーへっどがすけっと | *shirindaa heddo gasuketto* | Paking perapat blok silinder mesin | Coolant-Oil Cross Contamination |
| 24 | ブレーキフルード | ぶれーきふるーど | *bureeki furuudo* | Minyak hidrolik sistem rem mobil (DOT 3/4) | Paint Stripping & Brake Loss |
| 25 | サイドスリップテスター | さいどすりっぷてすたー | *saidosurippu tesutaa* | Alat uji kelurusan jejak roda kemudi | Steering Drift & Tire Wear |
| 26 | スチーム洗車機 | すちーむせんしゃき | *suchiimu senshaki* | Mesin cuci uap panas pembersih sasis kolong | High Pressure Scalding |
| 27 | ジャッキアップポイント | じゃっきあっぷぽいんと | *jakki appu pointo* | Titik tumpu resmi pengangkatan bodi mobil | Floor Pan Deformation & Drop |
| 28 | 廃油処理 | はいゆしょり | *haiyu shori* | Pembuangan dan daur ulang oli bekas bengkel | Environmental Poison & Fire |
| 29 | オイルジョッキ | おいるじょっき | *oiru jokki* | Wadah corong penuang oli takar bersih | Foreign Particle Ingestion |
| 30 | ドレンボルト | どれんぼると | *doren boruto* | Baut sumbat pembuangan oli karter mesin | Oil Dump on Road Hazard |
| 31 | トレッド摩耗（TWI） | とれっどまもう | *toreddo mamou (TWI)* | Indikator batas keausan kembangan ban | Hydroplaning Aquaplaning Crash |
| 32 | ホイールナット | ほいーるなっと | *hoiiru natto* | Mur baut pengikat velg roda mobil | Wheel Flying Detachment |
| 33 | 差動装置（デフ） | さどうそうち（でふ） | *sadousouchi (defu)* | Gardan diferensial pembagi putaran roda | Drivetrain Lockup |
| 34 | 排気ガステスター | はいきがすてすたー | *haikigasu tesutaa* | Alat analisis kandungan CO/HC gas buang | Toxic CO Asphyxiation |
| 35 | コモンレール | こもんれーる | *komon reeru* | Pipa penampung solar injeksi tekanan tinggi | High Pressure Fluid Injection |
| 36 | ５Ｓ整理整頓 | ごえすせいりせいとん | *goesuseiri seiton* | Manajemen kerapian lantai bengkel bebas oli | Bengkel Slip & Fall Prevention |

---

## 5. DIRECTIVES K3 DARURAT & FORMULA YUBISASHI KOSHO

### Teriakan Darurat Spontan di Tempat Kerja:
- *「リフトから離れろ！車が傾いているぞ！」* (*Rifuto kara hanarero! Kuruma ga katamuite iru zo!* — Menjauh dari lift! Mobilnya miring!)
- *「開けるな！ラジエーターが沸騰している！」* (*Akeru na! Rajieetaa ga futtou shite iru!* — Jangan dibuka! Radiator sedang mendidih!)
- *「高圧遮断！サービスプラグを抜いたか？！」* (*Kouatsu shadan! Saabisu puragu wo nuita ka?!* — Putus tegangan tinggi! Sudah cabut service plug?!)

### Formula Point-and-Call (指差し呼称):
1. **Pengecekan Baut Roda Mobil:** *「ホイールナット、規定トルク締め付け、ヨシ！」*
2. **Pengecekan Safety Lock Lift:** *「リフト機械式ロック、噛み合い確認、ヨシ！」*
3. **Pengecekan Baut Kuras Oli Mesin:** *「オイルパンドレンボルト、締め付け良好、漏れなし、ヨシ！」*
4. **Pengecekan Nipple Rem Pasca-Bleeding:** *「ブリーダープラグ、増し締め確認、キャップ装着、ヨシ！」*

---

## 6. BANK SOAL UJIAN CBT JASPA RESMI

### Contoh Soal Ujian Teori (学科試験 ○×):
> **Soal 1:** 自動車用ホイールナットを締め付けるときは、規定トルクに関わらず、インパクトレンチを用いて最大出力で完全に締め込まなければならない。  
> **Kunci Jawaban:** **× (Salah)** (Baut roda wajib dikencangkan menggunakan kunci momen torsi/torque wrench sesuai spesifikasi pabrikan guna mencegah baut patah atau velg peyang).

> **Soal 2:** ディスクブレーキのブレーキフルード交換後、配管内に空気が残っていると、ペダルを踏んだときにスポンジを踏んだような感触になり、制動力が低下する。  
> **Kunci Jawaban:** **○ (Benar)** (Fenomena vapor lock atau masuknya angin palsu menyebabkan pedal rem amblas dan rem blong berbahaya).

### Contoh Soal Ujian Praktik On-Screen (実技試験):
> **Soal 1:** 画面の写真を見て、2柱リフトで車両を持ち上げる際、床上約10 cmの位置で一旦停止させて行わなければならない作業として、正しいものを選びなさい。  
> A. タイヤの空気圧を測定する  
> B. 車両を手で揺らして、リフト支持部の安定状態を確認する  
> C. エンジンオイルを抜き取る  
> D. ヘッドライトの点灯確認を行う  
> **Kunci Jawaban:** **B** (Uji goyang stabilitas sasis/yusuri kakunin pada ketinggian 10 cm wajib dilakukan sebelum mengangkat mobil ke ketinggian maksimal).
`;

fs.writeFileSync(path.join(sswDir, "SSW-06-AUTOMOBILE-MAINTENANCE-SYLLABUS.md"), ssw06Content, "utf8");
console.log("SSW-06 written successfully!");

// ==========================================
// SSW-07: SHIPBUILDING & MARINE MACHINERY
// ==========================================
const ssw07Content = `# SILABUS KEJURUAN RESMI NUGGET NIHONGO · SEKTOR 07: SHIPBUILDING & MARINE MACHINERY (PERKAPALAN & MARITIM)
**Kode Sektor:** \`SSW-SHIP-01\` · **Versi:** v2.0 (Corpus v30 Canonical Revision)  
**Status:** AUTHORITATIVE & EXHAUSTIVE SECTOR SYLLABUS  
**Kementerian Pembina:** Biro Maritim Kementerian Pertanahan, Infrastruktur, Transportasi dan Pariwisata Jepang (MLIT / 国土交通省海事局)  
**Badan Pelaksana Uji:** Nippon Kaiji Kyokai (ClassNK / 一般財団法人 日本海事協会)  
**Dasar Kurasi Primer:**
- \`reference-books/ssw/12_zousen_shipbuilding/Shipbuilding_Welding_Practical_Guide_JA.pdf\` & \`reference-books/ssw/12_zousen_shipbuilding/Shipbuilding_Welding_Sample_Exam_JA.pdf\`
- \`reference-books/ssw/12_zousen_shipbuilding/Shipbuilding_Machining_Practical_Guide_JA.pdf\` & \`reference-books/ssw/12_zousen_shipbuilding/Shipbuilding_Machining_Sample_Exam_JA.pdf\`
- \`reference-books/ssw/12_zousen_shipbuilding/Shipbuilding_Finishing_Sample_Exam_JA.pdf\` & \`reference-books/ssw/12_zousen_shipbuilding/Shipbuilding_Ironwork_Sample_Exam_JA.pdf\`
**Landasan Teoretis & Empiris:**
- Needs Analysis & Technical Lexicon (Nation & Hwang 1995 [VS-09]; Chung & Nation 2003 [VS-10])
- Cross-Cultural Communication in Heavy Engineering & HOU-REN-SO (Mustaqim & Priventa 2026 [VS-31]; Supriatnaningsih et al. 2024 [VS-33])
- Geminate Acoustic Intelligibility in Confined Shipyard Gemba (Husna & Febriyanti 2022 [EA-25])
- Maritime Industrial Safety Standards & Shiteki Koshou (JNIOSH 2020 [VS-39]; ClassNK 2024 [VS-50])

---

## 1. SPESIFIKASI UJIAN RESMI CLASSNK (STANDAR MARITIM MLIT)

Kandidat visa *Tokutei Ginou 1-gō* bidang Perkapalan menempuh ujian yang diselenggarakan oleh **ClassNK**:

\`\`\`
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                              CLASSNK SHIPBUILDING EVALUATION EXAM MATRIX                               │
├─────────────────────────┬────────────────────────────────────────┬─────────────┬───────────┬───────────┤
│ Komponen Ujian          │ Cakupan Ranah Pengujian                │ Jumlah Soal │ Durasi    │ Ambang    │
├─────────────────────────┼────────────────────────────────────────┼─────────────┼───────────┼───────────┤
│ 1. Ujian Teori          │ Material baja kapal, teknik las SMAW/  │ 30 Soal     │ 60 Menit  │ $\\ge 60\\%$│
│    (学科試験 - Gakka)   │ CO2, pembacaan simbol las gambar kapal,│ (Format     │           │ (18 / 30) │
│                         │ K3 ruang tertutup dan ketinggian dok   │  ○× True/   │           │           │
│                         │                                        │  False)     │           │           │
├─────────────────────────┼────────────────────────────────────────┼─────────────┼───────────┼───────────┤
│ 2. Ujian Praktik        │ 4 Kategori Spesialisasi:               │ Benda Kerja │ Sesuai    │ $\\ge 60\\%$│
│    (実技試験 - Jitsugi) │ A. Pengelasan Pelat Baja (溶接)        │ / Panduan   │ Spesifikasi│(Evaluasi  │
│                         │ B. Fabrikasi Besi Lambung (鉄工)       │ Tugas       │ Tugas     │ Visual &  │
│                         │ C. Finishing Perakitan Mesin (仕上げ)  │ Evaluasi    │ Praktik   │ Dimensi)  │
│                         │ D. Permesinan Komponen Kapal (機械加工)│             │           │           │
└─────────────────────────┴────────────────────────────────────────┴─────────────┴───────────┴───────────┘
\`\`\`

> **Ambang Kelulusan:** Peserta wajib mencapai nilai minimal $\ge 60\%$ pada Ujian Teori dan $\ge 60\%$ pada evaluasi Ujian Praktik.

---

## 2. JALUR OPERASIONAL GALANGAN KAPAL JEPANG (4 KEJURUAN)

1. **Pengelasan Struktur Kapal (造船溶接 - Welding):**
   - Las busur manual (SMAW), las busur gas CO2/MIG semi-otomatis, las busur rendam (*submerged arc welding*), pengelasan fillet posisi datar/vertikal/overhead pada pelat baja lambung tebal.
2. **Fabrikasi Besi Lambung Kapal (船体鉄工 - Ship Ironwork):**
   - Pemotongan termal gas oksi-asetilen/plasma, penandaan pelat (*marking*), pelurusan bentuk pelat baja menggunakan pemanasan api (*line heating / yaki-ire*), perakitan modul blok lambung (*hull block assembly*).
3. **Pemasangan & Finishing Mesin Kapal (舶用機関仕上げ - Marine Engine Fitting):**
   - Pemasangan mesin diesel utama, alignment poros baling-baling (*propeller shaft*), instalasi kemudi kapal (*rudder*), perakitan pipa bilga dan katup laut (*sea chest*).
4. **Pemesinan Komponen Mesin Laut (舶用機械加工 - Marine Machining):**
   - Pembubutan poros propeller berdiameter besar, pengefraisan blok silinder mesin diesel, pengeboran rumah bantalan buritan kapal (*stern tube*).

---

## 3. MODUL PEMBELAJARAN KURIKULUM (PEDAGOGICAL MODULES)

### MODUL 1: TEKNIK PENGELASAN STRUKTUR KAPAL (造船溶接技術)
- **Topik 1.1: Metalurgi Las & Simbol Gambar JIS Kapal:**
  - **Topik 1.1.1: Pengelasan Busur Gas CO2 (炭酸ガスアーク溶接):** Karakteristik kawat las berintikan fluks (*flux-cored wire*), penyetelan voltase busur dan kuat arus (amper), laju aliran pelindung gas CO2 ($20\text{–}25\text{ L/min}$).
  - **Topik 1.1.2: Pengelasan Sudut Fillet (すみ肉溶接 - Suminiku):** Ketinggian kaki las (*leg length*), tebal tenggorokan las (*throat thickness*), pencegahan cacat las takik gigit (*undercut*), dan terak terperangkap (*slag inclusion*).
- **Topik 1.2: Posisi Las & Pengendalian Deformasi Panas:**
  - **Topik 1.2.1: Posisi Pengelasan Datar, Vertikal & Di Atas Kepala (Overhead):** Penyesuaian sudut ayunan elektroda las pada posisi vertikal naik (*tate-muki koushin*).
  - **Topik 1.2.2: Pencegahan Distorsi & Retak Las (溶接変形・割れ):** Urutan pengelasan simetris berselang-seling (*skip welding*), pemanasan awal baja tebal (*preheating* 100°C–150°C) guna mencegah retak dingin hidrogen.

---

### MODUL 2: FABRIKASI BESI LAMBUNG KAPAL (船体鉄工とブロック組立)
- **Topik 2.1: Pemotongan Termal & Penandaan Pelat Baja:**
  - **Topik 2.1.1: Pemotongan Gas Oksi-Asetilen (ガス切断):** Pengaturan tekanan oksigen potong dan asetilen, jarak ujung nozzle ke pelat (3–5 mm), pencegahan fenomena sambaran api balik (*flashback*).
  - **Topik 2.1.2: Pelurusan Garis Termal Api (線状加熱 - Line Heating):** Teknik pemanasan lokal dengan obor api gas dan pendinginan air cepat untuk membentuk kelengkungan pelat lambung kapal secara presisi.
- **Topik 2.2: Perakitan Modul Blok Lambung Kapal:**
  - **Topik 2.2.1: Ereksi Struktur Gading & Sekat Kedap Air (肋骨・隔壁):** Penyetelan modul gading melintang (*transverse frame*), sekat kedap air (*watertight bulkhead*), dan dasar ganda (*double bottom*).
  - **Topik 2.2.2: Pemasangan Klem Tarik & Baji Penyetel (ピース・矢入れ):** Penggunaan dongkrak hidrolik mini dan klem plat untuk merapatkan celah sambungan pelat sebelum pengelasan permanen.

---

### MODUL 3: FINISHING & PERMESINAN KAPAL (機関仕上げと機械加工)
- **Topik 3.1: Alignment Poros Baling-Baling & Mesin Diesel:**
  - **Topik 3.1.1: Penjajaran Poros Kemudi & Propeller (軸系芯出し):** Pengukuran celah kelurusan kopling menggunakan feeler gauge dan dial indicator dengan toleransi $\le 0.05\text{ mm}$.
  - **Topik 3.1.2: Pengepasan Kontak Permukaan Kerucut Baling-Baling:** Pengujian kontak permukaan tirus baling-baling dengan poros menggunakan pewarna biru Prusia (*komyotan / blue paste*) mencapai kontak $\ge 70\%$.
- **Topik 3.2: Pipa Laut & Pengujian Kebocoran Lambung:**
  - **Topik 3.2.1: Katup Laut & Saluran Pendingin Mesin (シーチェスト):** Pemasangan saringan hisap air laut dan katup perunggu anti-korosi air asin.
  - **Topik 3.2.2: Pengujian Tekanan Kompartemen Tangki Kedap Air:** Uji tekanan hidrostatik air dan uji semprotan selang bertekanan tinggi (*hose test*) pada sambungan pelat lambung kapal.

---

### MODUL 4: K3 GALANGAN KAPAL & RUANG TERTUTUP (造船安全と酸欠防止)
- **Topik 4.1: Pencegahan Bencana Kekurangan Oksigen & Gas Beracun (酸素欠乏症):**
  - **Topik 4.1.1: Pengukuran Kadar Oksigen Sebelum Memasuki Tangki:** Wajib mengukur kadar oksigen udara ($\ge 18\%$ aman; bahaya fatal jika $< 18\%$) dan gas hidrogen sulfida pada tangki ballast/double bottom tertutup.
  - **Topik 4.1.2: Ventilasi Paksa Ruang Sempit Blower Udara:** Pemasangan pipa saluran blower ventilasi terus-menerus selama bekerja di kompartemen sempit kapal.
- **Topik 4.2: K3 Bekerja di Ketinggian Dok Kering (高所作業):**
  - **Topik 4.2.1: Penggunaan Sabuk Pengaman Full Harness 2-Hook:** Kewajiban memasang kedua pengait tali (*nicho-gake*) secara bergantian pada pipa perancah dok saat bergerak di ketinggian.
- **Topik 4.3: HOU-REN-SO Saat Kilas Balik Api Gas Asetilen:**
  - **Topik 4.3.1: SOP Pemadaman Kilas Balik Tabung Gas:** Prosedur segera menutup katup oksigen disusul katup asetilen saat terdengar letupan mendesis di selang potong.

---

## 4. KOSAKATA TEKNIS LAYER 2 (CLASSNK OFFICIAL SHIPBUILDING LEXICON)

| No | Kanji | Kana | Romaji | Indonesian Gloss | High-Stakes Risk Category |
|---|---|---|---|---|---|
| 1 | すみ肉溶接 | すみにくようせつ | *suminiku yousetsu* | Pengelasan sudut pertemuan dua pelat baja | Weld Root Failure / Cracking |
| 2 | 酸素欠乏症 | さんそけつぼうしょう | *sanso ketsuboushou* | Asfiksia fatal kekurangan oksigen dalam tangki | Instant Lethal Asphyxiation (<18% O2) |
| 3 | 船殻ブロック | せんかくぶろっく | *senkaku burokku* | Modul blok raksasa baja struktur badan kapal | Crane Rigging Crush Disaster |
| 4 | スラグ巻き込み | すらぐまきこみ | *suragu makikomi* | Cacat las terak logam terjebak di jalur sambungan | Internal Fracture Defect |
| 5 | フルハーネス | ふるはーねす | *furu haanesu* | Sabuk keselamatan tubuh penuh pencegah jatuh | High Fall Fatality in Drydock |
| 6 | 逆火（バックファイア）| ぎゃっか | *gyakka (bakku faia)* | Sambaran api las merambat mundur ke dalam selang | Gas Cylinder Explosion Hazard |
| 7 | アンダーカット | あんだーかっと | *andaa katto* | Cacat lekukan parit termakan di tepi jalur las | Stress Concentration Failure |
| 8 | 船台・ドック | せんだい・どっく | *sendai / dokku* | Dok kering area perakitan dan peluncuran kapal | Structural Fall & Flood Risk |
| 9 | 炭酸ガスアーク溶接 | たんさんがすあーくようせつ | *tansan gasu aaku yousetsu* | Pengelasan busur listrik terlindung gas CO2 | UV Arc Burn & Electric Shock |
| 10 | 非常停止スイッチ | ひじょうていしすいっち | *hijou teishi suitchi* | Tombol pemutus darurat sistem derek galangan | Immediate Danger Escalation |
| 11 | 二丁掛け | にちょうがけ | *nichou gake* | Pemasangan kait ganda tali pengaman bergantian | 100% Tie-Off Compliance |
| 12 | 線状加熱 | せんじょうかねつ | *senjou kanetsu* | Pemanasan garis obor pelengkung pelat lambung | Fire & Severe Thermal Burn |
| 13 | シーチェスト | しーちぇすと | *shii chesuto* | Kotak katup hisap air laut pendingin mesin | Ship Flooding Hazard |
| 14 | 二重底（ダブルボトム）| にじゅうそこ | *nijuusoko (daburu botomu)* | Kompartemen dasar ganda tangki ballast kapal | Confined Space Trap & Anoxia |
| 15 | 開先加工 | かいさきかこう | *kaisaki kakou* | Pembuatan celah bevel pada tepi pelat sambung | Lack of Fusion Defect |
| 16 | ガウジング | がうじんぐ | *gaujingu* | Peleburan busur udara pembersih akar las cacat | Molten Metal Flying Hazard |
| 17 | プロペラ軸 | ぷろぺらじく | *puropera jiku* | Poros transmisi baja pemutar baling-baling | Heavy Component Rigging Hazard |
| 18 | 芯出し測定 | しんだしそくてい | *shindashi sokutei* | Penjajaran toleransi sumbu poros baling-baling | Excessive Vibration Damage |
| 19 | 送風機（ブロワー） | そうふうき | *soufuuki (burowaa)* | Kipas blower peniup udara segar ke kompartemen | Atmospheric Stagnation |
| 20 | 隔壁（バルクヘッド） | かくへき | *kakuheki (barukuheddo)* | Dinding sekat kedap air pemisah kompartemen | Watertight Integrity Breach |
| 21 | ガス検知器 | がすけんちき | *gasu kenchiki* | Alat pendeteksi kadar oksigen dan gas beracun | Sensor Inaccuracy Hazard |
| 22 | 玉掛けワイヤー | たまかけわいやー | *tamakake waiyaa* | Tali kawat sling pengikat blok modul kapal | Cable Snap Rigging Disaster |
| 23 | 遮光メガネ | しゃこうめがね | *shakou megane* | Kacamata pelindung radiasi sinar busur api las | Arc Eye Keratitis (Photokeratitis) |
| 24 | 防じんマスク | ぼうじんますく | *boujin masuku* | Masker respirator penyaring partikel asap las | Metal Fume Fever & Pneumoconiosis |
| 25 | 水圧試験 | すいあつしけん | *suiatsu shiken* | Uji tekanan air penguji kebocoran tangki kapal | High-Pressure Joint Burst |
| 26 | 歪み取り | ひずみとり | *hizumitori* | Prosedur pelurusan deformasi pelat pasca-las | Structural Misalignment |
| 27 | 溶接棒乾燥機 | ようせつぼうかんそうき | *yousetsubou kansouki* | Oven pemanas pengering elektroda las SMAW | Hydrogen Cracking Infiltration |
| 28 | 塗膜検査 | とまくけんさ | *tomaku kensa* | Pengukuran ketebalan cat anti-karat lambung | Rapid Marine Bio-fouling |
| 29 | 亜鉛板（アノード） | あえんばん | *aenban (anoodo)* | Anoda korban pencegah korosi galvanik lambung | Premature Hull Electrolysis |
| 30 | 舵（ラダー） | かじ（らだー） | *kaji (radaa)* | Daun kemudi kendali arah navigasi kapal | Rudder Pin Dislodgement |
| 31 | 乾舷（フリーボード） | かんげん | *kangen (furiiboodo)* | Jarak lambung timbul dari air ke geladak | Overloading & Capsizing |
| 32 | 防爆照明 | ぼうばくしょうめい | *boubaku shoumei* | Lampu portabel tahan ledakan di tangki bahan bakar | Confined Vapor Spark Explosion |
| 33 | 船体傾斜計 | せんたいけいしゃけい | *sentai keishakei* | Klinometer pengukur kemiringan kapal di dok | Launching Tipping Hazard |
| 34 | スパッタ除去 | すぱったじょきょ | *supatta jokyo* | Pembersihan butiran percikan las pada pelat | Coating Blistering Defect |
| 35 | 避難タラップ | ひなんたらっぷ | *hinan tarappu* | Tangga jembatan darurat penghubung kapal ke dermaga | Gangway Structural Collapse |
| 36 | ５Ｓ安全通路 | ごえすあんぜんつうろ | *goesuanzen tsuuro* | Pembersihan jalur evakuasi kabel dan pipa di dok | Tripping Hazard over Welding Leads |

---

## 5. DIRECTIVES K3 DARURAT & FORMULA YUBISASHI KOSHO

### Teriakan Darurat Spontan di Tempat Kerja:
- *「中に入るな！酸素濃度が16パーセントしかない！」* (*Naka ni hairu na! Sanso noudo ga 16 paasento shika nai!* — Jangan masuk! Kadar oksigen cuma 16 persen!)
- *「逆火だ！アセチレンを直ちに止めろ！」* (*Gyakka da! Asechiren wo tadachini tomero!* — Sambaran api balik! Segera tutup asetilen!)
- *「吊り荷の下に入るな！ブロックから離れろ！」* (*Tsuri-ni no shita ni hairu na! Burokku kara hanarero!* — Jangan masuk ke bawah muatan gantung! Menjauh dari blok!)

### Formula Point-and-Call (指差し呼称):
1. **Pengecekan Kadar Oksigen Tangki:** *「タンク内酸素濃度、21パーセント、正常、ヨシ！」*
2. **Pengecekan Sabuk Pengaman Ketinggian:** *「フルハーネス安全帯、二丁掛け完全ロック、ヨシ！」*
3. **Pengecekan Katup Penahan Sambaran Balik:** *「乾式安全器（アレスター）、装着確認、ヨシ！」*
4. **Pengecekan Ketinggian Kaki Las Fillet:** *「すみ肉脚長、ゲージ測定クリア、ヨシ！」*

---

## 6. BANK SOAL UJIAN CBT CLASSNK RESMI

### Contoh Soal Ujian Teori (学科試験 ○×):
> **Soal 1:** 船体の二重底（ダブルボトム）などの密閉区画に入って作業を行うときは、作業前に酸素濃度を測定し、酸素濃度が18%以上であることを確認しなければならない。  
> **Kunci Jawaban:** **○ (Benar)** (Batas aman kadar oksigen udara wajib $\ge 18\%$; di bawah angka ini pekerja akan kehilangan kesadaran seketika).

> **Soal 2:** 炭酸ガスアーク溶接を行う際、溶接部の風速が強くなるとシールドガスが吹き飛ばされてブローホール（気泡欠陥）が発生しやすくなる。  
> **Kunci Jawaban:** **○ (Benar)** (Angin meniup selimut gas pelindung sehingga cairan las terkontaminasi nitrogen dan oksigen udara pemicu cacat blowhole).

### Contoh Soal Ujian Praktik Evaluasi (実技試験):
> **Soal 1:** 溶接後のすみ肉ビード表面に生じる欠陥のうち、母材が掘られて溝状に窪んでいる欠陥（アンダーカット）の主な原因として、正しいものを選びなさい。  
> A. 溶接電流が高すぎること、またはアーク長が長すぎること  
> B. 溶接速度が遅すぎること  
> C. シールドガスの流量が多すぎること  
> D. 溶接棒が乾燥しすぎていること  
> **Kunci Jawaban:** **A** (Kuat arus terlalu tinggi atau busur terlalu panjang membakar dan mengikis logam dasar induk membentuk parit undercut).
`;

fs.writeFileSync(path.join(sswDir, "SSW-07-SHIPBUILDING-MARINE-SYLLABUS.md"), ssw07Content, "utf8");
console.log("SSW-07 written successfully!");

// ==========================================
// SSW-08: AVIATION INDUSTRY
// ==========================================
const ssw08Content = `# SILABUS KEJURUAN RESMI NUGGET NIHONGO · SEKTOR 08: AVIATION INDUSTRY (GROUND HANDLING & MAINTENANCE / INDUSTRI PENERBANGAN)
**Kode Sektor:** \`SSW-AVIA-01\` · **Versi:** v2.0 (Corpus v30 Canonical Revision)  
**Status:** AUTHORITATIVE & EXHAUSTIVE SECTOR SYLLABUS  
**Kementerian Pembina:** Biro Penerbangan Sipil Jepang (JCAB) & Kementerian Pertanahan, Infrastruktur, Transportasi dan Pariwisata (MLIT / 国土交通省航空局)  
**Badan Pelaksana Uji:** Asosiasi Teknisi Penerbangan Jepang (JAEA / 公益社団法人 日本航空技術協会) & Prometric  
**Dasar Kurasi Primer:**
- \`reference-books/ssw/10_koukuu_aviation/Aviation_Ground_Handling_Safety_Textbook_JA.pdf\` (26 halaman) & \`reference-books/ssw/10_koukuu_aviation/Aviation_Ground_Handling_Operations_Textbook_JA.pdf\` (52 halaman)
- \`reference-books/ssw/10_koukuu_aviation/Aviation_Maintenance_Basic_Skills_Textbook_EN_JA.pdf\` & \`reference-books/ssw/10_koukuu_aviation/Aviation_Maintenance_Safety_Textbook_EN_JA.pdf\`
- \`reference-books/ssw/10_koukuu_aviation/Aviation_Ground_Handling_Sample_Exam_JA.pdf\` & \`reference-books/ssw/10_koukuu_aviation/Aviation_Maintenance_Sample_Exam_JA.pdf\`
**Landasan Teoretis & Empiris:**
- Needs Analysis & Technical Lexicon (Nation & Hwang 1995 [VS-09]; Chung & Nation 2003 [VS-10])
- Cross-Cultural Communication in Ramp Operations & HOU-REN-SO (Mustaqim & Priventa 2026 [VS-31]; Supriatnaningsih et al. 2024 [VS-33])
- Geminate Acoustic Precision in High-Noise Jet Apron Environments (Husna & Febriyanti 2022 [EA-25])
- Industrial Ramp Safety Standards & Point-and-Call Protocols (JNIOSH 2020 [VS-39]; JAGHA / JAEA & MLIT 2024 [VS-51])

---

## 1. SPESIFIKASI UJIAN RESMI PROMETRIC CBT (STANDAR JAEA / MLIT JCAB)

Kandidat visa *Tokutei Ginou 1-gō* bidang Penerbangan menempuh ujian Computer-Based Testing (CBT) dengan spesifikasi regulasi resmi:

\`\`\`
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                              PROMETRIC CBT AVIATION INDUSTRY EXAM MATRIX                               │
├─────────────────────────┬────────────────────────────────────────┬─────────────┬───────────┬───────────┤
│ Jalur Pengujian         │ Cakupan Ranah Pengujian                │ Jumlah Soal │ Durasi    │ Ambang    │
├─────────────────────────┼────────────────────────────────────────┼─────────────┼───────────┼───────────┤
│ 1. Airport Ground       │ Keselamatan sisi udara apron/ramp,     │ 40 Soal     │ 60 Menit  │ $\\ge 65\\%$│
│    Handling CBT         │ operasi peralatan darat GSE, penanganan│ (Pilihan    │           │ (26 / 40) │
│                         │ kargo kontainer ULD, pencegahan FOD,   │  Ganda CBT) │           │           │
│                         │ dan sinyal pemanduan pesawat           │             │           │           │
├─────────────────────────┼────────────────────────────────────────┼─────────────┼───────────┼───────────┤
│ 2. Aircraft Maintenance │ Keterampilan mekanik dasar pesawat,    │ 40 Soal     │ 60 Menit  │ $\\ge 65\\%$│
│    CBT                  │ safety wire kawat pengaman, torsi baut,│ (Pilihan    │           │ (26 / 40) │
│                         │ sistem hidrolik, dan K3 hanggar        │  Ganda CBT) │           │           │
└─────────────────────────┴────────────────────────────────────────┴─────────────┴───────────┴───────────┘
\`\`\`

> **Catatan Bahasa Ujian:** Teks soal disajikan dalam **Bahasa Jepang berfurigana**, dengan glosarium istilah operasional standar ICAO/IATA dalam Bahasa Inggris (misal: FOD, Marshalling, Towing Tractor, Chocks).

---

## 2. DUA KATEGORI SPESIALISASI PENERBANGAN JEPANG

1. **Penanganan Operasi Darat Bandara (空港グランドハンドリング - Ground Handling):**
   - Marshalling pemanduan parkir pesawat, pemasangan ganjal roda (*chocks*), penarikan pesawat mundur (*pushback*), bongkar muat bagasi conveyer belt loader, pengangkutan kontainer kargo Unit Load Device (ULD).
2. **Pemeliharaan & Rekayasa Rangka Pesawat (航空機整備 - Aircraft Maintenance):**
   - Pemeriksaan harian transit (*transit check*), pelumasan bantalan flight control, pengikatan kawat puntir pengaman (*safety wire / lockwire*), pemasangan pin belah (*cotter pin*), penggantian roda pendarat (*landing gear brake assembly*).

---

## 3. MODUL PEMBELAJARAN KURIKULUM (PEDAGOGICAL MODULES)

### MODUL 1: KESELAMATAN SISI UDARA & ZONA BAHAYA APRON (エプロン安全管理)
- **Topik 1.1: Regulasi Kendaraan GSE & Batas Kecepatan Sisi Udara:**
  - **Topik 1.1.1: Zona Pergerakan Pesawat & Batas Kecepatan:** Jalur jalan darat ramp (maksimal 30 km/jam), area sekitar badan pesawat (maksimal 15 km/jam), dan larangan mendahului pesawat yang sedang taxying.
  - **Topik 1.1.2: Jalur Evakuasi Peralatan Darat (ERA - Equipment Restraint Area):** Penempatan traktor penarik dan dollies hanya di dalam garis batas putih; larangan meninggalkan GSE di dalam zona aman pesawat (*Aircraft Safety Zone*).
- **Topik 1.2: Zona Bahaya Maut Mesin Jet (ジェットエンジン危険区域):**
  - **Topik 1.2.1: Bahaya Tersedot Turbin Mesin Jet (吸い込み危険域 - Ingestion Zone):** Radius steril hisap udara turbin jet (minimal 7.5 meter di depan intake saat idle, 10 meter saat breakaway power); bahaya fatal tersedot tubuh masuk ke dalam sudu turbin.
  - **Topik 1.2.2: Bahaya Semburan Panas Gas Buang (ブラスト危険域 - Jet Blast):** Radius bahaya semburan angin gas buang mesin jet berkecapatan ratusan km/jam dan bersuhu ratusan derajat Celcius di belakang ekor pesawat.

---

### MODUL 2: OPERASI GROUND SUPPORT EQUIPMENT (GSE) & KARGO (GSE車両と貨物)
- **Topik 2.1: Pengoperasian Traktor Penarik & Conveyor Belt Loader:**
  - **Topik 2.1.1: Pemanduan Mundur Traktor Pushback Pesawat:** Prosedur komunikasi interfon headset dengan kokpit pilot (*Flight Interphone*), konfirmasi pin steering bypass, dan pelepasan chocks.
  - **Topik 2.1.2: Pendekatan Mobil Conveyor Belt ke Pintu Kargo:** Berhenti sejenak (*ichi-ji teishi*) pada jarak 1 meter dari pintu kargo pesawat sebelum merapatkan bumper karet secara presisi.
- **Topik 2.2: Penanganan Kontainer Kargo ULD & Barang Berbahaya:**
  - **Topik 2.2.1: Penguncian Kargo Palet & Kontainer (ULD Locks):** Pengecekan kait pengunci rel lantai kargo (*pallet locks / container stoppers*) demi mencegah muatan bergeser (*nikuzure*) saat lepas landas.
  - **Topik 2.2.2: Identifikasi Label Regulasi Barang Berbahaya (Dangerous Goods):** Prosedur segregasi baterai lithium-ion, gas bertekanan, dan bahan peledak sesuai regulasi DGR IATA.

---

### MODUL 3: TEKNIK MEKANIK PESAWAT & SAFETY WIRING (整備基本技術)
- **Topik 3.1: Pemasangan Kawat Pengaman Baut (セーフティワイヤー - Lockwire):**
  - **Topik 3.1.1: Prosedur Puntiran Ganda Kawat Stainless Steel:** Penggunaan tang pemuntir kawat (*wire twister*), standar puntiran 6–8 pilinan per inci, arah tarikan kawat wajib mengencangkan kepala baut (*positive wiring*).
  - **Topik 3.1.2: Pemotongan & Pembengkokan Ujung Kawat (*Pigtail*):** Pemotongan sisa pilinan sepanjang 1/4–1/2 inci dan menekuk ujungnya ke arah dalam guna mencegah luka sayat mekanik.
- **Topik 3.2: Pemasangan Cotter Pin & Pengencangan Torsi Presisi:**
  - **Topik 3.2.1: Pengencangan Mur Bermahkota (キャッスルナット - Castle Nut):** Penyelarasan lubang baut dengan celah mur tanpa melampaui batas torsi maksimal yang diizinkan manual perawatan pesawat.
  - **Topik 3.2.2: Prosedur Pembengkokan Kaki Cotter Pin:** Kaki atas ditekuk melipat di atas ujung baut, kaki bawah ditekuk merapat ke permukaan mur kastel.

---

### MODUL 4: PENCEGAHAN FOD & MANAJEMEN RISIKO PENERBANGAN (FOD防止と安全)
- **Topik 4.1: Pencegahan Kerusakan Benda Asing (外国物質損傷 - FOD):**
  - **Topik 4.1.1: Kampanye Pembersihan Ramp FOD Walk:** Inspeksi berjalan berbaris membersihkan baut lepas, kawat potongan, batu kerikil, dan serpihan plastik di sepanjang landas pacu dan taxiway.
  - **Topik 4.1.2: Manajemen Kantong & Perkakas Tool Control Hanggar:** Kewajiban pengosongan saku pakaian kerja dari benda lepas dan perhitungan jumlah perkakas di shadow board sebelum pesawat dirilis (*tool sign-off*).
- **Topik 4.2: Pemasangan Pelindung Sensor & Pin Pengunci:**
  - **Topik 4.2.1: Spanduk Peringatan "Remove Before Flight":** Pemasangan penutup tabung pitot (*pitot tube covers*), pin pengunci landing gear ground lock pin, dan verifikasi pelepasan sebelum penerbangan.
- **Topik 4.3: HOU-REN-SO Saat Benturan Kendaraan GSE ke Bodi Pesawat:**
  - **Topik 4.3.1: Pelaporan Benturan Fisik Bodi Pesawat (Aircraft Strike):** Sekalipun hanya goresan cat mikro, wajib lapor seketika ke manajer ramp dan teknisi penerbangan; menyembunyikan benturan dapat menyebabkan dekompresi meledak di udara!

---

## 4. KOSAKATA TEKNIS LAYER 2 (JAEA OFFICIAL AVIATION LEXICON)

| No | Kanji | Kana | Romaji | Indonesian Gloss | High-Stakes Risk Category |
|---|---|---|---|---|---|
| 1 | 外国物質損傷（FOD）| がいこくぶっしつそんしょう | *gaikoku busshitsu sons кра (FOD)* | Kerusakan mesin pesawat akibat serpihan benda asing | Fatal In-Flight Engine Failure |
| 2 | ジェットエンジン吸い込み | じぇっとえんじんすいこみ | *jetto enjin suikomi* | Bahaya maut tersedot pusaran udara mesin jet | Instant Dismemberment Fatality |
| 3 | セーフティワイヤー | せーふてぃわいやー | *seefutii waiyaa* | Kawat pengaman puntir baut anti-longgar pesawat | Fastener Back-out Disaster |
| 4 | チョーク（輪止め） | ちょーく（わどめ） | *chooku (wadome)* | Balok ganjal roda pendarat pesawat terbang | Uncontrolled Aircraft Rollaway |
| 5 | トーイングトラクター | とーいんぐとらくたー | *tooingu torakutaa* | Kendaraan traktor penarik gerobak kargo bagasi | Ramp Collision & Overturn |
| 6 | プッシュバック | ぷっしゅばっく | *pusshubakku* | Prosedur mendorong mundur pesawat dari garbarata | Collision with Ground Crew/GSE |
| 7 | マーシャリング | まーしゃりんぐ | *maasharingu* | Pemanduan parkir pesawat dengan tongkat sinyal | Wingtip Strike Hazard |
| 8 | ロックピン | ろっくぴん | *rokku pin* | Pin pengunci sistem kemudi roda pendarat depan | Steering Bypass Inadvertence |
| 9 | 危険物（DG） | きけんぶつ | *kikenbutsu (DG)* | Barang muatan kargo berbahaya berlabel IATA | In-Flight Fire & Explosion |
| 10 | 誘導路（タクシーウェイ）| ゆうどうろ | *yuudouro (takushiiwei)* | Jalur pergerakan pesawat dari apron ke landasan | Runway Incursion Inadvertence |
| 11 | 非常停止ボタン | ひじょうていしぼたん | *hijou teishi botan* | Tombol pemutus darurat sistem konveyor kargo | Immediate Emergency Halt |
| 12 | ジェットブラスト | じぇっとぶらすと | *jetto burasuto* | Semburan angin gas buang panas ekor mesin jet | Personnel/GSE Blown Away |
| 13 | ピトー管カバー | ぴとーかんかばー | *pitookan kabaa* | Sarung penutup tabung sensor kecepatan udara | Unreliable Airspeed Disaster |
| 14 | ベルトローダー | べるとろーだー | *beruto roodaa* | Kendaraan ban berjalan pemuat bagasi ke lambung | Aircraft Hull Impact Dent |
| 15 | キャッスルナット | きゃっするなっと | *kyassuru natto* | Mur kastel berlubang slot pin pengunci mekanik | Loss of Flight Control Linkage |
| 16 | コッターピン | こったーぴん | *kottaa pin* | Pin belah pengaman anti-lepas mur kastel | Mechanical Fastener Disengagement |
| 17 | 航空貨物コンテナ（ULD）| こうくうかもつこんてな | *koukuu kamotsu kontena (ULD)* | Kontainer kargo standar bentuk bodi pesawat | Unlatched In-Flight Cargo Shift |
| 18 | イヤーマフ（防音具）| いやーまふ | *iyaamafu* | Pelindung telinga peredam kebisingan mesin jet | Severe Noise-Induced Hearing Loss |
| 19 | 航空機接触事故 | こうくうきせっしょくじこ | *koukuuki sesshoku jiko* | Insiden tabrakan kendaraan GSE dengan bodi pesawat | Unreported Structural Breach |
| 20 | 一時停止線 | いちじていしせん | *ichiji teishisen* | Garis batas putih wajib berhenti sebelum area pesawat | Runway/Apron Unauthorized Intrusion |
| 21 | ステム（着陸装置） | すてむ（ちゃくりくそうち） | *sutemu (chakuriku souchi)* | Unit kaki roda pendarat pesawat (*landing gear*) | Gear Collapse on Ground |
| 22 | 油圧作動油（スカイドロール）| ゆあつさどうゆ | *yuatsu sadouyu (sukaido rooru)*| Cairan hidrolik pesawat tahan api ester fosfat | Severe Chemical Burn to Eyes |
| 23 | トルクレンチ校正 | とるくれんちこうせい | *toruku renchi kousei* | Kalibrasi presisi kunci torsi baut struktural | Over/Under Torquing Disaster |
| 24 | フライトインターホン | ふらいといんたーほん | *furaito intaahon* | Sambungan komunikasi kabel darat teknisi ke kokpit | Loss of Ramp-Cockpit Comm |
| 25 | デアイシング（防除氷）| であいしんぐ | *de aishingu* | Penyemprotan cairan penghilang lapisan es pesawat | In-Flight Stall Aerodynamic Loss |
| 26 | タグ（手荷物札） | たぐ（てにもつふだ） | *tagu (tenimotsufuda)* | Label barcode pengenal rute bagasi penumpang | Mishandled Passenger Baggage |
| 27 | ハイリフトローダー | はいりふとろーだー | *hai rifuto roodaa* | Mobil lift hidrolik pengangkat kontainer ULD | High-Altitude Platform Fall |
| 28 | パレットロック | ぱれっとろっく | *paretto rokku* | Klem pengunci palet kargo pada lantai kompartemen | Cargo Shifting Disaster |
| 29 | 工具管理棚 | こうぐかんりだな | *kougu kanridana* | Papan shadow board verifikasi keberadaan perkakas | Tool Left in Engine (FOD) |
| 30 | センサ保護カバー | せんさほごかばー | *sensa hogo kabaa* | Penutup pelindung probe sensor sudut serang (AoA) | Erroneous Autopilot Response |
| 31 | 給油作業安全 | きゅうゆさぎょうあんぜん | *kyuuyu sagyou anzen* | Protokol pentanahan grounding selang bahan bakar jet | Static Fuel Vapor Ignition Fire |
| 32 | リフレクターベスト | りふれくたーべすと | *rifurektaa besuto* | Rompi scotlite visibilitas tinggi wajib sisi udara | Ramp Ground Worker Run-Over |
| 33 | 制限区域立入証 | せいげんくいきたちいりしょう| *seigen kuiki tachiirishou* | Kartu ID pas izin masuk steril bandara | Airport Security Breach Penalty |
| 34 | ノーズギアステアリングピン | のーずぎあすてありんぐぴん | *noozu gia sutearingu pin* | Pin pelepas sistem kemudi roda depan saat pushback | Nosewheel Mechanism Shearing |
| 35 | パッセンジャーステップ | ぱっせんじゃーすてっぷ | *passenjaa suteppu* | Tangga bergerak jalan naik-turun penumpang pesawat | Passenger Fall from Height |
| 36 | ５Ｓエプロン清掃 | ごえすえぷろんせいそう | *goesuepuron seisou* | Pembersihan tumpahan oli dan baut di pelataran apron | Complete Aviation Safety Culture |

---

## 5. DIRECTIVES K3 DARURAT & FORMULA YUBISASHI KOSHO

### Teriakan Darurat Spontan di Tempat Kerja:
- *「止まれ！エンジン吸い込み危険域に入るな！」* (*Tomare! Enjin suikomi kiken'iki ni hairu na!* — Berhenti! Jangan masuk zona hisap mesin!)
- *「GSE停止！機体に接触するぞ！」* (*Jii-esu-ii teishi! Kitai ni sesshoku suru zo!* — Hentikan GSE! Kau bisa menabrak bodi pesawat!)
- *「FOD発見！エンジン始動前に回収しろ！」* (*Efu-oo-dii hakken! Enjin shidoumae ni kaishuu shiro!* — Temuan FOD! Ambil sebelum mesin dinyalakan!)

### Formula Point-and-Call (指差し呼称):
1. **Pengecekan Ganjal Roda Pesawat:** *「ノーズギアチョーク、挟み込み装着、ヨシ！」*
2. **Pengecekan Pin Kemudi Pushback:** *「ステアリングバイパスピン、挿入確認、ヨシ！」*
3. **Pengecekan Kebersihan Ramp FOD:** *「エプロン路面、FODなし、クリア、ヨシ！」*
4. **Pengecekan Kawat Pengaman Baut:** *「セーフティワイヤー、確実な締め方向、ヨシ！」*

---

## 6. BANK SOAL UJIAN CBT JAEA RESMI

### Contoh Soal Ujian Teori Ground Handling (CBT 4 Pilihan):
> **Soal 1:** 航空機エンジンの吸い込み危険区域（インジェスチョン・ゾーン）に関する記述として、最も適切なものを１つ選びなさい。  
> １. アイドル回転中であっても、エンジン前面の規定距離内は強い吸引力が発生するため、絶対に立ち入ってはならない。  
> ２. 航空機の翼端灯（ナビゲーションライト）が点灯している間は、エンジン前面に近づいても安全である。  
> ３. 荷物運搬用のトーイングトラクターであれば、吸い込み区域を横断して走行してもよい。  
> ４. エンジン停止直後であれば、ファンブレードに触れて温度を確認しなければならない。  
> **Kunci Jawaban:** **1** (Intake mesin jet memiliki daya hisap luar biasa mematikan bahkan pada putaran idle; wajib steril dari personel dan kendaraan).

### Contoh Soal Ujian Teori Aircraft Maintenance (CBT 4 Pilihan):
> **Soal 1:** 航空機部品のセーフティワイヤー（ロックワイヤー）の施工方法として、正しいものを１つ選びなさい。  
> １. ワイヤーを引っ張ったとき、ボルトが緩む方向に力がかかるように取り付ける。  
> ２. ワイヤーを引っ張ったとき、ボルトが締まる方向（ポジティブ・ワイヤリング）に張力がかかるように取り付ける。  
> ３. ワイヤーの撚りピッチ（ツイスト数）は、１インチあたり15回以上でなければならない。  
> ４. 切断後のワイヤー先端部（ピグテール）は、作業者の怪我を防ぐために外側に向けて真っ直ぐ伸ばしておく。  
> **Kunci Jawaban:** **2** (Kawat pengaman wajib dipasang sedemikian rupa sehingga tarikan kawat memberikan gaya pengencangan pada baut/positive wiring).
`;

fs.writeFileSync(path.join(sswDir, "SSW-08-AVIATION-INDUSTRY-SYLLABUS.md"), ssw08Content, "utf8");
console.log("SSW-08 written successfully!");
