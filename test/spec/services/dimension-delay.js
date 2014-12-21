'use strict';

describe('Service: dimensionDelay', function () {

  // load the service's module
  beforeEach(module('stickyNotesApp'));

  // instantiate service
  var dimensionDelay;
  beforeEach(inject(function (_dimensionDelay_) {
    dimensionDelay = _dimensionDelay_;
  }));

  it('should do something', function () {
    expect(!!dimensionDelay).toBe(true);
  });

});
