import { Given, When, Then } from 'cucumber';
import { loginPage } from '../pages/Login.page';
import * as systemMessages from '../constants/SystemMessages.constant';

Given(/^I'm on the login page$/, () => {
    loginPage.open();
});

When(/^I log in with a user:$/, (data) => {
    const [user] = data.hashes();
    loginPage.login(user.email, user.password);
});

Then(/^show a welcome message on the site$/, () => {
    expect(loginPage.welcomeMessage).toHaveText(
        systemMessages.FEEDBACK_USER_LOGGED,
    );
});

Then(/^show user name '(.+)' on the site$/, (userName) => {
    const actualText = loginPage.userLoggedIn.getText();
    expect(actualText).toMatch(userName);
    expect(loginPage.userLoggedIn).toHaveTextContaining(userName);
    // We can make the test pass or fail in BrowserStack run on an step level as outlined below:
    // if(loginPage.userLoggedIn.isExisting()){
    //     driver.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "User is logged in!"}}');
    // } else {
    //     driver.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "User is not logged in!"}}');
    // }
});
