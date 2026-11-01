// ══════════════════════════════════════════════════════════════════
//  CounterTrainerModal.tsx — Pelatih Kata Bantu Bilangan Jepang (助数詞)
//  (Hon, Mai, Hiki, Tou, Wa, Satsu, Dai, Ko, Tsu, Nin, Hai, Nichi)
//  Built to Universal Multi-Device Responsive Design Standards
// ══════════════════════════════════════════════════════════════════

import React, { useState, useMemo } from 'react';
import {
  X,
  Volume2,
  Sparkles,
  Search,
  RotateCcw,
  BookOpen,
  Calculator,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ChevronRight,
  ArrowRight,
  HelpCircle,
  Lightbulb,
  Hash,
  Layers,
} from 'lucide-react';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { speakJapanese } from '../../lib/audio/tts';
import { playSuccessSfx, playErrorSfx, playFlipSfx } from '../../lib/audio/sfx';
import {
  JapaneseCounter,
  CounterCategory,
  MASTER_COUNTERS,
  COUNTER_QUIZ_BANK,
  COUNTER_PITFALLS,
  CounterQuizQuestion,
} from '../../lib/counters/counterData';
import {
  searchCounters,
  filterCountersByCategory,
  calculateCounterReading,
} from '../../lib/counters/counterEngine';

interface CounterTrainerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'matrix' | 'quiz' | 'calculator' | 'pitfalls';
}

type MainTab = 'matrix' | 'quiz' | 'calculator' | 'pitfalls';

