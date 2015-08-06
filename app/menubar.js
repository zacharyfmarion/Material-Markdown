var remote = require('remote');
var app = remote.require('app');
var BrowserWindow = remote.require('browser-window');

var myBrowserWindow = BrowserWindow.getAllWindows()[0];

// Close app
document.getElementById('close').onclick = function(){
  app.quit();
}
// Minimize app
document.getElementById('minimize').onclick = function(){
  myBrowserWindow.minimize();
}
// Toggle fullscreen
document.getElementById('fullscreen').onclick = function(){
  myBrowserWindow.setFullScreen(!myBrowserWindow.isFullScreen());
}
