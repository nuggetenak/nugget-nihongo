"use client";

import React, { useState, useEffect } from "react";
import { VocabItem, FSRSRating, JLPTLevel } from "@/types";
import { fetchVocabByLevel } from "@/lib/data";
import { useAppStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Star, Volume2, CheckCircle2, XCircle, ArrowRight, RotateCcw, Award } from "lucide-react";
import Link from "next/link";

type QuizMode = "flashcard" | "multichoice";

export default function QuizRunner() {
  const [level, setLevel] = useState<JLPTLevel>("n5");
  const [mode, setMode] = useState<QuizMode>("flashcard");
  const [items, setItems] = useState<VocabItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  // Multiple choice state
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [choices, setChoices] = useState<string[]>([]);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const { recordReview, addXP } = useAppStore();

  useEffect(() => {
    async function loadQuizData() {
      setLoading(true);
      const data = await fetchVocabByLevel(level);
      // Shuffle 15 random items
      const shuffled = [...data].sort(() => 0.5 - Math.random()).slice(0, 15);
      setItems(shuffled);
      setCurrentIndex(0);
      setIsFlipped(false);
      setScore(0);
      setIsCompleted(false);
      setLoading(false);
    }
    loadQuizData();
  }, [level, mode]);

  const currentItem = items[currentIndex];

  // Generate multiple choice options
  useEffect(() => {
    if (!currentItem || mode !== "multichoice") return;
    const correct = currentItem.meaning_id;
    const others = items
      .filter((i) => i.id !== currentItem.id)
      .map((i) => i.meaning_id)
      .slice(0, 3);
    const shuffledChoices = [correct, ...others].sort(() => 0.5 - Math.random());
    setChoices(shuffledChoices);
    setSelectedChoice(null);
    setIsAnswerChecked(false);
  }, [currentIndex, currentItem, mode, items]);

  const playAudio = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ja-JP";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleFlashcardRating = (rating: FSRSRating) => {
    if (!currentItem) return;
    recordReview(currentItem.id, "vocab", rating);

    if (currentIndex + 1 >= items.length) {
      setIsCompleted(true);
    } else {
      setIsFlipped(false);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleSelectChoice = (choice: string) => {
    if (isAnswerChecked) return;
    setSelectedChoice(choice);
    setIsAnswerChecked(true);

    const isCorrect = choice === currentItem.meaning_id;
    if (isCorrect) {
      setScore((s) => s + 1);
      addXP(15);
      recordReview(currentItem.id, "vocab", 3);
    } else {
      recordReview(currentItem.id, "vocab", 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 >= items.length) {
      setIsCompleted(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center text-sm text-gray-400 animate-pulse">
        Menyiapkan sesi latihan {level.toUpperCase()}...
      </div>
    );
  }

  // Quiz Completed View
  if (isCompleted) {
    const accuracy = Math.round((score / items.length) * 100);
    return (
      <div className="py-12 px-4 text-center space-y-6 glass-panel border-nugget-amber/30 my-8">
        <div className="w-20 h-20 mx-auto rounded-full bg-nugget-amber/20 border border-nugget-amber flex items-center justify-center text-nugget-amber shadow-[0_0_30px_rgba(251,191,36,0.3)]">
          <Award className="w-10 h-10 animate-bounce" />
        </div>

        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Sesi Latihan Tuntas! 🎉
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Hebat! Kartu-kartu ini sudah diperbarui di algoritma FSRS kamu.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
          <div className="p-4 rounded-2xl bg-surface-100 border border-surface-border">
            <span className="text-[11px] font-bold text-gray-400 block uppercase">Kartu Selesai</span>
            <span className="text-2xl font-black text-white">{items.length}</span>
          </div>
          <div className="p-4 rounded-2xl bg-surface-100 border border-surface-border">
            <span className="text-[11px] font-bold text-gray-400 block uppercase">XP Diperoleh</span>
            <span className="text-2xl font-black text-nugget-amber">+{items.length * 15}</span>
          </div>
        </div>

        <div className="pt-4 flex gap-3 justify-center">
          <button
            onClick={() => {
              setCurrentIndex(0);
              setIsCompleted(false);
            }}
            className="px-5 py-2.5 rounded-xl glass-panel text-white font-bold text-xs flex items-center gap-2 hover:bg-surface-200 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Ulangi Lagi</span>
          </button>
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-nugget-gold to-nugget-amber text-black font-extrabold text-xs shadow-[0_0_15px_rgba(251,191,36,0.4)]"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Level & Mode Selector */}
      <div className="flex justify-between items-center">
        <div className="flex gap-1.5 p-1 rounded-2xl bg-surface-100 border border-surface-border">
          <button
            onClick={() => setMode("flashcard")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              mode === "flashcard"
                ? "bg-surface-200 text-nugget-amber shadow"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Flashcard
          </button>
          <button
            onClick={() => setMode("multichoice")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              mode === "multichoice"
                ? "bg-surface-200 text-nugget-amber shadow"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Pilihan Ganda
          </button>
        </div>

        <select
          value={level}
          onChange={(e) => setLevel(e.target.value as JLPTLevel)}
          className="bg-surface-100 border border-surface-border rounded-xl px-3 py-1.5 text-xs font-bold text-white uppercase outline-none"
        >
          <option value="n5">JLPT N5</option>
          <option value="n4">JLPT N4</option>
          <option value="n3">JLPT N3</option>
        </select>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs font-semibold">
          <span className="text-gray-400">
            Pertanyaan {currentIndex + 1} dari {items.length}
          </span>
          <span className="text-nugget-amber">
            {Math.round(((currentIndex + 1) / items.length) * 100)}%
          </span>
        </div>
        <div className="h-1.5 w-full bg-surface-border rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-nugget-gold to-nugget-amber transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / items.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Flashcard Mode */}
      {mode === "flashcard" && currentItem && (
        <div className="flex flex-col gap-6">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="h-72 w-full cursor-pointer relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isFlipped ? "back" : "front"}
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full glass-panel p-6 flex flex-col items-center justify-center relative overflow-hidden shadow-[0_0_40px_rgba(251,191,36,0.1)] border-nugget-amber/20"
              >
                {!isFlipped ? (
                  <div className="text-center space-y-2">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block">
                      Kanji / Kata
                    </span>
                    <h2 className="text-6xl font-black text-white font-japanese tracking-tight">
                      {currentItem.word}
                    </h2>
                    <p className="text-xs text-nugget-amber mt-4 font-semibold uppercase tracking-wider">
                      Tap untuk melihat arti & reading
                    </p>
                  </div>
                ) : (
                  <div className="text-center space-y-3 w-full">
                    <p className="text-lg text-nugget-amber font-bold font-japanese">
                      {currentItem.reading} {currentItem.romaji ? `(${currentItem.romaji})` : ""}
                    </p>
                    <h3 className="text-3xl font-extrabold text-white">
                      {currentItem.meaning_id}
                    </h3>
                    {currentItem.examples && currentItem.examples[0] && (
                      <div className="mt-3 p-3 rounded-xl bg-surface-100 border border-surface-border text-left">
                        <p className="text-xs text-white font-japanese">{currentItem.examples[0].jp}</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">{currentItem.examples[0].id}</p>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* FSRS Rating Buttons */}
          <div
            className={`grid grid-cols-4 gap-2 transition-all ${
              isFlipped ? "opacity-100 pointer-events-auto" : "opacity-30 pointer-events-none"
            }`}
          >
            <button
              onClick={() => handleFlashcardRating(1)}
              className="py-3 rounded-xl bg-red-500/15 border border-red-500/30 hover:bg-red-500/30 text-red-300 font-bold text-xs"
            >
              Lagi (1)
            </button>
            <button
              onClick={() => handleFlashcardRating(2)}
              className="py-3 rounded-xl bg-amber-500/15 border border-amber-500/30 hover:bg-amber-500/30 text-amber-300 font-bold text-xs"
            >
              Sulit (2)
            </button>
            <button
              onClick={() => handleFlashcardRating(3)}
              className="py-3 rounded-xl bg-blue-500/15 border border-blue-500/30 hover:bg-blue-500/30 text-blue-300 font-bold text-xs"
            >
              Bagus (3)
            </button>
            <button
              onClick={() => handleFlashcardRating(4)}
              className="py-3 rounded-xl bg-green-500/15 border border-green-500/30 hover:bg-green-500/30 text-green-300 font-bold text-xs"
            >
              Mudah (4)
            </button>
          </div>
        </div>
      )}

      {/* Multiple Choice Mode */}
      {mode === "multichoice" && currentItem && (
        <div className="flex flex-col gap-5">
          <div className="glass-panel p-8 text-center border-surface-border">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">
              Pilih arti yang tepat untuk:
            </span>
            <div className="flex items-center justify-center gap-3">
              <h2 className="text-5xl font-black text-white font-japanese">{currentItem.word}</h2>
              <button
                onClick={() => playAudio(currentItem.word)}
                className="p-2 rounded-full bg-surface-100 text-nugget-amber"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-nugget-amber mt-2 font-japanese font-medium">
              {currentItem.reading}
            </p>
          </div>

          {/* 4 Choices */}
          <div className="space-y-2.5">
            {choices.map((choice, idx) => {
              const isSelected = selectedChoice === choice;
              const isCorrect = choice === currentItem.meaning_id;

              let btnStyle = "bg-surface-100 border-surface-border text-white hover:bg-surface-200";
              if (isAnswerChecked) {
                if (isCorrect) {
                  btnStyle = "bg-nugget-green/20 border-nugget-green text-nugget-green font-bold";
                } else if (isSelected) {
                  btnStyle = "bg-nugget-red/20 border-nugget-red text-nugget-red font-bold";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectChoice(choice)}
                  disabled={isAnswerChecked}
                  className={`w-full p-4 rounded-2xl border text-left text-sm font-semibold transition-all flex items-center justify-between ${btnStyle}`}
                >
                  <span>{choice}</span>
                  {isAnswerChecked && isCorrect && <CheckCircle2 className="w-5 h-5 text-nugget-green" />}
                  {isAnswerChecked && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-nugget-red" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          {isAnswerChecked && (
            <button
              onClick={handleNextQuestion}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-nugget-gold to-nugget-amber text-black font-black text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(251,191,36,0.3)]"
            >
              <span>Lanjut</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
