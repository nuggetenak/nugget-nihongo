const fs = require("fs");
const path = require("path");

const sswDir = path.join(__dirname, "../corpus/sections/synthesis/syllabi/ssw");

// ==========================================
// SSW-12: FISHERIES & AQUACULTURE
// ==========================================
const ssw12Content = `# SILABUS KEJURUAN RESMI NUGGET NIHONGO · SEKTOR 12: FISHERY & AQUACULTURE (PERIKANAN & BUDIDAYA AIR)
**Kode Sektor:** \`SSW-FISH-01\` · **Versi:** v2.0 (Corpus v30 Canonical Revision)  
**Status:** AUTHORITATIVE & EXHAUSTIVE SECTOR SYLLABUS  
**Kementerian Pembina:** Badan Perikanan Jepang (Fisheries Agency / 水産庁 / MAFF)  
**Badan Pelaksana Uji:** Asosiasi Perikanan Jepang Raya (Suisankai / 一般社団法人 大日本水産会) & Prometric  
**Dasar Kurasi Primer:**
- \`reference-books/ssw/11_gyogyou_fisheries/Fisheries_General_Textbook_2025_JA.pdf\` (46 halaman) & \`reference-books/ssw/11_gyogyou_fisheries/Fisheries_General_Textbook_ID.pdf\` (Pengetahuan Perikanan Umum)
- \`reference-books/ssw/11_gyogyou_fisheries/Fisheries_Safety_Textbook_2025_JA.pdf\` (12 halaman) & \`reference-books/ssw/11_gyogyou_fisheries/Fisheries_Safety_Textbook_ID.pdf\` (Keselamatan Kerja Nelayan)
- \`reference-books/ssw/11_gyogyou_fisheries/Fisheries_SSW1_Sample_Exam_JA.pdf\` (Tokutei Ginou 1-gō) & \`reference-books/ssw/11_gyogyou_fisheries/Fisheries_SSW2_Sample_Exam_JA.pdf\` (Tingkat Lanjut 2-gō)
**Landasan Teoretis & Empiris:**
- Needs Analysis & Technical Lexicon (Nation & Hwang 1995 [VS-09]; Chung & Nation 2003 [VS-10])
- Cross-Cultural Communication in Maritime Vessels & HOU-REN-SO (Mustaqim & Priventa 2026 [VS-31]; Supriatnaningsih et al. 2024 [VS-33])
- Geminate Acoustic Intelligibility in High-Wind Sea Operations (Husna & Febriyanti 2022 [EA-25])
- Maritime Safety Standards & Overboard Rescue Protocols (JNIOSH 2020 [VS-39]; Fisheries Agency & Japan Fisheries Association 2024 [VS-48])

---

## 1. SPESIFIKASI UJIAN RESMI PROMETRIC CBT (STANDAR SUISANKAI / MAFF)

Kandidat visa *Tokutei Ginou 1-gō & 2-gō* bidang Perikanan menempuh ujian Computer-Based Testing (CBT) dengan spesifikasi regulasi resmi:

\`\`\`
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                        PROMETRIC CBT FISHERY & AQUACULTURE INDUSTRY EXAM MATRIX                        │
├─────────────────────────┬────────────────────────────────────────┬─────────────┬───────────┬───────────┤
│ Komponen Ujian          │ Cakupan Ranah Pengujian                │ Jumlah Soal │ Durasi    │ Ambang    │
├─────────────────────────┼────────────────────────────────────────┼─────────────┼───────────┼───────────┤
│ 1. Ujian Teori          │ Alat tangkap laut, navigasi dasar,     │ 30 Soal     │ 60 Menit  │ $\\ge 60\\%$│
│    (学科試験 - Gakka)   │ penanganan hasil tangkap, oseanografi, │ (Format     │ (Total    │ (18 / 30) │
│                         │ dan keselamatan K3 di atas geladak kapal│ ○× True/   │  Sesi     │           │
│                         │                                        │  False)     │  CBT)     │           │
├─────────────────────────┼────────────────────────────────────────┼─────────────┤           ├───────────┤
│ 2. Ujian Praktik Layar  │ Identifikasi visual spesies ikan resmi,│ 10 Soal     │           │ $\\ge 60\\%$│
│    (実技試験 - Jitsugi) │ pengenalan jenis simpul tali perahu,   │ (Format     │           │ (6 / 10)  │
│                         │ alat keselamatan pelampung dan navigasi│  Bergambar) │           │           │
└─────────────────────────┴────────────────────────────────────────┴─────────────┴───────────┴───────────┘
\`\`\`

> **Catatan Ujian Tingkat Lanjut (SSW 2-gō):** Meliputi manajemen penangkapan ikan di laut lepas, kepemimpinan operasi regu (*shikisha*), pemeliharaan mesin kapal, dan penanganan krisis badai ekstrem.

---

## 2. DUA CABANG UTAMA PERIKANAN JEPANG

1. **Perikanan Tangkap Laut (漁業 - Marine Boat Fishing):**
   - Jaring pukat dasar (*sokobikiami*), pukat cincin (*makiami*), rawai laut dalam (*haenawa*), jaring insang (*sashiami*), jaring angkat (*boukeami* untuk sanma), dan pancing cumi-cumi otomatis (*ika-tsuri*).
2. **Budidaya Perairan Laut & Tawar (水産養殖業 - Aquaculture):**
   - Karamba jaring apung ikan yellowtail (*buri / hamachi*), kakap merah (*madai*), budidaya tiram pasifik (*magaki*) di rakit gantung, rumput laut nori dan wakame, kerang mutiara, dan sidat unagi tawar.

---

## 3. MODUL PEMBELAJARAN KURIKULUM (PEDAGOGICAL MODULES)

### MODUL 1: METODE PENANGKAPAN IKAN LAUT & ALAT TANGKAP (漁業種類と漁具)
- **Topik 1.1: Klasifikasi Wilayah Penangkapan Ikan:**
  - **Topik 1.1.1: Perikanan Pantai, Lepas Pantai & Samudra (沿岸・沖合・遠洋):** Perbedaan karakteristik kapal satu hari pulang (*engan*), kapal mingguan di zona ZEE (*okiai*), dan kapal ekspedisi samudra berpendingin beku -60°C (*en'you*).
  - **Topik 1.1.2: Pukat Dasar & Pukat Cincin (底曳網・まき網):** Mekanisme papan bukaan pukat (*otter board*), kantung jaring penampung (*cod-end*), dan lampu atraksi pemikat kawanan ikan malam hari.
- **Topik 1.2: Rawai Ikan Tuna & Pancing Cumi Otomatis:**
  - **Topik 1.2.1: Tali Rawai Panjang Laut Dalam (延縄 - Haenawa):** Pemasangan tali utama (*miki-nawa*), tali cabang berkait pancing berumpan cumi (*eda-nawa*), dan pelampung radio suar pemancar.
  - **Topik 1.2.2: Mesin Pancing Cumi Beroda Drum Otomatis (いか釣り機):** Pengoperasian deretan umpan pancing buatan bercakar (*tsuno*), lampu halogen pemikat cumi ribuan watt, dan pelindung cipratan tinta hitam.

---

### MODUL 2: BUDIDAYA BIOTA LAUT & MANAJEMEN LINGKUNGAN (養殖管理と環境)
- **Topik 2.1: Budidaya Ikan Karamba Jaring Apung (生簀養殖):**
  - **Topik 2.1.1: Manajemen Pakan Pelet & Jadwal Makan:** Rasio konversi pakan pelet terapung/tenggelam (*moist/dry pellet*), pemantauan nafsu makan ikan, dan larangan overfeeding pencemar dasar laut.
  - **Topik 2.1.2: Pembersihan & Penggantian Jaring Karamba (網替え):** Penggunaan mesin pencuci jaring bertekanan tinggi pembersih teritip dan lumut demi kelancaran sirkulasi arus air laut.
- **Topik 2.2: Budidaya Kerang Tiram Rakit & Pencegahan Pasang Merah:**
  - **Topik 2.2.1: Rakit Gantung Tiram Laut (カキ筏養殖 - Ikada):** Pengikatan cangkang kolektor benih tiram pada tali tambang gantung di rakit bambu terapung teluk tenang.
  - **Topik 2.2.2: Pemantauan Pasang Merah Plankton Beracun (赤潮 - Akashio):** Pengukuran kadar oksigen terlarut air (DO), penurunan karamba ke lapisan dalam saat ledakan alga beracun membahayakan insang ikan.

---

### MODUL 3: PENANGANAN HASIL TANGKAP & PRESERVASI MUTU (鮮度保持技術)
- **Topik 3.1: Teknik Penusukan Saraf Segar (活け締め - Ike-Jime):**
  - **Topik 3.1.1: Prosedur Tusuk Otak & Pemutusan Saluran Saraf Tulang Belakang:** Penusukan spike pada dahi ikan dan kawat penusuk sumsum tulang belakang (*shinkei-jime*) untuk mencegah penguraian adenosin trifosfat (ATP).
  - **Topik 3.1.2: Pendarahan Pembuluh Insang & Ekor (血抜き - Chime):** Pemotongan membran insang dalam air laut dingin mengalir agar daging ikan bebas bau amis darah dan berwarna cerah.
- **Topik 3.2: Pengawetan Es & Penyimpanan Palka Kapal (氷蔵・冷凍):**
  - **Topik 3.2.1: Pembuatan Bubur Es Air Laut (スラリーアイス):** Perbandingan es batu halus dan air laut bersuhu -1°C hingga -2°C merendam ikan tanpa merusak sisik.
  - **Topik 3.2.2: Pembekuan Kilat Palka Freezer -60°C (超低温凍結):** Penyusunan ikan tuna pada rak pembeku cepat untuk mempertahankan mutu sashimi prima hingga ke pelabuhan pendaratan.

---

### MODUL 4: K3 MARITIM, KESELAMATAN GELADAK & PENYELAMATAN LAUT (漁船安全衛生)
- **Topik 4.1: Pencegahan Bahaya Jatuh Terlempar ke Laut (海中転落防止):**
  - **Topik 4.1.1: Kewajiban Mutlak Jaket Pelampung Keselamatan (救命胴衣):** Pemakaian jaket pelampung bersertifikasi tipe A dengan peluit dan lampu otomatis saat beraktivitas di atas geladak kapal.
  - **Topik 4.1.2: Bahaya Hipotermia Air Laut Dingin (低体温症):** Posisi bertahan meringkuk menahan panas tubuh (*HELP position / Huddle position*) saat terapung di laut menunggu pertolongan evakuasi.
- **Topik 4.2: K3 Mesin Winch Penarik Jaring & Tali Tambat (揚網機安全):**
  - **Topik 4.2.1: Larangan Menginjak Lingkaran Gulungan Tali (ロープ踏み込み禁止):** Bahaya maut kaki terjerat gulungan tali kawat winch penarik berkecepatan tinggi yang dapat menyeret tubuh ke laut.
- **Topik 4.3: HOU-REN-SO Saat Orang Jatuh ke Laut (Man Overboard):**
  - **Topik 4.3.1: Prosedur Teriakan Darurat Orang Jatuh ke Laut:** Teriakan vokal seketika: *「落水者あり！右舷（左舷）！救命浮環を投げろ！」*, pelemparan pelampung ban, penekanan tombol MOB pada GPS navigasi, dan kontak radio penjaga pantai 118.

---

## 4. KOSAKATA TEKNIS LAYER 2 (SUISANKAI OFFICIAL FISHERIES LEXICON)

| No | Kanji | Kana | Romaji | Indonesian Gloss | High-Stakes Risk Category |
|---|---|---|---|---|---|
| 1 | 救命胴衣（ライフジャケット）| きゅうめいどうい | *kyuumei doui* | Jaket pelampung keselamatan laut wajib | Drowning Fatality |
| 2 | 海中転落（落水） | かいちゅうてんらく（らくすい）| *kaichuu tenraku (rakusui)* | Bahaya maut jatuh terlempar ke laut bebas | Instant Hypothermia & Loss of Life |
| 3 | 底曳網 | そこびきあみ | *sokobikiami* | Jaring pukat dasar laut penangkap ikan demersal| Trawl Wire Rigging Entanglement |
| 4 | 延縄 | はえなわ | *haenawa* | Tali pancing rawai panjang berkait berumpan | Hook Puncture & Winch Hazard |
| 5 | 活け締め | いけじめ | *ikejime* | Teknik penusukan saraf instan penjaga kesegaran | Severe Hand Spike Puncture |
| 6 | 非常停止スイッチ | ひじょうていしすいっち | *hijou teishi suitchi* | Tombol pemutus darurat mesin winch penarik | Deck Winch Maiming Escalation |
| 7 | 揚網機（ネットホーラー）| ようもうき | *youmouki (netto hooraa)* | Mesin katrol hidrolik penarik jaring ke geladak | Crushed in Roller Pinch Point |
| 8 | 赤潮 | あかしお | *akashio* | Fenomena ledakan alga beracun air laut merah | Total Fish Cage Suffocation |
| 9 | 生簀（いけす） | いけす | *ikesu* | Karamba jaring apung pemeliharaan ikan laut | Net Entrapment & Drowning |
| 10 | 浮環（救命浮輪） | ふかん（きゅうめいふりん）| *fukan (kyuumei furin)* | Ban pelampung penolong orang jatuh ke laut | Delayed Deployment Fatality |
| 11 | 低体温症 | ていたいおんしょう | *teitaion shou* | Hipotermia penurunan suhu inti tubuh di air dingin| Fatal Cardiac Arrest in Sea |
| 12 | 魚艙（ぎょそう） | ぎょそう | *gyosou* | Palka ruang penampung ikan di lambung kapal | Oxygen Deficiency / Slips |
| 13 | 活魚運搬 | かつぎようんぱん | *katsugyo umpan* | Pengangkutan ikan hidup beroksigen ke pasar | Water Quality Crash Loss |
| 14 | カキ筏 | かきいかだ | *kaki ikada* | Rakit kayu/bambu gantung budidaya tiram | Structure Collapse under Storm |
| 15 | まき網 | まきあみ | *makiami* | Jaring pukat cincin penangkap kawanan ikan pelagis| Net Capsize Tension Hazard |
| 16 | 溶存酸素量（ＤＯ） | ようぞんさんそりょう | *youzon sansoryou (DO)* | Kadar oksigen terlarut dalam air karamba | Anoxia Fish Kill Disaster |
| 17 | 給餌管理 | きゅうじかんり | *kyuuji kanri* | Manajemen penakaran pakan pelet budidaya | Bottom Sludge Eutrophication |
| 18 | スラリーアイス | すらりーあいす | *surarii aisu* | Bubur es air laut pendingin ikan tanpa merusak | Temperature Abuse Spoilage |
| 19 | 網目（目合） | あみめ（めあい） | *amime (meai)* | Ukuran celah lubang jaring penyeleksi ukuran ikan| Regulatory Fine for Illegal Mesh |
| 20 | 甲板洗浄 | こうはんせんじょう | *kouhan senjou* | Penyemprotan pembersihan geladak dari lendir ikan| Slip and Fall on Wet Steel Deck |
| 21 | 有毒魚（オコゼ等） | ゆうどくぎょ | *yuudokugyo* | Ikan beracun berduri sengat mematikan di laut | Neurotoxic Sting Shock |
| 22 | 係船ロープ | けいせんろーぷ | *keisen roopu* | Tali tambang besar pengikat kapal ke dermaga | Mooring Line Snap-Back Zone |
| 23 | 船酔い防止 | ふなよいぼうし | *funayoi boushi* | Pencegahan mabuk laut akut anak buah kapal | Incapacitation & Dehydration |
| 24 | 荒天準備 | こうてんじゅんび | *kouten jumbi* | Prosedur pengikatan seluruh barang geladak jelang badai| Cargo Shifting & Ship Capsize |
| 25 | 水密扉 | すいみつとびら | *suimitsu tobira* | Pintu sekat baja kedap air laut lambung kapal | Hull Downflooding Catastrophe |
| 26 | 潮流・潮汐 | ちょうりゅう・ちょうせき | *chouryuu / chouseki* | Arah arus laut pasang surut air navigasi | Grounding on Submerged Rocks |
| 27 | ＥＰＩＲＢ（遭難信号）| いーぱーぶ | *iipaabu (EPIRB)* | Radio suar darurat satelit penanda lokasi karam | Rescue Delay if Not Armed |
| 28 | 魚探（魚群探知機） | ぎょたん | *gyotan* | Sonar akustik pendeteksi kawanan ikan dan kedalaman| Collision with Shallow Reef |
| 29 | 投網作業 | とうもうさぎょう | *toumou sagyou* | Prosedur pelemparan jaring kapal ke laut | Tangled in Shooting Gear |
| 30 | 氷冷（砕氷） | ひょうれい（さいひょう） | *hyourei (saihyou)* | Penimbunan ikan dalam es serut pendingin palka | Bacterial Histamine Formation |
| 31 | 鰓・内臓除去 | えら・ないぞうじょきょ | *era / naizou jokyo* | Pembersihan insang dan isi perut tuna di laut | Bacterial Putrefaction Outflow |
| 32 | 自動いか釣り機 | じどういかつりき | *jidou ikatsuriki* | Mesin penggulung senar pancing cumi otomatis | Line Entanglement Laceration |
| 33 | 舵角指示器 | だかくしじき | *dakaku shijiki* | Indikator sudut belok daun kemudi anjungan | Steering Loss Inadvertence |
| 34 | アンカー（錨）揚降 | あんかーとうこう | *ankaa toukou* | Penurunan dan penarikan rantai jangkar kapal | Crushed in Windlass Gypsy |
| 35 | 海上保安庁通報（118）| かいじょうほあんちょう | *kaijou hoan chou (118)* | Kontak nomor telepon radio darurat penjaga pantai | Search & Rescue Lifeline |
| 36 | ５Ｓ漁具整備 | ごえすぎょぐせいび | *goesugyogu seibi* | Perapian mata kail dan jaring robek di geladak | Tripping Hazard & Deck Puncture |

---

## 5. DIRECTIVES K3 DARURAT & FORMULA YUBISASHI KOSHO

### Teriakan Darurat Spontan di Tempat Kerja:
- *「落水者あり！右舷！救命浮環を投げろ！」* (*Rakusuisha ari! Ugen! Kyuumei fukan wo nagero!* — Ada orang jatuh ke laut! Sisi kanan! Lempar pelampung ban!)
- *「ロープを踏むな！巻き込まれるぞ！」* (*Roopu wo fumu na! Makikomareru zo!* — Jangan injak tali! Bisa terseret winch!)
- *「大波が来るぞ！手すりにつかまれ！」* (*Oonami ga kuru zo! Tesuri ni tsukamare!* — Ombak besar datang! Berpegangan ke railing!)

### Formula Point-and-Call (指差し呼称):
1. **Pengecekan Jaket Pelampung:** *「救命胴衣着用、バックル固定、ヨシ！」*
2. **Pengecekan Geladak Sebelum Tebar Jaring:** *「投網前確認、周囲クリア、足元ロープなし、ヨシ！」*
3. **Pengecekan Suhu Palka Es Ikan:** *「魚艙温度、マイナス1度、氷蔵状態、ヨシ！」*
4. **Pengecekan Kadar Oksigen Karamba:** *「生簀溶存酸素、8ミリグラム、正常、ヨシ！」*

---

## 6. BANK SOAL UJIAN CBT SUISANKAI RESMI

### Contoh Soal Ujian Teori (学科試験 ○×):
> **Soal 1:** 漁船の甲板上で作業を行うときは、天候が穏やかであっても、海中転落事故に備えて必ず救命胴衣（ライフジャケット）を正しく着用しなければならない。  
> **Kunci Jawaban:** **○ (Benar)** (Pemakaian life jacket bersertifikasi tipe A wajib 100% tanpa kompromi selama berada di atas geladak kapal perikanan).

> **Soal 2:** 活け締め（いけじめ）処理は、魚の即殺と神経破壊を行うことで、死後硬直を遅らせて鮮度を長持ちさせる効果がある。  
> **Kunci Jawaban:** **○ (Benar)** (Teknik ike-jime memutus transmisi saraf sehingga konsumsi ATP terhenti dan kualitas daging sashimi terjaga optimal).

### Contoh Soal Ujian Praktik On-Screen (実技試験):
> **Soal 1:** 画面の写真を見て、日本の沿岸・沖合漁業において、魚群探知機で群れを見つけた後、網を魚群の周りに円形に投網して下部のロープを締め上げ、魚を閉じ込める漁法として、正しいものを選びなさい。  
> A. 刺網（さしあみ）  
> B. まき網（まきあみ）  
> C. 定置網（ていちあみ）  
> D. 底曳網（そこびきあみ）  
> **Kunci Jawaban:** **B** (Pukat cincin/makiami bekerja dengan melingkari kawanan ikan lalu mengerutkan tali kolor bawah layaknya kantung dompet).
`;

