import React from 'react';
import { useAppStore } from '../../store/useAppStore';

export const Toast: React.FC = () => {
  const { toast } = useAppStore();

  if (!toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed z-[70] pointer-events-none transition-all duration-300 ease-out
        bottom-[calc(64px+1rem+env(safe-area-inset-bottom))] lg:bottom-8
        left-1/2 -translate-x-1/2 lg:left-[calc(50%+130px)]
        max-w-[calc(100vw-2rem)]
        flex items-center gap-2.5 px-5 py-3 rounded-full
        bg-[#1A150F]/95 border border-amber-500/40 text-appText-bright text-xs sm:text-sm font-semibold
        shadow-[0_12px_32px_rgba(0,0,0,0.5),0_0_24px_rgba(245,158,11,0.25)]
        backdrop-blur-xl animate-fade-in"
    >
      <span className="text-base leading-none shrink-0">{toast.icon || '🍙'}</span>
      <span className="truncate">{toast.text}</span>
    </div>
  );
};
