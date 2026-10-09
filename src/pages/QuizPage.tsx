import React, { useState, useEffect } from 'react';
import { Layers, RotateCcw, Volume2, Sparkles, Check, ArrowRight, CornerDownLeft } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { QuizMode } from '../types/quiz';
import { JLPTLevel } from '../types/vocab';
import { loadVocab, loadGrammar } from '../lib/data/dataManager';
import { generateQuizQuestions, QuizQuestionItem } from '../lib/quiz/quizEngine';
import { speakJapanese } from '../lib/audio/tts';
import { QuizResultView } from '../components/quiz/QuizResultView';

export const QuizPage: React.FC = () => {
  const { selectedLevel, showToast, incrementXp, setActiveTab } = useAppStore();
  const [activeMode, setActiveMode] = useState<QuizMode>('flashcard');

  // Question state
  const [questions, setQuestions] = useState<QuizQuestionItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Interaction state
  const [isFlipped, setIsFlipped] = useState(false); // for flashcards
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  // Rearrange mode tokens state
  const [assembledTokens, setAssembledTokens] = useState<string[]>([]);
  const [availableTokens, setAvailableTokens] = useState<string[]>([]);

  // Results tracking
  const [userAnswers, setUserAnswers] = useState<Array<{ question: QuizQuestionItem; isCorrect: boolean; selected: string }>>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [sessionScore, setSessionScore] = useState(0);
  const [sessionXp, setSessionXp] = useState(0);

  const quizModes: Array<{ id: QuizMode; label: string; desc: string; icon: string }> = [
    { id: 'flashcard', label: 'Flashcard 3D', desc: 'Kartu bolak-balik dengan rating FSRS', icon: '🃏' },
    { id: 'multiple-choice', label: 'Pilihan Ganda', desc: 'Tebak arti & cara baca kata yang tepat', icon: '🔘' },
    { id: 'conjugation', label: 'Konjugasi Verba', desc: 'Ubah bentuk kata kerja Te, Nai, Ta, dsb.', icon: '🔄' },
    { id: 'fill-in', label: 'Isian Kosong', desc: 'Lengkapi partikel atau kata yang hilang', icon: '✍️' },
    { id: 'rearrange', label: 'Susun Kalimat', desc: 'Urutkan potongan kata menjadi kalimat utuh', icon: '🧩' },
    { id: 'translation', label: 'Terjemahan', desc: 'Latihan alih bahasa Jepang ke Indonesia', icon: '🌐' },
    { id: 'error-find', label: 'Cari Kesalahan', desc: 'Temukan padanan yang paling tepat', icon: '🔍' },
  ];

  // Load questions for the selected mode & level
  const loadNewSession = async () => {
    setIsLoading(true);
    setIsFinished(false);
    setCurrentIndex(0);
    setSessionScore(0);
    setSessionXp(0);
    setUserAnswers([]);
    setSelectedOption(null);
    setFeedback(null);
    setIsFlipped(false);

    try {
      const targetLevel: JLPTLevel = selectedLevel === 'all' ? 'n5' : selectedLevel;
      const [vocabs, grammars] = await Promise.all([
        loadVocab(targetLevel),
        loadGrammar(targetLevel),
      ]);

      const items = generateQuizQuestions(activeMode, vocabs, grammars, targetLevel, 10);
      setQuestions(items);

      if (items.length > 0 && activeMode === 'rearrange' && items[0].tokens) {
        setAvailableTokens(items[0].tokens);
        setAssembledTokens([]);
      }
    } catch (e) {
      console.error('[QuizPage] Failed to generate quiz questions', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadNewSession();
  }, [activeMode, selectedLevel]);

  const currentQ = questions[currentIndex];

  // Set up tokens when moving to next rearrange question
  useEffect(() => {
    if (currentQ && activeMode === 'rearrange' && currentQ.tokens) {
      setAvailableTokens(currentQ.tokens);
      setAssembledTokens([]);
    }
  }, [currentIndex, currentQ, activeMode]);

  // Keyboard shortcut listener (Space to flip/advance, 1-4 for choices)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFinished || !currentQ) return;

      // Flashcard mode
      if (activeMode === 'flashcard') {
        if (e.code === 'Space') {
          e.preventDefault();
          setIsFlipped((prev) => !prev);
        } else if (isFlipped && ['Digit1', 'Digit2', 'Digit3', 'Digit4'].includes(e.code)) {
          const rating = parseInt(e.key, 10);
          handleFlashcardRate(rating);
        }
        return;
      }

      // Choice modes (multiple-choice, conjugation, fill-in, translation, error-find)
      if (currentQ.options && !feedback) {
        if (['Digit1', 'Digit2', 'Digit3', 'Digit4'].includes(e.code)) {
          const optIdx = parseInt(e.key, 10) - 1;
          if (currentQ.options[optIdx]) {
            handleSelectOption(currentQ.options[optIdx]);
          }
        }
      } else if (feedback && (e.code === 'Enter' || e.code === 'Space')) {
        handleNextQuestion();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFinished, currentQ, activeMode, isFlipped, feedback]);

  // Handle Flashcard Rating (FSRS quality 1 to 4)
  const handleFlashcardRate = (quality: number) => {
    const isCorrect = quality >= 3;
    const gainedXp = quality * 3;
    incrementXp(gainedXp);
    setSessionXp((prev) => prev + gainedXp);

    if (isCorrect) setSessionScore((prev) => prev + 1);

    setUserAnswers((prev) => [
      ...prev,
      {
        question: currentQ,
        isCorrect,
        selected: `Rating ${quality}`,
      },
    ]);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    } else {
      setIsFinished(true);
    }
  };

  // Handle Multiple Choice Selection
  const handleSelectOption = (opt: string) => {
    if (selectedOption || feedback) return;
    setSelectedOption(opt);

    const isCorrect = opt.trim().toLowerCase() === currentQ.correctAnswer.trim().toLowerCase();
    const gainedXp = isCorrect ? 10 : 2;
    incrementXp(gainedXp);
    setSessionXp((prev) => prev + gainedXp);

    if (isCorrect) {
      setSessionScore((prev) => prev + 1);
      setFeedback({
        isCorrect: true,
        text: 'Bagus sekali! 正解です！ ✨',
      });
    } else {
      setFeedback({
        isCorrect: false,
        text: `Hampir benar! Jawaban tepat: "${currentQ.correctAnswer}"`,
      });
    }

    setUserAnswers((prev) => [
      ...prev,
      {
        question: currentQ,
        isCorrect,
        selected: opt,
      },
    ]);
  };

  // Handle Rearrange Token Tap
  const handleAddToken = (token: string, idx: number) => {
    if (feedback) return;
    setAssembledTokens((prev) => [...prev, token]);
    setAvailableTokens((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleRemoveToken = (token: string, idx: number) => {
    if (feedback) return;
    setAvailableTokens((prev) => [...prev, token]);
    setAssembledTokens((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleCheckRearrange = () => {
    const assembledStr = assembledTokens.join('');
    const isCorrect = assembledStr === currentQ.correctAnswer;
    const gainedXp = isCorrect ? 15 : 3;
    incrementXp(gainedXp);
    setSessionXp((prev) => prev + gainedXp);

    if (isCorrect) {
      setSessionScore((prev) => prev + 1);
      setFeedback({
        isCorrect: true,
        text: 'Hebat! Kalimat tersusun sempurna! 🎉',
      });
    } else {
      setFeedback({
        isCorrect: false,
        text: `Urutan yang tepat: "${currentQ.correctAnswer}"`,
      });
    }

    setUserAnswers((prev) => [
      ...prev,
      {
        question: currentQ,
        isCorrect,
        selected: assembledStr,
      },
    ]);
  };

  // Advance to next question
  const handleNextQuestion = () => {
    setSelectedOption(null);
    setFeedback(null);
    setIsFlipped(false);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-6 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-extrabold text-appText-bright mb-1">Arena Kuis · 練習アリーナ</h1>
        <p className="text-xs text-appText-muted">Latih pemahaman kosakata, tata bahasa, dan konjugasi verba secara mendalam.</p>
      </div>

      {/* Mode Carousel */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {quizModes.map((mode) => {
          const isSelected = activeMode === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => setActiveMode(mode.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-accent text-bg border-accent shadow-sm'
                  : 'bg-surface-2 border-accent/20 text-appText-muted hover:text-appText-bright'
              }`}
            >
              <span>{mode.icon}</span>
              <span>{mode.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Arena Content */}
      {isLoading ? (
        <div className="py-20 text-center text-xs text-appText-muted animate-pulse">
          Menyiapkan latihan {activeMode}... 🍙
        </div>
      ) : isFinished ? (
        <QuizResultView
          score={sessionScore}
          total={questions.length}
          xpEarned={sessionXp}
          answers={userAnswers}
          onRestart={loadNewSession}
          onGoHome={() => setActiveTab('home')}
        />
      ) : !currentQ ? (
        <div className="bg-surface border border-accent/20 rounded-3xl p-8 text-center space-y-3">
          <p className="text-xs text-appText-muted">Belum ada bank soal yang tersedia untuk mode ini.</p>
          <button
            onClick={loadNewSession}
            className="px-4 py-2 rounded-xl bg-accent text-bg font-bold text-xs"
          >
            Muat Ulang
          </button>
        </div>
      ) : (
        <div className="max-w-xl mx-auto space-y-5">
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs text-appText-muted">
            <span className="font-mono">
              Soal {currentIndex + 1} dari {questions.length}
            </span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-accent uppercase">{currentQ.level}</span>
              <div className="w-24 bg-surface-2 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-accent h-full transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Mode 1: Flashcard */}
          {activeMode === 'flashcard' && (
            <div className="space-y-4">
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className={`cursor-pointer min-h-[300px] rounded-3xl border-2 p-8 flex flex-col justify-between text-center transition-all duration-300 select-none shadow-xl ${
                  isFlipped
                    ? 'bg-amber-950/40 border-amber-500/60'
                    : 'bg-surface border-accent/30 hover:border-accent/50'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-appText-muted">
                  <span className="font-semibold text-accent">{currentQ.prompt}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speakJapanese(currentQ.questionText);
                    }}
                    className="p-1 rounded-lg bg-surface hover:bg-surface-2 text-appText-muted hover:text-accent"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="my-auto space-y-3">
                  {!isFlipped ? (
                    <>
                      <div className="text-4xl sm:text-5xl font-jp font-bold text-appText-bright">
                        {currentQ.questionText}
                      </div>
                      {currentQ.subText && (
                        <div className="text-sm font-jp text-amber-300">
                          {currentQ.subText}
                        </div>
                      )}
                      <div className="text-xs text-appText-muted pt-3">
                        Tap kartu atau tekan <kbd className="font-mono bg-surface-2 px-1.5 py-0.5 rounded text-[10px]">Spasi</kbd> untuk membalik
                      </div>
                    </>
                  ) : (
                    <div className="space-y-3 animate-in zoom-in-95 duration-200">
                      <div className="text-2xl sm:text-3xl font-bold text-appText-bright">
                        {currentQ.correctAnswer}
                      </div>
                      <div className="text-xs text-appText-muted bg-surface-2/60 p-3 rounded-2xl border border-accent/15 leading-relaxed">
                        {currentQ.explanation}
                      </div>
                    </div>
                  )}
                </div>

                <div className="text-[11px] text-appText-muted/50">
                  {isFlipped ? 'Pilih tingkat pengingatan di bawah' : 'Nugget Nihongo Flashcard'}
                </div>
              </div>

              {/* FSRS Rating Buttons */}
              {isFlipped ? (
                <div className="grid grid-cols-4 gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
                  <button
                    onClick={() => handleFlashcardRate(1)}
                    className="py-3 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-red-300 text-xs font-bold transition-all flex flex-col items-center gap-1"
                  >
                    <span>Lupa</span>
                    <kbd className="text-[9px] opacity-60">1</kbd>
                  </button>
                  <button
                    onClick={() => handleFlashcardRate(2)}
                    className="py-3 rounded-xl bg-amber-950/40 hover:bg-amber-900/60 border border-amber-500/30 text-amber-300 text-xs font-bold transition-all flex flex-col items-center gap-1"
                  >
                    <span>Ragu</span>
                    <kbd className="text-[9px] opacity-60">2</kbd>
                  </button>
                  <button
                    onClick={() => handleFlashcardRate(3)}
                    className="py-3 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 text-xs font-bold transition-all flex flex-col items-center gap-1"
                  >
                    <span>Ingat</span>
                    <kbd className="text-[9px] opacity-60">3</kbd>
                  </button>
                  <button
                    onClick={() => handleFlashcardRate(4)}
                    className="py-3 rounded-xl bg-sky-950/40 hover:bg-sky-900/60 border border-sky-500/30 text-sky-300 text-xs font-bold transition-all flex flex-col items-center gap-1"
                  >
                    <span>Mudah</span>
                    <kbd className="text-[9px] opacity-60">4</kbd>
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <button
                    onClick={() => setIsFlipped(true)}
                    className="px-6 py-3 rounded-xl bg-accent text-bg font-bold text-xs shadow-glow hover:bg-accent-hot transition-all"
                  >
                    Lihat Jawaban (Spasi)
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mode 2, 3, 5, 6, 7: Multiple Choice, Conjugation, Fill-in, Translation, Error Find */}
          {activeMode !== 'flashcard' && activeMode !== 'rearrange' && (
            <div className="space-y-4">
              {/* Question Card */}
              <div className="bg-surface border-2 border-accent/25 rounded-3xl p-6 sm:p-8 space-y-3 shadow-lg relative">
                <div className="text-xs font-bold text-accent">{currentQ.prompt}</div>
                <div className="text-3xl sm:text-4xl font-jp font-bold text-appText-bright">
                  {currentQ.questionText}
                </div>
                {currentQ.subText && (
                  <div className="text-xs text-appText-muted">{currentQ.subText}</div>
                )}
                <button
                  onClick={() => speakJapanese(currentQ.questionText)}
                  className="absolute right-5 top-5 p-2 rounded-xl bg-surface-2 hover:bg-surface-3 text-appText-muted hover:text-accent transition-all"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 gap-2.5">
                {currentQ.options?.map((opt, idx) => {
                  const isSelected = selectedOption === opt;
                  const isCorrect = opt.trim().toLowerCase() === currentQ.correctAnswer.trim().toLowerCase();

                  let btnStyle = 'bg-surface-2 border-accent/20 text-appText-bright hover:border-accent/40';
                  if (feedback) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-950/50 border-emerald-500 text-emerald-300 font-bold';
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'bg-red-950/50 border-red-500 text-red-300 font-bold';
                    } else {
                      btnStyle = 'bg-surface-2/40 border-transparent text-appText-muted opacity-50';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(opt)}
                      disabled={!!feedback}
                      className={`w-full p-4 rounded-2xl border text-sm font-semibold text-left transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-surface border border-accent/15 flex items-center justify-center text-xs font-mono text-appText-muted shrink-0">
                          {idx + 1}
                        </span>
                        <span className="font-jp">{opt}</span>
                      </div>
                      {feedback && isCorrect && <Check className="w-4 h-4 text-emerald-400" />}
                    </button>
                  );
                })}
              </div>

              {/* Feedback Bar & Next Button */}
              {feedback && (
                <div
                  className={`p-4 rounded-2xl border flex items-center justify-between gap-3 animate-in fade-in duration-200 ${
                    feedback.isCorrect
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                      : 'bg-red-950/40 border-red-500/40 text-red-300'
                  }`}
                >
                  <div className="text-xs leading-relaxed">{feedback.text}</div>
                  <button
                    onClick={handleNextQuestion}
                    className="px-4 py-2 rounded-xl bg-accent text-bg font-bold text-xs flex items-center gap-1.5 shrink-0 hover:bg-accent-hot transition-all shadow-glow"
                  >
                    <span>Lanjut</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mode 4: Rearrange */}
          {activeMode === 'rearrange' && (
            <div className="space-y-4">
              <div className="bg-surface border-2 border-accent/25 rounded-3xl p-6 space-y-2">
                <div className="text-xs font-bold text-accent">{currentQ.prompt}</div>
                <div className="text-lg font-bold text-appText-bright">"{currentQ.questionText}"</div>
              </div>

              {/* Assembled Sentence Box */}
              <div className="min-h-[70px] bg-surface-2 border border-accent/30 rounded-2xl p-4 flex flex-wrap gap-2 items-center">
                {assembledTokens.length === 0 ? (
                  <span className="text-xs text-appText-muted/60 italic">
                    Ketuk kata di bawah untuk mulai menyusun kalimat...
                  </span>
                ) : (
                  assembledTokens.map((token, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleRemoveToken(token, idx)}
                      className="px-3.5 py-2 rounded-xl bg-amber-500 text-bg font-jp font-bold text-sm shadow-sm hover:opacity-90 transition-all"
                    >
                      {token}
                    </button>
                  ))
                )}
              </div>

              {/* Available Token Chips */}
              <div className="flex flex-wrap gap-2.5 p-2">
                {availableTokens.map((token, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAddToken(token, idx)}
                    className="px-4 py-2.5 rounded-xl bg-surface border border-accent/25 hover:border-accent text-appText-bright font-jp font-bold text-sm hover:-translate-y-0.5 transition-all shadow-sm"
                  >
                    {token}
                  </button>
                ))}
              </div>

              {/* Check Answer Button */}
              {!feedback ? (
                <div className="text-center pt-2">
                  <button
                    onClick={handleCheckRearrange}
                    disabled={assembledTokens.length === 0}
                    className="px-6 py-3 rounded-xl bg-accent text-bg font-bold text-xs shadow-glow hover:bg-accent-hot transition-all disabled:opacity-50"
                  >
                    Periksa Jawaban
                  </button>
                </div>
              ) : (
                <div
                  className={`p-4 rounded-2xl border flex items-center justify-between gap-3 animate-in fade-in duration-200 ${
                    feedback.isCorrect
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                      : 'bg-red-950/40 border-red-500/40 text-red-300'
                  }`}
                >
                  <div className="text-xs leading-relaxed">{feedback.text}</div>
                  <button
                    onClick={handleNextQuestion}
                    className="px-4 py-2 rounded-xl bg-accent text-bg font-bold text-xs flex items-center gap-1.5 shrink-0 hover:bg-accent-hot transition-all shadow-glow"
                  >
                    <span>Lanjut</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
