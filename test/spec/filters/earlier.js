'use strict';

describe('Filter: yesterday', function() {
  // load the filter's module
  beforeEach(module('stickyNotesApp'));
  // initialize a new instance of the filter before each test
  var earlier,
    now = new Date('2015-03-15T00:00:00.000Z'),
    yesterday = new Date('2015-03-14T00:00:00.000Z'),
    beforeYesterday = new Date('2015-03-13T00:00:00.000Z'),
    tomorrow = new Date('2015-03-16T00:00:00.000Z');

  beforeEach(function() {
    module(function($provide) {
      $provide.value('now', now);
    });
  });

  beforeEach(inject(function($filter) {
    earlier = $filter('earlier');
  }));

  it('should return the input if is not array', function() {
    var text = 'angularjs',
      object = {lorem: 1},
      number = 42;

    expect(earlier(text)).toBe(text);
    expect(earlier(object)).toBe(object);
    expect(earlier(number)).toBe(number);
  });

  it('should remove other dates form list', function() {
    var input = [beforeYesterday, yesterday, now, tomorrow];

    expect(earlier(input)).toEqual([beforeYesterday]);
  });

  it('should remove other dates form list by key', function() {
    var input = [{date: beforeYesterday}, {date: yesterday}, {date: now}, {date: tomorrow}];

    expect(earlier(input, 'date')).toEqual([{date: beforeYesterday}]);
  });
});
