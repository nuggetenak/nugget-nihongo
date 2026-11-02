/**
 * SSW Kaigo (Nursing Care / 介護) Golden Set 01
 * Grounded in Ministry of Health, Labour and Welfare (MHLW) Official Textbook
 * 15 Items: Vocab, Body Mechanics, K3 Safety, Decubitus, Choking & SBAR
 */

function getSSWKaigoSet() {
  return {
    setId: 'ssw-kaigo-set01',
    trackType: 'ssw',
    sswSectorId: 'ssw-kaigo',
    title: 'Set Latihan SSW Kaigo - 01',
    description: 'Simulasi modular 15 menit menguji istilah keperawatan lansia, prinsip mekanika tubuh (Body Mechanics), pencegahan aspirasi, dekubitus, dan komunikasi SBAR.',
    targetUnits: 'Kurikulum Vokasional Kaigo: Anatomi, Transfer Pasien, Etika Keperawatan & Prosedur K3 Lansia',
    totalItems: 15,
    timeLimitMinutes: 15,
    passingScore: 10,
    items: [
      {
        id: 'SSW-KG-S01-Q01',
        trackType: 'ssw',
        sswSectorId: 'ssw-kaigo',
        mondaiNumber: 1,
        mondaiType: 'ssw_technical_terminology',
        instructionJp: '写真や文の言葉の意味として最も適切なものを、1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah istilah keperawatan lansia yang paling tepat.',
        prompt: 'ベッドから 車いすへ 利用者を 移す介助のことを 何と 言いますか。',
        targetWord: '移乗',
        options: ['移乗（いじょう）', '移動（いどう）', '起立（きりつ）', '歩行（ほこう）'],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Bantuan memindahkan posisi lansia antar permukaan (misal dari ranjang ke kursi roda, atau dari kursi roda ke toilet) disebut 「移乗（いじょう / ijou）」. Sedangkan 「移動 (idou)」 berarti perpindahan tempat dari titik A ke titik B.',
          distractorAutopsy: {
            '1': '移乗（いじょう） adalah KUNCI BENAR (transfer posisi antar dudukan/ranjang).',
            '2': '移動（いどう） adalah mobilitas berjalan atau mendorong kursi roda berpindah ruangan.',
            '3': '起立（きりつ） adalah gerakan berdiri tegak.',
            '4': '歩行（ほこう） adalah aktivitas berjalan kaki.'
          },
          mnemonicSensei: 'Ijou = Pindah Jok! Dari ranjang pindah dudukan ke kursi roda = Ijou (移乗).',
          l1InterferenceAlert: 'Dalam bahasa Indonesia kita menyebut keduanya \"pindah\". Di Jepang: Ijou = transfer ranjang-kursi, Idou = jalan/bergerak antar ruangan. Jangan tertukar!',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kaigo-01',
            unitNumber: 1,
            unitTitleId: 'Dasar Keperawatan Lansia & Anatomi Tubuh',
            lessonId: 'les-ssw-kg-01',
            vocabId: 'vg-ssw-kg-001',
            advice: 'Pelajari perbedaan istilah Ijou vs Idou di Modul Kaigo MHLW MateriHub.'
          },
          safetyTip: 'Saat melakukan ijou, pastikan rem kursi roda (bureeki) sudah terkunci rapat sebelum mengangkat pasien.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kaigo',
          unitId: 'unit-curriculum-ssw-kaigo-01',
          unitNumber: 1,
          unitTitleId: 'Dasar Keperawatan Lansia & Anatomi Tubuh',
          lessonId: 'les-ssw-kg-01',
          vocabId: 'vg-ssw-kg-001'
        }
      },
      {
        id: 'SSW-KG-S01-Q02',
        trackType: 'ssw',
        sswSectorId: 'ssw-kaigo',
        mondaiNumber: 1,
        mondaiType: 'ssw_k3_procedure',
        instructionJp: '介護者の腰痛を予防するための「ボディメカニクス」の原則として、正しいものを一つ選びなさい。',
        instructionId: 'Pilihlah prinsip Body Mechanics yang benar untuk mencegah cedera saraf pinggang (sakit pinggang).',
        prompt: '介助者が 腰痛（ようつう）を 防ぐための 姿勢として、正しいものは どれですか。',
        options: [
          '支持基底面を広く取り、重心を低く落として 利用者に近づく。',
          '膝を曲げずに 腰だけを深く曲げて、腕の力だけで持ち上げる。',
          '足幅を狭く揃えて、つま先立ちで 介助を行う。',
          '利用者と 自分の体を 50センチ以上 離して 持ち上げる。'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Prinsip nomor satu Body Mechanics MHLW: Memperlebar bidang tumpuan kaki (支持基底面を広く取る), merendahkan pusat gravitasi tubuh dengan menekuk lutut (重心を低くする), dan mendekatkan tubuh ke pasien (利用者に体を近づける) untuk mengurangi beban torsi pada tulang belakang.',
          distractorAutopsy: {
            '1': 'Pilihan 1 adalah KUNCI BENAR (prinsip emas body mechanics).',
            '2': 'Menekuk pinggang tanpa menekuk lutut adalah pemicu hernia nukleus pulposus (saraf terjepit fatal).',
            '3': 'Kaki rapat dan jinjit membuat tumpuan goyah dan mudah jatuh.',
            '4': 'Menjauhkan tubuh meningkatkan momentum beban pada tulang pinggang.'
          },
          mnemonicSensei: 'Buka kaki selebar bahu, tekuk lutut, dekap pasien dekat dada! Jangan angkat pakai pinggang, gunakan otot paha.',
          l1InterferenceAlert: 'Cedera pinggang (Youtsuu) adalah penyakit akibat kerja nomor satu di panti jompo Jepang. Ujian Prometric Kaigo selalu menguji prinsip ini!',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kaigo-02',
            unitNumber: 2,
            unitTitleId: 'Mekanika Tubuh & Bantuan Mobilitas',
            lessonId: 'les-ssw-kg-02',
            vocabId: 'vg-ssw-kg-012',
            advice: 'Kuasai 8 prinsip dasar Body Mechanics di Modul Kaigo MateriHub.'
          },
          safetyTip: 'Gunakan otot besar pada paha dan bokong, bukan mengandalkan kekuatan otot punggung/pinggang.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kaigo',
          unitId: 'unit-curriculum-ssw-kaigo-02',
          unitNumber: 2,
          unitTitleId: 'Mekanika Tubuh & Bantuan Mobilitas',
          lessonId: 'les-ssw-kg-02',
          vocabId: 'vg-ssw-kg-012'
        }
      },
      {
        id: 'SSW-KG-S01-Q03',
        trackType: 'ssw',
        sswSectorId: 'ssw-kaigo',
        mondaiNumber: 2,
        mondaiType: 'ssw_k3_procedure',
        instructionJp: '誤嚥（ごえん）を予防するための食事介助について、適切なものを一つ選びなさい。',
        instructionId: 'Pilihlah prosedur bantuan makan yang benar untuk mencegah aspirasi (tersedak makanan ke paru-paru).',
        prompt: '利用者が 誤嚥（ごえん：気管に食べ物が入ること）するのを 防ぐ 介助として、正しいものは どれですか。',
        options: [
          'あごを軽く引いた 姿勢を 保ち、嚥下（飲み込み）を 確認してから 次の 一口を 運ぶ。',
          '頭を 後ろに 大きく そらせて、上を 向かせながら 食べ物を 口に 入れる。',
          '寝たままの 完全な 水平姿勢（仰向け）で スプーンで 急いで 食べさせる。',
          '食事の 前に 口腔体操を せず、できる限り 固い 肉を そのまま 食べさせる。'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Untuk mencegah aspirasi (誤嚥 / goen), posisi kepala lansia harus sedikit menunduk dengan dagu ditarik ke dalam (あごを引く) agar epiglotis menutup saluran nafas saat menelan. Makanan baru boleh disuap setelah memastikan suapan sebelumnya tertelan sempurna (嚥下を確認).',
          distractorAutopsy: {
            '1': 'Pilihan 1 adalah KUNCI BENAR (posisi dagu menunduk membuka jalan kerongkongan dan menutup tenggorokan).',
            '2': 'Mendongakkan kepala ke belakang membuka pipa tenggorokan dan menjamin makanan tersedak masuk paru-paru.',
            '3': 'Makan posisi telentang datar sangat memicu aspirasi pneumonia fatal.',
            '4': 'Lansia membutuhkan makanan bertekstur lunak dan senam mulut sebelum makan.'
          },
          mnemonicSensei: 'Makan tunduk, jangan mendongak! Cek jakun bergerak menelan, baru suap sendok berikutnya.',
          l1InterferenceAlert: 'Dalam bahasa Indonesia kita menyebut tersedak biasa. Di Kaigo Jepang, goen dapat menyebabkan radang paru-paru aspirasi (誤嚥性肺炎) yang merupakan penyebab kematian tertinggi pada lansia di Jepang.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kaigo-03',
            unitNumber: 3,
            unitTitleId: 'Bantuan Makan, Nutrisi & Pencegahan Goin',
            lessonId: 'les-ssw-kg-03',
            vocabId: 'vg-ssw-kg-025',
            advice: 'Pelajari fisiologi menelan dan pencegahan goen di Unit 3 Kaigo MateriHub.'
          },
          safetyTip: 'Jika lansia batuk-batuk saat makan, segera hentikan suapan dan tepuk punggung dengan lembut.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kaigo',
          unitId: 'unit-curriculum-ssw-kaigo-03',
          unitNumber: 3,
          unitTitleId: 'Bantuan Makan, Nutrisi & Pencegahan Goin',
          lessonId: 'les-ssw-kg-03',
          vocabId: 'vg-ssw-kg-025'
        }
      },
      {
        id: 'SSW-KG-S01-Q04',
        trackType: 'ssw',
        sswSectorId: 'ssw-kaigo',
        mondaiNumber: 2,
        mondaiType: 'ssw_k3_procedure',
        instructionJp: '褥瘡（じょくそう：床ずれ）の予防に関する記述として、正しいものを一つ選びなさい。',
        instructionId: 'Pilihlah tindakan pencegahan luka tirah baring / luka tekan dekubitus (Jokusou) yang benar.',
        prompt: 'ベッド上で 過ごす時間が 長い 利用者の 褥瘡（じょくそう）を 防ぐ 方法として、適切なものは どれですか。',
        options: [
          '少なくとも 2時間に 1回は 体位変換（たいへんかん）を 行い、皮膚の 観察を する。',
          '同じ 向きの まま、24時間 姿勢を 変えずに 寝かせておく。',
          '赤くなった 皮膚を 強い力で ゴシゴシと 強く マッサージする。',
          'シーツに たくさんの シワ（たるみ）を 作ったまま 放置する。'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Dekubitus (褥瘡 / jokusou) timbul akibat tekanan terus-menerus pada tonjolan tulang yang menghambat aliran darah. Standar resmi keperawatan Jepang mewajibkan alih baring posisi (体位変換 / taii henkan) minimal setiap 2 jam sekali serta mengecek kemerahan kulit.',
          distractorAutopsy: {
            '1': 'Pilihan 1 adalah KUNCI BENAR (alih baring minimal 2 jam sekali).',
            '2': 'Membiarkan 24 jam dalam satu posisi menyebabkan nekrosis jaringan kulit.',
            '3': 'Menggosok kulit yang memerah justru merusak kapiler darah yang rapuh.',
            '4': 'Kerutan pada sprei ranjang menambah gesekan tajam pada kulit lansia.'
          },
          mnemonicSensei: 'Miring kiri, miring kanan setiap 2 JAM! Sprei wajib ditarik kencang tanpa kerutan.',
          l1InterferenceAlert: 'Dalam bahasa Indonesia disebut luka tirah baring. Di Jepang istilah resminya 褥瘡 (jokusou) atau 床ずれ (tokozure).',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kaigo-04',
            unitNumber: 4,
            unitTitleId: 'Perawatan Kulit, Eliminasi & Pencegahan Dekubitus',
            lessonId: 'les-ssw-kg-04',
            vocabId: 'vg-ssw-kg-033',
            advice: 'Pelajari titik rawan dekubitus (tulang ekor, tumit) di Unit 4 Kaigo MateriHub.'
          },
          safetyTip: 'Pastikan sprei kasur tegang rapi tanpa lipatan, karena lipatan kecil bisa menjadi titik pemicu luka lecet.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kaigo',
          unitId: 'unit-curriculum-ssw-kaigo-04',
          unitNumber: 4,
          unitTitleId: 'Perawatan Kulit, Eliminasi & Pencegahan Dekubitus',
          lessonId: 'les-ssw-kg-04',
          vocabId: 'vg-ssw-kg-033'
        }
      },
      {
        id: 'SSW-KG-S01-Q05',
        trackType: 'ssw',
        sswSectorId: 'ssw-kaigo',
        mondaiNumber: 3,
        mondaiType: 'ssw_hou_ren_so_sbar',
        instructionJp: '利用者の急変時における看護職への報告（SBAR）として、最も適切なものを一つ選びなさい。',
        instructionId: 'Pilihlah format pelaporan darurat SBAR yang tepat kepada perawat saat kondisi lansia memburuk mendadak.',
        prompt: '見守り中、利用者の 田中さんが 突然 激しい 腹痛を 訴えて 顔面蒼白に なりました。看護師への 最初の 報告として 最も 適切なものは どれですか。',
        options: [
          '「看護師さん、201号室の田中様が突然激しい腹痛を訴え、顔色が真っ白です。至急バイタル測定と診察をお願いします。」',
          '「明日の 朝まで 様子を 見てから、連絡帳に 書いておきますね。」',
          '「田中さん、大丈夫ですから お腹に 湿布を 貼って 寝ていましょう。」',
          '「私が 救急車を 呼んでおいたので、看護師さんは 何も しなくて いいです。」'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Prinsip pelaporan gawat darurat SBAR (Situation, Background, Assessment, Recommendation): Menyebutkan identitas pasien, gejala darurat yang terjadi seketika, dan meminta perawat segera datang memeriksa tanda vital (バイタル測定). Kaigo shoku dilarang membuat keputusan medis sendiri.',
          distractorAutopsy: {
            '1': 'Pilihan 1 adalah KUNCI BENAR (jelas, sigap, meminta tindakan medis perawat resmi).',
            '2': 'Menunggu sampai besok pagi berakibat fatal jika terjadi usus buntu atau serangan jantung.',
            '3': 'Menempel koyo kompres adalah tindakan medis ilegal yang dilarang bagi staf perawat lansia.',
            '4': 'Memanggil ambulans tanpa konfirmasi dokter/perawat kepala fasilitas melanggar SOP panti.'
          },
          mnemonicSensei: 'SBAR: Siapa pasiennya? Sakit apa mendadak? Segera panggil perawat untuk cek tensi dan nadi!',
          l1InterferenceAlert: 'Di Jepang, staf Kaigo (Careworker) BUKAN perawat medis (Kangoshi). Kaigo tidak boleh mendiagnosis penyakit atau memberikan obat tanpa instruksi tertulis perawat/dokter.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kaigo-05',
            unitNumber: 5,
            unitTitleId: 'Komunikasi Medis, Laporan SBAR & Kedaruratan',
            lessonId: 'les-ssw-kg-05',
            vocabId: 'vg-ssw-kg-041',
            advice: 'Pelajari alur batas kewenangan tindakan medis staf Kaigo di Unit 5 MateriHub.'
          },
          safetyTip: 'Jangan memindahkan pasien yang kesakitan hebat sebelum perawat memeriksa kondisi fisiknya.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kaigo',
          unitId: 'unit-curriculum-ssw-kaigo-05',
          unitNumber: 5,
          unitTitleId: 'Komunikasi Medis, Laporan SBAR & Kedaruratan',
          lessonId: 'les-ssw-kg-05',
          vocabId: 'vg-ssw-kg-041'
        }
      },
      {
        id: 'SSW-KG-S01-Q06',
        trackType: 'ssw',
        sswSectorId: 'ssw-kaigo',
        mondaiNumber: 1,
        mondaiType: 'ssw_technical_terminology',
        instructionJp: '介護機器の名称として正しいものを、1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah nama alat bantu mobilitas berikut yang tepat.',
        prompt: '立ち上がりや 歩行が 不安定な 利用者が、両手で 握って 押しながら 歩く 車輪付きの 歩行補助具を 何と 言いますか。',
        options: ['歩行器（ほこうき / シルバーカー）', '杖（つえ）', '担架（たんか）', '義足（ぎそく）'],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Alat bantu berjalan beroda empat dengan pegangan tangan yang didorong oleh lansia disebut 「歩行器（ほこうき）」 atau 「シルバーカー」.',
          distractorAutopsy: {
            '1': '歩行器（ほこうき） adalah KUNCI BENAR (walker beroda/rollator).',
            '2': '杖（つえ） adalah tongkat jalan berkaki 1 atau 4.',
            '3': '担架（たんか） adalah tandu evakuasi darurat.',
            '4': '義足（ぎそく） adalah kaki palsu prostetik.'
          },
          mnemonicSensei: 'Hokou (jalan) + Ki (alat) = Hokouki (alat bantu jalan dorong beroda).',
          l1InterferenceAlert: 'Dalam bahasa Indonesia sering disebut \"walker\". Di Jepang, bedakan antara Hokouki (untuk rehabilitasi medis di dalam panti) dan Silver Car (untuk jalan-jalan di luar).',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kaigo-02',
            unitNumber: 2,
            unitTitleId: 'Mekanika Tubuh & Bantuan Mobilitas',
            lessonId: 'les-ssw-kg-02',
            vocabId: 'vg-ssw-kg-012',
            advice: 'Pelajari nama-nama alat bantu keperawatan lansia di Unit 2 MateriHub.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kaigo',
          unitId: 'unit-curriculum-ssw-kaigo-02',
          unitNumber: 2,
          unitTitleId: 'Mekanika Tubuh & Bantuan Mobilitas',
          lessonId: 'les-ssw-kg-02',
          vocabId: 'vg-ssw-kg-012'
        }
      },
      {
        id: 'SSW-KG-S01-Q07',
        trackType: 'ssw',
        sswSectorId: 'ssw-kaigo',
        mondaiNumber: 2,
        mondaiType: 'ssw_k3_procedure',
        instructionJp: '入浴介助における事故防止について、適切なものを一つ選びなさい。',
        instructionId: 'Pilihlah prosedur pencegahan kecelakaan pada saat mendampingi lansia mandi berendam (Nyuyoku).',
        prompt: '利用者が 浴槽（お風呂）に 入る際の 事故を 防ぐ 注意点として、正しいものは どれですか。',
        options: [
          'お湯の 温度は 38〜40度程度に 設定し、足先から かけ湯をして お湯の 温度に 慣れさせる。',
          'お風呂の 温度を 45度以上の 熱湯にして、心臓から いきなり お湯を かける。',
          '脱衣所を 0度近くまで 冷やして、浴室との 温度差を 最大限に 広げる。',
          '利用者を 浴槽に 1人で 放置し、介助者は 別の 部屋へ 休憩に 行く。'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Pencegahan syok perubahan suhu mendadak (Heat Shock): Suhu air bak mandi diatur hangat bersahabat 38–40°C, siraman air hangat dimulai dari ujung kaki terjauh dari jantung (足先からかけ湯), dan ruangan ganti baju (脱衣所) harus dihangatkan agar tidak terjadi lonjakan tekanan darah.',
          distractorAutopsy: {
            '1': 'Pilihan 1 adalah KUNCI BENAR (suhu 38-40°C danかけ湯 dari ujung kaki).',
            '2': 'Air 45°C dan siram langsung ke jantung memicu infark miokard mendadak.',
            '3': 'Membiarkan ruang ganti dingin beku memicu Heat Shock fatal.',
            '4': 'Meninggalkan lansia sendirian di bak mandi menyebabkan risiko tenggelam.'
          },
          mnemonicSensei: 'Heat Shock = Pembunuh nomor satu di kamar mandi Jepang saat musim dingin! Siram dari ujung kaki, air hangat 38-40°C.',
          l1InterferenceAlert: 'Di Indonesia tidak ada fenomena Heat Shock karena iklim tropis. Di Jepang, ribuan lansia meninggal setiap musim dingin akibat mandi air panas di kamar mandi dingin. Ini soal wajib Prometric Kaigo!',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kaigo-04',
            unitNumber: 4,
            unitTitleId: 'Perawatan Kulit, Eliminasi & Pencegahan Dekubitus',
            lessonId: 'les-ssw-kg-04',
            vocabId: 'vg-ssw-kg-033',
            advice: 'Pelajari bahaya Heat Shock dan SOP mandi lansia di Unit 4 Kaigo MateriHub.'
          },
          safetyTip: 'Kamar ganti pakaian wajib dinyalakan pemanasnya sebelum lansia melepas baju.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kaigo',
          unitId: 'unit-curriculum-ssw-kaigo-04',
          unitNumber: 4,
          unitTitleId: 'Perawatan Kulit, Eliminasi & Pencegahan Dekubitus',
          lessonId: 'les-ssw-kg-04',
          vocabId: 'vg-ssw-kg-033'
        }
      },
      {
        id: 'SSW-KG-S01-Q08',
        trackType: 'ssw',
        sswSectorId: 'ssw-kaigo',
        mondaiNumber: 1,
        mondaiType: 'ssw_technical_terminology',
        instructionJp: '麻痺のある利用者への着替え介助（脱着）の原則として、正しいものを一つ選びなさい。',
        instructionId: 'Pilihlah prinsip ganti baju (lepas-pakai) untuk lansia yang mengalami kelumpuhan sebelah badan (Mahi).',
        prompt: '片麻痺（かたまひ：片側の手足が動かない）の 利用者の 着替えを 介助する際の 鉄則（ルール）は どれですか。',
        options: [
          '「脱健着患（だっけん・ちゃっかん）」： 脱ぐときは 健康な側から、着るときは 麻痺（患側）から。',
          '「脱患着健」： 脱ぐときは 麻痺側から、着るときは 健康な側から。',
          '麻痺側から 脱がせて、麻痺側から 着せる。',
          '両腕を 同時に 無理やり 引っ張って 脱がせる。'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Prinsip mutlak ganti pakaian lansia lumpuh separuh (hemiplegia): 「脱健着患（だっけん・ちゃっかん / Dakken Chakkan）」. Saat MELEPAS baju: dahului sisi sehat (健側), baru sisi sakit (患側). Saat MEMAKAIKAN baju: dahului sisi sakit/lumpuh (患側), baru sisi sehat (健側).',
          distractorAutopsy: {
            '1': '「脱健着患」 adalah KUNCI BENAR (rumus abadi keperawatan).',
            '2': '脱患着健 terbalik total dan menyebabkan dislokasi bahu pada lengan yang lumpuh.',
            '3': 'Melepas dari sisi lumpuh sangat menyakitkan karena lengan tidak bisa digerakkan leluasa.',
            '4': 'Menarik paksa kedua lengan menyebabkan cedera sendi dan patah tulang osteoporosis.'
          },
          mnemonicSensei: 'Rumus Emas 4 Huruf: DAK-KEN CHAK-KAN! Melepas dari yang SEHAT (健), Memakai dari yang SAKIT (患)!',
          l1InterferenceAlert: 'Hafalkan singkatan empat kanji: 脱健着患 (Dakken Chakkan). Soal ini 100% selalu muncul di ujian teori Prometric Kaigo!',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kaigo-02',
            unitNumber: 2,
            unitTitleId: 'Mekanika Tubuh & Bantuan Mobilitas',
            lessonId: 'les-ssw-kg-02',
            vocabId: 'vg-ssw-kg-012',
            advice: 'Kuasai prosedur ganti pakaian Dakken Chakkan di Unit 2 Kaigo MateriHub.'
          },
          safetyTip: 'Jangan pernah menarik pergelangan tangan sisi lumpuh, topanglah selalu dari bagian siku atau bahu.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kaigo',
          unitId: 'unit-curriculum-ssw-kaigo-02',
          unitNumber: 2,
          unitTitleId: 'Mekanika Tubuh & Bantuan Mobilitas',
          lessonId: 'les-ssw-kg-02',
          vocabId: 'vg-ssw-kg-012'
        }
      },
      {
        id: 'SSW-KG-S01-Q09',
        trackType: 'ssw',
        sswSectorId: 'ssw-kaigo',
        mondaiNumber: 2,
        mondaiType: 'ssw_k3_procedure',
        instructionJp: '感染症対策における手洗いの方法として、適切なものを一つ選びなさい。',
        instructionId: 'Pilihlah prosedur cuci tangan pencegahan infeksi (Kansen-shou) yang benar di panti lansia.',
        prompt: 'ノロウイルスや インフルエンザなどの 感染を防ぐための 正しい 手洗いは どれですか。',
        options: [
          '液体石鹸を泡立て、指先、爪の間、指の間、手首まで 30秒以上かけて こすり洗いする。',
          '水だけで 1秒間 さっと 指先を 濡らして 終わる。',
          '全員で 同じ 1枚の 湿った 布タオルを 使い回して 手を拭く。',
          'アルコール消毒液さえ つければ、目に見える 泥や 汚れが 手にあっても 洗わなくてよい。'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Prosedur cuci tangan higienis: Menggunakan sabun cair hingga berbusa, menggosok telapak, punggung tangan, sela-sela jari, ujung kuku, dan pergelangan tangan minimal 30 detik, lalu membilas dengan air mengalir dan mengeringkan dengan tisu kertas sekali pakai (ペーパータオル).',
          distractorAutopsy: {
            '1': 'Pilihan 1 adalah KUNCI BENAR (cuci 6 titik tangan selama 30 detik).',
            '2': 'Membasahi 1 detik tanpa sabun tidak membunuh virus.',
            '3': 'Memakai handuk kain bersamaan adalah media penularan infeksi silang nomor satu.',
            '4': 'Alkohol tidak efektif jika tangan berlumuran kotoran fisik, dan norovirus kebal terhadap alkohol biasa.'
          },
          mnemonicSensei: 'Cuci tangan 6 area: Telapak, Punggung, Sela jari, Kunci kuku, Jempol, Pergelangan! Lap pakai tisu kertas buang.',
          l1InterferenceAlert: 'Di panti jompo Jepang, Norovirus sangat ditakuti karena tahan alkohol. Satu-satunya cara membasminya dari tangan adalah mencuci dengan sabun mengalir selama minimal 30 detik.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kaigo-05',
            unitNumber: 5,
            unitTitleId: 'Komunikasi Medis, Laporan SBAR & Kedaruratan',
            lessonId: 'les-ssw-kg-05',
            vocabId: 'vg-ssw-kg-041',
            advice: 'Pelajari protokol pencegahan infeksi menular panti lansia di Unit 5 MateriHub.'
          },
          safetyTip: 'Gunakan selalu sarung tangan plastik sekali pakai (tsukaisute tebukuro) saat membersihkan muntahan atau kotoran.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kaigo',
          unitId: 'unit-curriculum-ssw-kaigo-05',
          unitNumber: 5,
          unitTitleId: 'Komunikasi Medis, Laporan SBAR & Kedaruratan',
          lessonId: 'les-ssw-kg-05',
          vocabId: 'vg-ssw-kg-041'
        }
      },
      {
        id: 'SSW-KG-S01-Q10',
        trackType: 'ssw',
        sswSectorId: 'ssw-kaigo',
        mondaiNumber: 1,
        mondaiType: 'ssw_technical_terminology',
        instructionJp: '利用者の尊厳を守る介護倫理として、最も適切なものを一つ選びなさい。',
        instructionId: 'Pilihlah etika keperawatan menjaga martabat lansia (Songen) yang paling tepat.',
        prompt: '認知症（にんちしょう）の 利用者が「財布が盗まれた！」と 怒って 訴えて います。介助者の 対応として 最も 適切なものは どれですか。',
        options: [
          '否定したり 怒鳴ったり せず、「それは 不安ですね。いっしょに 探しましょう」と 気持ちに 寄り添う。',
          '「誰も盗んでいません！あなたの勘違いです！」と 大声で 強く 叱りつける。',
          '利用者の 言うことを 無視して、部屋に 鍵をかけて 閉じ込める。',
          '子どもを あやすような 赤ちゃん言葉（幼児語）で 笑い者にする。'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Prinsip perawatan demensia: Jangan mendebat atau menyangkal delusi pencurian (物盗られ妄想), karena bagi lansia perasaan cemas itu adalah kenyataan batinnya. Sikap yang benar adalah memvalidasi kecemasannya dan mengajak mencari bersama dengan tenang (気持ちに寄り添う).',
          distractorAutopsy: {
            '1': 'Pilihan 1 adalah KUNCI BENAR (validasi emosi dan empati martabat kemanusiaan).',
            '2': 'Membentak lansia memicu kepanikan dan agresi batin yang memperparah demensia.',
            '3': 'Mengunci kamar masuk kategori pengurungan fisik ilegal (身体拘束 / Shintai Kousoku).',
            '4': 'Bicara seperti bayi melanggar martabat orang dewasa dan dilarang keras.'
          },
          mnemonicSensei: 'Jangan debat, jangan sangkal! Validasi dulu: \"Pasti cemas ya, ayo kita cari sama-sama!\"',
          l1InterferenceAlert: 'Di Jepang, perlakuan yang merendahkan martabat atau mengunci lansia masuk ranah hukum pelecehan lansia (Koureisha Gyakutai). Pahami konsep Songen (martabat diri)!',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kaigo-01',
            unitNumber: 1,
            unitTitleId: 'Dasar Keperawatan Lansia & Anatomi Tubuh',
            lessonId: 'les-ssw-kg-01',
            vocabId: 'vg-ssw-kg-001',
            advice: 'Pelajari etika pendampingan demensia dan penghormatan martabat lansia di Unit 1.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kaigo',
          unitId: 'unit-curriculum-ssw-kaigo-01',
          unitNumber: 1,
          unitTitleId: 'Dasar Keperawatan Lansia & Anatomi Tubuh',
          lessonId: 'les-ssw-kg-01',
          vocabId: 'vg-ssw-kg-001'
        }
      },
      {
        id: 'SSW-KG-S01-Q11',
        trackType: 'ssw',
        sswSectorId: 'ssw-kaigo',
        mondaiNumber: 2,
        mondaiType: 'ssw_k3_procedure',
        instructionJp: '車いすの安全操作について、正しいものを一つ選びなさい。',
        instructionId: 'Pilihlah prosedur keselamatan mengoperasikan kursi roda (Kurumaisu) yang benar.',
        prompt: '車いすで 急な 下り坂（くだりざか）を 進むときの 安全な 操作方法は どれですか。',
        options: [
          '介助者が 後ろ向きに なり、車いすを 引くようにして ゆっくり 後ろ向きで 下りる。',
          '前向きの まま、スピードを 出して 一気に 駆け下りる。',
          'ブレーキを 完全に 解除して、利用者に 自分で ハンドルを 回させる。',
          '利用者に 目を 閉じさせて、前向きに 勢いよく 押し下ろす。'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Saat menuruni turunan curam (急な下り坂), kursi roda WAJIB dijalankan MUNDUR (後ろ向き) dengan posisi badan pendamping menahan laju di bagian bawah. Ini mencegah lansia terjungkal ke depan akibat gravitasi curam.',
          distractorAutopsy: {
            '1': 'Pilihan 1 adalah KUNCI BENAR (menuruni jalan curam dengan berjalan mundur menahan laju kursi).',
            '2': 'Maju ke depan pada turunan membuat pasien terlempar ke depan jika tersangkut kerikil.',
            '3': 'Membiarkan meluncur bebas adalah kelalaian fatal.',
            '4': 'Mendorong maju cepat membahayakan nyawa pasien.'
          },
          mnemonicSensei: 'Naik tanjakan = Maju ke depan. Turun turunan curam = MUNDUR pelan-pelan ke belakang!',
          l1InterferenceAlert: 'Banyak pemula salah mengira kursi roda selalu didorong maju ke depan. Ingat: Turunan curam, masuk lift, dan melewati undakan selalu dijalankan mundur!',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kaigo-02',
            unitNumber: 2,
            unitTitleId: 'Mekanika Tubuh & Bantuan Mobilitas',
            lessonId: 'les-ssw-kg-02',
            vocabId: 'vg-ssw-kg-012',
            advice: 'Kuasai teknik operasional keselamatan kursi roda di Unit 2 Kaigo MateriHub.'
          },
          safetyTip: 'Selalu pasang sabuk pengaman kursi roda dan minta lansia meletakkan kaki di atas pijakan (futtoresto).'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kaigo',
          unitId: 'unit-curriculum-ssw-kaigo-02',
          unitNumber: 2,
          unitTitleId: 'Mekanika Tubuh & Bantuan Mobilitas',
          lessonId: 'les-ssw-kg-02',
          vocabId: 'vg-ssw-kg-012'
        }
      },
      {
        id: 'SSW-KG-S01-Q12',
        trackType: 'ssw',
        sswSectorId: 'ssw-kaigo',
        mondaiNumber: 1,
        mondaiType: 'ssw_technical_terminology',
        instructionJp: 'バイタルサインの測定に関する記述として、正しいものを一つ選びなさい。',
        instructionId: 'Pilihlah pemahaman yang benar mengenai pengukuran tanda vital (Vital Signs) lansia.',
        prompt: '健康管理の 基本である「バイタルサイン（生命兆候）」に 含まれない ものは どれですか。',
        options: ['好きな 食べ物の 種類', '体温（たいおん）', '血圧（けつあつ）', '脈拍（みゃくはく：心拍数）'],
        correctOptionIndex: 0,
        explanation: {
          justification: '4 pilar utama tanda vital (Vital Signs) keperawatan: 1. Suhu tubuh (体温), 2. Tekanan darah (血圧), 3. Denyut nadi (脈拍), dan 4. Frekuensi pernapasan (呼吸). Makanan kesukaan bukan tanda vital fisiologis.',
          distractorAutopsy: {
            '1': '好きな 食べ物の 種類 adalah KUNCI BENAR (bukan bagian dari tanda vital medis).',
            '2': 'Suhu tubuh adalah tanda vital utama (normal: 36,0 - 37,0°C).',
            '3': 'Tekanan darah adalah tanda vital utama (sistolik/diastolik).',
            '4': 'Denyut nadi adalah tanda vital utama (normal: 60 - 90 denyut/menit).'
          },
          mnemonicSensei: '4 Tanda Vital Hidup: Suhu, Tensi Darah, Denyut Nadi, Nafas! Tiap pagi wajib dicatat di buku laporan.',
          l1InterferenceAlert: 'Di Jepang, sebelum memandikan lansia atau senam, staf Kaigo wajib melakukan バイタル測定 (pengukuran tanda vital). Jika tensi di atas 160 atau demam di atas 37.5°C, mandi dibatalkan.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kaigo-05',
            unitNumber: 5,
            unitTitleId: 'Komunikasi Medis, Laporan SBAR & Kedaruratan',
            lessonId: 'les-ssw-kg-05',
            vocabId: 'vg-ssw-kg-041',
            advice: 'Pelajari batas angka normal tanda vital lansia di Unit 5 MateriHub.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kaigo',
          unitId: 'unit-curriculum-ssw-kaigo-05',
          unitNumber: 5,
          unitTitleId: 'Komunikasi Medis, Laporan SBAR & Kedaruratan',
          lessonId: 'les-ssw-kg-05',
          vocabId: 'vg-ssw-kg-041'
        }
      },
      {
        id: 'SSW-KG-S01-Q13',
        trackType: 'ssw',
        sswSectorId: 'ssw-kaigo',
        mondaiNumber: 2,
        mondaiType: 'ssw_k3_procedure',
        instructionJp: '排泄介助におけるプライバシーの保護について、適切なものを一つ選びなさい。',
        instructionId: 'Pilihlah etika privasi yang benar saat membantu buang air (Haisetsu) lansia.',
        prompt: 'トイレや おむつ交換での 排泄介助（はいせつかいじょ）で、最も 配慮すべき 点は どれですか。',
        options: [
          'カーテンや ドアを 閉め、露出部分を タオルで 覆って プライバシーと 羞恥心に 配慮する。',
          '廊下から 丸見えの 状態で、ドアを 全開にしたまま おむつを 交換する。',
          '他の 利用者や 職員に 聞こえる 大声で「便が出ましたよ！」と 叫ぶ。',
          '早く 終わらせるために、利用者に 声をかけずに 無言で ズボンを 引きずり下ろす。'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Prinsip perlindungan rasa malu (羞恥心への配慮) dan privasi: Selalu menutup pintu/tirai toilet, menutupi bagian tubuh yang tidak sedang dibersihkan dengan handuk mandi, dan berbicara dengan nada rendah ramah.',
          distractorAutopsy: {
            '1': 'Pilihan 1 adalah KUNCI BENAR (menjaga privasi fisik dan harga diri pasien).',
            '2': 'Membuka pintu kamar mandi melanggar kode etik keperawatan.',
            '3': 'Berteriak mengumumkan kotoran melukai harga diri lansia.',
            '4': 'Menurunkan celana tanpa aba-aba adalah tindakan tidak manusiawi.'
          },
          mnemonicSensei: 'Tutup pintu, tutupi handuk, bicara pelan! Lindungi rasa malu lansia seperti keluarga sendiri.',
          l1InterferenceAlert: 'Dalam standar keperawatan Jepang, Shuchishin (rasa malu/harga diri pribadi) adalah pilar evaluasi tertinggi. Jangan pernah membuka aurat pasien di hadapan orang lain!',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kaigo-04',
            unitNumber: 4,
            unitTitleId: 'Perawatan Kulit, Eliminasi & Pencegahan Dekubitus',
            lessonId: 'les-ssw-kg-04',
            vocabId: 'vg-ssw-kg-033',
            advice: 'Kuasai etika bantuan eliminasi di Unit 4 Kaigo MateriHub.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kaigo',
          unitId: 'unit-curriculum-ssw-kaigo-04',
          unitNumber: 4,
          unitTitleId: 'Perawatan Kulit, Eliminasi & Pencegahan Dekubitus',
          lessonId: 'les-ssw-kg-04',
          vocabId: 'vg-ssw-kg-033'
        }
      },
      {
        id: 'SSW-KG-S01-Q14',
        trackType: 'ssw',
        sswSectorId: 'ssw-kaigo',
        mondaiNumber: 3,
        mondaiType: 'ssw_hou_ren_so_sbar',
        instructionJp: 'ヒヤリ・ハット（事故の一歩手前）の報告について、適切なものを一つ選びなさい。',
        instructionId: 'Pilihlah pemahaman yang benar mengenai pelaporan insiden nyaris celaka (Hiyari-Hatto).',
        prompt: '歩行介助中、利用者が つまずいて 倒れそうになりましたが、間一髪で 支えて 怪我は ありませんでした。この後の 行動として 正しいものは どれですか。',
        options: [
          '怪我が なかったとしても、ヒヤリ・ハット報告書を 書いて 職員全員で 危険要因を 共有・対策する。',
          '怪我を しなかったのだから、誰にも 言わずに 秘密にしておく。',
          '利用者が ドジだったからだと 笑って その場で 忘れる。',
          '始末書を 書かされるのが 怖いので、報告書は 破棄する。'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Prinsip hukum Heinrich: Di balik 1 kecelakaan fatal terdapat 29 kecelakaan ringan dan 300 kejadian nyaris celaka (ヒヤリ・ハット / Hiyari-Hatto). Meskipun tidak ada luka, kejadian nyaris jatuh wajib ditulis laporannya agar karpet/undakan berbahaya bisa segera diperbaiki demi mencegah kecelakaan fatal berikutnya.',
          distractorAutopsy: {
            '1': 'Pilihan 1 adalah KUNCI BENAR (tulis laporan hiyari-hatto untuk evaluasi bersama).',
            '2': 'Merahasiakan insiden menyebabkan perawat lain mengulangi bahaya yang sama hingga pasien patah tulang.',
            '3': 'Menyalahkan pasien adalah pelanggaran etika berat.',
            '4': 'Menyembunyikan laporan adalah budaya buruk yang dilarang di Jepang.'
          },
          mnemonicSensei: 'Hiyari-Hatto = Kaget dan merinding nyaris celaka! Catat dan laporkan agar besok tidak terjadi musibah fatal.',
          l1InterferenceAlert: 'Di budaya kerja Jepang, Hiyari-Hatto BUKAN surat hukuman (bukan surat peringatan SP), melainkan kontribusi berharga untuk keselamatan tim.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kaigo-05',
            unitNumber: 5,
            unitTitleId: 'Komunikasi Medis, Laporan SBAR & Kedaruratan',
            lessonId: 'les-ssw-kg-05',
            vocabId: 'vg-ssw-kg-041',
            advice: 'Pelajari mekanisme keselamatan kerja Hiyari-Hatto di Unit 5 MateriHub.'
          },
          safetyTip: 'Segera periksa apakah ada kabel menjuntai, genangan air, atau sandal licin yang memicu insiden tersebut.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kaigo',
          unitId: 'unit-curriculum-ssw-kaigo-05',
          unitNumber: 5,
          unitTitleId: 'Komunikasi Medis, Laporan SBAR & Kedaruratan',
          lessonId: 'les-ssw-kg-05',
          vocabId: 'vg-ssw-kg-041'
        }
      },
      {
        id: 'SSW-KG-S01-Q15',
        trackType: 'ssw',
        sswSectorId: 'ssw-kaigo',
        mondaiNumber: 2,
        mondaiType: 'ssw_k3_procedure',
        instructionJp: '身体拘束（しんたいこうそく）の禁止に関する原則として、正しいものを一つ選びなさい。',
        instructionId: 'Pilihlah prinsip larangan pengekangan fisik (Shintai Kousoku Kinshi) pada lansia.',
        prompt: '介護現場における「身体拘束（利用者の体を縛る・行動を制限する行為）」について、正しいルールは どれですか。',
        options: [
          '身体拘束は 原則として「法律で禁止」されており、切迫性・非代替性・一時性の3要件を 満たさない限り 絶対に 行ってはならない。',
          '職員が 忙しくて 見守りできない ときは、いつでも ベッドに 縛り付けてよい。',
          '車いすから 立ち上がろうとする 利用者は、全員 紐で 椅子に 固定するのが 当たり前である。',
          '認知症の 利用者には、人権が ないので 部屋に 鍵をかけて 閉じ込めても 法律上 問題ない。'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Pengekangan fisik (身体拘束 / Shintai Kousoku) diatur ketat oleh UU Perawatan Lansia Jepang dan dilarang keras. Hanya boleh dilakukan dalam kondisi darurat ekstrim yang memenuhi 3 kriteria mutlak: 1. Mendesak membahayakan nyawa (切迫性), 2. Tidak ada alternatif lain (非代替性), dan 3. Bersifat sementara waktu (一時性), dengan persetujuan keluarga dan dokter.',
          distractorAutopsy: {
            '1': 'Pilihan 1 adalah KUNCI BENAR (prinsip larangan mutlak kecuali 3 syarat darurat terpenuhi).',
            '2': 'Mengikat pasien karena staf sibuk adalah tindak pidana penganiayaan hukum.',
            '3': 'Mengikat lansia di kursi roda adalah pelanggaran HAM berat.',
            '4': 'Mengabaikan hak asasi penderita demensia adalah tindakan melanggar hukum.'
          },
          mnemonicSensei: 'Shintai Kousoku = HARAM HUKUMNYA mengikat pasien! Kecuali 3 syarat darurat: Darurat nyawa, Tanpa alternatif, Sementara waktu.',
          l1InterferenceAlert: 'Di Jepang, memasang pagar ranjang 4 sisi penuh (sehingga lansia terkunci tidak bisa turun kasur) pun dikategorikan sebagai tindakan pengekangan fisik ilegal (身体拘束) jika tanpa indikasi dokter resmi.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kaigo-01',
            unitNumber: 1,
            unitTitleId: 'Dasar Keperawatan Lansia & Anatomi Tubuh',
            lessonId: 'les-ssw-kg-01',
            vocabId: 'vg-ssw-kg-001',
            advice: 'Pelajari aturan hukum larangan Shintai Kousoku di Unit 1 Kaigo MateriHub.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kaigo',
          unitId: 'unit-curriculum-ssw-kaigo-01',
          unitNumber: 1,
          unitTitleId: 'Dasar Keperawatan Lansia & Anatomi Tubuh',
          lessonId: 'les-ssw-kg-01',
          vocabId: 'vg-ssw-kg-001'
        }
      }
    ]
  };
}

module.exports = { getSSWKaigoSet };
