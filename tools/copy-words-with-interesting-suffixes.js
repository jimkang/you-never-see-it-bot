/* global process */

var split = require('split');

//var goodSuffixes = ['ing', 'er', 'ers', 'ion', 'ist', 'able'];
var goodSuffixes = ['ing'];

var recentlyProcessed = LimitQueue({ limit: 200 });

process.stdin.pipe(split()).on('data', echoIfGood);

function echoIfGood(s) {
  var normalized = s.toLowerCase();
  var suffix;
  for (var i = 0; i < goodSuffixes.length; ++i) {
    const goodSuffix = goodSuffixes[i];
    if (normalized.endsWith(goodSuffix)) {
      suffix = goodSuffix;
      break;
    }
  }
  if (suffix) {
    const root = normalized.slice(0, -suffix.length);
    const truncRoot = root.slice(0, -1);

    if (
      !recentlyProcessed.contents().includes(root) &&
      !recentlyProcessed.contents().includes(root + 'e') &&
      !recentlyProcessed.contents().includes(truncRoot) &&
      !recentlyProcessed.contents().includes(truncRoot + 'e')
    ) {
      process.stdout.write(
        `{ "word": "${normalized}", "root": "${root}", "suffix": "${suffix}"}\n`
      );
    }
  }

  recentlyProcessed.add(normalized);
}

function LimitQueue({ limit }) {
  var array = [];

  return { contents, add };

  function contents() {
    return array;
  }

  function add(item) {
    array.unshift(item);
    if (array.length > limit) {
      array.pop();
    }
  }
}
