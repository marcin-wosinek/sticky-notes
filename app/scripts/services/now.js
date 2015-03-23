'use strict';

/**
 * @ngdoc service
 * @name stickyNotesApp.now
 * @description
 * Constant in the stickyNotesApp, that keeps now as a reference
 */
angular.module('stickyNotesApp')
  .factory('now', function() {
    return new Date();
  });
