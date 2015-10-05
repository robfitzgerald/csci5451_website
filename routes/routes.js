var express = require('express');
var path = require('path');
// app/routes.js
module.exports = function (app, passport) {


  app.get('/', isLoggedIn, function (req, res) {
    res.render('index');
  });


  app.get('/people', isLoggedIn, function (req, res) {
    res.render('people');
  });


  app.get('/login', function (req, res) {
    res.render('login', {message: req.flash('loginMessage')});
  });


  app.post('/login',
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true
    })
  );


  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  app.get('/resources/assignments', isLoggedIn, function(req, res, next) {
    res.json(require('../resources/assignments.json'));
  });

  app.get('/resources/articles', isLoggedIn, function(req, res, next) {
    res.json(require('../resources/articles.json'));
  });

  app.get('/resources/notebooks', isLoggedIn, function(req, res, next) {
    res.json(require('../resources/notebooks.json'));
  });

  app.get('/resources/people', isLoggedIn,  function(req, res, next) {
    res.json(require('../resources/people.json'));
  });

  app.get('/resources/slides', isLoggedIn, function(req, res, next) {
    res.json(require('../resources/slides.json'));
  });

  // @TODO: this stuff
  // we want to move the resources to the server and use something like a regex to get the calls
  // perhaps you should apply your thinking for the deveco solution to this.
  // one directory for all resources.  all calls are for resources/files with 1:1 naming to server path

  //app.get('/resources/:type/:name', isLoggedIn, function(req, res, next) {
  //  var options = {
  //    root: __dirname + '/public/'
  //  };
  //  var fileName = 'resources/' + req.param.type + '/' + req.param.name;
  //  res.sendFile(fileName, options, function(err) {
  //    if (err) {
  //      console.log(err);
  //      res.status(err.status).end();
  //    }
  //    else {
  //      console.log('Sent:', fileName);
  //    }
  //  })
  //});

  //app.use('*', isLoggedIn, express.static(path.join(__dirname, 'public')));

};



// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/login');
}