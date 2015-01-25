angular.module('stickyNotesApp').directive('drag', function ($document, $parse) {
  'use strict';

  return {
    restrict: 'EA',
    replace: true,
    link: function (scope, element, attrs) {
      var startX, startY, x, y;

      var onDrag = $parse(attrs.onDrag),
        onDrop = $parse(attrs.onDrop),
        onMove = $parse(attrs.onMove);

      element.on('mousedown', function (event) {
        // Prevent default dragging of selected content
        event.preventDefault();

        startX = event.pageX;
        startY = event.pageY;
        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);

        scope.$apply(function () {
          onDrag(scope);
        });
      });

      function mousemove (event) {
        scope.$apply(function () {
          x = event.pageX - startX;
          y = event.pageY - startY;

          startX = event.pageX;
          startY = event.pageY;

          onMove(scope, {deltaX: x, deltaY: y});
        });
      }

      function mouseup () {
        $document.unbind('mousemove', mousemove);
        $document.unbind('mouseup', mouseup);
        scope.$apply(function () {
          onDrop(scope);
        });
      }
    }
  };
});
