/**
 * SSW Food Manufacturing (飲食料品製造業) Golden Set 01
 * Grounded in OTAFF / MAFF Official Food Manufacturing Textbooks
 * 15 Items: Factory 5S, Foreign Object Detection, Metal Detectors, Air Showers, HACCP & Rapid Chilling
 */

function getSSWFoodMfgSet() {
  return {
    setId: 'ssw-food-mfg-set01',
    trackType: 'ssw',
    sswSectorId: 'ssw-food-mfg',
    title: 'Set Latihan SSW Food Manufacturing - 01',
    description: 'Simulasi modular 15 menit menguji standar sanitasi pabrik pengolahan pangan, deteksi logam, air shower, protokol pakaian kerja steril, dan pendinginan cepat HACCP.',
    targetUnits: 'Kurikulum Vokasional Pengolahan Pangan: Sanitasi Pabrik, 5S, Deteksi Logam & Titik Kendali Kritis CCP',
    totalItems: 15,
    timeLimitMinutes: 15,
    passingScore: 10,
    items: [
      {
        id: 'SSW-FM-S01-Q01',
        trackType: 'ssw',
        sswSectorId: 'ssw-food-mfg',
        mondaiNumber: 1,
        mondaiType: 'ssw_technical_terminology',
        instructionJp: '食品工場への入場手順として、正しいものを一つ選びなさい。',
        instructionId: 'Pilihlah prosedur masuk ke area steril pabrik pengolahan pangan yang benar.',
        prompt: '製造エリア（クリーンルーム）に 入る直前に、衣服についた 髪の毛や ホコリを 風で 吹き飛ばす 設備の 名前は 何ですか。',
        targetWord: 'エアーシャワー',
        options: ['エアーシャワー（Air Shower）', 'サウナ', '扇風機', 'ドライヤー'],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Ruang bilik bertekanan udara tinggi yang menyemprotkan angin steril kencang untuk merontokkan debu, serat pakaian, dan rambut sebelum operator masuk ke ruang produksi pabrik disebut 「エアーシャワー (Air Shower)」.',
          distractorAutopsy: {
            '1': 'エアーシャワー adalah KUNCI BENAR (Air shower pembersih partikel pakaian).',
            '2': 'サウナ (sauna) adalah fasilitas pemandian uap panas.',
            '3': '扇風機 (kipas angin biasa) tidak memiliki filter HEPA penyaring kuman.',
            '4': 'ドライヤー (pengering rambut) adalah alat pengering rambut rumah tangga.'
          },
          mnemonicSensei: 'Mandi angin steril sebelum masuk pabrik = Air Shower! Berputar 360 derajat sambil mengangkat tangan.',
          l1InterferenceAlert: 'Di pabrik makanan Jepang, saat berada di dalam Air Shower Anda wajib berputar perlahan dan mengangkat kedua tangan agar hembusan angin mengenai seluruh lipatan ketiak dan baju.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-food-01',
            unitNumber: 1,
            unitTitleId: 'Sanitasi Pabrik Pangan & Protokol Masuk Ruang Bersih',
            lessonId: 'les-ssw-fm-01',
            vocabId: 'vg-ssw-fm-001',
            advice: 'Pelajari alur memasuki area steril pabrik di Unit 1 Food Manufacturing MateriHub.'
          },
          safetyTip: 'Gunakan rol perekat (roller) terlebih dahulu sebelum melangkah masuk ke bilik Air Shower.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-food-mfg',
          unitId: 'unit-curriculum-ssw-food-01',
          unitNumber: 1,
          unitTitleId: 'Sanitasi Pabrik Pangan & Protokol Masuk Ruang Bersih',
          lessonId: 'les-ssw-fm-01',
          vocabId: 'vg-ssw-fm-001'
        }
      },
      {
        id: 'SSW-FM-S01-Q02',
        trackType: 'ssw',
        sswSectorId: 'ssw-food-mfg',
        mondaiNumber: 1,
        mondaiType: 'ssw_technical_terminology',
        instructionJp: '異物混入防止機器の名称として、正しいものを一つ選びなさい。',
        instructionId: 'Pilihlah nama mesin pendeteksi benda asing berikut yang benar.',
        prompt: '製品の中に 折れた 針や ボルトなどの 金属片が 混入していないかを 調べる 機械は どれですか。',
        targetWord: '金属検出機',
        options: ['金属検出機（きんぞく・けんしゅつき）', '電子レンジ', '自動販売機', '食器洗浄機'],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Alat deteksi logam kritis di lini pengemasan pabrik makanan untuk mencegah bahaya fisik tertelannya serpihan besi/baja oleh konsumen disebut 「金属検出機 (Metal Detector)」 atau X線異物検出機.',
          distractorAutopsy: {
            '1': '金属検出機 adalah KUNCI BENAR (mesin detektor logam CCP pabrik).',
            '2': '電子レンジ adalah microwave penghangat makanan.',
            '3': '自動販売機 adalah mesin penjual minuman otomatis (vending machine).',
            '4': '食器洗浄機 adalah mesin pencuci piring.'
          },
          mnemonicSensei: 'Kinzoku (logam) + Kenshutsu (deteksi) + Ki (mesin) = Metal Detector pencegah serpihan jarum/baut!',
          l1InterferenceAlert: 'Setiap hari sebelum operasional dimulai, operator wajib menguji mesin ini menggunakan potongan logam uji standar (Test Piece Fe dan Sus) untuk memastikan alarm berbunyi.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-food-02',
            unitNumber: 2,
            unitTitleId: 'Pencegahan Benda Asing & Pengoperasian Mesin Produksi',
            lessonId: 'les-ssw-fm-02',
            vocabId: 'vg-ssw-fm-012',
            advice: 'Pelajari uji fungsi harian mesin detektor logam di Unit 2 MateriHub.'
          },
          safetyTip: 'Jika alarm detektor logam berbunyi, produk harus disingkirkan ke kotak karantina terkunci (reject box).'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-food-mfg',
          unitId: 'unit-curriculum-ssw-food-02',
          unitNumber: 2,
          unitTitleId: 'Pencegahan Benda Asing & Pengoperasian Mesin Produksi',
          lessonId: 'les-ssw-fm-02',
          vocabId: 'vg-ssw-fm-012'
        }
      },
      {
        id: 'SSW-FM-S01-Q03',
        trackType: 'ssw',
        sswSectorId: 'ssw-food-mfg',
        mondaiNumber: 2,
        mondaiType: 'ssw_k3_procedure',
        instructionJp: '作業着（白衣・帽子）の正しい着用方法について、適切なものを一つ選びなさい。',
        instructionId: 'Pilihlah cara mengenakan seragam kerja steril (Hakui) dan jaring rambut yang benar di pabrik makanan.',
        prompt: '工場内での 異物混入（髪の毛の混入）を 防ぐ 着替えの ルールとして、正しいものは どれですか。',
        options: [
          'インナーネットをかぶり、前髪や後れ毛を 1本も 外に出さずに 完全に帽子の中に収める。',
          'おしゃれのために、前髪を 帽子の 外に 大きく 出して 作業する。',
          '長髪であっても 髪を結ばず、帽子を かぶらずに 作業エリアに入る。',
          '作業着の ポケットに 私物の スマホや 小銭、ヘアピンを 入れて 持ち込む。'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Pencegahan rambut rontok (毛髪混入防止): Rambut wajib diikat rapi, ditutup jaring dalam (インナーネット), dan seluruh helaian rambut tanpa sisa 1 helai pun harus masuk ke dalam topi steril (帽子の中に収める). Membawa perhiasan, uang koin, atau ponsel ke ruang bersih dilarang keras.',
          distractorAutopsy: {
            '1': 'Pilihan 1 adalah KUNCI BENAR (tidak ada 1 helai rambut pun yang mencuat keluar).',
            '2': 'Mengeluarkan poni rambut demi gaya adalah pelanggaran fatal di pabrik Jepang.',
            '3': 'Tidak mengikat rambut memicu kontaminasi rambut di bento/makanan pabrik.',
            '4': 'Membawa jepit rambut atau ponsel ke ruang produksi melanggar aturan benda asing (benda logam bisa jatuh ke adonan).'
          },
          mnemonicSensei: 'Satu helai rambut keluar = Gagal lulus inspeksi cermin! Tutup rapat dengan inner net.',
          l1InterferenceAlert: 'Di pabrik makanan Jepang, terdapat inspeksi cermin seluruh badan (Sugatami) di mana pekerja saling memeriksa rambut rekannya sebelum masuk lini kerja.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-food-01',
            unitNumber: 1,
            unitTitleId: 'Sanitasi Pabrik Pangan & Protokol Masuk Ruang Bersih',
            lessonId: 'les-ssw-fm-01',
            vocabId: 'vg-ssw-fm-005',
            advice: 'Pelajari aturan pakaian kerja higienis pabrik di Unit 1 MateriHub.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-food-mfg',
          unitId: 'unit-curriculum-ssw-food-01',
          unitNumber: 1,
          unitTitleId: 'Sanitasi Pabrik Pangan & Protokol Masuk Ruang Bersih',
          lessonId: 'les-ssw-fm-01',
          vocabId: 'vg-ssw-fm-005'
        }
      },
      {
        id: 'SSW-FM-S01-Q04',
        trackType: 'ssw',
        sswSectorId: 'ssw-food-mfg',
        mondaiNumber: 2,
        mondaiType: 'ssw_k3_procedure',
        instructionJp: '加熱調理後の「急速冷却」の重要性について、正しい記述を一つ選びなさい。',
        instructionId: 'Pilihlah alasan ilmiah pentingnya prosedur pendinginan cepat (Kyuusoku Reikyaku) setelah makanan dimasak.',
        prompt: '加熱した スープや 惣菜を、調理後 すみやかに 冷やす（急速冷却する）最大の 理由は 何ですか。',
        options: [
          '細菌が 増殖しやすい 危険温度帯（60℃〜10℃）を 短時間で 通過させ、ウェルシュ菌などの 増殖を 抑えるため。',
          '早く 食べると 舌を 火傷するから、食べる人の 口腔ケアの ため。',
          '冷たい 料理の ほうが、味が 濃く 感じられて 美味しいから。',
          '工場の 室温を 下げるための クーラー代わりに するため。'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Alasan pendinginan cepat (急速冷却): Bakteri pembentuk spora seperti Clostridium perfringens (ウェルシュ菌) dapat bertahan dari perebusan dan berkembang biak ganas saat suhu mendingin perlahan di rentang 60°C sampai 20°C. Makanan wajib diturunkan suhunya dari 60°C ke bawah 10°C dalam waktu secepat mungkin (kurang dari 60 menit) menggunakan blast chiller.',
          distractorAutopsy: {
            '1': 'Pilihan 1 adalah KUNCI BENAR (memangkas durasi berada di zona bahaya kuman pembentuk spora).',
            '2': 'Bukan untuk mencegah lidah terbakar konsumen.',
            '3': 'Bukan urusan selera rasa masakan.',
            '4': 'Bukan untuk mendinginkan ruangan pabrik.'
          },
          mnemonicSensei: 'Jangan biarkan sup dingin pelan-pelan di panci besar! Kuman Welchia bangun dari spora. Dinginkan kilat di blast chiller.',
          l1InterferenceAlert: 'Di Indonesia kari atau gulai sering dibiarkan di panci besar semalaman di suhu kamar. Di Jepang, membiarkan kuah mengendap mendingin perlahan adalah penyebab nomor satu keracunan massal bakteri Welchia!',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-food-03',
            unitNumber: 3,
            unitTitleId: 'Pengendalian Mikrobiologi, Suhu Dingin & Pembekuan',
            lessonId: 'les-ssw-fm-03',
            vocabId: 'vg-ssw-fm-025',
            advice: 'Kuasai karakteristik bakteri pembentuk spora di Unit 3 Food Manufacturing.'
          },
          safetyTip: 'Gunakan wadah dangkal yang lebar dan es pendingin saat membagi makanan agar panas cepat keluar merata.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-food-mfg',
          unitId: 'unit-curriculum-ssw-food-03',
          unitNumber: 3,
          unitTitleId: 'Pengendalian Mikrobiologi, Suhu Dingin & Pembekuan',
          lessonId: 'les-ssw-fm-03',
          vocabId: 'vg-ssw-fm-025'
        }
      },
      {
        id: 'SSW-FM-S01-Q05',
        trackType: 'ssw',
        sswSectorId: 'ssw-food-mfg',
        mondaiNumber: 3,
        mondaiType: 'ssw_hou_ren_so_sbar',
        instructionJp: 'ライン作業中の異常発生時の報告について、最も適切なものを一つ選びなさい。',
        instructionId: 'Pilihlah tindakan pelaporan yang benar saat mesin pembungkus mengalami kejanggalan suara suara keras.',
        prompt: '包装ラインで 作業中、包装機から「ガガガ」という 異音がして、製品の シール（圧着）が ずれているのを 発見しました。どう行動しますか。',
        options: [
          'すぐに 非常停止ボタンを 押して 機械を 止め、班長（ラインリーダー）に「機械から異音がしてシールが不良です」と 報告する。',
          '故障していても 面倒だから、何も 見なかったことにして 作業を 続ける。',
          '機械が 動いたまま、手袋を はめて 回転部に 手を 突っ込んで 直そうとする。',
          '終業時間（定時）に なるまで 誰にも 言わずに 黙っている。'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Prinsip penanganan abnormalitas pabrik (異常時の3原則: 止める・呼ぶ・待つ / Hentikan, Panggil, Tunggu): 1. Segera tekan tombol berhenti darurat (非常停止ボタンを押す), 2. Panggil dan laporkan kejadian abnormal ke ketua regu/mandor. Dilarang memasukkan tangan ke mesin yang sedang beroperasi.',
          distractorAutopsy: {
            '1': 'Pilihan 1 adalah KUNCI BENAR (tekan tombol stop darurat dan lapor mandor).',
            '2': 'Meneruskan kerja menghasilkan ribuan produk cacat bocor yang merugikan pabrik.',
            '3': 'Memasukkan tangan ke mesin bergerak memicu kecelakaan terhimpit fatal.',
            '4': 'Berdiam diri hingga jam pulang melanggar etika Hou-Ren-So pabrik.'
          },
          mnemonicSensei: '3 Prinsip Anomali: TOMERU (Stop mesin), YOBU (Panggil leader), MATSU (Tunggu instruksi)!',
          l1InterferenceAlert: 'Di Jepang, jangan pernah mencoba mereparasi mesin berputar sendirian tanpa lisensi maintenance teknisi (Hozen). Anda bisa kehilangan tangan seketika!',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-food-04',
            unitNumber: 4,
            unitTitleId: 'Keselamatan Kerja Mesin Pabrik & K3 Gemba',
            lessonId: 'les-ssw-fm-04',
            vocabId: 'vg-ssw-fm-034',
            advice: 'Pelajari aturan 止める・呼ぶ・待つ di Unit 4 Food Manufacturing MateriHub.'
          },
          safetyTip: 'Ketahui lokasi tombol darurat (Emergency Stop / Hijou-teishi) di sekitar stasiun kerja Anda.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-food-mfg',
          unitId: 'unit-curriculum-ssw-food-04',
          unitNumber: 4,
          unitTitleId: 'Keselamatan Kerja Mesin Pabrik & K3 Gemba',
          lessonId: 'les-ssw-fm-04',
          vocabId: 'vg-ssw-fm-034'
        }
      },
      {
        id: 'SSW-FM-S01-Q06',
        trackType: 'ssw',
        sswSectorId: 'ssw-food-mfg',
        mondaiNumber: 1,
        mondaiType: 'ssw_technical_terminology',
        instructionJp: '清掃・殺菌用薬品の取り扱いについて、正しいものを一つ選びなさい。',
        instructionId: 'Pilihlah aturan penggunaan cairan disinfektan pemutih/klorin (Sodium Hypochlorite) yang benar.',
        prompt: 'まな板や 床の 殺菌消毒に 使う「次亜塩素酸ナトリウム（じあえんそさん・ナトリウム）」を 扱う際の 厳禁事項は どれですか。',
        options: [
          '酸性（さんせい）の 洗剤と 混ぜてはならない（有毒な 塩素ガスが 発生して 命に関わる）。',
          '水で 希釈（薄めて）使ってはならない。',
          '保護手袋を 着用して 取り扱ってはならない。',
          '換気を 行いながら 使用してはならない。'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Peringatan maut bahan kimia (まぜるな危険): Sodium hypochlorite (klorin pemutih klorin) bersifat alkali. Jika TERCAMPUR dengan pembersih berbahan asam (酸性洗剤), akan memicu reaksi kimia berbahaya yang melepaskan gas klorin beracun (有毒な塩素ガス) yang dapat mematikan paru-paru seketika.',
          distractorAutopsy: {
            '1': 'Pilihan 1 adalah KUNCI BENAR (larangan mutlak: jangan campur dengan pembersih asam).',
            '2': 'Klorin wajib diencerkan dengan air sesuai ppm takaran resmi pabrik.',
            '3': 'Sarung tangan pelindung karet justru wajib dipakai agar kulit tidak melepuh.',
            '4': 'Ventilasi udara justru wajib dibuka lebar.'
          },
          mnemonicSensei: 'Mazeru na Kiken! Klorin + Asam = GAS BERACUN MEMATIKAN. Jangan pernah campur dua botol kimia berbeda!',
          l1InterferenceAlert: 'Di botol kimia Jepang terdapat tulisan besar warna kuning-merah: 【まぜるな危険 (DILARANG CAMPUR)】. Ini materi K3 kimia nomor satu di pabrik pangan dan cleaning.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-food-01',
            unitNumber: 1,
            unitTitleId: 'Sanitasi Pabrik Pangan & Protokol Masuk Ruang Bersih',
            lessonId: 'les-ssw-fm-01',
            vocabId: 'vg-ssw-fm-008',
            advice: 'Pelajari lembar keselamatan bahan kimia (MSDS / SDS) di Unit 1 MateriHub.'
          },
          safetyTip: 'Gunakan kacamata pelindung (goggles) saat menuang konsentrat klorin pekat.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-food-mfg',
          unitId: 'unit-curriculum-ssw-food-01',
          unitNumber: 1,
          unitTitleId: 'Sanitasi Pabrik Pangan & Protokol Masuk Ruang Bersih',
          lessonId: 'les-ssw-fm-01',
          vocabId: 'vg-ssw-fm-008'
        }
      },
      {
        id: 'SSW-FM-S01-Q07',
        trackType: 'ssw',
        sswSectorId: 'ssw-food-mfg',
        mondaiNumber: 2,
        mondaiType: 'ssw_k3_procedure',
        instructionJp: 'ローラー掛け（粘着ローラー）の正しい使い方について、適切なものを一つ選びなさい。',
        instructionId: 'Pilihlah cara penggunaan rol perekat pembersih debu pakaian (Lint Roller) yang benar sebelum masuk ruang produksi.',
        prompt: 'エアシャワーの 前で、粘着ローラー（コロコロ）を 作業着に かける 正しい ルールは どれですか。',
        options: [
          '上から下へ、頭部・肩・背中・腕・脚の 順番で、2人 1組（ペア）で かけ合い、見えない 背中も 徹底的に 取る。',
          '自分 1人で、お腹の 部分だけ 1秒間 転がして 終了する。',
          '髪の毛が たくさん ついた 汚れた シートのまま、紙を めくらずに 何日も 使い回す。',
          'ローラーの 粘着シートが もったいないので、転がさずに 眺めるだけにする。'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Aturan pemakaian roller perekat (粘着ローラー / nenchaku rooraa): Dilakukan secara berpasangan dua orang (ペアチェック) dari atas ke bawah untuk menyisir area punggung dan bahu yang tidak bisa dilihat dan dijangkau sendiri oleh mata pekerja, serta wajib mengelupas lembaran perekat jika sudah kotor.',
          distractorAutopsy: {
            '1': 'Pilihan 1 adalah KUNCI BENAR (pemeriksaan berpasangan 2 orang atas-bawah).',
            '2': 'Mengusap perut sendiri 1 detik tidak membersihkan area punggung tempat rambut rontok bersarang.',
            '3': 'Kertas rol wajib disobek ganti baru begitu daya rekatnya berkurang.',
            '4': 'Tidak menggunakan roller melanggar SOP ruang bersih.'
          },
          mnemonicSensei: 'Roller sistem pasangan! Kamu bersihkan punggung temanmu, temanmu bersihkan punggungmu.',
          l1InterferenceAlert: 'Di pabrik Jepang, pemeriksaan berpasangan (Sogo chekku / Peer check) adalah standar wajib di depan pintu Air Shower.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-food-01',
            unitNumber: 1,
            unitTitleId: 'Sanitasi Pabrik Pangan & Protokol Masuk Ruang Bersih',
            lessonId: 'les-ssw-fm-01',
            vocabId: 'vg-ssw-fm-005',
            advice: 'Pelajari SOP pintu masuk ruang bersih di Unit 1 Food Manufacturing.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-food-mfg',
          unitId: 'unit-curriculum-ssw-food-01',
          unitNumber: 1,
          unitTitleId: 'Sanitasi Pabrik Pangan & Protokol Masuk Ruang Bersih',
          lessonId: 'les-ssw-fm-01',
          vocabId: 'vg-ssw-fm-005'
        }
      },
      {
        id: 'SSW-FM-S01-Q08',
        trackType: 'ssw',
        sswSectorId: 'ssw-food-mfg',
        mondaiNumber: 1,
        mondaiType: 'ssw_technical_terminology',
        instructionJp: '食品工場の「清浄度区分（ゾーニング）」について、正しいものを一つ選びなさい。',
        instructionId: 'Pilihlah pemahaman zonasi kebersihan pabrik (Zoning) yang benar.',
        prompt: '食品工場において、加熱後の 製品の 冷却や 盛り付けを 行う、最も 衛生管理が 厳しい 区域を 何と 呼びますか。',
        options: ['清潔作業区域（クリーンエリア）', '汚染作業区域', '一般作業区域', '外部搬入区域'],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Zonasi sanitasi pabrik pangan: 1. 汚染作業区域 (Area kotor: penerimaan bahan mentah kotor, bongkar muat), 2. 準清潔作業区域 (Area semi-bersih: pemotongan, penimbangan, pemanasan awal), 3. 清潔作業区域 (Area bersih/steril: pendinginan, pengemasan steril setelah pemanasan). Makanan yang sudah matang diolah di 清潔作業区域.',
          distractorAutopsy: {
            '1': '清潔作業区域 adalah KUNCI BENAR (ruang bersih steril dengan tekanan udara positif).',
            '2': '汚染作業区域 adalah area kotor penerimaan awal.',
            '3': '一般作業区域 adalah area koridor umum.',
            '4': '外部搬入区域 adalah dermaga truk bongkar muat luar.'
          },
          mnemonicSensei: 'Pabrik makanan dibagi 3 zona: Kotor (Osen) -> Semi-bersih (Jun-seiketsu) -> Bersih Steril (Seiketsu)! Arah aliran tidak boleh berbalik.',
          l1InterferenceAlert: 'Pekerja dari Area Kotor dilarang melangkah masuk ke Area Bersih Steril tanpa berganti seragam kerja dan melewati bilik dekontaminasi Air Shower!',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-food-01',
            unitNumber: 1,
            unitTitleId: 'Sanitasi Pabrik Pangan & Protokol Masuk Ruang Bersih',
            lessonId: 'les-ssw-fm-01',
            vocabId: 'vg-ssw-fm-001',
            advice: 'Pelajari peta zonasi sanitasi pabrik (Zoning Concept) di Unit 1 MateriHub.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-food-mfg',
          unitId: 'unit-curriculum-ssw-food-01',
          unitNumber: 1,
          unitTitleId: 'Sanitasi Pabrik Pangan & Protokol Masuk Ruang Bersih',
          lessonId: 'les-ssw-fm-01',
          vocabId: 'vg-ssw-fm-001'
        }
      },
      {
        id: 'SSW-FM-S01-Q09',
        trackType: 'ssw',
        sswSectorId: 'ssw-food-mfg',
        mondaiNumber: 2,
        mondaiType: 'ssw_k3_procedure',
        instructionJp: '食品の計量機器の日常点検について、適切なものを一つ選びなさい。',
        instructionId: 'Pilihlah prosedur kalibrasi timbangan digital harian (Tenken) yang benar.',
        prompt: '調味料や 原料を 正確に 量るための 電子天秤（デジタルはかり）の 始業前点検として、正しいものは どれですか。',
        options: [
          '水平器で 水平を 確認し、基準分銅（おもり）を 乗せて 正しい 重さが 表示されるか 校正・点検する。',
          '電源を 入れたら 何も 確認せず、勘で 適当に 計量し始める。',
          'はかりの上に 重い 荷物を 投げ落として、耐久テストを する。',
          '目盛りが ゼロに 合っていなくても、気にせず そのまま 使う。'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Kalibrasi harian timbangan: Memastikan posisi timbangan datar dengan melihat waterpass (水平器), membersihkan piring timbang, meletakkan anak timbangan standar acuan resmi (基準分銅 / bundou), dan mencatat hasil uji kalibrasi sebelum digunakan meracik bahan baku.',
          distractorAutopsy: {
            '1': 'Pilihan 1 adalah KUNCI BENAR (cek waterpass datar dan uji dengan anak timbangan standar).',
            '2': 'Menimbang berdasarkan perasaan menyebabkan takaran garam/pengawet salah dosis.',
            '3': 'Membanting beban merusak sensor load cell timbangan presisi.',
            '4': 'Tidak menyetel titik nol (tare) membuat timbangan menyimpang.'
          },
          mnemonicSensei: 'Cek gelembung waterpass di tengah, tes pakai anak timbangan standar! Titik nol wajib akurat.',
          l1InterferenceAlert: 'Di pabrik makanan Jepang, salah takaran alergen atau garam akibat timbangan melenceng bisa memicu penarikan produk (recall) senilai miliaran yen.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-food-02',
            unitNumber: 2,
            unitTitleId: 'Pencegahan Benda Asing & Pengoperasian Mesin Produksi',
            lessonId: 'les-ssw-fm-02',
            vocabId: 'vg-ssw-fm-015',
            advice: 'Pelajari lembar periksa kalibrasi timbangan di Unit 2 MateriHub.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-food-mfg',
          unitId: 'unit-curriculum-ssw-food-02',
          unitNumber: 2,
          unitTitleId: 'Pencegahan Benda Asing & Pengoperasian Mesin Produksi',
          lessonId: 'les-ssw-fm-02',
          vocabId: 'vg-ssw-fm-015'
        }
      },
      {
        id: 'SSW-FM-S01-Q10',
        trackType: 'ssw',
        sswSectorId: 'ssw-food-mfg',
        mondaiNumber: 1,
        mondaiType: 'ssw_technical_terminology',
        instructionJp: '食品の賞味期限と消費期限の違いについて、正しいものを一つ選びなさい。',
        instructionId: 'Pilihlah perbedaan antara batas kualitas rasa (Shoumi Kigen) dan batas aman konsumsi (Shouhi Kigen) yang benar.',
        prompt: 'サンドイッチや 刺身など、傷みやすい（腐りやすい）食品に 表示される、安全に 食べられる 期限を 何と 言いますか。',
        options: ['消費期限（しょうひ・きげん）', '賞味期限（しょうみ・きげん）', '製造日（せいぞうび）', '出荷日（しゅっかび）'],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Perbedaan dua tanggal kadaluwarsa Jepang: 1. 「消費期限 (Shouhi Kigen - Use by date)」: Batas waktu MAKSIMAL makanan aman dimakan tanpa risiko keracunan (untuk makanan segar cepat busuk: susu, roti bento, daging segar). 2. 「賞味期限 (Shoumi Kigen - Best before date)」: Batas waktu rasa makanan masih lezat prima (untuk makanan awet: mi instan, keripik, kaleng).',
          distractorAutopsy: {
            '1': '消費期限 adalah KUNCI BENAR (batas aman kesehatan untuk makanan cepat busuk).',
            '2': '賞味期限 adalah batas rasa lezat untuk makanan awet tahan lama.',
            '3': '製造日 adalah tanggal diproduksi di pabrik.',
            '4': '出荷日 adalah tanggal dikirim keluar gudang.'
          },
          mnemonicSensei: 'SHOUHI = Habiskan demi nyawa! Makanan segar cepat basi. SHOUMI = Rasa masih enak (Ajimi)! Makanan kering awet.',
          l1InterferenceAlert: 'Dalam bahasa Indonesia kita hanya memakai kata \"kadaluwarsa\". Di Jepang, lewat dari 消費期限 (Shouhi Kigen) dilarang dimakan karena membahayakan kesehatan!',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-food-03',
            unitNumber: 3,
            unitTitleId: 'Pengendalian Mikrobiologi, Suhu Dingin & Pembekuan',
            lessonId: 'les-ssw-fm-03',
            vocabId: 'vg-ssw-fm-028',
            advice: 'Kuasai perbedaan hukum Shoumi vs Shouhi Kigen di Unit 3 MateriHub.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-food-mfg',
          unitId: 'unit-curriculum-ssw-food-03',
          unitNumber: 3,
          unitTitleId: 'Pengendalian Mikrobiologi, Suhu Dingin & Pembekuan',
          lessonId: 'les-ssw-fm-03',
          vocabId: 'vg-ssw-fm-028'
        }
      },
      {
        id: 'SSW-FM-S01-Q11',
        trackType: 'ssw',
        sswSectorId: 'ssw-food-mfg',
        mondaiNumber: 2,
        mondaiType: 'ssw_k3_procedure',
        instructionJp: '清掃用具の管理方法について、適切なものを一つ選びなさい。',
        instructionId: 'Pilihlah cara merawat dan mengeringkan peralatan kebersihan (pel, sapu, sikat) yang benar di pabrik makanan.',
        prompt: '床を 清掃した 後の モップや デッキブラシの 保管方法として、正しいものは どれですか。',
        options: [
          '洗剤で 洗って 消毒した後、毛先を 下にして 吊るし、床から 離して 完全に 乾燥させる。',
          '泥や 泡が ついたまま、バケツの 汚水の中に つけっぱなしにしておく。',
          '濡れた モップを 床の上に 直接 丸めて 放置する。',
          '製造ラインの コンベアの 上に モップを 置いて 乾かす。'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Sanitasi peralatan kebersihan: Sikat dan pel lantai setelah dicuci dan disanitasi harus digantung dengan kepala sikat menghadap ke bawah, tidak menyentuh lantai (床から離して吊るす), di tempat berventilasi baik agar cepat kering sempurna dan tidak menjadi sarang lumut dan kuman.',
          distractorAutopsy: {
            '1': 'Pilihan 1 adalah KUNCI BENAR (dicuci, digantung terpisah dari lantai hingga kering).',
            '2': 'Merendam di air kotor membiakkan miliaran bakteri pembusuk.',
            '3': 'Membiarkan di lantai membuat jamur dan lumut menempel di lantai ruang produksi.',
            '4': 'Menaruh alat pel di atas conveyor makanan adalah pelanggaran higienitas fatal.'
          },
          mnemonicSensei: 'Gantung pel di gantungan dinding, jangan sentuh lantai! Biarkan kering tertiup angin.',
          l1InterferenceAlert: 'Peralatan pembersih toilet dilarang keras dicampur dengan peralatan pembersih lantai dapur. Warna gagang pel wajib dibedakan (misal kuning toilet, biru dapur)!',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-food-01',
            unitNumber: 1,
            unitTitleId: 'Sanitasi Pabrik Pangan & Protokol Masuk Ruang Bersih',
            lessonId: 'les-ssw-fm-01',
            vocabId: 'vg-ssw-fm-008',
            advice: 'Pelajari manajemen zonasi alat kebersihan di Unit 1 MateriHub.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-food-mfg',
          unitId: 'unit-curriculum-ssw-food-01',
          unitNumber: 1,
          unitTitleId: 'Sanitasi Pabrik Pangan & Protokol Masuk Ruang Bersih',
          lessonId: 'les-ssw-fm-01',
          vocabId: 'vg-ssw-fm-008'
        }
      },
      {
        id: 'SSW-FM-S01-Q12',
        trackType: 'ssw',
        sswSectorId: 'ssw-food-mfg',
        mondaiNumber: 2,
        mondaiType: 'ssw_k3_procedure',
        instructionJp: '食品工場での怪我（手指の切り傷）の処置とルールについて、正しいものを一つ選びなさい。',
        instructionId: 'Pilihlah prosedur penanganan luka gores jari tangan (Kirisizu) di lini produksi makanan.',
        prompt: '作業中に 段ボールの 端で 指を 切って 出血しました。正しい 対応は どれですか。',
        options: [
          'すぐに 作業を 中断して 班長に 報告し、消毒後、金属探知機に 反応する「青い絆創膏」を 貼り、その上から 手袋を 2重に はめる。',
          '血が 食品に 垂れても 気にせず、手で 拭きながら 作業を 続ける。',
          '肌色の 普通の 絆創膏を 貼り、手袋を せずに 素手で 食品を 触る。',
          '怪我を 隠すために、ポケットに 手を 入れて 隠しておく。'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Penanganan luka di pabrik makanan: 1. Segera lapor ketua regu, 2. Luka dibersihkan disinfektan, 3. Memakai plester luka khusus pabrik berwarna biru mencolok yang memiliki lapisan foil logam di dalamnya (青い金属探知機対応絆創膏), 4. Mengenakan sarung tangan plastik agar darah tidak mencemari bakteri Staphylococcus aureus (黄色ブドウ球菌) ke makanan.',
          distractorAutopsy: {
            '1': 'Pilihan 1 adalah KUNCI BENAR (plester biru deteksi logam + sarung tangan pelindung).',
            '2': 'Darah menetes mencemari produk dengan bakteri Staphylococcus aureus patogen berbahaya.',
            '3': 'Plester warna kulit biasa jika jatuh ke makanan sulit terlihat mata dan tidak terdeteksi mesin logam.',
            '4': 'Menyembunyikan luka dilarang keras.'
          },
          mnemonicSensei: 'Plester pabrik wajib WARNA BIRU dan MENGANDUNG LOGAM! Supaya kalau jatuh, langsung ketahuan mata dan bunyi di mesin detektor.',
          l1InterferenceAlert: 'Luka bernanah mengandung bakteri Staphylococcus aureus (黄色ブドウ球菌) yang menghasilkan racun enterotoksin tahan panas mendidih. Jangan pernah memegang makanan saat ada luka terbuka!',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-food-04',
            unitNumber: 4,
            unitTitleId: 'Keselamatan Kerja Mesin Pabrik & K3 Gemba',
            lessonId: 'les-ssw-fm-04',
            vocabId: 'vg-ssw-fm-034',
            advice: 'Pelajari bahaya bakteri Staphylococcus dan SOP luka kerja di Unit 4 MateriHub.'
          },
          safetyTip: 'Plester medis pribadi dari rumah dilarang dipakai di dalam ruang produksi makanan.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-food-mfg',
          unitId: 'unit-curriculum-ssw-food-04',
          unitNumber: 4,
          unitTitleId: 'Keselamatan Kerja Mesin Pabrik & K3 Gemba',
          lessonId: 'les-ssw-fm-04',
          vocabId: 'vg-ssw-fm-034'
        }
      },
      {
        id: 'SSW-FM-S01-Q13',
        trackType: 'ssw',
        sswSectorId: 'ssw-food-mfg',
        mondaiNumber: 1,
        mondaiType: 'ssw_technical_terminology',
        instructionJp: '食品の保管条件（冷凍保管）の基準温度として、正しい数値を一つ選びなさい。',
        instructionId: 'Pilihlah standar temperatur resmi penyimpanan makanan beku (Reitou Hokan) di gudang logistik pabrik.',
        prompt: '日本の 食品衛生基準において、冷凍食品を 保管する 冷凍庫の 温度基準は 何度以下ですか。',
        options: ['マイナス15℃ 以下（JIS規格は −18℃以下）', '0℃', 'プラス10℃', 'プラス25℃'],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Standar regulasi UU Higienitas Pangan Jepang menetapkan suhu gudang penyimpanan makanan beku (冷凍保管) wajib berada pada suhu minus 15°C atau lebih rendah (standar asosiasi industri makanan beku JIS adalah minus 18°C ke bawah).',
          distractorAutopsy: {
            '1': 'マイナス15℃ 以下（−18℃以下） adalah KUNCI BENAR (standar suhu pembekuan legal).',
            '2': '0℃ adalah titik beku air biasa (chiller batas atas).',
            '3': 'Plus 10℃ adalah batas zona bahaya pendingin kulkas biasa.',
            '4': 'Plus 25℃ adalah suhu ruangan hangat di mana bakteri tumbuh subur.'
          },
          mnemonicSensei: 'Beku standar Jepang = Minus 18 Derajat Celsius! Air mengkristal rapat, bakteri tertidur pulas.',
          l1InterferenceAlert: 'Banyak peserta terkecoh mengira suhu beku adalah 0°C. Ingat: 0°C hanya membekukan air murni, sedangkan untuk mencegah pembusukan biologis lemak dan protein makanan, suhu wajib minus 18°C!',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-food-03',
            unitNumber: 3,
            unitTitleId: 'Pengendalian Mikrobiologi, Suhu Dingin & Pembekuan',
            lessonId: 'les-ssw-fm-03',
            vocabId: 'vg-ssw-fm-025',
            advice: 'Pelajari tabel suhu penyimpanan dingin dan beku di Unit 3 MateriHub.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-food-mfg',
          unitId: 'unit-curriculum-ssw-food-03',
          unitNumber: 3,
          unitTitleId: 'Pengendalian Mikrobiologi, Suhu Dingin & Pembekuan',
          lessonId: 'les-ssw-fm-03',
          vocabId: 'vg-ssw-fm-025'
        }
      },
      {
        id: 'SSW-FM-S01-Q14',
        trackType: 'ssw',
        sswSectorId: 'ssw-food-mfg',
        mondaiNumber: 2,
        mondaiType: 'ssw_k3_procedure',
        instructionJp: 'コンベアの巻き込まれ事故防止について、正しいものを一つ選びなさい。',
        instructionId: 'Pilihlah prosedur pencegahan kecelakaan terlilit ban berjalan conveyor (Makikomare).',
        prompt: 'ベルトコンベアに 製品が 詰まった（引っかかった）ときの 正しい 対処法は どれですか。',
        options: [
          '必ず コンベアの 停止ボタンを 押し、完全に 止まったのを 確認してから 詰まった 製品を 取り除く。',
          'コンベアが 動いたまま、手袋を はめた 手を ローラーの 隙間に 突っ込んで 引っ張り出す。',
          '棒で つつきながら、足で 蹴り飛ばして 無理やり 流す。',
          '誰にも 知らせず、機械の 電源を入れたまま カバーを 外す。'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Pencegahan lilitan conveyor: Jika terjadi kemacetan produk (詰まり), WAJIB menekan tombol stop mematikan conveyor terlebih dahulu. Mengambil produk dengan tangan saat ban berjalan masih berputar adalah penyebab utama tangan hancur tergilas roller.',
          distractorAutopsy: {
            '1': 'Pilihan 1 adalah KUNCI BENAR (matikan conveyor, baru ambil produk yang tersangkut).',
            '2': 'Memasukkan tangan saat conveyor berjalan memicu kecelakaan amputasi tangan seketika.',
            '3': 'Menendang dengan kaki memicu terpeleset jatuh ke atas mesin bergerak.',
            '4': 'Membuka penutup pelindung (cover) saat mesin menyala dilarang keras.'
          },
          mnemonicSensei: 'Macet? STOP CONVEYOR DULU! Tangan kita tidak bisa diganti suku cadangnya.',
          l1InterferenceAlert: 'Dalam kecepatan lini pabrik, operator sering merasa terburu-buru ingin langsung menarik produk. Ingat: Keselamatan jiwa selalu lebih utama dari target kecepatan produksi!',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-food-04',
            unitNumber: 4,
            unitTitleId: 'Keselamatan Kerja Mesin Pabrik & K3 Gemba',
            lessonId: 'les-ssw-fm-04',
            vocabId: 'vg-ssw-fm-034',
            advice: 'Kuasai SOP pengoperasian conveyor pabrik di Unit 4 MateriHub.'
          },
          safetyTip: 'Pastikan penutup pengaman rantai dan roda gigi (gear cover) selalu terpasang terkunci rapat.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-food-mfg',
          unitId: 'unit-curriculum-ssw-food-04',
          unitNumber: 4,
          unitTitleId: 'Keselamatan Kerja Mesin Pabrik & K3 Gemba',
          lessonId: 'les-ssw-fm-04',
          vocabId: 'vg-ssw-fm-034'
        }
      },
      {
        id: 'SSW-FM-S01-Q15',
        trackType: 'ssw',
        sswSectorId: 'ssw-food-mfg',
        mondaiNumber: 3,
        mondaiType: 'ssw_hou_ren_so_sbar',
        instructionJp: '賞味期限の印字不良を発見したときの報告として、適切なものを一つ選びなさい。',
        instructionId: 'Pilihlah pelaporan SBAR yang benar saat menemukan tanggal kadaluwarsa pada kemasan tercetak buram tidak terbaca.',
        prompt: '検品作業中、パックの 賞味期限の 日付印字が かすれて 読めないものを 5個 連続で 発見しました。どう行動しますか。',
        options: [
          '直ちに ラインの 流れを 止め、「印字がかすれて読めない不良が5個発生しています」と 班長に 報告し、印字機の 点検を 依頼する。',
          '読めなくても 大したことないから、そのまま 箱詰めして 出荷ラインへ 流す。',
          '油性ペンを 取り出して、自分の 手書きで 適当な 日付を 書き足す。',
          '不良品を ゴミ箱に 隠して、何も なかったかのように 振る舞う。'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Prinsip jaminan mutu pabrik: Tanggal kadaluwarsa yang tidak terbaca adalah cacat kritis legal (印字不良). Operator wajib menghentikan aliran lini, memisahkan produk cacat, dan melapor ke ketua regu agar printer penanggalan (inkjet date coder) segera dibersihkan nozzle-nya.',
          distractorAutopsy: {
            '1': 'Pilihan 1 adalah KUNCI BENAR (hentikan lini, lapor mandor, servis printer penanggalan).',
            '2': 'Mengirim produk dengan tanggal buram berujung penolakan oleh supermarket dan denda masif.',
            '3': 'Menulis tangan tanggal di kemasan makanan pabrik melanggar hukum pelabelan resmi.',
            '4': 'Menyembunyikan cacat menyebabkan akar masalah tinta printer tidak pernah diperbaiki.'
          },
          mnemonicSensei: 'Cacat berulang? Hentikan aliran barang, laporkan ke leader! Jangan biarkan barang cacat lolos ke gudang pengiriman.',
          l1InterferenceAlert: 'Di Jepang, tanggal kadaluwarsa buram dianggap sama bahayanya dengan produk tanpa label. Kejujuran melapor saat mendeteksi cacat beruntun adalah pilar integritas manufaktur Jepang.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-food-04',
            unitNumber: 4,
            unitTitleId: 'Keselamatan Kerja Mesin Pabrik & K3 Gemba',
            lessonId: 'les-ssw-fm-04',
            vocabId: 'vg-ssw-fm-034',
            advice: 'Pelajari prosedur kontrol mutu QA dan penanganan lot cacat di Unit 4 MateriHub.'
          }
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-food-mfg',
          unitId: 'unit-curriculum-ssw-food-04',
          unitNumber: 4,
          unitTitleId: 'Keselamatan Kerja Mesin Pabrik & K3 Gemba',
          lessonId: 'les-ssw-fm-04',
          vocabId: 'vg-ssw-fm-034'
        }
      }
    ]
  };
}

module.exports = { getSSWFoodMfgSet };
