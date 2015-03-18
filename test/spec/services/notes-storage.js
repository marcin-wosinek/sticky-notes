'use strict';

describe('Service: notesStorage', function() {

  // load the service's module
  beforeEach(module('stickyNotesApp'));

  // instantiate service
  var notesStorage;
  beforeEach(inject(function(_notesStorage_) {
    notesStorage = _notesStorage_;
  }));

  it('should do something', function() {
    expect(!!notesStorage).toBe(true);
  });

});