fs.writeFileSync(path.join(sswDir, "SSW-12-FISHERIES-AQUACULTURE-SYLLABUS.md"), ssw12Content, "utf8");
console.log("SSW-12 written successfully!");

// ==========================================
// SSW-13: FORESTRY INDUSTRY
// ==========================================
const ssw13Content = `# SILABUS KEJURUAN RESMI NUGGET NIHONGO · SEKTOR 13: FORESTRY INDUSTRY (INDUSTRI KEHUTANAN)
**Kode Sektor:** \`SSW-FOREST-01\` · **Versi:** v2.0 (Corpus v30 Canonical Revision)  
**Status:** AUTHORITATIVE & EXHAUSTIVE SECTOR SYLLABUS  
**Kementerian Pembina:** Badan Kehutanan Jepang (Forestry Agency / 林野庁 / MAFF)  
**Badan Pelaksana Uji:** Dewan Pusat Bantuan Pengamanan Tenaga Kerja Kehutanan Nasional (全国林業労働力確保支援センター協議会)  
**Dasar Kurasi Primer:**
- \`reference-books/ssw/13_new_sectors_transport_rail_forestry/Forestry_Skills_Textbook_Vol1_JA.pdf\` (244 halaman) & \`reference-books/ssw/13_new_sectors_transport_rail_forestry/Forestry_Skills_Textbook_Vol1_ID.pdf\` (Silvikultur, Penanaman, Pemeliharaan Hutan)
- \`reference-books/ssw/13_new_sectors_transport_rail_forestry/Forestry_Skills_Textbook_Vol2_JA.pdf\` (244 halaman) & \`reference-books/ssw/13_new_sectors_transport_rail_forestry/Forestry_Skills_Textbook_Vol2_ID.pdf\` (Penebangan Kayu, Chainsaw, Mesin Kehutanan)
**Landasan Teoretis & Empiris:**
- Needs Analysis & Technical Lexicon (Nation & Hwang 1995 [VS-09]; Chung & Nation 2003 [VS-10])
- Cross-Cultural Communication in Steep Mountain Forestry & HOU-REN-SO (Mustaqim & Priventa 2026 [VS-31]; Supriatnaningsih et al. 2024 [VS-33])
- Geminate Acoustic Intelligibility in High-Decibel Chainsaw Gemba (Husna & Febriyanti 2022 [EA-25])
- Directional Tree Felling & Forestry Safety Standards (JNIOSH 2020 [VS-39]; Forestry Agency & Zenkoku Ringyo 2024 [VS-52])

---

## 1. SPESIFIKASI UJIAN RESMI KEHUTANAN (STANDAR MAFF / FORESTRY AGENCY)

Kandidat visa *Tokutei Ginou 1-gō* bidang Kehutanan menempuh evaluasi standar nasional:

\`\`\`
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                              FORESTRY INDUSTRY SKILL EVALUATION EXAM MATRIX                            │
├─────────────────────────┬────────────────────────────────────────┬─────────────┬───────────┬───────────┤
│ Komponen Ujian          │ Cakupan Ranah Pengujian                │ Jumlah Soal │ Durasi    │ Ambang    │
├─────────────────────────┼────────────────────────────────────────┼─────────────┼───────────┼───────────┤
│ 1. Ujian Teori          │ Silvikultur, biologi pohon sugi/hinoki,│ 30 Soal     │ 60 Menit  │ $\\ge 60\\%$│
│    (学科試験 - Gakka)   │ mekanika penebangan takik ukeguchi,    │ (Format     │           │ (18 / 30) │
│                         │ K3 chainsaw, kabel kran traktor yarder │  Pilihan    │           │           │
│                         │                                        │  Ganda CBT) │           │           │
├─────────────────────────┼────────────────────────────────────────┼─────────────┼───────────┼───────────┤
│ 2. Ujian Praktik        │ Demonstrasi pemeliharaan rantai gergaji│ Uji Praktis │ Evaluasi  │ $\\ge 60\\%$│
│    (実技試験 - Jitsugi) │ rantai, teknik takik rebah akurat pada │ Mandiri di  │ Langsung  │ (Berdasarkan│
│                         │ batang kayu simulasi, APD chaps wajib  │ Gelanggang  │ Penguji   │  rubrik)  │
└─────────────────────────┴────────────────────────────────────────┴─────────────┴───────────┴───────────┘
\`\`\`

> **Catatan Regulasi K3:** Pekerja kehutanan diwajibkan menyelesaikan Pelatihan Khusus Keselamatan Pengoperasian Chainsaw (*Chainsaw Tokubetsu Kyouiku*) sesuai Undang-Undang Keselamatan dan Kesehatan Kerja Jepang.

---

## 2. DUA DIVISI UTAMA KEHUTANAN JEPANG

1. **Silvikultur & Pembudidayaan Hutan (育林 - Silviculture & Forest Care):**
   - Penanaman bibit aras Jepang (*sugi*) dan cemara (*hinoki*), pembersihan semak belukar (*shitagari*), pemangkasan dahan bawah (*edauchi*), penjarangan pohon (*kambatsu*) untuk menjaga kepadatan tegakan.
2. **Pemanenan Kayu & Penebangan Hutan (素材生産・伐倒 - Logging & Timber Harvesting):**
   - Penebangan terarah pohon besar menggunakan chainsaw, pemotongan cabang (*dalimbing*), pemotongan batang menjadi gelondongan (*bucking / tamakiri*), penarikan kayu berkabel kran (*yarder / winches*), dan pemuatan kayu traktor grapple.

---

## 3. MODUL PEMBELAJARAN KURIKULUM (PEDAGOGICAL MODULES)

### MODUL 1: SILVIKULTUR & PEMELIHARAAN HUTAN (育林技術)
- **Topik 1.1: Penanaman Bibit Pohon & Pembukaan Lahan:**
  - **Topik 1.1.1: Karakteristik Pohon Aras Jepang (スギ) & Cemara Hinoki (ヒノキ):** Penyesuaian kedalaman lubang tanam bibit kontainer (*containerized seedling*), pemadatan tanah di sekeliling akar bibit.
  - **Topik 1.1.2: Pembersihan Semak Rumput Liar (下刈り - Shitagari):** Penggunaan sabit panjang atau mesin potong rumput punggung untuk membebaskan bibit muda dari gulma penghalang sinar matahari selama 5–7 tahun pertama.
- **Topik 1.2: Pemangkasan Cabang & Penjarangan Pohon (枝打ち・間伐):**
  - **Topik 1.2.1: Pemangkasan Dahan Bawah Menghasilkan Kayu Bebas Mata (無節材):** Teknik memotong pangkal cabang rapat ke batang tanpa melukai kerah cabang (*branch collar*).
  - **Topik 1.2.2: Penjarangan Tegakan Pohon (間伐 - Kambatsu):** Penebangan pohon kurus/bengkok untuk membuka kanopi matahari bagi pohon inti berkualitas super.

---

### MODUL 2: TEKNIK PENEBANGAN TERARAH (伐倒作業技術)
- **Topik 2.1: Geometri Takik Rebah & Takik Punggung (受け口と追い口):**
  - **Topik 2.1.1: Pembuatan Takik Arah Jatuh (受け口 - Ukeguchi):** Pembuatan takik hadap bersudut bukaan 30°–45°, dengan kedalaman potong tepat 1/4 diameter batang pohon.
  - **Topik 2.1.2: Pemotongan Takik Punggung (追い口 - Oiguchi):** Pemotongan datar horizontal dari arah belakang, diposisikan lebih tinggi 2–5 cm dari sudut takik hadap bawah.
  - **Topik 2.1.3: Mempertahankan Engsel Kayu Penahan (つる - Tsuru):** Kunci mutlak keselamatan! Engsel kayu penahan setebal 1/10 diameter pohon dilarang keras dipotong habis; tsuru berfungsi sebagai engsel pengarah jatuhnya pohon!
- **Topik 2.2: Penggunaan Baji Penebang Kayu (矢 - Felling Wedges):**
  - **Topik 2.2.1: Pemasangan Baji Plastik/Aluminium Pada Takik Punggung:** Memukul baji menggunakan palu untuk mendorong batang pohon condong ke arah takik hadap dan mencegah bilah chainsaw terjepit (*hasamare*).

---

### MODUL 3: PENGOPERASIAN CHAINSAW & PEMELIHARAAN (チェンソー安全)
- **Topik 3.1: Bahaya Tendangan Balik Mematikan (キックバック - Kickback):**
  - **Topik 3.1.1: Zona Kuadran Bahaya Ujung Bilah Pemandu (ガイドバーノーズ):** Kontak kuadran atas ujung bilah dengan kayu memicu tendangan balik gergaji seketika ke arah wajah/leher operator.
  - **Topik 3.1.2: Rem Rantai Otomatis & Inersia (チェンブレーキ):** Mekanisme penguncian rantai seketika saat pelindung tangan depan terbentur pergelangan tangan kiri operator.
- **Topik 3.2: Pengasahan Gigi Rantai Gergaji (目立て - Chain Sharpening):**
  - **Topik 3.2.1: Sudut Asah Kikir Bulat Presisi:** Pengasahan sudut 30° horizontal, pemeliharaan tinggi pengatur kedalaman potong (*depth gauge*) 0.65 mm.

---

### MODUL 4: K3 KEHUTANAN, JALUR EVAKUASI & APD (林業安全と退避)
- **Topik 4.1: Jalur Evakuasi Aman Menyerong 45 Derajat (退避場所):**
  - **Topik 4.1.1: Sudut Pelarian Mundur Saat Pohon Mulai Rebah:** Operator wajib bergerak mundur menyerong dengan sudut 45 derajat ke arah belakang takik punggung; radius bahaya 2x tinggi pohon wajib steril!
  - **Topik 4.1.2: Bahaya Dahan Patah Menyangkut di Atas (かかり木):** Larangan keras berdiri di bawah pohon tersangkut (*kakari-ki*); wajib ditarik menggunakan katrol winch atau traktor.
- **Topik 4.2: Pakaian Pelindung Anti-Gergaji Serat Kevlar (防護服):**
  - **Topik 4.2.1: Kewajiban Celana Pelindung Gergaji (チャップス - Chaps):** Serat penahan gergaji bersertifikasi ISO 11393 yang langsung melilit dan menghentikan putaran rantai dalam hitungan milidetik saat tersentuh.
- **Topik 4.3: HOU-REN-SO Saat Penebangan Dimulai:**
  - **Topik 4.3.1: Peringatan Teriakan Keras Sebelum Memotong:** Teriakan lantang: *「伐倒するぞ！退避しろ！」* dan konfirmasi tiupan peluit 3 kali sebelum potongan takik punggung diselesaikan.

---

## 4. KOSAKATA TEKNIS LAYER 2 (FORESTRY AGENCY OFFICIAL LEXICON)

| No | Kanji | Kana | Romaji | Indonesian Gloss | High-Stakes Risk Category |
|---|---|---|---|---|---|
| 1 | 伐倒 | ばっとう | *battou* | Tindakan penebangan penumbangan pohon hutan | Fatal Tree Strike Crushing |
| 2 | 受け口 | うけぐち | *ukeguchi* | Takik hadap penentu arah rebah pohon (sudut 30°-45°)| Misdirected Felling Hazard |
| 3 | 追い口 | おいぐち | *oiguchi* | Potongan punggung datar pendorong pohon tumbang | Premature Tree Kickoff |
| 4 | つる（弦） | つる | *tsuru* | Engsel kayu penahan kendali arah rebah pohon | Uncontrolled Wild Tree Fall |
| 5 | キックバック | きっくばっく | *kikkubakku* | Tendangan balik mendadak gergaji ke wajah operator | Lethal Facial/Neck Laceration |
| 6 | チェンブレーキ | ちぇんぶれーき | *chem bureeki* | Rem darurat penghenti putaran rantai seketika | Chain Brake Failure Hazard |
| 7 | チャップス（防護ズボン）| ちゃっぷす | *chappusu* | Celana serat sintetis penahan luka putaran chainsaw| Severe Leg Femoral Artery Cut |
| 8 | 退避場所 | たいひばしょ | *taihi basho* | Jalur evakuasi serong 45 derajat di belakang pohon | Crushed by Rebounding Trunk |
| 9 | かかり木 | かかりき | *kakariki* | Pohon tumbang yang tersangkut di dahan pohon lain | Unpredictable Secondary Collapse |
| 10 | ガイドバー | がいどばー | *gaido baa* | Bilah baja pemandu putaran rantai pemotong gergaji | Chain Derailment Hazard |
| 11 | 目立て | めたて | *metate* | Pengasahan sudut gigi rantai pemotong chainsaw | Dull Chain Kickback Vibration |
| 12 | 矢（伐倒楔） | や（くさび） | *ya (kusabi)* | Baji pengganjal takik pendorong rebah pohon | Saw Pinching & Trunk Rollback |
| 13 | 間伐 | かんばつ | *kambatsu* | Penjarangan pohon hutan pemeliharaan tegakan | Slender Tree Snapping Hazard |
| 14 | 下刈り | したがり | *shitagari* | Pembersihan semak gulma di sekeliling bibit muda | Brush Cutter Blade Ricochet |
| 15 | 枝打ち | えだうち | *edauchi* | Pemangkasan cabang bawah pohon pelindung serat kayu| Fall from Tree Pruning Height |
| 16 | スギ・ヒノキ | すぎ・ひのき | *sugi / hinoki* | Pohon aras Jepang dan cemara kayu pertukangan utama| Resinous Tool Jamming |
| 17 | 集材機（ヤルダー） | しゅうざいき（やるだー）| *shuuzaiki (yarudaa)* | Mesin derek kabel penarik kayu gelondongan lereng | High-Tension Cable Snap |
| 18 | 林内作業車 | りんないさぎょうしゃ | *rinnai sagyousha* | Kendaraan traktor pembawa kayu di jalan hutan terjal| Steep Slope Machine Rollover |
| 19 | 玉切り | たまぎり | *tamagiri* | Pemotongan batang pohon utuh menjadi gelondongan | Log Rolling Downhill Hazard |
| 20 | 枝払い | えだはらい | *edaharai* | Pembersihan cabang ranting dari batang pohon tumbang| Spring-Pole Energy Whiplash |
| 21 | スパイク足袋・靴 | すぱいくたび | *supaiku tabi / kutsu* | Sepatu sol berpaku anti-licin di lereng tebing terjal| Slope Slip and Fall into Ravine |
| 22 | ヘルメット網バイザー | へるめっとあみばいざー | *herumetto ami baizaa* | Helm pelindung berkedok jaring kawat dan earmuff | Eye Puncture from Twigs |
| 23 | 振動障害（白指症） | しんどうしょうがい | *shindou shougai* | Penyakit jari putih akibat getaran mesin gergaji | Permanent Nerve Vasospasm |
| 24 | 混合燃料 | こんごうねんりょう | *kongou nenryou* | Bahan bakar bensin campur oli 2-tak mesin gergaji | Engine Seizure & Fire Explosion |
| 25 | デプスゲージ | でぷすげーじ | *depusu geeji* | Batang pengatur kedalaman potong gigi rantai | Over-Biting Chain Stall |
| 26 | 材幹（丸太） | ざいかん（まるた） | *zaikan (maruta)* | Batang kayu gelondongan bundar hasil tebangan | Rolling Log Crush Hazard |
| 27 | 地均し | じならし | *jinarashi* | Perataan lantai tanah tapak tebang sebelum bekerja | Stumble Hazard during Escape |
| 28 | 林道・作業道 | りんどう・さぎょうどう | *rindou / sagyoudou* | Jalan setapak tanah sempit mobilisasi mesin hutan | Roadway Shoulder Collapse |
| 29 | グラップル | ぐらっぷる | *gurappuru* | Mesin cakar hidrolik pemindah kayu gelondongan | Log Drop from Hydraulic Claw |
| 30 | 伐根（切り株） | ばっこん（きりかぶ） | *bakkon (kirikabu)* | Tunggul pangkal sisa batang pohon di tanah | Tripping Obstacle during Escape |
| 31 | 危険区域（２倍高） | きけんくいき | *kiken kuiki (nibaikou)* | Radius steril 2 kali tinggi pohon di sekitar tebangan | Bystander Fatality Zone |
| 32 | 跳ね返り（バウンド）| はねかえり | *hanekaeri (baundo)* | Lontaran memantul batang kayu saat menghantam tanah| Violent Secondary Impact |
| 33 | 梢（樹冠部） | こずえ（じゅかんぶ） | *kozue (jukanbu)* | Pucuk dahan mahkota pohon (sering patah memantul) | Overhead Deadwood Drop |
| 34 | 木回し（フェリングレバー）| きまわし | *kimawashi (feringu rebaa)*| Tongkat tuas pengungkit pembalik arah gelondongan | Lever Kickback Muscle Strain |
| 35 | 蜂刺され応急処置 | はちさされおうきゅうしょち| *hachi sasare oukyuu shochi*| Pertolongan darurat sengatan tawon suzumebachi | Anaphylactic Shock Death |
| 36 | ５Ｓ現場巡回 | ごえすげんばじゅんかい | *goesugemba junkai* | Pembersihan oli tumpah dan botol bahan bakar | Forest Wildfire Prevention |

---

## 5. DIRECTIVES K3 DARURAT & FORMULA YUBISASHI KOSHO

### Teriakan Darurat Spontan di Tempat Kerja:
- *「伐倒するぞ！周囲２倍の範囲から退避しろ！」* (*Battou suru zo! Shuui nibai no han'i kara taihi shiro!* — Akan menebang! Menyingkir dari radius 2x tinggi pohon!)
- *「木が倒れるぞ！退避場所へ走れ！」* (*Ki ga taoreru zo! Taihi basho e hashire!* — Pohon tumbang! Lari ke titik evakuasi!)
- *「かかり木だ！下に絶対に入るな！」* (*Kakariki da! Shita ni zettai ni hairu na!* — Pohon tersangkut! Jangan masuk ke bawahnya!)

### Formula Point-and-Call (指差し呼称):
1. **Pengecekan Engsel Kayu Penahan:** *「つるの幅、直径の10分の1、確保、ヨシ！」*
2. **Pengecekan Jalur Evakuasi:** *「退避場所、45度斜め後方、足元障害物なし、ヨシ！」*
3. **Pengecekan Rem Rantai Chainsaw:** *「チェンブレーキ作動、即座停止、ヨシ！」*
4. **Pengecekan APD Celana Chaps:** *「防護ズボンチャップス装着、チャック固定、ヨシ！」*

---

## 6. BANK SOAL UJIAN KEHUTANAN RESMI

### Contoh Soal Ujian Teori (学科試験 4 Pilihan):
> **Soal 1:** チェンソーによる立木の伐倒作業において、木の倒れる方向を制御するために残す「つる（弦）」の役割に関する記述として、正しいものを１つ選びなさい。  
> １. 早く木を倒すために、つるは残さずに一気に切り抜かなければならない。  
> ２. つるはドアの蝶番（ちょうつがい）のような役割を果たし、木が意図しない方向へ倒れたり裂けたりするのを防ぐ。  
> ３. つるは追い口側よりも受け口側を広く残すのが原則である。  
> ４. つるの幅は、立木の胸高直径の２分の１以上残さなければならない。  
> **Kunci Jawaban:** **2** (Tsuru berfungsi mutlak sebagai engsel kendali arah rebah pohon; memotong habis tsuru menyebabkan pohon tumbang liar mematikan).

> **Soal 2:** チェンソーの「キックバック」現象を防ぐための注意事項として、最も適切なものを１つ選びなさい。  
> １. ガイドバーの先端上部（キックバック危険ゾーン）で木材を切断する。  
> ２. ガイドバーの先端上部を木材や小枝に接触させないように注意して切削する。  
> ３. チェンブレーキを解除したまま移動する。  
> ４. 両手を使わず、片手でチェンソーを支えて作業する。  
> **Kunci Jawaban:** **2** (Kontak kuadran ujung atas bilah adalah pemicu gaya dorong reaktif kickback gergaji ke arah operator).
`;

