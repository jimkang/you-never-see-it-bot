/* global process */

var split = require('split');
var iscool = require('iscool')();

var startsWithAlpha = /^\w/g;
var hasNonAlpha = /[^\w]|\d/;

process.stdin.pipe(split()).on('data', echoIfGood);

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
  }
}
