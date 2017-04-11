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
    } else if (err) {
      res.redirect('/');
    }

    // master...
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
          } else {
            Promise.all([findUserPlants(user_id), countUserPlants(user_id), commonPlants(user_id)])
              .then(values => {
                let [userPlants, count, commonPlants] = values;
                res.render('home', {
                  gardenName: userPlants[0].garden_name,
                  userPlants,
                  numberOfPlants: count[0].count,
                  commonPlants,
                  zip: userPlants[0].zipcode
                });
              })
          }

        });
    }

  });
});

router.get('/labelsAndData', function(req, res, next) {
  function userPlantforGraph(user_id) {
    knex('user_plants')
      .join('plants', 'user_plants.plant_id', '=', 'plants.id')
      .where('user_plants.user_id', user_id)
      .select('plants.common_name', 'plant_count')
      .then((data) => {
        let chartData = data.map(plant => {
          return plant.plant_count;
        });
        let chartLabels = data.map(plant => {
          return plant.common_name;
        });
        res.set('Content-Type', 'application/json');
        res.send({
          data: chartData,
          labels: chartLabels
        });
      })
      .catch((err) => {
        res.status(404);
        res.send("Couldn't find UserId");
      });
  }

  let user_id;

  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (payload) {
      user_id = payload.id;
      userPlantforGraph(user_id);
    } else if (err) {
      res.redirect('/');
    }
  });
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
    } else if (err) {
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
      } else {
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
    .select(['users.garden_name', 'plants.common_name', 'plants.scientific_name', 'user_plants.description', 'user_plants.photo', 'user_plants.created_at', 'user_plants.plant_id', 'users.zipcode'])
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
router.patch('/', function(req, res, next) {
  let scientific_name = firstCharUpper(req.body.scientific_name);
  let common_name = firstCharUpper(req.body.common_name);
  let plant_id = req.body.plant_id
  let user_id;
  let photo = req.body.photo;
  let description = req.body.description;
  let plant_count = req.body.plant_count;
  let newPlantData = req.body;
  // verify token
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (payload) {
      user_id = payload.id;
    } else if (err) {
      res.redirect('/home');
    }
  });
  knex('user_plants')
    .where({
      user_id,
      plant_id
    })
    .returning(['common_name', 'scientific_name', 'photo', 'description', 'plant_count'])
    .update(newPlantData)
    .then((data) => {
      console.log(data);
      res.send(data[0])
    })

})


// del ajax
router.delete('/', (req, res, next) => {
  let id = req.body.id
  let userId = 0;
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (payload) {
      userId = payload.id;
      knex('user_plants').del().where({
        user_id: userId,
        plant_id: id
      }).debug(true).then(() => {
        res.send(200)
      })
    }
  })
})






module.exports = router;
