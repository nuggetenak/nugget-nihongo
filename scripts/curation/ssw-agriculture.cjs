// SSW Agriculture (耕種・畜産農業 - Nōgyō) Set 01
// Curriculum Reference: MAFF (Ministry of Agriculture, Forestry and Fisheries) & ASCA Official Textbooks

const sswAgricultureSet01 = {
  id: "ssw-agriculture-set01",
  title: "SSW Tokutei Ginou: Agriculture (Nougyou) Set 01",
  track: "ssw-agriculture",
  level: "A2-B1",
  tier: "standard",
  durationMinutes: 15,
  passingScorePercent: 70,
  recommendedRetakeIntervalDays: 7,
  focusAreas: [
    "Pesticide Spraying & PPE Safety Protocols (Nouyaku Sampai)",
    "Agricultural Machinery & Tractor PTO Entanglement Prevention",
    "Greenhouse Microclimate & Heatstroke Prevention (Hausu Saibai)",
    "Harvesting, Fruit Thinning & Sorting Standards (Tekika / Senbetsu)",
    "Livestock Biosecurity & Disinfection Protocols (Kachiku Eisei)"
  ],
  questions: [
    {
      id: "agri-q01",
      section: "safety-procedures",
      format: "single-choice",
      promptJa: "農薬（のうやく）を散布するとき、風向きに対してどのように散布するのが正しいですか。",
      promptEn: "When spraying agricultural pesticides, how should you position yourself relative to the wind direction?",
      optionsJa: [
        "風上（かざかみ）を背にして、風下（かざしも）に向かって散布する",
        "風下（かざしも）に立ち、風上に向かって散布する",
        "風が強く吹き荒れている台風のような時に散布する",
        "風向きは一切気にせず、自分の歩きたい方向に散布する"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "ASCA Nougyou Text",
        chapter: "Chapter 3: Crop Cultivation & Pest Control",
        pageOrUnit: "Unit 3.2 - Pesticide Safety & Wind Alignment"
      },
      explanation: {
        justification: "When applying pesticides, the operator must always stand upwind with their back to the wind (風上を背にする) and spray downwind (風下に向かって). Standing downwind causes the toxic chemical mist to blow directly back into the operator's breathing zone and eyes.",
        distractorAutopsy: {
          "1": "Standing downwind causes the applicator to walk directly into the airborne poison cloud.",
          "2": "Spraying during high winds causes uncontrollable chemical drift (ドリフト) onto neighboring crops, homes, and livestock.",
          "3": "Disregarding wind direction leads to severe acute chemical poisoning (農薬中毒)."
        },
        senseiMnemonic: "Semprot pestisida: 'Punggung membelakangi angin!' (風上を背にする). Biarkan angin meniup racun menjauhi badanmu, jangan hirup kabut kimianya.",
        l1InterferenceAlert: "Di beberapa sawah pedesaan, petani kadang menyemprot tanpa memperhitungkan hembusan angin. Di pertanian modern Jepang, arah angin wajib dicek dengan bendera pita sebelum membuka kran semprot.",
        remedialPrescription: "Kaidah semprot racun: 1. Berdiri di 风上 (kazakami = atas angin), 2. Semprot ke arah 风下 (kazashimo = bawah angin), 3. Jangan semprot jika angin kencang ($>3\\text{ m/s}$)."
      }
    },
    {
      id: "agri-q02",
      section: "safety-procedures",
      format: "single-choice",
      promptJa: "トラクターのPTOシャフト（動力取り出し軸）の周りで作業するとき、巻き込まれ事故を防ぐための最重要ルールは何ですか。",
      promptEn: "When working around a tractor's PTO shaft (power take-off shaft), what is the most critical rule to prevent entanglement accidents?",
      optionsJa: [
        "PTO安全カバーを必ず装着し、エンジンを停止してから近づく",
        "だぶだぶのゆったりした長袖を着て作業する",
        "手袋として軍手（布製手袋）をはめてシャフトを直接触る",
        "回転している最中に手や足で泥を払い落とす"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "ASCA Nougyou Text",
        chapter: "Chapter 2: Farm Machinery Operation & Safety",
        pageOrUnit: "Unit 2.1 - Tractor PTO Shaft Safety"
      },
      explanation: {
        justification: "A rotating PTO shaft turns at 540 to 1000 RPM with massive torque. Loose clothing, towels around necks, or gloves touching an uncovered shaft results in instantaneous total body entanglement and fatal maiming. Safety shields must be fitted and the engine switched OFF before approaching.",
        distractorAutopsy: {
          "1": "Loose baggy clothing is the number one cause of fabric snagging into spinning shafts.",
          "2": "Knit fabric work gloves (軍手) snag into revolving shafts instantly, dragging the entire arm into the gearbox.",
          "3": "Touching or kicking a rotating shaft to clear mud leads to instant limb amputation."
        },
        senseiMnemonic: "Poros PTO traktor berputar ribuan kali per menit! 'Kunci mati mesin baru sentuh, pasang cover pelindung selalu!' Jangan pakai pakaian longgar.",
        l1InterferenceAlert: "Banyak kecelakaan fatal magang pertanian di Jepang berawal dari handuk yang dikalungkan di leher (首かけタオル) terlilit poros traktor. Dilarang keras mengalungkan handuk!",
        remedialPrescription: "Larangan mati mekanisasi: 1. Pasang PTOカバー, 2. Mesin wajib OFF saat pengecekan, 3. Dilarang kain longgar/handuk leher/sarung tangan kain rajut."
      }
    },
    {
      id: "agri-q03",
      section: "technical-vocabulary",
      format: "single-choice",
      promptJa: "果樹（トマトやりんごなど）の栽培で、大きく甘い果実を収穫するために、余分な花や小さな実を摘み取る作業を何と言いますか。",
      promptEn: "In fruit cultivation (such as tomatoes or apples), what is the practice called of picking off excess flowers or small fruits to grow larger, sweeter produce?",
      optionsJa: [
        "摘果（てきか / 実すぐり）",
        "土寄せ（つちよせ）",
        "中耕（ちゅうこう）",
        "定植（ていしょく）"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "ASCA Nougyou Text",
        chapter: "Chapter 3: Crop Cultivation & Pest Control",
        pageOrUnit: "Unit 3.4 - Pruning & Fruit Thinning"
      },
      explanation: {
        justification: "Fruit thinning is called 'Tekika' (摘果 / 実すぐり). By removing deformed, small, or excess fruits, nutrients are concentrated into the prime fruits, ensuring high market grade, size, and sweetness while preventing tree alternate-bearing exhaustion.",
        distractorAutopsy: {
          "1": "Earthing up / hilling (土寄せ) piles soil around plant bases to prevent root exposure and support stalks.",
          "2": "Inter-row tillage (中耕) loosens surface soil between crop rows to aerate roots and eliminate young weeds.",
          "3": "Transplanting seedlings to final farm beds is called 'Teishoku' (定植)."
        },
        senseiMnemonic: "'Teki' (Memetik) + 'Ka' (Buah) = Petik buah yang kerdil/cacat! Sisakan buah yang montok agar nutrisinya tidak terbagi-bagi.",
        l1InterferenceAlert: "Bagi pemula, terasa sayang membuang buah muda yang banyak. Namun di Jepang, kualitas (kemanisan dan ukuran) dihargai jauh lebih tinggi daripada kuantitas buah kecil yang murah.",
        remedialPrescription: "Kosakata budidaya buah: 摘花 (tekka = rontokkan bunga berlebih), 摘果 (tekika = seleksi buah), 摘心 (tekishin = pangkas pucuk daun)."
      }
    },
    {
      id: "agri-q04",
      section: "safety-procedures",
      format: "single-choice",
      promptJa: "ビニールハウス（施設園芸）の内部で夏場に作業する際、熱中症を防ぐための管理として正しいものはどれですか。",
      promptEn: "When working inside a plastic greenhouse during summer, what is the correct environmental management practice to prevent heatstroke?",
      optionsJa: [
        "サイドのビニールを開け、換気扇（ファン）を回し、遮光ネット（寒冷紗）を活用する",
        "湿気と熱を閉じ込めるために、ハウスの窓やドアを完全に閉め切る",
        "体温が下がると風邪を引くため、厚着をして長時間の連続作業を行う",
        "ハウス内の温度計は見ずに、自分の勘だけで限界まで耐える"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "ASCA Nougyou Text",
        chapter: "Chapter 1: Farm Work Safety & Environment",
        pageOrUnit: "Unit 1.3 - Greenhouse Climate Control & Heatstroke"
      },
      explanation: {
        justification: "Greenhouses act as solar heat traps, easily exceeding $40-45^\\circ\\text{C}$ in summer. Ventilation fans, rolled-up sidewalls, and shade cloth netting (遮光ネット / 寒冷紗) are essential to lower radiant heat, coupled with scheduled hydration and rest breaks.",
        distractorAutopsy: {
          "1": "Sealing doors and windows causes temperatures to soar past $50^\\circ\\text{C}$, causing fatal heat stroke within minutes.",
          "2": "Heavy clothing prevents evaporative sweat cooling and accelerates thermal exhaustion.",
          "3": "Disregarding digital thermometers and relying on stubborn endurance causes collapsed unconsciousness."
        },
        senseiMnemonic: "Greenhouse musim panas bagaikan sauna raksasa! Buka tirai samping, nyalakan exhaust, pasang jaring peneduh (遮光ネット), dan sering istirahat minum.",
        l1InterferenceAlert: "Suhu di dalam greenhouse Jepang jauh lebih menyengat daripada sawah terbuka di Indonesia. Panas radiasi infra-merah di bawah plastik bisa memicu dehidrasi kilat.",
        remedialPrescription: "Kombinasi pendinginan greenhouse: 1. 換気ファン (kipas exhaust), 2. 遮光ネット (shading net), 3. ミスト装置 (pengabutan air), 4. Minum air + garam berkala."
      }
    },
    {
      id: "agri-q05",
      section: "technical-vocabulary",
      format: "single-choice",
      promptJa: "収穫した農作物を大きさ・重さ・色・傷の有無などによってランク分けし、箱詰めする作業を何と言いますか。",
      promptEn: "What is the process called of categorizing harvested crops into grades by size, weight, color, and blemish presence, and packing them into boxes?",
      optionsJa: [
        "選別（せんべつ）・調製（ちょうせい）",
        "育苗（いくびょう）",
        "播種（はしゅ）",
        "土壌消毒（どじょうしょうどく）"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "ASCA Nougyou Text",
        chapter: "Chapter 4: Post-Harvest Handling & Shipping",
        pageOrUnit: "Unit 4.1 - Grading & Sorting (Senbetsu)"
      },
      explanation: {
        justification: "Sorting and post-harvest trimming is called 'Senbetsu' (選別) and 'Chousei' (調製). Produce is classified according to Japan Agricultural Cooperatives (JA) standards into classes (秀 - Shu/Grade A, 優 - Yuu/Grade B, 良 - Ryou/Grade C) and sizes (2L, L, M, S).",
        distractorAutopsy: {
          "1": "Nursery seedling raising is called 'Ikubyou' (育苗).",
          "2": "Seed sowing is called 'Hashu' (播種).",
          "3": "Soil chemical/solar fumigation is called 'Dojou Shoudoku' (土壌消毒)."
        },
        senseiMnemonic: "'Senbetsu' = Memilih dan Memisahkan! Grade A (秀 - mulus), Grade B (優 - sedikit gores), Grade C (良 - bengkok). Jangan sampai salah kotak!",
        l1InterferenceAlert: "Di pasar tradisional Indonesia, cabai atau buah sering dicampur dalam satu karung. Di Jepang, satu buah tomat yang salah ukuran atau bergores di kotak 'Grade A' bisa membuat satu palet ditolak oleh pembeli pasar lelang (JA).",
        remedialPrescription: "Tingkatan mutu JA: 秀 (Shu = Istimewa/sempurna), 優 (Yuu = Baik), 良 (Ryou = Cukup baik). Ukuran: 2L, L, M, S."
      }
    },
    {
      id: "agri-q06",
      section: "safety-procedures",
      format: "single-choice",
      promptJa: "農場で刈払機（かりばらいき / 草刈り機）を使用して雑草を刈る際、小石の飛散による失明やケガを防ぐための必須装備はどれですか。",
      promptEn: "When using a brush cutter (weed trimmer) to cut weeds on a farm, what essential PPE protects against blindness and injury from flying stones?",
      optionsJa: [
        "フェイスシールド（または保護メガネ）および飛散防止カバー",
        "サンダルとサングラスのみ",
        "麦わら帽子と軍手のみ",
        "普通の長靴だけでメガネは不要"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "ASCA Nougyou Text",
        chapter: "Chapter 2: Farm Machinery Operation & Safety",
        pageOrUnit: "Unit 2.3 - Brush Cutter Safety & Face Protection"
      },
      explanation: {
        justification: "Brush cutters spin carbide-tipped blades at over 5000 RPM. When blades strike stones, pebbles ricochet with bullet-like velocity. A face shield / protective goggles and blade debris guard (飛散防止カバー) are compulsory, along with shin guards (すね当て).",
        distractorAutopsy: {
          "1": "Sandals leave feet exposed to rotating blades, and fashion sunglasses lack impact-resistant ballistic polycarbonate lenses.",
          "2": "A straw hat and cloth gloves offer zero projectile barrier protection against high-speed stone chips.",
          "3": "Omitting eye protection frequently leads to permanent traumatic corneal rupture and blindness."
        },
        senseiMnemonic: "Mesin babat rumput (草刈り機) = Pelempar batu liar! 'Face shield di muka, cover pengaman di mata pisau, pelindung tulang kering di kaki.'",
        l1InterferenceAlert: "Di Indonesia banyak tukang potong rumput hanya memakai topi dan kaos biasa tanpa kacamata pelindung. Di Jepang, batu terpental dari mata pisau mesin babat adalah penyebab kebutaan kerja nomor satu di sektor pertanian.",
        remedialPrescription: "Set pelindung potong rumput: フェイスシールド (pelindung wajah), 飛散防止カバー (cover anti-cipratan), すね当て (pelindung tulang kering), 防振手袋 (sarung tangan anti-getar)."
      }
    },
    {
      id: "agri-q07",
      section: "on-site-dialogue",
      format: "single-choice",
      promptJa: "農場長「今日の夕方から大雨と強風の予報が出ているぞ。ハウスの（　　）をしっかり点検して、風で飛ばされないように締め直せ！」",
      promptEn: "Farm Manager: 'Heavy rain and strong wind storms are forecasted for this evening. Check the greenhouse (    ) thoroughly and retighten them so they don't blow away!'",
      optionsJa: [
        "ハウスバンド（マイカ線・押さえ紐）",
        "農機具のペンキのツヤ",
        "休憩所の灰皿",
        "畑の雑草の長さ"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "ASCA Nougyou Text",
        chapter: "Chapter 1: Farm Work Safety & Environment",
        pageOrUnit: "Unit 1.4 - Typhoon & Severe Weather Preparedness"
      },
      explanation: {
        justification: "Before typhoons or gales, greenhouse securing straps (ハウスバンド / マイカ線 - tie-down bands across the film) must be checked and cinched tight to prevent the plastic skin from ballooning, ripping, or collapsing the structural galvanized pipe arches.",
        distractorAutopsy: {
          "1": "Paint glossiness on equipment has zero bearing on storm anchoring resistance.",
          "2": "The breakroom ashtray does not protect agricultural infrastructure from typhoon winds.",
          "3": "Weed length does not affect roof plastic film tear-off prevention."
        },
        senseiMnemonic: "'House Band' = Sabuk pengikat atap plastik greenhouse! Kencangkan tali band ke patok tanah agar plastik tidak terbang diterbangkan badai.",
        l1InterferenceAlert: "Bila atap plastik terlepas sedikit saja saat badai, angin akan masuk dari celah itu dan merobek seluruh atap greenhouse dalam sekejap. Harus diperiksa ikatan sabuknya.",
        remedialPrescription: "Langkah antisipasi badai/topan: 1. Kencangkan ハウスバンド, 2. Tutup rapat semua ventilasi dan pintu, 3. Pastikan selokan (明渠 - meikyo) bebas sumbatan air."
      }
    },
    {
      id: "agri-q08",
      section: "technical-vocabulary",
      format: "single-choice",
      promptJa: "畜産農業（牛・豚・鶏など）において、伝染病（鳥インフルエンザや豚熱など）の農場内への侵入を防ぐために出入口で行う最も基本的な衛生管理は何ですか。",
      promptEn: "In livestock farming, what is the most fundamental hygiene practice conducted at entrance gates to prevent infectious diseases (bird flu, CSF) from entering the farm?",
      optionsJa: [
        "専用の衣服・長靴への履き替えと、車両・手指の徹底的な消毒",
        "動物たちに大きな声で「こんにちは」と元気に挨拶する",
        "出入口のドアを常に開け放して風通しをよくしておく",
        "近所の野良猫や野生動物を畜舎内に自由に招き入れる"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "ASCA Nougyou Text",
        chapter: "Chapter 5: Livestock Biosecurity & Management",
        pageOrUnit: "Unit 5.1 - Farm Biosecurity & Disinfection"
      },
      explanation: {
        justification: "Biosecurity protocols (バイオセキュリティ / 飼養衛生管理基準) mandate vehicle wheel bath spraying, shoe-changing into dedicated farm boots, hand disinfection, and wearing sterile overalls to block pathogen transmission into barns.",
        distractorAutopsy: {
          "1": "Shouting greetings at animals has no pharmacological or viral sterilization effect.",
          "2": "Leaving barn doors wide open allows wild birds and rodents to enter and spread avian influenza or African swine fever.",
          "3": "Inviting stray cats or wild fauna inside is an extreme biosecurity violation that introduces lethal viral vectors."
        },
        senseiMnemonic: "Biosecurity Peternakan: Ganti sepatu boot khusus + semprot disinfektan roda mobil + cuci tangan! Jangan biarkan virus flu burung / flu babi masuk kandang.",
        l1InterferenceAlert: "Satu ekor ayam atau babi terinfeksi di Jepang berakibat pemusnahan total (殺処分 - satsushobun) ratusan ribu ekor ternak dan kerugian milyaran rupiah. Disinfeksi bukan formalitas!",
        remedialPrescription: "Prosedur masuk kandang: 1. Injak karpet disinfektan (消毒マット), 2. Ganti sepatu boot bersih (専用長靴), 3. Pakai wearpack bersih (防護服), 4. Pasang jaring burung (防鳥ネット)."
      }
    },
    {
      id: "agri-q09",
      section: "technical-vocabulary",
      format: "single-choice",
      promptJa: "農薬や肥料を保管する倉庫（農薬保管庫）の管理方法として、法令で定められている必須のルールはどれですか。",
      promptEn: "Regarding the warehouse where pesticides and fertilizers are stored, what is the mandatory legally required rule?",
      optionsJa: [
        "必ず頑丈な鍵（カギ）をかけて施錠管理し、関係者以外立ち入り禁止にする",
        "誰でもいつでも自由に持って行けるように、扉を開けておく",
        "清涼飲料水のペットボトルに移し替えて並べておく",
        "日光が一日中直接当たる屋外の地面に野積みにしておく"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "ASCA Nougyou Text",
        chapter: "Chapter 3: Crop Cultivation & Pest Control",
        pageOrUnit: "Unit 3.1 - Chemical Storage & Poison Security"
      },
      explanation: {
        justification: "Under Japan's Poisonous and Deleterious Substances Control Act (毒劇法), pesticide cabinets must be kept securely locked (施錠管理) at all times, with strict inventory ledgers and clear signage prohibiting unauthorized access to prevent theft or poisoning.",
        distractorAutopsy: {
          "1": "Leaving chemical storage unlocked allows accidental poisoning of children, unauthorized theft, or livestock contamination.",
          "2": "Transferring pesticides into beverage bottles is a notorious cause of accidental fatal ingestion (誤飲).",
          "3": "Piles of chemical containers exposed to direct UV sun exposure decompose active ingredients and create fire/explosion risks."
        },
        senseiMnemonic: "'Nouyaku' (Racun Kimia Pertanian) = Wajib Gembok (施錠)! Jangan pernah simpan racun di botol bekas teh/Aqua, bisa tertelan rekan kerja.",
        l1InterferenceAlert: "Di Indonesia, sisa pestisida sering dituang ke botol air mineral bekas. Di Jepang, perbuatan ini dilarang keras secara hukum dan dikenai sanksi pidana berat.",
        remedialPrescription: "Aturan lemari racun: 1. Wajib gembok (施錠), 2. Tulisan tebal '医薬用外毒物/劇物', 3. Catat buku keluar-masuk (受払簿), 4. Dilarang pindah wadah selain botol aslinya."
      }
    },
    {
      id: "agri-q010",
      section: "on-site-dialogue",
      format: "single-choice",
      promptJa: "先輩「このイチゴは傷みやすいから、ヘタの少し上の茎（くき）をハサミで切って、果実には（　　）ように優しくパックに入れろ！」",
      promptEn: "Senior: 'These strawberries bruise easily, so snip the stem slightly above the calyx with scissors, and place them gently into packs (    ) the fruit!'",
      optionsJa: [
        "できるだけ直接指で強く触れない",
        "強くギュッと握りしめる",
        "上から勢いよく放り投げる",
        "手で表面を力いっぱい擦（こす）る"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "ASCA Nougyou Text",
        chapter: "Chapter 4: Post-Harvest Handling & Shipping",
        pageOrUnit: "Unit 4.2 - Strawberry Harvesting & Damage Prevention"
      },
      explanation: {
        justification: "Strawberries (イチゴ) have delicate epidermal tissue. Touching the ripe fruit with warm bare fingers causes immediate surface bruising (打痕 / 傷み) that turns brown and rots within 24 hours. Harvesters hold the stem above the calyx (ヘタ) without touching the berry body.",
        distractorAutopsy: {
          "1": "Squeezing tightly crushes internal berry flesh, rendering the product completely unsellable.",
          "2": "Tossing berries from a height causes bruising and rupture against the plastic tray.",
          "3": "Rubbing the skin scrubs off the protective natural bloom/wax layer and causes mechanical tears."
        },
        senseiMnemonic: "Panen stroberi Jepang: 'Pegang tangkainya, jangan sentuh buahnya!' Suhu hangat jari tangan bisa membuat stroberi lebam dan bonyok.",
        l1InterferenceAlert: "Buah stroberi Jepang dijual sebagai buah mewah per butir. Sentuhan kasar sedikit saja membatalkan nilai jualnya dari 1000 yen menjadi sampah.",
        remedialPrescription: "Kaidah petik buah sensitif: Pegang tangkai (軸・果柄) $\\rightarrow$ Gunting tangkai sisakan 1cm $\\rightarrow$ Letakkan lembut di pack tanpa menekan badan buah."
      }
    },
    {
      id: "agri-q011",
      section: "safety-procedures",
      format: "single-choice",
      promptJa: "畑で鎌（かま）や剪定ばさみなどの刃物を使って作業するときの正しい安全動作はどれですか。",
      promptEn: "What is the correct safety practice when working with blade tools such as sickles (Kama) or pruning shears in the field?",
      optionsJa: [
        "刃を引く方向に自分の手や足、他の作業員がいないことを確認して刃を動かす",
        "刃物を手で持ったまま畑の中を走って移動する",
        "使っていない鎌を刃を上に向けて地面の草むらに放置しておく",
        "刃物を他の人に手渡すとき、刃先を相手に向けて突き出す"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "ASCA Nougyou Text",
        chapter: "Chapter 1: Farm Work Safety & Environment",
        pageOrUnit: "Unit 1.2 - Hand Tools & Sickle Safety"
      },
      explanation: {
        justification: "When pulling a sickle or pruning shears, never position your opposite holding hand or knees in the blade's travel path. Slips on tough stems result in severe lacerations or tendon severing.",
        distractorAutopsy: {
          "1": "Running while carrying bare blades causes catastrophic puncture wounds upon tripping.",
          "2": "Abandoning sickles blade-up in grass creates severe stepping/slashing booby-traps for coworkers.",
          "3": "When handing blade tools, always present the handle (柄) to the receiver, never the sharp blade tip."
        },
        senseiMnemonic: "Pegang arit (鎌): 'Tangan penahan jangan segaris dengan mata pisau!' Berikan gagangnya ke teman, simpan di sarung saat tak dipakai.",
        l1InterferenceAlert: "Sering terjadi kecelakaan pemula memotong rumput dengan menarik arit ke arah jempol tangan kirinya sendiri. Posisi tangan kiri harus selalu berada di belakang jalur tarikan arit.",
        remedialPrescription: "Aturan 刃物 (Hamono): 1. Jalur potong bebas anggota tubuh, 2. Simpan di sarung panggul (サック), 3. Oper alat lewat gagang (柄)."
      }
    },
    {
      id: "agri-q012",
      section: "technical-vocabulary",
      format: "single-choice",
      promptJa: "野菜の栽培において、土壌の乾燥防止、地温の調整、および雑草の繁茂を防ぐために畝（うね）の表面を覆うビニールフィルムを何と呼びますか。",
      promptEn: "In vegetable cultivation, what is the plastic film called that covers the surface of crop ridges (Une) to prevent soil dryness, regulate ground temperature, and suppress weeds?",
      optionsJa: [
        "マルチ（マルチフィルム）",
        "防虫ネット",
        "遮光カーテン",
        "ブルーシート"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "ASCA Nougyou Text",
        chapter: "Chapter 3: Crop Cultivation & Pest Control",
        pageOrUnit: "Unit 3.3 - Mulching Film Practices"
      },
      explanation: {
        justification: "Mulch film (マルチ / マルチフィルム, black, silver, or clear polyethylene) is stretched over ridges to conserve soil moisture, regulate root-zone soil temperature, prevent soil erosion, and choke out weeds by blocking sunlight.",
        distractorAutopsy: {
          "1": "Insect netting (防虫ネット) is a porous mesh tunnel stretched over wire hoops to exclude insect pests, not a solid ground soil film.",
          "2": "Shading curtains (遮光カーテン) are suspended from greenhouse truss ceilings to block excessive solar irradiance.",
          "3": "Blue tarps (ブルーシート) are general heavy-duty waterproof ground covers, not agricultural bed mulches."
        },
        senseiMnemonic: "'Mulch' (Maruchi) = Selimut bedengan tanah! Menjaga kelembapan tanah, menghangatkan akar, dan membuat rumput liar mati tak kena matahari.",
        l1InterferenceAlert: "Sering disebut 'plastik mulsa' di Indonesia. Di Jepang disebut マルチ (maruchi) atau マルチシート. Pemasangannya harus ditarik kencang tanpa kerutan (ピント張る).",
        remedialPrescription: "Jenis mulsa Jepang: 黒マルチ (hitam = paling ampuh basmi rumput), 透明マルチ (transparan = cepat panaskan tanah musim dingin), 銀マルチ (perak = pantulkan cahaya & usir kutu trips)."
      }
    },
    {
      id: "agri-q013",
      section: "technical-vocabulary",
      format: "single-choice",
      promptJa: "収穫した直後の野菜の呼吸熱を抑えて鮮度を保つために、冷蔵庫に入れる前に素早く芯まで冷やす工程を何と言いますか。",
      promptEn: "What is the process called of rapidly chilling harvested vegetables to their core before cold storage to suppress respiration heat and preserve freshness?",
      optionsJa: [
        "予冷（よれい）",
        "加温（かおん）",
        "湯通し（ゆどおし）",
        "乾燥（かんそう）"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "ASCA Nougyou Text",
        chapter: "Chapter 4: Post-Harvest Handling & Shipping",
        pageOrUnit: "Unit 4.3 - Pre-Cooling & Cold Chain Logistics"
      },
      explanation: {
        justification: "Pre-cooling is called 'Yorei' (予冷 - differential pressure cooling, vacuum cooling, or hydrocooling). Field crops retain solar heat and high respiration rates; rapidly pulling core temperatures down to $2-5^\\circ\\text{C}$ extends shelf life dramatically.",
        distractorAutopsy: {
          "1": "Heating (加温) warms greenhouse air in winter, the opposite of chilling vegetables.",
          "2": "Blanching (湯通し) is boiling food briefly in hot water before cooking, which ruins fresh vegetables.",
          "3": "Drying (乾燥) removes moisture for grain/seed storage, which desiccates fresh leafy vegetables."
        },
        senseiMnemonic: "'Yo' (Awal) + 'Rei' (Dingin) = Pendinginan Awal Kilat! Hilangkan panas sawah secepat mungkin agar sayur tetap segar renyah.",
        l1InterferenceAlert: "Menaruh sayur panas langsung ke kulkas biasa membuat ruang dalam sayur tetap hangat berjam-jam dan cepat membusuk. Harus lewat fasilitas pendinginan cepat (予冷施設).",
        remedialPrescription: "Metode 予冷 (Yorei): 差圧通風予冷 (tekanan udara dingin), 真空予冷 (pendinginan vakum untuk selada/brokoli), 氷冷 (es batu)."
      }
    },
    {
      id: "agri-q014",
      section: "on-site-dialogue",
      format: "single-choice",
      promptJa: "先輩「牛舎の清掃中に牛の後ろを通るときは、（　　）ように声をかけながら距離をとって通れよ！」",
      promptEn: "Senior: 'When passing behind a cow during barn cleaning, pass at a distance while speaking to it so (    )!'",
      optionsJa: [
        "牛が驚いて後ろ足で蹴（け）られない",
        "牛が寝てしまわない",
        "牛がお腹を空かせない",
        "牛が笑わない"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "ASCA Nougyou Text",
        chapter: "Chapter 5: Livestock Biosecurity & Management",
        pageOrUnit: "Unit 5.2 - Cattle Behavior & Kick Avoidance"
      },
      explanation: {
        justification: "Cattle have wide peripheral vision but a critical blind spot directly behind their rump. Approaching silently from behind startles them, triggering immediate violent backward and sideways kicks (蹴り - keri) with hundreds of kilograms of crushing force.",
        distractorAutopsy: {
          "1": "Calling out gently does not prevent cows from falling asleep.",
          "2": "Vocal sounds do not influence metabolic hunger pangs in cattle.",
          "3": "Cows do not possess human smiling facial faculties."
        },
        senseiMnemonic: "Sapi kaget = Tendangan maut melayang! Jangan lewat di belakang pantat sapi tanpa bersuara. Panggil lembut 'Hai hai~' agar dia tahu posisimu.",
        l1InterferenceAlert: "Banyak pekerja terluka parah (patah tulang rusuk atau paha) akibat berjalan meleng di belakang sapi perah/pedaging. Sapi menendang ke belakang dan ke samping dengan sangat cepat.",
        remedialPrescription: "Aturan mendekati sapi: 1. Dekati dari arah samping bahu (斜め前方), 2. Panggil lembut sebelum menyentuh, 3. Bila harus lewat belakang, jaga jarak aman $\\ge 2\\text{ meter}$."
      }
    },
    {
      id: "agri-q015",
      section: "safety-procedures",
      format: "single-choice",
      promptJa: "農作業中に体調が悪くなり、めまいや吐き気、手足の震えを感じたときの最優先の対応はどれですか。",
      promptEn: "What is the highest priority response if you feel unwell, dizzy, nauseous, or experience limb tremors during farm work?",
      optionsJa: [
        "直ちに作業を中止して涼しい日陰に移動し、農場長や仲間に知らせて水分・塩分を補給する",
        "みんなに心配をかけないように、倒れるまで黙って一人で作業を続ける",
        "我慢して走って自宅まで帰り、布団に入って暖かくして寝る",
        "熱いお茶を大量に飲んで、さらに汗をかいて治そうとする"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "ASCA Nougyou Text",
        chapter: "Chapter 1: Farm Work Safety & Environment",
        pageOrUnit: "Unit 1.5 - Heat Illness Emergency First Aid"
      },
      explanation: {
        justification: "Dizziness, nausea, and tremors are acute symptoms of Grade II/III heat illness (熱中症) or pesticide toxic exposure. Immediate work stoppage, resting in shade, calling for help, loosening clothing, and chilling major artery points (neck, armpits, groin) saves lives.",
        distractorAutopsy: {
          "1": "Continuing work until collapsing causes irreversible heat stroke brain damage and death.",
          "2": "Running home alone while semiconscious risks collapsing in isolated farm ditches undetected.",
          "3": "Drinking scalding tea raises internal core body temperature further, compounding hyperthermic shock."
        },
        senseiMnemonic: "Pusing atau mual di ladang? STOP kerja seketika $\\rightarrow$ Lapor ke atasan $\\rightarrow$ Dinginkan ketiak dan leher dengan es/air dingin!",
        l1InterferenceAlert: "Budaya 'Gaman' (menahan derita tanpa mengeluh) sangat salah diterapkan pada gejala dehidrasi panas atau keracunan obat. Di Jepang, terlambat melapor gejala panas dianggap kelalaian fatal.",
        remedialPrescription: "Pertolongan pertama sengatan panas: Pindahkan ke tempat teduh $\\rightarrow$ Longgarkan pakaian $\\rightarrow$ Kompres es di leher/ketiak/selangkangan $\\rightarrow$ Minum oralit/pocari $\\rightarrow$ Panggil ambulans 119 jika tak bisa minum sendiri."
      }
    }
  ]
};

module.exports = sswAgricultureSet01;
