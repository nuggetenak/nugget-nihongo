const fs = require("fs");
const path = require("path");

const sswDir = path.join(__dirname, "../corpus/sections/synthesis/syllabi/ssw");

// ==========================================
// SSW-15: FOOD MANUFACTURING
// ==========================================
const ssw15Content = `# SILABUS KEJURUAN RESMI NUGGET NIHONGO · SEKTOR 15: FOOD & BEVERAGE MANUFACTURING (PABRIK MAKANAN & MINUMAN)
**Kode Sektor:** \`SSW-FOOD-01\` · **Versi:** v2.0 (Corpus v30 Canonical Revision)  
**Status:** AUTHORITATIVE & EXHAUSTIVE SECTOR SYLLABUS  
**Kementerian Pembina:** Kementerian Pertanian, Kehutanan dan Perikanan Jepang (MAFF / 農林水産省)  
**Badan Pelaksana Uji:** Organisasi Penilaian Keterampilan Industri Pangan (OTAFF / 一般社団法人 外国人食品産業技能評価機構) & Prometric  
**Dasar Kurasi Primer:**
- \`reference-books/ssw/03_inshokuryouhin_food_manufacturing/Inshoku_Manufacturing_Textbook_Ver5_JA.pdf\` (OTAFF Versi 5.1 Terbaru, 140 halaman)
- \`reference-books/ssw/03_inshokuryouhin_food_manufacturing/Inshoku_Manufacturing_Textbook_ID.pdf\` (Terjemahan Resmi Bahasa Indonesia OTAFF)
- \`reference-books/ssw/03_inshokuryouhin_food_manufacturing/Inshoku_Manufacturing_Exam_Sample_JA.pdf\` (Bank Soal Ujian Teori Resmi OTAFF)
**Landasan Teoretis & Empiris:**
- Needs Analysis & Technical Lexicon (Nation & Hwang 1995 [VS-09]; Chung & Nation 2003 [VS-10])
- Cross-Cultural Communication in Food Production Floors & HOU-REN-SO (Mustaqim & Priventa 2026 [VS-31]; Supriatnaningsih et al. 2024 [VS-33])
- Geminate Acoustic Intelligibility in High-Noise Packaging Lines (Husna & Febriyanti 2022 [EA-25])
- Industrial Safety Standards & Shiteki Koshou (JNIOSH 2020 [VS-39])
- Statutory Food Manufacturing Testing Guidelines & Standards (OTAFF 2024 [VS-43])
- HACCP Institutionalization & Hygiene Control Frameworks (MHLW & MAFF 2021 [VS-44])

---

## 1. SPESIFIKASI UJIAN RESMI PROMETRIC CBT (STANDAR OTAFF / MAFF)

Kandidat visa *Tokutei Ginou 1-gō & 2-gō* bidang Manufaktur Pangan menempuh ujian Computer-Based Testing (CBT) dengan spesifikasi regulasi resmi:

\`\`\`
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                              PROMETRIC CBT FOOD MANUFACTURING EXAM MATRIX                              │
├─────────────────────────┬────────────────────────────────────────┬─────────────┬───────────┬───────────┤
│ Komponen Ujian          │ Cakupan Ranah Pengujian                │ Jumlah Soal │ Durasi    │ Ambang    │
├─────────────────────────┼────────────────────────────────────────┼─────────────┼───────────┼───────────┤
│ 1. Ujian Teori          │ Prinsip HACCP, sanitasi diri, mikrobia │ 30 Soal     │ 80 Menit  │ $\\ge 65\\%$│
│    (学科試験 - Gakka)   │ patogen, 7 alergen wajib, manajemen CCP│ (Format     │ (Total    │ (20 / 30) │
│                         │ mesin industri pangan, dan K3 pabrik   │  True/False │  Alokasi  │           │
│                         │                                        │  ○× CBT)    │  Gakka &  │           │
├─────────────────────────┼────────────────────────────────────────┼─────────────┤  Jitsugi) ├───────────┤
│ 2. Ujian Praktik Layar  │ Identifikasi visual kontaminasi rambut,│ 10 Soal     │           │ $\\ge 60\\%$│
│    (実技試験 - Jitsugi) │ urutan cuci tangan 2 tahap, kalibrasi  │ (Simulasi   │           │ (6 / 10)  │
│                         │ detektor logam, dan penanganan mesin K3│  Visual CBT)│           │           │
└─────────────────────────┴────────────────────────────────────────┴─────────────┴───────────┴───────────┘
\`\`\`

> **Ketentuan Kelulusan Ganda:** Peserta wajib lulus **KEDUA-DUANYA** (minimal 20 benar pada Teori dan minimal 6 benar pada Praktik) dalam satu sesi ujian 80 menit.

---

## 2. JALUR OPERASIONAL SUB-SEKTOR MANUFAKTUR PANGAN

Industri Manufaktur Pangan mencakup 7 sub-lini pabrik pengolahan makanan:
1. **Pabrik Makanan Olahan (惣菜製造業 - Prepared Delicatessen):** Pembuatan bento, lauk pauk siap saji (*souzai*), onigiri, salad kemasan, dan penggorengan tempura/katsu massal.
2. **Pabrik Produk Daging & Unggas (食肉加工品製造業 - Meat Processing):** Pemotongan karkas, pembuatan sosis, ham, bacon, daging cincang, dan nugget.
3. **Pabrik Produk Perikanan (水産加工品製造業 - Seafood Processing):** Fillet ikan segar, kamaboko/chikuwa pasta ikan, pengalengan ikan, dan pengeringan cumi.
4. **Pabrik Roti, Mi & Makanan Manis (パン・菓子・めん類製造業 - Bakery & Noodles):** Pengulenan adonan gandum, fermentasi ragi, oven pembakaran, dan pengeringan mi ramen/udon.

---

## 3. MODUL PEMBELAJARAN KURIKULUM (PEDAGOGICAL MODULES)

### MODUL 1: HIGIENITAS PABRIK & STANDAR RESMI HACCP (HACCPと衛生管理)
- **Topik 1.1: Tujuh Prinsip HACCP & Titik Kendali Kritis (CCP):**
  - **Topik 1.1.1: Penetapan Batas Kritis Suhu & Waktu (CCP-1 Pemanasan):** Standar pemanasan suhu inti makanan minimal 75°C selama $\ge 1\text{ menit}$ (atau 85°C–90°C selama $\ge 90\text{ detik}$ untuk bivalvia pembunuh Norovirus).
  - **Topik 1.1.2: Pemantauan Log & Tindakan Koreksi (CCP Monitoring):** Prosedur pencatatan suhu berkala setiap jam pada lembar kendali mutu; tindakan isolasi dan pemanasan ulang jika suhu inti di bawah ambang batas.
- **Topik 1.2: Tiga Prinsip Pengendalian Keracunan Makanan (食中毒三原則):**
  - **Topik 1.2.1: Tidak Menempelkan Patogen (つけない - Cross-Contamination):** Pemisahan jalur kontainer bahan baku mentah (*unheated*) vs produk matang (*cooked*).
  - **Topik 1.2.2: Tidak Membiakkan (増やさない) & Memusnahkan (やっつける):** Pengendalian rantai dingin suhu $\le 10^\circ\text{C}$ dan pendinginan cepat produk matang dari 60°C ke $\le 10^\circ\text{C}$ dalam waktu $\le 2\text{ jam}$.

---

### MODUL 2: PROSEDUR SANITASI DIRI & MEMASUKI RUANG BERSIH (入室手順)
- **Topik 2.1: Pakaian Kerja Higienis Khusus Pabrik (衛生作業着):**
  - **Topik 2.1.1: Urutan Pemakaian Seragam Bersih Standar:** Jaring rambut membungkus seluruh anak rambut $\rightarrow$ masker menutup hidung dan mulut $\rightarrow$ topi kupluk berkerudung $\rightarrow$ jaket berujung manset karet $\rightarrow$ celana dimasukkan ke dalam sepatu boot sanitasi putih.
  - **Topik 2.1.2: Pembersihan Bulu Rambut Menggunakan Adhesive Roller (粘着ローラー):** Prosedur roll badan 2 orang berpasangan (*koutai rooringu*) melintasi seluruh punggung, bahu, dada, dan kaki minimal 60 detik.
- **Topik 2.2: Bilik Air Shower & Cuci Tangan 2 Tahap (エアシャワーと手洗い):**
  - **Topik 2.2.1: Prosedur Ruang Hembusan Angin Air Shower (エアシャワー):** Mengangkat kedua tangan dan berputar 360 derajat di dalam bilik angin berkecepatan 25 m/s selama 15–20 detik.
  - **Topik 2.2.2: Prosedur Cuci Tangan 6 Langkah Bersabun Cair Antibakteri:** Dua siklus cuci tangan berurutan masing-masing 30 detik menggunakan sikat kuku steril, pembilasan kran sensor, pengeringan tisu sekali pakai, dan semprot alkohol 70%.

---

### MODUL 3: DETEKSI BENDA ASING & ALERGEN MAKANAN (異物混入とアレルゲン)
- **Topik 3.1: Pengoperasian Detektor Logam & Mesin Sinar-X:**
  - **Topik 3.1.1: Kalibrasi Uji Test Piece Logam (金属検出機):** Verifikasi pendeteksian bola uji besi ($Fe\ \phi 1.0\text{ mm}$) dan stainless steel ($SUS\ \phi 1.5\text{ mm}$) setiap awal shift dan setiap pergantian lot produk.
  - **Topik 3.1.2: Pemilahan Otomatis & Penolakan Benda Asing (リジェクター):** Pengecekan ayunan lengan penolak (*reject arm*) yang melempar kemasan terkontaminasi ke kotak terkunci.
- **Topik 3.2: Delapan Bahan Makanan Pemicu Alergi Spesifik (特定原材料8品目):**
  - **Topik 3.2.1: Manajemen Segregasi Bahan Alergen Wajib:** Telur, susu, gandum, soba, kacang tanah, udang, kepiting, dan kenari (*walnut / kurumi*); penggunaan wadah berwarna terpisah dan sanitasi total jalur pipa sebelum produksi non-alergen.

---

### MODUL 4: K3 MESIN PABRIK PANGAN & SANITASI PIPA CIP (食品機械安全とCIP)
- **Topik 4.1: Pencegahan Bencana Mesin Pemotong Slicer & Konveyor (巻き込まれ防止):**
  - **Topik 4.1.1: Pembersihan Mesin Slicer Daging Berputar:** Larangan keras membersihkan pisau piringan slicer yang masih berputar; wajib mematikan sakelar utama, mencabut steker daya, dan memakai sarung tangan kawat baja (*taikiritsusou tebukuro*).
  - **Topik 4.1.2: Titik Jepit Konveyor & Tombol Emergency Stop:** Pemasangan pelindung interlock pada roda gigi penggerak dan verifikasi fungsi tombol E-stop di sepanjang lini perakitan.
- **Topik 4.2: Pembersihan Sirkulasi Tertutup Pipa Kimia CIP (CIP洗浄):**
  - **Topik 4.2.1: Penanganan Asam Nitrat & Soda Api Kaustik:** Penggunaan APD kacamata kimia dan celemek karet saat mengawasi sirkulasi larutan pembersih asam/alkali panas 80°C pada tangki dan pipa CIP.
- **Topik 4.3: HOU-REN-SO Saat Jarum Siring Injektor Patah:**
  - **Topik 4.3.1: Protokol Penghentian Lini Saat Patah Logam:** Pelaporan seketika kepada pengawas mutu: *「主任、肉用インジェクターの針が1本折れました！直ちにラインを停止し、破片の捜索を行います！」*

---

## 4. KOSAKATA TEKNIS LAYER 2 (OTAFF OFFICIAL FOOD MANUFACTURING LEXICON)

| No | Kanji | Kana | Romaji | Indonesian Gloss | High-Stakes Risk Category |
|---|---|---|---|---|---|
| 1 | 異物混入 | いぶつこんにゅう | *ibutsu konnyuu* | Masuknya kontaminasi benda asing (rambut/logam) | Facility-Wide Product Recall |
| 2 | 金属検出機 | きんぞくけんしゅつき | *kinzoku kenshutsuki* | Mesin sensor pendeteksi serpihan logam dalam kemasan| Metal Fragment Ingestion |
| 3 | 重要管理点（CCP） | じゅうようかんりてん | *juuyou kanriten (CCP)* | Titik kendali kritis proses eliminasi bahaya HACCP | Microbial Foodborne Outbreak |
| 4 | 中心温度計 | ちゅうしんおんどけい | *chuushin ondokei* | Termometer tusuk pengukur suhu inti makanan matang | Pathogen Survival Hazard |
| 5 | アレルゲン交差汚染 | あれるげんこうさおせん | *arerugen kousa osen* | Kontaminasi silang residu bahan alergen makanan | Anaphylactic Shock Death |
| 6 | 粘着ローラー | ねんちゃくろーらー | *nenchaku rooraa* | Rol berperekat pengangkat rambut di ruang ganti | Hair Foreign Body Rejection |
| 7 | エアシャワー | えあしゃわー | *ea shawaa* | Bilik hembusan angin pembersih debu sebelum masuk | Dust & Fiber Infiltration |
| 8 | ＣＩＰ洗浄 | しーあいぴーせんじょう | *shii-ai-pii senjou* | Sistem sirkulasi tertutup pembersih pipa kimiawi | Acid/Caustic Chemical Burn |
| 9 | スライサー刃物 | すらいさーはもの | *suraisaa hamono* | Bilah pisau mesin pemotong daging/sayuran otomatis| Severe Finger Amputation |
| 10 | 非常停止スイッチ | ひじょうていしすいっち | *hijou teishi suitchi* | Tombol darurat pemutus aliran lini konveyor | Life-Critical Escalation |
| 11 | 次亜塩素酸ナトリウム | じあえんそさんのとりうむ | *jiaensosan natoriumu* | Larutan disinfektan kimia natrium hipoklorit | Mucosal Corrosion & Toxic Gas |
| 12 | 殺菌工程 | さっきんこうてい | *sakkin koutei* | Tahap proses pemanasan pembunuh mikroorganisme | Lethal Bacterial Spore Survival |
| 13 | 芽胞菌（ボツリヌス等）| がほうきん | *gahoukin* | Bakteri pembentuk spora tahan panas (Clostridium)| Deadly Botulism Poisoning |
| 14 | 一般生菌数 | いっぱんせいきんすう | *ippan seikinsuu* | Jumlah total koloni bakteri per gram produk pangan| Bacterial Decay Spoilage |
| 15 | 賞味期限印字 | しょうみきげんいんじ | *shoumiki gen'inji* | Pencetakan kode tanggal kedaluwarsa produk | Illegal Mislabeling Recall |
| 16 | Ｘ線異物検出機 | えっくすせんいぶつけんしゅつき| *ekkusu-sen ibutsu kenshutsuki*| Mesin sinar-X pendeteksi tulang/plastik/kaca padat | Internal Bleeding from Glass/Bone |
| 17 | 巻き込まれ防止柵 | まきこまれぼうしさく | *makikomare boushisaku* | Pagar pengaman penutup titik jepit roller konveyor | Arm Mangling Entrapment |
| 18 | ノロウイルス対策 | のろういるすたいさく | *norouirusu taisaku* | Protokol disinfeksi eliminasi virus gastroenteritis | Mass Outbreak Diarrhea |
| 19 | 手洗い２回 | てあらいにかい | *tearai nikai* | Prosedur cuci tangan bersabun 6 langkah dua siklus | Hand Pathogen Cross-Spread |
| 20 | 毛髪混入防止ネット | もうはつこんにゅうぼうしねっと| *mouhatsu konnyuu boushi netto*| Jaring kupluk kepala pembungkus seluruh anak rambut | Consumer Foreign Body Complaint |
| 21 | スチーム殺菌釜 | すちーむさっきんがま | *suchiimu sakkingama* | Bejana autoklaf uap panas bertekanan retort | High-Pressure Steam Scalding |
| 22 | フライヤー油交換 | ふらいやーあぶらこうかん | *furaiyaa abura koukan* | Penggantian minyak goreng suhu 180°C pada wajan | Severe 3rd-Degree Boiling Oil Burn |
| 23 | 耐切創手袋 | たいせっそうてぶくろ | *taisessou tebukuro* | Sarung tangan rajut kawat baja pembersih pisau | Blade Cleaning Laceration |
| 24 | 冷凍保管室（-20℃）| れいとうほかんしつ | *reitou hokanshitsu* | Gudang beku penyimpanan bahan baku beku | Accidental Freeze Entrapment |
| 25 | 閉じ込め防止ボタン | とじこめぼうしぼたん | *tojikome boushi botan* | Tombol pelepas kunci dari dalam ruang freezer beku | Hypothermia Freezing Fatality |
| 26 | 洗浄チェックシート | せんじょうちぇっくしーと | *senjou chekkushiito* | Lembar verifikasi kebersihan sanitasi lini produksi| Inadequate Sanitation Log |
| 27 | ＡＴＰ拭き取り検査 | えーてぃーぴーふきとりけんさ| *ee-tii-pii fukitori kensa* | Uji luminometer bioluminesensi kebersihan permukaan | Organic Soil Residue Alert |
| 28 | 急速冷却機（チラー）| きゅうそくれいきゃくき | *kyuusoku reikyakuki (chiraa)* | Mesin pendingin kilat penurun suhu makanan matang | Spoilage Danger Zone (20-50°C) |
| 29 | 真空包装機 | しんくうほうそうき | *shinkuu housouki* | Mesin kemasan hampa udara penahan oksidasi produk| Seal Puncture Anaerobic Hazard |
| 30 | 原材料受入検査 | げんざいりょううけいれけんさ| *genzairyou ukeire kensa* | Pemeriksaan suhu dan tanggal bahan baku saat datang | Rotten Ingredient Ingestion |
| 31 | 先入れ先出し（FIFO） | さきいれさきだし | *sakiire sakidashi (FIFO)* | Prinsip rotasi stok bahan pertama masuk pertama keluar| Expired Material Use |
| 32 | フットスイッチ | ふっとすいっち | *futto suitchi* | Sakelar injak kaki kendali pengisian cairan kemasan| Inadvertent Machine Cycle |
| 33 | 排水口トラップ清掃 | はいすいこうとらっぷせいそう| *haisuikou torappu seisou* | Pembersihan saluran pembuangan pencegah bau lalat | Pest & Insect Breeding Ground |
| 34 | 給水蛇口消毒 | きゅうすいじゃぐちしょうどく| *kyuusui jaguchi shoudoku* | Disinfeksi ujung kran air steril dari biofilm kotor| Drinking Water Contamination |
| 35 | 長靴洗浄機 | ながぐつせんじょうき | *nagagutsu senjouki* | Mesin sikat berputar otomatis pembersih sol boot | Floor Contamination Inflow |
| 36 | ５Ｓ工場基準 | ごえすこうじょうきじゅん | *goesukoujou kijun* | Standar 5S sanitasi mutlak pabrik makanan Jepang | Statutory Regulatory Audit |

---

## 5. DIRECTIVES K3 DARURAT & FORMULA YUBISASHI KOSHO

### Teriakan Darurat Spontan di Tempat Kerja:
- *「スライサー停止！電源プラグを抜け！」* (*Suraisaa teishi! Dengen puragu wo nuke!* — Hentikan slicer! Cabut kabel daya!)
- *「非常停止を押せ！コンベアに手が挟まれた！」* (*Hijou teishi wo ose! Kombea ni te ga hasamameta!* — Tekan emergency stop! Tangan terjepit konveyor!)
- *「触るな！高温蒸気バルブが開いている！」* (*Sawaru na! Kouon jouki barubu ga aite iru!* — Jangan sentuh! Katup uap panas terbuka!)

### Formula Point-and-Call (指差し呼称):
1. **Pengecekan Kalibrasi Detektor Logam:** *「テストピース検知確認、排出ゲート作動、ヨシ！」*
2. **Pengecekan Suhu Inti Pemanasan CCP:** *「中心温度75度、1分間保持確認、ヨシ！」*
3. **Pengecekan Pembersihan Rambut Roller:** *「粘着ローラー完了、毛髪付着ゼロ、ヨシ！」*
4. **Pengecekan Sanitasi Tangan Dua Tahap:** *「アルコール噴霧、手指消毒完了、ヨシ！」*

---

## 6. BANK SOAL UJIAN CBT OTAFF RESMI

### Contoh Soal Ujian Teori (学科試験 ○×):
> **Soal 1:** 食中毒菌の多くは、中心温度75℃で1分間以上加熱することにより死滅するため、加熱調理工程において中心温度計を用いて確実に測定しなければならない。  
> **Kunci Jawaban:** **○ (Benar)** (Standar emas sanitasi makanan Jepang mewajibkan pemanasan inti minimal 75°C selama 1 menit untuk membunuh patogen enterik).

> **Soal 2:** 金属検出機の動作確認を行うテストピースは、感度を高めるために始業時に１回だけテストすれば、その後の作業中は確認する必要はない。  
> **Kunci Jawaban:** **× (Salah)** (Kalibrasi test piece wajib diuji secara berkala: awal shift, tengah shift, pergantian produk, dan akhir shift demi menjamin validitas deteksi).

### Contoh Soal Ujian Praktik On-Screen (実技試験):
> **Soal 1:** 画面の写真を見て、製造室（クリーンルーム）に入る前の「衛生的な手洗い手順」として、正しい順序を選びなさい。  
> A. アルコール噴霧 $\\rightarrow$ 石鹸で手洗い $\\rightarrow$ 水で洗い流す $\\rightarrow$ ペーパータオルで拭く  
> B. 流水で予洗い $\\rightarrow$ 石鹸で揉み洗い（爪ブラシ使用） $\\rightarrow$ 流水で流す $\\rightarrow$ ペーパータオルで拭く $\\rightarrow$ アルコール消毒  
> C. ペーパータオルで拭く $\\rightarrow$ アルコール噴霧 $\\rightarrow$ 石鹸で手洗い $\\rightarrow$ 水で洗い流す  
> D. 水で洗い流す $\\rightarrow$ アルコール噴霧のみ  
> **Kunci Jawaban:** **B** (Urutan baku 6 langkah MHLW: bilas awal, sabun & sikat kuku, bilas tuntas, lap kering tisu sekali pakai, dan semprot alkohol 70%).
`;

