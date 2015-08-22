var remote = require('remote');
var BrowswerWindow = remote.require('browser-window');
var fs = require('fs');
// Window Buttons
var settingsClose = document.querySelector('#settings-close');
var settingsMinimize = document.querySelector('#settings-minimize');
var settingsFullscreen = document.querySelector('#settings-fullscreen');
// App scope & app settings
var scope = document.querySelector('template[is="dom-bind"]');
<<<<<<< HEAD
var appSettings = document.getElementsByTagName('app-settings')[0];

window.on('WebComponentsReady', function(){
  appSettings.readSettings();
=======
var settings = document.getElementsByTagName('app-settings')[0];

window.addEventListener('WebComponentsReady', function(){
  // Read settings and load these settings into the settings window
  settings.readSettings();
>>>>>>> 55e06dfee3b818b87d4550712fc80d5df834daa5
});

// Managing closing etc of the settings window

settingsClose.addEventListener('click', function(){
  // Save changes made to settings
<<<<<<< HEAD
  appSettings.writeSettings();
=======
  settings.writeSettings();
>>>>>>> 55e06dfee3b818b87d4550712fc80d5df834daa5
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
<<<<<<< HEAD
},false);
=======
},false);
>>>>>>> 55e06dfee3b818b87d4550712fc80d5df834daa5
