'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function ($) {
    var TaskEditor = function () {
        function TaskEditor() {
            _classCallCheck(this, TaskEditor);

            this._$modal = $('.edit-task');
            this._$addTaskBtn = $('.add-task');
            this._$overlay = $('.overlay');
        }

        _createClass(TaskEditor, [{
            key: 'openEditModal',
            value: function openEditModal() {
                $([this._$overlay, this._$modal]).toggleClass('open');
            }
        }, {
            key: 'event',
            value: function event() {
                var _this = this;

                this._$addTaskBtn.on('click', function () {
                    return _this.openEditModal.call(_this);
                });
                this._$overlay.on('click', function () {
                    return _this.openEditModal.call(_this);
                });
            }
        }, {
            key: 'init',
            value: function init() {
                this.event();
            }
        }]);

        return TaskEditor;
    }();

    var Tabs = function () {
        function Tabs() {
            _classCallCheck(this, Tabs);

            this._$links = $('.toggle-task-list a');
            this._$taskContent = $('.task-content');
        }

        _createClass(Tabs, [{
            key: 'switchTabs',
            value: function switchTabs(e, self) {
                e.preventDefault();
                var activeTab = $(e.target).attr('href');
                $(self._$links).removeClass('active');
                $(self._$taskContent).removeClass('active');
                $(e.target).addClass('active');
                $(activeTab).addClass('active');
            }
        }, {
            key: 'event',
            value: function event(self) {
                var _this2 = this;

                this._$links.on('click', function (e) {
                    _this2.switchTabs.call(e.target, e, self);
                });
            }
        }, {
            key: 'init',
            value: function init() {
                var self = this;
                this.event(self);
            }
        }]);

        return Tabs;
    }();

    var Accordion = function () {
        function Accordion() {
            _classCallCheck(this, Accordion);

            this._$taskHeader = $('.task-header');
        }

        _createClass(Accordion, [{
            key: 'slide',
            value: function slide() {
                var parent_task = $(this).closest('.task'),
                    task_content_wrap = $(parent_task).find('.task-content-wrap');
                if ($(parent_task).hasClass('open')) {
                    $(task_content_wrap).slideUp(500, function () {
                        $(parent_task).removeClass('open');
                    });
                } else {
                    $(task_content_wrap).slideDown(500, function () {
                        $(parent_task).addClass('open');
                    });
                }
            }
        }, {
            key: 'init',
            value: function init() {
                this._$taskHeader.on('click', this.slide);
            }
        }]);

        return Accordion;
    }();

    var taskEditor = new TaskEditor(),
        tabs = new Tabs(),
        accordion = new Accordion();

    taskEditor.init();
    tabs.init();
    accordion.init();
})(jQuery);

(function ($) {
    var ChangeColorScheme = function () {
        function ChangeColorScheme() {
            _classCallCheck(this, ChangeColorScheme);

            this._$li = $('.change-color li');
            this._$blocksToChange = $('[data-change]');
            this._color = localStorage.getItem('color') || '#00a1f1';
        }

        _createClass(ChangeColorScheme, [{
            key: 'setColor',
            value: function setColor(color) {
                this._$blocksToChange.each(function (i, el) {
                    var prop = $(el).attr('data-change');
                    $(el).css(prop, color);
                });
                // let notActiveA = $('.toggle-task-list a:not(".active")');
                // notActiveA.css(color, '#bdbdbd');
            }
        }, {
            key: 'colorLi',
            value: function colorLi() {
                this._$li.each(function (i, el) {
                    var color = $(el).attr('data-color');
                    $(el).css('background-color', color);
                });
            }
        }, {
            key: 'handler',
            value: function handler(e, self) {
                e.preventDefault();
                var color = $(this).attr('data-color');
                self.setColor(color);
                localStorage.setItem('color', color);
            }
        }, {
            key: 'event',
            value: function event() {
                var _this3 = this;

                this._$li.on('click', function (e) {
                    return _this3.handler.call(e.target, e, _this3);
                });
            }
        }, {
            key: 'init',
            value: function init() {
                this.colorLi();
                this.setColor(this._color);
                this.event();
            }
        }]);

        return ChangeColorScheme;
    }();

    var colorChange = new ChangeColorScheme();
    colorChange.init();
})(jQuery);

(function ($) {
    var loader = $('#loading');
    $(document).ready(function () {
        loader.addClass('hide');
    });
})(jQuery);