// ══════════════════════════════════════════════════════════════════
//  keigoData.ts — Master Keigo (尊敬語・謙譲語・丁寧語・美化語) Dataset
//  Built for Indonesian Learners, SSW (Tokutei Ginou), & JLPT N4–N1
//  Curated from verified open-source linguistic matrices & workplace manuals
// ══════════════════════════════════════════════════════════════════

export type HonorificRegister = 'sonkeigo' | 'kenjougo' | 'teineigo';

export interface KeigoVerb {
  id: string;
  dictionaryForm: string;
  reading: string;
  meaning: string; // Indonesian
  meaningEn: string;
  type: 'irregular' | 'regular';
  stem?: string;
  prefix?: 'お' | 'ご';
  sonkeigo: string;
  kenjougo: string;
  teineigo: string;
  alternateSonkeigo?: string[];
  alternateKenjougo?: string[];
  teForm?: string;
  nuanceNote: string; // Indonesian pedagogical advice
  exampleSonkeigo: {
    jp: string;
    reading: string;
    id: string;
  };
  exampleKenjougo: {
    jp: string;
    reading: string;
    id: string;
  };
}

export interface KeigoNounWord {
  id: string;
  plain: string;
  reading: string;
  meaning: string;
  category: 'noun-pair' | 'bikago' | 'pronoun' | 'family';
  sonkeigo?: string;
  kenjougo?: string;
  teineigo?: string;
  alternateSonkeigo?: string[];
  alternateKenjougo?: string[];
  nuanceNote: string;
  example: {
    jp: string;
    reading: string;
    id: string;
  };
}

export interface RequestLadderTier {
  id: string;
  tier: 'casual' | 'polite' | 'formal' | 'supreme';
  label: string;
  pattern: string;
  level: number; // 1-4
  targetAudience: string;
  idExplanation: string;
  example: {
    jp: string;
    reading: string;
    id: string;
  };
}

export interface KeigoScenarioOption {
  text: string;
  reading: string;
  isCorrect: boolean;
  feedback: string; // Detailed Indonesian feedback
}

export interface KeigoScenario {
  id: string;
  category: 'customer-service' | 'workplace' | 'phone' | 'email' | 'meeting' | 'ssw-tokutei';
  categoryLabel: string;
  setting: string;
  otherParty: string;
  role: string;
  actorIsSelf: boolean;
  targetRegister: HonorificRegister;
  promptCue: string;
  options: KeigoScenarioOption[];
  explanation: string;
  difficulty: 'pemula' | 'menengah' | 'mahir';
  flipCase?: boolean;
  audioPhrase: string;
}

export interface BusinessEtiquetteNote {
  id: string;
  title: string;
  status: 'Sudah Baku (Settled)' | 'Kontekstual (Debated)';
  textbookTaught: string;
  workplaceReality: string;
  sswPracticalTip: string;
}

// ══════════════════════════════════════════════════════════════════
// 1. MASTER KEIGO VERB BANK (15 IRREGULAR + CORE REGULAR VERBS)
// ══════════════════════════════════════════════════════════════════

