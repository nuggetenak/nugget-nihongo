// ══════════════════════════════════════════════════════════════════
//  ChoukaiAudioPlayer.tsx — Authentic CBT Touch Audio Player
//  Ported from choukai renshuu (ADR-013, JFT-Basic Simulation)
// ══════════════════════════════════════════════════════════════════

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, FastForward } from 'lucide-react';
import { ChoukaiAudioFile } from '../../lib/data/choukaiExamBank';

interface ChoukaiAudioPlayerProps {
  audio: ChoukaiAudioFile;
  autoPlay?: boolean;
}

export const ChoukaiAudioPlayer: React.FC<ChoukaiAudioPlayerProps> = ({
  audio,
  autoPlay = false,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);

  // Reset and load when audio prop changes
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);

    const el = audioRef.current;
    if (el) {
      el.pause();
      el.playbackRate = playbackRate;
      el.currentTime = 0;
      el.load();

      if (autoPlay) {
        el.play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }

    return () => {
      const el = audioRef.current;
      if (el) {
        el.pause();
      }
    };
  }, [audio.mp3, audio.m4a, autoPlay]);

  const togglePlay = () => {
    const el = audioRef.current;
    if (!el) return;

    if (isPlaying) {
      el.pause();
      setIsPlaying(false);
    } else {
      el.play()
        .then(() => setIsPlaying(true))
        .catch((e) => {
          console.warn('[ChoukaiAudioPlayer] playback failed:', e);
          setIsPlaying(false);
        });
    }
  };

  const handleReplay = () => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = 0;
    setCurrentTime(0);
    el.play()
      .then(() => setIsPlaying(true))
      .catch(() => {});
  };

  const handleSpeedChange = (rate: number) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekPct = parseFloat(e.target.value);
    const newTime = (seekPct / 100) * duration;
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (secs: number) => {
    if (!isFinite(secs) || isNaN(secs) || secs < 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full bg-surface border border-theme rounded-2xl p-4 shadow-md backdrop-blur-sm overflow-x-hidden">
      {/* Hidden Audio Element with dual source fallback */}
      <audio
        ref={audioRef}
        preload="auto"
        onTimeUpdate={() => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
          }
        }}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration);
          }
        }}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentTime(0);
        }}
      >
        <source src={audio.mp3} type="audio/mpeg" />
        {audio.m4a && <source src={audio.m4a} type="audio/mp4" />}
      </audio>

      {/* Top Row: Track Label & Playback Speed Chips */}
      <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-theme/60">
        <div className="flex items-center gap-2 min-w-0">
          <Volume2 className="w-4 h-4 text-accent shrink-0" />
          <span className="text-xs sm:text-sm font-bold text-appText-bright truncate">
            {audio.label || '聴解 音声 (Listening Audio)'}
          </span>
        </div>

        {/* Speed Chips (supports 0.75x/0.8x, 1.0x, 1.2x/1.25x playback rates) */}
        <div className="flex items-center gap-1 shrink-0">
          {[0.75, 1.0, 1.25].map((rate) => (
            <button
              key={rate}
              onClick={() => handleSpeedChange(rate)}
              className={`min-h-[40px] min-w-[40px] px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95 ${
                Math.abs(playbackRate - rate) < 0.05
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'bg-surface-2 hover:bg-surface-3 text-appText-muted hover:text-appText-bright border border-theme'
              }`}
            >
              {rate.toFixed(2).replace(/\.00$/, '.0').replace(/50$/, '5')}x
            </button>
          ))}
        </div>
      </div>

      {/* Controls Row: Play/Pause, Scrubber, Replay */}
      <div className="flex items-center gap-3">
        {/* Play / Pause Toggle Button */}
        <button
          onClick={togglePlay}
          className="w-11 h-11 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 flex items-center justify-center shrink-0 shadow-md active:scale-90 transition-transform"
          aria-label={isPlaying ? 'Jeda Audio' : 'Putar Audio'}
        >
          {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
        </button>

        {/* Scrubber and Timers */}
        <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
          <input
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={isNaN(progressPct) ? 0 : progressPct}
            onChange={handleSeek}
            className="w-full h-2 bg-surface-3 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
          <div className="flex justify-between items-center text-xs font-mono text-appText-muted">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Replay Button */}
        <button
          onClick={handleReplay}
          className="w-11 h-11 rounded-2xl bg-surface-2 hover:bg-surface-3 text-appText-bright border border-theme flex items-center justify-center shrink-0 active:scale-90 transition-transform"
          title="Putar Ulang dari Awal"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
