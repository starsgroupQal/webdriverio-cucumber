Feature: Competition Events

    @ISPT-2482
    @GSFE-909
    Scenario: Displays the correct default market for Soccer
        When I navigate to a "Soccer" competition page
        And select the in-play tab
        And I select a competition event in-play
        Then I can see the "Match Odds" default market
