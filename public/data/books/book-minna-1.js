// ⚠️  LEGACY: vocab IDs in this file use old format (v-n5-s#### / v-n5-####).
// These do NOT match current vocabDB (vg-n5-00001 format).
// Lookups against vocabDB will silently return undefined.
// Pending: ID reconciliation via mapping script (see CLAUDE.md §7).
// Do NOT restructure this file until the vocab ID migration is complete.

// ══════════════════════════════════════════════════════
//  book-minna-1.js — Minna no Nihongo I · Chapter Index
//  Source: Minna no Nihongo Shokyuu I (3A Corporation)
//  Chapters: 1–25
//  Status: FILLED by Agent 3 — vocab_ids dari vocabDB N5 + N4
//
//  ⚠ INI BUKAN VOCAB ENTRIES.
//  File ini hanya menyimpan referensi vocab_ids dan grammar_ids
//  yang sudah ada di vocab-n*.js dan grammar data files.
//  Single source of truth tetap di vocab-n*.js.
//
//  Catatan grammar_ids:
//    Grammar N5 belum ada di grammarData (hanya N3 & N4).
//    grammar_ids dikosongkan — diisi saat Agent Grammar N5 selesai.
//
//  Schema tiap chapter:
//    vocab_ids   : string[]  — id dari vocab-nX-*.js
//    grammar_ids : string[]  — id dari grammarData (nX-wY.js)
//    topic       : string    — tema chapter
// ══════════════════════════════════════════════════════

