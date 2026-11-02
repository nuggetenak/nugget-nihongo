/**
 * JLPT N3 Golden Set 01 (Foundational Units 1-5)
 * 15 Authentic Items with 5-Layer Explanations & Strict Permutation Proof
 */

function getJLPTN3Set() {
  return {
    setId: 'jlpt-n3-set01',
    trackType: 'jlpt',
    level: 'n3',
    title: 'Set Latihan JLPT N3 - 01',
    description: 'Simulasi modular 15 menit menguji penguasaan Unit 1 s/d 5 Kurikulum N3 (Momentum Seketika, Ketuntasan Tindakan, Gradasi Waktu, Penyesalan & Tekad Disiplin).',
    targetUnits: 'Unit 1 s/d 5: Momentum Waktu, Status Tindakan, Gradasi Perubahan, Emosi Hipotetis & Niat Disiplin',
    totalItems: 15,
    timeLimitMinutes: 15,
    passingScore: 10,
    items: [
      {
        id: 'JLPT-N3-S01-Q01',
        trackType: 'jlpt',
        level: 'n3',
        mondaiNumber: 1,
        mondaiType: 'kanji_reading',
        instructionJp: '____の言葉の読み方として最もよいものを、1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah cara baca kanji yang bergaris bawah dari pilihan 1, 2, 3, 4.',
        prompt: '新商品の 売れ行きが 急激に **増加** している。',
        targetWord: '増加',
        options: ['ぞうか', 'ぞうが', 'しょうか', 'そくか'],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Kanji 「増加」 dibaca 「ぞうか」 yang bermakna peningkatan / pertambahan (volume atau angka statistik).',
          distractorAutopsy: {
            '1': 'ぞうか adalah KUNCI BENAR (増加 = bertambah/meningkat).',
            '2': 'ぞうが salah pada rendaku kanji 加.',
            '3': 'しょうか adalah bacaan untuk 「消火」 (pemadaman api) atau 「消化」 (pencernaan).',
            '4': 'そくか adalah bacaan keliru.'
          },
          mnemonicSensei: 'Zou (増 = bertambah banyak) + Ka (加 = menambah). Penjualan naik drastis = Zouka!',
          l1InterferenceAlert: 'Di bahasa Indonesia kita memakai kata \"naik\" atau \"nambah\". Di bahasa Jepang bisnis N3, gunakan jukugo formal 「増加 (zouka)」 untuk data grafik statistik, bukan sekadar kata kerja fuemasu.',
          remedialPrescription: {
            unitId: 'unit-n3-03',
            unitNumber: 3,
            unitTitleId: 'Pengalaman, Kesiapan & Gradasi Seiring Waktu',
            lessonId: 'les-n3-u03-01',
            vocabId: 'vg-n3-00045',
            advice: 'Pelajari kanji tren perubahan dan peningkatan di Unit 3 Kurikulum N3.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-n3',
          unitId: 'unit-n3-03',
          unitNumber: 3,
          unitTitleId: 'Pengalaman, Kesiapan & Gradasi Seiring Waktu',
          lessonId: 'les-n3-u03-01',
          vocabId: 'vg-n3-00045'
        }
      },
      {
        id: 'JLPT-N3-S01-Q02',
        trackType: 'jlpt',
        level: 'n3',
        mondaiNumber: 2,
        mondaiType: 'orthography',
        instructionJp: '____の言葉を漢字で書くとき、最もよいものを、1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah penulisan kanji yang paling tepat untuk kata bergaris bawah.',
        prompt: '毎日の 努力の **けっか**、試験に 合格した。',
        targetWord: 'けっか',
        options: ['結果', '結花', '決果', '結課'],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Kata 「けっか (hasil/akibat)」 ditulis dengan kanji 「結果」 (mengikat simpul 結 + berbuah/hasil 果).',
          distractorAutopsy: {
            '1': '結果 adalah KUNCI BENAR (buah dari ikatan usaha = hasil).',
            '2': '結花 salah pada karakter kedua (花 = bunga).',
            '3': '決果 salah pada karakter pertama (決 = memutuskan, bukan 結).',
            '4': '結課 salah pada karakter kedua (課 = seksi/pelajaran).'
          },
          mnemonicSensei: 'Usaha yang diikat (結) akhirnya berbuah (果)! Hasil ujian = 結果 (Kekka).',
          l1InterferenceAlert: 'Hati-hati dengan kanji 決 (ketsu - memutuskan) dan 結 (musubu/ketsu - mengikat). Dalam kata kekka, kanji yang dipakai adalah 結 yang memiliki radikal benang 糸 di sisi kiri.',
          remedialPrescription: {
            unitId: 'unit-n3-02',
            unitNumber: 2,
            unitTitleId: 'Ketuntasan Tindakan, Keadaan & Perubahan Status',
            lessonId: 'les-n3-u02-01',
            vocabId: 'vg-n3-00088',
            advice: 'Tinjau kembali kanji sebab-akibat di Unit 2 MateriHub.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-n3',
          unitId: 'unit-n3-02',
          unitNumber: 2,
          unitTitleId: 'Ketuntasan Tindakan, Keadaan & Perubahan Status',
          lessonId: 'les-n3-u02-01',
          vocabId: 'vg-n3-00088'
        }
      },
      {
        id: 'JLPT-N3-S01-Q03',
        trackType: 'jlpt',
        level: 'n3',
        mondaiNumber: 3,
        mondaiType: 'usage',
        instructionJp: '次の言葉の使い方として最もよいものを、1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah kalimat yang menggunakan kata berikut secara paling tepat dan alami.',
        prompt: '【ついでに】',
        targetWord: 'ついでに',
        options: [
          '散歩に 行く ついでに、ポストに 手紙を 入れてきて ください。',
          '電車が 遅れた ついでに、会社に 遅刻して しまいました。',
          '一生懸命 勉強した ついでに、満点を 取りました。',
          '雨が 降った ついでに、傘を 買って帰りました。'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Pola 「〜ついでに」 berarti \"sekalian / mumpung sedang melakukan aksi A, sekalian memanfaatkan kesempatan untuk melakukan aksi B kecil\". Contoh tepat: Sekalian jalan-jalan santai, tolong masukkan surat ke kotak pos.',
          distractorAutopsy: {
            '1': '散歩に 行く ついでに、ポストに 手紙を 入れてきて ください adalah KUNCI BENAR (aksi utama: sanpo, aksi sekunder sekalian: pos surat).',
            '2': 'Kereta terlambat adalah hubungan sebab-akibat (せいで / から), bukan tindakan yang disengaja sekalian.',
            '3': 'Belajar keras mendapatkan nilai 100 adalah hubungan hasil usaha (おかげで), bukan tsuide ni.',
            '4': 'Hujan turun membeli payung adalah tindakan terpaksa akibat situasi (ので), bukan mumpung sekalian.'
          },
          mnemonicSensei: 'Tsuide ni = Mumpung sekalian jalan! Aksi utamanya A, nebeng sedikit aksi B.',
          l1InterferenceAlert: 'Dalam bahasa Indonesia kita sering berkata \"gara-gara X sekalian aja Y\". Hati-hati, tsuide ni HANYA untuk tindakan yang diniatkan secara sukarela, bukan untuk menyalahkan keadaan buruk!',
          remedialPrescription: {
            unitId: 'unit-n3-01',
            unitNumber: 1,
            unitTitleId: 'Dimensi Waktu, Peluang & Momentum Seketika',
            lessonId: 'les-n3-u01-01',
            grammarId: 'gn3-00004',
            advice: 'Pelajari perbedaan nuansa Tsuide ni vs Nagara di Unit 1 MateriHub.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-n3',
          unitId: 'unit-n3-01',
          unitNumber: 1,
          unitTitleId: 'Dimensi Waktu, Peluang & Momentum Seketika',
          lessonId: 'les-n3-u01-01',
          grammarId: 'gn3-00004'
        }
      },
      {
        id: 'JLPT-N3-S01-Q04',
        trackType: 'jlpt',
        level: 'n3',
        mondaiNumber: 4,
        mondaiType: 'contextual_vocab',
        instructionJp: '（　）に入れるのに最もよいものを、1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah kata yang paling tepat untuk mengisi tanda kurung.',
        prompt: '窓を （　　）にして 寝たら、風邪を ひいてしまった。',
        options: ['開けっぱなし', '開けたきり', '開けだらけ', '開けがち'],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Pola 「V-stem + っぱなし」 menyatakan membiarkan suatu keadaan terbuka/berjalan terus menerus tanpa dirapikan kembali (ada kelalaian/nuansa negatif). Membiarkan jendela terus terbuka semalaman lalu masuk angin = 開けっぱなし (akeppanashi).',
          distractorAutopsy: {
            '1': '開けっぱなし adalah KUNCI BENAR (membiarkan jendela terbuka terus menerus).',
            '2': '開けたきり biasanya untuk aksi yang setelah itu tidak kembali lagi (misal pergi dan tidak pulang-pulang: 行ったきり).',
            '3': 'だらけ hanya menempel pada kata benda untuk kondisi kotor/penuh (misal 泥だらけ = penuh lumpur).',
            '4': 'がち menyatakan kecenderungan sering terjadi (misal 忘れがち = cenderung pelupa).'
          },
          mnemonicSensei: 'Panashi = Dibiarkan begitu saja tanpa dibereskan! Keran air nyala terus: 出しっぱなし. Jendela terbuka terus: 開けっぱなし!',
          l1InterferenceAlert: 'Dalam bahasa Indonesia kita sering bilang \"lupa nutup jendela\". Di Jepang, tata bahasa N3 mengkritik kondisi kelalaian yang ditinggal tersebut dengan akhiran っぱなし.',
          remedialPrescription: {
            unitId: 'unit-n3-02',
            unitNumber: 2,
            unitTitleId: 'Ketuntasan Tindakan, Keadaan & Perubahan Status',
            lessonId: 'les-n3-u02-02',
            grammarId: 'gn3-00019',
            advice: 'Kuasai pola kritik kelalaian V-stem + ppanashi di Unit 2 MateriHub.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-n3',
          unitId: 'unit-n3-02',
          unitNumber: 2,
          unitTitleId: 'Ketuntasan Tindakan, Keadaan & Perubahan Status',
          lessonId: 'les-n3-u02-02',
          grammarId: 'gn3-00019'
        }
      },
      {
        id: 'JLPT-N3-S01-Q05',
        trackType: 'jlpt',
        level: 'n3',
        mondaiNumber: 4,
        mondaiType: 'contextual_vocab',
        instructionJp: '（　）に入れるのに最もよいものを、1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah kata yang paling tepat untuk mengisi tanda kurung.',
        prompt: '少子化が 進むに（　　）、労働力不足が 深刻に なっている。',
        options: ['つれて', 'とって', 'ついて', '対して'],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Pola 「〜につれて」 berarti \"seiring dengan / sejalan dengan\", menyatakan perubahan pada kondisi B yang terjadi seiring berjalannya perubahan proporsional pada kondisi A (Seiring penurunan angka kelahiran, kelangkaan tenaga kerja kian parah).',
          distractorAutopsy: {
            '1': 'つれて adalah KUNCI BENAR (seiring dengan perkembangan kondisi alamiah/sosial).',
            '2': 'とって berarti \"bagi\" (sudut pandang evaluasi: 私にとって = bagi saya).',
            '3': 'ついて berarti \"mengenai / tentang\" topik pembahasan.',
            '4': '対して berarti \"terhadap\" atau menyatakan kontras perbandingan.'
          },
          mnemonicSensei: 'Tsurete = Seiring sejalan bergandengan tangan! Tren A berubah, tren B otomatis ikut terseret berubah.',
          l1InterferenceAlert: 'Bedakan ~ni tsurete dengan ~ni totte. Ni tsurete menuntut kata kerja tren perubahan (進む, 変わる, 増える).',
          remedialPrescription: {
            unitId: 'unit-n3-03',
            unitNumber: 3,
            unitTitleId: 'Pengalaman, Kesiapan & Gradasi Seiring Waktu',
            lessonId: 'les-n3-u03-01',
            grammarId: 'gn3-00028',
            advice: 'Pelajari rumus perubahan gradasi waktu Ni tsurete vs Ni shitagatte di Unit 3.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-n3',
          unitId: 'unit-n3-03',
          unitNumber: 3,
          unitTitleId: 'Pengalaman, Kesiapan & Gradasi Seiring Waktu',
          lessonId: 'les-n3-u03-01',
          grammarId: 'gn3-00028'
        }
      },
      {
        id: 'JLPT-N3-S01-Q06',
        trackType: 'jlpt',
        level: 'n3',
        mondaiNumber: 5,
        mondaiType: 'paraphrase_synonym',
        instructionJp: '____の文とだいたい同じ意味の文を、1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah kalimat yang memiliki makna paling mendekati kalimat bergaris bawah.',
        prompt: '大事な 約束を **うっかり 忘れてしまった**。',
        targetWord: 'うっかり 忘れてしまった',
        options: [
          '注意が 足りなくて 思わず 忘れてしまった。',
          'わざと 忘れた ふりを した。',
          'どうしても 思い出せなかった。',
          '忙しくて 忘れる 余裕が なかった。'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Adverbia 「うっかり (ukkari)」 bermakna secara ceroboh/tidak sengaja karena kurang konsentrasi atau kurang hati-hati. Maka 「うっかり忘れてしまった」 setara artinya dengan lalai/kurang perhatian sehingga tidak sengaja lupa (注意が足りなくて思わず忘れてしまった).',
          distractorAutopsy: {
            '1': '注意が 足りなくて 思わず 忘れてしまった adalah KUNCI BENAR.',
            '2': 'わざと (sengaja) bertolak belakang total dengan makna ukkari (tidak sengaja/ceroboh).',
            '3': 'どうやって/どうしても (bagaimanapun berusaha tidak ingat) bukan nuansa kecerobohan.',
            '4': 'Tidak punya waktu senggang untuk lupa adalah kalimat nonsens.'
          },
          mnemonicSensei: 'Ukkari = Lengah sesaat! Gara-gara melamun atau kurang waspada, tahu-tahu kecolongan.',
          l1InterferenceAlert: 'Orang Indonesia sering menyamakan ukkari dengan shikkari. AWAS TERBALIK! Shikkari = mantap/kuat/disiplin, sedangkan Ukkari = ceroboh/lengah.',
          remedialPrescription: {
            unitId: 'unit-n3-04',
            unitNumber: 4,
            unitTitleId: 'Penyesalan Masa Lalu & Harapan Hipotetis',
            lessonId: 'les-n3-u04-01',
            vocabId: 'vg-n3-00122',
            advice: 'Tinjau ulang onomatopoeia dan adverbia kesalahan psikologis di Unit 4 MateriHub.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-n3',
          unitId: 'unit-n3-04',
          unitNumber: 4,
          unitTitleId: 'Penyesalan Masa Lalu & Harapan Hipotetis',
          lessonId: 'les-n3-u04-01',
          vocabId: 'vg-n3-00122'
        }
      },
      {
        id: 'JLPT-N3-S01-Q07',
        trackType: 'jlpt',
        level: 'n3',
        mondaiNumber: 6,
        mondaiType: 'grammar_form',
        instructionJp: '（　）に入る最もよいものを、1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah tata bahasa yang paling tepat untuk mengisi tanda kurung.',
        prompt: 'あのとき、もっと 早く 病院へ （　　）、こんなに 悪化しなかったのに。',
        options: ['行けばよかったのに', '行ったほうがいい', '行くべきではない', '行こうとしたのに'],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Pola 「〜ばよかった (seandainya dulu melakukan...)」 digunakan untuk mengungkapkan penyesalan mendalam terhadap tindakan di masa lalu yang tidak dilakukan. Kalimat pengandaian: Seandainya dulu pergi ke rumah sakit lebih cepat, tidak akan memburuk seperti ini.',
          distractorAutopsy: {
            '1': '行けばよかったのに adalah KUNCI BENAR (penyesalan masa lampau).',
            '2': '行ったほうがいい adalah saran untuk masa sekarang/depan, tidak bisa untuk kejadian lampau (あのとき).',
            '3': '行くべきではない berarti seharusnya tidak pergi, bertentangan dengan konteks.',
            '4': '行こうとしたのに berarti bermaksud pergi tapi terhalang hal lain, tidak menyampaikan penyesalan hipotesis masa lalu.'
          },
          mnemonicSensei: 'Ba yokatta = Nyesel banget! Andaikan dulu gue lakuin itu, gak bakal nyesel begini sekarang.',
          l1InterferenceAlert: 'Dalam bahasa Indonesia kita memakai kata \"harusnya dulu\". Di bahasa Jepang, rumus penyesalan lampau adalah V-ba yokatta (bentuk pengandaian ba + yokatta).',
          remedialPrescription: {
            unitId: 'unit-n3-04',
            unitNumber: 4,
            unitTitleId: 'Penyesalan Masa Lalu & Harapan Hipotetis',
            lessonId: 'les-n3-u04-02',
            grammarId: 'gn3-00041',
            advice: 'Pelajari formula penyesalan lampau V-ba yokatta di Unit 4 MateriHub.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-n3',
          unitId: 'unit-n3-04',
          unitNumber: 4,
          unitTitleId: 'Penyesalan Masa Lalu & Harapan Hipotetis',
          lessonId: 'les-n3-u04-02',
          grammarId: 'gn3-00041'
        }
      },
      {
        id: 'JLPT-N3-S01-Q08',
        trackType: 'jlpt',
        level: 'n3',
        mondaiNumber: 6,
        mondaiType: 'grammar_form',
        instructionJp: '（　）に入る最もよいものを、1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah tata bahasa yang paling tepat untuk mengisi tanda kurung.',
        prompt: '健康の ために、毎朝 30分 ジョギングを （　　）。',
        options: ['することにしている', 'ことになっている', 'するわけではない', 'するはずがない'],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Pola 「V-jisho + ことにしている」 menyatakan kebiasaan atau rutinitas yang ditetapkan oleh KEMAUAN DIRI SENDIRI secara sadar dan disiplin. Kalimat: Demi kesehatan, saya membiasakan diri lari pagi 30 menit setiap hari.',
          distractorAutopsy: {
            '1': 'することにしている adalah KUNCI BENAR (komitmen aturan yang dibuat sendiri).',
            '2': 'ことになっている adalah aturan eksternal yang ditetapkan oleh kantor/masyarakat (misal: di Jepang mengemudi di lajur kiri).',
            '3': 'するわけではない berarti bukan berarti melakukan, tidak cocok dengan target kebiasaan sehat.',
            '4': 'するはずがない berarti mustahil melakukan.'
          },
          mnemonicSensei: 'SHITE IRU = Saya yang bikin aturannya sendiri! NATTE IRU = Orang lain / kantor yang mewajibkan ke saya.',
          l1InterferenceAlert: 'Jangan tertukar antara koto ni shite iru (keputusan pribadi) dan koto ni natte iru (aturan instansi/regulasi hukum)!',
          remedialPrescription: {
            unitId: 'unit-n3-05',
            unitNumber: 5,
            unitTitleId: 'Niat Terencana, Tekad Matang & Kebiasaan Disiplin',
            lessonId: 'les-n3-u05-01',
            grammarId: 'gn3-00055',
            advice: 'Buka kembali perbandingan Koto ni shite iru vs Koto ni natte iru di Unit 5.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-n3',
          unitId: 'unit-n3-05',
          unitNumber: 5,
          unitTitleId: 'Niat Terencana, Tekad Matang & Kebiasaan Disiplin',
          lessonId: 'les-n3-u05-01',
          grammarId: 'gn3-00055'
        }
      },
      {
        id: 'JLPT-N3-S01-Q09',
        trackType: 'jlpt',
        level: 'n3',
        mondaiNumber: 6,
        mondaiType: 'grammar_form',
        instructionJp: '（　）に入る最もよいものを、1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah tata bahasa yang paling tepat untuk mengisi tanda kurung.',
        prompt: '会議の （　　）に スマホが 鳴って、とても 恥ずかしかった。',
        options: ['最中', 'たび', 'ついで', 'ばかり'],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Pola 「〜最中に (さいちゅうに)」 berarti \"tepat di tengah-tengah sedang berlangsungnya suatu momentum penting, mendadak terjadi gangguan/interupsi yang tak diharapkan\". Contoh: Tepat di tengah-tengah rapat, ponsel berdering.',
          distractorAutopsy: {
            '1': '最中 (さいちゅう) adalah KUNCI BENAR.',
            '2': 'たび berarti setiap kali (setiap kali rapat HP bunyi, tidak logis).',
            '3': 'ついで berarti mumpung sekalian.',
            '4': 'ばかり berarti melulu/hanya.'
          },
          mnemonicSensei: 'Saichuu ni = Tepat di puncak klimaks momen penting, eh ada gangguan memalukan yang merusak suasana!',
          l1InterferenceAlert: 'Dalam bahasa Indonesia kita berkata \"pas lagi rapat-rapatnya\". Di bahasa Jepang, kata 最中 menuntut partikel NO jika didahului kata benda (会議の最中に).',
          remedialPrescription: {
            unitId: 'unit-n3-01',
            unitNumber: 1,
            unitTitleId: 'Dimensi Waktu, Peluang & Momentum Seketika',
            lessonId: 'les-n3-u01-02',
            grammarId: 'gn3-00008',
            advice: 'Pelajari pola Saichuu ni di Unit 1 Kurikulum N3 MateriHub.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-n3',
          unitId: 'unit-n3-01',
          unitNumber: 1,
          unitTitleId: 'Dimensi Waktu, Peluang & Momentum Seketika',
          lessonId: 'les-n3-u01-02',
          grammarId: 'gn3-00008'
        }
      },
      {
        id: 'JLPT-N3-S01-Q10',
        trackType: 'jlpt',
        level: 'n3',
        mondaiNumber: 6,
        mondaiType: 'grammar_form',
        instructionJp: '（　）に入る最もよいものを、1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah tata bahasa yang paling tepat untuk mengisi tanda kurung.',
        prompt: '雨の日は 事故が （　　）から、スピードを 落として 運転しよう。',
        options: ['起きやすい', '起きがち', '起きっぽい', '起ききり'],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Pola 「V-stem + やすい」 menyatakan sifat alamiah suatu hal yang memiliki probabilitas tinggi atau rentan terjadi secara objektif (di hari hujan, kecelakaan mudah/rentan terjadi).',
          distractorAutopsy: {
            '1': '起きやすい adalah KUNCI BENAR (secara objektif rawan/mudah terjadi).',
            '2': '起きがち umumnya untuk kecenderungan sifat manusiawi yang berulang akibat kebiasaan/kelemahan diri, kurang tepat untuk fenomena kecelakaan jalan akibat cuaca.',
            '3': '起きっぽい salah kelas kata (ppoi menempel pada kata sifat atau nomina sifat, misal okorippoi = gampang marah).',
            '4': '起ききり tidak gramatikal.'
          },
          mnemonicSensei: 'Kecelakaan rawan terjadi karena jalan licin? Objektifitas alamiah = Yasui (Okiyasui)!',
          l1InterferenceAlert: 'Bedakan ~yasui (probabilitas objektif alami) dengan ~gachi (kecenderungan subjektif akibat kelalaian manusiawi).',
          remedialPrescription: {
            unitId: 'unit-n3-02',
            unitNumber: 2,
            unitTitleId: 'Ketuntasan Tindakan, Keadaan & Perubahan Status',
            lessonId: 'les-n3-u02-01',
            grammarId: 'gn3-00015',
            advice: 'Buka kembali perbandingan ~yasui, ~gachi, dan ~ppoi di Unit 2 MateriHub.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-n3',
          unitId: 'unit-n3-02',
          unitNumber: 2,
          unitTitleId: 'Ketuntasan Tindakan, Keadaan & Perubahan Status',
          lessonId: 'les-n3-u02-01',
          grammarId: 'gn3-00015'
        }
      },
      {
        id: 'JLPT-N3-S01-Q11',
        trackType: 'jlpt',
        level: 'n3',
        mondaiNumber: 6,
        mondaiType: 'grammar_form',
        instructionJp: '（　）に入る最もよいものを、1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah tata bahasa yang paling tepat untuk mengisi tanda kurung.',
        prompt: '会社の ルールですから、私の一存では （　　）。',
        options: ['決めるわけにはいかない', '決めないはずだ', '決めることにした', '決める一方だ'],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Pola 「〜わけにはいかない」 berarti \"secara moral, aturan sosial, atau etika kerja, tidak boleh/mustahil untuk saya lakukan (meskipun sebenarnya mampu)\". Kalimat: Karena ini aturan perusahaan, atas pertimbangan pribadi saya tidak bisa sembarangan memutuskan.',
          distractorAutopsy: {
            '1': '決めるわけにはいかない adalah KUNCI BENAR (terhalang etika/tanggung jawab sosial).',
            '2': '決めないはずだ berarti semestinya tidak memutuskan.',
            '3': '決めることにした berarti saya memutuskan (kontradiktif dengan kalimat aturan perusahaan).',
            '4': '決める一方だ berarti trennya terus memutuskan.'
          },
          mnemonicSensei: 'Wake ni wa ikanai = Hati mau, tapi aturan & etika melarang keras! Gak bisa sembarangan saya izinkan.',
          l1InterferenceAlert: 'Dalam bahasa Indonesia kita sering berkata \"tidak bisa\". Tapi ini BUKAN masalah ketidakmampuan fisik (dekinai), melainkan terikat etika/hukum kerja (wake ni wa ikanai).',
          remedialPrescription: {
            unitId: 'unit-n3-04',
            unitNumber: 4,
            unitTitleId: 'Penyesalan Masa Lalu & Harapan Hipotetis',
            lessonId: 'les-n3-u04-02',
            grammarId: 'gn3-00045',
            advice: 'Pelajari pola keterikatan etika sosial Wake ni wa ikanai di Unit 4.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-n3',
          unitId: 'unit-n3-04',
          unitNumber: 4,
          unitTitleId: 'Penyesalan Masa Lalu & Harapan Hipotetis',
          lessonId: 'les-n3-u04-02',
          grammarId: 'gn3-00045'
        }
      },
      {
        id: 'JLPT-N3-S01-Q12',
        trackType: 'jlpt',
        level: 'n3',
        mondaiNumber: 7,
        mondaiType: 'sentence_star',
        instructionJp: '★に入るものはどれですか。最もよいものを、1・2・3・4から一つ選びなさい。',
        instructionId: 'Tentukan kata yang jatuh pada posisi bintang (★).',
        prompt: 'この 写真を ______ ______ __★__ ______ 思い出します。',
        options: ['見る', '学生時代の', 'たびに', '楽しかったことを'],
        correctOptionIndex: 1,
        starScramble: {
          leadText: 'この 写真を',
          tailText: '思い出します。',
          tokens: ['見る', 'たびに', '学生時代の', '楽しかったことを'],
          correctOrder: [0, 1, 2, 3],
          starPosition: 3,
          fullSentence: 'この 写真を 見る たびに 学生時代の 楽しかったことを 思い出します。'
        },
        explanation: {
          justification: 'Susunan gramatikal yang tepat: 見る (1) + たびに (2) [pola setiap kali A terjadi, pasti memicu B] + 学生時代の (3) [modifikasi nomina] + 楽しかったことを (4) [objek kenangan] + 思い出します。Kata yang menempati slot bintang ke-3 adalah 「学生時代の」 (opsi 2 pada daftar).',
          distractorAutopsy: {
            '1': '見る berada di urutan ke-1 menempel pada konjungsi tabini.',
            '2': '学生時代の adalah KUNCI BENAR (menempati slot bintang ke-3).',
            '3': 'たびに berada di urutan ke-2.',
            '4': '楽しかったことを berada di urutan ke-4 sebelum verba omoidashimasu.'
          },
          mnemonicSensei: 'Setiap kali melihat foto ini (miru tabini), masa-masa sekolah (gakusei jidai no) yang menyenangkan (tanoshikatta koto o) teringat kembali!',
          l1InterferenceAlert: 'Pola ~tabi ni selalu diawali verba bentuk kamus biasa (jisho-kei) atau nomina + no.',
          remedialPrescription: {
            unitId: 'unit-n3-01',
            unitNumber: 1,
            unitTitleId: 'Dimensi Waktu, Peluang & Momentum Seketika',
            lessonId: 'les-n3-u01-01',
            grammarId: 'gn3-00002',
            advice: 'Pelajari susun kalimat pola pemicu kenangan V-jisho + tabi ni di Unit 1.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-n3',
          unitId: 'unit-n3-01',
          unitNumber: 1,
          unitTitleId: 'Dimensi Waktu, Peluang & Momentum Seketika',
          lessonId: 'les-n3-u01-01',
          grammarId: 'gn3-00002'
        }
      },
      {
        id: 'JLPT-N3-S01-Q13',
        trackType: 'jlpt',
        level: 'n3',
        mondaiNumber: 7,
        mondaiType: 'sentence_star',
        instructionJp: '★に入るものはどれですか。最もよいものを、1・2・3・4から一つ選びなさい。',
        instructionId: 'Tentukan kata yang jatuh pada posisi bintang (★).',
        prompt: '景気の 悪化に ______ ______ __★__ ______ 増えている。',
        options: ['ともなって', '就職が', '困難になる', '若者が'],
        correctOptionIndex: 2,
        starScramble: {
          leadText: '景気の 悪化に',
          tailText: '増えている。',
          tokens: ['ともなって', '就職が', '困難になる', '若者が'],
          correctOrder: [0, 1, 2, 3],
          starPosition: 3,
          fullSentence: '景気の 悪化に ともなって 就職が 困難になる 若者が 増えている。'
        },
        explanation: {
          justification: 'Susunan gramatikal yang tepat: ともなって (1) [seiring memburuknya ekonomi] + 就職が (2) [mencari kerja] + 困難になる (3) [menjadi sulit - klausa relatif penjelas] + 若者が (4) [anak muda] + 増えている [semakin bertambah]. Kata pada slot bintang ke-3 adalah 「困難になる」 (opsi 3 pada daftar).',
          distractorAutopsy: {
            '1': 'ともなって berada di posisi ke-1 menempel pada akka ni.',
            '2': '就職が berada di posisi ke-2.',
            '3': '困難になる adalah KUNCI BENAR (menempati slot bintang ke-3).',
            '4': '若者が berada di posisi ke-4 sebagai subjek dari verba penutup fuete iru.'
          },
          mnemonicSensei: 'Ekonomi lesu (akka ni tomonatte), cari kerja sulit (shuushoku ga konnan ni naru), pemuda yang begitu (wakamono ga) makin banyak (fuete iru)!',
          l1InterferenceAlert: 'Dalam bahasa Jepang, klausa penjelas diletakkan di depan nomina yang diterangkan: [Klausa: Shuushoku ga konnan ni naru] + [Nomina: wakamono]. Jangan dibalik!',
          remedialPrescription: {
            unitId: 'unit-n3-03',
            unitNumber: 3,
            unitTitleId: 'Pengalaman, Kesiapan & Gradasi Seiring Waktu',
            lessonId: 'les-n3-u03-02',
            grammarId: 'gn3-00030',
            advice: 'Pelajari modifikasi klausa bertingkat dengan pola Ni tomonatte di Unit 3.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-n3',
          unitId: 'unit-n3-03',
          unitNumber: 3,
          unitTitleId: 'Pengalaman, Kesiapan & Gradasi Seiring Waktu',
          lessonId: 'les-n3-u03-02',
          grammarId: 'gn3-00030'
        }
      },
      {
        id: 'JLPT-N3-S01-Q14',
        trackType: 'jlpt',
        level: 'n3',
        mondaiNumber: 8,
        mondaiType: 'short_reading',
        instructionJp: '次の文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つ選びなさい。',
        instructionId: 'Bacalah teks ulasan berikut, lalu tentukan jawaban yang paling tepat dari 1, 2, 3, 4.',
        prompt: '筆者が 最も 伝えたいことは 何か。',
        readingPassage: {
          genre: 'essay',
          passageTitle: '【コミュニケーションにおける「沈黙」】',
          passageText: '【コミュニケーションにおける「沈黙」】\n\n会話の途中で沈黙（ちんもく）が流れると、気まずいと感じて無理に何か話そうとする人が多い。しかし、沈黙は決して無駄な時間ではない。相手が自分の言ったことを心の中で深く考え、言葉を整理している貴重な時間であることも多いのだ。\n\nすぐに返事がないからといって、焦って次の話題を振るのではなく、相手の思考の時間を尊重して待つことも、大人の対話力として欠かせない姿勢である。'
        },
        options: [
          '会話中の沈黙を恐れず、相手が考える時間を尊重して待つことが大切だ。',
          '沈黙が流れたら、場を盛り上げるために すぐに冗談を言うべきだ。',
          '相手を待たせないように、質問されたら 0秒で即座に返答すべきだ。',
          '沈黙が嫌いな人とは、できる限り 深い会話を避けたほうがよい。'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Penulis menegaskan pada kalimat terakhir: 「焦って次の話題を振るのではなく、相手の思考の時間を尊重して待つことも、大人の対話力として欠かせない姿勢である (Jangan terburu-buru melempar topik baru, tetapi hargailah waktu berpikir lawan bicara dan tunggulah; itu adalah sikap dialog yang matang)」. Pilihan 1 merangkum tesis utama ini secara sempurna.',
          distractorAutopsy: {
            '1': '会話中の沈黙を恐れず、相手が考える時間を尊重して待つことが大切だ adalah KUNCI BENAR.',
            '2': 'Segera melempar lelucon adalah kebiasaan panik yang justru dikritik oleh penulis pada paragraf awal.',
            '3': 'Menjawab dalam 0 detik bertentangan dengan pentingnya merenung dan menata kata.',
            '4': 'Menghindari obrolan dengan orang yang tidak suka hening sama sekali tidak dibahas dalam teks.'
          },
          mnemonicSensei: 'Cari kalimat kesimpulan penulis yang diawali: 「〜のではなく、〜姿勢である」! Itu adalah inti pesan Dokkai.',
          l1InterferenceAlert: 'Soal Dokkai N3 sering mengangkat nilai budaya komunikasi Jepang di mana keheningan (間 - ma) adalah bagian dari rasa hormat, bukan kekosongan canggung.',
          remedialPrescription: {
            unitId: 'unit-n3-05',
            unitNumber: 5,
            unitTitleId: 'Niat Terencana, Tekad Matang & Kebiasaan Disiplin',
            lessonId: 'les-n3-u05-02',
            vocabId: 'vg-n3-00122',
            advice: 'Latih membaca wacana opini esai kritis di Unit 5 MateriHub.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-n3',
          unitId: 'unit-n3-05',
          unitNumber: 5,
          unitTitleId: 'Niat Terencana, Tekad Matang & Kebiasaan Disiplin',
          lessonId: 'les-n3-u05-02',
          vocabId: 'vg-n3-00122'
        }
      },
      {
        id: 'JLPT-N3-S01-Q15',
        trackType: 'jlpt',
        level: 'n3',
        mondaiNumber: 8,
        mondaiType: 'info_retrieval',
        instructionJp: '右の案内を見て、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つ選びなさい。',
        instructionId: 'Perhatikan pengumuman seminar berikut, lalu tentukan jawaban yang tepat.',
        prompt: '大学院生の ミンさんは 会員ではありません。事前予約して 参加する場合、いくら 払いますか。',
        readingPassage: {
          genre: 'realia_table',
          passageTitle: '【第15回 国際環境フォーラム 参加要項】',
          passageText: '【第15回 国際環境フォーラム 参加要項】\n\n◆ 参加費一覧（当日払い / 事前Web予約者）：\n・一般（非会員）： 5,000円（事前予約：4,000円）\n・学会会員： 3,000円（事前予約：2,500円）\n・学生（大学院生含む）： 2,000円（事前予約：1,500円）\n※ 学生の方は、当日受付にて「学生証」をご提示ください。\n※ 会員かつ学生の方は、学生料金（事前予約1,500円）が適用されます。'
        },
        options: ['1,500円', '2,000円', '4,000円', '5,000円'],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Min-san adalah mahasiswa pascasarjana (大学院生) dan bukan anggota (非会員). Pada tabel tercantum jelas: kategori 「学生（大学院生含む）」 dengan status事前予約 (reservasi di muka) dikenakan biaya sebesar 1.500 yen (事前予約：1,500円). Teks secara spesifik menyatakan kategori mahasiswa mencakup mahasiswa pascasarjana.',
          distractorAutopsy: {
            '1': '1,500円 adalah KUNCI BENAR (tarif mahasiswa dengan reservasi di muka).',
            '2': '2,000円 adalah tarif mahasiswa jika bayar langsung di hari H (当日払い).',
            '3': '4,000円 adalah tarif umum non-mahasiswa dengan reservasi di muka.',
            '4': '5,000円 adalah tarif umum non-mahasiswa bayar di hari H.'
          },
          mnemonicSensei: 'Identifikasi 3 variabel: 1. Status (Daigakuinsei = Gakusei), 2. Keanggotaan, 3. Waktu daftar (Jizen yoyaku). Perpotongan baris dan kolom = 1.500 yen!',
          l1InterferenceAlert: 'Banyak peserta salah mengira Daigakuinsei (S2/S3) masuk tarif umum. Selalu baca tanda kurung kecil 「大学院生含む (termasuk mahasiswa pascasarjana)」!',
          remedialPrescription: {
            unitId: 'unit-n3-01',
            unitNumber: 1,
            unitTitleId: 'Dimensi Waktu, Peluang & Momentum Seketika',
            lessonId: 'les-n3-u01-02',
            vocabId: 'vg-n3-00045',
            advice: 'Latih membaca syarat dan ketentuan tabel bersyarat ganda di Unit 1 MateriHub.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-n3',
          unitId: 'unit-n3-01',
          unitNumber: 1,
          unitTitleId: 'Dimensi Waktu, Peluang & Momentum Seketika',
          lessonId: 'les-n3-u01-02',
          vocabId: 'vg-n3-00045'
        }
      }
    ]
  };
}

module.exports = { getJLPTN3Set };
