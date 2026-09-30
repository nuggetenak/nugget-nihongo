const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ALLOWED_TAGS = new Set([
  'kehidupan-sehari',
  'keluarga',
  'pertemanan',
  'pendidikan',
  'pekerjaan',
  'belanja',
  'makanan-minuman',
  'kesehatan',
  'waktu',
  'ruang-arah',
  'alam-lingkungan',
  'umum'
]);

const data = {
  // ─── ADJECTIVES (5 entries) ───────────────────────────────────────────
  "vg-n5-00434": [
    { jp: "京都はとても有名な町です。", id: "Kyoto adalah kota yang sangat terkenal.", level: "n5", tags: ["kehidupan-sehari"] }
  ],
  "vg-n5-00487": [
    { jp: "毎朝、早い時間に起きます。", id: "Setiap pagi, saya bangun di waktu yang awal.", level: "n5", tags: ["kehidupan-sehari", "waktu"] }
  ],
  "vg-n5-00511": [
    { jp: "田中さんは日本語がとても上手です。", id: "Tanaka sangat pandai berbahasa Jepang.", level: "n5", tags: ["pendidikan", "pertemanan"] }
  ],
  "vg-n5-00516": [
    { jp: "私は歌が下手ですから、歌いません。", id: "Karena saya tidak pandai bernyanyi, saya tidak bernyanyi.", level: "n5", tags: ["kehidupan-sehari"] }
  ],
  "vg-n5-00607": [
    { jp: "野菜がきらいですから、食べません。", id: "Karena saya tidak suka sayur, saya tidak memakannya.", level: "n5", tags: ["makanan-minuman"] }
  ],

  // ─── ADVERBS (8 entries) ─────────────────────────────────────────────
  "vg-n5-00621": [
    { jp: "休みの日はたいてい家にいます。", id: "Pada hari libur, biasanya saya ada di rumah.", level: "n5", tags: ["kehidupan-sehari", "waktu"] }
  ],
  "vg-n5-00622": [
    { jp: "ときどき友達と図書館へ行きます。", id: "Kadang-kadang saya pergi ke perpustakaan bersama teman.", level: "n5", tags: ["pertemanan", "pendidikan"] }
  ],
  "vg-n5-00623": [
    { jp: "この料理はあまり辛くないです。", id: "Masakan ini tidak terlalu pedas.", level: "n5", tags: ["makanan-minuman"] }
  ],
  "vg-n5-00624": [
    { jp: "きのうのテストはぜんぜん分かりませんでした。", id: "Ujian kemarin sama sekali tidak saya mengerti.", level: "n5", tags: ["pendidikan"] }
  ],
  "vg-n5-00625": [
    { jp: "この喫茶店にはよく来ます。", id: "Saya sering datang ke kafe ini.", level: "n5", tags: ["kehidupan-sehari"] }
  ],
  "vg-n5-00627": [
    { jp: "宿題はだいたい終わりました。", id: "PR kira-kira sudah selesai sebagian besar.", level: "n5", tags: ["pendidikan"] }
  ],
  "vg-n5-00629": [
    { jp: "すみません、水をもう一杯ください。", id: "Permisi, tolong berikan satu gelas air lagi.", level: "n5", tags: ["makanan-minuman", "belanja"] }
  ],
  "vg-n5-00630": [
    { jp: "ここでちょっと待ってください。", id: "Tolong tunggu sebentar di sini.", level: "n5", tags: ["kehidupan-sehari"] }
  ],

  // ─── EXPRESSIONS (1 entry) ───────────────────────────────────────────
  "vg-n5-00413": [
    { jp: "仕事が終わりましたので、お先に失礼します。", id: "Karena pekerjaan sudah selesai, permisi saya pulang duluan.", level: "n5", tags: ["pekerjaan"] }
  ],

  // ─── VERBS (16 entries) ──────────────────────────────────────────────
  "vg-n5-00415": [
    { jp: "日本での生活はとても楽しいです。", id: "Kehidupan di Jepang sangat menyenangkan.", level: "n5", tags: ["kehidupan-sehari"] }
  ],
  "vg-n5-00456": [
    { jp: "急いで走れば、電車に間に合います。", id: "Kalau buru-buru lari, akan sempat mengejar kereta tepat waktu.", level: "n5", tags: ["kehidupan-sehari", "waktu"] }
  ],
  "vg-n5-00497": [
    { jp: "郵便局で手紙を出しました。", id: "Saya mengirim surat di kantor pos.", level: "n5", tags: ["kehidupan-sehari"] }
  ],
  "vg-n5-00499": [
    { jp: "かばんに本とノートを入れます。", id: "Saya memasukkan buku dan buku catatan ke dalam tas.", level: "n5", tags: ["kehidupan-sehari", "pendidikan"] }
  ],
  "vg-n5-00518": [
    { jp: "風邪をひいたので、会社を休みます。", id: "Karena masuk angin, saya izin tidak masuk kerja.", level: "n5", tags: ["kesehatan", "pekerjaan"] }
  ],
  "vg-n5-00521": [
    { jp: "あした自動車の工場を見学します。", id: "Besok kami akan melakukan kunjungan belajar ke pabrik mobil.", level: "n5", tags: ["pendidikan", "pekerjaan"] }
  ],
  "vg-n5-00522": [
    { jp: "京都の有名なお寺を見物しました。", id: "Saya berkeliling melihat-lihat kuil terkenal di Kyoto.", level: "n5", tags: ["kehidupan-sehari"] }
  ],
  "vg-n5-00523": [
    { jp: "部屋の窓からきれいな海が見えます。", id: "Dari jendela kamar terlihat laut yang indah.", level: "n5", tags: ["alam-lingkungan", "kehidupan-sehari"] }
  ],
  "vg-n5-00525": [
    { jp: "夏休みに家族と旅行します。", id: "Saya akan berlibur bersama keluarga saat liburan musim panas.", level: "n5", tags: ["keluarga", "kehidupan-sehari"] }
  ],
  "vg-n5-00547": [
    { jp: "このお金で買い物の代金は足りますか。", id: "Apakah uang ini cukup untuk biaya belanja?", level: "n5", tags: ["belanja"] }
  ],
  "vg-n5-00612": [
    { jp: "この部屋でタバコをすわないでください。", id: "Tolong jangan merokok di ruangan ini.", level: "n5", tags: ["kesehatan", "kehidupan-sehari"] }
  ],
  "vg-n5-00613": [
    { jp: "毎晩十一時にねます。", id: "Setiap malam saya tidur pada jam 11.", level: "n5", tags: ["kehidupan-sehari", "waktu"] }
  ],
  "vg-n5-00614": [
    { jp: "つくえの上に荷物をおいてください。", id: "Tolong letakkan barang bawaan di atas meja.", level: "n5", tags: ["kehidupan-sehari"] }
  ],
  "vg-n5-00618": [
    { jp: "時間がありませんから、いそぎましょう。", id: "Karena tidak ada waktu, mari kita bergegas.", level: "n5", tags: ["kehidupan-sehari", "waktu"] }
  ],
  "vg-n5-00619": [
    { jp: "たくさん走って、のどがかわきました。", id: "Setelah banyak berlari, tenggorokan saya terasa haus.", level: "n5", tags: ["kesehatan"] }
  ],
  "vg-n5-00620": [
    { jp: "おなかがすいたので、ラーメンを食べたいです。", id: "Karena lapar, saya ingin makan ramen.", level: "n5", tags: ["makanan-minuman", "kesehatan"] }
  ],

  // ─── NOUNS (183 entries) ─────────────────────────────────────────────
  "vg-n5-00412": [
    { jp: "先月、新しいカメラを買いました。", id: "Bulan lalu, saya membeli kamera baru.", level: "n5", tags: ["waktu", "belanja"] }
  ],
  "vg-n5-00416": [
    { jp: "友達の誕生日にプレゼントをあげました。", id: "Saya memberi hadiah pada ulang tahun teman saya.", level: "n5", tags: ["pertemanan", "kehidupan-sehari"] }
  ],
  "vg-n5-00420": [
    { jp: "教室に学生が五人います。", id: "Ada lima orang siswa di dalam kelas.", level: "n5", tags: ["pendidikan"] }
  ],
  "vg-n5-00422": [
    { jp: "この映画のチケットは大人は千円です。", id: "Tiket film ini untuk orang dewasa seribu yen.", level: "n5", tags: ["belanja", "kehidupan-sehari"] }
  ],
  "vg-n5-00423": [
    { jp: "いつか外国へ旅行に行きたいです。", id: "Suatu saat saya ingin pergi berlibur ke luar negeri.", level: "n5", tags: ["kehidupan-sehari"] }
  ],
  "vg-n5-00424": [
    { jp: "あなたの国はどちらですか。", id: "Negara Anda dari mana?", level: "n5", tags: ["pertemanan", "umum"] }
  ],
  "vg-n5-00425": [
    { jp: "あそこに背が高い男の人がいます。", id: "Di sana ada seorang pria berbadan tinggi.", level: "n5", tags: ["kehidupan-sehari"] }
  ],
  "vg-n5-00426": [
    { jp: "公園で小さい男の子が遊んでいます。", id: "Seorang anak laki-laki kecil sedang bermain di taman.", level: "n5", tags: ["kehidupan-sehari"] }
  ],
  "vg-n5-00427": [
    { jp: "あそこで本を読んでいる女の人は誰ですか。", id: "Siapa wanita yang sedang membaca buku di sana itu?", level: "n5", tags: ["kehidupan-sehari"] }
  ],
  "vg-n5-00428": [
    { jp: "その女の子は赤い帽子をかぶっています。", id: "Anak perempuan itu memakai topi merah.", level: "n5", tags: ["kehidupan-sehari"] }
  ],
  "vg-n5-00429": [
    { jp: "彼女はとても親切で優しい人です。", id: "Dia adalah orang yang sangat ramah dan baik hati.", level: "n5", tags: ["pertemanan"] }
  ],
  "vg-n5-00430": [
    { jp: "子どもたちが庭で元気に遊んでいます。", id: "Anak-anak sedang bermain dengan ceria di halaman.", level: "n5", tags: ["keluarga", "kehidupan-sehari"] }
  ],
  "vg-n5-00432": [
    { jp: "あなたのお父さんの仕事は何ですか。", id: "Apa pekerjaan ayah Anda?", level: "n5", tags: ["keluarga", "pekerjaan"] }
  ],
  "vg-n5-00433": [
    { jp: "お母さんは台所でおいしい料理を作っています。", id: "Ibu sedang membuat masakan enak di dapur.", level: "n5", tags: ["keluarga", "makanan-minuman"] }
  ],
  "vg-n5-00436": [
    { jp: "田中さんは明日会社に来ますか。", id: "Apakah Tanaka-san akan datang ke kantor besok?", level: "n5", tags: ["pekerjaan"] }
  ],
  "vg-n5-00437": [
    { jp: "山田さんと一緒に昼ごはんを食べました。", id: "Saya makan siang bersama Yamada-san.", level: "n5", tags: ["pertemanan", "makanan-minuman"] }
  ],
  "vg-n5-00438": [
    { jp: "新幹線から富士山がきれいに見えました。", id: "Gunung Fuji terlihat indah dari Shinkansen.", level: "n5", tags: ["alam-lingkungan", "kehidupan-sehari"] }
  ],
  "vg-n5-00441": [
    { jp: "日本には桜の木がたくさんあります。", id: "Di Jepang ada banyak pohon sakura.", level: "n5", tags: ["alam-lingkungan"] }
  ],
  "vg-n5-00442": [
    { jp: "ペンを二本買いました。", id: "Saya membeli dua buah pulpen.", level: "n5", tags: ["belanja", "kehidupan-sehari"] }
  ],
  "vg-n5-00443": [
    { jp: "明日の会議は何時から始まりますか。", id: "Rapat besok dimulai dari jam berapa?", level: "n5", tags: ["waktu", "pekerjaan"] }
  ],
  "vg-n5-00444": [
    { jp: "毎日、何時間日本語を勉強しますか。", id: "Setiap hari Anda belajar bahasa Jepang berapa jam?", level: "n5", tags: ["pendidikan", "waktu"] }
  ],
  "vg-n5-00445": [
    { jp: "朝ごはんに何を食べましたか。", id: "Apa yang Anda makan untuk sarapan pagi?", level: "n5", tags: ["makanan-minuman", "kehidupan-sehari"] }
  ],
  "vg-n5-00446": [
    { jp: "インドネシアでは何語を話しますか。", id: "Di Indonesia Anda berbicara bahasa apa?", level: "n5", tags: ["pendidikan", "umum"] }
  ],
  "vg-n5-00447": [
    { jp: "学校の授業は朝九時に始まります。", id: "Pelajaran sekolah dimulai pada pukul sembilan pagi.", level: "n5", tags: ["pendidikan", "waktu"] }
  ],
  "vg-n5-00448": [
    { jp: "東京から京都まで四時間かかりました。", id: "Dari Tokyo sampai Kyoto memakan waktu empat jam.", level: "n5", tags: ["waktu", "kehidupan-sehari"] }
  ],
  "vg-n5-00450": [
    { jp: "駅から家まで歩いて五分です。", id: "Dari stasiun ke rumah jalan kaki lima menit.", level: "n5", tags: ["waktu", "kehidupan-sehari"] }
  ],
  "vg-n5-00451": [
    { jp: "三十分休んでからまた勉強しましょう。", id: "Mari istirahat tiga puluh menit lalu belajar lagi.", level: "n5", tags: ["waktu", "pendidikan"] }
  ],
  "vg-n5-00452": [
    { jp: "りんごを半分に切って食べました。", id: "Saya memotong apel menjadi setengah bagian lalu memakannya.", level: "n5", tags: ["makanan-minuman"] }
  ],
  "vg-n5-00453": [
    { jp: "一週間に二回テニスをします。", id: "Saya bermain tenis dua kali dalam seminggu.", level: "n5", tags: ["kehidupan-sehari", "waktu"] }
  ],
  "vg-n5-00454": [
    { jp: "机とベッドの間にゴミ箱があります。", id: "Ada tempat sampah di antara meja dan tempat tidur.", level: "n5", tags: ["ruang-arah", "kehidupan-sehari"] }
  ],
  "vg-n5-00455": [
    { jp: "この間、デパートで田中さんに会いました。", id: "Tempo hari, saya bertemu Tanaka-san di toserba.", level: "n5", tags: ["pertemanan", "waktu"] }
  ],
  "vg-n5-00457": [
    { jp: "毎朝七時半に朝ごはんを食べます。", id: "Setiap pagi pukul setengah delapan saya sarapan.", level: "n5", tags: ["makanan-minuman", "waktu"] }
  ],
  "vg-n5-00458": [
    { jp: "映画は一時間半で終わりました。", id: "Filmnya selesai dalam waktu satu setengah jam.", level: "n5", tags: ["waktu", "kehidupan-sehari"] }
  ],
  "vg-n5-00461": [
    { jp: "駅の前で友達を待っています。", id: "Saya sedang menunggu teman di depan stasiun.", level: "n5", tags: ["ruang-arah", "pertemanan"] }
  ],
  "vg-n5-00462": [
    { jp: "ご飯を食べた後で、薬を飲みます。", id: "Setelah makan nasi, saya meminum obat.", level: "n5", tags: ["kesehatan", "waktu"] }
  ],
  "vg-n5-00463": [
    { jp: "私の後ろに山田さんが座っています。", id: "Yamada-san duduk di belakang saya.", level: "n5", tags: ["ruang-arah", "kehidupan-sehari"] }
  ],
  "vg-n5-00464": [
    { jp: "今月はとても仕事が忙しいです。", id: "Bulan ini pekerjaan sangat sibuk.", level: "n5", tags: ["pekerjaan", "waktu"] }
  ],
  "vg-n5-00465": [
    { jp: "今週の日曜日に映画を見に行きます。", id: "Minggu ini pada hari Minggu saya akan pergi menonton film.", level: "n5", tags: ["waktu", "kehidupan-sehari"] }
  ],
  "vg-n5-00467": [
    { jp: "今年、日本語の試験を受けます。", id: "Tahun ini saya akan mengikuti ujian bahasa Jepang.", level: "n5", tags: ["pendidikan", "waktu"] }
  ],
  "vg-n5-00468": [
    { jp: "今朝はパンとコーヒーを食べました。", id: "Pagi ini saya sarapan roti dan kopi.", level: "n5", tags: ["makanan-minuman", "waktu"] }
  ],
  "vg-n5-00469": [
    { jp: "先週、新しい服を買いました。", id: "Minggu lalu, saya membeli pakaian baru.", level: "n5", tags: ["belanja", "waktu"] }
  ],
  "vg-n5-00470": [
    { jp: "来週の月曜日にテストがあります。", id: "Ada ujian pada hari Senin minggu depan.", level: "n5", tags: ["pendidikan", "waktu"] }
  ],
  "vg-n5-00471": [
    { jp: "一年は十二か月あります。", id: "Satu tahun terdiri dari dua belas bulan.", level: "n5", tags: ["waktu", "umum"] }
  ],
  "vg-n5-00472": [
    { jp: "去年、日本へ旅行に行きました。", id: "Tahun lalu, saya pergi berlibur ke Jepang.", level: "n5", tags: ["waktu", "kehidupan-sehari"] }
  ],
  "vg-n5-00473": [
    { jp: "半年間、日本語を勉強しています。", id: "Saya sudah belajar bahasa Jepang selama setengah tahun.", level: "n5", tags: ["pendidikan", "waktu"] }
  ],
  "vg-n5-00479": [
    { jp: "弟は近くの小学校に通っています。", id: "Adik laki-laki saya bersekolah di SD terdekat.", level: "n5", tags: ["pendidikan", "keluarga"] }
  ],
  "vg-n5-00480": [
    { jp: "兄は東京の大学で経済を学んでいます。", id: "Kakak laki-laki saya kuliah ekonomi di universitas di Tokyo.", level: "n5", tags: ["pendidikan", "keluarga"] }
  ],
  "vg-n5-00485": [
    { jp: "高校の時、サッカー部にいました。", id: "Saat SMA, saya masuk klub sepak bola.", level: "n5", tags: ["pendidikan"] }
  ],
  "vg-n5-00490": [
    { jp: "校長先生が朝礼で話をしました。", id: "Bapak kepala sekolah berpidato di apel pagi.", level: "n5", tags: ["pendidikan"] }
  ],
  "vg-n5-00492": [
    { jp: "妹は今年から中学校に入りました。", id: "Adik perempuan saya masuk SMP mulai tahun ini.", level: "n5", tags: ["pendidikan", "keluarga"] }
  ],
  "vg-n5-00493": [
    { jp: "雨が降っていたので、一日中家で本を読みました。", id: "Karena hujan turun, sepanjang hari saya membaca buku di rumah.", level: "n5", tags: ["kehidupan-sehari", "waktu"] }
  ],
  "vg-n5-00496": [
    { jp: "薬を飲むときは、口を大きく開けてください。", id: "Saat minum obat, tolong buka mulut lebar-lebar.", level: "n5", tags: ["kesehatan"] }
  ],
  "vg-n5-00498": [
    { jp: "デパートの入り口で待ち合わせをしましょう。", id: "Mari kita janjian bertemu di pintu masuk toserba.", level: "n5", tags: ["ruang-arah", "pertemanan"] }
  ],
  "vg-n5-00500": [
    { jp: "東京は人が多くてにぎやかな町です。", id: "Tokyo adalah kota yang ramai dan banyak orang.", level: "n5", tags: ["kehidupan-sehari"] }
  ],
  "vg-n5-00501": [
    { jp: "太陽は東から昇ります。", id: "Matahari terbit dari sebelah timur.", level: "n5", tags: ["alam-lingkungan", "ruang-arah"] }
  ],
  "vg-n5-00502": [
    { jp: "駅の東口を出たところに交番があります。", id: "Ada pos polisi di tempat keluar pintu timur stasiun.", level: "n5", tags: ["ruang-arah", "kehidupan-sehari"] }
  ],
  "vg-n5-00503": [
    { jp: "美術館で西洋の絵画を見ました。", id: "Saya melihat lukisan Barat di museum seni.", level: "n5", tags: ["pendidikan", "umum"] }
  ],
  "vg-n5-00504": [
    { jp: "夕方になると、西の空が赤くなります。", id: "Ketika menjelang sore, langit barat berubah menjadi merah.", level: "n5", tags: ["alam-lingkungan", "ruang-arah"] }
  ],
  "vg-n5-00505": [
    { jp: "西口の前にあるカフェでコーヒーを飲みました。", id: "Saya minum kopi di kafe yang ada di depan pintu barat.", level: "n5", tags: ["ruang-arah", "kehidupan-sehari"] }
  ],
  "vg-n5-00506": [
    { jp: "南の島へ旅行に行きました。", id: "Saya pergi berlibur ke pulau di sebelah selatan.", level: "n5", tags: ["ruang-arah", "kehidupan-sehari"] }
  ],
  "vg-n5-00507": [
    { jp: "南口のバス乗り場からバスに乗ります。", id: "Saya naik bus dari halte bus di pintu selatan.", level: "n5", tags: ["ruang-arah", "kehidupan-sehari"] }
  ],
  "vg-n5-00508": [
    { jp: "冬の北海道は雪がたくさん降って寒いです。", id: "Di Hokkaido musim dingin salju turun banyak dan dingin.", level: "n5", tags: ["alam-lingkungan", "kehidupan-sehari"] }
  ],
  "vg-n5-00509": [
    { jp: "この部屋の窓は北を向いています。", id: "Jendela kamar ini menghadap ke arah utara.", level: "n5", tags: ["ruang-arah", "kehidupan-sehari"] }
  ],
  "vg-n5-00510": [
    { jp: "駅の北口にはタクシーがたくさん待っています。", id: "Di pintu utara stasiun banyak taksi menunggu.", level: "n5", tags: ["ruang-arah", "kehidupan-sehari"] }
  ],
  "vg-n5-00513": [
    { jp: "寒いので暖かい上着を着ました。", id: "Karena dingin, saya memakai jaket hangat.", level: "n5", tags: ["kehidupan-sehari"] }
  ],
  "vg-n5-00517": [
    { jp: "外は雨が降っていますから、傘を持って行きます。", id: "Di luar sedang hujan, jadi saya membawa payung.", level: "n5", tags: ["alam-lingkungan", "kehidupan-sehari"] }
  ],
  "vg-n5-00520": [
    { jp: "昼休みに同僚とお弁当を食べました。", id: "Saat istirahat siang saya makan bento bersama rekan kerja.", level: "n5", tags: ["pekerjaan", "makanan-minuman"] }
  ],
  "vg-n5-00527": [
    { jp: "日曜日にスーパーへ買いものに行きます。", id: "Pada hari Minggu saya pergi berbelanja ke supermarket.", level: "n5", tags: ["belanja", "kehidupan-sehari"] }
  ],
  "vg-n5-00528": [
    { jp: "来月、新しいアパートに引っ越します。", id: "Bulan depan, saya akan pindah ke apartemen baru.", level: "n5", tags: ["waktu", "kehidupan-sehari"] }
  ],
  "vg-n5-00531": [
    { jp: "デパートの地下で食料品を買いました。", id: "Saya membeli bahan makanan di lantai bawah tanah toserba.", level: "n5", tags: ["belanja", "makanan-minuman"] }
  ],
  "vg-n5-00532": [
    { jp: "好きな日本の食べものは寿司です。", id: "Makanan Jepang favorit saya adalah sushi.", level: "n5", tags: ["makanan-minuman"] }
  ],
  "vg-n5-00533": [
    { jp: "冷たい飲みものを一杯いかがですか。", id: "Bagaimana kalau segelas minuman dingin?", level: "n5", tags: ["makanan-minuman"] }
  ],
  "vg-n5-00534": [
    { jp: "毎日の授業で日本語の会話を練習します。", id: "Setiap hari di kelas saya berlatih percakapan bahasa Jepang.", level: "n5", tags: ["pendidikan"] }
  ],
  "vg-n5-00544": [
    { jp: "昨日から右の耳が少し痛いです。", id: "Sejak kemarin telinga kanan saya terasa agak sakit.", level: "n5", tags: ["kesehatan"] }
  ],
  "vg-n5-00546": [
    { jp: "たくさん歩いたので、足が疲れました。", id: "Karena banyak berjalan, kaki saya merasa lelah.", level: "n5", tags: ["kesehatan"] }
  ],
  "vg-n5-00549": [
    { jp: "一つ目の角を右に曲がってください。", id: "Tolong belok ke kanan di tikungan yang pertama.", level: "n5", tags: ["ruang-arah", "kehidupan-sehari"] }
  ],
  "vg-n5-00550": [
    { jp: "重い荷物を運ぶために力が必要です。", id: "Tenaga diperlukan untuk mengangkut barang bawaan berat.", level: "n5", tags: ["kehidupan-sehari"] }
  ],
  "vg-n5-00551": [
    { jp: "彼は力持ちですから、重い箱を一人で持ち上げました。", id: "Karena dia orang kuat, dia mengangkat kotak berat itu sendirian.", level: "n5", tags: ["pertemanan", "kehidupan-sehari"] }
  ],
  "vg-n5-00554": [
    { jp: "牧場にたくさんの牛がいます。", id: "Ada banyak sapi di peternakan.", level: "n5", tags: ["alam-lingkungan"] }
  ],
  "vg-n5-00555": [
    { jp: "魚屋で新鮮な魚を二匹買いました。", id: "Saya membeli dua ekor ikan segar di toko ikan.", level: "n5", tags: ["belanja", "makanan-minuman"] }
  ],
  "vg-n5-00559": [
    { jp: "学校の正門は朝八時に開きます。", id: "Pintu gerbang utama sekolah buka jam delapan pagi.", level: "n5", tags: ["pendidikan", "ruang-arah"] }
  ],
  "vg-n5-00560": [
    { jp: "大学での私の専門は日本文学です。", id: "Spesialisasi saya di universitas adalah sastra Jepang.", level: "n5", tags: ["pendidikan"] }
  ],
  "vg-n5-00561": [
    { jp: "山の朝の空気はとてもきれいで涼しいです。", id: "Udara pagi di gunung sangat bersih dan sejuk.", level: "n5", tags: ["alam-lingkungan"] }
  ],
  "vg-n5-00563": [
    { jp: "青い空に白い雲が浮かんでいます。", id: "Awan putih terapung di langit yang biru.", level: "n5", tags: ["alam-lingkungan"] }
  ],
  "vg-n5-00564": [
    { jp: "白は清潔な感じがする色です。", id: "Putih adalah warna yang memberikan kesan bersih.", level: "n5", tags: ["kehidupan-sehari", "umum"] }
  ],
  "vg-n5-00565": [
    { jp: "一番好きな季節は春です。", id: "Musim yang paling disukai adalah musim semi.", level: "n5", tags: ["kehidupan-sehari", "alam-lingkungan"] }
  ],
  "vg-n5-00566": [
    { jp: "りんごを二個買って食べました。", id: "Saya membeli dua buah apel lalu memakannya.", level: "n5", tags: ["makanan-minuman", "belanja"] }
  ],
  "vg-n5-00567": [
    { jp: "私の家族は父と母と私の三人です。", id: "Keluarga saya terdiri dari tiga orang: ayah, ibu, dan saya.", level: "n5", tags: ["keluarga"] }
  ],
  "vg-n5-00568": [
    { jp: "テーブルの上に四冊の本があります。", id: "Ada empat buah buku di atas meja.", level: "n5", tags: ["kehidupan-sehari"] }
  ],
  "vg-n5-00569": [
    { jp: "鉛筆を五本持っています。", id: "Saya mempunyai lima batang pensil.", level: "n5", tags: ["pendidikan"] }
  ],
  "vg-n5-00570": [
    { jp: "毎朝六時に起きて散歩します。", id: "Setiap pagi pukul enam saya bangun dan jalan-jalan.", level: "n5", tags: ["kehidupan-sehari", "waktu"] }
  ],
  "vg-n5-00571": [
    { jp: "夜の七時に晩ごはんを食べます。", id: "Saya makan malam pada pukul tujuh malam.", level: "n5", tags: ["makanan-minuman", "waktu"] }
  ],
  "vg-n5-00572": [
    { jp: "毎朝八時に家を出て学校へ行きます。", id: "Setiap pagi pukul delapan saya keluar rumah pergi ke sekolah.", level: "n5", tags: ["pendidikan", "waktu"] }
  ],
  "vg-n5-00573": [
    { jp: "私の部屋は九階にあります。", id: "Kamar saya berada di lantai sembilan.", level: "n5", tags: ["kehidupan-sehari"] }
  ],
  "vg-n5-00574": [
    { jp: "みかんを十個買いました。", id: "Saya membeli sepuluh buah jeruk.", level: "n5", tags: ["belanja", "makanan-minuman"] }
  ],
  "vg-n5-00575": [
    { jp: "このノートは百円です。", id: "Buku catatan ini harganya seratus yen.", level: "n5", tags: ["belanja"] }
  ],
  "vg-n5-00576": [
    { jp: "財布の中に千円札が一枚あります。", id: "Di dalam dompet ada satu lembar uang seribu yen.", level: "n5", tags: ["belanja", "kehidupan-sehari"] }
  ],
  "vg-n5-00577": [
    { jp: "この時計は一万円でした。", id: "Jam tangan ini harganya sepuluh ribu yen.", level: "n5", tags: ["belanja"] }
  ],
  "vg-n5-00578": [
    { jp: "パンを一つ買いました。", id: "Saya membeli satu buah roti.", level: "n5", tags: ["belanja", "makanan-minuman"] }
  ],
  "vg-n5-00579": [
    { jp: "りんごを二つください。", id: "Tolong berikan dua buah apel.", level: "n5", tags: ["belanja", "makanan-minuman"] }
  ],
  "vg-n5-00580": [
    { jp: "ケーキを三つ注文しました。", id: "Saya memesan tiga buah kue.", level: "n5", tags: ["belanja", "makanan-minuman"] }
  ],
  "vg-n5-00581": [
    { jp: "いすが四つ並んでいます。", id: "Ada empat buah kursi berjejer.", level: "n5", tags: ["kehidupan-sehari"] }
  ],
  "vg-n5-00582": [
    { jp: "箱の中に卵が五つ入っています。", id: "Di dalam kotak ada lima butir telur.", level: "n5", tags: ["makanan-minuman"] }
  ],
  "vg-n5-00583": [
    { jp: "お皿の上にトマトが六つあります。", id: "Ada enam buah tomat di atas piring.", level: "n5", tags: ["makanan-minuman"] }
  ],
  "vg-n5-00584": [
    { jp: "机の上にコップが七つ並んでいます。", id: "Ada tujuh buah gelas berjejer di atas meja.", level: "n5", tags: ["kehidupan-sehari"] }
  ],
  "vg-n5-00585": [
    { jp: "お菓子を八つ買いました。", id: "Saya membeli delapan bungkus makanan ringan.", level: "n5", tags: ["belanja", "makanan-minuman"] }
  ],
  "vg-n5-00586": [
    { jp: "みかんが全部で九つあります。", id: "Ada sembilan buah jeruk secara keseluruhan.", level: "n5", tags: ["makanan-minuman"] }
  ],
  "vg-n5-00588": [
    { jp: "毎週火曜日に英語のテストがあります。", id: "Setiap hari Selasa ada ujian bahasa Inggris.", level: "n5", tags: ["pendidikan", "waktu"] }
  ],
  "vg-n5-00589": [
    { jp: "水曜日の午後は授業がありません。", id: "Hari Rabu siang tidak ada pelajaran.", level: "n5", tags: ["pendidikan", "waktu"] }
  ],
  "vg-n5-00590": [
    { jp: "木曜日は友達とテニスをします。", id: "Hari Kamis saya bermain tenis bersama teman.", level: "n5", tags: ["pertemanan", "waktu"] }
  ],
  "vg-n5-00591": [
    { jp: "金曜日の夜は映画を見ます。", id: "Pada Jumat malam saya menonton film.", level: "n5", tags: ["kehidupan-sehari", "waktu"] }
  ],
  "vg-n5-00595": [
    { jp: "二月は一年の中で一番寒いです。", id: "Bulan Februari adalah bulan paling dingin dalam setahun.", level: "n5", tags: ["alam-lingkungan", "waktu"] }
  ],
  "vg-n5-00596": [
    { jp: "日本では三月に卒業式があります。", id: "Di Jepang ada upacara kelulusan pada bulan Maret.", level: "n5", tags: ["pendidikan", "waktu"] }
  ],
  "vg-n5-00598": [
    { jp: "五月に長い休みがあります。", id: "Pada bulan Mei ada liburan panjang.", level: "n5", tags: ["kehidupan-sehari", "waktu"] }
  ],
  "vg-n5-00599": [
    { jp: "六月は日本で雨がたくさん降ります。", id: "Pada bulan Juni, banyak hujan turun di Jepang.", level: "n5", tags: ["alam-lingkungan", "waktu"] }
  ],
  "vg-n5-00600": [
    { jp: "七月から学校の夏休みが始まります。", id: "Liburan musim panas sekolah dimulai dari bulan Juli.", level: "n5", tags: ["pendidikan", "waktu"] }
  ],
  "vg-n5-00601": [
    { jp: "八月はとても暑いので海へ行きます。", id: "Bulan Agustus sangat panas, jadi saya pergi ke laut.", level: "n5", tags: ["alam-lingkungan", "waktu"] }
  ],
  "vg-n5-00602": [
    { jp: "九月に新しい学期が始まります。", id: "Semester baru dimulai pada bulan September.", level: "n5", tags: ["pendidikan", "waktu"] }
  ],
  "vg-n5-00603": [
    { jp: "十月は涼しくて過ごしやすい季節です。", id: "Bulan Oktober sejuk dan merupakan musim yang nyaman.", level: "n5", tags: ["alam-lingkungan", "waktu"] }
  ],
  "vg-n5-00604": [
    { jp: "十一月に京都の紅葉を見に行きます。", id: "Pada bulan November saya pergi melihat daun musim gugur di Kyoto.", level: "n5", tags: ["alam-lingkungan", "waktu"] }
  ],
  "vg-n5-00605": [
    { jp: "十二月は年末でとても忙しいです。", id: "Bulan Desember sangat sibuk karena akhir tahun.", level: "n5", tags: ["kehidupan-sehari", "waktu"] }
  ],
  "vg-n5-00631": [
    { jp: "私の祖父は毎朝散歩をします。", id: "Kakek saya jalan-jalan setiap pagi.", level: "n5", tags: ["keluarga", "kesehatan"] }
  ],
  "vg-n5-00632": [
    { jp: "祖母が編んだセーターを着ています。", id: "Saya memakai sweter yang dirajut oleh nenek saya.", level: "n5", tags: ["keluarga", "kehidupan-sehari"] }
  ],
  "vg-n5-00633": [
    { jp: "私の両親は田舎に住んでいます。", id: "Kedua orang tua saya tinggal di desa.", level: "n5", tags: ["keluarga"] }
  ],
  "vg-n5-00634": [
    { jp: "兄弟は何人いますか。", id: "Anda punya saudara kandung berapa orang?", level: "n5", tags: ["keluarga", "pertemanan"] }
  ],
  "vg-n5-00635": [
    { jp: "私の叔父は東京で会社員をしています。", id: "Paman saya bekerja sebagai karyawan kantor di Tokyo.", level: "n5", tags: ["keluarga", "pekerjaan"] }
  ],
  "vg-n5-00636": [
    { jp: "叔母からおいしいお菓子をもらいました。", id: "Saya mendapat makanan ringan yang lezat dari bibi saya.", level: "n5", tags: ["keluarga", "makanan-minuman"] }
  ],
  "vg-n5-00637": [
    { jp: "私の息子は毎日元気に学校へ通っています。", id: "Anak laki-laki saya setiap hari pergi ke sekolah dengan ceria.", level: "n5", tags: ["keluarga", "pendidikan"] }
  ],
  "vg-n5-00638": [
    { jp: "娘はピアノを上手に弾きます。", id: "Anak perempuan saya memainkan piano dengan pandai.", level: "n5", tags: ["keluarga", "kehidupan-sehari"] }
  ],
  "vg-n5-00639": [
    { jp: "孫が遊びに来てとてもうれしいです。", id: "Saya sangat senang cucu saya datang bermain.", level: "n5", tags: ["keluarga"] }
  ],
  "vg-n5-00640": [
    { jp: "私の妻は料理がとても上手です。", id: "Istri saya sangat pandai memasak.", level: "n5", tags: ["keluarga", "makanan-minuman"] }
  ],
  "vg-n5-00641": [
    { jp: "夫は毎朝七時に仕事へ行きます。", id: "Suami saya pergi bekerja setiap pagi jam tujuh.", level: "n5", tags: ["keluarga", "pekerjaan"] }
  ],
  "vg-n5-00642": [
    { jp: "甥の誕生日に本をプレゼントしました。", id: "Saya menghadiahi buku pada hari ulang tahun keponakan laki-laki saya.", level: "n5", tags: ["keluarga", "kehidupan-sehari"] }
  ],
  "vg-n5-00643": [
    { jp: "姪は今年小学校に入学しました。", id: "Keponakan perempuan saya masuk SD tahun ini.", level: "n5", tags: ["keluarga", "pendidikan"] }
  ],
  "vg-n5-00644": [
    { jp: "夏休みにいとこと一緒に海へ行きました。", id: "Saat liburan musim panas saya pergi ke laut bersama sepupu.", level: "n5", tags: ["keluarga", "kehidupan-sehari"] }
  ],
  "vg-n5-00645": [
    { jp: "どんな色が好きですか。", id: "Warna seperti apa yang Anda sukai?", level: "n5", tags: ["kehidupan-sehari", "umum"] }
  ],
  "vg-n5-00646": [
    { jp: "赤はとても目立つ色です。", id: "Merah adalah warna yang sangat mencolok.", level: "n5", tags: ["kehidupan-sehari", "umum"] }
  ],
  "vg-n5-00647": [
    { jp: "私の車は白です。", id: "Mobil saya berwarna putih.", level: "n5", tags: ["kehidupan-sehari"] }
  ],
  "vg-n5-00648": [
    { jp: "青いペンでノートに名前を書きました。", id: "Saya menulis nama di buku catatan dengan pulpen biru.", level: "n5", tags: ["pendidikan", "kehidupan-sehari"] }
  ],
  "vg-n5-00649": [
    { jp: "庭に黄色い花がたくさん咲いています。", id: "Banyak bunga kuning bermekaran di halaman.", level: "n5", tags: ["alam-lingkungan"] }
  ],
  "vg-n5-00650": [
    { jp: "黒いかばんを買いました。", id: "Saya membeli tas berwarna hitam.", level: "n5", tags: ["belanja", "kehidupan-sehari"] }
  ],
  "vg-n5-00651": [
    { jp: "この町は緑が多くて空気がきれいです。", id: "Kota ini banyak tanaman hijau dan udaranya bersih.", level: "n5", tags: ["alam-lingkungan"] }
  ],
  "vg-n5-00652": [
    { jp: "茶色い靴を履いて出かけました。", id: "Saya memakai sepatu cokelat lalu keluar bepergian.", level: "n5", tags: ["kehidupan-sehari"] }
  ],
  "vg-n5-00653": [
    { jp: "妹はピンクのドレスが好きです。", id: "Adik perempuan saya menyukai gaun merah muda.", level: "n5", tags: ["keluarga", "kehidupan-sehari"] }
  ],
  "vg-n5-00654": [
    { jp: "ここはとても静かでいい所です。", id: "Di sini adalah tempat yang sangat tenang dan bagus.", level: "n5", tags: ["kehidupan-sehari", "umum"] }
  ],
  "vg-n5-00657": [
    { jp: "日曜日に友達とやきゅうをしました。", id: "Pada hari Minggu saya bermain bisbol bersama teman.", level: "n5", tags: ["pertemanan", "kehidupan-sehari"] }
  ],
  "vg-n5-00658": [
    { jp: "放課後にバスケットボールの練習をします。", id: "Sepulang sekolah kami berlatih bola basket.", level: "n5", tags: ["pendidikan", "kehidupan-sehari"] }
  ],
  "vg-n5-00661": [
    { jp: "夜、寝る前にクラシックの音楽を聴きます。", id: "Pada malam hari sebelum tidur, saya mendengarkan musik klasik.", level: "n5", tags: ["kehidupan-sehari"] }
  ],
  "vg-n5-00662": [
    { jp: "父はジャズが好きで、よくCDを聴いています。", id: "Ayah suka jazz dan sering mendengarkan CD.", level: "n5", tags: ["keluarga", "kehidupan-sehari"] }
  ],
  "vg-n5-00663": [
    { jp: "兄はロックバンドでギターを弾いています。", id: "Kakak laki-laki saya bermain gitar di band rock.", level: "n5", tags: ["keluarga", "kehidupan-sehari"] }
  ],
  "vg-n5-00664": [
    { jp: "日本のポップスをよく聴いて日本語を覚えました。", id: "Saya sering mendengarkan musik pop Jepang dan menghafal bahasa Jepang.", level: "n5", tags: ["pendidikan", "kehidupan-sehari"] }
  ],
  "vg-n5-00665": [
    { jp: "冬にこたつでみかんを食べるのが好きです。", id: "Saya suka makan jeruk keprok di kotatsu saat musim dingin.", level: "n5", tags: ["makanan-minuman", "kehidupan-sehari"] }
  ],
  "vg-n5-00666": [
    { jp: "甘くておいしいいちごを食べました。", id: "Saya makan stroberi yang manis dan enak.", level: "n5", tags: ["makanan-minuman"] }
  ],
  "vg-n5-00667": [
    { jp: "スーパーで紫色のぶどうを一房買いました。", id: "Saya membeli satu tangkai anggur ungu di supermarket.", level: "n5", tags: ["belanja", "makanan-minuman"] }
  ],
  "vg-n5-00668": [
    { jp: "電車やバスなど、色々なのりものがあります。", id: "Ada berbagai macam kendaraan seperti kereta dan bus.", level: "n5", tags: ["kehidupan-sehari", "umum"] }
  ],
  "vg-n5-00669": [
    { jp: "兄はオートバイに乗って会社へ行きます。", id: "Kakak laki-laki saya naik motor pergi ke kantor.", level: "n5", tags: ["pekerjaan", "kehidupan-sehari"] }
  ],
  "vg-n5-00671": [
    { jp: "今日はとてもいい天気ですね。", id: "Hari ini cuacanya sangat bagus ya.", level: "n5", tags: ["alam-lingkungan", "kehidupan-sehari"] }
  ],
  "vg-n5-00674": [
    { jp: "外に白い雪がたくさん降っています。", id: "Di luar salju putih sedang turun banyak.", level: "n5", tags: ["alam-lingkungan"] }
  ],
  "vg-n5-00675": [
    { jp: "強い台風が近づいていますから、外に出ないでください。", id: "Karena badai topan yang kuat mendekat, tolong jangan keluar rumah.", level: "n5", tags: ["alam-lingkungan", "kehidupan-sehari"] }
  ],
  "vg-n5-00676": [
    { jp: "ご飯を食べた後で、食器をきれいに洗います。", id: "Setelah makan nasi, saya mencuci peralatan makan hingga bersih.", level: "n5", tags: ["kehidupan-sehari", "makanan-minuman"] }
  ],
  "vg-n5-00677": [
    { jp: "お茶碗にご飯を半分だけ入れました。", id: "Saya memasukkan nasi setengah saja ke dalam mangkuk nasi.", level: "n5", tags: ["makanan-minuman", "kehidupan-sehari"] }
  ],
  "vg-n5-00678": [
    { jp: "料理を大きなお皿に盛り付けました。", id: "Saya menata hidangan di atas piring besar.", level: "n5", tags: ["makanan-minuman", "kehidupan-sehari"] }
  ],
  "vg-n5-00679": [
    { jp: "お箸を使って上手にうどんを食べました。", id: "Saya makan udon dengan pandai menggunakan sumpit.", level: "n5", tags: ["makanan-minuman", "kehidupan-sehari"] }
  ],
  "vg-n5-00680": [
    { jp: "温かいコーヒーをカップに注ぎました。", id: "Saya menuangkan kopi hangat ke dalam cangkir.", level: "n5", tags: ["makanan-minuman", "kehidupan-sehari"] }
  ],
  "vg-n5-00681": [
    { jp: "コップに冷たい水を一杯ください。", id: "Tolong berikan segelas air dingin di gelas.", level: "n5", tags: ["makanan-minuman", "kehidupan-sehari"] }
  ],
  "vg-n5-00683": [
    { jp: "辞書を本だなに戻してください。", id: "Tolong kembalikan kamus ke rak buku.", level: "n5", tags: ["pendidikan", "kehidupan-sehari"] }
  ],
  "vg-n5-00684": [
    { jp: "牛乳を冷蔵庫に入れて冷やします。", id: "Saya memasukkan susu ke dalam kulkas untuk mendinginkannya.", level: "n5", tags: ["makanan-minuman", "kehidupan-sehari"] }
  ],
  "vg-n5-00685": [
    { jp: "電子レンジでお弁当を温めました。", id: "Saya menghangatkan bento dengan microwave.", level: "n5", tags: ["makanan-minuman", "kehidupan-sehari"] }
  ],
  "vg-n5-00686": [
    { jp: "エアコンのリモコンはどこにありますか。", id: "Remote kontrol AC ada di mana?", level: "n5", tags: ["kehidupan-sehari"] }
  ],
  "vg-n5-00687": [
    { jp: "風邪をひいて、頭が痛いです。", id: "Karena masuk angin, kepala saya sakit.", level: "n5", tags: ["kesehatan"] }
  ],
  "vg-n5-00688": [
    { jp: "朝起きたら、首が痛くなりました。", id: "Ketika bangun di pagi hari, leher saya terasa sakit.", level: "n5", tags: ["kesehatan"] }
  ],
  "vg-n5-00689": [
    { jp: "健康のために毎日体を動かします。", id: "Demi kesehatan, saya menggerakkan tubuh setiap hari.", level: "n5", tags: ["kesehatan"] }
  ],
  "vg-n5-00690": [
    { jp: "ご飯を食べる前に、手をきれいに洗います。", id: "Sebelum makan nasi, saya mencuci tangan sampai bersih.", level: "n5", tags: ["kesehatan", "kehidupan-sehari"] }
  ],
  "vg-n5-00691": [
    { jp: "階段から落ちて、足を怪我しました。", id: "Saya jatuh dari tangga dan melukai kaki saya.", level: "n5", tags: ["kesehatan"] }
  ],
  "vg-n5-00692": [
    { jp: "パソコンを長く使ったので、目が疲れました。", id: "Karena memakai komputer lama, mata saya lelah.", level: "n5", tags: ["kesehatan", "pekerjaan"] }
  ],
  "vg-n5-00693": [
    { jp: "イヤホンを外して、耳を休ませます。", id: "Saya melepas earphone dan mengistirahatkan telinga.", level: "n5", tags: ["kesehatan", "kehidupan-sehari"] }
  ],
  "vg-n5-00694": [
    { jp: "毎食の後で、歯をきれいに磨きます。", id: "Setelah setiap kali makan, saya menyikat gigi sampai bersih.", level: "n5", tags: ["kesehatan", "kehidupan-sehari"] }
  ],
  "vg-n5-00695": [
    { jp: "歯医者で大きく口を開けました。", id: "Saya membuka mulut lebar-lebar di dokter gigi.", level: "n5", tags: ["kesehatan"] }
  ],
  "vg-n5-00700": [
    { jp: "ズボンのポケットに財布を入れました。", id: "Saya memasukkan dompet ke dalam saku celana.", level: "n5", tags: ["kehidupan-sehari"] }
  ],
  "vg-n5-00708": [
    { jp: "みかんを二つ食べました。", id: "Saya makan dua buah jeruk.", level: "n5", tags: ["makanan-minuman"] }
  ],
  "vg-n5-00709": [
    { jp: "シャツを三枚洗いました。", id: "Saya mencuci tiga lembar kemeja.", level: "n5", tags: ["kehidupan-sehari"] }
  ],
  "vg-n5-00710": [
    { jp: "会社に車が二台あります。", id: "Ada dua unit mobil di kantor.", level: "n5", tags: ["pekerjaan"] }
  ],
  "vg-n5-00711": [
    { jp: "図書館で日本語の本を二冊借りました。", id: "Saya meminjam dua buah buku bahasa Jepang di perpustakaan.", level: "n5", tags: ["pendidikan"] }
  ]
};

