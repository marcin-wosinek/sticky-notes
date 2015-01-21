Sticky notes [![Build Status](https://travis-ci.org/marcin-wosinek/sticky-notes.svg?branch=master)](https://travis-ci.org/marcin-wosinek/sticky-notes)
============

Demo of [angular material framework](https://material.angularjs.org/#/). It's the board with sticky notes that can be edited and moved around. Main point is to use as many ngMaterial features as possible.

# Contributing

We are happy to welcome more contributores to project. Issue and PR are both welcome.

# Local install & development

The code is generated using [yeoman](http://yeoman.io/)'s angular [generator](https://github.com/yeoman/generator-angular/). It's recommended to do the same while contributing to the project.

## Build

Our build is build at [grunt](http://gruntjs.com/) and runs at [node.js](http://nodejs.org/). Please check those projects to find more about installation. Assuming you have everything in place:

```sh
$ npm install // install all build dependencies
$ bower install // install frontend dependencies
```

Then you can use:

```sh
$ grunt serve // to start the develpement server
$ grunt build // to compile all source files to /dist folder
```

## Continues deployment
All commits pushed to master are automatically build by [travis-cs](https://travis-ci.org/marcin-wosinek/sticky-notes) and pushed to github page. 