export const KEIGO_VERB_BANK: KeigoVerb[] = [
  // --- 15 IRREGULAR VERBS (WAJIB HAFAL JLPT & TOKUTEI GINOU) ---
  {
    id: 'iku',
    dictionaryForm: '行く',
    reading: 'いく',
    meaning: 'Pergi',
    meaningEn: 'to go',
    type: 'irregular',
    stem: '行き',
    prefix: 'お',
    sonkeigo: 'いらっしゃる',
    alternateSonkeigo: ['おいでになる', 'お越しになる'],
    kenjougo: '参る',
    alternateKenjougo: ['伺う'],
    teineigo: '行きます',
    teForm: '行って',
    nuanceNote: 'Hati-hati: "いらっしゃる" berlaku untuk 行く, 来る, dan いる. Jangan pernah memakai "お行きになる" (kesalahan umum pembelajar). Kenjougo "伺う" (うかがう) dipakai khusus saat pergi/berkunjung ke tempat lawan bicara.',
    exampleSonkeigo: {
      jp: '社長は明日、大阪へいらっしゃいます。',
      reading: 'しゃちょうはあす、おおさかへいらっしゃいます。',
      id: 'Presiden direktur besok akan pergi ke Osaka.',
    },
    exampleKenjougo: {
      jp: '明日10時に貴社へ参ります。',
      reading: 'あすじゅうじにきしゃへまいります。',
      id: 'Besok jam 10 saya akan datang/pergi ke kantor perusahaan Bapak/Ibu.',
    },
  },
  {
    id: 'kuru',
    dictionaryForm: '来る',
    reading: 'くる',
    meaning: 'Datang',
    meaningEn: 'to come',
    type: 'irregular',
    stem: '来',
    prefix: 'お',
    sonkeigo: 'いらっしゃる',
    alternateSonkeigo: ['お見えになる', 'お越しになる'],
    kenjougo: '参る',
    teineigo: '来ます',
    teForm: '来て',
    nuanceNote: 'Saat tamu/klien datang ke kantor kita, gunakan Sonkeigo "お越しになる" atau "お見えになる" (sangat elegan di dunia bisnis & perhotelan). Diri sendiri memakai "参る".',
    exampleSonkeigo: {
      jp: 'お客様がお見えになりました。',
      reading: 'おきゃくさまがおみえになりました。',
      id: 'Tamu sudah tiba/datang.',
    },
    exampleKenjougo: {
      jp: 'インドネシアから参りましたアディと申します。',
      reading: 'いんどねしあからまいりましたあでぃともうします。',
      id: 'Saya Adi, datang dari Indonesia.',
    },
  },
  {
    id: 'iru',
    dictionaryForm: 'いる',
    reading: 'いる',
    meaning: 'Ada / Berada (makhluk hidup)',
    meaningEn: 'to be (animate)',
    type: 'irregular',
    stem: 'い',
    prefix: 'お',
    sonkeigo: 'いらっしゃる',
    kenjougo: 'おる',
    teineigo: 'います',
    teForm: 'いて',
    nuanceNote: 'Ketika menerima telepon dari luar menanyakan atasan kita: katakan "田中はただいま席を外して**おります**" (Kenjougo), BUKAN "いらっしゃいません". Karena di hadapan orang luar, bos satu kantor adalah anggota kelompok kita (Uchi).',
    exampleSonkeigo: {
      jp: '先生は研究室にいらっしゃいますか。',
      reading: 'せんせいはけんきゅうしつにいらっしゃいますか。',
      id: 'Apakah Bapak Dosen sedang berada di ruang penelitian?',
    },
    exampleKenjougo: {
      jp: '私は受付におります。',
      reading: 'わたしはうけつけにおります。',
      id: 'Saya berada di meja resepsionis.',
    },
  },
  {
    id: 'suru',
    dictionaryForm: 'する',
    reading: 'する',
    meaning: 'Melakukan / Mengerjakan',
    meaningEn: 'to do',
    type: 'irregular',
    stem: 'し',
    prefix: 'お',
    sonkeigo: 'なさる',
    alternateSonkeigo: ['される'],
    kenjougo: 'いたす',
    teineigo: 'します',
    teForm: 'して',
    nuanceNote: '"なさる" adalah Sonkeigo murni (sering dipakai dalam bentuk ます: なさいます / なさってください). "いたす" adalah Kenjougo (contoh: よろしくお願いいたします).',
    exampleSonkeigo: {
      jp: '週末は何をなさいますか。',
      reading: 'しゅうまつはなにをなさいますか。',
      id: 'Apa yang akan Bapak/Ibu lakukan di akhir pekan?',
    },
    exampleKenjougo: {
      jp: '本日のご案内は私が担当いたします。',
      reading: 'ほんじつのごあんないはわたしがたんとういたします。',
      id: 'Pemanduan hari ini akan saya tangani.',
    },
  },
  {
    id: 'iu',
    dictionaryForm: '言う',
    reading: 'いう',
    meaning: 'Berkata / Mengatakan',
    meaningEn: 'to say / tell',
    type: 'irregular',
    stem: '言い',
    prefix: 'お',
    sonkeigo: 'おっしゃる',
    kenjougo: '申す',
    alternateKenjougo: ['申し上げる'],
    teineigo: '言います',
    teForm: '言って',
    nuanceNote: '"おっしゃる" (ます: おっしゃいます) untuk ucapan atasan/tamu. "申す" (もうす) untuk ucapan diri sendiri tanpa objek langsung. "申し上げる" untuk perkataan yang ditujukan langsung menghormati lawan bicara (contoh: お礼申し上げます).',
    exampleSonkeigo: {
      jp: '部長がおっしゃった通りに進めます。',
      reading: 'ぶちょうがおっしゃったとおりにすすめます。',
      id: 'Saya akan melanjutkan sesuai yang dikatakan Bapak Manajer Divisi.',
    },
    exampleKenjougo: {
      jp: '担当の田中よりお電話にて申し上げます。',
      reading: 'たんとうのたなかよりおでんわにてもうしあげます。',
      id: 'Staf kami, Tanaka, akan menyampaikannya melalui telepon.',
    },
  },
  {
    id: 'miru',
    dictionaryForm: '見る',
    reading: 'みる',
    meaning: 'Melihat / Memeriksa',
    meaningEn: 'to see / look',
    type: 'irregular',
    stem: '見',
    prefix: 'お',
    sonkeigo: 'ご覧になる',
    kenjougo: '拝見する',
    teineigo: '見ます',
    teForm: '見て',
    nuanceNote: '"ご覧になる" (ごらんになる) untuk pandangan atasan/klien. "拝見する" (はいけんする) berakar dari kanji 拝 (sembah/sujud) + 見 (melihat), artinya melihat dokumen/karya lawan bicara dengan penuh kerendahan hati.',
    exampleSonkeigo: {
      jp: 'こちらの資料をご覧ください。',
      reading: 'こちらのしりょうをごらんください。',
      id: 'Silakan lihat/periksa berkas dokumen berikut.',
    },
    exampleKenjougo: {
      jp: 'お送りいただいた企画書を拝見しました。',
      reading: 'おおくりいただいたきかくしょをはいけんしました。',
      id: 'Saya telah dengan hormat membaca proposal yang Anda kirimkan.',
    },
  },
  {
    id: 'taberu',
    dictionaryForm: '食べる',
    reading: 'たべる',
    meaning: 'Makan',
    meaningEn: 'to eat',
    type: 'irregular',
    stem: '食べ',
    prefix: 'お',
    sonkeigo: '召し上がる',
    kenjougo: 'いただく',
    teineigo: '食べます',
    teForm: '食べて',
    nuanceNote: 'Hati-hati: Jangan pernah menggunakan "お食べになる" karena bentuk irregular resminya adalah "召し上がる" (めしあがる). Bentuk "いただきます" sebelum makan berasal dari Kenjougo ini (menerima anugerah makanan secara rendah hati).',
    exampleSonkeigo: {
      jp: 'どうぞ温かいうちに召し上がってください。',
      reading: 'どうぞあたたかいうちにめしあがってください。',
      id: 'Silakan santap selagi masih hangat.',
    },
    exampleKenjougo: {
      jp: 'お土産の和菓子を美味しくいただきました。',
      reading: 'おみやげのわがしをおいしくいただきました。',
      id: 'Saya telah menikmati hidangan kue tradisional oleh-oleh dengan nikmat.',
    },
  },
  {
    id: 'nomu',
    dictionaryForm: '飲む',
    reading: 'のむ',
    meaning: 'Minum',
    meaningEn: 'to drink',
    type: 'irregular',
    stem: '飲み',
    prefix: 'お',
    sonkeigo: '召し上がる',
    kenjougo: 'いただく',
    teineigo: '飲みます',
    teForm: '飲んで',
    nuanceNote: 'Sama persis seperti 食べる, kata 飲む juga berubah menjadi "召し上がる" (Sonkeigo) dan "いただく" (Kenjougo). Untuk menawari minuman: "お茶を召し上がりますか" atau "お飲み物はいかがですか".',
    exampleSonkeigo: {
      jp: 'お茶を召し上がりますか。',
      reading: 'おちゃをめしあがりますか。',
      id: 'Apakah Bapak/Ibu berkenan minum teh?',
    },
    exampleKenjougo: {
      jp: '冷たいお茶を一杯いただきます。',
      reading: 'つめたいおちゃをいっぱいいただきます。',
      id: 'Saya akan minum segelas teh dingin.',
    },
  },
  {
    id: 'shiru',
    dictionaryForm: '知る',
    reading: 'しる',
    meaning: 'Tahu / Mengetahui',
    meaningEn: 'to know',
    type: 'irregular',
    stem: '知り',
    prefix: 'お',
    sonkeigo: 'ご存知だ',
    alternateSonkeigo: ['ご存知です', 'ご存知でいらっしゃる'],
    kenjougo: '存じる',
    alternateKenjougo: ['存じ上げる', '存じております'],
    teineigo: '知っています',
    teForm: '知って',
    nuanceNote: 'Menanyakan atasan: "ご存知ですか" (Apakah Anda tahu?). Menyatakan diri sendiri tahu: "存じております" (Saya sudah tahu). Menyatakan diri TIDAK tahu: "存じません" atau "存じ上げません" (Jauh lebih sopan daripada 知りません).',
    exampleSonkeigo: {
      jp: '来週の会議の件はご存知でしょうか。',
      reading: 'らいしゅうのかいぎのけんはごぞんじでしょうか。',
      id: 'Apakah Bapak/Ibu sudah mengetahui perihal rapat minggu depan?',
    },
    exampleKenjougo: {
      jp: 'その件につきましては重々存じております。',
      reading: 'そのけんにつきましてはじゅうじゅうぞんじております。',
      id: 'Mengenai hal tersebut, saya sudah sangat mengetahuinya.',
    },
  },
  {
    id: 'kureru',
    dictionaryForm: 'くれる',
    reading: 'くれる',
    meaning: 'Memberi (kepada saya / pihak saya)',
    meaningEn: 'to give (to me)',
    type: 'irregular',
    stem: 'くれ',
    prefix: 'お',
    sonkeigo: 'くださる',
    kenjougo: '— (tidak ada bentuk Kenjougo untuk kureru)',
    teineigo: 'くれます',
    teForm: 'くれて',
    nuanceNote: '"くださる" (ます: くださいます) adalah Sonkeigo mutlak. Karena くれる selalu berarti "orang lain memberi ke saya", pelakunya selalu orang lain (tidak mungkin diri sendiri), sehingga tidak ada bentuk Kenjougo.',
    exampleSonkeigo: {
      jp: '課長がアドバイスをくださいました。',
      reading: 'かちょうがあどばいすをくださいました。',
      id: 'Bapak Kepala Seksi telah memberikan nasihat kepada saya.',
    },
    exampleKenjougo: {
      jp: '—',
      reading: '—',
      id: 'Tindakan くれる selalu dilakukan pihak luar/orang lain kepada kita.',
    },
  },
  {
    id: 'ageru',
    dictionaryForm: 'あげる',
    reading: 'あげる',
    meaning: 'Memberikan (kepada orang lain)',
    meaningEn: 'to give (to someone)',
    type: 'irregular',
    stem: 'あげ',
    prefix: 'お',
    sonkeigo: '— (Gunakan kata lain seperti お与えになる)',
    kenjougo: '差し上げる',
    teineigo: 'あげます',
    teForm: 'あげて',
    nuanceNote: 'Saat kita memberikan sesuatu kepada atasan atau klien, jangan gunakan "あげます" (terdengar menggurui/kasar). Selalu gunakan "差し上げる" (さしあげる), contoh: "資料を差し上げます".',
    exampleSonkeigo: {
      jp: '—',
      reading: '—',
      id: 'Untuk tindakan atasan memberi ke orang ketiga biasanya memakai くださる atau 遣わす.',
    },
    exampleKenjougo: {
      jp: '後ほど詳細な資料を差し上げます。',
      reading: 'のちほどしょうさいなしりょうをさしあげます。',
      id: 'Nanti saya akan menyerahkan/memberikan dokumen rinciannya kepada Bapak/Ibu.',
    },
  },
  {
    id: 'morau',
    dictionaryForm: 'もらう',
    reading: 'もらう',
    meaning: 'Menerima',
    meaningEn: 'to receive',
    type: 'irregular',
    stem: 'もらい',
    prefix: 'お',
    sonkeigo: '— (Gunakan お受け取りになる)',
    kenjougo: 'いただく',
    alternateKenjougo: ['頂戴する'],
    teineigo: 'もらいます',
    teForm: 'もらって',
    nuanceNote: 'Ketika kita menerima dokumen, izin, atau kartu nama dari klien/atasan: "名刺を頂戴いたします" (ちょうだいいたします) atau "許可をいただきました".',
    exampleSonkeigo: {
      jp: '書類をお受け取りになりましたか。',
      reading: 'しょるいをおうけとりになりましたか。',
      id: 'Apakah Bapak/Ibu sudah menerima berkas dokumennya?',
    },
    exampleKenjougo: {
      jp: '部長からご許可をいただきました。',
      reading: 'ぶちょうからごきょかをいただきました。',
      id: 'Saya telah menerima izin dari Bapak Manajer Divisi.',
    },
  },
  {
    id: 'au',
    dictionaryForm: '会う',
    reading: 'あう',
    meaning: 'Bertemu',
    meaningEn: 'to meet',
    type: 'irregular',
    stem: '会い',
    prefix: 'お',
    sonkeigo: 'お会いになる',
    kenjougo: 'お目にかかる',
    teineigo: '会います',
    teForm: '会って',
    nuanceNote: 'Ungkapan salam perkenalan formal bisnis: "お目にかかれて光栄です" (おめにかかれてこうえいです - Merupakan kehormatan besar bagi saya dapat berjumpa dengan Bapak/Ibu).',
    exampleSonkeigo: {
      jp: '明日はどちらでお会いになりますか。',
      reading: 'あすはどちらでおあいになりますか。',
      id: 'Besok Bapak/Ibu akan bertemu di mana?',
    },
    exampleKenjougo: {
      jp: '来週水曜日にお目にかかりたく存じます。',
      reading: 'らいしゅうすいようびにおめにかかりたくぞんじます。',
      id: 'Saya bermaksud memohon kesempatan untuk bertemu dengan Bapak/Ibu pada hari Rabu depan.',
    },
  },
  {
    id: 'kiku',
    dictionaryForm: '聞く',
    reading: 'きく',
    meaning: 'Mendengar / Bertanya / Mengunjungi',
    meaningEn: 'to hear / ask / visit',
    type: 'irregular',
    stem: '聞き',
    prefix: 'お',
    sonkeigo: 'お聞きになる',
    kenjougo: '伺う',
    alternateKenjougo: ['お聞きする', '拝聴する'],
    teineigo: '聞きます',
    teForm: '聞いて',
    nuanceNote: '"伺う" (うかがう) adalah kata serbaguna: 1) Bertanya ("お話を伺います"), 2) Mendengar ("ご意見を伺いました"), 3) Berkunjung ("明日伺います").',
    exampleSonkeigo: {
      jp: 'ニュースをお聞きになりましたか。',
      reading: 'にゅーすをおききになりましたか。',
      id: 'Apakah Bapak/Ibu sudah mendengar berita tersebut?',
    },
    exampleKenjougo: {
      jp: '詳しいご事情を伺ってもよろしいでしょうか。',
      reading: 'くわしいごじじょうをうかがってもよろしいでしょうか。',
      id: 'Bolehkah saya menanyakan/mendengar penjelasan detail situasinya?',
    },
  },
  {
    id: 'neru',
    dictionaryForm: '寝る',
    reading: 'ねる',
    meaning: 'Tidur / Beristirahat',
    meaningEn: 'to sleep / rest',
    type: 'irregular',
    stem: '寝',
    prefix: 'お',
    sonkeigo: 'お休みになる',
    kenjougo: '休む (bentuk rendah diri biasa)',
    teineigo: '寝ます',
    teForm: '寝て',
    nuanceNote: 'Jangan katakan "寝てください" ke pasien atau tamu hotel. Gunakan "どうぞごゆっくりお休みになってください".',
    exampleSonkeigo: {
      jp: '昨夜はよくお休みになれましたか。',
      reading: 'ゆうべはよくおやすみになれましたか。',
      id: 'Apakah tadi malam Bapak/Ibu dapat beristirahat/tidur dengan nyenyak?',
    },
    exampleKenjougo: {
      jp: '体調不良のため本日は早めに休みます。',
      reading: 'たいちょうふりょうのためほんじつははやめにやすみます。',
      id: 'Karena kurang sehat, hari ini saya akan beristirahat lebih awal.',
    },
  },

  // --- REGULAR VERBS WITH POLITE PATTERNS (お/ご + STEM + になる / する) ---
  {
    id: 'yomu',
    dictionaryForm: '読む',
    reading: 'よむ',
    meaning: 'Membaca',
    meaningEn: 'to read',
    type: 'regular',
    stem: '読み',
    prefix: 'お',
    sonkeigo: 'お読みになる',
    kenjougo: 'お読みする',
    teineigo: '読みます',
    teForm: '読んで',
    nuanceNote: 'Pola beraturan Wago (bahasa asli Jepang): お + stemます + になる (Sonkeigo) / する (Kenjougo).',
    exampleSonkeigo: {
      jp: '契約書をお読みになりましたか。',
      reading: 'けいやくしょをおよみになりましたか。',
      id: 'Apakah Anda sudah membaca surat kontrak perjanjian?',
    },
    exampleKenjougo: {
      jp: 'お手紙を大切にお読みしました。',
      reading: 'おてがみをたいせつにおよみしました。',
      id: 'Saya telah membaca surat Anda dengan penuh rasa hormat.',
    },
  },
  {
    id: 'kaku',
    dictionaryForm: '書く',
    reading: 'かく',
    meaning: 'Menulis / Mengisi form',
    meaningEn: 'to write / fill in',
    type: 'regular',
    stem: '書き',
    prefix: 'お',
    sonkeigo: 'お書きになる',
    kenjougo: 'お書きする',
    teineigo: '書きます',
    teForm: '書いて',
    nuanceNote: 'Sering dipakai dalam permohonan mengisi formulir pendaftaran: "こちらにお名前とお電話番号をお書きください".',
    exampleSonkeigo: {
      jp: 'こちらにご署名をお書きになりますか。',
      reading: 'こちらにごしょめいをおかきになりますか。',
      id: 'Apakah Anda berkenan menuliskan tanda tangan di sebelah sini?',
    },
    exampleKenjougo: {
      jp: '控えをお書きしてお渡しいたします。',
      reading: 'ひかえをおかきしておわたしいたします。',
      id: 'Saya akan menuliskan lembar salinan dan menyerahkannya kepada Anda.',
    },
  },
  {
    id: 'matsu',
    dictionaryForm: '待つ',
    reading: 'まつ',
    meaning: 'Menunggu',
    meaningEn: 'to wait',
    type: 'regular',
    stem: '待ち',
    prefix: 'お',
    sonkeigo: 'お待ちになる',
    kenjougo: 'お待ちする',
    teineigo: '待ちます',
    teForm: '待って',
    nuanceNote: 'Frasa emas dunia kerja Jepang: "少々お待ちください" (Mohon tunggu sebentar - Sonkeigo). Janji diri sendiri: "ロビーでお待ちしております" (Saya menunggu di lobi - Kenjougo).',
    exampleSonkeigo: {
      jp: '少々お待ちいただけますでしょうか。',
      reading: 'しょうしょうおまちいただけますでしょうか。',
      id: 'Sudikah kiranya Bapak/Ibu berkenan menunggu sebentar?',
    },
    exampleKenjougo: {
      jp: '1階のエレベーター前でお待ちしております。',
      reading: 'いっかいのえれべーたまえでおまちしております。',
      id: 'Saya sedang menunggu di depan lift lantai 1.',
    },
  },
  {
    id: 'okuru',
    dictionaryForm: '送る',
    reading: 'おくる',
    meaning: 'Mengirim / Mengantar',
    meaningEn: 'to send / escort',
    type: 'regular',
    stem: '送り',
    prefix: 'お',
    sonkeigo: 'お送りになる',
    kenjougo: 'お送りする',
    teineigo: '送ります',
    teForm: '送って',
    nuanceNote: 'Dalam email bisnis: "メールにて見積書をお送りいたします" (Saya kirimkan surat penawaran harga lewat email).',
    exampleSonkeigo: {
      jp: '荷物はどちらへお送りになりますか。',
      reading: 'にもつはどちらへおおくりになりますか。',
      id: 'Paketnya hendak Bapak/Ibu kirimkan ke mana?',
    },
    exampleKenjougo: {
      jp: '本日中にメールでお送りいたします。',
      reading: 'ほんじつちゅうにめーるでおおくりいたします。',
      id: 'Akan saya kirimkan melalui email sebelum hari ini berakhir.',
    },
  },
  {
    id: 'renrakusuru',
    dictionaryForm: '連絡する',
    reading: 'れんらくする',
    meaning: 'Menghubungi / Mengontak',
    meaningEn: 'to contact',
    type: 'regular',
    stem: '連絡',
    prefix: 'ご',
    sonkeigo: 'ご連絡になる',
    alternateSonkeigo: ['ご連絡なさる', 'ご連絡くださる'],
    kenjougo: 'ご連絡する',
    alternateKenjougo: ['ご連絡いたす', 'ご連絡申し上げる'],
    teineigo: '連絡します',
    teForm: '連絡して',
    nuanceNote: 'Verba Kango (senyawa kanji Tiongkok) menggunakan awalan "ご" (Bukan お!). Diri sendiri menghubungi: "追ってご連絡申し上げます".',
    exampleSonkeigo: {
      jp: '決まり次第、ご連絡いただけますでしょうか。',
      reading: 'きまりしだい、ごれんらくいただけますでしょうか。',
      id: 'Begitu sudah ada keputusan, apakah sekiranya Bapak/Ibu dapat menghubungi kami?',
    },
    exampleKenjougo: {
      jp: '折り返し担当者よりご連絡いたします。',
      reading: 'おりかえしたんとうしゃよりごれんらくいたします。',
      id: 'Petugas kami akan segera menghubungi Anda kembali.',
    },
  },
  {
    id: 'annaisuru',
    dictionaryForm: '案内する',
    reading: 'あんないする',
    meaning: 'Memandu / Menunjukkan jalan',
    meaningEn: 'to guide / show around',
    type: 'regular',
    stem: '案内',
    prefix: 'ご',
    sonkeigo: 'ご案内になる',
    alternateSonkeigo: ['ご案内なさる'],
    kenjougo: 'ご案内する',
    alternateKenjougo: ['ご案内いたす', 'ご案内申し上げる'],
    teineigo: '案内します',
    teForm: '案内して',
    nuanceNote: 'Kunci dalam SSW Kaigo, Restoran, dan Hotel: "お席へご案内いたします" (Saya antarkan Anda ke tempat duduk).',
    exampleSonkeigo: {
      jp: '館内はどちらからご案内になりたいですか。',
      reading: 'かんないはどちらからごあんないになりたいですか。',
      id: 'Bagian gedung mana yang ingin Anda pandu terlebih dahulu?',
    },
    exampleKenjougo: {
      jp: '会議室へご案内申し上げます。どうぞこちらへ。',
      reading: 'かいぎしつへごあんないもうしあげます。どうぞこちらへ。',
      id: 'Saya antarkan menuju ruang rapat. Silakan lewat sebelah sini.',
    },
  },
  {
    id: 'kakuninsuru',
    dictionaryForm: '確認する',
    reading: 'かくにんする',
    meaning: 'Memeriksa / Mengonfirmasi',
    meaningEn: 'to confirm / verify',
    type: 'regular',
    stem: '確認',
    prefix: 'ご',
    sonkeigo: 'ご確認になる',
    alternateSonkeigo: ['ご確認なさる', 'ご確認くださる'],
    kenjougo: 'ご確認する',
    alternateKenjougo: ['ご確認いたす', '確認いたします'],
    teineigo: '確認します',
    teForm: '確認して',
    nuanceNote: 'Paling sering muncul di email bisnis dan checklist keselamatan SSW: "添付ファイルをご確認ください" (Mohon periksa berkas lampiran).',
    exampleSonkeigo: {
      jp: '内容をご確認の上、ご返信ください。',
      reading: 'ないようをごかくにんのうえ、ごへんしんください。',
      id: 'Setelah memeriksa isinya, mohon kirimkan balasan kepada kami.',
    },
    exampleKenjougo: {
      jp: 'ただいま在庫を確認してまいります。',
      reading: 'ただいまざいこをかくにんしてまいります。',
      id: 'Saat ini saya akan pergi memeriksa ketersediaan stok barang.',
    },
  },
];

