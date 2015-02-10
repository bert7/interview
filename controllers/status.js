var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var states = ['disconnected', 'connected', 'connecting', 'disconnecting'];

router.get('/', function(req, res, next) {
  var statusResult = {
     mongodb: {
          status: states[mongoose.connection.readyState] || 'unknown state'
     }
  }
  res.send(statusResult);
});

module.exports = router;
