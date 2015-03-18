'use strict';

/**
 * @ngdoc overview
 * @name stickyNotesApp
 * @description
 * # stickyNotesApp
 *
 * Main module of the application.
 */
angular
  .module('stickyNotesApp', [
    'ngAnimate',
    'ngAria',
    'ngRoute',
    'ngTouch',
    'ngMaterial'
  ])
  .config(function($routeProvider) {
    $routeProvider
      .when('/board', {
        templateUrl: 'views/board.html',
        controller: 'BoardCtrl',
        resolve: {
          notes: function(notesStorage) {
            return notesStorage.getCurrent();
          }
        }
      })
      .when('/add', {
        templateUrl: 'views/add.html',
        controller: 'AddCtrl'
      })
      .when('/list', {
        templateUrl: 'views/list.html',
        controller: 'ListCtrl',
        resolve: {
          notes: function(notesStorage) {
            return notesStorage.getCurrent();
          },
          archived: function(notesStorage) {
            return notesStorage.getArchived();
          }
        }
      })
      .when('/edit/:id', {
        templateUrl: 'views/edit.html',
        controller: 'EditCtrl',
        resolve: {
          note: function($route, notesStorage) {
            return notesStorage.get($route.current.params.id);
          }
        }
      })
      .otherwise({
        redirectTo: '/board'
      });
  });
