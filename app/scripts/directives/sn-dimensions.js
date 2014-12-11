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
      priority: -1,
      link: function postLink(scope, element, attrs) {
        var parsedSnDimensions = $parse(attrs.snDimensions);

        function setDimensions() {
          console.log(1);
          parsedSnDimensions.assign(scope, {
            x: element[0].offsetWidth,
            y: element[0].offsetHeight
          });
        }

        setDimensions();

        $timeout(setDimensions, 100);

        $window.onresize = function() {
          scope.$apply(setDimensions);
        };

        scope.$on('snResize', setDimensions);
      }
    };
  });
