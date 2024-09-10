export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('artworks').del()

  // Inserts seed entries
  await knex('artworks').insert([
    {
      id: 1,
      description: '2 Mein Street, Newtown',
      latitude: -41.31092143587734,
      longitude: 174.77957489029637,
      artist: 'Unknown',
      image_url: '../../../public/images/te-ao-maori-zoo',
    },
    {
      id: 2,
      description: '3 Wilson Street, Newtown',
      latitude: -41.31288103446937,
      longitude: 174.7798757155056,
      artist: 'Xoe Hall',
      image_url: '../../../public/images/mexican-festa',
    },
    {
      id: 3,
      description: '110 Wawkefield Street, Te Aro',
      latitude: -41.288806234113416,
      longitude: 174.77629558881318,
      artist: 'Unknown',
      image_url: '../../../public/images/maori-emotional-flow',
    },
    {
      id: 4,
      description: '4 Douglas Street, Mt Cook',
      latitude: -41.30211079793758,
      longitude: 174.7790713775596,
      artist: 'Unknown',
      image_url: '../../../public/images/astro-driver',
    },
    {
      id: 5,
      description: '30 Leeds Street, Te Aro',
      latitude: -41.29319764387097,
      longitude: 174.77665836322444,
      artist: 'Xoe Hall',
      image_url: '../../../public/images/david-bowie',
    },
  ])
}
