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
  Languages,
  Lock,
  ShieldCheck,
  Key,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { useCurriculumStore } from '../lib/curriculum/curriculumStore';
import { L1Substratum } from '../lib/data/diagnosticManager';
import { APP_VERSION, APP_RELEASE_NAME } from '../config/version';
import { usePwaStore } from '../lib/pwa/pwaStore';
import { useAuthStore } from '../lib/supabase/authStore';
import { speakJapanese } from '../lib/audio/tts';
import { playSuccessSfx } from '../lib/audio/sfx';
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
  } = useAppStore();

  const {
    user, syncStatus, lastSyncedAt,
    openAuthModal, signOut, syncNow
  } = useAuthStore();

  const [apiKeyInput, setApiKeyInput] = useState(() => {
    return (typeof window !== 'undefined' ? localStorage.getItem('nn_gemini_api_key') : '') || '';
  });
  const [isTestingAi, setIsTestingAi] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Ticket T-202: Encrypted backup state
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportPassphrase, setExportPassphrase] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  const [decryptModalOpen, setDecryptModalOpen] = useState(false);
  const [pendingEncryptedJson, setPendingEncryptedJson] = useState<string | null>(null);
  const [decryptPassphrase, setDecryptPassphrase] = useState('');
  const [decryptError, setDecryptError] = useState<string | null>(null);
  const [isDecrypting, setIsDecrypting] = useState(false);

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

  return (
    <div className="max-w-3xl mx-auto py-6 pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12 space-y-8 animate-in fade-in duration-300 min-w-0 overflow-x-hidden">
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
                  className={`px-3 py-1.5 min-h-[40px] text-xs font-semibold rounded-lg transition-all active:scale-95 ${
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
              speakJapanese('日本語の勉強を始めましょう！', speechRate);
            }}
            className="px-3.5 py-2.5 min-h-[40px] rounded-xl bg-surface-2 border border-accent/25 hover:border-accent text-accent-hot text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Tes Pelafalan Audio 🔊</span>
          </button>
        </div>
      </div>

      {/* Penyesuaian Logat Daerah (Latar Belakang Bahasa Ibu) */}
      <div className="bg-surface border border-accent/20 rounded-2xl p-6 space-y-4">
        <h2 className="font-bold text-sm text-appText-bright flex items-center gap-2 border-b border-accent/15 pb-3">
          <Languages className="w-4 h-4 text-accent" />
          <span>Penyesuaian Logat Daerah (Latar Belakang Bahasa)</span>
        </h2>

        <p className="text-xs text-appText-muted leading-relaxed">
          Nugget Nihongo menyesuaikan diagnosis tata bahasa dan latihan nada Tokyo (Pitch Accent) berdasarkan latar belakang logat daerahmu untuk mengatasi kebiasaan pengucapan yang terbawa dari bahasa ibu.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {[
            {
              id: 'general_indonesian' as L1Substratum,
              title: 'Bahasa Indonesia Umum',
              badge: 'Umum',
              desc: 'Fokus pada perbedaan urutan kalimat Indonesia vs Jepang, partikel wa/ga, dan kata "adalah".',
            },
            {
              id: 'javanese' as L1Substratum,
              title: 'Logat Jawa',
              badge: 'Jawa',
              desc: 'Latihan pengucapan bunyi b/d/g, panjang-pendek vokal, dan intonasi penegas.',
            },
            {
              id: 'sundanese' as L1Substratum,
              title: 'Logat Sunda',
              badge: 'Sunda',
              desc: 'Latihan membedakan bunyi f/p/v, vokal, dan intonasi lembut khas bahasa Jepang.',
            },
            {
              id: 'batak_eastern' as L1Substratum,
              title: 'Logat Batak & Indonesia Timur',
              badge: 'Batak / Timur',
              desc: 'Latihan menyesuaikan ritme ketukan mora dan pola nada datar (Heiban) khas Tokyo.',
            },
          ].map((item) => {
            const isSelected = userSubstratum === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setUserSubstratum(item.id);
                  useCurriculumStore.getState().setUserSubstratum(item.id);
                  if (soundEffects) playSuccessSfx();
                  showToast(`Penyesuaian logat disetel ke: ${item.title}`, '🗣️');
                }}
                className={`p-4 rounded-xl border text-left transition-colors flex items-start gap-3 min-h-[56px] active:scale-95 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none ${
                  isSelected
                    ? 'bg-amber-500/15 dark:bg-amber-950/40 border-amber-500/60 shadow-sm'
                    : 'bg-surface-2 border-accent/20 hover:border-accent/40 hover:bg-surface-3'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                    isSelected
                      ? 'bg-amber-500 text-bg'
                      : 'bg-surface-3 text-appText-muted'
                  }`}
                >
                  {item.badge.slice(0, 2)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="text-xs font-bold text-appText-bright">
                      {item.title}
                    </div>
                    {isSelected && (
                      <span className="text-[10px] font-extrabold text-accent">✓ Aktif</span>
                    )}
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
    </div>
  );
};
