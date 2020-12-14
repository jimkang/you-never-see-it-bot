/* global process */

var split = require('split');

//var goodSuffixes = ['ing', 'er', 'ers', 'ion', 'ist', 'able'];
var goodSuffixes = ['ing', 'er', 'ers', 'ist'];

var recentlyProcessed = LimitQueue({ limit: 200 });

var lineStream = split();
lineStream.on('data', considerLine);
process.stdin.pipe(lineStream);

function considerLine(s) {
  var normalized = s.toLowerCase();
  echoIfGood(normalized);
  recentlyProcessed.add(normalized);
}

function echoIfGood(normalized) {
  var suffix;
  for (var i = 0; i < goodSuffixes.length; ++i) {
    const goodSuffix = goodSuffixes[i];
    if (normalized.endsWith(goodSuffix)) {
      suffix = goodSuffix;
      break;
    }
  }

  if (!suffix) {
    return;
  }

  const root = normalized.slice(0, -suffix.length);

  if (
    recentlyProcessed.contents().includes(root) ||
    recentlyProcessed.contents().includes(root + 'e')
  ) {
    return;
  }

  const lastTwoLettersInRootAreTheSame =
    root.charAt(root.length - 2) === root.charAt(root.length - 1);

  if (lastTwoLettersInRootAreTheSame) {
    const truncRoot = root.slice(0, -1);
    if (
      recentlyProcessed.contents().includes(truncRoot) ||
      recentlyProcessed.contents().includes(truncRoot + 'e')
    ) {
      return;
    }
  }

  process.stdout.write(
    `{ "word": "${normalized}", "root": "${root}", "suffix": "${suffix}"}\n`
  );
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
