// ══════════════════════════════════════════════════════
//  book-irodori-a1.js — Irodori A1 · Unit Index
//  Source: Irodori: Japanese for Life in Japan (JF Standard A1)
//          Japan Foundation — freely available online
//  Units: 1–18  (9 トピック × 2 sections: かつどう + りかい)
//  Status: FILLED by Agent 3 — vocab_ids dari vocabDB N5
//
//  Struktur:
//    Unit 1–2   → トピック 1: はじめまして
//    Unit 3–4   → トピック 2: これ、ください
//    Unit 5–6   → トピック 3: ここはどこですか
//    Unit 7–8   → トピック 4: いつですか
//    Unit 9–10  → トピック 5: どうやって行きますか
//    Unit 11–12 → トピック 6: いただきます
//    Unit 13–14 → トピック 7: どんな人ですか
//    Unit 15–16 → トピック 8: 何をしましたか
//    Unit 17–18 → トピック 9: いいですね
//
//  ⚠ vocab_ids hanya merujuk id yang ada di vocabDB.
//  Kata yang belum ada di DB dicatat di bagian MISSING_VOCAB di bawah.
// ══════════════════════════════════════════════════════

window.bookIrodoriA1 = {
  meta: {
    book      : 'irodori-a1',
    title     : 'Irodori: Japanese for Life in Japan — A1',
    publisher : 'Japan Foundation',
    jf_level  : 'A1',
    jlpt_range: ['n5'],
    units     : 18,
    url       : 'https://www.irodori.jpf.go.jp/',
  },
  units: {

    // ── トピック 1: はじめまして ──────────────────────────────────
    1: {
      topic      : 'はじめまして — Perkenalan (かつどう)',
      topic_id   : 1,
      vocab_ids  : [
        'v-n5-s0001', // 先生 — guru
        'v-n5-s0004', // 生徒 — murid
        'v-n5-s0007', // 学生 — mahasiswa
        'v-n5-s0009', // 日本人 — orang Jepang
        'v-n5-s0010', // 外国人 — orang asing
        'v-n5-s0012', // 人 — orang
        'v-n5-s0028', // 名前 — nama
        'v-n5-0092',  // 友達 — teman
        'v-n5-0093',  // 先生 (core) — guru, dokter
        'v-n5-0124',  // すみません — permisi; maaf
        'v-n5-0125',  // ありがとうございます — terima kasih
        'v-n5-0126',  // どうぞ — silakan
      ],
      grammar_ids: [],
      // grammar N5 belum ada di grammarData — menunggu Agent Grammar N5
    },

    2: {
      topic      : 'はじめまして — Identitas dan Negasi (りかい)',
      topic_id   : 1,
      vocab_ids  : [
        'v-n5-s0015', // 国 — negara
        'v-n5-s0014', // 外国 — negara asing
        'v-n5-s0036', // 日本 — Jepang
        'v-n5-s0033', // 日本語 — bahasa Jepang
        'v-n5-s0034', // 英語 — bahasa Inggris
        'v-n5-s0006', // 誕生日 — ulang tahun
        'v-n5-s0013', // 大人 — orang dewasa
        'v-n5-s0021', // 子ども — anak-anak
        'v-n5-s0022', // 友だち — teman
        'v-n5-0085',  // 学校 — sekolah
        'v-n5-0086',  // 会社 — perusahaan, kantor
        'v-n5-0100',  // 言葉 — kata; bahasa
      ],
      grammar_ids: [],
    },

    // ── トピック 2: これ、ください ────────────────────────────────
    3: {
      topic      : 'これ、ください — Meminta Benda (かつどう)',
      topic_id   : 2,
      vocab_ids  : [
        'v-n5-0108',  // 本 — buku
        'v-n5-s0035', // 本 (soumatome) — buku
        'v-n5-s0152', // 辞書 — kamus
        'v-n5-s0400', // ノート — buku catatan
        'v-n5-s0401', // パソコン — komputer
        'v-n5-s0403', // スマホ — smartphone
        'v-n5-0099',  // お金 — uang
        'v-n5-s0098', // 円 — yen
        'v-n5-0037',  // 買う — membeli
        'v-n5-0126',  // どうぞ — silakan
      ],
      grammar_ids: [],
    },

    4: {
      topic      : 'これ、ください — Harga dan Warna (りかい)',
      topic_id   : 2,
      vocab_ids  : [
        'v-n5-0061',  // 高い — mahal; tinggi
        'v-n5-0062',  // 安い — murah
        'v-n5-0057',  // 大きい — besar
        'v-n5-0058',  // 小さい — kecil
        'v-n5-0145',  // 白い — putih
        'v-n5-0146',  // 黒い — hitam
        'v-n5-0147',  // 赤い — merah
        'v-n5-0148',  // 青い — biru
        'v-n5-0113',  // たくさん — banyak
        'v-n5-0114',  // 少し — sedikit
        'v-n5-0127',  // 〜枚 — counter benda tipis/datar
        'v-n5-0038',  // 売る — menjual
      ],
      grammar_ids: [],
    },

    // ── トピック 3: ここはどこですか ──────────────────────────────
    5: {
      topic      : 'ここはどこですか — Menanyakan Lokasi (かつどう)',
      topic_id   : 3,
      vocab_ids  : [
        'v-n5-0088',  // 駅 — stasiun
        'v-n5-0089',  // 病院 — rumah sakit
        'v-n5-s0149', // 銀行 — bank
        'v-n5-s0190', // お手洗い — toilet
        'v-n5-0149',  // 右 — kanan
        'v-n5-0150',  // 左 — kiri
        'v-n5-s0129', // 上 — atas
        'v-n5-s0132', // 下 — bawah
        'v-n5-0054',  // ある — ada (benda mati)
        'v-n5-0053',  // いる — ada (makhluk hidup)
      ],
      grammar_ids: [],
    },

    6: {
      topic      : 'ここはどこですか — Pergi ke Suatu Tempat (りかい)',
      topic_id   : 3,
      vocab_ids  : [
        'v-n5-0009',  // 行く — pergi
        'v-n5-0010',  // 来る — datang
        'v-n5-0011',  // 帰る — pulang
        'v-n5-0027',  // 出かける — keluar, pergi keluar
        'v-n5-0007',  // 歩く — berjalan
        'v-n5-0029',  // 入る — masuk
        'v-n5-0028',  // 出る — keluar
        'v-n5-0087',  // 電車 — kereta listrik
        'v-n5-0109',  // 車 — mobil
        'v-n5-s0357', // 公園 — taman
        'v-n5-s0208', // 道 — jalan
      ],
      grammar_ids: [],
    },

    // ── トピック 4: いつですか ────────────────────────────────────
    7: {
      topic      : 'いつですか — Jam dan Waktu (かつどう)',
      topic_id   : 4,
      vocab_ids  : [
        'v-n5-0094',  // 時間 — waktu; jam (durasi)
        'v-n5-0095',  // 今日 — hari ini
        'v-n5-0096',  // 明日 — besok
        'v-n5-0097',  // 昨日 — kemarin
        'v-n5-0104',  // 朝 — pagi
        'v-n5-0105',  // 夜 — malam
        'v-n5-s0064', // 今 — sekarang
        'v-n5-s0056', // 午前 — pagi (sebelum jam 12)
        'v-n5-s0055', // 午後 — siang/sore (setelah jam 12)
        'v-n5-s0057', // 前 — depan; sebelum
        'v-n5-s0060', // 後で — nanti; setelah itu
      ],
      grammar_ids: [],
    },

    8: {
      topic      : 'いつですか — Hari, Bulan, dan Tanggal (りかい)',
      topic_id   : 4,
      vocab_ids  : [
        'v-n5-s0240', // 月曜日 — Senin
        'v-n5-s0241', // 火曜日 — Selasa
        'v-n5-s0242', // 水曜日 — Rabu
        'v-n5-s0243', // 木曜日 — Kamis
        'v-n5-s0244', // 金曜日 — Jumat
        'v-n5-s0245', // 土曜日 — Sabtu
        'v-n5-s0246', // 日曜日 — Minggu
        'v-n5-0106',  // 週末 — akhir pekan
        'v-n5-0141',  // 〜から — dari; karena
        'v-n5-0142',  // 〜まで — sampai; hingga
        'v-n5-s0247', // 一月 — Januari
        'v-n5-s0248', // 二月 — Februari
        'v-n5-s0249', // 三月 — Maret
        'v-n5-s0250', // 四月 — April
        'v-n5-s0251', // 五月 — Mei
        'v-n5-s0252', // 六月 — Juni
        'v-n5-s0253', // 七月 — Juli
        'v-n5-s0254', // 八月 — Agustus
        'v-n5-s0255', // 九月 — September
        'v-n5-s0256', // 十月 — Oktober
        'v-n5-s0257', // 十一月 — November
        'v-n5-s0258', // 十二月 — Desember
      ],
      grammar_ids: [],
    },

    // ── トピック 5: どうやって行きますか ─────────────────────────
    9: {
      topic      : 'どうやって行きますか — Transportasi (かつどう)',
      topic_id   : 5,
      vocab_ids  : [
        'v-n5-0045',  // 乗る — naik (kendaraan)
        'v-n5-0044',  // 降りる — turun (dari kendaraan)
        'v-n5-s0131', // 地下鉄 — kereta bawah tanah, MRT
        'v-n5-s0178', // 自転車 — sepeda
        'v-n5-s0177', // 自動車 — mobil
        'v-n5-s0379', // 飛行機 — pesawat
        'v-n5-s0171', // 電車 — kereta listrik
        'v-n5-s0380', // 船 — kapal
        'v-n5-s0213', // 空港 — bandara
        'v-n5-s0109', // 駅 — stasiun
      ],
      grammar_ids: [],
    },

    10: {
      topic      : 'どうやって行きますか — Durasi Perjalanan (りかい)',
      topic_id   : 5,
      vocab_ids  : [
        'v-n5-s0296', // かかる — membutuhkan (waktu/uang)
        'v-n5-s0048', // 時間 — waktu
        'v-n5-s0049', // 一週間 — satu minggu
        'v-n5-0046',  // 終わる — selesai, berakhir
        'v-n5-0047',  // 始まる — dimulai
        'v-n5-0115',  // もう — sudah; lagi
        'v-n5-0116',  // まだ — masih; belum
        'v-n5-s0076', // 毎日 — setiap hari
        'v-n5-s0075', // 毎年 — setiap tahun
        'v-n5-0119',  // いつも — selalu; biasanya
        'v-n5-0120',  // 時々 — kadang-kadang
      ],
      grammar_ids: [],
    },

    // ── トピック 6: いただきます ──────────────────────────────────
    11: {
      topic      : 'いただきます — Makanan dan Minuman (かつどう)',
      topic_id   : 6,
      vocab_ids  : [
        'v-n5-0023',  // 食べる — makan
        'v-n5-0024',  // 飲む — minum
        'v-n5-0136',  // ご飯 — nasi; makanan
        'v-n5-0138',  // 肉 — daging
        'v-n5-0139',  // 魚 — ikan
        'v-n5-0140',  // 野菜 — sayuran
        'v-n5-0137',  // 水 — air
        'v-n5-s0202', // 牛乳 — susu sapi
        'v-n5-s0372', // くだもの — buah
        'v-n5-s0373', // りんご — apel
        'v-n5-s0201', // 牛肉 — daging sapi
        'v-n5-s0204', // 魚 (soumatome) — ikan
        'v-n5-0090',  // 食べ物 — makanan
        'v-n5-0091',  // 飲み物 — minuman
      ],
      grammar_ids: [],
    },

    12: {
      topic      : 'いただきます — Di Restoran (りかい)',
      topic_id   : 6,
      vocab_ids  : [
        'v-n5-s0161', // 食事 — makan (kegiatan)
        'v-n5-s0162', // 食堂 — kantin, kafetaria
        'v-n5-0069',  // 美味しい — enak, lezat
        'v-n5-0076',  // 好き — suka
        'v-n5-0077',  // 嫌い — tidak suka
        'v-n5-0026',  // 作る — membuat
        'v-n5-0025',  // 使う — menggunakan
        'v-n5-s0259', // あまい — manis
        'v-n5-s0260', // からい — pedas, asin
        'v-n5-s0261', // にがい — pahit
        'v-n5-s0265', // つめたい — dingin (disentuh)
        'v-n5-s0264', // あつい — panas (disentuh)
      ],
      grammar_ids: [],
    },

    // ── トピック 7: どんな人ですか ────────────────────────────────
    13: {
      topic      : 'どんな人ですか — Deskripsi Orang dan Benda (かつどう)',
      topic_id   : 7,
      vocab_ids  : [
        'v-n5-0057',  // 大きい — besar
        'v-n5-0058',  // 小さい — kecil
        'v-n5-0074',  // 長い — panjang; lama
        'v-n5-0075',  // 短い — pendek; singkat
        'v-n5-0065',  // 新しい — baru
        'v-n5-0066',  // 古い — lama, tua (benda)
        'v-n5-0073',  // 可愛い — lucu, imut
        'v-n5-0080',  // きれい — cantik; bersih
        'v-n5-0081',  // 静か — tenang, hening
        'v-n5-0082',  // 賑やか — ramai, meriah
        'v-n5-0059',  // 良い — bagus, baik
        'v-n5-0060',  // 悪い — buruk, jelek
      ],
      grammar_ids: [],
    },

    14: {
      topic      : 'どんな人ですか — Hobi dan Kesukaan (りかい)',
      topic_id   : 7,
      vocab_ids  : [
        'v-n5-0076',  // 好き — suka
        'v-n5-0077',  // 嫌い — tidak suka
        'v-n5-0078',  // 上手 — pandai, mahir
        'v-n5-0079',  // 下手 — tidak pandai
        'v-n5-0067',  // 面白い — menarik, lucu
        'v-n5-0068',  // つまらない — membosankan
        'v-n5-s0367', // 音楽 — musik
        'v-n5-s0361', // スポーツ — olahraga
        'v-n5-s0366', // サッカー — sepak bola
        'v-n5-s0364', // テニス — tenis
        'v-n5-s0365', // すいえい — renang
        'v-n5-0043',  // 歌う — bernyanyi
        'v-n5-0032',  // 見る — melihat; menonton
        'v-n5-0033',  // 読む — membaca
      ],
      grammar_ids: [],
    },

    // ── トピック 8: 何をしましたか ────────────────────────────────
    15: {
      topic      : '何をしましたか — Kegiatan Lampau (かつどう)',
      topic_id   : 8,
      vocab_ids  : [
        'v-n5-0013',  // 聞く — mendengar; bertanya
        'v-n5-0012',  // 書く — menulis
        'v-n5-0005',  // 遊ぶ — bermain, bersenang-senang
        'v-n5-0034',  // 泳ぐ — berenang
        'v-n5-0001',  // 会う — bertemu
        'v-n5-0031',  // 話す — berbicara
        'v-n5-s0182', // 花見 — melihat bunga sakura
        'v-n5-s0150', // 旅行 — perjalanan, wisata
        'v-n5-0106',  // 週末 — akhir pekan
        'v-n5-0092',  // 友達 — teman
        'v-n5-0117',  // 一緒に — bersama
      ],
      grammar_ids: [],
    },

    16: {
      topic      : '何をしましたか — Cerita Perjalanan (りかい)',
      topic_id   : 8,
      vocab_ids  : [
        'v-n5-0131',  // 山 — gunung
        'v-n5-0132',  // 川 — sungai
        'v-n5-0133',  // 花 — bunga
        'v-n5-s0359', // 海 — laut
        'v-n5-0135',  // 雪 — salju
        'v-n5-0134',  // 雨 — hujan
        'v-n5-0098',  // 天気 — cuaca
        'v-n5-s0184', // 天気 (soumatome) — cuaca
        'v-n5-0110',  // 写真 — foto
        'v-n5-s0382', // はれ — cerah
        'v-n5-s0383', // くもり — mendung
        'v-n5-0083',  // 大切 — penting, berharga
      ],
      grammar_ids: [],
    },

    // ── トピック 9: いいですね ────────────────────────────────────
    17: {
      topic      : 'いいですね — Menyatakan Keinginan (かつどう)',
      topic_id   : 9,
      vocab_ids  : [
        'v-n5-0090',  // 食べ物 — makanan
        'v-n5-0091',  // 飲み物 — minuman
        'v-n5-0019',  // 住む — tinggal, menetap
        'v-n5-0030',  // 働く — bekerja
        'v-n5-0056',  // 生まれる — lahir
        'v-n5-0107',  // 来年 — tahun depan
        'v-n5-0083',  // 大切 — penting, berharga
        'v-n5-s0359', // 海 — laut
        'v-n5-0131',  // 山 — gunung
        'v-n5-s0150', // 旅行 — perjalanan
        'v-n5-0049',  // 送る — mengirim; mengantarkan
      ],
      grammar_ids: [],
    },

    18: {
      topic      : 'いいですね — Ajakan dan Rencana Bersama (りかい)',
      topic_id   : 9,
      vocab_ids  : [
        'v-n5-0117',  // 一緒に — bersama
        'v-n5-0118',  // ゆっくり — pelan-pelan; santai
        'v-n5-0119',  // いつも — selalu; biasanya
        'v-n5-0120',  // 時々 — kadang-kadang
        'v-n5-0115',  // もう — sudah; lagi
        'v-n5-0116',  // まだ — masih; belum
        'v-n5-0143',  // でも — tapi; tetapi
        'v-n5-0144',  // そして — dan kemudian; lalu
        'v-n5-0059',  // 良い — bagus, baik
        'v-n5-0096',  // 明日 — besok
        'v-n5-0095',  // 今日 — hari ini
      ],
      grammar_ids: [],
    },

  },
};

