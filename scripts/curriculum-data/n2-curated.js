// ══════════════════════════════════════════════════════════════════
//  scripts/curriculum-data/n2-curated.js
//  Master Consolidated Exporter for All 40 Curated N2 Lessons
// ══════════════════════════════════════════════════════════════════

const u0105 = require('./n2/units-01-to-05.js');
const u0610 = require('./n2/units-06-to-10.js');
const u1115 = require('./n2/units-11-to-15.js');
const u1620 = require('./n2/units-16-to-20.js');

const allCuratedN2 = Object.assign({}, u0105, u0610, u1115, u1620);

console.log(`[n2-curated] Successfully aggregated ${Object.keys(allCuratedN2).length} curated lessons across Units 01–20.`);

module.exports = allCuratedN2;