window.bookMinna1 = {
  meta: {
    book      : 'minna-no-nihongo-1',
    title     : 'Minna no Nihongo Shokyuu I',
    publisher : '3A Corporation',
    chapters  : 25,
    jlpt_range: ['n5', 'n4'],
  },
  chapters: {

    // Ch.1 — わたしは マリアです (Perkenalan diri, profesi)
    1: {
      topic      : 'わたしは〜です — Perkenalan dan Profesi',
      vocab_ids  : [
        'v-n5-s0001', // 先生 — guru
        'v-n5-s0007', // 学生 — mahasiswa
        'v-n5-s0004', // 生徒 — murid, pelajar
        'v-n5-s0009', // 日本人 — orang Jepang
        'v-n5-s0010', // 外国人 — orang asing
        'v-n5-s0012', // 人 — orang
        'v-n5-s0028', // 名前 — nama
        'v-n5-s0036', // 日本 — Jepang
        'v-n5-s0033', // 日本語 — bahasa Jepang
        'v-n5-s0034', // 英語 — bahasa Inggris
        'v-n5-s0015', // 国 — negara
        'v-n5-s0096', // 社長 — direktur
        'v-n5-s0102', // 社員 — karyawan
      ],
      grammar_ids: [],
    },

    // Ch.2 — これは なんですか (Benda di sekitar)
    2: {
      topic      : 'これは〜です — Menanyakan Benda',
      vocab_ids  : [
        'v-n5-s0035', // 本 — buku
        'v-n5-0108',  // 本 (core) — buku
        'v-n5-s0152', // 辞書 — kamus
        'v-n5-s0092', // 新聞 — koran
        'v-n5-s0400', // ノート — buku catatan
        'v-n5-s0401', // パソコン — komputer
        'v-n5-s0403', // スマホ — smartphone
        'v-n5-s0044', // 時計 — jam tangan
        'v-n5-s0098', // 円 — yen
        'v-n5-0099',  // お金 — uang
        'v-n5-0037',  // 買う — membeli
        'v-n5-0126',  // どうぞ — silakan
      ],
      grammar_ids: [],
    },

    // Ch.3 — ここは どこですか (Tempat)
    3: {
      topic      : 'ここは〜です — Menanyakan Tempat',
      vocab_ids  : [
        'v-n5-0088',  // 駅 — stasiun
        'v-n5-0089',  // 病院 — rumah sakit
        'v-n5-s0149', // 銀行 — bank
        'v-n5-s0101', // 会社 — perusahaan
        'v-n5-0085',  // 学校 — sekolah
        'v-n5-s0190', // お手洗い — toilet
        'v-n5-s0207', // 店 — toko
        'v-n5-s0206', // 喫茶店 — kafe
        'v-n5-0149',  // 右 — kanan
        'v-n5-0150',  // 左 — kiri
        'v-n5-s0129', // 上 — atas
        'v-n5-s0132', // 下 — bawah
      ],
      grammar_ids: [],
    },

    // Ch.4 — 今 なんじですか (Waktu, jam)
    4: {
      topic      : '今〜時です — Jam dan Waktu',
      vocab_ids  : [
        'v-n5-0094',  // 時間 — waktu; jam (durasi)
        'v-n5-s0064', // 今 — sekarang
        'v-n5-s0055', // 午後 — siang/sore
        'v-n5-s0056', // 午前 — pagi (sebelum jam 12)
        'v-n5-0104',  // 朝 — pagi
        'v-n5-0105',  // 夜 — malam
        'v-n5-s0038', // 何時 — jam berapa
        'v-n5-s0045', // 五分 — 5 menit
        'v-n5-s0053', // 七時半 — jam 7:30
        'v-n5-0141',  // 〜から — dari; karena
        'v-n5-0142',  // 〜まで — sampai; hingga
        'v-n5-s0140', // 休み — hari libur, istirahat
      ],
      grammar_ids: [],
    },

    // Ch.5 — 行きます 来ます 帰ります (Pergi, datang, pulang)
    5: {
      topic      : '行きます・来ます・帰ります — Pergerakan',
      vocab_ids  : [
        'v-n5-0009',  // 行く — pergi
        'v-n5-0010',  // 来る — datang
        'v-n5-0011',  // 帰る — pulang
        'v-n5-0027',  // 出かける — keluar, pergi keluar
        'v-n5-s0171', // 電車 — kereta listrik
        'v-n5-s0131', // 地下鉄 — MRT
        'v-n5-s0178', // 自転車 — sepeda
        'v-n5-s0379', // 飛行機 — pesawat
        'v-n5-0092',  // 友達 — teman
        'v-n5-0095',  // 今日 — hari ini
        'v-n5-0096',  // 明日 — besok
        'v-n5-0097',  // 昨日 — kemarin
      ],
      grammar_ids: [],
    },

    // Ch.6 — 食べます 飲みます (Makan, minum, kegiatan sehari-hari)
    6: {
      topic      : '食べます・飲みます — Kegiatan Sehari-hari',
      vocab_ids  : [
        'v-n5-0023',  // 食べる — makan
        'v-n5-0024',  // 飲む — minum
        'v-n5-0032',  // 見る — melihat; menonton
        'v-n5-0013',  // 聞く — mendengar; bertanya
        'v-n5-0033',  // 読む — membaca
        'v-n5-0012',  // 書く — menulis
        'v-n5-0037',  // 買う — membeli
        'v-n5-0035',  // 起きる — bangun tidur
        'v-n5-0036',  // 寝る — tidur
        'v-n5-0136',  // ご飯 — nasi; makanan
        'v-n5-0137',  // 水 — air
        'v-n5-s0076', // 毎日 — setiap hari
        'v-n5-0119',  // いつも — selalu; biasanya
      ],
      grammar_ids: [],
    },

    // Ch.7 — あげます もらいます (Memberi & Menerima)
    7: {
      topic      : 'あげます・もらいます — Memberi dan Menerima',
      vocab_ids  : [
        'v-n5-0051',  // あげる — memberikan (ke orang lain)
        'v-n5-0050',  // もらう — menerima
        'v-n5-0052',  // くれる — memberikan (ke saya)
        'v-n5-0049',  // 送る — mengirim; mengantarkan
        'v-n5-s0006', // 誕生日 — ulang tahun
        'v-n5-0133',  // 花 — bunga
        'v-n5-s0181', // 花 (soumatome) — bunga
        'v-n5-s0180', // 花びん — vas bunga
        'v-n5-0092',  // 友達 — teman
        'v-n5-0101',  // 家族 — keluarga
        'v-n5-0125',  // ありがとうございます — terima kasih
        'v-n5-0039',  // 貸す — meminjamkan
        'v-n5-0040',  // 借りる — meminjam
      ],
      grammar_ids: [],
    },

    // Ch.8 — 〜ませんか (Ajakan, kegiatan)
    8: {
      topic      : '〜ませんか — Ajakan Kegiatan',
      vocab_ids  : [
        'v-n5-s0182', // 花見 — melihat bunga sakura
        'v-n5-s0183', // 花火 — kembang api
        'v-n5-0005',  // 遊ぶ — bermain
        'v-n5-s0367', // 音楽 — musik
        'v-n5-s0150', // 旅行 — perjalanan, wisata
        'v-n5-0117',  // 一緒に — bersama
        'v-n5-0001',  // 会う — bertemu
        'v-n5-0095',  // 今日 — hari ini
        'v-n5-0096',  // 明日 — besok
        'v-n5-0106',  // 週末 — akhir pekan
        'v-n5-0043',  // 歌う — bernyanyi
        'v-n5-0034',  // 泳ぐ — berenang
      ],
      grammar_ids: [],
    },

    // Ch.9 — あります います (Keberadaan benda & makhluk hidup)
    9: {
      topic      : 'あります・います — Keberadaan Benda dan Orang',
      vocab_ids  : [
        'v-n5-0054',  // ある — ada (benda mati)
        'v-n5-0053',  // いる — ada (makhluk hidup)
        'v-n5-s0393', // つくえ — meja belajar
        'v-n5-s0394', // いす — kursi
        'v-n5-s0396', // テレビ — televisi
        'v-n5-s0397', // エアコン — AC
        'v-n5-s0392', // ベッド — tempat tidur
        'v-n5-0149',  // 右 — kanan
        'v-n5-0150',  // 左 — kiri
        'v-n5-s0129', // 上 — atas
        'v-n5-s0132', // 下 — bawah
        'v-n5-s0105', // 中 — dalam, di dalam
        'v-n5-s0061', // 後ろ — belakang
        'v-n5-s0057', // 前 — depan; sebelum
        'v-n5-s0138', // 外 — luar
      ],
      grammar_ids: [],
    },

    // Ch.10 — 好きですか (Kesukaan, hobi)
    10: {
      topic      : '好きですか — Kesukaan dan Hobi',
      vocab_ids  : [
        'v-n5-0076',  // 好き — suka
        'v-n5-0077',  // 嫌い — tidak suka
        'v-n5-0078',  // 上手 — pandai, mahir
        'v-n5-0079',  // 下手 — tidak pandai
        'v-n5-s0367', // 音楽 — musik
        'v-n5-s0361', // スポーツ — olahraga
        'v-n5-s0366', // サッカー — sepak bola
        'v-n5-s0364', // テニス — tenis
        'v-n5-s0365', // 水泳 — renang
        'v-n5-0043',  // 歌う — bernyanyi
        'v-n5-0033',  // 読む — membaca
        'v-n5-0032',  // 見る — melihat; menonton
      ],
      grammar_ids: [],
    },

    // Ch.11 — どんな〜ですか (Deskripsi tempat, ada apa di mana)
    11: {
      topic      : 'どんな〜ですか — Deskripsi Tempat',
      vocab_ids  : [
        'v-n5-0054',  // ある — ada (benda mati)
        'v-n5-0053',  // いる — ada (makhluk hidup)
        'v-n5-s0357', // 公園 — taman
        'v-n5-0131',  // 山 — gunung
        'v-n5-0132',  // 川 — sungai
        'v-n5-0133',  // 花 — bunga
        'v-n5-s0200', // 川 (soumatome) — sungai
        'v-n5-s0032', // 山 (soumatome) — gunung
        'v-n5-s0031', // 富士山 — Gunung Fuji
        'v-n5-0081',  // 静か — tenang, hening
        'v-n5-0082',  // 賑やか — ramai, meriah
        'v-n5-s0272', // 広い — luas, lebar
        'v-n5-s0271', // 狭い — sempit
      ],
      grammar_ids: [],
    },

    // Ch.12 — もう〜ましたか (Sudah/belum, kegiatan yang sudah selesai)
    12: {
      topic      : 'もう〜ましたか — Sudah atau Belum',
      vocab_ids  : [
        'v-n5-0115',  // もう — sudah; lagi
        'v-n5-0116',  // まだ — masih; belum
        'v-n5-0046',  // 終わる — selesai, berakhir
        'v-n5-0047',  // 始まる — dimulai
        'v-n5-0012',  // 書く — menulis
        'v-n5-0112',  // 手紙 — surat
        'v-n5-0049',  // 送る — mengirim
        'v-n5-s0153', // 書く (soumatome)
        'v-n5-s0154', // 読む (soumatome)
        'v-n5-s0155', // 買う (soumatome)
      ],
      grammar_ids: [],
    },

    // Ch.13 — 電話します (Telepon, komunikasi)
    13: {
      topic      : '電話します — Komunikasi',
      vocab_ids  : [
        'v-n5-0111',  // 電話 — telepon
        'v-n5-s0173', // 電話 (soumatome) — telepon
        'v-n5-s0172', // 電気 — listrik, lampu
        'v-n5-0031',  // 話す — berbicara
        'v-n5-0041',  // 教える — mengajar; memberitahu
        'v-n5-0055',  // 見せる — memperlihatkan
        'v-n5-0013',  // 聞く — mendengar; bertanya
        'v-n5-s0175', // 話す (soumatome)
        'v-n5-s0176', // 話 — pembicaraan, cerita
        'v-n5-0008',  // 言う — berkata
        'v-n5-s0147', // 言う (soumatome)
      ],
      grammar_ids: [],
    },

    // Ch.14 — 大きいですか (Kata sifat い)
    14: {
      topic      : '大きいですか — Kata Sifat い',
      vocab_ids  : [
        'v-n5-0057',  // 大きい — besar
        'v-n5-0058',  // 小さい — kecil
        'v-n5-0065',  // 新しい — baru
        'v-n5-0066',  // 古い — lama, tua (benda)
        'v-n5-0061',  // 高い — tinggi; mahal
        'v-n5-0062',  // 安い — murah
        'v-n5-0063',  // 暑い — panas (cuaca)
        'v-n5-0064',  // 寒い — dingin (cuaca)
        'v-n5-0074',  // 長い — panjang; lama
        'v-n5-0075',  // 短い — pendek; singkat
        'v-n5-0072',  // 忙しい — sibuk
        'v-n5-0070',  // 難しい — sulit
        'v-n5-0071',  // 易しい — mudah
        'v-n5-0059',  // 良い — bagus, baik
      ],
      grammar_ids: [],
    },

    // Ch.15 — 静かな町ですね (Kata sifat な, deskripsi)
    15: {
      topic      : '静かな〜です — Kata Sifat な',
      vocab_ids  : [
        'v-n5-0080',  // きれい — cantik; bersih
        'v-n5-0081',  // 静か — tenang, hening
        'v-n5-0082',  // 賑やか — ramai, meriah
        'v-n5-0083',  // 大切 — penting, berharga
        'v-n5-s0085', // 大切な (soumatome)
        'v-n5-s0084', // 大変な — susah, berat
        'v-n5-s0027', // 有名な — terkenal
        'v-n5-s0087', // 安全な — aman
        'v-n5-s0280', // 好きな — suka
        'v-n5-s0278', // 暇な — santai, tidak sibuk
        'v-n4-0537',  // 便利 — praktis, nyaman
        'v-n4-0538',  // 不便 — tidak praktis
        'v-n4-0536',  // 親切 — ramah, baik hati
      ],
      grammar_ids: [],
    },

    // Ch.16 — 〜たいです (Keinginan)
    16: {
      topic      : '〜たいです — Menyatakan Keinginan',
      vocab_ids  : [
        'v-n5-0009',  // 行く — pergi
        'v-n5-0023',  // 食べる — makan
        'v-n5-s0150', // 旅行 — perjalanan
        'v-n5-s0359', // 海 — laut
        'v-n5-0131',  // 山 — gunung
        'v-n5-s0360', // 遊園地 — taman hiburan
        'v-n5-s0358', // 動物園 — kebun binatang
        'v-n5-0107',  // 来年 — tahun depan
      ],
      grammar_ids: [],
    },

    // Ch.17 — 〜ている (Keadaan sedang berlangsung)
    17: {
      topic      : '〜ています — Keadaan Sedang Berlangsung',
      vocab_ids  : [
        'v-n5-0018',  // 知る — mengetahui
        'v-n5-0019',  // 住む — tinggal, menetap
        'v-n5-0030',  // 働く — bekerja
        'v-n5-0111',  // 続ける (analogous)
        'v-n5-s0282', // 勤める — bekerja di
        'v-n5-s0281', // 住む (soumatome)
        'v-n5-s0283', // 働く (soumatome)
        'v-n5-s0287', // 結婚する — menikah
        'v-n5-0101',  // 家族 — keluarga
        'v-n5-0086',  // 会社 — perusahaan, kantor
        'v-n5-s0019', // 住む (soumatome)
      ],
      grammar_ids: [],
    },

    // Ch.18 — 〜まえに、〜てから (Urutan waktu)
    18: {
      topic      : '〜まえに・〜てから — Sebelum dan Sesudah',
      vocab_ids  : [
        'v-n5-s0057', // 前 — sebelum
        'v-n5-s0060', // 後で — setelah itu
        'v-n5-0046',  // 終わる — selesai
        'v-n5-0047',  // 始まる — dimulai
        'v-n5-0035',  // 起きる — bangun tidur
        'v-n5-0036',  // 寝る — tidur
        'v-n5-0056',  // 生まれる — lahir
        'v-n5-0104',  // 朝 — pagi
        'v-n5-0105',  // 夜 — malam
        'v-n5-s0076', // 毎日 — setiap hari
      ],
      grammar_ids: [],
    },

    // Ch.19 — 〜てあげます (Memberi dan menerima tindakan)
    19: {
      topic      : '〜てあげます — Memberi dan Menerima Tindakan',
      vocab_ids  : [
        'v-n5-0051',  // あげる — memberikan
        'v-n5-0050',  // もらう — menerima
        'v-n5-0052',  // くれる — memberikan (ke saya)
        'v-n5-0041',  // 教える — mengajar; memberitahu
        'v-n5-0055',  // 見せる — memperlihatkan
        'v-n5-0039',  // 貸す — meminjamkan
        'v-n5-0040',  // 借りる — meminjam
        'v-n5-s0195', // 足す — menambahkan
        'v-n5-0001',  // 会う — bertemu
        'v-n5-0125',  // ありがとうございます — terima kasih
      ],
      grammar_ids: [],
    },

    // Ch.20 — 〜てみます (Mencoba)
    20: {
      topic      : '〜てみます — Mencoba Melakukan Sesuatu',
      vocab_ids  : [
        'v-n5-0024',  // 飲む — minum
        'v-n5-0042',  // 覚える — mengingat; menghafal
        'v-n5-s0364', // テニス — tenis
        'v-n4-0400',  // 経験 — pengalaman
        'v-n4-0392',  // 機会 — kesempatan
        'v-n5-0119',  // いつも — selalu
        'v-n5-0120',  // 時々 — kadang-kadang
      ],
      grammar_ids: [],
    },

    // Ch.21 — 〜ておきます (Persiapan)
    21: {
      topic      : '〜ておきます — Persiapan untuk Nanti',
      vocab_ids  : [
        'v-n5-0026',  // 作る — membuat
        'v-n4-0313',  // 予約する — memesan, reservasi
        'v-n4-0502',  // 準備 — persiapan
        'v-n4-0178',  // 予定 — rencana, jadwal
        'v-n4-0181',  // 計画 — rencana
        'v-n5-0025',  // 使う — menggunakan
        'v-n4-0284',  // キャンセル — cancel
      ],
      grammar_ids: [],
    },

    // Ch.22 — 〜てもらいます (Minta bantuan)
    22: {
      topic      : '〜てもらいます — Meminta Bantuan',
      vocab_ids  : [
        'v-n4-0117',  // 頼む — meminta, memohon
        'v-n4-0572',  // 相談 — konsultasi
        'v-n4-0536',  // 親切 — ramah, baik hati
        'v-n4-0527',  // 丁寧 — sopan, teliti
        'v-n5-0124',  // すみません — permisi; maaf
        'v-n5-s0088', // 安心する — merasa lega
      ],
      grammar_ids: [],
    },

    // Ch.23 — 〜てしまいます (Menyesal, tidak sengaja)
    23: {
      topic      : '〜てしまいます — Menyesal atau Tak Sengaja',
      vocab_ids  : [
        'v-n4-0685',  // 失敗 — kegagalan, gagal
        'v-n4-0454',  // 謝る — meminta maaf
        'v-n4-0030',  // 困る — kesulitan, kebingungan
        'v-n4-0369',  // 悩む — bingung, galau
        'v-n4-0367',  // 驚く — terkejut
        'v-n5-0048',  // 押す — mendorong; menekan
        'v-n5-0016',  // 消す — mematikan; menghapus
        'v-n5-0124',  // すみません — permisi; maaf
        'v-n5-0060',  // 悪い — buruk, jelek
        'v-n4-0033',  // 心配 — khawatir, cemas
        'v-n4-0547',  // 大丈夫 — tidak apa-apa
      ],
      grammar_ids: [],
    },

    // Ch.24 — 〜てあります、〜ています (Keadaan/hasil tindakan)
    24: {
      topic      : '〜てあります・〜ています — Keadaan Hasil Tindakan',
      vocab_ids  : [
        'v-n5-0017',  // つける — menyalakan; menempelkan
        'v-n5-0016',  // 消す — mematikan; menghapus
        'v-n5-0002',  // 開く — terbuka
        'v-n5-0003',  // 開ける — membuka
        'v-n5-s0298', // しめる — menutup
        'v-n5-s0303', // しまる — tertutup
        'v-n5-s0302', // あく — terbuka
        'v-n5-0089',  // 病院 — rumah sakit
        'v-n5-s0186', // 病気 — sakit, penyakit
        'v-n5-s0187', // 元気 — sehat, bersemangat
        'v-n4-0072',  // 薬 — obat
        'v-n5-0121',  // 頭 — kepala
      ],
      grammar_ids: [],
    },

    // Ch.25 — 〜たら、〜ば (Kondisi/syarat)
    25: {
      topic      : '〜たら・〜ば — Kondisi dan Syarat',
      vocab_ids  : [
        'v-n4-0137',  // 変わる — berubah
        'v-n4-0134',  // 選ぶ — memilih
        'v-n4-0131',  // 決める — memutuskan
        'v-n4-0236',  // 増える — bertambah
        'v-n4-0238',  // 減る — berkurang
        'v-n4-0394',  // 問題 — masalah
        'v-n4-0402',  // 理由 — alasan
        'v-n4-0547',  // 大丈夫 — tidak apa-apa
        'v-n5-0059',  // 良い — bagus, baik
        'v-n5-0143',  // でも — tapi; tetapi
        'v-n5-0144',  // そして — dan kemudian; lalu
        'v-n4-0403',  // 意見 — pendapat
      ],
      grammar_ids: [],
    },

  },
};

