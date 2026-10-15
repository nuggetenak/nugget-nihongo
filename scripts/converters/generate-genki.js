#!/usr/bin/env node
/**
 * generate-genki.js
 * Generates Grammar and Vocabulary Lenses for Genki I & II (3rd Edition).
 * 
 * - Genki I: Chapters 1-12 (JLPT N5)
 * - Genki II: Chapters 13-23 (JLPT N4)
 * 
 * 100% Original Indonesian Explanations & Examples — Zero Copyright Infringement.
 * Outputs to public/data/staged-expansion/books/genki/
 */

const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '../..');
const OUT_DIR = path.join(REPO, 'public/data/staged-expansion/books/genki');
const PROD_VOCAB = path.join(REPO, 'public/data/vocab');
const STAGED_VOCAB = path.join(REPO, 'public/data/staged-expansion/vocab');

fs.mkdirSync(OUT_DIR, { recursive: true });

function loadVocabIds(level) {
  const ids = [];
  const prodFile = path.join(PROD_VOCAB, `vocab-${level}.js`);
  if (fs.existsSync(prodFile)) {
    const txt = fs.readFileSync(prodFile, 'utf8');
    const matches = txt.match(/"id":\s*"([^"]+)"/g) || [];
    for (const m of matches) {
      const match = m.match(/"id":\s*"([^"]+)"/);
      if (match) ids.push(match[1]);
    }
  }
  const stagedFile = path.join(STAGED_VOCAB, `${level}-staged.json`);
  if (fs.existsSync(stagedFile)) {
    const items = JSON.parse(fs.readFileSync(stagedFile, 'utf8'));
    for (const it of items) ids.push(it.id);
  }
  return ids;
}

const n5VocabIds = loadVocabIds('n5');
const n4VocabIds = loadVocabIds('n4');

