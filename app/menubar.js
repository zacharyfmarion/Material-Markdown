var remote = require('remote');
var app = remote.require('app');
var BrowserWindow = remote.require('browser-window');
var Menu = remote.require('menu');
var dialog = remote.require('dialog');

var myBrowserWindow = BrowserWindow.getAllWindows()[0];
var stylesEditor = document.getElementsByTagName('styles-editor')[0];

// Close app
document.getElementById('close').onclick = function(){
  app.quit();
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

// Building the Application Menu...move this to a json file and then
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
          app.quit();
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
          // Clear editor if all changes are saved (check for an attribute)

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
          var editor = document.getElementsByTagName('markdown-editor')[0]; var hasFilePath;
          (editor.filepath === null) ? hasFilePath = false : hasFilePath = true;
          var files = dialog.showOpenDialog({ properties: ['openFile']});
          var file = files[0];
          if (hasFilePath !== null){
            editor.setFilePath(file);
          }else{
            // dialog.showMessageBox({
            //   type: 'error',
            //   message: 'I need to add a isUpToDate attribute to markdwon-editor',
            //   title: 'Error opening file'
            // });
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
              // ditto
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
          var editor = document.getElementsByTagName('markdown-editor')[0];
          if (editor.filepath === null){
            dialog.showSaveDialog(function(filename){
              editor.saveFile(filename);
            });
          }else{
            editor.saveFile(editor.filepath);
          };
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
