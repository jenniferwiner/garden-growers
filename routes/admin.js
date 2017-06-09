'use strict'

const express = require('express')
const router = express.Router()
const knex = require('../knex')
const jwt = require('jsonwebtoken')
const boom = require('boom')
const bcrypt = require('bcrypt')
const ev = require('express-validation')
const validations = require('../validations/index')

/* GET admin page */
router.get('/', verifyAdmin, function(req, res, next) {
  knex('users')
    .select(['name', 'garden_name', 'email', 'zipcode', 'id'])
    .then((data) => {
      res.render('admin', { users: data })
    })
})

/* Logout admin */
router.get('/logout', function(req, res, next) {
  res.clearCookie('token')
  res.redirect('/')
})

/* DELETE user (admin only) */
router.delete('/', function(req, res, next) {
  let id = req.body.id

  knex('users')
  .where('id', id)
  .del()
  .then(() => {
    res.sendStatus(200)
  })
})

function verifyAdmin(req, res, next) {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (payload) {
      if (payload.is_admin) {
        next()
      } else {
        res.redirect('/home')
      }
    } else if (err) {
      res.redirect('/')
    }
  })
}

module.exports = router
