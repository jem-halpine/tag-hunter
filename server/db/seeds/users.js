export async function seed(knex) {
  await knex('users').del()

  await knex('users').insert([
    {
      auth0id: 'Auth0999',
      name: 'Ronald McDonald-San',
      email: 'coolest.guy@ever.com',
    },
    {
      auth0id: 'Auth00000',
      name: 'Sensible Dad',
      email: 'wehavemcdonalds@home.com',
    },
    {
      auth0id: 'google-oauth2|104134161417694759480',
      name: 'Jeremy Webster',
      email: 'jeremy.webster106@gmail.com'
    }
  ])
}
