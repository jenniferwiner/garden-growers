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
  knex('users')
  .join('user_plants', 'users.id', '=', 'user_plants.user_id')
  .join('plants', 'user_plants.plant_id', '=', 'plants.id')
  .select(['users.id', 'plants.common_name', 'plants.scientific_name', 'user_plants.photo', 'users.garden_name', 'user_plants.description', 'user_plants.created_at'])
  .where('users.id', userId)
  .then((gardenData) => {
    let gardenName = gardenData[0].garden_name
    res.render('user', { gardenData, gardenName })
  })
})

module.exports = router
