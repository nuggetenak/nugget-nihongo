// DATA — N4 第2週 (Soumatome N4 Bunpou)
// Week 2 · 宿題をしなければいけません。
// Kewajiban, Persiapan, Memberi/Menerima, Tujuan, Saran

const N4_W2 = [

// ── 第2週 1日目 ── Kewajiban & Izin
  {id:'n4-w2d1-01', level:'n4', week:2, day:1, cat:'kewajiban',
   grammar:'〜なければならない／なくてはいけない', reading:'〜nakereba naranai / nakute wa ikenai',
   meaning:'Harus... / Wajib... (kewajiban)',
   connection:'Vない形（除ない）＋なければならない／なくてはいけない／ないといけない',
   desc:'Menyatakan <strong>kewajiban atau keharusan</strong> melakukan sesuatu. Ketiga bentuk bermakna sama, dengan tingkat formalitas yang sedikit berbeda.',
   nuance:'Tingkat formalitas: なければならない (formal/tertulis) ≈ なくてはいけない (umum) ≈ ないといけない (kasual). Bentuk kasual: なきゃ/なくちゃ/ないと.',
   examples:[
     {jp:'明日は早く起きなければ<b>なりません</b>。', id:'Besok saya harus bangun pagi.'},
     {jp:'日本では車は左側を走らなければ<b>ならない</b>。', id:'Di Jepang, mobil harus berjalan di sisi kiri.'},
     {jp:'今週は日曜日も会社に行か<b>なくてはいけない</b>。', id:'Minggu ini saya harus masuk kerja hari Minggu juga.'}
   ]},

  {id:'n4-w2d1-02', level:'n4', week:2, day:1, cat:'kewajiban',
   grammar:'〜なきゃ／なくちゃ (kasual)', reading:'〜nakya / nakucha',
   meaning:'Harus... (bentuk kasual dari kewajiban)',
   connection:'V〜ない形＋きゃ（いけない）／くちゃ（いけない）',
   desc:'Bentuk kasual dari <strong>kewajiban</strong>. Biasanya kalimat dipotong dan tidak menyelesaikan konsekuensinya karena sudah dipahami.',
   nuance:'Sangat kasual — hanya untuk percakapan dengan teman atau keluarga. なきゃ = なければ, なくちゃ = なくては.',
   examples:[
     {jp:'洗濯し<b>なきゃ</b>。', id:'Harus cuci baju nih.'},
     {jp:'明日試験だから勉強し<b>なくちゃ</b>いけない。', id:'Besok ada ujian jadi harus belajar.'},
     {jp:'お客さんが来るから、片づけ<b>ないと</b>。', id:'Tamu akan datang, jadi harus beres-beres nih.'}
   ]},

  {id:'n4-w2d1-03', level:'n4', week:2, day:1, cat:'izin',
   grammar:'〜てもいい', reading:'〜te mo ii',
   meaning:'Boleh... / Tidak apa-apa... (izin atau diperbolehkan)',
   connection:'V〜て形／い形〜くて／な形〜で＋もいい',
   desc:'Menyatakan bahwa suatu tindakan <strong>diperbolehkan atau tidak masalah</strong>. Bisa digunakan untuk meminta atau memberi izin.',
   nuance:'Bentuk pertanyaan 〜てもいいですか digunakan untuk meminta izin. 〜てもいいです/よ untuk memberi izin.',
   examples:[
     {jp:'これ、捨て<b>てもいいですか</b>。', id:'Bolehkah ini dibuang?'},
     {jp:'ここに座っ<b>てもいいですよ</b>。', id:'Boleh duduk di sini.'},
     {jp:'今日は早く帰っ<b>てもいいです</b>か。', id:'Bolehkah saya pulang lebih awal hari ini?'}
   ]},

  {id:'n4-w2d1-04', level:'n4', week:2, day:1, cat:'izin',
   grammar:'〜なくてもいい', reading:'〜nakute mo ii',
   meaning:'Tidak perlu... / Tidak harus... (tidak diwajibkan)',
   connection:'V〜ない形（除ない）＋くてもいい',
   desc:'Menyatakan bahwa suatu tindakan <strong>tidak diwajibkan</strong> — tidak harus dilakukan.',
   nuance:'Berlawanan dengan kewajiban (〜なければならない). Bisa juga 〜なくてもいいです untuk memberi keringanan.',
   examples:[
     {jp:'その本は、すぐに返さ<b>なくてもいいです</b>。', id:'Buku itu tidak harus dikembalikan segera.'},
     {jp:'明日は来<b>なくてもいいですよ</b>。', id:'Besok tidak perlu datang.'},
     {jp:'今日じゃ<b>なくてもいい</b>です。', id:'Tidak harus hari ini.'}
   ]},

  {id:'n4-w2d1-05', level:'n4', week:2, day:1, cat:'larangan',
   grammar:'〜てはいけない', reading:'〜te wa ikenai',
   meaning:'Tidak boleh... / Dilarang... (larangan)',
   connection:'V〜て形＋はいけない',
   desc:'Menyatakan <strong>larangan</strong> — sesuatu yang tidak boleh dilakukan.',
   nuance:'Lebih kuat dari 〜ないでください (tolong jangan). Bentuk てはいけません lebih sopan, てはいけない lebih tegas.',
   examples:[
     {jp:'テストのとき、ペンを使っ<b>てはいけません</b>。', id:'Saat ujian, tidak boleh menggunakan pulpen.'},
     {jp:'その川で泳い<b>では いけません</b>。', id:'Tidak boleh berenang di sungai itu.'},
     {jp:'嘘をつい<b>てはいけない</b>。', id:'Tidak boleh berbohong.'}
   ]},

// ── 第2週 2日目 ── Persiapan & Penyesalan
  {id:'n4-w2d2-01', level:'n4', week:2, day:2, cat:'persiapan',
   grammar:'Vておく', reading:'V-te oku',
   meaning:'Melakukan/menyiapkan terlebih dahulu (sebagai persiapan atau mempertahankan kondisi)',
   connection:'V〜て形＋おく',
   desc:'① Menyatakan melakukan sesuatu <strong>sebagai persiapan sebelumnya</strong>. ② Menyatakan membiarkan sesuatu tetap dalam kondisi tertentu.',
   nuance:'Dalam percakapan kasual berubah menjadi 〜とく: 読んでおく→読んどく, 開けておいて→開けといて.',
   examples:[
     {jp:'旅行する前に、ガイドブックを読んで<b>おきましょう</b>。', id:'Sebelum berwisata, mari kita baca dulu buku panduannya.'},
     {jp:'ドアを開け<b>ておいて</b>ください。', id:'Tolong biarkan pintu tetap terbuka.'},
     {jp:'机の上は片付けないで、そのままにし<b>ておいて</b>ください。', id:'Tolong jangan dirapikan mejanya, biarkan begitu saja.'}
   ]},

  {id:'n4-w2d2-02', level:'n4', week:2, day:2, cat:'penyesalan',
   grammar:'Vてしまう', reading:'V-te shimau',
   meaning:'① Sudah... (menyesal/tidak sengaja) ② Sudah selesai... (penyelesaian tuntas)',
   connection:'V〜て形＋しまう',
   desc:'① Menyatakan tindakan yang terjadi <strong>tidak sengaja atau disesali</strong>. ② Menyatakan sesuatu sudah <strong>selesai sepenuhnya</strong>.',
   nuance:'Bentuk kasual: 〜てしまった→〜ちゃった (で→じゃ: 飲んでしまった→飲んじゃった). 〜てしまう→〜ちゃう.',
   examples:[
     {jp:'きのう買ったたまごは、使って<b>しまいました</b>。', id:'Telur yang dibeli kemarin sudah habis saya gunakan.'},
     {jp:'電車の中にかさを忘れて<b>しまいました</b>。', id:'Saya lupa ketinggalan payung di dalam kereta.'},
     {jp:'残っていたワインを飲んで<b>しまいました</b>。', id:'Saya sudah menghabiskan wine yang tersisa.'}
   ]},

// ── 第2週 3日目 ── Memberi & Menerima
  {id:'n4-w2d3-01', level:'n4', week:2, day:3, cat:'memberi-menerima',
   grammar:'Nをあげる／くれる／もらう', reading:'N wo ageru / kureru / morau',
   meaning:'Memberi (ke orang lain) / Memberi (ke saya) / Menerima',
   connection:'NにNをあげる／NがNをくれる／NにNをもらう',
   desc:'Tiga kata kerja memberi-menerima: <strong>あげる</strong> (saya/orang memberi ke orang lain), <strong>くれる</strong> (orang memberi ke saya/keluarga saya), <strong>もらう</strong> (saya menerima dari orang lain).',
   nuance:'くれる SELALU digunakan ketika pihak yang menerima adalah saya atau keluarga saya. あげる untuk memberi ke orang lain. もらう perspektif penerima.',
   examples:[
     {jp:'私は田中さんにセーターを<b>あげました</b>。', id:'Saya memberi sweater kepada Tanaka-san.'},
     {jp:'田中さんが（私に）セーターを<b>くれました</b>。', id:'Tanaka-san memberikan sweater (kepada saya).'},
     {jp:'私は田中さんにセーターを<b>もらいました</b>。', id:'Saya menerima sweater dari Tanaka-san.'}
   ]},

  {id:'n4-w2d3-02', level:'n4', week:2, day:3, cat:'memberi-menerima',
   grammar:'Vてあげる／くれる／もらう', reading:'V-te ageru / kureru / morau',
   meaning:'Melakukan sesuatu untuk orang lain / untuk saya / minta orang melakukan',
   connection:'V〜て形＋あげる／くれる／もらう',
   desc:'Digunakan untuk menyatakan <strong>tindakan yang dilakukan demi kepentingan orang lain</strong>. Versi perbuatan dari あげる/くれる/もらう.',
   nuance:'あげる: saya berbuat untuk orang lain. くれる: orang lain berbuat untuk saya. もらう: saya mendapat manfaat dari tindakan orang lain. てやる untuk hewan/tanaman.',
   examples:[
     {jp:'私は友だちの引っ越しを手伝って<b>あげました</b>。', id:'Saya membantu pindahan teman.'},
     {jp:'田中さんは私に地図をかいて<b>くれました</b>。', id:'Tanaka-san membuatkan peta untuk saya.'},
     {jp:'友だちに東京駅まで連れて行って<b>もらいました</b>。', id:'Saya diantarkan teman sampai Stasiun Tokyo.'}
   ]},

// ── 第2週 4日目 ── Tujuan & Perubahan
  {id:'n4-w2d4-01', level:'n4', week:2, day:4, cat:'tujuan',
   grammar:'Nのために／Vるために', reading:'N no tame ni / V-ru tame ni',
   meaning:'Untuk... / Demi... (tujuan atau manfaat)',
   connection:'N＋のために／V辞書形＋ために',
   desc:'Menyatakan <strong>tujuan atau manfaat</strong> dari suatu tindakan. "Demi N" atau "Agar bisa V".',
   nuance:'Ada dua makna ために: ① tujuan (agar/untuk bisa) ② sebab (karena). Bedakan: 家を買うために貯金する (menabung agar bisa beli rumah = tujuan) vs 台風のために電車が止まった (kereta berhenti karena topan = sebab).',
   examples:[
     {jp:'明日の会議の<b>ために</b>、準備をしています。', id:'Saya sedang mempersiapkan diri untuk rapat besok.'},
     {jp:'家を買う<b>ために</b>、貯金をしています。', id:'Saya menabung untuk membeli rumah.'},
     {jp:'健康の<b>ために</b>、毎朝走っています。', id:'Demi kesehatan, saya berlari setiap pagi.'}
   ]},

  {id:'n4-w2d4-02', level:'n4', week:2, day:4, cat:'perubahan',
   grammar:'Vようになる', reading:'V-you ni naru',
   meaning:'Menjadi bisa... / Mulai bisa/melakukan... (perubahan kemampuan atau kebiasaan)',
   connection:'V辞書形/Vない形＋ようになる',
   desc:'Menyatakan <strong>perubahan bertahap</strong> — kemampuan atau kondisi yang sebelumnya tidak ada kini menjadi ada.',
   nuance:'Berbeda dengan Vことにする (keputusan sendiri). ようになる = perubahan alami/bertahap. Sering dipakai untuk kemampuan (〜できるようになった).',
   examples:[
     {jp:'赤ちゃんは1さいごろから歩く<b>ようになります</b>。', id:'Bayi mulai bisa berjalan sejak sekitar usia 1 tahun.'},
     {jp:'父は仕事をやめてから、早く寝る<b>ようになりました</b>。', id:'Setelah ayah berhenti bekerja, beliau mulai tidur lebih awal.'},
     {jp:'練習したら、ギターが弾ける<b>ようになりました</b>。', id:'Setelah berlatih, saya menjadi bisa bermain gitar.'}
   ]},

  {id:'n4-w2d4-03', level:'n4', week:2, day:4, cat:'usaha',
   grammar:'Vようにする', reading:'V-you ni suru',
   meaning:'Berusaha untuk... / Membuat kebiasaan... (usaha atau kebiasaan yang disengaja)',
   connection:'V辞書形/Vない形＋ようにする',
   desc:'Menyatakan <strong>usaha sadar atau kebiasaan yang sengaja dibentuk</strong>. にしている menunjukkan usaha yang sudah menjadi rutinitas.',
   nuance:'Perbedaan: ようにする = berusaha agar terjadi (proses). ことにする = memutuskan (keputusan satu kali). ようになる = sudah berubah (hasil).',
   examples:[
     {jp:'雪の日は、ちこくしない<b>ように</b>、早く家を出ます。', id:'Di hari bersalju, saya berangkat lebih awal agar tidak terlambat.'},
     {jp:'日本語のクラスでは、日本語だけを話す<b>ようにして</b>います。', id:'Di kelas bahasa Jepang, saya selalu berusaha berbicara hanya dalam bahasa Jepang.'},
     {jp:'毎食後、歯を磨く<b>ようにして</b>います。', id:'Saya membiasakan diri menggosok gigi setelah setiap makan.'}
   ]},

// ── 第2週 5日目 ── Demonstrativa & Cara
  {id:'n4-w2d5-01', level:'n4', week:2, day:5, cat:'demonstrativa',
   grammar:'こんな／そんな／あんな／どんなN', reading:'konna / sonna / anna / donna N',
   meaning:'Seperti ini/itu/itu (jauh)/bagaimana N (kata tunjuk kualitas/jenis)',
   connection:'こんな／そんな／あんな／どんな＋N',
   desc:'Kata tunjuk yang menyatakan <strong>jenis atau kualitas benda</strong>. こんな (seperti ini), そんな (seperti itu), あんな (seperti itu yang jauh/diketahui bersama), どんな (seperti apa).',
   nuance:'Ketika kedua pihak tahu apa yang dibicarakan, gunakan あんな/あそこ. Ketika hanya satu pihak tahu, gunakan そんな/そこ.',
   examples:[
     {jp:'A「これ、できる？」B「<b>そんな</b>こと、できないよ。」', id:'A: "Ini bisa?" B: "Hal seperti itu tidak bisa lah."'},
     {jp:'<b>どんな</b>音楽が好きですか。', id:'Kamu suka musik seperti apa?'},
     {jp:'<b>こんな</b>いい家に住みたいです。', id:'Saya ingin tinggal di rumah sebagus ini.'}
   ]},

  {id:'n4-w2d5-02', level:'n4', week:2, day:5, cat:'cara',
   grammar:'こう／そう／ああ／どうV', reading:'kou / sou / aa / dou V',
   meaning:'Dengan cara ini/itu/itu (jauh)/bagaimana melakukan',
   connection:'こう／そう／ああ／どう＋V',
   desc:'Kata keterangan yang menyatakan <strong>cara atau metode</strong>. こう (seperti ini), そう (seperti itu), ああ (seperti itu/begitu), どう (bagaimana).',
   nuance:'Digunakan ketika menunjukkan cara melakukan sesuatu. Berbeda dari こんな dll yang menerangkan benda.',
   examples:[
     {jp:'私も<b>そう</b>思います。', id:'Saya pun berpikir demikian.'},
     {jp:'A「これは漢字でどう書きますか。」B「<b>こう</b>書きます。」', id:'A: "Ini bagaimana menulisnya dalam kanji?" B: "Ditulis begini."'},
     {jp:'<b>どう</b>やってここに来ましたか。', id:'Bagaimana kamu datang ke sini?'}
   ]},

// ── 第2週 6日目 ── Saran & Perintah
  {id:'n4-w2d6-01', level:'n4', week:2, day:6, cat:'saran',
   grammar:'Vたほうがいい', reading:'V-ta hou ga ii',
   meaning:'Lebih baik... / Sebaiknya... (saran atau rekomendasi)',
   connection:'V〜た形＋ほうがいい／V〜ない形＋ほうがいい',
   desc:'Menyatakan <strong>saran atau rekomendasi</strong>. Vたほうがいい = sebaiknya lakukan. Vないほうがいい = sebaiknya jangan lakukan.',
   nuance:'Lebih langsung dari 〜てください. Sering dipakai saat memberi nasihat kepada orang lain. Bentuk negatif: Vないほうがいい.',
   examples:[
     {jp:'時間がないから、タクシーで行った<b>ほうがいいでしょう</b>。', id:'Karena tidak ada waktu, lebih baik pergi dengan taksi.'},
     {jp:'かぜをひいたときは、早く寝た<b>ほうがいいですよ</b>。', id:'Kalau kena flu, sebaiknya tidur lebih awal.'},
     {jp:'そんなあぶないところには、行かない<b>ほうがいい</b>よ。', id:'Sebaiknya jangan pergi ke tempat berbahaya seperti itu.'}
   ]},

  {id:'n4-w2d6-02', level:'n4', week:2, day:6, cat:'kutipan',
   grammar:'〜と言う／〜と思う', reading:'〜to iu / 〜to omou',
   meaning:'Berkata bahwa... / Berpikir bahwa... (kutipan dan pendapat)',
   connection:'普通形＋と言う／と思う',
   desc:'<strong>と言う</strong> menyatakan isi ucapan seseorang (kutipan). <strong>と思う</strong> menyatakan pendapat atau dugaan pembicara.',
   nuance:'って adalah bentuk kasual dari と. 「田中さんが来ないって言った」= Tanaka-san bilang tidak datang. 「田中さんはもう帰ったと思います」= Saya kira Tanaka-san sudah pulang.',
   examples:[
     {jp:'天気予報で、明日は寒い<b>と言っていました</b>。', id:'Di ramalan cuaca, katanya besok akan dingin.'},
     {jp:'田中さんはもう帰った<b>と思います</b>。', id:'Saya kira Tanaka-san sudah pulang.'},
     {jp:'試験に受かった<b>と思います</b>。', id:'Saya kira (saya) lulus ujian.'}
   ]},

  {id:'n4-w2d6-03', level:'n4', week:2, day:6, cat:'perintah',
   grammar:'命令形／禁止形', reading:'meireikei / kinshikei',
   meaning:'Bentuk perintah (lakukan!) / Bentuk larangan (jangan!)',
   connection:'V命令形（する→しろ、来る→来い）／V辞書形＋な',
   desc:'<strong>命令形</strong> adalah bentuk perintah langsung yang kuat. <strong>禁止形</strong> (Vな) adalah larangan tegas.',
   nuance:'Nuansa sangat kuat, terutama dipakai oleh laki-laki. Juga digunakan dalam sorak olahraga, tanda, atau poster. Bisa juga untuk menyampaikan ucapan orang lain: 〜と言われた.',
   examples:[
     {jp:'がんばれ！', id:'Semangat!'},
     {jp:'混ぜるな、危険！', id:'Jangan dicampur, berbahaya!'},
     {jp:'医者に、酒を飲む<b>な</b>と言われました。', id:'Dokter bilang kepada saya "jangan minum alkohol".'}
   ]},
];