// ─── VALIDATION ──────────────────────────────────────────────────────────
let errors = 0;
for (const [id, examples] of Object.entries(data)) {
  if (!Array.isArray(examples) || examples.length === 0 || examples.length > 2) {
    console.error(`[ERROR] ID ${id}: examples must have 1-2 items`);
    errors++;
  }
  for (const ex of examples) {
    if (typeof ex.jp !== 'string' || ex.jp.length < 8) {
      console.error(`[ERROR] ID ${id}: jp "${ex.jp}" length < 8 (${ex.jp ? ex.jp.length : 0})`);
      errors++;
    }
    if (typeof ex.id !== 'string' || ex.id.length < 5) {
      console.error(`[ERROR] ID ${id}: id "${ex.id}" length < 5 (${ex.id ? ex.id.length : 0})`);
      errors++;
    }
    if (ex.level !== 'n5') {
      console.error(`[ERROR] ID ${id}: level must be 'n5', got "${ex.level}"`);
      errors++;
    }
    if (!Array.isArray(ex.tags) || ex.tags.length < 1 || ex.tags.length > 2) {
      console.error(`[ERROR] ID ${id}: tags length must be 1-2`);
      errors++;
    }
    for (const tag of ex.tags) {
      if (!ALLOWED_TAGS.has(tag)) {
        console.error(`[ERROR] ID ${id}: tag "${tag}" is not in allowed domain tags`);
        errors++;
      }
    }
  }
}

