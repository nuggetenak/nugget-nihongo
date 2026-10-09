import React, { useState } from 'react';
import { Layers, CheckCircle2, RotateCcw, Sparkles, BookOpen, Shuffle } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { QuizMode } from '../types/quiz';
import { JLPTLevel } from '../types/vocab';

export const QuizPage: React.FC = () => {
  const { selectedLevel, setSelectedLevel, showToast, incrementXp } = useAppStore();
  const [activeMode, setActiveMode] = useState<QuizMode>('flashcard');
  const [isFlipped, setIsFlipped] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);

  const quizModes: Array<{ id: QuizMode; label: string; desc: string; icon: string }> = [
    { id: 'flashcard', label: 'Flashcard 3D', desc: 'Kartu bolak-balik dengan rating FSRS', icon: '🃏' },
    { id: 'multiple-choice', label: 'Pilihan Ganda', desc: 'Tebak arti & cara baca kata yang tepat', icon: '🔘' },
    { id: 'fill-in', label: 'Isian Kosong', desc: 'Lengkapi partikel atau kata yang hilang', icon: '✍️' },
    { id: 'rearrange', label: 'Susun Kalimat', desc: 'Urutkan potongan kata menjadi kalimat utuh', icon: '🧩' },
    { id: 'conjugation', label: 'Konjugasi Verba', desc: 'Ubah bentuk kata kerja Te, Nai, Ta, dsb.', icon: '🔄' },
    { id: 'translation', label: 'Terjemahan', desc: 'Latihan alih bahasa Jepang ke Indonesia', icon: '🌐' },
    { id: 'error-find', label: 'Cari Kesalahan', desc: 'Temukan kesalahan partikel dalam kalimat', icon: '🔍' },
  ];

  // Sample interactive flashcard items for demo testing
  const sampleCards = [
    { jp: '食べる', reading: 'たべる', id: 'makan (kata kerja Ichidan)', type: 'Kata Kerja', ex: '朝ごはんを食べる。' },
    { jp: '行く', reading: 'いく', id: 'pergi (kata kerja Godan)', type: 'Kata Kerja', ex: '学校へ行く。' },
    { jp: '新しい', reading: 'あたらしい', id: 'baru (i-adjective)', type: 'Kata Sifat', ex: '新しい本を買いました。' },
  ];

  const currentCard = sampleCards[questionIndex % sampleCards.length];

  const handleRate = (quality: number, label: string) => {
    incrementXp(quality * 3);
    showToast(`Tersimpan: ${label} (+${quality * 3} XP)`, '✨');
    setIsFlipped(false);
    setQuestionIndex((prev) => prev + 1);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-extrabold text-appText-bright mb-1">Arena Kuis · 練習アリーナ</h1>
        <p className="text-xs text-appText-muted">Tersedia 7 mode latihan interaktif yang disesuaikan dengan kurikulum FSRS.</p>
      </div>

      {/* Mode Selector Pill Carousel */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {quizModes.map((mode) => {
          const isSelected = activeMode === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => {
                setActiveMode(mode.id);
                setIsFlipped(false);
              }}
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

      {/* Main Quiz Interaction Arena */}
      <div className="max-w-xl mx-auto space-y-6">
        {/* Flashcard Component */}
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className={`cursor-pointer min-h-[280px] sm:min-h-[320px] rounded-3xl border-2 p-8 flex flex-col justify-between text-center transition-all duration-300 select-none shadow-xl ${
            isFlipped
              ? 'bg-amber-950/40 border-amber-500/60'
              : 'bg-surface border-accent/30 hover:border-accent/50'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-appText-muted">
            <span className="font-mono">Kartu #{questionIndex + 1}</span>
            <span className="text-accent font-semibold">{currentCard.type}</span>
          </div>

          <div className="my-auto space-y-3">
            {!isFlipped ? (
              <>
                <div className="text-4xl sm:text-5xl font-jp font-bold text-appText-bright">
                  {currentCard.jp}
                </div>
                <div className="text-xs text-appText-muted flex items-center justify-center gap-1.5 pt-2">
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Tap kartu atau tekan Spasi untuk membalik</span>
                </div>
              </>
            ) : (
              <div className="space-y-3 animate-in zoom-in-95 duration-200">
                <div className="text-lg font-jp text-amber-300">
                  【{currentCard.reading}】
                </div>
                <div className="text-2xl font-bold text-appText-bright">
                  {currentCard.id}
                </div>
                <div className="text-xs text-appText-muted/80 italic mt-2 bg-surface-2/60 p-2.5 rounded-xl border border-accent/15">
                  "{currentCard.ex}"
                </div>
              </div>
            )}
          </div>

          <div className="text-[11px] text-appText-muted/50">
            {isFlipped ? 'Pilih tingkat pengingatan di bawah' : 'Nugget Nihongo Flashcard'}
          </div>
        </div>

        {/* FSRS Rating Buttons (Visible when flipped) */}
        {isFlipped ? (
          <div className="grid grid-cols-4 gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <button
              onClick={() => handleRate(1, 'Lupa')}
              className="py-3 px-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-red-300 text-xs font-bold transition-all flex flex-col items-center gap-1"
            >
              <span>Lupa</span>
              <kbd className="text-[9px] opacity-60">1</kbd>
            </button>
            <button
              onClick={() => handleRate(2, 'Ragu')}
              className="py-3 px-2 rounded-xl bg-amber-950/40 hover:bg-amber-900/60 border border-amber-500/30 text-amber-300 text-xs font-bold transition-all flex flex-col items-center gap-1"
            >
              <span>Ragu</span>
              <kbd className="text-[9px] opacity-60">2</kbd>
            </button>
            <button
              onClick={() => handleRate(3, 'Ingat')}
              className="py-3 px-2 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 text-xs font-bold transition-all flex flex-col items-center gap-1"
            >
              <span>Ingat</span>
              <kbd className="text-[9px] opacity-60">3</kbd>
            </button>
            <button
              onClick={() => handleRate(4, 'Mudah')}
              className="py-3 px-2 rounded-xl bg-sky-950/40 hover:bg-sky-900/60 border border-sky-500/30 text-sky-300 text-xs font-bold transition-all flex flex-col items-center gap-1"
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
    </div>
  );
};
