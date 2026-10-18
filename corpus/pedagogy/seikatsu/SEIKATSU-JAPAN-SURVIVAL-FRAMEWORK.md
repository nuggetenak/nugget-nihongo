# Panduan Integrasi Sipil & Bertahan Hidup di Jepang (Seikatsu Japan Survival Framework)

> **Kode Dokumen:** `SEIKATSU-JAPAN-SURVIVAL-v1.0`  
> **Domain:** Ranah Kehidupan Umum & Orientasi Sipil Jepang (100% Universal & Bebas Bias Kejuruan)  
> **Regulator Rujukan:** Badan Pelayanan Imigrasi Jepang (ISA / 出入国在留管理庁), Kementerian Kesehatan, Tenaga Kerja, dan Kesejahteraan (MHLW / 厚生労働省), Japan Pension Service (日本年金機構), Badan Kebakaran dan Penanggulangan Bencana (FDMA / 消防庁), Badan Kepolisian Nasional (NPA / 警察庁)  
> **Populasi Target:** Seluruh Pekerja Berketerampilan Spesifik (SSW / 特定技能), Pekerja Magang (TITP / 技能実習 / 育成就労), dan Tenaga Kerja Asing Asal Indonesia di Jepang  
> **Karakter Arsitektur:** Terpusat, Universal, Menjamin bahwa Ranah Vokasional SSW (Sektor 01–19) Tetap 100% Khusus Kejuruan Tanpa Tercampur Isu Sipil Umum

---

## 📌 Pengantar Arsitektural: Ranah Kehidupan Umum yang Terpusat

Berbeda dari kurikulum konvensional yang mencampuradukkan materi buang sampah dan slip gaji ke dalam buku teknis keperawatan, permesinan, atau restoran, Nugget Nihongo memusatkan seluruh kecakapan hidup sipil (*Seikatsu*) ke dalam **satu dokumen komprehensif ini**.

Setiap pekerja asing di Jepang—baik bekerja di panti lansia (*Kaigo*), pabrik makanan (*Inshoku*), hotel (*Shukuhaku*), maupun bengkel otomotif (*Seibi*)—menghadapi realitas sipil, hukum, finansial, dan medis yang **identik**. Menguasai 9 ranah survival berikut adalah syarat mutlak kesejahteraan mental, kepatuhan hukum, dan keamanan finansial selama tinggal di Jepang.

---

## 1. Literasi Finansial & Pembacaan Slip Gaji (給与明細書)

Salah satu sumber kecemasan dan kesalahpahaman terbesar bagi pekerja Indonesia di Jepang adalah perbedaan drastis antara upah kotor (*Gakumen*) dan uang bersih yang masuk ke rekening (*Tedori*).

```
┌────────────────────────────────────────────────────────────────────────┐
│               ANATOMI SLIP GAJI JEPANG (KYŪYO MEISAISHO)                │
├────────────────────────────────────────────────────────────────────────┤
│ 1. TOTAL GAJI KOTOR (総支給額 - Sōshikyūgaku / 額面 - Gakumen)        │
│    = Gaji Pokok (基本給) + Tunjangan Lembur (残業手当) + Lainnya       │
├────────────────────────────────────────────────────────────────────────┤
│ 2. TOTAL POTONGAN STATUTER & ASRAMA (控除合計額 - Kōjo Gōkeigaku)      │
│    a. Potongan Jaminan Sosial (社会保険料):                            │
│       • Asuransi Kesehatan (健康保険 - Kenkō Hoken) ~5%               │
│       • Asuransi Pensiun Kesejahteraan (厚生年金 - Kōsei Nenkin) ~9.15%│
│       • Asuransi Ketenagakerjaan (雇用保険 - Koyō Hoken) ~0.6%        │
│    b. Potongan Pajak Negara & Daerah (税金):                          │
│       • Pajak Penghasilan (所得税 - Shotokuzei)                       │
│       • Pajak Penduduk Daerah (住民税 - Jūminzei) [Mulai Tahun ke-2] │
│    c. Potongan Asrama & Utilitas (寮費・水道光熱費):                  │
│       • Sewa Kamar Asrama (家賃 / 寮費)                               │
│       • Biaya Air, Listrik, Gas (水道光熱費)                          │
├────────────────────────────────────────────────────────────────────────┤
│ 3. TOTAL GAJI BERSIH DITERIMA (差引支給額 - Sashihiki Shikyūgaku / 手取り)│
│    = Total Kotor (1) DIKURANGI Total Potongan (2)                      │
│    *Rata-rata Tedori adalah sekitar 75%–80% dari Gakumen               │
└────────────────────────────────────────────────────────────────────────┘
```

### 1.1 Kosakata Kunci Slip Gaji
- **Gakumen (額面)**: Nominal kotor yang tertulis di kontrak kerja (mis. ¥200,000).
- **Tedori (手取り)**: Uang riil yang ditransfer ke buku tabungan (mis. ¥155,000–¥165,000).
- **Kihonkyū (基本給)**: Gaji pokok sebelum lembur atau tunjangan shift malam.
- **Zangyō Teate (残業手当)**: Tunjangan lembur kerja melebihi 8 jam sehari / 40 jam seminggu.
- **Shin'ya Teate (深夜手当)**: Tunjangan kerja larut malam (antara pukul 22:00 malam hingga 05:00 pagi).
- **Yūkyū Kyūka (有給休暇)**: Cuti tahunan berbayar (hak resmi pekerja setelah 6 bulan bekerja terus-menerus).

