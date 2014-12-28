/**
 * Created by Grzegorz on 2014-12-28.
 */

angular.module('stickyNotesApp').filter('lastWeek', function () {
    return function(input){
        var day = new Date();
        var week = new Array(5);
        for(var i = 0; i<5; i++){
            day.setDate(day.getDate()-(i+2));
            week[i] =  day.getFullYear()+'-'+ day.getMonth()+'-'+ day.getDate();
        }
        input.forEach(function(item, index){
            if(week.indexOf(item) ){
                input.splice(index,1);
            }
        });
        return input;
    }
});