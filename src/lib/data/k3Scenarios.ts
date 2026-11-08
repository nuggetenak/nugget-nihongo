// ══════════════════════════════════════════════════════════════════
//  k3Scenarios.ts — Authoritative Japanese K3 & SSW Gemba Disaster Repository
//  Research Basis: JNIOSH (2020), ADR-009, SBAR Clinical & Gemba Protocol
//  36 Canonical Scenarios across 4 Macro Clusters & Official K3 Emergency Catalog
// ══════════════════════════════════════════════════════════════════

import type {
  K3DisasterScenario,
  K3HazardHotspot,
  K3PointAndCallGate,
  K3SbarReportingFlow,
} from '../../types/k3';

export interface K3Command {
  id: string;
  jp: string;
  kana: string;
  romaji: string;
  idTranslation: string;
  category: 'point_and_call' | 'emergency_alert' | 'kyk_5s' | 'ppe_apd' | 'medical_rousai';
  context: string;
  audioPrompt?: string;
}

export const OFFICIAL_K3_COMMANDS: K3Command[] = [
  // ── 1. Shisa Kanko (指差呼称 - Point and Call) ──
  {
    id: 'cmd-k3-001',
    jp: 'よし！',
    kana: 'よし！',
    romaji: 'Yoshi!',
    idTranslation: 'Beres! / Aman! (Konfirmasi mantap setelah menunjuk objek target)',
    category: 'point_and_call',
    context: 'Aba-aba penutup setiap tindakan tunjuk-sebut (指差呼称) untuk memangkas error kognitif hingga 85%.',
  },
  {
    id: 'cmd-k3-002',
    jp: '左右よし！',
    kana: 'さゆうよし！',
    romaji: 'Sayuu yoshi!',
    idTranslation: 'Kiri kanan aman!',
    category: 'point_and_call',
    context: 'Saat menyeberang jalur forklift di pabrik, perlintasan rel, atau lorong kerja.',
  },
  {
    id: 'cmd-k3-003',
    jp: '足元よし！',
    kana: 'あしもとよし！',
    romaji: 'Ashimoto yoshi!',
    idTranslation: 'Pijakan kaki aman!',
    category: 'point_and_call',
    context: 'Sebelum menaiki tangga steger konstruksi atau melintasi lantai licin berminyak.',
  },
  {
    id: 'cmd-k3-004',
    jp: '指差呼称でゼロ災害！',
    kana: 'しさこしょうでぜろさいがい！',
    romaji: 'Shisa kanko de zero saigai!',
    idTranslation: 'Nol kecelakaan kerja dengan tunjuk-sebut!',
    category: 'point_and_call',
    context: 'Yel-yel resmi penutup senam pagi keselamatan (朝礼 - Chourei) di seluruh industri Jepang.',
  },

  // ── 2. Emergency Alerts (緊急事態・警報) ──
  {
    id: 'cmd-k3-005',
    jp: 'あぶない！',
    kana: 'あぶない！',
    romaji: 'Abunai!',
    idTranslation: 'Bahaya! / Awas!',
    category: 'emergency_alert',
    context: 'Teriakan spontan segera saat melihat rekan kerja atau objek dalam kondisi berbahaya fatal.',
  },
  {
    id: 'cmd-k3-006',
    jp: '非常停止！',
    kana: 'ひじょうていし！',
    romaji: 'Hijou teishi!',
    idTranslation: 'Emergency Stop! / Hentikan mesin segera!',
    category: 'emergency_alert',
    context: 'Perintah menekan tombol merah darurat (非常停止ボタン) saat mesin mengalami anomali atau terjepit.',
  },
  {
    id: 'cmd-k3-007',
    jp: '火事だ！',
    kana: 'かじだ！',
    romaji: 'Kaji da!',
    idTranslation: 'Kebakaran!',
    category: 'emergency_alert',
    context: 'Seruan lantang pertama saat melihat nyala api di dapur restoran atau bengkel pengelasan.',
  },
  {
    id: 'cmd-k3-008',
    jp: '119番通報！',
    kana: 'ひゃくじゅうきゅうばんつうほう！',
    romaji: 'Hyakujuukyuu-ban tsuuhou!',
    idTranslation: 'Hubungi pemadam kebakaran / ambulans (119)!',
    category: 'emergency_alert',
    context: 'Instruksi pemanggilan darurat medis dan pemadam kebakaran di Jepang.',
  },

  // ── 3. APD / PPE Equipment (保護具・安全装具) ──
  {
    id: 'cmd-k3-009',
    jp: 'ヘルメット着用、あご紐よし！',
    kana: 'へるめっとちゃくよう、あごひもよし！',
    romaji: 'Herumetto chakuyou, ago-himo yoshi!',
    idTranslation: 'Helm terpasang, tali dagu terkunci rapat aman!',
    category: 'ppe_apd',
    context: 'Pengecekan wajib sebelum memasuki zona proyek konstruksi, galangan kapal, dan gudang logistik.',
  },
  {
    id: 'cmd-k3-010',
    jp: '回転部軍手禁止！',
    kana: 'かいてんぶぐんてきんし！',
    romaji: 'Kaiten-bu gunte kinshi!',
    idTranslation: 'DILARANG KERAS sarung tangan kain rajut di dekat bagian berputar!',
    category: 'ppe_apd',
    context: 'Prinsip K3 vital METI: serabut rajut dapat tersangkut chuck mesin bubut/bor dan meremukkan tangan.',
  },
  {
    id: 'cmd-k3-011',
    jp: '保護メガネ着用！',
    kana: 'ほごめがねちゃくよう！',
    romaji: 'Hogo megane chakuyou!',
    idTranslation: 'Gunakan kacamata pelindung safety!',
    category: 'ppe_apd',
    context: 'Wajib saat membubut, menggerinda, atau menangani bahan kimia pembersih asam/klorin.',
  },
  {
    id: 'cmd-k3-012',
    jp: '安全帯フック掛けよし！',
    kana: 'あんぜんたいふっくかけよし！',
    romaji: 'Anzentai fukku kake yoshi!',
    idTranslation: 'Hook safety harness terpasang kuat di pipa penyangga!',
    category: 'ppe_apd',
    context: 'Wajib pada ketinggian $\ge 2$ meter di atas tanah (scaffolding/atap).',
  },

  // ── 4. KYK & 5S Disciplines (危険予知・5S) ──
  {
    id: 'cmd-k3-013',
    jp: '危険予知活動 (KYK)',
    kana: 'きけんよちかつどう (けいわいけい)',
    romaji: 'Kiken Yochi Katsudou (KYK)',
    idTranslation: 'Aktivitas Prediksi Bahaya (Briefing 4 babak sebelum mulai kerja)',
    category: 'kyk_5s',
    context: 'Metode JNIOSH: Identifikasi bahaya tersembunyi, tetapkan poin kritis, dan sepakati kata kunci aman.',
  },
  {
    id: 'cmd-k3-014',
    jp: 'ヒヤリ・ハット報告',
    kana: 'ひやり・はっとほうこく',
    romaji: 'Hiyari Hatto houkoku',
    idTranslation: 'Laporan Near-Miss (Insiden nyaris celaka/terkaget)',
    category: 'kyk_5s',
    context: 'Prinsip Piramida Heinrich: 1 kecelakaan fatal didahului 29 cedera ringan dan 300 kejadian nyaris celaka.',
  },
  {
    id: 'cmd-k3-015',
    jp: '報連相 (報告・連絡・相談)',
    kana: 'ほうれんそう (ほうこく・れんらく・そうだん)',
    romaji: 'Hou-Ren-Sou',
    idTranslation: 'Laporkan, Hubungi, Konsultasikan',
    category: 'kyk_5s',
    context: 'Fondasi komunikasi hierarki kerja Jepang untuk mencegah salah paham operasional.',
  },

  // ── 5. Medical & Rousai Tiers (救急・労災) ──
  {
    id: 'cmd-k3-016',
    jp: '応急手当・初期対応',
    kana: 'おうきゅうてあて・しょきたいおう',
    romaji: 'Oukyuu teate / Shoki taiou',
    idTranslation: 'Pertolongan Pertama Lapangan (Tier 1)',
    category: 'medical_rousai',
    context: 'Mengompres es pada memar, membalut luka gores ringan, atau mengistirahatkan korban di tempat teduh.',
  },
  {
    id: 'cmd-k3-017',
    jp: '労災保険・事故調査',
    kana: 'ろうさいほけん・じこちょうさ',
    romaji: 'Rousai hoken / Jiko chousa',
    idTranslation: 'Asuransi Kecelakaan Kerja & Investigasi Resmi (Tier 3-4)',
    category: 'medical_rousai',
    context: 'Kompensasi resmi pemerintah Jepang (MHLW) untuk cedera atau musibah yang terjadi saat bertugas.',
  },
];

// ══════════════════════════════════════════════════════════════════
//  36 Canonical K3 Disaster Scenarios across 4 Macro Clusters
// ══════════════════════════════════════════════════════════════════

