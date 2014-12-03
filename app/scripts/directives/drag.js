angular.module('stickyNotesApp').directive('drag', function($document){
  'use strict';
  return {
    restrict: 'EA',
    replace: true,
    scope: {
      onDrag: '&',
      onDrop: '&'
    },
    link: function(scope, element, attr) {
      // variable representing board where sticky notes can be put
      // disable drag when user is trying to put them outside of board
      var boardElement = angular.element(document.getElementsByClassName('board'));

      var board = (function(){
        var b = boardElement[0];
        var x1 = b.offsetLeft, y1 = b.offsetTop;
        return {
          x1: x1,
          y1: y1,
          width: b.offsetWidth,
          height: b.offsetHeight,
          x2: x1 + b.offsetWidth,
          y2: y1 + b.offsetHeight
        }
      })();

      var note = {
        x: element[0].offsetLeft,
        y: element[0].offsetTop,
        width: element[0].offsetWidth,
        height: element[0].offsetHeight
      };

      var startX = 0, startY = 0, x = note.x || 0, y = note.y || 0;

      element.on('mousedown', function(event) {
        // Prevent default dragging of selected content
        event.preventDefault();

        startX = event.pageX - (element.css('left').replace('px','') || note.x);
        startY = event.pageY - (element.css('top').replace('px','') || note.y);
        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);

        scope.$apply(scope.onDrag());
      });

      function mousemove(event) {
          y = event.pageY - startY;
          x = event.pageX - startX;
        if((x>=board.x1 && x<=board.x2-note.width)&&(y>=board.y1 && y<=board.y2-note.height)) {
          element.css({
            top: y + 'px',
            left: x + 'px'
          });
        }
      }

      function mouseup() {
        $document.unbind('mousemove', mousemove);
        $document.unbind('mouseup', mouseup);
        scope.$apply(scope.onDrop());
      }
    }
  };
});