// ══════════════════════════════════════════════════════════════════
// 2. KEIGO NOUNS & BIKAGO (美化語 - POLISHING PREFIXES & NOUN PAIRS)
// ══════════════════════════════════════════════════════════════════

export const KEIGO_NOUN_BANK: KeigoNounWord[] = [
  // --- KATA BENDA PASANGAN PERUSAHAAN (FLAGSHIP UCHI/SOTO) ---
  {
    id: 'kaisha',
    plain: '会社',
    reading: 'かいしゃ',
    meaning: 'Perusahaan (Kantor)',
    category: 'noun-pair',
    sonkeigo: '貴社 (Tulisan) / 御社 (Lisan)',
    kenjougo: '弊社 / 当社',
    alternateSonkeigo: ['貴社 (きしゃ)', '御社 (おんしゃ)'],
    alternateKenjougo: ['弊社 (へいしゃ)', '当社 (とうしゃ)'],
    nuanceNote: 'HUKUM MUTLAK BISNIS: Sebut perusahaan lawan bicara dengan "御社" (lisan/interview) atau "貴社" (tulisan/email/surat). Sebut perusahaan tempat diri sendiri bekerja dengan "弊社" (merendahkan diri) atau "当社" (formal objektif). Jangan pernah tertukar!',
    example: {
      jp: '御社の事業方針に深く共感し、弊社よりご提案申し上げます。',
      reading: 'おんしゃのじぎょうほうしんにふかくきょうかんし、へいしゃよりごていあんもうしあげます。',
      id: 'Kami sangat setuju dengan visi bisnis perusahaan Bapak (御社), dan perkenankan perusahaan kami (弊社) mengajukan proposal.',
    },
  },
  {
    id: 'hito',
    plain: '人',
    reading: 'ひと',
    meaning: 'Orang',
    category: 'noun-pair',
    sonkeigo: '方 (かた)',
    kenjougo: '者 (もの)',
    nuanceNote: 'Untuk orang pihak luar/klien: gunakan "あの方" atau "担当の方". Untuk staf sendiri di depan klien: "担当の者" (Bukan 担当の方!).',
    example: {
      jp: 'あちらにいらっしゃる方が先方の責任者様です。',
      reading: 'あちらにいらっしゃるかたがせんぽうのせきにんしゃさまです。',
      id: 'Orang yang berada di sebelah sana adalah penanggung jawab dari pihak mitra.',
    },
  },
  {
    id: 'dare',
    plain: '誰',
    reading: 'だれ',
    meaning: 'Siapa',
    category: 'pronoun',
    sonkeigo: 'どなた様 / どちら様',
    nuanceNote: 'Saat menerima tamu atau telepon, JANGAN PERNAH bertanya "誰ですか" (kasar). Selalu gunakan "失礼ですが、どちら様でしょうか" (Mohon maaf, dengan siapakah saya berbicara?).',
    example: {
      jp: '恐れ入りますが、お名前はどちら様でしょうか。',
      reading: 'おそれいりますが、おなまえはどちらさまでしょうか。',
      id: 'Mohon maaf sebelumnya, dengan Bapak/Ibu siapakah saya berbicara?',
    },
  },
  {
    id: 'namae',
    plain: '名前',
    reading: 'なまえ',
    meaning: 'Nama',
    category: 'bikago',
    sonkeigo: 'お名前',
    nuanceNote: 'Bikago awalan "お" untuk meninggikan nama lawan bicara. Untuk nama sendiri, cukup sebut nama polos (tidak boleh menyebut diri sendiri "お田中").',
    example: {
      jp: '恐れ入りますが、お名前の漢字を教えていただけますか。',
      reading: 'おそれいりますが、おなまえのかんじをおしえていただけますか。',
      id: 'Mohon maaf, sudikah Anda memberitahu kanji dari nama Anda?',
    },
  },
  {
    id: 'juusho',
    plain: '住所',
    reading: 'じゅうしょ',
    meaning: 'Alamat',
    category: 'bikago',
    sonkeigo: 'ご住所',
    nuanceNote: 'Kata kango (senyawa kanji Sino-Jepang) memakai awalan "ご": ご住所, ご意見, ご都合.',
    example: {
      jp: '新しいご住所の確認をお願いいたします。',
      reading: 'あたらしいごじゅうしょのかくにんをおねがいいたします。',
      id: 'Kami mohon Anda memeriksa konfirmasi alamat baru Anda.',
    },
  },
  {
    id: 'otto',
    plain: '夫',
    reading: 'おっと',
    meaning: 'Suami',
    category: 'family',
    sonkeigo: 'ご主人 / 旦那様',
    kenjougo: '夫 (おっと) / 主人',
    nuanceNote: 'Menyebut suami lawan bicara: "ご主人" (ごしゅじん). Menyebut suami diri sendiri ke orang lain: "夫" (おっと).',
    example: {
      jp: 'ご主人は今日もお忙しいですか。',
      reading: 'ごしゅじんはきょうもお忙しいですか。',
      id: 'Apakah suami Anda hari ini juga sibuk?',
    },
  },
  {
    id: 'tsuma',
    plain: '妻',
    reading: 'つま',
    meaning: 'Istri',
    category: 'family',
    sonkeigo: '奥様 (おくさま)',
    kenjougo: '妻 (つま) / 家内 (かない)',
    nuanceNote: 'Menyebut istri lawan bicara: "奥様". Menyebut istri sendiri kepada rekan kerja/klien: "妻" (paling modern) atau "家内" (tradisional humble).',
    example: {
      jp: '奥様にもどうぞよろしくお伝えください。',
      reading: 'おくさまにもどうぞよろしくおつたえください。',
      id: 'Sampaikan salam hangat saya kepada istri Anda.',
    },
  },
  {
    id: 'kodomo',
    plain: '子供',
    reading: 'こども',
    meaning: 'Anak',
    category: 'family',
    sonkeigo: 'お子様 (おこさま)',
    kenjougo: '子供',
    nuanceNote: 'Di restoran atau klinik, anak pelanggan selalu disapa dengan "お子様". Menu anak disebut "お子様ランチ".',
    example: {
      jp: 'お子様用の椅子をご用意いたします。',
      reading: 'おこさまようのいすをごよういいたします。',
      id: 'Saya akan menyiapkan kursi khusus untuk anak Anda.',
    },
  },
  {
    id: 'ie',
    plain: '家',
    reading: 'いえ',
    meaning: 'Rumah',
    category: 'noun-pair',
    sonkeigo: 'お宅 (おたく)',
    kenjougo: '自宅 (じたく) / 拙宅 (せったく)',
    nuanceNote: 'Menyebut rumah lawan bicara: "お宅". Menyebut rumah sendiri: "自宅".',
    example: {
      jp: '明日、お宅へお伺いしてもよろしいでしょうか。',
      reading: 'あす、おたくへおうかがいしてもよろしいでしょうか。',
      id: 'Bolehkah besok saya berkunjung ke kediaman rumah Anda?',
    },
  },
];

