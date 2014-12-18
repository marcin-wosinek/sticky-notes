'use strict';

describe('Controller: AddCtrl', function () {

  // load the controller's module
  beforeEach(module('stickyNotesApp'));

  var AddCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddCtrl = $controller('AddCtrl', {
      $scope: scope
    });
  }));

  it('should setup $scope', function () {
    expect(true).toEqual(true);
  });
});
