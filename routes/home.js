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

let insertPlant = (data) => knex('plants').insert(data).returning(['id', 'plants.common_name', 'plants.scientific_name'])

/* GET users listing. */
router.get('/', function(req, res, next) {
<<<<<<< HEAD
    // console.log(req.cookies.token);
    let userId
    jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
            if (payload) {
                console.log('payload', payload.id);
                userId = payload.id
                console.log(userId);
                userPlants(userId)
            }
        })
      function userPlants(userId){
            knex('user_plants')
            .where({
                'user_id': userId
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
=======
  knex('user_plants')
    .innerJoin('users', 'users.id', 'user_plants.user_id')
    .innerJoin('plants', 'plants.id', 'user_plants.plant_id')
    .select(['users.garden_name', 'plants.common_name', 'plants.scientific_name', 'user_plants.description'])
    .then((userPlants) => {
      console.log('data', userPlants);
      res.render('home', {
        userPlants
      })
    })
});

router.post('/home', function(req, res, next) {
  let scientific_name = firstCharUpper(req.body.scientific_name)
  let common_name = firstCharUpper(req.body.scientific_name)

  knex('plants')
    .where('common_name', common_name)
    .andWhere('scientific_name', scientific_name)
    .then(data => {
        if (data.length === 0) {

          insertPlant({common_name, scientific_name}).then(data => {
            console.log(data);
            res.end()
          })

        }


})


  console.log(req.body);
  insertPlant(req.body)
    .then(data => {
      console.log(data);
      res.render('/home')
    })
    .catch((err) => {
      next(err);
    });

>>>>>>> plant_posting

})

module.exports = router;
