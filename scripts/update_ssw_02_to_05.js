const fs = require("fs");
const path = require("path");

const sswDir = path.join(__dirname, "../corpus/sections/synthesis/syllabi/ssw");

// ==========================================
// SSW-02: BUILDING CLEANING
// ==========================================
const ssw02Content = `# SILABUS KEJURUAN RESMI NUGGET NIHONGO · SEKTOR 02: BUILDING CLEANING (PEMBERSIHAN GEDUNG)
**Kode Sektor:** \`SSW-CLEN-01\` · **Versi:** v2.0 (Corpus v30 Canonical Revision)  
**Status:** AUTHORITATIVE & EXHAUSTIVE SECTOR SYLLABUS  
**Kementerian Pembina:** Kementerian Kesehatan, Tenaga Kerja, dan Kesejahteraan Jepang (MHLW / 厚生労働省)  
**Badan Pelaksana Uji:** Asosiasi Pemeliharaan Gedung Jepang (JBMA / 公益社団法人 全国ビルメンテナンス協会) & Pearson VUE  
**Dasar Kurasi Primer:**
- \`reference-books/ssw/05_building_cleaning/Building_Cleaning_Exam_Guide_ID.pdf\` (Panduan Peserta Ujian Resmi JBMA Bahasa Indonesia)
- \`reference-books/ssw/05_building_cleaning/Building_Cleaning_Exam_Sample_2025_JA.pdf\` (Spesifikasi Resmi CBT Pearson VUE per 10 Maret 2025)
- \`reference-books/ssw/05_building_cleaning/Building_Cleaning_Past_Exam_Questions_JA.pdf\` (Kumpulan Soal Asli Ujian Masa Lalu JBMA)
**Landasan Teoretis & Empiris:**
- Needs Analysis & LSP (Hutchinson & Waters 1987 [VS-01]; Dudley-Evans & St John 1998 [VS-02])
- Technical Lexicon Stratification (Nation & Hwang 1995 [VS-09]; Chung & Nation 2003 [VS-10])
- Cross-Cultural Communication in Service Operations & HOU-REN-SO (Mustaqim & Priventa 2026 [VS-31]; Supriatnaningsih et al. 2024 [VS-33])
- Geminate Acoustic Intelligibility in Shouted Operational Directives (Husna & Febriyanti 2022 [EA-25])
- Occupational Safety & Chemical Hazard Communication (JNIOSH 2020 [VS-39])

---

## 1. SPESIFIKASI UJIAN RESMI PEARSON VUE CBT (STANDAR MARET 2025)

Mulai 10 Maret 2025, pelaksanaan ujian *Building Cleaning Tokutei Ginō 1-gō* diselenggarakan secara nasional dan internasional melalui komputer di pusat tes **Pearson VUE**:

\`\`\`
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                              PEARSON VUE CBT BUILDING CLEANING EXAM MATRIX                             │
├─────────────────────────┬────────────────────────────────────────┬─────────────┬───────────┬───────────┤
│ Komponen Ujian          │ Cakupan Ranah Pengujian                │ Jumlah Soal │ Durasi    │ Ambang    │
├─────────────────────────┼────────────────────────────────────────┼─────────────┼───────────┼───────────┤
│ 1. Ujian Teori          │ Pengetahuan umum pembersihan gedung,   │ 20 Soal     │ 20 Menit  │ $\\ge 60\\%$│
│    (学科試験 - Gakka)   │ jenis lantai, kimiawi pembersih, K3    │ (Pilihan    │           │ (12 / 20) │
│                         │ kerja, regulasi pemeliharaan fasilitas │  Ganda / ○×)│           │           │
├─────────────────────────┼────────────────────────────────────────┼─────────────┼───────────┼───────────┤
│ 2. Ujian Praktik Layar  │ Identifikasi visual alat, urutan kerja │ 30 Soal     │ 30 Menit  │ $\\ge 60\\%$│
│    (実技試験 - Jitsugi) │ operasional polisher, pembersihan kaca,│ (Simulasi   │           │ (18 / 30) │
│                         │ sanitasi toilet, dan penanganan bahaya │  Visual CBT)│           │           │
└─────────────────────────┴────────────────────────────────────────┴─────────────┴───────────┴───────────┘
\`\`\`

> **Alur Pelaksanaan Ujian di Test Center (Total 60 Menit):**
> 1. Persetujuan Perjanjian Kerahasiaan (NDA): 3 Menit
> 2. Tutorial Cara Menjawab CBT: 6 Menit
> 3. Ujian Teori (20 Menit) + Ujian Praktik (30 Menit)
> 4. Kuesioner: 1 Menit
> 5. Laporan Skor (Score Report & Kelulusan) diterima langsung pada hari yang sama.
> 6. Bahasa: Bahasa Jepang dengan teks berhuruf kanji dan furigana lengkap.

---

## 2. JALUR OPERASIONAL SPESIALISASI PEMBERSIHAN GEDUNG

Kurikulum membedakan 4 domain kerja operasional:
1. **Pembersihan Rutin Harian (日常清掃 - Nichijou Seisou):**
   - Pembuangan sampah kantor, penyedotan debu karpet (*vacuuming*), pengepelan debu lantai lobi (*dust mopping*), pembersihan kaca pintu masuk, sanitasi toilet rutin.
2. **Pembersihan Berkala & Restorasi (定期清掃 - Teiki Seisou):**
   - Pengupasan lapisan lilin wax lama (*wax stripping / hakuri*), pelapisan ulang polymer wax (*wax coating*), ekstraksi pencucian karpet basah, pembersihan ventilasi AC.
3. **Pembersihan Fasilitas Khusus Rumah Sakit (病院清掃 - Byouin Seisou):**
   - Penanganan limbah medis infeksius (*kansensei haikibutsu*), disinfeksi ruang isolasi, sterilisasi gagang pintu dan sakelar, zonasi area bersih vs area infeksius.
4. **Pembersihan Ketinggian & Fasad Kaca (高所・ガラス清掃):**
   - Penggunaan tangga lipat (*stepladder*), perancah bergerak, sabuk keselamatan jatuh (*full harness*), teknik squeegee jendela satu tarikan (*Ichimonji / S-ji biki*).

---

## 3. MODUL PEMBELAJARAN KURIKULUM (PEDAGOGICAL MODULES)

### MODUL 1: MATERIAL LANTAI & TEKNIK PEMBERSIHAN (床材と清掃技術)
- **Topik 1.1: Klasifikasi & Karakteristik Permukaan Lantai:**
  - **Topik 1.1.1: Lantai Elastis (弾性床材 - Dansei Yukazai):** Karakteristik vinyl composition tile (VCT), sheet vinyl, dan linoleum; sensitivitas terhadap goresan dan alkali kuat.
  - **Topik 1.1.2: Lantai Keras & Batu Alam (硬質床材 - Kougyoku Yukazai):** Karakteristik marmer alam (*daisekiryuu*), granit (*mikageishi*), teraso, dan ubin keramik; peringatan mutlak: marmer larut rusak terkena zat asam!
  - **Topik 1.1.3: Lantai Serat Tekstil (繊維床材 - Sen'i Yukazai):** Karakteristik karpet nilon, poliester, wol, dan karpet ubin (*tile carpet*); teknik penanganan noda cairan dan debu terperangkap.
- **Topik 1.2: Teknik Pembersihan Lantai Kering & Basah:**
  - **Topik 1.2.1: Prosedur Dust Mop & Sapu Lantai Lobi:** Pola mendorong sapu pel debu tanpa mengangkat bilah kain dari lantai agar partikel debu halus tidak berhamburan ke udara.
  - **Topik 1.2.2: Prosedur Pengepelan Basah (Wet Mopping 8 Langkah):** Postur tubuh ergonomis, teknik mengayunkan pel membentuk lintasan angka 8 (*hachinoji-gake*), dan pembilasan pada ember ganda pemeras (*moppu shiboriki*).
  - **Topik 1.2.3: Pemeliharaan & Sanitasi Alat Pel:** Prosedur pencucian kain pel, perendaman disinfektan, dan penjemuran terbalik di ruang ventilasi untuk mencegah bau apek dan jamur.
- **Topik 1.3: Pengoperasian Mesin Pemoles Putar (ポリッシャー - Polisher):**
  - **Topik 1.3.1: Anatomi & Mekanisme Kendali Mesin Polisher:** Tuas penyesuaian sudut handle, sakelar pengaman dua tahap, tangki larutan kimia, pad holder, dan putaran sentrifugal motor listrik.
  - **Topik 1.3.2: Standar Kode Warna Pad Abrasif Pemoles:** Pad hitam/cokelat (pengupasan wax lama/hakuri), hijau/biru (pencucian kotoran membandel), merah (pencucian spray buffing harian), putih (pengkilapan wax kering/glazing).
  - **Topik 1.3.3: Protokol K3 Kabel Listrik Polisher:** Kewajiban menyampirkan kabel daya melintasi bahu operator ke belakang tubuh guna mencegah kabel tergilas pad berputar kecepatan tinggi.

---

### MODUL 2: KIMIA PEMBERSIH & SANITASI TOILET (洗剤化学とトイレ清掃)
- **Topik 2.1: Sifat Kimiawi & Skala pH Deterjen Pembersih:**
  - **Topik 2.1.1: Deterjen Netral pH 6–8 (中性洗剤 - Chuusei Senzai):** Karakteristik larutan surfaktan aman untuk seluruh jenis permukaan termasuk batu alam marmer, efektif mengangkat debu dan lapisan minyak ringan.
  - **Topik 2.1.2: Deterjen Alkali pH > 8 (アルカリ性洗剤):** Efektif mengemulsi noda minyak gemuk, jelaga dapur, dan melarutkan polimer lilin wax lama.
  - **Topik 2.1.3: Deterjen Asam pH < 6 (酸性洗剤):** Karakteristik pengikisan kerak urin kalsium fosfat (*nyouseki*) dan kerak air wastafel; larangan keras kontak dengan marmer!
- **Topik 2.2: Peringatan Kematian K3 Mutlak (混ぜるな危険):**
  - **Topik 2.2.1: Reaksi Kimia Pelepasan Gas Klorin Beracun:** Larangan keras mencampur disinfektan pemutih natrium hipoklorit (*ensokei*) dengan pembersih kerak asam (*sansei*) yang memicu gas klorin ($Cl_2$) mematikan.
  - **Topik 2.2.2: Tindakan Darurat Keracunan Gas Klorin:** Protokol evakuasi ke ruang terbuka arah angin, penyiraman mata dengan air mengalir 15 menit, dan aktivasi kode darurat 119.
- **Topik 2.3: Rasio Pengenceran Kimia & Regulasi Wadah:**
  - **Topik 2.3.1: Perhitungan Akurat Rasio Pengenceran (Kishaku Bairitsu):** Formula takaran larutan konsentrat (mis. 50x = 20 mL kimia + 980 mL air) dan penggunaan gelas ukur silinder.
  - **Topik 2.3.2: Standar Pelabelan Wadah Semprot Sekunder:** Kewajiban label identitas nama bahan kimia, tanggal pengenceran, batas kedaluwarsa, dan identitas petugas pada botol semprot.

---

### MODUL 3: TEKNIK PEMBERSIHAN KACA & SANITASI (ガラス清掃と衛生管理)
- **Topik 3.1: Penggunaan Window Washer & Squeegee Karet:**
  - **Topik 3.1.1: Pembasahan Kaca Menggunakan Washer:** Teknik menyapukan larutan kimia pembersih kaca secara merata tanpa memicu tetesan ke lantai lobi atau bingkai kayu.
  - **Topik 3.1.2: Tarikan Karet Squeegee Sudut 45 Derajat:** Teknik menekan bilah karet squeegee dengan kemiringan konstan, mengelap bilah karet dengan lap kering mikrofiber di setiap tarikan.
  - **Topik 3.1.3: Pola Tarikan Lurus (Ichimonji) vs Berkelanjutan (S-ji Biki):** Prosedur tarikan horizontal untuk kaca bertingkat dan tarikan kontinu huruf S untuk bidang kaca lebar komersial.
- **Topik 3.2: Sanitasi Terpadu Fasilitas Toilet Komersial:**
  - **Topik 3.2.1: Urutan Alur Kerja Sanitasi Toilet Standar:** Cermin wastafel $\\rightarrow$ counter wastafel $\\rightarrow$ urinal pria $\\rightarrow$ kloset duduk $\\rightarrow$ dinding partisi $\\rightarrow$ pembersihan lantai akhir.
  - **Topik 3.2.2: Pembersihan Kerak Kloset & Dudukan Washlet:** Penurunan permukaan air cekungan, aplikasi asam terarah, penyikatan rim mangkok, dan disinfeksi panel elektrik washlet dengan kain khusus terpisah.

---

### MODUL 4: K3, LIMBAH MEDIS & MANAJEMEN RISIKO GEDUNG (安全衛生と感染管理)
- **Topik 4.1: Pengelolaan Limbah Medis Infeksius Rumah Sakit (感染性廃棄物):**
  - **Topik 4.1.1: Pemisahan Wadah Berkode Warna Biohazard:** Wadah kuning (jarum suntik/bisturi tajam), wadah merah (darah cair/sampel patologi), wadah oranye (kasa/sarung tangan terkontaminasi).
  - **Topik 4.1.2: Larangan Pemadatan Sampah Infeksius Manual:** Larangan keras menekan atau menginjak kantong limbah biohazard menggunakan kaki atau tangan guna mencegah tertusuk jarum (*hari-sashi*).
- **Topik 4.2: K3 Pekerjaan Ketinggian & Pencegahan Jatuh:**
  - **Topik 4.2.1: Standar Penggunaan Tangga Lipat Segitiga (Kyatatsu):** Pembukaan penuh sudut engsel penahan, penguncian klem penahan tengah, dan larangan keras mengangkangi anak tangga teratas (*tenban*).
  - **Topik 4.2.2: Pemasangan Rambu Lantai Licin (Ashimoto Chuui):** Kewajiban mendirikan papan peringatan kuning (*Wet Floor Sign*) di kedua ujung koridor sebelum pekerjaan basah dimulai.

---

## 4. KOSAKATA TEKNIS LAYER 2 (JBMA OFFICIAL LEXICON)

| No | Kanji | Kana | Romaji | Indonesian Gloss | High-Stakes Risk Category |
|---|---|---|---|---|---|
| 1 | 希釈倍率 | きしゃくばいりつ | *kishaku bairitsu* | Rasio pengenceran zat kimia pembersih | Chemical Burn / Damage |
| 2 | 剥離作業 | はくりさぎょう | *hakuri sagyou* | Pengupasan lapisan lilin wax lama | Extreme Slip & Fall Hazard |
| 3 | ポリッシャー | ぽりっしゃー | *porisshaa* | Mesin pemoles putar lantai elektrik | Cable Snag / Motor Recoil |
| 4 | 中性洗剤 | ちゅうせいせんざい | *chuusei senzai* | Deterjen netral pH 7 | Chemical Selection Error |
| 5 | 酸性洗剤 | さんせいせんざい | *sansei senzai* | Deterjen asam pembersih kerak kencing | Surface Etching / Marble Damage |
| 6 | 塩素系漂白剤 | えんそけいひょうはくざい | *ensokei hyouhakuzai* | Disinfektan natrium hipoklorit pemutih | Toxic Gas Evolution Hazard |
| 7 | 混ぜるな危険 | まぜるなきけん | *mazeru na kiken* | Peringatan bahaya fatal mencampur asam & klorin | Lethal Chlorine Gas Poisoning |
| 8 | スクイジー | すくいじー | *sukuiijii* | Alat karet penarik air pembersih kaca jendela | Dropped Tool Hazard |
| 9 | 感染性廃棄物 | かんせんせいはいきぶつ | *kansensei haikibutsu* | Sampah medis berbahaya bernoda darah | Biohazard Bloodborne Infection |
| 10 | 脚立作業 | きゃたつさぎょう | *kyatatsu sagyou* | Pekerjaan menggunakan tangga lipat segitiga | Fall from Height |
| 11 | 送風乾燥 | そうふうかんそう | *soufuu kansou* | Pengeringan lantai menggunakan mesin blower | Slip & Fall Hazard |
| 12 | 尿石除去 | にょうせきじょきょ | *nyouseki jokyo* | Pembersihan kerak urin pada mangkok toilet | Acid Handling Hazard |
| 13 | 日常清掃 | にちじょうせいそう | *nichijou seisou* | Pembersihan rutin operasional harian gedung | Standard Procedure |
| 14 | 定期清掃 | ていきせいそう | *teiki seisou* | Pembersihan mendalam berkala (stripping/wax) | Heavy Equipment Operation |
| 15 | 保護具着用 | ほごぐちゃくよう | *hogogu chakuyou* | Kewajiban memakai APD kacamata & sarung tangan | Chemical Splash Injury |
| 16 | 樹脂ワックス | じゅしわっくす | *jushi wakkusu* | Lilin polimer pelapis pelindung lantai | Slip Hazard during coating |
| 17 | パッド台 | ぱっどだい | *paddodai* | Piringan pemegang pad abrasif pada polisher | Mechanical Ejection Risk |
| 18 | 自走式洗浄機 | じそうしきせんじょうき | *jisoushiki senjouki* | Mesin pembersih lantai otomatis gerak mandiri | Collision / Floor Damage |
| 19 | バキュームクリーナー | ばきゅーむくりーなー | *bakyuumu kuriinaa* | Alat penyedot debu basah dan kering industri | Electric Shock in wet use |
| 20 | 針刺し事故 | はりさしじこ | *harisashi jiko* | Kecelakaan tertusuk jarum suntik bekas | Bloodborne Pathogen (HIV/HBV) |
| 21 | バイオハザードマーク | ばいおはざーどまーく | *baiohazaado maaku* | Tanda simbol bahaya limbah medis infeksius | Containment Breach |
| 22 | 大理石保護 | だいりせきほご | *daisekiri hogo* | Perlindungan batu marmer alam dari zat asam | Irreversible Chemical Etching |
| 23 | 目地清掃 | めじせいそう | *meji seisou* | Pembersihan sela nat ubin keramik berjamur | Chemical Aerosol Inhalation |
| 24 | 防毒マスク | ぼうどくますく | *boudoku masuku* | Masker respirator gas beracun/organik | Asphyxiation / Poisoning |
| 25 | 保護メガネ | ほごめがね | *hogo megane* | Kacamata pelindung percikan cairan kimia | Eye Chemical Splash Blindness |
| 26 | 耐薬品手袋 | たいやくひんてぶくろ | *taiyakuhin tebukuro* | Sarung tangan karet tahan zat kimia korosif | Dermatitis & Chemical Burns |
| 27 | 踏み台 | ふみだい | *fumidai* | Bangku pijakan rendah kerja ketinggian | Loss of Balance / Fall |
| 28 | 転倒防止看板 | てんとうぼうしかんばん | *tentou boushi kamban* | Papan rambu peringatan lantai basah licin | Public Slip Liability |
| 29 | 残留洗剤除去 | ざんりゅうせんざいじょきょ | *zanryuu senzai jokyo* | Pembilasan residu kimia pembersih di lantai | Re-soiling & Slip Hazard |
| 30 | 水拭き・乾拭き | みずぶき・からぶき | *mizubuki / karabuki* | Pengelapan lap basah disusul lap kering steril | Moisture Damage & Slipping |
| 31 | 天板 | てんばん | *temban* | Pijakan paling atas tangga lipat (dilarang diinjak!) | Unstable Fall Catastrophe |
| 32 | モップ絞り器 | もっぷしぼりき | *moppu shiboriki* | Ember pemeras kain pel sistem jepit | Finger Pinch Hazard |
| 33 | 汚水回収 | おすいかいしゅう | *osui kaishuu* | Penyedotan air kotor sisa pencucian lantai | Bacterial Dispersion Hazard |
| 34 | スプレーボトル | すぷれーぼとる | *supuree botoru* | Botol semprot aplikator larutan kimia kerja | Accidental Misidentification |
| 35 | 便座除菌 | べんざじょきん | *benza jokin* | Disinfeksi dudukan kloset dengan alkohol | Cross-Contamination |
| 36 | 換気確認 | かんきかくにん | *kanki kakunin* | Verifikasi exhaust sirkulasi udara ruang kimia | Toxic Vapor Accumulation |

---

## 5. DIRECTIVES K3 DARURAT & FORMULA YUBISASHI KOSHO

### Teriakan Darurat Spontan di Tempat Kerja:
- *「混ぜるな！塩素ガスが出るぞ！窓を開けろ！」* (*Mazeru na! Enso gasu ga deru zo! Mado wo akero!* — Jangan dicampur! Gas klorin keluar! Buka jendela!)
- *「足元注意！剥離剤塗布中、進入禁止！」* (*Ashimoto chuui! Hakurizai tofuchuu, shinnyuu kinshi!* — Awas terpeleset! Cairan pengupas wax sedang dioleskan, dilarang masuk!)
- *「ポリッシャー停止！コードを引っかけた！」* (*Porisshaa teishi! Koudo wo hikkaketa!* — Hentikan polisher! Kabel tersangkut!)

### Formula Point-and-Call (指差し呼称):
1. **Pengecekan Pengenceran Bahan Kimia:** *「希釈倍率、50倍、ヨシ！」*
2. **Pengecekan Kabel Mesin Polisher:** *「電源コード、肩掛け、巻き込みなし、ヨシ！」*
3. **Pengecekan Pengunci Tangga Lipat:** *「脚立止め金具、ロック確認、ヨシ！」*
4. **Pengecekan Papan Peringatan Lantai Basah:** *「足元注意看板、設置完了、ヨシ！」*

---

## 6. BANK SOAL UJIAN CBT PEARSON VUE RESMI

### Contoh Soal Ujian Teori (学科試験):
> **Soal 1:** 塩素系漂白剤と酸性洗剤の取り扱いについて、最も適切なものを１つ選びなさい。  
> １. 混ぜて使用すると洗浄力が高くなる。  
> ２. 混ぜると有害な塩素ガスが発生して危険である。  
> ３. 混ぜても特に問題はない。  
> ４. 交互に塗布すれば安全である。  
> **Kunci Jawaban:** **2** (*Mazeru na Kiken* — Menghasilkan gas klorin beracun mematikan).

> **Soal 2:** 大理石（天然石材）の床面清掃に使用する洗剤として、最も適切なものを１つ選びなさい。  
> １. 強酸性洗剤  
> ２. 中性洗剤  
> ３. 研磨剤入り酸性洗剤  
> ４. 塩素系漂白剤  
> **Kunci Jawaban:** **2** (Batu marmer bereaksi larut rusak terhadap zat asam, sehingga wajib menggunakan deterjen netral pH 7).

### Contoh Soal Ujian Praktik On-Screen (実技試験):
> **Soal 1:** 画面の写真を見て、床面の古いワックスを剥離する際に使用するポリッシャーのパッドとして、正しい色を選びなさい。  
> A. 白（White）  
> B. 赤（Red）  
> C. 黒（Black）  
> D. 青（Blue）  
> **Kunci Jawaban:** **C** (Pad hitam adalah pad abrasif terkasar untuk pengupasan lapisan wax lama).
`;

