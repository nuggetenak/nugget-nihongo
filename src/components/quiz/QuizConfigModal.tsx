// ══════════════════════════════════════════════════════════════════
//  QuizConfigModal.tsx — Custom Quiz Arena Session Configuration
//  Customize question count (5, 10, 20, 50), focus levels, and modes
// ══════════════════════════════════════════════════════════════════

import React from 'react';
import { X, Settings2, Sparkles, Check, Play } from 'lucide-react';
import { QuizMode } from '../../types/quiz';
import { JLPTLevel } from '../../types/vocab';

interface QuizConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCount: number;
  onSelectCount: (count: number) => void;
  selectedLevel: JLPTLevel | 'all';
  onSelectLevel: (lvl: JLPTLevel | 'all') => void;
  selectedMode: QuizMode;
  onSelectMode: (mode: QuizMode) => void;
  onStartSession: () => void;
}

export const QuizConfigModal: React.FC<QuizConfigModalProps> = ({
  isOpen,
  onClose,
  selectedCount,
  onSelectCount,
  selectedLevel,
  onSelectLevel,
  selectedMode,
  onSelectMode,
  onStartSession,
}) => {
  if (!isOpen) return null;

  const countOptions = [
    { count: 5, label: '5 Soal', desc: 'Sesi kilat 2 menit' },
    { count: 10, label: '10 Soal', desc: 'Standar harian (Rekomendasi)' },
    { count: 20, label: '20 Soal', desc: 'Drilling intensif' },
    { count: 50, label: '50 Soal', desc: 'Marathon persiapan ujian' },
  ];

  const levels: Array<{ id: JLPTLevel | 'all'; label: string }> = [
    { id: 'all', label: 'Semua Level' },
    { id: 'n5', label: 'JLPT N5' },
    { id: 'n4', label: 'JLPT N4' },
    { id: 'n3', label: 'JLPT N3' },
    { id: 'n2', label: 'JLPT N2' },
    { id: 'n1', label: 'JLPT N1' },
  ];

  const modes: Array<{ id: QuizMode; label: string; icon: string }> = [
    { id: 'flashcard', label: 'Flashcard 3D', icon: '🃏' },
    { id: 'multiple-choice', label: 'Pilihan Ganda', icon: '🔘' },
    { id: 'listening', label: 'Latihan Mendengar', icon: '🎧' },
    { id: 'conjugation', label: 'Konjugasi Verba', icon: '🔄' },
    { id: 'fill-in', label: 'Isian Kosong', icon: '✍️' },
    { id: 'rearrange', label: 'Susun Kalimat', icon: '🧩' },
    { id: 'translation', label: 'Terjemahan', icon: '🌐' },
    { id: 'error-find', label: 'Cari Kesalahan', icon: '🔍' },
  ];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-label="Pengaturan Sesi Latihan"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg max-h-[88dvh] sm:max-h-[90vh] overflow-y-auto bg-surface border-t-2 sm:border-2 border-accent/30 rounded-t-3xl sm:rounded-3xl p-5 sm:p-8 space-y-5 sm:space-y-6 shadow-2xl relative animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200 scrollbar-none"
      >
        {/* Mobile Drag Handle Pill */}
        <div className="w-12 h-1.5 rounded-full bg-accent/25 mx-auto -mt-1 mb-2 sm:hidden shrink-0" />
        {/* Header */}
        <div className="flex items-center justify-between border-b border-accent/15 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-accent shadow-glow">
              <Settings2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-appText-bright">Pengaturan Sesi Kuis</h2>
              <p className="text-xs text-appText-muted">Sesuaikan target latihan sesuai kebutuhanmu.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-2 hover:bg-surface-3 flex items-center justify-center text-appText-muted hover:text-appText-bright transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Question Count Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-accent uppercase tracking-wider">
            Jumlah Soal per Sesi:
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {countOptions.map((opt) => (
              <button
                key={opt.count}
                onClick={() => onSelectCount(opt.count)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  selectedCount === opt.count
                    ? 'bg-amber-500/20 border-accent text-accent-hot shadow-sm font-bold'
                    : 'bg-surface-2 border-accent/15 text-appText-muted hover:text-appText-bright'
                }`}
              >
                <div className="text-sm font-bold text-appText-bright">{opt.label}</div>
                <div className="text-[10px] text-appText-muted mt-0.5">{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Target Level Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-accent uppercase tracking-wider">
            Target Tingkat Kemampuan:
          </label>
          <div className="flex flex-wrap gap-2">
            {levels.map((lvl) => (
              <button
                key={lvl.id}
                onClick={() => onSelectLevel(lvl.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  selectedLevel === lvl.id
                    ? 'bg-accent text-bg border-accent font-bold shadow-sm'
                    : 'bg-surface-2 border-accent/15 text-appText-muted hover:text-appText-bright'
                }`}
              >
                {lvl.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mode Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-accent uppercase tracking-wider">
            Pilih Mode Kuis:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {modes.map((m) => (
              <button
                key={m.id}
                onClick={() => onSelectMode(m.id)}
                className={`p-2.5 rounded-xl border text-xs font-medium flex items-center gap-2 transition-all ${
                  selectedMode === m.id
                    ? 'bg-amber-500/25 border-accent text-accent-hot font-bold shadow-sm'
                    : 'bg-surface-2 border-accent/15 text-appText-muted hover:text-appText-bright'
                }`}
              >
                <span>{m.icon}</span>
                <span className="truncate">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <div className="pt-2">
          <button
            onClick={() => {
              onStartSession();
              onClose();
            }}
            className="w-full py-3 rounded-2xl bg-accent hover:bg-accent-hot text-bg font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-glow"
          >
            <Play className="w-4 h-4 fill-bg" />
            <span>Terapkan & Mulai Sesi Baru</span>
          </button>
        </div>
      </div>
    </div>
  );
};
