// ══════════════════════════════════════════════════════════════════
//  JftBasicCbtModal.tsx — Official Japan Foundation JFT-Basic CBT Simulator
//  CEFR-J A1/A2 Competency Benchmark for Tokutei Ginou 1 (SSW) Visa
//  Standard: 4 Official Sections · Max 250 Points · Pass Mark >= 200 (80%)
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
  Headphones,
  BookOpen,
  Layers,
  Sparkles,
  Play,
  RotateCw,
} from 'lucide-react';
import { speakJapanese } from '../../lib/audio/tts';
import { playSuccessSfx, playErrorSfx } from '../../lib/audio/sfx';
import { useAppStore } from '../../store/useAppStore';

export type JftSectionId = 1 | 2 | 3 | 4;

export interface JftSectionMeta {
  sectionId: JftSectionId;
  nameJp: string;
  nameId: string;
  maxPoints: number; // Sum to 250 (e.g. 60, 60, 65, 65)
  desc: string;
  icon: string;
}

export const JFT_SECTION_METAS: Record<JftSectionId, JftSectionMeta> = {
  1: {
    sectionId: 1,
    nameJp: '文字と語彙',
    nameId: 'Seksi 1: Huruf & Kosakata (Moji to Goi)',
    maxPoints: 60,
    desc: 'Membaca kanji dasar, tanda petunjuk umum, dan kosakata kehidupan sehari-hari.',
    icon: '🔤',
  },
  2: {
    sectionId: 2,
    nameJp: '会話と表現',
    nameId: 'Seksi 2: Percakapan & Ungkapan (Kaiwa to Hyogen)',
    maxPoints: 60,
    desc: 'Komunikasi praktis di lingkungan kerja, tempat tinggal, dan layanan publik.',
    icon: '💬',
  },
  3: {
    sectionId: 3,
    nameJp: '聴解',
    nameId: 'Seksi 3: Pemahaman Mendengar (Choukai)',
    maxPoints: 65,
    desc: 'Mendengarkan instruksi kerja, pengumuman stasiun, dan percakapan warga lokal.',
    icon: '🎧',
  },
  4: {
    sectionId: 4,
    nameJp: '読解',
    nameId: 'Seksi 4: Pemahaman Membaca (Dokkai)',
    maxPoints: 65,
    desc: 'Membaca jadwal pemilahan sampah, pengumuman apartemen, dan brosur resep obat.',
    icon: '📖',
  },
};

export interface JftQuestion {
  id: string;
  sectionId: JftSectionId;
  questionNumber: number;
  questionJp: string;
  questionId: string;
  stimulusDocJp?: string;
  stimulusDocId?: string;
  audioDialogueJp?: string;
  options: Array<{
    id: string;
    textJp: string;
    textId: string;
  }>;
  correctOptionId: string;
  explanationId: string;
  canDoStatement: string;
}

