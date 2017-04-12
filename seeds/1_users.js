exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function() {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert([{
          id: 1,
          name: 'admin',
          garden_name: 'admin',
          email: 'admin@gmail.com',
          hashed_password: '$2a$12$bfIk1Fq6yvs78WxgtJohxOW2SWoc.iYUsYvzbYlpkISLnCW8i17PW',
          // password
          zipcode: 80302,
          is_admin: true
        },
        {
          id: 2,
          name: 'Steve',
          garden_name: 'CarnivorousCircle',
          email: 'savagesteve@gmail.com',
          hashed_password: '$2a$12$aOYY9P3WBGQhlJYFRyToo.nm6GfKoGCFYhv55OychlHphY1WvM5t.',
          // venus
          zipcode: 94707,
          is_admin: false
        },
        {
          id: 3,
          name: 'Jen',
          garden_name: 'WildflowerHeaven',
          email: 'jeniwiner@gmail.com',
          hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
          // youreawizard
          zipcode: 19151,
          is_admin: false
        }])
      ])
    })
    .then(() => {
      return knex.raw('SELECT setval(\'users_id_seq\', (SELECT MAX(id) FROM users))')
    })
}
