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

    // Grammar counts per level
    var data = window.grammarData || [];
    var counts = {};
    ['n5','n4','n3','n2','n1'].forEach(function(lv) {
      counts[lv] = data.filter(function(d) { return d && d.level === lv; }).length;
    });
    var totalGrammar = data.length;

    panel.innerHTML =
      '<div class="hub-wrap">'
      + '<div class="hub-intro">'
      + '<div class="hub-title">Mau belajar dari mana?</div>'
      + '<div class="hub-subtitle">Dua jalur masuk ke ' + totalGrammar + ' pola grammar yang sama.</div>'
      + '</div>'
      + '<div class="hub-doors">'

      // JLPT door
      + '<button class="hub-door hub-door--jlpt" onclick="window.showJlptDoor()">'
      + '<div class="hub-door-emoji">🎯</div>'
      + '<div class="hub-door-title">Jalur JLPT</div>'
      + '<div class="hub-door-desc">Belajar berdasarkan level ujian. N5 sampai N1.</div>'
      + '<div class="hub-door-pills">'
      + ['n5','n4','n3','n2','n1'].map(function(lv) {
          return '<span class="hub-level-pip ' + lv + '">' + lv.toUpperCase() + '</span>';
        }).join('')
      + '</div>'
      + '</button>'

      // Buku door
      + '<button class="hub-door hub-door--buku" onclick="window.showBukuDoor()">'
      + '<div class="hub-door-emoji">📚</div>'
      + '<div class="hub-door-title">Jalur Buku</div>'
      + '<div class="hub-door-desc">Ikutin urutan textbook populer.</div>'
      + '<div class="hub-door-books">'
      + SERIES.filter(function(s) { return s.available; }).map(function(s) {
          return '<span class="hub-book-chip">' + s.emoji + ' ' + s.title + '</span>';
        }).join('')
      + '</div>'
      + '</button>'

      + '</div>'  // .hub-doors

      // Flat browse shortcut
      + '<button class="hub-see-all" onclick="window.showFlatBrowse()">'
      + '✦ Lihat semua kartu (lintas jalur)'
      + '</button>'

      + '</div>';  // .hub-wrap

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

    panel.innerHTML =
      '<div class="hub-wrap">'
      + '<div class="hub-back-row">'
      + '<button class="hub-back-btn" onclick="window.showMateriHub()">← Kembali</button>'
      + '<div class="hub-panel-title">📚 Jalur Buku</div>'
      + '</div>'
      + '<div class="buku-series-grid">'
      + SERIES.map(function(s) {
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
        }).join('')
      + '</div>'
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
    backBar.style.display = '';

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
