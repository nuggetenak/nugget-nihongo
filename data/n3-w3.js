// DATA — N3 第3週 (Soumatome N3 Bunpou)
// 18 pola grammar · Week 3 · もっとがんばってほしい！

const N3_W3 = [
// ── 第3週 1日目 ── Konsesi / Meskipun
  {id:'n3-w3d1-01', level:'n3', week:3, day:1, cat:'konsesi',
   grammar:'〜ても／〜くても／〜でも', reading:'〜temo / 〜kutemo / 〜demo',
   meaning:'Meskipun... / Walaupun... (tetap berlaku)',
   connection:'Vて＋も／Aくて＋も／na・Nで＋も',
   desc:'Menyatakan bahwa hasil atau kondisi di klausa kedua <strong>tidak berubah meskipun</strong> kondisi di klausa pertama terpenuhi. Setara dengan "even if / even though".',
   nuance:'Berbeda dari 〜のに (yang mengandung rasa kecewa). 〜ても lebih netral dan faktual.',
   examples:[
     {jp:'調べても<b>わからなかった</b>ので、先生に聞いた。', id:'Meskipun sudah kucari, tidak mengerti juga, jadi kutanya guruku.'},
     {jp:'必要なので、高く<b>ても</b>買います。', id:'Karena saya butuh, meskipun mahal tetap akan saya beli.'},
     {jp:'「すみません。黒は売り切れました。」「黒じゃなく<b>てもかまいません</b>よ。」', id:'"Maaf, hitam sudah habis." "Tidak apa-apa kalau bukan hitam."'}
   ]},

  {id:'n3-w3d1-02', level:'n3', week:3, day:1, cat:'konsesi',
   grammar:'どんなに〜ても／いくら〜ても', reading:'donna ni〜temo / ikura〜temo',
   meaning:'Sekeras apapun... / Sebanyak apapun... (tetap tidak berubah)',
   connection:'どんなに／いくら＋V・A・na・N＋ても',
   desc:'Bentuk penguatan dari 〜ても. Menekankan bahwa <strong>seberapa pun besar kondisinya</strong>, hasilnya tetap sama. Sering diikuti kata negatif.',
   nuance:'どんなに lebih umum untuk kualitas/cara (どんなに練習しても). いくら lebih ke jumlah (いくら飲んでも). Keduanya bisa saling menggantikan.',
   examples:[
     {jp:'ギターを習い始めたが、<b>どんなに練習しても</b>全然うまくならない。', id:'Sudah mulai belajar gitar, tapi berlatih sekeras apapun tidak kunjung bisa.'},
     {jp:'私は、<b>いくら</b>お酒を飲ん<b>でも</b>顔色が変わらない。', id:'Saya, sebanyak apapun minum alkohol, wajah saya tidak berubah.'},
     {jp:'私は<b>どんなに</b>暑く<b>ても</b>寝るときはクーラーを消して寝ます。', id:'Saya, sepanas apapun, waktu tidur tetap matikan AC.'}
   ]},

  {id:'n3-w3d1-03', level:'n3', week:3, day:1, cat:'cara',
   grammar:'〜ずに', reading:'〜zu ni',
   meaning:'Tanpa... / Dengan tidak...',
   connection:'Vない幹＋ずに（しない→せずに）',
   desc:'Menyatakan melakukan sesuatu <strong>tanpa melakukan</strong> tindakan lain. Padanan formal dari 〜ないで.',
   nuance:'〜ずに lebih formal/tulisan dari 〜ないで. Perubahan khusus: しない → せずに (bukan しずに). NG: しずに.',
   examples:[
     {jp:'辞書を使わ<b>ずに</b>書いたので、自信がありません。', id:'Karena menulis tanpa menggunakan kamus, saya tidak percaya diri.'},
     {jp:'昨夜、歯をみが<b>かずに</b>寝てしまった。', id:'Tadi malam, tertidur tanpa gosok gigi.'}
   ]},

// ── 第3週 2日目 ── として / にしては / としたら
  {id:'n3-w3d2-01', level:'n3', week:3, day:2, cat:'peran',
   grammar:'〜として', reading:'〜to shite',
   meaning:'Sebagai... (dalam kapasitas/peran tertentu)',
   connection:'Nと＋して／しては／しても／してのN',
   desc:'Menyatakan <strong>peran, kapasitas, atau posisi</strong> seseorang/sesuatu. "Dalam kapasitasnya sebagai...".',
   nuance:'〜として menetapkan peran/identitas. 〜にとって (= bagi...) berbeda maknanya.',
   examples:[
     {jp:'彼は外国人だが、<b>日本代表として</b>試合に出る。', id:'Meski dia orang asing, dia ikut pertandingan sebagai wakil Jepang.'},
     {jp:'彼女は女性<b>としても</b>女優<b>としても</b>最高だが、妻<b>としては</b>どうだろう。', id:'Sebagai wanita maupun sebagai aktris dia terbaik, tapi bagaimana sebagai istri?'}
   ]},

  {id:'n3-w3d2-02', level:'n3', week:3, day:2, cat:'perbandingan',
   grammar:'〜にしては', reading:'〜ni shite wa',
   meaning:'Untuk... yang... / Mengingat bahwa... (hasil di luar dugaan)',
   connection:'V/A/na/N普通形＋にしては（na幹に／N幹に）',
   desc:'Menyatakan bahwa hasil atau kondisi yang ada <strong>berbeda dari yang diharapkan</strong> berdasarkan kondisi yang disebutkan. Ada nuansa "mengejutkan" (bisa positif/negatif).',
   nuance:'Nuansa kejutan/tak terduga. Mirip dengan にしても tapi にしては lebih menekankan perbedaan dari ekspektasi.',
   examples:[
     {jp:'外国人<b>にしては</b>日本語が上手だ。', id:'Untuk orang asing, bahasa Jepangnya bagus ya.'},
     {jp:'初めて<b>にしては</b>、よくできました。', id:'Untuk pertama kali, kamu melakukannya dengan baik.'},
     {jp:'洗ったの？それ<b>にしては</b>きれいじゃないね。', id:'Sudah dicuci? Untuk yang sudah dicuci, kurang bersih ya.'}
   ]},

  {id:'n3-w3d2-03', level:'n3', week:3, day:2, cat:'konsesi',
   grammar:'〜にしても', reading:'〜ni shite mo',
   meaning:'Bahkan jika... / Meskipun mempertimbangkan... (tetap berlaku)',
   connection:'V/A/na/N普通形＋にしても（na幹に／N幹に）',
   desc:'Menyatakan bahwa meskipun kondisi yang disebutkan diakui, hasilnya tetap tidak berubah atau ada penilaian tambahan. Juga digunakan sebagai それにしても (bagaimanapun juga).',
   nuance:'それにしても adalah ekspresi idiomatis tersendiri: "bagaimanapun juga / meski begitu".',
   examples:[
     {jp:'これは、100円<b>にしても</b>、高いと思う。', id:'Bahkan untuk harga 100 yen, saya rasa ini mahal.'},
     {jp:'遅れるとは聞いていたけど、<b>それにしても</b>田中さん、遅いね。', id:'Memang dengar dia terlambat, tapi bagaimanapun juga, Tanaka-san memang terlambat ya.'}
   ]},

  {id:'n3-w3d2-04', level:'n3', week:3, day:2, cat:'kondisional',
   grammar:'〜としたら／〜とすれば', reading:'〜to shitara / 〜to sureba',
   meaning:'Kalau saja... / Jika seandainya... (kondisi hipotesis)',
   connection:'N/na/A/V普通形＋としたら／とすれば',
   desc:'Menyatakan kondisi <strong>hipotesis atau anggapan sementara</strong> untuk kemudian memikirkan akibatnya. "Kalau kita anggap bahwa...".',
   nuance:'Lebih hipotesis dari 〜たら. Sering dipakai saat mempertimbangkan kemungkinan yang belum pasti.',
   examples:[
     {jp:'その話が本当だ<b>としたら</b>、うれしいです。', id:'Kalau cerita itu benar, saya senang.'},
     {jp:'飛行機で行く<b>としたら</b>、いくらぐらいかかりますか。', id:'Kalau seandainya pergi dengan pesawat, kira-kira berapa biayanya?'}
   ]},

// ── 第3週 3日目 ── Intensi / Dugaan / Kewajiban / Kenangan
  {id:'n3-w3d3-01', level:'n3', week:3, day:3, cat:'niat',
   grammar:'〜つもりだった', reading:'〜tsumori datta',
   meaning:'Tadinya berencana... / Berniat untuk... (tapi tidak jadi)',
   connection:'Vる／Vない＋つもりだった',
   desc:'Menyatakan <strong>niat atau rencana di masa lalu yang tidak terwujud</strong>. Bentuk lampau dari 〜つもりだ.',
   nuance:'Berbeda dari 〜つもりです (rencana ke depan). 〜つもりだった = rencana yang sudah berlalu, umumnya tidak terealisasi.',
   examples:[
     {jp:'昨日は買い物に行く<b>つもりでした</b>が、頭が痛かったのでずっと家にいました。', id:'Kemarin tadinya berniat belanja, tapi kepala sakit jadi di rumah terus.'},
     {jp:'お菓子を食べない<b>つもりでした</b>が、ついたべてしまいました。', id:'Tadinya tidak mau makan cemilan, tapi terlanjur dimakan juga.'}
   ]},

  {id:'n3-w3d3-02', level:'n3', week:3, day:3, cat:'ekspektasi',
   grammar:'〜はずだ／〜はずがない', reading:'〜hazu da / 〜hazu ga nai',
   meaning:'Seharusnya... / Pasti... / Tidak mungkin... (berdasarkan logika/pengetahuan)',
   connection:'V/A/na/N普通形＋はずだ／はずがない（na幹な／N幹の）',
   desc:'〜はずだ menyatakan keyakinan berdasarkan pengetahuan atau logika bahwa sesuatu <strong>seharusnya/pasti demikian</strong>. 〜はずがない adalah penyangkalan kuat: "tidak mungkin".',
   nuance:'〜はずがない adalah penolakan kuat. Berbeda dari 〜らしい (inferensi dari pengamatan).',
   examples:[
     {jp:'田中さんは今、旅行中だから、家にいない<b>はずだ</b>。', id:'Tanaka-san sekarang sedang bepergian, jadi seharusnya tidak ada di rumah.'},
     {jp:'まじめな田中さんが、無断で休む<b>はずがない</b>。', id:'Tanaka-san yang serius itu, tidak mungkin absen tanpa pemberitahuan.'}
   ]},

  {id:'n3-w3d3-03', level:'n3', week:3, day:3, cat:'keharusan',
   grammar:'〜べきだ', reading:'〜beki da',
   meaning:'Seharusnya... / Sudah selayaknya... (kewajiban moral)',
   connection:'Vる＋べきだ／べきではない（するべき／すべき）',
   desc:'Menyatakan bahwa sesuatu <strong>seharusnya dilakukan berdasarkan kepatutan moral atau sosial</strong>. Lebih kuat dan objektif dari 〜たほうがいい.',
   nuance:'〜べき = すべき (keduanya OK). Bentuk negatif: 〜べきではない. Nuansa kewajiban sosial/moral.',
   examples:[
     {jp:'約束は守る<b>べきだ</b>。', id:'Janji seharusnya ditepati.'},
     {jp:'おもちゃは、まず安全である<b>べきだ</b>。', id:'Mainan, yang utama seharusnya aman.'}
   ]},

  {id:'n3-w3d3-04', level:'n3', week:3, day:3, cat:'kenangan',
   grammar:'〜ものだ', reading:'〜mono da',
   meaning:'Dulu sering... / Biasanya dulu... (mengenang masa lalu)',
   connection:'Vtaもの(だ)／Vなかったもの(だ)',
   desc:'Digunakan untuk <strong>mengenang kebiasaan atau keadaan di masa lalu</strong> dengan nuansa nostalgia. "Dulu sering/biasanya...".',
   nuance:'Hanya dipakai untuk masa lalu (Vた形). Nuansa nostalgia atau ingatan yang terkenang.',
   examples:[
     {jp:'子どものころはよく川で遊んだ<b>ものだ</b>。', id:'Waktu kecil, sering main di sungai.'},
     {jp:'学生時代は毎日図書館へ通った<b>ものだ</b>。', id:'Jaman kuliah, setiap hari pergi ke perpustakaan.'}
   ]},

// ── 第3週 4日目 ── Kesempatan / Pengulangan / Timing
  {id:'n3-w3d4-01', level:'n3', week:3, day:4, cat:'kesempatan',
   grammar:'〜ついでに', reading:'〜tsuide ni',
   meaning:'Sekalian / Sambil / Memanfaatkan kesempatan',
   connection:'Nの／Vる／Vた＋ついでに',
   desc:'Menyatakan melakukan sesuatu <strong>sekalian atau memanfaatkan kesempatan</strong> saat sudah melakukan hal lain. Aksi utama dan tambahan berlangsung di waktu yang sama.',
   nuance:'Aksi pertama = aksi utama; aksi kedua = kegiatan tambahan yang dilakukan sekalian. Berbeda dari 〜たびに (pengulangan).',
   examples:[
     {jp:'散歩の<b>ついでに</b>、この手紙を出してきてくれませんか。', id:'Sekalian jalan-jalan, bisa tolong kirimkan surat ini?'},
     {jp:'郵便局へ行った<b>ついでに</b>、はがきを買ってきた。', id:'Sekalian pergi ke kantor pos, beli kartu pos.'}
   ]},

  {id:'n3-w3d4-02', level:'n3', week:3, day:4, cat:'pengulangan',
   grammar:'〜たびに', reading:'〜tabi ni',
   meaning:'Setiap kali... / Setiap saat...',
   connection:'Nの／Vる／Vる.そのたびに＋たびに',
   desc:'Menyatakan bahwa <strong>setiap kali tindakan/kondisi tertentu terjadi, hal lain selalu mengikuti</strong>. Pola konsisten yang berulang.',
   nuance:'Menekankan konsistensi: setiap kali X terjadi, Y selalu terjadi. NG: 〜たびには.',
   examples:[
     {jp:'買い物の<b>たびに</b>、袋をたくさんもらう。', id:'Setiap kali belanja, selalu dapat banyak kantong.'},
     {jp:'この曲を聞く<b>たびに</b>、ふるさとを思い出す。', id:'Setiap kali mendengar lagu ini, teringat kampung halaman.'}
   ]},

  {id:'n3-w3d4-03', level:'n3', week:3, day:4, cat:'waktu',
   grammar:'〜とたん（に）', reading:'〜totan (ni)',
   meaning:'Tepat saat / Begitu... langsung...',
   connection:'Vた＋とたん／Vた.そのとたん〜',
   desc:'Menyatakan bahwa <strong>tepat sesaat setelah tindakan pertama, tindakan/kejadian kedua langsung terjadi</strong>. Interval waktu sangat pendek.',
   nuance:'Klausa pertama harus bentuk た (lampau). Hasil kedua biasanya di luar kendali pembicara. NG: 〜たとたん + kalimat perintah/keinginan.',
   examples:[
     {jp:'窓を開けた<b>とたん</b>、強い風が入ってきた。', id:'Begitu membuka jendela, angin kencang langsung masuk.'},
     {jp:'お酒を飲んだ<b>とたん</b>、顔が赤くなった。', id:'Begitu minum alkohol, wajah langsung memerah.'}
   ]},

  {id:'n3-w3d4-04', level:'n3', week:3, day:4, cat:'waktu',
   grammar:'〜最中に', reading:'〜saichuu ni',
   meaning:'Di tengah-tengah / Tepat saat sedang...',
   connection:'Nの／Vている＋最中に／最中だ',
   desc:'Menyatakan bahwa <strong>tepat saat suatu kegiatan sedang berlangsung</strong>, terjadi sesuatu (biasanya mengganggu). Menekankan bahwa kegiatan sedang di puncaknya.',
   nuance:'Nuansa "mengganggu yang sedang berlangsung". Lebih menekankan waktu tepat di tengah kegiatan daripada 〜ている間に.',
   examples:[
     {jp:'食事の<b>最中に</b>、お客さんが来た。', id:'Tepat di tengah-tengah makan, ada tamu datang.'},
     {jp:'会議をしている<b>最中に</b>、携帯電話が鳴った。', id:'Tepat saat rapat berlangsung, handphone berbunyi.'}
   ]},

// ── 第3週 5日目 ── Keadaan yang dipertahankan
  {id:'n3-w3d5-01', level:'n3', week:3, day:5, cat:'cara',
   grammar:'〜とおり（に）', reading:'〜toori (ni)',
   meaning:'Sesuai dengan... / Persis seperti...',
   connection:'Vる／Vた／Nの＋とおり／NどおりN',
   desc:'Menyatakan bahwa sesuatu <strong>dilakukan atau terjadi sesuai dengan</strong> informasi, instruksi, atau perkiraan yang disebutkan.',
   nuance:'Tidak ada nuansa kejutan (berbeda dari 〜にしては). Netral: kondisi sesuai dengan yang diharapkan/dinyatakan.',
   examples:[
     {jp:'友達がかいてくれた地図の<b>とおり</b>に来たが、道に迷った。', id:'Datang sesuai peta yang dibuatkan teman, tapi tetap tersesat.'},
     {jp:'雪が降ってきた。予報<b>どおりだ</b>。', id:'Salju turun. Persis seperti ramalan cuaca.'},
     {jp:'先生が言った<b>とおり</b>、試験は難しかった。', id:'Sesuai yang dikatakan guru, ujiannya memang susah.'}
   ]},

  {id:'n3-w3d5-02', level:'n3', week:3, day:5, cat:'keadaan',
   grammar:'〜まま', reading:'〜mama',
   meaning:'Tetap dalam keadaan... / Dibiarkan seperti...',
   connection:'Vた／Vない／A／na／N幹の＋まま',
   desc:'Menyatakan bahwa <strong>suatu keadaan tetap dipertahankan tanpa perubahan</strong> saat melakukan tindakan lain atau hingga saat ini.',
   nuance:'Kondisi tetap berlangsung sambil melakukan hal lain. NG: Vるまま. Bentuk positif/negatif berpengaruh pada makna.',
   examples:[
     {jp:'昨夜は、テレビをつけた<b>まま</b>寝てしまった。', id:'Tadi malam, ketiduran dengan TV tetap menyala.'},
     {jp:'この野菜は、生の<b>まま</b>で食べてもおいしいですよ。', id:'Sayuran ini enak dimakan begitu saja tanpa dimasak.'}
   ]},

  {id:'n3-w3d5-03', level:'n3', week:3, day:5, cat:'keadaan',
   grammar:'〜っぱなし', reading:'〜ppanashi',
   meaning:'Dibiarkan... terus / Tidak ditutup/diselesaikan',
   connection:'V連用形＋っぱなし',
   desc:'Menyatakan keadaan yang <strong>dibiarkan begitu saja tanpa diselesaikan atau ditutup</strong>. Biasanya mengandung nuansa negatif — sesuatu yang seharusnya dibereskan tapi tidak.',
   nuance:'Selalu nuansa negatif — kelalaian membiarkan sesuatu tetap terbuka/menyala/dst. Mirip dengan まま tapi lebih spesifik pada kelalaian.',
   examples:[
     {jp:'窓を開け<b>っぱなし</b>で出てきた。', id:'Keluar rumah dengan jendela dibiarkan terbuka.'},
     {jp:'水を出し<b>っぱなし</b>にしないでください。', id:'Jangan biarkan air terus mengalir.'}
   ]},

  {id:'n3-w3d5-04', level:'n3', week:3, day:5, cat:'pembatasan',
   grammar:'〜きり', reading:'〜kiri',
   meaning:'Hanya... saja / Cuma...',
   connection:'N（少ない数量）＋きり／きりだ／っきり／っきりだ',
   desc:'Menyatakan <strong>pembatasan pada jumlah kecil</strong>. Menekankan bahwa hanya sejumlah kecil itulah yang ada, tidak lebih.',
   nuance:'N は少ない数量 (angka/jumlah kecil). れい: 一人（つ）きり、二人（つ）きり、一度（つ）きり.',
   examples:[
     {jp:'二人（つ）<b>きり</b>で話をしたいです。', id:'Ingin bicara berdua saja.'},
     {jp:'彼に会ったのは1回（つ）<b>きり</b>です。', id:'Bertemu dengannya hanya sekali saja.'}
   ]},

// ── 第3週 6日目 ── がる / てほしい / ふりをする
  {id:'n3-w3d6-01', level:'n3', week:3, day:6, cat:'ekspresi',
   grammar:'〜がる／〜がらないで', reading:'〜garu / 〜garanaide',
   meaning:'Kelihatan... / Merasa (dari perspektif orang lain)',
   connection:'A幹＋がる／がって／がらないで（VたA幹がっている）',
   desc:'Menempel pada adjektif, menyatakan bahwa <strong>seseorang (orang lain) menunjukkan tanda-tanda perasaan tersebut</strong>. Pembicara mendeskripsikan perasaan orang lain dari luar.',
   nuance:'Tidak dipakai untuk diri sendiri (私は怖がっている = aneh). Sering: 怖がる、痛がる、欲しがる、寂しがる、残念がる、得意がる、見たがる、食べたがる.',
   examples:[
     {jp:'怖<b>がらないで</b>ください。', id:'Jangan merasa takut.'},
     {jp:'恥ずかし<b>がらないで</b>、前に出てきてください。', id:'Jangan malu-malu, tolong maju ke depan.'},
     {jp:'田中さんが、あなたに会い<b>たがって</b>いましたよ。', id:'Tanaka-san kelihatannya ingin bertemu denganmu.'}
   ]},

  {id:'n3-w3d6-02', level:'n3', week:3, day:6, cat:'harapan',
   grammar:'〜てほしい', reading:'〜te hoshii',
   meaning:'Mau / Ingin (orang lain melakukan sesuatu)',
   connection:'Vて＋ほしい／Vないで＋ほしい／もらいたい',
   desc:'Menyatakan bahwa <strong>pembicara menginginkan orang lain melakukan sesuatu</strong>. Ekspresi keinginan yang diarahkan ke orang lain.',
   nuance:'〜てほしい = keinginan terhadap orang lain. Berbeda dari 〜たい (keinginan diri sendiri). Juga: 〜てもらいたい (sedikit lebih formal).',
   examples:[
     {jp:'あのう、教科書を見せて<b>ほしい</b>んですが……。', id:'Permisi, saya ingin kamu menunjukkan buku teksnya...'},
     {jp:'あなたに教えて<b>もらいたい</b>ことがあります。', id:'Ada yang ingin saya minta tolong kamu jelaskan.'}
   ]},

  {id:'n3-w3d6-03', level:'n3', week:3, day:6, cat:'ekspresi',
   grammar:'〜ふりをする', reading:'〜furi wo suru',
   meaning:'Berpura-pura... / Pura-pura...',
   connection:'V/A/na/N普通形＋ふりをする（na幹な／N幹の）',
   desc:'Menyatakan bahwa seseorang <strong>berpura-pura atau menampilkan sesuatu yang tidak sesuai dengan kenyataan</strong>.',
   nuance:'Selalu ada perbedaan antara penampilan dan kenyataan. Bisa untuk diri sendiri maupun orang lain.',
   examples:[
     {jp:'彼はそのことについて知っている<b>ふりをしている</b>が、本当は知らないと思う。', id:'Dia berpura-pura tahu tentang hal itu, tapi kurasa sebenarnya tidak tahu.'},
     {jp:'田中さんは独身の<b>ふりをしている</b>が、結婚していて3人も子どもがいる。', id:'Tanaka-san berpura-pura lajang, padahal sudah menikah dan punya 3 anak.'}
   ]},
];
