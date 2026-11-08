// ══════════════════════════════════════════════════════════════════
//  OfflineBanner.tsx — Floating PWA Connectivity & Offline Status Pill
//  Provides clear SLA feedback when device loses internet access
//  Conforms to universal multi-device responsive rules
// ══════════════════════════════════════════════════════════════════

import React, { useState, useEffect, useRef } from 'react';
import { Wifi, WifiOff, X } from 'lucide-react';
import { IrasutoyaImage } from '../common/IrasutoyaImage';

export const OfflineBanner: React.FC = () => {
  const [isOffline, setIsOffline] = useState<boolean>(() => {
    return typeof navigator !== 'undefined' ? !navigator.onLine : false;
  });
  const [showReconnected, setShowReconnected] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);
  const reconnectTimerRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleOffline = () => {
      if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
      setIsOffline(true);
      setShowReconnected(false);
      setIsDismissed(false);
    };

    const handleOnline = () => {
      if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
      setIsOffline(false);
      setShowReconnected(true);
      setIsDismissed(false);

      reconnectTimerRef.current = setTimeout(() => {
        setShowReconnected(false);
      }, 3500);
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
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
        <div className="card-interactive-lift bg-amber-500/15 dark:bg-amber-950/80 border border-amber-500/40 rounded-2xl p-3 px-4 shadow-xl backdrop-blur-md flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 min-w-[36px] rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0 overflow-hidden shadow-xs">
              <IrasutoyaImage
                assetId="daruma_recovery"
                className="w-7 h-7 object-contain"
                alt="Mode Offline Aktif"
                animateFloat
              />
            </div>
            <div className="min-w-0">
              <span className="font-extrabold text-amber-950 dark:text-amber-300 block sm:inline mr-1">Mode Offline Aktif</span>
              <span className="text-appText-muted truncate block sm:inline">
                Seluruh materi & kuis tetap dapat dipelajari dari memori lokal PWA.
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-xl hover:bg-amber-500/20 flex items-center justify-center text-appText-muted hover:text-appText-bright transition-colors shrink-0 active:scale-95"
            title="Tutup pemberitahuan"
            aria-label="Tutup pemberitahuan"
          >
            <X className="w-4 h-4" />
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
        <div className="card-interactive-lift bg-emerald-500/15 dark:bg-emerald-950/80 border border-emerald-500/40 rounded-2xl p-2.5 px-4 shadow-xl backdrop-blur-md flex items-center justify-between gap-2.5 text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 min-w-[32px] rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0 overflow-hidden shadow-xs">
              <IrasutoyaImage
                assetId="hanko_excellent"
                className="w-6 h-6 object-contain"
                alt="Koneksi Pulih"
                animatePop
              />
            </div>
            <span className="font-extrabold text-emerald-950 dark:text-emerald-300 truncate">
              Koneksi Pulih! Sinkronisasi otomatis aktif.
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowReconnected(false)}
            className="w-8 h-8 min-w-[32px] min-h-[32px] rounded-lg hover:bg-emerald-500/20 flex items-center justify-center text-appText-muted hover:text-appText-bright transition-colors shrink-0 active:scale-95"
            title="Tutup"
            aria-label="Tutup"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>
    );
  }

  return null;
};
