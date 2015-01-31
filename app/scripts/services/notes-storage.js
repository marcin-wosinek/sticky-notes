'use strict';

/**
 * @ngdoc service
 * @name stickyNotesApp.notesStorage
 * @description
 * # notesStorage
 * Factory in the stickyNotesApp.
 */
angular.module('stickyNotesApp')
  .factory('notesStorage', function (storage) {

    var NotesStorage = function () {
      this.add = function (note) {
        note.archived = false;
        storage.add(note);
      };
      this.archive = function (id) {
        var note = this.get(id),
          today = new Date();

        note.archived = true;
        note.archivedDate = {
            dd: today.getDate(),
            mm: today.getMonth(),
            yyyy: today.getFullYear(),
            time: today.getTime(),
            fullDate: today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate()
        };

        this.set(id, note);
      };
      this.getArchived = function () {
        var notes = this.getAll();

        return _.where(notes, {archived: true});
      };
      this.getCurrent = function () {
        var notes = this.getAll();

        return _.where(notes, {archived: false});
      };
    };

    NotesStorage.prototype = storage;

    // Public API here
    return new NotesStorage();
  });
