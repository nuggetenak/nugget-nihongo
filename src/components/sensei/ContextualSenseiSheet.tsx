// ══════════════════════════════════════════════════════════════════
//  ContextualSenseiSheet.tsx — Context-Injected Sensei Sheet
//  Nugget Nihongo · Instant "Tanya Sensei" Slide-Over & Bottom Sheet
// ══════════════════════════════════════════════════════════════════

import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Send,
  Volume2,
  VolumeX,
  ArrowRight,
  BookOpen,
  RefreshCw,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import {
  ChatMessage,
  sendSenseiMessage,
  ContextCardPayload,
} from '../../lib/ai/senseiClient';
import { speakPersona, stopPersonaVoice } from '../../lib/audio/voiceManager';

export const ContextualSenseiSheet: React.FC = () => {
  const {
    isSenseiSheetOpen,
    senseiSheetContext,
    closeSenseiSheet,
    setActiveTab,
    setSelectedLevel,
    showToast,
  } = useAppStore();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPlayingVoice, setIsPlayingVoice] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Inisialisasi saat sheet dibuka dengan context card baru
  useEffect(() => {
    if (!isSenseiSheetOpen || !senseiSheetContext) {
      setMessages([]);
      setInputText('');
      return;
    }

    const target = senseiSheetContext.target;
    const initialQuery = `Jelaskan pola ${target}: bagaimana cara pakai dan nuansa penggunaannya?`;

    // Sambutan Sensei langsung spesifik ke kartu ini
    const initialGreeting: ChatMessage = {
      id: `ctx-welcome-${Date.now()}`,
      role: 'model',
      content: `Yo! Kamu lagi mempelajari **${target}** ya? Pola ini penting banget di level ${senseiSheetContext.level.toUpperCase()}. Ada yang mau kamu tanyakan tentang nuansa, posisi partikel, atau contoh kalimatnya?`,
      timestamp: Date.now(),
      modelUsed: 'gemini-3.8-flash',
      contextCard: senseiSheetContext,
    };

    setMessages([initialGreeting]);
    setInputText(initialQuery);
  }, [isSenseiSheetOpen, senseiSheetContext]);

  // Scroll otomatis
  useEffect(() => {
    if (isSenseiSheetOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isSenseiSheetOpen]);

  if (!isSenseiSheetOpen || !senseiSheetContext) return null;

  const handleSend = async (queryText?: string) => {
    const text = (queryText || inputText).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputText('');
    setIsLoading(true);

    try {
      const reply = await sendSenseiMessage(
        newHistory,
        {
          persona: 'sensei_nugget',
          mode: 'explain',
          userLevel: senseiSheetContext.level || 'n5',
        },
        senseiSheetContext
      );

      setMessages((prev) => [...prev, reply]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        content: `Waduh, koneksi ke Sensei terhambat: ${err.message || 'Coba kirim ulang ya!'}.`,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handlePlayVoice = (msgId: string, content: string) => {
    if (isPlayingVoice === msgId) {
      stopPersonaVoice();
      setIsPlayingVoice(null);
    } else {
      stopPersonaVoice();
      setIsPlayingVoice(msgId);
      speakPersona(content, 'sensei_nugget', () => {
        setIsPlayingVoice(null);
      });
    }
  };

  const handleGoToQuiz = () => {
    closeSenseiSheet();
    if (senseiSheetContext.level) {
      setSelectedLevel(senseiSheetContext.level as any);
    }
    setActiveTab('quiz');
    showToast(`Membuka kuis latihan level ${senseiSheetContext.level.toUpperCase()}`, '🎯');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      {/* Container Bottom Sheet on Mobile, Centered Modal on Tablet/Desktop */}
      <div
        className="w-full max-w-xl bg-surface border border-accent/25 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[88dvh] sm:max-h-[85vh] overflow-hidden animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Handle Bar */}
        <div className="w-12 h-1.5 bg-accent/25 rounded-full mx-auto mt-3 sm:hidden shrink-0" />

        {/* ── Header ── */}
        <div className="p-4 sm:p-5 border-b border-accent/15 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/35 flex items-center justify-center text-xl shrink-0">
              🍵
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base text-appText-bright truncate">
                  Tanya Sensei
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  {senseiSheetContext.level.toUpperCase()}
                </span>
              </div>
              <p className="text-[11px] text-appText-muted truncate">
                Diskusi langsung materi {senseiSheetContext.target}
              </p>
            </div>
          </div>

          <button
            onClick={closeSenseiSheet}
            className="w-8 h-8 rounded-xl bg-surface-2 hover:bg-surface-3 border border-accent/15 flex items-center justify-center text-appText-muted hover:text-appText-bright transition-colors active:scale-95 shrink-0"
            title="Tutup Sheet"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── Context Card Ribbon ── */}
        <div className="px-4 py-2.5 bg-surface-2/70 border-b border-accent/10 flex items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-amber-400 font-bold shrink-0">📌 Kartu:</span>
            <span className="font-bold text-appText-bright truncate">
              {senseiSheetContext.target}
            </span>
            {senseiSheetContext.meaning_id && (
              <span className="text-appText-muted truncate hidden sm:inline">
                · {senseiSheetContext.meaning_id}
              </span>
            )}
          </div>
          {senseiSheetContext.structure && (
            <span className="text-[11px] font-mono text-accent bg-accent/10 px-2 py-0.5 rounded-md shrink-0 hidden md:inline">
              {senseiSheetContext.structure}
            </span>
          )}
        </div>

        {/* ── Messages Scroll Area ── */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 min-h-[220px]">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs shrink-0 border ${
                    isUser
                      ? 'bg-accent/20 border-accent/40 text-accent font-bold'
                      : 'bg-amber-500/20 border-amber-500/35 text-amber-300'
                  }`}
                >
                  {isUser ? 'U' : '🍵'}
                </div>

                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                    isUser
                      ? 'bg-accent text-bg font-medium rounded-tr-xs'
                      : 'bg-surface-2 border border-accent/15 text-appText-bright rounded-tl-xs space-y-2'
                  }`}
                >
                  <div className="whitespace-pre-wrap break-words">{msg.content}</div>

                  {!isUser && (
                    <div className="pt-1.5 border-t border-accent/10 flex items-center justify-between text-[11px] text-appText-muted">
                      <button
                        onClick={() => handlePlayVoice(msg.id, msg.content)}
                        className="inline-flex items-center gap-1 hover:text-accent transition-colors"
                      >
                        {isPlayingVoice === msg.id ? (
                          <>
                            <VolumeX className="w-3 h-3 text-rose-400" />
                            <span className="text-rose-400">Stop</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3 h-3" />
                            <span>Lafalkan</span>
                          </>
                        )}
                      </button>

                      {msg.modelUsed && (
                        <span className="text-[10px] text-appText-muted/60">
                          {msg.modelUsed}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-appText-muted bg-surface-2 border border-accent/15 rounded-xl px-3 py-2 w-fit">
              <RefreshCw className="w-3 h-3 animate-spin text-accent" />
              <span>Sensei sedang memikirkan penjelasan terbaik...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* ── Input Box & CTAs ── */}
        <div className="p-3 sm:p-4 bg-surface border-t border-accent/15 space-y-2.5 shrink-0">
          <div className="flex items-center gap-2">
            <textarea
              ref={inputRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              rows={1}
              placeholder="Tanyakan lebih lanjut ke Sensei... (Enter)"
              className="flex-1 bg-surface-2 border border-accent/20 focus:border-accent rounded-xl px-3 py-2 text-xs sm:text-sm text-appText-bright placeholder:text-appText-muted/60 focus:outline-none resize-none"
            />
            <button
              onClick={() => handleSend()}
              disabled={!inputText.trim() || isLoading}
              className={`w-9 h-9 rounded-xl flex items-center justify-center text-bg shrink-0 transition-all ${
                inputText.trim() && !isLoading
                  ? 'bg-accent hover:bg-accent-hot active:scale-95'
                  : 'bg-surface-3 text-appText-muted cursor-not-allowed opacity-50'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          {/* Exit Affordances */}
          <div className="flex items-center justify-between gap-2 pt-1 text-xs">
            <button
              onClick={closeSenseiSheet}
              className="px-3 py-1.5 rounded-lg text-appText-muted hover:text-appText-bright hover:bg-surface-2 transition-colors active:scale-95"
            >
              Kembali ke Materi
            </button>

            <button
              onClick={handleGoToQuiz}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent/15 hover:bg-accent/25 border border-accent/30 text-accent font-bold transition-all active:scale-95"
            >
              <span>Latihan Soal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
