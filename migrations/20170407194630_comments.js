exports.up = function(knex) {
    return knex.schema.createTable('comments', (table) => {
        table.increments()
        table.text('body').notNullable().defaultTo('')
        table.integer('user_id').notNullable().references('users.id').onDelete('cascade')
        table.integer('user_plant_id').notNullable().references('user_plants.id').onDelete('cascade')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('comments')

};
