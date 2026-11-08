// ══════════════════════════════════════════════════════════════════
//  PitchAccentModal.tsx — Japanese Pitch Accent Studio & Ear Trainer
//  Features Minimal Pairs Showdown, 4 Tokyo Patterns, & Ear Drills
// ══════════════════════════════════════════════════════════════════

import React, { useState, useMemo } from 'react';
import {
  X,
  Search,
  Volume2,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Music,
  Compass,
  Swords,
  Layers,
} from 'lucide-react';
import {
  MINIMAL_PAIRS,
  PATTERN_WORDS,
  PITCH_QUIZ_QUESTIONS,
  MinimalPair,
  PitchWord,
} from '../../lib/pitch/pitchData';
import { PitchCategory } from '../../lib/pitch/pitchEngine';
import { PitchContourView } from './PitchContourView';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { useAppStore } from '../../store/useAppStore';
import { IrasutoyaImage } from '../common/IrasutoyaImage';

interface PitchAccentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabMode = 'pairs' | 'patterns' | 'quiz';

export const PitchAccentModal: React.FC<PitchAccentModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabMode>('pairs');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPattern, setSelectedPattern] = useState<PitchCategory>('heiban');
  
  // Quiz state
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [selectedAnswerIdx, setSelectedAnswerIdx] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const containerRef = useFocusTrap<HTMLDivElement>(isOpen, onClose);
  useBodyScrollLock(isOpen);
  const { showToast } = useAppStore();

  // Filtered minimal pairs based on search
  const filteredPairs = useMemo(() => {
    if (!searchQuery.trim()) return MINIMAL_PAIRS;
    const q = searchQuery.toLowerCase().trim();
    return MINIMAL_PAIRS.filter(
      (pair) =>
        pair.title.toLowerCase().includes(q) ||
        pair.reading.toLowerCase().includes(q) ||
        pair.wordA.kanji.toLowerCase().includes(q) ||
        pair.wordA.meaning.toLowerCase().includes(q) ||
        pair.wordB.kanji.toLowerCase().includes(q) ||
        pair.wordB.meaning.toLowerCase().includes(q) ||
        (pair.wordC && (pair.wordC.kanji.toLowerCase().includes(q) || pair.wordC.meaning.toLowerCase().includes(q))) ||
        pair.blunderContext.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  if (!isOpen) return null;

  const handleSelectQuizOption = (optIdx: number, isCorrect: boolean) => {
    if (selectedAnswerIdx !== null) return; // prevent changing
    setSelectedAnswerIdx(optIdx);
    if (isCorrect) {
      setQuizScore((prev) => prev + 1);
      showToast('Jawaban Benar! 🎉', '✨');
    } else {
      showToast('Kurang tepat, perhatikan penjelasannya! 💡', '❌');
    }
  };

  const handleNextQuiz = () => {
    setSelectedAnswerIdx(null);
    if (currentQuizIdx + 1 < PITCH_QUIZ_QUESTIONS.length) {
      setCurrentQuizIdx((prev) => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuizIdx(0);
    setSelectedAnswerIdx(null);
    setQuizScore(0);
    setQuizFinished(false);
  };

  const currentQuiz = PITCH_QUIZ_QUESTIONS[currentQuizIdx];

  const PATTERN_INFO: Record<PitchCategory, { title: string; color: string; desc: string; particleInfo: string }> = {
    heiban: {
      title: 'Pola 0: Heiban (平板 - Datar)',
      color: 'text-blue-700 dark:text-blue-400 bg-blue-500/10 border-blue-500/30 font-bold',
      desc: 'Mora pertama rendah [L], naik di mora ke-2 [H], lalu DATAR terus sampai partikel pengiring. Tidak pernah ada kejatuhan nada (downstep).',
      particleInfo: 'Partikel pengiring (が, を, に) tetap bernada TINGGI [H].',
    },
    atamadaka: {
      title: 'Pola 1: Atamadaka (頭高 - Jatuh di Awal)',
      color: 'text-rose-700 dark:text-rose-400 bg-rose-500/10 border-rose-500/30 font-bold',
      desc: 'Mora pertama bernada TINGGI [H], kemudian langsung ANJLOK JATUH [L] di mora ke-2 dan seterusnya.',
      particleInfo: 'Partikel pengiring (が, を, に) bernada RENDAH [L].',
    },
    nakadaka: {
      title: 'Pola 2+: Nakadaka (中高 - Jatuh di Tengah)',
      color: 'text-amber-700 dark:text-amber-400 bg-amber-500/10 border-amber-500/30 font-bold',
      desc: 'Mora pertama rendah [L], naik ke puncak nada [H], lalu JATUH di tengah kata sebelum mora terakhir.',
      particleInfo: 'Partikel pengiring (が, を, に) bernada RENDAH [L].',
    },
    odaka: {
      title: 'Pola N: Odaka (尾高 - Jatuh di Partikel)',
      color: 'text-purple-700 dark:text-purple-400 bg-purple-500/10 border-purple-500/30 font-bold',
      desc: 'Mora pertama rendah [L], naik dan tetap tinggi hingga mora terakhir. Kejatuhan nada baru terjadi tepat pada partikel pengiringnya!',
      particleInfo: 'Partikel pengiring (が, を, に) anjlok bernada RENDAH [L].',
    },
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-5 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Studio Pitch Accent Bahasa Jepang (高低アクセント)"
    >
      <div
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[92dvh] sm:max-h-[90vh] bg-surface border-t-2 sm:border border-accent/30 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden z-10 animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
      >
        {/* Mobile Pull Handle Indicator */}
        <div className="sm:hidden flex justify-center pt-2 pb-1 bg-surface-2/40">
          <div className="w-10 h-1 rounded-full bg-accent/30" />
        </div>

        {/* Hero Artwork Header */}
        <div className="relative overflow-hidden border-b border-accent/20 bg-surface-2 shrink-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity"
            style={{ backgroundImage: `url('/images/kotowaza-zen.jpg')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/85 to-transparent" />

          <div className="relative z-10 p-5 sm:p-6 flex items-start justify-between gap-4">
            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-accent border border-amber-500/30 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                  <Music className="w-3 h-3 text-accent" />
                  <span>Studio Intonasi & Nada Jepang</span>
                </span>
                <span className="text-xs text-appText-muted font-jp hidden sm:inline" lang="ja">
                  高低アクセント
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-appText-bright tracking-tight">
                Pelatih Pitch Accent (<span lang="ja">高低アクセント</span>)
              </h2>
              <p className="text-xs text-appText-muted leading-relaxed max-w-2xl line-clamp-2 sm:line-clamp-none">
                Visualisasikan kontur nada tinggi-rendah bahasa Jepang standar Tokyo. Hindari kesalahpahaman kata homofon kembar dengan melodi nada dan latihan telinga interaktif.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-2xl bg-surface/80 hover:bg-surface-3 border border-accent/20 text-appText-muted hover:text-appText-bright transition-all shrink-0 active:scale-95 flex items-center justify-center"
              title="Tutup dialog"
              aria-label="Tutup dialog pitch accent"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3-Mode Segmented Tab Switcher */}
        <div className="p-3 sm:p-4 border-b border-accent/15 bg-surface-2/60 shrink-0">
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 p-1 rounded-2xl bg-surface border border-accent/20">
            <button
              type="button"
              onClick={() => setActiveTab('pairs')}
              className={`py-2 px-2 sm:px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'pairs'
                  ? 'bg-accent text-bg shadow-sm font-extrabold'
                  : 'text-appText-muted hover:text-appText-bright hover:bg-surface-3'
              }`}
            >
              <Swords className="w-3.5 h-3.5" />
              <span className="truncate">Pasangan Homofon</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('patterns')}
              className={`py-2 px-2 sm:px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'patterns'
                  ? 'bg-accent text-bg shadow-sm font-extrabold'
                  : 'text-appText-muted hover:text-appText-bright hover:bg-surface-3'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="truncate">4 Pola Tokyo</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('quiz')}
              className={`py-2 px-2 sm:px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'quiz'
                  ? 'bg-accent text-bg shadow-sm font-extrabold'
                  : 'text-appText-muted hover:text-appText-bright hover:bg-surface-3'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span className="truncate">Kuis Telinga</span>
            </button>
          </div>
        </div>

        {/* Main Tab Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* TAB 1: MINIMAL PAIRS SHOWDOWN */}
          {activeTab === 'pairs' && (
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-appText-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari kata homofon (misal: ame, hashi, hujan, permen, sumpit)..."
                  className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-surface border border-accent/20 text-xs sm:text-sm text-appText-bright placeholder:text-appText-muted focus:outline-none focus:border-accent transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-appText-muted hover:text-appText-bright"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Minimal Pair Cards */}
              <div className="space-y-4">
                {filteredPairs.map((pair) => (
                  <div
                    key={pair.id}
                    className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-surface-2 border border-accent/20 shadow-sm space-y-4"
                  >
                    {/* Header Title */}
                    <div className="flex items-center justify-between gap-2 border-b border-accent/10 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="text-base sm:text-lg font-black text-appText-bright font-jp">
                          {pair.title}
                        </span>
                        <span className="text-xs text-appText-muted font-mono">
                          [{pair.reading}]
                        </span>
                      </div>
                      <span className="text-xs font-bold text-accent px-2 py-0.5 rounded-full bg-accent/15 border border-accent/25">
                        Homofon Kembar
                      </span>
                    </div>

                    {/* Blunder Warning Banner */}
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-2.5 text-xs text-amber-300">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <p className="leading-relaxed">
                        <span className="font-bold">Awas Salah Nada: </span>
                        {pair.blunderContext}
                      </p>
                    </div>

                    {/* Side-by-Side Word Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {/* Word A */}
                      <div className="p-3.5 rounded-2xl bg-surface border border-accent/15 flex flex-col items-center justify-between space-y-3">
                        <PitchContourView
                          kanji={pair.wordA.kanji}
                          kana={pair.wordA.kana}
                          moras={pair.wordA.moras}
                          categoryLabel={pair.wordA.categoryLabel}
                          particlePitch={pair.wordA.particlePitch}
                        />
                        <div className="text-center space-y-1 w-full border-t border-accent/10 pt-2">
                          <p className="text-xs font-bold text-appText-bright">
                            {pair.wordA.meaning}
                          </p>
                          {pair.wordA.exampleJp && (
                            <p className="text-xs text-appText-muted font-jp line-clamp-1" title={pair.wordA.exampleJp}>
                              {pair.wordA.exampleJp}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Word B */}
                      <div className="p-3.5 rounded-2xl bg-surface border border-accent/15 flex flex-col items-center justify-between space-y-3">
                        <PitchContourView
                          kanji={pair.wordB.kanji}
                          kana={pair.wordB.kana}
                          moras={pair.wordB.moras}
                          categoryLabel={pair.wordB.categoryLabel}
                          particlePitch={pair.wordB.particlePitch}
                        />
                        <div className="text-center space-y-1 w-full border-t border-accent/10 pt-2">
                          <p className="text-xs font-bold text-appText-bright">
                            {pair.wordB.meaning}
                          </p>
                          {pair.wordB.exampleJp && (
                            <p className="text-xs text-appText-muted font-jp line-clamp-1" title={pair.wordB.exampleJp}>
                              {pair.wordB.exampleJp}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Word C (if present) */}
                      {pair.wordC && (
                        <div className="p-3.5 rounded-2xl bg-surface border border-accent/15 flex flex-col items-center justify-between space-y-3">
                          <PitchContourView
                            kanji={pair.wordC.kanji}
                            kana={pair.wordC.kana}
                            moras={pair.wordC.moras}
                            categoryLabel={pair.wordC.categoryLabel}
                            particlePitch={pair.wordC.particlePitch}
                          />
                          <div className="text-center space-y-1 w-full border-t border-accent/10 pt-2">
                            <p className="text-xs font-bold text-appText-bright">
                              {pair.wordC.meaning}
                            </p>
                            {pair.wordC.exampleJp && (
                              <p className="text-xs text-appText-muted font-jp line-clamp-1" title={pair.wordC.exampleJp}>
                                {pair.wordC.exampleJp}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Mnemonic Memory Hook */}
                    {pair.mnemonicId && (
                      <div className="flex items-start gap-2 text-xs text-appText-muted bg-surface-3/50 p-2.5 rounded-xl border border-accent/10">
                        <Lightbulb className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                        <p className="leading-relaxed">
                          <span className="font-bold text-appText-bright">Jembatan Keledai: </span>
                          {pair.mnemonicId}
                        </p>
                      </div>
                    )}
                  </div>
                ))}

                {filteredPairs.length === 0 && (
                  <div className="text-center py-10 space-y-2">
                    <p className="text-sm font-semibold text-appText-bright">Tidak ada pasangan minimal yang cocok.</p>
                    <p className="text-xs text-appText-muted">Coba kata kunci lain atau kosongkan kolom pencarian.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: THE 4 TOKYO PATTERNS DEEP DIVE */}
          {activeTab === 'patterns' && (
            <div className="space-y-5">
              {/* 4 Pattern Pill Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['heiban', 'atamadaka', 'nakadaka', 'odaka'] as PitchCategory[]).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedPattern(cat)}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      selectedPattern === cat
                        ? PATTERN_INFO[cat].color + ' font-extrabold shadow-sm scale-102'
                        : 'bg-surface hover:bg-surface-3 text-appText-muted border-accent/20'
                    }`}
                  >
                    <div className="text-xs sm:text-sm font-bold uppercase tracking-wider">
                      {cat}
                    </div>
                    <div className="text-xs opacity-80 mt-0.5 font-jp">
                      {cat === 'heiban' && '平板型 (0)'}
                      {cat === 'atamadaka' && '頭高型 (1)'}
                      {cat === 'nakadaka' && '中高型 (2+)'}
                      {cat === 'odaka' && '尾高型 (N)'}
                    </div>
                  </button>
                ))}
              </div>

              {/* Explanatory Banner for Selected Pattern */}
              <div className={`p-4 sm:p-5 rounded-2xl border ${PATTERN_INFO[selectedPattern].color} space-y-2`}>
                <h3 className="text-sm sm:text-base font-extrabold tracking-tight">
                  {PATTERN_INFO[selectedPattern].title}
                </h3>
                <p className="text-xs leading-relaxed opacity-90">
                  {PATTERN_INFO[selectedPattern].desc}
                </p>
                <p className="text-xs font-semibold leading-relaxed pt-1 border-t border-current/20">
                  💡 <span className="underline">Karakteristik Partikel</span>: {PATTERN_INFO[selectedPattern].particleInfo}
                </p>
              </div>

              {/* Example Words Grid */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-appText-bright uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-accent" />
                  <span>Koleksi Kata Contoh {PATTERN_INFO[selectedPattern].title.split(':')[1]}</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {PATTERN_WORDS[selectedPattern].map((word) => (
                    <div
                      key={word.id}
                      className="p-3.5 rounded-2xl bg-surface border border-accent/15 flex flex-col items-center justify-between space-y-3 shadow-xs hover:border-accent/40 transition-colors"
                    >
                      <PitchContourView
                        kanji={word.kanji}
                        kana={word.kana}
                        moras={word.moras}
                        categoryLabel={word.categoryLabel}
                        particlePitch={word.particlePitch}
                        compact
                      />
                      <div className="text-center w-full border-t border-accent/10 pt-2">
                        <p className="text-xs font-bold text-appText-bright">
                          {word.meaning}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: EAR TRAINING QUIZ */}
          {activeTab === 'quiz' && (
            <div className="max-w-xl mx-auto space-y-5">
              {!quizFinished ? (
                <div className="p-5 sm:p-6 rounded-3xl bg-surface-2 border border-accent/20 space-y-5 shadow-md">
                  {/* Progress Header */}
                  <div className="flex items-center justify-between text-xs font-bold text-appText-muted border-b border-accent/15 pb-3">
                    <span className="flex items-center gap-1.5 text-accent">
                      <HelpCircle className="w-4 h-4" />
                      <span>Pertanyaan {currentQuizIdx + 1} dari {PITCH_QUIZ_QUESTIONS.length}</span>
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/25">
                      Skor: {quizScore}
                    </span>
                  </div>

                  {/* Question Box */}
                  <div className="space-y-3">
                    <h3 className="text-sm sm:text-base font-extrabold text-appText-bright leading-relaxed">
                      {currentQuiz.question}
                    </h3>
                  </div>

                  {/* Options List */}
                  <div className="space-y-2.5">
                    {currentQuiz.options.map((opt, optIdx) => {
                      const isSelected = selectedAnswerIdx === optIdx;
                      let btnStyle = 'bg-surface hover:bg-surface-3 border-accent/20 text-appText-bright';

                      if (selectedAnswerIdx !== null) {
                        if (opt.isCorrect) {
                          btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold';
                        } else if (isSelected) {
                          btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-800 dark:text-rose-300 font-bold';
                        } else {
                          btnStyle = 'bg-surface/50 border-accent/10 text-appText-muted opacity-60';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectQuizOption(optIdx, opt.isCorrect)}
                          disabled={selectedAnswerIdx !== null}
                          className={`w-full p-3.5 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3 active:scale-98 ${btnStyle}`}
                        >
                          <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="flex-1 leading-relaxed">{opt.text}</span>
                          {selectedAnswerIdx !== null && opt.isCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          )}
                          {selectedAnswerIdx !== null && isSelected && !opt.isCorrect && (
                            <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation & Next Button */}
                  {selectedAnswerIdx !== null && (
                    <div className="p-4 rounded-2xl bg-surface border border-accent/20 space-y-3 animate-in fade-in duration-200">
                      <p className="text-xs text-appText-muted leading-relaxed">
                        <span className="font-bold text-appText-bright">Penjelasan: </span>
                        {currentQuiz.options[selectedAnswerIdx].explanation}
                      </p>

                      <div className="flex justify-end pt-2">
                        <button
                          type="button"
                          onClick={handleNextQuiz}
                          className="px-4 py-2 rounded-xl bg-accent hover:bg-accent-hot text-bg font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 shadow-md"
                        >
                          <span>{currentQuizIdx + 1 === PITCH_QUIZ_QUESTIONS.length ? 'Lihat Hasil' : 'Lanjut →'}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Quiz Finished Card */
                <div className="p-6 rounded-3xl bg-surface-2 border border-accent/30 text-center space-y-5 shadow-xl animate-in zoom-in-95 card-interactive-lift">
                  <div className="w-20 h-20 mx-auto flex items-center justify-center">
                    {quizScore >= 3 ? (
                      <IrasutoyaImage
                        assetId="celebration_kusudama"
                        className="w-20 h-20"
                        containerClassName="w-20 h-20"
                        animatePop
                      />
                    ) : quizScore >= 2 ? (
                      <IrasutoyaImage
                        assetId="sensei_praise"
                        className="w-20 h-20"
                        containerClassName="w-20 h-20"
                        animatePop
                      />
                    ) : (
                      <IrasutoyaImage
                        assetId="daruma_recovery"
                        className="w-20 h-20"
                        containerClassName="w-20 h-20"
                        animateFloat
                      />
                    )}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-black text-appText-bright">
                      Latihan Telinga Selesai!
                    </h3>
                    <p className="text-xs text-appText-muted">
                      Kamu berhasil menjawab {quizScore} dari {PITCH_QUIZ_QUESTIONS.length} pertanyaan dengan benar.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-surface border border-accent/15 max-w-xs mx-auto">
                    <div className="text-2xl font-black text-accent">
                      {Math.round((quizScore / PITCH_QUIZ_QUESTIONS.length) * 100)}%
                    </div>
                    <div className="text-xs text-appText-muted mt-0.5 font-medium">
                      Tingkat Kepekaan Nada
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleRestartQuiz}
                    className="px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-hot text-bg font-extrabold text-xs inline-flex items-center gap-2 transition-all active:scale-95 shadow-md"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Ulangi Latihan Telinga</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
