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
  .service('storage', function () {

    var storage = localStorage;

    // Public API here
    return {
      // TODO: rewrite to be promise based
      /**
       * Saves new note. Method responsible for setting id for a note.
       */
      add: function (note) {
        // id generator
        note.id = Math.random().toString(36).substring(7);

        storage[note.id] = JSON.stringify(note);
      },
      // TODO: rewrite to be promise based
      /**
       * Fetch all existing objects.
       */
      getAll: function () {
        var all = [],
          that = this;

        _.each(Object.keys(localStorage), function (id) {
          all.push(that.get(id));
        });

        return all;
      },
      // TODO: rewrite to be promise based
      /**
       * Get object by id.
       */
      get: function (id) {
        return JSON.parse(storage[id]);
      },
      // TODO: rewrite to be promise based
      /**
       * Replace the object under the id.
       */
      set: function (id, note) {
        storage[id] = JSON.stringify(note);
      },
      // TODO: rewrite to be promise based
      /**
       * Remove object by id.
       */
      remove: function (id) {
        delete storage[id];
      }
    };
  });
