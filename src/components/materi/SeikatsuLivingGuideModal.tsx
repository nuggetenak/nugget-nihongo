// ══════════════════════════════════════════════════════════════════
//  SeikatsuLivingGuideModal.tsx — Living in Japan Practical Survival Guide
//  Municipal Procedures, Garbage Sorting, Housing, & Disaster Evacuation
//  Compliant with Ministry of Internal Affairs & Communications (MIC) Guidelines
// ══════════════════════════════════════════════════════════════════

import React, { useState } from 'react';
import {
  Building2,
  Trash2,
  Home,
  AlertTriangle,
  FileText,
  Calendar,
  ShieldAlert,
  Volume2,
  CheckCircle2,
  Sparkles,
  PhoneCall,
  Clock,
  ExternalLink,
  Info,
} from 'lucide-react';
import { speakJapanese } from '../../lib/audio/tts';
import { playSuccessSfx } from '../../lib/audio/sfx';
import { useAppStore } from '../../store/useAppStore';

export type SeikatsuTab = 'shiyakusho' | 'gomi' | 'housing' | 'disaster';

interface GuideItem {
  id: string;
  titleJp: string;
  titleId: string;
  romaji: string;
  importance: 'WAJIB' | 'PENTING' | 'DARURAT';
  descId: string;
  tipsId: string;
  keyVocab: Array<{ kanji: string; kana: string; romaji: string; arti: string }>;
}

