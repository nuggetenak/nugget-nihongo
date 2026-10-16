# SILABUS KEJURUAN RESMI NUGGET NIHONGO · SEKTOR 05: ELECTRICAL & ELECTRONICS (電気電子情報関連産業 / MANUFAKTUR ELEKTRONIKA & INFORMASI)
**Kode Sektor:** `SSW-MFG-03` · **Versi:** v2.0 (Corpus v30 Canonical Revision)  
**Status:** AUTHORITATIVE & EXHAUSTIVE SECTOR SYLLABUS  
**Kementerian Pembina:** Kementerian Ekonomi, Perdagangan dan Industri Jepang (METI / 経済産業省)  
**Badan Pelaksana Uji:** Organisasi SDM Manufaktur Internasional (JAIM / 一般社団法人工業製品製造技能人材機構) & Prometric  
**Dasar Kurasi Primer:**
- `reference-books/ssw/09_seizou_manufacturing/Manufacturing_Electrical_Assembly_Textbook_JA.pdf` (152 halaman) & `ID` (Perakitan Peralatan Listrik dan Elektronika)
- `reference-books/ssw/09_seizou_manufacturing/Manufacturing_Electrical_Assembly_Sample_Exam_JA.pdf` (Bank Soal Ujian Resmi JAIM)
- Standar Integrasi 17 Divisi Operasional JAIM (JAIM 2024 [VS-40])
**Landasan Teoretis & Empiris:**
- Needs Analysis & Technical Lexicon (Nation & Hwang 1995 [VS-09]; Chung & Nation 2003 [VS-10])
- Cross-Cultural Communication in Manufacturing Floors & HOU-REN-SO (Mustaqim & Priventa 2026 [VS-31]; Supriatnaningsih et al. 2024 [VS-33])
- Geminate Acoustic Precision in High-Noise Factory Gemba (Husna & Febriyanti 2022 [EA-25])
- Industrial Safety Standards & Shiteki Koshou (JNIOSH 2020 [VS-39]; JAIM 2024 [VS-40])

---

## 1. SPESIFIKASI UJIAN RESMI PROMETRIC CBT (STANDAR JAIM / METI)

