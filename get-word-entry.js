/* global __dirname */

var lineChomper = require('line-chomper');
var jsonfile = require('jsonfile');

var lineOffsets = jsonfile.readFileSync(
  __dirname + '/data/wordslineoffsets.json'
);

function getWordEntry(index, done) {
  lineChomper.chomp(
    __dirname + '/data/usable-words.ndjson',
    {
      lineOffsets,
      fromLine: index,
      lineCount: 1
    },
    readDone
  );

  function readDone(error, lines) {
    if (error) {
      done(error);
    } else if (!lines || !Array.isArray(lines) || lines.length < 1) {
      done(new Error('Could not get valid line for offset ' + index));
    } else {
      done(error, JSON.parse(lines[0]));
    }
  }
}

module.exports = getWordEntry;
