/* global process, __dirname */

var getWordEntry = require('./get-word-entry');
var fs = require('fs');
var probable = require('probable');
var oknok = require('oknok');

var dryRun = false;
if (process.argv.length > 2) {
  dryRun = process.argv[2].toLowerCase() == '--dry';
}

const usableWordsCount = +fs.readFileSync(
  __dirname + '/data/usable-words-count.txt',
  { encoding: 'utf8' }
);

getWordEntry(
  probable.roll(usableWordsCount),
  oknok({ ok: useWord, nok: wrapUp })
);

function useWord({ word, root, suffix }) {
  var text = word;
  if (dryRun) {
    console.log('Would have posted:', text);
  } else {
    console.log(text);
  }
}

function wrapUp(error) {
  if (error) {
    console.log(error, error.stack);
  }
}