// ── GENKI I DEFINITION (Chapters 1 to 12) ──────────────────────────
const GENKI_1_CHAPTERS = [
  {
    ch: 1,
    title_ja: "新しい友達",
    title_en: "New Friends",
    title_id: "Teman Baru & Perkenalan Identitas",
    grammar: [
      {
        id: "gk1-01-01",
        global_grammar_id: "gn5-00001",
        pattern: "X は Y です",
        meaning: "X adalah Y (menyatakan identitas, profesi, kebangsaan)",
        raw: "Noun X + は + Noun Y + です",
        desc: "Pola dasar predikat nomina sopan. Partikel <b>は</b> menandai topik pembicaraan (dibaca 'wa'), dan <b>です</b> berfungsi sebagai kopula penegas kesopanan.",
        examples: [
          { jp: "私は田中です。", id: "Saya adalah Tanaka." },
          { jp: "マリーさんは留学生です。", id: "Mary adalah mahasiswa asing." },
          { jp: "ケンさんは日本語の先生です。", id: "Ken adalah guru bahasa Jepang." }
        ]
      },
      {
        id: "gk1-01-02",
        global_grammar_id: "gn5-00005",
        pattern: "〜か (Kalimat Tanya)",
        meaning: "apakah ...? (partikel tanya di akhir kalimat)",
        raw: "Kalimat + か",
        desc: "Partikel <b>か</b> diletakkan di akhir kalimat untuk mengubah pernyataan menjadi pertanyaan tanpa perlu mengubah urutan kata.",
        examples: [
          { jp: "学生ですか。", id: "Apakah kamu seorang siswa?" },
          { jp: "専攻は何ですか。", id: "Apa jurusan kamu?" },
          { jp: "いま何時ですか。", id: "Sekarang jam berapa?" }
        ]
      },
      {
        id: "gk1-01-03",
        global_grammar_id: "gn5-00016",
        pattern: "Noun 1 の Noun 2",
        meaning: "milik / kualifikasi (menghubungkan dua kata benda)",
        raw: "Noun 1 + の + Noun 2",
        desc: "Partikel <b>の</b> memodifikasi kata benda kedua dengan informasi dari kata benda pertama (kepemilikan, institusi, atau jenis).",
        examples: [
          { jp: "これは私のノートです。", id: "Ini adalah buku catatan saya." },
          { jp: "東京大学の学生です。", id: "Mahasiswa Universitas Tokyo." },
          { jp: "さくらさんの電話番号は何番ですか。", id: "Nomor telepon Sakura nomor berapa?" }
        ]
      }
    ]
  },
  {
    ch: 2,
    title_ja: "買い物",
    title_en: "Shopping",
    title_id: "Berbelanja & Menunjuk Benda",
    grammar: [
      {
        id: "gk1-02-01",
        global_grammar_id: "gn5-00017",
        pattern: "これ / それ / あれ / どれ",
        meaning: "ini / itu / itu (jauh) / yang mana (kata ganti penunjuk mandiri)",
        raw: "これ / それ / あれ / どれ + (partikel)",
        desc: "Kata ganti demonstratif independen berdasarkan jarak penutur dan lawan bicara (sistem Ko-So-A-Do).",
        examples: [
          { jp: "これはいくらですか。", id: "Berapa harga yang ini?" },
          { jp: "それは私のかばんです。", id: "Itu adalah tas saya." },
          { jp: "あれはおいしいパンです。", id: "Yang di sana itu roti yang enak." }
        ]
      },
      {
        id: "gk1-02-02",
        global_grammar_id: "gn5-00018",
        pattern: "この / その / あの / どの + Noun",
        meaning: "benda ini / benda itu / benda di sana / benda mana",
        raw: "この / その / あの / どの + Noun",
        desc: "Kata penunjuk atributif yang wajib diikuti langsung oleh kata benda yang diterangkan.",
        examples: [
          { jp: "この時計は五千円です。", id: "Jam tangan ini harganya lima ribu yen." },
          { jp: "あの傘はだれのですか。", id: "Payung di sana itu kepunyaan siapa?" },
          { jp: "その本をください。", id: "Tolong berikan buku itu." }
        ]
      },
      {
        id: "gk1-02-03",
        global_grammar_id: "gn5-00019",
        pattern: "ここ / そこ / あそこ / どこ",
        meaning: "di sini / di situ / di sana / di mana (penunjuk lokasi)",
        raw: "ここ / そこ / あそこ / どこ + は ... です",
        desc: "Sistem demonstratif penunjuk letak dan tempat.",
        examples: [
          { jp: "トイレはどこですか。", id: "Toilet ada di mana?" },
          { jp: "図書館はあそこです。", id: "Perpustakaan ada di sebelah sana." },
          { jp: "郵便局はここです。", id: "Kantor pos ada di sini." }
        ]
      },
      {
        id: "gk1-02-04",
        global_grammar_id: "gn5-00004",
        pattern: "〜じゃないです / 〜じゃありません",
        meaning: "bukan ... (bentuk negatif sopan predikat nomina)",
        raw: "Noun + じゃないです / じゃありません",
        desc: "Bentuk pengingkaran sopan untuk predikat nomina dan na-adjektiva pada masa sekarang.",
        examples: [
          { jp: "山田さんは先生じゃないです。", id: "Yamada bukan seorang guru." },
          { jp: "これはペンじゃありません。", id: "Ini bukan pena." }
        ]
      }
    ]
  },
  {
    ch: 3,
    title_ja: "デートの約束",
    title_en: "Making a Date",
    title_id: "Menyusun Janji Temu & Rutinitas Harian",
    grammar: [
      {
        id: "gk1-03-01",
        global_grammar_id: "gn5-00021",
        pattern: "動詞の活用 (ます形)",
        meaning: "bentuk kata kerja sopan (rutinitas masa kini / masa depan)",
        raw: "Verb stem + ます / ません / ました / ませんでした",
        desc: "Konjugasi dasar verba bahasa Jepang golongan 1 (Godan), golongan 2 (Ichidan), dan verba tidak beraturan (Kuru, Suru).",
        examples: [
          { jp: "毎朝七時に起きます。", id: "Setiap pagi saya bangun jam 7." },
          { jp: "コーヒーを飲みます。", id: "Saya minum kopi." },
          { jp: "明日は勉強しません。", id: "Besok saya tidak belajar." }
        ]
      },
      {
        id: "gk1-03-02",
        global_grammar_id: "gn5-00003",
        pattern: "助詞 を・で・に・へ",
        meaning: "partikel penanda objek (を), lokasi aksi (で), waktu/tujuan (に・へ)",
        raw: "Noun + を / で / に / へ",
        desc: "Empat partikel esensial: を menandai objek langsung, で menandai tempat beraktivitas, に menandai waktu spesifik / sasaran gerak, へ menandai arah gerak.",
        examples: [
          { jp: "カフェで朝ごはんを食べます。", id: "Makan sarapan di kafe." },
          { jp: "日曜日に友達のうちへ行きます。", id: "Hari Minggu pergi ke rumah teman." },
          { jp: "音楽を聞きます。", id: "Mendengarkan musik." }
        ]
      },
      {
        id: "gk1-03-03",
        global_grammar_id: "gn5-00022",
        pattern: "〜ませんか (Ajakan / Undangan)",
        meaning: "maukah kamu ...? / bagaimana kalau kita ...?",
        raw: "Verb ます-stem + ませんか",
        desc: "Ungkapan sopan untuk mengajak atau menawarkan kegiatan bersama lawan bicara.",
        examples: [
          { jp: "一緒に映画を見ませんか。", id: "Maukah nonton film bersama?" },
          { jp: "お茶を飲みませんか。", id: "Mau minum teh santai bersama?" },
          { jp: "今晩ごはんを食べませんか。", id: "Bagaimana kalau nanti malam kita makan bareng?" }
        ]
      }
    ]
  },
  {
    ch: 4,
    title_ja: "初めてのデート",
    title_en: "The First Date",
    title_id: "Kencan Pertama & Keberadaan Benda / Orang",
    grammar: [
      {
        id: "gk1-04-01",
        global_grammar_id: "gn5-00023",
        pattern: "あります / います",
        meaning: "ada (benda mati/tumbuhan vs manusia/hewan)",
        raw: "Tempat に Benda が あります / Makhluk yang bernyawa が います",
        desc: "Verba eksistensi: あります digunakan untuk benda mati atau konsep abstrak, sedangkan います digunakan untuk manusia dan hewan bergerak.",
        examples: [
          { jp: "机の上に本があります。", id: "Ada buku di atas meja." },
          { jp: "公園に猫がいます。", id: "Ada kucing di taman." },
          { jp: "あそこに銀行があります。", id: "Di sebelah sana ada bank." }
        ]
      },
      {
        id: "gk1-04-02",
        global_grammar_id: "gn5-00024",
        pattern: "位置表現 (上・下・前・後ろ・中・隣・間)",
        meaning: "posisi ruang (di atas, di bawah, di depan, di belakang, di dalam, di samping, di antara)",
        raw: "Noun 1 の [上/下/前/後ろ/中/隣/間] に Noun 2 が ある/いる",
        desc: "Kombinasi kata penunjuk posisi spasial dengan partikel の dan に.",
        examples: [
          { jp: "いすの下に犬がいます。", id: "Di bawah kursi ada seekor anjing." },
          { jp: "デパートの隣に喫茶店があります。", id: "Di sebelah toserba ada kedai kopi." },
          { jp: "駅とスーパーの間に花屋があります。", id: "Di antara stasiun dan supermarket ada toko bunga." }
        ]
      },
      {
        id: "gk1-04-03",
        global_grammar_id: "gn5-00025",
        pattern: "〜ました / 〜ませんでした (Bentuk Lampau)",
        meaning: "sudah ... / tidak ... (lampau sopan)",
        raw: "Verb ます-stem + ました / ませんでした",
        desc: "Konjugasi verba untuk menyatakan aksi yang telah selesai atau tidak dilakukan pada masa lalu dalam gaya sopan.",
        examples: [
          { jp: "きのう五時間勉強しました。", id: "Kemarin saya sudah belajar selama lima jam." },
          { jp: "きのうはどこへも行きませんでした。", id: "Kemarin saya tidak pergi ke mana pun." },
          { jp: "おいしい寿司を食べました。", id: "Saya sudah makan sushi yang lezat." }
        ]
      }
    ]
  },
  {
    ch: 5,
    title_ja: "沖縄旅行",
    title_en: "A Trip to Okinawa",
    title_id: "Wisata ke Okinawa & Kata Sifat",
    grammar: [
      {
        id: "gk1-05-01",
        global_grammar_id: "gn5-00026",
        pattern: "い形容詞とな形容詞の活用",
        meaning: "kata sifat -i dan -na (bentuk sekarang & lampau, positif & negatif)",
        raw: "i-Adj: 〜いです / 〜くないです / 〜かったです / 〜くなかったです\nna-Adj: 〜です / 〜じゃないです / 〜でした / 〜じゃなかったです",
        desc: "Aturan konjugasi lengkap dua kelas kata sifat bahasa Jepang untuk menerangkan kondisi benda dan perasaan.",
        examples: [
          { jp: "沖縄の海はとても青いです。", id: "Laut Okinawa sangat biru." },
          { jp: "昨日はあまり寒くなかったです。", id: "Kemarin tidak terlalu dingin." },
          { jp: "この町は静かできれいです。", id: "Kota ini tenang dan indah." }
        ]
      },
      {
        id: "gk1-05-02",
        global_grammar_id: "gn5-00027",
        pattern: "好き (すき) / 嫌い (きらい)",
        meaning: "suka / tidak suka (kesukaan predikat adjektiva)",
        raw: "Noun が [好き / 嫌い / 大好き / 大嫌い] です",
        desc: "Objek yang disukai atau dibenci ditandai dengan partikel <b>が</b> karena suki dan kirai secara gramatikal tergolong kata sifat.",
        examples: [
          { jp: "日本のアニメが好きです。", id: "Saya menyukai anime Jepang." },
          { jp: "辛い食べ物はあまり好きじゃないです。", id: "Saya tidak begitu menyukai makanan pedas." },
          { jp: "スポーツが大好きです。", id: "Saya sangat menyukai olahraga." }
        ]
      },
      {
        id: "gk1-05-03",
        global_grammar_id: "gn5-00028",
        pattern: "〜ましょう / 〜ましょうか",
        meaning: "mari kita ... / bolehkah saya bantu ...?",
        raw: "Verb ます-stem + ましょう / ましょうか",
        desc: "Bentuk volisional sopan untuk mengajak secara proaktif (ましょう) atau menawarkan bantuan sukarela kepada orang lain (ましょうか).",
        examples: [
          { jp: "少し休みましょう。", id: "Mari kita istirahat sejenak." },
          { jp: "荷物を持ちましょうか。", id: "Bolehkah saya bawakan barang bawaanmu?" },
          { jp: "写真を撮りましょう。", id: "Ayo kita ambil foto bersama." }
        ]
      }
    ]
  },
  {
    ch: 6,
    title_ja: "ロバートさんの一日",
    title_en: "A Day in Robert's Life",
    title_id: "Keseharian & Bentuk -Te yang Serbaguna",
    grammar: [
      {
        id: "gk1-06-01",
        global_grammar_id: "gn5-00029",
        pattern: "て形 (Bentuk Te)",
        meaning: "bentuk penyambung verba (konjugasi Te-form)",
        raw: "Godan: う・つ・る→って, む・ぶ・ぬ→んで, く→いて, ぐ→いで, す→して\nIchidan: る→て\nIrregular: くる→きて, する→して",
        desc: "Bentuk pondasi paling krusial dalam tata bahasa Jepang untuk menggabungkan kalimat dan membentuk berbagai konstruksi tata bahasa lanjutan.",
        examples: [
          { jp: "朝起きて、シャワーを浴びて、朝ごはんを食べました。", id: "Pagi hari bangun, mandi shower, lalu sarapan." },
          { jp: "本を読んで、寝ました。", id: "Membaca buku, kemudian tidur." }
        ]
      },
      {
        id: "gk1-06-02",
        global_grammar_id: "gn5-00030",
        pattern: "〜てください",
        meaning: "tolong lakukan ... / silakan ... (permintaan sopan)",
        raw: "Verb て-form + ください",
        desc: "Permintaan sopan standar kepada lawan bicara untuk melakukan suatu tindakan.",
        examples: [
          { jp: "ここに名前を書いてください。", id: "Tolong tulis nama Anda di sini." },
          { jp: "ゆっくり話してください。", id: "Tolong bicara lebih perlahan." },
          { jp: "ドアを閉めてください。", id: "Tolong tutup pintunya." }
        ]
      },
      {
        id: "gk1-06-03",
        global_grammar_id: "gn5-00031",
        pattern: "〜てもいいですか / 〜てはいけません",
        meaning: "bolehkah saya ...? / tidak boleh ... (izin & larangan)",
        raw: "Verb て-form + もいいですか / はいけません",
        desc: "Pola meminta izin (てもいいですか) dan menyatakan larangan tegas atau aturan (てはいけません).",
        examples: [
          { jp: "ここで写真を撮ってもいいですか。", id: "Bolehkah saya mengambil foto di sini?" },
          { jp: "教室でたばこを吸ってはいけません。", id: "Tidak boleh merokok di dalam ruang kelas." },
          { jp: "窓を開けてもいいですか。", id: "Bolehkah saya membuka jendela?" }
        ]
      }
    ]
  },
  {
    ch: 7,
    title_ja: "家族の写真",
    title_en: "Family Picture",
    title_id: "Foto Keluarga & Keadaan Sedang Berlangsung",
    grammar: [
      {
        id: "gk1-07-01",
        global_grammar_id: "gn5-00032",
        pattern: "〜ている (Sedang Berlangsung & Keadaan Hasil)",
        meaning: "sedang melakukan ... / dalam kondisi berstatus ...",
        raw: "Verb て-form + いる / います",
        desc: "Menyatakan dua makna utama: (1) aksi progresif yang sedang berlangsung saat ini, dan (2) kondisi stabil hasil dari aksi masa lalu (seperti 結婚している, 住んでいる, 知っている).",
        examples: [
          { jp: "妹は今テレビを見ています。", id: "Adik perempuan saya sekarang sedang menonton TV." },
          { jp: "父は東京に住んでいます。", id: "Ayah saya tinggal menetap di Tokyo." },
          { jp: "兄は結婚しています。", id: "Kakak laki-laki saya sudah menikah." }
        ]
      },
      {
        id: "gk1-07-02",
        global_grammar_id: "gn5-00033",
        pattern: "身体の特徴 (〜は〜が[形容詞])",
        meaning: "ciri fisik (memiliki bagian tubuh yang ...)",
        raw: "Orang は Bagian Tubuh が + Sifat + です",
        desc: "Konstruksi khusus untuk mendeskripsikan penampilan fisik manusia atau hewan.",
        examples: [
          { jp: "田中さんは背が高いです。", id: "Tanaka berpostur tubuh tinggi." },
          { jp: "さくらさんは髪が長くて、目が大きいです。", id: "Sakura berambut panjang dan bermata besar." }
        ]
      },
      {
        id: "gk1-07-03",
        global_grammar_id: "gn5-00034",
        pattern: "〜に行く / 〜に来る (Tujuan Gerak)",
        meaning: "pergi / datang untuk melakukan ...",
        raw: "Verb ます-stem + に + 行く / 来る / 帰る",
        desc: "Menggabungkan verba stem dengan partikel に untuk menyatakan tujuan perpindahan fisik tempat.",
        examples: [
          { jp: "デパートへ服を買いに行きました。", id: "Pergi ke toserba untuk membeli pakaian." },
          { jp: "図書館へ勉強しに行きます。", id: "Pergi ke perpustakaan untuk belajar." },
          { jp: "うちに遊びに来てください。", id: "Silakan datang main ke rumahku." }
        ]
      }
    ]
  },
  {
    ch: 8,
    title_ja: "バーベキュー",
    title_en: "Barbecue",
    title_id: "Pesta Barbeque & Gaya Bahasa Biasa (Plain Form)",
    grammar: [
      {
        id: "gk1-08-01",
        global_grammar_id: "gn5-00035",
        pattern: "普通形 (Bentuk Biasa / Informal)",
        meaning: "plain form (bentuk kamus, nai, ta, nakatta)",
        raw: "Present: 書く / 書かない\nPast: 書いた / 書かなかった",
        desc: "Tingkat tutur kasual yang digunakan antar teman akrab, keluarga, dan menjadi prasyarat pembentukan klausa bawahan dalam tata bahasa kompleks.",
        examples: [
          { jp: "明日、映画を見に行かない？", id: "Besok mau pergi nonton film bareng nggak?" },
          { jp: "うん、行く！", id: "Iya, mau!" }
        ]
      },
      {
        id: "gk1-08-02",
        global_grammar_id: "gn5-00036",
        pattern: "〜と思います (Pendapat / Dugaan)",
        meaning: "saya rasa / saya pikir ...",
        raw: "Plain sentence + と思います",
        desc: "Ungkapan untuk menyampaikan pendapat pribadi, perkiraan, atau spekulasi subjektif.",
        examples: [
          { jp: "明日は雨が降ると思います。", id: "Saya pikir besok akan turun hujan." },
          { jp: "日本語はとても面白いと思います。", id: "Menurut saya bahasa Jepang sangat menarik." },
          { jp: "この映画は有名だと思います。", id: "Saya kira film ini terkenal." }
        ]
      },
      {
        id: "gk1-08-03",
        global_grammar_id: "gn5-00037",
        pattern: "〜と言っていました (Mengutip Ucapan)",
        meaning: "katanya ... / dia bilang bahwa ...",
        raw: "Plain sentence + と言っていました",
        desc: "Mengutip tuturan atau pesan yang disampaikan oleh orang ketiga.",
        examples: [
          { jp: "田中さんは明日来ないと言っていました。", id: "Tanaka bilang besok dia tidak akan datang." },
          { jp: "先生は試験が難しいと言っていました。", id: "Guru bilang ujiannya bakal sulit." }
        ]
      },
      {
        id: "gk1-08-04",
        global_grammar_id: "gn5-00038",
        pattern: "〜ないでください",
        meaning: "tolong jangan ... (permintaan negatif sopan)",
        raw: "Verb ない-form + でください",
        desc: "Permintaan sopan untuk tidak melakukan suatu aktivitas tertentu.",
        examples: [
          { jp: "心配しないでください。", id: "Tolong jangan khawatir." },
          { jp: "写真を撮らないでください。", id: "Tolong jangan mengambil foto." },
          { jp: "無理をしないでください。", id: "Tolong jangan memaksakan diri." }
        ]
      }
    ]
  },
  {
    ch: 9,
    title_ja: "かぶき",
    title_en: "Kabuki",
    title_id: "Pertunjukan Kabuki & Masa Lalu Kasual",
    grammar: [
      {
        id: "gk1-09-01",
        global_grammar_id: "gn5-00039",
        pattern: "過去普通形 (た形・なかった形)",
        meaning: "bentuk lampau informal (plain past affirmative & negative)",
        raw: "Verb た-form / Verb なかった-form",
        desc: "Bentuk lampau dalam percakapan kasual dan klausa pengubah.",
        examples: [
          { jp: "昨日はどこへも行かなかった。", id: "Kemarin aku nggak pergi ke mana-mana." },
          { jp: "朝ごはんを食べた？", id: "Udah sarapan belum?" }
        ]
      },
      {
        id: "gk1-09-02",
        global_grammar_id: "gn5-00040",
        pattern: "まだ〜ていません",
        meaning: "masih belum melakukan ...",
        raw: "まだ + Verb て-form + いません",
        desc: "Menyatakan bahwa suatu aktivitas yang diharapkan terjadi sampai saat ini belum terlaksana.",
        examples: [
          { jp: "まだ宿題をしていません。", id: "Saya masih belum mengerjakan PR." },
          { jp: "まだ昼ごはんを食べていません。", id: "Saya masih belum makan siang." },
          { jp: "荷物はまだ届いていません。", id: "Paketnya masih belum sampai." }
        ]
      },
      {
        id: "gk1-09-03",
        global_grammar_id: "gn5-00041",
        pattern: "〜から (Alasan / Sebab)",
        meaning: "karena ... / oleh karena itu",
        raw: "Klausa Alasan (Plain/Polite) + から、Klausa Akibat",
        desc: "Menghubungkan alasan penyebab dengan tindakan konsekuensinya.",
        examples: [
          { jp: "時間がありませんから、タクシーで行きましょう。", id: "Karena tidak ada waktu, ayo kita pergi naik taksi." },
          { jp: "忙しいから、手伝えません。", id: "Karena sibuk, aku nggak bisa bantu." }
        ]
      }
    ]
  },
  {
    ch: 10,
    title_ja: "冬休みの予定",
    title_en: "Winter Vacation Plans",
    title_id: "Rencana Libur Musim Dingin & Komparasi",
    grammar: [
      {
        id: "gk1-10-01",
        global_grammar_id: "gn5-00042",
        pattern: "〜より〜のほうが (Komparasi Dua Benda)",
        meaning: "A lebih ... daripada B",
        raw: "Noun B より Noun A のほうが [Adjektiva] です",
        desc: "Perbandingan derajat antara dua entitas subjek.",
        examples: [
          { jp: "バスより電車のほうが速いです。", id: "Kereta lebih cepat daripada bus." },
          { jp: "日本よりインドネシアのほうが暖かいです。", id: "Indonesia lebih hangat daripada Jepang." },
          { jp: "肉より魚のほうが好きです。", id: "Saya lebih menyukai ikan daripada daging." }
        ]
      },
      {
        id: "gk1-10-02",
        global_grammar_id: "gn5-00043",
        pattern: "〜の中で一番 (Superlatif)",
        meaning: "paling ... di antara ... (derajat tertinggi)",
        raw: "Kategori の中で [Kata Tanya] が 一番 [Adjektiva] ですか",
        desc: "Memilih entitas yang paling menonjol dalam suatu kelompok atau kategori.",
        examples: [
          { jp: "季節の中で春が一番好きです。", id: "Di antara semua musim, saya paling suka musim semi." },
          { jp: "世界で富士山が一番有名です。", id: "Gunung Fuji paling terkenal di dunia." }
        ]
      },
      {
        id: "gk1-10-03",
        global_grammar_id: "gn5-00044",
        pattern: "〜つもり (Rencana / Niat)",
        meaning: "berniat untuk ... / berencana akan ...",
        raw: "Verb (Bentuk Kamus / Nai) + つもりです",
        desc: "Menyatakan keputusan atau intensi pribadi yang sudah dipikirkan untuk masa depan.",
        examples: [
          { jp: "冬休みに北海道へ行くつもりです。", id: "Saya berencana pergi ke Hokkaido saat libur musim dingin." },
          { jp: "来年はたばこを吸わないつもりです。", id: "Tahun depan saya berniat tidak akan merokok lagi." }
        ]
      },
      {
        id: "gk1-10-04",
        global_grammar_id: "gn5-00045",
        pattern: "形容詞 + なる (Perubahan Kondisi)",
        meaning: "menjadi ... (proses perubahan keadaan)",
        raw: "i-Adj: 〜くなる / na-Adj & Noun: 〜になる",
        desc: "Menunjukkan perubahan sifat alami atau keadaan dari waktu ke waktu.",
        examples: [
          { jp: "暖かくなりました。", id: "Cuaca sudah menjadi hangat." },
          { jp: "日本語が上手になりましたね。", id: "Bahasa Jepangmu sudah menjadi makin mahir ya." }
        ]
      }
    ]
  },
  {
    ch: 11,
    title_ja: "休みのあとの会話",
    title_en: "After the Vacation",
    title_id: "Percakapan Pascavokasi & Pengalaman",
    grammar: [
      {
        id: "gk1-11-01",
        global_grammar_id: "gn5-00046",
        pattern: "〜たい (Keinginan Pribadi)",
        meaning: "ingin melakukan ...",
        raw: "Verb ます-stem + たいです / たくないです",
        desc: "Mengekspresikan hasrat atau keinginan subjek orang pertama untuk beraktivitas.",
        examples: [
          { jp: "日本へ行きたいです。", id: "Saya ingin pergi ke Jepang." },
          { jp: "新しいパソコンを買いたいです。", id: "Saya ingin membeli laptop baru." },
          { jp: "今日は何もしたくないです。", id: "Hari ini saya tidak ingin melakukan apa-apa." }
        ]
      },
      {
        id: "gk1-11-02",
        global_grammar_id: "gn5-00047",
        pattern: "〜たり〜たりする (Kegiatan Representatif)",
        meaning: "kadang ..., kadang ... / melakukan hal seperti ... dan ...",
        raw: "Verb た-form + り、Verb た-form + りする",
        desc: "Menyebutkan beberapa tindakan representatif secara acak sebagai contoh dari keseluruhan aktivitas.",
        examples: [
          { jp: "休みの日は本を読んだり、音楽を聞いたりします。", id: "Di hari libur saya membaca buku, mendengarkan musik, dan sejenisnya." },
          { jp: "昨日は買い物をしたり、友達に会ったりしました。", id: "Kemarin saya berbelanja, bertemu teman, dan sebagainya." }
        ]
      },
      {
        id: "gk1-11-03",
        global_grammar_id: "gn5-00048",
        pattern: "〜ことがある (Pengalaman Masa Lalu)",
        meaning: "pernah melakukan ... (memiliki pengalaman)",
        raw: "Verb た-form + ことがある / あります",
        desc: "Menyatakan apakah subjek memiliki rekaman riwayat pengalaman melakukan aksi tersebut sepanjang hidupnya.",
        examples: [
          { jp: "富士山に登ったことがありますか。", id: "Pernahkah Anda mendaki Gunung Fuji?" },
          { jp: "一度も刺身を食べたことがありません。", id: "Saya belum pernah sekalipun makan sashimi." }
        ]
      }
    ]
  },
  {
    ch: 12,
    title_ja: "気分が悪い",
    title_en: "Feeling Ill",
    title_id: "Kondisi Kurang Sehat & Memberi Saran",
    grammar: [
      {
        id: "gk1-12-01",
        global_grammar_id: "gn5-00049",
        pattern: "〜んです (Penjelasan Latar Belakang / Nuansa Penjelas)",
        meaning: "soalnya ... / masalahnya adalah ... (memberi alasan kontekstual)",
        raw: "Plain form + んです / のです (na-Adj/Noun + なんです)",
        desc: "Partikel penjelas untuk menyajikan informasi latar belakang, meminta elaborasi, atau menyatakan alasan dengan rasa keterlibatan emosional.",
        examples: [
          { jp: "頭が痛いんです。", id: "Soalnya kepala saya sedang sakit." },
          { jp: "どうして遅れたんですか。", id: "Kenapa kamu bisa terlambat?" },
          { jp: "電車が止まったんです。", id: "Soalnya keretanya tadi sempat berhenti." }
        ]
      },
      {
        id: "gk1-12-02",
        global_grammar_id: "gn5-00050",
        pattern: "〜すぎる (Terlalu Berlebihan)",
        meaning: "terlalu ... (melewati batas normal)",
        raw: "Verb ます-stem / Adj-stem + すぎる / すぎます",
        desc: "Menunjukkan kadar kuantitas atau intensitas tindakan yang melebihi standar wajar hingga berkonotasi negatif atau memberatkan.",
        examples: [
          { jp: "きのうはお酒を飲みすぎました。", id: "Kemarin saya terlalu banyak minum alkohol." },
          { jp: "この部屋は狭すぎます。", id: "Kamar ini terlalu sempit." },
          { jp: "食べすぎないでください。", id: "Tolong jangan makan terlalu berlebihan." }
        ]
      },
      {
        id: "gk1-12-03",
        global_grammar_id: "gn5-00051",
        pattern: "〜ほうがいい (Saran / Rekomendasi)",
        meaning: "sebaiknya ... / lebih baik tidak ...",
        raw: "Verb た-form + ほうがいい (positif) / Verb ない-form + ほうがいい (negatif)",
        desc: "Memberikan nasihat bijak atau rekomendasi tindakan praktis kepada lawan bicara.",
        examples: [
          { jp: "早く寝たほうがいいですよ。", id: "Sebaiknya kamu segera tidur lho." },
          { jp: "無理をしないほうがいいです。", id: "Lebih baik kamu jangan memaksakan diri." }
        ]
      },
      {
        id: "gk1-12-04",
        global_grammar_id: "gn5-00052",
        pattern: "〜ので (Alasan Halus / Sopan)",
        meaning: "karena ... / berhubung ...",
        raw: "Verb/i-Adj Plain + ので / na-Adj & Noun + なので",
        desc: "Ungkapan alasan objektif yang terdengar lebih halus, sopan, dan formal dibanding から.",
        examples: [
          { jp: "熱があるので、今日は早く帰ります。", id: "Berhubung saya demam, hari ini saya akan pulang lebih awal." },
          { jp: "用事があるので、行けません。", id: "Karena ada urusan mendesak, saya tidak bisa hadir." }
        ]
      },
      {
        id: "gk1-12-05",
        global_grammar_id: "gn5-00053",
        pattern: "〜なければいけません (Keharusan)",
        meaning: "harus melakukan ... (kewajiban tak terelakkan)",
        raw: "Verb ない-stem + なければいけません / なければなりません",
        desc: "Menyatakan kewajiban moral, hukum, atau kebutuhan mendesak yang tidak boleh dihindari.",
        examples: [
          { jp: "明日までに薬を飲まなければいけません。", id: "Harus minum obat sampai besok." },
          { jp: "毎日漢字を練習しなければなりません。", id: "Harus berlatih kanji setiap hari." }
        ]
      }
    ]
  }
];

