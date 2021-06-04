import { Given, When } from 'cucumber';
import { inPlayPage } from '../pages/InPlay.page';
import { loginPage } from '../pages/Login.page';

Given(/^I navigate to an in-play Tennis market$/, () => {
    inPlayPage.open();
});

When(/^I am successfully logged in$/, () => {
    loginPage.pokerStarsLogin('isptestQACore', 'MyTest123');
});
