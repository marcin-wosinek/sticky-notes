"use strict";angular.module("stickyNotesApp",["ngAnimate","ngAria","ngRoute","ngTouch","ngMaterial","ngStorage"]).config(["$routeProvider",function(a){a.when("/board",{templateUrl:"views/board.html",controller:"BoardCtrl"}).when("/add",{templateUrl:"views/add.html",controller:"AddCtrl"}).when("/list",{templateUrl:"views/list.html",controller:"ListCtrl"}).when("/edit/:id",{templateUrl:"views/edit.html",controller:"EditCtrl"}).otherwise({redirectTo:"/board"})}]),angular.module("stickyNotesApp").controller("BoardCtrl",["$scope","$mdToast","$location","notesStorage",function(a,b,c,d){a.notes=d.getAll(),a.style=function(a){return angular.isUndefined(a)?void 0:{backgroundColor:"rgb("+a.color.red+","+a.color.green+","+a.color.blue+")",left:a.position.x+"px",top:a.position.y+"px"}},a.remove=function(a,c){d.remove(c),b.show({controller:"RemovedToastCtrl",templateUrl:"views/removed-toast.html",hideDelay:6e3,locals:{removedNote:c}})},a.archive=function(a,b){d.archive(b)},a.drag=function(a){a._dragged=!0},a.drop=function(a){delete a._dragged},a.move=function(a,b,c,d){a.position.x+=b,a.position.y+=c,a.position.x<0&&(a.position.x=0),a.position.y<0&&(a.position.y=0),a.position.x<0&&(a.position.x=0),a.position.y<0&&(a.position.y=0),a.position.x>d.x-a._dimensions.x&&(a.position.x=d.x-a._dimensions.x),a.position.y>d.y-a._dimensions.y&&(a.position.y=d.y-a._dimensions.y)},a.noteDblclick=function(a){c.url("/edit/"+a)}}]),angular.module("stickyNotesApp").controller("AddCtrl",["$scope","$location","notesStorage",function(a,b,c){function d(){return Math.floor(75*Math.random()+180)}var e={position:{x:0,y:0},title:"",description:""};a.note=angular.copy(e),a.note.color={red:d(),green:d(),blue:d()},a.done=function(a){c.add(a),b.path("/board")},a.reset=function(a){angular.copy(e,a)},a.cancel=function(){b.path("/board")}}]),angular.module("stickyNotesApp").controller("EditCtrl",["$scope","$location","$routeParams","notesStorage",function(a,b,c,d){var e=c.id;a.note={},angular.copy(d.get(e),a.note),a.done=function(){d.set(e,a.note),b.path("/board")},a.reset=function(){angular.copy(d.get(e),a.note)},a.cancel=function(){b.path("/board")}}]),angular.module("stickyNotesApp").factory("notesStorage",["$localStorage",function(a){var b=a.$default({notes:[],archived:[]});return{add:function(a){b.notes.push(a)},getAll:function(){return b.notes},get:function(a){return b.notes[a]},set:function(a,c){b.notes[a]=c},remove:function(a){var c=b.notes.indexOf(a);c>-1&&b.notes.splice(c,1)},archive:function(a){var c=new Date;a.archivedDate={dd:c.getDate(),mm:c.getMonth(),yyyy:c.getFullYear(),time:c.getTime(),fullDate:c.getFullYear()+"-"+c.getMonth()+"-"+c.getDate()},b.archived.push(a),this.remove(a)},removeFromArchived:function(a){var c=b.archived.indexOf(a);c>-1&&b.archived.splice(c,1)},getArchivedNotes:function(){return b.archived}}}]),angular.module("stickyNotesApp").controller("ListCtrl",["$scope","notesStorage",function(a,b){a.notes=b.getAll(),a.archived=b.getArchivedNotes()}]),angular.module("stickyNotesApp").directive("drag",["$document","$parse",function(a,b){return{restrict:"EA",replace:!0,link:function(c,d,e){function f(a){c.$apply(function(){j=a.pageX-h,k=a.pageY-i,h=a.pageX,i=a.pageY,n(c,{deltaX:j,deltaY:k})})}function g(){a.unbind("mousemove",f),a.unbind("mouseup",g),c.$apply(function(){m(c)})}var h,i,j,k,l=b(e.onDrag),m=b(e.onDrop),n=b(e.onMove);d.on("mousedown",function(b){b.preventDefault(),h=b.pageX,i=b.pageY,a.on("mousemove",f),a.on("mouseup",g),c.$apply(function(){l(c)})})}}}]),angular.module("stickyNotesApp").directive("snDimensions",["$window","$parse","$timeout","dimensionDelay",function(a,b,c,d){return{restrict:"A",link:function(e,f,g){function h(){i.assign(e,{x:f[0].offsetWidth,y:f[0].offsetHeight})}var i=b(g.snDimensions);h(),c(h,d),a.onresize=function(){e.$apply(h)},e.$on("snResize",h)}}}]),angular.module("stickyNotesApp").controller("RemovedToastCtrl",["$scope","$mdToast","notesStorage","removedNote",function(a,b,c,d){a.restore=function(){c.add(d),b.hide()}}]),angular.module("stickyNotesApp").controller("SettingsCtrl",["$scope","$mdBottomSheet","$mdDialog","$mdToast","notesStorage",function(a,b,c,d,e){a.archiveAll=function(){for(var a=e.getAll(),b=a.length,c=[],f=b-1;f>=0;f--)c.push(a[f]),e.archive(a[f]);d.show({controller:"ArchivedAllToastCtrl",templateUrl:"views/archived-all-toast.html",hideDelay:6e3,locals:{archivedNotes:c}})},a.exitSettings=function(){b.hide()},a.authors=function(a){b.hide(),c.show({controller:"AuthorsCtrl",templateUrl:"views/authors.html",targetEvent:a})}}]),angular.module("stickyNotesApp").controller("HeaderCtrl",["$scope","$mdBottomSheet",function(a,b){a.openSettings=function(){b.show({templateUrl:"views/settings.html",controller:"SettingsCtrl"}).then(function(){a.alert="You are back!"})}}]),angular.module("stickyNotesApp").controller("AuthorsCtrl",["$scope","$mdDialog",function(a,b){a.hide=function(){b.hide()}}]),angular.module("stickyNotesApp").controller("MainCtrl",["$scope","$route","$timeout","$location","dimensionDelay",function(a,b,c,d,e){a.location=function(a){var b=d.$$path.split("/"),c=b[b.length-1];return"object"==typeof a?-1!==a.indexOf(c):a===c};var f=function(){a.route=b.current.loadedTemplateUrl.match("/(.*).html")[1],c(function(){a.$broadcast("snResize")},e)};a.$on("$routeChangeStart",function(){a.route=""}),a.$on("$routeChangeError",function(){f()}),a.$on("$routeChangeSuccess",function(){f()})}]),angular.module("stickyNotesApp").controller("ArchivedAllToastCtrl",["$scope","$mdToast","notesStorage","archivedNotes",function(a,b,c,d){a.undo=function(){typeof d!==Array&&(d=Array.prototype.slice.call(d)),d.forEach(function(a){c.removeFromArchived(a),c.add(a)}),b.hide()}}]),angular.module("stickyNotesApp").constant("dimensionDelay",100),angular.module("stickyNotesApp").filter("today",function(){return function(a){var b=new Date,c=[],d=b.getFullYear()+"-"+b.getMonth()+"-"+b.getDate();return a.forEach(function(a){a.archivedDate.fullDate===d&&c.push(a)}),c}}),angular.module("stickyNotesApp").filter("yesterday",function(){return function(a){var b=new Date,c=[],d=b.getFullYear()+"-"+b.getMonth()+"-"+b.getDate();return b.setDate(b.getDate()-1),a.forEach(function(a){a.archivedDate.fullDate===d&&c.push(a)}),c}}),angular.module("stickyNotesApp").filter("lastWeek",function(){return function(a){var b=new Date,c=[],d=new Array(5);b.setDate(b.getDate()-2);for(var e=0;5>e;e++)d[e]=b.getFullYear()+"-"+b.getMonth()+"-"+b.getDate(),b.setDate(b.getDate()-1);return a.forEach(function(a){-1!==d.indexOf(a.archivedDate.fullDate)&&c.push(a)}),c}}),angular.module("stickyNotesApp").filter("earlier",function(){return function(a){var b=new Date,c=[],d=new Array(7);b.setDate(b.getDate());for(var e=0;7>e;e++)d[e]=b.getFullYear()+"-"+b.getMonth()+"-"+b.getDate(),b.setDate(b.getDate()-1);return a.forEach(function(a){-1===d.indexOf(a.archivedDate.fullDate)&&c.push(a)}),c}}),angular.module("stickyNotesApp").run(["$templateCache",function(a){a.put("views/add.html","<div ng-include=\"'views/save.html'\"></div>"),a.put("views/archived-all-toast.html",'<md-toast>\n  Notes archived, <md-button ng-click="undo()">undo?</md-button>\n</md-toast>\n'),a.put("views/authors.html",'<md-dialog aria-label=Authors" class="authors-dialog">\n  <md-content>\n    <h2>Authors</h2>\n\n    <div class="person marcin">\n      <a href="https://github.com/marcin-wosinek" target="_blank">\n        <img src="./images/marcin.png" class="pic"/>\n      </a>\n      <strong>Marcin Wosinek</strong> <br />\n      <small>marcin.wosinek@gmail.com</small>\n    </div>\n    <hr>\n    <div class="person grzesiek">\n      <a href="https://github.com/grzim" target="_blank">\n        <img src="./images/grzesiek.png" class="pic"/>\n      </a>\n      <strong>Grzegorz Marzencki</strong><br />\n      <small>gm@pureepic.eu</small>\n    </div>\n  </md-content>\n\n\n  <div class="md-actions" layout="row">\n    <md-button ng-click="hide()" class="md-primary">\n      Hide\n    </md-button>\n  </div>\n\n</md-dialog>\n'),a.put("views/board.html",'<div class="workspace" sn-dimensions="boardSize">\n    <section layout="row" layout-sm="column" >\n      <md-button ng-href="#/add" class="smart-button md-fab" aria-label="Add link" ng-if="route != \'add\'"><md-icon icon="./images/add180.svg">Add</md-icon></md-button>\n    </section>\n    <div drag class="note"\n      sn-dimensions="note._dimensions"\n      on-drag="drag(note)" on-move="move(note, deltaX, deltaY, boardSize)" on-drop="drop(note)"\n      ng-style="style(note)"\n      ng-dblclick="noteDblclick($index)"\n      ng-class="{\'md-whiteframe-z1\': !note._dragged, \'md-whiteframe-z2\': note._dragged, \'{{note.color}}\': true}"\n      ng-repeat="note in notes">\n    <h3>{{note.title}}</h3>\n    {{note.description}}\n    <md-button class="edit" ng-href="#/edit/{{$index}}" aria-label="Edit note {{$index}}">\n      <md-icon icon="./images/create3.svg">Edit</md-icon>\n    </md-button>\n    <md-button class="remove" ng-click="remove(notes, note)" aria-label="Remove note {{$index}}">\n      <md-icon icon="./images/clear5.svg">Remove</md-icon>\n    </md-button>\n    <md-button class="archive" ng-click="archive(notes, note)" aria-label="Archive note {{$index}}">\n      <md-icon icon="./images/done.svg">Done</md-icon>\n    </md-button>\n  </div>\n</div>\n'),a.put("views/edit.html","<div ng-include=\"'views/save.html'\"></div>"),a.put("views/list.html",'<div ng-controller="ListCtrl" layout="column" flex layout-fill>\n    <md-content>\n        <section>\n            <md-subheader class="md-primary">Current</md-subheader>\n            <md-list layout="column">\n                <md-item ng-repeat="note in notes">\n                    <md-item-content>\n                        <div class="md-tile-left md-whiteframe-z1 note-preview" ng-attr-style="background: rgb({{note.color.red}},{{note.color.green}},{{note.color.blue}})">\n                        </div>\n                        <div class="md-tile-content">\n                            <h3>{{note.title}}</h3>\n                            <h4>{{note.date}}</h4>\n                            <p>\n                                {{note.description}}\n                            </p>\n                        </div>\n                    </md-item-content>\n                </md-item>\n            </md-list>\n        </section>\n      <section>\n        <md-subheader class="md-warn">Archived today</md-subheader>\n        <md-list layout="column">\n          <md-item ng-repeat="note in archived | today">\n            <md-item-content>\n              <div class="md-tile-left md-whiteframe-z1 note-preview" ng-attr-style="background: rgb({{note.color.red}},{{note.color.green}},{{note.color.blue}})">\n              </div>\n              <div class="md-tile-content">\n                <h3>{{note.title}}</h3>\n                <h4>{{note.date}}</h4>\n                <p>\n                  {{note.description}}\n                </p>\n              </div>\n            </md-item-content>\n          </md-item>\n        </md-list>\n      </section>\n      <section>\n        <md-subheader class="md-warn">Archived yesterday</md-subheader>\n        <md-list layout="column">\n          <md-item ng-repeat="note in archived | yesterday">\n            <md-item-content>\n              <div class="md-tile-left md-whiteframe-z1 note-preview" ng-attr-style="background: rgb({{note.color.red}},{{note.color.green}},{{note.color.blue}})">\n              </div>\n              <div class="md-tile-content">\n                <h3>{{note.title}}</h3>\n                <h4>{{note.date}}</h4>\n                <p>\n                  {{note.description}}\n                </p>\n              </div>\n            </md-item-content>\n          </md-item>\n        </md-list>\n      </section>\n      <section>\n        <md-subheader class="md-warn">Archived last week</md-subheader>\n        <md-list layout="column">\n          <md-item ng-repeat="note in archived | lastWeek">\n            <md-item-content>\n              <div class="md-tile-left md-whiteframe-z1 note-preview" ng-attr-style="background: rgb({{note.color.red}},{{note.color.green}},{{note.color.blue}})">\n              </div>\n              <div class="md-tile-content">\n                <h3>{{note.title}}</h3>\n                <h4>{{note.date}}</h4>\n                <p>\n                  {{note.description}}\n                </p>\n              </div>\n            </md-item-content>\n          </md-item>\n        </md-list>\n      </section>\n      <section>\n      <md-subheader class="md-warn">Archived earlier</md-subheader>\n        <md-list layout="column">\n          <md-item ng-repeat="note in archived | earlier">\n            <md-item-content>\n              <div class="md-tile-left md-whiteframe-z1 note-preview"ng-attr-style="background: rgb({{note.color.red}},{{note.color.green}},{{note.color.blue}})">\n              </div>\n              <div class="md-tile-content">\n                <h3>{{note.title}}</h3>\n                <h4>{{note.date}}</h4>\n                <p>\n                  {{note.description}}\n                </p>\n              </div>\n            </md-item-content>\n          </md-item>\n        </md-list>\n      </section>\n</div>\n'),a.put("views/removed-toast.html",'<md-toast>\n  Note removed, <md-button ng-click="restore()">restore?</md-button>\n</md-toast>\n'),a.put("views/save.html",'<form class="edit">\n  <div class="note md-whiteframe-z1" ng-attr-style="background: rgb({{note.color.red}},{{note.color.green}},{{note.color.blue}})">\n    <md-input-container>\n      <label>Title</label>\n      <input ng-model="note.title" />\n    </md-input-container>\n    <md-input-container>\n      <label>Description</label>\n      <textarea ng-model="note.description"></textarea>\n    </md-input-container>\n  </div>\n\n  Custom color:\n\n  <md-content class="md-padding">\n    <div layout>\n      <div layout layout-align="center center">\n        <span>R</span>\n      </div>\n      <md-slider md-theme="red" flex min="0" max="255" ng-model="note.color.red" aria-label="red" id="red-slider">\n      </md-slider>\n    </div>\n    <div layout>\n      <div layout layout-align="center center">\n        <span>G</span>\n      </div>\n      <md-slider md-theme="green" flex ng-model="note.color.green" min="0" max="255" aria-label="green" id="green-slider">\n      </md-slider>\n    </div>\n    <div layout>\n      <div layout layout-align="center center">\n        <span>B</span>\n      </div>\n      <md-slider md-theme="blue" flex ng-model="note.color.blue" min="0" max="255" aria-label="blue" id="blue-slider">\n      </md-slider>\n    </div>\n  </md-content>\n\n  <md-checkbox ng-model="note.date" aria-label="Due date">\n      Due date\n  </md-checkbox>\n  <md-input-container>\n    <label>Due date</label>\n    <input ng-model="note.dateValue" type="date" />\n  </md-input-container>\n\n  <md-button ng-click="done(note)" class="md-raised md-primary" aria-label="Add">Done</md-button>\n  <md-button ng-click="reset(note)" class="md-raised" aria-label="Reset">Reset</md-button>\n  <md-button ng-click="cancel()" class="md-raised md-warn" aria-label="Cancel">Cancel</md-button>\n</form>\n'),a.put("views/settings.html",'<md-bottom-sheet class="md-grid">\n  <md-list>\n    <md-item>\n      <md-button ng-click="archiveAll()" aria-label="Archive all">\n        <div>\n          <md-icon icon="./images/ic_delete_24px.svg"></md-icon>\n        </div>\n        Archive all\n      </md-button>\n    </md-item>\n    <md-item>\n      <md-button ng-click="authors($event)" aria-label="Authors">\n        <div>\n          <md-icon icon="./images/ic_group_24px.svg"></md-icon>\n        </div>\n        Authors\n      </md-button>\n    </md-item>\n    <md-item>\n      <md-button ng-click="exitSettings()" aria-label="Exit settings">\n        <div>\n          <md-icon icon="./images/ic_arrow_back_24px.svg"></md-icon>\n        </div>\n        Exit settings\n      </md-button>\n    </md-item>\n  </md-list>\n</md-bottom-sheet>\n')}]);