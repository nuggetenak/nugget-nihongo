// BANK SOAL — Quiz 4 Mode Baru
// Mode: conjugation | translation | error_find | multi_choice
//
// ── TYPE: 'conjugation' ──────────────────────────────────────────
//   { id, level, week, type, instruction, base, choices[], answer, grammarId, explanation }
//   instruction : perintah (misal: "Ubah ke bentuk pasif")
//   base        : kata/kalimat dasar
//   choices     : 4 pilihan jawaban (string)
//   answer      : index jawaban benar (0-based)
//
// ── TYPE: 'translation' ──────────────────────────────────────────
//   { id, level, week, type, direction, prompt, choices[], answer, grammarId, explanation }
//   direction   : 'id_to_jp' | 'jp_to_id'
//   prompt      : kalimat yang perlu diterjemahkan
//
// ── TYPE: 'error_find' ───────────────────────────────────────────
//   { id, level, week, type, choices[], answer, correction, grammarIds[], explanation }
//   choices     : 4 kalimat; answer = index kalimat yang SALAH
//   correction  : kalimat yang sudah diperbaiki
//
// ── TYPE: 'multi_choice' ─────────────────────────────────────────
//   { id, level, week, type, context, choices[], answer, grammarIds[], explanation }
//   context     : situasi / pertanyaan kontekstual
//   choices     : 4 ekspresi/kalimat; answer = index paling tepat
//
// ══════════════════════════════════════════════════════════════════