// ══════════════════════════════════════════════════════════════════
// 3. REQUEST LADDER HIERARCHY (TANGGA PERMOHONAN BISNIS)
// ══════════════════════════════════════════════════════════════════

export const REQUEST_LADDER: RequestLadderTier[] = [
  {
    id: 'req-casual',
    tier: 'casual',
    label: 'Level 1: Permohonan Standar / Kasual',
    pattern: '〜てください',
    level: 1,
    targetAudience: 'Rekan kerja setara / tim internal akrab',
    idExplanation: 'Bentuk dasar permohonan. Tepat untuk instruksi rutin antar kolega sejajar. Namun jangan gunakan ke atasan atau klien karena masih terdengar seperti "arahan/perintah halus".',
    example: {
      jp: 'この数字を確認してください。',
      reading: 'このすうじをかくにんしてください。',
      id: 'Tolong cek angka ini ya (antar rekan satu tim).',
    },
  },
  {
    id: 'req-polite',
    tier: 'polite',
    label: 'Level 2: Permohonan Sopan Standar Bisnis',
    pattern: '〜ていただけますか / 〜てくださいませんか',
    level: 2,
    targetAudience: 'Atasan langsung, klien baru, lawan bicara formal',
    idExplanation: 'Secara harfiah berarti "Bisa kah saya menerima kebaikan Anda untuk melakukan...". Menggeser fokus dari memberi perintah menjadi memohon kebaikan hati lawan bicara.',
    example: {
      jp: '企画書を一読していただけますか。',
      reading: 'きかくしょをいちどくしていただけますか。',
      id: 'Sudikah Bapak/Ibu berkenan membaca proposal ini sebentar?',
    },
  },
  {
    id: 'req-formal',
    tier: 'formal',
    label: 'Level 3: Permohonan Sangat Hormat & Berbantalan (Cushioned)',
    pattern: '〜ていただけますでしょうか / 〜ていただけないでしょうか',
    level: 3,
    targetAudience: 'Klien VIP, Direksi, Permohonan yang merepotkan / ganti jadwal',
    idExplanation: 'Memakai bentuk pengandaian "でしょうか" (apakah sekiranya memungkinkan). Ini adalah standar emas email bisnis saat kita meminta perubahan mendadak atau bantuan yang merepotkan.',
    example: {
      jp: '誠に恐れ入りますが、日程を変更していただけますでしょうか。',
      reading: 'まことにそれいりますが、にっていをへんこうしていただけますでしょうか。',
      id: 'Sungguh mohon maaf sebesar-besarnya, apakah sekiranya memungkinkan bila tanggal pertemuannya diubah?',
    },
  },
  {
    id: 'req-supreme',
    tier: 'supreme',
    label: 'Level 4: Bahasa Surat Resmi & Email Eksekutif',
    pattern: '〜のほどよろしくお願い申し上げます',
    level: 4,
    targetAudience: 'Penutupan email resmi, surat permohonan dinas, kontrak',
    idExplanation: 'Kalimat pamungkas penutup komunikasi bisnis Jepang yang merendahkan diri serendah-rendahnya sembari memohon kerja sama yang berkah.',
    example: {
      jp: '何卒ご高配のほどよろしくお願い申し上げます。',
      reading: 'なにとぞごこうはいのほどよろしくおねがいもうしあげます。',
      id: 'Dengan segala kerendahan hati kami memohon perhatian dan kerja sama terbaik dari Bapak/Ibu.',
    },
  },
];