export const CounterTrainerModal: React.FC<CounterTrainerModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'matrix',
}) => {
  const containerRef = useFocusTrap<HTMLDivElement>(isOpen, onClose);
  const [activeTab, setActiveTab] = useState<MainTab>(initialTab);

  // Tab 1: Matrix state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CounterCategory | 'all'>('all');
  const [expandedCounterId, setExpandedCounterId] = useState<string | null>('hon');

  // Tab 2: Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState({ correct: 0, total: 0 });

  // Tab 3: Simulator / Calculator state
  const [calcCounterId, setCalcCounterId] = useState<string>('hon');
  const [calcNumber, setCalcNumber] = useState<number>(3);

  // Filtered Counters
  const filteredCounters = useMemo(() => {
    let list = searchCounters(searchQuery);
    if (selectedCategory !== 'all') {
      list = list.filter((c) => c.category === selectedCategory);
    }
    return list;
  }, [searchQuery, selectedCategory]);

  const currentQuizQuestion: CounterQuizQuestion = COUNTER_QUIZ_BANK[quizIndex] || COUNTER_QUIZ_BANK[0];

  const selectedCalcCounter = useMemo(() => {
    return MASTER_COUNTERS.find((c) => c.id === calcCounterId) || MASTER_COUNTERS[0];
  }, [calcCounterId]);

  const calcResult = useMemo(() => {
    return calculateCounterReading(selectedCalcCounter, calcNumber);
  }, [selectedCalcCounter, calcNumber]);

  // Escape key handler
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Sound handler
  const handlePlayAudio = (text: string) => {
    speakJapanese(text);
  };

  // Quiz Option Click
  const handleSelectQuizOption = (index: number) => {
    if (selectedOptionIndex !== null) return;
    setSelectedOptionIndex(index);

    const isCorrect = currentQuizQuestion.options[index]?.isCorrect;
    if (isCorrect) {
      playSuccessSfx();
      setQuizScore((prev) => ({ correct: prev.correct + 1, total: prev.total + 1 }));
    } else {
      playErrorSfx();
      setQuizScore((prev) => ({ ...prev, total: prev.total + 1 }));
    }
  };

  const handleNextQuiz = () => {
    playFlipSfx();
    setSelectedOptionIndex(null);
    setQuizIndex((prev) => (prev + 1) % COUNTER_QUIZ_BANK.length);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Pelatih Kata Bantu Bilangan Jepang (助数詞)"
    >
      <div
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-surface border-t-2 sm:border border-accent/25 rounded-t-3xl sm:rounded-3xl shadow-2xl z-10 max-h-[90dvh] sm:max-h-[92vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200 pb-[max(1rem,env(safe-area-inset-bottom))]"
      >
        {/* Mobile Drag Indicator */}
        <div className="flex sm:hidden justify-center pt-2.5 pb-1">
          <div className="w-12 h-1.5 rounded-full bg-accent/30" />
        </div>

        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-accent/15 bg-surface-2/70 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
              <Hash className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-extrabold text-appText-bright truncate">
                  Pelatih Kata Bantu Bilangan
                </h2>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 shrink-0 hidden sm:inline-block">
                  助数詞・音便
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-appText-muted truncate">
                Kuasai 本, 枚, 匹, 冊, 台, つ, aturan fonetis Onbin, & jebakan ujian JLPT
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-surface hover:bg-surface-3 text-appText-muted hover:text-appText-bright transition-colors active:scale-95 flex items-center justify-center"
            title="Tutup"
            aria-label="Tutup pelatih kata bantu bilangan"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Navigation Tabs */}
        <div className="border-b border-accent/15 bg-surface-2/40 px-3 sm:px-5 shrink-0">
          <div className="flex gap-2 overflow-x-auto scrollbar-none py-2.5">
            <button
              onClick={() => {
                playFlipSfx();
                setActiveTab('matrix');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-2 min-h-[40px] ${
                activeTab === 'matrix'
                  ? 'bg-accent text-surface shadow-md'
                  : 'bg-surface hover:bg-surface-3 text-appText-muted hover:text-appText-bright border border-accent/15'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Bagan & Kamus 助数詞</span>
            </button>

            <button
              onClick={() => {
                playFlipSfx();
                setActiveTab('quiz');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-2 min-h-[40px] ${
                activeTab === 'quiz'
                  ? 'bg-accent text-surface shadow-md'
                  : 'bg-surface hover:bg-surface-3 text-appText-muted hover:text-appText-bright border border-accent/15'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Kuis Tebak Penghitung</span>
              {quizScore.total > 0 && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-surface-3/80 text-appText-bright">
                  {quizScore.correct}/{quizScore.total}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                playFlipSfx();
                setActiveTab('calculator');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-2 min-h-[40px] ${
                activeTab === 'calculator'
                  ? 'bg-accent text-surface shadow-md'
                  : 'bg-surface hover:bg-surface-3 text-appText-muted hover:text-appText-bright border border-accent/15'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>Kalkulator Perubahan Bunyi</span>
            </button>

            <button
              onClick={() => {
                playFlipSfx();
                setActiveTab('pitfalls');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-2 min-h-[40px] ${
                activeTab === 'pitfalls'
                  ? 'bg-accent text-surface shadow-md'
                  : 'bg-surface hover:bg-surface-3 text-appText-muted hover:text-appText-bright border border-accent/15'
              }`}
            >
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>6 Jebakan Utama</span>
            </button>
          </div>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 min-w-0 overflow-y-auto p-4 sm:p-5 scrollbar-thin">
          {/* ══════════════════════════════════════════════════════════════ */}
          {/* TAB 1: BAGAN & KAMUS 助数詞                                 */}
          {/* ══════════════════════════════════════════════════════════════ */}
          {activeTab === 'matrix' && (
            <div className="space-y-4">
              {/* Search & Category Filter */}
              <div className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1 min-w-0">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-appText-muted" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari kanji, benda, atau arti (misal: botol, kucing, kertas, 本, 匹)..."
                    className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-surface-2 border border-accent/20 text-xs text-appText-bright placeholder-appText-muted focus:outline-none focus:border-accent"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-appText-muted hover:text-appText-bright text-xs p-1"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="flex gap-1.5 overflow-x-auto scrollbar-none shrink-0 py-0.5">
                  {(
                    [
                      { id: 'all', label: 'Semua' },
                      { id: 'bentuk', label: 'Bentuk Fisik' },
                      { id: 'makhluk', label: 'Makhluk Hidup' },
                      { id: 'mesin-kendaraan', label: 'Kendaraan/Mesin' },
                      { id: 'buku-kertas', label: 'Buku/Kertas' },
                      { id: 'wadah-makanan', label: 'Wadah/Makanan' },
                      { id: 'bangunan', label: 'Bangunan' },
                      { id: 'waktu-urutan', label: 'Waktu/Urutan' },
                      { id: 'umum', label: 'Universal' },
                    ] as const
                  ).map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                        selectedCategory === cat.id
                          ? 'bg-surface-3 text-accent font-bold border border-accent/30'
                          : 'bg-surface-2 hover:bg-surface-3 text-appText-muted'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Informative Guidance Banner */}
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs text-appText-bright leading-relaxed">
                  <span className="font-bold text-amber-300">Kunci Rahasia Menghitung: </span>
                  Angka 1 (いっ-), 6 (ろっ-), 8 (はっ-), dan 10 (じゅっ-) sering memicu{' '}
                  <span className="text-amber-300 font-semibold">Sokuon (konsonan kembar)</span>. Sedangkan angka 3 (さん) sering memicu{' '}
                  <span className="text-cyan-300 font-semibold">Rendaku (h $\rightarrow$ b, k $\rightarrow$ g)</span>. Klik kartu untuk melihat bagan 1–10 dan audio pelafalan!
                </div>
              </div>

              {/* Counters List */}
              <div className="space-y-3">
                {filteredCounters.length === 0 ? (
                  <div className="text-center py-8 text-appText-muted text-xs">
                    Tidak ada kata bantu bilangan yang cocok dengan pencarian "{searchQuery}".
                  </div>
                ) : (
                  filteredCounters.map((counter) => {
                    const isExpanded = expandedCounterId === counter.id;
                    return (
                      <div
                        key={counter.id}
                        className="rounded-2xl bg-surface-2 border border-accent/15 hover:border-accent/35 transition-all overflow-hidden"
                      >
                        {/* Header Bar */}
                        <div
                          onClick={() => setExpandedCounterId(isExpanded ? null : counter.id)}
                          className="p-3.5 sm:p-4 cursor-pointer hover:bg-surface-3/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-3.5 min-w-0">
                            <div className="w-11 h-11 rounded-2xl bg-surface text-accent font-black text-xl flex items-center justify-center shrink-0 border border-accent/20 shadow-sm">
                              {counter.kanji}
                            </div>

                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-sm sm:text-base font-extrabold text-appText-bright">
                                  {counter.nameId}
                                </span>
                                <span className="text-xs text-accent font-mono font-bold">
                                  ({counter.kana})
                                </span>
                              </div>
                              <div className="text-[11px] text-appText-muted truncate mt-0.5">
                                Untuk: {counter.targetObjectsId.slice(0, 4).join(', ')}...
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                            <span className="text-[10px] px-2.5 py-1 rounded-full bg-surface-3 text-appText-muted font-bold">
                              {counter.categoryLabel}
                            </span>
                            <span className="text-xs text-accent font-bold px-2 py-1 rounded-xl bg-accent/10 border border-accent/20">
                              Tanya: {counter.questionWord.kanji}
                            </span>
                          </div>
                        </div>

                        {/* Expanded Content: 1-10 Matrix & Audio Chips */}
                        {isExpanded && (
                          <div className="px-4 pb-4 pt-2 border-t border-accent/10 bg-surface-3/30 space-y-3.5 animate-in fade-in duration-200">
                            {/* Explanation & Pitfall */}
                            <div className="p-3 rounded-xl bg-surface/70 border border-accent/10 space-y-1.5 text-xs">
                              <div className="text-appText-bright leading-relaxed">
                                <span className="font-bold text-accent">Aturan Fonetis: </span>
                                {counter.ruleExplanationId}
                              </div>
                              <div className="text-rose-300 leading-relaxed pt-1 border-t border-accent/10">
                                <span className="font-bold text-rose-400">Peringatan: </span>
                                {counter.commonPitfallId}
                              </div>
                            </div>

                            {/* 1 to 10 Audio Chips Grid */}
                            <div className="space-y-1.5">
                              <div className="text-[11px] font-bold text-appText-muted uppercase tracking-wider flex items-center justify-between">
                                <span>Tabel Pelafalan Angka 1 s.d. 10</span>
                                <span className="text-[10px] lowercase text-accent">Klik nomor untuk audio native</span>
                              </div>

                              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                                {counter.readings1to10.map((item) => (
                                  <button
                                    key={item.number}
                                    type="button"
                                    onClick={() => handlePlayAudio(item.kana)}
                                    className={`p-2.5 rounded-xl border text-left transition-all active:scale-95 group flex flex-col justify-between ${
                                      item.changeType === 'sokuon'
                                        ? 'bg-amber-500/10 border-amber-500/30 hover:bg-amber-500/20'
                                        : item.changeType === 'rendaku'
                                        ? 'bg-purple-500/10 border-purple-500/30 hover:bg-purple-500/20'
                                        : item.changeType === 'wago'
                                        ? 'bg-cyan-500/10 border-cyan-500/30 hover:bg-cyan-500/20'
                                        : 'bg-surface border-accent/15 hover:border-accent/40'
                                    }`}
                                  >
                                    <div className="flex items-center justify-between w-full">
                                      <span className="text-xs font-black text-appText-bright">
                                        {item.kanji}
                                      </span>
                                      <Volume2 className="w-3.5 h-3.5 text-appText-muted group-hover:text-accent transition-colors" />
                                    </div>
                                    <div className="text-xs font-bold text-accent font-mono mt-1 truncate">
                                      {item.kana}
                                    </div>
                                    <div className="text-[10px] text-appText-muted truncate">
                                      {item.romaji}
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Example Sentence with Audio */}
                            <div className="p-3 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-between gap-3">
                              <div className="space-y-0.5 min-w-0">
                                <div className="text-[10px] uppercase font-bold text-accent">Contoh Kalimat Alami</div>
                                <div className="text-xs font-bold text-appText-bright">{counter.exampleSentence.jp}</div>
                                <div className="text-[11px] text-appText-muted">{counter.exampleSentence.id}</div>
                              </div>
                              <button
                                type="button"
                                onClick={() => handlePlayAudio(counter.exampleSentence.jp)}
                                className="w-9 h-9 rounded-xl bg-accent text-surface hover:opacity-90 transition-all flex items-center justify-center shrink-0 active:scale-95"
                                title="Dengarkan audio contoh"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* TAB 2: KUIS TEBAK PENGHITUNG                                */}
          {/* ══════════════════════════════════════════════════════════════ */}
          {activeTab === 'quiz' && currentQuizQuestion && (
            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-accent uppercase tracking-wider">
                  Latihan Interaktif Penghitung
                </span>
                <span className="text-xs font-extrabold text-appText-bright px-3 py-1 rounded-xl bg-surface-2 border border-accent/15">
                  Soal {quizIndex + 1} / {COUNTER_QUIZ_BANK.length}
                </span>
              </div>

              {/* Question Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-surface-2 border border-accent/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-accent/20 text-accent">
                      {currentQuizQuestion.objectName}
                    </span>
                    <span className="text-xs font-bold text-appText-muted font-mono">
                      Jumlah: {currentQuizQuestion.count}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handlePlayAudio(currentQuizQuestion.audioPhrase)}
                    className="text-appText-muted hover:text-accent p-1 flex items-center gap-1 text-xs font-semibold"
                    title="Dengarkan pelafalan kalimat"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Audio</span>
                  </button>
                </div>

                <div className="text-sm sm:text-base font-extrabold text-appText-bright">
                  {currentQuizQuestion.prompt}
                </div>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQuizQuestion.options.map((option, idx) => {
                  const isSelected = selectedOptionIndex === idx;
                  const isAnswered = selectedOptionIndex !== null;

                  let borderClass = 'border-accent/15 hover:border-accent/40 bg-surface-2';
                  if (isAnswered) {
                    if (option.isCorrect) {
                      borderClass = 'border-emerald-500 bg-emerald-500/15 text-emerald-200';
                    } else if (isSelected) {
                      borderClass = 'border-rose-500 bg-rose-500/15 text-rose-200';
                    } else {
                      borderClass = 'border-accent/10 opacity-60 bg-surface-2';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleSelectQuizOption(idx)}
                      className={`w-full p-4 rounded-2xl border text-left transition-all active:scale-98 flex items-start justify-between gap-3 ${borderClass}`}
                    >
                      <div className="min-w-0">
                        <div className="text-sm font-extrabold text-appText-bright">{option.text}</div>
                        {isAnswered && (
                          <p
                            className={`text-xs mt-2 font-medium leading-relaxed ${
                              option.isCorrect ? 'text-emerald-300' : 'text-rose-300'
                            }`}
                          >
                            {option.feedback}
                          </p>
                        )}
                      </div>

                      {isAnswered && (
                        <div className="shrink-0 mt-0.5">
                          {option.isCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          ) : isSelected ? (
                            <XCircle className="w-5 h-5 text-rose-400" />
                          ) : null}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Next Question Button */}
              {selectedOptionIndex !== null && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleNextQuiz}
                    className="px-5 py-2.5 rounded-xl bg-accent text-surface font-extrabold text-xs flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-md"
                  >
                    <span>Lanjut ke Soal Berikutnya</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* TAB 3: KALKULATOR PERUBAHAN BUNYI (ONBIN SIMULATOR)         */}
          {/* ══════════════════════════════════════════════════════════════ */}
          {activeTab === 'calculator' && (
            <div className="space-y-5 max-w-2xl mx-auto">
              <div className="text-center space-y-1">
                <h3 className="text-base sm:text-lg font-extrabold text-appText-bright">
                  Simulator & Kalkulator Perubahan Fonetis
                </h3>
                <p className="text-xs text-appText-muted">
                  Pilih kata bantu bilangan dan masukkan angka berapa saja (1 s.d. 100) untuk memeriksa bacaan akurat dan hukum fonetisnya.
                </p>
              </div>

              {/* Controls */}
              <div className="p-4 sm:p-5 rounded-2xl bg-surface-2 border border-accent/20 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-appText-muted uppercase tracking-wider">
                    Pilih Kata Bantu Bilangan (助数詞)
                  </label>
                  <div className="flex gap-1.5 overflow-x-auto scrollbar-none py-1">
                    {MASTER_COUNTERS.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          playFlipSfx();
                          setCalcCounterId(c.id);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                          calcCounterId === c.id
                            ? 'bg-accent text-surface shadow-sm'
                            : 'bg-surface hover:bg-surface-3 text-appText-muted border border-accent/15'
                        }`}
                      >
                        {c.kanji} ({c.nameId.split(' ')[0]})
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-appText-muted uppercase tracking-wider">
                      Masukkan Angka (1 s.d. 100)
                    </label>
                    <span className="text-sm font-black text-accent">{calcNumber}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={calcNumber}
                    onChange={(e) => setCalcNumber(parseInt(e.target.value, 10))}
                    className="w-full accent-accent cursor-pointer"
                  />
                  <div className="flex gap-1.5 overflow-x-auto scrollbar-none pt-1">
                    {[1, 2, 3, 4, 6, 8, 10, 14, 20, 23, 50, 100].map((num) => (
                      <button
                        key={num}
                        onClick={() => setCalcNumber(num)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                          calcNumber === num
                            ? 'bg-accent text-surface'
                            : 'bg-surface hover:bg-surface-3 text-appText-muted'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Live Result Display */}
              <div className="p-5 rounded-2xl bg-surface-2 border-2 border-accent shadow-xl space-y-4 animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-appText-muted">
                    Hasil Pembacaan Fonetis Akurat
                  </span>
                  <button
                    type="button"
                    onClick={() => handlePlayAudio(calcResult.kana)}
                    className="px-3 py-1.5 rounded-xl bg-accent text-surface text-xs font-bold flex items-center gap-1.5 active:scale-95 shadow-md"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Dengarkan Pelafalan</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-surface flex items-center justify-between gap-4">
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-appText-bright">
                      {calcResult.kanji}
                    </div>
                    <div className="text-lg font-bold text-amber-300 font-mono mt-0.5">
                      {calcResult.kana}
                    </div>
                    <div className="text-xs text-appText-muted font-medium">
                      {calcResult.romaji}
                    </div>
                  </div>

                  <span
                    className={`text-xs font-bold px-3 py-1.5 rounded-xl uppercase ${
                      calcResult.hasSoundChange
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    {calcResult.hasSoundChange ? 'Ada Onbin' : 'Teratur'}
                  </span>
                </div>

                <div className="text-xs text-appText-bright leading-relaxed p-3.5 rounded-xl bg-accent/10 border border-accent/20">
                  <span className="font-bold text-accent">Analisis Linguistik: </span>
                  {calcResult.phoneticExplanation}
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* TAB 4: 6 JEBAKAN UTAMA (PITFALLS & COMMON TRAPS)            */}
          {/* ══════════════════════════════════════════════════════════════ */}
          {activeTab === 'pitfalls' && (
            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="text-center space-y-1">
                <h3 className="text-base sm:text-lg font-extrabold text-appText-bright">
                  6 Jebakan Mematikan Kata Bantu Bilangan
                </h3>
                <p className="text-xs text-appText-muted">
                  Kesalahan paling sering terjadi pada pembelajar Indonesia dan trik jitu menaklukkannya di ujian JLPT & JFT.
                </p>
              </div>

              <div className="space-y-3.5">
                {COUNTER_PITFALLS.map((guide) => (
                  <div
                    key={guide.id}
                    className="p-4 sm:p-5 rounded-2xl bg-surface-2 border border-accent/15 space-y-3"
                  >
                    <h4 className="text-sm font-extrabold text-appText-bright flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{guide.title}</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                      <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-1">
                        <div className="text-[10px] font-bold uppercase text-rose-400">
                          Jebakan / Anggapan Keliru
                        </div>
                        <p className="text-rose-200 leading-relaxed">{guide.trap}</p>
                      </div>

                      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                        <div className="text-[10px] font-bold uppercase text-emerald-400">
                          Standar yang Benar
                        </div>
                        <p className="text-emerald-200 leading-relaxed">{guide.correction}</p>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-surface border border-accent/10 text-xs text-appText-muted leading-relaxed">
                      <span className="font-bold text-accent">Alasan Budaya & Sejarah: </span>
                      {guide.reason}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
