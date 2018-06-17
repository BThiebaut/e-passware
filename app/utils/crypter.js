var CryptoJS = require("crypto-js");
var baseKey = require("../../storage/basekey.json");

this.Crypter = function(appPassware){
  this.appPassware = appPassware;
  console.log('crypter instancied');
  var self = this;

  var getFullKey = function(){
    console.log('crypter getfullkey', self.appPassware);
    var fullKey = CryptoJS.HmacSHA1(baseKey.key, self.appPassware);
    console.log('fullkey', fullKey.toString());
    
    return fullKey.toString();
  };

  this.encrypt = function(passware){
    console.log('crypter encrypt');
    var fullKey = getFullKey();
    var encryptedP = CryptoJS.AES.encrypt(passware, fullKey);
    return encryptedP.toString();
  };

  this.decrypt = function(passware){
    console.log('crypter decrypt', passware);
    var fullKey = getFullKey();
    var decryptedBytes = CryptoJS.AES.decrypt(passware, fullKey);
    console.log('decrypted', decryptedBytes);
    var plaintext = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return plaintext;
  }


};