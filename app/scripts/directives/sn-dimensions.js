'use strict';

/**
 * @ngdoc directive
 * @name stickyNotesApp.directive:snDimensions
 * @description
 * # snDimensions
 *
 * Directive that reads element width and height and expose it to the model. Keeping model up to
 * date with actual size is a chalenge because js lacks event for resizing the element. We check
 * the size at 4 different moments.
 */
angular.module('stickyNotesApp')
  .directive('snDimensions', function($window, $parse, $timeout, dimensionDelay) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {

        // We parse value set to sn-dimensions attribute
        var parsedSnDimensions = $parse(attrs.snDimensions);

        // function that update scope with expected values
        function setDimensions() {
          parsedSnDimensions.assign(scope, {
            x: element[0].offsetWidth,
            y: element[0].offsetHeight
          });
        }

        // We read element size *before compiling & binding* elements inslide it. Due to angular
        // architecture we don't have posibility to wait for the internal element - directive
        // priorities are compared *at the same element*.
        setDimensions();

        // Timeout with 0 will run function *after current* digest cycle - ie when all values
        // are bind to their location.
        $timeout(setDimensions, dimensionDelay);

        // When window is resized, we check the size again
        $window.onresize = function() {
          scope.$apply(setDimensions);
        };

        // We allow controller to comunicate that it have done something that can affect the size.
        scope.$on('snResize', setDimensions);
      }
    };
  });
