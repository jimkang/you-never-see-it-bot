/* global process, __dirname */

var getWordEntry = require('./get-word-entry');
var fs = require('fs');
var Probable = require('probable').createProbable;
var seedrandom = require('seedrandom');
var oknok = require('oknok');
var makeObservation = require('./make-observation');
var minimist = require('minimist');
var postIt = require('@jimkang/post-it');
var config = require('./config');
const iconURL =
  'https://smidgeo.com/bots/you-never-see-it-bot/media/you-never-see-it-128.png';

var { dry, seed } = minimist(process.argv.slice(2));

if (!seed) {
  seed = new Date().toISOString();
}
console.log('seed:', seed);

var probable = Probable({ random: seedrandom(seed) });

const usableWordsCount = +fs.readFileSync(
  __dirname + '/data/usable-words-count.txt',
  { encoding: 'utf8' }
);

getWordEntry(
  probable.roll(usableWordsCount),
  oknok({ ok: useWord, nok: wrapUp })
);

function useWord(wordEntry) {
  var text = makeObservation({ probable, wordEntry });
  if (dry) {
    console.log('Would have posted:', text);
    return;
  }

  const id = `observation-${seed.replace(/ /g, '-')}`;

  postIt(
    {
      id,
      text: `<img src="${iconURL}" alt="Picture of bot" />${text}`,
      altText: text,
      targets: [
        {
          type: 'noteTaker',
          config: config.noteTaker
        }
      ]
    },
    wrapUp
  );
}

function wrapUp(error) {
  if (error) {
    console.log(error, error.stack);
  }
}
