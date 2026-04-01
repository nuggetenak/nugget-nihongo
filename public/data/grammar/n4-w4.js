// DATA — N4 第4週 (Soumatome N4 Bunpou)
// Week 4 · 夏休みになったら、国に帰ります。
// Kondisional, Dugaan, Kemudahan, Pasif-Kausatif, Keadaan Hasil

const N4_W4 = [

// ── 第4週 1日目 ── Kondisional
  {id:'n4-w4d1-01', level:'n4', week:4, day:1, cat:'kondisional',
   grammar:'〜たら', reading:'〜tara',
   meaning:'Kalau... / Setelah... / Jika... (kondisi yang menjadi pemicu)',
   connection:'V〜た形＋ら / い形〜かったら / な形だったら / Nだったら',
   desc:'Menyatakan <strong>kondisi atau urutan waktu</strong>. Klausa kedua terjadi setelah atau karena klausa pertama.',
   nuance:'〜たら fleksibel: bisa untuk kondisi hipotetis, urutan waktu (setelah), atau kondisi nyata. Klausa kedua tidak bisa berisi kalimat masa lalu yang berulang.',
   examples:[
     {jp:'夏休みに<b>なったら</b>、国に帰ります。', id:'Kalau sudah masuk liburan musim panas, saya akan pulang ke negara asal.'},
     {jp:'お湯が<b>わいたら</b>、めんを入れてください。', id:'Kalau airnya sudah mendidih, masukkan mie-nya.'},
     {jp:'もし<b>受かったら</b>、どうしますか。', id:'Kalau lulus, kamu mau ngapain?'}
   ]},

  {id:'n4-w4d1-02', level:'n4', week:4, day:1, cat:'kondisional',
   grammar:'〜ば', reading:'〜ba',
   meaning:'Kalau... maka... (kondisi yang cukup untuk hasil)',
   connection:'V〜えば形 / い形〜ければ / な形＋なら(ば) / Nなら(ば)',
   desc:'Menyatakan <strong>kondisi yang cukup untuk menghasilkan sesuatu</strong>. Sering dipakai untuk saran atau kondisi hipotetis.',
   nuance:'〜ば lebih formal dari たら. Sering dalam ekspresi: 〜ばよかった (seharusnya), 〜といい/〜ばいい (akan lebih baik kalau). Tidak bisa untuk kondisi yang sudah pasti terjadi.',
   examples:[
     {jp:'試験に<b>受かれば</b>、うれしいです。', id:'Kalau lulus ujian, saya akan senang.'},
     {jp:'安<b>ければ</b>、買います。', id:'Kalau murah, saya beli.'},
     {jp:'もっと早く起き<b>ればよかった</b>。', id:'Seharusnya bangun lebih awal tadi.'}
   ]},

  {id:'n4-w4d1-03', level:'n4', week:4, day:1, cat:'kondisional',
   grammar:'〜なら', reading:'〜nara',
   meaning:'Kalau soal... / Kalau memang... (kondisi berbasis topik atau asumsi)',
   connection:'V普通形／い形／な形／N＋なら',
   desc:'Menyatakan kondisi berdasarkan <strong>informasi yang sudah diketahui atau asumsi</strong>. Sering untuk saran berdasarkan situasi orang lain.',
   nuance:'なら digunakan ketika merespons informasi yang baru diterima. Tidak bisa diganti dengan たら/ば untuk kondisi yang natural terjadi dengan sendirinya.',
   examples:[
     {jp:'コンビニへ<b>行くなら</b>、サンドイッチを買ってきてください。', id:'Kalau kamu mau pergi ke konbini, tolong belikan sandwich.'},
     {jp:'ラーメン<b>なら</b>、駅前のラーメン屋がおいしいですよ。', id:'Kalau soal ramen, ramen di depan stasiun itu enak.'},
     {jp:'A「頭が痛いんです。」B「<b>なら</b>、早く帰ったほうがいいですよ。」', id:'A: "Kepala saya sakit." B: "Kalau begitu, lebih baik pulang lebih awal."'}
   ]},

  {id:'n4-w4d1-04', level:'n4', week:4, day:1, cat:'kondisional',
   grammar:'〜といい／〜たらいい／〜ばいい', reading:'〜to ii / 〜tara ii / 〜ba ii',
   meaning:'Akan bagus kalau... / Sebaiknya... (harapan atau saran)',
   connection:'V普通形＋といいですね／Vたら/ば＋いい(んじゃない)',
   desc:'Menyatakan <strong>harapan atau saran yang lebih lunak</strong>. 〜といいですね = semoga saja, 〜たらいい/ばいい = sebaiknya (saran).',
   nuance:'〜といいですね = berharap semoga (untuk orang lain). 〜たらいい？ / 〜ばいい？ = sebaiknya bagaimana (meminta saran). 〜たらいいですよ = sarankan sesuatu.',
   examples:[
     {jp:'頭が痛いとき、この薬を飲む<b>といいです</b>よ。', id:'Kalau kepala sakit, minum obat ini bagus.'},
     {jp:'仕事が早く見つかっ<b>たらいいですね</b>。', id:'Semoga cepat dapat pekerjaan ya.'},
     {jp:'A「どうすれ<b>ばいいですか</b>。」B「先生に相談したらいいですよ。」', id:'A: "Sebaiknya saya bagaimana?" B: "Sebaiknya konsultasi ke sensei."'}
   ]},

// ── 第4週 2日目 ── Dugaan & Penampilan
  {id:'n4-w4d2-01', level:'n4', week:4, day:2, cat:'dugaan',
   grammar:'〜ようだ／みたいだ', reading:'〜you da / mitai da',
   meaning:'Sepertinya... / Kayaknya... (dugaan berdasarkan pengamatan)',
   connection:'V普通形／い形／な形な＋ようだ／みたいだ',
   desc:'Menyatakan <strong>dugaan atau kesimpulan berdasarkan bukti atau pengamatan</strong>. みたいだ lebih kasual dari ようだ.',
   nuance:'ようだ lebih formal/tertulis. みたいだ lebih kasual. Keduanya berdasarkan pengamatan langsung pembicara.',
   examples:[
     {jp:'道路がぬれているから、雨が降った<b>ようですね</b>。', id:'Karena jalan basah, sepertinya tadi hujan ya.'},
     {jp:'このパソコン、変です。こわれている<b>みたいです</b>。', id:'Laptop ini aneh. Sepertinya rusak.'},
     {jp:'A「田中さん、元気そうですね。」B「そう<b>みたい</b>ですね。」', id:'A: "Tanaka-san kelihatan sehat ya." B: "Kayaknya begitu ya."'}
   ]},

  {id:'n4-w4d2-02', level:'n4', week:4, day:2, cat:'dugaan',
   grammar:'〜そうだ (penampilan)', reading:'〜sou da (penampilan)',
   meaning:'Kelihatan... / Sepertinya akan... (berdasarkan penampilan)',
   connection:'V〜ます形(除ます)／い形(除い)／な形(除な)＋そうだ',
   desc:'<strong>①</strong> Menyatakan dugaan berdasarkan <strong>penampilan yang dilihat langsung</strong>. <strong>②</strong> Menyatakan <strong>informasi yang didengar dari orang lain</strong>.',
   nuance:'Dua makna: ① melihat langsung (元気そう = kelihatan sehat), ② dengar dari orang lain (元気だそう = katanya sehat). Perubahan khusus: いい→よさそう, ない→なさそう.',
   examples:[
     {jp:'元気<b>そうな</b>赤ちゃんですね。', id:'Bayinya kelihatan sehat ya.'},
     {jp:'明日は天気がよさ<b>そうです</b>よ。', id:'Besok cuacanya kelihatan akan bagus.'},
     {jp:'天気予報によると、午後から雨が降る<b>そうです</b>よ。', id:'Menurut ramalan cuaca, katanya dari sore akan hujan.'}
   ]},

  {id:'n4-w4d2-03', level:'n4', week:4, day:2, cat:'dugaan',
   grammar:'〜でしょう／だろう', reading:'〜deshou / darou',
   meaning:'Mungkin... / Kira-kira... (perkiraan atau dugaan)',
   connection:'V普通形／い形／な形／N＋でしょう／だろう',
   desc:'Menyatakan <strong>perkiraan atau dugaan</strong> pembicara. でしょう lebih sopan, だろう lebih kasual.',
   nuance:'でしょう? (dengan intonasi naik) digunakan untuk konfirmasi: "kan?/ya kan?". Berbeda dari そうだ yang berdasarkan bukti.',
   examples:[
     {jp:'トムさんはたぶん試験に受かる<b>でしょう</b>。', id:'Mungkin Tom akan lulus ujian.'},
     {jp:'弟はもうすぐ結婚する<b>だろう</b>。', id:'Adik laki-lakiku mungkin akan menikah dalam waktu dekat.'},
     {jp:'今日は午後から雨が降る<b>でしょう</b>。', id:'Hari ini mungkin akan hujan dari sore.'}
   ]},

// ── 第4週 3日目 ── Terlalu & Kemudahan
  {id:'n4-w4d3-01', level:'n4', week:4, day:3, cat:'derajat',
   grammar:'〜すぎる', reading:'〜sugiru',
   meaning:'Terlalu... / Sangat berlebihan... (melampaui batas yang tepat)',
   connection:'V〜ます形(除ます)＋すぎる / い形(除い)＋すぎる / な形(除な)＋すぎる',
   desc:'Menyatakan bahwa sesuatu <strong>melampaui batas yang wajar atau seharusnya</strong>. Selalu mengandung nuansa negatif atau berlebihan.',
   nuance:'Selalu negatif (berlebihan, tidak sesuai). Perubahan: 飲みすぎる, 高すぎる, 静かすぎる. Bentuk -te: すぎて+akibat.',
   examples:[
     {jp:'きのう、お酒を飲み<b>すぎて</b>、頭がいたい。', id:'Kemarin minum terlalu banyak, kepala saya sakit.'},
     {jp:'漢字は多<b>すぎて</b>、覚えられません。', id:'Kanjinya terlalu banyak, tidak bisa hafal.'},
     {jp:'このぼうしは私には小さ<b>すぎます</b>。', id:'Topi ini terlalu kecil untuk saya.'}
   ]},

  {id:'n4-w4d3-02', level:'n4', week:4, day:3, cat:'kemudahan',
   grammar:'Vやすい', reading:'V-yasui',
   meaning:'Mudah untuk... / Gampang... (mudah dilakukan atau mudah terjadi)',
   connection:'V〜ます形(除ます)＋やすい',
   desc:'<strong>①</strong> Sesuatu <strong>mudah untuk dilakukan</strong>. <strong>②</strong> Mudah/cepat terjadi (kecenderungan).',
   nuance:'Berubah seperti い-adjective: やすい→やすくない→やすかった. Makna ②: ワイングラスは割れやすい = gelas wine mudah pecah (kecenderungan).',
   examples:[
     {jp:'田中先生の説明はわかり<b>やすいです</b>。', id:'Penjelasan sensei Tanaka mudah dipahami.'},
     {jp:'この靴は履き<b>やすい</b>。', id:'Sepatu ini nyaman/mudah dipakai.'},
     {jp:'そのワイングラスはうすくて割れ<b>やすい</b>から、気をつけて。', id:'Gelas wine itu tipis dan mudah pecah, jadi hati-hati.'}
   ]},

  {id:'n4-w4d3-03', level:'n4', week:4, day:3, cat:'kemudahan',
   grammar:'Vにくい', reading:'V-nikui',
   meaning:'Sulit untuk... / Susah... (tidak mudah dilakukan)',
   connection:'V〜ます形(除ます)＋にくい',
   desc:'<strong>①</strong> Sesuatu <strong>sulit untuk dilakukan</strong>. <strong>②</strong> Tidak mudah terjadi.',
   nuance:'Berlawanan dengan やすい. Perubahan seperti い-adjective: にくい→にくくない→にくかった.',
   examples:[
     {jp:'この地図は、小さくてわかり<b>にくいです</b>。', id:'Peta ini kecil dan susah dipahami.'},
     {jp:'カタカナが多いと、読み<b>にくい</b>。', id:'Kalau banyak katakana, susah dibaca.'},
     {jp:'この紙はじょうぶで、やぶれ<b>にくい</b>。', id:'Kertas ini kuat dan tidak mudah robek.'}
   ]},

// ── 第4週 4日目 ── Pasif, Kausatif, Kausatif-Pasif
  {id:'n4-w4d4-01', level:'n4', week:4, day:4, cat:'pasif',
   grammar:'Vられる (pasif)', reading:'V-rareru (pasif)',
   meaning:'Di... / Kena... (bentuk pasif — tindakan diterima subjek)',
   connection:'Grup1: V〜あれる / Grup2: V〜られる / する→される / くる→こられる',
   desc:'Bentuk pasif menyatakan bahwa <strong>subjek menerima tindakan</strong> dari orang/hal lain. Juga digunakan untuk menyatakan fakta umum tanpa menyebut pelaku.',
   nuance:'Pasif penderita (受身) vs pasif fakta umum. Pasif penderita sering dengan nuansa negatif (terpaksa/merugi). Fakta umum: その歌は世界中で歌われています.',
   examples:[
     {jp:'私はよく母に<b>しかられました</b>。', id:'Saya sering dimarahi ibu.'},
     {jp:'外国人に道を<b>聞かれました</b>。', id:'Saya ditanya arah oleh orang asing.'},
     {jp:'入学式は、このホールで<b>行われます</b>。', id:'Upacara masuk sekolah akan dilaksanakan di aula ini.'}
   ]},

  {id:'n4-w4d4-02', level:'n4', week:4, day:4, cat:'kausatif',
   grammar:'Vさせる (kausatif)', reading:'V-saseru (kausatif)',
   meaning:'Menyuruh/membiarkan... melakukan (membuat orang lain melakukan)',
   connection:'Grup1: V〜あせる / Grup2: V〜させる / する→させる / くる→こさせる',
   desc:'Bentuk kausatif menyatakan bahwa subjek <strong>memaksa atau mengizinkan</strong> orang lain melakukan sesuatu.',
   nuance:'Dua makna: ① memaksa (社長は社員をやめさせた = direktur memaksa karyawan berhenti) ② mengizinkan (ここで練習させてください = tolong izinkan saya latihan di sini).',
   examples:[
     {jp:'社長は、ちこくが多い社員を<b>やめさせました</b>。', id:'Direktur memecat karyawan yang sering terlambat.'},
     {jp:'公園で犬を<b>走らせましょう</b>。', id:'Mari biarkan anjing berlari di taman.'},
     {jp:'ちょっと気分が悪いので、早く帰ら<b>せてください</b>。', id:'Karena saya sedikit tidak enak badan, tolong izinkan saya pulang lebih awal.'}
   ]},

  {id:'n4-w4d4-03', level:'n4', week:4, day:4, cat:'kausatif-pasif',
   grammar:'Vさせられる (kausatif-pasif)', reading:'V-saserareru (kausatif-pasif)',
   meaning:'Terpaksa...(oleh orang lain) / Dipaksa untuk... (dipaksa melakukan sesuatu)',
   connection:'Grup1: V〜あせられる / Grup2: V〜させられる / する→させられる',
   desc:'Menggabungkan kausatif dan pasif — menyatakan bahwa <strong>subjek terpaksa melakukan sesuatu</strong> atas perintah atau tekanan orang lain.',
   nuance:'Selalu berkonotasi negatif — seseorang tidak mau tapi terpaksa. Grup 1 bisa disingkat: 飲まさせられる→飲まされる.',
   examples:[
     {jp:'子どものころ、毎日母に野菜を食べ<b>させられました</b>。', id:'Waktu kecil, setiap hari saya dipaksa ibu untuk makan sayuran.'},
     {jp:'私は大きい失敗をして、会社を<b>やめさせられました</b>。', id:'Saya melakukan kesalahan besar dan terpaksa berhenti dari perusahaan.'},
     {jp:'先生に1時間立って<b>いさせられました</b>。', id:'Saya dipaksa guru untuk berdiri selama 1 jam.'}
   ]},

// ── 第4週 5日目 ── Kata Kerja Transitif/Intransitif & Keadaan Hasil
  {id:'n4-w4d5-01', level:'n4', week:4, day:5, cat:'transitif-intransitif',
   grammar:'他動詞／自動詞', reading:'tadoushi / jidoushi',
   meaning:'Kata kerja transitif (butuh objek) vs intransitif (tidak butuh objek)',
   connection:'他動詞: 〈人が〉＋Nを＋V / 自動詞: Nが＋V',
   desc:'<strong>他動詞</strong> (transitif) membutuhkan objek dengan を — seseorang melakukan sesuatu pada benda. <strong>自動詞</strong> (intransitif) tidak butuh objek — benda/peristiwa terjadi sendiri.',
   nuance:'Pasangan umum: 開ける(ta)↔開く(ji), 閉める(ta)↔閉まる(ji), 消す(ta)↔消える(ji), 始める(ta)↔始まる(ji). Transitif untuk aksi manusia, intransitif untuk kondisi/peristiwa.',
   examples:[
     {jp:'危ないから、ろうそくを<b>消します</b>よ。／ろうそくの火が<b>消えました</b>。', id:'Karena berbahaya, saya matikan lilin. / Api lilin padam.'},
     {jp:'ドアを<b>閉めて</b>ください。／駅でドアが<b>閉まります</b>。', id:'Tolong tutup pintunya. / Pintu menutup di stasiun.'},
     {jp:'さあ、授業を<b>始めましょう</b>。／毎日9時に授業が<b>始まります</b>。', id:'Ayo kita mulai pelajaran. / Pelajaran dimulai jam 9 setiap hari.'}
   ]},

  {id:'n4-w4d5-02', level:'n4', week:4, day:5, cat:'keadaan-hasil',
   grammar:'V(自動詞)ている (keadaan hasil)', reading:'V(jidoushi) te iru',
   meaning:'(Sudah) dalam keadaan... (kondisi yang merupakan hasil dari suatu peristiwa)',
   connection:'自動詞V〜て形＋いる',
   desc:'Dengan kata kerja intransitif, Vている menyatakan <strong>kondisi yang ada sebagai hasil dari perubahan</strong> yang sudah terjadi.',
   nuance:'Berbeda dari Vている yang menyatakan tindakan berkelanjutan. Contoh: 窓が開いている (jendela [sudah] terbuka = kondisi sekarang), vs 窓を開けている (sedang membuka jendela = aksi).',
   examples:[
     {jp:'会議室は、かぎが<b>かかっています</b>。', id:'Ruang rapat terkunci.'},
     {jp:'弟は今、出かけて<b>います</b>。', id:'Adik saya sedang pergi (tidak ada di rumah sekarang).'},
     {jp:'宿題はまだ終わって<b>いません</b>。', id:'PR belum selesai.'}
   ]},

  {id:'n4-w4d5-03', level:'n4', week:4, day:5, cat:'keadaan-hasil',
   grammar:'V(他動詞)てある', reading:'V(tadoushi) te aru',
   meaning:'Sudah di... / Sudah disiapkan... (kondisi karena seseorang telah melakukan sesuatu dengan tujuan)',
   connection:'他動詞V〜て形＋ある',
   desc:'Dengan kata kerja transitif, Vてある menyatakan bahwa <strong>seseorang telah melakukan tindakan itu dengan tujuan</strong>, dan kondisi hasilnya masih ada.',
   nuance:'Berbeda dari Vている (sekadar kondisi). Vてある mengandung makna "ada yang melakukan dengan sengaja". Contoh: 窓が開けてある = jendela sengaja dibuka oleh seseorang.',
   examples:[
     {jp:'テーブルの上に花が<b>かざってあります</b>。', id:'Di atas meja sudah dihias bunga.'},
     {jp:'おさらは、ぜんぶ洗って<b>あります</b>。', id:'Semua piring sudah dicuci.'},
     {jp:'その本には、使い方が書いて<b>ありません</b>。', id:'Di buku itu tidak ada petunjuk cara pemakaiannya.'}
   ]},

// ── 第4週 6日目 ── Penjelasan & Partikel Akhir
  {id:'n4-w4d6-01', level:'n4', week:4, day:6, cat:'penjelasan',
   grammar:'〜んです／〜のです', reading:'〜n desu / 〜no desu',
   meaning:'Sebenarnya.../Soalnya... (memberikan penjelasan atau meminta penjelasan)',
   connection:'V普通形／い形／な形な／N＋んです／のです',
   desc:'Digunakan ketika <strong>memberikan penjelasan, alasan, atau konteks</strong> untuk suatu situasi. Juga untuk meminta penjelasan orang lain.',
   nuance:'〜んです lebih kasual dari 〜のです. 〜んですか? = meminta penjelasan. 〜んです = memberikan penjelasan/konteks. Percakapan sehari-hari menggunakan ん lebih banyak.',
   examples:[
     {jp:'A「どうしてパーティーに行かないんですか。」B「ちょっと頭がいたい<b>んです</b>。」', id:'A: "Kenapa tidak pergi ke pesta?" B: "Soalnya kepala saya sedikit sakit."'},
     {jp:'どうして食べない<b>んですか</b>。', id:'Memangnya kenapa tidak makan?'},
     {jp:'電車に乗り遅れた<b>んです</b>。だから、遅くなりました。', id:'Soalnya saya ketinggalan kereta. Makanya terlambat.'}
   ]},

  {id:'n4-w4d6-02', level:'n4', week:4, day:6, cat:'partikel-akhir',
   grammar:'〜なあ', reading:'〜naa',
   meaning:'Wah... / ...ya... (mengungkapkan perasaan atau kekaguman, sering monolog)',
   connection:'V普通形／い形／な形だ＋なあ',
   desc:'Partikel akhir yang menyatakan <strong>perasaan, kekaguman, atau keinginan</strong> pembicara. Sering digunakan dalam monolog atau bicara sendiri.',
   nuance:'Lebih sering digunakan oleh laki-laki. ね untuk konfirmasi ke orang lain, なあ untuk ekspresi pribadi/monolog.',
   examples:[
     {jp:'試験、むずかしかった<b>なあ</b>。', id:'Ujiannya susah ya (gumam sendiri).'},
     {jp:'トムさんのおねえさん、きれいだ<b>なあ</b>。', id:'Kakak perempuan Tom cantik ya (kekaguman).'},
     {jp:'早く夏休みになれば<b>いいなあ</b>。', id:'Cepat-cepat liburan musim panas ya (harapan).'}
   ]},

  {id:'n4-w4d6-03', level:'n4', week:4, day:6, cat:'partikel-akhir',
   grammar:'〜ね／〜よ', reading:'〜ne / 〜yo',
   meaning:'〜ね: ya kan / betul kan (konfirmasi) | 〜よ: loh / nih (penekanan/peringatan)',
   connection:'Kalimat＋ね／よ',
   desc:'<strong>〜ね</strong>: mencari persetujuan atau mengkonfirmasi sesuatu dengan lawan bicara. <strong>〜よ</strong>: menekankan informasi atau memberi peringatan kepada lawan bicara.',
   nuance:'ね = kita berdua tahu/setuju. よ = saya tahu, kamu mungkin belum tahu. Kombinasi よね atau ねえ juga umum.',
   examples:[
     {jp:'いい天気です<b>ね</b>。', id:'Cuacanya bagus ya.'},
     {jp:'もうすぐ試験です<b>ね</b>。', id:'Sebentar lagi ujian ya.'},
     {jp:'漢字のテストは明日です<b>よ</b>。', id:'Ujian kanjinya besok loh (memberitahu).'}
   ]},
];
