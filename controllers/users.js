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

  var query = User.find({}, {_id:0, firstname:1, city:1, profession:1});

  if (req.query.city) {
    query = query.where('city').equals(req.query.city);
  }
  query.exec(parseQueryResult);

});

module.exports = router;