### 1.2 Regulasi Statuter Upah Lembur (割増賃金 - Warimashi Chinkin)
Berdasarkan Undang-Undang Standar Ketenagakerjaan Jepang (*Rōdō Kijun-hō*):
1. **Lembur Biasa (Di atas 8 jam/hari)**: Wajib dibayar minimal **$+25\%$** per jam dari upah dasar.
2. **Lembur Larut Malam (22:00 – 05:00)**: Wajib dibayar minimal **$+25\%$** (Jika lembur biasa terjadi di waktu larut malam, preminya bertumpuk menjadi **$+50\%$**).
3. **Kerja di Hari Libur Resmi Statuter (法定休日出勤)**: Wajib dibayar minimal **$+35\%$** per jam.

> ⚠️ **Peringatan Pajak Tahun Kedua (Jūminzei Shock)**:
> Di tahun pertama bekerja di Jepang, pekerja tidak dipotong Pajak Penduduk (*Jūminzei*) karena pajak dihitung dari penghasilan tahun kalender sebelumnya di Jepang. **Mulai bulan Juni tahun kedua**, slip gaji akan dipotong Jūminzei sebesar kurang lebih ¥8,000–¥15,000 per bulan. Jangan kaget jika gaji bersih (*Tedori*) di tahun kedua sedikit menurun dibandingkan tahun pertama!

---

## 2. Hak Klaim Pengembalian Uang Pensiun (脱退一時金 - Dattai Ichijikin)

Setiap bulan, gaji pekerja dipotong sekitar 9.15% untuk Asuransi Pensiun Kesejahteraan (*Kōsei Nenkin*), dan perusahaan membayarkan 9.15% lainnya sebagai kontribusi pendamping (total 18.3%). Pekerja asing yang tidak berniat pensiun di Jepang memiliki **hak hukum penuh untuk mencairkan kembali uang pensiun ini** saat kontrak berakhir dan pulang ke Indonesia.

### 2.1 Nilai Nominal yang Dicairkan
Tergantung pada masa kerja dan jumlah iuran:
- **Masa Kerja 3 Tahun**: Sekitar **¥600,000 – ¥900,000** (setara **Rp 65–100 Juta**).
- **Masa Kerja 5 Tahun**: Sekitar **¥1,000,000 – ¥1,400,000** (setara **Rp 110–150 Juta**).

### 2.2 Syarat Mutlak Pengajuan Dattai Ichijikin
1. Berkewarganegaraan non-Jepang.
2. Membayar iuran pensiun (*Kōsei Nenkin*) minimal **6 bulan**.
3. Tidak lagi memiliki alamat domisili di Jepang (sudah mengajukan surat pindah keluar ke kelurahan / *Tenshutsu Todoke*).
4. Tidak pernah memiliki hak menerima uang pensiun hari tua atau disabilitas Jepang.
5. **Batas Waktu Pengajuan Statuter**: Wajib diajukan ke *Japan Pension Service* dalam waktu maksimal **2 TAHUN** sejak tanggal kehilangan domisili di Jepang. Jika lewat 2 tahun, seluruh dana hangus!

### 2.3 Prosedur Pencairan Dua Tahap (Tahap 1 & Pemulihan Pajak 20.42%)
- **Tahap 1 (Pencairan 79.58% ke Rekening Bank Indonesia)**:
  - Kirimkan formulir klaim resmi, fotokopi Paspor (lembar stempel keluar Jepang), buku tabungan Indonesia (bervaluta USD atau IDR), dan **Buku Pensiun Biru (年金手帳 - Nenkin Techō)** atau **Pemberitahuan Nomor Pensiun Dasar (基礎年金番号通知書)** ke kantor Japan Pension Service.
  - Dana sekitar 79.58% akan ditransfer langsung ke rekening bank di Indonesia dalam waktu 3–5 bulan.
- **Tahap 2 (Pengambilan Kembali Potongan Pajak Penghasilan 20.42%)**:
  - Saat dana Tahap 1 cair, pemerintah Jepang otomatis memotong pajak sebesar 20.42% dan mengirimkan lembar *Dattai Ichijikin Shikyū Kettei Tsuchisho* (Bukti Keputusan Pembayaran).
  - Pajak 20.42% ini (sekitar **Rp 15–30 Juta**) **BISA DIAMBIL KEMBALI 100%** dengan menunjuk **Pengelola Urusan Pajak (納税管理人 - Nōzei Kanrinin)** yang tinggal di Jepang (mis. kenalan, LPK mitra, atau kantor akuntan pajak resmi) untuk menyerahkan SPT Pengembalian Pajak (*Kakutei Shinkoku*) ke kantor pajak (*Zeimusho*) Jepang.

---

## 3. Protokol Panggilan Darurat: Telepon 119 & 110

Di Jepang, nomor darurat dibagi menjadi dua:
- **119**: Ambulans Medis (*Kyūkyū*) dan Pemadam Kebakaran (*Kaji* / *Shōbō*). Bebas pulsa 24 jam.
- **110**: Polisi (*Keisatsu*) untuk kecelakaan lalu lintas, kekerasan fisik, dan pencurian.

### 3.1 Skrip Telepon Resmi 119: Pemadam Kebakaran & Ambulans
Saat menelepon 119, operator akan langsung melontarkan pertanyaan pertama:
> **Operator:** 「火事ですか、救急ですか？」 (*Kaji desu ka, kyūkyū desu ka?* — Apakah kebakaran atau darurat medis/ambulans?)

