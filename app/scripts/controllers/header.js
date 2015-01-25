'use strict';

/**
 * @ngdoc function
 * @name stickyNotesApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the stickyNotesApp
 */
angular.module('stickyNotesApp')
  .controller('HeaderCtrl', function ($scope, $mdBottomSheet) {
    $scope.openSettings = function () {
      $mdBottomSheet.show({
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl'
      }).then(function () {
        $scope.alert = 'You are back!';
      });
    };
  });
