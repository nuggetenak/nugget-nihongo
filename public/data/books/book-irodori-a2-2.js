// ⚠️  LEGACY: vocab IDs in this file use old format (v-n5-s#### / v-n5-####).
// These do NOT match current vocabDB (vg-n5-00001 format).
// Lookups against vocabDB will silently return undefined.
// Pending: ID reconciliation via mapping script (see CLAUDE.md §7).
// Do NOT restructure this file until the vocab ID migration is complete.

// ══════════════════════════════════════════════════════
//  book-irodori-a2-2.js — Irodori A2-2 · Unit Index
//  Source: Irodori: Japanese for Life in Japan (JF Standard A2 Part 2)
//          Japan Foundation — freely available online
//  Units: 1–18  (9 トピック × 2 sections: かつどう + りかい)
//  Status: FILLED by Agent 3 — vocab_ids dari vocabDB N5 + N4
//
//  Struktur:
//    Unit 1–2   → トピック 1: どんな仕事ですか
//    Unit 3–4   → トピック 2: 一緒にやりませんか
//    Unit 5–6   → トピック 3: どんな意見ですか
//    Unit 7–8   → トピック 4: お願いできますか
//    Unit 9–10  → トピック 5: もし～だったら
//    Unit 11–12 → トピック 6: 経験がありますか
//    Unit 13–14 → トピック 7: 友達に頼む
//    Unit 15–16 → トピック 8: 将来どうしたいですか
//    Unit 17–18 → トピック 9: 上手になりたい
//
//  ⚠ vocab_ids hanya merujuk id yang ada di vocabDB.
//  Kata yang belum ada dicatat di MISSING_VOCAB di bawah.
// ══════════════════════════════════════════════════════

