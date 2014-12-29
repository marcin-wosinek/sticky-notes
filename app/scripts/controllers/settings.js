'use strict';

/**
 * @ngdoc function
 * @name stickyNotesApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the stickyNotesApp
 */
angular.module('stickyNotesApp')
  .controller('SettingsCtrl', function ($scope, $mdBottomSheet, $mdDialog,notesStorage) {
    $scope.archiveAll = function () {
      var notes = notesStorage.getAll();
      var length = notes.length;
      for(var i=length-1;i>=0;i--){
        notesStorage.archive(notes[i])
      }
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
      })
    };
  });
