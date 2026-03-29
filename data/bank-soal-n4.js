// BANK SOAL N4 — Question Bank (Soumatome N4 Bunpou)
// Format identik dengan bank-soal.js (N3)
//
// TYPE: 'fill_in'
//   { id, level, week, day?, type, sentence, choices[], answer, grammarId, explanation }
//   sentence: kalimat dengan ▢ sebagai lubang
//   choices: array 4 pilihan; answer = index 0-based jawaban benar
//
// TYPE: 'rearrange'
//   { id, level, week, day?, type, sentence, parts[], answer[], star_pos, grammarIds[], explanation }
//   parts: 4 potongan kata (shuffled); answer: urutan index 0-based yg benar
//   star_pos: posisi ★ dalam answer[] (0-based) — selalu 2 (★ = slot ke-3)
//
// ══════════════════════════════════════

// Tambahkan ke window.bankSoal yang sudah ada (push/spread dari bank-soal.js)
// Di index.js / loader: window.bankSoal = [...window.bankSoal, ...bankSoalN4];

const bankSoalN4 = [

  // ════════════════════════════════════════
  // N4 WEEK 1 — 問題1: fill_in (15 soal)
  // ════════════════════════════════════════

  {
    id: 'bs-n4-w1d7-01', level: 'n4', week: 1, day: 7, type: 'fill_in',
    sentence: '私は1日（▢）3回、この薬を飲んでいます。',
    choices: ['が', 'に', 'で', 'を'],
    answer: 1,
    grammarId: 'n4-w1d1-01',
    explanation: '〜に (frekuensi) = per / setiap. 1日に3回 = 3 kali sehari. "Saya minum obat ini 3 kali sehari."'
  },
  {
    id: 'bs-n4-w1d7-02', level: 'n4', week: 1, day: 7, type: 'fill_in',
    sentence: 'このプリントを1枚（▢）配ってください。',
    choices: ['ずつ', 'しか', 'ほど', 'だけ'],
    answer: 0,
    grammarId: 'n4-w1d1-02',
    explanation: '〜ずつ = masing-masing / per satuan (pembagian merata). "Tolong bagikan cetakan ini masing-masing satu lembar."'
  },
  {
    id: 'bs-n4-w1d7-03', level: 'n4', week: 1, day: 7, type: 'fill_in',
    sentence: '私の国の夏は日本の夏（▢）暑くない。',
    choices: ['より', 'ほど', 'くらい', 'まで'],
    answer: 1,
    grammarId: 'n4-w1d1-03',
    explanation: 'N1はN2ほど〜ない = N1 tidak se... N2. "Musim panas di negaraku tidak sepanas musim panas Jepang."'
  },
  {
    id: 'bs-n4-w1d7-04', level: 'n4', week: 1, day: 7, type: 'fill_in',
    sentence: 'ジョンさんは英語（▢）話せません。',
    choices: ['だけ', 'ほど', 'しか', 'でも'],
    answer: 2,
    grammarId: 'n4-w1d2-03',
    explanation: '〜しか〜ない = hanya... (pembatasan eksklusif, selalu bentuk negatif). "John hanya bisa berbicara bahasa Inggris."'
  },
  {
    id: 'bs-n4-w1d7-05', level: 'n4', week: 1, day: 7, type: 'fill_in',
    sentence: 'お茶（▢）飲みましょうか。',
    choices: ['しか', 'でも', 'ずつ', 'ほど'],
    answer: 1,
    grammarId: 'n4-w1d2-01',
    explanation: 'Nでも = ... atau sesuatu (② menyebut salah satu contoh pilihan). "Bagaimana kalau kita minum teh atau sesuatu?"'
  },
  {
    id: 'bs-n4-w1d7-06', level: 'n4', week: 1, day: 7, type: 'fill_in',
    sentence: '仕事が終わる（▢）、ここで待っていてください。',
    choices: ['までに', 'まで', 'ながら', 'ところ'],
    answer: 1,
    grammarId: 'n4-w1d3-01',
    explanation: '〜まで = sampai... (keadaan berlanjut hingga titik tersebut). "Tolong tunggu di sini sampai pekerjaan selesai."'
  },
  {
    id: 'bs-n4-w1d7-07', level: 'n4', week: 1, day: 7, type: 'fill_in',
    sentence: 'レポートは15日（▢）出してください。',
    choices: ['まで', 'までに', 'ながら', 'たまま'],
    answer: 1,
    grammarId: 'n4-w1d3-02',
    explanation: '〜までに = sebelum/paling lambat... (deadline). "Tolong kumpulkan laporan paling lambat tanggal 15."'
  },
  {
    id: 'bs-n4-w1d7-08', level: 'n4', week: 1, day: 7, type: 'fill_in',
    sentence: '今、料理を作っている（▢）です。',
    choices: ['ところ', 'まま', 'うち', 'ころ'],
    answer: 0,
    grammarId: 'n4-w1d4-02',
    explanation: 'Vているところ = tepat sedang... (tindakan sedang berlangsung saat ini). "Sekarang saya tepat sedang memasak."'
  },
  {
    id: 'bs-n4-w1d7-09', level: 'n4', week: 1, day: 7, type: 'fill_in',
    sentence: '今、お昼ご飯を食べた（▢）です。',
    choices: ['ところ', 'まま', 'から', 'のに'],
    answer: 0,
    grammarId: 'n4-w1d4-03',
    explanation: 'Vたところ = baru saja selesai... (tindakan baru usai). "Saya baru saja selesai makan siang."'
  },
  {
    id: 'bs-n4-w1d7-10', level: 'n4', week: 1, day: 7, type: 'fill_in',
    sentence: '映画を見ている（▢）、寝てしまいました。',
    choices: ['あいだに', 'たびに', 'ところで', 'ために'],
    answer: 0,
    grammarId: 'n4-w1d4-04',
    explanation: 'Vている間に = selagi sedang... (terjadi di suatu titik dalam periode). "Selagi menonton film, saya tertidur."'
  },
  {
    id: 'bs-n4-w1d7-11', level: 'n4', week: 1, day: 7, type: 'fill_in',
    sentence: '音楽を聞き（▢）勉強しています。',
    choices: ['たまま', 'ながら', 'までに', 'ところ'],
    answer: 1,
    grammarId: 'n4-w1d5-03',
    explanation: '〜ながら = sambil... (dua tindakan bersamaan). "Saya belajar sambil mendengarkan musik."'
  },
  {
    id: 'bs-n4-w1d7-12', level: 'n4', week: 1, day: 7, type: 'fill_in',
    sentence: 'ぼうしを（▢）部屋に入ってはいけません。',
    choices: ['かけながら', 'かぶったまま', 'かぶるところ', 'かぶってから'],
    answer: 1,
    grammarId: 'n4-w1d5-04',
    explanation: '〜たまま = dengan tetap dalam keadaan... (kondisi tidak berubah). "Tidak boleh masuk kamar dengan topi masih dipakai."'
  },
  {
    id: 'bs-n4-w1d7-13', level: 'n4', week: 1, day: 7, type: 'fill_in',
    sentence: '私はアフリカに行った（▢）があります。',
    choices: ['こと', 'もの', 'ところ', 'の'],
    answer: 0,
    grammarId: 'n4-w1d6-01',
    explanation: 'Vたことがある = pernah... (pengalaman masa lalu). "Saya pernah pergi ke Afrika."'
  },
  {
    id: 'bs-n4-w1d7-14', level: 'n4', week: 1, day: 7, type: 'fill_in',
    sentence: 'これから、ダイエットする（▢）にします。',
    choices: ['こと', 'の', 'ため', 'よう'],
    answer: 0,
    grammarId: 'n4-w1d6-03',
    explanation: 'Vることにする = memutuskan untuk... (keputusan diri sendiri). "Mulai sekarang saya memutuskan untuk diet."'
  },
  {
    id: 'bs-n4-w1d7-15', level: 'n4', week: 1, day: 7, type: 'fill_in',
    sentence: '来月、イギリスへ出張する（▢）になりました。',
    choices: ['こと', 'の', 'よう', 'ため'],
    answer: 0,
    grammarId: 'n4-w1d6-04',
    explanation: 'Vることになる = diputuskan bahwa... (keputusan dari luar). "Diputuskan bahwa bulan depan saya akan melakukan perjalanan bisnis ke Inggris."'
  },

  // N4 WEEK 1 — 問題2: rearrange (5 soal)

  {
    id: 'bs-n4-w1d7-r01', level: 'n4', week: 1, day: 7, type: 'rearrange',
    sentence: '私は _____ _____ ★ _____ ことがあります。',
    parts: ['富士山に', '登った', '一度', 'だけ'],
    answer: [2, 3, 0, 1],
    star_pos: 2,
    grammarIds: ['n4-w1d6-01'],
    explanation: '私は【一度】【だけ】【富士山に★】【登った】ことがあります。= Saya pernah mendaki Gunung Fuji hanya satu kali. ★ = 富士山に'
  },
  {
    id: 'bs-n4-w1d7-r02', level: 'n4', week: 1, day: 7, type: 'rearrange',
    sentence: '今から _____ _____ ★ _____ ところです。',
    parts: ['家を', '出る', 'ちょうど', 'しようと'],
    answer: [2, 0, 3, 1],
    star_pos: 2,
    grammarIds: ['n4-w1d4-01'],
    explanation: '今から【ちょうど】【家を】【しようと★】【出る】ところです。※ 正解: ちょうど家を出るところです。= Saya baru akan keluar rumah sekarang. ★ = 出る'
  },
  {
    id: 'bs-n4-w1d7-r03', level: 'n4', week: 1, day: 7, type: 'rearrange',
    sentence: '先週は今週 _____ _____ ★ _____ ありません。',
    parts: ['ほど', 'いそがしく', 'では', 'も'],
    answer: [3, 0, 2, 1],
    star_pos: 2,
    grammarIds: ['n4-w1d1-03'],
    explanation: '先週は今週【も】【ほど】【では★】【いそがしく】ありません。= Minggu lalu tidak sesibuk minggu ini. ★ = では'
  },
  {
    id: 'bs-n4-w1d7-r04', level: 'n4', week: 1, day: 7, type: 'rearrange',
    sentence: '私は本を _____ _____ ★ _____ かけます。',
    parts: ['めがねを', 'とき', '読む', 'に'],
    answer: [2, 3, 1, 0],
    star_pos: 2,
    grammarIds: ['n4-w1d4-05'],
    explanation: '私は本を【読む】【とき】【に★】【めがねを】かけます。= Ketika akan membaca buku, saya memakai kacamata. ★ = に'
  },
  {
    id: 'bs-n4-w1d7-r05', level: 'n4', week: 1, day: 7, type: 'rearrange',
    sentence: '毎日、牛乳を _____ _____ ★ _____ います。',
    parts: ['ことに', '飲む', 'して', 'ちゃんと'],
    answer: [3, 1, 0, 2],
    star_pos: 2,
    grammarIds: ['n4-w1d6-03'],
    explanation: '毎日、牛乳を【ちゃんと】【飲む】【ことに★】【して】います。= Saya sudah membiasakan diri minum susu dengan baik setiap hari. ★ = ことに'
  },

  // ════════════════════════════════════════
  // N4 WEEK 2 — 問題1: fill_in (15 soal)
  // ════════════════════════════════════════

  {
    id: 'bs-n4-w2d7-01', level: 'n4', week: 2, day: 7, type: 'fill_in',
    sentence: '日本では車は左側を走ら（▢）なりません。',
    choices: ['なければ', 'なくては', 'ないでは', 'なかっては'],
    answer: 0,
    grammarId: 'n4-w2d1-01',
    explanation: '〜なければならない = harus / wajib. "Di Jepang, mobil harus berjalan di sisi kiri."'
  },
  {
    id: 'bs-n4-w2d7-02', level: 'n4', week: 2, day: 7, type: 'fill_in',
    sentence: 'A「明日は来なくても（▢）ですか。」B「いいですよ。」',
    choices: ['いい', 'だめ', 'ほしい', 'いけない'],
    answer: 0,
    grammarId: 'n4-w2d1-04',
    explanation: '〜なくてもいい = tidak perlu / tidak harus. "A: Boleh tidak datang besok? B: Boleh."'
  },
  {
    id: 'bs-n4-w2d7-03', level: 'n4', week: 2, day: 7, type: 'fill_in',
    sentence: 'テストのとき、ペンを使って（▢）。',
    choices: ['もいいです', 'はいけません', 'くれますか', 'もらいます'],
    answer: 1,
    grammarId: 'n4-w2d1-05',
    explanation: '〜てはいけない = tidak boleh / dilarang. "Saat ujian, tidak boleh menggunakan pulpen."'
  },
  {
    id: 'bs-n4-w2d7-04', level: 'n4', week: 2, day: 7, type: 'fill_in',
    sentence: '旅行する前に、ガイドブックを読んで（▢）ましょう。',
    choices: ['おき', 'しまい', 'あり', 'くれ'],
    answer: 0,
    grammarId: 'n4-w2d2-01',
    explanation: '〜ておく = melakukan terlebih dahulu sebagai persiapan. "Sebelum berwisata, mari kita baca dulu buku panduannya."'
  },
  {
    id: 'bs-n4-w2d7-05', level: 'n4', week: 2, day: 7, type: 'fill_in',
    sentence: '電車の中にかさを忘れて（▢）ました。',
    choices: ['おき', 'しまい', 'あり', 'もらい'],
    answer: 1,
    grammarId: 'n4-w2d2-02',
    explanation: '〜てしまう = (menyesal/tidak sengaja). "Saya lupa ketinggalan payung di dalam kereta."'
  },
  {
    id: 'bs-n4-w2d7-06', level: 'n4', week: 2, day: 7, type: 'fill_in',
    sentence: '田中さんが（私に）セーターを（▢）ました。',
    choices: ['あげ', 'もらい', 'くれ', 'やり'],
    answer: 2,
    grammarId: 'n4-w2d3-01',
    explanation: 'くれる = orang lain memberi ke saya/keluarga saya. "Tanaka-san memberikan sweater kepada saya."'
  },
  {
    id: 'bs-n4-w2d7-07', level: 'n4', week: 2, day: 7, type: 'fill_in',
    sentence: '友だちに東京駅まで連れて行って（▢）ました。',
    choices: ['あげ', 'くれ', 'やり', 'もらい'],
    answer: 3,
    grammarId: 'n4-w2d3-02',
    explanation: 'てもらう = menerima manfaat dari tindakan orang lain (perspektif penerima). "Saya diantarkan teman sampai Stasiun Tokyo."'
  },
  {
    id: 'bs-n4-w2d7-08', level: 'n4', week: 2, day: 7, type: 'fill_in',
    sentence: '家を買う（▢）、貯金をしています。',
    choices: ['ために', 'ように', 'のに', 'から'],
    answer: 0,
    grammarId: 'n4-w2d4-01',
    explanation: 'Vるために = untuk / demi (tujuan). "Saya menabung untuk membeli rumah."'
  },
  {
    id: 'bs-n4-w2d7-09', level: 'n4', week: 2, day: 7, type: 'fill_in',
    sentence: '赤ちゃんは1さいごろから歩く（▢）なります。',
    choices: ['ために', 'ように', 'ことに', 'はずに'],
    answer: 1,
    grammarId: 'n4-w2d4-02',
    explanation: 'Vようになる = menjadi bisa... (perubahan bertahap). "Bayi mulai bisa berjalan sejak sekitar usia 1 tahun."'
  },
  {
    id: 'bs-n4-w2d7-10', level: 'n4', week: 2, day: 7, type: 'fill_in',
    sentence: '毎食後、歯を磨く（▢）にしています。',
    choices: ['ため', 'よう', 'こと', 'はず'],
    answer: 1,
    grammarId: 'n4-w2d4-03',
    explanation: 'Vようにする = berusaha/membiasakan diri. "Saya membiasakan diri menggosok gigi setelah setiap makan."'
  },
  {
    id: 'bs-n4-w2d7-11', level: 'n4', week: 2, day: 7, type: 'fill_in',
    sentence: 'わからないところは先生に聞いた（▢）いいですよ。',
    choices: ['ほうが', 'ように', 'ために', 'ながら'],
    answer: 0,
    grammarId: 'n4-w2d6-01',
    explanation: 'Vたほうがいい = sebaiknya / lebih baik. "Bagian yang tidak dimengerti, sebaiknya tanyakan ke sensei."'
  },
  {
    id: 'bs-n4-w2d7-12', level: 'n4', week: 2, day: 7, type: 'fill_in',
    sentence: '天気予報で、明日は寒い（▢）いました。',
    choices: ['と思って', 'と言って', 'と聞いて', 'とみて'],
    answer: 1,
    grammarId: 'n4-w2d6-02',
    explanation: '〜と言っていた = katanya... (kutipan dari orang lain). "Di ramalan cuaca, katanya besok akan dingin."'
  },
  {
    id: 'bs-n4-w2d7-13', level: 'n4', week: 2, day: 7, type: 'fill_in',
    sentence: 'A「どんな音楽が好きですか。」B「ジャズ（▢）好きです。」',
    choices: ['とか', 'しか', 'ほど', 'まで'],
    answer: 0,
    grammarId: 'n4-w1d2-02',
    explanation: 'N1とかN2とか = N1 atau N2, dan sebagainya (menyebut contoh). "Saya suka jazz atau sesuatu seperti itu."'
  },
  {
    id: 'bs-n4-w2d7-14', level: 'n4', week: 2, day: 7, type: 'fill_in',
    sentence: '混ぜる（▢）、危険！',
    choices: ['な', 'ない', 'なくて', 'ないで'],
    answer: 0,
    grammarId: 'n4-w2d6-03',
    explanation: 'V辞書形＋な = bentuk larangan tegas. "Jangan dicampur, berbahaya!"'
  },
  {
    id: 'bs-n4-w2d7-15', level: 'n4', week: 2, day: 7, type: 'fill_in',
    sentence: '医者に、酒を飲む（▢）言われました。',
    choices: ['なと', 'ないと', 'なくてと', 'ないようにと'],
    answer: 0,
    grammarId: 'n4-w2d6-03',
    explanation: 'V辞書形＋なと言われた = diperintahkan jangan... (perintah larangan dalam kutipan). "Dokter bilang jangan minum alkohol."'
  },

  // N4 WEEK 2 — 問題2: rearrange (5 soal)

  {
    id: 'bs-n4-w2d7-r01', level: 'n4', week: 2, day: 7, type: 'rearrange',
    sentence: '明日は _____ _____ ★ _____ いいですよ。',
    parts: ['来なくても', '全然', 'だから', '来なければ'],
    answer: [1, 3, 0, 2],
    star_pos: 2,
    grammarIds: ['n4-w2d1-04'],
    explanation: '明日は【全然】【来なければ】【来なくても★】【だから】いいですよ。※ 正解: 明日は来なくてもいいですよ。= Besok tidak perlu datang. ★ = 来なくても'
  },
  {
    id: 'bs-n4-w2d7-r02', level: 'n4', week: 2, day: 7, type: 'rearrange',
    sentence: '出発の前に _____ _____ ★ _____ おいた。',
    parts: ['ガスを', '確認して', 'ちゃんと', 'を止めたか'],
    answer: [2, 0, 3, 1],
    star_pos: 2,
    grammarIds: ['n4-w2d2-01'],
    explanation: '出発の前に【ちゃんと】【ガスを】【を止めたか★】【確認して】おいた。= Sebelum berangkat, saya sudah memastikan dulu apakah gas sudah dimatikan. ★ = を止めたか'
  },
  {
    id: 'bs-n4-w2d7-r03', level: 'n4', week: 2, day: 7, type: 'rearrange',
    sentence: '友だちが _____ _____ ★ _____ ありがとう。',
    parts: ['かいて', 'くれて', '地図を', 'わざわざ'],
    answer: [3, 2, 0, 1],
    star_pos: 2,
    grammarIds: ['n4-w2d3-02'],
    explanation: '友だちが【わざわざ】【地図を】【かいて★】【くれて】ありがとう。= Terima kasih sudah susah payah membuatkan peta untukku. ★ = かいて'
  },
  {
    id: 'bs-n4-w2d7-r04', level: 'n4', week: 2, day: 7, type: 'rearrange',
    sentence: '日本語が _____ _____ ★ _____ なりたいです。',
    parts: ['上手に', 'ように', '話せる', 'に'],
    answer: [2, 1, 3, 0],
    star_pos: 2,
    grammarIds: ['n4-w2d4-02'],
    explanation: '日本語が【話せる】【ように】【に★】【上手に】なりたいです。= Saya ingin menjadi bisa berbicara bahasa Jepang dengan baik. ★ = に'
  },
  {
    id: 'bs-n4-w2d7-r05', level: 'n4', week: 2, day: 7, type: 'rearrange',
    sentence: '田中さんは _____ _____ ★ _____ 思います。',
    parts: ['と', 'もう', '帰った', '来ないと'],
    answer: [1, 2, 3, 0],
    star_pos: 2,
    grammarIds: ['n4-w2d6-02'],
    explanation: '田中さんは【もう】【帰った】【来ないと★】【と】思います。= Saya kira Tanaka-san sudah pulang dan tidak akan datang. ★ = 来ないと'
  },

  // ════════════════════════════════════════
  // N4 WEEK 3 — 問題1: fill_in (15 soal)
  // ════════════════════════════════════════

  {
    id: 'bs-n4-w3d7-01', level: 'n4', week: 3, day: 7, type: 'fill_in',
    sentence: 'その話が本当（▢）、調べたほうがいいですよ。',
    choices: ['かどうか', 'かもしれない', 'らしい', 'はずか'],
    answer: 0,
    grammarId: 'n4-w3d1-01',
    explanation: '〜かどうか = apakah... atau tidak (pertanyaan tak langsung). "Sebaiknya cek dulu apakah cerita itu benar atau tidak."'
  },
  {
    id: 'bs-n4-w3d7-02', level: 'n4', week: 3, day: 7, type: 'fill_in',
    sentence: '田中さんがどこに住んでいる（▢）、知っていますか。',
    choices: ['かどうか', 'か', 'のか', 'だか'],
    answer: 1,
    grammarId: 'n4-w3d1-02',
    explanation: '疑問詞〜か = pertanyaan tak langsung (dengan kata tanya どこ). "Apakah kamu tahu di mana Tanaka-san tinggal?"'
  },
  {
    id: 'bs-n4-w3d7-03', level: 'n4', week: 3, day: 7, type: 'fill_in',
    sentence: 'あそこでたばこを吸っている（▢）が社長です。',
    choices: ['こと', 'もの', 'の', 'ため'],
    answer: 2,
    grammarId: 'n4-w3d1-03',
    explanation: '〜の (nominalisasi) = yang... (menominalisasi klausa, merujuk orang konkret). "Yang sedang merokok di sana itu adalah direktur."'
  },
  {
    id: 'bs-n4-w3d7-04', level: 'n4', week: 3, day: 7, type: 'fill_in',
    sentence: '私は日本語を話せますが、読む（▢）書く（▢）できません。',
    choices: ['ことも / ことも', 'のも / のも', 'ほど / ほど', 'だけ / だけ'],
    answer: 0,
    grammarId: 'n4-w3d2-01',
    explanation: 'Vることができる = bisa / mampu. 否定: Vることもできない = tidak bisa ... juga. "Saya bisa bicara bahasa Jepang, tapi tidak bisa membaca maupun menulis."'
  },
  {
    id: 'bs-n4-w3d7-05', level: 'n4', week: 3, day: 7, type: 'fill_in',
    sentence: 'となりの家からピアノの音が（▢）。',
    choices: ['聞けます', '聞こえます', '聞きます', '聞かれます'],
    answer: 1,
    grammarId: 'n4-w3d2-02',
    explanation: '聞こえる = terdengar (secara alami, bukan aktif mendengarkan). "Suara piano dari rumah tetangga terdengar."'
  },
  {
    id: 'bs-n4-w3d7-06', level: 'n4', week: 3, day: 7, type: 'fill_in',
    sentence: 'ちょっと暑い（▢）、窓を開けてもいいですか。',
    choices: ['から', 'ので', 'のに', 'ても'],
    answer: 1,
    grammarId: 'n4-w3d3-01',
    explanation: '〜ので = karena... (alasan, lebih sopan dari から). "Agak panas, bolehkah saya buka jendela?"'
  },
  {
    id: 'bs-n4-w3d7-07', level: 'n4', week: 3, day: 7, type: 'fill_in',
    sentence: 'きのう勉強した（▢）、もう忘れてしまいました。',
    choices: ['から', 'ので', 'のに', 'ても'],
    answer: 2,
    grammarId: 'n4-w3d3-02',
    explanation: '〜のに = padahal... (kekecewaan karena hasil berlawanan harapan). "Padahal kemarin sudah belajar, tapi sudah lupa."'
  },
  {
    id: 'bs-n4-w3d7-08', level: 'n4', week: 3, day: 7, type: 'fill_in',
    sentence: 'パソコンは必要なので、高く（▢）買います。',
    choices: ['ても', 'のに', 'から', 'ので'],
    answer: 0,
    grammarId: 'n4-w3d3-03',
    explanation: '〜ても = meskipun... (konsesi netral). "Karena laptop diperlukan, saya akan beli meskipun mahal."'
  },
  {
    id: 'bs-n4-w3d7-09', level: 'n4', week: 3, day: 7, type: 'fill_in',
    sentence: '電車で事故があった。（▢）、ちこくしてしまった。',
    choices: ['それに', 'それで', 'ところが', 'そのうえ'],
    answer: 1,
    grammarId: 'n4-w3d4-02',
    explanation: 'それで = oleh karena itu (sebab→akibat, netral). "Ada kecelakaan di kereta. Oleh karena itu, saya terlambat."'
  },
  {
    id: 'bs-n4-w3d7-10', level: 'n4', week: 3, day: 7, type: 'fill_in',
    sentence: '晴れると思っていた。（▢）、雨が降り始めた。',
    choices: ['それで', 'だから', 'ところが', 'それに'],
    answer: 2,
    grammarId: 'n4-w3d4-03',
    explanation: 'ところが = akan tetapi/namun ternyata (hasil tak terduga berlawanan harapan). "Saya pikir akan cerah. Namun ternyata hujan mulai turun."'
  },
  {
    id: 'bs-n4-w3d7-11', level: 'n4', week: 3, day: 7, type: 'fill_in',
    sentence: 'あの山の高（▢）はどのくらいですか。',
    choices: ['み', 'さ', 'め', 'く'],
    answer: 1,
    grammarId: 'n4-w3d4-04',
    explanation: '形容詞＋さ = mengubah kata sifat menjadi kata benda (tingkat/ukuran). 高い→高さ = tinggi (kata benda). "Berapa tinggi gunung itu?"'
  },
  {
    id: 'bs-n4-w3d7-12', level: 'n4', week: 3, day: 7, type: 'fill_in',
    sentence: 'すみませんが、もう一度言って（▢）ませんか。',
    choices: ['くれ', 'もらえ', 'いただけ', 'あげ'],
    answer: 2,
    grammarId: 'n4-w3d5-01',
    explanation: 'Vていただけませんか = paling sopan dari rangkaian permintaan. "Maaf, bisakah Anda mengatakannya sekali lagi?"'
  },
  {
    id: 'bs-n4-w3d7-13', level: 'n4', week: 3, day: 7, type: 'fill_in',
    sentence: '息子にいい大学に行って（▢）たいです。',
    choices: ['くれ', 'もらい', 'あげ', 'いただき'],
    answer: 1,
    grammarId: 'n4-w3d5-02',
    explanation: 'Vてもらいたい = ingin seseorang melakukan untuk saya. "Saya ingin anak saya masuk universitas yang baik."'
  },
  {
    id: 'bs-n4-w3d7-14', level: 'n4', week: 3, day: 7, type: 'fill_in',
    sentence: '新しい自転車を買おう（▢）思っています。',
    choices: ['と', 'に', 'が', 'で'],
    answer: 0,
    grammarId: 'n4-w3d6-01',
    explanation: 'Vようと思う = berniat untuk... "Saya berniat membeli sepeda baru."'
  },
  {
    id: 'bs-n4-w3d7-15', level: 'n4', week: 3, day: 7, type: 'fill_in',
    sentence: '今日はお酒を飲まない（▢）です。',
    choices: ['ように', 'ために', 'つもり', 'こと'],
    answer: 2,
    grammarId: 'n4-w3d6-02',
    explanation: 'Vないつもり = berencana tidak melakukan. "Saya berencana tidak minum alkohol hari ini."'
  },

  // N4 WEEK 3 — 問題2: rearrange (5 soal)

  {
    id: 'bs-n4-w3d7-r01', level: 'n4', week: 3, day: 7, type: 'rearrange',
    sentence: '先生に _____ _____ ★ _____ いただきたいです。',
    parts: ['この文章を', 'チェックして', 'ぜひ', 'を'],
    answer: [2, 0, 3, 1],
    star_pos: 2,
    grammarIds: ['n4-w3d5-02'],
    explanation: '先生に【ぜひ】【この文章を】【を★】【チェックして】いただきたいです。= Saya ingin sekali sensei memeriksa tulisan ini. ★ = を'
  },
  {
    id: 'bs-n4-w3d7-r02', level: 'n4', week: 3, day: 7, type: 'rearrange',
    sentence: '勉強した _____ _____ ★ _____ しまいました。',
    parts: ['のに', 'もう', 'きのう', '忘れて'],
    answer: [2, 0, 1, 3],
    star_pos: 2,
    grammarIds: ['n4-w3d3-02'],
    explanation: '勉強した【きのう】【のに】【もう★】【忘れて】しまいました。= Padahal kemarin sudah belajar, tapi sudah lupa. ★ = もう'
  },
  {
    id: 'bs-n4-w3d7-r03', level: 'n4', week: 3, day: 7, type: 'rearrange',
    sentence: 'ここから _____ _____ ★ _____ 見えます。',
    parts: ['よく', '東京タワーが', 'の', 'きれいに'],
    answer: [3, 1, 0, 2],
    star_pos: 2,
    grammarIds: ['n4-w3d2-02'],
    explanation: 'ここから【きれいに】【東京タワーが】【よく★】【の】見えます。= Tokyo Tower terlihat jelas dan indah dari sini. ★ = よく'
  },
  {
    id: 'bs-n4-w3d7-r04', level: 'n4', week: 3, day: 7, type: 'rearrange',
    sentence: '来年は _____ _____ ★ _____ 思っています。',
    parts: ['N3を', 'と', '受けよう', 'ぜひ'],
    answer: [3, 0, 2, 1],
    star_pos: 2,
    grammarIds: ['n4-w3d6-01'],
    explanation: '来年は【ぜひ】【N3を】【受けよう★】【と】思っています。= Saya berencana mengikuti ujian N3 tahun depan. ★ = 受けよう'
  },
  {
    id: 'bs-n4-w3d7-r05', level: 'n4', week: 3, day: 7, type: 'rearrange',
    sentence: '疲れたから _____ _____ ★ _____ 食べよう。',
    parts: ['何か', 'ちょっと', 'おなかが', 'すいたし'],
    answer: [1, 2, 3, 0],
    star_pos: 2,
    grammarIds: ['n4-w3d6-03'],
    explanation: '疲れたから【ちょっと】【おなかが】【すいたし★】【何か】食べよう。= Capek dan perut lapar, yuk makan sesuatu. ★ = すいたし'
  },

  // ════════════════════════════════════════
  // N4 WEEK 4 — 問題1: fill_in (15 soal)
  // ════════════════════════════════════════

  {
    id: 'bs-n4-w4d7-01', level: 'n4', week: 4, day: 7, type: 'fill_in',
    sentence: '夏休みに（▢）、国に帰ります。',
    choices: ['なれば', 'なったら', 'なるなら', 'なっても'],
    answer: 1,
    grammarId: 'n4-w4d1-01',
    explanation: '〜たら = kalau sudah... (kondisi yang menjadi pemicu, urutan waktu). "Kalau sudah masuk liburan musim panas, saya akan pulang."'
  },
  {
    id: 'bs-n4-w4d7-02', level: 'n4', week: 4, day: 7, type: 'fill_in',
    sentence: 'コンビニへ行く（▢）、サンドイッチを買ってきてください。',
    choices: ['たら', 'ば', 'なら', 'と'],
    answer: 2,
    grammarId: 'n4-w4d1-03',
    explanation: '〜なら = kalau memang / kalau soal... (merespons informasi yang diketahui). "Kalau kamu mau pergi ke konbini, tolong belikan sandwich."'
  },
  {
    id: 'bs-n4-w4d7-03', level: 'n4', week: 4, day: 7, type: 'fill_in',
    sentence: 'もっと早く起き（▢）よかった。',
    choices: ['たら', 'れば', 'るなら', 'ると'],
    answer: 1,
    grammarId: 'n4-w4d1-02',
    explanation: '〜ればよかった = seharusnya... (penyesalan karena tidak melakukan). "Seharusnya bangun lebih awal tadi."'
  },
  {
    id: 'bs-n4-w4d7-04', level: 'n4', week: 4, day: 7, type: 'fill_in',
    sentence: '道路がぬれているから、雨が降った（▢）ですね。',
    choices: ['そう', 'よう', 'らしい', 'はず'],
    answer: 1,
    grammarId: 'n4-w4d2-01',
    explanation: '〜ようだ = sepertinya... (dugaan berdasarkan bukti/pengamatan langsung). "Karena jalan basah, sepertinya tadi hujan ya."'
  },
  {
    id: 'bs-n4-w4d7-05', level: 'n4', week: 4, day: 7, type: 'fill_in',
    sentence: '明日は天気がよさ（▢）ですよ。',
    choices: ['ようだ', 'そうだ', 'らしいだ', 'はずだ'],
    answer: 1,
    grammarId: 'n4-w4d2-02',
    explanation: '〜そうだ (penampilan) = kelihatan akan... (berdasarkan penampilan). いい→よさそう. "Besok cuacanya kelihatan akan bagus."'
  },
  {
    id: 'bs-n4-w4d7-06', level: 'n4', week: 4, day: 7, type: 'fill_in',
    sentence: 'トムさんはたぶん試験に受かる（▢）。',
    choices: ['ようです', 'そうです', 'でしょう', 'らしいです'],
    answer: 2,
    grammarId: 'n4-w4d2-03',
    explanation: '〜でしょう = mungkin... (perkiraan/dugaan pembicara, sering dengan たぶん). "Mungkin Tom akan lulus ujian."'
  },
  {
    id: 'bs-n4-w4d7-07', level: 'n4', week: 4, day: 7, type: 'fill_in',
    sentence: 'きのう、お酒を飲み（▢）、頭がいたい。',
    choices: ['すぎて', 'やすくて', 'にくくて', 'たがって'],
    answer: 0,
    grammarId: 'n4-w4d3-01',
    explanation: '〜すぎる = terlalu... (melampaui batas wajar, negatif). "Kemarin minum terlalu banyak, kepala saya sakit."'
  },
  {
    id: 'bs-n4-w4d7-08', level: 'n4', week: 4, day: 7, type: 'fill_in',
    sentence: '田中先生の説明はわかり（▢）です。',
    choices: ['すぎる', 'やすい', 'にくい', 'たい'],
    answer: 1,
    grammarId: 'n4-w4d3-02',
    explanation: 'Vやすい = mudah untuk... "Penjelasan sensei Tanaka mudah dipahami."'
  },
  {
    id: 'bs-n4-w4d7-09', level: 'n4', week: 4, day: 7, type: 'fill_in',
    sentence: '私はよく母に（▢）ました。',
    choices: ['しかれ', 'しからせ', 'しかされ', 'しかられ'],
    answer: 3,
    grammarId: 'n4-w4d4-01',
    explanation: 'Vられる (pasif) = di... / kena... Grup1: しかる→しかられる. "Saya sering dimarahi ibu."'
  },
  {
    id: 'bs-n4-w4d7-10', level: 'n4', week: 4, day: 7, type: 'fill_in',
    sentence: '公園で犬を（▢）ましょう。',
    choices: ['走られ', '走らせ', '走らされ', '走れさせ'],
    answer: 1,
    grammarId: 'n4-w4d4-02',
    explanation: 'Vさせる (kausatif) = menyuruh/membiarkan... Grup1: 走る→走らせる. "Mari biarkan anjing berlari di taman."'
  },
  {
    id: 'bs-n4-w4d7-11', level: 'n4', week: 4, day: 7, type: 'fill_in',
    sentence: '子どものころ、毎日母に野菜を食べ（▢）ました。',
    choices: ['させ', 'られ', 'させられ', 'られさせ'],
    answer: 2,
    grammarId: 'n4-w4d4-03',
    explanation: 'Vさせられる (kausatif-pasif) = terpaksa... Grup2: 食べる→食べさせられる. "Waktu kecil, setiap hari saya dipaksa ibu untuk makan sayuran."'
  },
  {
    id: 'bs-n4-w4d7-12', level: 'n4', week: 4, day: 7, type: 'fill_in',
    sentence: '会議室は、かぎが（▢）います。',
    choices: ['かけて', 'かけられて', 'かかって', 'かけさせて'],
    answer: 2,
    grammarId: 'n4-w4d5-02',
    explanation: 'V(自動詞)ている = kondisi hasil (intransitif). かかる (intransitif) → かかっている. "Ruang rapat terkunci."'
  },
  {
    id: 'bs-n4-w4d7-13', level: 'n4', week: 4, day: 7, type: 'fill_in',
    sentence: 'テーブルの上に花が（▢）あります。',
    choices: ['かざって', 'かざられて', 'かざって', 'かざらせて'],
    answer: 0,
    grammarId: 'n4-w4d5-03',
    explanation: 'V(他動詞)てある = sudah disiapkan dengan sengaja (transitif). かざる→かざってある. "Di atas meja sudah dihias bunga."'
  },
  {
    id: 'bs-n4-w4d7-14', level: 'n4', week: 4, day: 7, type: 'fill_in',
    sentence: 'A「どうして遅れたんですか。」B「渋滞だった（▢）。」',
    choices: ['んです', 'のです', 'んですが', 'ためです'],
    answer: 0,
    grammarId: 'n4-w4d6-01',
    explanation: '〜んです = soalnya... (memberikan penjelasan/alasan). "Soalnya macet."'
  },
  {
    id: 'bs-n4-w4d7-15', level: 'n4', week: 4, day: 7, type: 'fill_in',
    sentence: '漢字のテストは明日です（▢）。',
    choices: ['ね', 'よ', 'な', 'か'],
    answer: 1,
    grammarId: 'n4-w4d6-03',
    explanation: '〜よ = menekankan informasi / memberi tahu (lawan bicara mungkin belum tahu). "Ujian kanjinya besok loh."'
  },

  // N4 WEEK 4 — 問題2: rearrange (5 soal)

  {
    id: 'bs-n4-w4d7-r01', level: 'n4', week: 4, day: 7, type: 'rearrange',
    sentence: '来月 _____ _____ ★ _____ なりました。',
    parts: ['ことに', 'イギリスへ', '出張する', 'が決まって'],
    answer: [1, 2, 3, 0],
    star_pos: 2,
    grammarIds: ['n4-w4d1-03'],
    explanation: '来月【イギリスへ】【出張する】【が決まって★】【ことに】なりました。= Bulan depan sudah diputuskan saya akan perjalanan bisnis ke Inggris. ★ = が決まって'
  },
  {
    id: 'bs-n4-w4d7-r02', level: 'n4', week: 4, day: 7, type: 'rearrange',
    sentence: '子どものころ _____ _____ ★ _____ させられました。',
    parts: ['毎日', '野菜を', '母に', '食べ'],
    answer: [0, 2, 1, 3],
    star_pos: 2,
    grammarIds: ['n4-w4d4-03'],
    explanation: '子どものころ【毎日】【母に】【野菜を★】【食べ】させられました。= Waktu kecil setiap hari dipaksa ibu makan sayuran. ★ = 野菜を'
  },
  {
    id: 'bs-n4-w4d7-r03', level: 'n4', week: 4, day: 7, type: 'rearrange',
    sentence: '道路がぬれているから _____ _____ ★ _____ ようですね。',
    parts: ['降った', 'たぶん', '雨が', 'さっき'],
    answer: [1, 3, 2, 0],
    star_pos: 2,
    grammarIds: ['n4-w4d2-01'],
    explanation: '道路がぬれているから【たぶん】【さっき】【雨が★】【降った】ようですね。= Karena jalan basah, sepertinya tadi ada hujan ya. ★ = 雨が'
  },
  {
    id: 'bs-n4-w4d7-r04', level: 'n4', week: 4, day: 7, type: 'rearrange',
    sentence: 'さあ _____ _____ ★ _____ ましょう。',
    parts: ['授業を', '始め', 'みんな', 'で'],
    answer: [2, 3, 0, 1],
    star_pos: 2,
    grammarIds: ['n4-w4d5-01'],
    explanation: 'さあ【みんな】【で】【授業を★】【始め】ましょう。= Ayo, mari kita semua mulai pelajaran. ★ = 授業を'
  },
  {
    id: 'bs-n4-w4d7-r05', level: 'n4', week: 4, day: 7, type: 'rearrange',
    sentence: 'A「どうして _____ _____ ★ _____ か。」B「ちょっと頭がいたいんです。」',
    parts: ['食べない', 'んです', 'ご飯を', 'を'],
    answer: [2, 3, 0, 1],
    star_pos: 2,
    grammarIds: ['n4-w4d6-01'],
    explanation: 'A「どうして【ご飯を】【を】【食べない★】【んです】か。」= "Memangnya kenapa tidak makan?" B: "Soalnya kepala saya sedikit sakit." ★ = 食べない'
  },

];

// ══════════════════════════════════════
// MERGE ke window.bankSoal
// Pastikan bank-soal.js (N3) sudah di-load duluan di index.html
// ══════════════════════════════════════
if (typeof window !== 'undefined' && window.bankSoal) {
  window.bankSoal = [...window.bankSoal, ...bankSoalN4];
} else if (typeof window !== 'undefined') {
  window.bankSoal = bankSoalN4;
}
