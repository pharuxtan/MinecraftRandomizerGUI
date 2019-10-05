const electron = require("electron");
const url = require("url");
const path = require("path");

const {app, BrowserWindow} = electron;

let mainWindow;

app.on('ready', function(){
  mainWindow = new BrowserWindow({
    width: 750,
    height: 500,
    webPreferences: {
        nodeIntegration: true
    },
    backgroundColor: '#ffffff'
  });

  mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'app', 'app.html'),
      protocol: 'file:',
      slashes: true
  }));

  mainWindow.setMenu(null);
  mainWindow.setResizable(true);

  mainWindow.on('closed', () => {
      mainWindow = null;
  });
});
