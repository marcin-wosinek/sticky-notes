'use strict';

/**
 * @ngdoc function
 * @name stickyNotesApp.controller:NotesCtrl
 * @description
 * # NotesCtrl
 * Controller of the stickyNotesApp
 *
 * TODO rename to BoardCtrl?
 */
angular.module('stickyNotesApp')
  .controller('NotesCtrl', function ($scope, notesStorage) {

    $scope.hello = "test";
    $scope.notes = notesStorage.getAll();

    $scope.style = function (note) {
      if(angular.isUndefined(note)){
        note = {position:{}};
        note.position.x = 0;
        note.position.y = 0;
      }
      return {
        left: note.position.x + 'px',
        top: note.position.y + 'px'
      };
    };

    $scope.drag = function (note) {
      note._dragged = true;
    };

    $scope.drop = function (note) {
      delete note._dragged;
    };
  });
