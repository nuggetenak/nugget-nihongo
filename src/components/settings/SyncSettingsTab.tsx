import React, { useState } from 'react';
import {
  Cloud,
  CloudOff,
  RefreshCw,
  LogIn,
  LogOut,
  Database,
  Activity,
  ChevronDown,
  ShieldCheck,
  CheckCircle2,
  HardDrive,
} from 'lucide-react';
import { SyncStatusPill } from '../ui/SyncStatusPill';

interface SyncSettingsTabProps {
  user: any;
  syncStatus: 'idle' | 'syncing' | 'error' | 'success';
  lastSyncedAt: string | null;
  openAuthModal: () => void;
  signOut: () => void;
  syncNow: () => Promise<void>;
  inputSbUrl: string;
  setInputSbUrl: (url: string) => void;
  inputSbKey: string;
  setInputSbKey: (key: string) => void;
  handleSaveSupabase: () => void;
  handleTestSupabase: () => Promise<void>;
  isTestingSb: boolean;
  sbTestResult: { ok: boolean; message: string; latencyMs?: number } | null;
  showToast: (msg: string, icon?: string) => void;
}

export const SyncSettingsTab: React.FC<SyncSettingsTabProps> = ({
  user,
  syncStatus,
  lastSyncedAt,
  openAuthModal,
  signOut,
  syncNow,
  inputSbUrl,
  setInputSbUrl,
  inputSbKey,
  setInputSbKey,
  handleSaveSupabase,
  handleTestSupabase,
  isTestingSb,
  sbTestResult,
  showToast,
}) => {
  const [isSbCardExpanded, setIsSbCardExpanded] = useState(false);
  const [isSyncingLocal, setIsSyncingLocal] = useState(false);

  const handleManualSync = async () => {
    setIsSyncingLocal(true);
    try {
      await syncNow();
      showToast('Sinkronisasi cloud berhasil diselesaikan!', '☁️');
    } catch (err: any) {
      showToast(`Sinkronisasi gagal: ${err?.message || 'Periksa jaringan'}`, '⚠️');
    } finally {
      setIsSyncingLocal(false);
    }
  };

  return (
    <div className="space-y-5 sm:space-y-6 animate-in fade-in duration-200">
      {/* Cloud Account & Session Status Card */}
      <div className="bg-surface border border-accent/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-accent/15 pb-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-appText-bright flex items-center gap-2">
              <Cloud className="w-5 h-5 text-accent" />
              Status Sinkronisasi & Akun Cloud
            </h3>
            <p className="text-xs sm:text-sm text-appText-muted mt-1 leading-relaxed">
              Hubungkan akun untuk mencadangkan kartu memori FSRS, streak belajar, dan progres lintas perangkat secara otomatis.
            </p>
          </div>
          <div className="shrink-0">
            <SyncStatusPill />
          </div>
        </div>

        {user ? (
          <div className="p-4 rounded-xl bg-surface-2/60 border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-sm font-bold text-appText-bright truncate">
                  Terhubung ke Cloud: {user.email}
                </span>
              </div>
              <p className="text-xs text-appText-muted">
                Terakhir disinkronkan:{' '}
                <strong className="text-appText-bright font-mono">
                  {lastSyncedAt ? new Date(lastSyncedAt).toLocaleString('id-ID') : 'Belum pernah'}
                </strong>
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleManualSync}
                disabled={isSyncingLocal || syncStatus === 'syncing'}
                className="flex items-center gap-1.5 px-3.5 py-2 min-h-[44px] rounded-xl bg-accent text-bg text-xs font-bold shadow-xs active:scale-95 disabled:opacity-50 transition-all"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncingLocal ? 'animate-spin' : ''}`} />
                Sinkronkan Sekarang
              </button>
              <button
                onClick={signOut}
                className="flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-xl bg-surface-3 hover:bg-surface-2 border border-accent/15 text-xs font-semibold text-accent-hot active:scale-95 transition-all"
              >
                <LogOut className="w-3.5 h-3.5" />
                Keluar
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-surface-2/60 border border-accent/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <CloudOff className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="text-sm font-bold text-appText-bright">
                  Mode Tamu Lokal (Offline First)
                </span>
              </div>
              <p className="text-xs text-appText-muted">
                Progresmu saat ini tersimpan aman di IndexedDB perangkat ini. Masuk untuk mengaktifkan sinkronisasi otomatis.
              </p>
            </div>
            <button
              onClick={openAuthModal}
              className="flex items-center justify-center gap-2 px-5 py-2.5 min-h-[44px] rounded-xl bg-accent text-bg text-xs font-bold shadow-xs active:scale-95 hover:brightness-105 transition-all shrink-0"
            >
              <LogIn className="w-4 h-4" />
              Masuk / Daftar Akun Cloud
            </button>
          </div>
        )}
      </div>

      {/* Advanced Direct Supabase Endpoint Card */}
      <div className="bg-surface border border-accent/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm space-y-4">
        <div
          onClick={() => setIsSbCardExpanded(!isSbCardExpanded)}
          className="flex items-center justify-between cursor-pointer select-none"
        >
          <div className="space-y-0.5">
            <h3 className="text-base sm:text-lg font-bold text-appText-bright flex items-center gap-2">
              <Database className="w-5 h-5 text-accent" />
              Konfigurasi Server Supabase Mandiri (BYOD)
            </h3>
            <p className="text-xs text-appText-muted">
              Gunakan instance Supabase backend sendiri jika kamu ingin kendali penuh atas database pribadimu.
            </p>
          </div>
          <button
            className="p-2 rounded-lg hover:bg-surface-2 text-appText-muted transition-all"
            aria-label="Buka konfigurasi Supabase mandiri"
          >
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-200 ${
                isSbCardExpanded ? 'rotate-180 text-accent' : ''
              }`}
            />
          </button>
        </div>

        {isSbCardExpanded && (
          <div className="space-y-4 pt-3 border-t border-accent/15 animate-in fade-in duration-200">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-appText-muted block">
                Supabase Project URL
              </label>
              <input
                type="url"
                value={inputSbUrl}
                onChange={(e) => setInputSbUrl(e.target.value)}
                placeholder="https://xyzcompany.supabase.co"
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2/80 border border-accent/20 text-xs font-mono text-appText-bright focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-appText-muted block">
                Supabase Anon Public API Key
              </label>
              <input
                type="password"
                value={inputSbKey}
                onChange={(e) => setInputSbKey(e.target.value)}
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2/80 border border-accent/20 text-xs font-mono text-appText-bright focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            {sbTestResult && (
              <div
                className={`p-3 rounded-xl text-xs flex items-center gap-2 border ${
                  sbTestResult.ok
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400'
                }`}
              >
                <Activity className="w-4 h-4 shrink-0" />
                <span>
                  {sbTestResult.message}
                  {sbTestResult.latencyMs && ` (${sbTestResult.latencyMs}ms)`}
                </span>
              </div>
            )}

            <div className="flex items-center gap-2 pt-1 flex-wrap">
              <button
                onClick={handleSaveSupabase}
                className="px-4 py-2 min-h-[44px] rounded-xl bg-accent text-bg text-xs font-bold shadow-xs active:scale-95 transition-all"
              >
                Simpan Konfigurasi
              </button>
              <button
                onClick={handleTestSupabase}
                disabled={isTestingSb}
                className="px-4 py-2 min-h-[44px] rounded-xl bg-surface-2 hover:bg-surface-3 border border-accent/20 text-xs font-semibold text-appText-bright active:scale-95 transition-all flex items-center gap-1.5 disabled:opacity-50"
              >
                <Activity className={`w-3.5 h-3.5 text-accent ${isTestingSb ? 'animate-spin' : ''}`} />
                Uji Koneksi Supabase
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Offline PWA & TinyBase Storage Info */}
      <div className="bg-surface border border-accent/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-appText-bright">
              Penyimpanan Lokal TinyBase & Offline PWA
            </h4>
            <p className="text-xs text-appText-muted mt-0.5">
              Seluruh data kosakata, tata bahasa, dan riwayat belajar tersimpan secara lokal tanpa ketergantungan koneksi internet.
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold shrink-0">
          Tersedia Offline
        </span>
      </div>
    </div>
  );
};
