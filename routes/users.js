var express = require('express');
var router = express.Router();
const authorization = require('./../utils/auth');
//var user_persist = require('./../utils/user_persist');

// GET the login page and render it
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

// POST 
router.post('/login', function(req, res, next) {
  // get user data from form
  var email = req.body.email;
  var password = req.body.password;
  if (authorization.auth.authorize(email, password)) {
      res.statusCode = 200;
  } 
  else {
      res.statusCode = 403; // Forbidden
  }
  res.end();
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

router.post('/register', function(req, res, next) {
  // get user data from form
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;

  log.info(`Register: ${username}, ${email}, ${password}`);

  var user = user_persist.addUser(username, email, password);
  if (user) {
    res.redirect('/users/login');
  } else {
    next(new Error('RegistrationFailedError', false));
  }
});

module.exports = router;