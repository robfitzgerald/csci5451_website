// app/routes.js
module.exports = function (app, passport) {

  // =====================================
  // HOME PAGE (with login links) ========
  // =====================================
  app.get('/', isLoggedIn, function (req, res) {
    res.render('index'); // load the index
  });

  // =====================================
  // LOGIN ===============================
  // =====================================
  // show the login form
  app.get('/login', function (req, res) {

    // render the page and pass in any flash data if it exists
    res.render('login', {message: req.flash('loginMessage')});
  });

  // process the login form
  app.post('/login',
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true
    })
  );

  // =====================================
  // LOGOUT ==============================
  // =====================================
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

  app.get('/resources/:type/:name', isLoggedIn, isLoggedIn, function(req, res, next) {
    var options = {
      root: __dirname + '/public/'
    };
    var fileName = 'resources/' + req.param.type + '/' + req.param.name;
    res.sendFile(fileName, options, function(err) {
      if (err) {
        console.log(err);
        res.status(err.status).end();
      }
      else {
        console.log('Sent:', fileName);
      }
    })
  });

};


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/login');
}