export const K3_DISASTER_SCENARIOS: K3DisasterScenario[] = [
  // ── KLASTER 1: MANUFACTURING (K3-01 s.d. K3-09) ──
  {
    scenario_id: 'K3-01',
    sector_code: 'SSW-MFG-01',
    macro_cluster: 'manufacturing',
    hazard_type: 'Jari Terjepit Poros Mesin Bubut (回転機械巻き込み)',
    ambient_noise_level: 'high_industrial',
    initial_kyk_assessment: {
      situation_image_url: '/assets/k3/mfg-lathe-hazard.webp',
      hazard_hotspots: [
        { x_percent: 45, y_percent: 50, is_hazard: true, feedback_text: 'Chuck mesin bubut berputar kencang tanpa tutup pelindung!' },
        { x_percent: 30, y_percent: 65, is_hazard: true, feedback_text: 'Operator mengenakan sarung tangan rajut kain (軍手禁止)!' },
        { x_percent: 80, y_percent: 85, is_hazard: false, feedback_text: 'Tombol emergency stop siap ditekan.' },
      ],
    },
    point_and_call_gate: {
      target_object_name: 'Tombol Stop Darurat & Chuck Mesin',
      confirmation_callout: 'チャック停止、素手作業よし！ (Chakku teishi, sude sagyou yoshi!)',
      touch_duration_ms: 2000,
    },
    sbar_reporting_flow: {
      situation_prompt: 'Laporkan kejadian mendesak ke supervisor saat tangan rekan tersangkut chuck mesin.',
      background_prompt: 'Jelaskan kondisi mesin bubut NC line 2 yang sedang berjalan.',
      assessment_prompt: 'Evaluasi cedera korban dan apakah mesin sudah mati total.',
      recommendation_prompt: 'Rekomendasikan pemanggilan ambulans dan isolasi sumber tenaga listrik.',
      expected_response_rubric: ['非常停止ボタン', '救急車', '指の負傷', '電源遮断'],
    },
    rousai_escalation_tier: 3,
  },
  {
    scenario_id: 'K3-02',
    sector_code: 'SSW-MFG-02',
    macro_cluster: 'manufacturing',
    hazard_type: 'Mesin Press Stamping & Sensor Pengaman Mati (プレス機挟まれ)',
    ambient_noise_level: 'high_industrial',
    initial_kyk_assessment: {
      situation_image_url: '/assets/k3/mfg-press-hazard.webp',
      hazard_hotspots: [
        { x_percent: 50, y_percent: 40, is_hazard: true, feedback_text: 'Die press bergerak turun saat tangan pekerja masih di dalam matriks.' },
        { x_percent: 20, y_percent: 45, is_hazard: true, feedback_text: 'Sensor tirai cahaya keselamatan (光線式安全装置) dalam kondisi bypass off.' },
      ],
    },
    point_and_call_gate: {
      target_object_name: 'Tirai Sensor Pengaman',
      confirmation_callout: '安全装置作動、エリア内よし！ (Anzen souchi sadou, eria-nai yoshi!)',
      touch_duration_ms: 2000,
    },
    sbar_reporting_flow: {
      situation_prompt: 'Laporkan mesin press stamping 200 ton yang mengalami kegagalan sensor optik.',
      background_prompt: 'Jelaskan jadwal produksi plat bodi yang sedang berlangsung.',
      assessment_prompt: 'Nilai potensi risiko amputasi tangan jika operasi terus dilanjutkan.',
      recommendation_prompt: 'Minta izin supervisor untuk mematikan mesin dan memanggil teknisi pemeliharaan.',
      expected_response_rubric: ['プレス停止', '安全装置故障', '作業中断', '保全班連絡'],
    },
    rousai_escalation_tier: 2,
  },
  {
    scenario_id: 'K3-03',
    sector_code: 'SSW-MFG-03',
    macro_cluster: 'manufacturing',
    hazard_type: 'Pembersihan Tatal Besi Panas Tanpa Hook (高温切粉飛散)',
    ambient_noise_level: 'medium',
    initial_kyk_assessment: {
      situation_image_url: '/assets/k3/mfg-chips-hazard.webp',
      hazard_hotspots: [
        { x_percent: 60, y_percent: 55, is_hazard: true, feedback_text: 'Tatal logam tajam membara ditarik dengan tangan kosong.' },
      ],
    },
    point_and_call_gate: {
      target_object_name: 'Tongkat Kait Tatal (フック)',
      confirmation_callout: '切粉フック使用、機械停止よし！ (Kiriko fukku shiyou, kikai teishi yoshi!)',
      touch_duration_ms: 2000,
    },
    sbar_reporting_flow: {
      situation_prompt: 'Laporkan luka sayat tatal panas pada telapak tangan kiri operator.',
      background_prompt: 'Jelaskan proses milling baja perkakas yang menghasilkan tatal panjang bergulung.',
      assessment_prompt: 'Nilai kedalaman luka sayat dan kebutuhan desinfeksi medis.',
      recommendation_prompt: 'Antar rekan ke poliklinik pabrik dan bersihkan sisa tatal dengan kait logam.',
      expected_response_rubric: ['切粉による切創', '医務室搬送', '機械停止', '消毒処置'],
    },
    rousai_escalation_tier: 1,
  },
  {
    scenario_id: 'K3-04',
    sector_code: 'SSW-MFG-04',
    macro_cluster: 'manufacturing',
    hazard_type: 'Percikan Api Pengelasan Dekat Tabung Gas (アーク溶接火花)',
    ambient_noise_level: 'high_industrial',
    initial_kyk_assessment: {
      situation_image_url: '/assets/k3/mfg-welding-hazard.webp',
      hazard_hotspots: [
        { x_percent: 75, y_percent: 60, is_hazard: true, feedback_text: 'Tabung asetilen dan oksigen berada kurang dari 5 meter dari titik las tanpa tirai peredam api!' },
      ],
    },
    point_and_call_gate: {
      target_object_name: 'Tirai Antiapi & Tabung Gas',
      confirmation_callout: '防炎シートよし、ガスボンベ隔離よし！ (Bouen shiito yoshi, gasu bombe kakuri yoshi!)',
      touch_duration_ms: 2000,
    },
    sbar_reporting_flow: {
      situation_prompt: 'Laporkan nyala api kecil pada lap uesu dekat tangki gas las asetilen.',
      background_prompt: 'Pengelasan struktur baja kapal di dok nomor 3.',
      assessment_prompt: 'Api berpotensi menyambar katup selang gas jika tidak segera dipadamkan.',
      recommendation_prompt: 'Gunakan APAR busa bubuk dan tutup katup silinder gas segera.',
      expected_response_rubric: ['消火器使用', 'ガスボンベ元栓閉止', '初期消火', '避難誘導'],
    },
    rousai_escalation_tier: 2,
  },
  {
    scenario_id: 'K3-05',
    sector_code: 'SSW-MFG-05',
    macro_cluster: 'manufacturing',
    hazard_type: 'Kawat Seling Crane Putus Saat Pengangkatan (玉掛けワイヤー破断)',
    ambient_noise_level: 'high_industrial',
    initial_kyk_assessment: {
      situation_image_url: '/assets/k3/mfg-crane-hazard.webp',
      hazard_hotspots: [
        { x_percent: 50, y_percent: 30, is_hazard: true, feedback_text: 'Seling kawat baja tertekuk (kink) dan beberapa serat putus terkelupas!' },
        { x_percent: 50, y_percent: 80, is_hazard: true, feedback_text: 'Pekerja berdiri tepat di bawah balok baja gantung (吊り荷の下立ち入り禁止)!' },
      ],
    },
    point_and_call_gate: {
      target_object_name: 'Area Bebas di Bawah Muatan Crane',
      confirmation_callout: '吊り荷の下立入禁止、周囲よし！ (Tsurini no shita tachiiri kinshi, shuui yoshi!)',
      touch_duration_ms: 2000,
    },
    sbar_reporting_flow: {
      situation_prompt: 'Laporkan seling sling wire pengangkat balok mesin retak dan hampir putus.',
      background_prompt: 'Pengangkatan komponen mesin cetak seberat 3 ton di area assembly.',
      assessment_prompt: 'Beban berisiko jatuh menghantam lantai jika pengangkatan diteruskan.',
      recommendation_prompt: 'Turunkan beban ke lantai penyangga segera dan ganti seling sling baja.',
      expected_response_rubric: ['ワイヤー破断寸前', '吊り荷降下', '立入制限', '玉掛けワイヤー交換'],
    },
    rousai_escalation_tier: 2,
  },
  {
    scenario_id: 'K3-06',
    sector_code: 'SSW-MFG-06',
    macro_cluster: 'manufacturing',
    hazard_type: 'Batu Gerinda Pecah Melayang (グラインダー砥石破損)',
    ambient_noise_level: 'high_industrial',
    initial_kyk_assessment: {
      situation_image_url: '/assets/k3/mfg-grinder-hazard.webp',
      hazard_hotspots: [
        { x_percent: 55, y_percent: 60, is_hazard: true, feedback_text: 'Penutup pelindung gerinda (安全カバー) dilepas oleh operator!' },
      ],
    },
    point_and_call_gate: {
      target_object_name: 'Pelindung Cover Gerinda',
      confirmation_callout: '安全カバーよし、試運転よし！ (Anzen kabaa yoshi, shiunten yoshi!)',
      touch_duration_ms: 2000,
    },
    sbar_reporting_flow: {
      situation_prompt: 'Laporkan serpihan batu gerinda meleset mengenai pelindung kacamata pekerja.',
      background_prompt: 'Penghalusan sambungan las pipa baja kecepatan 10.000 RPM.',
      assessment_prompt: 'Kacamata pecah tergores, mata korban merah terkena getaran kuat serpihan.',
      recommendation_prompt: 'Pemeriksaan mata ke spesialis dan audit seluruh batu gerinda di bengkel.',
      expected_response_rubric: ['砥石破損', '眼科受診', '保護メガネ確認', '全数点検'],
    },
    rousai_escalation_tier: 2,
  },
  {
    scenario_id: 'K3-07',
    sector_code: 'SSW-MFG-07',
    macro_cluster: 'manufacturing',
    hazard_type: 'Cairan Asam Kimia Korosif Terpercik (有機溶剤酸液飛散)',
    ambient_noise_level: 'medium',
    initial_kyk_assessment: {
      situation_image_url: '/assets/k3/mfg-chemical-hazard.webp',
      hazard_hotspots: [
        { x_percent: 40, y_percent: 50, is_hazard: true, feedback_text: 'Pekerja menuang cairan asam elektroplating tanpa apron karet dan kacamata tertutup.' },
      ],
    },
    point_and_call_gate: {
      target_object_name: 'Stasiun Pembilas Mata Darurat (洗眼器)',
      confirmation_callout: '洗眼器位置確認、保護具着用よし！ (Senganki ichi kakunin, hogogu chakuyou yoshi!)',
      touch_duration_ms: 2000,
    },
    sbar_reporting_flow: {
      situation_prompt: 'Laporkan percikan cairan asam klorida mengenai lengan bawah staf pelapisan logam.',
      background_prompt: 'Pencucian asam (pickling) tangki pelapisan seng.',
      assessment_prompt: 'Kulit memerah dan perih terbakar bahan kimia.',
      recommendation_prompt: 'Bilas air mengalir selama 15 menit penuh dan laporkan ke dokter industri.',
      expected_response_rubric: ['流水15分洗浄', '化学熱傷', '緊急洗眼器', '産業医報告'],
    },
    rousai_escalation_tier: 2,
  },
  {
    scenario_id: 'K3-08',
    sector_code: 'SSW-AUTO-01',
    macro_cluster: 'manufacturing',
    hazard_type: 'Dongkrak Hidrolik Bengkel Mobil Ambles (自動車リフト落下)',
    ambient_noise_level: 'high_industrial',
    initial_kyk_assessment: {
      situation_image_url: '/assets/k3/auto-lift-hazard.webp',
      hazard_hotspots: [
        { x_percent: 50, y_percent: 45, is_hazard: true, feedback_text: 'Pengunci mekanis lift mobil (リフトセーフティロック) belum dikaitkan!' },
      ],
    },
    point_and_call_gate: {
      target_object_name: 'Kunci Pengaman Lift 2-Post',
      confirmation_callout: 'リフトメカニカルロック確認、よし！ (Rifuto mekanikaru rokku kakunin, yoshi!)',
      touch_duration_ms: 2000,
    },
    sbar_reporting_flow: {
      situation_prompt: 'Laporkan kebocoran oli hidrolik pada silinder lift mobil nomor 4.',
      background_prompt: 'Pemeriksaan bagian kolong transmisi mobil minibus.',
      assessment_prompt: 'Mobil sedikit miring 5 derajat, membahayakan mekanik di kolong.',
      recommendation_prompt: 'Minta mekanik segera keluar dan pasang penyangga kaku safety stand.',
      expected_response_rubric: ['油圧漏れ', '作業員退避', 'セーフティスタンド', 'リフト点検'],
    },
    rousai_escalation_tier: 2,
  },
  {
    scenario_id: 'K3-09',
    sector_code: 'SSW-MFG-08',
    macro_cluster: 'manufacturing',
    hazard_type: 'Robot Las Otomatis Sensor Interlock Terobos (産業ロボット侵入)',
    ambient_noise_level: 'high_industrial',
    initial_kyk_assessment: {
      situation_image_url: '/assets/k3/mfg-robot-hazard.webp',
      hazard_hotspots: [
        { x_percent: 65, y_percent: 40, is_hazard: true, feedback_text: 'Pekerja melompati pagar pembatas saat robot articulated arm bergerak cepat!' },
      ],
    },
    point_and_call_gate: {
      target_object_name: 'Gerbang Interlock Robot',
      confirmation_callout: 'インターロック施錠、ティーチングモードよし！ (Intaarokku seijou, tiichingu moudo yoshi!)',
      touch_duration_ms: 2000,
    },
    sbar_reporting_flow: {
      situation_prompt: 'Laporkan pelanggaran pagar pengaman robot las saat siklus otomatis berjalan.',
      background_prompt: 'Pekerja mengambil baut jatuh di dalam jangkauan lengan robot.',
      assessment_prompt: 'Robot berhenti otomatis karena tirai sensor trip, kondisi aman darurat.',
      recommendation_prompt: 'Lakukan konseling SOP keselamatan kerja dan reset sistem sesuai protokol.',
      expected_response_rubric: ['ロボット停止確認', '柵内立入禁止', '安全教育再実施', 'インターロック復帰'],
    },
    rousai_escalation_tier: 1,
  },

  // ── KLASTER 2: HOSPITALITY & FOOD (K3-10 s.d. K3-18) ──
  {
    scenario_id: 'K3-10',
    sector_code: 'SSW-FOOD-01',
    macro_cluster: 'hospitality_food',
    hazard_type: 'Lantai Dapur Restoran Licin Minyak (厨房床油滑倒)',
    ambient_noise_level: 'medium',
    initial_kyk_assessment: {
      situation_image_url: '/assets/k3/food-kitchen-slip.webp',
      hazard_hotspots: [
        { x_percent: 45, y_percent: 75, is_hazard: true, feedback_text: 'Genangan minyak sup tumpah belum diseka dan tidak ada papan peringatan!' },
        { x_percent: 30, y_percent: 85, is_hazard: true, feedback_text: 'Krew memakai sepatu kets santai bukan sepatu anti-selip dapur (コックシューズ)!' },
      ],
    },
    point_and_call_gate: {
      target_object_name: 'Papan Peringatan Lantai Basah & Sepatu Anti-Selip',
      confirmation_callout: '床清掃よし、耐滑靴着用よし！ (Yuka seisou yoshi, taikatsuka chakuyou yoshi!)',
      touch_duration_ms: 2000,
    },
    sbar_reporting_flow: {
      situation_prompt: 'Laporkan krew dapur terpeleset saat membawa panci kuah ramen panas.',
      background_prompt: 'Jam sibuk makan siang restoran ramen stasiun Shinjuku.',
      assessment_prompt: 'Krew mengalami nyeri pinggul memar dan kuah sedikit mengenai celemek.',
      recommendation_prompt: 'Ganti krew untuk istirahat, segera pel lantai dapur dengan detergen pengikis minyak.',
      expected_response_rubric: ['転倒事故', '油汚れ清掃', '耐滑靴確認', '応急手当'],
    },
    rousai_escalation_tier: 1,
  },
  {
    scenario_id: 'K3-11',
    sector_code: 'SSW-FOOD-02',
    macro_cluster: 'hospitality_food',
    hazard_type: 'Pisau Dapur Santoku Tergelincir Mengenai Jari (包丁誤切創)',
    ambient_noise_level: 'medium',
    initial_kyk_assessment: {
      situation_image_url: '/assets/k3/food-knife-hazard.webp',
      hazard_hotspots: [
        { x_percent: 50, y_percent: 50, is_hazard: true, feedback_text: 'Tangan kiri memegang bawang tanpa posisi melengkung cakar kucing (猫の手)!' },
      ],
    },
    point_and_call_gate: {
      target_object_name: 'Posisi Jari Tangan Kiri (Cakar Kucing)',
      confirmation_callout: '猫の手よし、包丁集中よし！ (Neko no te yoshi, houchou shuuchuu yoshi!)',
      touch_duration_ms: 2000,
    },
    sbar_reporting_flow: {
      situation_prompt: 'Laporkan luka sayat pisau pada ujung jari telunjuk krew prep dapur.',
      background_prompt: 'Pemotongan sayuran kol untuk garnir tonkatsu.',
      assessment_prompt: 'Darah merembes keluar, luka sayat sepanjang 1 cm.',
      recommendation_prompt: 'Tekan luka dengan kain kassa steril, pasang sarung jari kedap air biru (HACCP).',
      expected_response_rubric: ['圧迫止血', '絆創膏・指サック', '異物混入防止', '衛生手袋'],
    },
    rousai_escalation_tier: 1,
  },
  {
    scenario_id: 'K3-12',
    sector_code: 'SSW-FOOD-03',
    macro_cluster: 'hospitality_food',
    hazard_type: 'Minyak Panas Deep Fryer Meletup (フライヤー熱油飛散)',
    ambient_noise_level: 'medium',
    initial_kyk_assessment: {
      situation_image_url: '/assets/k3/food-fryer-hazard.webp',
      hazard_hotspots: [
        { x_percent: 55, y_percent: 50, is_hazard: true, feedback_text: 'Bahan beku berbutir es dimasukkan sekaligus ke minyak panas 180°C!' },
      ],
    },
    point_and_call_gate: {
      target_object_name: 'Keranjang Penggoreng & Suhu Minyak',
      confirmation_callout: '霜取り確認、油温180度よし！ (Shimo-tori kakunin, yuon hyaku-hachijuudo yoshi!)',
      touch_duration_ms: 2000,
    },
    sbar_reporting_flow: {
      situation_prompt: 'Laporkan percikan minyak panas mengenai pipi krew saat menggoreng ayam karaage.',
      background_prompt: 'Penggorengan deep fryer otomatis kapasitas 20 liter.',
      assessment_prompt: 'Kulit melepuh kemerahan tingkat 1 akibat uap minyak.',
      recommendation_prompt: 'Kompres dingin air es selama 20 menit dan oleskan salep luka bakar.',
      expected_response_rubric: ['冷却処置', '火傷対応', '水分除去', '油飛散防止'],
    },
    rousai_escalation_tier: 1,
  },
  {
    scenario_id: 'K3-13',
    sector_code: 'SSW-FOOD-04',
    macro_cluster: 'hospitality_food',
    hazard_type: 'Kontaminasi Silang Makanan Mentah & Alergen (食中毒交差汚染)',
    ambient_noise_level: 'low',
    initial_kyk_assessment: {
      situation_image_url: '/assets/k3/food-haccp-hazard.webp',
      hazard_hotspots: [
        { x_percent: 40, y_percent: 45, is_hazard: true, feedback_text: 'Talenan daging ayam mentah digunakan memotong buah salad tanpa dicuci!' },
      ],
    },
    point_and_call_gate: {
      target_object_name: 'Kode Warna Talenan HACCP',
      confirmation_callout: 'まな板色分け確認、殺菌よし！ (Manaita irowake kakunin, sakkin yoshi!)',
      touch_duration_ms: 2000,
    },
    sbar_reporting_flow: {
      situation_prompt: 'Laporkan salah penggunaan pisau daging mentah untuk memotong sashimi.',
      background_prompt: 'Persiapan menu makan malam hotel berbintang.',
      assessment_prompt: 'Risiko kontaminasi kuman Salmonella dan Campylobacter pada sashimi.',
      recommendation_prompt: 'Buang produk yang terkontaminasi dan lakukan sanitasi alkohol 70% pada seluruh meja kerja.',
      expected_response_rubric: ['交差汚染防止', '食材廃棄', 'アルコール殺菌', '衛生マニュアル遵守'],
    },
    rousai_escalation_tier: 1,
  },
  {
    scenario_id: 'K3-14',
    sector_code: 'SSW-FOOD-05',
    macro_cluster: 'hospitality_food',
    hazard_type: 'Kebakaran Kompor Gas Restoran (厨房ガスレンジ火災)',
    ambient_noise_level: 'high_industrial',
    initial_kyk_assessment: {
      situation_image_url: '/assets/k3/food-gas-fire.webp',
      hazard_hotspots: [
        { x_percent: 50, y_percent: 50, is_hazard: true, feedback_text: 'Minyak di wajan terbakar dan menyentuh cerobong hood ventilasi berminyak tebal!' },
      ],
    },
    point_and_call_gate: {
      target_object_name: 'Katup Gas Utama & APAR K-Class',
      confirmation_callout: 'ガス元栓閉止、初期消火よし！ (Gasu motoshen heishi, shoki shouka yoshi!)',
      touch_duration_ms: 2000,
    },
    sbar_reporting_flow: {
      situation_prompt: 'Laporkan wajan penggorengan terbakar di stasiun tumis wok.',
      background_prompt: 'Krew meninggalkan wajan dengan api menyala tanpa pengawasan selama 3 menit.',
      assessment_prompt: 'Api membubung setinggi 1 meter mendekati filter knalpot exhaust.',
      recommendation_prompt: 'Tutup wajan dengan kain basah atau gunakan pemadam khusus dapur, tutup katup gas.',
      expected_response_rubric: ['ガス元栓遮断', '消火器放射', '換気扇停止', '119番準備'],
    },
    rousai_escalation_tier: 2,
  },
  {
    scenario_id: 'K3-15',
    sector_code: 'SSW-FOOD-06',
    macro_cluster: 'hospitality_food',
    hazard_type: 'Mesin Pengiris Daging Slicer Menjepit Jari (ミートスライサー指切創)',
    ambient_noise_level: 'medium',
    initial_kyk_assessment: {
      situation_image_url: '/assets/k3/food-slicer-hazard.webp',
      hazard_hotspots: [
        { x_percent: 55, y_percent: 55, is_hazard: true, feedback_text: 'Mendorong sisa daging dengan jari tangan langsung tanpa alat pendorong plastik!' },
      ],
    },
    point_and_call_gate: {
      target_object_name: 'Pendorong Daging (押さえ具)',
      confirmation_callout: 'プッシャー使用、刃部安全よし！ (Pusshaa shiyou, ha-bu anzen yoshi!)',
      touch_duration_ms: 2000,
    },
    sbar_reporting_flow: {
      situation_prompt: 'Laporkan jari tergores pisau bundar meat slicer saat membersihkan mesin.',
      background_prompt: 'Pembersihan akhir shift di bagian dapur butchery.',
      assessment_prompt: 'Kabel colokan mesin belum dicabut saat piringan pisau dilap.',
      recommendation_prompt: 'Cabut stopkontak seketika, obati luka dan pasang pelindung pisau pelat.',
      expected_response_rubric: ['プラグ抜去', '清掃時停止', '刃先注意', '止血処置'],
    },
    rousai_escalation_tier: 2,
  },
  {
    scenario_id: 'K3-16',
    sector_code: 'SSW-FOOD-07',
    macro_cluster: 'hospitality_food',
    hazard_type: 'Pecahan Gelas Beling Jatuh ke Bak Es Konsumsi (割れガラス混入)',
    ambient_noise_level: 'medium',
    initial_kyk_assessment: {
      situation_image_url: '/assets/k3/food-glass-hazard.webp',
      hazard_hotspots: [
        { x_percent: 50, y_percent: 60, is_hazard: true, feedback_text: 'Gelas bir pecah tepat di atas mesin penampung es batu (アイスディスペンサー)!' },
      ],
    },
    point_and_call_gate: {
      target_object_name: 'Penampung Es Batu Konsumsi',
      confirmation_callout: '製氷機停止、全氷廃棄よし！ (Seihyouki teishi, zenpyou haiki yoshi!)',
      touch_duration_ms: 2000,
    },
    sbar_reporting_flow: {
      situation_prompt: 'Laporkan insiden pecahan kaca masuk ke dalam bin es batu bar minuman.',
      background_prompt: 'Staf pelayan menabrak baki minuman saat mengantar pesanan.',
      assessment_prompt: 'Pecahan kaca berukuran milimeter sulit dibedakan dari es batu bening.',
      recommendation_prompt: 'Kosongkan seluruh es di dalam bin, cuci bersih dan bilas sebelum diisi es baru.',
      expected_response_rubric: ['全氷破棄', 'ガラス片除去', '製氷機洗浄', '異物混入完全防止'],
    },
    rousai_escalation_tier: 1,
  },
  {
    scenario_id: 'K3-17',
    sector_code: 'SSW-HOSP-01',
    macro_cluster: 'hospitality_food',
    hazard_type: 'Tangga Evakuasi Darurat Hotel Terhalang Koper (非常階段荷物閉塞)',
    ambient_noise_level: 'low',
    initial_kyk_assessment: {
      situation_image_url: '/assets/k3/hosp-stairs-hazard.webp',
      hazard_hotspots: [
        { x_percent: 45, y_percent: 65, is_hazard: true, feedback_text: 'Tumpukan sprei kotor dan koper tamu menumpuk di depan pintu darurat kebakaran!' },
      ],
    },
    point_and_call_gate: {
      target_object_name: 'Pintu Darurat Kebakaran (非常口)',
      confirmation_callout: '避難経路確保、障害物なしよし！ (Hinan keiro kakuho, shougaibutsu nashi yoshi!)',
      touch_duration_ms: 2000,
    },
    sbar_reporting_flow: {
      situation_prompt: 'Laporkan jalur evakuasi lantai 4 hotel terhalang troli linen housekeeping.',
      background_prompt: 'Pemeriksaan rutin keselamatan kebakaran gedung perhotelan.',
      assessment_prompt: 'Jika terjadi gempa atau kebakaran, tamu tidak dapat membuka pintu darurat.',
      recommendation_prompt: 'Pindahkan troli segera ke ruang gudang tertutup dan bersihkan lorong.',
      expected_response_rubric: ['避難通路確保', '障害物撤去', '消防法遵守', '館内巡回報告'],
    },
    rousai_escalation_tier: 1,
  },
  {
    scenario_id: 'K3-18',
    sector_code: 'SSW-CLEAN-01',
    macro_cluster: 'hospitality_food',
    hazard_type: 'Percampuran Kimia Pemutih Klorin & Pembersih Asam (塩素系と酸性の混合有毒ガス)',
    ambient_noise_level: 'low',
    initial_kyk_assessment: {
      situation_image_url: '/assets/k3/clean-chemical-hazard.webp',
      hazard_hotspots: [
        { x_percent: 40, y_percent: 55, is_hazard: true, feedback_text: 'Cairan klorin (bleach) dicampur langsung dengan asam pembersih kerak toilet!' },
      ],
    },
    point_and_call_gate: {
      target_object_name: 'Label "MAZARU NA KIKEN" (混ぜるな危険)',
      confirmation_callout: '混ぜるな危険確認、換気ファン作動よし！ (Mazeru na kiken kakunin, kanki fan sadou yoshi!)',
      touch_duration_ms: 2000,
    },
    sbar_reporting_flow: {
      situation_prompt: 'Laporkan terbentuknya asap gas klorin beracun di toilet lantai 2.',
      background_prompt: 'Pekerja kebersihan mencampur pembersih asam dan pemutih klorin.',
      assessment_prompt: 'Gas klorin menyesakkan nafas dan memicu batuk akut pada staf.',
      recommendation_prompt: 'Evakuasi seluruh orang dari toilet, nyalakan exhaust fan, hubungi supervisor.',
      expected_response_rubric: ['有毒ガス発生', '即時避難', '換気扇最大', '救護要請'],
    },
    rousai_escalation_tier: 3,
  },

  // ── KLASTER 3: AGRICULTURE & MARITIME (K3-19 s.d. K3-27) ──
  {
    scenario_id: 'K3-19',
    sector_code: 'SSW-AGRI-01',
    macro_cluster: 'agriculture_maritime',
    hazard_type: 'Traktor Sawah Terbalik di Pematang Curam (トラクター横転)',
    ambient_noise_level: 'high_industrial',
    initial_kyk_assessment: {
      situation_image_url: '/assets/k3/agri-tractor-hazard.webp',
      hazard_hotspots: [
        { x_percent: 50, y_percent: 60, is_hazard: true, feedback_text: 'Roda traktor berada di tepi tebing pematang rapuh tanpa sabuk ROPS!' },
      ],
    },
    point_and_call_gate: {
      target_object_name: 'Kerangka Pengaman ROPS & Sabuk Pengaman',
      confirmation_callout: '安全フレームよし、シートベルト着用よし！ (Anzen fureemu yoshi, shiito beruto chakuyou yoshi!)',
      touch_duration_ms: 2000,
    },
    sbar_reporting_flow: {
      situation_prompt: 'Laporkan traktor roda empat miring terperosok ke parit sawah.',
      background_prompt: 'Pengolahan tanah sawah padi terasering di lereng perbukitan.',
      assessment_prompt: 'Operator terlempar aman namun traktor dalam risiko terguling terbalik.',
      recommendation_prompt: 'Matikan mesin segera, jangan ditarik sembarangan, pasang pengganjal roda.',
      expected_response_rubric: ['エンジン停止', '牽引準備', '傾斜地作業注意', '安全ベルト確認'],
    },
    rousai_escalation_tier: 2,
  },
  {
    scenario_id: 'K3-20',
    sector_code: 'SSW-AGRI-02',
    macro_cluster: 'agriculture_maritime',
    hazard_type: 'Keracunan Gas Pestisida di Rumah Kaca (農薬散布中毒)',
    ambient_noise_level: 'low',
    initial_kyk_assessment: {
      situation_image_url: '/assets/k3/agri-pesticide-hazard.webp',
      hazard_hotspots: [
        { x_percent: 45, y_percent: 45, is_hazard: true, feedback_text: 'Pekerja menyemprot insektisida organofosfat hanya mengenakan masker kain biasa!' },
      ],
    },
    point_and_call_gate: {
      target_object_name: 'Masker Respirator Gas Kimia (防毒マスク)',
      confirmation_callout: '防毒マスク密着よし、手袋よし！ (Boudoku masuku mitchaku yoshi, tebukuro yoshi!)',
      touch_duration_ms: 2000,
    },
    sbar_reporting_flow: {
      situation_prompt: 'Laporkan pekerja pusing dan mual setelah 1 jam menyemprot pestisida tomat.',
      background_prompt: 'Penyemprotan di dalam greenhouse tertutup bersuhu 32°C.',
      assessment_prompt: 'Diduga gejala awal intoksikasi uap pestisida organofosfat.',
      recommendation_prompt: 'Bawa korban ke udara segar, lepas pakaian terkontaminasi, bilas tubuh, hubungi dokter.',
      expected_response_rubric: ['新鮮な空気の場所へ', '衣服脱衣・洗浄', '医師の診察', '農薬安全データシート'],
    },
    rousai_escalation_tier: 2,
  },
  {
    scenario_id: 'K3-21',
    sector_code: 'SSW-AGRI-03',
    macro_cluster: 'agriculture_maritime',
    hazard_type: 'Heatstroke Ekstrem / Necchoushou di Greenhouse (ビニールハウス熱中症)',
    ambient_noise_level: 'low',
    initial_kyk_assessment: {
      situation_image_url: '/assets/k3/agri-heatstroke-hazard.webp',
      hazard_hotspots: [
        { x_percent: 50, y_percent: 65, is_hazard: true, feedback_text: 'Suhu ruangan mencapai 38°C dan pekerja tidak beristirahat minum air garam selama 3 jam!' },
      ],
    },
    point_and_call_gate: {
      target_object_name: 'Termometer WBGT & Tempat Air Minum',
      confirmation_callout: 'WBGT確認、水分補給よし！ (WBGT kakunin, suibun hokyuu yoshi!)',
      touch_duration_ms: 2000,
    },
    sbar_reporting_flow: {
      situation_prompt: 'Laporkan rekan kerja limbung pingsan di dalam greenhouse stroberi.',
      background_prompt: 'Panen musim panas siang hari dengan indeks bahaya panas sangat tinggi.',
      assessment_prompt: 'Korban tidak sadarkan diri, kulit terasa panas dan kering (Heatstroke Derajat 3).',
      recommendation_prompt: 'Panggil ambulans 119 segera, basahi tubuh dengan air es, dan kipasi korban.',
      expected_response_rubric: ['119番通報', '身体冷却', '日陰へ移動', '塩分水分補給'],
    },
    rousai_escalation_tier: 3,
  },
  {
    scenario_id: 'K3-22',
    sector_code: 'SSW-AGRI-04',
    macro_cluster: 'agriculture_maritime',
    hazard_type: 'Mesin Pemotong Rumput Brush Cutter Terpental Batu (草刈機小石飛散)',
    ambient_noise_level: 'high_industrial',
    initial_kyk_assessment: {
      situation_image_url: '/assets/k3/agri-cutter-hazard.webp',
      hazard_hotspots: [
        { x_percent: 50, y_percent: 70, is_hazard: true, feedback_text: 'Pelindung pisau potong rumput (飛散防護カバー) dilepas dan tidak ada kacamata pelindung!' },
      ],
    },
    point_and_call_gate: {
      target_object_name: 'Pelindung Pisau & Kacamata Pelindung Wajah',
      confirmation_callout: '防護カバー装着、周囲半径5mよし！ (Bougo kabaa souchaku, shuui hankei gomettoru yoshi!)',
      touch_duration_ms: 2000,
    },
    sbar_reporting_flow: {
      situation_prompt: 'Laporkan batu terpental mengenai betis pekerja lain dari jarak 3 meter.',
      background_prompt: 'Pembersihan rumput liar di kebun apel.',
      assessment_prompt: 'Luka memar bengkak pada tulang kering korban.',
      recommendation_prompt: 'Hentikan mesin pemotong, kompres dingin betis, dan terapkan jarak aman 5 meter.',
      expected_response_rubric: ['草刈機停止', 'アイシング処置', '安全距離確保', '飛散防止カバー点検'],
    },
    rousai_escalation_tier: 1,
  },
  {
    scenario_id: 'K3-23',
    sector_code: 'SSW-FISH-01',
    macro_cluster: 'agriculture_maritime',
    hazard_type: 'Jatuh ke Laut dari Kapal Penangkap Ikan (漁船海中転落)',
    ambient_noise_level: 'high_industrial',
    initial_kyk_assessment: {
      situation_image_url: '/assets/k3/fish-man-overboard.webp',
      hazard_hotspots: [
        { x_percent: 45, y_percent: 50, is_hazard: true, feedback_text: 'ABK bekerja di pinggir dek berombak tanpa mengenakan jaket pelampung (ライフジャケット)!' },
      ],
    },
    point_and_call_gate: {
      target_object_name: 'Jaket Pelampung Otomatis (救命胴衣)',
      confirmation_callout: '救命胴衣着用確認、甲板よし！ (Kyuumei doui chakuyou kakunin, kanpan yoshi!)',
      touch_duration_ms: 2000,
    },
    sbar_reporting_flow: {
      situation_prompt: 'Teriakkan "Man Overboard" saat melihat ABK tercebur ke laut lepas.',
      background_prompt: 'Kapal penangkap cumi-cumi beroperasi di perairan lepas pantai Hokkaido.',
      assessment_prompt: 'Korban terlihat mengapung pada jarak 20 meter di buritan kapal.',
      recommendation_prompt: 'Lempar pelampung ban keselamatan segera, teriak ke nakhoda untuk putar kemudi.',
      expected_response_rubric: ['人命救助', '浮き輪投下', '船長へ報告', '機関停止・旋回'],
    },
    rousai_escalation_tier: 4,
  },
  {
    scenario_id: 'K3-24',
    sector_code: 'SSW-FISH-02',
    macro_cluster: 'agriculture_maritime',
    hazard_type: 'Tangan Terseret Katrol Winch Jaring Kapal (巻き上げウィンチ巻き込まれ)',
    ambient_noise_level: 'high_industrial',
    initial_kyk_assessment: {
      situation_image_url: '/assets/k3/fish-winch-hazard.webp',
      hazard_hotspots: [
        { x_percent: 55, y_percent: 60, is_hazard: true, feedback_text: 'Tali tambang jaring melilit tangan ABK di drum winch penarik hidrolik!' },
      ],
    },
    point_and_call_gate: {
      target_object_name: 'Tuas Stop Winch Kapal',
      confirmation_callout: 'ウィンチ停止レバー確認、足元よし！ (Winchi teishi rebaa kakunin, ashimoto yoshi!)',
      touch_duration_ms: 2000,
    },
    sbar_reporting_flow: {
      situation_prompt: 'Laporkan lengan ABK terseret putaran drum jaring ikan.',
      background_prompt: 'Pengangkatan jaring pukat dasar di tengah laut.',
      assessment_prompt: 'Winch sudah dihentikan manual, lengan kanan korban mengalami dislokasi dan memar parah.',
      recommendation_prompt: 'Beri pertolongan pertama pembidaian darurat, minta nakhoda berlayar ke pelabuhan terdekat.',
      expected_response_rubric: ['ウィンチ即時停止', '副木固定', '緊急入港要請', '海上保安庁連絡'],
    },
    rousai_escalation_tier: 3,
  },
  {
    scenario_id: 'K3-25',
    sector_code: 'SSW-FOREST-01',
    macro_cluster: 'agriculture_maritime',
    hazard_type: 'Penebangan Pohon Chainsaw Kickback (チェーンソーキックバック)',
    ambient_noise_level: 'high_industrial',
    initial_kyk_assessment: {
      situation_image_url: '/assets/k3/forest-chainsaw-hazard.webp',
      hazard_hotspots: [
        { x_percent: 50, y_percent: 50, is_hazard: true, feedback_text: 'Ujung bilah gergaji mesin (nose) menyentuh kayu lain memicu lentingan ke arah dada!' },
      ],
    },
    point_and_call_gate: {
      target_object_name: 'Rem Rantai Chainsaw (チェンブレーキ)',
      confirmation_callout: 'チェンブレーキ作動、防護服着用よし！ (Chen bureeki sadou, bougofuku chakuyou yoshi!)',
      touch_duration_ms: 2000,
    },
    sbar_reporting_flow: {
      situation_prompt: 'Laporkan kejadian hentakan balik gergaji mesin saat memotong dahan kayu pinus.',
      background_prompt: 'Pembersihan hutan lindung di area lereng pegunungan Nagano.',
      assessment_prompt: 'Bilah tertahan oleh celana pelindung anti-sayat (chaps), pekerja tidak luka.',
      recommendation_prompt: 'Ganti celana pelindung yang seratnya robek dan evaluasi sudut pemotongan.',
      expected_response_rubric: ['防護ズボン確認', 'キックバック防止', 'チェンソー点検', 'ヒヤリハット記録'],
    },
    rousai_escalation_tier: 1,
  },
  {
    scenario_id: 'K3-26',
    sector_code: 'SSW-FOREST-02',
    macro_cluster: 'agriculture_maritime',
    hazard_type: 'Batang Kayu Gelondongan Meluncur di Lereng (丸太荷崩れ)',
    ambient_noise_level: 'high_industrial',
    initial_kyk_assessment: {
      situation_image_url: '/assets/k3/forest-log-slide.webp',
      hazard_hotspots: [
        { x_percent: 45, y_percent: 55, is_hazard: true, feedback_text: 'Balok kayu gelondongan cedar bertumpuk tanpa pasak penahan di kemiringan 25 derajat!' },
      ],
    },
    point_and_call_gate: {
      target_object_name: 'Pasak Pengganjal Balok Kayu (車止め・輪留め)',
      confirmation_callout: '止め木確認、退避場所よし！ (Tomegi kakunin, taihi basho yoshi!)',
      touch_duration_ms: 2000,
    },
    sbar_reporting_flow: {
      situation_prompt: 'Teriakkan aba-aba bahaya saat gelondongan kayu terlepas meluncur ke bawah.',
      background_prompt: 'Pemuatan kayu ke truk log di lereng hutan tebang.',
      assessment_prompt: 'Pekerja di bawah berhasil melompat ke zona aman di balik pohon pelindung.',
      recommendation_prompt: 'Pasang kawat penahan seling ganda sebelum memuat kayu berikutnya.',
      expected_response_rubric: ['荷崩れ警報', '安全退避', 'ワイヤー固定確認', '玉掛け作業見直し'],
    },
    rousai_escalation_tier: 1,
  },
  {
    scenario_id: 'K3-27',
    sector_code: 'SSW-AGRI-05',
    macro_cluster: 'agriculture_maritime',
    hazard_type: 'Keracunan Gas Hidrogen Sulfida di Bak Kompos Ternak (堆肥ピット硫化水素ガス)',
    ambient_noise_level: 'low',
    initial_kyk_assessment: {
      situation_image_url: '/assets/k3/agri-manure-gas.webp',
      hazard_hotspots: [
        { x_percent: 50, y_percent: 70, is_hazard: true, feedback_text: 'Pekerja turun ke dalam bak bawah tanah penampungan kotoran sapi tanpa ventilasi paksa!' },
      ],
    },
    point_and_call_gate: {
      target_object_name: 'Detektor Gas Beracun O2/H2S',
      confirmation_callout: '酸素濃度21％、硫化水素ゼロ、よし！ (Sanso noudo nijuuichi-paasento, ryuukasuiso zero, yoshi!)',
      touch_duration_ms: 2000,
    },
    sbar_reporting_flow: {
      situation_prompt: 'Laporkan rekan kerja lemas pingsan di dasar bak penampung limbah peternakan.',
      background_prompt: 'Pembersihan endapan kotoran ternak bawah tanah.',
      assessment_prompt: 'Terindikasi kekurangan oksigen dan penumpukan gas H2S beracun mematikan.',
      recommendation_prompt: 'JANGAN masuk menolong tanpa SCBA! Hubungi 119 dan pasang blower angin darurat.',
      expected_response_rubric: ['酸素欠乏症', '無謀な救助禁止', '送風機作動', '119番特急通報'],
    },
    rousai_escalation_tier: 4,
  },

  // ── KLASTER 4: INFRASTRUCTURE & LOGISTICS (K3-28 s.d. K3-36) ──
  {
    scenario_id: 'K3-28',
    sector_code: 'SSW-CONST-01',
    macro_cluster: 'infrastructure_logistics',
    hazard_type: 'Jatuh dari Ketinggian Steger Perancah (足場高所墜落)',
    ambient_noise_level: 'high_industrial',
    initial_kyk_assessment: {
      situation_image_url: '/assets/k3/const-scaffold-fall.webp',
      hazard_hotspots: [
        { x_percent: 50, y_percent: 35, is_hazard: true, feedback_text: 'Pekerja berdiri di papan perancah lantai 3 tanpa mengaitkan hook safety harness!' },
        { x_percent: 70, y_percent: 40, is_hazard: true, feedback_text: 'Palang pengaman tengah (中桟) pada perancah belum dipasang!' },
      ],
    },
    point_and_call_gate: {
      target_object_name: 'Kait Safety Harness (フルハーネスフック)',
      confirmation_callout: 'ハーネスフック掛けよし、足場板固定よし！ (Haanessu fukku kake yoshi, ashibaita kotei yoshi!)',
      touch_duration_ms: 2000,
    },
    sbar_reporting_flow: {
      situation_prompt: 'Laporkan pekerja jatuh tergantung pada tali keselamatan harness lantai 4.',
      background_prompt: 'Pekerjaan pemasangan rangka kaca fasad gedung bertingkat.',
      assessment_prompt: 'Harness menahan tubuh korban, korban dalam keadaan sadar tapi tergantung di udara.',
      recommendation_prompt: 'Turunkan gondola atau tangga penyelamat darurat segera sebelum terjadi trauma suspensi.',
      expected_response_rubric: ['ハーネスによる宙づり救出', '安全帯作動確認', '高所救助要請', '足場是正'],
    },
    rousai_escalation_tier: 3,
  },
  {
    scenario_id: 'K3-29',
    sector_code: 'SSW-CONST-02',
    macro_cluster: 'infrastructure_logistics',
    hazard_type: 'Runtuhnya Dinding Galian Tanah Tanah Longsor (掘削法面崩壊)',
    ambient_noise_level: 'high_industrial',
    initial_kyk_assessment: {
      situation_image_url: '/assets/k3/const-trench-hazard.webp',
      hazard_hotspots: [
        { x_percent: 50, y_percent: 60, is_hazard: true, feedback_text: 'Galian parit sedalam 2.5 meter tanpa penahan turap baja (土留め先行工法)!' },
      ],
    },
    point_and_call_gate: {
      target_object_name: 'Dinding Turap Penahan Tanah (土留め支保工)',
      confirmation_callout: '土留め支保工よし、クラックなしよし！ (Dodome shihokou yoshi, kurakku nashi yoshi!)',
      touch_duration_ms: 2000,
    },
    sbar_reporting_flow: {
      situation_prompt: 'Laporkan retakan selebar 5 cm pada bibir tanah galian saluran pipa.',
      background_prompt: 'Penggalian tanah setelah hujan lebat semalaman di distrik Saitama.',
      assessment_prompt: 'Dinding galian berpotensi longsor menimbun pekerja di dalam lubang.',
      recommendation_prompt: 'Perintahkan pekerja naik dari galian seketika dan pasang dinding penahan turap baja.',
      expected_response_rubric: ['掘削底退避', '土砂崩壊危険', '土留め補強', '作業中止指示'],
    },
    rousai_escalation_tier: 2,
  },
  {
    scenario_id: 'K3-30',
    sector_code: 'SSW-CONST-03',
    macro_cluster: 'infrastructure_logistics',
    hazard_type: 'Tertimpa Balok Beton Pracetak Crane (吊り荷落下直撃)',
    ambient_noise_level: 'high_industrial',
    initial_kyk_assessment: {
      situation_image_url: '/assets/k3/const-crane-hazard.webp',
      hazard_hotspots: [
        { x_percent: 50, y_percent: 50, is_hazard: true, feedback_text: 'Kabel pengangkat sling balok beton membentuk sudut sempit lebih dari 60 derajat!' },
      ],
    },
    point_and_call_gate: {
      target_object_name: 'Sudut Seling Crane & Zona Aman',
      confirmation_callout: '玉掛け角度60度以内、立入禁止よし！ (Tamagake kakudo rokujuudo inai, tachiiri kinshi yoshi!)',
      touch_duration_ms: 2000,
    },
    sbar_reporting_flow: {
      situation_prompt: 'Laporkan balok beton bergoyang liar tertiup angin kencang di ketinggian.',
      background_prompt: 'Pemasangan pilar jembatan tol layang dengan mobile crane 50 ton.',
      assessment_prompt: 'Kecepatan angin melebihi 10 m/detik (standar batas aman konstruksi Jepang).',
      recommendation_prompt: 'Hentikan pengangkatan sesuai regulasi tiupan angin kencang dan turunkan balok ke tanah.',
      expected_response_rubric: ['強風作業中止基準', 'クレーン作業中断', '吊り荷降下', '合図徹底'],
    },
    rousai_escalation_tier: 2,
  },
  {
    scenario_id: 'K3-31',
    sector_code: 'SSW-LOG-01',
    macro_cluster: 'infrastructure_logistics',
    hazard_type: 'Tabrakan Forklift di Blindspot Persimpangan Gudang (フォークリフト衝突)',
    ambient_noise_level: 'high_industrial',
    initial_kyk_assessment: {
      situation_image_url: '/assets/k3/log-forklift-hazard.webp',
      hazard_hotspots: [
        { x_percent: 60, y_percent: 50, is_hazard: true, feedback_text: 'Forklift melaju kencang membelok tanpa membunyikan klakson di tikungan cermin cembung!' },
        { x_percent: 35, y_percent: 65, is_hazard: true, feedback_text: 'Pekerja berjalan di tengah jalur lintas kendaraan bukan di pedestrian walk hijau!' },
      ],
    },
    point_and_call_gate: {
      target_object_name: 'Cermin Cembung & Klakson Forklift',
      confirmation_callout: 'カーブミラー一時停止、左右よし！ (Kaabu miraa ichiji teishi, sayuu yoshi!)',
      touch_duration_ms: 2000,
    },
    sbar_reporting_flow: {
      situation_prompt: 'Laporkan insiden nyaris tabrakan antara forklift dan staf picking di lorong C.',
      background_prompt: 'Operasi bongkar muat logistik ekspres barang e-commerce.',
      assessment_prompt: 'Muatan kardus terlalu tinggi menghalangi pandangan depan supir forklift.',
      recommendation_prompt: 'Wajibkan jalan mundur saat muatan tinggi dan pasang garis sensor penyeberangan.',
      expected_response_rubric: ['バック走行徹底', '一時停止確認', '歩車分離', 'ヒヤリハット報告提出'],
    },
    rousai_escalation_tier: 1,
  },
  {
    scenario_id: 'K3-32',
    sector_code: 'SSW-LOG-02',
    macro_cluster: 'infrastructure_logistics',
    hazard_type: 'Robohnya Susunan Palet Kardus Berat di Rak Tinggi (パレット荷崩れ)',
    ambient_noise_level: 'medium',
    initial_kyk_assessment: {
      situation_image_url: '/assets/k3/log-pallet-collapse.webp',
      hazard_hotspots: [
        { x_percent: 50, y_percent: 40, is_hazard: true, feedback_text: 'Palet kayu bagian bawah patah dan susunan dus miring tanpa wrapping plastik stretch film!' },
      ],
    },
    point_and_call_gate: {
      target_object_name: 'Plastik Wrapping & Kondisi Palet',
      confirmation_callout: 'ラップ巻きよし、荷崩れ防止よし！ (Rappu maki yoshi, nikuzure boushi yoshi!)',
      touch_duration_ms: 2000,
    },
    sbar_reporting_flow: {
      situation_prompt: 'Laporkan tumpukan karton air mineral di rak tingkat 3 gudang miring 15 derajat.',
      background_prompt: 'Penyimpanan stok logistik pusat distribusi minuman kemasan.',
      assessment_prompt: 'Karton berisiko ambruk menimpa koridor pekerja di bawahnya.',
      recommendation_prompt: 'Blokir koridor lorong segera dengan traffic cone dan turunkan palet dengan reach truck.',
      expected_response_rubric: ['荷崩れ防止処置', '通路立入禁止', 'パレット再積載', 'ストレッチフィルム補強'],
    },
    rousai_escalation_tier: 1,
  },
  {
    scenario_id: 'K3-33',
    sector_code: 'SSW-RAIL-01',
    macro_cluster: 'infrastructure_logistics',
    hazard_type: 'Kereta Cepat Melintas Saat Perawatan Sinyal Rel (線路内列車接近)',
    ambient_noise_level: 'high_industrial',
    initial_kyk_assessment: {
      situation_image_url: '/assets/k3/rail-train-approach.webp',
      hazard_hotspots: [
        { x_percent: 75, y_percent: 30, is_hazard: true, feedback_text: 'Kereta ekspres melaju di jalur 2 dan petugas pengawas bendera tidak membunyikan klakson peringatan!' },
      ],
    },
    point_and_call_gate: {
      target_object_name: 'Tempat Evakuasi Darurat Tepi Rel (待避所)',
      confirmation_callout: '列車接近！待避所へ退避よし！ (Ressha sekkin! Taihisho e taihi yoshi!)',
      touch_duration_ms: 2000,
    },
    sbar_reporting_flow: {
      situation_prompt: 'Bunyikan sirine darurat saat kereta komuter mendekati area penggantian bantalan rel.',
      background_prompt: 'Pekerjaan track maintenance pada jeda jadwal kereta.',
      assessment_prompt: 'Seluruh pekerja harus berada di luar batas ruang bebas kereta dalam 15 detik.',
      recommendation_prompt: 'Semua pekerja jongkok menghadap arah kereta di area待避所 sambil berpegangan kokoh.',
      expected_response_rubric: ['列車見張員合図', '待避所退避完了', '指差呼称確認', '安全姿勢保持'],
    },
    rousai_escalation_tier: 2,
  },
  {
    scenario_id: 'K3-34',
    sector_code: 'SSW-AVI-01',
    macro_cluster: 'infrastructure_logistics',
    hazard_type: 'Area Bahaya Hisapan Mesin Jet Pesawat di Apron (ジェットエンジン吸気圏侵入)',
    ambient_noise_level: 'high_industrial',
    initial_kyk_assessment: {
      situation_image_url: '/assets/k3/avi-jet-intake.webp',
      hazard_hotspots: [
        { x_percent: 50, y_percent: 50, is_hazard: true, feedback_text: 'Pekerja ground handling mendekati bagian depan mesin turbofan yang masih menyala (Anti-Collision Light berkedip)!' },
      ],
    },
    point_and_call_gate: {
      target_object_name: 'Lampu Anti-Collision & Batas Bahaya Intake Mesin',
      confirmation_callout: 'エンジン停止確認、安全圏よし！ (Enjin teishi kakunin, anzenken yoshi!)',
      touch_duration_ms: 2000,
    },
    sbar_reporting_flow: {
      situation_prompt: 'Laporkan kendaraan bagasi kargo melintas terlalu dekat dengan intake mesin Boeing 777.',
      background_prompt: 'Pelayanan ground service saat pesawat baru saja parkir di gate 12.',
      assessment_prompt: 'Daya hisap jet berisiko menelan benda asing (FOD) dan operator kendaraan.',
      recommendation_prompt: 'Terapkan perimeter 7.5 meter di depan mesin sampai beacon light padam total.',
      expected_response_rubric: ['ジェット吸気危険圏', 'アンチコリジョンライト消灯待ち', 'FOD防止', '進入禁止徹底'],
    },
    rousai_escalation_tier: 2,
  },
  {
    scenario_id: 'K3-35',
    sector_code: 'SSW-KAIGO-01',
    macro_cluster: 'infrastructure_logistics',
    hazard_type: 'Residen Lansia Terpeleset Saat Pindah ke Kursi Roda (車椅子移乗時転倒)',
    ambient_noise_level: 'low',
    initial_kyk_assessment: {
      situation_image_url: '/assets/k3/kaigo-wheelchair-fall.webp',
      hazard_hotspots: [
        { x_percent: 50, y_percent: 60, is_hazard: true, feedback_text: 'Rem kursi roda (ブレーキ) belum dikunci dan pijakan kaki (フットサポート) belum dilipat ke atas!' },
      ],
    },
    point_and_call_gate: {
      target_object_name: 'Tuas Rem Kursi Roda & Pijakan Kaki',
      confirmation_callout: '車椅子ブレーキよし、フットレスト上げよし！ (Kurumaisu bureeki yoshi, futtoresto age yoshi!)',
      touch_duration_ms: 2000,
    },
    sbar_reporting_flow: {
      situation_prompt: 'Laporkan lansia Ibu Sato kehilangan keseimbangan saat berdiri dari tempat tidur.',
      background_prompt: 'Protokol transfer pagi hari dari kasur ke kursi roda di panti wreda Sakura.',
      assessment_prompt: 'Caregiver berhasil merangkul pinggang residen, tidak ada benturan kepala.',
      recommendation_prompt: 'Kunci rem kursi roda, periksa tekanan darah residen, dan catat di log asuhan keperawatan.',
      expected_response_rubric: ['声かけ実施', '車椅子ブレーキロック', 'バイタルチェック', '介護記録記入'],
    },
    rousai_escalation_tier: 1,
  },
  {
    scenario_id: 'K3-36',
    sector_code: 'SSW-KAIGO-02',
    macro_cluster: 'infrastructure_logistics',
    hazard_type: 'Residen Lansia Tersedak Makanan / Goyen Asfiksia (食事中誤嚥・窒息)',
    ambient_noise_level: 'low',
    initial_kyk_assessment: {
      situation_image_url: '/assets/k3/kaigo-choking-hazard.webp',
      hazard_hotspots: [
        { x_percent: 45, y_percent: 40, is_hazard: true, feedback_text: 'Lansia makan sambil menengadah dengan posisi bantal terlalu rendah (sudut leher tidak fleksi)!' },
      ],
    },
    point_and_call_gate: {
      target_object_name: 'Posisi Duduk Leher Menunduk (軽度前屈位)',
      confirmation_callout: '姿勢確認、とろみよし！ (Shisei kakunin, toromi yoshi!)',
      touch_duration_ms: 2000,
    },
    sbar_reporting_flow: {
      situation_prompt: 'Laporkan Bapak Tanaka batuk tersedak kuat dan bibir mulai sianosis kebiruan saat makan siang.',
      background_prompt: 'Makan menu pure daging dengan pengental toromi di ruang makan bersama.',
      assessment_prompt: 'Terindikasi sumbatan jalan nafas oleh bolus makanan (Goyen - 誤嚥).',
      recommendation_prompt: 'Lakukan tepukan punggung (背部叩打法) dan manuver Heimlich segera, panggil perawat jaga.',
      expected_response_rubric: ['背部叩打法', '看護師緊急コール', '吸引器準備', '窒息解除初期対応'],
    },
    rousai_escalation_tier: 4,
  },
];

