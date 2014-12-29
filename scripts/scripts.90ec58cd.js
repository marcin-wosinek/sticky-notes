"use strict";angular.module("stickyNotesApp",["ngAnimate","ngAria","ngRoute","ngTouch","ngMaterial","ngStorage"]).config(["$routeProvider",function(a){a.when("/board",{templateUrl:"views/board.html",controller:"BoardCtrl"}).when("/add",{templateUrl:"views/add.html",controller:"AddCtrl"}).when("/list",{templateUrl:"views/list.html",controller:"ListCtrl"}).when("/edit/:id",{templateUrl:"views/edit.html",controller:"EditCtrl"}).otherwise({redirectTo:"/board"})}]),angular.module("stickyNotesApp").controller("BoardCtrl",["$scope","$mdToast","notesStorage",function(a,b,c){a.hello="test",a.notes=c.getAll(),a.style=function(a){return angular.isUndefined(a)?void 0:{"background-color":a.color,left:a.position.x+"px",top:a.position.y+"px"}},a.remove=function(a,d){c.remove(d),b.show({controller:"RemovedToastCtrl",templateUrl:"views/removed-toast.html",hideDelay:6e3,locals:{removedNote:d}})},a.archive=function(a,b){c.archive(b)},a.drag=function(a){a._dragged=!0},a.drop=function(a){delete a._dragged},a.move=function(a,b,c,d){a.position.x+=b,a.position.y+=c,a.position.x<0&&(a.position.x=0),a.position.y<0&&(a.position.y=0),a.position.x<0&&(a.position.x=0),a.position.y<0&&(a.position.y=0),a.position.x>d.x-a._dimensions.x&&(a.position.x=d.x-a._dimensions.x),a.position.y>d.y-a._dimensions.y&&(a.position.y=d.y-a._dimensions.y)}}]),angular.module("stickyNotesApp").controller("AddCtrl",["$scope","$location","notesStorage",function(a,b,c){var d={position:{x:0,y:0},title:"",description:""};a.note=angular.copy(d),a.note.color="#FFFFFF",a.done=function(a){c.add(a),b.path("/board")},a.reset=function(a){angular.copy(d,a)},a.cancel=function(){b.path("/board")}}]),angular.module("stickyNotesApp").controller("EditCtrl",["$scope","$location","$routeParams","notesStorage",function(a,b,c,d){var e=c.id;a.note={},angular.copy(d.get(e),a.note),a.done=function(){d.set(e,a.note),b.path("/board")},a.reset=function(){angular.copy(d.get(e),a.note)},a.cancel=function(){b.path("/board")}}]),angular.module("stickyNotesApp").factory("notesStorage",["$localStorage",function(a){var b=a.$default({notes:[],archived:[]});return{add:function(a){b.notes.push(a)},getAll:function(){return b.notes},get:function(a){return b.notes[a]},set:function(a,c){b.notes[a]=c},remove:function(a){var c=b.notes.indexOf(a);c>-1&&b.notes.splice(c,1)},archive:function(a){var c=new Date;a.archivedDate={dd:c.getDate(),mm:c.getMonth(),yyyy:c.getFullYear(),time:c.getTime(),fullDate:c.getFullYear()+"-"+c.getMonth()+"-"+c.getDate()},b.archived.push(a),this.remove(a)},getArchivedNotes:function(){return b.archived}}}]),angular.module("stickyNotesApp").controller("ListCtrl",["$scope","notesStorage",function(a,b){a.notes=b.getAll(),a.archived=b.getArchivedNotes()}]),angular.module("stickyNotesApp").directive("drag",["$document","$parse",function(a,b){return{restrict:"EA",replace:!0,link:function(c,d,e){function f(a){c.$apply(function(){j=a.pageX-h,k=a.pageY-i,h=a.pageX,i=a.pageY,n(c,{deltaX:j,deltaY:k})})}function g(){a.unbind("mousemove",f),a.unbind("mouseup",g),c.$apply(function(){m(c)})}var h,i,j,k,l=b(e.onDrag),m=b(e.onDrop),n=b(e.onMove);d.on("mousedown",function(b){b.preventDefault(),h=b.pageX,i=b.pageY,a.on("mousemove",f),a.on("mouseup",g),c.$apply(function(){l(c)})})}}}]),angular.module("stickyNotesApp").directive("snDimensions",["$window","$parse","$timeout","dimensionDelay",function(a,b,c,d){return{restrict:"A",link:function(e,f,g){function h(){i.assign(e,{x:f[0].offsetWidth,y:f[0].offsetHeight})}var i=b(g.snDimensions);h(),c(h,d),a.onresize=function(){e.$apply(h)},e.$on("snResize",h)}}}]),angular.module("stickyNotesApp").controller("RemovedToastCtrl",["$scope","$mdToast","notesStorage","removedNote",function(a,b,c,d){a.restore=function(){c.add(d),b.hide()}}]),angular.module("stickyNotesApp").controller("SettingsCtrl",["$scope","$mdBottomSheet","$mdDialog","notesStorage",function(a,b,c,d){a.archiveAll=function(){for(var a=d.getAll(),b=a.length,c=b-1;c>=0;c--)d.archive(a[c])},a.exitSettings=function(){b.hide()},a.authors=function(a){b.hide(),c.show({controller:"AuthorsCtrl",templateUrl:"views/authors.html",targetEvent:a})}}]),angular.module("stickyNotesApp").controller("HeaderCtrl",["$scope","$mdBottomSheet",function(a,b){a.openSettings=function(){b.show({templateUrl:"views/settings.html",controller:"SettingsCtrl"}).then(function(){a.alert="You are back!"})}}]),angular.module("stickyNotesApp").controller("AuthorsCtrl",["$scope","$mdDialog",function(a,b){a.hide=function(){b.hide()}}]),angular.module("stickyNotesApp").controller("MainCtrl",["$scope","$route","$timeout","dimensionDelay",function(a,b,c,d){var e=function(){a.route=b.current.loadedTemplateUrl.match("/(.*).html")[1],c(function(){a.$broadcast("snResize")},d)};a.$on("$routeChangeStart",function(){a.route=""}),a.$on("$routeChangeError",function(){e()}),a.$on("$routeChangeSuccess",function(){e()})}]),angular.module("stickyNotesApp").constant("dimensionDelay",100),angular.module("stickyNotesApp").filter("today",function(){return function(a){var b=new Date,c=[],d=b.getFullYear()+"-"+b.getMonth()+"-"+b.getDate();return a.forEach(function(a){a.archivedDate.fullDate===d&&c.push(a)}),c}}),angular.module("stickyNotesApp").filter("yesterday",function(){return function(a){var b=new Date,c=[];b.setDate(b.getDate()-1);var d=b.getFullYear()+"-"+b.getMonth()+"-"+b.getDate();return a.forEach(function(a){a.archivedDate.fullDate===d&&c.push(a)}),c}}),angular.module("stickyNotesApp").filter("lastWeek",function(){return function(a){var b=new Date,c=[];b.setDate(b.getDate()-2);for(var d=new Array(5),e=0;5>e;e++)d[e]=b.getFullYear()+"-"+b.getMonth()+"-"+b.getDate(),b.setDate(b.getDate()-1);return a.forEach(function(a){-1!==d.indexOf(a.archivedDate.fullDate)&&c.push(a)}),c}}),angular.module("stickyNotesApp").filter("earlier",function(){return function(a){var b=new Date,c=[];b.setDate(b.getDate());for(var d=new Array(7),e=0;7>e;e++)d[e]=b.getFullYear()+"-"+b.getMonth()+"-"+b.getDate(),b.setDate(b.getDate()-1);return a.forEach(function(a){-1===d.indexOf(a.archivedDate.fullDate)&&c.push(a)}),c}});