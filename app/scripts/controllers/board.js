'use strict';

/**
 * @ngdoc function
 * @name stickyNotesApp.controller:BoardCtrl
 * @description
 * # BoardCtrl
 * Main controller of the stickyNotesApp. Diplays notes at board and manage
 * their interactions.
 */
angular.module('stickyNotesApp')
  .controller('BoardCtrl', function ($scope, $mdToast, $location, notesStorage) {

    $scope.notes = notesStorage.getCurrent();

    $scope.style = function (note) {
      if (angular.isUndefined(note)) {
        return;
      }

      return {
        backgroundColor: 'rgb(' + note.color.red + ',' + note.color.green + ',' + note.color.blue + ')',
        left: note.position.x + 'px',
        top: note.position.y + 'px'
      };
    };

    $scope.remove = function (notes, note) {

      notesStorage.remove(note.id);
      // TODO do it smarter
      $scope.notes = notesStorage.getCurrent();

      $mdToast.show({
        controller: 'RemovedToastCtrl',
        templateUrl: 'views/removed-toast.html',
        hideDelay: 6000,
        locals: {
          removedNote: note
        }
      });
    };

    $scope.archive = function (notes, note) {

      notesStorage.archive(note.id);
      // TODO do it smarter
      $scope.notes = notesStorage.getCurrent();
    };

    $scope.drag = function (note) {
      note._dragged = true;
    };

    $scope.drop = function (note) {
      delete note._dragged;
      notesStorage.set(note.id, note);
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

      if (note.position.x > boardSize.x - note._dimensions.x) {
        note.position.x = boardSize.x - note._dimensions.x;
      }

      if (note.position.y > boardSize.y - note._dimensions.y) {
        note.position.y = boardSize.y - note._dimensions.y;
      }
    };

    $scope.noteDblclick = function (noteId) {
      $location.url('/edit/' + noteId);
    };
  });
