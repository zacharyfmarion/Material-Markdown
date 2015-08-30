'use strict';

var fs = require('fs');
var editor = document.getElementsByTagName('markdown-editor')[0];
var iconSwitch = document.getElementsByTagName('icon-button-switch')[0];

// Change settings on next start
window.addEventListener('WebComponentsReady', function(){
  // Checking General Settings:
  var appSettings = require('./settings.json');

  // for first time use:
  if (appSettings.isFirstUse){
    editor.filepath = __dirname + '/welcome.md';
    appSettings.isFirstUse = false;
    fs.writeFile(__dirname + '/settings.json', JSON.stringify(appSettings, null, 2), function(err){
      if (err) {throw err;}
      console.log('first use of MM');
    });
  }

  var general = appSettings.general;
  var editorSettings = appSettings.editor;

  // General
  if (general.showRibbonOnStart){
    editor.noribbon = false;
    iconSwitch.icons =  'close menu';
  }
  editor.autorender = general.autorendering;
  editor.wordCount = general.showWordCount;

  // Editor
  editor.wrap = editorSettings.codeFolding;
  editor.showLineNumbers = editorSettings.lineNumbers;
});
