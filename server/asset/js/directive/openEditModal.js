'use strict';

taskApp.directive('openEditModal', function () {
	return function ($scope, element, attrs) {
		var overlay = angular.element(document.querySelector('.overlay'));
		var editTaskBlock = angular.element(document.querySelector('.edit-task'));

		element.on('click', function (e) {
			overlay.toggleClass('open');
			editTaskBlock.toggleClass('open');
		});
	};
});