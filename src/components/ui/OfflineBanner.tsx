// ══════════════════════════════════════════════════════════════════
//  OfflineBanner.tsx — Floating PWA Connectivity & Offline Status Pill
//  Provides clear SLA feedback when device loses internet access
//  Conforms to universal multi-device responsive rules
// ══════════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, X } from 'lucide-react';

export const OfflineBanner: React.FC = () => {
  const [isOffline, setIsOffline] = useState<boolean>(() => {
    return typeof navigator !== 'undefined' ? !navigator.onLine : false;
  });
  const [showReconnected, setShowReconnected] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleOffline = () => {
      setIsOffline(true);
      setShowReconnected(false);
      setIsDismissed(false);
    };

    const handleOnline = () => {
      setIsOffline(false);
      setShowReconnected(true);
      setIsDismissed(false);

      const timer = setTimeout(() => {
        setShowReconnected(false);
      }, 3500);

      return () => clearTimeout(timer);
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  if (isDismissed) return null;

  if (isOffline) {
    return (
      <aside
        role="status"
        aria-live="polite"
        className="fixed top-2 sm:top-4 inset-x-3 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-40 max-w-lg mx-auto animate-in fade-in slide-in-from-top-2 duration-200 pointer-events-auto"
      >
        <div className="bg-amber-500/15 dark:bg-amber-950/80 border border-amber-500/40 rounded-2xl p-3 px-4 shadow-xl backdrop-blur-md flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 min-w-[28px] rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0">
              <WifiOff className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="font-bold text-amber-400 block sm:inline mr-1">Mode Offline Aktif</span>
              <span className="text-appText-muted truncate block sm:inline">
                Seluruh materi & kuis tetap dapat dipelajari dari memori lokal PWA.
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            className="w-7 h-7 min-w-[28px] rounded-lg hover:bg-amber-500/20 flex items-center justify-center text-appText-muted hover:text-appText-bright transition-colors shrink-0 active:scale-95"
            title="Tutup pemberitahuan"
            aria-label="Tutup pemberitahuan"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>
    );
  }

  if (showReconnected) {
    return (
      <aside
        role="status"
        aria-live="polite"
        className="fixed top-2 sm:top-4 inset-x-3 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-40 max-w-sm mx-auto animate-in fade-in slide-in-from-top-2 duration-200 pointer-events-auto"
      >
        <div className="bg-emerald-500/15 dark:bg-emerald-950/80 border border-emerald-500/40 rounded-2xl p-2.5 px-4 shadow-xl backdrop-blur-md flex items-center justify-between gap-2.5 text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 min-w-[24px] rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Wifi className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-emerald-400 truncate">
              Koneksi Pulih! Sinkronisasi otomatis aktif.
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowReconnected(false)}
            className="w-6 h-6 min-w-[24px] rounded-lg hover:bg-emerald-500/20 flex items-center justify-center text-appText-muted hover:text-emerald-300 transition-colors shrink-0 active:scale-95"
            title="Tutup pemberitahuan"
            aria-label="Tutup pemberitahuan"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </aside>
    );
  }

  return null;
};