#### Jawaban Kasus A: Darurat Medis / Ambulans (救急 - Kyūkyū)
> **Penelepon:** 「**救急です！**」 (*Kyūkyū desu!* — Ini darurat medis / butuh ambulans!)  
> **Operator:** 「場所はどこですか？住所を教えてください。」 (*Basho wa doko desu ka? Jūsho wo oshiete kudasai.* — Di mana lokasinya? Sebutkan alamatnya.)  
> **Penelepon:** 「住所は、**［Nama Prefektur/Kota/Kecamatan/Nomor Gedung/Nomor Kamar］**です。」  
> *(Contoh: 東京都新宿区大久保1丁目2番3号、コーポ山田201号室です。)*  
> **Operator:** 「誰が、どうしましたか？」 (*Dare ga, dō shimashita ka?* — Siapa yang sakit dan apa yang terjadi?)  
> **Penelepon:**  
> • 「同僚が突然倒れて、意識がありません！」 (*Dōryō ga totsuzen taorete, ishiki ga arimasen!* — Teman saya tiba-tiba pingsan dan tidak sadar!)  
> • 「激しい胸の痛みを訴えています！」 (*Hageshii mune no itami wo uttaete imasu!* — Mengeluh nyeri dada yang sangat hebat!)  
> • 「呼吸をしていません！」 (*Kokyū wo shite imasen!* — Korban tidak bernapas!)  
> **Operator:** 「あなたのお名前と電話番号を教えてください。」 (*Anata no onamae to denwa bangō wo oshiete kudasai.* — Sebutkan nama Anda dan nomor telepon ini.)  
> **Penelepon:** 「私の名前は［Nama Anda］です。電話番号は［090-xxxx-xxxx］です。」  
> **Tindakan Lanjutan:** Jangan tutup telepon sebelum disuruh operator. Buka kunci pintu utama gedung/apartemen agar petugas paramedis bisa langsung masuk tanpa hambatan!

#### Jawaban Kasus B: Kebakaran (火事 - Kaji)
> **Penelepon:** 「**火事です！**」 (*Kaji desu!* — Ada kebakaran!)  
> **Operator:** 「どこが燃えていますか？」 (*Doko ga moete imasu ka?* — Di mana yang terbakar?)  
> **Penelepon:** 「アパートの2階の台所から火が出ています！」 (*Apāto no nikai no daidokoro kara hi ga dete imasu!* — Api muncul dari dapur lantai 2 apartemen!)

### 3.2 Skrip Telepon 110: Polisi (Kecelakaan / Kejahatan)
> **Operator:** 「事件ですか、事故ですか？」 (*Jiken desu ka, jiko desu ka?* — Apakah ada kasus kejahatan atau kecelakaan?)  
> **Penelepon:**  
> • Kecelakaan sepeda/mobil: 「**事故です！** 自転車と車がぶつかりました。」 (*Jiko desu! Jitensha to kuruma ga butsukarimashita.*)  
> • Kemalingan/penyerangan: 「**事件です！** 泥棒に入られました。」 (*Jiken desu! Dorobō ni hairaremashita.*)

---

## 4. Navigasi Fasilitas Medis, Asuransi Kesehatan & Apotek

### 4.1 Sistem Rujukan Klinik Spesialis di Jepang
Di Jepang, masyarakat tidak langsung pergi ke rumah sakit umum besar (*Daigaku Byōin* / Rumah Sakit Universitas) kecuali dalam kondisi darurat ambulans atau membawa surat rujukan (*Shōkaijō*). Jika langsung ke rumah sakit besar tanpa rujukan, pasien akan dikenai biaya penalti tambahan (*Sentei Ryōyōhi*) sebesar ¥5,000–¥7,700 di luar biaya pengobatan!

Pekerja harus langsung menuju klinik dokter spesialis mandiri di sekitar stasiun/pemukiman:

| Nama Poli Spesialis | Huruf Kanji | Jenis Keluhan & Gejala Penyakit |
| :--- | :--- | :--- |
| **Naika** (Poli Penyakit Dalam) | 内科 | Demam tinggi, flu, batuk, pilek, diare, muntah, sakit perut, pusing. |
| **Geka** (Poli Bedah Umum) | 外科 | Luka robek berdarah, luka bakar melepuh, tertusuk benda tajam. |
| **Seikeigeka** (Poli Tulang/Ortopedi) | 整形外科 | Keseleo sendi (*nenza*), sakit pinggang (*yōtsū*), patah tulang (*kossetsu*), memar otot. |
| **Ganka** (Poli Mata) | 眼科 | Mata merah belekan, kemasukan debu/cairan kimia, pandangan buram, gatal. |
| **Hifuka** (Poli Kulit) | 皮膚科 | Eksim alergi, gatal-gatal biduran (*jinmashin*), kulit tumit pecah-pecah (*akagire*). |
| **Jibikōka** (Poli THT) | 耳鼻咽喉科 | Sakit radang tenggorokan parah, telinga berdengung, sinusitis, hidung tersumbat. |
| **Shika** (Dokter Gigi) | 歯科 | Sakit gigi berlubang, gusi bengkak berdarah, tambal gigi copot. |

