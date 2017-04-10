exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments()
        table.text('name').notNullable().defaultTo('')
        table.text('garden_name').notNullable().defaultTo('')
        table.text('email').notNullable().defaultTo('')
        table.specificType('hashed_password', 'char(60)').notNullable()
        table.boolean('is_admin').notNullable().defaultTo(false)
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users')
};