export const SEIKATSU_GUIDE_DATA: Record<SeikatsuTab, {
  tabId: SeikatsuTab;
  tabTitle: string;
  tabIcon: string;
  tagline: string;
  items: GuideItem[];
}> = {
  shiyakusho: {
    tabId: 'shiyakusho',
    tabTitle: 'Balai Kota (市役所)',
    tabIcon: '🏛️',
    tagline: 'Langkah hukum wajib dalam 14 hari pertama kedatangan di Jepang',
    items: [
      {
        id: 'juminhyo-reg',
        titleJp: '住民登録（転入届）',
        titleId: 'Pendaftaran Penduduk (Tennyuu-todoke)',
        romaji: 'Juumin touroku (tennyuu todoke)',
        importance: 'WAJIB',
        descId: 'Wajib dilaporkan ke balai kota (Shiyakusho / Kuyakusho) maksimal 14 hari sejak mendapatkan tempat tinggal tetap di Jepang dengan membawa Kartu Izin Tinggal (Zairyu Card) dan paspor.',
        tipsId: 'Alamat tempat tinggalmu akan dicetak langsung di bagian belakang Zairyu Card sebagai bukti domisili sah.',
        keyVocab: [
          { kanji: '住民票', kana: 'じゅうみんひょう', romaji: 'juuminhyou', arti: 'Surat Keterangan Domisili Resmi' },
          { kanji: '転入届', kana: 'てんにゅうとどけ', romaji: 'tennyuu todoke', arti: 'Formulir Pindah Masuk Kota' },
          { kanji: '在留カード', kana: 'ざいりゅうカード', romaji: 'zairyuu kaado', arti: 'Kartu Izin Tinggal WNA' },
        ],
      },
      {
        id: 'kokumin-kenko-hoken',
        titleJp: '国民健康保険・社会保険',
        titleId: 'Asuransi Kesehatan (Kokumin Kenko Hoken / Shakai Hoken)',
        romaji: 'Kokumin kenkou hoken / Shakai hoken',
        importance: 'WAJIB',
        descId: 'Sistem jaminan kesehatan universal Jepang. Peserta hanya menanggung 30% biaya medis mandiri saat berobat ke dokter atau rumah sakit (70% ditanggung negara).',
        tipsId: 'Selalu bawa Kartu Asuransi (Hokenshou) ke klinik/rumah sakit. Tanpa kartu ini, kamu wajib membayar 100% biaya pengobatan di muka.',
        keyVocab: [
          { kanji: '保険証', kana: 'ほけんしょう', romaji: 'hokenshou', arti: 'Kartu Asuransi Kesehatan' },
          { kanji: '診察券', kana: 'しんさつけん', romaji: 'shinsatsuken', arti: 'Kartu Pasien Klinik' },
          { kanji: '処方箋', kana: 'しょほうせん', romaji: 'shohousen', arti: 'Resep Dokter untuk Apotek' },
        ],
      },
      {
        id: 'my-number-card',
        titleJp: 'マイナンバーカード',
        titleId: 'Kartu Nomor Identitas Penduduk (My Number)',
        romaji: 'Mai nambaa kaado',
        importance: 'PENTING',
        descId: 'Nomor identitas unik 12 digit untuk keperluan pajak, asuransi, dan pembukaan rekening bank. Kartu fisiknya dapat digunakan mencetak surat resmi di minimarket (Konbini) 24 jam.',
        tipsId: 'Nomor 12 digit My Number bersifat rahasia negara, jangan pernah memotret atau membagikannya sembarangan di media sosial.',
        keyVocab: [
          { kanji: '個人番号', kana: 'こじんばんごう', romaji: 'kojin bangou', arti: 'Nomor Identitas Pribadi' },
          { kanji: '交付申請書', kana: 'こうふしんせいしょ', romaji: 'koufu shinseisho', arti: 'Formulir Pengajuan Kartu' },
        ],
      },
    ],
  },
  gomi: {
    tabId: 'gomi',
    tabTitle: 'Pemilahan Sampah (ゴミ分別)',
    tabIcon: '🗑️',
    tagline: 'Standar etika hidup bertetangga paling ketat di perumahan Jepang',
    items: [
      {
        id: 'moeru-gomi',
        titleJp: '燃えるゴミ（可燃ごみ）',
        titleId: 'Sampah yang Dapat Dibakar (Moeru Gomi)',
        romaji: 'Moeru gomi / Kanen gomi',
        importance: 'WAJIB',
        descId: 'Sisa makanan dapur, kertas kotor, sampah organik, dan kain bekas. Biasanya dikumpulkan 2 kali seminggu pada hari Selasa dan Jumat sebelum jam 08:00 pagi.',
        tipsId: 'Gunakan kantong sampah resmi transparan berbayar sesuai ketentuan pemerintah kota tempat tinggalmu.',
        keyVocab: [
          { kanji: '生ゴミ', kana: 'なまごみ', romaji: 'nama-gomi', arti: 'Sampah Dapur / Makanan Basah' },
          { kanji: '集積所', kana: 'しゅうせきじょ', romaji: 'shuusekijo', arti: 'Tempat Penampungan Sampah Bersama' },
        ],
      },
      {
        id: 'shigen-gomi',
        titleJp: '資源ゴミ（ペットボトル・空き缶）',
        titleId: 'Sampah Daur Ulang (Shigen Gomi)',
        romaji: 'Shigen gomi',
        importance: 'WAJIB',
        descId: 'Botol plastik PET, kaleng aluminium/besi, dan botol kaca. Label plastik dan tutup botol WAJIB dilepas (masuk ke sampah plastik) dan bagian dalam dibilas air bersih.',
        tipsId: 'Injak botol PET hingga pipih agar hemat tempat dan masukkan ke jaring penampung warna biru/hijau.',
        keyVocab: [
          { kanji: '分別', kana: 'ぶんべつ', romaji: 'bunbetsu', arti: 'Pemilahan / Klasifikasi Sampah' },
          { kanji: '空き缶', kana: 'あきかん', romaji: 'akikan', arti: 'Kaleng Minuman Bekas' },
          { kanji: '粗大ゴミ', kana: 'そだいごみ', romaji: 'sodai gomi', arti: 'Sampah Berukuran Besar (>30cm)' },
        ],
      },
    ],
  },
  housing: {
    tabId: 'housing',
    tabTitle: 'Sewa Rumah & Bank (賃貸・銀行)',
    tabIcon: '🏠',
    tagline: 'Aturan sewa apartemen dan prosedur keuangan perbankan Jepang',
    items: [
      {
        id: 'shikikin-reikin',
        titleJp: '敷金・礼金と賃貸契約',
        titleId: 'Uang Jaminan (Shikikin) & Uang Tanda Terima Kasih (Reikin)',
        romaji: 'Shikikin / Reikin to Chintai Keiyaku',
        importance: 'PENTING',
        descId: 'Shikikin adalah deposit jaminan kerusakan (dapat dikembalikan dipotong biaya perbaikan). Reikin adalah uang terima kasih non-refundable kepada pemilik gedung (Ooya-san).',
        tipsId: 'Cari apartemen berlabel "Reikin Zero" (礼金ゼロ) untuk menghemat biaya awal pindahan hingga puluhan juta rupiah.',
        keyVocab: [
          { kanji: '家賃', kana: 'やちん', romaji: 'yachin', arti: 'Biaya Sewa Rumah Bulanan' },
          { kanji: '保証人', kana: 'ほしょうにん', romaji: 'hoshounin', arti: 'Penjamin Sewa (Guarantor)' },
          { kanji: '敷金', kana: 'しききん', romaji: 'shikikin', arti: 'Uang Deposit Kerusakan' },
        ],
      },
      {
        id: 'bank-account',
        titleJp: '銀行口座開設（ゆうちょ銀行）',
        titleId: 'Pembukaan Rekening Bank (Yucho Bank)',
        romaji: 'Ginkou kouza kaisetsu (Yuucho Ginkou)',
        importance: 'WAJIB',
        descId: 'WNA yang baru tiba di Jepang paling mudah membuka rekening di Bank Pos Jepang (Yucho Bank) untuk transfer gaji bulanan dan autodebet tagihan listrik/air/gas.',
        tipsId: 'Bawa Zairyu Card, paspor, dan cap stempel pribadi (Inkan / Hanko) atau tanda tangan sah.',
        keyVocab: [
          { kanji: '通帳', kana: 'つうちょう', romaji: 'tsuuchou', arti: 'Buku Tabungan Fisik' },
          { kanji: '暗証番号', kana: 'あんしょうばんごう', romaji: 'anshou bangou', arti: 'Nomor PIN ATM 4 Digit' },
          { kanji: '給与振込', kana: 'きゅうよふりこみ', romaji: 'kyuuyo furikomi', arti: 'Transfer Pembayaran Gaji' },
        ],
      },
    ],
  },
  disaster: {
    tabId: 'disaster',
    tabTitle: 'Mitigasi Gempa & Darurat (防災・避難)',
    tabIcon: '🚨',
    tagline: 'Protokol perlindungan diri saat gempa bumi besar, tsunami, dan kebakaran',
    items: [
      {
        id: 'earthquake-action',
        titleJp: '地震発生時の初動対応',
        titleId: 'Tindakan Awal Saat Terjadi Gempa Bumi',
        romaji: 'Jishin hasseiji no shodou taiou',
        importance: 'DARURAT',
        descId: 'Prinsip 3 Detik: Lindungi Kepala (masuk ke bawah meja kokoh), matikan kompor gas setelah guncangan mereda, dan buka pintu keluar apartemen agar tidak terkunci macet.',
        tipsId: 'Jangan pernah menggunakan lift saat atau sesudah gempa bumi!',
        keyVocab: [
          { kanji: '緊急地震速報', kana: 'きんきゅうじしんそくほう', romaji: 'kinkyuu jishin sokuhou', arti: 'Peringatan Dini Gempa Bumi HP' },
          { kanji: '避難所', kana: 'ひなんじょ', romaji: 'hinanjo', arti: 'Tempat Evakuasi Pengungsian Resmi' },
          { kanji: '非常口', kana: 'ひじょうぐち', romaji: 'hijouguchi', arti: 'Pintu Darurat Kebakaran' },
        ],
      },
      {
        id: 'emergency-numbers',
        titleJp: '緊急通報ダイヤル（110番・119番）',
        titleId: 'Nomor Darurat Nasional Jepang (110 & 119)',
        romaji: 'Kinkyuu tsuuhou daiyaru (110 / 119)',
        importance: 'DARURAT',
        descId: 'Telepon 110 untuk Polisi (Keisatsu - kecelakaan, kriminalitas). Telepon 119 untuk Pemadam Kebakaran & Ambulans (Shoubousho / Kyuukyuusha - sakit mendadak parah, kebakaran).',
        tipsId: 'Saat menelepon 119, operator akan bertanya: "Kaji desu ka? Kyuukyuu desu ka?" (Kebakaran atau Ambulans Sakit?). Jawab dengan jelas!',
        keyVocab: [
          { kanji: '火事', kana: 'かじ', romaji: 'kaji', arti: 'Kebakaran (119)' },
          { kanji: '救急車', kana: 'きゅうきゅうしゃ', romaji: 'kyuukyuusha', arti: 'Mobil Ambulans Darurat (119)' },
          { kanji: '警察', kana: 'けいさつ', romaji: 'keisatsu', arti: 'Kantor Polisi (110)' },
        ],
      },
    ],
  },
};

