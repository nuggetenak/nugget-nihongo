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
  KeyRound,
  ShieldAlert,
  Check,
  ExternalLink,
  Sliders,
  HelpCircle,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { APP_VERSION, APP_RELEASE_NAME } from '../config/version';
import { usePwaStore } from '../lib/pwa/pwaStore';
import { useAuthStore } from '../lib/supabase/authStore';
import { speakJapanese } from '../lib/audio/tts';
import { playSuccessSfx } from '../lib/audio/sfx';
import {
  getStoredSupabaseConfig,
  updateSupabaseConfig,
  testSupabaseConnection,
} from '../lib/supabase/client';

export const SettingsPage: React.FC = () => {
  const {
    theme, toggleTheme,
    showFurigana, setShowFurigana,
    showRomaji, setShowRomaji,
    soundEffects, setSoundEffects,
    speechRate, setSpeechRate,
    showToast, resetAllData,
    openOnboarding, openFeatureGuide,
  } = useAppStore();

  const {
    user, syncStatus, lastSyncedAt,
    openAuthModal, signOut, syncNow
  } = useAuthStore();

  const [supabaseConfig, setSupabaseConfig] = useState(() => getStoredSupabaseConfig());
  const [supabaseUrlInput, setSupabaseUrlInput] = useState(supabaseConfig.url);
  const [supabaseKeyInput, setSupabaseKeyInput] = useState(supabaseConfig.anonKey);
  const [isTestingSupabase, setIsTestingSupabase] = useState(false);
  const [supabaseTestResult, setSupabaseTestResult] = useState<{ ok: boolean; message: string } | null>(null);
  const [showConfigPanel, setShowConfigPanel] = useState(supabaseConfig.isLegacyDeadUrl);
  const [isResetting, setIsResetting] = useState(false);

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

  const handleSaveSupabaseConfig = () => {
    updateSupabaseConfig(supabaseUrlInput, supabaseKeyInput);
    const updated = getStoredSupabaseConfig();
    setSupabaseConfig(updated);
    showToast('Konfigurasi Supabase berhasil disimpan!', '☁️');
  };

  const handleTestSupabase = async () => {
    setIsTestingSupabase(true);
    setSupabaseTestResult(null);
    try {
      const res = await testSupabaseConnection(supabaseUrlInput, supabaseKeyInput);
      setSupabaseTestResult(res);
      if (res.ok) {
        showToast('Koneksi Supabase aktif & terhubung!', '✅');
      } else {
        showToast('Koneksi tidak berhasil', '⚠️');
      }
    } catch {
      setSupabaseTestResult({ ok: false, message: 'Gagal menghubungi server Supabase.' });
    } finally {
      setIsTestingSupabase(false);
    }
  };

  const handleResetSupabaseConfig = () => {
    localStorage.removeItem('nn_supabase_url');
    localStorage.removeItem('nn_supabase_anon_key');
    const updated = getStoredSupabaseConfig();
    setSupabaseConfig(updated);
    setSupabaseUrlInput(updated.url);
    setSupabaseKeyInput(updated.anonKey);
    setSupabaseTestResult(null);
    showToast('Konfigurasi Supabase dikembalikan ke awal', '🔄');
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
          <span>Tampilan & Aksara</span>
        </h2>

        {/* Furigana Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-appText-bright">Tampilkan Furigana</div>
            <div className="text-xs text-appText-muted">Panduan cara baca hiragana di atas kanji</div>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={showFurigana}
            onClick={() => {
              setShowFurigana(!showFurigana);
              showToast(showFurigana ? 'Furigana disembunyikan' : 'Furigana diaktifkan', '文');
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
            <div className="text-sm font-semibold text-appText-bright">Tampilkan Romaji</div>
            <div className="text-xs text-appText-muted">Bantuan ejaan alfabet latin untuk pemula</div>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={showRomaji}
            onClick={() => {
              setShowRomaji(!showRomaji);
              showToast(showRomaji ? 'Romaji dinonaktifkan' : 'Romaji diaktifkan', '🔤');
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

      {/* Audio & Sound Effects Settings */}
      <div className="bg-surface border border-accent/20 rounded-2xl p-6 space-y-5">
        <h2 className="font-bold text-sm text-appText-bright flex items-center gap-2 border-b border-accent/15 pb-3">
          <Volume2 className="w-4 h-4 text-accent" />
          <span>Audio & Efek Suara</span>
        </h2>

        {/* Sound Effects Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-appText-bright">Efek Suara Interaksi (SFX)</div>
            <div className="text-xs text-appText-muted">Suara chime jawaban benar, balik kartu, dan tetesan air kebun</div>
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

      {/* Supabase Account & Cloud Sync Settings */}
      <div className="bg-surface border border-accent/20 rounded-2xl p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-accent/15 pb-3">
          <h2 className="font-bold text-sm text-appText-bright flex items-center gap-2">
            <Cloud className="w-4 h-4 text-accent" />
            <span>Akun & Sinkronisasi Cloud (Supabase)</span>
          </h2>
          {user ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Online Cloud
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-surface-2 text-appText-muted border border-accent/15">
              <CloudOff className="w-3 h-3 text-appText-muted" />
              Mode Lokal
            </span>
          )}
        </div>

        {user ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-surface-2 border border-accent/15">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-500/40 text-accent font-bold flex items-center justify-center text-sm">
                  {user.user_metadata?.display_name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div>
                  <div className="text-xs font-bold text-appText-bright">
                    {user.user_metadata?.display_name || user.email?.split('@')[0] || 'Pengguna Nugget'}
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
              Kamu saat ini menggunakan <strong>Mode Lokal</strong>. Semua data tetap tersimpan di browsermu. Masuk atau daftarkan akun agar progres belajar, kartu FSRS, streak, dan tanaman kebun tersinkronisasi otomatis antar HP dan Laptop.
            </p>
            <button
              onClick={() => openAuthModal('signin')}
              className="w-full py-2.5 rounded-xl bg-accent text-bg font-bold text-xs flex items-center justify-center gap-2 hover:bg-accent-hot transition-all shadow-md shadow-accent/15"
            >
              <LogIn className="w-4 h-4" />
              <span>Masuk / Buat Akun Supabase</span>
            </button>
          </div>
        )}

        {/* Supabase Custom Credentials Configuration Form */}
        <div className="pt-3 border-t border-accent/15">
          <button
            type="button"
            onClick={() => setShowConfigPanel(!showConfigPanel)}
            className="w-full flex items-center justify-between text-xs font-bold text-appText-bright hover:text-accent transition-colors py-1"
          >
            <span className="flex items-center gap-1.5 flex-wrap">
              <KeyRound className="w-3.5 h-3.5 text-accent" />
              <span>Konfigurasi Kunci Proyek Supabase Cloud</span>
              {supabaseConfig.isCustom && (
                <span className="px-1.5 py-0.2 rounded text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  Kustom Aktif
                </span>
              )}
              {supabaseConfig.isLegacyDeadUrl && (
                <span className="px-1.5 py-0.2 rounded text-[10px] bg-amber-500/15 text-amber-400 border border-amber-500/30">
                  Perlu Diatur
                </span>
              )}
            </span>
            <span className="text-xs text-appText-muted">{showConfigPanel ? '▲ Sembunyikan' : '▼ Tampilkan'}</span>
          </button>

          {showConfigPanel && (
            <div className="mt-3 p-4 rounded-xl bg-surface-2/80 border border-accent/20 space-y-3.5 animate-in fade-in duration-200">
              {supabaseConfig.isLegacyDeadUrl && (
                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-start gap-2 text-[11px] text-amber-300">
                  <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong>Proyek Supabase Lama Tidak Aktif (DNS NXDOMAIN):</strong>
                    <p className="mt-0.5 text-appText-muted leading-relaxed">
                      Domain bawaan lama (<code>oxeuwkpgrtojjzhcboqz</code>) tidak dapat diakses lagi di server Supabase. Agar Login Google & Sinkronisasi Cloud berfungsi di akun pribadimu, masukkan <strong>Project URL</strong> dan <strong>Anon Public Key</strong> dari tab dashboard Supabase aktifmu di bawah ini.
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-appText-bright block">
                  Supabase Project URL:
                </label>
                <input
                  type="url"
                  value={supabaseUrlInput}
                  onChange={(e) => setSupabaseUrlInput(e.target.value)}
                  placeholder="https://xxxxxxxxxxxxxxxxxxxx.supabase.co"
                  className="w-full px-3 py-2 rounded-lg bg-surface border border-accent/30 text-appText-bright text-xs font-mono focus:outline-none focus:border-accent"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-appText-bright block">
                  Supabase Anon Public API Key:
                </label>
                <input
                  type="password"
                  value={supabaseKeyInput}
                  onChange={(e) => setSupabaseKeyInput(e.target.value)}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  className="w-full px-3 py-2 rounded-lg bg-surface border border-accent/30 text-appText-bright text-xs font-mono focus:outline-none focus:border-accent"
                />
              </div>

              {supabaseTestResult && (
                <div
                  className={`p-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 ${
                    supabaseTestResult.ok
                      ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400'
                      : 'bg-red-500/15 border border-red-500/30 text-red-400'
                  }`}
                >
                  {supabaseTestResult.ok ? (
                    <Check className="w-4 h-4 shrink-0" />
                  ) : (
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                  )}
                  <span>{supabaseTestResult.message}</span>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  onClick={handleSaveSupabaseConfig}
                  className="px-3.5 py-1.5 rounded-lg bg-accent text-bg text-xs font-bold hover:bg-accent-hot transition-all shadow-sm"
                >
                  Simpan & Terapkan
                </button>

                <button
                  onClick={handleTestSupabase}
                  disabled={isTestingSupabase}
                  className="px-3.5 py-1.5 rounded-lg bg-surface-3 border border-accent/25 text-appText-bright text-xs font-semibold hover:bg-accent/20 transition-all flex items-center gap-1.5 disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isTestingSupabase ? 'animate-spin' : ''}`} />
                  <span>{isTestingSupabase ? 'Menguji...' : 'Uji Koneksi'}</span>
                </button>

                {supabaseConfig.isCustom && (
                  <button
                    onClick={handleResetSupabaseConfig}
                    className="px-3 py-1.5 rounded-lg text-appText-muted hover:text-red-400 text-xs transition-colors ml-auto"
                  >
                    Kembalikan Default
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
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
            <div className="text-appText-muted">{APP_VERSION} ({APP_RELEASE_NAME}) · Arsitektur SPA React & Vite</div>
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
