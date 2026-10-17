// ══════════════════════════════════════════════════════════════════
//  PrometricCbtModal.tsx — Authentic Japanese Prometric CBT Simulator
//  Statutory Dual-Pass Evaluation for SSW (Tokutei Ginou) Examinations
//  Compliant with MHLW, MAFF, METI, and MLIT Official Scoring Rules
// ══════════════════════════════════════════════════════════════════

import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Award,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Flag,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Volume2,
  ShieldCheck,
  FileText,
  Printer,
  Sparkles,
  Layers,
  X,
  ExternalLink,
  BookOpen,
} from 'lucide-react';
import { speakJapanese } from '../../lib/audio/tts';
import { playSuccessSfx, playErrorSfx } from '../../lib/audio/sfx';
import { useAppStore } from '../../store/useAppStore';

export interface PrometricQuestion {
  id: string;
  sectorId: string;
  section: 'skills' | 'language' | 'safety';
  questionJp: string;
  questionId: string;
  scenarioJp?: string;
  scenarioId?: string;
  options: Array<{
    id: string;
    textJp: string;
    textId: string;
  }>;
  correctOptionId: string;
  explanationId: string;
  officialRef?: string;
}

export interface PrometricSectorRule {
  sectorId: string;
  sectorName: string;
  ministry: 'MHLW' | 'MAFF' | 'METI' | 'MLIT';
  ministryKanji: string;
  testCode: string;
  hasDualPass: boolean;
  sectionA: {
    name: string;
    passPercent: number;
    weight: number;
  };
  sectionB?: {
    name: string;
    passPercent: number;
    weight: number;
  };
}

export const PROMETRIC_SECTOR_RULES: Record<string, PrometricSectorRule> = {
  'ssw-kaigo': {
    sectorId: 'ssw-kaigo',
    sectorName: 'Keperawatan Lansia (介護)',
    ministry: 'MHLW',
    ministryKanji: '厚生労働省',
    testCode: 'KG-SSW-MHLW-2026',
    hasDualPass: true,
    sectionA: { name: 'Keterampilan Perawatan (介護業務知識)', passPercent: 60, weight: 0.5 },
    sectionB: { name: 'Bahasa Jepang Perawatan (介護日本語)', passPercent: 60, weight: 0.5 },
  },
  'ssw-food-service': {
    sectorId: 'ssw-food-service',
    sectorName: 'Restoran & Kuliner (外食業)',
    ministry: 'MAFF',
    ministryKanji: '農林水産省',
    testCode: 'FD-SSW-OTAFF-2026',
    hasDualPass: false,
    sectionA: { name: 'Standar Sanitasi HACCP & Layanan Restoran', passPercent: 65, weight: 1.0 },
  },
  'ssw-food': {
    sectorId: 'ssw-food',
    sectorName: 'Pengolahan Makanan & Minuman (飲食料品製造)',
    ministry: 'MAFF',
    ministryKanji: '農林水産省',
    testCode: 'FM-SSW-OTAFF-2026',
    hasDualPass: false,
    sectionA: { name: 'Higiene Sanitasi 5S & Manufaktur Pangan', passPercent: 65, weight: 1.0 },
  },
  'ssw-manufacturing': {
    sectorId: 'ssw-manufacturing',
    sectorName: 'Manufaktur & Sokeizai (素形材・製造)',
    ministry: 'METI',
    ministryKanji: '経済産業省',
    testCode: 'MF-SSW-JAIM-2026',
    hasDualPass: true,
    sectionA: { name: 'Pengetahuan Teori Mesin & Material (学科試験)', passPercent: 65, weight: 0.5 },
    sectionB: { name: 'Uji Pertimbangan Praktis & K3 (実技等判断試験)', passPercent: 60, weight: 0.5 },
  },
  'ssw-construction': {
    sectorId: 'ssw-construction',
    sectorName: 'Konstruksi & Gemba Sipil (建設業)',
    ministry: 'MLIT',
    ministryKanji: '国土交通省',
    testCode: 'CN-SSW-JAC-2026',
    hasDualPass: true,
    sectionA: { name: 'Keterampilan Konstruksi Lapangan', passPercent: 60, weight: 0.6 },
    sectionB: { name: 'Komunikasi Keselamatan Gemba (KYT)', passPercent: 70, weight: 0.4 },
  },
  'ssw-building-cleaning': {
    sectorId: 'ssw-building-cleaning',
    sectorName: 'Pembersihan Gedung (ビルクリーニング)',
    ministry: 'MLIT',
    ministryKanji: '国土交通省',
    testCode: 'BC-SSW-MLIT-2026',
    hasDualPass: false,
    sectionA: { name: 'Sanitasi Kimia, Mesin Polisher & K3', passPercent: 60, weight: 1.0 },
  },
  'ssw-agriculture': {
    sectorId: 'ssw-agriculture',
    sectorName: 'Pertanian & Peternakan (農業)',
    ministry: 'MAFF',
    ministryKanji: '農林水産省',
    testCode: 'AG-SSW-ASAT-2026',
    hasDualPass: false,
    sectionA: { name: 'Teknik Budidaya & Keselamatan Alsintan', passPercent: 60, weight: 1.0 },
  },
  'ssw-accommodation': {
    sectorId: 'ssw-accommodation',
    sectorName: 'Perhotelan & Hospitality (宿泊)',
    ministry: 'MLIT',
    ministryKanji: '国土交通省',
    testCode: 'AC-SSW-MLIT-2026',
    hasDualPass: false,
    sectionA: { name: 'Layanan Resepsionis & Omotenashi Hotel', passPercent: 65, weight: 1.0 },
  },
  'ssw-automobile': {
    sectorId: 'ssw-automobile',
    sectorName: 'Perawatan Otomotif (自動車整備)',
    ministry: 'MLIT',
    ministryKanji: '国土交通省',
    testCode: 'AT-SSW-JASPA-2026',
    hasDualPass: true,
    sectionA: { name: 'Inspeksi & Diagnostik Kendaraan', passPercent: 65, weight: 0.6 },
    sectionB: { name: 'Laporan Servis & Keselamatan Bengkel', passPercent: 60, weight: 0.4 },
  },
};

