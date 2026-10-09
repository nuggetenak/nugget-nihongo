import React from 'react';
import { ArrowRight, X } from 'lucide-react';
import { useGamificationStore } from '../../lib/gamification/gamificationStore';
import { useAppStore } from '../../store/useAppStore';

export const StreakBrokenModal: React.FC = () => {
  const { isStreakBrokenModalOpen, closeStreakBrokenModal, streakBrokenTip } = useGamificationStore();
  const { setActiveTab } = useAppStore();

  if (!isStreakBrokenModalOpen) return null;

  const handleStartStudy = () => {
    closeStreakBrokenModal();
    setActiveTab('quiz');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-[#181410] border border-amber-900/50 rounded-3xl p-6 sm:p-8 relative text-center shadow-2xl scrollbar-none"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeStreakBrokenModal}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-200 rounded-full hover:bg-white/5 transition-colors"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-3xl shadow-glow">
          🔥
        </div>

        <h3 className="text-xl font-extrabold text-appText-bright mb-2">
          Streak Terputus, Tapi Jangan Menyerah!
        </h3>

        <div className="p-4 my-4 rounded-2xl bg-amber-950/30 border border-amber-800/30 text-amber-200/90 text-xs sm:text-sm leading-relaxed italic">
          "{streakBrokenTip}"
        </div>

        <p className="text-xs text-appText-muted mb-6 leading-relaxed">
          Satu hari jeda adalah hal manusiawi. Yang terpenting adalah kembali melangkah hari ini tanpa rasa bersalah.
        </p>

        <button
          onClick={handleStartStudy}
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-950/50 transition-all active:scale-[0.98]"
        >
          <span>Mulai Belajar Lagi Hari Ini 🍙</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
