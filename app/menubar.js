var remote = require('remote');
var app = remote.require('app');
var BrowserWindow = remote.require('browser-window');
var Menu = remote.require('menu');

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

// Update styles when custom element event is fired, signifying style change
stylesEditor.addEventListener("styles-changed", function(){
  // reload window
  myBrowserWindow.reload();
}, false);

// Building the Application Menu
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
          // Need a file dialog opener for node...maybe a polymer element?
        },
        accelerator: 'Command+Shift+N'
      },
      {
        label: 'Open',
        click: function(){
          // Need a file dialog opener for node...maybe a polymer element?
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
