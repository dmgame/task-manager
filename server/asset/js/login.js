'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

;(function ($) {
    var Login = function () {
        function Login(form) {
            _classCallCheck(this, Login);

            this._form = form;
            this._$inputs = $('input[required]');
            this._toSend = {
                login: '',
                password: ''
            };
            this._savePasswordCheckbox = $('input[type="checkbox"');
        }

        _createClass(Login, [{
            key: 'validate',
            value: function validate(e, self) {
                var regExp = new RegExp(this.dataset.regexp);

                if (!regExp.test(this.value) && this.value || !regExp.test(this.value) && e.type === 'submit') {
                    this.classList.add('error');
                    self._toSend[this.name] = '';
                } else {
                    this.classList.remove('error');
                    self._toSend[this.name] = this.value;
                }
            }
        }, {
            key: 'onSubmit',
            value: function onSubmit(e, self) {
                e.preventDefault();

                if (!self._toSend.login || !self._toSend.password) {
                    self._$inputs.each(function () {
                        //JQuery method invoking callback for each entry in JQ object
                        self.validate.call(this, e, self); //method sets this to element for which callback is being invoken
                    });
                    return;
                } else {
                    self.send(self);
                }
            }
        }, {
            key: 'send',
            value: function send(self) {
                $.ajax({
                    method: 'POST',
                    data: JSON.stringify(this._toSend),
                    contentType: 'application/json',
                    url: 'http://localhost:8080/login',
                    success: function success(res) {
                        self.setToken(res._id, self._savePasswordCheckbox.prop('checked'));
                    },
                    error: function error(err) {
                        console.log('Sorry, no such user found');
                    }
                });
            }
        }, {
            key: 'setToken',
            value: function setToken(id, save) {
                var date = new Date();
                date.setSeconds(date.getSeconds() + 6000000);
                document.cookie = save ? '_id=' + id + ';expires=' + date.toUTCString() : '_id=' + id + ';';
                window.location = '/task';
            }
        }, {
            key: 'event',
            value: function event(self) {
                this._$inputs.on('change', function (e) {
                    self.validate.call(e.target, e, self); //this within validate shall refer to target input
                });
                this._form.on('submit', function (e) {
                    self.onSubmit.call(e.target, e, self);
                });
            }
        }, {
            key: 'init',
            value: function init() {
                var self = this;
                this.event(self);
            }
        }]);

        return Login;
    }();

    var form = $('form[name="loginForm"');
    var newLogin = new Login(form);
    window.addEventListener('load', newLogin.init.call(newLogin));
})(jQuery);