### 4.2 Kartu Asuransi Kesehatan (保険証 - Hokenshō)
Seluruh pekerja SSW dan pemagang wajib memiliki kartu asuransi kesehatan (*Kenkō Hokenshō* atau My Number Card terintegrasi asuransi).
- **Cakupan Beban Biaya**: Dengan menunjukkan Hokenshō, pasien **hanya membayar 30% dari total tagihan medis** (70% ditanggung negara).
- Jika berobat tanpa membawa kartu asuransi, pasien harus membayar deposit 100% tunai saat itu juga (meskipun selisih 70% bisa diklaim kembali ke klinik dalam bulan yang sama setelah menunjukkan kartu).

### 4.3 Mengisi Formulir Kuesioner Medis (問診票 - Monshinhyō)
Sebelum diperiksa dokter, staf klinik akan memberikan formulir kertas *Monshinhyō*. Kosakata kanji vital yang wajib diisi:
- **Shishō (主訴)**: Keluhan utama penyakit.
- **Hasshō Jiki (発症時期)**: Kapan gejala mulai terasa (mis. *Kinō no yoru kara* = sejak kemarin malam; *3-nichi mae kara* = sejak 3 hari lalu).
- **Taion (体温)**: Suhu tubuh saat ini.
- **Arerugī no Umu (アレルギーの有無)**: Ada/tidaknya alergi obat atau makanan (Lingkari 有 [Ada] atau 無 [Tidak ada]).
- **Genkō Fukuyakuchū no Kusuri (現行服用中の薬)**: Obat yang sedang diminum saat ini.
- **Ninshin no Umu (妊娠の有無)**: Khusus wanita: status kehamilan (Lingkari 有 atau 無).

### 4.4 Penebusan Obat di Apotek Luar (調剤薬局 - Chōzai Yakkyoku)
Di Jepang berlaku sistem pemisahan klinik dan apotek (*I-yaku Bungyō*). Dokter klinik hanya memberikan lembar resep (*Shohōsen - 処方箋*). Pasien harus membawa resep tersebut ke apotek luar (*Chōzai Yakkyoku*) dalam waktu **maksimal 4 hari** sejak tanggal pemeriksaan (termasuk hari libur).

**Aturan Minum Obat (Fukuyaku Shiji):**
- **Shokumae (食前)**: Diminum 30 menit **sebelum** makan (perut kosong).
- **Shokugo (食後)**: Diminum 30 menit **setelah** makan (aturan paling umum).
- **Shokukan (食間)**: Diminum di antara waktu makan (sekitar 2 jam setelah makan, **bukan** saat sedang makan!).
- **Tonpuku (頓服)**: Diminum **hanya saat gejala muncul** (mis. pereda nyeri/demam saat sakit kepala parah timbul).

---

## 5. Etika Pemilahan Sampah Kota (ゴミ分別 - Gomi Bunbetsu)

Jepang memiliki regulasi pemilahan sampah paling ketat di dunia. Sampah tidak boleh dibuang sembarangan dalam satu kantong campuran. Pelanggaran pemilahan sampah akan menyebabkan kantong diberi **stiker peringatan merah/kuning dan ditinggalkan oleh truk sampah**, memicu kemarahan pemilik apartemen (*ōna*), keluhan tetangga warga Jepang, dan risiko pemutusan kontrak sewa asrama!

```
┌────────────────────────────────────────────────────────────────────────┐
│                   4 KATEGORI UTAMA PEMILAHAN SAMPAH JEPANG             │
├──────────────────┬─────────────────────────────────────────────────────┤
│ 1. Sampah Bakar  │ • Sisa makanan dapur (tiriskan airnya sebelum buang) │
│    (燃えるゴミ)  │ • Tisu bekas, kertas kotor, popok, bungkus berminyak │
│    Moeru Gomi    │ • Pakaian usang, ranting kecil, produk kayu kecil    │
│                  │ • Kantong resmi: Kantong berbayar kota (mis. Kuning)│
├──────────────────┼─────────────────────────────────────────────────────┤
│ 2. Sampah Non-   │ • Kaca beling pecah, keramik piring, bohlam pijar   │
│    Bakar         │ • Kaleng aerosol / gas portabel (WAJIB DILUBANGI!)  │
│    (燃えないゴミ)│ • Panci aluminium, pisau cutter, penggorengan wajan  │
│    Moenai Gomi   │ • Wadah logam kecil, payung rusak                    │
├──────────────────┼─────────────────────────────────────────────────────┤
│ 3. Plastik Wadah │ • Plastik berlogo tanda panah berputar "プラ" (PURA) │
│    & Daur Ulang  │ • Plastik biskuit, bungkus mi instan, kantong kresek │
│    (プラスチック)│ • Baki daging styrofoam (cuci bersih sebelum buang!) │
│    Pura Gomi     │ • Catatan: Plastik yang terkena minyak pekat masuk   │
│                  │   ke kategori Sampah Bakar (Moeru Gomi)              │
├──────────────────┼─────────────────────────────────────────────────────┤
│ 4. Botol PET &   │ • 3 LANGKAH MUTLAK MEMBUANG BOTOL PLASTIK (PET):    │
│    Kaleng Minuman│   1. Lepas tutup botol plastik ──► Masuk sampah PURA │
│    (ペットボトル)│   2. Kupas label stiker plastik ──► Masuk sampah PURA│
│    PET Botoru    │   3. Bilas bagian dalam botol ──► Injak pipih        │
│                  │ • Kaleng aluminium & botol kaca dibuang terpisah     │
└──────────────────┴─────────────────────────────────────────────────────┘
```

