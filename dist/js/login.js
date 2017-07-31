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


    }

    var newLogin = new Login();
    
})(jQuery);