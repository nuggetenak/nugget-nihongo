import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { useFocusTrap } from '../../hooks/useFocusTrap';

export interface AppModalShellProps {
  isOpen: boolean;
  onClose: () => void;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  headerBadge?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  ariaLabel?: string;
  className?: string;
  bodyClassName?: string;
}

const SIZE_CLASSES = {
  sm: 'sm:max-w-md',
  md: 'sm:max-w-lg',
  lg: 'sm:max-w-2xl',
  xl: 'sm:max-w-4xl',
};

export const AppModalShell: React.FC<AppModalShellProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  size = 'lg',
  headerBadge,
  footer,
  children,
  ariaLabel,
  className = '',
  bodyClassName = '',
}) => {
  const containerRef = useFocusTrap<HTMLDivElement>(isOpen, onClose);
  useBodyScrollLock(isOpen);

  if (!isOpen) return null;
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={typeof title === 'string' ? title : ariaLabel || 'Modal Dialog'}
      className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        className={`w-full ${SIZE_CLASSES[size]} bg-surface border-t sm:border border-border rounded-t-3xl sm:rounded-2xl shadow-xl flex flex-col max-h-[90dvh] sm:max-h-[85vh] overflow-hidden ${className}`}
      >
        {/* Mobile Drag Handle */}
        <div className="pt-2.5 pb-1 sm:hidden flex justify-center shrink-0">
          <div className="w-12 h-1 rounded-full bg-border" />
        </div>

        {/* Modal Sticky Header */}
        <div className="px-5 sm:px-6 py-3.5 sm:py-4 border-b border-border flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 min-w-0 pr-2">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-display text-lg sm:text-xl font-bold text-appText-bright leading-tight truncate">
                  {title}
                </h2>
                {headerBadge}
              </div>
              {subtitle && (
                <p className="text-xs sm:text-sm text-appText-muted mt-0.5 leading-relaxed truncate">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup dialog"
            className="min-w-[44px] min-h-[44px] p-2 rounded-xl hover:bg-surface-2 text-appText-muted hover:text-appText-bright flex items-center justify-center transition-colors active:scale-95 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className={`overflow-y-auto px-5 sm:px-6 py-4 flex-1 min-w-0 ${bodyClassName}`}>
          {children}
        </div>

        {/* Optional Footer */}
        {footer && (
          <div className="px-5 sm:px-6 py-3.5 sm:py-4 border-t border-border shrink-0 pb-[max(0.875rem,env(safe-area-inset-bottom))] sm:pb-4">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};
