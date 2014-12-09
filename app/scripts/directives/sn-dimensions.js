'use strict';

/**
 * @ngdoc directive
 * @name stickyNotesApp.directive:snDimensions
 * @description
 * # snDimensions
 */
angular.module('stickyNotesApp')
  .directive('snDimensions', function ($window) {
    return {
      restrict: 'A',
      scope: {
        snDimensions: '='
      },
      link: function postLink(scope, element, attrs) {
        function setDimensions() {
          scope.snDimensions.x = element[0].clientWidth;
          scope.snDimensions.y = element[0].clientHeight;
        }

        scope.snDimensions = {
        };

        setDimensions();

        $window.onresize = function() {
          scope.$apply(setDimensions);
        };

        scope.$on('snResize', setDimensions);
      }
    };
  });
