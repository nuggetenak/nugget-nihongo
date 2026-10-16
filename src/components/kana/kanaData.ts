// ══════════════════════════════════════════════════════════════════
//  kanaData.ts — Complete Hiragana & Katakana Dataset
//  Gojūon (50 Sounds), Dakuon (Voiced), Handakuon (Semi-voiced), Yōon (Contracted)
// ══════════════════════════════════════════════════════════════════

export interface KanaItem {
  id: string;
  hiragana: string;
  katakana: string;
  romaji: string;
  group: 'gojuon' | 'dakuon' | 'handakuon' | 'yoon';
  row?: string; // e.g., 'a', 'ka', 'sa', etc.
  example?: {
    jp: string;
    reading: string;
    meaning: string;
  };
}

// ── 1. GOJŪON (46 Dasar) ──────────────────────────────────────
export const GOJUON_KANA: KanaItem[] = [
  // A-Row
  { id: 'k-a', hiragana: 'あ', katakana: 'ア', romaji: 'a', group: 'gojuon', row: 'a', example: { jp: '朝', reading: 'あさ', meaning: 'Pagi' } },
  { id: 'k-i', hiragana: 'い', katakana: 'イ', romaji: 'i', group: 'gojuon', row: 'a', example: { jp: '犬', reading: 'いぬ', meaning: 'Anjing' } },
  { id: 'k-u', hiragana: 'う', katakana: 'ウ', romaji: 'u', group: 'gojuon', row: 'a', example: { jp: '海', reading: 'うみ', meaning: 'Laut' } },
  { id: 'k-e', hiragana: 'え', katakana: 'エ', romaji: 'e', group: 'gojuon', row: 'a', example: { jp: '駅', reading: 'えき', meaning: 'Stasiun' } },
  { id: 'k-o', hiragana: 'お', katakana: 'オ', romaji: 'o', group: 'gojuon', row: 'a', example: { jp: 'お茶', reading: 'おちゃ', meaning: 'Teh' } },

  // Ka-Row
  { id: 'k-ka', hiragana: 'か', katakana: 'カ', romaji: 'ka', group: 'gojuon', row: 'ka', example: { jp: '傘', reading: 'かさ', meaning: 'Payung' } },
  { id: 'k-ki', hiragana: 'き', katakana: 'キ', romaji: 'ki', group: 'gojuon', row: 'ka', example: { jp: '木', reading: 'き', meaning: 'Pohon' } },
  { id: 'k-ku', hiragana: 'く', katakana: 'ク', romaji: 'ku', group: 'gojuon', row: 'ka', example: { jp: '車', reading: 'くるま', meaning: 'Mobil' } },
  { id: 'k-ke', hiragana: 'け', katakana: 'ケ', romaji: 'ke', group: 'gojuon', row: 'ka', example: { jp: '今朝', reading: 'けさ', meaning: 'Pagi ini' } },
  { id: 'k-ko', hiragana: 'こ', katakana: 'コ', romaji: 'ko', group: 'gojuon', row: 'ka', example: { jp: '声', reading: 'こえ', meaning: 'Suara' } },

  // Sa-Row
  { id: 'k-sa', hiragana: 'さ', katakana: 'サ', romaji: 'sa', group: 'gojuon', row: 'sa', example: { jp: '魚', reading: 'さかな', meaning: 'Ikan' } },
  { id: 'k-shi', hiragana: 'し', katakana: 'シ', romaji: 'shi', group: 'gojuon', row: 'sa', example: { jp: '白', reading: 'しろ', meaning: 'Putih' } },
  { id: 'k-su', hiragana: 'す', katakana: 'ス', romaji: 'su', group: 'gojuon', row: 'sa', example: { jp: '寿司', reading: 'すし', meaning: 'Sushi' } },
  { id: 'k-se', hiragana: 'せ', katakana: 'セ', romaji: 'se', group: 'gojuon', row: 'sa', example: { jp: '先生', reading: 'せんせい', meaning: 'Guru' } },
  { id: 'k-so', hiragana: 'そ', katakana: 'ソ', romaji: 'so', group: 'gojuon', row: 'sa', example: { jp: '空', reading: 'そら', meaning: 'Langit' } },

  // Ta-Row
  { id: 'k-ta', hiragana: 'た', katakana: 'タ', romaji: 'ta', group: 'gojuon', row: 'ta', example: { jp: '卵', reading: 'たまご', meaning: 'Telur' } },
  { id: 'k-chi', hiragana: 'ち', katakana: 'チ', romaji: 'chi', group: 'gojuon', row: 'ta', example: { jp: '地下鉄', reading: 'ちかてつ', meaning: 'Kereta bawah tanah' } },
  { id: 'k-tsu', hiragana: 'つ', katakana: 'ツ', romaji: 'tsu', group: 'gojuon', row: 'ta', example: { jp: '机', reading: 'つくえ', meaning: 'Meja' } },
  { id: 'k-te', hiragana: 'て', katakana: 'テ', romaji: 'te', group: 'gojuon', row: 'ta', example: { jp: '手', reading: 'て', meaning: 'Tangan' } },
  { id: 'k-to', hiragana: 'と', katakana: 'ト', romaji: 'to', group: 'gojuon', row: 'ta', example: { jp: '友達', reading: 'ともだち', meaning: 'Teman' } },

  // Na-Row
  { id: 'k-na', hiragana: 'な', katakana: 'ナ', romaji: 'na', group: 'gojuon', row: 'na', example: { jp: '夏', reading: 'なつ', meaning: 'Musim panas' } },
  { id: 'k-ni', hiragana: 'に', katakana: 'ニ', romaji: 'ni', group: 'gojuon', row: 'na', example: { jp: '肉', reading: 'にく', meaning: 'Daging' } },
  { id: 'k-nu', hiragana: 'ぬ', katakana: 'ヌ', romaji: 'nu', group: 'gojuon', row: 'na', example: { jp: 'ぬいぐるみ', reading: 'ぬいぐるみ', meaning: 'Boneka' } },
  { id: 'k-ne', hiragana: 'ね', katakana: 'ネ', romaji: 'ne', group: 'gojuon', row: 'na', example: { jp: '猫', reading: 'ねこ', meaning: 'Kucing' } },
  { id: 'k-no', hiragana: 'の', katakana: 'ノ', romaji: 'no', group: 'gojuon', row: 'na', example: { jp: '飲み物', reading: 'のみもの', meaning: 'Minuman' } },

  // Ha-Row
  { id: 'k-ha', hiragana: 'は', katakana: 'ハ', romaji: 'ha', group: 'gojuon', row: 'ha', example: { jp: '花', reading: 'はな', meaning: 'Bunga' } },
  { id: 'k-hi', hiragana: 'ひ', katakana: 'ヒ', romaji: 'hi', group: 'gojuon', row: 'ha', example: { jp: '人', reading: 'ひと', meaning: 'Orang' } },
  { id: 'k-fu', hiragana: 'ふ', katakana: 'フ', romaji: 'fu', group: 'gojuon', row: 'ha', example: { jp: '冬', reading: 'ふゆ', meaning: 'Musim dingin' } },
  { id: 'k-he', hiragana: 'へ', katakana: 'ヘ', romaji: 'he', group: 'gojuon', row: 'ha', example: { jp: '部屋', reading: 'へや', meaning: 'Kamar' } },
  { id: 'k-ho', hiragana: 'ほ', katakana: 'ホ', romaji: 'ho', group: 'gojuon', row: 'ha', example: { jp: '本', reading: 'ほん', meaning: 'Buku' } },

  // Ma-Row
  { id: 'k-ma', hiragana: 'ま', katakana: 'マ', romaji: 'ma', group: 'gojuon', row: 'ma', example: { jp: '町', reading: 'まち', meaning: 'Kota' } },
  { id: 'k-mi', hiragana: 'み', katakana: 'ミ', romaji: 'mi', group: 'gojuon', row: 'ma', example: { jp: '水', reading: 'みず', meaning: 'Air' } },
  { id: 'k-mu', hiragana: 'む', katakana: 'ム', romaji: 'mu', group: 'gojuon', row: 'ma', example: { jp: '虫', reading: 'むし', meaning: 'Serangga' } },
  { id: 'k-me', hiragana: 'め', katakana: 'メ', romaji: 'me', group: 'gojuon', row: 'ma', example: { jp: '目', reading: 'め', meaning: 'Mata' } },
  { id: 'k-mo', hiragana: 'も', katakana: 'モ', romaji: 'mo', group: 'gojuon', row: 'ma', example: { jp: '森', reading: 'もり', meaning: 'Hutan' } },

  // Ya-Row
  { id: 'k-ya', hiragana: 'や', katakana: 'ヤ', romaji: 'ya', group: 'gojuon', row: 'ya', example: { jp: '山', reading: 'やま', meaning: 'Gunung' } },
  { id: 'k-yu', hiragana: 'ゆ', katakana: 'ユ', romaji: 'yu', group: 'gojuon', row: 'ya', example: { jp: '雪', reading: 'ゆき', meaning: 'Salju' } },
  { id: 'k-yo', hiragana: 'よ', katakana: 'ヨ', romaji: 'yo', group: 'gojuon', row: 'ya', example: { jp: '夜', reading: 'よる', meaning: 'Malam' } },

  // Ra-Row
  { id: 'k-ra', hiragana: 'ら', katakana: 'ラ', romaji: 'ra', group: 'gojuon', row: 'ra', example: { jp: '来週', reading: 'らいしゅう', meaning: 'Minggu depan' } },
  { id: 'k-ri', hiragana: 'り', katakana: 'リ', romaji: 'ri', group: 'gojuon', row: 'ra', example: { jp: '林檎', reading: 'りんご', meaning: 'Apel' } },
  { id: 'k-ru', hiragana: 'る', katakana: 'ル', romaji: 'ru', group: 'gojuon', row: 'ra', example: { jp: '留守', reading: 'るす', meaning: 'Tidak di rumah' } },
  { id: 'k-re', hiragana: 'れ', katakana: 'レ', romaji: 're', group: 'gojuon', row: 'ra', example: { jp: '歴史', reading: 'れきし', meaning: 'Sejarah' } },
  { id: 'k-ro', hiragana: 'ろ', katakana: 'ロ', romaji: 'ro', group: 'gojuon', row: 'ra', example: { jp: '六', reading: 'ろく', meaning: 'Enam' } },

  // Wa & N
  { id: 'k-wa', hiragana: 'わ', katakana: 'ワ', romaji: 'wa', group: 'gojuon', row: 'wa', example: { jp: '私', reading: 'わたし', meaning: 'Saya' } },
  { id: 'k-wo', hiragana: 'を', katakana: 'ヲ', romaji: 'wo', group: 'gojuon', row: 'wa', example: { jp: 'Partikel', reading: 'を', meaning: 'Partikel objek' } },
  { id: 'k-n', hiragana: 'ん', katakana: 'ン', romaji: 'n', group: 'gojuon', row: 'wa', example: { jp: '日本', reading: 'にほん', meaning: 'Jepang' } },
];

