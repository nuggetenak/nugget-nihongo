const fs = require("fs");
const path = require("path");

const sswDir = path.join(__dirname, "../corpus/sections/synthesis/syllabi/ssw");

// ==========================================
// SSW-09: CONSTRUCTION INDUSTRY
// ==========================================
const ssw09Content = `# SILABUS KEJURUAN RESMI NUGGET NIHONGO · SEKTOR 09: CONSTRUCTION INDUSTRY (INDUSTRI KONSTRUKSI)
**Kode Sektor:** \`SSW-CNST-01\` · **Versi:** v2.0 (Corpus v30 Canonical Revision)  
**Status:** AUTHORITATIVE & EXHAUSTIVE SECTOR SYLLABUS  
**Kementerian Pembina:** Kementerian Pertanahan, Infrastruktur, Transportasi dan Pariwisata Jepang (MLIT / 国土交通省)  
**Badan Pelaksana Uji:** Organisasi SDM Keterampilan Konstruksi Jepang (JAC / 一般社団法人 建設技能人材機構) & Prometric  
**Dasar Kurasi Primer:**
- \`reference-books/ssw/07_kensetsu_construction/Construction_Common_Safety_Text2_JA.pdf\` (Keselamatan Umum, K3 & Budaya Kerja Proyek, 18 halaman)
- \`reference-books/ssw/07_kensetsu_construction/Construction_Civil_Theory_Text1d_JA.pdf\` & \`reference-books/ssw/07_kensetsu_construction/Construction_Civil_Theory_Text14d_ID.pdf\` & \`reference-books/ssw/07_kensetsu_construction/Construction_Civil_Practical_Text57d_ID.pdf\` (Teknik Sipil / 土木)
- \`reference-books/ssw/07_kensetsu_construction/Construction_Building_Theory_Text1k_JA.pdf\` & \`reference-books/ssw/07_kensetsu_construction/Construction_Building_Theory_Text14k_ID.pdf\` & \`reference-books/ssw/07_kensetsu_construction/Construction_Building_Practical_Text57k_ID.pdf\` (Arsitektur Gedung / 建築)
- \`reference-books/ssw/07_kensetsu_construction/Construction_Lifeline_Theory_Text1l_JA.pdf\` & \`reference-books/ssw/07_kensetsu_construction/Construction_Lifeline_Theory_Text14l_ID.pdf\` & \`reference-books/ssw/07_kensetsu_construction/Construction_Lifeline_Practical_Text57l_ID.pdf\` (Fasilitas & Jalur Kehidupan / 設備)
- \`reference-books/ssw/07_kensetsu_construction/Construction_Theory_Sample_JA.pdf\` & \`reference-books/ssw/07_kensetsu_construction/Construction_Theory_Sample_ID.pdf\`
- \`reference-books/ssw/07_kensetsu_construction/Construction_Civil_Practical_Sample_ID.pdf\`, \`reference-books/ssw/07_kensetsu_construction/Construction_Building_Practical_Sample_ID.pdf\`, \`reference-books/ssw/07_kensetsu_construction/Construction_Lifeline_Practical_Sample_ID.pdf\`
**Landasan Teoretis & Empiris:**
- Needs Analysis & Technical Lexicon (Nation & Hwang 1995 [VS-09]; Chung & Nation 2003 [VS-10])
- Cross-Cultural Communication in Construction Gemba & HOU-REN-SO (Mustaqim & Priventa 2026 [VS-31]; Supriatnaningsih et al. 2024 [VS-33])
- Geminate Acoustic Intelligibility in High-Noise Construction Sites (Husna & Febriyanti 2022 [EA-25])
- Construction Safety Training & 3-Division Standards (JNIOSH 2020 [VS-39]; JAC 2024 [VS-41])

---

## 1. SPESIFIKASI UJIAN RESMI PROMETRIC CBT (STANDAR JAC / MLIT)

Kandidat visa *Tokutei Ginou 1-gō* bidang Konstruksi menempuh ujian Computer-Based Testing (CBT) dengan spesifikasi regulasi resmi:

\`\`\`
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                              PROMETRIC CBT CONSTRUCTION INDUSTRY EXAM MATRIX                           │
├─────────────────────────┬────────────────────────────────────────┬─────────────┬───────────┬───────────┤
│ Komponen Ujian          │ Cakupan Ranah Pengujian                │ Jumlah Soal │ Durasi    │ Ambang    │
├─────────────────────────┼────────────────────────────────────────┼─────────────┼───────────┼───────────┤
│ 1. Ujian Teori          │ K3 umum konstruksi, hukum ketenagaker- │ 30 Soal     │ 60 Menit  │ $\\ge 60\\%$│
│    (学科試験 - Gakka)   │ jaan, gambar teknik, serta spesialisasi│ (Pilihan    │           │ (18 / 30) │
│                         │ sub-bidang terpilih (Sipil/Gedung/Fas) │  Ganda 4)   │           │           │
├─────────────────────────┼────────────────────────────────────────┼─────────────┼───────────┼───────────┤
│ 2. Ujian Praktik Layar  │ Identifikasi visual alat kerja, urutan │ Skenario    │ Terpadu   │ $\\ge 60\\%$│
│    (実技試験 - Jitsugi) │ perancahan, sinyal tamakake kran, dan  │ Visual CBT  │ dalam sesi│           │
│                         │ penanganan situasi bahaya tanah longsor│ 3 Divisi    │  CBT      │           │
└─────────────────────────┴────────────────────────────────────────┴─────────────┴───────────┴───────────┘
\`\`\`

> **Catatan Bahasa Ujian:** Ujian Teori dan Praktik disajikan dalam **Bahasa Jepang (dengan furigana)** dan disediakan opsi terjemahan **Bahasa Indonesia**.

---

## 2. TIGA DIVISI SPESIALISASI KONSTRUKSI JEPANG (JAC)

Sesuai konsolidasi regulasi MLIT, 19 sub-kejuruan lama dikonsolidasi menjadi 3 divisi terpadu:
1. **Divisi Teknik Sipil (土木区分 - Doboku, Kode \`d\`):**
   - Pekerjaan tanah (*doko*), pondasi tiang pancang, bekisting beton sipil, pengaspalan jalan raya, terowongan, bendungan, dan retaining wall perkuatan tebing.
2. **Divisi Arsitektur Gedung (建築区分 - Kenchiku, Kode \`k\`):**
   - Rangka baja gedung (*tekkin / tekkotsu*), bekisting kayu/panel (*katawaku*), pemasangan dinding eksterior (*siding*), waterproofing atap, plester semen, dan interior finishing.
3. **Divisi Fasilitas & Jalur Kehidupan (ライフライン・設備区分 - Lifeline, Kode \`l\`):**
   - Perpipaan air bersih dan limbah (*plumbing*), instalasi pipa gas kota bertekanan, saluran pendingin udara HVAC, perkabelan listrik gedung, dan insulasi termal pipa.

---

## 3. MODUL PEMBELAJARAN KURIKULUM (PEDAGOGICAL MODULES)

### MODUL 1: KESELAMATAN K3 PROYEK & BUDAYA KERJA GEMBA (共通安全衛生)
- **Topik 1.1: Perlindungan Mutlak dari Bahaya Jatuh Ketinggian (墜落・転落防止):**
  - **Topik 1.1.1: Standar Penggunaan Sabuk Pengaman Full Harness:** Kewajiban sabuk pengaman tubuh penuh (*full harness*) pada ketinggian $\ge 2\text{ meter}$, pemasangan pengait tali ganda (*nicho-gake*), dan pengecekan shock absorber.
  - **Topik 1.1.2: Inspeksi Kekokohan Perancah (足場点検 - Ashiba):** Pengecekan papan lantai kerja rapat tanpa celah ($gap \le 3\text{ cm}$), pagar pengaman ganda (*tesuri* tinggi $\ge 85\text{ cm}$), dan toe-board penahan alat jatuh (*habaki* $\ge 10\text{ cm}$).
- **Topik 1.2: Budaya Kerja Proyek & Pencegahan Pelecehan:**
  - **Topik 1.2.1: Apel Pagi Proyek & Senam Keselamatan (朝礼・ラジオ体操):** Partisipasi aktif dalam briefing pagi, senam peregangan otot, dan latihan prediksi bahaya (*KYK / Kiken Yochi Katsudou*).
  - **Topik 1.2.2: Regulasi Jam Kerja & Pelarangan Power Harassment:** Jam kerja maksimal 8 jam/hari (40 jam/minggu), istirahat wajib, dan penolakan tegas tindakan kekerasan fisik/verbal di proyek.

---

### MODUL 2: TEKNIK SIPIL & PEKERJAAN TANAH (土木施工技術)
- **Topik 2.1: Penggalian Tanah & Pencegahan Longsor (土砂崩壊防止):**
  - **Topik 2.1.1: Kemiringan Lereng Galian & Turap Penahan (山留め):** Sudut kemiringan aman galian tanah terbuka, pemasangan dinding turap penahan tanah (*yamadome shicho*), dan pengecekan rembesan air tanah.
  - **Topik 2.1.2: Pemadatan Tanah & Pengurukan (盛土・締固め):** Pengoperasian stamper/roller pemadat, pengujian kepadatan tanah timbunan lapis demi lapis.
- **Topik 2.2: Pengecoran Beton Struktur Sipil (生コンクリート打設):**
  - **Topik 2.2.1: Uji Slump & Suhu Beton Segar:** Pengukuran nilai slump kemudahan alir beton segar, rasio air-semen, dan batas waktu pengecoran $\le 90\text{–}120\text{ menit}$ dari batching plant.
  - **Topik 2.2.2: Penggetaran Beton Menggunakan Vibrator:** Teknik memasukkan jarum vibrator tegak lurus ke dalam adukan beton untuk mengeliminasi rongga udara tanpa mengenai rangka tulangan baja.

---

### MODUL 3: ARSITEKTUR GEDUNG & BEKISTING (建築施工技術)
- **Topik 3.1: Pekerjaan Rangka Baja & Pembesian Tulangan (鉄筋・鉄骨):**
  - **Topik 3.1.1: Pemasangan & Pengikatan Kawat Tulangan (鉄筋結束):** Penggunaan kawat bendrat pengikat (*kessokusen*), jarak selimut beton (*kaburiatsu*), dan pemasangan spacer beton penumpu tulangan.
  - **Topik 3.1.2: Pengencangan Baut Geser Mutu Tinggi (ハイテンションボルト):** Pengencangan baut shear wrench hingga ujung baut (*pin-tail*) patah putus sebagai bukti tercapainya torsi desain JIS.
- **Topik 3.2: Pemasangan Bekisting & Dinding Panel:**
  - **Topik 3.2.1: Pemasangan Panel Kayu Lapis Bekisting (型枠工):** Pemasangan form-tie perapat tekanan samping beton cair, balok pipa penopang horizontal/vertikal, dan pembersihan serbuk kayu sisa.
  - **Topik 3.2.2: Pemasangan Pelat Eksterior & Kedap Air (サイディング・防水):** Sambungan sealant silikon elastis elastis, membran kedap air aspal/uretan pada dak beton atap gedung.

---

### MODUL 4: FASILITAS JALUR KEHIDUPAN & UTILITAS (ライフライン設備)
- **Topik 4.1: Instalasi Perpipaan Air Bersih, Air Kotor & Gas:**
  - **Topik 4.1.1: Penyambungan Pipa PVC & Pipa Baja Berulir:** Pemotongan tegak lurus pipa, pembersihan bram reamer, pengeleman semen solvent PVC, dan pelilitan pita teflon (*shiru teepu*).
  - **Topik 4.1.2: Uji Tekanan & Deteksi Kebocoran Pipa Gas:** Uji tekanan udara/gas menggunakan cairan busa detektor kebocoran; larangan keras menggunakan api terbuka untuk mendeteksi gas!
- **Topik 4.2: Instalasi Kabel Listrik Saluran Konduit & HVAC:**
  - **Topik 4.2.1: Pembengkokan Pipa Konduit Baja (パイプベンダー):** Pembengkokan pipa kabel listrik tanpa retak, penarikan kawat pancing kabel (*tsuu-sen*), dan pentanahan pembumian bodi pipa.
  - **Topik 4.2.2: Pemasangan Saluran Udara Seng (ダクト工 - Ducting):** Sambungan flange lipatan seng ducting AC, peredam getaran kanvas elastis, dan pembungkusan isolasi glasswool tahan api.

---

### MODUL 5: PENGOPERASIAN CRANE & PENGISYARATAN TAMAKAKE (玉掛け合図)
- **Topik 5.1: Sinyal Tangan Standar JIS Pengangkatan Derek:**
  - **Topik 5.1.1: Kode Isyarat Tangan Crane (玉掛け合図):** Angkat kait (*makiage* - telunjuk memutar ke atas), turunkan kait (*maki-sage* - telunjuk memutar ke bawah), berhenti darurat (*hijou teishi* - lambaian kedua lengan menyilang).
  - **Topik 5.1.2: Larangan Masuk di Bawah Beban Gantung (立入禁止):** Larangan mutlak berdiri atau melintas di bawah muatan derek yang sedang melayang di udara!

---

## 4. KOSAKATA TEKNIS LAYER 2 (JAC OFFICIAL CONSTRUCTION LEXICON)

| No | Kanji | Kana | Romaji | Indonesian Gloss | High-Stakes Risk Category |
|---|---|---|---|---|---|
| 1 | フルハーネス | ふるはーねす | *furu haanesu* | Sabuk keselamatan tubuh penuh pencegah jatuh | High Fall Fatality ($\\ge 2\\text{m}$) |
| 2 | 足場点検 | あしばてんけん | *ashiba tenken* | Inspeksi kekokohan lantai dan pagar perancah | Scaffolding Structural Collapse |
| 3 | 土砂崩壊 | どしゃほうかい | *dosha houkai* | Longsoran runtuhan dinding tanah parit galian | Trench Cave-in Suffocation |
| 4 | 玉掛け合図 | たまかけあいず | *tamakake aizu* | Sinyal tangan pemanduan pengangkatan derek kran | Crane Load Drop Disaster |
| 5 | 朝礼・ＫＹＫ | ちょうれい・けーわいけー | *chourei / KYK* | Apel pagi dan latihan prediksi bahaya proyek | Gemba Hazard Misalignment |
| 6 | 二丁掛け | にちょうがけ | *nichou gake* | Pemasangan kait ganda tali pengaman bergantian | 100% Tie-Off Compliance |
| 7 | 生コンクリート | なまこんくりーと | *nama konkuriito* | Campuran adukan beton basah siap tuang | Slump Curing Failure |
| 8 | 型枠支保工 | かたわくしほこう | *katawaku shihokou* | Tiang perancah penopang cetakan beton cor | Formwork Burst Collapse |
| 9 | 鉄筋結束 | てっきんけっそく | *tekkin kessoku* | Pengikatan anyaman rangka tulangan kawat baja | Structural Integrity Defect |
| 10 | 非常停止スイッチ | ひじょうていしすいっち | *hijou teishi suitchi* | Tombol pemutus darurat peralatan alat berat | Life-Critical Escalation |
| 11 | 山留め支保工 | やまどめしほこう | *yamadome shihokou* | Dinding turap penahan tekanan tanah tebing | Excavation Wall Failure |
| 12 | かぶり厚さ | かぶりあつさ | *kaburiatsusa* | Tebal selimut beton pelindung tulangan baja | Premature Rebar Corrosion |
| 13 | スランプ試験 | すらんぷしけん | *surampu shiken* | Pengujian penurunan kekentalan beton segar | Concrete Quality Rejection |
| 14 | 覆工板 | ふっこうばん | *fukkouban* | Pelat baja penutup lubang galian jalan sementara | Vehicle Breakthrough Drop |
| 15 | 配管気密試験 | はいかんきみつしけん | *haikan kimitsu shiken* | Uji kebocoran tekanan udara/gas saluran pipa | Flammable Gas Explosion |
| 16 | 立ち入り禁止区域 | たちいりきんしくいき | *tachiiri kinshi kuiki* | Zona steril larangan melintas di bawah kran | Struck by Falling Object |
| 17 | 巾木（幅木） | はばき | *habaki* | Papan penahan kaki pencegah perkakas jatuh | Dropped Object Injury |
| 18 | 安全ネット | あんぜんねっと | *anzen netto* | Jaring pengaman jatuh penahan tubuh di perancah | Fall Arrest Secondary Line |
| 19 | 締固め（転圧） | しめかため（てんあつ） | *shimekatame (ten'atsu)* | Pemadatan tanah uruk menggunakan mesin compactor| Subgrade Subsidence Failure |
| 20 | 誘導員 | ゆうどういん | *yuudouin* | Petugas pengatur lalu lintas kendaraan alat berat| Heavy Equipment Blind Collision |
| 21 | 重機旋回範囲 | じゅうきせんかいはんい | *juuki senkai han'i* | Radius ayunan belakang kabin excavator tanah | Crushed by Excavator Counterweight |
| 22 | バイブレーター | ばいぶれーたー | *baibureetaa* | Mesin penggetar adukan beton pemadat rongga | Honeycombing Void Defect |
| 23 | シールテープ | しーるてーぷ | *shiiru teepu* | Pita teflon perapat ulir sambungan pipa air/gas | Pressurized Fluid Leakage |
| 24 | パイプベンダー | ぱいぷべんだー | *paipu bendaa* | Alat pembengkok pipa konduit kabel listrik | Pipe Kinking & Conduit Block |
| 25 | 水準器（水平器） | すいじゅんき（すいへいき） | *suijunki (suiheiki)* | Waterpass pengukur kedataran bidang permukaan | Leveling & Plumb Error |
| 26 | 下げ振り | さげふり | *sagefuri* | Bandul lot pengukur ketegaklurusan vertikal | Wall Vertical Drift Error |
| 27 | あご紐締め付け | あごひもしめつけ | *agohimo shimetsuke* | Pengencangan tali dagu helm pelindung kepala | Helmet Loss during Fall |
| 28 | 落下物防止網 | らっかぶつぼうしあみ | *rakkabutsu boushi ami* | Jaring kawat penahan serpihan material runtuh | Pedestrian Struck Hazard |
| 29 | 差し筋 | さしすじ | *sashisuji* | Besi stek tulangan sambungan cor beton lanjutan | Cold Joint Delamination |
| 30 | 打設順序 | だせつじゅんじょ | *dasetsu junjo* | Urutan logis penuangan beton mencegah sambungan dingin | Structural Crack Line Defect |
| 31 | 止水栓 | しすいせん | *shisuisen* | Katup penutup aliran air utama pipa gedung | Water Flooding Building Damage |
| 32 | 酸欠測定器 | さんけつそくていき | *sanketsu sokuteiki* | Alat pengukur kadar oksigen ruang galian dalam | Manhole Hypoxia Fatality |
| 33 | 投光器 | とうこうき | *toukouki* | Lampu sorot penerangan kerja lembur malam hari | Nighttime Visual Impairment |
| 34 | 切梁（きりばり） | きりばり | *kiribari* | Balok baja horizontal penahan dinding galian | Structural Bracing Buckling |
| 35 | ワイヤーロープ点検 | わいやーろーぷてんけん | *waiyaa roopu tenken* | Pemeriksaan kawat sling derek dari serat putus | Rigging Sling Catastrophic Snap |
| 36 | ５Ｓ現場美化 | ごえすげんばびか | *goesugemba bika* | Pembersihan paku menonjol dan kawat di lantai | Puncture Wound & Tetanus |

---

## 5. DIRECTIVES K3 DARURAT & FORMULA YUBISASHI KOSHO

### Teriakan Darurat Spontan di Tempat Kerja:
- *「危ない！吊り荷の下に入るな！退避しろ！」* (*Abunai! Tsuri-ni no shita ni hairu na! Taihi shiro!* — Bahaya! Jangan masuk ke bawah beban gantung! Menyingkir!)
- *「土砂が崩れるぞ！溝から上がれ！」* (*Dosha ga kuzureru zo! Mizo kara agare!* — Tanah longsor! Cepat naik dari parit!)
- *「フックを掛けろ！フルハーネス二丁掛け！」* (*Fukku wo kakero! Furu haanesu nichou-gake!* — Pasang kaitnya! Double hook harness!)

### Formula Point-and-Call (指差し呼称):
1. **Pengecekan Tali Dagu Helm:** *「ヘルメットあご紐、締め付け確認、ヨシ！」*
2. **Pengecekan Sabuk Pengaman Ketinggian:** *「フルハーネス安全帯、フック二丁掛け、ヨシ！」*
3. **Pengecekan Beban Derek Kran:** *「玉掛けワイヤー、外れ止めロック、ヨシ！」*
4. **Pengecekan Dinding Parit Galian:** *「山留め支保工、異常なし、崩壊の危険なし、ヨシ！」*

---

## 6. BANK SOAL UJIAN CBT JAC RESMI

### Contoh Soal Ujian Teori (学科試験 4 Pilihan):
> **Soal 1:** 高所作業において使用するフルハーネス型安全帯の取り扱いとして、最も適切なものを１つ選びなさい。  
> １. フックは腰よりも低い位置にある足場パイプに掛けるのが原則である。  
> ２. 移動する際は、２つのフックを交互に掛け替える「二丁掛け」を行い、無胴綱状態（ノーランヤード）を作らない。  
> ３. ショックアブソーバ（衝撃吸収器）は邪魔になるため取り外して使用する。  
> ４. Ｄ環（ランヤード接続部）は胸の前に来るように装着する。  
> **Kunci Jawaban:** **2** (Prinsip nicho-gake wajib diterapkan agar pekerja selalu terlindungi tali pengaman tanpa jeda sedetik pun).

> **Soal 2:** 生コンクリートの打設作業において、棒状コンクリート振動機（バイブレーター）を使用する目的として、正しいものを１つ選びなさい。  
> １. コンクリートの凝固時間を遅らせるため。  
> ２. コンクリート中の余分な空気を追い出し、型枠の隅々まで密実に充填させるため。  
> ３. 鉄筋の位置を動かして調整するため。  
> ４. コンクリートの水分量を蒸発させるため。  
> **Kunci Jawaban:** **2** (Vibrator digunakan untuk memadatkan adukan dan mengeliminasi rongga udara agar mutu beton padat sempurna).

### Contoh Soal Ujian Praktik On-Screen (実技試験):
> **Soal 1:** 画面の写真を見て、クレーンの玉掛け作業における合図として、人差し指を上に向け、手首を大きく上向きに回転させている動作の意味を選びなさい。  
> A. 巻き下げ（降下）  
> B. 巻き上げ（上昇）  
> C. 転倒注意  
> D. 緊急停止  
> **Kunci Jawaban:** **B** (Gerakan memutar telunjuk ke atas adalah sinyal resmi pengangkatan kait derek kran/makiage).
`;

