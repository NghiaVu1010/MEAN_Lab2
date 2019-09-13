// Require Node's built-in Modules
var express = require('express');
var router = express.Router();
const authorization = require('./../utils/auth');
const fs = require('fs');

// Create an anonymous function thats assigned to getUsers to READ linked file
var getUsers = () => {
  try {
      var usersString = fs.readFileSync('data/users.json');
      return JSON.parse(usersString);
  } catch (err) {
      return err;
  }
};

// Persist data in file
var saveUser = (users) => {
  fs.writeFileSync('data/users.json', JSON.stringify(users));      
};

// Insert a user
var insertUser = (username, email, password) => {
  // Grab all the users from file and sets it to users
  var users = getUsers();
  
  // Create constructor for user
  var user = {
    username,
    email,
    password
  };
  
  // Ensure no dups
  var duplicateUsers = users.filter((user) => {
      return user.username === username;
  });
  
  // Persist the user
  if (duplicateUsers.length === 0) {
      users.push(user);
      saveUser(users);
      return user;
  }
};

// Get a single user by username
var getUser = (username) => {
  // Grab all the users from file and sets it to users
  var users = getUsers();
  // ES6 single-line command
  var filteredUsers = users.filter((user) => user.username === username);
  return filteredUsers[0];
};

// GET the login page and render it - WIP
// http://localhost:3000/users/login
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

// POST the user login (check to see if exists)
// http://localhost:3000/users/login
router.post('/login', function(req, res, next) {
  // Grab all the users from file and sets it to users
  var users = getUsers();

  var username = req.body.username;
  var password = req.body.password;

  // Check authorization of the credentials
  if (authorization.auth.authorize(username, password, users)) {
      res.statusCode = 200;
  } 
  else {
      res.statusCode = 403; // Forbidden
  }
  res.end();
});

// GET the registration page and render it - WIP
// http://localhost:3000/users/register
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

// POST the registration account - WIP
// http://localhost:3000/users/register
router.post('/register', function(req, res, next) {
  // Get user data from form
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;

  // Reference to insert user is assigned to user 
  var user = insertUser(username, email, password);

  // Use the results to display success or failure
  if (user) {
    //res.redirect('/users/login');
    console.log(`Register: ${username}, ${email}, ${password}`);
    res.statusCode = 200;
    res.end();
  } 
  else {
    next(new Error('RegistrationFailedError', false));
    res.statusCode = 403; // Forbidden
    res.end();
  }
});

module.exports = router;