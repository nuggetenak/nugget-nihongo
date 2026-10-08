"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { JLPTLevel, VocabItem, GrammarItem } from "@/types";
import { fetchVocabByLevel, fetchGrammarByLevel } from "@/lib/data";
import { useAppStore } from "@/lib/store";
import WordDetailModal from "@/components/WordDetailModal";
import GrammarDetailModal from "@/components/GrammarDetailModal";
import { Search, Star, BookOpen, Layers, Volume2 } from "lucide-react";

function MateriContent() {
  const searchParams = useSearchParams();
  const initialLevel = (searchParams.get("level") as JLPTLevel) || "n5";

  const [activeLevel, setActiveLevel] = useState<JLPTLevel | "bookmark">(initialLevel);
  const [activeTab, setActiveTab] = useState<"vocab" | "grammar">("vocab");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const [vocabList, setVocabList] = useState<VocabItem[]>([]);
  const [grammarList, setGrammarList] = useState<GrammarItem[]>([]);

  const [selectedWord, setSelectedWord] = useState<VocabItem | null>(null);
  const [selectedGrammar, setSelectedGrammar] = useState<GrammarItem | null>(null);

  const { bookmarks, isBookmarked, toggleBookmark } = useAppStore();

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      if (activeLevel === "bookmark") {
        const v5 = await fetchVocabByLevel("n5");
        const v4 = await fetchVocabByLevel("n4");
        const g5 = await fetchGrammarByLevel("n5");
        const g4 = await fetchGrammarByLevel("n4");

        const allV = [...v5, ...v4].filter((item) => bookmarks.includes(item.id));
        const allG = [...g5, ...g4].filter((item) => bookmarks.includes(item.id));

        setVocabList(allV);
        setGrammarList(allG);
      } else {
        const [v, g] = await Promise.all([
          fetchVocabByLevel(activeLevel),
          fetchGrammarByLevel(activeLevel),
        ]);
        setVocabList(v);
        setGrammarList(g);
      }
      setLoading(false);
    }

    loadData();
  }, [activeLevel, bookmarks]);

  const playAudio = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ja-JP";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const filteredVocab = vocabList.filter((item) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.word?.toLowerCase().includes(q) ||
      item.reading?.toLowerCase().includes(q) ||
      item.meaning_id?.toLowerCase().includes(q) ||
      item.romaji?.toLowerCase().includes(q)
    );
  });

  const filteredGrammar = grammarList.filter((item) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.pattern?.toLowerCase().includes(q) ||
      item.meaning?.toLowerCase().includes(q) ||
      item.desc?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-5">
      {/* Level Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {(["n5", "n4", "n3", "n2", "n1"] as JLPTLevel[]).map((lvl) => (
          <button
            key={lvl}
            onClick={() => setActiveLevel(lvl)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all uppercase shrink-0 ${
              activeLevel === lvl
                ? "bg-gradient-to-r from-nugget-gold to-nugget-amber text-black shadow-[0_0_15px_rgba(251,191,36,0.4)]"
                : "glass-panel text-gray-400 hover:text-white"
            }`}
          >
            {lvl}
          </button>
        ))}

        <button
          onClick={() => setActiveLevel("bookmark")}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
            activeLevel === "bookmark"
              ? "bg-amber-400/20 text-amber-300 border border-amber-400/50 shadow-[0_0_15px_rgba(251,191,36,0.3)]"
              : "glass-panel text-gray-400 hover:text-white"
          }`}
        >
          <Star className="w-3.5 h-3.5 fill-current" />
          <span>Bookmark ({bookmarks.length})</span>
        </button>
      </div>

      {/* Tab Switcher: Vocab vs Grammar */}
      <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-surface-100 border border-surface-border">
        <button
          onClick={() => setActiveTab("vocab")}
          className={`py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            activeTab === "vocab"
              ? "bg-surface-200 text-white shadow"
              : "text-gray-400 hover:text-gray-200"
          }`}
        >
          <BookOpen className="w-4 h-4 text-nugget-amber" />
          <span>Kosakata ({filteredVocab.length})</span>
        </button>
        <button
          onClick={() => setActiveTab("grammar")}
          className={`py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            activeTab === "grammar"
              ? "bg-surface-200 text-white shadow"
              : "text-gray-400 hover:text-gray-200"
          }`}
        >
          <Layers className="w-4 h-4 text-nugget-gold" />
          <span>Tata Bahasa ({filteredGrammar.length})</span>
        </button>
      </div>

      {/* Local Filter / Search bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Cari dalam ${activeLevel.toUpperCase()}...`}
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl glass-panel text-sm text-white placeholder-gray-500 outline-none focus:border-nugget-amber/50 transition-colors"
        />
      </div>

      {/* Content list */}
      {loading ? (
        <div className="py-20 text-center text-sm text-gray-400 animate-pulse">
          Memuat data {activeLevel.toUpperCase()}...
        </div>
      ) : activeTab === "vocab" ? (
        filteredVocab.length === 0 ? (
          <div className="py-16 text-center text-gray-500 text-xs">
            Tidak ada kosakata yang cocok dengan pencarian.
          </div>
        ) : (
          <div className="space-y-2.5">
            {filteredVocab.slice(0, 100).map((v) => {
              const bookmarked = isBookmarked(v.id);
              return (
                <div
                  key={v.id}
                  onClick={() => setSelectedWord(v)}
                  className="glass-panel p-3.5 hover:bg-surface-200 border-surface-border/60 hover:border-nugget-amber/40 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-white font-japanese group-hover:text-nugget-amber transition-colors">
                        {v.word}
                      </span>
                      <span className="text-xs text-nugget-amber font-japanese">
                        {v.reading}
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 font-medium">
                      {v.meaning_id}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => playAudio(v.word, e)}
                      className="p-2 rounded-xl text-gray-400 hover:text-nugget-amber hover:bg-surface-100 transition-colors"
                      title="Audio"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(v.id);
                      }}
                      className={`p-2 rounded-xl transition-colors ${
                        bookmarked ? "text-nugget-amber" : "text-gray-500 hover:text-white"
                      }`}
                    >
                      <Star className={`w-4 h-4 ${bookmarked ? "fill-nugget-amber" : ""}`} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )
      ) : filteredGrammar.length === 0 ? (
        <div className="py-16 text-center text-gray-500 text-xs">
          Tidak ada tata bahasa yang cocok dengan pencarian.
        </div>
      ) : (
        <div className="space-y-2.5">
          {filteredGrammar.slice(0, 100).map((g) => {
            const bookmarked = isBookmarked(g.id);
            return (
              <div
                key={g.id}
                onClick={() => setSelectedGrammar(g)}
                className="glass-panel p-4 hover:bg-surface-200 border-surface-border/60 hover:border-nugget-gold/40 transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white font-japanese group-hover:text-nugget-gold transition-colors">
                      {g.pattern}
                    </span>
                  </div>
                  <p className="text-xs text-nugget-gold font-medium">
                    {g.meaning}
                  </p>
                  {g.connection && (
                    <code className="text-[11px] text-gray-400 block font-mono">
                      {g.connection}
                    </code>
                  )}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark(g.id);
                  }}
                  className={`p-2 rounded-xl transition-colors ${
                    bookmarked ? "text-nugget-gold" : "text-gray-500 hover:text-white"
                  }`}
                >
                  <Star className={`w-4 h-4 ${bookmarked ? "fill-nugget-gold" : ""}`} />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {selectedWord && (
        <WordDetailModal item={selectedWord} onClose={() => setSelectedWord(null)} />
      )}
      {selectedGrammar && (
        <GrammarDetailModal item={selectedGrammar} onClose={() => setSelectedGrammar(null)} />
      )}
    </div>
  );
}

export default function MateriPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-sm text-gray-400 animate-pulse">Memuat materi...</div>}>
      <MateriContent />
    </Suspense>
  );
}
