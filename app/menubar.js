'use strict';

var remote = require('remote');
var app = remote.require('app');
var BrowserWindow = remote.require('browser-window');
var Menu = remote.require('menu');
var dialog = remote.require('dialog');
var clipboard = require('clipboard');
var fs = require('fs');
var removeMd = require('remove-markdown');

var history = require('./history.json');

var myBrowserWindow = BrowserWindow.getFocusedWindow();
var editor = document.getElementsByTagName('markdown-editor')[0];
var historyPanel = document.getElementsByTagName('history-panel')[0];

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

function updateHistory(fileName){
  if (history[fileName]){
    history[fileName].push({
      time: Date.now().toString(),
      contents: editor.aceEditor.getValue(),
      preview: editor.aceEditor.getValue().substring(0,100) + '...'
    });
    var historyText = JSON.stringify(history, null, 2);
    fs.writeFile(__dirname + '/history.json', historyText, function(err){
      if (err){
        console.log(err);
      }
    });
  }else{
    history[fileName] = [
      {
        time: Date.now().toString(),
        contents: editor.aceEditor.getValue(),
        preview: editor.aceEditor.getValue().substring(0,100) + '...'
      }
    ];
    var initialHistoryText = JSON.stringify(history, null, 2);
    console.log(initialHistoryText);
    fs.writeFile(__dirname + '/history.json', initialHistoryText, function(err){
      if (err){
        console.log(err);
      }
    });
  }
}

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
          if (editor.savedText === null || editor.savedText === editor.aceEditor.getValue()){
            editor.filepath = null;
            editor.aceEditor.setValue('');
          }
        },
        accelerator: 'Command+N'
      },
      {
        label: 'New Window',
        click: function(){
          var newWindow = new BrowserWindow({width: 1200, height: 800, 'min-width': 800, 'min-height': 500, frame: false});
          // and load the index.html of the app.
          newWindow.loadUrl('file://' + __dirname + '/index.html');
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
            //update the history panel with the current filepath
            historyPanel.filepath = file;
            historyPanel.getHistoryItems();
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
              //update the history panel with the current filepath
              historyPanel.filepath = file;
              historyPanel.getHistoryItems();
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
                dialog.showSaveDialog({
                  defaultPath: 'untitled.html'
                },function(filename){
                  editor.exportToHTML(editor.aceEditor.getValue(), filename);
                });
              }
            }
          },
          {
            label: 'Styled HTML',
            click: function(){
              if (editor.aceEditor.getValue() !== ''){
                dialog.showSaveDialog({
                  defaultPath: 'untitled.html'
                }, function(filename){
                  editor.exportToStyledHTML(editor.aceEditor.getValue(), filename, __dirname + '/styles/marked-github.css');
                });
              }
            }
          },
          {
            label: 'PDF',
            click: function(){
              if (editor.savedText !== null){
                dialog.showSaveDialog({
                  defaultPath: 'untitled.pdf'
                },function(filename){
                  editor.exportToPdf(editor.aceEditor.getValue(), filename, __dirname + '/styles/marked-github.css');
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
            dialog.showSaveDialog({
              defaultPath: 'untitled.md'
            },function(fileName){
              editor.saveFile(fileName);
              // if the file already has a revision history
              updateHistory(fileName);
            });
          }else{
            editor.saveFile(editor.filepath);
            //if current editor text is not already in the last saved position
            updateHistory(editor.filepath);
          }
          // Get items in history for history menu
          historyPanel.getHistoryItems();
        },
        accelerator: 'Command+S'
      },
      {
        label: 'Save As',
        click: function(){
          dialog.showSaveDialog({
            defaultPath: 'untitled.md'
          },function(fileName){
            editor.saveFile(fileName);
            // if the file already has a revision history
            updateHistory(fileName);
          });
        },
        accelerator: 'Command+Shift+S'
      },
      {
        type: 'separator'
      },
      {
        label: 'History',
        click: function(){
          (!historyPanel.open) ? historyPanel.show() : historyPanel.hide();
        },
        accelerator: 'Command+H'
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
          var range = editor.aceEditor.getSelectionRange();
          editor.session.remove(range);
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
        label: 'Copy Plaintext',
        click: function(){
          var selection = editor.aceEditor.getCopyText();
          var plaintext = removeMd(selection);
          clipboard.writeText(plaintext);
        },
        accelerator: 'Command+Shift+C'
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
    label: 'Actions',
    submenu: [
      {
        label: 'Bold',
        click: function(){
          if (editor.aceEditor.isFocused){
            editor.bold();
          }
        },
        accelerator: 'Command+B'
      },
      {
        label: 'Italisize',
        click: function(){
          if (editor.aceEditor.isFocused){
            editor.italisize();
          }
        },
        accelerator: 'Command+I'
      },
      {
        label: 'Strikethrough',
        click: function(){
          if (editor.aceEditor.isFocused){
            editor.strikethrough();
          }
        },
        accelerator: 'Command+U'
      },
      {
        type: 'separator'
      },
      {
        label: 'Unordered List',
        click: function(){
          if (editor.aceEditor.isFocused){
            editor.formatBulleted();
          }
        }
      },
      {
        label: 'Ordered List',
        click: function(){
          if (editor.aceEditor.isFocused){
            editor.formatNumbered();
          }
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'Link',
        click: function(){
          if (editor.aceEditor.isFocused){
            editor.insertLink();
          }
        },
        accelerator: 'Command+L'
      },
      {
        label: 'Image',
        click: function(){
          if (editor.aceEditor.isFocused){
            editor.insertImage();
          }
        },
        accelerator: 'Command+Shift+I'
      },
      {
        label: 'Code Block',
        click: function(){
          if (editor.aceEditor.isFocused){
            editor.insertCodeBlock();
          }
        },
        accelerator: 'Command+K'
      },
      {
        type: 'separator'
      },
      {
        label: 'Headings',
        submenu: [
          {
            label: "Heading 1",
            click: function(){
              editor.insertHeader(1);
            },
            accelerator: 'Command+1'
          },
          {
            label: "Heading 2",
            click: function(){
              editor.insertHeader(2);
            },
            accelerator: 'Command+2'
          },
          {
            label: "Heading 3",
            click: function(){
              editor.insertHeader(3);
            },
            accelerator: 'Command+3'
          },
          {
            label: "Heading 4",
            click: function(){
              editor.insertHeader(4);
            },
            accelerator: 'Command+4'
          },
          {
            label: "Heading 5",
            click: function(){
              editor.insertHeader(5);
            },
            accelerator: 'Command+5'
          },
          {
            label: "Heading 6",
            click: function(){
              editor.insertHeader(6);
            },
            accelerator: 'Command+6'
          }
        ]
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
