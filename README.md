# e-passware

Un petit gestionnaire de mot de passe en electron

## Installation

```
$ npm install
```

## Run Dev

Gulp:

```
$ gulp run
```


NPM:

```
$ npm start
```

## Deploiement

* Dans main.js : 
  - commenter `require('electron-debug')();`
  - commenter `const client = require('electron-connect').client;`
  - commenter toutes les références à client
  
* Dans app/views : 
  - Supprimer les lignes contenant
  ```
  <!-- build:remove -->
  <!-- Connect to server process -->
  <script>require('electron-connect').client.create()</script>
  <!-- end:build -->
  ```
* Jouer la commande `$ electron-packager <sourcedir> <appname> --platform=<platform> --arch=<arch> [optional flags...]`
Exemple : `electron-packager . --all` buildera pour toutes les plate-formes disponibles (linux, mac, windows, en x32 et x64)

TODO : Trouver un meilleur moyen de build sans avoir a commenter des trucs...
