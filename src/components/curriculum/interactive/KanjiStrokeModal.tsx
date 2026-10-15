// ══════════════════════════════════════════════════════════════════
//  KanjiStrokeModal.tsx — Interactive Kanji Stroke Animator & Canvas
//  Sequential stroke visualization & mobile touch drawing practice
// ══════════════════════════════════════════════════════════════════

import React, { useState, useRef, useEffect } from 'react';
import { Volume2, Play, RotateCcw, PenTool, CheckCircle2, Eraser, Sparkles } from 'lucide-react';
import { speakJapanese } from '../../../lib/audio/speechEngine';

export interface KanjiDetailInfo {
  kanji: string;
  onyomi?: string[];
  kunyomi?: string[];
  meanings?: string[];
  strokeCount?: number;
  radical?: string;
  grade?: string;
}

interface KanjiStrokeModalProps {
  isOpen: boolean;
  onClose: () => void;
  kanjiInfo?: KanjiDetailInfo | null;
}

export const KanjiStrokeModal: React.FC<KanjiStrokeModalProps> = ({
  isOpen,
  onClose,
  kanjiInfo,
}) => {
  const [activeTab, setActiveTab] = useState<'view' | 'draw'>('view');
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawnStrokesCount, setDrawnStrokesCount] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const character = kanjiInfo?.kanji || '日';
  const strokeCount = kanjiInfo?.strokeCount || 4;

  // Initialize or clear drawing canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw guide grid
    ctx.save();
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.15)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);

    // Cross guides
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();

    // Background watermark character for tracing
    ctx.font = '160px "Noto Sans JP", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.fillText(character, canvas.width / 2, canvas.height / 2 + 10);
    ctx.restore();

    setDrawnStrokesCount(0);
  };

  useEffect(() => {
    if (isOpen && activeTab === 'draw') {
      // Delay slightly for canvas ref mount
      const timer = setTimeout(clearCanvas, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen, activeTab, character]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = '#F59E0B'; // Amber stroke
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    setIsDrawing(true);
    canvas.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    setIsDrawing(false);
    setDrawnStrokesCount((prev) => prev + 1);
    const canvas = canvasRef.current;
    if (canvas && canvas.hasPointerCapture(e.pointerId)) {
      canvas.releasePointerCapture(e.pointerId);
    }
  };

  const handlePronounce = () => {
    speakJapanese(character, 0.9);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-surface-2 border border-accent/25 rounded-3xl p-5 sm:p-6 space-y-4 shadow-2xl max-h-[92vh] overflow-y-auto animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Latihan Kanji: ${character}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-accent/15">
          <div className="flex items-center gap-2">
            <span className="text-xl">🖌️</span>
            <div>
              <h3 className="font-extrabold text-sm text-appText-bright">
                Bedah & Latihan Goresan Kanji
              </h3>
              <span className="text-[10px] text-appText-muted">
                Karakter: <strong className="text-accent">{character}</strong> · {strokeCount} Goresan
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-3 hover:bg-surface text-appText-muted hover:text-appText-bright flex items-center justify-center text-xs font-bold active:scale-95 transition-colors"
            aria-label="Tutup"
          >
            ✕
          </button>
        </div>

        {/* Tab switcher: Info & Preview vs Latihan Menulis */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-surface rounded-xl border border-accent/15">
          <button
            type="button"
            onClick={() => setActiveTab('view')}
            className={`min-h-[40px] py-1.5 px-3 rounded-lg text-xs font-bold transition-all active:scale-95 ${
              activeTab === 'view'
                ? 'bg-accent text-bg font-extrabold shadow-sm'
                : 'text-appText-muted hover:text-appText-bright'
            }`}
          >
            Info & Bacaan
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('draw')}
            className={`min-h-[40px] py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-95 ${
              activeTab === 'draw'
                ? 'bg-accent text-bg font-extrabold shadow-sm'
                : 'text-appText-muted hover:text-appText-bright'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Latihan Menulis</span>
          </button>
        </div>

        {activeTab === 'view' ? (
          <div className="space-y-4">
            {/* Large Character Box */}
            <div className="flex flex-col items-center justify-center p-6 rounded-3xl bg-surface border border-accent/20 space-y-2 relative shadow-inner">
              <div className="font-jp text-7xl sm:text-8xl font-black text-appText-bright select-none tracking-wider">
                {character}
              </div>
              <button
                type="button"
                onClick={handlePronounce}
                className="min-h-[40px] px-4 py-1.5 rounded-full bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-accent font-bold text-xs flex items-center gap-2 active:scale-95 transition-colors"
              >
                <Volume2 className="w-4 h-4" />
                <span>Dengarkan Pelafalan</span>
              </button>
            </div>

            {/* Readings & Meanings */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-2xl bg-surface border border-accent/15 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-accent block">
                  Onyomi (音読み):
                </span>
                <div className="font-jp font-bold text-sm text-appText-bright">
                  {kanjiInfo?.onyomi?.join('、') || 'オン'}
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-surface border border-accent/15 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                  Kunyomi (訓読み):
                </span>
                <div className="font-jp font-bold text-sm text-appText-bright">
                  {kanjiInfo?.kunyomi?.join('、') || 'くん'}
                </div>
              </div>
            </div>

            {/* Meanings */}
            <div className="p-3.5 rounded-2xl bg-surface border border-accent/15 space-y-1 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-appText-muted block">
                Arti / Makna:
              </span>
              <p className="text-sm font-semibold text-appText-bright">
                {kanjiInfo?.meanings?.join(', ') || 'Matahari, hari, Jepang'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setActiveTab('draw')}
              className="w-full min-h-[44px] py-2.5 rounded-xl bg-accent text-bg font-bold text-xs shadow-md active:scale-95 flex items-center justify-center gap-2"
            >
              <PenTool className="w-4 h-4" />
              <span>Coba Tulis Kanji Ini di Kanvas</span>
            </button>
          </div>
        ) : (
          <div className="space-y-3.5">
            {/* Interactive Drawing Canvas */}
            <div className="flex flex-col items-center">
              <div className="relative rounded-3xl overflow-hidden border-2 border-amber-500/40 bg-surface shadow-inner touch-none">
                <canvas
                  ref={canvasRef}
                  width={280}
                  height={280}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  className="cursor-crosshair block"
                />
              </div>
              <span className="text-[11px] text-appText-muted mt-2">
                Goreskan jari atau stylus mengikuti bayangan kanji di atas
              </span>
            </div>

            {/* Canvas Actions */}
            <div className="flex items-center justify-between gap-2 pt-1">
              <div className="text-xs font-mono text-appText-muted">
                Goresan: <strong className="text-accent">{drawnStrokesCount}</strong> / {strokeCount}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={clearCanvas}
                  className="min-h-[40px] px-3.5 py-1.5 rounded-xl bg-surface-3 hover:bg-surface border border-accent/20 text-xs font-bold text-appText flex items-center gap-1.5 active:scale-95"
                >
                  <Eraser className="w-3.5 h-3.5 text-accent" />
                  <span>Hapus</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="min-h-[40px] px-4 py-1.5 rounded-xl bg-accent text-bg text-xs font-bold shadow-sm active:scale-95 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Selesai</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
