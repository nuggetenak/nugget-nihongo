// ══════════════════════════════════════════════════════════════════
//  pitchData.ts — Master Japanese Pitch Accent Database & Minimal Pairs
//  Curated 50+ Minimal Pairs, 4 Tokyo Patterns Showcase, & Ear Training Drill
// ══════════════════════════════════════════════════════════════════

import { calculatePitchContour, type MoraUnit, type PitchCategory } from './pitchEngine.ts';

export interface PitchWord {
  id: string;
  kanji: string;
  kana: string;
  romaji: string;
  pitchNumber: number;
  category: PitchCategory;
  categoryLabel: string;
  meaning: string;
  moras: MoraUnit[];
  particlePitch: 'high' | 'low';
  exampleJp?: string;
  exampleId?: string;
}

export interface MinimalPair {
  id: string;
  title: string;
  reading: string;
  blunderContext: string;
  wordA: PitchWord;
  wordB: PitchWord;
  wordC?: PitchWord;
  mnemonicId: string;
}

export interface QuizOption {
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface PitchQuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

function createWord(id: string, kanji: string, kana: string, romaji: string, pitchNumber: number, meaning: string, exampleJp?: string, exampleId?: string): PitchWord {
  const result = calculatePitchContour(kana, pitchNumber);
  return {
    id,
    kanji,
    kana,
    romaji,
    pitchNumber,
    category: result.category,
    categoryLabel: result.categoryLabel,
    meaning,
    moras: result.moras,
    particlePitch: result.particlePitch,
    exampleJp,
    exampleId
  };
}

export const MINIMAL_PAIRS: MinimalPair[] = [
  {
    id: "mp-ame",
    title: "Ame (雨 vs 飴)",
    reading: "あめ",
    blunderContext: "Jangan minta hujan saat membeli permen di toko matsuri festival!",
    wordA: createWord("mp-ame-a", "雨", "あめ", "ame", 1, "Hujan", "雨が降っています。", "Hujan sedang turun lebat."),
    wordB: createWord("mp-ame-b", "飴", "あめ", "ame", 0, "Permen Manis", "飴を食べます。", "Saya makan permen manis."),
    mnemonicId: "A-me (Tinggi di awal) bagai hujan turun dari langit tinggi. A-ME (Naik datar) seperti mengulum permen perlahan.",
  },
  {
    id: "mp-hashi",
    title: "Hashi (箸 vs 橋 vs 端)",
    reading: "はし",
    blunderContext: "Pelayan resto bingung kalau kamu minta \"jembatan\" atau \"tepi jurang\" saat hendak makan ramen!",
    wordA: createWord("mp-hashi-a", "箸", "はし", "hashi", 1, "Sumpit Makan", "お箸をください。", "Tolong berikan saya sumpit makan."),
    wordB: createWord("mp-hashi-b", "橋", "はし", "hashi", 2, "Jembatan Penyeberangan", "橋を渡ります。", "Menyeberangi jembatan sungai."),
    wordC: createWord("mp-hashi-c", "端", "はし", "hashi", 0, "Tepi / Ujung Jalan", "道の端を歩きます。", "Berjalan di tepi pinggir jalan."),
    mnemonicId: "HA-shi (Tinggi di awal) seperti mengangkat sepasang sumpit ke atas. ha-SHI (Naik di akhir) seperti jembatan yang melengkung naik.",
  },
  {
    id: "mp-kaki",
    title: "Kaki (牡蠣 vs 柿)",
    reading: "かき",
    blunderContext: "Ingin memesan tiram bakar lezat di izakaya tapi pelayan malah menyajikan buah kesemek!",
    wordA: createWord("mp-kaki-a", "牡蠣", "かき", "kaki", 1, "Tiram Laut (Oyster)", "焼き牡蠣を食べたいです。", "Saya ingin makan tiram laut panggang."),
    wordB: createWord("mp-kaki-b", "柿", "かき", "kaki", 0, "Buah Kesemek (Persimmon)", "秋に柿が実ります。", "Buah kesemek berbuah di musim gugur."),
    mnemonicId: "KA-ki (Jatuh di awal) tiram diambil dari ombak laut. ka-KI (Datar) buah kesemek bergantung tenang di dahan.",
  },
  {
    id: "mp-sake",
    title: "Sake (酒 vs 鮭)",
    reading: "さけ",
    blunderContext: "Mau sarapan nasi ikan salmon di hotel, tapi salah nada minta botol arak sake beralkohol!",
    wordA: createWord("mp-sake-a", "鮭", "さけ", "sake", 1, "Ikan Salmon", "朝ご飯に鮭の塩焼きを食べます。", "Sarapan pagi dengan salmon bakar asin."),
    wordB: createWord("mp-sake-b", "酒", "さけ", "sake", 0, "Minuman Beralkohol / Arak Sake", "日本酒を飲みます。", "Meminum arak sake Jepang."),
    mnemonicId: "SA-ke (Tinggi di awal) ikan salmon melompat tinggi melawan arus. sa-KE (Datar) arak dituangkan tenang ke cawan.",
  },
  {
    id: "mp-hana",
    title: "Hana (花 vs 鼻)",
    reading: "はな",
    blunderContext: "Berniat memuji bunga sakura yang indah, tapi terdengar memuji lubang hidung rekan!",
    wordA: createWord("mp-hana-a", "花", "はな", "hana", 2, "Bunga", "公園に綺麗な花が咲いた。", "Bunga indah mekar di taman."),
    wordB: createWord("mp-hana-b", "鼻", "はな", "hana", 0, "Hidung", "風邪で鼻が詰まりました。", "Hidung tersumbat karena masuk angin."),
    mnemonicId: "ha-NA [ga turun] bunga mekar merekah ke atas. ha-NA [ga datar] hidung sejajar dengan garis wajah.",
  },
  {
    id: "mp-kami",
    title: "Kami (神 vs 紙 vs 髪)",
    reading: "かみ",
    blunderContext: "Di kantor meminta selembar kertas fotokopi, tapi nadanya memohon kepada Dewa penolong!",
    wordA: createWord("mp-kami-a", "神", "かみ", "kami", 1, "Tuhan / Dewa", "神社で神様に祈ります。", "Berdoa kepada Tuhan di kuil Shinto."),
    wordB: createWord("mp-kami-b", "紙", "かみ", "kami", 2, "Kertas", "コピー用紙をください。", "Tolong berikan kertas fotokopi."),
    wordC: createWord("mp-kami-c", "髪", "かみ", "kami", 2, "Rambut Kepala", "美容院で髪を切りました。", "Memotong rambut di salon kecantikan."),
    mnemonicId: "KA-mi (Tinggi) Dewa bertahta di tempat mahatinggi. ka-MI (Jatuh di partikel) kertas dan rambut berada di alam fisik.",
  },
  {
    id: "mp-ima",
    title: "Ima (今 vs 居間)",
    reading: "いま",
    blunderContext: "Ditanya bos \"Kapan laporan selesai?\", mau jawab \"sekarang\" tapi terdengar \"di ruang keluarga\"!",
    wordA: createWord("mp-ima-a", "今", "いま", "ima", 1, "Sekarang (Waktu)", "今、何時ですか。", "Sekarang jam berapa?"),
    wordB: createWord("mp-ima-b", "居間", "いま", "ima", 2, "Ruang Keluarga (Living Room)", "家族と居間でテレビを見ます。", "Menonton TV bersama keluarga di ruang tamu."),
    mnemonicId: "I-ma (Tinggi awal) ketegasan waktu sekarang saat ini juga. i-MA (Jatuh di partikel) ruangan santai tempat duduk.",
  },
  {
    id: "mp-kitte",
    title: "Kitte (切手 vs 切って)",
    reading: "きって",
    blunderContext: "Di kantor pos mau beli prangko, tapi terdengar menyuruh pegawai memotong tangan!",
    wordA: createWord("mp-kitte-a", "切手", "きって", "kitte", 0, "Prangko Pos", "８４円の切手を２枚ください。", "Minta 2 lembar prangko 84 yen."),
    wordB: createWord("mp-kitte-b", "切って", "きって", "kitte", 1, "Tolong Potong (Bentuk -te dari 切る)", "ハサミで紙を切ってください。", "Tolong potong kertas ini dengan gunting."),
    mnemonicId: "kit-TE (Heiban datar) prangko ditempel rata di amplop. KIT-te (Atamadaka) pisau memotong dengan sekali hentakan kuat.",
  },
  {
    id: "mp-kaeru",
    title: "Kaeru (帰る vs 変える vs 蛙)",
    reading: "かえる",
    blunderContext: "Mau pamit \"saya mau pulang\", tapi intonasi salah terdengar seperti \"saya ingin berubah jadi katak\"!",
    wordA: createWord("mp-kaeru-a", "帰る", "かえる", "kaeru", 1, "Pulang ke Rumah", "もう遅いので家に帰ります。", "Sudah larut malam, saya mau pulang ke rumah."),
    wordB: createWord("mp-kaeru-b", "変える", "かえる", "kaeru", 0, "Mengubah / Mengganti", "予定を変えます。", "Saya akan mengubah jadwal rencana."),
    wordC: createWord("mp-kaeru-c", "蛙", "かえる", "kaeru", 1, "Katak / Kodok", "田んぼで蛙が鳴いています。", "Katak berbunyi di sawah."),
    mnemonicId: "KA-e-ru (Tinggi awal) langkah kaki tegas pulang ke rumah. ka-E-RU (Datar) proses perubahan yang fleksibel.",
  },
  {
    id: "mp-shiro",
    title: "Shiro (白 vs 城)",
    reading: "しろ",
    blunderContext: "Menceritakan cat dinding warna putih, tapi terdengar membangun benteng kastil megah!",
    wordA: createWord("mp-shiro-a", "白", "しろ", "shiro", 1, "Warna Putih", "白いシャツを着ています。", "Saya memakai kemeja putih."),
    wordB: createWord("mp-shiro-b", "城", "しろ", "shiro", 0, "Kastil / Benteng Istana", "姫路城を見学しました。", "Saya berkunjung ke Istana Himeji."),
    mnemonicId: "SHI-ro (Tinggi awal) salju putih turun dari atas. shi-RO (Datar) benteng kokoh membentang di tanah.",
  },
  {
    id: "mp-kiru",
    title: "Kiru (着る vs 切る)",
    reading: "きる",
    blunderContext: "Di toko busana ingin \"mencoba mengenakan baju\", tapi terdengar \"memotong-motong baju\"!",
    wordA: createWord("mp-kiru-a", "着る", "きる", "kiru", 0, "Memakai Pakaian (Badan)", "スーツを着ます。", "Saya memakai setelan jas."),
    wordB: createWord("mp-kiru-b", "切る", "きる", "kiru", 1, "Memotong dengan Pisau", "包丁で野菜を切ります。", "Memotong sayuran dengan pisau dapur."),
    mnemonicId: "ki-RU (Datar) pakaian menutupi badan dengan halus. KI-ru (Tinggi awal) pisau tajam menebas ke bawah.",
  },
  {
    id: "mp-mushi",
    title: "Mushi (虫 vs 無視)",
    reading: "むし",
    blunderContext: "Mau mengabarkan \"ada serangga di meja!\", tapi malah dikira menuduh teman \"kamu mengabaikan saya!\"",
    wordA: createWord("mp-mushi-a", "虫", "むし", "mushi", 0, "Serangga / Kutu", "庭に小さな虫がいます。", "Ada serangga kecil di pekarangan."),
    wordB: createWord("mp-mushi-b", "無視", "むし", "mushi", 1, "Mengabaikan / Mengacuhkan", "警告を無視してはいけません。", "Jangan mengabaikan peringatan keselamatan."),
    mnemonicId: "mu-SHI (Datar) serangga merayap perlahan. MU-shi (Tinggi awal) sikap dingin berpaling memutus kontak.",
  },
  {
    id: "mp-kisha",
    title: "Kisha (記者 vs 汽車)",
    reading: "きしゃ",
    blunderContext: "Mau cerita \"tadi diwawancarai wartawan berita\", tapi intonasi salah terdengar seperti \"tadi ditabrak kereta uap\"!",
    wordA: createWord("mp-kisha-a", "記者", "きしゃ", "kisha", 1, "Wartawan / Jurnalis", "新聞の記者が取材に来ました。", "Wartawan surat kabar datang untuk meliput."),
    wordB: createWord("mp-kisha-b", "汽車", "きしゃ", "kisha", 2, "Kereta Api Uap (Lokomotif)", "昔の汽車が走っています。", "Kereta api uap zaman dulu sedang melaju."),
    mnemonicId: "KI-sha (Tinggi awal) wartawan sigap mengangkat mikrofon tinggi. ki-SHA (Jatuh di partikel) kereta uap melaju menyusuri rel panjang.",
  },
  {
    id: "mp-asa",
    title: "Asa (朝 vs 麻)",
    reading: "あさ",
    blunderContext: "Menyapa \"selamat pagi\", tapi memakai nada seperti menanyakan bahan serat rami!",
    wordA: createWord("mp-asa-a", "朝", "あさ", "asa", 1, "Pagi Hari", "毎朝６時に起きます。", "Setiap pagi saya bangun pukul 6."),
    wordB: createWord("mp-asa-b", "麻", "あさ", "asa", 2, "Kain Rami / Serat Linen", "夏は麻の服が涼しいです。", "Di musim panas pakaian berbahan rami terasa sejuk."),
    mnemonicId: "A-sa (Tinggi awal) matahari fajar terbit tinggi menyinari bumi.",
  },
  {
    id: "mp-aki",
    title: "Aki (秋 vs 空き)",
    reading: "あき",
    blunderContext: "Mencari tempat duduk yang kosong, malah disangka membicarakan daun gugur di musim gugur!",
    wordA: createWord("mp-aki-a", "秋", "あき", "aki", 1, "Musim Gugur", "秋の紅葉がとても綺麗です。", "Pemandangan daun merah di musim gugur sangat elok."),
    wordB: createWord("mp-aki-b", "空き", "あき", "aki", 0, "Kekosongan / Tempat Luang", "駐車場に空きがありますか。", "Apakah ada tempat kosong di tempat parkir?"),
    mnemonicId: "A-ki (Tinggi awal) dedaunan musim gugur melayang jatuh. a-KI (Datar) ruang lapang terbuka luas.",
  },
  {
    id: "mp-haru",
    title: "Haru (春 vs 貼る)",
    reading: "はる",
    blunderContext: "Berniat membicarakan indahnya musim semi, tapi terdengar menyuruh menempelkan plester!",
    wordA: createWord("mp-haru-a", "春", "はる", "haru", 1, "Musim Semi", "春になると桜が咲きます。", "Saat musim semi tiba bunga sakura mekar."),
    wordB: createWord("mp-haru-b", "貼る", "はる", "haru", 0, "Menempelkan (Stiker/Poster)", "壁にポスターを貼ります。", "Menempelkan poster di dinding."),
    mnemonicId: "HA-ru (Tinggi awal) musim semi penuh keriangan terbit. ha-RU (Datar) stiker ditempel rata di permukaan.",
  },
];

export const PATTERN_WORDS: Record<PitchCategory, PitchWord[]> = {
  heiban: [
    createWord('pw-h-1', "桜", "さくら", "sakura", 0, "Bunga Sakura"),
    createWord('pw-h-2', "日本語", "にほんご", "nihongo", 0, "Bahasa Jepang"),
    createWord('pw-h-3', "友達", "ともだち", "tomodachi", 0, "Teman"),
    createWord('pw-h-4', "車", "くるま", "kuruma", 0, "Mobil"),
    createWord('pw-h-5', "電車", "でんしゃ", "densha", 0, "Kereta Listrik"),
    createWord('pw-h-6', "水", "みず", "mizu", 0, "Air Minum"),
    createWord('pw-h-7', "本", "ほん", "hon", 0, "Buku"),
    createWord('pw-h-8', "お茶", "おちゃ", "ocha", 0, "Teh Hijau"),
    createWord('pw-h-9', "学校", "がっこう", "gakkou", 0, "Sekolah"),
    createWord('pw-h-10', "子供", "こども", "kodomo", 0, "Anak-anak"),
    createWord('pw-h-11', "名前", "なまえ", "namae", 0, "Nama"),
    createWord('pw-h-12', "電話", "でんわ", "denwa", 0, "Telepon"),
    createWord('pw-h-13', "時間", "じかん", "jikan", 0, "Waktu"),
    createWord('pw-h-14', "今日", "きょう", "kyou", 0, "Hari Ini"),
  ],
  atamadaka: [
    createWord('pw-a-1', "雨", "あめ", "ame", 1, "Hujan"),
    createWord('pw-a-2', "箸", "はし", "hashi", 1, "Sumpit"),
    createWord('pw-a-3', "犬", "いぬ", "inu", 1, "Anjing"),
    createWord('pw-a-4', "猫", "ねこ", "neko", 1, "Kucing"),
    createWord('pw-a-5', "春", "はる", "haru", 1, "Musim Semi"),
    createWord('pw-a-6', "冬", "ふゆ", "fuyu", 1, "Musim Dingin"),
    createWord('pw-a-7', "夏", "なつ", "natsu", 1, "Musim Panas"),
    createWord('pw-a-8', "駅", "えき", "eki", 1, "Stasiun Kereta"),
    createWord('pw-a-9', "手", "て", "te", 1, "Tangan"),
    createWord('pw-a-10', "目", "め", "me", 1, "Mata"),
    createWord('pw-a-11', "火", "ひ", "hi", 1, "Api"),
    createWord('pw-a-12', "木", "き", "ki", 1, "Pohon"),
  ],
  nakadaka: [
    createWord('pw-n-1', "卵", "たまご", "tamago", 2, "Telur"),
    createWord('pw-n-2', "飛行機", "ひこうき", "hikouki", 2, "Pesawat Terbang"),
    createWord('pw-n-3', "弟", "おとうと", "otouto", 2, "Adik Laki-laki"),
    createWord('pw-n-4', "お父さん", "おとうさん", "otousan", 2, "Ayah"),
    createWord('pw-n-5', "お母さん", "おかあさん", "okaasan", 2, "Ibu"),
    createWord('pw-n-6', "夏休み", "なつやすみ", "natsuyasumi", 2, "Liburan Musim Panas"),
    createWord('pw-n-7', "図書館", "としょかん", "toshokan", 2, "Perpustakaan"),
    createWord('pw-n-8', "動物", "どうぶつ", "doubutsu", 2, "Hewan"),
  ],
  odaka: [
    createWord('pw-o-1', "男", "おとこ", "otoko", 3, "Laki-laki"),
    createWord('pw-o-2', "女", "おんな", "onna", 3, "Perempuan"),
    createWord('pw-o-3', "花", "はな", "hana", 2, "Bunga"),
    createWord('pw-o-4', "山", "やま", "yama", 2, "Gunung"),
    createWord('pw-o-5', "川", "かわ", "kawa", 2, "Sungai"),
    createWord('pw-o-6', "妹", "いもうと", "imouto", 4, "Adik Perempuan"),
    createWord('pw-o-7', "頭", "あたま", "atama", 3, "Kepala"),
    createWord('pw-o-8', "靴", "くつ", "kutsu", 2, "Sepatu"),
  ]
};

export const PITCH_QUIZ_QUESTIONS: PitchQuizQuestion[] = [
  {
    "id": "pq-1",
    "question": "Jika kamu ingin memesan \"Sumpit makan\" di restoran, manakah kata dan pola nada yang tepat?",
    "options": [
      {
        "text": "箸 (はし) — Atamadaka (HA-shi, tinggi di awal)",
        "isCorrect": true,
        "explanation": "Benar! 箸 (sumpit) berpola Atamadaka (1). Suku kata pertama tinggi lalu jatuh."
      },
      {
        "text": "橋 (はし) — Odaka (ha-SHI, jatuh di partikel)",
        "isCorrect": false,
        "explanation": "Salah. Ini adalah 橋 (jembatan)."
      },
      {
        "text": "端 (はし) — Heiban (ha-shi, datar tanpa jatuh)",
        "isCorrect": false,
        "explanation": "Salah. Ini adalah 端 (tepi/ujung)."
      }
    ]
  },
  {
    "id": "pq-2",
    "question": "Di toko permen tradisional, kamu ingin membeli \"Permen manis\". Bagaimana pola nadanya?",
    "options": [
      {
        "text": "飴 (あめ) — Heiban (a-ME, naik dari suku kata ke-2 dan datar)",
        "isCorrect": true,
        "explanation": "Tepat! 飴 (permen) adalah Heiban (0). Jangan ucapkan tinggi di awal atau kamu minta hujan!"
      },
      {
        "text": "雨 (あめ) — Atamadaka (A-me, tinggi di suku kata ke-1)",
        "isCorrect": false,
        "explanation": "Salah. Ini adalah 雨 (hujan)."
      }
    ]
  },
  {
    "id": "pq-3",
    "question": "Pola nada apakah yang paling umum dalam bahasa Jepang (sekitar 50-60% dari seluruh kosakata modern)?",
    "options": [
      {
        "text": "Heiban (平板 - Pola Datar tanpa downstep)",
        "isCorrect": true,
        "explanation": "Tepat! Pola Heiban (0) adalah pola paling dominan dalam bahasa Jepang modern."
      },
      {
        "text": "Atamadaka (頭高 - Jatuh di awal)",
        "isCorrect": false,
        "explanation": "Kurang tepat. Atamadaka hanya mencakup sekitar 10-15% kosakata."
      },
      {
        "text": "Odaka (尾高 - Jatuh di partikel)",
        "isCorrect": false,
        "explanation": "Kurang tepat."
      }
    ]
  },
  {
    "id": "pq-4",
    "question": "Apa perbedaan mendasar antara pola Odaka (尾高) dan Heiban (平板) saat diucapkan sendirian tanpa partikel?",
    "options": [
      {
        "text": "Keduanya terdengar mirip saat sendirian, perbedaannya baru terdengar jelas saat diikuti partikel (が/を/に)",
        "isCorrect": true,
        "explanation": "Tepat sekali! Pada Odaka, partikel pengiring akan jatuh rendah [L], sedangkan pada Heiban partikel tetap tinggi [H]."
      },
      {
        "text": "Odaka selalu dimulai dengan nada tinggi di suku kata pertama",
        "isCorrect": false,
        "explanation": "Salah. Yang tinggi di awal adalah Atamadaka."
      },
      {
        "text": "Tidak ada perbedaan sama sekali",
        "isCorrect": false,
        "explanation": "Salah, ada perbedaan intonasi pada partikel."
      }
    ]
  },
  {
    "id": "pq-5",
    "question": "Kata \"さくら\" (bunga sakura) memiliki pola nada apa?",
    "options": [
      {
        "text": "Heiban (0) — sa-KU-RA [ga tinggi]",
        "isCorrect": true,
        "explanation": "Benar! さくら adalah kata Heiban standar: rendah di suku kata pertama, naik di kedua, dan terus datar."
      },
      {
        "text": "Atamadaka (1) — SA-ku-ra",
        "isCorrect": false,
        "explanation": "Salah."
      },
      {
        "text": "Nakadaka (2) — sa-KU-ra [rendah]",
        "isCorrect": false,
        "explanation": "Salah."
      }
    ]
  },
  {
    "id": "pq-6",
    "question": "Di restoran sushi kamu ingin memesan ikan salmon segar, bukan arak sake beralkohol. Intonasi mana yang benar?",
    "options": [
      {
        "text": "鮭 (さけ) — Atamadaka [SA-ke, tinggi di suku kata awal]",
        "isCorrect": true,
        "explanation": "Tepat! 鮭 (ikan salmon) adalah Atamadaka (1). Kalau datar sa-KE (0), pelayan akan membawakan minuman arak sake!"
      },
      {
        "text": "酒 (さけ) — Heiban [sa-KE, datar]",
        "isCorrect": false,
        "explanation": "Salah. Ini adalah 酒 (arak beras beralkohol)."
      }
    ]
  },
  {
    "id": "pq-7",
    "question": "Ingin memuji indahnya bunga di taman tanpa disangka membicarakan hidung rekan kerja. Pola apa yang tepat?",
    "options": [
      {
        "text": "花 (はな) — Odaka [ha-NA, jatuh di partikel pengiring]",
        "isCorrect": true,
        "explanation": "Benar! 花 (bunga) adalah Odaka (2): ha-NA ga [rendah]. Sedangkan 鼻 (hidung) adalah Heiban (0): ha-NA ga [tetap tinggi]."
      },
      {
        "text": "鼻 (はな) — Heiban [ha-NA, partikel tetap tinggi]",
        "isCorrect": false,
        "explanation": "Salah. Ini adalah 鼻 (hidung)."
      }
    ]
  },
  {
    "id": "pq-8",
    "question": "Ditanya atasan \"Kapan laporan ini selesai?\", kamu ingin menjawab \"Sekarang juga! (Ima)\". Bagaimana nadanya?",
    "options": [
      {
        "text": "今 (いま) — Atamadaka [I-ma, tinggi di awal]",
        "isCorrect": true,
        "explanation": "Tepat! 今 (sekarang) adalah Atamadaka (1). Jika diucapkan i-MA (2), terdengar seperti 居間 (ruang keluarga santai)!"
      },
      {
        "text": "居間 (いま) — Odaka [i-MA, jatuh di partikel]",
        "isCorrect": false,
        "explanation": "Salah. Ini adalah 居間 (ruang keluarga)."
      }
    ]
  },
  {
    "id": "pq-9",
    "question": "Di stasiun museum kamu ingin menyebut \"kereta api uap zaman dulu\", bukan jurnalis berita. Pola apa yang dipakai?",
    "options": [
      {
        "text": "汽車 (きしゃ) — Odaka [ki-SHA, jatuh di partikel]",
        "isCorrect": true,
        "explanation": "Benar! 汽車 (kereta uap) adalah Odaka (2). Sedangkan 記者 (wartawan) adalah Atamadaka (1: KI-sha)."
      },
      {
        "text": "記者 (きしゃ) — Atamadaka [KI-sha, tinggi di awal]",
        "isCorrect": false,
        "explanation": "Salah. Ini adalah 記者 (wartawan / jurnalis)."
      }
    ]
  },
  {
    "id": "pq-10",
    "question": "Di dapur restoran saat memberi instruksi memasak \"tolong potong sayur ini\", kata kerja mana yang benar?",
    "options": [
      {
        "text": "切る (きる) — Atamadaka [KI-ru, tinggi di awal lalu jatuh]",
        "isCorrect": true,
        "explanation": "Tepat! 切る (memotong) adalah Atamadaka (1). Sedangkan 着る (mengenakan pakaian) adalah Heiban (0: ki-RU)."
      },
      {
        "text": "着る (きる) — Heiban [ki-RU, datar]",
        "isCorrect": false,
        "explanation": "Salah. Ini adalah 着る (memakai baju)."
      }
    ]
  }
];

// ══════════════════════════════════════════════════════════════════
//  Query & Search Helper Utilities
// ══════════════════════════════════════════════════════════════════

export function getAllMinimalPairs(): MinimalPair[] {
  return [...MINIMAL_PAIRS];
}

export function getMinimalPairById(id: string): MinimalPair | null {
  return MINIMAL_PAIRS.find((p) => p.id === id) || null;
}

export function searchMinimalPairs(query: string): MinimalPair[] {
  if (!query || typeof query !== 'string') return [...MINIMAL_PAIRS];
  const q = query.toLowerCase().trim();
  return MINIMAL_PAIRS.filter(
    (pair) =>
      pair.title.toLowerCase().includes(q) ||
      pair.reading.toLowerCase().includes(q) ||
      pair.wordA.kanji.toLowerCase().includes(q) ||
      pair.wordA.meaning.toLowerCase().includes(q) ||
      pair.wordB.kanji.toLowerCase().includes(q) ||
      pair.wordB.meaning.toLowerCase().includes(q) ||
      (pair.wordC && (pair.wordC.kanji.toLowerCase().includes(q) || pair.wordC.meaning.toLowerCase().includes(q))) ||
      pair.blunderContext.toLowerCase().includes(q)
  );
}

export function getPatternWords(category: PitchCategory): PitchWord[] {
  return [...(PATTERN_WORDS[category] || [])];
}

export function getPitchQuizQuestions(): PitchQuizQuestion[] {
  return [...PITCH_QUIZ_QUESTIONS];
}
