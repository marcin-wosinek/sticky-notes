'use strict';

/**
 * @ngdoc function
 * @name stickyNotesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the stickyNotesApp
 */
angular.module('stickyNotesApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