// ══════════════════════════════════════════════════════════════════
//  Helper Queries & Gate Validation Utilities
// ══════════════════════════════════════════════════════════════════

export function getK3ScenarioById(id: string): K3DisasterScenario | undefined {
  if (!id) return undefined;
  return K3_DISASTER_SCENARIOS.find((s) => s.scenario_id.toUpperCase() === id.toUpperCase());
}

export function getK3ScenariosByCluster(
  cluster: 'manufacturing' | 'hospitality_food' | 'agriculture_maritime' | 'infrastructure_logistics'
): K3DisasterScenario[] {
  return K3_DISASTER_SCENARIOS.filter((s) => s.macro_cluster === cluster);
}

export function getK3CommandsByCategory(category: string): K3Command[] {
  return OFFICIAL_K3_COMMANDS.filter((c) => c.category === category);
}

/**
 * Validasi tactile gate Point-and-Call (Shisa Kanko)
 * Mengharuskan penekanan tombol/layar stabil minimal 2000ms untuk meniru sentuhan fokus tunjuk-sebut
 */
export function validatePointAndCallTouch(holdDurationMs: number, targetMs = 2000): boolean {
  if (typeof holdDurationMs !== 'number' || isNaN(holdDurationMs) || holdDurationMs < 0) {
    return false;
  }
  return holdDurationMs >= targetMs;
}

