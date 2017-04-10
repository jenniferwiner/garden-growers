'use strict';

// SLOGAN : growing taller each day, share your garden with everyone, learn to grow from the garden community, community gardening online, networking with fellow gardeners.

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const knex = require('../knex');


/* GET users listing. */
router.get('/', (req, res, next)  => {
  res.render('signup');
});

let insertUser = (data) => knex('users').insert(data).returning(['id', 'gardenname', 'email', 'password'])


router.post('/', (req, res, next) => {
  let hashed = bcrypt.hash(req.body.password, 12)
  .then (hashedPassword => {
    delete req.body.password;
    // req.body.password = hashedPassword

    req.body.hashed_password = hashedPassword
    insertUser(req.body)
      .then(data => {
        res.redirect('/home')
      })
  })

  .catch((err) => {
    next(err);
  });

})

// router.post('/signup', (req, res, next) => {
//     let email = req.body.email
//     let gardenName = req.body.gardenname
//     let id = req.body.id
//     let name = req.body.name
//     let pass = req.body.password
//     let saltHash = bcrypt.hashSync(pass, 12)
//     knex('users')
//         // .returning([ 'first_name', 'last_name', 'email'])
//         .insert({
//             'id': id,
//             'name': name,
//             'gardenname': gardenName,
//             'email': email,
//             'hashed_password': saltHash
//         })
//         .then((data) => {
//             // res.send(humps.camelizeKeys(data[0]))
//             res.redirect('/home')
//         })
//       })





module.exports = router;
