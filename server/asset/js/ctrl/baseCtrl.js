'use strict';

var taskApp = angular.module('taskApp', ['ngAnimate']);

taskApp.run(function ($rootScope) {
	$rootScope._ = window._;
});

taskApp.controller('baseCtrl', ['$scope', '$http', '$window', function ($scope, $http, $window) {
	$scope.allTask = [];
	$scope.undoneTask = [];
	$scope.allTaskSort = {};
	$scope.undoneTaskSort = {};

	$scope.curentDate = +new Date();

	$scope.activeTab = 'activeTask';
	$scope.editTask = {
		date: '',
		time: '',
		taskText: '',
		id: ''
	};
	$scope.hidePreload = false;

	$scope.activeColor = '';
	$scope.colorPalitra = ['#ff5201', '#ffbb00', '#7cbb00', '#00a2f4'];
	$scope.baseAppBgColor = localStorage.appBgColor || '#00a2f4';

	function createObjSortTask(arr) {
		var obj = {};
		for (var i = 0, len = arr.length; i < len; i++) {
			arr[i].newDate = Date.parse(arr[i].date);

			if (obj[arr[i].date]) {
				obj[arr[i].date].push(arr[i]);
			} else {
				obj[arr[i].date] = [];
				obj[arr[i].date].push(arr[i]);
			}
		}
		return obj;
	}

	function checkToken() {
		return new Promise(function (resolve, reject) {
			if (localStorage.id || sessionStorage.id) {
				$http({
					method: 'POST',
					url: 'http://localhost:8080/allTasks'
				}).then(resolve, reject);
			}
		});
	};

	checkToken().then(function (res) {

		$scope.allTask = _.sortBy(res.data, ['date']);

		$scope.undoneTask = _.filter($scope.allTask, function (task) {
			return task.status === 'undone';
		});

		$scope.allTaskSort = createObjSortTask($scope.allTask);
		$scope.undoneTaskSort = createObjSortTask($scope.undoneTask);

		console.log($scope.allTaskSort);
		console.log($scope.undoneTaskSort);

		$scope.hidePreload = true;
		$scope.$digest();
	}).catch(function (error) {
		console.error('Токена нет');
	});

	$scope.editTaskModal = function (task) {
		$scope.editTask.date = task.date;
		$scope.editTask.time = task.time;
		$scope.editTask.taskText = task.taskText;
		$scope.editTask.id = task._id;
		console.log($scope.editTask);
	};

	$scope.changeColor = function (color) {
		$scope.baseAppBgColor = color;
		localStorage.appBgColor = color;
		console.log($scope.baseAppBgColor);
	};

	$scope.logout = function () {
		localStorage.removeItem('id');
		localStorage.removeItem('appBgColor');
		window.location = '/login';
	};
}]);