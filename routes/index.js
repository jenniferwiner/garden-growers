'use strict'

const express = require('express')
const router = express.Router()
const knex = require('../knex')
const jwt = require('jsonwebtoken')
const boom = require('boom')
const bcrypt = require('bcrypt')
const ev = require('express-validation')
const validations = require('../validations/index')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Garden Growers'
  })
})

router.post('/', (req, res, next) => {
  let gardenName = req.body.garden_name
  let password = req.body.password
  let email = req.body.email
  console.log(req.body)
  console.log('post testing')
    // console.log('testing');
  if (gardenName) {
    knex('users')
    .where('garden_name', gardenName)
    .then((data) => {
      if (data.length > 0) {
        bcrypt.compare(password, data[0].hashed_password, (err, result) => {
          if (result) {
            let token = jwt.sign({
              exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30),
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
            next(boom.create(400, 'Bad garden name or password'))
          }
        })
      } else {
        next(boom.create(400, 'Bad garden name or password'))
      }
    })
  } else if (email) {
    knex('users')
    .where('email', email)
    .then((data) => {
      if (data) {
        console.log('email data');
        let token = jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30),
          garden_name: data[0].gardenName,
          id: data[0].id,
          is_admin: data[0].is_admin
        }, process.env.JWT_KEY)
        res.cookie('token', token, {
          httpOnly: true
        })
        if (data[0].is_admin === false) {
          console.log('testing')
          res.redirect('/home')
        } else if (data[0].is_admin === true) {
          res.redirect('/admin')
        }
      } else {
        next(boom.create(400, 'No user exists with that email'))
      }
    })
  }
})

module.exports = router
