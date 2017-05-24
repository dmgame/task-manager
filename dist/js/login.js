;(function ($) {
    class Login {

        constructor(){
            this._form = document.forms['loginForm'];
            this._allInputReq = document.querySelectorAll('.required');
            this._inputSavePass = this._form.elements['save-passw'];
            this._canSend = true;
            this._formData = {};
            this.regExp = {
                login:/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                password:/\S+/,
            };
        }

        init() {
          var self = this;
          
          this.checkToken();
          
          if (this._form === undefined || this._allInputReq === undefined || this._inputSavePass === undefined) {
            console.error('Form elements are undefined');
          } else {
            this.formEvent(self);
          }
        }
      
        checkToken() {
          if (localStorage._id || sessionStorage._id) {
            window.location = '/task';
          } else {
            return;
          }
        }
      
        formEvent(self) {
          this._form.addEventListener('submit', function (e) {
            e.preventDefault();
            self._canSend = true;
            
            self._allInputReq.forEach(input => {
              if(!self.regExp[input.name].test(input.value)) {
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
      
        sendFormAjax(data, self) {
          $.ajax({
            method: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function(res) {
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
            error: function(err) {
              self.showError('Неправильный логин или пароль');
            }
          });
        }
      
        showError(message) {
          $('.warning-msg').html(message);
          $('.warning-msg').slideDown(600);
        }
      
        hideError() {
          $('.warning-msg').hide();
        }
      
    }

    var newLogin = new Login();
  
    newLogin.init();
    
})(jQuery);