fs.writeFileSync(path.join(sswDir, "SSW-13-FORESTRY-INDUSTRY-SYLLABUS.md"), ssw13Content, "utf8");
console.log("SSW-13 written successfully!");

// ==========================================
// SSW-14: TIMBER & WOOD PROCESSING
// ==========================================
const ssw14Content = `# SILABUS KEJURUAN RESMI NUGGET NIHONGO · SEKTOR 14: TIMBER & WOOD PROCESSING (INDUSTRI PERKAYUAN & PENGOLAHAN KAYU)
**Kode Sektor:** \`SSW-TIMBER-01\` · **Versi:** v2.0 (Corpus v30 Canonical Revision)  
**Status:** AUTHORITATIVE & EXHAUSTIVE SECTOR SYLLABUS  
**Kementerian Pembina:** Badan Kehutanan Jepang (Forestry Agency / 林野庁 / MAFF)  
**Badan Pelaksana Uji:** Pusat Informasi Industri Kayu Jepang (JAWIC / 一般社団法人 日本木材総合情報センター) & Federasi Industri Kayu Jepang  
**Dasar Kurasi Primer:**
- \`reference-books/ssw/13_new_sectors_transport_rail_forestry/Timber_Industry_Textbook_JA.pdf\` (66 halaman) & \`reference-books/ssw/13_new_sectors_transport_rail_forestry/Timber_Industry_Textbook_ID.pdf\` (Buku Teks Industri Pengolahan Kayu Resmi)
**Landasan Teoretis & Empiris:**
- Needs Analysis & Technical Lexicon (Nation & Hwang 1995 [VS-09]; Chung & Nation 2003 [VS-10])
- Cross-Cultural Communication in Wood Processing Plants & HOU-REN-SO (Mustaqim & Priventa 2026 [VS-31]; Supriatnaningsih et al. 2024 [VS-33])
- Geminate Acoustic Intelligibility in Sawmill Factory Gemba (Husna & Febriyanti 2022 [EA-25])
- Sawmill Safety & Combustible Wood Dust Standards (JNIOSH 2020 [VS-39]; JAWIC & Forestry Agency 2024 [VS-49])

---

## 1. SPESIFIKASI UJIAN RESMI INDUSTRI KAYU (STANDAR JAWIC / MAFF)

Kandidat visa *Tokutei Ginou 1-gō* bidang Industri Perkayuan menempuh ujian evaluasi standar resmi:

\`\`\`
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                        TIMBER & WOOD PROCESSING SKILL EVALUATION EXAM MATRIX                           │
├─────────────────────────┬────────────────────────────────────────┬─────────────┬───────────┬───────────┤
│ Komponen Ujian          │ Cakupan Ranah Pengujian                │ Jumlah Soal │ Durasi    │ Ambang    │
├─────────────────────────┼────────────────────────────────────────┼─────────────┼───────────┼───────────┤
│ 1. Ujian Teori          │ Pengetahuan penggerajian kayu gelondong│ 30 Soal     │ 60 Menit  │ $\\ge 60\\%$│
│    (学科試験 - Gakka)   │ oven pengering kiln, pembuatan plywood │ (Format     │           │ (18 / 30) │
│                         │ CLT, K3 pisau pembelah & ledakan debu │  Pilihan    │           │           │
│                         │                                        │  Ganda CBT) │           │           │
├─────────────────────────┼────────────────────────────────────────┼─────────────┼───────────┼───────────┤
│ 2. Ujian Praktik Layar  │ Identifikasi visual cacat mata kayu,   │ 10 Soal     │ Terpadu   │ $\\ge 60\\%$│
│    (実技試験 - Jitsugi) │ pembacaan kadar air kayu (gansuiritsu),│ (Simulasi   │ dalam sesi│ (6 / 10)  │
│                         │ toleransi ketebalan papan, dan pisau K3│  Visual)    │  CBT      │           │
└─────────────────────────┴────────────────────────────────────────┴─────────────┴───────────┴───────────┘
\`\`\`

> **Standar Mutu Produk:** Berpatokan ketat pada Standar Pertanian dan Kehutanan Jepang (JAS - *Japanese Agricultural Standards*) untuk kayu konstruksi struktural.

---

## 2. TIGA LINI OPERASIONAL INDUSTRI KAYU JEPANG

1. **Penggerajian & Pemilahan Balok Kayu (製材業 - Sawmilling):**
   - Pengupasan kulit kayu mesin debarker (*baakaa*), pembelahan batang kayu gergaji pita besar (*band saw / obinokoban*), pemotongan tepian (*edger*), pemilahan mutu balok konstruksi JAS.
2. **Pengeringan & Pengawetan Kayu (木材乾燥・保存処理 - Wood Drying & Preservation):**
   - Pengeringan alami (*tennen kansou*) dan pengeringan tungku uap kiln buatan (*jinkou kansou*), pencegahan kayu melengkung (*sori*) dan retak pecah (*ware*), injeksi zat pengawet anti-rayap.
3. **Manufaktur Kayu Lapis Plywood & Komposit (合板・集成材・CLT製造):**
   - Pengupasan lembaran vinir mesin bubut rotary (*rotary lathe*), pengeleman resin tahan air, pengepresan panas hidrolik (*hot press*), perakitan panel Cross-Laminated Timber (CLT).

---

## 3. MODUL PEMBELAJARAN KURIKULUM (PEDAGOGICAL MODULES)

### MODUL 1: PROSES PENGGERAJIAN KAYU GELONDONGAN (製材工程)
- **Topik 1.1: Pengupasan Kulit & Pembelahan Utama (原木仕分けと帯鋸):**
  - **Topik 1.1.1: Pengupasan Kulit Batang Kayu (バーカー - Debarking):** Pengupasan kulit kayu menyeluruh untuk mencegah pisau gergaji tumpul akibat batu kerikil dan pasir yang menempel.
  - **Topik 1.1.2: Pengoperasian Mesin Gergaji Pita Raksasa (帯鋸盤 - Band Saw):** Pemasangan bilah pita baja fleksibel berputar, penyesuaian tegangan regang pita, pemotongan sejajar serat kayu (*seizai*).
- **Topik 1.2: Pemotongan Tepian & Pemotongan Panjang (エッジャー・クロスカット):**
  - **Topik 1.2.1: Pemotongan Lebar Papan (エッジャー - Edger Saw):** Pemangkasan kedua sisi tepian kayu berkulit menjadi papan berpenampang persegi empat teratur.
  - **Topik 1.2.2: Pemotongan Panjang Balok Standar Bangunan (3m, 4m):** Pemotongan tegak lurus ujung balok (*cross-cut saw*) dan pemilahan berdasarkan kelas dimensi penampang JIS/JAS.

---

### MODUL 2: KADAR AIR & TEKNOLOGI PENGERINGAN (木材乾燥技術)
- **Topik 2.1: Karakteristik Kadar Air Kayu (含水率 - Moisture Content):**
  - **Topik 2.1.1: Titik Jenuh Serat (繊維飽和点 - FSP ~ 28–30%):** Kehilangan air bebas tanpa perubahan dimensi vs kehilangan air terikat di bawah FSP yang memicu penyusutan volume kayu secara drastis.
  - **Topik 2.1.2: Pengukuran Menggunakan Moisture Meter Digital:** Pengujian kadar air menggunakan meter tusuk resistansi listrik (standar kayu kering konstruksi JAS: kadar air $\le 15\text{–}20\%$).
- **Topik 2.2: Pengeringan Tungku Kiln Terkontrol (人工乾燥釜):**
  - **Topik 2.2.1: Jadwal Suhu & Kelembapan Pengeringan Kiln:** Pengaturan temperatur uap bertahap untuk mencegah cacat retak dalam (*honeycombing*), retak permukaan (*surface checking*), dan distorsi melintir (*warping*).

---

### MODUL 3: MANUFAKTUR PLYWOOD & KAYU REKAYASA (合板と集成材)
- **Topik 3.1: Pengupasan Vinir & Pengepresan Plywood:**
  - **Topik 3.1.1: Pengupasan Lembaran Vinir Mesin Rotary Lathe:** Perebusan kayu gelondongan air panas, pengupasan lembaran tipis kontinu setebal 1–3 mm dengan pisau pemanjang.
  - **Topik 3.1.2: Penyusunan Serat Menyilang Tegak Lurus (直交積層):** Pengeleman lapisan vinir ganjil (3 lapis, 5 lapis) dengan arah serat saling bersilangan 90° guna meniadakan muai-susut kayu.
- **Topik 3.2: Pengepresan Panas Hidrolik (ホットプレス - Hot Press):**
  - **Topik 3.2.1: Pengerasan Lem Resin Termoset:** Pengepresan plat panas suhu 110°C–130°C bertekanan $1.0\text{–}1.5\text{ MPa}$ dan pemantauan gas emisi formaldehida standar bintang empat ($F☆☆☆☆$).

---

### MODUL 4: K3 MESIN PENGGERAJIAN & LEDAKAN DEBU (木材加工安全と粉塵)
- **Topik 4.1: Pencegahan Bahaya Lontaran Kayu Balik (キックバック防止):**
  - **Topik 4.1.1: Pemasangan Pisau Pembelah Pengaman (割刃 - Spreader / Riving Knife):** Pemasangan bilah pisau pembelah di belakang mata gergaji bundar untuk mencegah kayu menjepit bilah putar dan terlontar ke dada operator.
  - **Topik 4.1.2: Cakar Anti-Lontaran Mundur (反発防止爪 - Anti-Kickback Pawls):** Pengecekan cakar baja satu arah penahan papan kayu agar tidak terlempar ke arah operator.
- **Topik 4.2: Pencegahan Bahaya Ledakan Debu Serbuk Kayu (粉塵爆発防止):**
  - **Topik 4.2.1: Sistem Penghisap Debu Blower & Siklon (集塵ダクト):** Pembersihan rutin tumpukan serbuk gergaji halus kering; konsentrasi debu melayang tinggi di udara yang terkena percikan motor dapat memicu ledakan bola api dahsyat.
- **Topik 4.3: HOU-REN-SO Saat Bilah Gergaji Retak:**
  - **Topik 4.3.1: Prosedur Penghentian Mesin Band Saw:** Penghentian seketika saat terdengar suara getaran kepak abnormal pada bilah pita baja gergaji (*obi-noko kiretsu*).

---

## 4. KOSAKATA TEKNIS LAYER 2 (JAWIC OFFICIAL TIMBER LEXICON)

| No | Kanji | Kana | Romaji | Indonesian Gloss | High-Stakes Risk Category |
|---|---|---|---|---|---|
| 1 | 製材工場 | せいざいこうじょう | *seizai koujou* | Pabrik penggerajian pengolahan kayu gelondongan | Heavy Industrial Machinery Hazard |
| 2 | 含水率 | がんすいりつ | *gansuiritsu* | Persentase kadar air dalam jaringan serat kayu | Dimensional Shrinkage Warping |
| 3 | 帯鋸盤 | おびのこばん | *obinokoban* | Mesin gergaji pita baja pemotong kayu besar | Blade Snapping Projectile Hazard |
| 4 | 割刃（わりは） | わりは | *wariha* | Pisau pembelah pengaman pencegah kayu terjepit | Severe Kickback Flying Log Hazard |
| 5 | 木材乾燥釜（キルン） | もくざいかんそうがま | *mokuzai kansougama (kirun)*| Tungku kiln pengering kayu suhu dan uap terkontrol| Steam Scald & Fire Hazard |
| 6 | 粉塵爆発 | ふんじんばくはつ | *funjin bakuhatsu* | Ledakan dahsyat partikel debu kayu di udara | Catastrophic Facility Explosion |
| 7 | 合板（ベニヤ） | ごうはん（べにや） | *gouhan (beniya)* | Kayu lapis susunan vinir bersilangan tegak lurus | Glue Formaldehyde Vapor Hazard |
| 8 | 反発防止爪 | はんぱつぼうしづめ | *hampatsu boushidzume* | Cakar baja pencegah papan terlontar balik | Blunt Thoracic Trauma Fatality |
| 9 | バーカー（樹皮剥ぎ機）| ばーかー | *baakaa* | Mesin otomatis pengupas kulit kayu gelondongan | High-Torque Log Pinch Point |
| 10 | 非常停止ワイヤー | ひじょうていしわいやー | *hijou teishi waiyaa* | Kawat darurat penarik pemutus arus sepanjang konveyor| Life-Critical Emergency Stop |
| 11 | 集成材（グルーラム） | しゅうせいざい | *shuuseizai (guruuramu)* | Balok kayu laminasi perekat struktural kokoh | Delamination Structural Failure |
| 12 | ＣＬＴ（直交積層材） | しーえるてぃー | *shii-eru-tii (CLT)* | Panel masif susunan papan kayu silang arsitektur| Heavy Crane Rigging Hazard |
| 13 | 丸のこ盤 | まるのこばん | *marunokoban* | Mesin gergaji piringan sirkular pemotong kayu | Severe Finger Amputation Hazard |
| 14 | 集塵装置 | しゅうじんそうち | *shuujin souchi* | Sistem blower pipa penghisap debu dan serbuk gergaji| Airway Inhalation & Dust Fire |
| 15 | 送材車 | そうざいしゃ | *souzaisha* | Kereta rel penjepit kayu pembawa ke mata gergaji | Carriage Rail Pinch Point |
| 16 | ロータリーレース | ろーたりーれーす | *rootarii reesu* | Mesin bubut pengupas vinir kayu lapis kontinu | High-Speed Log Peel Maiming |
| 17 | ホットプレス | ほっとぷれす | *hotto puresu* | Mesin kempa pres panas lembaran kayu lapis | Severe Thermal Crush Amputation |
| 18 | 単板（ベニヤシート） | たんばん（べにやしーと）| *tamban (beniya shiito)* | Lembaran tipis vinir kayu bahan baku plywood | Paper-Thin Razor Sharp Edge Cut |
| 19 | 節（生き節・死に節） | ふし（いきぶし・しにぶし）| *fushi* | Mata kayu sehat dan mata kayu mati lepas | Structural Load Bearing Loss |
| 20 | 木材腐朽菌 | もくざいふきゅうきん | *mokuzai fukyuukin* | Jamur pembusuk pengurai selulosa dan lignin kayu | Dry Rot Structural Collapse |
| 21 | 防腐防蟻処理 | ぼうふぼうぎしょり | *boufu bougi shori* | Perendaman zat kimia pengawet anti-rayap kayu | Chemical Skin & Eye Toxicity |
| 22 | 木理（木目） | もくり（もくめ） | *mokuri (mokume)* | Pola arah serat alami dan alur pertumbuhan kayu | Splitting along Natural Grain |
| 23 | 背割り | せわり | *sewari* | Takik celah buatan pelepas tegangan susut balok | Preventative Structural Relieving |
| 24 | 曲がり・反り | まがり・そり | *magari / sori* | Cacat kelengkungan melengkung akibat susut tak rata| Out-of-Spec Construction Reject |
| 25 | 木材選別基準（JAS） | もくざいせんべつきじゅん| *mokuzai sembetsu kijun (JAS)*| Standar sertifikasi resmi mutu kayu bangunan Jepang| Substandard Timber Liability |
| 26 | 木屑コンベア | きくずこんべあ | *kikuzu kombea* | Ban berjalan pembuang sisa potongan kayu pabrik | Conveyor Nip Point Amputation |
| 27 | 研磨サンドペーパー | けんまさんどぺーぱー | *kemma sando peepaa* | Kertas ampelas mesin pemoles bidang permukaan papan | Friction Burn & Dust Cloud |
| 28 | 送りローラー | おくりろーらー | *okuri rooraa* | Roda rol penarik papan masuk ke bilah pemotong | Finger Trapping Crush Hazard |
| 29 | 木材結束機 | もくざいけっそくき | *mokuzai kessokuki* | Mesin pengikat pita baja pengaman bundel balok | High-Tension Strap Snap Hazard |
| 30 | 防毒マスク（ホルム） | ぼうどくますく | *boudoku masuku* | Masker respirator penyaring uap kimia resin perekat| Carcinogenic VOC Inhalation |
| 31 | 耳板 | みみいた | *mimi-ita* | Papan kulit terluar sisa pembelahan balok persegi | Discard Handling Laceration |
| 32 | リッパー（縦挽き機） | りっぱー | *rippaa* | Mesin gergaji pembelah kayu searah alur serat | Violent Kickback Ejection |
| 33 | 横切り盤（クロスカット）| よこぎりばん | *yokogiriban* | Mesin gergaji pemotong melintang serat tegak lurus| Crosscut Blade Exposure Hazard |
| 34 | 木粉堆積禁止 | もくふんたいせききんし | *mokufun taiseki kinshi* | Larangan tumpukan debu serbuk kayu di dekat motor | Spontaneous Smoldering Fire |
| 35 | 耐切創手袋 | たいせっそうてぶくろ | *taisessou tebukuro* | Sarung tangan serat kawat baja anti-robek dan sayat| Hand Laceration Prevention |
| 36 | ５Ｓ木材集積場 | ごえすもくざいしゅうせきじょう| *goesumokuzai shuusekijou*| Penataan rapi tumpukan balok dengan balok ganjal | Falling Stack Timber Collapse |

---

## 5. DIRECTIVES K3 DARURAT & FORMULA YUBISASHI KOSHO

### Teriakan Darurat Spontan di Tempat Kerja:
- *「危ない！キックバックだ！丸のこ正面に立つな！」* (*Abunai! Kikkubakku da! Marunoko shoumen ni tatsu na!* — Bahaya! Kickback! Jangan berdiri di depan gergaji!)
- *「帯鋸停止！刃に亀裂が入っている！」* (*Obinoko teishi! Ha ni kiretsu ga haitte iru!* — Hentikan band saw! Bilahnya retak!)
- *「粉塵に火花を飛ばすな！集塵機を回せ！」* (*Funjin ni hibana wo tobasu na! Shuujinki wo mawase!* — Jangan percikkan api ke debu! Nyalakan exhaust blower!)

### Formula Point-and-Call (指差し呼称):
1. **Pengecekan Pisau Pembelah Gergaji:** *「丸のこ盤割刃、すき間5ミリ以内、固定、ヨシ！」*
2. **Pengecekan Cakar Anti-Lontaran:** *「反発防止爪、作動確認、ヨシ！」*
3. **Pengecekan Kadar Air Balok Kayu:** *「JAS基準含水率、15パーセント以下、クリア、ヨシ！」*
4. **Pengecekan Saluran Hisap Debu:** *「集塵ダクトダンパー全開、吸引負圧、ヨシ！」*

---

## 6. BANK SOAL UJIAN INDUSTRI KAYU RESMI

### Contoh Soal Ujian Teori (学科試験 ○×):
> **Soal 1:** 木材を人工乾燥釜（キルン）で乾燥させる場合、最初から急激に高温かつ低湿度で乾燥させると、木材の表面割れや内部割れが発生しやすくなる。  
> **Kunci Jawaban:** **○ (Benar)** (Pengeringan drastis memicu perbedaan tegangan kadar air ekstrem antara permukaan luar dan inti dalam pemicu retak internal).

> **Soal 2:** 丸のこ盤に設置する「割刃（わりは）」は、切削中の木材がのこ刃の後部を締め付けることによって発生するキックバック（材の跳ね返り）を防止する重要な安全装置である。  
> **Kunci Jawaban:** **○ (Benar)** (Spreader/riving knife wajib dipasang rapat di belakang bilah piringan untuk mencegah celah kayu menjepit gigi gergaji).

### Contoh Soal Ujian Praktik On-Screen (実技試験):
> **Soal 1:** 画面の写真を見て、丸のこ盤の割刃（安全装置）とのこ刃とのすき間（間隔）として、労働安全衛生規則で定められている適切な値を選びなさい。  
> A. 12 mm 以下  
> B. 25 mm 以上  
> C. 50 mm 程度  
> D. 接触していれば間隔はゼロでよい  
> **Kunci Jawaban:** **A** (Regulasi K3 Jepang mewajibkan celah jarak antara pisau pembelah dan mata gergaji tidak boleh melebihi 12 mm).
`;

fs.writeFileSync(path.join(sswDir, "SSW-14-TIMBER-PROCESSING-SYLLABUS.md"), ssw14Content, "utf8");
console.log("SSW-14 written successfully!");
