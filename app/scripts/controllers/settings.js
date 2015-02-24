'use strict';

/**
 * @ngdoc function
 * @name stickyNotesApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the stickyNotesApp
 */
angular.module('stickyNotesApp')
  .controller('SettingsCtrl', function ($scope, $route, $mdBottomSheet, $mdDialog, $mdToast, notesStorage, notes) {
    $scope.archiveAll = function () {
      var currentNotes = notes,
        length = currentNotes.length,
        archived = [];

      for (var i = length - 1; i >= 0;i--) {
        // to make sure that we forgot all metadata
        archived.push(angular.copy(currentNotes[i]));
        notesStorage.archive(currentNotes[i].id);
      }

      $route.reload();

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

    $scope.authors = function (ev) {
      $mdBottomSheet.hide();
      $mdDialog.show({
        controller: 'AuthorsCtrl',
        templateUrl: 'views/authors.html',
        targetEvent: ev
      });
    };
  });
