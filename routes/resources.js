var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/assignments', function(req, res, next) {
  res.json(require('../resources/assignments.json'));
});

router.get('/articles', function(req, res, next) {
  res.json(require('../resources/articles.json'));
});

router.get('/notebooks', function(req, res, next) {
  res.json(require('../resources/notebooks.json'));
});

router.get('/people', function(req, res, next) {
  res.json(require('../resources/people.json'));
});

router.get('/slides', function(req, res, next) {
  res.json(require('../resources/slides.json'));
});

module.exports = router;
