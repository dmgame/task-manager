'use strict';

taskApp.directive('saveUserColor', ['$window', function ($window) {
	return function ($scope, element, attrs) {
		var saveColorBlock = angular.element(document.querySelector('.saveColor'));

		element.on('click', function (e) {});
	};
}]);