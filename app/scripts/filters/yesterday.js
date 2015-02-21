'use strict';

angular.module('stickyNotesApp').filter('yesterday', function () {
  return function (input) {
    var yesterday = new Date(),
      output = [],
      date = '';

    yesterday.setDate(yesterday.getDate() - 1);

    date =  yesterday.getFullYear() + '-' + yesterday.getMonth() + '-' + yesterday.getDate();

    input.forEach(function (item) {
      if (item.archivedDate.fullDate === date) {
        output.push(item);
      }
    });
    return output;
  };
});
