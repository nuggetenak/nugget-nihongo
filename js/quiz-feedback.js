// ══════════════════════════════════════
//  quiz-feedback.js — Shared Quiz Feedback Renderer
//  v2 — semua bug fix dari audit sudah diapply
//  Load order: setelah multichoice.js, sebelum detail.js dan app.js
// ══════════════════════════════════════

(function () {

  // ─────────────────────────────────────────────────────────────
  //  1. buildBreakdownSafe
  //     Highlight partikel JP dengan visual spacer.
  //     AMAN: isi <b>…</b> tidak akan tersentuh regex.
  // ─────────────────────────────────────────────────────────────
  window.buildBreakdownSafe = function (jpHtml) {
    // Urutkan dari terpanjang ke terpendek supaya "から" tidak
    // di-match sebelum "か"
    const particles = [
      'から','まで','ので','のに','けれど','けど','ても','でも',
      'たら','ながら','ては','では','には','へは',
      'は','が','を','に','で','も','と','の','へ','て'
    ];

    // Lindungi <b>…</b> dengan placeholder agar regex tidak masuk
    const saved = [];
    let out = jpHtml.replace(/<b>([\s\S]*?)<\/b>/g, (_, inner) => {
      saved.push(inner);
      return '\x00' + (saved.length - 1) + '\x00';
    });

    // Terapkan highlight hanya di luar <b>
    for (const p of particles) {
      out = out.replace(
        new RegExp(`(${p})`, 'g'),
        '<span class="bd-particle">$1</span><span class="bd-gap"></span>'
      );
    }

    // Kembalikan <b> asli
    out = out.replace(/\x00(\d+)\x00/g, (_, i) => `<b>${saved[+i]}</b>`);
    return out;
  };


  // ─────────────────────────────────────────────────────────────
  //  2. formatExplanation
  //     Parse teks mentah dari bank soal menjadi HTML terformat.
  //     Mendukung dua format utama:
  //       A) 〜grammar = penjelasan. "Terjemahan."
  //       B) base → result. Keterangan. "Terjemahan."
  // ─────────────────────────────────────────────────────────────
  window.formatExplanation = function (raw) {
    if (!raw) return '';
    let text = raw.trim();

    // — Ekstrak terjemahan dalam tanda petik di akhir baris —
    let translation = '';
    const qm = text.match(/[「""]([^「」""]+)[」""]\.?\s*$/);
    if (qm) {
      translation = qm[1];
      text = text.slice(0, text.lastIndexOf(qm[0])).trim().replace(/\.?\s*$/, '');
    }

    let grammarPart = '', resultPart = '', explPart = text;

    // — Pattern A: grammar = penjelasan —
    const eqM = text.match(/^(.{1,40}?)\s*=\s*(.+)$/s);
    if (eqM) {
      grammarPart = eqM[1].trim();
      explPart    = eqM[2].trim();
    }
    // — Pattern B: base → result. Keterangan —
    else {
      const arM = text.match(/^(.{1,40}?)\s*→\s*([^。.]+)[。.]?\s*(.*)$/s);
      if (arM) {
        grammarPart = arM[1].trim();
        resultPart  = arM[2].trim();
        explPart    = arM[3].trim();
      }
    }

    // — Bangun HTML —
    let html = '';

    if (grammarPart) {
      html += `<span class="qfb-grammar-tag">${grammarPart}</span>`;
    }
    if (resultPart) {
      // Hasil konjugasi ditampilkan sebagai "hasil" pill
      html += `<span class="qfb-result-tag">→ ${resultPart}</span>`;
    }
    if (explPart) {
      // Bold pola grammar (〜xyz) dalam teks
      const fmt = explPart.replace(
        /(〜[\w\u3040-\u30FF\u4E00-\u9FFF]+)/g,
        '<strong>$1</strong>'
      );
      html += `<p class="qfb-expl-text">${fmt}</p>`;
    }
    if (translation) {
      html += `<div class="qfb-translation">💬 <em>${translation}</em></div>`;
    }

    return html || `<p class="qfb-expl-text">${raw}</p>`;
  };


  // ─────────────────────────────────────────────────────────────
  //  3. renderQuizFeedback
  //     Dipanggil dari semua quiz mode setelah jawaban dipilih.
  //
  //  config = {
  //    correct      : boolean
  //    answerLabel  : string|null   — teks jawaban benar (jika salah)
  //    sentence     : string|null   — kalimat JP/ID untuk breakdown
  //    sentenceId   : string        — id unik soal ini
  //    explanation  : string        — teks mentah dari bank soal
  //    verdictEl    : HTMLElement   — elemen untuk teks verdict
  //    explEl       : HTMLElement   — elemen untuk penjelasan
  //    feedbackEl   : HTMLElement   — container feedback keseluruhan
  //    insertBefore : HTMLElement   — sisipkan sentence block sebelum ini
  //    skipVerdict  : boolean       — true = jangan tulis ke verdictEl
  //                                   (untuk mode yang set verdict sendiri)
  //  }
  // ─────────────────────────────────────────────────────────────
  window.renderQuizFeedback = function (cfg) {
    const {
      correct, answerLabel, sentence, sentenceId,
      explanation, verdictEl, explEl, feedbackEl,
      insertBefore, skipVerdict = false
    } = cfg;

    // 1 ── Verdict (kecuali mode yang handle sendiri)
    if (!skipVerdict && verdictEl) {
      if (correct) {
        verdictEl.innerHTML = '<span class="qfb-correct">✅ Benar!</span>';
      } else {
        const ans = answerLabel
          ? `<span class="qfb-correct-ans">Jawaban: <strong>${answerLabel}</strong></span>`
          : '';
        verdictEl.innerHTML =
          `<span class="qfb-wrong">❌ Kurang tepat</span>${ans ? '<br>' + ans : ''}`;
      }
    }

    // 2 ── Explanation terformat
    if (explEl) {
      explEl.innerHTML = window.formatExplanation(explanation);
    }

    // 3 ── Sentence breakdown block
    //       Hapus block lama (jika soal sebelumnya belum di-clear)
    const old = feedbackEl.querySelector('.qfb-sentence-block');
    if (old) old.remove();

    if (sentence && sentenceId) {
      const nId  = `qfb-n-${sentenceId}`;
      const bId  = `qfb-b-${sentenceId}`;
      const lbId = `qfb-l-${sentenceId}`;
      const broken = window.buildBreakdownSafe(sentence);

      const block = document.createElement('div');
      block.className = 'qfb-sentence-block';
      block.innerHTML = `
        <div class="qfb-sentence-label">Kalimat Lengkap</div>
        <div class="qfb-sentence-wrap">
          <div class="qfb-sentence-jp" id="${nId}">${sentence}</div>
          <div class="qfb-sentence-jp qfb-sentence-jp--broken"
               id="${bId}" style="display:none">${broken}</div>
          <button class="qfb-bd-btn"
                  onclick="window.toggleQuizBreakdown('${sentenceId}')">
            <span class="qfb-bd-icon">⌥</span>
            <span id="${lbId}">Breakdown</span>
          </button>
        </div>`;

      if (insertBefore && feedbackEl.contains(insertBefore)) {
        feedbackEl.insertBefore(block, insertBefore);
      } else {
        feedbackEl.appendChild(block);
      }
    }

    // 4 ── Tampilkan feedback container
    feedbackEl.style.display = 'block';
  };


  // ─────────────────────────────────────────────────────────────
  //  4. toggleQuizBreakdown
  // ─────────────────────────────────────────────────────────────
  window.toggleQuizBreakdown = function (id) {
    const normal = document.getElementById(`qfb-n-${id}`);
    const broken = document.getElementById(`qfb-b-${id}`);
    const label  = document.getElementById(`qfb-l-${id}`);
    if (!normal || !broken) return;

    const open = broken.style.display !== 'none';
    normal.style.display = open ? '' : 'none';
    broken.style.display = open ? 'none' : '';
    if (label) label.textContent = open ? 'Breakdown' : 'Ringkas';

    // Toggle active style pada button
    const btn = normal.closest('.qfb-sentence-block')?.querySelector('.qfb-bd-btn');
    if (btn) btn.classList.toggle('active', !open);
  };

})();
