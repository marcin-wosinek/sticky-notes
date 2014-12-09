'use strict';

describe('Directive: snDimensions', function () {

  // load the directive's module
  beforeEach(module('stickyNotesApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<sn-dimensions></sn-dimensions>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the snDimensions directive');
  }));
});
