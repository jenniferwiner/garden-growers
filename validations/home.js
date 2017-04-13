'use strict'

const Joi = require('joi')

module.exports.post = {
  body: {
    common_name: Joi.string()
      .label('Common Name')
      .required()
      .email()
      .trim(),
    scientific_name: Joi.string()
      .label('Scientific Name')
      .required()
      .trim(),
    plant_count: Joi.number()
      .integer()
      .label('Number of Plant Types')
      .required()
      .trim()
  }
}
module.exports.patch = {
  body: {
  }
}
