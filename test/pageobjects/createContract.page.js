const Page = require('./page');

class CreateContractPage extends Page {
    
    get fixedContractBox () { return $("div.box") }
    get contractName () { return $("input[name='name']") }
    get contractScope () { return $("textarea[name='scope']") }
    get selectEffectiveDates () { return $("div[class='deel-ui__calendar-input-container__input']") }
    get contractorTaxResidence () { return $$(`div[class='input-container']`) }
    get useContractorsProfile () { return $(`div[class='deel-ui__select__option-container']`) }
    get submitBtn () { return $("button[type='submit']") }
    get rate () { return $("input[name='rate']")}
    get textInputs () { return $$("input[type='text']")}
    get menuList () { return $$("div.deel-ui__select__menu") }
    get perDate () { return $(`div[class='deel-ui__select__option-container']`) }
    get clauseBtn () { return $(`button[data-qa='add-a-special-clause']`) }
    get clauseText () { return $("textarea.textarea") }
    get nxtBtn () { return $(`button[data-qa="next"]`) }
    get status () { return $(`button[data-qa="review-sign"]`)}
    get acceptCookies () { return $(`#CybotCookiebotDialogBodyButtonAccept`) }
    get createContractButton () { return $(`button[data-qa="create-contract"]`) }

    async setEffectiveDate () {
        const date = new Date();
        const yesterday = new Date(date.setDate(date.getDate() - 1));
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        await (await $(`abbr[aria-label='${monthNames[yesterday.getMonth()]} ${yesterday.getDate()}, ${yesterday.getFullYear()}']`)).click();
    }

    async generalInfo (name, scope){
        await (await this.acceptCookies).click();
        await (await this.fixedContractBox).click();
        await (await this.contractName).setValue(name);
        await (await this.contractorTaxResidence)[0].scrollIntoView();
        await (await this.contractorTaxResidence)[1].click();
        await browser.pause(1000);
        await (await this.useContractorsProfile).click();
        await (await this.contractScope).setValue(scope);
        await (await this.selectEffectiveDates).scrollIntoView();
        await (await this.selectEffectiveDates).click();
        await this.setEffectiveDate();
        await (await this.submitBtn).click();
    }
    
    async paymentDetails (rate, currency, perDate){
        await (await this.rate).setValue(rate);
        await (await this.textInputs)[0].setValue(currency);
        await (await this.menuList)[0].click();
        await (await this.textInputs)[1].setValue(perDate);
        await (await this.perDate).click();
        await (await this.submitBtn).click();
    }

    async defineDates (){
        await (await this.submitBtn).click();
    }

    async extras (clause){
        await (await this.clauseBtn).scrollIntoView();
        await (await this.clauseBtn).click();
        await (await this.clauseText).setValue(clause);
        await (await this.nxtBtn).click();
    }

    async compliance (country, state){
        await (await this.textInputs)[0].setValue(country);
        await (await this.menuList)[0].click();
        await (await this.textInputs)[1].setValue(state);
        await (await this.menuList)[0].click();
        await (await this.nxtBtn).click();
    }

    async contractCreatedSuccessfully (){
        await expect(await this.status).toExist();
    }

    async createFixedContract ({name, scope, rate, currency, perDate, clause, country, state}) {
        await this.generalInfo(name, scope);
        await this.paymentDetails(rate, currency, perDate);
        await this.defineDates();
        await this.extras(clause);
        await (await this.createContractButton).click();
        await this.contractCreatedSuccessfully();
    }

    open () {
        return super.open('create');
    }
}

module.exports = new CreateContractPage();