interface SeikatsuLivingGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: SeikatsuTab;
}

export const SeikatsuLivingGuideModal: React.FC<SeikatsuLivingGuideModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'shiyakusho',
}) => {
  const { showToast } = useAppStore();
  const [activeTab, setActiveTab] = useState<SeikatsuTab>(initialTab);
  const [checkedProcedures, setCheckedProcedures] = useState<Record<string, boolean>>({});

  const currentSection = SEIKATSU_GUIDE_DATA[activeTab];

  const handleToggleProcedure = (itemId: string) => {
    setCheckedProcedures((prev) => {
      const next = !prev[itemId];
      if (next) {
        playSuccessSfx();
        showToast('Prosedur ditandai telah dipahami! ✓', '⭐');
      }
      return { ...prev, [itemId]: next };
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-stone-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[92dvh] sm:max-h-[92vh] overflow-y-auto rounded-3xl bg-surface-2 border border-accent/30 shadow-2xl flex flex-col">
        {/* ── TOP HEADER ── */}
        <div className="bg-surface-3 border-b border-accent/20 p-4 sm:p-5 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-2xl sm:text-3xl p-2 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-accent shrink-0">
              🗾
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-xl font-black text-appText-bright truncate">
                  Panduan Hidup & Bekerja di Jepang (Seikatsu Nihongo)
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-extrabold text-[10px] uppercase">
                  Resmi MIC
                </span>
              </div>
              <p className="text-xs text-appText-muted mt-0.5 truncate">
                Prosedur administrasi balai kota, etika sampah, perbankan, dan kesiapsiagaan bencana gempa.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface hover:bg-surface-3 text-appText-muted hover:text-appText-bright flex items-center justify-center text-sm transition-colors shrink-0"
            aria-label="Tutup Panduan"
          >
            ✕
          </button>
        </div>

        {/* ── 4 DOMAIN NAVIGATION TABS ── */}
        <div className="p-3 sm:p-4 bg-surface border-b border-accent/15 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
          {(['shiyakusho', 'gomi', 'housing', 'disaster'] as SeikatsuTab[]).map((tabKey) => {
            const tabData = SEIKATSU_GUIDE_DATA[tabKey];
            const isSelected = activeTab === tabKey;

            return (
              <button
                key={tabKey}
                type="button"
                onClick={() => setActiveTab(tabKey)}
                className={`min-h-[44px] px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 active:scale-95 ${
                  isSelected
                    ? 'bg-amber-500 text-stone-950 font-black shadow-md'
                    : 'bg-surface-2 hover:bg-surface-3 text-appText-muted hover:text-appText-bright border border-accent/15'
                }`}
              >
                <span className="text-base">{tabData.tabIcon}</span>
                <span>{tabData.tabTitle}</span>
              </button>
            );
          })}
        </div>

        {/* ── ACTIVE DOMAIN CONTENT ── */}
        <div className="p-4 sm:p-7 space-y-5 overflow-y-auto flex-1">
          {/* Domain Tagline Banner */}
          <div className="bg-gradient-to-r from-amber-500/10 via-surface to-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-center gap-3 shadow-sm">
            <span className="text-2xl p-2 rounded-xl bg-amber-500/20 text-accent shrink-0">
              {currentSection.tabIcon}
            </span>
            <div className="min-w-0">
              <h3 className="font-extrabold text-sm sm:text-base text-appText-bright">
                {currentSection.tabTitle}
              </h3>
              <p className="text-xs text-appText-muted mt-0.5">
                {currentSection.tagline}
              </p>
            </div>
          </div>

          {/* Guide Items Cards */}
          <div className="space-y-4">
            {currentSection.items.map((item) => {
              const isChecked = !!checkedProcedures[item.id];

              return (
                <div
                  key={item.id}
                  className={`p-4 sm:p-5 rounded-2xl border transition-colors space-y-3.5 ${
                    isChecked
                      ? 'bg-surface/90 border-emerald-500/40 shadow-sm'
                      : 'bg-surface border-accent/20'
                  }`}
                >
                  {/* Item Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                            item.importance === 'DARURAT'
                              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse'
                              : item.importance === 'WAJIB'
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                              : 'bg-surface-3 text-appText-muted'
                          }`}
                        >
                          {item.importance}
                        </span>
                        <h4 className="font-jp text-base font-bold text-appText-bright">
                          {item.titleJp}
                        </h4>
                        <button
                          type="button"
                          onClick={() => speakJapanese(item.titleJp)}
                          className="p-1 rounded hover:bg-surface-2 text-accent"
                          title="Dengarkan Audio Jepang"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-xs text-appText-muted font-bold">
                        🇮🇩 {item.titleId} <span className="font-normal font-mono text-[10px]">({item.romaji})</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleProcedure(item.id)}
                      className={`min-h-[38px] px-3.5 py-1.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 shrink-0 ${
                        isChecked
                          ? 'bg-emerald-500 text-stone-950 border-emerald-500 font-black'
                          : 'bg-surface-2 hover:bg-surface-3 border-accent/20 text-appText-muted hover:text-appText-bright'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isChecked ? 'Sudah Dipahami ✓' : 'Tandai Dipahami'}</span>
                    </button>
                  </div>

                  {/* Description & Tips */}
                  <p className="text-xs text-appText leading-relaxed">
                    {item.descId}
                  </p>

                  <div className="p-3 rounded-xl bg-surface-2 border border-accent/15 space-y-1 text-xs">
                    <div className="font-bold text-accent flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Tips Praktis Orang Jepang:</span>
                    </div>
                    <p className="text-appText-muted leading-relaxed">
                      {item.tipsId}
                    </p>
                  </div>

                  {/* Vocabulary Pills */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[10px] font-bold text-appText-muted uppercase tracking-wider">
                      Kosakata Kunci Penting:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {item.keyVocab.map((vocab, vIdx) => (
                        <div
                          key={vIdx}
                          className="p-2 rounded-xl bg-surface-2 border border-accent/15 flex items-center justify-between gap-2"
                        >
                          <div className="min-w-0">
                            <div className="font-jp text-xs font-bold text-appText-bright flex items-center gap-1">
                              <span>{vocab.kanji}</span>
                              <span className="text-[10px] text-accent font-normal font-mono">
                                ({vocab.kana})
                              </span>
                            </div>
                            <div className="text-[10px] text-appText-muted truncate">
                              {vocab.arti}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => speakJapanese(vocab.kanji)}
                            className="p-1 rounded hover:bg-surface-3 text-accent shrink-0"
                            title="Dengarkan Kosakata"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div className="p-3.5 sm:p-4 bg-surface-3 border-t border-accent/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 text-xs">
          <div className="text-appText-muted text-[11px] flex items-center gap-1.5">
            <Info className="w-4 h-4 text-accent shrink-0" />
            <span>Panduan ini disusun berdasarkan pedoman resmi Kementerian Dalam Negeri & Komunikasi Jepang (MIC).</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs transition-colors self-end sm:self-auto"
          >
            Tutup Panduan
          </button>
        </div>
      </div>
    </div>
  );
};
