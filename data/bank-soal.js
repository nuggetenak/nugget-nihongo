//  BANK SOAL — Question Bank (Soumatome N3 + level lain)
//
//  TYPE: 'fill_in'
//    { id, level, week, day?, type, sentence, choices[], answer, grammarId, explanation }
//    sentence: kalimat dengan ▢ sebagai lubang
//    choices: array 4 pilihan; answer = index 0-based jawaban benar
//
//  TYPE: 'rearrange'  ← format soal 問題2 JLPT (★ placement)
//    { id, level, week, day?, type, sentence, parts[], answer[], star_pos, grammarIds[], explanation }
//    parts: 4 potongan kata (shuffled); answer: urutan index 0-based yg benar
//    star_pos: posisi ★ dalam answer[] (0-based) — selalu 2 (★ = slot ke-3)
//
// ══════════════════════════════════════

window.bankSoal = [
  // ── N3 Week 1 — 5 soal demo ──
  {
    id: 'bs-n3-w1-01', level: 'n3', week: 1, type: 'fill_in',
    sentence: '今日は早く帰ら▢。明日試験があるから。',
    choices: ['なくちゃ', 'なかった', 'ないで', 'ながら'],
    answer: 0,
    grammarId: 'n3-w1d1-03',
    explanation: '〜なくちゃ = 〜なければならない (keharusan, bentuk kasual). "Harus pulang cepat hari ini karena besok ada ujian."'
  },
  {
    id: 'bs-n3-w1-02', level: 'n3', week: 1, type: 'fill_in',
    sentence: 'あ、財布を家に忘れ▢！どうしよう。',
    choices: ['ちゃった', 'てしまいます', 'るところ', 'たばかり'],
    answer: 0,
    grammarId: 'n3-w1d2-01',
    explanation: '〜ちゃった = 〜てしまった (kasual, nuansa menyesal). "Aduh, dompet ketinggalan di rumah!"'
  },
  {
    id: 'bs-n3-w1-03', level: 'n3', week: 1, type: 'fill_in',
    sentence: '旅行の前に、ホテルを予約し▢ほうがいいよ。',
    choices: ['とく', 'たい', 'てから', 'てみる'],
    answer: 0,
    grammarId: 'n3-w1d2-03',
    explanation: '〜とく = 〜ておく (kasual, persiapan/advance action). "Sebelum perjalanan, lebih baik pesan hotel dulu."'
  },
  {
    id: 'bs-n3-w1-04', level: 'n3', week: 1, type: 'fill_in',
    sentence: '彼女は何を聞いても、笑う▢。全然答えてくれない。',
    choices: ['だけ', 'ために', 'ように', 'ながら'],
    answer: 0,
    grammarId: 'n3-w1d3-01',
    explanation: '〜だけ = hanya/cuma. "Dia hanya tertawa apapun yang ditanya. Sama sekali tidak mau menjawab."'
  },
  {
    id: 'bs-n3-w1-05', level: 'n3', week: 1, type: 'fill_in',
    sentence: '何度誘っても、彼は来よう▢。理由も言わない。',
    choices: ['としない', 'とする', 'としたら', 'としても'],
    answer: 0,
    grammarId: 'n3-w1d6-03',
    explanation: '〜ようとしない = tidak mau / tidak ada niat sama sekali. "Meski diajak berkali-kali, dia sama sekali tidak mau datang."'
  },
  // ── N3 Week 1 — 7日目 実戦問題 (D7 official quiz from Soumatome) ──
  // 問題1: 15 soal fill-in pilihan ganda (format JLPT asli)
  {
    id: 'bs-n3-w1d7-01', level: 'n3', week: 1, day: 7, type: 'fill_in',
    sentence: '30分だけここに車を（▢）もらえませんか。',
    choices: ['止められて', '止めさせて', '止まらせて', '止まられて'],
    answer: 1,
    grammarId: 'n3-w1d1-03',
    explanation: '〜させてもらう = minta izin melakukan sesuatu (causative). "Bolehkah saya parkir mobil di sini sebentar 30 menit?"'
  },
  {
    id: 'bs-n3-w1d7-02', level: 'n3', week: 1, day: 7, type: 'fill_in',
    sentence: 'どうして悪いところを（▢）としないんですか。',
    choices: ['直しよう', '直ろう', '直そう', '直られよう'],
    answer: 2,
    grammarId: 'n3-w1d6-03',
    explanation: '〜（よ）うとしない = tidak mau melakukan. Bentuk volitional 直す → 直そう. "Kenapa tidak mau memperbaiki kekurangannya?"'
  },
  {
    id: 'bs-n3-w1d7-03', level: 'n3', week: 1, day: 7, type: 'fill_in',
    sentence: 'もっと話そうとしたら、電話が（▢）。',
    choices: ['切らせた', '切っといた', '切らないと', '切れちゃった'],
    answer: 3,
    grammarId: 'n3-w1d2-02',
    explanation: '〜ちゃった = 〜てしまった (kasual, nuansa menyesal/tidak sengaja). "Tepat saat mau ngobrol lebih lama, teleponnya malah terputus."'
  },
  {
    id: 'bs-n3-w1d7-04', level: 'n3', week: 1, day: 7, type: 'fill_in',
    sentence: 'このグラフからもわかる（▢）人口は減っています。',
    choices: ['ために', 'ように', 'らしく', 'みたい'],
    answer: 1,
    grammarId: 'n3-w1d5-01',
    explanation: '〜からもわかるように = seperti yang bisa dilihat dari... (pembuka penjelasan). "Seperti yang juga bisa dilihat dari grafik ini, populasi terus berkurang."'
  },
  {
    id: 'bs-n3-w1d7-05', level: 'n3', week: 1, day: 7, type: 'fill_in',
    sentence: '新しい車が（▢）ように貯金しています。',
    choices: ['買えない', '買う', '買わない', '買える'],
    answer: 3,
    grammarId: 'n3-w1d4-02',
    explanation: '〜ように（目的） = agar/supaya. Klausa tujuan pakai potential form 買える. "Saya menabung agar bisa membeli mobil baru."'
  },
  {
    id: 'bs-n3-w1d7-06', level: 'n3', week: 1, day: 7, type: 'fill_in',
    sentence: 'この写真（▢）ヘアースタイルにしてください。',
    choices: ['みたいな', 'みたいに', 'みたいの', 'みたく'],
    answer: 1,
    grammarId: 'n3-w1d3-01',
    explanation: '〜みたいに = seperti (adverb, memodifikasi kata kerja/adjektiva). "Tolong buat gaya rambut seperti di foto ini."'
  },
  {
    id: 'bs-n3-w1d7-07', level: 'n3', week: 1, day: 7, type: 'fill_in',
    sentence: 'ちゃんと世話をしないと、金魚は（▢）よ。',
    choices: ['死んちゃった', '死んちゃう', '死んじゃった', '死んじゃう'],
    answer: 3,
    grammarId: 'n3-w1d2-02',
    explanation: '〜じゃう = 〜でしまう (kasual, nuansa peringatan). 死ぬ → 死んでしまう → 死んじゃう. "Kalau tidak dirawat dengan baik, ikannya bisa mati lho."'
  },
  {
    id: 'bs-n3-w1d7-08', level: 'n3', week: 1, day: 7, type: 'fill_in',
    sentence: '間に合わなくなってしまうよ。早く準備（▢）！',
    choices: ['されると', 'しちゃうと', 'しないと', 'しとくと'],
    answer: 2,
    grammarId: 'n3-w1d2-01',
    explanation: '〜ないと = harus (kalau tidak...). "Nanti tidak keburu. Harus cepat bersiap-siap!"'
  },
  {
    id: 'bs-n3-w1d7-09', level: 'n3', week: 1, day: 7, type: 'fill_in',
    sentence: 'みなさんの国でよく（▢）日本人はだれですか。',
    choices: ['知らされている', '知らせている', '知られている', '知らさせている'],
    answer: 2,
    grammarId: 'n3-w1d1-01',
    explanation: '〜られている = dikenal / diketahui (pasif, menyatakan fakta umum). "Orang Jepang yang paling terkenal di negara Anda siapa?"'
  },
  {
    id: 'bs-n3-w1d7-10', level: 'n3', week: 1, day: 7, type: 'fill_in',
    sentence: 'シャワーを（▢）としたが、水が出なかった。',
    choices: ['あばよう', 'あびよう', 'あびろう', 'あぼろう'],
    answer: 1,
    grammarId: 'n3-w1d6-02',
    explanation: '〜（よ）うとする = hendak / tepat akan melakukan. 浴びる(Group 2) → 浴びよう. "Tepat saat hendak mandi, airnya tidak keluar."'
  },
  {
    id: 'bs-n3-w1d7-11', level: 'n3', week: 1, day: 7, type: 'fill_in',
    sentence: '折り紙を図（▢）折ります。',
    choices: ['っぽく', 'みたいな', 'らしく', 'のように'],
    answer: 3,
    grammarId: 'n3-w1d5-01',
    explanation: '〜のように = seperti yang (merujuk sesuatu konkret). 図のように = seperti yang ada di gambar. "Melipat origami seperti yang ada di gambar."'
  },
  {
    id: 'bs-n3-w1d7-12', level: 'n3', week: 1, day: 7, type: 'fill_in',
    sentence: '習った日本語はすぐに（▢）しましょう。',
    choices: ['使って', '使おう', '使わない', '使うように'],
    answer: 3,
    grammarId: 'n3-w1d4-01',
    explanation: '使うようにしましょう = mari biasakan untuk memakai. 〜ようにする = berusaha/membiasakan. "Bahasa Jepang yang sudah dipelajari, mari biasakan untuk langsung dipakai."'
  },
  {
    id: 'bs-n3-w1d7-13', level: 'n3', week: 1, day: 7, type: 'fill_in',
    sentence: 'この牛乳はちょっとうすくて（▢）。',
    choices: ['水っぽい', '水っぽくない', '水らしい', '水らしくない'],
    answer: 0,
    grammarId: 'n3-w1d3-03',
    explanation: '〜っぽい = terkesan seperti / -ish (sering bernuansa negatif). 水っぽい = encer/berasa seperti air. "Susu ini sedikit encer dan terasa seperti air."'
  },
  {
    id: 'bs-n3-w1d7-14', level: 'n3', week: 1, day: 7, type: 'fill_in',
    sentence: 'テレビ、見ないなら（▢）。',
    choices: ['ついといて', '消しといて', 'つけといて', '消えといて'],
    answer: 1,
    grammarId: 'n3-w1d2-03',
    explanation: '〜といて = 〜ておいて (kasual, minta dilakukan sebelumnya). 消しておいて → 消しといて. "Kalau tidak ditonton, tolong matikan dulu."'
  },
  {
    id: 'bs-n3-w1d7-15', level: 'n3', week: 1, day: 7, type: 'fill_in',
    sentence: 'そこに（▢）じゃまだから、向こうに行って。',
    choices: ['いさせると', 'いられると', 'いさせないと', 'いられないと'],
    answer: 1,
    grammarId: 'n3-w1d1-02',
    explanation: '〜にいられると = kalau (kamu) ada/berada di sana (pasif merugikan). 迷惑の受身. "Kalau kamu ada di situ menghalangi, pergi ke sana saja."'
  },

  // 問題2: 5 soal sentence rearrangement (★ placement)
  // Format: parts[] = 4 potongan kata; answer[] = urutan index 0-based yang benar; star_pos = posisi ★ dalam answer (0-based, selalu 2)
  {
    id: 'bs-n3-w1d7-r01', level: 'n3', week: 1, day: 7, type: 'rearrange',
    sentence: 'ここで _____ _____ ★ _____ されています。',
    parts: ['多くの国に', '車は', '輸出', '作られた'],
    answer: [3, 1, 0, 2],
    star_pos: 2,
    grammarIds: ['n3-w1d1-01'],
    explanation: 'ここで【作られた】【車は】【多くの国に】【輸出★】されています。= Mobil yang dibuat di sini diekspor ke banyak negara. ★ = 多くの国に'
  },
  {
    id: 'bs-n3-w1d7-r02', level: 'n3', week: 1, day: 7, type: 'rearrange',
    sentence: 'あの学生は日本語が _____ _____ ★ _____ みたい。',
    parts: ['明るくなった', 'ように', 'なってから', 'わかる'],
    answer: [3, 1, 2, 0],
    star_pos: 2,
    grammarIds: ['n3-w1d4-03', 'n3-w1d3-01'],
    explanation: 'あの学生は日本語が【わかる】【ように】【なってから★】【明るくなった】みたい。= Sepertinya murid itu jadi lebih ceria setelah bisa memahami bahasa Jepang. ★ = なってから'
  },
  {
    id: 'bs-n3-w1d7-r03', level: 'n3', week: 1, day: 7, type: 'rearrange',
    sentence: '忘れちゃうと _____ _____ ★ _____ なくしちゃった。',
    parts: ['のに', 'メモしといた', 'いけないから', 'そのメモを'],
    answer: [2, 1, 0, 3],
    star_pos: 2,
    grammarIds: ['n3-w1d2-03'],
    explanation: '忘れちゃうと【いけないから】【メモしといた】【のに★】【そのメモを】なくしちゃった。= Padahal sudah catat dulu supaya tidak lupa, eh catatannya malah hilang. ★ = のに'
  },
  {
    id: 'bs-n3-w1d7-r04', level: 'n3', week: 1, day: 7, type: 'rearrange',
    sentence: 'この子は _____ _____ ★ _____ らしくない。',
    parts: ['大人', '子ども', '話し方をして', 'みたいな'],
    answer: [0, 3, 2, 1],
    star_pos: 2,
    grammarIds: ['n3-w1d3-01', 'n3-w1d3-02'],
    explanation: 'この子は【大人】【みたいな】【話し方をして★】【子ども】らしくない。= Anak ini cara bicaranya seperti orang dewasa, tidak kekanak-kanakan. ★ = 話し方をして'
  },
  {
    id: 'bs-n3-w1d7-r05', level: 'n3', week: 1, day: 7, type: 'rearrange',
    sentence: '安売りセールで、買おうと _____ _____ ★ _____ しまいました。',
    parts: ['シャツを', '買われて', '思っていた', 'ほかの人に'],
    answer: [2, 0, 3, 1],
    star_pos: 2,
    grammarIds: ['n3-w1d1-02'],
    explanation: '安売りセールで、買おうと【思っていた】【シャツを】【ほかの人に★】【買われて】しまいました。= Di sale diskon, baju yang hendak kubeli malah dibeli orang lain. ★ = ほかの人に'
  },

  // ── N3 Week 2 ──

  // fill_in
  { id: 'bs-n3-w2-01', level: 'n3', week: 2, type: 'fill_in',
    sentence: '弟はゲームを▢いる。',
    choices: ['してばかり', 'しているだけ', 'してさえ', 'してこそ'],
    answer: 0,
    grammarId: 'n3-w2d1-01',
    explanation: '弟はゲームを【してばかり】いる。= Adikku kerjanya cuma main game terus. ばかり = hanya/terus-terusan melakukan sesuatu.' },

  { id: 'bs-n3-w2-02', level: 'n3', week: 2, type: 'fill_in',
    sentence: 'このイベントは招待された人▢入れません。',
    choices: ['だけしか', 'ばかりが', 'さえが', 'こそが'],
    answer: 0,
    grammarId: 'n3-w2d1-02',
    explanation: 'このイベントは招待された人【だけしか】入れません。= Event ini hanya bisa dimasuki oleh orang yang diundang saja. だけしか + negatif = hanya … saja yang bisa.' },

  { id: 'bs-n3-w2-03', level: 'n3', week: 2, type: 'fill_in',
    sentence: '忙しくて、休む時間▢ありません。',
    choices: ['さえ', 'こそ', 'ばかり', 'だけ'],
    answer: 0,
    grammarId: 'n3-w2d1-03',
    explanation: '忙しくて、休む時間【さえ】ありません。= Sibuk sekali sampai waktu istirahat pun tidak ada. さえ + negatif = bahkan … pun tidak.' },

  { id: 'bs-n3-w2-04', level: 'n3', week: 2, type: 'fill_in',
    sentence: '練習したから▢、今回は絶対に勝てる。',
    choices: ['こそ', 'さえ', 'ばかり', 'だけしか'],
    answer: 0,
    grammarId: 'n3-w2d1-04',
    explanation: '練習したから【こそ】、今回は絶対に勝てる。= Justru karena sudah berlatih, kali ini pasti bisa menang. からこそ = justru karena itulah.' },

  { id: 'bs-n3-w2-05', level: 'n3', week: 2, type: 'fill_in',
    sentence: '天気予報▢、明日は雨が降るそうです。',
    choices: ['によると', 'によって', 'に関して', 'について'],
    answer: 0,
    grammarId: 'n3-w2d2-03',
    explanation: '天気予報【によると】、明日は雨が降るそうだ。= Menurut prakiraan cuaca, besok katanya akan hujan. によると/によれば = menurut (sumber informasi).' },

  { id: 'bs-n3-w2-06', level: 'n3', week: 2, type: 'fill_in',
    sentence: '地震▢、たくさんの建物が壊れた。',
    choices: ['によって', 'によると', 'に関して', 'について'],
    answer: 0,
    grammarId: 'n3-w2d2-04',
    explanation: '地震【によって】、たくさんの建物が壊れた。= Akibat gempa bumi, banyak gedung yang hancur. によって = disebabkan oleh / melalui.' },

  { id: 'bs-n3-w2-07', level: 'n3', week: 2, type: 'fill_in',
    sentence: 'この料理の甘▢がちょうどいい。',
    choices: ['さ', 'み', 'のこと', 'のを'],
    answer: 0,
    grammarId: 'n3-w2d3-01',
    explanation: 'この料理の甘【さ】がちょうどいい。= Tingkat manisnya masakan ini pas sekali. い形容詞語幹 + さ = menyatakan derajat/kadar sifat.' },

  { id: 'bs-n3-w2-08', level: 'n3', week: 2, type: 'fill_in',
    sentence: '彼女▢ことを毎日考えている。',
    choices: ['の', 'が', 'を', 'に'],
    answer: 0,
    grammarId: 'n3-w2d3-03',
    explanation: '彼女【の】ことを毎日考えている。= Aku memikirkan dia setiap hari. のこと = tentang (seseorang/sesuatu), lebih personal dari について.' },

  { id: 'bs-n3-w2-09', level: 'n3', week: 2, type: 'fill_in',
    sentence: 'これは「納豆」▢発酵食品です。',
    choices: ['という', 'といっても', 'というより', 'といえば'],
    answer: 0,
    grammarId: 'n3-w2d4-01',
    explanation: 'これは「納豆」【という】発酵食品です。= Ini adalah makanan fermentasi yang disebut "natto". という = yang disebut / yang bernama.' },

  { id: 'bs-n3-w2-10', level: 'n3', week: 2, type: 'fill_in',
    sentence: '今日は涼しい▢寒いくらいだ。',
    choices: ['というより', 'といっても', 'というのは', 'というと'],
    answer: 0,
    grammarId: 'n3-w2d5-01',
    explanation: '今日は涼しい【というより】寒いくらいだ。= Hari ini lebih dingin daripada sekadar sejuk. というより = lebih tepat dikatakan … daripada …' },

  { id: 'bs-n3-w2-11', level: 'n3', week: 2, type: 'fill_in',
    sentence: '日本語▢、まず文字を覚えることが大切です。',
    choices: ['といえば', 'といっても', 'というより', 'というのは'],
    answer: 0,
    grammarId: 'n3-w2d5-02',
    explanation: '日本語【といえば】、まず文字を覚えることが大切です。= Kalau bicara soal bahasa Jepang, yang paling penting adalah mengingat huruf terlebih dahulu. といえば/というと = kalau bicara soal …' },

  { id: 'bs-n3-w2-12', level: 'n3', week: 2, type: 'fill_in',
    sentence: 'わからなかったら、先生に聞いて▢。',
    choices: ['ごらん', 'みよう', 'おこう', 'しまおう'],
    answer: 0,
    grammarId: 'n3-w2d6-01',
    explanation: 'わからなかったら、先生に聞いて【ごらん】。= Kalau tidak mengerti, coba tanya ke guru. てごらん = coba lakukan (saran lembut, biasanya dari orang lebih tua ke lebih muda).' },

  { id: 'bs-n3-w2-13', level: 'n3', week: 2, type: 'fill_in',
    sentence: '先生に早く来る▢言われた。',
    choices: ['ように', 'なと', 'くれと', 'といっても'],
    answer: 0,
    grammarId: 'n3-w2d6-02',
    explanation: '先生に早く来る【ように】言われた。= Diminta oleh guru agar datang lebih awal. ように言う = meminta/menyuruh agar melakukan sesuatu (indirect request).' },

  // rearrange
  { id: 'bs-n3-w2-r01', level: 'n3', week: 2, type: 'rearrange',
    sentence: '彼女は勉強 _____ _____ ★ _____ います。',
    parts: ['を', 'してばかり', 'しないで', '遊んで'],
    answer: [0, 2, 3, 1],
    star_pos: 2,
    grammarIds: ['n3-w2d1-01'],
    explanation: '彼女は勉強【を】【しないで】【遊んで★】【してばかり】います。= Dia tidak belajar, kerjanya cuma main terus. ★ = 遊んで' },

  { id: 'bs-n3-w2-r02', level: 'n3', week: 2, type: 'rearrange',
    sentence: 'この薬は医者 _____ _____ ★ _____ ません。',
    parts: ['だけしか', 'に', '処方でき', '書いてもらった人'],
    answer: [1, 3, 0, 2],
    star_pos: 2,
    grammarIds: ['n3-w2d1-02'],
    explanation: 'この薬は医者【に】【書いてもらった人】【だけしか★】【処方でき】ません。= Obat ini hanya bisa diresepkan kepada orang yang mendapat resep dari dokter. ★ = だけしか' },

  { id: 'bs-n3-w2-r03', level: 'n3', week: 2, type: 'rearrange',
    sentence: '環境問題 _____ _____ ★ _____ ください。',
    parts: ['に関して', 'あなたの', 'を聞かせて', '意見'],
    answer: [0, 1, 3, 2],
    star_pos: 2,
    grammarIds: ['n3-w2d2-01'],
    explanation: '環境問題【に関して】【あなたの】【意見★】【を聞かせて】ください。= Mengenai masalah lingkungan, tolong ceritakan pendapatmu. ★ = 意見' },

  { id: 'bs-n3-w2-r04', level: 'n3', week: 2, type: 'rearrange',
    sentence: 'これは _____ _____ ★ _____ です。',
    parts: ['という', '日本の伝統的な', '「折り紙」', '遊び'],
    answer: [2, 0, 3, 1],
    star_pos: 2,
    grammarIds: ['n3-w2d4-01'],
    explanation: 'これは【「折り紙」】【という】【遊び★】【日本の伝統的な】です。= Ini adalah permainan tradisional Jepang yang disebut "origami". ★ = 遊び' },

  { id: 'bs-n3-w2-r05', level: 'n3', week: 2, type: 'rearrange',
    sentence: '旅行した、 _____ _____ ★ _____ だけですが。',
    parts: ['近くの', 'といっても', '温泉に行った', '町の'],
    answer: [1, 3, 0, 2],
    star_pos: 2,
    grammarIds: ['n3-w2d5-03'],
    explanation: '旅行した、【といっても】【町の】【近くの★】【温泉に行った】だけですが。= Meski dibilang wisata, ya cuma pergi ke pemandian air panas dekat kota. ★ = 近くの' },

  { id: 'bs-n3-w2-r06', level: 'n3', week: 2, type: 'rearrange',
    sentence: '母に、部屋を _____ _____ ★ _____ いる。',
    parts: ['ように', '掃除する', '言われて', 'もっと'],
    answer: [3, 1, 0, 2],
    star_pos: 2,
    grammarIds: ['n3-w2d6-02'],
    explanation: '母に、部屋を【もっと】【掃除する】【ように★】【言われて】いる。= Ibu selalu bilang agar lebih rajin membersihkan kamar. ★ = ように' },

  // ── N1/N2/N4/N5 — Coming Soon ──
  // akan diisi saat konten PDF tersedia
];

// Helper: ambil soal berdasarkan filter
window.getBankSoal = function({ level = 'all', week = null } = {}) {
  return window.bankSoal.filter(q =>
    (level === 'all' || q.level === level) &&
    (week === null   || q.week  === week)
  );
};


// Helper tambahan: filter by type
window.getRearrangeBank = function(opts = {}) {
  return window.getBankSoal(opts).filter(q => q.type === 'rearrange');
};
window.getFillInBank = function(opts = {}) {
  return window.getBankSoal(opts).filter(q => q.type === 'fill_in');
};
