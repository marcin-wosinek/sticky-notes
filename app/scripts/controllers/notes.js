'use strict';

/**
 * @ngdoc function
 * @name stickyNotesApp.controller:NotesCtrl
 * @description
 * # NotesCtrl
 * Controller of the stickyNotesApp
 *
 * TODO #4 rename to BoardCtrl
 */
angular.module('stickyNotesApp')
  .controller('NotesCtrl', function ($scope, notesStorage) {

    var NOTE_WIDTH = 250,
      NOTE_HEIGHT = 150;

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

    $scope.move = function (note, x, y, boardSize) {
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

      if (note.position.x < 0) {
        note.position.x = 0;
      }

      if (note.position.y < 0) {
        note.position.y = 0;
      }

      if (note.position.x > boardSize.x - NOTE_WIDTH) {
        note.position.x = boardSize.x - NOTE_WIDTH;
      }

      if (note.position.y > boardSize.y - NOTE_HEIGHT) {
        note.position.y = boardSize.y - NOTE_HEIGHT;
      }
    };
  });