// ── GENKI II DEFINITION (Chapters 13 to 23) ─────────────────────────
const GENKI_2_CHAPTERS = [
  {
    ch: 13,
    title_ja: "アルバイト探し",
    title_en: "Looking for a Part-Time Job",
    title_id: "Mencari Kerja Paruh Waktu & Bentuk Potensial",
    grammar: [
      {
        id: "gk2-13-01",
        global_grammar_id: "gn4-00001",
        pattern: "可能形 (Bentuk Potensial)",
        meaning: "bisa / sanggup melakukan ...",
        raw: "Godan: u → eru (話せる) / Ichidan: ru → rareru (食べられる) / Irregular: こられる、できる",
        desc: "Menyatakan kemampuan subjek atau kelayakan situasi untuk melakukan aksi. Partikel objek を sering berganti menjadi が.",
        examples: [
          { jp: "漢字を百個書くことができます／書けます。", id: "Saya bisa menulis 100 kanji." },
          { jp: "日本語で電話ができます。", id: "Saya sanggup bertelepon dalam bahasa Jepang." }
        ]
      },
      {
        id: "gk2-13-02",
        global_grammar_id: "gn4-00002",
        pattern: "〜し (Menyebut Beberapa Alasan)",
        meaning: "selain karena ..., juga karena ...",
        raw: "Plain sentence + し、Plain sentence + し",
        desc: "Menyusun rangkaian alasan pendukung secara paralel untuk memperkuat suatu simpulan.",
        examples: [
          { jp: "給料もいいし、家から近いし、この仕事が好きです。", id: "Gajinya bagus, dan lokasinya dekat dari rumah, jadi saya suka pekerjaan ini." }
        ]
      },
      {
        id: "gk2-13-03",
        global_grammar_id: "gn4-00003",
        pattern: "〜そうです (Tampaknya / Kelihatan Sepertinya)",
        meaning: "kelihatannya ... (kesan visual langsung)",
        raw: "Verb ます-stem / Adj-stem + そうです",
        desc: "Dugaan intuitif berdasarkan pengamatan fisik langsung secara visual.",
        examples: [
          { jp: "このケーキはおいしそうです。", id: "Kue ini tampaknya sangat lezat." },
          { jp: "今にも雨が降りそうです。", id: "Kelihatannya sebentar lagi akan segera turun hujan." }
        ]
      },
      {
        id: "gk2-13-04",
        global_grammar_id: "gn4-00004",
        pattern: "〜てみる (Mencoba Melakukan)",
        meaning: "mencoba untuk melihat hasilnya",
        raw: "Verb て-form + みる / みます",
        desc: "Melakukan suatu aksi uji coba demi mengetahui pengalaman atau rasa setelahnya.",
        examples: [
          { jp: "日本の納豆を食べてみたいです。", id: "Saya ingin mencoba makan natto khas Jepang." }
        ]
      }
    ]
  },
  {
    ch: 14,
    title_ja: "バレンタインデー",
    title_en: "Valentine's Day",
    title_id: "Hari Kasih Sayang & Memberi Benda",
    grammar: [
      {
        id: "gk2-14-01",
        global_grammar_id: "gn4-00005",
        pattern: "あげる / くれる / もらう",
        meaning: "memberi / memberi kepada saya / menerima benda",
        raw: "Receiver に Benda を あげる / Giver が Benda を くれる / Giver に/から Benda を もらう",
        desc: "Triad kata kerja pemberian dan penerimaan benda fisik berorientasi lingkaran kedekatan sosial (Uchi vs Soto).",
        examples: [
          { jp: "友達にプレゼントをあげました。", id: "Memberikan kado kepada teman." },
          { jp: "先輩がノートをくれました。", id: "Senior memberi saya buku catatan." },
          { jp: "母から手紙をもらいました。", id: "Menerima surat dari ibu." }
        ]
      },
      {
        id: "gk2-14-02",
        global_grammar_id: "gn4-00006",
        pattern: "〜たらどうですか",
        meaning: "bagaimana kalau mencoba ...? (usulan bersahabat)",
        raw: "Verb たら-form + どうですか",
        desc: "Saran ramah atau usulan santai bagi lawan bicara untuk mencoba mengambil suatu tindakan.",
        examples: [
          { jp: "もっと先生に相談してみたらどうですか。", id: "Bagaimana kalau kamu coba berkonsultasi lebih banyak dengan guru?" }
        ]
      },
      {
        id: "gk2-14-03",
        global_grammar_id: "gn4-00007",
        pattern: "〜かもしれません",
        meaning: "mungkin ... (kemungkinan 50:50)",
        raw: "Plain form (na-Adj/Noun tanpa だ) + かもしれません",
        desc: "Menyatakan probabilitas moderat di mana penutur tidak memiliki bukti mutlak.",
        examples: [
          { jp: "明日は雪が降るかもしれません。", id: "Besok mungkin salju akan turun." }
        ]
      }
    ]
  },
  {
    ch: 15,
    title_ja: "長野旅行",
    title_en: "A Trip to Nagano",
    title_id: "Perjalanan ke Nagano & Niat Bersama",
    grammar: [
      {
        id: "gk2-15-01",
        global_grammar_id: "gn4-00008",
        pattern: "意向形 (Bentuk Ajakan Kasual / Volitional)",
        meaning: "ayo kita ... / berniat melakukan ...",
        raw: "Godan: u → ou (行こう) / Ichidan: ru → you (食べよう) / Irregular: こよう、しよう",
        desc: "Bentuk kasual dari 〜ましょう dan fondasi batin untuk pola intensi.",
        examples: [
          { jp: "明日早く起きよう。", id: "Ayo besok kita bangun pagi-pagi." }
        ]
      },
      {
        id: "gk2-15-02",
        global_grammar_id: "gn4-00009",
        pattern: "〜ようと思う / 〜つもり",
        meaning: "berniat / merencanakan dalam hati untuk ...",
        raw: "Volitional + と思う / Plain verb + つもり",
        desc: "Menyatakan keputusan kehendak atau tekad yang terbentuk di dalam benak subjek.",
        examples: [
          { jp: "来週から毎日ジョギングしようと思います。", id: "Saya berniat mulai jogging setiap hari dari minggu depan." }
        ]
      },
      {
        id: "gk2-15-03",
        global_grammar_id: "gn4-00010",
        pattern: "〜ておく (Tindakan Persiapan)",
        meaning: "melakukan sesuatu sebagai persiapan awal / membiarkan dalam keadaan itu",
        raw: "Verb て-form + おく / おきます",
        desc: "Tindakan antisipatif yang sengaja diselesaikan sebelum momen yang dituju tiba.",
        examples: [
          { jp: "旅行の前にホテルを予約しておきます。", id: "Memesan hotel terlebih dahulu sebelum perjalanan liburan." }
        ]
      }
    ]
  },
  {
    ch: 16,
    title_ja: "忘れ物",
    title_en: "Lost and Found",
    title_id: "Barang Ketinggalan & Bantuan Jasa",
    grammar: [
      {
        id: "gk2-16-01",
        global_grammar_id: "gn4-00011",
        pattern: "〜てあげる / 〜てくれる / 〜てもらう",
        meaning: "melakukan kebaikan untuk orang lain / mendapat bantuan jasa",
        raw: "Verb て-form + あげる / くれる / もらう",
        desc: "Sistem pemberian bantuan jasa dan pertolongan antar persona secara bermartabat.",
        examples: [
          { jp: "友達の引っ越しを手伝ってあげました。", id: "Membantu kepindahan rumah teman." },
          { jp: "日本人の友達が日本語を直してくれました。", id: "Teman orang Jepang mengoreksi bahasa Jepang saya." }
        ]
      },
      {
        id: "gk2-16-02",
        global_grammar_id: "gn4-00012",
        pattern: "〜ていただけませんか",
        meaning: "sudikah Anda membantu ...? (permohonan sopan sekali)",
        raw: "Verb て-form + いただけませんか",
        desc: "Bentuk permohonan tingkat tinggi yang sangat santun untuk meminta pertolongan.",
        examples: [
          { jp: "もう一度説明していただけませんか。", id: "Sudikah Anda menjelaskannya sekali lagi?" }
        ]
      },
      {
        id: "gk2-16-03",
        global_grammar_id: "gn4-00013",
        pattern: "〜といい (Harapan / Doa)",
        meaning: "semoga ... / alangkah baiknya jika ...",
        raw: "Plain verb + といいですね (untuk orang lain) / といいんですが (harapan diri)",
        desc: "Mengekspresikan doa tulus bagi kelancaran urusan lawan bicara atau diri sendiri.",
        examples: [
          { jp: "明日の試験、合格できるといいですね。", id: "Semoga besok bisa lulus ujiannya ya." }
        ]
      }
    ]
  },
  {
    ch: 17,
    title_ja: "うわさ",
    title_en: "Rumors",
    title_id: "Kabar Angin & Pengandaian Kondisional",
    grammar: [
      {
        id: "gk2-17-01",
        global_grammar_id: "gn4-00014",
        pattern: "〜そうです (Kabar Angin / Katanya)",
        meaning: "katanya ... / saya dengar bahwa ...",
        raw: "Plain form lengkap + そうです",
        desc: "Menyampaikan informasi yang bersumber dari media, kabar burung, atau perkataan orang lain tanpa modifikasi fakta.",
        examples: [
          { jp: "ニュースによると、来週は台風が来るそうです。", id: "Menurut berita, katanya minggu depan akan ada topan." }
        ]
      },
      {
        id: "gk2-17-02",
        global_grammar_id: "gn4-00015",
        pattern: "〜たら (Kondisional Jika / Kalau)",
        meaning: "jika ... / setelah ... terlaksana",
        raw: "Verb/Adj/Noun past form + ら",
        desc: "Kondisional temporal dan hipotesis paling lazim digunakan dalam percakapan sehari-hari.",
        examples: [
          { jp: "雨が降ったら、出かけません。", id: "Kalau turun hujan, saya tidak akan pergi keluar." },
          { jp: "駅に着いたら、電話してください。", id: "Setelah sampai di stasiun, tolong telepon saya ya." }
        ]
      },
      {
        id: "gk2-17-03",
        global_grammar_id: "gn4-00016",
        pattern: "〜なくてもいいです",
        meaning: "tidak perlu ... / boleh untuk tidak melakukan ...",
        raw: "Verb ない-stem + くてもいいです",
        desc: "Menyatakan ketiadaan beban kewajiban.",
        examples: [
          { jp: "明日は休みですから、早く起きなくてもいいです。", id: "Karena besok libur, tidak perlu bangun pagi-pagi." }
        ]
      }
    ]
  },
  {
    ch: 18,
    title_ja: "ジョンさんのアルバイト",
    title_en: "John's Part-Time Job",
    title_id: "Aktivitas Simultan & Penyelesaian Tuntas",
    grammar: [
      {
        id: "gk2-18-01",
        global_grammar_id: "gn4-00017",
        pattern: "〜ながら (Aktivitas Simultan)",
        meaning: "sambil ... (dua perbuatan dilakukan serempak)",
        raw: "Verb ます-stem + ながら、Aksi Utama",
        desc: "Aksi kedua adalah fokus utama yang diiringi oleh aksi pertama yang berpartikel ながら.",
        examples: [
          { jp: "音楽を聞きながら宿題をします。", id: "Mengerjakan PR sambil mendengarkan musik." }
        ]
      },
      {
        id: "gk2-18-02",
        global_grammar_id: "gn4-00018",
        pattern: "〜てしまう (Tuntas Selesai / Menyesal)",
        meaning: "selesai total / terlanjur (mengandung rasa penyesalan)",
        raw: "Verb て-form + しまう / しまいました",
        desc: "Menyatakan aksi yang diselesaikan secara tuntas atau peristiwa kecelakaan yang tidak diinginkan.",
        examples: [
          { jp: "宿題を全部やってしまいました。", id: "Saya sudah menyelesaikan semua PR tuntas." },
          { jp: "電車にかばんを忘れてしまいました。", id: "Duh, tas saya ketinggalan di dalam kereta." }
        ]
      },
      {
        id: "gk2-18-03",
        global_grammar_id: "gn4-00019",
        pattern: "〜と (Kondisional Alami / Pasti)",
        meaning: "bila / setiap kali ... (konsekuensi otomatis atau hukum alam)",
        raw: "Verb Dictionary-form + と、Akibat Pasti",
        desc: "Menghubungkan aksi dengan akibat yang tak terhindarkan seperti fungsi mesin, rute jalan, atau hukum alam.",
        examples: [
          { jp: "このボタンを押すと、おつりが出ます。", id: "Bila tombol ini ditekan, uang kembalian akan keluar otomatis." }
        ]
      }
    ]
  },
  {
    ch: 19,
    title_ja: "出迎え",
    title_en: "Meeting the Boss",
    title_id: "Etika Menghormati & Bahasa Sonkeigo",
    grammar: [
      {
        id: "gk2-19-01",
        global_grammar_id: "gn4-00020",
        pattern: "尊敬語 (Sonkeigo: Bahasa Penghormatan)",
        meaning: "meninggikan martabat tindakan lawan bicara / atasan",
        raw: "Pola: お + Verb ます-stem + になる / Bentuk Khusus: いらっしゃる, おっしゃる, なさる, めしあがる",
        desc: "Ungkapan penghormatan tinggi untuk memuliakan orang luar atau figur senior dalam situasi bisnis.",
        examples: [
          { jp: "先生はもうお帰りになりました。", id: "Bapak Guru sudah pulang duluan." },
          { jp: "何を召し上がりますか。", id: "Apa yang berkenan Bapak/Ibu nikmati?" }
        ]
      },
      {
        id: "gk2-19-02",
        global_grammar_id: "gn4-00021",
        pattern: "〜はずです (Seharusnya / Semestinya)",
        meaning: "seharusnya ... (dugaan logis berdasar fakta meyakinkan)",
        raw: "Plain form + はずです (na-Adj + な / Noun + の)",
        desc: "Keyakinan rasional penutur bahwa suatu hal mestinya terwujud menurut logika normal.",
        examples: [
          { jp: "田中さんは今日来るはずです。", id: "Tanaka seharusnya datang hari ini." }
        ]
      }
    ]
  },
  {
    ch: 20,
    title_ja: "友だちの結婚式",
    title_en: "A Friend's Wedding",
    title_id: "Upacara Pernikahan & Bahasa Merendah (Kenjougo)",
    grammar: [
      {
        id: "gk2-20-01",
        global_grammar_id: "gn4-00022",
        pattern: "謙譲語 (Kenjougo: Bahasa Merendah)",
        meaning: "merendahkan tindakan diri sendiri demi menghormati mitra bicara",
        raw: "Pola: お + Verb ます-stem + する / Bentuk Khusus: まいる, おる, もうす, いたす, いただく, はいけんする",
        desc: "Register kesopanan bisnis di mana penutur merendahkan posisinya di hadapan klien atau mitra terhormat.",
        examples: [
          { jp: "私が荷物をお持ちします。", id: "Biar saya yang membawakan barang bawaan Anda." },
          { jp: "明日十時にうかがいます。", id: "Besok jam 10 saya akan berkunjung ke tempat Bapak." }
        ]
      },
      {
        id: "gk2-20-02",
        global_grammar_id: "gn4-00023",
        pattern: "〜かどうか (Apakah ... atau Tidak)",
        meaning: "apakah ... atau tidak (pertanyaan terselubung)",
        raw: "Plain form + かどうか",
        desc: "Menyematkan pertanyaan ya/tidak ke dalam klausa anak kalimat majemuk.",
        examples: [
          { jp: "彼が来るかどうか分かりません。", id: "Saya tidak tahu apakah dia akan datang atau tidak." }
        ]
      },
      {
        id: "gk2-20-03",
        global_grammar_id: "gn4-00024",
        pattern: "〜やすい / 〜にくい (Mudah / Sulit)",
        meaning: "gampang dilakukan / sukar dilakukan",
        raw: "Verb ます-stem + やすい / にくい",
        desc: "Mengubah kata kerja menjadi kata sifat gabungan yang mencerminkan derajat kemudahan pelaksanaan.",
        examples: [
          { jp: "このペンはとても書きやすいです。", id: "Pena ini sangat mudah dan nyaman untuk dipakai menulis." },
          { jp: "この漢字は覚えにくいです。", id: "Kanji ini sulit untuk dihafal." }
        ]
      }
    ]
  },
  {
    ch: 21,
    title_ja: "泥棒",
    title_en: "Burglar",
    title_id: "Pencurian & Kalimat Pasif (Ukemi)",
    grammar: [
      {
        id: "gk2-21-01",
        global_grammar_id: "gn4-00025",
        pattern: "受身形 (Kalimat Pasif / Ukemi)",
        meaning: "di- ... / mengalami perlakuan (sering berkonotasi terdampak merugi)",
        raw: "Godan: u → areru (踏まれる) / Ichidan: ru → rareru (ほめられる) / Irregular: こられる、される",
        desc: "Struktur kalimat pasif bahasa Jepang, mencakup pasif langsung maupun pasif adversatif (penderitaan karena ulah orang lain).",
        examples: [
          { jp: "電車の中で足を踏まれました。", id: "Kaki saya terinjak oleh orang lain di dalam kereta." },
          { jp: "先生にほめられました。", id: "Dipuji oleh guru." }
        ]
      },
      {
        id: "gk2-21-02",
        global_grammar_id: "gn4-00026",
        pattern: "〜てある (Kondisi Hasil Persiapan)",
        meaning: "telah disiapkan dalam keadaan ...",
        raw: "Transitive Verb て-form + ある",
        desc: "Menunjukkan keadaan saat ini yang sengaja diciptakan oleh seseorang demi suatu tujuan tertentu.",
        examples: [
          { jp: "壁にカレンダーがかけてあります。", id: "Kalender telah dipajang rapi di dinding." }
        ]
      },
      {
        id: "gk2-21-03",
        global_grammar_id: "gn4-00027",
        pattern: "〜間に (Selama / Selagi Periode Tertentu)",
        meaning: "di tengah rentang waktu ketika ... sedang berlangsung",
        raw: "Verb ている / Noun の + 間に",
        desc: "Menunjukkan bahwa aksi tunggal terjadi di suatu titik waktu saat kondisi lain sedang berlangsung.",
        examples: [
          { jp: "留守の間に泥棒が入りました。", id: "Saat rumah sedang kosong, pencuri menyelinap masuk." }
        ]
      }
    ]
  },
  {
    ch: 22,
    title_ja: "日本の教育",
    title_en: "Education in Japan",
    title_id: "Sistem Pendidikan & Kalimat Kausatif (Shieki)",
    grammar: [
      {
        id: "gk2-22-01",
        global_grammar_id: "gn4-00028",
        pattern: "使役形 (Kausatif: Menyuruh / Mengizinkan)",
        meaning: "membuat / membiarkan seseorang melakukan ...",
        raw: "Godan: u → aseru (行かせる) / Ichidan: ru → saseru (食べさせる) / Irregular: こさせる、させる",
        desc: "Menyatakan instruksi memaksa atau pemberian izin dari pihak superior kepada bawahan atau anak.",
        examples: [
          { jp: "お母さんは子どもに野菜を食べさせました。", id: "Ibu menyuruh anaknya memakan sayur-sayuran." }
        ]
      },
      {
        id: "gk2-22-02",
        global_grammar_id: "gn4-00029",
        pattern: "〜ば (Kondisional Logis Ba)",
        meaning: "jika ... (persyaratan esensial penentu)",
        raw: "Verb: e-sound + ba (行けば) / i-Adj: kereba (安ければ)",
        desc: "Kondisional kondisional murni yang menyoroti prasyarat logis mutlak.",
        examples: [
          { jp: "安ければ買います。", id: "Jika murah, saya akan beli." }
        ]
      },
      {
        id: "gk2-22-03",
        global_grammar_id: "gn4-00030",
        pattern: "〜のに (Padahal / Meskipun)",
        meaning: "padahal ... (kontras ironis yang mengecewakan)",
        raw: "Plain form + のに (na-Adj/Noun + なのに)",
        desc: "Mengekspresikan ketidaksesuaian antara ekspektasi wajar dan realitas yang terjadi dengan rasa jengkel atau kecewa.",
        examples: [
          { jp: "一生懸命勉強したのに、不合格でした。", id: "Padahal sudah belajar mati-matian, tetapi tidak lulus." }
        ]
      }
    ]
  },
  {
    ch: 23,
    title_ja: "さようなら",
    title_en: "Good-bye",
    title_id: "Perpisahan & Kausatif-Pasif (Shieki-Ukemi)",
    grammar: [
      {
        id: "gk2-23-01",
        global_grammar_id: "gn4-00031",
        pattern: "使役受身形 (Kausatif-Pasif: Terpaksa Melakukan)",
        meaning: "terpaksa / disuruh melakukan di luar keinginan hati",
        raw: "Godan: asareru / Ichidan: saserareru / Irregular: こさせられる、させられる",
        desc: "Kombinasi kausatif dan pasif untuk menyatakan bahwa subjek terpaksa melakukan suatu aksi atas desakan pihak lain.",
        examples: [
          { jp: "無理やり歌を歌わせられました。", id: "Saya terpaksa disuruh menyanyikan lagu di luar kemauan saya." }
        ]
      },
      {
        id: "gk2-23-02",
        global_grammar_id: "gn4-00032",
        pattern: "〜ことにする / 〜ことになっている",
        meaning: "memutuskan sendiri / telah menjadi aturan atau kebiasaan tetap",
        raw: "Verb Dictionary-form + ことにする / ことになっている",
        desc: "Perbedaan keputusan inisiatif diri (ことにする) versus aturan ketetapan institusional eksternal (ことになっている).",
        examples: [
          { jp: "毎朝六時に起きることにしました。", id: "Saya memutuskan diri untuk bangun jam 6 setiap pagi." },
          { jp: "日本では車は左側を走ることになっています。", id: "Di Jepang, mobil ditetapkan peraturannya untuk berjalan di sebelah kiri." }
        ]
      },
      {
        id: "gk2-23-03",
        global_grammar_id: "gn4-00033",
        pattern: "〜方 (かた: Cara Melakukan)",
        meaning: "metode / cara melakukan ...",
        raw: "Verb ます-stem + 方 (かた)",
        desc: "Membentuk nomina proses untuk menunjukkan tata cara melakukan suatu aktivitas.",
        examples: [
          { jp: "この漢字の読み方を教えてください。", id: "Tolong ajari saya cara membaca kanji ini." }
        ]
      }
    ]
  }
];

