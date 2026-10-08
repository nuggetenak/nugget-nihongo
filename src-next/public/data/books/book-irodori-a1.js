// ══════════════════════════════════════════════════════
//  book-irodori-a1.js — Nugget Nihongo Book Lens
//  Plan C migration: all vocab_ids updated to vg-* format
//  Migrated: 2026-04-11 · v15.6.1
// ══════════════════════════════════════════════════════

window.bookIrodoriA1 = {
  meta: {
      "book": "irodori-a1",
      "title": "Irodori: Japanese for Life in Japan — A1",
      "publisher": "Japan Foundation",
      "jf_level": "A1",
      "jlpt_range": [
          "n5"
      ],
      "units": 18,
      "url": "https://www.irodori.jpf.go.jp/"
  },
  units: {

    1: {
      topic      : "はじめまして — Perkenalan (かつどう)",
      topic_id   : 1,
      vocab_ids  : [
        'vg-n5-00093', // 先生 — guru
        'vg-n5-00414', // 生徒 — murid, pelajar
        'vg-n5-00417', // 学生 — mahasiswa
        'vg-n5-00418', // 日本人 — orang Jepang
        'vg-n5-00419', // 外国人 — orang asing
        'vg-n5-00421', // 人 — orang
        'vg-n5-00435', // 名前 — nama
        'vg-n5-00092', // 友達 — teman
        'vg-n5-00093', // 先生 — guru
        'vg-n5-00124', // すみません — permisi; maaf
        'vg-n5-00125', // ありがとうございます — terima kasih
        'vg-n5-00126', // どうぞ — silakan
      ],
      grammar_ids: ['gn5-00001', 'gn5-00002', 'gn5-00085', 'gn5-00005', 'gn5-00003', 'gn5-00004'],
    },

    2: {
      topic      : "はじめまして — Identitas dan Negasi (りかい)",
      topic_id   : 1,
      vocab_ids  : [
        'vg-n5-00424', // 国 — negara
        'vg-n5-00423', // 外国 — negara asing
        'vg-n5-00441', // 日本 — Jepang
        'vg-n5-00439', // 日本語 — bahasa Jepang
        'vg-n5-00440', // 英語 — bahasa Inggris
        'vg-n5-00416', // 誕生日 — ulang tahun
        'vg-n5-00422', // 大人 — orang dewasa
        'vg-n5-00430', // 子ども — anak-anak
        'vg-n5-00431', // 友だち — teman
        'vg-n5-00085', // 学校 — pendidikan
        'vg-n5-00086', // 会社 — perusahaan
        'vg-n5-00100', // 言葉 — kata; bahasa
      ],
      grammar_ids: ['gn5-00006', 'gn5-00007', 'gn5-00008', 'gn5-00009'],
    },

    3: {
      topic      : "これ、ください — Meminta Benda (かつどう)",
      topic_id   : 2,
      vocab_ids  : [
        'vg-n5-00108', // 本 — buku
        'vg-n5-00108', // 本 — buku
        'vg-n5-00526', // 辞書 — kamus
        'vg-n5-00406', // ノート — buku catatan
        'vg-n5-00394', // パソコン — komputer
        'vg-n5-00393', // スマホ — smartphone; HP
        'vg-n5-00099', // お金 — uang
        'vg-n5-00489', // 円 — ① bulat ② yen (mata uang)
        'vg-n5-00037', // 買う — membeli
        'vg-n5-00126', // どうぞ — silakan
      ],
      grammar_ids: ['gn5-00010', 'gn5-00086', 'gn5-00011', 'gn5-00012', 'gn5-00013', 'gn5-00087'],
    },

    4: {
      topic      : "これ、ください — Harga dan Warna (りかい)",
      topic_id   : 2,
      vocab_ids  : [
        'vg-n5-00061', // 高い — tinggi; mahal
        'vg-n5-00062', // 安い — murah
        'vg-n5-00057', // 大きい — besar
        'vg-n5-00058', // 小さい — kecil
        'vg-n5-00145', // 白い — putih
        'vg-n5-00146', // 黒い — hitam
        'vg-n5-00147', // 赤い — merah
        'vg-n5-00148', // 青い — biru; hijau (langit/tumbuhan)
        'vg-n5-00113', // たくさん — banyak
        'vg-n5-00114', // 少し — sedikit
        'vg-n5-00722', // 枚 — satuan benda datar (kertas, piring)
        'vg-n5-00038', // 売る — menjual
      ],
      grammar_ids: ['gn5-00014', 'gn5-00064', 'gn5-00088', 'gn5-00015'],
    },

    5: {
      topic      : "ここはどこですか — Menanyakan Lokasi (かつどう)",
      topic_id   : 3,
      vocab_ids  : [
        'vg-n5-00088', // 駅 — stasiun
        'vg-n5-00089', // 病院 — rumah sakit
        'vg-n5-00524', // 銀行 — bank
        'vg-n5-00545', // お手洗い — toilet, kamar mandi
        'vg-n5-00149', // 右 — kanan
        'vg-n5-00150', // 左 — kiri
        'vg-n5-00512', // 上 — atas
        'vg-n5-00515', // 下 — bawah
        'vg-n5-00054', // ある — ada (benda mati)
        'vg-n5-00053', // いる — ada (makhluk hidup)
      ],
      grammar_ids: ['gn5-00001', 'gn5-00016', 'gn5-00017', 'gn5-00018'],
    },

    6: {
      topic      : "ここはどこですか — Pergi ke Suatu Tempat (りかい)",
      topic_id   : 3,
      vocab_ids  : [
        'vg-n5-00009', // 行く — pergi
        'vg-n5-00010', // 来る — datang
        'vg-n5-00011', // 帰る — pulang, kembali ke rumah
        'vg-n5-00027', // 出かける — keluar, pergi keluar
        'vg-n5-00007', // 歩く — berjalan
        'vg-n5-00029', // 入る — masuk
        'vg-n5-00028', // 出る — keluar; muncul
        'vg-n5-00087', // 電車 — kereta listrik
        'vg-n5-00109', // 車 — mobil
        'vg-n5-00712', // 公園 — taman
        'vg-n5-00558', // 道 — jalan
      ],
      grammar_ids: ['gn5-00019', 'gn5-00020', 'gn5-00089'],
    },

    7: {
      topic      : "いつですか — Jam dan Waktu (かつどう)",
      topic_id   : 4,
      vocab_ids  : [
        'vg-n5-00094', // 時間 — waktu; jam (durasi)
        'vg-n5-00095', // 今日 — hari ini
        'vg-n5-00096', // 明日 — besok
        'vg-n5-00097', // 昨日 — kemarin
        'vg-n5-00104', // 朝 — pagi
        'vg-n5-00105', // 夜 — malam
        'vg-n5-00466', // 今 — sekarang
        'vg-n5-00460', // 午前 — pagi (sebelum jam 12)
        'vg-n5-00459', // 午後 — sore/siang (setelah jam 12)
        'vg-n5-00461', // 前 — depan, sebelum
        'vg-n5-00462', // 後で — nanti, setelah itu
      ],
      grammar_ids: ['gn5-00020', 'gn5-00021', 'gn5-00001', 'gn5-00090'],
    },

    8: {
      topic      : "いつですか — Hari, Bulan, dan Tanggal (りかい)",
      topic_id   : 4,
      vocab_ids  : [
        'vg-n5-00587', // 月曜日 — Senin
        'vg-n5-00588', // 火曜日 — Selasa
        'vg-n5-00589', // 水曜日 — Rabu
        'vg-n5-00590', // 木曜日 — Kamis
        'vg-n5-00591', // 金曜日 — Jumat
        'vg-n5-00592', // 土曜日 — Sabtu
        'vg-n5-00593', // 日曜日 — Minggu
        'vg-n5-00106', // 週末 — akhir pekan
        'vg-n5-00594', // 一月 — Januari
        'vg-n5-00595', // 二月 — Februari
        'vg-n5-00596', // 三月 — Maret
        'vg-n5-00597', // 四月 — April
        'vg-n5-00598', // 五月 — Mei
        'vg-n5-00599', // 六月 — Juni
        'vg-n5-00600', // 七月 — Juli
        'vg-n5-00601', // 八月 — Agustus
        'vg-n5-00602', // 九月 — September
        'vg-n5-00603', // 十月 — Oktober
        'vg-n5-00604', // 十一月 — November
        'vg-n5-00605', // 十二月 — Desember
      ],
      grammar_ids: ['gn5-00022', 'gn5-00023', 'gn5-00030'],
    },

    9: {
      topic      : "どうやって行きますか — Transportasi (かつどう)",
      topic_id   : 5,
      vocab_ids  : [
        'vg-n5-00045', // 乗る — naik (kendaraan)
        'vg-n5-00044', // 降りる — turun (dari kendaraan)
        'vg-n5-00514', // 地下鉄 — kereta bawah tanah, MRT
        'vg-n5-00538', // 自転車 — sepeda
        'vg-n5-00537', // 自動車 — mobil
        'vg-n5-00713', // 飛行機 — pesawat
        'vg-n5-00087', // 電車 — kereta listrik
        'vg-n5-00714', // 船 — kapal
        'vg-n5-00562', // 空港 — bandara
        'vg-n5-00088', // 駅 — stasiun
      ],
      grammar_ids: ['gn5-00024', 'gn5-00025', 'gn5-00026', 'gn5-00027'],
    },

    10: {
      topic      : "どうやって行きますか — Durasi Perjalanan (りかい)",
      topic_id   : 5,
      vocab_ids  : [
        'vg-n5-00180', // かかる — membutuhkan (waktu/biaya)
        'vg-n5-00094', // 時間 — waktu; jam (durasi)
        'vg-n5-00453', // 一週間 — satu minggu
        'vg-n5-00046', // 終わる — selesai, berakhir
        'vg-n5-00047', // 始まる — dimulai
        'vg-n5-00115', // もう — sudah; lagi
        'vg-n5-00116', // まだ — masih; belum
        'vg-n5-00475', // 毎日 — setiap hari
        'vg-n5-00474', // 毎年 — setiap tahun
        'vg-n5-00119', // いつも — selalu; biasanya
        'vg-n5-00120', // 時々 — kadang-kadang
      ],
      grammar_ids: ['gn5-00028', 'gn5-00091', 'gn5-00031'],
    },

    11: {
      topic      : "いただきます — Makanan dan Minuman (かつどう)",
      topic_id   : 6,
      vocab_ids  : [
        'vg-n5-00023', // 食べる — makan
        'vg-n5-00024', // 飲む — minum
        'vg-n5-00136', // ご飯 — nasi; makanan
        'vg-n5-00138', // 肉 — daging
        'vg-n5-00139', // 魚 — ikan
        'vg-n5-00140', // 野菜 — sayuran
        'vg-n5-00137', // 水 — air
        'vg-n5-00553', // 牛乳 — susu sapi
        'vg-n5-00323', // くだもの — buah
        'vg-n5-00316', // りんご — apel
        'vg-n5-00552', // 牛肉 — daging sapi
        'vg-n5-00139', // 魚 — ikan
        'vg-n5-00090', // 食べ物 — makanan-minuman
        'vg-n5-00091', // 飲み物 — minuman
      ],
      grammar_ids: ['gn5-00029', 'gn5-00030', 'gn5-00031'],
    },

    12: {
      topic      : "いただきます — Di Restoran (りかい)",
      topic_id   : 6,
      vocab_ids  : [
        'vg-n5-00529', // 食事 — makan, makan (kegiatan)
        'vg-n5-00530', // 食堂 — kantin, kafetaria
        'vg-n5-00069', // 美味しい — enak, lezat
        'vg-n5-00076', // 好き — suka
        'vg-n5-00077', // 嫌い — tidak suka
        'vg-n5-00026', // 作る — membuat
        'vg-n5-00025', // 使う — menggunakan
        'vg-n5-00256', // あまい — manis
        'vg-n5-00255', // からい — pedas; asin
        'vg-n5-00257', // にがい — pahit
        'vg-n5-00249', // つめたい — dingin (benda)
        'vg-n5-00247', // あつい — panas (benda)
      ],
      grammar_ids: ['gn5-00032', 'gn5-00092', 'gn5-00024'],
    },

    13: {
      topic      : "どんな人ですか — Deskripsi Orang dan Benda (かつどう)",
      topic_id   : 7,
      vocab_ids  : [
        'vg-n5-00057', // 大きい — besar
        'vg-n5-00058', // 小さい — kecil
        'vg-n5-00074', // 長い — panjang; lama
        'vg-n5-00075', // 短い — pendek; singkat
        'vg-n5-00065', // 新しい — baru
        'vg-n5-00066', // 古い — lama, tua (benda)
        'vg-n5-00073', // 可愛い — lucu, imut
        'vg-n5-00080', // きれい — cantik; bersih
        'vg-n5-00081', // 静か — tenang, hening
        'vg-n5-00082', // 賑やか — ramai, meriah
        'vg-n5-00059', // 良い — bagus, baik
        'vg-n5-00060', // 悪い — buruk, jelek
      ],
      grammar_ids: ['gn5-00093', 'gn5-00033', 'gn5-00006'],
    },

    14: {
      topic      : "どんな人ですか — Hobi dan Kesukaan (りかい)",
      topic_id   : 7,
      vocab_ids  : [
        'vg-n5-00076', // 好き — suka
        'vg-n5-00077', // 嫌い — tidak suka
        'vg-n5-00078', // 上手 — pandai, mahir
        'vg-n5-00079', // 下手 — tidak pandai, kurang mahir
        'vg-n5-00067', // 面白い — menarik, lucu
        'vg-n5-00068', // つまらない — membosankan
        'vg-n5-00715', // 音楽 — musik
        'vg-n5-00397', // スポーツ — olahraga
        'vg-n5-00398', // サッカー — sepak bola
        'vg-n5-00399', // テニス — tenis
        'vg-n5-00659', // すいえい — renang
        'vg-n5-00043', // 歌う — bernyanyi
        'vg-n5-00032', // 見る — melihat; menonton
        'vg-n5-00033', // 読む — membaca
      ],
      grammar_ids: ['gn5-00034', 'gn5-00035', 'gn5-00055'],
    },

    15: {
      topic      : "何をしましたか — Kegiatan Lampau (かつどう)",
      topic_id   : 8,
      vocab_ids  : [
        'vg-n5-00013', // 聞く — mendengar; bertanya
        'vg-n5-00012', // 書く — menulis
        'vg-n5-00005', // 遊ぶ — bermain, bersenang-senang
        'vg-n5-00034', // 泳ぐ — berenang
        'vg-n5-00001', // 会う — bertemu
        'vg-n5-00031', // 話す — berbicara
        'vg-n5-00540', // 花見 — melihat bunga sakura
        'vg-n5-00525', // 旅行 — perjalanan, wisata
        'vg-n5-00106', // 週末 — akhir pekan
        'vg-n5-00092', // 友達 — teman
        'vg-n5-00117', // 一緒に — bersama
      ],
      grammar_ids: ['gn5-00006', 'gn5-00036', 'gn5-00018'],
    },

    16: {
      topic      : "何をしましたか — Cerita Perjalanan (りかい)",
      topic_id   : 8,
      vocab_ids  : [
        'vg-n5-00131', // 山 — gunung
        'vg-n5-00132', // 川 — sungai
        'vg-n5-00133', // 花 — bunga
        'vg-n4-00042', // 海 — laut
        'vg-n5-00135', // 雪 — salju
        'vg-n5-00134', // 雨 — hujan
        'vg-n5-00098', // 天気 — cuaca
        'vg-n5-00098', // 天気 — cuaca
        'vg-n5-00110', // 写真 — foto
        'vg-n5-00672', // はれ — cerah
        'vg-n5-00673', // くもり — mendung
        'vg-n5-00083', // 大切 — penting, berharga
      ],
      grammar_ids: ['gn5-00037', 'gn5-00094', 'gn5-00018', 'gn5-00038'],
    },

    17: {
      topic      : "いいですね — Menyatakan Keinginan (かつどう)",
      topic_id   : 9,
      vocab_ids  : [
        'vg-n5-00090', // 食べ物 — makanan-minuman
        'vg-n5-00091', // 飲み物 — minuman
        'vg-n5-00019', // 住む — tinggal, menetap
        'vg-n5-00030', // 働く — bekerja
        'vg-n5-00056', // 生まれる — lahir
        'vg-n5-00107', // 来年 — tahun depan
        'vg-n5-00083', // 大切 — penting, berharga
        'vg-n4-00042', // 海 — laut
        'vg-n5-00131', // 山 — gunung
        'vg-n5-00525', // 旅行 — perjalanan, wisata
        'vg-n5-00049', // 送る — mengirim; mengantarkan
      ],
      grammar_ids: ['gn5-00006', 'gn5-00036', 'gn5-00018', 'gn5-00037', 'gn5-00094', 'gn5-00038'],
    },

    18: {
      topic      : "いいですね — Ajakan dan Rencana Bersama (りかい)",
      topic_id   : 9,
      vocab_ids  : [
        'vg-n5-00117', // 一緒に — bersama
        'vg-n5-00118', // ゆっくり — pelan-pelan; santai
        'vg-n5-00119', // いつも — selalu; biasanya
        'vg-n5-00120', // 時々 — kadang-kadang
        'vg-n5-00115', // もう — sudah; lagi
        'vg-n5-00116', // まだ — masih; belum
        'vg-n5-00143', // でも — tapi; tetapi
        'vg-n5-00144', // そして — dan kemudian; lalu
        'vg-n5-00059', // 良い — bagus, baik
        'vg-n5-00096', // 明日 — besok
        'vg-n5-00095', // 今日 — hari ini
      ],
      grammar_ids: ['gn5-00006', 'gn5-00036', 'gn5-00018', 'gn5-00037', 'gn5-00094', 'gn5-00038'],
    },
  },
};
