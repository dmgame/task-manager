'use strict';

taskApp.directive('openUserColor', function () {
	return function ($scope, element, attrs) {
		var userColorBlock = angular.element(document.querySelector('.user-color-block'));

		element.on('click', function (e) {
			userColorBlock.toggleClass('open');
		});
	};
});