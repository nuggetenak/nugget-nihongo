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
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

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
    a: 'Ya, 100%! Seluruh basis data (4.800+ kosakata dan 850+ pola tata bahasa), mesin evaluasi kuis, konjugasi verba, pelacak memori FSRS, dan sintesis suara pelafalan (Web Speech API) berjalan secara lokal di perangkatmu. Kamu bisa belajar lancar saat naik pesawat, kereta bawah tanah, atau di daerah tanpa sinyal internet.',
  },
  {
    id: 'faq-3',
    category: 'fsrs',
    q: 'Apa itu FSRS v4 dan apa bedanya dengan Anki lama atau Duolingo?',
    a: 'FSRS (Free Spaced Repetition Scheduler) adalah model matematis memori modern yang dipublikasikan oleh Ye et al. (2022). Berbeda dari algoritma SM-2 lawas (yang dipakai Anki lama) yang hanya mengalikan interval secara kasar, FSRS memodelkan tiga variabel kognitif manusia: Retrievability (kemudahan mengingat), Stability (daya tahan memori), dan Difficulty (tingkat kesulitan kata). Hasilnya, kamu hanya mereview kartu saat otakmu hampir lupa, menghemat waktu belajar hingga 30-40%.',
  },
  {
    id: 'faq-4',
    category: 'materi',
    q: 'Apa bedanya Jalur Tingkat JLPT dengan Jalur Buku (Minna no Nihongo & Irodori)?',
    a: 'Jalur JLPT mengelompokkan kata dan pola kalimat berdasarkan standar resmi Ujian Kemampuan Bahasa Jepang (N5 hingga N1). Sementara Jalur Buku menyusun materi persis mengikuti urutan bab buku teks populer seperti Minna no Nihongo (Shokyu 1 & 2) dan Irodori (A1, A2-1, A2-2 dari The Japan Foundation), sehingga sangat cocok digunakan sebagai pendamping belajar di kelas kursus atau universitas.',
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
    q: 'Mengapa Google Sign-In menampilkan pesan kesalahan DNS NXDOMAIN?',
    a: 'Jika muncul kesalahan "DNS_PROBE_FINISHED_NXDOMAIN" pada URL Supabase, itu artinya domain proyek Supabase bawaan telah diarsipkan atau dipause oleh server. Buka menu "Pengaturan > Konfigurasi Supabase Cloud", lalu masukkan Project URL dan Anon Key dari proyek Supabase aktifmu sendiri (tersedia gratis di supabase.com). Setelah disimpan, Google Sign-In dan pendaftaran akun email akan langsung terhubung ke proyek pribadimu.',
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
  const { openOnboarding, openFeatureGuide, setActiveTab } = useAppStore();
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
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-950/70 via-amber-900/40 to-surface border border-accent/25 p-6 sm:p-10 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="max-w-xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-accent font-bold text-xs">
              <img src="/icons/icon-192.png" alt="Logo" className="w-4 h-4 rounded-full object-cover" />
              <span>Nugget Nihongo · v15.16.0</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-appText-bright tracking-tight leading-tight">
              Tentang Nugget Nihongo
            </h1>

            <p className="text-xs sm:text-sm text-appText-muted leading-relaxed">
              Aplikasi pendamping belajar bahasa Jepang yang hangat, santai, dan bebas rasa bersalah. Dibangun di atas riset memori modern FSRS v4 dan kurikulum JLPT N5–N1 terstandar.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={openOnboarding}
                className="px-4 py-2.5 rounded-xl bg-accent hover:bg-accent-hot text-bg font-bold text-xs flex items-center gap-2 transition-all shadow-glow"
              >
                <span>Mulai Tur Aplikasi</span>
                <Compass className="w-4 h-4" />
              </button>

              <button
                onClick={openFeatureGuide}
                className="px-4 py-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 text-appText-bright border border-accent/25 font-bold text-xs flex items-center gap-2 transition-all"
              >
                <span>Panduan Fitur & Navigasi</span>
                <BookOpen className="w-4 h-4 text-accent" />
              </button>
            </div>
          </div>

          <div className="shrink-0 flex items-center justify-center">
            <img
              src="/icons/logo.png"
              alt="Nugget Nihongo Logo"
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl object-cover shadow-glow ring-2 ring-amber-500/40"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
          <div className="p-4 rounded-2xl bg-surface-2/80 border border-purple-500/20 flex items-center justify-between">
            <span className="flex items-center gap-2.5 text-xs font-bold text-appText-bright">
              <span className="w-3 h-3 rounded-full bg-purple-400" />
              JLPT N5 (Dasar Pemula)
            </span>
            <span className="text-xs text-appText-muted font-mono">991 Kosakata · 94 Grammar</span>
          </div>

          <div className="p-4 rounded-2xl bg-surface-2/80 border border-orange-500/20 flex items-center justify-between">
            <span className="flex items-center gap-2.5 text-xs font-bold text-appText-bright">
              <span className="w-3 h-3 rounded-full bg-orange-400" />
              JLPT N4 (Percakapan Dasar)
            </span>
            <span className="text-xs text-appText-muted font-mono">946 Kosakata · 92 Grammar</span>
          </div>

          <div className="p-4 rounded-2xl bg-surface-2/80 border border-sky-500/20 flex items-center justify-between">
            <span className="flex items-center gap-2.5 text-xs font-bold text-appText-bright">
              <span className="w-3 h-3 rounded-full bg-sky-400" />
              JLPT N3 (Menengah / Intermediate)
            </span>
            <span className="text-xs text-appText-muted font-mono">2.368 Kosakata · 163 Grammar</span>
          </div>

          <div className="p-4 rounded-2xl bg-surface-2/80 border border-emerald-500/20 flex items-center justify-between">
            <span className="flex items-center gap-2.5 text-xs font-bold text-appText-bright">
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
              JLPT N2 & N1 (Lanjutan & Profesional)
            </span>
            <span className="text-xs text-appText-muted font-mono">534 Kosakata · 510 Grammar</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-appText-muted flex items-center justify-between">
          <span>Total Database: <b>4.839 Kosakata</b> & <b>859 Pola Tata Bahasa</b></span>
          <span className="text-accent font-semibold">100% Bebas Typo & Terindeks</span>
        </div>
      </div>

      {/* Research Basis & Pedagogical Foundation */}
      <div className="bg-surface border border-accent/20 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
        <h2 className="font-bold text-sm sm:text-base text-appText-bright flex items-center gap-2 border-b border-accent/15 pb-3">
          <Brain className="w-4 h-4 text-accent" />
          <span>Basis Riset & Metodologi Pedagogis</span>
        </h2>
        <div className="space-y-3 text-xs text-appText-muted leading-relaxed">
          <p>
            • <strong>Ye et al. (2022)</strong>: <em>A Stochastic Shortest Path Algorithm for Optimizing Spaced Repetition</em> (KDD). Nugget Nihongo mengadopsi model DSR (Difficulty, Stability, Retrievability) untuk menghitung jarak ulasan memori optimal.
          </p>
          <p>
            • <strong>Matsunaga (1999)</strong>: Pemelajar bahasa Jepang dengan bahasa ibu berlatar belakang aksara alfabet latin (non-kanji L1) membutuhkan rata-rata 2.3× lebih banyak paparan kontekstual untuk menguasai kanji dibanding pemelajar berlatar belakang aksara Hanzi/Kanji. Nugget Nihongo menghadirkan furigana dua arah, pelafalan audio aksen Tokyo, dan metafora Kebun Kata untuk menjembatani kesenjangan ini.
          </p>
          <p>
            • <strong>The Japan Foundation & 3A Corporation</strong>: Selaras dengan standar JF Standard for Japanese-Language Education (Buku Irodori) dan Minna no Nihongo Shokyu.
          </p>
        </div>
      </div>

      {/* Version & Technical Architecture */}
      <div className="bg-surface border border-accent/20 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
        <h2 className="font-bold text-sm sm:text-base text-appText-bright flex items-center gap-2 border-b border-accent/15 pb-3">
          <Cpu className="w-4 h-4 text-accent" />
          <span>Spesifikasi Teknis & Rilis</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-surface-2 border border-accent/10">
            <div className="text-appText-muted text-[11px]">Versi Rilis</div>
            <div className="font-bold text-appText-bright font-mono mt-0.5">v15.16.0</div>
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
      </div>
    </div>
  );
};
