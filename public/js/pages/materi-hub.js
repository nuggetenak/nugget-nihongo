// ══════════════════════════════════════════════════════════════════
//  materi-hub.js — Materi Hub (Phase 2)
//  Two-door navigation: JLPT path + Book Series path
//  Adds cross-lens breadcrumbs to card detail modal
//  Load order: after all lens data files, after detail.js, before app.js
// ══════════════════════════════════════════════════════════════════

(function () {

  // ── Book series registry ─────────────────────────────────────
  var SERIES = [
    {
      id       : 'soumatome-n4',
      title    : 'Sou Matome N4',
      subtitle : 'Nihongo Sou Matome — Bunpou',
      publisher: 'ASK Publishing',
      level    : 'n4',
      structure: 'week',
      lensVar  : 'grammarLensSoumatomeN4',
      emoji    : '📘',
      available: true,
    },
    {
      id       : 'soumatome-n3',
      title    : 'Sou Matome N3',
      subtitle : 'Nihongo Sou Matome — Bunpou',
      publisher: 'ASK Publishing',
      level    : 'n3',
      structure: 'week',
      lensVar  : 'grammarLensSoumatomeN3',
      emoji    : '📗',
      available: true,
    },
    {
      id       : 'irodori-a1',
      title    : 'Irodori A1',
      subtitle : 'Japanese for Life in Japan — Starter',
      publisher: 'Japan Foundation',
      level    : 'n5',
      structure: 'lesson',
      lensVar  : 'grammarLensIrodoriA1',
      emoji    : '🌸',
      available: true,
    },
    {
      id       : 'irodori-a2-1',
      title    : 'Irodori A2-1',
      subtitle : 'Japanese for Life in Japan — Elementary 1',
      publisher: 'Japan Foundation',
      level    : 'n5',
      structure: 'lesson',
      lensVar  : 'grammarLensIrodoriA21',
      emoji    : '🌿',
      available: true,
    },
    {
      id       : 'irodori-a2-2',
      title    : 'Irodori A2-2',
      subtitle : 'Japanese for Life in Japan — Elementary 2',
      publisher: 'Japan Foundation',
      level    : 'n4',
      structure: 'lesson',
      lensVar  : 'grammarLensIrodoriA22',
      emoji    : '🌱',
      available: true,
    },
    {
      id       : 'minna-1',
      title    : 'Minna no Nihongo 1',
      subtitle : 'スリーエーネットワーク',
      publisher: 'Three A Network',
      level    : 'n5',
      structure: 'lesson',
      lensVar  : 'bookMinna1',
      emoji    : '📓',
      available: true,
    },
    {
      id       : 'minna-2',
      title    : 'Minna no Nihongo 2',
      subtitle : 'スリーエーネットワーク',
      publisher: 'Three A Network',
      level    : 'n4',
      structure: 'lesson',
      lensVar  : 'bookMinna2',
      emoji    : '📔',
      available: true,
    },
  ];

  // ── Nav state ────────────────────────────────────────────────
  // 'hub' | 'jlpt' | 'buku' | 'chapters'
  var currentView    = 'hub';
  var currentSeries  = null;   // SERIES entry when in chapters view

  // ── Panel IDs ────────────────────────────────────────────────
  var PANELS = ['materiHubPanel','jlptDoorPanel','bukuDoorPanel','bukuChaptersPanel'];
  var BROWSE_ELEMENTS = ['browseSubtabs','filterBar','main','vocabBrowsePanel','progressPanel',
                         'progressDueBanner','sortFilterRow','levelSortPanel','catPanel'];

  // ── Show/hide helpers ────────────────────────────────────────
  function showPanel(id) {
    PANELS.forEach(function(p) {
      var el = document.getElementById(p);
      if (el) el.style.display = (p === id) ? 'block' : 'none';
    });
    // Show/hide the regular browse UI
    var inBrowse = (id === null);
    BROWSE_ELEMENTS.forEach(function(eid) {
      var el = document.getElementById(eid);
      if (!el) return;
      if (inBrowse) {
        el.style.display = '';
      } else {
        // Only hide elements that are normally visible (not already hidden by their own logic)
        if (eid === 'filterBar' || eid === 'browseSubtabs') {
          el.style.display = 'none';
        } else {
          el.style.display = 'none';
        }
      }
    });
  }

  function hideBrowseChrome() {
    ['filterBar','browseSubtabs','weekStrip','sortFilterRow','levelSortPanel','catPanel',
     'main','vocabBrowsePanel','progressPanel','progressDueBanner'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
    // Also hide the stats count + back bar
    var stats = document.querySelector('.stats');
    if (stats) stats.style.display = 'none';
    var backBar = document.getElementById('hubChapterBackBar');
    if (backBar) backBar.style.display = 'none';
  }

  function showBrowseChrome() {
    ['filterBar','browseSubtabs'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) el.style.display = '';
    });
    // Restore N-level pills (may have been hidden by book chapter view)
    var filterBar = document.getElementById('filterBar');
    if (filterBar) {
      var levelPillsEl = filterBar.querySelector('.level-pills');
      if (levelPillsEl) levelPillsEl.style.display = '';
    }
    var weekStripEl = document.getElementById('weekStrip');
    if (weekStripEl) weekStripEl.style.display = '';
    // Remove book chapter pills if present
    var bookPills = document.getElementById('bookChapterPills');
    if (bookPills) bookPills.remove();

    var m = document.getElementById('main');
    if (m) m.style.display = '';
    var stats = document.querySelector('.stats');
    if (stats) stats.style.display = '';
    if (window.browseInit) window.browseInit();
  }

  // ── Progress helpers ─────────────────────────────────────────
  function getLensProgress(lensVar) {
    var lens = window[lensVar];
    if (!lens || !lens.entries) return { done: 0, total: 0 };
    var srs  = window.srsData || {};
    var ids  = lens.entries.map(function(e) { return e.global_grammar_id; }).filter(Boolean);
    var total = ids.length;
    var done  = ids.filter(function(id) {
      return srs[id] && srs[id].reps > 0;
    }).length;
    return { done: done, total: total };
  }

  function getLevelProgress(level) {
    var data = (window.grammarData || []).filter(function(d) { return d && d.level === level; });
    var srs  = window.srsData || {};
    var total = data.length;
    var done  = data.filter(function(d) { return srs[d.id] && srs[d.id].reps > 0; }).length;
    return { done: done, total: total };
  }

  function progressBar(done, total) {
    if (!total) return '';
    var pct = Math.round((done / total) * 100);
    return '<div class="hub-progress-wrap">'
      + '<div class="hub-progress-bar" style="width:' + pct + '%"></div>'
      + '</div>'
      + '<div class="hub-progress-label">' + done + ' / ' + total + ' dipelajari</div>';
  }

  // ── Hub landing (two doors) ──────────────────────────────────
  function renderHub() {
    var panel = document.getElementById('materiHubPanel');
    if (!panel) return;
    currentView = 'hub';

    var data = window.grammarData || [];
    var totalGrammar = data.length;
    var totalVocab = ['vocabN5','vocabN4','vocabN3','vocabN2','vocabN1'].reduce(function(sum, key) {
      return sum + ((window[key] || []).length);
    }, 0);

    // Level progress bars
    var levelRows = ['N5','N4','N3','N2','N1'].map(function(lvl) {
      var lv = lvl.toLowerCase();
      var prog = getLevelProgress(lv);
      var pct = prog.total ? Math.round(prog.done / prog.total * 100) : 0;
      return '<div class="hub2-level-row">'
        + '<span class="hub2-level-pill ' + lv + '">'
        + '<span class="hub2-level-dot"></span>' + lvl
        + '</span>'
        + '<div class="hub2-level-bar-wrap">'
        + '<div class="hub2-level-bar ' + lv + '" style="width:' + pct + '%"></div>'
        + '</div>'
        + '<span class="hub2-level-count">' + prog.done + '/' + prog.total + '</span>'
        + '</div>';
    }).join('');

    // Book chips for door card
    var bookChips = ['Irodori', 'Sou Matome', 'Minna no Nihongo'].map(function(b) {
      return '<span class="hub2-book-chip">' + b + '</span>';
    }).join('');

    // Level pills for JLPT door
    var levelPills = ['N5','N4','N3','N2','N1'].map(function(lvl) {
      var lv = lvl.toLowerCase();
      return '<span class="hub2-door-pill ' + lv + '">'
        + '<span class="hub2-door-pill-dot"></span>' + lvl
        + '</span>';
    }).join('');

    panel.innerHTML =
      '<div class="hub2-wrap">'

      // Clean hero — no card box, just text (ss7)
      + '<div class="hub2-hero-plain">'
      + '<div class="hub2-hero-label">SELAMAT DATANG KEMBALI</div>'
      + '<h2 class="hub2-hero-heading">Mau lewat mana hari ini?</h2>'
      + '<p class="hub2-hero-body">Pilih jalur yang paling cocok buat mood belajar kamu sekarang.</p>'
      + '</div>'

      // Jalur JLPT — full-width door
      + '<button class="hub2-door hub2-door--full" onclick="window.showJlptDoor()">'
      + '<div class="hub2-door-glyph">日</div>'
      + '<div class="hub2-door-eyebrow">5 LEVEL</div>'
      + '<div class="hub2-door-title">Jalur JLPT</div>'
      + '<div class="hub2-door-desc">Belajar urut level ujian — N5 sampai N1</div>'
      + '<div class="hub2-door-pills">' + levelPills + '</div>'
      + '</button>'

      // Jalur Buku — full-width door
      + '<button class="hub2-door hub2-door--full" onclick="window.showBukuDoor()">'
      + '<div class="hub2-door-glyph">本</div>'
      + '<div class="hub2-door-eyebrow">3 SERI</div>'
      + '<div class="hub2-door-title">Jalur Buku</div>'
      + '<div class="hub2-door-desc">Ikuti kurikulum buku favoritmu!</div>'
      + '<div class="hub2-door-books">' + bookChips + '</div>'
      + '</button>'

      // "Lihat semua kartu" — compact dashed row
      + '<button class="hub2-see-all-row" onclick="window.showFlatBrowse()">'
      + '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 10 6-10 6L2 8l10-6z"/><path d="m2 14 10 6 10-6"/></svg>'
      + '<div style="flex:1"><div class="hub2-see-all-title">Lihat semua kartu</div>'
      + '<div class="hub2-see-all-sub">' + totalGrammar + ' grammar · ' + totalVocab + ' kosakata</div></div>'
      + '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>'
      + '</button>'

      // Continue card — context-aware navigation
      + buildContinueCard()

      // Level progress rail
      + '<div class="hub2-section-label">Progres level</div>'
      + '<div class="hub2-levels">' + levelRows + '</div>'

      + '</div>';  // .hub2-wrap

    PANELS.forEach(function(p) {
      var el = document.getElementById(p);
      if (el) el.style.display = (p === 'materiHubPanel') ? 'block' : 'none';
    });
    hideBrowseChrome();
  }

  // ── JLPT door ────────────────────────────────────────────────
  window.showJlptDoor = function () {
    var panel = document.getElementById('jlptDoorPanel');
    if (!panel) return;
    currentView = 'jlpt';

    var levels = [
      { id:'n5', label:'N5', name:'Dasar' },
      { id:'n4', label:'N4', name:'Dasar Menengah' },
      { id:'n3', label:'N3', name:'Menengah' },
      { id:'n2', label:'N2', name:'Mahir' },
      { id:'n1', label:'N1', name:'Mahir Tinggi' },
    ];

    panel.innerHTML =
      '<div class="hub-wrap">'
      + '<div class="hub-back-row">'
      + '<button class="hub-back-btn" onclick="window.showMateriHub()">← Kembali</button>'
      + '<div class="hub-panel-title">🎯 Jalur JLPT</div>'
      + '</div>'
      + '<div class="hub-jlpt-grid">'
      + levels.map(function(lv) {
          var prog = getLevelProgress(lv.id);
          var data = window.grammarData || [];
          var count = data.filter(function(d) { return d && d.level === lv.id; }).length;
          return '<button class="hub-level-card ' + lv.id + '" onclick="window.browseByLevel(\'' + lv.id + '\')">'
            + '<div class="hub-level-label">' + lv.label + '</div>'
            + '<div class="hub-level-name">' + lv.name + '</div>'
            + '<div class="hub-level-count">' + count + ' pola</div>'
            + progressBar(prog.done, prog.total)
            + '</button>';
        }).join('')
      + '</div>'
      + '</div>';

    PANELS.forEach(function(p) {
      var el = document.getElementById(p);
      if (el) el.style.display = (p === 'jlptDoorPanel') ? 'block' : 'none';
    });
    hideBrowseChrome();
  };

  // ── Buku door ────────────────────────────────────────────────
  window.showBukuDoor = function () {
    var panel = document.getElementById('bukuDoorPanel');
    if (!panel) return;
    currentView = 'buku';

    // Series group definitions with accordion config
    var ACCORDION_GROUPS = [
      {
        id: 'soumatome',
        glyph: '総', glyphStyle: 'font-family:var(--font-jp-display)',
        name: 'Sou Matome', badge: '5 VOLUME',
        sub: 'Struktur JLPT, seri merah ikonik',
        volumes: [
          { id: 'soumatome-n5', label: 'N5', levelKey: 'n5', available: false },
          { id: 'soumatome-n4', label: 'N4', levelKey: 'n4', available: true },
          { id: 'soumatome-n3', label: 'N3', levelKey: 'n3', available: true },
          { id: 'soumatome-n2', label: 'N2', levelKey: 'n2', available: false },
          { id: 'soumatome-n1', label: 'N1', levelKey: 'n1', available: false },
        ]
      },
      {
        id: 'irodori',
        glyph: '彩', glyphStyle: 'font-family:var(--font-jp-display)',
        name: 'Irodori', badge: '3 VOLUME',
        sub: 'Bahasa Jepang untuk hidup sehari-hari',
        volumes: [
          { id: 'irodori-a1',   label: 'Starter A1', levelKey: 'n5', available: true },
          { id: 'irodori-a2-1', label: 'A2-1',       levelKey: 'n5', available: true },
          { id: 'irodori-a2-2', label: 'A2-2',       levelKey: 'n4', available: true },
        ]
      },
      {
        id: 'minna',
        glyph: '皆', glyphStyle: 'font-family:var(--font-jp-display)',
        name: 'Minna no Nihongo', badge: '2 VOLUME',
        sub: 'Kurikulum klasik, populer di Indonesia',
        volumes: [
          { id: 'minna-1', label: 'Volume I',  levelKey: 'n5', available: true },
          { id: 'minna-2', label: 'Volume II', levelKey: 'n4', available: true },
        ]
      }
    ];

    // Track open accordion (one at a time)
    var openGroup = null;

    function getTotalProg(volumes) {
      var total = 0, done = 0;
      volumes.forEach(function(v) {
        var s = SERIES.find(function(s) { return s.id === v.id; });
        if (s && s.lensVar) {
          var p = getLensProgress(s.lensVar);
          total += p.total; done += p.done;
        }
      });
      return { total: total, done: done };
    }

    function renderAccordion() {
      panel.innerHTML =
        '<div class="buku-accordion-wrap">'
        + '<div class="buku-back-row">'
        + '<button class="buku-back-btn" onclick="window.showMateriHub()">← Materi</button>'
        + '<span class="buku-back-label">Jalur Buku</span>'
        + '</div>'
        + '<div class="buku-eyebrow">3 SERI · 10 VOLUME</div>'
        + '<h2 class="buku-title">Pilih seri bukumu</h2>'
        + '<p class="buku-sub">Setiap seri punya volume bertahap. Tap untuk lihat isinya.</p>'
        + ACCORDION_GROUPS.map(function(g) {
            var prog = getTotalProg(g.volumes);
            var isOpen = openGroup === g.id;
            return '<div class="buku-series-accordion' + (isOpen ? ' open' : '') + '" id="buku-acc-' + g.id + '">'
              + '<button class="buku-series-hdr" data-gid="' + g.id + '" onclick="window.toggleBukuAcc(this.dataset.gid)">'
              + '<div class="buku-series-icon"><span style="' + g.glyphStyle + ';font-size:22px;color:var(--accent)">' + g.glyph + '</span></div>'
              + '<div class="buku-series-info">'
              + '<div class="buku-series-name-row"><span class="buku-series-name">' + g.name + '</span><span class="buku-series-badge">' + g.badge + '</span></div>'
              + '<div class="buku-series-sub">' + g.sub + '</div>'
              + '<div class="buku-series-prog-wrap"><div class="buku-series-prog-bar" style="width:' + (prog.total ? Math.round(prog.done/prog.total*100) : 0) + '%"></div></div>'
              + '<div class="buku-series-count">' + prog.done + '/' + prog.total + '</div>'
              + '</div>'
              + '<svg class="buku-series-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>'
              + '</button>'
              + (isOpen ? '<div class="buku-volumes-list">'
                  + g.volumes.map(function(v) {
                      if (!v.available) {
                        return '<div class="buku-volume-row buku-volume-row--soon">'
                          + '<span class="buku-vol-dot ' + v.levelKey + '"></span>'
                          + '<span class="buku-vol-label">' + v.label + '</span>'
                          + '<span class="buku-vol-soon">SEGERA</span>'
                          + '<span>—</span>'
                          + '</div>';
                      }
                      var s = SERIES.find(function(s) { return s.id === v.id; });
                      var p = s ? getLensProgress(s.lensVar) : { done: 0, total: 0 };
                      var pct = p.total ? Math.round(p.done/p.total*100) : 0;
                      return '<button class="buku-volume-row" data-vid="' + v.id + '" onclick="window.showBukuChapters(this.dataset.vid)">'
                        + '<span class="buku-vol-dot ' + v.levelKey + '"></span>'
                        + '<div class="buku-vol-body">'
                        + '<span class="buku-vol-label">' + v.label + '</span>'
                        + '<div class="buku-vol-bar-wrap"><div class="buku-vol-bar ' + v.levelKey + '" style="width:' + pct + '%"></div></div>'
                        + '</div>'
                        + '<span class="buku-vol-count">' + p.done + '/' + p.total + '</span>'
                        + '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>'
                        + '</button>';
                    }).join('')
                  + '</div>' : '')
              + '</div>';
          }).join('')
        + '</div>';

      PANELS.forEach(function(p) {
        var el = document.getElementById(p);
        if (el) el.style.display = (p === 'bukuDoorPanel') ? 'block' : 'none';
      });
      hideBrowseChrome();
    }

    window.toggleBukuAcc = function(groupId) {
      openGroup = (openGroup === groupId) ? null : groupId;
      renderAccordion();
    };

    renderAccordion();
  };

  // ── Book chapter/lesson grid ─────────────────────────────────
  window.showBukuChapters = function (seriesId) {
    var panel = document.getElementById('bukuChaptersPanel');
    if (!panel) return;
    currentView   = 'chapters';
    currentSeries = SERIES.find(function(s) { return s.id === seriesId; });
    if (!currentSeries) return;

    var lens = window[currentSeries.lensVar];
    if (!lens || !lens.entries) {
      panel.innerHTML = '<div class="hub-wrap"><p>Data belum tersedia.</p></div>';
      return;
    }

    var srs = window.srsData || {};
    var html = '<div class="hub-wrap">'
      + '<div class="hub-back-row">'
      + '<button class="hub-back-btn" onclick="window.showBukuDoor()">← Buku</button>'
      + '<div class="hub-panel-title">' + currentSeries.emoji + ' ' + currentSeries.title + '</div>'
      + '</div>';

    if (currentSeries.structure === 'week') {
      // Soumatome: group by week × day
      var meta = lens.meta;
      var weeks = [];
      lens.entries.forEach(function(e) {
        if (!weeks[e.week]) weeks[e.week] = {};
        if (!weeks[e.week][e.day]) weeks[e.week][e.day] = [];
        weeks[e.week][e.day].push(e);
      });
      html += '<div class="chapter-grid">';
      for (var w = 1; w <= (meta.total_weeks || 6); w++) {
        for (var d = 1; d <= (meta.days_per_week || 7); d++) {
          var entries = (weeks[w] && weeks[w][d]) || [];
          if (!entries.length) continue;
          var done = entries.filter(function(e) {
            return e.global_grammar_id && srs[e.global_grammar_id] && srs[e.global_grammar_id].reps > 0;
          }).length;
          var pct = entries.length ? Math.round((done / entries.length) * 100) : 0;
          var label = 'W' + w + 'D' + d;
          html += '<button class="chapter-card ' + (pct === 100 ? 'chapter-card--done' : '') + '"'
            + ' onclick="window.browseByLensChapter(\'' + seriesId + '\',' + w + ',' + d + ',null)">'
            + '<div class="chapter-label">' + label + '</div>'
            + '<div class="chapter-count">' + entries.length + ' pola</div>'
            + '<div class="chapter-pip-wrap">'
            + '<div class="chapter-pip" style="width:' + pct + '%"></div>'
            + '</div>'
            + '</button>';
        }
      }
      html += '</div>';
    } else {
      // Irodori: group by lesson
      var byLesson = {};
      lens.entries.forEach(function(e) {
        var l = e.lesson;
        if (!byLesson[l]) byLesson[l] = [];
        byLesson[l].push(e);
      });
      var lessons = Object.keys(byLesson).map(Number).sort(function(a,b){return a-b;});
      html += '<div class="chapter-grid">';
      lessons.forEach(function(ln) {
        var entries = byLesson[ln];
        var done = entries.filter(function(e) {
          return e.global_grammar_id && srs[e.global_grammar_id] && srs[e.global_grammar_id].reps > 0;
        }).length;
        var pct = entries.length ? Math.round((done / entries.length) * 100) : 0;
        html += '<button class="chapter-card ' + (pct === 100 ? 'chapter-card--done' : '') + '"'
          + ' onclick="window.browseByLensChapter(\'' + seriesId + '\',null,null,' + ln + ')">'
          + '<div class="chapter-label">L' + ln + '</div>'
          + '<div class="chapter-count">' + entries.length + ' pola</div>'
          + '<div class="chapter-pip-wrap">'
          + '<div class="chapter-pip" style="width:' + pct + '%"></div>'
          + '</div>'
          + '</button>';
      });
      html += '</div>';
    }
    html += '</div>';
    panel.innerHTML = html;

    PANELS.forEach(function(p) {
      var el = document.getElementById(p);
      if (el) el.style.display = (p === 'bukuChaptersPanel') ? 'block' : 'none';
    });
    hideBrowseChrome();
  };

  // ── Navigate to flat browse (semua kartu) ────────────────────
  window.showFlatBrowse = function () {
    PANELS.forEach(function(p) {
      var el = document.getElementById(p);
      if (el) el.style.display = 'none';
    });
    showBrowseChrome();
    // Reset to "all" level
    var pillAll = document.getElementById('pill-all');
    if (window.pillLevel && pillAll) window.pillLevel('all', pillAll);
    // Add back bar → Hub
    var backBar = document.getElementById('hubChapterBackBar');
    if (!backBar) {
      backBar = document.createElement('div');
      backBar.id = 'hubChapterBackBar';
      backBar.className = 'hub-chapter-back-bar';
      var wrap = document.getElementById('main');
      if (wrap && wrap.parentNode) wrap.parentNode.insertBefore(backBar, wrap);
    }
    backBar.innerHTML = '<button class="hub-back-btn" onclick="window.showMateriHub()">← Pilih Jalur</button>'
      + '<span class="hub-chapter-back-label">Semua Grammar</span>';
    backBar.style.display = 'flex';
    window._hubPrevView = null;
  };

  // ── Browse filtered to a JLPT level ─────────────────────────
  window.browseByLevel = function (level) {
    PANELS.forEach(function(p) {
      var el = document.getElementById(p);
      if (el) el.style.display = 'none';
    });
    showBrowseChrome();
    var pill = document.getElementById('pill-' + level);
    if (window.pillLevel && pill) {
      window.pillLevel(level, pill);
    }
    // Add back bar → Jalur JLPT
    var backBar = document.getElementById('hubChapterBackBar');
    if (!backBar) {
      backBar = document.createElement('div');
      backBar.id = 'hubChapterBackBar';
      backBar.className = 'hub-chapter-back-bar';
      var wrap = document.getElementById('main');
      if (wrap && wrap.parentNode) wrap.parentNode.insertBefore(backBar, wrap);
    }
    var levelNames = { n5:'N5 · Dasar', n4:'N4 · Dasar Menengah', n3:'N3 · Menengah', n2:'N2 · Mahir', n1:'N1 · Mahir Tinggi' };
    backBar.innerHTML = '<button class="hub-back-btn" onclick="window.showJlptDoor()">← Jalur JLPT</button>'
      + '<span class="hub-chapter-back-label">' + (levelNames[level] || level.toUpperCase()) + '</span>';
    backBar.style.display = 'flex';
    // Store where we came from so back works
    window._hubPrevView = 'jlpt';
    // Save last activity context
    try { localStorage.setItem('nn_last_activity', JSON.stringify({ type: 'jlpt', level: level })); } catch(e) {}
  };

  // ── Browse filtered to a specific book chapter/lesson ────────
  window.browseByLensChapter = function (seriesId, week, day, lesson) {
    var series = SERIES.find(function(s) { return s.id === seriesId; });
    if (!series || !series.lensVar) return;
    var lens = window[series.lensVar];
    if (!lens || !lens.entries) return;

    // Extract grammar IDs for this chapter
    var ids = lens.entries.filter(function(e) {
      if (week !== null && e.week !== week)  return false;
      if (day  !== null && e.day  !== day)   return false;
      if (lesson !== null && e.lesson !== lesson) return false;
      return true;
    }).map(function(e) { return e.global_grammar_id; }).filter(Boolean);

    if (!ids.length) return;

    PANELS.forEach(function(p) {
      var el = document.getElementById(p);
      if (el) el.style.display = 'none';
    });
    showBrowseChrome();

    // Filter grammar data to only these IDs
    var originalData = window.grammarData || [];
    var filtered = originalData.filter(function(d) { return d && ids.indexOf(d.id) !== -1; });

    // Temporarily swap grammarData, render, restore
    window.grammarData = filtered;
    if (window.render) window.render();
    window.grammarData = originalData;

    // Add a "back to chapters" bar
    var backBar = document.getElementById('hubChapterBackBar');
    if (!backBar) {
      backBar = document.createElement('div');
      backBar.id = 'hubChapterBackBar';
      backBar.className = 'hub-chapter-back-bar';
      var wrap = document.getElementById('main');
      if (wrap && wrap.parentNode) wrap.parentNode.insertBefore(backBar, wrap);
    }
    var chLabelShort = week !== null ? ('W' + week + 'D' + day) : ('L' + lesson);
    backBar.innerHTML = '<button class="hub-back-btn" onclick="window.showBukuChapters(\'' + seriesId + '\')">'
      + '← ' + series.emoji + ' ' + series.title + ' / ' + chLabelShort
      + '</button>';
    backBar.style.display = 'flex';

    // ── Chapter pills strip (replace N-level pills with week/lesson pills) ──
    var filterBar = document.getElementById('filterBar');
    if (filterBar) {
      // Hide N-level pills row, inject chapter pills
      var levelPillsEl = filterBar.querySelector('.level-pills');
      var weekStripEl  = document.getElementById('weekStrip');
      if (levelPillsEl) levelPillsEl.style.display = 'none';
      if (weekStripEl)  weekStripEl.style.display  = 'none';

      // Build chapter pill strip for this series
      var existingStrip = document.getElementById('bookChapterPills');
      if (existingStrip) existingStrip.remove();

      var strip = document.createElement('div');
      strip.id = 'bookChapterPills';
      strip.className = 'book-chapter-pills';

      // Get all unique chapters from this lens
      var chapters = [];
      var seen = {};
      lens.entries.forEach(function(e) {
        var key, label, wk, dy, ls;
        if (series.structure === 'week') {
          key   = 'w' + e.week + 'd' + (e.day || 0);
          label = 'M' + e.week + (e.day ? '·H' + e.day : '');
          wk = e.week; dy = e.day || null; ls = null;
        } else {
          key   = 'l' + e.lesson;
          label = 'L' + e.lesson;
          wk = null; dy = null; ls = e.lesson;
        }
        if (key && !seen[key]) {
          seen[key] = true;
          chapters.push({ key: key, label: label, week: wk, day: dy, lesson: ls });
        }
      });

      // Current active chapter key
      var activeKey = week !== null
        ? ('w' + week + 'd' + (day || 0))
        : ('l' + lesson);

      chapters.forEach(function(ch) {
        var btn = document.createElement('button');
        btn.className = 'book-chapter-pill' + (ch.key === activeKey ? ' active' : '');
        btn.textContent = ch.label;
        btn.onclick = function() {
          window.browseByLensChapter(seriesId, ch.week, ch.day, ch.lesson);
        };
        strip.appendChild(btn);
      });

      // Insert before main content
      var mainEl = document.getElementById('main');
      if (mainEl && mainEl.parentNode) {
        mainEl.parentNode.insertBefore(strip, mainEl);
      }
    }
    // Save last activity context
    var chLabel = week !== null
      ? (series.structure === 'week' ? 'Minggu ' + week + (day ? ' · Hari ' + day : '') : 'Pelajaran ' + week)
      : ('Pelajaran ' + lesson);
    try { localStorage.setItem('nn_last_activity', JSON.stringify({
      type: 'book', seriesId: seriesId, seriesTitle: series.title, seriesEmoji: series.emoji,
      week: week, day: day, lesson: lesson, chLabel: chLabel
    })); } catch(e) {}
  };

  // ── Cross-lens breadcrumbs (§14.7) ──────────────────────────
  window.getLensBreadcrumbs = function (cardId) {
    var results = [];

    SERIES.forEach(function(s) {
      if (!s.available || !s.lensVar) return;
      var lens = window[s.lensVar];
      if (!lens || !lens.entries) return;
      var entry = lens.entries.find(function(e) { return e.global_grammar_id === cardId; });
      if (!entry) return;

      var loc = '';
      if (s.structure === 'week' && entry.week) {
        loc = 'Minggu ' + entry.week + ' · Hari ' + (entry.day || '?');
      } else if (s.structure === 'lesson' && entry.lesson) {
        loc = 'Pelajaran ' + entry.lesson;
      }
      results.push({ emoji: s.emoji, title: s.title, loc: loc, level: s.level });
    });

    // Also note JLPT level from the card itself
    var grammarEntry = (window.grammarData || []).find(function(d) { return d && d.id === cardId; });
    if (grammarEntry && grammarEntry.level) {
      results.unshift({
        emoji : '🎯',
        title : 'JLPT ' + grammarEntry.level.toUpperCase(),
        loc   : grammarEntry.cat || '',
        level : grammarEntry.level,
        isJlpt: true,
      });
    }

    return results;
  };

  // ── Patch detail.js to inject lens breadcrumbs ──────────────
  // Called after detail.js has set window.openDetail
  function patchDetailWithBreadcrumbs() {
    var _origOpenDetail = window.openDetail;
    if (!_origOpenDetail) return;

    window.openDetail = function (cardId) {
      _origOpenDetail(cardId);

      // Inject breadcrumbs into the open modal
      var modal = document.getElementById('detailModal');
      if (!modal || !modal.classList.contains('show')) return;

      var crumbs = window.getLensBreadcrumbs(cardId);
      if (!crumbs || crumbs.length <= 1) return;   // skip if only JLPT (no book context)

      // Don't double-inject
      if (modal.querySelector('.detail-lens-breadcrumbs')) return;

      var html = '<div class="detail-lens-breadcrumbs">'
        + '<div class="detail-lens-label">Ditampilkan di:</div>'
        + crumbs.map(function(c) {
            return '<div class="detail-lens-item ' + (c.level || '') + '">'
              + '<span class="detail-lens-emoji">' + c.emoji + '</span>'
              + '<span class="detail-lens-title">' + c.title + '</span>'
              + (c.loc ? '<span class="detail-lens-loc"> · ' + c.loc + '</span>' : '')
              + '</div>';
          }).join('')
        + '</div>';

      var body = modal.querySelector('.detail-body');
      if (body) body.insertAdjacentHTML('beforeend', html);
    };
  }

  // ── Continue card — last reviewed grammar entry ───────────────
  function buildContinueCard() {
    // Read last-activity context
    var ctx = null;
    try { ctx = JSON.parse(localStorage.getItem('nn_last_activity') || 'null'); } catch(e) {}

    var grammar = window.grammarData || [];
    var srs     = window.srsData    || {};
    var best = null, bestTime = 0;
    Object.keys(srs).forEach(function(id) {
      var c = srs[id];
      if (!c || !c.last_review) return;
      var t = new Date(c.last_review).getTime();
      if (t > bestTime) { bestTime = t; best = id; }
    });

    if (!ctx && !best) return '';

    var entry = best ? grammar.find(function(g) { return g && g.id === best; }) : null;
    var lv = (entry && entry.level) || 'n4';

    // Context label + onclick
    var contextLabel = '';
    var navFn = '';
    if (ctx && ctx.type === 'book') {
      var em = ctx.seriesEmoji || '';
      contextLabel = em + ' ' + ctx.seriesTitle + (ctx.chLabel ? ' · ' + ctx.chLabel : '');
      navFn = "window.showBukuChapters('" + ctx.seriesId + "')";
    } else if (ctx && ctx.type === 'jlpt') {
      contextLabel = 'Jalur JLPT · ' + ctx.level.toUpperCase();
      navFn = "window.browseByLevel('" + ctx.level + "')";
    } else if (best) {
      contextLabel = lv.toUpperCase() + (entry && entry.cat ? ' · ' + entry.cat : '');
      navFn = "window.openDetail('" + best + "')";
    }

    var interval = srs[best] ? (srs[best].interval || 0) : 0;
    var pct = Math.min(interval / 180, 1);
    var pat = entry ? entry.grammar : '—';
    var mea = entry ? entry.meaning : '';

    return '<div class="hub2-continue-label"><span>Lanjutkan</span></div>'
      + '<button class="hub2-continue-card ' + lv + '" onclick="' + navFn + '">'
      + '<div class="hub2-cc-icon ' + lv + '">語</div>'
      + '<div class="hub2-cc-body">'
      + '<div class="hub2-cc-source">' + contextLabel.toUpperCase() + '</div>'
      + '<div class="hub2-cc-pattern">' + pat + '</div>'
      + '<div class="hub2-cc-meaning">' + mea + '</div>'
      + '<div class="hub2-cc-bar-wrap">'
      + '<div class="hub2-cc-bar ' + lv + '" style="width:' + Math.round(pct * 100) + '%"></div>'
      + '</div></div>'
      + '<svg class="hub2-cc-fwd" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>'
      + '</button>';
  }

  // ── Public API ───────────────────────────────────────────────
  window.showMateriHub = function () { renderHub(); };

  // ── Hub back-button logic when in flat browse ────────────────
  window.hubBackFromBrowse = function () {
    var prev = window._hubPrevView;
    var backBar = document.getElementById('hubChapterBackBar');
    if (backBar) backBar.style.display = 'none';
    if (prev === 'jlpt')     window.showJlptDoor();
    else if (prev === 'chapters' && window._hubPrevSeries) window.showBukuChapters(window._hubPrevSeries);
    else                     renderHub();
    window._hubPrevView = null;
  };

  // ── Init ─────────────────────────────────────────────────────
  window.hubInit = function () {
    patchDetailWithBreadcrumbs();
    renderHub();     // hub is the default landing for the Browse tab
  };

})();
