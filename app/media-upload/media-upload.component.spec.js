'use strict';

describe('mediaUpload', function() {

	beforeEach(module('mediaUpload'));

	describe('MediaUploadController', function() {

		var element, scope, ctrl;

		beforeEach(inject(function($componentController, $rootScope, $compile) {
			scope = $rootScope.$new();
			element = angular.element('<media-upload></media-upload>');
			element = $compile(element)(scope);

			ctrl = $componentController('mediaUpload', {'$element': element});
		}));

		it('should initialize default values', function() {
			expect(ctrl.uploadInProgress).toBeFalsy();
			expect(ctrl.hash).toBeFalsy();
			expect(ctrl.dataSubmit).toBeNull();
		});
	});

});
