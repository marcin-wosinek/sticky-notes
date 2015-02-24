'use strict';

/**
 * @ngdoc function
 * @name stickyNotesApp.controller:ListCtrl
 * @description
 * # ListCtrl
 * Controller of the stickyNotesApp
 */
angular.module('stickyNotesApp')
  .controller('ListCtrl', function ($scope, notes, archived) {
    $scope.notes = notes;
    $scope.archived = archived;
  });
