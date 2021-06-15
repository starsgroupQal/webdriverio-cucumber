#!/bin/sh

case $1 in

'edge')
  npm run build && npx del test-report && wdio ./dist/wdio.edge.conf.js
  ;;
'firefox')
  npm run build && npx del test-report && wdio ./dist/wdio.firefox.conf.js
  ;;
'ie')
  npm run build && npx del test-report && wdio ./dist/wdio.ie.conf.js
  ;;
'ios')
  npm run build && npx del test-report && wdio ./dist/wdio.ios.conf.js
  ;;
'safari')
  npm run build && npx del test-report && wdio ./dist/wdio.safari.conf.js
  ;;
'chrome')
  npm run build && npx del test-report && wdio ./dist/wdio.chrome.conf.js
  ;;
'android')
  npm run build && npx del test-report && wdio ./dist/wdio.android.conf.js
  ;;
*) ;;
esac

case $2 in
'open')
  npm run cypress:open
  ;;
'run')
  npm run cypress:run
  ;;
*) ;;
esac
