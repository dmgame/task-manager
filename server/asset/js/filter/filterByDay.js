'use strict';

taskApp.filter('filterByDay', [function () {
	return function (oneDate) {
		console.log(oneDate);
	};
}]);