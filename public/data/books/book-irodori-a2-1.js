// ⚠️  LEGACY: vocab IDs in this file use old format (v-n5-s#### / v-n5-####).
// These do NOT match current vocabDB (vg-n5-00001 format).
// Lookups against vocabDB will silently return undefined.
// Pending: ID reconciliation via mapping script (see CLAUDE.md §7).
// Do NOT restructure this file until the vocab ID migration is complete.

// ══════════════════════════════════════════════════════
//  book-irodori-a2-1.js — Irodori A2-1 · Unit Index
//  Source: Irodori: Japanese for Life in Japan (JF Standard A2 Part 1)
//          Japan Foundation — freely available online
//  Units: 1–18  (9 トピック × 2 sections: かつどう + りかい)
//  Status: FILLED by Agent 3 — vocab_ids dari vocabDB N5 + N4
//
//  Struktur:
//    Unit 1–2   → トピック 1: 一緒に行きませんか
//    Unit 3–4   → トピック 2: どうやって行きますか
//    Unit 5–6   → トピック 3: 何ができますか
//    Unit 7–8   → トピック 4: どうしてですか
//    Unit 9–10  → トピック 5: どんなところですか
//    Unit 11–12 → トピック 6: どのくらいかかりますか
//    Unit 13–14 → トピック 7: 何かありましたか
//    Unit 15–16 → トピック 8: どうしたらいいですか
//    Unit 17–18 → トピック 9: どんな生活ですか
//
//  ⚠ vocab_ids hanya merujuk id yang ada di vocabDB.
//  Kata yang belum ada dicatat di MISSING_VOCAB di bawah.
// ══════════════════════════════════════════════════════

