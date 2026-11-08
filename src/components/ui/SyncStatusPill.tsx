// ══════════════════════════════════════════════════════════════════
//  SyncStatusPill.tsx — Visual Cloud Sync & Offline-First Pill
//  Provides real-time telemetry: Synced, Syncing, Offline, or Guest Local Mode
// ══════════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react';
import {
  Cloud,
  RefreshCw,
  WifiOff,
  CheckCircle2,
  AlertCircle,
  HardDrive,
  ArrowRight,
  X,
} from 'lucide-react';
import { useAuthStore } from '../../lib/supabase/authStore';
import { OFFICIAL_PROJECT_REF } from '../../lib/supabase/client';
import { IrasutoyaImage } from '../common/IrasutoyaImage';
import { localStore } from '../../lib/storage/localStore.ts';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

export const SyncStatusPill: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { user, syncStatus, lastSyncedAt, syncErrorMessage, syncNow, openAuthModal } =
    useAuthStore();

  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [kanjiMasteryCount, setKanjiMasteryCount] = useState(0);

  const modalRef = useFocusTrap(isDrawerOpen);
  useBodyScrollLock(isDrawerOpen);

  // Close modal dialog on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        setIsDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (user) syncNow();
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const checkStats = () => {
      try {
        const dirty = localStore.getDirtyMutations();
        setPendingCount(dirty.length);
        const mastery = localStore.getAllKanjiMastery();
        setKanjiMasteryCount(mastery.length);
      } catch {}
    };

    checkStats();
    const interval = setInterval(checkStats, 3000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, [user, syncNow, syncStatus]);

  // Determine pill visual state
  let pillColor = 'border-accent/20 bg-surface-2 text-appText-muted hover:text-appText-bright';
  let pillText = 'Mode Lokal';
  let pillIcon = <HardDrive className="w-3.5 h-3.5 text-accent" />;

  if (!isOnline) {
    pillColor = 'border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400 font-bold';
    pillText = pendingCount > 0 ? `Offline (${pendingCount})` : 'Offline';
    pillIcon = <WifiOff className="w-3.5 h-3.5 text-red-500 dark:text-red-400" />;
  } else if (syncStatus === 'syncing') {
    pillColor = 'border-amber-500/40 bg-amber-500/15 text-amber-800 dark:text-amber-300 animate-pulse font-bold';
    pillText = 'Sinkron...';
    pillIcon = <RefreshCw className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 animate-spin" />;
  } else if (syncStatus === 'error') {
    pillColor = 'border-rose-500/30 bg-rose-500/10 text-rose-800 dark:text-rose-300 font-bold';
    pillText = 'Cek Cloud';
    pillIcon = <AlertCircle className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400" />;
  } else if (user) {
    if (pendingCount > 0) {
      pillColor = 'border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-300 font-bold';
      pillText = `Antrean (${pendingCount})`;
      pillIcon = <Cloud className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />;
    } else {
      pillColor = 'border-emerald-500/30 bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 font-bold';
      pillText = 'Tersinkron';
      pillIcon = <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />;
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsDrawerOpen(true)}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] sm:min-h-[40px] rounded-full text-xs font-bold border transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-accent ${pillColor} ${className}`}
        title="Klik untuk info status sinkronisasi cloud & offline"
        aria-label={`Status sinkronisasi: ${pillText}`}
      >
        {pillIcon}
        <span className="tabular-nums">{pillText}</span>
      </button>

      {/* Sync Details Modal Dialog */}
      {isDrawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="sync-status-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            ref={modalRef as React.RefObject<HTMLDivElement>}
            className="card-interactive-lift bg-surface border border-accent/25 rounded-2xl max-w-sm w-full p-5 shadow-2xl space-y-4 max-h-[90dvh] overflow-y-auto pb-[max(1.25rem,env(safe-area-inset-bottom))]"
          >
            <div className="flex items-center justify-between border-b border-accent/15 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0 overflow-hidden shadow-xs">
                  <IrasutoyaImage
                    assetId="senpai_studying"
                    className="w-6 h-6 object-contain"
                    alt="Status Sinkronisasi Cloud"
                    animateFloat
                  />
                </div>
                <h3 id="sync-status-dialog-title" className="text-sm font-bold text-appText-bright">
                  Status Sinkronisasi Cloud
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-xl hover:bg-surface-2 flex items-center justify-center text-appText-muted hover:text-appText-bright transition-colors active:scale-95"
                title="Tutup dialog"
                aria-label="Tutup dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="card-interactive-lift flex items-center justify-between p-2.5 rounded-xl bg-surface-2 border border-accent/10">
                <span className="text-appText-muted">Koneksi Jaringan:</span>
                <span
                  className={`font-bold flex items-center gap-1.5 ${
                    isOnline ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isOnline ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                  />
                  {isOnline ? 'Terhubung (Online)' : 'Terputus (Offline)'}
                </span>
              </div>

              <div className="card-interactive-lift flex items-center justify-between p-2.5 rounded-xl bg-surface-2 border border-accent/10">
                <span className="text-appText-muted">Database Supabase:</span>
                <span className="font-mono text-xs text-amber-800 dark:text-amber-400 font-bold">
                  {OFFICIAL_PROJECT_REF}
                </span>
              </div>

              <div className="card-interactive-lift flex items-center justify-between p-2.5 rounded-xl bg-surface-2 border border-accent/10">
                <span className="text-appText-muted">Akun Pengguna:</span>
                <span className="font-bold text-appText-bright truncate max-w-[160px]">
                  {user?.email || 'Tamu (Penyimpanan Lokal)'}
                </span>
              </div>

              <div className="card-interactive-lift flex items-center justify-between p-2.5 rounded-xl bg-surface-2 border border-accent/10">
                <span className="text-appText-muted">Sinkron Terakhir:</span>
                <span className="text-appText-bright font-mono text-xs font-bold">
                  {lastSyncedAt ? new Date(lastSyncedAt).toLocaleTimeString('id-ID') : 'Belum pernah'}
                </span>
              </div>

              <div className="card-interactive-lift flex items-center justify-between p-2.5 rounded-xl bg-surface-2 border border-accent/10">
                <span className="text-appText-muted">Antrean Mutasi Offline:</span>
                <span className={`font-mono text-xs font-bold ${pendingCount > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                  {pendingCount > 0 ? `${pendingCount} item menunggu cloud` : 'Bersih (0 antrean)'}
                </span>
              </div>

              <div className="card-interactive-lift flex items-center justify-between p-2.5 rounded-xl bg-surface-2 border border-accent/10">
                <span className="text-appText-muted">Latihan Kanji Lokal:</span>
                <span className="text-appText-bright font-mono text-xs font-bold">
                  {kanjiMasteryCount} karakter tersimpan
                </span>
              </div>

              {syncErrorMessage && (
                <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-800 dark:text-rose-300 text-xs font-medium leading-relaxed">
                  {syncErrorMessage}
                </div>
              )}
            </div>

            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={async () => {
                  await syncNow();
                }}
                disabled={!isOnline || syncStatus === 'syncing'}
                className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-accent hover:bg-accent-hot text-bg font-extrabold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`}
                />
                <span>
                  {syncStatus === 'syncing' ? 'Sedang Menyinkronkan...' : 'Sinkronkan Sekarang'}
                </span>
              </button>

              {!user && (
                <button
                  type="button"
                  onClick={() => {
                    setIsDrawerOpen(false);
                    openAuthModal('signin');
                  }}
                  className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-surface-2 hover:bg-surface-3 border border-accent/20 text-appText-bright font-extrabold text-xs flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <Cloud className="w-3.5 h-3.5 text-accent" />
                  <span>Cadangkan ke Akun Cloud</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
