/**
 * SSW Construction - Lifelines & MEP Utilities (Kensetsu Lifeline / 建設ライフライン・設備) Golden Set 01
 * Grounded in JAC (Japan Association for Construction Human Resources) & MLIT Official Textbooks
 * 15 Items: Hydrostatic Pressure Test, De-energization (Kendenki), Fuusui Drain Trap, PVC Solvent, CD Pipe, Gas Safety
 */

function getSSWLifelineSet() {
  return {
    setId: 'ssw-kensetsu-lifeline-set01',
    trackType: 'ssw',
    sswSectorId: 'ssw-kensetsu-lifeline',
    title: 'Set Latihan SSW Kensetsu Lifeline (Utilitas & MEP) - 01',
    description: 'Simulasi modular 15 menit menguji istilah perpipaan air bersih/kotor (kyuuhaisui), instalasi listrik aman (kendenki), saluran gas, insulasi pipa, dan K3 ruang sempit (pit/plafon).',
    targetUnits: 'Kurikulum Vokasional Kensetsu Lifeline: Perpipaan Air, Kelistrikan, Saluran Udara & K3 MEP Lapangan',
    totalItems: 15,
    timeLimitMinutes: 15,
    passingScore: 10,
    items: [
      {
        id: 'SSW-LL-S01-Q01',
        trackType: 'ssw',
        sswSectorId: 'ssw-kensetsu-lifeline',
        mondaiNumber: 1,
        mondaiType: 'ssw_technical_terminology',
        instructionJp: '配管試験の名称として最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah pengujian tekanan air untuk memastikan sambungan pipa tidak bocor.',
        prompt: '給水管（きゅうすいかん）の 配管工事が終わった後、パイプの接続部から 水漏れがないか 確認するために 行う試験は 何ですか。',
        targetWord: '水圧試験',
        options: [
          '水圧試験（すああつしけん）',
          '通煙試験（つうえんしけん）',
          '打撃試験（だげきしけん）',
          '引張試験（ひっぱりしけん）'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Uji tekanan hidrostatik (水圧試験 - suiatsu shiken) dilakukan dengan mengisi pipa tertutup dengan air bersih lalu memompanya hingga tekanan uji rencana (misal 0.75 - 1.75 MPa) menggunakan pompa uji dan menahannya selama waktu tertentu untuk memastikan jarum manometer tidak turun dan tidak ada tetesan air.',
          distractorAutopsy: {
            '1': '水圧試験（すああつしけん） adalah KUNCI BENAR (uji tekan air untuk verifikasi kebocoran pipa).',
            '2': '通煙試験 (uji asap) untuk mendeteksi celah bau pada saluran ventilasi pipa buangan, bukan pipa air bertekanan.',
            '3': '打撃試験 (uji impak ketukan) adalah uji ketangguhan logam dengan palu yang justru merusak sambungan pipa.',
            '4': '引張試験 (uji tarik destruktif) adalah uji lab kekuatan tarik material baja di laboratorium.'
          },
          mnemonicSensei: 'Sui (Air) + Atsu (Tekanan) = Uji Tekan Air! Isi air, pompa sampai tekanan rencana, cek apakah jarum manometer anteng atau turun.',
          l1InterferenceAlert: 'Di Indonesia sering disebut "tes hidrostatik" atau "tes pompa air". Di Jepang istilah bakunya adalah 水圧試験 (suiatsu shiken) menggunakan 水圧テストポンプ.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kensetsu-08',
            unitNumber: 8,
            unitTitleId: 'Pekerjaan Utilitas MEP, Perpipaan & Kelistrikan Bangunan',
            lessonId: 'les-ssw-ll-01',
            vocabId: 'vg-ssw-ll-001',
            advice: 'Langkah 水圧試験: Pasang dop penutup (メクラ栓) -> Buang udara pipa (エア抜き) -> Pompa sampai tekanan rencana -> Tahan waktu -> Cek jarum turun.'
          },
          safetyTip: 'Saat menaikkan tekanan air pompa, selalu buang udara yang terperangkap (air release) agar kantung udara bertekanan tidak meledak tiba-tiba.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kensetsu-lifeline',
          unitId: 'unit-curriculum-ssw-kensetsu-08',
          unitNumber: 8,
          unitTitleId: 'Pekerjaan Utilitas MEP, Perpipaan & Kelistrikan Bangunan'
        }
      },
      {
        id: 'SSW-LL-S01-Q02',
        trackType: 'ssw',
        sswSectorId: 'ssw-kensetsu-lifeline',
        mondaiNumber: 2,
        mondaiType: 'ssw_k3_procedure',
        instructionJp: '電気工事の安全手順として最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah prosedur awal mutlak untuk mencegah sengatan listrik sebelum memperbaiki instalasi kabel.',
        prompt: '電気配線や 機器の点検・修理を 行う前に、感電（かんでん）を 防ぐために 最初に行うべき 必須の安全手順は どれですか。',
        targetWord: '検電器',
        options: [
          'ブレーカーを落として電源を遮断し、検電器で電圧ゼロを確認する',
          'ゴム手袋をしているので、ブレーカーを入れたまま急いで作業する',
          '触ると危ない電線だけを養生テープで巻いておく',
          '先輩に「電気を消して」と叫んで、返事を待たずに配線に触る'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Untuk mencegah sengatan listrik mematikan, langkah pertama mutlak adalah mematikan MCB breaker, memasang gembok/tanda perbaikan (Lockout/Tagout), dan menguji tegangan dengan alat pendeteksi tegangan (検電器 - kendenki) untuk memastikan tegangan benar-benar 0 Volt sebelum tangan menyentuh kawat tembaga.',
          distractorAutopsy: {
            '1': 'Opsi 1 BENAR MUTLAK: Matikan pemutus sirkuit dan verifikasi 0V dengan alat sensor kendenki.',
            '2': 'Bekerja pada kabel bertegangan hidup (活線作業) tanpa surat izin khusus dilarang keras.',
            '3': 'Lakban biasa (養生テープ) tidak memiliki daya isolasi dielektrik dan tembus tegangan AC.',
            '4': 'Berteriak tanpa verifikasi fisik berisiko ada orang lain yang menyalakan kembali saklar di lantai bawah.'
          },
          mnemonicSensei: 'Cegah Kesetrum (感電防止): 1. Matikan Breaker! 2. Pasang tanda perbaikan! 3. Tempel Kendenki: "Den\'atsu Zero Yoshi!"',
          l1InterferenceAlert: 'Di Indonesia teknisi kadang mengecek setrum dengan punggung jari atau tespen murah. Di Jepang, haram menyentuh kawat sebelum diuji dengan 検電器 (kendenki) berstandar industri.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kensetsu-08',
            unitNumber: 8,
            unitTitleId: 'Pekerjaan Utilitas MEP, Perpipaan & Kelistrikan Bangunan',
            advice: '3 Serangkai listrik: 電源遮断 (pemutusan saklar), 施錠表示 (lockout/tagout), 検電 (kenden = verifikasi voltase nol).'
          },
          safetyTip: 'Sebelum menggunakan kendenki pada sirkuit yang akan dikerjakan, tes dulu kendenki pada sirkuit hidup untuk memastikan baterai sensor masih berfungsi normal.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kensetsu-lifeline',
          unitId: 'unit-curriculum-ssw-kensetsu-08',
          unitNumber: 8,
          unitTitleId: 'Pekerjaan Utilitas MEP, Perpipaan & Kelistrikan Bangunan'
        }
      },
      {
        id: 'SSW-LL-S01-Q03',
        trackType: 'ssw',
        sswSectorId: 'ssw-kensetsu-lifeline',
        mondaiNumber: 3,
        mondaiType: 'ssw_technical_terminology',
        instructionJp: '排水設備の器具名として最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah nama perangkat leher angsa perangkap air untuk menahan bau busuk saluran pembuangan.',
        prompt: '排水配管（はいすいはいかん）において、下水管からの 悪臭や 害虫が 室内に侵入するのを 防ぐために 水（封水）を 溜めておく器具を 何と言いますか。',
        targetWord: '排水トラップ',
        options: [
          '排水トラップ（トラップ）',
          '逆流防止弁（チャッキ弁）',
          '減圧弁（げんあつべん）',
          'ストレーナー（ろ過器）'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Perangkap air buangan / drain trap (排水トラップ, misalnya P-trap, S-trap, drum trap) menampung lapisan air setinggi 50-100 mm yang disebut "Fuusui" (封水 - water seal) untuk menyumbat gas busuk saluran pembuangan dan serangga agar tidak naik masuk ke kamar mandi.',
          distractorAutopsy: {
            '1': '排水トラップ adalah KUNCI BENAR (perangkap leher angsa penahan bau dengan genangan fuusui).',
            '2': '逆流防止弁 (check valve) mencegah aliran balik mekanis zat cair, bukan perangkap genangan air penahan bau.',
            '3': '減圧弁 (pressure reducing valve) menurunkan tekanan fluida pipa.',
            '4': 'ストレーナー (strainer) adalah saringan kotoran/karat pipa.'
          },
          mnemonicSensei: 'Trap = Perangkap air pelindung bau! Lekukan air (封水 - fuusui) menyumbat bau busuk got agar tak masuk ke ruangan.',
          l1InterferenceAlert: 'Bila toilet baru berbau got, penyebabnya bukan pipa retak melainkan 封水切れ (fuusui-gire = air genangan di dalam leher angsa mengering karena lama tidak dipakai).',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kensetsu-08',
            unitNumber: 8,
            unitTitleId: 'Pekerjaan Utilitas MEP, Perpipaan & Kelistrikan Bangunan',
            advice: 'Kosakata drainase: 排水トラップ (drain trap), 封水 (fuusui = air perangkap bau), 通気管 (tsuukikan = pipa ventilasi pelepas tekanan).'
          },
          safetyTip: 'Saat memasang pipa perangkap, pastikan kedalaman genangan air (seal depth) berada di kisaran 50 mm s/d 100 mm sesuai standar arsitektur.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kensetsu-lifeline',
          unitId: 'unit-curriculum-ssw-kensetsu-08',
          unitNumber: 8,
          unitTitleId: 'Pekerjaan Utilitas MEP, Perpipaan & Kelistrikan Bangunan'
        }
      },
      {
        id: 'SSW-LL-S01-Q04',
        trackType: 'ssw',
        sswSectorId: 'ssw-kensetsu-lifeline',
        mondaiNumber: 4,
        mondaiType: 'ssw_hou_ren_so_sbar',
        instructionJp: '塩ビ管接合の指示会話として、（　　）に入る最も適切な言葉を一つ選びなさい。',
        instructionId: 'Pilihlah zat perekat pipa PVC yang diaplikasikan ke ujung pipa dan soket.',
        prompt: '先輩「塩ビ管（PVC管）を つなぐときは、受口と 差口の両方に（　　）を 均一に塗って、奥まで 一気に差し込んで しばらく押さえろ！」',
        targetWord: '塩ビ用接着剤',
        options: [
          '専用の塩ビ用接着剤（接着用溶剤）',
          '潤滑油（マシンオイル）',
          'シールテープ',
          '石鹸水（せっけんすい）'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Pipa PVC menggunakan lem khusus pelarut PVC (塩ビ用接着剤 / 溶剤). Lem ini meleburkan permukaan plastik PVC secara dingin. Ujung pipa harus ditekan mentok hingga dasar soket dan ditahan beberapa detik untuk mencegah pipa terdorong mundur kembali oleh taper soket (抜け戻り防止).',
          distractorAutopsy: {
            '1': '専用の塩ビ用接着剤 adalah KUNCI BENAR (solvent cement pelebur dingin plastik PVC).',
            '2': 'Minyak pelumas (マシンオイル) merusak ikatan kimia lem dan mencemari air minum.',
            '3': 'Seal tape (シールテープ) khusus untuk ulir drat logam/plastik, bukan soket polos lem.',
            '4': 'Air sabun untuk uji gelembung gas bocor atau soket karet gelang (rubber ring), bukan sambungan lem.'
          },
          mnemonicSensei: 'Enbi Setchakuzai = Lem pelebur PVC! Oles rata di kedua sisi -> dorong mentok -> tahan 10 detik agar tidak membal keluar.',
          l1InterferenceAlert: 'Banyak tukang di Indonesia hanya mengoles lem pada satu sisi (ujung pipa) saja lalu langsung dilepas sehingga pipa membal mundur 1 cm. Sambungan harus dioles di kedua sisi dan ditahan kuat.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kensetsu-08',
            unitNumber: 8,
            unitTitleId: 'Pekerjaan Utilitas MEP, Perpipaan & Kelistrikan Bangunan',
            advice: 'Aturan sambung PVC: Bersihkan debu -> Oles lem soket & spigot -> Masukkan lurus -> Tahan 10-15 detik cegah 抜け戻り.'
          },
          safetyTip: 'Gunakan lem PVC di ruangan berventilasi baik karena uap pelarut sikloheksanon dapat menyebabkan pusing jika terhirup pekat.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kensetsu-lifeline',
          unitId: 'unit-curriculum-ssw-kensetsu-08',
          unitNumber: 8,
          unitTitleId: 'Pekerjaan Utilitas MEP, Perpipaan & Kelistrikan Bangunan'
        }
      },
      {
        id: 'SSW-LL-S01-Q05',
        trackType: 'ssw',
        sswSectorId: 'ssw-kensetsu-lifeline',
        mondaiNumber: 5,
        mondaiType: 'ssw_technical_terminology',
        instructionJp: 'ネジ配管部材の名称として最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah pita putih perapat ulir drat pipa untuk mencegah kebocoran.',
        prompt: '配管の ネジ接続部から 気体や 液体の漏れを 防ぐために、ネジ山に 巻き付ける 白い薄いテープを 何と言いますか。',
        targetWord: 'シールテープ',
        options: [
          'シールテープ',
          'マスキングテープ',
          '両面テープ',
          'ダクトテープ'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Pita perapat PTFE (シールテープ - shiiru te-pu / Teflon tape) dililitkan searah jarum jam pada ulir jantan drat pipa untuk mengisi rongga mikro antar ulir logam, menghasilkan sambungan kedap air dan kedap gas saat fitting dikencangkan.',
          distractorAutopsy: {
            '1': 'シールテープ adalah KUNCI BENAR (pita putih perapat ulir drat pipa).',
            '2': 'マスキングテープ (masking tape) adalah kertas pembatas cat/lem silikon, tidak menahan tekanan pipa.',
            '3': '両面テープ (double tape) untuk merekatkan dua permukaan datar.',
            '4': 'ダクトテープ (duct tape) adalah lakban kain perapat saluran AC luar.'
          },
          mnemonicSensei: 'Seal Tape = Pita PTFE putih perapat ulir drat! Selalu lilit searah jarum jam (kanan) mengikuti arah putar drat.',
          l1InterferenceAlert: 'Lilit pita selalu SEARAH jarum jam. Jika melilit berlawanan jarum jam, saat soket diputar kencang pita seal tape akan terurai rusak dan bocor.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kensetsu-08',
            unitNumber: 8,
            unitTitleId: 'Pekerjaan Utilitas MEP, Perpipaan & Kelistrikan Bangunan',
            advice: 'Aturan シールテープ: Sisakan 1 ulir terdepan terbuka (jangan ditutup agar potongan pita tak masuk pipa) -> Tarik kencang -> Lilit searah jarum jam 5-8 putaran.'
          },
          safetyTip: 'Jangan memutar balik (mengendorkan) sambungan ulir pipa yang sudah dililit seal tape; jika harus diputar balik, bersihkan dan pasang seal tape baru.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kensetsu-lifeline',
          unitId: 'unit-curriculum-ssw-kensetsu-08',
          unitNumber: 8,
          unitTitleId: 'Pekerjaan Utilitas MEP, Perpipaan & Kelistrikan Bangunan'
        }
      },
      {
        id: 'SSW-LL-S01-Q06',
        trackType: 'ssw',
        sswSectorId: 'ssw-kensetsu-lifeline',
        mondaiNumber: 6,
        mondaiType: 'ssw_k3_procedure',
        instructionJp: '天井裏作業の安全ルールとして最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah titik pijakan kaki yang benar saat bekerja di rongga plafon.',
        prompt: 'ビルや住宅の 天井裏（てんじょううら）に 入って配線や ダクトの工事を 行うとき、足元で 最も注意すべきことは 何ですか。',
        targetWord: '天井裏',
        options: [
          '天井板（石膏ボードなど）に直接足を乗せず、野縁（のぶち）や足場板の上を踏む',
          '天井板は丈夫なので、どこを踏んで歩いても全く問題ない',
          '素足になって音を立てないようにゆっくり歩く',
          '天井裏の換気扇のファンに足を乗せて体重を支える'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Papan gipsum plafon sama sekali tidak didesain untuk menahan bobot manusia. Menginjaknya langsung akan membuat papan jebol seketika dan pekerja jatuh meluncur ke lantai bawah. Pekerja wajib berpijak hanya pada rangka baja penggantung (野縁 - nobuchi) atau papan injakan kerja (足場板).',
          distractorAutopsy: {
            '1': 'Opsi 1 BENAR MUTLAK: Jangan injak papan gipsum langsung, pijaklah rangka nobuchi atau papan pijakan.',
            '2': 'Papan plafon rapuh dan akan patah seketika saat dibebani bobot tubuh.',
            '3': 'Bertelanjang kaki berbahaya karena banyak ujung sekrup tajam dan kawat pengikat.',
            '4': 'Rumah exhaust fan hanya seng tipis yang akan langsung remuk terinjak.'
          },
          mnemonicSensei: 'Plafon gipsum seperti kerupuk! Jangan injak papan putihnya, injaklah rangka besi joist (野縁) atau papan bantuan.',
          l1InterferenceAlert: 'Sering terjadi kecelakaan fatal teknisi magang salah melangkah menginjak papan plafon hingga jebol jatuh 3-4 meter ke lantai dasar. Pijak hanya rangka struktur (構造材).',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kensetsu-08',
            unitNumber: 8,
            unitTitleId: 'Pekerjaan Utilitas MEP, Perpipaan & Kelistrikan Bangunan',
            advice: 'Aturan 天井裏: Bawa papan pijakan (足場板) -> Kenakan senter kepala (ヘッドライト) -> Pakai kacamata & masker pelindung debu glasswool.'
          },
          safetyTip: 'Gunakan sarung tangan rapat untuk mencegah serat glasswool insulasi plafon menusuk pori-pori kulit dan menimbulkan gatal perih.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kensetsu-lifeline',
          unitId: 'unit-curriculum-ssw-kensetsu-08',
          unitNumber: 8,
          unitTitleId: 'Pekerjaan Utilitas MEP, Perpipaan & Kelistrikan Bangunan'
        }
      },
      {
        id: 'SSW-LL-S01-Q07',
        trackType: 'ssw',
        sswSectorId: 'ssw-kensetsu-lifeline',
        mondaiNumber: 7,
        mondaiType: 'ssw_technical_terminology',
        instructionJp: '電線管の種類として最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah pipa fleksibel oranye yang khusus ditanam di dalam cor beton gedung.',
        prompt: '電気配管工事で、コンクリート打ち込み時に 電線を保護するために 埋設（まいせつ）して使用される オレンジ色の 合成樹脂製可とう電線管は 何ですか。',
        targetWord: 'CD管',
        options: [
          'CD管（コンバインドダクト管）',
          'PF管（プラフレキ管）',
          '鋼製電線管（配管用炭素鋼鋼管）',
          '耐熱塩ビ管（HT管）'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Pipa CD (CD管 - Combined Duct) adalah pipa fleksibel resin sintetis berwarna oranye yang sifatnya tidak tahan api terbuka (非難燃性), sehingga HANYA boleh ditanam langsung di dalam coran beton semen. Untuk pemasangan di luar coran atau plafon terbuka, wajib memakai pipa PF (PF管) yang tahan api.',
          distractorAutopsy: {
            '1': 'CD管（コンバインドダクト管） adalah KUNCI BENAR (pipa fleksibel oranye khusus tanam cor beton).',
            '2': 'PF管 (pipa abu-abu/krem) bersifat tahan api mandiri (自己消火性), boleh di luar cor beton.',
            '3': '鋼製電線管 adalah pipa baja kaku untuk perlindungan mekanis benturan berat.',
            '4': '耐熱塩ビ管 (HT管) adalah pipa PVC coklat kemerahan untuk air panas, bukan pipa kabel listrik.'
          },
          mnemonicSensei: 'Warna Oranye = CD管 khusus cor beton! Karena mudah terbakar di udara terbuka, haram dipasang telanjang di luar tembok.',
          l1InterferenceAlert: 'Sering tertukar antara CD管 dan PF管. CD管 (oranye) HANYA untuk ditanam dalam semen. Jika dipasang terbuka di plafon atau partisi gipsum, inspektur listrik akan menolak instalasi.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kensetsu-08',
            unitNumber: 8,
            unitTitleId: 'Pekerjaan Utilitas MEP, Perpipaan & Kelistrikan Bangunan',
            advice: 'Beda fatal: CD管 (Oranye, 非難燃性 / tidak tahan api) -> Khusus cor beton. PF管 (Abu-abu, 難燃性 / tahan api) -> Boleh di luar cor.'
          },
          safetyTip: 'Saat mengikat CD管 ke besi tulangan dengan kawat kessokusen, jangan terlalu kencang agar dinding pipa plastik tidak penyok tercekik.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kensetsu-lifeline',
          unitId: 'unit-curriculum-ssw-kensetsu-08',
          unitNumber: 8,
          unitTitleId: 'Pekerjaan Utilitas MEP, Perpipaan & Kelistrikan Bangunan'
        }
      },
      {
        id: 'SSW-LL-S01-Q08',
        trackType: 'ssw',
        sswSectorId: 'ssw-kensetsu-lifeline',
        mondaiNumber: 8,
        mondaiType: 'ssw_k3_procedure',
        instructionJp: 'ガス漏れ時の禁止行動として最も不適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah tindakan yang HARAM DILAKUKAN di lokasi saat tercium bau kebocoran gas.',
        prompt: 'ガス配管の工事や 開栓（かいせん）作業中に、ガス漏れの疑いがある場合、現場で絶対にやってはならない 行動は どれですか。',
        targetWord: 'ガス漏れ',
        options: [
          '部屋の換気扇や電灯のスイッチをカチッと操作する',
          'ガスの元栓（メインバルブ）を速やかに閉める',
          '窓やドアを手動で静かに大きく開けて換気する',
          '火気の使用を直ちに禁止し、周囲の人を避難させる'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Jangan pernah menyentuh saklar listrik, saklar exhaust fan, atau mencabut colokan saat tercium bau gas. Percikan bunga api mikro (接点火花) di dalam saklar listrik saat tombol berbunyi klik langsung menyulut ledakan gas skala besar seketika.',
          distractorAutopsy: {
            '1': 'Opsi 1 ADALAH LARANGAN MUTLAK: Mengoperasikan saklar listrik atau exhaust fan memicu ledakan bunga api listrik.',
            '2': 'Menutup kran induk gas (元栓を閉める) adalah tindakan darurat pertama yang benar.',
            '3': 'Membuka jendela secara manual perlahan membuang gas secara alami tanpa bunga api listrik.',
            '4': 'Melarang penggunaan api dan mengevakuasi personel adalah prosedur standar K3 gas.'
          },
          mnemonicSensei: 'Bau gas bocor? JANGAN sentuh saklar apapun! Bunga api mikro saklar = Meledakkan seisi ruangan. Buka jendela secara manual!',
          l1InterferenceAlert: 'Refleks orang awam saat bau gas adalah menyalakan exhaust dinding untuk membuang bau. Ini kesalahan fatal penyebab ledakan LPG/Town Gas. Ventilasikan hanya dengan membuka jendela tangan kosong.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kensetsu-08',
            unitNumber: 8,
            unitTitleId: 'Pekerjaan Utilitas MEP, Perpipaan & Kelistrikan Bangunan',
            advice: '3 Langkah darurat gas bocor: 1. Tutup valve (元栓閉止), 2. Buka jendela perlahan (手動換気), 3. Jangan pencet saklar apapun atau bel pintu.'
          },
          safetyTip: 'Gas kota (13A) lebih ringan dari udara (naik ke plafon), sedangkan gas LPG lebih berat dari udara (mengendap di lantai).'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kensetsu-lifeline',
          unitId: 'unit-curriculum-ssw-kensetsu-08',
          unitNumber: 8,
          unitTitleId: 'Pekerjaan Utilitas MEP, Perpipaan & Kelistrikan Bangunan'
        }
      },
      {
        id: 'SSW-LL-S01-Q09',
        trackType: 'ssw',
        sswSectorId: 'ssw-kensetsu-lifeline',
        mondaiNumber: 9,
        mondaiType: 'ssw_hou_ren_so_sbar',
        instructionJp: '保温工事の目的会話として、（　　）に入る最も適切な言葉を一つ選びなさい。',
        instructionId: 'Pilihlah dua fungsi utama pembungkusan insulasi pada pipa air.',
        prompt: '後輩「先輩、給湯配管（お湯のパイプ）の周りに巻く グラスウールなどの カバーは何のために 取り付けるのですか。」先輩「それはパイプの熱を逃がさず、水が凍るのを防ぐ（　　）のためだよ。」',
        targetWord: '保温・防露',
        options: [
          '保温・防露（ほおん・ぼうろ）',
          '着色・装飾（ちゃくしょく・そうしょく）',
          '重量増加（じゅうりょうぞうか）',
          '電波遮断（でんぱしゃだん）'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Pembungkusan insulasi pipa (保温材 - hounzai, misal glasswool atau busa elastomer) memiliki dua fungsi pokok: 保温 (menjaga suhu panas dan mencegah air beku pecah di musim dingin) dan 防露 (bouro - mencegah udara lembap musim panas mengembun menetes di permukaan pipa air dingin).',
          distractorAutopsy: {
            '1': '保温・防露（ほおん・ぼうろ） adalah KUNCI BENAR (menjaga suhu & mencegah kondensasi tetesan embun).',
            '2': 'Pewarnaan dan hiasan hanya fungsi tambahan, bukan tujuan teknis utama.',
            '3': 'Menambah berat pipa justru membebani gantungan pipa (hangers).',
            '4': 'Bahan insulasi pipa tidak berfungsi menangkal gelombang sinyal radio.'
          },
          mnemonicSensei: 'Houn (Jaga Hangat) + Bouro (Cegah Embun Menetes)! Pipa air panas tidak dingin, pipa air dingin tidak berkeringat bocor ke plafon.',
          l1InterferenceAlert: 'Di Indonesia jarang ada insulasi pipa selain pipa freon AC. Di Jepang, pipa air dingin yang tidak dibungkus akan berkeringat deras (結露 - ketsuro) dan merusak plafon gipsum.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kensetsu-08',
            unitNumber: 8,
            unitTitleId: 'Pekerjaan Utilitas MEP, Perpipaan & Kelistrikan Bangunan',
            advice: 'Duo fungsi: 1. 保温 (cegah air beku di musim dingin), 2. 防露 (cegah embun kondensasi di musim panas).'
          },
          safetyTip: 'Pastikan lakban aluminium perekat insulasi diratakan dengan kape plastik agar celah udara lembap tidak meresap ke dalam busa.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kensetsu-lifeline',
          unitId: 'unit-curriculum-ssw-kensetsu-08',
          unitNumber: 8,
          unitTitleId: 'Pekerjaan Utilitas MEP, Perpipaan & Kelistrikan Bangunan'
        }
      },
      {
        id: 'SSW-LL-S01-Q010',
        trackType: 'ssw',
        sswSectorId: 'ssw-kensetsu-lifeline',
        mondaiNumber: 10,
        mondaiType: 'ssw_technical_terminology',
        instructionJp: '空調設備の配管名として最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah nama pipa pembuangan air embun kondensasi dari unit indoor AC.',
        prompt: '空調設備工事で、エアコン室内機で発生した 結露水（けつろうすい）を 屋外や 排水管へ 排出するための 配管を 何と言いますか。',
        targetWord: 'ドレン配管',
        options: [
          'ドレン配管（ドレン管）',
          '冷媒配管（れいばいはいかん）',
          'ダクト配管',
          'ベント管（通気管）'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Pipa pembuangan air kondensasi AC disebut pipa Drain (ドレン配管 / ドレン管). Pipa ini harus dipasang dengan kemiringan turun terus menerus (umumnya kemiringan 1/50 hingga 1/100) agar air mengalir lancar berkat gravitasi tanpa meluap bocor di ruangan.',
          distractorAutopsy: {
            '1': 'ドレン配管 adalah KUNCI BENAR (pipa pembuang tetesan air embun indoor AC).',
            '2': '冷媒配管 (pipa refrigeran tembaga) menyirkulasikan gas/cairan freon bertekanan tinggi.',
            '3': 'ダクト配管 (ducting) menyalurkan udara dingin/hangat lewat saluran plat seng galvanis.',
            '4': 'ベント管 / 通気管 (pipa ventilasi) menyeimbangkan tekanan udara di saluran air kotor.'
          },
          mnemonicSensei: 'Drain = Buangan Air Embun AC! Pasang pipa drain selalu miring ke bawah (下り勾配). Kalau datar atau naik, air AC meluap ke karpet.',
          l1InterferenceAlert: 'Banyak komplain kebocoran AC baru karena kemiringan (勾配 - koubai) pipa drain terbalik atau tidak diberi tes tuang air (通水テスト).',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kensetsu-08',
            unitNumber: 8,
            unitTitleId: 'Pekerjaan Utilitas MEP, Perpipaan & Kelistrikan Bangunan',
            advice: 'Aturan pipa drain: Pasang miring minimal 1/100 -> Bungkus isolasi anti-embun -> Uji tuang air 通水テスト 1-2 liter.'
          },
          safetyTip: 'Pasang perangkap udara drain trap jika pipa drain AC terhubung langsung ke pipa air kotor gedung agar bau got tidak tersedot ke unit AC.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kensetsu-lifeline',
          unitId: 'unit-curriculum-ssw-kensetsu-08',
          unitNumber: 8,
          unitTitleId: 'Pekerjaan Utilitas MEP, Perpipaan & Kelistrikan Bangunan'
        }
      },
      {
        id: 'SSW-LL-S01-Q011',
        trackType: 'ssw',
        sswSectorId: 'ssw-kensetsu-lifeline',
        mondaiNumber: 11,
        mondaiType: 'ssw_k3_procedure',
        instructionJp: '電動工具の漏電防止装置として最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah perangkat pemutus arus bocor untuk melindungi dari kesetrum alat listrik.',
        prompt: '電動工具（ディスクグラインダーや 電動ハンマなど）を 使用する際、漏電（ろうでん）による 感電事故を 防ぐために 取り付けるべき 安全装置は 何ですか。',
        targetWord: '漏電遮断器',
        options: [
          '漏電遮断器（ポータブルアースリール / 漏電ブレーカー）',
          '変圧器（トランス）のみ',
          'タコ足配線タップ',
          '延長コードの結束バンド'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Pemutus sirkuit kebocoran arus bumi / ELCB (漏電遮断器 - rouden shadanki / portable GFCI reel) memutus aliran listrik dalam hitungan milidetik jika ada isolasi kabel alat yang lecet atau kemasukan air, menyelamatkan jantung pekerja dari fibrilasi ventrikel.',
          distractorAutopsy: {
            '1': '漏電遮断器 adalah KUNCI BENAR (pemutus arus otomatis pendeteksi kebocoran ground).',
            '2': 'Trafo pengubah tegangan tidak otomatis memutus arus bila terjadi kebocoran ground tanpa modul proteksi.',
            '3': 'Steker cabang gurita (タコ足配線) memicu kelebihan beban dan kebakaran kabel.',
            '4': 'Kabel ties pengikat kabel tidak memiliki fungsi pemutus proteksi kelistrikan.'
          },
          mnemonicSensei: 'Rouden Shadanki = Pemutus Arus Bocor! Begitu ada kawat lecet atau kena air, alat ini langsung "Cetek!" memutus daya seketika.',
          l1InterferenceAlert: 'Di Jepang, mencolokkan gerinda listrik langsung ke stopkontak dinding tanpa perantara 漏電遮断器 (ELCB) adalah pelanggaran K3 yang langsung dihentikan pengawas.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kensetsu-08',
            unitNumber: 8,
            unitTitleId: 'Pekerjaan Utilitas MEP, Perpipaan & Kelistrikan Bangunan',
            advice: 'Perangkat wajib: Gulungan kabel dengan ELCB (漏電遮断器付きリール), tombol tes trip (テストボタン), kabel arde pembumian (アース).'
          },
          safetyTip: 'Tekan tombol tes merah pada gulungan kabel setiap pagi untuk memastikan mekanisme trip pemutus arus bekerja normal.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kensetsu-lifeline',
          unitId: 'unit-curriculum-ssw-kensetsu-08',
          unitNumber: 8,
          unitTitleId: 'Pekerjaan Utilitas MEP, Perpipaan & Kelistrikan Bangunan'
        }
      },
      {
        id: 'SSW-LL-S01-Q012',
        trackType: 'ssw',
        sswSectorId: 'ssw-kensetsu-lifeline',
        mondaiNumber: 12,
        mondaiType: 'ssw_technical_terminology',
        instructionJp: 'バルブの種類として最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah jenis katup kran untuk menutup atau mengatur aliran air dalam pipa.',
        prompt: '配管の 途中に設けて、メンテナンスや 緊急時に 水の流れを 完全に止めたり 調節したりするための バルブを 何と言いますか。',
        targetWord: '仕切弁',
        options: [
          '仕切弁（ゲートバルブ）や玉形弁（グローブバルブ）',
          '安全ピン',
          '点検口（てんけんこう）',
          'ブラケット金具'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Gate valve (仕切弁 - shikiriben) dan globe valve (玉形弁 - tamagataben) atau ball valve (ボール弁) adalah katup pengatur aliran fluida yang dipasang untuk mengisolasi segmen pipa saat perbaikan kebocoran atau pemotongan darurat.',
          distractorAutopsy: {
            '1': '仕切弁や玉形弁 adalah KUNCI BENAR (katup pengatur & penutup aliran pipa).',
            '2': '安全ピン (safety pin) adalah pin pengaman mekanis pada shackle atau APAR.',
            '3': '点検口 (lubang inspeksi) adalah pintu kecil di plafon untuk mengintip kondisi pipa.',
            '4': 'ブラケット金具 (bracket) adalah besi penopang pipa di dinding.'
          },
          mnemonicSensei: 'Shikiri-ben = Katup Sekat Pemotong Aliran! Putar searah jarum jam untuk menutup aliran air saat pipa diperbaiki.',
          l1InterferenceAlert: 'Arah putar kran standar Jepang: Putar Kanan (searah jarum jam) = Tutup (閉 - Shime), Putar Kiri (berlawanan jarum jam) = Buka (開 - Ake).',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kensetsu-08',
            unitNumber: 8,
            unitTitleId: 'Pekerjaan Utilitas MEP, Perpipaan & Kelistrikan Bangunan',
            advice: 'Jenis valve: ゲートバルブ (posisi buka penuh/tutup penuh), ボールバルブ (putar cepat 90 derajat), バタフライバルブ (pipa besar).'
          },
          safetyTip: 'Saat membuka valve air utama pertama kali, putar perlahan agar tidak terjadi pukulan air (water hammer) yang merusak pipa.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kensetsu-lifeline',
          unitId: 'unit-curriculum-ssw-kensetsu-08',
          unitNumber: 8,
          unitTitleId: 'Pekerjaan Utilitas MEP, Perpipaan & Kelistrikan Bangunan'
        }
      },
      {
        id: 'SSW-LL-S01-Q013',
        trackType: 'ssw',
        sswSectorId: 'ssw-kensetsu-lifeline',
        mondaiNumber: 13,
        mondaiType: 'ssw_k3_procedure',
        instructionJp: '地下ピット作業の安全測定として最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah pengukuran pertama yang wajib dilakukan sebelum masuk ke dalam pit bawah tanah.',
        prompt: '床下ピット（地下ピット）で 配管工事を 行う前、作業員の生命を守るために 最初に行うべき 測定は 何ですか。',
        targetWord: '酸素濃度',
        options: [
          '酸素濃度および硫化水素・可燃性ガス濃度の測定',
          '床のコンクリート強度の測定',
          '天井の高さと部屋の広さの測定',
          'ピット内の明るさ（照度）の測定'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Pit bawah tanah adalah ruang sempit terbatas yang rentan kehabisan oksigen ($<18\\%$) dan penumpukan gas beracun ($H_2S$) atau metana ($CH_4$). Wajib diukur pada berbagai ketinggian dengan detektor multi-gas terkalibrasi sebelum tubuh masuk ke dalam lubang.',
          distractorAutopsy: {
            '1': 'Opsi 1 BENAR MUTLAK: Ukur kadar oksigen (>= 18%) dan gas racun H2S/gas mudah terbakar.',
            '2': 'Kekuatan tekan beton diukur saat konstruksi struktur, bukan parameter keselamatan pernapasan darurat.',
            '3': 'Dimensi geometris dilihat dari gambar denah, bukan penyelamat nyawa langsung sebelum turun pit.',
            '4': 'Penerangan bisa dibantu senter, tapi kadar oksigen memadai adalah syarat mutlak hidup-mati.'
          },
          mnemonicSensei: 'Pit bawah tanah = Bahaya mati lemas! Ukur O2 dan gas racun DULU sebelum kepala masuk ke lubang. Oksigen minimal 18%!',
          l1InterferenceAlert: 'Jangan pernah langsung melompat masuk ke manhole atau pit bawah tanah hanya karena "kelihatannya kering dan tenang". Gas beracun tak terlihat dan bisa merenggut nyawa seketika.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kensetsu-08',
            unitNumber: 8,
            unitTitleId: 'Pekerjaan Utilitas MEP, Perpipaan & Kelistrikan Bangunan',
            advice: 'Nilai ambang batas K3: Oksigen >= 18%, H2S <= 10 ppm, CO <= 50 ppm, Gas mudah terbakar <= 10% LEL.'
          },
          safetyTip: 'Pekerja di dalam pit wajib memakai full harness yang dihubungkan ke tali penyelamat keluar pit.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kensetsu-lifeline',
          unitId: 'unit-curriculum-ssw-kensetsu-08',
          unitNumber: 8,
          unitTitleId: 'Pekerjaan Utilitas MEP, Perpipaan & Kelistrikan Bangunan'
        }
      },
      {
        id: 'SSW-LL-S01-Q014',
        trackType: 'ssw',
        sswSectorId: 'ssw-kensetsu-lifeline',
        mondaiNumber: 14,
        mondaiType: 'ssw_technical_terminology',
        instructionJp: '配管工具の名称として最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah alat pengikis serpihan tajam (burr) di bagian dalam pipa setelah dipotong.',
        prompt: '配管を 切断した直後、パイプの内側にできる 鋭いギザギザ（バリ）を 取り除くために 使う工具は 何ですか。',
        targetWord: 'リーマー',
        options: [
          'リーマー（面取り器）',
          'パイプレンチ',
          'ウォーターポンププライヤー',
          'ラチェットレンチ'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Alat pengikis duri pipa (リーマー - riimaa / 面取り器 - mentoriki) membersihkan gerigi tajam (バリ - bari). Jika sisa potongan dibiarkan di dalam pipa, akan terjadi turbulensi, erosi kavitasi, penyempitan diameter pipa, serta menyangkut kotoran yang memicu sumbatan drainase.',
          distractorAutopsy: {
            '1': 'リーマー（面取り器） adalah KUNCI BENAR (reamer pembersih duri bari dalam pipa).',
            '2': 'パイプレンチ (kunci pipa) untuk mencengkeram dan memutar pipa besi berulir.',
            '3': 'ウォーターポンププライヤー (tang buaya/waterpump) untuk mencengkeram mur soket sanitasi.',
            '4': 'ラチェットレンチ (kunci rachet) untuk mengencangkan baut dengan putaran satu arah.'
          },
          mnemonicSensei: 'Reamer = Kerik duri pipa! Habis potong pipa tembaga/besi/pvc, buang taring tajamnya (バリ) pakai reamer agar aliran air mulus.',
          l1InterferenceAlert: 'Jangan lewatkan tahap reaming! Pada pipa tembaga AC, serpihan sisa potongan yang tidak dikerik bisa tersedot ke kompresor freon dan merusak mesin AC.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kensetsu-08',
            unitNumber: 8,
            unitTitleId: 'Pekerjaan Utilitas MEP, Perpipaan & Kelistrikan Bangunan',
            advice: 'Tahap potong pipa: Potong siku dengan pipa cutter -> Bersihkan duri dalam dengan リーマー -> Haluskan bibir luar (面取り).'
          },
          safetyTip: 'Ketuk perlahan ujung pipa yang menghadap ke bawah agar serpihan reaming jatuh keluar dan tidak masuk ke dalam jalur instalasi.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kensetsu-lifeline',
          unitId: 'unit-curriculum-ssw-kensetsu-08',
          unitNumber: 8,
          unitTitleId: 'Pekerjaan Utilitas MEP, Perpipaan & Kelistrikan Bangunan'
        }
      },
      {
        id: 'SSW-LL-S01-Q015',
        trackType: 'ssw',
        sswSectorId: 'ssw-kensetsu-lifeline',
        mondaiNumber: 15,
        mondaiType: 'ssw_hou_ren_so_sbar',
        instructionJp: '配管完了の確認会話として、（　　）に入る最も適切な言葉を一つ選びなさい。',
        instructionId: 'Pilihlah hal krusial yang harus dipastikan tidak terjadi saat pemeriksaan akhir sistem perpipaan.',
        prompt: '職長「今日でこの系統の通水テストは完了だ。最後に配管図面と照らし合わせて（　　）がないか確認ヨシ！」',
        targetWord: '締め忘れ',
        options: [
          '締め忘れやバルブの誤作動（配管ミス）',
          '作業員の昼休みの予定',
          '壁紙の色の流行',
          '外の天気の変化'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Pada tahap akhir komisioning, teknisi wajib mencocokkan fisik pipa dengan gambar kerja untuk memastikan tidak ada fitting yang lupa dikencangkan (締め忘れ) dan posisi buka/tutup valve sudah benar agar gedung tidak kebanjiran saat pompa utama dihidupkan.',
          distractorAutopsy: {
            '1': '締め忘れやバルブの誤作動 adalah KUNCI BENAR (baut lupa kencang & salah posisi katup).',
            '2': 'Jadwal makan siang adalah urusan pribadi, bukan daftar periksa teknis perpipaan.',
            '3': 'Tren warna wallpaper tidak relevan dengan verifikasi mekanikal pipa.',
            '4': 'Perubahan cuaca luar tidak memeriksa kelengkapan sambungan pipa dalam gedung.'
          },
          mnemonicSensei: 'Final Check Pipa: Pastikan tidak ada baut kendor (締め忘れ) dan posisi kran buka/tutup pas sesuai denah!',
          l1InterferenceAlert: 'Satu fitting yang lupa dikencangkan (締め忘れ) bisa mengakibatkan banjir jutaan yen saat pompa utama gedung dinyalakan. Wajib cek satu per satu dengan spidol inspeksi.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kensetsu-08',
            unitNumber: 8,
            unitTitleId: 'Pekerjaan Utilitas MEP, Perpipaan & Kelistrikan Bangunan',
            advice: 'Metode verifikasi Jepang: Beri tanda spidol cat (マーキング) pada setiap baut/sambungan pipa yang sudah dikencangkan (トルクチェック済み).'
          },
          safetyTip: 'Simpan lembar catatan checklist uji komisioning dengan tanda tangan inspektur sebagai bukti serah terima resmi.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kensetsu-lifeline',
          unitId: 'unit-curriculum-ssw-kensetsu-08',
          unitNumber: 8,
          unitTitleId: 'Pekerjaan Utilitas MEP, Perpipaan & Kelistrikan Bangunan'
        }
      }
    ]
  };
}

module.exports = { getSSWLifelineSet };
