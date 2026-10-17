// ══════════════════════════════════════════════════════════════════
//  ModalErrorBoundary.tsx — Modal & Portal Crash Guard Architecture
//  Ticket T-213: Traps runtime exceptions inside dynamic portals,
//  SVG stroke animators, and IRT math engines without unmounting the app.
// ══════════════════════════════════════════════════════════════════

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { errorReporter } from '../../lib/telemetry/errorReporter';
import { diagnostics } from '../../lib/diagnostics/diagnostics';

export interface ModalErrorBoundaryProps {
  children: ReactNode;
  modalName: string;
  isOpen?: boolean;
  onClose?: () => void;
}

interface ModalErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ModalErrorBoundary extends Component<ModalErrorBoundaryProps, ModalErrorBoundaryState> {
  public state: ModalErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): Partial<ModalErrorBoundaryState> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`[ModalErrorBoundary] Crash inside modal "${this.props.modalName}":`, error, errorInfo);

    errorReporter.captureException(error, {
      modal: this.props.modalName,
      componentStack: errorInfo.componentStack,
    });

    diagnostics.addLog(
      'error',
      `[ModalErrorBoundary:${this.props.modalName}] ${error.name}: ${error.message}`,
      error.stack,
      { modal: this.props.modalName, componentStack: errorInfo.componentStack }
    );
  }

  public componentDidUpdate(prevProps: ModalErrorBoundaryProps) {
    // When the parent triggers close, auto-reset the internal error state
    if (prevProps.isOpen && !this.props.isOpen && this.state.hasError) {
      this.setState({ hasError: false, error: null });
    }
  }

  private handleClose = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  public render() {
    if (this.state.hasError) {
      // If isOpen is explicitly false, do not render anything
      if (this.props.isOpen === false) {
        return null;
      }

      return (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Galat modul ${this.props.modalName}`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
        >
          <div className="w-full max-w-sm bg-surface border border-amber-500/30 rounded-3xl p-6 shadow-2xl space-y-4 text-center">
            {/* Visual Icon */}
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6 stroke-[2.2]" />
            </div>

            {/* Content */}
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-text">
                Gagal Memuat Modul {this.props.modalName}
              </h3>
              <p className="text-xs text-text-dim leading-relaxed">
                Modul ini mengalami kendala teknis saat memproses data. Sesi belajar utamamu tetap aman dan tidak terpengaruh.
              </p>
            </div>

            {/* Error Message */}
            {this.state.error && (
              <div className="p-2.5 bg-bg/80 border border-border rounded-xl text-left overflow-x-auto text-[10px] font-mono text-red-400">
                {this.state.error.name}: {this.state.error.message}
              </div>
            )}

            {/* Action */}
            <button
              type="button"
              onClick={this.handleClose}
              className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-accent hover:bg-accent/90 text-bg font-bold text-xs flex items-center justify-center gap-2 transition-all shadow active:scale-95"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
              <span>Tutup Modul</span>
            </button>
          </div>
        </div>
      );
    }

    return (
      <React.Suspense fallback={null}>
        {this.props.children}
      </React.Suspense>
    );
  }
}
