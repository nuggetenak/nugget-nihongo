// DATA — N4 第3週 (Soumatome N4 Bunpou)
// Week 3 · 漢字を書くのは大変です。
// Nominalisasi, Potensi, Sebab-Akibat, Konjungsi, Permintaan, Niat

const N4_W3 = [

// ── 第3週 1日目 ── Nominalisasi & Klausa Tertanam
  {id:'n4-w3d1-01', level:'n4', week:3, day:1, cat:'nominalisasi',
   grammar:'〜かどうか', reading:'〜ka dou ka',
   meaning:'Apakah... atau tidak / Entah... atau tidak (pertanyaan tak langsung)',
   connection:'普通形＋かどうか',
   desc:'Menyatakan <strong>ketidakpastian apakah sesuatu benar atau tidak</strong>. Digunakan sebagai klausa tertanam dalam kalimat yang lebih panjang.',
   nuance:'Berbeda dari 〜か: 〜かどうか untuk pertanyaan ya/tidak. 疑問詞〜か untuk pertanyaan dengan kata tanya (apa, siapa, kapan, dll).',
   examples:[
     {jp:'その話が本当<b>かどうか</b>、調べたほうがいいですよ。', id:'Sebaiknya cek dulu apakah cerita itu benar atau tidak.'},
     {jp:'明日、テストがある<b>かどうか</b>、リンさんに聞いてみましょう。', id:'Mari tanya ke Lin apakah besok ada ujian atau tidak.'},
     {jp:'新しい学校で、友だちができる<b>かどうか</b>、心配です。', id:'Saya khawatir apakah bisa punya teman di sekolah baru atau tidak.'}
   ]},

  {id:'n4-w3d1-02', level:'n4', week:3, day:1, cat:'nominalisasi',
   grammar:'疑問詞〜か', reading:'gimonshi〜ka',
   meaning:'...apa/siapa/kapan/di mana/mengapa/bagaimana (pertanyaan tak langsung)',
   connection:'疑問詞(いつ/どこ/だれ/なぜ/どうやって)＋普通形＋か',
   desc:'Menyisipkan <strong>pertanyaan langsung sebagai klausa</strong> di dalam kalimat lain. Urutan kata tetap mengikuti pernyataan, bukan pertanyaan.',
   nuance:'Berbeda dari 〜かどうか (ya/tidak). Gunakan ini ketika mengandung kata tanya: いつ、どこ、だれ、なぜ、どうやって dsb.',
   examples:[
     {jp:'きのうの夜、どうやって帰った<b>か</b>、覚えていません。', id:'Saya tidak ingat bagaimana saya pulang malam kemarin.'},
     {jp:'この作文は誰が書いた<b>か</b>、名前がないのでわかりません。', id:'Saya tidak tahu siapa yang menulis karangan ini karena tidak ada namanya.'},
     {jp:'田中さんがどこに住んでいる<b>か</b>、知っていますか。', id:'Apakah kamu tahu di mana Tanaka-san tinggal?'}
   ]},

  {id:'n4-w3d1-03', level:'n4', week:3, day:1, cat:'nominalisasi',
   grammar:'〜の (nominalisasi)', reading:'〜no (nominalisasi)',
   meaning:'...nya (mengubah klausa menjadi kata benda)',
   connection:'V普通形／い形／な形な＋の',
   desc:'<strong>の</strong> digunakan untuk <strong>menominalisasi klausa</strong> — menjadikannya subjek atau objek kalimat. Bisa diganti dengan こと dalam banyak konteks.',
   nuance:'の lebih personal/konkret dari こと. の untuk hal yang bisa dilihat/dialami langsung. こと untuk konsep abstrak. Dengan versi mendengar/melihat (見る、聞く), gunakan の.',
   examples:[
     {jp:'あそこでたばこを吸っている<b>の</b>が社長です。', id:'Yang sedang merokok di sana itu adalah direktur.'},
     {jp:'学校が始まる<b>の</b>は9時からです。', id:'Sekolah mulai jam 9.'},
     {jp:'外国人が多い<b>の</b>に、びっくりしました。', id:'Saya terkejut karena banyak sekali orang asing.'}
   ]},

// ── 第3週 2日目 ── Potensi & Persepsi
  {id:'n4-w3d2-01', level:'n4', week:3, day:2, cat:'potensi',
   grammar:'動詞可能形', reading:'doushi kanouukei',
   meaning:'Bisa... / Mampu... (bentuk potensial)',
   connection:'Grup1: V〜えます型 / Grup2: V〜られます / する→できる / くる→こられる',
   desc:'Bentuk potensial menyatakan <strong>kemampuan atau kemungkinan</strong> melakukan sesuatu. Sama dengan 「Vることができる」.',
   nuance:'Untuk Grup 1: ik-u→ik-eru, nom-u→nom-eru, dsb. Objek langsung bisa menggunakan が atau を. Bentuk negatif: 〜られない/〜えない.',
   examples:[
     {jp:'私は日本語を話せます<b>が</b>、読むことも書くことも<b>できません</b>。', id:'Saya bisa berbicara bahasa Jepang, tapi tidak bisa membaca maupun menulis.'},
     {jp:'今週の日曜日も来<b>られますか</b>。', id:'Bisa datang Minggu minggu ini juga?'},
     {jp:'この店では新鮮な魚が<b>食べられます</b>。', id:'Di toko ini bisa makan ikan segar.'}
   ]},

  {id:'n4-w3d2-02', level:'n4', week:3, day:2, cat:'persepsi',
   grammar:'聞こえる／見える', reading:'kikoeru / mieru',
   meaning:'Terdengar... / Terlihat... (dapat didengar/dilihat secara alami)',
   connection:'Nが聞こえる／見える',
   desc:'<strong>聞こえる</strong> menyatakan sesuatu terdengar (secara alami, bukan aktif mendengarkan). <strong>見える</strong> menyatakan sesuatu terlihat (secara alami, bukan aktif melihat).',
   nuance:'Perbedaan penting: 聞こえる (terdengar alami) vs 聞ける (bisa mendengarkan, punya kapasitas). 見える (terlihat alami) vs 見られる (bisa melihat, punya akses).',
   examples:[
     {jp:'となりの家からピアノの音が<b>聞こえます</b>。', id:'Suara piano dari rumah tetangga terdengar.'},
     {jp:'私は左の耳がよく<b>聞こえません</b>。', id:'Telinga kiri saya tidak bisa mendengar dengan baik.'},
     {jp:'ここから東京駅がよく<b>見えます</b>。', id:'Stasiun Tokyo terlihat jelas dari sini.'}
   ]},

// ── 第3週 3日目 ── Sebab & Konsesi
  {id:'n4-w3d3-01', level:'n4', week:3, day:3, cat:'sebab',
   grammar:'〜ので', reading:'〜node',
   meaning:'Karena... / Oleh sebab... (alasan sopan)',
   connection:'V普通形／い形／な形な＋ので',
   desc:'Menyatakan <strong>sebab atau alasan</strong>. Lebih sopan dan objektif daripada 〜から.',
   nuance:'〜ので lebih sopan dari 〜から. 〜から lebih subjektif/langsung. Dalam situasi formal, 〜ので lebih disukai. Perubahan: 便利な→便利なので, 雨→雨なので.',
   examples:[
     {jp:'ちょっと暑い<b>ので</b>、窓を開けてもいいですか。', id:'Agak panas, bolehkah saya buka jendela?'},
     {jp:'私は歌が下手な<b>ので</b>、カラオケには行きません。', id:'Karena saya tidak pandai menyanyi, saya tidak pergi karaoke.'},
     {jp:'雨が降っている<b>ので</b>、今日は出かけませんでした。', id:'Karena hujan turun, hari ini saya tidak keluar.'}
   ]},

  {id:'n4-w3d3-02', level:'n4', week:3, day:3, cat:'konsesi',
   grammar:'〜のに', reading:'〜noni',
   meaning:'Padahal... / Meski... (kekecewaan atau kontras dengan harapan)',
   connection:'V普通形／い形／な形な＋のに',
   desc:'Menyatakan <strong>kekecewaan atau rasa heran</strong> karena hasilnya berlawanan dengan yang diharapkan.',
   nuance:'〜のに mengandung nuansa kekecewaan/kecaman. Berbeda dengan 〜ても (konsesi netral). Contoh: 勉強したのに、わからなかった (sudah belajar tapi tetap tidak mengerti — kecewa).',
   examples:[
     {jp:'きのう勉強した<b>のに</b>、もう忘れてしまいました。', id:'Padahal kemarin sudah belajar, tapi sudah lupa.'},
     {jp:'冬な<b>のに</b>、あたたかいですね。', id:'Padahal musim dingin, hangatnya ya.'},
     {jp:'このパソコンは高かった<b>のに</b>、もうこわれてしまった。', id:'Padahal laptop ini mahal, tapi sudah rusak.'}
   ]},

  {id:'n4-w3d3-03', level:'n4', week:3, day:3, cat:'konsesi',
   grammar:'〜ても／〜でも', reading:'〜te mo / 〜de mo',
   meaning:'Meskipun... / Bahkan jika... (konsesi — tetap berlaku walau)',
   connection:'V〜て形＋も／い形〜くて＋も／な形＋でも／N＋でも',
   desc:'Menyatakan bahwa <strong>hasil di klausa kedua tetap terjadi meskipun</strong> kondisi di klausa pertama. Tidak ada nuansa kekecewaan seperti のに.',
   nuance:'Berbeda dengan のに (kecewa). ても/でも lebih netral. Bisa juga berarti "bahkan jika" untuk kondisi hipotesis: 高くても買います (bahkan jika mahal pun saya beli).',
   examples:[
     {jp:'パソコンは必要なので、高く<b>ても</b>買います。', id:'Karena laptop diperlukan, saya akan beli meskipun mahal.'},
     {jp:'明日、雨<b>でも</b>動物園に行きます。', id:'Besok meskipun hujan, saya tetap pergi ke kebun binatang.'},
     {jp:'調べ<b>ても</b>わからなかった。', id:'Meskipun sudah mencari, tetap tidak mengerti.'}
   ]},

// ── 第3週 4日目 ── Konjungsi & Kata Benda Kualitas
  {id:'n4-w3d4-01', level:'n4', week:3, day:4, cat:'konjungsi',
   grammar:'それに／そのうえ', reading:'sore ni / sono ue',
   meaning:'Selain itu / Bahkan lebih dari itu (menambahkan informasi positif)',
   connection:'文A。それに／そのうえ＋文B。',
   desc:'Digunakan untuk <strong>menambahkan informasi lebih lanjut</strong>, biasanya memperkuat atau menambah nilai positif dari pernyataan sebelumnya.',
   nuance:'それに lebih umum, そのうえ agak lebih formal. Keduanya menambahkan "dan juga/lebih dari itu".',
   examples:[
     {jp:'山田さんは若くてきれいです。<b>それに</b>、頭もいいです。', id:'Yamada-san muda dan cantik. Selain itu, juga cerdas.'},
     {jp:'きのうは雨が降っていて寒かったです。<b>そのうえ</b>、風も強かったです。', id:'Kemarin hujan dan dingin. Bahkan lebih dari itu, anginnya juga kencang.'},
     {jp:'このレストランは料理がおいしい。<b>それに</b>、ねだんも安い。', id:'Restoran ini makanannya enak. Selain itu, harganya juga murah.'}
   ]},

  {id:'n4-w3d4-02', level:'n4', week:3, day:4, cat:'konjungsi',
   grammar:'それで／だから', reading:'sore de / dakara',
   meaning:'Oleh karena itu / Makanya (sebab → akibat)',
   connection:'文A(sebab)。それで／だから＋文B(akibat)。',
   desc:'Menghubungkan <strong>sebab dan akibat</strong> antar kalimat. それで lebih netral/formal, だから lebih kasual.',
   nuance:'だから lebih kasual dan langsung. それで menghubungkan peristiwa secara alami. Keduanya berbeda dari ので/から yang ada dalam satu kalimat.',
   examples:[
     {jp:'電車で事故があった。<b>それで</b>、ちこくしてしまった。', id:'Ada kecelakaan di kereta. Oleh karena itu, saya terlambat.'},
     {jp:'パソコンがこわれた。<b>だから</b>、新しいのを買った。', id:'Laptop rusak. Makanya saya beli yang baru.'},
     {jp:'A「どうして遅れたの？」B「渋滞だった。<b>だから</b>。」', id:'A: "Kenapa terlambat?" B: "Macet. Makanya."'}
   ]},

  {id:'n4-w3d4-03', level:'n4', week:3, day:4, cat:'konjungsi',
   grammar:'ところが', reading:'tokoro ga',
   meaning:'Akan tetapi / Namun ternyata (hasil yang tidak terduga)',
   connection:'文A(harapan/rencana)。ところが＋文B(hasil tak terduga)。',
   desc:'Digunakan ketika <strong>hasil yang terjadi berlawanan dengan harapan</strong> atau rencana. Mengandung nuansa kejutan.',
   nuance:'Lebih kuat dari でも/しかし. ところが menekankan kejutan atau kontras yang tidak terduga.',
   examples:[
     {jp:'きのうは試験の日だった。<b>ところが</b>、病気で受けることができなかった。', id:'Kemarin adalah hari ujian. Akan tetapi ternyata saya tidak bisa mengikutinya karena sakit.'},
     {jp:'晴れると思っていた。<b>ところが</b>、雨が降り始めた。', id:'Saya pikir akan cerah. Namun ternyata hujan mulai turun.'},
     {jp:'電話してみた。<b>ところが</b>、誰も出なかった。', id:'Saya mencoba menelepon. Akan tetapi tidak ada yang mengangkat.'}
   ]},

  {id:'n4-w3d4-04', level:'n4', week:3, day:4, cat:'kata-benda-kualitas',
   grammar:'形容詞＋さ', reading:'keiyoushi + sa',
   meaning:'...an / ke...an (mengubah kata sifat menjadi kata benda)',
   connection:'い形容詞(除い)＋さ／な形容詞(除な)＋さ',
   desc:'Akhiran <strong>さ</strong> mengubah kata sifat menjadi kata benda yang menyatakan tingkat atau kualitas.',
   nuance:'Berbeda dengan 〜み: さ lebih objektif (ukuran yang bisa diukur: 高さ, 深さ, 広さ), み lebih subjektif/kualitatif (暖かみ, 悲しみ). Contoh: 高い→高さ, 便利→便利さ, いい→よさ.',
   examples:[
     {jp:'同じ大き<b>さ</b>のダイヤモンドでも、ねだんはいろいろ違います。', id:'Meskipun ukurannya sama, harga berlian berbeda-beda.'},
     {jp:'広<b>さ</b>よりも便利<b>さ</b>を考えて、今のアパートを選びました。', id:'Dengan mempertimbangkan kenyamanan daripada luasnya, saya memilih apartemen ini.'},
     {jp:'あの山の高<b>さ</b>はどのくらいですか。', id:'Berapa tinggi gunung itu?'}
   ]},

// ── 第3週 5日目 ── Permintaan Sopan & Keinginan
  {id:'n4-w3d5-01', level:'n4', week:3, day:5, cat:'permintaan-sopan',
   grammar:'Vてくれませんか／もらえませんか／くださいませんか', reading:'V-te kuremasen ka / moraemasen ka / kudasaimasen ka',
   meaning:'Bisakah kamu/Anda... untuk saya? (permintaan sopan)',
   connection:'V〜て形＋くれませんか／もらえませんか／くださいませんか／いただけませんか',
   desc:'Bentuk pertanyaan negatif untuk <strong>permintaan yang sopan</strong>. Semakin panjang/formal urutannya: くれませんか→もらえませんか→くださいませんか→いただけませんか.',
   nuance:'Semakin ke bawah urutannya semakin sopan. いただけませんか paling sopan untuk situasi formal.',
   examples:[
     {jp:'ちょっと、手伝って<b>くれませんか</b>。', id:'Bisa tolong bantu saya sebentar?'},
     {jp:'静かにして<b>もらえませんか</b>。', id:'Bisakah Anda tenang?'},
     {jp:'すみませんが、もう一度言って<b>いただけませんか</b>。', id:'Maaf, bisakah Anda mengatakannya sekali lagi?'}
   ]},

  {id:'n4-w3d5-02', level:'n4', week:3, day:5, cat:'keinginan',
   grammar:'Vてほしい／もらいたい', reading:'V-te hoshii / moraitai',
   meaning:'Ingin seseorang melakukan... / Ingin seseorang berbuat... (harapan pada orang lain)',
   connection:'NにV〜て形＋ほしい／もらいたい／いただきたい',
   desc:'Menyatakan <strong>keinginan agar orang lain melakukan</strong> sesuatu untuk kita.',
   nuance:'てほしい (umum/kasual). てもらいたい (sedikit lebih formal). ていただきたい (sangat sopan). Bentuk negatif: てほしくない = tidak ingin orang itu melakukan.',
   examples:[
     {jp:'私のことを忘れないで<b>ほしい</b>。', id:'Saya ingin kamu tidak melupakanku.'},
     {jp:'息子にいい大学に行って<b>もらいたいです</b>。', id:'Saya ingin anak saya masuk universitas yang baik.'},
     {jp:'先生にこの文章をチェックして<b>いただきたいです</b>。', id:'Saya ingin sensei memeriksa tulisan ini.'}
   ]},

  {id:'n4-w3d5-03', level:'n4', week:3, day:5, cat:'saran',
   grammar:'〜たらどうですか／いかがですか', reading:'〜tara dou desu ka / ikaga desu ka',
   meaning:'Bagaimana kalau...? / Mengapa tidak...? (saran atau usulan)',
   connection:'V〜た形＋らどうですか／いかがですか',
   desc:'Digunakan untuk <strong>menyarankan atau mengusulkan</strong> suatu tindakan kepada orang lain.',
   nuance:'どうですか lebih kasual, いかがですか lebih sopan/formal.',
   examples:[
     {jp:'先生に聞いてみたら<b>どうですか</b>。', id:'Bagaimana kalau mencoba bertanya ke sensei?'},
     {jp:'少し休んだら<b>いかがですか</b>。', id:'Bagaimana kalau Anda istirahat sebentar?'},
     {jp:'インターネットで調べたら<b>どうですか</b>。', id:'Bagaimana kalau dicari di internet?'}
   ]},

// ── 第3週 6日目 ── Niat & Kutipan
  {id:'n4-w3d6-01', level:'n4', week:3, day:6, cat:'niat',
   grammar:'Vようと思う', reading:'V-you to omou',
   meaning:'Berniat untuk... / Bermaksud... (niat diri sendiri)',
   connection:'V意向形＋と思う／と思っている',
   desc:'Menyatakan <strong>niat atau rencana</strong> yang sedang dipertimbangkan. と思っている menunjukkan niat yang sudah berlangsung.',
   nuance:'と思う (baru saja berniat) vs と思っている (sudah lama berniat). Berbeda dengan つもり (niat yang sudah lebih pasti).',
   examples:[
     {jp:'新しい自転車を買おう<b>と思っています</b>。', id:'Saya berniat membeli sepeda baru.'},
     {jp:'明日は日曜日なのでゆっくり寝よう<b>と思います</b>。', id:'Karena besok Minggu, saya berniat tidur santai.'},
     {jp:'来年はN3を受けよう<b>と思っています</b>。', id:'Saya berencana mengikuti ujian N3 tahun depan.'}
   ]},

  {id:'n4-w3d6-02', level:'n4', week:3, day:6, cat:'niat',
   grammar:'Vつもり', reading:'V tsumori',
   meaning:'Berencana untuk... / Bermaksud... (niat atau rencana yang lebih pasti)',
   connection:'V辞書形/V〜ない形＋つもり(です)',
   desc:'Menyatakan <strong>niat atau rencana yang lebih pasti</strong> dibanding ようと思う.',
   nuance:'つもり = niat yang sudah lebih mantap. ようと思う = masih dalam pertimbangan. Vないつもり = berencana tidak melakukan.',
   examples:[
     {jp:'今日はお酒を飲まない<b>つもりです</b>。', id:'Saya berencana tidak minum alkohol hari ini.'},
     {jp:'来年、日本に留学する<b>つもりです</b>。', id:'Saya berencana kuliah di Jepang tahun depan.'},
     {jp:'田中さんはもう会社をやめる<b>つもりだ</b>と言っていました。', id:'Tanaka-san katanya berencana berhenti dari perusahaan.'}
   ]},

  {id:'n4-w3d6-03', level:'n4', week:3, day:6, cat:'kehendak',
   grammar:'Vよう (kasual)', reading:'V-you (kasual)',
   meaning:'Ayo... / Mari... (bentuk volitional kasual)',
   connection:'V意向形（する→しよう、来る→来よう）',
   desc:'Bentuk kasual dari 「Vましょう」. Digunakan dalam percakapan dengan teman atau keluarga.',
   nuance:'Sangat kasual — hanya untuk orang yang akrab. Vましょう untuk situasi yang lebih formal atau dengan orang yang tidak terlalu dekat.',
   examples:[
     {jp:'A「明日の日曜日、映画に行こうよ。」B「いいね、何を見ようか。」', id:'A: "Minggu besok, yuk pergi nonton film." B: "Oke nih, nonton apa ya?"'},
     {jp:'疲れたから、ちょっと休も<b>う</b>。', id:'Karena capek, istirahat sebentar yuk.'},
     {jp:'おなかがすいたね。何か食べ<b>よう</b>。', id:'Lapar ya. Makan sesuatu yuk.'}
   ]},
];
