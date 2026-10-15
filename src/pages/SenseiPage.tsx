// ══════════════════════════════════════════════════════════════════
//  SenseiPage.tsx — Sensei AI Dojo Studio (Gemini 3.8 Flash)
//  Nugget Nihongo · Persona-Driven Japanese Learning Assistant
// ══════════════════════════════════════════════════════════════════

import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Send,
  Trash2,
  Volume2,
  VolumeX,
  Compass,
  ArrowRight,
  RefreshCw,
  MessageSquare,
  BookOpen,
  CheckCircle,
  HelpCircle,
  ChevronDown,
  User,
  Bot,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import {
  ChatMessage,
  SenseiPersona,
  SenseiMode,
  sendSenseiMessage,
  loadChatHistory,
  saveChatHistory,
  clearChatHistory,
} from '../lib/ai/senseiClient';
import { speakPersona, stopPersonaVoice } from '../lib/audio/voiceManager';

// ── Pre-configured Scenario Prompts ──────────────────────────────
const ROLEPLAY_SCENARIOS = [
  {
    id: 'ramen',
    title: '🍜 Pesan Ramen',
    prompt: 'Konnichiwa! Saya sedang berada di kedai ramen lokal di Tokyo. Tolong sambut saya sebagai pelayan kedai dan tanyakan pesanan saya.',
  },
  {
    id: 'konbini',
    title: '🏪 Kasir Konbini',
    prompt: 'Halo! Saya sedang membayar onigiri dan teh hijau di kasir 7-Eleven. Tolong layani saya dan tanyakan apakah saya butuh kantong plastik atau struk.',
  },
  {
    id: 'station',
    title: '🚉 Stasiun Kereta',
    prompt: 'Sumimasen! Saya tersesat di Stasiun Shinjuku dan mencari Yamanote Line. Tolong jawab sebagai petugas stasiun yang ramah.',
  },
  {
    id: 'baito',
    title: '💼 Wawancara Baito',
    prompt: 'Hajimemashite! Saya datang untuk wawancara kerja paruh waktu di restoran. Tolong bertindak sebagai manajer toko dan ajukan pertanyaan pertama.',
  },
];

const EXPLAIN_PROMPTS = [
  'Beda ～わけではない vs ～とは限らない dalam percakapan sehari-hari?',
  'Kapan sebaiknya pakai partikel は (wa) vs が (ga)? Berikan contoh praktis.',
  'Apa perbedaan nuansa antara ～そうです vs ～ようです vs ～らしい?',
  'Kenapa orang Jepang sering pakai bentuk ～てしまう (atau ～ちゃう)?',
];

const CORRECT_PROMPTS = [
  '私は日本に行きたいです、もっと自然にするには？',
  '昨日、友達と映画を見に行きました。どこか不自然な点はある？',
  '先輩にメールで遅刻を伝える文章を作って添削してほしい。',
];

