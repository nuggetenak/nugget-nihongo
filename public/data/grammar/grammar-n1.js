// grammar-n1.js — Grammar JLPT N1 Global (Tier 1)
// window.grammarN1
// v15.5.0 — 20 seed entries (top JLPT N1 grammar patterns)
// Schema: sama dengan grammar-n3.js
// Expand via: node tools/generate-corpus.js --level=n1 --type=grammar --start=21 --count=179

window.grammarN1 = [

  {
    id: 'gn1-00001', level: 'n1', pattern: '〜をもって', reading: '〜wo motte',
    meaning: '(1) dengan / menggunakan (cara/alat) (2) pada saat ... (waktu resmi)',
    cat: 'cara',
    connection: 'N + をもって',
    desc: '<b>〜をもって</b> memiliki dua fungsi: (1) menyatakan cara atau alat; (2) menyatakan batas waktu formal.',
    examples: [
      { jp: '本日<b>をもって</b>、退職いたします。', id: 'Terhitung hari ini, saya mengundurkan diri.' },
      { jp: '実力<b>をもって</b>証明した。', id: 'Dibuktikan dengan kemampuan nyata.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: 'formal', exceptions: null, notes: null,
  },

  {
    id: 'gn1-00002', level: 'n1', pattern: '〜にして', reading: '〜ni shite',
    meaning: '(1) meskipun ... / bahkan ... (2) baru pada ... (batas waktu)',
    cat: 'kontras',
    connection: 'N + にして',
    desc: '<b>〜にして</b> digunakan untuk mengungkapkan sesuatu yang mengejutkan atau paradoks; juga berarti "baru pada saat itu".',
    examples: [
      { jp: '天才<b>にして</b>努力家でもある。', id: 'Meskipun jenius, dia juga pekerja keras.' },
      { jp: '50歳<b>にして</b>、初めて海外へ行った。', id: 'Baru pada usia 50, pertama kali pergi ke luar negeri.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: 'formal', exceptions: null, notes: null,
  },

  {
    id: 'gn1-00003', level: 'n1', pattern: '〜ならでは', reading: '〜nara de wa',
    meaning: 'hanya bisa ... / khas dari ...',
    cat: 'pembatasan',
    connection: 'N + ならでは（の）',
    desc: '<b>〜ならでは</b> menyatakan bahwa sesuatu hanya bisa ada atau terjadi karena hal tertentu yang unik.',
    examples: [
      { jp: 'プロ<b>ならでは</b>の技術だ。', id: 'Itu teknik yang hanya dimiliki profesional.' },
      { jp: '京都<b>ならでは</b>の風情がある。', id: 'Ada nuansa yang hanya bisa dirasakan di Kyoto.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

  {
    id: 'gn1-00004', level: 'n1', pattern: '〜ともなると', reading: '〜to mo naru to',
    meaning: 'kalau sudah menjadi ... / bila telah mencapai ...',
    cat: 'kondisional',
    connection: 'N + ともなると / ともなれば',
    desc: '<b>〜ともなると</b> digunakan ketika suatu posisi atau kondisi tinggi otomatis membawa konsekuensi tertentu.',
    examples: [
      { jp: '部長<b>ともなると</b>、責任が重い。', id: 'Kalau sudah jadi manajer, tanggung jawabnya berat.' },
      { jp: '春<b>ともなれば</b>、花見客でにぎわう。', id: 'Begitu musim semi tiba, ramai dengan pengunjung hanami.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: 'formal', exceptions: null, notes: null,
  },

  {
    id: 'gn1-00005', level: 'n1', pattern: '〜とあって', reading: '〜to atte',
    meaning: 'karena keadaan ... / mengingat ...',
    cat: 'sebab',
    connection: 'V/Adj plain / N + とあって',
    desc: '<b>〜とあって</b> menyatakan alasan khusus atau kondisi tertentu yang menyebabkan situasi logis berikutnya.',
    examples: [
      { jp: '連休<b>とあって</b>、どこも混んでいる。', id: 'Karena hari libur panjang, di mana-mana ramai.' },
      { jp: '人気アーティスト<b>とあって</b>、チケットがすぐ売り切れた。', id: 'Karena artis populer, tiket langsung habis.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

  {
    id: 'gn1-00006', level: 'n1', pattern: '〜であれ〜であれ', reading: '〜de are 〜de are',
    meaning: 'baik ... maupun ... / apakah ... atau ...',
    cat: 'enumerasi',
    connection: 'N / Adj + であれ + N / Adj + であれ',
    desc: '<b>〜であれ〜であれ</b> menyatakan bahwa kondisi atau kesimpulan berlaku untuk kedua pilihan yang disebutkan.',
    examples: [
      { jp: '賛成<b>であれ</b>反対<b>であれ</b>、意見を言ってください。', id: 'Baik setuju maupun tidak, silakan kemukakan pendapat.' },
      { jp: '成功<b>であれ</b>失敗<b>であれ</b>、やってみることが大事だ。', id: 'Baik berhasil maupun gagal, mencoba itu penting.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: 'formal', exceptions: null, notes: null,
  },

  {
    id: 'gn1-00007', level: 'n1', pattern: '〜ないまでも', reading: '〜nai made mo',
    meaning: 'sekalipun tidak ... setidaknya ...',
    cat: 'konsesi',
    connection: 'V-ない + までも',
    desc: '<b>〜ないまでも</b> menyatakan bahwa meskipun kondisi ideal tidak tercapai, setidaknya kondisi minimal diharapkan.',
    examples: [
      { jp: '毎日<b>ではないまでも</b>、週に一度は連絡してほしい。', id: 'Sekalipun tidak setiap hari, setidaknya hubungi sekali seminggu.' },
      { jp: '完璧で<b>ないまでも</b>、ちゃんと準備しておこう。', id: 'Sekalipun tidak sempurna, mari bersiap dengan baik.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

  {
    id: 'gn1-00008', level: 'n1', pattern: '〜が最後', reading: '〜ga saigo',
    meaning: 'begitu ... maka sudah (tidak bisa kembali)',
    cat: 'kondisional',
    connection: 'V-た + が最後',
    desc: '<b>〜が最後</b> menyatakan bahwa sekali sesuatu terjadi, konsekuensi negatif tak terhindarkan mengikutinya.',
    examples: [
      { jp: '彼に話した<b>が最後</b>、秘密が広まる。', id: 'Begitu cerita ke dia, rahasia pasti tersebar.' },
      { jp: 'あのゲームを始めた<b>が最後</b>、止められない。', id: 'Begitu mulai game itu, tidak bisa berhenti.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

  {
    id: 'gn1-00009', level: 'n1', pattern: '〜たりとも〜ない', reading: '〜tari tomo 〜nai',
    meaning: 'bahkan satu pun ... tidak',
    cat: 'penekanan',
    connection: '一 + 数量 + たりとも + ～ない',
    desc: '<b>〜たりとも</b> digunakan dengan kata bilangan kecil (satu, sebentar) untuk menekankan bahwa bahkan jumlah terkecil pun tidak diizinkan.',
    examples: [
      { jp: '一秒<b>たりとも</b>無駄にできない。', id: 'Bahkan satu detik pun tidak boleh terbuang sia-sia.' },
      { jp: '一円<b>たりとも</b>余分に払わない。', id: 'Bahkan satu yen pun tidak akan membayar lebih.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: 'formal', exceptions: null, notes: null,
  },

  {
    id: 'gn1-00010', level: 'n1', pattern: '〜ずにはおかない', reading: '〜zu ni wa okanai',
    meaning: 'pasti akan ... / tidak bisa tidak ...',
    cat: 'penekanan',
    connection: 'V-ない-stem + ずにはおかない（する→せずにはおかない）',
    desc: '<b>〜ずにはおかない</b> menyatakan bahwa suatu tindakan pasti akan dilakukan atau pasti akan terjadi.',
    examples: [
      { jp: 'この映画は見る人を感動させ<b>ずにはおかない</b>。', id: 'Film ini pasti akan mengharukan siapa pun yang menontonnya.' },
      { jp: '悪いことをした者は罰せ<b>ずにはおかない</b>。', id: 'Orang yang berbuat jahat pasti akan dihukum.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: 'formal', exceptions: 'する→せずにはおかない', notes: null,
  },

  {
    id: 'gn1-00011', level: 'n1', pattern: '〜んばかり', reading: '〜n bakari',
    meaning: 'seakan-akan hampir ... / tampak seperti akan ...',
    cat: 'perumpamaan',
    connection: 'V-ない-stem + んばかり（する→せんばかり）',
    desc: '<b>〜んばかり</b> menggambarkan situasi yang tampak seolah hampir terjadi atau ekspresi yang sangat intens.',
    examples: [
      { jp: '泣か<b>んばかり</b>の顔をしていた。', id: 'Wajahnya seakan-akan hampir menangis.' },
      { jp: '溢れ<b>んばかり</b>の笑顔だった。', id: 'Senyumannya seakan-akan meluap.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: 'literary', exceptions: 'する→せんばかり', notes: null,
  },

  {
    id: 'gn1-00012', level: 'n1', pattern: '〜を皮切りに', reading: '〜wo kawakiri ni',
    meaning: 'dimulai dari ... / diawali dengan ...',
    cat: 'waktu',
    connection: 'N + を皮切りに（して）',
    desc: '<b>〜を皮切りに</b> menyatakan bahwa sesuatu dimulai dari titik tertentu dan kemudian berlanjut ke hal-hal serupa.',
    examples: [
      { jp: '東京<b>を皮切りに</b>、全国ツアーが始まった。', id: 'Dimulai dari Tokyo, tur nasional pun dimulai.' },
      { jp: '彼の発言<b>を皮切りに</b>、議論が活発になった。', id: 'Diawali dengan pernyataannya, diskusi pun menjadi hidup.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: 'formal', exceptions: null, notes: null,
  },

  {
    id: 'gn1-00013', level: 'n1', pattern: '〜をよそに', reading: '〜wo yoso ni',
    meaning: 'tidak mempedulikan ... / mengabaikan ...',
    cat: 'kontras',
    connection: 'N + をよそに',
    desc: '<b>〜をよそに</b> menyatakan bahwa seseorang bertindak tanpa peduli atau tanpa memperhatikan situasi/perasaan tertentu.',
    examples: [
      { jp: '親の心配<b>をよそに</b>、旅に出た。', id: 'Tanpa peduli kekhawatiran orang tua, dia pergi berpetualang.' },
      { jp: '世間の批判<b>をよそに</b>、計画を進めた。', id: 'Mengabaikan kritik publik, rencana tetap dilanjutkan.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

  {
    id: 'gn1-00014', level: 'n1', pattern: '〜いかんで / 〜いかんによっては', reading: '〜ikan de',
    meaning: 'tergantung pada ... / bergantung dari ...',
    cat: 'kondisional',
    connection: 'N + いかんで / いかんによっては',
    desc: '<b>〜いかんで</b> adalah ekspresi formal yang menyatakan bahwa hasil sangat bergantung pada kondisi tertentu.',
    examples: [
      { jp: '努力<b>いかんで</b>、結果は変わる。', id: 'Tergantung pada usahamu, hasilnya akan berbeda.' },
      { jp: '交渉の結果<b>いかんによっては</b>、撤退もあり得る。', id: 'Bergantung dari hasil negosiasi, penarikan pun mungkin terjadi.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: 'formal', exceptions: null, notes: null,
  },

  {
    id: 'gn1-00015', level: 'n1', pattern: '〜かたわら', reading: '〜katawara',
    meaning: 'sambil ... / di sela-sela ... (kegiatan utama)',
    cat: 'bersamaan',
    connection: 'V-dict / N + の + かたわら',
    desc: '<b>〜かたわら</b> menyatakan bahwa seseorang melakukan kegiatan sekunder di sela-sela kegiatan utamanya.',
    examples: [
      { jp: '仕事<b>のかたわら</b>、ボランティア活動をしている。', id: 'Di sela-sela pekerjaannya, dia aktif berkegiatan sukarela.' },
      { jp: '育児<b>のかたわら</b>、小説を書いた。', id: 'Sambil mengurus anak, dia menulis novel.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: 'formal', exceptions: null, notes: null,
  },

  {
    id: 'gn1-00016', level: 'n1', pattern: '〜べく', reading: '〜beku',
    meaning: 'untuk (tujuan) ... / demi ...',
    cat: 'tujuan',
    connection: 'V-dict + べく（する→すべく）',
    desc: '<b>〜べく</b> adalah bentuk klasik yang menyatakan tujuan atau niat. Lebih formal dari ために.',
    examples: [
      { jp: '夢を叶える<b>べく</b>、毎日練習する。', id: 'Demi mewujudkan impian, berlatih setiap hari.' },
      { jp: '問題を解決す<b>べく</b>、専門家を招いた。', id: 'Untuk menyelesaikan masalah, ahli pun diundang.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: 'formal', exceptions: 'する→すべく', notes: null,
  },

  {
    id: 'gn1-00017', level: 'n1', pattern: '〜ならいざしらず', reading: '〜nara iza shirazu',
    meaning: 'kalau ... lain cerita / mungkin bisa dimengerti kalau ..., tapi ...',
    cat: 'kontras',
    connection: 'N / V-dict + ならいざしらず',
    desc: '<b>〜ならいざしらず</b> menyatakan bahwa kondisi tertentu mungkin bisa dimaafkan, namun kondisi aktual sekarang tidak bisa diterima.',
    examples: [
      { jp: '子供<b>ならいざしらず</b>、大人がそんな失礼なことをしてはいけない。', id: 'Kalau anak kecil lain cerita, tapi orang dewasa tidak boleh berlaku tidak sopan seperti itu.' },
      { jp: '昔<b>ならいざしらず</b>、今はそんな考え方は通じない。', id: 'Dulu mungkin bisa dimengerti, tapi sekarang pemikiran seperti itu tidak berlaku.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: 'formal', exceptions: null, notes: null,
  },

  {
    id: 'gn1-00018', level: 'n1', pattern: '〜というものだ', reading: '〜to iu mono da',
    meaning: 'itulah yang disebut ... / begitulah namanya ...',
    cat: 'definisi',
    connection: 'V/Adj plain / N + というものだ',
    desc: '<b>〜というものだ</b> digunakan untuk menegaskan suatu kebenaran umum, prinsip, atau definisi dari sesuatu.',
    examples: [
      { jp: 'それが友情<b>というものだ</b>。', id: 'Itulah yang disebut persahabatan.' },
      { jp: '努力なしに成功はない、それが人生<b>というものだ</b>。', id: 'Tidak ada kesuksesan tanpa usaha, itulah kehidupan.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: null, exceptions: null, notes: null,
  },

  {
    id: 'gn1-00019', level: 'n1', pattern: '〜にほかならない', reading: '〜ni hoka naranai',
    meaning: 'tidak lain adalah ... / justru karena ...',
    cat: 'penekanan',
    connection: 'N / V-dict + にほかならない',
    desc: '<b>〜にほかならない</b> menegaskan dengan kuat bahwa sesuatu adalah atau disebabkan oleh hal tertentu dan tidak ada yang lain.',
    examples: [
      { jp: '成功したのは、努力の結果<b>にほかならない</b>。', id: 'Berhasil tidak lain karena hasil kerja keras.' },
      { jp: 'これは差別<b>にほかならない</b>。', id: 'Ini tidak lain adalah diskriminasi.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: 'formal', exceptions: null, notes: null,
  },

  {
    id: 'gn1-00020', level: 'n1', pattern: '〜まじき', reading: '〜majiki',
    meaning: 'tidak sepatutnya ... / tidak pantas untuk ...',
    cat: 'larangan',
    connection: 'V-dict + まじき + N（する→すまじき）',
    desc: '<b>〜まじき</b> adalah bentuk klasik yang menyatakan bahwa suatu tindakan tidak sepatutnya dilakukan, terutama oleh seseorang dalam posisi atau peran tertentu.',
    examples: [
      { jp: '教師とあるまじき行為だ。', id: 'Ini adalah tindakan yang tidak sepatutnya dilakukan seorang guru.' },
      { jp: '人としてあるまじき振る舞いだ。', id: 'Ini perilaku yang tidak pantas sebagai manusia.' },
    ],
    see_also_grammar: [], see_also_vocab: [], register: 'formal', exceptions: 'する→すまじき', notes: null,
  },

];
