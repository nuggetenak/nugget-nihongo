import React from 'react';
import { Award, RotateCcw, Home, Sparkles, CheckCircle2, XCircle } from 'lucide-react';
import { QuizQuestionItem } from '../../lib/quiz/quizEngine';

interface QuizResultViewProps {
  score: number;
  total: number;
  xpEarned: number;
  answers: Array<{ question: QuizQuestionItem; isCorrect: boolean; selected: string }>;
  onRestart: () => void;
  onGoHome: () => void;
}

export const QuizResultView: React.FC<QuizResultViewProps> = ({
  score,
  total,
  xpEarned,
  answers,
  onRestart,
  onGoHome,
}) => {
  const percentage = Math.round((score / total) * 100);

  let feedbackTitle = 'Luar Biasa! 素晴らしい！ 🎉';
  let feedbackDesc = 'Semua jawabanmu tepat sasaran. Terus pertahankan ritme belajarmu!';

  if (percentage < 50) {
    feedbackTitle = 'Jangan Menyerah! 頑張ろう！ 🍙';
    feedbackDesc = 'Kesalahan adalah bagian dari proses mengingat. Coba review kembali kata-kata di bawah ini.';
  } else if (percentage < 80) {
    feedbackTitle = 'Bagus Sekali! よくできました！ ✨';
    feedbackDesc = 'Hampir sempurna! Beberapa detail kecil hanya butuh satu kali latihan lagi.';
  }

  return (
    <div className="max-w-xl mx-auto py-6 space-y-6 animate-in zoom-in-95 duration-300">
      {/* Result Hero Card */}
      <div className="bg-surface border-2 border-accent/30 rounded-3xl p-8 text-center space-y-4 shadow-xl relative overflow-hidden">
        <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-500/20 text-accent-hot border border-amber-500/40 flex items-center justify-center text-3xl shadow-glow">
          🏆
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-appText-bright">
            {feedbackTitle}
          </h2>
          <p className="text-xs text-appText-muted mt-1 max-w-md mx-auto">
            {feedbackDesc}
          </p>
        </div>

        {/* Score Ring / Stats Box */}
        <div className="grid grid-cols-3 gap-3 pt-3 border-t border-accent/15">
          <div className="bg-surface-2 p-3 rounded-2xl border border-accent/10">
            <div className="text-[10px] font-bold uppercase tracking-wider text-appText-muted">Skor Akurasi</div>
            <div className="text-xl font-bold font-mono text-accent-hot mt-0.5">{percentage}%</div>
          </div>
          <div className="bg-surface-2 p-3 rounded-2xl border border-accent/10">
            <div className="text-[10px] font-bold uppercase tracking-wider text-appText-muted">Benar / Total</div>
            <div className="text-xl font-bold font-mono text-appText-bright mt-0.5">{score} / {total}</div>
          </div>
          <div className="bg-surface-2 p-3 rounded-2xl border border-accent/10">
            <div className="text-[10px] font-bold uppercase tracking-wider text-appText-muted">XP Diraih</div>
            <div className="text-xl font-bold font-mono text-green-400 mt-0.5">+{xpEarned} XP</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={onRestart}
            className="px-5 py-2.5 rounded-xl bg-accent text-bg font-bold text-xs flex items-center gap-2 hover:bg-accent-hot transition-all shadow-glow"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Latihan Lagi</span>
          </button>
          <button
            onClick={onGoHome}
            className="px-5 py-2.5 rounded-xl bg-surface-2 text-appText-bright border border-accent/25 font-bold text-xs flex items-center gap-2 hover:bg-surface-3 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Ke Beranda</span>
          </button>
        </div>
      </div>

      {/* Review Answers List */}
      <div className="space-y-3">
        <h3 className="font-bold text-sm text-appText-bright">Rincian Pertanyaan:</h3>
        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          {answers.map((ans, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-2xl border text-xs flex items-start justify-between gap-3 ${
                ans.isCorrect
                  ? 'bg-emerald-950/20 border-emerald-500/25'
                  : 'bg-red-950/20 border-red-500/25'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-appText-bright font-jp text-sm">
                    {ans.question.questionText}
                  </span>
                  {ans.question.subText && (
                    <span className="text-[11px] text-appText-muted">{ans.question.subText}</span>
                  )}
                </div>
                <div className="text-appText-muted">{ans.question.explanation}</div>
              </div>

              <div className="shrink-0 mt-0.5">
                {ans.isCorrect ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-400" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