### 5.1 Aturan Sampah Ukuran Besar (粗大ゴミ - Sodai Gomi)
Barang rumah tangga dengan panjang salah satu sisinya **melebihi 30 cm** (kasur futon, meja belajar, kursi kantor, koper besar, kipas angin, sepeda rusak) **DILARANG KERAS** dibuang di tempat sampah biasa!
1. Hubungi pusat pembuangan sampah kota (*Sodai Gomi Uketsuke Sentā*) melalui telepon atau internet untuk memesan jadwal penjemputan.
2. Beli **Stiker Retribusi Sampah Besar (粗大ごみ処理券 - Sodai Gomi Shori-ken)** di minimarket (Convenience Store / Conbini: 7-Eleven, Lawson, FamilyMart) seharga ¥300–¥2,000 per lembar tergantung jenis barang.
3. Tempel stiker pada barang dan letakkan di titik penjemputan yang ditentukan pada pagi hari tanggal penjemputan.

### 5.2 Disiplin Jam dan Titik Pembuangan (Gomi Shūshū-bi)
- **Jam Pembuangan**: Letakkan sampah di tempat pengumpulan (*Gomi Shūsekijo*) pada **pagi hari hari penjemputan antara pukul 06:00 hingga 08:00 pagi**.
- **Larangan Malam Hari**: DILARANG membuang sampah pada malam hari sebelumnya. Sampah sisa makanan yang dibiarkan semalaman akan diacak-acak oleh kawanan burung gagak hitam (*karasu*) dan kucing liar hingga berceceran di jalanan.
- **Jaring Pengaman Gagak (Karasu Netto)**: Pastikan seluruh kantong sampah tertutup rapat di bawah jaring pelindung biru/hijau dan ditindih dengan pemberat bata/beban di sudutnya.

---

## 6. Perbankan, Transportasi & Remitansi Legal

### 6.1 Membuka Rekening Bank Pos Jepang (Yūcho Ginkō)
Bagi pekerja asing yang baru tiba di Jepang, bank komersial besar (seperti MUFG, SMBC, Mizuho) umumnya menolak pembukaan rekening reguler jika masa tinggal belum mencapai 6 bulan. **Japan Post Bank (Yūcho Ginkō - ゆうちょ銀行)** adalah institusi perbankan resmi yang paling ramah dan standar bagi pemegang visa kerja baru.

**Persyaratan Dokumen:**
1. **Kartu Tanda Tinggal (在留カード - Zairyū Card)** dengan stempel alamat tempat tinggal yang sudah didaftarkan di kantor kelurahan/kecamatan (*Shiyakusho / Kuyakusho*).
2. **Paspor Asli**.
3. **Stempel Nama (印鑑 - Inkan / 判子 - Hanko)** (Meskipun beberapa cabang Yūcho menerima tanda tangan Latin, memiliki stempel nama katakana/alfabet sangat dianjurkan untuk kelancaran administrasi Jepang).
4. Nomor kontak telepon seluler Jepang yang aktif.

Setelah rekening dibuka, pekerja akan menerima:
- **Buku Tabungan (通帳 - Tsūchō)**.
- **Kartu Tarik Tunai ATM (キャッシュカード - Kyasshu Kādo)** (dikirim via pos terdaftar dalam 1–2 minggu).

### 6.2 Kartu Transportasi Pintar (IC Card) & Tiket Komuter (定期券 - Teikiken)
- **Kartu IC (Suica / Pasmo / Icoca)**: Kartu prabayar nirkabel untuk naik kereta, bus kota, dan berbelanja di minimarket serta mesin penjual otomatis (*Jidōhanbaiki*). Dapat diisi ulang (*chāji*) di mesin tiket stasiun menggunakan uang tunai.
- **Tiket Terusan Komuter (定期券 - Teikiken)**: Jika pekerja harus naik kereta dari apartemen ke tempat kerja setiap hari, belilah Teikiken (langganan bulanan: 1 bulan, 3 bulan, atau 6 bulan) untuk rute stasiun asal ke stasiun tujuan. Tarif Teikiken memberikan diskon hingga 30%–50% dibandingkan membeli tiket harian per perjalanan, dan umumnya biaya ini diganti penuh oleh pihak perusahaan sebagai **Tunjangan Transportasi (通勤手当 - Tsūkin Teate)**.

### 6.3 Bahaya Pidana & Hukum Perbankan Gelap (地下銀行 - Chika Ginkō)
> 🚨 **PERINGATAN HUKUM STATUTER KERAS**:
> Banyak pekerja asing tergiur tawaran perorangan di media sosial (Facebook / TikTok) yang menawarkan kurs pengiriman uang ke Indonesia lebih tinggi daripada kurs resmi perbankan. Ini dikenal sebagai **Chika Ginkō (Underground Banking / Bank Gelap)**.
> 1. **Tindakan Kriminal Berat**: Menggunakan atau menjalankan jasa pengiriman uang tanpa izin resmi Badan Jasa Keuangan Jepang (FSA) melanggar *Undang-Undang Perbankan Jepang* (*Ginkō-hō*) dan *Undang-Undang Pencegahan Transfer Hasil Kejahatan*.
> 2. **Sanksi**: Ancaman hukuman penjara hingga 3 tahun, denda hingga ¥3,000,000, **pencabutan izin tinggal visa, penahanan di rumah detensi imigrasi, dan deportasi permanen ke Indonesia**!
> 3. **Larangan Memperjualbelikan Buku Tabungan / Kartu ATM**: Menjual atau meminjamkan rekening bank Jepang kepada pihak lain dengan imbalan uang (mis. ¥30,000–¥50,000) adalah **tindak pidana pencucian uang sindikat kriminal**. Nama pelaku akan masuk daftar hitam (*blacklist*) kepolisian dan sistem perbankan nasional seumur hidup.
> 4. **Gunakan Selalu Jalur Remitansi Resmi Berizin**: Gunakan operator transfer dana legal berizin FSA (seperti *SBI Remit*, *Kyodai Remittance*, *Dosh Remit*, *Smiles Mobile Remittance*, atau *Western Union*).

