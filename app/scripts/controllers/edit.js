'use strict';

/**
 * @ngdoc function
 * @name stickyNotesApp.controller:AddCtrl
 * @description
 * # AddCtrl
 * Controller of the stickyNotesApp
 */
angular.module('stickyNotesApp')
  .controller('EditCtrl', function($scope, $location, $routeParams, notesStorage, note) {
    var id = $routeParams.id;
    $scope.note = angular.copy(note);

    $scope.done = function() {
      notesStorage.set(id, $scope.note).then(function() {
        $location.path('/board');
      });
    };

    $scope.reset = function() {
      angular.copy(note, $scope.note);
    };

    $scope.cancel = function() {
      $location.path('/board');
    };
  });
