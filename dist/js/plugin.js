;(function ($) {
	$(window).on('load', function (e) {
		// let taskLink = $('.toggle-task-list a');
		// let taskContent = $('.task-content');
		// let taskHeader = $('.task-header');
		// let addTaskBtn = $('.add-task');
		// // let overlay = $('.overlay');
		// // let editTaskBlock = $('.edit-task');

		// function tabTask(e) {
		// 	e.preventDefault();
		// 	let activeBlock = $(this).attr('href');
		// 	console.log(activeBlock);
		// 	taskLink.removeClass('active');
		// 	taskContent.removeClass('active');
		// 	$(this).addClass('active');
		// 	$(activeBlock).addClass('active');
		// }

		// function taskSlideToggle(e) {
		// 	if(!$(e.target).hasClass('icon-cancel')){
		// 		let parentTask = $(this).closest('.task');
		// 		let taskContentWrap = $(parentTask).find('.task-content-wrap');
				
		// 		if($(parentTask).hasClass('open')){
		// 			$(taskContentWrap).slideUp(500, function (){
		// 				$(parentTask).removeClass('open');
		// 			});
					
		// 		} else{
		// 			$(taskContentWrap).slideDown(500, function(){
		// 				$(parentTask).addClass('open');
		// 			});
		// 		}
		// 	}
		// }

		// function openEditBlock(e){
		// 	$([overlay, editTaskBlock]).toggleClass('open');
		// }

		// taskLink.on('click', tabTask);
		// taskHeader.on('click', taskSlideToggle);
		// addTaskBtn.on('click', openEditBlock);
		// overlay.on('click', openEditBlock);
	})
})(jQuery);