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
    var emptyNote = {
      position: {
        x: 0,
        y: 0
      },
      title: '',
      description: ''
    };

    $scope.note = angular.copy(emptyNote);

    $scope.add = function (note) {
      notesStorage.add(note);
      $location.path('/board');
    };

    $scope.reset = function (note) {
      angular.copy(emptyNote, note);
    };

    $scope.cancel = function () {
      $location.path('/board');
    };
  });
