var vowels = ['a', 'e', 'i', 'o', 'u'];
var preEConsonants = ['z', 't', 'v', 's', 'c', 'k', 'r'];

var formattersForSuffixes = {
  ing: [
    (w, r) => `They call it "${w}", but you never see anyone ${formatRoot(r)}!`,
    (w, r) =>
      `I keep hearing about "${w}", but I have no idea how it works. Someone, teach me how to ${formatRoot(
        r
      )}!`
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

  if (needsAnE(formatted)) {
    formatted += 'e';
  }

  if (root.charAt(root.length - 1) === root.charAt(root.length - 2)) {
    formatted = root.slice(0, -1);
  }

  return formatted;
}

function needsAnE(s) {
  if (preEConsonants.includes(s.charAt(s.length - 1))) {
    if (vowels.includes(s.charAt(s.length - 2))) {
      return true;
    }
  }
  return false;
}

module.exports = makeObservation;
