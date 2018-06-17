# e-passware

Un petit gestionnaire de mot de passe avec electronJS

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
* Lancer la commande 
`$ electron-packager <sourcedir> <appname> --platform=<platform> --arch=<arch> [optional flags...]`
Exemple : `$ electron-packager . --all` buildera pour toutes les plate-formes disponibles (linux, mac, windows, en x32 et x64)

TODO : Trouver un meilleur moyen de build sans avoir a commenter des trucs...

## Fonctionnement
L'application demande un mot de passe au démarrage, ce mot de passe est en fait votre clé de chiffrage. La vrai clé utilisée pour chiffrer les données est calculée à partir de ce que vous entrez dans ce champs.
Donc si le mot de passe n'est pas bon, vous ne pourrez pas visualiser les mots de passes enregistrés avec cette clé.
Ca permet de se passer de système d'authentification, et aussi d'avoir plusieurs mots de passe pour pouvoir révèler plusieurs données différentes.
Exemple : le mot de passe "azerty" permet de révéler les mots de passe de 1 à 5, et le mot de passe "ARTHUURQUILLERE" révèle ceux de 6 à 12 etc... 
