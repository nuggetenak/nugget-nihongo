import React, { useState } from 'react';
import {
  Moon,
  Sun,
  Type,
  Download,
  Upload,
  Trash2,
  CheckCircle2,
  Smartphone,
  Cloud,
  CloudOff,
  RefreshCw,
  UserCheck,
  LogOut,
  LogIn,
  Volume2,
  VolumeX,
  Sparkles,
  Compass,
  ExternalLink,
  Sliders,
  HelpCircle,
  History,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { APP_VERSION, APP_RELEASE_NAME } from '../config/version';
import { usePwaStore } from '../lib/pwa/pwaStore';
import { useAuthStore } from '../lib/supabase/authStore';
import { speakJapanese } from '../lib/audio/tts';
import { playSuccessSfx } from '../lib/audio/sfx';

export const SettingsPage: React.FC = () => {
  const {
    theme, toggleTheme,
    showFurigana, setShowFurigana,
    showRomaji, setShowRomaji,
    soundEffects, setSoundEffects,
    speechRate, setSpeechRate,
    showToast, resetAllData,
    openOnboarding, openFeatureGuide,
    openPatchNotes,
  } = useAppStore();

  const {
    user, syncStatus, lastSyncedAt,
    openAuthModal, signOut, syncNow
  } = useAuthStore();

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

  const handleConfirmReset = () => {
    if (window.confirm('Apakah kamu yakin ingin mereset seluruh progres belajar (XP, streak, kartu FSRS, tanaman)? Tindakan ini tidak dapat dibatalkan.')) {
      resetAllData();
      showToast('Seluruh data berhasil direset ke awal', '🧹');
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6 space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-extrabold text-appText-bright mb-1">Pengaturan & Preferensi</h1>
        <p className="text-xs text-appText-muted">Sesuaikan tampilan dan kelola data progres belajarmu.</p>
      </div>

      {/* Visual & Typography Settings */}
      <div className="bg-surface border border-accent/20 rounded-2xl p-6 space-y-5">
        <h2 className="font-bold text-sm text-appText-bright flex items-center gap-2 border-b border-accent/15 pb-3">
          <Type className="w-4 h-4 text-accent" />
          <span>Tampilan Aksara & Tipografi</span>
        </h2>

        {/* Theme Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-appText-bright">Tema Aplikasi</div>
            <div className="text-xs text-appText-muted">Pilih mode tampilan gelap atau terang</div>
          </div>
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-2 border border-accent/20 hover:border-accent text-appText-bright text-xs font-semibold transition-all"
          >
            {theme === 'dark' ? (
              <>
                <Moon className="w-4 h-4 text-accent" />
                <span>Mode Gelap (Amber)</span>
              </>
            ) : (
              <>
                <Sun className="w-4 h-4 text-amber-500" />
                <span>Mode Terang</span>
              </>
            )}
          </button>
        </div>

        {/* Furigana Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-appText-bright">Tampilkan Furigana (Bacaan Kanji)</div>
            <div className="text-xs text-appText-muted">Tampilkan cara baca hiragana di atas kanji</div>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={showFurigana}
            onClick={() => {
              const next = !showFurigana;
              setShowFurigana(next);
              showToast(next ? 'Furigana diaktifkan' : 'Furigana disembunyikan', '文');
            }}
            className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
              showFurigana ? 'bg-amber-500' : 'bg-surface-3'
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                showFurigana ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Romaji Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-appText-bright">Tampilkan Romaji (Alfabet Latin)</div>
            <div className="text-xs text-appText-muted">Sangat membantu untuk pemula dari nol yang belum hafal kana</div>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={showRomaji}
            onClick={() => {
              const next = !showRomaji;
              setShowRomaji(next);
              showToast(next ? 'Romaji diaktifkan' : 'Romaji disembunyikan', '🔤');
            }}
            className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
              showRomaji ? 'bg-amber-500' : 'bg-surface-3'
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                showRomaji ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Audio & Pronunciation Settings */}
      <div className="bg-surface border border-accent/20 rounded-2xl p-6 space-y-5">
        <h2 className="font-bold text-sm text-appText-bright flex items-center gap-2 border-b border-accent/15 pb-3">
          <Volume2 className="w-4 h-4 text-accent" />
          <span>Pengaturan Suara & Audio</span>
        </h2>

        {/* Sound Effects Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-appText-bright">Efek Suara Kuis (SFX)</div>
            <div className="text-xs text-appText-muted">Suara denting benar/salah saat menjawab latihan</div>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={soundEffects}
            onClick={() => {
              const next = !soundEffects;
              setSoundEffects(next);
              if (next) playSuccessSfx();
              showToast(next ? 'Efek suara aktif' : 'Efek suara dibisukan', next ? '🔔' : '🔕');
            }}
            className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
              soundEffects ? 'bg-amber-500' : 'bg-surface-3'
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                soundEffects ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Speech Rate Selection */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-appText-bright">Kecepatan Pelafalan Bahasa Jepang (TTS)</div>
            <div className="text-xs text-appText-muted">Atur tempo suara penutur untuk kenyamanan telinga</div>
          </div>
          <div className="flex items-center gap-1.5 bg-surface-2 p-1 rounded-xl border border-accent/15">
            {[
              { rate: 0.75, label: '0.75x Lambat' },
              { rate: 0.9, label: '0.9x Standar' },
              { rate: 1.0, label: '1.0x Cepat' },
            ].map((item) => {
              const isSelected = Math.abs(speechRate - item.rate) < 0.05;
              return (
                <button
                  key={item.rate}
                  onClick={() => {
                    setSpeechRate(item.rate);
                    speakJapanese('こんにちは、頑張りましょう', item.rate);
                    showToast(`Kecepatan TTS diatur ke ${item.rate}x`, '🗣️');
                  }}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                    isSelected
                      ? 'bg-accent text-bg font-bold shadow-sm'
                      : 'text-appText-muted hover:text-appText-bright'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Test Speech Sample */}
        <div className="pt-1 flex items-center justify-between border-t border-accent/10">
          <span className="text-xs text-appText-muted">Uji audio perangkat:</span>
          <button
            onClick={() => {
              if (soundEffects) playSuccessSfx();
              setTimeout(() => speakJapanese('日本語の勉強を始めましょう！', speechRate), 300);
            }}
            className="px-3.5 py-1.5 rounded-xl bg-surface-2 border border-accent/25 hover:border-accent text-accent-hot text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Tes Pelafalan Audio 🔊</span>
          </button>
        </div>
      </div>

      {/* App Guide & Interactive Tour Section */}
      <div className="bg-surface border border-accent/20 rounded-2xl p-6 space-y-4">
        <h2 className="font-bold text-sm text-appText-bright flex items-center gap-2 border-b border-accent/15 pb-3">
          <Compass className="w-4 h-4 text-accent" />
          <span>Tur & Panduan Pengenalan Aplikasi</span>
        </h2>

        <p className="text-xs text-appText-muted leading-relaxed">
          Pelajari cara menjelajahi materi, memanfaatkan pintasan kibor <code>⌘K</code> / <code>?</code>, mekanisme pengulangan berjarak FSRS, serta merawat tanaman kebun kanjimu.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <button
            onClick={openOnboarding}
            className="p-3.5 rounded-xl bg-surface-2 border border-accent/25 hover:border-accent text-left transition-all hover:bg-surface-3 group flex items-start gap-3"
          >
            <div className="w-9 h-9 rounded-lg bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-lg shrink-0 group-hover:scale-105 transition-transform">
              🍙
            </div>
            <div>
              <div className="text-xs font-bold text-appText-bright group-hover:text-accent transition-colors flex items-center gap-1.5">
                <span>Mulai Tur Onboarding</span>
                <Sparkles className="w-3 h-3 text-amber-400" />
              </div>
              <div className="text-[11px] text-appText-muted mt-0.5">
                5 slide interaktif pengenalan filosofi & fitur utama
              </div>
            </div>
          </button>

          <button
            onClick={openFeatureGuide}
            className="p-3.5 rounded-xl bg-surface-2 border border-accent/25 hover:border-accent text-left transition-all hover:bg-surface-3 group flex items-start gap-3"
          >
            <div className="w-9 h-9 rounded-lg bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-lg shrink-0 group-hover:scale-105 transition-transform">
              🧭
            </div>
            <div>
              <div className="text-xs font-bold text-appText-bright group-hover:text-accent transition-colors flex items-center gap-1.5">
                <span>Direktori Fitur & Pintasan</span>
                <ExternalLink className="w-3 h-3 text-accent" />
              </div>
              <div className="text-[11px] text-appText-muted mt-0.5">
                Bagan Kana, Matriks Konjugasi, Komparator & Tips
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Google Account & Cloud Sync Settings */}
      <div className="bg-surface border border-accent/20 rounded-2xl p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-accent/15 pb-3">
          <h2 className="font-bold text-sm text-appText-bright flex items-center gap-2">
            <Cloud className="w-4 h-4 text-accent" />
            <span>Akun & Sinkronisasi Cloud</span>
          </h2>
          {user ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Tersambung Cloud
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-surface-2 text-appText-muted border border-accent/15">
              <CloudOff className="w-3 h-3 text-appText-muted" />
              Mode Lokal (Offline)
            </span>
          )}
        </div>

        {user ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-surface-2 border border-accent/15">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 text-accent font-bold flex items-center justify-center text-sm">
                  {user.user_metadata?.avatar_url ? (
                    <img
                      src={user.user_metadata.avatar_url}
                      alt="Avatar"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    user.user_metadata?.full_name?.charAt(0).toUpperCase() ||
                    user.email?.charAt(0).toUpperCase() ||
                    'G'
                  )}
                </div>
                <div>
                  <div className="text-xs font-bold text-appText-bright">
                    {user.user_metadata?.full_name || user.email?.split('@')[0] || 'Pengguna Google'}
                  </div>
                  <div className="text-[11px] text-appText-muted font-mono">{user.email}</div>
                </div>
              </div>

              <button
                onClick={signOut}
                className="px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Keluar</span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-surface-2/60 p-3.5 rounded-xl border border-accent/10">
              <div>
                <div className="font-semibold text-appText-bright flex items-center gap-2">
                  <span>Status Cloud Sync:</span>
                  <span className={syncStatus === 'syncing' ? 'text-amber-400' : syncStatus === 'error' ? 'text-red-400' : 'text-emerald-400 font-bold'}>
                    {syncStatus === 'syncing' ? 'Sedang sinkronisasi...' : syncStatus === 'error' ? 'Gagal sinkron' : 'Tersinkronisasi'}
                  </span>
                </div>
                <div className="text-[11px] text-appText-muted mt-0.5">
                  Terakhir: {lastSyncedAt ? new Date(lastSyncedAt).toLocaleTimeString('id-ID') : 'Belum pernah'}
                </div>
              </div>

              <button
                onClick={syncNow}
                disabled={syncStatus === 'syncing'}
                className="px-3.5 py-2 rounded-xl bg-accent text-bg font-bold text-xs flex items-center justify-center gap-2 hover:bg-accent-hot transition-all disabled:opacity-60"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
                <span>Sinkronkan Sekarang</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-xs text-appText-muted leading-relaxed">
              Saat ini kamu belajar dalam <strong>Mode Lokal</strong>. Semua data aman tersimpan di browsermu. Masuk dengan Akun Google agar progres belajar, kartu FSRS, streak, dan tanaman kebun tersinkronisasi otomatis antar HP dan Laptop.
            </p>
            <button
              onClick={() => openAuthModal('signin')}
              className="w-full py-3 px-4 rounded-xl bg-accent hover:bg-accent-hot text-bg font-bold text-xs flex items-center justify-center gap-2.5 transition-all shadow-md shadow-accent/15 active:scale-95"
            >
              <LogIn className="w-4 h-4" />
              <span>Masuk dengan Akun Google</span>
            </button>
          </div>
        )}
      </div>

      {/* Data & Backup Settings */}
      <div className="bg-surface border border-accent/20 rounded-2xl p-6 space-y-5">
        <h2 className="font-bold text-sm text-appText-bright flex items-center gap-2 border-b border-accent/15 pb-3">
          <Download className="w-4 h-4 text-accent" />
          <span>Cadangan Berkas Manual (JSON)</span>
        </h2>

        <p className="text-xs text-appText-muted leading-relaxed">
          Semua catatan FSRS, hafalan kartu, dan riwayat streak tersimpan aman secara offline di browser perangkatmu. Kamu bisa mengunduh file cadangan kapan saja untuk dipindahkan ke perangkat lain.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 pt-2">
          <button
            onClick={handleExportBackup}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-accent text-bg font-bold text-xs flex items-center justify-center gap-2 hover:bg-accent-hot transition-all shadow-sm active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Ekspor Cadangan (JSON)</span>
          </button>

          <label className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-surface-2 border border-accent/25 text-appText-bright font-bold text-xs flex items-center justify-center gap-2 hover:bg-surface-3 transition-all cursor-pointer active:scale-95 text-center">
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

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div>
            <div className="font-semibold text-appText-bright">Versi Sistem</div>
            <div className="text-appText-muted">{APP_VERSION} ({APP_RELEASE_NAME}) · Arsitektur SPA React & Vite</div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={openPatchNotes}
              className="px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/35 text-accent font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
            >
              <History className="w-3.5 h-3.5" />
              <span>Catatan Rilis (Patch Notes)</span>
            </button>
            <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-bold">
              Produksi Aktif
            </span>
          </div>
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

      {/* Danger Zone: Reset Data */}
      <div className="bg-red-950/15 border border-red-500/25 rounded-2xl p-6 space-y-4">
        <h2 className="font-bold text-sm text-red-400 flex items-center gap-2 border-b border-red-500/15 pb-3">
          <Trash2 className="w-4 h-4 text-red-400" />
          <span>Zona Berbahaya (Reset Progres)</span>
        </h2>
        <p className="text-xs text-appText-muted leading-relaxed">
          Mereset seluruh data lokal termasuk riwayat FSRS, XP, streak harian, dan kebun kembali ke kondisi awal (fresh install).
        </p>
        <button
          onClick={handleConfirmReset}
          className="px-4 py-2.5 rounded-xl bg-red-500/20 border border-red-500/35 text-red-400 hover:bg-red-500/30 text-xs font-bold flex items-center gap-2 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          <span>Reset Seluruh Data Progres</span>
        </button>
      </div>
    </div>
  );
};
