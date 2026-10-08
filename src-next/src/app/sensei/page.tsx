"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChatMessage } from "@/types";
import { useAppStore } from "@/lib/store";
import { askSensei } from "@/lib/gemini";
import { Sparkles, Send, Volume2, Bot, User, Trash2 } from "lucide-react";

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "init",
    role: "assistant",
    content:
      "Halo! Aku Sensei Nugget. Ada materi grammar yang bikin kamu bingung, mau latihan percakapan, atau mau cek kalimat bahasa Jepangmu? Tanya aja langsung!",
    timestamp: Date.now(),
  },
];

const SUGGESTIONS = [
  "Jelaskan bedanya は (wa) dan が (ga)",
  "Roleplay: Pesan kopi di kafe Tokyo",
  "Koreksi kalimat: 私は日本に行くたい",
  "Beri saya 3 soal latihan N5",
];

export default function SenseiPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { addXP } = useAppStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const reply = await askSensei(
        [...messages, userMsg].map((m) => ({
          role: m.role,
          content: m.content,
        }))
      );

      const assistantMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: reply,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
      addXP(10); // Reward 10 XP for interacting with Sensei
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "assistant",
          content: "Koneksi terputus ke Sensei. Coba tanyakan lagi ya!",
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const playSpeech = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      // Match Japanese characters in response if possible
      const jpMatches = text.match(/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9faf]+/g);
      const toSpeak = jpMatches ? jpMatches.join(" ") : text;
      const utterance = new SpeechSynthesisUtterance(toSpeak);
      utterance.lang = "ja-JP";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] max-h-[750px]">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-3 border-b border-surface-border mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-nugget-gold to-nugget-amber flex items-center justify-center text-black font-bold shadow-[0_0_15px_rgba(251,191,36,0.3)]">
            <Sparkles className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h1 className="text-sm font-extrabold text-white flex items-center gap-1.5">
              Sensei Nugget
              <span className="w-2 h-2 rounded-full bg-nugget-green animate-pulse inline-block" />
            </h1>
            <p className="text-[10px] text-gray-400">Tutor Pribadi · Google Gemini AI</p>
          </div>
        </div>

        <button
          onClick={() => setMessages(INITIAL_MESSAGES)}
          className="p-2 text-gray-500 hover:text-white rounded-xl hover:bg-surface-100 transition-colors"
          title="Reset Percakapan"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {messages.map((m) => {
          const isUser = m.role === "user";
          return (
            <div
              key={m.id}
              className={`flex items-start gap-2.5 ${isUser ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                  isUser
                    ? "bg-surface-200 text-gray-300"
                    : "bg-nugget-amber/20 text-nugget-amber border border-nugget-amber/30"
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? "bg-gradient-to-r from-nugget-gold to-nugget-amber text-black font-medium rounded-tr-none shadow-[0_0_15px_rgba(251,191,36,0.2)]"
                    : "glass-panel text-gray-200 rounded-tl-none border-surface-border/70"
                }`}
              >
                <div className="whitespace-pre-wrap">{m.content}</div>

                {!isUser && (
                  <div className="mt-2 pt-2 border-t border-surface-border/40 flex justify-end">
                    <button
                      onClick={() => playSpeech(m.content)}
                      className="text-gray-400 hover:text-nugget-amber transition-colors p-1"
                      title="Dengarkan pelafalan Jepang"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-nugget-amber/20 text-nugget-amber border border-nugget-amber/30 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="glass-panel p-3.5 rounded-2xl rounded-tl-none text-xs text-gray-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-nugget-amber rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-nugget-amber rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 bg-nugget-amber rounded-full animate-bounce [animation-delay:0.4s]" />
              <span className="ml-1 text-[11px]">Sensei sedang menyusun penjelasan...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Chips */}
      {messages.length <= 2 && (
        <div className="py-2 flex gap-1.5 overflow-x-auto no-scrollbar shrink-0">
          {SUGGESTIONS.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(s)}
              className="text-[11px] whitespace-nowrap px-3 py-1.5 rounded-full bg-surface-100 hover:bg-surface-200 border border-surface-border text-gray-300 hover:text-white transition-colors shrink-0"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input row */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="pt-2 flex items-center gap-2 shrink-0"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tanya apa saja seputar bahasa Jepang..."
          className="flex-1 px-4 py-3 rounded-2xl glass-panel text-xs sm:text-sm text-white placeholder-gray-500 outline-none focus:border-nugget-amber/50 transition-colors"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="p-3 rounded-2xl bg-gradient-to-r from-nugget-gold to-nugget-amber text-black disabled:opacity-30 disabled:pointer-events-none transition-all shadow-[0_0_15px_rgba(251,191,36,0.3)]"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