Kandidat visa *Tokutei Ginou 1-gō* bidang Manufaktur Kelistrikan dan Elektronika menempuh ujian Computer-Based Testing (CBT) dengan spesifikasi regulasi resmi:

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                        PROMETRIC CBT ELECTRICAL & ELECTRONICS EXAM MATRIX                              │
├─────────────────────────┬────────────────────────────────────────┬─────────────┬───────────┬───────────┤
│ Komponen Ujian          │ Cakupan Ranah Pengujian                │ Jumlah Soal │ Durasi    │ Ambang    │
├─────────────────────────┼────────────────────────────────────────┼─────────────┼───────────┼───────────┤
│ 1. Ujian Teori          │ K3 listrik, pencegahan sengatan kawat, │ 30 Soal     │ 80 Menit  │ $\ge 65\%$│
│    (学科試験 - Gakka)   │ Hukum Ohm/Kirchhoff, komponen pasif/   │ (Format     │ (Total    │ (20 / 30) │
│                         │ aktif, teknik solder timbal-bebas,     │  True/False │  Alokasi  │           │
│                         │ proteksi ESD, dan pengujian isolasi    │  ○× CBT)    │  Gakka &  │           │
├─────────────────────────┼────────────────────────────────────────┼─────────────┤  Jitsugi) ├───────────┤
│ 2. Ujian Praktik Layar  │ Identifikasi komponen SMD, pembacaan   │ 10 Soal     │           │ $\ge 60\%$│
│    (実技試験 - Jitsugi) │ kode warna resistor 4/5 gelang,        │ (Simulasi   │           │ (6 / 10)  │
│                         │ deteksi cacat solder (cold/bridging),  │  Visual CBT)│           │           │
│                         │ perakitan harness & crimping terminal  │             │           │           │
└─────────────────────────┴────────────────────────────────────────┴─────────────┴───────────┴───────────┘
```

> **Ketentuan Kelulusan Ganda:** Peserta wajib lulus **KEDUA-DUANYA** (minimal 20 benar pada Teori dan minimal 6 benar pada Praktik) dalam satu sesi ujian 80 menit.

---

## 2. JALUR OPERASIONAL SUB-BIDANG ELEKTRONIKA (JAIM)

Sub-bidang Kelistrikan & Elektronika mencakup 4 divisi inti proses perakitan papan sirkuit dan kabel:
1. **Perakitan Papan Sirkuit Cetak (プリント配線板製造・実装 - PCB / SMT Assembly):** Pemasangan komponen Surface Mount Technology (SMT), pasta solder (*solder paste*), pematrian oven reflow.
2. **Penyolderan Tangan Manual (手はんだ付け作業 - Te-Handazuke):** Penyolderan kawat timah bebas timbal (*lead-free solder* Sn-Ag-Cu) pada titik through-hole komponen diskrit.
3. **Perakitan Wiring Harness & Panel Kontrol (配線・ハーネス組立 - Hanesu Kumitate):** Pengupasan isolasi kabel (*strip*), crimping konektor (*atsuchaku*), pengikatan kabel (*kessoku*), perakitan kabinet panel kontrol.
4. **Inspeksi Kelistrikan & Mutu (電気検査・品質保証 - Denki Kensa):** Uji kontinuitas (*doutsuu shiken*), resistansi isolasi (*zetsuen teikou*), dan uji ketahanan tegangan tembus (*taiatsu shiken*).

---

## 3. MODUL PEMBELAJARAN KURIKULUM (PEDAGOGICAL MODULES)

### MODUL 1: TEORI LISTRIK DASAR & KOMPONEN RANGKAIAN
- **Topik 1.1: Parameter Listrik & Hukum Sirkuit:**
  - Tegangan ($V$ Volt), Arus ($I$ Ampere), Hambatan ($R$ Ohm).
  - Hukum Ohm $V = I \cdot R$ dan Daya Listrik $P = V \cdot I$ Watt.
  - Perbedaan Arus Searah (DC / *Chokuryuu*) dan Arus Bolak-Balik (AC / *Kouryuu*).
- **Topik 1.2: Komponen Elektronika Pasif & Aktif:**
  - Resistor tetap & variabel: Kode warna 4 gelang (Hitam, Cokelat, Merah, Oranye, Kuning, Hijau, Biru, Ungu, Abu-abu, Putih, Emas 5%, Perak 10%).
  - Kapasitor: Kapasitor keramik, film, dan elektrolit bertanda kutub (+ / -). Bahaya pemasangan terbalik kutub (*kyokusei machigai*) yang menyebabkan ledakan.
  - Semikonduktor: Dioda penyearah, LED (*hakku daioudo*), transistor NPN/PNP, dan IC/LSI.

---

### MODUL 2: TEKNOLOGI PENYOLDERAN & PERAKITAN PCB
- **Topik 2.1: Karakteristik Solder Bebas Timbal (鉛フリーはんだ - Lead-Free):**
  - Titik lebur timbal konvensional (183°C) vs paduan bebas timbal Sn-3.0Ag-0.5Cu (sekitar 217°C).
  - Suhu ujung besi solder (*kote-saki*) yang diatur stabil antara 340°C – 360°C.
  - Peran fluks (*furakkusu*) dalam melarutkan lapisan oksida dan membentuk sudut kontak meniskus basah (*wetting*).
- **Topik 2.2: Kriteria Kualitas Sambungan Solder (JIS C 61191):**
  - Bentuk ideal: Cekung merata seperti lereng gunung Fuji (*fujisan-gata / fillet* halus mengkilap).
  - Cacat solder fatal:
    - *Imo-handa* (Cold solder / solder dingin akibat panas kurang).
    - *Buri-ji* (Solder bridge / jembatan lelehan timah yang menghubungkan dua jalur dan memicu arus pendek).
    - *Handa-bori* (Solder void / lubang udara akibat fluks terperangkap).
    - *Tsuno* (Solder spike / tanduk tajam akibat penarikan besi solder terlalu lambat).

---

### MODUL 3: TEKNIK WIRING HARNESS & TERMINASI KABEL
- **Topik 3.1: Pengupasan & Crimping (圧着端子 - Acchaku Tanshi):**
  - Pengupasan pembungkus isolasi menggunakan wire stripper (*waiaa sutorippaa*) tanpa melukai urat serat tembaga konduktor.
  - Crimping terminal garpu/cincin dengan tang crimping bertanda warna (*atsuchaku kougu*).
  - Uji tarik sambungan terminal (*hippari kensa*) untuk memastikan kawat tidak lolos terlepas.
- **Topik 3.2: Penataan & Pengikatan Bundel Kabel:**
  - Penggunaan tie-wrap kabel (*kessoku bando*), selongsong bakar panas (*shurinku chuubu*), dan pelabelan nomor pin terminal.

---

### MODUL 4: K3 KELISTRIKAN, PROTEKSI ESD & KONTROL LINGKUNGAN
- **Topik 4.1: Pengendalian Listrik Statis (静電気対策 - ESD Control):**
  - Pelepasan muatan listrik statis (*seidenki*) yang dapat merusak lapisan gerbang semikonduktor MOS mikroskopis.
  - Pemasangan gelang statis berkawat arde (*risuto sutorappu* 1 Megaohm), tikar lantai konduktif, dan sepatu antistatis (*seiden-kutsu*).
- **Topik 4.2: Pencegahan Sengatan Arus Listrik (感電防止 - Kanden Boushi):**
  - Pemadaman sumber tegangan utama (Breaker OFF) sebelum membongkar sirkuit berdaya.
  - Prosedur pelepasan sisa muatan kapasitor tegangan tinggi (*houshouden*) dengan resistor pembuang.
- **Topik 4.3: HOU-REN-SO Saat Kejadian Korsleting / Asap:**
  - *「班長、基板の電源投入テスト中に異臭と白煙が発生しました！すぐに主電源スイッチをOFFにしました。原因調査をお願いします！」*

---

## 4. KOSAKATA TEKNIS LAYER 2 (JAIM OFFICIAL ELECTRICAL LEXICON)

| No | Kanji | Kana | Romaji | Indonesian Gloss | High-Stakes Risk Category |
|---|---|---|---|---|---|
| 1 | 感電 | かんでん | *kanden* | Sengatan arus listrik pada tubuh manusia | Electrocution / Cardiac Arrest |
| 2 | 静電気破壊 | せいでんきはかい | *seidenki hakai* | Kerusakan komponen akibat pelepasan muatan ESD | Silent Functional Defect |
| 3 | はんだブリッジ | はんだぶりっじ | *handa burijji* | Jembatan solder menempel (korsleting 2 pin) | Circuit Short / Thermal Runaway |
| 4 | イモはんだ | いもはんだ | *imo-handa* | Solder dingin / menempel rapuh tanpa difusi panas | Intermittent Electrical Failure |
| 5 | リストストラップ | りすとすとらっぷ | *risuto sutorappu* | Gelang arde antistatis penangkal muatan ESD | Electrostatic Discharge Hazard |
| 6 | 導通試験 | どうつうしけん | *doutsuu shiken* | Uji kontinuitas aliran arus pada sirkuit kabel | Open Circuit Detection |
| 7 | 絶縁抵抗計 | ぜつえんていこうけい | *zetsuen teikoukei* | Megger meter pengukur kebocoran isolasi kabel | Insulation Breakdown Hazard |
| 8 | 極性間違い | きょくせいまちがい | *kyokusei machigai* | Pemasangan kutub positif/negatif terbalik | Component Explosion / Burst |
| 9 | 圧着不良 | あっちゃくふりょう | *acchaku furyou* | Cacat crimping kawat longgar / kabel putus | Fire / Arcing Ignition Hazard |
| 10 | 短絡（ショート） | たんらく（しょーと） | *tanraku / shooto* | Hubungan arus pendek antara dua konduktor | Overcurrent Fire / Meltdown |
| 11 | 定格電圧 | ていかくでんあつ | *teikaku den'atsu* | Tegangan nominal kerja batas maksimum komponen | Overvoltage Breakdown |
| 12 | フラックス残渣 | ふらっくすざんさ | *furakkusu zansa* | Residu sisa cairan fluks korosif di atas PCB | Corrosion / Dendrite Growth |
| 13 | アース線（接地） | あーすせん（せっち）| *aasu-sen / secchi* | Jalur pentanahan kabel arde pengaman kebocoran | Shock Hazard Prevention |
| 14 | 誤配線 | ごはいせん | *gohaisen* | Kesalahan penyambungan nomor kabel pin harness | Unit Destruction / Fire Hazard |
| 15 | サーマルプロテクタ | さーまるぷろてくた | *saamaru purotekuta* | Sekering pelindung panas otomatis pemutus arus | Overheat Safety Interlock |

---

## 5. DIRECTIVES K3 DARURAT & FORMULA YUBISASHI KOSHO

### Teriakan Darurat Spontan di Ruang Elektronika (> 85 dB):
- *「電源切れ！基板から煙が出ているぞ！」* (*Dengen kire! Kiban kara kemuri ga dete iru zo!* — Matikan power! Keluar asap dari PCB!)
- *「触るな！感電するぞ！ブレーカーを落とせ！」* (*Sawaru na! Kanden suru zo! Bureekaa wo otose!* — Jangan sentuh! Nanti tersetrum! Matikan breaker!)
- *「コンデンサの放電を忘れるな！放電確認！」* (*Kondensa no houden wo wasureru na! Houden kakunin!* — Jangan lupa buang muatan kapasitor! Cek pembuangan muatan!)

### Formula Point-and-Call (指差し呼称):
1. **Pengecekan Pemasangan Gelang Statis:** *「リストストラップ装着、アース接続、ヨシ！」*
2. **Pengecekan Polaritas Kapasitor Elektrolit:** *「電解コンデンサ極性、プラス・マイナス確認、ヨシ！」*
3. **Pengecekan Suhu Besi Solder:** *「はんだこて温度、350度設定、基準内ヨシ！」*
4. **Pengecekan Tidak Adanya Tegangan Terbuka Sebelum Sentuh:** *「テスター検電、電圧ゼロボルト確認、ヨシ！」*

---

## 6. BANK SOAL UJIAN CBT JAIM RESMI

### Contoh Soal Ujian Teori (学科試験 - Format True/False ○×):
> **Soal 1:** 電解コンデンサをプリント基板にはんだ付けする際、プラス（＋）とマイナス（ー）の極性を逆に接続して電源を投入すると、発煙や破裂の原因となる。  
> A. 正しい（○）  
> B. 間違い（×）  
> **Kunci Jawaban:** **A** (Benar / ○. Pemasangan polaritas terbalik pada kapasitor elektrolit menimbulkan gas internal hingga selongsong meledak dan terbakar).

> **Soal 2:** はんだ付け作業において、はんだ付け部分に十分な熱が伝わらないままはんだを流し込むと、良好な接合部（フィレット）が形成される。  
> A. 正しい（○）  
> B. 間違い（×）  
> **Kunci Jawaban:** **B** (Salah / ×. Kurangnya panas menyebabkan cacat solder dingin /*imo-handa*/ yang rapuh dan menimbulkan kegagalan kontak kelistrikan).

### Contoh Soal Ujian Praktik Visual (実技試験):
> **Soal 1:** 画面に表示されたカラーコード「赤・赤・橙・金」を持つアキシャルリード型固定抵抗器の公称抵抗値として正しいものを選びなさい。  
> A. 2.2 kΩ（許容差 ±5%）  
> B. 22 kΩ（許容差 ±5%）  
> C. 220 kΩ（許容差 ±5%）  
> D. 22 Ω（許容差 ±10%）  
> **Kunci Jawaban:** Cincin 1 (Merah = 2), Cincin 2 (Merah = 2), Cincin 3 (Oranye = $10^3 = 1.000$), Cincin 4 (Emas = $\pm 5\%$). Nilai $= 22 \times 10^3 = 22.000\ \Omega = 22\ \text{k}\Omega\ (\pm 5\%)$ $\rightarrow$ **B (22 kΩ)**.
