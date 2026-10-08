"use client";

import React, { useState } from "react";
import { Flame, Star, Search, Bell } from "lucide-react";
import { useAppStore } from "@/lib/store";
import GlobalSearchModal from "./GlobalSearchModal";

export default function AppHeader() {
  const { streak, xp } = useAppStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-background/80 border-b border-surface-border px-4 py-3">
        <div className="max-w-md mx-auto flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-nugget-gold to-nugget-amber flex items-center justify-center font-bold text-black text-base shadow-[0_0_15px_rgba(251,191,36,0.3)]">
              文
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-tight text-white block leading-none">
                NUGGET
              </span>
              <span className="text-[10px] tracking-wider text-nugget-amber font-semibold block leading-none mt-0.5">
                NIHONGO
              </span>
            </div>
          </div>

          {/* Action pills: Search, Streak, XP */}
          <div className="flex items-center gap-2">
            {/* Global Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-xl bg-surface-100 hover:bg-surface-200 border border-surface-border text-gray-300 hover:text-white transition-all flex items-center gap-1.5"
              title="Cari (Ctrl+K)"
            >
              <Search className="w-4 h-4 text-gray-400" />
            </button>

            {/* Streak Counter */}
            <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-surface-100 border border-nugget-orange/30 text-nugget-orange text-xs font-bold shadow-[0_0_10px_rgba(249,115,22,0.1)]">
              <Flame className="w-4 h-4 fill-nugget-orange" />
              <span>{streak}</span>
            </div>

            {/* XP Counter */}
            <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-surface-100 border border-nugget-amber/30 text-nugget-amber text-xs font-bold shadow-[0_0_10px_rgba(251,191,36,0.1)]">
              <Star className="w-3.5 h-3.5 fill-nugget-amber" />
              <span>{xp}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Global Search Modal */}
      {isSearchOpen && <GlobalSearchModal onClose={() => setIsSearchOpen(false)} />}
    </>
  );
}
