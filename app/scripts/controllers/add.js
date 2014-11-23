'use strict';

/**
 * @ngdoc function
 * @name stickyNotesApp.controller:AddCtrl
 * @description
 * # AddCtrl
 * Controller of the stickyNotesApp
 */
angular.module('stickyNotesApp')
  .controller('AddCtrl', function ($scope, $location, notesStorage) {
    $scope.add = function (note) {
      notesStorage.add(note);
      $location.path('/notes');
    };

    $scope.reset = function (note) {
      angular.copy({}, note);
    };

    $scope.cancel = function () {
      $location.path('/notes');
    };
  });
