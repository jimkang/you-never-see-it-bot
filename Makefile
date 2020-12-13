include config.mk

PROJECTNAME = you-never-see-it-bot
HOMEDIR = $(shell pwd)
SSHCMD = ssh $(USER)@$(SERVER)
APPDIR = /opt/$(PROJECTNAME)

pushall: sync
	git push origin main

sync:
	rsync -a $(HOMEDIR) $(USER)@$(SERVER):/opt/ --exclude node_modules/
	$(SSHCMD) "cd $(APPDIR) && npm install"

set-up-dir:
	$(SSHCMD) "mkdir -p $(APPDIR)"

run:
	node post-observation.js

template-offsets:
	cat data/usable-words.ndjson|wc -l > data/usable-words-count.txt
	node node_modules/.bin/get-file-line-offsets-in-json data/usable-words.ndjson > \
		data/wordslineoffsets.json

build-word-json:
	cat data/words.txt | node tools/copy-words-with-interesting-suffixes.js > data/usable-words.ndjson

update-base-words:
	#wget http://svn.code.sf.net/p/cmusphinx/code/trunk/cmudict/cmudict-0.7b -O data/cmudict.txt
	cat data/cmudict.txt | node tools/filter-words.js > data/words.txt
