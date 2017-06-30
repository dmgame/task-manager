'use strict';

taskApp.directive('openDropdown', function () {
  return function ($scope, element, attrs) {
    var colors = angular.element(document.getElementById('colors'));

    element.on('click', function (e) {
      colors.toggleClass('open');
    });
  };
});