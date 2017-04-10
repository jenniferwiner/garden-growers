const express = require('express');
const router = express.Router();
const knex = require('../knex')
const boom = require('boom')
const jwt = require('jsonwebtoken')

/* GET users listing. */
router.get('/', function(req, res, next) {
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

})

module.exports = router;
