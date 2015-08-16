var remote = require('remote');
var appSettings = require('./settings.json');
var BrowswerWindow = remote.require('browser-window');
var fs = require('fs');
// Window Buttons
var settingsClose = document.querySelector('#settings-close');
var settingsMinimize = document.querySelector('#settings-minimize');
var settingsFullscreen = document.querySelector('#settings-fullscreen');
// App scope
var scope = document.querySelector('template[is="dom-bind"]');

// Toggle buttons
var showRibbon = document.querySelector('#showRibbonOnStart'), autorendering = document.querySelector('#autorenderOnStart'),
codeFolding = document.querySelector('#codeFolding'), lineNumbers = document.querySelector('#showLineNumbers');

// Setting the values in settings to initially match those in settings.json
// ////// GENERAL
autorendering.checked = appSettings.general.autorendering;
showRibbon.checked = appSettings.general.showRibbonOnStart;

// ////// Editor
codeFolding.checked = appSettings.editor.codeFolding;
lineNumbers.checked = appSettings.editor.lineNumbers;

// ////// Markdown
// nothing for right now...one the parser is changed to remarkable you can make it exstensible

// ////// Theming
// still nothing...

// Managing closing etc of the settings window

settingsClose.addEventListener('click', function(){
  // Save changes made to settings
  fs.writeFileSync(__dirname + '/settings.json', JSON.stringify(appSettings));
  // Settings window
  var settingsWindow = BrowswerWindow.getFocusedWindow();
  settingsWindow.close();
},false);

settingsMinimize.addEventListener('click', function(){
  // Settings window
  var settingsWindow = BrowswerWindow.getFocusedWindow();
  settingsWindow.minimize();
},false);

settingsFullscreen.addEventListener('click', function(){
  // Settings window
  var settingsWindow = BrowswerWindow.getFocusedWindow();
  settingsWindow.setFullScreen(!settingsWindow.isFullScreen());
},false);

// Event Listeners for state changes on any of the paper-toggle-buttons...
// These changes will be applied to the settings.json file on setttings close

// General
autorendering.addEventListener('change', function(){
  appSettings.general.autorendering = autorendering.checked;
});

showRibbon.addEventListener('change', function(){
  appSettings.general.showRibbonOnStart = showRibbon.checked;
});

// Editor
codeFolding.addEventListener('change', function(){
  appSettings.editor.codeFolding = codeFolding.checked;
});

lineNumbers.addEventListener('change', function(){
  appSettings.editor.lineNumbers = lineNumbers.checked;
});

// Markdown

// Theming
