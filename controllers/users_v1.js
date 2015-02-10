var express = require('express');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {

  var parseQueryResult = function (err, result) {
    if (req.query.group) {

      var groupResult = {};

      for (var ct in result) {

        if (!(result[ct].profession in groupResult)) {
          groupResult[result[ct].profession] = [];
        }

        groupResult[result[ct].profession].push(result[ct]);

      };
      result = groupResult;
    }
    res.send(result);
  }

  var query = User.find();

  if (req.query.city) {
    query = query.where('city').equals(req.query.city);
  }
  if (req.query.limit) {
    query = query.limit(req.query.limit);
  }
  if (req.query.skip) {
    query = query.skip(req.query.skip);
  }
  query.exec(parseQueryResult);

});

module.exports = router;
