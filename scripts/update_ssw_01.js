const fs = require("fs");
const path = require("path");

const ssw01Path = path.join(__dirname, "../corpus/sections/synthesis/syllabi/ssw/SSW-01-KAIGO-ELDERCARE-SYLLABUS.md");

const content = `# SILABUS KEJURUAN RESMI NUGGET NIHONGO · SEKTOR 01: KAIGO (NURSING CARE / KEPERAWATAN LANSIA)
**Kode Sektor:** \`SSW-CARE-01\` · **Versi:** v2.0 (Corpus v30 Canonical Revision)  
**Status:** AUTHORITATIVE & EXHAUSTIVE SECTOR SYLLABUS  
**Kementerian Pembina:** Kementerian Kesehatan, Tenaga Kerja, dan Kesejahteraan Jepang (MHLW / 厚生労働省)  
**Badan Pelaksana Uji:** Silver Service Association (シルバーサービス振興会) & Prometric Japan  
**Dasar Kurasi Primer:**
- \`reference-books/ssw/01_kaigo_nursing_care/Kaigo_Skills_Textbook_Rev2_JA.pdf\` (Revisi ke-2 MHLW, 276 halaman)
- \`reference-books/ssw/01_kaigo_nursing_care/Kaigo_Skills_Textbook_Rev2_ID.pdf\` (Terjemahan Resmi Bahasa Indonesia)
- \`reference-books/ssw/01_kaigo_nursing_care/Kaigo_Japanese_Textbook_JA.pdf\` (50 halaman) & \`reference-books/ssw/01_kaigo_nursing_care/Kaigo_Japanese_Textbook_ID_Multi.pdf\`
- \`reference-books/ssw/01_kaigo_nursing_care/Kaigo_Vocabulary_Glossary_ID.pdf\` (Kamus Istilah Resmi MHLW untuk Caregiver Asing)
- \`reference-books/ssw/01_kaigo_nursing_care/Kaigo_Skills_Exam_Sample_JA.pdf\` & \`reference-books/ssw/01_kaigo_nursing_care/Kaigo_Japanese_Exam_Sample_JA.pdf\`
**Landasan Teoretis & Empiris:**
- Needs Analysis & LSP (Hutchinson & Waters 1987 [VS-01]; Dudley-Evans & St John 1998 [VS-02])
- Downward Speech Level Shift & Koe-kake (Pramesti, Sadyana, & Pradnyani 2019 [VS-29])
- EPA Caregiver Lexical & Communication Barriers (Noyama 2012 [VS-08]; Kamata & Tanaka 2021 [VS-12]; Ogawa 2012 [VS-24])
- Intercultural Workplace Contact & Peer Scaffolding (Nurjaleka 2022 [VS-35])
- 42-Item Clinical Pain Onomatopoeia Diagnostic Matrix (Sakamoto et al. 2014 [VS-36]; Doizaki et al. 2015 [VS-37]; Okuda 2018 [VS-38])
- Standar Komunikasi Medis SBAR & Pelaporan Insiden K3 (JNIOSH 2020 [VS-39])

---

## 1. SPESIFIKASI UJIAN RESMI PROMETRIC CBT

Kandidat visa *Tokutei Ginou 1-gō* bidang Kaigo diwajibkan lulus **DUA UJIAN TERPISAH** yang diselenggarakan melalui jaringan Prometric CBT:

\`\`\`
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                   PROMETRIC CBT KAIGO EXAMINATION MATRIX                               │
├─────────────────────────┬────────────────────────────────────────┬─────────────┬───────────┬───────────┤
│ Nama Ujian              │ Ranah Uji Utama                        │ Jumlah Soal │ Durasi    │ Ambang    │
├─────────────────────────┼────────────────────────────────────────┼─────────────┼───────────┼───────────┤
│ 1. Ujian Evaluasi       │ 1. 介護の基本 (Dasar Keperawatan: 10)  │ 45 Soal     │ 60 Menit  │ $\\ge 60\\%$│
│    Keterampilan Kaigo   │ 2. こころとからだ (Mekanisme: 6)       │ (Pilihan    │           │ (27 / 45) │
│    (介護特定技能評価)   │ 3. コミュニケーション (Komunikasi: 4)  │  Ganda 4)   │           │           │
│                         │ 4. 生活支援技術 (Bantuan Hidup: 25)    │             │           │           │
├─────────────────────────┼────────────────────────────────────────┼─────────────┼───────────┼───────────┤
│ 2. Ujian Evaluasi       │ 1. 介護のことば (Kosakata: 5)          │ 15 Soal     │ 30 Menit  │ $\\ge 60\\%$│
│    Bahasa Jepang Kaigo  │ 2. 介護の会話・声かけ (Percakapan: 5)  │ (Pilihan    │           │ (9 / 15)  │
│    (介護日本語評価)     │ 3. 介護の文書 (Dokumen Catatan: 5)     │  Ganda 4)   │           │           │
└─────────────────────────┴────────────────────────────────────────┴─────────────┴───────────┴───────────┘
\`\`\`

> **Catatan Bahasa Ujian:**
> - Ujian Keterampilan dapat dipilih dalam **Bahasa Jepang (berhuruf kanji dan furigana)** atau **Bahasa Indonesia**.
> - Ujian Bahasa Jepang disajikan **100% dalam Bahasa Jepang dengan furigana**.

---

## 2. DUA JALUR PRAKTIK KERJA KAIGO (OPERATIONAL TRACKS)

Dalam sistem pelayanan lansia di Jepang (*Kaigo Hoken Seido*), kurikulum membagi kompetensi ke dalam 2 jalur praktik:
1. **Jalur Panti Perawatan Lansia (施設介護 - Shisetsu Kaigo):**
   - Fasilitas: Panti rawat khusus lansia (*Tokubetsu Yougo Roujin Houmu*), Panti rehabilitasi (*Kaigo Roujin Hoken Shisetsu*), Care house.
   - Karakteristik: Layanan 24 jam shift bergilir (pagi, siang, malam / *yakin*), perawatan demensia berat (*ninchishou*), operan dinas shift (*moushiokuri*).
2. **Jalur Perawatan Rumah & Komunitas (訪問介護 - Houmon Kaigo & Tsusho):**
   - Fasilitas: Day service center (*tsusho kaigo*), kunjungan rumah (*houmon* - perluasan regulasi baru).
   - Karakteristik: Menghormati ritme hidup lansia di rumah sendiri, memasak menu diet khusus, interaksi intensif dengan keluarga lansia.

---

## 3. MODUL PEMBELAJARAN KURIKULUM (PEDAGOGICAL MODULES)

Berdasarkan 4 bagian buku teks resmi MHLW Revisi ke-2 (276 halaman):

### MODUL 1: DASAR KEPERAWATAN (介護の基本)
- **Topik 1.1: Menjaga Martabat & Kemandirian Lansia:**
  - **Topik 1.1.1: Songen no Hoji & Hak Menentukan Nasib Sendiri (Jiko Kettei):** Konsep pemenuhan martabat manusia (*Songen no Hoji*), penentuan keputusan mandiri oleh lansia (*Jiko Kettei no Shien*), menanyakan preferensi baju, menu makan, dan waktu mandi tanpa paksaan staf.
  - **Topik 1.1.2: Perlindungan Privasi & Penanganan Rasa Malu (Shuuchishin):** Perlindungan privasi (*Shuuchishin no Hairyo*), penutupan tirai partisi, penutupan area tubuh sensitif dengan handuk saat membuka pakaian dan penggantian popok.
  - **Topik 1.1.3: Prinsip Dukungan Kemandirian Hidup (Jiritsu Shien):** Memaksimalkan sisa kemampuan fisik/kognitif lansia (*Zanson Kinou no Katsuyou*), bukan mengambil alih seluruh aktivitas secara pasif.
- **Topik 1.2: Peran, Tanggung Jawab & Etika Profesional Caregiver:**
  - **Topik 1.2.1: Kewajiban Menjaga Rahasia Medis (Shuhitsu Gimu):** Kerahasiaan data pribadi dan riwayat penyakit lansia (*Shuhitsu Gimu*), larangan memotret atau membagikan kondisi pasien ke media sosial.
  - **Topik 1.2.2: Larangan Kekerasan Fisik, Verbal & Penelantaran (Gyakutai Boushi):** Klasifikasi 5 jenis kekerasan lansia (fisik, psikologis, penelantaran/neglect, seksual, finansial) serta kewajiban hukum pelaporan insiden.
  - **Topik 1.2.3: Penghapusan Tindakan Pengikatan Fisik (Shintai Kousoku no Haishi):** Larangan mengikat tubuh, memasang sabuk pengikat di tempat tidur, atau mengurung lansia di kamar tanpa indikasi kegawatan mutlak.
- **Topik 1.3: Keselamatan K3 & Pencegahan Infeksi di Fasilitas (Kansen Taisaku):**
  - **Topik 1.3.1: Protokol Cuci Tangan 6 Langkah & Penggunaan APD Standar:** SOP cuci tangan antiseptik 6 langkah MHLW, pemakaian masker bedah, sarung tangan sekali pakai, dan celemek plastik (*apron*).
  - **Topik 1.3.2: Pemilahan Limbah Medis & Penanganan Wabah Infeksius:** Pemisahan sampah infeksius (*kansensei haikibutsu*), penanganan tumpahan muntahan/feses Norovirus dengan larutan natrium hipoklorit 0.1% (1000 ppm).

---

### MODUL 2: MEKANISME PIKIRAN DAN TUBUH (こころとからだのしくみ)
- **Topik 2.1: Karakteristik Fisiologis Proses Penuaan (老化に伴う変化):**
  - **Topik 2.1.1: Penurunan Sensori Penglihatan & Pendengaran Presbikusis:** Penyempitan lapang pandang (*shiya ga semaku naru*), adaptasi gelap melambat, kesulitan mendengar nada frekuensi tinggi (*kouoniki nanchou*). SOP berbicara: nada rendah, tempo tenang, tatap muka langsung.
  - **Topik 2.1.2: Regulasi Suhu Tubuh & Pencegahan Dehidrasi/Heatstroke (Netchuushou):** Penurunan sensitivitas rasa haus dan panas, pemantauan asupan cairan minimal 1.500 mL/hari, pengaturan kelembapan kamar 50%–60% dan suhu 22°C–25°C.
  - **Topik 2.1.3: Penurunan Sistem Muskuloskeletal & Pencegahan Sarkopenia:** Penurunan massa otot, kerapuhan tulang osteoporosis (*kotsusoshoushou*), evaluasi risiko fraktur leher femur (*daitaikotsu keibu kossetsu*).
- **Topik 2.2: Memahami Patologi Demensia (認知症の理解):**
  - **Topik 2.2.1: Patologi Demensia: Gejala Inti (Chukaku Shoujou) & Disorientasi (Kentoushiki):** Perbedaan lupa fisiologis biasa vs demensia patologis, gangguan memori jangka pendek (*kioku shougai*), disorientasi waktu, tempat, dan orang (*kentoushiki shougai*).
  - **Topik 2.2.2: Gejala Perilaku & Psikologis (BPSD) serta Wandering (Haikai):** Kecemasan mendalam, delusi kecurian dompet (*monotorare mousou*), perilaku berjalan linglung mencari jalan pulang (*haikai*). Protokol: Validasi emosi, menemani berjalan tanpa membantah.
  - **Topik 2.2.3: Pendekatan Validasi Afektif & Terapi Mengingat Memori (Kaisouhou):** Teknik komunikasi mendengarkan secara aktif (*keichou*), penerimaan (*juyou*), dan stimulasi memori masa muda (*kaisouhou*) untuk menurunkan tingkat kecemasan lansia.

---

### MODUL 3: TEKNIK KOMUNIKASI & KOE-KAKE (コミュニケーション技術)
- **Topik 3.1: Protokol Komunikasi Tatap Muka & Partikel Afektif:**
  - **Topik 3.1.1: Postur Komunikasi Tatap Muka Sejajar Mata (Mesen wo Awaseru):** Menyamakan tinggi pandangan mata dengan lansia yang duduk/berbaring, kontak visual hangat, postur tubuh terbuka tanpa menyilangkan tangan.
  - **Topik 3.1.2: Downward Speech-Level Shift & Partikel Afektif (Pramesti et al. 2019 [VS-29]):** Menghindari keigo ultra-formal yang menimbulkan jarak psikologis; mengadaptasi partikel afektif lembut \`〜ね (ne)\` dan ajakan \`〜ましょうか (mashou ka)\` untuk meredakan ketegangan lansia demensia.
  - **Topik 3.1.3: Koe-kake Terstruktur dalam Bantuan Rutin Harian:** Protokol menyapa sebelum menyentuh tubuh lansia (*koe-kake*), memberi aba-aba sebelum transfer ranjang (*ichi, ni no, san de tachimagashou*).
- **Topik 3.2: Dokumentasi Klinis & Komunikasi Darurat Shift:**
  - **Topik 3.2.1: Protokol Pelaporan Operan Dinas Shift Formal (Moushiokuri):** Penyampaian ringkasan tanda vital, kondisi eliminasi, intake makan, dan keluhan nyeri secara faktual objektif tanpa opini subjektif.
  - **Topik 3.2.2: Eskalasi Kegawatan Medis Menggunakan Format SBAR (JNIOSH 2020 [VS-39]):** Pelaporan darurat kepada perawat jaga/dokter penanggung jawab: Situation (S), Background (B), Assessment (A), Recommendation (R).
  - **Topik 3.2.3: Komunikasi Interkultural & Dukungan Sejawat di Panti (Nurjaleka 2022 [VS-35]):** Strategi adaptasi budaya kerja panti lansia Jepang, bertanya klarifikasi (*kakunin*) saat instruksi meragukan, dan pemanfaatan peer scaffolding antar-caregiver Indonesia.

---

### MODUL 4: TEKNIK BANTUAN KEHIDUPAN SEHARI-HARI (生活支援技術)
- **Topik 4.1: Mekanika Tubuh Kinesiology & Ergonomi Caregiver:**
  - **Topik 4.1.1: Delapan Prinsip Kinesiology Mekanika Tubuh (Body Mechanics):** Melebarkan bidang tumpuan (*shijikitoumen*), merendahkan pusat gravitasi (*juushin*), mendekatkan tubuh lansia ke tubuh caregiver, menggunakan otot paha dan gluteus, menarik daripada mendorong, meluruskan tulang belakang tanpa memuntir pinggang.
  - **Topik 4.1.2: Ergonomi Caregiver & Pencegahan Nyeri Pinggang (You-tsuu Yobou):** Penyesuaian ketinggian ranjang elektrik setinggi pinggul caregiver, peregangan otot berkala, dan penggunaan alat bantu transfer (*sliding board*).
- **Topik 4.2: Bantuan Mobilitas & Transfer Kursi Roda (Ijou Kaijo):**
  - **Topik 4.2.1: Bantuan Transfer Ranjang ke Kursi Roda (Ijou Kaijo):** SOP penguncian rem kedua roda (*bureeki kakunin*), penaikan footrest (*futtoresuto*), penempatan kursi roda pada sudut 20°–30° di sisi sehat lansia hemiplegia.
  - **Topik 4.2.2: Bantuan Berjalan Pasien Hemiplegia & Rumus Tangga (Tsu-kan-ken):** Caregiver memposisikan diri di sisi sakit (*kansoku*); rumus naik tangga: Kaki Sehat $\\rightarrow$ Kaki Sakit $\\rightarrow$ Tongkat (*Tsuru-ken-kan*); rumus turun tangga: Tongkat $\\rightarrow$ Kaki Sakit $\\rightarrow$ Kaki Sehat (*Tsu-kan-ken*).
- **Topik 4.3: Bantuan Berpakaian & Integritas Kulit:**
  - **Topik 4.3.1: Kaidah Emas Bantuan Berpakaian Pasien Hemiplegia: Dakken-Chakukan:** Melepas pakaian dari sisi sehat terlebih dahulu (*datsuken*), mengenakan pakaian dari sisi sakit/lumpuh terlebih dahulu (*chakukan*).
  - **Topik 4.3.2: SOP Penggantian Pakaian Buka Depan vs Kaus Tubuh:** Menjaga kehangatan ruangan, menutupi dada dengan handuk, memeriksa kemerahan kulit (*sekihan*) dan tanda awal luka dekubitus (*jokusou*).
- **Topik 4.4: Bantuan Makan & Pencegahan Tersedak (Shokuji Kaijo / Enge):**
  - **Topik 4.4.1: Ergonomi Posisi Duduk Makan & Chin-Tuck (Ago wo Hiku):** Memposisikan lansia duduk tegak 90° atau posisi semi-fowler 30°–60° di ranjang dengan bantal penopang leher, kepala menunduk sedikit (*ago wo hiku*) agar epiglotis menutup saluran napas dengan sempurna.
  - **Topik 4.4.2: Protokol Pencegahan Tersedak Aspirasi & Diet Khusus Toromi:** Penggunaan bubuk pengental (*toromizai*) pada cairan minum, pemberian porsi kecil sesendok, konfirmasi gerakan menelan (*gokkun*), pemeriksaan rongga mulut dari sisa makanan pasca-makan, pertahanan posisi duduk 30 menit.
- **Topik 4.5: Bantuan Eliminasi & Mandi (Haisetsu / Nyuuyoku Kaijo):**
  - **Topik 4.5.1: Bantuan Eliminasi Toilet & Pemeliharaan Martabat Lansia:** Menghargai ritme defekasi/urinasi alami, penggunaan pispot portabel di sisi ranjang, teknik menyeka genitalia dari arah depan ke belakang (*mae kara ushiro e*) untuk mencegah infeksi saluran kemih (ISK).
  - **Topik 4.5.2: Bantuan Mandi Seishiki, Cek Suhu & Pencegahan Heat Shock:** Mengukur suhu air bak mandi 38°C–40°C, memanaskan kamar ganti 22°C–25°C guna mencegah krisis kardiovaskular *Heat Shock*, membasuh mulai dari ujung ekstremitas terjauh (kaki/tangan) menuju pusat tubuh.

---

## 4. KOSAKATA TEKNIS LAYER 2 & BILINGUAL GLOSSARY (MHLW OFFICIAL)

| No | Kanji | Kana | Romaji | Indonesian Gloss | High-Stakes Risk Category |
|---|---|---|---|---|---|
| 1 | 誤嚥 | ごえん | *goen* | Tersedak / masuknya makanan ke saluran napas | Fatal / Aspiration Pneumonia |
| 2 | 移乗 | いじょう | *ijou* | Pemindahan posisi tubuh (ranjang $\\leftrightarrow$ kursi roda) | Fall / Bone Fracture |
| 3 | 褥瘡 | じょくそう | *jokusou* | Luka dekubitus / borok tirah baring | Skin Necrosis / Sepsis |
| 4 | 片麻痺 | かたまひ | *katamahi* | Lumpuh sebelah badan (kanan / kiri) | Balance Deficit / Fall |
| 5 | 健側・患側 | けんそく・かんそく | *kensoku / kansoku* | Sisi tubuh yang sehat vs sisi yang sakit | Procedure Error |
| 6 | 申し送り | もうしおくり | *moushiokuri* | Operan dinas klinis antar-shift | Clinical Omission |
| 7 | 羞恥心 | しゅうちしん | *shuuchishin* | Rasa malu saat tubuh dibuka/dibersihkan | Dignity / Ethical Trauma |
| 8 | 嚥下困難 | えんげこんなん | *enge konnan* | Kesulitan menelan makanan padat/cair | Choking Obstruction |
| 9 | 摘便 | てきべん | *tekiben* | Tindakan evakuasi feses manual oleh perawat | Clinical Procedure |
| 10 | 経管栄養 | けいかんえいよう | *keikan eiyou* | Nutrisi melalui selang lambung (sonde/PEG) | Tube Displacement Hazard |
| 11 | バイタル測定 | ばいたるそくてい | *baitaru sokutei* | Pengukuran tanda vital (tensi, nadi, suhu, SpO2) | Clinical Monitoring |
| 12 | 脱健着患 | だっけんちゃっかん | *dakken chakukan* | Buka baju sisi sehat, pakai baju sisi sakit | Dressing SOP Hemiplegia |
| 13 | ヒートショック | ひーとしょっく | *hiito shokku* | Syok kardiogenik akibat lonjakan suhu kamar mandi | Cardiovascular Arrest |
| 14 | 認知症 | にんちしょう | *ninchishou* | Demensia / sindrom penurunan fungsi kognitif | Wandering / BPSD |
| 15 | 徘徊 | はいかい | *haikai* | Berjalan mondar-mandir linglung disorientasi | Missing Resident Hazard |
| 16 | 誤薬 | ごやく | *goyaku* | Kesalahan pemberian obat medis | Lethal Drug Adverse Event |
| 17 | 吸引器 | きゅういんき | *kyuuinki* | Mesin pengisap lendir dan dahak jalan napas | Airway Suffocation Hazard |
| 18 | 関節拘縮 | かんせつこうしゅく | *kansetsu koushuku* | Kekakuan permanen sendi akibat imobilisasi | Skeletal Joint Deformity |
| 19 | 仰臥位 | ぎょうがい | *gyougai* | Posisi tubuh telentang datar di ranjang | Vomitus Aspiration Risk |
| 20 | 側臥位 | そくがい | *sokugai* | Posisi tubuh berbaring miring lateral | Pressure Redistribution |
| 21 | 端座位 | たんざい | *tanzai* | Posisi duduk di tepi tempat tidur kaki menjuntai | Orthostatic Fall Risk |
| 22 | 尊厳の保持 | そんげんのほじ | *songen no hoji* | Pemeliharaan harkat dan martabat lansia | Human Rights Standard |
| 23 | 自己決定 | じこけってい | *jiko kettei* | Hak pasien lansia menentukan pilihan mandiri | Ethical Autonomy Violation |
| 24 | 見守り | みまもり | *mimamori* | Pengawasan observasi aktif tanpa intervensi fisik | Unobserved Fall Hazard |
| 25 | 身体拘束 | しんたいこうそく | *shintai kousoku* | Pengekangan fisik tubuh (dilarang keras!) | Human Rights Criminal Abuse |
| 26 | 高齢者虐待 | こうれいしゃぎゃくたい | *koureisha gyakutai* | Tindak kekerasan atau penelantaran lansia | Statutory Criminal Offense |
| 27 | 清拭 | せいしき | *seishiki* | Pembersihan tubuh dengan handuk hangat steril | Hypothermia & Skin Tear |
| 28 | 排泄介助 | はいせつかいじょ | *haisetsu kaijo* | Bantuan buang air besar dan kecil di toilet | Contamination & Sepsis |
| 29 | ポータブルトイレ | ぽーたぶるといれ | *pootaburu toire* | Toilet portabel di samping ranjang tidur | Tipping & Fall Hazard |
| 30 | 陰部洗浄 | いんぶせんじょう | *inbu senjou* | Pembersihan area genitalia mencegah infeksi | Urinary Tract Infection |
| 31 | とろみ剤 | とろみざい | *toromizai* | Bubuk pengental cairan minuman pencegah tersedak | Fatal Choking if Misdosed |
| 32 | 咀嚼 | そしゃく | *soshaku* | Proses mengunyah makanan dengan gigi dan rahang | Food Bolus Impaction |
| 33 | むせ | むせ | *muse* | Refleks batuk akibat cairan masuk saluran napas | Early Warning of Aspiration |
| 34 | 車椅子ブレーキ | くるまいすぶれーき | *kurumaisu bureeki* | Rem pengunci roda kursi roda | Unbraked Transfer Fall |
| 35 | フットレスト | ふっとれすと | *futtoresuto* | Pijakan kaki kursi roda (harus diangkat saat transfer) | Tibial Fracture & Skin Tear |
| 36 | 感染症対策 | かんせんしょうたいさく | *kansenshou taisaku* | Protokol pencegahan infeksi nosokomial panti | Facility-Wide Outbreak |

---

## 5. MATRIKS DIAGNOSTIK 42 ONOMATOPOEIA NYERI LANSIA (SAKAMOTO ET AL. 2014)

Kandidat dilatih mengenali sensasi nyeri dan keluhan fisik yang diucapkan lansia Jepang serta pekerja industri di fasilitas kerja, membedakan tindakan darurat medisnya berdasarkan 7 klaster fisiologis trauma:

\`\`\`
[42 ONOMATOPOEIA NYERI LANSIA BERDASARKAN ANATOMI & KEGAWATAN]

• Klaster 1: Cephalic, Cranial & Neurological Pain (頭部・神経痛)
  1. ズキズキ / ズキンズキン (zukizuki / zukin-zukin) -> Nyeri berdenyut-denyut kuat mengikuti detak nadi (こめかみがズキンズキン脈打って痛い / Migrain, arteritis temporal, radang pulpa). Ukur tensi darah & suhu.
  2. ガンガン (gan-gan) -> Sakit kepala hebat seperti dihantam palu godam (頭が割れそうにガンガン響いている / Krisis hipertensi, hematoma intrakranial, dehidrasi berat). AMBULANS 119!
  3. ズシン / ズシンズシン (zushin / zushin-zushin) -> Sakit kepala tumpul yang sangat berat menekan di tengkuk leher (後頭部がズシンと重く痛む / Hematoma subdural subakut, spondilosis servikal).
  4. ピリピリ (piripiri) -> Rasa nyeri perih kesetrum/terbakar pada jalur saraf (顔の右側だけがピリピリ痺れて痛い / Neuralgia trigeminal, prodromal herpes zoster!). Lapor perawat.
  5. チクチク (chikuchiku) -> Nyeri seperti tertusuk-tusuk jarum kecil berulang (胸のあたりがチクチク刺すように痛む / Neuralgia interkostal, iritasi epidermis, neurosis jantung).
  6. キリキリ (kirikiri) -> Nyeri menusuk tajam memutar seperti dibor di dalam kepala (頭の奥をキリキリ錐で揉まれるようだ / Cluster headache, neuralgia fokal intrakranial).
  7. ぼーっと (bōtto) -> Pikiran berkabut / linglung tidak sadar penuh (熱のせいで頭がぼーっとして考えられない / Hipertermia, keracunan CO, stroke dini). Periksa kesadaran.

• Klaster 2: Visceral, Abdominal & Gastrointestinal Pain (内臓・消化器系)
  8. キリキリ (kirikiri) -> Nyeri melilit tajam mencengkeram di ulu hati (みぞおちがキリキリ締め付けられて痛い / Ulkus gaster akut, erosi duodenum, kolik batu empedu). Hentikan makan padat.
  9. シクシク (shikushiku) -> Nyeri ngilu tumpul berkepanjangan tak kunjung reda di perut bawah (昨夜から下腹部がシクシク重く痛む / Gastritis kronis, infeksi panggul, iskemia usus).
  10. ムカムカ (mukamuka) -> Mual / eneg bergejolak di kerongkongan mau muntah (胃のあたりがムカムカして吐き気が止まらない / Gastritis, efek samping obat, ileus). Posisikan miring.
  11. ゴロゴロ (gorogoro) -> Perut berbunyi krucuk-krucuk mules hendak diare (お腹がゴロゴロ鳴って下痢しそうだ / Enteritis akut, intoleransi laktosa, keracunan makanan). Isolasi toilet.
  12. パンパン (panpan) -> Perut begah kembung keras tegang seperti balon gas (ガスが溜まってお腹がパンパンに張っている / Obstruksi usus/ileus, asites berat, retensi urin). Palpasi abdomen.
  13. キューッ / ギューッ (kyū-tto / gyū-tto) -> Nyeri seperti diperas / dicengkeram kuat-kuat (胃をギューッと鷲掴みにされたように痛い / Invaginasi usus, sindrom koroner akut). KODE GAWAT!

• Klaster 3: Epidermal, Dermatological & Mucosal Sensations (皮膚・粘膜・外傷)
  14. ヒリヒリ (hirihiri) -> Nyeri perih menyengat terbakar di lapisan kulit luar (熱湯がかかって腕がヒリヒリ焼けるように痛い / Luka bakar melepuh, ekskoriasi, dekubitus derajat 1). Kompres dingin steril.
  15. ジワジワ (jiwajiwa) -> Rembesan darah/cairan meluas perlahan tanpa henti (傷口からジワジワ血が滲み出ている / Pendarahan vena kapiler, rembesan hematoma). Lakukan penekanan luka.
  16. ムズムズ (muzumuzu) -> Rasa gatal merayap di dalam jaringan yang tak bisa digaruk (ギプスの中がムズムズ痒くてたまらない / Restless legs syndrome, pruritus dermatitis).
  17. ガサガサ (gasagasa) -> Kulit kering kasar bersisik pecah-pecah (踵がガサガサに乾いてひび割れている / Xerosis senilis, dehidrasi, prekusor luka baring). Oleskan pelembap.
  18. ジュクジュク (jukujuku) -> Luka basah becek bernanah/berlendir tak kunjung kering (褥瘡の傷口がジュクジュク湿っている / Ulkus dekubitus derajat 3-4 terinfeksi, maserasi luka). Rawat steril.
  19. ピタッと (pitat-to) -> Menempel erat merekat mati pada luka (ガーゼが傷口にピタッと張り付いて剥がれない / Kasa pembalut mengering merekat jaringan granulasi). Basahi saline steril.

• Klaster 4: Musculoskeletal, Joint, Spine & Skeletal Trauma (筋骨格・関節・脊椎)
  20. ギクッ / ギクッと (giku-tto) -> Pinggang kecetit / terkilir mendadak terkunci kaku (重い荷物を持ち上げた瞬間に腰がギクッとなった / Sprain lumbal akut/gikkuri-goshi, HNP). Fiksasi posisi nyaman.
  21. ミシミシ (mishimishi) -> Sendi berderit-derit ngilu menahan beban tubuh (歩くたびに膝の軟骨がミシミシ軋む / Osteoartritis genu lanjut, keausan tulang rawan sendi).
  22. ポキッ / ポキッと (poki-tto) -> Patah berbunyi kletuk/prak seperti ranting patah (転倒した時に手首がポキッと音を立てた / Fraktur Colles radius, fraktur klavikula). Imobilisasi bidai!
  23. ギシギシ (gishigishi) -> Sendi kaku berkarat seret digerakkan di pagi hari (指の関節がギシギシして朝曲がらない / Morning stiffness artritis reumatoid, kontraktur sendi).
  24. ジンジン (jinjin) -> Nyeri ngilu berdenyut panas pasca terbentur/tertimpa (打撲した足指がジンジン熱を持って痛む / Kontusio tulang hebat, hematoma subungual). Elevasi & kompres es.
  25. パンパン (panpan) -> Betis bengkak keras kencang menegang penuh cairan (立ち仕事で夕方になるとふくらはぎがパンパンだ / Deep vein thrombosis (DVT), edema kongestif). Waspada DVT!

• Klaster 5: Sensory, Equilibrium & Vestibular Dysfunction (感覚・平衡・意識障害)
  26. フラフラ (furafura) -> Sempoyongan / limbung melayang risiko jatuh (ベッドから降りたら足元がフラフラして倒れそう / Hipotensi ortostatik, ataksia motorik). Segera dudukkan pasien!
  27. クラクラ (kurakura) -> Pusing tujuh keliling / ruangan berputar dahsyat (急に天井がぐるぐるクラクラ回り出した / Vertigo BPPV, sindrom Meniere). Baringkan datar di ranjang.
  28. チカチカ (chikachika) -> Penglihatan berkunang-kunang silau berkedip-kedip (目の前で光がチカチカ点滅して見えにくい / Aura migrain oftalmik, fotopsia ablasio retina).
  29. ザーザー / ワンワン (zāzā / wanwan) -> Suara mendengung / bergemuruh gemercik di telinga (耳の中でザーザー滝のような音が鳴り響く / Tinitus sensorineural mendadak, oklusi vaskular).
  30. カスカス (kasukasu) -> Suara serak parau habis hanya keluar desah angin (声がカスカスになって息しか出ない / Paralisis pita suara rekuren, laringitis berat).
  31. グラグラ (guragura) -> Gigi / implan goyang mau copot (前歯がグラグラして入れ歯が噛めない / Periodontitis lanjut, bahaya gigi copot tertelan/aspirasi).

• Klaster 6: Cardiopulmonary, Respiratory & Thermal Distress (心肺・呼吸・体温異常)
  32. ドキドキ (dokidoki) -> Jantung berdebar kencang melonjak-lonjak gelisah (胸がドキドキ早鐘を打って苦しい / Takikardia supraventrikular paroksismal, fibrilasi atrium). Ukur EKG & nadi.
  33. ゼーゼー (zēzē) -> Nafas grok-grok berlendir berat tersumbat dahak (痰が絡んで喉がゼーゼー苦しそうに鳴っている / Ronki basah kasar, PPOK, risiko aspirasi sputum). Siapkan suction!
  34. ヒューヒュー (hyūhyū) -> Nafas berbunyi menciut-ciut ngik-ngik menyempit (息を吸うたびにヒューヒュー高い笛の音がする / Stridor/wheezing bronkial, asma akut, aspirasi benda asing). DARURAT!
  35. ゾクゾク (zokuzoku) -> Menggigil kedinginan hebat pertanda demam melonjak (背筋がゾクゾク寒気がして歯が鳴る / Rigor septic, bakteremia, awitan pneumonia). Selimuti & cek suhu berkala.
  36. カーッと (kātto) -> Wajah memerah panas mendadak menyengat ke ubun-ubun (顔が急にカーッと火照って熱くなる / Krisis hipertensi mendadak, heatstroke stadium 2). Buka ventilasi.

• Klaster 7: Gemba Industrial Mechanics & Factory Traumatic Injuries (製造・工場機械外傷)
  37. グシャッ / グシャッと (gusha-tto) -> Hancur remuk terlindas mesin pres/beban berat (金型に指が挟まれてグシャッと潰れた / Fraktur komunitif remuk jaringan lunak, amputasi traumatik). E-STOP!
  38. バチッ / バチッと (bachi-tto) -> Meledak kena setrum busur api listrik tegangan tinggi (分電盤に触れた瞬間、バチッと火花が飛んで弾き飛ばされた / Sengatan listrik 200V, henti jantung sekunder).
  39. プツッ / プツンと (putsu-nto) -> Putus mendadak kawat sling bertegangan tinggi (ホイストのワイヤーがプツンと切れた / Putusnya kawat kran penarik, lepasnya tegangan mekanis).
  40. ピシッ / ピシッと (pishi-tto) -> Selang hidrolik meledak pecah menyabet bertekanan (油圧ホースがピシッと破裂してオイルが噴き出した / Ruptur selang oli bertekanan, injeksi cairan fluida).
  41. ドサッ / ドサッと (dosa-tto) -> Ambruk runtuh menimpa muatan berat berdebum (パレットが崩れて鋼材がドサッと落ちてきた / Muatan palet runtuh menimpa pekerja di bawah).
  42. ツルッ / ツルッと (tsuru-tto) -> Terpeleset licin oli/air seketika terjungkal (床の油膜で足がツルッと滑って転倒した / Kehilangan traksi di lantai berminyak, cedera kepala benturan).
\`\`\`

---

## 6. BANK MODEL SOAL UJIAN CBT RESMI (MHLW ACCREDITED)

### Contoh Soal Ujian Keterampilan Kaigo (Pilihan Ganda 4):
> **Soal 1:** 介護が必要な人の自己決定を支援する上で把握すべき内容として、最も適切なものを１つ選びなさい。  
> １. 経済状況  
> ２. 医師の判断  
> ３. 家族の意向  
> ４. 介護を必要とする人の希望  
> **Kunci Jawaban:** **4** (Menghormati keinginan lansia itu sendiri sebagai inti dari *Self-Determination*).

> **Soal 2:** 右片麻痺があり、杖を使っている利用者が階段を降りるときの足の運び方として、正しいものを１つ選びなさい。  
> １. 杖 $\\rightarrow$ 右足（患側） $\\rightarrow$ 左足（健側）  
> ２. 杖 $\\rightarrow$ 左足（健側） $\\rightarrow$ 右足（患側）  
> ３. 左足（健側） $\\rightarrow$ 杖 $\\rightarrow$ 右足（患側）  
> ４. 右足（患側） $\\rightarrow$ 杖 $\\rightarrow$ 左足（健側）  
> **Kunci Jawaban:** **1** (Rumus turun tangga: *Tsu-Kan-Ken* = Tongkat $\\rightarrow$ Kaki Sakit [Kanan] $\\rightarrow$ Kaki Sehat [Kiri]).

### Contoh Soal Ujian Bahasa Jepang Kaigo:
> **Soal 1 (介護のことば):** ＿＿＿＿＿のことばと同じ意味を選んでください。  
> 「田中さん、このタオルを 更衣室 に持って行ってください。」  
> １. 運動をするところ  
> ２. 会議をするところ  
> ３. 食事をするところ  
> ４. 着替えをするところ  
> **Kunci Jawaban:** **4** (更衣室 = Ruang ganti pakaian).
`;

fs.writeFileSync(ssw01Path, content, "utf8");
console.log("SSW-01 updated successfully!");
