class CompetitionEvents {
    open() {
        browser.url('/');
    }

    get soccerSport() {
        return $(
            '//*[@id="root"]/div/div[4]/div[1]/div/nav[2]/ul/li[27]/a/span/span',
        );
    }

    get gotoPage() {
        return $('html[data-renderer="client"]');
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

    selectSport() {
        this.gotoPage.isExisting();
        this.soccerSport.isExisting();
        this.soccerSport.click();

        // this.inputEmail.waitForEnabled();
        // this.inputEmail.setValue(email);
        // this.inputPassword.setValue(password);

        // this.buttonSignIn.click();
        // this.welcomeMessage.waitForExist();
    }
}

export const competitionEvents = new CompetitionEvents();