/**
 * Evaluasi pelaporan SBAR (Situation, Background, Assessment, Recommendation)
 * Memverifikasi kecocokan kata kunci esensial terhadap expected_response_rubric
 */
export function evaluateSbarResponse(
  userText: string,
  rubric: string[]
): { score: number; passed: boolean; matchedRubrics: string[]; missingRubrics: string[]; feedback: string } {
  if (!userText || typeof userText !== 'string' || !Array.isArray(rubric) || rubric.length === 0) {
    return {
      score: 0,
      passed: false,
      matchedRubrics: [],
      missingRubrics: Array.isArray(rubric) ? rubric : [],
      feedback: 'Laporan SBAR kosong atau tidak valid.',
    };
  }

  const cleanText = userText.toLowerCase();
  const matchedRubrics: string[] = [];
  const missingRubrics: string[] = [];

  rubric.forEach((item) => {
    const cleanItem = item.toLowerCase();
    if (cleanText.includes(cleanItem)) {
      matchedRubrics.push(item);
    } else {
      missingRubrics.push(item);
    }
  });

  const ratio = matchedRubrics.length / rubric.length;
  const score = Math.round(ratio * 100);
  const passed = ratio >= 0.5; // Minimal 50% rubrik terpenuhi untuk lolos evaluasi gemba

  let feedback = '';
  if (ratio >= 0.8) {
    feedback = 'Laporan SBAR sempurna dan komprehensif sesuai protokol JNIOSH & MHLW!';
  } else if (ratio >= 0.5) {
    feedback = `Laporan SBAR cukup baik (${score}%), namun lengkapi unsur penting: ${missingRubrics.join(', ')}.`;
  } else {
    feedback = `Laporan SBAR kurang lengkap. Unsur kritis berikut belum dilaporkan: ${missingRubrics.join(', ')}.`;
  }

  return {
    score,
    passed,
    matchedRubrics,
    missingRubrics,
    feedback,
  };
}
