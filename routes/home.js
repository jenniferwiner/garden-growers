const express = require('express');
const router = express.Router();
const knex = require('../knex')
const boom = require('boom')

/* GET users listing. */
router.get('/', function(req, res, next) {
  knex('user_plants')
  .innerJoin('users', 'users.id','user_plants.user_id')
  .innerJoin('plants', 'plants.id', 'user_plants.plant_id')
  .returning('*')
  .then((data)=>{
    console.log(data);
    res.render('home')
  })
res.render('home')
});

router.post('/', function (req, res, next) {

})

module.exports = router;
