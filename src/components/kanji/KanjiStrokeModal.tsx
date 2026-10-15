import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  Volume2,
  CheckCircle2,
  Undo2,
  Award,
  Zap,
} from 'lucide-react';
import { MasterKanjiItem, KanjiStrokePaths, getKanjiStrokeData } from '../../lib/data/kanjiManager';
import { voiceManager } from '../../lib/audio/voiceManager';
import { playBrushSfx, playSuccessSfx, playErrorSfx, playFanfareSfx } from '../../lib/audio/sfx';

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
  onAskSensei,
}) => {
  const [strokeData, setStrokeData] = useState<KanjiStrokePaths | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'animate' | 'practice'>('animate');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1); // 0.75, 1, 1.5
  const [showGuide, setShowGuide] = useState<boolean>(true);
  const [showNumbers, setShowNumbers] = useState<boolean>(true);

  // Practice state
  const [practiceStep, setPracticeStep] = useState<number>(0);
  const [isPracticeComplete, setIsPracticeComplete] = useState<boolean>(false);
  const [practiceHint, setPracticeHint] = useState<string>('');
  const [wobble, setWobble] = useState<boolean>(false);

  // Canvas drawing ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef<boolean>(false);
  const currentPathUserPoints = useRef<Array<{ x: number; y: number }>>([]);
  const furthestReachedIdxRef = useRef<number>(0);

  // Hidden SVG path to calculate geometry & sample points
  const hiddenPathRef = useRef<SVGPathElement | null>(null);
  const samplePointsRef = useRef<Array<{ x: number; y: number }>>([]);

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
    setPracticeStep(0);
    setIsPracticeComplete(false);
    setPracticeHint('');

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

  const totalStrokes = strokeData ? strokeData.paths.length : (kanji?.strokes || 1);

  // Parse start coordinates from SVG paths for stroke numbers & guide points
  const strokeOrigins = useMemo(() => {
    if (!strokeData || !strokeData.paths) return [];
    return strokeData.paths.map((p) => {
      const match = p.match(/^[Mm]\s*([-\d.]+)[,\s]+([-\d.]+)/);
      if (match) {
        return { x: parseFloat(match[1]), y: parseFloat(match[2]) };
      }
      return { x: 54.5, y: 54.5 };
    });
  }, [strokeData]);

  // Update sample points whenever practiceStep changes
  useEffect(() => {
    if (activeTab !== 'practice' || !strokeData || !strokeData.paths[practiceStep]) {
      samplePointsRef.current = [];
      return;
    }

    const pathEl = hiddenPathRef.current;
    if (!pathEl) return;

    try {
      const totalLen = pathEl.getTotalLength();
      const points: Array<{ x: number; y: number }> = [];
      const SAMPLES = 24;
      for (let i = 0; i <= SAMPLES; i++) {
        const pt = pathEl.getPointAtLength((i / SAMPLES) * totalLen);
        points.push({ x: pt.x, y: pt.y });
      }
      samplePointsRef.current = points;
      furthestReachedIdxRef.current = 0;
      setPracticeHint(`Goresan ke-${practiceStep + 1}: Sentuh titik emas untuk memulai.`);
    } catch (_) {
      samplePointsRef.current = [];
    }
  }, [activeTab, practiceStep, strokeData]);

  // Handle Play Animation Loop
  useEffect(() => {
    if (!isPlaying || !strokeData) return;

    if (currentStep >= strokeData.paths.length) {
      setCurrentStep(0);
    }

    const delay = Math.round(1350 / playbackSpeed);
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= strokeData.paths.length) {
          setIsPlaying(false);
          return prev;
        }
        playBrushSfx();
        return prev + 1;
      });
    }, delay);

    return () => clearInterval(interval);
  }, [isPlaying, strokeData, currentStep, playbackSpeed]);

  // Clear Canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleResetPractice = () => {
    setPracticeStep(0);
    setIsPracticeComplete(false);
    clearCanvas();
    setPracticeHint('Mulai dari goresan pertama pada titik emas pemandu.');
  };

  const handleUndoPracticeStroke = () => {
    if (practiceStep > 0) {
      setPracticeStep((prev) => prev - 1);
      setIsPracticeComplete(false);
      clearCanvas();
      setPracticeHint(`Kembali ke goresan ke-${practiceStep}.`);
    }
  };

  useEffect(() => {
    if (activeTab === 'practice') {
      clearCanvas();
      if (practiceStep === 0) {
        setPracticeHint('Sentuh titik emas pemandu untuk memulai goresan pertama.');
      }
    }
  }, [activeTab]);

  // Pointer event handlers with Intelligent Touch Drift Detection
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isPracticeComplete || !strokeData || practiceStep >= strokeData.paths.length) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * 109;
    const svgY = ((e.clientY - rect.top) / rect.height) * 109;

    const samples = samplePointsRef.current;
    if (samples.length === 0) return;

    const startPt = samples[0];
    const distFromStart = Math.hypot(svgX - startPt.x, svgY - startPt.y);

    // Start tolerance: 14 units in 109x109 viewBox (~36px on a 288px canvas)
    if (distFromStart > 14) {
      // Wrong start location
      setPracticeHint(`Mulai dari titik awal goresan ke-${practiceStep + 1} (lingkaran kuning).`);
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(30);
      }
      return;
    }

    try {
      canvas.setPointerCapture(e.pointerId);
    } catch (_) {}

    isDrawingRef.current = true;
    furthestReachedIdxRef.current = 0;
    currentPathUserPoints.current = [{ x: svgX, y: svgY }];

    // Draw initial ink dab on canvas
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const scale = canvas.width / 109;
      ctx.beginPath();
      ctx.arc(svgX * scale, svgY * scale, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#F59E0B';
      ctx.fill();
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * 109;
    const svgY = ((e.clientY - rect.top) / rect.height) * 109;

    const samples = samplePointsRef.current;
    if (samples.length === 0) return;

    // Check corridor distance to the active segment of sample points
    const currentIdx = furthestReachedIdxRef.current;
    const lookAheadEnd = Math.min(samples.length - 1, currentIdx + 5);

    let minDist = Infinity;
    let closestIdx = currentIdx;

    for (let i = Math.max(0, currentIdx - 2); i <= lookAheadEnd; i++) {
      const d = Math.hypot(svgX - samples[i].x, svgY - samples[i].y);
      if (d < minDist) {
        minDist = d;
        closestIdx = i;
      }
    }

    // Corridor drift threshold: 16 units in 109 viewBox (~42px)
    if (minDist > 16) {
      // DRIFT DETECTED: Shake canvas & reset this attempt
      isDrawingRef.current = false;
      currentPathUserPoints.current = [];
      clearCanvas();
      playErrorSfx();
      setWobble(true);
      setTimeout(() => setWobble(false), 400);
      setPracticeHint('Goresan terlalu melenceng dari jalur. Yuk ulangi goresan ini!');
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(50);
      }
      return;
    }

    // Advance progress if moving forward
    if (closestIdx > furthestReachedIdxRef.current) {
      furthestReachedIdxRef.current = closestIdx;
    }

    // Draw smooth line segment on canvas
    const pts = currentPathUserPoints.current;
    const lastPt = pts[pts.length - 1];
    pts.push({ x: svgX, y: svgY });

    const ctx = canvas.getContext('2d');
    if (ctx && lastPt) {
      const scale = canvas.width / 109;
      ctx.beginPath();
      ctx.moveTo(lastPt.x * scale, lastPt.y * scale);
      ctx.lineTo(svgX * scale, svgY * scale);
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 10;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch (_) {}
    }

    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;

    const samples = samplePointsRef.current;
    if (samples.length === 0) return;

    const progressRatio = furthestReachedIdxRef.current / (samples.length - 1);
    const lastUserPt = currentPathUserPoints.current[currentPathUserPoints.current.length - 1];
    const endPt = samples[samples.length - 1];
    const distToEnd = lastUserPt ? Math.hypot(lastUserPt.x - endPt.x, lastUserPt.y - endPt.y) : Infinity;

    // Stroke successful if >= 70% completed and ended reasonably close to endpoint
    if (progressRatio >= 0.7 && distToEnd <= 16) {
      playBrushSfx();
      clearCanvas(); // Vector overlay takes over with perfect gold SVG!

      const nextStep = practiceStep + 1;
      if (nextStep >= totalStrokes) {
        setIsPracticeComplete(true);
        setPracticeStep(totalStrokes);
        playSuccessSfx();
        playFanfareSfx();
        setPracticeHint('Sempurna! Kamu berhasil menulis seluruh goresan dengan tepat! 🌸');
      } else {
        setPracticeStep(nextStep);
        playSuccessSfx();
        setPracticeHint(`Hebat! Lanjut ke goresan ke-${nextStep + 1}.`);
      }
    } else {
      // Incomplete stroke
      clearCanvas();
      setPracticeHint('Goresan belum tuntas sampai ujung. Coba tarik garis sampai lingkaran akhir!');
    }

    currentPathUserPoints.current = [];
  };

  if (!isOpen || !kanji) return null;

  const meaningsId = kanji.meanings?.id?.join(', ') || 'Arti tidak tersedia';
  const onyomiStr = kanji.readings?.onyomi?.join('、 ') || '-';
  const kunyomiStr = kanji.readings?.kunyomi?.join('、 ') || '-';

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-md p-0 sm:p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={`Detail Kanji ${kanji.character}`}
    >
      {/* Hidden reference path to extract stroke geometry */}
      {strokeData && strokeData.paths[practiceStep] && (
        <svg className="absolute w-0 h-0 overflow-hidden pointer-events-none" viewBox="0 0 109 109">
          <path ref={hiddenPathRef} d={strokeData.paths[practiceStep]} />
        </svg>
      )}

      <div
        className="w-full max-w-lg bg-surface border border-theme rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[92dvh] overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Indicator */}
        <div className="flex sm:hidden justify-center pt-2.5 pb-1">
          <div className="w-10 h-1 bg-muted/30 rounded-full" />
        </div>

        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-theme bg-surface-2/40">
          <div className="flex items-center gap-3">
            <span className="text-3xl sm:text-4xl font-black text-accent font-japanese leading-none">
              {kanji.character}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-500/15 text-accent border border-amber-500/25">
                  {kanji.level}
                </span>
                <span className="text-xs text-appText-muted font-medium">
                  {totalStrokes} Goresan
                </span>
                {kanji.grade > 0 && (
                  <span className="text-xs text-appText-muted/70">
                    Kelas {kanji.grade}
                  </span>
                )}
              </div>
              <p className="text-sm font-semibold text-appText-bright truncate max-w-[220px] sm:max-w-xs mt-0.5">
                {meaningsId}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup modal"
            className="w-10 h-10 rounded-full flex items-center justify-center text-appText-muted hover:text-appText-bright hover:bg-surface-2 transition-colors active:scale-95"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Controls: Progressive Animator vs Intelligent Touch Drift Practice */}
        <div className="flex border-b border-theme px-4 sm:px-6 bg-surface">
          <button
            onClick={() => setActiveTab('animate')}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border-b-2 transition-colors ${
              activeTab === 'animate'
                ? 'border-accent text-accent font-black'
                : 'border-transparent text-appText-muted hover:text-appText-bright'
            }`}
          >
            <Play size={16} />
            <span>Animasi Goresan</span>
          </button>
          <button
            onClick={() => setActiveTab('practice')}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border-b-2 transition-colors ${
              activeTab === 'practice'
                ? 'border-accent text-accent font-black'
                : 'border-transparent text-appText-muted hover:text-appText-bright'
            }`}
          >
            <PenTool size={16} />
            <span>Latihan Tulis Mandiri</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {/* Main Visual Stage with Traditional Calligraphy Grid */}
          <div
            className={`relative mx-auto w-64 h-64 sm:w-72 sm:h-72 rounded-2xl bg-surface-2/60 border border-theme flex items-center justify-center shadow-inner overflow-hidden select-none transition-transform ${
              wobble ? 'animate-soft-shake border-red-500' : ''
            }`}
          >
            {/* Traditional Sumi Crosshair Grid lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
              viewBox="0 0 109 109"
            >
              <line x1="54.5" y1="0" x2="54.5" y2="109" stroke="currentColor" strokeDasharray="2,2" strokeWidth="0.8" />
              <line x1="0" y1="54.5" x2="109" y2="54.5" stroke="currentColor" strokeDasharray="2,2" strokeWidth="0.8" />
              <line x1="0" y1="0" x2="109" y2="109" stroke="currentColor" strokeDasharray="3,3" strokeWidth="0.5" />
              <line x1="109" y1="0" x2="0" y2="109" stroke="currentColor" strokeDasharray="3,3" strokeWidth="0.5" />
              <rect x="0" y="0" width="109" height="109" fill="none" stroke="currentColor" strokeWidth="0.6" />
            </svg>

            {loading ? (
              <div className="flex flex-col items-center gap-2 text-appText-muted">
                <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                <span className="text-xs">Memuat goresan kanji...</span>
              </div>
            ) : activeTab === 'animate' ? (
              /* TAB 1: True Progressive Stroke Order Animation */
              strokeData && strokeData.paths.length > 0 ? (
                <div className="relative w-full h-full">
                  <svg
                    className="w-full h-full p-4"
                    viewBox="0 0 109 109"
                    style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }}
                  >
                    {/* Ghost background paths */}
                    {strokeData.paths.map((d, idx) => (
                      <path
                        key={`ghost-${idx}`}
                        d={d}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="opacity-15 text-appText-muted"
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
                          stroke={isLatest ? '#F59E0B' : '#D97706'}
                          strokeWidth={isLatest ? '5.5' : '4.5'}
                          pathLength="1000"
                          strokeDasharray="1000"
                          strokeDashoffset={isLatest ? "1000" : "0"}
                          className={isLatest ? 'animate-draw-stroke' : ''}
                          style={{
                            animationDuration: isLatest ? `${Math.round(1200 / playbackSpeed)}ms` : undefined,
                          }}
                        />
                      );
                    })}

                    {/* Number badges at stroke origins */}
                    {showNumbers &&
                      strokeOrigins.slice(0, Math.max(1, currentStep)).map((pt, idx) => {
                        const isCurrent = idx === currentStep - 1;
                        return (
                          <g key={`num-${idx}`} className="select-none pointer-events-none">
                            <circle
                              cx={pt.x}
                              cy={pt.y}
                              r="3.4"
                              fill={isCurrent ? '#F59E0B' : 'rgba(26, 24, 22, 0.85)'}
                              stroke="#F5EFE6"
                              strokeWidth="0.6"
                            />
                            <text
                              x={pt.x}
                              y={pt.y + 1.2}
                              fontSize="2.8"
                              fontWeight="bold"
                              textAnchor="middle"
                              fill={isCurrent ? '#121110' : '#F5EFE6'}
                            >
                              {idx + 1}
                            </text>
                          </g>
                        );
                      })}
                  </svg>
                </div>
              ) : (
                <span className="text-8xl font-black font-japanese text-text">
                  {kanji.character}
                </span>
              )
            ) : (
              /* TAB 2: Intelligent Touch Drift Practice Stage */
              <div className="relative w-full h-full">
                {/* Visual guide vector layer */}
                <svg
                  className="absolute inset-0 w-full h-full p-4 pointer-events-none"
                  viewBox="0 0 109 109"
                  style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }}
                >
                  {/* Faint ghost guide of unwritten strokes if enabled */}
                  {showGuide &&
                    strokeData?.paths.slice(practiceStep).map((d, idx) => (
                      <path
                        key={`unwritten-${idx}`}
                        d={d}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeDasharray="2,2"
                        className="opacity-15 text-muted"
                      />
                    ))}

                  {/* Perfectly snapped completed strokes in Golden Vector */}
                  {strokeData?.paths.slice(0, practiceStep).map((d, idx) => (
                    <path
                      key={`completed-${idx}`}
                      d={d}
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="5"
                    />
                  ))}

                  {/* Pulsing Guide Ring for current stroke start point */}
                  {!isPracticeComplete && strokeOrigins[practiceStep] && (
                    <g className="animate-guide-ring">
                      <circle
                        cx={strokeOrigins[practiceStep].x}
                        cy={strokeOrigins[practiceStep].y}
                        r="5.5"
                        fill="none"
                        stroke="#F59E0B"
                        strokeWidth="1.2"
                      />
                      <circle
                        cx={strokeOrigins[practiceStep].x}
                        cy={strokeOrigins[practiceStep].y}
                        r="2.5"
                        fill="#F59E0B"
                      />
                    </g>
                  )}
                </svg>

                {/* Interactive Drawing Canvas */}
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

                {/* Completion Overlay Banner */}
                {isPracticeComplete && (
                  <div className="absolute inset-0 bg-surface/85 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center animate-fade-in">
                    <div className="w-12 h-12 rounded-full bg-amber-500/20 text-accent flex items-center justify-center mb-2">
                      <CheckCircle2 size={28} />
                    </div>
                    <span className="text-base font-black text-accent">
                      Latihan Tuntas!
                    </span>
                    <p className="text-xs text-appText-muted mt-1 max-w-[200px]">
                      Kamu berhasil menulis seluruh goresan kanji 「{kanji.character}」 dengan urutan yang tepat!
                    </p>
                    <button
                      onClick={handleResetPractice}
                      className="mt-3 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-black text-xs active:scale-95 transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      <RotateCcw size={14} />
                      <span>Ulangi Latihan</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Controls Bar */}
          {activeTab === 'animate' ? (
            <div className="flex flex-col items-center gap-2.5">
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
                  disabled={currentStep <= 0}
                  aria-label="Goresan sebelumnya"
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-theme bg-surface hover:bg-surface-2 disabled:opacity-30 disabled:pointer-events-none transition-transform active:scale-95"
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  aria-label={isPlaying ? 'Jeda animasi' : 'Putar animasi'}
                  className="px-5 py-2.5 rounded-full flex items-center gap-2 font-black text-xs sm:text-sm bg-amber-500 hover:bg-amber-600 text-stone-950 shadow-md transition-transform active:scale-95"
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  <span>{isPlaying ? 'Jeda' : 'Putar Animasi'}</span>
                </button>

                <button
                  onClick={() => {
                    setIsPlaying(false);
                    setCurrentStep((prev) => Math.min(totalStrokes, prev + 1));
                    playBrushSfx();
                  }}
                  disabled={currentStep >= totalStrokes}
                  aria-label="Goresan berikutnya"
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-theme bg-surface hover:bg-surface-2 disabled:opacity-30 disabled:pointer-events-none transition-transform active:scale-95"
                >
                  <ChevronRight size={18} />
                </button>

                <button
                  onClick={() => {
                    setIsPlaying(false);
                    setCurrentStep(totalStrokes);
                  }}
                  aria-label="Tampilkan semua goresan"
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-theme bg-surface hover:bg-surface-2 transition-transform active:scale-95"
                  title="Tampilkan Seluruh Goresan"
                >
                  <RotateCcw size={16} />
                </button>
              </div>

              {/* Secondary Speed & Number Toggles */}
              <div className="flex items-center justify-between w-full max-w-xs text-xs text-appText-muted pt-1">
                <div className="flex items-center gap-1">
                  <span className="text-[11px] font-medium mr-1">Kecepatan:</span>
                  {[0.75, 1, 1.5].map((spd) => (
                    <button
                      key={spd}
                      onClick={() => setPlaybackSpeed(spd)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                        playbackSpeed === spd
                          ? 'bg-amber-500/20 text-accent border border-amber-500/30 font-black'
                          : 'bg-surface-2 text-appText-muted hover:text-appText-bright'
                      }`}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setShowNumbers(!showNumbers)}
                  className={`text-[11px] font-semibold underline underline-offset-2 ${
                    showNumbers ? 'text-accent' : 'text-appText-muted'
                  }`}
                >
                  {showNumbers ? 'Sembunyikan Nomor' : 'Tampilkan Nomor'}
                </button>
              </div>

              <span className="text-xs text-appText-muted font-medium">
                Goresan ke-{currentStep} dari {totalStrokes}
              </span>
            </div>
          ) : (
            /* Practice Controls */
            <div className="space-y-2.5">
              {/* Practice Guidance Alert Bar */}
              <div className="p-2.5 rounded-xl bg-surface-2 border border-theme flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Zap size={14} className="text-accent shrink-0" />
                  <p className="text-xs text-appText-bright truncate font-medium">
                    {practiceHint}
                  </p>
                </div>
                <span className="text-xs font-bold font-mono text-accent shrink-0">
                  {practiceStep}/{totalStrokes}
                </span>
              </div>

              <div className="flex items-center justify-center gap-2 flex-wrap">
                <button
                  onClick={handleUndoPracticeStroke}
                  disabled={practiceStep === 0}
                  className="px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-semibold border border-theme bg-surface hover:bg-surface-2 text-appText-bright transition-transform active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
                >
                  <Undo2 size={14} />
                  <span>Urungkan Goresan</span>
                </button>

                <button
                  onClick={handleResetPractice}
                  className="px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-semibold border border-theme bg-surface hover:bg-surface-2 text-appText-bright transition-transform active:scale-95"
                >
                  <RotateCcw size={14} />
                  <span>Ulangi Semua</span>
                </button>

                <button
                  onClick={() => setShowGuide(!showGuide)}
                  className={`px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-semibold border transition-transform active:scale-95 ${
                    showGuide
                      ? 'border-amber-500/40 bg-amber-500/15 text-accent font-bold'
                      : 'border-theme bg-surface text-appText-muted'
                  }`}
                >
                  <Eye size={14} />
                  <span>{showGuide ? 'Bantuan Aktif' : 'Tantangan Bebas'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Readings: Onyomi & Kunyomi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-surface-2/40 border border-theme">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-muted uppercase tracking-wider">
                  Onyomi (音読み)
                </span>
                <button
                  onClick={() => voiceManager.speakText(onyomiStr)}
                  aria-label="Dengarkan Onyomi"
                  className="p-1 text-muted hover:text-theme-primary transition-colors active:scale-95"
                >
                  <Volume2 size={14} />
                </button>
              </div>
              <p className="text-base font-bold font-japanese text-text break-words">
                {onyomiStr}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-2/40 border border-theme">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-muted uppercase tracking-wider">
                  Kunyomi (訓読み)
                </span>
                <button
                  onClick={() => voiceManager.speakText(kunyomiStr)}
                  aria-label="Dengarkan Kunyomi"
                  className="p-1 text-muted hover:text-theme-primary transition-colors active:scale-95"
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
          <div className="p-4 rounded-xl bg-surface-2/30 border border-theme space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-muted uppercase tracking-wider">
                Radikal (部首)
              </span>
              <span className="text-xs font-medium text-text">
                {kanji.radical?.character || '-'} ({kanji.radical?.name_ja || '-'} · {kanji.radical?.name_id || '-'})
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
                    className="p-3 flex items-center justify-between hover:bg-surface-2/30 transition-colors"
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
        <div className="p-3 sm:p-4 border-t border-theme bg-surface-2/30 flex items-center justify-between">
          <button
            onClick={() => {
              if (onAskSensei) {
                onAskSensei(kanji.character);
              }
              onClose();
            }}
            className="flex-1 py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm font-bold bg-amber-500/15 text-accent border border-amber-500/25 hover:bg-amber-500/25 transition-all active:scale-95"
          >
            <MessageSquare size={16} />
            <span>🍵 Tanya Sensei tentang Kanji 「{kanji.character}」</span>
          </button>
        </div>
      </div>
    </div>
  );
};