export const CANONICAL_JFT_QUESTIONS: JftQuestion[] = [
  // ── SEKSI 1: MOJI TO GOI (文字と語彙) ──
  {
    id: 'jft-s1-01',
    sectionId: 1,
    questionNumber: 1,
    questionJp: '次の漢字の読み方として、最も正しいものを一つ選びなさい。【受付】',
    questionId: 'Pilihlah cara baca yang paling tepat untuk kanji berikut: 【受付】',
    options: [
      { id: 'opt-a', textJp: 'うけつけ', textId: 'uketsuke (Meja Resepsionis / Informasi)' },
      { id: 'opt-b', textJp: 'うけつけん', textId: 'uketsuken' },
      { id: 'opt-c', textJp: 'うけふね', textId: 'ukefune' },
      { id: 'opt-d', textJp: 'とどけで', textId: 'todokede' },
    ],
    correctOptionId: 'opt-a',
    explanationId: 'Kanji 受付 dibaca "uketsuke" yang bermakna meja resepsionis, loket penerimaan pendaftaran di kantor balai kota (Shiyakusho) maupun rumah sakit.',
    canDoStatement: 'Mampu membaca kanji petunjuk fasilitas layanan umum.',
  },
  {
    id: 'jft-s1-02',
    sectionId: 1,
    questionNumber: 2,
    questionJp: '（　　）に入れるのに最も適切な言葉はどれですか。「市役所の窓口で（　　）を見せてください。」',
    questionId: 'Pilihlah kata yang paling tepat untuk mengisi tanda kurung: "Shiyakusho no madoguchi de (   ) o misete kudasai."',
    options: [
      { id: 'opt-a', textJp: '保険証（ほけんしょう）', textId: 'hokenshou (Kartu Asuransi Kesehatan)' },
      { id: 'opt-b', textJp: '看板（かんばん）', textId: 'kanban (Papan Reklame)' },
      { id: 'opt-c', textJp: '交番（こうばん）', textId: 'kouban (Pos Polisi)' },
      { id: 'opt-d', textJp: '階段（かいだん）', textId: 'kaidan (Tangga)' },
    ],
    correctOptionId: 'opt-a',
    explanationId: 'Di loket balai kota (Shiyakusho no madoguchi), dokumen identitas resmi yang paling sering diminta adalah kartu asuransi (保険証 / hokenshou) atau Zairyu Card.',
    canDoStatement: 'Mampu menggunakan istilah dokumen identitas kependudukan di Jepang.',
  },

  // ── SEKSI 2: KAIWA TO HYOGEN (会話と表現) ──
  {
    id: 'jft-s2-01',
    sectionId: 2,
    questionNumber: 3,
    questionJp: '体調が悪く、仕事を早退したいです。上司になんと言いますか。',
    questionId: 'Kondisi badanmu sedang tidak fit dan ingin pulang kerja lebih awal (soutai). Apa yang kamu katakan kepada atasanmu?',
    options: [
      { id: 'opt-a', textJp: '「すみません、熱があるので少し早く帰ってもいいですか。」', textId: '“Sumimasen, netsu ga aru node sukoshi hayaku kaette mo ii desu ka.” (Maaf, karena saya demam bolehkah saya pulang sedikit lebih awal?)' },
      { id: 'opt-b', textJp: '「もう仕事は終わりましたから帰ります。」', textId: '“Mou shigoto wa owarimashita kara kaerimasu.” (Pekerjaan sudah selesai jadi saya pulang.)' },
      { id: 'opt-c', textJp: '「明日も休みますね。」', textId: '“Ashita mo yasumimasu ne.” (Besok saya libur juga ya.)' },
      { id: 'opt-d', textJp: '「早く病院に連れて行ってください。」', textId: '“Hayaku byouin ni tsurete itte kudasai.” (Cepat antarkan saya ke rumah sakit.)' },
    ],
    correctOptionId: 'opt-a',
    explanationId: 'Pola permohonan izin santun di tempat kerja: menyatakan alasan (Netsu ga aru node / karena demam) diikuti bentuk permohonan izin (~te mo ii desu ka / bolehkah saya...?).',
    canDoStatement: 'Mampu meminta izin kepada atasan saat sakit dengan sopan.',
  },
  {
    id: 'jft-s2-02',
    sectionId: 2,
    questionNumber: 4,
    questionJp: '近所の人に引っ越しの挨拶をします。手土産を渡すときの適切な表現はどれですか。',
    questionId: 'Kamu menyapa tetangga baru saat pindahan rumah. Ungkapan apakah yang tepat saat menyerahkan bingkisan kecil (temiyage)?',
    options: [
      { id: 'opt-a', textJp: '「隣に引っ越してきたサントスです。これからよろしくお願いいたします。」', textId: '“Tonari ni hikkoshite kita Santos desu. Kore kara yoroshiku onegai itashimasu.” (Saya Santos yang baru pindah ke sebelah. Mohon bimbingan dan bantuannya ke depan.)' },
      { id: 'opt-b', textJp: '「このお菓子は高かったですから食べてください。」', textId: '“Kono okashi wa takakatta desu kara tabete kudasai.” (Kue ini mahal jadi silakan makan.)' },
      { id: 'opt-c', textJp: '「荷物を運ぶのを手伝ってください。」', textId: '“Nimotsu o hakobu no o tetsudatte kudasai.” (Tolong bantu angkat barang-barang saya.)' },
      { id: 'opt-d', textJp: '「静かに生活してくださいね。」', textId: '“Shizuka ni seikatsu shite kudasai ne.” (Tolong hiduplah yang tenang ya.)' },
    ],
    correctOptionId: 'opt-a',
    explanationId: 'Etika perkenalan tetangga Jepang (Hikkoshi no aisatsu): memperkenalkan diri, posisi tempat tinggal (tonari ni hikkoshite kita), dan mengucapkan permohonan hubungan bertetangga yang baik (yoroshiku onegai itashimasu).',
    canDoStatement: 'Mampu menyapa dan memperkenalkan diri kepada tetangga baru di lingkungan hunian Jepang.',
  },

  // ── SEKSI 3: CHOUKAI (聴解) ──
  {
    id: 'jft-s3-01',
    sectionId: 3,
    questionNumber: 5,
    questionJp: '男の人と女の人が話しています。燃えるゴミは、何曜日に出しますか。',
    questionId: 'Dua orang sedang berbicara. Pada hari apa sampah yang dapat dibakar (moeru gomi) harus dikeluarkan?',
    audioDialogueJp: '男の人：「すみません、このアパートのゴミ出しのルールを教えてください。」女の人：「はい。生ゴミや紙などの燃えるゴミは、火曜日と金曜日の朝8時までに出してくださいね。ペットボトルは水曜日ですよ。」男の人：「火曜日と金曜日ですね。わかりました。」',
    options: [
      { id: 'opt-a', textJp: '火曜日と金曜日（かようび と きんようび）', textId: 'Hari Selasa dan Jumat' },
      { id: 'opt-b', textJp: '水曜日（すいようび）', textId: 'Hari Rabu' },
      { id: 'opt-c', textJp: '土曜日と日曜日（どようび と にちようび）', textId: 'Hari Sabtu dan Minggu' },
      { id: 'opt-d', textJp: '毎日いつでも（まいにち）', textId: 'Setiap hari kapan saja' },
    ],
    correctOptionId: 'opt-a',
    explanationId: 'Dalam dialog, wanita menjelaskan: "Nama-gomi ya kami nado no moeru gomi wa, kayoubi to kinyoubi no asa hachiji made ni dashite kudasai." (Sampah makanan dan kertas yang dapat dibakar dikeluarkan pada hari Selasa dan Jumat sebelum jam 8 pagi).',
    canDoStatement: 'Mampu menangkap informasi hari dan waktu pembuangan sampah dari instruksi lisan warga/pengelola.',
  },
  {
    id: 'jft-s3-02',
    sectionId: 3,
    questionNumber: 6,
    questionJp: '駅のアナウンスを聞いています。次の電車は何番線に来ますか。',
    questionId: 'Dengarkan pengumuman stasiun. Kereta berikutnya akan tiba di peron jalur berapa?',
    audioDialogueJp: 'アナウンス：「まもなく、2番線に東京方面行きの快速電車がまいります。黄色い点字ブロックの内側までお下がりください。」',
    options: [
      { id: 'opt-a', textJp: '2番線（にばんせん）', textId: 'Peron Jalur 2' },
      { id: 'opt-b', textJp: '1番線（いちばんせん）', textId: 'Peron Jalur 1' },
      { id: 'opt-c', textJp: '3番線（さんばんせん）', textId: 'Peron Jalur 3' },
      { id: 'opt-d', textJp: '改札口（かいさつぐち）', textId: 'Pintu Gerbang Tiket' },
    ],
    correctOptionId: 'opt-a',
    explanationId: 'Pengumuman jelas melafalkan: "Mamonaku, ni-ban-sen ni Toukyou houmen iki no kaisoku densha ga mairimasu." (Sebentar lagi kereta cepat menuju Tokyo akan tiba di peron jalur 2).',
    canDoStatement: 'Mampu menangkap nomor peron dan tujuan kereta dari siaran pengumuman stasiun Jepang.',
  },

  // ── SEKSI 4: DOKKAI (読解) ──
  {
    id: 'jft-s4-01',
    sectionId: 4,
    questionNumber: 7,
    questionJp: '次の張り紙を見て質問に答えなさい。エレベーターが使えないのはいつですか。',
    questionId: 'Lihatlah poster pengumuman apartemen di bawah ini. Kapan lift tidak dapat digunakan?',
    stimulusDocJp: '【エレベーター定期点検のお知らせ】\n日時：11月15日（水）午前10:00 〜 午後14:00\n点検中はエレベーターの運転を停止いたします。大変ご不便をおかけしますが、階段をご利用ください。\nマンション管理組合',
    stimulusDocId: 'Pemberitahuan Inspeksi Rutin Lift: Tanggal 15 November (Rabu) Pk 10:00 - 14:00 siang. Selama inspeksi lift dimatikan, harap gunakan tangga darurat.',
    options: [
      { id: 'opt-a', textJp: '11月15日（水）の10:00から14:00まで', textId: '15 November (Rabu) dari pk 10:00 hingga 14:00' },
      { id: 'opt-b', textJp: '11月15日の夜間ずっと', textId: 'Sepanjang malam 15 November' },
      { id: 'opt-c', textJp: '毎日午前中', textId: 'Setiap hari di pagi hari' },
      { id: 'opt-d', textJp: 'エレベーターはいつでも使える', textId: 'Lift dapat digunakan kapan saja' },
    ],
    correctOptionId: 'opt-a',
    explanationId: 'Poster pengumuman secara eksplisit mencantumkan jadwal pemeriksaan berkala (Teiki tenken): 11月15日（水）午前10:00 〜 午後14:00.',
    canDoStatement: 'Mampu memahami pengumuman pemeliharaan fasilitas gedung dan apartemen tempat tinggal.',
  },
  {
    id: 'jft-s4-02',
    sectionId: 4,
    questionNumber: 8,
    questionJp: '風邪薬の箱の説明を読んでください。この薬は1日に何回飲みますか。',
    questionId: 'Bacalah petunjuk pada kemasan obat flu berikut. Berapa kali obat ini diminum dalam 1 hari?',
    stimulusDocJp: '【かぜ薬・服用方法】\n成人（15歳以上）：1回2錠、1日3回。\n※朝・昼・夕の食後なるべく30分以内に、水またはぬるま湯でお飲みください。\n※15歳未満は服用しないでください。',
    stimulusDocId: 'Petunjuk Obat Flu: Dewasa (15 tahun ke atas) 1 kali minum 2 tablet, 1 hari 3 kali. Minum setelah makan pagi/siang/malam dengan air putih. Di bawah 15 tahun dilarang minum.',
    options: [
      { id: 'opt-a', textJp: '1日3回（食後）', textId: '3 kali sehari (setelah makan)' },
      { id: 'opt-b', textJp: '1日1回だけ', textId: 'Hanya 1 kali sehari' },
      { id: 'opt-c', textJp: '1日5回（食前）', textId: '5 kali sehari sebelum makan' },
      { id: 'opt-d', textJp: '痛いときに何回でも', textId: 'Berapa kali saja saat merasa sakit' },
    ],
    correctOptionId: 'opt-a',
    explanationId: 'Pada petunjuk aturan minum (Fukuyou houhou) tertera jelas: 1回2錠、1日3回 (1 kali 2 tablet, 1 hari 3 kali setelah makan).',
    canDoStatement: 'Mampu membaca petunjuk aturan pakai obat bebas dan dosis harian.',
  },
];

