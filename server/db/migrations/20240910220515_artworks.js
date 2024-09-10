/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  return knex.schema.createTable('artworks', (table) => {
    table.increments('id')
    table.varchar('description')
    table.integer('latitude')
    table.integer('longitude')
    table.varchar('artist')
    table.varchar('image_url')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('artworks')
}
