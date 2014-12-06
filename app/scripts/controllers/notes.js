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
        return;
      }

      return {
        left: note.position.x + 'px',
        top: note.position.y + 'px'
      };
    };

    $scope.remove = function (notes, note) {
      var index = notes.indexOf(note);

      if (index > -1) {
        notes.splice(index, 1);
      }
    };

    $scope.drag = function (note) {
      note._dragged = true;
    };

    $scope.drop = function (note) {
      delete note._dragged;
    };

    $scope.move = function (note, x, y) {
      // TODO migrate to some point math utility
      note.position.x += x;
      note.position.y += y;

      // TODO migrate to some point math utility
      if (note.position.x < 0) {
        note.position.x = 0;
      }

      if (note.position.y < 0) {
        note.position.y = 0;
      }
    };
    $scope.edit = function(id){

    }
  });
