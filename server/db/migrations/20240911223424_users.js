/**
 * @param { import("knex").Knex } knex
 */
export async function up(knex) {
  return knex.schema.createTable('users', (table) => {
    table.string('auth0Id').primary()
    table.string('name')
    table.decimal('email')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('users')
}
