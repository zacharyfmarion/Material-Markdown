'use strict';

var remote = require('remote');
var app = remote.require('app');
var BrowserWindow = remote.require('browser-window');
var Menu = remote.require('menu');
var dialog = remote.require('dialog');
var clipboard = require('clipboard');

var myBrowserWindow = BrowserWindow.getFocusedWindow();
var stylesEditor = document.getElementsByTagName('styles-editor')[0];
var editor = document.getElementsByTagName('markdown-editor')[0];

// Close app
document.getElementById('close').onclick = function(){
  if ((editor.savedText === editor.aceEditor.getValue()) || (editor.savedText === null && editor.aceEditor.getValue() === '')){
    myBrowserWindow.close();
  }else{
    var response = dialog.showMessageBox({
      type: 'question',
      buttons: ['Yes', 'No'],
      message: 'You have unsaved changes. Do you wish to proceed?',
      title: 'Unsaved changes'
    });
    if (response === 0){
      myBrowserWindow.close();
    }else{
      return;
    }
  }
};
// Minimize app
document.getElementById('minimize').onclick = function(){
  myBrowserWindow.minimize();
};
// Toggle fullscreen
document.getElementById('fullscreen').onclick = function(){
  myBrowserWindow.setFullScreen(!myBrowserWindow.isFullScreen());
};
// Open settings
document.getElementById('settings').onclick = function(){
  var settingsWindow = new BrowserWindow({width: 800, height: 500, 'min-width': 800, 'min-height': 500, frame: false});
  // and load the index.html of the app.
  settingsWindow.loadUrl('file://' + __dirname + '/settings.html');
};

// Update styles when custom element event is fired, signifying style change
stylesEditor.addEventListener('styles-changed', function(){
  // reload window
  myBrowserWindow.reload();
}, false);

// Building the Application Menu...TODO: move this to a json file and call from
// entry.js on app ready
var menu = Menu.buildFromTemplate([
  {
    label: 'Electron',
    submenu: [
      {
        label: 'Preferences',
        click: function(){
          var settingsWindow = new BrowserWindow({width: 800, height: 500, 'min-width': 800, 'min-height': 500, frame: false});
          // and load the index.html of the app.
          settingsWindow.loadUrl('file://' + __dirname + '/settings.html');
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'Quit',
        click: function(){
          // TODO: Get this to work
          if ((editor.savedText === editor.aceEditor.getValue()) || (editor.savedText === null && editor.aceEditor.getValue() === '')){
            app.quit();
          }else{
            var response = dialog.showMessageBox({
              type: 'question',
              buttons: ['Yes', 'No'],
              message: 'You have unsaved changes. Do you wish to proceed?',
              title: 'Unsaved changes'
            });
            if (response === 0){
              app.quit();
            }else{
              return;
            }
          }
        },
        accelerator: 'Command+Q'
      }
    ]
  },
  {
    label: 'File',
    submenu: [
      {
        label: 'New',
        click: function(){
          // Depends on if you are going to use tabs and routing or if this is a
          // single window affair
        },
        accelerator: 'Command+N'
      },
      {
        label: 'New Window',
        click: function(){

        },
        accelerator: 'Command+Shift+N'
      },
      {
        label: 'Open',
        click: function(){
          //TODO: Handle canceling the file dialog
          if (editor.savedText === null || editor.savedText === editor.aceEditor.getValue()){
            var files = dialog.showOpenDialog({ properties: ['openFile']});
            var file = files[0];
            editor.setFilePath(file);
          }else{
            var response = dialog.showMessageBox({
              type: 'question',
              buttons: ['Yes', 'No'],
              message: 'You have unsaved changes. Do you wish to proceed?',
              title: 'Error opening file'
            });
            // If they respond with Yes
            if (response === 0){
              var files = dialog.showOpenDialog({ properties: ['openFile']});
              var file = files[0];
              editor.setFilePath(file);
            }else{
              return;
            }
          }

        },
        accelerator: 'Command+O'
      },
      {
        label: 'Export as',
        submenu: [
          {
            label: 'HTML',
            click: function(){
              if (editor.aceEditor.getValue() !== ''){
                dialog.showSaveDialog(function(filename){
                  editor.exportToHTML(editor.aceEditor.getValue(), filename);
                });
              }
            }
          },
          {
            label: 'PDF',
            click: function(){
              if (editor.savedText !== null){
                dialog.showSaveDialog(function(filename){
                  editor.exportToPdf(editor.aceEditor.getValue(), filename, 'dist/styles/test.css');
                });
              }
            }
          }
        ]
      },
      {
        type: 'separator'
      },
      {
        label: 'Save',
        click: function(){
          if (editor.filepath === null){
            dialog.showSaveDialog(function(filename){
              editor.saveFile(filename);
            });
          }else{
            editor.saveFile(editor.filepath);
          }
        },
        accelerator: 'Command+S'
      },
      {
        label: 'Save As',
        click: function(){

        }
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        click: function(){
          editor.undo();
        },
        accelerator: 'Command+Z'
      },
      {
        label: 'Redo',
        click: function(){
          editor.redo();
        },
        accelerator: 'Command+Y'
      },
      {
        type: 'separator'
      },
      {
        label: 'Cut',
        click: function(){
          var selection = editor.aceEditor.getCopyText();
          // delete editor text
          clipboard.writeText(selection);
        },
        accelerator: 'Command+X'
      },
      {
        label: 'Copy',
        click: function(){
          // Add a check for if the editor is focused...
          var selection = editor.aceEditor.getCopyText();
          clipboard.writeText(selection);
        },
        accelerator: 'Command+C'
      },
      {
        label: 'Paste',
        click: function(){
          // Add a check for if the editor is focused...
          var text = clipboard.readText();
          editor.aceEditor.insert(text);
        },
        accelerator: 'Command+V'
      },
      {
        label: 'Select All',
        click: function(){
          editor.aceEditor.selectAll();
        },
        accelerator: 'Command+A'
      },
      {
        type: 'separator'
      },
      {
        label: 'Find',
        click: function(){
          // editor.aceEditor.find();
        },
        accelerator: 'Command+F'
      }
    ]
  },
  {
    label: 'Developer',
    submenu: [
      {
        label: 'Reload',
        click: function(){
          myBrowserWindow.reload();
        },
        accelerator: 'Command+R'
      },
      {
        label: 'Open DevTools',
        click: function(){
          var currentBrowserWindow = BrowserWindow.getFocusedWindow();
          currentBrowserWindow.openDevTools();
        },
        accelerator: 'Command+T'
      }
    ]
  }
]);
// Attach menu to application
Menu.setApplicationMenu(menu);
