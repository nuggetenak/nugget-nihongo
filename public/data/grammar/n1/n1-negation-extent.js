// ──────────────────────────────────────────────────────────────
//  n1-negation-extent.js — Nugget Nihongo · JLPT N1 Grammar
//  34 entries | Category: negation-extent
//  Edit directly — merge with: node scripts/merge-grammar.js
// ──────────────────────────────────────────────────────────────

window.grammarN1_Negation_Extent = [

{
  id: 'gn1-00004', level: 'n1', pattern: '〜にして', reading: '〜ni shite',
  meaning: 'sekaligus ... / baru pada tahap ... (klasik/keigo)',
  cat: 'extent-degree',
  connection: 'N + にして',
  desc: '<b>〜にして</b> dalam konteks N1 menyatakan dua hal: (1) "sekaligus" — seseorang yang memiliki dua sifat/peran sekaligus (詩人にして哲学者 = penyair sekaligus filsuf); atau (2) "baru pada kondisi itu baru bisa terjadi" — menekankan betapa tingginya syarat yang dibutuhkan.',
  nuance: 'Bernuansa klasik dan agung. Pola (2) sering digunakan bersama 〜初めて → 〜にして初めて. Tidak lazim dalam percakapan modern. Berbeda dari 〜でも yang netral, 〜にして terasa lebih formal dan kagum.',
  examples: [
    { jp: '彼は作家<b>にして</b>外交官でもあった。', id: 'Dia adalah seorang penulis sekaligus diplomat.' },
    { jp: '80歳<b>にして</b>、まだ現役で働いている。', id: 'Di usia 80 tahun pun, dia masih aktif bekerja.' },
    { jp: 'この境地は長年の修行<b>にして</b>初めて達せるものだ。', id: 'Tataran ini baru bisa dicapai setelah bertahun-tahun berlatih.' }
  ],
  see_also_grammar: ['gn1-00005', 'gn1-00018'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00005', 'gn1-00018'],
  register: 'written', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00011', level: 'n1', pattern: '〜ながらに', reading: '〜nagara ni',
  meaning: 'dengan tetap dalam kondisi ... / sejak ... hingga sekarang',
  cat: 'extent-degree',
  connection: 'N / V-stem + ながらに（して）',
  desc: '<b>〜ながらに</b> menyatakan bahwa sesuatu terjadi atau ada dalam keadaan yang tetap/tidak berubah. Bisa berarti "sejak lahir" (生まれながらに) atau "dalam kondisi itu" (涙ながらに = sembari berurai air mata).',
  nuance: 'Berbeda dari 〜ながらも yang menyatakan kontras, 〜ながらに menyatakan kondisi yang menyertai tanpa kontras. Sering membentuk ekspresi tetap: 生まれながらに (sejak lahir), 涙ながらに (sembari menangis).',
  examples: [
    { jp: '彼女は生まれ<b>ながらに</b>才能を持っていた。', id: 'Dia memiliki bakat sejak lahir.' },
    { jp: '涙<b>ながらに</b>、別れを告げた。', id: 'Dia mengucapkan selamat tinggal sembari berurai air mata.' },
    { jp: 'い<b>ながらにして</b>、世界中の情報にアクセスできる。', id: 'Tanpa beranjak ke mana-mana, kita bisa mengakses informasi dari seluruh dunia.' }
  ],
  see_also_grammar: ['gn1-00010'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00010'],
  register: 'written', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00015', level: 'n1', pattern: '〜に至っては', reading: '〜ni itte wa',
  meaning: 'bahkan dalam hal ... / lebih parah lagi ...',
  cat: 'extent-degree',
  connection: 'N + に至っては',
  desc: '<b>〜に至っては</b> digunakan untuk memperkenalkan kasus yang paling ekstrem dalam suatu rangkaian, biasanya untuk memperkuat argumen atau menunjukkan betapa parahnya situasi. "Bahkan X pun ..."',
  nuance: 'Mengindikasikan bahwa kasus yang disebutkan adalah yang paling buruk atau paling mengejutkan dari semuanya. Berbeda dari 〜に至るまで yang mencakup rentang, 〜に至っては memfokuskan pada satu titik ekstrem saja.',
  examples: [
    { jp: '他の部員はまだいいが、彼女<b>に至っては</b>一度も練習に来ない。', id: 'Anggota lain masih bisa dimaklumi, tapi bahkan dia tidak pernah datang latihan sekali pun.' },
    { jp: '子供はもちろん、大人<b>に至っては</b>もっとひどい行動をしていた。', id: 'Anak-anak sudah tentu, bahkan orang dewasa pun bertindak lebih parah.' },
    { jp: '部長も問題があるが、社長<b>に至っては</b>完全に無責任だ。', id: 'Manajer pun ada masalah, tapi bahkan direkturnya benar-benar tidak bertanggung jawab.' }
  ],
  see_also_grammar: ['gn1-00016', 'gn1-00017'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00016', 'gn1-00017'],
  register: 'written', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00016', level: 'n1', pattern: '〜に至るまで', reading: '〜ni itaru made',
  meaning: 'sampai kepada ... / bahkan hingga ...',
  cat: 'extent-degree',
  connection: 'N + に至るまで',
  desc: '<b>〜に至るまで</b> menyatakan jangkauan yang sangat luas, hingga menyentuh hal-hal yang paling detail atau tidak terduga sekalipun. Sering digunakan bersama 〜から untuk membentuk "dari ... hingga ...".',
  nuance: 'Menekankan bahwa suatu hal mencakup semua elemen, termasuk yang paling kecil sekalipun. Berbeda dari 〜まで biasa, 〜に至るまで terasa lebih formal dan lebih menekankan kelengkapan atau kedalaman cakupan.',
  examples: [
    { jp: '日常の食事から服装<b>に至るまで</b>、彼女に管理されている。', id: 'Dari makan sehari-hari hingga pakaian, semuanya dikontrol olehnya.' },
    { jp: '会社の経営方針から細かいルール<b>に至るまで</b>、彼が決めている。', id: 'Dari kebijakan manajemen hingga aturan kecil, semuanya dia yang memutuskan.' },
    { jp: '歴史的な出来事から個人の生活<b>に至るまで</b>、詳しく書かれている。', id: 'Ditulis secara rinci dari peristiwa bersejarah hingga kehidupan pribadi.' }
  ],
  see_also_grammar: ['gn1-00015', 'gn1-00017'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00015', 'gn1-00017'],
  register: 'written', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00025', level: 'n1', pattern: '〜ならでは', reading: '〜nara de wa',
  meaning: 'hanya bisa ada pada ... / khas dari ... (tidak ada di tempat lain)',
  cat: 'extent-degree',
  connection: 'N + ならでは（の + N / で + predicate）',
  desc: '<b>〜ならでは</b> menyatakan bahwa sesuatu hanya bisa ada, dilakukan, atau dirasakan dalam konteks atau pada entitas yang disebutkan. Mengandung nuansa keistimewaan dan keunikan yang positif.',
  nuance: 'Selalu berkonotasi positif — menyoroti keistimewaan eksklusif. Berbeda dari 〜だけ atau 〜しか, 〜ならでは menekankan nilai istimewa yang tidak bisa ditemukan di tempat lain. Sering dalam konteks budaya dan pariwisata.',
  examples: [
    { jp: '京都<b>ならでは</b>の風景が広がっている。', id: 'Terbentang pemandangan yang hanya bisa ditemukan di Kyoto.' },
    { jp: 'これはプロ<b>ならでは</b>の技だ。', id: 'Ini adalah teknik yang hanya dimiliki oleh seorang profesional.' },
    { jp: '手作り<b>ならでは</b>の温かさがある。', id: 'Ada kehangatan yang hanya bisa ada pada barang buatan tangan.' }
  ],
  see_also_grammar: ['gn1-00026'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00026'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00026', level: 'n1', pattern: '〜ならではの', reading: '〜nara de wa no',
  meaning: 'yang khas/unik dari ... (sebagai pengubah nomina)',
  cat: 'extent-degree',
  connection: 'N + ならではの + N',
  desc: '<b>〜ならではの</b> adalah varian atributif (pengubah nomina) dari 〜ならでは, yang menyatakan keistimewaan eksklusif suatu entitas. Selalu diikuti nomina yang dijelaskannya.',
  nuance: 'Secara fungsi berbeda dari 〜ならでは: 〜ならではの selalu mendahului nomina (ならではの味、ならではの経験), sedangkan 〜ならでは bisa berdiri sendiri atau diikuti で + predikat. Keduanya bermakna sama namun berbeda posisi.',
  examples: [
    { jp: '日本<b>ならではの</b>おもてなし文化に感動した。', id: 'Aku terkesan dengan budaya penyambutan tulus yang khas Jepang.' },
    { jp: 'このシェフ<b>ならではの</b>料理が楽しめる。', id: 'Kamu bisa menikmati masakan yang khas hanya dari chef ini.' },
    { jp: '子供時代<b>ならではの</b>無邪気な笑顔が忘れられない。', id: 'Senyum polos yang hanya ada di masa kanak-kanak tidak bisa terlupakan.' }
  ],
  see_also_grammar: ['gn1-00025'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00025'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00059', level: 'n1', pattern: '〜極まる / 〜極まりない', reading: '〜kiwamaru / 〜kiwamari nai',
  meaning: 'sungguh ... / keterlaluan / mencapai puncak dari ... (ekspresi intens)',
  cat: 'extent-degree',
  connection: 'na-adj語幹 + 極まる / 極まりない',
  desc: '<b>〜極まる</b> dan <b>〜極まりない</b> menyatakan bahwa sifat X mencapai puncak atau tingkatan tertinggi. Kedua bentuk memiliki makna yang hampir sama, namun 極まりない sedikit lebih umum dalam penggunaan modern.',
  nuance: 'Hanya digunakan dengan na-adjective (tanpa な). Sering dipakai dengan kata-kata yang menggambarkan sikap negatif atau kualitas yang ekstrem: 失礼極まる (sangat tidak sopan), 危険極まりない (sangat berbahaya). Sangat formal dan bernada keras.',
  examples: [
    { jp: 'あの態度は失礼<b>極まりない</b>。', id: 'Sikap itu benar-benar tidak sopan keterlaluan.' },
    { jp: '命綱なしで登山するとは、危険<b>極まる</b>行為だ。', id: 'Mendaki gunung tanpa tali pengaman adalah tindakan yang sungguh berbahaya.' },
    { jp: '公の場でそんな発言をするとは、無礼<b>極まりない</b>。', id: 'Mengucapkan hal seperti itu di tempat umum sungguh tidak beradab keterlaluan.' }
  ],
  see_also_grammar: ['gn1-00060'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'written', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00060', level: 'n1', pattern: '〜の至り', reading: '〜no itari',
  meaning: 'puncak dari ... / sungguh merupakan ... (formal/ceremonial)',
  cat: 'extent-degree',
  connection: 'N + の至り',
  desc: '<b>〜の至り</b> menyatakan bahwa suatu perasaan atau kondisi mencapai puncak tertingginya. Digunakan dalam konteks ceremonial atau formal untuk mengungkapkan perasaan yang sangat mendalam dengan cara yang elegan.',
  nuance: 'Hampir selalu dipakai dengan kata-kata positif/emosi tinggi dalam konteks ceremonial: 光栄の至り (sungguh suatu kehormatan), 恐縮の至り (sungguh mempermalukan diri), 若気の至り (kenakalan masa muda). Sangat formal — terdengar kuno jika dipakai di luar konteks ceremonial.',
  examples: [
    { jp: 'このような賞をいただき、光栄<b>の至り</b>でございます。', id: 'Mendapatkan penghargaan seperti ini sungguh merupakan kehormatan yang tiada tara.' },
    { jp: '皆様の前でご挨拶できますこと、感激<b>の至り</b>です。', id: 'Dapat menyampaikan sambutan di hadapan semua orang sungguh merupakan kebahagiaan yang luar biasa.' },
    { jp: 'あの頃の失礼な行動は、若気<b>の至り</b>だったと今は反省しております。', id: 'Tingkah laku yang tidak sopan di masa itu kini kusadari sebagai kecerobohan masa muda.' }
  ],
  see_also_grammar: ['gn1-00059'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'written', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00061', level: 'n1', pattern: '〜に足る / 〜に足りる',
  reading: '〜ni taru / 〜ni tariru',
  meaning: 'layak untuk ... / cukup untuk ... (formal)',
  cat: 'extent-degree',
  connection: 'V-dictionary / N + に足る',
  desc: '<b>〜に足る</b> menyatakan bahwa seseorang atau sesuatu memiliki kualitas yang cukup untuk memenuhi suatu standar atau pantas mendapatkan sesuatu. Varian klasik adalah 〜に足る, lebih modern 〜に足りる.',
  nuance: 'Pola formal dan tertulis. Paling sering dipadukan dengan kata seperti 信頼, 尊敬, 称賛, 注目 — menyatakan bahwa objeknya benar-benar pantas mendapat penilaian setinggi itu. Memberikan kesan penilaian yang berwibawa.',
  examples: [
    { jp: '彼女の業績は称賛に足るものだ。', id: 'Prestasinya memang layak mendapat pujian.' },
    { jp: 'この作品は繰り返し鑑賞に足る傑作だ。', id: 'Karya ini adalah mahakarya yang layak dinikmati berulang kali.' },
    { jp: '信頼に足る人物を選ぶことが重要だ。', id: 'Penting untuk memilih orang yang layak dipercaya.' }
  ],
  see_also_grammar: ['gn1-00062', 'gn1-00063'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00062'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00062', level: 'n1', pattern: '〜に足らない / 〜に足りない',
  reading: '〜ni taranai / 〜ni tarinai',
  meaning: 'tidak layak untuk ... / tidak perlu dirisaukan / tidak sebanding dengan ...',
  cat: 'extent-degree',
  connection: 'V-dictionary / N + に足らない',
  desc: '<b>〜に足らない</b> adalah bentuk negatif dari 〜に足る — menyatakan bahwa sesuatu tidak memiliki nilai atau kualitas yang cukup, tidak pantas dipertimbangkan, atau tidak perlu dicemaskan.',
  nuance: 'Sering digunakan dengan nuansa meremehkan sesuatu — "hal sekecil itu tidak perlu dibesar-besarkan." Umum berpasangan dengan kata seperti 問題, 心配, 気にする, 取り上げる. Formal tapi juga bisa bernuansa merendahkan.',
  examples: [
    { jp: 'そんなことは気にするに足らない。', id: 'Hal seperti itu sama sekali tidak perlu dirisaukan.' },
    { jp: '彼の反論は取り上げるに足りない内容だった。', id: 'Sanggahan dia tidak berisi sesuatu yang layak dibahas.' }
  ],
  see_also_grammar: ['gn1-00061'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00061'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00064', level: 'n1', pattern: '〜にたえない',
  reading: '〜ni taenai',
  meaning: 'tidak tahan ... / tidak sanggup menahan ... / terlalu (buruk/menyedihkan) untuk ditoleransi',
  cat: 'negative',
  connection: 'V-dictionary / N + にたえない',
  desc: '<b>〜にたえない</b> adalah bentuk negatif dari 〜にたえる — menyatakan bahwa seseorang tidak sanggup menahan perasaan yang muncul, atau bahwa sesuatu terlalu buruk atau menyedihkan untuk ditonton atau didengarkan.',
  nuance: 'Dua penggunaan utama: (1) ekspresi formal untuk perasaan yang tidak terbendung — 感謝にたえない, 遺憾にたえない (sering dalam surat resmi/pidato); (2) penilaian bahwa sesuatu terlalu jelek/menyedihkan untuk ditoleransi. Sangat formal.',
  examples: [
    { jp: '皆様のご支援に感謝にたえません。', id: 'Sungguh tidak kuasa menahan rasa syukur atas dukungan semua pihak.' },
    { jp: 'あの映像は目にたえない残酷さだった。', id: 'Tayangan itu sungguh terlalu kejam untuk ditonton.' }
  ],
  see_also_grammar: ['gn1-00063', 'gn1-00071'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00063', 'gn1-00071'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00065', level: 'n1', pattern: '〜をおいてほかにない',
  reading: '〜wo oite hoka ni nai',
  meaning: 'tidak ada yang lain selain ... / hanya ... lah yang bisa / tidak ada pilihan kecuali ...',
  cat: 'extent-degree',
  connection: 'N + をおいて(ほかに)ない / をおいてほかにいない',
  desc: '<b>〜をおいてほかにない</b> menyatakan eksklusivitas mutlak — hanya satu pilihan, satu orang, atau satu hal yang paling tepat atau mampu. Kata ほかに bersifat opsional tapi sering digunakan.',
  nuance: 'Sangat formal dan kuat. Digunakan untuk memuji seseorang sebagai satu-satunya yang mampu, atau menegaskan bahwa tidak ada alternatif lain. Tidak cocok untuk situasi biasa. Jika subjeknya orang, gunakan いない (bukan ない).',
  examples: [
    { jp: 'この仕事を任せられるのは彼女をおいてほかにいない。', id: 'Tidak ada selain dia yang bisa dipercaya untuk pekerjaan ini.' },
    { jp: 'この危機を乗り越える方法は対話をおいてほかにない。', id: 'Tidak ada cara lain untuk mengatasi krisis ini selain dialog.' }
  ],
  see_also_grammar: ['gn1-00066'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00067', level: 'n1', pattern: '〜といったらない / 〜といったらありゃしない',
  reading: '〜to ittara nai / 〜to ittara arya shinai',
  meaning: 'sungguh sangat ... bukan main / ... -nya keterlaluan — ekspresi tingkat ekstrem',
  cat: 'extent-degree',
  connection: 'Adj-stem / N + といったらない; (kasual) といったらありゃしない',
  desc: '<b>〜といったらない</b> mengekspresikan tingkat yang ekstrem — bisa positif maupun negatif. Varian kasual 〜といったらありゃしない lebih emosional dan umumnya digunakan untuk mengeluh atau mengekspresikan hal negatif.',
  nuance: '〜といったらない bisa untuk hal positif (rasa haru, keindahan) maupun negatif; 〜といったらありゃしない hampir selalu untuk hal negatif atau keluhan. Keduanya mengekspresikan emosi yang sangat kuat dan sulit diungkapkan dengan kata-kata.',
  examples: [
    { jp: 'あの映画の感動といったらなかった。', id: 'Rasa haru dari film itu sungguh bukan main.' },
    { jp: '彼のマナーの悪さといったらありゃしない。', id: 'Sungguh keterlaluan kelakuannya yang tidak sopan itu.' },
    { jp: 'あの夏の暑さといったらなかった。', id: 'Panasnya musim panas itu sungguh luar biasa.' }
  ],
  see_also_grammar: ['gn1-00070', 'gn1-00071'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: null, exceptions: null, notes: 'Bentuk lampau (といったらなかった) sering digunakan saat mengenang pengalaman.',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00080', level: 'n1', pattern: '〜ことなしに',
  reading: '〜koto nashi ni',
  meaning: 'tanpa melakukan ... / tanpa ... (prasyarat yang tidak dipenuhi)',
  cat: 'negative',
  connection: 'V-dictionary + ことなしに',
  desc: '<b>〜ことなしに</b> menyatakan bahwa suatu hal terjadi atau diupayakan tanpa melakukan tindakan tertentu. Sering digunakan untuk menyatakan bahwa sesuatu tidak mungkin terjadi tanpa prasyarat yang disebutkan.',
  nuance: 'Lebih formal dari ないで atau ずに. Sering muncul dalam konteks akademik, tulisan ilmiah, atau pernyataan formal. Memberikan kesan bahwa ketiadaan tindakan yang disebut merupakan hambatan nyata atau bertentangan dengan logika.',
  examples: [
    { jp: '努力することなしに、成功はありえない。', id: 'Tanpa berusaha, kesuksesan adalah hal yang mustahil.' },
    { jp: '互いに話し合うことなしに、問題は解決しない。', id: 'Tanpa saling berdiskusi, masalah tidak akan bisa diselesaikan.' }
  ],
  see_also_grammar: ['gn1-00068', 'gn1-00069'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00082', level: 'n1', pattern: '〜をおいて（ほかに〜ない）',
  reading: '〜o oite (hoka ni 〜nai)',
  meaning: 'selain ..., tidak ada yang lain; kecuali ..., tidak ada pilihan',
  cat: 'negative',
  connection: 'N + をおいて（ほかに/他に）〜ない',
  desc: '<b>〜をおいて</b> digunakan untuk menyatakan bahwa tidak ada pilihan, orang, atau hal lain selain yang disebutkan. Selalu diikuti bentuk negatif. Menegaskan bahwa sesuatu/seseorang adalah satu-satunya yang paling tepat atau memungkinkan.',
  nuance: 'Berbeda dari 〜以外に（〜ない）yang lebih netral (tidak ada selain X), 〜をおいて memiliki nuansa lebih kuat dan emosional — menekankan keunikan atau ketidakhadiran alternatif secara absolut. Hampir selalu digunakan untuk memuji seseorang atau menegaskan satu-satunya pilihan yang ada dalam situasi penting.',
  examples: [
    { jp: 'この難局を乗り越えられるのは、山田さん<b>をおいて</b>ほかにいない。', id: 'Tidak ada orang lain selain Yamada-san yang bisa melewati situasi sulit ini.' },
    { jp: '今<b>をおいて</b>、行動するタイミングはない。', id: 'Tidak ada waktu yang lebih tepat untuk bertindak selain sekarang.' },
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00084', level: 'n1', pattern: '〜んばかりに / 〜んばかりの',
  reading: '〜n bakari ni / 〜n bakari no',
  meaning: 'hampir seperti ..., seolah-olah ..., sampai nyaris ...',
  cat: 'extent-degree',
  connection: 'V-nai-stem + んばかりに（修飾用: んばかりの + N）（する→せんばかりに）',
  desc: '<b>〜んばかりに</b> menyatakan bahwa sesuatu hampir terjadi atau terkesan sangat kuat seolah-olah akan terjadi, meski pada kenyataannya tidak terjadi. Digunakan untuk ekspresi yang hidup dan berlebihan — cocok untuk menggambarkan reaksi, ekspresi wajah, atau suasana yang sangat intens.',
  nuance: 'Berbeda dari 〜かのように (seolah-olah, lebih netral dan umum), 〜んばかりに mengandung intensitas yang lebih tinggi — menekankan bahwa sesuatu nyaris mencapai titik tertentu. Hanya digunakan dengan V-nai-stem (bukan benda atau adjektiva secara langsung). Bernuansa sastra dan lebih formal dari かのように.',
  examples: [
    { jp: '彼女は今にも泣き出さ<b>んばかりに</b>、目を潤ませていた。', id: 'Matanya berlinang seolah-olah sebentar lagi akan menangis.' },
    { jp: '子どもたちは飛び上がら<b>んばかりに</b>喜んで、プレゼントを受け取った。', id: 'Anak-anak menerima hadiah dengan gembira seolah-olah hampir melompat kegirangan.' },
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'literary', exceptions: null, notes: 'する→せんばかりに、来る→来んばかりに。否定の意味ではなく「今にも〜しそうな」の意。',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00086', level: 'n1', pattern: '〜だに',
  reading: '〜da ni',
  meaning: 'sekadar ... saja sudah ...; hanya dengan ... pun sudah (terasa, tidak bisa, dst)',
  cat: 'extent-degree',
  connection: 'V-dictionary / N + だに（〜ない / 感情表現）',
  desc: '<b>〜だに</b> adalah partikel arkaik/sastra yang menyatakan bahwa sekadar melakukan tindakan yang paling minimal pun sudah cukup memunculkan perasaan atau situasi tertentu. Umumnya muncul dalam frasa beku seperti 想像だにできない、考えるだに恐ろしい、夢にだに思わなかった.',
  nuance: 'Berbeda dari 〜さえ (bahkan, lebih umum dan dapat digunakan secara luas), 〜だに adalah bentuk yang sangat kuno dan hampir eksklusif sastra — tidak digunakan dalam percakapan modern. Kemunculannya pun terbatas pada kosakata tertentu. 〜さえ dapat menggantikan 〜だに di hampir semua konteks, tetapi tidak sebaliknya.',
  examples: [
    { jp: 'そんな失敗は、想像<b>だに</b>できなかった。', id: 'Kegagalan seperti itu bahkan tidak pernah terbayangkan sedikit pun.' },
    { jp: '戦場の惨状は、考える<b>だに</b>身の毛がよだつ。', id: 'Situasi mengerikan di medan perang itu, sekadar dibayangkan pun sudah membuat bulu kuduk berdiri.' },
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00087'],
  register: 'literary', exceptions: null, notes: '現代語では「さえ」で代替可。固定表現で登場することが多い：想像だにできない、夢にだに思わない、考えるだに〜。',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00087', level: 'n1', pattern: '〜すら（〜ない）',
  reading: '〜sura (〜nai)',
  meaning: 'bahkan ... pun (tidak); sekalipun ..., menunjukkan kasus ekstrem',
  cat: 'extent-degree',
  connection: 'N（+ 助詞省略）+ すら / N + にすら / V-stem + すら',
  desc: '<b>〜すら</b> menandai kasus yang paling ekstrem dalam suatu skala — menyiratkan bahwa jika hal yang paling dasar atau paling mudah ini pun (tidak) berlaku, maka hal yang lebih sulit tentu juga demikian. Sering diikuti bentuk negatif tetapi dapat juga positif.',
  nuance: 'Hampir sinonim dengan 〜さえ (lebih umum, bisa conversational), tetapi 〜すら lebih bernuansa sastra dan tertulis, serta lebih kuat dalam menekankan ekstremitas. 〜でさえ menggunakan partikel で sebelum さえ untuk nomina (バカでさえ = bahkan orang bodoh pun), sedangkan すら langsung menempel: バカすら。',
  examples: [
    { jp: '疲れ果てて、立つこと<b>すら</b>できなかった。', id: 'Terlalu lelah hingga bahkan berdiri pun sudah tidak bisa.' },
    { jp: '忙しすぎて、昼食をとる時間<b>すら</b>なかった。', id: 'Terlalu sibuk sampai bahkan tidak ada waktu untuk makan siang sekalipun.' },
  ],
  see_also_grammar: ['gn1-00088'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00088', 'gn1-00086'],
  register: 'written', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00088', level: 'n1', pattern: '〜でさえ',
  reading: '〜de sae',
  meaning: 'bahkan ... pun; menandai kasus ekstrem yang mengejutkan atau ironis',
  cat: 'extent-degree',
  connection: 'N + でさえ / N + さえ / V-te + さえ',
  desc: '<b>〜でさえ</b> menandai suatu entitas atau situasi sebagai kasus ekstrem — baik yang paling rendah maupun paling tinggi dalam skala — untuk mempertegas bahwa sesuatu berlaku bahkan pada kasus yang paling tidak terduga. Digunakan dalam pernyataan mengejutkan atau ironisasi.',
  nuance: '〜でさえ adalah bentuk N + で + さえ yang paling umum dan sedikit lebih percakapan dibanding 〜すら. Perbedaan halus: 〜でさえ sering memiliki nuansa ironis atau mengejutkan ("bahkan si A yang biasanya X pun..."), sementara 〜すら lebih ekspresif dan lebih sastra. Keduanya sering dapat saling menggantikan.',
  examples: [
    { jp: '専門家<b>でさえ</b>答えられない難問だ。', id: 'Ini adalah pertanyaan sulit yang bahkan para ahli pun tidak bisa menjawabnya.' },
    { jp: '子ども<b>でさえ</b>知っている常識を、大人が知らないとは驚きだ。', id: 'Sungguh mengherankan bahwa seorang dewasa tidak tahu pengetahuan umum yang bahkan anak kecil pun tahu.' },
  ],
  see_also_grammar: ['gn1-00087'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00087'],
  register: 'neutral', exceptions: null, notes: 'さえ単体でも使用可（N + さえ）。でさえはNに「で」格が自然な場合に使う（学生でさえ、プロでさえ）。',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00091', level: 'n1', pattern: '〜ことなしに',
  reading: '〜koto nashi ni',
  meaning: 'tanpa melakukan ...; tanpa ... (sebagai prasyarat yang mutlak diperlukan)',
  cat: 'negative',
  connection: 'V-dictionary + ことなしに',
  desc: '<b>〜ことなしに</b> menyatakan bahwa suatu hal dilakukan atau dicapai tanpa tindakan tertentu yang seharusnya dilakukan — atau sebaliknya, tanpa tindakan itu sesuatu tidak mungkin terjadi. Sering muncul dalam konteks akademik dan formal sebagai penegas logika kausal.',
  nuance: 'Lebih formal dari 〜ないで / 〜ずに. Berbeda dari 〜ことなく (tanpa sama sekali, menekankan tidak adanya tindakan itu secara penuh), 〜ことなしに lebih menekankan tindakan tersebut sebagai prasyarat yang krusial — "tanpa melakukan X, Y tidak mungkin." Nuansa kausal lebih kuat.',
  examples: [
    { jp: '土台を固める<b>ことなしに</b>、建物は長くもたない。', id: 'Tanpa memperkuat pondasi, bangunan tidak akan bertahan lama.' },
    { jp: '相手の立場を理解する<b>ことなしに</b>、真の対話は生まれない。', id: 'Tanpa memahami posisi pihak lain, dialog yang sesungguhnya tidak akan pernah terwujud.' },
  ],
  see_also_grammar: ['gn1-00104'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00104'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00096', level: 'n1', pattern: '〜に至っては',
  reading: '〜ni itte wa',
  meaning: 'bahkan sampai ..., yang lebih mengejutkan/ekstrem lagi adalah ...',
  cat: 'extent-degree',
  connection: 'N + に至っては',
  desc: '<b>〜に至っては</b> digunakan untuk menyebutkan kasus paling ekstrem dalam suatu kelompok — biasanya untuk mempertegas betapa buruk atau tidak terduganya kasus tersebut dibanding yang lain. Selalu muncul setelah menyebutkan situasi umum yang sudah bermasalah, lalu menyebut kasus yang jauh lebih parah.',
  nuance: 'Berbeda dari 〜に至るまで (yang mencakup rentang dari awal hingga ujung ekstrem — lebih netral), 〜に至っては menyoroti satu kasus yang mengejutkan atau sangat ekstrem. Selalu bernuansa negatif atau terkejut. Mirip fungsinya dengan 〜はおろか...さえ (apalagi/jangankan), tetapi lebih fokus pada satu kasus yang dipilih.',
  examples: [
    { jp: '多くの社員が遅刻しているが、部長<b>に至っては</b>無断欠勤だ。', id: 'Banyak karyawan yang terlambat, bahkan yang lebih parah lagi atasannya tidak masuk tanpa keterangan.' },
    { jp: '他の教科は及第点だったが、数学<b>に至っては</b>零点だった。', id: 'Mata pelajaran lain sudah cukup, tetapi matematika bahkan mendapat nilai nol.' },
  ],
  see_also_grammar: ['gn1-00097'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00097'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00097', level: 'n1', pattern: '〜に至るまで',
  reading: '〜ni itaru made',
  meaning: 'sampai pada ..., bahkan hingga ..., mencakup rentang dari ... hingga ...',
  cat: 'extent-degree',
  connection: 'N + に至るまで / 〜から〜に至るまで',
  desc: '<b>〜に至るまで</b> menyatakan rentang yang sangat luas atau mendalam — dari yang paling umum hingga yang paling rinci atau ekstrem. Sering digunakan berpasangan dengan から (〜から〜に至るまで) untuk menggambarkan cakupan yang menyeluruh.',
  nuance: 'Berbeda dari 〜に至っては (menyoroti satu kasus mengejutkan yang ekstrem), 〜に至るまで menggambarkan rentang cakupan yang menyeluruh dan komprehensif — dari titik A sampai titik B yang jauh. Lebih netral dan deskriptif. 〜まで saja lebih kasual; に至るまで menambah nuansa formal dan cakupan yang luas.',
  examples: [
    { jp: '日常の小さな习慣から重大な意思決定<b>に至るまで</b>、彼は常に慎重だ。', id: 'Mulai dari kebiasaan kecil sehari-hari hingga keputusan besar, dia selalu berhati-hati.' },
    { jp: '衣食住から趣味娯楽<b>に至るまで</b>、生活のあらゆる面に影響が及んだ。', id: 'Dampaknya menyentuh segala aspek kehidupan, dari sandang-pangan-papan hingga hobi dan hiburan.' },
  ],
  see_also_grammar: ['gn1-00096'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00096'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00104', level: 'n1', pattern: '〜ことなく',
  reading: '〜koto naku',
  meaning: 'tanpa ... sama sekali, tidak pernah ...; dengan tidak melakukan ... sekalipun',
  cat: 'negative',
  connection: 'V-dictionary + ことなく',
  desc: '<b>〜ことなく</b> menyatakan bahwa suatu tindakan benar-benar tidak terjadi — tidak sekalipun, tidak pernah. Menekankan ketiadaan tindakan tersebut secara menyeluruh sepanjang periode tertentu. Digunakan untuk memuji ketekunan atau menggambarkan keadaan yang konsisten.',
  nuance: 'Berbeda dari 〜ことなしに (tanpa X sebagai prasyarat — lebih kausal: "tanpa X, Y tidak mungkin"), 〜ことなく lebih menekankan ketiadaan tindakan itu sendiri secara konsisten sepanjang waktu. 〜ないで lebih kasual dan umum; 〜ことなく lebih formal dan bermakna "tak sekalipun."',
  examples: [
    { jp: '彼は一度も諦める<b>ことなく</b>、10年間挑戦し続けた。', id: 'Tanpa sekali pun menyerah, dia terus berjuang selama sepuluh tahun.' },
    { jp: '誰にも頼る<b>ことなく</b>、彼女は独力で問題を解決した。', id: 'Tanpa mengandalkan siapa pun, dia menyelesaikan masalah itu dengan kekuatan sendiri.' },
  ],
  see_also_grammar: ['gn1-00091'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00091'],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00109', level: 'n1', pattern: '〜ごとく / 〜ごとき',
  reading: '〜gotoku / 〜gotoki',
  meaning: 'seperti ..., laksana ..., bagaikan ... (perbandingan bergaya klasik/sastra)',
  cat: 'comparison',
  connection: 'V-dictionary / N + の + ごとく（副詞的）/ ごとき + N（形容詞的） / ごとし（文末）',
  desc: '<b>〜ごとく</b> adalah ekspresi perbandingan kuno dan sastra — setara dengan 〜のように dalam penggunaan modern. ごとく berfungsi adverbial (memodifikasi verba), ごとき berfungsi adjectival (memodifikasi nomina dan sering bernuansa merendah diri atau meremehkan), ごとし digunakan di akhir kalimat.',
  nuance: 'Bernuansa sangat klasik — hampir hanya muncul dalam sastra, puisi, peribahasa, dan dokumen sejarah. ごとき juga sering digunakan dalam merendahkan diri: 私ごとき者 = "seseorang rendahan seperti saya." Jangan digunakan dalam percakapan atau tulisan modern biasa — kecuali untuk efek sastra yang disengaja.',
  examples: [
    { jp: '流れる水の<b>ごとく</b>、時は静かに、しかし確実に過ぎ去っていく。', id: 'Bagai air yang mengalir, waktu berlalu dengan tenang namun pasti.' },
    { jp: '私<b>ごとき</b>者には、身に余るお言葉をいただき、恐縮でございます。', id: 'Kata-kata yang begitu mulia terlalu berlebihan untuk seseorang seperti saya yang tidak berarti ini.' },
  ],
  see_also_grammar: [],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'literary', exceptions: null, notes: '現代語の「〜のように」に対応。ごとく（副詞）・ごとき（連体）・ごとし（終止）の使い分けに注意。ごとき は自己卑下にも使う。',
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00127', level: 'n1', pattern: '〜に足りない',
  reading: '〜ni tarinai',
  meaning: 'tidak layak untuk ..., tidak cukup untuk ..., tidak memenuhi standar ...',
  cat: 'negative',
  connection: 'V-dictionary + に足りない',
  desc: '<b>〜に足りない</b> adalah bentuk negatif dari 〜に足る. Menyatakan bahwa sesuatu atau seseorang tidak memenuhi standar atau kualifikasi yang diperlukan untuk tujuan tertentu. Sering digunakan untuk menolak atau meremehkan sesuatu dengan nada formal.',
  nuance: 'Karena merupakan kebalikan langsung dari 〜に足る, keduanya sering berpasangan dalam konteks evaluasi. 〜に足りない tidak sekedar menyatakan ketidakcukupan biasa, tetapi mengandung nuansa penilaian yang lebih tegas bahwa standar benar-benar tidak terpenuhi.',
  examples: [
    { jp: 'その程度の努力では、合格するに足りない。', id: 'Dengan usaha sekecil itu, tidak cukup untuk lulus.' },
    { jp: '彼の実績は、リーダーを任せるに足りないと上司は判断した。', id: 'Atasannya menilai rekam jejaknya tidak cukup layak untuk dipercaya menjadi pemimpin.' }
  ],
  see_also_grammar: ['gn1-00126', 'gn1-00128'],
  see_also_vocab: [],
  confusion_pairs: [],
  register: 'formal', exceptions: null, notes: null,
  provenance: 'jlpt-corpus', added_v: 'v15'
},

{
  id: 'gn1-00154',
  level: 'n1',
  pattern: '〜にすぎない',
  reading: '〜ni suginai',
  meaning: 'hanya ..., tidak lebih dari ..., sekadar ...',
  cat: 'extent-degree',
  connection: 'V-plain / N + にすぎない',
  desc: '<b>〜にすぎない</b> menyatakan bahwa sesuatu tidak melebihi batas tertentu — hanya sebatas itu, tidak lebih. Mengandung nuansa bahwa hal tersebut dianggap kurang signifikan, terlalu kecil, atau tidak perlu dibesar-besarkan.',
  nuance: 'Kebalikan nuansa dari 〜にほかならない (gn1-00153): sementara 〜にほかならない menegaskan identitas ("tidak lain adalah"), 〜にすぎない membatasi dan meremehkan ("hanya sebatas"). Berbeda dari 〜にとどまる (gn1-00156) yang lebih netral, 〜にすぎない biasanya mengandung penilaian bahwa sesuatu tidak mencukupi atau tidak berarti.',
  examples: [
    { jp: 'それは単なる偶然<b>にすぎない</b>。', id: 'Itu tidak lebih dari sebuah kebetulan belaka.' },
    { jp: '私はただの会社員<b>にすぎない</b>。', id: 'Saya hanyalah seorang karyawan biasa.' },
    { jp: '今回の改善は表面的なもの<b>にすぎない</b>。', id: 'Perbaikan kali ini tidak lebih dari sekadar perubahan permukaan.' },
  ],
  see_also_grammar: ['gn1-00153', 'gn1-00155', 'gn1-00156'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00153', 'gn1-00156'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00155',
  level: 'n1',
  pattern: '〜にとどまらない',
  reading: '〜ni todomaranai',
  meaning: 'tidak hanya ..., melampaui ..., lebih dari sekadar ...',
  cat: 'extent-degree',
  connection: 'N + にとどまらない',
  desc: '<b>〜にとどまらない</b> menyatakan bahwa dampak, cakupan, atau relevansi sesuatu tidak terbatas hanya pada hal yang disebutkan, melainkan meluas lebih jauh. Sering digunakan untuk menekankan bahwa suatu pengaruh atau masalah bersifat lebih luas dari yang dibayangkan.',
  nuance: 'Ini adalah bentuk negatif dari 〜にとどまる (gn1-00156). Sementara 〜にとどまる menyatakan keterbatasan (hanya sebatas), 〜にとどまらない menyatakan melampaui keterbatasan tersebut. Berbeda dari 〜だけでなく yang lebih informal, 〜にとどまらない lebih formal dan menekankan perluasan yang signifikan.',
  examples: [
    { jp: '問題は国内<b>にとどまらない</b>、国際的な課題だ。', id: 'Masalah ini tidak hanya terbatas di dalam negeri, melainkan merupakan isu internasional.' },
    { jp: '彼女の影響は音楽<b>にとどまらず</b>、映画や文化にも及んだ。', id: 'Pengaruhnya tidak hanya di bidang musik, melainkan merambah ke film dan budaya juga.' },
    { jp: '被害は一部地域<b>にとどまらない</b>広がりを見せた。', id: 'Kerugian menunjukkan penyebaran yang tidak terbatas hanya pada sebagian wilayah.' },
  ],
  see_also_grammar: ['gn1-00156', 'gn1-00154'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00156'],
  register: 'formal',
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00156',
  level: 'n1',
  pattern: '〜にとどまる',
  reading: '〜ni todomaru',
  meaning: 'sebatas ..., hanya sampai pada ..., terbatas pada ...',
  cat: 'extent-degree',
  connection: 'N + にとどまる',
  desc: '<b>〜にとどまる</b> menyatakan bahwa sesuatu tidak melebihi atau tidak berkembang melampaui batas yang disebutkan. Digunakan untuk menyatakan bahwa dampak, pertumbuhan, atau pencapaian terbatas pada tingkat tertentu — dan tidak lebih.',
  nuance: 'Berbeda dari 〜にすぎない (gn1-00154) yang mengandung nuansa meremehkan ("hanya sebatas dan itu tidak signifikan"), 〜にとどまる lebih netral — sekadar menyatakan batas tanpa penilaian negatif eksplisit. Bentuk negatifnya 〜にとどまらない (gn1-00155) menyatakan bahwa sesuatu melampaui batas tersebut.',
  examples: [
    { jp: '今期の成長率は2%<b>にとどまった</b>。', id: 'Tingkat pertumbuhan periode ini hanya sebatas 2%.' },
    { jp: '被害は軽傷<b>にとどまり</b>、死者は出なかった。', id: 'Kerugian terbatas pada luka ringan, dan tidak ada korban jiwa.' },
    { jp: '参加者は予想の半数<b>にとどまった</b>。', id: 'Jumlah peserta hanya sampai pada setengah dari perkiraan.' },
  ],
  see_also_grammar: ['gn1-00155', 'gn1-00154'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00154', 'gn1-00155'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00157',
  level: 'n1',
  pattern: '〜にわたる',
  reading: '〜ni wataru',
  meaning: 'mencakup ..., melintasi ... (rentang waktu atau wilayah)',
  cat: 'extent-degree',
  connection: 'N + にわたる + N',
  desc: '<b>〜にわたる</b> digunakan sebagai kata sifat untuk menerangkan nomina berikutnya, menyatakan bahwa sesuatu mencakup atau melintasi rentang waktu, wilayah, atau bidang tertentu. Berbeda dari 〜にわたって, bentuk ini memodifikasi nomina secara langsung.',
  nuance: 'Berbeda dari 〜にわたって (gn1-00158) yang berfungsi sebagai adverbial (menerangkan verba), 〜にわたる berfungsi sebagai predikatif yang menerangkan nomina. Contoh: 「三日にわたる交渉」(perundingan yang berlangsung tiga hari) vs 「三日にわたって交渉した」(berunding selama tiga hari). Berbeda dari 〜にまたがる (gn1-00159) yang menekankan melintasi batas yang berbeda-beda.',
  examples: [
    { jp: '二週間<b>にわたる</b>調査が終了した。', id: 'Investigasi yang mencakup dua minggu telah selesai.' },
    { jp: '広い範囲<b>にわたる</b>被害が報告された。', id: 'Dilaporkan kerusakan yang mencakup area yang luas.' },
    { jp: '長年<b>にわたる</b>研究の成果がついに発表された。', id: 'Hasil penelitian yang berlangsung bertahun-tahun akhirnya dipublikasikan.' },
  ],
  see_also_grammar: ['gn1-00158', 'gn1-00159'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00158', 'gn1-00159'],
  register: null,
  exceptions: null,
  notes: 'Berfungsi sebagai prenominal modifier (menerangkan nomina). Untuk fungsi adverbial gunakan 〜にわたって (gn1-00158).',
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00158',
  level: 'n1',
  pattern: '〜にわたって',
  reading: '〜ni watatte',
  meaning: 'selama ..., sepanjang ..., dalam rentang ... (adverbial)',
  cat: 'extent-degree',
  connection: 'N + にわたって',
  desc: '<b>〜にわたって</b> berfungsi sebagai adverbial untuk menerangkan verba, menyatakan bahwa suatu tindakan atau kondisi berlangsung sepanjang atau mencakup seluruh rentang yang disebutkan (waktu, ruang, atau bidang).',
  nuance: 'Perbedaan utama dengan 〜にわたる (gn1-00157) adalah fungsi sintaktisnya: 〜にわたって menerangkan verba, sementara 〜にわたる menerangkan nomina. Keduanya menggunakan kata dasar yang sama (わたる). Berbeda dari 〜にまたがって (dari 〜にまたがる, gn1-00159) yang menekankan "melintasi batas-batas yang berbeda", 〜にわたって lebih berfokus pada cakupan yang menyeluruh.',
  examples: [
    { jp: '三ヶ月<b>にわたって</b>交渉が続いた。', id: 'Perundingan berlanjut selama tiga bulan.' },
    { jp: '全国<b>にわたって</b>調査が実施された。', id: 'Survei dilaksanakan di seluruh penjuru negeri.' },
    { jp: '幅広い分野<b>にわたって</b>業績を残した。', id: 'Ia meninggalkan pencapaian di berbagai bidang yang luas.' },
  ],
  see_also_grammar: ['gn1-00157', 'gn1-00159'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00157', 'gn1-00159'],
  register: null,
  exceptions: null,
  notes: 'Berfungsi sebagai adverbial (menerangkan verba). Untuk fungsi prenominal gunakan 〜にわたる (gn1-00157).',
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00159',
  level: 'n1',
  pattern: '〜にまたがる',
  reading: '〜ni matagaru',
  meaning: 'melintasi batas ..., mencakup beberapa ... yang berbeda',
  cat: 'extent-degree',
  connection: 'N + にまたがる',
  desc: '<b>〜にまたがる</b> menyatakan bahwa sesuatu melintasi atau mencakup beberapa wilayah, bidang, atau kategori yang secara inheren berbeda dan terpisah. Menekankan aspek "melintasi batas" antara entitas yang berbeda-beda.',
  nuance: 'Perbedaan kunci dengan 〜にわたる (gn1-00157) dan 〜にわたって (gn1-00158) adalah nuansa "batas yang berbeda": 〜にまたがる digunakan ketika yang dicakup adalah beberapa entitas yang distinct (misalnya beberapa prefektur, beberapa disiplin ilmu), sementara 〜にわたる lebih berfokus pada rentang kontinu (misalnya 3 hari, jarak jauh). Secara harfiah, またがる berarti "menunggangi / mengangkang".',
  examples: [
    { jp: 'この事件は複数の県<b>にまたがる</b>広域捜査となった。', id: 'Kasus ini menjadi penyelidikan lintas wilayah yang mencakup beberapa prefektur.' },
    { jp: '彼の研究は工学と医学<b>にまたがる</b>分野だ。', id: 'Penelitiannya mencakup bidang yang melintasi teknik dan kedokteran.' },
    { jp: '両国<b>にまたがる</b>プロジェクトは慎重な調整が必要だ。', id: 'Proyek yang melintasi dua negara memerlukan koordinasi yang cermat.' },
  ],
  see_also_grammar: ['gn1-00157', 'gn1-00158'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00157', 'gn1-00158'],
  register: null,
  exceptions: null,
  notes: 'Menekankan "batas antara entitas berbeda". Untuk rentang kontinu (waktu/ruang), 〜にわたる lebih tepat.',
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00172',
  level: 'n1',
  pattern: '〜ないことはない',
  reading: '〜nai koto wa nai',
  meaning: 'bukan tidak bisa ..., bisa saja, tapi ... (negatif ganda yang ragu-ragu)',
  cat: 'negative',
  connection: 'V-negative plain + ことはない',
  desc: '<b>〜ないことはない</b> adalah konstruksi negatif ganda yang menyatakan bahwa sesuatu bukan sepenuhnya mustahil atau tidak bisa dilakukan, namun ada keengganan, syarat, atau kendala tertentu. Secara logis berarti "ada kemungkinan", tapi nuansanya lebih ke "bisa, tapi tidak sepenuhnya bersemangat".',
  nuance: 'Berbeda dari 〜ないことには (gn1-00171) yang menyatakan syarat, 〜ないことはない menyatakan pengakuan setengah hati bahwa sesuatu mungkin dilakukan. Lebih lemah dari pernyataan positif langsung — pembicara mengakui kemungkinan sambil menyiratkan keengganan atau kondisi tertentu. Dibandingkan 〜なくもない (gn1-00174), keduanya sangat mirip; 〜ないことはない sedikit lebih umum dan dapat digunakan lebih luas.',
  examples: [
    { jp: '行け<b>ないことはない</b>けど、あまり気が進まない。', id: 'Bukan tidak bisa pergi, tapi tidak terlalu bersemangat.' },
    { jp: 'でき<b>ないことはない</b>が、かなり時間がかかる。', id: 'Bukan tidak bisa dilakukan, tapi butuh waktu cukup lama.' },
    { jp: '理解でき<b>ないことはない</b>が、賛成はできない。', id: 'Bukan tidak bisa memahami, tapi tidak bisa setuju.' },
  ],
  see_also_grammar: ['gn1-00173', 'gn1-00174'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00173', 'gn1-00174', 'gn1-00171'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00173',
  level: 'n1',
  pattern: '〜ないものでもない',
  reading: '〜nai mono demo nai',
  meaning: 'bukan tidak mungkin ..., ada kemungkinan ... (sangat hati-hati dan tidak langsung)',
  cat: 'negative',
  connection: 'V-negative plain + ものでもない',
  desc: '<b>〜ないものでもない</b> adalah ungkapan negatif ganda yang sangat hati-hati dan tidak langsung. Secara logis menyatakan "tidak sepenuhnya tidak ada", yang berarti ada kemungkinan kecil atau keinginan yang tidak diungkapkan secara langsung. Sering digunakan saat pembicara tidak ingin berkomitmen secara jelas.',
  nuance: 'Lebih samar dan tidak langsung dibanding 〜ないことはない (gn1-00172). Sementara 〜ないことはない relatif lebih tegas ("bisa, tapi..."), 〜ないものでもない mengimplikasikan kemungkinan yang bahkan lebih kecil atau lebih ragu-ragu. Sering digunakan saat pembicara secara halus mengakui keinginan atau kemungkinan yang ia malu untuk akui secara langsung.',
  examples: [
    { jp: '少し手伝わ<b>ないものでもない</b>が、条件がある。', id: 'Bukan tidak mungkin saya bantu sedikit, tapi ada syaratnya.' },
    { jp: '興味が<b>ないものでもない</b>が、まだ迷っている。', id: 'Bukan tidak ada minat, tapi saya masih ragu-ragu.' },
    { jp: '彼の提案を考慮し<b>ないものでもない</b>。', id: 'Bukan tidak mungkin saya mempertimbangkan proposalnya.' },
  ],
  see_also_grammar: ['gn1-00172', 'gn1-00174', 'gn1-00175'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00172', 'gn1-00174'],
  register: null,
  exceptions: null,
  notes: 'Lebih samar dan tidak langsung dibanding 〜ないことはない. Cocok saat pembicara enggan berkomitmen secara eksplisit.',
  provenance: 'jlpt-corpus',
  added_v: 'v15',
},

{
  id: 'gn1-00174',
  level: 'n1',
  pattern: '〜なくもない',
  reading: '〜naku mo nai',
  meaning: 'tidak sepenuhnya tidak ..., ada sedikit ..., bukan tak ada sama sekali',
  cat: 'negative',
  connection: 'V-stem (なく form) + もない',
  desc: '<b>〜なくもない</b> adalah negatif ganda yang menyatakan bahwa sesuatu tidak sepenuhnya absen atau tidak ada — ada sedikit, meski tidak banyak. Sering digunakan untuk mengakui perasaan, keinginan, atau kemungkinan dengan cara yang merendah atau tidak terlalu tegas.',
  nuance: 'Sangat mirip dengan 〜ないことはない (gn1-00172) — keduanya menyatakan kemungkinan dengan pengakuan yang ragu-ragu. 〜なくもない cenderung lebih pendek dan lebih kasual, sering digunakan untuk perasaan (わからなくもない, 共感できなくもない). Berbeda dari 〜ないものでもない (gn1-00173) yang lebih samar, 〜なくもない sedikit lebih tegas dalam mengakui keberadaan sesuatu.',
  examples: [
    { jp: '彼の気持ちはわから<b>なくもない</b>。', id: 'Bukan tidak mengerti perasaannya sama sekali.' },
    { jp: '少し不満が<b>なくもない</b>が、我慢することにした。', id: 'Bukan tidak ada rasa tidak puas sedikit, tapi saya memutuskan untuk bersabar.' },
    { jp: '行ってみたい気持ちが<b>なくもない</b>が、お金がない。', id: 'Bukan tak ada keinginan untuk pergi, tapi tidak ada uang.' },
  ],
  see_also_grammar: ['gn1-00172', 'gn1-00173'],
  see_also_vocab: [],
  confusion_pairs: ['gn1-00172', 'gn1-00173', 'gn1-00175'],
  register: null,
  exceptions: null,
  notes: null,
  provenance: 'jlpt-corpus',
  added_v: 'v15',
}

];
