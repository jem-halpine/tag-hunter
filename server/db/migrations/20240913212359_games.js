/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('games', (table) => {
    table.increments('id')
    table.date('timestamp')
    table.integer('artwork_id')
    table.string('user_id')
    table.boolean('art_was_found').defaultTo(false)
    table.integer('guesses_used')
    table.integer('rating').defaultTo(null)
  })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('games')
};
