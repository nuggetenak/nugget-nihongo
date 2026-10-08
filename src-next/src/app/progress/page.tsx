"use client";

import React from "react";
import { useAppStore } from "@/lib/store";
import { Flame, Star, Award, BookOpen, Brain, Activity, Clock, Layers } from "lucide-react";

export default function ProgressPage() {
  const { xp, streak, cards, bookmarks } = useAppStore();

  const currentLevel = Math.floor(xp / 100) + 1;
  const cardsList = Object.values(cards);

  // States: 0=New, 1=Learning, 2=Review, 3=Relearning
  const learningCount = cardsList.filter((c) => c.state === 1).length;
  const reviewCount = cardsList.filter((c) => c.state === 2).length;
  const relearningCount = cardsList.filter((c) => c.state === 3).length;

  const totalReviews = cardsList.reduce((acc, c) => acc + c.reps, 0);

  // Average stability
  const avgStability =
    cardsList.length > 0
      ? (cardsList.reduce((acc, c) => acc + c.stability, 0) / cardsList.length).toFixed(1)
      : "0";

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-xl font-black text-white tracking-tight">Statistik Belajar</h1>
        <p className="text-xs text-gray-400">Pantau pertumbuhan daya ingat dan memori jangka panjang</p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="glass-panel p-4 flex flex-col justify-between border-nugget-gold/20">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Level</span>
            <Award className="w-4 h-4 text-nugget-gold" />
          </div>
          <div className="mt-3">
            <span className="text-3xl font-black text-white">{currentLevel}</span>
            <span className="text-xs text-nugget-amber block mt-0.5">{xp} Total XP</span>
          </div>
        </div>

        <div className="glass-panel p-4 flex flex-col justify-between border-nugget-orange/20">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Streak</span>
            <Flame className="w-4 h-4 text-nugget-orange fill-nugget-orange" />
          </div>
          <div className="mt-3">
            <span className="text-3xl font-black text-white">{streak}</span>
            <span className="text-xs text-nugget-orange block mt-0.5">Hari Berturut-turut</span>
          </div>
        </div>

        <div className="glass-panel p-4 flex flex-col justify-between border-blue-500/20">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Total Repetisi</span>
            <Activity className="w-4 h-4 text-blue-400" />
          </div>
          <div className="mt-3">
            <span className="text-3xl font-black text-white">{totalReviews}</span>
            <span className="text-xs text-blue-400 block mt-0.5">Review Dikerjakan</span>
          </div>
        </div>

        <div className="glass-panel p-4 flex flex-col justify-between border-nugget-green/20">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Rata-rata Stabilitas</span>
            <Brain className="w-4 h-4 text-nugget-green" />
          </div>
          <div className="mt-3">
            <span className="text-3xl font-black text-white">{avgStability}</span>
            <span className="text-xs text-nugget-green block mt-0.5">Hari Daya Ingat (S)</span>
          </div>
        </div>
      </div>

      {/* FSRS Memory Distribution */}
      <div className="glass-panel p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
            <Brain className="w-4 h-4 text-nugget-amber" />
            Distribusi Memori (FSRS-4D)
          </h2>
          <span className="text-xs font-bold text-white">{cardsList.length} Kartu Aktif</span>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-gray-300">Memori Kuat (Review)</span>
              <span className="text-nugget-green">{reviewCount}</span>
            </div>
            <div className="h-2 bg-surface-border rounded-full overflow-hidden">
              <div
                className="h-full bg-nugget-green rounded-full"
                style={{
                  width: `${cardsList.length ? (reviewCount / cardsList.length) * 100 : 0}%`,
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-gray-300">Tahap Belajar (Learning)</span>
              <span className="text-nugget-amber">{learningCount}</span>
            </div>
            <div className="h-2 bg-surface-border rounded-full overflow-hidden">
              <div
                className="h-full bg-nugget-amber rounded-full"
                style={{
                  width: `${cardsList.length ? (learningCount / cardsList.length) * 100 : 0}%`,
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-gray-300">Perlu Pengulangan (Lapse)</span>
              <span className="text-nugget-red">{relearningCount}</span>
            </div>
            <div className="h-2 bg-surface-border rounded-full overflow-hidden">
              <div
                className="h-full bg-nugget-red rounded-full"
                style={{
                  width: `${cardsList.length ? (relearningCount / cardsList.length) * 100 : 0}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bookmarks Summary */}
      <div className="glass-panel p-4 flex items-center justify-between border-surface-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center">
            <Star className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Item Tersimpan</h3>
            <p className="text-xs text-gray-400">{bookmarks.length} kata & tata bahasa di-bookmark</p>
          </div>
        </div>
      </div>
    </div>
  );
}
