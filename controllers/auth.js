var express = require('express');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var router = express.Router();

router.post('/', function(req, res, next) {
  var token = {username: req.body.username, password: req.body.password};
  if (token.username && token.password) {
  User.findOne({'firstname' : token.username, 'password' : token.password})
  .exec(function(err, result) {
      if (err || !result) {
        res.status(401).send(err || 'Authentication failed : Name and password do not match.<br/><br/><a href="/">Back to main page.</a>');
      }
      else {
       res.status(200).send('Welcome ' + token.username + ' authentication success.<br/><br/><a href="/">Back to main page.</a>');
      }
    });
  }
  else {
    throw new Error("Invalide token");
  }
});

router.get('/login', function(req, res, next) {
  res.render('login', {title:'Auth tester'});
})

module.exports = router;
