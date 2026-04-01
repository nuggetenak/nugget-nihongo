// DATA — N3 第2週 (Soumatome N3 Bunpou)
// 22 pola grammar · Week 2 · がんばってごらん！

const N3_W2 = [

// ── 第2週 1日目 ── Penekanan & Pembatasan
{
  id: 'n3-w2d1-01',
  level: 'n3',
  week: 2,
  day: 1,
  cat: 'penekanan',
  grammar: '〜ばかり',
  reading: '〜bakari',
  meaning: 'Hanya ~/terus ~ saja (tidak ada yang lain)',
  connection: 'N / Vて + ばかり（だ／のN／で／いる）',
  desc: 'Menyatakan bahwa sesuatu hanya terdiri dari satu hal saja, atau seseorang terus-menerus melakukan satu hal. Bentuk <b>Vてばかりいる</b> menunjukkan kebiasaan buruk yang dilakukan terus-terusan.',
  nuance: 'Sering mengandung nuansa negatif atau kritik ringan ketika dipakai dengan Vてばかりいる. Berbeda dengan だけ (netral), ばかり lebih ekspresif.',
  examples: [
    { jp: 'この店のお客さんは、<b>女性ばかり</b>ですね。', id: 'Pelanggan toko ini hanya perempuan saja, ya.' },
    { jp: '弟は、テレビを<b>見てばかり</b>いる。', id: 'Adikku terus-terusan cuma nonton TV.' },
    { jp: '息子は仕事もしないで<b>遊んでばかり</b>いる。', id: 'Anakku tidak bekerja, kerjanya cuma main terus.' },
  ]
},
{
  id: 'n3-w2d1-02',
  level: 'n3',
  week: 2,
  day: 1,
  cat: 'penekanan',
  grammar: '〜だけしか〜ない',
  reading: '〜dake shika〜nai',
  meaning: 'Hanya ~ saja (dan tidak ada yang lain)',
  connection: 'N + だけしか + V（ない形）',
  desc: 'Menekankan bahwa hanya itu satu-satunya yang ada, dengan cara menggabungkan <b>だけ</b> (hanya) dan <b>しか〜ない</b>. Kalimatnya selalu diakhiri dengan bentuk negatif.',
  nuance: '<b>だけ</b> vs <b>しか〜ない</b>: keduanya berarti "hanya", tapi しか〜ない lebih menekankan keterbatasan. Kombinasi <b>だけしか</b> = penekanan ganda, terasa lebih kuat.',
  examples: [
    { jp: 'このコンサートは、<b>会員だけしか</b>入れません。', id: 'Konser ini hanya bisa dimasuki oleh anggota saja.' },
    { jp: '今日はお客様が<b>一人だけしか</b>来ませんでした。', id: 'Hari ini hanya ada satu pelanggan yang datang.' },
    { jp: '社長だけしかいない。', id: 'Yang ada hanya direkturnya saja.' },
  ]
},
{
  id: 'n3-w2d1-03',
  level: 'n3',
  week: 2,
  day: 1,
  cat: 'penekanan',
  grammar: '〜さえ',
  reading: '〜sae',
  meaning: 'Bahkan ~ pun (menunjukkan hal yang paling ekstrem)',
  connection: 'N / Nに / Nで + さえ',
  desc: 'Menyatakan hal yang paling ekstrem sebagai contoh — jika hal tersebut saja bisa/tidak bisa, maka hal lain yang lebih mudah/sulit tentu juga. Digunakan untuk membuat pernyataan yang lebih dramatis.',
  nuance: 'Setara dengan も dalam nuansa "even ~", tapi さえ lebih menekankan keekstreman. Sering dipakai saat menyebut sesuatu yang seharusnya mudah tapi ternyata tidak.',
  examples: [
    { jp: '<b>ひらがなさえ</b>書けないんですから、漢字なんて書けません。', id: 'Hiragana saja tidak bisa kutulis, apalagi kanji.' },
    { jp: 'そんなこと、<b>子どもでさえ</b>知っている。', id: 'Hal seperti itu, bahkan anak kecil pun tahu.' },
    { jp: '忙しくて、昼ごはんを食べる時間<b>さえ</b>ない。', id: 'Sibuk sekali sampai waktu makan siang pun tidak ada.' },
  ]
},
{
  id: 'n3-w2d1-04',
  level: 'n3',
  week: 2,
  day: 1,
  cat: 'penekanan',
  grammar: '〜こそ',
  reading: '〜koso',
  meaning: 'Justru ~lah, memang ~lah (penekanan kuat)',
  connection: 'N + こそ ／ 〜から（理由）こそ',
  desc: 'Memberikan penekanan kuat pada kata atau alasan yang disebutkan. <b>Nこそ</b> = "justru N inilah", <b>〜からこそ</b> = "justru karena itulah". Menegaskan bahwa hal tersebut adalah yang paling penting atau tepat.',
  nuance: 'Sering digunakan dalam konteks serius atau emosional. 「こちらこそ」(sayalah yang seharusnya...) adalah ungkapan sopan yang sangat umum.',
  examples: [
    { jp: '<b>明日こそ</b>勉強するぞ！', id: 'Justru besok pasti akan belajar!' },
    { jp: '愛情が<b>あるからこそ</b>、しかるんです。', id: 'Justru karena ada rasa sayang, makanya menegur.' },
    { jp: 'こちら<b>こそ</b>、よろしくお願いします。', id: 'Sayalah yang mohon bimbingannya.' },
  ]
},

// ── 第2週 2日目 ── Referensi & Sumber Informasi
{
  id: 'n3-w2d2-01',
  level: 'n3',
  week: 2,
  day: 2,
  cat: 'referensi',
  grammar: '〜に関して',
  reading: '〜ni kanshite',
  meaning: 'Mengenai ~, berkaitan dengan ~',
  connection: 'N（に） / ［文］のに + 関して／関しては／関しても／関するN',
  desc: 'Menyatakan topik atau objek yang dibicarakan/dibahas. Lebih formal dari について dan sering dipakai dalam tulisan, berita, atau diskusi resmi. <b>関するN</b> digunakan sebelum kata benda.',
  nuance: 'に関して ≈ について, tapi に関して lebih formal dan akademis. Dipakai dalam artikel, laporan, dan situasi profesional.',
  examples: [
    { jp: 'この問題<b>に関して</b>、ご意見ありませんか。', id: 'Mengenai masalah ini, apakah Anda ada pendapat?' },
    { jp: '農業<b>に関する</b>論文を読む。', id: 'Membaca makalah yang berkaitan dengan pertanian.' },
    { jp: '環境<b>に関して</b>は、もっと勉強が必要だ。', id: 'Mengenai lingkungan hidup, masih perlu belajar lebih banyak.' },
  ]
},
{
  id: 'n3-w2d2-02',
  level: 'n3',
  week: 2,
  day: 2,
  cat: 'referensi',
  grammar: '〜について',
  reading: '〜ni tsuite',
  meaning: 'Tentang ~, mengenai ~',
  connection: 'N + について／についての N／については／についても',
  desc: 'Menyatakan topik yang dibicarakan atau dipelajari. Digunakan sangat luas dalam percakapan maupun tulisan. <b>についてのN</b> = kata benda yang menjelaskan tentang N.',
  nuance: 'について lebih umum dan netral dibanding に関して. Bisa dipakai dalam situasi formal maupun kasual. 「日本語について話す」= bicara tentang bahasa Jepang.',
  examples: [
    { jp: '日本文化<b>について</b>勉強する。', id: 'Belajar tentang budaya Jepang.' },
    { jp: '「受験<b>についての</b>注意」を読む。', id: 'Membaca "Catatan tentang Ujian Masuk".' },
    { jp: '彼女<b>について</b>は、あまり知らない。', id: 'Tentang dia, aku tidak terlalu tahu.' },
  ]
},
{
  id: 'n3-w2d2-03',
  level: 'n3',
  week: 2,
  day: 2,
  cat: 'referensi',
  grammar: '〜によれば／によると',
  reading: '〜ni yoreba / ni yoru to',
  meaning: 'Menurut ~ (menyebutkan sumber informasi)',
  connection: 'N + によれば／によると',
  desc: 'Menyebutkan sumber dari informasi yang disampaikan — berita, laporan, seseorang, dll. Pembicara meneruskan informasi dari sumber lain, bukan pengalaman langsung. Umumnya diakhiri dengan らしい／そうだ／という.',
  nuance: 'によれば dan によると maknanya hampir sama. によれば sedikit lebih formal. Berbeda dengan によって yang menyatakan cara/sebab.',
  examples: [
    { jp: '天気予報<b>によれば</b>、明日は晴れるらしい。', id: 'Menurut prakiraan cuaca, besok sepertinya cerah.' },
    { jp: 'さっきの地震はテレビの速報<b>によると</b>震度3だそうだ。', id: 'Menurut berita kilat TV, gempa tadi berkekuatan 3.' },
    { jp: '田中さんの話<b>によれば</b>、その店はもう閉まったそうだ。', id: 'Menurut cerita Tanaka-san, toko itu katanya sudah tutup.' },
  ]
},
{
  id: 'n3-w2d2-04',
  level: 'n3',
  week: 2,
  day: 2,
  cat: 'referensi',
  grammar: '〜によって',
  reading: '〜ni yotte',
  meaning: 'Melalui ~, karena ~, tergantung ~ (cara/sebab/situasi)',
  connection: 'N + によって／によっては／より／よるN',
  desc: 'Memiliki tiga fungsi utama: <b>①手段</b> (cara/melalui), <b>②原因</b> (sebab/akibat dari), <b>③場合</b> (tergantung situasi). Konteks kalimat menentukan fungsi mana yang dipakai.',
  nuance: '① 努力によって成功した (berhasil melalui usaha keras) ② 台風によって屋根が飛んだ (atap terbang karena topan) ③ 人によって考え方が違う (cara berpikir berbeda tergantung orangnya)',
  examples: [
    { jp: '彼は努力<b>によって</b>病気を克服した。', id: 'Dia berhasil mengalahkan penyakit melalui kerja kerasnya.' },
    { jp: '人<b>によって</b>考え方が違います。', id: 'Cara berpikir berbeda-beda tergantung orangnya.' },
    { jp: '台風<b>によって</b>屋根が飛ばされた。', id: 'Atap terbang tersapu topan.' },
  ]
},

// ── 第2週 3日目 ── Nominalisasi
{
  id: 'n3-w2d3-01',
  level: 'n3',
  week: 2,
  day: 3,
  cat: 'nominalisasi',
  grammar: '〜さ',
  reading: '〜sa',
  meaning: 'Membentuk kata benda dari adjektif (derajat/sifat)',
  connection: 'A（い→さ）／naさ',
  desc: 'Mengubah adjektif menjadi kata benda yang menyatakan <b>sifat atau derajat</b> dari sesuatu. Cocok dipakai saat ingin membicarakan kualitas/tingkat sesuatu sebagai objek. い→さ, na→さ.',
  nuance: '大きい→大きさ (ukuran), 重い→重さ (berat), 暑い→暑さ (panas), 静か→静かさ (ketenangan). Berbeda dengan み: さ lebih cocok untuk hal yang terukur.',
  examples: [
    { jp: '大き<b>さ</b>は違うが、君と同じかばんを持っているよ。', id: 'Ukurannya berbeda, tapi aku punya tas yang sama denganmu.' },
    { jp: '子どもに命の大切<b>さ</b>を教えなければならない。', id: 'Harus mengajarkan kepada anak betapa berharganya nyawa.' },
    { jp: 'この部屋の広<b>さ</b>はどのくらいですか。', id: 'Berapa kira-kira luas ruangan ini?' },
  ]
},
{
  id: 'n3-w2d3-02',
  level: 'n3',
  week: 2,
  day: 3,
  cat: 'nominalisasi',
  grammar: '〜み',
  reading: '〜mi',
  meaning: 'Membentuk kata benda dari adjektif (kondisi/rasa/keadaan)',
  connection: 'A（い→み）／naみ',
  desc: 'Mengubah adjektif menjadi kata benda yang menyatakan <b>kondisi, rasa, atau keadaan</b> yang sudah menjadi bagian dari sesuatu. Lebih subjektif dan berkesan dari さ. Tidak semua adjektif bisa pakai み.',
  nuance: '悲しみ (kesedihan), 弱み (kelemahan), 痛み (rasa sakit), 強み (kekuatan). ⚠️ 大きみ、うれしみ、暑み → SALAH. み hanya untuk kata yang sudah menjadi "idiom".',
  examples: [
    { jp: '戦争が終わった今でも、この国の<b>苦しみ</b>はまだ続いている。', id: 'Bahkan setelah perang berakhir, penderitaan negara ini masih berlanjut.' },
    { jp: '田中さんの<b>強み</b>は、２ヵ国語が話せるということです。', id: 'Kekuatan Tanaka-san adalah bisa berbicara dalam 2 bahasa.' },
    { jp: 'この映画には<b>悲しみ</b>があふれている。', id: 'Film ini penuh dengan kesedihan.' },
  ]
},
{
  id: 'n3-w2d3-03',
  level: 'n3',
  week: 2,
  day: 3,
  cat: 'nominalisasi',
  grammar: '〜のこと',
  reading: '〜no koto',
  meaning: 'Hal tentang ~, mengenai ~',
  connection: 'N の / V・A・na・N 普通形 + のこと',
  desc: 'Menjadikan klausa atau kata benda sebagai topik pembicaraan dengan nuansa "hal mengenai ~". Sering dipakai saat ingin membicarakan seseorang atau sesuatu secara lebih mendalam atau personal.',
  nuance: '「テストのこと」= hal tentang tes / urusan tes. Berbeda dengan について yang lebih akademis, のこと lebih personal dan kasual. 「あなたのことが好き」= aku suka (pada) kamu.',
  examples: [
    { jp: '来週のテスト<b>のこと</b>で、質問があります。', id: 'Ada pertanyaan mengenai tes minggu depan.' },
    { jp: '田中さんが入院した<b>こと</b>を知っていますか。', id: 'Apakah kamu tahu bahwa Tanaka-san dirawat di rumah sakit?' },
    { jp: '毎日、あなた<b>のこと</b>を思っている。', id: 'Setiap hari aku memikirkan dirimu.' },
  ]
},
{
  id: 'n3-w2d3-04',
  level: 'n3',
  week: 2,
  day: 3,
  cat: 'nominalisasi',
  grammar: '〜のを',
  reading: '〜no wo',
  meaning: 'Nominalisasi klausa sebagai objek',
  connection: 'V・A・na・N 普通形 + の + を（忘れた／楽しむ／嫌がる…）',
  desc: 'Mengubah klausa (kalimat) menjadi kata benda yang berfungsi sebagai objek kalimat. の di sini berfungsi sebagai penanda nominalisasi (mengubah kalimat menjadi "hal" atau "kejadian").',
  nuance: 'Sama fungsi dengan こと sebagai nominalizer, tapi の lebih sering untuk tindakan konkret/fisik yang bisa diamati langsung. こと lebih abstrak/konseptual.',
  examples: [
    { jp: '田中さんに電話する<b>のを</b>すっかり忘れていました。', id: 'Aku benar-benar lupa menelepon Tanaka-san.' },
    { jp: '日曜日に混んだところへ行く<b>のは</b>、あまり好きではありません。', id: 'Aku kurang suka pergi ke tempat ramai di hari Minggu.' },
    { jp: '子どもが遊んでいる<b>のを</b>見るのが好きだ。', id: 'Aku suka melihat anak-anak bermain.' },
  ]
},

// ── 第2週 4日目 ── Definisi & Kutipan
{
  id: 'n3-w2d4-01',
  level: 'n3',
  week: 2,
  day: 4,
  cat: 'definisi',
  grammar: '〜というN',
  reading: '〜to iu N',
  meaning: 'N yang bernama ~/yang disebut ~ (mendefinisikan nama)',
  connection: 'N + というN\'／というもの／といった',
  desc: 'Mengidentifikasi atau memperkenalkan sesuatu berdasarkan namanya. <b>〜という人</b> = orang yang bernama~, <b>〜というもの</b> = benda yang namanya~, <b>〜といった</b> = seperti~, misalnya~.',
  nuance: '「木村さんという人」= seseorang bernama Kimura. Dipakai saat memperkenalkan nama yang mungkin belum dikenal pendengar.',
  examples: [
    { jp: 'さっき、<b>木村さんという人</b>から電話がありましたよ。', id: 'Tadi ada telepon dari seseorang bernama Kimura-san.' },
    { jp: 'これは、日本の楽器で「尺八」<b>というもの</b>です。', id: 'Ini adalah alat musik Jepang yang disebut "Shakuhachi".' },
    { jp: 'テニス、サッカー、野球<b>といった</b>スポーツが盛んです。', id: 'Olahraga seperti tenis, sepak bola, dan bisbol sangat populer.' },
  ]
},
{
  id: 'n3-w2d4-02',
  level: 'n3',
  week: 2,
  day: 4,
  cat: 'definisi',
  grammar: '〜というのは',
  reading: '〜to iu no wa',
  meaning: 'Yang dimaksud dengan ~ adalah... (mendefinisikan makna)',
  connection: 'N + というのは〜だ／っていうのは（kasual）',
  desc: 'Menjelaskan arti atau definisi dari suatu kata/istilah. Sering dipakai untuk memperkenalkan istilah asing, singkatan, atau kata yang perlu penjelasan. Pola umumnya: <b>「X」というのは、Yのことだ</b>。',
  nuance: 'Berbeda dengan という N (menunjuk nama), というのは menjelaskan makna/definisi. つまり～ことだ sering mengikuti untuk memperjelas.',
  examples: [
    { jp: '「デジカメ」<b>というのは</b>、デジタルカメラを短くした言い方です。', id: '"Dejikame" adalah singkatan dari kamera digital.' },
    { jp: '「省エネ」<b>というのは</b>、エネルギーを省くということを短くした言い方です。', id: '"Sho-ene" adalah singkatan dari menghemat energi.' },
    { jp: '「バイト」<b>っていうのは</b>アルバイトのことです。', id: '"Baito" artinya kerja paruh waktu.' },
  ]
},
{
  id: 'n3-w2d4-03',
  level: 'n3',
  week: 2,
  day: 4,
  cat: 'definisi',
  grammar: '〜ということ',
  reading: '〜to iu koto',
  meaning: 'Fakta bahwa ~ / hal bahwa ~ (nominalisasi kalimat)',
  connection: '［文］普通形 + ということ／っていうこと（kasual）',
  desc: 'Mengubah seluruh kalimat menjadi kata benda (nominalisasi), menyatakan "fakta" atau "hal" bahwa sesuatu terjadi. Sering dipakai untuk menyampaikan informasi yang mengejutkan atau penting.',
  nuance: 'Mirip と聞いた / という話, tapi ということ lebih menekankan pada "fakta/kenyataan" itu sendiri. 「無料ということです」= artinya gratis (menegaskan kesimpulan).',
  examples: [
    { jp: 'お金はいりません。無料<b>ということ</b>です。', id: 'Tidak perlu membayar. Artinya gratis.' },
    { jp: 'リンさんが帰国する<b>ということ</b>を聞いて驚きました。', id: 'Saya terkejut mendengar fakta bahwa Lin-san akan pulang ke negaranya.' },
    { jp: '田中さんが医者だ<b>というのを</b>知らなかった。', id: 'Aku tidak tahu bahwa Tanaka-san adalah dokter.' },
  ]
},

// ── 第2週 5日目 ── Perbandingan & Nuansa
{
  id: 'n3-w2d5-01',
  level: 'n3',
  week: 2,
  day: 5,
  cat: 'perbandingan',
  grammar: '〜というより',
  reading: '〜to iu yori',
  meaning: 'Daripada dikatakan ~, lebih tepat... (koreksi/perbaikan ekspresi)',
  connection: 'N・na・V・A 普通形 + というより／というか',
  desc: 'Memperbaiki atau memperhalus ekspresi yang sudah diucapkan. Artinya: "daripada dibilang A, lebih tepatnya B". <b>というか</b> = atau lebih tepatnya (lebih kasual dan ragu-ragu).',
  nuance: 'AというよりB = B lebih akurat daripada A. Sering dipakai saat ingin lebih tepat dalam mendeskripsikan sesuatu. 「美人というよりかわいい」= lebih tepatnya imut daripada cantik.',
  examples: [
    { jp: '前の車は遅すぎて、走る<b>というより</b>はっているようだ。', id: 'Mobil di depan terlalu lambat, lebih seperti merayap daripada berjalan.' },
    { jp: '今日は涼しい<b>というより</b>寒いくらいだった。', id: 'Hari ini lebih dingin daripada sekadar sejuk.' },
    { jp: 'あの学生はできない<b>というか</b>、やる気がないのでしょう。', id: 'Murid itu, atau lebih tepatnya, sepertinya tidak punya semangat.' },
  ]
},
{
  id: 'n3-w2d5-02',
  level: 'n3',
  week: 2,
  day: 5,
  cat: 'perbandingan',
  grammar: '〜というと／といえば／といったら',
  reading: '〜to iu to / to ieba / to ittara',
  meaning: 'Berbicara tentang ~, kalau menyebut ~ (memunculkan asosiasi)',
  connection: 'N・na・V・A 普通形 + というと／といえば／といったら',
  desc: 'Menyatakan bahwa ketika topik tertentu disebutkan, langsung terlintas asosiasi atau hal yang paling khas. Dipakai untuk mengungkapkan apa yang pertama kali terpikirkan saat mendengar kata tersebut.',
  nuance: 'Ketiga bentuk ini artinya mirip. といったら sering lebih eksklusif/berfokus pada satu hal paling ikonik. Contoh: 「日本といえば富士山」= kalau bicara soal Jepang ya Gunung Fuji.',
  examples: [
    { jp: '京都<b>というと</b>、お寺をイメージします。', id: 'Kalau bicara soal Kyoto, yang terbayang adalah kuil.' },
    { jp: '日本の食べ物<b>といえば</b>、おすしがいちばん有名だと思います。', id: 'Kalau soal makanan Jepang, sushi yang paling terkenal menurutku.' },
    { jp: '夏の果物<b>といったら</b>、やっぱりスイカだね。', id: 'Kalau buah musim panas, ya semangka dong.' },
  ]
},
{
  id: 'n3-w2d5-03',
  level: 'n3',
  week: 2,
  day: 5,
  cat: 'perbandingan',
  grammar: '〜といっても',
  reading: '〜to itte mo',
  meaning: 'Meski dikatakan ~, (tapi sebenarnya tidak sebesar itu)',
  connection: 'N・na・V・A 普通形 + といっても',
  desc: 'Mengakui suatu pernyataan tetapi langsung membatasi atau meluruskannya — "memang benar A, tapi jangan salah sangka, tidak selengkap/sebesar yang kamu bayangkan". Menyampaikan nuansa "meski begitu, tapi...".',
  nuance: 'Beda dengan けど/でも yang hanya mengontraskan, といっても menyatakan bahwa makna yang mungkin tersirat dari pernyataan sebelumnya tidak sepenuhnya benar.',
  examples: [
    { jp: '旅行しました。旅行<b>といっても</b>、近くの温泉に行っただけですが。', id: 'Aku pergi wisata. Tapi meski dibilang wisata, ya cuma pergi ke pemandian air panas dekat sini.' },
    { jp: '今週は忙しい、<b>といっても</b>先週ほどじゃない。', id: 'Minggu ini memang sibuk, tapi tidak sesibuk minggu lalu.' },
    { jp: '庭がある<b>といっても</b>、とても小さいです。', id: 'Meski dibilang ada halaman, tapi sangat kecil.' },
  ]
},

// ── 第2週 6日目 ── Perintah & Permintaan Tidak Langsung
{
  id: 'n3-w2d6-01',
  level: 'n3',
  week: 2,
  day: 6,
  cat: 'perintah',
  grammar: '〜てごらん',
  reading: '〜te goran',
  meaning: 'Coba lakukan ~ (perintah halus atasan ke bawahan)',
  connection: 'Vて + ごらん（なさい）',
  desc: 'Bentuk perintah halus yang digunakan atasan atau orang yang lebih tua kepada bawahan atau orang yang lebih muda. Maknanya "coba lakukan ini" dengan nada mendorong/menganjurkan, tidak sekeras なさい.',
  nuance: '⚠️ Tidak bisa dipakai kepada atasan atau orang yang lebih senior. Lebih lembut dari 〜なさい tapi tetap ada nuansa hierarki. Sering dipakai orang tua ke anak, guru ke murid.',
  examples: [
    { jp: 'わからなかったら、先生に<b>聞いてごらん</b>。', id: 'Kalau tidak mengerti, coba tanya ke guru.' },
    { jp: 'もう一度<b>やってごらんなさい</b>。', id: 'Coba lakukan sekali lagi.' },
    { jp: 'これ、おいしいよ。<b>食べてごらん</b>。', id: 'Ini enak lho. Coba makan.' },
  ]
},
{
  id: 'n3-w2d6-02',
  level: 'n3',
  week: 2,
  day: 6,
  cat: 'perintah',
  grammar: '〜ように言う／頼む',
  reading: '〜you ni iu / tanomu',
  meaning: 'Menyuruh/meminta agar ~ (menyampaikan instruksi tidak langsung)',
  connection: 'Vる／Vない + ように + 言う／頼む／伝える',
  desc: 'Digunakan untuk melaporkan atau menyampaikan instruksi/permintaan kepada orang lain. Bukan kutipan langsung, melainkan penyampaian isi permintaan. <b>Vるように</b> = minta agar melakukan, <b>Vないように</b> = minta agar tidak melakukan.',
  nuance: 'Berbeda dengan 〜と言う (kutipan langsung), 〜ように言う lebih halus dan tidak langsung. Sering dipakai saat meneruskan pesan orang lain.',
  examples: [
    { jp: '田中さんに、私の部屋に来る<b>ように言って</b>ください。', id: 'Tolong bilang ke Tanaka-san agar datang ke kamarku.' },
    { jp: '妻に、家ではたばこを吸わない<b>ように言われて</b>います。', id: 'Saya sudah dibilang oleh istri agar tidak merokok di rumah.' },
    { jp: '先生に早く来る<b>ように頼まれた</b>。', id: 'Diminta oleh guru agar datang lebih awal.' },
  ]
},
{
  id: 'n3-w2d6-03',
  level: 'n3',
  week: 2,
  day: 6,
  cat: 'perintah',
  grammar: '〜なと言われた',
  reading: '〜na to iwareta',
  meaning: 'Diberitahu/dimarahi jangan ~ (larangan yang dilaporkan)',
  connection: 'V命令形 と / Vるなと + 言われる／注意される／しかられる／怒られる',
  desc: 'Melaporkan bahwa seseorang mendapat larangan atau teguran. <b>Vるな</b> adalah bentuk larangan kasual (jangan ~). Meskipun memakai bentuk perintah (命令形), ketika dimasukkan ke struktur ～と言われた, nada kasarnya berkurang.',
  nuance: '⚠️ Vるな sendiri sangat kasar (larangan langsung laki-laki). Tapi dalam 「～なと言われた」, tidak terasa kasar karena ini pelaporan, bukan perintah langsung.',
  examples: [
    { jp: '医者に酒を飲む<b>なと言われた</b>。', id: 'Dokter bilang jangan minum alkohol.' },
    { jp: '先生に、もっと勉強しろ<b>と言われた</b>。', id: 'Dibilang oleh guru agar belajar lebih giat.' },
    { jp: '父に、もっと早く帰れ<b>と注意された</b>。', id: 'Ditegur ayah agar pulang lebih awal.' },
  ]
},
{
  id: 'n3-w2d6-04',
  level: 'n3',
  week: 2,
  day: 6,
  cat: 'perintah',
  grammar: '〜てくれと頼まれた',
  reading: '〜te kure to tanomareta',
  meaning: 'Diminta/disuruh untuk melakukan ~ (permintaan yang dilaporkan)',
  connection: 'Vて + くれと頼まれる／言われる ／ Vないで + くれと言われる',
  desc: 'Melaporkan bahwa seseorang diminta untuk melakukan sesuatu demi si pembicara. くれ adalah bentuk kasual dari ください. Digunakan saat meneruskan permintaan yang diterima dari orang lain.',
  nuance: 'Vてくれ sendiri = tolong lakukan (permintaan kasual). Dalam 〜てくれと頼まれた → menjadi laporan permintaan. Sering setara dengan 〜てもらいたいと言われた.',
  examples: [
    { jp: '友達に、田中さんの電話番号を教えて<b>くれと頼まれた</b>。', id: 'Teman memintaku agar memberitahu nomor telepon Tanaka-san.' },
    { jp: '大家に、玄関の前に自転車を置かないで<b>くれと言われた</b>。', id: 'Pemilik kos bilang minta jangan menaruh sepeda di depan pintu masuk.' },
    { jp: 'この資料を50部コピーするよう<b>に頼まれた</b>。', id: 'Diminta untuk mengkopi dokumen ini sebanyak 50 lembar.' },
  ]
},

]; // end N3_W2
