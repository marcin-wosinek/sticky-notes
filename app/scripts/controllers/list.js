'use strict';

/**
 * @ngdoc function
 * @name stickyNotesApp.controller:ListCtrl
 * @description
 * # ListCtrl
 * Controller of the stickyNotesApp
 */
angular.module('stickyNotesApp')
  .controller('ListCtrl', function(notes, archived) {
    this.notes = notes;
    this.archived = archived;
  });
