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
  .controller('BoardCtrl', function($mdToast, $location, notesStorage, notes) {
    this.notes = notes;

    this.style = function(note) {
      if (angular.isUndefined(note)) {
        return;
      }

      return {
        backgroundColor: 'rgb(' + note.color.red + ',' + note.color.green + ',' + note.color.blue + ')',
        left: note.position.x + 'px',
        top: note.position.y + 'px'
      };
    };

    this.class = function(note) {
      var classes = {
        'md-whiteframe-z1': !note._dragged,
        'md-whiteframe-z2': note._dragged
      };

      classes[note.color] = true;

      return classes;
    };

    this.remove = function(notes, note) {
      notesStorage.remove(note.id).then(function() {
        var position = notes.indexOf(note),
          // to make sure no meta data ($$hashKey) will be coppied
          removedNote = angular.copy(note);

        if (position > -1) {
          notes.splice(position, 1);
        }

        $mdToast.show({
          controller: 'RemovedToastCtrl',
          controllerAs: 'RemovedToast',
          templateUrl: 'views/removed-toast.html',
          hideDelay: 6000,
          locals: {
            removedNote: removedNote
          }
        });
      });
    };

    this.archive = function(notes, note) {
      notesStorage.archive(note.id).then(function() {
        var position = notes.indexOf(note);

        if (position > -1) {
          notes.splice(position, 1);
        }
      });
    };

    this.drag = function(note) {
      note._dragged = true;
    };

    this.drop = function(note) {
      note._dragged = undefined;

      // TODO make use of promise api, and notify user when save failed
      return notesStorage.set(note.id, note);
    };

    this.move = function(note, x, y, boardSize) {
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

    this.noteDblclick = function(noteId) {
      $location.url('/edit/' + noteId);
    };
  });
