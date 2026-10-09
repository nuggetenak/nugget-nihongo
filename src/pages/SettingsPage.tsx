import React, { useState } from 'react';
import { Moon, Sun, Type, Download, Upload, Trash2, CheckCircle2, Smartphone } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { usePwaStore } from '../lib/pwa/pwaStore';

export const SettingsPage: React.FC = () => {
  const {
    theme, toggleTheme,
    showFurigana, setShowFurigana,
    showRomaji, setShowRomaji,
    showToast
  } = useAppStore();

  const handleExportBackup = () => {
    try {
      const backupData: Record<string, any> = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('nn_') || key.startsWith('bunpou_'))) {
          backupData[key] = localStorage.getItem(key);
        }
      }
      const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `nugget-nihongo-backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('Cadangan data berhasil diunduh!', '💾');
    } catch {
      showToast('Gagal membuat cadangan data', '⚠️');
    }
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        for (const [k, v] of Object.entries(json)) {
          if (typeof v === 'string') {
            localStorage.setItem(k, v);
          }
        }
        showToast('Data berhasil dipulihkan! Memuat ulang...', '✨');
        setTimeout(() => window.location.reload(), 1200);
      } catch {
        showToast('Format file cadangan tidak valid', '⚠️');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-extrabold text-appText-bright mb-1">Pengaturan & Preferensi</h1>
        <p className="text-xs text-appText-muted">Sesuaikan tampilan dan kelola data progres belajarmu.</p>
      </div>

      {/* Visual & Typography Settings */}
      <div className="bg-surface border border-accent/20 rounded-2xl p-6 space-y-5">
        <h2 className="font-bold text-sm text-appText-bright flex items-center gap-2 border-b border-accent/15 pb-3">
          <Type className="w-4 h-4 text-accent" />
          <span>Tampilan & Aksara</span>
        </h2>

        {/* Furigana Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-appText-bright">Tampilkan Furigana</div>
            <div className="text-xs text-appText-muted">Panduan cara baca hiragana di atas kanji</div>
          </div>
          <button
            onClick={() => {
              setShowFurigana(!showFurigana);
              showToast(showFurigana ? 'Furigana disembunyikan' : 'Furigana diaktifkan', '文');
            }}
            className={`w-12 h-6.5 flex items-center rounded-full p-1 transition-colors ${
              showFurigana ? 'bg-amber-500' : 'bg-surface-3'
            }`}
          >
            <div
              className={`bg-white w-4.5 h-4.5 rounded-full shadow-md transform transition-transform ${
                showFurigana ? 'translate-x-5.5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Romaji Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-appText-bright">Tampilkan Romaji</div>
            <div className="text-xs text-appText-muted">Bantuan ejaan alfabet latin untuk pemula</div>
          </div>
          <button
            onClick={() => {
              setShowRomaji(!showRomaji);
              showToast(showRomaji ? 'Romaji dinonaktifkan' : 'Romaji diaktifkan', '🔤');
            }}
            className={`w-12 h-6.5 flex items-center rounded-full p-1 transition-colors ${
              showRomaji ? 'bg-amber-500' : 'bg-surface-3'
            }`}
          >
            <div
              className={`bg-white w-4.5 h-4.5 rounded-full shadow-md transform transition-transform ${
                showRomaji ? 'translate-x-5.5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Theme Select */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-appText-bright">Tema Gelap (Dark Mode)</div>
            <div className="text-xs text-appText-muted">Palet warm amber hangat & nyaman untuk mata</div>
          </div>
          <button
            onClick={() => {
              toggleTheme();
              showToast('Tema diperbarui', '🌙');
            }}
            className="px-3.5 py-1.5 rounded-xl bg-surface-2 border border-accent/25 text-appText-bright text-xs font-semibold flex items-center gap-2 hover:bg-surface-3 transition-all"
          >
            {theme === 'dark' ? <Moon className="w-3.5 h-3.5 text-amber-400" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
            <span className="capitalize">{theme}</span>
          </button>
        </div>
      </div>

      {/* Data & Backup Settings */}
      <div className="bg-surface border border-accent/20 rounded-2xl p-6 space-y-5">
        <h2 className="font-bold text-sm text-appText-bright flex items-center gap-2 border-b border-accent/15 pb-3">
          <Download className="w-4 h-4 text-accent" />
          <span>Cadangan & Sinkronisasi Data</span>
        </h2>

        <p className="text-xs text-appText-muted leading-relaxed">
          Semua catatan FSRS, hafalan kartu, dan riwayat streak tersimpan aman secara offline di browser perangkatmu. Kamu bisa mengunduh file cadangan kapan saja untuk dipindahkan ke perangkat lain.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={handleExportBackup}
            className="px-4 py-2.5 rounded-xl bg-accent text-bg font-bold text-xs flex items-center gap-2 hover:bg-accent-hot transition-all shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Ekspor Cadangan (JSON)</span>
          </button>

          <label className="px-4 py-2.5 rounded-xl bg-surface-2 border border-accent/25 text-appText-bright font-bold text-xs flex items-center gap-2 hover:bg-surface-3 transition-all cursor-pointer">
            <Upload className="w-4 h-4 text-accent" />
            <span>Impor Cadangan</span>
            <input type="file" accept=".json" onChange={handleImportBackup} className="hidden" />
          </label>
        </div>
      </div>

      {/* PWA & Offline Engine Settings */}
      <div className="bg-surface border border-accent/20 rounded-2xl p-6 space-y-5">
        <h2 className="font-bold text-sm text-appText-bright flex items-center gap-2 border-b border-accent/15 pb-3">
          <Smartphone className="w-4 h-4 text-accent" />
          <span>Aplikasi & Penyimpanan Offline (PWA)</span>
        </h2>

        <div className="flex items-center justify-between text-xs">
          <div>
            <div className="font-semibold text-appText-bright">Versi Sistem</div>
            <div className="text-appText-muted">v15.16.0 · Arsitektur SPA React & Vite</div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-bold">
            Produksi Aktif
          </span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div>
            <div className="font-semibold text-appText-bright">Mode Offline & Service Worker</div>
            <div className="text-appText-muted">Cache data kosakata & grammar tersedia tanpa internet</div>
          </div>
          <button
            onClick={async () => {
              if ('caches' in window) {
                const keys = await caches.keys();
                await Promise.all(keys.map(k => caches.delete(k)));
                showToast('Cache offline dibersihkan. Memuat ulang...', '🧹');
                setTimeout(() => window.location.reload(), 1000);
              } else {
                showToast('Cache tidak tersedia', '⚠️');
              }
            }}
            className="px-3 py-1.5 rounded-lg bg-surface-2 border border-accent/20 text-appText-bright hover:bg-surface-3 transition-colors text-xs font-medium"
          >
            Bersihkan Cache
          </button>
        </div>

        <div className="pt-2">
          <button
            onClick={() => usePwaStore.getState().setShowInstallModal(true)}
            className="w-full py-2.5 rounded-xl bg-surface-2 border border-accent/30 text-accent font-bold text-xs flex items-center justify-center gap-2 hover:bg-amber-500/10 transition-colors"
          >
            <Smartphone className="w-4 h-4" />
            <span>Panduan Pasang Aplikasi ke Layar Utama</span>
          </button>
        </div>
      </div>
    </div>
  );
};
