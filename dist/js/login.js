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
                    self.setToken(res._id, self._savePasswordCheckbox.prop('checked'));
                },
                error: function(err){
                    console.log(`Sorry, no such user found`);
                }
            });
        }

        setToken(id, save){
            let date = new Date;
            date.setSeconds(date.getSeconds() + 6000000);
            document.cookie = save ?  `_id=${id};expires=${date.toUTCString()}` : `_id=${id};`;
            window.location = '/task';
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
            let self = this;
            this.event(self);
        }

    }

    let form = $('form[name="loginForm"');
    let newLogin = new Login(form);
    window.addEventListener('load',newLogin.init.call(newLogin));

    
})(jQuery);