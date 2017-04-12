process.env.NODE_ENV = 'test'

const { suite, test } = require('mocha')
const request = require('supertest')
const expect = require('chai').expect
const app = require('../app')
const knex = require('../knex')

suite('/feed Route Tests', () => {
  test('Load feed without token', done => {
    request(app)
      .get('/feed')
      .expect(302, done)
  })
  test('Load feed with token', done => {
    const agent = request.agent(app)

    request(app)
      .post('/')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        garden_name: 'admin',
        password: 'password'
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        agent.saveCookies(res)

        agent
          .get('/feed')
          .expect(200, done)
      })
  })
})
