// ══════════════════════════════════════════════════════════════════
//  StorageEvictionRecoveryModal.tsx — Disaster Recovery & Eviction Mitigation
//  Protects user progress against aggressive iOS Safari / Android PWA cache evictions
// ══════════════════════════════════════════════════════════════════

import React from 'react';
import { ShieldAlert, Download, Cloud, Trash2, X } from 'lucide-react';
import { createBackupPayload } from '../../lib/storage/backupManager';
import { cacheManager } from '../../lib/storage/cacheManager';
import { useAuthStore } from '../../lib/supabase/authStore';
import { useAppStore } from '../../store/useAppStore';

interface StorageEvictionRecoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  storageUsageMb?: number;
  storageQuotaMb?: number;
}

export const StorageEvictionRecoveryModal: React.FC<StorageEvictionRecoveryModalProps> = ({
  isOpen,
  onClose,
  storageUsageMb = 0,
  storageQuotaMb = 0,
}) => {
  const { showToast } = useAppStore();
  const { user, syncNow, openAuthModal } = useAuthStore();

  if (!isOpen) return null;

  const handleDownloadBackup = () => {
    try {
      const payload = createBackupPayload();
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `nugget-nihongo-darurat-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('Cadangan darurat berhasil diunduh!', '💾');
    } catch {
      showToast('Gagal mengunduh cadangan', '⚠️');
    }
  };

  const handleCloudSync = () => {
    if (!user) {
      openAuthModal('signin');
      onClose();
    } else {
      syncNow();
      showToast('Menyinkronkan progres ke cloud...', '🔄');
    }
  };

  const handleClearCache = async () => {
    try {
      const evicted = await cacheManager.evictOldestCache(undefined, 20);
      showToast(`Berhasil membersihkan ${evicted} berkas cache sementara`, '🧹');
    } catch {
      showToast('Gagal membersihkan cache', '⚠️');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-surface border border-rose-500/30 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200 max-h-[90dvh] overflow-y-auto">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-appText-bright">
                Peringatan Kapasitas Penyimpanan
              </h3>
              <p className="text-xs text-appText-muted mt-0.5">
                Penyimpanan browser hampir penuh atau berisiko dibersihkan oleh sistem.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-surface-2 text-appText-muted hover:text-appText-bright transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quota Gauge */}
        {storageQuotaMb > 0 && (
          <div className="bg-surface-2 p-3.5 rounded-2xl border border-accent/15 space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-appText-muted">Penggunaan Penyimpanan:</span>
              <span className="text-rose-400 font-mono">{storageUsageMb} MB / {storageQuotaMb} MB</span>
            </div>
            <div className="w-full h-2 bg-surface-3 rounded-full overflow-hidden">
              <div
                className="h-full bg-rose-500 transition-all duration-300"
                style={{ width: `${Math.min(100, Math.round((storageUsageMb / storageQuotaMb) * 100))}%` }}
              />
            </div>
          </div>
        )}

        <div className="space-y-3 pt-1">
          <p className="text-xs text-appText-muted leading-relaxed">
            Perangkat mobile seperti iPhone (Safari) atau browser hemat daya dapat menghapus data lokal jika ruang penyimpanan tersisa sedikit. Lakukan tindakan pencegahan berikut:
          </p>

          <div className="grid grid-cols-1 gap-2.5">
            <button
              onClick={handleDownloadBackup}
              className="flex items-center justify-between p-3.5 min-h-[48px] rounded-xl bg-surface-2 hover:bg-surface-3 border border-accent/25 text-appText-bright text-xs font-bold transition-all active:scale-95"
            >
              <div className="flex items-center gap-2.5">
                <Download className="w-4 h-4 text-accent" />
                <span>1. Unduh Berkas Cadangan (.json)</span>
              </div>
              <span className="text-[10px] text-accent">Rekomendasi Utama</span>
            </button>

            <button
              onClick={handleCloudSync}
              className="flex items-center justify-between p-3.5 min-h-[48px] rounded-xl bg-surface-2 hover:bg-surface-3 border border-emerald-500/25 text-appText-bright text-xs font-bold transition-all active:scale-95"
            >
              <div className="flex items-center gap-2.5">
                <Cloud className="w-4 h-4 text-emerald-400" />
                <span>2. {user ? 'Sinkronkan Progres ke Cloud' : 'Masuk Akun & Sinkronkan ke Cloud'}</span>
              </div>
              <span className="text-[10px] text-emerald-400">Permanen</span>
            </button>

            <button
              onClick={handleClearCache}
              className="flex items-center justify-between p-3.5 min-h-[48px] rounded-xl bg-surface-2 hover:bg-surface-3 border border-amber-500/25 text-appText-bright text-xs font-bold transition-all active:scale-95"
            >
              <div className="flex items-center gap-2.5">
                <Trash2 className="w-4 h-4 text-amber-400" />
                <span>3. Bersihkan Cache Audio Sementara</span>
              </div>
              <span className="text-[10px] text-amber-400">Kosongkan Ruang</span>
            </button>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 min-h-[40px] rounded-xl bg-surface-2 hover:bg-surface-3 text-appText-bright text-xs font-bold transition-all active:scale-95"
          >
            Mengerti & Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
