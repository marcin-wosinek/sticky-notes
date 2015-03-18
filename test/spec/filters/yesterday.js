'use strict';

describe('Filter: yesterday', function() {
  // load the filter's module
  beforeEach(module('stickyNotesApp'));
  // initialize a new instance of the filter before each test
  var yesterdayFilter,
    now = new Date('2015-03-15T00:00:00.000Z'),
    yesterday = new Date('2015-03-14T00:00:00.000Z'),
    tomorrow = new Date('2015-03-16T00:00:00.000Z');

  beforeEach(function() {
    module(function($provide) {
      $provide.value('now', now);
    });
  });

  beforeEach(inject(function($filter) {
    yesterdayFilter = $filter('yesterday');
  }));

  it('should return the input if is not array', function() {
    var text = 'angularjs',
      object = {lorem: 1},
      number = 42;

    expect(yesterdayFilter(text)).toBe(text);
    expect(yesterdayFilter(object)).toBe(object);
    expect(yesterdayFilter(number)).toBe(number);
  });

  it('should remove other dates form list', function() {
    var input = [yesterday, now, tomorrow];

    expect(yesterdayFilter(input)).toEqual([yesterday]);
  });

  it('should remove other dates form list by key', function() {
    var input = [{date: yesterday}, {date: now}, {date: tomorrow}];

    expect(yesterdayFilter(input, 'date')).toEqual([{date: yesterday}]);
  });
});