window.bookIrodoriA2_2 = {
  meta: {
    book      : 'irodori-a2-2',
    title     : 'Irodori: Japanese for Life in Japan — A2-2',
    publisher : 'Japan Foundation',
    jf_level  : 'A2',
    jlpt_range: ['n4', 'n3'],
    units     : 18,
    url       : 'https://www.irodori.jpf.go.jp/',
  },
  units: {

    // ── トピック 1: どんな仕事ですか ──────────────────────────────
    1: {
      topic      : 'どんな仕事ですか — Pekerjaan dan Profesi (かつどう)',
      topic_id   : 1,
      vocab_ids  : [
        'v-n5-0030',  // 働く — bekerja
        'v-n5-s0101', // 会社 — perusahaan
        'v-n5-s0096', // 社長 — direktur
        'v-n5-s0102', // 社員 — karyawan
        'v-n5-s0001', // 先生 — guru
        'v-n4-0280',  // アルバイト — kerja part-time
        'v-n5-0093',  // 先生 (core) — guru, dokter
        'v-n4-0058',  // 会議 — rapat, pertemuan
        'v-n4-0114',  // 連絡 — kontak, kabar
        'v-n4-0307',  // 連絡する — menghubungi
        'v-n4-0169',  // 返事 — balasan, jawaban
        'v-n4-0502',  // 準備 — persiapan, mempersiapkan
      ],
      grammar_ids: [],
    },

    2: {
      topic      : 'どんな仕事ですか — Mendeskripsikan Pekerjaan (りかい)',
      topic_id   : 1,
      vocab_ids  : [
        'v-n4-0527',  // 丁寧 — sopan, teliti
        'v-n4-0536',  // 親切 — ramah, baik hati
        'v-n4-0537',  // 便利 — praktis, nyaman
        'v-n4-0541',  // 必要 — diperlukan
        'v-n4-0482',  // 安全 — aman, selamat
        'v-n5-0072',  // 忙しい — sibuk
        'v-n5-0070',  // 難しい — sulit
        'v-n5-0071',  // 易しい — mudah
        'v-n4-0394',  // 問題 — masalah
        'v-n4-0393',  // 場合 — situasi, kasus
        'v-n4-0397',  // 方法 — cara, metode
        'v-n4-0485',  // 説明する — menjelaskan
      ],
      grammar_ids: [],
    },

    // ── トピック 2: 一緒にやりませんか ───────────────────────────
    3: {
      topic      : '一緒にやりませんか — Mengajak Kegiatan (かつどう)',
      topic_id   : 2,
      vocab_ids  : [
        'v-n4-0166',  // 参加する — ikut serta, berpartisipasi
        'v-n5-s0361', // スポーツ — olahraga
        'v-n5-s0366', // サッカー — sepak bola
        'v-n5-s0364', // テニス — tenis
        'v-n5-s0365', // 水泳 — renang
        'v-n5-0043',  // 歌う — bernyanyi
        'v-n5-0034',  // 泳ぐ — berenang
        'v-n4-0469',  // 楽しむ — menikmati
        'v-n5-0117',  // 一緒に — bersama
        'v-n5-0001',  // 会う — bertemu
        'v-n4-0392',  // 機会 — kesempatan
        'v-n5-s0367', // 音楽 — musik
      ],
      grammar_ids: [],
    },

    4: {
      topic      : '一緒にやりませんか — Merespons Ajakan (りかい)',
      topic_id   : 2,
      vocab_ids  : [
        'v-n4-0178',  // 予定 — rencana, jadwal
        'v-n4-0181',  // 計画 — rencana, perencanaan
        'v-n4-0030',  // 困る — kesulitan, kebingungan
        'v-n4-0402',  // 理由 — alasan
        'v-n5-0143',  // でも — tapi; tetapi
        'v-n5-0072',  // 忙しい — sibuk
        'v-n5-0116',  // まだ — masih; belum
        'v-n5-0115',  // もう — sudah; lagi
        'v-n5-0125',  // ありがとうございます — terima kasih
        'v-n5-s0088', // 安心する — merasa lega
        'v-n4-0547',  // 大丈夫 — tidak apa-apa
      ],
      grammar_ids: [],
    },

    // ── トピック 3: どんな意見ですか ──────────────────────────────
    5: {
      topic      : 'どんな意見ですか — Menyatakan Pendapat (かつどう)',
      topic_id   : 3,
      vocab_ids  : [
        'v-n4-0403',  // 意見 — pendapat
        'v-n4-0402',  // 理由 — alasan
        'v-n4-0394',  // 問題 — masalah
        'v-n4-0397',  // 方法 — cara, metode
        'v-n4-0393',  // 場合 — situasi, kasus
        'v-n4-0572',  // 相談 — konsultasi, berunding
        'v-n4-0388',  // 文化 — budaya
        'v-n4-0390',  // 習慣 — kebiasaan, tradisi
        'v-n5-0059',  // 良い — bagus, baik
        'v-n5-0060',  // 悪い — buruk, jelek
        'v-n5-0143',  // でも — tapi; tetapi
        'v-n5-0144',  // そして — dan kemudian; lalu
      ],
      grammar_ids: [],
    },

    6: {
      topic      : 'どんな意見ですか — Berdebat dan Setuju (りかい)',
      topic_id   : 3,
      vocab_ids  : [
        'v-n4-0137',  // 変わる — berubah
        'v-n4-0236',  // 増える — bertambah
        'v-n4-0238',  // 減る — berkurang
        'v-n4-0131',  // 決める — memutuskan
        'v-n4-0134',  // 選ぶ — memilih
        'v-n4-0482',  // 安全 — aman
        'v-n4-0537',  // 便利 — praktis
        'v-n4-0538',  // 不便 — tidak praktis
        'v-n4-0541',  // 必要 — diperlukan
        'v-n5-0083',  // 大切 — penting, berharga
        'v-n4-0403',  // 意見 — pendapat
      ],
      grammar_ids: [],
    },

    // ── トピック 4: お願いできますか ──────────────────────────────
    7: {
      topic      : 'お願いできますか — Meminta Tolong (かつどう)',
      topic_id   : 4,
      vocab_ids  : [
        'v-n4-0117',  // 頼む — meminta, memohon
        'v-n4-0485',  // 説明する — menjelaskan
        'v-n5-0049',  // 送る — mengirim
        'v-n4-0063',  // 受け取る — menerima
        'v-n4-0168',  // 返す — mengembalikan
        'v-n5-0039',  // 貸す — meminjamkan
        'v-n5-0040',  // 借りる — meminjam
        'v-n5-0055',  // 見せる — memperlihatkan
        'v-n5-0041',  // 教える — mengajar; memberitahu
        'v-n4-0307',  // 連絡する — menghubungi
        'v-n5-s0173', // 電話 — telepon
        'v-n4-0169',  // 返事 — balasan, jawaban
      ],
      grammar_ids: [],
    },

    8: {
      topic      : 'お願いできますか — Formalitas Permintaan (りかい)',
      topic_id   : 4,
      vocab_ids  : [
        'v-n4-0527',  // 丁寧 — sopan, teliti
        'v-n4-0536',  // 親切 — ramah, baik hati
        'v-n4-0454',  // 謝る — meminta maaf
        'v-n4-0572',  // 相談 — konsultasi
        'v-n4-0502',  // 準備 — persiapan
        'v-n5-0124',  // すみません — permisi; maaf
        'v-n5-0125',  // ありがとうございます — terima kasih
        'v-n5-0126',  // どうぞ — silakan
        'v-n4-0547',  // 大丈夫 — tidak apa-apa, oke
        'v-n4-0030',  // 困る — kesulitan
        'v-n5-s0088', // 安心する — merasa lega
      ],
      grammar_ids: [],
    },

    // ── トピック 5: もし〜だったら ────────────────────────────────
    9: {
      topic      : 'もし〜だったら — Kondisi dan Hipotesis (かつどう)',
      topic_id   : 5,
      vocab_ids  : [
        'v-n4-0033',  // 心配 — khawatir, cemas
        'v-n4-0369',  // 悩む — bingung, galau
        'v-n4-0371',  // 迷う — ragu-ragu, bimbang
        'v-n4-0394',  // 問題 — masalah
        'v-n4-0541',  // 必要 — diperlukan
        'v-n4-0393',  // 場合 — situasi, kasus
        'v-n4-0131',  // 決める — memutuskan
        'v-n4-0547',  // 大丈夫 — tidak apa-apa
        'v-n5-0059',  // 良い — bagus, baik
        'v-n5-0060',  // 悪い — buruk, jelek
        'v-n5-s0088', // 安心する — merasa lega
        'v-n4-0402',  // 理由 — alasan
      ],
      grammar_ids: [],
    },

    10: {
      topic      : 'もし〜だったら — Skenario dan Rencana Darurat (りかい)',
      topic_id   : 5,
      vocab_ids  : [
        'v-n4-0560',  // 地震 — gempa bumi
        'v-n4-0039',  // 台風 — topan, badai
        'v-n4-0564',  // 事故 — kecelakaan
        'v-n4-0038',  // 風 — angin
        'v-n4-0482',  // 安全 — aman
        'v-n4-0290',  // ニュース — berita
        'v-n5-0089',  // 病院 — rumah sakit
        'v-n4-0072',  // 薬 — obat
        'v-n4-0073',  // 薬局 — apotek
        'v-n5-0121',  // 頭 — kepala
        'v-n5-s0186', // 病気 — sakit, penyakit
        'v-n5-s0187', // 元気 — sehat, bersemangat
      ],
      grammar_ids: [],
    },

    // ── トピック 6: 経験がありますか ──────────────────────────────
    11: {
      topic      : '経験がありますか — Pengalaman (かつどう)',
      topic_id   : 6,
      vocab_ids  : [
        'v-n4-0400',  // 経験 — pengalaman
        'v-n4-0392',  // 機会 — kesempatan
        'v-n4-0469',  // 楽しむ — menikmati
        'v-n4-0388',  // 文化 — budaya
        'v-n4-0390',  // 習慣 — kebiasaan, tradisi
        'v-n5-s0150', // 旅行 — perjalanan, wisata
        'v-n5-0043',  // 歌う — bernyanyi
        'v-n5-0034',  // 泳ぐ — berenang
        'v-n5-0005',  // 遊ぶ — bermain
        'v-n4-0043',  // 海 — laut
        'v-n5-0131',  // 山 — gunung
        'v-n5-0110',  // 写真 — foto
      ],
      grammar_ids: [],
    },

    12: {
      topic      : '経験がありますか — Cerita Pengalaman Lebih Detail (りかい)',
      topic_id   : 6,
      vocab_ids  : [
        'v-n4-0367',  // 驚く — terkejut
        'v-n4-0143',  // 喜ぶ — bergembira
        'v-n4-0145',  // 悲しい — sedih
        'v-n4-0521',  // 怖い — takut, menakutkan
        'v-n4-0372',  // 恥ずかしい — malu
        'v-n4-0522',  // 寂しい — sepi, kesepian
        'v-n4-0454',  // 謝る — meminta maaf
        'v-n5-0117',  // 一緒に — bersama
        'v-n5-0119',  // いつも — selalu; biasanya
        'v-n4-0559',  // 季節 — musim
        'v-n5-0107',  // 来年 — tahun depan
      ],
      grammar_ids: [],
    },

    // ── トピック 7: 友達に頼む ────────────────────────────────────
    13: {
      topic      : '友達に頼む — Meminta Bantuan Teman (かつどう)',
      topic_id   : 7,
      vocab_ids  : [
        'v-n4-0117',  // 頼む — meminta, memohon
        'v-n5-0039',  // 貸す — meminjamkan
        'v-n5-0040',  // 借りる — meminjam
        'v-n5-0049',  // 送る — mengirim; mengantarkan
        'v-n4-0063',  // 受け取る — menerima
        'v-n4-0168',  // 返す — mengembalikan
        'v-n5-0092',  // 友達 — teman
        'v-n5-0001',  // 会う — bertemu
        'v-n5-0031',  // 話す — berbicara
        'v-n4-0572',  // 相談 — konsultasi, berunding
        'v-n5-0125',  // ありがとうございます — terima kasih
        'v-n4-0454',  // 謝る — meminta maaf
      ],
      grammar_ids: [],
    },

    14: {
      topic      : '友達に頼む — Ekspresi Terima Kasih (りかい)',
      topic_id   : 7,
      vocab_ids  : [
        'v-n5-0050',  // もらう — menerima (dari orang lain)
        'v-n5-0051',  // あげる — memberikan (ke orang lain)
        'v-n5-0052',  // くれる — memberikan (ke saya)
        'v-n4-0114',  // 連絡 — kontak, kabar
        'v-n4-0169',  // 返事 — balasan, jawaban
        'v-n4-0527',  // 丁寧 — sopan, teliti
        'v-n4-0536',  // 親切 — ramah, baik hati
        'v-n5-0124',  // すみません — permisi; maaf
        'v-n5-0126',  // どうぞ — silakan
        'v-n4-0547',  // 大丈夫 — tidak apa-apa, oke
        'v-n4-0392',  // 機会 — kesempatan
      ],
      grammar_ids: [],
    },

    // ── トピック 8: 将来どうしたいですか ─────────────────────────
    15: {
      topic      : '将来どうしたいですか — Rencana Masa Depan (かつどう)',
      topic_id   : 8,
      vocab_ids  : [
        'v-n4-0181',  // 計画 — rencana, perencanaan
        'v-n4-0178',  // 予定 — rencana, jadwal
        'v-n4-0131',  // 決める — memutuskan
        'v-n4-0400',  // 経験 — pengalaman
        'v-n4-0392',  // 機会 — kesempatan
        'v-n4-0111',  // 続ける — melanjutkan
        'v-n4-0106',  // 始める — memulai
        'v-n5-0107',  // 来年 — tahun depan
        'v-n4-0095',  // 引っ越す — pindah rumah
        'v-n5-0019',  // 住む — tinggal, menetap
        'v-n5-0030',  // 働く — bekerja
        'v-n4-0685',  // 失敗 — kegagalan, gagal
      ],
      grammar_ids: [],
    },

    16: {
      topic      : '将来どうしたいですか — Impian dan Harapan (りかい)',
      topic_id   : 8,
      vocab_ids  : [
        'v-n4-0388',  // 文化 — budaya
        'v-n4-0390',  // 習慣 — kebiasaan
        'v-n5-s0150', // 旅行 — perjalanan, wisata
        'v-n5-0056',  // 生まれる — lahir
        'v-n4-0137',  // 変わる — berubah
        'v-n4-0236',  // 増える — bertambah
        'v-n4-0469',  // 楽しむ — menikmati
        'v-n5-0119',  // いつも — selalu; biasanya
        'v-n5-s0075', // 毎年 — setiap tahun
        'v-n4-0559',  // 季節 — musim
        'v-n4-0392',  // 機会 — kesempatan
      ],
      grammar_ids: [],
    },

    // ── トピック 9: もっと上手になりたい ─────────────────────────
    17: {
      topic      : 'もっと上手になりたい — Mengembangkan Diri (かつどう)',
      topic_id   : 9,
      vocab_ids  : [
        'v-n4-0101',  // 練習 — latihan, berlatih
        'v-n4-0065',  // 調べる — mencari tahu
        'v-n4-0111',  // 続ける — melanjutkan
        'v-n4-0106',  // 始める — memulai
        'v-n5-0078',  // 上手 — pandai, mahir
        'v-n5-0079',  // 下手 — tidak pandai
        'v-n5-0042',  // 覚える — mengingat; menghafal
        'v-n5-0041',  // 教える — mengajar; memberitahu
        'v-n5-0031',  // 話す — berbicara
        'v-n5-0013',  // 聞く — mendengar; bertanya
        'v-n5-0033',  // 読む — membaca
        'v-n5-0012',  // 書く — menulis
      ],
      grammar_ids: [],
    },

    18: {
      topic      : 'もっと上手になりたい — Refleksi dan Semangat (りかい)',
      topic_id   : 9,
      vocab_ids  : [
        'v-n4-0400',  // 経験 — pengalaman
        'v-n4-0685',  // 失敗 — kegagalan, gagal
        'v-n4-0392',  // 機会 — kesempatan
        'v-n4-0572',  // 相談 — konsultasi
        'v-n4-0403',  // 意見 — pendapat
        'v-n4-0402',  // 理由 — alasan
        'v-n5-0083',  // 大切 — penting, berharga
        'v-n5-0118',  // ゆっくり — pelan-pelan; santai
        'v-n5-0119',  // いつも — selalu; biasanya
        'v-n5-s0315', // もっと — lebih (lagi)
        'v-n5-0059',  // 良い — bagus, baik
        'v-n5-0144',  // そして — dan kemudian; lalu
      ],
      grammar_ids: [],
    },

  },
};

