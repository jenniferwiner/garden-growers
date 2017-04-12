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
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (payload) {
      let user_id = payload.id
      let is_admin = payload.is_admin
      if (is_admin === true) {
        knex('users')
          .select(['name', 'garden_name', 'email', 'zipcode', 'id'])
          .then((data) => {
            res.render('admin', { users: data })
          })
      } else {
        res.redirect('/')
      }
    } else if (err) {
      res.redirect('/')
    }
  })
})

router.delete('/', function(req, res, next) {
  let id = req.body.id

  knex('users')
  .where('id', id)
  .del()
  .then(() => {
    res.sendStatus(200)
  })
})

module.exports = router
