'use strict';

/**
 * @ngdoc directive
 * @name stickyNotesApp.directive:snDimensions
 * @description
 * # snDimensions
 */
angular.module('stickyNotesApp')
  .directive('snDimensions', function ($window, $parse, $timeout) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        var parsedSnDimensions = $parse(attrs.snDimensions);

        function setDimensions() {
          parsedSnDimensions.assign(scope, {
            x: element[0].offsetWidth,
            y: element[0].offsetHeight
          });
        }

        // read link-time size
        setDimensions();

        // force reading after digest cycle
        $timeout(setDimensions, 0);

        $window.onresize = function() {
          scope.$apply(setDimensions);
        };

        scope.$on('snResize', setDimensions);
      }
    };
  });
