process.env.NODE_ENV = 'test'

const { suite, test } = require('mocha')
const request = require('supertest')
const expect = require('chai').expect
const app = require('../app')
const knex = require('../knex')

suite('/demo Route Tests', () => {

  describe('GET /demo', () => {
    it('Load demo page', done => {
      request(app)
        .get('/demo')
        .expect(200, done)
    })
  })
})
