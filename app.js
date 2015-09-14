var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Users = require('./users.js');
var session = require('express-session');
var connectFlash = require('connect-flash');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// config section
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// authentication section
app.use(session({
  secret: 'look at this graph',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(connectFlash());
passport.use('local', new LocalStrategy(
  function(username, password, done) {
    if (Users[0].username == username) {
      if (Users[0].password == password) {
        return done(null, {username:username, id: username});
      }
      else {
        return done(null, false, {message: 'Incorrect password.'});
      }
    }
    else {
      return done(null, false, {message: 'Incorrect username.'});
    }
}));
passport.serializeUser(function(user, done) {
  done(null, Users[0].id);
});
passport.deserializeUser(function(id, done) {
  done(null, Users[0]);
});
var routes = require('./routes/routes.js')(app,passport);
module.exports = app;
