exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('plants').del()
        .then(function() {
            return Promise.all([
                // Inserts seed entries
                knex('plants').insert([{
                        id: 1,
                        common_name: 'Venus Fly Trap',
                        scientific_name: 'Dionaea muscipula'
                    },
                    {
                        id: 2,
                        common_name: 'African Violet',
                        scientific_name: 'Saintpaulias'
                    },
                    {
                        id: 3,
                        common_name: 'Fuchsia',
                        scientific_name: 'Fuchsia'
                    }
                ])
            ]);
        })
        .then(() => {
            return knex.raw("SELECT setval('plants_id_seq', (SELECT MAX(id) FROM plants))");
        });
};
