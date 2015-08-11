var appSettings = require('./settings.json');
var editor = document.getElementsByTagName('markdown-editor')[0];
var iconSwitch = document.getElementsByTagName('icon-button-switch')[0];

// Checking General Settings:
var general = appSettings.general;

if (general.autorendering === false){
  editor.autorender = false;
}

if (general.showRibbonOnStart === true){
  editor.noribbon = false;
  iconSwitch.icons =  'close menu';
}

var editorSettings = appSettings.editor;

if (editorSettings.codeFolding === false){
  editor.wrap = false;
}

if (editor.lineNumbers === false){
  // remove line numbers
}

//TODO: Add settings to these

var markdown = appSettings.markdown;

var theming = appSettings.theming;
