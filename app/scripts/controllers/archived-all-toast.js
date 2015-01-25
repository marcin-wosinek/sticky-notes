'use strict';

/**
 * @ngdoc function
 * @name stickyNotesApp.controller:ArchivedAllToastCtrl
 * @description
 * # ArchivedAllToastCtrl
 * Controller of the stickyNotesApp
 */
angular.module('stickyNotesApp')
  .controller('ArchivedAllToastCtrl', function ($scope, $mdToast, notesStorage, archivedNotes) {
    $scope.undo = function () {
      if (typeof archivedNotes !== Array) {
        archivedNotes = Array.prototype.slice.call(archivedNotes);
      }
      archivedNotes.forEach(function (note) {
        notesStorage.removeFromArchived(note);
        notesStorage.add(note);
      });
      $mdToast.hide();
    };
  });
