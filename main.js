const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const ipcMain = electron.ipcMain;
const addView = require('./app/controller/add');
const listeView = require('./app/controller/list');
const crypter = require('./app/utils/crypter');
const storage = require('./app/utils/storage');
const client = require('electron-connect').client;
const prompt = require('electron-prompt');
const config = require('./config.json');

global.crypter = null;

require('electron-debug')();

storage.init();

let mainWindow;
let crypterInstance;

function createWindow(){
  mainWindow = new BrowserWindow({ width: config.width, height: config.height });
  
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  prompt({
    title: 'Mot de passe',
    inputAttrs: {
        type: 'password'
    },
    type: 'input'
  })
  .then((r) => {
      console.log('create crypter instance');
      crypterInstance = new crypter.Crypter(r);
      global.crypter = crypterInstance;
      mainWindow.loadFile('./app/views/liste.html');
  })
  .catch(console.error);
  client.create(mainWindow);
  
 }
/* Evenements application */
app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('addEvent', function(event, datas){
  console.log('addEvent catch');
  var hashed = crypterInstance.encrypt(datas.passware);
  storage.writeStorage(datas.site, datas.identifiant, hashed);
  applyListe();
});

ipcMain.on('requestList', function(){
  applyListe();
});

ipcMain.on('requestAdd', function(){
  applyAdd();
});

ipcMain.on('requestReset', function(){
  electron.dialog.showMessageBox({
    type: 'warning',
    title: 'Confirmation',
    message: 'Voulez-vous vraiment vider la base local de passware ?',
    buttons: ['Oui', 'Annuler']
  }, function(result){
    if (result === 0){
      storage.clearStorage();
      applyListe();
    }
  });
});

/* Actions menu */

function applyListe(){
  console.log('applylist');
  mainWindow.loadFile('./app/views/liste.html');
}

function applyAdd(){
  console.log('applyadd');
  mainWindow.loadFile('./app/views/add.html');
}

function applySearch(){

}

/* Menu application */
const template = [
  {
      label: 'E-Passware',
      submenu: [
          {
              label: 'Ajouter',
              click: applyAdd,
          },
          {
              label: 'Liste',
              click: applyListe,
          }
      ]
  }
];
console.log('build menu');
const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);