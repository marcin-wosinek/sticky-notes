'use strict';

/**
 * @ngdoc function
 * @name stickyNotesApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the stickyNotesApp
 */
angular.module('stickyNotesApp')
  .controller('HeaderCtrl', function ($mdBottomSheet, notesStorage) {
    this.openSettings = function () {
      $mdBottomSheet.show({
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl',
        resolve: {
          notes: function () {
            return notesStorage.getCurrent();
          }
        }
      });
    };
  });
