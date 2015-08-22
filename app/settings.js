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
var appSettings = document.getElementsByTagName('app-settings')[0];

window.on('WebComponentsReady', function(){
  appSettings.readSettings();
});

// Managing closing etc of the settings window

settingsClose.addEventListener('click', function(){
  // Save changes made to settings
  appSettings.writeSettings();
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