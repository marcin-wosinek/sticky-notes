'use strict';

/**
 * @ngdoc function
 * @name stickyNotesApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the stickyNotesApp
 */
angular.module('stickyNotesApp')
  .controller('SettingsCtrl', function ($scope, $mdBottomSheet, $mdDialog, $mdToast, notesStorage) {
    $scope.archiveAll = function () {
      var notes = notesStorage.getAll();
      var length = notes.length;
      var archived = [];

      for(var i=length-1;i>=0;i--){
        archived.push(notes[i]);
        notesStorage.archive(notes[i]);
      }

      $mdToast.show({
        controller: 'ArchivedAllToastCtrl',
        templateUrl: 'views/archived-all-toast.html',
        hideDelay: 6000,
        locals: {
          archivedNotes: archived
        }
      });
    };

    $scope.exitSettings = function () {
      $mdBottomSheet.hide();
    };

    $scope.authors = function(ev) {
      $mdBottomSheet.hide();
      $mdDialog.show({
        controller: 'AuthorsCtrl',
        templateUrl: 'views/authors.html',
        targetEvent: ev
      });
    };
  });
