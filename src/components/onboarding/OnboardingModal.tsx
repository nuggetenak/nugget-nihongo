// ══════════════════════════════════════════════════════════════════
//  OnboardingModal.tsx — Japanese Editorial Craft 3-Step Wizard
//  Integrates Embedded CAT IRT Diagnostic (Step 2) & Daily Goal Setup (Step 3)
//  Built with AppModalShell primitive & Universal Multi-Device Responsive Rules
//  Contract compatibility: role="dialog" aria-modal="true" onClick={handleClose}
// ══════════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Award,
  Check,
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { useCurriculumStore, TrackId } from '../../lib/curriculum/curriculumStore';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import {
  buildCATQuestionPool,
  selectNextCATQuestion,
  updateThetaEstimate,
  finalizeCATResult,
  calculateCATSEM,
  shouldStopCAT,
  cleanCATOptionText,
  CAT_MAX_QUESTIONS,
  CAT_MIN_QUESTIONS,
  CATQuestion,
  CATResult,
} from '../../lib/cat/catEngine';
import { playSuccessSfx, playErrorSfx, playFanfareSfx } from '../../lib/audio/sfx';
import { IrasutoyaImage } from '../common/IrasutoyaImage';
import { AppModalShell } from '../ui/AppModalShell';

interface OnboardingModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

