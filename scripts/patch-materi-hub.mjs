import fs from 'fs';
import path from 'path';

const filePath = path.resolve('src/pages/MateriHubPage.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add ExamLmsHub and useExerciseStore imports
if (!content.includes('ExamLmsHub')) {
  content = content.replace(
    "import { SyncStatusPill } from '../components/ui/SyncStatusPill';",
    "import { SyncStatusPill } from '../components/ui/SyncStatusPill';\nimport { ExamLmsHub } from '../components/exercise/ExamLmsHub';\nimport { useExerciseStore } from '../store/useExerciseStore';"
  );
}

// 2. Add interface MateriHubPageProps and update export
if (!content.includes('export interface MateriHubPageProps')) {
  content = content.replace(
    'export const MateriHubPage: React.FC = () => {',
    `export interface MateriHubPageProps {
  initialTab?: 'latihan' | 'kamus' | 'alat' | 'cbt';
}

export const MateriHubPage: React.FC<MateriHubPageProps> = ({ initialTab }) => {`
  );
}

// 3. Update useAppStore hook call in MateriHubPage
content = content.replace(
  `    cards,
    openDetailModal,
    startQuizSession,
    materiStudio: activeStudio,
    setMateriStudio: setActiveStudio,
  } = useAppStore();`,
  `    cards,
    openDetailModal,
    startQuizSession,
    materiStudio: activeStudio,
    setMateriStudio: setActiveStudio,
    dojoTab = 'latihan',
    setDojoTab,
    showToast,
    setActiveTab: setGlobalActiveTab,
  } = useAppStore();`
);

// 4. Add initialTab synchronization and handlers
const syncSnippet = `  // Synchronize initialTab with dojoTab
  useEffect(() => {
    if (initialTab && initialTab !== dojoTab) {
      setDojoTab(initialTab);
    }
  }, [initialTab]);

  // Sync hubSectionMode when dojoTab changes
  useEffect(() => {
    if (dojoTab === 'kamus') {
      setHubSectionMode('kamus');
    } else {
      setHubSectionMode('dojo');
    }
  }, [dojoTab]);

  const handleSelectDojoTab = (tab: 'latihan' | 'kamus' | 'alat' | 'cbt') => {
    setDojoTab(tab);
    if (tab === 'kamus') {
      setHubSectionMode('kamus');
    } else {
      setHubSectionMode('dojo');
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  };

  const handleStartExerciseSet = async (setId: string, mode: 'guided' | 'strict') => {
    const success = await useExerciseStore.getState().startSet(setId, mode);
    if (success) {
      setGlobalActiveTab('quiz');
    } else {
      showToast('Gagal memuat set latihan CBT', '⚠️');
    }
  };`;

if (!content.includes('handleSelectDojoTab')) {
  content = content.replace(
    "const [hubSectionMode, setHubSectionMode] = useState<'dojo' | 'kamus'>('dojo');",
    `const [hubSectionMode, setHubSectionMode] = useState<'dojo' | 'kamus'>('dojo');\n\n${syncSnippet}`
  );
}

// 5. Replace header subtitle and 4-pillar mode switcher
const oldHeaderSnippet = `{/* High-Level Segmented Mode: [ 🥋 Dojo (11 Alat) ] vs [ 📖 Kamus & Indeks ] */}
        <div className="flex items-center p-1 bg-surface-2 border border-accent/20 rounded-2xl shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setHubSectionMode('dojo')}
            aria-pressed={hubSectionMode === 'dojo'}
            aria-label="Tampilan Mode Dojo (11 Alat)"
            className={\`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 active:scale-95 \${
              hubSectionMode === 'dojo'
                ? 'bg-amber-500 text-stone-950 font-black shadow-sm'
                : 'text-appText-muted hover:text-appText-bright'
            }\`}
          >
            <span>🥋</span>
            <span>Dojo (11 Alat)</span>
          </button>
          <button
            type="button"
            onClick={() => setHubSectionMode('kamus')}
            aria-pressed={hubSectionMode === 'kamus'}
            aria-label="Tampilan Mode Kamus & Indeks"
            className={\`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 active:scale-95 \${
              hubSectionMode === 'kamus'
                ? 'bg-amber-500 text-stone-950 font-black shadow-sm'
                : 'text-appText-muted hover:text-appText-bright'
            }\`}
          >
            <span>📖</span>
            <span>Kamus & Indeks</span>
          </button>
        </div>`;

const newHeaderSnippet = `{/* High-Level Segmented Mode: 4 Dedicated Pillars (Latihan, Kamus, Alat, CBT) */}
        <div
          role="tablist"
          aria-label="Mode Navigasi Dojo & Materi Hub"
          className="flex items-center p-1 bg-surface-2 border border-accent/20 rounded-2xl shrink-0 self-start sm:self-auto overflow-x-auto scrollbar-none max-w-full"
        >
          <button
            type="button"
            role="tab"
            aria-selected={dojoTab === 'latihan'}
            onClick={() => handleSelectDojoTab('latihan')}
            aria-label="Tampilan Mode Latihan & Kuis (Dojo)"
            className={\`px-3 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 whitespace-nowrap active:scale-95 \${
              dojoTab === 'latihan'
                ? 'bg-amber-500 text-stone-950 font-black shadow-sm'
                : 'text-appText-muted hover:text-appText-bright'
            }\`}
          >
            <span>🥋</span>
            <span>Latihan & Kuis</span>
            <span className="sr-only">Dojo (11 Alat)</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={dojoTab === 'kamus'}
            onClick={() => handleSelectDojoTab('kamus')}
            aria-label="Tampilan Mode Kamus & Indeks"
            className={\`px-3 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 whitespace-nowrap active:scale-95 \${
              dojoTab === 'kamus'
                ? 'bg-amber-500 text-stone-950 font-black shadow-sm'
                : 'text-appText-muted hover:text-appText-bright'
            }\`}
          >
            <span>📖</span>
            <span>Kamus & Indeks</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={dojoTab === 'alat'}
            onClick={() => handleSelectDojoTab('alat')}
            aria-label="Tampilan Mode Alat Bantu & Pustaka Referensi"
            className={\`px-3 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 whitespace-nowrap active:scale-95 \${
              dojoTab === 'alat'
                ? 'bg-amber-500 text-stone-950 font-black shadow-sm'
                : 'text-appText-muted hover:text-appText-bright'
            }\`}
          >
            <span>🧰</span>
            <span>Alat & Referensi</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={dojoTab === 'cbt'}
            onClick={() => handleSelectDojoTab('cbt')}
            aria-label="Tampilan Mode Simulator Ujian CBT"
            className={\`px-3 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 whitespace-nowrap active:scale-95 \${
              dojoTab === 'cbt'
                ? 'bg-amber-500 text-stone-950 font-black shadow-sm'
                : 'text-appText-muted hover:text-appText-bright'
            }\`}
          >
            <span>🎯</span>
            <span>Simulator Ujian</span>
          </button>
        </div>`;

content = content.replace(oldHeaderSnippet, newHeaderSnippet);

// Subtitle dynamic update
content = content.replace(
  `          <p className="text-xs sm:text-sm text-appText-muted mt-1">
            {hubSectionMode === 'dojo'
              ? '11 Alat interaktif, laboratorium tata bahasa, audio choukai & simulator CBT.'
              : 'Eksplorasi 10.500+ kosakata dan 850+ pola kalimat JLPT N5–N1 & Jalur Freeway.'}
          </p>`,
  `          <p className="text-xs sm:text-sm text-appText-muted mt-1">
            {dojoTab === 'latihan' && 'Pusat latihan mandiri, drill refleks cepat, flashcard 3D & arena kuis interaktif.'}
            {dojoTab === 'kamus' && 'Eksplorasi 10.500+ kosakata dan 850+ pola kalimat JLPT N5–N1 & Jalur Freeway.'}
            {dojoTab === 'alat' && '8 Alat bantu referensi, konjugasi verba, aksara kana, etiket keigo & 9 buku teks standar.'}
            {dojoTab === 'cbt' && 'Simulasi ujian resmi CBT: JLPT N5–N1, JFT-Basic, Prometric SSW 19 Sektor & Choukai audio.'}
          </p>`
);

// 6. Restructure Dojo Mode into separate sections for Latihan, Alat, and CBT
const dojoBodyStart = `{/* ── DOJO MODE: Sasana Latihan Mandiri (6 Mode Praktik) & 11 Alat Referensi ── */}
      {hubSectionMode === 'dojo' && (`;

const newDojoBody = `{/* ── TAB 1: PUSAT LATIHAN MANDIRI & DRILL REFLEKS (6 FORMAT LATIHAN) ── */}
      {dojoTab === 'latihan' && (`

content = content.replace(dojoBodyStart, newDojoBody);

// Split Bagian 1 end and Bagian 2 start
const oldSplit = `            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════
              BAGIAN 2: ALAT BANTU & PUSTAKA REFERENSI (11 ALAT INTERAKTIF)
              Buku Teks, Simulator CBT Resmi, Kana, Konjugasi, Nuansa, Keigo, Counters, CAT, Kotowaza, Pitch
          ══════════════════════════════════════════════════════════════ */}
          <div className="space-y-4 pt-4 border-t border-accent/15">`;

const newSplit = `            </div>
          </section>
        </div>
      )}

      {/* ── TAB 3: ALAT BANTU & PUSTAKA REFERENSI (8 INSTRUMEN & BUKU TEKS) ── */}
      {dojoTab === 'alat' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="space-y-4">`;

content = content.replace(oldSplit, newSplit);

// Tab 3 end and Tab 4 (CBT) definition before Kamus Mode
const oldTab3End = `          {/* Legacy cluster compatibility: clusterId: 1, clusterId: 2, clusterId: 3 */}
        </div>
      )}

      {/* ── KAMUS & INDEKS MODE: JLPT N5–N1 & JALUR FREEWAY ── */}`;

const newTab3And4 = `          {/* Legacy cluster compatibility: clusterId: 1, clusterId: 2, clusterId: 3 */}
        </div>
      )}

      {/* ── TAB 4: SIMULATOR UJIAN CBT RESMI (JLPT, JFT, PROMETRIC SSW & CHOUKAI) ── */}
      {dojoTab === 'cbt' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-accent/15 pb-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400 font-extrabold text-xs mb-1">
                  <span>🎯 CBT Ujian Resmi</span>
                  <span className="text-appText-muted font-normal">· 公式CBT試験シミュレーター</span>
                </div>
                <h2 className="text-base sm:text-xl font-extrabold text-appText-bright tracking-tight">
                  Simulator Ujian CBT Resmi & Standar Internasional
                </h2>
                <p className="text-xs text-appText-muted mt-0.5">
                  Simulasi ujian berbasis komputer dengan antarmuka otentik, timer batas waktu resmi, lembar jawaban interaktif, dan kalkulasi skor kelulusan.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-accent bg-surface-2 px-3 py-1.5 rounded-full border border-accent/20">
                  5 Simulator Standar
                </span>
              </div>
            </div>

            {/* 5 Official Exam Simulator Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
              {/* Card 1: Simulasi Lengkap JLPT CBT (N5 - N1) */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => {
                  const targetEl = document.getElementById('exam-lms-doors');
                  if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-surface-2 hover:bg-surface-3 border border-accent/25 hover:border-amber-500/60 rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md group active:scale-95 min-h-[220px]"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2.5">
                    <div className="w-12 h-12 rounded-xl bg-surface/90 border border-accent/25 flex items-center justify-center text-xl shadow-xs group-hover:scale-105 group-hover:border-amber-500/40 transition-all shrink-0">
                      🏛️
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full border bg-amber-500/15 text-accent font-semibold border-amber-500/30 shrink-0">
                      14 Set · N5–N1
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-appText-bright group-hover:text-amber-400 transition-colors leading-snug">
                      Simulasi Lengkap JLPT CBT (N5–N1)
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-appText-muted mt-0.5" lang="ja">
                      JLPT模擬試験CBT
                    </p>
                  </div>
                  <p className="text-sm text-appText-muted leading-relaxed">
                    14 set ujian lengkap berstandar resmi JLPT: Moji/Goi, Bunpou, Dokkai, dan Choukai dengan timer countdown dan lembar jawaban otentik.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-accent/15 flex items-center justify-between text-xs">
                  <span className="text-xs text-appText-muted font-medium">Batas Waktu Standar</span>
                  <span className="text-xs sm:text-sm text-amber-400 font-extrabold group-hover:translate-x-1 transition-transform shrink-0">
                    Pilih Set Ujian →
                  </span>
                </div>
              </div>

              {/* Card 2: Simulasi JFT-Basic CBT (A1 / A2) */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => {
                  const targetEl = document.getElementById('exam-lms-doors');
                  if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-surface-2 hover:bg-surface-3 border border-accent/25 hover:border-blue-500/60 rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md group active:scale-95 min-h-[220px]"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2.5">
                    <div className="w-12 h-12 rounded-xl bg-surface/90 border border-accent/25 flex items-center justify-center text-xl shadow-xs group-hover:scale-105 group-hover:border-blue-500/40 transition-all shrink-0">
                      🌏
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full border bg-blue-500/15 text-blue-400 font-semibold border-blue-500/30 shrink-0">
                      Standar A1/A2 · 60 Menit
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-appText-bright group-hover:text-blue-400 transition-colors leading-snug">
                      Simulasi JFT-Basic CBT (A1/A2)
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-appText-muted mt-0.5" lang="ja">
                      国際交流基金 JFT-Basic
                    </p>
                  </div>
                  <p className="text-sm text-appText-muted leading-relaxed">
                    Simulasi ujian Japan Foundation Test for Basic Japanese: 60 butir soal percakapan nyata dan kemampuan komunikasi kerja di Jepang.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-accent/15 flex items-center justify-between text-xs">
                  <span className="text-xs text-appText-muted font-medium">Syarat Kerja SSW</span>
                  <span className="text-xs sm:text-sm text-blue-400 font-extrabold group-hover:translate-x-1 transition-transform shrink-0">
                    Buka Ujian JFT →
                  </span>
                </div>
              </div>

              {/* Card 3: Simulasi Prometric Tokutei Ginou SSW CBT (19 Sektor) */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => {
                  const targetEl = document.getElementById('exam-lms-doors');
                  if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-surface-2 hover:bg-surface-3 border border-accent/25 hover:border-emerald-500/60 rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md group active:scale-95 min-h-[220px]"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2.5">
                    <div className="w-12 h-12 rounded-xl bg-surface/90 border border-accent/25 flex items-center justify-center text-xl shadow-xs group-hover:scale-105 group-hover:border-emerald-500/40 transition-all shrink-0">
                      🏭
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full border bg-emerald-500/15 text-emerald-400 font-semibold border-emerald-500/30 shrink-0">
                      19 Sektor Prometric
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-appText-bright group-hover:text-emerald-400 transition-colors leading-snug">
                      Simulasi Prometric Tokutei Ginou (SSW)
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-appText-muted mt-0.5" lang="ja">
                      特定技能評価試験
                    </p>
                  </div>
                  <p className="text-sm text-appText-muted leading-relaxed">
                    Latihan ujian keahlian khusus SSW: Kaigo (perawat lansia), pengolahan makanan, restoran, pertanian, konstruksi, dan manufaktur.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-accent/15 flex items-center justify-between text-xs">
                  <span className="text-xs text-appText-muted font-medium">Standar Prometric</span>
                  <span className="text-xs sm:text-sm text-emerald-400 font-extrabold group-hover:translate-x-1 transition-transform shrink-0">
                    Buka Sektor SSW →
                  </span>
                </div>
              </div>

              {/* Card 4: Simulator Menyimak Choukai (CBT Resmi) */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => handleOpenTool('choukai')}
                className="bg-surface-2 hover:bg-surface-3 border border-accent/25 hover:border-purple-500/60 rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md group active:scale-95 min-h-[220px]"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2.5">
                    <div className="w-12 h-12 rounded-xl bg-surface/90 border border-accent/25 flex items-center justify-center text-xl shadow-xs group-hover:scale-105 group-hover:border-purple-500/40 transition-all shrink-0">
                      🎧
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full border bg-purple-500/15 text-purple-400 font-semibold border-purple-500/30 shrink-0">
                      163 Soal Audio Resmi
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-appText-bright group-hover:text-purple-400 transition-colors leading-snug">
                      Simulator Menyimak Choukai (CBT Resmi)
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-appText-muted mt-0.5" lang="ja">
                      聴解CBTシミュレーター
                    </p>
                  </div>
                  <p className="text-sm text-appText-muted leading-relaxed">
                    Official listening tracks & audio drills otentik dengan 163 soal simulasi ujian Choukai berstandar JLPT dan JFT-Basic CBT lengkap naskah transkrip.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-accent/15 flex items-center justify-between text-xs">
                  <span className="text-xs text-appText-muted font-medium">Player Audio Imersif</span>
                  <span className="text-xs sm:text-sm text-purple-400 font-extrabold group-hover:translate-x-1 transition-transform shrink-0">
                    Mulai Choukai →
                  </span>
                </div>
              </div>

              {/* Card 5: Tes Penempatan Adaptif CAT (IRT 3PL) */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => handleOpenTool('cat')}
                className="bg-surface-2 hover:bg-surface-3 border border-accent/25 hover:border-amber-500/60 rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md group active:scale-95 min-h-[220px]"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2.5">
                    <div className="w-12 h-12 rounded-xl bg-surface/90 border border-accent/25 flex items-center justify-center text-xl shadow-xs group-hover:scale-105 group-hover:border-amber-500/40 transition-all shrink-0">
                      🎯
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full border bg-amber-500/15 text-accent font-semibold border-amber-500/30 shrink-0">
                      10–12 Soal IRT Presisi
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-appText-bright group-hover:text-accent transition-colors leading-snug">
                      Tes Penempatan Adaptif CAT
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-appText-muted mt-0.5" lang="ja">
                      適応型プレースメントテスト
                    </p>
                  </div>
                  <p className="text-sm text-appText-muted leading-relaxed">
                    Diagnosa kemampuan bahasa Jepang (JLPT N5–N1) secara presisi dalam 10–12 soal adaptif berbasis Item Response Theory (IRT 3PL).
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-accent/15 flex items-center justify-between text-xs">
                  <span className="text-xs text-appText-muted font-medium">Diagnosa Instan</span>
                  <span className="text-xs sm:text-sm text-accent font-extrabold group-hover:translate-x-1 transition-transform shrink-0">
                    Mulai Tes Diagnosa →
                  </span>
                </div>
              </div>
            </div>

            {/* Embedded Exam LMS Hub (The 3 Clean Doors) */}
            <div id="exam-lms-doors" className="pt-8 border-t border-accent/20">
              <div className="mb-4">
                <h3 className="text-sm sm:text-base font-extrabold text-appText-bright tracking-tight flex items-center gap-2">
                  <span>🏛️</span>
                  <span>Gerbang Set Latihan CBT Lengkap</span>
                </h3>
                <p className="text-xs text-appText-muted mt-0.5">
                  Pilih paket soal ujian resmi di bawah ini untuk memulai sesi ujian CBT interaktif.
                </p>
              </div>
              <ExamLmsHub
                onStartExerciseSet={handleStartExerciseSet}
                onStartFSRSDue={() => startQuizSession('flashcard')}
                onStartMistakeReview={() => startQuizSession('multiple-choice')}
                onStartDynamicDrill={(count) => {
                  startQuizSession('multiple-choice');
                }}
                dueCount={0}
                mistakesCount={0}
              />
            </div>
          </section>
        </div>
      )}

      {/* ── KAMUS & INDEKS MODE: JLPT N5–N1 & JALUR FREEWAY ── */}`;

content = content.replace(oldTab3End, newTab3And4);

// Replace `{hubSectionMode === 'kamus' && (` with `{(dojoTab === 'kamus' || hubSectionMode === 'kamus') && (`
content = content.replace(
  `{hubSectionMode === 'kamus' && (`,
  `{(dojoTab === 'kamus' || hubSectionMode === 'kamus') && (`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Successfully patched src/pages/MateriHubPage.tsx with 4 dedicated Dojo pillars!');
