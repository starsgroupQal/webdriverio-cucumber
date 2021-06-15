
exports.config = {
  user: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',
  maxInstances: 10,
  host: 'hub.browserstack.com',
  commonCapabilities: {
    name: 'E2E Test',
    build:  'Browserstack-UI-Android-build',
            'browserstack.local': true,
            'browserstack.debug': true,
            'browserstack.console':'verbose',
            'browserstack.timezone':'London',
            'browserstack.networkLogs': true  // The name of test and name of build is being defined here
  },
  capabilities: [
    { 
      device: 'Samsung Galaxy S21 Ultra',
      os_version: '11',
      browserName: 'chrome'
  
     },
    {
      device: 'Samsung Galaxy A11',
      os_version: '10',
      browserName: 'chrome'

    },
    {
      device: 'Samsung Galaxy Note 10 Plus',
      os_version: '9',
      browserName: 'chrome'


    },
    {
      device: 'Samsung Galaxy S9',
      os_version: '8',
      browserName: 'chrome'

    },
    {
      device: 'Samsung Galaxy S8',
      os_version: '7',
      browserName: 'chrome'

    },
    {
      device: 'Samsung Galaxy S7',
      os_version: '6',
      browserName: 'chrome'

    },
    {
      device: 'Samsung Galaxy S6',
      os_version: '5',
      browserName: 'chrome'

    },
    {
      device: 'Samsung Galaxy Note 4',
      os_version: '4.4',
      browserName: 'chrome'
    },
    {
      device: 'Samsung Galaxy Tab S7',
      os_version: '10',
      browserName: 'chrome'
    },
    {
      device: 'Samsung Galaxy Tab S5e',
      os_version: '9',
      browserName: 'chrome'

    },
    {
      device: 'Samsung Galaxy Tab 4',
      os_version: '4.4',
      browserName: 'chrome'
    },
    {
      device: 'Google Pixel 5',
      os_version: '11',
      browserName: 'chrome'
  
    },
    {
      device: 'Oneplus 8',
      os_version: '10',
      browserName: 'chrome'
  
    },
    {
      device: 'Xiaomi Redmi Note 9',
      os_version: '10',
      browserName: 'chrome'
  
    },
    {
      device: 'Huawei P30',
      os_version: '9',
      browserName: 'chrome'
    }
  ],
  specs: ['./dist/**/*.feature'],
  logLevel: 'trace',
  outputDir: './test-report/output',
  bail: 0,
  baseUrl: 'https://bs-eu.qc-sports-mt1.starsweb.io/',
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
  services: ['chromedriver', 'browserstack'],
  beforeSession: function (config: any, capabilities: { name: any; }, specs: string[]) {
    require('expect-webdriverio').setOptions({ wait: 5000 });
    capabilities.name = specs && specs[0].split('/').pop() || undefined;
  },
  before() {
//browser.setWindowSize(1280, 720);
  },
  afterStep(
    uri: undefined,
    feature: undefined,
    scenario: { error: boolean, passed: boolean},
  ) {
    if (scenario.passed) {
      browser.takeScreenshot();
      browser.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "All steps passed"}}');
     } 
    if (scenario.error) {
      browser.takeScreenshot();
      browser.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "Step has failed"}}');
 }
  },
  afterSession() {
    browser.closeApp()
  }
};

// Code to support common capabilities
exports.config.capabilities.forEach(function (caps: { [x: string]: any; }) {
  for (const capability in exports.config.commonCapabilities)
    caps[capability] = caps[capability] || exports.config.commonCapabilities[capability];
});
