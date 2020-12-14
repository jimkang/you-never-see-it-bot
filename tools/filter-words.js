/* global process */

var split = require('split');

var startsWithAlpha = /^\w/;
var hasNonAlpha = /[^\w]|\d/;

var lineStream = split();
lineStream.on('data', echoIfGood);
process.stdin.pipe(lineStream);

function echoIfGood(s) {
  if (!startsWithAlpha.test(s)) {
    return;
  }

  const word = s.split(' ')[0];
  if (hasNonAlpha.test(word)) {
    return;
  }

  const normalized = word.toLowerCase();
  process.stdout.write(normalized + '\n');
}
