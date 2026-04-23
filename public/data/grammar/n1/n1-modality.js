// ──────────────────────────────────────────────────────────────
//  n1-modality.js — Nugget Nihongo · JLPT N1 Grammar
//  19 entries | Category: modality
//  Edit directly — merge with: node scripts/merge-grammar.js
// ──────────────────────────────────────────────────────────────

window.grammarN1_Modality = [

{
  id: 'gn1-00022', level: 'n1', pattern: '〜とみえて／〜とみえる', reading: '〜to miete / to mieru',
  meaning: 'kelihatannya ... / tampaknya ... (berdasarkan observasi)',
  cat: 'conjecture-possibility',
  connection: 'V-plain / Adj-plain / N + とみえて / とみえる',
  desc: '<b>〜とみえる</b> menyatakan dugaan yang didasarkan pada bukti yang dapat diamati secara langsung. <b>〜とみえて</b> digunakan sebagai klausa penghubung: "kelihatannya X, karenanya Y."',
  nuance: 'Berbeda dari 〜らしい atau 〜ようだ yang lebih umum, 〜とみえる/とみえて menekankan bahwa dugaan berasal dari observasi konkret. Lebih formal, sering muncul dalam tulisan naratif dan laporan.',
  examples: [
    { jp: '疲れている<b>とみえて</b>、彼はすぐ眠ってしまった。', id: 'Kelihatannya dia kelelahan, karena langsung tertidur.' },
    { jp: '気に入った<b>とみえて</b>、何度も読み返している。', id: 'Tampaknya dia menyukainya, karena berkali-kali dibaca ulang.' },
    { jp: '雨が降る<b>とみえる</b>、空が暗くなってきた。', id: 'Kelihatannya akan hujan, langit mulai gelap.' }
  ],
  see_also_grammar: ['gn1-00021'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00021'],
  register: 'written', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00030', level: 'n1', pattern: '〜限りだ', reading: '〜kagiri da',
  meaning: 'betapa ... / sungguh ... (ungkapan emosi intens, orang pertama)',
  cat: 'sentence-final-modality',
  connection: 'Adj-i / Adj-na（な形）+ 限りだ',
  desc: '<b>〜限りだ</b> mengungkapkan perasaan yang sangat intens dari sudut pandang orang pertama — baik positif maupun negatif. "Sungguh X rasanya." Biasanya digunakan untuk emosi seperti kebahagiaan, keharuan, rasa malu, atau sedih.',
  nuance: 'Hanya untuk emosi orang pertama — tidak bisa menggambarkan perasaan orang lain. Berbeda dari 〜を限りに yang bermakna temporal, 〜限りだ murni ekspresi perasaan. Terasa formal dan khidmat, sering dalam sambutan resmi.',
  examples: [
    { jp: 'このような賞をいただき、光栄の<b>限りです</b>。', id: 'Menerima penghargaan seperti ini, sungguh merupakan kehormatan yang tiada tara.' },
    { jp: '皆さんの応援が、うれしい<b>限りです</b>。', id: 'Dukungan dari semua orang ini sungguh membahagiakan.' },
    { jp: 'こんな失敗をしてしまい、恥ずかしい<b>限りだ</b>。', id: 'Melakukan kesalahan seperti ini, sungguh sangat memalukan.' }
  ],
  see_also_grammar: ['gn1-00029'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00029'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00051', level: 'n1', pattern: '〜べくして', reading: '〜beku shite',
  meaning: 'sudah seharusnya demikian / wajar terjadi ... (keniscayaan)',
  cat: 'sentence-final-modality',
  connection: 'V-dict + べくして + V (kata kerja sama)',
  desc: '<b>〜べくして</b> menyatakan bahwa hasil Y terjadi karena memang sudah seharusnya demikian — bukan kebetulan, melainkan keniscayaan logis atau alami. Selalu menggunakan kata kerja yang sama di depan dan belakang.',
  nuance: 'Berbeda dari べく yang menyatakan tujuan — べくして menyatakan bahwa kejadian itu sudah "tertulis" atau "wajar" terjadi. Sering dipakai untuk menggambarkan kemenangan, kegagalan, atau peristiwa yang tampak tak terelakkan.',
  examples: [
    { jp: '彼は勝つ<b>べくして</b>勝った — 準備が違った。', id: 'Dia menang karena memang sudah seharusnya menang — persiapannya berbeda.' },
    { jp: 'あの事故は起こる<b>べくして</b>起きた悲劇だった。', id: 'Kecelakaan itu adalah tragedi yang sudah seharusnya terjadi.' },
    { jp: '二人は出会う<b>べくして</b>出会ったのかもしれない。', id: 'Mungkin keduanya bertemu karena memang sudah ditakdirkan untuk bertemu.' }
  ],
  see_also_grammar: ['gn1-00050'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00050'],
  register: 'literary', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00052', level: 'n1', pattern: '〜まじき', reading: '〜majiki',
  meaning: 'tidak sepatutnya / tidak pantas dilakukan oleh ... (literary)',
  cat: 'permission-prohibition',
  connection: 'V-dict + まじき + N',
  desc: '<b>〜まじき</b> adalah bentuk klasik (dari まじ = larangan klasik) yang mengekspresikan sesuatu yang seharusnya tidak dilakukan oleh seseorang dalam posisi atau status tertentu.',
  nuance: 'Sangat literary dan formal — hampir eksklusif dalam tulisan serius, hukum, atau editorial. Kata benda yang mengikutinya biasanya adalah jabatan atau status (教師、医師、指導者, dll). Setara modern: 〜てはいけない / すべきでない が jauh lebih lemah.',
  examples: [
    { jp: 'それは教師にあるまじき行為だ。', id: 'Itu adalah tindakan yang tidak pantas dilakukan oleh seorang guru.' },
    { jp: '指導者にある<b>まじき</b>発言が批判を呼んだ。', id: 'Pernyataan yang tidak patut diucapkan pemimpin itu menuai kritik.' },
    { jp: '医師にある<b>まじき</b>態度で患者に接した。', id: 'Dia bersikap kepada pasien dengan cara yang tidak layak bagi seorang dokter.' }
  ],
  see_also_grammar: ['gn1-00053'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00053'],
  register: 'literary', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00053', level: 'n1', pattern: '〜ともあろう', reading: '〜to mo arou',
  meaning: 'seorang yang sekaliber ... seharusnya tidak ... (mengecam)',
  cat: 'sentence-final-modality',
  connection: 'N + ともあろう + N (jabatan/status)',
  desc: '<b>〜ともあろう</b> mengekspresikan kekecewaan atau kecaman bahwa seseorang dengan status/kaliber X melakukan sesuatu yang tidak sesuai dengan harapan. Menekankan kontras antara status tinggi dan tindakan yang rendah.',
  nuance: 'Selalu bernuansa kecaman atau kritik. N yang digunakan adalah jabatan/status yang dihormati (社長、教授、プロ選手, dll). Diikuti klausa negatif atau ekspresi penyesalan. Berbeda dari まじき yang lebih tentang larangan prinsipil.',
  examples: [
    { jp: '社長<b>ともあろう</b>人が、そんな失礼なことを言うとは。', id: 'Tidak disangka seseorang sekaliber direktur utama mengucapkan hal yang tidak sopan seperti itu.' },
    { jp: 'プロ<b>ともあろう</b>者が、基本的なミスをするとは情けない。', id: 'Sungguh memalukan bahwa seseorang yang mengaku profesional melakukan kesalahan dasar seperti itu.' },
    { jp: '教授<b>ともあろう</b>方が、そんな非論理的な意見を述べるとは驚きだ。', id: 'Sungguh mengejutkan bahwa seseorang sekaliber profesor mengemukakan pendapat yang tidak logis seperti itu.' }
  ],
  see_also_grammar: ['gn1-00052'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00052'],
  register: 'literary', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00057', level: 'n1', pattern: '〜ずにはおかない', reading: '〜zu ni wa okanai',
  meaning: 'pasti akan ... / tidak bisa tidak ... (tak terelakkan)',
  cat: 'obligation-necessity',
  connection: 'V-neg (ず形) + にはおかない',
  desc: '<b>〜ずにはおかない</b> menyatakan bahwa sesuatu pasti terjadi atau dilakukan — tidak bisa dihindari, baik karena dorongan kuat dari dalam maupun kekuatan luar yang mendesak.',
  nuance: 'Ada dua nuansa: (1) "sesuatu yang menimbulkan reaksi kuat" — X ずにはおかない = X pasti membuatmu bereaksi; (2) "tekad yang tidak tergoyahkan" — subjek pasti akan melakukan X. Berbeda dari ないではいられない yang lebih personal/emosional — ずにはおかない lebih kuat dan sering tentang efek pada orang lain.',
  examples: [
    { jp: 'この映画は観る者を感動させ<b>ずにはおかない</b>。', id: 'Film ini pasti akan mengharukan siapapun yang menontonnya.' },
    { jp: '彼の演奏は聴く人を感動させ<b>ずにはおかない</b>力があった。', id: 'Permainannya memiliki kekuatan yang pasti menggerakkan hati siapapun yang mendengar.' },
    { jp: 'この事件は社会に反省を促さ<b>ずにはおかない</b>だろう。', id: 'Kasus ini pasti akan mendorong masyarakat untuk introspeksi.' }
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'written', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00068', level: 'n1', pattern: '〜ずにはすまない',
  reading: '〜zu ni wa sumanai',
  meaning: 'tidak bisa begitu saja tanpa melakukan ... / situasi sosial menuntut untuk ...',
  cat: 'obligation-necessity',
  connection: 'V-nai-stem + ずにはすまない (suru → せずにはすまない)',
  desc: '<b>〜ずにはすまない</b> menyatakan bahwa seseorang tidak dapat menghindari suatu tindakan karena tekanan sosial, moral, atau situasional. Ada perasaan bahwa norma atau harapan orang lain mengharuskan tindakan tersebut.',
  nuance: 'Menekankan tekanan dari luar diri sendiri — norma sosial, harapan orang lain, atau konsekuensi moral. Berbeda dari ないわけにはいかない (alasan logis) dan ないではいられない (dorongan dari dalam). Formal-netral.',
  examples: [
    { jp: '迷惑をかけた以上、謝らずにはすまない。', id: 'Karena sudah merepotkan, tidak bisa begitu saja tanpa meminta maaf.' },
    { jp: 'こんな大きなミスをしたら、責任を取らずにはすまないだろう。', id: 'Kalau sudah membuat kesalahan sebesar ini, pasti tidak bisa lepas dari tanggung jawab.' }
  ],
  see_also_grammar: ['gn1-00069', 'gn1-00072'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00069', 'gn1-00072'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00069', level: 'n1', pattern: '〜ないではすまない',
  reading: '〜nai de wa sumanai',
  meaning: 'tidak bisa tidak melakukan ... / tidak bisa lepas dari keharusan ...',
  cat: 'obligation-necessity',
  connection: 'V-nai + ではすまない',
  desc: '<b>〜ないではすまない</b> memiliki makna yang sangat mirip dengan 〜ずにはすまない — menyatakan bahwa suatu tindakan tidak dapat dihindari karena tuntutan sosial atau moral.',
  nuance: 'Secara makna hampir identik dengan ずにはすまない. Perbedaan halus: ないではすまない sedikit lebih umum dalam percakapan modern dan lebih ringan terdengar; ずにはすまない terasa lebih formal/tertulis. Keduanya menekankan tekanan eksternal.',
  examples: [
    { jp: 'こんなことをされたら、怒らないではすまない。', id: 'Kalau diperlakukan seperti ini, tidak mungkin bisa tidak marah.' },
    { jp: '彼女に直接謝らないではすまない状況だ。', id: 'Ini situasi di mana tidak bisa tidak minta maaf langsung padanya.' }
  ],
  see_also_grammar: ['gn1-00068', 'gn1-00072'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00068'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00071', level: 'n1', pattern: '〜を禁じ得ない',
  reading: '〜wo kinjienaI',
  meaning: 'tidak bisa menahan ... / tidak kuasa menahan (perasaan yang muncul spontan)',
  cat: 'sentence-final-modality',
  connection: 'N (kata benda perasaan) + を禁じ得ない',
  desc: '<b>〜を禁じ得ない</b> menyatakan bahwa seseorang tidak mampu menahan perasaan tertentu yang muncul secara spontan. Kata benda yang mendahului hampir selalu adalah perasaan: 感動, 涙, 怒り, 遺憾, 痛恨.',
  nuance: 'Sangat formal dan tertulis — lazim dalam pernyataan resmi, pidato, atau jurnalisme. Tidak digunakan dalam percakapan biasa. Berbeda dari にたえない — 禁じ得ない menekankan ketidakmampuan mengendalikan perasaan yang muncul, bukan evaluasi kualitas.',
  examples: [
    { jp: 'その報道を聞いて、怒りを禁じ得なかった。', id: 'Mendengar laporan itu, tidak bisa menahan amarah.' },
    { jp: '被災地の映像を見て、涙を禁じ得ない。', id: 'Melihat tayangan daerah bencana, tidak kuasa menahan air mata.' }
  ],
  see_also_grammar: ['gn1-00070', 'gn1-00064'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00064', 'gn1-00070'],
  register: 'written', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00072', level: 'n1', pattern: '〜ないわけにはいかない',
  reading: '〜nai wake ni wa ikanai',
  meaning: 'tidak bisa tidak melakukan ... / ada alasan yang mengharuskan melakukan ...',
  cat: 'obligation-necessity',
  connection: 'V-nai + わけにはいかない',
  desc: '<b>〜ないわけにはいかない</b> menyatakan bahwa suatu tindakan tidak bisa dihindari karena ada alasan kuat — logis, moral, atau sosial — yang mengharuskannya. Seseorang merasa tidak mungkin melewatkan atau menolak tindakan tersebut.',
  nuance: 'Menekankan alasan yang jelas dan logis mengapa tindakan itu wajib dilakukan. Berbeda dari ずにはすまない (tekanan norma sosial dari luar) dan ないではいられない (dorongan emosional dari dalam). Ini lebih rasional dan umum penggunaannya.',
  examples: [
    { jp: '彼には本当のことを話さないわけにはいかない。', id: 'Tidak bisa tidak memberitahu dia yang sebenarnya.' },
    { jp: '招待されたのだから、行かないわけにはいかない。', id: 'Karena sudah diundang, tidak bisa tidak pergi.' }
  ],
  see_also_grammar: ['gn1-00068', 'gn1-00069', 'gn1-00073'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00068', 'gn1-00073'],
  register: null, exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00081', level: 'n1', pattern: '〜ずにはおかない',
  reading: '〜zu ni wa okanai',
  meaning: 'pasti akan ..., tidak bisa tidak menyebabkan ...; tekad kuat untuk tidak membiarkan sesuatu berlalu begitu saja',
  cat: 'sentence-final-modality',
  connection: 'V-nai-stem + ずにはおかない（する→せずにはおかない）',
  desc: '<b>〜ずにはおかない</b> menyatakan dua makna utama: (1) sesuatu pasti/niscaya menimbulkan efek tertentu pada orang lain atau keadaan — efek yang tak terhindarkan; (2) tekad kuat pembicara bahwa ia tidak akan membiarkan sesuatu terjadi tanpa tindakan. Kata kerja sebelum pola ini hampir selalu bersifat kausal.',
  nuance: 'Berbeda dari 〜ずにはいられない (tidak tahan untuk tidak melakukan sesuatu — fokus pada dorongan diri sendiri yang tak terkendali), 〜ずにはおかない menekankan efek yang ditimbulkan pada pihak lain atau hasil yang tak terelakkan. Makna (1): この映画は人を感動させ<b>ずにはおかない</b> = film ini pasti membuat orang tersentuh. Makna (2): 謝らせずにはおかない = aku pasti akan membuatnya minta maaf.',
  examples: [
    { jp: '彼女の演技は、観客を感動させ<b>ずにはおかない</b>ほど素晴らしかった。', id: 'Aktingnya begitu luar biasa sehingga pasti membuat para penonton tersentuh tanpa terkecuali.' },
    { jp: 'あんな不正を見たら、指摘せ<b>ずにはおかない</b>。', id: 'Kalau melihat kecurangan seperti itu, aku pasti tidak akan membiarkannya tanpa menegur.' },
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: 'する動詞 → せずにはおかない（例：批判する→批判せずにはおかない）。〜ずにはいられない との違いに注意。',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00116', level: 'n1', pattern: '〜たるもの',
  reading: '〜taru mono',
  meaning: 'sebagai ..., orang yang berposisi sebagai ... (seharusnya bertindak demikian)',
  cat: 'obligation-necessity',
  connection: 'N + たるもの',
  desc: '<b>〜たるもの</b> menyatakan bahwa seseorang yang memegang posisi, jabatan, atau peran tertentu seharusnya berperilaku sesuai standar yang diharapkan dari posisi tersebut. Biasanya diikuti oleh pernyataan tentang kewajiban atau standar moral/profesional.',
  nuance: 'Sangat formal dan terasa seperti ceramah moral. Mengandung nuansa "sudah sepatutnya" atau "layaknya". Lebih kuat dari 〜として dan menekankan tanggung jawab yang melekat pada jabatan. Sering digunakan untuk menegur atau mengingatkan standar perilaku.',
  examples: [
    { jp: '教師たるもの、常に公正であるべきだ。', id: 'Sebagai seorang guru, sudah sepatutnya selalu bersikap adil.' },
    { jp: '社会人たるもの、礼儀を忘れてはならない。', id: 'Sebagai orang yang telah terjun ke masyarakat, jangan pernah melupakan sopan santun.' },
    { jp: 'リーダーたるもの、困難な時こそ率先して行動すべきだ。', id: 'Sebagai seorang pemimpin, justru di saat sulit harus bertindak sebagai pelopor.' }
  ],
  see_also_grammar: ['gn1-00117'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00131', level: 'n1', pattern: '〜てやまない',
  reading: '〜te yamanai',
  meaning: 'tidak pernah berhenti ..., terus-menerus merasakan ..., dari lubuk hati ...',
  cat: 'sentence-final-modality',
  connection: 'V-te + やまない',
  desc: '<b>〜てやまない</b> menyatakan bahwa perasaan atau sikap tertentu terus berlanjut tanpa henti karena sangat kuat. Digunakan khusus untuk ekspresi perasaan positif yang mendalam seperti cinta, harapan, kekaguman, atau dukungan. Memberikan kesan ketulusan dan kedalaman emosional.',
  nuance: 'Hampir selalu digunakan dengan kata kerja emosi positif: 愛してやまない (mencintai sepenuh hati), 敬ってやまない (senantiasa menghormati), 願ってやまない (terus-menerus berharap). Tidak lazim dengan emosi negatif. Lebih kuat dan formal dari 〜続ける untuk ekspresi perasaan.',
  examples: [
    { jp: '私は故郷を愛してやまない。', id: 'Aku mencintai kampung halamanku dari lubuk hati yang paling dalam.' },
    { jp: '皆様のご活躍を願ってやまない。', id: 'Kami terus-menerus mendoakan kesuksesan dan kemajuan Anda semua.' },
    { jp: '恩師への敬意は、今も変わらずあってやまない。', id: 'Rasa hormat kepada guru yang berjasa tidak pernah pudar hingga kini.' }
  ],
  see_also_grammar: ['gn1-00132'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: 'Hampir eksklusif untuk perasaan positif — tidak lazim untuk emosi negatif.', notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00132', level: 'n1', pattern: '〜を禁じ得ない',
  reading: '〜wo kinjienai',
  meaning: 'tidak bisa tidak merasakan ..., tidak tertahankan (rasa ...), diliputi rasa ...',
  cat: 'sentence-final-modality',
  connection: 'N (ekspresi emosi) + を禁じ得ない',
  desc: '<b>〜を禁じ得ない</b> menyatakan bahwa pembicara tidak mampu menahan atau menekan suatu perasaan karena begitu kuat. Berbeda dari 〜てやまない, pola ini sering digunakan untuk ekspresi emosi baik positif maupun negatif, termasuk indignasi, haru, kekhawatiran, atau simpati.',
  nuance: 'Kata benda yang mendahului biasanya adalah nomina emosi: 怒りを禁じ得ない (tidak bisa menahan amarah), 涙を禁じ得ない (tidak bisa menahan air mata), 驚きを禁じ得ない (tidak bisa menyembunyikan rasa terkejut). Lebih formal dari 〜ずにはいられない dan terasa lebih sastra.',
  examples: [
    { jp: 'その知らせを聞いて、悲しみを禁じ得なかった。', id: 'Setelah mendengar kabar itu, aku tidak bisa menahan rasa sedih.' },
    { jp: '子どもたちの努力に、感動を禁じ得ない。', id: 'Menghadapi usaha keras anak-anak itu, aku tidak bisa menahan rasa haru.' },
    { jp: '彼の無責任な態度には、怒りを禁じ得ない。', id: 'Menyaksikan sikapnya yang tidak bertanggung jawab, aku tidak bisa menahan amarah.' }
  ],
  see_also_grammar: ['gn1-00131', 'gn1-00130'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00133', level: 'n1', pattern: '〜ざるを得ない',
  reading: '〜zaru wo enai',
  meaning: 'terpaksa ..., tidak bisa tidak ..., tidak ada pilihan selain ...',
  cat: 'obligation-necessity',
  connection: 'V-nai-stem + ざるを得ない (suru → せざるを得ない)',
  desc: '<b>〜ざるを得ない</b> menyatakan bahwa meskipun tidak diinginkan, seseorang terpaksa melakukan sesuatu karena tekanan situasi atau tidak ada pilihan lain. Mengandung nuansa keterpaksaan dan ketidakleluasaan.',
  nuance: 'Lebih formal dari 〜しかない atau 〜なければならない. Perbedaan utama: 〜ざるを得ない menekankan bahwa pilihan tersebut tidak disukai namun terpaksa diambil (keterpaksaan dari luar), sementara 〜なければならない lebih netral tentang sumber kewajiban. Sangat umum dalam konteks bisnis, hukum, dan tulisan formal.',
  examples: [
    { jp: '証拠が揃った以上、容疑者を逮捕せざるを得ない。', id: 'Karena buktinya sudah lengkap, tidak ada pilihan selain menangkap tersangka.' },
    { jp: '予算の削減で、プロジェクトを縮小せざるを得なくなった。', id: 'Karena pemotongan anggaran, kami terpaksa memperkecil skala proyek.' },
    { jp: '状況を考えると、同意せざるを得ない。', id: 'Kalau mempertimbangkan situasinya, aku tidak punya pilihan selain menyetujui.' }
  ],
  see_also_grammar: ['gn1-00134'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: 'Konjugasi: 書く→書かざるを得ない、する→せざるを得ない、来る→来ざるを得ない.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00148',
  level: 'n1',
  pattern: '〜と見られる',
  reading: '〜to mirareru',
  meaning: 'dianggap sebagai ..., dipandang ..., diperkirakan ...',
  cat: 'hearsay-report',
  connection: 'V-plain / N + と見られる',
  desc: '<b>〜と見られる</b> menyatakan bahwa sesuatu dipandang, diperkirakan, atau dinilai demikian oleh banyak orang atau oleh pengamat secara umum. Sering digunakan dalam berita, laporan, dan analisis untuk menyatakan perkiraan atau penilaian yang belum dikonfirmasi secara resmi.',
  nuance: 'Berbeda dari 〜とされる (gn1-00149) yang menyatakan anggapan resmi atau konsensus yang sudah mapan, 〜と見られる lebih bersifat estimasi atau pengamatan dari luar. Sering ditemukan dalam jurnalisme untuk melaporkan informasi yang belum dikonfirmasi (misalnya "diperkirakan korban jiwa mencapai ..."). Lebih subjektif dibanding 〜とされている (gn1-00151).',
  examples: [
    { jp: '事故の原因は機器の故障<b>と見られる</b>。', id: 'Penyebab kecelakaan diperkirakan adalah kerusakan alat.' },
    { jp: '被害総額は数十億円に上る<b>と見られている</b>。', id: 'Total kerugian dipandang bisa mencapai puluhan miliar yen.' },
    { jp: '彼は次の候補者として有力<b>と見られている</b>。', id: 'Dia dipandang sebagai kandidat terkuat berikutnya.' },
  ],
  see_also_grammar: ['gn1-00149', 'gn1-00150', 'gn1-00151'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00149', 'gn1-00150', 'gn1-00147'],
  register: null,
  exceptions: null,
  notes: 'Sangat umum dalam bahasa berita dan laporan.',
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00149',
  level: 'n1',
  pattern: '〜とされる',
  reading: '〜to sareru',
  meaning: 'dikatakan bahwa ..., dianggap ..., dipandang secara umum ...',
  cat: 'hearsay-report',
  connection: 'V-plain / N + とされる',
  desc: '<b>〜とされる</b> menyatakan bahwa sesuatu dianggap atau digolongkan demikian berdasarkan penilaian umum, konvensi, atau otoritas. Menyampaikan anggapan yang bersifat konsensus atau sudah diterima, tanpa harus menyebutkan sumber spesifik.',
  nuance: 'Lebih kuat dari 〜といわれる (gn1-00150) yang sekadar menyampaikan "kata orang". 〜とされる mengimplikasikan bahwa anggapan tersebut sudah mapan atau ditetapkan oleh pihak yang memiliki otoritas. Berbeda dari 〜とされている (gn1-00151) yang menyatakan kondisi yang masih berlaku hingga sekarang; 〜とされる lebih umum dan tidak terikat waktu.',
  examples: [
    { jp: 'この地域は危険区域<b>とされる</b>。', id: 'Kawasan ini dianggap sebagai zona berbahaya.' },
    { jp: '彼の発言は問題あり<b>とされた</b>。', id: 'Pernyataannya dinilai bermasalah.' },
    { jp: 'その薬は副作用が少ない<b>とされている</b>。', id: 'Obat tersebut dianggap memiliki efek samping yang sedikit.' },
  ],
  see_also_grammar: ['gn1-00148', 'gn1-00150', 'gn1-00151'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00150', 'gn1-00151', 'gn1-00148'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00150',
  level: 'n1',
  pattern: '〜といわれる',
  reading: '〜to iwareru',
  meaning: 'dikatakan bahwa ..., konon ..., menurut orang ...',
  cat: 'hearsay-report',
  connection: 'V-plain / N + といわれる',
  desc: '<b>〜といわれる</b> menyatakan bahwa sesuatu dikatakan atau dipercaya demikian oleh banyak orang atau oleh tradisi. Menyampaikan informasi yang beredar luas atau diturunkan secara budaya, tanpa mengklaim kebenarannya secara langsung.',
  nuance: 'Lebih informal dan kurang otoritatif dibanding 〜とされる (gn1-00149). Sementara 〜とされる mengimplikasikan konsensus yang ditetapkan, 〜といわれる sekadar menyampaikan "begitulah yang dikatakan orang". Sering digunakan untuk tradisi, kepercayaan populer, atau informasi yang belum diverifikasi. Mirip dengan "konon" atau "kata orang" dalam bahasa Indonesia.',
  examples: [
    { jp: '富士山は日本の象徴<b>といわれる</b>。', id: 'Gunung Fuji konon adalah simbol Jepang.' },
    { jp: '彼女は天才<b>といわれている</b>が、本人は謙遜している。', id: 'Dia dikatakan sebagai jenius, namun ia sendiri merendah.' },
    { jp: 'この泉の水を飲むと長生きできる<b>といわれている</b>。', id: 'Konon, meminum air dari mata air ini bisa membuat panjang umur.' },
  ],
  see_also_grammar: ['gn1-00149', 'gn1-00148', 'gn1-00151'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00149', 'gn1-00151', 'gn1-00148'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00151',
  level: 'n1',
  pattern: '〜とされている',
  reading: '〜to sarete iru',
  meaning: 'sudah diakui bahwa ..., berlaku anggapan bahwa ..., secara umum dipandang ...',
  cat: 'hearsay-report',
  connection: 'V-plain / N + とされている',
  desc: '<b>〜とされている</b> menyatakan bahwa suatu anggapan atau penilaian sudah berlaku dan masih diterima hingga saat ini. Menekankan aspek kondisi yang berkelanjutan (〜ている), sehingga menunjukkan bahwa konsensus atau klasifikasi tersebut masih aktif.',
  nuance: 'Ini adalah bentuk progresif dari 〜とされる (gn1-00149). Sementara 〜とされる bisa merujuk pada penilaian saat itu juga atau umum, 〜とされている secara eksplisit menyatakan bahwa anggapan tersebut masih berlaku sekarang. Sering digunakan dalam teks ilmiah, berita, atau kebijakan yang sedang berjalan.',
  examples: [
    { jp: 'この物質は有害<b>とされている</b>。', id: 'Zat ini saat ini berlaku anggapan bahwa ia berbahaya.' },
    { jp: '彼は業界のパイオニア<b>とされている</b>。', id: 'Ia diakui sebagai pelopor di industri ini.' },
    { jp: 'その慣行は時代遅れ<b>とされている</b>。', id: 'Praktik tersebut sudah dipandang ketinggalan zaman.' },
  ],
  see_also_grammar: ['gn1-00149', 'gn1-00150', 'gn1-00148'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00149', 'gn1-00152', 'gn1-00150'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
}

];
