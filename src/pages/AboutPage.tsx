import React, { useState } from 'react';
import {
  Heart,
  ShieldCheck,
  Sparkles,
  BookOpen,
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  Layers,
  Brain,
  Sprout,
  Compass,
  ArrowRight,
  ExternalLink,
  Code2,
  Cpu,
  GraduationCap,
  Volume2,
  History,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { APP_VERSION, APP_RELEASE_NAME } from '../config/version';

interface FAQItem {
  id: string;
  category: 'umum' | 'fsrs' | 'materi' | 'cloud' | 'teknis';
  q: string;
  a: string;
}

const FAQ_LIST: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'umum',
    q: 'Apa itu Nugget Nihongo dan bagaimana filosofinya?',
    a: 'Nugget Nihongo adalah aplikasi belajar bahasa Jepang berkonsep "teman belajar" — hangat, sabar, ramah pemula, dan bebas tekanan. Kami tidak menggunakan sistem "nyawa" (hearts) yang menghukum kesalahan atau papan peringkat publik yang membuat cemas. Kamu belajar dengan kecepatanmu sendiri dengan pendekatan potongan kecil (bite-sized) yang menyenangkan.',
  },
  {
    id: 'faq-2',
    category: 'umum',
    q: 'Apakah aplikasi ini benar-benar bisa dipakai 100% offline tanpa kuota?',
    a: 'Ya, 100%! Seluruh basis data (10.500+ kosakata dan 850+ pola tata bahasa), mesin evaluasi kuis, konjugasi verba, pelacak memori FSRS, dan sintesis suara pelafalan (Web Speech API) berjalan secara lokal di perangkatmu. Kamu bisa belajar lancar saat naik pesawat, kereta bawah tanah, atau di daerah tanpa sinyal internet.',
  },
  {
    id: 'faq-3',
    category: 'fsrs',
    q: 'Apa itu FSRS v4 dan apa bedanya dengan Anki lama atau Duolingo?',
    a: 'FSRS (Free Spaced Repetition Scheduler) adalah sistem jadwal review memori modern. Berbeda dari sistem flashcard lama yang kaku, FSRS memperhitungkan seberapa kuat ingatanmu pada tiap kata dan tingkat kesulitannya. Hasilnya, kamu hanya mengulang kartu tepat di saat otakmu hampir lupa, sehingga waktu belajarmu jauh lebih hemat dan efisien.',
  },
  {
    id: 'faq-4',
    category: 'materi',
    q: 'Apa itu Kurikulum Orisinal Nugget Nihongo dan apa bedanya dengan Jalur Buku?',
    a: 'Kurikulum Orisinal Nugget Nihongo adalah jalur belajar 8 trek mandiri (JLPT N5–N1 & SSW Kaigo, Restoran, Konstruksi) dengan 74 unit dan 155 pelajaran bertahap yang diselaraskan dengan standar Can-Do CEFR-J dan JLPT. Di samping itu, tersedia pula Jalur Kamus & Indeks, Jalur 9 Buku Teks pendamping kelas (Minna no Nihongo, Genki, Sou Matome, dll.), Dojo Kanji, serta Jalur Nol (Freeway).',
  },
  {
    id: 'faq-4b',
    category: 'materi',
    q: 'Apa itu Jalur Vokasional SSW (Tokutei Ginou) dan sektor apa saja yang tersedia?',
    a: 'Jalur Vokasional SSW membekali calon pekerja terampil di Jepang dengan bahasa kerja nyata: (1) SSW Kaigo: Komunikasi empatik menyapa lansia dan laporan situasi darurat; (2) SSW Restoran & Pengolahan: Standar kebersihan, keamanan pangan, dan etika pelayanan; (3) SSW Konstruksi: Keselamatan kerja di lapangan proyek (K3), aba-aba kerja, dan pencegahan bahaya.',
  },
  {
    id: 'faq-4c',
    category: 'materi',
    q: 'Bagaimana Nugget Nihongo membantu mengatasi kebiasaan salah kaprah dari bahasa Indonesia?',
    a: 'Melalui 300+ catatan jebakan bahasa yang sering dialami orang Indonesia, Nugget Nihongo langsung menandai titik salah kaprah (seperti menyisipkan kata "adalah" di tengah kalimat atau tertukar partikel wa vs ga). Kamu juga bisa memilih penyesuaian logat daerahmu di Pengaturan untuk menyempurnakan pelafalan nada Tokyo (Pitch Accent).',
  },
  {
    id: 'faq-5',
    category: 'umum',
    q: 'Bagaimana cara kerja Kebun Kata (Kanji Growth Garden)?',
    a: 'Kebun Kata adalah metafora visual untuk merawat memori kanji. Setiap kali menyelesaikan sesi latihan di Arena Kuis, kamu memperoleh tetes air segar. Tetes air ini bisa kamu siramkan ke tanaman kanji yang dipelajari. Tanaman akan bertumbuh dari Tunas (Stage 0), Daun, Kuncup, hingga Mekar Penuh (Stage 4) seiring ingatanmu semakin kuat.',
  },
  {
    id: 'faq-6',
    category: 'teknis',
    q: 'Bagaimana cara menyembunyikan atau menampilkan Furigana dan Romaji?',
    a: 'Kamu bisa mengaturnya kapan saja di menu Pengaturan. Selain itu, di desktop kamu cukup menekan tombol keyboard "F" untuk toggle Furigana, atau "R" untuk toggle Romaji secara instan. Pemula disarankan membaca dengan furigana, dan menyembunyikannya perlahan saat sudah terbiasa dengan kanji.',
  },
  {
    id: 'faq-7',
    category: 'cloud',
    q: 'Apakah progres belajar saya bisa hilang jika ganti browser atau HP?',
    a: 'Secara default data tersimpan di penyimpanan browser lokal perangkatmu. Agar progres tidak hilang, kamu punya dua opsi aman: (1) Ekspor berkas cadangan JSON di menu Pengaturan dan impor ke perangkat baru, atau (2) Hubungkan akun Supabase Cloud di menu Pengaturan agar kartu FSRS, streak, dan tanaman kebun tersinkronisasi otomatis antar HP dan Laptop.',
  },
  {
    id: 'faq-8',
    category: 'cloud',
    q: 'Bagaimana cara kerja sinkronisasi cloud dengan Akun Google?',
    a: 'Cukup ketuk tombol "Masuk dengan Akun Google" di menu Pengaturan. Progres belajar, kartu FSRS, streak harian, dan kebun kanjimu otomatis tersinkronisasi antar perangkat (HP, tablet, dan laptop) tanpa perlu memasukkan kunci API database apa pun. Selama dalam kondisi offline, seluruh data tetap tersimpan 100% aman di perangkat lokalmu.',
  },
  {
    id: 'faq-9',
    category: 'materi',
    q: 'Apakah ada suara pelafalan penutur asli untuk tiap kosakata dan kalimat?',
    a: 'Ya! Setiap kartu kosakata, pola tata bahasa, dan contoh kalimat memiliki ikon speaker audio. Kami memanfaatkan mesin Web Speech API bahasa Jepang beraksen Tokyo dengan kecepatan artikulasi pedagogis (0.9x) agar pemula dapat menangkap nada dan pelafalan aksen dengan jelas.',
  },
  {
    id: 'faq-10',
    category: 'teknis',
    q: 'Bagaimana cara menginstall Nugget Nihongo ke layar utama ponsel (PWA)?',
    a: 'Di Google Chrome Android: ketuk menu tiga titik (⋮) di pojok kanan atas, lalu pilih "Tambahkan ke Layar Utama" (Add to Home screen). Di Safari iOS: ketuk tombol Bagikan (Share) berbentuk kotak berpanah ke atas di bagian bawah, lalu pilih "Tambah ke Layar Utama" (Add to Home Screen). Aplikasi akan terbuka layar penuh seperti aplikasi native.',
  },
  {
    id: 'faq-11',
    category: 'umum',
    q: 'Kapan fitur Sensei AI (Tutor Virtual) akan dirilis?',
    a: 'Modul Sensei AI saat ini berstatus "Segera Hadir / Coming Soon 🍵". Kami sedang merancang arsitektur tutor percakapan yang cerdas namun tetap menjaga privasi dan tidak membebani kuota pengguna. Tunggu pembaruan pada rilis mendatang!',
  },
  {
    id: 'faq-12',
    category: 'fsrs',
    q: 'Berapa waktu belajar harian yang direkomendasikan?',
    a: 'Kami sangat merekomendasikan prinsip pembelajaran mikro: luangkan waktu 5 hingga 10 menit setiap hari (misalnya saat bangun tidur atau perjalanan kereta). Konsistensi menjaga streak harian terbukti jauh lebih kuat membentuk memori jangka panjang daripada belajar 3 jam maraton sekali seminggu.',
  },
];

