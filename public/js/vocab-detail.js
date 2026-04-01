// ══════════════════════════════════════════════════════
//  js/vocab-detail.js — Nugget Nihongo
//  Vocab Detail Modal — tap kartu vocab → modal lengkap
//  Load SETELAH browse-vocab.js dan vocab-index.js
// ══════════════════════════════════════════════════════

(function () {

const POS_LABEL = {
  'verb-u'   : 'Kata Kerja (Godan)',
  'verb-ru'  : 'Kata Kerja (Ichidan)',
  'verb-suru': 'Kata Kerja (する)',
  'verb-kuru': 'Kata Kerja Ireguler',
  'noun'     : 'Kata Benda',
  'i-adj'    : 'Kata Sifat い',
  'na-adj'   : 'Kata Sifat な',
  'adverb'   : 'Kata Keterangan',
  'particle' : 'Partikel',
  'expr'     : 'Ekspresi',
  'conj'     : 'Konjungsi',
  'counter'  : 'Kata Bilangan',
  'pronoun'  : 'Kata Ganti',
};

const FORMALITAS = ['', 'Kasual', 'Netral', 'Formal', 'Sangat Formal'];

// ── Open modal ──────────────────────────────────────────
window.openVocabDetail = function (vocabId) {
  const v = window.vocabIdx
    ? window.vocabIdx.byId.get(vocabId)
    : (window.vocabDB || []).find(x => x.id === vocabId);

  if (!v) return;

  const modal = document.getElementById('vocabDetailModal');
  if (!modal) return;

  const jlpt = v.jlpt || 'n5';

  // ── Header ──────────────────────────────────────────
  const headerHTML = `
    <div class="vd-header">
      <div class="vd-header-badges">
        <span class="vb-jlpt-badge vb-jlpt-${jlpt}">${jlpt.toUpperCase()}</span>
        <span class="vb-pos-tag">${POS_LABEL[v.pos] || v.pos || ''}</span>
        ${v.common ? '<span class="vd-common-badge">よく使う</span>' : ''}
      </div>
      <div class="vd-word">${v.word}</div>
      <div class="vd-reading">${v.reading}
        ${v.romaji ? `<span class="vd-romaji">${v.romaji}</span>` : ''}
      </div>
      <div class="vd-meaning-main">${v.meaning_id}</div>
      ${v.meaning_en ? `<div class="vd-meaning-en">${v.meaning_en}</div>` : ''}
    </div>`;

  // ── Nuance / tips ───────────────────────────────────
  const nuanceHTML = v.nuance ? `
    <div class="vd-section">
      <div class="vd-section-title">💡 Catatan Pemakaian</div>
      <div class="vd-nuance">${v.nuance}</div>
    </div>` : '';

  // ── Examples ────────────────────────────────────────
  const exHTML = v.examples && v.examples.length ? `
    <div class="vd-section">
      <div class="vd-section-title">📝 Contoh Kalimat</div>
      ${v.examples.map(e => `
        <div class="vd-example">
          <div class="vd-ex-jp">${e.jp}</div>
          <div class="vd-ex-id">${e.id}</div>
          ${e.tags && e.tags.length ? `<div class="vd-ex-tags">${e.tags.map(t => `<span class="vd-tag">${t}</span>`).join('')}</div>` : ''}
        </div>`).join('')}
    </div>` : '';

  // ── Formalitas & Register ──────────────────────────
  const formalHTML = (v.formalitas || v.register) ? `
    <div class="vd-section vd-section-row">
      ${v.formalitas ? `<div class="vd-meta-chip">📊 ${FORMALITAS[v.formalitas] || v.formalitas}</div>` : ''}
      ${v.register   ? `<div class="vd-meta-chip">🗣️ ${v.register}</div>` : ''}
    </div>` : '';

  // ── Domain ──────────────────────────────────────────
  const domainHTML = v.domain && v.domain.length ? `
    <div class="vd-section">
      <div class="vd-section-title">🏷️ Topik</div>
      <div class="vd-tags-row">${v.domain.map(d => `<span class="vd-tag">${d}</span>`).join('')}</div>
    </div>` : '';

  // ── Sinonim / Antonim / See Also ────────────────────
  const _resolveWords = ids => (ids || [])
    .map(id => {
      const entry = window.vocabIdx
        ? window.vocabIdx.byId.get(id)
        : (window.vocabDB || []).find(x => x.id === id);
      return entry
        ? `<button class="vd-relation-btn" onclick="openVocabDetail('${id}')">${entry.word} <span class="vd-rel-reading">${entry.reading}</span></button>`
        : null;
    }).filter(Boolean).join('');

  const synonymsHTML  = v.synonyms  && v.synonyms.length  ? `<div class="vd-relation-row"><span class="vd-rel-label">≈ Sinonim</span>${_resolveWords(v.synonyms)}</div>`  : '';
  const antonymsHTML  = v.antonyms  && v.antonyms.length  ? `<div class="vd-relation-row"><span class="vd-rel-label">↔ Antonim</span>${_resolveWords(v.antonyms)}</div>`  : '';
  const seeAlsoHTML   = v.see_also  && v.see_also.length  ? `<div class="vd-relation-row"><span class="vd-rel-label">↗ Lihat juga</span>${_resolveWords(v.see_also)}</div>` : '';
  const relationsHTML = (synonymsHTML || antonymsHTML || seeAlsoHTML) ? `
    <div class="vd-section">
      <div class="vd-section-title">🔗 Relasi Kata</div>
      ${synonymsHTML}${antonymsHTML}${seeAlsoHTML}
    </div>` : '';

  // ── Konjugasi hint ───────────────────────────────────
  let conjHTML = '';
  if (v.conj_type && window.conjugateAll) {
    try {
      const forms = window.conjugateAll(v.reading);
      const labels = {
        dict: '辞書形', masu: 'ます形', nai: 'ない形',
        ta: 'た形', te: 'て形', potential: '可能形',
        passive: '受身形', causative: '使役形',
        tai: 'たい形', nakute: 'なくて形',
        nagara: 'ながら形', nasai: 'なさい形',
      };
      const rows = Object.entries(forms)
        .filter(([k]) => labels[k])
        .map(([k, val]) => `<div class="vd-conj-row"><span class="vd-conj-label">${labels[k]}</span><span class="vd-conj-val">${val}</span></div>`)
        .join('');
      if (rows) conjHTML = `
        <div class="vd-section">
          <div class="vd-section-title">🔤 Konjugasi</div>
          <div class="vd-conj-grid">${rows}</div>
        </div>`;
    } catch(e) {}
  }

  // ── Assemble & inject ────────────────────────────────
  modal.querySelector('.vd-body').innerHTML =
    headerHTML + formalHTML + nuanceHTML + exHTML + domainHTML + relationsHTML + conjHTML;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
};

// ── Close modal ──────────────────────────────────────────
window.closeVocabDetail = function () {
  const modal = document.getElementById('vocabDetailModal');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
};

// ── Close on backdrop click ──────────────────────────────
document.addEventListener('click', function (e) {
  const modal = document.getElementById('vocabDetailModal');
  if (modal && modal.classList.contains('open') && e.target === modal) {
    window.closeVocabDetail();
  }
});

// ── Close on Escape ──────────────────────────────────────
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') window.closeVocabDetail();
});

})();
