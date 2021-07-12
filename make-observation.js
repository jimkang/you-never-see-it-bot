var vowels = ['a', 'e', 'i', 'o', 'u'];
var preEConsonants = ['z', 't', 'v', 's', 'c', 'k', 'r'];

var formattersForSuffixes = {
  ing: [(w, r) => `They call it "${w}", but you never see anyone ${r}!`],
  er: [(w, r) => `They call it a "${w}", but I've never seen one ${r}.`],
  ers: [(w, r) => `They call 'em "${w}", but I've never see 'em ${r}.`],
  ist: [
    (w, r) => `Did you see that ${w}? It really knows how to play a ${r}!`,
    (w, r) => `Ever talk to a ${w}? They're always thinking in terms of ${r}!`,
  ],
};

function makeObservation({ probable, wordEntry }) {
  var formatters = formattersForSuffixes[wordEntry.suffix];
  var formatter = probable.pick(formatters);
  return formatter(wordEntry.word, formatRoot(wordEntry.root));
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
