'use strict';

/**
 * @ngdoc filter
 * @name stickyNotesApp.filter:today
 * @description
 * Filter that pass through only today's dates
 */
angular.module('stickyNotesApp').filter('today', function (now) {
  return function (input, key) {
    var output = [],
      momentNow = moment(now);

    if (!angular.isArray(input)) {
      return input;
    }

    var getDate = key ? function (entity) {
      return entity[key];
    } : function (entity) {
      return entity;
    };

    input.forEach(function (item) {
      if (momentNow.isSame(getDate(item), 'day')) {
        output.push(item);
      }
    });

    return output;
  };
});
