;(function ($) {
    class Login {

        constructor(){
            this._form = document.forms['loginForm']; // обробатываемая форма
            this._allInputReq = document.querySelectorAll('.required'); // коллекция инпутов логин и пароль
            this._inputSavePass = this._form.elements['save-passw']; // чекбокс сохранить пароль
            this._canSend = true; // переменная переключатель
            this._formData = {}; // пустой объект для сбора данных из форы
            this.regExp = {
                login:/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                password:/\S+/,
            }; // набор регулярных выражений для проверки инпутов
        }

        init(){
            var self = this;

            this.checkToken(self);

            if(this._form === undefined || this._allInputReq === undefined || this._inputSavePass === undefined){
                console.error('Form elements undefined');
            } else{
                this.formEvent(self);
            }
        }

        checkToken(self){
            if (localStorage.id !== undefined || sessionStorage.id !== undefined){
                window.location = '/task';
            } else {
                return;
            }
        }

        formEvent(self){
            this._form.addEventListener('submit', function (e){
                e.preventDefault();
                self._canSend = true;
                self._allInputReq.forEach(input => {
                    if ( !self.regExp[input.name].test(input.value) ){
                        input.classList.add('error');
                        self._canSend = false;
                    } else{
                        self._formData[input.name] = input.value;
                        input.classList.remove('error');
                    }
                })
                console.log(self._formData);
                self._canSend ? self.sendFormAjax(self._formData, self) : console.error('input value error');

            })
        }

        showError(self){

            var error = document.createElement('p');
                error.classList.add('errorText');
                error.textContent = 'Введен не верный логин или пароль';
            self._form.appendChild(error);
        }

        sendFormAjax(data, self){
            $.ajax({
                method: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json',
                url: 'http://localhost:8080/login',
                success: function (res) {
                    if(self._inputSavePass.checked){
                        localStorage.id = res._id;
                    } else {
                        sessionStorage.id = res._id;
                    }
                    window.location = '/task';
                },
                error: function (err) {
                    self.showError(self);

                }
            })
        }
    }

    var newLogin = new Login();
    newLogin.init();

})(jQuery);