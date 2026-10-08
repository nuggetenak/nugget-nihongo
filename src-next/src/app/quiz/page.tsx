import QuizRunner from "@/components/QuizRunner";

export default function QuizPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-white tracking-tight">Latihan & Quiz</h1>
          <p className="text-xs text-gray-400">Review terjadwal dengan Spaced Repetition (FSRS)</p>
        </div>
      </div>
      <QuizRunner />
    </div>
  );
}
