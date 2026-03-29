// DATA — N4 第1週 (Soumatome N4 Bunpou)
// Week 1 · 一日に二回、歯をみがきます。
// Partikel, Perbandingan, Ekspresi Waktu, Aspek

const N4_W1 = [

// ── 第1週 1日目 ── Partikel & Perbandingan
  {id:'n4-w1d1-01', level:'n4', week:1, day:1, cat:'partikel',
   grammar:'〜に (frekuensi)', reading:'〜ni (frekuensi)',
   meaning:'Per... / Setiap... (menyatakan frekuensi)',
   connection:'N(periode waktu)に＋frekuensi',
   desc:'Menyatakan <strong>berapa kali sesuatu dilakukan</strong> dalam suatu periode waktu. Partikel に menunjukkan satuan waktu sebagai acuan.',
   nuance:'Berbeda dengan では (di/dalam suatu tempat). Contoh: 1日に3回 = 3 kali per hari, 1週間に2回 = 2 kali seminggu.',
   examples:[
     {jp:'1日に<b>3回</b>、この薬を飲んでいます。', id:'Saya minum obat ini 3 kali sehari.'},
     {jp:'1週間に<b>2回</b>、ジムに通っています。', id:'Saya pergi ke gym 2 kali seminggu.'},
     {jp:'1か月に<b>一度</b>、家族に電話します。', id:'Satu kali sebulan saya menelepon keluarga.'}
   ]},

  {id:'n4-w1d1-02', level:'n4', week:1, day:1, cat:'partikel',
   grammar:'〜ずつ', reading:'〜zutsu',
   meaning:'Masing-masing... / ...per ... (pembagian merata atau pengulangan)',
   connection:'N＋ずつ',
   desc:'Menyatakan <strong>jumlah yang sama untuk masing-masing</strong> atau sesuatu yang terjadi secara berulang dengan jumlah yang sama setiap kalinya.',
   nuance:'Ada dua makna: ① pembagian rata (masing-masing mendapat), ② pengulangan (sedikit demi sedikit). Berbeda dengan 〜ごとに yang menekankan interval.',
   examples:[
     {jp:'このプリントを1枚<b>ずつ</b>配ってください。', id:'Tolong bagikan cetakan ini masing-masing satu lembar.'},
     {jp:'この本を毎日2ページ<b>ずつ</b>勉強しましょう。', id:'Mari belajar buku ini 2 halaman per hari.'},
     {jp:'少し<b>ずつ</b>日本語が上手になっています。', id:'Bahasa Jepang saya pelan-pelan semakin bagus.'}
   ]},

  {id:'n4-w1d1-03', level:'n4', week:1, day:1, cat:'perbandingan',
   grammar:'N1はN2ほど〜ない', reading:'N1 wa N2 hodo ~nai',
   meaning:'N1 tidak se... N2 / N1 tidak sepopuler/sebesar N2',
   connection:'N1はN2ほど＋い形容詞くない／な形容詞ではない／Vない',
   desc:'Menyatakan bahwa <strong>N1 tidak mencapai tingkat N2</strong>. Kebalikan dari 〜より (lebih dari). Bisa diganti dengan 「N2よりN1のほうが〜」.',
   nuance:'「N1はN2ほど〜ない」=「N2よりN1のほうが〜ない」. Juga ada bentuk 「N1も〜ですが、N2ほどではない/じゃない」.',
   examples:[
     {jp:'日本では、ぶた肉は牛肉<b>ほど</b>高く<b>ありません</b>。', id:'Di Jepang, daging babi tidak semahal daging sapi.'},
     {jp:'私の国の夏は日本の夏<b>ほど</b>暑く<b>ない</b>。', id:'Musim panas di negaraku tidak sepanas musim panas Jepang.'},
     {jp:'今週は先週<b>ほど</b>いそがしく<b>ありません</b>。', id:'Minggu ini tidak sesibuk minggu lalu.'}
   ]},

  {id:'n4-w1d1-04', level:'n4', week:1, day:1, cat:'partikel',
   grammar:'〜も (penekanan/perbandingan)', reading:'〜mo (penekanan)',
   meaning:'Bahkan... / Sekitar... (penekanan atau jumlah yang banyak/mengejutkan)',
   connection:'助詞＋も (は→も、が→も、を→も)',
   desc:'Digunakan untuk <strong>menekankan kontras atau jumlah yang mengejutkan</strong>. Bisa memperkuat suatu hal yang ekstrem atau tak terduga.',
   nuance:'「〜も〜ですが、〜ほどでは/じゃない」juga umum digunakan. Berbeda dengan も yang berarti "juga".',
   examples:[
     {jp:'私はひらがな<b>も</b>書けません。', id:'Hiragana pun saya tidak bisa menulis.'},
     {jp:'この映画は3時間<b>も</b>あります。', id:'Film ini berdurasi 3 jam lamanya.'},
     {jp:'誕生日に父から<b>も</b>母から<b>も</b>プレゼントをもらいました。', id:'Di ulang tahun saya mendapat hadiah dari ayah maupun ibu.'}
   ]},

// ── 第1週 2日目 ── Partikel Lanjutan & Pembatasan
  {id:'n4-w1d2-01', level:'n4', week:1, day:2, cat:'partikel',
   grammar:'Nでも (bahkan N)', reading:'N demo',
   meaning:'Bahkan N pun... / N saja... (contoh ekstrem)',
   connection:'N＋でも',
   desc:'① Menyatakan <strong>contoh yang ekstrem</strong> — mewakili hal yang paling tidak mungkin pun bisa melakukannya. ② Menyatakan "N sebagai salah satu contoh" pilihan.',
   nuance:'① Nuansa "bahkan hal yang paling susah pun bisa" atau "bahkan orang yang paling tidak mampu pun bisa". ② Nuansa "misalnya N" atau "apa saja, termasuk N".',
   examples:[
     {jp:'これは子ども<b>でも</b>できる問題です。', id:'Ini soal yang bahkan anak-anak pun bisa mengerjakan.'},
     {jp:'お茶<b>でも</b>飲みましょうか。', id:'Bagaimana kalau kita minum teh atau sesuatu?'},
     {jp:'天気がいいから、散歩<b>でも</b>しませんか。', id:'Cuacanya bagus, bagaimana kalau jalan-jalan atau sesuatu?'}
   ]},

  {id:'n4-w1d2-02', level:'n4', week:1, day:2, cat:'partikel',
   grammar:'N1とかN2とか', reading:'N1 toka N2 toka',
   meaning:'N1 atau N2, dan sebagainya (menyebut contoh-contoh)',
   connection:'N1とか（N2とか）＋V',
   desc:'Menyebutkan <strong>beberapa contoh dari serangkaian hal</strong> tanpa menyebutkan semuanya. Lebih kasual dari 〜や〜など.',
   nuance:'Lebih kasual dari や〜など. Biasa dipakai dalam percakapan sehari-hari. Sering diulang: とかとか.',
   examples:[
     {jp:'休みの日は映画<b>とか</b>本を読んだり<b>とか</b>しています。', id:'Di hari libur saya nonton film atau baca buku dan sebagainya.'},
     {jp:'毎日、昼はラーメン<b>とか</b>そば<b>とか</b>を食べます。', id:'Setiap hari, siang saya makan ramen atau soba dan sebagainya.'},
     {jp:'週末は掃除<b>とか</b>洗濯<b>とか</b>をする予定です。', id:'Di akhir pekan saya berencana beres-beres atau mencuci pakaian.'}
   ]},

  {id:'n4-w1d2-03', level:'n4', week:1, day:2, cat:'pembatasan',
   grammar:'Nしか〜ない', reading:'N shika ~nai',
   meaning:'Hanya N... (tidak ada yang lain selain N)',
   connection:'N＋しか＋Vない形',
   desc:'Menyatakan <strong>pembatasan eksklusif</strong> — hanya N dan tidak ada yang lain. Selalu digunakan dengan bentuk negatif.',
   nuance:'Berbeda dengan だけ: しか lebih kuat nuansa "sayangnya hanya" atau "tidak lebih dari". だけ bersifat netral. しか selalu diikuti bentuk negatif.',
   examples:[
     {jp:'ジョンさんは英語<b>しか</b>話せません。', id:'John hanya bisa berbicara bahasa Inggris.'},
     {jp:'れいぞうこに、たまごが1個<b>しか</b>ありません。', id:'Di kulkas hanya ada 1 butir telur.'},
     {jp:'私のクラスに男の人は二人<b>しか</b>いません。', id:'Di kelasku hanya ada dua orang laki-laki.'}
   ]},

// ── 第1週 3日目 ── Ekspresi Waktu
  {id:'n4-w1d3-01', level:'n4', week:1, day:3, cat:'waktu',
   grammar:'〜まで', reading:'〜made',
   meaning:'Sampai... / Hingga... (batas akhir waktu atau tempat)',
   connection:'N(waktu/tempat)／Vる形＋まで',
   desc:'Menyatakan <strong>batas akhir</strong> suatu tindakan atau keadaan, baik batas waktu maupun tempat. Aksi atau kondisi berlanjut hingga titik tersebut.',
   nuance:'Berbeda dengan までに: まで = "sampai titik itu terus berlangsung", までに = "sebelum batas waktu itu".',
   examples:[
     {jp:'来週の水曜日<b>まで</b>会社を休みます。', id:'Saya tidak masuk kerja sampai Rabu minggu depan.'},
     {jp:'母は夜おそく<b>まで</b>働いています。', id:'Ibu bekerja sampai larut malam.'},
     {jp:'私は日本に来る<b>まで</b>フランスに住んでいました。', id:'Sampai saya datang ke Jepang, saya tinggal di Prancis.'}
   ]},

  {id:'n4-w1d3-02', level:'n4', week:1, day:3, cat:'waktu',
   grammar:'〜までに', reading:'〜made ni',
   meaning:'Sebelum... / Paling lambat... (batas waktu/deadline)',
   connection:'N(waktu)／Vる形＋までに',
   desc:'Menyatakan <strong>batas waktu (deadline)</strong> — suatu tindakan harus selesai sebelum atau pada titik waktu tersebut.',
   nuance:'Kunci: までに = tindakan selesai SEBELUM batas waktu. まで = keadaan berlangsung HINGGA batas waktu. Contoh: 5時まで働く (bekerja sampai jam 5) vs 5時までに帰る (pulang sebelum jam 5).',
   examples:[
     {jp:'レポートは15日<b>までに</b>出してください。', id:'Tolong kumpulkan laporan paling lambat tanggal 15.'},
     {jp:'私は30さいに<b>なるまでに</b>結婚したいです。', id:'Saya ingin menikah sebelum berusia 30 tahun.'},
     {jp:'9時<b>までに</b>来てください。', id:'Tolong datang sebelum jam 9.'}
   ]},

  {id:'n4-w1d3-03', level:'n4', week:1, day:3, cat:'enumerasi',
   grammar:'〜たり〜たりする', reading:'〜tari〜tari suru',
   meaning:'Melakukan hal seperti... dan ... (menyebut contoh dari beberapa aktivitas)',
   connection:'V1た形＋り、V2た形＋り＋する',
   desc:'Digunakan untuk <strong>menyebut beberapa contoh aktivitas</strong> dari sejumlah kegiatan yang dilakukan, tanpa menyebutkan semuanya. Atau menyatakan tindakan yang berulang-ulang.',
   nuance:'Selalu diakhiri dengan する, します, していますdll. Bisa juga untuk kondisi yang berganti-ganti: 雨が降ったり止んだりしています.',
   examples:[
     {jp:'夏休みは旅行し<b>たり</b>テニスをし<b>たり</b>していました。', id:'Di liburan musim panas saya melakukan hal-hal seperti berwisata dan bermain tenis.'},
     {jp:'休みの日はDVDを見<b>たり</b>本を読ん<b>だり</b>しています。', id:'Di hari libur saya menonton DVD atau membaca buku.'},
     {jp:'このごろ、暑かっ<b>たり</b>寒かっ<b>たり</b>しています。', id:'Akhir-akhir ini cuaca silih berganti panas dan dingin.'}
   ]},

  {id:'n4-w1d3-04', level:'n4', week:1, day:3, cat:'konjungsi',
   grammar:'〜し、〜し', reading:'〜shi, 〜shi',
   meaning:'...dan..., dan lagi... (menyebut beberapa alasan atau kondisi)',
   connection:'V普通形／い形容詞／な形容詞だ→な形→だし／N＋だし＋，',
   desc:'Digunakan untuk <strong>menyebutkan beberapa alasan atau kondisi sekaligus</strong>, mengindikasikan bahwa masih ada lebih banyak.',
   nuance:'Tidak harus digunakan berpasangan. Bisa digunakan satu kali di akhir kalimat untuk memberi kesan ada alasan lain yang tidak disebutkan.',
   examples:[
     {jp:'のどもかわいた<b>し</b>、おなかもすいた<b>し</b>、少し休みたいです。', id:'Tenggorokan saya kering, perutku juga lapar, saya ingin istirahat sebentar.'},
     {jp:'きのうのハイキングは天気もよかった<b>し</b>、楽しかったです。', id:'Hiking kemarin cuacanya bagus dan menyenangkan juga.'},
     {jp:'このレストランはおいしい<b>し</b>、安いです。', id:'Restoran ini enak dan lagi harganya murah.'}
   ]},

// ── 第1週 4日目 ── Aspek & Waktu
  {id:'n4-w1d4-01', level:'n4', week:1, day:4, cat:'aspek',
   grammar:'Vるところ', reading:'V-ru tokoro',
   meaning:'Baru akan... / Tepat akan... (sesaat sebelum melakukan)',
   connection:'V辞書形＋ところ',
   desc:'Menyatakan bahwa <strong>tindakan akan segera dimulai</strong> — berada tepat di titik sebelum tindakan terjadi.',
   nuance:'Tiga bentuk ところ: Vるところ (akan segera), Vているところ (sedang berlangsung), Vたところ (baru saja selesai). Ketiganya menggambarkan titik waktu yang berbeda.',
   examples:[
     {jp:'今から家を出る<b>ところ</b>です。', id:'Saya baru akan keluar rumah sekarang.'},
     {jp:'これから夕食を食べる<b>ところ</b>です。', id:'Saya baru akan makan malam sekarang.'},
     {jp:'ちょうど電話しようとした<b>ところ</b>だった。', id:'Saya tepat akan menelepon tadi.'}
   ]},

  {id:'n4-w1d4-02', level:'n4', week:1, day:4, cat:'aspek',
   grammar:'Vているところ', reading:'V-te iru tokoro',
   meaning:'Sedang dalam proses... / Tepat sedang... (sedang berlangsung)',
   connection:'V〜て形＋いるところ',
   desc:'Menyatakan bahwa <strong>tindakan sedang berlangsung saat ini</strong> — berada di tengah-tengah tindakan.',
   nuance:'Lebih spesifik dari Vている — menekankan bahwa tindakan sedang aktif berlangsung saat ini, bukan sekadar kondisi.',
   examples:[
     {jp:'今、料理を作っている<b>ところ</b>です。', id:'Sekarang saya tepat sedang memasak.'},
     {jp:'今、勉強している<b>ところ</b>です。', id:'Sekarang saya sedang belajar.'},
     {jp:'会議中です。今、話し合っている<b>ところ</b>です。', id:'Sedang rapat. Sekarang tepat sedang berdiskusi.'}
   ]},

  {id:'n4-w1d4-03', level:'n4', week:1, day:4, cat:'aspek',
   grammar:'Vたところ', reading:'V-ta tokoro',
   meaning:'Baru saja selesai... / Tepat selesai... (baru saja usai)',
   connection:'V〜た形＋ところ',
   desc:'Menyatakan bahwa <strong>tindakan baru saja selesai</strong> — tepat di titik setelah tindakan berakhir.',
   nuance:'Berbeda dengan 〜てしまった (ada nuansa penyesalan), Vたところ netral dan menekankan "baru saja".',
   examples:[
     {jp:'今、お昼ご飯を食べた<b>ところ</b>です。', id:'Saya baru saja selesai makan siang.'},
     {jp:'今、授業が終わった<b>ところ</b>です。', id:'Pelajaran baru saja selesai.'},
     {jp:'A「宿題、終わった？」B「今、終わった<b>ところ</b>。」', id:'A: "PR-nya sudah selesai?" B: "Baru saja selesai."'}
   ]},

  {id:'n4-w1d4-04', level:'n4', week:1, day:4, cat:'waktu',
   grammar:'Nの間に／Vている間に', reading:'N no aida ni / V-te iru aida ni',
   meaning:'Selama N / Selagi sedang V (di suatu titik dalam periode)',
   connection:'N(期間)の間に／V〜て形＋いる間に＋kalimat',
   desc:'Menyatakan bahwa <strong>suatu tindakan terjadi di suatu titik dalam periode tertentu</strong>. Berbeda dengan 〜中(じゅう) yang menyatakan keseluruhan periode.',
   nuance:'間に = terjadi di suatu titik selama periode itu (tidak harus sepenuhnya). Berbeda dengan 間 (aida tanpa に) yang menyatakan keseluruhan periode.',
   examples:[
     {jp:'夏休みの<b>間に</b>ヨーロッパへ旅行する予定です。', id:'Saya berencana berwisata ke Eropa selama liburan musim panas.'},
     {jp:'映画を見ている<b>間に</b>、寝てしまいました。', id:'Selagi menonton film, saya tertidur.'},
     {jp:'買い物に行っている<b>間に</b>、友だちが来ました。', id:'Selagi saya pergi belanja, teman datang.'}
   ]},

  {id:'n4-w1d4-05', level:'n4', week:1, day:4, cat:'waktu',
   grammar:'V1るとき（に）、V2', reading:'V1-ru toki (ni), V2',
   meaning:'Ketika akan V1, V2 (sebelum V1 selesai)',
   connection:'V1辞書形＋とき（に）＋V2',
   desc:'Menyatakan bahwa <strong>V2 terjadi pada saat V1 akan/sedang dilakukan</strong>. Digunakan ketika V1 belum selesai saat V2 dilakukan.',
   nuance:'V1るとき = V1 belum terjadi saat itu. V1たとき = V1 sudah terjadi saat itu. Contoh: 寝るとき、めがねをはずす (sebelum tidur, buka kacamata) vs 寝たとき、電話が来た (setelah/saat sudah tidur, ada telepon).',
   examples:[
     {jp:'私は、本を<b>読むとき</b>、めがねをかけます。', id:'Ketika akan membaca buku, saya memakai kacamata.'},
     {jp:'外出する<b>とき</b>、かぎをかけてください。', id:'Ketika akan keluar, tolong kunci pintunya.'},
     {jp:'日本に来る<b>とき</b>、友だちが空港まで送ってくれました。', id:'Saat saya akan datang ke Jepang, teman mengantar saya sampai bandara.'}
   ]},

// ── 第1週 5日目 ── Te-form: Alasan & Keadaan
  {id:'n4-w1d5-01', level:'n4', week:1, day:5, cat:'te-bentuk',
   grammar:'〜て/〜で (sebab/alasan)', reading:'〜te/〜de (sebab)',
   meaning:'Karena... / Sehingga... (penyebab dan akibat)',
   connection:'V〜て形／い形〜くて／な形〜で／N〜で',
   desc:'Bentuk て menyatakan <strong>penyebab atau alasan</strong> dari kondisi yang dinyatakan di bagian akhir kalimat.',
   nuance:'Penting: bagian setelah 〜て tidak boleh berisi kalimat permintaan atau harapan langsung. Gunakan 〜から atau 〜ので untuk kasus itu.',
   examples:[
     {jp:'かぜ<b>で</b>学校を休みました。', id:'Karena flu, saya tidak masuk sekolah.'},
     {jp:'お金がなく<b>て</b>、買えない。', id:'Karena tidak punya uang, tidak bisa membeli.'},
     {jp:'ひさしぶりに友だちに会え<b>て</b>、うれしかったです。', id:'Bisa bertemu teman setelah lama tidak bertemu, saya senang.'}
   ]},

  {id:'n4-w1d5-02', level:'n4', week:1, day:5, cat:'te-bentuk',
   grammar:'〜て/〜で (cara/keadaan)', reading:'〜te/〜de (cara)',
   meaning:'Sambil... / Dengan cara... (cara atau keadaan melakukan)',
   connection:'V〜て形／N〜で＋V',
   desc:'Menyatakan <strong>cara atau keadaan</strong> saat melakukan tindakan di klausa berikutnya.',
   nuance:'Berbeda dari 〜ながら: te-form untuk cara/urutan, ながら untuk dua tindakan simultan. Contoh: すわって話す (duduk lalu bicara) vs 立ちながら話す (bicara sambil berdiri).',
   examples:[
     {jp:'いすに<b>すわって</b>話しましょう。', id:'Mari bicara sambil duduk.'},
     {jp:'えんぴつを<b>使って</b>書いてください。', id:'Tolong tulis menggunakan pensil.'},
     {jp:'辞書を<b>使わないで</b>、日本語の本を読みます。', id:'Saya membaca buku bahasa Jepang tanpa menggunakan kamus.'}
   ]},

  {id:'n4-w1d5-03', level:'n4', week:1, day:5, cat:'bersamaan',
   grammar:'〜ながら', reading:'〜nagara',
   meaning:'Sambil... / Seraya... (dua tindakan berlangsung bersamaan)',
   connection:'V〜ます形(除ます)＋ながら',
   desc:'Menyatakan bahwa <strong>dua tindakan dilakukan secara bersamaan</strong> oleh subjek yang sama. Tindakan utama adalah yang di bagian akhir kalimat.',
   nuance:'Subjek harus sama. Tindakan yang disebutkan sebelum ながら adalah tindakan sekunder/latar. Berbeda dengan 〜て yang menyatakan urutan.',
   examples:[
     {jp:'音楽を聞き<b>ながら</b>勉強しています。', id:'Saya belajar sambil mendengarkan musik.'},
     {jp:'歩き<b>ながら</b>スマホを見るのは危ないです。', id:'Melihat smartphone sambil berjalan itu berbahaya.'},
     {jp:'テレビを見<b>ながら</b>ご飯を食べました。', id:'Saya makan sambil menonton TV.'}
   ]},

  {id:'n4-w1d5-04', level:'n4', week:1, day:5, cat:'keadaan',
   grammar:'〜たまま', reading:'〜ta mama',
   meaning:'Dengan tetap dalam keadaan... / Meninggalkan... tetap... (keadaan tidak berubah)',
   connection:'V〜た形＋まま、N＋のまま',
   desc:'Menyatakan bahwa <strong>keadaan sebelumnya dibiarkan tetap tidak berubah</strong> saat melakukan tindakan lain.',
   nuance:'Biasanya ada nuansa bahwa keadaan tersebut tidak seharusnya dibiarkan (agak negatif). Contoh: 電気をつけたまま寝た = membiarkan lampu menyala saat tidur (tidak seharusnya).',
   examples:[
     {jp:'父はめがねを<b>かけたまま</b>寝ました。', id:'Ayah tidur dengan kacamata masih terpasang.'},
     {jp:'ぼうしを<b>かぶったまま</b>、部屋に入ってはいけません。', id:'Tidak boleh masuk kamar dengan topi masih dipakai.'},
     {jp:'うちの子は、パジャマの<b>まま</b>出かけてしまいました。', id:'Anak saya pergi keluar dengan pakaian piyama masih dipakai.'}
   ]},

// ── 第1週 6日目 ── Pengalaman & Keputusan
  {id:'n4-w1d6-01', level:'n4', week:1, day:6, cat:'pengalaman',
   grammar:'Vたことがある', reading:'V-ta koto ga aru',
   meaning:'Pernah... / Ada pengalaman... (pengalaman masa lalu)',
   connection:'V〜た形＋ことがある／ない',
   desc:'Menyatakan apakah seseorang <strong>pernah atau belum pernah</strong> melakukan suatu tindakan di masa lalu.',
   nuance:'Berbeda dengan Vたことがある (pernah) dan Vたことがない (belum pernah/tidak pernah). Jangan dipakai untuk hal yang masih berlangsung.',
   examples:[
     {jp:'私はマラソン大会に出た<b>ことがあります</b>。', id:'Saya pernah mengikuti lomba maraton.'},
     {jp:'私は一度もミュージカルを見た<b>ことがありません</b>。', id:'Saya belum pernah menonton musikal satu kali pun.'},
     {jp:'富士山に登った<b>ことがありますか</b>。', id:'Apakah Anda pernah mendaki Gunung Fuji?'}
   ]},

  {id:'n4-w1d6-02', level:'n4', week:1, day:6, cat:'pengalaman',
   grammar:'Vる/ないことがある', reading:'V-ru/nai koto ga aru',
   meaning:'Kadang-kadang... / Terkadang tidak... (kejadian yang sesekali terjadi)',
   connection:'V辞書形/Vない形＋ことがある',
   desc:'Menyatakan bahwa <strong>suatu hal kadang-kadang terjadi</strong>, tidak selalu tapi sesekali.',
   nuance:'Berbeda dengan Vたことがある (pengalaman masa lalu). Vることがある = kadang terjadi (berulang mungkin terjadi). Vたことがある = pernah terjadi (sekali di masa lalu).',
   examples:[
     {jp:'うちの犬は夜中にほえる<b>ことがあって</b>、困ります。', id:'Anjing saya kadang menggonggong tengah malam, merepotkan.'},
     {jp:'私は昼ご飯を食べない<b>ことがあります</b>。', id:'Terkadang saya tidak makan siang.'},
     {jp:'バスが遅れる<b>ことがある</b>ので、早めに出てください。', id:'Karena bus kadang terlambat, tolong berangkat lebih awal.'}
   ]},

  {id:'n4-w1d6-03', level:'n4', week:1, day:6, cat:'keputusan',
   grammar:'Nにする／Vることにする', reading:'N ni suru / V-ru koto ni suru',
   meaning:'Memutuskan untuk... / Menetapkan untuk... (keputusan diri sendiri)',
   connection:'N＋にする／V辞書形/Vない形＋ことにする',
   desc:'Menyatakan bahwa <strong>seseorang secara pribadi memutuskan</strong> sesuatu. にしています menunjukkan keputusan yang sudah menjadi kebiasaan.',
   nuance:'Dibuat oleh diri sendiri (keputusan sukarela). Berbeda dengan Vることになる (keputusan dari luar/keadaan).',
   examples:[
     {jp:'ランチはAセット<b>にします</b>。', id:'Untuk makan siang, saya pilih set A.'},
     {jp:'これから、ダイエットする<b>ことにします</b>。', id:'Mulai sekarang saya memutuskan untuk diet.'},
     {jp:'毎日、牛乳を飲む<b>ことにして</b>います。', id:'Saya sudah membiasakan diri minum susu setiap hari.'}
   ]},

  {id:'n4-w1d6-04', level:'n4', week:1, day:6, cat:'keputusan',
   grammar:'Nになる／Vることになる', reading:'N ni naru / V-ru koto ni naru',
   meaning:'Menjadi... / Diputuskan bahwa... (perubahan atau keputusan dari luar)',
   connection:'N＋になる／V辞書形/Vない形＋ことになる',
   desc:'Menyatakan bahwa <strong>sesuatu berubah atau diputuskan</strong> — biasanya oleh keadaan atau keputusan dari pihak lain, bukan diri sendiri.',
   nuance:'Berlawanan dengan ことにする (keputusan sendiri) — ことになる = hasil dari keputusan/situasi luar.',
   examples:[
     {jp:'明日、雨なら、ハイキングは中止に<b>なります</b>。', id:'Jika besok hujan, hiking akan dibatalkan.'},
     {jp:'来月、イギリスへ出張する<b>ことになりました</b>。', id:'Diputuskan bahwa bulan depan saya akan melakukan perjalanan bisnis ke Inggris.'},
     {jp:'来月、アメリカに出張する予定でしたが、行かない<b>ことになりました</b>。', id:'Tadinya berencana perjalanan bisnis ke Amerika bulan depan, tapi diputuskan tidak jadi pergi.'}
   ]},
];
