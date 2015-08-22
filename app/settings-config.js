'use strict';

var fs = require('fs');
var editor = document.getElementsByTagName('markdown-editor')[0];
var iconSwitch = document.getElementsByTagName('icon-button-switch')[0];

// Watch for change to settings.json file (when settings are saved)

fs.watch(__dirname + '/settings.json', function () {
  var appSettings = require('./settings.json');
  var general = appSettings.general;

  if (general.autorendering === false){
    editor.autorender = false;
  }

  if (general.showWordCount === false){
    editor.wordCount = false;
  }

  var editorSettings = appSettings.editor;

  if (editorSettings.codeFolding === false){
    editor.wrap = false;
  }

  if (editor.lineNumbers === false){
    // remove line numbers
  }

  //TODO: Add settings to these

  // var markdown = appSettings.markdown;
  //
  // var theming = appSettings.theming;
  //
  // var outputStyles = appSettings.outputStyles;

});

// Settings to change on next start
window.addEventListener('WebComponentsReady', function(){
  // Checking General Settings:
  var appSettings = require('./settings.json');
  var general = appSettings.general;

  if (general.showRibbonOnStart === true){
    editor.noribbon = false;
    iconSwitch.icons =  'close menu';
  }
});
