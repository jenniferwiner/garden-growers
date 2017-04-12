const express = require('express')
const router = express.Router()
const knex = require('../knex')
const jwt = require('jsonwebtoken')
/* GET users listing. */
router.get('/', (req, res, next) => {
  knex('users')
  .join('user_plants', 'users.id', '=', 'user_plants.user_id')
  .join('plants', 'user_plants.plant_id', '=', 'plants.id')
  .select(['users.id', 'plants.common_name', 'plants.scientific_name', 'user_plants.photo', 'users.garden_name', 'user_plants.description', 'user_plants.created_at'])
  .then((feedData) => {
    res.render('feed', { feedData })
  })
})

router.get('/:id', (req, res, next) => {
  let userId = req.params.id

  Promise.all([findUserPlants(userId), countUserPlants(userId), commonPlants(userId)])
    .then(values => {
      let [userPlantsArr, count, commonPlantsArr] = values
      res.render('user', {
        gardenName: userPlantsArr[0].garden_name,
        gardenData: userPlantsArr,
        numberOfPlants: count[0].count,
        commonPlants: commonPlantsArr
      })
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
