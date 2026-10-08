"use client";

import React, { useState } from "react";
import { useAppStore } from "@/lib/store";
import { Volume2, Moon, Download, Upload, AlertTriangle, Check, ShieldCheck } from "lucide-react";

export default function SettingsPage() {
  const { settings, updateSettings, exportData, importData, resetProgress } = useAppStore();
  const [importText, setImportText] = useState("");
  const [showImport, setShowImport] = useState(false);
  const [importSuccess, setImportSuccess] = useState<boolean | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleDownloadExport = () => {
    const dataStr = exportData();
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `nugget-nihongo-backup-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportSubmit = () => {
    if (!importText.trim()) return;
    const ok = importData(importText.trim());
    setImportSuccess(ok);
    if (ok) {
      setTimeout(() => {
        setShowImport(false);
        setImportText("");
        setImportSuccess(null);
      }, 1500);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-xl font-black text-white tracking-tight">Pengaturan</h1>
        <p className="text-xs text-gray-400">Preferensi tampilan, audio, dan pencadangan data</p>
      </div>

      {/* Belajar & Tampilan */}
      <div className="glass-panel p-5 space-y-4">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          Preferensi Belajar
        </h2>

        {/* Furigana toggle */}
        <div className="flex items-center justify-between py-1">
          <div>
            <span className="text-sm font-bold text-white block">Tampilkan Furigana</span>
            <span className="text-xs text-gray-400">Tampilkan cara baca di atas kanji</span>
          </div>
          <button
            onClick={() => updateSettings({ showFurigana: !settings.showFurigana })}
            className={`w-12 h-6 rounded-full transition-colors relative ${
              settings.showFurigana ? "bg-nugget-amber" : "bg-surface-border"
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                settings.showFurigana ? "translate-x-6" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>

        {/* Romaji toggle */}
        <div className="flex items-center justify-between py-1 border-t border-surface-border/50 pt-3">
          <div>
            <span className="text-sm font-bold text-white block">Tampilkan Romaji</span>
            <span className="text-xs text-gray-400">Ejaan latin di kosakata dan kalimat</span>
          </div>
          <button
            onClick={() => updateSettings({ showRomaji: !settings.showRomaji })}
            className={`w-12 h-6 rounded-full transition-colors relative ${
              settings.showRomaji ? "bg-nugget-amber" : "bg-surface-border"
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                settings.showRomaji ? "translate-x-6" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>

        {/* Audio speed */}
        <div className="border-t border-surface-border/50 pt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-nugget-amber" />
            <span className="text-sm font-bold text-white">Kecepatan Suara</span>
          </div>
          <div className="flex gap-1.5">
            {[0.8, 1.0, 1.2].map((spd) => (
              <button
                key={spd}
                onClick={() => updateSettings({ audioSpeed: spd })}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors ${
                  settings.audioSpeed === spd
                    ? "bg-nugget-amber text-black"
                    : "bg-surface-100 text-gray-400 hover:text-white"
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>

        {/* Gemini API Key */}
        <div className="border-t border-surface-border/50 pt-3 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-white">Google Gemini API Key</span>
            <span className="text-[11px] text-gray-400">Untuk Sensei AI</span>
          </div>
          <input
            type="password"
            defaultValue={typeof window !== "undefined" ? localStorage.getItem("nn_gemini_api_key") || "" : ""}
            onChange={(e) => {
              if (typeof window !== "undefined") {
                localStorage.setItem("nn_gemini_api_key", e.target.value.trim());
              }
            }}
            placeholder="Masukkan Gemini API Key..."
            className="w-full px-3 py-2 rounded-xl bg-surface-200 border border-surface-border text-xs text-white placeholder-gray-500 outline-none font-mono"
          />
        </div>
      </div>

      {/* Cadangkan & Pulihkan */}
      <div className="glass-panel p-5 space-y-4">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          Cadangkan & Pulihkan Data
        </h2>

        <p className="text-xs text-gray-400 leading-relaxed">
          Semua progres tersimpan secara lokal dan otomatis. Anda bisa mengekspor progres untuk disimpan atau dipindahkan ke perangkat lain.
        </p>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            onClick={handleDownloadExport}
            className="py-3 px-4 rounded-xl bg-surface-100 hover:bg-surface-200 border border-surface-border text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4 text-nugget-amber" />
            <span>Ekspor JSON</span>
          </button>

          <button
            onClick={() => setShowImport(!showImport)}
            className="py-3 px-4 rounded-xl bg-surface-100 hover:bg-surface-200 border border-surface-border text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <Upload className="w-4 h-4 text-nugget-gold" />
            <span>Impor Data</span>
          </button>
        </div>

        {showImport && (
          <div className="space-y-3 pt-3 border-t border-surface-border">
            <textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder="Tempelkan (paste) isi file JSON backup di sini..."
              rows={4}
              className="w-full p-3 rounded-xl bg-surface-200 border border-surface-border text-xs text-white placeholder-gray-500 outline-none font-mono"
            />
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-gray-500">
                {importSuccess === true && <span className="text-nugget-green">✅ Impor berhasil!</span>}
                {importSuccess === false && <span className="text-nugget-red">❌ Format data tidak valid</span>}
              </span>
              <button
                onClick={handleImportSubmit}
                className="px-4 py-2 rounded-xl bg-nugget-amber text-black font-extrabold text-xs"
              >
                Terapkan Data
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Zona Bahaya */}
      <div className="glass-panel p-5 space-y-3 border-red-500/20">
        <h2 className="text-xs font-bold text-red-400 uppercase tracking-widest flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4" />
          Zona Bahaya
        </h2>
        <p className="text-xs text-gray-400">
          Reset seluruh statistik belajar, riwayat review FSRS, dan streak dari nol.
        </p>

        {!showResetConfirm ? (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="w-full py-2.5 rounded-xl border border-red-500/30 text-red-400 font-bold text-xs hover:bg-red-500/10 transition-colors"
          >
            Reset Semua Progres
          </button>
        ) : (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 space-y-2">
            <p className="text-xs text-red-300 font-semibold text-center">
              Yakin ingin mereset semua data? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2 rounded-lg bg-surface-100 text-xs font-bold text-white"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  resetProgress();
                  setShowResetConfirm(false);
                }}
                className="flex-1 py-2 rounded-lg bg-red-600 text-xs font-bold text-white hover:bg-red-700"
              >
                Ya, Hapus Semua
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Tentang */}
      <div className="text-center py-4 space-y-1 text-gray-500 text-xs">
        <p className="font-semibold text-gray-400">Nugget Nihongo · v16.0.0 Next.js</p>
        <p>Arsitektur Frontend Modern dengan Tailwind CSS & Google Gemini</p>
      </div>
    </div>
  );
}
