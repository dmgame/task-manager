'use strict';

;(function ($) {
  $(window).on('load', function (e) {
    var taskLink = $('.toggle-task-list a');
    var taskContent = $('.task-content');
    var taskHeader = $('.task-header');
    var addTaskBtn = $('.add-task');
    var overlay = $('.overlay');
    var editTaskBlock = $('.edit-task');
    var closeEdit = $('.close-edit');

    function tabTask(e) {
      e.preventDefault();
      var activeBlock = $(this).attr('href');

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