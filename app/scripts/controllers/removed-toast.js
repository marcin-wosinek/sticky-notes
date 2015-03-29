'use strict';

/**
 * @ngdoc function
 * @name stickyNotesApp.controller:RemovedToastCtrl
 * @description
 * # RemovedToastCtrl
 * Controller of the stickyNotesApp
 */
angular.module('stickyNotesApp')
  .controller('RemovedToastCtrl', function($mdToast, $route, notesStorage, removedNote) {
    this.restore = function() {
      notesStorage.add(removedNote);
      $mdToast.hide();

      $route.reload();
    };
  });
