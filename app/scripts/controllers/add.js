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

    function generateColor () {
      return Math.floor(Math.random() * (255 - 180) + 180);
    }

    $scope.note = angular.copy(emptyNote);
    $scope.note.color = {
      red: generateColor(),
      green:generateColor(),
      blue:generateColor()
    };

    $scope.done = function (note) {
      // TODO make use of promise api, and notify user when save failed
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
