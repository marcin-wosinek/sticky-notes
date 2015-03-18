'use strict';

/**
 * @ngdoc function
 * @name stickyNotesApp.controller:AuthorsCtrl
 * @description
 * # AuthorsCtrl
 * Controller of authors dialog window
 */
angular.module('stickyNotesApp')
  .controller('AuthorsCtrl', function($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };
  });
