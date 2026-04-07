// ⚠️  LEGACY: vocab IDs in this file use old format (v-n5-s#### / v-n5-####).
// These do NOT match current vocabDB (vg-n5-00001 format).
// Lookups against vocabDB will silently return undefined.
// Pending: ID reconciliation via mapping script (see CLAUDE.md §7).
// Do NOT restructure this file until the vocab ID migration is complete.

// ══════════════════════════════════════════════════════
//  book-minna-2.js — Minna no Nihongo II · Chapter Index
//  Source: Minna no Nihongo Shokyuu II (3A Corporation)
//  Chapters: 26–50
//  Status: FILLED by Agent 3 — vocab_ids dari vocabDB N5 + N4
//
//  ⚠ INI BUKAN VOCAB ENTRIES.
//  grammar_ids dikosongkan — Grammar N5 belum ada di grammarData.
// ══════════════════════════════════════════════════════

window.bookMinna2 = {
  meta: {
    book      : 'minna-no-nihongo-2',
    title     : 'Minna no Nihongo Shokyuu II',
    publisher : '3A Corporation',
    chapters  : 25,
    jlpt_range: ['n5', 'n4'],
  },
  chapters: {

    // Ch.26 — 普通形 (Bentuk biasa/plain form)
    26: {
      topic      : '普通形 — Bentuk Biasa (Plain Form)',
      vocab_ids  : [
        'v-n5-0023',  // 食べる — makan
        'v-n5-0024',  // 飲む — minum
        'v-n5-0009',  // 行く — pergi
        'v-n5-0010',  // 来る — datang
        'v-n5-0011',  // 帰る — pulang
        'v-n5-0035',  // 起きる — bangun tidur
        'v-n5-0036',  // 寝る — tidur
        'v-n5-0032',  // 見る — melihat
        'v-n5-0033',  // 読む — membaca
        'v-n5-0012',  // 書く — menulis
        'v-n5-0013',  // 聞く — mendengar
        'v-n5-0020',  // する — melakukan
      ],
      grammar_ids: [],
    },

    // Ch.27 — 〜と思います (Menyatakan pendapat)
    27: {
      topic      : '〜と思います — Menyatakan Pendapat',
      vocab_ids  : [
        'v-n4-0403',  // 意見 — pendapat
        'v-n4-0402',  // 理由 — alasan
        'v-n4-0131',  // 決める — memutuskan
        'v-n4-0137',  // 変わる — berubah
        'v-n5-0059',  // 良い — bagus, baik
        'v-n5-0060',  // 悪い — buruk, jelek
        'v-n5-0070',  // 難しい — sulit
        'v-n5-0071',  // 易しい — mudah
        'v-n4-0547',  // 大丈夫 — tidak apa-apa
        'v-n4-0033',  // 心配 — khawatir, cemas
        'v-n5-0143',  // でも — tapi; tetapi
        'v-n5-0144',  // そして — dan kemudian; lalu
      ],
      grammar_ids: [],
    },

    // Ch.28 — 〜でしょう (Perkiraan cuaca dll)
    28: {
      topic      : '〜でしょう — Perkiraan dan Ramalan',
      vocab_ids  : [
        'v-n5-0098',  // 天気 — cuaca
        'v-n5-s0184', // 天気 (soumatome)
        'v-n5-s0382', // 晴れ — cerah
        'v-n5-s0383', // 曇り — mendung
        'v-n5-s0211', // 雨 — hujan
        'v-n5-0135',  // 雪 — salju
        'v-n4-0039',  // 台風 — topan, badai
        'v-n4-0038',  // 風 — angin
        'v-n4-0559',  // 季節 — musim
        'v-n5-0113',  // たくさん — banyak
        'v-n5-0114',  // 少し — sedikit
        'v-n5-s0313', // とても — sangat
      ],
      grammar_ids: [],
    },

    // Ch.29 — 〜ながら (Sambil melakukan sesuatu)
    29: {
      topic      : '〜ながら — Sambil Melakukan',
      vocab_ids  : [
        'v-n5-s0367', // 音楽 — musik
        'v-n5-0032',  // 見る — melihat; menonton
        'v-n5-0033',  // 読む — membaca
        'v-n5-0024',  // 飲む — minum
        'v-n5-0023',  // 食べる — makan
        'v-n5-s0396', // テレビ — televisi
        'v-n5-0043',  // 歌う — bernyanyi
        'v-n5-0007',  // 歩く — berjalan
        'v-n5-0119',  // いつも — selalu; biasanya
        'v-n5-0120',  // 時々 — kadang-kadang
        'v-n5-s0076', // 毎日 — setiap hari
        'v-n5-0117',  // 一緒に — bersama
      ],
      grammar_ids: [],
    },

    // Ch.30 — 〜てから (Setelah melakukan, urutan)
    30: {
      topic      : '〜てから — Urutan Kegiatan',
      vocab_ids  : [
        'v-n5-0046',  // 終わる — selesai
        'v-n5-0047',  // 始まる — dimulai
        'v-n5-0106',  // 始める — memulai
        'v-n4-0106',  // 始める (N4)
        'v-n5-s0057', // 前 — sebelum
        'v-n5-s0060', // 後で — setelah itu
        'v-n5-0035',  // 起きる — bangun tidur
        'v-n5-0036',  // 寝る — tidur
        'v-n5-0004',  // 浴びる — mandi shower
        'v-n5-s0294', // シャワーをあびる — mandi shower
        'v-n5-s0076', // 毎日 — setiap hari
      ],
      grammar_ids: [],
    },

    // Ch.31 — 〜たことがあります (Pengalaman)
    31: {
      topic      : '〜たことがあります — Pengalaman Pernah',
      vocab_ids  : [
        'v-n4-0400',  // 経験 — pengalaman
        'v-n4-0392',  // 機会 — kesempatan
        'v-n4-0388',  // 文化 — budaya
        'v-n4-0390',  // 習慣 — kebiasaan
        'v-n5-s0150', // 旅行 — perjalanan
        'v-n5-s0036', // 日本 — Jepang
        'v-n5-s0033', // 日本語 — bahasa Jepang
        'v-n5-0045',  // 乗る — naik (kendaraan)
        'v-n5-s0379', // 飛行機 — pesawat
        'v-n5-s0380', // 船 — kapal
      ],
      grammar_ids: [],
    },

    // Ch.32 — 〜たり〜たり (Kegiatan bergantian)
    32: {
      topic      : '〜たり〜たりします — Berbagai Kegiatan',
      vocab_ids  : [
        'v-n5-0005',  // 遊ぶ — bermain
        'v-n5-0043',  // 歌う — bernyanyi
        'v-n5-0034',  // 泳ぐ — berenang
        'v-n5-s0366', // サッカー — sepak bola
        'v-n5-s0367', // 音楽 — musik
        'v-n5-s0361', // スポーツ — olahraga
        'v-n5-0026',  // 作る — membuat
        'v-n5-0106',  // 週末 — akhir pekan
        'v-n5-0119',  // いつも — selalu; biasanya
        'v-n5-0120',  // 時々 — kadang-kadang
      ],
      grammar_ids: [],
    },

    // Ch.33 — 〜なります (Berubah menjadi)
    33: {
      topic      : '〜なります — Menyatakan Perubahan',
      vocab_ids  : [
        'v-n4-0137',  // 変わる — berubah
        'v-n4-0236',  // 増える — bertambah
        'v-n4-0238',  // 減る — berkurang
        'v-n5-0078',  // 上手 — pandai, mahir
        'v-n5-0079',  // 下手 — tidak pandai
        'v-n4-0537',  // 便利 — praktis
        'v-n4-0538',  // 不便 — tidak praktis
        'v-n5-0065',  // 新しい — baru
        'v-n5-0061',  // 高い — tinggi; mahal
        'v-n5-0062',  // 安い — murah
        'v-n4-0559',  // 季節 — musim
        'v-n5-s0093', // 新しい (soumatome)
      ],
      grammar_ids: [],
    },

    // Ch.34 — 〜くて、〜で (Menghubungkan sifat)
    34: {
      topic      : '〜くて・〜で — Menghubungkan Kata Sifat',
      vocab_ids  : [
        'v-n5-0080',  // きれい — cantik; bersih
        'v-n5-0081',  // 静か — tenang, hening
        'v-n5-0082',  // 賑やか — ramai, meriah
        'v-n5-0073',  // 可愛い — lucu, imut
        'v-n5-0067',  // 面白い — menarik, lucu
        'v-n5-0068',  // つまらない — membosankan
        'v-n5-0069',  // 美味しい — enak, lezat
        'v-n5-s0269', // おもしろい (soumatome)
        'v-n5-s0275', // やさしい (soumatome)
        'v-n4-0536',  // 親切 — ramah, baik hati
        'v-n4-0527',  // 丁寧 — sopan, teliti
        'v-n5-s0272', // 広い — luas, lebar
      ],
      grammar_ids: [],
    },

    // Ch.35 — 〜から (Alasan karena)
    35: {
      topic      : '〜から — Menyatakan Alasan',
      vocab_ids  : [
        'v-n4-0402',  // 理由 — alasan
        'v-n5-s0171', // 電車 — kereta listrik
        'v-n4-0055',  // 乗り換える — berganti kendaraan
        'v-n5-0045',  // 乗る — naik
        'v-n5-0044',  // 降りる — turun
        'v-n5-s0296', // かかる — membutuhkan (waktu/uang)
        'v-n5-s0052', // 間に合う — tepat waktu
        'v-n5-0141',  // 〜から — dari; karena
        'v-n5-0072',  // 忙しい — sibuk
        'v-n4-0030',  // 困る — kesulitan
        'v-n4-0394',  // 問題 — masalah
        'v-n4-0485',  // 説明する — menjelaskan
      ],
      grammar_ids: [],
    },

    // Ch.36 — 〜ので (Alasan sopan), 〜のに (Kontras)
    36: {
      topic      : '〜ので・〜のに — Alasan dan Kontras',
      vocab_ids  : [
        'v-n4-0403',  // 意見 — pendapat
        'v-n4-0394',  // 問題 — masalah
        'v-n4-0393',  // 場合 — situasi, kasus
        'v-n4-0030',  // 困る — kesulitan
        'v-n4-0369',  // 悩む — bingung, galau
        'v-n4-0371',  // 迷う — ragu-ragu
        'v-n4-0547',  // 大丈夫 — tidak apa-apa
        'v-n5-0072',  // 忙しい — sibuk
        'v-n5-0059',  // 良い — bagus, baik
        'v-n5-0143',  // でも — tapi; tetapi
        'v-n4-0572',  // 相談 — konsultasi
      ],
      grammar_ids: [],
    },

    // Ch.37 — 〜てはいけません、〜なければなりません (Larangan & Kewajiban)
    37: {
      topic      : '〜てはいけません・〜なければなりません — Larangan dan Kewajiban',
      vocab_ids  : [
        'v-n4-0482',  // 安全 — aman
        'v-n4-0541',  // 必要 — diperlukan
        'v-n5-0083',  // 大切 — penting
        'v-n4-0397',  // 方法 — cara, metode
        'v-n4-0166',  // 参加する — berpartisipasi
        'v-n5-0025',  // 使う — menggunakan
        'v-n5-0016',  // 消す — mematikan; menghapus
        'v-n5-0017',  // つける — menyalakan
        'v-n5-s0088', // 安心する — merasa lega
        'v-n4-0033',  // 心配 — khawatir
        'v-n5-0124',  // すみません — permisi; maaf
      ],
      grammar_ids: [],
    },

    // Ch.38 — 〜そうです (Perkiraan dari penampilan)
    38: {
      topic      : '〜そうです — Perkiraan dari Penampilan',
      vocab_ids  : [
        'v-n5-0069',  // 美味しい — enak, lezat
        'v-n5-0067',  // 面白い — menarik, lucu
        'v-n5-0070',  // 難しい — sulit
        'v-n5-0071',  // 易しい — mudah
        'v-n5-0057',  // 大きい — besar
        'v-n5-0058',  // 小さい — kecil
        'v-n4-0521',  // 怖い — takut, menakutkan
        'v-n4-0145',  // 悲しい — sedih
        'v-n4-0143',  // 喜ぶ — bergembira
        'v-n4-0367',  // 驚く — terkejut
        'v-n5-0098',  // 天気 — cuaca
        'v-n5-s0184', // 天気 (soumatome)
      ],
      grammar_ids: [],
    },

    // Ch.39 — 〜てあげる / もらう / くれる (Memberi & menerima tindakan lanjut)
    39: {
      topic      : '〜てあげる・てもらう・てくれる — Tindakan Memberi dan Menerima',
      vocab_ids  : [
        'v-n5-0051',  // あげる — memberikan
        'v-n5-0050',  // もらう — menerima
        'v-n5-0052',  // くれる — memberikan (ke saya)
        'v-n5-0041',  // 教える — mengajar; memberitahu
        'v-n5-0039',  // 貸す — meminjamkan
        'v-n5-0040',  // 借りる — meminjam
        'v-n5-0055',  // 見せる — memperlihatkan
        'v-n4-0117',  // 頼む — meminta, memohon
        'v-n4-0536',  // 親切 — ramah, baik hati
        'v-n4-0454',  // 謝る — meminta maaf
        'v-n5-0125',  // ありがとうございます — terima kasih
        'v-n5-s0088', // 安心する — merasa lega
      ],
      grammar_ids: [],
    },

    // Ch.40 — 〜すぎます (Terlalu...)
    40: {
      topic      : '〜すぎます — Terlalu Berlebihan',
      vocab_ids  : [
        'v-n5-0030',  // 働く — bekerja
        'v-n5-0061',  // 高い — tinggi; mahal
        'v-n4-0072',  // 薬 — obat
        'v-n5-s0186', // 病気 — sakit
        'v-n5-s0187', // 元気 — sehat, bersemangat
        'v-n4-0073',  // 薬局 — apotek
        'v-n5-0089',  // 病院 — rumah sakit
        'v-n5-0121',  // 頭 — kepala
      ],
      grammar_ids: [],
    },

    // Ch.41 — 〜やすい、〜にくい (Mudah/sulit dilakukan)
    41: {
      topic      : '〜やすい・〜にくい — Mudah atau Sulit Dilakukan',
      vocab_ids  : [
        'v-n5-0025',  // 使う — menggunakan
        'v-n5-0031',  // 話す — berbicara
        'v-n5-0012',  // 書く — menulis
        'v-n5-0013',  // 聞く — mendengar
        'v-n5-0042',  // 覚える — menghafal
        'v-n5-s0152', // 辞書 — kamus
        'v-n4-0537',  // 便利 — praktis
        'v-n4-0397',  // 方法 — cara, metode
      ],
      grammar_ids: [],
    },

    // Ch.42 — 〜かもしれません (Mungkin saja)
    42: {
      topic      : '〜かもしれません — Kemungkinan',
      vocab_ids  : [
        'v-n4-0369',  // 悩む — bingung
        'v-n4-0371',  // 迷う — ragu-ragu
        'v-n5-s0382', // 晴れ — cerah
        'v-n5-s0383', // 曇り — mendung
        'v-n5-s0211', // 雨 — hujan
        'v-n4-0290',  // ニュース — berita
        'v-n4-0564',  // 事故 — kecelakaan
        'v-n4-0560',  // 地震 — gempa bumi
      ],
      grammar_ids: [],
    },

    // Ch.43 — 〜ようです、〜みたいです (Sepertinya)
    43: {
      topic      : '〜ようです・〜みたいです — Sepertinya',
      vocab_ids  : [
        'v-n5-s0145', // 見える — bisa terlihat
        'v-n5-s0108', // 聞こえる — bisa terdengar
        'v-n4-0367',  // 驚く — terkejut
        'v-n4-0145',  // 悲しい — sedih
        'v-n4-0143',  // 喜ぶ — bergembira
        'v-n4-0521',  // 怖い — takut
        'v-n4-0522',  // 寂しい — sepi
        'v-n4-0372',  // 恥ずかしい — malu
        'v-n5-s0186', // 病気 — sakit
        'v-n5-s0187', // 元気 — sehat
      ],
      grammar_ids: [],
    },

    // Ch.44 — 受け身 〜られます (Passive Voice)
    44: {
      topic      : '〜られます — Bentuk Pasif',
      vocab_ids  : [
        'v-n4-0454',  // 謝る — meminta maaf
        'v-n4-0117',  // 頼む — memohon
        'v-n4-0572',  // 相談 — konsultasi
        'v-n5-0041',  // 教える — mengajar
        'v-n5-0008',  // 言う — berkata
        'v-n4-0485',  // 説明する — menjelaskan
        'v-n5-0049',  // 送る — mengirim
        'v-n4-0169',  // 返事 — balasan
        'v-n4-0114',  // 連絡 — kontak
        'v-n4-0307',  // 連絡する — menghubungi
      ],
      grammar_ids: [],
    },

    // Ch.45 — 〜てあります (Keadaan yang dipersiapkan)
    45: {
      topic      : '〜てあります — Keadaan yang Sudah Dipersiapkan',
      vocab_ids  : [
        'v-n4-0313',  // 予約する — memesan
        'v-n4-0502',  // 準備 — persiapan
        'v-n4-0178',  // 予定 — rencana
        'v-n5-0017',  // つける — menyalakan
        'v-n5-0016',  // 消す — mematikan; menghapus
        'v-n5-0002',  // 開く — terbuka
        'v-n5-s0298', // しめる — menutup
        'v-n5-s0299', // つける (soumatome)
        'v-n5-s0300', // けす (soumatome)
        'v-n5-0003',  // 開ける — membuka
        'v-n5-s0397', // エアコン — AC
        'v-n5-s0396', // テレビ — televisi
      ],
      grammar_ids: [],
    },

    // Ch.46 — 使役 〜させます (Menyuruh)
    46: {
      topic      : '〜させます — Bentuk Kausatif (Menyuruh)',
      vocab_ids  : [
        'v-n5-s0101', // 会社 — perusahaan
        'v-n5-s0096', // 社長 — direktur
        'v-n5-s0102', // 社員 — karyawan
        'v-n5-s0001', // 先生 — guru
        'v-n5-s0007', // 学生 — mahasiswa
        'v-n4-0058',  // 会議 — rapat
        'v-n4-0502',  // 準備 — persiapan
        'v-n4-0169',  // 返事 — balasan
        'v-n4-0307',  // 連絡する — menghubungi
        'v-n4-0114',  // 連絡 — kontak
      ],
      grammar_ids: [],
    },

    // Ch.47 — 〜ておく / 〜てしまう (Persiapan & penyelesalan)
    47: {
      topic      : '〜ておく・〜てしまう — Persiapan dan Penyesalan',
      vocab_ids  : [
        'v-n4-0313',  // 予約する — memesan
        'v-n4-0181',  // 計画 — rencana
        'v-n4-0178',  // 予定 — jadwal
        'v-n4-0685',  // 失敗 — kegagalan
        'v-n5-0046',  // 終わる — selesai
        'v-n5-0049',  // 送る — mengirim
        'v-n5-0037',  // 買う — membeli
      ],
      grammar_ids: [],
    },

    // Ch.48 — 敬語 (Bahasa sopan — keigo)
    48: {
      topic      : '敬語 — Bahasa Hormat (Keigo)',
      vocab_ids  : [
        'v-n4-0527',  // 丁寧 — sopan, teliti
        'v-n5-0031',  // 話す — berbicara
        'v-n5-s0001', // 先生 — guru
        'v-n5-s0096', // 社長 — direktur
        'v-n5-s0101', // 会社 — perusahaan
        'v-n5-0125',  // ありがとうございます — terima kasih
        'v-n5-0124',  // すみません — permisi; maaf
        'v-n5-0126',  // どうぞ — silakan
      ],
      grammar_ids: [],
    },

    // Ch.49 — 〜ようになります (Menjadi bisa, perubahan kemampuan)
    49: {
      topic      : '〜ようになります — Perubahan Kemampuan atau Kebiasaan',
      vocab_ids  : [
        'v-n4-0101',  // 練習 — latihan
        'v-n4-0111',  // 続ける — melanjutkan
        'v-n4-0106',  // 始める — memulai
        'v-n4-0236',  // 増える — bertambah
        'v-n5-0078',  // 上手 — pandai
        'v-n5-0079',  // 下手 — tidak pandai
        'v-n5-s0033', // 日本語 — bahasa Jepang
        'v-n4-0400',  // 経験 — pengalaman
        'v-n4-0390',  // 習慣 — kebiasaan
      ],
      grammar_ids: [],
    },

    // Ch.50 — Review & 〜まま (Keadaan tetap)
    50: {
      topic      : '〜まま — Keadaan Tetap Seperti Semula',
      vocab_ids  : [
        'v-n5-0002',  // 開く — terbuka
        'v-n5-s0298', // しめる — menutup
        'v-n5-0115',  // もう — sudah; lagi
        'v-n5-0116',  // まだ — masih; belum
        'v-n4-0111',  // 続ける — melanjutkan
        'v-n4-0392',  // 機会 — kesempatan
      ],
      grammar_ids: [],
    },

  },
};

