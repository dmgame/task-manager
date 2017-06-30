taskApp.directive('openEditModal', function () {
	return function ($scope, element, attrs){
		let overlay = angular.element( document.querySelector('.overlay') );
		let editTaskBlock = angular.element( document.querySelector('.edit-task') );

		element.on('click', function (e){
			overlay.toggleClass('open');
			editTaskBlock.toggleClass('open');
		})
	}
});