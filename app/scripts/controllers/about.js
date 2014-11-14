'use strict';

/**
 * @ngdoc function
 * @name stickyNotesApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the stickyNotesApp
 */
angular.module('stickyNotesApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