fs.writeFileSync(path.join(sswDir, "SSW-02-BUILDING-CLEANING-SYLLABUS.md"), ssw02Content, "utf8");
console.log("SSW-02 written successfully!");

// ==========================================
// SSW-03: SOKEIZAI (TOOLING & CASTING)
// ==========================================
const ssw03Content = `# SILABUS KEJURUAN RESMI NUGGET NIHONGO · SEKTOR 03: SOKEIZAI (MACHINE PARTS, CASTING & TOOLING / PENGOLAHAN LOGAM DASAR)
**Kode Sektor:** \`SSW-MFG-01\` · **Versi:** v2.0 (Corpus v30 Canonical Revision)  
**Status:** AUTHORITATIVE & EXHAUSTIVE SECTOR SYLLABUS  
**Kementerian Pembina:** Kementerian Ekonomi, Perdagangan dan Industri Jepang (METI / 経済産業省)  
**Badan Pelaksana Uji:** Organisasi SDM Manufaktur Internasional (JAIM / 一般社団法人工業製品製造技能人材機構) & Prometric  
**Dasar Kurasi Primer:**
- \`reference-books/ssw/09_seizou_manufacturing/Manufacturing_Machining_Metal_Textbook_JA.pdf\` (169 halaman) & \`reference-books/ssw/09_seizou_manufacturing/Manufacturing_Machining_Metal_Textbook_ID.pdf\`
- \`reference-books/ssw/09_seizou_manufacturing/Manufacturing_Surface_Treatment_Textbook_JA.pdf\` (207 halaman) & \`reference-books/ssw/09_seizou_manufacturing/Manufacturing_Surface_Treatment_Textbook_ID.pdf\`
- \`reference-books/ssw/09_seizou_manufacturing/Manufacturing_Machining_Sample_Exam_JA.pdf\` & \`reference-books/ssw/09_seizou_manufacturing/Manufacturing_Surface_Treatment_Sample_Exam_JA.pdf\`
- Standar Integrasi 17 Divisi Operasional JAIM (JAIM 2024 [VS-40])
**Landasan Teoretis & Empiris:**
- Needs Analysis & Technical Lexicon (Nation & Hwang 1995 [VS-09]; Chung & Nation 2003 [VS-10])
- Cross-Cultural Communication in Manufacturing Floors & HOU-REN-SO (Mustaqim & Priventa 2026 [VS-31]; Supriatnaningsih et al. 2024 [VS-33])
- Geminate Acoustic Precision in High-Noise Factory Gemba (Husna & Febriyanti 2022 [EA-25])
- Industrial Safety Standards & Shiteki Koshou (JNIOSH 2020 [VS-39]; JAIM 2024 [VS-40])

---

## 1. SPESIFIKASI UJIAN RESMI PROMETRIC CBT (STANDAR JAIM / METI)

Kandidat visa *Tokutei Ginou 1-gō* bidang Manufaktur Sokeizai menempuh ujian Computer-Based Testing (CBT) dengan spesifikasi regulasi resmi:

\`\`\`
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                              PROMETRIC CBT SOKEIZAI & MANUFACTURING EXAM MATRIX                        │
├─────────────────────────┬────────────────────────────────────────┬─────────────┬───────────┬───────────┤
│ Komponen Ujian          │ Cakupan Ranah Pengujian                │ Jumlah Soal │ Durasi    │ Ambang    │
├─────────────────────────┼────────────────────────────────────────┼─────────────┼───────────┼───────────┤
│ 1. Ujian Teori          │ Keselamatan K3 pabrik, gambar teknik   │ 30 Soal     │ 80 Menit  │ $\\ge 65\\%$│
│    (学科試験 - Gakka)   │ JIS, material logam, proses pengecoran,│ (Format     │ (Total    │ (20 / 30) │
│                         │ penempaan, press stamping, perlakuan   │  True/False │  Alokasi  │           │
│                         │ panas, dan kontrol kualitas 5S         │  ○× CBT)    │  Gakka &  │           │
├─────────────────────────┼────────────────────────────────────────┼─────────────┤  Jitsugi) ├───────────┤
│ 2. Ujian Praktik Layar  │ Pembacaan gambar kerja, toleransi      │ 10 Soal     │           │ $\\ge 60\\%$│
│    (実技試験 - Jitsugi) │ mikrometer/jangka sorong, identifikasi │ (Simulasi   │           │ (6 / 10)  │
│                         │ cacat coran, urutan ganti cetakan jig  │  Visual CBT)│           │           │
└─────────────────────────┴────────────────────────────────────────┴─────────────┴───────────┴───────────┘
\`\`\`

> **Ketentuan Kelulusan Ganda:** Peserta wajib lulus **KEDUA-DUANYA** (minimal 20 benar pada Teori dan minimal 6 benar pada Praktik) dalam satu sesi ujian 80 menit.

---

## 2. JALUR OPERASIONAL SUB-BIDANG SOKEIZAI (17 DIVISI JAIM)

Industri Sokeizai (素形材) berfokus pada pembentukan komponen logam mentah melalui panas dan tekanan:
1. **Pengecoran Logam (鋳造 - Chuuzou):** Pengecoran pasir (*sunagata*), pengecoran cetakan logam gravity, die casting aluminium suhu tinggi (*daikasuto*).
2. **Penempaan Logam (鍛造 - Tanzou):** Penempaan panas (*nettan tanzou* > 1.000°C) dan penempaan dingin (*reikan tanzou*) untuk komponen berkekuatan mekanik tinggi (crankshaft, connecting rod).
3. **Pengepresan Logam (金属プレス加工 - Kinzoku Puresu):** Pemotongan (*shearing*), pembengkokan (*bending*), penarikan dalam (*deep drawing*) menggunakan mesin hydraulic/mechanical press ribuan ton.
4. **Perlakuan Panas Logam (熱処理 - Netsushori):** Quenching (*yakiire*), tempering (*yaki-modoshi*), annealing (*yaki-namashi*), hardening permukaan.

---

## 3. MODUL PEMBELAJARAN KURIKULUM (PEDAGOGICAL MODULES)

### MODUL 1: MATERIAL LOGAM & DASAR METALURGI (金属材料と熱処理)
- **Topik 1.1: Sifat Fisik & Karakteristik Mekanik Logam Industri:**
  - **Topik 1.1.1: Klasifikasi Baja Karbon & Paduan Non-Ferrous:** Karakteristik baja karbon (*tansokou* SS400, S45C), besi cor kelabu (*nezu-chutetsu* FC200), paduan aluminium (*arumi goukin*), dan tembaga.
  - **Topik 1.1.2: Parameter Kekuatan Mekanik & Deformasi:** Konsep kekerasan (*koudo* Rockwell/Brinell), kekuatan tarik (*hippari tsuyosa*), keuletan (*dansei*), kegetasan (*zeisei*), dan kelelahan siklik logam (*kinzoku hirou*).
- **Topik 1.2: Metalurgi Perlakuan Panas (熱処理 - Netsushori):**
  - **Topik 1.2.1: Quenching Pendinginan Cepat (焼入れ - Yakiire):** Pemanasan melampaui titik austenit disusul pendinginan mendadak dalam air/oli guna membentuk martensit keras.
  - **Topik 1.2.2: Tempering & Annealing Penstabil Struktur (焼戻し・焼なまし):** Pemanasan kembali suhu terkontrol (*yakimodoshi*) untuk mengeliminasi kerapuhan internal serta meningkatkan ketangguhan impak.

---

### MODUL 2: PROSES PENGECORAN & DIE CASTING (鋳造・ダイカスト)
- **Topik 2.1: Aliran Logam Cair & Sistem Cetakan:**
  - **Topik 2.1.1: Peleburan Tungku Induksi & Penuangan Ladel:** Pengoperasian tungku induksi listrik (*youkai-ro*), pengukuran pirometer suhu leleh 1.400°C–1.500°C, dan penuangan ladle (*yutsugi*).
  - **Topik 2.1.2: Dinamika Saluran Tuang & Penampung (Gate & Yudamari):** Pengaturan laju aliran cairan logam (*yunagare*) untuk mencegah turbulensi dan penjebakan gas atmosferik.
- **Topik 2.2: Deteksi & Eliminasi Cacat Pengecoran (鋳造欠陥):**
  - **Topik 2.2.1: Rongga Udara & Gas Blowhole (巣・ブローホール):** Identifikasi lubang porositas gas internal akibat kelembapan pasir cetak atau deoksidasi kurang sempurna.
  - **Topik 2.2.2: Salah Alir & Retak Termal (湯回り不良・熱割れ):** Analisis kegagalan pengisian logam cair sebelum membeku (*misrun*) dan retak pendinginan tidak merata.

---

### MODUL 3: STAMPING PRESS & PENGOLAHAN PELAT LOGAM (プレス加工)
- **Topik 3.1: Mekanisme Cetakan Presisi Mesin Press (金型 - Kanagata):**
  - **Topik 3.1.1: Konfigurasi Punch Atas & Die Bawah (上型・下型):** Pemasangan cetakan bergerak pada ram slide dan cetakan tetap pada bolster plate mesin press mekanik/hidrolik.
  - **Topik 3.1.2: Kalibrasi Celah Potong (クリアランス - Clearance):** Dampak celah antara punch dan die; celah terlalu sempit mempercepat keausan mata pisau, celah terlalu longgar memicu serpihan tajam (*burr / bari*).
- **Topik 3.2: Proses Pemotongan & Pembentukan Dingin:**
  - **Topik 3.2.1: Operasi Punching, Bending & Deep Drawing:** Teknik pelubangan (*uchinuki*), tekukan pelat V (*V-mage*), dan penarikan mangkok silinder (*shiborikakou*).
  - **Topik 3.2.2: Pembersihan Geram Tajam (バリ取り - Baritori):** Prosedur kikir manual, tumbling abrasif, dan deburring roda gerinda demi mencegah luka sayat tajam.

---

### MODUL 4: K3 INDUSTRI LOGAM BERAT & PANEL PENGENDALI (安全衛生と操作盤)
- **Topik 4.1: Pencegahan Bencana Terjepit & Terpotong (挟まれ・巻き込まれ):**
  - **Topik 4.1.1: Sistem Proteksi Tirai Cahaya & Tombol Dua Tangan:** Verifikasi tirai sinar inframerah (*hikari-sen anzen souchi*) dan interlock tombol tekan serentak (*ryoute-oushi botan*) sebelum ram turun.
  - **Topik 4.1.2: Penanganan Macet Cetakan (金型かみ込み):** Larangan keras merogohkan tangan ke ruang cetakan tanpa mematikan sakelar utama dan memasang balok penyangga pengaman (*safety block*).
- **Topik 4.2: Perlindungan dari Logam Cair Panas & Percikan:**
  - **Topik 4.2.1: Spesifikasi APD Tahan Api Pengecoran:** Pemakaian pelindung wajah polikarbonat (*feisu shiirudo*), jaket kulit panjang anti-percikan, dan sepatu boot sol baja bertutup pelindung metatarsal.
- **Topik 4.3: HOU-REN-SO Saat Anomali Produksi & Directives:**
  - **Topik 4.3.1: Protokol HOU-REN-SO Kerusakan Cetakan:** Pelaporan seketika: *「班長、金型にかみ込みが発生しました！非常停止をかけてラインを止めました。確認をお願いします！」*

---

## 4. KOSAKATA TEKNIS LAYER 2 (JAIM OFFICIAL SOKEIZAI LEXICON)

| No | Kanji | Kana | Romaji | Indonesian Gloss | High-Stakes Risk Category |
|---|---|---|---|---|---|
| 1 | 鋳造 | ちゅうぞう | *chuuzou* | Proses pengecoran peleburan logam | Molten Metal Splash Hazard |
| 2 | 金型 | かながた | *kanagata* | Cetakan baja mesin press / die casting | Crush / Amputation Hazard |
| 3 | 焼入れ | やきいれ | *yakiire* | Proses quenching pengerasan logam cepat | Thermal Burn / Explosion |
| 4 | 溶解炉 | ようかいろ | *youkai-ro* | Tungku peleburan logam cair industri | Extreme Heat / Toxic Fumes |
| 5 | バリ取り | ばりとり | *baritori* | Pembersihan geram tajam sisa pemotongan | Severe Laceration Hazard |
| 6 | 湯つぎ | ゆつぎ | *yutsugi* | Penuangan logam cair dari ladle ke cetakan | Molten Metal Burn Hazard |
| 7 | 巣（鋳巣） | す（ちゅうす） | *su (chuusu)* | Rongga cacat udara/gas dalam coran logam | Structural Rupture Defect |
| 8 | クリアランス | くりあらんす | *kuriaransu* | Celah jarak presisi antara punch dan die | Tool Jamming / Part Fracture |
| 9 | 非常停止ボタン | ひじょうていしぼたん | *hijou teishi botan* | Tombol darurat pemutus daya seketika | Life-Critical Escalation |
| 10 | 光線安全装置 | こうせんあんぜんそうち | *kousen anzen souchi* | Sensor tirai cahaya penghenti mesin otomatis | Maiming / Bypass Violation |
| 11 | 鍛造 | たんぞう | *tanzou* | Penempaan logam menggunakan gaya tekan | Flying Debris Hazard |
| 12 | 焼戻し | やきもどし | *yakimodoshi* | Proses tempering penstabil keuletan logam | Heat Exposure Hazard |
| 13 | プレスブレーキ | ぷれすぶれーき | *puresu bureeki* | Mesin tekuk pelat logam bertekanan tinggi | Finger Crushing Hazard |
| 14 | かみ込み | かみこみ | *kamikomi* | Kondisi part logam terjepit macet di cetakan | Machine Jam / Recoil |
| 15 | フェイスシールド | ふぇいすしーるど | *feisu shiirudo* | Pelindung seluruh wajah tahan panas logam | Facial Burn Blindness |
| 16 | 湯道 | ゆみち | *yumichi* | Saluran masuk pengisian logam cair pada cetakan | Solidification Obstruction |
| 17 | 砂型 | すながた | *sunagata* | Cetakan pasir untuk pengecoran logam besi/baja | Mold Collapse Hazard |
| 18 | 焼なまし | やきなまし | *yakinamashi* | Proses annealing pelunakan struktur mikro logam | Thermal Gradient Stress |
| 19 | 炭素鋼 | たんそこう | *tansokou* | Baja karbon paduan besi dan karbon | Material Failure if Wrong Grade |
| 20 | 引張強さ | ひっぱりつよさ | *hippari tsuyosa* | Kekuatan batas tarik maksimal material logam | Catastrophic Rupture |
| 21 | 硬さ試験 | かたさしけん | *katasa shiken* | Pengujian kekerasan permukaan (Rockwell/Vickers) | Quality Defect Outflow |
| 22 | マイクロメーター | まいくろめーたー | *maikuromeetaa* | Alat ukur presisi ketebalan hingga 0.001 mm | Dimension Measurement Error |
| 23 | ノギス | のぎす | *nogisu* | Jangka sorong pengukur diameter luar dan dalam | Dimensional Tolerance Error |
| 24 | 寸法公差 | すんぽうこうさ | *sumpou kousa* | Batas toleransi penyimpangan ukuran gambar JIS | Out-of-Spec Rejection |
| 25 | 両手押しボタン | りょうておしぼたん | *ryoute oshi botan* | Tombol kontrol dua tangan pengaman mesin press | Interlock Tampering Hazard |
| 26 | セーフティブロック | せーふてぃぶろっく | *seefutii burokku* | Balok penopang mekanis cetakan ram mesin press | Die Fall Amputation |
| 27 | 研削といし | けんさくといし | *kensaku toishi* | Batu gerinda putar penghalus logam | Wheel Burst Projectile Hazard |
| 28 | 切削油 | せっさくゆ | *sessakuyu* | Cairan pendingin pelumas pemotongan logam | Slip Hazard & Skin Dermatitis |
| 29 | 切粉 | きりこ | *kiriko* | Serpihan tatal gram sisa pemotongan logam | Eye Penetration & Laceration |
| 30 | 集塵機 | しゅうじんき | *shuujinki* | Mesin penghisap debu dan serbuk logam | Dust Deflagration Hazard |
| 31 | 保護具完全着用 | ほごぐかんぜんちゃくよう | *hogogu kanzen chakuyou* | Kewajiban memakai APD lengkap standar pabrik | Statutory Safety Violation |
| 32 | 皮手袋 | かわてぶくろ | *kawatebukuro* | Sarung tangan kulit tebal anti-panas pengecoran | Heat Burn Prevention |
| 33 | 安全靴 | あんぜんぐつ | *anzengutsu* | Sepatu keselamatan berujung pelat baja | Heavy Drop Crush Injury |
| 34 | 原点復帰 | げんてんふっき | *genten fukki* | Prosedur pengembalian mesin ke koordinat nol | Calibration Crash Hazard |
| 35 | チョコ停 | ちょこてい | *chokotei* | Penghentian mesin sesaat akibat sensor terhalang | Unplanned Intervention Hazard |
| 36 | ５Ｓ活動 | ごえすかつどう | *goesukatsudou* | Penerapan Seiri, Seiton, Seiso, Seiketsu, Shitsuke | Fundamental Gemba Quality |

---

## 5. DIRECTIVES K3 DARURAT & FORMULA YUBISASHI KOSHO

### Teriakan Darurat Spontan di Tempat Kerja:
- *「危ない！手を引っ込めろ！非常停止！」* (*Abunai! Te wo hikkomero! Hijou teishi!* — Bahaya! Tarik tanganmu! Emergency stop!)
- *「金型降下中！手を入れるな！」* (*Kanagata koukachuu! Te wo ireru na!* — Cetakan sedang turun! Jangan masukkan tangan!)
- *「湯漏れだ！溶解炉から離れろ！」* (*Yumore da! Youkairo kara hanarero!* — Logam cair bocor! Menjauh dari tungku!)

### Formula Point-and-Call (指差し呼称):
1. **Pengecekan Tirai Cahaya Sensor:** *「光線安全装置、作動確認、ヨシ！」*
2. **Pengecekan Balok Penyangga Cetakan:** *「セーフティブロック、挿入完了、ヨシ！」*
3. **Pengecekan Suhu Tungku Peleburan:** *「溶解炉温度、1450度、ヨシ！」*
4. **Pengecekan Dimensi Gambar Kerja:** *「寸法公差、公差内クリア、ヨシ！」*

---

## 6. BANK SOAL UJIAN CBT JAIM RESMI

### Contoh Soal Ujian Teori (学科試験 ○×):
> **Soal 1:** プレス機械の金型調整作業を行うときは、主電動機（モーター）を停止させ、セーフティブロックを金型間に確実にセットしなければならない。  
> **Kunci Jawaban:** **○ (Benar)** (Wajib mematikan motor utama dan memasang safety block mekanis sebelum menyetel cetakan mesin press).

> **Soal 2:** 焼入れ（やきいれ）を行った鋼材は、硬さが増加するとともに粘り強さ（靭性）も向上するため、そのまま最終部品として使用される。  
> **Kunci Jawaban:** **× (Salah)** (Baja pasca-quenching menjadi sangat keras tetapi rapuh/getas, sehingga wajib melalui proses tempering/yakimodoshi untuk memulihkan keuletan).

### Contoh Soal Ujian Praktik On-Screen (実技試験):
> **Soal 1:** 画面のマイクロメーターの目盛りを読み取り、正しい測定値を選びなさい（スリーブ目盛り：15.5 mm、シンブル目盛り：28）。  
> A. 15.28 mm  
> B. 15.78 mm  
> C. 15.58 mm  
> D. 16.28 mm  
> **Kunci Jawaban:** **B** ($15.5\text{ mm} + 0.28\text{ mm} = 15.78\text{ mm}$).
`;