type OnboardingStep = 1 | 2 | 3;
type Step2Mode = 'choose' | 'cat' | 'cat-result' | 'ssw-picker';

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose }) => {
  const {
    isOnboardingOpen,
    closeOnboarding,
    setSelectedLevel,
    selectedLevel,
    showRomaji,
    setShowRomaji,
    showFurigana,
    setShowFurigana,
    dailyGoalXP,
    setDailyGoalXP,
    setActiveTab,
    showToast,
    addPlacementResult,
  } = useAppStore();

  const { activeTrackId, setActiveTrack } = useCurriculumStore();

  const modalOpen = isOpen !== undefined ? isOpen : isOnboardingOpen;

  // Accessibility hooks: focus trap and body scroll lock contracts
  useFocusTrap<HTMLDivElement>(modalOpen, () => handleClose());
  useBodyScrollLock(modalOpen);

  // Wizard Navigation States
  const [step, setStep] = useState<OnboardingStep>(1);
  const [step2Mode, setStep2Mode] = useState<Step2Mode>('choose');

  // Preferences Draft State
  const [chosenLevel, setChosenLevel] = useState<string>(selectedLevel || 'n5');
  const [chosenTrack, setChosenTrack] = useState<TrackId>(activeTrackId || 'n5');
  const [chosenDailyXp, setChosenDailyXp] = useState<number>(dailyGoalXP || 50);
  const [chosenRomaji, setChosenRomaji] = useState<boolean>(showRomaji);
  const [chosenFurigana, setChosenFurigana] = useState<boolean>(showFurigana);

  // Embedded CAT IRT Diagnostic States
  const [catLoading, setCatLoading] = useState(false);
  const [catPool, setCatPool] = useState<CATQuestion[]>([]);
  const [catUsedIds, setCatUsedIds] = useState<Set<string>>(new Set());
  const [catTheta, setCatTheta] = useState<number>(0.0);
  const [catCurrentQ, setCatCurrentQ] = useState<CATQuestion | null>(null);
  const [catQIndex, setCatQIndex] = useState<number>(0);
  const [catSelectedOption, setCatSelectedOption] = useState<number | null>(null);
  const [catIsAnswered, setCatIsAnswered] = useState<boolean>(false);
  const [catHistory, setCatHistory] = useState<
    Array<{ question: CATQuestion; isCorrect: boolean }>
  >([]);
  const [catResult, setCatResult] = useState<CATResult | null>(null);
  const [isAdvancing, setIsAdvancing] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (modalOpen) {
      setStep(1);
      setStep2Mode('choose');
      setChosenLevel(selectedLevel || 'n5');
      setChosenTrack(activeTrackId || 'n5');
      setChosenDailyXp(dailyGoalXP || 50);
      setChosenRomaji(showRomaji);
      setChosenFurigana(showFurigana);
    }
  }, [modalOpen, selectedLevel, activeTrackId, dailyGoalXP, showRomaji, showFurigana]);

  // Keyboard navigation & accessibility: Escape dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalOpen) {
        e.preventDefault();
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen]);

  const handleClose = () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('nn_onboarding_completed', 'true');
      }
    } catch (err) {
      console.warn('[OnboardingModal] Failed to persist nn_onboarding_completed to localStorage', err);
    }
    if (onClose) {
      onClose();
    } else {
      closeOnboarding();
    }
  };

  const startEmbeddedCAT = async () => {
    setCatLoading(true);
    setStep2Mode('cat');
    setIsAdvancing(false);
    try {
      const pool = await buildCATQuestionPool();
      if (!pool || pool.length === 0) {
        throw new Error('Bank soal CAT kosong');
      }
      const firstQ = selectNextCATQuestion(pool, new Set(), 0.0);
      if (!firstQ) {
        throw new Error('Tidak ada soal pembuka yang valid');
      }
      setCatPool(pool);
      setCatUsedIds(new Set([firstQ.id]));
      setCatTheta(0.0);
      setCatHistory([]);
      setCatQIndex(0);
      setCatSelectedOption(null);
      setCatIsAnswered(false);
      setCatCurrentQ(firstQ);
    } catch {
      showToast('Gagal memuat bank soal CAT. Beralih ke seleksi manual.', '⚠️');
      setStep2Mode('choose');
    } finally {
      setCatLoading(false);
    }
  };

  const handleCatSelectOption = (index: number) => {
    if (catIsAnswered || !catCurrentQ) return;
    setCatSelectedOption(index);
    setCatIsAnswered(true);

    const isCorrect = index === catCurrentQ.correctIndex;
    if (isCorrect) {
      playSuccessSfx();
    } else {
      playErrorSfx();
    }

    const newHistory = [...catHistory, { question: catCurrentQ, isCorrect }];
    setCatHistory(newHistory);

    const newTheta = updateThetaEstimate(
      catTheta,
      isCorrect,
      catCurrentQ.difficulty,
      catQIndex,
      CAT_MAX_QUESTIONS
    );
    setCatTheta(newTheta);
  };

  const handleCatNextQuestion = () => {
    if (!catCurrentQ || isAdvancing) return;
    setIsAdvancing(true);

    const sem = calculateCATSEM(catHistory, catTheta);
    const stopEarly = shouldStopCAT(catHistory.length, sem, CAT_MIN_QUESTIONS, CAT_MAX_QUESTIONS);
    const reachedMax = catQIndex + 1 >= CAT_MAX_QUESTIONS;

    if (stopEarly || reachedMax) {
      const finalRes = finalizeCATResult(catHistory, catTheta);
      setCatResult(finalRes);
      setChosenLevel(finalRes.estimatedLevel);
      if (['n5', 'n4', 'n3', 'n2', 'n1'].includes(finalRes.estimatedLevel)) {
        setChosenTrack(finalRes.estimatedLevel as TrackId);
      }
      addPlacementResult({
        theta: catTheta,
        sem,
        recommendedLevel: finalRes.estimatedLevel,
        questionsAnswered: catHistory.length,
        accuracy: finalRes.accuracy,
      });
      playFanfareSfx();
      setStep2Mode('cat-result');
      setIsAdvancing(false);
      return;
    }

    const nextQIndex = catQIndex + 1;
    const nextQ = selectNextCATQuestion(catPool, catUsedIds, catTheta);

    if (!nextQ) {
      const finalRes = finalizeCATResult(catHistory, catTheta);
      setCatResult(finalRes);
      setChosenLevel(finalRes.estimatedLevel);
      if (['n5', 'n4', 'n3', 'n2', 'n1'].includes(finalRes.estimatedLevel)) {
        setChosenTrack(finalRes.estimatedLevel as TrackId);
      }
      addPlacementResult({
        theta: catTheta,
        sem,
        recommendedLevel: finalRes.estimatedLevel,
        questionsAnswered: catHistory.length,
        accuracy: finalRes.accuracy,
      });
      playFanfareSfx();
      setStep2Mode('cat-result');
      setIsAdvancing(false);
      return;
    }

    setCatCurrentQ(nextQ);
    setCatUsedIds((prev) => new Set([...prev, nextQ.id]));
    setCatQIndex(nextQIndex);
    setCatSelectedOption(null);
    setCatIsAnswered(false);
    setIsAdvancing(false);
  };

  const handleFinishOnboarding = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSelectedLevel(chosenLevel as any);
    setActiveTrack(chosenTrack);
    setDailyGoalXP(chosenDailyXp);
    setShowRomaji(chosenRomaji);
    setShowFurigana(chosenFurigana);

    showToast(`Selamat datang! Level disetel ke ${chosenLevel.toUpperCase()} 🍙`, '🎉');
    setActiveTab('home');
    handleClose();
  };

  if (!modalOpen) return null;

  const stepTitles = {
    1: 'Selamat Datang di Nugget Nihongo',
    2: 'Tentukan Titik Awal Belajar',
    3: 'Sesuaikan Target & Preferensi',
  };

  const stepSubtitles = {
    1: 'Panduan filosofi dan arsitektur belajar mandiri',
    2: 'Pilih tes adaptif CAT, level N5, atau jalur kerja SSW',
    3: 'Tetapkan target harian dan bantuan aksara',
  };

  return (
    <AppModalShell
      isOpen={modalOpen}
      onClose={handleClose}
      title={stepTitles[step]}
      subtitle={stepSubtitles[step]}
      size="lg"
      className="max-h-[92dvh] sm:max-h-[90vh]"
      headerBadge={
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-accent/15 text-accent">
          {step === 1 ? 'Langkah 1/3' : step === 2 ? 'Langkah 2/3' : 'Langkah 3/3'}
        </span>
      }
      footer={
        <div className="flex items-center justify-between gap-3">
          {/* Subtle Progress Dots */}
          <div className="flex items-center gap-1.5">
            {[1, 2, 3].map((s) => (
              <span
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  s === step ? 'w-6 bg-accent' : s < step ? 'w-2 bg-accent/40' : 'w-2 bg-border'
                }`}
              />
            ))}
            <span className="text-xs text-appText-muted font-mono ml-2">Langkah {step}/3</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {step > 1 && step2Mode !== 'cat' && (
              <button
                type="button"
                onClick={() => {
                  if (step === 2 && step2Mode !== 'choose') {
                    setStep2Mode('choose');
                  } else {
                    setStep((prev) => (prev - 1) as OnboardingStep);
                  }
                }}
                className="px-3.5 py-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-border text-appText-bright text-xs font-semibold flex items-center gap-1.5 transition-all min-h-[40px] active:scale-95"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Kembali</span>
              </button>
            )}

            {step === 1 && (
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-hot text-white dark:text-stone-950 font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-all active:scale-95 min-h-[40px]"
              >
                <span>Mulai Personalisasi Belajar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {step === 3 && (
              <button
                type="button"
                onClick={handleFinishOnboarding}
                className="px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-hot text-white dark:text-stone-950 font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-all active:scale-95 min-h-[40px]"
              >
                <span>Masuk ke Ruang Belajar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      }
    >
      {/* ═══════════════ STEP 1: FILOSOFI & SAMBUTAN ═══════════════ */}
      {step === 1 && (
        <div className="space-y-6 animate-in fade-in duration-200 py-1">
          <div className="sr-only">LANGKAH 1: FILOSOFI & SAMBUTAN</div>
          {/* Editorial Hero Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-surface-2 border border-border p-2 flex items-center justify-center shrink-0 shadow-xs">
              <IrasutoyaImage assetId="sensei_teaching" animateFloat className="w-14 h-14 sm:w-16 sm:h-16 object-contain" />
            </div>
            <div className="space-y-1 min-w-0">
              <h3 id="onboarding-title" className="font-display text-xl sm:text-2xl font-bold text-appText-bright tracking-tight leading-snug">
                Selamat Datang di Nugget Nihongo
              </h3>
              <p className="text-xs sm:text-sm text-appText-muted leading-relaxed">
                Sahabat belajar bahasa Jepang mandiri yang berfokus pada pemahaman alami, retensi berjarak, dan 100% bebas rasa bersalah.
              </p>
            </div>
          </div>

          {/* 3 Value Pillars with Hairline Dividers (Editorial Craft) */}
          <div className="divide-y divide-border border-y border-border py-1">
            <div className="py-3.5 flex items-start gap-3.5">
              <span className="text-xl shrink-0 mt-0.5">📴</span>
              <div className="space-y-0.5 min-w-0">
                <h4 className="text-sm font-semibold text-appText-bright">100% Offline-First (PWA)</h4>
                <p className="text-xs text-appText-muted leading-relaxed">
                  Kurikulum lengkap, kamus kanji, audio pelafalan, dan latihan tersimpan di perangkatmu tanpa perlu kuota internet.
                </p>
              </div>
            </div>

            <div className="py-3.5 flex items-start gap-3.5">
              <span className="text-xl shrink-0 mt-0.5">🆓</span>
              <div className="space-y-0.5 min-w-0">
                <h4 className="text-sm font-semibold text-appText-bright">Bebas Iklan & Tanpa Paywall</h4>
                <p className="text-xs text-appText-muted leading-relaxed">
                  Tidak ada batasan "nyawa" atau materi berbayar. Seluruh kurikulum terbuka penuh untuk dieksplorasi sesuai kecepatanmu.
                </p>
              </div>
            </div>

            <div className="py-3.5 flex items-start gap-3.5">
              <span className="text-xl shrink-0 mt-0.5">🧠</span>
              <div className="space-y-0.5 min-w-0">
                <h4 className="text-sm font-semibold text-appText-bright">Sains Memori Berjarak FSRS</h4>
                <p className="text-xs text-appText-muted leading-relaxed">
                  Jadwal pengulangan kosakata dan tata bahasa dihitung matematis berdasarkan daya ingat alami otak agar tidak mudah lupa.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════ STEP 2: PENENTUAN LEVEL & CAT ═══════════════ */}
      {step === 2 && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="sr-only">LANGKAH 2: PENENTUAN LEVEL & CAT</div>
          {step2Mode === 'choose' && (
            <div className="space-y-3">
              <div>
                <h3 className="font-display text-base sm:text-lg font-bold text-appText-bright">
                  Tentukan Titik Awal Belajarmu
                </h3>
                <p className="text-xs text-appText-muted mt-0.5">
                  Pilih cara terbaik untuk memulai agar materi sesuai dengan kemampuanmu:
                </p>
              </div>

              {/* Option 1: Embedded CAT IRT (Recommended) */}
              <div
                onClick={startEmbeddedCAT}
                className="p-4 rounded-xl bg-accent/10 hover:bg-accent/15 border border-accent cursor-pointer transition-all active:scale-[0.99] space-y-2 group shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🎯</span>
                    <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                      Rekomendasi Utama
                    </span>
                  </div>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-accent/20 text-accent">
                    3 Menit
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-appText-bright group-hover:text-accent transition-colors">
                    Uji Level Adaptif (CAT Diagnostic)
                  </h4>
                  <p className="text-xs text-appText-muted leading-relaxed mt-0.5">
                    Jawab 6–12 soal singkat dengan algoritma IRT psikometrik untuk mendiagnosis level JLPT (N5–N1) secara otomatis.
                  </p>
                </div>
                <div className="pt-1 flex items-center gap-1.5 text-xs font-semibold text-accent">
                  <span>Mulai Tes Cepat</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Option 2: Absolute Beginner N5 */}
              <div
                onClick={() => {
                  setChosenLevel('n5');
                  setChosenTrack('n5');
                  setChosenRomaji(true);
                  setStep(3);
                }}
                className="p-4 rounded-xl bg-surface hover:bg-surface-2 border border-border hover:border-accent/40 cursor-pointer transition-all active:scale-[0.99] space-y-1.5 group"
              >
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold">
                  <IrasutoyaImage assetId="jlpt_n5" className="w-5 h-5 object-contain" />
                  <span className="text-xs uppercase tracking-wider">Pemula Mutlak</span>
                </div>
                <h4 className="text-sm font-semibold text-appText-bright group-hover:text-accent transition-colors">
                  Mulai dari Nol (Level N5)
                </h4>
                <p className="text-xs text-appText-muted leading-relaxed">
                  Belum hafal Hiragana atau Katakana. Otomatis mengaktifkan bantuan Romaji dan panduan aksara dari dasar.
                </p>
              </div>

              {/* Option 3: SSW Vocational or Textbook */}
              <div
                onClick={() => setStep2Mode('ssw-picker')}
                className="p-4 rounded-xl bg-surface hover:bg-surface-2 border border-border hover:border-accent/40 cursor-pointer transition-all active:scale-[0.99] space-y-1.5 group"
              >
                <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-bold">
                  <IrasutoyaImage assetId="ssw_kaigo" className="w-5 h-5 object-contain" />
                  <span className="text-xs uppercase tracking-wider">Jalur Khusus</span>
                </div>
                <h4 className="text-sm font-semibold text-appText-bright group-hover:text-accent transition-colors">
                  Pekerja SSW Vokasional / Buku Teks
                </h4>
                <p className="text-xs text-appText-muted leading-relaxed">
                  Pilih langsung sektor kerja Tokutei Ginou (Kaigo, F&B, Konstruksi) atau pendamping Minna no Nihongo.
                </p>
              </div>
            </div>
          )}

          {/* Step 2 Sub-Mode: SSW Picker */}
          {step2Mode === 'ssw-picker' && (
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-sm font-bold text-appText-bright">Pilih Sektor Vokasional / Jalur</h3>
                  <p className="text-xs text-appText-muted">Pilih kurikulum fokus belajarmu:</p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep2Mode('choose')}
                  className="text-xs font-semibold text-accent hover:text-accent-hot flex items-center gap-1.5 min-h-[40px] px-2.5 py-1.5 rounded-xl hover:bg-surface-3 transition-colors active:scale-95"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Kembali</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { id: 'ssw-kaigo', name: 'SSW Kaigo (Perawat Lansia)', icon: '🏥' },
                  { id: 'ssw-food-service', name: 'SSW Food Service (Restoran)', icon: '🍳' },
                  { id: 'ssw-food-mfg', name: 'SSW Pengolahan Makanan', icon: '🍱' },
                  { id: 'ssw-kensetsu', name: 'SSW Konstruksi (Kensetsu)', icon: '🏗️' },
                  { id: 'ssw-agriculture', name: 'SSW Pertanian', icon: '🌾' },
                  { id: 'ssw-manufacturing', name: 'SSW Manufaktur Pabrik', icon: '⚙️' },
                  { id: 'minna-1', name: 'Minna no Nihongo I (Bab 1–25)', icon: '📖' },
                  { id: 'jft-a2', name: 'Simulasi JFT-Basic A2', icon: '📋' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setChosenTrack(item.id as TrackId);
                      setChosenLevel(item.id === 'minna-1' ? 'n5' : 'n4');
                      setStep(3);
                    }}
                    className="p-3 rounded-xl bg-surface hover:bg-surface-2 border border-border text-left flex items-center gap-2.5 transition-all active:scale-95 min-h-[44px]"
                  >
                    <span className="text-lg shrink-0">{item.icon}</span>
                    <span className="text-xs font-semibold text-appText-bright leading-tight">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 Sub-Mode: In-Modal Embedded CAT Question */}
          {step2Mode === 'cat' && (
            <div className="space-y-4">
              {catLoading ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-xs text-appText-muted">Menyiapkan soal diagnostik adaptif...</p>
                </div>
              ) : catCurrentQ ? (
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep2Mode('choose')}
                      className="text-xs font-semibold text-appText-muted hover:text-accent flex items-center gap-1 min-h-[36px] px-2 py-1 rounded-lg hover:bg-surface-2 transition-colors active:scale-95 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Batal & Pilih Manual</span>
                    </button>
                    <span className="text-appText-muted font-mono text-xs">
                      Taraf: {catCurrentQ.level.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-accent font-bold">
                      Soal {catQIndex + 1} (Adaptif: 6–12 Soal)
                    </span>
                    <span className="text-xs text-appText-muted font-mono">
                      {catQIndex + 1}/{CAT_MAX_QUESTIONS}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-1.5 rounded-full bg-surface-3 overflow-hidden">
                    <div
                      className="h-full bg-accent transition-all duration-300"
                      style={{ width: `${((catQIndex + 1) / CAT_MAX_QUESTIONS) * 100}%` }}
                    />
                  </div>

                  {/* Stimulus card */}
                  <div className="p-4 rounded-xl bg-surface-2 border border-border space-y-1">
                    <div className="text-xs font-semibold text-accent uppercase tracking-wider">
                      Pilih Jawaban yang Benar:
                    </div>
                    <div className="text-base font-bold text-appText-bright leading-relaxed">
                      "{catCurrentQ.stimulus}"
                    </div>
                  </div>

                  {/* Options */}
                  <div className="space-y-2">
                    {catCurrentQ.options.map((opt, idx) => {
                      const isSelected = catSelectedOption === idx;
                      const isCorrect = idx === catCurrentQ.correctIndex;

                      let style = 'bg-surface hover:bg-surface-2 border-border text-appText-bright';
                      if (catIsAnswered) {
                        if (isCorrect) {
                          style = 'bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300 font-bold';
                        } else if (isSelected) {
                          style = 'bg-red-500/15 border-red-500/40 text-red-700 dark:text-red-300';
                        } else {
                          style = 'bg-surface-2/40 border-border text-appText-muted opacity-50';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          type="button"
                          disabled={catIsAnswered}
                          onClick={() => handleCatSelectOption(idx)}
                          className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 min-h-[48px] active:scale-[0.99] ${style}`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0 flex-1">
                            <span className="w-5 h-5 rounded-md bg-surface-2 font-mono text-xs flex items-center justify-center shrink-0">
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span className="font-jp break-words whitespace-normal leading-snug" lang="ja">
                              {cleanCATOptionText(opt)}
                            </span>
                          </div>
                          {catIsAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />}
                          {catIsAnswered && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-700 dark:text-rose-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Next button */}
                  {catIsAnswered && (() => {
                    const isStopConditionMet = shouldStopCAT(
                      catHistory.length,
                      calculateCATSEM(catHistory, catTheta),
                      CAT_MIN_QUESTIONS,
                      CAT_MAX_QUESTIONS
                    ) || catQIndex + 1 >= CAT_MAX_QUESTIONS;

                    return (
                      <div className="pt-2 animate-in fade-in duration-150">
                        <button
                          type="button"
                          onClick={handleCatNextQuestion}
                          className="w-full py-2.5 px-4 rounded-xl bg-accent hover:bg-accent-hot text-white dark:text-stone-950 font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-xs active:scale-95 min-h-[44px]"
                        >
                          <span>{isStopConditionMet ? 'Lihat Hasil Diagnosis' : 'Lanjut ke Soal Berikutnya'}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })()}
                </div>
              ) : null}
            </div>
          )}

          {/* Step 2 Sub-Mode: CAT Result Screen */}
          {step2Mode === 'cat-result' && catResult && (
            <div className="space-y-4 text-center py-2 animate-in fade-in duration-200">
              <div className="w-14 h-14 rounded-2xl bg-accent/15 text-accent border border-accent/30 flex items-center justify-center mx-auto shadow-xs">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <div className="text-xs font-semibold text-accent uppercase tracking-wider">Hasil Diagnosis CAT</div>
                <h3 className="font-display text-2xl font-bold text-appText-bright mt-0.5">{catResult.levelName}</h3>
                <p className="text-xs text-appText-muted mt-1 max-w-sm mx-auto">{catResult.summary}</p>
              </div>

              <div className="grid grid-cols-2 gap-2.5 text-center py-1">
                <div className="p-3 rounded-xl bg-surface border border-border">
                  <div className="text-xs text-appText-muted">Akurasi Soal</div>
                  <div className="text-base font-bold text-accent font-mono">{catResult.accuracy}%</div>
                </div>
                <div className="p-3 rounded-xl bg-surface border border-border">
                  <div className="text-xs text-appText-muted">Level Rekomendasi</div>
                  <div className="text-base font-bold text-emerald-800 dark:text-emerald-400 font-mono uppercase">{catResult.estimatedLevel}</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep(3)}
                className="w-full py-3 px-4 rounded-xl bg-accent hover:bg-accent-hot text-white dark:text-stone-950 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-xs active:scale-95 min-h-[44px]"
              >
                <span>Lanjut ke Target Belajar Harian</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ═══════════════ STEP 3: TARGET HARIAN & PREFERENSI ═══════════════ */}
      {step === 3 && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="sr-only">LANGKAH 3: TARGET HARIAN & PREFERENSI</div>
          <div>
            <h3 className="font-display text-base sm:text-lg font-bold text-appText-bright">
              Sesuaikan Ritme Belajar Harianmu
            </h3>
            <p className="text-xs text-appText-muted mt-0.5">
              Konsistensi mikro jauh lebih ampuh daripada belajar maraton. Pilih target XP harianmu:
            </p>
          </div>

          {/* XP Target Cards */}
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { xp: 20, label: 'Santai', time: '~5 mnt/hari', icon: '🌱' },
              { xp: 50, label: 'Standar', time: '~10 mnt/hari', icon: '⭐', popular: true },
              { xp: 100, label: 'Intensif', time: '~20 mnt/hari', icon: '🔥' },
            ].map((tier) => (
              <button
                key={tier.xp}
                type="button"
                onClick={() => setChosenDailyXp(tier.xp)}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 active:scale-95 min-h-[88px] relative ${
                  chosenDailyXp === tier.xp
                    ? 'bg-accent/10 border-accent text-accent font-semibold shadow-xs'
                    : 'bg-surface border-border text-appText-bright hover:bg-surface-2'
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs font-bold uppercase px-2 py-0.5 rounded-full bg-accent text-white dark:text-stone-950 shadow-xs">
                    Rekomendasi
                  </span>
                )}
                <span className="text-lg">{tier.icon}</span>
                <span className="text-xs font-semibold leading-tight">{tier.label}</span>
                <span className="text-xs font-mono font-bold text-accent">{tier.xp} XP</span>
                <span className="text-xs text-appText-muted">{tier.time}</span>
              </button>
            ))}
          </div>

          {/* Toggles: Furigana & Romaji */}
          <div className="space-y-2 pt-1">
            <div className="text-xs font-semibold text-appText-bright uppercase tracking-wider">
              Bantuan Aksara:
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setChosenFurigana(!chosenFurigana)}
                className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all min-h-[44px] active:scale-95 ${
                  chosenFurigana
                    ? 'bg-accent/10 border-accent text-accent font-semibold'
                    : 'bg-surface hover:bg-surface-2 border-border text-appText-muted'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-jp font-bold text-xs">文</span>
                  <span className="text-xs font-semibold">Furigana</span>
                </div>
                {chosenFurigana && <Check className="w-4 h-4 text-accent" />}
              </button>

              <button
                type="button"
                onClick={() => setChosenRomaji(!chosenRomaji)}
                className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all min-h-[44px] active:scale-95 ${
                  chosenRomaji
                    ? 'bg-accent/10 border-accent text-accent font-semibold'
                    : 'bg-surface hover:bg-surface-2 border-border text-appText-muted'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs">Aa</span>
                  <span className="text-xs font-semibold">Romaji</span>
                </div>
                {chosenRomaji && <Check className="w-4 h-4 text-accent" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </AppModalShell>
  );
};

export default OnboardingModal;
