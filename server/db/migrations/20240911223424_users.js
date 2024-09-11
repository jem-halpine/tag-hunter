/**
 * @param { import("knex").Knex } knex
 */
export async function up(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id')
    table.string('name')
    table.decimal('token')
    // table.decimal('seen_artwork_id')
  })
}
