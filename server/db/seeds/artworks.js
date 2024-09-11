export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('artworks').del()

  // Inserts seed entries
  await knex('artworks').insert([
    {
      id: 1,
      location: '2 Mein Street, Newtown',
      latitude: -41.31092143587734,
      longitude: 174.77957489029637,
      artist: 'Unknown',
      image_url: 'te-ao-maori-zoo.webp',
    },
    {
      id: 2,
      location: '3 Wilson Street, Newtown',
      latitude: -41.31288103446937,
      longitude: 174.7798757155056,
      artist: 'Xoe Hall',
      image_url: 'mexican-festa.webp',
    },
    {
      id: 3,
      location: '110 Wawkefield Street, Te Aro',
      latitude: -41.288806234113416,
      longitude: 174.77629558881318,
      artist: 'Unknown',
      image_url: 'maori-emotional-flow.webp',
    },
    {
      id: 4,
      location: '4 Douglas Street, Mt Cook',
      latitude: -41.30211079793758,
      longitude: 174.7790713775596,
      artist: 'Unknown',
      image_url: 'astro-driver.webp',
    },
    {
      id: 5,
      location: '30 Leeds Street, Te Aro',
      latitude: -41.29319764387097,
      longitude: 174.77665836322444,
      artist: 'Xoe Hall',
      image_url: 'david-bowie.webp',
    },
  ])
}
