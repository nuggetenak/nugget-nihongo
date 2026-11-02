/**
 * SSW Construction - Building Construction (Kensetsu Kenchiku / 建設建築) Golden Set 01
 * Grounded in JAC (Japan Association for Construction Human Resources) & MLIT Official Textbooks
 * 15 Items: Scaffolding, Fall Arrest Harness, Kyatatsu 75° Rule, Rebar/Formwork, Hot Works & 5S
 */

function getSSWKenchikuSet() {
  return {
    setId: 'ssw-kensetsu-kenchiku-set01',
    trackType: 'ssw',
    sswSectorId: 'ssw-kensetsu-kenchiku',
    title: 'Set Latihan SSW Kensetsu Kenchiku (Konstruksi Gedung) - 01',
    description: 'Simulasi modular 15 menit menguji istilah perancah scaffolding (ashiba), sabuk pengaman full harness, perakitan besi tulangan (tekkin), bekisting (katawaku), tangga lipat, dan K3 gedung.',
    targetUnits: 'Kurikulum Vokasional Kensetsu Kenchiku: Bekerja di Ketinggian, Perakitan Struktur Beton & K3 Gedung',
    totalItems: 15,
    timeLimitMinutes: 15,
    passingScore: 10,
    items: [
      {
        id: 'SSW-KC-S01-Q01',
        trackType: 'ssw',
        sswSectorId: 'ssw-kensetsu-kenchiku',
        mondaiNumber: 1,
        mondaiType: 'ssw_k3_procedure',
        instructionJp: '高所作業の安全保護具について、最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah alat pelindung jatuh yang wajib dipakai pada ketinggian 2 meter ke atas tanpa lantai kerja.',
        prompt: '高さ2メートル以上の 高所（こうしょ）で 作業床がない 場所で作業するとき、必ず着用しなければならない 保護具は 何ですか。',
        targetWord: 'フルハーネス型',
        options: [
          'フルハーネス型墜落制止用器具（命綱）',
          '胴ベルト型安全帯（1本つり）',
          '防塵マスクと保護メガネのみ',
          '皮手袋と安全靴のみ'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Berdasarkan revisi UU K3 Jepang, bekerja di ketinggian 2 meter atau lebih tanpa lantai kerja standar wajib mengenakan Full-Body Harness (フルハーネス型墜落制止用器具). Sabuk pinggang tunggal (胴ベルト型) dilarang karena berisiko fatal merusak organ dalam perut atau terlepas saat terjatuh dengan posisi kepala di bawah.',
          distractorAutopsy: {
            '1': 'フルハーネス型墜落制止用器具 adalah KUNCI BENAR (sabuk pengaman seluruh tubuh penahan jatuh).',
            '2': '胴ベルト型 (sabuk pinggang tunggal) berisiko mematikan saat tergantung lama (suspension trauma).',
            '3': 'Masker debu dan kacamata hanya melindungi muka dari serpihan, bukan menahan gravitasi jatuh.',
            '4': 'Sarung tangan dan sepatu safety adalah APD standar tapi tidak menahan jatuh.'
          },
          mnemonicSensei: 'Ketinggian >= 2 meter = FULL HARNESS Wajib! Mengikat dada, paha, dan punggung agar tidak terpelanting saat jatuh.',
          l1InterferenceAlert: 'Di Indonesia pekerja kadang hanya memakai sabuk pinggang biasa (single belt). Di Jepang, memakai single belt di atas perancah tanpa pengaman adalah pelanggaran fatal.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kensetsu-05',
            unitNumber: 5,
            unitTitleId: 'Pekerjaan di Ketinggian & Pencegahan Jatuh Perancah',
            lessonId: 'les-ssw-kc-01',
            vocabId: 'vg-ssw-kc-001',
            advice: 'Kuasai kosakata: 墜落制止用器具 (alat penahan jatuh), フルハーネス (full harness), ランヤード (tali lanyard), ショックアブソーバ (peredam kejut).'
          },
          safetyTip: 'Gantungkan kait lanyard (hook) selalu pada posisi lebih tinggi dari pinggang (腰より高い位置) untuk meminimalkan jarak jatuh bebas.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kensetsu-kenchiku',
          unitId: 'unit-curriculum-ssw-kensetsu-05',
          unitNumber: 5,
          unitTitleId: 'Pekerjaan di Ketinggian & Pencegahan Jatuh Perancah'
        }
      },
      {
        id: 'SSW-KC-S01-Q02',
        trackType: 'ssw',
        sswSectorId: 'ssw-kensetsu-kenchiku',
        mondaiNumber: 2,
        mondaiType: 'ssw_k3_procedure',
        instructionJp: '脚立の安全使用ルールとして最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah aturan penggunaan tangga lipat (kyatatsu) yang paling benar.',
        prompt: '脚立（きゃたつ）を 使用して作業するときの 安全ルールとして、正しいものは どれですか。',
        targetWord: '天板',
        options: [
          '脚立の天板（最上段）に乗ったり、天板にまたがって作業してはならない',
          '高いところに手が届かないときは、天板につま先立ちで作業する',
          '脚立の脚（あし）の下にブロックを敷いて高さを調整してもよい',
          '脚立を開き止め金具（開き止めチェーン）をかけずに使ってもよい'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Berdiri di anak tangga paling atas / pelat puncak (天板 - tenban) atau menduduki tenban tangga lipat dilarang keras dalam standar K3 Jepang. Posisi tersebut menghilangkan kontak 3 titik dan membuat tangga sangat mudah terjungkal.',
          distractorAutopsy: {
            '1': 'Opsi 1 BENAR MUTLAK: Dilarang menginjak pelat puncak tenban atau mengangkanginya.',
            '2': 'Berjinjit di pelat teratas menyebabkan kehilangan keseimbangan seketika dan cedera kepala fatal.',
            '3': 'Mengganjal kaki tangga dengan bata/balok kayu membuat tangga labil dan roboh saat dibebani.',
            '4': 'Pengunci bentangan tangga (開き止め金具) wajib selalu terkunci sebelum dinaiki.'
          },
          mnemonicSensei: 'Tenban Kinshi! Jangan injak atap tangga! Berdirilah maksimal di anak tangga kedua dari atas dengan dada menempel stabil.',
          l1InterferenceAlert: 'Banyak tukang di Indonesia terbiasa jongkok di pelat teratas tangga lipat aluminium. Di proyek Jepang, pengawas akan langsung berteriak menghentikan Anda jika kaki menyentuh tenban.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kensetsu-05',
            unitNumber: 5,
            unitTitleId: 'Pekerjaan di Ketinggian & Pencegahan Jatuh Perancah',
            advice: '3 Aturan tangga lipat: 1. Jangan injak 天板 (tenban), 2. Pasang pengunci 開き止め, 3. Jangan gunakan sebagai jembatan horisontal.'
          },
          safetyTip: 'Posisikan badan menghadap ke tangga saat naik dan turun (menghadap ke depan tangga, bukan membelakangi).'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kensetsu-kenchiku',
          unitId: 'unit-curriculum-ssw-kensetsu-05',
          unitNumber: 5,
          unitTitleId: 'Pekerjaan di Ketinggian & Pencegahan Jatuh Perancah'
        }
      },
      {
        id: 'SSW-KC-S01-Q03',
        trackType: 'ssw',
        sswSectorId: 'ssw-kensetsu-kenchiku',
        mondaiNumber: 3,
        mondaiType: 'ssw_technical_terminology',
        instructionJp: '足場の安全部材として最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah papan penahan di tepi lantai perancah agar barang tidak jatuh ke bawah.',
        prompt: '足場（あしば）の 作業床から 工具や資材が 下の階へ落ちないように、床の端（はし）に 取り付ける板は 何ですか。',
        targetWord: '幅木',
        options: [
          '幅木（はばき / こぼれ止め）',
          '敷板（しきいた）',
          '筋交い（すじかい）',
          'ジャッキベース'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Papan penahan jatuh / toe board (幅木 - habaki / こぼれ止め) dipasang vertikal di sepanjang tepi lantai perancah (tinggi minimal 15 cm) untuk mencegah perkakas yang tersenggol atau baut jatuh meluncur mengenai orang di lantai bawah.',
          distractorAutopsy: {
            '1': '幅木（はばき） adalah KUNCI BENAR (papan pembatas tepi kaki perancah).',
            '2': '敷板 (papan alas dasar) diletakkan di tanah di bawah jack base untuk meratakan beban tiang perancah.',
            '3': '筋交い (batang silang/bracing) memberi kekakuan diagonal pada rangka perancah.',
            '4': 'ジャッキベース (jack base) adalah ulir pengatur ketinggian kaki perancah di tanah.'
          },
          mnemonicSensei: 'Habaki = Pembatas Kaki! Menahan palu dan baut agar tidak tergelincir jatuh bocok menimpa kepala rekan di bawah.',
          l1InterferenceAlert: 'Jangan samakan Habaki interior lantai (skirting kayu dinding bawah) dengan Habaki perancah (toe board pengaman jatuh alat di bibir scaffolding).',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kensetsu-05',
            unitNumber: 5,
            unitTitleId: 'Pekerjaan di Ketinggian & Pencegahan Jatuh Perancah',
            advice: '3 Lapisan tepi perancah: 手すり (railing atas >= 85 cm), 中桟 (railing tengah), 幅木 (toe board >= 15 cm).'
          },
          safetyTip: 'Jangan menumpuk material melebihi tinggi papan habaki di tepi perancah.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kensetsu-kenchiku',
          unitId: 'unit-curriculum-ssw-kensetsu-05',
          unitNumber: 5,
          unitTitleId: 'Pekerjaan di Ketinggian & Pencegahan Jatuh Perancah'
        }
      },
      {
        id: 'SSW-KC-S01-Q04',
        trackType: 'ssw',
        sswSectorId: 'ssw-kensetsu-kenchiku',
        mondaiNumber: 4,
        mondaiType: 'ssw_hou_ren_so_sbar',
        instructionJp: '安全指示会話として、（　　）に入る最も適切な言葉を一つ選びなさい。',
        instructionId: 'Pilihlah istilah teknik memasang 2 kait lanyard secara bergantian.',
        prompt: '先輩「足場の上を 移動するときは、フックを 交互に掛け替える（　　）を 徹底しろ！」',
        targetWord: '二丁掛け',
        options: [
          '二丁掛け（にちょうがけ）',
          '片手掛け（かたてがけ）',
          '腕組み（うでぐみ）',
          '早歩き（はやあるき）'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Teknik 100% tie-off dengan dua kait lanyard disebut Nichougake (二丁掛け). Pekerja wajib menancapkan kait kedua ke pipa perancah sebelum mencabut kait pertama, sehingga tidak ada momen tanpa pengaman sama sekali saat melangkah melewati tiang.',
          distractorAutopsy: {
            '1': '二丁掛け（にちょうがけ） adalah KUNCI BENAR (metode kait ganda bergantian 100% tie-off).',
            '2': 'Hanya mengandalkan satu kait membuat ada jeda tanpa perlindungan saat berpindah tiang.',
            '3': 'Bersedekap (腕組み) adalah sikap pasif tanpa pengamanan mekanis.',
            '4': 'Berjalan cepat (早歩き) meningkatkan risiko tersandung di atas perancah.'
          },
          mnemonicSensei: 'Ni = Dua kait! Kait ke-2 SUDAH tertancap kuat sebelum kait ke-1 dicabut. Zero detik tanpa cantolan!',
          l1InterferenceAlert: 'Di Jepang, prinsip 100% tie-off tidak menoleransi alasan "cuma pindah tiang sebentar". Jika terbukti melepas kedua kait sekaligus, izin kerja bisa dicabut.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kensetsu-05',
            unitNumber: 5,
            unitTitleId: 'Pekerjaan di Ketinggian & Pencegahan Jatuh Perancah',
            advice: 'Prosedur 二丁掛け: Kait 1 terpasang -> Pasang Kait 2 ke tiang berikutnya -> Lepas Kait 1 -> Melangkah.'
          },
          safetyTip: 'Gunakan kait dengan mekanisme kunci otomatis (double locking hook) agar tidak terlepas sendiri saat bergesekan.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kensetsu-kenchiku',
          unitId: 'unit-curriculum-ssw-kensetsu-05',
          unitNumber: 5,
          unitTitleId: 'Pekerjaan di Ketinggian & Pencegahan Jatuh Perancah'
        }
      },
      {
        id: 'SSW-KC-S01-Q05',
        trackType: 'ssw',
        sswSectorId: 'ssw-kensetsu-kenchiku',
        mondaiNumber: 5,
        mondaiType: 'ssw_technical_terminology',
        instructionJp: '鉄筋工事の部材名として最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah kawat pengikat persilangan besi beton yang diputar dengan alat hacker.',
        prompt: '鉄筋（てっきん）が 交差する部分を 固定するために、ハッカーを 使って巻き付ける 細い針金を 何と呼びますか。',
        targetWord: '結束線',
        options: [
          '結束線（けっそくせん）',
          '番線（ばんせん）',
          'ワイヤーロープ',
          '電線（でんせん）'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Kawat pengikat besi tulangan beton disebut Kessokusen (結束線 - kawat bendrat lentur). Tukang besi (tekkin-kou) menggunakan alat pemutar kait bernama Hacker (ハッカー) untuk mengikat titik persilangan rebar dengan kencang.',
          distractorAutopsy: {
            '1': '結束線（けっそくせん） adalah KUNCI BENAR (kawat bendrat pengikat rebar).',
            '2': '番線 (bansen) adalah kawat baja bakar tebal (nomor 8-10) untuk mengikat balok bekisting atau perancah.',
            '3': 'ワイヤーロープ (wire rope) adalah tali sling baja pengangkat crane.',
            '4': '電線 (densen) adalah kabel berisolasi penghantar listrik.'
          },
          mnemonicSensei: 'Kessoku = Mengikat kuat! Kessokusen = kawat bendrat rebar yang dipuntir dengan alat Hacker.',
          l1InterferenceAlert: 'Di Indonesia alat ini sering disebut "catut" atau "gegep putar". Di Jepang, kawatnya disebut 結束線 (kessokusen) dan alat putarnya disebut ハッカー (hakka-).',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kensetsu-06',
            unitNumber: 6,
            unitTitleId: 'Pekerjaan Besi Tulangan (Tekkin) & Bekisting (Katawaku)',
            advice: 'Kosakata rebar: 鉄筋 (tekkin = besi beton), 配筋 (haikin = susunan tulangan), 結束線 (kawat ikat), ハッカー (hacker).'
          },
          safetyTip: 'Sisa ujung kawat kessokusen yang mencuat harus ditekuk ke dalam agar tidak menusuk betis atau merobek pakaian rekan kerja.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kensetsu-kenchiku',
          unitId: 'unit-curriculum-ssw-kensetsu-06',
          unitNumber: 6,
          unitTitleId: 'Pekerjaan Besi Tulangan (Tekkin) & Bekisting (Katawaku)'
        }
      },
      {
        id: 'SSW-KC-S01-Q06',
        trackType: 'ssw',
        sswSectorId: 'ssw-kensetsu-kenchiku',
        mondaiNumber: 6,
        mondaiType: 'ssw_technical_terminology',
        instructionJp: '型枠工事の金具名として最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah besi penentu ketebalan jarak antar dinding bekisting cor beton.',
        prompt: 'コンクリート型枠（かたわく）の 工事で、型枠の対向する 壁の間隔（厚み）を 一定に保つために 使う金具は 何ですか。',
        targetWord: 'セパレーター',
        options: [
          'セパレーター（セパ）',
          'フォームタイ',
          'パイプサポート',
          'クランプ'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Separator (セパレーター / セパ) adalah batang baja berulir pembatas jarak yang dipasang di antara dua papan bekisting berhadapan untuk mempertahankan ketebalan dinding beton sesuai desain arsitektur saat cor beton mengalir bertekanan hidrostatik.',
          distractorAutopsy: {
            '1': 'セパレーター（セパ） adalah KUNCI BENAR (batang pemisah penentu tebal dinding beton).',
            '2': 'フォームタイ (form-tie) adalah baut penjepit pipa penguat di sisi luar papan bekisting.',
            '3': 'パイプサポート (pipe support) adalah tiang besi penyangga pelat lantai bawah.',
            '4': 'クランプ (clamp) adalah klem pengikat antar pipa perancah.'
          },
          mnemonicSensei: 'Sepa = Separator Pemisah Ketebalan! Menjaga dinding cor agar tebalnya presisi dari ujung ke ujung.',
          l1InterferenceAlert: 'Jangan tertukar antara セパレーター (batang penentu tebal di dalam dinding cor) dengan フォームタイ (penjepit pipa di sisi luar bekisting).',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kensetsu-06',
            unitNumber: 6,
            unitTitleId: 'Pekerjaan Besi Tulangan (Tekkin) & Bekisting (Katawaku)',
            advice: '3 Serangkai bekisting: セパレーター (separator penentu tebal) + フォームタイ (form-tie penjepit) + パイプサポート (tiang penyangga lantai).'
          },
          safetyTip: 'Pastikan ring karet penahan air (watertight ring) terpasang pada separator jika dinding berbatasan dengan tanah bawah tanah.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kensetsu-kenchiku',
          unitId: 'unit-curriculum-ssw-kensetsu-06',
          unitNumber: 6,
          unitTitleId: 'Pekerjaan Besi Tulangan (Tekkin) & Bekisting (Katawaku)'
        }
      },
      {
        id: 'SSW-KC-S01-Q07',
        trackType: 'ssw',
        sswSectorId: 'ssw-kensetsu-kenchiku',
        mondaiNumber: 7,
        mondaiType: 'ssw_k3_procedure',
        instructionJp: 'はしごの安全基準として最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah sudut sandar paling aman saat menegakkan tangga lurus di lapangan.',
        prompt: '現場ではしご（伸縮はしごなど）を 立て掛けて使用するとき、壁や床面に対する 最も安全な角度は 何度ですか。',
        targetWord: '75度',
        options: [
          '約75度',
          '約90度（垂直）',
          '約45度',
          '約30度'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Standar baku keselamatan Jepang menetapkan sudut sandaran tangga tegak adalah sekitar 75 derajat (rasio kemiringan 4:1). Bagian atas tangga wajib menjulur minimal 60 cm di atas lantai pendaratan dan diikat kencang.',
          distractorAutopsy: {
            '1': '約75度 adalah KUNCI BENAR (sudut kemiringan baku tangga sandar).',
            '2': '90 derajat (tegak lurus) membuat pekerja terjengkang ke belakang saat mendaki.',
            '3': '45 derajat memberi beban lentur berlebih dan memicu kaki tangga meluncur mundur.',
            '4': '30 derajat terlalu rebah dan tangga akan langsung patah/tergelincir.'
          },
          mnemonicSensei: 'Sudut Tangga = 75 Derajat! Jangan terlalu tegak (bisa terjengkang), jangan terlalu rebah (bisa meluncur selip).',
          l1InterferenceAlert: 'Di Indonesia, tangga sering disandarkan terlalu landai karena dirasa lebih nyaman dipanjat. Di Jepang, sudut selain 75 derajat dianggap membahayakan nyawa.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kensetsu-05',
            unitNumber: 5,
            unitTitleId: 'Pekerjaan di Ketinggian & Pencegahan Jatuh Perancah',
            advice: 'Rumus tangga aman: 1. Sudut 75°, 2. Puncak tangga menonjol >= 60 cm di atas lantai tujuan (突出長), 3. Ikat puncak tangga ke tiang kokoh.'
          },
          safetyTip: 'Pastikan karet anti-selip (slip stopper) di kaki tangga bersih dari lumpur atau oli sebelum disandarkan.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kensetsu-kenchiku',
          unitId: 'unit-curriculum-ssw-kensetsu-05',
          unitNumber: 5,
          unitTitleId: 'Pekerjaan di Ketinggian & Pencegahan Jatuh Perancah'
        }
      },
      {
        id: 'SSW-KC-S01-Q08',
        trackType: 'ssw',
        sswSectorId: 'ssw-kensetsu-kenchiku',
        mondaiNumber: 8,
        mondaiType: 'ssw_k3_procedure',
        instructionJp: '火気使用作業の安全対策として最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah prosedur pencegahan kebakaran saat pengelasan atau pemotongan gerinda.',
        prompt: 'ガス溶接や グラインダー切断など「火気使用（かきしよう）」作業を 行うとき、火花による 火災を防ぐために 必要な措置は どれですか。',
        targetWord: 'スパッターシート',
        options: [
          '周囲の可燃物を片付け、スパッターシート（防火シート）を敷き、消火器を近くに配備する',
          '火花が散っても水滴がかかれば大丈夫なので、濡れタオルだけ置いておく',
          '作業中は騒音が出るため、周囲に誰にも知らせず一人で急いで終わらせる',
          '風通しをよくするために、換気扇の真下に向けて火花を勢いよく飛ばす'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Pekerjaan panas menghasilkan percikan api bersuhu >1000°C. Regulasi mewajibkan: 1) Membersihkan bahan mudah terbakar dalam radius 5-10m, 2) Menggelar terpal anti-percikan tahan api (スパッターシート), dan 3) Menyediakan tabung APAR di dekat jangkauan tangan serta pengecekan sisa bara api pasca kerja.',
          distractorAutopsy: {
            '1': 'Opsi 1 BENAR: Bersihkan bahan bakar, gelar spatter sheet, dan siapkan tabung APAR di dekatnya.',
            '2': 'Handuk basah tidak mampu membendung guyuran ribuan percikan api gerinda.',
            '3': 'Kerja panas wajib memiliki izin resmi (火気使用届) dan pengawas api (火気監視人).',
            '4': 'Mengarahkan percikan api ke saluran exhaust bisa membakar debu mudah terbakar di dalam ducting.'
          },
          mnemonicSensei: 'Kaki Shiyou (Kerja Panas) = 3 Serangkai: Bersihkan bahan bakar + Gelar Spatter Sheet + Siapkan APAR!',
          l1InterferenceAlert: 'Banyak kebakaran gedung di Jepang terjadi 30-60 menit setelah tukang pulang karena percikan gerinda menyelip di balik insulasi styrofoam/uretana. Wajib periksa bara (火種確認) setelah selesai.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kensetsu-07',
            unitNumber: 7,
            unitTitleId: 'Pencegahan Kebakaran, Bahan Berbahaya & Finishing Gedung',
            advice: 'Kosakata api: 火気使用届 (izin kerja panas), スパッターシート (kain tahan api), 消火器 (shoukaki = tabung APAR).'
          },
          safetyTip: 'Lakukan pemeriksaan titik kerja 30 menit setelah pekerjaan api selesai untuk memastikan tidak ada asap atau bara tersembunyi.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kensetsu-kenchiku',
          unitId: 'unit-curriculum-ssw-kensetsu-07',
          unitNumber: 7,
          unitTitleId: 'Pencegahan Kebakaran, Bahan Berbahaya & Finishing Gedung'
        }
      },
      {
        id: 'SSW-KC-S01-Q09',
        trackType: 'ssw',
        sswSectorId: 'ssw-kensetsu-kenchiku',
        mondaiNumber: 9,
        mondaiType: 'ssw_hou_ren_so_sbar',
        instructionJp: '内装作業の安全会話として、（　　）に入る最も適切な言葉を一つ選びなさい。',
        instructionId: 'Pilihlah alat ventilasi pembuang uap pelarut organik interior.',
        prompt: '職長「内装のクロス貼りや 塗装で 有機溶剤を使うときは、中毒を防ぐために（　　）を 回しながら 作業しろよ！」',
        targetWord: '送風機',
        options: [
          '送風機（局所排気装置）',
          'ヒーター（暖房器具）',
          '加湿器（かしつき）',
          '扇風機を首振りにして弱で'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Lem dan tiner pada interior melepaskan uap pelarut organik (VOC) yang meracuni saraf. Wajib menghidupkan blower penghisap/ventilator pembuang udara (送風機 / 局所排気装置) dan memakai masker gas kimia bertabung filter karbon (防毒マスク).',
          distractorAutopsy: {
            '1': '送風機（局所排気装置） adalah KUNCI BENAR (blower pembuang uap racun keluar ruangan).',
            '2': 'Pemanas ruangan mempercepat penguapan tiner dan memicu bahaya ledakan api.',
            '3': 'Humidifier hanya menyemprotkan uap air, tidak membuang gas kimia berbahaya.',
            '4': 'Kipas angin biasa hanya memutar uap racun di dalam ruangan tanpa mengeluarkannya.'
          },
          mnemonicSensei: 'Yuuki Youzai (Pelarut Organik) = Bau tiner menyengat! Blower pembuang wajib menyala dan pakai masker bertabung gas.',
          l1InterferenceAlert: 'Jangan pakai masker debu putih biasa (防塵マスク) untuk uap tiner cat! Uap kimia menembus masker debu. Harus memakai masker gas khusus (防毒マスク).',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kensetsu-07',
            unitNumber: 7,
            unitTitleId: 'Pencegahan Kebakaran, Bahan Berbahaya & Finishing Gedung',
            advice: 'Bedakan: 防塵マスク (boujin = saring partikel/debu semen) vs 防毒マスク (boudoku = saring gas racun/uap tiner/pelarut organik).'
          },
          safetyTip: 'Ganti canister tabung filter masker gas secara berkala bila bau tiner mulai tercium samar menembus masker.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kensetsu-kenchiku',
          unitId: 'unit-curriculum-ssw-kensetsu-07',
          unitNumber: 7,
          unitTitleId: 'Pencegahan Kebakaran, Bahan Berbahaya & Finishing Gedung'
        }
      },
      {
        id: 'SSW-KC-S01-Q010',
        trackType: 'ssw',
        sswSectorId: 'ssw-kensetsu-kenchiku',
        mondaiNumber: 10,
        mondaiType: 'ssw_technical_terminology',
        instructionJp: '建築資材の名称として最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah nama papan gipsum bahan dasar plafon dan dinding dalam gedung.',
        prompt: '建築現場で、天井や 壁の下地として 広く使われる 石膏（せっこう）を 原料とした 板を 何と呼びますか。',
        targetWord: 'プラスターボード',
        options: [
          'プラスターボード（石膏ボード）',
          'コンクリートパネル（コンパネ）',
          '波板スレート',
          '合板（ベニヤ板）'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Papan gipsum / plasterboard (プラスターボード / 石膏ボード - sekkou bo-do) adalah material pelapis dinding dan plafon standar tahan api yang disekrupkan pada rangka baja ringan (LGS) atau kayu.',
          distractorAutopsy: {
            '1': 'プラスターボード（石膏ボード） adalah KUNCI BENAR (papan gipsum pelapis dinding/plafon).',
            '2': 'コンパネ (kompane) adalah triplek tebal khusus bekisting cor beton.',
            '3': '波板スレート (asbes/seng gelombang) untuk atap luar pabrik.',
            '4': '合板 (triplek veneer kayu) untuk lantai kerja atau mebel.'
          },
          mnemonicSensei: 'Plaster Board / Sekkou Board = Papan gipsum dinding dalam. Tahan api dan dipasang dengan sekrup bor.',
          l1InterferenceAlert: 'Di Indonesia sering disebut merek dagang seperti "Jayaboard" atau "gypsum board". Di Jepang istilah resminya adalah 石膏ボード (sekkou bo-do) atau プラスターボード.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kensetsu-07',
            unitNumber: 7,
            unitTitleId: 'Pencegahan Kebakaran, Bahan Berbahaya & Finishing Gedung',
            advice: 'Istilah interior: 軽量鉄骨 / LGS (rangka baja ringan), ビス留め (pasang sekrup), パテ処理 (dempul sambungan).'
          },
          safetyTip: 'Saat memotong papan gipsum dengan cutter, gunakan kacamata debu agar serbuk putih tidak mengiritasi mata.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kensetsu-kenchiku',
          unitId: 'unit-curriculum-ssw-kensetsu-07',
          unitNumber: 7,
          unitTitleId: 'Pencegahan Kebakaran, Bahan Berbahaya & Finishing Gedung'
        }
      },
      {
        id: 'SSW-KC-S01-Q011',
        trackType: 'ssw',
        sswSectorId: 'ssw-kensetsu-kenchiku',
        mondaiNumber: 11,
        mondaiType: 'ssw_k3_procedure',
        instructionJp: '荷揚げ作業の危険動作として最も不適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah tindakan yang SANGAT BERBAHAYA dan dilarang saat material dinaikkan dengan crane ke lantai atas.',
        prompt: 'クレーンで 資材を 上の階へ搬入（荷揚げ）する際、作業員が取ってはならない 極めて危険な行動は どれですか。',
        targetWord: '荷揚げ',
        options: [
          '荷物が完全に床に着地する前に、吊り荷を真下から手で迎えに行く',
          '介錯ロープを持って荷物の揺れを抑える',
          '安全帯（ハーネス）のフックを開口部手前の親綱に取り付ける',
          'クレーンオペレーターに無線または手合図で明確に伝える'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Jangan pernah berdiri di bawah atau menjemput material yang masih menggantung dengan tangan kosong dari bawah. Bila sling putus atau hidrolik anjlok, pekerja akan langsung tertimpa beban ratusan kilogram. Kendalikan dengan tali pandu (介錯ロープ) dari posisi aman.',
          distractorAutopsy: {
            '1': 'Opsi 1 ADALAH LARANGAN FATAL: Berdiri di bawah barang gantung untuk menjemput dengan tangan kosong.',
            '2': 'Memegang tali pemandu (介錯ロープ) dari jarak aman adalah prosedur yang benar.',
            '3': 'Mencantolkan hook harness ke tali induk (親綱) di dekat bukaan lantai adalah wajib.',
            '4': 'Berkomunikasi jelas lewat handy-talky atau sinyal tangan adalah standar baku.'
          },
          mnemonicSensei: 'Jangan jemput barang melayang! Tarik pakai tali pandu (介錯ロープ) dari samping, tunggu sampai mendarat stabil di lantai.',
          l1InterferenceAlert: 'Refleks ingin cepat selesai sering membuat pekerja langsung menyongsong barang gantung. Di Jepang, berada di bawah beban gantung (吊り荷の下) adalah pelanggaran berat.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kensetsu-05',
            unitNumber: 5,
            unitTitleId: 'Pekerjaan di Ketinggian & Pencegahan Jatuh Perancah',
            advice: 'Aturan 荷揚げ (Niage): Pasang barikade di bawah -> Gunakan 介錯ロープ -> Jangan sentuh barang sebelum mendarat stabil di lantai.'
          },
          safetyTip: 'Pastikan area pendaratan material bersih dari puing-puing agar balok bantalan (bansen/timber) rata dan tidak miring.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kensetsu-kenchiku',
          unitId: 'unit-curriculum-ssw-kensetsu-05',
          unitNumber: 5,
          unitTitleId: 'Pekerjaan di Ketinggian & Pencegahan Jatuh Perancah'
        }
      },
      {
        id: 'SSW-KC-S01-Q012',
        trackType: 'ssw',
        sswSectorId: 'ssw-kensetsu-kenchiku',
        mondaiNumber: 12,
        mondaiType: 'ssw_technical_terminology',
        instructionJp: '測定工具の名称として最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah alat bandul benang berbeban untuk memeriksa ketegakan vertikal tiang gedung.',
        prompt: '建築現場で、壁や柱が 垂直（まっすぐ立っているか）かどうかを 確かめるために使う、糸の先に 重りがついた 道具は 何ですか。',
        targetWord: '下げ振り',
        options: [
          '下げ振り（さげふり）',
          '巻き尺（スケール）',
          '指矩（さしがね）',
          '墨壺（すみつぼ）'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Bandul lot ketegakan (下げ振り - sagefuri) terdiri dari kerucut logam berbobot yang digantung benang untuk memanfaatkan gravitasi bumi guna memeriksa ketegakan vertikal (垂直度 - suichokudo) tiang, kolom, atau bekisting.',
          distractorAutopsy: {
            '1': '下げ振り（さげふり） adalah KUNCI BENAR (bandul lot penguji ketegakan vertikal).',
            '2': '巻き尺 / スケール (meteran gulung) untuk mengukur jarak panjang garis.',
            '3': '指矩 (sashigane) adalah penggaris siku L baja tukang kayu.',
            '4': '墨壺 (sumitsubo) adalah wadah tinta penarik garis lurus di lantai.'
          },
          mnemonicSensei: 'Sage (Turun) + Furi (Berayun) = Bandul lot berayun vertikal lurus ke bumi! Memastikan tiang berdiri tegak lurus.',
          l1InterferenceAlert: 'Di Indonesia sering disebut "unting-unting" atau "lot gantung". Di Jepang istilahnya adalah 下げ振り (sagefuri).',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kensetsu-06',
            unitNumber: 6,
            unitTitleId: 'Pekerjaan Besi Tulangan (Tekkin) & Bekisting (Katawaku)',
            advice: 'Trio alat tukang: 下げ振り (sagefuri = unting-unting lot), 指矩 (sashigane = siku L), 墨壺 (sumitsubo = penarik garis tinta).'
          },
          safetyTip: 'Tunggu ayunan bandul benar-benar berhenti (tenang) sebelum membaca jarak milimeter ke acuan mistar.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kensetsu-kenchiku',
          unitId: 'unit-curriculum-ssw-kensetsu-06',
          unitNumber: 6,
          unitTitleId: 'Pekerjaan Besi Tulangan (Tekkin) & Bekisting (Katawaku)'
        }
      },
      {
        id: 'SSW-KC-S01-Q013',
        trackType: 'ssw',
        sswSectorId: 'ssw-kensetsu-kenchiku',
        mondaiNumber: 13,
        mondaiType: 'ssw_k3_procedure',
        instructionJp: '開口部の安全管理として「誤っているもの」を1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah tindakan yang SALAH mengenai penanganan lubang bukaan lantai (kaikoubu).',
        prompt: '建築現場の 床開口部（吹抜けや階段ホールなど）で、転落事故を 防ぐために講じるべき 対策として 誤っているものは どれですか。',
        targetWord: '開口部',
        options: [
          '歩きやすいように、開口部に敷いてある合板のフタを断りなく外しておく',
          '開口部の周囲に高さ85cm以上の堅固な手すりを設置する',
          '開口部のフタには「開口部・墜落注意・動かすな」と明記して固定する',
          '手すりの設置が困難な場所には安全ネットを水平に張る'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Membuka penutup lubang lantai tanpa izin, tanpa peringatan, dan tanpa memasang pagar pengganti adalah pelanggaran mematikan yang menyebabkan orang lain terperosok jatuh bebas ke lantai dasar.',
          distractorAutopsy: {
            '1': 'Opsi 1 ADALAH TINDAKAN SALAH/BERBAHAYA: Membuka penutup lubang bukaan sesuka hati tanpa izin.',
            '2': 'Memasang pagar pembatas setinggi >= 85 cm adalah kewajiban standar hukum.',
            '3': 'Menuliskan "Bukaan Lantai - Awas Jatuh - Jangan Dipindah" pada penutup yang dibaut adalah prosedur benar.',
            '4': 'Membentangkan jaring pengaman (safety net) di bawah bukaan adalah mitigasi yang disahkan.'
          },
          mnemonicSensei: 'Tutup lubang lantai (開口部のフタ) HARAM dibuka seenaknya! Sekali dilepas tanpa pagar, kawan bisa meluncur bebas ke dasar.',
          l1InterferenceAlert: 'Di proyek darurat di Indonesia lubang sering cuma ditutup kardus lepas. Di Jepang, penutup wajib dari papan tebal dibaut dan dicat tulisan peringatan jelas.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kensetsu-05',
            unitNumber: 5,
            unitTitleId: 'Pekerjaan di Ketinggian & Pencegahan Jatuh Perancah',
            advice: 'Aturan 開口部: Pagar >= 85 cm, papan penutup dibaut dengan tulisan peringatan, pasang jaring net di bawahnya.'
          },
          safetyTip: 'Jika terpaksa membuka tutup lubang untuk menurunkan barang, tugaskan satu orang berdiri sebagai penjaga (監視人) selama lubang terbuka.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kensetsu-kenchiku',
          unitId: 'unit-curriculum-ssw-kensetsu-05',
          unitNumber: 5,
          unitTitleId: 'Pekerjaan di Ketinggian & Pencegahan Jatuh Perancah'
        }
      },
      {
        id: 'SSW-KC-S01-Q014',
        trackType: 'ssw',
        sswSectorId: 'ssw-kensetsu-kenchiku',
        mondaiNumber: 14,
        mondaiType: 'ssw_hou_ren_so_sbar',
        instructionJp: '墨出し確認の会話として、最も適切な返答を一つ選びなさい。',
        instructionId: 'Pilihlah jawaban profesional saat mengonfirmasi posisi baut angkur pada garis tanda denah.',
        prompt: '先輩「よし、この柱のアンカーボルトの位置、墨出し（すみだし）の線に 合っているか 確認してくれ！」後輩「（　　）！」',
        targetWord: '墨出し',
        options: [
          'はい、墨線のど真ん中にピッタリ合っています。位置ヨシ！',
          'はい、だいたい近くにあるので問題ないと思います！',
          'ボルトは隠れて見えませんが、大丈夫です！',
          '墨線が消えていますが、勘で合わせました！'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Konstruksi Jepang menuntut akurasi milimeter. Konfirmasi harus memastikan posisi baut tepat di garis acuan tinta (墨線 - sumisen) disertai seruan 指差し呼称: 『位置ヨシ！』 (Posisi OK!).',
          distractorAutopsy: {
            '1': 'はい、墨線のど真ん中に合っています。位置ヨシ！ adalah KUNCI BENAR (akurat milimeter & yubisashi koshou).',
            '2': 'Menjawab "daitai" (kira-kira dekat) tidak dapat diterima dalam pemasangan tiang struktur.',
            '3': 'Mengonfirmasi tanpa melihat langsung baut melanggar prinsip verifikasi faktual.',
            '4': 'Menebak berdasarkan intuisi (勘) saat garis hilang berakibat fatal pada pembongkaran struktur.'
          },
          mnemonicSensei: 'Sumidashi = Garis Tinta Suci! Jawaban profesional Jepang: Pas di garis tinta, Ichi Yoshi! (Bukan "kira-kira dekat").',
          l1InterferenceAlert: 'Hindari kata "kira-kira" (だいたい / たぶん) saat melapor ke Shokuchou. Konstruksi Jepang menuntut akurasi toleransi milimeter.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kensetsu-06',
            unitNumber: 6,
            unitTitleId: 'Pekerjaan Besi Tulangan (Tekkin) & Bekisting (Katawaku)',
            advice: 'Istilah marking: 墨出し (sumidashi = membuat garis tanda denah), 墨線 (sumisen = garis tinta), 逃げ墨 (nigesumi = garis offset pembantu).'
          },
          safetyTip: 'Bila garis tinta terhapus air hujan, laporkan ke senior untuk ditarik ulang dengan mistar ukur sebelum mengebor.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kensetsu-kenchiku',
          unitId: 'unit-curriculum-ssw-kensetsu-06',
          unitNumber: 6,
          unitTitleId: 'Pekerjaan Besi Tulangan (Tekkin) & Bekisting (Katawaku)'
        }
      },
      {
        id: 'SSW-KC-S01-Q015',
        trackType: 'ssw',
        sswSectorId: 'ssw-kensetsu-kenchiku',
        mondaiNumber: 15,
        mondaiType: 'ssw_k3_procedure',
        instructionJp: '熱中症予防の行動として最も適切なものを1・2・3・4から一つ選びなさい。',
        instructionId: 'Pilihlah tindakan pencegahan sengatan panas (heatstroke) yang benar saat musim panas di lapangan gedung.',
        prompt: '夏場の建設現場において、熱中症（ねっちゅうしょう）を 予防するための 正しい行動は どれですか。',
        targetWord: '熱中症',
        options: [
          '喉（のど）が渇く前に、こまめに水分と適度な塩分を補給し、休憩所を利用する',
          '我慢できる限界まで水を飲まずに作業を続け、終業後にまとめて飲む',
          '水分だけを大量にガブ飲みして、塩分やミネラルは一切摂らない',
          'めまいや頭痛がしても、職長に迷惑がかかるので隠して作業を続ける'
        ],
        correctOptionIndex: 0,
        explanation: {
          justification: 'Di musim panas dengan kelembapan tinggi, pekerja wajib minum air dan asupan garam/elektrolit secara teratur SEBELUM merasa haus. Menyembunyikan rasa pusing di atas perancah bisa berakibat pingsan dan jatuh fatal.',
          distractorAutopsy: {
            '1': 'Opsi 1 BENAR: Minum air & garam berkala sebelum haus, serta istirahat di ruang teduh.',
            '2': 'Menahan haus sampai jam kerja selesai memicu syok dehidrasi parah dan gagal ginjal.',
            '3': 'Minum air murni berlebihan tanpa garam mengencerkan natrium darah dan memicu kram otot parah (hiponatremia).',
            '4': 'Menyembunyikan gejala pusing atau mual di atas scaffolding sangat berbahaya.'
          },
          mnemonicSensei: 'Aturan Musim Panas: Minum SEBELUM haus + jangan lupa permen garam (塩飴 - shio-ame) / tablet garam!',
          l1InterferenceAlert: 'Banyak pekerja Indonesia merasa "saya dari negara tropis pasti tahan panas". Musim panas Jepang (37°C dengan kelembapan 85%) sering lebih mematikan karena panas terperangkap di dalam cor beton dan jaring perancah.',
          remedialPrescription: {
            unitId: 'unit-curriculum-ssw-kensetsu-01',
            unitNumber: 1,
            unitTitleId: 'Dasar Keselamatan Alat Berat & Penggalian Lapangan',
            advice: '3 Benteng panas: 水分・塩分補給 (minum air + garam), 空調服 (jaket blower kipas), cek indeks WBGT.'
          },
          safetyTip: 'Jika merasa keringat mendadak berhenti mengalir disertai kulit memerah dan panas, itu tanda bahaya heatstroke stadium parah: segera minta pertolongan.'
        },
        curriculumRef: {
          trackId: 'curriculum-ssw-kensetsu-kenchiku',
          unitId: 'unit-curriculum-ssw-kensetsu-01',
          unitNumber: 1,
          unitTitleId: 'Dasar Keselamatan Alat Berat & Penggalian Lapangan'
        }
      }
    ]
  };
}

module.exports = { getSSWKenchikuSet };
