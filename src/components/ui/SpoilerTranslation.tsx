// ══════════════════════════════════════════════════════════════════
//  SpoilerTranslation.tsx — Interactive Spoiler / Hint Blur Box
//  Prevents users from blindly guessing Japanese sentences/answers
//  Allows peeking hints on-demand, and auto-reveals on answer submit
// ══════════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface SpoilerTranslationProps {
  text: string;
  autoReveal?: boolean;
  label?: string;
  className?: string;
}

export const SpoilerTranslation: React.FC<SpoilerTranslationProps> = ({
  text,
  autoReveal = false,
  label = 'Arti',
  className = '',
}) => {
  const [isRevealed, setIsRevealed] = useState(false);

  // When question changes or autoReveal turns false, reset reveal state
  useEffect(() => {
    setIsRevealed(false);
  }, [text]);

  const effectiveRevealed = autoReveal || isRevealed;

  return (
    <div className={`transition-all duration-200 ${className}`}>
      {effectiveRevealed ? (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-2/90 border border-accent/25 text-xs text-appText-bright animate-in fade-in duration-200 shadow-sm">
          <span className="font-semibold text-accent">{label}:</span>
          <span>{text}</span>
          {!autoReveal && (
            <button
              onClick={() => setIsRevealed(false)}
              className="ml-1 p-0.5 text-appText-muted hover:text-accent transition-colors"
              title="Samarkan kembali"
            >
              <EyeOff className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsRevealed(true)}
          className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-2/60 hover:bg-surface-2 border border-dashed border-accent/30 hover:border-accent/60 text-xs text-appText-muted hover:text-amber-300 transition-all select-none shadow-sm cursor-pointer active:scale-95"
          title="Klik untuk mengintip terjemahan kalimat (Petunjuk)"
        >
          <Eye className="w-3.5 h-3.5 text-accent opacity-75 group-hover:opacity-100 group-hover:scale-110 transition-transform" />
          <span className="font-semibold text-accent">{label}:</span>
          <span className="blur-[5px] opacity-40 group-hover:opacity-60 transition-opacity filter">
            {text}
          </span>
          <span className="text-[10px] uppercase font-bold text-accent/80 bg-amber-500/15 px-1.5 py-0.5 rounded-md ml-1 group-hover:bg-amber-500/25">
            Intip Petunjuk 👁️
          </span>
        </button>
      )}
    </div>
  );
};
