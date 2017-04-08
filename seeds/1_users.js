exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('users').del()
        .then(function() {
            return Promise.all([
                // Inserts seed entries
                knex('users').insert([{
                        id: 1,
                        name: 'Jen',
                        gardenname: 'WildflowerHeaven',
                        email: 'jeniwiner@gmail.com',
                        hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
                        // youreawizard
                        is_admin: false
                    },
                    {
                        id: 2,
                        name: 'Steve',
                        gardenname: 'CarnivorousCircle',
                        email: 'savagesteve@gmail.com',
                        hashed_password: '$2a$12$aOYY9P3WBGQhlJYFRyToo.nm6GfKoGCFYhv55OychlHphY1WvM5t.',
                        // venus
                        is_admin: false
                    },
                    {
                        id: 3,
                        name: 'admin',
                        gardenname: 'admin',
                        email: 'admin@gmail.com',
                        hashed_password: '$2a$12$bfIk1Fq6yvs78WxgtJohxOW2SWoc.iYUsYvzbYlpkISLnCW8i17PW',
                        // password
                        is_admin: true
                    }
                ])
            ]);
        })
        .then(() => {
            return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))");
        });
};