// ── 2. DAKUON & HANDAKUON (25 Suara Tenggorokan & Bibir) ──────
export const DAKUON_KANA: KanaItem[] = [
  // Ga-Row
  { id: 'k-ga', hiragana: 'が', katakana: 'ガ', romaji: 'ga', group: 'dakuon', row: 'ga', example: { jp: '学生', reading: 'がくせい', meaning: 'Siswa / Mahasiswa' } },
  { id: 'k-gi', hiragana: 'ぎ', katakana: 'ギ', romaji: 'gi', group: 'dakuon', row: 'ga', example: { jp: '銀行', reading: 'ぎんこう', meaning: 'Bank' } },
  { id: 'k-gu', hiragana: 'ぐ', katakana: 'グ', romaji: 'gu', group: 'dakuon', row: 'ga', example: { jp: '軍手', reading: 'ぐんて', meaning: 'Sarung tangan kerja' } },
  { id: 'k-ge', hiragana: 'げ', katakana: 'ゲ', romaji: 'ge', group: 'dakuon', row: 'ga', example: { jp: '元気', reading: 'げんき', meaning: 'Sehat / Semangat' } },
  { id: 'k-go', hiragana: 'ご', katakana: 'ゴ', romaji: 'go', group: 'dakuon', row: 'ga', example: { jp: 'ご飯', reading: 'ごはん', meaning: 'Nasi / Makanan' } },

  // Za-Row
  { id: 'k-za', hiragana: 'ざ', katakana: 'ザ', romaji: 'za', group: 'dakuon', row: 'za', example: { jp: '雑誌', reading: 'ざっし', meaning: 'Majalah' } },
  { id: 'k-ji', hiragana: 'じ', katakana: 'ジ', romaji: 'ji', group: 'dakuon', row: 'za', example: { jp: '時間', reading: 'じかん', meaning: 'Waktu / Jam' } },
  { id: 'k-zu', hiragana: 'ず', katakana: 'ズ', romaji: 'zu', group: 'dakuon', row: 'za', example: { jp: '図書', reading: 'としょ', meaning: 'Buku perpustakaan' } },
  { id: 'k-ze', hiragana: 'ぜ', katakana: 'ゼ', romaji: 'ze', group: 'dakuon', row: 'za', example: { jp: '全部', reading: 'ぜんぶ', meaning: 'Semuanya' } },
  { id: 'k-zo', hiragana: 'ぞ', katakana: 'ゾ', romaji: 'zo', group: 'dakuon', row: 'za', example: { jp: '象', reading: 'ぞう', meaning: 'Gajah' } },

  // Da-Row
  { id: 'k-da', hiragana: 'だ', katakana: 'ダ', romaji: 'da', group: 'dakuon', row: 'da', example: { jp: '大学', reading: 'だいがく', meaning: 'Universitas' } },
  { id: 'k-dji', hiragana: 'ぢ', katakana: 'ヂ', romaji: 'ji (di)', group: 'dakuon', row: 'da', example: { jp: '鼻血', reading: 'はなぢ', meaning: 'Mimisan' } },
  { id: 'k-dzu', hiragana: 'づ', katakana: 'ヅ', romaji: 'zu (du)', group: 'dakuon', row: 'da', example: { jp: '続く', reading: 'つづく', meaning: 'Berlanjut' } },
  { id: 'k-de', hiragana: 'で', katakana: 'デ', romaji: 'de', group: 'dakuon', row: 'da', example: { jp: '電話', reading: 'でんわ', meaning: 'Telepon' } },
  { id: 'k-do', hiragana: 'ど', katakana: 'ド', romaji: 'do', group: 'dakuon', row: 'da', example: { jp: 'どこ', reading: 'どこ', meaning: 'Di mana' } },

  // Ba-Row
  { id: 'k-ba', hiragana: 'ば', katakana: 'バ', romaji: 'ba', group: 'dakuon', row: 'ba', example: { jp: 'バス', reading: 'ばす', meaning: 'Bus' } },
  { id: 'k-bi', hiragana: 'び', katakana: 'ビ', romaji: 'bi', group: 'dakuon', row: 'ba', example: { jp: '病院', reading: 'びょういん', meaning: 'Rumah sakit' } },
  { id: 'k-bu', hiragana: 'ぶ', katakana: 'ブ', romaji: 'bu', group: 'dakuon', row: 'ba', example: { jp: '部長', reading: 'ぶちょう', meaning: 'Kepala bagian' } },
  { id: 'k-be', hiragana: 'べ', katakana: 'ベ', romaji: 'be', group: 'dakuon', row: 'ba', example: { jp: '勉強', reading: 'べんきょう', meaning: 'Belajar' } },
  { id: 'k-bo', hiragana: 'ぼ', katakana: 'ボ', romaji: 'bo', group: 'dakuon', row: 'ba', example: { jp: '帽子', reading: 'ぼうし', meaning: 'Topi' } },

  // Pa-Row (Handakuon)
  { id: 'k-pa', hiragana: 'ぱ', katakana: 'パ', romaji: 'pa', group: 'handakuon', row: 'pa', example: { jp: 'パン', reading: 'ぱん', meaning: 'Roti' } },
  { id: 'k-pi', hiragana: 'ぴ', katakana: 'ピ', romaji: 'pi', group: 'handakuon', row: 'pa', example: { jp: 'ピアノ', reading: 'ぴあの', meaning: 'Piano' } },
  { id: 'k-pu', hiragana: 'ぷ', katakana: 'プ', romaji: 'pu', group: 'handakuon', row: 'pa', example: { jp: 'プール', reading: 'ぷーる', meaning: 'Kolam renang' } },
  { id: 'k-pe', hiragana: 'ぺ', katakana: 'ペ', romaji: 'pe', group: 'handakuon', row: 'pa', example: { jp: 'ペン', reading: 'ぺん', meaning: 'Pena / Pulpen' } },
  { id: 'k-po', hiragana: 'ぽ', katakana: 'ポ', romaji: 'po', group: 'handakuon', row: 'pa', example: { jp: 'ポケット', reading: 'ぽけっと', meaning: 'Kantong / Saku' } },
];

