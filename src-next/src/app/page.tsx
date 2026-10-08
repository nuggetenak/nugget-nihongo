"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { Flame, Play, Sparkles, CheckCircle2, Trophy, ArrowRight, BookOpen, Clock } from "lucide-react";

export default function HomePage() {
  const { streak, xp, cards, cardsStudiedToday, dailyMissions, addXP } = useAppStore();
  const [claimedMissions, setClaimedMissions] = useState<Record<string, boolean>>({});
  const [dueCardsCount, setDueCardsCount] = useState<number>(0);

  useEffect(() => {
    const now = Date.now();
    const count = Object.values(cards).filter((c) => c.due <= now).length;
    setDueCardsCount(count);
  }, [cards]);

  const currentLevel = Math.floor(xp / 100) + 1;
  const xpInCurrentLevel = xp % 100;

  const handleClaim = (missionId: string, reward: number) => {
    if (claimedMissions[missionId]) return;
    addXP(reward);
    setClaimedMissions((prev) => ({ ...prev, [missionId]: true }));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Kebun Mastery & Level Hero Card */}
      <section className="glass-panel p-6 relative overflow-hidden shadow-[0_0_50px_rgba(251,191,36,0.08)] border-nugget-amber/20">
        <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl from-nugget-amber/15 via-nugget-gold/5 to-transparent rounded-bl-full pointer-events-none" />

        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-[11px] font-bold text-nugget-amber tracking-widest uppercase block mb-1">
              🌱 KEBUN MASTERY · LEVEL {currentLevel}
            </span>
            <h1 className="text-2xl font-black tracking-tight text-white">
              Semangat Belajar!
            </h1>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-nugget-orange/15 border border-nugget-orange/30 text-nugget-orange text-xs font-bold shadow-[0_0_12px_rgba(249,115,22,0.2)]">
            <Flame className="w-4 h-4 fill-nugget-orange animate-bounce" />
            <span>{streak} Hari Streak</span>
          </div>
        </div>

        {/* Level XP Progress Bar */}
        <div className="space-y-1.5 mt-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-gray-400">XP Menuju Level {currentLevel + 1}</span>
            <span className="text-nugget-amber">{xpInCurrentLevel} / 100 XP</span>
          </div>
          <div className="h-2 w-full bg-surface-border rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-nugget-gold to-nugget-amber rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(251,191,36,0.5)]"
              style={{ width: `${xpInCurrentLevel}%` }}
            />
          </div>
        </div>

        {/* Quick Review Action */}
        <div className="mt-5 pt-4 border-t border-surface-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-300 font-medium">
              {dueCardsCount > 0 ? (
                <>
                  <strong className="text-nugget-amber">{dueCardsCount} kartu</strong> perlu di-review!
                </>
              ) : (
                "Semua review hari ini sudah tuntas! 🎉"
              )}
            </span>
          </div>
          <Link
            href="/quiz"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-nugget-gold to-nugget-amber hover:brightness-110 text-black font-extrabold text-xs shadow-[0_0_15px_rgba(251,191,36,0.3)] transition-all active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-black" />
            <span>Mulai Review</span>
          </Link>
        </div>
      </section>

      {/* Sensei AI Teaser Card */}
      <section className="glass-panel p-5 border-white/15 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-surface-200 border border-nugget-amber/40 flex items-center justify-center text-nugget-amber shadow-[0_0_15px_rgba(251,191,36,0.2)]">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">Tanya Sensei Nugget</h2>
              <p className="text-xs text-gray-400">Bingung partikel atau grammar? Diskusi bareng AI.</p>
            </div>
          </div>
          <Link
            href="/sensei"
            className="p-2.5 rounded-xl bg-surface-100 hover:bg-surface-200 border border-surface-border text-nugget-amber transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Misi Harian (Daily Missions) */}
      <section className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-nugget-amber" />
            Misi Harian
          </h2>
          <span className="text-xs text-gray-500 font-medium">{cardsStudiedToday} aktivitas hari ini</span>
        </div>

        <div className="space-y-2">
          {dailyMissions.map((m) => {
            const isClaimed = claimedMissions[m.id];
            return (
              <div
                key={m.id}
                className="glass-panel p-3.5 flex items-center justify-between border-surface-border/70"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                      m.completed
                        ? "bg-nugget-green/20 text-nugget-green border border-nugget-green/30"
                        : "bg-surface-100 text-gray-500 border border-surface-border"
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">{m.title}</p>
                    <p className="text-[11px] text-gray-400">
                      Reward: <span className="text-nugget-amber font-semibold">+{m.xpReward} XP</span>
                    </p>
                  </div>
                </div>

                {m.completed ? (
                  isClaimed ? (
                    <span className="text-[11px] font-bold text-gray-500 uppercase px-3 py-1">Selesai</span>
                  ) : (
                    <button
                      onClick={() => handleClaim(m.id, m.xpReward)}
                      className="px-3 py-1.5 rounded-lg bg-nugget-amber text-black font-extrabold text-[11px] hover:brightness-110 active:scale-95 transition-all shadow-[0_0_10px_rgba(251,191,36,0.3)]"
                    >
                      Klaim XP
                    </button>
                  )
                ) : (
                  <span className="text-[11px] font-medium text-gray-500">
                    {m.current} / {m.target}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Jalur Belajar (Study Tracks) */}
      <section className="space-y-3">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1 flex items-center gap-1.5">
          <BookOpen className="w-4 h-4 text-nugget-gold" />
          Jalur Belajar Populer
        </h2>

        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/materi?level=n5"
            className="glass-panel p-4 flex flex-col justify-between hover:border-nugget-amber/40 transition-all group"
          >
            <div>
              <span className="text-2xl mb-2 block">🏷️</span>
              <h3 className="font-bold text-sm text-white group-hover:text-nugget-amber transition-colors">
                JLPT N5
              </h3>
              <p className="text-[11px] text-gray-400 mt-1 line-clamp-2">
                Dasar tata bahasa dan 900+ kosakata untuk pemula.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-[11px] font-bold text-nugget-amber">
              <span>Buka Materi</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/materi?level=n4"
            className="glass-panel p-4 flex flex-col justify-between hover:border-nugget-amber/40 transition-all group"
          >
            <div>
              <span className="text-2xl mb-2 block">🎌</span>
              <h3 className="font-bold text-sm text-white group-hover:text-nugget-amber transition-colors">
                JLPT N4
              </h3>
              <p className="text-[11px] text-gray-400 mt-1 line-clamp-2">
                Pola kalimat menengah dan percakapan harian.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-[11px] font-bold text-nugget-amber">
              <span>Buka Materi</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