---

## 7. K3 & Adaptasi Iklim Musim Dingin Ekstrem

Bagi pekerja asal Indonesia yang terbiasa dengan iklim tropis bersuhu 28°C–32°C sepanjang tahun, musim dingin Jepang (dengan suhu mencapai sub-nol -5°C hingga 5°C, disertai salju tebal dan udara kering) menghadirkan bahaya fisik dan medis yang nyata.

### 7.1 Pemanas Minyak Tanah (灯油ストーブ - Tōyu Sutōbu) & Keracunan Gas CO
Di apartemen kayu atau wilayah bersalju (Hokkaido, Tohoku, Hokuriku), banyak hunian menggunakan pemanas berbahan bakar minyak tanah (*tōyu*).
- **Bahaya Keracunan Karbon Monoksida (CO)**: Pembakaran minyak tanah di dalam ruangan tertutup mengonsumsi oksigen dan melepaskan gas karbon monoksida yang tidak berwarna, tidak berbau, dan mematikan. Gejala awal keracunan CO meliputi pusing melayang, mual, sakit kepala berdenyut, dan lemas hingga kehilangan kesadaran tanpa sempat berteriak minta tolong.
- **Kewajiban Ventilasi Udara (換気 - Kanki)**:
  - **Wajib membuka jendela selama 2–3 menit minimal setiap 1 JAM SEKALI** saat pemanas menyala!
  - **DILARANG KERAS MENYALAKAN PEMANAS MINYAK TANAH SAAT TIDUR MALAM!** Matikan pemanas sebelum tidur dan gunakan selimut tebal bertingkat (*futon* / *mōfu*).

### 7.2 Pencegahan Syok Termal (ヒートショック - Heat Shock) Saat Mandi
Setiap tahun, lebih dari 10.000 orang di Jepang meninggal di bak mandi akibat fenomena *Heat Shock*.
- **Mekanisme**: Masuk dari ruangan ganti pakaian yang dingin membeku ($5^\circ\text{C}$) langsung berendam ke dalam bak mandi air panas bersuhu tinggi ($41^\circ\text{C}–42^\circ\text{C}$) menyebabkan lonjakan tekanan darah drastis secara tiba-tiba, diikuti penurunan tajam yang memicu serangan jantung mendadak atau stroke pingsan di dalam bak mandi hingga tenggelam.
- **Langkah Pencegahan**: Hangatkan ruang ganti pakaian dan kamar mandi terlebih dahulu; siramkan air hangat mulai dari ujung kaki dan tangan sebelum berendam; jangan berendam di air bersuhu lebih dari $40^\circ\text{C}$; jangan berendam langsung setelah minum minuman beralkohol atau saat badan sangat lelah.

### 7.3 Perawatan Kulit Pecah-Pecah (あかぎれ - Akagire) & Chilblains (霜焼け - Shimoyake)
Kelembapan udara musim dingin di Jepang bisa anjlok hingga di bawah 30%. Udara kering dikombinasikan dengan mencuci tangan menggunakan air dingin atau deterjen menyebabkan kulit jemari dan tumit pecah-pecah berdarah (*akagire*) serta ujung jari bengkak gatal meradang (*shimoyake*).
- Oleskan krim pelembap yang mengandung urea (*Yuria*) atau vitamin E (mis. *Vaseline* / *Oronine*) segera setelah mencuci tangan dan sebelum tidur.
- Gunakan sarung tangan karet saat mencuci piring di dapur.
- Gunakan alat pelembap udara (*Kashitsuki - 加湿器*) di dalam kamar tidur untuk menjaga kelembapan ruangan di angka 50%–60%.

### 7.4 Teknik Pakaian Bertingkat (Layering) & Innerwear Termal
Menghadapi musim dingin tidak dilakukan dengan memakai satu jaket tebal yang berat, melainkan dengan sistem pelapisan tiga lapis:
1. **Lapis Dasar (Base Layer)**: Pakaian dalam penahan panas yang menyerap keringat dan memancarkan kehangatan (mis. pakaian dalam *Heattech* / serat termal).
2. **Lapis Tengah (Mid Layer)**: Pakaian pengisolasi udara hangat (sweater wol, fleece, atau rompi bulu angsa tipis).
3. **Lapis Luar (Outer Layer)**: Jaket tahan angin dan tahan air (*windbreaker / down jacket*) untuk memblokir hembusan angin beku.

---

## 8. Literasi Belanja Makanan Halal & Identifikasi Bahan Non-Halal

Bagi pekerja Muslim asal Indonesia di Jepang, membaca label komposisi bahan makanan (*Genzairyō-mei*) di supermarket adalah rutinitas penting untuk memastikan makanan yang dikonsumsi halal dan aman.

