var electron = require('electron');
var BrowserWindow = electron.BrowserWindow;
const {ipcRenderer} = require('electron');
var remote = electron.remote;
var config = require('../../config.json');
var storage = require('../utils/storage');
var prompt = require('electron-prompt');
var resetClick = 0;
var resetTimeout = null;

function requestList(){
  ipcRenderer.send('requestList');
}

function requestAdd(){
  ipcRenderer.send('requestAdd');
}

function proceed(){
  storage.init();
  var callback = function(err, data){
    var container = document.getElementById('listContainer');
    console.log(data);
    
    var date = data.date;
    var sites = data.sites;
    var strHtml = '';
    $.each(sites, function(index, site){
      strHtml += '<tr>';
        strHtml += '<td>';
          strHtml += index;
        strHtml += '</td>';
        strHtml += '<td>';
          strHtml += site.identifiant;
        strHtml += '</td>';
        strHtml += '<td>';
          strHtml += '<button type="button" onclick="reveal(\''+index+'\');" class="btn btn-xs">Voir</button>';
        strHtml += '</td>';
      strHtml += '</tr>';
    });
    if (container !== null){
      container.innerHTML = strHtml;
      $('.datatable').DataTable({
        "pageLength": 10
      });
    }
  };
  var liste = storage.readStorage(callback);
  $('.navbar-brand').on('click', function(){
    resetClick++;
    if (resetTimeout !== null) clearTimeout(resetTimeout);
    resetTimeout = setTimeout(() => {
      if (resetClick > 4){
        ipcRenderer.send('requestReset');
      }else resetClick = 0;
    }, 300);
  });
}

function reveal(index){
  var callback = function(data){
    var crypter = remote.getGlobal('crypter');
    var passware = crypter.decrypt(data.passware);
    alert(passware);
  };

  storage.getStorage(index, callback);
}