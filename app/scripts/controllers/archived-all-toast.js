'use strict';

/**
 * @ngdoc function
 * @name stickyNotesApp.controller:ArchivedAllToastCtrl
 * @description
 * # ArchivedAllToastCtrl
 * Controller of the stickyNotesApp
 */
angular.module('stickyNotesApp')
  .controller('ArchivedAllToastCtrl', function($scope, $route, $mdToast, notesStorage, archivedNotes) {
    $scope.undo = function() {
      if (typeof archivedNotes !== Array) {
        archivedNotes = Array.prototype.slice.call(archivedNotes);
      }
      archivedNotes.forEach(function(note) {
        notesStorage.unarchive(note.id);
      });

      $route.reload();

      $mdToast.hide();
    };
  });
