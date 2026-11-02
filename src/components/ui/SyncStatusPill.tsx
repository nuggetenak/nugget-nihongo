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
  Database,
  ArrowRight,
  X,
} from 'lucide-react';
import { useAuthStore } from '../../lib/supabase/authStore';
import { OFFICIAL_PROJECT_REF } from '../../lib/supabase/client';

export const SyncStatusPill: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { user, syncStatus, lastSyncedAt, syncErrorMessage, syncNow, openAuthModal } =
    useAuthStore();

  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (user) syncNow();
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [user, syncNow]);

  // Determine pill visual state
  let pillColor = 'border-accent/20 bg-surface-2 text-appText-muted hover:text-appText-bright';
  let pillText = 'Mode Lokal';
  let pillIcon = <HardDrive className="w-3.5 h-3.5 text-accent" />;

  if (!isOnline) {
    pillColor = 'border-red-500/30 bg-red-500/10 text-red-400';
    pillText = 'Offline';
    pillIcon = <WifiOff className="w-3.5 h-3.5 text-red-400" />;
  } else if (syncStatus === 'syncing') {
    pillColor = 'border-amber-500/40 bg-amber-500/15 text-amber-300 animate-pulse';
    pillText = 'Sinkron...';
    pillIcon = <RefreshCw className="w-3.5 h-3.5 text-amber-400 animate-spin" />;
  } else if (syncStatus === 'error') {
    pillColor = 'border-rose-500/30 bg-rose-500/10 text-rose-300';
    pillText = 'Cek Cloud';
    pillIcon = <AlertCircle className="w-3.5 h-3.5 text-rose-400" />;
  } else if (user) {
    pillColor = 'border-emerald-500/30 bg-emerald-500/15 text-emerald-300';
    pillText = 'Tersinkron';
    pillIcon = <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsDrawerOpen(true)}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-accent ${pillColor} ${className}`}
        title="Klik untuk info status sinkronisasi cloud & offline"
      >
        {pillIcon}
        <span className="tabular-nums">{pillText}</span>
      </button>

      {/* Sync Details Modal Dialog */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-surface border border-accent/25 rounded-2xl max-w-sm w-full p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-accent/15 pb-3">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-accent" />
                <h3 className="text-sm font-bold text-appText-bright">Status Sinkronisasi Cloud</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="p-1 rounded-lg hover:bg-surface-2 text-appText-muted hover:text-appText-bright transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-2 border border-accent/10">
                <span className="text-appText-muted">Koneksi Jaringan:</span>
                <span
                  className={`font-bold flex items-center gap-1.5 ${
                    isOnline ? 'text-emerald-400' : 'text-red-400'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isOnline ? 'bg-emerald-400' : 'bg-red-400'
                    }`}
                  />
                  {isOnline ? 'Terhubung (Online)' : 'Terputus (Offline)'}
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-2 border border-accent/10">
                <span className="text-appText-muted">Database Supabase:</span>
                <span className="font-mono text-xs text-accent font-bold">
                  {OFFICIAL_PROJECT_REF}
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-2 border border-accent/10">
                <span className="text-appText-muted">Akun Pengguna:</span>
                <span className="font-bold text-appText-bright truncate max-w-[160px]">
                  {user?.email || 'Tamu (Penyimpanan Lokal)'}
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-2 border border-accent/10">
                <span className="text-appText-muted">Sinkron Terakhir:</span>
                <span className="text-appText-bright font-mono text-xs">
                  {lastSyncedAt ? new Date(lastSyncedAt).toLocaleTimeString('id-ID') : 'Belum pernah'}
                </span>
              </div>

              {syncErrorMessage && (
                <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs leading-relaxed">
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
                className="w-full py-2.5 px-4 rounded-xl bg-accent hover:bg-accent-hot text-bg font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
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
                  className="w-full py-2.5 px-4 rounded-xl bg-surface-2 hover:bg-surface-3 border border-accent/20 text-appText-bright font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95"
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