window.bankSoalQuiz4 = [

  // ╔══════════════════════════════════════════════════════════╗
  // ║  N3  WEEK 1 — がんばらなくちゃ！                         ║
  // ╚══════════════════════════════════════════════════════════╝

  // ── CONJUGATION ─────────────────────────────────────────────
  {
    id: 'q4-cj-n3-w1-01', level: 'n3', week: 1, type: 'conjugation',
    instruction: 'Ubah kata kerja berikut ke bentuk pasif (受身形)',
    base: '食べる',
    choices: ['食べられる', '食べさせる', '食べてもらう', '食べられさせる'],
    answer: 0,
    grammarId: 'n3-w1d1-01',
    explanation: '食べる (ichidan) → 食べられる. Rumus ichidan: V-stem + られる. Pasif menyatakan "dimakan / kena dimakan".'
  },
  {
    id: 'q4-cj-n3-w1-02', level: 'n3', week: 1, type: 'conjugation',
    instruction: 'Ubah kata kerja berikut ke bentuk kausatif (使役形)',
    base: '書く',
    choices: ['書かせる', '書かれる', '書かせられる', '書いてもらう'],
    answer: 0,
    grammarId: 'n3-w1d1-03',
    explanation: '書く (godan-く) → 書かせる. Rumus godan: ganti akhiran u→a + せる. Kausatif = membuat/menyuruh orang lain menulis.'
  },
  {
    id: 'q4-cj-n3-w1-03', level: 'n3', week: 1, type: 'conjugation',
    instruction: 'Ubah kata kerja berikut ke bentuk kausatif-pasif (使役受身形)',
    base: '飲む',
    choices: ['飲まされる', '飲まれる', '飲ませる', '飲まさせる'],
    answer: 0,
    grammarId: 'n3-w1d1-03',
    explanation: '飲む (godan-む) → 飲まされる. Bentuk kausatif-pasif = terpaksa minum. Versi panjang: 飲ませられる, tapi 〜まされる lebih umum untuk godan.'
  },
  {
    id: 'q4-cj-n3-w1-04', level: 'n3', week: 1, type: 'conjugation',
    instruction: 'Ubah ke bentuk kasual (〜ちゃった) — bentuk "sudah terlanjur"',
    base: '忘れてしまった',
    choices: ['忘れちゃった', '忘れちゃう', '忘れとく', '忘れないと'],
    answer: 0,
    grammarId: 'n3-w1d2-02',
    explanation: '〜てしまった → 〜ちゃった (kasual). 忘れてしまった → 忘れちゃった. Nuansa menyesal atau tidak sengaja.'
  },
  {
    id: 'q4-cj-n3-w1-05', level: 'n3', week: 1, type: 'conjugation',
    instruction: 'Ubah ke bentuk kasual (〜とく) — aksi yang dilakukan sebagai persiapan',
    base: '調べておく',
    choices: ['調べとく', '調べちゃう', '調べながら', '調べてみる'],
    answer: 0,
    grammarId: 'n3-w1d2-03',
    explanation: '〜ておく → 〜とく (kasual). 調べておく → 調べとく. Berarti "sudah mencari tahu/menyiapkan duluan".'
  },

  // ── TRANSLATION ──────────────────────────────────────────────
  {
    id: 'q4-tr-n3-w1-01', level: 'n3', week: 1, type: 'translation',
    direction: 'id_to_jp',
    prompt: '"Saya harus belajar lebih keras mulai sekarang."',
    choices: [
      'これからもっと一生懸命勉強しなくちゃ。',
      'これからもっと一生懸命勉強したい。',
      'これからもっと一生懸命勉強してほしい。',
      'これからもっと一生懸命勉強するはずだ。'
    ],
    answer: 0,
    grammarId: 'n3-w1d2-01',
    explanation: '「〜なくちゃ」= harus (kasual). 〜したい = ingin, 〜してほしい = ingin orang lain melakukan, 〜するはずだ = seharusnya (ekspektasi). Konteks "harus" → なくちゃ.'
  },
  {
    id: 'q4-tr-n3-w1-02', level: 'n3', week: 1, type: 'translation',
    direction: 'id_to_jp',
    prompt: '"Tolong izinkan saya melihat dokumen itu."',
    choices: [
      'その書類を見させてください。',
      'その書類を見てください。',
      'その書類を見てもいいですか。',
      'その書類を見るべきです。'
    ],
    answer: 0,
    grammarId: 'n3-w1d1-03',
    explanation: '〜させてください = tolong izinkan saya melakukan. Ini lebih sopan dari 〜てもいいですか karena posisi pembicara yang "memohon izin".'
  },
  {
    id: 'q4-tr-n3-w1-03', level: 'n3', week: 1, type: 'translation',
    direction: 'jp_to_id',
    prompt: '「この神社は100年以上前に建てられたと言われています。」',
    choices: [
      'Kuil ini dikatakan dibangun lebih dari 100 tahun yang lalu.',
      'Kuil ini dibangun 100 tahun yang lalu oleh seseorang.',
      'Orang-orang berkata bahwa kuil ini akan dibangun 100 tahun lagi.',
      'Kuil ini sudah diperbaiki lebih dari 100 tahun yang lalu.'
    ],
    answer: 0,
    grammarId: 'n3-w1d1-01',
    explanation: '建てられた = bentuk pasif dari 建てる (membangun). 〜と言われています = dikatakan bahwa ~. Kalimat ini menyatakan fakta umum tanpa menyebut pelakunya.'
  },
  {
    id: 'q4-tr-n3-w1-04', level: 'n3', week: 1, type: 'translation',
    direction: 'id_to_jp',
    prompt: '"Saya tidak sengaja menghapus file itu."',
    choices: [
      'そのファイルを消してしまいました。',
      'そのファイルを消しておきました。',
      'そのファイルを消させてください。',
      'そのファイルを消すところです。'
    ],
    answer: 0,
    grammarId: 'n3-w1d2-02',
    explanation: '〜てしまいました = sudah terlanjur / tidak sengaja (nuansa menyesal). 〜ておく = sengaja menyiapkan, 〜させてください = minta izin, 〜するところ = baru akan.'
  },
  {
    id: 'q4-tr-n3-w1-05', level: 'n3', week: 1, type: 'translation',
    direction: 'jp_to_id',
    prompt: '「友達に急に来られて、困ってしまった。」',
    choices: [
      'Teman saya tiba-tiba datang (ke rumah), dan saya jadi kebingungan.',
      'Teman saya tidak bisa tiba-tiba datang, dan saya jadi sedih.',
      'Saya tiba-tiba mendatangi teman, lalu dia kebingungan.',
      'Teman saya meminta saya untuk segera datang.'
    ],
    answer: 0,
    grammarId: 'n3-w1d1-02',
    explanation: '〜に〜られる = pasif kena-akibat (terdampak tindakan orang lain). 来られて = kena datangi, ada nuansa "terpaksa menerima" yang merepotkan.'
  },

  // ── ERROR FIND ───────────────────────────────────────────────
  {
    id: 'q4-ef-n3-w1-01', level: 'n3', week: 1, type: 'error_find',
    choices: [
      'この映画は世界中で見られています。',
      '試験に合格できて、先生が褒めてくれた。',
      '雨が降られて、服がぬれてしまった。',
      '早く帰らなくちゃ、遅刻してしまう。'
    ],
    answer: 2,
    correction: '雨に降られて、服がぬれてしまった。',
    grammarIds: ['n3-w1d1-02'],
    explanation: 'Kalimat C salah: 「雨が降られて」seharusnya 「雨に降られて」. Dalam pasif kena-akibat 〜に〜られる, pelaku (yang menyebabkan dampak) menggunakan partikel に, bukan が.'
  },
  {
    id: 'q4-ef-n3-w1-02', level: 'n3', week: 1, type: 'error_find',
    choices: [
      '旅行の前に荷物を準備しとくべきだよ。',
      '先生に発表させてもらえますか。',
      '彼は何を言われても、笑っているだけだ。',
      '明日の会議のため、資料を準備させていた。'
    ],
    answer: 3,
    correction: '明日の会議のため、資料を準備しておいた。',
    grammarIds: ['n3-w1d2-03'],
    explanation: 'Kalimat D salah: 「準備させていた」tidak tepat — させる adalah kausatif (menyuruh orang lain), sedangkan konteksnya berbicara tentang mempersiapkan diri sendiri. Yang benar: 〜しておいた (persiapan yang sudah dilakukan).'
  },
  {
    id: 'q4-ef-n3-w1-03', level: 'n3', week: 1, type: 'error_find',
    choices: [
      '彼はいつも人の話を聞こうとしない。',
      '私の財布は誰かに盗まれてしまった。',
      'すみません、少し休ませていただけますか。',
      'あの店はいつも混んでいるだけに、おいしいはずだ。'
    ],
    answer: 3,
    correction: 'あの店はいつも混んでいるから、おいしいはずだ。',
    grammarIds: ['n3-w1d3-01'],
    explanation: 'Kalimat D salah: 「〜だけに」berarti "justru karena ~ (maka wajar/natural hasilnya)", bukan "karena ~ maka". Gunakan 〜から untuk sebab-akibat sederhana. Atau jika pakai 〜だけに: "あの店はいつも混んでいるだけに、おいしいに違いない" lebih natural.'
  },
  {
    id: 'q4-ef-n3-w1-04', level: 'n3', week: 1, type: 'error_find',
    choices: [
      '彼女はうれしさのあまり、泣き出してしまった。',
      '宿題は明日までにやっておきます。',
      '先生に叱られたことが、彼の成長につながった。',
      '子供に壊したので、パソコンを修理した。'
    ],
    answer: 3,
    correction: '子供に壊されたので、パソコンを修理した。',
    grammarIds: ['n3-w1d1-02'],
    explanation: 'Kalimat D salah: 「子供に壊した」menggunakan bentuk aktif, tapi konteksnya adalah si "saya" yang terdampak (pasokan kena rusak oleh anak). Seharusnya pasif: 「子供に壊された」= PC saya dirusak oleh anak.'
  },
  {
    id: 'q4-ef-n3-w1-05', level: 'n3', week: 1, type: 'error_find',
    choices: [
      'スピーチをさせていただいてもよろしいでしょうか。',
      '財布を家に忘れてきちゃった。',
      '何があっても、彼はあきらめようとしていない。',
      'ちゃんと睡眠をとっておかないと、体を壊すよ。'
    ],
    answer: 2,
    correction: '何があっても、彼はあきらめようとしない。',
    grammarIds: ['n3-w1d6-03'],
    explanation: 'Kalimat C perlu dicermati: 「〜ようとしていない」bisa digunakan tapi 「〜ようとしない」lebih idiomatis untuk menyatakan "tidak punya niat/tidak mau sama sekali". 〜ていない menekankan kondisi ongoing, sedangkan ようとしない sudah cukup sebagai pola penuh.'
  },

  // ── MULTI CHOICE ────────────────────────────────────────────
  {
    id: 'q4-mc-n3-w1-01', level: 'n3', week: 1, type: 'multi_choice',
    context: 'Kamu adalah karyawan baru yang ingin meminta izin kepada atasan untuk meninggalkan rapat sebentar karena ada telepon penting. Ekspresi mana yang paling tepat?',
    choices: [
      'ちょっと出てもいい？',
      '少し席を外させていただけますか。',
      '出てほしいんですが。',
      'ちょっと行くね。'
    ],
    answer: 1,
    grammarIds: ['n3-w1d1-03'],
    explanation: '〜させていただく adalah bentuk paling sopan untuk meminta izin melakukan sesuatu dalam konteks formal/atasan. Pilihan A terlalu kasual, C malah menyuruh orang lain pergi, D adalah bahasa kasual tanpa minta izin.'
  },
  {
    id: 'q4-mc-n3-w1-02', level: 'n3', week: 1, type: 'multi_choice',
    context: 'Kamu baru sadar bahwa kamu lupa mengumpulkan tugas kemarin. Kamu cerita ke teman dengan nada menyesal. Kalimat mana yang paling alami?',
    choices: [
      '昨日、宿題を出しておいた。',
      '昨日、宿題を出したはずだ。',
      '昨日、宿題を出すのを忘れちゃった。',
      '昨日、宿題を出させてしまった。'
    ],
    answer: 2,
    grammarIds: ['n3-w1d2-02'],
    explanation: '〜ちゃった (= 〜てしまった) mengungkapkan penyesalan atas kejadian yang tidak diinginkan. 〜ておいた berarti sudah sengaja menyiapkan (kebalikan dari lupa), 〜はずだ berarti "seharusnya sudah", 〜させてしまった artinya menyuruh orang lain melakukan.'
  },
  {
    id: 'q4-mc-n3-w1-03', level: 'n3', week: 1, type: 'multi_choice',
    context: 'Kamu merencanakan liburan ke luar kota minggu depan. Kamu ingin menggambarkan bahwa "akomodasi sudah dibooking lebih awal sebagai persiapan". Mana yang paling tepat?',
    choices: [
      'ホテルをもう予約してしまった。',
      'ホテルを予約しとく。',
      'ホテルをまだ予約してある。',
      'ホテルを予約しておいた。'
    ],
    answer: 3,
    grammarIds: ['n3-w1d2-03'],
    explanation: '〜ておいた = sudah melakukan lebih awal sebagai persiapan (lampau). 〜とく kasual-nya tapi dalam bentuk lampau seharusnya 〜といた. 〜してしまった ada nuansa menyesal, 〜してある menunjukkan keadaan hasil (ok juga tapi kurang pas untuk menekankan "sudah disiapkan lebih awal").'
  },
  {
    id: 'q4-mc-n3-w1-04', level: 'n3', week: 1, type: 'multi_choice',
    context: 'Kamu menginformasikan kepada teman bahwa "Gunung Fuji terkenal sebagai simbol Jepang" — ini adalah fakta umum tanpa menyebut siapa yang menganggap demikian. Pilih kalimat yang paling tepat.',
    choices: [
      '富士山は日本の象徴だと思われています。',
      '富士山は日本の象徴だと私は考えています。',
      '富士山は日本の象徴だと彼が言われています。',
      '富士山は日本の象徴だと信じさせています。'
    ],
    answer: 0,
    grammarIds: ['n3-w1d1-01'],
    explanation: '〜と思われています = dianggap / diyakini (pasif fakta umum, tanpa menyebut pelaku). Pilihan B adalah pendapat pribadi, C gramatika salah (彼が言われている tidak natural untuk konteks ini), D menyesatkan (信じさせる = membuat orang percaya).'
  },
  {
    id: 'q4-mc-n3-w1-05', level: 'n3', week: 1, type: 'multi_choice',
    context: 'Temanmu sudah diajak berkali-kali untuk bergabung ke klub olahraga, tapi selalu menolak. Kamu ingin mengungkapkan bahwa "dia sama sekali tidak punya niat untuk bergabung". Pilih yang paling tepat.',
    choices: [
      '彼はクラブに入りたくない。',
      '彼はクラブに入ろうとしない。',
      '彼はクラブに入れない。',
      '彼はクラブに入るはずがない。'
    ],
    answer: 1,
    grammarIds: ['n3-w1d6-03'],
    explanation: '〜ようとしない = tidak ada niat/kemauan sama sekali, meski sudah diberi kesempatan. 〜たくない = tidak mau (perasaan), 〜られない = tidak bisa (kemampuan), 〜はずがない = tidak mungkin (logika). Konteks "sudah diajak berulang tapi tetap menolak" → 〜ようとしない paling tepat.'
  },

  // ╔══════════════════════════════════════════════════════════╗
  // ║  N3  WEEK 2 — がんばってごらん！                         ║
  // ╚══════════════════════════════════════════════════════════╝

  // ── CONJUGATION ─────────────────────────────────────────────
  {
    id: 'q4-cj-n3-w2-01', level: 'n3', week: 2, type: 'conjugation',
    instruction: 'Ubah adjektif berikut menjadi kata benda menggunakan 〜さ',
    base: '優しい',
    choices: ['優しさ', '優しみ', '優しく', '優しめ'],
    answer: 0,
    grammarId: 'n3-w2d3-01',
    explanation: '優しい (adjektif-い) → 優しさ. Akhiran 〜さ mengubah adjektif menjadi kata benda abstrak (derajat/kualitas). Beda dengan 〜み yang lebih ke "rasa/kondisi yang dirasakan".'
  },
  {
    id: 'q4-cj-n3-w2-02', level: 'n3', week: 2, type: 'conjugation',
    instruction: 'Ubah adjektif berikut menjadi kata benda menggunakan 〜み',
    base: '深い',
    choices: ['深み', '深さ', '深く', '深め'],
    answer: 0,
    grammarId: 'n3-w2d3-01',
    explanation: '深い → 深み. 〜み dipakai ketika adjektif menunjukkan kondisi/rasa yang bisa dirasakan langsung (深み = kedalaman yang terasa). Bandingkan: 深さ = ukuran kedalaman secara objektif.'
  },
  {
    id: 'q4-cj-n3-w2-03', level: 'n3', week: 2, type: 'conjugation',
    instruction: 'Ubah kalimat langsung ke kalimat tidak langsung menggunakan 〜ように言う',
    base: '先生：「静かにしなさい。」',
    choices: [
      '先生は静かにするように言った。',
      '先生は静かにしなさいと言った。',
      '先生は静かにしてほしいと言った。',
      '先生は静かにしようと言った。'
    ],
    answer: 0,
    grammarId: 'n3-w2d5-02',
    explanation: '〜ように言う = menyampaikan instruksi/permintaan tidak langsung. Kalimat perintah 「〜しなさい」diubah ke 「〜するように言った」. Pilihan B adalah kutipan langsung (tetap pakai と), bukan tidak langsung.'
  },
  {
    id: 'q4-cj-n3-w2-04', level: 'n3', week: 2, type: 'conjugation',
    instruction: 'Ubah ke bentuk "〜ても" (meskipun / bahkan jika)',
    base: '雨が降る',
    choices: ['雨が降っても', '雨が降れば', '雨が降ったら', '雨が降るなら'],
    answer: 0,
    grammarId: 'n3-w2d4-03',
    explanation: '〜ても = meskipun / bahkan jika. 雨が降る → 雨が降っても (te-form + も). Berbeda dari: 〜ば/〜たら/〜なら yang semuanya kondisional dengan nuansa berbeda.'
  },
  {
    id: 'q4-cj-n3-w2-05', level: 'n3', week: 2, type: 'conjugation',
    instruction: 'Nominalisasikan klausa berikut menggunakan 〜ということ',
    base: '彼が結婚した',
    choices: [
      '彼が結婚したということ',
      '彼が結婚したこと',
      '彼が結婚したの',
      '彼が結婚したはず'
    ],
    answer: 0,
    grammarId: 'n3-w2d3-03',
    explanation: '〜ということ menominalisasi seluruh fakta/proposisi sebagai konsep abstrak. Cocok untuk "fakta bahwa dia menikah" dalam konteks formal. 〜こと dan 〜の juga bisa nominalisasi tapi lebih konkret/langsung.'
  },

  // ── TRANSLATION ──────────────────────────────────────────────
  {
    id: 'q4-tr-n3-w2-01', level: 'n3', week: 2, type: 'translation',
    direction: 'id_to_jp',
    prompt: '"Menurut berita, besok akan ada gempa bumi besar."',
    choices: [
      'ニュースによると、明日大きな地震があるそうだ。',
      'ニュースによって、明日大きな地震があるだろう。',
      'ニュースでは、明日大きな地震があるはずだ。',
      'ニュースに関して、明日大きな地震があるらしい。'
    ],
    answer: 0,
    grammarId: 'n3-w2d2-03',
    explanation: '〜によると = menurut (sumber informasi). Harus diikuti 〜そうだ (kutipan informasi) atau 〜らしい. Pilihan B: によって = melalui/karena (bukan "menurut"). Pilihan D: に関して = mengenai (topik), bukan sumber.'
  },
  {
    id: 'q4-tr-n3-w2-02', level: 'n3', week: 2, type: 'translation',
    direction: 'jp_to_id',
    prompt: '「彼は優しいというより、少し頼りない感じがする。」',
    choices: [
      'Daripada dikatakan dia baik hati, rasanya dia agak kurang bisa diandalkan.',
      'Dia baik hati, dan juga terasa kurang bisa diandalkan.',
      'Karena dia baik hati, terasa agak kurang bisa diandalkan.',
      'Dia dikatakan baik hati, padahal sebenarnya tidak bisa diandalkan.'
    ],
    answer: 0,
    grammarId: 'n3-w2d3-04',
    explanation: '〜というより = daripada dikatakan ~ (mengoreksi/memperhalus ekspresi sebelumnya). Bukan "dan juga" atau "karena". Nuansanya: "kata 優しい kurang tepat, lebih tepat 頼りない".'
  },
  {
    id: 'q4-tr-n3-w2-03', level: 'n3', week: 2, type: 'translation',
    direction: 'id_to_jp',
    prompt: '"Bahkan murid yang pintar pun bisa gagal ujian kalau tidak belajar."',
    choices: [
      '頭のいい学生でさえ、勉強しなければ試験に落ちることがある。',
      '頭のいい学生だけ、勉強しなければ試験に落ちることがある。',
      '頭のいい学生こそ、勉強しなければ試験に落ちることがある。',
      '頭のいい学生ばかり、勉強しなければ試験に落ちることがある。'
    ],
    answer: 0,
    grammarId: 'n3-w2d1-03',
    explanation: '〜さえ = bahkan ~ pun (contoh paling ekstrem). 〜だけ = hanya, 〜こそ = justru ~ lah (penekanan positif), 〜ばかり = terus/melulu. Konteks "bahkan yang terpintar sekalipun" → 〜さえ.'
  },
  {
    id: 'q4-tr-n3-w2-04', level: 'n3', week: 2, type: 'translation',
    direction: 'jp_to_id',
    prompt: '「日本語についての本を探しているんですが、おすすめはありますか。」',
    choices: [
      'Saya sedang mencari buku tentang bahasa Jepang, ada rekomendasi?',
      'Saya ingin tahu tentang bahasa Jepang, apakah ada buku bagus?',
      'Berkaitan dengan buku bahasa Jepang, apakah Anda menyukainya?',
      'Saya mencari buku yang ditulis dalam bahasa Jepang, ada saran?'
    ],
    answer: 0,
    grammarId: 'n3-w2d2-02',
    explanation: '〜について = tentang ~ (topik yang dibahas/dicari). 日本語についての本 = buku tentang bahasa Jepang (buku yang membahas bahasa Jepang, bukan buku berbahasa Jepang).'
  },
  {
    id: 'q4-tr-n3-w2-05', level: 'n3', week: 2, type: 'translation',
    direction: 'id_to_jp',
    prompt: '"Coba kerjakan dulu soalnya, pasti kamu bisa."',
    choices: [
      'まずその問題をやってごらん、きっとできるよ。',
      'まずその問題をやってみて、きっとできるよ。',
      'まずその問題をやらせて、きっとできるよ。',
      'まずその問題をやってほしい、きっとできるよ。'
    ],
    answer: 0,
    grammarId: 'n3-w2d5-01',
    explanation: '〜てごらん = coba lakukan (perintah halus dari atasan/orang tua ke yang lebih muda). 〜てみて = coba (lebih netral), 〜させて = biarkan aku melakukan, 〜てほしい = aku ingin kamu melakukan. Konteks "menyemangati sambil menyuruh coba" → てごらん paling cocok.'
  },

  // ── ERROR FIND ───────────────────────────────────────────────
  {
    id: 'q4-ef-n3-w2-01', level: 'n3', week: 2, type: 'error_find',
    choices: [
      'ニュースによると、明日は晴れるそうです。',
      '環境問題によって、様々な解決策が提案されている。',
      'この問題に関して、専門家の意見を聞くべきだ。',
      '先生によれば、試験は来週あるということだ。'
    ],
    answer: 1,
    correction: '環境問題について、様々な解決策が提案されている。',
    grammarIds: ['n3-w2d2-01', 'n3-w2d2-02'],
    explanation: 'Kalimat B salah konteks: 「環境問題によって」berarti "melalui/karena masalah lingkungan" (cara/sebab). Untuk topik pembahasan seharusnya 「環境問題について」= mengenai masalah lingkungan.'
  },
  {
    id: 'q4-ef-n3-w2-02', level: 'n3', week: 2, type: 'error_find',
    choices: [
      '彼女はきれいさというより、かわいさがある。',
      '山の深みが感じられる、美しい景色だった。',
      '子供たちはゲームをするだけで、宿題をしない。',
      '彼は頭のよさと、勉強ばかりをしている。'
    ],
    answer: 3,
    correction: '彼は頭のよさもあって、よく勉強している。',
    grammarIds: ['n3-w2d1-01'],
    explanation: 'Kalimat D tidak gramatikal: 「頭のよさと、勉強ばかりをしている」— partikel と tidak bisa menghubungkan kata benda 頭のよさ dengan klausa kerja 勉強ばかりをしている. Kalimat aslinya mengacaukan dua pola yang berbeda.'
  },
  {
    id: 'q4-ef-n3-w2-03', level: 'n3', week: 2, type: 'error_find',
    choices: [
      '彼は疲れているといっても、まだ仕事を続けている。',
      '先生は静かにするように言った。',
      '雨が降っても、試合は続けられた。',
      '薬を飲むだけしか、早く治らない。'
    ],
    answer: 3,
    correction: '薬を飲むだけでは、早く治らない。',
    grammarIds: ['n3-w2d1-02'],
    explanation: 'Kalimat D salah: 「〜だけしか〜ない」harus diikuti bentuk negatif. 「薬を飲むだけしか早く治らない」artinya tidak logis. Seharusnya 「薬を飲むだけでは早く治らない」= hanya minum obat saja tidak akan cepat sembuh.'
  },
  {
    id: 'q4-ef-n3-w2-04', level: 'n3', week: 2, type: 'error_find',
    choices: [
      'それは「友情」というNでなく、「義務」だと思う。',
      '彼が成功したということは、みんなに知られている。',
      '「幸せ」というのは、人によって違う意味を持つ。',
      '昨日起きたということについて、説明してください。'
    ],
    answer: 0,
    correction: 'それは「友情」というものでなく、「義務」だと思う。',
    grammarIds: ['n3-w2d3-02'],
    explanation: 'Kalimat A salah: 「〜というN」seharusnya menggunakan kata benda konkret setelah という, bukan huruf kapital "N". Dalam konteks ini: 「友情というもの」atau 「友情という感情」.'
  },
  {
    id: 'q4-ef-n3-w2-05', level: 'n3', week: 2, type: 'error_find',
    choices: [
      '夏といえば、やはり海水浴だね。',
      '日本語こそ難しい言語のひとつだと思う。',
      '彼は毎日練習するこそ、上手になった。',
      'このケーキは甘いというより、しょっぱい。'
    ],
    answer: 2,
    correction: '彼は毎日練習したからこそ、上手になった。',
    grammarIds: ['n3-w2d1-04'],
    explanation: 'Kalimat C salah: 「練習するこそ」— 〜こそ tidak langsung melekat pada V辞書形. Seharusnya melekat pada kata benda atau bentuk 〜たからこそ untuk menekankan alasan: 「練習したからこそ」= justru karena berlatih setiap hari, makanya jadi mahir.'
  },

  // ── MULTI CHOICE ─────────────────────────────────────────────
  {
    id: 'q4-mc-n3-w2-01', level: 'n3', week: 2, type: 'multi_choice',
    context: 'Kamu ingin mengatakan bahwa "film itu bukan sekadar menghibur, tapi justru membuat penonton berpikir". Pilih ekspresi yang paling tepat untuk nuansa kontras/koreksi ini.',
    choices: [
      'あの映画はおもしろいといっても、考えさせられる。',
      'あの映画は楽しいというより、考えさせられる。',
      'あの映画は楽しいばかりか、考えさせられる。',
      'あの映画は楽しいこそ、考えさせられる。'
    ],
    answer: 1,
    grammarIds: ['n3-w2d3-04'],
    explanation: '〜というより = daripada dikatakan ~ (mengoreksi label, memberi yang lebih tepat). "Bukan sekadar menghibur, lebih tepatnya membuat berpikir" → 楽しいというより. Pilihan A: というても = meski dikatakan (konsesi), C: ばかりか = tidak hanya itu, D: こそ tidak bisa langsung ke adjektif.'
  },
  {
    id: 'q4-mc-n3-w2-02', level: 'n3', week: 2, type: 'multi_choice',
    context: 'Wartawan ingin menyampaikan bahwa "Berdasarkan pernyataan pemerintah, pajak akan naik tahun depan". Pilih kalimat yang paling tepat untuk konteks berita.',
    choices: [
      '政府の発表によると、来年税金が上がるそうだ。',
      '政府の発表によって、来年税金が上がるそうだ。',
      '政府の発表に関して、来年税金が上がるそうだ。',
      '政府の発表については、来年税金が上がるそうだ。'
    ],
    answer: 0,
    grammarIds: ['n3-w2d2-03'],
    explanation: '〜によると／によれば = menurut (menyebutkan sumber informasi), selalu diikuti 〜そうだ/〜らしい/〜とのこと. Pilihan B: によって = melalui/karena (cara/agen), bukan "menurut". C & D tidak cocok untuk menyebut sumber berita.'
  },
  {
    id: 'q4-mc-n3-w2-03', level: 'n3', week: 2, type: 'multi_choice',
    context: 'Kamu ingin menekankan bahwa "justru karena dia terus berjuang meski susah, dia layak dihormati". Pilih yang paling tepat untuk penekanan 〜こそ.',
    choices: [
      '苦しいときにもあきらめないから、彼は尊敬される。',
      '苦しいときにもあきらめないからこそ、彼は尊敬されるのだ。',
      '苦しいときにもあきらめないのに、彼は尊敬されるのだ。',
      '苦しいときにもあきらめないだけに、彼は尊敬されるのだ。'
    ],
    answer: 1,
    grammarIds: ['n3-w2d1-04'],
    explanation: '〜からこそ = justru karena ~ (penekanan kuat pada alasan). Nuansanya: "alasan inilah, tidak lain tidak bukan, yang menjadi dasarnya". Pilihan A (〜から) benar tapi tanpa penekanan, C (〜のに) = padahal/kontras, D (〜だけに) = wajar mengingat.'
  },
  {
    id: 'q4-mc-n3-w2-04', level: 'n3', week: 2, type: 'multi_choice',
    context: 'Kamu ingin menjelaskan makna kata "自由" (kebebasan) kepada orang yang baru belajar bahasa Jepang. Pilih kalimat yang paling tepat secara pedagogis.',
    choices: [
      '「自由」というのは、したいことができる状態のことです。',
      '「自由」ということは、したいことができる状態のことです。',
      '「自由」というと、したいことができる状態のことです。',
      '「自由」といっても、したいことができる状態のことです。'
    ],
    answer: 0,
    grammarIds: ['n3-w2d3-02'],
    explanation: '〜というのは = yang dimaksud dengan ~ adalah (mendefinisikan makna kata/konsep). Paling tepat untuk definisi. Pilihan B: ということは = yang berarti (menyimpulkan, bukan mendefinisikan). C: というと = kalau menyebut (asosiasi). D: といっても = meski dikatakan.'
  },
  {
    id: 'q4-mc-n3-w2-05', level: 'n3', week: 2, type: 'multi_choice',
    context: 'Orang tuamu memintamu untuk menyampaikan ke adik bahwa "jangan main HP saat makan". Kamu sampaikan pesan itu secara tidak langsung. Pilih yang paling tepat.',
    choices: [
      '食事中にスマホをさわらないと親が言った。',
      '食事中にスマホをさわるなと親に言われた。',
      '食事中にスマホをさわらないように親が言っていた。',
      '食事中にスマホをさわってほしくないと親は言う。'
    ],
    answer: 2,
    grammarIds: ['n3-w2d5-02'],
    explanation: '〜ないように言う = menyampaikan pesan/instruksi agar tidak melakukan sesuatu (indirect command). Pilihan A: tidak ada 〜ように jadi kurang sopan, B: 〜な = perintah langsung (bukan tidak langsung), D: 〜てほしくない = mengungkapkan perasaan, bukan meneruskan instruksi.'
  },

  // ╔══════════════════════════════════════════════════════════╗
  // ║  N4  WEEK 1 — 一日に二回、歯をみがきます                 ║
  // ╚══════════════════════════════════════════════════════════╝

  // ── CONJUGATION ─────────────────────────────────────────────
  {
    id: 'q4-cj-n4-w1-01', level: 'n4', week: 1, type: 'conjugation',
    instruction: 'Ubah kata kerja berikut ke bentuk て-form (て形)',
    base: '書く',
    choices: ['書いて', '書いた', '書かれて', '書かせて'],
    answer: 0,
    grammarId: 'n4-w1d5-01',
    explanation: '書く (godan-く) → 書いて. Godan-く → ite. て-form untuk 書く dipakai dalam 〜て/で (sebab, cara, sambil).'
  },
  {
    id: 'q4-cj-n4-w1-02', level: 'n4', week: 1, type: 'conjugation',
    instruction: 'Ubah ke bentuk "〜たところ" (baru saja selesai)',
    base: '宿題をする',
    choices: ['宿題をしたところ', '宿題をするところ', '宿題をしているところ', '宿題をしてから'],
    answer: 0,
    grammarId: 'n4-w1d4-03',
    explanation: 'V-たところ = baru saja selesai melakukan. 宿題をした + ところ. Bedakan: Vるところ (baru akan), Vているところ (sedang berlangsung), Vたところ (baru selesai).'
  },
  {
    id: 'q4-cj-n4-w1-03', level: 'n4', week: 1, type: 'conjugation',
    instruction: 'Pilih て-form yang tepat untuk kata kerja berikut: 泳ぐ',
    base: '泳ぐ',
    choices: ['泳いで', '泳って', '泳いて', '泳んで'],
    answer: 0,
    grammarId: 'n4-w1d5-01',
    explanation: '泳ぐ (godan-ぐ) → 泳いで. Godan-ぐ → ide (て→で). Perubahan て-form: く→いて, ぐ→いで, す→して, ぬ/ぶ/む→んで, る/う/つ→って.'
  },
  {
    id: 'q4-cj-n4-w1-04', level: 'n4', week: 1, type: 'conjugation',
    instruction: 'Ubah ke bentuk "Vている" — menyatakan aksi yang sedang berlangsung saat ini',
    base: '走る',
    choices: ['走っている', '走るところ', '走ったまま', '走ったところ'],
    answer: 0,
    grammarId: 'n4-w1d4-01',
    explanation: '走っている = sedang berlari (aksi berlangsung). Bedakan: 走るところ = tepat akan berlari, 走ったまま = tetap dalam keadaan setelah berlari, 走ったところ = baru saja selesai berlari.'
  },
  {
    id: 'q4-cj-n4-w1-05', level: 'n4', week: 1, type: 'conjugation',
    instruction: 'Pilih bentuk "〜たまま" yang tepat: seseorang masuk rumah dengan sepatu tetap dipakai',
    base: '靴を履く',
    choices: ['靴を履いたまま家に入った', '靴を履いて家に入った', '靴を履くまま家に入った', '靴を履いていたまま家に入った'],
    answer: 0,
    grammarId: 'n4-w1d5-04',
    explanation: 'V-たまま = dalam keadaan (kondisi yang tidak berubah sejak aksi selesai). 履く → 履いた + まま. Menyatakan masuk rumah dengan kondisi sepatu masih terpasang.'
  },

  // ── TRANSLATION ──────────────────────────────────────────────
  {
    id: 'q4-tr-n4-w1-01', level: 'n4', week: 1, type: 'translation',
    direction: 'id_to_jp',
    prompt: '"Saya minum obat ini tiga kali sehari."',
    choices: [
      '1日に3回、この薬を飲んでいます。',
      '3日間に、この薬を1回飲んでいます。',
      '1日で3回、この薬を飲んでいます。',
      '毎日3回間、この薬を飲んでいます。'
    ],
    answer: 0,
    grammarId: 'n4-w1d1-01',
    explanation: '〜に (frekuensi) = per ~. 1日に3回 = 3 kali per hari. Partikel に menunjukkan unit waktu sebagai acuan frekuensi. に bukan で atau 間.'
  },
  {
    id: 'q4-tr-n4-w1-02', level: 'n4', week: 1, type: 'translation',
    direction: 'jp_to_id',
    prompt: '「このプリントを1枚ずつ取ってください。」',
    choices: [
      'Tolong ambil cetakan ini masing-masing satu lembar.',
      'Tolong ambil semua cetakan ini.',
      'Tolong ambil cetakan ini satu per satu secara bergantian.',
      'Ambillah satu cetakan untuk satu orang saja.'
    ],
    answer: 0,
    grammarId: 'n4-w1d1-02',
    explanation: '〜ずつ = masing-masing ~ / per ~. 1枚ずつ = satu lembar per orang (pembagian merata). Bukan "satu per satu bergantian" (itu lebih ke 〜ずつ dalam konteks pengulangan), tapi dalam konteks 取る = pengambilan, artinya tiap orang ambil satu lembar masing-masing.'
  },
  {
    id: 'q4-tr-n4-w1-03', level: 'n4', week: 1, type: 'translation',
    direction: 'id_to_jp',
    prompt: '"Film ini tidak sepopuler film sebelumnya."',
    choices: [
      'この映画は前作ほど人気がない。',
      'この映画は前作より人気がない。',
      'この映画は前作ぐらい人気がない。',
      'この映画は前作でも人気がない。'
    ],
    answer: 0,
    grammarId: 'n4-w1d1-03',
    explanation: 'N1はN2ほど〜ない = N1 tidak se~ N2. "Film ini tidak sepopuler film sebelumnya" → この映画は前作ほど人気がない. 〜より menunjukkan perbandingan langsung (lebih dari), 〜ほど〜ない menyatakan tidak mencapai tingkat yang sama.'
  },
  {
    id: 'q4-tr-n4-w1-04', level: 'n4', week: 1, type: 'translation',
    direction: 'jp_to_id',
    prompt: '「宿題をするところです。もう少し待ってください。」',
    choices: [
      'Saya baru akan mengerjakan PR. Tolong tunggu sebentar lagi.',
      'Saya baru saja selesai mengerjakan PR. Tolong tunggu sebentar.',
      'Saya sedang mengerjakan PR. Tolong tunggu sebentar lagi.',
      'Saya belum mengerjakan PR. Tolong menunggu sebentar.'
    ],
    answer: 0,
    grammarId: 'n4-w1d4-01',
    explanation: 'Vるところ = tepat akan / baru akan melakukan. するところです = baru akan mengerjakan (belum mulai). Bedakan: しているところ = sedang, したところ = baru saja selesai.'
  },
  {
    id: 'q4-tr-n4-w1-05', level: 'n4', week: 1, type: 'translation',
    direction: 'id_to_jp',
    prompt: '"Saya sudah pernah pergi ke Jepang dua kali."',
    choices: [
      '日本に2回行ったことがあります。',
      '日本に2回行ったことをしました。',
      '日本に2回行くことがあります。',
      '日本に2回行っています。'
    ],
    answer: 0,
    grammarId: 'n4-w1d6-01',
    explanation: 'V-たことがある = pernah melakukan (pengalaman). 行った + ことがあります. Pilihan D: 行っています = pergi secara rutin/sedang pergi, bukan pengalaman. Pilihan C: 行くことがある = kadang-kadang pergi (bukan pengalaman di masa lalu).'
  },

  // ── ERROR FIND ───────────────────────────────────────────────
  {
    id: 'q4-ef-n4-w1-01', level: 'n4', week: 1, type: 'error_find',
    choices: [
      '1週間で2回、ジムに通っています。',
      '少しずつ日本語が上手になっています。',
      '締め切りまでに提出してください。',
      '日本語は英語ほど簡単ではありません。'
    ],
    answer: 0,
    correction: '1週間に2回、ジムに通っています。',
    grammarIds: ['n4-w1d1-01'],
    explanation: 'Kalimat A salah: untuk frekuensi harus menggunakan partikel に, bukan で. 「1週間で」artinya "dalam waktu 1 minggu" (durasi/cara), bukan "per minggu". Yang benar: 「1週間に2回」= 2 kali per minggu.'
  },
  {
    id: 'q4-ef-n4-w1-02', level: 'n4', week: 1, type: 'error_find',
    choices: [
      '今、ご飯を食べているところです。',
      'さっき電話が来たところでした。',
      '映画はちょうど始まったばかりです。',
      '彼はちょうど帰るところだった。'
    ],
    answer: 1,
    correction: 'さっき電話が来たところです。',
    grammarIds: ['n4-w1d4-03'],
    explanation: 'Kalimat B: 「〜たところでした」bentuknya agak janggal dalam konteks ini — 〜たところ (baru saja) sudah lengkap dengan です saja. でした menambahkan past tense ganda. Lebih natural: 「さっき電話が来たところです」(masih relevan/baru saja) atau 「来たところでした」perlu konteks lampau yang jelas.'
  },
  {
    id: 'q4-ef-n4-w1-03', level: 'n4', week: 1, type: 'error_find',
    choices: [
      'コーヒーを飲みながら、新聞を読んでいる。',
      '靴を脱いだまま、部屋に入ってしまった。',
      '眼鏡をかけたまま、泳いでしまった。',
      '音楽を聴きながら、寝たまま起きられない。'
    ],
    answer: 3,
    correction: '音楽を聴きながら眠ってしまい、起きられなかった。',
    grammarIds: ['n4-w1d5-03', 'n4-w1d5-04'],
    explanation: 'Kalimat D mengacaukan dua pola: 〜ながら dan 〜たまま digunakan tidak konsisten. 「寝たまま起きられない」berarti tertidur dan tidak bisa bangun (kondisi), tapi 「音楽を聴きながら」tidak bisa langsung disambung 「寝たまま」tanpa penghubung yang logis.'
  },
  {
    id: 'q4-ef-n4-w1-04', level: 'n4', week: 1, type: 'error_find',
    choices: [
      'この本はインターネットでも買えます。',
      '彼でさえ解けない問題なら、私には無理だ。',
      '水でも飲みながら、少し休みましょう。',
      '子供しか行けないイベントだから、大人も参加できる。'
    ],
    answer: 3,
    correction: '子供しか行けないイベントだから、大人は参加できない。',
    grammarIds: ['n4-w1d2-03'],
    explanation: 'Kalimat D kontradiksi logis: 「子供しか行けない」= hanya anak-anak yang bisa pergi, tapi dilanjutkan 「大人も参加できる」= orang dewasa juga bisa. Seharusnya negatif: 「大人は参加できない」.'
  },
  {
    id: 'q4-ef-n4-w1-05', level: 'n4', week: 1, type: 'error_find',
    choices: [
      '彼女は泣きながら話してくれた。',
      '3年前に日本に来たことがある。',
      '電気をつけたまま、出かけてしまった。',
      '宿題を終わったばかりに、もう遊んでいる。'
    ],
    answer: 3,
    correction: '宿題が終わったばかりなのに、もう遊んでいる。',
    grammarIds: ['n4-w1d4-04'],
    explanation: 'Kalimat D salah: 「〜たばかりに」bermakna "justru karena ~, akhirnya ~" (penyesalan akibat suatu tindakan), bukan "baru saja ~". Konteks "baru selesai PR langsung main" seharusnya 〜たばかりなのに atau 〜たばかりで.'
  },

  // ── MULTI CHOICE ─────────────────────────────────────────────
  {
    id: 'q4-mc-n4-w1-01', level: 'n4', week: 1, type: 'multi_choice',
    context: 'Kamu sedang menelepon teman dan ingin bilang "Aku baru saja mau pergi keluar, bisa menelepon nanti?" Pilih yang paling tepat.',
    choices: [
      'ちょうど出かけたところだから、後でかけ直していい？',
      'ちょうど出かけるところだから、後でかけ直していい？',
      'ちょうど出かけているところだから、後でかけ直していい？',
      'ちょうど出かけたばかりだから、後でかけ直していい？'
    ],
    answer: 1,
    grammarIds: ['n4-w1d4-01'],
    explanation: 'Vるところ = tepat akan (belum mulai). "Baru mau pergi" = 出かけるところ. Pilihan A: 出かけたところ = baru saja keluar (sudah pergi). C: 出かけているところ = sedang dalam perjalanan. D: 出かけたばかり = baru saja keluar (lampau).'
  },
  {
    id: 'q4-mc-n4-w1-02', level: 'n4', week: 1, type: 'multi_choice',
    context: 'Kamu ingin menyatakan bahwa "kota ini tidak seramai Tokyo". Pilih struktur yang paling tepat.',
    choices: [
      'この町は東京より賑やかではない。',
      'この町は東京ほど賑やかではない。',
      'この町は東京ぐらい賑やかではない。',
      'この町は東京でも賑やかではない。'
    ],
    answer: 1,
    grammarIds: ['n4-w1d1-03'],
    explanation: 'N1はN2ほど〜ない = N1 tidak se~ N2 (tidak mencapai level N2). 〜より〜ない berarti "kurang dari" tapi nuansanya berbeda dan kurang natural untuk perbandingan jenis ini. 〜ほど〜ない adalah pola standar untuk "tidak se-X".'
  },
  {
    id: 'q4-mc-n4-w1-03', level: 'n4', week: 1, type: 'multi_choice',
    context: 'Kamu ingin mengungkapkan bahwa kamu pernah mencoba masakan Thailand. Pilih ekspresi yang paling tepat.',
    choices: [
      'タイ料理を食べることがある。',
      'タイ料理を食べていることがある。',
      'タイ料理を食べたことがある。',
      'タイ料理を食べるようになった。'
    ],
    answer: 2,
    grammarIds: ['n4-w1d6-01'],
    explanation: 'V-たことがある = pernah melakukan (pengalaman masa lalu). 食べたことがある = pernah makan. Pilihan A: 食べることがある = kadang-kadang makan (bukan pengalaman). D: 食べるようになった = mulai menjadi kebiasaan makan.'
  },
  {
    id: 'q4-mc-n4-w1-04', level: 'n4', week: 1, type: 'multi_choice',
    context: 'Kamu ingin menggambarkan situasi: teman kamu bekerja sambil mendengarkan musik. Pilih yang paling alami.',
    choices: [
      '友達は音楽を聴いたまま、仕事をしている。',
      '友達は音楽を聴きながら、仕事をしている。',
      '友達は音楽を聴いて、仕事をしている。',
      '友達は音楽を聴く間に、仕事をしている。'
    ],
    answer: 1,
    grammarIds: ['n4-w1d5-03'],
    explanation: '〜ながら = sambil ~ (dua aksi berlangsung bersamaan, subjek sama). 聴きながら仕事をする = bekerja sambil mendengarkan. Pilihan A: たまま = dalam kondisi tetap (misal: sepatu masih dipakai), tidak cocok untuk aksi dinamis seperti mendengarkan musik secara aktif.'
  },
  {
    id: 'q4-mc-n4-w1-05', level: 'n4', week: 1, type: 'multi_choice',
    context: 'Kamu masuk ke dalam ruangan tapi lampunya mati. Kamu ingin menggambarkan "saya masuk dalam keadaan lampu tetap mati". Pilih yang paling tepat.',
    choices: [
      '電気を消しながら、部屋に入った。',
      '電気を消したまま、部屋に入った。',
      '電気が消えているところに、部屋に入った。',
      '電気を消して、部屋に入った。'
    ],
    answer: 1,
    grammarIds: ['n4-w1d5-04'],
    explanation: '〜たまま = dengan kondisi yang tidak berubah. 電気を消したまま = dengan lampu tetap dalam keadaan mati. Pilihan A: 〜ながら = sambil (dua aksi bersamaan, kurang cocok), D: 〜て = melakukan lalu masuk (sequential, tidak menekankan kondisi yang dipertahankan).'
  },

  // ╔══════════════════════════════════════════════════════════╗
  // ║  N4  WEEK 2 — 宿題をしなければいけません                 ║
  // ╚══════════════════════════════════════════════════════════╝

  // ── CONJUGATION ─────────────────────────────────────────────
  {
    id: 'q4-cj-n4-w2-01', level: 'n4', week: 2, type: 'conjugation',
    instruction: 'Ubah ke bentuk "〜なければならない" (harus/wajib) — bentuk formal',
    base: '薬を飲む',
    choices: ['薬を飲まなければならない', '薬を飲まなくてもいい', '薬を飲んではいけない', '薬を飲まなくちゃ'],
    answer: 0,
    grammarId: 'n4-w2d1-01',
    explanation: '飲む → 飲ま + なければならない (formal). Pola: V-nai form tanpa い + ければならない. Pilihan D 〜なくちゃ adalah bentuk kasual dari kewajiban yang sama.'
  },
  {
    id: 'q4-cj-n4-w2-02', level: 'n4', week: 2, type: 'conjugation',
    instruction: 'Ubah ke bentuk "〜てもいい" (boleh / diizinkan)',
    base: 'ここで写真を撮る',
    choices: [
      'ここで写真を撮ってもいい',
      'ここで写真を撮らなくてもいい',
      'ここで写真を撮ってはいけない',
      'ここで写真を撮らなければならない'
    ],
    answer: 0,
    grammarId: 'n4-w2d1-03',
    explanation: '〜てもいい = boleh melakukan. V-te form + もいい. 写真を撮る → 写真を撮って + もいい. Pilihan B: 〜なくてもいい = tidak perlu, C: 〜てはいけない = tidak boleh.'
  },
  {
    id: 'q4-cj-n4-w2-03', level: 'n4', week: 2, type: 'conjugation',
    instruction: 'Ubah ke bentuk perintah langsung (命令形) — situasi darurat kepada teman',
    base: '早く逃げる',
    choices: ['早く逃げろ', '早く逃げて', '早く逃げなさい', '早く逃げてください'],
    answer: 0,
    grammarId: 'n4-w2d6-03',
    explanation: '逃げる (ichidan) → 逃げろ (命令形). Bentuk perintah paling langsung/darurat, hanya dipakai ke bawahan atau situasi mendesak. 〜なさい lebih halus (guru ke murid), 〜てください paling sopan.'
  },
  {
    id: 'q4-cj-n4-w2-04', level: 'n4', week: 2, type: 'conjugation',
    instruction: 'Pilih bentuk "Vておく" yang tepat untuk situasi: menyiapkan bahan sebelum memasak',
    base: '野菜を切る',
    choices: ['野菜を切っておく', '野菜を切ってしまう', '野菜を切っている', '野菜を切ったまま'],
    answer: 0,
    grammarId: 'n4-w2d2-01',
    explanation: '〜ておく = melakukan lebih awal sebagai persiapan. 野菜を切っておく = memotong sayur terlebih dahulu (sebelum memasak). 〜てしまう = terlanjur/selesai tuntas (ada nuansa menyesal), 〜ている = sedang, 〜たまま = kondisi tidak berubah.'
  },
  {
    id: 'q4-cj-n4-w2-05', level: 'n4', week: 2, type: 'conjugation',
    instruction: 'Ubah ke bentuk "〜てあげる" — melakukan sesuatu untuk orang lain (diri sendiri sebagai pemberi)',
    base: '友達の荷物を持つ',
    choices: [
      '友達の荷物を持ってあげる',
      '友達の荷物を持ってもらう',
      '友達の荷物を持ってくれる',
      '友達の荷物を持ってくださる'
    ],
    answer: 0,
    grammarId: 'n4-w2d3-02',
    explanation: 'V-てあげる = melakukan untuk orang lain (pembicara atau in-group sebagai pelaku). 持ってあげる = membawakannya untuk teman. 〜てもらう = meminta/menerima bantuan, 〜てくれる = orang lain melakukan untuk saya.'
  },

  // ── TRANSLATION ──────────────────────────────────────────────
  {
    id: 'q4-tr-n4-w2-01', level: 'n4', week: 2, type: 'translation',
    direction: 'id_to_jp',
    prompt: '"Kamu tidak perlu membawa uang tunai."',
    choices: [
      '現金を持ってこなくてもいいよ。',
      '現金を持ってきてはいけないよ。',
      '現金を持ってこなければならないよ。',
      '現金を持ってきてもいいよ。'
    ],
    answer: 0,
    grammarId: 'n4-w2d1-04',
    explanation: '〜なくてもいい = tidak perlu / tidak harus (tidak ada kewajiban). Pilihan B: 〜てはいけない = tidak boleh (larangan, terlalu keras), C: 〜なければならない = harus (kewajiban, berlawanan arti), D: 〜てもいい = boleh membawa (izin, bukan "tidak perlu").'
  },
  {
    id: 'q4-tr-n4-w2-02', level: 'n4', week: 2, type: 'translation',
    direction: 'jp_to_id',
    prompt: '「このボタンを押してはいけません。」',
    choices: [
      'Tombol ini tidak boleh ditekan.',
      'Tombol ini tidak perlu ditekan.',
      'Tombol ini boleh ditekan.',
      'Tombol ini harus ditekan.'
    ],
    answer: 0,
    grammarId: 'n4-w2d1-05',
    explanation: '〜てはいけない / 〜てはならない = tidak boleh / dilarang (larangan). Berbeda dengan 〜なくてもいい (tidak perlu) atau 〜てもいい (boleh).'
  },
  {
    id: 'q4-tr-n4-w2-03', level: 'n4', week: 2, type: 'translation',
    direction: 'id_to_jp',
    prompt: '"Teman saya membelikan saya kue ulang tahun."',
    choices: [
      '友達がバースデーケーキを買ってくれた。',
      '友達にバースデーケーキを買ってあげた。',
      '友達にバースデーケーキを買ってもらった。',
      '私が友達にバースデーケーキを買ってくれた。'
    ],
    answer: 0,
    grammarId: 'n4-w2d3-02',
    explanation: '〜てくれる = orang lain melakukan sesuatu untuk saya/in-group (penerima manfaat = pembicara). 友達がくれた → teman yang berinisiatif memberi. 〜てもらう (pilihan C) juga bisa tapi fokusnya "saya yang minta/menerima", 〜てくれた lebih natural untuk "teman yang dengan baik hati melakukan".'
  },
  {
    id: 'q4-tr-n4-w2-04', level: 'n4', week: 2, type: 'translation',
    direction: 'jp_to_id',
    prompt: '「毎日30分は運動するようにしています。」',
    choices: [
      'Saya berusaha untuk berolahraga 30 menit setiap hari.',
      'Saya sudah bisa berolahraga 30 menit setiap hari.',
      'Saya harus berolahraga 30 menit setiap hari.',
      'Saya biasa berolahraga 30 menit setiap hari.'
    ],
    answer: 0,
    grammarId: 'n4-w2d4-03',
    explanation: '〜ようにしている = berusaha untuk / menjadikan kebiasaan (usaha yang disengaja, sedang diupayakan). Pilihan B: 〜ようになった = sudah menjadi bisa (perubahan yang sudah terjadi), C: 〜なければならない = harus, D: tidak ada pola 〜ようにしている dalam arti "biasa".'
  },
  {
    id: 'q4-tr-n4-w2-05', level: 'n4', week: 2, type: 'translation',
    direction: 'id_to_jp',
    prompt: '"Lebih baik kamu istirahat dulu."',
    choices: [
      '少し休んだほうがいいよ。',
      '少し休むようにしてください。',
      '少し休まなくてもいいよ。',
      '少し休んでもいいよ。'
    ],
    answer: 0,
    grammarId: 'n4-w2d6-01',
    explanation: 'V-たほうがいい = lebih baik melakukan ~ (saran/rekomendasi). 休んだほうがいい = lebih baik istirahat. Pilihan D: 〜てもいい = boleh istirahat (izin, bukan saran), B: 〜ようにする = berusaha (arahan lebih halus), C: kebalikan makna.'
  },

  // ── ERROR FIND ───────────────────────────────────────────────
  {
    id: 'q4-ef-n4-w2-01', level: 'n4', week: 2, type: 'error_find',
    choices: [
      '毎朝、薬を飲まなければなりません。',
      '宿題は明日までにしておきます。',
      '疲れたから、少し休んでもいいですか。',
      'この部屋では、タバコを吸ってもいけません。'
    ],
    answer: 3,
    correction: 'この部屋では、タバコを吸ってはいけません。',
    grammarIds: ['n4-w2d1-05'],
    explanation: 'Kalimat D salah: 「吸ってもいけません」bukan pola yang benar. Larangan menggunakan 「〜てはいけない」(te wa ikenai), bukan 「〜てもいけない」. Yang benar: 「吸ってはいけません」.'
  },
  {
    id: 'q4-ef-n4-w2-02', level: 'n4', week: 2, type: 'error_find',
    choices: [
      '母が夕食を作ってくれた。',
      '先生に説明してもらった。',
      '弟にケーキを食べてあげた。',
      '友達に宿題を手伝ってもらった。'
    ],
    answer: 2,
    correction: '弟にケーキを食べてもらった。 または 弟にケーキを食べさせた。',
    grammarIds: ['n4-w2d3-02'],
    explanation: 'Kalimat C tidak masuk akal: 「弟にケーキを食べてあげた」= saya makan kue untuk adik, yang aneh secara konteks. 〜てあげる artinya pembicara melakukan sesuatu untuk orang lain. Kue tidak bisa "dimakan untuk orang lain". Seharusnya 「弟にケーキを食べてもらった」atau 「食べさせた」.'
  },
  {
    id: 'q4-ef-n4-w2-03', level: 'n4', week: 2, type: 'error_find',
    choices: [
      '試験の前に、単語を覚えておいた。',
      '部屋の窓を開けてある。',
      '明日の準備をしておいてよかった。',
      '昨日のご飯を食べてしまってある。'
    ],
    answer: 3,
    correction: '昨日のご飯を食べてしまった。 または 昨日のご飯はもう食べてある。',
    grammarIds: ['n4-w2d2-01', 'n4-w2d2-02'],
    explanation: 'Kalimat D mengacaukan 〜てしまう (selesai/menyesal) dan 〜てある (keadaan hasil yang disiapkan). Kedua pola tidak bisa digabung 「〜てしまってある」. Pilih salah satu: 食べてしまった (terlanjur habis dimakan) atau もう食べてある (sudah dimakan/disiapkan).'
  },
  {
    id: 'q4-ef-n4-w2-04', level: 'n4', week: 2, type: 'error_find',
    choices: [
      '健康のために、毎日歩くようにしています。',
      '日本語が話せるようになりたい。',
      '環境のために、ごみを減らすためにする。',
      '早く寝るようにしてから、体調が良くなった。'
    ],
    answer: 2,
    correction: '環境のために、ごみを減らすようにしている。',
    grammarIds: ['n4-w2d4-03'],
    explanation: 'Kalimat C salah: 「〜ためにする」bukan pola yang ada dalam bahasa Jepang. 「〜ようにする」= berusaha untuk. 「ごみを減らすためにする」secara gramatikal tidak tepat. Yang benar: 「ごみを減らすようにしている」= berusaha mengurangi sampah demi lingkungan.'
  },
  {
    id: 'q4-ef-n4-w2-05', level: 'n4', week: 2, type: 'error_find',
    choices: [
      '「静かにしなさい」と先生が言った。',
      '先生は静かにするように言った。',
      '先生は静かにするように頼んだ。',
      '先生は静かにするようにと言った。'
    ],
    answer: 0,
    correction: '「静かにしなさい」と先生が言った。 — ini benar sebagai kutipan langsung.',
    grammarIds: ['n4-w2d6-02'],
    explanation: 'Sebenarnya semua kalimat gramatikal. Kalimat A adalah kutipan LANGSUNG (〜と言った), sedangkan B, C, D adalah kutipan tidak langsung (〜ように言った). Jika konteksnya meminta kutipan tidak langsung, maka A adalah yang "berbeda pola". Namun jika semua boleh, A paling langsung/literal.'
  },

  // ── MULTI CHOICE ─────────────────────────────────────────────
  {
    id: 'q4-mc-n4-w2-01', level: 'n4', week: 2, type: 'multi_choice',
    context: 'Dokter menyarankan pasien untuk tidak makan makanan berminyak. Dokter berkata kepada pasien. Pilih ekspresi yang paling tepat untuk saran dokter.',
    choices: [
      '油っこいものを食べないでください。',
      '油っこいものを食べたほうがいいです。',
      '油っこいものを食べないほうがいいですよ。',
      '油っこいものを食べなければなりません。'
    ],
    answer: 2,
    grammarIds: ['n4-w2d6-01'],
    explanation: 'V-ないほうがいい = lebih baik tidak melakukan (saran negatif). Paling tepat untuk saran dokter yang halus. Pilihan A: 〜ないでください = tolong jangan (perintah), C konteksnya saran. Pilihan D: 〜なければならない = harus (kewajiban, terlalu keras dari dokter).'
  },
  {
    id: 'q4-mc-n4-w2-02', level: 'n4', week: 2, type: 'multi_choice',
    context: 'Kamu membantu temanmu memindahkan barang ke apartemen baru. Kamu membawakan kardus berat untuknya. Kalimat mana yang paling tepat untuk menggambarkan situasi ini dari sudut pandangmu?',
    choices: [
      '友達に重い荷物を運んでもらった。',
      '友達の重い荷物を運んであげた。',
      '友達は重い荷物を運んでくれた。',
      '重い荷物を友達に運ばせた。'
    ],
    answer: 1,
    grammarIds: ['n4-w2d3-02'],
    explanation: 'Kamu (pembicara) yang membawa barang → kamu yang melakukan untuk teman → 〜てあげる. 友達の荷物を運んであげた = membawakan barang teman (kamu melakukan untuk teman). Pilihan A: kamu yang meminta teman membawa, C: teman yang membawa untuk kamu, D: menyuruh teman membawa.'
  },
  {
    id: 'q4-mc-n4-w2-03', level: 'n4', week: 2, type: 'multi_choice',
    context: 'Kamu ingin menyatakan bahwa "demi bisa berbicara bahasa Jepang dengan lancar, kamu mulai membiasakan diri berbicara dengan orang Jepang". Pilih yang paling tepat.',
    choices: [
      '日本語を上手に話せるために、日本人と話すようにしている。',
      '日本語を上手に話せるように、日本人と話すようにしている。',
      '日本語を上手に話せるため、日本人と話すためにしている。',
      '日本語を上手に話せるよう、日本人と話すことにした。'
    ],
    answer: 1,
    grammarIds: ['n4-w2d4-01', 'n4-w2d4-03'],
    explanation: '〜ように (tujuan perubahan/usaha) + 〜ようにしている (berusaha membiasakan). Pilihan A: ために dipakai dengan kamus-form/noun yang jelas volitional, 〜ために話せる kurang tepat. Pilihan D: ことにした = memutuskan (sudah diputuskan, bukan usaha berkelanjutan).'
  },
  {
    id: 'q4-mc-n4-w2-04', level: 'n4', week: 2, type: 'multi_choice',
    context: 'Kamu melihat pintu kantor tertutup padahal tadi kamu buka. Kamu ingin menggambarkan "pintu sudah (kembali) ditutup (oleh seseorang)". Pilih yang paling tepat.',
    choices: [
      'ドアが閉まっている。',
      'ドアを閉めておいた。',
      'ドアが閉めてある。',
      'ドアを閉めてしまった。'
    ],
    answer: 2,
    grammarIds: ['n4-w2d2-01'],
    explanation: 'V(他動詞)てある = kondisi yang ada karena seseorang telah melakukan sesuatu dengan tujuan/sengaja. 閉めてある = pintu sudah ditutup (oleh seseorang, secara sengaja). Pilihan A: 閉まっている (jidoushi) = pintu dalam keadaan tertutup (tanpa menekankan siapa yang menutup), D: 閉めてしまった = saya menutup (dan menyesal/selesai).'
  },
  {
    id: 'q4-mc-n4-w2-05', level: 'n4', week: 2, type: 'multi_choice',
    context: 'Kamu seorang guru dan ingin menyuruh murid dengan nada tegas tapi tidak kasar. Pilih ekspresi perintah yang paling tepat dalam konteks kelas.',
    choices: [
      'ノートを出せ。',
      'ノートを出してください。',
      'ノートを出しなさい。',
      'ノートを出したほうがいい。'
    ],
    answer: 2,
    grammarIds: ['n4-w2d6-03'],
    explanation: '〜なさい = perintah yang sopan namun tegas (guru ke murid, orang tua ke anak). Pilihan A: 〜せ (命令形) terlalu keras/kasar, B: 〜てください = permintaan sopan (setara), D: 〜たほうがいい = saran (terlalu lemah untuk instruksi kelas).'
  },

  // ╔══════════════════════════════════════════════════════════╗
  // ║  N4  WEEK 3 — 漢字を書くのは大変です                     ║
  // ╚══════════════════════════════════════════════════════════╝

  // ── CONJUGATION ─────────────────────────────────────────────
  {
    id: 'q4-cj-n4-w3-01', level: 'n4', week: 3, type: 'conjugation',
    instruction: 'Nominalisasikan klausa berikut menggunakan 〜の',
    base: '漢字を書く',
    choices: ['漢字を書くの', '漢字を書くこと', '漢字を書くため', '漢字を書くはず'],
    answer: 0,
    grammarId: 'n4-w3d1-02',
    explanation: '〜の (nominalisasi) mengubah klausa ke kata benda langsung. 漢字を書くの は大変です = Menulis kanji itu susah. 〜の dipakai ketika ingin menekankan tindakan secara konkret dan langsung dirasakan.'
  },
  {
    id: 'q4-cj-n4-w3-02', level: 'n4', week: 3, type: 'conjugation',
    instruction: 'Ubah kata kerja berikut ke bentuk potensial (可能形)',
    base: '泳ぐ',
    choices: ['泳げる', '泳がれる', '泳がせる', '泳げられる'],
    answer: 0,
    grammarId: 'n4-w3d2-01',
    explanation: '泳ぐ (godan-ぐ) → 泳げる (potensial). Godan: ganti u→e + る. 泳ぐ → 泳げ + る. Ichidan: ganti る → られる (misal: 食べる → 食べられる). Bukan 泳がれる (pasif).'
  },
  {
    id: 'q4-cj-n4-w3-03', level: 'n4', week: 3, type: 'conjugation',
    instruction: 'Ubah ke bentuk 〜かどうか (pertanyaan tak langsung: apakah ... atau tidak)',
    base: '彼が来る',
    choices: ['彼が来るかどうか', '彼が来るかどうかな', '彼が来るかどうかを', '彼が来るかどうかに'],
    answer: 0,
    grammarId: 'n4-w3d1-01',
    explanation: '〜かどうか = apakah ... atau tidak (embedded question). 彼が来るかどうか（分からない/知りたい etc）。Partikel setelahnya tergantung fungsi dalam kalimat, tapi 〜かどうか sendiri sudah lengkap sebagai nominal clause.'
  },
  {
    id: 'q4-cj-n4-w3-04', level: 'n4', week: 3, type: 'conjugation',
    instruction: 'Ubah adjektif berikut ke bentuk kata benda menggunakan 〜さ',
    base: '難しい',
    choices: ['難しさ', '難しみ', '難しく', '難しい'],
    answer: 0,
    grammarId: 'n4-w3d4-01',
    explanation: '難しい → 難しさ. 〜さ mengubah adjektif-い menjadi kata benda (derajat/tingkat). 難しさ = tingkat kesulitan. Berbeda dengan 深み (rasa/kondisi yang dirasakan secara subjektif).'
  },
  {
    id: 'q4-cj-n4-w3-05', level: 'n4', week: 3, type: 'conjugation',
    instruction: 'Pilih bentuk volitional (〜よう) yang tepat untuk situasi: mengajak teman pergi bersama secara kasual',
    base: '一緒に行く',
    choices: ['一緒に行こう', '一緒に行きます', '一緒に行きましょう', '一緒に行くべきだ'],
    answer: 0,
    grammarId: 'n4-w3d6-03',
    explanation: '〜よう (volitional kasual) = ayo / mari (kasual). 行く → 行こう. 〜ましょう adalah bentuk formal dari ajakan yang sama. Keduanya benar tapi 〜よう lebih kasual, 〜ましょう lebih sopan/formal.'
  },

  // ── TRANSLATION ──────────────────────────────────────────────
  {
    id: 'q4-tr-n4-w3-01', level: 'n4', week: 3, type: 'translation',
    direction: 'id_to_jp',
    prompt: '"Saya tidak tahu apakah dia akan datang atau tidak."',
    choices: [
      '彼が来るかどうか分かりません。',
      '彼が来るかどうかを知りたいです。',
      '彼が来るかどうかが分かります。',
      '彼が来るかどうかではありません。'
    ],
    answer: 0,
    grammarId: 'n4-w3d1-01',
    explanation: '〜かどうか分からない = tidak tahu apakah ~ atau tidak. が来るかどうか + 分かりません. Ini adalah indirect question (pertanyaan yang ditanamkan dalam kalimat).'
  },
  {
    id: 'q4-tr-n4-w3-02', level: 'n4', week: 3, type: 'translation',
    direction: 'jp_to_id',
    prompt: '「ピアノが弾けるようになりたいです。」',
    choices: [
      'Saya ingin bisa bermain piano.',
      'Saya berusaha untuk bisa bermain piano.',
      'Saya sudah bisa bermain piano.',
      'Saya ingin bermain piano.'
    ],
    answer: 0,
    grammarId: 'n4-w3d6-02',
    explanation: '〜ようになる = menjadi bisa / mengalami perubahan. 〜ようになりたい = ingin menjadi bisa. Berbeda dengan 〜たい (ingin melakukan langsung). 弾けるようになりたい = ingin sampai pada kondisi bisa bermain piano.'
  },
  {
    id: 'q4-tr-n4-w3-03', level: 'n4', week: 3, type: 'translation',
    direction: 'id_to_jp',
    prompt: '"Meski udara dingin, dia tetap pergi jogging."',
    choices: [
      '寒くても、彼はジョギングに行った。',
      '寒いので、彼はジョギングに行った。',
      '寒かったから、彼はジョギングに行った。',
      '寒いなら、彼はジョギングに行った。'
    ],
    answer: 0,
    grammarId: 'n4-w3d3-02',
    explanation: '〜ても = meskipun / bahkan jika (konsesi). 寒くても = meski dingin. Pilihan B: ので = karena (sebab-akibat, berlawanan nuansa), C: から = karena (juga kausal), D: なら = kalau memang (kondisi berbasis topik).'
  },
  {
    id: 'q4-tr-n4-w3-04', level: 'n4', week: 3, type: 'translation',
    direction: 'jp_to_id',
    prompt: '「友達に頼んで、引越しを手伝ってもらいました。」',
    choices: [
      'Saya minta tolong teman, dan dia membantu pindahan saya.',
      'Teman saya meminta saya untuk membantu pindahannya.',
      'Saya membantu teman pindahan karena dia meminta.',
      'Teman saya dengan baik hati membantu pindahan saya.'
    ],
    answer: 0,
    grammarId: 'n4-w2d3-02',
    explanation: '〜てもらう = menerima bantuan (pembicara sebagai penerima manfaat, melakukan permintaan). 友達に頼んで = setelah minta tolong ke teman. 手伝ってもらった = saya mendapatkan bantuan pindahan dari teman.'
  },
  {
    id: 'q4-tr-n4-w3-05', level: 'n4', week: 3, type: 'translation',
    direction: 'id_to_jp',
    prompt: '"Karena hari ini hujan, acara piknik dibatalkan."',
    choices: [
      '今日は雨なので、ピクニックは中止になった。',
      '今日は雨から、ピクニックは中止になった。',
      '今日は雨のに、ピクニックは中止になった。',
      '今日は雨だと、ピクニックは中止になった。'
    ],
    answer: 0,
    grammarId: 'n4-w3d3-01',
    explanation: '〜ので = karena (alasan sopan/objektif). Pilihan B: 〜から juga bisa tapi 〜ので lebih formal/sopan untuk pemberitahuan. C: 〜のに = padahal (kontras, berlawanan nuansa). D: 〜と = kalau/jika/ketika (kondisional otomatis).'
  },

  // ── ERROR FIND ───────────────────────────────────────────────
  {
    id: 'q4-ef-n4-w3-01', level: 'n4', week: 3, type: 'error_find',
    choices: [
      '漢字の書き方が難しさを感じます。',
      '彼が来るかどうか、まだ分かりません。',
      '早く泳げるようになりたい。',
      '試験に合格できたのは、先生のおかげです。'
    ],
    answer: 0,
    correction: '漢字の難しさを感じます。または 漢字を書くのが難しいと感じます。',
    grammarIds: ['n4-w3d4-01'],
    explanation: 'Kalimat A salah: 「難しさを感じます」benar, tapi 「漢字の書き方が難しさ」tidak gramatikal — 難しさ adalah kata benda, tidak bisa didahului が + kata benda lain seperti itu. Seharusnya: 「漢字の難しさを感じる」atau 「漢字を書くのが難しいと感じる」.'
  },
  {
    id: 'q4-ef-n4-w3-02', level: 'n4', week: 3, type: 'error_find',
    choices: [
      '疲れたので、早く帰りたいです。',
      '疲れたのに、まだ仕事を続けている。',
      '疲れてから、ゆっくり休みます。',
      '疲れたから、休むのをやめます。'
    ],
    answer: 3,
    correction: '疲れたから、少し休みます。',
    grammarIds: ['n4-w3d3-01'],
    explanation: 'Kalimat D kontradiksi logis: 「疲れたから休むのをやめる」= karena capek, berhenti istirahat. Ini berlawanan dengan logika umum (capek → istirahat, bukan berhenti istirahat). Walau gramatikalnya benar, kontennya tidak masuk akal dan bisa dikategorikan sebagai "penggunaan 〜から yang salah konteks".'
  },
  {
    id: 'q4-ef-n4-w3-03', level: 'n4', week: 3, type: 'error_find',
    choices: [
      '勉強すればするほど、賢くなる。',
      'それに、彼は頭もいいし、優しい。',
      'ところが、思ったより簡単だった。',
      'だから雨が降ったので、試合は中止になった。'
    ],
    answer: 3,
    correction: '雨が降ったので、試合は中止になった。 または だから試合は中止になった。',
    grammarIds: ['n4-w3d4-02'],
    explanation: 'Kalimat D menggunakan dua penanda sebab-akibat sekaligus: 「だから」(oleh karena itu) + 「ので」(karena) — tidak bisa digabung. Pilih salah satu: 「だから、試合は中止になった」atau 「雨が降ったので、試合は中止になった」.'
  },
  {
    id: 'q4-ef-n4-w3-04', level: 'n4', week: 3, type: 'error_find',
    choices: [
      '彼に何かお願いがあれば、遠慮なく言ってください。',
      '君がそう言うなら、信じるしかない。',
      '先生、もう少し詳しく説明してもらいませんか。',
      '友達のパーティーに来てくれませんか。'
    ],
    answer: 2,
    correction: '先生、もう少し詳しく説明していただけませんか。',
    grammarIds: ['n4-w3d5-01'],
    explanation: 'Kalimat C: 「先生に〜してもらいませんか」kurang sopan untuk meminta guru. 〜てもらう menggunakan sudut pandang pembicara yang meminta, dan untuk atasan/guru seharusnya menggunakan bentuk lebih hormat: 〜ていただけませんか atau 〜てくださいませんか.'
  },
  {
    id: 'q4-ef-n4-w3-05', level: 'n4', week: 3, type: 'error_find',
    choices: [
      '日本語が話せるか分かりません。',
      '彼女が来るかどうか、知っていますか。',
      'どこに財布を置いたか、覚えていない。',
      '何時に着くかどうか、教えてください。'
    ],
    answer: 3,
    correction: '何時に着くか、教えてください。',
    grammarIds: ['n4-w3d1-01'],
    explanation: 'Kalimat D salah: 「〜かどうか」dipakai untuk pertanyaan yes/no (apakah ... atau tidak). 「何時に着くか」sudah merupakan pertanyaan WH (jam berapa), jadi 「かどうか」tidak diperlukan/salah. Yang benar: 「何時に着くか教えてください」.'
  },

  // ── MULTI CHOICE ─────────────────────────────────────────────
  {
    id: 'q4-mc-n4-w3-01', level: 'n4', week: 3, type: 'multi_choice',
    context: 'Temanmu mengundangmu ke pesta ulang tahunnya. Kamu ingin bertanya dengan sopan apakah boleh membawa teman lain. Pilih yang paling tepat.',
    choices: [
      '他の友達を連れてきてもいいですか。',
      '他の友達を連れてきてはいけませんか。',
      '他の友達を連れてきてくれませんか。',
      '他の友達を連れてくるべきですか。'
    ],
    answer: 0,
    grammarIds: ['n4-w2d1-03'],
    explanation: '〜てもいいですか = bolehkah saya ~ (meminta izin). Paling tepat dan sopan untuk situasi ini. Pilihan B: 〜てはいけませんか = apakah tidak boleh? (mempertanyakan larangan, nuansa berbeda), C: 〜てくれませんか = bisakah kamu melakukan untuk saya (minta orang lain melakukan), D: 〜べき = seharusnya (terlalu formal).'
  },
  {
    id: 'q4-mc-n4-w3-02', level: 'n4', week: 3, type: 'multi_choice',
    context: 'Kamu ingin menggambarkan bahwa "masalah ini sulit untuk dijelaskan". Pilih ekspresi nominalisasi yang paling tepat.',
    choices: [
      'この問題は説明するのが難しい。',
      'この問題は説明することのが難しい。',
      'この問題の説明が難しさがある。',
      'この問題は説明かどうかが難しい。'
    ],
    answer: 0,
    grammarIds: ['n4-w3d1-02'],
    explanation: '〜のが = nominalisasi klausa sebagai subjek/objek. 説明するの + が + 難しい = melakukan penjelasan itu sulit. Pilihan B: ことのが tidak gramatikal, C: 難しさがある menambahkan さ yang tidak perlu dalam konteks ini, D: 〜かどうか tidak tepat di sini.'
  },
  {
    id: 'q4-mc-n4-w3-03', level: 'n4', week: 3, type: 'multi_choice',
    context: 'Kamu ingin menyatakan bahwa meski sudah belajar keras, nilai ujianmu tidak naik. Nuansa "kontras dengan harapan/usaha". Pilih yang paling tepat.',
    choices: [
      'たくさん勉強したので、成績が上がらなかった。',
      'たくさん勉強したから、成績が上がらなかった。',
      'たくさん勉強したのに、成績が上がらなかった。',
      'たくさん勉強したなら、成績が上がらなかった。'
    ],
    answer: 2,
    grammarIds: ['n4-w3d3-02'],
    explanation: '〜のに = padahal ~ (kekecewaan/kontras dengan harapan). Pilihan A dan B: ので/から = karena (kausal, akan terdengar seperti "karena belajar banyak, nilai tidak naik" yang tidak logis). Pilihan D: なら = kalau memang (konteks berbeda).'
  },
  {
    id: 'q4-mc-n4-w3-04', level: 'n4', week: 3, type: 'multi_choice',
    context: 'Kamu ingin mengungkapkan niat untuk pergi ke luar negeri tahun depan (belum pasti, tapi sedang dipikiran). Pilih yang paling tepat.',
    choices: [
      '来年、海外に行くことにした。',
      '来年、海外に行こうと思っている。',
      '来年、海外に行くつもりだ。',
      '来年、海外に行くべきだ。'
    ],
    answer: 1,
    grammarIds: ['n4-w3d6-01'],
    explanation: '〜ようと思っている = sedang berpikir untuk / berniat (masih dalam perencanaan, belum pasti). Pilihan A: ことにした = sudah diputuskan (lebih pasti), C: つもり = rencana yang lebih konkret dan mantap, D: べき = seharusnya (bukan niat). "Belum pasti tapi sedang dipikiran" → 〜ようと思っている.'
  },
  {
    id: 'q4-mc-n4-w3-05', level: 'n4', week: 3, type: 'multi_choice',
    context: 'Kamu ingin menyambungkan dua kalimat: "Udara di sini bersih" + "Makanannya pun enak". Pilih konjungsi yang paling tepat untuk menambahkan informasi positif.',
    choices: [
      'ここは空気がきれいだ。ところが、食べ物もおいしい。',
      'ここは空気がきれいだ。それに、食べ物もおいしい。',
      'ここは空気がきれいだ。それで、食べ物もおいしい。',
      'ここは空気がきれいだ。だから、食べ物もおいしい。'
    ],
    answer: 1,
    grammarIds: ['n4-w3d4-01'],
    explanation: 'それに = selain itu / bahkan lebih dari itu (menambahkan informasi positif/sejenis). Pilihan A: ところが = akan tetapi/namun (kontras), C: それで = oleh karena itu (kausal), D: だから = makanya (kausal). Untuk menambahkan poin positif → それに.'
  },

  // ╔══════════════════════════════════════════════════════════╗
  // ║  N4  WEEK 4 — 夏休みになったら、国に帰ります             ║
  // ╚══════════════════════════════════════════════════════════╝

  // ── CONJUGATION ─────────────────────────────────────────────
  {
    id: 'q4-cj-n4-w4-01', level: 'n4', week: 4, type: 'conjugation',
    instruction: 'Ubah kata kerja berikut ke bentuk kondisional 〜たら',
    base: '春になる',
    choices: ['春になったら', '春になれば', '春になるなら', '春になると'],
    answer: 0,
    grammarId: 'n4-w4d1-01',
    explanation: '〜たら = kalau / setelah (kondisi yang terjadi, lalu akibatnya). なる → なった + ら. 〜たら sering dipakai untuk kondisi satu arah yang ketika terpenuhi memicu akibat tertentu.'
  },
  {
    id: 'q4-cj-n4-w4-02', level: 'n4', week: 4, type: 'conjugation',
    instruction: 'Ubah kata kerja berikut ke bentuk kondisional 〜ば',
    base: '勉強する',
    choices: ['勉強すれば', '勉強したら', '勉強するなら', '勉強すると'],
    answer: 0,
    grammarId: 'n4-w4d1-02',
    explanation: '〜ば = kalau ~ maka (kondisi yang cukup). する → すれ + ば. Godan: ganti u→e + ば. Ichidan: V-stem + れば. する → すれば (tidak beraturan).'
  },
  {
    id: 'q4-cj-n4-w4-03', level: 'n4', week: 4, type: 'conjugation',
    instruction: 'Ubah ke bentuk pasif (受身形) — kata kerja tidak beraturan',
    base: 'する',
    choices: ['される', 'させる', 'できる', 'してもらう'],
    answer: 0,
    grammarId: 'n4-w4d4-01',
    explanation: 'する (irregular) → される (pasif). する → させる (kausatif). できる adalah kata kerja potensial tersendiri (bisa melakukan), bukan bentuk dari する.'
  },
  {
    id: 'q4-cj-n4-w4-04', level: 'n4', week: 4, type: 'conjugation',
    instruction: 'Pilih bentuk kausatif yang benar untuk kata kerja ichidan berikut',
    base: '食べる',
    choices: ['食べさせる', '食べらせる', '食べされる', '食べさせられる'],
    answer: 0,
    grammarId: 'n4-w4d4-02',
    explanation: '食べる (ichidan) → 食べさせる (kausatif). Rumus ichidan: V-stem + させる. 食べ + させる. Pilihan D adalah kausatif-pasif (食べさせられる = terpaksa makan), bukan kausatif saja.'
  },
  {
    id: 'q4-cj-n4-w4-05', level: 'n4', week: 4, type: 'conjugation',
    instruction: 'Ubah ke bentuk "〜すぎる" (terlalu/berlebihan)',
    base: '食べる',
    choices: ['食べすぎる', '食べすぎた', '食べすぎて', '食べすぎない'],
    answer: 0,
    grammarId: 'n4-w4d3-01',
    explanation: '〜すぎる = terlalu ~ / berlebihan. V-stem + すぎる. 食べ + すぎる = makan terlalu banyak. Bentuk dasar 〜すぎる (non-past).'
  },

  // ── TRANSLATION ──────────────────────────────────────────────
  {
    id: 'q4-tr-n4-w4-01', level: 'n4', week: 4, type: 'translation',
    direction: 'id_to_jp',
    prompt: '"Kalau sudah libur musim panas, saya akan pulang kampung."',
    choices: [
      '夏休みになったら、国に帰ります。',
      '夏休みになれば、国に帰ります。',
      '夏休みになるなら、国に帰ります。',
      '夏休みになると、国に帰ります。'
    ],
    answer: 0,
    grammarId: 'n4-w4d1-01',
    explanation: 'Semua bisa digunakan tapi 〜たら paling natural untuk situasi "setelah kondisi terpenuhi, saya akan melakukan". 〜たら sering dipakai untuk rencana pribadi setelah suatu titik waktu tercapai. (Catatan: jawaban B, C, D juga tidak sepenuhnya salah, tapi A paling idiomatis untuk konteks ini.)'
  },
  {
    id: 'q4-tr-n4-w4-02', level: 'n4', week: 4, type: 'translation',
    direction: 'jp_to_id',
    prompt: '「空が暗くなってきた。雨が降りそうだ。」',
    choices: [
      'Langit semakin gelap. Sepertinya akan hujan.',
      'Langit sudah gelap. Hujannya deras sekali.',
      'Langit semakin gelap. Dikatakan akan hujan.',
      'Langit mendadak gelap. Pasti akan hujan.'
    ],
    answer: 0,
    grammarId: 'n4-w4d2-02',
    explanation: '〜そうだ (penampilan) = kelihatan akan ~ (berdasarkan pengamatan visual langsung). 雨が降りそうだ = kelihatannya akan hujan. Pilihan C: 〜そうだ (kutipan) = dikatakan ~, tapi itu dipakai setelah klausa penuh, bukan V-stem. D: 〜はずだ = seharusnya (berdasarkan logika, bukan pengamatan).'
  },
  {
    id: 'q4-tr-n4-w4-03', level: 'n4', week: 4, type: 'translation',
    direction: 'id_to_jp',
    prompt: '"Tas ini terlalu berat untuk dibawa."',
    choices: [
      'このバッグは重すぎて、持てない。',
      'このバッグは重いすぎて、持てない。',
      'このバッグはとても重くて、持てない。',
      'このバッグは重くすぎて、持てない。'
    ],
    answer: 0,
    grammarId: 'n4-w4d3-01',
    explanation: '〜すぎる = terlalu ~. 重い (adjektif-い) → 重 + すぎる → 重すぎる. Pilihan B: 重いすぎる salah (adjektif-い + すぎる, bukan dengan い). D: 重くすぎる juga tidak tepat (重く adalah bentuk adverbial). Pilihan C: とても = sangat (bukan "terlalu").'
  },
  {
    id: 'q4-tr-n4-w4-04', level: 'n4', week: 4, type: 'translation',
    direction: 'jp_to_id',
    prompt: '「彼は毎日練習させられているから、とても上手だ。」',
    choices: [
      'Karena dia dipaksa berlatih setiap hari, dia sangat mahir.',
      'Karena dia berlatih setiap hari, dia sangat mahir.',
      'Karena dia menyuruh orang lain berlatih setiap hari, dia mahir.',
      'Karena dia membiarkan orang berlatih setiap hari, dia mahir.'
    ],
    answer: 0,
    grammarId: 'n4-w4d4-03',
    explanation: '〜させられる = kausatif-pasif (terpaksa melakukan oleh orang lain). 練習させられている = dipaksa berlatih (oleh pelatih/guru). Bukan "menyuruh" (〜させる) atau "membiarkan" (juga 〜させる dalam konteks berbeda).'
  },
  {
    id: 'q4-tr-n4-w4-05', level: 'n4', week: 4, type: 'translation',
    direction: 'id_to_jp',
    prompt: '"Kata kunci ini mudah dihafal."',
    choices: [
      'このキーワードは覚えやすい。',
      'このキーワードは覚えにくい。',
      'このキーワードは覚えすぎる。',
      'このキーワードは覚えられない。'
    ],
    answer: 0,
    grammarId: 'n4-w4d3-02',
    explanation: 'V-やすい = mudah untuk melakukan. 覚える → 覚え + やすい = mudah dihafal. Pilihan B: 覚えにくい = sulit dihafal, C: 〜すぎる = terlalu ~ (bukan mudah/sulit), D: 〜られない = tidak bisa (kemampuan).'
  },

  // ── ERROR FIND ───────────────────────────────────────────────
  {
    id: 'q4-ef-n4-w4-01', level: 'n4', week: 4, type: 'error_find',
    choices: [
      'もし時間があれば、遊びに来てください。',
      '春になったら、花見をしましょう。',
      '駅に着いたなら、電話してください。',
      '雨が降ると、試合は中止になる。'
    ],
    answer: 2,
    correction: '駅に着いたら、電話してください。',
    grammarIds: ['n4-w4d1-01', 'n4-w4d1-03'],
    explanation: 'Kalimat C: 「着いたなら」tidak natural. 〜なら dipakai untuk kondisi berbasis topik/asumsi ("kalau memang kamu sudah tiba..."), tapi untuk instruksi "setelah tiba, tolong telepon" lebih tepat 〜たら. 「着いたら」= setelah sampai, hubungi. 〜なら lebih cocok: 「もう着いたなら、電話してよ」(kalau memang sudah tiba, kok tidak telepon).'
  },
  {
    id: 'q4-ef-n4-w4-02', level: 'n4', week: 4, type: 'error_find',
    choices: [
      '彼女は疲れているようだ。',
      'このスープは冷たそうだ。',
      '彼は病気みたいだから、休んだほうがいい。',
      '明日は晴れるだろうと、天気予報は言った。'
    ],
    answer: 1,
    correction: 'このスープは冷たそうだ。 → 文ini sebenarnya benar secara grammar.',
    grammarIds: ['n4-w4d2-02'],
    explanation: 'Sebenarnya semua kalimat grammatikaly benar. Namun perhatikan: 「冷たそうだ」dari 冷たい (adjektif-い) → 冷た + そう (buang い + そう) = benar. 「冷たいそうだ」= "dikatakan dingin" (hearsay). Kalimat B gramatikalnya tepat sebagai "kelihatan dingin", tapi jika konteksnya adalah menguji pemahaman, seluruhnya valid. Ini pertanyaan tentang perbedaan そうだ (appearance vs hearsay).'
  },
  {
    id: 'q4-ef-n4-w4-03', level: 'n4', week: 4, type: 'error_find',
    choices: [
      '先生は生徒に本を読ませた。',
      '子供はお菓子を買わせた。',
      '部長は社員を残業させた。',
      '母は弟に部屋を掃除させた。'
    ],
    answer: 1,
    correction: '子供はお菓子を買ってもらった。または 子供はお菓子を買わせてもらった。',
    grammarIds: ['n4-w4d4-02'],
    explanation: 'Kalimat B tidak masuk akal: 「子供はお菓子を買わせた」= anak menyuruh (seseorang) membeli permen. Siapa yang disuruh? Kalimat ini kekurangan objek kausatif (N に). Biasanya anak yang disuruh membeli, bukan anak yang menyuruh. Lebih natural: 「お母さんは子供にお菓子を買わせた」atau「子供はお母さんにお菓子を買ってもらった」.'
  },
  {
    id: 'q4-ef-n4-w4-04', level: 'n4', week: 4, type: 'error_find',
    choices: [
      '窓が開いている。誰かが開けたんだろう。',
      '電気がついてある。消し忘れたんだ。',
      '冷蔵庫に食べ物が入れてある。',
      '花瓶に花が飾ってある。'
    ],
    answer: 1,
    correction: '電気がついている。消し忘れたんだ。',
    grammarIds: ['n4-w4d5-03'],
    explanation: 'Kalimat B: 「電気がついてある」tidak natural. 〜てある menggunakan kata kerja transitif (他動詞), tapi 「つく」(電気がつく) adalah intransitif (自動詞). Seharusnya: 「電気がついている」(jidoushi + ている = keadaan menyala). 〜てある: 「電気をつけてある」(dengan つける = transitif).'
  },
  {
    id: 'q4-ef-n4-w4-05', level: 'n4', week: 4, type: 'error_find',
    choices: [
      'このペンは書きやすくて気に入っています。',
      'この道は歩きにくいので、気をつけてください。',
      'この問題は分かりすぎて、すぐ解けた。',
      '彼の話し方は聞き取りにくい。'
    ],
    answer: 2,
    correction: 'この問題は分かりやすくて、すぐ解けた。',
    grammarIds: ['n4-w4d3-02', 'n4-w4d3-01'],
    explanation: 'Kalimat C tidak logis: 「分かりすぎる」= terlalu mudah dimengerti (berlebihan). Jika terlalu mudah, mungkin sedikit aneh tapi bisa digunakan untuk nuansa. Namun dalam konteks "langsung bisa diselesaikan", seharusnya 「分かりやすくて」(mudah dipahami) atau 「簡単すぎて」(terlalu mudah). 分かりすぎる + すぐ解けた tidak menyambung secara logis.'
  },

  // ── MULTI CHOICE ─────────────────────────────────────────────
  {
    id: 'q4-mc-n4-w4-01', level: 'n4', week: 4, type: 'multi_choice',
    context: 'Kamu ingin menyarankan teman: "Kalau kamu mau beli tiket konser itu, sebaiknya cepat sebelum habis." Pilih yang paling tepat.',
    choices: [
      'そのコンサートのチケットを買うなら、早くしたほうがいい。',
      'そのコンサートのチケットを買ったら、早くしたほうがいい。',
      'そのコンサートのチケットを買えば、早くしたほうがいい。',
      'そのコンサートのチケットを買うと、早くしたほうがいい。'
    ],
    answer: 0,
    grammarIds: ['n4-w4d1-03'],
    explanation: '〜なら = kalau soal ~ / kalau memang ~ (kondisi berbasis asumsi/topik). "Kalau kamu memang mau beli tiket itu..." → なら tepat karena mengasumsikan niat lawan bicara. 〜たら lebih untuk "setelah terjadi", 〜ば lebih logis/hipotetikal, 〜と otomatis.'
  },
  {
    id: 'q4-mc-n4-w4-02', level: 'n4', week: 4, type: 'multi_choice',
    context: 'Kamu melihat anak kecil yang terlihat mau menangis. Kamu ingin menggambarkan situasi itu. Pilih yang paling tepat.',
    choices: [
      'あの子は泣くようだ。',
      'あの子は泣きそうだ。',
      'あの子は泣くだろう。',
      'あの子は泣くはずだ。'
    ],
    answer: 1,
    grammarIds: ['n4-w4d2-02'],
    explanation: '〜そうだ (penampilan) = kelihatan akan ~ (berdasarkan pengamatan visual langsung). 泣きそうだ = kelihatan mau nangis (dari ekspresi wajahnya). Pilihan A: ようだ = tampaknya (berdasarkan bukti/informasi, lebih umum), C: だろう = mungkin (perkiraan umum), D: はずだ = seharusnya (berdasarkan logika/harapan).'
  },
  {
    id: 'q4-mc-n4-w4-03', level: 'n4', week: 4, type: 'multi_choice',
    context: 'Bos menyuruh karyawan baru untuk pergi ke seminar yang membosankan. Karyawan ingin mengungkapkan perasaan "terpaksa pergi ke seminar". Pilih yang paling tepat.',
    choices: [
      '上司にセミナーに行かせた。',
      '上司にセミナーに行かせられた。',
      '上司にセミナーに行かれた。',
      '上司にセミナーに行ってもらった。'
    ],
    answer: 1,
    grammarIds: ['n4-w4d4-03'],
    explanation: '〜させられる = kausatif-pasif = terpaksa melakukan (oleh orang lain, tidak mau tapi harus). 上司に行かせられた = dipaksa bos untuk pergi. Pilihan A: 上司に〜させた = bos menyuruh (dari sudut pandang bos), C: 上司に行かれた = bos pergi (dan saya terdampak), D: 〜てもらった = minta tolong (tidak ada nuansa terpaksa).'
  },
  {
    id: 'q4-mc-n4-w4-04', level: 'n4', week: 4, type: 'multi_choice',
    context: 'Kamu ingin menjelaskan bahwa "kelas olahraga ini bagus untuk pemula karena gerakannya mudah diikuti". Pilih ekspresi yang paling tepat.',
    choices: [
      'この体操クラスは動きが真似しすぎて、初心者にいい。',
      'この体操クラスは動きが真似しにくくて、初心者にいい。',
      'この体操クラスは動きが真似しやすくて、初心者にいい。',
      'この体操クラスは動きが真似できなくて、初心者にいい。'
    ],
    answer: 2,
    grammarIds: ['n4-w4d3-02'],
    explanation: 'V-やすい = mudah untuk dilakukan. 真似しやすい = mudah ditiru/diikuti. Pilihan A: 真似しすぎる = terlalu banyak meniru (berlebihan), B: 真似しにくい = sulit ditiru (berlawanan), D: 真似できない = tidak bisa ditiru (berlawanan).'
  },
  {
    id: 'q4-mc-n4-w4-05', level: 'n4', week: 4, type: 'multi_choice',
    context: 'Kamu pulang ke rumah dan melihat meja makan sudah ada makanannya, tersaji rapi. Kamu ingin menggambarkan "makanan sudah disiapkan di meja (oleh ibu)". Pilih yang paling tepat.',
    choices: [
      'テーブルに食べ物が置いている。',
      'テーブルに食べ物が置いてある。',
      'テーブルに食べ物が置かれている。',
      'テーブルに食べ物が置いてしまった。'
    ],
    answer: 1,
    grammarIds: ['n4-w4d5-03'],
    explanation: 'V(他動詞)てある = kondisi yang ada karena seseorang telah melakukan dengan tujuan/sengaja. 置いてある = sudah disiapkan/diletakkan (sengaja oleh seseorang). Pilihan C: 置かれている = diletakkan (pasif, lebih formal/objektif, tanpa menekankan "sengaja disiapkan"), B lebih natural untuk konteks ini. A: 置いている salah (transitif + ている tidak untuk keadaan statis).'
  }



  // ══════════════════════════════════════════════════════════════
  // N3 W3 — CONJUGATION (bs4-n3-w3-conj-01 ~ 05)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'bs4-n3-w3-conj-01', level: 'n3', week: 3, type: 'conjugation',
    instruction: 'Ubah ke bentuk 〜ずに (tanpa melakukan)',
    base: '使う',
    choices: ['使わずに', '使いずに', '使えずに', '使わないずに'],
    answer: 0,
    grammarId: 'n3-w3d1-03',
    explanation: '使う (godan-う) → 使わ + ずに. Rumus: Vない幹＋ずに. 使わない → 使わずに. Perhatian khusus: しない → せずに (bukan しずに).'
  },
  {
    id: 'bs4-n3-w3-conj-02', level: 'n3', week: 3, type: 'conjugation',
    instruction: 'Pilih bentuk 〜てほしい yang tepat untuk kalimat: "Saya ingin kamu datang ke sini"',
    base: '来る',
    choices: ['来てほしい', '来ほしい', '来てもらいたい', '来てほしかった'],
    answer: 0,
    grammarId: 'n3-w3d6-02',
    explanation: '来る (くる) → 来て＋ほしい. Pola: Vて＋ほしい. Jawaban C (来てもらいたい) juga benar secara makna tapi lebih formal — pilihan A lebih langsung untuk pola ほしい.'
  },
  {
    id: 'bs4-n3-w3-conj-03', level: 'n3', week: 3, type: 'conjugation',
    instruction: 'Ubah ke bentuk 〜べきではない (seharusnya tidak)',
    base: '嘘をつく',
    choices: ['嘘をつくべきではない', '嘘をつかべきではない', '嘘をつかないべきではない', '嘘をつくはずではない'],
    answer: 0,
    grammarId: 'n3-w3d3-03',
    explanation: '〜べきではない = seharusnya tidak. Rumus: Vる＋べきではない. 嘘をつく → 嘘をつくべきではない. Negatif dari べきだ tidak mengubah bentuk dasar verba.'
  },
  {
    id: 'bs4-n3-w3-conj-04', level: 'n3', week: 3, type: 'conjugation',
    instruction: 'Ubah ke bentuk 〜ものだ untuk mengungkapkan kenangan masa lalu',
    base: '泳ぐ (bentuk lampau, dulu sering berenang)',
    choices: ['泳いだものだ', '泳ぐものだ', '泳いだことだ', '泳いだはずだ'],
    answer: 0,
    grammarId: 'n3-w3d3-04',
    explanation: '〜ものだ untuk kenangan: Vた＋ものだ. 泳ぐ → 泳いだ (bentuk た) ＋ ものだ. NG: Vるものだ tidak bisa untuk kenangan — harus bentuk た.'
  },
  {
    id: 'bs4-n3-w3-conj-05', level: 'n3', week: 3, type: 'conjugation',
    instruction: 'Pilih bentuk 〜がる yang tepat untuk: "Tanaka-san tampak takut"',
    base: '怖い',
    choices: ['田中さんは怖がっている', '田中さんは怖がる', '田中さんは怖いがっている', '田中さんは怖くがっている'],
    answer: 0,
    grammarId: 'n3-w3d6-01',
    explanation: '怖い → 怖 (i-adj幹) ＋ がる → 怖がる. Bentuk progressive: 怖がっている. 〜がっている menggambarkan kondisi perasaan orang lain yang sedang berlangsung. Tidak dipakai untuk diri sendiri.'
  },

  // ══════════════════════════════════════════════════════════════
  // N3 W3 — TRANSLATION (bs4-n3-w3-trans-01 ~ 05)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'bs4-n3-w3-trans-01', level: 'n3', week: 3, type: 'translation',
    direction: 'id_to_jp',
    prompt: '"Sekalipun saya belajar keras, nilai saya tidak naik juga."',
    choices: [
      'どんなに一生懸命勉強しても、成績が上がらない。',
      'どんなに一生懸命勉強すれば、成績が上がらない。',
      'いくら一生懸命勉強したから、成績が上がらない。',
      'たとえ一生懸命勉強したら、成績が上がらない。'
    ],
    answer: 0,
    grammarId: 'n3-w3d1-02',
    explanation: 'どんなに〜ても = sekeras apapun / seberapa pun. Diikuti pola ても (konsesi). Pilihan B: 〜すれば menyatakan kondisi hipotesis (jika), bukan konsesi. Pilihan C: 〜から menyatakan sebab. Pilihan D: 〜たら menyatakan kondisi umum.'
  },
  {
    id: 'bs4-n3-w3-trans-02', level: 'n3', week: 3, type: 'translation',
    direction: 'id_to_jp',
    prompt: '"Dia berpura-pura tidak mendengar."',
    choices: [
      '彼は聞こえないふりをしている。',
      '彼は聞こえないようにしている。',
      '彼は聞こえなかったつもりだ。',
      '彼は聞こえないはずだ。'
    ],
    answer: 0,
    grammarId: 'n3-w3d6-03',
    explanation: '〜ふりをする = berpura-pura. 聞こえない (tidak terdengar) ＋ ふりをしている = berpura-pura tidak dengar. Pilihan B: 〜ようにする = berusaha agar, Pilihan C: 〜つもりだ = bermaksud/berniat, Pilihan D: 〜はずだ = seharusnya.'
  },
  {
    id: 'bs4-n3-w3-trans-03', level: 'n3', week: 3, type: 'translation',
    direction: 'id_to_jp',
    prompt: '"Sekalian ke supermarket, saya beli sabun juga."',
    choices: [
      'スーパーへ行ったついでに、石鹸も買ってきた。',
      'スーパーへ行くたびに、石鹸も買ってきた。',
      'スーパーへ行くとたん、石鹸も買ってきた。',
      'スーパーへ行きながら、石鹸も買ってきた。'
    ],
    answer: 0,
    grammarId: 'n3-w3d4-01',
    explanation: '〜ついでに = sekalian. Nの/Vる/Vた＋ついでに. 行ったついでに = sekalian sudah pergi. Pilihan B: 〜たびに = setiap kali (berulang). Pilihan C: 〜とたん = begitu... langsung. Pilihan D: 〜ながら = sambil.'
  },
  {
    id: 'bs4-n3-w3-trans-04', level: 'n3', week: 3, type: 'translation',
    direction: 'id_to_jp',
    prompt: '"Tepat saat rapat sedang berlangsung, listrik mati."',
    choices: [
      '会議をしている最中に、電気が消えた。',
      '会議をしている間に、電気が消えた。',
      '会議をしたとたん、電気が消えた。',
      '会議をしているうちに、電気が消えた。'
    ],
    answer: 0,
    grammarId: 'n3-w3d4-04',
    explanation: '〜最中に = tepat di tengah-tengah sedang. Vている＋最中に menekankan gangguan di puncak kegiatan. Pilihan B: 〜間に = selama/sementara (lebih netral). Pilihan C: 〜とたん = begitu X, Y langsung (X harus bentuk た). Pilihan D: 〜うちに = selagi.'
  },
  {
    id: 'bs4-n3-w3-trans-05', level: 'n3', week: 3, type: 'translation',
    direction: 'id_to_jp',
    prompt: '"Saya ingin kamu menjelaskan tentang itu."',
    choices: [
      'そのことについて説明してほしいんですが。',
      'そのことについて説明してあげたいんですが。',
      'そのことについて説明してもらいたいかな。',
      'そのことについて説明したいんですが。'
    ],
    answer: 0,
    grammarId: 'n3-w3d6-02',
    explanation: '〜てほしい = ingin orang lain melakukan. 説明してほしい = ingin (kamu) menjelaskan. Pilihan B: 〜てあげたい = ingin melakukan untuk orang lain (subjek terbalik). Pilihan D: 〜したい = ingin melakukan sendiri.'
  },

  // ══════════════════════════════════════════════════════════════
  // N3 W3 — ERROR FIND (bs4-n3-w3-errf-01 ~ 05)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'bs4-n3-w3-errf-01', level: 'n3', week: 3, type: 'error_find',
    choices: [
      '窓を開けっぱなしで寝てしまった。',
      '説明書のとおりに操作したが、動かなかった。',
      '彼女は外国人にしては、日本語が本当に上手だ。',
      '仕事をするずに、一日中テレビを見ていた。'
    ],
    answer: 3,
    correction: '仕事をせずに、一日中テレビを見ていた。',
    grammarIds: ['n3-w3d1-03'],
    explanation: 'Kalimat D salah: 「するずに」tidak ada. 〜ずに menggunakan Vない幹＋ずに. する → しない → せずに (bentuk khusus). Jadi: 仕事をせずに = tanpa bekerja. NG: するずに / しずに.'
  },
  {
    id: 'bs4-n3-w3-errf-02', level: 'n3', week: 3, type: 'error_find',
    choices: [
      'プロにしては、この仕事はちょっと雑すぎる。',
      '電話した途端、彼はすぐに出てくれた。',
      '昨日は友達に会いにいくつもりだったが、急に雨が降って行けなかった。',
      '子供のころ、毎日この公園で遊んだことだ。'
    ],
    answer: 3,
    correction: '子供のころ、毎日この公園で遊んだものだ。',
    grammarIds: ['n3-w3d3-04'],
    explanation: 'Kalimat D salah: 「〜遊んだことだ」→ 〜ことだ = saran/nasihat (「早く寝ることだ」). Untuk kenangan masa lalu, gunakan 〜ものだ: 遊んだものだ = dulu sering bermain. ことだ dan ものだ tidak bisa saling menggantikan di sini.'
  },
  {
    id: 'bs4-n3-w3-errf-03', level: 'n3', week: 3, type: 'error_find',
    choices: [
      'どんなに忙しくても、食事は必ず取るべきだ。',
      '彼は会議の最中に居眠りをしていた。',
      '傘を持たないずに出かけたら、大雨に降られた。',
      '毎朝ジョギングするたびに、体が少しずつ軽くなってきた。'
    ],
    answer: 2,
    correction: '傘を持たずに出かけたら、大雨に降られた。',
    grammarIds: ['n3-w3d1-03'],
    explanation: 'Kalimat C salah: 「持たないずに」は間違い。〜ずに の形は Vない幹＋ずに = 持た＋ずに = 持たずに。「ない」は入れない。正しくは「傘を持たずに」。'
  },
  {
    id: 'bs4-n3-w3-errf-04', level: 'n3', week: 3, type: 'error_find',
    choices: [
      'テレビをつけっぱなしで寝ると、電気代がもったいない。',
      '彼女にとって、仕事と家庭を両立するのは大変なことだろう。',
      '約束は守るべきで、それが社会のルールだ。',
      '田中さんは英語を話せるふりをするが、実際は全然できない。'
    ],
    answer: 1,
    correction: '彼女にしては / 彼女にとっては (文脈による)',
    grammarIds: ['n3-w3d2-02'],
    explanation: 'Kalimat B perlu diperhatikan: 「にとって」= bagi/dari sudut pandang. Kalimat ini sebenarnya gramatikal jika maknanya "Bagi dia, memang sulit." Namun jika konteks adalah "mengejutkan bahwa dia sulit", gunakan 〜にしては. にとって dan にしては berbeda nuansa — にとって netral, にしては mengandung unsur kejutan.'
  },
  {
    id: 'bs4-n3-w3-errf-05', level: 'n3', week: 3, type: 'error_find',
    choices: [
      '財布を家に忘れてきたとたん、慌てて戻った。',
      '彼女は寂しがっているようだから、電話してあげよう。',
      '外出するついでに、郵便物を出してきてくれない？',
      '山田さんはいつも知っているくせに、教えてくれない。'
    ],
    answer: 0,
    correction: '財布を家に忘れてきたと気づいたとたん、慌てて戻った。',
    grammarIds: ['n3-w3d4-03'],
    explanation: 'Kalimat A bermasalah: 〜とたん menyatakan "begitu melakukan X, langsung terjadi Y". 「財布を忘れたとたん」tidak logis karena orang biasanya tidak sadar saat melupakan sesuatu. Lebih tepat: 「忘れたと気づいたとたん」= begitu sadar sudah lupa, langsung...'
  },

  // ══════════════════════════════════════════════════════════════
  // N3 W3 — MULTI CHOICE (bs4-n3-w3-mc-01 ~ 05)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'bs4-n3-w3-mc-01', level: 'n3', week: 3, type: 'multi_choice',
    context: 'Kamu melihat teman lama sedang makan dan ingin berbicara dengannya. Kamu ingin mengatakan "Maaf mengganggu di tengah-tengah makan, tapi..." Pilih ekspresi yang paling tepat.',
    choices: [
      '食事の途中に、少しよろしいですか。',
      '食事の最中にすみませんが、少しよろしいですか。',
      '食事のついでに、少しよろしいですか。',
      '食事したとたんに、少しよろしいですか。'
    ],
    answer: 1,
    grammarIds: ['n3-w3d4-04'],
    explanation: '〜最中に = tepat di tengah-tengah sedang. 「食事の最中に」= di tengah-tengah makan. Diikuti 「すみませんが」= maaf mengganggu. Pilihan A: 途中に lebih netral (di tengah perjalanan/proses). Pilihan C: ついでに = sekalian (tidak tepat untuk situasi ini). Pilihan D: とたん = begitu... langsung (tidak relevan).'
  },
  {
    id: 'bs4-n3-w3-mc-02', level: 'n3', week: 3, type: 'multi_choice',
    context: 'Kamu ingin mengungkapkan bahwa "Tadinya berencana pergi ke gym tadi malam, tapi akhirnya tidak jadi karena lelah." Pilih yang paling tepat.',
    choices: [
      '昨夜、ジムに行くはずだったが、疲れていたので行けなかった。',
      '昨夜、ジムに行くつもりだったが、疲れていたので行けなかった。',
      '昨夜、ジムに行くべきだったが、疲れていたので行けなかった。',
      '昨夜、ジムに行くものだったが、疲れていたので行けなかった。'
    ],
    answer: 1,
    grammarIds: ['n3-w3d3-01'],
    explanation: '〜つもりだった = tadinya berniat (rencana yang tidak terwujud). 〜はずだった = seharusnya terjadi (berdasarkan ekspektasi/rencana orang lain juga). 〜べきだった = seharusnya (kewajiban moral — nuansa menyesal). 〜ものだった = tidak dipakai untuk niat. Konteks "rencana pribadi yang batal" → つもりだった.'
  },
  {
    id: 'bs4-n3-w3-mc-03', level: 'n3', week: 3, type: 'multi_choice',
    context: 'Atasan mengatakan kepada karyawan: "Tanaka-san adalah orang yang bertanggung jawab, jadi _____ absen tanpa pemberitahuan." Pilih yang paling tepat.',
    choices: [
      'まじめな田中さんが無断欠勤するはずがない。',
      'まじめな田中さんが無断欠勤するべきだ。',
      'まじめな田中さんが無断欠勤するふりをしない。',
      'まじめな田中さんが無断欠勤するものだ。'
    ],
    answer: 0,
    grammarIds: ['n3-w3d3-02'],
    explanation: '〜はずがない = tidak mungkin (penolakan kuat berdasarkan pengetahuan tentang orang tersebut). Sangat cocok karena "serius" → "tidak mungkin absen tanpa kabar". Pilihan B: べきだ = seharusnya (kewajiban). Pilihan C: ふりをしない = tidak berpura-pura. Pilihan D: ものだ = kenangan/nasihat.'
  },
  {
    id: 'bs4-n3-w3-mc-04', level: 'n3', week: 3, type: 'multi_choice',
    context: 'Kamu melihat kolega yang selalu berusaha keras. Kamu ingin memberikan pujian: "Untuk orang yang baru mulai kerja, kamu sudah melakukannya dengan sangat baik." Pilih yang paling tepat.',
    choices: [
      '入社したばかりにしては、とてもよくできています。',
      '入社したばかりにとって、とてもよくできています。',
      '入社したばかりとして、とてもよくできています。',
      '入社したばかりなので、とてもよくできています。'
    ],
    answer: 0,
    grammarIds: ['n3-w3d2-02'],
    explanation: '〜にしては = untuk... yang / mengingat bahwa (hasil di luar dugaan). 「入社したばかりにしては」= untuk yang baru masuk kerja. Pilihan B: にとって = bagi (sudut pandang). Pilihan C: として = sebagai (peran). Pilihan D: なので = karena (sebab-akibat, bukan perbandingan).'
  },
  {
    id: 'bs4-n3-w3-mc-05', level: 'n3', week: 3, type: 'multi_choice',
    context: 'Kamu ingin mengungkapkan kepada teman: "Saya ingin kamu lebih jujur denganku." Mana yang paling natural?',
    choices: [
      'もっと正直でいてほしい。',
      'もっと正直でほしい。',
      'もっと正直にしてほしい。',
      'もっと正直をしてほしい。'
    ],
    answer: 2,
    grammarIds: ['n3-w3d6-02'],
    explanation: '〜てほしい = ingin orang lain melakukan. 正直にする = bersikap jujur (naにする = mengubah ke kondisi). 正直にしてほしい = ingin kamu bersikap jujur. Pilihan A: 正直でいてほしい juga acceptable tapi kurang natural. Pilihan B: 正直でほしい — tidak ada bentuk naでほしい. Pilihan D: 正直をする tidak gramatikal.'
  },

  // ══════════════════════════════════════════════════════════════
  // N3 W4 — CONJUGATION (bs4-n3-w4-conj-01 ~ 05)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'bs4-n3-w4-conj-01', level: 'n3', week: 4, type: 'conjugation',
    instruction: 'Pilih bentuk 〜ば〜ほど yang tepat untuk: "Semakin banyak makan, semakin gemuk"',
    base: '食べる → 太る',
    choices: [
      '食べれば食べるほど太る。',
      '食べば食べるほど太る。',
      '食べれば食べほど太る。',
      '食べれば食べるからほど太る。'
    ],
    answer: 0,
    grammarIds: ['n3-w4d3-03'],
    explanation: '〜ば〜ほど: ichidan 食べる → 食べれば＋食べるほど. Pola: Vば Vるほど. Verba yang sama diulang. 食べれば (kondisional ば) ＋ 食べるほど (plain) ＋ 結果.'
  },
  {
    id: 'bs4-n3-w4-conj-02', level: 'n3', week: 4, type: 'conjugation',
    instruction: 'Ubah ke bentuk 〜しかない (tidak ada pilihan lain)',
    base: 'やってみる',
    choices: ['やってみるしかない', 'やってみるしかある', 'やってみるほかない', 'やってみるだけない'],
    answer: 0,
    grammarIds: ['n3-w4d5-02'],
    explanation: 'Vる＋しかない = tidak ada pilihan selain. やってみる＋しかない = tidak ada pilihan selain mencoba. Pilihan C: 〜ほかない juga benar artinya, tapi yang ditanyakan adalah 〜しかない.'
  },
  {
    id: 'bs4-n3-w4-conj-03', level: 'n3', week: 4, type: 'conjugation',
    instruction: 'Pilih bentuk ほど〜ない yang tepat: "Tidak ada yang secantik dia" (untuk orang)',
    base: '彼女 / きれいな人',
    choices: [
      '彼女くらいきれいな人はいない。',
      '彼女ほどきれいな人はいない。',
      '彼女だけきれいな人はいない。',
      '彼女ぐらいきれいな人もいない。'
    ],
    answer: 0,
    grammarIds: ['n3-w4d3-04'],
    explanation: '〜くらい〜はいない = untuk orang (tidak ada yang se...). 〜ほど〜はない = untuk hal/benda. 彼女くらいきれいな人はいない. Pilihan B (〜ほど) lebih untuk benda: 「今年ほど雪の多い年はなかった」. Meski keduanya sering bisa saling gantikan, くらい lebih natural untuk orang.'
  },
  {
    id: 'bs4-n3-w4-conj-04', level: 'n3', week: 4, type: 'conjugation',
    instruction: 'Ubah ke bentuk 〜わりに: "Anak itu berbicara dengan baik untuk usianya"',
    base: '年齢 / 話す',
    choices: [
      'その子は年齢のわりによく話せる。',
      'その子は年齢にしたがってよく話せる。',
      'その子は年齢だけによく話せる。',
      'その子は年齢わりによく話せる。'
    ],
    answer: 0,
    grammarIds: ['n3-w4d1-02'],
    explanation: '〜わりに = untuk... / tidak sesuai ekspektasi. Nの＋わりに. 年齢のわりに = untuk usianya. Pilihan D: 年齢わりに — harus ada の antara N dan わりに. Pilihan B: 〜にしたがって = mengikuti / sesuai dengan.'
  },
  {
    id: 'bs4-n3-w4-conj-05', level: 'n3', week: 4, type: 'conjugation',
    instruction: 'Pilih bentuk 〜ということだ (menyampaikan informasi/hearsay) yang tepat',
    base: '来週、試験がある (hearsay dari orang lain)',
    choices: [
      '来週、試験があるということです。',
      '来週、試験があるというはずです。',
      '来週、試験があるというべきです。',
      '来週、試験があるということがします。'
    ],
    answer: 0,
    grammarIds: ['n3-w4d4-02'],
    explanation: '〜ということだ/です = katanya... (hearsay). V普通形＋ということです. Menyampaikan informasi dari sumber lain. Pilihan B: 〜はずです = seharusnya (ekspektasi, bukan hearsay). Pilihan C: 〜べきです = seharusnya (kewajiban).'
  },

  // ══════════════════════════════════════════════════════════════
  // N3 W4 — TRANSLATION (bs4-n3-w4-trans-01 ~ 05)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'bs4-n3-w4-trans-01', level: 'n3', week: 4, type: 'translation',
    direction: 'id_to_jp',
    prompt: '"Bagi saya, belajar bahasa Jepang adalah hal yang sangat menyenangkan."',
    choices: [
      '私にとって、日本語の勉強はとても楽しいことだ。',
      '私として、日本語の勉強はとても楽しいことだ。',
      '私にしては、日本語の勉強はとても楽しいことだ。',
      '私によって、日本語の勉強はとても楽しいことだ。'
    ],
    answer: 0,
    grammarIds: ['n3-w4d1-01'],
    explanation: '〜にとって = bagi / dari sudut pandang. 私にとって = bagi saya. Pilihan B: として = sebagai (peran/kapasitas). Pilihan C: にしては = untuk... yang (mengejutkan, tidak cocok untuk pernyataan netral). Pilihan D: によって = oleh / tergantung (agen/variasi).'
  },
  {
    id: 'bs4-n3-w4-trans-02', level: 'n3', week: 4, type: 'translation',
    direction: 'id_to_jp',
    prompt: '"Saya terlambat gara-gara macet."',
    choices: [
      '渋滞のせいで、遅刻してしまった。',
      '渋滞のおかげで、遅刻してしまった。',
      '渋滞のために、遅刻してしまった。',
      '渋滞のかわりに、遅刻してしまった。'
    ],
    answer: 0,
    grammarIds: ['n3-w4d2-02'],
    explanation: '〜せいで = gara-gara (hasil negatif). 渋滞のせいで = gara-gara macet. Pilihan B: 〜おかげで = berkat (hasil positif — tidak cocok untuk hal negatif seperti terlambat). Pilihan C: 〜ために = untuk/karena (netral, bisa, tapi せいで lebih tepat untuk menyalahkan). Pilihan D: かわりに = sebagai gantinya.'
  },
  {
    id: 'bs4-n3-w4-trans-03', level: 'n3', week: 4, type: 'translation',
    direction: 'id_to_jp',
    prompt: '"Makin dipikirkan, makin bingung."',
    choices: [
      '考えれば考えるほど、わからなくなる。',
      '考えるほど考えれば、わからなくなる。',
      'どんなに考えても、わからなくなる。',
      '考えるだけ考えれば、わからなくなる。'
    ],
    answer: 0,
    grammarIds: ['n3-w4d3-03'],
    explanation: '〜ば〜ほど = semakin... semakin. 考えれば考えるほど = makin dipikirkan, makin. Pilihan B: urutan terbalik — tidak gramatikal. Pilihan C: どんなに〜ても = meski sebesar apapun. Pilihan D: 〜だけ〜ば bukan pola yang ada.'
  },
  {
    id: 'bs4-n3-w4-trans-04', level: 'n3', week: 4, type: 'translation',
    direction: 'id_to_jp',
    prompt: '"Kata-kata itu memang benar, tapi saya tidak bisa mengatakannya." (mengakui tapi ada pengecualian)',
    choices: [
      'その言葉は正しいことは正しいが、言えません。',
      'その言葉は正しいけれど、言えません。',
      'その言葉は正しいはずだが、言えません。',
      'その言葉は正しいくせに、言えません。'
    ],
    answer: 0,
    grammarIds: ['n3-w4d3-04'],
    explanation: '〜ことは〜が = memang... tapi. 正しいことは正しいが = memang benar tapi. Pola ini mengulang kata sifat untuk menegaskan pengakuan sebelum memberi batasan. Pilihan B juga benar tapi tidak menggunakan pola 〜ことは〜が. Pilihan C: はずだ = seharusnya. Pilihan D: くせに = padahal (negatif/kesal).'
  },
  {
    id: 'bs4-n3-w4-trans-05', level: 'n3', week: 4, type: 'translation',
    direction: 'id_to_jp',
    prompt: '"Karena hari ini tidak ada pekerjaan, tidak ada pilihan lain selain istirahat."',
    choices: [
      '今日は仕事がないから、休むしかない。',
      '今日は仕事がないから、休むばかりだ。',
      '今日は仕事がないから、休むべきだ。',
      '今日は仕事がないから、休んでもかまわない。'
    ],
    answer: 0,
    grammarIds: ['n3-w4d5-02'],
    explanation: '〜しかない = tidak ada pilihan lain selain. 休むしかない = terpaksa harus istirahat. Pilihan B: ばかりだ = makin lama makin (tren). Pilihan C: べきだ = seharusnya (kewajiban moral). Pilihan D: 〜てもかまわない = tidak apa-apa jika (izin, bukan keterpaksaan).'
  },

  // ══════════════════════════════════════════════════════════════
  // N3 W4 — ERROR FIND (bs4-n3-w4-errf-01 ~ 05)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'bs4-n3-w4-errf-01', level: 'n3', week: 4, type: 'error_find',
    choices: [
      '彼女のおかげで、プロジェクトが成功した。',
      'そのレストランは値段のわりに、味がいまいちだ。',
      '電車が遅れたせいか、少し心配になってきた。',
      '弟はゲームをするくせに、うまくないのに毎日やっている。'
    ],
    answer: 3,
    correction: '弟はゲームが下手なくせに、毎日やっている。',
    grammarIds: ['n3-w4d1-03'],
    explanation: 'Kalimat D bermasalah strukturnya: 「〜をするくせに、うまくないのに」双重否定が混乱している. 〜くせに = padahal (kritik). Harusnya langsung: 「下手なくせに毎日ゲームをしている」= padahal tidak pandai tapi main terus.'
  },
  {
    id: 'bs4-n3-w4-errf-02', level: 'n3', week: 4, type: 'error_find',
    choices: [
      '彼は日本語を習い始めたばかりのわりに、とても流暢だ。',
      'なぜならば、昨日は熱があったからです。',
      '田中さんにかわって、私がご説明します。',
      '合格したらどんなに嬉しいことだ！'
    ],
    answer: 3,
    correction: '合格したらどんなに嬉しいことか！',
    grammarIds: ['n3-w4d4-04'],
    explanation: '〜ことか = betapa... (ekspresi emosi kuat). Pola: どんなに〜ことか. Kalimat D salah: 「ことだ」bukan untuk ekspresi emosi — ことだ = saran/nasihat. Yang benar: 「どんなに嬉しいことか！」Nuansa: betapa bahagianya (jika lulus).'
  },
  {
    id: 'bs4-n3-w4-errf-03', level: 'n3', week: 4, type: 'error_find',
    choices: [
      '彼は知っているはずなのに、知らないふりをしている。',
      '急いで帰るしかなかった。終電に間に合わないから。',
      '（友人に）ねえ、明日何時に来るんだったっけ？',
      '安くなるほど安いほど、品質が心配になる。'
    ],
    answer: 3,
    correction: '安ければ安いほど、品質が心配になる。',
    grammarIds: ['n3-w4d3-03'],
    explanation: '〜ば〜ほど の正しい形: AければAいほど (i-adj). 安い → 安ければ安いほど. 「安くなるほど安いほど」は間違い — 「なる」を入れてはいけない。正しくは条件ば形＋同じ言葉のほど形。'
  },
  {
    id: 'bs4-n3-w4-errf-04', level: 'n3', week: 4, type: 'error_find',
    choices: [
      'バスを乗り換えるかわりに、少し歩くことにした。',
      'こんなチャンスはめったにない、今すぐ申し込むべきだ。',
      '田中さんから聞いたんだけど、来週パーティーがあるんだって。',
      '「どうして泣いているの？」「だって、悲しいんだもの。」'
    ],
    answer: 1,
    correction: 'こんなチャンスはめったにないから（ので）、今すぐ申し込むべきだ。',
    grammarIds: ['n3-w4d1-01'],
    explanation: 'Kalimat B memiliki masalah konjungsi: dua kalimat disambungkan tanpa konjungsi yang tepat. 「めったにない」と「申し込むべきだ」の間に「から/ので」が必要。「めったにない、〜べきだ」直接つなぐのは不自然。内容は正しいが、接続が不完全。'
  },
  {
    id: 'bs4-n3-w4-errf-05', level: 'n3', week: 4, type: 'error_find',
    choices: [
      '体を壊す前に、ちゃんと休むことだよ。',
      '父の兄、つまり私の叔父は、銀行員をしている。',
      '努力したその結果、試験に合格することができた。',
      '事故があった。そのため電車が遅延しているそうだ。'
    ],
    answer: 1,
    correction: '父の兄、つまり私の伯父は、銀行員をしている。',
    grammarIds: ['n3-w4d6-01'],
    explanation: '内容の誤り: 父の兄 = 伯父（おじ）, 父の弟 = 叔父（おじ）。両方「おじ」と読むが、漢字が違う。父より年上の兄 → 伯父（はくふ）, 年下の弟 → 叔父（しゅくふ）。文法的には正しいが、語彙の誤り。'
  },

  // ══════════════════════════════════════════════════════════════
  // N3 W4 — MULTI CHOICE (bs4-n3-w4-mc-01 ~ 05)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'bs4-n3-w4-mc-01', level: 'n3', week: 4, type: 'multi_choice',
    context: 'Seniormu di kantor berhasil menyelesaikan proyek besar berkat kerja kerasnya. Kamu ingin mengungkapkan rasa kagum: "Pantas saja berhasil, dia memang sudah bekerja keras." Pilih ekspresi paling tepat.',
    choices: [
      '毎日努力したわりに、成功したんだね。',
      '毎日努力したせいで、成功したんだね。',
      '毎日努力したおかげで、成功したんだね。',
      '毎日努力したくせに、成功したんだね。'
    ],
    answer: 2,
    grammarIds: ['n3-w4d2-01'],
    explanation: '〜おかげで = berkat (hasil positif). 毎日努力したおかげで成功した = berkat kerja keras setiap hari, berhasil. Pilihan A: わりに = padahal (tidak sesuai ekspektasi — tidak cocok). Pilihan B: せいで = gara-gara (hasil negatif — salah untuk konteks positif). Pilihan D: くせに = padahal (kritis/negatif).'
  },
  {
    id: 'bs4-n3-w4-mc-02', level: 'n3', week: 4, type: 'multi_choice',
    context: 'Temanmu tidak datang ke pesta ulang tahunmu. Keesokan harinya kamu bertemu dan ingin mengungkapkan kekecewaanmu dengan halus: "Sayang sekali kamu tidak datang kemarin." Pilih yang paling tepat.',
    choices: [
      '昨日来なかったくせに、なんで？',
      '昨日来ればよかったのに、残念だったね。',
      '昨日来るしかなかったのに。',
      '昨日来たはずなのに、来なかったね。'
    ],
    answer: 1,
    grammarIds: ['n3-w4d3-03'],
    explanation: '〜ばよかったのに = sayang sekali (kamu) tidak. 来ればよかったのに = seharusnya kamu datang (sayang tidak). Pilihan A: くせに = padahal (kritis/kasar). Pilihan C: 来るしかなかった = tidak ada pilihan selain datang (tidak tepat). Pilihan D: 来たはずなのに = seharusnya sudah datang (berdasarkan ekspektasi, bukan penyesalan).'
  },
  {
    id: 'bs4-n3-w4-mc-03', level: 'n3', week: 4, type: 'multi_choice',
    context: 'Kamu mendengar gosip bahwa kolega baru minta naik gaji kepada manajer. Kamu ingin menceritakan ini kepada teman: "Katanya si Yamada minta naik gaji lo." Mana yang paling natural dalam percakapan kasual?',
    choices: [
      '山田さんが給料を上げてほしいと言ったということです。',
      '山田さん、給料アップをお願いしたんだって。',
      '山田さんが給料を上げてほしいというわけだ。',
      '山田さんが給料アップをなぜならお願いしたからだ。'
    ],
    answer: 1,
    grammarIds: ['n3-w4d5-03'],
    explanation: '〜んだって = katanya (kasual, hearsay). 「〜したんだって」= katanya dia melakukan... Pilihan A: 〜ということです sopan tapi agak formal. Pilihan C: 〜というわけだ = pantas saja / berarti (kesimpulan dari fakta). Pilihan D: 〜なぜなら〜からだ salah penempatan (digunakan untuk menjelaskan alasan setelah kesimpulan).'
  },
  {
    id: 'bs4-n3-w4-mc-04', level: 'n3', week: 4, type: 'multi_choice',
    context: 'Manajermu sedang tidak masuk karena sakit. Rekan kerja meminta kamu mewakili presentasi. Kamu ingin memulai dengan: "Mewakili Manajer Suzuki yang sedang sakit, izinkan saya menyampaikan..." Pilih yang paling tepat.',
    choices: [
      '鈴木部長のかわりに、私がご説明させていただきます。',
      '鈴木部長にかわって、私がご説明させていただきます。',
      '鈴木部長のために、私がご説明させていただきます。',
      '鈴木部長として、私がご説明させていただきます。'
    ],
    answer: 1,
    grammarIds: ['n3-w4d2-04'],
    explanation: '〜にかわって = menggantikan / mewakili (orang/posisi). Nに＋かわって. 鈴木部長にかわって = mewakili Manajer Suzuki. Pilihan A: かわりに = sebagai gantinya (substitusi lebih umum). Pilihan C: のために = untuk/demi. Pilihan D: として = sebagai (tidak tepat jika kamu bukan manajer sesungguhnya).'
  },
  {
    id: 'bs4-n3-w4-mc-05', level: 'n3', week: 4, type: 'multi_choice',
    context: 'Hasil penelitian menunjukkan bahwa "orang kaya tidak selalu bahagia". Kamu ingin mengungkapkan ini dalam laporan. Pilih kalimat yang paling tepat secara gramatikal.',
    choices: [
      'お金持ちは必ずしも幸せではない。',
      'お金持ちは必ずしも幸せだとは限らない。',
      'お金持ちは必ずしも幸せだとは言えない。',
      'お金持ちは必ずしも幸せとは思えない。'
    ],
    answer: 1,
    grammarIds: ['n3-w4d4-02'],
    explanation: '必ずしも〜とは限らない = belum tentu / tidak selalu (pola standar). Pilihan A: 必ずしも〜ない juga gramatikal (sama sekali tidak selalu), namun 〜とは限らない lebih tepat secara nuansa (tidak bisa dipastikan/tidak berlaku mutlak). Pilihan C: 〜とは言えない = tidak bisa dikatakan (juga benar tapi beda nuansa). Pilihan B adalah pola paling idiomatis untuk nuansa ini.'
  },

  // ══════════════════════════════════════════════════════════════
  // N3 W5 — CONJUGATION (bs4-n3-w5-conj-01 ~ 05)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'bs4-n3-w5-conj-01', level: 'n3', week: 5, type: 'conjugation',
    instruction: 'Pilih bentuk 〜切れない yang tepat untuk: "Nasi ini terlalu banyak, tidak bisa dihabiskan"',
    base: '食べる',
    choices: [
      'ご飯が多すぎて食べ切れない。',
      'ご飯が多すぎて食べ切らない。',
      'ご飯が多すぎて食べ切った。',
      'ご飯が多すぎて食べ切れている。'
    ],
    answer: 0,
    grammarIds: ['n3-w5d2-02'],
    explanation: '〜切れない = tidak bisa menghabiskan. V語幹＋切れない. 食べる → 食べ (語幹) ＋ 切れない = 食べ切れない. Pilihan B: 切らない = tidak memotong (kata kerja 切る yang berbeda, bukan aspek). Pilihan D: 切れている = sudah terpotong (kondisi).'
  },
  {
    id: 'bs4-n3-w5-conj-02', level: 'n3', week: 5, type: 'conjugation',
    instruction: 'Pilih bentuk 〜たて yang tepat: "roti yang baru dipanggang"',
    base: '焼く',
    choices: ['焼きたてのパン', '焼いたてのパン', '焼くたてのパン', '焼いてたてのパン'],
    answer: 0,
    grammarIds: ['n3-w5d2-04'],
    explanation: '〜たて: V語幹＋たて. 焼く → 焼き (連用形/語幹) ＋ たて = 焼きたて. NG: 焼いたて (bentuk ta不可). Pola: 書きたて、炊きたて、煮たて (語幹形 + たて).'
  },
  {
    id: 'bs4-n3-w5-conj-03', level: 'n3', week: 5, type: 'conjugation',
    instruction: 'Pilih bentuk penyesalan yang tepat: "Seharusnya saya tidak mengatakan hal itu kepada Tanaka-san"',
    base: '言う (penyesalan karena sudah melakukan)',
    choices: [
      '田中さんにそんなことを言わなければよかった。',
      '田中さんにそんなことを言えばよかった。',
      '田中さんにそんなことを言わないとよかった。',
      '田中さんにそんなことを言うべきではなかった。'
    ],
    answer: 0,
    grammarIds: ['n3-w5d3-02'],
    explanation: '〜なければよかった = seharusnya tidak melakukan (penyesalan karena sudah melakukan). 言わなければよかった = seharusnya tidak bilang. Pilihan B: 言えばよかった = seharusnya bilang (penyesalan karena tidak melakukan — terbalik). Pilihan D: 〜べきではなかった benar secara makna tapi ini pola berbeda.'
  },
  {
    id: 'bs4-n3-w5-conj-04', level: 'n3', week: 5, type: 'conjugation',
    instruction: 'Pilih bentuk たとえ〜ても yang tepat: "Sekalipun mahal, saya tetap beli"',
    base: '高い',
    choices: [
      'たとえ高くても、買います。',
      'たとえ高いても、買います。',
      'たとえ高くとも、買います。',
      'たとえ高ければ、買います。'
    ],
    answer: 0,
    grammarIds: ['n3-w5d5-01'],
    explanation: 'たとえ〜ても: i-adj → くても. 高い → 高く＋ても = 高くても. たとえ高くても = sekalipun mahal. Pilihan C: 高くとも (arkhais/puitis, jarang dipakai). Pilihan D: たとえ〜ければ = kondisional, bukan konsesi.'
  },
  {
    id: 'bs4-n3-w5-conj-05', level: 'n3', week: 5, type: 'conjugation',
    instruction: 'Pilih bentuk 〜かけ yang tepat: "buku yang baru setengah dibaca"',
    base: '読む',
    choices: ['読みかけの本', '読むかけの本', '読んだかけの本', '読んでかけの本'],
    answer: 0,
    grammarIds: ['n3-w5d2-03'],
    explanation: '〜かけのN = setengah jadi / sedang dalam proses. V語幹＋かけのN. 読む → 読み (連用形) ＋ かけのN = 読みかけの本. NG: 読んだかけ (bentuk た不可), 読むかけ (bentuk辞書不可).'
  },

  // ══════════════════════════════════════════════════════════════
  // N3 W5 — TRANSLATION (bs4-n3-w5-trans-01 ~ 05)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'bs4-n3-w5-trans-01', level: 'n3', week: 5, type: 'translation',
    direction: 'id_to_jp',
    prompt: '"Tidak hanya pandai belajar, dia juga mahir olahraga."',
    choices: [
      '勉強ができるばかりか、スポーツも得意だ。',
      '勉強ができるはもちろん、スポーツも得意だ。',
      '勉強ができるはかりか、スポーツも得意だ。',
      '勉強ができるだけでなく、スポーツも得意だ。'
    ],
    answer: 0,
    grammarIds: ['n3-w5d1-02'],
    explanation: '〜ばかりか〜も = tidak hanya... bahkan. 勉強ができるばかりか、スポーツも = tidak hanya belajar, olahraga pun. Pilihan B: はもちろん は Nに付く: 勉強はもちろん (setelah N langsung). Pilihan D: だけでなく = tidak hanya (netral, benar tapi beda nuansa).'
  },
  {
    id: 'bs4-n3-w5-trans-02', level: 'n3', week: 5, type: 'translation',
    direction: 'id_to_jp',
    prompt: '"Mudah-mudahan besok tidak hujan."',
    choices: [
      '明日は雨が降らないといいなあ。',
      '明日は雨が降らなければよかった。',
      '明日は雨が降らないかもしれない。',
      '明日は雨が降らないほうがいい。'
    ],
    answer: 0,
    grammarIds: ['n3-w5d3-01'],
    explanation: '〜といいなあ = mudah-mudahan / kalau saja. Menyatakan harapan. 降らないといいなあ = mudah-mudahan tidak hujan. Pilihan B: 〜なければよかった = seharusnya tidak (penyesalan masa lalu). Pilihan C: かもしれない = mungkin (dugaan). Pilihan D: 〜ほうがいい = lebih baik (saran).'
  },
  {
    id: 'bs4-n3-w5-trans-03', level: 'n3', week: 5, type: 'translation',
    direction: 'id_to_jp',
    prompt: '"Baru setelah sakit, saya menyadari pentingnya kesehatan."',
    choices: [
      '病気になってはじめて、健康の大切さがわかった。',
      '病気になってから、健康の大切さがわかった。',
      '病気になったとたん、健康の大切さがわかった。',
      '病気になるまで、健康の大切さがわかった。'
    ],
    answer: 0,
    grammarIds: ['n3-w5d2-03'],
    explanation: '〜てはじめて = baru setelah (menyadari/memahami). Menekankan bahwa tanpa pengalaman X, Y tidak akan terjadi. Pilihan B: 〜てから = setelah (urutan biasa, tanpa nuansa "baru sadar"). Pilihan C: 〜とたん = tepat saat (waktu sangat singkat). Pilihan D: 〜まで = sampai (batas waktu).'
  },
  {
    id: 'bs4-n3-w5-trans-04', level: 'n3', week: 5, type: 'translation',
    direction: 'id_to_jp',
    prompt: '"Orang kaya belum tentu selalu bahagia."',
    choices: [
      'お金持ちが必ずしも幸せだとは限らない。',
      'お金持ちが必ず幸せだとは限らない。',
      'お金持ちが必ずしも幸せではないとは限らない。',
      'お金持ちが必ずしも幸せではない。'
    ],
    answer: 0,
    grammarIds: ['n3-w5d5-03'],
    explanation: '必ずしも〜とは限らない = belum tentu. Pola standar. Pilihan B: 必ず (tanpa しも) = pasti — diikuti とは限らない menjadi aneh. Pilihan C: 二重否定 yang salah logika. Pilihan D: 必ずしも〜ない = sama sekali tidak (juga benar tapi nuansa berbeda dari "belum tentu").'
  },
  {
    id: 'bs4-n3-w5-trans-05', level: 'n3', week: 5, type: 'translation',
    direction: 'id_to_jp',
    prompt: '"Seminar internasional diadakan di Tokyo."',
    choices: [
      '東京において、国際セミナーが開催された。',
      '東京で、国際セミナーが開催された。',
      '東京に、国際セミナーが開催された。',
      '東京にて、国際セミナーが開催された。'
    ],
    answer: 0,
    grammarIds: ['n3-w5d4-04'],
    explanation: '〜において = di... (formal). 東京において = di Tokyo (konteks formal/resmi). Pilihan B: 〜で juga benar (kasual/netral). Pilihan D: 〜にて = di (semi-formal, lebih singkat). Untuk kalimat resmi/berita, において paling tepat.'
  },

  // ══════════════════════════════════════════════════════════════
  // N3 W5 — ERROR FIND (bs4-n3-w5-errf-01 ~ 05)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'bs4-n3-w5-errf-01', level: 'n3', week: 5, type: 'error_find',
    choices: [
      'やっと報告書を書き上げた。',
      '彼は日本語はもちろん、英語も話せる。',
      '旅行に行くといいなあ、でも仕事が忙しいなあ。',
      '昨年に比べると、今年は気温が高くなっている。'
    ],
    answer: 2,
    correction: '旅行に行けるといいなあ、でも仕事が忙しいなあ。',
    grammarIds: ['n3-w5d3-01'],
    explanation: 'Kalimat C: 「旅行に行くといいなあ」は不自然. 〜といいなあ = kalau saja / mudah-mudahan (harapan untuk kondisi yang belum pasti). Harusnya: 「旅行に行けるといいなあ」= kalau saja bisa pergi. Atau: 「行けたらいいなあ」. 行くといいなあ は確定的すぎる.'
  },
  {
    id: 'bs4-n3-w5-errf-02', level: 'n3', week: 5, type: 'error_find',
    choices: [
      'たとえ失敗しても、あきらめないつもりだ。',
      'もしかすると、彼は来ないかもしれない。',
      'バスが来るまでに、ずっと立って待っていた。',
      'ところが、準備万端だったのに雨が降ってしまった。'
    ],
    answer: 2,
    correction: 'バスが来るまで、ずっと立って待っていた。',
    grammarIds: ['n3-w5d4-01'],
    explanation: 'Kalimat C salah: 〜まで (aksi berlangsung sampai titik tertentu) vs 〜までに (batas deadline). 「来るまで待った」= menunggu sampai datang (✓). 「来るまでに待った」は不自然 — 「待つ」のような継続動詞は 〜まで を使う。〜までに は一回性の動作に使う（例：5時までに来てください）。'
  },
  {
    id: 'bs4-n3-w5-errf-03', level: 'n3', week: 5, type: 'error_find',
    choices: [
      '先生は生徒に対して、いつも親切だ。',
      '彼女の日本語はまるで日本人のようだ。',
      '熱いうちに、このスープを飲んでください。',
      'もっと勉強すれば、合格したらよかった。'
    ],
    answer: 3,
    correction: 'もっと勉強すれば、合格できたのに。',
    grammarIds: ['n3-w5d3-02'],
    explanation: 'Kalimat D salah: 「〜すれば〜したらよかった」は接続が矛盾している. 正しくは: 「もっと勉強すればよかった」= seharusnya lebih banyak belajar。または「もっと勉強したら、合格できたのに」。〜すれば + 〜たらよかった の組み合わせは使えない.'
  },
  {
    id: 'bs4-n3-w5-errf-04', level: 'n3', week: 5, type: 'error_find',
    choices: [
      '映画が始まるまで、ロビーで待っていよう。',
      '入学式について、詳しいことはHPをご覧ください。',
      '古いものはほど、価値が高い場合がある。',
      'ところで、先週話していた件はどうなりましたか。'
    ],
    answer: 2,
    correction: '古いものほど、価値が高い場合がある。',
    grammarIds: ['n3-w5d4-04'],
    explanation: 'Kalimat C salah: 「〜はほど」は間違い。〜ほど の前に は は入らない (比較の ほど). 正しくは: 「古いものほど価値が高い」または「古ければ古いほど価値が高い」。Nほど = makin N makin / setara dengan N.'
  },
  {
    id: 'bs4-n3-w5-errf-05', level: 'n3', week: 5, type: 'error_find',
    choices: [
      '日本語はもちろん、漢字も難しい。',
      '彼女はもしかしたら、もう家に帰ったかもしれない。',
      '試験が終わったところで、みんなで食事に行こう。',
      '昨日は疲れたせいか、12時間も寝てしまった。'
    ],
    answer: 0,
    correction: '日本語はもちろん、漢字も難しい。(冗長だが誤りではない) → 日本語だけでなく、漢字も難しい。',
    grammarIds: ['n3-w5d1-01'],
    explanation: 'Kalimat A perlu dicermati: 「日本語はもちろん、漢字も難しい」は意味が重複している (漢字は日本語の一部). もちろん の使い方として: 漢字はもちろん、文法も難しい (kanji sudah jelas sulit, apalagi grammar). Konteks lebih tepat jika hal yang "sudah jelas" disebutkan dulu, lalu hal tambahan.'
  },

  // ══════════════════════════════════════════════════════════════
  // N3 W5 — MULTI CHOICE (bs4-n3-w5-mc-01 ~ 05)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'bs4-n3-w5-mc-01', level: 'n3', week: 5, type: 'multi_choice',
    context: 'Di tengah percakapan serius, kamu tiba-tiba ingin mengganti topik untuk bertanya tentang rencana liburan. Kamu berkata "Sudah itu, ngomong-ngomong, kamu ada rencana liburan ke mana?" Pilih konjungsi yang paling tepat.',
    choices: [
      'ところが、旅行の予定はありますか。',
      'ところで、旅行の予定はありますか。',
      'それから、旅行の予定はありますか。',
      'それとも、旅行の予定はありますか。'
    ],
    answer: 1,
    grammarIds: ['n3-w5d6-04'],
    explanation: 'ところで = ngomong-ngomong / by the way (mengalihkan topik). Pilihan A: ところが = namun ternyata (kontras/kejutan — tidak tepat untuk mengalihkan topik). Pilihan C: それから = lalu/kemudian (urutan waktu). Pilihan D: それとも = atau (pilihan dalam kalimat tanya).'
  },
  {
    id: 'bs4-n3-w5-mc-02', level: 'n3', week: 5, type: 'multi_choice',
    context: 'Kamu berencana pergi piknik besok, tapi melihat prakiraan hujan. Kamu menceritakan kekhawatiran kepada teman: "Kata prakiraan cuaca, besok mungkin hujan, jadi lebih baik kita persiapkan payung." Pilih konjungsi yang tepat.',
    choices: [
      '天気予報によると明日は雨らしい。ところが、傘を持っていこう。',
      '天気予報によると明日は雨らしい。ですから、傘を持っていこう。',
      '天気予報によると明日は雨らしい。ところで、傘を持っていこう。',
      '天気予報によると明日は雨らしい。だけど、傘を持っていこう。'
    ],
    answer: 1,
    grammarIds: ['n3-w5d6-02'],
    explanation: 'ですから = oleh karena itu (sopan, sebab-akibat). 雨らしい → ですから → 傘を = karena katanya hujan, makanya bawa payung. Pilihan A: ところが = namun ternyata (kontras, tidak cocok). Pilihan C: ところで = ngomong-ngomong (ganti topik). Pilihan D: だけど = tapi (kontras — kebalikan dari yang diharapkan).'
  },
  {
    id: 'bs4-n3-w5-mc-03', level: 'n3', week: 5, type: 'multi_choice',
    context: 'Teman lamamu yang sudah 5 tahun tidak bertemu tiba-tiba muncul di depan pintu. Kamu terkejut. Kamu ingin berkata "Tanaka-san! Wah, benar-benar seperti mimpi!" Pilih ekspresi paling tepat.',
    choices: [
      '田中さん！本当に夢のようだ！',
      '田中さん！まるで夢のようだ！',
      '田中さん！まるで夢みたいのようだ！',
      '田中さん！まるで夢だとしたら！'
    ],
    answer: 1,
    grammarIds: ['n3-w5d5-04'],
    explanation: 'まるで〜のようだ = benar-benar seperti / bagaikan. まるで memperkuat perumpamaan. Pilihan A: benar secara makna tapi tanpa まるで terasa kurang ekspresif. Pilihan C: 「まるで夢みたいのようだ」— tidak boleh menggabungkan みたい dan よう sekaligus. Pilihan D: としたら = andaikan (kondisional hipotesis).'
  },
  {
    id: 'bs4-n3-w5-mc-04', level: 'n3', week: 5, type: 'multi_choice',
    context: 'Kamu ingin menggambarkan semangat kerja keras kolega: "Dibandingkan tahun lalu, kinerjanya jauh lebih baik sekarang." Pilih struktur yang paling tepat.',
    choices: [
      '去年に比べて、今年は彼のパフォーマンスがずっとよくなった。',
      '去年に対して、今年は彼のパフォーマンスがずっとよくなった。',
      '去年にとって、今年は彼のパフォーマンスがずっとよくなった。',
      '去年のわりに、今年は彼のパフォーマンスがずっとよくなった。'
    ],
    answer: 0,
    grammarIds: ['n3-w5d1-03'],
    explanation: '〜に比べて = dibandingkan dengan. 去年に比べて = dibandingkan tahun lalu. Pilihan B: 〜に対して = terhadap / berbeda dengan (biasanya untuk dua hal yang dikontraskan bersamaan). Pilihan C: 〜にとって = bagi (sudut pandang). Pilihan D: 〜のわりに = padahal / tidak sesuai ekspektasi.'
  },
  {
    id: 'bs4-n3-w5-mc-05', level: 'n3', week: 5, type: 'multi_choice',
    context: 'Kamu sedang membuat rencana proyek dan ingin mengatakan "Asalkan ada dukungan dari semua orang, proyek ini pasti berhasil." Pilih ekspresi yang paling tepat.',
    choices: [
      'みんなの協力があれば、このプロジェクトは必ず成功する。',
      'みんなの協力さえあれば、このプロジェクトは必ず成功する。',
      'みんなの協力だけあれば、このプロジェクトは必ず成功する。',
      'みんなの協力こそあれば、このプロジェクトは必ず成功する。'
    ],
    answer: 1,
    grammarIds: ['n3-w5d4-01'],
    explanation: '〜さえ〜ば = asalkan (menekankan satu syarat yang cukup). みんなの協力さえあれば = asalkan ada dukungan semua orang (itu saja sudah cukup). Pilihan A: 〜があれば = jika ada (benar tapi tanpa penekanan "syarat minimum"). Pilihan C: だけあれば = hanya jika ada (lebih membatasi). Pilihan D: こそ = justru (penekanan berbeda).'
  },

  // ══════════════════════════════════════════════════════════════
  // N3 W6 — CONJUGATION (bs4-n3-w6-conj-01 ~ 05)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'bs4-n3-w6-conj-01', level: 'n3', week: 6, type: 'conjugation',
    instruction: 'Pilih bentuk 〜わけにはいかない yang tepat: "Karena ada rapat penting, saya tidak bisa sembarangan bolos"',
    base: '休む',
    choices: [
      '大事な会議があるから、休むわけにはいかない。',
      '大事な会議があるから、休むわけがない。',
      '大事な会議があるから、休むべきではない。',
      '大事な会議があるから、休んではいけない。'
    ],
    answer: 0,
    grammarIds: ['n3-w6d4-04'],
    explanation: '〜わけにはいかない = tidak bisa (karena norma/tanggung jawab sosial). 休むわけにはいかない = tidak mungkin absen sembarangan (sadar diri). Pilihan B: わけがない = tidak mungkin (logika). Pilihan C: べきではない = seharusnya tidak (kewajiban moral). Pilihan D: てはいけない = tidak boleh (aturan dari luar).'
  },
  {
    id: 'bs4-n3-w6-conj-02', level: 'n3', week: 6, type: 'conjugation',
    instruction: 'Pilih bentuk 〜ことにしている yang tepat: "Saya sudah biasakan tidak makan makanan manis setelah makan malam"',
    base: '食べない (kebiasaan pribadi)',
    choices: [
      '夕食後、甘いものは食べないことにしている。',
      '夕食後、甘いものは食べないことになっている。',
      '夕食後、甘いものは食べないことはしている。',
      '夕食後、甘いものは食べないことにした。'
    ],
    answer: 0,
    grammarIds: ['n3-w6d2-02'],
    explanation: '〜ことにしている = sudah menjadi kebiasaan pribadi (keputusan sendiri yang sudah berjalan). Pilihan B: ことになっている = sudah ditetapkan/dijadwalkan dari luar. Pilihan D: ことにした = baru saja memutuskan (keputusan baru, belum menjadi kebiasaan).'
  },
  {
    id: 'bs4-n3-w6-conj-03', level: 'n3', week: 6, type: 'conjugation',
    instruction: 'Pilih bentuk 〜たところ yang tepat: "Setelah dicoba, ternyata ukurannya pas"',
    base: '試してみる (menemukan hasil)',
    choices: [
      '試してみたところ、サイズがぴったりだった。',
      '試してみたとたん、サイズがぴったりだった。',
      '試してみたうちに、サイズがぴったりだった。',
      '試してみたら、サイズがぴったりだろう。'
    ],
    answer: 0,
    grammarIds: ['n3-w6d3-01'],
    explanation: '〜たところ = setelah melakukan... ternyata (hasil penemuan). 試してみたところ = setelah dicoba, ternyata. Pilihan B: とたん = tepat saat (interval sangat singkat, bukan penemuan). Pilihan C: うちに = selagi (batas kondisi). Pilihan D: たら〜だろう = kondisional + dugaan (tidak tepat).'
  },
  {
    id: 'bs4-n3-w6-conj-04', level: 'n3', week: 6, type: 'conjugation',
    instruction: 'Pilih bentuk 〜わけではない yang tepat: "Bukan berarti saya tidak suka sayur, tapi tidak terlalu sering makan"',
    base: '野菜が嫌い (penyangkalan parsial)',
    choices: [
      '野菜が嫌いなわけではないが、あまり食べない。',
      '野菜が嫌いわけではないが、あまり食べない。',
      '野菜が嫌いというわけではないが、あまり食べない。',
      '野菜が嫌いだわけではないが、あまり食べない。'
    ],
    answer: 2,
    grammarIds: ['n3-w6d4-02'],
    explanation: '〜というわけではない = bukan berarti. V/A/na普通形＋というわけではない. 嫌いというわけではない = bukan berarti tidak suka. Pilihan A: 嫌いなわけではない (na-adj + な + わけ) juga bisa. Pilihan C lebih umum dan natural untuk penyangkalan parsial. Pilihan B: 嫌いわけではない — kurang natural (perlu な atau という).'
  },
  {
    id: 'bs4-n3-w6-conj-05', level: 'n3', week: 6, type: 'conjugation',
    instruction: 'Pilih bentuk 〜るところだった yang tepat: "Tadi hampir saja terlambat ke rapat"',
    base: '遅刻する (hampir tapi tidak jadi)',
    choices: [
      '会議に遅刻するところだった。',
      '会議に遅刻したところだった。',
      '会議に遅刻するところだろう。',
      '会議に遅刻していたところだった。'
    ],
    answer: 0,
    grammarIds: ['n3-w6d3-02'],
    explanation: '〜るところだった = hampir saja (tapi tidak jadi). Vる (plain present) ＋ところだった. 遅刻するところだった = hampir terlambat. NG: Vた＋ところだった (ini beda — sudah dilakukan). Pilihan B: 遅刻したところだった = baru saja terlambat (berbeda makna).'
  },

  // ══════════════════════════════════════════════════════════════
  // N3 W6 — TRANSLATION (bs4-n3-w6-trans-01 ~ 05)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'bs4-n3-w6-trans-01', level: 'n3', week: 6, type: 'translation',
    direction: 'id_to_jp',
    prompt: '"Pantas saja dia kelihatan lelah. Ternyata dia kerja lembur sampai pagi."',
    choices: [
      '疲れているわけだ。朝まで残業していたんだから。',
      '疲れているはずだ。朝まで残業していたんだから。',
      '疲れているべきだ。朝まで残業していたんだから。',
      '疲れているものだ。朝まで残業していたんだから。'
    ],
    answer: 0,
    grammarIds: ['n3-w6d4-01'],
    explanation: '〜わけだ = pantas saja / berarti (kesimpulan logis dari fakta). 残業していたから → 疲れているわけだ = pantas saja lelah. Pilihan B: はずだ = seharusnya (ekspektasi, bukan kesimpulan dari bukti nyata). Pilihan C: べきだ = seharusnya (kewajiban). Pilihan D: ものだ = kenangan/nasihat umum.'
  },
  {
    id: 'bs4-n3-w6-trans-02', level: 'n3', week: 6, type: 'translation',
    direction: 'id_to_jp',
    prompt: '"Selagi belum lupa, cepat tulis di buku catatan."',
    choices: [
      '忘れないうちに、早くノートに書いてください。',
      '忘れないように、早くノートに書いてください。',
      '忘れるまでに、早くノートに書いてください。',
      '忘れないまま、早くノートに書いてください。'
    ],
    answer: 0,
    grammarIds: ['n3-w6d3-04'],
    explanation: '〜うちに = selagi / sementara masih (ada urgensi). 忘れないうちに = selagi belum lupa. Pilihan B: 〜ように = agar (tujuan). Pilihan C: 〜までに = sebelum (deadline). Pilihan D: 〜まま = tetap dalam keadaan (kondisi dipertahankan, bukan urgensi).'
  },
  {
    id: 'bs4-n3-w6-trans-03', level: 'n3', week: 6, type: 'translation',
    direction: 'id_to_jp',
    prompt: '"Tidak mungkin orang sebaik itu bisa melakukan hal jahat."',
    choices: [
      'あんなにいい人が、悪いことができるわけがない。',
      'あんなにいい人が、悪いことができるはずがない。',
      'あんなにいい人が、悪いことができるわけではない。',
      'あんなにいい人が、悪いことができないわけだ。'
    ],
    answer: 0,
    grammarIds: ['n3-w6d4-03'],
    explanation: '〜わけがない = tidak mungkin (sama sekali tidak mungkin secara logika). Pilihan B: はずがない = tidak seharusnya/sewajarnya (juga kuat, tapi わけがない lebih tegas). Pilihan C: わけではない = bukan berarti (penyangkalan parsial, terlalu lemah). Pilihan D: 〜ないわけだ = pantas saja tidak (kesimpulan).'
  },
  {
    id: 'bs4-n3-w6-trans-04', level: 'n3', week: 6, type: 'translation',
    direction: 'id_to_jp',
    prompt: '"Sudah diputuskan (dari perusahaan) bahwa saya akan pindah ke cabang Osaka."',
    choices: [
      '大阪支社に転勤することになりました。',
      '大阪支社に転勤することにしました。',
      '大阪支社に転勤するつもりになりました。',
      '大阪支社に転勤するわけになりました。'
    ],
    answer: 0,
    grammarIds: ['n3-w6d2-01'],
    explanation: '〜ことになりました = sudah diputuskan (dari pihak luar). Pilihan B: ことにしました = saya sendiri yang memutuskan (keputusan pribadi). Pilihan C: つもりになる tidak dipakai dalam konteks ini. Pilihan D: わけになる tidak ada pola seperti ini.'
  },
  {
    id: 'bs4-n3-w6-trans-05', level: 'n3', week: 6, type: 'translation',
    direction: 'id_to_jp',
    prompt: '"Saya tidak akan pernah menyerahkan impian saya."',
    choices: [
      '私は決して夢を諦めない。',
      '私は絶対に夢を諦めない。',
      '私はまったく夢を諦めない。',
      '私はめったに夢を諦めない。'
    ],
    answer: 0,
    grammarIds: ['n3-w6d5-01'],
    explanation: '決して〜ない = tidak akan pernah (tekad kuat, formal). 決して + penyangkalan. Pilihan B: 絶対に〜ない = mutlak tidak (juga kuat tapi bisa positif/negatif). Pilihan C: まったく〜ない = sama sekali tidak (total). Pilihan D: めったに〜ない = jarang sekali (frekuensi rendah, bukan tekad).'
  },

  // ══════════════════════════════════════════════════════════════
  // N3 W6 — ERROR FIND (bs4-n3-w6-errf-01 ~ 05)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'bs4-n3-w6-errf-01', level: 'n3', week: 6, type: 'error_find',
    choices: [
      '今年ほど雨の多い年はなかった。',
      '彼女は歌えることは歌えるが、音程が少し外れている。',
      '決して他人に秘密を話すわけにはいかない。',
      'もしもこの計画が失敗したとしても、また一から始めるつもりだ。'
    ],
    answer: 2,
    correction: '決して他人に秘密を話してはいけない。または 秘密を話すわけにはいかない。',
    grammarIds: ['n3-w6d5-01', 'n3-w6d4-04'],
    explanation: 'Kalimat C menggabungkan 決して と わけにはいかない secara berlebihan. 決して = tidak akan pernah (tekad). わけにはいかない = tidak bisa (norma sosial). Keduanya bisa dipakai sendiri-sendiri, tapi 「決して〜わけにはいかない」terdengar berlebihan dan tidak natural. Lebih baik: 「決して話してはいけない」atau「話すわけにはいかない」.'
  },
  {
    id: 'bs4-n3-w6-errf-02', level: 'n3', week: 6, type: 'error_find',
    choices: [
      '先生に指摘されてはじめて、自分の間違いに気がついた。',
      '図書館で本を借りてみたところ、とても面白い内容だった。',
      'もし彼が正直に言ったとしたら、問題は解決していただろう。',
      '早いうちに、この問題を解決するべきだ。'
    ],
    answer: 2,
    correction: 'もし彼が正直に言っていたなら、問題は解決していただろう。',
    grammarIds: ['n3-w6d1-01'],
    explanation: 'Kalimat C: 「もし〜としたら」は仮定の話に使うが、過去の反実仮想（実際は起きなかったこと）には「もし〜ていたなら」が適切。「正直に言ったとしたら」は「仮に言ったとすれば」という意味で、過去の反実仮想としては弱い。反実仮想: 「言っていたなら（実際は言わなかったが）」が正確。'
  },
  {
    id: 'bs4-n3-w6-errf-03', level: 'n3', week: 6, type: 'error_find',
    choices: [
      'バスに乗り遅れるところだった、間に合ってよかった。',
      '彼は少しも疲れた顔を見せなかった。',
      'ピアノは弾くことは弾きますが、あまり上手ではありません。',
      '毎朝ニュースを聞くことにしている。'
    ],
    answer: 0,
    correction: 'バスに乗り遅れるところだったが、間に合ってよかった。',
    grammarIds: ['n3-w6d3-02'],
    explanation: 'Kalimat A: 二つの文を接続詞なしでつなげている。「〜ところだった、間に合って〜」は接続が不完全。正しくは: 「乗り遅れるところだったが」または「〜ところだった。間に合ってよかった。」（句点で分ける）。'
  },
  {
    id: 'bs4-n3-w6-errf-04', level: 'n3', week: 6, type: 'error_find',
    choices: [
      'この問題は難しいことは難しいが、解けないことはない。',
      '今後は規則に従うことになっている。',
      '彼はめったに怒らない、穏やかな人だ。',
      'その上、彼女は料理も上手で、なんでもできる人だ。'
    ],
    answer: 1,
    correction: '今後は規則に従うことにしている。（自分の決意）または今後から規則に従うことになった。（外部決定）',
    grammarIds: ['n3-w6d2-01', 'n3-w6d2-02'],
    explanation: 'Kalimat B: 「今後は規則に従うことになっている」は、外部から決まった規則があるという意味だが、「今後は」（mulai sekarang）との組み合わせが awkward — ことになっている は既にある状態/ルールを指す。もし新たな決意なら「ことにした」/「ことにしている」の方が適切。'
  },
  {
    id: 'bs4-n3-w6-errf-05', level: 'n3', week: 6, type: 'error_find',
    choices: [
      '彼の話は、わけがないので信用できない。',
      '彼女は全然食欲がないわけではないが、あまり食べない。',
      '来週の会議に出席することになりました。',
      'もしも大きな地震が来ても、この建物は大丈夫だ。'
    ],
    answer: 0,
    correction: '彼の話は、わけがわからないので信用できない。',
    grammarIds: ['n3-w6d4-03'],
    explanation: 'Kalimat A: 「わけがない」= tidak mungkin (standalone). 「わけがないので」は「理由がないので」という意味で使おうとしているが、これは不自然。「わけ」を理由の意味で使うなら: 「わけがわからない」（意味不明）または「わけのわからない話」が正しい。「〜わけがない」は「〜のはずがない」の意味で使う。'
  },

  // ══════════════════════════════════════════════════════════════
  // N3 W6 — MULTI CHOICE (bs4-n3-w6-mc-01 ~ 05)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'bs4-n3-w6-mc-01', level: 'n3', week: 6, type: 'multi_choice',
    context: 'Atasan menelepon dan bertanya apakah laporan sudah siap. Kamu belum selesai dan ingin mengatakan "Saya hampir selesai." dengan nuansa "hampir siap tapi belum". Pilih yang paling tepat.',
    choices: [
      'もうすぐ終わるところです。',
      'もう終わったところです。',
      'ちょうど終わるところでした。',
      'もうすぐ終わるはずです。'
    ],
    answer: 0,
    grammarIds: ['n3-w6d3-02'],
    explanation: '〜るところです = sedang akan (tepat mau melakukan). もうすぐ終わるところ = hampir selesai (tepat mau selesai). Pilihan B: 終わったところ = baru saja selesai (sudah selesai). Pilihan C: でした = lampau (tidak tepat untuk kondisi sekarang). Pilihan D: はずです = seharusnya (ekspektasi).'
  },
  {
    id: 'bs4-n3-w6-mc-02', level: 'n3', week: 6, type: 'multi_choice',
    context: 'Seorang dokter menasihati pasien perokok: "Rokok tidak baik untuk kesehatan. Anda tidak bisa terus-terusan merokok." Mana ekspresi yang paling tepat untuk nuansa "tidak sanggup terus begitu demi kebaikanmu"?',
    choices: [
      'タバコを吸い続けてはいけません。',
      'タバコを吸い続けるべきではありません。',
      'タバコを吸い続けるわけにはいきません。',
      'タバコを吸い続けることはありません。'
    ],
    answer: 2,
    grammarIds: ['n3-w6d4-04'],
    explanation: '〜わけにはいかない = tidak bisa (demi norma/kesadaran). Dalam konteks medis, dokter menyarankan karena peduli kesehatan pasien — nuansa "sudah seharusnya tidak". Pilihan A: てはいけない = tidak boleh (aturan dari luar). Pilihan B: べきではない = seharusnya tidak (kewajiban moral). Pilihan D: ことはない = tidak perlu (terlalu lemah).'
  },
  {
    id: 'bs4-n3-w6-mc-03', level: 'n3', week: 6, type: 'multi_choice',
    context: 'Kamu ingin memberi tahu teman bahwa informasi kelas tambahan sudah dikonfirmasi oleh koordinator. "Kata koordinator, kelas tambahan besok diadakan di ruang 3." Pilih ekspresi paling tepat.',
    choices: [
      'コーディネーターによると、明日の補講は3号室でするということです。',
      'コーディネーターにとって、明日の補講は3号室でするわけだ。',
      'コーディネーターとして、明日の補講は3号室でするはずだ。',
      'コーディネーターのおかげで、明日の補講は3号室でするわけだ。'
    ],
    answer: 0,
    grammarIds: ['n3-w6d2-01'],
    explanation: '〜によると = menurut (sumber informasi). 〜ということです = katanya / disampaikan bahwa (hearsay formal). Kombinasi ini tepat untuk menyampaikan info dari sumber lain. Pilihan B: にとって = bagi (sudut pandang, tidak tepat). Pilihan C: として = sebagai (peran). Pilihan D: おかげで = berkat (hasil positif, tidak relevan).'
  },
  {
    id: 'bs4-n3-w6-mc-04', level: 'n3', week: 6, type: 'multi_choice',
    context: 'Kamu melihat teman yang sangat jarang datang ke kantor tiba-tiba muncul. Kamu terkejut dan ingin berkata "Wah, Yamada-san jarang sekali muncul ke sini ya!" Pilih yang paling tepat.',
    choices: [
      '山田さんはまったくここに来ないんですね。',
      '山田さんはめったにここに来ないんですね。',
      '山田さんは決してここに来ないんですね。',
      '山田さんは少しもここに来ないんですね。'
    ],
    answer: 1,
    grammarIds: ['n3-w6d5-03'],
    explanation: 'めったに〜ない = jarang sekali (hampir tidak pernah tapi masih bisa terjadi). Cocok karena teman itu ternyata datang juga sekarang. Pilihan A: まったく〜ない = sama sekali tidak (100% tidak — tetapi ternyata dia ada). Pilihan C: 決して = tidak akan pernah (tekad/penegasan mutlak — tidak cocok). Pilihan D: 少しも〜ない = sedikitpun tidak (mutlak).'
  },
  {
    id: 'bs4-n3-w6-mc-05', level: 'n3', week: 6, type: 'multi_choice',
    context: 'Kamu menulis laporan dan ingin mengakhiri paragraf dengan menambahkan poin positif tambahan: "Produk ini harganya terjangkau. Terlebih lagi, kualitasnya juga sangat bagus." Pilih konjungsi yang paling tepat.',
    choices: [
      'この製品は値段が手ごろです。それと、品質もとても優れています。',
      'この製品は値段が手ごろです。その上、品質もとても優れています。',
      'この製品は値段が手ごろです。それとも、品質もとても優れています。',
      'この製品は値段が手ごろです。ところが、品質もとても優れています。'
    ],
    answer: 1,
    grammarIds: ['n3-w6d6-03'],
    explanation: 'その上 = terlebih lagi / ditambah lagi (menambahkan info yang memperkuat). Untuk laporan formal dengan penekanan: 手ごろ ＋ その上 品質も = harganya murah, terlebih lagi kualitasnya pun bagus. Pilihan A: それと = dan juga (kasual). Pilihan C: それとも = atau (pilihan dalam tanya). Pilihan D: ところが = namun ternyata (kontras/kejutan).'
  },

  // ══════════════════════════════════════════════════════════════
  // N4 W5 — CONJUGATION (bs4-n4-w5-conj-01 ~ 05)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'bs4-n4-w5-conj-01', level: 'n4', week: 5, type: 'conjugation',
    instruction: 'Pilih bentuk 〜によって yang tepat: "Harga berubah tergantung negaranya"',
    base: '国 / 値段が違う',
    choices: [
      '国によって、値段が違います。',
      '国にとって、値段が違います。',
      '国において、値段が違います。',
      '国によると、値段が違います。'
    ],
    answer: 0,
    grammarIds: ['n4-w5d1-02'],
    explanation: '〜によって (variasi/perbedaan) = tergantung pada. 国によって違う = berbeda tergantung negara. Pilihan B: にとって = bagi (sudut pandang). Pilihan C: において = di... (formal, tempat/konteks). Pilihan D: によると = menurut (sumber informasi).'
  },
  {
    id: 'bs4-n4-w5-conj-02', level: 'n4', week: 5, type: 'conjugation',
    instruction: 'Pilih bentuk さえ〜ば yang tepat: "Asalkan kesehatan ada, segalanya bisa dilakukan"',
    base: '健康がある',
    choices: [
      '健康さえあれば、何でもできる。',
      '健康さえあったら、何でもできる。',
      '健康だけあれば、何でもできる。',
      '健康こそあれば、何でもできる。'
    ],
    answer: 0,
    grammarIds: ['n4-w5d3-02'],
    explanation: '〜さえ〜ば = asalkan (satu syarat saja cukup). N＋さえ＋Vば. 健康さえあれば = asalkan ada kesehatan. Pilihan B: たら = kondisional umum (benar tapi さえ〜ば lebih menekankan "syarat minimum"). Pilihan C: だけ = hanya (beda nuansa). Pilihan D: こそ = justru (penekanan berbeda).'
  },
  {
    id: 'bs4-n4-w5-conj-03', level: 'n4', week: 5, type: 'conjugation',
    instruction: 'Pilih bentuk 〜ばかり (baru saja) yang tepat: "Saya baru saja makan, jadi masih kenyang"',
    base: '食べる (baru saja)',
    choices: [
      '食べたばかりなので、まだお腹いっぱいです。',
      '食べるばかりなので、まだお腹いっぱいです。',
      '食べてばかりなので、まだお腹いっぱいです。',
      '食べたばかりだから、もうお腹いっぱいです。'
    ],
    answer: 0,
    grammarIds: ['n4-w5d5-02'],
    explanation: 'Vた＋ばかり = baru saja selesai. 食べたばかり = baru saja makan. Pilihan B: 食べるばかり = hanya makan terus (tren, bukan waktu). Pilihan C: 食べてばかり = makan terus-menerus (kritik). Pilihan D: juga benar secara makna (食べたばかりだから/なので = keduanya OK untuk alasan).'
  },
  {
    id: 'bs4-n4-w5-conj-04', level: 'n4', week: 5, type: 'conjugation',
    instruction: 'Pilih bentuk 〜ごとに yang tepat: "Saya minum obat setiap 6 jam"',
    base: '6時間 / 薬を飲む',
    choices: [
      '6時間ごとに薬を飲んでいます。',
      '6時間おきに薬を飲んでいます。',
      '6時間ずつ薬を飲んでいます。',
      '6時間だけ薬を飲んでいます。'
    ],
    answer: 0,
    grammarIds: ['n4-w5d6-01'],
    explanation: '〜ごとに = setiap (interval). 6時間ごとに = setiap 6 jam. Pilihan B: おきに = dengan jeda 6 jam (setelah 6 jam baru minum lagi — interval berbeda tipis). Konteks medis: ごとに lebih umum. Pilihan C: ずつ = masing-masing/per. Pilihan D: だけ = hanya.'
  },
  {
    id: 'bs4-n4-w5-conj-05', level: 'n4', week: 5, type: 'conjugation',
    instruction: 'Pilih bentuk 〜てよかった yang tepat: "Syukurlah membawa payung, ternyata hujan"',
    base: '傘を持ってくる',
    choices: [
      '傘を持ってきてよかった。雨が降ったから。',
      '傘を持ってこなくてよかった。雨が降ったから。',
      '傘を持ってくるとよかった。雨が降ったから。',
      '傘を持ってきてよかったのに。雨が降ったから。'
    ],
    answer: 0,
    grammarIds: ['n4-w5d4-01'],
    explanation: 'Vて＋よかった = syukurlah sudah melakukan. 持ってきてよかった = syukurlah sudah bawa. Pilihan B: 持ってこなくてよかった = syukurlah tidak bawa (terbalik). Pilihan C: 持ってくるとよかった = kalau membawa seharusnya bagus (kondisional, bukan rasa lega). Pilihan D: のに = sayang/kecewa (nuansa negatif).'
  },

  // ══════════════════════════════════════════════════════════════
  // N4 W5 — TRANSLATION (bs4-n4-w5-trans-01 ~ 05)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'bs4-n4-w5-trans-01', level: 'n4', week: 5, type: 'translation',
    direction: 'id_to_jp',
    prompt: '"Saya menulis laporan tentang budaya Jepang."',
    choices: [
      '日本の文化について、レポートを書きました。',
      '日本の文化に関して、レポートを書きました。',
      '日本の文化によって、レポートを書きました。',
      '日本の文化のため、レポートを書きました。'
    ],
    answer: 0,
    grammarIds: ['n4-w5d1-01'],
    explanation: '〜について = tentang (umum, fleksibel). 日本の文化について書く = menulis tentang budaya Jepang. Pilihan B: に関して = mengenai (lebih formal, akademik). Pilihan C: によって = oleh / tergantung (agen/variasi). Pilihan D: のため = untuk/demi (tujuan).'
  },
  {
    id: 'bs4-n4-w5-trans-02', level: 'n4', week: 5, type: 'translation',
    direction: 'id_to_jp',
    prompt: '"Dia bekerja sebagai penerjemah di perusahaan itu."',
    choices: [
      'その会社で通訳として働いています。',
      'その会社で通訳にして働いています。',
      'その会社で通訳によって働いています。',
      'その会社で通訳のために働いています。'
    ],
    answer: 0,
    grammarIds: ['n4-w5d2-01'],
    explanation: '〜として = sebagai (peran/kapasitas). 通訳として = sebagai penerjemah. Pilihan B: にして — tidak ada pola Nにして untuk peran. Pilihan C: によって = oleh (agen). Pilihan D: のために = untuk (tujuan/manfaat).'
  },
  {
    id: 'bs4-n4-w5-trans-03', level: 'n4', week: 5, type: 'translation',
    direction: 'id_to_jp',
    prompt: '"Maaf sudah merepotkan Anda." (formal)',
    choices: [
      'ご迷惑をおかけしてすみませんでした。',
      'ご迷惑をおかけしてごめん。',
      'ご迷惑をかけてすみませんでした。',
      'ご迷惑をかけてごめんなさい。'
    ],
    answer: 0,
    grammarIds: ['n4-w5d4-02'],
    explanation: 'Vて＋すみませんでした = maaf sudah melakukan (formal). お〜をかけする (humble form) + すみませんでした = paling formal. Pilihan B: ごめん (sangat kasual). Pilihan C: かけて (tanpa honorifik お〜を) lebih kasual. Pilihan D: ごめんなさい (kasual-sedang).'
  },
  {
    id: 'bs4-n4-w5-trans-04', level: 'n4', week: 5, type: 'translation',
    direction: 'id_to_jp',
    prompt: '"Jika kehilangan kartu, segera hubungi kami." (aturan/pengumuman formal)',
    choices: [
      'カードを失くした場合は、すぐにご連絡ください。',
      'カードを失くしたら、すぐにご連絡ください。',
      'カードを失くせば、すぐにご連絡ください。',
      'カードを失くすと、すぐにご連絡ください。'
    ],
    answer: 0,
    grammarIds: ['n4-w5d3-01'],
    explanation: '〜場合は = dalam hal / jika terjadi (formal, untuk pengumuman/aturan). カードを失くした場合は = dalam hal kehilangan kartu. Pilihan B: 〜たら lebih umum/personal. Pilihan C: 〜ば lebih logis/hipotetikal. Pilihan D: 〜と otomatis (kondisi alami). Untuk aturan tertulis, 場合は paling tepat.'
  },
  {
    id: 'bs4-n4-w5-trans-05', level: 'n4', week: 5, type: 'translation',
    direction: 'id_to_jp',
    prompt: '"Belakangan ini harga barang terus naik saja."',
    choices: [
      '最近、物価が上がるばかりだ。',
      '最近、物価が上がったばかりだ。',
      '最近、物価が上がるだけだ。',
      '最近、物価が上がりすぎだ。'
    ],
    answer: 0,
    grammarIds: ['n4-w5d5-02'],
    explanation: 'Vる＋ばかりだ = makin lama makin (tren yang terus berlangsung, biasanya negatif). 上がるばかりだ = terus naik saja. Pilihan B: 上がったばかり = baru saja naik (waktu dekat). Pilihan C: 上がるだけだ = hanya naik (terlalu sederhana). Pilihan D: 上がりすぎ = terlalu naik (derajat, bukan tren).'
  },

  // ══════════════════════════════════════════════════════════════
  // N4 W5 — ERROR FIND (bs4-n4-w5-errf-01 ~ 05)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'bs4-n4-w5-errf-01', level: 'n4', week: 5, type: 'error_find',
    choices: [
      '彼女のことについて、もっと知りたいです。',
      '努力によって、誰でも成長できると思います。',
      '緊急の場合は、このレバーを引いてください。',
      '試験に受かりてよかった、本当に安心した。'
    ],
    answer: 3,
    correction: '試験に受かってよかった、本当に安心した。',
    grammarIds: ['n4-w5d4-01'],
    explanation: 'Kalimat D salah: 「受かりてよかった」は間違い。動詞のて形 + よかった: 受かる → 受かって + よかった = 受かってよかった. 「受かりて」は古語（文語体）で現代語では使わない。'
  },
  {
    id: 'bs4-n4-w5-errf-02', level: 'n4', week: 5, type: 'error_find',
    choices: [
      'できるだけ早くお返事します。',
      '彼はゲームばかりして、全然勉強しない。',
      '健康さえあればば、何でもできると思う。',
      '1時間ごとに休憩を取るようにしています。'
    ],
    answer: 2,
    correction: '健康さえあれば、何でもできると思う。',
    grammarIds: ['n4-w5d3-02'],
    explanation: 'Kalimat C salah: 「あればば」は間違い — 「ば」が二重になっている。さえ〜ば: あれ (条件形) ＋ ば = あれば (一回だけ). 正しくは: 「健康さえあれば」。'
  },
  {
    id: 'bs4-n4-w5-errf-03', level: 'n4', week: 5, type: 'error_find',
    choices: [
      '先生は環境について詳しく説明してくれた。',
      'このプロジェクトは政府によって進められている。',
      '子供に対して、いつも優しく話しかけるようにしている。',
      '来週の発表会は、雨の場合で中止になります。'
    ],
    answer: 3,
    correction: '来週の発表会は、雨の場合は中止になります。',
    grammarIds: ['n4-w5d3-01'],
    explanation: 'Kalimat D salah: 「雨の場合で」は間違い。〜場合は = dalam hal jika terjadi (partikel は, bukan で). 正しくは: 「雨の場合は中止」。で は手段・場所・原因を示すが、場合 には は を使う。'
  },
  {
    id: 'bs4-n4-w5-errf-04', level: 'n4', week: 5, type: 'error_find',
    choices: [
      '今日は特別な予定はないだけ、家でゆっくりします。',
      '友達として、正直に言わなければならない。',
      '上司に対して失礼なことを言ってすみませんでした。',
      'この仕事は彼女にとって、とても大切なものだ。'
    ],
    answer: 0,
    correction: '今日は特別な予定はないので（から）、家でゆっくりします。',
    grammarIds: ['n4-w5d5-01'],
    explanation: 'Kalimat A: 「〜ないだけ」の使い方が間違い。「だけ」は量的限定を示す（「できるだけ」「それだけ」）。理由を示すには「ので/から」を使う。正しくは: 「予定がないので、家でゆっくりします」。'
  },
  {
    id: 'bs4-n4-w5-errf-05', level: 'n4', week: 5, type: 'error_find',
    choices: [
      '遅刻してごめんなさい。電車が止まってしまって。',
      '天気によって、イベントの内容が変わることがある。',
      '私は毎朝ニュースを読むことにしています。',
      '食べたばかりです、もうお腹いっぱいです。'
    ],
    answer: 3,
    correction: '食べたばかりなので（から）、もうお腹いっぱいです。',
    grammarIds: ['n4-w5d5-02'],
    explanation: 'Kalimat D: 二つの文を接続詞なしでつないでいる。「食べたばかりです、もうお腹いっぱいです。」は原因と結果の関係。正しくは「食べたばかりなので、お腹がいっぱいです」または句点で分けて別々に。'
  },

  // ══════════════════════════════════════════════════════════════
  // N4 W5 — MULTI CHOICE (bs4-n4-w5-mc-01 ~ 05)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'bs4-n4-w5-mc-01', level: 'n4', week: 5, type: 'multi_choice',
    context: 'Rekanmu baru saja menyelesaikan ujian N3 dan ternyata lulus. Kamu ingin mengucapkan selamat: "Selamat! Pasti senang ya karena sudah belajar keras." Pilih yang paling tepat.',
    choices: [
      'おめでとう！一生懸命勉強したおかげで、合格できてよかったね。',
      'おめでとう！一生懸命勉強したせいで、合格できてよかったね。',
      'おめでとう！一生懸命勉強したくせに、合格できてよかったね。',
      'おめでとう！一生懸命勉強したわりに、合格できてよかったね。'
    ],
    answer: 0,
    grammarIds: ['n4-w5d4-01'],
    explanation: 'てよかった = syukurlah sudah melakukan. おかげで = berkat (hasil positif). Kombinasi: 「勉強したおかげで合格できてよかったね」= berkat belajar keras, syukurlah bisa lulus. Pilihan B: せいで = gara-gara (negatif). Pilihan C: くせに = padahal (kritik). Pilihan D: わりに = untuk yang (tidak sesuai ekspektasi).'
  },
  {
    id: 'bs4-n4-w5-mc-02', level: 'n4', week: 5, type: 'multi_choice',
    context: 'Di kantor ada aturan baru: rapat divisi diadakan setiap Senin pagi. Kamu menjelaskan kepada karyawan baru: "Setiap hari Senin, ada rapat divisi." Pilih yang paling tepat.',
    choices: [
      '月曜日ごとに、部署のミーティングがあります。',
      '月曜日のたびに、部署のミーティングがあります。',
      '月曜日のついでに、部署のミーティングがあります。',
      '月曜日のうちに、部署のミーティングがあります。'
    ],
    answer: 0,
    grammarIds: ['n4-w5d6-01'],
    explanation: '〜ごとに = setiap (interval teratur). 月曜日ごとに = setiap hari Senin. Pilihan B: たびに = setiap kali (lebih menekankan kejadian yang berulang, bisa natural tapi ごとに lebih natural untuk jadwal). Pilihan C: ついでに = sekalian (tidak tepat). Pilihan D: うちに = selagi (kondisi sementara).'
  },
  {
    id: 'bs4-n4-w5-mc-03', level: 'n4', week: 5, type: 'multi_choice',
    context: 'Seorang teman bertanya pendapatmu tentang kebijakan perusahaan baru. Kamu ingin berkata: "Kebijakan ini berbeda di setiap perusahaan, tergantung situasinya masing-masing." Pilih yang paling tepat.',
    choices: [
      'この方針は会社について違います。',
      'この方針は会社によって違います。',
      'この方針は会社に対して違います。',
      'この方針は会社として違います。'
    ],
    answer: 1,
    grammarIds: ['n4-w5d1-02'],
    explanation: '〜によって違う = berbeda tergantung. 会社によって違う = berbeda tergantung perusahaan. Pilihan A: について = tentang (topik, bukan variasi). Pilihan C: に対して = terhadap/berbeda dengan (kontras dua hal, bukan variasi). Pilihan D: として = sebagai (peran).'
  },
  {
    id: 'bs4-n4-w5-mc-04', level: 'n4', week: 5, type: 'multi_choice',
    context: 'Seniormu di kelas memintamu untuk menjelaskan perbedaan だけ dan しか. Pilih penjelasan yang paling tepat.',
    choices: [
      'だけ は否定文だけに使う。しか は肯定文に使う。',
      'だけ は中立的（ただXのみ）。しか は否定文に使い、不足感・残念な気持ちを含む。',
      'だけ と しか は全く同じ意味で、互換性がある。',
      'だけ はNに接続できない。しか はNに接続できる。'
    ],
    answer: 1,
    grammarIds: ['n4-w5d5-01'],
    explanation: 'だけ = netral (hanya X, itu saja — tidak mengandung nilai positif/negatif). しか〜ない = tidak ada selain X (mengandung nuansa kekurangan atau kecewa). Contoh: 一人だけ来た (netral) vs 一人しか来なかった (mengecewakan, seharusnya lebih banyak). Pilihan C salah: keduanya TIDAK bisa saling menggantikan sepenuhnya.'
  },
  {
    id: 'bs4-n4-w5-mc-05', level: 'n4', week: 5, type: 'multi_choice',
    context: 'Di formulir pengajuan cuti tertulis: "Dalam hal sakit mendadak, harap konfirmasi ke HRD via email sebelum pukul 9 pagi." Kalimat mana yang paling tepat menggunakan pola 場合?',
    choices: [
      '急な病気の場合で、午前9時前にHRDにメールでご連絡ください。',
      '急な病気の場合は、午前9時前にHRDにメールでご連絡ください。',
      '急な病気の場合が、午前9時前にHRDにメールでご連絡ください。',
      '急な病気の場合から、午前9時前にHRDにメールでご連絡ください。'
    ],
    answer: 1,
    grammarIds: ['n4-w5d3-01'],
    explanation: '〜場合は = dalam hal / jika terjadi (partikel は). 急な病気の場合は = dalam hal sakit mendadak. Pilihan A: 場合で — で は手段/場所/原因。Pilihan C: 場合が — が は主格、ここでは不自然。Pilihan D: 場合から — から は起点/理由。'
  },

  // ══════════════════════════════════════════════════════════════
  // N4 W6 — CONJUGATION (bs4-n4-w6-conj-01 ~ 05)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'bs4-n4-w6-conj-01', level: 'n4', week: 6, type: 'conjugation',
    instruction: 'Pilih bentuk 〜がっている yang tepat: "Adik tampak menginginkan sepatu baru itu"',
    base: '欲しい (orang ketiga)',
    choices: [
      '弟は新しい靴を欲しがっている。',
      '弟は新しい靴が欲しいがっている。',
      '弟は新しい靴が欲しがっている。',
      '弟は新しい靴を欲しいがっている。'
    ],
    answer: 0,
    grammarIds: ['n4-w6d4-01'],
    explanation: '欲しい → 欲し (幹) ＋ がる → 欲しがる → 欲しがっている. NG: 欲しいがる (tidak boleh ada い sebelum がる). Objek partikel: Nを＋欲しがる (bukan が). 弟は新しい靴を欲しがっている = adik tampak menginginkan sepatu baru.'
  },
  {
    id: 'bs4-n4-w6-conj-02', level: 'n4', week: 6, type: 'conjugation',
    instruction: 'Pilih bentuk 〜なさい yang tepat: "Bacalah soal berikutnya"',
    base: '読む',
    choices: ['次の問題を読みなさい。', '次の問題を読むなさい。', '次の問題を読んでなさい。', '次の問題を読めなさい。'],
    answer: 0,
    grammarIds: ['n4-w6d4-02'],
    explanation: 'V連用形(masu幹)＋なさい. 読む → 読み＋なさい = 読みなさい. NG: 読むなさい (辞書形は不可), 読んでなさい (te-form不可), 読めなさい (可能形不可).'
  },
  {
    id: 'bs4-n4-w6-conj-03', level: 'n4', week: 6, type: 'conjugation',
    instruction: 'Pilih bentuk 〜出す yang tepat: "Bayi itu tiba-tiba mulai menangis"',
    base: '泣く',
    choices: ['赤ちゃんが急に泣き出した。', '赤ちゃんが急に泣くだした。', '赤ちゃんが急に泣んだした。', '赤ちゃんが急に泣いただした。'],
    answer: 0,
    grammarIds: ['n4-w6d6-02'],
    explanation: 'V語幹(連用形)＋出す. 泣く → 泣き＋出す = 泣き出す → 泣き出した. NG: 泣くだした (辞書形不可), 泣いただした (た形不可). 出す = mulai tiba-tiba/spontan.'
  },
  {
    id: 'bs4-n4-w6-conj-04', level: 'n4', week: 6, type: 'conjugation',
    instruction: 'Pilih bentuk 〜くする / 〜にする yang tepat: "Tolong kecilkan volumenya"',
    base: '音量を小さい',
    choices: [
      '音量を小さくしてください。',
      '音量を小さいにしてください。',
      '音量を小さくなってください。',
      '音量を小さいしてください。'
    ],
    answer: 0,
    grammarIds: ['n4-w6d5-02'],
    explanation: 'i-adj幹＋くする = mengubah ke kondisi (transitif). 小さい → 小さく＋する = 小さくする. NG: 小さいにする (にする は na-adj/N用), 小さくなる (intransitif = berubah sendiri). 小さくしてください = tolong kecilkan (seseorang yang melakukan).'
  },
  {
    id: 'bs4-n4-w6-conj-05', level: 'n4', week: 6, type: 'conjugation',
    instruction: 'Pilih bentuk みたい yang tepat: "Hari ini sepertinya panas ya"',
    base: '暑い (dugaan dari perasaan)',
    choices: [
      '今日は暑いみたいだね。',
      '今日は暑みたいだね。',
      '今日は暑くみたいだね。',
      '今日は暑のみたいだね。'
    ],
    answer: 0,
    grammarIds: ['n4-w6d3-02'],
    explanation: 'i-adj普通形＋みたい. 暑い (plain form) ＋ みたい = 暑いみたい. NG: 暑みたい (幹だけは不可), 暑くみたい (くは副詞化). みたいだ: i-adjの場合は 〜いみたい (plain形をそのまま接続).'
  },

  // ══════════════════════════════════════════════════════════════
  // N4 W6 — TRANSLATION (bs4-n4-w6-trans-01 ~ 05)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'bs4-n4-w6-trans-01', level: 'n4', week: 6, type: 'translation',
    direction: 'id_to_jp',
    prompt: '"Sepertinya dia sedang marah. Hati-hati ya."',
    choices: [
      '彼女、怒ってるみたいだよ。気をつけて。',
      '彼女、怒ってるようだよ。気をつけて。',
      '彼女、怒ってるらしいよ。気をつけて。',
      '彼女、怒ってるかもしれないよ。気をつけて。'
    ],
    answer: 0,
    grammarIds: ['n4-w6d3-02'],
    explanation: 'みたい = sepertinya (kasual, berdasarkan pengamatan langsung). 怒ってるみたい = tampaknya sedang marah (kamu melihat sendiri). Pilihan B: ようだ = formal. Pilihan C: らしい = dari info tidak langsung (katanya). Pilihan D: かもしれない = mungkin (lebih tidak pasti).'
  },
  {
    id: 'bs4-n4-w6-trans-02', level: 'n4', week: 6, type: 'translation',
    direction: 'id_to_jp',
    prompt: '"Mentega dibuat dari susu sapi."',
    choices: [
      'バターは牛乳から作られます。',
      'バターは牛乳でできています。',
      'バターは牛乳によって作られます。',
      'バターは牛乳から出来ています。'
    ],
    answer: 0,
    grammarIds: ['n4-w6d5-01'],
    explanation: '〜から作られる = dibuat dari (bahan berubah bentuk total). 牛乳 → バター (wujud berubah total) → から作られる. Pilihan B: でできている = terbuat dari (bahan masih terlihat). Susu tidak terlihat dalam mentega → から. Pilihan C: によって作られる = dibuat oleh (agen, bukan bahan).'
  },
  {
    id: 'bs4-n4-w6-trans-03', level: 'n4', week: 6, type: 'translation',
    direction: 'id_to_jp',
    prompt: '"Anak itu tampak sangat ketakutan."',
    choices: [
      'その子はとても怖がっている。',
      'その子はとても怖い。',
      'その子はとても怖がる。',
      'その子はとても怖くなっている。'
    ],
    answer: 0,
    grammarIds: ['n4-w6d4-01'],
    explanation: '〜がっている = tampak merasakan (orang ketiga). 怖がっている = tampak ketakutan. Pilihan B: 怖い (langsung menyatakan perasaan orang ketiga — tidak natural dalam bahasa Jepang). Pilihan C: 怖がる (verba dasar, bukan progressive). Pilihan D: 怖くなっている = menjadi takut (proses perubahan).'
  },
  {
    id: 'bs4-n4-w6-trans-04', level: 'n4', week: 6, type: 'translation',
    direction: 'id_to_jp',
    prompt: '"Tiba-tiba hujan mulai turun."',
    choices: [
      '急に雨が降り出した。',
      '急に雨が降り始めた。',
      '急に雨が降るようになった。',
      '急に雨が降ってきた。'
    ],
    answer: 0,
    grammarIds: ['n4-w6d6-02'],
    explanation: '〜出す = mulai tiba-tiba/spontan. 降り出す = mulai turun (mendadak). Pilihan B: 降り始める = mulai turun (netral, bisa terencana — kurang kuat untuk "tiba-tiba"). Pilihan D: 〜てくる = bergerak ke arah (juga bisa natural tapi kurang menekankan spontanitas). 急に＋V出す = kombinasi paling natural untuk "tiba-tiba mulai".'
  },
  {
    id: 'bs4-n4-w6-trans-05', level: 'n4', week: 6, type: 'translation',
    direction: 'id_to_jp',
    prompt: '"Kira-kira apakah toko itu masih buka ya?" (bertanya pada diri sendiri)',
    choices: [
      'あの店、まだ開いてるかな。',
      'あの店、まだ開いてるか。',
      'あの店、まだ開いてるかしら。',
      'あの店、まだ開いてるよね。'
    ],
    answer: 0,
    grammarIds: ['n4-w6d1-01'],
    explanation: 'かな = ya kira-kira (monolog batin, netral/gender-bebas). あの店、まだ開いてるかな = toko itu masih buka ya kira-kira. Pilihan B: 〜か = pertanyaan langsung/tegas (keras, tidak untuk monolog). Pilihan C: かしら = feminin (tradisional). Pilihan D: よね = mencari konfirmasi dari lawan bicara (bukan monolog diri sendiri).'
  },

  // ══════════════════════════════════════════════════════════════
  // N4 W6 — ERROR FIND (bs4-n4-w6-errf-01 ~ 05)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'bs4-n4-w6-errf-01', level: 'n4', week: 6, type: 'error_find',
    choices: [
      'この橋は鉄でできています。',
      '彼女は旅行に行きたがっています。',
      '子供たちに早く寝るなさい、と言った。',
      '急に電話が鳴り出して、びっくりした。'
    ],
    answer: 2,
    correction: '子供たちに「早く寝なさい」と言った。',
    grammarIds: ['n4-w6d4-02'],
    explanation: 'Kalimat C: 「寝るなさい」は間違い。なさい は V連用形(masu-stem)に付く: 寝る → 寝 (masu-stem) ＋ なさい = 寝なさい. NG: 寝るなさい (辞書形不可).'
  },
  {
    id: 'bs4-n4-w6-errf-02', level: 'n4', week: 6, type: 'error_find',
    choices: [
      '「コーヒーにしますか、それとも紅茶にしますか。」',
      '彼は本当に来るかな。心配だな。',
      'ワインはぶどうでできています。',
      '部屋をきれいにしてから、出かけました。'
    ],
    answer: 2,
    correction: 'ワインはぶどうから作られています。',
    grammarIds: ['n4-w6d5-01'],
    explanation: 'Kalimat C: 「ワインはぶどうでできている」は間違い。〜でできている は材料の原形が製品に見えるもの: 机は木でできている（木が見える）。ぶどうは発酵・変質してワインになるため원形が見えない → 「から作られる」を使う。'
  },
  {
    id: 'bs4-n4-w6-errf-03', level: 'n4', week: 6, type: 'error_find',
    choices: [
      '彼女は今どこにいるかしら。',
      '「これ、知ってるかい？」と先輩に聞かれた。',
      '春になると、花が咲き始める。',
      '急に友達が来て、部屋をきれいにするに困った。'
    ],
    answer: 3,
    correction: '急に友達が来て、部屋がきれいでないので困った。',
    grammarIds: ['n4-w6d5-02'],
    explanation: 'Kalimat D: 「きれいにするに困った」は不自然。〜するに困った という接続はない。正しくは: 「部屋がきれいじゃないので困った」（困惑の理由を示す）。または「急に友達が来て、部屋の片付けに困った」。'
  },
  {
    id: 'bs4-n4-w6-errf-04', level: 'n4', week: 6, type: 'error_find',
    choices: [
      '授業中に突然、笑い出してしまった。',
      '「もう帰っていいかい？」と田中さんが聞いてきた。',
      '彼は欲しがるゲームをついに買ってもらった。',
      '「これ、前に話したじゃないか。」と怒られた。'
    ],
    answer: 2,
    correction: '彼は欲しがっていたゲームをついに買ってもらった。',
    grammarIds: ['n4-w6d4-01'],
    explanation: 'Kalimat C: 「欲しがるゲーム」は不自然。がる は状態・感情を表す動詞で、名詞修飾には 〜がっているN が自然。欲しがっているゲーム = game yang (dia) tampak menginginkan. 「欲しがるゲーム」は辞書形での修飾で、習慣的・反復的な意味になり不自然。'
  },
  {
    id: 'bs4-n4-w6-errf-05', level: 'n4', week: 6, type: 'error_find',
    choices: [
      '音楽を小さくしてもらえますか。',
      '彼女は歌い始めると、なかなか止まらない。',
      'もしかして、今日は来られないかもしれない。',
      '「明日は晴れるかしら」と彼が言った。'
    ],
    answer: 3,
    correction: '「明日は晴れるかしら」と彼女が言った。',
    grammarIds: ['n4-w6d1-02'],
    explanation: 'Kalimat D: かしら は伝統的に女性語。男性が「かしら」を使うのは非常に古い/珍しい。現代では男性は「かな」を使う: 「明日は晴れるかな」と彼が言った。または主語を女性に変える: 「彼女が言った」が自然。'
  },

  // ══════════════════════════════════════════════════════════════
  // N4 W6 — MULTI CHOICE (bs4-n4-w6-mc-01 ~ 05)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'bs4-n4-w6-mc-01', level: 'n4', week: 6, type: 'multi_choice',
    context: 'Kamu orang tua yang ingin menyuruh anak berhenti main HP dan segera makan malam. Mana ekspresi yang paling sesuai?',
    choices: [
      'スマホを置いて、ご飯を食べてください。',
      'スマホを置いて、ご飯を食べなさい。',
      'スマホを置いて、ご飯を食べろ。',
      'スマホを置いて、ご飯を食べていいよ。'
    ],
    answer: 1,
    grammarIds: ['n4-w6d4-02'],
    explanation: 'なさい = perintah otoritatif dari orang tua/guru (lebih sopan dari ろ, tapi tetap memerintah). Cocok untuk orang tua ke anak. Pilihan A: てください = permintaan sopan (terlalu halus untuk situasi ini). Pilihan C: 食べろ = kasar/maskulin (terlalu keras). Pilihan D: 食べていいよ = boleh makan (bukan perintah).'
  },
  {
    id: 'bs4-n4-w6-mc-02', level: 'n4', week: 6, type: 'multi_choice',
    context: 'Kamu ingin mengatakan kepada teman: "Bukankah kita sudah sepakat untuk bertemu jam 3?" dengan nada menegaskan (bukan pertanyaan sungguhan). Pilih yang paling tepat.',
    choices: [
      '3時に会う約束をしていたかな。',
      '3時に会う約束をしていたよね。',
      '3時に会う約束をしていたじゃないか。',
      '3時に会う約束をしていたかしら。'
    ],
    answer: 2,
    grammarIds: ['n4-w6d2-02'],
    explanation: 'じゃないか = bukankah (retoris, sudah yakin dan menegaskan). 「〜していたじゃないか」= kan kita sudah... (bernuansa teguran ringan). Pilihan B: よね = mencari konfirmasi (lebih lunak). Pilihan A: かな = monolog/keraguan diri. Pilihan D: かしら = feminin/meragukan.'
  },
  {
    id: 'bs4-n4-w6-mc-03', level: 'n4', week: 6, type: 'multi_choice',
    context: 'Di kelas bahasa Jepang, guru meminta siswa membandingkan ようだ dan みたい. Mana pernyataan yang paling tepat?',
    choices: [
      'ようだ と みたい は全く同じ意味で、どんな場面でも交換できる。',
      'みたい は丁寧な場面、ようだ は普通の場面に使う。',
      'みたい はカジュアルな場面、ようだ はより丁寧・書き言葉的な場面に使う。',
      'ようだ は推測だけを表し、みたい は比喩だけを表す。'
    ],
    answer: 2,
    grammarIds: ['n4-w6d3-02'],
    explanation: 'みたい は会話・カジュアル用 (kasual, percakapan sehari-hari). ようだ はより formal、書き言葉や丁寧な場面向け (tulisan/situasi resmi). Keduanya bisa menyatakan dugaan maupun perumpamaan. Pilihan A: tidak bisa sepenuhnya dipertukarkan (tingkat formalitas berbeda). Pilihan D: keduanya bisa untuk keduanya (dugaan dan perumpamaan).'
  },
  {
    id: 'bs4-n4-w6-mc-04', level: 'n4', week: 6, type: 'multi_choice',
    context: 'Di percakapan sehari-hari, temanmu menanyakan apakah kamu tahu restoran baru di dekat stasiun. Mana yang paling natural untuk pertanyaan kasual?',
    choices: [
      '駅の近くの新しいレストランを知っているか。',
      '駅の近くの新しいレストランを知っているかい？',
      '駅の近くの新しいレストランを知っているかしら？',
      '駅の近くの新しいレストランを知っているでしょうか。'
    ],
    answer: 1,
    grammarIds: ['n4-w6d3-01'],
    explanation: 'かい = pertanyaan kasual, lebih lunak dari か. 「知っているかい？」= kamu tahu? (kasual, akrab). Pilihan A: か = pertanyaan langsung, formal/tegas (agak kaku dalam percakapan kasual). Pilihan C: かしら = feminin (tidak natural untuk semua). Pilihan D: でしょうか = sangat formal (不自然 dalam percakapan teman).'
  },
  {
    id: 'bs4-n4-w6-mc-05', level: 'n4', week: 6, type: 'multi_choice',
    context: 'Seorang teman menceritakan bahwa dia baru saja memulai belajar piano tapi sudah bisa memainkan lagu. Kamu terkejut dan ingin berkata "Wah, kamu berbakat sekali!" Pilih ekspresi yang paling natural.',
    choices: [
      'すごい！天才かな！',
      'すごい！天才じゃないか！',
      'すごい！天才よね！',
      'すごい！天才かしら！'
    ],
    answer: 1,
    grammarIds: ['n4-w6d2-02'],
    explanation: 'じゃないか (intonasi naik + ekspresi kagum) = kan kamu jenius! (terkejut positif). 「天才じゃないか！」= Wah, kamu jenius! Pilihan A: かな = monolog/ragu (kurang ekspresif untuk kekaguman). Pilihan C: よね = mencari konfirmasi (lebih berhati-hati). Pilihan D: かしら = feminin (kurang natural tergantung gender pembicara).'
  }

]; // end window.bankSoalQuiz4
