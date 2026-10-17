// ══════════════════════════════════════════════════════════════════
//  ErrorBoundary.tsx — Production React 18 Crash Protection & Recovery
//  Ticket T-211: Root Global ErrorBoundary with Emergency Data Dump & Recovery UI
//  Provides 5 Recovery Actions: Reload, Reset to Home, Emergency JSON Export,
//  Volatile Cache Flush, and Diagnostic Report Copying.
// ══════════════════════════════════════════════════════════════════

import React, { Component, ErrorInfo, ReactNode } from 'react';
import {
  ShieldAlert,
  RefreshCw,
  Home,
  Download,
  Trash2,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { errorReporter } from '../../lib/telemetry/errorReporter';
import { diagnostics } from '../../lib/diagnostics/diagnostics';
import {
  emergencyExportAllLocalStorage,
  emergencyResetVolatileCache,
} from '../../lib/storage/storageSanitizer';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorTimestamp: string;
  isDetailsOpen: boolean;
  isCopied: boolean;
  cacheResetStatus: string | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
    errorTimestamp: '',
    isDetailsOpen: false,
    isCopied: false,
    cacheResetStatus: null,
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
      errorTimestamp: new Date().toISOString(),
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[RootErrorBoundary] Uncaught React exception:', error, errorInfo);

    // Record to telemetry and privacy-preserving error reporter
    errorReporter.captureException(error, {
      componentStack: errorInfo.componentStack,
    });

    // Record to diagnostic in-memory ring buffer
    diagnostics.addLog(
      'error',
      `[RootErrorBoundary] ${error.name}: ${error.message}`,
      error.stack,
      { componentStack: errorInfo.componentStack }
    );

    this.setState({ errorInfo });
  }

  private handleReload = () => {
    if (this.props.onReset) {
      this.props.onReset();
      this.setState({ hasError: false, error: null, errorInfo: null, cacheResetStatus: null });
    } else {
      window.location.reload();
    }
  };

  private handleGoHome = () => {
    try {
      window.location.hash = '#home';
    } catch {}
    if (this.props.onReset) {
      this.props.onReset();
    }
    this.setState({ hasError: false, error: null, errorInfo: null, cacheResetStatus: null });
    // In case the crash was catastrophic, fall back to reload if DOM doesn't re-mount
    setTimeout(() => {
      if (this.state.hasError) {
        window.location.reload();
      }
    }, 50);
  };

  private handleExportBackup = () => {
    try {
      const { filename, jsonString } = emergencyExportAllLocalStorage();
      const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      diagnostics.addLog('storage', `Emergency backup downloaded: ${filename}`);
    } catch (err) {
      console.error('[RootErrorBoundary] Failed to export emergency backup:', err);
      alert('Gagal mengekspor data cadangan otomatis. Silakan salin log diagnostik.');
    }
  };

  private handleResetVolatileCache = () => {
    try {
      const { clearedCount, preservedCount } = emergencyResetVolatileCache();
      this.setState({
        cacheResetStatus: `Berhasil membersihkan ${clearedCount} berkas cache. ${preservedCount} data kartu belajar & progres FSRS tetap aman terjaga.`,
      });
    } catch (err) {
      console.error('[RootErrorBoundary] Failed to reset cache:', err);
      this.setState({ cacheResetStatus: 'Gagal membersihkan cache lokal.' });
    }
  };

  private handleCopyDiagnostics = async () => {
    try {
      const report = diagnostics.getReportString();
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(report);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = report;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      this.setState({ isCopied: true });
      setTimeout(() => this.setState({ isCopied: false }), 3000);
    } catch (err) {
      console.error('[RootErrorBoundary] Failed to copy diagnostics:', err);
    }
  };

  public render() {
    if (this.state.hasError) {
      const { error, errorInfo, errorTimestamp, isDetailsOpen, isCopied, cacheResetStatus } = this.state;

      return (
        <div
          role="alert"
          aria-live="assertive"
          className="min-h-screen bg-stone-950 text-stone-100 flex items-center justify-center p-4 sm:p-6 antialiased selection:bg-amber-500/30 selection:text-white"
        >
          <div className="w-full max-w-lg bg-stone-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-center animate-in fade-in zoom-in-95 duration-200">
            {/* Visual Icon Badge */}
            <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto shadow-inner">
              <ShieldAlert className="w-8 h-8 stroke-[2.2]" />
            </div>

            {/* Error Message & Title */}
            <div className="space-y-2">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                システムエラー / Kendala Teknis
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-stone-100 leading-tight">
                {this.props.fallbackTitle || 'Waduh, terjadi kendala teknis tak terduga 🍵'}
              </h1>
              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-md mx-auto">
                Aplikasi mengalami galat saat memproses antarmuka. Tenang, kartu belajar dan progresmu tetap aman tersimpan di perangkat lokalmu.
              </p>
            </div>

            {/* Cache Reset Feedback Toast */}
            {cacheResetStatus && (
              <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 rounded-2xl text-xs text-emerald-300 font-medium animate-in fade-in">
                {cacheResetStatus}
              </div>
            )}

            {/* Collapsible Technical Details */}
            <div className="border border-stone-800 rounded-2xl overflow-hidden bg-stone-950/70 text-left">
              <button
                type="button"
                onClick={() => this.setState({ isDetailsOpen: !isDetailsOpen })}
                className="w-full min-h-[44px] px-4 py-2.5 flex items-center justify-between text-xs text-stone-400 hover:text-stone-200 hover:bg-stone-900/50 transition-colors"
                aria-expanded={isDetailsOpen}
              >
                <span className="font-mono font-semibold">Detail Teknis (Forensik)</span>
                {isDetailsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {isDetailsOpen && (
                <div className="p-3 border-t border-stone-800 text-[11px] font-mono text-red-400 max-h-48 overflow-y-auto space-y-1 scrollbar-none select-text">
                  <div className="text-stone-500">Waktu: {errorTimestamp || 'N/A'}</div>
                  <div className="font-bold text-red-300">
                    {error?.name || 'Error'}: {error?.message || 'Unknown error occurred'}
                  </div>
                  {error?.stack && (
                    <pre className="text-[10px] text-stone-400 whitespace-pre-wrap leading-tight mt-1 font-mono">
                      {error.stack}
                    </pre>
                  )}
                  {errorInfo?.componentStack && (
                    <div className="mt-2 text-[10px] text-stone-500">
                      <span className="font-bold text-stone-400">Component Hierarchy:</span>
                      <pre className="whitespace-pre-wrap">{errorInfo.componentStack}</pre>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Primary & Secondary Action Controls */}
            <div className="space-y-2 pt-2">
              {/* Action 1: Muat Ulang Aplikasi */}
              <button
                type="button"
                onClick={this.handleReload}
                className="w-full min-h-[48px] py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95"
              >
                <RefreshCw className="w-4 h-4 stroke-[2.5]" />
                <span>Muat Ulang Halaman / Aplikasi</span>
              </button>

              {/* Action 2: Kembali ke Beranda */}
              <button
                type="button"
                onClick={this.handleGoHome}
                className="w-full min-h-[44px] py-2.5 px-4 rounded-2xl bg-stone-800 hover:bg-stone-750 text-stone-200 font-bold text-xs flex items-center justify-center gap-2 transition-all border border-stone-700/60 active:scale-95"
              >
                <Home className="w-4 h-4" />
                <span>Kembali ke Beranda Utama</span>
              </button>

              {/* Grid of Emergency Diagnostic Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                {/* Action 3: Ekspor Cadangan Darurat */}
                <button
                  type="button"
                  onClick={this.handleExportBackup}
                  title="Unduh cadangan data belajar JSON ke perangkatmu"
                  className="w-full min-h-[44px] py-2.5 px-3 rounded-2xl bg-stone-850 hover:bg-stone-800 text-stone-300 hover:text-amber-300 font-medium text-[11px] flex items-center justify-center gap-1.5 transition-all border border-stone-800 active:scale-95"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Cadangan Data</span>
                </button>

                {/* Action 4: Reset Darurat Cache Lokal */}
                <button
                  type="button"
                  onClick={this.handleResetVolatileCache}
                  title="Bersihkan cache tampilan tanpa menghapus kartu belajar"
                  className="w-full min-h-[44px] py-2.5 px-3 rounded-2xl bg-stone-850 hover:bg-stone-800 text-stone-300 hover:text-amber-300 font-medium text-[11px] flex items-center justify-center gap-1.5 transition-all border border-stone-800 active:scale-95"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Bersihkan Cache</span>
                </button>

                {/* Action 5: Salin Log Diagnostik */}
                <button
                  type="button"
                  onClick={this.handleCopyDiagnostics}
                  title="Salin rincian teknis untuk laporan kendala"
                  className="w-full min-h-[44px] py-2.5 px-3 rounded-2xl bg-stone-850 hover:bg-stone-800 text-stone-300 hover:text-amber-300 font-medium text-[11px] flex items-center justify-center gap-1.5 transition-all border border-stone-800 active:scale-95"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Tersalin!' : 'Salin Log'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
