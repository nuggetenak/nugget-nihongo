// ══════════════════════════════════════════════════════
//  book-minna-1.js — Nugget Nihongo Book Lens
//  Plan C migration: all vocab_ids updated to vg-* format
//  Migrated: 2026-04-11 · v15.6.1
// ══════════════════════════════════════════════════════

window.bookMinna1 = {
  meta: {
      "book": "minna-no-nihongo-1",
      "title": "Minna no Nihongo Shokyuu I",
      "publisher": "3A Corporation",
      "chapters": 25,
      "jlpt_range": [
          "n5",
          "n4"
      ]
  },
  units: {

    1: {
      topic      : "わたしは〜です — Perkenalan dan Profesi",
      vocab_ids  : [
        'vg-n5-00093', // 先生 — guru
        'vg-n5-00417', // 学生 — mahasiswa
        'vg-n5-00414', // 生徒 — murid, pelajar
        'vg-n5-00418', // 日本人 — orang Jepang
        'vg-n5-00419', // 外国人 — orang asing
        'vg-n5-00421', // 人 — orang
        'vg-n5-00435', // 名前 — nama
        'vg-n5-00441', // 日本 — Jepang
        'vg-n5-00439', // 日本語 — bahasa Jepang
        'vg-n5-00440', // 英語 — bahasa Inggris
        'vg-n5-00424', // 国 — negara
        'vg-n5-00488', // 社長 — direktur, presiden perusahaan
        'vg-n5-00491', // 社員 — karyawan
      ],
      grammar_ids: ['gn5-00001', 'gn5-00002', 'gn5-00018', 'gn5-00016', 'gn5-00017', 'gn5-00005'],
    },

    2: {
      topic      : "これは〜です — Menanyakan Benda",
      vocab_ids  : [
        'vg-n5-00108', // 本 — buku
        'vg-n5-00108', // 本 — buku
        'vg-n5-00526', // 辞書 — kamus
        'vg-n5-00486', // 新聞 — koran
        'vg-n5-00406', // ノート — buku catatan
        'vg-n5-00394', // パソコン — komputer
        'vg-n5-00393', // スマホ — smartphone; HP
        'vg-n5-00449', // 時計 — jam tangan, jam
        'vg-n5-00489', // 円 — ① bulat ② yen (mata uang)
        'vg-n5-00099', // お金 — uang
        'vg-n5-00037', // 買う — membeli
        'vg-n5-00126', // どうぞ — silakan
      ],
      grammar_ids: ['gn5-00017', 'gn5-00016', 'gn5-00018'],
    },

    3: {
      topic      : "ここは〜です — Menanyakan Tempat",
      vocab_ids  : [
        'vg-n5-00088', // 駅 — stasiun
        'vg-n5-00089', // 病院 — rumah sakit
        'vg-n5-00524', // 銀行 — bank
        'vg-n5-00086', // 会社 — perusahaan
        'vg-n5-00085', // 学校 — pendidikan
        'vg-n5-00545', // お手洗い — toilet, kamar mandi
        'vg-n5-00557', // 店 — toko
        'vg-n5-00556', // 喫茶店 — kafe
        'vg-n5-00149', // 右 — kanan
        'vg-n5-00150', // 左 — kiri
        'vg-n5-00512', // 上 — atas
        'vg-n5-00515', // 下 — bawah
      ],
      grammar_ids: ['gn5-00009', 'gn5-00011', 'gn5-00062'],
    },

    4: {
      topic      : "今〜時です — Jam dan Waktu",
      vocab_ids  : [
        'vg-n5-00094', // 時間 — waktu; jam (durasi)
        'vg-n5-00466', // 今 — sekarang
        'vg-n5-00459', // 午後 — sore/siang (setelah jam 12)
        'vg-n5-00460', // 午前 — pagi (sebelum jam 12)
        'vg-n5-00104', // 朝 — pagi
        'vg-n5-00105', // 夜 — malam
        'vg-n5-00443', // 何時 — jam berapa
        'vg-n5-00450', // 五分 — 5 menit
        'vg-n5-00457', // 七時半 — setengah delapan / jam 7:30
        'vg-n5-00519', // 休み — hari libur, istirahat
      ],
      grammar_ids: ['gn5-00010', 'gn5-00020'],
    },

    5: {
      topic      : "行きます・来ます・帰ります — Pergerakan",
      vocab_ids  : [
        'vg-n5-00009', // 行く — pergi
        'vg-n5-00010', // 来る — datang
        'vg-n5-00011', // 帰る — pulang, kembali ke rumah
        'vg-n5-00027', // 出かける — keluar, pergi keluar
        'vg-n5-00087', // 電車 — kereta listrik
        'vg-n5-00514', // 地下鉄 — kereta bawah tanah, MRT
        'vg-n5-00538', // 自転車 — sepeda
        'vg-n5-00713', // 飛行機 — pesawat
        'vg-n5-00092', // 友達 — teman
        'vg-n5-00095', // 今日 — hari ini
        'vg-n5-00096', // 明日 — besok
        'vg-n5-00097', // 昨日 — kemarin
      ],
      grammar_ids: ['gn5-00013', 'gn5-00012', 'gn5-00015', 'gn5-00027'],
    },

    6: {
      topic      : "食べます・飲みます — Kegiatan Sehari-hari",
      vocab_ids  : [
        'vg-n5-00023', // 食べる — makan
        'vg-n5-00024', // 飲む — minum
        'vg-n5-00032', // 見る — melihat; menonton
        'vg-n5-00013', // 聞く — mendengar; bertanya
        'vg-n5-00033', // 読む — membaca
        'vg-n5-00012', // 書く — menulis
        'vg-n5-00037', // 買う — membeli
        'vg-n5-00035', // 起きる — bangun (tidur); terjadi
        'vg-n5-00036', // 寝る — tidur
        'vg-n5-00136', // ご飯 — nasi; makanan
        'vg-n5-00137', // 水 — air
        'vg-n5-00475', // 毎日 — setiap hari
        'vg-n5-00119', // いつも — selalu; biasanya
      ],
      grammar_ids: ['gn5-00007', 'gn5-00011', 'gn5-00089', 'gn5-00087', 'gn5-00016'],
    },

    7: {
      topic      : "あげます・もらいます — Memberi dan Menerima",
      vocab_ids  : [
        'vg-n5-00051', // あげる — memberikan (ke orang lain)
        'vg-n5-00050', // もらう — menerima (dari orang lain)
        'vg-n5-00052', // くれる — memberikan (ke saya)
        'vg-n5-00049', // 送る — mengirim; mengantarkan
        'vg-n5-00416', // 誕生日 — ulang tahun
        'vg-n5-00133', // 花 — bunga
        'vg-n5-00133', // 花 — bunga
        'vg-n5-00539', // 花びん — vas bunga
        'vg-n5-00092', // 友達 — teman
        'vg-n5-00101', // 家族 — keluarga
        'vg-n5-00125', // ありがとうございます — terima kasih
        'vg-n5-00039', // 貸す — meminjamkan
        'vg-n5-00040', // 借りる — meminjam
      ],
      grammar_ids: ['gn5-00037', 'gn5-00038', 'gn5-00039'],
    },

    8: {
      topic      : "〜ませんか — Ajakan Kegiatan",
      vocab_ids  : [
        'vg-n5-00540', // 花見 — melihat bunga sakura
        'vg-n5-00541', // 花火 — kembang api
        'vg-n5-00005', // 遊ぶ — bermain, bersenang-senang
        'vg-n5-00715', // 音楽 — musik
        'vg-n5-00525', // 旅行 — perjalanan, wisata
        'vg-n5-00117', // 一緒に — bersama
        'vg-n5-00001', // 会う — bertemu
        'vg-n5-00095', // 今日 — hari ini
        'vg-n5-00096', // 明日 — besok
        'vg-n5-00106', // 週末 — akhir pekan
        'vg-n5-00043', // 歌う — bernyanyi
        'vg-n5-00034', // 泳ぐ — berenang
      ],
      grammar_ids: ['gn5-00043', 'gn5-00042', 'gn5-00044'],
    },

    9: {
      topic      : "あります・います — Keberadaan Benda dan Orang",
      vocab_ids  : [
        'vg-n5-00054', // ある — ada (benda mati)
        'vg-n5-00053', // いる — ada (makhluk hidup)
        'vg-n5-00293', // つくえ — meja (belajar)
        'vg-n5-00294', // いす — kursi
        'vg-n5-00390', // テレビ — televisi
        'vg-n5-00409', // エアコン — AC
        'vg-n5-00682', // ベッド — tempat tidur
        'vg-n5-00149', // 右 — kanan
        'vg-n5-00150', // 左 — kiri
        'vg-n5-00512', // 上 — atas
        'vg-n5-00515', // 下 — bawah
        'vg-n5-00494', // 中 — dalam, di dalam
        'vg-n5-00463', // 後ろ — belakang
        'vg-n5-00461', // 前 — depan, sebelum
        'vg-n5-00517', // 外 — luar
      ],
      grammar_ids: ['gn5-00061', 'gn5-00062', 'gn5-00009'],
    },

    10: {
      topic      : "好きですか — Kesukaan dan Hobi",
      vocab_ids  : [
        'vg-n5-00076', // 好き — suka
        'vg-n5-00077', // 嫌い — tidak suka
        'vg-n5-00078', // 上手 — pandai, mahir
        'vg-n5-00079', // 下手 — tidak pandai, kurang mahir
        'vg-n5-00715', // 音楽 — musik
        'vg-n5-00397', // スポーツ — olahraga
        'vg-n5-00398', // サッカー — sepak bola
        'vg-n5-00399', // テニス — tenis
        'vg-n5-00659', // すいえい — renang
        'vg-n5-00043', // 歌う — bernyanyi
        'vg-n5-00033', // 読む — membaca
        'vg-n5-00032', // 見る — melihat; menonton
      ],
      grammar_ids: ['gn5-00006', 'gn5-00091', 'gn5-00087', 'gn5-00093'],
    },

    11: {
      topic      : "どんな〜ですか — Deskripsi Tempat",
      vocab_ids  : [
        'vg-n5-00054', // ある — ada (benda mati)
        'vg-n5-00053', // いる — ada (makhluk hidup)
        'vg-n5-00712', // 公園 — taman
        'vg-n5-00131', // 山 — gunung
        'vg-n5-00132', // 川 — sungai
        'vg-n5-00133', // 花 — bunga
        'vg-n5-00132', // 川 — sungai
        'vg-n5-00131', // 山 — gunung
        'vg-n5-00438', // 富士山 — Gunung Fuji
        'vg-n5-00081', // 静か — tenang, hening
        'vg-n5-00082', // 賑やか — ramai, meriah
        'vg-n5-00716', // 広い — luas; lebar
        'vg-n5-00717', // 狭い — sempit; kecil
      ],
      grammar_ids: ['gn5-00024', 'gn5-00025', 'gn5-00057', 'gn5-00093'],
    },

    12: {
      topic      : "もう〜ましたか — Sudah atau Belum",
      vocab_ids  : [
        'vg-n5-00115', // もう — sudah; lagi
        'vg-n5-00116', // まだ — masih; belum
        'vg-n5-00046', // 終わる — selesai, berakhir
        'vg-n5-00047', // 始まる — dimulai
        'vg-n5-00012', // 書く — menulis
        'vg-n5-00112', // 手紙 — surat
        'vg-n5-00049', // 送る — mengirim; mengantarkan
        'vg-n5-00012', // 書く — menulis
        'vg-n5-00033', // 読む — membaca
        'vg-n5-00037', // 買う — membeli
      ],
      grammar_ids: ['gn5-00082', 'gn5-00083'],
    },

    13: {
      topic      : "電話します — Komunikasi",
      vocab_ids  : [
        'vg-n5-00111', // 電話 — telepon
        'vg-n5-00111', // 電話 — telepon
        'vg-n5-00535', // 電気 — listrik, lampu
        'vg-n5-00031', // 話す — berbicara
        'vg-n5-00041', // 教える — mengajar; memberitahu
        'vg-n5-00055', // 見せる — memperlihatkan
        'vg-n5-00013', // 聞く — mendengar; bertanya
        'vg-n5-00031', // 話す — berbicara
        'vg-n5-00536', // 話 — pembicaraan, cerita
        'vg-n5-00008', // 言う — berkata, mengatakan
        'vg-n5-00008', // 言う — berkata, mengatakan
      ],
      grammar_ids: ['gn5-00030', 'gn5-00031', 'gn5-00032'],
    },

    14: {
      topic      : "大きいですか — Kata Sifat い",
      vocab_ids  : [
        'vg-n5-00057', // 大きい — besar
        'vg-n5-00058', // 小さい — kecil
        'vg-n5-00065', // 新しい — baru
        'vg-n5-00066', // 古い — lama, tua (benda)
        'vg-n5-00061', // 高い — tinggi; mahal
        'vg-n5-00062', // 安い — murah
        'vg-n5-00063', // 暑い — panas (cuaca/udara)
        'vg-n5-00064', // 寒い — dingin (cuaca)
        'vg-n5-00074', // 長い — panjang; lama
        'vg-n5-00075', // 短い — pendek; singkat
        'vg-n5-00072', // 忙しい — sibuk
        'vg-n5-00070', // 難しい — sulit
        'vg-n5-00071', // 易しい — mudah, gampang
        'vg-n5-00059', // 良い — bagus, baik
      ],
      grammar_ids: ['gn5-00057', 'gn5-00058', 'gn5-00060', 'gn5-00021'],
    },

    15: {
      topic      : "静かな〜です — Kata Sifat な",
      vocab_ids  : [
        'vg-n5-00080', // きれい — cantik; bersih
        'vg-n5-00081', // 静か — tenang, hening
        'vg-n5-00082', // 賑やか — ramai, meriah
        'vg-n5-00083', // 大切 — penting, berharga
        'vg-n5-00083', // 大切 — penting, berharga
        'vg-n5-00723', // 大変 — sangat; parah; berat
        'vg-n5-00724', // 有名 — terkenal; termasyhur
        'vg-n4-00447', // 安全 — keselamatan; keamanan
        'vg-n5-00076', // 好き — suka
        'vg-n5-00720', // 暇 — waktu luang; tidak sibuk
        'vg-n4-00502', // 便利 — praktis; mudah; berguna
        'vg-n4-00503', // 不便 — tidak praktis; tidak nyaman
        'vg-n4-00501', // 親切 — baik hati; ramah
      ],
      grammar_ids: ['gn5-00026', 'gn5-00084', 'gn5-00040'],
    },

    16: {
      topic      : "〜たいです — Menyatakan Keinginan",
      vocab_ids  : [
        'vg-n5-00009', // 行く — pergi
        'vg-n5-00023', // 食べる — makan
        'vg-n5-00525', // 旅行 — perjalanan, wisata
        'vg-n4-00042', // 海 — laut
        'vg-n5-00131', // 山 — gunung
        'vg-n5-00721', // 遊園地 — taman hiburan
        'vg-n4-00475', // 動物園 — kebun binatang
        'vg-n5-00107', // 来年 — tahun depan
      ],
      grammar_ids: ['gn5-00040', 'gn5-00041'],
    },

    17: {
      topic      : "〜ています — Keadaan Sedang Berlangsung",
      vocab_ids  : [
        'vg-n5-00018', // 知る — mengetahui
        'vg-n5-00019', // 住む — tinggal, menetap
        'vg-n5-00030', // 働く — bekerja
        'vg-n5-00111', // 電話 — telepon
        'vg-n5-00725', // 勤める — bekerja di (perusahaan/instansi)
        'vg-n5-00019', // 住む — tinggal, menetap
        'vg-n5-00030', // 働く — bekerja
        'vg-n4-00684', // 結婚する — menikah
        'vg-n5-00101', // 家族 — keluarga
        'vg-n5-00086', // 会社 — perusahaan
        'vg-n5-00019', // 住む — tinggal, menetap
      ],
      grammar_ids: ['gn5-00029', 'gn5-00089'],
    },

    18: {
      topic      : "〜まえに・〜てから — Sebelum dan Sesudah",
      vocab_ids  : [
        'vg-n5-00461', // 前 — depan, sebelum
        'vg-n5-00462', // 後で — nanti, setelah itu
        'vg-n5-00046', // 終わる — selesai, berakhir
        'vg-n5-00047', // 始まる — dimulai
        'vg-n5-00035', // 起きる — bangun (tidur); terjadi
        'vg-n5-00036', // 寝る — tidur
        'vg-n5-00056', // 生まれる — lahir
        'vg-n5-00104', // 朝 — pagi
        'vg-n5-00105', // 夜 — malam
        'vg-n5-00475', // 毎日 — setiap hari
      ],
      grammar_ids: ['gn5-00054', 'gn5-00033', 'gn5-00055'],
    },

    19: {
      topic      : "〜てあげます — Memberi dan Menerima Tindakan",
      vocab_ids  : [
        'vg-n5-00051', // あげる — memberikan (ke orang lain)
        'vg-n5-00050', // もらう — menerima (dari orang lain)
        'vg-n5-00052', // くれる — memberikan (ke saya)
        'vg-n5-00041', // 教える — mengajar; memberitahu
        'vg-n5-00055', // 見せる — memperlihatkan
        'vg-n5-00039', // 貸す — meminjamkan
        'vg-n5-00040', // 借りる — meminjam
        'vg-n5-00548', // 足す — menambahkan
        'vg-n5-00001', // 会う — bertemu
        'vg-n5-00125', // ありがとうございます — terima kasih
      ],
      grammar_ids: ['gn5-00037', 'gn5-00038', 'gn5-00039'],
    },

    20: {
      topic      : "〜てみます — Mencoba Melakukan Sesuatu",
      vocab_ids  : [
        'vg-n5-00024', // 飲む — minum
        'vg-n5-00042', // 覚える — mengingat; menghafal
        'vg-n5-00399', // テニス — tenis
        'vg-n4-00365', // 経験 — pengalaman
        'vg-n4-00357', // 機会 — kesempatan, peluang
        'vg-n5-00119', // いつも — selalu; biasanya
        'vg-n5-00120', // 時々 — kadang-kadang
      ],
      grammar_ids: ['gn5-00036'],
    },

    21: {
      topic      : "〜ておきます — Persiapan untuk Nanti",
      vocab_ids  : [
        'vg-n5-00026', // 作る — membuat
        'vg-n4-00674', // 予約する — memesan, mereservasi
        'vg-n4-00467', // 準備 — persiapan
        'vg-n4-00176', // 予定 — rencana, jadwal
        'vg-n4-00179', // 計画 — rencana, proyek
        'vg-n5-00025', // 使う — menggunakan
        'vg-n4-00282', // キャンセル — pembatalan, membatalkan
      ],
      grammar_ids: ['gn4-00017'],
    },

    22: {
      topic      : "〜てもらいます — Meminta Bantuan",
      vocab_ids  : [
        'vg-n4-00116', // 頼む — meminta tolong, memohon
        'vg-n4-00537', // 相談 — konsultasi; diskusi
        'vg-n4-00501', // 親切 — baik hati; ramah
        'vg-n4-00492', // 丁寧 — sopan; teliti; seksama
        'vg-n5-00124', // すみません — permisi; maaf
        'vg-n5-00484', // 安心する — merasa lega
      ],
      grammar_ids: ['gn5-00038', 'gn4-00033', 'gn4-00034'],
    },

    23: {
      topic      : "〜てしまいます — Menyesal atau Tak Sengaja",
      vocab_ids  : [
        'vg-n4-00650', // 失敗 — kegagalan; kesalahan
        'vg-n4-00419', // 謝る — meminta maaf
        'vg-n4-00029', // 困る — kebingungan, kesulitan
        'vg-n4-00336', // 悩む — merasa dilema, khawatir
        'vg-n4-00335', // 驚く — terkejut, terkagum
        'vg-n5-00048', // 押す — mendorong; menekan
        'vg-n5-00016', // 消す — mematikan; menghapus
        'vg-n5-00124', // すみません — permisi; maaf
        'vg-n5-00060', // 悪い — buruk, jelek
        'vg-n4-00032', // 心配 — khawatir, cemas
        'vg-n4-00512', // 大丈夫 — tidak apa-apa; baik-baik saja
      ],
      grammar_ids: ['gn5-00080'],
    },

    24: {
      topic      : "〜てあります・〜ています — Keadaan Hasil Tindakan",
      vocab_ids  : [
        'vg-n5-00017', // つける — menyalakan; menempelkan
        'vg-n5-00016', // 消す — mematikan; menghapus
        'vg-n5-00002', // 開く — terbuka
        'vg-n5-00003', // 開ける — membuka
        'vg-n5-00194', // しめる — menutup
        'vg-n5-00617', // しまる — tertutup
        'vg-n5-00616', // あく — terbuka
        'vg-n5-00089', // 病院 — rumah sakit
        'vg-n5-00542', // 病気 — sakit, penyakit
        'vg-n5-00543', // 元気 — sehat, bersemangat
        'vg-n4-00071', // 薬 — obat
        'vg-n5-00121', // 頭 — kepala
      ],
      grammar_ids: ['gn4-00018', 'gn4-00019'],
    },

    25: {
      topic      : "〜たら・〜ば — Kondisi dan Syarat",
      vocab_ids  : [
        'vg-n4-00136', // 変わる — berubah
        'vg-n4-00133', // 選ぶ — memilih
        'vg-n4-00130', // 決める — memutuskan, menentukan
        'vg-n4-00234', // 増える — bertambah (intransitif)
        'vg-n4-00236', // 減る — berkurang (intransitif)
        'vg-n4-00359', // 問題 — masalah, soal
        'vg-n4-00367', // 理由 — alasan
        'vg-n4-00512', // 大丈夫 — tidak apa-apa; baik-baik saja
        'vg-n5-00059', // 良い — bagus, baik
        'vg-n5-00143', // でも — tapi; tetapi
        'vg-n5-00144', // そして — dan kemudian; lalu
        'vg-n4-00368', // 意見 — pendapat, opini
      ],
      grammar_ids: ['gn5-00047', 'gn5-00049', 'gn5-00048'],
    },
  },
};
