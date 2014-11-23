'use strict';

/**
 * @ngdoc function
 * @name stickyNotesApp.controller:NotesCtrl
 * @description
 * # NotesCtrl
 * Controller of the stickyNotesApp
 */
angular.module('stickyNotesApp')
  .controller('NotesCtrl', function ($scope) {

    $scope.hello = "test";
    $scope.notes = [
      {
        text: "Note 1",
        position: {
          x: 50,
          y: 150
        }
      },
      {
        text: "Note 2",
        position: {
          x: 150,
          y: 50
        }
      }
    ];

    $scope.style = function (note) {
      return {
        left: note.position.x + 'px',
        top: note.position.y + 'px'
      };
    };
  });