// ── 3. YŌON (36 Suara Gabungan / Kombinasi) ────────────────────
export const YOON_KANA: KanaItem[] = [
  { id: 'k-kya', hiragana: 'きゃ', katakana: 'キャ', romaji: 'kya', group: 'yoon', example: { jp: '客', reading: 'きゃく', meaning: 'Tamu / Pelanggan' } },
  { id: 'k-kyu', hiragana: 'きゅ', katakana: 'キュ', romaji: 'kyu', group: 'yoon', example: { jp: '牛乳', reading: 'ぎゅうにゅう', meaning: 'Susu sapi' } },
  { id: 'k-kyo', hiragana: 'きょ', katakana: 'キョ', romaji: 'kyo', group: 'yoon', example: { jp: '今日', reading: 'きょう', meaning: 'Hari ini' } },

  { id: 'k-sha', hiragana: 'しゃ', katakana: 'シャ', romaji: 'sha', group: 'yoon', example: { jp: '写真', reading: 'しゃしん', meaning: 'Foto' } },
  { id: 'k-shu', hiragana: 'しゅ', katakana: 'シュ', romaji: 'shu', group: 'yoon', example: { jp: '宿題', reading: 'しゅくだい', meaning: 'PR / Tugas' } },
  { id: 'k-sho', hiragana: 'しょ', katakana: 'ショ', romaji: 'sho', group: 'yoon', example: { jp: '食堂', reading: 'しょくどう', meaning: 'Kantin' } },

  { id: 'k-cha', hiragana: 'ちゃ', katakana: 'チャ', romaji: 'cha', group: 'yoon', example: { jp: 'お茶', reading: 'おちゃ', meaning: 'Teh' } },
  { id: 'k-chu', hiragana: 'ちゅ', katakana: 'チュ', romaji: 'chu', group: 'yoon', example: { jp: '注意', reading: 'ちゅうい', meaning: 'Perhatian / Peringatan' } },
  { id: 'k-cho', hiragana: 'ちょ', katakana: 'チョ', romaji: 'cho', group: 'yoon', example: { jp: 'ちょっと', reading: 'ちょっと', meaning: 'Sebentar / Sedikit' } },

  { id: 'k-nya', hiragana: 'にゃ', katakana: 'ニャ', romaji: 'nya', group: 'yoon', example: { jp: 'こんにゃく', reading: 'こんにゃく', meaning: 'Konnyaku' } },
  { id: 'k-nyu', hiragana: 'にゅ', katakana: 'ニュ', romaji: 'nyu', group: 'yoon', example: { jp: '入院', reading: 'にゅういん', meaning: 'Rawat inap RS' } },
  { id: 'k-nyo', hiragana: 'にょ', katakana: 'ニョ', romaji: 'nyo', group: 'yoon', example: { jp: '女房', reading: 'にょうぼう', meaning: 'Istri' } },

  { id: 'k-hya', hiragana: 'ひゃ', katakana: 'ヒャ', romaji: 'hya', group: 'yoon', example: { jp: '百', reading: 'ひゃく', meaning: 'Seratus' } },
  { id: 'k-hyu', hiragana: 'ひゅ', katakana: 'ヒュ', romaji: 'hyu', group: 'yoon', example: { jp: 'ヒューズ', reading: 'ひゅーず', meaning: 'Sekring listrik' } },
  { id: 'k-hyo', hiragana: 'ひょ', katakana: 'ヒョ', romaji: 'hyo', group: 'yoon', example: { jp: '表', reading: 'ひょう', meaning: 'Tabel / Grafik' } },

  { id: 'k-mya', hiragana: 'みゃ', katakana: 'ミャ', romaji: 'mya', group: 'yoon', example: { jp: '脈', reading: 'みゃく', meaning: 'Denyut nadi' } },
  { id: 'k-myu', hiragana: 'みゅ', katakana: 'ミュ', romaji: 'myu', group: 'yoon', example: { jp: 'ミュージック', reading: 'みゅーじっく', meaning: 'Musik' } },
  { id: 'k-myo', hiragana: 'みょ', katakana: 'ミョ', romaji: 'myo', group: 'yoon', example: { jp: '名字', reading: 'みょうじ', meaning: 'Nama keluarga' } },

  { id: 'k-rya', hiragana: 'りゃ', katakana: 'リャ', romaji: 'rya', group: 'yoon', example: { jp: '略', reading: 'りゃく', meaning: 'Singkatan' } },
  { id: 'k-ryu', hiragana: 'りゅ', katakana: 'リュ', romaji: 'ryu', group: 'yoon', example: { jp: '留学', reading: 'りゅうがく', meaning: 'Studi ke luar negeri' } },
  { id: 'k-ryo', hiragana: 'りょ', katakana: 'リョ', romaji: 'ryo', group: 'yoon', example: { jp: '旅行', reading: 'りょこう', meaning: 'Wisata / Perjalanan' } },

  { id: 'k-gya', hiragana: 'ぎゃ', katakana: 'ギャ', romaji: 'gya', group: 'yoon', example: { jp: '逆', reading: 'ぎゃく', meaning: 'Kebalikan' } },
  { id: 'k-gyu', hiragana: 'ぎゅ', katakana: 'ギュ', romaji: 'gyu', group: 'yoon', example: { jp: '牛肉', reading: 'ぎゅうにく', meaning: 'Daging sapi' } },
  { id: 'k-gyo', hiragana: 'ぎょ', katakana: 'ギョ', romaji: 'gyo', group: 'yoon', example: { jp: '金魚', reading: 'きんぎょ', meaning: 'Ikan mas koki' } },

  { id: 'k-ja', hiragana: 'じゃ', katakana: 'ジャ', romaji: 'ja', group: 'yoon', example: { jp: '邪魔', reading: 'じゃま', meaning: 'Gangguan' } },
  { id: 'k-ju', hiragana: 'じゅ', katakana: 'ジュ', romaji: 'ju', group: 'yoon', example: { jp: '準備', reading: 'じゅんび', meaning: 'Persiapan' } },
  { id: 'k-jo', hiragana: 'じょ', katakana: 'ジョ', romaji: 'jo', group: 'yoon', example: { jp: '女性', reading: 'じょせい', meaning: 'Wanita' } },

  { id: 'k-bya', hiragana: 'びゃ', katakana: 'ビャ', romaji: 'bya', group: 'yoon', example: { jp: '白夜', reading: 'びゃくや', meaning: 'Malam putih' } },
  { id: 'k-byu', hiragana: 'びゅ', katakana: 'ビュ', romaji: 'byu', group: 'yoon', example: { jp: 'ビュッフェ', reading: 'びゅっふぇ', meaning: 'Prasmanan' } },
  { id: 'k-byo', hiragana: 'びょ', katakana: 'ビョ', romaji: 'byo', group: 'yoon', example: { jp: '病院', reading: 'びょういん', meaning: 'Rumah sakit' } },

  { id: 'k-pya', hiragana: 'ぴゃ', katakana: 'ピャ', romaji: 'pya', group: 'yoon', example: { jp: 'ぴゃっと', reading: 'ぴゃっと', meaning: 'Dengan cepat' } },
  { id: 'k-pyu', hiragana: 'ぴゅ', katakana: 'ピュ', romaji: 'pyu', group: 'yoon', example: { jp: 'ピューマ', reading: 'ぴゅーま', meaning: 'Puma' } },
  { id: 'k-pyo', hiragana: 'ぴょ', katakana: 'ピョ', romaji: 'pyo', group: 'yoon', example: { jp: 'ぴょんぴょん', reading: 'ぴょんぴょん', meaning: 'Melompat-lompat' } },
];
