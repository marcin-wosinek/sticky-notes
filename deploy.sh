#!/bin/bash
cd dist
git init
git config user.name "Travis-CI"
git config user.email "marcin.wosinek+travis@gmail.com"
git remote add deploy https://${token}@github.com/marcin-wosinek/sticky-notes.git
git fetch deploy
git reset deploy/gh-pages --soft
git add . -A
git commit -m "Travis build `date`"
git push deploy master:gh-pages
