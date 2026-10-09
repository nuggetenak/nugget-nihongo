import React, { useState, useEffect } from 'react';
import {
  X,
  Mail,
  Lock,
  User as UserIcon,
  Loader2,
  Sparkles,
  AlertCircle,
  Settings,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { useAuthStore } from '../../lib/supabase/authStore';
import { useAppStore } from '../../store/useAppStore';
import {
  getStoredSupabaseConfig,
  updateSupabaseConfig,
  testSupabaseConnection,
} from '../../lib/supabase/client';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authMode,
    setAuthMode,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
  } = useAuthStore();
  const { showToast } = useAppStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Custom Supabase configuration states
  const initialConfig = getStoredSupabaseConfig();
  const [showConfig, setShowConfig] = useState(initialConfig.isLegacyDeadUrl);
  const [customUrl, setCustomUrl] = useState(
    initialConfig.isLegacyDeadUrl ? '' : initialConfig.url
  );
  const [customKey, setCustomKey] = useState(
    initialConfig.isLegacyDeadUrl ? '' : initialConfig.anonKey
  );
  const [testResult, setTestResult] = useState<{ ok: boolean; message: string } | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isAuthModalOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleSaveCustomConfig = () => {
    if (!customUrl.trim()) {
      setErrorMessage('Harap isi Project URL Supabase kamu (contoh: https://xxxx.supabase.co).');
      return;
    }
    updateSupabaseConfig(customUrl, customKey);
    showToast('Konfigurasi Supabase berhasil diperbarui!', '☁️');
    setErrorMessage(null);
    handleTestConnection();
  };

  const handleTestConnection = async () => {
    setTestResult(null);
    const res = await testSupabaseConnection(customUrl, customKey);
    setTestResult(res);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const cfg = getStoredSupabaseConfig();
    if (cfg.isLegacyDeadUrl) {
      setShowConfig(true);
      setErrorMessage(
        'Project URL Supabase bawaan tidak aktif (DNS NXDOMAIN). Masukkan Project URL & Anon Key dari dashboard Supabase kamu di bawah ini.'
      );
      setLoading(false);
      return;
    }

    try {
      if (authMode === 'signin') {
        const { error } = await signInWithEmail(email, password);
        if (error) {
          setErrorMessage(
            error.message === 'Invalid login credentials'
              ? 'Email atau kata sandi tidak cocok.'
              : error.message
          );
        } else {
          showToast('Berhasil masuk! Progres cloud disinkronkan', '☁️');
        }
      } else {
        const { error } = await signUpWithEmail(email, password, displayName);
        if (error) {
          setErrorMessage(error.message);
        } else {
          showToast('Akun berhasil dibuat! Silakan cek email kamu.', '🎉');
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Terjadi kendala sistem';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMessage(null);

    const cfg = getStoredSupabaseConfig();
    if (cfg.isLegacyDeadUrl) {
      setShowConfig(true);
      setErrorMessage(
        'Project URL Supabase bawaan tidak aktif (DNS NXDOMAIN). Masukkan Project URL & Anon Key dari dashboard Supabase kamu di bawah ini.'
      );
      setLoading(false);
      return;
    }

    try {
      const { error } = await signInWithGoogle();
      if (error) setErrorMessage(error.message);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal masuk dengan Google';
      setErrorMessage(msg);
      setLoading(false);
    }
  };

  const isLegacyDead = getStoredSupabaseConfig().isLegacyDeadUrl;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-md bg-surface border border-accent/25 rounded-3xl shadow-glow overflow-hidden relative max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow corner accent */}
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-2 rounded-xl text-appText-muted hover:text-appText-bright hover:bg-surface-2 transition-colors z-10"
          aria-label="Tutup modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto px-6 py-7 space-y-4 scrollbar-thin">
          {/* Header */}
          <div className="text-center">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-amber-950/50 text-2xl font-bold text-bg">
              🍙
            </div>
            <h2 className="text-xl font-extrabold text-appText-bright">
              {authMode === 'signin' ? 'Masuk ke Akun' : 'Daftar Akun Baru'}
            </h2>
            <p className="text-xs text-appText-muted mt-1 leading-relaxed">
              Sinkronkan kartu FSRS, kebun kanji & streak belajarmu ke cloud lintas perangkat.
            </p>
          </div>

          {/* Legacy Supabase Warning Badge if dead URL */}
          {isLegacyDead && (
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 space-y-2 text-left">
              <div className="flex items-center gap-2 text-accent font-bold text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Koneksi Supabase Pribadi Diperlukan</span>
              </div>
              <p className="text-[11px] text-appText-muted leading-relaxed">
                Project URL bawaan telah dinonaktifkan (DNS NXDOMAIN). Agar Google Sign-In dan pendaftaran akun dapat berfungsi, masukkan Project URL & Anon Key dari proyek Supabase aktifmu di bawah ini.
              </p>
              <button
                type="button"
                onClick={() => setShowConfig(!showConfig)}
                className="text-[11px] font-bold text-accent hover:underline flex items-center gap-1"
              >
                <span>{showConfig ? 'Sembunyikan Form URL ▲' : 'Buka Pengaturan URL Supabase ▼'}</span>
              </button>
            </div>
          )}

          {/* Collapsible Supabase Key Form */}
          {showConfig && (
            <div className="p-4 rounded-2xl bg-surface-2 border border-accent/25 space-y-3 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-appText-bright flex items-center gap-1.5">
                  <Settings className="w-3.5 h-3.5 text-accent" />
                  <span>Kunci Proyek Supabase</span>
                </span>
                <a
                  href="https://supabase.com/dashboard"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] text-accent hover:underline flex items-center gap-1"
                >
                  <span>Buka Dashboard</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-appText-muted mb-1">
                  Project URL (contoh: https://xxxx.supabase.co)
                </label>
                <input
                  type="url"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  placeholder="https://xyzabcdefg.supabase.co"
                  className="w-full bg-surface border border-accent/20 rounded-xl px-3 py-1.5 text-xs text-appText-bright focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-appText-muted mb-1">
                  Project Anon / Public API Key
                </label>
                <input
                  type="text"
                  value={customKey}
                  onChange={(e) => setCustomKey(e.target.value)}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  className="w-full bg-surface border border-accent/20 rounded-xl px-3 py-1.5 text-[11px] font-mono text-appText-bright focus:outline-none focus:border-accent"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleSaveCustomConfig}
                  className="px-3 py-1.5 rounded-xl bg-accent text-bg font-bold text-xs hover:bg-accent-hot transition-all shadow-sm"
                >
                  Simpan & Hubungkan
                </button>
                <button
                  type="button"
                  onClick={handleTestConnection}
                  className="px-3 py-1.5 rounded-xl bg-surface-3 text-appText-bright text-xs hover:bg-surface transition-all"
                >
                  Cek Koneksi
                </button>
              </div>

              {testResult && (
                <div
                  className={`text-[11px] p-2 rounded-lg border ${
                    testResult.ok
                      ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400'
                      : 'bg-red-500/10 border-red-500/25 text-red-400'
                  }`}
                >
                  {testResult.message}
                </div>
              )}
            </div>
          )}

          {/* Google Sign-in */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl bg-surface-2 hover:bg-surface-3 border border-accent/20 text-appText-bright text-xs font-bold flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-60 shadow-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Masuk dengan Google</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-accent/15" />
            <span className="text-[10px] uppercase tracking-wider text-appText-muted font-mono">atau email</span>
            <div className="flex-1 h-px bg-accent/15" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {authMode === 'signup' && (
              <div>
                <label className="block text-[11px] font-semibold text-appText-muted mb-1">Nama Panggilan</label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-appText-muted absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Contoh: Budi Kenji"
                    className="w-full bg-surface-2 border border-accent/20 rounded-xl pl-9 pr-3 py-2 text-xs text-appText-bright placeholder-appText-muted/50 focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-semibold text-appText-muted mb-1">Alamat Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-appText-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="kamu@email.com"
                  className="w-full bg-surface-2 border border-accent/20 rounded-xl pl-9 pr-3 py-2 text-xs text-appText-bright placeholder-appText-muted/50 focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-appText-muted mb-1">Kata Sandi</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-appText-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className="w-full bg-surface-2 border border-accent/20 rounded-xl pl-9 pr-3 py-2 text-xs text-appText-bright placeholder-appText-muted/50 focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>

            {errorMessage && (
              <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-red-400 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl bg-accent hover:bg-accent-hot text-bg font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Memproses...</span>
                </>
              ) : (
                <span>{authMode === 'signin' ? 'Masuk' : 'Daftar Sekarang'}</span>
              )}
            </button>
          </form>

          {/* Toggle between Sign In & Sign Up */}
          <div className="pt-2 text-center text-xs text-appText-muted">
            {authMode === 'signin' ? 'Belum punya akun?' : 'Sudah punya akun?'}{' '}
            <button
              type="button"
              onClick={() => {
                setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
                setErrorMessage(null);
              }}
              className="text-accent font-bold hover:underline ml-1"
            >
              {authMode === 'signin' ? 'Daftar Sekarang' : 'Masuk di Sini'}
            </button>
          </div>

          {/* Offline-first reassurance note */}
          <div className="p-3 rounded-2xl bg-surface-2/60 border border-accent/15 text-[11px] text-appText-muted leading-relaxed flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <span>
              <strong>Mode Offline & Tamu:</strong> Tanpa akun pun, seluruh catatan FSRS dan streak belajarmu tetap tersimpan 100% aman di browser perangkat ini.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
