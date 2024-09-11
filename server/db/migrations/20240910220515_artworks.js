/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  return knex.schema.createTable('artworks', (table) => {
    table.increments('id')
    table.string('location')
    table.decimal('latitude')
    table.decimal('longitude')
    table.string('image_url')
    table.string('artist')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('artworks')
}