// ── GENERATE GENKI 1 FILES ─────────────────────────────────────────
function generateGenki1() {
  const grammarEntries = [];
  const vocabChapters = {};

  let vocabOffset = 0;
  const vocabPerChapter = 20;

  for (const ch of GENKI_1_CHAPTERS) {
    for (const g of ch.grammar) {
      grammarEntries.push(g);
    }

    const slice = n5VocabIds.slice(vocabOffset, vocabOffset + vocabPerChapter);
    vocabOffset = (vocabOffset + vocabPerChapter) % (n5VocabIds.length - vocabPerChapter);

    vocabChapters[String(ch.ch)] = {
      topic: `第${ch.ch}課: ${ch.title_ja} (${ch.title_en})`,
      topic_id: ch.title_id,
      vocab_ids: slice,
      grammar_ids: ch.grammar.map(g => g.global_grammar_id)
    };
  }

  // Write grammar lens
  const gLensObj = {
    meta: {
      book: "genki-1",
      title: "GENKI I: An Integrated Course in Elementary Japanese (3rd Ed.)",
      publisher: "The Japan Times Publishing",
      jlpt: "n5",
      structure: "chapter",
      total_chapters: 12
    },
    entries: grammarEntries
  };
  const gJs = `// grammar-lens-genki-1.js — Genki I Grammar Book Lens
// 100% Original Indonesian Explanations & Examples — Zero Copyright Infringement
window.grammarLensGenki1 = ${JSON.stringify(gLensObj, null, 2)};
`;
  fs.writeFileSync(path.join(OUT_DIR, 'grammar-lens-genki-1.js'), gJs, 'utf8');

  // Write vocab lens
  const vLensObj = {
    meta: {
      book: "genki-1",
      title: "GENKI I: Elementary Japanese — Vocab Lens",
      publisher: "The Japan Times Publishing",
      chapters: 12,
      jlpt: "n5"
    },
    chapters: vocabChapters
  };
  const vJs = `// vocab-lens-genki-1.js — Genki I Chapter Vocab Lens
// Total Chapters: 12 | Staged Expansion
window.vocabLensGenki1 = ${JSON.stringify(vLensObj, null, 2)};
`;
  fs.writeFileSync(path.join(OUT_DIR, 'vocab-lens-genki-1.js'), vJs, 'utf8');
  console.log(`Generated Genki I: ${grammarEntries.length} grammar entries across 12 chapters`);
}

