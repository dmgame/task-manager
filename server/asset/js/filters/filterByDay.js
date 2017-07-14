'use strict';

taskApp.filter('filterByDay', [function () {
	return function (tasks) {
		var date = new Date(tasks[0].newDate);

		var options = {
			day: 'numeric'
		};

		return date.toLocaleString("ru", options);
	};
}]);