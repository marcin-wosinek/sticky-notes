'use strict';

/**
 * @ngdoc service
 * @name stickyNotesApp.storage
 * @description
 * # storage
 * Service in the stickyNotesApp.
 * This service should be overriden to make sticky-notes talk to different
 * storage mechanizm.
 */
angular.module('stickyNotesApp')
  .service('storage', function($q) {

    var storage = localStorage;

    // Public API here
    return {
      /**
       * Saves new note. Method responsible for setting id for a note.
       * @return {promise} resolves with true, reject with error description
       */
      add: function(note) {
        return $q(function(resolve) {
          // I want to ensure that user will depend on promise to return id - in case in other
          // storage implementing other behaviour would be problematic
          var isolatedNote = angular.copy(note);

          // id generator
          isolatedNote.id = Math.random().toString(36).substring(7);

          storage[isolatedNote.id] = JSON.stringify(isolatedNote);

          resolve(isolatedNote.id);
        });
      },

      /**
       * Fetch all existing objects.
       * @return {promise} resolves with fetched data, reject with error description
       */
      getAll: function() {
        return $q(function(resolve) {
          var all = [];

          _.each(Object.keys(localStorage), function(id) {
            all.push(JSON.parse(storage[id]));
          });

          resolve(all);
        });
      },

      /**
       * Get object by id.
       * @return {promise} resolves with fetched data, reject with error description
       */
      get: function(id) {
        return $q(function(resolve) {
          resolve(JSON.parse(storage[id]));
        });
      },

      /**
       * Replace the object under the id.
       * @return {promise} resolves with true, reject with error description
       */
      set: function(id, note) {
        return $q(function(resolve) {
          storage[id] = JSON.stringify(note);
          resolve(true);
        });
      },

      /**
       * Remove object by id.
       * @return {promise} resolves with true, reject with error description
       */
      remove: function(id) {
        return $q(function(resolve) {
          delete storage[id];
          resolve(true);
        });
      }
    };
  });
