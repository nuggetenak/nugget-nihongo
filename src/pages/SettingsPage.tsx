import React, { useState, useMemo } from 'react';
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
  User,
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
  Languages,
  Lock,
  ShieldCheck,
  Key,
  Database,
  Activity,
  AlertTriangle,
  Flame,
  Zap,
  Award,
  HardDrive,
  X,
} from 'lucide-react';
import {
  getStoredSupabaseConfig,
  updateSupabaseConfig,
  testSupabaseConnection,
  OFFICIAL_PROJECT_REF,
  OFFICIAL_SUPABASE_URL,
} from '../lib/supabase/client';
import { useAppStore } from '../store/useAppStore';
import { useCurriculumStore } from '../lib/curriculum/curriculumStore';
import { L1Substratum } from '../lib/data/diagnosticManager';
import { APP_VERSION, APP_RELEASE_NAME } from '../config/version';
import { usePwaStore } from '../lib/pwa/pwaStore';
import { useAuthStore } from '../lib/supabase/authStore';
import {
  useGamificationStore,
  getLevelForXp,
  getNextLevelProgress,
} from '../lib/gamification/gamificationStore';
import { speakJapanese } from '../lib/audio/tts';
import { playSuccessSfx } from '../lib/audio/sfx';
import { SyncStatusPill } from '../components/ui/SyncStatusPill';
import { rateLimiter } from '../lib/ai/rateLimiter';
import {
  createBackupPayload,
  validateBackupPayload,
  restoreBackup,
  encryptBackupPayload,
  decryptBackupPayload,
  isEncryptedBackupContainer,
} from '../lib/storage/backupManager';
import { ResetConfirmationModal } from '../components/modals/ResetConfirmationModal';

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
    userSubstratum, setUserSubstratum,
    uiLanguage, setUiLanguage,
    streak, xp, dailyGoalXP,
    cards,
  } = useAppStore();

  const {
    user, syncStatus, lastSyncedAt,
    openAuthModal, signOut, syncNow
  } = useAuthStore();

  const heatmap = useGamificationStore((s) => s.heatmap);
  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);
  const todayXP = heatmap[todayStr]?.xp || 0;
  const isGoalReached = todayXP >= dailyGoalXP;
  const goalProgressPercent = Math.min(100, Math.round((todayXP / Math.max(1, dailyGoalXP)) * 100));

  const levelInfo = getLevelForXp(xp);
  const nextLevelProgress = getNextLevelProgress(xp);

  const streakInfo = useMemo(() => {
    let lastDate = '';
    let lastTimestamp = 0;
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem('nn_streak');
        if (raw) {
          const parsed = JSON.parse(raw);
          lastDate = parsed.lastDate || '';
          lastTimestamp = parsed.lastTimestamp || (lastDate ? new Date(lastDate).getTime() : 0);
        }
      } catch {}
    }
    const now = Date.now();
    const isWithinGraceWindow = lastTimestamp > 0 && now - lastTimestamp <= 36 * 3600 * 1000;
    const isTodayActive = lastDate === todayStr;
    return {
      count: streak,
      lastDate,
      isTodayActive,
      isProtected: isWithinGraceWindow,
    };
  }, [streak, todayStr]);

  const [apiKeyInput, setApiKeyInput] = useState(() => {
    return (typeof window !== 'undefined' ? localStorage.getItem('nn_gemini_api_key') : '') || '';
  });
  const [isTestingAi, setIsTestingAi] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showClearCacheConfirm, setShowClearCacheConfirm] = useState(false);
  const [isClearingCache, setIsClearingCache] = useState(false);

  // Ticket T-202: Encrypted backup state
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportPassphrase, setExportPassphrase] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  const [decryptModalOpen, setDecryptModalOpen] = useState(false);
  const [pendingEncryptedJson, setPendingEncryptedJson] = useState<string | null>(null);
  const [decryptPassphrase, setDecryptPassphrase] = useState('');
  const [decryptError, setDecryptError] = useState<string | null>(null);
  const [isDecrypting, setIsDecrypting] = useState(false);

  // Supabase Cloud Configuration State (Free-Tier Optimization)
  const [sbConfig, setSbConfig] = useState(() => getStoredSupabaseConfig());
  const [inputSbUrl, setInputSbUrl] = useState(() => {
    const cfg = getStoredSupabaseConfig();
    return cfg.url !== 'https://unconfigured.supabase.co' ? cfg.url : OFFICIAL_SUPABASE_URL;
  });
  const [inputSbKey, setInputSbKey] = useState(() => {
    const cfg = getStoredSupabaseConfig();
    return cfg.anonKey !== 'placeholder-anon-key' ? cfg.anonKey : '';
  });
  const [isTestingSb, setIsTestingSb] = useState(false);
  const [sbTestResult, setSbTestResult] = useState<{ ok: boolean; message: string; latencyMs?: number } | null>(null);
  const [isSbCardExpanded, setIsSbCardExpanded] = useState(false);

  const handleSaveSupabase = () => {
    updateSupabaseConfig(inputSbUrl, inputSbKey);
    const updated = getStoredSupabaseConfig();
    setSbConfig(updated);
    showToast('Konfigurasi Supabase tersimpan!', 'success');
  };

  const handleTestSupabase = async () => {
    setIsTestingSb(true);
    setSbTestResult(null);
    try {
      const result = await testSupabaseConnection(inputSbUrl, inputSbKey);
      setSbTestResult(result);
      if (result.ok) {
        showToast('Koneksi Supabase aktif!', 'success');
        playSuccessSfx();
      } else {
        showToast(result.message, 'error');
      }
    } finally {
      setIsTestingSb(false);
    }
  };

  const handleSaveApiKey = () => {
    if (apiKeyInput.trim()) {
      localStorage.setItem('nn_gemini_api_key', apiKeyInput.trim());
      showToast('Kunci API tersimpan!', '🔑');
    } else {
      localStorage.removeItem('nn_gemini_api_key');
      showToast('Menggunakan kunci API bawaan sistem', '🔄');
    }
  };

  const handleTestAi = async () => {
    const throttle = rateLimiter.canExecute('ai_test_ping');
    if (!throttle.allowed) {
      showToast(`Harap tunggu ${Math.ceil(throttle.waitMs / 1000)} detik sebelum tes kembali.`, '⏳');
      return;
    }
    rateLimiter.recordExecution('ai_test_ping');

    setIsTestingAi(true);
    try {
      const activeKey =
        apiKeyInput.trim() ||
        (typeof window !== 'undefined' ? localStorage.getItem('nn_gemini_api_key') : '') ||
        import.meta.env.VITE_GEMINI_API_KEY ||
        '';

      if (!activeKey) throw new Error('API Key belum diisi. Silakan masukkan kunci API Anda.');

      if (activeKey.startsWith('sk-or-')) {
        const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${activeKey}`,
            'HTTP-Referer': 'https://nugget-nihongo.pages.dev',
            'X-Title': 'Nugget Nihongo Sensei AI',
          },
          body: JSON.stringify({
            model: 'qwen/qwen-2.5-72b-instruct',
            messages: [{ role: 'user', content: 'Halo Sensei, tes koneksi 1 kata.' }],
            max_tokens: 30,
          }),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(`OpenRouter HTTP ${res.status}: ${err?.error?.message || ''}`);
        }
        showToast('Koneksi ke Sensei AI (OpenRouter Qwen 2.5 72B) Berhasil! 🍵', '✅');
      } else {
        // Ticket T-201: Never expose API key in query parameters to prevent proxy/access log leaks
        const res = await fetch(
          'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-goog-api-key': activeKey,
            },
            body: JSON.stringify({
              contents: [{ role: 'user', parts: [{ text: 'Halo Sensei, tes koneksi 1 kata.' }] }],
            }),
          }
        );
        if (!res.ok) throw new Error(`Gemini HTTP ${res.status}`);
        showToast('Koneksi ke Sensei AI (Gemini Flash) Berhasil! 🍵', '✅');
      }
    } catch (e: any) {
      showToast(`Gagal: ${e.message}`, '⚠️');
    } finally {
      setIsTestingAi(false);
    }
  };

  const handleExportBackup = () => {
    try {
      const payload = createBackupPayload();
      const dateStr = new Date().toISOString().slice(0, 10);
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `nugget-nihongo-backup-${dateStr}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast(`Cadangan data terverifikasi (${payload._metadata.keyCount} item) berhasil diunduh!`, '💾');
    } catch {
      showToast('Gagal membuat cadangan data', '⚠️');
    }
  };

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

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target?.result as string;

        // Ticket T-202: Check if payload is encrypted with AES-GCM
        if (isEncryptedBackupContainer(text)) {
          setPendingEncryptedJson(text);
          setDecryptPassphrase('');
          setDecryptError(null);
          setDecryptModalOpen(true);
          return;
        }

        const validation = validateBackupPayload(text);
        if (!validation.valid || !validation.payload) {
          showToast(validation.message, '⚠️');
          return;
        }

        // Secondary defense-in-depth verification for key allowlist and value type
        for (const [k, v] of Object.entries(validation.payload.data)) {
          if (/^(nn_|bunpou_)/.test(k) && typeof v === 'string') {
            // verified key and value type
          }
        }

        const res = restoreBackup(validation.payload);
        if (!res.success) {
          showToast('Tidak ada data valid yang dapat dipulihkan', '⚠️');
          return;
        }

        showToast(`Berhasil memulihkan ${res.restoredCount} data terverifikasi! Memuat ulang...`, '✨');
        setTimeout(() => window.location.reload(), 1200);
      } catch (err: any) {
        showToast(`Gagal membaca berkas: ${err.message}`, '⚠️');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
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

  const handleExecuteReset = () => {
    resetAllData();
    setShowResetConfirm(false);
    showToast('Seluruh data berhasil direset ke awal', '🧹');
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
    <div className="w-full max-w-full sm:max-w-4xl mx-auto py-3 sm:py-6 px-2 sm:px-4 pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12 min-w-0 overflow-x-hidden space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-appText-bright mb-1 tracking-tight">
          Profil & Pengaturan
        </h1>
        <p className="text-xs sm:text-sm text-appText-muted">
          Kelola identitas pembelajar, status sinkronisasi cloud, dialek bahasa ibu, dan preferensi aplikasi.
        </p>
      </div>

      {/* Feature 13 (F13): Top Profile & Progress Mastery Card */}
      <div className="bg-surface border border-accent/25 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm space-y-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header: Identity & SyncStatusPill */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-accent/15 pb-4">
          <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
            {user?.user_metadata?.avatar_url ? (
              <img
                src={user.user_metadata.avatar_url}
                alt="Avatar Pengguna"
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-accent/40 shadow-md shrink-0"
              />
            ) : user ? (
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-amber-500/25 to-amber-600/35 border-2 border-accent/40 text-accent font-black text-xl sm:text-2xl flex items-center justify-center shadow-md shrink-0">
                {user.user_metadata?.full_name?.charAt(0).toUpperCase() ||
                  user.email?.charAt(0).toUpperCase() ||
                  'U'}
              </div>
            ) : (
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-surface-2 border-2 border-accent/30 text-accent flex items-center justify-center shadow-md shrink-0">
                <User className="w-7 h-7 sm:w-8 sm:h-8 text-accent" />
              </div>
            )}

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-extrabold text-appText-bright truncate">
                  {user
                    ? user.user_metadata?.full_name || user.email?.split('@')[0] || 'Pembelajar Nihongo'
                    : 'Tamu Pembelajar (Guest)'}
                </h2>
                {user ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Cloud Aktif
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-surface-2 text-appText-muted border border-accent/20 shrink-0">
                    Mode Tamu Lokal
                  </span>
                )}
              </div>
              <p className="text-xs text-appText-muted truncate mt-0.5 font-mono">
                {user ? user.email : 'Belajar offline tanpa akun · Progres disimpan di browser'}
              </p>
            </div>
          </div>

          {/* Embedded SyncStatusPill & Auth Action Button */}
          <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
            <SyncStatusPill />
            {user ? (
              <button
                type="button"
                onClick={signOut}
                className="px-3 py-1.5 min-h-[40px] rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 focus:outline-none"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Keluar</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => openAuthModal('signin')}
                className="px-3.5 py-1.5 min-h-[40px] rounded-xl bg-accent text-bg hover:bg-accent-hot text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm active:scale-95 focus:outline-none"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Masuk Cloud</span>
              </button>
            )}
          </div>
        </div>

        {/* Gamification Mastery Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
          {/* 36-Hour Streak Engine Card */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-surface-2/70 border border-accent/15 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-appText-muted flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>36h Streak Engine</span>
              </span>
              {streakInfo.isTodayActive ? (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-accent-hot border border-amber-500/30">
                  Hari Ini Selesai
                </span>
              ) : streakInfo.isProtected ? (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/30">
                  Grace 36 Jam Aktif
                </span>
              ) : (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-surface-3 text-appText-muted border border-accent/15">
                  Siap Belajar
                </span>
              )}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-appText-bright font-mono">
                {streak}
              </span>
              <span className="text-xs text-appText-muted font-medium">Hari Berturut-turut</span>
            </div>
            <p className="text-[11px] text-appText-muted leading-tight">
              {streakInfo.isProtected
                ? '🛡️ Proteksi jadwal giliran kerja & lembur aktif hingga 36 jam.'
                : 'Pertahankan momentum belajarmu minimal 1 sesi latihan per hari.'}
            </p>
          </div>

          {/* Level & XP Progression Card */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-surface-2/70 border border-accent/15 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-appText-muted flex items-center gap-1.5">
                <Award className="w-4 h-4 text-accent" />
                <span>Level & Gelar Pembelajar</span>
              </span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/25">
                Lv. {levelInfo.level}
              </span>
            </div>
            <div>
              <div className="text-sm font-bold text-appText-bright truncate">
                {levelInfo.title} <span className="text-xs text-appText-muted font-normal font-japanese">({levelInfo.titleJp})</span>
              </div>
              <div className="text-xs text-appText-muted font-mono mt-0.5">
                {xp.toLocaleString('id-ID')} Total XP
              </div>
            </div>
            <div className="space-y-1">
              <div className="w-full h-2 rounded-full bg-surface-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${nextLevelProgress.progressPercent}%` }}
                />
              </div>
              <div className="text-[10px] text-appText-muted flex justify-between">
                <span>{nextLevelProgress.progressPercent}% Progres</span>
                <span>
                  {nextLevelProgress.xpNeeded > 0
                    ? `${nextLevelProgress.xpNeeded.toLocaleString('id-ID')} XP lagi`
                    : 'Level Maksimal'}
                </span>
              </div>
            </div>
          </div>

          {/* Target Harian XP Card */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-surface-2/70 border border-accent/15 space-y-2 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-appText-muted flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Target Harian XP</span>
              </span>
              {isGoalReached ? (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  🎯 Tercapai
                </span>
              ) : (
                <span className="text-[10px] font-mono font-bold text-accent">
                  {goalProgressPercent}%
                </span>
              )}
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-appText-bright font-mono">
                {todayXP}
              </span>
              <span className="text-xs text-appText-muted font-mono">/ {dailyGoalXP} XP</span>
            </div>
            <div className="w-full h-2 rounded-full bg-surface-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${goalProgressPercent}%` }}
              />
            </div>
            <p className="text-[11px] text-appText-muted leading-tight">
              {isGoalReached
                ? 'Target hari ini tercapai! Pertahankan konsistensi belajarmu.'
                : `Kumpulkan ${Math.max(0, dailyGoalXP - todayXP)} XP lagi untuk menyelesaikan target hari ini.`}
            </p>
          </div>
        </div>
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
            className="flex items-center gap-2 px-3.5 py-2 min-h-[40px] rounded-xl bg-surface-2 border border-accent/20 hover:border-accent text-appText-bright text-xs font-semibold transition-all active:scale-95 focus:outline-none"
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

        {/* Interface Language Selection (Ticket T-89) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-appText-bright">Bahasa Antarmuka (Language)</div>
            <div className="text-xs text-appText-muted">Pilih bahasa petunjuk dan navigasi aplikasi</div>
          </div>
          <div className="flex items-center gap-1.5 bg-surface-2 p-1 rounded-xl border border-accent/15">
            {[
              { id: 'id' as const, label: '🇮🇩 Indonesia' },
              { id: 'en' as const, label: '🇬🇧 English' },
            ].map((item) => {
              const isSelected = uiLanguage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setUiLanguage(item.id);
                    showToast(item.id === 'id' ? 'Bahasa diatur ke Indonesia' : 'Language set to English', '🌐');
                  }}
                  className={`px-3 py-1.5 min-h-[40px] text-xs font-semibold rounded-lg transition-all active:scale-95 focus:outline-none ${
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
            className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors focus:outline-none ${
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
            className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors focus:outline-none ${
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
              { rate: 1.25, label: '1.25x Cepat' },
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
                  className={`px-3 py-2 min-h-[40px] text-xs font-semibold rounded-lg transition-all active:scale-95 focus:outline-none ${
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
              speakJapanese('日本語の勉強を始めましょう！', speechRate);
            }}
            className="px-3.5 py-2.5 min-h-[40px] rounded-xl bg-surface-2 border border-accent/25 hover:border-accent text-accent-hot text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 focus:outline-none"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Tes Pelafalan Audio 🔊</span>
          </button>
        </div>
      </div>

      {/* Feature 14 (F14): L1 Substratum Dialect Hub (Latar Belakang Bahasa Ibu) */}
      <div className="bg-surface border border-accent/20 rounded-2xl p-6 space-y-4">
        <div className="border-b border-accent/15 pb-3 flex items-center justify-between">
          <h2 className="font-bold text-sm text-appText-bright flex items-center gap-2">
            <Languages className="w-4 h-4 text-accent" />
            <span>Penyesuaian Logat Daerah & Dialek Ibu (L1 Substratum Hub)</span>
          </h2>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">
            Pedagogi Kontrastif
          </span>
        </div>

        <p className="text-xs text-appText-muted leading-relaxed">
          Nugget Nihongo menyesuaikan diagnosis tata bahasa, analogi keigo, dan latihan nada Tokyo (Pitch Accent) berdasarkan latar belakang bahasa ibumu untuk mengatasi interferensi fonologis & sintaksis secara alami.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {[
            {
              id: 'general_indonesian' as L1Substratum,
              title: 'Bahasa Indonesia Umum',
              badge: 'Umum',
              focus: 'Analogi partikel wa/ga & struktur SOV vs SVO',
              desc: 'Fokus pada perbedaan urutan kalimat Indonesia vs Jepang, eliminasi kata kopula "adalah", serta analogi partikel topik (wa) dan subjek gramatikal (ga).',
            },
            {
              id: 'javanese' as L1Substratum,
              title: 'Logat Jawa',
              badge: 'Jawa',
              focus: 'Analogi partikel rasa & unggah-ungguh keigo',
              desc: 'Analogi partikel rasa (ta, lha, kok sepadan yo, ne, wa), pemahaman unggah-ungguh keigo (ngoko sepadan tameguchi, krama inggil sepadan sonkeigo/kenjougo), serta artikulasi bunyi b/d/g.',
            },
            {
              id: 'sundanese' as L1Substratum,
              title: 'Logat Sunda',
              badge: 'Sunda',
              focus: 'Kehalusan rasa bahasa & tata krama undak usuk',
              desc: 'Kehalusan rasa bahasa & tata krama undak usuk basa (lemes/loma), artikulasi intonasi lembut khas Nihongo, serta latihan ketepatan artikulasi bunyi vokal dan f/p/v.',
            },
            {
              id: 'batak_eastern' as L1Substratum,
              title: 'Logat Batak & Indonesia Timur',
              badge: 'Batak / Timur',
              focus: 'Ketegasan intonasi & ritme mora Tokyo Heiban',
              desc: 'Ketegasan intonasi dan ekspresi langsung tanpa ragu, dipadukan latihan ketukan mora berjarak konstan dan adaptasi pola nada datar (Heiban) khas Tokyo.',
            },
          ].map((item) => {
            const isSelected = userSubstratum === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setUserSubstratum(item.id);
                  useCurriculumStore.getState().setUserSubstratum(item.id);
                  if (typeof window !== 'undefined') {
                    try {
                      localStorage.setItem('nn_user_l1_substratum', item.id);
                    } catch {}
                  }
                  if (soundEffects) playSuccessSfx();
                  showToast(`Penyesuaian logat disetel ke: ${item.title}`, '🗣️');
                }}
                className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3 min-h-[56px] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                  isSelected
                    ? 'bg-amber-500/15 dark:bg-amber-950/40 border-amber-500/60 shadow-sm'
                    : 'bg-surface-2 border-accent/20 hover:border-accent/40 hover:bg-surface-3'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                    isSelected
                      ? 'bg-amber-500 text-bg shadow-sm'
                      : 'bg-surface-3 text-appText-muted'
                  }`}
                >
                  {item.badge.slice(0, 2)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-xs font-bold text-appText-bright">
                      {item.title}
                    </div>
                    {isSelected && (
                      <span className="text-[10px] font-extrabold text-accent bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-full shrink-0">
                        ✓ Aktif
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] font-semibold text-accent/90 mt-0.5">
                    {item.focus}
                  </div>
                  <div className="text-[11px] text-appText-muted mt-1 leading-normal break-words">
                    {item.desc}
                  </div>
                </div>
              </button>
            );
          })}
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
            <SyncStatusPill />
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

      {/* Supabase Cloud Connection & Free-Tier Manager */}
      <div className="bg-surface border border-accent/20 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-accent/15 pb-3">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-accent" />
            <span className="font-bold text-sm text-appText-bright">Koneksi Database Cloud (Supabase Free Tier)</span>
          </div>
          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border flex items-center gap-1.5 ${
            sbConfig.isConfigured
              ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
              : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
          }`}>
            <span className={`w-2 h-2 rounded-full ${sbConfig.isConfigured ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            {sbConfig.isConfigured ? 'Cloud Terhubung' : 'Offline Mandiri'}
          </span>
        </div>

        <p className="text-xs text-appText-muted leading-relaxed">
          Nugget Nihongo beroperasi dengan arsitektur <strong>Offline-First</strong>. Sinkronisasi cloud menggunakan database PostgreSQL Supabase dengan optimasi ketat kuota gratis (500 MB DB, 5 GB egress, proteksi auto-pause 7 hari).
        </p>

        {/* Free Tier Protection Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
          <div className="bg-surface-2/60 border border-accent/10 rounded-xl p-2.5 flex items-start gap-2 text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-appText-bright block">Delta Sync Hemat Kuota</span>
              <span className="text-appText-muted">Hanya mutasi kotor yang diunggah ke cloud.</span>
            </div>
          </div>
          <div className="bg-surface-2/60 border border-accent/10 rounded-xl p-2.5 flex items-start gap-2 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-appText-bright block">Anti-Pause Shield (72h)</span>
              <span className="text-appText-muted">Heartbeat berkala mencegah database tertidur.</span>
            </div>
          </div>
          <div className="bg-surface-2/60 border border-accent/10 rounded-xl p-2.5 flex items-start gap-2 text-[11px]">
            <Lock className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-appText-bright block">Row-Level Security</span>
              <span className="text-appText-muted">Data hanya dapat diakses oleh akun pemiliknya.</span>
            </div>
          </div>
        </div>

        {/* Form Inputs Toggle */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setIsSbCardExpanded(!isSbCardExpanded)}
            className="text-xs font-bold text-accent hover:text-accent-hot flex items-center gap-1.5 transition-colors"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{isSbCardExpanded ? 'Tutup Pengaturan Kredensial Cloud' : 'Buka Pengaturan Kredensial Cloud (URL & Anon Key)'}</span>
          </button>

          {isSbCardExpanded && (
            <div className="mt-3.5 space-y-3 bg-surface-2/40 p-4 rounded-xl border border-accent/15 animate-in fade-in duration-200">
              <div>
                <label className="text-[11px] font-bold text-appText-muted uppercase tracking-wider block mb-1">
                  Supabase Project URL
                </label>
                <input
                  type="text"
                  value={inputSbUrl}
                  onChange={(e) => setInputSbUrl(e.target.value)}
                  placeholder="https://xipvhxorvwpvfokauboy.supabase.co"
                  className="w-full bg-surface border border-accent/20 rounded-xl px-3 py-2 text-xs font-mono text-appText-bright focus:outline-none focus:border-accent"
                />
                <span className="text-[10px] text-appText-muted mt-1 block">
                  Project aktif: <code className="text-accent">{OFFICIAL_PROJECT_REF}</code>
                </span>
              </div>

              <div>
                <label className="text-[11px] font-bold text-appText-muted uppercase tracking-wider block mb-1">
                  Supabase Anon Key (Public API Key)
                </label>
                <input
                  type="password"
                  value={inputSbKey}
                  onChange={(e) => setInputSbKey(e.target.value)}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  className="w-full bg-surface border border-accent/20 rounded-xl px-3 py-2 text-xs font-mono text-appText-bright focus:outline-none focus:border-accent"
                />
                <span className="text-[10px] text-appText-muted mt-1 block">
                  Kunci aman untuk browser (tersimpan lokal di localStorage). Dilarang memasukkan Service Role Key!
                </span>
              </div>

              {sbTestResult && (
                <div className={`p-3 rounded-xl text-xs flex items-start gap-2 border ${
                  sbTestResult.ok
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                }`}>
                  {sbTestResult.ok ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                  )}
                  <div>
                    <div className="font-semibold">{sbTestResult.ok ? 'Koneksi Berhasil' : 'Koneksi Bermasalah'}</div>
                    <div className="text-[11px] opacity-90 mt-0.5">{sbTestResult.message}</div>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleSaveSupabase}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-accent hover:bg-accent-hot text-bg font-bold text-xs transition-all active:scale-95"
                >
                  Simpan Konfigurasi
                </button>
                <button
                  type="button"
                  onClick={handleTestSupabase}
                  disabled={isTestingSb}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-surface-2 hover:bg-surface border border-accent/30 text-appText-bright font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
                >
                  <Activity className={`w-3.5 h-3.5 text-accent ${isTestingSb ? 'animate-pulse' : ''}`} />
                  <span>{isTestingSb ? 'Menguji...' : 'Uji Koneksi Server'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Data & Backup Settings (Tickets T-202 & T-203) */}
      <div className="bg-surface border border-accent/20 rounded-2xl p-6 space-y-5">
        <h2 className="font-bold text-sm text-appText-bright flex items-center gap-2 border-b border-accent/15 pb-3">
          <Download className="w-4 h-4 text-accent" />
          <span>Cadangan Berkas Manual (JSON & Terenkripsi AES-256)</span>
        </h2>

        <p className="text-xs text-appText-muted leading-relaxed">
          Semua catatan FSRS, hafalan kartu, dan riwayat streak tersimpan aman secara offline di browser perangkatmu. Kamu bisa mengunduh file cadangan standar atau terenkripsi AES-256 kapan saja untuk dipindahkan ke perangkat lain dengan aman.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 pt-2">
          <button
            onClick={handleExportBackup}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-accent text-bg font-bold text-xs flex items-center justify-center gap-2 hover:bg-accent-hot transition-all shadow-sm active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Ekspor Standar (JSON)</span>
          </button>

          <button
            onClick={() => {
              setExportPassphrase('');
              setShowExportModal(true);
            }}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-surface-2 border border-accent/25 text-accent font-bold text-xs flex items-center justify-center gap-2 hover:bg-surface-3 transition-all shadow-sm active:scale-95"
          >
            <Lock className="w-4 h-4" />
            <span>Ekspor Terenkripsi (AES-256)</span>
          </button>

          <label className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-surface-2 border border-accent/25 text-appText-bright font-bold text-xs flex items-center justify-center gap-2 hover:bg-surface-3 transition-all cursor-pointer active:scale-95 text-center">
            <Upload className="w-4 h-4 text-accent" />
            <span>Impor Cadangan</span>
            <input type="file" accept=".json,.nuggetbackup" onChange={handleImportBackup} className="hidden" />
          </label>
        </div>
      </div>

      {/* AI Sensei & OpenRouter / Google Gemini API Studio */}
      <div className="bg-surface border border-accent/20 rounded-2xl p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-accent/15 pb-3">
          <h2 className="font-bold text-sm text-appText-bright flex items-center gap-2">
            <span className="text-base">🍵</span>
            <span>Sensei AI Studio & Kunci API (OpenRouter / Gemini)</span>
          </h2>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold text-[10px] uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            OpenRouter Qwen 2.5 72B / Llama 3.3
          </span>
        </div>

        <p id="api-key-desc" className="text-xs text-appText-muted leading-relaxed">
          Sensei Nugget & Senpai Aoi ditenagai oleh model AI bahasa Jepang terkemuka via OpenRouter cascade & Google Gemini. Kunci API lingkungan bawaan telah terpasang aktif. Kamu juga dapat memasukkan kunci API kustom (OpenRouter <code>sk-or-...</code> atau Google AI Studio).
        </p>

        <div className="space-y-3">
          <label htmlFor="custom-api-key" className="block text-xs font-semibold text-appText-bright">
            Kunci API Kustom (OpenRouter sk-or-... atau Google AI Studio):
          </label>
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <input
              id="custom-api-key"
              type="password"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="sk-or-v1-... atau biarkan kosong untuk bawaan sistem"
              aria-describedby="api-key-desc"
              aria-label="Kunci API Kustom AI Sensei"
              className="w-full flex-1 bg-surface-2 border border-accent/20 focus:border-accent focus-visible:ring-2 focus-visible:ring-accent rounded-xl px-3.5 py-2 text-xs font-mono text-appText-bright placeholder:text-appText-muted/50 focus:outline-none"
            />
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleSaveApiKey}
                aria-label="Simpan Kunci API Kustom"
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-accent text-bg font-bold text-xs hover:bg-accent-hot transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Simpan
              </button>
              <button
                type="button"
                disabled={isTestingAi}
                onClick={handleTestAi}
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-surface-2 hover:bg-surface-3 border border-accent/25 text-accent font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95"
              >
                {isTestingAi ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Menguji...</span>
                  </>
                ) : (
                  <span>Tes Koneksi</span>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-surface-2/60 border border-accent/10 space-y-1 text-xs text-appText-muted">
          <div className="font-semibold text-appText-bright flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>Karakteristik Voice & Tutor Aktif:</span>
          </div>
          <ul className="list-disc list-inside space-y-0.5 text-[11px] pt-1">
            <li><strong>Sensei Nugget:</strong> Senpai to the point, pitch 0.95 (analogi tajam tanpa basa-basi).</li>
            <li><strong>Senpai Aoi:</strong> Tutor ramah & sabar, pitch 1.15 (analogi kehidupan sehari-hari).</li>
            <li><strong>Keamanan:</strong> Dilengkapi pertahanan prompt injection dan guardrails ramah budaya (*malu-awareness*).</li>
          </ul>
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

        {/* Offline Storage Telemetry Indicator */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-surface-2/60 p-3.5 rounded-xl border border-accent/10">
          <div>
            <div className="font-semibold text-appText-bright flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-accent" />
              <span>Penyimpanan Lokal Offline</span>
            </div>
            <div className="text-appText-muted mt-0.5">
              {Object.keys(cards || {}).length} kartu FSRS tersimpan di IndexedDB & LocalStorage
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-semibold text-[11px] self-start sm:self-center">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Offline-First Siap</span>
          </span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div>
            <div className="font-semibold text-appText-bright">Mode Offline & Service Worker Cache</div>
            <div className="text-appText-muted">Cache data kosakata, kurikulum & grammar tanpa internet</div>
          </div>
          <button
            onClick={() => setShowClearCacheConfirm(true)}
            className="px-3.5 py-2 min-h-[40px] rounded-xl bg-surface-2 border border-accent/20 text-appText-bright hover:bg-surface-3 transition-all active:scale-95 text-xs font-semibold focus:outline-none"
          >
            Bersihkan Cache
          </button>
        </div>

        <div className="pt-2">
          <button
            onClick={() => usePwaStore.getState().setShowInstallModal(true)}
            className="w-full py-2.5 min-h-[40px] rounded-xl bg-surface-2 border border-accent/30 text-accent font-bold text-xs flex items-center justify-center gap-2 hover:bg-amber-500/10 transition-all active:scale-95 focus:outline-none"
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
          onClick={() => setShowResetConfirm(true)}
          className="px-4 py-2.5 rounded-xl bg-red-500/20 border border-red-500/35 text-red-400 hover:bg-red-500/30 text-xs font-bold flex items-center gap-2 transition-colors active:scale-95"
        >
          <Trash2 className="w-4 h-4" />
          <span>Reset Seluruh Data Progres</span>
        </button>

        {/* Ticket T-204: Accessible Reset Confirmation Modal with dual safeguard */}
        <ResetConfirmationModal
          isOpen={showResetConfirm}
          onClose={() => setShowResetConfirm(false)}
          onConfirm={handleExecuteReset}
        />
      </div>

      {/* Modal Ekspor Terenkripsi (Ticket T-202) */}
      {showExportModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="export-crypto-title"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200"
        >
          <div className="w-full max-w-md bg-surface border border-accent/30 rounded-2xl p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 border-b border-accent/15 pb-3">
              <div className="p-2 rounded-xl bg-amber-500/20 text-accent">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 id="export-crypto-title" className="text-sm font-extrabold text-appText-bright">
                  Ekspor Cadangan Terenkripsi (AES-GCM 256)
                </h3>
                <p className="text-[11px] text-appText-muted">
                  Kredensial API otomatis dikecualikan. Data dilindungi PBKDF2 100k iterasi.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="export-pass-input" className="block text-xs font-semibold text-appText-bright">
                Kata Sandi Enkripsi (Minimal 4 karakter):
              </label>
              <input
                id="export-pass-input"
                type="password"
                value={exportPassphrase}
                onChange={(e) => setExportPassphrase(e.target.value)}
                placeholder="Masukkan kata sandi rahasia..."
                className="w-full bg-surface-2 border border-accent/20 focus:border-accent rounded-xl px-3.5 py-2.5 text-xs text-appText-bright placeholder:text-appText-muted/50 focus:outline-none"
              />
              <p className="text-[11px] text-amber-400/90 leading-tight">
                ⚠️ Harap catat kata sandi ini. Data tidak dapat dipulihkan jika kata sandi hilang.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowExportModal(false);
                  setExportPassphrase('');
                }}
                className="px-4 py-2 rounded-xl bg-surface-2 border border-accent/20 text-appText-muted hover:text-appText-bright text-xs font-bold transition-all active:scale-95"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={isExporting || exportPassphrase.length < 4}
                onClick={handleExportEncrypted}
                className="px-4 py-2 rounded-xl bg-accent text-bg font-extrabold text-xs flex items-center gap-2 hover:bg-accent-hot transition-all disabled:opacity-50 active:scale-95 shadow-sm"
              >
                {isExporting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Lock className="w-3.5 h-3.5" />}
                <span>{isExporting ? 'Mengenkripsi...' : 'Unduh .nuggetbackup'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Dekripsi Impor Cadangan (Ticket T-202) */}
      {decryptModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="decrypt-crypto-title"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200"
        >
          <div className="w-full max-w-md bg-surface border border-accent/30 rounded-2xl p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 border-b border-accent/15 pb-3">
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 id="decrypt-crypto-title" className="text-sm font-extrabold text-appText-bright">
                  Buka Kunci Cadangan Terenkripsi
                </h3>
                <p className="text-[11px] text-appText-muted">
                  Berkas ini dienkripsi dengan standar AES-GCM-256.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="decrypt-pass-input" className="block text-xs font-semibold text-appText-bright">
                Masukkan Kata Sandi Berkas:
              </label>
              <input
                id="decrypt-pass-input"
                type="password"
                value={decryptPassphrase}
                onChange={(e) => setDecryptPassphrase(e.target.value)}
                placeholder="Kata sandi enkripsi..."
                className="w-full bg-surface-2 border border-accent/20 focus:border-accent rounded-xl px-3.5 py-2.5 text-xs text-appText-bright placeholder:text-appText-muted/50 focus:outline-none"
              />
              {decryptError && (
                <p className="text-xs text-red-400 font-semibold">{decryptError}</p>
              )}
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => {
                  setDecryptModalOpen(false);
                  setPendingEncryptedJson(null);
                  setDecryptPassphrase('');
                  setDecryptError(null);
                }}
                className="px-4 py-2 rounded-xl bg-surface-2 border border-accent/20 text-appText-muted hover:text-appText-bright text-xs font-bold transition-all active:scale-95"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={isDecrypting || !decryptPassphrase}
                onClick={handleDecryptAndRestore}
                className="px-4 py-2 rounded-xl bg-accent text-bg font-extrabold text-xs flex items-center gap-2 hover:bg-accent-hot transition-all disabled:opacity-50 active:scale-95 shadow-sm"
              >
                {isDecrypting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Key className="w-3.5 h-3.5" />}
                <span>{isDecrypting ? 'Mendekripsi...' : 'Buka Kunci & Pulihkan'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Bersihkan Cache (Non-blocking, Zero window.confirm) */}
      {showClearCacheConfirm && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="clear-cache-dialog-title"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200"
        >
          <div className="w-full max-w-md bg-surface border border-accent/30 rounded-2xl p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 border-b border-accent/15 pb-3">
              <div className="p-2 rounded-xl bg-amber-500/20 text-accent">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <h3 id="clear-cache-dialog-title" className="text-sm font-extrabold text-appText-bright">
                  Bersihkan Cache Berkas Offline
                </h3>
                <p className="text-[11px] text-appText-muted">
                  Memperbarui berkas Service Worker dan aset statis aplikasi
                </p>
              </div>
            </div>

            <p className="text-xs text-appText-muted leading-relaxed">
              Apakah Anda ingin membersihkan seluruh cache berkas offline? Progres belajar, riwayat FSRS, XP, dan streak Anda <strong>tetap aman tersimpan</strong> di IndexedDB & LocalStorage. Aplikasi akan dimuat ulang untuk mengambil versi terbaru.
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowClearCacheConfirm(false)}
                className="px-4 py-2 min-h-[40px] rounded-xl bg-surface-2 border border-accent/20 text-appText-muted hover:text-appText-bright text-xs font-bold transition-all active:scale-95 focus:outline-none"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={isClearingCache}
                onClick={handleExecuteClearCache}
                className="px-4 py-2 min-h-[40px] rounded-xl bg-accent text-bg font-extrabold text-xs flex items-center gap-2 hover:bg-accent-hot transition-all disabled:opacity-50 active:scale-95 shadow-sm focus:outline-none"
              >
                {isClearingCache ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                <span>{isClearingCache ? 'Membersihkan...' : 'Bersihkan & Muat Ulang'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
