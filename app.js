var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var models = require('./models');
var fixtures = require('./models/fixtures');

var home = require('./controllers/home');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Versioning handler
var versions = {'Version 0': '/v0', 'Version 1': '/v1'};
for (var ct in versions) {
    app.use(versions[ct], require('./routes' + versions[ct]));
}

app.use('/', home);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

mongoose.connection.on("open", function(ref) {
  console.log("Connected to mongo server.");
});

mongoose.connection.on("error", function(err) {
  console.log("Could not connect to mongo server!");
  console.log(err);
  // TODO: Load an error page for the user
});

var options = {
  db: { native_parser: true },
  server: { poolSize: 1,  socketOptions: { keepAlive: 1 }},
  replset: { rs_name: 'myReplicaSetName' },
  user: '',
  pass: ''
}

module.exports = app;
mongoose.connect('mongodb://localhost/interviewDB', options);
