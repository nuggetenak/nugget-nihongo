// ──────────────────────────────────────────────────────────────
//  n2-negation-extent.js — Nugget Nihongo · JLPT N2 Grammar
//  23 entries | Category: negation-extent
//  Edit directly — merge with: node scripts/merge-grammar.js
// ──────────────────────────────────────────────────────────────

window.grammarN2_Negation_Extent = [

{
    id: 'gn2-00010', level: 'n2', pattern: '〜にわたって', reading: '〜ni watatte',
    meaning: 'meliputi ... / selama ... / di seluruh ...',
    cat: 'extent-degree',
    connection: 'N（periode/wilayah）+ にわたって',
    desc: '<b>〜にわたって</b> menyatakan rentang waktu atau wilayah yang luas.',
    examples: [
      { jp: '三日間<b>にわたって</b>、会議が続いた。', id: 'Selama tiga hari, rapat terus berlangsung.' },
      { jp: '全国<b>にわたって</b>、調査が行われた。', id: 'Survei dilakukan di seluruh negeri.' },
    ],
    nuance: null,
    confusion_pairs: ['gn3-00052'],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

{
    id: 'gn2-00026', level: 'n2', pattern: '〜に応じて', reading: '〜ni oujite',
    meaning: 'sesuai dengan ... / sesuai keadaan ...',
    cat: 'comparison',
    connection: 'N + に応じて',
    desc: '<b>〜に応じて</b> menyatakan bahwa sesuatu berubah atau disesuaikan mengikuti kondisi yang disebutkan.',
    examples: [
      { jp: '能力<b>に応じて</b>、仕事を割り当てる。', id: 'Pekerjaan dibagi sesuai kemampuan.' },
      { jp: '状況<b>に応じて</b>、対応を変える。', id: 'Tanggapan diubah sesuai situasi.' },
    ],
    nuance: null,
    confusion_pairs: ['gn3-00146'],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

{
    id: 'gn2-00030', level: 'n2', pattern: '〜にすぎない', reading: '〜ni suginai',
    meaning: 'hanya ... saja / tidak lebih dari ...',
    cat: 'extent-degree',
    connection: 'V-dict / N + にすぎない',
    desc: '<b>〜にすぎない</b> menyatakan bahwa sesuatu tidak lebih dari apa yang disebutkan; meremehkan atau merendah.',
    examples: [
      { jp: 'これは私の意見<b>にすぎない</b>。', id: 'Ini hanya pendapat saya saja.' },
      { jp: '彼はただの知り合い<b>にすぎない</b>。', id: 'Dia tidak lebih dari sekadar kenalan.' },
    ],
    nuance: null,
    confusion_pairs: ['gn1-00153'],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

{
  id: 'gn2-00036', level: 'n2', pattern: '〜どころではない', reading: '〜doko ro de wa nai',
  meaning: 'bukan waktunya untuk ... / tidak sempat ...',
  cat: 'extent-degree',
  connection: 'V-dict / N + どころではない',
  desc: '<b>〜どころではない</b> menyatakan bahwa situasi saat ini terlalu genting atau sibuk sehingga hal yang disebutkan sama sekali tidak memungkinkan untuk dilakukan.',
  nuance: null,
  examples: [
    { jp: '締め切りが明日なので、遊ぶ<b>どころではない</b>。', id: 'Karena deadline besok, ini bukan waktunya untuk bermain.' },
    { jp: '試験勉強<b>どころではない</b>、熱が40度もある。', id: 'Bukan waktunya belajar ujian, demamnya sampai 40 derajat.' },
    { jp: '旅行<b>どころではない</b>、仕事が山積みだ。', id: 'Bukan waktunya untuk liburan, pekerjaan menumpuk.' }
  ],
  see_also_grammar: ['gn2-00035'], see_also_vocab: [],
  confusion_pairs: ['gn2-00014', 'gn2-00017', 'gn2-00035'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00037', level: 'n2', pattern: '〜に過ぎない', reading: '〜ni sugi nai',
  meaning: 'hanya / tidak lebih dari ...',
  cat: 'extent-degree',
  connection: 'V-plain / N / Adj-plain + に過ぎない',
  desc: '<b>〜に過ぎない</b> menyatakan bahwa sesuatu tidak melebihi batas tertentu — "hanya sebatas itu" dan tidak lebih.',
  nuance: null,
  examples: [
    { jp: 'これは私の個人的な意見<b>に過ぎない</b>。', id: 'Ini hanyalah pendapat pribadi saya, tidak lebih.' },
    { jp: '彼の言葉は冗談<b>に過ぎない</b>。', id: 'Kata-katanya hanyalah candaan belaka.' },
    { jp: 'まだ始まった<b>に過ぎない</b>ので、諦めないでほしい。', id: 'Ini baru saja dimulai, jadi tolong jangan menyerah.' }
  ],
  see_also_grammar: [], see_also_vocab: [],
  confusion_pairs: ['gn1-00153', 'gn3-00036'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00040', level: 'n2', pattern: '〜にわたって / 〜にわたる', reading: '〜ni watatte / 〜ni wataru',
  meaning: 'sepanjang ... / mencakup ... / selama ...',
  cat: 'extent-degree',
  connection: 'N (waktu/jumlah/rentang) + にわたって / にわたる + N',
  desc: '<b>〜にわたって</b> menyatakan bahwa sesuatu berlangsung atau mencakup jangkauan tertentu — bisa dari segi waktu, jarak, maupun cakupan. Bentuk <b>〜にわたる</b> digunakan sebelum nomina.',
  nuance: null,
  examples: [
    { jp: '３年間<b>にわたって</b>研究を続けた。', id: 'Penelitian dilanjutkan selama 3 tahun penuh.' },
    { jp: '全国<b>にわたる</b>調査が実施された。', id: 'Survei yang mencakup seluruh negeri dilaksanakan.' },
    { jp: '長期<b>にわたって</b>交渉が続いている。', id: 'Negosiasi terus berlangsung dalam jangka panjang.' }
  ],
  see_also_grammar: ['gn2-00039'], see_also_vocab: [],
  confusion_pairs: ['gn3-00052', 'gn2-00138'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00049', level: 'n2', pattern: '〜ほど〜ない', reading: '〜hodo 〜nai',
  meaning: 'tidak se... seperti ... / tidak semewah / tidak sehebat ...',
  cat: 'extent-degree',
  connection: 'N + ほど + V-nai / Adj-nai',
  desc: '<b>〜ほど〜ない</b> membandingkan dua hal dan menyatakan bahwa yang satu tidak mencapai tingkat atau kualitas yang lain. Digunakan untuk komparasi yang merendahkan atau mengurangi.',
  nuance: null,
  examples: [
    { jp: '東京<b>ほど</b>大きな都市は<b>ない</b>。', id: 'Tidak ada kota sebesar Tokyo.' },
    { jp: '思った<b>ほど</b>難しく<b>なかった</b>。', id: 'Tidak sesulit yang saya bayangkan.' },
    { jp: '彼女<b>ほど</b>優しい人は<b>いない</b>。', id: 'Tidak ada orang sebaik hati dirinya.' }
  ],
  see_also_grammar: ['gn2-00050'], see_also_vocab: [],
  confusion_pairs: ['gn2-00050'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00050', level: 'n2', pattern: '〜と比べて / 〜に比べて', reading: '〜to kurabete / 〜ni kurabete',
  meaning: 'dibandingkan dengan ...',
  cat: 'comparison',
  connection: 'N + と比べて / に比べて + [perbandingan]',
  desc: '<b>〜と比べて</b> dan <b>〜に比べて</b> digunakan untuk membandingkan dua hal secara langsung. Keduanya hampir identik, tetapi に比べて sedikit lebih formal.',
  nuance: null,
  examples: [
    { jp: '去年<b>と比べて</b>、今年は暑い。', id: 'Dibandingkan tahun lalu, tahun ini lebih panas.' },
    { jp: '日本語<b>に比べて</b>、中国語の発音は難しいと感じる。', id: 'Dibandingkan bahasa Jepang, saya merasa pengucapan bahasa Mandarin lebih sulit.' },
    { jp: '兄<b>と比べて</b>、私は背が低い。', id: 'Dibandingkan dengan kakak, saya lebih pendek.' }
  ],
  see_also_grammar: ['gn2-00049'], see_also_vocab: [],
  confusion_pairs: ['gn2-00038', 'gn2-00049'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00058', level: 'n2', pattern: '〜ことなく', reading: '〜koto naku',
  meaning: 'tanpa ... / tidak pernah (melakukan) ...',
  cat: 'negative',
  connection: 'V-dict + ことなく',
  desc: '<b>〜ことなく</b> menyatakan bahwa suatu tindakan dilakukan tanpa pernah melakukan tindakan lain yang disebutkan. Berfungsi seperti 〜ないで tetapi lebih formal.',
  nuance: null,
  examples: [
    { jp: '彼は一度も休む<b>ことなく</b>、毎日練習した。', id: 'Tanpa sekalipun istirahat, dia berlatih setiap hari.' },
    { jp: '誰にも相談する<b>ことなく</b>、決断した。', id: 'Tanpa berkonsultasi dengan siapa pun, keputusan dibuat.' },
    { jp: '諦める<b>ことなく</b>、挑戦し続けた。', id: 'Tanpa menyerah, dia terus mencoba.' }
  ],
  see_also_grammar: ['gn2-00059'], see_also_vocab: [],
  confusion_pairs: ['gn5-00035', 'gn1-00080'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00059', level: 'n2', pattern: '〜ことなしに', reading: '〜koto nashi ni',
  meaning: 'tanpa ... (lebih formal dari ことなく)',
  cat: 'negative',
  connection: 'V-dict + ことなしに',
  desc: '<b>〜ことなしに</b> memiliki makna yang sama dengan ことなく — menyatakan bahwa sesuatu dilakukan tanpa melakukan tindakan yang disebutkan — tetapi berasa lebih kaku dan formal.',
  nuance: null,
  examples: [
    { jp: '練習する<b>ことなしに</b>、上達はできない。', id: 'Tanpa berlatih, tidak mungkin bisa berkembang.' },
    { jp: '彼の助け<b>なしに</b>は、成功しなかったでしょう。', id: 'Tanpa bantuannya, kemungkinan tidak akan berhasil.' },
    { jp: '犠牲を払う<b>ことなしに</b>、夢は実現しない。', id: 'Tanpa pengorbanan, impian tidak akan terwujud.' }
  ],
  see_also_grammar: ['gn2-00058'], see_also_vocab: [],
  confusion_pairs: ['gn1-00104', 'gn1-00005'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00073', level: 'n2', pattern: '〜てたまらない', reading: '〜te tamaranai',
  meaning: 'sangat ... / tidak tahan ... (sensasi atau keinginan yang kuat)',
  cat: 'extent-degree',
  connection: 'V-te / i-Adj (〜くて) / na-Adj + で + たまらない',
  desc: '<b>〜てたまらない</b> mengungkapkan perasaan, sensasi fisik, atau keinginan yang sangat kuat sehingga tidak tertahankan.',
  nuance: null,
  examples: [
    { jp: '寒くて<b>たまらない</b>から、早く帰りたい。', id: 'Sangat kedinginan, ingin cepat pulang.' },
    { jp: '彼のことが好きで<b>たまらない</b>。', id: 'Sangat menyukainya, tidak tahan.' },
    { jp: '試験前で緊張して<b>たまらない</b>。', id: 'Menjelang ujian, sangat gugup sampai tidak tahan.' }
  ],
  see_also_grammar: ['gn2-00074', 'gn2-00075'], see_also_vocab: [],
  confusion_pairs: ['gn2-00075', 'gn2-00020', 'gn2-00072', 'gn2-00179', 'gn2-00074', 'gn2-00178', 'gn1-00070', 'gn1-00058', 'gn1-00030', 'gn1-00131', 'gn1-00064', 'gn1-00067', 'gn1-00130'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00074', level: 'n2', pattern: '〜てならない', reading: '〜te naranai',
  meaning: 'sungguh terasa ... / tidak bisa menahan perasaan ... (emosi yang muncul alami)',
  cat: 'extent-degree',
  connection: 'V-te / i-Adj (〜くて) / na-Adj + で + ならない',
  desc: '<b>〜てならない</b> mengungkapkan perasaan yang muncul secara alami dan kuat di luar kendali pembicara — biasanya emosi seperti sedih, rindu, khawatir, atau penasaran.',
  nuance: null,
  examples: [
    { jp: '故郷のことが懐かしく<b>てならない</b>。', id: 'Sungguh merindukan kampung halaman.' },
    { jp: '彼女の体調が心配で<b>ならない</b>。', id: 'Sangat khawatir dengan kondisi kesehatannya.' },
    { jp: 'なぜそうなったのか、気になっ<b>てならない</b>。', id: 'Sungguh penasaran mengapa hal itu bisa terjadi.' }
  ],
  see_also_grammar: ['gn2-00073', 'gn2-00075'], see_also_vocab: [],
  confusion_pairs: ['gn2-00073'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00075', level: 'n2', pattern: '〜てしょうがない', reading: '〜te shō ga nai',
  meaning: 'sangat ... / tidak ada yang bisa dilakukan terhadap perasaan ini',
  cat: 'extent-degree',
  connection: 'V-te / i-Adj (〜くて) / na-Adj + で + しょうがない',
  desc: '<b>〜てしょうがない</b> mengungkapkan perasaan atau kondisi yang sangat kuat dan tidak bisa dikendalikan. Fungsinya mirip てたまらない, namun nuansanya lebih kasual.',
  nuance: null,
  examples: [
    { jp: '眠くて<b>しょうがない</b>から、少し休憩した。', id: 'Sangat mengantuk, jadi istirahat sebentar.' },
    { jp: 'あのドラマが気になって<b>しょうがない</b>。', id: 'Sangat penasaran dengan drama itu.' },
    { jp: '試合に負けて、悔しくて<b>しょうがない</b>。', id: 'Kalah pertandingan, sangat kesal.' }
  ],
  see_also_grammar: ['gn2-00073', 'gn2-00074'], see_also_vocab: [],
  confusion_pairs: ['gn2-00073', 'gn2-00177'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00083', level: 'n2', pattern: '〜限り', reading: '〜kagiri',
  meaning: 'selama ... / sejauh ... / sampai batas ...',
  cat: 'extent-degree',
  connection: 'V-dict / V-nai / N + の + 限り',
  desc: '<b>〜限り</b> memiliki dua fungsi utama: (1) menyatakan batas kondisi atau waktu — "selama kondisi ini berlangsung"; (2) menyatakan batas pengetahuan atau kemampuan pembicara — "sejauh yang saya tahu/bisa".',
  nuance: null,
  examples: [
    { jp: '私が知る<b>限り</b>、彼は嘘をついたことがない。', id: 'Sejauh yang saya tahu, dia belum pernah berbohong.' },
    { jp: '命ある<b>限り</b>、夢を追い続ける。', id: 'Selama masih hidup, akan terus mengejar impian.' },
    { jp: '力の<b>限り</b>、全力で頑張ります。', id: 'Akan berusaha semaksimal kemampuan saya.' }
  ],
  see_also_grammar: ['gn2-00084'], see_also_vocab: [],
  confusion_pairs: ['gn2-00084', 'gn3-00007'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00084', level: 'n2', pattern: '〜限りでは', reading: '〜kagiri de wa',
  meaning: 'sejauh yang saya ketahui ... / berdasarkan yang saya amati ...',
  cat: 'extent-degree',
  connection: 'V-dict / N + の + 限りでは',
  desc: '<b>〜限りでは</b> menyatakan bahwa informasi yang disampaikan terbatas pada apa yang diamati atau diketahui oleh pembicara — "sejauh yang saya lihat / ketahui".',
  nuance: null,
  examples: [
    { jp: '私が調べた<b>限りでは</b>、問題はないようだ。', id: 'Sejauh yang saya teliti, tampaknya tidak ada masalah.' },
    { jp: '今のところ確認できた<b>限りでは</b>、被害は出ていない。', id: 'Sejauh yang bisa dikonfirmasi sejauh ini, belum ada korban.' },
    { jp: '彼が話した<b>限りでは</b>、計画は順調らしい。', id: 'Berdasarkan yang dia ceritakan, rencana tampaknya berjalan lancar.' }
  ],
  see_also_grammar: ['gn2-00083'], see_also_vocab: [],
  confusion_pairs: ['gn2-00083'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00094',
  level: 'n2',
  pattern: '〜に限らず',
  reading: '〜ni kagirazu',
  meaning: 'tidak terbatas pada ... saja / tidak hanya ...',
  cat: 'extent-degree',
  connection: 'N + に限らず',
  desc: '<b>〜に限らず</b> menyatakan bahwa sesuatu tidak terbatas hanya pada X, melainkan berlaku lebih luas atau mencakup Y juga.',
  nuance: null,
  examples: [
    { jp: '子供<b>に限らず</b>、大人にも人気のあるゲームだ。', id: 'Ini bukan hanya permainan yang populer di kalangan anak-anak, tapi juga di kalangan orang dewasa.' },
    { jp: '日本<b>に限らず</b>、アジア全体でこの問題が深刻化している。', id: 'Masalah ini tidak hanya serius di Jepang, tapi di seluruh Asia.' }
  ],
  see_also_grammar: ['gn2-00091', 'gn2-00093'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00028', 'gn2-00046', 'gn2-00142'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00110',
  level: 'n2',
  pattern: '〜を中心に',
  reading: '〜wo chuushin ni',
  meaning: 'berpusat pada ... / dengan ... sebagai inti / yang difokuskan pada ...',
  cat: 'extent-degree',
  connection: 'N + を中心に / を中心として / を中心にして',
  desc: '<b>〜を中心に</b> menyatakan bahwa sesuatu terjadi atau dilakukan dengan X sebagai pusat, titik fokus, atau inti. Bisa bermakna geografis maupun figuratif.',
  nuance: null,
  examples: [
    { jp: '東京<b>を中心に</b>、関東地方全域に被害が広がった。', id: 'Dengan Tokyo sebagai pusat, kerusakan meluas ke seluruh wilayah Kanto.' },
    { jp: '若者層<b>を中心に</b>、このサービスへの支持が急速に広がっている。', id: 'Berpusat pada kalangan anak muda, dukungan terhadap layanan ini menyebar dengan cepat.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00251', 'gn2-00141'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15'
},

{
  id: 'gn2-00135', level: 'n2', pattern: '〜に照らして',
  reading: '〜ni terashite',
  meaning: 'bila dibandingkan/diukur dengan standar ..., berdasarkan tolok ukur ...',
  cat: 'comparison',
  connection: 'N + に照らして / N + に照らすと',
  desc: '<b>〜に照らして</b> menyatakan bahwa sesuatu dinilai, diverifikasi, atau dipertimbangkan dengan mengacu pada standar, hukum, aturan, atau preseden tertentu. Seperti "menerangi dengan cahaya X untuk memeriksa Y".',
  nuance: null,
  examples: [
    { jp: '法律<b>に照らして</b>、この行為は問題ないと判断された。', id: 'Bila diukur dengan standar hukum, tindakan ini dinilai tidak bermasalah.' },
    { jp: '過去の事例<b>に照らして</b>考えると、このプロジェクトは成功する可能性が高い。', id: 'Bila dibandingkan dengan kasus-kasus terdahulu, proyek ini cukup berpeluang berhasil.' }
  ],
  see_also_grammar: ['gn2-00136'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00167', 'gn2-00196'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00147', level: 'n2', pattern: '〜に過ぎない',
  reading: '〜ni suginai',
  meaning: 'hanyalah ..., tidak lebih dari ..., sekadar ...',
  cat: 'extent-degree',
  connection: 'N + に過ぎない / V-plain + に過ぎない',
  desc: '<b>〜に過ぎない</b> menyatakan bahwa sesuatu tidak lebih dari apa yang disebutkan — meminimalkan atau meremehkan suatu hal. Memberikan kesan bahwa hal tersebut tidak sepenting yang dibayangkan.',
  nuance: null,
  examples: [
    { jp: 'これはあくまでも私の意見<b>に過ぎない</b>。', id: 'Ini tidak lebih dari sekadar pendapat pribadi saya.' },
    { jp: '彼の成功は運<b>に過ぎない</b>と言う人もいる。', id: 'Ada yang mengatakan keberhasilannya hanyalah keberuntungan semata.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00153'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00158', level: 'n2', pattern: '〜かねる',
  reading: '〜kaneru',
  meaning: 'sulit untuk ..., tidak bisa (dengan halus) ..., tidak sanggup ...',
  cat: 'negative',
  connection: 'V-stem + かねる',
  desc: '<b>〜かねる</b> digunakan untuk menolak atau menyatakan ketidaksanggupan secara sopan dan tidak langsung. Menyiratkan bahwa ada hambatan psikologis, emosional, atau moral yang membuat pembicara tidak bisa melakukan sesuatu.',
  nuance: null,
  examples: [
    { jp: 'そのご要望にはお応えし<b>かねます</b>。', id: 'Dengan hormat, kami tidak dapat memenuhi permintaan tersebut.' },
    { jp: 'あの映画は内容が残酷すぎて、見<b>かねる</b>。', id: 'Film itu terlalu kejam isinya, rasanya tidak sanggup menontonnya.' }
  ],
  see_also_grammar: ['gn2-00157'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00007', 'gn5-00040'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00177', level: 'n2', pattern: '〜てたまらない',
  reading: '〜te tamaranai',
  meaning: 'tidak tahan ..., sangat ... (perasaan/sensasi yang tidak bisa ditahan)',
  cat: 'extent-degree',
  connection: 'V-て + たまらない / い-Adj-くて + たまらない / な-Adj-で + たまらない',
  desc: '<b>〜てたまらない</b> mengungkapkan perasaan, keinginan, atau sensasi fisik yang sangat kuat hingga tidak bisa ditahan. Selalu mengacu pada kondisi involunter — sesuatu yang dirasakan, bukan dipilih.',
  nuance: null,
  examples: [
    { jp: '試験前で、緊張し<b>てたまらない</b>。', id: 'Menjelang ujian, rasanya tidak tahan gugupnya.' },
    { jp: '彼女に会いたく<b>てたまらない</b>。', id: 'Tidak tahan rasanya ingin bertemu dengannya.' },
    { jp: '辛いものを食べて、口が痛く<b>てたまらない</b>。', id: 'Setelah makan yang pedas, mulutnya terasa sakit tidak tertahankan.' }
  ],
  see_also_grammar: ['gn2-00178'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00020', 'gn2-00075'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00178', level: 'n2', pattern: '〜てならない',
  reading: '〜te naranai',
  meaning: 'sangat ... tanpa bisa ditahan (perasaan mendalam, formal)',
  cat: 'extent-degree',
  connection: 'V-て + ならない / い-Adj-くて + ならない',
  desc: '<b>〜てならない</b> mengungkapkan perasaan yang sangat mendalam dan tidak bisa dikendalikan — seperti kerinduan, kekhawatiran, rasa haru, atau kesedihan yang muncul secara alami. Lebih formal dan literer dari てたまらない.',
  nuance: null,
  examples: [
    { jp: '故郷のことが懐かしく<b>てならない</b>。', id: 'Rasa rindu pada kampung halaman sungguh tidak terbendung.' },
    { jp: '彼の将来が心配で<b>てならない</b>。', id: 'Kekhawatiran akan masa depannya sungguh tidak bisa kubendung.' }
  ],
  see_also_grammar: ['gn2-00177'],
  see_also_vocab: [],
  confusion_pairs: ['gn2-00073'],
  register: null, exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn2-00208',
  level: 'n2',
  pattern: '〜ことはない',
  reading: '~koto wa nai',
  meaning: 'tidak perlu ..., tidak ada alasan untuk ...',
  cat: 'negative',
  connection: 'V-plain (辞書形) + ことはない',
  desc: '<b>〜ことはない</b> menyatakan bahwa tidak ada kebutuhan atau alasan untuk melakukan sesuatu — digunakan untuk menenangkan orang atau melarang dengan cara yang halus. Seringkali digunakan untuk mengatakan bahwa kekhawatiran atau tindakan seseorang tidak diperlukan.',
  nuance: null,
  examples: [
    { jp: 'そんなに心配する<b>ことはない</b>よ。', id: 'Tidak perlu khawatir sebegitu itu.' },
    { jp: '一度の失敗で諦める<b>ことはない</b>。', id: 'Tidak ada alasan untuk menyerah hanya karena satu kali gagal.' },
    { jp: '謝る<b>ことはない</b>。あなたは悪くない。', id: 'Tidak perlu minta maaf. Kamu tidak salah.' },
  ],
  see_also_grammar: ['gn2-00207'],
  see_also_vocab: [],
  confusion_pairs: ['gn4-00027'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
}

];
