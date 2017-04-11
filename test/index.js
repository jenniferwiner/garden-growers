process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');
const knex = require('../knex');

suite('/ Route Tests', () => {
  before((done) => {
    knex.migrate.latest()
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    })
  });

  beforeEach((done) => {
    knex.seed.run()
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
  });

  describe('GET /', () => {
    it('Load index page', done => {
      request(app)
        .get('/')
        .expect(200, done);
    });
  });

  describe('POST /', () => {
    var user = {
        garden_name: 'admin',
        password: 'password'
      }
    it('Login - correct login info', done => {
      request(app)
        .post('/')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(user)
        .expect('set-cookie', /token=[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+; Path=\/;.+HttpOnly/)
        .expect(302, done);
    });

    var userWrong = {
      garden_name: 'admin',
      password: 'wrongpassword'
    };

    it('Login - bad login info', done => {
      request(app)
      .post('/')
      .set('Accept', 'applciation/json')
      .set('Content-Type', 'application/json')
      .send(userWrong)
      .expect(400, done)
    })
  });
});