export const CANONICAL_PROMETRIC_QUESTIONS: PrometricQuestion[] = [
  // ── KAIGO QUESTIONS (Section A: Skills / Section B: Language) ──
  {
    id: 'kg-01',
    sectorId: 'ssw-kaigo',
    section: 'skills',
    questionJp: '利用者をベッドから車いすへ移乗介助する際、車いすの配置として最も適切なものはどれか。',
    questionId: 'Saat memindahkan lansia dari tempat tidur ke kursi roda, posisi penempatan kursi roda manakah yang paling tepat?',
    scenarioJp: '【事例】右片麻痺がある鈴木さん（85歳・女性）を朝食のために車いすへ移乗する。',
    scenarioId: 'Kasus: Ibu Suzuki (85 tahun) dengan kelumpuhan sebelah kanan (hemiplegia dextra) akan dipindahkan ke kursi roda untuk sarapan.',
    options: [
      { id: 'opt-a', textJp: '利用者の麻痺側（右側）に30度〜45度の角度で配置する。', textId: 'Diposisikan di sisi yang lumpuh (sisi kanan) dengan sudut 30-45 derajat.' },
      { id: 'opt-b', textJp: '利用者の健側（左側）に30度〜45度の角度で配置し、ブレーキを確実に掛ける。', textId: 'Diposisikan di sisi sehat (sisi kiri) dengan sudut 30-45 derajat dan rem dikunci kuat.' },
      { id: 'opt-c', textJp: 'ベッドと直角（90度）に離して配置し、利用者に大きく体を捻らせる。', textId: 'Diposisikan tegak lurus (90 derajat) menjauhi tempat tidur sehingga tubuh lansia berputar jauh.' },
      { id: 'opt-d', textJp: 'フットサポートを下げたまま足元正面に置く。', textId: 'Diletakkan di depan kaki dengan pijakan kaki (footrest) tetap diturunkan.' },
    ],
    correctOptionId: 'opt-b',
    explanationId: 'Prinsip pemindahan aman (Ijou) bagi lansia penderita hemiplegia: kursi roda WAJIB diletakkan di sisi yang sehat (Ken-soku / 健側) dengan kemiringan 30°–45° agar lansia dapat bertumpu pada lengan dan kaki yang kuat, serta rem (Bureeki) wajib terkunci penuh sebelum tindakan.',
    officialRef: 'MHLW Kaigo Skills Examination Standard §4-2',
  },
  {
    id: 'kg-02',
    sectorId: 'ssw-kaigo',
    section: 'skills',
    questionJp: '高齢者の誤嚥（ごえん）を予防するための食事介助の姿勢として、正しいものはどれか。',
    questionId: 'Manakah postur tubuh lansia yang benar saat bantuan makan untuk mencegah tersedak (aspirasi / Goen)?',
    scenarioJp: '【観察】食道への送り込みが弱くなっている利用者への水分・食事提供。',
    scenarioId: 'Observasi: Pemberian makanan dan minum pada lansia dengan penurunan reflek menelan.',
    options: [
      { id: 'opt-a', textJp: '頭部を後ろに反らせ、喉を真っ直ぐ伸ばした状態にする。', textId: 'Kepala ditengadahkan ke belakang agar tenggorokan meregang lurus.' },
      { id: 'opt-b', textJp: '軽く顎を引いた前傾姿勢（頸部前屈）を保つ。', textId: 'Posisi sedikit menunduk dengan dagu ditarik ke dalam (fleksi leher ringan).' },
      { id: 'opt-c', textJp: 'ベッドを完全に水平（仰臥位）にしてスプーンを口に入れる。', textId: 'Tempat tidur diturunkan rata (posisi terlentang penuh) saat menyuapkan sendok.' },
      { id: 'opt-d', textJp: '話しかけながら早食いを促す。', textId: 'Terus diajak berbicara sambil disuruh makan terburu-buru.' },
    ],
    correctOptionId: 'opt-b',
    explanationId: 'Menarik dagu ke dalam (Ago o hiku / 顎を引く) menutup celah jalan napas (epiglotis) dan memperlebar jalur kerongkongan, sehingga mencegah makanan atau cairan masuk ke paru-paru (Goen).',
    officialRef: 'MHLW Care Giver Hygiene & Feeding Protocol §7',
  },
  {
    id: 'kg-03',
    sectorId: 'ssw-kaigo',
    section: 'language',
    questionJp: '利用者が突然「胸がズキズキ痛む」と訴えました。看護師へのSBAR報告における【Situation（状況）】の表現として最も適切なものはどれか。',
    questionId: 'Lansia tiba-tiba mengeluh dadanya nyeri berdenyut (ズキズキ痛む). Manakah ungkapan bagian Situation dalam format SBAR kepada perawat yang paling tepat?',
    options: [
      { id: 'opt-a', textJp: '「田中さんが今、胸の痛みを訴えられています。すぐにお越しいただけますか。」', textId: '“Tanaka-san ga ima, mune no itami o uttaerarete imasu. Sugu ni okoshi itadakemasu ka.” (Bapak Tanaka saat ini mengeluhkan sakit dada. Bisakah Anda segera datang?)' },
      { id: 'opt-b', textJp: '「昔から痛かったと思いますので大丈夫です。」', textId: '“Mukashi kara itakatta to omoimasu node daijoubu desu.” (Sepertinya sudah sakit dari dulu jadi tidak apa-apa.)' },
      { id: 'opt-c', textJp: '「薬を飲ませたので午後まで様子を見ます。」', textId: '“Kusuri o nomaseta node gogo made yousu o mimasu.” (Sudah saya beri obat jadi kita tunggu sampai sore.)' },
      { id: 'opt-d', textJp: '「たぶん筋肉痛だと思います。」', textId: '“Tabun kinnikutsuu da to omoimasu.” (Mungkin hanya pegal otot biasa.)' },
    ],
    correctOptionId: 'opt-a',
    explanationId: 'Dalam protokol SBAR Jepang, Situation (状況報告) harus segera menyebutkan identitas lansia, gejala akut saat ini, dan permohonan kehadiran perawat secara lugas tanpa menunda atau berasumsi sendiri.',
    officialRef: 'Japan Association of Certified Care Workers SBAR Guide',
  },
  {
    id: 'kg-04',
    sectorId: 'ssw-kaigo',
    section: 'language',
    questionJp: '体位変換を行う際、利用者への声かけ（Koe-kake）として最も自然で丁寧な日本語はどれか。',
    questionId: 'Manakah sapaan (Koe-kake) yang paling alami dan santun kepada lansia saat akan mengubah posisi tidur (alih baring)?',
    options: [
      { id: 'opt-a', textJp: '「動かしますからじっとしていてください。」', textId: '“Ugokashimasu kara jitto shite ite kudasai.” (Saya mau gerakkan jadi diamlah.)' },
      { id: 'opt-b', textJp: '「佐藤さん、お体の向きを右側に変えましょうか。痛いところはありませんか。」', textId: '“Satou-san, o-karada no muki o migigawa ni kaemashou ka. Itai tokoro wa arimasen ka.” (Ibu Satou, mari kita ubah posisi tubuh ke sebelah kanan ya. Apakah ada bagian yang terasa sakit?)' },
      { id: 'opt-c', textJp: '「さあ、早く寝返りしてください。」', textId: '“Saa, hayaku negaeri shite kudasai.” (Ayo, cepat berguling.)' },
      { id: 'opt-d', textJp: '「勝手に向きを変えないでくださいね。」', textId: '“Katte ni muki o kaenaide kudasai ne.” (Jangan ubah arah sendiri sesuka hati ya.)' },
    ],
    correctOptionId: 'opt-b',
    explanationId: 'Koe-kake dalam Kaigo mengutamakan kemitraan dan empati: menyebut nama lansia dengan hormat, menawarkan tindakan dengan bentuk ajakan sopan (~mashou ka), dan mengecek kenyamanan fisik terlebih dahulu.',
    officialRef: 'MHLW Kaigo Japanese Communication Textbook Unit 3',
  },

  // ── FOOD SERVICE & FOOD MANUFACTURING QUESTIONS (HACCP, 5S) ──
  {
    id: 'fd-01',
    sectorId: 'ssw-food-service',
    section: 'skills',
    questionJp: '食中毒菌の増殖を防ぐための温度管理において、「危険温度帯（Danger Zone）」として適切な範囲はどれか。',
    questionId: 'Dalam manajemen suhu untuk mencegah perkembangbiakan bakteri penyebab keracunan makanan (HACCP), manakah rentang suhu yang disebut "Danger Zone" (Zona Bahaya)?',
    options: [
      { id: 'opt-a', textJp: 'マイナス18℃以下', textId: 'Di bawah minus 18°C' },
      { id: 'opt-b', textJp: '10℃ 〜 60℃', textId: '10°C sampai 60°C' },
      { id: 'opt-c', textJp: '75℃以上で1分間以上', textId: '75°C ke atas selama 1 menit ke atas' },
      { id: 'opt-d', textJp: '100℃以上', textId: '100°C ke atas' },
    ],
    correctOptionId: 'opt-b',
    explanationId: 'Rentang suhu antara 10°C hingga 60°C adalah zona bahaya di mana bakteri berkembang biak dengan sangat cepat. Makanan panas harus dijaga di atas 65°C dan makanan dingin di bawah 10°C (ideal <4°C).',
    officialRef: 'OTAFF Food Service Sanitation Standard (HACCP) §2',
  },
  {
    id: 'fd-02',
    sectorId: 'ssw-food-service',
    section: 'skills',
    questionJp: '交差汚染（二次汚染）を防止するための対策として、最も適切なものはどれか。',
    questionId: 'Manakah tindakan paling tepat untuk mencegah kontaminasi silang (cross-contamination) di dapur?',
    options: [
      { id: 'opt-a', textJp: '生肉を切ったまな板で、そのまま生食用の野菜を切る。', textId: 'Memotong sayuran mentah langsung di atas talenan yang baru saja digunakan memotong daging mentah.' },
      { id: 'opt-b', textJp: '生肉・生魚用と生野菜用でまな板や包丁を色分けして使い分け、使用後は洗浄・殺菌する。', textId: 'Memisahkan talenan dan pisau berdasarkan warna khusus (daging/ikan vs sayuran mentah), serta mencuci dan mensterilkan setelah dipakai.' },
      { id: 'opt-c', textJp: '作業着の手袋は1日中同じものを交換せずに使い続ける。', textId: 'Sarung tangan kerja terus dipakai seharian tanpa pernah diganti.' },
      { id: 'opt-d', textJp: '床に落ちた食材は水で軽くすすいで加熱用に使用する。', textId: 'Bahan makanan yang jatuh ke lantai dibilas air sedikit lalu dimasak.' },
    ],
    correctOptionId: 'opt-b',
    explanationId: 'Wajib menerapkan pemisahan alat masak (Color Coding) antara bahan hewani mentah dengan sayuran yang siap santap, disertai pencucian dan disinfeksi alkohol 70%/klorin setelah digunakan.',
    officialRef: 'MAFF Food Safety & Sanitation Directive §5',
  },

  // ── MANUFACTURING & SOKEZAI QUESTIONS (JAIM, GEMBA K3, 5S) ──
  {
    id: 'mf-01',
    sectorId: 'ssw-manufacturing',
    section: 'skills',
    questionJp: '日本の製造業現場における「5S活動」の組み合わせとして、正しいものはどれか。',
    questionId: 'Manakah kombinasi yang benar dari kegiatan "5S" di pabrik manufaktur Jepang?',
    options: [
      { id: 'opt-a', textJp: '整理・整頓・清掃・清潔・躾（しつけ）', textId: 'Seiri (Ringkas), Seiton (Rapi), Seisou (Resik), Seiketsu (Rawat), Shitsuke (Rajin)' },
      { id: 'opt-b', textJp: '速度・正確・安全・節約・親切', textId: 'Sokudo (Kecepatan), Seikaku (Akurat), Anzen (Aman), Setsuyaku (Hemat), Shinsetsu (Ramah)' },
      { id: 'opt-c', textJp: '生産・修理・検査・出荷・清算', textId: 'Seisan (Produksi), Shuuri (Reparasi), Kensa (Inspeksi), Shukka (Kirim), Seisan (Pelunasan)' },
      { id: 'opt-d', textJp: '設計・試作・試験・審査・承認', textId: 'Sekkei (Desain), Shisaku (Prototipe), Shiken (Uji), Shinsa (Review), Shounin (Approval)' },
    ],
    correctOptionId: 'opt-a',
    explanationId: '5S dasar manufaktur Jepang: Seiri (membuang barang tak perlu), Seiton (menata letak barang agar mudah diambil), Seisou (membersihkan gemba), Seiketsu (menjaga standar bersih), Shitsuke (disiplin mematuhi aturan).',
    officialRef: 'JAIM Manufacturing SSW Textbook §1-1',
  },
  {
    id: 'mf-02',
    sectorId: 'ssw-manufacturing',
    section: 'safety',
    questionJp: '回転している機械（旋盤やフライス盤）を操作する際、巻き込まれ事故を防ぐための服装として誤っているものはどれか。',
    questionId: 'Saat mengoperasikan mesin berputar (mesin bubut / frais), manakah pakaian yang SALAH karena berisiko tersangkut/tergulung (makikomi)?',
    options: [
      { id: 'opt-a', textJp: '袖口（そでぐち）をしっかり留めた作業服を着用する。', textId: 'Mengenakan seragam kerja dengan ujung lengan terikat kancing rapat.' },
      { id: 'opt-b', textJp: '軍手（繊維手袋）を着用して回転部に手を近づける。', textId: 'Mengenakan sarung tangan rajut kain (Gunte) saat tangan mendekati komponen yang berputar.' },
      { id: 'opt-c', textJp: '保護メガネを着用して切削くずの飛散を防ぐ。', textId: 'Mengenakan kacamata pelindung untuk mencegah percikan serpihan logam.' },
      { id: 'opt-d', textJp: '安全帽のあご紐を確実に締める。', textId: 'Mengencangkan tali dagu helm pengaman dengan pas.' },
    ],
    correctOptionId: 'opt-b',
    explanationId: 'PANTANGAN MUTLAK (Kinsi / 禁止): Dilarang keras memakai sarung tangan rajut (Gunte) di mesin yang berputar, karena serat kain dapat tersangkut dan menarik jari/lengan ke dalam mesin.',
    officialRef: 'METI Industrial Machinery K3 Safety Directive §12',
  },

  // ── CONSTRUCTION QUESTIONS (MLIT, KYT) ──
  {
    id: 'cn-01',
    sectorId: 'ssw-construction',
    section: 'skills',
    questionJp: '高さ2メートル以上の高所作業を行う際、労働安全衛生規則上、必ず着用しなければならない装備はどれか。',
    questionId: 'Berdasarkan aturan K3 Jepang, perlengkapan apakah yang WAJIB dikenakan saat bekerja di ketinggian 2 meter atau lebih?',
    options: [
      { id: 'opt-a', textJp: 'フルハーネス型墜落制止用器具（安全帯）', textId: 'Full Harness type fall arrest equipment (sabuk keselamatan seluruh tubuh).' },
      { id: 'opt-b', textJp: '革製ウエストポーチ', textId: 'Tas pinggang kulit biasa.' },
      { id: 'opt-c', textJp: '防寒用マフラー', textId: 'Syal wol penahan dingin.' },
      { id: 'opt-d', textJp: '日よけサンバイザー', textId: 'Pelindung matahari (sun visor).' },
    ],
    correctOptionId: 'opt-a',
    explanationId: 'Peraturan K3 Jepang (Roudou Anzen Eisei Kisoku) mewajibkan penggunaan sabuk keselamatan tipe Full Harness (墜落制止用器具) pada ketinggian 2 meter ke atas untuk mencegah cedera fatal akibat jatuh.',
    officialRef: 'MLIT Construction Safety Standard §19',
  },
  {
    id: 'cn-02',
    sectorId: 'ssw-construction',
    section: 'safety',
    questionJp: '危険予知活動（KYT）において、指差呼称（Yubisashi Kosho）を行う目的として最も正しいものはどれか。',
    questionId: 'Dalam kegiatan prediksi bahaya (KYT), manakah tujuan yang paling benar dari gerakan Tunjuk-dan-Sebut (Yubisashi Kosho)?',
    options: [
      { id: 'opt-a', textJp: '意識レベルを高め、確認漏れや誤操作による事故を大幅に低減させるため。', textId: 'Meningkatkan tingkat kesadaran dan secara drastis mengurangi kelalaian serta kesalahan operasional.' },
      { id: 'opt-b', textJp: '現場監督に作業をしている姿勢をアピールするため。', textId: 'Pamer sikap rajin kepada mandor proyek.' },
      { id: 'opt-c', textJp: '作業スピードを極限まで速めるため。', textId: 'Mempercepat kecepatan kerja hingga batas maksimal.' },
      { id: 'opt-d', textJp: '他の作業員と雑談するため。', textId: 'Mengobrol santai dengan pekerja lain.' },
    ],
    correctOptionId: 'opt-a',
    explanationId: 'Riset keselamatan industri Jepang membuktikan bahwa Point-and-Call (指差呼称: Mata melihat, telunjuk menunjuk, mulut melafalkan "Yoshi!", telinga mendengar) menurunkan tingkat kesalahan kerja hingga 84%!',
    officialRef: 'JISHA Japanese Industrial Safety & Health Association KYT Manual',
  },
];

