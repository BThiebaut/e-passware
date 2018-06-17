'use strict';

var gulp = require('gulp');
var electron = require('electron-connect').server.create();

gulp.task('run', function () {

  // Start browser process
  electron.start();

  // Restart browser process
  gulp.watch('app.js', electron.restart);

  // Reload renderer process
  gulp.watch(['main.js', './app/*', './app/**/*.html', './app/**/*.js', './app/**/*.css'], electron.reload);
});