fs.writeFileSync(path.join(sswDir, "SSW-09-CONSTRUCTION-INDUSTRY-SYLLABUS.md"), ssw09Content, "utf8");
console.log("SSW-09 written successfully!");

// ==========================================
// SSW-10: AGRICULTURE (CROP FARMING)
// ==========================================
const ssw10Content = `# SILABUS KEJURUAN RESMI NUGGET NIHONGO · SEKTOR 10: AGRICULTURE - CROP FARMING (PERTANAMAN HORTIKULTURA)
**Kode Sektor:** \`SSW-AGRI-01\` · **Versi:** v2.0 (Corpus v30 Canonical Revision)  
**Status:** AUTHORITATIVE & EXHAUSTIVE SECTOR SYLLABUS  
**Kementerian Pembina:** Kementerian Pertanian, Kehutanan dan Perikanan Jepang (MAFF / 農林水産省)  
**Badan Pelaksana Uji:** Kamar Dagang Pertanian Nasional (NCA / 一般社団法人 全国農業会議所 / ASAT) & Prometric  
**Dasar Kurasi Primer:**
- \`reference-books/ssw/04_nougyou_agriculture/Agri_Crop_Farming_Textbook_JA.pdf\` (105 halaman) & \`reference-books/ssw/04_nougyou_agriculture/Agri_Crop_Farming_Textbook_ID.pdf\` (Pertanaman Hortikultura)
- \`reference-books/ssw/04_nougyou_agriculture/Agri_Japanese_Textbook_JA.pdf\` (68 halaman) & \`reference-books/ssw/04_nougyou_agriculture/Agri_Japanese_Textbook_ID.pdf\` (Bahasa Jepang Pertanian)
- \`reference-books/ssw/04_nougyou_agriculture/Agri_SSW2_Crop_Farming_JA.pdf\` & \`reference-books/ssw/04_nougyou_agriculture/Agri_SSW2_Safety_Common_JA.pdf\` (Tingkat Lanjut 2-gō)
- \`reference-books/ssw/04_nougyou_agriculture/Agri_Exam_Sample_Questions_JA.pdf\` (29 halaman Bank Soal Resmi ASAT)
**Landasan Teoretis & Empiris:**
- Needs Analysis & Technical Lexicon (Nation & Hwang 1995 [VS-09]; Chung & Nation 2003 [VS-10])
- Cross-Cultural Communication in Agricultural Gemba & HOU-REN-SO (Mustaqim & Priventa 2026 [VS-31]; Supriatnaningsih et al. 2024 [VS-33])
- Geminate Acoustic Intelligibility in Outdoor Field Equipment Calls (Husna & Febriyanti 2022 [EA-25])
- Agricultural Safety & Tractor Rollover Standards (JNIOSH 2020 [VS-39]; National Chamber of Agriculture 2024 [VS-47])

---

## 1. SPESIFIKASI UJIAN RESMI PROMETRIC CBT (STANDAR ASAT / MAFF)

Kandidat visa *Tokutei Ginou 1-gō* bidang Pertanaman Hortikultura menempuh ujian Computer-Based Testing (CBT) dengan spesifikasi regulasi resmi:

\`\`\`
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                        PROMETRIC CBT AGRICULTURE CROP FARMING EXAM MATRIX                              │
├─────────────────────────┬────────────────────────────────────────┬─────────────┬───────────┬───────────┤
│ Komponen Ujian          │ Cakupan Ranah Pengujian                │ Jumlah Soal │ Durasi    │ Ambang    │
├─────────────────────────┼────────────────────────────────────────┼─────────────┼───────────┼───────────┤
│ 1. Ujian Teori          │ Fisiologi tanaman budi daya, jenis dan │ 30–40 Soal  │ 60 Menit  │ $\\ge 60\\%$│
│    (学科試験 - Gakka)   │ penanganan pupuk N-P-K, pestisida aman,│ (Format     │           │ (Berdasarkan│
│                         │ struktur greenhouse, mesin pertanian K3│  True/False │           │  skor total│
│                         │                                        │  ○× & Bergbr)│          │  CBT)      │
├─────────────────────────┼────────────────────────────────────────┼─────────────┼───────────┼───────────┤
│ 2. Ujian Praktik Layar  │ Identifikasi visual penyakit tanaman,  │ Terpadu     │ Terpadu   │ $\\ge 60\\%$│
│    (実技試験 - Jitsugi) │ urutan pengenceran bahan kimia semprot,│ dalam lembar│ dalam sesi│           │
│                         │ penanganan pisau panen dan pemangkasan │  ujian CBT  │  60 Menit │           │
└─────────────────────────┴────────────────────────────────────────┴─────────────┴───────────┴───────────┘
\`\`\`

> **Catatan Bahasa Ujian:** Ujian disajikan dalam **Bahasa Jepang berfurigana**, dengan gambar visual berwarna komprehensif pada setiap nomor soal.

---

## 2. JALUR OPERASIONAL SPESIALISASI PERTANAMAN JEPANG

1. **Budi Daya Sayuran & Rumah Kaca (施設野菜・露地野菜 - Greenhouse & Field):**
   - Tomat, mentimun, stroberi, selada, kubis, daun bawang; pengelolaan nutrisi fertigasi tetes, pengaturan suhu ventilasi rumah kaca, pemasangan mulsa plastik.
2. **Budi Daya Tanaman Buah (果樹栽培 - Fruit Orchards):**
   - Apel, jeruk mikan, anggur, persik; pemangkasan cabang musim dingin (*sentei*), penjarangan buah (*tekika*), pembungkusan buah (*fukuro-kake*), pemanenan tangga.
3. **Tanaman Pangan & Bunga Hias (畑作物・花卉 - Crops & Floriculture):**
   - Padi sawah (*suiden*), gandum, kedelai, bunga krisan, anggrek; pengolahan tanah traktor, penyemaian bibit, pengendalian gulma, pasca-panen.

---

## 3. MODUL PEMBELAJARAN KURIKULUM (PEDAGOGICAL MODULES)

### MODUL 1: FISIOLOGI TANAMAN, TANAH & PEMUPUKAN (作物生理と土壌肥料)
- **Topik 1.1: Tiga Unsur Hara Utama & Pencegahan Kerusakan Tanah:**
  - **Topik 1.1.1: Fungsi Tiga Unsur Hara Pokok (Nitrogen, Fosfor, Kalium):** Nitrogen (*chisso* - pertumbuhan daun), fosfor (*rinsan* - pertumbuhan akar dan bunga), kalium (*kari* - ketahanan penyakit dan kualitas buah).
  - **Topik 1.1.2: Pencegahan Gangguan Monokultur Berulang (連作障害 - Rensaku Shougai):** Rotasi tanaman lintas famili botani, penanaman tanaman perangkap hama (*counter-crop*), dan sterilisasi solarisasi tanah musim panas (*taiyounetsu shoudoku*).
- **Topik 1.2: Kondisi Fisik Tanah & Pengaturan pH (土壌改良):**
  - **Topik 1.2.1: Struktur Tanah Agregat Remah (団粒構造 - Danryuu Kouzou):** Pemberian kompos matang (*taihi*) untuk meningkatkan aerasi, kapasitas retensi air, dan permeabilitas tanah.
  - **Topik 1.2.2: Pengapuran & Pengendalian Keasaman Tanah:** Aplikasi kapur pertanian (*kudo sekkai*) untuk menaikkan pH tanah asam menuju rentang ideal sayuran (pH 6.0–6.5).

---

### MODUL 2: BUDI DAYA RUMAH KACA & KONTROL LINGKUNGAN (施設栽培)
- **Topik 2.1: Material Pelindung Rumah Kaca (ハウス被覆資材):**
  - **Topik 2.1.1: Film Plastik Polyolefin (PO) & Polivinil Klorida (PVC):** Transmisi cahaya matahari, sifat penahan panas radiasi infra-merah malam hari, dan durabilitas anti-kabut.
  - **Topik 2.1.2: Kain Non-Woven & Jaring Penghalau Hama (不織布・防虫ネット):** Pemasangan kain non-woven penahan dingin (*fushokufu*) dan jaring jala halus $0.4\text{–}0.6\text{ mm}$ penghadang kutu kebul (*aphids / thrips*).
- **Topik 2.2: Pengendalian Suhu & Ventilasi Greenhouse:**
  - **Topik 2.2.1: Pengoperasian Ventilasi Samping & Atas (巻き上げ換気):** Membuka tirai samping saat suhu melebihi 28°C guna mencegah tanaman layu kepanasan dan akumulasi kelembapan pemicu jamur.
  - **Topik 2.2.2: Pengaturan Konsentrasi Gas CO2 & Pencahayaan Tambahan:** Pemupukan gas karbon dioksida di pagi hari untuk memaksimalkan laju fotosintesis daun.

---

### MODUL 3: PENGGUNAAN PESTISIDA AMAN & PENGENDALIAN HAMA (農薬安全使用)
- **Topik 3.1: Klasifikasi Pestisida & Rasio Pengenceran (希釈倍率):**
  - **Topik 3.1.1: Insektisida, Fungisida & Herbisida (殺虫剤・殺菌剤・除草剤):** Pemilihan formulasi kimiawi terdaftar MAFF, larangan keras menggunakan pestisida tanpa label legal.
  - **Topik 3.1.2: Perhitungan Takaran & Pengadukan Larutan Semprot:** Formula pengenceran 1000x (10 mL pestisida dicampur 10 L air bersih), pengadukan merata dalam ember takar terpisah.
- **Topik 3.2: Periode Aman Sebelum Panen & Alat Pelindung Diri (収穫前日数とAPD):**
  - **Topik 3.2.1: Batas Waktu Tunggu Pra-Panen (収穫前日数 - Withholding Period):** Kepatuhan mutlak jeda hari penyemprotan terakhir sebelum panen guna menjamin residu kimia nol pada konsumen.
  - **Topik 3.2.2: APD Lengkap Penyemprotan Pestisida Kimia:** Masker respirator gas racun (*boukoku masuku*), kacamata kimia, jas hujan kedap air, dan sarung tangan nitril tebal.

---

### MODUL 4: K3 MESIN PERTANIAN & IKLIM TERIK (農業安全と熱中症)
- **Topik 4.1: Pengoperasian Traktor Pertanian & Pengolah Tanah (トラクター安全):**
  - **Topik 4.1.1: Pencegahan Bahaya Traktor Terguling di Lereng Pematang:** Kewajiban sabuk keselamatan dan kerangka pelindung terguling (*ROPS*), larangan menikung tajam kecepatan tinggi di pematang sawah.
  - **Topik 4.1.2: Bahaya Terlilit Poros Putar PTO (PTO軸巻き込まれ防止):** Penutup pelindung poros transmisi putar (*PTO cover*) wajib terpasang utuh; larangan mendekati mesin rotari saat berputar!
- **Topik 4.2: K3 Tangga Lipat Pemangkasan & Pencegahan Sengatan Panas (熱中症):**
  - **Topik 4.2.1: Standar Penggunaan Tangga Kebun Berkaki Tiga (三脚脚立):** Menancapkan pasak kaki rantai pengaman di tanah gembur; dilarang keras berdiri pada dua anak tangga teratas.
  - **Topik 4.2.2: Pencegahan Dehidrasi Akut di Rumah Kaca Suhu 40°C:** Konsumsi air minum berkadar garam 0.1%–0.2% setiap 20–30 menit, istirahat teratur di tempat teduh berangin.

---

## 4. KOSAKATA TEKNIS LAYER 2 (ASAT OFFICIAL CROP FARMING LEXICON)

| No | Kanji | Kana | Romaji | Indonesian Gloss | High-Stakes Risk Category |
|---|---|---|---|---|---|
| 1 | 連作障害 | れんさくしょうがい | *rensaku shougai* | Penurunan kesuburan akibat tanaman sejenis terus-menerus | Soil Disease Outbreak |
| 2 | 希釈倍率 | きしゃくばいりつ | *kishaku bairitsu* | Rasio kelipatan pengenceran pestisida/pupuk | Phytotoxicity Crop Destruction |
| 3 | 農薬散布 | のうやくさんぷ | *nouyaku sampu* | Tindakan penyemprotan bahan kimia pembasmi hama | Acute Chemical Poisoning |
| 4 | トラクター横転 | とらくたーおうてん | *torakutaa outen* | Tergulingnya traktor pertanian di pematang/lereng | Fatal Rollover Crush Hazard |
| 5 | 熱中症予防 | ねっちゅうしょうよぼう | *netchuushou yobou* | Pencegahan sengatan panas mematikan di rumah kaca | Fatal Hyperthermia Hazard |
| 6 | 不織布 | ふしょくふ | *fushokufu* | Kain non-woven penutup tanaman penahan dingin | Frost Damage to Seedlings |
| 7 | 三脚脚立 | さんきゃくきゃたつ | *sankyaku kyatatsu* | Tangga lipat berkaki tiga pemangkasan pohon kebun | Tipping Fall from Height |
| 8 | 収穫前日数 | しゅうかくぜんにっすう | *shuukaku zen nissuu* | Batas minimal jeda hari semprot pestisida ke panen | Illegal Chemical Residue |
| 9 | ＰＴＯ軸カバー | ぴーてぃーおーじくかばー | *pii-tii-oo jiku kabaa* | Penutup pelindung poros penggerak putar traktor | Fatal Body Entanglement |
| 10 | 育苗管理 | いくびょうかんり | *ikubyou kanri* | Manajemen perawatan persemaian bibit tanaman | Seedling Damping-off Loss |
| 11 | 摘心・整枝 | てきしん・せいし | *tekishin / seishi* | Pemotongan pucuk dan penataan cabang utama | Vegetative Stunting |
| 12 | 摘果 | てきか | *tekika* | Penjarangan buah kecil demi pembesaran buah prima | Commercial Yield Loss |
| 13 | 肥料焼け | ひりょうやけ | *hiryouyake* | Daun/akar hangus terbakar akibat kelebihan konsentrasi pupuk | Chemical Root Desiccation |
| 14 | 土壌消毒 | どじょうしょうどく | *dojou shoudoku* | Sterilisasi tanah pembasmi nematoda dan patogen | Toxic Fume Inhalation |
| 15 | 堆肥施用 | たいひせよう | *taihi seyou* | Pemberian pupuk kompos matang penyubur tanah | Anaerobic Root Rot if Unripe |
| 16 | 畝立て | うねたて | *unedate* | Pembuatan bedengan tanah tanam berpikulan tinggi | Poor Drainage Waterlogging |
| 17 | マルチフィルム | まるちふぃるむ | *maruchi firumu* | Lembaran plastik mulsa penutup tanah pencegah gulma | Overheating / Moisture Imbalance |
| 18 | 側窓換気 | そくそうかんき | *sokusou kanki* | Pembukaan tirai jendela samping ventilasi rumah kaca | Thermal Wilting Shock |
| 19 | 点滴灌水 | てんてきかんすい | *tenteki kansui* | Sistem irigasi tetes presisi penghemat air nutrisi | Emitter Clogging Drought |
| 20 | 剪定鋏 | せんていばさみ | *sentei basami* | Gunting tajam pemotong dahan dan tangkai tanaman | Severe Finger Laceration |
| 21 | 防虫ネット | ぼうちゅうねっと | *bouchuu netto* | Jaring kassa kasa pencegah masuknya hama serangga | Viral Vector Infiltration |
| 22 | うどんこ病 | うどんこびょう | *udonkobyou* | Penyakit embun tepung jamur putih pada daun | Epidemic Leaf Necrosis |
| 23 | 灰色かび病 | はいいろかびびょう | *haiiro kabibyou* | Penyakit kapang abu-abu Botrytis pada buah/bunga | Post-Harvest Decay Rot |
| 24 | アブラムシ防除 | あぶらむしぼうじょ | *aburamushi boujo* | Pengendalian hama kutu daun pengisap cairan | Mosaic Virus Transmission |
| 25 | 噴霧器 | ふんむき | *funmuki* | Mesin semprot pestisida gendong bermotor/manual | High-Pressure Chemical Jet |
| 26 | 防毒マスク | ぼうどくますく | *boudoku masuku* | Masker respirator penyaring uap racun pestisida | Inhalation Poisoning Fatality |
| 27 | 耐農薬手袋 | たいのうやくてぶくろ | *tainouyaku tebukuro* | Sarung tangan kedap pelindung cairan pestisida | Dermal Chemical Absorption |
| 28 | 刈払機（草刈り機） | かりはらいき（くさかりき） | *kariharaiki (kusakariki)* | Mesin pemotong rumput berputar bilah baja tajam | Flying Stone Blindness & Maiming |
| 29 | 飛散防止カバー | ひさんぼうしかばー | *hisan boushi kabaa* | Pelindung penahan lontaran kerikil mesin potong | Severe Eye & Leg Injury |
| 30 | 水分計 | すいぶんけい | *suibunkei* | Alat pengukur persentase kelembapan kadar air tanah | Overwatering Root Anoxia |
| 31 | 収穫コンテナ | しゅうかくこんてな | *shuukaku kontena* | Kotak keranjang plastik wadah hasil panen | Back Strain Injury (Lifting) |
| 32 | 選別機 | せんべつき | *sembetsuki* | Mesin otomatis pemilah ukuran dan mutu buah | Roller Finger Jamming |
| 33 | 予冷処理 | よれいしょり | *yorei shori* | Pendinginan cepat awal pasca-panen penahan kesegaran | Quality Deterioration Decay |
| 34 | 耕うん機 | こううんき | *kouunki* | Traktor tangan pembalik dan penggembur tanah | Rotary Tine Foot Laceration |
| 35 | 塩分補給タブレット | えんぶんほきゅうたぶれっと | *embun hokyuu taburetto* | Permen tablet garam elektrolit pencegah heatstroke | Heat Cramp Prostration |
| 36 | ５Ｓ農場管理 | ごえすのうじょうかんり | *goesunoujou kanri* | Penataan gudang bahan kimia dan pembersihan alat | Pesticide Contamination Food |

---

## 5. DIRECTIVES K3 DARURAT & FORMULA YUBISASHI KOSHO

### Teriakan Darurat Spontan di Tempat Kerja:
- *「トラクターから離れろ！横転するぞ！」* (*Torakutaa kara hanarero! Outen suru zo!* — Menjauh dari traktor! Bisa terbalik!)
- *「PTOに近づくな！巻き込まれる！」* (*Pii-tii-oo ni chikadzuku na! Makikomareru!* — Jangan mendekat ke PTO! Bisa terlilit!)
- *「ハウスから出ろ！熱中症で倒れるぞ！日陰で休め！」* (*Hausu kara dero! Netchuushou de taoreru zo! Hikage de yasume!* — Keluar dari greenhouse! Bisa pingsan kena heatstroke! Istirahat di tempat teduh!)

### Formula Point-and-Call (指差し呼称):
1. **Pengecekan Rasio Takaran Pestisida:** *「農薬希釈倍率、1000倍確認、ヨシ！」*
2. **Pengecekan APD Semprot:** *「防毒マスク・耐薬品手袋着用、密着確認、ヨシ！」*
3. **Pengecekan Penutup Poros Mesin:** *「PTO軸カバー、ロック確認、ヨシ！」*
4. **Pengecekan Kaki Tangga Kebun:** *「三脚脚立開き止めチェーン、固定確認、ヨシ！」*

---

## 6. BANK SOAL UJIAN CBT ASAT RESMI

### Contoh Soal Ujian Teori (学科試験 ○×):
> **Soal 1:** 農薬を水で薄めて散布液を作るときは、ラベルに記載されている希釈倍率を守り、規定よりも濃い濃度で散布してはならない。  
> **Kunci Jawaban:** **○ (Benar)** (Pestisida terlalu pekat menyebabkan keracunan tanaman/daun terbakar hangus dan sisa residu berbahaya pada hasil panen).

> **Soal 2:** 三脚脚立（さんきゃくきゃたつ）を使用して果樹の収穫作業を行うときは、作業効率を上げるために最上段の天板の上に立って作業してもよい。  
> **Kunci Jawaban:** **× (Salah)** (Dilarang keras berdiri di atas anak tangga teratas tangga kebun karena titik keseimbangan labil memicu jatuh patah tulang).

### Contoh Soal Ujian Praktik On-Screen (実技試験):
> **Soal 1:** 画面の写真を見て、トラクターの後部に取り付けられた作業機（ロータリー）に動力を伝達する回転軸（PTO軸）の安全対策として、最も適切なものを選びなさい。  
> A. 作業中はPTO軸の回転数を最高速度に固定しておく  
> B. 回転中のPTO軸に巻き込まれないよう、必ず安全カバーが装着されていることを確認する  
> C. 巻き込みを防ぐために、裾の広がったズボンを着用する  
> D. PTO軸が回転している状態で、手で触れて振動を確認する  
> **Kunci Jawaban:** **B** (Penutup poros pengaman/PTO cover wajib terpasang utuh untuk mencegah pakaian pekerja terlilit putaran poros berkekuatan dahsyat).
`;

