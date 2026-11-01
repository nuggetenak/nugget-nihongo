import React, { useState } from 'react';
import {
  Key,
  Database,
  Download,
  Upload,
  Lock,
  Trash2,
  AlertTriangle,
  Sparkles,
  X,
} from 'lucide-react';
import { ResetConfirmationModal } from '../modals/ResetConfirmationModal';
import {
  createBackupPayload,
  validateBackupPayload,
  restoreBackup,
  encryptBackupPayload,
  decryptBackupPayload,
  isEncryptedBackupContainer,
} from '../../lib/storage/backupManager';

interface AdvancedSettingsTabProps {
  apiKeyInput: string;
  setApiKeyInput: (key: string) => void;
  handleSaveApiKey: () => void;
  handleTestAi: () => Promise<void>;
  isTestingAi: boolean;
  handleExportBackup: () => void;
  handleImportBackup: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showResetConfirm: boolean;
  setShowResetConfirm: (show: boolean) => void;
  handleExecuteReset: () => void;
  showToast: (msg: string, icon?: string) => void;
}

export const AdvancedSettingsTab: React.FC<AdvancedSettingsTabProps> = ({
  apiKeyInput,
  setApiKeyInput,
  handleSaveApiKey,
  handleTestAi,
  isTestingAi,
  handleExportBackup,
  handleImportBackup,
  showResetConfirm,
  setShowResetConfirm,
  handleExecuteReset,
  showToast,
}) => {
  // Internal Encrypted Export & Decrypt State
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportPassphrase, setExportPassphrase] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  const [decryptModalOpen, setDecryptModalOpen] = useState(false);
  const [pendingEncryptedJson, setPendingEncryptedJson] = useState<string | null>(null);
  const [decryptPassphrase, setDecryptPassphrase] = useState('');
  const [decryptError, setDecryptError] = useState<string | null>(null);
  const [isDecrypting, setIsDecrypting] = useState(false);

  const [showClearCacheConfirm, setShowClearCacheConfirm] = useState(false);
  const [isClearingCache, setIsClearingCache] = useState(false);

  const handleExportEncrypted = async () => {
    if (!exportPassphrase || exportPassphrase.length < 4) {
      showToast('Kata sandi enkripsi minimal 4 karakter!', '⚠️');
      return;
    }
    setIsExporting(true);
    try {
      const payload = createBackupPayload();
      const encryptedJson = await encryptBackupPayload(payload, exportPassphrase);
      const dateStr = new Date().toISOString().slice(0, 10);
      const blob = new Blob([encryptedJson], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `nugget-nihongo-backup-${dateStr}.nuggetbackup`;
      a.click();
      URL.revokeObjectURL(url);
      setShowExportModal(false);
      setExportPassphrase('');
      showToast(`Cadangan terenkripsi AES-256 (${payload._metadata.keyCount} item) berhasil diunduh!`, '🔐');
    } catch (err: any) {
      showToast(`Gagal enkripsi: ${err.message}`, '⚠️');
    } finally {
      setIsExporting(false);
    }
  };

  const onImportFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target?.result as string;
        if (isEncryptedBackupContainer(text)) {
          setPendingEncryptedJson(text);
          setDecryptPassphrase('');
          setDecryptError(null);
          setDecryptModalOpen(true);
          return;
        }
        handleImportBackup(e);
      } catch (err: any) {
        showToast(`Gagal membaca berkas: ${err.message}`, '⚠️');
      }
    };
    reader.readAsText(file);
  };

  const handleDecryptAndRestore = async () => {
    if (!pendingEncryptedJson) return;
    if (!decryptPassphrase) {
      setDecryptError('Harap masukkan kata sandi enkripsi.');
      return;
    }
    setIsDecrypting(true);
    setDecryptError(null);
    try {
      const payload = await decryptBackupPayload(pendingEncryptedJson, decryptPassphrase);
      const res = restoreBackup(payload);
      if (!res.success) {
        setDecryptError('Tidak ada data valid yang dapat dipulihkan.');
        return;
      }
      setDecryptModalOpen(false);
      setPendingEncryptedJson(null);
      setDecryptPassphrase('');
      showToast(`Berhasil mendekripsi & memulihkan ${res.restoredCount} data! Memuat ulang...`, '✨');
      setTimeout(() => window.location.reload(), 1200);
    } catch (err: any) {
      setDecryptError(err.message || 'Gagal mendekripsi: kata sandi salah atau berkas rusak.');
    } finally {
      setIsDecrypting(false);
    }
  };

  const handleExecuteClearCache = async () => {
    setIsClearingCache(true);
    try {
      if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
        showToast('Cache offline dibersihkan. Memuat ulang...', '🧹');
        setTimeout(() => window.location.reload(), 800);
      } else {
        showToast('Cache tidak tersedia di browser ini', '⚠️');
        setShowClearCacheConfirm(false);
      }
    } catch (err: any) {
      showToast(`Gagal membersihkan cache: ${err.message}`, '⚠️');
      setShowClearCacheConfirm(false);
    } finally {
      setIsClearingCache(false);
    }
  };

  return (
    <div className="space-y-5 sm:space-y-6 animate-in fade-in duration-200">
      {/* AI Sensei BYOK API Key Card */}
      <div className="bg-surface border border-accent/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm space-y-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-appText-bright flex items-center gap-2">
            <Key className="w-5 h-5 text-accent" />
            Kunci API Sensei AI (BYOK - Bring Your Own Key)
          </h3>
          <p className="text-xs sm:text-sm text-appText-muted mt-1 leading-relaxed">
            Secara bawaan Sensei AI memanggil proxy serverless Nugget Nihongo. Masukkan kunci API mandiri (Google Gemini atau OpenRouter) jika kamu ingin kuota percakapan tanpa batas dan latensi langsung.
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-appText-muted block">
            Google Gemini API Key atau OpenRouter API Key
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="password"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="AIzaSy... (Gemini) atau sk-or-v1-... (OpenRouter)"
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-surface-2/80 border border-accent/20 text-xs font-mono text-appText-bright focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              onClick={handleSaveApiKey}
              className="px-4 py-2.5 min-h-[44px] rounded-xl bg-accent text-bg text-xs font-bold shadow-xs active:scale-95 transition-all shrink-0"
            >
              Simpan Kunci
            </button>
            <button
              onClick={handleTestAi}
              disabled={isTestingAi}
              className="px-4 py-2.5 min-h-[44px] rounded-xl bg-surface-2 hover:bg-surface-3 border border-accent/20 text-xs font-semibold text-appText-bright active:scale-95 transition-all shrink-0 disabled:opacity-50 flex items-center justify-center gap-1.5"
            >
              <Sparkles className={`w-3.5 h-3.5 text-accent ${isTestingAi ? 'animate-spin' : ''}`} />
              Uji Tes AI
            </button>
          </div>
          <p className="text-[11px] text-appText-muted">
            Kunci API kamu disimpan secara lokal di browser dan tidak pernah dikirim ke pihak ketiga tanpa izinmu.
          </p>
        </div>
      </div>

      {/* Backup & Restore Data Management Card */}
      <div className="bg-surface border border-accent/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm space-y-5">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-appText-bright flex items-center gap-2">
            <Database className="w-5 h-5 text-accent" />
            Cadangan & Pemulihan Data (Backup & Restore)
          </h3>
          <p className="text-xs sm:text-sm text-appText-muted mt-1 leading-relaxed">
            Ekspor seluruh riwayat memori kartu FSRS, catatan belajar, dan pencapaian ke berkas JSON atau cadangan terenkripsi AES-256.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Plaintext Backup */}
          <button
            onClick={handleExportBackup}
            className="p-3.5 sm:p-4 rounded-xl bg-surface-2/60 border border-accent/15 hover:border-accent/30 hover:bg-surface-2 text-left transition-all active:scale-95 flex flex-col justify-between space-y-2"
          >
            <div className="flex items-center justify-between">
              <Download className="w-4 h-4 text-accent" />
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface-3 text-appText-muted">
                JSON
              </span>
            </div>
            <div>
              <span className="text-xs font-bold text-appText-bright block">
                Cadangan Standar (JSON)
              </span>
              <p className="text-[11px] text-appText-muted mt-0.5">
                Format berkas terbuka tanpa enkripsi sandi.
              </p>
            </div>
          </button>

          {/* Encrypted AES Backup */}
          <button
            onClick={() => setShowExportModal(true)}
            className="p-3.5 sm:p-4 rounded-xl bg-surface-2/60 border border-accent/15 hover:border-accent/30 hover:bg-surface-2 text-left transition-all active:scale-95 flex flex-col justify-between space-y-2"
          >
            <div className="flex items-center justify-between">
              <Lock className="w-4 h-4 text-accent" />
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold">
                AES-256
              </span>
            </div>
            <div>
              <span className="text-xs font-bold text-appText-bright block">
                Cadangan Terenkripsi
              </span>
              <p className="text-[11px] text-appText-muted mt-0.5">
                Dilindungi dengan kata sandi PBKDF2 SHA-256.
              </p>
            </div>
          </button>

          {/* Import Backup */}
          <label className="p-3.5 sm:p-4 rounded-xl bg-surface-2/60 border border-accent/15 hover:border-accent/30 hover:bg-surface-2 text-left transition-all active:scale-95 flex flex-col justify-between space-y-2 cursor-pointer">
            <div className="flex items-center justify-between">
              <Upload className="w-4 h-4 text-accent" />
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface-3 text-appText-muted">
                PULIHKAN
              </span>
            </div>
            <div>
              <span className="text-xs font-bold text-appText-bright block">
                Pulihkan Cadangan
              </span>
              <p className="text-[11px] text-appText-muted mt-0.5">
                Unggah berkas cadangan JSON atau .nuggetbackup.
              </p>
            </div>
            <input
              type="file"
              accept=".json,.nuggetbackup"
              onChange={onImportFileSelected}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Danger Zone & Cache Clear Card */}
      <div className="bg-surface border border-rose-500/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm space-y-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-500" />
            Zona Bahaya & Pembersihan Data
          </h3>
          <p className="text-xs sm:text-sm text-appText-muted mt-1 leading-relaxed">
            Bersihkan berkas cache sementara atau lakukan reset pabrik jika kamu ingin memulai kembali dari awal.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <button
            onClick={() => setShowClearCacheConfirm(true)}
            className="flex-1 p-3.5 rounded-xl bg-surface-2/60 hover:bg-surface-2 border border-accent/15 text-left transition-all active:scale-95 flex items-center justify-between gap-3"
          >
            <div>
              <span className="text-xs font-bold text-appText-bright block">
                Bersihkan Cache Offline Browser
              </span>
              <p className="text-[11px] text-appText-muted mt-0.5">
                Menghapus cache Service Worker & aset statis tanpa menghapus riwayat belajar.
              </p>
            </div>
            <Trash2 className="w-4 h-4 text-appText-muted shrink-0" />
          </button>

          <button
            onClick={() => setShowResetConfirm(true)}
            className="flex-1 p-3.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/15 border border-rose-500/30 text-left transition-all active:scale-95 flex items-center justify-between gap-3"
          >
            <div>
              <span className="text-xs font-bold text-rose-600 dark:text-rose-400 block">
                Reset Semua Data Belajar
              </span>
              <p className="text-[11px] text-appText-muted mt-0.5">
                Menghapus seluruh kartu memori FSRS, streak, dan progres ke kondisi awal.
              </p>
            </div>
            <Trash2 className="w-4 h-4 text-rose-500 shrink-0" />
          </button>
        </div>
      </div>

      {/* Export Encrypted Modal */}
      {showExportModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
        >
          <div className="bg-surface border border-accent/30 rounded-2xl p-5 max-w-sm w-full space-y-4 shadow-xl max-h-[90dvh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-appText-bright flex items-center gap-2">
                <Lock className="w-4 h-4 text-accent" />
                Enkripsi Cadangan Data (AES-256)
              </h4>
              <button
                onClick={() => setShowExportModal(false)}
                className="text-appText-muted hover:text-appText-bright"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-appText-muted leading-relaxed">
              Buat kata sandi untuk mengunci berkas cadangan ini. Sandi ini tidak dapat dipulihkan jika lupa.
            </p>
            <input
              type="password"
              value={exportPassphrase}
              onChange={(e) => setExportPassphrase(e.target.value)}
              placeholder="Masukkan kata sandi (min 4 karakter)..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-accent/20 text-xs text-appText-bright focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowExportModal(false)}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-appText-muted hover:bg-surface-2"
              >
                Batal
              </button>
              <button
                onClick={handleExportEncrypted}
                disabled={isExporting || exportPassphrase.length < 4}
                className="px-4 py-2 rounded-xl bg-accent text-bg text-xs font-bold shadow-xs active:scale-95 disabled:opacity-50"
              >
                {isExporting ? 'Mengenkripsi...' : 'Unduh Berkas'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Decrypt Encrypted Modal */}
      {decryptModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
        >
          <div className="bg-surface border border-accent/30 rounded-2xl p-5 max-w-sm w-full space-y-4 shadow-xl max-h-[90dvh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-appText-bright flex items-center gap-2">
                <Lock className="w-4 h-4 text-accent" />
                Buka Enkripsi Cadangan Data
              </h4>
              <button
                onClick={() => setDecryptModalOpen(false)}
                className="text-appText-muted hover:text-appText-bright"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-appText-muted leading-relaxed">
              Berkas ini dilindungi enkripsi AES-256. Masukkan kata sandi yang kamu gunakan saat mengekspornya.
            </p>
            <input
              type="password"
              value={decryptPassphrase}
              onChange={(e) => setDecryptPassphrase(e.target.value)}
              placeholder="Kata sandi enkripsi..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-accent/20 text-xs text-appText-bright focus:outline-none focus:ring-2 focus:ring-accent"
            />
            {decryptError && (
              <p className="text-xs text-rose-500 font-medium">{decryptError}</p>
            )}
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDecryptModalOpen(false)}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-appText-muted hover:bg-surface-2"
              >
                Batal
              </button>
              <button
                onClick={handleDecryptAndRestore}
                disabled={isDecrypting || !decryptPassphrase}
                className="px-4 py-2 rounded-xl bg-accent text-bg text-xs font-bold shadow-xs active:scale-95 disabled:opacity-50"
              >
                {isDecrypting ? 'Mendekripsi...' : 'Dekripsi & Pulihkan'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear Cache Confirmation Dialog */}
      {showClearCacheConfirm && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
        >
          <div className="bg-surface border border-accent/30 rounded-2xl p-5 max-w-sm w-full space-y-4 shadow-xl max-h-[90dvh] overflow-y-auto">
            <h4 className="text-sm font-bold text-appText-bright flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-accent" />
              Bersihkan Cache Offline?
            </h4>
            <p className="text-xs text-appText-muted leading-relaxed">
              Browser akan menghapus seluruh cache aset statis dan memuat ulang aplikasi untuk mengambil versi paling mutakhir. Riwayat belajarmu tetap aman.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowClearCacheConfirm(false)}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-appText-muted hover:bg-surface-2"
              >
                Batal
              </button>
              <button
                onClick={handleExecuteClearCache}
                disabled={isClearingCache}
                className="px-4 py-2 rounded-xl bg-accent text-bg text-xs font-bold shadow-xs active:scale-95 disabled:opacity-50"
              >
                {isClearingCache ? 'Membersihkan...' : 'Ya, Bersihkan'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <ResetConfirmationModal
          isOpen={showResetConfirm}
          onClose={() => setShowResetConfirm(false)}
          onConfirmReset={handleExecuteReset}
        />
      )}
    </div>
  );
};