export const AboutPage: React.FC = () => {
  const { openOnboarding, openFeatureGuide, openPatchNotes, setActiveTab } = useAppStore();
  const [faqSearch, setFaqSearch] = useState('');
  const [selectedFaqCategory, setSelectedFaqCategory] = useState<string>('all');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-1');

  const filteredFaqs = FAQ_LIST.filter((item) => {
    const matchesCat = selectedFaqCategory === 'all' || item.category === selectedFaqCategory;
    const query = faqSearch.toLowerCase().trim();
    const matchesQuery =
      !query ||
      item.q.toLowerCase().includes(query) ||
      item.a.toLowerCase().includes(query);
    return matchesCat && matchesQuery;
  });

  const toggleFaq = (id: string) => {
    setExpandedFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-10 animate-in fade-in duration-300">
      {/* Hero Presentation Header */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-amber-950/70 via-amber-900/40 to-surface border border-accent/25 p-4 sm:p-10 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
          <div className="max-w-xl space-y-2.5 sm:space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-accent font-bold text-xs">
              <img src="/icons/icon-192.png" alt="Logo" className="w-4 h-4 rounded-full object-cover" />
              <span>Nugget Nihongo · {APP_VERSION} ({APP_RELEASE_NAME})</span>
            </div>

            <h1 className="text-xl sm:text-4xl font-extrabold text-appText-bright tracking-tight leading-tight">
              Tentang Nugget Nihongo
            </h1>

            <p className="text-xs sm:text-sm text-appText-muted leading-relaxed">
              Aplikasi pendamping belajar bahasa Jepang yang hangat, santai, dan bebas rasa bersalah. Dibangun di atas riset memori modern FSRS v4 dan kurikulum JLPT N5–N1 terstandar.
            </p>

            <div className="pt-1 sm:pt-2 flex flex-wrap gap-2 sm:gap-3">
              <button
                onClick={openOnboarding}
                className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-accent hover:bg-accent-hot text-bg font-bold text-xs flex items-center gap-1.5 sm:gap-2 transition-all shadow-glow active:scale-95 min-h-[40px]"
              >
                <span>Mulai Tur Aplikasi</span>
                <Compass className="w-4 h-4" />
              </button>

              <button
                onClick={openFeatureGuide}
                className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 text-appText-bright border border-accent/25 font-bold text-xs flex items-center gap-1.5 sm:gap-2 transition-all active:scale-95 min-h-[40px]"
              >
                <span>Panduan Fitur</span>
                <BookOpen className="w-4 h-4 text-accent" />
              </button>

              <button
                onClick={openPatchNotes}
                className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 text-appText-bright border border-accent/25 font-bold text-xs flex items-center gap-1.5 sm:gap-2 transition-all active:scale-95 min-h-[40px]"
              >
                <span>Catatan Rilis</span>
                <History className="w-4 h-4 text-accent-hot" />
              </button>
            </div>
          </div>

          <div className="hidden sm:flex shrink-0 items-center justify-center">
            <img
              src="/icons/logo.png"
              alt="Nugget Nihongo Logo"
              className="w-24 h-24 sm:w-36 sm:h-36 rounded-3xl object-cover shadow-glow ring-2 ring-amber-500/40"
            />
          </div>
        </div>
      </div>

      {/* Core Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-surface border border-accent/20 rounded-2xl p-5 space-y-3 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-xl text-accent">
            ❤️
          </div>
          <h3 className="font-bold text-sm text-appText-bright">Filosofi Teman Belajar</h3>
          <p className="text-xs text-appText-muted leading-relaxed">
            Tidak ada rasa bersalah saat absen. Tidak ada sistem penalti nyawa. Kami menemani langkah belajarmu dengan penuh kesabaran.
          </p>
        </div>

        <div className="bg-surface border border-accent/20 rounded-2xl p-5 space-y-3 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-xl text-emerald-400">
            📴
          </div>
          <h3 className="font-bold text-sm text-appText-bright">Privasi & Offline Penuh</h3>
          <p className="text-xs text-appText-muted leading-relaxed">
            Semua catatan, kartu SRS, dan audio bekerja 100% lokal. Data belajarmu tersimpan di perangkat tanpa pelacakan pihak ketiga.
          </p>
        </div>

        <div className="bg-surface border border-accent/20 rounded-2xl p-5 space-y-3 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/25 flex items-center justify-center text-xl text-sky-400">
            🧠
          </div>
          <h3 className="font-bold text-sm text-appText-bright">Algoritma FSRS v4</h3>
          <p className="text-xs text-appText-muted leading-relaxed">
            Memanfaatkan riset memori Ye et al. (2022) untuk menjadwalkan review kartu tepat saat otakmu hampir lupa.
          </p>
        </div>
      </div>

      {/* Interactive FAQ Section */}
      <div className="bg-surface border border-accent/20 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Pusat Bantuan & FAQ</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-appText-bright">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-xs text-appText-muted">
            Temukan jawaban lengkap seputar cara belajar, algoritma FSRS, integrasi Supabase, dan fitur aplikasi.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-appText-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              placeholder="Cari pertanyaan... (misal: offline, FSRS, Supabase, audio)"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-2 border border-accent/20 text-xs text-appText-bright placeholder:text-appText-muted focus:outline-none focus:border-accent"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {[
              { id: 'all', label: 'Semua' },
              { id: 'umum', label: 'Umum' },
              { id: 'fsrs', label: 'FSRS' },
              { id: 'materi', label: 'Materi' },
              { id: 'cloud', label: 'Cloud' },
              { id: 'teknis', label: 'Teknis' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedFaqCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  selectedFaqCategory === cat.id
                    ? 'bg-accent text-bg shadow-sm'
                    : 'bg-surface-2 hover:bg-surface-3 text-appText-muted hover:text-appText-bright'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3 pt-2">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center text-xs text-appText-muted border border-dashed border-accent/20 rounded-2xl">
              Tidak ada pertanyaan yang sesuai dengan kata kunci "{faqSearch}".
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = expandedFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl border border-accent/15 bg-surface-2/60 overflow-hidden transition-all hover:border-accent/30"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-4 text-left flex items-center justify-between gap-3 font-semibold text-xs sm:text-sm text-appText-bright hover:text-accent transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-accent">●</span>
                      <span>{faq.q}</span>
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-accent shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-appText-muted shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-appText-muted leading-relaxed border-t border-accent/10 bg-surface/50 animate-fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Curriculum Coverage Summary */}
      <div className="bg-surface border border-accent/20 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
        <h2 className="font-bold text-sm sm:text-base text-appText-bright flex items-center gap-2 border-b border-accent/15 pb-3">
          <GraduationCap className="w-4 h-4 text-accent" />
          <span>Cakupan Kurikulum & Data Terverifikasi</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
          <div className="p-4 rounded-2xl bg-surface-2/80 border border-purple-500/20 flex items-center justify-between">
            <span className="flex items-center gap-2.5 text-xs font-bold text-appText-bright">
              <span className="w-3 h-3 rounded-full bg-purple-400 shrink-0" />
              JLPT N5 (Dasar Pemula)
            </span>
            <span className="text-xs text-appText-muted font-mono">1.321 Kosakata · 94 Grammar</span>
          </div>

          <div className="p-4 rounded-2xl bg-surface-2/80 border border-orange-500/20 flex items-center justify-between">
            <span className="flex items-center gap-2.5 text-xs font-bold text-appText-bright">
              <span className="w-3 h-3 rounded-full bg-orange-400 shrink-0" />
              JLPT N4 (Percakapan Dasar)
            </span>
            <span className="text-xs text-appText-muted font-mono">1.286 Kosakata · 92 Grammar</span>
          </div>

          <div className="p-4 rounded-2xl bg-surface-2/80 border border-sky-500/20 flex items-center justify-between">
            <span className="flex items-center gap-2.5 text-xs font-bold text-appText-bright">
              <span className="w-3 h-3 rounded-full bg-sky-400 shrink-0" />
              JLPT N3 (Menengah)
            </span>
            <span className="text-xs text-appText-muted font-mono">2.580 Kosakata · 163 Grammar</span>
          </div>

          <div className="p-4 rounded-2xl bg-surface-2/80 border border-emerald-500/20 flex items-center justify-between">
            <span className="flex items-center gap-2.5 text-xs font-bold text-appText-bright">
              <span className="w-3 h-3 rounded-full bg-emerald-400 shrink-0" />
              JLPT N2 (Tingkat Mahir)
            </span>
            <span className="text-xs text-appText-muted font-mono">2.104 Kosakata · 310 Grammar</span>
          </div>

          <div className="p-4 rounded-2xl bg-surface-2/80 border border-rose-500/20 flex items-center justify-between">
            <span className="flex items-center gap-2.5 text-xs font-bold text-appText-bright">
              <span className="w-3 h-3 rounded-full bg-rose-400 shrink-0" />
              JLPT N1 (Tingkat Ahli)
            </span>
            <span className="text-xs text-appText-muted font-mono">3.217 Kosakata · 200 Grammar</span>
          </div>

          <div className="p-4 rounded-2xl bg-surface-2/80 border border-amber-500/30 flex items-center justify-between bg-amber-500/5">
            <span className="flex items-center gap-2.5 text-xs font-bold text-accent">
              <span className="w-3 h-3 rounded-full bg-amber-500 shrink-0" />
              Jalur SSW Vokasional
            </span>
            <span className="text-xs text-appText-muted font-mono">3 Sektor · 45 Pelajaran</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-appText-muted flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span>Total Database: <b>10.508 Kosakata</b> & <b>859 Pola Tata Bahasa</b></span>
          <span className="text-accent font-semibold">100% Bebas Typo & Terindeks</span>
        </div>
      </div>

      {/* Research Basis & Pedagogical Foundation */}
      <div className="bg-surface border border-accent/20 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-wider">
            <Brain className="w-4 h-4" />
            <span>Metode Belajar Terstruktur</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-appText-bright">
            Dirancang Khusus untuk Pembelajar Indonesia
          </h2>
          <p className="text-xs text-appText-muted leading-relaxed">
            Nugget Nihongo dirancang sistematis agar kamu belajar secara bertahap tanpa merasa kewalahan, menggabungkan metode jadwal review modern dan pemahaman mendalam tentang kebiasaan berbahasa orang Indonesia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Pilar 1: Processability Theory */}
          <div className="p-4 sm:p-5 rounded-2xl bg-surface-2/80 border border-accent/15 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-accent">
              <span className="p-1 rounded-md bg-accent/15 text-accent">1</span>
              <span>Alur Belajar Bertahap & Rapi</span>
            </div>
            <p className="text-xs text-appText leading-relaxed">
              Materi disusun bertingkat mengikuti kapasitas memori: mulai dari tingkat kosakata dasar, frasa penanda topik (は), hingga pergeseran urutan kata dan anak kalimat bertingkat tanpa membuatmu bingung.
            </p>
            <div className="text-[11px] text-appText-muted border-t border-accent/10 pt-2 flex items-center gap-1.5">
              <span>💡</span>
              <span>Fondasi disusun kuat dari kalimat sederhana sebelum beralih ke struktur kompleks.</span>
            </div>
          </div>

          {/* Pilar 2: Analisis Kontrasif L1 Indonesia */}
          <div className="p-4 sm:p-5 rounded-2xl bg-surface-2/80 border border-accent/15 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-red-400">
              <span className="p-1 rounded-md bg-red-500/15 text-red-400">2</span>
              <span>Pencegahan Salah Kaprah Bahasa Indonesia</span>
            </div>
            <p className="text-xs text-appText leading-relaxed">
              Mengakomodasi kebiasaan pembelajar Indonesia: mengatasi jebakan perbedaan susunan kata, posisi kata "adalah", serta modul penyesuaian logat daerah (Jawa, Sunda, Batak/Timur).
            </p>
            <div className="text-[11px] text-appText-muted border-t border-accent/10 pt-2 flex items-center gap-1.5">
              <span>💡</span>
              <span>Membantu melatih refleks bahasa Jepang alami tanpa terikat kata "adalah".</span>
            </div>
          </div>

          {/* Pilar 3: Pengelompokan Tematik (Thematic Clustering) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-surface-2/80 border border-accent/15 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <span className="p-1 rounded-md bg-emerald-500/15 text-emerald-400">3</span>
              <span>Penyajian Kosakata Tematik Kontekstual</span>
            </div>
            <p className="text-xs text-appText leading-relaxed">
              Menghindari menghafal daftar kata yang membingungkan secara serentak. Kosakata disajikan dalam situasi nyata sehari-hari (misal: belanja di minimarket, situasi kerja, makan di restoran).
            </p>
            <div className="text-[11px] text-appText-muted border-t border-accent/10 pt-2 flex items-center gap-1.5">
              <span>💡</span>
              <span>Kosakata dipelajari per situasi nyata, bukan sekadar hafalan kamus acak.</span>
            </div>
          </div>

          {/* Pilar 4: Retensi Memori Optimal FSRS v4 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-surface-2/80 border border-accent/15 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-sky-400">
              <span className="p-1 rounded-md bg-sky-500/15 text-sky-400">4</span>
              <span>Penjadwalan Pengulangan Cerdas (FSRS v4)</span>
            </div>
            <p className="text-xs text-appText leading-relaxed">
              Menggunakan sistem jadwal pengulangan modern yang menyesuaikan kecepatan belajar pribadi, memastikan materi diingat jangka panjang dan menghemat hingga 40% waktu ulasan harian.
            </p>
            <div className="text-[11px] text-appText-muted border-t border-accent/10 pt-2 flex items-center gap-1.5">
              <span>💡</span>
              <span>Mengulang materi tepat sebelum kamu lupa, menghemat waktu belajar.</span>
            </div>
          </div>
        </div>

        {/* Pilar 5: Standar Kemampuan Aksi Nyata (CEFR-J) */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1.5">
          <div className="font-bold text-amber-300 flex items-center gap-2">
            <span>🎯</span>
            <span>Standar Kemampuan Komunikatif Nyata (CEFR-J & JF Standard)</span>
          </div>
          <p className="text-appText leading-relaxed">
            Setiap pelajaran dipandu oleh target capaian Can-Do yang jelas: bukan sekadar menghafal rumus, melainkan kemampuan menyelesaikan misi nyata di Jepang (registrasi balai kota, memesan makanan, komunikasi empatik di tempat kerja).
          </p>
          <div className="text-[11px] font-mono text-appText-muted pt-1">
            The Japan Foundation (2017). <em>JF Standard for Japanese-Language Education</em> & CEFR-J Framework.
          </div>
        </div>
      </div>

      {/* Version & Technical Architecture */}
      <div className="bg-surface border border-accent/20 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
        <h2 className="font-bold text-sm sm:text-base text-appText-bright flex items-center gap-2 border-b border-accent/15 pb-3">
          <Cpu className="w-4 h-4 text-accent" />
          <span>Spesifikasi Teknis & Rilis</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div
            onClick={openPatchNotes}
            className="p-3 rounded-xl bg-surface-2 border border-accent/20 hover:border-accent/40 cursor-pointer transition-all hover:bg-surface-3 group"
            title="Klik untuk membuka Catatan Rilis Lengkap"
          >
            <div className="text-appText-muted text-[11px] flex items-center justify-between">
              <span>Versi Rilis</span>
              <History className="w-3 h-3 text-accent group-hover:rotate-12 transition-transform" />
            </div>
            <div className="font-bold text-accent font-mono mt-0.5 group-hover:underline">{APP_VERSION}</div>
          </div>
          <div className="p-3 rounded-xl bg-surface-2 border border-accent/10">
            <div className="text-appText-muted text-[11px]">Framework</div>
            <div className="font-bold text-appText-bright mt-0.5">React + Vite + TS</div>
          </div>
          <div className="p-3 rounded-xl bg-surface-2 border border-accent/10">
            <div className="text-appText-muted text-[11px]">Gaya Desain</div>
            <div className="font-bold text-appText-bright mt-0.5">Tailwind CSS (Warm Amber)</div>
          </div>
          <div className="p-3 rounded-xl bg-surface-2 border border-accent/10">
            <div className="text-appText-muted text-[11px]">Lisensi</div>
            <div className="font-bold text-appText-bright mt-0.5">Open Source</div>
          </div>
        </div>

        <div className="pt-1">
          <button
            onClick={openPatchNotes}
            className="w-full py-2.5 px-4 rounded-xl bg-surface-2 hover:bg-surface-3 border border-accent/25 hover:border-accent text-appText-bright font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <History className="w-4 h-4 text-accent" />
            <span>Buka Riwayat Catatan Rilis & Changelog Lengkap</span>
          </button>
        </div>
      </div>
    </div>
  );
};
