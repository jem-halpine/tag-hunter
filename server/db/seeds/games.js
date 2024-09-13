/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('games').del()

  // Create new date by shifting current date back a number of days
  function dateShift(shift) {
    let date = new Date(Date.now())
    return date.setDate(date.getDate() - shift)
  }

  await knex('games').insert([
    {
      id: 1,
      timestamp: dateShift(60),
      artwork_id: 1,
      user_id: 'Auth0999',
      art_was_found: false,
      guesses_used: 5,
      rating: 4,
    },
    {
      id: 2,
      timestamp: dateShift(61),
      artwork_id: 2,
      user_id: 'Auth0999',
      art_was_found: false,
      guesses_used: 5,
      rating: 5,
    },
    {
      id: 3,
      timestamp: dateShift(62),
      artwork_id: 3,
      user_id: 'Auth0999',
      art_was_found: false,
      guesses_used: 5,
      rating: 3,
    },
    {
      id: 4,
      timestamp: dateShift(63),
      artwork_id: 4,
      user_id: 'Auth0999',
      art_was_found: true,
      guesses_used: 3,
      rating: 5,
    },
    {
      id: 5,
      timestamp: dateShift(51),
      artwork_id: 5,
      user_id: 'google-oauth2|104134161417694759480',
      art_was_found: true,
      guesses_used: 2,
      rating: 5,
    },
    {
      id: 6,
      timestamp: dateShift(55),
      artwork_id: 3,
      user_id: 'google-oauth2|104134161417694759480',
      art_was_found: true,
      guesses_used: 3,
      rating: 5,
    },
    {
      id: 7,
      timestamp: dateShift(56),
      artwork_id: 4,
      user_id: 'google-oauth2|104134161417694759480',
      art_was_found: true,
      guesses_used: 1,
      rating: 5,
    },
  ])
}