// ══════════════════════════════════════════════════════════════════
// 4. REALISTIC WORKPLACE & SSW SCENARIOS (LATIHAN SKENARIO KERJA)
// ══════════════════════════════════════════════════════════════════

export const KEIGO_SCENARIO_BANK: KeigoScenario[] = [
  // --- CUSTOMER SERVICE & TOKUTEI GINOU ---
  {
    id: 'sc-cs-01',
    category: 'customer-service',
    categoryLabel: 'Pelayanan Tamu / Kasir',
    setting: 'Anda bekerja di toko buku / restoran Jepang. Seorang pelanggan sedang melihat-lihat buku katalog di rak.',
    otherParty: 'Pelanggan yang sedang melihat barang',
    role: 'Staf Layanan',
    actorIsSelf: false,
    targetRegister: 'sonkeigo',
    promptCue: 'Tindakan pelanggan yang sedang "melihat" (見る) harus diubah ke bentuk hormat yang tepat.',
    options: [
      {
        text: 'ご覧になっています',
        reading: 'ごらんになっています',
        isCorrect: true,
        feedback: 'Tepat sekali! Tindakan pelanggan (pihak luar yang dihormati) menggunakan Sonkeigo dari 見る yaitu "ご覧になる".',
      },
      {
        text: '拝見しています',
        reading: 'はいけんしています',
        isCorrect: false,
        feedback: 'Salah! "拝見する" adalah Kenjougo (merendahkan diri sendiri). Jangan gunakan untuk tindakan pelanggan.',
      },
      {
        text: 'お見になっています',
        reading: 'おみになっています',
        isCorrect: false,
        feedback: 'Salah! "見る" memiliki bentuk irregular khusus "ご覧になる". Pola regular "お見になる" tidak baku dalam bahasa Jepang.',
      },
    ],
    explanation: 'Pelanggan adalah pihak yang ditinggikan derajatnya (Soto). Tindakan pelanggan melihat barang selalu menggunakan Sonkeigo "ご覧になる".',
    difficulty: 'pemula',
    flipCase: false,
    audioPhrase: 'お客様が新刊をご覧になっています。',
  },
  {
    id: 'sc-cs-02',
    category: 'customer-service',
    categoryLabel: 'Pelayanan Tamu / Resepsionis',
    setting: 'Pelanggan menanyakan lokasi ruang pertemuan, dan Anda menawarkan diri untuk mengantar/memandu pelanggan tersebut ke ruangan.',
    otherParty: 'Pelanggan di meja informasi',
    role: 'Resepsionis',
    actorIsSelf: true,
    targetRegister: 'kenjougo',
    promptCue: 'Tindakan Anda sendiri yang "memandu" (案内する) untuk pelanggan harus diungkapkan secara rendah hati.',
    options: [
      {
        text: 'ご案内いたします',
        reading: 'ごあんないいたします',
        isCorrect: true,
        feedback: 'Benar! Tindakan Anda sendiri untuk tamu diungkapkan dengan Kenjougo "ご + Kango + いたす / する".',
      },
      {
        text: 'ご案内なさいます',
        reading: 'ごあんないなさいます',
        isCorrect: false,
        feedback: 'Salah! "ご案内なさる" adalah Sonkeigo (menghormati orang lain). Anda tidak boleh menghormati tindakan diri sendiri.',
      },
      {
        text: '案内してあげます',
        reading: 'あんないしてあげます',
        isCorrect: false,
        feedback: 'Sangat tidak sopan! "〜てあげる" terkesan merendahkan atau merasa berjasa kepada pelanggan.',
      },
    ],
    explanation: 'Karena ini adalah tindakan diri kita sendiri yang ditujukan demi kenyamanan tamu, gunakan Kenjougo "ご案内いたします".',
    difficulty: 'pemula',
    flipCase: false,
    audioPhrase: '会議室までご案内いたします。どうぞこちらへ。',
  },

  // --- WORKPLACE UCHI/SOTO FLIP (JEBAKAN TERBESAR UJIAN & KANTOR) ---
  {
    id: 'sc-wp-01',
    category: 'workplace',
    categoryLabel: 'Komunikasi Internal Kantor',
    setting: 'Anda sedang berbicara dengan rekan kerja satu tim (sejajar). Anda memberitahu dia bahwa Manajer Divisi (Bucho) akan datang ke kantor hari ini.',
    otherParty: 'Rekan kerja satu tim (rekan sejajar)',
    role: 'Staf Kantor',
    actorIsSelf: false,
    targetRegister: 'sonkeigo',
    promptCue: 'Bagaimana menyebut tindakan atasan (来る) saat berbicara dengan rekan satu kantor?',
    options: [
      {
        text: '部長は本日いらっしゃいます',
        reading: 'ぶちょうはほんじついらっしゃいます',
        isCorrect: true,
        feedback: 'Tepat! Sesama anggota kantor, atasan memiliki derajat lebih tinggi dari Anda berdua, sehingga tindakan atasan mendapat Sonkeigo "いらっしゃる".',
      },
      {
        text: '部長は本日参ります',
        reading: 'ぶちょうはほんじつまいります',
        isCorrect: false,
        feedback: 'Salah! "参る" adalah Kenjougo. Jangan merendahkan atasan sendiri di hadapan sesama rekan kantor.',
      },
      {
        text: '部長は本日来られます',
        reading: 'ぶちょうはほんじつこられます',
        isCorrect: false,
        feedback: 'Bentuk pasif kehormatan (れる/られる) bisa dipakai, tapi "いらっしゃる" adalah bentuk Sonkeigo irregular tertinggi dan paling baku.',
      },
    ],
    explanation: 'Di dalam lingkaran internal (Uchi), hierarki kantor berlaku normal: staf menghormati manajer dengan Sonkeigo "いらっしゃる".',
    difficulty: 'menengah',
    flipCase: false,
    audioPhrase: '部長は本日10時にオフィスへいらっしゃいます。',
  },
  {
    id: 'sc-wp-02',
    category: 'workplace',
    categoryLabel: 'Kantor: Uchi-Soto Flip (Paling Krusial)',
    setting: 'Sekarang Anda sedang berbicara dengan KLIEN dari perusahaan lain (pihak luar / Soto). Anda memberitahu klien tersebut bahwa Manajer Divisi Anda (Bucho) akan hadir di rapat.',
    otherParty: 'Klien dari luar perusahaan',
    role: 'Staf Kantor',
    actorIsSelf: false,
    targetRegister: 'kenjougo',
    promptCue: 'Pelaku tindakan tetap Manajer Anda (orang yang sama seperti sc-wp-01), tetapi siapa lawan bicaranya sekarang? Pilih bentuk yang tepat!',
    options: [
      {
        text: '部長の田中は本日参ります',
        reading: 'ぶちょうのたなかはほんじつまいります',
        isCorrect: true,
        feedback: 'LUAR BIASA! Inilah "Uchi-Soto Flip". Di hadapan orang luar, semua orang di kantor kita (termasuk manajer dan presiden direktur) dianggap satu kelompok (Uchi), sehingga tindakannya harus direndahkan dengan Kenjougo "参る" dan tanpa gelar honorifik -san!',
      },
      {
        text: '田中部長は本日いらっしゃいます',
        reading: 'たなかぶちょうはほんじついらっしゃいます',
        isCorrect: false,
        feedback: 'Jebakan maut! Jika Anda memakai Sonkeigo "いらっしゃる" untuk bos Anda di depan klien, Anda dianggap tidak sopan karena memuji kelompok sendiri di hadapan pihak luar.',
      },
      {
        text: '田中部長様がお越しになります',
        reading: 'たなかぶちょうさまがおこしになります',
        isCorrect: false,
        feedback: 'Sangat keliru ganda! Jangan tambahkan "-sama" untuk manajer sendiri di depan klien, dan jangan pakai Sonkeigo.',
      },
    ],
    explanation: 'Konsep Uchi/Soto: Ketika berbicara dengan pihak luar (Soto), seluruh anggota perusahaan kita menjadi "Uchi". Kita merendahkan diri kita dan atasan kita demi menghormati mitra bisnis.',
    difficulty: 'mahir',
    flipCase: true,
    audioPhrase: '弊社の田中は間もなくそちらへ参ります。',
  },

  // --- TELEPHONE ETIQUETTE ---
  {
    id: 'sc-ph-01',
    category: 'phone',
    categoryLabel: 'Etiket Telepon Kantor',
    setting: 'Telepon kantor berdering dari klien luar. Klien ingin berbicara dengan Kepala Seksi Anda (Kacho Yamada), tapi Pak Yamada sedang keluar makan siang.',
    otherParty: 'Penelepon dari luar kantor',
    role: 'Penerima Telepon',
    actorIsSelf: false,
    targetRegister: 'kenjougo',
    promptCue: 'Bagaimana menyampaikan bahwa Pak Yamada sedang tidak ada di tempat?',
    options: [
      {
        text: '山田はただいま席を外しております',
        reading: 'やまだはただいませきをはずしております',
        isCorrect: true,
        feedback: 'Sempurna! Sebut nama atasan tanpa gelar (山田) dan gunakan Kenjougo dari いる yaitu "おる" (おります).',
      },
      {
        text: '山田課長はただいま席を外していらっしゃいません',
        reading: 'やまだかちょうはただいませきをはずしていらっしゃいません',
        isCorrect: false,
        feedback: 'Salah! Jangan beri gelar "課長" di depan orang luar, dan jangan gunakan "いらっしゃる" untuk atasan sendiri.',
      },
      {
        text: '山田さんはお昼ご飯を食べています',
        reading: 'やまださんはおひるごはんをたべています',
        isCorrect: false,
        feedback: 'Tidak profesional! Jangan sebut "-san" untuk orang kantor sendiri di depan klien, dan jangan beberkan alasan makan siang secara kasual.',
      },
    ],
    explanation: 'Dalam etiket telepon Jepang: Atasan kantor disebut nama marga saja tanpa suffix (山田), status ketiadaan disebut "席を外しております" (sedang meninggalkan meja kerja).',
    difficulty: 'mahir',
    flipCase: true,
    audioPhrase: '申し訳ございません。山田はただいま席を外しております。',
  },
  {
    id: 'sc-ph-02',
    category: 'phone',
    categoryLabel: 'Etiket Telepon: Bertanya Balik',
    setting: 'Anda perlu menanyakan identitas dan nama perusahaan penelepon yang suaranya kurang jelas.',
    otherParty: 'Penelepon misterius / kurang jelas',
    role: 'Penerima Telepon',
    actorIsSelf: false,
    targetRegister: 'sonkeigo',
    promptCue: 'Bagaimana kalimat bertanya yang paling sopan dan santun?',
    options: [
      {
        text: '恐れ入りますが、お名前をもう一度お伺いできますでしょうか',
        reading: 'おそれいりますが、おなまえをもういちどおうかがいできますでしょうか',
        isCorrect: true,
        feedback: 'Tepat sekali! Menggunakan bantalan "恐れ入りますが" + "お名前" + "お伺いできますでしょうか" (sangat santun dan tidak menyinggung penelepon).',
      },
      {
        text: 'すいませんが、誰ですか',
        reading: 'すいませんが、だれですか',
        isCorrect: false,
        feedback: 'Sangat kasar dan dilarang keras dalam lingkungan kerja profesional.',
      },
      {
        text: 'もしもし、聞こえません',
        reading: 'もしもし、きこえません',
        isCorrect: false,
        feedback: 'Kata "もしもし" pantang digunakan dalam telepon bisnis kantor profesional.',
      },
    ],
    explanation: 'Gunakan frasa pembuka "恐れ入りますが" (mohon maaf sebesar-besarnya atas kelancangan saya) sebelum meminta orang lain mengulang nama mereka.',
    difficulty: 'menengah',
    flipCase: false,
    audioPhrase: '大変恐れ入りますが、お名前をもう一度お伺いできますでしょうか。',
  },

  // --- BUSINESS EMAIL ---
  {
    id: 'sc-em-01',
    category: 'email',
    categoryLabel: 'Email Bisnis',
    setting: 'Anda membalas email klien untuk melampirkan berkas penawaran harga (inquiry).',
    otherParty: 'Klien penerima email',
    role: 'Penulis Email',
    actorIsSelf: true,
    targetRegister: 'kenjougo',
    promptCue: 'Bagaimana kalimat mengabarkan bahwa Anda telah mengirimkan berkas?',
    options: [
      {
        text: '見積書をメールにてお送りいたしましたので、ご査収ください',
        reading: 'みつもりしょをめーるにておおくりいたしましたので、ごさしゅうください',
        isCorrect: true,
        feedback: 'Sangat formal dan profesional! "お送りいたしました" (Kenjougo dari 送る) + "ご査収ください" (mohon periksa dan terima baik-baik berkas terlampir).',
      },
      {
        text: '見積書を送ったので、読んでください',
        reading: 'みつもりしょをおくったので、よんでください',
        isCorrect: false,
        feedback: 'Terlalu kasual dan tidak pantas untuk komunikasi bisnis dengan pihak luar.',
      },
      {
        text: '見積書をお送りになられました',
        reading: 'みつもりしょをおおくりになられました',
        isCorrect: false,
        feedback: 'Salah total! Anda menggunakan Sonkeigo berlebihan (二重敬語) pada tindakan Anda sendiri.',
      },
    ],
    explanation: 'Dalam email pengiriman berkas, tindakan diri kita mengirim menggunakan "お送りいたしました" (Kenjougo).',
    difficulty: 'menengah',
    flipCase: false,
    audioPhrase: '見積書をお送りいたしましたので、ご確認のほどよろしくお願い申し上げます。',
  },

  // --- SSW TOKUTEI GINOU (KAIGO / CARE WORKER) ---
  {
    id: 'sc-ssw-01',
    category: 'ssw-tokutei',
    categoryLabel: 'SSW Kaigo (Perawatan Lansia)',
    setting: 'Anda bertugas di panti lansia (Kaigo). Waktunya makan siang tiba, dan Anda hendak mempersilakan lansia binaan (Riyousha-san) untuk menyantap makanan.',
    otherParty: 'Lansia binaan (Riyousha-san)',
    role: 'Caregiver SSW',
    actorIsSelf: false,
    targetRegister: 'sonkeigo',
    promptCue: 'Ungkapan apa yang penuh rasa hormat dan hangat untuk mempersilakan lansia makan?',
    options: [
      {
        text: 'どうぞ召し上がってください',
        reading: 'どうぞめしあがってください',
        isCorrect: true,
        feedback: 'Luar biasa! Lansia dalam fasilitas Kaigo dihormati layaknya pelanggan kehormatan, sehingga tindakan makan memakai "召し上がる".',
      },
      {
        text: 'どうぞいただいてください',
        reading: 'どうぞいただいてください',
        isCorrect: false,
        feedback: 'Keliru! "いただく" adalah Kenjougo (merendahkan diri sendiri), tidak bisa disambung dengan "-てください" untuk menyuruh orang lain.',
      },
      {
        text: '早く食べてね',
        reading: 'はやくたべてね',
        isCorrect: false,
        feedback: 'Dilarang dalam etiket Kaigo! Bicara seperti ke anak kecil (Tameguchi) kepada lansia dianggap melanggar martabat lansia.',
      },
    ],
    explanation: 'Dalam standar SSW Kaigo, lansia adalah subjek yang wajib dihormati martabatnya. Gunakan Sonkeigo "召し上がる" secara hangat.',
    difficulty: 'pemula',
    flipCase: false,
    audioPhrase: '温かいうちに、どうぞ召し上がってくださいね。',
  },
];

