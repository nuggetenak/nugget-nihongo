// ══════════════════════════════════════════════════════
//  book-irodori-a2-1.js — Nugget Nihongo Book Lens
//  Plan C migration: all vocab_ids updated to vg-* format
//  Migrated: 2026-04-11 · v15.6.1
// ══════════════════════════════════════════════════════

window.bookIrodoriA21 = {
  meta: {
      "book": "irodori-a2-1",
      "title": "Irodori: Japanese for Life in Japan — A2-1",
      "publisher": "Japan Foundation",
      "jf_level": "A2",
      "jlpt_range": [
          "n5",
          "n4"
      ],
      "units": 18,
      "url": "https://www.irodori.jpf.go.jp/"
  },
  units: {

    1: {
      topic      : "一緒に行きませんか — Mengajak (かつどう)",
      topic_id   : 1,
      vocab_ids  : [
        'vg-n5-00001', // 会う — bertemu
        'vg-n5-00009', // 行く — pergi
        'vg-n5-00092', // 友達 — teman
        'vg-n5-00095', // 今日 — hari ini
        'vg-n5-00096', // 明日 — besok
        'vg-n5-00117', // 一緒に — bersama
        'vg-n5-00525', // 旅行 — perjalanan, wisata
        'vg-n5-00715', // 音楽 — musik
        'vg-n5-00712', // 公園 — taman
        'vg-n5-00120', // 時々 — kadang-kadang
        'vg-n5-00119', // いつも — selalu; biasanya
        'vg-n4-00658', // 参加する — berpartisipasi, ikut serta
      ],
      grammar_ids: ['gn5-00001', 'gn5-00063', 'gn5-00010', 'gn5-00029'],
    },

    2: {
      topic      : "一緒に行きませんか — Menyetujui & Menolak (りかい)",
      topic_id   : 1,
      vocab_ids  : [
        'vg-n4-00029', // 困る — kebingungan, kesulitan
        'vg-n4-00176', // 予定 — rencana, jadwal
        'vg-n4-00179', // 計画 — rencana, proyek
        'vg-n4-00367', // 理由 — alasan
        'vg-n5-00072', // 忙しい — sibuk
        'vg-n5-00116', // まだ — masih; belum
        'vg-n5-00143', // でも — tapi; tetapi
        'vg-n5-00125', // ありがとうございます — terima kasih
        'vg-n5-00126', // どうぞ — silakan
        'vg-n5-00118', // ゆっくり — pelan-pelan; santai
      ],
      grammar_ids: ['gn4-00052', 'gn4-00051', 'gn5-00029'],
    },

    3: {
      topic      : "どうやって行きますか — Transportasi Lanjutan (かつどう)",
      topic_id   : 2,
      vocab_ids  : [
        'vg-n5-00087', // 電車 — kereta listrik
        'vg-n5-00514', // 地下鉄 — kereta bawah tanah, MRT
        'vg-n5-00538', // 自転車 — sepeda
        'vg-n5-00537', // 自動車 — mobil
        'vg-n5-00562', // 空港 — bandara
        'vg-n5-00713', // 飛行機 — pesawat
        'vg-n5-00714', // 船 — kapal
        'vg-n4-00054', // 乗り換える — transit, ganti kendaraan
        'vg-n5-00045', // 乗る — naik (kendaraan)
        'vg-n5-00044', // 降りる — turun (dari kendaraan)
        'vg-n5-00180', // かかる — membutuhkan (waktu/biaya)
        'vg-n5-00088', // 駅 — stasiun
      ],
      grammar_ids: ['gn5-00065', 'gn4-00004'],
    },

    4: {
      topic      : "どうやって行きますか — Menjelaskan Rute (りかい)",
      topic_id   : 2,
      vocab_ids  : [
        'vg-n5-00007', // 歩く — berjalan
        'vg-n5-00149', // 右 — kanan
        'vg-n5-00150', // 左 — kiri
        'vg-n5-00512', // 上 — atas
        'vg-n5-00515', // 下 — bawah
        'vg-n5-00558', // 道 — jalan
        'vg-n5-00461', // 前 — depan, sebelum
        'vg-n5-00463', // 後ろ — belakang
        'vg-n4-00169', // 渡る — menyeberang
        'vg-n4-00442', // 通る — melewati
        'vg-n5-00456', // 間に合う — tepat waktu
        'vg-n5-00088', // 駅 — stasiun
      ],
      grammar_ids: ['gn5-00028', 'gn5-00029', 'gn5-00047'],
    },

    5: {
      topic      : "何ができますか — Kemampuan dan Izin (かつどう)",
      topic_id   : 3,
      vocab_ids  : [
        'vg-n5-00078', // 上手 — pandai, mahir
        'vg-n5-00079', // 下手 — tidak pandai, kurang mahir
        'vg-n4-00100', // 練習 — latihan, berlatih
        'vg-n4-00064', // 調べる — menyelidiki, mencari tahu
        'vg-n4-00130', // 決める — memutuskan, menentukan
        'vg-n5-00025', // 使う — menggunakan
        'vg-n5-00041', // 教える — mengajar; memberitahu
        'vg-n5-00042', // 覚える — mengingat; menghafal
        'vg-n5-00031', // 話す — berbicara
        'vg-n5-00013', // 聞く — mendengar; bertanya
        'vg-n5-00033', // 読む — membaca
        'vg-n5-00012', // 書く — menulis
      ],
      grammar_ids: ['gn5-00050'],
    },

    6: {
      topic      : "何ができますか — Aturan dan Larangan (りかい)",
      topic_id   : 3,
      vocab_ids  : [
        'vg-n4-00447', // 安全 — keselamatan; keamanan
        'vg-n4-00502', // 便利 — praktis; mudah; berguna
        'vg-n4-00503', // 不便 — tidak praktis; tidak nyaman
        'vg-n4-00359', // 問題 — masalah, soal
        'vg-n4-00506', // 必要 — perlu; diperlukan
        'vg-n5-00083', // 大切 — penting, berharga
        'vg-n5-00059', // 良い — bagus, baik
        'vg-n5-00060', // 悪い — buruk, jelek
        'vg-n4-00512', // 大丈夫 — tidak apa-apa; baik-baik saja
        'vg-n5-00116', // まだ — masih; belum
        'vg-n5-00115', // もう — sudah; lagi
      ],
      grammar_ids: ['gn5-00040', 'gn5-00030', 'gn5-00002'],
    },

    7: {
      topic      : "どうしてですか — Menyatakan Alasan (かつどう)",
      topic_id   : 4,
      vocab_ids  : [
        'vg-n4-00367', // 理由 — alasan
        'vg-n4-00368', // 意見 — pendapat, opini
        'vg-n4-00032', // 心配 — khawatir, cemas
        'vg-n4-00336', // 悩む — merasa dilema, khawatir
        'vg-n4-00338', // 迷う — tersesat; bingung memilih
        'vg-n4-00142', // 喜ぶ — merasa senang, bergembira
        'vg-n4-00144', // 悲しい — sedih
        'vg-n4-00335', // 驚く — terkejut, terkagum
        'vg-n5-00143', // でも — tapi; tetapi
        'vg-n5-00144', // そして — dan kemudian; lalu
      ],
      grammar_ids: ['gn5-00044', 'gn4-00025', 'gn5-00012'],
    },

    8: {
      topic      : "どうしてですか — Menyatakan Sebab-Akibat (りかい)",
      topic_id   : 4,
      vocab_ids  : [
        'vg-n4-00136', // 変わる — berubah
        'vg-n4-00234', // 増える — bertambah (intransitif)
        'vg-n4-00236', // 減る — berkurang (intransitif)
        'vg-n4-00110', // 続ける — melanjutkan
        'vg-n4-00105', // 始める — memulai
        'vg-n4-00133', // 選ぶ — memilih
        'vg-n5-00046', // 終わる — selesai, berakhir
        'vg-n5-00047', // 始まる — dimulai
        'vg-n5-00114', // 少し — sedikit
        'vg-n5-00113', // たくさん — banyak
      ],
      grammar_ids: ['gn5-00051', 'gn5-00043', 'gn5-00054', 'gn5-00040'],
    },

    9: {
      topic      : "どんなところですか — Mendeskripsikan Tempat (かつどう)",
      topic_id   : 5,
      vocab_ids  : [
        'vg-n5-00081', // 静か — tenang, hening
        'vg-n5-00082', // 賑やか — ramai, meriah
        'vg-n5-00716', // 広い — luas; lebar
        'vg-n5-00717', // 狭い — sempit; kecil
        'vg-n5-00718', // 遠い — jauh
        'vg-n5-00719', // 近い — dekat
        'vg-n5-00061', // 高い — tinggi; mahal
        'vg-n4-00502', // 便利 — praktis; mudah; berguna
        'vg-n4-00447', // 安全 — keselamatan; keamanan
        'vg-n4-00042', // 海 — laut
        'vg-n4-00050', // 港 — pelabuhan
        'vg-n4-00122', // 図書館 — perpustakaan
        'vg-n4-00469', // 美術館 — museum seni
        'vg-n4-00475', // 動物園 — kebun binatang
      ],
      grammar_ids: ['gn5-00012', 'gn5-00005', 'gn4-00034', 'gn5-00081'],
    },

    10: {
      topic      : "どんなところですか — Tempat Wisata dan Alam (りかい)",
      topic_id   : 5,
      vocab_ids  : [
        'vg-n5-00131', // 山 — gunung
        'vg-n4-00042', // 海 — laut
        'vg-n5-00132', // 川 — sungai
        'vg-n5-00133', // 花 — bunga
        'vg-n5-00133', // 花 — bunga
        'vg-n5-00134', // 雨 — hujan
        'vg-n5-00135', // 雪 — salju
        'vg-n4-00038', // 台風 — topan, taifun
        'vg-n4-00037', // 風 — angin
        'vg-n4-00525', // 地震 — gempa bumi
        'vg-n5-00672', // はれ — cerah
        'vg-n5-00673', // くもり — mendung
        'vg-n4-00524', // 季節 — musim
      ],
      grammar_ids: ['gn5-00036', 'gn5-00044', 'gn5-00056'],
    },

    11: {
      topic      : "どのくらいかかりますか — Waktu dan Biaya (かつどう)",
      topic_id   : 6,
      vocab_ids  : [
        'vg-n5-00094', // 時間 — waktu; jam (durasi)
        'vg-n5-00094', // 時間 — waktu; jam (durasi)
        'vg-n5-00099', // お金 — uang
        'vg-n5-00180', // かかる — membutuhkan (waktu/biaya)
        'vg-n5-00489', // 円 — ① bulat ② yen (mata uang)
        'vg-n5-00037', // 買う — membeli
        'vg-n5-00039', // 貸す — meminjamkan
        'vg-n5-00040', // 借りる — meminjam
        'vg-n4-00674', // 予約する — memesan, mereservasi
        'vg-n4-00282', // キャンセル — pembatalan, membatalkan
        'vg-n5-00062', // 安い — murah
        'vg-n5-00061', // 高い — tinggi; mahal
      ],
      grammar_ids: ['gn5-00008', 'gn5-00058', 'gn5-00078', 'gn4-00003'],
    },

    12: {
      topic      : "どのくらいかかりますか — Perbandingan Harga & Waktu (りかい)",
      topic_id   : 6,
      vocab_ids  : [
        'vg-n5-00113', // たくさん — banyak
        'vg-n5-00114', // 少し — sedikit
        'vg-n5-00628', // もっと — lebih (lagi)
        'vg-n5-00114', // 少し — sedikit
        'vg-n5-00478', // 多い — banyak
        'vg-n5-00477', // 少ない — sedikit, tidak banyak
        'vg-n5-00115', // もう — sudah; lagi
        'vg-n5-00453', // 一週間 — satu minggu
        'vg-n5-00471', // 一年 — satu tahun
      ],
      grammar_ids: ['gn5-00026', 'gn5-00024', 'gn5-00036', 'gn4-00073'],
    },

    13: {
      topic      : "何かありましたか — Melaporkan Kejadian (かつどう)",
      topic_id   : 7,
      vocab_ids  : [
        'vg-n4-00529', // 事故 — kecelakaan
        'vg-n4-00525', // 地震 — gempa bumi
        'vg-n4-00038', // 台風 — topan, taifun
        'vg-n4-00288', // ニュース — berita
        'vg-n4-00335', // 驚く — terkejut, terkagum
        'vg-n4-00029', // 困る — kebingungan, kesulitan
        'vg-n4-00336', // 悩む — merasa dilema, khawatir
        'vg-n4-00486', // 怖い — menakutkan; seram
        'vg-n4-00487', // 寂しい — kesepian
        'vg-n4-00144', // 悲しい — sedih
        'vg-n4-00142', // 喜ぶ — merasa senang, bergembira
        'vg-n4-00419', // 謝る — meminta maaf
      ],
      grammar_ids: ['gn4-00048', 'gn4-00053', 'gn5-00056', 'gn5-00048'],
    },

    14: {
      topic      : "何かありましたか — Cerita Pengalaman (りかい)",
      topic_id   : 7,
      vocab_ids  : [
        'vg-n4-00365', // 経験 — pengalaman
        'vg-n4-00357', // 機会 — kesempatan, peluang
        'vg-n4-00434', // 楽しむ — menikmati
        'vg-n5-00540', // 花見 — melihat bunga sakura
        'vg-n5-00110', // 写真 — foto
        'vg-n5-00525', // 旅行 — perjalanan, wisata
        'vg-n5-00001', // 会う — bertemu
        'vg-n5-00092', // 友達 — teman
        'vg-n5-00117', // 一緒に — bersama
        'vg-n5-00500', // 東京 — Tokyo
        'vg-n4-00353', // 文化 — budaya
        'vg-n4-00355', // 習慣 — kebiasaan, adat
      ],
      grammar_ids: ['gn5-00012', 'gn4-00061', 'gn4-00025', 'gn4-00023'],
    },

    15: {
      topic      : "どうしたらいいですか — Meminta Saran (かつどう)",
      topic_id   : 8,
      vocab_ids  : [
        'vg-n4-00537', // 相談 — konsultasi; diskusi
        'vg-n4-00116', // 頼む — meminta tolong, memohon
        'vg-n4-00660', // 説明する — menjelaskan
        'vg-n4-00362', // 方法 — cara, metode
        'vg-n4-00358', // 場合 — kasus, situasi, kondisi
        'vg-n4-00359', // 問題 — masalah, soal
        'vg-n4-00506', // 必要 — perlu; diperlukan
        'vg-n5-00070', // 難しい — sulit
        'vg-n5-00071', // 易しい — mudah, gampang
        'vg-n4-00512', // 大丈夫 — tidak apa-apa; baik-baik saja
        'vg-n5-00484', // 安心する — merasa lega
        'vg-n5-00031', // 話す — berbicara
      ],
      grammar_ids: ['gn4-00048', 'gn5-00035', 'gn5-00017', 'gn5-00054', 'gn5-00056'],
    },

    16: {
      topic      : "どうしたらいいですか — Memberikan Saran (りかい)",
      topic_id   : 8,
      vocab_ids  : [
        'vg-n4-00064', // 調べる — menyelidiki, mencari tahu
        'vg-n4-00110', // 続ける — melanjutkan
        'vg-n4-00100', // 練習 — latihan, berlatih
        'vg-n4-00105', // 始める — memulai
        'vg-n4-00130', // 決める — memutuskan, menentukan
        'vg-n4-00133', // 選ぶ — memilih
        'vg-n5-00041', // 教える — mengajar; memberitahu
        'vg-n5-00042', // 覚える — mengingat; menghafal
        'vg-n5-00119', // いつも — selalu; biasanya
        'vg-n5-00118', // ゆっくり — pelan-pelan; santai
        'vg-n4-00367', // 理由 — alasan
        'vg-n4-00368', // 意見 — pendapat, opini
      ],
      grammar_ids: ['gn4-00038', 'gn4-00068', 'gn4-00046'],
    },

    17: {
      topic      : "どんな生活ですか — Kehidupan Sehari-hari (かつどう)",
      topic_id   : 9,
      vocab_ids  : [
        'vg-n5-00415', // 生活 — kehidupan
        'vg-n5-00019', // 住む — tinggal, menetap
        'vg-n5-00030', // 働く — bekerja
        'vg-n4-00087', // 部屋 — kamar
        'vg-n5-00086', // 会社 — perusahaan
        'vg-n4-00094', // 引っ越す — pindah rumah
        'vg-n5-00035', // 起きる — bangun (tidur); terjadi
        'vg-n5-00036', // 寝る — tidur
        'vg-n5-00104', // 朝 — pagi
        'vg-n5-00105', // 夜 — malam
        'vg-n5-00072', // 忙しい — sibuk
        'vg-n5-00475', // 毎日 — setiap hari
      ],
      grammar_ids: ['gn5-00017', 'gn5-00038', 'gn5-00039'],
    },

    18: {
      topic      : "どんな生活ですか — Kebiasaan dan Budaya (りかい)",
      topic_id   : 9,
      vocab_ids  : [
        'vg-n4-00355', // 習慣 — kebiasaan, adat
        'vg-n4-00353', // 文化 — budaya
        'vg-n4-00136', // 変わる — berubah
        'vg-n4-00234', // 増える — bertambah (intransitif)
        'vg-n4-00236', // 減る — berkurang (intransitif)
        'vg-n5-00474', // 毎年 — setiap tahun
        'vg-n5-00476', // 毎月 — setiap bulan
        'vg-n5-00119', // いつも — selalu; biasanya
        'vg-n5-00120', // 時々 — kadang-kadang
        'vg-n4-00524', // 季節 — musim
        'vg-n5-00106', // 週末 — akhir pekan
        'vg-n4-00365', // 経験 — pengalaman
      ],
      grammar_ids: ['gn4-00087', 'gn5-00037', 'gn4-00047'],
    },
  },
};
