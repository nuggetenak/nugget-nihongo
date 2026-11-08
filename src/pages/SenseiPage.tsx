// ══════════════════════════════════════════════════════════════════
//  SenseiPage.tsx — Sensei AI Dojo Studio (Gemini 3.8 Flash)
//  Nugget Nihongo · Persona-Driven Japanese Learning Assistant
// ══════════════════════════════════════════════════════════════════

import React, { useState, useEffect, useRef } from 'react';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
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
  Copy,
  Check,
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
import { IrasutoyaImage } from '../components/common/IrasutoyaImage';

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
    prompt: 'Halo! Saya sedang membayar onigiri dan teh hijau di kasir 7-Eleven. Tolong layani saya dan tanyakan apakah saya butuh kantung plastik atau struk.',
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

function formatModelName(model?: string): string {
  if (!model) return 'Sensei AI';
  if (model.includes('qwen')) return 'Sensei Neural 72B';
  if (model.includes('llama')) return 'Sensei Llama 70B';
  if (model.includes('deepseek')) return 'Sensei DeepSeek';
  if (model.includes('gemini-3.8')) return 'Sensei Flash 3.8';
  if (model.includes('gemini')) return 'Sensei Flash';
  return 'Sensei AI';
}

function getSenseiAvatarAsset(persona: SenseiPersona, expression?: string): string {
  if (persona === 'senpai_aoi') return 'senpai_studying';
  if (expression === 'praise') return 'sensei_praise';
  if (expression === 'thinking') return 'sensei_thinking';
  if (expression === 'ojigi') return 'sensei_ojigi';
  return 'sensei_teaching';
}

/**
 * Format helper for Japanese learning text
 * Splits paragraphs, highlights **bold** targets, applies font-jp, and renders furigana
 */
