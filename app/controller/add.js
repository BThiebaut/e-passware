var electron = require('electron');
var BrowserWindow = electron.BrowserWindow;
const {ipcRenderer} = require('electron');
var config = require('../../config.json');

function requestList(){
  ipcRenderer.send('requestList');
}

function requestAdd(){
  ipcRenderer.send('requestAdd');
}

function proceed (){
    var site = document.getElementById('site');
    var identifiant = document.getElementById('identifiant');
    var passware = document.getElementById('passware');
    var isOK = site.value != "" && identifiant.value != "" && passware.value != "";
    if (site.value != "" && identifiant.value != "" && passware.value != ""){
      ipcRenderer.send('addEvent', { site : site.value, identifiant : identifiant.value, passware : passware.value });
    }
}
