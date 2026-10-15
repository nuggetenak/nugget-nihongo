import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  PenTool,
  Eye,
  Eraser,
  MessageSquare,
  Sparkles,
  Volume2
} from 'lucide-react';
import { MasterKanjiItem, KanjiStrokePaths, getKanjiStrokeData } from '../../lib/data/kanjiManager';
import { voiceManager } from '../../lib/audio/voiceManager';

interface KanjiStrokeModalProps {
  kanji: MasterKanjiItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAskSensei?: (char: string) => void;
}

export const KanjiStrokeModal: React.FC<KanjiStrokeModalProps> = ({
  kanji,
  isOpen,
  onClose,
  onAskSensei
}) => {
  const [strokeData, setStrokeData] = useState<KanjiStrokePaths | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'animate' | 'practice'>('animate');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showGuide, setShowGuide] = useState<boolean>(true);

  // Canvas drawing ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef<boolean>(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  // Load stroke paths when kanji changes
  useEffect(() => {
    if (!kanji || !isOpen) {
      setStrokeData(null);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setCurrentStep(0);
    setIsPlaying(false);

    getKanjiStrokeData(kanji.character)
      .then((data) => {
        if (!isMounted) return;
        setStrokeData(data);
        setLoading(false);
        if (data && data.paths.length > 0) {
          setCurrentStep(data.paths.length);
        }
      })
      .catch((err) => {
        console.warn('Failed to load stroke data:', err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [kanji, isOpen]);

  // Handle Play Animation Loop
  useEffect(() => {
    if (!isPlaying || !strokeData) return;

    if (currentStep >= strokeData.paths.length) {
      setCurrentStep(0);
    }

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= strokeData.paths.length) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 700);

    return () => clearInterval(interval);
  }, [isPlaying, strokeData, currentStep]);

  // Setup / Clear Canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    if (activeTab === 'practice') {
      clearCanvas();
    }
  }, [activeTab]);

  // Canvas Drawing Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setPointerCapture(e.pointerId);
    isDrawingRef.current = true;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    lastPointRef.current = {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const currentX = (e.clientX - rect.left) * scaleX;
    const currentY = (e.clientY - rect.top) * scaleY;

    if (lastPointRef.current) {
      ctx.beginPath();
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      ctx.lineTo(currentX, currentY);
      ctx.strokeStyle = '#D97706'; // Golden amber
      ctx.lineWidth = 14;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    }

    lastPointRef.current = { x: currentX, y: currentY };
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch (_) {}
    }
    isDrawingRef.current = false;
    lastPointRef.current = null;
  };

  if (!isOpen || !kanji) return null;

  const totalStrokes = strokeData ? strokeData.paths.length : kanji.strokes;
  const meaningsId = kanji.meanings?.id?.join(', ') || 'Arti tidak tersedia';
  const onyomiStr = kanji.readings?.onyomi?.join('、 ') || '-';
  const kunyomiStr = kanji.readings?.kunyomi?.join('、 ') || '-';

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={`Detail Kanji ${kanji.character}`}
    >
      <div
        className="w-full max-w-lg bg-surface border border-theme rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[92dvh] overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Indicator */}
        <div className="flex sm:hidden justify-center pt-2 pb-1">
          <div className="w-10 h-1 bg-muted/40 rounded-full" />
        </div>

        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-theme bg-surface-variant/40">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-black text-theme-primary font-japanese">
              {kanji.character}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-theme-primary/10 text-theme-primary border border-theme-primary/20">
                  {kanji.level}
                </span>
                <span className="text-xs text-muted font-medium">
                  {totalStrokes} Goresan
                </span>
                {kanji.grade > 0 && (
                  <span className="text-xs text-muted/70">
                    Kelas {kanji.grade}
                  </span>
                )}
              </div>
              <p className="text-sm font-semibold text-text truncate max-w-[220px] sm:max-w-xs">
                {meaningsId}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup modal"
            className="w-10 h-10 rounded-full flex items-center justify-center text-muted hover:text-text hover:bg-surface-variant transition-colors active:scale-95"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Controls: Animasi vs Latihan Tulis */}
        <div className="flex border-b border-theme px-4 sm:px-6 bg-surface">
          <button
            onClick={() => setActiveTab('animate')}
            className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 border-b-2 transition-colors ${
              activeTab === 'animate'
                ? 'border-theme-primary text-theme-primary'
                : 'border-transparent text-muted hover:text-text'
            }`}
          >
            <Play size={16} />
            Urutan Goresan
          </button>
          <button
            onClick={() => setActiveTab('practice')}
            className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 border-b-2 transition-colors ${
              activeTab === 'practice'
                ? 'border-theme-primary text-theme-primary'
                : 'border-transparent text-muted hover:text-text'
            }`}
          >
            <PenTool size={16} />
            Latihan Tulis
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* Main Display Box with Grid */}
          <div className="relative mx-auto w-64 h-64 sm:w-72 sm:h-72 rounded-2xl bg-surface-variant/30 border-2 border-theme-primary/30 flex items-center justify-center shadow-inner overflow-hidden select-none">
            {/* Traditional Grid lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none opacity-25"
              viewBox="0 0 109 109"
            >
              <line x1="54.5" y1="0" x2="54.5" y2="109" stroke="currentColor" strokeDasharray="2,2" strokeWidth="0.8" />
              <line x1="0" y1="54.5" x2="109" y2="54.5" stroke="currentColor" strokeDasharray="2,2" strokeWidth="0.8" />
              <rect x="0" y="0" width="109" height="109" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </svg>

            {loading ? (
              <div className="flex flex-col items-center gap-2 text-muted">
                <div className="w-8 h-8 border-2 border-theme-primary border-t-transparent rounded-full animate-spin" />
                <span className="text-xs">Memuat goresan...</span>
              </div>
            ) : activeTab === 'animate' ? (
              /* Stroke Vector SVG Renderer */
              strokeData && strokeData.paths.length > 0 ? (
                <svg
                  className="w-full h-full p-4"
                  viewBox="0 0 109 109"
                  style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }}
                >
                  {/* Background completed / preview strokes */}
                  {strokeData.paths.map((d, idx) => (
                    <path
                      key={`bg-${idx}`}
                      d={d}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      className="opacity-15 text-muted"
                    />
                  ))}

                  {/* Progressive strokes up to currentStep */}
                  {strokeData.paths.slice(0, currentStep).map((d, idx) => {
                    const isLatest = idx === currentStep - 1;
                    return (
                      <path
                        key={`active-${idx}`}
                        d={d}
                        fill="none"
                        stroke={isLatest ? '#F59E0B' : '#0D9488'} // Amber for newest, teal for earlier
                        strokeWidth="5"
                        className="transition-all duration-300"
                      />
                    );
                  })}
                </svg>
              ) : (
                /* Fallback big text if stroke vectors unavailable */
                <span className="text-8xl font-black font-japanese text-text">
                  {kanji.character}
                </span>
              )
            ) : (
              /* Practice Drawing Canvas */
              <div className="relative w-full h-full">
                {/* Guide background */}
                {showGuide && strokeData && strokeData.paths.length > 0 && (
                  <svg
                    className="absolute inset-0 w-full h-full p-4 pointer-events-none opacity-20"
                    viewBox="0 0 109 109"
                    style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }}
                  >
                    {strokeData.paths.map((d, idx) => (
                      <path
                        key={`guide-${idx}`}
                        d={d}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="5"
                      />
                    ))}
                  </svg>
                )}
                <canvas
                  ref={canvasRef}
                  width={288}
                  height={288}
                  className="w-full h-full cursor-crosshair touch-none"
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                />
              </div>
            )}
          </div>

          {/* Controls Bar */}
          {activeTab === 'animate' ? (
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
                  disabled={currentStep <= 0}
                  aria-label="Goresan sebelumnya"
                  className="w-11 h-11 rounded-full flex items-center justify-center border border-theme bg-surface hover:bg-surface-variant disabled:opacity-30 disabled:pointer-events-none transition-transform active:scale-95"
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  aria-label={isPlaying ? 'Jeda animasi' : 'Putar animasi'}
                  className="px-5 py-2.5 rounded-full flex items-center gap-2 font-bold text-sm bg-theme-primary text-white shadow-md hover:brightness-110 transition-transform active:scale-95"
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                  <span>{isPlaying ? 'Jeda' : 'Putar Animasi'}</span>
                </button>

                <button
                  onClick={() => {
                    setIsPlaying(false);
                    setCurrentStep((prev) => Math.min(totalStrokes, prev + 1));
                  }}
                  disabled={currentStep >= totalStrokes}
                  aria-label="Goresan berikutnya"
                  className="w-11 h-11 rounded-full flex items-center justify-center border border-theme bg-surface hover:bg-surface-variant disabled:opacity-30 disabled:pointer-events-none transition-transform active:scale-95"
                >
                  <ChevronRight size={20} />
                </button>

                <button
                  onClick={() => {
                    setIsPlaying(false);
                    setCurrentStep(totalStrokes);
                  }}
                  aria-label="Tampilkan semua goresan"
                  className="w-11 h-11 rounded-full flex items-center justify-center border border-theme bg-surface hover:bg-surface-variant transition-transform active:scale-95"
                  title="Tampilkan Lengkap"
                >
                  <RotateCcw size={18} />
                </button>
              </div>

              <span className="text-xs text-muted font-medium">
                Goresan ke-{currentStep} dari {totalStrokes}
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={clearCanvas}
                className="px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-semibold border border-theme bg-surface hover:bg-surface-variant text-text transition-transform active:scale-95"
              >
                <Eraser size={16} />
                <span>Hapus Canvas</span>
              </button>
              <button
                onClick={() => setShowGuide(!showGuide)}
                className={`px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-semibold border transition-transform active:scale-95 ${
                  showGuide
                    ? 'border-theme-primary/40 bg-theme-primary/10 text-theme-primary'
                    : 'border-theme bg-surface text-muted'
                }`}
              >
                <Eye size={16} />
                <span>{showGuide ? 'Sembunyikan Panduan' : 'Tampilkan Panduan'}</span>
              </button>
            </div>
          )}

          {/* Readings: Onyomi & Kunyomi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-surface-variant/40 border border-theme">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-muted uppercase tracking-wider">
                  Onyomi (音読み)
                </span>
                <button
                  onClick={() => voiceManager.speakText(onyomiStr)}
                  aria-label="Dengarkan Onyomi"
                  className="p-1 text-muted hover:text-theme-primary transition-colors"
                >
                  <Volume2 size={14} />
                </button>
              </div>
              <p className="text-base font-bold font-japanese text-text break-words">
                {onyomiStr}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-variant/40 border border-theme">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-muted uppercase tracking-wider">
                  Kunyomi (訓読み)
                </span>
                <button
                  onClick={() => voiceManager.speakText(kunyomiStr)}
                  aria-label="Dengarkan Kunyomi"
                  className="p-1 text-muted hover:text-theme-primary transition-colors"
                >
                  <Volume2 size={14} />
                </button>
              </div>
              <p className="text-base font-bold font-japanese text-text break-words">
                {kunyomiStr}
              </p>
            </div>
          </div>

          {/* Radikal & Mnemonic */}
          <div className="p-4 rounded-xl bg-surface-variant/20 border border-theme space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-muted uppercase tracking-wider">
                Radikal (部首)
              </span>
              <span className="text-xs font-medium text-text">
                {kanji.radical.character} ({kanji.radical.name_ja} · {kanji.radical.name_id})
              </span>
            </div>

            {kanji.mnemonic?.hint_id && (
              <div className="pt-2 border-t border-theme/60">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-500 mb-1">
                  <Sparkles size={14} />
                  <span>Jembatan Keledai (Mnemonic)</span>
                </div>
                <p className="text-xs text-muted leading-relaxed">
                  {kanji.mnemonic.hint_id}
                </p>
              </div>
            )}
          </div>

          {/* Example Compounds (Jukugo) */}
          {kanji.compounds && kanji.compounds.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-muted uppercase tracking-wider">
                Kosakata Turunan (熟語 - Jukugo)
              </span>
              <div className="divide-y divide-theme rounded-xl border border-theme bg-surface overflow-hidden">
                {kanji.compounds.map((cmp, idx) => (
                  <div
                    key={idx}
                    className="p-3 flex items-center justify-between hover:bg-surface-variant/30 transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold font-japanese text-text">
                          {cmp.word}
                        </span>
                        <span className="text-xs text-muted font-japanese">
                          【{cmp.reading}】
                        </span>
                      </div>
                      <p className="text-xs text-muted truncate">
                        {cmp.meaning_id}
                      </p>
                    </div>
                    <button
                      onClick={() => voiceManager.speakText(cmp.word)}
                      aria-label={`Dengarkan ${cmp.word}`}
                      className="p-2 text-muted hover:text-theme-primary transition-colors active:scale-95"
                    >
                      <Volume2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer: Ask Sensei */}
        <div className="p-3 sm:p-4 border-t border-theme bg-surface-variant/20 flex items-center justify-between">
          <button
            onClick={() => {
              if (onAskSensei) {
                onAskSensei(kanji.character);
              }
              onClose();
            }}
            className="flex-1 py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm font-bold bg-theme-primary/10 text-theme-primary border border-theme-primary/20 hover:bg-theme-primary/20 transition-all active:scale-95"
          >
            <MessageSquare size={16} />
            <span>🍵 Tanya Sensei tentang Kanji 「{kanji.character}」</span>
          </button>
        </div>
      </div>
    </div>
  );
};
