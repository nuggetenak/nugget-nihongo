// DATA — N3 第5週 (Soumatome N3 Bunpou)
// 24 pola grammar · Week 5 · もっとがんばればよかった！

const N3_W5 = [
// ── 第5週 1日目 ── はもちろん / ばかりか / に比べて / に対して
  {id:'n3-w5d1-01', level:'n3', week:5, day:1, cat:'penekanan',
   grammar:'〜はもちろん', reading:'〜wa mochiron',
   meaning:'... sudah tentu / Tidak hanya... tapi juga...',
   connection:'N₁はもちろんN₂も／[文]のはもちろん〜(も)',
   desc:'Menyatakan bahwa N₁ sudah jelas/pasti, dan <strong>N₂ pun demikian</strong>. "Bukan saja X, Y pun...".',
   nuance:'Mirip 〜だけでなく, tapi もちろん menegaskan bahwa poin pertama adalah hal yang sudah sangat wajar/jelas.',
   examples:[
     {jp:'彼は、勉強<b>はもちろん</b>スポーツもよくできる。', id:'Dia tidak hanya pandai belajar, tapi juga mahir olahraga.'},
     {jp:'キャベツは炒めて食べるの<b>はもちろん</b>、生で食べてもおいしいです。', id:'Kubis tidak hanya enak ditumis, dimakan mentah pun lezat.'}
   ]},

  {id:'n3-w5d1-02', level:'n3', week:5, day:1, cat:'penekanan',
   grammar:'〜ばかりか〜(も)', reading:'〜bakari ka〜(mo)',
   meaning:'Tidak hanya... bahkan... (juga)',
   connection:'V/A/na/N普通形＋ばかりか…(も)（na語幹な／N語幹）／ばかりでなく…(も)',
   desc:'Menyatakan bahwa <strong>tidak hanya satu hal, tapi hal lain yang lebih mengejutkan pun ikut terjadi</strong>. Nuansa lebih kuat dari ばかりでなく.',
   nuance:'Sering menyertai hal negatif atau mengejutkan. 〜ばかりでなく lebih netral dan bisa dipakai dalam konteks positif maupun negatif.',
   examples:[
     {jp:'あの店は、味が悪い<b>ばかりか</b>、店員の態度もひどい。', id:'Restoran itu tidak hanya makanannya buruk, pelayanannya pun parah.'},
     {jp:'私は、漢字<b>ばかりか</b>、まだひらがなも書けません。', id:'Saya tidak hanya tidak bisa kanji, hiragana pun belum bisa nulis.'}
   ]},

  {id:'n3-w5d1-03', level:'n3', week:5, day:1, cat:'perbandingan',
   grammar:'〜に比べて', reading:'〜ni kurabete',
   meaning:'Dibandingkan dengan...',
   connection:'Nに比べて／[文]のに比べて（れい: これ/それに比べて）',
   desc:'Menyatakan <strong>perbandingan</strong> antara dua hal. Setara dengan 〜より dalam banyak konteks, tapi 〜に比べて lebih eksplisit menunjuk objek perbandingan.',
   nuance:'〜より hanya menyatakan perbedaan derajat, sedangkan 〜に比べて lebih menekankan kontras yang jelas antara dua hal.',
   examples:[
     {jp:'試験問題は昨年<b>に比べて</b>易しくなった。', id:'Soal ujian menjadi lebih mudah dibandingkan tahun lalu.'},
     {jp:'店で買うの<b>に比べ</b>、通信販売は便利だが、欠点もある。', id:'Dibandingkan beli di toko, belanja online memang praktis, tapi ada kekurangannya juga.'}
   ]},

  {id:'n3-w5d1-04', level:'n3', week:5, day:1, cat:'kontras',
   grammar:'〜に対して', reading:'〜ni taishite',
   meaning:'Terhadap... / Berbeda dengan...',
   connection:'Nに／[文]のに対して／対し／対しては／対しても／対するN（れい: これ/それに対して）',
   desc:'Memiliki dua fungsi utama: (1) <strong>terhadap/kepada</strong> (menunjukkan objek dari suatu tindakan/sikap), dan (2) <strong>kontras</strong> antara dua hal yang berbeda.',
   nuance:'Saat menyatakan kontras, setara dengan 〜一方 (いっぽう). Saat menyatakan objek tindakan, mirip 〜に, tapi lebih formal.',
   examples:[
     {jp:'田中先生は、生徒<b>に対して</b>厳しい。', id:'Guru Tanaka sangat tegas terhadap murid-muridnya.'},
     {jp:'まじめな長男<b>に対して</b>、次男は遊んでばかりで学校もよく休む。', id:'Berbeda dengan anak sulung yang rajin, anak kedua hanya bermain dan sering tidak masuk sekolah.'}
   ]},

// ── 第5週 2日目 ── 書き上げる / 食べ切れない / 読みかけの本 / 焼きたてのパン
  {id:'n3-w5d2-01', level:'n3', week:5, day:2, cat:'aspek-kerja',
   grammar:'〜上げる／〜上がる', reading:'〜ageru / 〜agaru',
   meaning:'Menyelesaikan... dengan tuntas / selesai (sendiri)',
   connection:'V語幹＋上げる／上がる（れい: 書き上げる／編み上げる／作り上げる／調べ上げる／育て上げる）',
   desc:'Ditambahkan pada kata kerja untuk menyatakan bahwa pekerjaan itu <strong>diselesaikan hingga tuntas</strong>. 〜上げる = transitif (menyelesaikan). 〜上がる = intransitif (selesai dengan sendirinya).',
   nuance:'Menekankan penyelesaian total. Berbeda dari 〜終わる (selesai begitu saja), 〜上げる mengandung nuansa "akhirnya tuntas setelah proses".',
   examples:[
     {jp:'やっとレポートを書き<b>上げた</b>。', id:'Akhirnya laporan selesai kutulis sampai tuntas.'},
     {jp:'ケーキが焼き<b>上がりました</b>よ。', id:'Kuenya sudah matang sempurna!'}
   ]},

  {id:'n3-w5d2-02', level:'n3', week:5, day:2, cat:'aspek-kerja',
   grammar:'〜切る／〜切れる／〜切れない', reading:'〜kiru / 〜kireru / 〜kirenai',
   meaning:'Menghabiskan sama sekali / tidak bisa menghabiskan',
   connection:'V語幹＋切る／切れる／切れない（れい: 飲み切る／読み切る／走り切る／泳ぎ切る／売り切れる）',
   desc:'Menyatakan bahwa sesuatu <strong>digunakan/dilakukan secara penuh hingga tidak ada sisa</strong>. 〜切れない = tidak mampu menghabiskan/menyelesaikan semuanya.',
   nuance:'〜切った = sudah habis/tuntas. 〜切れない = tidak bisa tuntas. Juga bisa berarti kondisi ekstrem: 疲れ切った = kelelahan total.',
   examples:[
     {jp:'ご飯の量が多くて、食べ<b>切れない</b>よ。', id:'Nasinya terlalu banyak, tidak bisa dihabiskan.'},
     {jp:'長い小説を、2日間で読み<b>切った</b>。', id:'Novel panjang itu berhasil kuhabiskan dalam 2 hari.'}
   ]},

  {id:'n3-w5d2-03', level:'n3', week:5, day:2, cat:'aspek-kerja',
   grammar:'〜かける／〜かけの／〜かけだ', reading:'〜kakeru / 〜kake no / 〜kake da',
   meaning:'Sedang di tengah-tengah... / setengah selesai',
   connection:'V語幹＋かける／かけのN／かけだ（れい: 食べかける／帰りかける／落ちかける／失敗しかける）',
   desc:'Menyatakan bahwa sesuatu <strong>sudah mulai tapi belum selesai</strong>, atau hampir (tapi tidak jadi) melakukan sesuatu.',
   nuance:'〜かけのN = benda yang setengah jadi/dipakai. 〜かける juga bisa berarti "hampir melakukan" (seperti 倒れかけた = hampir jatuh).',
   examples:[
     {jp:'この本はまだ読み<b>かけだ</b>。', id:'Buku ini belum selesai dibaca.'},
     {jp:'おふろに入り<b>かけた</b>ときに電話が鳴った。', id:'Ketika mau masuk bak mandi, telepon berbunyi.'}
   ]},

  {id:'n3-w5d2-04', level:'n3', week:5, day:2, cat:'aspek-kerja',
   grammar:'〜たて／〜たての', reading:'〜tate / 〜tate no',
   meaning:'Baru saja selesai... / fresh dari...',
   connection:'V語幹＋たてのN／たてだ（れい: 炊きたて／ペンキ塗りたて／入社したて／習いたて）',
   desc:'Menyatakan bahwa sesuatu <strong>baru saja selesai dibuat/dilakukan</strong>, masih dalam kondisi paling segar. Nuansa positif — kesegarannya masih terasa.',
   nuance:'Hanya untuk hal-hal yang terasa lebih baik/menarik saat masih baru. ダメ: 読みたて、寝たて、食べたて (tidak digunakan karena tidak berkaitan dengan kesegaran positif).',
   examples:[
     {jp:'焼き<b>たての</b>パンはおいしい。', id:'Roti yang baru dipanggang memang enak.'},
     {jp:'あのスーパーは、とり<b>たての</b>新鮮な野菜を売っている。', id:'Supermarket itu menjual sayuran segar yang baru saja dipetik.'}
   ]},

// ── 第5週 3日目 ── といいなあ / ばよかった / ばよかったのに / かなあ
  {id:'n3-w5d3-01', level:'n3', week:5, day:3, cat:'harapan',
   grammar:'〜といいなあ／〜たらいいなあ', reading:'〜to ii naa / 〜tara ii naa',
   meaning:'Kalau saja bisa... / Mudah-mudahan... (harapan)',
   connection:'V/A/na/N普通形＋といい(のに)なあ／Vたら/Aたら/naなら/Nなら＋いいなあ／Vば/Aければ/naなら/Nなら＋いいなあ',
   desc:'Mengungkapkan <strong>harapan atau keinginan</strong> — sesuatu yang diinginkan terjadi tapi belum tentu bisa. Nada menginginkan dengan lembut.',
   nuance:'〜といいなあ sering untuk situasi yang agak tidak pasti. 〜てほしい lebih langsung. 〜たらいいなあ lebih kasual dan sering terdengar.',
   examples:[
     {jp:'もっと日本語がうまく話せる<b>といいなあ</b>。', id:'Kalau saja bisa berbicara bahasa Jepang lebih lancar...'},
     {jp:'明日、雨が降らない<b>といいなあ</b>。', id:'Mudah-mudahan besok tidak hujan.'}
   ]},

  {id:'n3-w5d3-02', level:'n3', week:5, day:3, cat:'penyesalan',
   grammar:'〜ばよかった／〜たらよかった', reading:'〜ba yokatta / 〜tara yokatta',
   meaning:'Seharusnya... / Andai saja dulu... (menyesal)',
   connection:'Vば／Vなければ／Vたら／Vなかったら＋よかった',
   desc:'Mengungkapkan <strong>penyesalan atas sesuatu yang sudah terjadi</strong> — menyesal melakukan atau tidak melakukan sesuatu di masa lalu.',
   nuance:'〜ばよかった = penyesalan karena TIDAK melakukan. 〜なければよかった = penyesalan karena SUDAH melakukan. Keduanya mengekspresikan 後悔 (後悔 = koukai = rasa menyesal).',
   examples:[
     {jp:'遅刻してしまった。もっと早く家を出れ<b>ばよかった</b>。', id:'Terlambat. Seharusnya berangkat lebih awal dari rumah.'},
     {jp:'田中さんにあんなことを言わなけれ<b>ばよかった</b>。', id:'Seharusnya tidak bilang hal itu ke Tanaka-san.'}
   ]},

  {id:'n3-w5d3-03', level:'n3', week:5, day:3, cat:'penyesalan',
   grammar:'〜ばよかったのに／〜たらよかったのに', reading:'〜ba yokatta no ni / 〜tara yokatta no ni',
   meaning:'Seharusnya kamu/dia... (sayang sekali tidak)',
   connection:'Vば／Vたら＋よかったのに',
   desc:'Mengungkapkan <strong>penyesalan atau kekecewaan</strong> — sering ditujukan kepada orang lain atau situasi. "Sayang sekali kamu tidak...". Mengandung nuansa kritik halus.',
   nuance:'〜ばよかった biasanya penyesalan diri sendiri, sedangkan 〜ばよかったのに sering untuk orang lain. のに memperkuat nuansa kekecewaan/menyayangkan.',
   examples:[
     {jp:'パーティー、楽しかったよ。君も行け<b>ばよかったのに</b>。', id:'Pesta itu seru. Sayang kamu tidak ikut datang.'},
     {jp:'安かったら買う<b>のに</b>。', id:'Kalau murah, pasti beli. (tapi mahal jadi tidak beli)'}
   ]},

  {id:'n3-w5d3-04', level:'n3', week:5, day:3, cat:'harapan',
   grammar:'〜かな（あ）', reading:'〜kana(a)',
   meaning:'Acuh/wondering... / Mudah-mudahan ya... (berharap-harap)',
   connection:'Vるかな（あ）／Vないかな（あ）',
   desc:'Mengungkapkan <strong>harapan yang agak tidak pasti atau rasa bertanya-tanya sendiri</strong>. Nuansa setengah berharap, setengah tidak yakin.',
   nuance:'〜かなあ lebih kasual dari 〜といいなあ. Bisa juga murni "penasaran/bertanya-tanya" bukan harapan, tergantung konteks.',
   examples:[
     {jp:'バス、早く来ない<b>かなあ</b>。', id:'Kapan ya busnya datang... (berharap cepat)'},
     {jp:'この実験、うまくいく<b>かな</b>。', id:'Apakah eksperimen ini akan berhasil ya?'}
   ]},

// ── 第5週 4日目 ── まで(V) / まで(N) / にかけて / において
  {id:'n3-w5d4-01', level:'n3', week:5, day:4, cat:'batas-waktu',
   grammar:'〜まで（動作の終点）', reading:'〜made (dousa no shuuten)',
   meaning:'Sampai... / Hingga... (batas waktu aksi)',
   connection:'Vるまで',
   desc:'Menyatakan <strong>titik akhir dari suatu aksi atau kondisi</strong> — terus berlangsung hingga titik tersebut tercapai.',
   nuance:'〜まで = sampai titik tertentu (aksi berlangsung sepanjang itu). Berbeda dari 〜までに = sebelum/paling lambat pada waktu tertentu (batas deadline).',
   examples:[
     {jp:'映画が始まる<b>まで</b>30分あります。', id:'Masih ada 30 menit sampai filmnya mulai.'},
     {jp:'連絡がある<b>まで</b>待っています。', id:'Akan terus menunggu sampai ada kabar.'}
   ]},

  {id:'n3-w5d4-02', level:'n3', week:5, day:4, cat:'penekanan',
   grammar:'〜まで（極端な例）', reading:'〜made (kyokutan na rei)',
   meaning:'Bahkan... pun / Sampai-sampai... (contoh ekstrem)',
   connection:'Nまで',
   desc:'Digunakan untuk <strong>memberi contoh yang ekstrem</strong> guna menunjukkan betapa luar biasanya sesuatu. Nuansa terkejut atau menekankan intensitas.',
   nuance:'Sama bentuknya dengan まで sebagai batas waktu, tapi artinya berbeda. Kombinasi dengan 〜それまで、〜そこまで memperkuat nuansa mengejutkan.',
   examples:[
     {jp:'この魚は骨<b>まで</b>食べられますよ。', id:'Ikan ini bahkan tulangnya pun bisa dimakan.'},
     {jp:'あなた<b>まで</b>私を疑うのですか。', id:'Bahkan kamu pun tidak mempercayaiku?'}
   ]},

  {id:'n3-w5d4-03', level:'n3', week:5, day:4, cat:'rentang',
   grammar:'〜にかけて', reading:'〜ni kakete',
   meaning:'Dari... hingga... (rentang waktu/tempat)',
   connection:'N₁からN₂にかけて（N: 時・場所）',
   desc:'Menyatakan <strong>rentang waktu atau tempat</strong> — berlangsung sepanjang dari titik A sampai titik B. Lebih menekankan kesinambungan dalam rentang tersebut.',
   nuance:'〜から〜まで menyatakan batas yang lebih tegas. 〜から〜にかけて menekankan area/periode yang mencakup keduanya (tidak perlu tepat sampai titik B).',
   examples:[
     {jp:'明日は昼から夕方<b>にかけて</b>雨でしょう。', id:'Besok akan hujan dari siang hingga sore.'},
     {jp:'九州から本州<b>にかけて</b>梅雨入りしました。', id:'Musim hujan telah tiba di wilayah dari Kyushu hingga Honshu.'}
   ]},

  {id:'n3-w5d4-04', level:'n3', week:5, day:4, cat:'formal',
   grammar:'〜において／〜における', reading:'〜ni oite / 〜ni okeru',
   meaning:'Di... / Dalam... (konteks formal)',
   connection:'Nにおいて／においては／においても／におけるN',
   desc:'Versi formal dari 〜で atau 〜での. Menyatakan <strong>tempat, waktu, atau bidang di mana sesuatu terjadi</strong>. Sering muncul dalam tulisan resmi, berita, dan dokumen.',
   nuance:'〜において lebih formal dan tertulis. Dalam percakapan sehari-hari digantikan oleh 〜で. Jika terdengar terlalu kaku dalam percakapan, gunakan で saja.',
   examples:[
     {jp:'大阪<b>において</b>、国際会議が行われた。', id:'Konferensi internasional diadakan di Osaka.'},
     {jp:'結果はホームページ<b>において</b>発表されます。', id:'Hasilnya akan diumumkan di homepage.'}
   ]},

// ── 第5週 5日目 ── たとえ〜ても / もしかすると / 必ずしも〜とは限らない / まるで
  {id:'n3-w5d5-01', level:'n3', week:5, day:5, cat:'konsesi',
   grammar:'たとえ〜ても', reading:'tatoe〜te mo',
   meaning:'Sekalipun... / Meski... pun tetap saja...',
   connection:'たとえ＋Vても／Aくても／naでも／Nでも',
   desc:'Menyatakan <strong>kondisi yang ekstrem sekalipun, hasilnya tetap tidak berubah</strong>. "Bahkan dalam kondisi X pun, Y tetap dilakukan/terjadi."',
   nuance:'たとえ memperkuat nuansa "apapun yang terjadi". Bisa dipakai tanpa たとえ, tapi たとえ membuat pernyataan lebih tegas dan dramatis.',
   examples:[
     {jp:'<b>たとえ</b>反対され<b>ても</b>留学します。', id:'Sekalipun ditentang, saya tetap akan belajar ke luar negeri.'},
     {jp:'<b>たとえ</b>元気じゃなく<b>ても</b>、家族への手紙には元気だと書きます。', id:'Sekalipun kondisi tidak baik, dalam surat untuk keluarga tetap kutulis bahwa aku baik-baik saja.'}
   ]},

  {id:'n3-w5d5-02', level:'n3', week:5, day:5, cat:'kemungkinan',
   grammar:'もしかすると／もしかしたら〜かもしれない', reading:'moshikasuruto / moshikashitara〜kamoshirenai',
   meaning:'Mungkin saja... / Bisa jadi... (kemungkinan)',
   connection:'もしかすると／もしかしたら＋V/A/na/N普通形＋かもしれない（na幹／na幹na）',
   desc:'Menyatakan <strong>kemungkinan yang tidak pasti</strong> — pembicara menduga sesuatu mungkin benar tapi tidak yakin. Biasanya berpasangan dengan 〜かもしれない.',
   nuance:'もしかすると ≈ もしかしたら, keduanya berarti sama. もしかして lebih kasual. Semua menyatakan dugaan yang lebih lemah dari 〜だろう.',
   examples:[
     {jp:'<b>もしかすると</b>彼の話はうそ<b>かもしれない</b>。', id:'Bisa jadi ceritanya bohong.'},
     {jp:'<b>もしかしたら</b>、明日行けない<b>かもしれません</b>。', id:'Mungkin saja besok saya tidak bisa pergi.'}
   ]},

  {id:'n3-w5d5-03', level:'n3', week:5, day:5, cat:'penyangkalan',
   grammar:'必ずしも〜とは限らない', reading:'kanarazushimo〜to wa kagiranai',
   meaning:'Belum tentu... / Tidak selalu...',
   connection:'必ずしも＋V/A/na/N普通形＋とは限らない（N幹／na幹）',
   desc:'Menyatakan bahwa <strong>sesuatu yang dianggap selalu benar ternyata tidak selalu demikian</strong>. Mengkritik asumsi umum dengan nuansa "tidak bisa dipukul rata".',
   nuance:'必ずしも HARUS diikuti bentuk negatif. 〜とは限らない = tidak bisa dipastikan. Bisa juga: 必ずしも正しいとはいえない (tidak bisa dikatakan selalu benar).',
   examples:[
     {jp:'（お）金持ちが<b>必ずしも</b>幸福だ<b>とは限らない</b>。', id:'Orang kaya belum tentu bahagia.'},
     {jp:'高いものが<b>必ずしも</b>いいものだ<b>とは限らない</b>。', id:'Barang mahal belum tentu yang terbaik.'}
   ]},

  {id:'n3-w5d5-04', level:'n3', week:5, day:5, cat:'perumpamaan',
   grammar:'まるで〜のよう／〜みたい', reading:'marude〜no you / 〜mitai',
   meaning:'Seperti / Bagaikan / Seolah-olah...',
   connection:'まるで＋NのようN／V普通形ように／V/A/na/N普通形みたい（na幹na）',
   desc:'Menyatakan <strong>perbandingan yang kuat atau perumpamaan</strong>. "Benar-benar seperti X" — menegaskan betapa miripnya sesuatu dengan hal lain.',
   nuance:'まるで memperkuat perumpamaan. Tanpa まるで bisa dipakai tapi kurang penekanan. 〜のよう formal, 〜みたい kasual. Keduanya bisa dipakai setelah まるで.',
   examples:[
     {jp:'合格した！<b>まるで</b>夢<b>のようだ</b>。', id:'Lulus! Rasanya seperti mimpi.'},
     {jp:'彼の日本語は<b>まるで</b>日本人が話している<b>みたいに</b>聞こえる。', id:'Bahasa Jepangnya terdengar seperti orang Jepang asli yang bicara.'}
   ]},

// ── 第5週 6日目 ── だけど / ですから / ところが / ところで
  {id:'n3-w5d6-01', level:'n3', week:5, day:6, cat:'konjungsi',
   grammar:'〜。だけど、〜', reading:'〜。dakedo、〜',
   meaning:'... Tapi... / ... Namun... (kontras, kasual)',
   connection:'a。だけど b。（＝けれども／しかし）　a⇔b',
   desc:'Konjungsi <strong>kontras kasual</strong> yang menghubungkan dua kalimat yang berlawanan. Versi santai dari けれども/しかし.',
   nuance:'だけど kasual, digunakan dalam percakapan sehari-hari. Formalnya: しかし、けれども、ですが. だけど biasa di antara teman atau dalam tulisan informal.',
   examples:[
     {jp:'旅行に行きたい。<b>だけど</b>ひまがない。', id:'Mau pergi liburan. Tapi tidak ada waktu luang.'},
     {jp:'よくカラオケに行く。<b>だけど</b>歌は下手だ。', id:'Sering pergi karaoke. Tapi nyanyinya jelek.'}
   ]},

  {id:'n3-w5d6-02', level:'n3', week:5, day:6, cat:'konjungsi',
   grammar:'〜。ですから、〜', reading:'〜。desu kara、〜',
   meaning:'... Oleh karena itu... / ... Makanya... (sopan)',
   connection:'a〈理由/原因〉。ですから b〈当然の結果/判断〉。（「だから」を丁寧に言う）',
   desc:'Konjungsi <strong>sebab-akibat yang sopan</strong>. Kalimat pertama (a) adalah alasan/sebab, kalimat kedua (b) adalah hasil logis yang wajar. Versi formal dari だから.',
   nuance:'ですから lebih sopan dari だから. Dalam tulisan formal atau situasi resmi, pakai したがって/そのため. だから lebih kasual.',
   examples:[
     {jp:'「天気予報では午後から雨だそうです。<b>ですから</b>、傘を持っていったほうがいいですよ。」', id:'"Kata prakiraan cuaca, katanya sore akan hujan. Makanya, lebih baik bawa payung."'},
     {jp:'明日から旅行に行きます。<b>ですから</b>、申し訳ありませんが、来週のパーティーには出席できません。', id:'Besok saya berangkat traveling. Makanya, mohon maaf, saya tidak bisa hadir di pesta minggu depan.'}
   ]},

  {id:'n3-w5d6-03', level:'n3', week:5, day:6, cat:'konjungsi',
   grammar:'〜。ところが、〜', reading:'〜。tokoro ga、〜',
   meaning:'... Namun ternyata... / ... Tapi (di luar dugaan)...',
   connection:'a〈予想/予定〉。ところが b〈予想外の結果/事実〉。',
   desc:'Menghubungkan dua kalimat di mana kalimat kedua adalah <strong>hasil yang tidak terduga/berlawanan dengan ekspektasi</strong>. "Mengira A, tapi ternyata B."',
   nuance:'ところが selalu menyatakan hasil yang mengejutkan/tidak sesuai harapan. Berbeda dari しかし (kontras biasa) — ところが mengandung unsur kejutan.',
   examples:[
     {jp:'昨夜はコンサートに行くつもりだった。<b>ところが</b>病気で行けなくなった。', id:'Semalam berniat pergi ke konser. Namun ternyata sakit dan tidak bisa pergi.'},
     {jp:'田中さんは私より若いと思っていた。<b>ところが</b>私より5歳も年上だった。', id:'Kukira Tanaka-san lebih muda dariku. Ternyata 5 tahun lebih tua.'}
   ]},

  {id:'n3-w5d6-04', level:'n3', week:5, day:6, cat:'konjungsi',
   grammar:'〜。ところで、〜', reading:'〜。tokoro de、〜',
   meaning:'... Ngomong-ngomong... / ... Eh, by the way...',
   connection:'a。ところで b。（話題を換えるときに使う）',
   desc:'Digunakan untuk <strong>mengalihkan topik pembicaraan</strong> ke hal yang baru/berbeda. "Sudah itu, ada satu lagi yang mau ditanyakan...".',
   nuance:'ところで = mengalihkan topik. Jangan bingung dengan ところが (kontras/kejutan). ところで tidak menyatakan kontras, hanya perpindahan topik.',
   examples:[
     {jp:'「明日、試験でしょ。がんばってね。<b>ところで</b>、来週の月曜日は空いてる？」', id:'"Besok ujian kan. Semangat ya. Ngomong-ngomong, minggu depan Senin ada waktu?"'},
     {jp:'もうすぐ、今年も終わりですね。<b>ところで</b>、お正月はどうなさいますか。', id:'Tak terasa tahun ini hampir berakhir. Ngomong-ngomong, rencana Tahun Baru bagaimana?'}
   ]},
];
