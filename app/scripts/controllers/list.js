'use strict';

/**
 * @ngdoc function
 * @name stickyNotesApp.controller:ListCtrl
 * @description
 * # ListCtrl
 * Controller of the stickyNotesApp
 */
angular.module('stickyNotesApp')
  .controller('ListCtrl', function ($scope, notesStorage) {
    $scope.notes = notesStorage.getAll();
    $scope.archived = notesStorage.getArchivedNotes();
  });