// ══════════════════════════════════════════════════════
//  MISSING_VOCAB — Kata Minna I yang BELUM ada di vocabDB
// ══════════════════════════════════════════════════════
//
//  Ch.1  : わたし、あなた、会社員 (noun, N5)
//  Ch.2  : これ/それ/あれ (pronoun), ペン, 鉛筆, 財布 (noun, N5)
//  Ch.3  : ここ/そこ/あそこ (pronoun), スーパー, コンビニ (noun, N5)
//  Ch.4  : 〜時 (counter suffix), 〜分 (minute suffix) (N5)
//  Ch.5  : バス, タクシー (noun, N5)
//  Ch.6  : 勉強する (verb-suru, N5) ← PENTING
//  Ch.8  : 映画 (noun, N5), パーティー (noun, N5)
//  Ch.9  : 机 (noun, N5) ← ただし つくえ ada di soumatome ✅
//          ドア (noun, N5), 犬 (noun, N5), 猫 (noun, N5)
//  Ch.14 : 遅い (adj-i, N5), いい → 良い sudah ada ✅
//  Ch.15 : 有名な → v-n5-s0027 ✅
//  Ch.16 : 温泉 (noun, N4)
//  Ch.17 : 知っている (state form) → 知る v-n5-0018 ✅
//  Ch.18 : 仕事 (noun, N5) ← PENTING
//  Ch.21 : 掃除する (verb-suru, N5), 洗濯する (verb-suru, N5)
//  Ch.22 : 手伝う (verb-u, N5)
//  Ch.23 : なくす, 壊す, 落とす (verb, N5)
//  Ch.25 : 比べる, 違う, 同じ (verb/adj, N5)
//
// ══════════════════════════════════════════════════════
