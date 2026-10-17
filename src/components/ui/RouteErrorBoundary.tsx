// ══════════════════════════════════════════════════════════════════
//  RouteErrorBoundary.tsx — Route-Level View Crash Isolation (Ticket T-212)
//  Prevents a rendering crash in any secondary route or stage (LessonStudyPage,
//  QuizPage, Choukai) from crashing the global navigation or root DOM tree.
// ══════════════════════════════════════════════════════════════════

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw, Home, ChevronDown, ChevronUp } from 'lucide-react';
import { errorReporter } from '../../lib/telemetry/errorReporter';
import { diagnostics } from '../../lib/diagnostics/diagnostics';

export interface RouteErrorBoundaryProps {
  children: ReactNode;
  currentTab: string;
  onResetToHome?: () => void;
}

interface RouteErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  isDetailsOpen: boolean;
}

export class RouteErrorBoundary extends Component<RouteErrorBoundaryProps, RouteErrorBoundaryState> {
  public state: RouteErrorBoundaryState = {
    hasError: false,
    error: null,
    errorInfo: null,
    isDetailsOpen: false,
  };

  public static getDerivedStateFromError(error: Error): Partial<RouteErrorBoundaryState> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`[RouteErrorBoundary] Crash in tab "${this.props.currentTab}":`, error, errorInfo);

    errorReporter.captureException(error, {
      route: this.props.currentTab,
      componentStack: errorInfo.componentStack,
    });

    diagnostics.addLog(
      'error',
      `[RouteErrorBoundary:${this.props.currentTab}] ${error.name}: ${error.message}`,
      error.stack,
      { route: this.props.currentTab, componentStack: errorInfo.componentStack }
    );

    this.setState({ errorInfo });
  }

  public componentDidUpdate(prevProps: RouteErrorBoundaryProps) {
    // Automatically clear route-level error state when the user switches tabs via Header, Sidebar, or BottomNav
    if (prevProps.currentTab !== this.props.currentTab && this.state.hasError) {
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
        isDetailsOpen: false,
      });
    }
  }

  private handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      isDetailsOpen: false,
    });
  };

  private handleGoHome = () => {
    if (this.props.onResetToHome) {
      this.props.onResetToHome();
    } else {
      window.location.hash = '#home';
    }
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      isDetailsOpen: false,
    });
  };

  public render() {
    if (this.state.hasError) {
      const { error, errorInfo, isDetailsOpen } = this.state;
      const tabName = this.props.currentTab.toUpperCase();

      return (
        <div
          role="alert"
          aria-live="assertive"
          className="w-full my-8 px-4 sm:px-6 py-8 bg-surface border border-red-500/30 rounded-3xl shadow-xl text-center space-y-6 max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Badge Icon */}
          <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto shadow-inner">
            <AlertCircle className="w-7 h-7 stroke-[2.2]" />
          </div>

          {/* Heading & Context */}
          <div className="space-y-2">
            <div className="text-[11px] font-mono font-bold tracking-wider uppercase text-amber-500 dark:text-amber-400">
              Modul Tampilan Terisolasi ({tabName})
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-text">
              Gagal Memuat Tampilan Ini 🍵
            </h2>
            <p className="text-xs sm:text-sm text-text-dim max-w-md mx-auto leading-relaxed">
              Terjadi kendala saat memproses tampilan atau materi ini. Navigasi utama tetap aktif dan data belajarmu aman.
            </p>
          </div>

          {/* Collapsible Error Trace */}
          <div className="border border-border rounded-2xl overflow-hidden bg-bg/80 text-left">
            <button
              type="button"
              onClick={() => this.setState({ isDetailsOpen: !isDetailsOpen })}
              className="w-full min-h-[44px] px-4 py-2.5 flex items-center justify-between text-xs text-text-dim hover:text-text hover:bg-surface-2/40 transition-colors"
              aria-expanded={isDetailsOpen}
            >
              <span className="font-mono font-semibold">Rincian Galat Teknis</span>
              {isDetailsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {isDetailsOpen && (
              <div className="p-3 border-t border-border text-[11px] font-mono text-red-400 max-h-40 overflow-y-auto space-y-1 scrollbar-none select-text">
                <div className="font-bold">
                  {error?.name || 'Error'}: {error?.message || 'Unknown runtime error'}
                </div>
                {error?.stack && (
                  <pre className="text-[10px] text-text-dim whitespace-pre-wrap leading-tight mt-1">
                    {error.stack.split('\n').slice(0, 4).join('\n')}
                  </pre>
                )}
                {errorInfo?.componentStack && (
                  <pre className="text-[9px] text-stone-500 whitespace-pre-wrap mt-1">
                    {errorInfo.componentStack.split('\n').slice(0, 4).join('\n')}
                  </pre>
                )}
              </div>
            )}
          </div>

          {/* Recovery Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={this.handleRetry}
              className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-2xl bg-accent hover:bg-accent/90 text-bg font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
            >
              <RefreshCw className="w-4 h-4 stroke-[2.2]" />
              <span>Coba Muat Ulang Tampilan</span>
            </button>

            <button
              type="button"
              onClick={this.handleGoHome}
              className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-2xl bg-surface-2 hover:bg-surface-3 text-text font-bold text-xs flex items-center justify-center gap-2 transition-all border border-border active:scale-95"
            >
              <Home className="w-4 h-4" />
              <span>Kembali ke Beranda</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
