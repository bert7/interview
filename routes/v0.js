var app = require('express')();
var users = require('../controllers/users');
var status = require('../controllers/status');
var auth = require('../controllers/auth');
var folder = require('../controllers/folder');

app.use('/users', users);
app.use('/status', status);
app.use('/auth', auth);
app.use('/folder', folder);

module.exports = app;
