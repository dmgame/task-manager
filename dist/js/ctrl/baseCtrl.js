const taskApp = angular.module('taskApp', ['ngAnimate']);

taskApp.run(function ($rootScope) {
	$rootScope._ = window._;
});

taskApp.controller('baseCtrl', ['$scope', '$http', '$window', function ($scope, $http, $window) {
	$scope.allTasks = [];
	$scope.currentTasks = [];
	$scope.activeTab = 'activeTask';
	$scope.editTask = {
		date: '',
		time: '',
		taskText: '',
		id: ''
	};
	
	$scope.hidePreload = false;
	
	let savedGeneralStyle = $window.localStorage.getItem('generalStyle');
	
	if (savedGeneralStyle) {
		$scope.generalStyle = JSON.parse(savedGeneralStyle);
		let style = `<style>.all-task-wrap::before{border-color:${$scope.generalStyle['border-color']}}</style>`;
		angular.element("head").append(style);
	} else {
		$scope.generalStyle = {
			'background-color': '#00a2f4',
			'color': '#00a2f4',
			'border-color': '#00a2f4'
		};
	}
	
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
		})
	}
	
	checkLogin()
		.then(function(res) {
			$scope.allTasks = _.sortBy(res.data, ['date']);
			$scope.currentTasks = _.filter($scope.allTasks, function (task) {
				return task.date === $scope.currentDate;
			});
			$scope.hidePreload = true;
			$scope.$digest();
		})
		.catch(function(error) {
			console.error('No token');
		});
  
	$scope.editTaskModal = function(task) {
		$scope.editTask.date = task.date;
		$scope.editTask.time = task.time;
		$scope.editTask.taskText = task.taskText;
		$scope.editTask.id = task._id;
	};
}]);