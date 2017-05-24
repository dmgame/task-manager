'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

;(function ($) {
  var Login = function () {
    function Login() {
      _classCallCheck(this, Login);

      this._form = document.forms['loginForm'];
      this._allInputReq = document.querySelectorAll('.required');
      this._inputSavePass = this._form.elements['save-passw'];
      this._canSend = true;
      this._formData = {};
      this.regExp = {
        login: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        password: /\S+/
      };
    }

    _createClass(Login, [{
      key: 'init',
      value: function init() {
        var self = this;

        this.checkToken();

        if (this._form === undefined || this._allInputReq === undefined || this._inputSavePass === undefined) {
          console.error('Form elements are undefined');
        } else {
          this.formEvent(self);
        }
      }
    }, {
      key: 'checkToken',
      value: function checkToken() {
        if (localStorage._id || sessionStorage._id) {
          window.location = '/task';
        } else {
          return;
        }
      }
    }, {
      key: 'formEvent',
      value: function formEvent(self) {
        this._form.addEventListener('submit', function (e) {
          e.preventDefault();
          self._canSend = true;

          self._allInputReq.forEach(function (input) {
            if (!self.regExp[input.name].test(input.value)) {
              input.classList.add('error');
              self._canSend = false;
            } else {
              self._formData[input.name] = input.value;
              input.classList.remove('error');
            }
          });

          self._canSend ? self.sendFormAjax(self._formData, self) : self.showError('Заполните обязательные поля');
        });
      }
    }, {
      key: 'sendFormAjax',
      value: function sendFormAjax(data, self) {
        $.ajax({
          method: 'POST',
          data: JSON.stringify(data),
          contentType: 'application/json',
          success: function success(res) {
            self.hideError();

            if (self._inputSavePass !== undefined) {
              if (self._inputSavePass.checked) {
                localStorage._id = res._id;
              } else {
                sessionStorage._id = res._id;
              }
            }

            window.location = '/task';
          },
          error: function error(err) {
            self.showError('Неправильный логин или пароль');
          }
        });
      }
    }, {
      key: 'showError',
      value: function showError(message) {
        $('.warning-msg').html(message);
        $('.warning-msg').slideDown(600);
      }
    }, {
      key: 'hideError',
      value: function hideError() {
        $('.warning-msg').hide();
      }
    }]);

    return Login;
  }();

  var newLogin = new Login();

  newLogin.init();
})(jQuery);