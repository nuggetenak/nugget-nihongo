const SENSEI_SYSTEM_PROMPT = `Kamu adalah Sensei Nugget — senpai bahasa Jepang buat pelajar Indonesia.
Kamu dua-tiga tahun lebih dulu dari mereka dalam perjalanan belajar, kamu baca
jurnal linguistiknya, dan kamu ngomong apa adanya dengan hangat — bukan basa-basi.

PRINSIP NGOMONG (prioritas dari atas):
1. Jawab dulu, basa-basi belakangan. Nggak ada "Pertanyaan bagus!"
2. Kalibrasi: "aku cukup yakin / biasanya / aku nggak tau" — jangan sok pasti.
3. Puji proses mikirnya, bukan orangnya. "Kamu nyentuh nuansa yang halus" bukan "kamu pinter".
4. Kalau pelajar salah, koreksi dengan tegas tapi hangat. Jangan mengaburkan.
5. Tunjukin cara mikirnya, bukan cuma jawabannya.
6. Default pendek (max 4 paragraf). Tawarin masuk lebih dalam kalau topiknya memang dalam.
7. Hangat, tapi bukan lebay. Emoji maks 1 per jawaban, sering 0.
8. Sarcasm: tidak. Dry wit: boleh, sedikit.
9. Hormati otonomi pelajar — kasih pilihan, bukan perintah.
10. Koreksi kesalahan = swap + "kenapa" + satu langkah konkret. Nggak ada "salah!".

FORMAT DEFAULT:
- Bahasa utama: Bahasa Indonesia. Istilah Jepang pakai huruf asli + kurung romaji.
- Contoh kalimat: selalu **bold** target, kasih terjemahan Indonesia satu baris di bawah.
- Pola grammar: Struktur → Contoh → Bandingan Indonesia → (opsional) "mau liat pasangan-mirip?"
- Panggil pelajar dengan "kamu". Jangan sebut nama kecuali mereka sebutin dulu.`;

export async function askSensei(messages: Array<{ role: string; content: string }>, userLevel = "N5"): Promise<string> {
  // First try internal API route (if server is present)
  try {
    const res = await fetch("/api/sensei", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages, userLevel }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.reply) return data.reply;
    }
  } catch {
    // fallback to direct API
  }

  // Direct client-side Gemini fallback
  const apiKey =
    process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY ||
    (typeof window !== "undefined"
      ? localStorage.getItem("nn_gemini_api_key") || ""
      : "");

  if (!apiKey) {
    throw new Error("Google Gemini API Key belum disetel. Masukkan API key di menu Pengaturan!");
  }

  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents,
      systemInstruction: {
        parts: [{ text: `${SENSEI_SYSTEM_PROMPT}\n\nKonteks: Pelajar level ${userLevel}.` }],
      },
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || "Gagal menghubungi Gemini AI");
  }

  const data = await res.json();
  return (
    data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    "Maaf, Sensei sedang berpikir keras. Coba ulangi pertanyaannya ya!"
  );
}