fs.writeFileSync(path.join(sswDir, "SSW-10-AGRICULTURE-CROP-FARMING-SYLLABUS.md"), ssw10Content, "utf8");
console.log("SSW-10 written successfully!");

// ==========================================
// SSW-11: AGRICULTURE (LIVESTOCK)
// ==========================================
const ssw11Content = `# SILABUS KEJURUAN RESMI NUGGET NIHONGO · SEKTOR 11: AGRICULTURE - LIVESTOCK FARMING (PETERNAKAN HEWAN)
**Kode Sektor:** \`SSW-AGRI-02\` · **Versi:** v2.0 (Corpus v30 Canonical Revision)  
**Status:** AUTHORITATIVE & EXHAUSTIVE SECTOR SYLLABUS  
**Kementerian Pembina:** Kementerian Pertanian, Kehutanan dan Perikanan Jepang (MAFF / 農林水産省)  
**Badan Pelaksana Uji:** Kamar Dagang Pertanian Nasional (NCA / 一般社団法人 全国農業会議所 / ASAT) & Prometric  
**Dasar Kurasi Primer:**
- \`reference-books/ssw/04_nougyou_agriculture/Agri_Livestock_Textbook_JA.pdf\` (158 halaman) & \`reference-books/ssw/04_nougyou_agriculture/Agri_Livestock_Textbook_ID.pdf\` (Peternakan Hewan)
- \`reference-books/ssw/04_nougyou_agriculture/Agri_Japanese_Textbook_JA.pdf\` (68 halaman) & \`reference-books/ssw/04_nougyou_agriculture/Agri_Japanese_Textbook_ID.pdf\` (Bahasa Jepang Pertanian)
- \`reference-books/ssw/04_nougyou_agriculture/Agri_SSW2_Livestock_JA.pdf\` & \`reference-books/ssw/04_nougyou_agriculture/Agri_SSW2_Safety_Common_JA.pdf\` (Tingkat Lanjut 2-gō)
- \`reference-books/ssw/04_nougyou_agriculture/Agri_Exam_Sample_Questions_JA.pdf\` (29 halaman Bank Soal Resmi ASAT)
**Landasan Teoretis & Empiris:**
- Needs Analysis & Technical Lexicon (Nation & Hwang 1995 [VS-09]; Chung & Nation 2003 [VS-10])
- Cross-Cultural Communication in Agricultural Gemba & HOU-REN-SO (Mustaqim & Priventa 2026 [VS-31]; Supriatnaningsih et al. 2024 [VS-33])
- Geminate Acoustic Intelligibility in Animal Handling Calls (Husna & Febriyanti 2022 [EA-25])
- Animal Handling Safety & Biosecurity Protocols (JNIOSH 2020 [VS-39]; National Chamber of Agriculture 2024 [VS-47])

---

## 1. SPESIFIKASI UJIAN RESMI PROMETRIC CBT (STANDAR ASAT / MAFF)

Kandidat visa *Tokutei Ginou 1-gō* bidang Peternakan menempuh ujian Computer-Based Testing (CBT) dengan spesifikasi regulasi resmi:

\`\`\`
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                        PROMETRIC CBT AGRICULTURE LIVESTOCK FARMING EXAM MATRIX                         │
├─────────────────────────┬────────────────────────────────────────┬─────────────┬───────────┬───────────┤
│ Komponen Ujian          │ Cakupan Ranah Pengujian                │ Jumlah Soal │ Durasi    │ Ambang    │
├─────────────────────────┼────────────────────────────────────────┼─────────────┼───────────┼───────────┤
│ 1. Ujian Teori          │ Fisiologi ternak sapi/babi/unggas,     │ 30–40 Soal  │ 60 Menit  │ $\\ge 60\\%$│
│    (学科試験 - Gakka)   │ manajemen pakan & pemerahan susu, K3   │ (Format     │           │ (Berdasarkan│
│                         │ kandang, biosekuriti karantina wabah   │  True/False │           │  skor total│
│                         │ penyakit hewan menular nasional        │  ○× & Bergbr)│          │  CBT)      │
├─────────────────────────┼────────────────────────────────────────┼─────────────┼───────────┼───────────┤
│ 2. Ujian Praktik Layar  │ Identifikasi visual mastitis ambing,   │ Terpadu     │ Terpadu   │ $\\ge 60\\%$│
│    (実技試験 - Jitsugi) │ urutan cuci putting sebelum perah,     │ dalam lembar│ dalam sesi│           │
│                         │ penanganan kotoran dan disinfeksi bot  │  ujian CBT  │  60 Menit │           │
└─────────────────────────┴────────────────────────────────────────┴─────────────┴───────────┴───────────┘
\`\`\`

> **Catatan Bahasa Ujian:** Ujian disajikan dalam **Bahasa Jepang berfurigana**, dengan foto dokumentasi kandang ternak resmi Jepang pada setiap studi kasus evaluasi.

---

## 2. TIGA CABANG PETERNAKAN UTAMA JEPANG

1. **Peternakan Sapi Perah & Pedaging (酪農・肉用牛 - Dairy & Beef Cattle):**
   - Sapi perah Holstein: Manajemen pemerahan susu otomatis (*milking parlor*), pencegahan mastitis radang puting, pemberian pakan konsentrat dan silase.
   - Sapi potong Wagyu/Kuroge Washu: Pembesaran pedet (*ikusei*), penggemukan daging marbling (*shiage*), pemantauan kesehatan rumen.
2. **Peternakan Babi (養豚 - Swine / Pig Farming):**
   - Manajemen induk bunting dan melahirkan (*farrowing*), perawatan anak babi menyusui, pemberian pakan cair/kering otomatis, kontrol suhu kandang tertutup.
3. **Peternakan Unggas Petelur & Pedaging (養鶏 - Poultry Layer & Broiler):**
   - Kandang ayam petelur sistem baterai/aviary, pengumpulan dan grading telur otomatis, ventilasi penghisap debu amonia, biosekuriti flu burung steril.

---

## 3. MODUL PEMBELAJARAN KURIKULUM (PEDAGOGICAL MODULES)

### MODUL 1: MANAJEMEN SAPI PERAH & PROSEDUR PEMERAHAN (酪農と搾乳衛生)
- **Topik 1.1: Standar Higienitas Pemerahan Susu (搾乳衛生):**
  - **Topik 1.1.1: Pemeriksaan Susu Awal & Tes Mastitis (前搾り・乳房炎検査):** Pemeriksaan 2–3 semprotan susu awal pada cawan hitam (*strip cup*), uji CMT (California Mastitis Test) mendeteksi gumpalan lendir radang ambing.
  - **Topik 1.1.2: Pembersihan Puting & Pencelupan Antiseptik (ディッピング - Dipping):** Pengelapan puting menggunakan handuk kain sanitasi sekali pakai per ekor sapi (*1 cow 1 towel*), dan pencelupan puting cairan iodin (*post-dipping*).
- **Topik 1.2: Pengoperasian Mesin Pemerah Susu Otomatis (ミルカー):**
  - **Topik 1.2.1: Pemasangan Teat Cup & Tekanan Vakum:** Penyetelan tekanan vakum 40–50 kPa, pemasangan teat cup tanpa mendesis bocor angin, dan pelepasan otomatis (*automatic cluster remover*).
  - **Topik 1.2.2: Pendinginan Susu di Tangki Pendingin (バルククーラー):** Penurunan suhu susu segar seketika hingga $\le 4^\circ\text{C}$ di dalam bulk cooler untuk menghambat perkembangbiakan bakteri.

---

### MODUL 2: MANAJEMEN PAKAN & FISIOLOGI PENCERNAAN (飼養管理と消化)
- **Topik 2.1: Ruminansia & Manajemen Fermentasi Rumen Sapi:**
  - **Topik 2.1.1: Pakan Hijauan & Fermentasi Silase (粗飼料・サイレージ):** Kualitas asam laktat gulungan silase (*roll bale*), bau fermentasi harum asam manis; larangan memberikan silase berjamur putih/hitam beracun!
  - **Topik 2.1.2: Pakan Konsentrat & Pencegahan Asidosis Rumen (濃厚飼料):** Rasio seimbang serat kasar vs konsentrat biji-bijian guna mencegah kembung gas lambung akut (*bloat / kodoushou*) dan penurunan nafsu makan.
- **Topik 2.2: Manajemen Air Minum & Fisiologi Laktasi:**
  - **Topik 2.2.1: Pembersihan Bak Minum Otomatis (ウォーターカップ):** Verifikasi ketersediaan air bersih melimpah (sapi perah mengonsumsi 100–150 liter air/hari untuk produksi susu).

---

### MODUL 3: BIOSEKURITI & PENCEGAHAN WABAH PENYAKIT (防疫対策)
- **Topik 3.1: Protokol Karantina & Sanitasi Masuk Kandang (衛生管理区域):**
  - **Topik 3.1.1: Bak Celup Disinfektan Sepatu Boot (消毒槽):** Kewajiban menyikat kotoran tanah dari sepatu boot karet sebelum merendam ke dalam bak disinfektan klorin/iodin di pintu masuk kandang.
  - **Topik 3.1.2: Pencegahan Penyakit Menular Strategis Nasional:** Karantina Flu Burung (*Kou-byouensei Tori Infuruenza*), Demam Babi Afrika (*ASF / Buta Netsu*), dan Penyakit Mulut dan Kuku (*Kouteieki*); larangan membawa produk daging dari luar ke area peternakan!
- **Topik 3.2: Penanganan Bangkai & Pengolahan Kotoran Limbah (糞尿処理):**
  - **Topik 3.2.1: Fermentasi Aerobik Pupuk Kandang (堆肥化):** Pengadukan berkala kotoran ternak dengan serbuk gergaji hingga suhu tumpukan mencapai 60°C–70°C untuk membunuh telur parasit dan biji gulma.

---

### MODUL 4: K3 KANDANG, PERILAKU TERNAK & GAS BERACUN (家畜安全と環境K3)
- **Topik 4.1: Pencegahan Bahaya Tertendang & Terjepit Sapi (蹴飛ばし・挟まれ):**
  - **Topik 4.1.1: Memahami Zona Buta Penglihatan Sapi (盲点):** Sapi tidak dapat melihat area tepat di belakang pantatnya; kewajiban memberi aba-aba suara ramah (*koe-kake*) dan menyentuh punggung sapi dengan mantap saat mendekat dari arah samping.
  - **Topik 4.1.2: Pengikatan Tali Moncong & Palang Penjepit (スタンチョン・カウトレーナー):** Prosedur fiksasi leher sapi pada stanchion saat tindakan medis suntik vaksin atau perawatan kuku (*teikan*).
- **Topik 4.2: Bahaya Gas Beracun di Lubang Penampung Kotoran (スラリーピット):**
  - **Topik 4.2.1: Keracunan Gas Hidrogen Sulfida & Amonia (硫化水素中毒):** Gas $H_2S$ di dasar kolam slurry limbah cair babi/sapi dapat mematikan indra penciuman seketika dan memicu kematian lemas asfiksia; larangan masuk tanpa ventilasi blower dan masker gas mandiri (SCBA)!

---

## 4. KOSAKATA TEKNIS LAYER 2 (ASAT OFFICIAL LIVESTOCK LEXICON)

| No | Kanji | Kana | Romaji | Indonesian Gloss | High-Stakes Risk Category |
|---|---|---|---|---|---|
| 1 | 搾乳機（ミルカー） | さくにゅうき（みるかー） | *sakunyuuki (mirukaa)* | Mesin otomatis pemerah susu sapi ambing | Teat Tissue Trauma if Over-Milking |
| 2 | 乳房炎（マスタイティス）| にゅうぼうえん | *nyuubouen (masutaitisu)*| Radang infeksi ambing puting sapi perah | Contaminated Milk Discard Loss |
| 3 | 防疫対策 | ぼうえきたいさく | *boueki taisaku* | Protokol karantina biosekuriti kandang hewan | National Livestock Epidemic Outbreak |
| 4 | 牛の蹴飛ばし | うしのけとばし | *ushi no ketobashi* | Sepakan tendangan kaki belakang sapi berbobot 600kg| Broken Ribs & Internal Hemorrhage |
| 5 | 硫化水素ガス | りゅうかすいそがす | *ryuuka suiso gasu* | Gas beracun mematikan dari penampungan feses cair | Instant Asphyxiation Fatality |
| 6 | ディッピング | でぃっぴんぐ | *dippingu* | Pencelupan puting sapi cairan antiseptik iodin | Mastitis Pathogen Infiltration |
| 7 | バルククーラー | ばるくくーらー | *baruku kuuraa* | Tangki stainless pendingin susu segar $\\le 4^\\circ\\text{C}$| Bacterial Spoilage of Raw Milk |
| 8 | スタンチョン | すたんちょん | *sutanchon* | Palang besi penjepit leher sapi saat makan/periksa| Cow Neck Choking Hazard |
| 9 | 蹄道・削蹄 | ていどう・さくてい | *teidou / sakutei* | Pemotongan dan perapian kuku sapi berkala | Hoof Lameness / Inability to Stand |
| 10 | 前搾り | まえしぼり | *maeshibori* | Pemeriksaan semprotan susu pertama pada cup hitam | Unidentified Abnormal Milk Outflow |
| 11 | 人工授精 | じんこうじゅせい | *jinkou jusei* | Inseminasi buatan bibit sperma beku nitrogen cair | Cryogenic Frostbite Hazard (-196°C) |
| 12 | 粗飼料（乾草） | そしりょう（かんそう） | *soshiryou (kansou)* | Pakan serat kasar jerami rumput kering berkualitas | Rumen Acidosis / Bloat Hazard |
| 13 | 濃厚飼料 | のうこうしりょう | *noukou shiryou* | Pakan penguat konsentrat biji-bijian jagung/kedelai| Liver Abscess if Overfed |
| 14 | 盲点（死角） | もうてん（しかく） | *mouten (shikaku)* | Area buta tepat di belakang pantat sapi | Sudden Cow Strike Panic |
| 15 | 踏込消毒槽 | ふみこみしょうどくそう | *fumikomi shoudokusou* | Bak rendam disinfektan sepatu boot pintu kandang | Cross-Farm Pathogen Spread |
| 16 | 鳥インフルエンザ | とりいんふるえんざ | *tori infuruenza* | Wabah virus flu burung patogenik unggas | Total Farm Depopulation Cull |
| 17 | 豚熱（ＣＳＦ） | ぶたねつ（しーえすえふ） | *butanetsu (CSF)* | Demam babi klasik virus menular ternak babi | Massive Economic Swine Cull |
| 18 | 分娩房 | ぶんべんぼう | *bumbembou* | Kandang khusus proses persalinan induk sapi/babi | Maternal Aggression & Crushing |
| 19 | 初乳給与 | しょにゅうきゅうよ | *shonyuu kyuuyo* | Pemberian susu kolostrum kaya antibodi pada pedet | Neonatal Calf Mortality |
| 20 | 除角作業 | じょかくさぎょう | *jokaku sagyou* | Pemotongan tunas tanduk sapi muda pemanas besi | Severe Burn & Animal Struggle |
| 21 | スラリーピット | すらりーぴっと | *surarii pitto* | Bak kolam bawah tanah penampung kotoran cair | Confined Poison Gas Death Trap |
| 22 | 換気扇清掃 | かんきせんせいそう | *kankisen seisou* | Pembersihan kipas exhaust ventilasi debu amonia | Motor Fire & Toxic Air Hazard |
| 23 | 家畜伝染病予防法 | かちくでんせんびょうよぼうほう| *kachiku densenbyou yobouhou*| Undang-undang karantina pencegahan wabah ternak | Criminal Penalties & Quarantine |
| 24 | 耳標（個体識別） | じひょう（こたいしきべつ） | *jihyou (kotai shikibetsu)* | Anting barcode identitas wajib sapi nasional | Loss of Traceability Penalty |
| 25 | 乾乳期 | かんにゅうき | *kannyuuki* | Masa istirahat laktasi sapi sebelum melahirkan | Udder Involution & Milk Fever |
| 26 | ルーメン（第１胃） | るーめん（だいいちい） | *ruumen (dai-ichi-i)* | Lambung rumen fermentasi bakteri mikroflora sapi | Acute Tympany Bloat Hazard |
| 27 | 鼓脹症 | こちょうしょう | *kochoushou* | Penyakit kembung gas rumen mematikan ternak sapi | Fatal Suffocation from Rumen Press |
| 28 | 鼻環（モクシ） | びかん（もくし） | *bikan (mokushi)* | Tali tambat kepala sapi dan cincin tindik hidung | Animal Control Breakdown |
| 29 | 飼槽清掃 | しそうせいそう | *shisou seisou* | Pembersihan palung sisa pakan basi kandang | Mycotoxin Feed Poisoning |
| 30 | 集卵ベルト | しゅうらんべると | *shuuran beruto* | Sabuk konveyor telur otomatis kandang ayam petelur | Egg Breakage & Roller Pinch |
| 31 | ウォーターカップ | うぉーたーかっぷ | *wootaa kappu* | Mangkuk klep air minum otomatis sapi perah | Dehydration due to Valve Stuck |
| 32 | 生乳出荷検査 | せいにゅうしゅっかけんさ | *seinyuu shukka kensa* | Uji residu antibiotik dan bakteri susu tangki | Contaminated Batch Rejection |
| 33 | 畜舎消毒噴霧 | ちくしゃしょうどくふんむ | *chikusha shoudoku fummu* | Pengabutan disinfektan sterilisasi ruang kandang | Chemical Eye & Inhalation Burn |
| 34 | 踏みつけ防止柵 | ふみつけぼうしさく | *fumitsuke boushisaku* | Palang pelindung anak babi dari tertindih induk | Piglet Crushing Suffocation |
| 35 | 給餌機ホッパー | きゅうじきほっぱー | *kyuujiki hoppaa* | Tangki corong pakan otomatis mesin babi/unggas | Auger Screw Entanglement |
| 36 | ５Ｓ畜舎環境 | ごえすちくしゃかんきょう | *goesuchikusha kankyou* | Pembersihan lalat, bangkai tikus dan genangan | Rodent Vector Disease Outbreak |

---

## 5. DIRECTIVES K3 DARURAT & FORMULA YUBISASHI KOSHO

### Teriakan Darurat Spontan di Tempat Kerja:
- *「後ろから近づくな！牛が蹴るぞ！」* (*Ushiro kara chikadzuku na! Ushi ga keru zo!* — Jangan mendekat dari belakang! Sapinya bisa menendang!)
- *「スラリーピットに入るな！硫化水素ガスだ！送風しろ！」* (*Surarii pitto ni hairu na! Ryuuka suiso gasu da! Soufuu shiro!* — Jangan masuk bak slurry! Ada gas hidrogen sulfida! Nyalakan blower!)
- *「消毒を踏め！靴の裏を消毒槽に浸せ！」* (*Shoudoku wo fume! Kutsu no ura wo shoudokusou ni hitase!* — Injak disinfektan! Celupkan sol sepatu ke bak!)

### Formula Point-and-Call (指差し呼称):
1. **Pengecekan Mastitis Susu Awal:** *「前搾り確認、凝固物なし、正常、ヨシ！」*
2. **Pengecekan Pencelupan Puting:** *「ディッピング完了、薬液被覆、ヨシ！」*
3. **Pengecekan Bak Disinfektan Pintu:** *「衛生管理区域、靴底消毒、ヨシ！」*
4. **Pengecekan Suhu Tangki Bulk Cooler:** *「生乳冷却温度、3度、冷却完了、ヨシ！」*

---

## 6. BANK SOAL UJIAN CBT ASAT RESMI

### Contoh Soal Ujian Teori (学科試験 ○×):
> **Soal 1:** 搾乳作業を始めるときは、乳頭炎（マスタイティス）などの異常を発見するために、必ず前搾り（まえしぼり）を行って乳汁の状態を確認しなければならない。  
> **Kunci Jawaban:** **○ (Benar)** (Uji semprotan susu awal pada cup hitam wajib dilakukan untuk mendeteksi gumpalan abnormal sebelum memasang mesin pemerah).

> **Soal 2:** 牛は視野が広いため、真正面よりも真後ろ（尻の真後ろ）に立ったほうが牛を驚かせずに安全に作業できる。  
> **Kunci Jawaban:** **× (Salah)** (Titik tepat di belakang pantat sapi adalah area buta/blind spot; mendekat dari belakang membuat sapi panik dan menendang sekuat tenaga).

### Contoh Soal Ujian Praktik On-Screen (実技試験):
> **Soal 1:** 画面の写真を見て、家畜伝染病（鳥インフルエンザや豚熱など）の農場内への侵入を防ぐために、畜舎の出入口で作業者が必ず行わなければならない衛生対策として、正しいものを選びなさい。  
> A. 畜舎内用の長靴に履き替え、踏込消毒槽で靴底を確実に消毒する  
> B. 外部から持ち込んだ食品を畜舎内で食べる  
> C. 野鳥や小動物が自由に畜舎内に入れるように窓を開け放つ  
> D. 消毒液の交換は月に１回程度にとどめる  
> **Kunci Jawaban:** **A** (Mengganti sepatu boot khusus kandang dan merendam sol pada bak disinfektan adalah pilar biosekuriti utama peternakan Jepang).
`;

fs.writeFileSync(path.join(sswDir, "SSW-11-AGRICULTURE-LIVESTOCK-SYLLABUS.md"), ssw11Content, "utf8");
console.log("SSW-11 written successfully!");
