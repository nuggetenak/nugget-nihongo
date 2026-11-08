import React, { useEffect } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { useGamificationStore } from '../../lib/gamification/gamificationStore';
import { useAppStore } from '../../store/useAppStore';
import { useModalStore } from '../../store/useModalStore';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { IrasutoyaImage } from '../common/IrasutoyaImage';

interface StreakBrokenModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const StreakBrokenModal: React.FC<StreakBrokenModalProps> = ({ isOpen, onClose }) => {
  const { isStreakBrokenModalOpen, closeStreakBrokenModal, streakBrokenTip } = useGamificationStore();
  const { setActiveTab } = useAppStore();

  const modalOpen = isOpen !== undefined ? isOpen : isStreakBrokenModalOpen;
  const handleClose = () => {
    closeStreakBrokenModal();
    if (onClose) {
      onClose();
    } else {
      useModalStore.getState().closeModal('streakBroken');
    }
  };

  const containerRef = useFocusTrap<HTMLDivElement>(!!modalOpen, handleClose);

  // Lock background scroll when broken streak modal is open
  useBodyScrollLock(!!modalOpen);

  // Close modal on Escape key
  useEffect(() => {
    if (!modalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen]);

  if (!modalOpen) return null;

  const handleStartStudy = () => {
    handleClose();
    setActiveTab('quiz');
  };

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
    >
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Notifikasi Streak Terputus"
        className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-surface border border-accent/25 rounded-3xl p-6 sm:p-8 relative text-center shadow-2xl scrollbar-none"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-appText-muted hover:text-appText-bright rounded-full hover:bg-surface-2 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-95"
          title="Tutup"
          aria-label="Tutup modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-20 h-20 mx-auto mb-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 p-2 flex items-center justify-center shadow-glow">
          <IrasutoyaImage assetId="daruma_recovery" animatePop className="w-16 h-16 object-contain" />
        </div>

        <h3 className="text-xl font-extrabold text-appText-bright mb-2">
          Streak Terputus, Tapi Jangan Menyerah!
        </h3>

        <div className="card-interactive-lift p-4 my-4 rounded-2xl bg-amber-500/15 dark:bg-amber-950/30 border border-amber-500/30 text-amber-900 dark:text-amber-200 font-bold text-xs sm:text-sm leading-relaxed italic">
          "{streakBrokenTip}"
        </div>

        <p className="text-xs text-appText-muted mb-6 leading-relaxed">
          Satu hari jeda adalah hal manusiawi. Yang terpenting adalah kembali melangkah hari ini tanpa rasa bersalah (七転び八起き).
        </p>

        <button
          onClick={handleStartStudy}
          className="w-full min-h-[44px] py-3 px-4 rounded-xl bg-accent hover:brightness-110 text-bg font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
        >
          <span>Mulai Belajar Lagi Hari Ini 🍙</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
