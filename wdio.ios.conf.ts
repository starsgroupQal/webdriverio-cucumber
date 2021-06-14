
exports.config = {
  user: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',
  maxInstances: 10,
  host: 'hub.browserstack.com',
  commonCapabilities: {
    name: 'E2E Test',
    build:  'Browserstack-UI-iOS-build',
            'browserstack.local': true,
            'browserstack.debug': true,
            'browserstack.console':'verbose',
            'browserstack.timezone':'London',
            'browserstack.networkLogs': true   // The name of test and name of build is being defined here
  },
  capabilities: [
    {
      device: 'iPhone 12',
      os_version: '14',
      browserName: 'safari'
    },
    {
      device: 'iPhone XS',
      os_version: '13',
      browserName: 'safari'
    },
    {
      device: 'iPhone XS',
      os_version: '12',
      browserName: 'safari'
    },
    {
      device: 'iPhone X',
      os_version: '11',
      browserName: 'safari'
     },
    {
      device: 'iPhone 7',
      os_version: '10',
      browserName: 'safari'
    },
    {
      device: 'iPhone SE',
      os_version: '11',
      browserName: 'safari'
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
