'use strict'

const Joi = require('joi')

module.exports.post = {
  body: {
    password: Joi.string()
      .label('Password')
      .required()
      .trim(),
    garden_name: Joi.string()
      .label('Garden Name')
      .required()
      .trim()
  }
}