if (errors > 0) {
  console.error(`Validation failed with ${errors} errors!`);
  process.exit(1);
}
console.log(`Validation passed! All ${Object.keys(data).length} entries valid.`);

// ─── UPDATE TARGET FILES ─────────────────────────────────────────────────
const targets = [
  { file: 'n5-adjectives.js', varName: 'vocabN5_Adjectives' },
  { file: 'n5-adverbs.js', varName: 'vocabN5_Adverbs' },
  { file: 'n5-expressions.js', varName: 'vocabN5_Expressions' },
  { file: 'n5-verbs.js', varName: 'vocabN5_Verbs' },
  { file: 'n5-nouns.js', varName: 'vocabN5_Nouns' }
];

const basePath = path.join(__dirname, '..', 'public', 'data', 'vocab', 'n5');
const summary = {};

for (const { file, varName } of targets) {
  const filePath = path.join(basePath, file);
  let content = fs.readFileSync(filePath, 'utf8');

  let updatedCount = 0;

  // Each entry starts with `{\n  id: 'vg-n5-XXXXX',` and ends with `\n},` or similar.
  // We can use a regex that matches each entry block or specifically replaces `examples: []` for matching id.
  for (const [id, examples] of Object.entries(data)) {
    // Check if this id exists in this file
    const idPattern = new RegExp(`id:\\s*'${id}'`);
    if (!idPattern.test(content)) {
      continue;
    }

    // Match the entry block starting with id: '${id}' up to the closing `}` before the next entry or end of file
    // In these files, entries are:
    // {
    //   id: 'vg-n5-xxxxx',
    //   ...
    //   examples: [],
    //   ...
    // },
    // Let's replace `examples: []` within the scope of this id.
    const entryRegex = new RegExp(`(id:\\s*'${id}'[\\s\\S]*?examples:\\s*)\\[\\]`);
    if (entryRegex.test(content)) {
      const examplesFormatted = JSON.stringify(examples);
      content = content.replace(entryRegex, `$1${examplesFormatted}`);
      updatedCount++;
    } else {
      console.warn(`[WARN] ID ${id} in ${file} did not match examples: [] pattern`);
    }
  }

  summary[file] = updatedCount;

  // Verify updated content using vm
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  try {
    vm.runInContext(content, sandbox);
  } catch (err) {
    console.error(`Syntax error in updated ${file}:`, err);
    process.exit(1);
  }

  const items = sandbox.window[varName];
  if (!items || !Array.isArray(items)) {
    console.error(`Variable ${varName} not found in ${file}!`);
    process.exit(1);
  }

  const remainingMissing = items.filter(item => !item.examples || item.examples.length === 0);
  console.log(`${file}: updated ${updatedCount} entries. Remaining missing: ${remainingMissing.length}`);

  if (remainingMissing.length > 0) {
    console.error(`[ERROR] ${file} still has ${remainingMissing.length} missing entries!`);
    console.error(remainingMissing.map(m => m.id));
    process.exit(1);
  }

  // Write file back
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Successfully wrote ${file}`);
}

console.log('\n--- FINAL SUMMARY ---');
console.log(JSON.stringify(summary, null, 2));
