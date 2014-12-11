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
    'ngMaterial',
    'ngStorage'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/board', {
        templateUrl: 'views/board.html',
        controller: 'BoardCtrl'
      })
      .when('/add', {
        templateUrl: 'views/add.html',
        controller: 'AddCtrl'
      })
      .when('/list', {
        templateUrl: 'views/list.html',
        controller: 'ListCtrl'
      })
      .when('/edit/:id', {
        templateUrl: 'views/edit.html',
        controller: 'EditCtrl'
      })
      .otherwise({
        redirectTo: '/board'
      });
  });
