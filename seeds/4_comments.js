exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function() {
      return Promise.all([
        // Inserts seed entries
        knex('comments').insert([{
          id: 1,
          body: 'I love the contrast of colors present on the flower petals!',
          user_id: 1,
          user_plant_id: 2
        }
        ])
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('comments_id_seq', (SELECT MAX(id) FROM comments))");
    });
};
