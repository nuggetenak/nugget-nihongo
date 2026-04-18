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
      lensVar  : null,
      emoji    : '📓',
      available: false,
      comingSoon: true,
    },
    {
      id       : 'minna-2',
      title    : 'Minna no Nihongo 2',
      subtitle : 'スリーエーネットワーク',
      publisher: 'Three A Network',
      level    : 'n4',
      structure: 'lesson',
      lensVar  : null,
      emoji    : '📔',
      available: false,
      comingSoon: true,
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
  }

  function showBrowseChrome() {
    ['filterBar','browseSubtabs'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) el.style.display = '';
    });
    var m = document.getElementById('main');
    if (m) m.style.display = '';
    // Let browse.js and its own state manage the rest
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

      // Hero greeting card
      + '<div class="hub2-hero">'
      + '<div class="hub2-hero-glyph">学</div>'
      + '<div class="hub2-hero-label">Selamat datang kembali</div>'
      + '<div class="hub2-hero-title">Mau lewat mana hari ini?</div>'
      + '<div class="hub2-hero-sub">Pilih jalur yang paling cocok buat mood belajar kamu sekarang.</div>'
      + '</div>'

      // Two door cards
      + '<div class="hub2-doors">'

      + '<button class="hub2-door" onclick="window.showJlptDoor()">'
      + '<div class="hub2-door-glyph">日</div>'
      + '<div class="hub2-door-badge">5 LEVEL</div>'
      + '<div class="hub2-door-title">Jalur JLPT</div>'
      + '<div class="hub2-door-desc">Belajar urut level ujian — N5 sampai N1</div>'
      + '<div class="hub2-door-pills">' + levelPills + '</div>'
      + '</button>'

      + '<button class="hub2-door" onclick="window.showBukuDoor()">'
      + '<div class="hub2-door-glyph">本</div>'
      + '<div class="hub2-door-badge">3 SERI</div>'
      + '<div class="hub2-door-title">Jalur Buku</div>'
      + '<div class="hub2-door-desc">Ikuti kurikulum buku favoritmu!</div>'
      + '<div class="hub2-door-books">' + bookChips + '</div>'
      + '</button>'

      + '</div>'  // .hub2-doors

      // Flat browse shortcut
      + '<button class="hub2-see-all" onclick="window.showFlatBrowse()">'
      + '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 10 6-10 6L2 8l10-6z"/><path d="m2 14 10 6 10-6"/></svg>'
      + '<div class="hub2-see-all-text">'
      + '<div class="hub2-see-all-title">Lihat semua kartu</div>'
      + '<div class="hub2-see-all-sub">' + totalGrammar + ' grammar · ' + totalVocab + ' kosakata</div>'
      + '</div>'
      + '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>'
      + '</button>'

      // Continue card — last reviewed grammar entry
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

    var SERIES_GROUPS = [
      { label: '📘 Sou Matome', ids: ['soumatome-n4', 'soumatome-n3'] },
      { label: '🌸 Irodori',    ids: ['irodori-a1', 'irodori-a2-1', 'irodori-a2-2'] },
      { label: '📓 Minna no Nihongo', ids: ['minna-1', 'minna-2'] },
    ];

    function renderSeriesCard(s) {
      if (!s.available) {
        return '<div class="hub-series-card hub-series-card--soon">'
          + '<div class="hub-series-emoji">' + s.emoji + '</div>'
          + '<div class="hub-series-title">' + s.title + '</div>'
          + '<div class="hub-series-sub">' + s.subtitle + '</div>'
          + '<div class="hub-series-soon">Segera</div>'
          + '</div>';
      }
      var prog = getLensProgress(s.lensVar);
      return '<button class="hub-series-card ' + s.level + '" onclick="window.showBukuChapters(\'' + s.id + '\')">'
        + '<div class="hub-series-emoji">' + s.emoji + '</div>'
        + '<div class="hub-series-title">' + s.title + '</div>'
        + '<div class="hub-series-sub">' + s.subtitle + '</div>'
        + '<div class="hub-series-count">' + prog.total + ' pola grammar</div>'
        + progressBar(prog.done, prog.total)
        + '</button>';
    }

    panel.innerHTML =
      '<div class="hub-wrap">'
      + '<div class="hub-back-row">'
      + '<button class="hub-back-btn" onclick="window.showMateriHub()">← Kembali</button>'
      + '<div class="hub-panel-title">📚 Jalur Buku</div>'
      + '</div>'
      + SERIES_GROUPS.map(function(group) {
          var items = group.ids.map(function(id) {
            return SERIES.find(function(s) { return s.id === id; });
          }).filter(Boolean);
          return '<div class="buku-series-group">'
            + '<div class="buku-series-group-label">' + group.label + '</div>'
            + '<div class="buku-series-grid">'
            + items.map(renderSeriesCard).join('')
            + '</div></div>';
        }).join('')
      + '</div>';

        PANELS.forEach(function(p) {
      var el = document.getElementById(p);
      if (el) el.style.display = (p === 'bukuDoorPanel') ? 'block' : 'none';
    });
    hideBrowseChrome();
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
    var chLabel = week !== null ? ('W' + week + 'D' + day) : ('L' + lesson);
    backBar.innerHTML = '<button class="hub-back-btn" onclick="window.showBukuChapters(\'' + seriesId + '\')">'
      + '← ' + series.emoji + ' ' + series.title + ' / ' + chLabel
      + '</button>';
    backBar.style.display = 'flex';

    window._hubPrevView = 'chapters';
    window._hubPrevSeries = seriesId;
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
    var grammar = window.grammarData || [];
    var srs     = window.srsData    || {};

    // Find most recently reviewed card
    var best = null, bestTime = 0;
    Object.keys(srs).forEach(function(id) {
      var c = srs[id];
      if (!c || !c.last_review) return;
      var t = new Date(c.last_review).getTime();
      if (t > bestTime) { bestTime = t; best = id; }
    });
    if (!best) return '';

    var entry = grammar.find(function(g) { return g && g.id === best; });
    if (!entry) return '';

    var lv = entry.level || 'n5';
    var bookLabel = '';
    if (entry.book && entry.book !== '—') {
      bookLabel = entry.book + (entry.day ? ' · Hari ' + entry.day : '');
    } else {
      bookLabel = lv.toUpperCase() + ' · ' + (entry.cat || '');
    }

    var interval = srs[best] ? (srs[best].interval || 0) : 0;
    var pct = Math.min(interval / 180, 1);

    return '<div class="hub2-continue-label"><span>Lanjutkan</span></div>'
      + '<button class="hub2-continue-card ' + lv + '" onclick="window.openDetail(\'' + best + '\')">'
      + '<div class="hub2-cc-icon ' + lv + '">語</div>'
      + '<div class="hub2-cc-body">'
      + '<div class="hub2-cc-source">' + bookLabel.toUpperCase() + '</div>'
      + '<div class="hub2-cc-pattern">' + entry.grammar + '</div>'
      + '<div class="hub2-cc-meaning">' + entry.meaning + '</div>'
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
