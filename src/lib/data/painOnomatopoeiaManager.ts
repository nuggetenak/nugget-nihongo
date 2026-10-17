// ══════════════════════════════════════════════════════════════════
//  painOnomatopoeiaManager.ts — Clinical Pain Onomatopoeia Inventory
//  Research Basis: Sakamoto et al. (2014), Doizaki et al. (2015), Okuda (2018)
//  42 Canonical Items across 7 Physiological Clusters for Eldercare & SSW
// ══════════════════════════════════════════════════════════════════

import { PainOnomatopoeiaItem, PhysiologicalCluster, ClinicalEmergencyLevel } from '../../types/onomatopoeia';
import { QuizQuestionItem } from '../../types/quiz';

export const CANONICAL_PAIN_ONOMATOPOEIA: PainOnomatopoeiaItem[] = [
  // ── KLASTER 1: HEADACHE, CRANIAL & NEUROLOGICAL (頭部・神経痛) ──
  {
    id: 1,
    onomatopoeia: 'ズキズキ',
    romaji: 'zukizuki',
    physiological_cluster: 'menusuk_tajam',
    clinical_meaning_id: 'Nyeri berdenyut-denyut kuat mengikuti detak nadi vaskular.',
    emergency_level: 'urgent_consultation',
    audio_url: '/audio/onomatopoeia/zukizuki.mp3',
    sample_elder_sentence: 'こめかみがズキンズキン脈打って痛い。',
    action_guideline_id: 'Periksa tekanan darah dan amati gejala migrain atau arteritis temporalis.',
  },
  {
    id: 2,
    onomatopoeia: 'ガンガン',
    romaji: 'gangan',
    physiological_cluster: 'tumpul_berat',
    clinical_meaning_id: 'Sakit kepala hebat seperti dihantam palu godam (waspada krisis hipertensi/stroke).',
    emergency_level: 'immediate_119_ambulance',
    audio_url: '/audio/onomatopoeia/gangan.mp3',
    sample_elder_sentence: '頭が割れそうにガンガン響いている。',
    action_guideline_id: 'Panggil ambulans 119 dan posisikan tirah baring kepala terangkat 30 derajat.',
  },
  {
    id: 3,
    onomatopoeia: 'ズシン',
    romaji: 'zushin',
    physiological_cluster: 'tumpul_berat',
    clinical_meaning_id: 'Sakit kepala tumpul yang sangat berat dan menekan di tengkuk kepala belakang.',
    emergency_level: 'urgent_consultation',
    audio_url: '/audio/onomatopoeia/zushin.mp3',
    sample_elder_sentence: '後頭部がズシンと重く痛む。',
    action_guideline_id: 'Evaluasi riwayat benturan jatuh (hematoma subdural subakut).',
  },
  {
    id: 4,
    onomatopoeia: 'ピリピリ',
    romaji: 'piripiri',
    physiological_cluster: 'panas_terbakar',
    clinical_meaning_id: 'Rasa nyeri perih kesetrum/terbakar pada jalur saraf (prodromal herpes zoster).',
    emergency_level: 'routine_observation',
    audio_url: '/audio/onomatopoeia/piripiri.mp3',
    sample_elder_sentence: '顔の右側だけがピリピリ痺れて痛い。',
    action_guideline_id: 'Periksa munculnya lenting kemerahan unilateral di dermatoma saraf.',
  },
  {
    id: 5,
    onomatopoeia: 'チクチク',
    romaji: 'chikuchiku',
    physiological_cluster: 'menusuk_tajam',
    clinical_meaning_id: 'Nyeri seperti tertusuk-tusuk jarum kecil berulang di permukaan kulit/dada.',
    emergency_level: 'routine_observation',
    audio_url: '/audio/onomatopoeia/chikuchiku.mp3',
    sample_elder_sentence: '胸のあたりがチクチク刺すように痛む。',
    action_guideline_id: 'Bedakan neuralgia interkostal superfisial dari nyeri tekan jantung.',
  },
  {
    id: 6,
    onomatopoeia: 'キリキリ',
    romaji: 'kirikiri',
    physiological_cluster: 'menusuk_tajam',
    clinical_meaning_id: 'Nyeri menusuk tajam memutar seperti dibor tembus ke dalam.',
    emergency_level: 'urgent_consultation',
    audio_url: '/audio/onomatopoeia/kirikiri.mp3',
    sample_elder_sentence: '頭の奥をキリキリ錐（きり）で揉まれるようだ。',
    action_guideline_id: 'Waspada cluster headache atau peradangan sinus akut.',
  },
  {
    id: 7,
    onomatopoeia: 'ぼーっと',
    romaji: 'bōtto',
    physiological_cluster: 'pusing_disorientasi',
    clinical_meaning_id: 'Pikiran berkabut, linglung, kesadaran menurun dan lesu (clouded sensorium).',
    emergency_level: 'urgent_consultation',
    audio_url: '/audio/onomatopoeia/botto.mp3',
    sample_elder_sentence: '熱のせいで頭がぼーっとして考えられない。',
    action_guideline_id: 'Ukur suhu tubuh, saturasi oksigen SpO2, dan periksa tanda dehidrasi akut.',
  },

  // ── KLASTER 2: VISCERAL & ABDOMINAL (内臓・消化器系) ──
  {
    id: 8,
    onomatopoeia: 'キリキリ（胃）',
    romaji: 'kirikiri (i)',
    physiological_cluster: 'menusuk_tajam',
    clinical_meaning_id: 'Nyeri melilit tajam mencengkeram di ulu hati akibat kram viseral lambung.',
    emergency_level: 'urgent_consultation',
    audio_url: '/audio/onomatopoeia/kirikiri_i.mp3',
    sample_elder_sentence: 'みぞおちがキリキリ締め付けられて痛い。',
    action_guideline_id: 'Evaluasi kemungkinan tukak lambung akut atau batu empedu.',
  },
  {
    id: 9,
    onomatopoeia: 'シクシク',
    romaji: 'shikushiku',
    physiological_cluster: 'tumpul_berat',
    clinical_meaning_id: 'Nyeri ngilu tumpul berkepanjangan di perut bawah tanpa puncak tajam.',
    emergency_level: 'routine_observation',
    audio_url: '/audio/onomatopoeia/shikushiku.mp3',
    sample_elder_sentence: '昨夜から下腹部がシクシク重く痛む。',
    action_guideline_id: 'Periksa pola buang air besar dan amati tanda gastritis kronis.',
  },
  {
    id: 10,
    onomatopoeia: 'ムカムカ',
    romaji: 'mukamuka',
    physiological_cluster: 'pusing_disorientasi',
    clinical_meaning_id: 'Mual bergejolak di kerongkongan dan lambung hendak muntah.',
    emergency_level: 'routine_observation',
    audio_url: '/audio/onomatopoeia/mukamuka.mp3',
    sample_elder_sentence: '胃のあたりがムカムカして吐き気が止まらない。',
    action_guideline_id: 'Posisikan kepala miring untuk mencegah aspirasi muntahan ke saluran napas.',
  },
  {
    id: 11,
    onomatopoeia: 'ゴロゴロ',
    romaji: 'gorogoro',
    physiological_cluster: 'tumpul_berat',
    clinical_meaning_id: 'Perut berbunyi krucuk-krucuk mules peristaltik hiperaktif pertanda diare.',
    emergency_level: 'routine_observation',
    audio_url: '/audio/onomatopoeia/gorogoro.mp3',
    sample_elder_sentence: 'お腹がゴロゴロ鳴って下痢しそうだ。',
    action_guideline_id: 'Siapkan bantuan pispot/toilet dan berikan hidrasi oral pengganti elektrolit.',
  },
  {
    id: 12,
    onomatopoeia: 'パンパン',
    romaji: 'panpan',
    physiological_cluster: 'tumpul_berat',
    clinical_meaning_id: 'Perut begah kembung keras tegang seperti balon akibat retensi gas/urin.',
    emergency_level: 'urgent_consultation',
    audio_url: '/audio/onomatopoeia/panpan.mp3',
    sample_elder_sentence: 'ガスが溜まってお腹がパンパンに張っている。',
    action_guideline_id: 'Palpasi kandung kemih dan periksa kapan buang air kecil terakhir (retensi urin).',
  },
  {
    id: 13,
    onomatopoeia: 'ギューッ',
    romaji: 'gyū-tto',
    physiological_cluster: 'menusuk_tajam',
    clinical_meaning_id: 'Nyeri seperti diremas / dicengkeram kuat-kuat di rongga perut atau dada.',
    emergency_level: 'immediate_119_ambulance',
    audio_url: '/audio/onomatopoeia/gyutto.mp3',
    sample_elder_sentence: '胃をギューッと鷲掴みにされたように痛い。',
    action_guideline_id: 'Waspada sindrom koroner akut menjalar atau invaginasi usus darurat.',
  },

  // ── KLASTER 3: EPIDERMAL & DERMATOLOGICAL (皮膚・外傷・褥瘡) ──
  {
    id: 14,
    onomatopoeia: 'ヒリヒリ',
    romaji: 'hirihiri',
    physiological_cluster: 'panas_terbakar',
    clinical_meaning_id: 'Nyeri perih menyengat terbakar di lapisan kulit luar akibat luka bakar/gesekan.',
    emergency_level: 'routine_observation',
    audio_url: '/audio/onomatopoeia/hirihiri.mp3',
    sample_elder_sentence: '熱湯がかかって腕がヒリヒリ焼けるように痛い。',
    action_guideline_id: 'Alirkan air bersih dingin mengalir selama 15 menit, jangan oleskan pasta gigi.',
  },
  {
    id: 15,
    onomatopoeia: 'ジワジワ',
    romaji: 'jiwajiwa',
    physiological_cluster: 'panas_terbakar',
    clinical_meaning_id: 'Rembesan cairan/darah kapiler atau rasa nyeri menyebar perlahan meluas.',
    emergency_level: 'routine_observation',
    audio_url: '/audio/onomatopoeia/jiwajiwa.mp3',
    sample_elder_sentence: '傷口からジワジワ血が滲み出ている。',
    action_guideline_id: 'Lakukan balut tekan steril dan amati tanda perluasan hematoma subkutan.',
  },
  {
    id: 16,
    onomatopoeia: 'ムズムズ',
    romaji: 'muzumuzu',
    physiological_cluster: 'gatal_menggigit',
    clinical_meaning_id: 'Gatal merayap di dalam lapisan jaringan yang tidak bisa dijangkau garukan.',
    emergency_level: 'routine_observation',
    audio_url: '/audio/onomatopoeia/muzumuzu.mp3',
    sample_elder_sentence: 'ギプスの中がムズムズ痒くてたまらない。',
    action_guideline_id: 'Gunakan kompres dingin di luar area dan cegah memasukkan benda tajam.',
  },
  {
    id: 17,
    onomatopoeia: 'ガサガサ',
    romaji: 'gasagasa',
    physiological_cluster: 'gatal_menggigit',
    clinical_meaning_id: 'Kulit sangat kering, bersisik kasar, dan pecah-pecah (senile xerosis).',
    emergency_level: 'routine_observation',
    audio_url: '/audio/onomatopoeia/gasagasa.mp3',
    sample_elder_sentence: '踵（かかと）がガサガサに乾いてひび割れている。',
    action_guideline_id: 'Oleskan pelembab berbahan dasar heparinoid atau urea sehabis mandi.',
  },
  {
    id: 18,
    onomatopoeia: 'ジュクジュク',
    romaji: 'jukujuku',
    physiological_cluster: 'gatal_menggigit',
    clinical_meaning_id: 'Luka basah becek mengeluarkan cairan eksudat/nanah (infeksi ulkus dekubitus).',
    emergency_level: 'urgent_consultation',
    audio_url: '/audio/onomatopoeia/jukujuku.mp3',
    sample_elder_sentence: '褥瘡（じょくそう）の傷口がジュクジュク湿っている。',
    action_guideline_id: 'Lapor perawat luka untuk perawatan hidrokoloid dan penggantian balutan aseptik.',
  },
  {
    id: 19,
    onomatopoeia: 'ピタッと',
    romaji: 'pitat-to',
    physiological_cluster: 'kaku_terkunci',
    clinical_meaning_id: 'Kasa atau perban menempel erat mengering mati pada jaringan granulasi luka.',
    emergency_level: 'routine_observation',
    audio_url: '/audio/onomatopoeia/pitatto.mp3',
    sample_elder_sentence: 'ガーゼが傷口にピタッと張り付いて剥がれない。',
    action_guideline_id: 'Basahi dengan cairan infus NaCl steril sebelum melepaskan agar epitel tidak sobek.',
  },

  // ── KLASTER 4: MUSCULOSKELETAL & JOINT (筋骨格・関節・脊椎) ──
  {
    id: 20,
    onomatopoeia: 'ギクッと',
    romaji: 'giku-tto',
    physiological_cluster: 'kaku_terkunci',
    clinical_meaning_id: 'Pinggang kecetit terkilir mendadak terkunci kaku saat membungkuk (gikkuri-goshi).',
    emergency_level: 'urgent_consultation',
    audio_url: '/audio/onomatopoeia/gikutto.mp3',
    sample_elder_sentence: '重い荷物を持ち上げた瞬間に腰がギクッとなった。',
    action_guideline_id: 'Istirahatkan pasien dalam posisi miring lutut ditekuk, jangan dipijat paksa.',
  },
  {
    id: 21,
    onomatopoeia: 'ミシミシ',
    romaji: 'mishimishi',
    physiological_cluster: 'kaku_terkunci',
    clinical_meaning_id: 'Sendi lutut berderit-derit kasar akibat keausan bantalan tulang rawan sendi.',
    emergency_level: 'routine_observation',
    audio_url: '/audio/onomatopoeia/mishimishi.mp3',
    sample_elder_sentence: '歩くたびに膝の軟骨がミシミシ軋む。',
    action_guideline_id: 'Bantu transfer dengan walker/tongkat dan hindari tumpuan beban lutut tunggal.',
  },
  {
    id: 22,
    onomatopoeia: 'ポキッと',
    romaji: 'poki-tto',
    physiological_cluster: 'menusuk_tajam',
    clinical_meaning_id: 'Bunyi patahan tulang rapuh seperti ranting kering patah (fraktur akut).',
    emergency_level: 'immediate_119_ambulance',
    audio_url: '/audio/onomatopoeia/pokitto.mp3',
    sample_elder_sentence: '転倒した時に手首がポキッと音を立てた。',
    action_guideline_id: 'Fiksasi bagian patah dengan bidai tanpa reposisi dan segera telepon 119.',
  },
  {
    id: 23,
    onomatopoeia: 'ギシギシ',
    romaji: 'gishigishi',
    physiological_cluster: 'kaku_terkunci',
    clinical_meaning_id: 'Sendi jari tangan kaku berkarat seret digerakkan di pagi hari.',
    emergency_level: 'routine_observation',
    audio_url: '/audio/onomatopoeia/gishigishi.mp3',
    sample_elder_sentence: '指の関節がギシギシして朝曲がらない。',
    action_guideline_id: 'Lakukan kompres hangat dan latihan gerak sendi halus (ROM exercise).',
  },
  {
    id: 24,
    onomatopoeia: 'ジンジン',
    romaji: 'jinjin',
    physiological_cluster: 'panas_terbakar',
    clinical_meaning_id: 'Nyeri ngilu berdenyut panas menjalar setelah benturan atau tertimpa benda keras.',
    emergency_level: 'routine_observation',
    audio_url: '/audio/onomatopoeia/jinjin.mp3',
    sample_elder_sentence: '打撲した足指がジンジン熱を持って痛む。',
    action_guideline_id: 'Terapkan protokol RICE (Rest, Ice, Compression, Elevation) pada area benturan.',
  },
  {
    id: 25,
    onomatopoeia: 'パンパン（足）',
    romaji: 'panpan (ashi)',
    physiological_cluster: 'tumpul_berat',
    clinical_meaning_id: 'Betis bengkak keras menegang kencang berisi cairan edema (waspada DVT).',
    emergency_level: 'urgent_consultation',
    audio_url: '/audio/onomatopoeia/panpan_ashi.mp3',
    sample_elder_sentence: '立ち仕事で夕方になるとふくらはぎがパンパンだ。',
    action_guideline_id: 'Tinggikan kaki saat istirahat dan amati tanda trombosis vena dalam (DVT).',
  },

  // ── KLASTER 5: VESTIBULAR & EQUILIBRIUM (平衡・感覚・意識障害) ──
  {
    id: 26,
    onomatopoeia: 'フラフラ',
    romaji: 'furafura',
    physiological_cluster: 'pusing_disorientasi',
    clinical_meaning_id: 'Jalan sempoyongan limbung melayang risiko tinggi terjatuh (tentō risku).',
    emergency_level: 'urgent_consultation',
    audio_url: '/audio/onomatopoeia/furafura.mp3',
    sample_elder_sentence: 'ベッドから降りたら足元がフラフラして倒れそう。',
    action_guideline_id: 'Segera dudukkan kembali ke tepi tempat tidur dan pegang sabuk transfer erat-erat.',
  },
  {
    id: 27,
    onomatopoeia: 'クラクラ',
    romaji: 'kurakura',
    physiological_cluster: 'pusing_disorientasi',
    clinical_meaning_id: 'Pusing tujuh keliling seisi ruangan berputar dahsyat (vertigo rotasional).',
    emergency_level: 'urgent_consultation',
    audio_url: '/audio/onomatopoeia/kurakura.mp3',
    sample_elder_sentence: '急に天井がぐるぐるクラクラ回り出した。',
    action_guideline_id: 'Minta pasien menutup mata, pertahankan posisi kepala stabil, dan hubungi dokter.',
  },
  {
    id: 28,
    onomatopoeia: 'チカチカ',
    romaji: 'chikachika',
    physiological_cluster: 'pusing_disorientasi',
    clinical_meaning_id: 'Penglihatan silau berkunang-kunang kelap-kelip seperti kilatan blitz fotometer.',
    emergency_level: 'urgent_consultation',
    audio_url: '/audio/onomatopoeia/chikachika.mp3',
    sample_elder_sentence: '目の前で光がチカチカ点滅して見えにくい。',
    action_guideline_id: 'Waspada aura pelepasan retina (ablasio retina) atau hipoperfusi serebral.',
  },
  {
    id: 29,
    onomatopoeia: 'ザーザー',
    romaji: 'zāzā',
    physiological_cluster: 'pusing_disorientasi',
    clinical_meaning_id: 'Suara mendengung gemuruh air terjun di dalam telinga (tinnitus nada rendah).',
    emergency_level: 'routine_observation',
    audio_url: '/audio/onomatopoeia/zaza.mp3',
    sample_elder_sentence: '耳の中でザーザー滝のような音が鳴り響く。',
    action_guideline_id: 'Periksa kemungkinan tuli mendadak unilateral atau gangguan sirkulasi mikro.',
  },
  {
    id: 30,
    onomatopoeia: 'カスカス',
    romaji: 'kasukasu',
    physiological_cluster: 'sesak_napas',
    clinical_meaning_id: 'Suara parau serak kering habis hanya keluar hembusan angin (afonia laringeal).',
    emergency_level: 'routine_observation',
    audio_url: '/audio/onomatopoeia/kasukasu.mp3',
    sample_elder_sentence: '声がカスカスになって息しか出ない。',
    action_guideline_id: 'Cek hidrasi mukosa tenggorokan dan waspadai parese pita suara pasca batuk berat.',
  },
  {
    id: 31,
    onomatopoeia: 'グラグラ',
    romaji: 'guragura',
    physiological_cluster: 'kaku_terkunci',
    clinical_meaning_id: 'Gigi atau implan goyang tidak kokoh membahayakan saat mengunyah makanan.',
    emergency_level: 'routine_observation',
    audio_url: '/audio/onomatopoeia/guragura.mp3',
    sample_elder_sentence: '前歯がグラグラして入れ歯が噛めない。',
    action_guideline_id: 'Sesuaikan tekstur makanan ke bubur saring agar tidak terjadi risiko tersedak gigi copot.',
  },

  // ── KLASTER 6: CARDIOPULMONARY & RESPIRATORY (心肺・呼吸・体温) ──
  {
    id: 32,
    onomatopoeia: 'ドキドキ',
    romaji: 'dokidoki',
    physiological_cluster: 'sesak_napas',
    clinical_meaning_id: 'Jantung berdebar melonjak-lonjak sangat kencang saat istirahat (takikardia paroksismal).',
    emergency_level: 'urgent_consultation',
    audio_url: '/audio/onomatopoeia/dokidoki.mp3',
    sample_elder_sentence: '胸がドキドキ早鐘を打って苦しい。',
    action_guideline_id: 'Hitung denyut nadi radial selama 60 detik penuh dan rekam irama reguler/ireguler.',
  },
  {
    id: 33,
    onomatopoeia: 'ゼーゼー',
    romaji: 'zēzē',
    physiological_cluster: 'sesak_napas',
    clinical_meaning_id: 'Napas grok-grok berlendir berat tersumbat dahak kental di bronkus besar.',
    emergency_level: 'urgent_consultation',
    audio_url: '/audio/onomatopoeia/zeze.mp3',
    sample_elder_sentence: '痰が絡んで喉がゼーゼー苦しそうに鳴っている。',
    action_guideline_id: 'Lakukan pengisapan dahak (suction) sesuai wewenang dan ubah posisi miring.',
  },
  {
    id: 34,
    onomatopoeia: 'ヒューヒュー',
    romaji: 'hyūhyū',
    physiological_cluster: 'sesak_napas',
    clinical_meaning_id: 'Napas menciut-ciut ngik-ngik bernada tinggi akibat penyempitan bronkus (asma/anafilaksis).',
    emergency_level: 'immediate_119_ambulance',
    audio_url: '/audio/onomatopoeia/hyuhyu.mp3',
    sample_elder_sentence: '息を吸うたびにヒューヒュー高い笛の音がする。',
    action_guideline_id: 'Berikan posisi duduk tegak (ortopnea), siapkan bronkodilator inhalasi, dan panggil dokter.',
  },
  {
    id: 35,
    onomatopoeia: 'ゾクゾク',
    romaji: 'zokuzoku',
    physiological_cluster: 'tumpul_berat',
    clinical_meaning_id: 'Menggigil kedinginan hebat sampai gigi bergemeletuk pertanda demam melonjak menembus 39°C.',
    emergency_level: 'urgent_consultation',
    audio_url: '/audio/onomatopoeia/zokuzoku.mp3',
    sample_elder_sentence: '背筋がゾクゾク寒気（さむけ）がして歯が鳴る。',
    action_guideline_id: 'Selimuti tebal selama fase menggigil; ukur suhu setiap 30 menit.',
  },
  {
    id: 36,
    onomatopoeia: 'カーッと',
    romaji: 'kātto',
    physiological_cluster: 'panas_terbakar',
    clinical_meaning_id: 'Wajah mendadak memerah panas menyengat ke ubun-ubun (krisis panas heatstroke/hipertensi).',
    emergency_level: 'urgent_consultation',
    audio_url: '/audio/onomatopoeia/katto.mp3',
    sample_elder_sentence: '顔が急にカーッと火照って熱くなる。',
    action_guideline_id: 'Pindahkan ke tempat ber-AC sejuk, longgarkan pakaian leher, dan kompres es di leher.',
  },

  // ── KLASTER 7: INDUSTRIAL TRAUMA & GEMBA ACCIDENTS (工場・機械外傷) ──
  {
    id: 37,
    onomatopoeia: 'グシャッと',
    romaji: 'gusha-tto',
    physiological_cluster: 'tumpul_berat',
    clinical_meaning_id: 'Jari/anggota tubuh hancur remuk terlindas mesin pres cetakan logam bertekanan tinggi.',
    emergency_level: 'immediate_119_ambulance',
    audio_url: '/audio/onomatopoeia/gushatto.mp3',
    sample_elder_sentence: '金型に指が挟まれてグシャッと潰れた！',
    action_guideline_id: 'Matikan daya utama mesin pres seketika, pasang balut tekan hemostatik, telepon 119.',
  },
  {
    id: 38,
    onomatopoeia: 'バチッと',
    romaji: 'bachi-tto',
    physiological_cluster: 'menusuk_tajam',
    clinical_meaning_id: 'Ledakan sengatan listrik busur api tegangan tinggi 200V terpental kejang.',
    emergency_level: 'immediate_119_ambulance',
    audio_url: '/audio/onomatopoeia/bachitto.mp3',
    sample_elder_sentence: '分電盤に触れた瞬間、バチッと火花が飛んで弾き飛ばされた！',
    action_guideline_id: 'Matikan sakelar sebelum menyentuh korban, periksa napas dan nadi karotis segera.',
  },
  {
    id: 39,
    onomatopoeia: 'プツンと',
    romaji: 'putsu-nto',
    physiological_cluster: 'menusuk_tajam',
    clinical_meaning_id: 'Kawat seling baja derek hoist putus mendadak saat mengangkat beban berat.',
    emergency_level: 'immediate_119_ambulance',
    audio_url: '/audio/onomatopoeia/putsunto.mp3',
    sample_elder_sentence: 'ホイストのワイヤーがプツンと切れた！',
    action_guideline_id: 'Berteriak evakuasi seluruh kru keluar dari lintasan radius ayunan kabel.',
  },
  {
    id: 40,
    onomatopoeia: 'ピシッと',
    romaji: 'pishi-tto',
    physiological_cluster: 'menusuk_tajam',
    clinical_meaning_id: 'Selang minyak hidrolik meledak pecah menyemprotkan cairan bertekanan sangat tinggi.',
    emergency_level: 'urgent_consultation',
    audio_url: '/audio/onomatopoeia/pishitto.mp3',
    sample_elder_sentence: '油圧ホースがピシッと破裂してオイルが噴き出した！',
    action_guideline_id: 'Jauhi semprotan hidrolik (bahaya injeksi subkutan minyak ke pembuluh darah).',
  },
  {
    id: 41,
    onomatopoeia: 'ドサッと',
    romaji: 'dosa-tto',
    physiological_cluster: 'tumpul_berat',
    clinical_meaning_id: 'Muatan tumpukan palet profil baja ambruk runtuh menimpa area lantai kerja.',
    emergency_level: 'immediate_119_ambulance',
    audio_url: '/audio/onomatopoeia/dosatto.mp3',
    sample_elder_sentence: 'パレットが崩れて鋼材がドサッと落ちてきた！',
    action_guideline_id: 'Periksa apakah ada pekerja tertindih material berat, gunakan dongkrak hidrolik.',
  },
  {
    id: 42,
    onomatopoeia: 'ツルッと',
    romaji: 'tsuru-tto',
    physiological_cluster: 'kaku_terkunci',
    clinical_meaning_id: 'Terpeleset licin lapisan oli pada lantai beton pabrik seketika terjatuh.',
    emergency_level: 'routine_observation',
    audio_url: '/audio/onomatopoeia/tsurutto.mp3',
    sample_elder_sentence: '床の油膜で足がツルッと滑って転倒した！',
    action_guideline_id: 'Taburkan serbuk penyerap minyak di lantai dan pasang papan peringatan lantai licin.',
  },
];

