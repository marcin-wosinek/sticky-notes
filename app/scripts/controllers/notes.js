'use strict';

/**
 * @ngdoc function
 * @name stickyNotesApp.controller:NotesCtrl
 * @description
 * # NotesCtrl
 * Controller of the stickyNotesApp
 */
angular.module('stickyNotesApp')
  .controller('NotesCtrl', function ($scope, notesStorage) {

    $scope.hello = "test";
    $scope.notes = notesStorage.getAll();

    $scope.style = function (note) {
      return {
        left: note.position.x + 'px',
        top: note.position.y + 'px'
      };
    };
  });
