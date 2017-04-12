process.env.NODE_ENV = 'test'

const { suite, test } = require('mocha')
const request = require('supertest')
const expect = require('chai').expect
const app = require('../app')
const knex = require('../knex')

suite('/home Route Tests', () => {
  before((done) => {
    knex.migrate.latest()
      .then(() => {
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  beforeEach((done) => {
    knex.seed.run()
      .then(() => {
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test('Load home without token', done => {
    request(app)
      .get('/home')
      .expect(302, done)
  })
  test('Load home with token', done => {
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
        const agent = request.agent(app)
        agent.jar.getCookies()

        agent
          .get('/home')
          .expect(200, done)
      })
  })
})
