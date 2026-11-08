// ══════════════════════════════════════════════════════════════════
//  OnboardingModal.tsx — Wa-Minimalist 3-Step Interactive Onboarding Wizard
//  Integrates Embedded CAT IRT Diagnostic (Step 2) & Daily Goal Setup (Step 3)
//  Complies with Universal Multi-Device Responsive Design Rule
// ══════════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react';
import {
  X,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Target,
  BookOpen,
  Briefcase,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  Zap,
  Flame,
  Check,
  Compass,
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { useCurriculumStore, TrackId } from '../../lib/curriculum/curriculumStore';
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
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { IrasutoyaImage } from '../common/IrasutoyaImage';

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
  const trapRef = useFocusTrap<HTMLDivElement>(modalOpen);
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

  const handleClose = () => {
    try {
      localStorage.setItem('nn_onboarding_completed', 'true');
    } catch {}
    if (onClose) {
      onClose();
    } else {
      closeOnboarding();
    }
  };

  // Keyboard Escape & Arrow Navigation
  useEffect(() => {
    if (!modalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen]);

  // Start Embedded CAT
  const startEmbeddedCAT = async () => {
    setCatLoading(true);
    setStep2Mode('cat');
    setCatResult(null);
    setCatHistory([]);
    setCatQIndex(0);
    setCatTheta(0.0);
    setCatSelectedOption(null);
    setCatIsAnswered(false);

    try {
      const pool = await buildCATQuestionPool();
      setCatPool(pool);
      const used = new Set<string>();
      const firstQ = selectNextCATQuestion(pool, used, 0.0);
      if (firstQ) {
        used.add(firstQ.id);
        setCatCurrentQ(firstQ);
        setCatUsedIds(used);
      }
    } catch (err) {
      console.error('[OnboardingModal] Failed to load CAT bank', err);
    } finally {
      setCatLoading(false);
    }
  };

  const handleCatSelectOption = (idx: number) => {
    if (catIsAnswered || !catCurrentQ) return;
    setCatSelectedOption(idx);
    setCatIsAnswered(true);

    const isCorrect = idx === catCurrentQ.correctIndex;
    if (isCorrect) {
      playSuccessSfx();
    } else {
      playErrorSfx();
    }

    const nextHistory = [...catHistory, { question: catCurrentQ, isCorrect }];
    setCatHistory(nextHistory);

    const updatedTheta = updateThetaEstimate(
      catTheta,
      isCorrect,
      catCurrentQ.difficulty,
      catQIndex + 1,
      CAT_MAX_QUESTIONS
    );
    setCatTheta(updatedTheta);
  };

  const handleCatNextQuestion = () => {
    const currentSem = calculateCATSEM(catHistory, catTheta);
    const reachedStopCondition = shouldStopCAT(
      catHistory.length,
      currentSem,
      CAT_MIN_QUESTIONS,
      CAT_MAX_QUESTIONS
    );

    if (reachedStopCondition || catQIndex + 1 >= CAT_MAX_QUESTIONS) {
      playFanfareSfx();
      const finalRes = finalizeCATResult(catHistory, catTheta);
      setCatResult(finalRes);
      setChosenLevel(finalRes.estimatedLevel);
      setChosenTrack(finalRes.recommendedTrack as TrackId);
      addPlacementResult({
        theta: finalRes.theta,
        sem: finalRes.sem,
        recommendedLevel: finalRes.estimatedLevel,
        questionsAnswered: finalRes.totalCount,
        accuracy: finalRes.accuracy,
      });
      setStep2Mode('cat-result');
      return;
    }

    const nextIndex = catQIndex + 1;
    setCatQIndex(nextIndex);
    setCatSelectedOption(null);
    setCatIsAnswered(false);

    const nextQ = selectNextCATQuestion(catPool, catUsedIds, catTheta);
    if (nextQ) {
      const updatedUsed = new Set(catUsedIds);
      updatedUsed.add(nextQ.id);
      setCatUsedIds(updatedUsed);
      setCatCurrentQ(nextQ);
    } else {
      playFanfareSfx();
      const finalRes = finalizeCATResult(catHistory, catTheta);
      setCatResult(finalRes);
      setChosenLevel(finalRes.estimatedLevel);
      setChosenTrack(finalRes.recommendedTrack as TrackId);
      addPlacementResult({
        theta: finalRes.theta,
        sem: finalRes.sem,
        recommendedLevel: finalRes.estimatedLevel,
        questionsAnswered: finalRes.totalCount,
        accuracy: finalRes.accuracy,
      });
      setStep2Mode('cat-result');
    }
  };

  const handleFinishOnboarding = () => {
    try {
      localStorage.setItem('nn_onboarding_completed', 'true');
    } catch {}

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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-title"
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in"
    >
      <div
        ref={trapRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-surface border-t-2 sm:border border-accent/25 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden relative flex flex-col max-h-[92dvh] sm:max-h-[90vh] pb-[max(1rem,env(safe-area-inset-bottom))]"
      >
        {/* Glow ambient effects */}
        <div className="absolute -top-20 -right-20 w-44 h-44 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-44 h-44 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Mobile Drag Indicator */}
        <div className="flex sm:hidden justify-center pt-2.5 pb-1">
          <div className="w-12 h-1.5 rounded-full bg-accent/30" />
        </div>

        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-6 pt-4 pb-3 border-b border-accent/15 bg-surface-2/60 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-accent-hot">
              {step === 1 ? '🍙 Sambutan' : step === 2 ? '🎯 Penentuan Level' : '⚙️ Preferensi'}
            </span>
            <span className="text-xs font-mono text-appText-muted">Langkah {step} dari 3</span>
          </div>

          <button
            onClick={handleClose}
            className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-xl text-appText-muted hover:text-appText-bright hover:bg-surface flex items-center justify-center transition-colors active:scale-95"
            aria-label="Tutup orientasi"
            title="Lewati dan tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Body Container */}
        <div className="overflow-y-auto px-5 sm:px-6 py-5 space-y-5 flex-1 min-w-0">
          {/* ═══════════════ LANGKAH 1: FILOSOFI & SAMBUTAN ═══════════════ */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/15 via-amber-700/10 to-transparent border border-accent/25 relative overflow-hidden">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 p-1 flex items-center justify-center shadow-glow shrink-0">
                    <IrasutoyaImage assetId="sensei_teaching" animateFloat className="w-14 h-14 object-contain" />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <h2 id="onboarding-title" className="text-lg sm:text-xl font-black text-appText-bright tracking-tight leading-snug">
                      Selamat Datang di Nugget Nihongo!
                    </h2>
                    <p className="text-xs sm:text-sm text-appText-muted leading-relaxed">
                      Sahabat belajar bahasa Jepang yang mandiri, hangat, dan 100% bebas rasa bersalah.
                    </p>
                  </div>
                </div>
              </div>

              {/* 3 Value Pillars */}
              <div className="space-y-2.5">
                <div className="p-3.5 rounded-2xl bg-surface-2 border border-accent/15 flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-base shrink-0 mt-0.5">
                    📴
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <div className="text-xs font-bold text-appText-bright">100% Offline-First (PWA)</div>
                    <div className="text-xs text-appText-muted leading-relaxed">
                      Seluruh kurikulum, kamus, audio pelafalan, dan latihan berjalan langsung di perangkatmu tanpa kuota.
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-surface-2 border border-accent/15 flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-base shrink-0 mt-0.5">
                    🆓
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <div className="text-xs font-bold text-appText-bright">Tanpa Iklan & Tanpa Paywall</div>
                    <div className="text-xs text-appText-muted leading-relaxed">
                      Tidak ada batasan "nyawa" (hearts) atau sistem bayar langganan. Semua materi terbuka penuh.
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-surface-2 border border-accent/15 flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/25 flex items-center justify-center text-base shrink-0 mt-0.5">
                    🧠
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <div className="text-xs font-bold text-appText-bright">Sains Memori Berjarak FSRS</div>
                    <div className="text-xs text-appText-muted leading-relaxed">
                      Mengoptimalkan retensi kanji dan kosakata dengan interval pengulangan cerdas sesuai daya ingat alami otak.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════ LANGKAH 2: PENENTUAN LEVEL & CAT ═══════════════ */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {step2Mode === 'choose' && (
                <div className="space-y-3.5">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-appText-bright">
                      Tentukan Titik Awal Belajarmu
                    </h3>
                    <p className="text-xs text-appText-muted mt-0.5">
                      Pilih cara terbaik untuk memulai agar kurikulum sesuai dengan kemampuanmu:
                    </p>
                  </div>

                  {/* Option 1: Embedded CAT IRT (Recommended) */}
                  <div
                    onClick={startEmbeddedCAT}
                    className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-surface-2 border-2 border-accent hover:border-accent-hot cursor-pointer transition-all active:scale-98 shadow-sm space-y-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-base">🎯</span>
                        <span className="text-xs font-black text-accent-hot uppercase tracking-wider">
                          Rekomendasi Utama
                        </span>
                      </div>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-accent/20 text-accent">
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
                    <div className="pt-1 flex items-center gap-1.5 text-xs font-bold text-accent">
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
                    className="p-4 rounded-2xl bg-surface-2 hover:bg-surface-3 border border-accent/20 hover:border-accent/40 cursor-pointer transition-all active:scale-98 space-y-1.5 group"
                  >
                    <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold">
                      <IrasutoyaImage assetId="jlpt_n5" className="w-5 h-5 object-contain" />
                      <span className="text-xs font-bold uppercase tracking-wider">Pemula Mutlak</span>
                    </div>
                    <h4 className="text-sm font-bold text-appText-bright group-hover:text-accent transition-colors">
                      Mulai dari Nol (Level N5)
                    </h4>
                    <p className="text-xs text-appText-muted leading-relaxed">
                      Belum hafal Hiragana atau Katakana. Otomatis mengaktifkan bantuan Romaji dan panduan aksara dari dasar.
                    </p>
                  </div>

                  {/* Option 3: SSW Vocational or Textbook */}
                  <div
                    onClick={() => setStep2Mode('ssw-picker')}
                    className="p-4 rounded-2xl bg-surface-2 hover:bg-surface-3 border border-accent/20 hover:border-accent/40 cursor-pointer transition-all active:scale-98 space-y-1.5 group"
                  >
                    <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-bold">
                      <IrasutoyaImage assetId="ssw_kaigo" className="w-5 h-5 object-contain" />
                      <span className="text-xs font-bold uppercase tracking-wider">Jalur Khusus</span>
                    </div>
                    <h4 className="text-sm font-bold text-appText-bright group-hover:text-accent transition-colors">
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
                      <h3 className="text-sm font-bold text-appText-bright">Pilih Sektor Vokasional / Jalur</h3>
                      <p className="text-xs text-appText-muted">Pilih kurikulum fokus kerjamu:</p>
                    </div>
                    <button
                      onClick={() => setStep2Mode('choose')}
                      className="text-xs font-bold text-accent hover:text-accent-hot flex items-center gap-1.5 min-h-[40px] px-2.5 py-1.5 rounded-xl hover:bg-surface-3 transition-colors active:scale-95"
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
                      { id: 'ssw-kensetsu', name: 'SSW Konstruksi Gemba', icon: '🏗️' },
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
                          setChosenLevel('n4');
                          setStep(3);
                        }}
                        className="p-3 rounded-xl bg-surface-2 hover:bg-surface-3 border border-accent/20 hover:border-accent text-left flex items-center gap-2.5 transition-all active:scale-95 min-h-[44px]"
                      >
                        <span className="text-lg shrink-0">{item.icon}</span>
                        <span className="text-xs font-bold text-appText-bright leading-tight">{item.name}</span>
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
                      <div className="w-10 h-10 border-3 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
                      <p className="text-xs text-appText-muted">Menyiapkan soal diagnostik adaptif...</p>
                    </div>
                  ) : catCurrentQ ? (
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-accent font-bold">
                          Soal {catQIndex + 1} (Adaptif: 6–12 Soal)
                        </span>
                        <span className="text-appText-muted font-mono text-xs">
                          Taraf: {catCurrentQ.level.toUpperCase()}
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
                      <div className="p-4 rounded-2xl bg-surface-2 border border-accent/20 space-y-1">
                        <div className="text-xs font-bold text-accent uppercase tracking-wider">
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

                          let style = 'bg-surface-2 hover:bg-surface-3 border-accent/15 text-appText-bright';
                          if (catIsAnswered) {
                            if (isCorrect) {
                              style = 'bg-emerald-500/20 border-emerald-500/50 text-emerald-700 dark:text-emerald-300 font-bold';
                            } else if (isSelected) {
                              style = 'bg-red-500/20 border-red-500/50 text-red-700 dark:text-red-300';
                            } else {
                              style = 'bg-surface-2/40 border-accent/10 text-appText-muted opacity-60';
                            }
                          }

                          return (
                            <button
                              key={idx}
                              type="button"
                              disabled={catIsAnswered}
                              onClick={() => handleCatSelectOption(idx)}
                              className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 min-h-[48px] active:scale-98 ${style}`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <span className="w-5 h-5 rounded-md bg-surface-3 font-mono text-xs flex items-center justify-center shrink-0">
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
                              className="w-full py-2.5 px-4 rounded-xl bg-accent hover:bg-accent-hot text-bg font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-glow active:scale-95 min-h-[44px]"
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
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-accent-hot border border-amber-500/40 flex items-center justify-center mx-auto shadow-glow">
                    <Award className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-accent uppercase tracking-wider">Hasil Diagnosis CAT</div>
                    <h3 className="text-2xl font-black text-appText-bright mt-0.5">{catResult.levelName}</h3>
                    <p className="text-xs text-appText-muted mt-1 max-w-sm mx-auto">{catResult.summary}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 text-center py-1">
                    <div className="p-2.5 rounded-xl bg-surface-2 border border-accent/15">
                      <div className="text-xs text-appText-muted">Akurasi Soal</div>
                      <div className="text-base font-black text-accent-hot font-mono">{catResult.accuracy}%</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-surface-2 border border-accent/15">
                      <div className="text-xs text-appText-muted">Level Rekomendasi</div>
                      <div className="text-base font-black text-emerald-700 dark:text-emerald-400 font-mono uppercase">{catResult.estimatedLevel}</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="w-full py-3 px-4 rounded-xl bg-accent hover:bg-accent-hot text-bg font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-glow active:scale-95 min-h-[44px]"
                  >
                    <span>Lanjut ke Target Belajar Harian</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ═══════════════ LANGKAH 3: TARGET HARIAN & PREFERENSI ═══════════════ */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <h3 className="text-base sm:text-lg font-black text-appText-bright">
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
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 active:scale-95 min-h-[88px] relative ${
                      chosenDailyXp === tier.xp
                        ? 'bg-amber-500/20 border-accent text-accent-hot font-bold shadow-sm'
                        : 'bg-surface-2 border-accent/15 text-appText-bright hover:bg-surface-3'
                    }`}
                  >
                    {tier.popular && (
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-accent text-bg shadow-sm">
                        Rekomendasi
                      </span>
                    )}
                    <span className="text-lg">{tier.icon}</span>
                    <span className="text-xs font-bold leading-tight">{tier.label}</span>
                    <span className="text-xs font-mono font-bold text-accent">{tier.xp} XP</span>
                    <span className="text-[10px] text-appText-muted">{tier.time}</span>
                  </button>
                ))}
              </div>

              {/* Toggles: Furigana & Romaji */}
              <div className="space-y-2 pt-1">
                <div className="text-xs font-bold text-appText-bright uppercase tracking-wider">
                  Bantuan Aksara:
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setChosenFurigana(!chosenFurigana)}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all min-h-[44px] active:scale-95 ${
                      chosenFurigana
                        ? 'bg-amber-500/15 border-accent text-accent-hot font-bold'
                        : 'bg-surface-2 border-accent/15 text-appText-muted'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">Furigana (Kana)</div>
                      <div className="text-[10px] text-appText-muted">Bacaan di atas kanji</div>
                    </div>
                    {chosenFurigana && <Check className="w-4 h-4 text-accent" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setChosenRomaji(!chosenRomaji)}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all min-h-[44px] active:scale-95 ${
                      chosenRomaji
                        ? 'bg-amber-500/15 border-accent text-accent-hot font-bold'
                        : 'bg-surface-2 border-accent/15 text-appText-muted'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">Romaji (Alfabet)</div>
                      <div className="text-[10px] text-appText-muted">Ejaan huruf latin</div>
                    </div>
                    {chosenRomaji && <Check className="w-4 h-4 text-accent" />}
                  </button>
                </div>
              </div>

              {/* Summary Card */}
              <div className="p-3.5 rounded-2xl bg-surface-2/60 border border-accent/15 text-xs text-appText-muted space-y-1">
                <div className="flex items-center justify-between">
                  <span>Level Awal:</span>
                  <span className="font-bold text-accent uppercase">{chosenLevel}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Jalur Kurikulum:</span>
                  <span className="font-bold text-appText-bright uppercase">{chosenTrack}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Target Harian:</span>
                  <span className="font-bold text-appText-bright">{chosenDailyXp} XP / hari</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Bar */}
        <div className="px-5 sm:px-6 py-3.5 border-t border-accent/15 bg-surface-2/40 flex items-center justify-between gap-3 shrink-0">
          {/* Step Dots */}
          <div className="flex items-center gap-1.5">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all ${
                  s === step ? 'w-6 bg-accent' : 'w-2 bg-surface-3'
                }`}
              />
            ))}
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
                className="px-3.5 py-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-accent/20 text-appText-bright text-xs font-bold flex items-center gap-1.5 transition-all min-h-[40px] active:scale-95"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Kembali</span>
              </button>
            )}

            {step === 1 && (
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-950/40 transition-all active:scale-95 min-h-[40px]"
              >
                <span>Mulai Personalisasi Belajar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {step === 3 && (
              <button
                type="button"
                onClick={handleFinishOnboarding}
                className="px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-hot text-bg font-black text-xs sm:text-sm flex items-center gap-2 shadow-glow transition-all active:scale-95 min-h-[40px]"
              >
                <span>Masuk ke Ruang Belajar 🚀</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;