window.bookIrodoriA2_1 = {
  meta: {
    book      : 'irodori-a2-1',
    title     : 'Irodori: Japanese for Life in Japan — A2-1',
    publisher : 'Japan Foundation',
    jf_level  : 'A2',
    jlpt_range: ['n5', 'n4'],
    units     : 18,
    url       : 'https://www.irodori.jpf.go.jp/',
  },
  units: {

    // ── トピック 1: 一緒に行きませんか ───────────────────────────
    1: {
      topic      : '一緒に行きませんか — Mengajak (かつどう)',
      topic_id   : 1,
      vocab_ids  : [
        'v-n5-0001',  // 会う — bertemu
        'v-n5-0009',  // 行く — pergi
        'v-n5-0092',  // 友達 — teman
        'v-n5-0095',  // 今日 — hari ini
        'v-n5-0096',  // 明日 — besok
        'v-n5-0117',  // 一緒に — bersama
        'v-n5-s0150', // 旅行 — perjalanan, wisata
        'v-n5-s0367', // 音楽 — musik
        'v-n5-s0357', // 公園 — taman
        'v-n5-0120',  // 時々 — kadang-kadang
        'v-n5-0119',  // いつも — selalu; biasanya
        'v-n4-0166',  // 参加する — ikut serta
      ],
      grammar_ids: [],
    },

    2: {
      topic      : '一緒に行きませんか — Menyetujui & Menolak (りかい)',
      topic_id   : 1,
      vocab_ids  : [
        'v-n4-0030',  // 困る — kebingungan, kesulitan
        'v-n4-0178',  // 予定 — rencana, jadwal
        'v-n4-0181',  // 計画 — rencana, perencanaan
        'v-n4-0402',  // 理由 — alasan
        'v-n5-0072',  // 忙しい — sibuk
        'v-n5-0116',  // まだ — masih; belum
        'v-n5-0143',  // でも — tapi; tetapi
        'v-n5-0125',  // ありがとうございます — terima kasih
        'v-n5-0126',  // どうぞ — silakan
        'v-n5-0118',  // ゆっくり — pelan-pelan; santai
      ],
      grammar_ids: [],
    },

    // ── トピック 2: どうやって行きますか ─────────────────────────
    3: {
      topic      : 'どうやって行きますか — Transportasi Lanjutan (かつどう)',
      topic_id   : 2,
      vocab_ids  : [
        'v-n5-s0171', // 電車 — kereta listrik
        'v-n5-s0131', // 地下鉄 — MRT, kereta bawah tanah
        'v-n5-s0178', // 自転車 — sepeda
        'v-n5-s0177', // 自動車 — mobil
        'v-n5-s0213', // 空港 — bandara
        'v-n5-s0379', // 飛行機 — pesawat
        'v-n5-s0380', // 船 — kapal
        'v-n4-0055',  // 乗り換える — berganti (kendaraan)
        'v-n5-0045',  // 乗る — naik (kendaraan)
        'v-n5-0044',  // 降りる — turun (dari kendaraan)
        'v-n5-s0296', // かかる — membutuhkan (waktu/uang)
        'v-n5-s0109', // 駅 — stasiun
      ],
      grammar_ids: [],
    },

    4: {
      topic      : 'どうやって行きますか — Menjelaskan Rute (りかい)',
      topic_id   : 2,
      vocab_ids  : [
        'v-n5-0007',  // 歩く — berjalan
        'v-n5-0149',  // 右 — kanan
        'v-n5-0150',  // 左 — kiri
        'v-n5-s0129', // 上 — atas
        'v-n5-s0132', // 下 — bawah
        'v-n5-s0208', // 道 — jalan
        'v-n5-s0057', // 前 — depan; sebelum
        'v-n5-s0061', // 後ろ — belakang
        'v-n4-0171',  // 渡る — menyeberangi
        'v-n4-0477',  // 通る — melewati
        'v-n5-s0052', // 間に合う — tepat waktu
        'v-n5-0088',  // 駅 — stasiun
      ],
      grammar_ids: [],
    },

    // ── トピック 3: 何ができますか ────────────────────────────────
    5: {
      topic      : '何ができますか — Kemampuan dan Izin (かつどう)',
      topic_id   : 3,
      vocab_ids  : [
        'v-n5-0078',  // 上手 — pandai, mahir
        'v-n5-0079',  // 下手 — tidak pandai
        'v-n4-0101',  // 練習 — latihan, berlatih
        'v-n4-0065',  // 調べる — menyelidiki, mencari tahu
        'v-n4-0131',  // 決める — memutuskan
        'v-n5-0025',  // 使う — menggunakan
        'v-n5-0041',  // 教える — mengajar; memberitahu
        'v-n5-0042',  // 覚える — mengingat; menghafal
        'v-n5-0031',  // 話す — berbicara
        'v-n5-0013',  // 聞く — mendengar; bertanya
        'v-n5-0033',  // 読む — membaca
        'v-n5-0012',  // 書く — menulis
      ],
      grammar_ids: [],
    },

    6: {
      topic      : '何ができますか — Aturan dan Larangan (りかい)',
      topic_id   : 3,
      vocab_ids  : [
        'v-n4-0482',  // 安全 — aman, selamat
        'v-n4-0537',  // 便利 — praktis, nyaman
        'v-n4-0538',  // 不便 — tidak praktis
        'v-n4-0394',  // 問題 — masalah
        'v-n4-0541',  // 必要 — diperlukan, perlu
        'v-n5-0083',  // 大切 — penting, berharga
        'v-n5-0059',  // 良い — bagus, baik
        'v-n5-0060',  // 悪い — buruk, jelek
        'v-n4-0547',  // 大丈夫 — tidak apa-apa, oke
        'v-n5-0116',  // まだ — masih; belum
        'v-n5-0115',  // もう — sudah; lagi
      ],
      grammar_ids: [],
    },

    // ── トピック 4: どうしてですか ────────────────────────────────
    7: {
      topic      : 'どうしてですか — Menyatakan Alasan (かつどう)',
      topic_id   : 4,
      vocab_ids  : [
        'v-n4-0402',  // 理由 — alasan
        'v-n4-0403',  // 意見 — pendapat
        'v-n4-0033',  // 心配 — khawatir, cemas
        'v-n4-0369',  // 悩む — bingung, galau
        'v-n4-0371',  // 迷う — ragu-ragu, bimbang
        'v-n4-0143',  // 喜ぶ — bergembira, senang
        'v-n4-0145',  // 悲しい — sedih
        'v-n4-0367',  // 驚く — terkejut
        'v-n5-0143',  // でも — tapi; tetapi
        'v-n5-0144',  // そして — dan kemudian; lalu
        'v-n5-0141',  // 〜から — dari; karena
      ],
      grammar_ids: [],
    },

    8: {
      topic      : 'どうしてですか — Menyatakan Sebab-Akibat (りかい)',
      topic_id   : 4,
      vocab_ids  : [
        'v-n4-0137',  // 変わる — berubah
        'v-n4-0236',  // 増える — bertambah
        'v-n4-0238',  // 減る — berkurang
        'v-n4-0111',  // 続ける — melanjutkan
        'v-n4-0106',  // 始める — memulai
        'v-n4-0134',  // 選ぶ — memilih
        'v-n5-0046',  // 終わる — selesai, berakhir
        'v-n5-0047',  // 始まる — dimulai
        'v-n5-0114',  // 少し — sedikit
        'v-n5-0113',  // たくさん — banyak
      ],
      grammar_ids: [],
    },

    // ── トピック 5: どんなところですか ───────────────────────────
    9: {
      topic      : 'どんなところですか — Mendeskripsikan Tempat (かつどう)',
      topic_id   : 5,
      vocab_ids  : [
        'v-n5-0081',  // 静か — tenang, hening
        'v-n5-0082',  // 賑やか — ramai, meriah
        'v-n5-s0272', // 広い — luas, lebar
        'v-n5-s0271', // 狭い — sempit
        'v-n5-s0273', // 遠い — jauh
        'v-n5-s0274', // 近い — dekat
        'v-n5-0061',  // 高い — tinggi; mahal
        'v-n4-0537',  // 便利 — praktis, nyaman
        'v-n4-0482',  // 安全 — aman, selamat
        'v-n4-0043',  // 海 — laut
        'v-n4-0051',  // 港 — pelabuhan
        'v-n4-0123',  // 図書館 — perpustakaan
        'v-n4-0504',  // 美術館 — museum seni
        'v-n5-s0358', // 動物園 — kebun binatang
      ],
      grammar_ids: [],
    },

    10: {
      topic      : 'どんなところですか — Tempat Wisata dan Alam (りかい)',
      topic_id   : 5,
      vocab_ids  : [
        'v-n5-0131',  // 山 — gunung
        'v-n5-s0359', // 海 — laut
        'v-n5-0132',  // 川 — sungai
        'v-n5-0133',  // 花 — bunga
        'v-n5-s0181', // 花 (soumatome) — bunga
        'v-n5-0134',  // 雨 — hujan
        'v-n5-0135',  // 雪 — salju
        'v-n4-0039',  // 台風 — topan, badai
        'v-n4-0038',  // 風 — angin
        'v-n4-0560',  // 地震 — gempa bumi
        'v-n5-s0382', // 晴れ — cerah
        'v-n5-s0383', // 曇り — mendung
        'v-n4-0559',  // 季節 — musim
      ],
      grammar_ids: [],
    },

    // ── トピック 6: どのくらいかかりますか ──────────────────────
    11: {
      topic      : 'どのくらいかかりますか — Waktu dan Biaya (かつどう)',
      topic_id   : 6,
      vocab_ids  : [
        'v-n5-0094',  // 時間 — waktu; jam (durasi)
        'v-n5-s0048', // 時間 (soumatome) — waktu
        'v-n5-0099',  // お金 — uang
        'v-n5-s0296', // かかる — membutuhkan (waktu/uang)
        'v-n5-s0098', // 円 — yen
        'v-n5-0037',  // 買う — membeli
        'v-n5-0039',  // 貸す — meminjamkan
        'v-n5-0040',  // 借りる — meminjam
        'v-n4-0313',  // 予約する — memesan, reservasi
        'v-n4-0284',  // キャンセル — batalkan, cancel
        'v-n5-0062',  // 安い — murah
        'v-n5-0061',  // 高い — mahal; tinggi
      ],
      grammar_ids: [],
    },

    12: {
      topic      : 'どのくらいかかりますか — Perbandingan Harga & Waktu (りかい)',
      topic_id   : 6,
      vocab_ids  : [
        'v-n5-0113',  // たくさん — banyak
        'v-n5-0114',  // 少し — sedikit
        'v-n5-s0315', // もっと — lebih (lagi)
        'v-n5-s0078', // 少し (soumatome) — sedikit
        'v-n5-s0080', // 多い — banyak
        'v-n5-s0079', // 少ない — sedikit, tidak banyak
        'v-n5-0115',  // もう — sudah; lagi
        'v-n5-s0049', // 一週間 — satu minggu
        'v-n5-s0070', // 一年 — satu tahun
        'v-n5-0141',  // 〜から — dari; karena
        'v-n5-0142',  // 〜まで — sampai; hingga
      ],
      grammar_ids: [],
    },

    // ── トピック 7: 何かありましたか ─────────────────────────────
    13: {
      topic      : '何かありましたか — Melaporkan Kejadian (かつどう)',
      topic_id   : 7,
      vocab_ids  : [
        'v-n4-0564',  // 事故 — kecelakaan
        'v-n4-0560',  // 地震 — gempa bumi
        'v-n4-0039',  // 台風 — topan, badai
        'v-n4-0290',  // ニュース — berita
        'v-n4-0367',  // 驚く — terkejut
        'v-n4-0030',  // 困る — kesulitan, kebingungan
        'v-n4-0369',  // 悩む — bingung, galau
        'v-n4-0521',  // 怖い — takut, menakutkan
        'v-n4-0522',  // 寂しい — sepi, kesepian
        'v-n4-0145',  // 悲しい — sedih
        'v-n4-0143',  // 喜ぶ — bergembira
        'v-n4-0454',  // 謝る — meminta maaf
      ],
      grammar_ids: [],
    },

    14: {
      topic      : '何かありましたか — Cerita Pengalaman (りかい)',
      topic_id   : 7,
      vocab_ids  : [
        'v-n4-0400',  // 経験 — pengalaman
        'v-n4-0392',  // 機会 — kesempatan
        'v-n4-0469',  // 楽しむ — menikmati
        'v-n5-s0182', // 花見 — melihat bunga sakura
        'v-n5-0110',  // 写真 — foto
        'v-n5-s0150', // 旅行 — perjalanan, wisata
        'v-n5-0001',  // 会う — bertemu
        'v-n5-0092',  // 友達 — teman
        'v-n5-0117',  // 一緒に — bersama
        'v-n5-s0119', // 〜東京 (ref tempat) — Tokyo
        'v-n4-0388',  // 文化 — budaya
        'v-n4-0390',  // 習慣 — kebiasaan
      ],
      grammar_ids: [],
    },

    // ── トピック 8: どうしたらいいですか ─────────────────────────
    15: {
      topic      : 'どうしたらいいですか — Meminta Saran (かつどう)',
      topic_id   : 8,
      vocab_ids  : [
        'v-n4-0572',  // 相談 — konsultasi, berunding
        'v-n4-0117',  // 頼む — meminta, memohon
        'v-n4-0485',  // 説明する — menjelaskan
        'v-n4-0397',  // 方法 — cara, metode
        'v-n4-0393',  // 場合 — situasi, kasus
        'v-n4-0394',  // 問題 — masalah
        'v-n4-0541',  // 必要 — diperlukan, perlu
        'v-n5-0070',  // 難しい — sulit
        'v-n5-0071',  // 易しい — mudah
        'v-n4-0547',  // 大丈夫 — tidak apa-apa, oke
        'v-n5-s0088', // 安心する — merasa lega
        'v-n5-0031',  // 話す — berbicara
      ],
      grammar_ids: [],
    },

    16: {
      topic      : 'どうしたらいいですか — Memberikan Saran (りかい)',
      topic_id   : 8,
      vocab_ids  : [
        'v-n4-0065',  // 調べる — menyelidiki, mencari tahu
        'v-n4-0111',  // 続ける — melanjutkan
        'v-n4-0101',  // 練習 — latihan, berlatih
        'v-n4-0106',  // 始める — memulai
        'v-n4-0131',  // 決める — memutuskan
        'v-n4-0134',  // 選ぶ — memilih
        'v-n5-0041',  // 教える — mengajar; memberitahu
        'v-n5-0042',  // 覚える — mengingat; menghafal
        'v-n5-0119',  // いつも — selalu; biasanya
        'v-n5-0118',  // ゆっくり — pelan-pelan; santai
        'v-n4-0402',  // 理由 — alasan
        'v-n4-0403',  // 意見 — pendapat
      ],
      grammar_ids: [],
    },

    // ── トピック 9: どんな生活ですか ──────────────────────────────
    17: {
      topic      : 'どんな生活ですか — Kehidupan Sehari-hari (かつどう)',
      topic_id   : 9,
      vocab_ids  : [
        'v-n5-s0005', // 生活 — kehidupan
        'v-n5-0019',  // 住む — tinggal, menetap
        'v-n5-0030',  // 働く — bekerja
        'v-n4-0088',  // 部屋 — kamar, ruangan
        'v-n5-s0101', // 会社 — perusahaan
        'v-n4-0095',  // 引っ越す — pindah rumah
        'v-n5-0035',  // 起きる — bangun tidur
        'v-n5-0036',  // 寝る — tidur
        'v-n5-0104',  // 朝 — pagi
        'v-n5-0105',  // 夜 — malam
        'v-n5-0072',  // 忙しい — sibuk
        'v-n5-s0076', // 毎日 — setiap hari
      ],
      grammar_ids: [],
    },

    18: {
      topic      : 'どんな生活ですか — Kebiasaan dan Budaya (りかい)',
      topic_id   : 9,
      vocab_ids  : [
        'v-n4-0390',  // 習慣 — kebiasaan, tradisi
        'v-n4-0388',  // 文化 — budaya
        'v-n4-0137',  // 変わる — berubah
        'v-n4-0236',  // 増える — bertambah
        'v-n4-0238',  // 減る — berkurang
        'v-n5-s0075', // 毎年 — setiap tahun
        'v-n5-s0077', // 毎月 — setiap bulan
        'v-n5-0119',  // いつも — selalu; biasanya
        'v-n5-0120',  // 時々 — kadang-kadang
        'v-n4-0559',  // 季節 — musim
        'v-n5-0106',  // 週末 — akhir pekan
        'v-n4-0400',  // 経験 — pengalaman
      ],
      grammar_ids: [],
    },

  },
};

