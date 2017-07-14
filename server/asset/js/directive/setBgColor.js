'use strict';

taskApp.directive('setBgColor', function () {
	return function ($scope, element, attrs) {
		$scope.$watch('baseAppBgColor', function (newVal, oldVal) {
			// if(newVal === oldVal || newVal === undefined) return;
			element.css('background', newVal);
		});
	};
});