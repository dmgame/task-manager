taskApp.directive('changeAppColor', function () {
	return function ($scope, element, attrs){
		var color = attrs['changeAppColor'];
		element.css('background', color);
	}
});