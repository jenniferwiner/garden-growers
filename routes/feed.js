const express = require('express')
const router = express.Router()
const knex = require('../knex')
const jwt = require('jsonwebtoken')

/* GET plant feed */
router.get('/', (req, res, next) => {
  knex('users')
  .join('user_plants', 'users.id', '=', 'user_plants.user_id')
  .join('plants', 'user_plants.plant_id', '=', 'plants.id')
  .select(['users.id', 'plants.common_name', 'plants.scientific_name', 'user_plants.photo', 'users.garden_name', 'user_plants.description', 'user_plants.created_at'])
  .then((feedData) => {
    res.render('feed', { feedData })
  })
})

/* GET individual user's plant feed */
router.get('/:id', (req, res, next) => {
  let userId = req.params.id

  Promise.all([findUserPlants(userId), countUserPlants(userId), commonPlants(userId)])
    .then(values => {
      let [userPlantsArr, count, commonPlantsArr] = values
      res.render('user', {
        gardenName: userPlantsArr[0].garden_name,
        gardenId: userId,
        gardenData: userPlantsArr,
        numberOfPlants: count[0].count,
        commonPlants: commonPlantsArr
      })
    })
})

/* GET individual user's plant-breakdown graph data */
router.get('/:id/labelsAndData', function(req, res, next) {
  let id = req.params.id
  findUserPlants(id)
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
})

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
