import React from 'react';
import { usePwaStore } from '../../lib/pwa/pwaStore';
import { Download, Share, PlusSquare, CheckCircle2, X, Smartphone, Zap, WifiOff } from 'lucide-react';

export const InstallModal: React.FC = () => {
  const {
    showInstallModal,
    setShowInstallModal,
    isInstallable,
    isInstalled,
    isIos,
    promptInstall
  } = usePwaStore();

  if (!showInstallModal) return null;

  const handleInstallClick = async () => {
    const success = await promptInstall();
    if (success) {
      setShowInstallModal(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-md bg-[#181410] border border-amber-900/40 rounded-2xl shadow-2xl p-6 relative overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow corner accent */}
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => setShowInstallModal(false)}
          className="absolute top-4 right-4 p-2 text-amber-500/60 hover:text-amber-300 rounded-full hover:bg-white/5 transition-colors"
          aria-label="Tutup modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-950/50 text-2xl">
            🍙
          </div>
          <div>
            <h3 className="text-lg font-bold text-amber-100 flex items-center gap-1.5">
              Pasang Nugget Nihongo
            </h3>
            <p className="text-xs text-amber-400/80">Pengalaman Belajar PWA Offline Penuh</p>
          </div>
        </div>

        {/* Features Benefit Pills */}
        <div className="grid grid-cols-1 gap-2.5 mb-6 text-xs text-amber-200/90">
          <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-amber-950/30 border border-amber-800/30">
            <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Mode Offline Penuh: Belajar tanpa perlu kuota internet</span>
          </div>
          <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-amber-950/30 border border-amber-800/30">
            <Zap className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Buka instan seperti aplikasi native dari beranda HP</span>
          </div>
          <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-amber-950/30 border border-amber-800/30">
            <Smartphone className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Layar penuh bebas gangguan bilah browser</span>
          </div>
        </div>

        {/* Platform-specific instructions */}
        {isInstalled ? (
          <div className="text-center p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-emerald-300 mb-4">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <p className="font-semibold text-sm">Aplikasi Sudah Terpasang!</p>
            <p className="text-xs text-emerald-400/80 mt-1">
              Buka aplikasi langsung melalui ikon di layar utama perangkat Anda.
            </p>
          </div>
        ) : isIos ? (
          <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/40 mb-4 space-y-3">
            <p className="text-xs font-semibold text-amber-200 uppercase tracking-wider">
              Cara Pasang di iPhone / iPad (Safari):
            </p>
            <ol className="text-xs text-amber-300/90 space-y-2 list-decimal list-inside">
              <li className="flex items-center gap-2">
                <span>1. Ketuk ikon Bagikan</span>
                <Share className="w-4 h-4 text-amber-400 inline" />
                <span>di bilah bawah Safari</span>
              </li>
              <li className="flex items-center gap-2">
                <span>2. Gulir lalu pilih</span>
                <span className="font-semibold text-amber-200 flex items-center gap-1">
                  <PlusSquare className="w-4 h-4 inline" /> Tambah ke Layar Utama
                </span>
              </li>
              <li>
                <span>3. Ketuk <strong className="text-amber-100">Tambah (Add)</strong> di pojok kanan atas</span>
              </li>
            </ol>
          </div>
        ) : isInstallable ? (
          <div className="mb-4">
            <button
              onClick={handleInstallClick}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-900/40 active:scale-[0.98] transition-all"
            >
              <Download className="w-4 h-4" />
              Pasang Sekarang ke Layar Utama
            </button>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-stone-900/60 border border-amber-900/20 text-xs text-stone-300 mb-4 text-center">
            <p>
              Buka menu browser Anda (tiga titik di Chrome/Edge) lalu pilih <strong>"Instal Aplikasi"</strong> atau <strong>"Tambahkan ke Layar Utama"</strong>.
            </p>
          </div>
        )}

        {/* Footer dismiss */}
        <button
          onClick={() => setShowInstallModal(false)}
          className="w-full py-2 text-center text-xs text-amber-400/70 hover:text-amber-300 transition-colors"
        >
          Nanti Saja
        </button>
      </div>
    </div>
  );
};
