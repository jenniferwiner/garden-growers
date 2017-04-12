process.env.NODE_ENV = 'test'

const { suite, test } = require('mocha')
const request = require('supertest')
const expect = require('chai').expect
const app = require('../app')
const knex = require('../knex')

suite('/signup Route Tests', () => {
  describe('GET /signup', () => {
    it('Load signup page', done => {
      request(app)
        .get('/signup')
        .expect(200, done)
    })
  })
})
