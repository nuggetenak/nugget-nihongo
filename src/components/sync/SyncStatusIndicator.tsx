// ══════════════════════════════════════════════════════════════════
//  SyncStatusIndicator.tsx — Real-Time Cloud Synchronization Pill
//  Displays live Supabase CRDT sync state, offline cues, and manual trigger
// ══════════════════════════════════════════════════════════════════

import React from 'react';
import { Cloud, CloudOff, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../../lib/supabase/authStore';

export const SyncStatusIndicator: React.FC = () => {
  const { user, syncStatus, lastSyncedAt, syncNow, openAuthModal } = useAuthStore();

  if (!user) {
    return (
      <button
        onClick={() => openAuthModal('signin')}
        title="Masuk untuk menyinkronkan progres ke cloud"
        className="flex items-center gap-1.5 px-3 py-1.5 min-h-[40px] rounded-full text-xs font-semibold bg-surface-2/80 hover:bg-surface-3 border border-accent/15 text-appText-muted hover:text-appText-bright transition-all active:scale-95"
      >
        <CloudOff className="w-3.5 h-3.5 text-slate-400" />
        <span className="hidden sm:inline">Mode Tamu</span>
      </button>
    );
  }

  const handleTriggerSync = () => {
    if (syncStatus !== 'syncing') {
      syncNow();
    }
  };

  let icon = <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />;
  let label = 'Tersinkron';
  let badgeColor = 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400';

  if (syncStatus === 'syncing') {
    icon = <RefreshCw className="w-3.5 h-3.5 text-amber-400 animate-spin" />;
    label = 'Sinkronisasi...';
    badgeColor = 'bg-amber-500/10 border-amber-500/30 text-amber-400';
  } else if (syncStatus === 'error') {
    icon = <AlertCircle className="w-3.5 h-3.5 text-rose-400" />;
    label = 'Gagal';
    badgeColor = 'bg-rose-500/10 border-rose-500/30 text-rose-400';
  } else if (syncStatus === 'idle') {
    icon = <Cloud className="w-3.5 h-3.5 text-accent" />;
    label = 'Awan';
    badgeColor = 'bg-surface-2 border-accent/20 text-appText-muted';
  }

  const formatLastSync = (): string => {
    if (!lastSyncedAt) return '';
    const diffSec = Math.floor((Date.now() - new Date(lastSyncedAt).getTime()) / 1000);
    if (diffSec < 60) return 'Baru saja';
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m lalu`;
    return `${Math.floor(diffSec / 3600)}j lalu`;
  };

  const relativeTime = formatLastSync();

  return (
    <button
      onClick={handleTriggerSync}
      title={
        syncStatus === 'error'
          ? 'Sinkronisasi gagal. Klik untuk mencoba kembali.'
          : `Tersinkron ke cloud${relativeTime ? ` (${relativeTime})` : ''}. Klik untuk menyinkronkan sekarang.`
      }
      className={`flex items-center gap-1.5 px-3 py-1.5 min-h-[40px] rounded-full text-xs font-semibold border transition-all active:scale-95 ${badgeColor}`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
      {relativeTime && syncStatus === 'synced' && (
        <span className="hidden md:inline text-[10px] opacity-75 font-normal">
          · {relativeTime}
        </span>
      )}
    </button>
  );
};
