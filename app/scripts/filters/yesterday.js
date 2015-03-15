'use strict';

/**
 * @ngdoc filter
 * @name stickyNotesApp.filter:yesterday
 * @description
 * Filter that pass through only yesterday's dates
 */
angular.module('stickyNotesApp').filter('yesterday', function (now) {
  return function (input, key) {
    var output = [],
      momentYesterday = moment(now).subtract(1, 'days');

    if (!angular.isArray(input)) {
      return input;
    }

    var getDate = key ? function (entity) {
      return entity[key];
    } : function (entity) {
      return entity;
    };

    input.forEach(function (item) {
      if (momentYesterday.isSame(getDate(item), 'day')) {
        output.push(item);
      }
    });

    return output;
  };
});
