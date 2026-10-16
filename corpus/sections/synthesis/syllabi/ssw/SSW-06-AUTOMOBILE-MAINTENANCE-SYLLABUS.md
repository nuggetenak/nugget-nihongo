# SILABUS KEJURUAN RESMI NUGGET NIHONGO · SEKTOR 06: AUTOMOBILE MAINTENANCE & REPAIR (PERAWATAN MOBIL)
**Kode Sektor:** `SSW-AUTO-01` · **Versi:** v2.0 (Corpus v30 Canonical Revision)  
**Status:** AUTHORITATIVE & EXHAUSTIVE SECTOR SYLLABUS  
**Kementerian Pembina:** Kementerian Pertanahan, Infrastruktur, Transportasi dan Pariwisata Jepang (MLIT / 国土交通省)  
**Badan Pelaksana Uji:** Federasi Promosi Servis Mobil Jepang (JASPA / 一般社団法人 日本自動車整備振興会連合会) & Prometric  
**Dasar Kurasi Primer:**
- `reference-books/ssw/08_jidousha_automobile_repair/Automobile_Mechanic_Guidelines_MLIT.pdf` (Pedoman Kurikulum Resmi MLIT Mekanik Mobil Asing, 45 halaman)
- `reference-books/ssw/08_jidousha_automobile_repair/Automobile_Mechanic_Applicant_Guide_ID.pdf` (Panduan Peserta Ujian JASPA Bahasa Indonesia)
- `reference-books/ssw/08_jidousha_automobile_repair/Automobile_Theory_Sample_Exam_1_JA.pdf` & `reference-books/ssw/08_jidousha_automobile_repair/Automobile_Practical_Sample_Exam_1_JA.pdf`
- `reference-books/ssw/08_jidousha_automobile_repair/Automobile_Theory_Sample_Exam_2_JA.pdf` & `reference-books/ssw/08_jidousha_automobile_repair/Automobile_Theory_Exam_Answers_JA.pdf`
**Landasan Teoretis & Empiris:**
- Needs Analysis & Technical Lexicon (Nation & Hwang 1995 [VS-09]; Chung & Nation 2003 [VS-10])
- Cross-Cultural Communication in Service Operations & HOU-REN-SO (Mustaqim & Priventa 2026 [VS-31]; Supriatnaningsih et al. 2024 [VS-33])
- Geminate Acoustic Intelligibility in Mechanical Warning Calls (Husna & Febriyanti 2022 [EA-25])
- Automotive Safety Standards & Shiteki Koshou (JNIOSH 2020 [VS-39]; JASPA & MLIT 2024 [VS-54])

---

## 1. SPESIFIKASI UJIAN RESMI PROMETRIC CBT (STANDAR JASPA / MLIT)

Kandidat visa *Tokutei Ginou 1-gō* bidang Perawatan Mobil menempuh ujian Computer-Based Testing (CBT) dengan spesifikasi regulasi resmi:

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                              PROMETRIC CBT AUTOMOBILE MAINTENANCE EXAM MATRIX                          │
├─────────────────────────┬────────────────────────────────────────┬─────────────┬───────────┬───────────┤
│ Komponen Ujian          │ Cakupan Ranah Pengujian                │ Jumlah Soal │ Durasi    │ Ambang    │
├─────────────────────────┼────────────────────────────────────────┼─────────────┼───────────┼───────────┤
│ 1. Ujian Teori          │ Pengetahuan mesin bensin/diesel, sasis,│ 30 Soal     │ 60 Menit  │ $\ge 60\%$│
│    (学科試験 - Gakka)   │ sistem rem, kelistrikan bodi, regulasi │ (Format     │           │ (18 / 30) │
│                         │ Shaken, dan keselamatan bengkel K3     │  True/False │           │           │
│                         │                                        │  ○× CBT)    │           │           │
├─────────────────────────┼────────────────────────────────────────┼─────────────┼───────────┼───────────┤
│ 2. Ujian Praktik Layar  │ 3 set studi kasus diagnostik visual:   │ 3 Kasus     │ Terpadu   │ $\ge 60\%$│
│    (実技試験 - Jitsugi) │ Mesin, sasis kemudi, dan kelistrikan   │ (Simulasi   │ dalam sesi│ (Berdasarkan│
│                         │ dengan pembacaan multimeter/OBD-II     │  Visual CBT)│  CBT      │  rubrik)  │
└─────────────────────────┴────────────────────────────────────────┴─────────────┴───────────┴───────────┘
```

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
  - **Topik 2.2.2: Pemeriksaan Keausan Ban & Tanda TWI (Tire Wear Indicator):** Batas minimal tapak ban legal Jepang ($1.6	ext{ mm}$), pengukuran tekanan angin saat ban dingin.

---

### MODUL 3: KELISTRIKAN MOBIL & PEMINDAIAN OBD-II (電装品と故障診断)
- **Topik 3.1: Sistem Pengisian, Starter & Aki 12V:**
  - **Topik 3.1.1: Pengujian Alternator & Regulator Voltase:** Pengukuran tegangan pengisian alternator ($13.5	ext{ V} - 14.5	ext{ V}$) dan kekencangan sabuk penggerak (*fan belt*).
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
