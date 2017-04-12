const express = require('express')
const router = express.Router()
const knex = require('../knex')
const boom = require('boom')
const jwt = require('jsonwebtoken')

// Logout
router.get('/logout', function(req, res, next) {
  res.clearCookie('token')
  res.redirect('/')
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  let user_id
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (payload) {
      user_id = payload.id
      userPlants(user_id)
    } else if (err) {
      res.redirect('/')
    }

    // master...
    function userPlants(userId) {
      knex('user_plants')
        .where('user_id', userId)
        .then((data) => {
          if (data.length === 0) {
            knex('users')
              .where('id', userId)
              .then(userData => {
                res.render('home', {
                  gardenName: userData[0].garden_name,
                  numberOfPlants: 0,
                  zip: userData[0].zipcode
                })
              })
          } else {
            Promise.all([findUserPlants(user_id), countUserPlants(user_id), commonPlants(user_id)])
              .then(values => {
                let [userPlantsArr, count, commonPlantsArr] = values
                res.render('home', {
                  gardenName: userPlantsArr[0].garden_name,
                  userPlants: userPlantsArr,
                  numberOfPlants: count[0].count,
                  commonPlants: commonPlantsArr,
                  zip: userPlantsArr[0].zipcode
                })
              })
          }
        })
    }
  })
})

router.get('/labelsAndData', function(req, res, next) {
  function userPlantforGraph(userId) {
    knex('user_plants')
      .join('plants', 'user_plants.plant_id', '=', 'plants.id')
      .where('user_plants.user_id', userId)
      .select('plants.common_name', 'plant_count')
      .then((data) => {
        let chartData = data.map(plant => {
          return plant.plant_count
        })
        let chartLabels = data.map(plant => {
          return plant.common_name
        })
        res.set('Content-Type', 'application/json')
        res.send({
          data: chartData,
          labels: chartLabels
        })
      })
      .catch((err) => {
        res.status(404)
        res.send('Can\'t find UserId')
      })
  }

  let user_id = null

  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (payload) {
      user_id = payload.id
      userPlantforGraph(user_id)
    } else if (err) {
      res.redirect('/')
    }
  })
})

router.post('/', function(req, res, next) {
  // setting variables for knex insert
  let scientific_name = firstCharUpper(req.body.scientific_name)
  let common_name = firstCharUpper(req.body.common_name)
  let plant_id
  let user_id
  let photo = req.body.photo
  let description = req.body.description
  let plant_count = req.body.plant_count

  // verify token
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (payload) {
      user_id = payload.id
    } else if (err) {
      res.redirect('/home')
    }
  })

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
            plant_id = insertedPlant[0].id
            knex('user_plants')
              .insert({
                user_id,
                plant_id,
                photo,
                description,
                plant_count
              })
              .then(() => {
                res.redirect('/home')
              })
          })
      } else {
        plant_id = searchedPlant[0].id
        knex('user_plants')
          .insert({
            user_id,
            plant_id,
            photo,
            description,
            plant_count
          })
          .then(() => {
            res.redirect('/home')
          })
      }
    })
})

router.patch('/', function(req, res, next) {
  let user_plant_id = req.body.user_plant_id
  let photo = req.body.photo
  let description = req.body.description
  let plant_count = req.body.plant_count
  // verify token
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (payload) {
      knex('user_plants')
        .where('user_plants.id', user_plant_id)
        .update({ photo, description, plant_count })
        .then((data) => {
          res.sendStatus(200)
        })
    } else if (err) {
      res.redirect('/')
    }
  })
})

// del ajax
router.delete('/', (req, res, next) => {
  let id = req.body.id
  let userId = 0
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (payload) {
      userId = payload.id
      knex('user_plants').del().where({
        user_id: userId,
        plant_id: id
      }).debug(true).then(() => {
        res.send(200)
      })
    }
  })
})

function firstCharUpper(data) {
  let lowercase = data.toLowerCase()
  let firstLet = lowercase[0].toUpperCase()
  let editedPlant = firstLet + lowercase.slice(1)

  return editedPlant
}

function countUserPlants(user_id) {
  return knex('user_plants').where('user_id', user_id).count('*')
}

function findUserPlants(user_id) {
  return knex('user_plants')
    .where('user_id', user_id)
    .join('users', 'users.id', 'user_plants.user_id')
    .join('plants', 'plants.id', 'user_plants.plant_id')
    .select(['users.garden_name', 'plants.common_name', 'plants.scientific_name', 'user_plants.description', 'user_plants.photo', 'user_plants.updated_at', 'user_plants.plant_id', 'users.zipcode', 'user_plants.plant_count', 'user_plants.id'])
}

function commonPlants(user_id) {
  return knex('user_plants')
    .join('plants', 'plants.id', '=', 'user_plants.plant_id')
    .where('user_id', user_id)
    .select('common_name', 'plant_count')
    .orderBy('plant_count', 'desc')
    .limit(3)
}

module.exports = router
