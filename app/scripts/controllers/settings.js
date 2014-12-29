'use strict';

/**
 * @ngdoc function
 * @name stickyNotesApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the stickyNotesApp
 */
angular.module('stickyNotesApp')
  .controller('SettingsCtrl', function ($scope, $mdBottomSheet, $mdDialog) {
    $scope.cleanBoard = function () {
      // TODO implement cleaning board
    };

    $scope.exitSettings = function () {
      $mdBottomSheet.hide();
    };

    $scope.authors = function(ev) {
      $mdBottomSheet.hide();
      console.log(ev)
      $mdDialog.show({
        controller: 'AuthorsCtrl',
        templateUrl: 'views/authors.html',
        targetEvent: ev
      })
    };
  });