// ══════════════════════════════════════════════════════
//  MISSING_VOCAB — Kata Irodori A2-1 yang BELUM ada di vocabDB
//  Perlu dibuatkan oleh Agent Vocab (Agent N2/N5)
// ══════════════════════════════════════════════════════
//
//  Unit 1–2  : 一緒に行きませんか
//    - [ ] 楽しい (たのしい) — menyenangkan, asik (adj-i, N5) ← PENTING
//    - [ ] 断る (ことわる) — menolak (verb-u, N4)
//
//  Unit 3–4  : どうやって行きますか
//    - [ ] バス — bus (noun, N5)
//    - [ ] タクシー — taksi (noun, N5)
//    - [ ] 曲がる (まがる) — belok (verb-u, N4)
//    - [ ] 向かう (むかう) — menuju (verb-u, N4)
//    - [ ] 戻る (もどる) — kembali (verb-u, N4)
//
//  Unit 5–6  : 何ができますか
//    - [ ] 禁止 (きんし) — larangan (noun, N4)
//    - [ ] 許可 (きょか) — izin (noun, N4)
//
//  Unit 9–10 : どんなところですか
//    - [ ] 博物館 (はくぶつかん) — museum (noun, N4)
//    - [ ] 春 (はる) — musim semi (noun, N5)
//    - [ ] 夏 (なつ) — musim panas (noun, N5)
//    - [ ] 秋 (あき) — musim gugur (noun, N5)
//    - [ ] 冬 (ふゆ) — musim dingin (noun, N5)
//    - [ ] 気温 (きおん) — suhu udara (noun, N4)
//
//  Unit 13–14: 何かありましたか
//    - [ ] 映画 (えいが) — film, bioskop (noun, N5) ← PENTING
//    - [ ] 有名な (ゆうめいな) — terkenal (adj-na, N5)
//    - [ ] 歴史 (れきし) — sejarah (noun, N4)
//
//  Unit 17–18: どんな生活ですか
//    - [ ] 仕事 (しごと) — pekerjaan (noun, N5) ← PENTING
//    - [ ] アルバイト → sudah ada: v-n4-0280 ✅
//    - [ ] チェックイン — check-in (noun-suru, N4)
//    - [ ] インターネット — internet (noun, N4)
//
// ══════════════════════════════════════════════════════
