'use strict';

/**
 * @ngdoc function
 * @name stickyNotesApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the stickyNotesApp
 */
angular.module('stickyNotesApp')
  .controller('SettingsCtrl', function ($scope, $mdBottomSheet) {
    $scope.cleanBoard = function () {
      // TODO implement cleaning board
    };

    $scope.exitSettings = function () {
      $mdBottomSheet.hide();
    };
  });