// ══════════════════════════════════════════════════════
//  MISSING_VOCAB — Kata Minna II yang BELUM ada di vocabDB
// ══════════════════════════════════════════════════════
//
//  Ch.26 : 普通形 — grammar concept (tidak perlu vocab entry)
//  Ch.27 : 感想 (noun, N4)
//  Ch.28 : 気温 (noun, N4), たぶん/きっと (adv, N5)
//  Ch.29 : 〜ている間 — grammar pattern
//  Ch.33 : 大変な → v-n5-s0084 ✅
//  Ch.34 : 優しい (adj-i, N4/N5), 形容詞 (metalanguage)
//  Ch.35 : 遅刻する (verb-suru, N4)
//  Ch.37 : 守る (verb-u, N4), 法律 (noun, N4)
//  Ch.38 : 見た目 (noun, N4), おいしそう/楽しそう → grammar forms
//  Ch.39 : お世話 (noun, N4), 感謝 (noun-suru, N4)
//  Ch.40 : 太る (verb-u, N4), 健康 (noun, N4)
//  Ch.41 : 〜やすい/にくい — grammar pattern
//  Ch.42 : 推測/確信 (noun, N4) — metalanguage
//  Ch.46 : 命令 (noun-suru, N4), 上司/部下 (noun, N4)
//  Ch.47 : 後悔 (noun-suru, N4)
//  Ch.48 : 敬語/謙譲/尊敬 (noun, N4) — metalanguage
//  Ch.49 : 〜ようになる — grammar pattern
//  Ch.50 : 状態/継続 (noun, N4) — metalanguage
//
// ══════════════════════════════════════════════════════
