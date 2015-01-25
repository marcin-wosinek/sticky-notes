'use strict';

angular.module('stickyNotesApp').filter('yesterday', function () {
  return function (input) {
    var yesterday = new Date(),
      output = [],
      date =  yesterday.getFullYear() + '-' + yesterday.getMonth() + '-' + yesterday.getDate();

    yesterday.setDate(yesterday.getDate() - 1);
    input.forEach(function (item) {
      if (item.archivedDate.fullDate === date) {
        output.push(item);
      }
    });
    return output;
  };
});
