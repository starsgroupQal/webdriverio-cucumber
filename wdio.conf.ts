const { TimelineService } = require('wdio-timeline-reporter/timeline-service');

exports.config = {
  user: process.env.user,
  key: process.env.key,  // BS creds Passed in dynamically 
  maxInstances: 10,
  host: 'hub.browserstack.com',
  commonCapabilities: {
    name: 'testing automationpractice.com',
    build: 'macca-webdriverio-browserstack-build' + new Date().getTime()  // The name of test and name of build is being defined here
  },
  capabilities: [
    {
      browserName: 'chrome'
    },
    {
      browserName: 'firefox'
    }, {
      browserName: 'internet explorer'
    },
    {
      os: 'OS X',
      os_version: 'Catalina',
      browserName: 'safari'   // You can define all other capabilities that you want in your tests, in this section
    }
  ],
  specs: ['./dist/**/*.feature'],
  logLevel: 'trace',
  outputDir: './test-report/output',
  bail: 0,
  baseUrl: 'http://automationpractice.com',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  framework: 'cucumber',
  reporters: [
    ['cucumberjs-json', {
      jsonFolder: './test-report/cucumber',
      language: 'en',
    },
    ],
    'spec',
    ['timeline', { outputDir: './test-report/timeline' }],
  ],
  cucumberOpts: {
    requireModule: [
      () => {
        require('ts-node').register({ transpileOnly: true });
      },
    ],
    require: ['./dist/**/*.steps.js'],
    backtrace: false,
    compiler: [],
    dryRun: false,
    failFast: true,
    format: ['pretty'],
    colors: true,
    snippets: true,
    source: true,
    profile: [],
    strict: false,
    tags: [],
    timeout: 300000,
    ignoreUndefinedDefinitions: false,
    tagExpression: 'not @skip',
  },
  services: ['chromedriver', 'browserstack', [TimelineService]],
  beforeSession() {
    require('expect-webdriverio').setOptions({ wait: 5000 });
  },
  before() {
    browser.setWindowSize(1280, 720);
  },
  afterStep(
    uri: undefined,
    feature: undefined,
    scenario: { error: boolean },
  ) {
    if (scenario.error) {
      browser.takeScreenshot();
      browser.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "At least 1 assertion failed"}}');
    }
  },
};

// Code to support common capabilities
exports.config.capabilities.forEach(function (caps: { [x: string]: any; }) {
  for (const capability in exports.config.commonCapabilities)
    caps[capability] = caps[capability] || exports.config.commonCapabilities[capability];
});
