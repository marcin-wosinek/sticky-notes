"use strict";angular.module("stickyNotesApp",["ngAnimate","ngAria","ngRoute","ngTouch","ngMaterial"]).config(["$routeProvider",function(a){a.when("/board",{templateUrl:"views/board.html",controller:"BoardCtrl",resolve:{notes:["notesStorage",function(a){return a.getCurrent()}]}}).when("/add",{templateUrl:"views/add.html",controller:"AddCtrl"}).when("/list",{templateUrl:"views/list.html",controller:"ListCtrl",resolve:{notes:["notesStorage",function(a){return a.getCurrent()}],archived:["notesStorage",function(a){return a.getArchived()}]}}).when("/edit/:id",{templateUrl:"views/edit.html",controller:"EditCtrl",resolve:{note:["$route","notesStorage",function(a,b){return b.get(a.current.params.id)}]}}).otherwise({redirectTo:"/board"})}]),angular.module("stickyNotesApp").controller("BoardCtrl",["$scope","$mdToast","$location","notesStorage","notes",function(a,b,c,d,e){a.notes=e,a.style=function(a){return angular.isUndefined(a)?void 0:{backgroundColor:"rgb("+a.color.red+","+a.color.green+","+a.color.blue+")",left:a.position.x+"px",top:a.position.y+"px"}},a["class"]=function(a){var b={"md-whiteframe-z1":!a._dragged,"md-whiteframe-z2":a._dragged};return b[a.color]=!0,b},a.remove=function(a,c){d.remove(c.id).then(function(){var d=a.indexOf(c),e=angular.copy(c);d>-1&&a.splice(d,1),b.show({controller:"RemovedToastCtrl",templateUrl:"views/removed-toast.html",hideDelay:6e3,locals:{removedNote:e}})})},a.archive=function(a,b){d.archive(b.id).then(function(){var c=a.indexOf(b);c>-1&&a.splice(c,1)})},a.drag=function(a){a._dragged=!0},a.drop=function(a){return a._dragged=void 0,d.set(a.id,a)},a.move=function(a,b,c,d){a.position.x+=b,a.position.y+=c,a.position.x<0&&(a.position.x=0),a.position.y<0&&(a.position.y=0),a.position.x<0&&(a.position.x=0),a.position.y<0&&(a.position.y=0),a.position.x>d.x-a._dimensions.x&&(a.position.x=d.x-a._dimensions.x),a.position.y>d.y-a._dimensions.y&&(a.position.y=d.y-a._dimensions.y)},a.noteDblclick=function(a){c.url("/edit/"+a)}}]),angular.module("stickyNotesApp").controller("AddCtrl",["$scope","$location","notesStorage",function(a,b,c){function d(){return Math.floor(75*Math.random()+180)}var e={position:{x:0,y:0},title:"",description:""};a.note=angular.copy(e),a.note.color={red:d(),green:d(),blue:d()},a.done=function(a){c.add(a),b.path("/board")},a.reset=function(a){angular.copy(e,a)},a.cancel=function(){b.path("/board")}}]),angular.module("stickyNotesApp").controller("EditCtrl",["$scope","$location","$routeParams","notesStorage","note",function(a,b,c,d,e){var f=c.id;a.note=angular.copy(e),a.done=function(){d.set(f,a.note).then(function(){b.path("/board")})},a.reset=function(){angular.copy(e,a.note)},a.cancel=function(){b.path("/board")}}]),angular.module("stickyNotesApp").controller("ListCtrl",["$scope","notes","archived",function(a,b,c){a.notes=b,a.archived=c}]),angular.module("stickyNotesApp").directive("snDrag",["$document","$parse",function(a,b){return{restrict:"EA",replace:!0,link:function(c,d,e){function f(a){c.$apply(function(){j=a.pageX-h,k=a.pageY-i,h=a.pageX,i=a.pageY,n(c,{deltaX:j,deltaY:k})})}function g(){a.unbind("mousemove",f),a.unbind("mouseup",g),c.$apply(function(){m(c)})}var h,i,j,k,l=b(e.onDrag),m=b(e.onDrop),n=b(e.onMove);d.on("mousedown",function(b){b.preventDefault(),h=b.pageX,i=b.pageY,a.on("mousemove",f),a.on("mouseup",g),c.$apply(function(){l(c)})})}}}]),angular.module("stickyNotesApp").directive("snDimensions",["$window","$parse","$timeout","dimensionDelay",function(a,b,c,d){return{restrict:"A",link:function(e,f,g){function h(){i.assign(e,{x:f[0].offsetWidth,y:f[0].offsetHeight})}var i=b(g.snDimensions);h(),c(h,d),a.onresize=function(){e.$apply(h)},e.$on("snResize",h)}}}]),angular.module("stickyNotesApp").controller("RemovedToastCtrl",["$scope","$mdToast","$route","notesStorage","removedNote",function(a,b,c,d,e){a.restore=function(){d.add(e),b.hide(),c.reload()}}]),angular.module("stickyNotesApp").controller("SettingsCtrl",["$scope","$route","$mdBottomSheet","$mdDialog","$mdToast","notesStorage","notes",function(a,b,c,d,e,f,g){a.archiveAll=function(){for(var a=g,c=a.length,d=[],h=c-1;h>=0;h--)d.push(angular.copy(a[h])),f.archive(a[h].id);b.reload(),e.show({controller:"ArchivedAllToastCtrl",templateUrl:"views/archived-all-toast.html",hideDelay:6e3,locals:{archivedNotes:d}})},a.exitSettings=function(){c.hide()},a.authors=function(a){c.hide(),d.show({controller:"AuthorsCtrl",templateUrl:"views/authors.html",targetEvent:a})}}]),angular.module("stickyNotesApp").controller("HeaderCtrl",["$mdBottomSheet","notesStorage",function(a,b){this.openSettings=function(){a.show({templateUrl:"views/settings.html",controller:"SettingsCtrl",resolve:{notes:function(){return b.getCurrent()}}})}}]),angular.module("stickyNotesApp").controller("AuthorsCtrl",["$scope","$mdDialog",function(a,b){a.hide=function(){b.hide()}}]),angular.module("stickyNotesApp").controller("ArchivedAllToastCtrl",["$scope","$route","$mdToast","notesStorage","archivedNotes",function(a,b,c,d,e){a.undo=function(){typeof e!==Array&&(e=Array.prototype.slice.call(e)),e.forEach(function(a){d.unarchive(a.id)}),b.reload(),c.hide()}}]),angular.module("stickyNotesApp").constant("dimensionDelay",100),angular.module("stickyNotesApp").filter("today",["now",function(a){return function(b,c){var d=[],e=moment(a);if(!angular.isArray(b))return b;var f=c?function(a){return a[c]}:function(a){return a};return b.forEach(function(a){e.isSame(f(a),"day")&&d.push(a)}),d}}]),angular.module("stickyNotesApp").filter("yesterday",["now",function(a){return function(b,c){var d=[],e=moment(a).subtract(1,"days");if(!angular.isArray(b))return b;var f=c?function(a){return a[c]}:function(a){return a};return b.forEach(function(a){e.isSame(f(a),"day")&&d.push(a)}),d}}]),angular.module("stickyNotesApp").filter("earlier",["now",function(a){return function(b,c){var d=[],e=moment(a).subtract(1,"days");if(!angular.isArray(b))return b;var f=c?function(a){return a[c]}:function(a){return a};return b.forEach(function(a){e.isAfter(f(a),"day")&&d.push(a)}),d}}]),angular.module("stickyNotesApp").service("storage",["$q",function(a){var b=localStorage;return{add:function(c){return a(function(a){var d=angular.copy(c);d.id=Math.random().toString(36).substring(7),b[d.id]=JSON.stringify(d),a(d.id)})},getAll:function(){return a(function(a){var c=[];_.each(Object.keys(localStorage),function(a){c.push(JSON.parse(b[a]))}),a(c)})},get:function(c){return a(function(a){a(JSON.parse(b[c]))})},set:function(c,d){return a(function(a){b[c]=JSON.stringify(d),a(!0)})},remove:function(c){return a(function(a){delete b[c],a(!0)})}}}]),angular.module("stickyNotesApp").factory("notesStorage",["storage",function(a){var b=function(){var b=this;this.add=function(b){return b.archived=!1,a.add(b)},this.archive=function(a){return this.get(a).then(function(c){return c.archived=!0,c.archivedDate=new Date,b.set(a,c)})},this.unarchive=function(a){return this.get(a).then(function(c){return c.archived=!1,c.archivedDate=void 0,b.set(a,c)})},this.getArchived=function(){return this.getAll().then(function(a){return _.where(a,{archived:!0})})},this.getCurrent=function(){return this.getAll().then(function(a){return _.where(a,{archived:!1})})}};return b.prototype=a,new b}]),angular.module("stickyNotesApp").constant("now",new Date),angular.module("stickyNotesApp").run(["$templateCache",function(a){a.put("views/add.html","<div ng-include=\"'views/partials/note-form.html'\"></div>\n"),a.put("views/archived-all-toast.html",'<md-toast>\n  Notes archived, <md-button ng-click="undo()">undo?</md-button>\n</md-toast>\n'),a.put("views/authors.html",'<md-dialog aria-label=Authors" class="authors-dialog">\n  <md-content>\n    <h2>Authors</h2>\n\n    <div class="person marcin">\n      <a href="https://github.com/marcin-wosinek" target="_blank">\n        <img src="./images/marcin.png" class="pic"/>\n      </a>\n      <br>\n      <a href="https://twitter.com/MarcinWosine">@MarcinWosinek</a>\n    </div>\n    <hr>\n    <div class="person grzesiek">\n      <a href="https://github.com/grzim" target="_blank">\n        <img src="./images/grzesiek.png" class="pic"/>\n      </a>\n      <br>\n      <a href="https://twitter.com/griszue">@griszue</a>\n    </div>\n  </md-content>\n\n\n  <div class="md-actions" layout="row">\n    <md-button ng-click="hide()" class="md-primary">\n      Hide\n    </md-button>\n  </div>\n\n</md-dialog>\n'),a.put("views/board.html",'<div class="workspace" sn-dimensions="boardSize">\n  <section layout="row" layout-sm="column" >\n    <md-button ng-href="#/add" class="smart-button md-fab" aria-label="Add link" ng-if="route != \'add\'">\n      <md-icon md-svg-icon="./images/add180.svg">Add</md-icon>\n    </md-button>\n  </section>\n  <div sn-drag class="note"\n      sn-dimensions="note._dimensions"\n      on-drag="drag(note)" on-move="move(note, deltaX, deltaY, boardSize)" on-drop="drop(note)"\n      ng-style="style(note)"\n      ng-dblclick="noteDblclick(note.id)"\n      ng-class="class(note)"\n      ng-repeat="note in notes">\n    <h3>{{note.title}}</h3>\n    {{note.description}}\n    <md-button class="edit" ng-href="#/edit/{{note.id}}" aria-label="Edit note {{note.id}}" title="Edit">\n      <md-icon md-svg-icon="./images/create3.svg">Edit</md-icon>\n    </md-button>\n    <md-button class="remove" ng-click="remove(notes, note)" aria-label="Remove note {{note.id}}" title="Remove">\n      <md-icon md-svg-icon="./images/clear5.svg">Remove</md-icon>\n    </md-button>\n    <md-button class="archive" ng-click="archive(notes, note)" aria-label="Archive note {{note.id}}" title="Archive">\n      <md-icon md-svg-icon="./images/done.svg">Done</md-icon>\n    </md-button>\n  </div>\n</div>\n'),a.put("views/edit.html","<div ng-include=\"'views/partials/note-form.html'\"></div>\n"),a.put("views/list.html",'<div layout="column" flex layout-fill>\n  <md-content>\n  <section>\n    <md-subheader class="md-primary">Current</md-subheader>\n    <md-list layout="column">\n      <md-item ng-repeat="note in notes" ng-include="\'views/partials/list-element.html\'"></md-item>\n    </md-list>\n  </section>\n  <section>\n    <md-subheader class="md-warn">Archived today</md-subheader>\n    <md-list layout="column">\n      <md-item ng-repeat="note in archived | today: \'archivedDate\'" ng-include="\'views/partials/list-element.html\'"></md-item>\n    </md-list>\n  </section>\n  <section>\n    <md-subheader class="md-warn">Archived yesterday</md-subheader>\n    <md-list layout="column">\n      <md-item ng-repeat="note in archived | yesterday: \'archivedDate\'" ng-include="\'views/partials/list-element.html\'"></md-item>\n    </md-list>\n  </section>\n  <section>\n    <md-subheader class="md-warn">Archived earlier</md-subheader>\n    <md-list layout="column">\n      <md-item ng-repeat="note in archived | earlier: \'archivedDate\'" ng-include="\'views/partials/list-element.html\'"></md-item>\n    </md-list>\n  </section>\n</div>\n'),a.put("views/partials/list-element.html",'<md-item-content>\n  <div class="md-tile-left md-whiteframe-z1 note-preview" ng-attr-style="background: rgb({{note.color.red}},{{note.color.green}},{{note.color.blue}})">\n  </div>\n  <div class="md-tile-content">\n    <h3>{{note.title}}</h3>\n    <h4>{{note.date}}</h4>\n    <p>\n      {{note.description}}\n    </p>\n  </div>\n</md-item-content>\n'),a.put("views/partials/note-form.html",'<form class="edit">\n  <div class="note md-whiteframe-z1" ng-attr-style="background: rgb({{note.color.red}},{{note.color.green}},{{note.color.blue}})">\n    <md-input-container>\n      <label>Title</label>\n      <input ng-model="note.title" />\n    </md-input-container>\n    <md-input-container>\n      <label>Description</label>\n      <textarea ng-model="note.description"></textarea>\n    </md-input-container>\n  </div>\n\n  Custom color:\n\n  <md-content class="md-padding">\n    <div layout>\n      <div layout layout-align="center center">\n        <span>R</span>\n      </div>\n      <md-slider md-theme="red" flex min="0" max="255" ng-model="note.color.red" aria-label="red" id="red-slider">\n      </md-slider>\n    </div>\n    <div layout>\n      <div layout layout-align="center center">\n        <span>G</span>\n      </div>\n      <md-slider md-theme="green" flex ng-model="note.color.green" min="0" max="255" aria-label="green" id="green-slider">\n      </md-slider>\n    </div>\n    <div layout>\n      <div layout layout-align="center center">\n        <span>B</span>\n      </div>\n      <md-slider md-theme="blue" flex ng-model="note.color.blue" min="0" max="255" aria-label="blue" id="blue-slider">\n      </md-slider>\n    </div>\n  </md-content>\n\n  <md-checkbox ng-model="note.date" aria-label="Due date">\n      Due date\n  </md-checkbox>\n  <md-input-container>\n    <label>Due date</label>\n    <input ng-model="note.dateValue" type="date" />\n  </md-input-container>\n\n  <md-button ng-click="done(note)" class="md-raised md-primary" aria-label="Add">Done</md-button>\n  <md-button ng-click="reset(note)" class="md-raised" aria-label="Reset">Reset</md-button>\n  <md-button ng-click="cancel()" class="md-raised md-warn" aria-label="Cancel">Cancel</md-button>\n</form>\n'),a.put("views/removed-toast.html",'<md-toast>\n  Note removed, <md-button ng-click="restore()">restore?</md-button>\n</md-toast>\n'),a.put("views/settings.html",'<md-bottom-sheet class="md-grid">\n  <md-list>\n    <md-item>\n      <md-button ng-click="archiveAll()" aria-label="Archive all">\n        <div>\n          <md-icon md-svg-icon="./images/ic_delete_24px.svg"></md-icon>\n        </div>\n        Archive all\n      </md-button>\n    </md-item>\n    <md-item>\n      <md-button ng-click="authors($event)" aria-label="Authors">\n        <div>\n          <md-icon md-svg-icon="./images/ic_group_24px.svg"></md-icon>\n        </div>\n        Authors\n      </md-button>\n    </md-item>\n    <md-item>\n      <md-button ng-click="exitSettings()" aria-label="Exit settings">\n        <div>\n          <md-icon md-svg-icon="./images/ic_arrow_back_24px.svg"></md-icon>\n        </div>\n        Exit settings\n      </md-button>\n    </md-item>\n  </md-list>\n</md-bottom-sheet>\n')}]);