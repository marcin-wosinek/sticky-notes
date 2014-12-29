/**
 * Created by Grzegorz on 2014-12-28.
 */


angular.module('stickyNotesApp').filter('today', function () {
    return function(input){
      var today = new Date();
      var output = [];
      var date =  today.getFullYear()+'-'+today.getMonth()+'-'+today.getDate();
      input.forEach(function(item, index){
          if(item.archivedDate.fullDate === date ){
            output.push(item);
          }
      });
      return output;
    }
});
