const express = require('express')
const router = express.Router()

/* GET meet the team page */
router.get('/', function(req, res, next) {
  res.render('meet')
})

module.exports = router
