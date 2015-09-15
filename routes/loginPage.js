var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('login');
});
router.post('/',
  passport.authenticate('local', { successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true })
);



module.exports = router;
