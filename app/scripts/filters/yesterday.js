/**
 * Created by Grzegorz on 2014-12-28.
 */

angular.module('stickyNotesApp').filter('yesterday', function () {
    return function(input){
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        var date =  yesterday.getFullYear()+'-'+ yesterday.getMonth()+'-'+ yesterday.getDate();
        input.forEach(function(item, index){
            if(item.archivedDate.fullDate !== date ){
                input.splice(index,1);
            }
        });
        return input;
    }
});