"use strict";angular.module("stickyNotesApp",["ngAnimate","ngAria","ngRoute","ngTouch","ngMaterial","ngStorage"]).config(["$routeProvider",function(a){a.when("/board",{templateUrl:"views/board.html",controller:"BoardCtrl"}).when("/add",{templateUrl:"views/add.html",controller:"AddCtrl"}).when("/list",{templateUrl:"views/list.html",controller:"ListCtrl"}).when("/edit/:id",{templateUrl:"views/edit.html",controller:"EditCtrl"}).otherwise({redirectTo:"/board"})}]),angular.module("stickyNotesApp").controller("BoardCtrl",["$scope","$mdToast","notesStorage",function(a,b,c){a.hello="test",a.notes=c.getAll(),a.style=function(a){return angular.isUndefined(a)?void 0:{left:a.position.x+"px",top:a.position.y+"px"}},a.remove=function(a,c){var d,e=a.indexOf(c);e>-1&&(d=a[e],a.splice(e,1),b.show({controller:"RemovedToastCtrl",templateUrl:"views/removed-toast.html",hideDelay:6e3,locals:{removedNote:d}}))},a.drag=function(a){a._dragged=!0},a.drop=function(a){delete a._dragged},a.move=function(a,b,c,d){a.position.x+=b,a.position.y+=c,a.position.x<0&&(a.position.x=0),a.position.y<0&&(a.position.y=0),a.position.x<0&&(a.position.x=0),a.position.y<0&&(a.position.y=0),a.position.x>d.x-a._dimensions.x&&(a.position.x=d.x-a._dimensions.x),a.position.y>d.y-a._dimensions.y&&(a.position.y=d.y-a._dimensions.y)}}]),angular.module("stickyNotesApp").controller("AddCtrl",["$scope","$location","notesStorage",function(a,b,c){var d={position:{x:0,y:0},title:"",description:""};a.note=angular.copy(d),a.add=function(a){c.add(a),b.path("/board")},a.reset=function(a){angular.copy(d,a)},a.cancel=function(){b.path("/board")}}]),angular.module("stickyNotesApp").controller("EditCtrl",["$scope","$location","$routeParams","notesStorage",function(a,b,c,d){var e=c.id;a.note={},angular.copy(d.get(e),a.note),a.update=function(){d.set(e,a.note),b.path("/board")},a.reset=function(){angular.copy(d.get(e),a.note)},a.cancel=function(){b.path("/board")}}]),angular.module("stickyNotesApp").factory("notesStorage",["$localStorage",function(a){var b=a.$default({notes:[]});return{add:function(a){b.notes.push(a)},getAll:function(){return b.notes},get:function(a){return b.notes[a]},set:function(a,c){b.notes[a]=c}}}]),angular.module("stickyNotesApp").controller("ListCtrl",["$scope","notesStorage",function(a,b){a.notes=b.getAll()}]),angular.module("stickyNotesApp").directive("drag",["$document","$parse",function(a,b){return{restrict:"EA",replace:!0,link:function(c,d,e){function f(a){c.$apply(function(){j=a.pageX-h,k=a.pageY-i,h=a.pageX,i=a.pageY,n(c,{deltaX:j,deltaY:k})})}function g(){a.unbind("mousemove",f),a.unbind("mouseup",g),c.$apply(function(){m(c)})}var h,i,j,k,l=b(e.onDrag),m=b(e.onDrop),n=b(e.onMove);d.on("mousedown",function(b){b.preventDefault(),h=b.pageX,i=b.pageY,a.on("mousemove",f),a.on("mouseup",g),c.$apply(function(){l(c)})})}}}]),angular.module("stickyNotesApp").directive("snDimensions",["$window","$parse","$timeout",function(a,b,c){return{restrict:"A",link:function(d,e,f){function g(){h.assign(d,{x:e[0].offsetWidth,y:e[0].offsetHeight})}var h=b(f.snDimensions);g(),c(g,0),a.onresize=function(){d.$apply(g)},d.$on("snResize",g)}}}]),angular.module("stickyNotesApp").controller("RemovedToastCtrl",["$scope","$mdToast","notesStorage","removedNote",function(a,b,c,d){a.restore=function(){c.add(d),b.hide()}}]),angular.module("stickyNotesApp").controller("SettingsCtrl",["$scope","$mdBottomSheet",function(a,b){a.cleanBoard=function(){},a.exitSettings=function(){b.hide()}}]),angular.module("stickyNotesApp").controller("HeaderCtrl",["$scope","$mdBottomSheet",function(a,b){a.openSettings=function(){b.show({templateUrl:"views/settings.html",controller:"SettingsCtrl"}).then(function(){a.alert="You are back!"})}}]);