fs.writeFileSync(path.join(sswDir, "SSW-15-FOOD-MANUFACTURING-SYLLABUS.md"), ssw15Content, "utf8");
console.log("SSW-15 written successfully!");

// ==========================================
// SSW-16: FOOD SERVICE / RESTAURANT
// ==========================================
const ssw16Content = `# SILABUS KEJURUAN RESMI NUGGET NIHONGO · SEKTOR 16: FOOD SERVICE INDUSTRY (INDUSTRI RESTORAN & LAYANAN MAKANAN)
**Kode Sektor:** \`SSW-REST-01\` · **Versi:** v2.0 (Corpus v30 Canonical Revision)  
**Status:** AUTHORITATIVE & EXHAUSTIVE SECTOR SYLLABUS  
**Kementerian Pembina:** Kementerian Pertanian, Kehutanan dan Perikanan Jepang (MAFF / 農林水産省)  
**Badan Pelaksana Uji:** Asosiasi Layanan Makanan Jepang (JFnet / 一般社団法人 日本フードサービス協会) & OTAFF / Prometric  
**Dasar Kurasi Primer:**
- \`reference-books/ssw/02_gaishoku_food_service/Gaishoku_Customer_Service_Textbook_JA.pdf\` (50 halaman) & \`reference-books/ssw/02_gaishoku_food_service/Gaishoku_Customer_Service_Textbook_ID.pdf\` (Pelayanan Pelanggan Ver 1.1)
- \`reference-books/ssw/02_gaishoku_food_service/Gaishoku_Food_Preparation_Textbook_JA.pdf\` (49 halaman) & \`reference-books/ssw/02_gaishoku_food_service/Gaishoku_Food_Preparation_Textbook_ID.pdf\` (Pengolahan Makanan Dapur Ver 1.1)
- \`reference-books/ssw/02_gaishoku_food_service/Gaishoku_Hygiene_Control_Textbook_JA.pdf\` (45 halaman) & \`reference-books/ssw/02_gaishoku_food_service/Gaishoku_Hygiene_Control_Textbook_ID.pdf\` (Manajemen Kebersihan Restoran Ver 1.2)
**Landasan Teoretis & Empiris:**
- Needs Analysis & Technical Lexicon (Nation & Hwang 1995 [VS-09]; Chung & Nation 2003 [VS-10])
- Cross-Cultural Communication in Service Operations & HOU-REN-SO (Mustaqim & Priventa 2026 [VS-31]; Supriatnaningsih et al. 2024 [VS-33])
- Speech Level Shift & Keigo Registers in Hospitality Food Service (Pramesti et al. 2019 [VS-29])
- Empirical Food & Beverage Hospitality Japanese Needs (Wijayanti & Septipani 2025 [VS-42])
- Statutory Food Service Evaluation Test Standards (OTAFF 2024 [VS-43])
- Restaurant HACCP & Norovirus Sanitation Protocols (MHLW & MAFF 2021 [VS-44])
- Occupational Safety & Kitchen Burn/Slip Prevention (JNIOSH 2020 [VS-39])

---

## 1. SPESIFIKASI UJIAN RESMI PROMETRIC CBT (STANDAR JFNET / OTAFF)

Kandidat visa *Tokutei Ginou 1-gō & 2-gō* bidang Layanan Restoran menempuh ujian Computer-Based Testing (CBT) dengan spesifikasi regulasi resmi:

\`\`\`
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                              PROMETRIC CBT FOOD SERVICE INDUSTRY EXAM MATRIX                           │
├─────────────────────────┬────────────────────────────────────────┬─────────────┬───────────┬───────────┤
│ Komponen Ujian          │ Cakupan Ranah Pengujian                │ Jumlah Soal │ Durasi    │ Ambang    │
├─────────────────────────┼────────────────────────────────────────┼─────────────┼───────────┼───────────┤
│ Ujian Terpadu CBT       │ 1. 接客全般 (Pelayanan Pelanggan & 7-Daigo) 45 Soal  │ 60 Menit  │ $\\ge 65\\%$│
│ (Gakka & Jitsugi Layar) │ 2. 調理全般 (Pengolahan Dapur & Suhu Inti) (Pilihan  │           │ (30 / 45) │
│                         │ 3. 衛生管理 (HACCP & Kebersihan Norovirus) Ganda 4)  │           │           │
└─────────────────────────┴────────────────────────────────────────┴─────────────┴───────────┴───────────┘
\`\`\`

> **Catatan Bahasa Ujian:** Teks soal disajikan dalam **Bahasa Jepang berfurigana**, menguji kompetensi situasional nyata di restoran (dialog kasir, keluhan pelanggan, dan resep dapur).

---

## 2. DUA DIVISI UTAMA KERJA RESTORAN JEPANG

1. **Front-of-House / Pelayanan Ruang Makan (ホール・接客業務):**
   - Salam sambutan (*Irasshaimase*), pemanduan ke meja (*seki annai*), pencatatan pesanan menu, konfirmasi bahan pemicu alergi (*arerugii kakunin*), penyajian hidangan, penanganan kasir (tunai, kartu kredit, QR e-money), penanganan keluhan sopan (*kureemu taiou*).
2. **Back-of-House / Dapur & Pengolahan Makanan (キッチン・調理業務):**
   - Persiapan bahan baku (*shikomi*), teknik pisau dapur (*santoku / gyuutou*), metode pemanasan (rebus, goreng deep-fryer, panggang, tumis), pengukuran suhu inti daging, pencucian piring 3 bak sanitasi, dan pembuangan lemak grease trap.

---

## 3. MODUL PEMBELAJARAN KURIKULUM (PEDAGOGICAL MODULES)

### MODUL 1: ETIKA PELAYANAN & 7 KALIMAT SAKTI (接客サービスと７大用語)
- **Topik 1.1: Standar Keigo Keramahan Pelanggan (7-Daigo Restoran):**
  - **Topik 1.1.1: Tujuh Kalimat Sakti Front-of-House:**
    1. *「いらっしゃいませ！」* (*Irasshaimase* — Selamat datang!)
    2. *「お待たせいたしました。」* (*Omatase itashimashita* — Maaf telah membuat Anda menunggu.)
    3. *「少々お待ちください。」* (*Shoushou omachi kudasai* — Mohon tunggu sebentar.)
    4. *「かしこまりました。」* (*Kashikomarimashita* — Baik, saya mengerti dan siap laksanakan.)
    5. *「恐れ入りますが…」* (*Osore irimasu ga...* — Mohon maaf merepotkan, namun...)
    6. *「申し訳ございません。」* (*Moushiwake gozaimasen* — Saya mohon maaf sebesar-besarnya.)
    7. *「ありがとうございました！またお越しくださいませ。」* (*Arigatou gozaimashita! Mata okoshi kudasai mase* — Terima kasih banyak! Silakan datang kembali.)
  - **Topik 1.1.2: Larangan Penggunaan Baito-Keigo Rancu:** Menghindari frasa keliru seperti *「〇〇のほうでよろしかったでしょうか」* (ganti dengan *「〇〇でよろしいでしょうか」*) atau *「1000円からお預かりします」* (ganti dengan *「1000円お預かりいたします」*).
- **Topik 1.2: Prosedur Penerimaan Tamu & Konfirmasi Alergen:**
  - **Topik 1.2.1: Alur Pemanduan Kursi & Pencatatan Menu:** Konfirmasi jumlah tamu dewasa/anak, penawaran meja bebas rokok, pengulangan pesanan (*fukushou kakunin*), dan penyerahan struk pesanan.
  - **Topik 1.2.2: Verifikasi Alergi Makanan Konsumen (アレルギー確認):** Kewajiban mengonfirmasi kandungan 8 bahan alergen wajib saat konsumen bertanya; larangan menebak mandiri tanpa konfirmasi ke koki dapur!

---

### MODUL 2: KETERAMPILAN DAPUR & KONTROL SUHU INTI (調理技術と中心温度)
- **Topik 2.1: Pengoperasian Pisau Dapur & Metode Memasak:**
  - **Topik 2.1.1: Anatomi Pisau Santoku & Gyuutou:** Posisi jari mencengkeram gagang pisau, jari kiri melipat layaknya cakar kucing (*neko no te*) menahan bahan makanan untuk mencegah luka iris jari.
  - **Topik 2.1.2: Pemanasan Penggorengan Deep-Fryer 180°C:** Pengeringan air pada bahan makanan sebelum dimasukkan ke minyak panas guna mencegah letupan minyak panas mengenai wajah dan lengan koki.
- **Topik 2.2: Pengukuran Suhu Inti Pemanasan Dapur (中心温度計):**
  - **Topik 2.2.1: Standar Pemanasan Daging Ayam/Babi (75°C 1 Menit):** Penusukan termometer ke bagian tertebal daging untuk memusnahkan bakteri Campylobacter dan Salmonella.
  - **Topik 2.2.2: Pemanasan Kerang Bivalvia Pembasmi Norovirus (85°C 90 Detik):** Standar memasak tiram dan kerang simping hingga suhu inti mencapai $\ge 85^\circ\text{C}$ dipertahankan minimal 90 detik.

---

### MODUL 3: MANAJEMEN KEBERSIHAN RESTORAN & NOROVIRUS (衛生管理とノロ対策)
- **Topik 3.1: Protokol Karantina & Sanitasi Wabah Norovirus:**
  - **Topik 3.1.1: Gejala Norovirus & Larangan Bekerja (出勤停止):** Karyawan yang mengalami diare, mual, atau muntah wajib segera melapor dan dilarang masuk ke dapur restoran sampai dinyatakan sembuh total oleh dokter.
  - **Topik 3.1.2: Pembersihan Tumpahan Muntahan Pelanggan (吐瀉物処理):** Pemakaian masker, sarung tangan ganda, dan celemek; penutupan tumpahan dengan koran/tisu yang dibasahi larutan natrium hipoklorit 1.000 ppm (0.1%), pembersihan dari arah luar memutar ke dalam.
- **Topik 3.2: Pencegahan Kontaminasi Silang di Meja Dapur:**
  - **Topik 3.2.1: Kode Warna Talenan & Pisau Berdasarkan Bahan:** Talenan merah (daging mentah), biru (ikan mentah), hijau (sayuran), putih (makanan matang siap saji).
  - **Topik 3.2.2: Tiga Bak Cuci Piring Sanitasi (洗浄・すすぎ・消毒):** Bak 1 mencuci sisa makanan air hangat sabun 40°C, Bak 2 membilas air bersih, Bak 3 merendam disinfektan/air panas 80°C selama 2 menit.

---

### MODUL 4: K3 AREA DAPUR RESTORAN & KASIR (厨房安全とクレーム対応)
- **Topik 4.1: Pencegahan Bahaya Terpeleset & Luka Bakar (転倒・熱傷防止):**
  - **Topik 4.1.1: Pemakaian Sepatu Dapur Sol Anti-Selip (耐滑靴):** Sol karet beralur khusus penahan licin di lantai berminyak; larangan keras berlari di area dapur restoran!
  - **Topik 4.1.2: Pemasangan Selimut Pemadam Api Minyak (ファイヤーブランケット):** Larangan keras menyiramkan air ke dalam wajan minyak mendidih yang terbakar; wajib menutup dengan tutup logam atau selimut pemadam api!
- **Topik 4.2: Penanganan Keluhan Konsumen Santun (クレーム対応):**
  - **Topik 4.2.1: Prosedur Penundukan Badan Meminta Maaf:** Mendengarkan keluhan pelanggan dengan tatap mata simpatik tanpa memotong pembicaraan, menyampaikan permohonan maaf tulus atas ketidaknyamanan, dan segera memanggil manajer toko (*tenchou*).

---

## 4. KOSAKATA TEKNIS LAYER 2 (JFNET OFFICIAL FOOD SERVICE LEXICON)

| No | Kanji | Kana | Romaji | Indonesian Gloss | High-Stakes Risk Category |
|---|---|---|---|---|---|
| 1 | 接客７大用語 | せっきゃくななだいようご | *sekkyaku nanadaikougo* | Tujuh frasa sopan wajib pelayanan restoran | Customer Service Etiquette Breach |
| 2 | アレルギー表示 | あれるぎーひょうじ | *arerugii hyouji* | Label konfirmasi 8 bahan pemicu alergi konsumen | Lethal Anaphylactic Reaction |
| 3 | 中心温度計 | ちゅうしんおんどけい | *chuushin ondokei* | Termometer tusuk pengukur suhu inti masakan | Undercooked Pathogen Infection |
| 4 | ノロウイルス対策 | のろういるすたいさく | *norouirusu taisaku* | Prosedur sanitasi pemusnahan patogen muntahan diare| Mass Restaurant Gastroenteritis |
| 5 | 食中毒予防三原則 | しょくちゅうどくよぼうさんげんそく| *shokuchuudoku yobou* | Tiga prinsip: tidak menempel, tidak biak, bunuh | Foodborne Illness Outbreak |
| 6 | フライヤー熱傷 | ふらいやーねっしょう | *furaiyaa nesshou* | Luka bakar siraman minyak goreng mendidih 180°C | Severe 3rd-Degree Scald Burn |
| 7 | 交差汚染防止 | こうさおせんぼうし | *kousa osen boushi* | Pemisahan pisau/talenan daging mentah vs matang | Salmonella Cross-Contamination |
| 8 | レジ操作（会計） | れじそうさ（かいけい） | *reji sousa (kaikei)* | Pengoperasian mesin kasir pembayaran tunai/e-money| Cash Discrepancy & Fraud |
| 9 | クレーム対応 | くれーむたいおう | *kureemu taiou* | Prosedur etika menangani komplain pelanggan | Business Reputation Destruction |
| 10 | 二枚貝加熱基準 | にまいがいかねつきじゅん | *nimaigai kanetsu kijun* | Pemanasan tiram/kerang $\\ge 85^\\circ\\text{C}$ selama $\\ge 90\\text{ detik}$ | Norovirus Shellfish Poisoning |
| 11 | 次亜塩素酸ナトリウム | じあえんそさんのとりうむ | *jiaensosan natoriumu* | Disinfektan klorin pembersih muntahan (1000 ppm) | Inadequate Disinfection Outbreak |
| 12 | 耐滑シューズ | たいかつしゅーず | *taikatsu shuuzu* | Sepatu dapur sol karet khusus anti-tergelincir | Kitchen Floor Slip & Fall Fracture |
| 13 | グリストラップ清掃 | ぐりすとらっぷせいそう | *gurisutorappu seisou* | Pembersihan bak penyaring lemak minyak sisa dapur | Pipe Clogging & Foul Odor |
| 14 | カンピロバクター | かんぴろばくたー | *kampirobakutaa* | Bakteri patogen keracunan makanan daging ayam mentah| Severe Enteritis & Guillain-Barré |
| 15 | 非常停止スイッチ | ひじょうていしすいっち | *hijou teishi suitchi* | Tombol darurat pemutus mesin pencuci piring/slicer | Dishwasher Pinch Escalation |
| 16 | 三槽シンク | さんそうしんく | *sansou shinku* | Bak cuci 3 tahap: sabun, bilas air, disinfektan panas| Insufficient Tableware Sanitization |
| 17 | 復唱確認 | ふくしょうかくにん | *fukushou kakunin* | Pengulangan kembali pesanan menu di depan tamu | Order Mismatch Complaint |
| 18 | 猫の手 | ねこのて | *neko no te* | Posisi jari tangan kiri melipat saat memotong bahan | Severe Knife Finger Laceration |
| 19 | 出勤停止基準 | しゅっきんていしきじゅん | *shukkin teishi kijun* | Larangan masuk kerja staf bergejala diare/demam | Secondary Staff Contamination |
| 20 | 食券機 | しょっけんき | *shokkenki* | Mesin otomatis pembelian kupon makanan restoran | Currency Jamming Error |
| 21 | 排気フード清掃 | はいきふーどせいそう | *haiki fuudo seisou* | Pembersihan saringan minyak cerobong asap dapur | Grease Fire Exhaust Disaster |
| 22 | 油火災消火器 | あぶらかさいしょうかき | *abura kasai shoukaki* | Tabung pemadam kebakaran kimia busa khusus minyak | Water on Oil Explosion Hazard |
| 23 | カトラリー補充 | かとらりーほじゅう | *katorarii hojuu* | Penataan sendok, garpu, dan sumpit steril di meja | Contaminated Tableware Use |
| 24 | 賞味期限・消費期限 | しょうみ・しょうひきげん | *shoumi / shouhi kigen* | Batas mutu rasa vs batas aman maksimal konsumsi | Serving Expired Food Liability |
| 25 | 席案内 | せきあんない | *seki annai* | Pemanduan sopan pelanggan menuju kursi makan | Table Allocation Confusion |
| 26 | 下膳（下げ膳） | げぜん（さげぜん） | *gezen (sagezen)* | Pembersihan piring kotor dari meja makan tamu | Spilled Hot Soup Scalding |
| 27 | 包丁研ぎ | ほうちょうとぎ | *houchou togi* | Pengasahan ketajaman pisau pada batu asah basah | Dull Blade Slipping Laceration |
| 28 | アルコール製剤噴霧 | あるこーるせいざいふんむ | *arukooru seizai fummu* | Penyemprotan alkohol sanitasi meja makan tamu | Food Flavor Impairment |
| 29 | 検食保存 | けんしょくほぞん | *kenshoku hozon* | Penyimpanan sampel makanan 50g beku selama 2 minggu | Regulatory Inspection Non-Compliance |
| 30 | ラップフィルム保管 | らっぷふぃるむほかん | *rappu firumu hokan* | Penutupan cling-wrap wadah makanan di chiller | Atmospheric Desiccation & Odor |
| 31 | サルモネラ菌 | さるもねらきん | *sarumonera kin* | Bakteri patogen keracunan makanan pada cangkang telur| High Fever Gastroenteritis |
| 32 | 黄色ブドウ球菌 | おうしょくぶどうきゅうきん| *oushyoku budou kyuukin* | Bakteri penghasil enterotoksin tahan panas luka nanah| Toxin-Mediated Violent Vomiting |
| 33 | 割れ物処理 | われものしょり | *waremono shori* | Pembersihan pecahan piring kaca/keramik lantai | Deep Glass Puncture Wound |
| 34 | スープ保温管理 | すーぷほおんかんり | *suupu hoon kanri* | Pemeliharaan suhu panci kaldu di atas 65°C | Bacterial Proliferation Danger Zone |
| 35 | 便座除菌ペーパー | べんざじょきんぺーぱー | *benza jokin peepaa* | Kertas tisu pembersih disinfektan kloset toilet tamu| Norovirus Toilet Transmission |
| 36 | ５Ｓ店舗衛生 | ごえすてんぽえいせい | *goesutempo eisei* | Manajemen kebersihan lorong makan dan keindahan meja | Customer Trust & Zero Defect |

---

## 5. DIRECTIVES K3 DARURAT & FORMULA YUBISASHI KOSHO

### Teriakan Darurat Spontan di Tempat Kerja:
- *「水をかけるな！油火災に水をかけるな！毛布で覆え！」* (*Mizu wo kakeru na! Abura kasai ni mizu wo kakeru na! Moufu de ooe!* — Jangan siram air! Kebakaran minyak jangan disiram air! Tutup dengan selimut!)
- *「走るな！足元が滑るぞ！ゆっくり歩け！」* (*Hashiru na! Ashimoto ga suberu zo! Yukkuri aruke!* — Jangan lari! Lantainya licin! Jalan pelan-pelan!)
- *「吐瀉物に触るな！ノロ対策キットを持ってこい！」* (*Toshabutsu ni sawaru na! Noro taisaku kitto wo motte koi!* — Jangan sentuh muntahan! Bawa kit penanganan Norovirus!)

### Formula Point-and-Call (指差し呼称):
1. **Pengecekan Suhu Inti Daging Ayam:** *「加熱温度75度、1分経過確認、ヨシ！」*
2. **Pengecekan Alergen Pada Struk:** *「アレルゲン特定原材料、確認完了、ヨシ！」*
3. **Pengecekan Kerapian Penampilan Kerja:** *「身だしなみチェック、毛髪混入なし、名札装着、ヨシ！」*
4. **Pengecekan Panci Minyak Fryer:** *「フライヤー油面レベル、規定量、水気なし、ヨシ！」*

---

## 6. BANK SOAL UJIAN CBT JFNET RESMI

### Contoh Soal Ujian Teori (学科試験 4 Pilihan):
> **Soal 1:** 飲食店において、加熱調理する食品の中心温度と加熱時間の基準として、最も適切なものを１つ選びなさい。  
> １. 中心温度が50℃に達したら直ちに火を止める。  
> ２. 中心温度が75℃以上で、１分間以上（二枚貝等は85℃以上で90秒間以上）加熱する。  
> ３. 表面の色が変わるまで加熱すれば、内部の温度を測定する必要はない。  
> ４. 冷凍状態のまま強火で外側だけを焦がすように加熱する。  
> **Kunci Jawaban:** **2** (Standar HACCP restoran: suhu inti daging minimal 75°C selama 1 menit; kerang bivalvia minimal 85°C selama 90 detik).

> **Soal 2:** ホールでの接客中、お客様から「料理に髪の毛が入っている」とご指摘（クレーム）を受けた際の対応として、最も適切なものを１つ選びなさい。  
> １. 「厨房スタッフの髪型を確認します」と言って反論する。  
> ２. まず不快な思いをさせたことに対して誠心誠意お詫びし、新しいお料理への作り直しや店長への報告を速やかに行う。  
> ３. お客様の目の前で料理から髪の毛を取り除き、そのままお召し上がりいただくよう勧める。  
> ４. 自分はホールの担当であり調理には責任がないと説明する。  
> **Kunci Jawaban:** **2** (Prinsip penanganan keluhan restoran Jepang: sampaikan permohonan maaf tulus seketika tanpa membantah, tawarkan penggantian menu baru, dan laporkan kepada manajer toko).
`;

