'use strict'

const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const knex = require('../knex')
const boom = require('boom')
const ev = require('express-validation')
const validations = require('../validations/signup')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('signup')
})

router.post('/', ev(validations.post), function(req, res, next) {
  knex('users')
  .where('garden_name', req.body.garden_name)
  .then(user => {
    if (user.length !== 0) {
      return next(boom.create(400, 'Garden Name already exists'))
    }
    let hashed = bcrypt.hashSync(req.body.password, 12)
    delete req.body.password
    req.body.hashed_password = hashed

    knex('users')
    .insert(req.body)
    .returning(['id', 'garden_name', 'email', 'zipcode', 'name'])
    .then(data => {
      res.redirect('/')
    })
    .catch((err) => {
      next(err)
    })
  })
})

module.exports = router
