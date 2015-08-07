'use strict';

var remote = require('remote');
var app = remote.require('app');
var BrowserWindow = remote.require('browser-window');
var Menu = remote.require('menu');
var dialog = remote.require('dialog');

var myBrowserWindow = BrowserWindow.getAllWindows()[0];
var stylesEditor = document.getElementsByTagName('styles-editor')[0];
var editor = document.getElementsByTagName('markdown-editor')[0];

// Close app
document.getElementById('close').onclick = function(){
  if (editor.savedText === editor.aceEditor.getValue()){
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
};
// Minimize app
document.getElementById('minimize').onclick = function(){
  myBrowserWindow.minimize();
};
// Toggle fullscreen
document.getElementById('fullscreen').onclick = function(){
  myBrowserWindow.setFullScreen(!myBrowserWindow.isFullScreen());
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
        label: 'Blah',
        click: function(){
          console.log('blah');
        }
      },
      {
        label: 'Preferences',
        click: function(){
          console.log('preferences');
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'Quit',
        click: function(){
          // TODO: Get this to work
          if ((editor.savedText === editor.aceEditor.getValue()) || (editor.savedText === null && editor.acedEditor.getValue() === '')){
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
              // look at mat markdown for how to do this
            }
          },
          {
            label: 'PDF',
            click: function(){
              if (editor.savedText !== null){
                dialog.showSaveDialog(function(filename){
                  editor.convertToPdf(editor.savedText, filename, 'dist/styles/test.css');
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
    //TODO: Implement these methods
    label: 'Edit',
    submenu: [
      {
        label: 'Cut',
        click: function(){
          // Implement cut
        },
        accelerator: 'Command+X'
      },
      {
        label: 'Copy',
        click: function(){
          // Implement copy
        },
        accelerator: 'Command+C'
      },
      {
        label: 'Paste',
        click: function(){
          // Implement paste
        },
        accelerator: 'Command+V'
      },
      {
        label: 'Select All',
        click: function(){
          // Implement select all
        },
        accelerator: 'Command+A'
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
          myBrowserWindow.openDevTools();
        },
        accelerator: 'Command+T'
      }
    ]
  }
]);
// Attach menu to application
Menu.setApplicationMenu(menu);
