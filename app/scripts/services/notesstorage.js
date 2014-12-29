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
      notes: [],
      archived: []
    });

    // Public API here
    return {
      add: function (note) {
        storage.notes.push(note);
      },
        //TODO: change name to getCurrentNotes or something alike
      getAll: function () {
        return storage.notes;
      },
      get: function(id){
        return storage.notes[id];
      },
      set: function(id, note){
        storage.notes[id] = note;
      },
      remove: function(note){
        var index = storage.notes.indexOf(note);
        if (index > -1) {
          storage.notes.splice(index, 1);
        }
      },
      archive: function(note){
        var today = new Date();
        note.archivedDate = {
            dd : today.getDate(),
            mm : today.getMonth(),
            yyyy : today.getFullYear(),
            time: today.getTime(),
            fullDate :  today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate()
        };
        storage.archived.push(note);
        this.remove(note);
      },
      removeFromArchived: function(note){
        var index = storage.archived.indexOf(note);
        if (index > -1) {
          storage.archived.splice(index, 1);
        }
      },
      getArchivedNotes: function(){
        return storage.archived;
      }
    };
  });
