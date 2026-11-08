import React from 'react';
import { usePwaStore } from '../../lib/pwa/pwaStore';
import { Download, Share, PlusSquare, CheckCircle2, X, Smartphone, Zap, WifiOff } from 'lucide-react';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { IrasutoyaImage } from '../common/IrasutoyaImage';

interface InstallModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const InstallModal: React.FC<InstallModalProps> = ({ isOpen, onClose }) => {
  const {
    showInstallModal,
    setShowInstallModal,
    isInstallable,
    isInstalled,
    isIos,
    promptInstall
  } = usePwaStore();

  const modalOpen = isOpen !== undefined ? isOpen : showInstallModal;
  useBodyScrollLock(modalOpen);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      setShowInstallModal(false);
    }
  };

  if (!modalOpen) return null;

  const handleInstallClick = async () => {
    const success = await promptInstall();
    if (success) {
      handleClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-surface border border-accent/25 rounded-3xl shadow-2xl p-6 relative text-left scrollbar-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow corner accent */}
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-appText-muted hover:text-appText-bright rounded-full hover:bg-surface-2 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-95"
          title="Tutup"
          aria-label="Tutup modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shadow-glow shrink-0 overflow-hidden">
            <IrasutoyaImage
              assetId="senpai_studying"
              className="w-10 h-10 object-contain"
              alt="Pasang PWA Nugget Nihongo"
              animateFloat
            />
          </div>
          <div>
            <h3 className="text-lg font-bold text-amber-950 dark:text-amber-100 flex items-center gap-1.5">
              Pasang Nugget Nihongo
            </h3>
            <p className="text-xs text-amber-800 dark:text-amber-300 font-medium">Pengalaman Belajar PWA Offline Penuh</p>
          </div>
        </div>

        {/* Features Benefit Pills */}
        <div className="grid grid-cols-1 gap-2.5 mb-6 text-xs text-appText-bright">
          <div className="card-interactive-lift flex items-center gap-2.5 p-3 rounded-xl bg-surface-2 border border-theme">
            <WifiOff className="w-4 h-4 text-accent shrink-0" />
            <span>Mode Offline Penuh: Belajar tanpa perlu kuota internet</span>
          </div>
          <div className="card-interactive-lift flex items-center gap-2.5 p-3 rounded-xl bg-surface-2 border border-theme">
            <Zap className="w-4 h-4 text-accent shrink-0" />
            <span>Buka instan seperti aplikasi native dari beranda HP</span>
          </div>
          <div className="card-interactive-lift flex items-center gap-2.5 p-3 rounded-xl bg-surface-2 border border-theme">
            <Smartphone className="w-4 h-4 text-accent shrink-0" />
            <span>Layar penuh bebas gangguan bilah browser</span>
          </div>
        </div>

        {/* Platform-specific instructions */}
        {isInstalled ? (
          <div className="text-center p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 mb-4">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
            <p className="font-bold text-sm">Aplikasi Sudah Terpasang!</p>
            <p className="text-xs text-emerald-700 dark:text-emerald-400/90 mt-1">
              Buka aplikasi langsung melalui ikon di layar utama perangkat Anda.
            </p>
          </div>
        ) : isIos ? (
          <div className="p-4 rounded-xl bg-surface-2 border border-theme mb-4 space-y-3">
            <p className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider">
              Cara Pasang di iPhone / iPad (Safari):
            </p>
            <ol className="text-xs text-appText-muted space-y-2 list-decimal list-inside">
              <li className="flex items-center gap-2">
                <span>1. Ketuk ikon Bagikan</span>
                <Share className="w-4 h-4 text-accent inline" />
                <span>di bilah bawah Safari</span>
              </li>
              <li className="flex items-center gap-2">
                <span>2. Gulir lalu pilih</span>
                <span className="font-bold text-appText-bright flex items-center gap-1">
                  <PlusSquare className="w-4 h-4 inline" /> Tambah ke Layar Utama
                </span>
              </li>
              <li>
                <span>3. Ketuk <strong className="text-appText-bright">Tambah (Add)</strong> di pojok kanan atas</span>
              </li>
            </ol>
          </div>
        ) : isInstallable ? (
          <div className="mb-4">
            <button
              onClick={handleInstallClick}
              className="w-full min-h-[44px] py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-900/40 active:scale-95 transition-all"
            >
              <Download className="w-4 h-4" />
              Pasang Sekarang ke Layar Utama
            </button>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-surface-2 border border-theme text-xs text-appText-muted mb-4 text-center">
            <p>
              Buka menu browser Anda (tiga titik di Chrome/Edge) lalu pilih <strong>"Instal Aplikasi"</strong> atau <strong>"Tambahkan ke Layar Utama"</strong>.
            </p>
          </div>
        )}

        {/* Footer dismiss */}
        <button
          onClick={handleClose}
          className="w-full min-h-[40px] py-2 text-center text-xs text-appText-muted hover:text-accent-hot transition-colors flex items-center justify-center active:scale-95 font-semibold"
        >
          Nanti Saja
        </button>
      </div>
    </div>
  );
};
