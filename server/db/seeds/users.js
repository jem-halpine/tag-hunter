export async function seed(knex) {
  await knex('users').del()

  await knex('users').insert([
    {
      auth0id: 'Auth0999',
      name: 'Ronald McDonald-San',
      email: 'coolest.guy@ever.com',
    },
  ])
}
