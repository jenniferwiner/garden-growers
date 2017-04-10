exports.up = function(knex) {
  return knex.schema.createTable('user_plants', (table) => {
      table.increments()
      table.integer('user_id').notNullable().references('users.id').onDelete('cascade')
      table.integer('plant_id').notNullable().references('plants.id').onDelete('cascade')
      table.text('photo').notNullable().defaultTo('http://www.webweaver.nu/clipart/img/nature/flowers/potted-plant.png')
      table.text('description')
      table.integer('plant_count').notNullable().defaultTo(1)
      table.timestamps(true, true)
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('user_plants')

};
