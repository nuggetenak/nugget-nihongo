// ══════════════════════════════════════════════════════
//  book-minna-2.js — Nugget Nihongo Book Lens
//  Plan C migration: all vocab_ids updated to vg-* format
//  Migrated: 2026-04-11 · v15.6.1
// ══════════════════════════════════════════════════════

window.bookMinna2 = {
  meta: {
      "book": "minna-no-nihongo-2",
      "title": "Minna no Nihongo Shokyuu II",
      "publisher": "3A Corporation",
      "chapters": 25,
      "jlpt_range": [
          "n5",
          "n4"
      ]
  },
  units: {

    26: {
      topic      : "普通形 — Bentuk Biasa (Plain Form)",
      vocab_ids  : [
        'vg-n5-00023', // 食べる — makan
        'vg-n5-00024', // 飲む — minum
        'vg-n5-00009', // 行く — pergi
        'vg-n5-00010', // 来る — datang
        'vg-n5-00011', // 帰る — pulang, kembali ke rumah
        'vg-n5-00035', // 起きる — bangun (tidur); terjadi
        'vg-n5-00036', // 寝る — tidur
        'vg-n5-00032', // 見る — melihat; menonton
        'vg-n5-00033', // 読む — membaca
        'vg-n5-00012', // 書く — menulis
        'vg-n5-00013', // 聞く — mendengar; bertanya
        'vg-n5-00020', // する — melakukan
      ],
      grammar_ids: ['gn5-00027', 'gn5-00028', 'gn4-00048'],
    },

    27: {
      topic      : "〜と思います — Menyatakan Pendapat",
      vocab_ids  : [
        'vg-n4-00368', // 意見 — pendapat, opini
        'vg-n4-00367', // 理由 — alasan
        'vg-n4-00130', // 決める — memutuskan, menentukan
        'vg-n4-00136', // 変わる — berubah
        'vg-n5-00059', // 良い — bagus, baik
        'vg-n5-00060', // 悪い — buruk, jelek
        'vg-n5-00070', // 難しい — sulit
        'vg-n5-00071', // 易しい — mudah, gampang
        'vg-n4-00512', // 大丈夫 — tidak apa-apa; baik-baik saja
        'vg-n4-00032', // 心配 — khawatir, cemas
        'vg-n5-00143', // でも — tapi; tetapi
        'vg-n5-00144', // そして — dan kemudian; lalu
      ],
      grammar_ids: ['gn4-00047', 'gn5-00072'],
    },

    28: {
      topic      : "〜でしょう — Perkiraan dan Ramalan",
      vocab_ids  : [
        'vg-n5-00098', // 天気 — cuaca
        'vg-n5-00098', // 天気 — cuaca
        'vg-n5-00672', // はれ — cerah
        'vg-n5-00673', // くもり — mendung
        'vg-n5-00134', // 雨 — hujan
        'vg-n5-00135', // 雪 — salju
        'vg-n4-00038', // 台風 — topan, taifun
        'vg-n4-00037', // 風 — angin
        'vg-n4-00524', // 季節 — musim
        'vg-n5-00113', // たくさん — banyak
        'vg-n5-00114', // 少し — sedikit
        'vg-n5-00626', // とても — sangat
      ],
      grammar_ids: ['gn5-00045', 'gn4-00023'],
    },

    29: {
      topic      : "〜ながら — Sambil Melakukan",
      vocab_ids  : [
        'vg-n5-00715', // 音楽 — musik
        'vg-n5-00032', // 見る — melihat; menonton
        'vg-n5-00033', // 読む — membaca
        'vg-n5-00024', // 飲む — minum
        'vg-n5-00023', // 食べる — makan
        'vg-n5-00390', // テレビ — televisi
        'vg-n5-00043', // 歌う — bernyanyi
        'vg-n5-00007', // 歩く — berjalan
        'vg-n5-00119', // いつも — selalu; biasanya
        'vg-n5-00120', // 時々 — kadang-kadang
        'vg-n5-00475', // 毎日 — setiap hari
        'vg-n5-00117', // 一緒に — bersama
      ],
      grammar_ids: ['gn4-00087', 'gn4-00053', 'gn4-00085'],
    },

    30: {
      topic      : "〜てから — Urutan Kegiatan",
      vocab_ids  : [
        'vg-n5-00046', // 終わる — selesai, berakhir
        'vg-n5-00047', // 始まる — dimulai
        'vg-n5-00106', // 週末 — akhir pekan
        'vg-n4-00105', // 始める — memulai
        'vg-n5-00461', // 前 — depan, sebelum
        'vg-n5-00462', // 後で — nanti, setelah itu
        'vg-n5-00035', // 起きる — bangun (tidur); terjadi
        'vg-n5-00036', // 寝る — tidur
        'vg-n5-00004', // 浴びる — mandi shower, terkena (sinar)
        'vg-n5-00615', // シャワーをあびる — mandi shower
        'vg-n5-00475', // 毎日 — setiap hari
      ],
      grammar_ids: ['gn4-00046'],
    },

    31: {
      topic      : "〜たことがあります — Pengalaman Pernah",
      vocab_ids  : [
        'vg-n4-00365', // 経験 — pengalaman
        'vg-n4-00357', // 機会 — kesempatan, peluang
        'vg-n4-00353', // 文化 — budaya
        'vg-n4-00355', // 習慣 — kebiasaan, adat
        'vg-n5-00525', // 旅行 — perjalanan, wisata
        'vg-n5-00441', // 日本 — Jepang
        'vg-n5-00439', // 日本語 — bahasa Jepang
        'vg-n5-00045', // 乗る — naik (kendaraan)
        'vg-n5-00713', // 飛行機 — pesawat
        'vg-n5-00714', // 船 — kapal
      ],
      grammar_ids: ['gn5-00050'],
    },

    32: {
      topic      : "〜たり〜たりします — Berbagai Kegiatan",
      vocab_ids  : [
        'vg-n5-00005', // 遊ぶ — bermain, bersenang-senang
        'vg-n5-00043', // 歌う — bernyanyi
        'vg-n5-00034', // 泳ぐ — berenang
        'vg-n5-00398', // サッカー — sepak bola
        'vg-n5-00715', // 音楽 — musik
        'vg-n5-00397', // スポーツ — olahraga
        'vg-n5-00026', // 作る — membuat
        'vg-n5-00106', // 週末 — akhir pekan
        'vg-n5-00119', // いつも — selalu; biasanya
        'vg-n5-00120', // 時々 — kadang-kadang
      ],
      grammar_ids: ['gn5-00051', 'gn4-00089'],
    },

    33: {
      topic      : "〜なります — Menyatakan Perubahan",
      vocab_ids  : [
        'vg-n4-00136', // 変わる — berubah
        'vg-n4-00234', // 増える — bertambah (intransitif)
        'vg-n4-00236', // 減る — berkurang (intransitif)
        'vg-n5-00078', // 上手 — pandai, mahir
        'vg-n5-00079', // 下手 — tidak pandai, kurang mahir
        'vg-n4-00502', // 便利 — praktis; mudah; berguna
        'vg-n4-00503', // 不便 — tidak praktis; tidak nyaman
        'vg-n5-00065', // 新しい — baru
        'vg-n5-00061', // 高い — tinggi; mahal
        'vg-n5-00062', // 安い — murah
        'vg-n4-00524', // 季節 — musim
        'vg-n5-00065', // 新しい — baru
      ],
      grammar_ids: ['gn5-00072', 'gn4-00047'],
    },

    34: {
      topic      : "〜くて・〜で — Menghubungkan Kata Sifat",
      vocab_ids  : [
        'vg-n5-00080', // きれい — cantik; bersih
        'vg-n5-00081', // 静か — tenang, hening
        'vg-n5-00082', // 賑やか — ramai, meriah
        'vg-n5-00073', // 可愛い — lucu, imut
        'vg-n5-00067', // 面白い — menarik, lucu
        'vg-n5-00068', // つまらない — membosankan
        'vg-n5-00069', // 美味しい — enak, lezat
        'vg-n5-00271', // おもしろい — menarik, seru
        'vg-n5-00270', // やさしい — baik hati; lembut
        'vg-n4-00501', // 親切 — baik hati; ramah
        'vg-n4-00492', // 丁寧 — sopan; teliti; seksama
        'vg-n5-00716', // 広い — luas; lebar
      ],
      grammar_ids: ['gn5-00080', 'gn4-00065'],
    },

    35: {
      topic      : "〜から — Menyatakan Alasan",
      vocab_ids  : [
        'vg-n4-00367', // 理由 — alasan
        'vg-n5-00087', // 電車 — kereta listrik
        'vg-n4-00054', // 乗り換える — transit, ganti kendaraan
        'vg-n5-00045', // 乗る — naik (kendaraan)
        'vg-n5-00044', // 降りる — turun (dari kendaraan)
        'vg-n5-00180', // かかる — membutuhkan (waktu/biaya)
        'vg-n5-00456', // 間に合う — tepat waktu
        'vg-n5-00072', // 忙しい — sibuk
        'vg-n4-00029', // 困る — kebingungan, kesulitan
        'vg-n4-00359', // 問題 — masalah, soal
        'vg-n4-00660', // 説明する — menjelaskan
      ],
      grammar_ids: ['gn4-00034'],
    },

    36: {
      topic      : "〜ので・〜のに — Alasan dan Kontras",
      vocab_ids  : [
        'vg-n4-00368', // 意見 — pendapat, opini
        'vg-n4-00359', // 問題 — masalah, soal
        'vg-n4-00358', // 場合 — kasus, situasi, kondisi
        'vg-n4-00029', // 困る — kebingungan, kesulitan
        'vg-n4-00336', // 悩む — merasa dilema, khawatir
        'vg-n4-00338', // 迷う — tersesat; bingung memilih
        'vg-n4-00512', // 大丈夫 — tidak apa-apa; baik-baik saja
        'vg-n5-00072', // 忙しい — sibuk
        'vg-n5-00059', // 良い — bagus, baik
        'vg-n5-00143', // でも — tapi; tetapi
        'vg-n4-00537', // 相談 — konsultasi; diskusi
      ],
      grammar_ids: ['gn4-00028'],
    },

    37: {
      topic      : "〜てはいけません・〜なければなりません — Larangan dan Kewajiban",
      vocab_ids  : [
        'vg-n4-00447', // 安全 — keselamatan; keamanan
        'vg-n4-00506', // 必要 — perlu; diperlukan
        'vg-n5-00083', // 大切 — penting, berharga
        'vg-n4-00362', // 方法 — cara, metode
        'vg-n4-00658', // 参加する — berpartisipasi, ikut serta
        'vg-n5-00025', // 使う — menggunakan
        'vg-n5-00016', // 消す — mematikan; menghapus
        'vg-n5-00017', // つける — menyalakan; menempelkan
        'vg-n5-00484', // 安心する — merasa lega
        'vg-n4-00032', // 心配 — khawatir, cemas
        'vg-n5-00124', // すみません — permisi; maaf
      ],
      grammar_ids: ['gn4-00032', 'gn4-00033'],
    },

    38: {
      topic      : "〜そうです — Perkiraan dari Penampilan",
      vocab_ids  : [
        'vg-n5-00069', // 美味しい — enak, lezat
        'vg-n5-00067', // 面白い — menarik, lucu
        'vg-n5-00070', // 難しい — sulit
        'vg-n5-00071', // 易しい — mudah, gampang
        'vg-n5-00057', // 大きい — besar
        'vg-n5-00058', // 小さい — kecil
        'vg-n4-00486', // 怖い — menakutkan; seram
        'vg-n4-00144', // 悲しい — sedih
        'vg-n4-00142', // 喜ぶ — merasa senang, bergembira
        'vg-n4-00335', // 驚く — terkejut, terkagum
        'vg-n5-00098', // 天気 — cuaca
        'vg-n5-00098', // 天気 — cuaca
      ],
      grammar_ids: ['gn4-00029'],
    },

    39: {
      topic      : "〜てあげる・てもらう・てくれる — Tindakan Memberi dan Menerima",
      vocab_ids  : [
        'vg-n5-00051', // あげる — memberikan (ke orang lain)
        'vg-n5-00050', // もらう — menerima (dari orang lain)
        'vg-n5-00052', // くれる — memberikan (ke saya)
        'vg-n5-00041', // 教える — mengajar; memberitahu
        'vg-n5-00039', // 貸す — meminjamkan
        'vg-n5-00040', // 借りる — meminjam
        'vg-n5-00055', // 見せる — memperlihatkan
        'vg-n4-00116', // 頼む — meminta tolong, memohon
        'vg-n4-00501', // 親切 — baik hati; ramah
        'vg-n4-00419', // 謝る — meminta maaf
        'vg-n5-00125', // ありがとうございます — terima kasih
        'vg-n5-00484', // 安心する — merasa lega
      ],
      grammar_ids: ['gn4-00030'],
    },

    40: {
      topic      : "〜すぎます — Terlalu Berlebihan",
      vocab_ids  : [
        'vg-n5-00030', // 働く — bekerja
        'vg-n5-00061', // 高い — tinggi; mahal
        'vg-n4-00071', // 薬 — obat
        'vg-n5-00542', // 病気 — sakit, penyakit
        'vg-n5-00543', // 元気 — sehat, bersemangat
        'vg-n4-00072', // 薬局 — apotek
        'vg-n5-00089', // 病院 — rumah sakit
        'vg-n5-00121', // 頭 — kepala
      ],
      grammar_ids: ['gn4-00040'],
    },

    41: {
      topic      : "〜やすい・〜にくい — Mudah atau Sulit Dilakukan",
      vocab_ids  : [
        'vg-n5-00025', // 使う — menggunakan
        'vg-n5-00031', // 話す — berbicara
        'vg-n5-00012', // 書く — menulis
        'vg-n5-00013', // 聞く — mendengar; bertanya
        'vg-n5-00042', // 覚える — mengingat; menghafal
        'vg-n5-00526', // 辞書 — kamus
        'vg-n4-00502', // 便利 — praktis; mudah; berguna
        'vg-n4-00362', // 方法 — cara, metode
      ],
      grammar_ids: ['gn4-00041'],
    },

    42: {
      topic      : "〜かもしれません — Kemungkinan",
      vocab_ids  : [
        'vg-n4-00336', // 悩む — merasa dilema, khawatir
        'vg-n4-00338', // 迷う — tersesat; bingung memilih
        'vg-n5-00672', // はれ — cerah
        'vg-n5-00673', // くもり — mendung
        'vg-n5-00134', // 雨 — hujan
        'vg-n4-00288', // ニュース — berita
        'vg-n4-00529', // 事故 — kecelakaan
        'vg-n4-00525', // 地震 — gempa bumi
      ],
      grammar_ids: ['gn4-00063'],
    },

    43: {
      topic      : "〜ようです・〜みたいです — Sepertinya",
      vocab_ids  : [
        'vg-n5-00523', // 見える — bisa terlihat
        'vg-n5-00495', // 聞こえる — bisa terdengar
        'vg-n4-00335', // 驚く — terkejut, terkagum
        'vg-n4-00144', // 悲しい — sedih
        'vg-n4-00142', // 喜ぶ — merasa senang, bergembira
        'vg-n4-00486', // 怖い — menakutkan; seram
        'vg-n4-00487', // 寂しい — kesepian
        'vg-n4-00339', // 恥ずかしい — malu
        'vg-n5-00542', // 病気 — sakit, penyakit
        'vg-n5-00543', // 元気 — sehat, bersemangat
      ],
      grammar_ids: ['gn5-00048'],
    },

    44: {
      topic      : "〜られます — Bentuk Pasif",
      vocab_ids  : [
        'vg-n4-00419', // 謝る — meminta maaf
        'vg-n4-00116', // 頼む — meminta tolong, memohon
        'vg-n4-00537', // 相談 — konsultasi; diskusi
        'vg-n5-00041', // 教える — mengajar; memberitahu
        'vg-n5-00008', // 言う — berkata, mengatakan
        'vg-n4-00660', // 説明する — menjelaskan
        'vg-n5-00049', // 送る — mengirim; mengantarkan
        'vg-n4-00167', // 返事 — jawaban, balasan
        'vg-n4-00113', // 連絡 — kontak, menghubungi
        'vg-n4-00668', // 連絡する — menghubungi
      ],
      grammar_ids: ['gn4-00035'],
    },

    45: {
      topic      : "〜てあります — Keadaan yang Sudah Dipersiapkan",
      vocab_ids  : [
        'vg-n4-00674', // 予約する — memesan, mereservasi
        'vg-n4-00467', // 準備 — persiapan
        'vg-n4-00176', // 予定 — rencana, jadwal
        'vg-n5-00017', // つける — menyalakan; menempelkan
        'vg-n5-00016', // 消す — mematikan; menghapus
        'vg-n5-00002', // 開く — terbuka
        'vg-n5-00194', // しめる — menutup
        'vg-n5-00017', // つける — menyalakan; menempelkan
        'vg-n5-00190', // けす — mematikan; menghapus
        'vg-n5-00003', // 開ける — membuka
        'vg-n5-00409', // エアコン — AC
        'vg-n5-00390', // テレビ — televisi
      ],
      grammar_ids: ['gn4-00031'],
    },

    46: {
      topic      : "〜させます — Bentuk Kausatif (Menyuruh)",
      vocab_ids  : [
        'vg-n5-00086', // 会社 — perusahaan
        'vg-n5-00488', // 社長 — direktur, presiden perusahaan
        'vg-n5-00491', // 社員 — karyawan
        'vg-n5-00093', // 先生 — guru
        'vg-n5-00417', // 学生 — mahasiswa
        'vg-n4-00057', // 会議 — rapat, konferensi
        'vg-n4-00467', // 準備 — persiapan
        'vg-n4-00167', // 返事 — jawaban, balasan
        'vg-n4-00668', // 連絡する — menghubungi
        'vg-n4-00113', // 連絡 — kontak, menghubungi
      ],
      grammar_ids: ['gn4-00034', 'gn4-00025', 'gn4-00026'],
    },

    47: {
      topic      : "〜ておく・〜てしまう — Persiapan dan Penyesalan",
      vocab_ids  : [
        'vg-n4-00674', // 予約する — memesan, mereservasi
        'vg-n4-00179', // 計画 — rencana, proyek
        'vg-n4-00176', // 予定 — rencana, jadwal
        'vg-n4-00650', // 失敗 — kegagalan; kesalahan
        'vg-n5-00046', // 終わる — selesai, berakhir
        'vg-n5-00049', // 送る — mengirim; mengantarkan
        'vg-n5-00037', // 買う — membeli
      ],
      grammar_ids: ['gn4-00083', 'gn4-00084', 'gn4-00055'],
    },

    48: {
      topic      : "敬語 — Bahasa Hormat (Keigo)",
      vocab_ids  : [
        'vg-n4-00492', // 丁寧 — sopan; teliti; seksama
        'vg-n5-00031', // 話す — berbicara
        'vg-n5-00093', // 先生 — guru
        'vg-n5-00488', // 社長 — direktur, presiden perusahaan
        'vg-n5-00086', // 会社 — perusahaan
        'vg-n5-00125', // ありがとうございます — terima kasih
        'vg-n5-00124', // すみません — permisi; maaf
        'vg-n5-00126', // どうぞ — silakan
      ],
      grammar_ids: ['gn4-00068', 'gn4-00044', 'gn4-00045'],
    },

    49: {
      topic      : "〜ようになります — Perubahan Kemampuan atau Kebiasaan",
      vocab_ids  : [
        'vg-n4-00100', // 練習 — latihan, berlatih
        'vg-n4-00110', // 続ける — melanjutkan
        'vg-n4-00105', // 始める — memulai
        'vg-n4-00234', // 増える — bertambah (intransitif)
        'vg-n5-00078', // 上手 — pandai, mahir
        'vg-n5-00079', // 下手 — tidak pandai, kurang mahir
        'vg-n5-00439', // 日本語 — bahasa Jepang
        'vg-n4-00365', // 経験 — pengalaman
        'vg-n4-00355', // 習慣 — kebiasaan, adat
      ],
      grammar_ids: ['gn4-00056', 'gn4-00058', 'gn4-00076'],
    },

    50: {
      topic      : "〜まま — Keadaan Tetap Seperti Semula",
      vocab_ids  : [
        'vg-n5-00002', // 開く — terbuka
        'vg-n5-00194', // しめる — menutup
        'vg-n5-00115', // もう — sudah; lagi
        'vg-n5-00116', // まだ — masih; belum
        'vg-n4-00110', // 続ける — melanjutkan
        'vg-n4-00357', // 機会 — kesempatan, peluang
      ],
      grammar_ids: ['gn4-00009', 'gn4-00072'],
    },
  },
};