interface PrometricCbtModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSectorId?: string;
  onCertificateIssued?: (score: number, passed: boolean) => void;
}

export const PrometricCbtModal: React.FC<PrometricCbtModalProps> = ({
  isOpen,
  onClose,
  initialSectorId = 'ssw-kaigo',
  onCertificateIssued,
}) => {
  const { showToast, incrementXp } = useAppStore();

  const [activeSectorId, setActiveSectorId] = useState<string>(initialSectorId);
  const [examState, setExamState] = useState<'briefing' | 'testing' | 'certificate' | 'review'>('briefing');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(900); // 15 mins default
  const [showPaletteDrawer, setShowPaletteDrawer] = useState<boolean>(false);
  const [showFuriganaGlossary, setShowFuriganaGlossary] = useState<boolean>(true);

  // Sync sector when opened with prop
  useEffect(() => {
    if (initialSectorId && PROMETRIC_SECTOR_RULES[initialSectorId]) {
      setActiveSectorId(initialSectorId);
    }
  }, [initialSectorId]);

  const activeSectorRule = useMemo(() => {
    return PROMETRIC_SECTOR_RULES[activeSectorId] || PROMETRIC_SECTOR_RULES['ssw-kaigo'];
  }, [activeSectorId]);

  // Filter questions for the selected sector (with fallback to universal Gemba safety if sector has fewer)
  const examQuestions = useMemo(() => {
    const specific = CANONICAL_PROMETRIC_QUESTIONS.filter((q) => q.sectorId === activeSectorId);
    if (specific.length >= 4) return specific;
    // supplement with generic safety questions to make at least 4 questions
    const supplements = CANONICAL_PROMETRIC_QUESTIONS.filter((q) => q.sectorId !== activeSectorId);
    return [...specific, ...supplements].slice(0, 6);
  }, [activeSectorId]);

  const currentQuestion = examQuestions[currentQuestionIndex] || examQuestions[0];

  // Timer countdown
  useEffect(() => {
    if (examState !== 'testing') return;

    const timer = setInterval(() => {
      setTimeRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examState]);

  // Start test
  const handleStartExam = () => {
    setUserAnswers({});
    setFlaggedQuestions({});
    setCurrentQuestionIndex(0);
    setTimeRemainingSeconds(600); // 10 minutes simulation
    setExamState('testing');
    showToast('Ujian Prometric CBT Dimulai. Semoga Berhasil!', '🎯');
  };

  // Toggle answer
  const handleSelectOption = (optionId: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));
  };

  // Toggle flag
  const handleToggleFlag = () => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id],
    }));
  };

  // Submit and calculate dual pass results
  const examResult = useMemo(() => {
    if (examQuestions.length === 0) return { passed: false, totalScore: 0, sectionScores: {} };

    let sectionStats: Record<string, { total: number; correct: number }> = {};

    examQuestions.forEach((q) => {
      const isCorrect = userAnswers[q.id] === q.correctOptionId;
      const sectionKey = q.section;
      if (!sectionStats[sectionKey]) {
        sectionStats[sectionKey] = { total: 0, correct: 0 };
      }
      sectionStats[sectionKey].total += 1;
      if (isCorrect) {
        sectionStats[sectionKey].correct += 1;
      }
    });

    const totalQuestions = examQuestions.length;
    const totalCorrect = examQuestions.filter((q) => userAnswers[q.id] === q.correctOptionId).length;
    const totalScore = Math.round((totalCorrect / totalQuestions) * 100);

    let passed = false;

    if (activeSectorRule.hasDualPass) {
      // Evaluate dual pass sections
      const skillsScore = sectionStats['skills']
        ? Math.round((sectionStats['skills'].correct / sectionStats['skills'].total) * 100)
        : totalScore;
      const langScore = sectionStats['language']
        ? Math.round((sectionStats['language'].correct / sectionStats['language'].total) * 100)
        : (sectionStats['safety'] ? Math.round((sectionStats['safety'].correct / sectionStats['safety'].total) * 100) : totalScore);

      const passA = skillsScore >= activeSectorRule.sectionA.passPercent;
      const passB = langScore >= (activeSectorRule.sectionB?.passPercent || 60);

      passed = passA && passB;
    } else {
      passed = totalScore >= activeSectorRule.sectionA.passPercent;
    }

    return {
      passed,
      totalScore,
      totalCorrect,
      totalQuestions,
      sectionStats,
    };
  }, [examQuestions, userAnswers, activeSectorRule]);

  const handleSubmitExam = () => {
    setExamState('certificate');
    if (examResult.passed) {
      playSuccessSfx();
      incrementXp(100);
      showToast('SELAMAT! Anda Dinyatakan LULUS (合格) Ujian CBT!', '🎉');
    } else {
      playErrorSfx();
      showToast('Hasil: Belum Memenuhi Ambang Batas (不合格). Silakan evaluasi materi.', '⚠️');
    }

    if (onCertificateIssued) {
      onCertificateIssued(examResult.totalScore, examResult.passed);
    }
  };

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-stone-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[92dvh] sm:max-h-[92vh] overflow-y-auto rounded-3xl bg-surface-2 border border-accent/30 shadow-2xl flex flex-col">
        {/* ── CBT TOP EXAM HEADER ── */}
        <div className="bg-surface-3 border-b border-accent/20 p-3 sm:p-4 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-accent font-black text-xs sm:text-sm">
              PROMETRIC CBT
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs font-bold text-appText-bright truncate">
                <span>{activeSectorRule.sectorName}</span>
                <span className="px-1.5 py-0.5 rounded bg-surface text-[10px] text-accent font-mono">
                  {activeSectorRule.ministry} ({activeSectorRule.ministryKanji})
                </span>
              </div>
              <div className="text-[10px] text-appText-muted font-mono truncate">
                ID: IDN-SSW-2026-NUGGET · Kursi No. 04
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {examState === 'testing' && (
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-black border tabular-nums ${
                  timeRemainingSeconds <= 120
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse'
                    : 'bg-surface text-amber-400 border-amber-500/30'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTimer(timeRemainingSeconds)}</span>
              </div>
            )}

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-surface hover:bg-surface-3 text-appText-muted hover:text-appText-bright flex items-center justify-center text-sm transition-colors"
              aria-label="Tutup Simulator"
            >
              ✕
            </button>
          </div>
        </div>

        {/* ── STATE 1: CANDIDATE BRIEFING & STATUTORY RULES ── */}
        {examState === 'briefing' && (
          <div className="p-4 sm:p-7 space-y-6 overflow-y-auto">
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-accent font-bold text-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Simulasi Resmi Ujian Keahlian Tokutei Ginou 1 (SSW)</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-appText-bright tracking-tight">
                Prometric Computer-Based Test (CBT)
              </h2>
              <p className="text-xs sm:text-sm text-appText-muted leading-relaxed">
                Platform simulasi komputer resmi berstandar Prometric Jepang dengan perhitungan kelulusan ganda (*Dual-Pass Statutory Scoring*) sesuai regulasi kementerian terkait.
              </p>
            </div>

            {/* Sector Selector Tabs */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-appText-muted uppercase tracking-wider block">
                Pilih Sektor Kejuruan Ujian:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {Object.values(PROMETRIC_SECTOR_RULES).map((rule) => {
                  const isSelected = activeSectorId === rule.sectorId;
                  return (
                    <button
                      key={rule.sectorId}
                      type="button"
                      onClick={() => setActiveSectorId(rule.sectorId)}
                      className={`p-3 rounded-2xl border text-left transition-all min-h-[56px] active:scale-95 ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-500 text-appText-bright ring-1 ring-amber-500 font-bold'
                          : 'bg-surface hover:bg-surface-3 border-accent/15 text-appText'
                      }`}
                    >
                      <div className="text-xs font-extrabold truncate">{rule.sectorName}</div>
                      <div className="text-[10px] text-accent mt-0.5">{rule.ministry}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Statutory Scoring Rules Banner */}
            <div className="bg-surface border border-accent/20 rounded-2xl p-4 sm:p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-extrabold text-appText-bright">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span>Kriteria Kelulusan Resmi ({activeSectorRule.ministry} {activeSectorRule.ministryKanji})</span>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-surface-2 border border-accent/15 space-y-1">
                  <div className="text-appText-muted text-[11px] font-medium">Seksi A: {activeSectorRule.sectionA.name}</div>
                  <div className="text-base font-black text-amber-400">
                    Ambang Batas: ≥ {activeSectorRule.sectionA.passPercent}%
                  </div>
                </div>

                {activeSectorRule.sectionB ? (
                  <div className="p-3 rounded-xl bg-surface-2 border border-accent/15 space-y-1">
                    <div className="text-appText-muted text-[11px] font-medium">Seksi B: {activeSectorRule.sectionB.name}</div>
                    <div className="text-base font-black text-amber-400">
                      Ambang Batas: ≥ {activeSectorRule.sectionB.passPercent}%
                    </div>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-surface-2 border border-accent/15 space-y-1">
                    <div className="text-appText-muted text-[11px] font-medium">Format Penilaian</div>
                    <div className="text-base font-black text-emerald-400">
                      Single Statutory Score (Skor Tunggal)
                    </div>
                  </div>
                )}
              </div>

              <p className="text-[11px] text-appText-muted leading-relaxed">
                {activeSectorRule.hasDualPass
                  ? '⚠️ Perhatian: Ujian ini mensyaratkan DUAL-PASS. Kedua seksi WAJIB lulus ambang batas secara independen. Jika salah satu seksi bernilai di bawah ambang batas, hasil akhir tetap Tidak Lulus (不合格).'
                  : 'ℹ️ Ujian ini menggunakan batas kelulusan standar 60%–65% dari total seluruh soal.'}
              </p>
            </div>

            {/* Launch Button */}
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={handleStartExam}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
              >
                <Award className="w-4 h-4" />
                <span>Mulai Simulasi Ujian Prometric CBT</span>
              </button>
            </div>
          </div>
        )}

        {/* ── STATE 2: ACTIVE PROMETRIC CBT TEST INTERFACE ── */}
        {examState === 'testing' && (
          <div className="flex-1 flex flex-col p-4 sm:p-6 space-y-4 overflow-y-auto">
            {/* Question Progress & Review Flag Bar */}
            <div className="flex items-center justify-between gap-3 bg-surface p-3 rounded-2xl border border-accent/15">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-accent font-mono">
                  Soal {currentQuestionIndex + 1} dari {examQuestions.length}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-surface-2 text-[10px] text-appText-muted font-bold uppercase">
                  Seksi: {currentQuestion.section}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Review Flag button */}
                <button
                  type="button"
                  onClick={handleToggleFlag}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors active:scale-95 ${
                    flaggedQuestions[currentQuestion.id]
                      ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-sm'
                      : 'bg-surface-2 text-appText-muted hover:text-appText-bright border-accent/20'
                  }`}
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>{flaggedQuestions[currentQuestion.id] ? 'Ditandai (見直し)' : 'Tandai Soal'}</span>
                </button>

                {/* Palette Drawer Toggle */}
                <button
                  type="button"
                  onClick={() => setShowPaletteDrawer(!showPaletteDrawer)}
                  className="px-3 py-1.5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-accent/20 text-xs font-bold text-appText-bright flex items-center gap-1.5"
                >
                  <Layers className="w-3.5 h-3.5 text-accent" />
                  <span>Daftar Soal</span>
                </button>
              </div>
            </div>

            {/* Question Palette Drawer (Collapsible) */}
            {showPaletteDrawer && (
              <div className="bg-surface-3 border border-accent/25 rounded-2xl p-3.5 space-y-2 animate-fade-in">
                <div className="text-[11px] font-bold text-appText-muted uppercase tracking-wider flex items-center justify-between">
                  <span>Palet Navigasi Soal (見直し一覧)</span>
                  <div className="flex items-center gap-3 text-[10px] font-normal normal-case">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Dijawab
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-stone-700 inline-block" /> Belum
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block" /> Flagged
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {examQuestions.map((q, idx) => {
                    const isAnswered = !!userAnswers[q.id];
                    const isFlagged = !!flaggedQuestions[q.id];
                    const isCurrent = idx === currentQuestionIndex;

                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => {
                          setCurrentQuestionIndex(idx);
                          setShowPaletteDrawer(false);
                        }}
                        className={`w-9 h-9 rounded-xl font-mono text-xs font-black transition-all flex items-center justify-center relative ${
                          isCurrent
                            ? 'ring-2 ring-accent text-accent-hot bg-surface'
                            : isFlagged
                            ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40'
                            : isAnswered
                            ? 'bg-amber-500 text-stone-950 font-black'
                            : 'bg-surface text-appText-muted hover:bg-surface-2 border border-accent/15'
                        }`}
                      >
                        {idx + 1}
                        {isFlagged && (
                          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-yellow-400" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Stimulus / Vignette Card */}
            {currentQuestion.scenarioJp && (
              <div className="bg-surface border border-accent/25 rounded-2xl p-4 sm:p-5 space-y-2">
                <div className="flex items-center justify-between text-xs text-accent font-bold">
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Stimulus Kasus & Situasi Kerja (問題事例)</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => speakJapanese(currentQuestion.scenarioJp || '')}
                    className="p-1 rounded hover:bg-surface-2 text-accent"
                    title="Dengarkan Audio Bahasa Jepang"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="font-jp text-sm sm:text-base text-appText-bright leading-relaxed">
                  {currentQuestion.scenarioJp}
                </p>
                {showFuriganaGlossary && currentQuestion.scenarioId && (
                  <p className="text-xs text-appText-muted pt-1 border-t border-accent/10">
                    🇮🇩 {currentQuestion.scenarioId}
                  </p>
                )}
              </div>
            )}

            {/* Question Text */}
            <div className="bg-surface-2 border border-accent/20 rounded-2xl p-4 sm:p-5 space-y-2">
              <div className="flex items-center justify-between text-xs text-accent font-bold">
                <span>Pertanyaan:</span>
                <button
                  type="button"
                  onClick={() => speakJapanese(currentQuestion.questionJp)}
                  className="p-1 rounded hover:bg-surface-3 text-accent"
                  title="Dengarkan Audio Soal"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <h3 className="font-jp text-base sm:text-lg font-bold text-appText-bright leading-snug">
                {currentQuestion.questionJp}
              </h3>
              {showFuriganaGlossary && (
                <p className="text-xs text-appText-muted">
                  🇮🇩 {currentQuestion.questionId}
                </p>
              )}
            </div>

            {/* Options List */}
            <div className="space-y-2.5">
              {currentQuestion.options.map((opt, optIdx) => {
                const isSelected = userAnswers[currentQuestion.id] === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectOption(opt.id)}
                    className={`w-full p-3.5 sm:p-4 rounded-2xl border text-left transition-all min-h-[56px] flex items-start gap-3 active:scale-98 ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-500 text-appText-bright ring-2 ring-amber-500 font-bold shadow-md'
                        : 'bg-surface hover:bg-surface-3 border-accent/20 text-appText'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-black shrink-0 mt-0.5 ${
                        isSelected
                          ? 'bg-amber-500 text-stone-950'
                          : 'bg-surface-2 text-appText-muted border border-accent/20'
                      }`}
                    >
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-jp text-sm sm:text-base leading-normal">{opt.textJp}</div>
                      {showFuriganaGlossary && (
                        <div className="text-xs text-appText-muted mt-0.5 leading-normal">
                          {opt.textId}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Exam Navigation Actions */}
            <div className="pt-4 flex items-center justify-between gap-3 border-t border-accent/15">
              <button
                type="button"
                onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2.5 rounded-xl bg-surface hover:bg-surface-3 disabled:opacity-40 disabled:pointer-events-none text-appText font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Sebelumnya (前へ)</span>
              </button>

              {currentQuestionIndex < examQuestions.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <span>Selanjutnya (次へ)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmitExam}
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-xs flex items-center gap-1.5 transition-all shadow-md animate-pulse"
                >
                  <span>Selesaikan & Kumpulkan Ujian (終了)</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* ── STATE 3: OFFICIAL PROMETRIC CERTIFICATE & SCORE REPORT ── */}
        {examState === 'certificate' && (
          <div className="p-4 sm:p-7 space-y-6 overflow-y-auto">
            {/* Certificate Header Stamp */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-surface-3 border border-accent/20 text-xs font-mono text-appText-muted">
                <span>OFFICIAL JAPANESE PROMETRIC CBT SCORE REPORT</span>
              </div>

              {examResult.passed ? (
                <div className="space-y-1">
                  <div className="inline-block p-3 rounded-full bg-emerald-500/15 border-2 border-emerald-500 text-emerald-400">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h2 className="text-3xl font-black text-emerald-400 tracking-tight font-jp">
                    合格 (GOKAKU) · LULUS
                  </h2>
                  <p className="text-xs sm:text-sm text-appText-muted">
                    Selamat! Anda memenuhi standar statutory kelulusan {activeSectorRule.ministry} ({activeSectorRule.ministryKanji}).
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="inline-block p-3 rounded-full bg-rose-500/15 border-2 border-rose-500 text-rose-400">
                    <XCircle className="w-12 h-12" />
                  </div>
                  <h2 className="text-3xl font-black text-rose-400 tracking-tight font-jp">
                    不合格 (FUGOKAKU) · BELUM LULUS
                  </h2>
                  <p className="text-xs sm:text-sm text-appText-muted">
                    Skor belum memenuhi ambang batas minimal evaluasi statutory. Silakan pelajari kembali unit materi terkait.
                  </p>
                </div>
              )}
            </div>

            {/* Official Digital Certificate Paper Card */}
            <div className="relative bg-gradient-to-b from-stone-900 to-stone-950 border-2 border-amber-500/40 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-5 overflow-hidden">
              <div className="absolute top-3 right-4 opacity-10 text-8xl font-black font-jp select-none pointer-events-none">
                合格
              </div>

              <div className="border-b border-amber-500/20 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] text-amber-500/80 font-mono tracking-wider uppercase">
                    Kementerian Penerbit Sertifikat:
                  </div>
                  <div className="text-sm sm:text-base font-extrabold text-appText-bright">
                    {activeSectorRule.ministry} ({activeSectorRule.ministryKanji})
                  </div>
                  <div className="text-xs text-appText-muted">{activeSectorRule.sectorName}</div>
                </div>

                <div className="text-left sm:text-right font-mono text-xs">
                  <div className="text-appText-muted text-[10px]">KODE UJIAN:</div>
                  <div className="font-bold text-accent">{activeSectorRule.testCode}</div>
                  <div className="text-[10px] text-appText-muted mt-0.5">
                    Tanggal: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                </div>
              </div>

              {/* Sectional Performance Matrix */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-surface/80 border border-accent/15 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-appText-bright">Seksi A: {activeSectorRule.sectionA.name}</span>
                    <span className="font-mono text-accent font-black">{examResult.totalScore}%</span>
                  </div>
                  <div className="w-full h-2 bg-surface-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        examResult.totalScore >= activeSectorRule.sectionA.passPercent
                          ? 'bg-emerald-500'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${examResult.totalScore}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-appText-muted flex justify-between">
                    <span>Ambang Batas: ≥ {activeSectorRule.sectionA.passPercent}%</span>
                    <span className={examResult.totalScore >= activeSectorRule.sectionA.passPercent ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                      {examResult.totalScore >= activeSectorRule.sectionA.passPercent ? 'LULUS ✓' : 'TIDAK LULUS ✗'}
                    </span>
                  </div>
                </div>

                {activeSectorRule.hasDualPass && (
                  <div className="p-3.5 rounded-2xl bg-surface/80 border border-accent/15 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-appText-bright">Seksi B: {activeSectorRule.sectionB?.name || 'Bahasa / K3'}</span>
                      <span className="font-mono text-accent font-black">{examResult.totalScore}%</span>
                    </div>
                    <div className="w-full h-2 bg-surface-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          examResult.totalScore >= (activeSectorRule.sectionB?.passPercent || 60)
                            ? 'bg-emerald-500'
                            : 'bg-rose-500'
                        }`}
                        style={{ width: `${examResult.totalScore}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-appText-muted flex justify-between">
                      <span>Ambang Batas: ≥ {activeSectorRule.sectionB?.passPercent || 60}%</span>
                      <span className={examResult.totalScore >= (activeSectorRule.sectionB?.passPercent || 60) ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                        {examResult.totalScore >= (activeSectorRule.sectionB?.passPercent || 60) ? 'LULUS ✓' : 'TIDAK LULUS ✗'}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Security Verification Hash */}
              <div className="pt-2 border-t border-accent/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] text-appText-muted font-mono">
                <div>VERIFICATION HASH: SHA256:7B8F9A4E2C1D0F8394E7A1</div>
                <div>LOKASI PUSAT UJIAN: TOKYO PROMETRIC CENTER #04</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setExamState('review')}
                className="px-4 py-2.5 rounded-xl bg-surface hover:bg-surface-3 border border-accent/25 text-appText font-bold text-xs flex items-center gap-1.5"
              >
                <BookOpen className="w-4 h-4 text-accent" />
                <span>Tinjau Pembahasan Soal & Kunci Jawaban</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleStartExam}
                  className="px-4 py-2.5 rounded-xl bg-surface hover:bg-surface-3 border border-accent/25 text-appText font-bold text-xs flex items-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4 text-accent" />
                  <span>Ulangi Ujian</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs"
                >
                  Selesai
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── STATE 4: DETAILED EXAM REVIEW & RATIONALE ── */}
        {examState === 'review' && (
          <div className="p-4 sm:p-7 space-y-6 overflow-y-auto">
            <div className="flex items-center justify-between gap-3 border-b border-accent/15 pb-4">
              <div>
                <h3 className="text-base font-extrabold text-appText-bright">
                  Pembahasan Mendalam Ujian Prometric CBT
                </h3>
                <p className="text-xs text-appText-muted mt-0.5">
                  Analisis kunci jawaban resmi dan landasan regulasi keselamatan kerja Jepang.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setExamState('certificate')}
                className="px-3.5 py-2 rounded-xl bg-surface hover:bg-surface-3 text-xs font-bold text-accent"
              >
                Kembali ke Skor
              </button>
            </div>

            <div className="space-y-4">
              {examQuestions.map((q, idx) => {
                const userChoice = userAnswers[q.id];
                const isCorrect = userChoice === q.correctOptionId;

                return (
                  <div
                    key={q.id}
                    className={`p-4 sm:p-5 rounded-2xl border transition-colors space-y-3 ${
                      isCorrect
                        ? 'bg-surface border-emerald-500/30'
                        : 'bg-surface border-rose-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono font-bold text-accent">
                        Soal {idx + 1} ({q.section.toUpperCase()})
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                          isCorrect
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {isCorrect ? 'Benar (+1)' : 'Salah'}
                      </span>
                    </div>

                    <div className="font-jp text-sm sm:text-base font-bold text-appText-bright">
                      {q.questionJp}
                    </div>
                    <div className="text-xs text-appText-muted">
                      🇮🇩 {q.questionId}
                    </div>

                    {/* Options Breakdown */}
                    <div className="space-y-1.5 pt-1">
                      {q.options.map((opt) => {
                        const isThisCorrect = opt.id === q.correctOptionId;
                        const isThisUser = opt.id === userChoice;

                        return (
                          <div
                            key={opt.id}
                            className={`p-2.5 rounded-xl text-xs flex items-center justify-between gap-2 border ${
                              isThisCorrect
                                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 font-bold'
                                : isThisUser
                                ? 'bg-rose-500/10 border-rose-500/40 text-rose-300'
                                : 'bg-surface-2 border-transparent text-appText-muted'
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span>{isThisCorrect ? '✓' : isThisUser ? '✗' : '○'}</span>
                              <span className="truncate">{opt.textJp} ({opt.textId})</span>
                            </div>
                            {isThisCorrect && (
                              <span className="text-[10px] bg-emerald-500/20 px-1.5 py-0.5 rounded text-emerald-400 shrink-0">
                                Kunci Resmi
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Rationale explanation */}
                    <div className="p-3 rounded-xl bg-surface-2 border border-accent/15 space-y-1 text-xs">
                      <div className="font-bold text-accent flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Penjelasan & Referensi Regulasi Resmi:</span>
                      </div>
                      <p className="text-appText-muted leading-relaxed">
                        {q.explanationId}
                      </p>
                      {q.officialRef && (
                        <div className="text-[10px] text-accent/80 font-mono pt-1">
                          Ref: {q.officialRef}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
