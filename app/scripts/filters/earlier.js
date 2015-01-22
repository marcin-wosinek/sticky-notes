'use strict';

angular.module('stickyNotesApp').filter('earlier', function () {
  return function (input) {
    var day = new Date(),
      output = [],
      week = new Array(7);

    day.setDate(day.getDate());

    for(var i = 0; i < 7; i++){
      week[i] = day.getFullYear() + '-' + day.getMonth() + '-' + day.getDate();
      day.setDate(day.getDate() - 1);
    }

    input.forEach(function(item){
      if(week.indexOf(item.archivedDate.fullDate) === -1 ){
        output.push(item);
      }
    });

    return output;
  };
});
