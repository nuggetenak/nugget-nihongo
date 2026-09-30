const fs = require('fs');
const path = require('path');

const VALID_TAGS = new Set([
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

const EXAMPLES_DATA = {
  // ────────────────────────────────────────────────────────────
  // 5 EXPRESSIONS
  // ────────────────────────────────────────────────────────────
  'vg-n4-00387': [ // 〜くらい
    {
      jp: 'ここから駅まで歩いて十分くらいかかります。',
      id: 'Dari sini ke stasiun butuh waktu sekitar sepuluh menit jalan kaki.',
      level: 'n4',
      tags: ['kehidupan-sehari', 'ruang-arah']
    },
    {
      jp: 'リンゴを三つくらい買ってきてください。',
      id: 'Tolong belikan sekitar tiga buah apel.',
      level: 'n4',
      tags: ['belanja', 'makanan-minuman']
    }
  ],
  'vg-n4-00393': [ // 〜ずつ
    {
      jp: '一人にプリントを二枚ずつ配ってください。',
      id: 'Tolong bagikan lembar cetakan masing-masing dua lembar kepada setiap orang.',
      level: 'n4',
      tags: ['pendidikan', 'pekerjaan']
    },
    {
      jp: '毎日少しずつ新しい言葉を覚えています。',
      id: 'Setiap hari saya mengingat kata-kata baru sedikit demi sedikit.',
      level: 'n4',
      tags: ['pendidikan']
    }
  ],
  'vg-n4-00404': [ // 〜でございます
    {
      jp: 'こちらが本日のおすすめ料理でございます。',
      id: 'Ini adalah hidangan rekomendasi untuk hari ini.',
      level: 'n4',
      tags: ['makanan-minuman', 'pekerjaan']
    },
    {
      jp: 'お電話ありがとうございます。田中商事でございます。',
      id: 'Terima kasih telah menelepon. Ini adalah Tanaka Corporation.',
      level: 'n4',
      tags: ['pekerjaan']
    }
  ],
  'vg-n4-00414': [ // 〜やすい
    {
      jp: 'この辞書は説明が分かりやすくて役に立ちます。',
      id: 'Kamus ini penjelasannya mudah dipahami dan bermanfaat.',
      level: 'n4',
      tags: ['pendidikan']
    },
    {
      jp: 'この靴は軽くてとても歩きやすいです。',
      id: 'Sepatu ini ringan dan sangat nyaman serta mudah untuk dipakai berjalan.',
      level: 'n4',
      tags: ['belanja', 'kehidupan-sehari']
    }
  ],
  'vg-n4-00415': [ // 〜にくい
    {
      jp: 'この薬は苦いので少し飲みにくいです。',
      id: 'Obat ini agak sulit diminum karena rasanya pahit.',
      level: 'n4',
      tags: ['kesehatan', 'kehidupan-sehari']
    },
    {
      jp: '雨の日は道が滑りやすくて歩きにくいです。',
      id: 'Pada hari hujan jalannya licin sehingga sulit untuk berjalan.',
      level: 'n4',
      tags: ['alam-lingkungan', 'kehidupan-sehari']
    }
  ],

  // ────────────────────────────────────────────────────────────
  // 9 ADVERBS
  // ────────────────────────────────────────────────────────────
  'vg-n4-00141': [ // 直接
    {
      jp: '大切な用事なので、直接会って話したいです。',
      id: 'Karena urusan penting, saya ingin bertemu dan berbicara langsung.',
      level: 'n4',
      tags: ['pertemanan', 'kehidupan-sehari']
    },
    {
      jp: '質問がある場合は、先生に直接聞いてください。',
      id: 'Jika ada pertanyaan, silakan bertanya langsung kepada guru.',
      level: 'n4',
      tags: ['pendidikan']
    }
  ],
  'vg-n4-00241': [ // もうすぐ
    {
      jp: 'もうすぐ電車が来ますから、並んで待ちましょう。',
      id: 'Karena sebentar lagi keretanya datang, mari kita antre menunggu.',
      level: 'n4',
      tags: ['kehidupan-sehari', 'waktu']
    },
    {
      jp: 'もうすぐ桜の季節が始まりますね。',
      id: 'Sebentar lagi musim bunga sakura akan dimulai, ya.',
      level: 'n4',
      tags: ['alam-lingkungan', 'waktu']
    }
  ],
  'vg-n4-00253': [ // だいぶ
    {
      jp: '薬を飲んだので、熱がだいぶ下がりました。',
      id: 'Karena sudah minum obat, demam saya sudah cukup banyak turun.',
      level: 'n4',
      tags: ['kesehatan']
    },
    {
      jp: '日本の生活にもだいぶ慣れてきました。',
      id: 'Saya sudah cukup terbiasa dengan kehidupan di Jepang.',
      level: 'n4',
      tags: ['kehidupan-sehari']
    }
  ],
  'vg-n4-00259': [ // せっかく
    {
      jp: 'せっかく日本に来たので、富士山に登りたいです。',
      id: 'Karena sudah jauh-jauh datang ke Jepang, saya ingin mendaki Gunung Fuji.',
      level: 'n4',
      tags: ['kehidupan-sehari']
    },
    {
      jp: 'せっかく料理を作ったのに、弟は食べませんでした。',
      id: 'Padahal saya sudah susah payah memasak makanan, adik laki-laki saya tidak memakannya.',
      level: 'n4',
      tags: ['keluarga', 'makanan-minuman']
    }
  ],
  'vg-n4-00261': [ // しばらく
    {
      jp: '会議室の前でしばらくお待ちください。',
      id: 'Silakan menunggu beberapa saat di depan ruang rapat.',
      level: 'n4',
      tags: ['pekerjaan', 'waktu']
    },
    {
      jp: '疲れたので、ベンチに座ってしばらく休みましょう。',
      id: 'Karena lelah, mari duduk di bangku dan beristirahat sebentar.',
      level: 'n4',
      tags: ['kehidupan-sehari', 'waktu']
    }
  ],
  'vg-n4-00322': [ // ワクワク
    {
      jp: '明日から旅行なのでワクワクしています。',
      id: 'Saya merasa bersemangat dan tidak sabar karena besok mulai bepergian.',
      level: 'n4',
      tags: ['kehidupan-sehari']
    },
    {
      jp: 'どんなプレゼントをもらえるかワクワクしながら待ちました。',
      id: 'Saya menunggu sambil berdebar-debar gembira memikirkan hadiah apa yang akan didapat.',
      level: 'n4',
      tags: ['pertemanan', 'kehidupan-sehari']
    }
  ],
  'vg-n4-00498': [ // 大体
    {
      jp: '試験の準備は大体終わったので安心しました。',
      id: 'Persiapan untuk ujian kira-kira sudah selesai sehingga saya merasa tenang.',
      level: 'n4',
      tags: ['pendidikan']
    },
    {
      jp: '今日の講義の内容は大体理解できました。',
      id: 'Isi materi kuliah hari ini secara garis besar bisa saya pahami.',
      level: 'n4',
      tags: ['pendidikan']
    }
  ],
  'vg-n4-00499': [ // 大分
    {
      jp: '毎朝走るようになってから、体が大分軽くなりました。',
      id: 'Sejak mulai berlari setiap pagi, tubuh saya terasa jauh lebih ringan.',
      level: 'n4',
      tags: ['kesehatan', 'kehidupan-sehari']
    },
    {
      jp: '夕方になって、外の気温が大分下がってきました。',
      id: 'Menjelang sore hari, suhu udara di luar sudah cukup banyak menurun.',
      level: 'n4',
      tags: ['alam-lingkungan', 'waktu']
    }
  ],
  'vg-n4-00562': [ // とうとう
    {
      jp: '長い間使っていた自転車がとうとう壊れてしまいました。',
      id: 'Sepeda yang sudah lama saya pakai akhirnya rusak juga.',
      level: 'n4',
      tags: ['kehidupan-sehari']
    },
    {
      jp: '一生懸命練習して、とうとう試合に勝ちました。',
      id: 'Setelah berlatih sungguh-sungguh, akhirnya kami memenangkan pertandingan.',
      level: 'n4',
      tags: ['pendidikan']
    }
  ],

  // ────────────────────────────────────────────────────────────
  // 54 ADJECTIVES
  // ────────────────────────────────────────────────────────────
  'vg-n4-00074': [ // 痛い
    {
      jp: '昨日から歯が痛いので、歯医者に行きます。',
      id: 'Karena sejak kemarin gigi saya sakit, saya akan pergi ke dokter gigi.',
      level: 'n4',
      tags: ['kesehatan']
    },
    {
      jp: '重い荷物を持って腕が痛くなりました。',
      id: 'Lengan saya menjadi sakit karena mengangkat barang bawaan berat.',
      level: 'n4',
      tags: ['kesehatan', 'kehidupan-sehari']
    }
  ],
  'vg-n4-00138': [ // 変な
    {
      jp: '夜中に外から変な音が聞こえて目が覚めました。',
      id: 'Saya terbangun karena mendengar suara aneh dari luar di tengah malam.',
      level: 'n4',
      tags: ['kehidupan-sehari']
    },
    {
      jp: 'このスープは少し変な味がします。',
      id: 'Sup ini rasanya agak aneh.',
      level: 'n4',
      tags: ['makanan-minuman']
    }
  ],
  'vg-n4-00185': [ // 様々な
    {
      jp: 'このデパートには様々な国の商品が並んでいます。',
      id: 'Di toserba ini berjejer barang-barang dari berbagai negara.',
      level: 'n4',
      tags: ['belanja']
    },
    {
      jp: '大学で様々な分野の専門知識を学びたいです。',
      id: 'Saya ingin mempelajari pengetahuan khusus dari berbagai bidang di universitas.',
      level: 'n4',
      tags: ['pendidikan']
    }
  ],
  'vg-n4-00187': [ // うれしい
    {
      jp: '友達から誕生日のプレゼントをもらってとてもうれしいです。',
      id: 'Saya sangat gembira mendapat hadiah ulang tahun dari teman.',
      level: 'n4',
      tags: ['pertemanan', 'kehidupan-sehari']
    },
    {
      jp: '試験に合格できて、家族みんなでうれしい涙を流しました。',
      id: 'Bisa lulus ujian, kami sekeluarga meneteskan air mata bahagia.',
      level: 'n4',
      tags: ['keluarga', 'pendidikan']
    }
  ],
  'vg-n4-00188': [ // かなしい
    {
      jp: 'かわいがっていた犬が死んでしまって本当にかなしいです。',
      id: 'Saya sungguh sedih karena anjing kesayangan saya telah tiada.',
      level: 'n4',
      tags: ['keluarga', 'kehidupan-sehari']
    },
    {
      jp: '映画の最後の場面を見て、かなしい気持ちになりました。',
      id: 'Melihat adegan terakhir film itu, perasaan saya menjadi sedih.',
      level: 'n4',
      tags: ['kehidupan-sehari']
    }
  ],
  'vg-n4-00189': [ // はずかしい
    {
      jp: 'みんなの前で名前を間違えられてはずかしかったです。',
      id: 'Saya merasa malu karena salah dipanggil nama di depan semua orang.',
      level: 'n4',
      tags: ['pendidikan', 'kehidupan-sehari']
    },
    {
      jp: '服を裏返しに着ていて、とてもはずかしい思いをしました。',
      id: 'Saya memakai baju terbalik dan merasa sangat malu.',
      level: 'n4',
      tags: ['kehidupan-sehari']
    }
  ],
  'vg-n4-00190': [ // うらやましい
    {
      jp: '夏休みにハワイへ旅行に行く友達がうらやましいです。',
      id: 'Saya iri kepada teman yang pergi berlibur ke Hawaii saat liburan musim panas.',
      level: 'n4',
      tags: ['pertemanan']
    },
    {
      jp: '彼は何でも上手にできて本当にうらやましいです。',
      id: 'Dia bisa melakukan apa pun dengan mahir, sungguh membuat iri.',
      level: 'n4',
      tags: ['pertemanan', 'pekerjaan']
    }
  ],
  'vg-n4-00191': [ // くわしい
    {
      jp: '彼はパソコンの機能についてとてもくわしいです。',
      id: 'Dia sangat menguasai fungsi-fungsi komputer secara terperinci.',
      level: 'n4',
      tags: ['pendidikan', 'pekerjaan']
    },
    {
      jp: '詳しい道順を紙に書いて教えてもらいました。',
      id: 'Saya meminta petunjuk jalan yang terperinci dituliskan di kertas.',
      level: 'n4',
      tags: ['ruang-arah', 'kehidupan-sehari']
    }
  ],
  'vg-n4-00192': [ // ひどい
    {
      jp: '雨と風がひどいので、今日は外出をやめましょう。',
      id: 'Karena hujan dan anginnya sangat buruk, mari kita urungkan keluar rumah hari ini.',
      level: 'n4',
      tags: ['alam-lingkungan', 'kehidupan-sehari']
    },
    {
      jp: 'ひどい風邪をひいて三日間会社を休みました。',
      id: 'Saya terkena flu parah dan tidak masuk kerja selama tiga hari.',
      level: 'n4',
      tags: ['kesehatan', 'pekerjaan']
    }
  ],
  'vg-n4-00193': [ // すっぱい
    {
      jp: 'このレモンはすっぱすぎて、そのまま食べられません。',
      id: 'Lemon ini terlalu asam sehingga tidak bisa dimakan langsung begitu saja.',
      level: 'n4',
      tags: ['makanan-minuman']
    },
    {
      jp: '疲れたときにすっぱい梅干しを食べると元気になります。',
      id: 'Saat lelah, memakan umeboshi yang asam membuat tubuh kembali berenergi.',
      level: 'n4',
      tags: ['makanan-minuman', 'kesehatan']
    }
  ],
  'vg-n4-00194': [ // かたい
    {
      jp: 'この肉は少し焼きすぎてかたくなってしまいました。',
      id: 'Daging ini agak terlalu lama dipanggang sehingga menjadi keras.',
      level: 'n4',
      tags: ['makanan-minuman']
    },
    {
      jp: 'このパンは古くなって石のようにかたいです。',
      id: 'Roti ini sudah lama dan menjadi keras seperti batu.',
      level: 'n4',
      tags: ['makanan-minuman']
    }
  ],
  'vg-n4-00195': [ // やわらかい
    {
      jp: '焼きたてのパンはとてもやわらかくておいしいです。',
      id: 'Roti yang baru matang sangat lembut dan lezat.',
      level: 'n4',
      tags: ['makanan-minuman']
    },
    {
      jp: 'この新しい枕はやわらかくて気持ちよく眠れます。',
      id: 'Bantal baru ini lembut sehingga saya bisa tidur dengan nyaman.',
      level: 'n4',
      tags: ['kehidupan-sehari']
    }
  ],
  'vg-n4-00196': [ // 太い
    {
      jp: 'このノートには太いペンで大きく名前を書いてください。',
      id: 'Tolong tulis nama dengan jelas menggunakan pulpen tebal pada buku catatan ini.',
      level: 'n4',
      tags: ['pendidikan']
    },
    {
      jp: '公園には幹がとても太い大きな木があります。',
      id: 'Di taman terdapat pohon besar dengan batang yang sangat tebal.',
      level: 'n4',
      tags: ['alam-lingkungan']
    }
  ],
  'vg-n4-00197': [ // 細い
    {
      jp: 'この道はとても細いので、車が通ることができません。',
      id: 'Karena jalan ini sangat sempit, mobil tidak bisa melintas.',
      level: 'n4',
      tags: ['kehidupan-sehari', 'ruang-arah']
    },
    {
      jp: '細い糸を使って丁寧にシャツのボタンを付けました。',
      id: 'Menggunakan benang tipis, saya memasang kancing kemeja dengan rapi.',
      level: 'n4',
      tags: ['kehidupan-sehari']
    }
  ],
  'vg-n4-00198': [ // ふかい
    {
      jp: 'このプールは水がふかいので、気をつけて泳いでください。',
      id: 'Karena air kolam renang ini dalam, tolong berenang dengan hati-hati.',
      level: 'n4',
      tags: ['kehidupan-sehari']
    },
    {
      jp: 'ふかい森の中に入ると、涼しい風が吹いていました。',
      id: 'Ketika masuk ke dalam hutan lebat yang dalam, angin sejuk berhembus.',
      level: 'n4',
      tags: ['alam-lingkungan']
    }
  ],
  'vg-n4-00199': [ // あさい
    {
      jp: 'この川はあさいですから、小さな子どもでも安全に渡れます。',
      id: 'Karena sungai ini dangkal, anak kecil pun dapat menyeberang dengan aman.',
      level: 'n4',
      tags: ['alam-lingkungan', 'kehidupan-sehari']
    },
    {
      jp: '池のあさい場所で小さな魚がたくさん泳いでいます。',
      id: 'Di tempat kolam yang dangkal, banyak ikan kecil berenang.',
      level: 'n4',
      tags: ['alam-lingkungan']
    }
  ],
  'vg-n4-00200': [ // めずらしい
    {
      jp: '近所の公園でめずらしい鳥を見つけて写真を撮りました。',
      id: 'Saya menemukan burung langka di taman dekat rumah lalu memotretnya.',
      level: 'n4',
      tags: ['alam-lingkungan', 'kehidupan-sehari']
    },
    {
      jp: '海外からめずらしい果物をお土産にもらいました。',
      id: 'Saya menerima buah langka dari luar negeri sebagai oleh-oleh.',
      level: 'n4',
      tags: ['makanan-minuman', 'pertemanan']
    }
  ],
  'vg-n4-00201': [ // なつかしい
    {
      jp: '高校の卒業アルバムを開くと、昔のことがなつかしいです。',
      id: 'Saat membuka album kelulusan SMA, saya merasa rindu masa lalu.',
      level: 'n4',
      tags: ['pendidikan', 'pertemanan']
    },
    {
      jp: '子供のころによく聴いた音楽がラジオから流れてなつかしいです。',
      id: 'Musik yang sering didengar saat masih anak-anak mengalun dari radio, terasa nostalgia.',
      level: 'n4',
      tags: ['kehidupan-sehari']
    }
  ],
  'vg-n4-00202': [ // おそろしい
    {
      jp: '昨夜はおそろしい夢を見て途中で目が覚めてしまいました。',
      id: 'Semalam saya bermimpi mengerikan dan terbangun di tengah malam.',
      level: 'n4',
      tags: ['kehidupan-sehari']
    },
    {
      jp: '大きな台風が近づいてきて、おそろしい風の音がします。',
      id: 'Angin topan besar mendekat dan terdengar suara angin yang menakutkan.',
      level: 'n4',
      tags: ['alam-lingkungan']
    }
  ],
  'vg-n4-00203': [ // くやしい
    {
      jp: 'あと少しで試合に勝てたのに、負けてしまってくやしいです。',
      id: 'Padahal sedikit lagi menang, tetapi akhirnya kalah dan saya sangat kesal.',
      level: 'n4',
      tags: ['pendidikan', 'pertemanan']
    },
    {
      jp: '一生懸命勉強したのにテストの点数が悪くてくやしいです。',
      id: 'Padahal sudah belajar mati-matian, nilai ujian jelek sehingga saya merasa frustrasi.',
      level: 'n4',
      tags: ['pendidikan']
    }
  ],
  'vg-n4-00204': [ // たのしい
    {
      jp: '週末に家族と一緒に遊園地へ行ってたのしかったです。',
      id: 'Akhir pekan pergi ke taman hiburan bersama keluarga dan sangat menyenangkan.',
      level: 'n4',
      tags: ['keluarga', 'kehidupan-sehari']
    },
    {
      jp: 'クラスの友達とおしゃべりするのは毎日本当にたのしいです。',
      id: 'Mengobrol dengan teman-teman sekelas setiap hari benar-benar seru.',
      level: 'n4',
      tags: ['pertemanan', 'pendidikan']
    }
  ],
  'vg-n4-00205': [ // きびしい
    {
      jp: '山田先生は宿題の提出にとてもきびしいです。',
      id: 'Guru Yamada sangat ketat soal pengumpulan pekerjaan rumah.',
      level: 'n4',
      tags: ['pendidikan']
    },
    {
      jp: '父は礼儀にきびしい人ですが、本当はとても優しいです。',
      id: 'Ayah adalah orang yang tegas soal tata krama, tetapi sebenarnya sangat penyayang.',
      level: 'n4',
      tags: ['keluarga']
    }
  ],
  'vg-n4-00206': [ // 親切な
    {
      jp: '駅員さんが親切に行き方を教えてくれました。',
      id: 'Petugas stasiun dengan ramah memberitahu arah jalan kepada saya.',
      level: 'n4',
      tags: ['kehidupan-sehari']
    },
    {
      jp: '道に迷ったとき、親切な人に助けてもらいました。',
      id: 'Saat tersesat di jalan, saya dibantu oleh orang yang baik hati.',
      level: 'n4',
      tags: ['kehidupan-sehari', 'pertemanan']
    }
  ],
  'vg-n4-00207': [ // 丁寧な
    {
      jp: 'ホテルの店員はいつも丁寧な言葉づかいで話します。',
      id: 'Petugas hotel selalu berbicara dengan pilihan kata yang sopan.',
      level: 'n4',
      tags: ['pekerjaan']
    },
    {
      jp: '字をきれいに見せるために丁寧な文字を書く練習をしています。',
      id: 'Saya berlatih menulis huruf dengan teliti agar terlihat rapi.',
      level: 'n4',
      tags: ['pendidikan']
    }
  ],
  'vg-n4-00208': [ // 真剣な
    {
      jp: '学生たちは先生の説明を真剣な表情で聞いています。',
      id: 'Para siswa menyimak penjelasan guru dengan ekspresi serius.',
      level: 'n4',
      tags: ['pendidikan']
    },
    {
      jp: '将来の進路について両親と真剣な話し合いをしました。',
      id: 'Saya berdiskusi dengan serius bersama orang tua tentang rencana masa depan.',
      level: 'n4',
      tags: ['keluarga', 'pendidikan']
    }
  ],
  'vg-n4-00209': [ // 正直な
    {
      jp: '自分の失敗について正直な気持ちを話しました。',
      id: 'Saya menceritakan perasaan yang jujur mengenai kesalahan saya.',
      level: 'n4',
      tags: ['pertemanan', 'kehidupan-sehari']
    },
    {
      jp: '彼は嘘をつかない正直な人なので、みんなから信頼されています。',
      id: 'Karena dia orang jujur yang tidak berbohong, dia dipercaya oleh semua orang.',
      level: 'n4',
      tags: ['pekerjaan', 'pertemanan']
    }
  ],
  'vg-n4-00210': [ // 不思議な
    {
      jp: '森の中で見たこともない不思議な花を見つけました。',
      id: 'Saya menemukan bunga misterius yang belum pernah dilihat di tengah hutan.',
      level: 'n4',
      tags: ['alam-lingkungan']
    },
    {
      jp: '朝起きたら机の上に不思議な手紙が置いてありました。',
      id: 'Saat bangun pagi, ada sepucuk surat misterius diletakkan di atas meja.',
      level: 'n4',
      tags: ['kehidupan-sehari']
    }
  ],
  'vg-n4-00211': [ // 大事な
    {
      jp: 'パスポートは旅行の時にとても大事な書類です。',
      id: 'Paspor adalah dokumen yang sangat penting saat bepergian.',
      level: 'n4',
      tags: ['kehidupan-sehari']
    },
    {
      jp: '家族と過ごす時間は私にとって一番大事なものです。',
      id: 'Waktu yang dihabiskan bersama keluarga adalah hal yang paling berharga bagi saya.',
      level: 'n4',
      tags: ['keluarga']
    }
  ],
  'vg-n4-00212': [ // 必要な
    {
      jp: 'ビザを申請するために必要な書類を集めました。',
      id: 'Saya mengumpulkan dokumen-dokumen yang diperlukan untuk mengajukan visa.',
      level: 'n4',
      tags: ['kehidupan-sehari']
    },
    {
      jp: 'キャンプに行く前に必要な道具をメモして確認しました。',
      id: 'Sebelum pergi berkemah, saya mencatat dan memeriksa perlengkapan yang diperlukan.',
      level: 'n4',
      tags: ['kehidupan-sehari', 'belanja']
    }
  ],
  'vg-n4-00213': [ // 自由な
    {
      jp: '大学生になってから、自由な時間が増えました。',
      id: 'Sejak menjadi mahasiswa, waktu bebas saya bertambah.',
      level: 'n4',
      tags: ['pendidikan', 'waktu']
    },
    {
      jp: 'この授業では自由なテーマで作文を書いてもいいです。',
      id: 'Di kelas ini, boleh menulis karangan dengan topik yang bebas.',
      level: 'n4',
      tags: ['pendidikan']
    }
  ],
  'vg-n4-00214': [ // 危険な
    {
      jp: '夜遅くに一人で暗い道を歩くのは危険です。',
      id: 'Berjalan sendirian di jalan gelap saat larut malam adalah hal yang berbahaya.',
      level: 'n4',
      tags: ['kehidupan-sehari']
    },
    {
      jp: '台風の日は川の近くに行くのは非常に危険です。',
      id: 'Pada hari badai taifun, pergi ke dekat sungai sangat berbahaya.',
      level: 'n4',
      tags: ['alam-lingkungan', 'kesehatan']
    }
  ],
  'vg-n4-00215': [ // 得意な
    {
      jp: '姉は料理が得意なので、よくおいしいお菓子を作ってくれます。',
      id: 'Kakak perempuan saya pandai memasak, sehingga sering membuat kue yang enak.',
      level: 'n4',
      tags: ['keluarga', 'makanan-minuman']
    },
    {
      jp: '私は英語を話すことが得意なので、留学生を案内しました。',
      id: 'Karena saya mahir berbahasa Inggris, saya memandu mahasiswa asing.',
      level: 'n4',
      tags: ['pendidikan', 'pertemanan']
    }
  ],
  'vg-n4-00216': [ // 苦手な
    {
      jp: '私は辛い食べ物が苦手なので、カレーは甘口にします。',
      id: 'Saya tidak kuat makanan pedas, jadi saya memilih kari yang tidak pedas.',
      level: 'n4',
      tags: ['makanan-minuman']
    },
    {
      jp: '人前でスピーチをするのが苦手で緊張してしまいます。',
      id: 'Saya tidak pandai berpidato di depan umum dan sering merasa gugup.',
      level: 'n4',
      tags: ['pendidikan', 'pekerjaan']
    }
  ],
  'vg-n4-00217': [ // 複雑な
    {
      jp: 'この機械の使い方は複雑なので、マニュアルをよく読んでください。',
      id: 'Cara pengoperasian mesin ini rumit, jadi tolong baca buku panduan dengan saksama.',
      level: 'n4',
      tags: ['pekerjaan']
    },
    {
      jp: '東京の地下鉄は路線が複雑で迷いやすいです。',
      id: 'Jalur kereta bawah tanah Tokyo rumit sehingga mudah tersesat.',
      level: 'n4',
      tags: ['kehidupan-sehari', 'ruang-arah']
    }
  ],
  'vg-n4-00218': [ // 簡単な
    {
      jp: 'この料理は簡単な材料ですぐに作ることができます。',
      id: 'Hidangan ini bisa dibuat dengan cepat menggunakan bahan yang sederhana.',
      level: 'n4',
      tags: ['makanan-minuman']
    },
    {
      jp: '今日のテストは思ったより簡単な問題ばかりでした。',
      id: 'Ujian hari ini isinya soal-soal mudah di luar dugaan saya.',
      level: 'n4',
      tags: ['pendidikan']
    }
  ],
  'vg-n4-00219': [ // 便利な
    {
      jp: 'スマートフォンのアプリを使えば、買い物がとても便利になります。',
      id: 'Menggunakan aplikasi di ponsel pintar membuat berbelanja menjadi sangat praktis.',
      level: 'n4',
      tags: ['belanja', 'kehidupan-sehari']
    },
    {
      jp: '駅の近くに住んでいるので、通勤にとても便利な場所です。',
      id: 'Karena tinggal di dekat stasiun, lokasinya sangat praktis untuk berangkat bekerja.',
      level: 'n4',
      tags: ['pekerjaan', 'kehidupan-sehari']
    }
  ],
  'vg-n4-00220': [ // 不便な
    {
      jp: 'この町は近くにスーパーがなくて生活が不便です。',
      id: 'Kota ini tidak punya supermarket di dekatnya sehingga kehidupan terasa merepotkan.',
      level: 'n4',
      tags: ['kehidupan-sehari', 'belanja']
    },
    {
      jp: 'バスが１時間に１本しか来ないのでとても不便です。',
      id: 'Karena bus hanya datang satu jam sekali, transportasinya sangat tidak praktis.',
      level: 'n4',
      tags: ['kehidupan-sehari', 'waktu']
    }
  ],
  'vg-n4-00221': [ // 熱心な
    {
      jp: '彼女は日本語の勉強にとても熱心に取り組んでいます。',
      id: 'Dia berusaha dengan sangat bersemangat dalam belajar bahasa Jepang.',
      level: 'n4',
      tags: ['pendidikan']
    },
    {
      jp: '熱心な先生のおかげで、苦手な数学が好きになりました。',
      id: 'Berkat guru yang berdedikasi tinggi, saya jadi menyukai pelajaran matematika.',
      level: 'n4',
      tags: ['pendidikan']
    }
  ],
  'vg-n4-00222': [ // 丈夫な
    {
      jp: 'この革のかばんはとても丈夫で、十年以上使っています。',
      id: 'Tas kulit ini sangat kokoh dan sudah saya pakai lebih dari sepuluh tahun.',
      level: 'n4',
      tags: ['belanja', 'kehidupan-sehari']
    },
    {
      jp: '祖父は毎日散歩をしているので、今でも体が丈夫です。',
      id: 'Kakek setiap hari berjalan-jalan, sehingga badannya masih sehat dan kuat.',
      level: 'n4',
      tags: ['keluarga', 'kesehatan']
    }
  ],
  'vg-n4-00223': [ // 正確な
    {
      jp: '時計を見て、正確な時間をメモ帳に記入しました。',
      id: 'Melihat jam, saya mencatat waktu yang tepat di buku agenda.',
      level: 'n4',
      tags: ['pekerjaan', 'waktu']
    },
    {
      jp: '実験では正確なデータを記録することが求められます。',
      id: 'Dalam eksperimen, pencatatan data yang akurat sangat dituntut.',
      level: 'n4',
      tags: ['pendidikan']
    }
  ],
  'vg-n4-00482': [ // 浅い
    {
      jp: '海岸の近くは水深が浅いので、安心して泳げます。',
      id: 'Karena kedalaman air di dekat pesisir dangkal, kita bisa berenang tanpa cemas.',
      level: 'n4',
      tags: ['alam-lingkungan', 'kehidupan-sehari']
    },
    {
      jp: 'まだ日本に来て日が浅いので、分からない言葉が多いです。',
      id: 'Karena hari sejak datang ke Jepang masih baru sebentar, banyak kata yang belum saya tahu.',
      level: 'n4',
      tags: ['pendidikan', 'waktu']
    }
  ],
  'vg-n4-00483': [ // 薄い
    {
      jp: '夏は涼しくて薄い生地のシャツを着るのが好きです。',
      id: 'Pada musim panas, saya suka memakai kemeja berbahan tipis yang sejuk.',
      level: 'n4',
      tags: ['belanja', 'kehidupan-sehari']
    },
    {
      jp: 'このお茶は少し味が薄いので、もう少し濃くしてください。',
      id: 'Rasa teh ini agak hambar, tolong buatkan sedikit lebih pekat.',
      level: 'n4',
      tags: ['makanan-minuman']
    }
  ],
  'vg-n4-00484': [ // 厳しい
    {
      jp: 'この寮では門限の時間がとても厳しく決められています。',
      id: 'Di asrama ini, waktu jam malam ditetapkan dengan sangat ketat.',
      level: 'n4',
      tags: ['pendidikan', 'kehidupan-sehari']
    },
    {
      jp: '冬の北海道は寒さが非常に厳しいです。',
      id: 'Musim dingin di Hokkaido cuaca dinginnya luar biasa menusuk.',
      level: 'n4',
      tags: ['alam-lingkungan']
    }
  ],
  'vg-n4-00485': [ // 細かい
    {
      jp: '千円札しかないので、細かい小銭に両替してもらえますか。',
      id: 'Karena cuma punya uang kertas seribu yen, bisakah ditukarkan ke koin receh?',
      level: 'n4',
      tags: ['belanja', 'kehidupan-sehari']
    },
    {
      jp: '料理をするときに玉ねぎを細かいみじん切りにしました。',
      id: 'Saat memasak, saya mencincang bawang bombay menjadi potongan kecil-kecil halus.',
      level: 'n4',
      tags: ['makanan-minuman']
    }
  ],
  'vg-n4-00488': [ // 素晴らしい
    {
      jp: '山の上から見下ろした景色は本当に素晴らしかったです。',
      id: 'Pemandangan yang terhampar dari puncak gunung sungguh menakjubkan.',
      level: 'n4',
      tags: ['alam-lingkungan']
    },
    {
      jp: '劇場のコンサートで素晴らしい演奏を聴きました。',
      id: 'Saya mendengarkan pertunjukan musik yang luar biasa di konser gedung teater.',
      level: 'n4',
      tags: ['kehidupan-sehari']
    }
  ],
  'vg-n4-00489': [ // 凄い
    {
      jp: 'プロの選手の走るスピードは本当に凄いです。',
      id: 'Kecepatan lari atlet profesional itu benar-benar mengagumkan.',
      level: 'n4',
      tags: ['kehidupan-sehari']
    },
    {
      jp: '昨日の雨は凄い勢いで降っていました。',
      id: 'Hujan kemarin turun dengan intensitas yang luar biasa deras.',
      level: 'n4',
      tags: ['alam-lingkungan']
    }
  ],
  'vg-n4-00490': [ // 正しい
    {
      jp: '辞書を調べて、漢字の正しい書き方を覚えました。',
      id: 'Mengecek di kamus, saya mempelajari urutan penulisan kanji yang benar.',
      level: 'n4',
      tags: ['pendidikan']
    },
    {
      jp: '正しい答えをノートに赤ペンで書き写してください。',
      id: 'Tolong salin jawaban yang benar ke buku catatan menggunakan pena merah.',
      level: 'n4',
      tags: ['pendidikan']
    }
  ],
  'vg-n4-00493': [ // 適当
    {
      jp: '冷蔵庫にある適当な野菜を使ってスープを作りました。',
      id: 'Saya membuat sup dengan sayuran seadanya yang pas di dalam kulkas.',
      level: 'n4',
      tags: ['makanan-minuman']
    },
    {
      jp: '空欄に適当な言葉を入れて文を完成させてください。',
      id: 'Silakan masukkan kata yang tepat ke bagian kosong untuk melengkapi kalimat.',
      level: 'n4',
      tags: ['pendidikan']
    }
  ],
  'vg-n4-00500': [ // 自由
    {
      jp: '放課後は自分の好きなことをする自由があります。',
      id: 'Sepulang sekolah kami memiliki kebebasan untuk melakukan hal-hal yang disukai.',
      level: 'n4',
      tags: ['pendidikan', 'kehidupan-sehari']
    },
    {
      jp: '休憩時間ですから、席を離れて自由に過ごしてください。',
      id: 'Karena ini waktu istirahat, silakan tinggalkan tempat duduk dan beraktivitas dengan bebas.',
      level: 'n4',
      tags: ['pekerjaan', 'kehidupan-sehari']
    }
  ],
  'vg-n4-00504': [ // 得意
    {
      jp: '弟は数学が得意で、いつも満点を取っています。',
      id: 'Adik laki-laki saya ahli dalam matematika dan selalu mendapatkan nilai sempurna.',
      level: 'n4',
      tags: ['keluarga', 'pendidikan']
    },
    {
      jp: '得意な曲をピアノでみんなの前で演奏しました。',
      id: 'Saya memainkan lagu keahlian saya dengan piano di depan semua orang.',
      level: 'n4',
      tags: ['kehidupan-sehari', 'pertemanan']
    }
  ],
  'vg-n4-00508': [ // 急
    {
      jp: '急な用事ができたので、今日の約束をキャンセルしました。',
      id: 'Karena ada urusan mendadak, saya membatalkan janji temu hari ini.',
      level: 'n4',
      tags: ['kehidupan-sehari', 'pertemanan']
    },
    {
      jp: '車を運転しているときは急に止まらないでください。',
      id: 'Jangan berhenti mendadak saat sedang mengemudikan mobil.',
      level: 'n4',
      tags: ['kehidupan-sehari']
    }
  ],
  'vg-n4-00509': [ // 特別
    {
      jp: '母の誕生日のために、特別なケーキを予約しました。',
      id: 'Untuk hari ulang tahun ibu, saya memesan kue yang istimewa.',
      level: 'n4',
      tags: ['keluarga', 'makanan-minuman']
    },
    {
      jp: 'このイベントは会員だけの特別な案内となっています。',
      id: 'Acara ini merupakan pengumuman khusus hanya bagi para anggota.',
      level: 'n4',
      tags: ['belanja', 'pekerjaan']
    }
  ],
  'vg-n4-00624': [ // あんな
    {
      jp: 'あんなに高いビルに登ったのは初めてです。',
      id: 'Ini pertama kalinya saya naik ke gedung setinggi itu.',
      level: 'n4',
      tags: ['kehidupan-sehari', 'ruang-arah']
    },
    {
      jp: 'あんな失敗は二度と繰り返さないように気をつけます。',
      id: 'Saya akan berhati-hati agar tidak mengulangi kegagalan seperti itu lagi.',
      level: 'n4',
      tags: ['pekerjaan', 'pendidikan']
    }
  ],
  'vg-n4-00627': [ // だいじょうぶ
    {
      jp: '少し転びましたが、怪我はないのでだいじょうぶです。',
      id: 'Saya sedikit terjatuh, tetapi karena tidak ada luka saya baik-baik saja.',
      level: 'n4',
      tags: ['kesehatan', 'kehidupan-sehari']
    },
    {
      jp: '「手伝いましょうか」「いいえ、一人でだいじょうぶです」',
      id: '"Boleh saya bantu?" "Tidak, saya sendiri tidak apa-apa."',
      level: 'n4',
      tags: ['kehidupan-sehari', 'pertemanan']
    }
  ]
};

// ── Validation Pass ──
console.log('Total entries defined in EXAMPLES_DATA:', Object.keys(EXAMPLES_DATA).length);
if (Object.keys(EXAMPLES_DATA).length !== 68) {
  console.error('ERROR: Expected 68 entries, got', Object.keys(EXAMPLES_DATA).length);
  process.exit(1);
}

const seenJp = new Set();
let hasErrors = false;

for (const [id, exs] of Object.entries(EXAMPLES_DATA)) {
  if (!Array.isArray(exs) || exs.length < 1 || exs.length > 2) {
    console.error(`[${id}] examples must have 1-2 items, got ${exs.length}`);
    hasErrors = true;
  }
  for (let i = 0; i < exs.length; i++) {
    const ex = exs[i];
    if (!ex.jp || ex.jp.length < 8) {
      console.error(`[${id}][${i}] jp too short (${ex.jp?.length}): ${ex.jp}`);
      hasErrors = true;
    }
    if (!ex.id || ex.id.length < 5) {
      console.error(`[${id}][${i}] id too short (${ex.id?.length}): ${ex.id}`);
      hasErrors = true;
    }
    if (ex.level !== 'n4') {
      console.error(`[${id}][${i}] level is '${ex.level}', expected 'n4'`);
      hasErrors = true;
    }
    if (!Array.isArray(ex.tags) || ex.tags.length < 1 || ex.tags.length > 2) {
      console.error(`[${id}][${i}] tags must be 1-2 tags:`, ex.tags);
      hasErrors = true;
    } else {
      for (const t of ex.tags) {
        if (!VALID_TAGS.has(t)) {
          console.error(`[${id}][${i}] invalid tag: '${t}'`);
          hasErrors = true;
        }
      }
    }
    // Check no Japanese in id
    if (/[\u3000-\u9fff\u3040-\u309f\u30a0-\u30ff]/.test(ex.id)) {
      console.error(`[${id}][${i}] id contains Japanese: '${ex.id}'`);
      hasErrors = true;
    }
    // Check duplication
    if (seenJp.has(ex.jp)) {
      console.error(`[${id}][${i}] duplicate jp: '${ex.jp}'`);
      hasErrors = true;
    }
    seenJp.add(ex.jp);
  }
}

if (hasErrors) {
  console.error('Validation failed. Aborting.');
  process.exit(1);
}
console.log('✅ Validation passed! All 68 entries (136 examples) strictly meet schema.');

// ── File Update Logic ──
const files = [
  { path: 'public/data/vocab/n4/n4-adjectives.js', varName: 'vocabN4_Adjectives' },
  { path: 'public/data/vocab/n4/n4-adverbs.js', varName: 'vocabN4_Adverbs' },
  { path: 'public/data/vocab/n4/n4-expressions.js', varName: 'vocabN4_Expressions' }
];

const counts = {};

for (const { path: relPath, varName } of files) {
  const fullPath = path.join(__dirname, '..', relPath);
  let content = fs.readFileSync(fullPath, 'utf8');
  let updatedInFile = 0;

  for (const [id, exs] of Object.entries(EXAMPLES_DATA)) {
    // Check if this id belongs to this file
    const idPattern = new RegExp(`id:\\s*'${id}'|"id":\\s*"${id}"`);
    const idMatch = idPattern.exec(content);
    if (!idMatch) continue;

    // Find the entry boundary
    const startIndex = idMatch.index;
    let blockEnd = content.indexOf('},', startIndex);
    if (blockEnd === -1) {
      blockEnd = content.indexOf('\n}', startIndex);
    }
    if (blockEnd === -1) {
      console.error(`Could not find closing bracket for entry ${id} in ${relPath}`);
      continue;
    }
    const block = content.slice(startIndex, blockEnd);

    // Look for examples: []
    const exMatch = block.match(/examples:\s*\[\s*\]/);
    if (!exMatch) {
      // Check if already populated
      if (block.includes('examples: [')) {
        console.log(`[${id}] already has non-empty examples in ${relPath}`);
      } else {
        console.error(`[${id}] could not find examples field in ${relPath}`);
      }
      continue;
    }

    const formattedExamples = 'examples: ' + JSON.stringify(exs);
    const updatedBlock = block.replace(exMatch[0], formattedExamples);
    content = content.slice(0, startIndex) + updatedBlock + content.slice(blockEnd);
    updatedInFile++;
  }

  fs.writeFileSync(fullPath, content, 'utf8');
  counts[relPath] = updatedInFile;
  console.log(`✅ ${relPath}: updated ${updatedInFile} entries`);
}

// ── Post-Update Verification ──
console.log('\n--- Post-update Verification ---');
let totalRemainingMissing = 0;

for (const { path: relPath, varName } of files) {
  const fullPath = path.join(__dirname, '..', relPath);
  const code = fs.readFileSync(fullPath, 'utf8');
  const sandbox = {};
  new Function('window', code)(sandbox);
  const items = sandbox[varName];
  const missing = items.filter(it => !it.examples || it.examples.length === 0);
  console.log(`${relPath}: total=${items.length}, missing=${missing.length}`);
  totalRemainingMissing += missing.length;
}

if (totalRemainingMissing === 0) {
  console.log('\n🎉 ALL TARGET FILES HAVE 0 MISSING EXAMPLES!');
} else {
  console.error(`\n⚠️ Still ${totalRemainingMissing} entries missing examples!`);
  process.exit(1);
}
