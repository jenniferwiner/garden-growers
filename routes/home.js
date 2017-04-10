const express = require('express');
const router = express.Router();
const knex = require('../knex')
const boom = require('boom')

/* GET users listing. */
router.get('/', function(req, res, next) {
  knex('user_plants')
  .innerJoin('users', 'users.id','user_plants.user_id')
  .innerJoin('plants', 'plants.id', 'user_plants.plant_id')
  .select(['users.garden_name', 'plants.common_name', 'plants.scientific_name', 'user_plants.description'])
  .then((userPlants)=>{
    console.log('data', userPlants);
    res.render('home', {userPlants})
  })
});

let insertPlant = (data) => knex('user_plants').insert(data).returning(['id', 'plants.common_name', 'plants.scientific_name', 'user_plants.description'])

router.post('/home', function (req, res, next) {
  insertPlant(req.body)
    .then(data => {
      console.log(data);
      res.render('/home')
    })
.catch((err) => {
  next(err);
});


})

module.exports = router;
