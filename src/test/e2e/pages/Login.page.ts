class LoginPage {
    open() {
        browser.url('/');
    }

    get buttonLogin() {
        return $('.login');
    }
    get pokerStarsLoginButton() {
        return $('._1oujrjA _3178u8T _HB0bQEZ _1kHX3zf');
    }

    get pokerStarsUsernameId() {
        return $('#userId');
    }

    get pokerStarsPasswordId() {
        return $('#password');
    }

    get pokerStarsSubmitLoginButton() {
        return $('._1oujrjA _2PMh8FC _2hwNVzd _1BLPWPB');
    }

    get loggedInIcon() {
        return $('._36vYMzR');
    }

    get inputEmail() {
        return $('body #email');
    }

    get inputPassword() {
        return $('body #passwd');
    }

    get buttonSignIn() {
        return $('body #SubmitLogin');
    }

    get userLoggedIn() {
        return $('.account');
    }

    get welcomeMessage() {
        return $('.info-account');
    }

    login(email: string, password: string) {
        if (this.buttonLogin.isExisting()) {
            this.buttonLogin.click();

            this.inputEmail.waitForEnabled();
            this.inputEmail.setValue(email);
            this.inputPassword.setValue(password);

            this.buttonSignIn.click();
            this.welcomeMessage.waitForExist();
        }
    }

    pokerStarsLogin(email: string, password: string) {
        if (this.pokerStarsLoginButton.isExisting()) {
            this.pokerStarsLoginButton.click();

            this.pokerStarsUsernameId.waitForEnabled();
            this.pokerStarsUsernameId.setValue(email);
            this.pokerStarsPasswordId.setValue(password);

            this.pokerStarsSubmitLoginButton.click();
            this.loggedInIcon.waitForExist();
        }
    }
}

export const loginPage = new LoginPage();
