/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  return knex.schema.createTable('artworks', (table) => {
    table.increments('id')
    table.varchar('description')
    table.decimal('latitude')
    table.decimal('longitude')

    table.string('artist')
    table.string('image_url')

  })
}

export async function down(knex) {
  return knex.schema.dropTable('artworks')
}
