/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  return knex.schema.table('artworks', (table) => {
    table.string('description')
    table.string('user_id')
  })
}

export async function down(knex) {
  return knex.schema.table('artworks')
}