fs.writeFileSync(path.join(sswDir, "SSW-16-FOOD-SERVICE-RESTAURANT-SYLLABUS.md"), ssw16Content, "utf8");
console.log("SSW-16 written successfully!");

// ==========================================
// SSW-17: HOSPITALITY / ACCOMMODATION
// ==========================================
const ssw17Content = `# SILABUS KEJURUAN RESMI NUGGET NIHONGO · SEKTOR 17: ACCOMMODATION & HOSPITALITY (PERHOTELAN & RYOKAN)
**Kode Sektor:** \`SSW-HOSP-01\` · **Versi:** v2.0 (Corpus v30 Canonical Revision)  
**Status:** AUTHORITATIVE & EXHAUSTIVE SECTOR SYLLABUS  
**Kementerian Pembina:** Badan Pariwisata Jepang (JTA / 観光庁) & Kementerian Pertanahan, Infrastruktur, Transportasi dan Pariwisata (MLIT / 国土交通省)  
**Badan Pelaksana Uji:** Pusat Ujian Keterampilan Industri Akomodasi (CAIPT / 一般社団法人 宿泊業技能試験センター) & Zenryoren / Prometric  
**Dasar Kurasi Primer:**
- \`reference-books/ssw/06_shukuhaku_hospitality/Hospitality_SSW1_Textbook_JA.pdf\` (52 halaman) & \`reference-books/ssw/06_shukuhaku_hospitality/Hospitality_SSW1_Textbook_ID.pdf\` (Teks Belajar Resmi CAIPT / Zenryoren Bahasa Indonesia)
- \`reference-books/ssw/06_shukuhaku_hospitality/Hospitality_SSW2_Textbook_JA.pdf\` (Teks Evaluasi Tingkat Lanjut Tokutei Ginou 2-gō)
- \`reference-books/ssw/06_shukuhaku_hospitality/Hospitality_Terminology_Glossary_JA.pdf\` (Kamus Glosarium Istilah Resmi Industri Perhotelan Jepang)
- \`reference-books/ssw/06_shukuhaku_hospitality/Hospitality_Past_Exam_Questions_JA.pdf\` (Kumpulan Soal Asli Ujian Masa Lalu CAIPT)
**Landasan Teoretis & Empiris:**
- Needs Analysis & Technical Lexicon (Nation & Hwang 1995 [VS-09]; Chung & Nation 2003 [VS-10])
- Cross-Cultural Communication in Service Operations & HOU-REN-SO (Mustaqim & Priventa 2026 [VS-31]; Supriatnaningsih et al. 2024 [VS-33])
- Empirical Hospitality Japanese Needs Analysis among Indonesian SSW Workers (Pratama & Srimulyani 2024 [VS-30])
- Keigo Mastery & Omotenashi Implementation among Indonesian Trainees (Sari & Kastuti 2023 [VS-34])
- Hotel Fire Evacuation & Disaster Response Protocols (JNIOSH 2020 [VS-39])

---

## 1. SPESIFIKASI UJIAN RESMI PROMETRIC CBT (STANDAR CAIPT / JTA)

Kandidat visa *Tokutei Ginou 1-gō & 2-gō* bidang Perhotelan menempuh ujian Computer-Based Testing (CBT) dengan spesifikasi regulasi resmi:

\`\`\`
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                              PROMETRIC CBT HOSPITALITY INDUSTRY EXAM MATRIX                            │
├─────────────────────────┬────────────────────────────────────────┬─────────────┬───────────┬───────────┤
│ Komponen Ujian          │ Cakupan Ranah Pengujian                │ Jumlah Soal │ Durasi    │ Ambang    │
├─────────────────────────┼────────────────────────────────────────┼─────────────┼───────────┼───────────┤
│ 1. Ujian Teori & Kasus  │ Layanan front desk & check-in, kontrak │ 30 Soal     │ 45 Menit  │ $\\ge 65\\%$│
│    (学科・状況設定試験) │ akomodasi, reservasi online OTA, etika │ (Format     │           │ (20 / 30) │
│                         │ omotenashi ryokan, housekeeping kamar, │  True/False │           │           │
│                         │ dan manajemen evakuasi bencana hotel   │  ○× & 4 Pil)│           │           │
└─────────────────────────┴────────────────────────────────────────┴─────────────┴───────────┴───────────┘
\`\`\`

> **Catatan Bahasa Ujian:** Ujian disajikan dalam **Bahasa Jepang berfurigana**, menguji kemampuan penalaran etiket kesopanan (*Omotenashi*) dan pemahaman dokumen hotel nyata.

---

## 2. EMPAT BIDANG OPERASIONAL UTAMA HOTEL & RYOKAN JEPANG

1. **Layanan Kantor Depan & Tamu (フロント・ロビー業務 - Front Desk & Concierge):**
   - Prosedur check-in/check-out, verifikasi paspor tamu asing wajib hukum, penerbitan kartu kamar (*rooming card*), penitipan barang koper (*baggage claim*), panggilan taksi, informasi wisata sekitar.
2. **Pemasaran, Humas & Reservasi (企画・広報・予約業務):**
   - Penanganan reservasi telepon, sistem pemesanan online agen perjalanan (OTA), situs metasearch, revenue management, manajemen kuota kamar terisi (*occupancy rate*).
3. **Housekeeping & Penyiapan Kamar (客室・ハウスキーピング業務):**
   - Merapikan tempat tidur (*bed making* sistem duvet), penggantian linen sprei bersih, sanitasi unit kamar mandi, penyusunan amenities, pencatatan barang tertinggal tamu (*lost and found*).
4. **Restoran & Perjamuan Hotel (料飲・宴会業務 - Food & Beverage):**
   - Layanan sarapan prasmanan buffet hotel, jamuan makan malam tradisional Jepang Kaiseki di Ryokan, etika penyajian hidangan berurutan, tata krama melipat alas meja.

---

## 3. MODUL PEMBELAJARAN KURIKULUM (PEDAGOGICAL MODULES)

### MODUL 1: LAYANAN FRONT DESK & KONTRAK PENGINAPAN (フロント業務)
- **Topik 1.1: Standar Check-in & Kewajiban Hukum Verifikasi Paspor:**
  - **Topik 1.1.1: Pengisian Kartu Registrasi Tamu (レジストレーションカード):** Pengecekan nama, alamat, nomor kontak, dan metode pembayaran tamu (tunai, kartu kredit, deposit).
  - **Topik 1.1.2: Kewajiban Fotokopi Paspor Tamu Asing Tanpa Alamat di Jepang:** Berdasarkan UU Bisnis Perhotelan Jepang (*Ryokan Gyouhou*), staf wajib meminta paspor tamu warga negara asing non-residen, memverifikasi foto, dan menyimpan fotokopi/scan paspor.
- **Topik 1.2: Penyerahan Kunci Kamar & Dokumen Syarat Ketentuan (宿泊約款):**
  - **Topik 1.2.1: Penjelasan Informasi Fasilitas Kamar (ルーミングカード):** Penjelasan nomor kamar, jam sarapan, lokasi pemandian air panas umum (*onsen/daiyokujou*), dan kata sandi Wi-Fi hotel.
  - **Topik 1.2.2: Syarat dan Ketentuan Kontrak Penginapan (宿泊約款 - Yakkan):** Kebijakan biaya pembatalan kamar (*cancellation fee / kyan-seru-ryou*), batas jam check-out, larangan merokok di kamar non-smoking.

---

### MODUL 2: ETIKA OMOTENASHI & KEIGO PERHOTELAN (おもてなしと敬語)
- **Topik 2.1: Postur Tubuh & Derajat Membungkuk Hormat (お辞儀の角度):**
  - **Topik 2.1.1: Tiga Tingkatan Busur Hormat (Eshaku, Keirei, Saikeirei):**
    - *Eshaku (会釈 - 15°):* Salam ringan berpapasan dengan tamu di lorong hotel.
    - *Keirei (敬礼 - 30°):* Salam hormat resmi saat menyambut kedatangan atau check-in tamu di front desk.
    - *Saikeirei (最敬礼 - 45°):* Salam penghormatan tertinggi saat meminta maaf mendalam atas keluhan atau mengantar kepulangan tamu VIP.
- **Topik 2.2: Formula Bahasa Kehormatan Sonkeigo & Kenjougo (Sari & Kastuti 2023 [VS-34]):**
  - **Topik 2.2.1: Ungkapan Merendahkan Diri Staf (Kenjougo):** *「ご案内いたします」*, *「承知いたしました」*, *「お荷物をお預かりいたします」*.
  - **Topik 2.2.2: Ungkapan Menghormati Tindakan Tamu (Sonkeigo):** *「お名前をご記入いただけますでしょうか」*, *「朝食券をお持ちになってレストランへお越しくださいませ」*.

---

### MODUL 3: HOUSEKEEPING, BED MAKING & BARANG TERTINGGAL (客室清掃)
- **Topik 3.1: Prosedur Merapikan Ranjang Tempat Tidur (ベッドメイキング):**
  - **Topik 3.1.1: Pemasangan Sprei Bawah & Sudut Lipatan Segitiga (コーナー折り):** Pemasangan fitted/flat sheet sprei bawah kencang tanpa kerutan, pelipatan sudut sprei membentuk sudut miring 45 derajat rapi.
  - **Topik 3.1.2: Sarung Selimut Gaya Duvet (デュベスタイル):** Pemasangan selimut bulu angsa ke dalam sarung duvet putih bersih, penataan bantal tidur dengan lubang sarung menghadap ke arah dalam ranjang.
- **Topik 3.2: Penanganan Barang Tertinggal Tamu (遺失物・忘れ物):**
  - **Topik 3.2.1: Pencatatan Log Book Lost & Found:** Nomor kamar, tanggal dan jam temuan, nama barang terperinci, lokasi tepat (misal: di bawah bantal ranjang), nama staf penemu.
  - **Topik 3.2.2: Penanganan Benda Berharga (Valuables):** Uang tunai, dompet, perhiasan, paspor wajib langsung diserahkan kepada manajer tugas (*Duty Manager*) untuk disimpan di brankas besi hotel.

---

### MODUL 4: MANAJEMEN TANGGAP DARURAT & GEMPA BUMI HOTEL (防災避難誘導)
- **Topik 4.1: Panduan Evakuasi Bencana Alam Gempa Bumi & Tsunami:**
  - **Topik 4.1.1: Pemanduan Tamu Menuju Tangga Darurat (避難誘導):** Larangan menggunakan lift saat terjadi gempa bumi/kebakaran; memandu tamu secara tenang melalui tangga darurat tahan api (*hijou kaidan*).
  - **Topik 4.1.2: Verifikasi Jumlah Penghuni Kamar Melalui Daftar Tamu (宿泊客名簿):** Membawa daftar tamu front desk ke titik kumpul terbuka (*hinan basho*) untuk memastikan tidak ada tamu yang tertinggal di dalam kamar.
- **Topik 4.2: HOU-REN-SO Saat Alarm Kebakaran Kamar Berbunyi:**
  - **Topik 4.2.1: Prosedur Verifikasi Sumber Kebakaran:** Menuju kamar sumber alarm dengan membawa master key dan alat pemadam api portabel (*shoukaki*), mengetuk pintu kencang: *「フロントです！火事ですか？！お部屋を開けます！」*

---

## 4. KOSAKATA TEKNIS LAYER 2 (CAIPT OFFICIAL HOSPITALITY LEXICON)

| No | Kanji | Kana | Romaji | Indonesian Gloss | High-Stakes Risk Category |
|---|---|---|---|---|---|
| 1 | 宿泊約款 | しゅくはくやっかん | *shukuhaku yakkan* | Syarat dan ketentuan kontrak resmi penginapan hotel| Legal Liability & Breach |
| 2 | 避難誘導 | ひなんゆうどう | *hinan yuudou* | Pemanduan jalur evakuasi darurat gempa/kebakaran | Fatal Disaster Trampling |
| 3 | 遺失物（忘れ物） | いしつぶつ（わすれもの）| *ishitsubutsu (wasuremono)*| Barang berharga tamu yang tertinggal di kamar | Guest Property Theft Dispute |
| 4 | ルーミングカード | るーみんぐかーど | *ruumingu kaado* | Kartu informasi nomor kamar dan fasilitas hotel | Guest Security Breach |
| 5 | 客室稼働率 | きゃくしつかどうりつ | *kyakushitsu kadouritsu* | Persentase tingkat keterisian hunian kamar hotel | Overbooking & Revenue Loss |
| 6 | 最敬礼（45度） | さいけいれい | *saikeirei (45-do)* | Busur salam penghormatan tertinggi permohonan maaf | Severe Sociopragmatic Failure |
| 7 | パスポート提示義務 | ぱすぽーとていじぎむ | *pasupooto teiji gimu* | Kewajiban hukum scan paspor tamu turis asing | Immigration Statutory Violation |
| 8 | デュベスタイル | でゅべすたいる | *dyube sutairu* | Gaya penataan sprei selimut sarung duvet rapi | Housekeeping Quality Defect |
| 9 | クローク（荷物預かり）| くろーく | *kurooku* | Penitipan koper dan mantel jaket tamu di lobi | Lost Luggage Compensation Claim |
| 10 | 非常階段 | ひじょうかいだん | *hijou kaidan* | Tangga darurat evakuasi kebakaran gedung hotel | Blocked Fire Escape Fatality |
| 11 | オーバーブッキング | おーばーぶっきんぐ | *oobaabukkingu* | Kondisi reservasi melebihi kapasitas jumlah kamar | Inability to Accommodate Guest |
| 12 | 外国人宿泊客名簿 | がいこくじんしゅくはくきゃくめいぼ| *gaikokujin kyakumeibo*| Buku register registrasi resmi identitas tamu asing | Police Audit Criminal Penalty |
| 13 | アメニティ補充 | あめにてぃほじゅう | *ameniti hojuu* | Pengisian perlengkapan sikat gigi, sabun, sampo | Guest Dissatisfaction Complaint |
| 14 | 禁煙室・喫煙室 | きんえんしつ・きつえんしつ| *kin'enshitsu / kitsuenshitsu*| Pembedaan kamar bebas rokok vs kamar merokok | Smoke Contamination Damage Claim |
| 15 | 非常放送設備 | ひじょうほうそうせつび | *hijou housou setsubi* | Sistem pengeras suara darurat pengumuman evakuasi | Mass Panic in Hotel |
| 16 | クレーム一次対応 | くれーむいちじたいおう | *kureemu ichiji taiou* | Penanganan awal etika meredakan keluhan tamu | Escalated Online Negative Review |
| 17 | バゲージタグ | ばげーじたぐ | *bageeji tagu* | Nomor kupon penitipan koper tas tamu lobi | Baggage Handover to Wrong Person |
| 18 | ドアノブサイン | どあのぶさいん | *doanobu sain* | Kartu gantung pintu (Make Up Room / Do Not Disturb)| Privacy Intrusion Scandal |
| 19 | 浴衣・丹前 | ゆかた・たんぜん | *yukata / tanzen* | Baju santai jepang dan jaket tebal pakaian ryokan | Cultural Dress Assistance |
| 20 | 温泉入浴マナー | おんせんにゅうよくまなー | *onsen nyuuyoku manaa* | Etika mandi berendam (wajib bilas sebelum masuk bak)| Foreign Guest Onsen Friction |
| 21 | 和室・布団敷き | わしつ・ふとんしき | *washitsu / futonshiki* | Penyiapan alas kasur lipat tradisional di kamar tatami| Back Strain & Tatami Damage |
| 22 | 連泊清掃（エコ清掃）| れんぱくせいそう | *rempaku seisou (eko)* | Pembersihan kamar tamu yang menginap beberapa malam | Towel Laundry Waste Error |
| 23 | シリンダーキー・カードキー| しりんだーきー | *shirindaa kii / kaado kii* | Kunci pintu fisik konvensional vs kartu RFID | Lockout & Master Key Loss Risk |
| 24 | レイトチェックアウト | れいとちぇっくあうと | *reito chekku auto* | Perpanjangan waktu keluar kamar melebihi jam standar| Cleaning Schedule Delay |
| 25 | 両替サービス（外貨） | りょうがえさーびす | *ryougae saabisu* | Layanan penukaran valuta mata uang asing tamu | Counterfeit Currency Loss |
| 26 | 会席料理配膳 | かいせきりょうりはいぜん | *kaiseki ryouri haizen* | Penyajian tata hidangan masakan tradisional ryokan | Food Spilling on Tatami / Kimono |
| 27 | アレルギーカルテ | あれるぎーかるて | *arerugii karute* | Catatan khusus pantangan makanan alergi tamu hotel | Lethal Hotel Dinner Shock |
| 28 | 防火扉確認 | ぼうかとびらかくにん | *bouka tobira kakunin* | Pemeriksaan pintu sekat penahan jilatan api otomatis| Smoke Inhalation Fatality |
| 29 | ハウスキーピングカート| はうすきーぴんぐかーと | *haasukippingu kaato* | Kereta dorong perlengkapan linen dan pembersih kamar| Corridor Obstruction Hazard |
| 30 | リネンサプライ | りねんさぷらい | *rinen sapurai* | Pengiriman sprei dan handuk bersih dari binatu | Linen Shortage Crisis |
| 31 | セーフティボックス | せーふてぃぼっくす | *seefutii bokkusu* | Kotak brankas penyimpanan uang/emas di dalam kamar | Forgotten Valuables Lockout |
| 32 | ルームサービス | るーむさーびす | *ruumu saabisu* | Pengantaran hidangan makanan langsung ke kamar tamu | Spill Scald & Order Delay |
| 33 | ノック３回確認 | のっくさんかいかくにん | *nokku sankai kakunin* | Ketukan pintu 3 kali disertai suara sapaan sebelum masuk| Shocking Walk-in on Naked Guest |
| 34 | 館内放送案内 | かんないほうそうあんない | *kannai housou annai* | Pengumuman audio darurat dua bahasa (Jepang/Inggris)| Multi-Lingual Evacuation Gap |
| 35 | デューティーマネージャー| でゅーてぃーまねーじゃー | *dyuutii maneejaa* | Manajer operasional jaga penanggung jawab krisis hotel| Escalation Breakdown |
| 36 | ５Ｓロビー美化 | ごえすろびーびか | *goesurobii bika* | Pemeliharaan kebersihan lantai marmer dan sofa tamu | Slip and Fall Liability in Lobby |

---

## 5. DIRECTIVES K3 DARURAT & FORMULA YUBISASHI KOSHO

### Teriakan Darurat Spontan di Tempat Kerja:
- *「火事です！エレベーターを使うな！非常階段へ誘導しろ！」* (*Kaji desu! Erebeetaa wo tsukau na! Hijou kaidan e yuudou shiro!* — Kebakaran! Jangan gunakan lift! Pandu ke tangga darurat!)
- *「揺れがおさまるまで頭を守れ！テーブルの下に入れ！」* (*Yure ga osamaru made atama wo mamore! Teeburu no shita ni haire!* — Lindungi kepala sampai gempa reda! Masuk ke bawah meja!)
- *「マスターキーから手を離すな！必ず身につけておけ！」* (*Masutaa kii kara te wo hanasu na! Kanarazu mi ni tsukete oke!* — Jangan lepas master key! Selalu bawa di badan!)

### Formula Point-and-Call (指差し呼称):
1. **Pengecekan Paspor Tamu Asing:** *「外国人パスポート複写確認、原本返却、ヨシ！」*
2. **Pengecekan Jalur Pintu Darurat:** *「非常階段前、障害物なし、扉開閉良好、ヨシ！」*
3. **Pengecekan Barang Tertinggal Kamar:** *「忘れ物チェック、ベッド下・金庫内・浴室クリア、ヨシ！」*
4. **Pengecekan Pemasangan Kunci Kamar:** *「カードキー有効期限・部屋番号印字、一致、ヨシ！」*

---

## 6. BANK SOAL UJIAN CBT CAIPT RESMI

### Contoh Soal Ujian Teori (学科試験 ○×):
> **Soal 1:** 日本国内に住所を持たない外国人旅行者がホテルに宿泊する場合、旅館業法に基づき、パスポートの提示を求め、氏名や国籍等を確認するとともに、パスポートのコピーを保存しなければならない。  
> **Kunci Jawaban:** **○ (Benar)** (Regulasi hukum resmi perhotelan Jepang mewajibkan pemeriksaan identitas dan penyimpanan fotokopi paspor turis asing non-residen).

> **Soal 2:** 火災が発生した場合、お客様を安全かつ速やかに屋外へ避難させるため、一度に多くの人を運べる大型エレベーターを使用して避難誘導するのが最も適切である。  
> **Kunci Jawaban:** **× (Salah)** (Dilarang keras menggunakan lift saat kebakaran gedung karena risiko lift terhenti akibat pemadaman listrik dan jebakan asap beracun; wajib menggunakan tangga darurat).

### Contoh Soal Ujian Situasional On-Screen (状況設定問題):
> **Soal 1:** フロントでのチェックイン時、お客様にお部屋の鍵（カードキー）をお渡しする際の言葉遣いとして、最も適切なものを１つ選びなさい。  
> １. 「はい、これが部屋の鍵ね。なくさないでね。」  
> ２. 「こちらがお部屋のカードキーでございます。どうぞごゆっくりお寛ぎくださいませ。」  
> ３. 「カードキーを差し上げます。ご自由にお使いください。」  
> ４. 「鍵を置いておきますので、勝手に持って行ってください。」  
> **Kunci Jawaban:** **2** (Format sonkeigo resmi omotenashi: *「こちらがお部屋のカードキーでございます。どうぞごゆっくりお寛ぎくださいませ。」*).
`;

fs.writeFileSync(path.join(sswDir, "SSW-17-HOSPITALITY-ACCOMMODATION-SYLLABUS.md"), ssw17Content, "utf8");
console.log("SSW-17 written successfully!");