// ══════════════════════════════════════════════════════
//  MISSING_VOCAB — Kata Irodori A2-2 yang BELUM ada di vocabDB
//  Perlu dibuatkan oleh Agent Vocab
// ══════════════════════════════════════════════════════
//
//  Unit 1–2  : どんな仕事ですか
//    - [ ] 仕事 (しごと) — pekerjaan (noun, N5) ← PENTING, muncul berkali-kali
//    - [ ] 給料 (きゅうりょう) — gaji (noun, N4)
//    - [ ] 面接 (めんせつ) — wawancara kerja (noun, N4)
//    - [ ] 真面目な (まじめな) — serius, tekun (adj-na, N4)
//    - [ ] 優しい (やさしい) — baik hati, lembut (adj-i, N4/N5)
//
//  Unit 3–4  : 一緒にやりませんか
//    - [ ] 楽しい (たのしい) — menyenangkan (adj-i, N5) ← PENTING
//    - [ ] 断る (ことわる) — menolak (verb-u, N4)
//
//  Unit 5–6  : どんな意見ですか
//    - [ ] 有名な (ゆうめいな) — terkenal (adj-na, N5)
//    - [ ] 汚い (きたない) — kotor (adj-i, N4)
//    - [ ] 清潔な (せいけつな) — bersih, higienis (adj-na, N4)
//
//  Unit 9–10 : もし〜だったら
//    - [ ] 危ない (あぶない) — berbahaya (adj-i, N4)
//    - [ ] 注意 (ちゅうい) — perhatian, peringatan (noun-suru, N4)
//    - [ ] 熱 (ねつ) — demam; panas (noun, N5)
//    - [ ] 風邪 (かぜ) — flu, pilek (noun, N5)
//    - [ ] 体 (からだ) — tubuh, badan (noun, N5)
//    - [ ] 入院 (にゅういん) — rawat inap (noun-suru, N4)
//    - [ ] 治る (なおる) — sembuh, pulih (verb-u, N4)
//
//  Unit 15–16: 将来どうしたいですか
//    - [ ] 夢 (ゆめ) — mimpi, impian (noun, N5)
//    - [ ] 目標 (もくひょう) — tujuan, target (noun, N4)
//    - [ ] 努力 (どりょく) — usaha, kerja keras (noun-suru, N4)
//    - [ ] 希望 (きぼう) — harapan, keinginan (noun, N4)
//    - [ ] 成功 (せいこう) — kesuksesan (noun-suru, N4)
//    - [ ] 自信 (じしん) — kepercayaan diri (noun, N4)
//
//  Unit 17–18: もっと上手になりたい
//    - [ ] 約束 (やくそく) — janji (noun-suru, N5/N4)
//    - [ ] 努力 (どりょく) — usaha, kerja keras (noun-suru, N4)
//
// ══════════════════════════════════════════════════════
