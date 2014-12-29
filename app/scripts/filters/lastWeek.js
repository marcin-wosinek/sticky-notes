/**
 * Created by Grzegorz on 2014-12-28.
 */

angular.module('stickyNotesApp').filter('lastWeek', function () {
    return function(input){
      var day = new Date();
      var output = [];
      day.setDate(day.getDate()-2);
      var week = new Array(5);
      for(var i = 0; i<5; i++){
        week[i] = day.getFullYear()+'-'+ day.getMonth()+'-'+ day.getDate();
        day.setDate(day.getDate()-1);
      }
      input.forEach(function(item, index){
        if(week.indexOf(item.archivedDate.fullDate)!== -1 ){
          output.push(item);
        }
      });
      return output;
    }
});