interface JftBasicCbtModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCertificateIssued?: (score: number, passed: boolean) => void;
}

export const JftBasicCbtModal: React.FC<JftBasicCbtModalProps> = ({
  isOpen,
  onClose,
  onCertificateIssued,
}) => {
  const { showToast, incrementXp } = useAppStore();

  const [examState, setExamState] = useState<'briefing' | 'testing' | 'certificate' | 'review'>('briefing');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [activeSectionFilter, setActiveSectionFilter] = useState<JftSectionId | 'all'>('all');
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(3600); // 60 mins standard
  const [audioPlayCount, setAudioPlayCount] = useState<Record<string, number>>({});
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [showPaletteDrawer, setShowPaletteDrawer] = useState<boolean>(false);

  // Active question
  const currentQuestion = CANONICAL_JFT_QUESTIONS[currentQuestionIndex] || CANONICAL_JFT_QUESTIONS[0];
  const activeSectionMeta = JFT_SECTION_METAS[currentQuestion.sectionId];

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
    setAudioPlayCount({});
    setCurrentQuestionIndex(0);
    setTimeRemainingSeconds(3600); // 60 minutes official standard
    setExamState('testing');
    showToast('Ujian Resmi JFT-Basic CBT Dimulai (60 Menit). Semangat!', '🇯🇵');
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

  // Play audio for Choukai question (max 2 times per official JF standard)
  const handlePlayChoukaiAudio = (text: string) => {
    const played = audioPlayCount[currentQuestion.id] || 0;
    if (played >= 2) {
      showToast('Batas pemutaran audio JFT tercapai (Maksimal 2x per soal)', '⚠️');
      return;
    }

    setIsAudioPlaying(true);
    setAudioPlayCount((prev) => ({
      ...prev,
      [currentQuestion.id]: played + 1,
    }));

    speakJapanese(text);

    // Reset visual wave after 5 seconds
    setTimeout(() => {
      setIsAudioPlaying(false);
    }, 5000);
  };

  // Official JFT-Basic Scoring Evaluation: Scale 0 to 250 points, Pass >= 200
  const examResult = useMemo(() => {
    const totalQuestions = CANONICAL_JFT_QUESTIONS.length;
    let sectionScores: Record<JftSectionId, { correct: number; total: number; points: number }> = {
      1: { correct: 0, total: 0, points: 0 },
      2: { correct: 0, total: 0, points: 0 },
      3: { correct: 0, total: 0, points: 0 },
      4: { correct: 0, total: 0, points: 0 },
    };

    CANONICAL_JFT_QUESTIONS.forEach((q) => {
      sectionScores[q.sectionId].total += 1;
      if (userAnswers[q.id] === q.correctOptionId) {
        sectionScores[q.sectionId].correct += 1;
      }
    });

    // Compute proportional points per section towards 250 total
    let totalScorePoints = 0;
    ([1, 2, 3, 4] as JftSectionId[]).forEach((secId) => {
      const secMeta = JFT_SECTION_METAS[secId];
      const stats = sectionScores[secId];
      const pts = stats.total > 0 ? Math.round((stats.correct / stats.total) * secMeta.maxPoints) : 0;
      stats.points = pts;
      totalScorePoints += pts;
    });

    // Official Pass criterion: >= 200 / 250 points (80% standard)
    const passed = totalScorePoints >= 200;
    const percentage = Math.round((totalScorePoints / 250) * 100);

    return {
      passed,
      totalScorePoints,
      percentage,
      sectionScores,
    };
  }, [userAnswers]);

  const handleSubmitExam = () => {
    setExamState('certificate');
    if (examResult.passed) {
      playSuccessSfx();
      incrementXp(150);
      showToast('SELAMAT! Anda Dinyatakan LULUS JFT-Basic (総合合格)!', '🎉');
    } else {
      playErrorSfx();
      showToast('Hasil: Belum Memenuhi Ambang Batas 200 Poin (不合格). Pelajari kembali seksi yang lemah.', '⚠️');
    }

    if (onCertificateIssued) {
      onCertificateIssued(examResult.totalScorePoints, examResult.passed);
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
        {/* ── TOP TEST CENTER BAR ── */}
        <div className="bg-surface-3 border-b border-accent/20 p-3 sm:p-4 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-black text-xs sm:text-sm">
              JFT-BASIC CBT
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs font-bold text-appText-bright truncate">
                <span>Japan Foundation Test for Basic Japanese</span>
                <span className="px-1.5 py-0.5 rounded bg-surface text-[10px] text-accent font-mono">
                  Standar A2 · SSW
                </span>
              </div>
              <div className="text-[10px] text-appText-muted font-mono truncate">
                Peserta: SISWA NUGGET NIHONGO · No. Kursi: CBT-07
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {examState === 'testing' && (
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-black border tabular-nums ${
                  timeRemainingSeconds <= 300
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
              aria-label="Tutup Simulator JFT"
            >
              ✕
            </button>
          </div>
        </div>

        {/* ── STATE 1: CANDIDATE BRIEFING & 4 SECTIONS OVERVIEW ── */}
        {examState === 'briefing' && (
          <div className="p-4 sm:p-7 space-y-6 overflow-y-auto">
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold text-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Simulasi Resmi Ujian Standar Japan Foundation (JF)</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-appText-bright tracking-tight">
                JFT-Basic (Japan Foundation Test) CBT Simulator
              </h2>
              <p className="text-xs sm:text-sm text-appText-muted leading-relaxed">
                Ujian kemampuan bahasa Jepang komunikasi praktis (Can-do) yang diakui secara statutory oleh Imigrasi Jepang untuk pengajuan Visa Tokutei Ginou 1 (Specified Skilled Worker).
              </p>
            </div>

            {/* The 4 Official Sections Grid */}
            <div className="grid sm:grid-cols-2 gap-3">
              {([1, 2, 3, 4] as JftSectionId[]).map((secId) => {
                const sec = JFT_SECTION_METAS[secId];
                return (
                  <div
                    key={secId}
                    className="p-4 rounded-2xl bg-surface border border-accent/20 space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-appText-bright">
                      <span className="flex items-center gap-2">
                        <span className="text-xl">{sec.icon}</span>
                        <span>{sec.nameId}</span>
                      </span>
                      <span className="font-mono text-accent">{sec.maxPoints} Poin</span>
                    </div>
                    <p className="text-xs text-appText-muted leading-relaxed">
                      {sec.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Scoring & Exam Standard Banner */}
            <div className="bg-surface border border-accent/20 rounded-2xl p-4 sm:p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-extrabold text-appText-bright">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span>Kriteria Penilaian & Ambang Batas Kelulusan Resmi JFT-Basic</span>
              </div>

              <div className="grid sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-surface-2 border border-accent/15 space-y-1">
                  <div className="text-appText-muted text-[11px]">Total Skor Maksimal</div>
                  <div className="text-lg font-black text-appText-bright">250 Poin</div>
                </div>

                <div className="p-3 rounded-xl bg-surface-2 border border-accent/15 space-y-1">
                  <div className="text-appText-muted text-[11px]">Ambang Batas Kelulusan</div>
                  <div className="text-lg font-black text-emerald-400">≥ 200 Poin (80%)</div>
                </div>

                <div className="p-3 rounded-xl bg-surface-2 border border-accent/15 space-y-1">
                  <div className="text-appText-muted text-[11px]">Durasi Ujian Komputer</div>
                  <div className="text-lg font-black text-amber-400">60 Menit</div>
                </div>
              </div>

              <p className="text-[11px] text-appText-muted leading-relaxed">
                ℹ️ Peserta dapat berpindah antar soal di seluruh 4 seksi ujian. Pada seksi 3 (Choukai), audio dialog dapat diputar maksimal sebanyak 2 kali sesuai aturan resmi Japan Foundation.
              </p>
            </div>

            {/* Start Button */}
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={handleStartExam}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
              >
                <Award className="w-4 h-4" />
                <span>Mulai Ujian JFT-Basic CBT (60 Menit)</span>
              </button>
            </div>
          </div>
        )}

        {/* ── STATE 2: ACTIVE JFT-BASIC CBT TEST INTERFACE ── */}
        {examState === 'testing' && (
          <div className="flex-1 flex flex-col p-4 sm:p-6 space-y-4 overflow-y-auto">
            {/* Section Tab Switcher & Flag Bar */}
            <div className="flex items-center justify-between gap-2 bg-surface p-2.5 sm:p-3 rounded-2xl border border-accent/15 overflow-x-auto scrollbar-none">
              <div className="flex items-center gap-1.5 shrink-0">
                {([1, 2, 3, 4] as JftSectionId[]).map((secId) => {
                  const isCurrentSection = currentQuestion.sectionId === secId;
                  const secMeta = JFT_SECTION_METAS[secId];

                  return (
                    <button
                      key={secId}
                      type="button"
                      onClick={() => {
                        const targetIdx = CANONICAL_JFT_QUESTIONS.findIndex((q) => q.sectionId === secId);
                        if (targetIdx !== -1) setCurrentQuestionIndex(targetIdx);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 ${
                        isCurrentSection
                          ? 'bg-emerald-500 text-stone-950 font-black shadow-sm'
                          : 'bg-surface-2 text-appText-muted hover:text-appText-bright'
                      }`}
                    >
                      <span>{secMeta.icon}</span>
                      <span className="hidden sm:inline">{secMeta.nameJp}</span>
                      <span className="sm:hidden">S{secId}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {/* Flag for review */}
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
                  <span className="hidden sm:inline">{flaggedQuestions[currentQuestion.id] ? 'Ditandai (見直し)' : 'Tandai'}</span>
                </button>

                {/* Palette Drawer Toggle */}
                <button
                  type="button"
                  onClick={() => setShowPaletteDrawer(!showPaletteDrawer)}
                  className="px-3 py-1.5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-accent/20 text-xs font-bold text-appText-bright flex items-center gap-1.5"
                >
                  <Layers className="w-3.5 h-3.5 text-accent" />
                  <span>Palet Soal</span>
                </button>
              </div>
            </div>

            {/* Question Palette Drawer (Collapsible) */}
            {showPaletteDrawer && (
              <div className="bg-surface-3 border border-accent/25 rounded-2xl p-3.5 space-y-2 animate-fade-in">
                <div className="text-[11px] font-bold text-appText-muted uppercase tracking-wider flex items-center justify-between">
                  <span>Daftar Navigasi Seluruh Soal (1..{CANONICAL_JFT_QUESTIONS.length})</span>
                  <span className="text-[10px] text-accent font-normal">
                    Klik nomor untuk lompat langsung ke soal
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {CANONICAL_JFT_QUESTIONS.map((q, idx) => {
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
                            ? 'bg-emerald-500 text-stone-950 font-black'
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

            {/* Choukai Audio Player Control Card (Seksi 3 Only) */}
            {currentQuestion.sectionId === 3 && currentQuestion.audioDialogueJp && (
              <div className="bg-surface border border-emerald-500/30 rounded-2xl p-4 sm:p-5 space-y-3 shadow-sm">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
                  <span className="flex items-center gap-2">
                    <Headphones className="w-4 h-4" />
                    <span>Audio Pemahaman Percakapan (聴解音声)</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-surface-2 text-[10px] text-appText-muted font-mono">
                    Pemutaran: {audioPlayCount[currentQuestion.id] || 0} / 2 Kali
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handlePlayChoukaiAudio(currentQuestion.audioDialogueJp || '')}
                    disabled={(audioPlayCount[currentQuestion.id] || 0) >= 2}
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:pointer-events-none text-stone-950 font-black text-xs flex items-center gap-2 shadow-sm transition-all active:scale-95"
                  >
                    <Play className="w-4 h-4 fill-stone-950" />
                    <span>Putar Audio Percakapan</span>
                  </button>

                  {isAudioPlaying && (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold animate-pulse">
                      <Volume2 className="w-4 h-4" />
                      <span>Sedang memutar audio…</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Dokkai Stimulus Document Panel (Seksi 4 Only) */}
            {currentQuestion.sectionId === 4 && currentQuestion.stimulusDocJp && (
              <div className="bg-surface border border-accent/25 rounded-2xl p-4 sm:p-5 space-y-2">
                <div className="flex items-center justify-between text-xs text-accent font-bold">
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Dokumen / Papan Informasi Nyata (読解資料)</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => speakJapanese(currentQuestion.stimulusDocJp || '')}
                    className="p-1 rounded hover:bg-surface-2 text-accent"
                    title="Dengarkan Teks Dokumen"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-3.5 rounded-xl bg-surface-2 font-jp text-sm sm:text-base leading-relaxed whitespace-pre-line text-appText-bright border border-accent/15">
                  {currentQuestion.stimulusDocJp}
                </div>
                {currentQuestion.stimulusDocId && (
                  <p className="text-xs text-appText-muted pt-1">
                    🇮🇩 Ringkasan Dokumen: {currentQuestion.stimulusDocId}
                  </p>
                )}
              </div>
            )}

            {/* Question Card */}
            <div className="bg-surface-2 border border-accent/20 rounded-2xl p-4 sm:p-5 space-y-2">
              <div className="flex items-center justify-between text-xs text-accent font-bold">
                <span>Soal {currentQuestionIndex + 1} ({activeSectionMeta.nameId}):</span>
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
              <p className="text-xs text-appText-muted">
                🇮🇩 {currentQuestion.questionId}
              </p>
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
                        ? 'bg-emerald-500/20 border-emerald-500 text-appText-bright ring-2 ring-emerald-500 font-bold shadow-md'
                        : 'bg-surface hover:bg-surface-3 border-accent/20 text-appText'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-black shrink-0 mt-0.5 ${
                        isSelected
                          ? 'bg-emerald-500 text-stone-950'
                          : 'bg-surface-2 text-appText-muted border border-accent/20'
                      }`}
                    >
                      {optIdx + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-jp text-sm sm:text-base leading-normal">{opt.textJp}</div>
                      <div className="text-xs text-appText-muted mt-0.5 leading-normal">
                        {opt.textId}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation Actions */}
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

              {currentQuestionIndex < CANONICAL_JFT_QUESTIONS.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-xs flex items-center gap-1.5 transition-all shadow-sm"
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
                  <span>Selesaikan & Kumpulkan Ujian JFT</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* ── STATE 3: OFFICIAL JFT-BASIC SCORE CERTIFICATE ── */}
        {examState === 'certificate' && (
          <div className="p-4 sm:p-7 space-y-6 overflow-y-auto">
            {/* Stamp Banner */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-surface-3 border border-accent/20 text-xs font-mono text-appText-muted">
                <span>OFFICIAL JAPAN FOUNDATION JFT-BASIC SCORE REPORT</span>
              </div>

              {examResult.passed ? (
                <div className="space-y-1">
                  <div className="inline-block p-3 rounded-full bg-emerald-500/15 border-2 border-emerald-500 text-emerald-400">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h2 className="text-3xl font-black text-emerald-400 tracking-tight font-jp">
                    総合判定: 判定基準到達 (合格)
                  </h2>
                  <p className="text-xs sm:text-sm text-appText-muted">
                    Selamat! Anda meraih skor {examResult.totalScorePoints} / 250 poin (≥ 200 poin) dan dinyatakan memenuhi syarat bahasa Jepang Visa Tokutei Ginou 1 (SSW)!
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="inline-block p-3 rounded-full bg-rose-500/15 border-2 border-rose-500 text-rose-400">
                    <XCircle className="w-12 h-12" />
                  </div>
                  <h2 className="text-3xl font-black text-rose-400 tracking-tight font-jp">
                    総合判定: 判定基準未達 (不合格)
                  </h2>
                  <p className="text-xs sm:text-sm text-appText-muted">
                    Skor Anda {examResult.totalScorePoints} / 250 poin (belum mencapai ambang batas minimal 200 poin).
                  </p>
                </div>
              )}
            </div>

            {/* Official Digital Certificate Paper */}
            <div className="relative bg-gradient-to-b from-stone-900 to-stone-950 border-2 border-emerald-500/40 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-5 overflow-hidden">
              <div className="absolute top-3 right-4 opacity-10 text-8xl font-black font-jp select-none pointer-events-none">
                JFT
              </div>

              <div className="border-b border-emerald-500/20 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] text-emerald-400 font-mono tracking-wider uppercase">
                    Lembaga Penyelenggara Resmi:
                  </div>
                  <div className="text-base font-extrabold text-appText-bright">
                    国際交流基金 (The Japan Foundation)
                  </div>
                  <div className="text-xs text-appText-muted">
                    Japan Foundation Test for Basic Japanese (JFT-Basic)
                  </div>
                </div>

                <div className="text-left sm:text-right font-mono text-xs">
                  <div className="text-appText-muted text-[10px]">TOTAL SKOR RESMI:</div>
                  <div className="text-2xl font-black text-emerald-400">
                    {examResult.totalScorePoints} <span className="text-sm font-normal text-appText-muted">/ 250</span>
                  </div>
                  <div className="text-[10px] text-appText-muted mt-0.5">
                    Ambang Batas Lulus: ≥ 200 Poin
                  </div>
                </div>
              </div>

              {/* 4 Section Score Breakdown */}
              <div className="grid sm:grid-cols-2 gap-3">
                {([1, 2, 3, 4] as JftSectionId[]).map((secId) => {
                  const secMeta = JFT_SECTION_METAS[secId];
                  const stats = examResult.sectionScores[secId];

                  return (
                    <div
                      key={secId}
                      className="p-3.5 rounded-2xl bg-surface/80 border border-accent/15 space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-appText-bright">{secMeta.nameId}</span>
                        <span className="font-mono text-emerald-400 font-black">
                          {stats.points} / {secMeta.maxPoints} Poin
                        </span>
                      </div>
                      <div className="w-full h-2 bg-surface-2 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all"
                          style={{ width: `${Math.round((stats.points / secMeta.maxPoints) * 100)}%` }}
                        />
                      </div>
                      <div className="text-[10px] text-appText-muted flex justify-between">
                        <span>Akurasi Soal</span>
                        <span>{stats.correct} / {stats.total} Soal Benar</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Certificate Verification Footer */}
              <div className="pt-2 border-t border-accent/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] text-appText-muted font-mono">
                <div>HASH VALIDASI: JF-JFT-2026-NUGGET-CBT-A28F9E</div>
                <div>LOKASI UJIAN: JAKARTA CBT CENTER #02</div>
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
                <span>Tinjau Kunci Jawaban & Pembahasan Can-do</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleStartExam}
                  className="px-4 py-2.5 rounded-xl bg-surface hover:bg-surface-3 border border-accent/25 text-appText font-bold text-xs flex items-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4 text-accent" />
                  <span>Ulangi Simulasi</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-xs"
                >
                  Selesai
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── STATE 4: DETAILED EXAM REVIEW ── */}
        {examState === 'review' && (
          <div className="p-4 sm:p-7 space-y-6 overflow-y-auto">
            <div className="flex items-center justify-between gap-3 border-b border-accent/15 pb-4">
              <div>
                <h3 className="text-base font-extrabold text-appText-bright">
                  Pembahasan Can-Do Ujian JFT-Basic CBT
                </h3>
                <p className="text-xs text-appText-muted mt-0.5">
                  Analisis kompetensi komunikasi praktis JF Standard A1/A2.
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
              {CANONICAL_JFT_QUESTIONS.map((q, idx) => {
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
                        Soal {idx + 1} · {JFT_SECTION_METAS[q.sectionId].nameJp}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                          isCorrect
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {isCorrect ? 'Benar' : 'Salah'}
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

                    {/* Explanation */}
                    <div className="p-3 rounded-xl bg-surface-2 border border-accent/15 space-y-1 text-xs">
                      <div className="font-bold text-accent flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Penjelasan & Deskriptor Can-Do:</span>
                      </div>
                      <p className="text-appText-muted leading-relaxed">
                        {q.explanationId}
                      </p>
                      <div className="text-[10px] text-emerald-400 font-bold pt-1">
                        🎯 Can-Do: {q.canDoStatement}
                      </div>
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
