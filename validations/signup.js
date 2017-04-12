'use strict'

const Joi = require('joi')

module.exports.post = {
  body: {
    email: Joi.string()
      .label('Email')
      .required()
      .email()
      .trim(),
    password: Joi.string()
      .label('Password')
      .required()
      .trim(),
    garden_name: Joi.string()
      .label('Garden Name')
      .required()
      .trim(),
    zipcode: Joi.number()
      .integer()
      .required()
  }
}
