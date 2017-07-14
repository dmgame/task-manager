'use strict';

taskApp.filter('filterByMonth', [function () {
	return function (tasks) {
		var date = new Date(tasks[0].newDate);

		var options = {
			month: 'long'
		};

		return date.toLocaleString("ru", options).slice(0, 3);
	};
}]);