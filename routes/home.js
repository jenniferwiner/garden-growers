const express = require('express')
const router = express.Router()
const knex = require('../knex')
const boom = require('boom')
const jwt = require('jsonwebtoken')

/* GET user's home page */
router.get('/', function(req, res, next) {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (payload) {
      let user_id = payload.id
      getUserPlants(user_id, res)
    } else if (err) {
      res.redirect('/')
    }
  })
})

/* Logout user */
router.get('/logout', function(req, res, next) {
  res.clearCookie('token')
  res.redirect('/')
})

/* GET garden-breakdown graph data */
router.get('/labelsAndData', function(req, res, next) {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (payload) {
      let user_id = payload.id
      userPlantforGraph(user_id, res)
    } else if (err) {
      res.redirect('/')
    }
  })
})

/* POST new plant in user's garden */
router.post('/', function(req, res, next) {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (payload) {
      let user_id = payload.id
      checkPlantExists(req.body, user_id, res)
    } else if (err) {
      res.redirect('/home')
    }
  })
})

/* PATCH plant in user's garden */
router.patch('/', function(req, res, next) {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (payload) {
      updatePlant(req.body, res)
    } else if (err) {
      res.redirect('/')
    }
  })
})

/* DELETE plant in user's garden */
router.delete('/', (req, res, next) => {
  let plant_id = req.body.id

  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (payload) {
      let user_id = payload.id
      deletePlant(user_id, plant_id, res)
    }
  })
})

/* PLANT/USER DATA LOGIC */

function renderUserData(userId, res) {
  knex('users')
    .where('id', userId)
    .then(userData => {
      res.render('home', {
        gardenName: userData[0].garden_name,
        numberOfPlants: 0,
        zip: userData[0].zipcode
      })
    })
}

function getUserPlants(user_id, res) {
  knex('user_plants')
    .where('user_id', user_id)
    .then((data) => {
      if (data.length === 0) {
        renderUserData(user_id, res)
      } else {
        Promise.all([findUserPlants(user_id), countUserPlants(user_id), commonPlants(user_id)])
          .then(values => {
            renderUserPlants(values, res)
          })
      }
    })
}

function renderUserPlants(plantData, res) {
  let [userPlantsArr, count, commonPlantsArr] = plantData
  res.render('home', {
    gardenName: userPlantsArr[0].garden_name,
    userPlants: userPlantsArr,
    numberOfPlants: count[0].count,
    commonPlants: commonPlantsArr,
    zip: userPlantsArr[0].zipcode
  })
}

function userPlantforGraph(user_id, res) {
  knex('user_plants')
    .join('plants', 'user_plants.plant_id', '=', 'plants.id')
    .where('user_plants.user_id', user_id)
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

function firstCharUpper(data) {
  let lowercase = data.toLowerCase()
  let firstLet = lowercase[0].toUpperCase()
  let editedPlant = firstLet + lowercase.slice(1)

  return editedPlant
}

function checkPlantExists(plantData, user_id, res) {
  let { common_name, scientific_name } = plantData
  scientific_name = firstCharUpper(scientific_name)
  common_name = firstCharUpper(common_name)

  knex('plants')
    .where('common_name', common_name)
    .andWhere('scientific_name', scientific_name)
    .then(searchedPlant => {
      // if plant does not exist in DB, insert plant in plants table && user_plants table
      if (searchedPlant.length === 0) {
        knex('plants')
          .insert({
            common_name,
            scientific_name
          }, '*')
          .then(insertedPlant => {
            let plant_id = insertedPlant[0].id
            insertPlant(plantData, plant_id, user_id, res)
          })
      // if plant already exists in DB, insert plant only into user_plants table
      } else {
        let plant_id = searchedPlant[0].id
        insertPlant(plantData, plant_id, user_id, res)
      }
    })
}

function insertPlant(plantData, plant_id, user_id, res) {
  let photo = plantData.photo
  let description = plantData.description
  let plant_count = plantData.plant_count

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

function updatePlant(updatePlantData, res) {
  let { user_plant_id, description, plant_count, photo } = updatePlantData
  knex('user_plants')
  .where('user_plants.id', user_plant_id)
  .update({ photo, description, plant_count })
  .then((data) => {
    res.sendStatus(200)
  })
}

function deletePlant(user_id, plant_id, res) {
  knex('user_plants')
    .del()
    .where({
      user_id,
      plant_id
    })
    .then(() => {
      res.send(200)
    })
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
