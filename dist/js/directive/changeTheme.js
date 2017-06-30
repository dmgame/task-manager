taskApp.directive('changeTheme', ['$window', function ($window) {
  return function ($scope, element, attrs) {
    
    let div = angular.element( document.querySelector('.theme-dark') );
    
    element.on('click', function(e) {
      
      let elementStyle = $window.getComputedStyle(this, null);
      let generalColor = elementStyle.getPropertyValue('background-color');
		
      $scope.generalStyle['background-color'] = generalColor;
      $scope.generalStyle['color'] = generalColor;
      $scope.generalStyle['border-color'] = generalColor;
      let style = `<style>.all-task-wrap::before{border-color:${$scope.generalStyle['border-color']}}</style>`;
      angular.element("head").append(style);
      
      $scope.$digest();
      
      $window.localStorage.setItem('generalStyle', JSON.stringify($scope.generalStyle));
      
    });
  }
}]);