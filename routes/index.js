'use strict'

const express = require('express')
const router = express.Router()
const knex = require('../knex')
const jwt = require('jsonwebtoken')
const boom = require('boom')
const bcrypt = require('bcrypt')
const ev = require('express-validation')
const validations = require('../validations/index')

/* GET home page */
router.get('/', function(req, res, next) {
  res.render('index')
})

/* POST user login */
router.post('/', function(req, res, next) {
  let gardenName = req.body.garden_name
  let password = req.body.password

  knex('users')
  .where('garden_name', gardenName)
  .then((data) => {
    if (data.length > 0) {
      bcrypt.compare(password, data[0].hashed_password, (err, result) => {
        if (result) {
          let token = jwt.sign({
            garden_name: data[0].gardenName,
            id: data[0].id,
            is_admin: data[0].is_admin
          }, process.env.JWT_KEY)
          res.cookie('token', token, {
            httpOnly: true
          })
          if (data[0].is_admin === false) {
            res.redirect('/home')
          } else if (data[0].is_admin === true) {
            res.redirect('/admin')
          }
        } else {
          res.render('index', { error: 'Bad garden name or password' })
        }
      })
    } else {
      res.render('index', { error: 'Bad garden name or password' })
    }
  })
})

module.exports = router
