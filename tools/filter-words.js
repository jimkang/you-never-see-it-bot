/* global process */

var split = require('split');

var iscool = require('iscool')();

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
  if (iscool(normalized)) {
    process.stdout.write(normalized + '\n');
  } else {
    console.error('Found uncool word:', normalized);
  }
}
