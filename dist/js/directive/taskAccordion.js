taskApp.directive('taskAccordion', function () {
	return function ($scope, element, attrs){
		
		element.on('click', function (e){
			var target = angular.element(e.target);
			if(!target.hasClass('icon-cancel')){
				let parentTask = element.closest('.task');
				let taskContentWrap = parentTask.find('.task-content-wrap');
				
				if(parentTask.hasClass('open')){
					taskContentWrap.slideUp(500, function (){
						parentTask.removeClass('open');
					});
					
				} else{
					taskContentWrap.slideDown(500, function(){
						parentTask.addClass('open');
					});
				}
			}
		})
	}
});