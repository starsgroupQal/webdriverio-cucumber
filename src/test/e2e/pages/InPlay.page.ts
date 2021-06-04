class InPlayPage {
    open() {
        browser.url('https://bs-eu.qc-sports-mt1.starsweb.io/in-play/tennis/2');
    }

    get tennisClass() {
        return $('._21Uiuea');
    }

    goToTennisPage() {
        this.tennisClass.click();
    }
}
export const inPlayPage = new InPlayPage();
