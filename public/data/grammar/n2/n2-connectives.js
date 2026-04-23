// ──────────────────────────────────────────────────────────────
//  n2-connectives.js — Nugget Nihongo · JLPT N2 Grammar
//  112 entries | Category: connectives
//  Edit directly — merge with: node scripts/merge-grammar.js
// ──────────────────────────────────────────────────────────────

window.grammarN2_Connectives = [

{
    id: 'gn2-00001', level: 'n2', pattern: '〜に反して', reading: '〜ni hanshite',
    meaning: 'bertentangan dengan ... / melawan ...',
    cat: 'contrast-concession',
    connection: 'N + に反して',
    desc: '<b>〜に反して</b> menyatakan bahwa sesuatu terjadi berlawanan dari harapan, aturan, atau kehendak yang disebutkan.',
    examples: [
      { jp: '予想<b>に反して</b>、試験は難しかった。', id: 'Bertentangan dengan perkiraan, ujiannya sulit.' },
      { jp: '親の意志<b>に反して</b>、彼は会社を辞めた。', id: 'Melawan kehendak orang tuanya, dia berhenti dari perusahaan.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

{
    id: 'gn2-00002', level: 'n2', pattern: '〜に加えて', reading: '〜ni kuwaete',
    meaning: 'selain ... / ditambah dengan ...',
    cat: 'listing-addition',
    connection: 'N + に加えて',
    desc: '<b>〜に加えて</b> digunakan untuk menambahkan informasi atau kondisi di atas yang sudah ada.',
    examples: [
      { jp: '寒さ<b>に加えて</b>、風も強かった。', id: 'Selain dingin, anginnya pun kencang.' },
      { jp: '英語<b>に加えて</b>、日本語も話せます。', id: 'Selain bahasa Inggris, saya juga bisa berbahasa Jepang.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

{
    id: 'gn2-00011', level: 'n2', pattern: '〜に基づいて', reading: '〜ni motozuite',
    meaning: 'berdasarkan ... / berlandaskan ...',
    cat: 'quotation-thought',
    connection: 'N + に基づいて',
    desc: '<b>〜に基づいて</b> menyatakan dasar atau landasan dari suatu tindakan atau keputusan.',
    examples: [
      { jp: 'データ<b>に基づいて</b>、報告書を作成した。', id: 'Berdasarkan data, laporan dibuat.' },
      { jp: '法律<b>に基づいて</b>、処罰される。', id: 'Dihukum berdasarkan hukum.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

{
    id: 'gn2-00012', level: 'n2', pattern: '〜はもちろん', reading: '〜wa mochiron',
    meaning: 'sudah tentu ... / tidak hanya ... bahkan ...',
    cat: 'listing-addition',
    connection: 'N + はもちろん',
    desc: '<b>〜はもちろん</b> menyatakan bahwa hal yang disebutkan pertama sudah jelas, dan hal kedua pun juga berlaku.',
    examples: [
      { jp: '日本語<b>はもちろん</b>、英語も話せる。', id: 'Sudah tentu bahasa Jepang, bahasa Inggris pun bisa.' },
      { jp: '大人<b>はもちろん</b>、子供も楽しめる。', id: 'Tidak hanya orang dewasa, anak-anak pun bisa menikmati.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

{
    id: 'gn2-00014', level: 'n2', pattern: '〜どころか', reading: '〜dokoro ka',
    meaning: 'jangankan ... bahkan ... / bukannya ... malah ...',
    cat: 'contrast-concession',
    connection: 'V/Adj plain / N + どころか',
    desc: '<b>〜どころか</b> menyatakan bahwa kenyataannya jauh berbeda (biasanya lebih ekstrem) dari yang diharapkan atau disebutkan.',
    examples: [
      { jp: '褒める<b>どころか</b>、叱られた。', id: 'Bukannya dipuji, malah dimarahi.' },
      { jp: '楽になる<b>どころか</b>、もっと忙しくなった。', id: 'Jangankan santai, malah makin sibuk.' },
    ],
    see_also_grammar: ['gn2-00013'], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

{
    id: 'gn2-00015', level: 'n2', pattern: '〜ものの', reading: '〜mono no',
    meaning: 'meskipun ... / walau ...',
    cat: 'contrast-concession',
    connection: 'V/Adj plain / N + である + ものの',
    desc: '<b>〜ものの</b> menyatakan konsesi: meskipun kondisi pertama terpenuhi, hasilnya tidak sesuai harapan.',
    examples: [
      { jp: '資格は取った<b>ものの</b>、使う機会がない。', id: 'Meskipun sudah dapat sertifikat, tidak ada kesempatan menggunakannya.' },
      { jp: '安い<b>ものの</b>、品質が悪い。', id: 'Walaupun murah, kualitasnya buruk.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

{
    id: 'gn2-00016', level: 'n2', pattern: '〜わけだ', reading: '〜wake da',
    meaning: 'pantas saja ... / memang ... / artinya ...',
    cat: 'reason-cause',
    connection: 'V/Adj plain / N + の + わけだ',
    desc: '<b>〜わけだ</b> digunakan ketika pembicara memahami alasan atau kesimpulan dari suatu situasi.',
    examples: [
      { jp: '彼は10年間日本にいた。日本語が上手な<b>わけだ</b>。', id: 'Dia tinggal 10 tahun di Jepang. Pantas saja bahasa Jepangnya bagus.' },
      { jp: 'そういう<b>わけだ</b>ったのか。', id: 'Jadi begitu ya ceritanya.' },
    ],
    see_also_grammar: ['gn2-00017'], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

{
    id: 'gn2-00024', level: 'n2', pattern: '〜といえば', reading: '〜to ieba',
    meaning: 'berbicara tentang ... / kalau bicara soal ...',
    cat: 'quotation-thought',
    connection: 'N + といえば',
    desc: '<b>〜といえば</b> digunakan untuk memperkenalkan topik atau merespons sesuatu yang baru saja disebutkan.',
    examples: [
      { jp: '桜<b>といえば</b>、京都が有名だ。', id: 'Kalau bicara soal bunga sakura, Kyoto terkenal.' },
      { jp: '夏<b>といえば</b>、花火だね。', id: 'Berbicara tentang musim panas, ya kembang api.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

{
    id: 'gn2-00025', level: 'n2', pattern: '〜をはじめ', reading: '〜wo hajime',
    meaning: 'mulai dari ... / terutama ... dan lainnya',
    cat: 'listing-addition',
    connection: 'N + をはじめ（として）',
    desc: '<b>〜をはじめ</b> memperkenalkan contoh utama/terpenting sebelum menyebutkan yang lain.',
    examples: [
      { jp: '東京<b>をはじめ</b>、多くの都市で開催された。', id: 'Diadakan di banyak kota, mulai dari Tokyo.' },
      { jp: '山田さん<b>をはじめ</b>、全員が賛成した。', id: 'Mulai dari Yamada-san, semua setuju.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

{
    id: 'gn2-00027', level: 'n2', pattern: '〜をもとに', reading: '〜wo moto ni',
    meaning: 'berdasarkan ... / mengacu pada ...',
    cat: 'quotation-thought',
    connection: 'N + をもとに（して）',
    desc: '<b>〜をもとに</b> menyatakan sumber atau bahan dasar dari suatu tindakan atau karya.',
    examples: [
      { jp: '実話<b>をもとに</b>した映画だ。', id: 'Ini film yang didasarkan pada kisah nyata.' },
      { jp: 'アンケート結果<b>をもとに</b>、改善した。', id: 'Diperbaiki berdasarkan hasil kuesioner.' },
    ],
    see_also_grammar: ['gn2-00011'], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

{
    id: 'gn2-00028', level: 'n2', pattern: '〜だけでなく', reading: '〜dake de naku',
    meaning: 'tidak hanya ... tetapi juga ...',
    cat: 'listing-addition',
    connection: 'V/Adj plain / N + だけでなく',
    desc: '<b>〜だけでなく</b> menambahkan informasi tambahan; mirip ばかりでなく dan のみならず.',
    examples: [
      { jp: '彼女は頭がいい<b>だけでなく</b>、心も優しい。', id: 'Dia tidak hanya cerdas, tapi juga baik hati.' },
      { jp: '日本<b>だけでなく</b>、海外でも人気だ。', id: 'Tidak hanya di Jepang, tapi juga populer di luar negeri.' },
    ],
    see_also_grammar: ['gn2-00013'], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

{
  id: 'gn2-00031', level: 'n2', pattern: '〜にもかかわらず', reading: '〜ni mo kakawarazu',
  meaning: 'meskipun ... (formal) / walaupun ...',
  cat: 'contrast-concession',
  connection: 'V-plain / N / Adj-plain + にもかかわらず',
  desc: '<b>〜にもかかわらず</b> menyatakan bahwa hasil sesuatu berlawanan dari yang diharapkan, meskipun ada kondisi atau fakta tertentu. Digunakan dalam konteks formal dan tulisan resmi.',
  nuance: 'Lebih kuat dan formal dibanding のに atau けれども. Cocok untuk laporan, berita, dan teks akademis. Pembicara tidak perlu terlibat secara emosional seperti pada のに.',
  examples: [
    { jp: '雨<b>にもかかわらず</b>、大勢の人が集まった。', id: 'Meskipun hujan, banyak orang yang berkumpul.' },
    { jp: '努力した<b>にもかかわらず</b>、結果は出なかった。', id: 'Meskipun sudah berusaha, hasilnya tidak muncul.' },
    { jp: '反対意見<b>にもかかわらず</b>、計画は進められた。', id: 'Meskipun ada pendapat yang menentang, rencana tetap dilanjutkan.' }
  ],
  see_also_grammar: ['gn2-00032'], see_also_vocab: [],
  confusion_pairs: ['gn2-00032'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00032', level: 'n2', pattern: '〜ものの', reading: '〜mono no',
  meaning: 'meskipun ... (tapi kenyataannya ...)',
  cat: 'contrast-concession',
  connection: 'V-plain / Adj-plain / N + ではある + ものの',
  desc: '<b>〜ものの</b> mengakui kondisi di bagian pertama kalimat, lalu menunjukkan bahwa bagian kedua berlawanan dari harapan atau logika yang semestinya.',
  nuance: 'Lebih formal dari けど atau が. Sering muncul dalam teks tulisan. Berbeda dari にもかかわらず — ものの terasa lebih reflektif dan personal, sedangkan にもかかわらず lebih objektif.',
  examples: [
    { jp: '合格した<b>ものの</b>、喜ぶ気になれなかった。', id: 'Meskipun lulus, tidak bisa merasa senang.' },
    { jp: '買った<b>ものの</b>、まだ一度も使っていない。', id: 'Meskipun sudah dibeli, belum pernah dipakai sekalipun.' },
    { jp: '日本語を勉強している<b>ものの</b>、会話はまだ難しい。', id: 'Meskipun sedang belajar bahasa Jepang, percakapan masih sulit.' }
  ],
  see_also_grammar: ['gn2-00031'], see_also_vocab: [],
  confusion_pairs: ['gn2-00031'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00033', level: 'n2', pattern: '〜だけでなく〜も', reading: '〜dake de naku 〜mo',
  meaning: 'bukan hanya A, tapi juga B',
  cat: 'listing-addition',
  connection: 'N / V-plain / Adj + だけでなく + [elemen tambahan] + も',
  desc: '<b>〜だけでなく〜も</b> digunakan untuk menambahkan informasi — menyatakan bahwa tidak hanya A yang berlaku, melainkan B juga termasuk.',
  nuance: 'Dapat digunakan dalam konteks formal maupun informal. Lebih tegas dari も saja karena secara eksplisit menekankan "bukan hanya". Bandingkan dengan のみならず yang lebih formal.',
  examples: [
    { jp: '彼は英語<b>だけでなく</b>、フランス語<b>も</b>話せる。', id: 'Dia tidak hanya bisa bahasa Inggris, tapi juga bahasa Prancis.' },
    { jp: '子ども<b>だけでなく</b>、大人<b>も</b>楽しめるイベントです。', id: 'Ini adalah acara yang tidak hanya bisa dinikmati anak-anak, tapi orang dewasa juga.' },
    { jp: '体<b>だけでなく</b>、心<b>も</b>疲れている。', id: 'Bukan hanya badan, tapi hati pun sudah lelah.' }
  ],
  see_also_grammar: ['gn2-00046', 'gn2-00034'], see_also_vocab: [],
  confusion_pairs: ['gn2-00046', 'gn2-00034'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00034', level: 'n2', pattern: '〜に限らず', reading: '〜ni kagirazu',
  meaning: 'tidak terbatas pada ... / tidak hanya ...',
  cat: 'listing-addition',
  connection: 'N + に限らず',
  desc: '<b>〜に限らず</b> menyatakan bahwa sesuatu tidak terbatas hanya pada satu hal atau kelompok tertentu — berlaku lebih luas dari yang disebutkan.',
  nuance: 'Lebih formal dari だけでなく. Sering dipakai dalam tulisan dan pengumuman resmi. Subyek yang mengikuti に限らず biasanya merupakan kategori atau kelompok (bukan individu).',
  examples: [
    { jp: '日本人<b>に限らず</b>、外国人も参加できます。', id: 'Tidak terbatas hanya warga Jepang, orang asing pun bisa ikut serta.' },
    { jp: '社員<b>に限らず</b>、家族も招待されました。', id: 'Tidak hanya karyawan, keluarga pun diundang.' },
    { jp: '大都市<b>に限らず</b>、地方でも問題が起きている。', id: 'Bukan hanya di kota besar, masalah juga terjadi di daerah.' }
  ],
  see_also_grammar: ['gn2-00033', 'gn2-00046'], see_also_vocab: [],
  confusion_pairs: ['gn2-00033'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00035', level: 'n2', pattern: '〜どころか', reading: '〜doko ro ka',
  meaning: 'jauh dari itu / bahkan ... (malah sebaliknya)',
  cat: 'contrast-concession',
  connection: 'V-plain / N / Adj-plain + どころか',
  desc: '<b>〜どころか</b> menyangkal anggapan sebelumnya dan menyatakan bahwa kenyataannya justru jauh berbeda — bahkan bisa kebalikannya.',
  nuance: 'Sangat berbeda dari のに atau ものの. どころか mengandung unsur kejutan atau bantahan yang kuat. Sering diikuti penegasan seperti むしろ atau さえ.',
  examples: [
    { jp: '休む<b>どころか</b>、残業が増えた。', id: 'Bukannya istirahat, malah lembur semakin banyak.' },
    { jp: '謝る<b>どころか</b>、怒り出した。', id: 'Bukannya minta maaf, malah marah.' },
    { jp: '楽になる<b>どころか</b>、もっと大変になった。', id: 'Bukannya menjadi lebih mudah, malah semakin berat.' }
  ],
  see_also_grammar: ['gn2-00036'], see_also_vocab: [],
  confusion_pairs: ['gn2-00036'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00038', level: 'n2', pattern: '〜に対して', reading: '〜ni taishite',
  meaning: 'terhadap ... / sedangkan ... / berbanding dengan ...',
  cat: 'contrast-concession',
  connection: 'N + に対して / に対する + N',
  desc: '<b>〜に対して</b> memiliki dua fungsi utama: (1) menunjukkan arah atau sasaran tindakan, (2) membandingkan dua hal yang berlawanan atau berbeda.',
  nuance: 'Ketika dipakai untuk kontras, に対して bersifat objektif — cocok untuk tulisan formal. Berbeda dari 一方で yang juga kontras tetapi lebih berstruktur naratif.',
  examples: [
    { jp: '弟が内向的<b>に対して</b>、姉は社交的だ。', id: 'Berbanding dengan adik yang introvert, kakak perempuannya ekstrovert.' },
    { jp: '昨年の売上<b>に対して</b>、今年は大幅に増加した。', id: 'Dibandingkan penjualan tahun lalu, tahun ini meningkat drastis.' },
    { jp: '先生の質問<b>に対して</b>、学生が答えた。', id: 'Terhadap pertanyaan guru, murid-murid menjawab.' }
  ],
  see_also_grammar: ['gn2-00051', 'gn2-00052'], see_also_vocab: [],
  confusion_pairs: ['gn2-00051'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00042', level: 'n2', pattern: '〜によって / 〜による', reading: '〜ni yotte / 〜ni yoru',
  meaning: 'oleh ... / tergantung pada ... / karena ... (varian makna)',
  cat: 'reason-cause',
  connection: 'N + によって / による + N',
  desc: '<b>〜によって</b> memiliki beberapa makna sekaligus: (1) pelaku dalam kalimat pasif, (2) cara/metode ("melalui/dengan cara"), (3) penyebab, (4) variasi tergantung kondisi.',
  nuance: 'Pola ini sangat multifungsi. Untuk makna "tergantung", よって tidak bisa diganti で. Bentuk attributif による sering muncul dalam berita: 〜による被害 (kerugian akibat ...).',
  examples: [
    { jp: 'この小説はある作家<b>によって</b>書かれた。', id: 'Novel ini ditulis oleh seorang penulis tertentu.' },
    { jp: '人<b>によって</b>、意見が異なる。', id: 'Tergantung orangnya, pendapat bisa berbeda-beda.' },
    { jp: '台風<b>による</b>被害が広がっている。', id: 'Kerusakan akibat topan terus meluas.' }
  ],
  see_also_grammar: ['gn2-00041', 'gn2-00043'], see_also_vocab: [],
  confusion_pairs: ['gn2-00041', 'gn2-00043'],
  register: null, exceptions: null, notes: 'Pelajari tiap makna secara terpisah karena masing-masing memiliki konteks yang berbeda.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00044', level: 'n2', pattern: '〜をはじめ / 〜をはじめとして', reading: '〜wo hajime / 〜wo hajime to shite',
  meaning: 'dimulai dari ... / termasuk ... / antara lain ...',
  cat: 'listing-addition',
  connection: 'N (representatif) + をはじめ / をはじめとして + N (kelompok/tambahan)',
  desc: '<b>〜をはじめ</b> memperkenalkan daftar dengan menyebut satu contoh paling representatif, lalu mengisyaratkan bahwa masih ada anggota lain dalam kelompok tersebut.',
  nuance: 'Nomina pertama harus yang paling menonjol atau penting dalam kelompok. Berbeda dari など yang hanya menambahkan contoh tanpa hierarki.',
  examples: [
    { jp: '東京<b>をはじめ</b>、全国各地でイベントが開催された。', id: 'Dimulai dari Tokyo, acara diselenggarakan di berbagai penjuru negeri.' },
    { jp: '社長<b>をはじめとして</b>、全員が参加した。', id: 'Dimulai dari direktur, semua orang ikut serta.' },
    { jp: '日本語<b>をはじめ</b>、アジアの言語に興味がある。', id: 'Saya tertarik pada bahasa-bahasa Asia, terutama dimulai dari bahasa Jepang.' }
  ],
  see_also_grammar: ['gn2-00033', 'gn2-00046'], see_also_vocab: [],
  confusion_pairs: ['gn2-00046'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00046', level: 'n2', pattern: '〜のみならず', reading: '〜nomi narazu',
  meaning: 'tidak hanya ... (formal/tulisan)',
  cat: 'listing-addition',
  connection: 'V-plain / N / Adj + のみならず',
  desc: '<b>〜のみならず</b> adalah padanan formal dari だけでなく — menyatakan bahwa tidak hanya A, tapi B juga termasuk. Hampir eksklusif digunakan dalam tulisan formal.',
  nuance: 'Setara dengan だけでなく dalam makna, tetapi jauh lebih formal dan kaku. Tidak lazim dalam percakapan sehari-hari. Sering muncul dalam pidato, teks akademis, dan berita.',
  examples: [
    { jp: 'この問題は学生<b>のみならず</b>、教師にも関係する。', id: 'Masalah ini tidak hanya berkaitan dengan siswa, tetapi juga dengan guru.' },
    { jp: '健康<b>のみならず</b>、精神的な安定も重要だ。', id: 'Tidak hanya kesehatan fisik, keseimbangan mental pun penting.' },
    { jp: '国内<b>のみならず</b>、海外でも評価されている。', id: 'Tidak hanya diakui di dalam negeri, tapi juga dihargai di luar negeri.' }
  ],
  see_also_grammar: ['gn2-00033', 'gn2-00034'], see_also_vocab: [],
  confusion_pairs: ['gn2-00033', 'gn2-00044'],
  register: 'written', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00048', level: 'n2', pattern: '〜さえ〜ても', reading: '〜sae 〜temo',
  meaning: 'bahkan jika ... (pun tetap ...)',
  cat: 'contrast-concession',
  connection: 'N + さえ + V-te + も / Adj + くさえあっても',
  desc: '<b>〜さえ〜ても</b> mengungkapkan kondisi ekstrem yang diikuti hasil yang tidak berubah. Menyatakan bahwa bahkan dalam kasus paling ekstrem sekalipun, hasilnya tetap sama.',
  nuance: 'Berbeda dari さえ〜ば yang kondisional-positif, さえ〜ても bersifat kontraharapan. Menekankan bahwa bahkan kondisi yang paling sulit tidak mengubah kenyataan.',
  examples: [
    { jp: '努力<b>さえし</b>ても、全員が合格するわけではない。', id: 'Bahkan jika berusaha sekalipun, tidak berarti semua orang bisa lulus.' },
    { jp: 'お金<b>さえあっても</b>、幸せになれるとは限らない。', id: 'Bahkan jika punya uang sekalipun, belum tentu bisa bahagia.' },
    { jp: '謝って<b>さえいても</b>、許されないこともある。', id: 'Bahkan jika sudah meminta maaf sekalipun, kadang tidak dimaafkan.' }
  ],
  see_also_grammar: ['gn2-00047'], see_also_vocab: [],
  confusion_pairs: ['gn2-00047'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00051', level: 'n2', pattern: '〜一方で', reading: '〜ippou de',
  meaning: 'di satu sisi ... di sisi lain ... / sementara itu ...',
  cat: 'contrast-concession',
  connection: 'V-plain / Adj-plain / N + である + 一方で',
  desc: '<b>〜一方で</b> digunakan untuk menyandingkan dua fakta atau tindakan yang berbeda, sering kali berlawanan atau kontras, yang dimiliki oleh subjek yang sama atau situasi yang sama.',
  nuance: 'Berbeda dari に対して yang membandingkan dua subjek berbeda, 一方で sering menggambarkan dua sisi dari satu hal yang sama. Bisa juga berarti "sementara itu" (progresif paralel).',
  examples: [
    { jp: '便利になった<b>一方で</b>、プライバシーの問題も増えた。', id: 'Di satu sisi menjadi lebih praktis, di sisi lain masalah privasi pun bertambah.' },
    { jp: '彼は優しい<b>一方で</b>、とても厳しい面もある。', id: 'Di satu sisi dia baik hati, di sisi lain ada sisi yang sangat tegas.' },
    { jp: '勉強している<b>一方で</b>、アルバイトもしている。', id: 'Di satu sisi sedang belajar, di sisi lain juga bekerja paruh waktu.' }
  ],
  see_also_grammar: ['gn2-00052', 'gn2-00038'], see_also_vocab: [],
  confusion_pairs: ['gn2-00052', 'gn2-00038'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00052', level: 'n2', pattern: '〜反面', reading: '〜hanmen',
  meaning: 'di satu sisi ... di sisi lain ... (formal — dua sisi berlawanan)',
  cat: 'contrast-concession',
  connection: 'V-plain / Adj-plain / N + である + 反面',
  desc: '<b>〜反面</b> menyatakan bahwa suatu hal memiliki dua sisi yang bertentangan — kelebihan dan kekurangan, atau sifat positif dan negatif secara bersamaan.',
  nuance: 'Lebih formal dan kuat dari 一方で. 反面 (harfiah: "sisi sebaliknya") menyiratkan adanya kontradiksi inheren dalam satu hal yang sama. Tidak bisa digunakan untuk dua subjek berbeda.',
  examples: [
    { jp: 'この薬は効果がある<b>反面</b>、副作用も強い。', id: 'Obat ini efektif, namun di sisi lain efek sampingnya juga kuat.' },
    { jp: '都市生活は便利な<b>反面</b>、孤独を感じやすい。', id: 'Kehidupan kota itu nyaman, namun di sisi lain mudah merasa kesepian.' },
    { jp: '彼は頭が良い<b>反面</b>、コミュニケーションが苦手だ。', id: 'Dia cerdas, namun di sisi lain lemah dalam berkomunikasi.' }
  ],
  see_also_grammar: ['gn2-00051'], see_also_vocab: [],
  confusion_pairs: ['gn2-00051'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00056', level: 'n2', pattern: '〜を通じて / 〜を通して', reading: '〜wo tsuujite / 〜wo tooshite',
  meaning: 'melalui ... / lewat ... / sepanjang ...',
  cat: 'purpose',
  connection: 'N (media/periode) + を通じて / を通して',
  desc: '<b>〜を通じて</b> dan <b>〜を通して</b> menyatakan saluran, media, atau metode yang digunakan untuk melakukan sesuatu, atau rentang waktu yang berkelanjutan. Keduanya hampir sinonim.',
  nuance: 'を通じて lebih sering untuk media/perantara dan rentang waktu. を通して lebih sering untuk proses pengalaman langsung. Keduanya bisa saling menggantikan dalam banyak konteks.',
  examples: [
    { jp: 'インターネット<b>を通じて</b>、世界中の人とつながれる。', id: 'Melalui internet, kita bisa terhubung dengan orang di seluruh dunia.' },
    { jp: '旅行<b>を通して</b>、多くのことを学んだ。', id: 'Melalui perjalanan, saya belajar banyak hal.' },
    { jp: '一年<b>を通じて</b>、気温の変化が少ない。', id: 'Sepanjang tahun, perubahan suhu tidak banyak.' }
  ],
  see_also_grammar: ['gn2-00057'], see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null, notes: 'を通じて — lebih untuk media/perantara dan rentang waktu. を通して — lebih untuk pengalaman atau proses.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00057', level: 'n2', pattern: '〜ことから', reading: '〜koto kara',
  meaning: 'dari fakta bahwa ... / karena (berdasarkan fakta) ...',
  cat: 'reason-cause',
  connection: 'V-plain / Adj-plain / N + であること + から',
  desc: '<b>〜ことから</b> menyatakan bahwa suatu kesimpulan, nama, atau keputusan diambil berdasarkan fakta atau keadaan tertentu yang diamati.',
  nuance: 'Berbeda dari から atau ので yang umum, ことから menekankan bahwa alasannya adalah sebuah fakta atau observasi konkret — lebih logis dan objektif.',
  examples: [
    { jp: '花が多いこと<b>から</b>、この町は「花の町」と呼ばれている。', id: 'Karena banyaknya bunga, kota ini disebut "Kota Bunga".' },
    { jp: '試験の点数が下がっていること<b>から</b>、勉強不足だとわかる。', id: 'Dari fakta menurunnya nilai ujian, dapat diketahui bahwa belajarnya kurang.' },
    { jp: '毎日遅刻すること<b>から</b>、彼の時間管理に問題があると思われる。', id: 'Dari fakta dia terlambat setiap hari, diduga ada masalah dalam manajemen waktunya.' }
  ],
  see_also_grammar: ['gn2-00056', 'gn2-00060'], see_also_vocab: [],
  confusion_pairs: ['gn2-00060'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00060', level: 'n2', pattern: '〜だけあって', reading: '〜dake atte',
  meaning: 'memang karena ... / pantas saja karena ... / wajar saja ...',
  cat: 'reason-cause',
  connection: 'V-plain / Adj-plain / N + だけあって',
  desc: '<b>〜だけあって</b> menyatakan bahwa hasil atau kualitas yang ada sesuai ekspektasi berdasarkan latar belakang atau reputasi yang diketahui. Mengandung kesan pengakuan dan pujian.',
  nuance: 'Selalu mengandung konotasi positif atau setidaknya netral. Tidak bisa digunakan untuk hal negatif yang tidak diinginkan. Berbeda dari ことから yang lebih analitis/objektif.',
  examples: [
    { jp: 'プロ<b>だけあって</b>、演奏は素晴らしかった。', id: 'Memang karena dia seorang profesional, penampilannya luar biasa.' },
    { jp: '10年のキャリア<b>だけあって</b>、仕事が速い。', id: 'Pantas saja, dengan pengalaman 10 tahun, pekerjaannya cepat.' },
    { jp: '高い料理<b>だけあって</b>、味は格別だった。', id: 'Memang karena harganya mahal, rasanya istimewa.' }
  ],
  see_also_grammar: ['gn2-00057'], see_also_vocab: [],
  confusion_pairs: ['gn2-00057'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00085', level: 'n2', pattern: '〜上は', reading: '〜ue wa',
  meaning: 'karena sudah memutuskan ... maka harus ... (tanggung jawab yang mengikuti)',
  cat: 'reason-cause',
  connection: 'V-ta / V-dict + 上は',
  desc: '<b>〜上は</b> menyatakan bahwa karena suatu keputusan atau situasi sudah ada, maka konsekuensi atau tanggung jawab tertentu harus dipenuhi secara penuh.',
  nuance: 'Lebih formal dibanding からには. 上は lebih sering dalam tulisan. Nuansanya: tanggung jawab yang muncul secara logis dari keputusan yang sudah dibuat.',
  examples: [
    { jp: '引き受けた<b>上は</b>、最後まで責任を持ってやり遂げる。', id: 'Karena sudah menerima tanggung jawab ini, harus diselesaikan sampai akhir.' },
    { jp: 'チームに入った<b>上は</b>、全力で取り組む覚悟が必要だ。', id: 'Karena sudah masuk tim, perlu tekad untuk berusaha sepenuh hati.' },
    { jp: '決めた<b>上は</b>、迷わずに進むべきだ。', id: 'Karena sudah diputuskan, seharusnya maju tanpa ragu.' }
  ],
  see_also_grammar: ['gn2-00086', 'gn2-00087'], see_also_vocab: [],
  confusion_pairs: ['gn2-00086', 'gn2-00087'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00086', level: 'n2', pattern: '〜以上は', reading: '〜ijō wa',
  meaning: 'karena sudah ... maka wajib ... / mengingat bahwa ...',
  cat: 'reason-cause',
  connection: 'V-dict / V-ta / N + である + 以上は',
  desc: '<b>〜以上は</b> menyatakan bahwa karena fakta atau kondisi tertentu sudah ada, maka suatu konsekuensi atau kewajiban secara logis harus diikuti.',
  nuance: 'Hampir identik dengan からには dalam fungsi. 以上は terasa sedikit lebih formal. Perbedaan halus: からには lebih menekankan tekad personal; 以上は lebih menekankan konsekuensi logis.',
  examples: [
    { jp: 'プロである<b>以上は</b>、常に最高のパフォーマンスを見せなければならない。', id: 'Karena sudah jadi profesional, harus selalu menampilkan performa terbaik.' },
    { jp: '約束した<b>以上は</b>、必ず守るべきだ。', id: 'Karena sudah berjanji, harus ditepati.' },
    { jp: '参加する<b>以上は</b>、ルールを守る必要がある。', id: 'Karena ikut berpartisipasi, perlu mematuhi aturan.' }
  ],
  see_also_grammar: ['gn2-00085', 'gn2-00087'], see_also_vocab: [],
  confusion_pairs: ['gn2-00085', 'gn2-00087'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00087', level: 'n2', pattern: '〜からには', reading: '〜kara ni wa',
  meaning: 'karena sudah ... maka harus ... (tekad kuat berdasarkan pilihan)',
  cat: 'reason-cause',
  connection: 'V-dict / V-ta + からには',
  desc: '<b>〜からには</b> menyatakan bahwa mengingat fakta atau keputusan yang ada, pembicara bertekad atau berkewajiban untuk melakukan sesuatu. Lebih menekankan tekad diri sendiri.',
  nuance: 'Lebih menekankan tekad personal dibanding 以上は dan 上は. Paling sering muncul dalam pernyataan tekad diri: "karena sudah memilih ini, saya akan benar-benar ...".',
  examples: [
    { jp: 'やると決めた<b>からには</b>、途中で諦めない。', id: 'Karena sudah memutuskan untuk melakukannya, tidak akan menyerah di tengah jalan.' },
    { jp: '日本に来た<b>からには</b>、日本語をマスターしたい。', id: 'Karena sudah datang ke Jepang, ingin menguasai bahasa Jepang.' },
    { jp: '勝負に出た<b>からには</b>、全力を尽くす。', id: 'Karena sudah terjun bersaing, akan berusaha sepenuh kemampuan.' }
  ],
  see_also_grammar: ['gn2-00085', 'gn2-00086'], see_also_vocab: [],
  confusion_pairs: ['gn2-00085', 'gn2-00086', 'gn2-00088'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00088', level: 'n2', pattern: '〜手前', reading: '〜temae',
  meaning: 'karena sudah terlanjur ... di depan orang, tidak bisa mundur',
  cat: 'reason-cause',
  connection: 'V-dict / V-ta / N + の + 手前',
  desc: '<b>〜手前</b> menyatakan bahwa karena pembicara sudah mengatakan atau melakukan sesuatu di depan orang lain, ada tekanan sosial untuk menjaga konsistensi — tidak bisa mundur karena menjaga muka atau wibawa.',
  nuance: 'Berbeda dari からには yang berbasis tekad. 手前 lebih menekankan tekanan sosial eksternal: "karena sudah terlanjur dilihat orang, tidak bisa tidak melanjutkan". Nuansanya lebih sosial dan terkait muka.',
  examples: [
    { jp: '大口をたたいた<b>手前</b>、失敗するわけにはいかない。', id: 'Karena sudah sesumbar di depan orang, tidak bisa gagal.' },
    { jp: '自分で言い出した<b>手前</b>、やらないわけにはいかない。', id: 'Karena sudah saya sendiri yang bilang, tidak bisa tidak melakukannya.' },
    { jp: '部下の<b>手前</b>、ミスを認めにくい。', id: 'Di depan bawahan, sulit untuk mengakui kesalahan.' }
  ],
  see_also_grammar: ['gn2-00087'], see_also_vocab: [],
  confusion_pairs: ['gn2-00087'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00091',
  level: 'n2',
  pattern: '〜のみならず',
  reading: '〜nomi narazu',
  meaning: 'tidak hanya ... (tetapi juga ...)',
  cat: 'listing-addition',
  connection: 'V-plain / Adj-plain / N + のみならず',
  desc: '<b>〜のみならず</b> menyatakan "tidak hanya X tetapi juga Y". Setara dengan だけでなく tapi lebih formal dan banyak ditemukan dalam bahasa tulisan.',
  nuance: 'Register written/formal — hindari dalam percakapan sehari-hari. Lebih kuat dan lebih luas cakupannya dibanding だけでなく; biasa muncul di berita, laporan, dan esai akademis.',
  examples: [
    { jp: '彼は成績が優秀な<b>のみならず</b>、スポーツも得意だ。', id: 'Dia tidak hanya berprestasi dalam pelajaran, tetapi juga pandai olahraga.' },
    { jp: 'この政策は国内<b>のみならず</b>、海外にも大きな影響を与えた。', id: 'Kebijakan ini tidak hanya berdampak di dalam negeri, tetapi juga di luar negeri.' },
    { jp: '環境問題は一国<b>のみならず</b>、全人類が取り組むべき課題だ。', id: 'Masalah lingkungan bukan hanya tanggung jawab satu negara, melainkan seluruh umat manusia.' }
  ],
  see_also_grammar: ['gn2-00092', 'gn2-00093', 'gn2-00094'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00092', 'gn2-00093', 'gn2-00094'],
  register: 'written',
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00092',
  level: 'n2',
  pattern: '〜はもとより',
  reading: '〜wa moto yori',
  meaning: 'sudah pasti ... / tidak perlu dikatakan lagi ..., bahkan juga ...',
  cat: 'listing-addition',
  connection: 'N + はもとより',
  desc: '<b>〜はもとより</b> menyatakan bahwa hal pertama sudah merupakan sesuatu yang sudah pasti/jelas terjadi, lalu menambahkan hal kedua yang cakupannya lebih luas atau mengejutkan.',
  nuance: 'Lebih formal dari はもちろん dan lebih sering muncul dalam tulisan. Menekankan bahwa X adalah hal yang "sudah semestinya", sebelum menambahkan Y yang mungkin tak terduga.',
  examples: [
    { jp: '英語<b>はもとより</b>、中国語も流暢に話せます。', id: 'Bahasa Inggris sudah pasti, bahkan bahasa Mandarin pun bisa berbicara dengan lancar.' },
    { jp: '専門家<b>はもとより</b>、一般市民もこの問題に強い関心を示している。', id: 'Sudah pasti para ahli, bahkan masyarakat umum pun menunjukkan perhatian besar terhadap masalah ini.' }
  ],
  see_also_grammar: ['gn2-00091', 'gn2-00093', 'gn2-00096'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00091', 'gn2-00093', 'gn2-00096'],
  register: 'formal',
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00093',
  level: 'n2',
  pattern: '〜はもちろん',
  reading: '〜wa mochiron',
  meaning: 'tentu saja ... / sudah jelas ..., dan (tidak ketinggalan) ...',
  cat: 'listing-addition',
  connection: 'N + はもちろん',
  desc: '<b>〜はもちろん</b> menyatakan bahwa X sudah pasti/jelas, kemudian menambahkan Y. Sedikit lebih kasual dan lebih luas penggunaannya dibanding はもとより.',
  nuance: 'Bisa muncul dalam percakapan semi-formal maupun tulisan. Tidak sekuat はもとより dalam hal keformalan, tapi sama-sama menyiratkan "X sudah tentu, apalagi Y".',
  examples: [
    { jp: '日本語<b>はもちろん</b>、文化についても深く勉強したい。', id: 'Bahasa Jepang tentu saja, aku juga ingin belajar lebih dalam tentang budayanya.' },
    { jp: '彼女は料理<b>はもちろん</b>、掃除も得意だ。', id: 'Sudah pasti soal memasak, dia juga pandai membersihkan rumah.' }
  ],
  see_also_grammar: ['gn2-00091', 'gn2-00092'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00091', 'gn2-00092'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00096',
  level: 'n2',
  pattern: '〜もさることながら',
  reading: '〜mo saru koto nagara',
  meaning: 'sudah tentu ... (tapi yang tidak kalah penting / bahkan lebih dari itu ...)',
  cat: 'listing-addition',
  connection: 'N + もさることながら',
  desc: '<b>〜もさることながら</b> menyatakan bahwa X memang sudah pasti/diakui, tapi Y bahkan lebih menonjol, penting, atau mengesankan.',
  nuance: 'Sangat formal dan hampir eksklusif untuk tulisan. Berbeda dari はもとより: もさることながら lebih menyiratkan "X itu sudah jelas hebat, tapi Y justru lebih lagi". Jarang sekali dalam percakapan.',
  examples: [
    { jp: '技術力<b>もさることながら</b>、彼の粘り強い努力には頭が下がる。', id: 'Sudah tentu soal kemampuan teknisnya, tapi ketekunannya justru lebih mengesankan.' },
    { jp: '景色<b>もさることながら</b>、地元の料理が旅の一番の思い出になった。', id: 'Pemandangannya sudah tentu indah, tapi makanan lokalnya justru menjadi kenangan terbaik dari perjalanan itu.' }
  ],
  see_also_grammar: ['gn2-00092', 'gn2-00091'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00092'],
  register: 'written',
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00097',
  level: 'n2',
  pattern: '〜いかんにかかわらず',
  reading: '〜ikan ni kakawarazu',
  meaning: 'terlepas dari ... / tidak peduli bagaimana keadaan ...',
  cat: 'contrast-concession',
  connection: 'N + いかんにかかわらず',
  desc: '<b>〜いかんにかかわらず</b> menyatakan bahwa hasil atau tindakan tidak dipengaruhi oleh kondisi atau variabel yang disebutkan — "apapun yang terjadi dengan X, hasilnya tetap sama".',
  nuance: 'Sangat formal; umum dalam dokumen resmi, kontrak, pengumuman institusi. Jauh lebih kuat dari にかかわらず biasa. Kontras dengan いかんによって: di sini kondisi TIDAK menentukan hasil.',
  examples: [
    { jp: '結果<b>いかんにかかわらず</b>、最善を尽くします。', id: 'Terlepas dari hasilnya bagaimana, kami akan berupaya sebaik-baiknya.' },
    { jp: '理由<b>いかんにかかわらず</b>、期限内の提出が義務付けられています。', id: 'Terlepas dari alasan apapun, pengumpulan sebelum batas waktu adalah kewajiban.' }
  ],
  see_also_grammar: ['gn2-00099'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00099'],
  register: 'formal',
  exceptions: null,
  notes: 'いかん adalah kata formal yang berarti "keadaan/kondisi". Bentuk lain: いかんを問わず (sama artinya, sedikit lebih formal).',
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00098',
  level: 'n2',
  pattern: '〜をものともせず',
  reading: '〜wo mono to mo sezu',
  meaning: 'tanpa mempedulikan ... / tidak menjadikan ... sebagai halangan',
  cat: 'contrast-concession',
  connection: 'N + をものともせず',
  desc: '<b>〜をものともせず</b> menyatakan bahwa subjek menghadapi atau melewati rintangan/kesulitan yang disebutkan tanpa menjadikannya hambatan.',
  nuance: 'Selalu berkonotasi positif atau heroik — memuji keberanian, ketabahan, atau determinasi subjek. TIDAK digunakan untuk hal negatif. Berbeda dari をよそに yang berkonotasi mengabaikan perasaan orang lain.',
  examples: [
    { jp: '激しい嵐<b>をものともせず</b>、船は航海を続けた。', id: 'Tanpa mempedulikan badai yang ganas, kapal terus berlayar.' },
    { jp: '激しい批判<b>をものともせず</b>、彼は改革を断行した。', id: 'Tanpa tergoyahkan oleh kritik keras, dia melaksanakan reformasi.' }
  ],
  see_also_grammar: ['gn2-00100'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00100'],
  register: 'formal',
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00100',
  level: 'n2',
  pattern: '〜をよそに',
  reading: '〜wo yoso ni',
  meaning: 'mengabaikan ... / tidak peduli terhadap ... (situasi atau perasaan sekitar)',
  cat: 'contrast-concession',
  connection: 'N + をよそに',
  desc: '<b>〜をよそに</b> menyatakan bahwa subjek bertindak seolah tidak peduli terhadap kondisi, kekhawatiran, atau perasaan pihak lain yang disebutkan.',
  nuance: 'Sering berkonotasi negatif ringan — subjek tampak egois atau tidak berempati. Berbeda dari をものともせず yang heroik: をよそに lebih netral hingga sedikit negatif. Register written/agak formal.',
  examples: [
    { jp: '親の心配<b>をよそに</b>、子供たちは楽しそうに遊んでいた。', id: 'Mengabaikan kekhawatiran orang tua, anak-anak tetap bermain dengan riang gembira.' },
    { jp: '世間の批判<b>をよそに</b>、彼は独自の道を歩み続けた。', id: 'Mengabaikan kritik masyarakat, dia terus berjalan di jalannya sendiri.' }
  ],
  see_also_grammar: ['gn2-00098'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00098'],
  register: 'written',
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00101',
  level: 'n2',
  pattern: '〜に即して',
  reading: '〜ni soku shite',
  meaning: 'sesuai dengan kenyataan ... / berdasarkan situasi aktual ...',
  cat: 'reason-cause',
  connection: 'N + に即して / に即した (+ N)',
  desc: '<b>〜に即して</b> menyatakan bahwa sesuatu dilakukan sesuai dengan realita, fakta di lapangan, atau kondisi aktual yang disebutkan — bukan sekadar teori.',
  nuance: 'Menekankan kesesuaian dengan "kenyataan nyata di lapangan". Berbeda dari に基づいて yang bertumpu pada data/teori/hukum: に即して lebih menekankan pada realita praktis dan situasi yang hidup.',
  examples: [
    { jp: '実態<b>に即した</b>政策を立案することが求められている。', id: 'Dibutuhkan perumusan kebijakan yang sesuai dengan kondisi nyata di lapangan.' },
    { jp: '状況<b>に即して</b>柔軟に対応してください。', id: 'Tolong tanggapi dengan fleksibel sesuai situasi yang ada.' }
  ],
  see_also_grammar: ['gn2-00103', 'gn2-00102'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00103'],
  register: 'formal',
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00103',
  level: 'n2',
  pattern: '〜に基づいて / 〜にもとづいて',
  reading: '〜ni motozuite',
  meaning: 'berdasarkan ... / berlandaskan ...',
  cat: 'reason-cause',
  connection: 'N + に基づいて / に基づいた (+ N)',
  desc: '<b>〜に基づいて</b> menyatakan bahwa sesuatu dilakukan berlandaskan data, bukti, hukum, teori, atau prinsip tertentu yang disebutkan.',
  nuance: 'Menekankan fondasi intelektual, legal, atau faktual dari suatu tindakan atau keputusan. Sangat umum dalam dokumen resmi, laporan akademis, dan konteks hukum. Berbeda dari に即して yang menekankan realita lapangan.',
  examples: [
    { jp: '証拠<b>に基づいて</b>判断を下した。', id: 'Keputusan diambil berdasarkan bukti yang ada.' },
    { jp: 'この規則<b>に基づいて</b>、手続きが行われます。', id: 'Prosedur dilaksanakan berdasarkan aturan ini.' },
    { jp: 'データ<b>に基づいた</b>分析が必要だ。', id: 'Diperlukan analisis yang berlandaskan data.' }
  ],
  see_also_grammar: ['gn2-00101', 'gn2-00102'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00101', 'gn2-00102'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00109',
  level: 'n2',
  pattern: '〜をめどに',
  reading: '〜wo medo ni',
  meaning: 'dengan target ... / dengan patokan waktu ... / paling lambat ...',
  cat: 'purpose',
  connection: 'N (waktu/angka) + をめどに / をめどとして',
  desc: '<b>〜をめどに</b> menyatakan suatu target waktu atau angka yang dijadikan patokan, dengan nuansa fleksibel — bukan batas mati, tapi tujuan yang diupayakan.',
  nuance: 'Berbeda dari までに (batas waktu keras dan wajib): をめどに adalah target yang diupayakan, sedikit fleksibel. Sering digunakan dalam konteks bisnis, proyek, dan pernyataan pemerintah.',
  examples: [
    { jp: '来月末<b>をめどに</b>、報告書を提出してください。', id: 'Harap selesaikan laporan dengan target akhir bulan depan.' },
    { jp: '三年<b>をめどに</b>、この事業の黒字化を目指します。', id: 'Dengan target tiga tahun, kami berupaya mencapai profitabilitas bisnis ini.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal',
  exceptions: null,
  notes: 'Perbedaan kunci: をめどに = target/patokan (fleksibel); までに = batas waktu (wajib).',
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00111', level: 'n2', pattern: '〜ようでは / 〜ようじゃ',
  reading: '〜you de wa / 〜you ja',
  meaning: 'kalau sampai seperti itu ... (ekspresi kekecewaan/kekhawatiran)',
  cat: 'contrast-concession',
  connection: 'V-plain (non-past) + ようでは / ようじゃ',
  desc: '<b>〜ようでは</b> digunakan ketika pembicara mengekspresikan kekhawatiran atau ketidaksetujuan terhadap kondisi yang disebutkan — menyiratkan bahwa kondisi tersebut tidak dapat diterima.',
  nuance: 'ようじゃ adalah bentuk kasual dari ようでは. Sering diikuti ungkapan negatif seperti 困る、話にならない、だめだ. Menyiratkan kritik atau peringatan — "kalau sampai begitu, maka ada masalah."',
  examples: [
    { jp: 'そんなことで怒る<b>ようでは</b>、社会人として失格だ。', id: 'Kalau sampai marah karena hal seperti itu, tidak layak jadi orang dewasa.' },
    { jp: '基本も分からない<b>ようじゃ</b>、試験に合格できないよ。', id: 'Kalau dasar saja tidak mengerti, tidak akan bisa lulus ujian.' }
  ],
  see_also_grammar: ['gn2-00112', 'gn2-00113'], see_also_vocab: [],
  confusion_pairs: ['gn2-00112', 'gn2-00113'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00112', level: 'n2', pattern: '〜ようでは困る',
  reading: '〜you de wa komaru',
  meaning: 'kalau sampai begitu akan bermasalah',
  cat: 'contrast-concession',
  connection: 'V-plain (non-past) + ようでは困る',
  desc: '<b>〜ようでは困る</b> mengungkapkan bahwa jika kondisi tertentu terjadi atau berlanjut, hal itu akan menjadi masalah serius. Digunakan sebagai peringatan atau teguran halus.',
  nuance: 'Lebih spesifik dari ようでは — selalu berakhir dengan 困る. Sering digunakan atasan kepada bawahan, atau orang tua kepada anak. Nada lebih halus dibanding ようでは話にならない, tapi tetap mengandung ketidaksetujuan.',
  examples: [
    { jp: '毎回遅刻する<b>ようでは困る</b>。', id: 'Kalau sampai terlambat setiap kali, itu akan jadi masalah.' },
    { jp: '部下に頼り続ける<b>ようでは困る</b>よ。', id: 'Kalau terus bergantung pada bawahan, itu akan jadi masalah.' }
  ],
  see_also_grammar: ['gn2-00111', 'gn2-00113'], see_also_vocab: [],
  confusion_pairs: ['gn2-00111', 'gn2-00113'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00113', level: 'n2', pattern: '〜ようでは話にならない',
  reading: '〜you de wa hanashi ni naranai',
  meaning: 'kalau begitu tidak ada gunanya bicara',
  cat: 'contrast-concession',
  connection: 'V-plain (non-past) + ようでは話にならない',
  desc: '<b>〜ようでは話にならない</b> menyatakan bahwa kondisi yang disebutkan sangat tidak memadai sehingga tidak ada gunanya melanjutkan diskusi atau harapan.',
  nuance: 'Lebih keras dari ようでは困る — menyiratkan penolakan total atau frustrasi mendalam. Digunakan ketika standar minimum pun tidak terpenuhi. Cocok dalam konteks profesional atau evaluasi kinerja.',
  examples: [
    { jp: 'この程度しかできない<b>ようでは話にならない</b>。', id: 'Kalau kemampuannya hanya segitu, tidak ada gunanya bicara.' },
    { jp: '自分の意見も言えない<b>ようでは話にならない</b>よ。', id: 'Kalau pendapat sendiri saja tidak bisa diungkapkan, tidak ada artinya.' }
  ],
  see_also_grammar: ['gn2-00111', 'gn2-00112'], see_also_vocab: [],
  confusion_pairs: ['gn2-00111', 'gn2-00112'],
  register: 'spoken', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00114', level: 'n2', pattern: '〜てこそ',
  reading: '〜te koso',
  meaning: 'justru karena ... baru bisa ... (syarat esensial)',
  cat: 'reason-cause',
  connection: 'V-te + こそ',
  desc: '<b>〜てこそ</b> menyatakan bahwa justru karena melakukan A, barulah kondisi atau hasil B bisa tercapai. A adalah syarat mutlak agar B terwujud.',
  nuance: 'Berbeda dari てから (urutan waktu) — てこそ menekankan bahwa A adalah syarat hakiki, bukan sekadar urutan. Sering digunakan dalam konteks motivasi, nilai hidup, atau pelajaran mendalam.',
  examples: [
    { jp: '失敗し<b>てこそ</b>、人は本当に成長できる。', id: 'Justru karena mengalami kegagalan, manusia bisa benar-benar bertumbuh.' },
    { jp: '努力し<b>てこそ</b>、達成感が生まれる。', id: 'Justru karena sudah berusaha keras, barulah muncul rasa pencapaian.' }
  ],
  see_also_grammar: ['gn2-00115', 'gn2-00116'], see_also_vocab: [],
  confusion_pairs: ['gn2-00115'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00115', level: 'n2', pattern: '〜からこそ',
  reading: '〜kara koso',
  meaning: 'justru karena itulah ... (penekanan pada alasan)',
  cat: 'reason-cause',
  connection: 'V-plain / Adj-plain / N + だ + からこそ',
  desc: '<b>〜からこそ</b> memperkuat alasan atau sebab — menegaskan bahwa alasan yang disebut adalah faktor penentu yang sesungguhnya.',
  nuance: 'からこそ = から + こそ (partikel penegas). Digunakan untuk menegaskan alasan yang dianggap menentukan, sering untuk membenarkan tindakan atau mengungkapkan apresiasi mendalam. Berbeda dari てこそ yang menekankan prasyarat tindakan.',
  examples: [
    { jp: 'あなたを信頼している<b>からこそ</b>、この話をしている。', id: 'Justru karena aku percaya padamu, aku membicarakan hal ini.' },
    { jp: '難しい<b>からこそ</b>、挑戦する価値がある。', id: 'Justru karena sulit, ada nilai yang layak untuk diperjuangkan.' }
  ],
  see_also_grammar: ['gn2-00114', 'gn2-00116'], see_also_vocab: [],
  confusion_pairs: ['gn2-00114', 'gn2-00116'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00116', level: 'n2', pattern: '〜ばこそ',
  reading: '〜ba koso',
  meaning: 'justru karena ... (bentuk literary dari からこそ)',
  cat: 'reason-cause',
  connection: 'V-conditional (〜ば) / N・Adj + であればこそ',
  desc: '<b>〜ばこそ</b> adalah bentuk literary dan sangat formal dari からこそ — menekankan alasan dengan bobot yang lebih kuat menggunakan struktur kondisional ば.',
  nuance: 'Sangat formal dan literary — jarang dalam percakapan sehari-hari. Lebih kuat dari からこそ karena menggunakan bentuk kondisional. Sering ditemukan dalam tulisan formal, pidato, atau sastra. Pelajar perlu mengenali tapi tidak perlu aktif menggunakannya dalam percakapan.',
  examples: [
    { jp: '愛してい<b>ればこそ</b>、厳しく言うのだ。', id: 'Justru karena mencintaimu, aku berbicara dengan tegas.' },
    { jp: '君の将来を思え<b>ばこそ</b>、忠告したのだ。', id: 'Justru karena memikirkan masa depanmu, aku memberikan nasihat itu.' }
  ],
  see_also_grammar: ['gn2-00115', 'gn2-00114'], see_also_vocab: [],
  confusion_pairs: ['gn2-00115'],
  register: 'literary', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00117', level: 'n2', pattern: '〜だけに',
  reading: '〜dake ni',
  meaning: 'justru karena ... / mengingat ... (hasil terasa lebih kuat)',
  cat: 'reason-cause',
  connection: 'V-plain / Adj-plain / N + だけに',
  desc: '<b>〜だけに</b> menyatakan bahwa justru karena kondisi di bagian pertama, dampak atau perasaan di bagian kedua terasa lebih kuat atau lebih wajar.',
  nuance: 'Berbeda dari だけあって — だけに bisa digunakan untuk hasil negatif maupun positif, sedangkan だけあって hampir selalu positif. だけに sering menyiratkan beban harapan atau dampak emosional yang diperbesar oleh kondisi yang disebutkan.',
  examples: [
    { jp: '長年努力してきた<b>だけに</b>、失敗のショックは大きかった。', id: 'Justru karena sudah berjuang bertahun-tahun, guncangan kegagalan itu terasa sangat besar.' },
    { jp: '期待されていた<b>だけに</b>、残念な結果だった。', id: 'Mengingat betapa besarnya harapan yang disematkan, hasilnya sungguh mengecewakan.' }
  ],
  see_also_grammar: ['gn2-00118', 'gn2-00119'], see_also_vocab: [],
  confusion_pairs: ['gn2-00118', 'gn2-00119'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00118', level: 'n2', pattern: '〜だけあって',
  reading: '〜dake atte',
  meaning: 'memang pantas karena ... / tidak heran karena ...',
  cat: 'reason-cause',
  connection: 'V-plain / Adj-plain / N + だけあって',
  desc: '<b>〜だけあって</b> menyatakan bahwa hasil atau kualitas di bagian kedua memang wajar dan sejalan dengan reputasi, pengalaman, atau kemampuan yang disebutkan di bagian pertama.',
  nuance: 'Hampir selalu digunakan untuk penilaian positif — berbeda dari だけに yang bisa untuk hasil negatif. Mengandung nuansa "terbukti wajar, tidak mengherankan." Cocok untuk memuji seseorang secara tidak langsung.',
  examples: [
    { jp: 'プロ<b>だけあって</b>、仕事がとても丁寧だ。', id: 'Tidak heran karena profesional, pekerjaannya sangat teliti.' },
    { jp: '長く勉強した<b>だけあって</b>、日本語がとても上手だ。', id: 'Memang pantas karena sudah lama belajar, bahasa Jepangnya sangat bagus.' }
  ],
  see_also_grammar: ['gn2-00117', 'gn2-00119'], see_also_vocab: [],
  confusion_pairs: ['gn2-00117', 'gn2-00119'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00119', level: 'n2', pattern: '〜だけのことはある',
  reading: '〜dake no koto wa aru',
  meaning: 'memang ada alasannya / tidak sia-sia ...',
  cat: 'reason-cause',
  connection: 'V-plain / N + だけのことはある',
  desc: '<b>〜だけのことはある</b> mengkonfirmasi bahwa usaha, biaya, atau kondisi yang disebutkan memang sepadan dengan hasil yang diperoleh — "terbukti tidak sia-sia."',
  nuance: 'Lebih kuat nuansa konfirmasinya dibanding だけあって. Sering diucapkan setelah menyaksikan langsung hasil yang mengesankan. Mengandung makna "memang layak, tidak mengecewakan" — pujian berdasarkan bukti nyata.',
  examples: [
    { jp: '長年修行した<b>だけのことはある</b>。料理が絶品だ。', id: 'Memang tidak sia-sia bertahun-tahun berlatih. Masakannya luar biasa.' },
    { jp: '値段が高い<b>だけのことはある</b>、品質が全然違う。', id: 'Memang ada alasannya kenapa mahal — kualitasnya jauh berbeda.' }
  ],
  see_also_grammar: ['gn2-00117', 'gn2-00118'], see_also_vocab: [],
  confusion_pairs: ['gn2-00117', 'gn2-00118'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00120', level: 'n2', pattern: '〜ながら(も)',
  reading: '〜nagara (mo)',
  meaning: 'meskipun ... (tapi berlawanan dari yang diharapkan)',
  cat: 'contrast-concession',
  connection: 'V-masu-stem / Adj-plain / N + ながら(も)',
  desc: '<b>〜ながら(も)</b> menyatakan kontras — kondisi A diakui, tapi kondisi B yang mengikutinya bertentangan dengan harapan wajar.',
  nuance: 'も setelah ながら memperkuat nuansa kontras/kejutan. Berbeda dari つつ(も) yang hanya menempel ke verb — ながら(も) bisa menempel ke noun dan adjective juga. Contoh: 小さいながらも (meskipun kecil), 新人ながらも (meskipun masih baru).',
  examples: [
    { jp: '小さい<b>ながらも</b>、立派な庭がある。', id: 'Meskipun kecil, taman itu tampak sangat megah.' },
    { jp: '反対し<b>ながらも</b>、彼は最終的に従った。', id: 'Meskipun menentang, akhirnya dia tetap menurut.' }
  ],
  see_also_grammar: ['gn2-00121'], see_also_vocab: [],
  confusion_pairs: ['gn2-00121'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00121', level: 'n2', pattern: '〜つつ(も)',
  reading: '〜tsutsu (mo)',
  meaning: 'sambil ... / meskipun tahu ... (kontras dengan konflik batin)',
  cat: 'contrast-concession',
  connection: 'V-masu-stem + つつ(も)',
  desc: '<b>〜つつ(も)</b> menyatakan bahwa meskipun menyadari atau melakukan A secara bersamaan, kondisi berlawanan B tetap terjadi — sering menyiratkan konflik batin.',
  nuance: 'Lebih formal dari ながら(も) dan hanya menempel ke verb. Menekankan ketegangan antara dua hal yang terjadi bersamaan — terutama antara apa yang diketahui/dirasakan dengan apa yang dilakukan. Sering digunakan dalam tulisan atau narasi introspektif.',
  examples: [
    { jp: '悪いと分かり<b>つつも</b>、やめられなかった。', id: 'Meskipun tahu itu salah, tidak bisa berhenti juga.' },
    { jp: '疲れを感じ<b>つつも</b>、仕事を続けた。', id: 'Meskipun merasakan kelelahan, terus bekerja juga.' }
  ],
  see_also_grammar: ['gn2-00120'], see_also_vocab: [],
  confusion_pairs: ['gn2-00120'],
  register: 'written', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00122', level: 'n2', pattern: '〜くせに',
  reading: '〜kuse ni',
  meaning: 'padahal ... / meskipun begitu malah ... (kecaman/sinisme)',
  cat: 'contrast-concession',
  connection: 'V-plain / Adj-plain / N + の + くせに',
  desc: '<b>〜くせに</b> mengekspresikan kritik, ketidaksenangan, atau sinisme — perilaku atau kondisi subjek bertentangan dengan apa yang seharusnya, dan pembicara tidak menyukainya.',
  nuance: 'Selalu mengandung nada negatif — berbeda dari のに yang lebih netral. Tidak sopan digunakan kepada orang yang lebih tua atau atasan. Penggunaannya menyiratkan bahwa pembicara merasa kesal atau kecewa dengan inkonsistensi subjek.',
  examples: [
    { jp: '知っている<b>くせに</b>、知らないふりをしている。', id: 'Padahal tahu, malah pura-pura tidak tahu.' },
    { jp: '下手な<b>くせに</b>、人の仕事を批判する。', id: 'Padahal tidak mahir, malah mengkritik pekerjaan orang lain.' }
  ],
  see_also_grammar: ['gn2-00120', 'gn2-00121'], see_also_vocab: [],
  confusion_pairs: [],
  register: 'spoken', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00125', level: 'n2', pattern: '〜もので / 〜ものだから',
  reading: '〜mono de / 〜mono dakara',
  meaning: 'karena ... (penjelasan/pembenaran dari sudut pandang pembicara)',
  cat: 'reason-cause',
  connection: 'V-plain / Adj-plain / N + な + もので / ものだから',
  desc: '<b>〜ものだから</b> dan <b>〜もので</b> memberikan penjelasan atau pembenaran atas suatu kondisi, sering untuk minta maaf atau mengklarifikasi.',
  nuance: 'ものだから lebih kuat dan terkesan seperti pembelaan diri. もので sedikit lebih halus. Keduanya lebih subjektif dari ので — menekankan alasan dari sudut pandang pembicara yang tidak bisa dihindari. Sering digunakan untuk meminta maaf karena keterlambatan atau kesalahan.',
  examples: [
    { jp: '急いでいた<b>もので</b>、ご連絡できませんでした。', id: 'Karena sedang terburu-buru, tidak sempat menghubungi.' },
    { jp: '子供が熱を出した<b>ものだから</b>、早退しました。', id: 'Karena anak demam, saya pulang lebih awal.' }
  ],
  see_also_grammar: ['gn2-00123', 'gn2-00124'], see_also_vocab: [],
  confusion_pairs: [],
  register: 'spoken', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00128', level: 'n2', pattern: '〜ということになる',
  reading: '〜to iu koto ni naru',
  meaning: 'artinya ... / berarti ... (kesimpulan logis)',
  cat: 'quotation-thought',
  connection: 'Clause + ということになる',
  desc: '<b>〜ということになる</b> menyatakan kesimpulan logis yang ditarik dari kondisi atau informasi yang telah diberikan sebelumnya.',
  nuance: 'Berbeda dari ということになっている (aturan yang sudah ada) — ということになる adalah proses penarikan kesimpulan baru. Digunakan untuk menyimpulkan implikasi dari fakta yang sudah diketahui, sering dalam diskusi logis atau analisis.',
  examples: [
    { jp: '彼が来ないと、計画は中止<b>ということになる</b>。', id: 'Kalau dia tidak datang, artinya rencana harus dibatalkan.' },
    { jp: '全員賛成なら、決定した<b>ということになる</b>。', id: 'Kalau semua setuju, berarti sudah diputuskan.' }
  ],
  see_also_grammar: ['gn2-00129', 'gn2-00126'], see_also_vocab: [],
  confusion_pairs: ['gn2-00129'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00134', level: 'n2', pattern: '〜を踏まえて',
  reading: '〜wo fumaete',
  meaning: 'berdasarkan ..., dengan mempertimbangkan ..., berpijak pada ...',
  cat: 'reason-cause',
  connection: 'N + を踏まえて / V-plain + のを踏まえて',
  desc: '<b>〜を踏まえて</b> menyatakan bahwa suatu keputusan atau tindakan diambil dengan sepenuhnya mempertimbangkan dan berpijak pada fakta, situasi, atau pengalaman tertentu. Menekankan proses penghayatan mendalam sebelum bertindak.',
  nuance: 'Berbeda dari に基づいて (berlandaskan aturan/data secara ketat) — を踏まえて lebih menyiratkan "menghayati dan mempertimbangkan secara menyeluruh" sebelum mengambil langkah. Sering digunakan untuk diskusi kebijakan, evaluasi, atau pengembangan.',
  examples: [
    { jp: 'アンケートの結果<b>を踏まえて</b>、サービスを改善します。', id: 'Berdasarkan hasil kuesioner, kami akan memperbaiki layanan.' },
    { jp: 'これまでの経験<b>を踏まえて</b>、新しい計画を立てた。', id: 'Dengan mempertimbangkan pengalaman selama ini, kami menyusun rencana baru.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00136'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00136', level: 'n2', pattern: '〜に基づいて',
  reading: '〜ni motozuite',
  meaning: 'berdasarkan ..., berlandaskan ..., mengacu pada ...',
  cat: 'reason-cause',
  connection: 'N + に基づいて / N + に基づく + N',
  desc: '<b>〜に基づいて</b> menyatakan bahwa suatu tindakan, keputusan, atau pernyataan didasarkan secara langsung pada data, aturan, hukum, atau fakta tertentu. Menekankan landasan yang kuat dan konkret.',
  nuance: 'Dibandingkan を踏まえて (mempertimbangkan secara menyeluruh) dan に照らして (mengukur terhadap standar), に基づいて paling netral dan langsung — berarti "berpijak pada" tanpa nuansa evaluatif tambahan. Bisa digunakan dalam konteks formal maupun semi-formal.',
  examples: [
    { jp: '契約書<b>に基づいて</b>、支払いを行います。', id: 'Pembayaran dilakukan berdasarkan isi kontrak.' },
    { jp: '科学的なデータ<b>に基づいた</b>結論が必要だ。', id: 'Diperlukan kesimpulan yang berlandaskan data ilmiah.' }
  ],
  see_also_grammar: ['gn2-00134', 'gn2-00135', 'gn2-00137'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00134', 'gn2-00135', 'gn2-00137'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00137', level: 'n2', pattern: '〜に即して',
  reading: '〜ni sokushite',
  meaning: 'sesuai dengan ..., mengikuti secara dekat ..., berpedoman pada kenyataan ...',
  cat: 'reason-cause',
  connection: 'N + に即して / N + に即した + N',
  desc: '<b>〜に即して</b> menyatakan bahwa sesuatu dilakukan dengan mengikuti atau menyesuaikan diri secara ketat terhadap realitas, kebutuhan nyata, atau situasi yang ada. Menekankan kesesuaian dengan kondisi aktual.',
  nuance: 'Berbeda dari に基づいて (berlandaskan aturan/data) — に即して lebih menekankan kesesuaian dengan situasi atau kenyataan yang konkret dan dinamis, bukan hanya mengacu pada dokumen atau prinsip abstrak. Sering digunakan dalam konteks pendidikan atau pembuatan kebijakan.',
  examples: [
    { jp: '現場の状況<b>に即して</b>、柔軟に対応することが求められる。', id: 'Diperlukan respons yang fleksibel sesuai dengan kondisi nyata di lapangan.' },
    { jp: '実態<b>に即した</b>教育改革が必要だ。', id: 'Reformasi pendidikan yang sesuai dengan kondisi nyata sangat dibutuhkan.' }
  ],
  see_also_grammar: ['gn2-00136'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00136'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00142', level: 'n2', pattern: '〜にかかわらず',
  reading: '〜ni kakawarazu',
  meaning: 'terlepas dari ..., tidak peduli ..., tanpa memandang ...',
  cat: 'contrast-concession',
  connection: 'N + にかかわらず / V-plain + かどうかにかかわらず / A-い + かどうかにかかわらず',
  desc: '<b>〜にかかわらず</b> menyatakan bahwa suatu hal berlaku atau terjadi tanpa dipengaruhi oleh kondisi atau faktor yang disebutkan. Dapat digunakan dengan kata tanya, kondisi ganda (あるなし), maupun klausa.',
  nuance: 'Lebih luas dan fleksibel dibandingkan を問わず yang biasanya mengikuti pasangan kata benda (男女を問わず, 年齢を問わず). にかかわらず bisa mengikuti klausa penuh dengan かどうか, dan lebih menekankan "tanpa terpengaruh oleh" faktor tersebut.',
  examples: [
    { jp: '天候<b>にかかわらず</b>、試合は予定通り行われます。', id: 'Terlepas dari cuaca, pertandingan akan tetap berlangsung sesuai jadwal.' },
    { jp: '経験があるかどうか<b>にかかわらず</b>、応募できます。', id: 'Siapa pun boleh melamar, tidak peduli ada pengalaman atau tidak.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00143'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00143', level: 'n2', pattern: '〜を問わず',
  reading: '〜wo towazu',
  meaning: 'tanpa memandang ..., tanpa terkecuali ..., apapun ...-nya',
  cat: 'contrast-concession',
  connection: 'N + を問わず / N・N + を問わず',
  desc: '<b>〜を問わず</b> menyatakan bahwa sesuatu berlaku tanpa pengecualian, terlepas dari kategori yang disebutkan. Biasanya digunakan dengan kata benda yang berpasangan atau yang mewakili suatu kategori.',
  nuance: 'Berbeda dari にかかわらず yang lebih fleksibel — を問わず umumnya digunakan dengan kategori berpasangan (男女を問わず, 昼夜を問わず) atau kata yang mewakili kategori luas (経験を問わず, 国籍を問わず). Lebih formulaik dan sering muncul di pengumuman resmi.',
  examples: [
    { jp: '男女<b>を問わず</b>、誰でも参加できます。', id: 'Siapa pun boleh berpartisipasi, tanpa memandang jenis kelamin.' },
    { jp: '昼夜<b>を問わず</b>、患者のために働いた。', id: 'Ia bekerja untuk para pasien tanpa memandang siang atau malam.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00142'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00154', level: 'n2', pattern: '〜わけではない',
  reading: '〜wake de wa nai',
  meaning: 'bukan berarti ..., tidak persis begitu ..., bukan karena ...',
  cat: 'contrast-concession',
  connection: 'V-plain + わけではない / い-Adj-plain + わけではない / N + というわけではない',
  desc: '<b>〜わけではない</b> digunakan untuk membantah atau mengklarifikasi kesimpulan yang salah — menyatakan bahwa situasinya tidak persis seperti yang diasumsikan orang lain, meski ada kesan seolah demikian.',
  nuance: 'Berbeda dari とは限らない (tidak selalu terjadi secara umum) — わけではない lebih spesifik pada kasus saat ini dan digunakan untuk mengklarifikasi asumsi yang berkembang dari situasi yang ada. Sering disertai penjelasan alternatif.',
  examples: [
    { jp: '嫌いな<b>わけではない</b>けど、今は気分じゃない。', id: 'Bukan berarti aku tidak suka, hanya saja sekarang tidak mood.' },
    { jp: '彼が悪い<b>わけではない</b>。ただ状況が難しかっただけだ。', id: 'Bukan berarti dia yang salah. Situasinya saja yang memang sulit.' }
  ],
  see_also_grammar: ['gn2-00153'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00153', 'gn2-00155'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00161', level: 'n2', pattern: '〜ものの',
  reading: '〜mono no',
  meaning: 'meskipun ..., walaupun ... (tapi kenyataannya berbeda dari harapan)',
  cat: 'contrast-concession',
  connection: 'V-plain + ものの / い-Adj-plain + ものの / な-Adj + な + ものの / N + である + ものの',
  desc: '<b>〜ものの</b> menyatakan kontras antara kondisi yang terpenuhi (klausa pertama) dan kenyataan atau hasil yang tidak sesuai ekspektasi (klausa kedua). Menyiratkan rasa kecewa atau ketidaksesuaian.',
  nuance: 'Berbeda dari けれど/が (kontras umum, netral) — ものの secara khas menekankan bahwa meski kondisi A tampak terpenuhi, hasilnya mengecewakan atau tidak sebagaimana yang seharusnya. Umumnya digunakan dalam bahasa tulis atau formal.',
  examples: [
    { jp: '頑張った<b>ものの</b>、試験に合格できなかった。', id: 'Meskipun sudah berusaha keras, tetap saja tidak bisa lulus ujian.' },
    { jp: '謝った<b>ものの</b>、彼女はなかなか許してくれなかった。', id: 'Walaupun sudah minta maaf, dia tidak kunjung memaafkanku.' },
    { jp: '計画は立てた<b>ものの</b>、実行する時間がない。', id: 'Meskipun rencana sudah dibuat, tidak ada waktu untuk melaksanakannya.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00162', 'gn2-00163'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00162', level: 'n2', pattern: '〜ながらも',
  reading: '〜nagara mo',
  meaning: 'walaupun ..., sambil tetap dalam kondisi ...',
  cat: 'contrast-concession',
  connection: 'V-stem + ながらも / い-Adj-plain + ながらも / な-Adj + ながらも / N + ながらも',
  desc: '<b>〜ながらも</b> menyatakan bahwa dua kondisi yang tampak bertentangan terjadi secara bersamaan. Kondisi pertama tetap ada, namun kondisi kedua yang berbeda atau mengejutkan juga berlaku.',
  nuance: 'Berbeda dari ものの (ekspektasi yang meleset) — ながらも lebih menekankan koeksistensi dua kondisi yang kontras secara simultan. "Dalam kondisi A sekalipun, tetap terjadi B." Bisa mengungkap semangat, ketabahan, atau ironi.',
  examples: [
    { jp: '貧しい<b>ながらも</b>、家族は幸せに暮らしていた。', id: 'Walaupun hidup dalam kemiskinan, keluarga itu tetap hidup bahagia.' },
    { jp: '不安を感じ<b>ながらも</b>、彼は壇上に上がった。', id: 'Sambil tetap merasakan kecemasan, ia tetap naik ke atas panggung.' }
  ],
  see_also_grammar: ['gn2-00161'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00161'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00163', level: 'n2', pattern: '〜とはいえ',
  reading: '〜to wa ie',
  meaning: 'meskipun begitu, walaupun memang demikian',
  cat: 'contrast-concession',
  connection: 'Clause + とはいえ / N + とはいえ',
  desc: '<b>〜とはいえ</b> mengakui kebenaran kondisi pertama, namun kemudian menambahkan reservasi, pengecualian, atau kenyataan yang berbeda. Artinya "meski kita akui hal itu benar, namun..."',
  nuance: 'Mirip dengan とはいうものの namun lebih ringkas dan umum digunakan. Berbeda dari ものの (menekankan ketidaksesuaian hasil) — とはいえ lebih netral dan digunakan untuk menambahkan nuansa atau batasan terhadap pernyataan yang sebelumnya diakui.',
  examples: [
    { jp: '春だ<b>とはいえ</b>、まだ肌寒い日が続く。', id: 'Meskipun memang sudah musim semi, hari-hari yang agak dingin masih berlanjut.' },
    { jp: '失敗した<b>とはいえ</b>、努力したことは評価されるべきだ。', id: 'Walaupun memang gagal, usaha yang sudah dilakukan sepatutnya tetap diapresiasi.' }
  ],
  see_also_grammar: ['gn2-00189'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00189', 'gn2-00161'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00164', level: 'n2', pattern: '〜にしては',
  reading: '〜ni shite wa',
  meaning: 'untuk ukuran ..., mengingat kondisinya sebagai ...',
  cat: 'contrast-concession',
  connection: 'V-plain + にしては / N + にしては',
  desc: '<b>〜にしては</b> menyatakan bahwa hasil atau kondisi yang ada berbeda dari apa yang seharusnya diharapkan berdasarkan standar atau latar belakang yang disebutkan. Bisa bernada positif maupun negatif.',
  nuance: 'Berbeda dari わりに (proporsi tidak sesuai secara umum) — にしては secara spesifik mengacu pada standar yang diharapkan dari kelompok atau kondisi tertentu. "Untuk seseorang dengan latar belakang X, hasilnya Y cukup mengejutkan."',
  examples: [
    { jp: '初めて作った料理<b>にしては</b>、とてもおいしい。', id: 'Untuk ukuran masakan yang dibuat pertama kali, ini sangat enak.' },
    { jp: '10年勉強した<b>にしては</b>、日本語があまり上手ではない。', id: 'Mengingat sudah belajar 10 tahun, kemampuan bahasa Jepangnya tidak terlalu bagus.' }
  ],
  see_also_grammar: ['gn2-00165'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00165'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00165', level: 'n2', pattern: '〜わりに',
  reading: '〜wari ni',
  meaning: 'padahal seharusnya ..., tidak sebanding dengan ..., tidak sesuai dengan ...',
  cat: 'contrast-concession',
  connection: 'V-plain + わりに / い-Adj-plain + わりに / な-Adj + な + わりに / N + の + わりに',
  desc: '<b>〜わりに</b> menyatakan bahwa hasil atau kondisi tidak proporsional atau tidak sebanding dengan apa yang disebutkan. Mengungkapkan ketidaksesuaian antara kondisi dan hasilnya.',
  nuance: 'Berbeda dari にしては (standar kelompok/latar belakang tertentu) — わりに lebih menekankan "dibandingkan dengan tingkatan/jumlah X, hasilnya Y tidak sebanding". Sering digunakan untuk penilaian nilai atau kualitas.',
  examples: [
    { jp: '値段が高い<b>わりに</b>、品質がよくない。', id: 'Padahal harganya mahal, tapi kualitasnya tidak bagus.' },
    { jp: '忙しい<b>わりに</b>、彼はいつも元気そうだ。', id: 'Padahal selalu sibuk, dia terlihat selalu bersemangat.' }
  ],
  see_also_grammar: ['gn2-00164'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00164'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00166', level: 'n2', pattern: '〜だけあって',
  reading: '〜dake atte',
  meaning: 'memang pantas karena ..., wajar saja karena ..., sebanding dengan ...',
  cat: 'reason-cause',
  connection: 'V-plain + だけあって / い-Adj-plain + だけあって / な-Adj + な + だけあって / N + だけあって',
  desc: '<b>〜だけあって</b> menyatakan bahwa hasil atau kualitas yang ada memang sepadan dan wajar mengingat latar belakang, kemampuan, atau kondisi yang disebutkan. Menekankan kesesuaian antara penyebab dan hasil — selalu bernada positif.',
  nuance: 'Berbeda dari だけに (bisa positif atau negatif, menekankan dampak emosional) — だけあって selalu afirmatif dan digunakan untuk memuji atau mengakui bahwa sesuatu memang layak mendapat hasilnya. "Memang pantas karena memang benar-benar X."',
  examples: [
    { jp: 'プロ<b>だけあって</b>、仕上がりが全然違う。', id: 'Memang pantas karena seorang profesional — hasilnya jauh berbeda.' },
    { jp: '長年修行した<b>だけあって</b>、その料理人の腕は本物だ。', id: 'Wajar saja mengingat sudah berlatih bertahun-tahun — keahlian juru masak itu memang nyata.' }
  ],
  see_also_grammar: ['gn2-00167'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00167'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00167', level: 'n2', pattern: '〜だけに',
  reading: '〜dake ni',
  meaning: 'justru karena ..., tepat karena itulah ...',
  cat: 'reason-cause',
  connection: 'V-plain + だけに / い-Adj-plain + だけに / な-Adj + な + だけに / N + だけに',
  desc: '<b>〜だけに</b> menyatakan bahwa justru karena kondisi yang disebutkan, dampak atau perasaan yang muncul terasa lebih kuat atau lebih bermakna. Menekankan hubungan sebab-akibat yang intens, bisa positif maupun negatif.',
  nuance: 'Berbeda dari だけあって (selalu afirmatif, memuji) — だけに lebih menekankan dampak emosional yang diperkuat oleh alasan tersebut. "Justru karena X itulah, Y terasa semakin kuat/dalam." Sering digunakan untuk mengungkapkan rasa kecewa, terharu, atau ironi.',
  examples: [
    { jp: '期待していた<b>だけに</b>、失敗したときのショックが大きかった。', id: 'Justru karena sudah berharap besar, kekecewaan saat gagal pun terasa sangat dalam.' },
    { jp: '親友<b>だけに</b>、裏切られたときのダメージは計り知れない。', id: 'Justru karena dia sahabat karib, luka karena pengkhianatannya tidak terkira.' }
  ],
  see_also_grammar: ['gn2-00166'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00166', 'gn2-00168'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00168', level: 'n2', pattern: '〜からこそ',
  reading: '〜kara koso',
  meaning: 'justru karena itulah ..., memang karena ... (dan bukan alasan lain)',
  cat: 'reason-cause',
  connection: 'V-plain + からこそ / い-Adj-plain + からこそ / な-Adj + だからこそ / N + だからこそ',
  desc: '<b>〜からこそ</b> menegaskan bahwa faktor yang disebutkan adalah alasan yang sesungguhnya dan paling mendasar — bukan alasan lain. Menambahkan penekanan eksklusif pada sebab yang disebutkan.',
  nuance: 'Berbeda dari から (karena, umum dan netral) — からこそ menambahkan tekanan kuat: "justru faktor inilah, dan bukan yang lain, yang menjadi alasan sebenarnya". Sering digunakan dalam argumen persuasif, pembelaan diri, atau pernyataan emosional.',
  examples: [
    { jp: '大変だ<b>からこそ</b>、乗り越えたときに達成感が生まれる。', id: 'Justru karena sulitnya itulah, rasa pencapaian muncul saat berhasil melewatinya.' },
    { jp: '心配している<b>からこそ</b>、厳しいことを言うのだ。', id: 'Justru karena aku khawatir, aku mengatakannya dengan keras.' }
  ],
  see_also_grammar: ['gn2-00167'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00167'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00169', level: 'n2', pattern: '〜からといって',
  reading: '〜kara to itte',
  meaning: 'hanya karena ... bukan berarti ..., meskipun ... tidak berarti boleh ...',
  cat: 'contrast-concession',
  connection: 'V-plain + からといって / い-Adj-plain + からといって / N + だからといって',
  desc: '<b>〜からといって</b> digunakan untuk menyanggah justifikasi atau alasan yang dianggap berlebihan. Menyatakan bahwa meski alasan pertama ada, alasan itu tidak cukup untuk membenarkan tindakan atau kesimpulan berikutnya.',
  nuance: 'Berbeda dari からには (karena sudah, maka ada kewajiban) — からといって justru berfungsi sebaliknya: menolak anggapan bahwa alasan A secara otomatis membenarkan B. Biasanya diikuti kalimat negatif atau larangan.',
  examples: [
    { jp: '忙しい<b>からといって</b>、礼儀を忘れていいわけではない。', id: 'Hanya karena sibuk bukan berarti boleh melupakan sopan santun.' },
    { jp: '失敗した<b>からといって</b>、すべてを諦める必要はない。', id: 'Hanya karena gagal tidak berarti harus menyerah pada segalanya.' }
  ],
  see_also_grammar: ['gn2-00170'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00170'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00181', level: 'n2', pattern: '〜はおろか',
  reading: '〜wa oroka',
  meaning: 'apalagi ..., jangankan ..., bahkan ... pun tidak',
  cat: 'listing-addition',
  connection: 'N + はおろか',
  desc: '<b>〜はおろか</b> menyatakan bahwa bahkan hal yang lebih mudah atau lebih dasar pun tidak bisa dilakukan atau tidak terjadi, apalagi hal yang lebih sulit. Menekankan keparahan atau ekstremnya suatu kondisi.',
  nuance: 'Berbeda dari はもとより (A sudah pasti, B juga) — はおろか biasanya digunakan dalam konteks negatif atau mengejutkan. "Jangankan X yang sulit, bahkan Y yang mudah pun tidak bisa." Sering mempertegas keadaan yang sangat buruk atau mengejutkan.',
  examples: [
    { jp: '食費<b>はおろか</b>、家賃も払えない状況だ。', id: 'Jangankan biaya makan, bahkan uang sewa pun tidak bisa dibayar.' },
    { jp: '漢字<b>はおろか</b>、ひらがなも読めない。', id: 'Jangankan kanji, bahkan hiragana pun tidak bisa dibaca.' }
  ],
  see_also_grammar: ['gn2-00182'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00182'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00182', level: 'n2', pattern: '〜はもとより',
  reading: '〜wa moto yori',
  meaning: 'sudah pasti ..., belum lagi ..., A sudah jelas, apalagi B',
  cat: 'listing-addition',
  connection: 'N + はもとより',
  desc: '<b>〜はもとより</b> menyatakan bahwa hal pertama (A) sudah jelas dan tidak perlu dipertanyakan, ditambah lagi dengan hal lain (B) yang juga berlaku. Menekankan bahwa A adalah titik awal yang sudah pasti, dan B menambah cakupannya.',
  nuance: 'Berbeda dari はおろか (konteks negatif, jangankan A bahkan B pun tidak) — はもとより umumnya netral atau positif: "A sudah pasti, dan B juga". Lebih formal dari だけでなく. Sering muncul dalam tulisan resmi atau deskripsi produk/jasa.',
  examples: [
    { jp: '日本語<b>はもとより</b>、英語や中国語も話せる。', id: 'Bahasa Jepang sudah pasti, belum lagi ia juga bisa berbicara bahasa Inggris dan Mandarin.' },
    { jp: '国内<b>はもとより</b>、海外でも高い評価を受けている。', id: 'Di dalam negeri sudah pasti, di luar negeri pun mendapat pengakuan tinggi.' }
  ],
  see_also_grammar: ['gn2-00181', 'gn2-00184'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00181'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00183', level: 'n2', pattern: '〜にとどまらず',
  reading: '〜ni todomarazu',
  meaning: 'tidak hanya ..., melampaui batas ..., tidak terbatas pada ...',
  cat: 'listing-addition',
  connection: 'N + にとどまらず / V-plain + にとどまらず',
  desc: '<b>〜にとどまらず</b> menyatakan bahwa dampak, pengaruh, atau cakupan sesuatu tidak berhenti pada hal yang disebutkan, melainkan meluas lebih jauh. Menekankan jangkauan yang melebihi batas yang diharapkan.',
  nuance: 'Berbeda dari のみならず (bukan hanya, formal dan netral) — にとどまらず lebih menekankan aspek penyebaran atau perluasan yang dinamis: sesuatu yang awalnya ada di A, kini sudah melampaui A. Sering digunakan untuk tren, pengaruh, atau bencana yang meluas.',
  examples: [
    { jp: 'その影響は国内<b>にとどまらず</b>、海外にも広がっている。', id: 'Dampaknya tidak terbatas di dalam negeri saja, sudah meluas hingga ke luar negeri.' },
    { jp: '問題は個人レベル<b>にとどまらず</b>、社会全体に関わっている。', id: 'Masalah ini tidak hanya pada level individu, melainkan menyangkut seluruh masyarakat.' }
  ],
  see_also_grammar: ['gn2-00184'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00184'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00184', level: 'n2', pattern: '〜のみならず',
  reading: '〜nomi narazu',
  meaning: 'bukan hanya ..., tapi juga ..., tidak hanya ... melainkan juga ...',
  cat: 'listing-addition',
  connection: 'N + のみならず / V-plain + のみならず / い-Adj-plain + のみならず',
  desc: '<b>〜のみならず</b> menyatakan penambahan — tidak hanya hal pertama yang berlaku, tetapi juga hal kedua. Setara dengan だけでなく namun jauh lebih formal dan sering digunakan dalam tulisan akademik atau resmi.',
  nuance: 'Secara makna identik dengan だけでなく (tidak hanya ... tapi juga) — perbedaannya murni pada register. のみならず sangat formal dan cocok untuk tulisan, sedangkan だけでなく lebih umum dan bisa digunakan di mana saja. Berbeda dari にとどまらず yang menekankan penyebaran.',
  examples: [
    { jp: '彼女は美しい<b>のみならず</b>、非常に聡明でもある。', id: 'Bukan hanya cantik, ia juga sangat cerdas.' },
    { jp: 'この薬は痛みを和らげる<b>のみならず</b>、炎症も抑える効果がある。', id: 'Obat ini bukan hanya meredakan nyeri, tetapi juga memiliki efek menekan peradangan.' }
  ],
  see_also_grammar: ['gn2-00182', 'gn2-00183'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00183'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00186', level: 'n2', pattern: '〜ことのないよう',
  reading: '〜koto no nai you',
  meaning: 'agar tidak terjadi ..., untuk mencegah agar ... tidak terjadi',
  cat: 'purpose',
  connection: 'V-dictionary + ことのないよう / V-ない + ことのないよう',
  desc: '<b>〜ことのないよう</b> digunakan untuk menyatakan tujuan pencegahan — melakukan sesuatu agar suatu kejadian yang tidak diinginkan tidak terjadi. Lebih formal dibandingkan ないように.',
  nuance: 'Berbeda dari ないように (jangan sampai, lebih umum dan spoken) — ことのないよう lebih formal dan sering muncul dalam instruksi tertulis, pengumuman resmi, atau peringatan. Menekankan pencegahan kejadian yang dianggap serius.',
  examples: [
    { jp: '同じ過ちを繰り返す<b>ことのないよう</b>、しっかり反省してください。', id: 'Mohon introspeksi dengan sungguh-sungguh agar kesalahan yang sama tidak terulang.' },
    { jp: '情報が漏れる<b>ことのないよう</b>、管理を徹底してください。', id: 'Mohon perketat pengelolaan agar informasi tidak bocor.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00189', level: 'n2', pattern: '〜とはいうものの',
  reading: '〜to wa iu mono no',
  meaning: 'meskipun ada yang mengatakan ..., walau memang begitu dikatakan ...',
  cat: 'contrast-concession',
  connection: 'Clause + とはいうものの / N + とはいうものの',
  desc: '<b>〜とはいうものの</b> mengakui suatu pernyataan, pandangan umum, atau fakta yang dikenal, namun kemudian menambahkan reservasi, kenyataan lain, atau kondisi yang membuatnya tidak sepenuhnya berlaku.',
  nuance: 'Lebih panjang dan formal dibandingkan とはいえ, dan lebih menekankan pengakuan terhadap pandangan atau pernyataan orang lain sebelum menambahkan reservasi. "Memang benar demikian dikatakan, namun kenyataannya..." Sering digunakan dalam esai atau diskusi formal.',
  examples: [
    { jp: '春だ<b>とはいうものの</b>、今年はまだ雪が降っている。', id: 'Meskipun dikatakan sudah musim semi, tahun ini salju masih turun.' },
    { jp: '体に悪い<b>とはいうものの</b>、やめられない人も多い。', id: 'Meski dikatakan buruk bagi kesehatan, tetap banyak orang yang tidak bisa berhenti.' }
  ],
  see_also_grammar: ['gn2-00163'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00163'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00192',
  level: 'n2',
  pattern: '〜をきっかけに',
  reading: '~wo kikkake ni',
  meaning: 'berawal dari ..., dipicu oleh ...',
  cat: 'reason-cause',
  connection: 'N + をきっかけに(して) / V-plain + ことをきっかけに',
  desc: '<b>〜をきっかけに</b> menyatakan bahwa suatu peristiwa atau hal tertentu menjadi titik awal atau pemicu terjadinya perubahan atau tindakan. Pola ini menekankan momen atau kejadian yang menyulut perubahan besar, bukan sekadar penyebab biasa.',
  nuance: 'Berbeda dengan 〜が原因で (penyebab negatif) atau 〜がもとで (berdasarkan pada), 〜をきっかけに menekankan peristiwa pencetus yang menjadi titik balik. Sering digunakan untuk perubahan positif atau netral dalam hidup seseorang. Bentuk 〜をきっかけとして lebih formal.',
  examples: [
    { jp: '留学<b>をきっかけに</b>、外国語に興味を持った。', id: 'Berawal dari pengalaman studi di luar negeri, saya menjadi tertarik pada bahasa asing.' },
    { jp: '友人との出会い<b>をきっかけに</b>、人生が変わった。', id: 'Dipicu oleh pertemuan dengan seorang teman, hidupnya berubah.' },
    { jp: '震災<b>をきっかけに</b>、防災意識が高まった。', id: 'Berawal dari bencana gempa, kesadaran akan kesiapsiagaan bencana meningkat.' },
  ],
  see_also_grammar: ['gn2-00212'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00200',
  level: 'n2',
  pattern: '〜をはじめ',
  reading: '~wo hajime',
  meaning: 'dimulai dari ..., termasuk ... (dan lainnya)',
  cat: 'listing-addition',
  connection: 'N + をはじめ(として) / をはじめとする + N',
  desc: '<b>〜をはじめ</b> menyatakan bahwa suatu hal disebut sebagai contoh pertama atau paling representatif dari sebuah kelompok yang lebih besar. Pola ini membuka daftar dengan menyebutkan yang paling menonjol, lalu mengisyaratkan bahwa masih ada banyak lagi. Bentuk 〜をはじめとする digunakan sebelum kata benda.',
  nuance: 'Berbeda dengan 〜など yang sekadar mendaftar contoh secara kasual, 〜をはじめ memilih satu hal sebagai representasi yang paling penting atau menonjol dari keseluruhan kelompok. Berbeda juga dengan 〜をはじめとして yang lebih formal. Penggunaan 〜をはじめ terasa lebih tegas dan resmi dari sekadar 〜や〜など.',
  examples: [
    { jp: '東京<b>をはじめ</b>、各地で祭りが開催された。', id: 'Di berbagai daerah, termasuk Tokyo, festival diadakan.' },
    { jp: '社長<b>をはじめ</b>、社員全員が参加した。', id: 'Mulai dari direktur hingga seluruh karyawan ikut berpartisipasi.' },
    { jp: '日本語<b>をはじめとする</b>アジアの言語を研究している。', id: 'Saya meneliti bahasa-bahasa Asia, termasuk bahasa Jepang.' },
  ],
  see_also_grammar: ['gn2-00199'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00204',
  level: 'n2',
  pattern: '〜とされている',
  reading: '~to sarete iru',
  meaning: 'dikatakan bahwa ..., dianggap sebagai ...',
  cat: 'quotation-thought',
  connection: 'V-plain / Adj-plain / N + とされている',
  desc: '<b>〜とされている</b> menyatakan bahwa suatu pandangan, penilaian, atau anggapan telah menjadi konsensus umum atau diterima secara luas oleh masyarakat, komunitas ilmiah, atau otoritas tertentu. Berbeda dari hearsay biasa, pola ini mengindikasikan pandangan yang sudah mapan.',
  nuance: 'Dibandingkan 〜と言われている (dikatakan orang, bersifat lebih informal dan bisa berupa rumor), 〜とされている mengindikasikan bahwa anggapan tersebut sudah lebih resmi, misalnya hasil penelitian atau konsensus akademis. 〜と考えられる (gn2-00206) lebih menekankan inferensi logis dari pembicara sendiri.',
  examples: [
    { jp: '睡眠は健康に重要<b>とされている</b>。', id: 'Tidur dianggap penting bagi kesehatan.' },
    { jp: 'この遺跡は江戸時代のもの<b>とされている</b>。', id: 'Situs ini dianggap berasal dari periode Edo.' },
    { jp: '彼は業界の第一人者<b>とされている</b>。', id: 'Dia dianggap sebagai yang terdepan di industri ini.' },
  ],
  see_also_grammar: ['gn2-00205', 'gn2-00206'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00205',
  level: 'n2',
  pattern: '〜と見られている',
  reading: '~to mirarete iru',
  meaning: 'dipandang sebagai ..., diperkirakan ...',
  cat: 'quotation-thought',
  connection: 'V-plain / N + と見られている',
  desc: '<b>〜と見られている</b> menyatakan bahwa suatu situasi, penyebab, atau hasil dinilai atau diperkirakan demikian oleh pihak luar — terutama para ahli, pengamat, atau media. Pola ini sering muncul dalam berita dan laporan untuk menyampaikan analisis atau perkiraan tanpa menjamin kebenarannya secara pasti.',
  nuance: 'Berbeda dengan 〜とされている (sudah mapan sebagai anggapan umum), 〜と見られている lebih bersifat analisis atau perkiraan yang sedang berkembang — belum tentu sudah menjadi konsensus. Sering digunakan untuk penilaian situasi politik, ekonomi, atau investigasi yang masih berlangsung.',
  examples: [
    { jp: '今回の事故は人為的なミスが原因<b>と見られている</b>。', id: 'Kecelakaan kali ini diperkirakan disebabkan oleh kesalahan manusia.' },
    { jp: '景気は来年回復する<b>と見られている</b>。', id: 'Perekonomian diperkirakan akan pulih tahun depan.' },
    { jp: '彼が次期リーダー候補<b>と見られている</b>。', id: 'Dia dipandang sebagai kandidat pemimpin berikutnya.' },
  ],
  see_also_grammar: ['gn2-00204', 'gn2-00206'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal',
  exceptions: null,
  notes: 'ニュース・報道での分析や推測の表現として頻出。',
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00212',
  level: 'n2',
  pattern: '〜を受けて',
  reading: '~wo ukete',
  meaning: 'sebagai respons terhadap ..., setelah menerima ...',
  cat: 'reason-cause',
  connection: 'N + を受けて',
  desc: '<b>〜を受けて</b> menyatakan bahwa suatu tindakan atau keputusan diambil sebagai respons langsung terhadap suatu peristiwa, keputusan, laporan, atau kritik yang telah terjadi sebelumnya. Mengandung makna bahwa tindakan tersebut adalah reaksi yang dipicu oleh sesuatu yang sudah diterima.',
  nuance: 'Berbeda dengan 〜をきっかけに (gn2-00192) yang menekankan pemicu yang memulai perubahan jangka panjang, 〜を受けて menekankan respons langsung dan konkret terhadap suatu peristiwa spesifik. Lebih formal dan sering digunakan dalam konteks organisasi, kebijakan, atau berita.',
  examples: [
    { jp: '市民からの苦情<b>を受けて</b>、市は対策を講じた。', id: 'Sebagai respons terhadap keluhan warga, kota mengambil tindakan.' },
    { jp: '調査結果<b>を受けて</b>、新たな規制が設けられた。', id: 'Setelah menerima hasil investigasi, peraturan baru ditetapkan.' },
    { jp: '社長の指示<b>を受けて</b>、プロジェクトを再開した。', id: 'Merespons instruksi direktur, proyek dilanjutkan kembali.' },
  ],
  see_also_grammar: ['gn2-00192'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal',
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00215',
  level: 'n2',
  pattern: '〜に向けて',
  reading: '~ni mukete',
  meaning: 'menuju ..., dengan tujuan ...',
  cat: 'purpose',
  connection: 'N + に向けて',
  desc: '<b>〜に向けて</b> menyatakan arah tindakan — baik secara fisik (mengarah ke suatu tempat) maupun secara abstrak (dengan tujuan mencapai sesuatu). Dalam makna abstrak, mengandung nuansa usaha atau persiapan yang diarahkan menuju suatu sasaran di masa depan.',
  nuance: 'Berbeda dengan 〜のために yang menyatakan tujuan atau manfaat, 〜に向けて lebih menekankan arah atau orientasi tindakan menuju suatu sasaran. 〜に向けた (gn2-00216) adalah bentuk yang digunakan sebagai modifier sebelum kata benda — perbedaannya hanya gramatikal, bukan makna.',
  examples: [
    { jp: '試合<b>に向けて</b>、毎日練習している。', id: 'Menuju pertandingan, saya berlatih setiap hari.' },
    { jp: '目標の実現<b>に向けて</b>、努力を続ける。', id: 'Menuju terwujudnya tujuan, saya terus berupaya.' },
    { jp: 'カメラ<b>に向けて</b>、微笑んだ。', id: 'Dia tersenyum ke arah kamera.' },
  ],
  see_also_grammar: ['gn2-00216'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00216',
  level: 'n2',
  pattern: '〜に向けた',
  reading: '~ni muketa',
  meaning: 'yang ditujukan untuk ..., yang diarahkan ke ...',
  cat: 'purpose',
  connection: 'N + に向けた + N',
  desc: '<b>〜に向けた</b> adalah bentuk adnominal (prenominal modifier) dari 〜に向けて, yang digunakan untuk menerangkan kata benda. Maknanya identik — menyatakan bahwa sesuatu ditujukan atau diarahkan menuju sasaran tertentu. Contoh: "試合に向けた練習" (latihan menuju pertandingan).',
  nuance: 'Perbedaan dengan 〜に向けて (gn2-00215) murni gramatikal: 〜に向けて digunakan sebagai adverbia (menerangkan verba), sedangkan 〜に向けた digunakan sebagai adjektiva (menerangkan nomina). Keduanya tidak berbeda makna. Pilihan yang tepat bergantung pada fungsi dalam kalimat.',
  examples: [
    { jp: '五輪<b>に向けた</b>選手強化プログラムが始まった。', id: 'Program penguatan atlet yang ditujukan menuju Olimpiade telah dimulai.' },
    { jp: '高齢者<b>に向けた</b>サービスが充実している。', id: 'Layanan yang ditujukan bagi lansia sudah lengkap.' },
    { jp: '環境改善<b>に向けた</b>取り組みを続ける。', id: 'Kami terus melanjutkan upaya yang diarahkan untuk perbaikan lingkungan.' },
  ],
  see_also_grammar: ['gn2-00215'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal',
  exceptions: null,
  notes: '〜に向けて の連体形。名詞修飾に使う。',
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00218',
  level: 'n2',
  pattern: '〜の結果',
  reading: '~no kekka',
  meaning: 'sebagai hasil dari ..., akibat ...',
  cat: 'reason-cause',
  connection: 'N + の結果 / V-た + 結果',
  desc: '<b>〜の結果</b> menyatakan bahwa suatu kondisi atau peristiwa adalah hasil langsung dari tindakan atau proses yang disebutkan sebelumnya. Pola ini menekankan hubungan sebab-akibat yang jelas dan konkret, baik untuk hasil positif maupun negatif.',
  nuance: 'Berbeda dengan 〜の末に (gn2-00219) yang selalu mengandung nuansa proses panjang yang berat atau melelahkan sebelum mencapai hasil, 〜の結果 lebih netral dan dapat digunakan untuk hasil dari proses singkat maupun panjang. 〜の結果 juga lebih formal dan tidak mengandung nuansa emosional.',
  examples: [
    { jp: '努力の<b>結果</b>、試験に合格した。', id: 'Sebagai hasil dari kerja keras, dia lulus ujian.' },
    { jp: '調査<b>の結果</b>、問題の原因が判明した。', id: 'Sebagai hasil investigasi, penyebab masalah terungkap.' },
    { jp: '長年の研究<b>の結果</b>として、新しい発見があった。', id: 'Sebagai hasil penelitian bertahun-tahun, ditemukan penemuan baru.' },
  ],
  see_also_grammar: ['gn2-00219', 'gn2-00213'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00221', level: 'n2', pattern: '〜ようでは',
  reading: '〜you de wa',
  meaning: 'kalau sampai (keadaannya) seperti itu / kalau begini terus maka ...',
  cat: 'contrast-concession',
  connection: 'V-dict / V-ている + ようでは',
  desc: '<b>〜ようでは</b> digunakan untuk menyatakan bahwa jika keadaan atau perilaku seseorang seperti yang disebutkan, maka hasilnya akan buruk atau mengkhawatirkan. Mengandung nada kritik atau peringatan dari pembicara.',
  nuance: 'Berbeda dari ようだ yang hanya mendeskripsikan keadaan — di sini ようでは menekankan kekhawatiran atas kondisi yang ada. Klausa setelahnya biasanya berisi penilaian negatif seperti だめだ, 困る, atau 無理だ. Sering digunakan kepada orang yang lebih muda atau setara, bukan kepada atasan.',
  examples: [
    { jp: 'そんなことも知らない<b>ようでは</b>、試験に合格できないよ。', id: 'Kalau sampai hal seperti itu pun tidak tahu, kamu tidak akan bisa lulus ujian.' },
    { jp: 'ちょっとしたことで諦める<b>ようでは</b>、一人前にはなれない。', id: 'Kalau hanya karena hal sepele saja sudah menyerah, kamu tidak akan bisa jadi orang yang mandiri.' },
  ],
  see_also_grammar: ['gn2-00225'], see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00223', level: 'n2', pattern: '〜とあっては',
  reading: '〜to atte wa',
  meaning: 'karena situasinya ... / mengingat kenyataan ini maka ...',
  cat: 'reason-cause',
  connection: 'N / clause + とあっては',
  desc: '<b>〜とあっては</b> menyatakan bahwa mengingat situasi atau kenyataan yang disebutkan, ada konsekuensi atau tindakan yang tidak bisa dihindari. Menekankan bahwa situasi tersebut memaksa seseorang untuk bertindak.',
  nuance: 'Berbeda dari とあれば (gn2-00222) yang lebih menekankan kerelaan — とあっては lebih menekankan "terpaksa" atau "tidak bisa tidak" karena situasinya sudah seperti itu. Klausa setelahnya sering berisi ekspresi ketidakberdayaan atau keharusan seperti 〜ざるを得ない atau 〜しなければならない.',
  examples: [
    { jp: '上司の命令と<b>あっては</b>、従わざるを得ない。', id: 'Karena ini perintah atasan, tidak ada pilihan selain mengikutinya.' },
    { jp: '緊急事態と<b>あっては</b>、すぐに対応しなければならない。', id: 'Mengingat ini adalah keadaan darurat, harus segera ditangani.' },
  ],
  see_also_grammar: ['gn2-00222', 'gn2-00224'], see_also_vocab: [],
  confusion_pairs: ['gn2-00222'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00224', level: 'n2', pattern: '〜とあって',
  reading: '〜to atte',
  meaning: 'karena ... / dikarenakan ... (sehingga efek/reaksi terlihat nyata)',
  cat: 'reason-cause',
  connection: 'N / clause + とあって',
  desc: '<b>〜とあって</b> menyatakan alasan atau latar belakang dari suatu situasi yang hasilnya terlihat nyata. Sering digunakan dalam laporan atau narasi untuk mendeskripsikan mengapa sesuatu terjadi seperti itu.',
  nuance: 'Berbeda dari から/ので yang netral — とあって mengandung nuansa bahwa kondisi yang disebutkan adalah luar biasa atau penting, sehingga efeknya pun karenanya terlihat jelas. Tidak bisa dipakai untuk keinginan atau perintah. Sering muncul dalam berita, laporan, atau narasi tertulis.',
  examples: [
    { jp: '連休<b>とあって</b>、観光地はどこも大混雑だった。', id: 'Karena ini hari libur panjang, tempat wisata di mana-mana penuh sesak.' },
    { jp: '人気アイドルの来日<b>とあって</b>、ファンが空港に殺到した。', id: 'Dikarenakan kedatangan idola populer ke Jepang, para penggemar berbondong-bondong ke bandara.' },
  ],
  see_also_grammar: ['gn2-00222', 'gn2-00223'], see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00225', level: 'n2', pattern: '〜たところで',
  reading: '〜ta tokoro de',
  meaning: 'meskipun melakukan ... / percuma saja melakukan ...',
  cat: 'contrast-concession',
  connection: 'V-ta + ところで',
  desc: '<b>〜たところで</b> menyatakan bahwa meskipun melakukan tindakan yang disebutkan, hasilnya tidak akan berubah atau tidak ada gunanya. Mengandung makna pesimistis atau resignasi.',
  nuance: 'Berbeda dari ても yang lebih netral — たところで menekankan bahwa usaha tersebut sia-sia atau hasilnya sudah jelas tidak memuaskan. Klausa setelahnya sering berisi negasi atau ekspresi nihilisme seperti 無駄だ, 意味がない, どうにもならない. Berbeda dari ようでは (gn2-00221) yang menilai kondisi — たところで menilai tindakan.',
  examples: [
    { jp: '今さら謝っ<b>たところで</b>、許してもらえないだろう。', id: 'Meskipun minta maaf sekarang pun, kemungkinan besar tidak akan dimaafkan.' },
    { jp: '急いで行っ<b>たところで</b>、もう間に合わない。', id: 'Percuma saja terburu-buru pergi sekarang, sudah tidak akan tepat waktu.' },
  ],
  see_also_grammar: ['gn2-00221', 'gn2-00226'], see_also_vocab: [],
  confusion_pairs: ['gn2-00226'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00226', level: 'n2', pattern: '〜にしても',
  reading: '〜ni shite mo',
  meaning: 'meskipun ... / sekalipun ... / bahkan kalau ...',
  cat: 'contrast-concession',
  connection: 'V-plain / Adj-plain / N + にしても',
  desc: '<b>〜にしても</b> menyatakan konsesi — "meskipun begitu, tetap saja...". Digunakan untuk menyampaikan bahwa bahkan dalam kondisi yang disebutkan, kesimpulan atau penilaian tertentu tetap berlaku.',
  nuance: 'Mirip dengan としても namun にしても lebih sering digunakan dalam situasi konkret atau nyata, bukan hipotetis. Bisa bermakna "terlepas apakah A atau B" saat diulang (にしても〜にしても). Berbeda dari にしては yang berarti "untuk ukuran ..." — nuansanya sama sekali berbeda.',
  examples: [
    { jp: '忙しい<b>にしても</b>、連絡ぐらいはするべきだ。', id: 'Meskipun sibuk, minimal harus memberi kabar.' },
    { jp: 'ミスをした<b>にしても</b>、あの言い方はひどすぎる。', id: 'Sekalipun sudah membuat kesalahan, cara bicara itu terlalu keterlaluan.' },
  ],
  see_also_grammar: ['gn2-00227', 'gn2-00225'], see_also_vocab: [],
  confusion_pairs: ['gn2-00227', 'gn2-00225'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00227', level: 'n2', pattern: '〜にしろ〜にしろ',
  reading: '〜ni shiro〜ni shiro',
  meaning: 'baik ... maupun ... / entah ... atau ...',
  cat: 'listing-addition',
  connection: 'V-plain / N + にしろ〜にしろ',
  desc: '<b>〜にしろ〜にしろ</b> menyatakan bahwa terlepas dari pilihan atau kondisi mana yang berlaku (A atau B), kesimpulan yang sama tetap berlaku. Digunakan untuk menyatakan inklusivitas dari dua kemungkinan.',
  nuance: 'Hampir sama dengan にせよ〜にせよ yang lebih formal. にしろ〜にしろ lebih sering digunakan dalam percakapan sehari-hari. Berbeda dari 〜であれ〜であれ (gn2-00228) yang lebih formal dan tertulis, serta lebih terbatas pada nomina.',
  examples: [
    { jp: '賛成する<b>にしろ</b>反対する<b>にしろ</b>、まず意見を言うべきだ。', id: 'Entah setuju atau tidak, yang penting harus menyampaikan pendapat terlebih dahulu.' },
    { jp: '行く<b>にしろ</b>行かない<b>にしろ</b>、早めに決めてください。', id: 'Baik pergi maupun tidak, mohon segera buat keputusan.' },
  ],
  see_also_grammar: ['gn2-00228', 'gn2-00226'], see_also_vocab: [],
  confusion_pairs: ['gn2-00228', 'gn2-00226'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00228', level: 'n2', pattern: '〜であれ〜であれ',
  reading: '〜de are〜de are',
  meaning: 'baik ... maupun ... (formal) / apapun pilihannya ...',
  cat: 'listing-addition',
  connection: 'N + であれ〜N + であれ',
  desc: '<b>〜であれ〜であれ</b> menyatakan bahwa apapun pilihannya dari dua kemungkinan yang disebutkan, kesimpulan yang sama berlaku. Merupakan ekspresi yang lebih formal dibandingkan にしろ〜にしろ.',
  nuance: 'Lebih formal dari にしろ〜にしろ (gn2-00227) — であれ〜であれ umumnya muncul dalam tulisan formal, pidato, atau dokumen resmi. Digunakan terutama dengan nomina. Berbeda dari であれ standalone yang bermakna "meskipun/sekalipun" dan berfungsi sebagai konsesi.',
  examples: [
    { jp: '男<b>であれ</b>女<b>であれ</b>、この規則はすべての人に適用される。', id: 'Baik laki-laki maupun perempuan, aturan ini berlaku untuk semua orang.' },
    { jp: '賛成<b>であれ</b>反対<b>であれ</b>、理由を明確にして意見を述べてください。', id: 'Baik setuju maupun tidak, silakan sampaikan pendapat dengan alasan yang jelas.' },
  ],
  see_also_grammar: ['gn2-00227', 'gn2-00229'], see_also_vocab: [],
  confusion_pairs: ['gn2-00227'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00229', level: 'n2', pattern: '〜であろうと',
  reading: '〜de arou to',
  meaning: 'meskipun ... / sekalipun ... / tidak peduli apakah ...',
  cat: 'contrast-concession',
  connection: 'N / V-volitional form + であろうと',
  desc: '<b>〜であろうと</b> menyatakan bahwa terlepas dari kondisi atau keadaan yang disebutkan, hasil atau tindakan tetap sama. Merupakan ungkapan formal yang menekankan tidak ada pengecualian.',
  nuance: 'Lebih formal dari でも (meskipun). Sering muncul dalam konteks argumentasi atau pernyataan prinsip. Bisa dikombinasikan menjadi 〜であろうと〜であろうと untuk dua alternatif, mirip dengan であれ〜であれ (gn2-00228). Berbeda dari であれ〜であれ yang lebih terbatas pada dua pilihan eksplisit.',
  examples: [
    { jp: '相手が誰<b>であろうと</b>、礼儀は守らなければならない。', id: 'Meskipun lawannya siapa saja, sopan santun harus tetap dijaga.' },
    { jp: 'どんな困難<b>であろうと</b>、諦めずに立ち向かう。', id: 'Sekalipun kesulitannya seperti apa, aku akan menghadapinya tanpa menyerah.' },
  ],
  see_also_grammar: ['gn2-00228', 'gn2-00230'], see_also_vocab: [],
  confusion_pairs: ['gn2-00230'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00230', level: 'n2', pattern: '〜ようが〜まいが',
  reading: '〜you ga〜mai ga',
  meaning: 'mau ... atau tidak, tetap saja ... / entah ... atau tidak ...',
  cat: 'contrast-concession',
  connection: 'V-dict + ようが + V-dict + まいが',
  desc: '<b>〜ようが〜まいが</b> menyatakan bahwa terlepas dari apakah seseorang melakukan sesuatu atau tidak, hasilnya tetap sama. Menggabungkan ようが (meskipun melakukan) dan まいが (meskipun tidak melakukan) untuk menekankan totalitas ketidakpedulian.',
  nuance: 'Merupakan kombinasi dari ようと dan まいと (versi lebih formal). Digunakan untuk menekankan "tidak ada pengaruhnya apapun yang dilakukan atau tidak." Berbeda dari ようと〜まいと yang sedikit lebih formal namun bermakna sama. Verb yang digunakan biasanya sama di kedua bagian.',
  examples: [
    { jp: 'あなたが信じ<b>ようが</b>信じ<b>まいが</b>、これは事実だ。', id: 'Mau kamu percaya atau tidak, ini adalah kenyataan.' },
    { jp: '雨が降り<b>ようが</b>降る<b>まいが</b>、試合は決行される。', id: 'Entah hujan turun atau tidak, pertandingan tetap akan dilangsungkan.' },
  ],
  see_also_grammar: ['gn2-00229', 'gn2-00231'], see_also_vocab: [],
  confusion_pairs: ['gn2-00229'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00237', level: 'n2', pattern: '〜くせに',
  reading: '〜kuse ni',
  meaning: 'padahal ... / meski sebenarnya ... (kecewa atau kritis terhadap seseorang)',
  cat: 'contrast-concession',
  connection: 'V-plain / Adj-plain / N + の + くせに',
  desc: '<b>〜くせに</b> menyatakan kontras antara kenyataan dan perilaku seseorang, dengan nada kecewa, kritis, atau menyalahkan. Digunakan ketika pembicara merasa seseorang tidak konsisten dengan kondisi atau kemampuannya.',
  nuance: 'Berbeda dari のに (gn2-00238) yang lebih netral — くせに selalu mengandung nuansa kritik atau ketidakpuasan yang ditujukan kepada orang tertentu. Tidak sopan digunakan kepada orang yang lebih tua atau atasan. Subyek biasanya orang lain, bukan diri sendiri.',
  examples: [
    { jp: '知らない<b>くせに</b>、知ったかぶりをするな。', id: 'Padahal tidak tahu apa-apa, jangan sok tahu.' },
    { jp: '自分もできない<b>くせに</b>、人のことをとやかく言うな。', id: 'Kamu sendiri juga tidak bisa, tapi malah mengkritik orang lain.' },
  ],
  see_also_grammar: ['gn2-00238'], see_also_vocab: [],
  confusion_pairs: ['gn2-00238'],
  register: null, exceptions: null, notes: 'Tidak sopan — hindari penggunaan kepada orang yang lebih tua atau atasan.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00238', level: 'n2', pattern: '〜のに',
  reading: '〜no ni',
  meaning: 'padahal ... / tapi ... (harapan vs kenyataan yang mengecewakan)',
  cat: 'contrast-concession',
  connection: 'V-plain / Adj-plain / N + な + のに',
  desc: '<b>〜のに</b> menyatakan kontras antara harapan atau logika dengan kenyataan yang mengecewakan. Digunakan ketika pembicara merasa sesuatu tidak berjalan seperti yang seharusnya.',
  nuance: 'Berbeda dari が dan けど yang netral — のに selalu mengandung unsur kekecewaan atau kejutan negatif. Berbeda dari くせに (gn2-00237) yang lebih kasar dan kritis — のに lebih umum dan bisa digunakan dalam berbagai situasi. Catatan: のに juga bermakna "untuk/demi" (purpose) ketika diikuti V-dict — fungsi yang sama sekali berbeda.',
  examples: [
    { jp: 'せっかく来た<b>のに</b>、彼女はいなかった。', id: 'Padahal sudah jauh-jauh datang, tapi ternyata dia tidak ada.' },
    { jp: 'こんなに頑張っている<b>のに</b>、なぜ評価してもらえないんだろう。', id: 'Padahal sudah berusaha sekeras ini, tapi mengapa tidak diapresiasi.' },
  ],
  see_also_grammar: ['gn2-00237', 'gn2-00235'], see_also_vocab: [],
  confusion_pairs: ['gn2-00237', 'gn2-00235'],
  register: null, exceptions: null, notes: 'Jangan bingung dengan のに bermakna "untuk/demi" (purpose): 〜するのに必要だ.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00242', level: 'n2', pattern: '〜いかんにかかわらず',
  reading: '〜ikan ni kakawarazu',
  meaning: 'terlepas dari ... / tidak peduli bagaimanapun ... (formal)',
  cat: 'contrast-concession',
  connection: 'N + いかんにかかわらず',
  desc: '<b>〜いかんにかかわらず</b> menyatakan bahwa apapun kondisi atau hasilnya, sesuatu tetap berlaku. Merupakan ungkapan formal yang berarti "tidak bergantung pada" atau "terlepas dari."',
  nuance: 'Kebalikan dari いかんによっては (gn2-00241) — di sini kondisi tidak berpengaruh pada hasilnya. Mirip dengan にかかわらず yang lebih umum, namun kombinasi dengan いかん menambah keformalan. Sering muncul dalam dokumen resmi, peraturan, atau pengumuman resmi.',
  examples: [
    { jp: '理由<b>いかんにかかわらず</b>、無断欠席は認められない。', id: 'Terlepas dari alasan apapun, ketidakhadiran tanpa izin tidak dapat dibenarkan.' },
    { jp: '結果<b>いかんにかかわらず</b>、参加したことに意義がある。', id: 'Terlepas dari hasilnya, ada makna tersendiri dalam keikutsertaan ini.' },
  ],
  see_also_grammar: ['gn2-00240', 'gn2-00241'], see_also_vocab: [],
  confusion_pairs: ['gn2-00241'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00251', level: 'n2', pattern: '〜をはじめとして',
  reading: '〜wo hajime to shite',
  meaning: 'dimulai dengan ..., termasuk di antaranya ...',
  cat: 'listing-addition',
  connection: 'N + をはじめとして',
  desc: '<b>〜をはじめとして</b> menyatakan bahwa suatu hal disebutkan sebagai contoh perwakilan dari sekelompok hal serupa. Nuansanya formal dan sering muncul dalam tulisan resmi, laporan, atau pidato. Subjek yang ditandai berfungsi sebagai "wakil" dari kelompok yang lebih besar.',
  nuance: 'Mirip dengan をはじめ(とする) (gn2-00252), tetapi をはじめとして lebih sering berdiri sendiri sebagai frasa pengantar tanpa langsung memodifikasi nomina berikutnya. をはじめとする lebih sering dipakai sebagai prenominal modifier (〜をはじめとする + N). Keduanya lebih formal daripada など.',
  examples: [
    { jp: '東京<b>をはじめとして</b>、日本各地で祭りが開催された。', id: 'Dimulai dari Tokyo, festival diselenggarakan di berbagai tempat di Jepang.' },
    { jp: '鈴木先生<b>をはじめとして</b>、多くの先生方にお世話になりました。', id: 'Dimulai dari Sensei Suzuki, saya mendapat banyak bantuan dari para guru.' },
  ],
  see_also_grammar: ['gn2-00252'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00252'],
  register: 'formal',
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00252', level: 'n2', pattern: '〜をはじめ(とする)',
  reading: '〜wo hajime (to suru)',
  meaning: 'mulai dari ..., dan lainnya seperti ...',
  cat: 'listing-addition',
  connection: 'N + をはじめ / N + をはじめとする + N',
  desc: '<b>〜をはじめ</b> digunakan untuk menyebut satu contoh representatif dari kelompok yang lebih besar, menyiratkan bahwa ada banyak hal serupa lainnya. Bentuk <b>〜をはじめとする</b> berfungsi sebagai prenominal modifier untuk mendeskripsikan nomina setelahnya.',
  nuance: 'をはじめ dapat berdiri sendiri (東京をはじめ、各地で…) atau menjadi modifier (東京をはじめとする都市). Dibanding をはじめとして (gn2-00251), をはじめとする lebih sering dipakai sebagai modifier sebelum nomina. Keduanya setara dalam register formalnya — lebih formal dari など, lebih natural dalam fungsi modifier dibanding をはじめとして.',
  examples: [
    { jp: '日本語<b>をはじめ</b>、英語や中国語も話せます。', id: 'Mulai dari bahasa Jepang, saya juga bisa berbicara bahasa Inggris dan Mandarin.' },
    { jp: '東京<b>をはじめとする</b>大都市では、人口が集中している。', id: 'Di kota-kota besar mulai dari Tokyo, penduduk terkonsentrasi.' },
  ],
  see_also_grammar: ['gn2-00251'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00251'],
  register: 'formal',
  exceptions: null,
  notes: 'をはじめとする + N digunakan sebagai prenominal modifier; をはじめとして lebih sering sebagai frasa pengantar klausa.',
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00253', level: 'n2', pattern: '〜のみならず〜も',
  reading: '〜nomi narazu 〜mo',
  meaning: 'bukan hanya ..., bahkan ... juga',
  cat: 'listing-addition',
  connection: 'V-plain / い-Adj / な-Adj + なの / N + のみならず',
  desc: '<b>〜のみならず〜も</b> menyatakan bahwa tidak hanya hal A yang berlaku, tetapi hal B yang lebih luas atau lebih mengejutkan juga berlaku. Nuansanya formal dan sering muncul dalam tulisan akademik atau berita. Bagian setelah も memperkuat atau memperluas pernyataan pertama.',
  nuance: 'のみならず adalah padanan formal dari だけでなく (gn2-00254). のみ adalah bentuk formal dari だけ, sehingga のみならず tidak cocok untuk percakapan sehari-hari. Bandingkan juga dengan ばかりか (gn2-00256) yang memberi nuansa lebih mengejutkan/mengintensifkan, dan に加えて (gn2-00255) yang menekankan "penambahan kumulatif".',
  examples: [
    { jp: '彼は日本語<b>のみならず</b>、英語<b>も</b>流暢に話せる。', id: 'Bukan hanya bahasa Jepang, dia juga lancar berbicara bahasa Inggris.' },
    { jp: '環境問題は国内<b>のみならず</b>、世界全体の問題で<b>も</b>ある。', id: 'Masalah lingkungan bukan hanya masalah domestik, bahkan juga masalah seluruh dunia.' },
  ],
  see_also_grammar: ['gn2-00254', 'gn2-00255', 'gn2-00256'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00254', 'gn2-00256', 'gn2-00260'],
  register: 'formal',
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00254', level: 'n2', pattern: '〜だけでなく〜も',
  reading: '〜dake de naku 〜mo',
  meaning: 'tidak hanya ..., tapi juga ...',
  cat: 'listing-addition',
  connection: 'V-plain / い-Adj / な-Adj + なの / N + だけでなく',
  desc: '<b>〜だけでなく〜も</b> menyatakan bahwa tidak hanya A tetapi juga B. Ini adalah bentuk yang paling umum dan netral untuk mengekspresikan "tidak hanya ... tapi juga" dan dapat digunakan dalam hampir semua konteks, baik lisan maupun tulisan.',
  nuance: 'だけでなく adalah bentuk paling netral dan dapat dipakai dalam percakapan biasa maupun tulisan formal. のみならず (gn2-00253) adalah padanan yang lebih formal dan terasa kaku dalam obrolan. ばかりか (gn2-00256/gn2-00257) memberi nuansa bahwa hal kedua lebih mengejutkan. に加えて (gn2-00255) menekankan "penambahan" daripada cakupan yang diperluas.',
  examples: [
    { jp: '彼女は歌が上手な<b>だけでなく</b>、ダンス<b>も</b>できる。', id: 'Tidak hanya pandai menyanyi, dia juga bisa menari.' },
    { jp: '健康のため<b>だけでなく</b>、ストレス解消のために<b>も</b>運動しています。', id: 'Saya berolahraga tidak hanya untuk kesehatan, tapi juga untuk menghilangkan stres.' },
  ],
  see_also_grammar: ['gn2-00253', 'gn2-00255', 'gn2-00256'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00253', 'gn2-00255'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00255', level: 'n2', pattern: '〜に加えて',
  reading: '〜ni kuwaete',
  meaning: 'ditambah dengan ..., selain itu ...',
  cat: 'listing-addition',
  connection: 'N + に加えて',
  desc: '<b>〜に加えて</b> menyatakan penambahan sesuatu di atas hal yang sudah ada atau sudah disebutkan sebelumnya. Nuansanya menekankan "penambahan/akumulasi" bukan perluasan cakupan. Sering dipakai ketika hal yang ditambahkan bersifat nyata dan konkret.',
  nuance: 'に加えて menekankan penambahan kumulatif — A sudah ada, dan B ditambahkan di atasnya. Berbeda dengan だけでなく (gn2-00254) yang menekankan "tidak terbatas pada A saja". に加えて tidak mengandung nuansa kejutan seperti ばかりか (gn2-00256/gn2-00257). Cocok untuk konteks di mana dua hal positif saling melengkapi atau dua masalah saling memperparah.',
  examples: [
    { jp: '経験<b>に加えて</b>、資格もあれば採用される可能性が高い。', id: 'Ditambah dengan pengalaman, jika memiliki kualifikasi pun kemungkinan diterima semakin tinggi.' },
    { jp: '台風の被害<b>に加えて</b>、洪水まで起きてしまった。', id: 'Ditambah dengan kerusakan akibat topan, bahkan banjir pun terjadi.' },
  ],
  see_also_grammar: ['gn2-00253', 'gn2-00254'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00254'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00256', level: 'n2', pattern: '〜ばかりか〜まで',
  reading: '〜bakari ka 〜made',
  meaning: 'bukan hanya ..., bahkan sampai ...',
  cat: 'listing-addition',
  connection: 'V-plain / い-Adj / な-Adj + なの / N + ばかりか',
  desc: '<b>〜ばかりか〜まで</b> mengekspresikan bahwa tidak hanya A (yang sudah cukup mengejutkan), tetapi bahkan B yang lebih ekstrem atau tak terduga juga terjadi. Kombinasi dengan まで memperkuat rasa kejutan dan menekankan bahwa sesuatu telah "melampaui batas" yang diperkirakan.',
  nuance: 'ばかりか selalu diikuti elemen kedua yang melebihi ekspektasi — nuansanya lebih kuat daripada だけでなく (gn2-00254) atau のみならず (gn2-00253). Varian ばかりか〜さえ (gn2-00257) menggunakan さえ untuk nuansa "bahkan hal tak terduga itu pun terlibat". まで menekankan batas yang terlampaui; さえ menekankan ketidakterdugaan subjek yang disebutkan.',
  examples: [
    { jp: '彼は謝らない<b>ばかりか</b>、逆に怒り出し<b>まで</b>した。', id: 'Bukan hanya tidak minta maaf, bahkan sampai balik marah.' },
    { jp: '体調が悪い<b>ばかりか</b>、熱<b>まで</b>出てしまった。', id: 'Bukan hanya kondisi badannya buruk, bahkan sampai demam.' },
  ],
  see_also_grammar: ['gn2-00253', 'gn2-00254', 'gn2-00257'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00253', 'gn2-00257'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00257', level: 'n2', pattern: '〜ばかりか〜さえ',
  reading: '〜bakari ka 〜sae',
  meaning: 'bukan hanya ..., bahkan ...',
  cat: 'listing-addition',
  connection: 'V-plain / い-Adj / な-Adj + なの / N + ばかりか',
  desc: '<b>〜ばかりか〜さえ</b> menyatakan bahwa tidak hanya A, bahkan B yang tak terduga atau sulit dipercaya pun ikut berlaku. さえ menekankan kejutan atas hal yang biasanya dianggap tidak mungkin atau tidak terduga, memberikan nuansa lebih dramatis.',
  nuance: 'ばかりか〜さえ dan ばかりか〜まで (gn2-00256) keduanya mengungkapkan "bukan hanya... bahkan..." dengan nuansa mengejutkan. まで (gn2-00256) menekankan pencapaian batas ekstrem ("sampai sejauh itu"), sementara さえ menekankan ketidakterdugaan subjek yang disebutkan ("hal itu saja pun terjadi"). さえ sering dipakai ketika hal kedua terasa hampir mustahil.',
  examples: [
    { jp: '彼は宿題をやらない<b>ばかりか</b>、教科書<b>さえ</b>持ってこない。', id: 'Bukan hanya tidak mengerjakan PR, bahkan buku teks saja pun tidak dibawa.' },
    { jp: '病気で食事ができない<b>ばかりか</b>、水<b>さえ</b>飲めない状態だ。', id: 'Bukan hanya tidak bisa makan karena sakit, bahkan air saja pun tidak bisa diminum.' },
  ],
  see_also_grammar: ['gn2-00253', 'gn2-00256'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00256'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00258', level: 'n2', pattern: '〜はもちろん〜も',
  reading: '〜wa mochiron 〜mo',
  meaning: 'sudah tentu ..., dan ... juga',
  cat: 'listing-addition',
  connection: 'N + はもちろん',
  desc: '<b>〜はもちろん〜も</b> menyatakan bahwa A sudah pasti/tentu berlaku, dan di samping itu B juga berlaku. Nuansanya menyiratkan bahwa A adalah hal yang sudah jelas dan tidak perlu dipertanyakan, lalu menambahkan B sebagai informasi tambahan.',
  nuance: 'はもちろん lebih natural dalam percakapan sehari-hari, sedangkan はもとより (gn2-00259) terasa lebih formal/tertulis. Keduanya bermakna dasar "A sudah jelas, B pun juga". Berbeda dengan だけでなく (gn2-00254) — もちろん secara eksplisit menyatakan bahwa A adalah hal yang "sudah pasti/given", memberi penekanan retoris bahwa A tidak perlu diperdebatkan.',
  examples: [
    { jp: '彼は英語は<b>もちろん</b>、中国語<b>も</b>ぺらぺらだ。', id: 'Bahasa Inggris sudah tentu, bahasa Mandarin pun dia fasih.' },
    { jp: '健康のため<b>はもちろん</b>、ダイエット<b>も</b>兼ねて走っています。', id: 'Sudah tentu untuk kesehatan, dan juga sekaligus diet, saya berlari.' },
  ],
  see_also_grammar: ['gn2-00253', 'gn2-00254', 'gn2-00259'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00259'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00259', level: 'n2', pattern: '〜はもとより',
  reading: '〜wa moto yori',
  meaning: '(itu) sudah jelas ..., apalagi ...',
  cat: 'listing-addition',
  connection: 'N + はもとより',
  desc: '<b>〜はもとより</b> menyatakan bahwa A adalah hal yang sudah seharusnya/sudah jelas berlaku, dan menambahkan bahwa B yang lebih luas atau lebih mengejutkan juga berlaku. Ekspresi ini lebih formal dibanding はもちろん dan sering muncul dalam tulisan resmi atau pernyataan formal.',
  nuance: 'はもとより vs はもちろん (gn2-00258): keduanya bermakna "sudah jelas A, dan B pun juga", tetapi はもとより bersifat lebih formal dan tertulis, jarang dipakai dalam percakapan biasa. Penggunaan はもとより dalam obrolan sehari-hari dapat terdengar kaku dan berlebihan. はもとより juga lebih sering menyiratkan bahwa A adalah hal yang benar-benar "taken for granted".',
  examples: [
    { jp: '彼女は国内<b>はもとより</b>、海外でも活躍している。', id: 'Dia sudah jelas aktif di dalam negeri, bahkan di luar negeri pun demikian.' },
    { jp: '基本的なことは<b>もとより</b>、応用的な内容も理解しておく必要がある。', id: 'Hal dasar sudah tentu, kita juga perlu memahami konten yang bersifat aplikatif.' },
  ],
  see_also_grammar: ['gn2-00258'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00258'],
  register: 'formal',
  exceptions: null,
  notes: 'もとより sendiri (tanpa は) juga bermakna "sejak awal / dari dulu" dalam konteks berbeda.',
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00260', level: 'n2', pattern: '〜にかぎらず',
  reading: '〜ni kagirazu',
  meaning: 'tidak hanya ..., tidak terbatas pada ...',
  cat: 'listing-addition',
  connection: 'N + にかぎらず',
  desc: '<b>〜にかぎらず</b> berarti "tidak terbatas hanya pada N, tetapi juga mencakup hal lain". Pola ini digunakan untuk memperluas cakupan pernyataan: N yang disebutkan bukan satu-satunya yang relevan, melainkan hanya salah satu dari banyak contoh.',
  nuance: 'にかぎらず mengandung nuansa "pencabutan batasan" — N yang disebut bukan eksklusif/satu-satunya yang relevan. Berbeda dengan のみならず (gn2-00253) yang menekankan "penambahan", にかぎらず lebih menekankan "tidak eksklusif/tidak terbatas pada satu hal itu saja". Sering muncul dalam konteks saran atau pernyataan umum.',
  examples: [
    { jp: 'これは子供<b>にかぎらず</b>、大人にも言えることだ。', id: 'Ini bukan hanya berlaku untuk anak-anak, tapi juga berlaku untuk orang dewasa.' },
    { jp: '日本<b>にかぎらず</b>、アジア全体で同じ問題が起きている。', id: 'Tidak terbatas hanya di Jepang, masalah yang sama terjadi di seluruh Asia.' },
  ],
  see_also_grammar: ['gn2-00253', 'gn2-00254'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00253'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00269', level: 'n2', pattern: '〜による',
  reading: '〜ni yoru',
  meaning: 'yang disebabkan oleh ..., berdasarkan ...',
  cat: 'reason-cause',
  connection: 'N + による + N / N + によって',
  desc: '<b>〜による</b> memiliki beberapa makna: (1) penyebab atau agen tindakan (〜によって = oleh.../karena...); (2) cara atau metode (〜による = dengan cara...); (3) sumber informasi (〜によれば = menurut...). Bentuk による digunakan sebagai prenominal modifier; によって sebagai adverbial.',
  nuance: 'による adalah kata multifungsi. Sebagai penyebab: 地震による被害 (kerusakan akibat gempa) — lebih formal dari で. Sebagai agen pasif: 彼によって発見された (ditemukan olehnya). Sebagai metode: メールによる連絡 (kontak melalui email). Jangan dikacaukan dengan によっては (gn2-00274) yang bermakna "tergantung", atau によって異なる (gn2-00270) yang menyatakan variasi.',
  examples: [
    { jp: '台風<b>による</b>被害が各地で報告された。', id: 'Kerusakan yang disebabkan oleh topan dilaporkan di berbagai tempat.' },
    { jp: '新薬は最先端技術<b>によって</b>開発された。', id: 'Obat baru dikembangkan dengan menggunakan teknologi mutakhir.' },
  ],
  see_also_grammar: ['gn2-00267', 'gn2-00268', 'gn2-00270', 'gn2-00274'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00268', 'gn2-00270'],
  register: null,
  exceptions: null,
  notes: 'によれば = menurut ... (bentuk kondisional untuk sumber informasi/hearsay).',
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00271', level: 'n2', pattern: '〜いかんにかかわらず',
  reading: '〜ikan ni kakawarazu',
  meaning: 'terlepas dari bagaimana ..., tidak peduli hasil ...',
  cat: 'contrast-concession',
  connection: 'N + のいかんにかかわらず / N + いかんにかかわらず',
  desc: '<b>〜いかんにかかわらず</b> menyatakan bahwa terlepas dari bagaimana kondisi atau hasil N, hal tersebut tidak mengubah kesimpulan atau tindakan yang diambil. 如何 (いかん) berarti "bagaimana keadaannya", sehingga ekspresi ini menyatakan bahwa kondisi N sama sekali tidak relevan/tidak berpengaruh.',
  nuance: 'いかんにかかわらず adalah ekspresi sangat formal — biasanya muncul dalam dokumen resmi, syarat dan ketentuan, atau pernyataan formal. Untuk percakapan, padanan yang lebih natural adalah 〜にかかわらず atau 〜に関係なく. Berbeda dari 次第だ (gn2-00272) yang menyatakan "bergantung pada N" — いかんにかかわらず justru menyatakan "TIDAK bergantung pada N".',
  examples: [
    { jp: '結果<b>のいかんにかかわらず</b>、最後まで全力を尽くします。', id: 'Terlepas dari bagaimana hasilnya, saya akan berusaha sepenuh tenaga sampai akhir.' },
    { jp: '天候<b>のいかんにかかわらず</b>、イベントは予定通り開催されます。', id: 'Terlepas dari kondisi cuaca bagaimanapun, acara akan diselenggarakan sesuai rencana.' },
  ],
  see_also_grammar: ['gn2-00272', 'gn2-00274'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00272'],
  register: 'formal',
  exceptions: null,
  notes: 'いかんによっては = "tergantung bagaimana kondisinya" — berlawanan makna dengan いかんにかかわらず.',
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn2-00306', level: 'n2', pattern: '〜もので',
  reading: '〜mono de',
  meaning: 'karena ..., disebabkan oleh ... (alasan alami atau sifat yang melekat)',
  cat: 'reason-cause',
  connection: 'V-plain / Adj-plain / N + な + もので',
  desc: '<b>〜もので</b> dipakai untuk menyatakan alasan yang bersifat alami, inheren, atau merupakan sifat yang melekat pada subjek atau situasi. Pembicara menyampaikan alasan sebagai sesuatu yang wajar dan dapat dimaklumi karena memang "seperti itulah adanya." Nuansanya lebih objektif dibandingkan 〜ものだから yang lebih membenarkan diri.',
  nuance: 'Spektrum formalitas keluarga pola もの-alasan: もんで (gn2-00310, sangat kasual) < もので kasual (gn2-00309) < もので formal/netral (gn2-00306) < ものだから (gn2-00307, semi-formal) < ものですから (gn2-00308, sopan). もので (306) lebih objektif dan netral — cocok untuk situasi semi-formal atau saat alasannya merupakan sifat alami yang tidak dapat dihindari.',
  examples: [
    { jp: '子供な<b>もので</b>、まだ上手に話せません。', id: 'Maklumlah, masih anak-anak, jadi belum bisa bicara dengan baik.' },
    { jp: '初めての経験な<b>もので</b>、不慣れな点はご容赦ください。', id: 'Karena ini pertama kali bagi saya, mohon dimaklumi kalau ada yang kurang.' },
  ],
  see_also_grammar: ['gn2-00307', 'gn2-00308', 'gn2-00309', 'gn2-00310', 'gn2-00303'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00307', 'gn2-00308', 'gn2-00309', 'gn2-00310'],
  register: null, exceptions: null,
  notes: 'Nuansa lebih objektif/formal dibandingkan ものだから. Lihat gn2-00307–00310 untuk spektrum formalitas lengkap.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00307', level: 'n2', pattern: '〜ものだから',
  reading: '〜mono dakara',
  meaning: 'karena ..., sebab ... (membenarkan diri atau menjelaskan penyebab)',
  cat: 'reason-cause',
  connection: 'V-plain / Adj-plain / N + な + ものだから',
  desc: '<b>〜ものだから</b> dipakai untuk menyatakan alasan dengan nuansa pembicara membenarkan perilaku atau situasinya sendiri. Lebih kuat dari 〜から atau 〜ので, mengandung sedikit nada pembelaan diri atau permintaan maklum. Sering muncul dalam percakapan ketika seseorang menjelaskan mengapa melakukan sesuatu yang mungkin kurang tepat.',
  nuance: '〜ものだから vs 〜もので (gn2-00306): ものだから lebih bersifat subjektif dan membenarkan diri, sering terasa seperti "maklumlah, aku melakukan itu karena..."; sedangkan もので lebih objektif dan alami. 〜ものだから vs 〜ものですから (gn2-00308): ものだから adalah versi kasual-semi-formal; ものですから adalah versi lebih sopan, dipakai saat berbicara dengan atasan atau dalam situasi formal.',
  examples: [
    { jp: '急いでいた<b>ものだから</b>、メールを確認し忘れた。', id: 'Soalnya terburu-buru, jadi lupa mengecek email.' },
    { jp: '疲れていた<b>ものだから</b>、約束をすっかり忘れてしまった。', id: 'Karena kelelahan, aku benar-benar lupa dengan janjinya.' },
  ],
  see_also_grammar: ['gn2-00306', 'gn2-00308', 'gn2-00303'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00306', 'gn2-00308'],
  register: null, exceptions: null,
  notes: 'Lebih kasual dari 〜ものですから. Dipakai dalam percakapan sehari-hari semi-formal.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00308', level: 'n2', pattern: '〜ものですから',
  reading: '〜mono desu kara',
  meaning: 'karena ... (sopan, memohon pengertian dari lawan bicara)',
  cat: 'reason-cause',
  connection: 'V-plain / Adj-plain / N + な + ものですから',
  desc: '<b>〜ものですから</b> adalah versi sopan dan formal dari 〜ものだから (gn2-00307). Dipakai untuk memberikan alasan dengan nada memohon pengertian atau maklum dari pihak lain, terutama dalam situasi formal seperti saat berbicara dengan atasan, pelanggan, atau dalam surat resmi. Nuansanya sangat sopan dan menunjukkan kesadaran sosial pembicara.',
  nuance: 'Spektrum formalitas: もんで (sangat kasual) < もので kasual < もので formal < ものだから (semi-formal) < ものですから (sopan/formal). Pilih ものですから saat berbicara dengan orang yang lebih tinggi statusnya atau dalam situasi yang memerlukan kesopanan tinggi. Versi ini paling sering muncul dalam surat resmi, email bisnis, atau percakapan formal di tempat kerja.',
  examples: [
    { jp: '体調が優れない<b>ものですから</b>、早退させていただけますか。', id: 'Karena kondisi badan kurang baik, bolehkah saya izin pulang lebih awal?' },
    { jp: '初めての参加な<b>ものですから</b>、ご説明いただけますと幸いです。', id: 'Karena ini pertama kali saya ikut serta, saya akan sangat berterima kasih kalau berkenan menjelaskan.' },
  ],
  see_also_grammar: ['gn2-00306', 'gn2-00307', 'gn2-00309'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00307', 'gn2-00306'],
  register: 'teineigo', exceptions: null,
  notes: 'Pola paling formal dalam keluarga ものだから. Direkomendasikan untuk komunikasi bisnis dan surat resmi.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00309', level: 'n2', pattern: '〜もので',
  reading: '〜mono de',
  meaning: 'karena ... (kasual, sehari-hari — versi lisan dan santai)',
  cat: 'reason-cause',
  connection: 'V-plain / Adj-plain + もので (konteks lisan, kasual)',
  desc: '<b>〜もので</b> dalam register kasual dipakai dalam percakapan sehari-hari untuk menyatakan alasan secara santai. Meskipun bentuknya sama dengan 〜もので (gn2-00306), nuansanya lebih ringan dan spontan — lebih cocok untuk obrolan teman sebaya atau situasi tidak formal. Sering dipakai dalam bentuk lisan dengan intonasi yang tidak terlalu serius.',
  nuance: 'Secara bentuk identik dengan gn2-00306 (〜もので netral-formal), tetapi register dan konteks penggunaannya berbeda. もので (309) lebih kasual dan lisan — pembicara tidak terlalu memikirkan formalitas. Dalam praktik, perbedaan muncul dari konteks percakapan: ke teman = もので kasual (309); ke pelanggan/atasan = もので netral (306) atau ものですから (308). Versi yang lebih kasual lagi adalah もんで (gn2-00310).',
  examples: [
    { jp: '眠かった<b>もので</b>、ちょっとうとうとしちゃった。', id: 'Soalnya ngantuk, jadi ketiduran sebentar deh.' },
    { jp: '忙しかった<b>もので</b>、連絡できなかったんだ。', id: 'Soalnya sibuk, jadi tidak bisa kasih kabar.' },
  ],
  see_also_grammar: ['gn2-00306', 'gn2-00307', 'gn2-00310'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00306', 'gn2-00310'],
  register: null, exceptions: null,
  notes: 'Register lebih kasual dari gn2-00306. Versi paling kasual: もんで (gn2-00310).',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00310', level: 'n2', pattern: '〜もんで',
  reading: '〜monde',
  meaning: 'karena ... (sangat kasual, kontraksi dari 〜ものだから / 〜もので)',
  cat: 'reason-cause',
  connection: 'V-plain / Adj-plain + もんで',
  desc: '<b>〜もんで</b> adalah kontraksi sangat kasual dan dialektal dari 〜ものだから atau 〜もので, dipakai dalam percakapan sehari-hari yang sangat informal. Bentuk ini muncul ketika ものだから atau もので "dipotong" dalam ujaran cepat dan kasual. Umum didengar dalam percakapan spontan antara teman dekat atau anggota keluarga.',
  nuance: 'もんで adalah bentuk paling kasual dalam spektrum pola もの-alasan: ものですから (formal) > ものだから (semi-formal) > もので (kasual) > もんで (sangat kasual/dialek). Tidak cocok untuk situasi formal, tulisan resmi, atau saat berbicara dengan orang yang statusnya lebih tinggi. Dalam konteks ujian JLPT, もんで biasanya muncul sebagai pilihan jawaban yang salah (terlalu kasual) atau sebagai materi pemahaman percakapan.',
  examples: [
    { jp: 'ちょっと遅れた<b>もんで</b>、ごめんね。', id: 'Maaf ya terlambat sedikit — soalnya ada hal.' },
    { jp: '知らなかった<b>もんで</b>、間違えちゃったよ。', id: 'Soalnya tidak tahu, jadi salah deh.' },
  ],
  see_also_grammar: ['gn2-00309', 'gn2-00307', 'gn2-00306'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00309', 'gn2-00306'],
  register: null, exceptions: null,
  notes: 'Register paling kasual dalam keluarga もの-alasan. Tidak cocok untuk konteks formal atau tulisan resmi. Umum dalam dialek Jepang bagian timur (Kantō).',
  provenance: 'jlpt-corpus', added_v: 'v15'
}

];
