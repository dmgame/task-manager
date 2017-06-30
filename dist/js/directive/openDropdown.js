taskApp.directive('openDropdown', function () {
  return function ($scope, element, attrs) {
    let colors = angular.element( document.getElementById('colors') );
    
    element.on('click', function(e) {
      colors.toggleClass('open');
    });
  }
});