```
┌────────────────────────────────────────────────────────────────────────┐
│             CONTOH LABEL BAHAN MAKANAN JEPANG (GENZAIRYŌ-MEI)          │
├────────────────────────────────────────────────────────────────────────┤
│ 名称: 即席スナック菓子                                                 │
│ 原材料名: 小麦粉 (国内製造)、植物油脂、でん粉、食塩、ポークエキス、    │
│           チキンエキス、粉末しょうゆ、香辛料、豚肉エキス調味料／       │
│           調味料(アミノ酸等)、乳化剤、着色料(カラメル)、ゲル化剤(ゼラチン)│
│ (一部に小麦・大豆・鶏肉・豚肉・ゼラチンを含む)                         │
└────────────────────────────────────────────────────────────────────────┘
```

### 8.1 Daftar Kanji & Katakana Bahan Turunan Babi (豚肉由来成分)
Jika salah satu istilah di bawah ini tercantum pada kolom `原材料名` (Bahan Baku), maka produk tersebut **mengandung unsur babi**:

| Istilah Jepang | Huruf Kanji / Katakana | Makna & Penjelasan |
| :--- | :--- | :--- |
| **Butaniku** | 豚肉 | Daging babi secara langsung. |
| **Pōku / Pōku Ekisu** | ポーク / ポークエキス | Ekstrak atau sari kaldu daging/tulang babi. |
| **Rādo** | ラード | Lemak babi (minyak babi padat yang sering dipakai pada biskuit, roti, dan mi ramen). |
| **Zerachin** | ゼラチン | Gelatin (sebagian besar gelatin di Jepang diproduksi dari kulit dan tulang babi; sering ditemukan pada permen jeli, yoghurt, puding, dan kapsul obat). |
| **Dōbutsu Yushi** | 動物油脂 | Lemak hewani (jika tidak dirinci hewannya, umumnya mengandung campuran lemak babi). |
| **Pōku Fureibā** | ポークフレーバー | Perisa buatan/alami babi. |

### 8.2 Daftar Istilah Alkohol Masak & Turunannya (アルコール・酒類)
Di Jepang, produk alkohol digunakan secara sangat luas dalam masakan bukan hanya sebagai minuman keras, tetapi sebagai penyedap rasa gurih, pengempuk daging, dan pengawet alami:

| Istilah Jepang | Huruf Kanji / Katakana | Makna & Penggunaan |
| :--- | :--- | :--- |
| **Mirin** | みりん / 味醂 | Minyak anggur beras manis dengan kadar alkohol sekitar 14% (sangat umum pada saus teriyaki, kecap manis jepang, kuah udon/soba). |
| **Ryōrishu** | 料理酒 | Sake/arak beras khusus memasak dengan kadar garam dan alkohol sekitar 13%–14%. |
| **Seishu / Nihonshu** | 清酒 / 日本酒 | Sake beras Jepang murni. |
| **Shusei** | 酒精 | Alkohol pangan fermentasi (sering ditambahkan pada pasta miso, saus shoyu, atau mi basah sebagai antibakteri pengawet). |
| **Yōshu** | 洋酒 | Minuman keras ala barat (rum, brandy, anggur merah) yang sering disemprotkan pada kue bolu, cokelat, dan dessert. |

### 8.3 Makanan yang Umumnya Aman & Titik Aman Belanja
- **Ikan & Makanan Laut Segar (鮮魚 - Sengyo)**: Seluruh ikan mentah/segar, cumi, udang, kepiting, dan kerang berstatus halal alami (pastikan tidak direndam saus olahan bumbu mirin).
- **Sayuran, Buah, Beras, Telur & Tahu (Tōfu)**: Halal alami.
- **Toko Impor Halal (Halal Food Stores)**: Di kota-kota besar (Tokyo, Osaka, Nagoya, Fukuoka) dan kawasan industri, terdapat toko kelontong halal (sering dikelola pedagang asal Indonesia, Pakistan, Bangladesh, atau Turki) yang menjual daging ayam dan sapi berlogo halal resmi, bumbu instan Indonesia, cabai segar, dan mi instan berlabel MUI.
- **Aplikasi Pendeteksi Halal**: Gunakan aplikasi pemindai barcode smartphone (seperti *Halal Gourmet Japan* atau aplikasi scanner kanji OCR) untuk membantu mengecek status kehalalan produk supermarket secara instan.

---

## 9. Kesehatan Mental, Homesickness & Hotline Resmi Ketenagakerjaan

Menjalani kehidupan di Jepang jauh dari keluarga dan tanah air dengan ritme kerja yang disiplin tinggi sering kali menimbulkan kelelahan fisik dan beban psikologis yang berat. Mengakui rasa lelah dan mencari bantuan adalah tanda kedewasaan profesional, bukan kelemahan.

### 9.1 Mengatasi Gegar Budaya & Depresi Musim Dingin (Winter Blues / SAD)
- **Gegar Budaya (Culture Shock)**: Berpindah dari budaya sosial Indonesia yang hangat, suka mengobrol santai (*ramah tamah*), dan toleran waktu ke budaya Jepang yang serba tepat waktu (*Gofun-mae kōdō* - hadir 5 menit sebelum jadwal), menjaga jarak sosial (*tanin*), dan sangat menjaga ketenangan (*meiwaku wo kakenai*) sering memicu rasa terisolasi dan merasa "tidak disukai". Ingatlah bahwa sikap dingin tersebut adalah norma jarak sosial publik Jepang, bukan kebencian personal.
- **Gangguan Afektif Musiman (Seasonal Affective Disorder / SAD)**: Pada musim dingin, durasi sinar matahari memendek drastis (matahari terbenam pukul 16:30 sore). Penurunan sinar matahari memicu penurunan hormon serotonin di otak yang menyebabkan kelesuan mendalam, malas beranjak dari kasur, nafsu makan drop, dan rasa rindu rumah (*homesickness*) yang melumpuhkan.
  - **Terapi Mandiri**: Berjalanlah di luar ruangan pada pagi hari untuk terkena sinar matahari minimal 20 menit; penuhi asupan vitamin D; jangan mengurung diri sendirian di kamar asrama pada hari libur; berkumpullah dengan komunitas sesama pekerja Indonesia.

