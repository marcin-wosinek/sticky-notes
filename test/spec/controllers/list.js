'use strict';

describe('Controller: ListCtrl', function() {

  // load the controller's module
  beforeEach(module('stickyNotesApp'));

  var ListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    ListCtrl = $controller('ListCtrl', {
      $scope: scope
    });
  }));

  xit('should attach a list of awesomeThings to the scope', function() {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
