'use strict';

/**
 * @ngdoc function
 * @name stickyNotesApp.controller:AddCtrl
 * @description
 * # AddCtrl
 * Controller of the stickyNotesApp
 */
angular.module('stickyNotesApp')
  .controller('EditCtrl', function ($scope, $location, $routeParams, notesStorage) {
    var id = $routeParams.id;
    $scope.note = {}

    angular.copy(notesStorage.get(id),$scope.note);
    $scope.done = function () {
      notesStorage.set(id, $scope.note);
      $location.path('/board');
    };

    $scope.reset = function () {
      angular.copy(notesStorage.get(id), $scope.note);
    };

    $scope.cancel = function () {
      $location.path('/board');
    };
  });
