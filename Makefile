HOMEDIR = $(shell pwd)

run:
	node post-observation.js

template-offsets:
	cat data/usable-words.ndjson|wc -l > data/usable-words-count.txt
	node node_modules/.bin/get-file-line-offsets-in-json data/usable-words.ndjson > \
		data/wordslineoffsets.json

pushall:
	git push origin main

build-word-json:
	cat data/words.txt | node tools/copy-words-with-interesting-suffixes.js > data/usable-words.ndjson
