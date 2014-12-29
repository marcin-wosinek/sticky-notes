'use strict';

describe('Filter: today, yesterday, lastWeek, earlier', function () {

  // load the directive's module
  beforeEach(module('stickyNotesApp'));

  var day, week, filter,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  describe('should filter notes on archivedDate and returns:',function () {
    day = new Date();
    day.setDate(day.getDate());
    week = new Array(30);
    for(var i = 0; i<30; i++){
      week[i] = {};
      week[i].archivedDate = {fullDate: day.getFullYear()+'-'+ day.getMonth()+'-'+ day.getDate()};
      day.setDate(day.getDate()-i%2);
    }
    it('2 notes from today', inject(function(_$filter_){
       filter = _$filter_;
       expect(filter('today')(week).length).toBe(2);
      }));
    it('2 notes from yesterday', inject(function(_$filter_){
       filter = _$filter_;
       expect(filter('yesterday')(week).length).toBe(2);
      }));
    it('10 notes from last week', inject(function(_$filter_){
      filter = _$filter_;
      expect(filter('lastWeek')(week).length).toBe(7*2-2*2);
    }));
    it('16 notes from earlier', inject(function(_$filter_){
      filter = _$filter_;
      expect(filter('earlier')(week).length).toBe(30-(7*2));
    }));
  });
});
