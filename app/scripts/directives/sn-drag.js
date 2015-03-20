'use strict';

/**
 * @ngdoc directive
 * @name stickyNotesApp.directive:snDimensions
 * @description
 * # snDrag
 * Directive that allows element to react on drag&drop gesture of the mouse.
 *
 * ## Event binding
 * There are two attributes to connecto to events:
 * * onDrop - when the element is released
 * * onMove - when the element is moved. For those expression, *deltaX* & *deltaY* are available
 * with move vector values.
 * ## Usage example
 * <pre>
 *   <div sn-drag on-drop="droppedCallback()" on-move="draggedBy(deltaX, deltaY)">
 * </pre>
 */
angular.module('stickyNotesApp').directive('snDrag', function($document, $parse) {

  return {
    restrict: 'EA',
    replace: true,
    link: function(scope, element, attrs) {
      var startX, startY, x, y;

      var onDrag = $parse(attrs.onDrag),
        onDrop = $parse(attrs.onDrop),
        onMove = $parse(attrs.onMove);

      element.on('mousedown', function(event) {
        // Prevent default dragging of selected content
        event.preventDefault();

        startX = event.pageX;
        startY = event.pageY;
        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);

        scope.$apply(function() {
          onDrag(scope);
        });
      });

      function mousemove(event) {
        scope.$apply(function() {
          x = event.pageX - startX;
          y = event.pageY - startY;

          startX = event.pageX;
          startY = event.pageY;

          onMove(scope, {deltaX: x, deltaY: y});
        });
      }

      function mouseup() {
        $document.unbind('mousemove', mousemove);
        $document.unbind('mouseup', mouseup);
        scope.$apply(function() {
          onDrop(scope);
        });
      }
    }
  };
});
