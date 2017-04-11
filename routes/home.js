const express = require('express');
const router = express.Router();
const knex = require('../knex')
const boom = require('boom')
const jwt = require('jsonwebtoken')

/* GET users listing. */
router.get('/', function(req, res, next) {
  let user_id;
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (payload) {
      user_id = payload.id;
      userPlants(user_id);
    }
    else if (err) {
      res.redirect('/');
    }
  });

  function userPlants(user_id) {
    knex('user_plants')
      .where('user_id', user_id)
      .then((data) => {
        if (data.length === 0) {
          knex('users')
            .where('id', user_id)
            .then(userData => {
              res.render('home', {
                gardenName: userData[0].garden_name,
                numberOfPlants: 0
              })
            })
        }
        else {
          Promise.all([findUserPlants(user_id), countUserPlants(user_id), commonPlants(user_id)])
          .then(values => {
            let [userPlants, count, commonPlants] = values;
            console.log(commonPlants[0].common_name)
            res.render('home', {
              gardenName: userPlants[0].garden_name,
              userPlants,
              numberOfPlants: count[0].count,
              commonPlants
            });
          })
        }
      });
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

  // verify token
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (payload) {
      user_id = payload.id;
    }
    else if (err) {
      res.redirect('/home');
    }
  });

  knex('plants')
    .where('common_name', common_name)
    .andWhere('scientific_name', scientific_name)
    .then(searchedPlant => {
      if (searchedPlant.length === 0) {
        knex('plants')
          .insert({
            common_name,
            scientific_name
          }, '*')
          .then(insertedPlant => {
            plant_id = insertedPlant[0].id;
            insertUserPlant();
          });
      }
      else {
        plant_id = searchedPlant[0].id;
        insertUserPlant();
      }
    })
});

function firstCharUpper(data) {
  let lowercase = data.toLowerCase();
  let firstLet = lowercase[0].toUpperCase();
  let editedPlant = firstLet + lowercase.slice(1);
  return editedPlant;
};

function countUserPlants(user_id) {
  return knex('user_plants').where('user_id', user_id).count('*');
}

function findUserPlants(user_id) {
  return knex('user_plants')
    .where('user_id', user_id)
    .join('users', 'users.id', 'user_plants.user_id')
    .join('plants', 'plants.id', 'user_plants.plant_id')
    .select(['users.garden_name', 'plants.common_name', 'plants.scientific_name', 'user_plants.description', 'user_plants.photo', 'user_plants.created_at'])
}

function commonPlants(user_id) {
  return knex('user_plants')
  .join('plants', 'plants.id', '=', 'user_plants.plant_id')
  .where('user_id', user_id)
  .select('common_name', 'plant_count')
  .orderBy('plant_count', 'desc')
  .limit(3)
}

function insertUserPlant() {
  knex('user_plants')
    .insert({
      user_id,
      plant_id,
      photo,
      description,
      plant_count
    })
    .then(() => {
      res.redirect('/home');
    })
}
module.exports = router;
