// ══════════════════════════════════════════════════════════════════
//  QuizExitGuardModal.tsx — Guard Against Accidental Navigation Mid-Quiz
// ══════════════════════════════════════════════════════════════════

import React from 'react';
import { AlertCircle, ArrowLeft, Check } from 'lucide-react';

interface QuizExitGuardModalProps {
  isOpen: boolean;
  onStay: () => void;
  onConfirmExit: () => void;
}

export const QuizExitGuardModal: React.FC<QuizExitGuardModalProps> = ({
  isOpen,
  onStay,
  onConfirmExit,
}) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onStay}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-label="Konfirmasi Tinggalkan Kuis"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm bg-surface border-2 border-amber-500/40 rounded-3xl p-6 sm:p-7 space-y-5 shadow-2xl relative animate-in zoom-in-95 duration-200 text-center"
      >
        <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/35 flex items-center justify-center text-accent-hot mx-auto shadow-sm">
          <AlertCircle className="w-6 h-6" />
        </div>

        <div className="space-y-1.5">
          <h3 className="text-base sm:text-lg font-bold text-appText-bright">
            Tinggalkan Sesi Kuis?
          </h3>
          <p className="text-xs text-appText-muted leading-relaxed">
            Progres dan poin XP dari sesi latihan yang sedang berlangsung belum tersimpan jika kamu keluar sekarang.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={onStay}
            className="px-4 py-2.5 rounded-xl bg-accent hover:bg-accent-hot text-bg font-bold text-xs transition-all shadow-glow flex items-center justify-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Lanjutkan</span>
          </button>
          <button
            onClick={onConfirmExit}
            className="px-4 py-2.5 rounded-xl bg-surface-2 hover:bg-red-950/40 border border-red-500/30 text-red-300 font-bold text-xs transition-all flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Keluar Sesi</span>
          </button>
        </div>
      </div>
    </div>
  );
};
