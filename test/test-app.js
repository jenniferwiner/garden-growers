process.env.NODE_ENV = 'test';

const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');
const knex = require('../knex');
//
// beforeEach(done => {
//   Promise.all([
//     knex('users').insert({ id: 1, gardenname: 'jerrysgarden', email: 'jerry@jerry.com', hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS', is_admin: false }),
//     knex('plants').insert({ id: 1, common_name: 'Ruellia', scientific_name: 'Ruellia' })
//     ]).then(() => done());
// });

//
// describe('GET /', () => {
//   it('Load index page', done => {
//     request(app)
//       .get('/')
//       .expect(200, done);
//   });
// });
