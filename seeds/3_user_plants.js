exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user_plants').del()
    .then(function() {
      return Promise.all([
        // Inserts seed entries
        knex('user_plants').insert([{
          id: 1,
          user_id: 2,
          plant_id: 1,
          photo: 'http://www.flytrapcare.com/wp-content/uploads/2015/02/slide3.jpg'
        },
        {
          id: 2,
          user_id: 2,
          plant_id: 2,
          photo: 'https://www.violetbarn.com/wp/wp-content/uploads/2016/01/cosmoslegend21.jpg'
        }
        ])
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('user_plants_id_seq', (SELECT MAX(id) FROM user_plants))");
    });
};
