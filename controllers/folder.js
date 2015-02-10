var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

router.get('/', function(req, res, next) {

  var fileList = [];
  var startPath = './downloads';
  var userPath = path.relative(startPath, path.join(startPath, req.query.target || ''));
  var finalPath = path.join(startPath, userPath);

  fs.readdir(finalPath, function(err, files) {

    if (err || '..'.indexOf(finalPath) == 0) {
      res.status(403).send(err);
    }
    else {

      files.map(function (file) {
          return path.join(finalPath, file);
      } )
      .filter(function (file) {
        var folderContent =  fs.statSync(file);
        if (req.query.showfolders && req.query.showfolders == 'true') {
          return folderContent;
        }
        return folderContent.isFile();

      }).forEach(function (file) {
        fileList.push(file);
      });

      if (fileList.length <= 0) {
        res.status(204).send(); // Nothing to send back
      }
      else {
        res.send(fileList);
      }
    }

  });
});

module.exports = router;
