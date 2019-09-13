// These are modules that are installed from NPM and are imported into this file
var express = require('express');
var router = express.Router();

// GET home page
// http://localhost:3000/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;