// ── GENERATE GENKI 2 FILES ─────────────────────────────────────────
function generateGenki2() {
  const grammarEntries = [];
  const vocabChapters = {};

  let vocabOffset = 0;
  const vocabPerChapter = 22;

  for (const ch of GENKI_2_CHAPTERS) {
    for (const g of ch.grammar) {
      grammarEntries.push(g);
    }

    const slice = n4VocabIds.slice(vocabOffset, vocabOffset + vocabPerChapter);
    vocabOffset = (vocabOffset + vocabPerChapter) % (n4VocabIds.length - vocabPerChapter);

    vocabChapters[String(ch.ch)] = {
      topic: `第${ch.ch}課: ${ch.title_ja} (${ch.title_en})`,
      topic_id: ch.title_id,
      vocab_ids: slice,
      grammar_ids: ch.grammar.map(g => g.global_grammar_id)
    };
  }

  // Write grammar lens
  const gLensObj = {
    meta: {
      book: "genki-2",
      title: "GENKI II: An Integrated Course in Elementary Japanese (3rd Ed.)",
      publisher: "The Japan Times Publishing",
      jlpt: "n4",
      structure: "chapter",
      total_chapters: 11
    },
    entries: grammarEntries
  };
  const gJs = `// grammar-lens-genki-2.js — Genki II Grammar Book Lens
// 100% Original Indonesian Explanations & Examples — Zero Copyright Infringement
window.grammarLensGenki2 = ${JSON.stringify(gLensObj, null, 2)};
`;
  fs.writeFileSync(path.join(OUT_DIR, 'grammar-lens-genki-2.js'), gJs, 'utf8');

  // Write vocab lens
  const vLensObj = {
    meta: {
      book: "genki-2",
      title: "GENKI II: Elementary Japanese — Vocab Lens",
      publisher: "The Japan Times Publishing",
      chapters: 11,
      jlpt: "n4"
    },
    chapters: vocabChapters
  };
  const vJs = `// vocab-lens-genki-2.js — Genki II Chapter Vocab Lens
// Total Chapters: 11 (Bab 13-23) | Staged Expansion
window.vocabLensGenki2 = ${JSON.stringify(vLensObj, null, 2)};
`;
  fs.writeFileSync(path.join(OUT_DIR, 'vocab-lens-genki-2.js'), vJs, 'utf8');
  console.log(`Generated Genki II: ${grammarEntries.length} grammar entries across 11 chapters`);
}

generateGenki1();
generateGenki2();
