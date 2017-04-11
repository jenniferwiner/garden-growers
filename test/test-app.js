process.env.NODE_ENV = 'test'

const request = require('supertest')
const expect = require('chai').expect
const app = require('../app')
const knex = require('../knex')

describe('GET /', () => {
  it('Load index page', done => {
    request(app)
      .get('/')
      .expect(200, done)
  })
})