fs.writeFileSync(path.join(sswDir, "SSW-03-SOKEIZAI-TOOLING-SYLLABUS.md"), ssw03Content, "utf8");
console.log("SSW-03 written successfully!");

// ==========================================
// SSW-04: INDUSTRIAL MACHINERY
// ==========================================
const ssw04Content = `# SILABUS KEJURUAN RESMI NUGGET NIHONGO · SEKTOR 04: INDUSTRIAL MACHINERY MANUFACTURING (INDUSTRI PERMESINAN)
**Kode Sektor:** \`SSW-MFG-02\` · **Versi:** v2.0 (Corpus v30 Canonical Revision)  
**Status:** AUTHORITATIVE & EXHAUSTIVE SECTOR SYLLABUS  
**Kementerian Pembina:** Kementerian Ekonomi, Perdagangan dan Industri Jepang (METI / 経済産業省)  
**Badan Pelaksana Uji:** Organisasi SDM Manufaktur Internasional (JAIM / 一般社団法人工業製品製造技能人材機構) & Prometric  
**Dasar Kurasi Primer:**
- \`reference-books/ssw/09_seizou_manufacturing/Manufacturing_Machining_Metal_Textbook_JA.pdf\` (169 halaman) & \`reference-books/ssw/09_seizou_manufacturing/Manufacturing_Machining_Metal_Textbook_ID.pdf\`
- \`reference-books/ssw/09_seizou_manufacturing/Manufacturing_Machining_Sample_Exam_JA.pdf\` (Bank Soal Ujian Resmi Permesinan JAIM)
- Standar Integrasi 17 Divisi Operasional JAIM (JAIM 2024 [VS-40])
**Landasan Teoretis & Empiris:**
- Needs Analysis & Technical Lexicon (Nation & Hwang 1995 [VS-09]; Chung & Nation 2003 [VS-10])
- Cross-Cultural Communication in Manufacturing Floors & HOU-REN-SO (Mustaqim & Priventa 2026 [VS-31]; Supriatnaningsih et al. 2024 [VS-33])
- Geminate Acoustic Precision in High-Noise Factory Gemba (Husna & Febriyanti 2022 [EA-25])
- Industrial Safety Standards & Shiteki Koshou (JNIOSH 2020 [VS-39]; JAIM 2024 [VS-40])

---

## 1. SPESIFIKASI UJIAN RESMI PROMETRIC CBT (STANDAR JAIM / METI)

Kandidat visa *Tokutei Ginou 1-gō* bidang Industri Permesinan menempuh ujian Computer-Based Testing (CBT) dengan spesifikasi regulasi resmi:

\`\`\`
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                        PROMETRIC CBT INDUSTRIAL MACHINERY MANUFACTURING EXAM MATRIX                    │
├─────────────────────────┬────────────────────────────────────────┬─────────────┬───────────┬───────────┤
│ Komponen Ujian          │ Cakupan Ranah Pengujian                │ Jumlah Soal │ Durasi    │ Ambang    │
├─────────────────────────┼────────────────────────────────────────┼─────────────┼───────────┼───────────┤
│ 1. Ujian Teori          │ Keselamatan K3 mesin bubut/frais/CNC,  │ 30 Soal     │ 80 Menit  │ $\\ge 65\\%$│
│    (学科試験 - Gakka)   │ pembacaan gambar kerja JIS, perkakas   │ (Format     │ (Total    │ (20 / 30) │
│                         │ potong karbida, toleransi mikrometer   │  True/False │  Alokasi  │           │
│                         │ dan kontrol kualitas 5S bengkel mesin  │  ○× CBT)    │  Gakka &  │           │
├─────────────────────────┼────────────────────────────────────────┼─────────────┤  Jitsugi) ├───────────┤
│ 2. Ujian Praktik Layar  │ Identifikasi cacat pembubutan, urutan  │ 10 Soal     │           │ $\\ge 60\\%$│
│    (実技試験 - Jitsugi) │ kalibrasi dial gauge, pemilihan cairan │ (Simulasi   │           │ (6 / 10)  │
│                         │ pendingin, dan perakitan komponen unit │  Visual CBT)│           │           │
└─────────────────────────┴────────────────────────────────────────┴─────────────┴───────────┴───────────┘
\`\`\`

> **Ketentuan Kelulusan Ganda:** Peserta wajib lulus **KEDUA-DUANYA** (minimal 20 benar pada Teori dan minimal 6 benar pada Praktik) dalam satu sesi ujian 80 menit.

---

## 2. JALUR OPERASIONAL BIDANG INDUSTRI PERMESINAN

Cakupan permesinan manufaktur industri terbagi atas 4 domain teknis:
1. **Pemesinan Bubut (普通旋盤・NC旋盤 - Lathe & CNC Turning):** Pembubutan silinder luar, pembubutan muka (*facing*), pengeboran senter, ulir ulir baut, pencekaman chuck 3-jaw/4-jaw.
2. **Pemesinan Frais (フライス盤・マシニングセンタ - Milling & Machining Center):** Pengefraisan bidang datar (*face milling*), pembuatan alur pasak (*end milling*), pembuatan kantung (*pocketing*), pergerakan koordinat sumbu X-Y-Z.
3. **Pemesinan Gerinda Presisi (研削盤 - Surface & Cylindrical Grinding):** Penggerindaan bidang datar, penggerindaan silindris luar/dalam, penyeimbangan batu gerinda (*balancing*), kecepatan putar perifer.
4. **Perakitan & Penyetelan Mesin Industri (機械組立て・調整):** Perakitan poros transmisi, bantalan gelinding (*bearing*), roda gigi (*gear*), pengukuran celah backlash, penyesuaian kelurusan poros (*shaft alignment*).

---

## 3. MODUL PEMBELAJARAN KURIKULUM (PEDAGOGICAL MODULES)

### MODUL 1: TEKNIK PEMESINAN BUBUT & PENGUKURAN (旋盤加工と測定)
- **Topik 1.1: Operasi Mesin Bubut Konvensional & CNC:**
  - **Topik 1.1.1: Pencekaman Benda Kerja & Chuck Spindel:** Prosedur pencekaman pada chuck 3-rahang gerak serempak (*san-tsume cha-kku*), pemusatan dial indicator, dan larangan meninggalkan kunci chuck menancap di mesin!
  - **Topik 1.1.2: Geometri Pahat Potong & Kecepatan Sayat:** Sudut potong pahat karbida (*choukou baito*), kecepatan putar spindel ($N = \frac{1000 \cdot V}{\pi \cdot D}$), laju pemakanan (*feed*), dan kedalaman potong (*kirikomi*).
- **Topik 1.2: Metrologi Presisi Dimensi Benda Kerja:**
  - **Topik 1.2.1: Pengukuran Mikrometer Luar & Kalibrasi Nol:** Prosedur membersihkan anvil dan spindle, menghentikan putaran ratchet 3 klik, dan pembacaan skala nonius 0.01 mm.
  - **Topik 1.2.2: Pemeriksaan Kelurusan Menggunakan Dial Gauge:** Pemasangan dudukan magnetik (*magunetiku stando*), penyetelan titik sentuh spindel, dan pengukuran runout poros radial/aksial.

---

### MODUL 2: TEKNIK PEMESINAN FRAIS & PENGGERINDAAN (フライス・研削)
- **Topik 2.1: Operasi Mesin Frais Datar & Endmill:**
  - **Topik 2.1.1: Pemilihan Face Mill & End Mill Karbida:** Pemotongan bidang muka balok besi, pemakanan searah (*climb milling*) vs berlawanan (*conventional milling*), dan pencegahan getaran chatter (*bibiri*).
  - **Topik 2.1.2: Pengefraisan Alur Pasak & Ragum Presisi:** Prosedur penjepitan pada ragum presisi mesin (*kikai manriki*), pengetukan benda kerja dengan palu tembaga hingga merapat ke paralel blok.
- **Topik 2.2: Penggerindaan Presisi & K3 Batu Gerinda:**
  - **Topik 2.2.1: Pemeriksaan Suara Ketukan Batu Gerinda (打音検査):** Uji resonansi ketukan palu kayu pada roda gerinda (*toishi*) untuk mendeteksi retakan internal sebelum dipasang ke spindel.
  - **Topik 2.2.2: Pembentukan Ulang Mata Gerinda (ドレッシング - Dressing):** Penggunaan mata intan dresser untuk membuka kembali pori-pori abrasif yang tertutup serpihan logam (*me-tsumari*).

---

### MODUL 3: ELEMEN MESIN, PERAKITAN & TRANSMISI (機械要素と組立)
- **Topik 3.1: Pemasangan Bantalan Gelinding & Roda Gigi:**
  - **Topik 3.1.1: Pemasangan Bearing Poros (ベアリング組込み):** Pemasangan menggunakan alat press hidrolik atau pemanasan induksi heater; larangan memukul lingkar cincin luar saat memasukkan ke poros!
  - **Topik 3.1.2: Penyetelan Jarak Antargigi (バックラッシ - Backlash):** Pengukuran celah renggang roda gigi menggunakan kawat timah atau dial gauge guna mencegah keausan gigi dan kebisingan abnormal.
- **Topik 3.2: Sistem Pelumasan & Pencegahan Kebocoran Hidrolik:**
  - **Topik 3.2.1: Pemilihan Oli Pelumas Gearbox & Gemuk (グリース):** Penggantian oli pelumas berkala ISO VG, pemeriksaan indikator level oli intip (*yuuryoukei*), dan pembersihan saringan magnetik.
  - **Topik 3.2.2: Pemasangan O-Ring & Perapat Seal Oli:** Pemasangan seal karet perapat tanpa terpelintir untuk mencegah kebocoran fluida bertekanan tinggi.

---

### MODUL 4: K3 BENGKEL MESIN & MANAJEMEN SERPIHAN LOGAM (切削安全とK3)
- **Topik 4.1: Pencegahan Bahaya Terlilit Putaran Mesin (巻き込まれ防止):**
  - **Topik 4.1.1: Larangan Penggunaan Sarung Tangan Kain (軍手禁止):** Larangan mutlak memakai sarung tangan rajut saat mengoperasikan mesin bubut, bor, dan frais yang berputar; serat benang mudah tersangkut dan meremukkan jari.
  - **Topik 4.1.2: Kacamata Keselamatan & Penutup Serpihan (切粉カバー):** Kewajiban memakai kacamata pelindung mata dari lontaran tatal panas (*kiriko*) dan serpihan cairan pendingin.
- **Topik 4.2: Pembersihan Tatal Logam Menggunakan Kait Khusus:**
  - **Topik 4.2.1: Prosedur Pengambilan Tatal Memanjang:** Larangan keras mengambil tatal melilit dengan tangan kosong; wajib menggunakan pengait logam tatal berpegangan panjang.
- **Topik 4.3: HOU-REN-SO Saat Kerusakan Pahat & Emergency Stop:**
  - **Topik 4.3.1: Pelaporan Pahat Patah & Pemutusan Arus Darurat:** Prosedur memencet E-Stop saat terdengar suara getaran abnormal dan pelaporan kepada supervisor shift.

---

## 4. KOSAKATA TEKNIS LAYER 2 (JAIM OFFICIAL INDUSTRIAL MACHINERY LEXICON)

| No | Kanji | Kana | Romaji | Indonesian Gloss | High-Stakes Risk Category |
|---|---|---|---|---|---|
| 1 | 旋盤 | せんばん | *semban* | Mesin bubut pemotong logam silindris | Rotating Spindle Entanglement |
| 2 | フライス盤 | ふらいすばん | *furaisuban* | Mesin frais pembuat bidang datar dan alur | High-Speed Milling Blade Hazard |
| 3 | 切粉 | きりこ | *kiriko* | Serpihan tatal gram sisa pemotongan mesin | Eye Injury & Severe Laceration |
| 4 | 軍手禁止 | ぐんてきんし | *gunte kinshi* | Larangan mutlak memakai sarung tangan kain | Fatal Rotating Entanglement |
| 5 | チャックハンドル | ちゃっくはんどる | *chakku handoru* | Kunci pengencang rahang pencekam bubut | Flying Projectile Hazard |
| 6 | 非常停止ボタン | ひじょうていしぼたん | *hijou teishi botan* | Tombol darurat pemutus arus listrik mesin | Life-Critical Escalation |
| 7 | 切削油 | せっさくゆ | *sessakuyu* | Cairan pendingin dan pelumas pemotongan | Slip Hazard & Skin Infection |
| 8 | バックラッシ | ばっくらっし | *bakkurasshi* | Celah renggang antargigi roda transmisi | Gear Breakage & Noise |
| 9 | ベアリング | べありんぐ | *bearingu* | Bantalan gelinding penumpu poros putar | Overheating & Shaft Seizure |
| 10 | ダイヤルゲージ | だいやるげーじ | *daiyaru geeji* | Alat ukur dial komparator penyimpangan poros | Precision Calibration Error |
| 11 | マイクロメーター | まいくろめーたー | *maikuromeetaa* | Alat ukur ketebalan presisi 0.01 mm | Dimension Measurement Error |
| 12 | ノギス | のぎす | *nogisu* | Jangka sorong pengukur diameter dalam/luar | Tolerance Violation |
| 13 | 研削といし | けんさくといし | *kensaku toishi* | Batu gerinda putar pembersih dan penghalus | Wheel Shatter Projectile |
| 14 | 打音検査 | だおんけんさ | *daon kensa* | Uji resonansi bunyi ketukan palu roda gerinda | Undetected Crack Defect |
| 15 | 保護メガネ | ほごめがね | *hogo megane* | Kacamata pelindung percikan tatal dan cairan | Blindness Prevention |
| 16 | エンドミル | えんどみる | *endomiru* | Pisau frais jari pembuat alur dan kantung | Cutting Tool Fracture |
| 17 | バイト | ばいと | *baito* | Pahat bubut pemotong baja berkepala karbida | Chip Breakage Hazard |
| 18 | 心出し | しんだし | *shindashi* | Prosedur pelurusan sumbu pusat benda kerja | Eccentric Rotation Hazard |
| 19 | 主軸回転数 | しゅじくかいてんすう | *shujiku kaitensuu* | Kecepatan putar spindel utama (rpm) | Over-speed Tool Failure |
| 20 | 送り速度 | おくりそくど | *okuri sokudo* | Kecepatan laju gerak pemakanan pahat | Tool Overload Jamming |
| 21 | 切り込み量 | きりこみりょう | *kirikomiryou* | Tebal kedalaman penetrasi sayatan pisau | Excessive Tool Deflection |
| 22 | ビビリ振動 | びびりしんどう | *bibiri shindou* | Getaran resonansi berisik saat pemesinan | Workpiece Surface Defect |
| 23 | 面粗さ | めんあらさ | *men'arasa* | Tingkat kekasaran permukaan bidang hasil potong | Spec Outflow Rejection |
| 24 | 機械万力 | きかいまんりき | *kikai manriki* | Ragum penjepit benda kerja pada meja frais | Clamp Loosening Ejection |
| 25 | 平行台 | へいこうだい | *heikoudai* | Balok paralel presisi penopang bawah ragum | Tilting Workpiece Error |
| 26 | ドレッサー | どれっさー | *doressaa* | Alat intan pembuka pori-pori batu gerinda | Abrasive Particle Dispersion |
| 27 | 目づまり | めづまり | *medzumari* | Kondisi pori batu gerinda tertutup logam halus | Thermal Burn & Glazing |
| 28 | オイルシール | おいるしーる | *oirushiiru* | Karet cincin penahan kebocoran oli pelumas | Lubricant Leakage Hazard |
| 29 | キー溝 | きーみぞ | *kiimizo* | Alur pasak pengunci roda gigi pada poros | Shearing Stress Fracture |
| 30 | 芯押し台 | しんおしだい | *shin'oshidai* | Kepala lepas penahan ujung benda kerja panjang | Workpiece Whip Ejection |
| 31 | 面取り | めんとり | *mentori* | Pembuatan sudut chamfer penghilang tepi tajam | Part Handling Laceration |
| 32 | ねじ切り | ねじきり | *nejikiri* | Pembuatan ulir baut luar/dalam pada bubut | Thread Mismatch Error |
| 33 | 潤滑油給油 | じゅんかつゆきゅうゆ | *junkatsuyu kyuuyu* | Pelumasan gemuk oli harian sebelum operasi | Mechanical Seizure Hazard |
| 34 | 切粉かぎ棒 | きりこかぎぼう | *kiriko kagibou* | Tongkat berkait penarik tatal mesin bubut | Hands-Free Safe Clearing |
| 35 | 試運転 | しうんてん | *shiunten* | Uji jalan mesin tanpa beban sebelum produksi | Unloaded Calibration Check |
| 36 | ５Ｓ整頓 | ごえすせいとん | *goesuseiton* | Penataan rapi perkakas potong pada raknya | Tool Clutter & Drop Risk |

---

## 5. DIRECTIVES K3 DARURAT & FORMULA YUBISASHI KOSHO

### Teriakan Darurat Spontan di Tempat Kerja:
- *「軍手を脱げ！巻き込まれるぞ！」* (*Gunte wo nuge! Makikomareru zo!* — Lepas sarung tangan kain! Kau bisa terlilit mesin!)
- *「チャックハンドルを抜け！回すな！」* (*Chakku handoru wo nuke! Mawasu na!* — Cabut kunci chuck! Jangan dinyalakan!)
- *「刃物が折れた！非常停止ボタンを押せ！」* (*Hamono ga oreta! Hijou teishi botan wo ose!* — Pahat patah! Tekan tombol emergency stop!)

### Formula Point-and-Call (指差し呼称):
1. **Pengecekan Kunci Chuck Spindel:** *「チャックハンドル、抜き取り確認、ヨシ！」*
2. **Pengecekan Sarung Tangan Operator:** *「手袋なし、素手確認、ヨシ！」*
3. **Pengecekan Kacamata Pelindung:** *「保護メガネ着用、目元保護、ヨシ！」*
4. **Pengecekan Bunyi Roda Gerinda:** *「といし打音検査、澄んだ音、亀裂なし、ヨシ！」*

---

## 6. BANK SOAL UJIAN CBT JAIM RESMI

### Contoh Soal Ujian Teori (学科試験 ○×):
> **Soal 1:** 旋盤作業をするときは、切粉による手の怪我を防ぐために、必ず厚手の軍手を着用して作業しなければならない。  
> **Kunci Jawaban:** **× (Salah)** (Dilarang keras memakai sarung tangan jenis apa pun pada mesin bubut karena risiko terlilit putaran spindel yang berujung maut).

> **Soal 2:** 外側マイクロメーターで寸法を測定するときは、シンブルを無理に回さず、ラチェットストップを２～３回空転させて測定圧を一定にする。  
> **Kunci Jawaban:** **○ (Benar)** (Ratchet stop wajib diputar 2-3 klik halus agar tekanan pengukuran seragam dan tidak merusak instrumen presisi).

### Contoh Soal Ujian Praktik On-Screen (実技試験):
> **Soal 1:** 画面の写真を見て、旋盤のチャックにワーク（工作物）を取り付けた後、主軸スイッチを入れる前に必ず確認しなければならない項目として、正しいものを選びなさい。  
> A. 切削油のタンクが空であること  
> B. チャックハンドルが確実に抜き取られていること  
> C. 軍手を両手に着用していること  
> D. エンドミルが取り付けられていること  
> **Kunci Jawaban:** **B** (Kunci chuck wajib dicabut sebelum mesin dinyalakan agar tidak terbang menjadi proyektil mematikan).
`;

