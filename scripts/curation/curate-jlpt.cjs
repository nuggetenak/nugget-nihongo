/**
 * JLPT Golden Sets Aggregator (N5, N4, N3, N2, N1)
 */

const { getJLPTN5Set } = require('./jlpt-n5.cjs');
const { getJLPTN4Set } = require('./jlpt-n4.cjs');
const { getJLPTN3Set } = require('./jlpt-n3.cjs');
const { getJLPTN2Set } = require('./jlpt-n2.cjs');
const { getJLPTN1Set } = require('./jlpt-n1.cjs');

function getAllJLPTSets() {
  return [
    getJLPTN5Set(),
    getJLPTN4Set(),
    getJLPTN3Set(),
    getJLPTN2Set(),
    getJLPTN1Set()
  ];
}

module.exports = {
  getAllJLPTSets,
  getJLPTN5Set,
  getJLPTN4Set,
  getJLPTN3Set,
  getJLPTN2Set,
  getJLPTN1Set
};
