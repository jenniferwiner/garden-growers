const express = require('express');
const router = express.Router();
const knex = require('../knex')
const boom = require('boom')
const jwt = require('jsonwebtoken')


let firstCharUpper = (data) => {
  let lowercase = data.toLowerCase();
  let firstLet = lowercase[0].toUpperCase();
  let editedPlant = firstLet + lowercase.slice(1);

  return editedPlant;
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  let user_id
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (payload) {
      user_id = payload.id
      userPlants(user_id)
    }
    else if (err) {
      res.redirect('/')
    }
  })

  function userPlants(user_id) {
    knex('user_plants')
      .where({
        'user_id': user_id
      })
      .innerJoin('users', 'users.id', 'user_plants.user_id')
      .innerJoin('plants', 'plants.id', 'user_plants.plant_id')
      .select(['users.garden_name', 'plants.common_name', 'plants.scientific_name', 'user_plants.description'])
      .then((userPlants) => {
        console.log('data', userPlants);
        res.render('home', {
          userPlants
        })
      })
  }
});

router.post('/', function(req, res, next) {
  // setting variables for knex insert
  let scientific_name = firstCharUpper(req.body.scientific_name);
  let common_name = firstCharUpper(req.body.common_name);
  let plant_id;
  let user_id;
  let photo = req.body.photo;
  let description = req.body.description;
  let plant_count = req.body.plant_count;

  // insert plant function
  function insertUserPlant() {
    knex('user_plants')
    .insert({ user_id, plant_id, photo, description, plant_count })
    .then(() => {
      res.redirect('/home');
    })
  }

  // verify token
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (payload) {
      user_id = payload.id
      userPlants(user_id)
    }
    else if (err) {
      res.redirect('/home')
    }
  });

  knex('plants')
    .where('common_name', common_name)
    .andWhere('scientific_name', scientific_name)
    .then(searchedPlant => {
      if (searchedPlant.length === 0) {
        knex('plants')
        .insert({ common_name, scientific_name }, '*')
        .then(insertedPlant => {
          plant_id = insertedPlant.id;
          insertUserPlant();
        });
      }
      else {
        plant_id = searchedPlant;
        insertUserPlant();
      }
    })
});


module.exports = router;