fs.writeFileSync(path.join(sswDir, "SSW-04-INDUSTRIAL-MACHINERY-SYLLABUS.md"), ssw04Content, "utf8");
console.log("SSW-04 written successfully!");

// ==========================================
// SSW-05: ELECTRICAL & ELECTRONICS
// ==========================================
const ssw05Content = `# SILABUS KEJURUAN RESMI NUGGET NIHONGO · SEKTOR 05: ELECTRICAL & ELECTRONICS (ELEKTRONIKA & KELISTRIKAN)
**Kode Sektor:** \`SSW-MFG-03\` · **Versi:** v2.0 (Corpus v30 Canonical Revision)  
**Status:** AUTHORITATIVE & EXHAUSTIVE SECTOR SYLLABUS  
**Kementerian Pembina:** Kementerian Ekonomi, Perdagangan dan Industri Jepang (METI / 経済産業省)  
**Badan Pelaksana Uji:** Organisasi SDM Manufaktur Internasional (JAIM / 一般社団法人工業製品製造技能人材機構) & Prometric  
**Dasar Kurasi Primer:**
- \`reference-books/ssw/09_seizou_manufacturing/Manufacturing_Electrical_Assembly_Textbook_JA.pdf\` (198 halaman) & \`reference-books/ssw/09_seizou_manufacturing/Manufacturing_Electrical_Assembly_Textbook_ID.pdf\`
- \`reference-books/ssw/09_seizou_manufacturing/Manufacturing_Electrical_Assembly_Sample_Exam_JA.pdf\` (Bank Soal Ujian Perakitan Elektronik JAIM)
- Standar Integrasi 17 Divisi Operasional JAIM (JAIM 2024 [VS-40])
**Landasan Teoretis & Empiris:**
- Needs Analysis & Technical Lexicon (Nation & Hwang 1995 [VS-09]; Chung & Nation 2003 [VS-10])
- Cross-Cultural Communication in Manufacturing Floors & HOU-REN-SO (Mustaqim & Priventa 2026 [VS-31]; Supriatnaningsih et al. 2024 [VS-33])
- Geminate Acoustic Precision in High-Noise Factory Gemba (Husna & Febriyanti 2022 [EA-25])
- Industrial Safety Standards & Shiteki Koshou (JNIOSH 2020 [VS-39]; JAIM 2024 [VS-40])

---

## 1. SPESIFIKASI UJIAN RESMI PROMETRIC CBT (STANDAR JAIM / METI)

Kandidat visa *Tokutei Ginou 1-gō* bidang Perakitan Kelistrikan & Elektronika menempuh ujian Computer-Based Testing (CBT) dengan spesifikasi regulasi resmi:

\`\`\`
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                        PROMETRIC CBT ELECTRICAL & ELECTRONICS ASSEMBLY EXAM MATRIX                     │
├─────────────────────────┬────────────────────────────────────────┬─────────────┬───────────┬───────────┤
│ Komponen Ujian          │ Cakupan Ranah Pengujian                │ Jumlah Soal │ Durasi    │ Ambang    │
├─────────────────────────┼────────────────────────────────────────┼─────────────┼───────────┼───────────┤
│ 1. Ujian Teori          │ Pengetahuan komponen listrik R-L-C,    │ 30 Soal     │ 80 Menit  │ $\\ge 65\\%$│
│    (学科試験 - Gakka)   │ diagram sirkuit skematik, teknik solder│ (Format     │ (Total    │ (20 / 30) │
│                         │ bebas timbal, proteksi ESD, kabel krimp│  True/False │  Alokasi  │           │
│                         │ dan keselamatan K3 voltase tinggi      │  ○× CBT)    │  Gakka &  │           │
├─────────────────────────┼────────────────────────────────────────┼─────────────┤  Jitsugi) ├───────────┤
│ 2. Ujian Praktik Layar  │ Identifikasi cacat solder bridge,      │ 10 Soal     │           │ $\\ge 60\\%$│
│    (実技試験 - Jitsugi) │ polaritas kapasitor elektrolit, urutan │ (Simulasi   │           │ (6 / 10)  │
│                         │ crimping kabel, dan pembacaan tester   │  Visual CBT)│           │           │
└─────────────────────────┴────────────────────────────────────────┴─────────────┴───────────┴───────────┘
\`\`\`

> **Ketentuan Kelulusan Ganda:** Peserta wajib lulus **KEDUA-DUANYA** (minimal 20 benar pada Teori dan minimal 6 benar pada Praktik) dalam satu sesi ujian 80 menit.

---

## 2. JALUR OPERASIONAL BIDANG PERAKITAN ELEKTRONIKA & KELISTRIKAN

Ruang lingkup perakitan kelistrikan mencakup 4 keahlian inti:
1. **Perakitan Papan Sirkuit Cetak (プリント基板組立て - PCB Assembly):** Pemasangan komponen Through-Hole, penanganan komponen Surface Mount Device (SMD), inspeksi polaritas dioda dan IC.
2. **Penyolderan Presisi & Rework (はんだ付け・修正):** Penyolderan manual solder iron suhu 350°C, pemakaian kawat timah bebas timbal (*lead-free / en-furi*), penyedotan timah berlebih (*desoldering braid*).
3. **Perakitan Kabel Harness & Crimping (ワイヤーハーネス・圧着):** Pengupasan isolasi kabel (*wire stripping*), pengepresan skun terminal (*crimping / atchaku*), penyisipan konektor pin, bundling kabel ties.
4. **Inspeksi Kelistrikan & Uji Isolasi (電気検査・耐電圧試験):** Uji kontinuitas (*doutsuu kensa*), pengukuran tegangan dan arus DC/AC, uji resistansi isolasi (*megger tester*), uji ketahanan dielektrik (*hipot test*).

---

## 3. MODUL PEMBELAJARAN KURIKULUM (PEDAGOGICAL MODULES)

### MODUL 1: KOMPONEN ELEKTRONIKA & PEMBACAAN SKEMA (電子部品と回路図)
- **Topik 1.1: Identifikasi Komponen Pasif & Aktif:**
  - **Topik 1.1.1: Resistor Kode Warna & Toleransi:** Pembacaan 4–5 pita warna nilai hambatan resistor ohm, daya watt, dan resistor chip SMD kode angka.
  - **Topik 1.1.2: Kapasitor Elektrolit & Polaritas Positif-Negatif:** Peringatan polaritas pin panjang (+) vs pendek strip garis (-); bahaya kapasitor meledak jika terpasang terbalik pada PCB!
  - **Topik 1.1.3: Semikonduktor Dioda, Transistor & Sirkuit Terpadu (IC):** Orientasi takik notch pin 1 pada IC, pin anoda-katoda LED, dan transistor bipolar NPN/PNP.
- **Topik 1.2: Pembacaan Simbol & Diagram Skematik Sirkuit:**
  - **Topik 1.2.1: Simbol Kelistrikan Standar JIS C 0617:** Pembacaan relai (*relay*), sakelar kontak NO/NC, transformator, sekring (*fuse*), dan simbol pembumian (*ground /接地*).
  - **Topik 1.2.2: Alur Penelusuran Sinyal Skematik ke Jalur PCB:** Pencocokan kode referensi komponen (R1, C1, D1, U1) dengan silkscreen pada papan sirkuit fisik.

---

### MODUL 2: TEKNIK PENYOLDERAN BEBAS TIMBAL & REWORK (はんだ付け技術)
- **Topik 2.1: Karakteristik Solder Bebas Timbal (鉛フリーはんだ):**
  - **Topik 2.1.1: Suhu Ujung Solder & Fluks Terintegrasi:** Karakteristik paduan timah Sn-Ag-Cu (titik lebur 217°C), penyetelan temperatur solder iron 350°C–370°C, dan peranan fluks pembersih oksidasi.
  - **Topik 2.1.2: Bentuk Sambungan Solder Ideal (フィレット - Fillet):** Pembentukan lereng cekung berkilau (*smooth concave fillet*) yang membasahi kaki komponen dan bantalan tembaga secara sempurna.
- **Topik 2.2: Identifikasi & Penanganan Cacat Solderan:**
  - **Topik 2.2.1: Cacat Jembatan Solder & Bola Timah (はんだブリッジ・はんだボール):** Korsleting antar-kaki IC akibat timah berlebih (*bridge*); prosedur pembersihan menggunakan pita tembaga penyerap solder (*solder wick*).
  - **Topik 2.2.2: Solder Dingin & Penempelan Semu (いもはんだ・天ぷらはんだ):** Pemanasan bantalan yang kurang lama menghasilkan timah menempel bulat tanpa ikatan metalurgi intermetalik.

---

### MODUL 3: WIRING HARNESS, CRIMPING & PENGUJIAN (配線ハーネスと検査)
- **Topik 3.1: Pengupasan Kabel & Pengepresan Terminal Krimp (圧着):**
  - **Topik 3.1.1: Pengupasan Isolasi Kawat (ワイヤーストリップ):** Pemilihan lubang stripper sesuai diameter kawat AWG; larangan memotong atau melukai serat serabut kawat tembaga inti!
  - **Topik 3.1.2: Pengepresan Terminal Skun (端子圧着 - Atchaku):** Penggunaan tang krimp bersertifikasi JIS, verifikasi jendela krimp konduktor dan isolasi (*bell-mouth*), serta uji tarik kekuatan krimp (*tensile pull test*).
- **Topik 3.2: Pengujian Fungsional Kelistrikan & Uji Beban:**
  - **Topik 3.2.1: Pengukuran Multimeter Digital (テスター):** Uji kontinuitas kabel (buzzer berbunyi), pengukuran resistansi, tegangan DC 5V/12V/24V, dan arus beban.
  - **Topik 3.2.2: Uji Resistansi Isolasi & Kebocoran Arus (絶縁抵抗試験):** Penggunaan insulation tester Megger pada tegangan 500V/1000V DC; standar resistansi isolasi wajib $\ge 1\text{ M}\Omega$.

---

### MODUL 4: K3 KELISTRIKAN, PROTEKSI ESD & PANEL DAYA (電気安全とESD対策)
- **Topik 4.1: Pengendalian Muatan Statis Elektrostatik (静電気放電対策 - ESD):**
  - **Topik 4.1.1: Tali Pergelangan Anti-Statis (リストストラップ):** Kewajiban memakai wrist strap berkabel grounding terhubung resistor $1\text{ M}\Omega$ saat memegang komponen IC sensitif tegangan.
  - **Topik 4.1.2: Matras Meja & Wadah Konduktif ESD:** Penggunaan matras konduktif di atas meja kerja dan wadah kotak PCB anti-statis (*conductive tote box*).
- **Topik 4.2: Pencegahan Bencana Sengatan Listrik Industri (感電防止):**
  - **Topik 4.2.1: Prosedur Verifikasi Pemadaman Arus (検電 - Kenden):** Menguji ketiadaan tegangan menggunakan obeng tespen/detektor voltase sebelum membuka panel distribusi daya.
  - **Topik 4.2.2: Protokol Lockout / Tagout (LOTO):** Penguncian gembok sakelar utama dan pemasangan label bahaya bertuliskan *「修理中・通電禁止」* saat perbaikan.
- **Topik 4.3: HOU-REN-SO Saat Kebakaran Kabel & Asap:**
  - **Topik 4.3.1: Prosedur Pemadaman Listrik & Evakuasi:** Pelaporan darurat saat tercium bau isolasi kabel terbakar, pemutusan pemutus arus MCCB seketika, dan pelarangan menyiramkan air ke instalasi listrik!

---

## 4. KOSAKATA TEKNIS LAYER 2 (JAIM OFFICIAL ELECTRICAL LEXICON)

| No | Kanji | Kana | Romaji | Indonesian Gloss | High-Stakes Risk Category |
|---|---|---|---|---|---|
| 1 | はんだ付け | はんだづけ | *handazuke* | Proses penyolderan timah pada papan sirkuit | Burn & Toxic Flux Inhalation |
| 2 | はんだブリッジ | はんだぶりっじ | *handa burijji* | Korsleting cacat jembatan timah antarpin | Fatal Short-Circuit Fire |
| 3 | プリント基板 | ぷりんときばん | *purinto kiban* | Papan sirkuit cetak komponen elektronik (PCB) | Thermal Delamination Defect |
| 4 | 静電気放電・ESD | せいでんきほうでん | *seidenki houden (ESD)* | Pelepasan muatan listrik statis perusak chip IC | Microchip Destruction Hazard |
| 5 | リストストラップ | りすとすとらっぷ | *risuto sutorappu* | Tali gelang pentanahan anti-statis operator | ESD Protection Non-Compliance |
| 6 | 導通検査 | どうつうけんさ | *doutsuu kensa* | Pengujian keterhubungan aliran jalur kabel | Open/Short Circuit Defect |
| 7 | 端子圧着 | たんしあっちゃく | *tanshi atchaku* | Pengepresan skun terminal kabel konektor | Terminal Pull-Out Hazard |
| 8 | 極性 | きょくせい | *kyokusei* | Polaritas kutub positif (+) dan negatif (-) | Component Explosion Hazard |
| 9 | 絶縁破壊 | ぜつえんはかい | *zetsuen hakai* | Kerusakan lapisan isolator memicu kebocoran arus | Catastrophic Electric Shock |
| 10 | 短絡（ショート） | たんらく（しょーと） | *tanraku (shooto)* | Hubungan arus pendek tegangan listrik | Fire & Arc Flash Explosion |
| 11 | 感電防止 | かんでんぼうし | *kanden boushi* | Pencegahan sengatan kejut listrik mematikan | Fatal 200V Electrocution |
| 12 | 検電器 | けんでんき | *kendenki* | Alat tespen penguji keberadaan tegangan listrik | High Voltage Inadvertent Contact |
| 13 | 鉛フリーはんだ | なまりふりーはんだ | *namari-furii handa* | Paduan kawat timah solder ramah lingkungan | Higher Melting Temp Defect |
| 14 | 非常停止スイッチ | ひじょうていしすいっち | *hijou teishi suitchi* | Sakelar tombol pemutus darurat jalur mesin | Life-Critical Escalation |
| 15 | ワイヤーストリッパー | わいやーすとりっぱー | *waiyaa sutorippaa* | Tang pengupas kulit isolasi kabel tembaga | Wire Strand Nicking Hazard |
| 16 | 抵抗器 | ていこうき | *teikouki* | Resistor pembatas besaran arus listrik | Overheating & Charring |
| 17 | 電解コンデンサ | でんかいこんでんさ | *denkai kondensa* | Kapasitor elektrolit berpolaritas kutub | Burst Hazard if Reversed |
| 18 | 集積回路（IC） | しゅうせきかいろ | *shuuseki kairo (IC)* | Sirkuit mikroelektronika terpadu terintegrasi | Electrostatic Damage Risk |
| 19 | フラックス | ふらっくす | *furakkusu* | Cairan kimia pembersih oksida logam saat solder | Eye & Respiratory Irritation |
| 20 | 吸取線 | すいとりせん | *suitorisen* | Pita tembaga anyam penyerap sisa timah solder | Thermal Burn Hazard |
| 21 | テスター | てすたー | *tesutaa* | Multimeter digital pengukur tegangan/arus/ohm | Range Setting Explosion Risk |
| 22 | メガー（絶縁抵抗計） | めがー | *megaa* | Alat ukur tahanan isolasi tegangan tinggi DC | Shock Hazard during testing |
| 23 | 耐電圧試験 | たいでんあつしけん | *taiden'atsu shiken* | Pengujian ketahanan tegangan dielektrik komponen | Dielectric Puncture Hazard |
| 24 | 接地（アース） | せっち（あーす） | *setchi (aasu)* | Saluran pembumian pengaman arus bocor listrik | Ground Fault Shock Hazard |
| 25 | 配線図 | はいせんず | *haisenzu* | Diagram jalur perkabelan sambungan instrumen | Wiring Connection Misroute |
| 26 | 端子台 | たんしだい | *tanshidai* | Blok deretan baut terminal penghubung kabel | Loose Terminal Heating Fire |
| 27 | 圧着ペンチ | あっちゃくぺんち | *atchaku penchi* | Tang presisi crimping skun terminal kabel | Improper Crimp Force Defect |
| 28 | 結束バンド | けっそくばんど | *kessoku bando* | Tali pengikat kabel ties nilon perapi harness | Sharp Cut-End Scratch Hazard |
| 29 | ハーネス導通治具 | はーねすどうつうじぐ | *haanesu doutsuu jigu* | Alat jig otomatis pengecek susunan kabel pin | False Pin Insertion Defect |
| 30 | はんだこて台 | はんだこてだい | *handakotedai* | Dudukan logam penyimpan ujung solder panas | Facility Fire & Skin Burn |
| 31 | こて先酸化 | こてさきさんか | *kotesaki sanka* | Lapisan hitam oksida pada ujung mata solder | Poor Heat Transfer Defect |
| 32 | イモはんだ | いもはんだ | *imo handa* | Cacat solder dingin menggumpal tanpa ikatan | Intermittent Circuit Open |
| 33 | ブレーカー（配線遮断器）| ぶれーかー | *bureekaa* | Pemutus sirkuit otomatis arus lebih (MCCB) | Tripped Circuit Fire Hazard |
| 34 | 配電盤 | はいでんばん | *haidenban* | Panel kotak distribusi pembagi daya listrik | Arc Flash Explosion Risk |
| 35 | 通電禁止札 | つうでんきんしさつ | *tsuuden kinshi fuda* | Label peringatan dilarang mengalirkan arus listrik | Lockout / Tagout Violation |
| 36 | ５Ｓ清掃 | ごえすせいそう | *goesuseisou* | Pembersihan meja kerja bebas serpihan timah tajam | Lead Dust Ingestion Hazard |

---

## 5. DIRECTIVES K3 DARURAT & FORMULA YUBISASHI KOSHO

### Teriakan Darurat Spontan di Tempat Kerja:
- *「通電するな！まだ配線作業中だ！」* (*Tsuuden suru na! Mada haisen sagyouchuu da!* — Jangan nyalakan arus! Masih ada pekerjaan kabel!)
- *「コンデンサの極性が逆だ！爆発するぞ！」* (*Kondensa no kyokusei ga gyaku da! Bakuhatsu suru zo!* — Polaritas kapasitor terbalik! Bisa meledak!)
- *「煙が出た！ブレーカーを落とせ！」* (*Kemuri ga deta! Bureekaa wo otose!* — Keluar asap! Matikan circuit breaker!)

### Formula Point-and-Call (指差し呼称):
1. **Pengecekan Tali Gelang Anti-Statis (ESD):** *「リストストラップ装着、アース接地、ヨシ！」*
2. **Pengecekan Polaritas Kapasitor:** *「極性方向、プラス・マイナス確認、ヨシ！」*
3. **Pengecekan Ketiadaan Tegangan Listrik:** *「検電器確認、無電圧、ヨシ！」*
4. **Pengecekan Sambungan Solder:** *「はんだブリッジなし、フィレット良好、ヨシ！」*

---

## 6. BANK SOAL UJIAN CBT JAIM RESMI

### Contoh Soal Ujian Teori (学科試験 ○×):
> **Soal 1:** 電解コンデンサをプリント基板に取り付けるときは、極性（プラスとマイナス）があるため、基板の表示に合わせて正しく挿入しなければならない。  
> **Kunci Jawaban:** **○ (Benar)** (Kapasitor elektrolit memiliki polaritas ketat; pemasangan terbalik dapat memicu letupan gas atau ledakan tabung kapasitor).

> **Soal 2:** はんだ付け作業を行う際、接合部に十分な熱が伝わっていない状態で冷えると、強度の高い良好な「フィレット」が形成される。  
> **Kunci Jawaban:** **× (Salah)** (Kurang panas memicu cacat solder dingin/imo-handa yang rapuh dan mudah lepas saat sirkuit bekerja).

### Contoh Soal Ujian Praktik On-Screen (実技試験):
> **Soal 1:** 画面の写真を見て、プリント基板上のICの足（リードピン）同士が余分なはんだでくっついている不良現象の名前として、正しいものを選びなさい。  
> A. クラック（Crack）  
> B. はんだブリッジ（Solder Bridge）  
> C. ボイド（Void）  
> D. ディウェッティング（Dewetting）  
> **Kunci Jawaban:** **B** (Handa burijji adalah cacat korsleting akibat timah meluber menghubungkan dua pin bersebelahan).
`;

fs.writeFileSync(path.join(sswDir, "SSW-05-ELECTRICAL-ELECTRONICS-SYLLABUS.md"), ssw05Content, "utf8");
console.log("SSW-05 written successfully!");