### 9.2 Mengekspresikan Kondisi Kelelahan Mental dalam Bahasa Jepang
Jika Anda merasa kewalahan secara mental dan butuh berkonsultasi dengan atasan panti/perusahaan atau dokter:
- 「最近、強い不安と不眠が続いており、心身ともに限界を感じています。」  
  (*Saikin, tsuyoi fuan to fumin ga tsuzuite ori, shinshin tomo ni genkai wo kanjite imasu.*)  
  — Akhir-akhir ini saya mengalami kecemasan hebat dan susah tidur terus-menerus, dan saya merasa fisik serta mental saya sudah mencapai batasnya.
- 「言葉や環境のプレッシャーで、気持ちがひどく落ち込んでいます。」  
  (*Kotoba ya kankyō no puresshā de, kimochi ga hidoku ochikonde imasu.*)  
  — Akibat tekanan bahasa dan lingkungan, suasana hati saya drop dan sangat tertekan.

### 9.3 Daftar Layanan Konsultasi & Hotline Resmi Multilingual (Bahasa Indonesia)

Jika Anda menghadapi masalah ketenagakerjaan (gaji tidak dibayar, lembur dipaksa di luar batas regulasi, kekerasan fisik/verbal oleh atasan, paspor ditahan pihak perusahaan), **JANGAN KABUR MENJADI ILEGAL (Fuhō Taizai)**! Menjadi pekerja ilegal akan menghilangkan seluruh hak hukum, asuransi kesehatan, dan masa depan Anda di Jepang. Hubungi kanal bantuan resmi pemerintah:

1. **Hotline Tenaga Kerja Asing Kementerian Tenaga Kerja Jepang (MHLW)**
   - Bahasa: **Tersedia Konsultan Bahasa Indonesia**
   - Telepon: **0120-200-149** (Bebas Pulsa di dalam Jepang)
   - Hari & Jam Operasi: Selasa & Kamis (Pukul 10:00 – 16:00)
   - Cakupan: Sengketa gaji, pemutusan kerja sepihak, jam lembur ilegal, kompensasi kecelakaan kerja (*Rōsai*).

2. **Organisasi Pelatihan Teknis Orang Asing (OTIT - 外国人技能実習機構)**
   - Bahasa: **Bahasa Indonesia Resmi**
   - Telepon Konsultasi Khusus Indonesia: **0120-250-168** (Bebas Pulsa)
   - Cakupan: Layanan pengaduan resmi untuk pemagang dan pekerja terkait pelanggaran hak asasi, kekerasan di tempat kerja, atau pemindahan tempat kerja.

3. **Kedutaan Besar Republik Indonesia (KBRI Tokyo) & Konsulat Jenderal (KJRI Osaka)**
   - **Hotline Darurat Perlindungan WNI KBRI Tokyo**: +81-80-3506-8612 / +81-80-4942-7972
   - **Hotline Darurat KJRI Osaka**: +81-80-3113-1003
   - Cakupan: Bantuan kekerasan darurat, penahanan oleh kepolisian/imigrasi, paspor hilang, musibah bencana alam (gempa/tsunami).

4. **Yorisoi Hotline (Layanan Bantuan Konseling Jiwa & Multikultural 24 Jam)**
   - Telepon: **0120-279-338** (Tekan 2 untuk layanan bahasa asing)
   - Bebas pulsa, rahasia dijamin 100%, konsultasi kesehatan mental dan depresi.

---

## 10. Lembar Verifikasi Mandiri Kelayakan Hidup (Self-Checklist)

Sebelum memulai minggu pertama bekerja di Jepang, pastikan Anda telah menyelesaikan 10 langkah berikut:
- [ ] Zairyū Card telah dicap alamat domisili resmi di kantor kelurahan (*Kuyakusho/Shiyakusho*).
- [ ] Kartu Asuransi Kesehatan (*Hokenshō*) disimpan rapi di dalam dompet dan dibawa setiap saat.
- [ ] Mengetahui lokasi klinik *Naika* (Penyakit Dalam) dan *Seikeigeka* (Tulang) terdekat dari apartemen.
- [ ] Memiliki nomor telepon darurat KBRI/KJRI dan nomor telepon supervisor perusahaan di kontak cepat ponsel.
- [ ] Memahami kalender jadwal pembuangan sampah kota setempat (hari apa membuang *Moeru Gomi*, hari apa *Pura*).
- [ ] Mengetahui cara mematikan keran gas utama (*Gasu Motosen*) dan sakelar listrik pemutus (*Bureikā*) apartemen.
- [ ] Menginstal aplikasi penerjemah kanji dan alarm darurat gempa bumi (*Yurekuru Call* / *Safety Tips*).
- [ ] Buku Tabungan Pensiun (*Nenkin Techō*) disimpan di tempat yang aman (bukan diserahkan permanen ke pihak luar).
- [ ] Mengetahui jalur evakuasi bencana (*Hinanjō*) terdekat (biasanya gedung SD atau taman umum setempat).
- [ ] Mengetahui rute kereta dan memiliki kartu IC prabayar (*Suica / Pasmo*) yang terisi saldo darurat.
