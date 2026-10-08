"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Settings, User } from "lucide-react";

export default function FlashcardQuiz() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="h-full w-full flex flex-col pt-8 pb-24 px-4 bg-background">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-white tracking-tight">Kanji Basics</h1>
        <div className="flex items-center gap-1 text-nugget-amber">
          <Flame className="w-5 h-5 fill-nugget-amber" />
          <span className="font-bold text-sm tracking-widest uppercase">42 Days</span>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="mb-8 relative">
        <div className="h-1.5 w-full bg-surface-border rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-nugget-amber rounded-full" 
            initial={{ width: 0 }}
            animate={{ width: "60%" }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-gray-400 font-medium tracking-widest uppercase">Lvl 3: Animals</span>
          <span className="text-xs text-nugget-amber font-bold">60%</span>
        </div>
      </div>

      {/* Flashcard Component */}
      <div className="flex-1 flex items-center justify-center relative w-full h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={isFlipped ? "back" : "front"}
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 w-full h-full cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div className="glass-panel w-full h-full flex flex-col items-center justify-center p-8 relative overflow-hidden shadow-[0_0_50px_rgba(251,191,36,0.1)] border-nugget-amber/20">
              
              {/* Soft glow behind the card content */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-nugget-amber/20 rounded-full blur-[80px]"></div>
              
              {!isFlipped ? (
                // Front of Card
                <div className="text-center z-10 flex flex-col items-center">
                  <span className="text-sm text-gray-400 mb-2">Reading</span>
                  <h2 className="text-8xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">猫</h2>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">Tap to flip</p>
                </div>
              ) : (
                // Back of Card
                <div className="text-center z-10 flex flex-col items-center w-full">
                  <p className="text-xl text-nugget-amber mb-2 font-bold tracking-widest uppercase">ねこ (neko)</p>
                  <h2 className="text-4xl font-bold text-white mb-6">cat</h2>
                  
                  <div className="w-full h-px bg-surface-border my-6"></div>
                  
                  <div className="w-full text-left bg-surface-100 p-4 rounded-xl border border-surface-border/50">
                    <p className="text-lg text-white mb-1">その<span className="text-nugget-amber font-bold">猫</span>はとても可愛いです。</p>
                    <p className="text-sm text-gray-400">That cat is very cute.</p>
                  </div>
                </div>
              )}
              
              {/* Counter */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-500 font-bold tracking-widest text-xs">
                [ 1 / 25 ]
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Actions (Shown when flipped) */}
      <div className={`mt-8 flex gap-3 transition-all duration-300 ${isFlipped ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <button className="flex-1 py-4 rounded-xl glass-panel text-gray-400 font-bold hover:text-white transition-colors border-nugget-red/30 hover:bg-nugget-red/10">
          Hard
        </button>
        <button className="flex-1 py-4 rounded-xl glass-panel text-gray-400 font-bold hover:text-white transition-colors border-nugget-amber/30 hover:bg-nugget-amber/10">
          Good
        </button>
        <button className="flex-1 py-4 rounded-xl glass-panel text-gray-400 font-bold hover:text-white transition-colors border-nugget-green/30 hover:bg-nugget-green/10">
          Easy
        </button>
      </div>
    </div>
  );
}
