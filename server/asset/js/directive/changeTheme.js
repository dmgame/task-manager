'use strict';

taskApp.directive('changeTheme', ['$window', function ($window) {
  return function ($scope, element, attrs) {

    var div = angular.element(document.querySelector('.theme-dark'));

    element.on('click', function (e) {

      var elementStyle = $window.getComputedStyle(this, null);
      var generalColor = elementStyle.getPropertyValue('background-color');

      $scope.generalStyle['background-color'] = generalColor;
      $scope.generalStyle['color'] = generalColor;
      $scope.generalStyle['border-color'] = generalColor;
      var style = '<style>.all-task-wrap::before{border-color:' + $scope.generalStyle['border-color'] + '}</style>';
      angular.element("head").append(style);

      $scope.$digest();

      $window.localStorage.setItem('generalStyle', JSON.stringify($scope.generalStyle));
    });
  };
}]);