/**
 * Load all 42 pain onomatopoeia items, optionally filtered by physiological cluster.
 */
export function loadPainOnomatopoeia(cluster?: PhysiologicalCluster): PainOnomatopoeiaItem[] {
  if (cluster) {
    return CANONICAL_PAIN_ONOMATOPOEIA.filter((item) => item.physiological_cluster === cluster);
  }
  return CANONICAL_PAIN_ONOMATOPOEIA;
}

/**
 * Load items by clinical emergency triage level.
 */
export function loadPainByEmergencyLevel(level: ClinicalEmergencyLevel): PainOnomatopoeiaItem[] {
  return CANONICAL_PAIN_ONOMATOPOEIA.filter((item) => item.emergency_level === level);
}

/**
 * Get a specific onomatopoeia item by ID.
 */
export function getPainOnomatopoeiaById(id: number): PainOnomatopoeiaItem | null {
  return CANONICAL_PAIN_ONOMATOPOEIA.find((item) => item.id === id) || null;
}

/**
 * Generates interactive clinical quiz questions for elderly pain onomatopoeia drills.
 */
export function generatePainOnomatopoeiaQuestions(count = 10): QuizQuestionItem[] {
  const pool = [...CANONICAL_PAIN_ONOMATOPOEIA];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  const selected = pool.slice(0, count);

  return selected.map((item) => {
    const distractors = CANONICAL_PAIN_ONOMATOPOEIA
      .filter((o) => o.id !== item.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((d) => `${d.clinical_meaning_id} (${d.action_guideline_id})`);

    const correct = `${item.clinical_meaning_id} (${item.action_guideline_id})`;
    const options = [correct, ...distractors].sort(() => Math.random() - 0.5);

    const qText = `Pasien lansia mengeluh: "${item.sample_elder_sentence}". Apakah arti rasa nyeri "${item.onomatopoeia}" (${item.romaji}) dan tindakan yang tepat?`;

    return {
      id: `pain-ono-${item.id}-${Date.now()}`,
      mode: 'onomatopoeia',
      prompt: `Keluhan Lansia: "${item.sample_elder_sentence}"`,
      questionText: qText,
      targetItem: item,
      correctAnswer: correct,
      options,
      explanation: `Onomatopoeia: ${item.onomatopoeia} (${item.romaji}) | Kluster: ${item.physiological_cluster} | Tindakan: ${item.action_guideline_id}`,
      level: 'n4',
    };
  });
}

