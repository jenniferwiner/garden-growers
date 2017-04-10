var express = require('express');
var router = express.Router();
var knex = require('../knex');
var jwt = require('jsonwebtoken');
/* GET users listing. */
router.get('/', function(req, res, next) {
  knex('users')
  .join('user_plants', 'users.id', '=', 'user_plants.user_id')
  .join('plants', 'user_plants.plant_id', '=', 'plants.id')
  .select(['users.id', 'plants.common_name', 'plants.scientific_name', 'user_plants.photo', 'users.garden_name', 'user_plants.description', 'user_plants.created_at'])
  .then((feedData) => {
    res.render('feed', { feedData });
  })
});

module.exports = router;
