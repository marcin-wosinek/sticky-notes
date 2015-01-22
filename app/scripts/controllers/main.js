'use strict';

/**
 * @ngdoc function
 * @name stickyNotesApp.controller:MainctrlCtrl
 * @description
 * # MainctrlCtrl
 * Controller of the stickyNotesApp
 */
angular.module('stickyNotesApp')
  .controller('MainCtrl', function ($scope, $route, $timeout, $location, dimensionDelay) {
    $scope.location = function(args){
        var locationArray = $location.$$path.split('/'),
            location = locationArray[locationArray.length-1];
        if(typeof args === 'object'){
            return args.indexOf(location) !== -1;
        }
        else{
            return args === location;
        }
    };
    var setRoute = function () {
      $scope.route = $route.current.loadedTemplateUrl.match('\/(.*)\.html')[1];
      $timeout(function () {
        $scope.$broadcast('snResize');
      }, dimensionDelay);
    };

    $scope.$on('$routeChangeStart', function () {
      $scope.route = '';
    });

    $scope.$on('$routeChangeError', function () {
      setRoute();
    });

    $scope.$on('$routeChangeSuccess', function () {
      setRoute();
    });
  });
