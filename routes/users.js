var express = require('express');
var router = express.Router();
var knex = require('../knex');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user');
});



module.exports = router;
