'use strict';

var taskApp = angular.module('taskApp', []);

taskApp.run(function ($rootScope) {
	$rootScope._ = window._;
});

taskApp.controller('baseCtrl', ['$scope', '$http', function ($scope, $http) {
	$scope.allTasks = [];
	$scope.currentTasks = [];

	$scope.currentDate = '2017-02-09';
	$scope.currentFullDate = '2017-02-09T13:10';

	function checkLogin() {
		return new Promise(function (resolve, reject) {
			if (localStorage._id || sessionStorage._id) {
				$http({
					method: 'POST',
					url: 'http://localhost:8080/allTasks'
				}).then(resolve, reject);
			}
		});
	}

	checkLogin().then(function (res) {
		$scope.allTasks = _.sortBy(res.data, ['date']);
		$scope.currentTasks = _.filter($scope.allTasks, function (task) {
			return task.date === $scope.currentDate;
		});
		$scope.$digest();
	}).catch(function (error) {
		console.error('No token');
	});
}]);