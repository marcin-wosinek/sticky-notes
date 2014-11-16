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
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/notes', {
        templateUrl: 'views/notes.html',
        controller: 'NotesCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
