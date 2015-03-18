'use strict';

describe('Filter: today', function() {
  // load the filter's module
  beforeEach(module('stickyNotesApp'));
  // initialize a new instance of the filter before each test
  var today,
    now = new Date('2015-03-15T00:00:00.000Z'),
    yesterday = new Date('2015-03-14T00:00:00.000Z'),
    tomorrow = new Date('2015-03-16T00:00:00.000Z');

  beforeEach(function() {
    module(function($provide) {
      $provide.value('now', now);
    });
  });

  beforeEach(inject(function($filter) {
    today = $filter('today');
  }));

  it('should return the input if is not array', function() {
    var text = 'angularjs',
      object = {lorem: 1},
      number = 42;

    expect(today(text)).toBe(text);
    expect(today(object)).toBe(object);
    expect(today(number)).toBe(number);
  });

  it('should remove other dates form list', function() {
    var input = [yesterday, now, tomorrow];

    expect(today(input)).toEqual([now]);
  });

  it('should remove other dates form list by key', function() {
    var input = [{date: yesterday}, {date: now}, {date: tomorrow}];

    expect(today(input, 'date')).toEqual([{date: now}]);
  });
});
