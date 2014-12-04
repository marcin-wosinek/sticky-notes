'use strict';

/**
 * @ngdoc service
 * @name stickyNotesApp.notesStorage
 * @description
 * # notesStorage
 * Factory in the stickyNotesApp.
 */
angular.module('stickyNotesApp')
  .factory('notesStorage', function ($localStorage) {
    var storage = $localStorage.$default({
      notes: []
    });

    // Public API here
    return {
      add: function (note) {
        storage.notes.push(note);
      },
      getAll: function () {
        return storage.notes;
      },
      get: function(id){
        return storage.notes[id];
      },
      set: function(id, note){
        storage.notes[id] = note;
      }
    };
  });
