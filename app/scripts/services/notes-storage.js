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
      var that = this;

      this.add = function (note) {
        note.archived = false;

        return storage.add(note);
      };

      this.archive = function (id) {

        return this.get(id).then(function (note) {
          note.archived = true;
          note.archivedDate = new Date();
          return that.set(id, note);
        });
      };

      this.unarchive = function (id) {
        return this.get(id).then(function (note) {
          note.archived = false;
          note.archivedDate = undefined;
          return that.set(id, note);
        });
      };

      this.getArchived = function () {
        return this.getAll().then(function (notes) {
          return _.where(notes, {archived: true});
        });
      };

      this.getCurrent = function () {
        return this.getAll().then(function (notes) {
          return _.where(notes, {archived: false});
        });
      };
    };

    NotesStorage.prototype = storage;

    // Public API here
    return new NotesStorage();
  });
