const storage = require('electron-json-storage');
const os = require('os');
var storageKey = "applicationsData";
var self = this;

this.init = function(attempted){
  console.log('storage init');
  console.log(storage.getDataPath());
  
  attempted = typeof attempted != 'undefined';
  var ok = false;
  console.log('storage setdatapath');
  storage.setDataPath(os.tmpdir());
  storage.has(storageKey, function(error, hasKey) {
    console.log('storage haskey', hasKey);
    if (error) {
      console.log('storage error', error);
      throw error;
    }
    if (hasKey === false) {
      if (!attempted){
        console.log('storage attempt create');
        self.createStorage();
        self.init(true);
      }else {
        throw 'Impossible de créer le storage';
      }
    }
  });
};

this.createStorage = function(){
  console.log('storage create');
  var template = {
    date : null,
    sites : {}
  };
  storage.set(storageKey, template, function(error) {
    if (error) throw error;
    console.log('storage created');
  });
};

this.writeStorage = function(site, identifiant, passware){
  
  storage.get(storageKey, function(error, data){
    if (error){
      throw error;
    }else {
      console.log('writestorage', data);
      data.sites[site] = {
        identifiant : identifiant,
        passware : passware
      };
      data.date = new Date().getTime();
      storage.set(storageKey, data, function(error) {
        if (error) throw error;
      });
    }

  });
};

this.readStorage = function(callback){
  storage.get(storageKey, function(error, data){
    console.log('readStorage');
    if (error){
      throw error;
    }else {
      callback(error, data);
      return data;
    }
  });
};

this.getStorage = function(index, callback){
  self.readStorage(function(err, odata){
    callback(odata.sites[index]);
  });
};

this.clearStorage = function(){
  storage.clear(function(error) {
    if (error) throw error;
  });
}