export const SenseiPage: React.FC = () => {
  const { selectedLevel, setActiveTab, setSelectedLevel, showToast } = useAppStore();

  const [persona, setPersona] = useState<SenseiPersona>('sensei_nugget');
  const [mode, setMode] = useState<SenseiMode>('explain');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPlayingVoice, setIsPlayingVoice] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Muat riwayat pesan saat mode berubah
  useEffect(() => {
    const history = loadChatHistory(mode);
    if (history.length > 0) {
      setMessages(history);
    } else {
      // Inisialisasi pesan sambutan bawaan sesuai mode dan persona
      const welcomeText =
        mode === 'explain'
          ? persona === 'sensei_nugget'
            ? 'Yo! Ada tata bahasa atau pola kalimat yang bikin kamu penasaran atau bingung nuansanya? Ketik di bawah atau pilih topik cepat.'
            : 'Halo! Senang bisa belajar bersamamu. Ada materi atau pola kalimat bahasa Jepang yang ingin kita bedah bersama hari ini? 🌸'
          : mode === 'roleplay'
          ? persona === 'sensei_nugget'
            ? 'Siap latihan ngomong langsung? Pilih salah satu skenario di atas, atau ketik situasi percakapan yang mau kita simulasikan!'
            : 'Ayo kita latihan percakapan santai! Jangan khawatir salah ya, kita latihan bareng pelan-pelan. Mau simulasi apa hari ini? ✨'
          : persona === 'sensei_nugget'
          ? 'Punya kalimat bahasa Jepang buatanmu sendiri? Tulis di sini, biar kita cek partikel dan tingkat kealamiannya sama-sama.'
          : 'Tulis kalimat bahasa Jepang yang sudah kamu buat, nanti kita periksa bersama agar terdengar lebih alami dan tepat! ✍️';

      const initialGreeting: ChatMessage = {
        id: `welcome-${mode}-${Date.now()}`,
        role: 'model',
        content: welcomeText,
        timestamp: Date.now(),
        modelUsed: 'gemini-3.8-flash',
      };
      setMessages([initialGreeting]);
    }
  }, [mode, persona]);

  // Simpan riwayat chat ke localStorage setiap update
  useEffect(() => {
    if (messages.length > 0) {
      saveChatHistory(mode, messages);
    }
  }, [messages, mode]);

  // Scroll otomatis ke bawah saat pesan baru tiba
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
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
      const reply = await sendSenseiMessage(newHistory, {
        persona,
        mode,
        userLevel: selectedLevel === 'all' ? 'n5' : selectedLevel,
      });

      setMessages((prev) => [...prev, reply]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        content: `Waduh, ada kendala saat menghubungi Sensei: ${err.message || 'Koneksi terganggu'}. Coba kirim ulang ya!`,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMsg]);
      showToast('Koneksi Sensei AI terganggu', '⚠️');
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleClearChat = () => {
    if (confirm('Hapus seluruh riwayat percakapan pada mode ini?')) {
      clearChatHistory(mode);
      setMessages([]);
      stopPersonaVoice();
      setIsPlayingVoice(null);
      showToast('Riwayat chat telah dibersihkan', '🗑️');
    }
  };

  const handlePlayVoice = (msgId: string, content: string) => {
    if (isPlayingVoice === msgId) {
      stopPersonaVoice();
      setIsPlayingVoice(null);
    } else {
      stopPersonaVoice();
      setIsPlayingVoice(msgId);
      speakPersona(content, persona, () => {
        setIsPlayingVoice(null);
      });
    }
  };

  const handleSuggestedAction = (action: NonNullable<ChatMessage['suggestedAction']>) => {
    if (action.level) {
      setSelectedLevel(action.level as any);
    }
    setActiveTab('quiz');
    showToast(`Membuka kuis latihan level ${action.level?.toUpperCase() || ''}`, '🎯');
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-3 sm:py-6 px-2 sm:px-4 space-y-4 sm:space-y-6 animate-in fade-in duration-300 overflow-x-hidden">
      {/* ── Header Studio & Persona Switcher ── */}
      <div className="bg-surface border border-accent/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-700/10 border border-amber-500/30 flex items-center justify-center text-2xl sm:text-3xl shrink-0 shadow-inner">
            {persona === 'sensei_nugget' ? '🍵' : '🌸'}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-appText-bright truncate">
                {persona === 'sensei_nugget' ? 'Sensei Nugget' : 'Senpai Aoi'}
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-accent/15 text-accent border border-accent/30 shrink-0">
                Gemini 3.8
              </span>
            </div>
            <p className="text-xs text-appText-muted truncate">
              {persona === 'sensei_nugget'
                ? 'Senpai to the point, bedah nuansa tanpa basa-basi'
                : 'Tutor ramah & sabar, analogi hangat bebas malu'}
            </p>
          </div>
        </div>

        {/* Persona Segmented Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-surface-2 border border-accent/15 rounded-xl w-full md:w-auto">
          <button
            onClick={() => setPersona('sensei_nugget')}
            className={`flex-1 md:flex-none px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              persona === 'sensei_nugget'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-appText-muted hover:text-appText-bright'
            }`}
          >
            <span>🍵</span>
            <span>Sensei Nugget</span>
          </button>
          <button
            onClick={() => setPersona('senpai_aoi')}
            className={`flex-1 md:flex-none px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              persona === 'senpai_aoi'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'text-appText-muted hover:text-appText-bright'
            }`}
          >
            <span>🌸</span>
            <span>Senpai Aoi</span>
          </button>
        </div>
      </div>

      {/* ── Mode Selection Navigation Tabs ── */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2 p-1 bg-surface-2 border border-accent/20 rounded-xl sm:rounded-2xl">
        <button
          onClick={() => setMode('explain')}
          className={`py-2 sm:py-2.5 px-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 min-w-0 ${
            mode === 'explain'
              ? 'bg-accent text-bg shadow-sm'
              : 'text-appText-muted hover:text-appText-bright'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
          <span className="truncate">Penjelasan & Nuansa</span>
        </button>

        <button
          onClick={() => setMode('roleplay')}
          className={`py-2 sm:py-2.5 px-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 min-w-0 ${
            mode === 'roleplay'
              ? 'bg-accent text-bg shadow-sm'
              : 'text-appText-muted hover:text-appText-bright'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
          <span className="truncate">Roleplay Percakapan</span>
        </button>

        <button
          onClick={() => setMode('correct')}
          className={`py-2 sm:py-2.5 px-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 min-w-0 ${
            mode === 'correct'
              ? 'bg-accent text-bg shadow-sm'
              : 'text-appText-muted hover:text-appText-bright'
          }`}
        >
          <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
          <span className="truncate">Koreksi Kalimat</span>
        </button>
      </div>

      {/* ── Quick Starter Pills Ribbons ── */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1 max-w-full">
        {mode === 'roleplay' &&
          ROLEPLAY_SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              onClick={() => handleSendMessage(sc.prompt)}
              className="px-3 py-1.5 rounded-full bg-surface-2 hover:bg-surface-3 border border-accent/20 hover:border-accent/40 text-xs font-semibold text-appText-bright whitespace-nowrap shrink-0 transition-all active:scale-95 shadow-xs"
            >
              {sc.title}
            </button>
          ))}

        {mode === 'explain' &&
          EXPLAIN_PROMPTS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p)}
              className="px-3 py-1.5 rounded-full bg-surface-2 hover:bg-surface-3 border border-accent/20 hover:border-accent/40 text-xs font-semibold text-appText-bright whitespace-nowrap shrink-0 transition-all active:scale-95 shadow-xs"
            >
              💡 {p.slice(0, 32)}...
            </button>
          ))}

        {mode === 'correct' &&
          CORRECT_PROMPTS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p)}
              className="px-3 py-1.5 rounded-full bg-surface-2 hover:bg-surface-3 border border-accent/20 hover:border-accent/40 text-xs font-semibold text-appText-bright whitespace-nowrap shrink-0 transition-all active:scale-95 shadow-xs"
            >
              ✍️ {p.slice(0, 28)}...
            </button>
          ))}
      </div>

      {/* ── Main Chat Conversation Flow ── */}
      <div className="bg-surface border border-accent/20 rounded-2xl sm:rounded-3xl p-3 sm:p-5 min-h-[380px] max-h-[62vh] overflow-y-auto space-y-4 shadow-inner">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 sm:gap-3.5 ${
                isUser ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              {/* Avatar Icon */}
              <div
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-sm shrink-0 border ${
                  isUser
                    ? 'bg-accent/20 border-accent/40 text-accent'
                    : persona === 'sensei_nugget'
                    ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                    : 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : persona === 'sensei_nugget' ? '🍵' : '🌸'}
              </div>

              {/* Message Bubble Card */}
              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                  isUser
                    ? 'bg-accent text-bg font-medium rounded-tr-xs'
                    : 'bg-surface-2 border border-accent/15 text-appText-bright rounded-tl-xs space-y-2.5'
                }`}
              >
                {/* Text Content */}
                <div className="whitespace-pre-wrap break-words">{msg.content}</div>

                {/* Sensei Bottom Action Affordances */}
                {!isUser && (
                  <div className="pt-2 border-t border-accent/10 flex flex-wrap items-center justify-between gap-2 text-[11px] text-appText-muted">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePlayVoice(msg.id, msg.content)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-all active:scale-95 ${
                          isPlayingVoice === msg.id
                            ? 'bg-accent text-bg border-accent font-bold'
                            : 'bg-surface-3 hover:bg-surface border-accent/20 text-appText-muted hover:text-appText-bright'
                        }`}
                        title="Dengarkan pelafalan bahasa Jepang"
                      >
                        {isPlayingVoice === msg.id ? (
                          <>
                            <VolumeX className="w-3 h-3" />
                            <span>Stop Audio</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3 h-3" />
                            <span>Lafalkan</span>
                          </>
                        )}
                      </button>

                      {msg.modelUsed && (
                        <span className="text-[10px] text-appText-muted/70">
                          via {msg.modelUsed}
                        </span>
                      )}
                    </div>

                    {msg.suggestedAction && (
                      <button
                        onClick={() => handleSuggestedAction(msg.suggestedAction!)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-accent/15 hover:bg-accent/25 border border-accent/30 text-accent font-bold transition-all active:scale-95"
                      >
                        <span>{msg.suggestedAction.label}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-start gap-2.5 sm:gap-3.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center text-sm shrink-0 animate-pulse">
              {persona === 'sensei_nugget' ? '🍵' : '🌸'}
            </div>
            <div className="bg-surface-2 border border-accent/15 rounded-2xl rounded-tl-xs px-4 py-3 flex items-center gap-2 text-xs text-appText-muted">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-accent" />
              <span>{persona === 'sensei_nugget' ? 'Sensei sedang meracik jawaban...' : 'Senpai sedang mengetik...'}</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── Input Box & Action Controls ── */}
      <div className="bg-surface border border-accent/20 rounded-2xl p-2.5 sm:p-3 shadow-md space-y-2">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder={
              mode === 'explain'
                ? 'Tanyakan pola tata bahasa, kanji, atau beda nuansa... (Tekan Enter)'
                : mode === 'roleplay'
                ? 'Balas percakapan dalam bahasa Jepang atau Indonesia... (Tekan Enter)'
                : 'Tulis kalimat bahasa Jepangmu di sini untuk diperiksa... (Tekan Enter)'
            }
            rows={2}
            className="flex-1 bg-surface-2 border border-accent/15 focus:border-accent rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-appText-bright placeholder:text-appText-muted/60 focus:outline-hidden resize-none transition-colors"
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim() || isLoading}
            className={`w-11 h-11 rounded-xl flex items-center justify-center text-bg shrink-0 transition-all shadow-sm active:scale-95 ${
              inputText.trim() && !isLoading
                ? 'bg-accent hover:bg-accent-hot'
                : 'bg-surface-3 text-appText-muted cursor-not-allowed opacity-50'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Utility Bar */}
        <div className="flex items-center justify-between px-1 text-[11px] text-appText-muted">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Mode Aktif: Level {selectedLevel.toUpperCase()}</span>
          </div>

          <button
            onClick={handleClearChat}
            className="inline-flex items-center gap-1 text-appText-muted hover:text-rose-400 transition-colors p-1"
            title="Bersihkan riwayat percakapan"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Bersihkan Chat</span>
          </button>
        </div>
      </div>
    </div>
  );
};
