;(function($) {
  $(window).on('load', function (e) {
    let taskLink = $('.toggle-task-list a');
    let taskContent = $('.task-content');
    let taskHeader = $('.task-header');
	let addTaskBtn = $('.add-task');
    let overlay = $('.overlay');
    let editTaskBlock = $('.edit-task');
    let closeEdit = $('.close-edit');
    
    function tabTask(e) {
      e.preventDefault();
      let activeBlock = $(this).attr('href');
      
      taskLink.removeClass('active');
      taskContent.removeClass('active');
      $(this).addClass('active');
      $(activeBlock).addClass('active');
    }
    
    function openEditBlock(e) {
      $([overlay, editTaskBlock]).toggleClass('open');
    }
    
    taskLink.on('click', tabTask);
    addTaskBtn.on('click', openEditBlock);
    overlay.on('click', openEditBlock);
    closeEdit.on('click', openEditBlock);
    
  });
})(jQuery);