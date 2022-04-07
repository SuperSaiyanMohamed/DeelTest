const Page = require('./page');

class LoginPage extends Page {
    
    get inputUsername () { return $("input[name='email']") }
    get inputPassword () { return $("input[name='password']") }
    get btnSubmit () { return $("button[type='submit']") }

    async login ({email, password}) {
        await (await this.inputUsername).setValue(email);
        await (await this.inputPassword).setValue(password);
        await (await this.btnSubmit).click();
    }

    open () {
        return super.open('login');
    }
}

module.exports = new LoginPage();
