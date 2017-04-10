const express = require('express');
const router = express.Router();
const knex = require('../knex')
const boom = require('boom')
const jwt = require('jsonwebtoken')

/* GET users listing. */
router.get('/', function(req, res, next) {
    let userId
    jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
        if (payload) {
            userId = payload.id
            userPlants(userId)
        }
        else if (err){
          res.redirect('/')
        }
    })

    function userPlants(userId) {
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


module.exports = router;
