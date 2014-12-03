angular.module('stickyNotesApp').directive('drag', function($document){
  'use strict';
  return {
    restrict: 'EA',
    replace: true,
    scope: {
      onDrag: '&',
      onDrop: '&',
      onMove: '&'
    },
    link: function(scope, element, attr) {
      var startX, startY, x, y;

      element.on('mousedown', function(event) {
        // Prevent default dragging of selected content
        event.preventDefault();

        startX = event.pageX;
        startY = event.pageY;
        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);

        scope.$apply(scope.onDrag());
      });

      function mousemove(event) {
        scope.$apply(function() {
          x = event.pageX - startX;
          y = event.pageY - startY;

          startX = event.pageX;
          startY = event.pageY;

          scope.onMove({deltaX: x, deltaY: y});
        });
      }

      function mouseup() {
        $document.unbind('mousemove', mousemove);
        $document.unbind('mouseup', mouseup);
        scope.$apply(scope.onDrop());
      }
    }
  };
});
