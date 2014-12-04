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
      note.position.x += x;
      note.position.y += y;
      console.log('x = ' + x + ', y = ' + y);
    };
    $scope.edit = function(id){

    }
  });
