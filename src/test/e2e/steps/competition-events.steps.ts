import { defineStep } from 'cucumber';
import { competitionEvents } from '../pages/competition-events.page';
import * as systemMessages from '../constants/SystemMessages.constant';
import * as systemLabels from '../constants/SystemLabels.constant';

defineStep(/^I navigate to a "Soccer" competition page$/, () => {
    competitionEvents.open();
    //competitionEvents.selectSport();
    console.log(
        $(`/html/body/div[1]/div/div[4]/div[2]/div/ul/li[1]/a`).getText(),
    );
    $(`/html/body/div[1]/div/div[4]/div[2]/div/ul/li[1]/a`).click();
});

defineStep(/^select the in-play tab$/, () => {
    $(`/html/body/div[1]/div/div[4]/div[2]/div[2]/div/div/a[1]/span`).click();
});
defineStep(/^I select a competition event in-play$/, () => {
    $(
        `/html/body/div[1]/div/div[4]/div[2]/div[3]/div[1]/details/div/ol/li[1]/div/a/div[1]/span[2]`,
    ).click();
});
defineStep(/^I can see the "Match Odds" default market$/, () => {
    $(
        `/html/body/div[1]/div/div[4]/div[2]/div[2]/div[3]/details/summary/div/div`,
    ).getText();
});
