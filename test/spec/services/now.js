'use strict';

describe('Service: now', function() {

  // load the service's module
  beforeEach(module('stickyNotesApp'));

  // instantiate service
  var now;
  beforeEach(inject(function(_now_) {
    now = _now_;
  }));

  it('should do something', function() {
    expect(!!now).toBe(true);
  });

});
