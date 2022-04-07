const LoginPage = require('../pageobjects/login.page');
const CreateContract = require('../pageobjects/createContract.page');
const UserData = require('../testData/user.json');
const ContractData = require('../testData/fixedContract.json');

describe('Login and Create Contract', () => {
    it('should login with valid credentials then create a fixed rate contract', async () => {
        await LoginPage.open();

        await LoginPage.login(UserData.user);
        await browser.pause(3000);
        await CreateContract.open();
        await CreateContract.createFixedContract(ContractData.contract);
    });
});


