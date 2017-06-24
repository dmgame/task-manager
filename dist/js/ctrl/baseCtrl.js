var taskApp = angular.module('taskApp', []);

taskApp.run(function ($rootScope) {
	$rootScope._ = window._;
});

taskApp.controller('baseCtrl', ['$scope','$http', function ($scope, $http) {
	$scope.allTask = [];
	$scope.undoneTask = [];
	$scope.sortDate = {};

	$scope.nowDate = new Date();
	$scope.nowFormatDate = $scope.nowDate.toISOString();
	

	function checkToken() {
		return new Promise(function (resolve, reject) {
			if(localStorage.id || sessionStorage.id){
				$http({
					method:'POST',
					url:'http://localhost:8080/allTasks'
				}).then(resolve, reject);
			}
		});
	};

	checkToken()
		.then(function (res){
			
			for (var i = 0; i < res.data.length; i++) {
				var key = res.data[i].date;
				if($scope.sortDate[key]){
					$scope.sortDate[key].push(res.data[i]);
				} else {
					$scope.sortDate[key] = [];
					$scope.sortDate[key].push(res.data[i]);
				}	
			}
			
			
			$scope.sortPropName = [];
			for (var key in $scope.sortDate){
				$scope.sortPropName.push({date: key, task: $scope.sortDate[key]});	
			}
			
			$scope.allTask = _.sortBy($scope.sortPropName, ['date']);

			$scope.undoneTask = _.filter($scope.allTask, function (obj) {
				var oneTask = obj.task;
				for (var i = 0; i < oneTask.length; i++) {
					let taskDate = oneTask[i].date + 'T' + oneTask[i].time;
					return taskDate >= $scope.nowFormatDate;	
				}
			});
			
			

			console.log($scope.sortDate);
			console.log($scope.allTask);
			console.log($scope.undoneTask);
			

			$scope.$digest();
		})

		.catch(function (error){
			console.error('Токена нет')
		})
}]);