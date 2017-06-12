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
          photo: 'https://southbaytraps.com/31-thickbox_default/jaws-venus-flytrap.jpg',
          description: 'I love my venus fly trap! It eats insects for breakfast'
        },
        {
          id: 2,
          user_id: 2,
          plant_id: 2,
          photo: 'https://maxpull-gdvuch3veo.netdna-ssl.com/wp-content/uploads/2009/01/african-violets.jpg',
          description: 'Always in bloom- Loves full sun!'
        },
        {
          id: 3,
          user_id: 3,
          plant_id: 3,
          photo: 'https://cmeimg-a.akamaihd.net/640/photos.demandstudios.com/getty/article/225/22/178805487.jpg',
          description: 'Fuchsia is a genus of flowering plants that consists mostly of shrubs or small trees. Flowers are a bright, vibrant pink.'
        }])
      ])
    })
    .then(() => {
      return knex.raw('SELECT setval(\'user_plants_id_seq\', (SELECT MAX(id) FROM user_plants))')
    })
}
