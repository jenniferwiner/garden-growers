'use strict';

const express = require('express')
const router = express.Router()
const knex = require('../knex')
const jwt = require('jsonwebtoken')

const boom = require('boom')
const bcrypt = require('bcrypt')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Garden Growers'
  });
});

router.post('/', (req, res, next) => {
  let gardenName = req.body.gardenname
  let password = req.body.password
  console.log('testing');
  knex('users')
  .where('gardenname', gardenName)
  .then((data) => {
    if (data.length > 0) {
      bcrypt.compare(password, data[0].hashed_password, (err, result) => {
        if (result) {
          let token = jwt.sign({
            gardenname: data[0].gardenName,
            // password: data[0].hashed_password
          }, `${process.env.JWT_KEY}`);
          res.cookie('token', token, {
            httpOnly: true
          })
          res.redirect('/home')
        } else {
          next(boom.create(400, 'Bad garden name or password'))
        }
      })
    } else {
      next(boom.create(400, 'Bad garden name or password'))
    }
  })
})

module.exports = router;
