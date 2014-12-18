'use strict';

describe('Controller: RemovedToastCtrl', function () {

  // load the controller's module
  beforeEach(module('stickyNotesApp'));

  var RemovedToastCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RemovedToastCtrl = $controller('RemovedToastCtrl', {
      $scope: scope
    });
  }));

  xit('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
