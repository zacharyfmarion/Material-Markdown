var remote = require('remote');
var appSettings = require('./settings.json');
var BrowswerWindow = remote.require('browser-window');
var fs = require('fs');
// Window Buttons
var settingsClose = document.querySelector('#settings-close');
var settingsMinimize = document.querySelector('#settings-minimize');
var settingsFullscreen = document.querySelector('#settings-fullscreen');

// Toggle buttons
var showRibbonOnStart = document.querySelector('#showRibbonOnStart');

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

showRibbonOnStart.addEventListener('change', function(){
  appSettings.general.showRibbonOnStart = showRibbonOnStart.checked;
});
