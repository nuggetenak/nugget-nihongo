# SILABUS KEJURUAN RESMI NUGGET NIHONGO · SEKTOR 05: ELECTRICAL & ELECTRONICS (ELEKTRONIKA & KELISTRIKAN)
**Kode Sektor:** `SSW-MFG-03` · **Versi:** v2.0 (Corpus v30 Canonical Revision)  
**Status:** AUTHORITATIVE & EXHAUSTIVE SECTOR SYLLABUS  
**Kementerian Pembina:** Kementerian Ekonomi, Perdagangan dan Industri Jepang (METI / 経済産業省)  
**Badan Pelaksana Uji:** Organisasi SDM Manufaktur Internasional (JAIM / 一般社団法人工業製品製造技能人材機構) & Prometric  
**Dasar Kurasi Primer:**
- `reference-books/ssw/09_seizou_manufacturing/Manufacturing_Electrical_Assembly_Textbook_JA.pdf` (198 halaman) & `reference-books/ssw/09_seizou_manufacturing/Manufacturing_Electrical_Assembly_Textbook_ID.pdf`
- `reference-books/ssw/09_seizou_manufacturing/Manufacturing_Electrical_Assembly_Sample_Exam_JA.pdf` (Bank Soal Ujian Perakitan Elektronik JAIM)
- Standar Integrasi 17 Divisi Operasional JAIM (JAIM 2024 [VS-40])
**Landasan Teoretis & Empiris:**
- Needs Analysis & Technical Lexicon (Nation & Hwang 1995 [VS-09]; Chung & Nation 2003 [VS-10])
- Cross-Cultural Communication in Manufacturing Floors & HOU-REN-SO (Mustaqim & Priventa 2026 [VS-31]; Supriatnaningsih et al. 2024 [VS-33])
- Geminate Acoustic Precision in High-Noise Factory Gemba (Husna & Febriyanti 2022 [EA-25])
- Industrial Safety Standards & Shiteki Koshou (JNIOSH 2020 [VS-39]; JAIM 2024 [VS-40])

---

## 1. SPESIFIKASI UJIAN RESMI PROMETRIC CBT (STANDAR JAIM / METI)

Kandidat visa *Tokutei Ginou 1-gō* bidang Perakitan Kelistrikan & Elektronika menempuh ujian Computer-Based Testing (CBT) dengan spesifikasi regulasi resmi:

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                        PROMETRIC CBT ELECTRICAL & ELECTRONICS ASSEMBLY EXAM MATRIX                     │
├─────────────────────────┬────────────────────────────────────────┬─────────────┬───────────┬───────────┤
│ Komponen Ujian          │ Cakupan Ranah Pengujian                │ Jumlah Soal │ Durasi    │ Ambang    │
├─────────────────────────┼────────────────────────────────────────┼─────────────┼───────────┼───────────┤
│ 1. Ujian Teori          │ Pengetahuan komponen listrik R-L-C,    │ 30 Soal     │ 80 Menit  │ $\ge 65\%$│
│    (学科試験 - Gakka)   │ diagram sirkuit skematik, teknik solder│ (Format     │ (Total    │ (20 / 30) │
│                         │ bebas timbal, proteksi ESD, kabel krimp│  True/False │  Alokasi  │           │
│                         │ dan keselamatan K3 voltase tinggi      │  ○× CBT)    │  Gakka &  │           │
├─────────────────────────┼────────────────────────────────────────┼─────────────┤  Jitsugi) ├───────────┤
│ 2. Ujian Praktik Layar  │ Identifikasi cacat solder bridge,      │ 10 Soal     │           │ $\ge 60\%$│
│    (実技試験 - Jitsugi) │ polaritas kapasitor elektrolit, urutan │ (Simulasi   │           │ (6 / 10)  │
│                         │ crimping kabel, dan pembacaan tester   │  Visual CBT)│           │           │
└─────────────────────────┴────────────────────────────────────────┴─────────────┴───────────┴───────────┘
```

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
  - **Topik 3.2.2: Uji Resistansi Isolasi & Kebocoran Arus (絶縁抵抗試験):** Penggunaan insulation tester Megger pada tegangan 500V/1000V DC; standar resistansi isolasi wajib $ge 1	ext{ M}Omega$.

---

### MODUL 4: K3 KELISTRIKAN, PROTEKSI ESD & PANEL DAYA (電気安全とESD対策)
- **Topik 4.1: Pengendalian Muatan Statis Elektrostatik (静電気放電対策 - ESD):**
  - **Topik 4.1.1: Tali Pergelangan Anti-Statis (リストストラップ):** Kewajiban memakai wrist strap berkabel grounding terhubung resistor $1	ext{ M}Omega$ saat memegang komponen IC sensitif tegangan.
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
