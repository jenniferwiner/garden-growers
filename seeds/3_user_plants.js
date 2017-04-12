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
          photo: 'https://southbaytraps.com/2946-thickbox_default/b52-venus-flytrap.jpg',
          description: 'I love my venus fly trap! It eats insects for breakfast'
        },
        {
          id: 2,
          user_id: 2,
          plant_id: 2,
          photo: 'http://www.ksre.k-state.edu/hort-judging/images/flowers-foliages/African-violet-plant-s-web.jpg',
          description: 'Always in bloom- Loves full sun!'
        }])
      ])
    })
    .then(() => {
      return knex.raw('SELECT setval(\'user_plants_id_seq\', (SELECT MAX(id) FROM user_plants))')
    })
}
