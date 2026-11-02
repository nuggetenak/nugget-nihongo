// SSW Construction (Building Construction / 建築 - Kenchiku) Set 01
// Curriculum Reference: JAC (Japan Association for Construction Human Resources) & MLIT Official Textbooks

const sswKenchikuSet01 = {
  id: "ssw-kensetsu-kenchiku-set01",
  title: "SSW Tokutei Ginou: Kensetsu Kenchiku (Building Construction) Set 01",
  track: "ssw-kensetsu-kenchiku",
  level: "A2-B1",
  tier: "standard",
  durationMinutes: 15,
  passingScorePercent: 70,
  recommendedRetakeIntervalDays: 7,
  focusAreas: [
    "Scaffolding & Work Platform Safety (Ashiba / Habaki)",
    "Fall Arrest Systems (Full-body Harness & Nichougake)",
    "Stepladder (Kyatatsu) & Extension Ladder Rules",
    "Rebar (Tekkin) & Formwork (Katawaku) Assembly Practices",
    "Hot Works, Organic Solvents & Interior Finishing Precautions"
  ],
  questions: [
    {
      id: "kenchiku-q01",
      section: "safety-procedures",
      format: "single-choice",
      promptJa: "高さ2メートル以上の高所（こうしょ）で作業床がない場所で作業するとき、必ず着用しなければならない保護具は何ですか。",
      promptEn: "When working at heights of 2 meters or more where no work platform can be set up, what personal protective equipment must be worn?",
      optionsJa: [
        "フルハーネス型墜落制止用器具（命綱）",
        "胴ベルト型安全帯（1本つり）",
        "防塵マスクと保護メガネのみ",
        "皮手袋と安全靴のみ"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAC Kensetsu Kenchiku Text",
        chapter: "Chapter 2: Fall Prevention & Working at Heights",
        pageOrUnit: "Unit 2.1 - Full-Body Harness Standard"
      },
      explanation: {
        justification: "Under revised Japanese industrial safety law, at heights of 2 meters or more without a standard work platform, workers must wear a full-body harness fall arrest system (フルハーネス型墜落制止用器具). Single torso belts (胴ベルト型) are prohibited for general high-elevation work due to severe abdominal crush and suspension trauma risks.",
        distractorAutopsy: {
          "1": "Single torso belts (胴ベルト型) can cause lethal internal organ rupture or slip out upon head-first falls.",
          "2": "Dust masks and goggles protect the face from debris, not from vertical gravitational falls.",
          "3": "Leather gloves and safety shoes are standard PPE but do not arrest falls."
        },
        senseiMnemonic: "Ketinggian $\\ge 2\\text{ m}$ = 'Full Harness Wajib'! Bukan cuma sabuk pinggang, tapi sabuk seluruh paha dan dada.",
        l1InterferenceAlert: "Di Indonesia sering disebut 'body harness' atau 'tali pengaman', dan pekerja kadang hanya memakai sabuk pinggang sederhana (single belt). Di Jepang, single belt dilarang keras untuk pekerjaan di atas 5m atau 2m tanpa lantai kerja.",
        remedialPrescription: "Kuasai istilah: 墜落制止用器具 (tsuiraku seishi-you kigu = alat penahan jatuh), フルハーネス (full harness), ランヤード (lanyard), ショックアブソーバ (shock absorber)."
      }
    },
    {
      id: "kenchiku-q02",
      section: "safety-procedures",
      format: "single-choice",
      promptJa: "脚立（きゃたつ）を使用して作業するときの安全ルールとして、正しいものはどれですか。",
      promptEn: "What is the correct safety rule when working using a stepladder (Kyatatsu)?",
      optionsJa: [
        "脚立の天板（最上段）に乗ったり、天板にまたがって作業してはならない",
        "高いところに手が届かないときは、天板につま先立ちで作業する",
        "脚立の脚（あし）の下にブロックを敷いて高さを調整してもよい",
        "脚立を開き止め金具（開き止めチェーン）をかけずに使ってもよい"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAC Kensetsu Kenchiku Text",
        chapter: "Chapter 2: Fall Prevention & Working at Heights",
        pageOrUnit: "Unit 2.2 - Stepladder (Kyatatsu) Regulations"
      },
      explanation: {
        justification: "Standing on the uppermost top step (天板 - tenban) or straddling the top plate of a stepladder is strictly forbidden by Japanese safety standards. Workers lose 3-point contact, easily tipping over.",
        distractorAutopsy: {
          "1": "Standing on tiptoes on the top plate causes instantaneous balance loss and severe head injuries.",
          "2": "Placing loose bricks/blocks under ladder legs causes unstable tipping and collapse.",
          "3": "The spreader stay/locking bar (開き止め金具) must always be locked into place before ascending."
        },
        senseiMnemonic: "'Tenban kinshi' (Dilarang injak atap tangga)! Berdirilah maksimal di anak tangga kedua dari atas dengan badan menempel stabil.",
        l1InterferenceAlert: "Banyak tukang di Indonesia terbiasa jongkok atau menduduki puncak tangga lipat aluminium. Di Jepang, supervisor akan langsung menghentikan pekerjaan dan memberikan teguran keras jika kaki menginjak pelat teratas.",
        remedialPrescription: "Ingat 3 aturan tangga lipat: 1. Jangan injak 天板 (tenban), 2. Kunci 開き止め (hirakidome), 3. Jangan gunakan sebagai jembatan horizontal."
      }
    },
    {
      id: "kenchiku-q03",
      section: "technical-vocabulary",
      format: "single-choice",
      promptJa: "足場（あしば）の作業床から工具や資材が下の階へ落ちないように、床の端（はし）に取り付ける板は何ですか。",
      promptEn: "What board is attached to the edge of a scaffold platform to prevent tools and materials from falling to lower floors?",
      optionsJa: [
        "幅木（はばき / こぼれ止め）",
        "敷板（しきいた）",
        "筋交い（すじかい）",
        "ジャッキベース"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAC Kensetsu Kenchiku Text",
        chapter: "Chapter 3: Scaffolding Assembly & Maintenance",
        pageOrUnit: "Unit 3.1 - Toe Board (Habaki) Standard"
      },
      explanation: {
        justification: "A toe board or kickboard (幅木 - habaki / こぼれ止め) is installed vertically along the edges of scaffolding walkways (height $\\ge 15\\text{ cm}$) to prevent dropped objects, kicked bolts, or dislodged tools from falling onto workers below.",
        distractorAutopsy: {
          "1": "Base sills / timber sole plates (敷板 - shikiita) are laid on the ground under vertical jack bases to distribute foundation weight.",
          "2": "Diagonal braces (筋交い - sujikai) provide lateral rigidity to the scaffold framework.",
          "3": "Jack bases (ジャッキベース) are screw jacks supporting the vertical standards."
        },
        senseiMnemonic: "'Habaki' = Pembatas kaki! Menahan baut dan martil agar tidak meluncur 'bocok' ke kepala kawan di bawah.",
        l1InterferenceAlert: "Jangan samakan Habaki di interior lantai kayu (skirting board) dengan Habaki di perancah konstruksi (toe board penahan jatuhnya alat).",
        remedialPrescription: "Komponen perancah: 手すり (tesuri = railing tengah & atas $\\ge 85\\text{cm}$), 幅木 (habaki = toe board $\\ge 15\\text{cm}$), メッシュシート (jaring pengaman)."
      }
    },
    {
      id: "kenchiku-q04",
      section: "on-site-dialogue",
      format: "single-choice",
      promptJa: "先輩「足場の上を移動するときは、フックを交互に掛け替える（　　）を徹底しろ！」",
      promptEn: "Senior: 'When moving along the scaffolding, ensure thorough practice of (    ) by alternating hook attachments!'",
      optionsJa: [
        "二丁掛け（にちょうがけ）",
        "片手掛け（かたてがけ）",
        "腕組み（うでぐみ）",
        "早歩き（はやあるき）"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAC Kensetsu Kenchiku Text",
        chapter: "Chapter 2: Fall Prevention & Working at Heights",
        pageOrUnit: "Unit 2.3 - 100% Tie-Off (Nichougake)"
      },
      explanation: {
        justification: "Dual lanyard 100% tie-off (二丁掛け - nichougake) requires workers equipped with twin lanyards to ensure at least one hook is securely anchored to a scaffold lifeline or rail at all times before unclipping the other.",
        distractorAutopsy: {
          "1": "Using only one hook leaves moments of complete zero-fall-protection when unclipping to transition past vertical stanchions.",
          "2": "Crossing arms (腕組み) is idle posture, offering zero mechanical anchorage.",
          "3": "Walking fast (早歩き) increases tripping hazards on scaffolding."
        },
        senseiMnemonic: "'Ni' = 2 kait! Satu kait dilepas, kait satunya lagi HARUS sudah terkait kencang. Tak boleh sedetik pun tanpa cantolan.",
        l1InterferenceAlert: "Prinsip 100% tie-off di Jepang tidak menoleransi 'nanti saya kaitkan lagi setelah lewat tiang ini'. Selalu kaitkan hook ke-2 sebelum mencabut hook ke-1.",
        remedialPrescription: "Langkah 二丁掛け: Hook 1 terpasang $\\rightarrow$ Pasang Hook 2 ke rangka berikutnya $\\rightarrow$ Lepas Hook 1 $\\rightarrow$ Pindah."
      }
    },
    {
      id: "kenchiku-q05",
      section: "technical-vocabulary",
      format: "single-choice",
      promptJa: "鉄筋（てっきん）が交差する部分を固定するために、ハッカーを使って巻き付ける細い針金を何と呼びますか。",
      promptEn: "What is the thin wire called that is tied around crossing reinforcing bars using a hacker/pincer tool to secure them?",
      optionsJa: [
        "結束線（けっそくせん）",
        "番線（ばんせん）",
        "ワイヤーロープ",
        "電線（でんせん）"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAC Kensetsu Kenchiku Text",
        chapter: "Chapter 4: Reinforcing Bar (Tekkin) Work",
        pageOrUnit: "Unit 4.1 - Rebar Tying & Hacker Tool"
      },
      explanation: {
        justification: "Annealed rebar tie wire is called 'Kessokusen' (結束線). Tekkin workers use a specialized rotating hooking tool called a 'Hacker' (ハッカー) to twist and knot kessokusen tightly around intersecting rebar grids.",
        distractorAutopsy: {
          "1": "番線 (bansen) refers to thicker annealing binding wire (e.g., #8, #10 gauge) used for heavy formwork timber bracing or scaffolding tie-backs.",
          "2": "ワイヤーロープ (wire rope) is heavy steel braided cable used for crane hoisting.",
          "3": "電線 (densen) refers to insulated electrical copper cables."
        },
        senseiMnemonic: "'Kessoku' = Mengikat (Ketsugou)! Kessokusen = kawat bendrat pengikat besi beton dengan alat putar Hacker.",
        l1InterferenceAlert: "Di proyek konstruksi Indonesia, kawat ini lazim disebut 'kawat bendrat' dan alatnya 'catut' atau 'gegep'. Di Jepang, kawatnya adalah 結束線 (kessokusen) dan alat putarnya adalah ハッカー (hakka-).",
        remedialPrescription: "Kosakata besi beton: 鉄筋 (tekkin), 配筋 (haikin = susunan rebar), 結束線 (kessokusen = kawat ikat), ハッカー (hakka- = alat pemutar kawat)."
      }
    },
    {
      id: "kenchiku-q06",
      section: "technical-vocabulary",
      format: "single-choice",
      promptJa: "コンクリート型枠（かたわく）の工事で、型枠の対向する壁の間隔（厚み）を一定に保つために使う金具は何ですか。",
      promptEn: "In formwork construction, what metal hardware is used to maintain a uniform gap (thickness) between opposing formwork panels?",
      optionsJa: [
        "セパレーター（セパ）",
        "フォームタイ",
        "パイプサポート",
        "クランプ"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAC Kensetsu Kenchiku Text",
        chapter: "Chapter 5: Formwork (Katawaku) Assembly",
        pageOrUnit: "Unit 5.1 - Formwork Hardware & Spacers"
      },
      explanation: {
        justification: "A separator (セパレーター / セパ) is a threaded steel spacer rod placed between opposing timber/plywood formwork panels to maintain the exact design wall thickness against external concrete lateral hydrostatic pressure.",
        distractorAutopsy: {
          "1": "Form ties (フォームタイ) are external brackets fastened to waler pipes to anchor the tie rods on the outside.",
          "2": "Pipe supports (パイプサポート) are adjustable telescopic props supporting horizontal floor slab formwork from beneath.",
          "3": "Clamps (クランプ) fasten structural scaffold steel pipes together."
        },
        senseiMnemonic: "'Sepa' = Separator pemisah ketebalan! Menjaga dinding beton agar tebalnya pas sesuai gambar denah.",
        l1InterferenceAlert: "Jangan tertukar antara セパレーター (batang penentu tebal di dalam dinding) dan フォームタイ (baut penjepit pipa luar).",
        remedialPrescription: "Trio bekisting: セパレーター (separator penentu jarak) + フォームタイ (form-tie penjepit pipa) + パイプサポート (tiang penyangga plat lantai)."
      }
    },
    {
      id: "kenchiku-q07",
      section: "safety-procedures",
      format: "single-choice",
      promptJa: "現場ではしご（伸縮はしごなど）を立て掛けて使用するとき、壁や床面に対する最も安全な角度は何度ですか。",
      promptEn: "When leaning an extension ladder against a wall or floor on a job site, what is the safest leaning angle?",
      optionsJa: [
        "約75度",
        "約90度（垂直）",
        "約45度",
        "約30度"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAC Kensetsu Kenchiku Text",
        chapter: "Chapter 2: Fall Prevention & Working at Heights",
        pageOrUnit: "Unit 2.4 - Extension Ladder Angles"
      },
      explanation: {
        justification: "The statutory Japanese safety standard dictates that a leaning ladder must be pitched at an angle of approximately 75 degrees (slope ratio of 4:1) with the top extending at least 60 cm above the landing edge and firmly tied off.",
        distractorAutopsy: {
          "1": "90 degrees (vertical) causes backward tilting and zero climbing foot clearance.",
          "2": "45 degrees creates immense bottom kick-out sliding force and causes ladder rung bowing.",
          "3": "30 degrees is far too shallow, causing the ladder to slip out from the base under bodyweight."
        },
        senseiMnemonic: "Sudut tangga: '75 derajat!' Jangan terlalu tegak (bisa terjengkang), jangan terlalu rebah (bisa selip meluncur ke belakang).",
        l1InterferenceAlert: "Di Indonesia tukang sering mengira tangga yang landai lebih nyaman didaki. Di standar Jepang, sudut di luar 75° dinyatakan membahayakan nyawa.",
        remedialPrescription: "Rumus tangga aman: 1. Sudut 75°, 2. Puncak tangga menonjol $\\ge 60\\text{cm}$ di atas lantai tujuan (突出長), 3. Ikat ujung atas dan beri anti-slip di kaki."
      }
    },
    {
      id: "kenchiku-q08",
      section: "safety-procedures",
      format: "single-choice",
      promptJa: "ガス溶接やグラインダー切断など「火気使用（かきしよう）」作業を行うとき、火花による火災を防ぐために必要な措置はどれですか。",
      promptEn: "When performing hot works (gas welding, abrasive grinder cutting) that emit sparks, what precaution is necessary to prevent fires?",
      optionsJa: [
        "周囲の可燃物を片付け、スパッターシート（防火シート）を敷き、消火器を近くに配備する",
        "火花が散っても水滴がかかれば大丈夫なので、濡れタオルだけ置いておく",
        "作業中は騒音が出るため、周囲に誰にも知らせず一人で急いで終わらせる",
        "風通しをよくするために、換気扇の真下に向けて火花を勢いよく飛ばす"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAC Kensetsu Kenchiku Text",
        chapter: "Chapter 6: Hot Works & Fire Prevention",
        pageOrUnit: "Unit 6.1 - Hot Work Permits & Spark Blankets"
      },
      explanation: {
        justification: "Hot works generate white-hot sparks ($>1000^\\circ\\text{C}$). Safety regulations require: 1) Clearing flammable materials within 5-10m, 2) Laying fire-resistant spark blanket sheets (スパッターシート), and 3) Having inspected fire extinguishers immediately at hand, followed by a post-work ember check (火気点検).",
        distractorAutopsy: {
          "1": "A wet towel cannot contain flying shower sparks or embers landing on foam insulation.",
          "2": "Hot works mandate safety permits and fire-watch monitoring; solo hasty execution causes undetected smoldering fires.",
          "3": "Directing sparks into ventilation ducts can ignite accumulated dust or combustible filters inside ductwork."
        },
        senseiMnemonic: "Kaki shiyou (Penggunaan Api) = 3 Serangkai: Bersihkan bahan mudah terbakar + Gelar Spatter Sheet + Siapkan Tabung APAR!",
        l1InterferenceAlert: "Banyak kebakaran gedung di Jepang terjadi akibat percikan gerinda mengenai bahan isolasi styrofoam (urethane) 30 menit setelah pekerja pulang. Wajib cek bara api (火種確認) setelah selesai.",
        remedialPrescription: "Kosakata api: 火気使用届 (surat izin kerja panas), スパッターシート (kain anti-percikan api), 消火器 (shoukaki = APAR)."
      }
    },
    {
      id: "kenchiku-q09",
      section: "on-site-dialogue",
      format: "single-choice",
      promptJa: "職長「内装のクロス貼りや塗装で有機溶剤を使うときは、中毒を防ぐために（　　）を回しながら作業しろよ！」",
      promptEn: "Foreman: 'When using organic solvents for interior wallpapering or painting, work while running the (    ) to prevent intoxication!'",
      optionsJa: [
        "送風機（局所排気装置）",
        "ヒーター（暖房器具）",
        "加湿器（かしつき）",
        "扇風機を首振りにして弱で"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAC Kensetsu Kenchiku Text",
        chapter: "Chapter 7: Interior Finishing & Hazardous Chemicals",
        pageOrUnit: "Unit 7.2 - Organic Solvent Ventilation"
      },
      explanation: {
        justification: "Adhesives, paints, and thinners used in interior finishing emit toxic volatile organic compounds (VOCs). Using local exhaust ventilation/blowers (送風機 / 局所排気装置) and organic vapor respirators (防毒マスク) is legally required to avoid acute nervous system poisoning.",
        distractorAutopsy: {
          "1": "Heaters vaporize solvents faster and introduce open ignition hazards with flammable vapors.",
          "2": "Humidifiers only emit water vapor mist, having zero effect on solvent vapor dilution or exhaust.",
          "3": "A gentle desktop fan simply recirculates toxic vapor within the sealed room without expelling it."
        },
        senseiMnemonic: "'Yuuki Youzai' (Pelarut Organik) = Bau tiner penyengat! Selalu nyalakan Blower (送風機) dan pakai masker gas beracun (防毒マスク).",
        l1InterferenceAlert: "Jangan gunakan masker debu putih (防塵マスク) untuk pelarut cat/tiner! Uap kimia menembus masker debu. Harus memakai masker tabung gas filter karbon (防毒マスク).",
        remedialPrescription: "Bedakan: 防塵マスク (boujin = saring partikel/debu semen) vs 防毒マスク (boudoku = saring gas racun/uap tiner/pelarut organik)."
      }
    },
    {
      id: "kenchiku-q010",
      section: "technical-vocabulary",
      format: "single-choice",
      promptJa: "建築現場で、天井や壁の下地として広く使われる石膏（せっこう）を原料とした板を何と呼びますか。",
      promptEn: "In building construction, what is the plaster-based board widely used as the substrate for ceilings and walls called?",
      optionsJa: [
        "プラスターボード（石膏ボード）",
        "コンクリートパネル（コンパネ）",
        "波板スレート",
        "合板（ベニヤ板）"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAC Kensetsu Kenchiku Text",
        chapter: "Chapter 7: Interior Finishing & Hazardous Chemicals",
        pageOrUnit: "Unit 7.1 - Drywall & Plaster Board Installation"
      },
      explanation: {
        justification: "Plasterboard / gypsum drywall (プラスターボード / 石膏ボード - sekkou bo-do) is the standard non-combustible interior wall and ceiling lining board in Japanese construction, screwed into light-gauge steel studs (LGS) or timber studs.",
        distractorAutopsy: {
          "1": "Kompane (コンクリートパネル) is structural exterior plywood used for concrete forms.",
          "2": "Corrugated slate (波板スレート) is used for industrial exterior roofing or cladding.",
          "3": "Plywood (合板 / ベニヤ板) is wood-veneered sheets used for subfloors or carpentry cabinetry."
        },
        senseiMnemonic: "'Plaster Board' / 'Sekkou Board' = Papan gipsum dinding dalam. Tahan api, dipasang dengan obeng sekrup elektrik ke rangka LGS.",
        l1InterferenceAlert: "Di Indonesia sering disebut 'papan gipsum' atau merek dagang seperti 'Jayaboard'. Di Jepang istilah bakunya adalah 石膏ボード (sekkou bo-do) atau プラスターボード.",
        remedialPrescription: "Istilah interior: 軽量鉄骨 / LGS (keiryou tekkotsu = rangka baja ringan), ビス留め (bisu-dome = pasang sekrup), パテ処理 (pate shori = pendempulan celah sambungan)."
      }
    },
    {
      id: "kenchiku-q011",
      section: "safety-procedures",
      format: "single-choice",
      promptJa: "クレーンで資材を上の階へ搬入（荷揚げ）する際、作業員が取ってはならない極めて危険な行動はどれですか。",
      promptEn: "When materials are being hoisted to an upper floor by crane, what is an extremely dangerous action that a worker must NOT take?",
      optionsJa: [
        "荷物が完全に床に着地する前に、吊り荷を真下から手で迎えに行く",
        "介錯ロープを持って荷物の揺れを抑える",
        "安全帯（ハーネス）のフックを開口部手前の親綱に取り付ける",
        "クレーンオペレーターに無線または手合図で明確に伝える"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAC Kensetsu Kenchiku Text",
        chapter: "Chapter 3: Scaffolding Assembly & Maintenance",
        pageOrUnit: "Unit 3.3 - Rigging & Floor Landing Safety"
      },
      explanation: {
        justification: "Never stand beneath or reach directly under a suspended hovering load to guide it. If a wire snaps or hydraulic pressure drops, the worker is instantly crushed. Guide ropes (介錯ロープ) must be used from a safe distance.",
        distractorAutopsy: {
          "1": "Holding guide ropes (介錯ロープ) from a safe clearance distance is the prescribed safe method to damp swing.",
          "2": "Clipping fall protection hooks onto horizontal lifelines (親綱) before approaching open floor openings is mandatory.",
          "3": "Using clear hand signals or two-way radios with crane operators is strictly required."
        },
        senseiMnemonic: "Jangan pernah 'menjemput kargo melayang' dengan berdiri di bawahnya! Tarik pakai tali kendali (介錯ロープ) dari samping.",
        l1InterferenceAlert: "Insting manusia sering ingin langsung menyentuh barang yang sedang turun agar tidak bergoyang. Di Jepang, berada di bawah beban gantung (吊り荷の下) adalah pelanggaran berat.",
        remedialPrescription: "Aturan 荷揚げ (Niage): 1. Pasang barikade di bawah, 2. Gunakan 介錯ロープ, 3. Jangan sentuh beban sebelum mendarat stabil di lantai."
      }
    },
    {
      id: "kenchiku-q012",
      section: "technical-vocabulary",
      format: "single-choice",
      promptJa: "建築現場で、壁や柱が垂直（まっすぐ立っているか）かどうかを確かめるために使う、糸の先に重りがついた道具は何ですか。",
      promptEn: "In building construction, what is the tool called that has a weight attached to the end of a string to check if walls or pillars are plumb (vertical)?",
      optionsJa: [
        "下げ振り（さげふり）",
        "巻き尺（スケール）",
        "指矩（さしがね）",
        "墨壺（すみつぼ）"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAC Kensetsu Kenchiku Text",
        chapter: "Chapter 1: Tools & Measurement",
        pageOrUnit: "Unit 1.3 - Plumb Bob (Sagefuri) & Alignment"
      },
      explanation: {
        justification: "A plumb bob (下げ振り - sagefuri) consists of a pointed metallic cone weight suspended by a thread, utilizing gravity to verify true verticality (垂直度 - suichokudo) of columns, pillars, and formwork walls.",
        distractorAutopsy: {
          "1": "Tape measure (巻き尺 / スケール) measures linear distances.",
          "2": "Carpenter's steel square (指矩 - sashigane) checks right angles ($90^\\circ$) and layout cuts.",
          "3": "Chalk line / ink pot (墨壺 - sumitsubo) snaps straight ink lines on concrete slabs."
        },
        senseiMnemonic: "'Sage' (turun) + 'Furi' (berayun) = Bandul lot berayun! Digantung dengan benang untuk mengecek ketegakan tiang.",
        l1InterferenceAlert: "Di Indonesia sering disebut 'unting-unting' atau 'lot gantung'. Di Jepang istilahnya adalah 下げ振り (sagefuri).",
        remedialPrescription: "Alat ukur tukang bangunan: 下げ振り (sagefuri = bandul lot ketegakan), 指矩 (sashigane = siku L), 墨壺 (sumitsubo = penarik garis tinta)."
      }
    },
    {
      id: "kenchiku-q013",
      section: "safety-procedures",
      format: "single-choice",
      promptJa: "建築現場の床開口部（吹抜けや階段ホールなど）で、転落事故を防ぐために講じるべき対策として誤っているものはどれですか。",
      promptEn: "Regarding floor openings (voids, stairwells) on a building site, which measure to prevent falling accidents is INCORRECT?",
      optionsJa: [
        "歩きやすいように、開口部に敷いてある合板のフタを断りなく外しておく",
        "開口部の周囲に高さ85cm以上の堅固な手すりを設置する",
        "開口部のフタには「開口部・墜落注意・動かすな」と明記して固定する",
        "手すりの設置が困難な場所には安全ネットを水平に張る"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAC Kensetsu Kenchiku Text",
        chapter: "Chapter 2: Fall Prevention & Working at Heights",
        pageOrUnit: "Unit 2.5 - Floor Opening Safeguards"
      },
      explanation: {
        justification: "Removing a floor opening cover without authorization, warning signs, or replacement barricades is a catastrophic safety violation that leads directly to fatal blind falls into voids.",
        distractorAutopsy: {
          "1": "Installing sturdy handrails of $\\ge 85\\text{ cm}$ height around voids is standard legal protection.",
          "2": "Bolting covers down and labeling them with 'Opening - Fall Warning - Do Not Move' is proper safety compliance.",
          "3": "Stretching horizontal safety debris nets beneath voids where handrails cannot fit is an approved safeguard."
        },
        senseiMnemonic: "Tutup lubang lantai (開口部のフタ) haram dibuka seenaknya! Sekali dilepas tanpa pagar pembatas, orang lain bisa terperosok ke lantai dasar.",
        l1InterferenceAlert: "Di beberapa proyek darurat di Indonesia, lubang lantai sering hanya ditutup kardus atau papan lepas tanpa tulisan peringatan. Di Jepang, penutup wajib dibaut dan dicat tulisan peringatan tebal.",
        remedialPrescription: "Aturan 開口部 (kaikoubu = lubang bukaan): 1. Pagar 手すり $\\ge 85\\text{cm}$, 2. Papan penutup paten dengan tulisan '開口部・注意', 3. Jaring net pengaman."
      }
    },
    {
      id: "kenchiku-q014",
      section: "on-site-dialogue",
      format: "single-choice",
      promptJa: "先輩「よし、この柱のアンカーボルトの位置、墨出し（すみだし）の線に合っているか確認してくれ！」後輩「（　　）！」",
      promptEn: "Senior: 'Alright, check if this column's anchor bolt position aligns with the snapped layout line!' Junior: '(    )!'",
      optionsJa: [
        "はい、墨線のど真ん中にピッタリ合っています。位置ヨシ！",
        "はい、だいたい近くにあるので問題ないと思います！",
        "ボルトは隠れて見えませんが、大丈夫です！",
        "墨線が消えていますが、勘で合わせました！"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAC Kensetsu Kenchiku Text",
        chapter: "Chapter 1: Tools & Measurement",
        pageOrUnit: "Unit 1.2 - Layout Snapping (Sumidashi)"
      },
      explanation: {
        justification: "In Japanese building construction, accuracy to the millimeter is demanded. Responses must confirm millimeter alignment to the layout line (墨線 - sumisen) reinforced by Pointing-and-Calling (指差し呼称: 『位置ヨシ！』).",
        distractorAutopsy: {
          "1": "Saying 'daitai' (roughly nearby) is unacceptable in structural column bolt placement.",
          "2": "Confirming without visually inspecting hidden bolts violates basic verification duties.",
          "3": "Guessing by intuition (勘 - kan) when markings are erased causes structural condemnation."
        },
        senseiMnemonic: "Sumidashi = Garis tinta suci! Jawaban profesional Jepang: 'Pas di tengah garis tinta, Ichi Yoshi!' (Bukan 'kira-kira dekat').",
        l1InterferenceAlert: "Hindari kata 'kira-kira' (だいたい / たぶん) saat melapor ke Shokuchou (mandor). Konstruksi Jepang berbasis toleransi millimeter (ミリ単位).",
        remedialPrescription: "Istilah marking: 墨出し (sumidashi = membuat garis acuan denah), 墨線 (sumisen = garis tinta), 逃げ墨 (nigesumi = garis offset acuan pembantu)."
      }
    },
    {
      id: "kenchiku-q015",
      section: "safety-procedures",
      format: "single-choice",
      promptJa: "夏場の建設現場において、熱中症（ねっちゅうしょう）を予防するための正しい行動はどれですか。",
      promptEn: "During summer on a building site, what is the correct action to prevent heatstroke?",
      optionsJa: [
        "喉（のど）が渇く前に、こまめに水分と適度な塩分を補給し、休憩所を利用する",
        "我慢できる限界まで水を飲まずに作業を続け、終業後にまとめて飲む",
        "水分だけを大量にガブ飲みして、塩分やミネラルは一切摂らない",
        "めまいや頭痛がしても、職長に迷惑がかかるので隠して作業を続ける"
      ],
      correctOptionIndex: 0,
      curriculumRef: {
        textbook: "JAC Kensetsu Kenchiku Text",
        chapter: "Chapter 6: Hot Works & Fire Prevention",
        pageOrUnit: "Unit 6.4 - Heatstroke Prevention & WBGT"
      },
      explanation: {
        justification: "To combat heatstroke in high humidity, workers must replenish both water and balanced electrolytes/salt periodically BEFORE feeling thirst. Concealing dizzy symptoms leads to collapse from scaffolding.",
        distractorAutopsy: {
          "1": "Waiting until the end of the shift causes severe hypovolemic heat exhaustion and organ failure.",
          "2": "Drinking excessive pure water without salt depletes blood sodium, triggering severe heat cramps (hyponatremia).",
          "3": "Hiding symptoms of dizziness or nausea on high-elevation scaffolds risks fatal falls."
        },
        senseiMnemonic: "Aturan musim panas Jepang: Minum SEBELUM haus + jangan lupa permen garam (塩飴 - shio-ame) / tablet garam!",
        l1InterferenceAlert: "Banyak pekerja asal Indonesia mengira 'saya dari negara tropis pasti kuat panas'. Musim panas Jepang (36-38°C dengan kelembapan 85%) sering lebih mematikan karena panas terperangkap di dalam beton/scaffolding tertutup sheet.",
        remedialPrescription: "Ketahui 3 benteng panas: 1. 水分・塩分補給 (suifen/enbun hokyuu), 2. 空調服 (kuuchoufuku = jaket berkipas blower), 3. Cek WBGT (indeks suhu basah bola)."
      }
    }
  ]
};

module.exports = sswKenchikuSet01;
