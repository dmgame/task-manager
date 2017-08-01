;(function ($) {
    class Login {

        constructor(form){
            this._form = form;
            this._$inputs = $(`input[required]`);
            this._toSend ={
                login: '',
                password: ''
            };
            this._savePasswordCheckbox =$('input[type="checkbox"');
        }

        validate(e, self){
            let regExp = new RegExp(this.dataset.regexp);

            if( !regExp.test(this.value) && this.value || !regExp.test(this.value) && e.type === 'submit'){
               this.classList.add('error');
                self._toSend[this.name] = '';
            } else {
                this.classList.remove('error');
                self._toSend[this.name] = this.value;
            }
        }

        onSubmit(e, self){
            e.preventDefault();

            if(!self._toSend.login || !self._toSend.password){
               self._$inputs.each( function(){  //JQuery method invoking callback for each entry in JQ object
                   self.validate.call(this, e, self); //method sets this to element for which callback is being invoken
               });
               return;
            } else {
                self.send(self);
            }
        }

        send(self){
            $.ajax({
                method: 'POST',
                data: JSON.stringify(this._toSend),
                contentType: 'application/json',
                url: 'http://localhost:8080/login',
                success: function(res){
                    self.setToken(res, self._savePasswordCheckbox.prop('checked'));
                },
                error: function(err){
                    console.log(`Sorry, no such user found`);
                }
            });
        }

        setToken(res, save){
            let date = new Date;
            date.setSeconds(date.getSeconds() + 6000000);

            if(!save){
                document.cookie = `_id=${res._id};`;
            } else{
                document.cookie = `_id=${res._id};expires=${date.toUTCString()}`
                document.cookie = `login=${res.login};expires=${date.toUTCString()}`
                document.cookie = `password=${res.password};expires=${date.toUTCString()}`
            }
            window.location = '/task';
        }

        autofil(){
            let saved = document.cookie.split(';');
            if(saved.length === 3){
                let data = saved.filter( str => str.charAt(0) !== '_');
                data.forEach((str) =>{
                    let key = str.slice( 0, str.indexOf("=")).trim(),
                        value = str.slice( str.indexOf("=") + 1 );
                    this._form[0].elements[key].value = value;
                });
            }
        }

        event(self){
            this._$inputs.on('change', (e) => {
                self.validate.call(e.target, e, self); //this within validate shall refer to target input
            });
            this._form.on('submit', (e) =>{
                self.onSubmit.call(e.target, e, self);
            });

        }

        init(){
            this.autofil();
            let self = this;
            this.event(self);
        }

    }

    let form = $('form[name="loginForm"');
    let newLogin = new Login(form);
    window.addEventListener('load',newLogin.init.call(newLogin));

    
})(jQuery);