'use strict';

angular.module('stickyNotesApp').filter('today', function () {
  return function(input){
    var today = new Date(),
      output = [],
      date =  today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate();

    input.forEach(function (item){
      if(item.archivedDate.fullDate === date ){
        output.push(item);
      }
    });

    return output;
  };
});
