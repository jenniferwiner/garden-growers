exports.up = function(knex) {
  return knex.schema.createTable('plants', (table) => {
    table.increments()
    table.text('common_name').notNullable().defaultTo('')
    table.text('scientific_name').notNullable().defaultTo('')
    table.unique(['common_name', 'scientific_name'])
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('plants')
}