function renderMessageContent(content: string, isUser: boolean, showFurigana: boolean = true) {
  if (isUser) {
    return <div className="whitespace-pre-wrap break-words">{content}</div>;
  }

  const paragraphs = content.split(/\n\n+/);

  return (
    <div className="space-y-2.5 text-xs sm:text-sm leading-relaxed">
      {paragraphs.map((para, pIdx) => {
        const lines = para.split('\n');
        return (
          <p key={pIdx} className="leading-relaxed break-words">
            {lines.map((line, lIdx) => (
              <React.Fragment key={lIdx}>
                {lIdx > 0 && <br />}
                {renderFormattedLine(line, showFurigana)}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}

function renderFormattedLine(line: string, showFurigana: boolean) {
  const tokenRegex = /(\*\*.*?\*\*|[一-龯々〆ヵヶ]+[【\[（\(][ぁ-んァ-ヶー]+[】\]）\)]|[一-龯々〆ヵヶぁ-んァ-ヶー「」『』〜ー]+)/g;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      parts.push(line.slice(lastIndex, match.index));
    }

    const token = match[0];

    if (token.startsWith('**') && token.endsWith('**') && token.length >= 4) {
      const inner = token.slice(2, -2);
      parts.push(
        <strong key={match.index} className="font-bold text-accent">
          {inner}
        </strong>
      );
    } else if (/[一-龯々〆ヵヶ]+[【\[（\(][ぁ-んァ-ヶー]+[】\]）\)]/.test(token)) {
      const rubyMatch = token.match(/^([一-龯々〆ヵヶ]+)[【\[（\(]([ぁ-んァ-ヶー]+)[】\]）\)]$/);
      if (rubyMatch) {
        const [, kanji, reading] = rubyMatch;
        if (showFurigana) {
          parts.push(
            <ruby key={match.index} lang="ja" className="font-jp [ruby-position:over] px-0.5 leading-normal">
              {kanji}
              <rp className="text-[0em] opacity-0">(</rp>
              <rt className="text-[0.65em] text-accent/80 font-normal select-none -mb-0.5">{reading}</rt>
              <rp className="text-[0em] opacity-0">)</rp>
            </ruby>
          );
        } else {
          parts.push(
            <span key={match.index} className="font-jp">
              {kanji}
            </span>
          );
        }
      } else {
        parts.push(
          <span key={match.index} className="font-jp">
            {token}
          </span>
        );
      }
    } else {
      parts.push(
        <span key={match.index} className="font-jp">
          {token}
        </span>
      );
    }

    lastIndex = tokenRegex.lastIndex;
  }

  if (lastIndex < line.length) {
    parts.push(line.slice(lastIndex));
  }

  return parts;
}

export const SenseiPage: React.FC = () => {
  const { selectedLevel, setActiveTab, setSelectedLevel, showToast, showFurigana } = useAppStore();

  const [persona, setPersona] = useState<SenseiPersona>('sensei_nugget');
  const [mode, setMode] = useState<SenseiMode>('explain');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPlayingVoice, setIsPlayingVoice] = useState<string | null>(null);
  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Lock body scroll while clear confirm dialog is active
  useBodyScrollLock(isClearConfirmOpen);

  // Close clear confirm modal on Escape key
  useEffect(() => {
    if (!isClearConfirmOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsClearConfirmOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isClearConfirmOpen]);

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

      const activeKey = typeof window !== 'undefined' ? localStorage.getItem('nn_gemini_api_key') || '' : '';
      const isOR = activeKey.startsWith('sk-or-') || !activeKey;

      const initialGreeting: ChatMessage = {
        id: `welcome-${mode}-${Date.now()}`,
        role: 'model',
        content: welcomeText,
        timestamp: Date.now(),
        modelUsed: isOR ? 'qwen/qwen-2.5-72b-instruct' : 'gemini-3.8-flash',
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
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }
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

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(Math.max(inputRef.current.scrollHeight, 48), 120)}px`;
    }
  };

  const handleClearChat = () => {
    setIsClearConfirmOpen(true);
  };

  const handleConfirmClear = () => {
    clearChatHistory(mode);
    setMessages([]);
    stopPersonaVoice();
    setIsPlayingVoice(null);
    setIsClearConfirmOpen(false);
    showToast('Riwayat chat telah dibersihkan', '🗑️');
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

  const handleCopyMessage = async (msgId: string, content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(msgId);
      showToast('Teks berhasil disalin ke clipboard', '📋');
      setTimeout(() => {
        setCopiedId((curr) => (curr === msgId ? null : curr));
      }, 2000);
    } catch {
      showToast('Gagal menyalin teks', '⚠️');
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
    <div className="w-full max-w-full sm:max-w-4xl mx-auto py-3 sm:py-6 px-2 sm:px-4 pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-12 space-y-3 sm:space-y-4 animate-in fade-in duration-300 overflow-x-hidden min-w-0">
      {/* ── Header Studio & Persona Switcher ── */}
      <div className="bg-surface border border-accent/20 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-3.5">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <div
            className={`w-11 h-11 sm:w-13 sm:h-13 rounded-2xl border flex items-center justify-center text-2xl sm:text-3xl shrink-0 shadow-inner transition-colors ${
              persona === 'sensei_nugget'
                ? 'bg-amber-500/15 border-amber-500/30'
                : 'bg-rose-500/15 border-rose-500/30'
            } overflow-hidden`}
          >
            {persona === 'sensei_nugget' ? (
              <IrasutoyaImage assetId="sensei_teaching" className="w-9 h-9" containerClassName="w-9 h-9 shrink-0" animateFloat />
            ) : (
              <IrasutoyaImage assetId="senpai_studying" className="w-9 h-9" containerClassName="w-9 h-9 shrink-0" animateFloat />
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base sm:text-lg font-bold text-appText-bright truncate">
                {persona === 'sensei_nugget' ? 'Sensei Nugget' : 'Senpai Aoi'}
              </h1>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>AI Tutor Siap</span>
              </span>
            </div>
            <p className="text-xs text-appText-muted truncate">
              {persona === 'sensei_nugget'
                ? 'Sensei ramah & suportif, analogi hangat dan konteks budaya'
                : 'Senpai to the point, percakapan alami dan realitas dunia kerja'}
            </p>
          </div>
        </div>

        {/* Persona Segmented Switcher */}
        <div className="flex items-center gap-1 p-1 bg-surface-2 border border-accent/15 rounded-xl w-full md:w-auto" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={persona === 'sensei_nugget'}
            onClick={() => setPersona('sensei_nugget')}
            className={`min-h-[40px] flex-1 md:flex-none px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-95 ${
              persona === 'sensei_nugget'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-appText-muted hover:text-appText-bright hover:bg-surface-3/50'
            }`}
          >
            <span className="text-sm">🍵</span>
            <span>Sensei Nugget</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={persona === 'senpai_aoi'}
            onClick={() => setPersona('senpai_aoi')}
            className={`min-h-[40px] flex-1 md:flex-none px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-95 ${
              persona === 'senpai_aoi'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'text-appText-muted hover:text-appText-bright hover:bg-surface-3/50'
            }`}
          >
            <span className="text-sm">🌸</span>
            <span>Senpai Aoi</span>
          </button>
        </div>
      </div>

      {/* ── Mode Selection Navigation Tabs ── */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2 p-1 bg-surface-2 border border-accent/20 rounded-xl sm:rounded-2xl" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'explain'}
          onClick={() => setMode('explain')}
          className={`min-h-[44px] py-2 sm:py-2.5 px-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 min-w-0 active:scale-95 ${
            mode === 'explain'
              ? 'bg-accent text-bg shadow-sm'
              : 'text-appText-muted hover:text-appText-bright hover:bg-surface-3/50'
          }`}
        >
          <span className="text-base shrink-0">💡</span>
          <span className="truncate hidden sm:inline">Penjelasan & Nuansa</span>
          <span className="truncate sm:hidden">Penjelasan</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={mode === 'roleplay'}
          onClick={() => setMode('roleplay')}
          className={`min-h-[44px] py-2 sm:py-2.5 px-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 min-w-0 active:scale-95 ${
            mode === 'roleplay'
              ? 'bg-accent text-bg shadow-sm'
              : 'text-appText-muted hover:text-appText-bright hover:bg-surface-3/50'
          }`}
        >
          <span className="text-base shrink-0">🎭</span>
          <span className="truncate hidden sm:inline">Roleplay Percakapan</span>
          <span className="truncate sm:hidden">Roleplay</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={mode === 'correct'}
          onClick={() => setMode('correct')}
          className={`min-h-[44px] py-2 sm:py-2.5 px-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 min-w-0 active:scale-95 ${
            mode === 'correct'
              ? 'bg-accent text-bg shadow-sm'
              : 'text-appText-muted hover:text-appText-bright hover:bg-surface-3/50'
          }`}
        >
          <span className="text-base shrink-0">✍️</span>
          <span className="truncate hidden sm:inline">Koreksi Kalimat</span>
          <span className="truncate sm:hidden">Koreksi</span>
        </button>
      </div>

      {/* ── Quick Starter Pills Ribbons ── */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1 max-w-full">
        <span className="text-xs font-semibold text-appText-muted shrink-0 pl-1">
          {mode === 'explain' ? '💡 Tanya Cepat:' : mode === 'roleplay' ? '🎭 Skenario:' : '✍️ Contoh Kalimat:'}
        </span>
        {mode === 'roleplay' &&
          ROLEPLAY_SCENARIOS.map((sc) => (
            <button
              type="button"
              key={sc.id}
              onClick={() => handleSendMessage(sc.prompt)}
              className="min-h-[40px] px-3.5 py-2 card-interactive-lift rounded-full bg-surface-2 hover:bg-surface-3 border border-accent/25 hover:border-accent text-xs font-semibold text-appText-bright whitespace-nowrap shrink-0 transition-all active:scale-95 shadow-xs flex items-center justify-center gap-1.5"
            >
              <span>{sc.title}</span>
            </button>
          ))}

        {mode === 'explain' &&
          EXPLAIN_PROMPTS.map((p, idx) => (
            <button
              type="button"
              key={idx}
              onClick={() => handleSendMessage(p)}
              className="min-h-[40px] px-3.5 py-2 card-interactive-lift rounded-full bg-surface-2 hover:bg-surface-3 border border-accent/25 hover:border-accent text-xs font-semibold text-appText-bright whitespace-nowrap shrink-0 transition-all active:scale-95 shadow-xs flex items-center justify-center gap-1.5"
            >
              <span className="text-accent">✦</span>
              <span>{p}</span>
            </button>
          ))}

        {mode === 'correct' &&
          CORRECT_PROMPTS.map((p, idx) => (
            <button
              type="button"
              key={idx}
              onClick={() => handleSendMessage(p)}
              className="min-h-[40px] px-3.5 py-2 card-interactive-lift rounded-full bg-surface-2 hover:bg-surface-3 border border-accent/25 hover:border-accent text-xs font-semibold text-appText-bright whitespace-nowrap shrink-0 transition-all active:scale-95 shadow-xs flex items-center justify-center gap-1.5 font-jp"
            >
              <span className="text-accent font-sans">✍️</span>
              <span>{p}</span>
            </button>
          ))}
      </div>

      {/* ── Main Chat Conversation Flow ── */}
      <div className="bg-surface border border-accent/20 rounded-2xl sm:rounded-3xl p-3 sm:p-5 min-h-[320px] max-h-[52vh] sm:max-h-[58vh] overflow-y-auto space-y-4 shadow-inner overscroll-contain">
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
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-sm shrink-0 border overflow-hidden ${
                  isUser
                    ? 'bg-accent/20 border-accent/40 text-accent'
                    : persona === 'sensei_nugget'
                    ? 'bg-amber-500/20 border-amber-500/40 text-amber-800 dark:text-amber-300 font-bold'
                    : 'bg-rose-500/20 border-rose-500/40 text-rose-700 dark:text-rose-300 font-bold'
                }`}
              >
                {isUser ? (
                  <User className="w-4 h-4" />
                ) : (
                  <IrasutoyaImage
                    assetId={getSenseiAvatarAsset(persona, msg.expression) as any}
                    className="w-7 h-7"
                    containerClassName="w-7 h-7 shrink-0"
                    animateFloat
                  />
                )}
              </div>

              {/* Message Bubble Card */}
              <div
                className={`max-w-[88%] sm:max-w-[80%] card-interactive-lift rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 leading-relaxed shadow-xs ${
                  isUser
                    ? 'bg-accent text-bg font-medium rounded-tr-xs'
                    : 'bg-surface-2 border border-accent/15 text-appText-bright rounded-tl-xs space-y-3'
                }`}
              >
                {/* Formatted Content */}
                {renderMessageContent(msg.content, isUser, showFurigana)}

                {/* Tutor Bottom Action Bar */}
                {!isUser && (
                  <div className="pt-2.5 border-t border-accent/10 flex flex-wrap items-center justify-between gap-2 text-xs text-appText-muted">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {/* Audio Pronunciation Button */}
                      <button
                        type="button"
                        onClick={() => handlePlayVoice(msg.id, msg.content)}
                        className={`min-h-[40px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all active:scale-95 text-xs ${
                          isPlayingVoice === msg.id
                            ? 'bg-accent text-bg border-accent font-bold shadow-xs'
                            : 'bg-surface-3 hover:bg-surface border-accent/20 text-appText-muted hover:text-appText-bright'
                        }`}
                        title="Dengarkan pelafalan audio bahasa Jepang"
                        aria-label={isPlayingVoice === msg.id ? 'Hentikan audio pelafalan' : 'Dengarkan pelafalan bahasa Jepang'}
                      >
                        {isPlayingVoice === msg.id ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5" />
                            <span>Stop Audio</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Lafalkan</span>
                          </>
                        )}
                      </button>

                      {/* Copy to Clipboard Button */}
                      <button
                        type="button"
                        onClick={() => handleCopyMessage(msg.id, msg.content)}
                        className="min-h-[40px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-accent/20 bg-surface-3 hover:bg-surface text-appText-muted hover:text-appText-bright transition-all active:scale-95 text-xs"
                        title="Salin jawaban ke clipboard"
                        aria-label="Salin jawaban"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                            <span className="text-emerald-700 dark:text-emerald-400 font-bold">Tersalin</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Salin</span>
                          </>
                        )}
                      </button>

                      {/* AI Engine Badge (Friendly, no raw jargon) */}
                      <span className="text-xs text-appText-muted font-mono inline-flex items-center gap-1 px-1">
                        <Sparkles className="w-3 h-3 text-accent inline" />
                        <span>Sensei AI</span>
                        {msg.tokensUsed ? <span className="opacity-60">· {msg.tokensUsed} tokens</span> : null}
                      </span>
                    </div>

                    {/* Suggested Action Pill */}
                    {msg.suggestedAction && (
                      <button
                        type="button"
                        onClick={() => handleSuggestedAction(msg.suggestedAction!)}
                        className="min-h-[40px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-accent/15 hover:bg-accent/25 border border-accent/30 text-accent font-bold transition-all active:scale-95 text-xs"
                      >
                        <span>{msg.suggestedAction.label}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
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
          <div className="flex items-start gap-2.5 sm:gap-3.5 animate-in fade-in duration-200">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-800 dark:text-amber-300 font-bold flex items-center justify-center text-sm shrink-0 overflow-hidden">
              {persona === 'sensei_nugget' ? (
                <IrasutoyaImage assetId="sensei_thinking" className="w-7 h-7" containerClassName="w-7 h-7 shrink-0" animateFloat />
              ) : (
                <IrasutoyaImage assetId="senpai_studying" className="w-7 h-7" containerClassName="w-7 h-7 shrink-0" animateFloat />
              )}
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
      <div className="bg-surface border border-accent/20 rounded-2xl p-2.5 sm:p-3.5 shadow-md space-y-2.5">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={inputText}
            onChange={handleInputChange}
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
            className="flex-1 bg-surface-2 border border-accent/15 focus:border-accent rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-appText-bright placeholder:text-appText-muted focus:outline-none resize-none transition-colors max-h-[120px] min-h-[48px]"
          />

          <button
            type="button"
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim() || isLoading}
            aria-label="Kirim pesan"
            className={`min-w-[44px] min-h-[44px] w-11 h-11 rounded-xl flex items-center justify-center text-bg shrink-0 transition-all shadow-sm active:scale-95 ${
              inputText.trim() && !isLoading
                ? 'bg-accent hover:bg-accent-hot cursor-pointer'
                : 'bg-surface-3 text-appText-muted/40 cursor-not-allowed opacity-60'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Utility Bar */}
        <div className="flex items-center justify-between px-1 text-xs text-appText-muted gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-medium">
              Target Level:{' '}
              <span className="font-bold text-accent">
                {selectedLevel === 'all' ? 'Semua (N5–N1)' : selectedLevel.toUpperCase()}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-appText-muted hidden sm:inline">
              Enter ↵ untuk kirim · Shift+Enter baris baru
            </span>
            <button
              type="button"
              onClick={handleClearChat}
              className="min-h-[40px] min-w-[40px] px-2.5 py-1.5 rounded-xl inline-flex items-center justify-center gap-1.5 text-appText-muted hover:text-rose-400 bg-surface-2/60 hover:bg-surface-3 border border-accent/10 transition-colors active:scale-95"
              title="Bersihkan riwayat percakapan mode ini"
              aria-label="Bersihkan riwayat percakapan"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Bersihkan Chat</span>
            </button>
          </div>
        </div>
      </div>

      {/* Non-Blocking Chat Clear Confirmation Modal */}
      {isClearConfirmOpen && (
        <div
          onClick={() => setIsClearConfirmOpen(false)}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-surface border border-accent/25 rounded-t-3xl sm:rounded-2xl p-6 space-y-4 shadow-2xl animate-in slide-in-from-bottom-4 duration-200"
          >
            <div className="w-12 h-1.5 rounded-full bg-accent/25 mx-auto -mt-2 mb-2 sm:hidden" />
            <div className="flex items-center gap-3 text-red-500">
              <div className="w-10 h-10 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-xl">
                🗑️
              </div>
              <div>
                <h3 className="font-bold text-sm text-appText-bright">Hapus Riwayat Chat</h3>
                <p className="text-xs text-appText-muted">Tindakan ini tidak dapat dibatalkan.</p>
              </div>
            </div>
            <p className="text-xs text-appText-muted leading-relaxed">
              Apakah kamu yakin ingin membersihkan seluruh percakapan mode ini bersama {persona === 'sensei_nugget' ? 'Sensei Nugget' : 'Senpai Aoi'}?
            </p>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setIsClearConfirmOpen(false)}
                className="min-h-[44px] px-4 py-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 text-xs font-semibold text-appText-muted transition-colors active:scale-95"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmClear}
                className="min-h-[44px] px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-md active:scale-95"
              >
                Ya, Hapus Riwayat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};