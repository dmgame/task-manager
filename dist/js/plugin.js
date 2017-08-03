(function($){
    class TaskEditor{
        constructor(){
            this._$modal = $('.edit-task');
            this._$addTaskBtn = $('.add-task');
            this._$overlay = $('.overlay');
        }

        openEditModal(){
            $([this._$overlay, this._$modal]).toggleClass('open');
        }

        event(){
            this._$addTaskBtn.on('click', () => this.openEditModal.call(this));
            this._$overlay.on('click', () => this.openEditModal.call(this));
        }

        init(){
            this.event();
        }

    }

    class Tabs{
        constructor(){
            this._$links = $('.toggle-task-list a');
            this._$taskContent = $('.task-content');
        }

        switchTabs(e, self){
            e.preventDefault();
            let activeTab = $(e.target).attr('href');
            $(self._$links).removeClass('active');
            $(self._$taskContent).removeClass('active');
            $(e.target).addClass('active');
            $(activeTab).addClass('active');
        }

        event(self){
            this._$links.on('click', (e) => {
                this.switchTabs.call(e.target, e, self);
            });
        }

        init(){
            let self = this;
            this.event(self);
        }
    }

class Accordion{
        constructor(){
            this._$taskHeader = $('.task-header');
        }

        slide(){
            let parent_task = $(this).closest('.task'),
                task_content_wrap = $(parent_task).find('.task-content-wrap');
            if( $(parent_task).hasClass('open')){
                $(task_content_wrap).slideUp(500, function(){
                    $(parent_task).removeClass('open');
                });
            } else {
                $(task_content_wrap).slideDown(500, function(){
                    $(parent_task).addClass('open');
                });
            }
        }

        init() {
            this._$taskHeader.on('click', this.slide);
        }
}

    let taskEditor = new TaskEditor(),
        tabs = new Tabs(),
        accordion = new Accordion();

    taskEditor.init();
    tabs.init();
    accordion.init();
})(jQuery);

(function($){
    class ChangeColorScheme{
        constructor(){
            this._$li = $('.change-color li');
            this._$blocksToChange = $('[data-change]');
            this._color = localStorage.getItem('color') || '#00a1f1';
        }

        setColor(color){
            this._$blocksToChange.each(function(i, el){
                let prop = $(el).attr('data-change');
                $(el).css(prop, color);
            });
            // let notActiveA = $('.toggle-task-list a:not(".active")');
            // notActiveA.css(color, '#bdbdbd');
        }

        colorLi(){
            this._$li.each(function(i, el){
                let color = $(el).attr('data-color');
                $(el).css('background-color', color);
            });
        }

        handler(e, self){
            e.preventDefault();
            let color = $(this).attr('data-color');
            self.setColor(color);
            localStorage.setItem('color', color);
        }

        event(){
            this._$li.on('click', (e)=> this.handler.call(e.target, e, this));
        }

        init(){
            this.colorLi();
            this.setColor(this._color);
            this.event();
        }
    }

    let colorChange = new ChangeColorScheme();
    colorChange.init();

})(jQuery);

(function($){
    let loader = $('#loading');
    $(document).ready(function(){
        loader.addClass('hide');
    })
})(jQuery);