// ══════════════════════════════════════════════════════
//  MISSING_VOCAB — Kata Irodori A1 yang BELUM ada di vocabDB
//  Perlu dibuatkan oleh Agent Vocab (Agent N5)
//  !! JANGAN ditambahkan manual di sini !!
// ══════════════════════════════════════════════════════
//
//  Unit 1–2  : はじめまして
//    - [ ] よろしくおねがいします — nice to meet you (exp)
//    - [ ] はじめまして — how do you do (exp)
//
//  Unit 5–6  : どこですか
//    - [ ] 部屋 (へや) — kamar, ruangan (noun, N5)
//    - [ ] スーパー — supermarket (noun, N5)
//    - [ ] コンビニ — convenience store (noun, N5)
//
//  Unit 9–10 : どうやって行きますか
//    - [ ] バス — bus (noun, N5)
//
//  Unit 11–12: いただきます
//    - [ ] コーヒー — kopi (noun, N5)
//    - [ ] お茶 (おちゃ) — teh (noun, N5)
//    - [ ] ジュース — jus (noun, N5)
//    - [ ] お酒 (おさけ) — minuman beralkohol (noun, N5)
//    - [ ] ラーメン — ramen (noun, N5)
//    - [ ] ホテル — hotel (noun, N5)
//    - [ ] アパート — apartemen (noun, N5)
//
//  Unit 13–16: どんな人・何をしましたか
//    - [ ] 楽しい (たのしい) — menyenangkan, asik (adj-i, N5) ← PENTING
//    - [ ] 映画 (えいが) — film, bioskop (noun, N5)
//    - [ ] 犬 (いぬ) — anjing (noun, N5)
//    - [ ] 猫 (ねこ) — kucing (noun, N5)
//
//  Unit 17–18: いいですね
//    - [ ] 運動 (うんどう) — olahraga, gerak badan (noun-suru, N5)
//    - [ ] 電話する — menelepon (verb-suru, N5)
//
// ══════════════════════════════════════════════════════