// ══════════════════════════════════════════════════════════════════
// 5. BUSINESS ETIQUETTE & REAL-WORLD PITFALLS (FAKTA & JEBAKAN NYATA)
// ══════════════════════════════════════════════════════════════════

export const BUSINESS_ETIQUETTE_NOTES: BusinessEtiquetteNote[] = [
  {
    id: 'et-01',
    title: '了解しました vs かしこまりました / 承知いたしました',
    status: 'Kontekstual (Debated)',
    textbookTaught: 'Banyak buku teks mengajarkan "了解しました" sebagai ucapan standar "dimengerti/siap".',
    workplaceReality: 'Di dunia kerja tradisional Jepang, kata 了解 (ryoukai) dianggap kurang memiliki unsur perendahan diri. Mengatakan 了解しました kepada atasan atau klien dianggap kurang ajar oleh sebagian senior. Gunakan "承知いたしました" (shouchi itashimashita) atau "かしこまりました" (kashikomarimashita).',
    sswPracticalTip: 'Saat diperintah atasan di tempat kerja Jepang (SSW/Pabrik/Kaigo), jawaban paling aman 100% adalah: 「承知いたしました！」 atau 「かしこまりました！」.',
  },
  {
    id: 'et-02',
    title: 'ご苦労様 vs お疲れ様',
    status: 'Sudah Baku (Settled)',
    textbookTaught: 'Keduanya diajarkan sebagai ungkapan terima kasih atas kerja keras seseorang.',
    workplaceReality: 'HUKUM MUTLAK: "ご苦労様" (gokurousama) HANYA boleh diucapkan dari ATASAN kepada BAWAHAN. Jika bawahan mengucapkannya ke atasan, itu dianggap menghina/merendahkan atasan. Bawahan ke atasan WAJIB menggunakan "お疲れ様です" (otsukaresama desu).',
    sswPracticalTip: 'Saat berpapasan dengan supervisor atau manajer di lorong kerja, selalu ucapkan: 「お疲れ様です！」.',
  },
  {
    id: 'et-03',
    title: 'Wabah Overuse "〜させていただきます"',
    status: 'Kontekstual (Debated)',
    textbookTaught: 'Bentuk humble untuk "Izinkan saya melakukan sesuatu dengan kerendahan hati".',
    workplaceReality: 'Banyak pembelajar asing dan pekerja muda menempelkan させていただきます di setiap kalimat (misal: "休みを取らさせていただきます"). Jika tidak ada unsur meminta izin kepada lawan bicara, hal ini dinilai lebay (kudoi) oleh para editor gaya bahasa Jepang.',
    sswPracticalTip: 'Gunakan bentuk Kenjougo normal yang lebih ringkas seperti: 「休ませていただきます」 atau 「〜いたします」.',
  },
  {
    id: 'et-04',
    title: 'Pantangan Kata "もしもし" dalam Telepon Kantor',
    status: 'Sudah Baku (Settled)',
    textbookTaught: '"もしもし" diajarkan sejak bab pertama sebagai halo telepon.',
    workplaceReality: 'Di kantor atau tempat bisnis Jepang, kata "もしもし" 100% dilarang saat mengangkat telepon kantor resmi! Mengangkat telepon bisnis dimulai dengan menyebut nama perusahaan/divisi dan salam: 「はい、〇〇株式会社でございます」 atau 「お電話ありがとうございます」.',
    sswPracticalTip: 'Simpan kata "もしもし" hanya untuk telepon pribadi dengan teman atau keluarga.',
  },
  {
    id: 'et-05',
    title: 'Peningkatan Register: です vs でございます',
    status: 'Sudah Baku (Settled)',
    textbookTaught: '"です" diajarkan sebagai kopula sopan universal.',
    workplaceReality: 'Dalam layanan pelanggan, perhotelan, restoran bintang lima, dan percakapan dengan mitra eksekutif, kata "です" ditingkatkan menjadi "でございます". Contoh: "田中です" menjadi "田中でございます".',
    sswPracticalTip: 'Saat mengenalkan diri di awal wawancara kerja Jepang atau telepon: 「私、インドネシアのアディと申します。どうぞよろしくお願い申し上げます」.',
  },
];
