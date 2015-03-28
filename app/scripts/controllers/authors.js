'use strict';

/**
 * @ngdoc function
 * @name stickyNotesApp.controller:AuthorsCtrl
 * @description
 * # AuthorsCtrl
 * Controller of authors dialog window
 */
angular.module('stickyNotesApp')
  .controller('AuthorsCtrl', function($mdDialog) {
    this.hide = function() {
      $mdDialog.hide();
    };
  });
