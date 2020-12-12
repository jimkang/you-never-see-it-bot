var needsAnE = ['z', 't', 'v'];

var formattersForSuffixes = {
  ing: [
    (w, r) => `They call it "${w}", but you never see anyone ${formatRoot(r)}!`
  ]
};

function makeObservation({ probable, wordEntry }) {
  var formatters = formattersForSuffixes[wordEntry.suffix];
  var formatter = probable.pick(formatters);
  return formatter(wordEntry.word, wordEntry.root);
}

function formatRoot(root) {
  var formatted = root;

  if (root.length < 2) {
    return formatted;
  }

  if (root.charAt(root.length - 1) === root.charAt(root.length - 2)) {
    formatted = root.slice(0, -1);
  }

  if (needsAnE.includes(formatted.charAt(root.length - 1))) {
    formatted += 'e';
  }

  return formatted;
}

module.exports = makeObservation;
